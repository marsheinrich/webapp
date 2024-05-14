import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzArray,
    EzHtml,
    EzJson,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzTimeEntryType,
    EzClockerContextEventName,
    EzEmployeeBreakMode,
    EzClockerFeature
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzPartialTimeEntry } from '/ezlibrary/enums/EzPartialTimeEntry.js';

import { EzUI } from '/public/javascript/common/ezui.js';

import { EzTimeAddEditDialogViewConfiguration } from '/secure/widgets/EzTimeAddEditDialog/EzTimeAddEditDialogViewConfiguration.js';
import { EzTimeAddEditDialogController } from '/secure/widgets/EzTimeAddEditDialog/EzTimeAddEditDialogController.js';

import { EzBreakInBreakOutHelper } from '/secure/employee/EzBreakInBreakOutHelper.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * Handles the employee dashboard view
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 * import { EzEmployeeDashboardView } from '/secure/employee/employeeDashboard-DisplayEmployeeInfo.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Check ready state with:
 *      globalThis.ezApi?.ezclocker?.[EzEmployeeDashboardView.ezApiName]
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Singleton instance from within the EzEmployeeDashboardController class:
 *      EzEmployeeDashboardView.ezInstance
 * Singleton instance from outside the EzEmployeeDashboardController class:
 *      ezApi.ezclocker.ezEmployeeDashboardView
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzEmployeeDashboardView extends EzClass {
    /**
     * @public @readonly @property
     * @returns {string}
     */
    get DEFAULT_DELETE_TIME_ENTRY_ERROR_TITLE() {
        return 'Delete Time Entry Error';
    }

    /**
     * @public @readonly @property
     * @returns {string}
     */
    get DEFAULT_DELETE_TIME_ENTRY_ERROR() {
        return 'ezClocker encounted an error while deleting your time entry.';
    }

    /**
     * @public @readonly @property
     * @returns {object}
     */
    get ezIds() {
        return {
            buttons: {
                exportTimeSheetButtonId: 'exportTimeSheet',
                signOutButtonId: 'EzSignOutButton',
                navigateToTimeOffButtonId: 'EzNavigateToTimeOffPageButton',
                navigateToScheduleButtonId: 'EzNavigateToSchedulePageButton',
                navigateToDashboardButtonId: 'EzNavigateToDashboardPageButton',
                addTimeEntryButtonId: 'EzAddTimeEntryButton',
                clockInBreakInOutButtonId: 'clockInBreakInOut',
                clockOutButtonId: 'clockOut',
                viewSelectedPeriodButtonId: 'EzViewPeriodButton',
                showTeamChatButtonId: 'EzShowTeamChatButton'
            },
            containers: {
                totalHoursDisplayContainerId: 'EzTotalHoursDisplay',
                enableClockInOutAddContainerId: 'EzEnabledClockInOutAddContainer',
                disabledClockInOutAddContainerId: 'EzDisabledClockInOutAddContainer'
            },
            inputs: {
                totalHoursInputId: 'EzTotalHoursInput',
                selectedPeriodStartDatePickerId: 'EzSelectedPeriodStartDatePicker',
                selectedPeriodEndDatePickerId: 'EzSelectedPeriodEndDatePicker'
            },
            employerNameCellId: '_EmployerNameCell',
            employerLogoImageId: '_EmployerLogoImage'
        };
    }

    /**
     * @public @method
     * Initializes the EzEmployeeDashboardView
     * @returns {EzEmployeeDashboardView}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onActiveEmployeeTimeEntriesChanged,
            EzEmployeeDashboardView.ezApiName,
            EzEmployeeDashboardView.ezInstance.ezHandleOnActiveEmployeeTimeEntriesChanged);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onActiveEmployeeReady,
            EzEmployeeDashboardView.ezApiName,
            EzEmployeeDashboardView.ezInstance.ezRenderEmployeeDashboard);

        return EzEmployeeDashboardView.ezInstance;
    }

    /**
     * @protected @method
     * Handles the EzClockerContextEventName.onActiveEmployeeTimeEntriesChanged,
     */
    ezHandleOnActiveEmployeeTimeEntriesChanged() {
        EzEmployeeDashboardView.ezInstance.ezRenderEmployeeDashboard();
    }

    /**
     * @public @method
     * Renders the employee dashboard UX
     */
    ezRenderEmployeeDashboard() {
        let aEmployee = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee();

        if (!EzObject.isValid(aEmployee)) {
            ezApi.ezclocker.ezLogger.error(
                'Unable to render employee dashboard. The active employee is not available.');
            return;
        }


        if (EzBoolean.isTrue(ezApi.ezclocker.ezUi.ezElementExists('_employeeTitle'))) {
            let displayName = EzString.hasLength(aEmployee.employeeName)
                ? aEmployee.employeeName
                : aEmployee.employeeContactEmail;

            if (EzString.hasLength(displayName)) {
                ezApi.ezclocker.ezUi.ezSetContent(
                    '_employeeTitle',
                    `${displayName}'s Dashboard`);
            } else {
                ezApi.ezclocker.ezUi.ezSetContent(
                    '_employeeTitle',
                    'ezClocker Dashboard');
            }

            if (EzArray.arrayHasLength(aEmployee.timeEntries)) {
                ezApi.ezclocker.ezUi.ezContent(
                    '_TimeEntryContent',
                    EzEmployeeDashboardView.ezInstance.ezBuildTimeEntryGrid(aEmployee.timeEntries));
            } else {
                // No data to display
                ezApi.ezclocker.ezUi.ezContent(
                    '_TimeEntryContent',
                    EzHtml.build`
                        <h1>
                            No time entries available for the selected period.
                        </h1>`);
            }

            ezApi.ezclocker.ezUi.ezSetInputValue('EzTotalHoursInput', aEmployee.timeEntriesTotal);
        }
    }

    /**
     * @public @method
     * Displays the clock in/out buttons.
     */
    disableClockInOut() {
        ezApi.ezclocker.ezUi.ezDisableElement('clockOut');

        ezApi.ezclocker.ezUi.ezDisableElement('clockInBreakInOut');
    }

    /**
     * @public @method
     * Enables the clock in break in out / clock out buttons.
     */
    enableClockInOut() {
        ezApi.ezclocker.ezUi.ezEnableElement('clockOut');

        ezApi.ezclocker.ezUi.ezEnableElement('clockInBreakInOut');
    }

    /**
     * @public @method
     * Enables the clock in ability
     */
    ezEnableClockInBreakInOut() {
        if (ezApi.ezclocker.ezEmployeeDashboardController.DISALLOW_EMPLOYEE_TIMEENTRY) {
            EzEmployeeDashboardView.ezInstance.disableClockInOut();

            ezApi.ezclocker.ezUi.ezSetElementProperty(
                EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockInBreakInOutButtonId,
                'title',
                'Your employer has disabled starting time tracking using the ezClocker website.');

            return;
        }

        ezApi.ezclocker.ezUi.ezEnable('clockInBreakInOut');

        let aEmployee = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee();

        if (EzObject.isValid(aEmployee) && EzBoolean.isFalse(aEmployee.isActiveClockIn)) {
            ezApi.ezclocker.ezUi.ezDisableElement(EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockOutButtonId);

            ezApi.ezclocker.ezUi.ezSetElementProperty(
                EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockOutButtonId,
                'title',
                'You have not yet clocked in.');

            ezApi.ezclocker.ezUi.ezSetElementProperty(
                EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockInBreakInOutButtonId,
                'title',
                'Clock in to start tracking time for your shift.');
        } else {
            ezApi.ezclocker.ezUi.ezEnableElement(EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockOutButtonId);

            ezApi.ezclocker.ezUi.ezSetElementProperty(
                EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockOutButtonId,
                'title',
                'Clock out to end time tracking for your shift.');

            if (!ezApi.ezclocker.ezUi.ezIsElementEnabled(
                EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockInBreakInOutButtonId)) {
                ezApi.ezclocker.ezUi.ezSetElementProperty(
                    EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockInBreakInOutButtonId,
                    'title',
                    'You have already clocked into your shift.');
            }
        }
    }

    /**
     * @public @method
     * Enables the clock out ability
     */
    ezEnableClockOut() {
        if (ezApi.ezclocker.ezEmployeeDashboardController.DISALLOW_EMPLOYEE_TIMEENTRY) {
            EzEmployeeDashboardView.ezInstance.disableClockInOut();

            ezApi.ezclocker.ezUi.ezSetElementProperty(
                EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockOutButtonId,
                'title',
                'Your employer has disabled ending time tracking using the ezClocker website.');

            return;
        }

        ezApi.ezclocker.ezUi.ezEnableElement(EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockOutButtonId);

        ezApi.ezclocker.ezUi.ezSetElementProperty(
            EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockOutButtonId,
            'title',
            'Clock out to end time tracking for your shift.');

        if (!ezApi.ezclocker.ezBreakInBreakOutHelper.ezAllowRecordingBreaks) {
            ezApi.ezclocker.ezUi.ezDisableElement(
                EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockInBreakInOutButtonId);

            ezApi.ezclocker.ezUi.ezSetElementProperty(
                EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockInBreakInOutButtonId,
                'title',
                'You have already clocked into your shift.');
        }
    }

    /**
     * @deprecated Use either ezApi.ezGrid object OR EzString.employeeDisplayController
     * @public @method
     * Builds the time entry grid for the employee dashboard.
     * @returns {String}
     * HTML for the time entry grid.
     */
    ezBuildTimeEntryGrid(employeeTimeEntries) {
        if (!EzArray.isArray(employeeTimeEntries)) {
            throw new EzBadParamException(
                'employeeTimeEntries',
                EzEmployeeDashboardView.ezInstance,
                EzEmployeeDashboardView.ezInstance.ezBuildTimeEntryGrid);
        }

        let jobColumn = ezApi.ezclocker.ezClockerContext.ezActiveEmployerFeatureEnabled(EzClockerFeature.EZ_JOBS)
            ? EzHtml.build`
                <td
                    class="ezGridHeaderCell ezGridDateCell">
                    Job
                </td>`
            : EzString.EMPTY;

        let timeEntryRows = EzString.EMPTY;

        for (let timeEntry of employeeTimeEntries) {
            timeEntryRows = EzHtml.build`
                ${timeEntryRows}
                ${EzEmployeeDashboardView.ezInstance.ezBuildTimeEntryRow(timeEntry)}`;
        }

        return EzHtml.build`
            <div
                id="timeEntryContainerDiv"
                class="ezGridContainer">
                <table
                    class="ezGrid" id="timeEntryTableHeader">
                    <th>
                        <tr
                            class="header">
                        <tr>
                            <td
                                class="ezGridHiddenCell">
                            </td>
                            <td
                                class="ezGridHeaderCell ezGridDateCell">
                                Clocked In Date
                            </td>
                            <td
                                class="ezGridHeaderCell ezGridTimeCell">
                                Clocked In Time
                            </td>
                            <td
                                class="ezGridHeaderCell ezGridDateCell">
                                Clocked Out Date
                            </td>
                            <td
                                class="ezGridHeaderCell ezGridTimeCell">
                                Clocked Out Time
                            </td>
                            <td
                                class="ezGridHeaderCell ezGridTotalTimeCell rightAlignValue">
                                Total (hh:mm)
                            </td>
                            ${jobColumn}
                            <td
                                class="ezGridHeaderCell">
                                Notes
                            </td>
                            <td
                                class="ezGridHeaderCell ezGridMapCell centerCell">
                                <img
                                    src="/public/images/cc30/location_pin_inverted.png"
                                    class="ezGridLocationHeaderImage"
                                    alt="Location Information"
                                    title="Location Information"/>
                            </td>
                        </tr>
                    </th>
                    <tbody
                        id="_TimeEntryTableBody"
                        class="ezGridData">
                        ${timeEntryRows}
                    </tbody>
                </table>
            </div>`;
    }

    /**
     * @public @method
     * Builds a time entry row html
     * @param {Object} timeEntry
     * @returns {String}
     * HTML for TimeEntry row
     */
    ezBuildTimeEntryRow(timeEntry) {
        if (!EzObject.isValid(timeEntry)) {
            return EzHtml.build`
                <tr
                    id="_TimeEntry_"
                    class="ezGridDataRow">
                </tr>`;
        }

        let totalHours = EzNumber.strToInt(timeEntry.totalTime.split(':'));

        let rowClass = `ezGridDataCell ${EzEmployeeDashboardView.ezInstance.ezGetTimeEntryRowCSSClass(timeEntry, totalHours)}`;

        let clockInHtml = EzEmployeeDashboardView.ezInstance.ezBuildTimeEntryDataCell(
            `clockInDate_${timeEntry.id}`,
            `clockInTime_${timeEntry.id}`,
            rowClass,
            ezApi.ezclocker.ezDateTime.ezCreateFromIso(timeEntry.clockInIso));

        let clockOutHtml = EzEmployeeDashboardView.ezInstance.ezBuildTimeEntryDataCell(
            `clockOutDate_${timeEntry.id}`,
            `clockOutTime_${timeEntry.id}`,
            rowClass,
            EzBoolean.booleanOrFalse(timeEntry.isActiveClockIn) || EzBoolean.booleanOrFalse(timeEntry.isActiveBreak)
                ? null
                : ezApi.ezclocker.ezDateTime.ezCreateFromIso(timeEntry.clockOutIso));

        let jobsFeatureHtml = ezApi.ezclocker.ezClockerContext.ezActiveEmployerFeatureEnabled(EzClockerFeature.EZ_JOBS)
            ? EzEmployeeDashboardView.ezInstance.ezBuildJobCodeCell(timeEntry, rowClass)
            : EzString.EMPTY;

        let timeEntryTotalHtml = EzHtml.build`
            <td
                id="totalTime_${timeEntry.id}"
                class="ezGridTotalTimeCell rightAlignValue ${rowClass}">
                ${timeEntry.totalTime}
            </td>`;

        // Time Entry Buttons
        return EzHtml.build`
            <tr
                id="_TimeEntry_c"
                class="ezGridDataRow">
                <td
                    class="ezTimeEntryGridButtonCell">
                    <div
                        id="EzTimeEntryButtonContainer_ezTimeEntryGridButtonCell"
                        class="ezAutoCol_28px_28px_28px ezGridGap_4">
                        ${EzEmployeeDashboardView.ezInstance.ezBuildTimeEntryEditButtons(timeEntry.id)}
                    </div>
                </td>
                ${clockInHtml}
                ${clockOutHtml}
                ${timeEntryTotalHtml}
                ${jobsFeatureHtml}
                ${EzEmployeeDashboardView.ezInstance.ezBuildNotesCell(timeEntry, rowClass)}
                ${EzEmployeeDashboardView.ezInstance.ezBuildGPSInfoCell(timeEntry, rowClass)}
            </tr>`;
    }

    /**
     * @public @method
     * Builds the notes cell for the employee dashboard.
     * @param {object|null} timeEntry
     * @param {string|null} rowClass
     * @returns {String}
     * HTML for the notes cell.
     */
    ezBuildNotesCell(timeEntry, rowClass) {
        if (!EzObject.isValid(timeEntry)) {
            throw new EzBadParamException(
                'timeEntry',
                EzEmployeeDashboardView.ezInstance,
                EzEmployeeDashboardView.ezInstance.ezBuildNotesCell);
        }

        return EzHtml.build`
            <td
                id="notes_${timeEntry.id}"
                class="${EzString.stringOrEmpty(rowClass)}">
                ${EzString.stringOrEmpty(timeEntry.notes)}
            </td>`;
    }

    /**
     * @public @method
     * Builds the Job code cell for the employee dashboard.
     * @param {object|null} timeEntry
     * @param {string|null} rowClass
     * @returns {String}
     * HTML for the notes cell.
     */
    ezBuildJobCodeCell(timeEntry, rowClass) {
        if (!EzObject.isValid(timeEntry)) {
            throw new EzBadParamException(
                'timeEntry',
                EzEmployeeDashboardView.ezInstance,
                EzEmployeeDashboardView.ezInstance.ezBuildJobCodeCell);
        }

        let jobName = EzObject.isValid(timeEntry.primaryAssignedJob) &&
            EzString.hasLength(timeEntry.primaryAssignedJob.tagName)
            ? EzString.stringOrEmpty(timeEntry.primaryAssignedJob.tagName)
            : EzString.EMPTY;

        return EzHtml.build`
            <td
                id="notes_${timeEntry.id}"
                class="${EzString.stringOrEmpty(rowClass)}">
                ${jobName}
            </td>`;
    }

    /**
     * @public @method
     * Builds a time entry's data cell (date + time values)
     * @param {String} dateCellId
     * @param {String} timeCellId
     * @param {String|null} rowClass
     * @param {Moment|null} dateTimeMoment
     * @returns {String}
     * HTML for the time entry data cell.
     */
    ezBuildTimeEntryDataCell(dateCellId, timeCellId, rowClass, dateTimeMoment) {
        if (!EzString.hasLength(dateCellId)) {
            throw new EzBadParamException(
                'dateCellId',
                EzEmployeeDashboardView.ezInstance,
                EzEmployeeDashboardView.ezInstance.ezBuildTimeEntryDataCell);
        }
        if (!EzString.hasLength(timeCellId)) {
            throw new EzBadParamException(
                'timeCellId',
                EzEmployeeDashboardView.ezInstance,
                EzEmployeeDashboardView.ezInstance.ezBuildTimeEntryDataCell);
        }

        let dateDisplay = EzObject.isValid(dateTimeMoment)
            ? dateTimeMoment.format('ddd MM/DD/YYYY')
            : '--';

        let timeDisplay = EzObject.isValid(dateTimeMoment)
            ? dateTimeMoment.format('hh:mm a')
            : '--';

        rowClass = EzString.stringOrEmpty(rowClass);

        return EzHtml.build`
            <td
                id="${dateCellId}"
                class="ezGridDateCell ${rowClass}">
                ${dateDisplay}
            </td>
            <td
                id="${timeCellId}"
                class="ezGridTimeCell ${rowClass}">
                ${timeDisplay}
            </td>`;
    }

    /**
     * @deprecated Use either ezApi.ezGrid object OR EzString.employeeDisplayController
     * @public @method
     * @param {Object} timeEntry
     * @param {String} rowClass
     * @returns {String}
     * HTML for the GPS info cell
     */
    ezBuildGPSInfoCell(timeEntry, rowClass) {
        if (!EzObject.isValid(timeEntry)) {
            throw new EzBadParamException(
                'timeEntry',
                EzEmployeeDashboardView.ezInstance,
                EzEmployeeDashboardView.ezInstance.ezBuildGPSInfoCell);
        }

        let validClockInLocation = EzBoolean.isTrue(
            EzEmployeeDashboardView.ezInstance.ezIsValidGPSLocationData(timeEntry.clockInLocation));

        let validClockOutLocation = EzBoolean.isTrue(
            EzEmployeeDashboardView.ezInstance.ezIsValidGPSLocationData(timeEntry.clockOutLocation));

        let clockInActive = 'ACTIVE' === timeEntry.clockInGpsDataStatus;

        let clockOutActive = 'ACTIVE' === timeEntry.clockOutGpsDataStatus;

        let hasClockInGps = clockInActive && validClockInLocation;

        let hasClockOutGps = clockOutActive && validClockOutLocation;

        if (clockInActive && !hasClockInGps) {
            timeEntry.clockInGpsDataStatus = 'NOT_AVAILABLE';
        } else if (clockOutActive && !hasClockOutGps) {
            timeEntry.clockOutGpsDataStatus = 'NOT_AVAILABLE';
        }

        let gpsCellHtml;

        if (EzBoolean.isTrue(hasClockInGps) || EzBoolean.isTrue(hasClockOutGps)) {
            gpsCellHtml = EzEmployeeDashboardView.ezInstance.ezBuildGpsMapButton(
                timeEntry,
                hasClockInGps,
                hasClockOutGps);
        } else if (clockInActive && !validClockInLocation || clockOutActive && !validClockOutLocation) {
            gpsCellHtml = 'Unknown';
        } else {
            gpsCellHtml = EzEmployeeDashboardView.ezInstance.ezGetGPSStatusText(timeEntry.clockInGpsDataStatus);
        }

        return EzHtml.build`
            <td
                id="location_${timeEntry.id}"
                class="${EzString.stringOrEmpty(rowClass)} centerCell">
                ${gpsCellHtml}
            </td>`;
    }

    /**
     * @public @method
     * Builds the view GPS Location map button
     * @param {object} timeEntry
     * @param {boolean} hasClockInGps
     * @param {boolean} hasClockOutGps
     * @returns {string}
     * Returns the HTML representing the GPS map button
     */
    ezBuildGpsMapButton(timeEntry, hasClockInGps, hasClockOutGps) {
        if (!EzObject.isValid(timeEntry)) {
            throw new EzBadParamException(
                'timeEntry',
                EzEmployeeDashboardView.ezInstance,
                EzEmployeeDashboardView.ezInstance.ezBuildGpsMapButton);
        }

        let gpsCellTitle;

        if (EzBoolean.isTrue(hasClockInGps) && EzBoolean.isTrue(hasClockOutGps)) {
            gpsCellTitle = 'View GPS Location';
        } else if (EzBoolean.isTrue(hasClockInGps)) {
            gpsCellTitle = 'View Clock In Location';
        } else {
            gpsCellTitle = 'View Clock Out Location';
        }

        return EzHtml.build`
            <button
                class="ezToolButton"
                type="button"
                onclick="ezApi.ezclocker.ezEmployeeDashboardView.ezViewGPSLocationMap(${timeEntry.employeeTimeEntryIndex})"
                title="${gpsCellTitle}">
                <img
                    src="${ezApi.ezclocker.ezNavigation.ezGetPublicPageUrl('images/maps/viewmap.svg')}"
                    class="ezEditButtonImage"
                    title="${gpsCellTitle}"
                    alt="View GPS Location">
            </button>`;
    }

    /**
     * @public @method
     * Displays the time entry location in the GPS map.
     * @param {Number} timeEntryIndex
     */
    ezViewGPSLocationMap(timeEntryIndex) {
        if (!EzNumber.isNumber(timeEntryIndex)) {
            return;
        }

        let aEmployee = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee();

        let timeEntry = aEmployee.timeEntries[timeEntryIndex];

        let validClockInLocation = EzBoolean.isTrue(
            EzEmployeeDashboardView.ezInstance.ezIsValidGPSLocationData(timeEntry.clockInLocation));

        let validClockOutLocation = EzBoolean.isTrue(
            EzEmployeeDashboardView.ezInstance.ezIsValidGPSLocationData(timeEntry.clockOutLocation));

        if (validClockInLocation && validClockOutLocation && 'ACTIVE' === timeEntry.clockInGpsDataStatus && 'ACTIVE' === timeEntry.clockOutGpsDataStatus) {
            ezApi.ezclocker.ezGoogleMapsApi.ezDisplayDualEventMapNoEmployerLocation(
                ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee(),
                timeEntry.clockInLocation.latitude,
                timeEntry.clockInLocation.longitude,
                'Clock In',
                timeEntry.clockInLocation.accuracy,
                timeEntry.clockOutLocation.latitude,
                timeEntry.clockOutLocation.longitude,
                'Clock Out',
                timeEntry.clockOutLocation.accuracy,
                timeEntry);
        } else if (validClockInLocation && 'ACTIVE' === timeEntry.clockInGpsDataStatus) {
            ezApi.ezclocker.ezGoogleMapsApi.ezDisplaySingleEventMapNoEmployerInformation(
                ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee(),
                timeEntry.clockInLocation.latitude,
                timeEntry.clockInLocation.longitude,
                timeEntry.clockInLocation.accuracy,
                'Clock In',
                true,
                false,
                timeEntry);
        } else if (validClockOutLocation && 'ACTIVE' === timeEntry.clockOutGpsDataStatus) {
            ezApi.ezclocker.ezGoogleMapsApi.ezDisplaySingleEventMapNoEmployerInformation(
                ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee(),
                timeEntry.clockOutLocation.latitude,
                timeEntry.clockOutLocation.longitude,
                timeEntry.clockOutLocation.accuracy,
                'Clock Out',
                false,
                true,
                timeEntry);
        } else {
            ezApi.ezclocker.ezDialog.ezShowOKMessage(
                'GPS Location',
                'The GPS location data for the time entry is not available.');
        }
    }

    /**
     * @public @method
     * Validates GPSLocation data.
     * @returns {boolean}
     */
    ezIsValidGPSLocationData(gpsLocation) {
        return EzObject.isValid(gpsLocation) &&
            EzObject.isValid(gpsLocation.latitude) && EzObject.isValid(gpsLocation.longitude) &&
            EzString.hasLength(gpsLocation.latitude) && '0' !== gpsLocation.latitude &&
            EzString.hasLength(gpsLocation.longitude) && '0' !== gpsLocation.longitude;
    }

    /**
     * @public @method
     * @param {string} gpsStatus
     * @returns {String}
     * GPS status text
     */
    ezGetGPSStatusText(gpsStatus) {
        if (!EzString.hasLength(gpsStatus) || 'unknown' === gpsStatus.toLowerCase()) {
            return 'N/A';
        }

        if ('DISABLED' === gpsStatus.toUpperCase()) {
            return 'Disabled';
        }

        if ('NOT_AVAILABLE' === gpsStatus.toUpperCase()) {
            return 'Not available';
        }

        return gpsStatus;
    }

    /**
     * @public @method
     * Builds the HTML for the edit buttons for a time entry based on configuration
     * @param {Long} timeEntryId
     * @returns {string}
     * HTML for edit buttons
     */
    ezBuildTimeEntryEditButtons(timeEntryId) {
        timeEntryId = EzObject.isValid(timeEntryId)
            ? timeEntryId
            : EzString.EMPTY;

        let aEmployee = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee();

        if (!EzObject.isValid(aEmployee)) {
            ezApi.ezclocker.logger.error(
                'Unable to build time entry edit buttons. The active employee is not available.');

            return false;
        }

        let disallowTimeEntryEdit = ezApi.ezclocker.ezOptionsService.ezOptionValueToBoolean(
            ezApi.ezclocker.ezClockerContext.ezReadActiveEmployerOption(
                ezApi.ezclocker.ezOptionsService.EZOPTION_EMPLOYER_DISABLE_TIME_ENTRY_EDITING,
                '0'),
            false);

        return EzHtml.build`
            <div
                id="EzTimeEntryEditButtonsContainer_${timeEntryId}">
                ${EzEmployeeDashboardView.ezInstance.ezBuildDeleteButton(timeEntryId, disallowTimeEntryEdit)}
            </div>
            <div
                id="EzTimeEntryEditButtonsContainer_${timeEntryId}">
                ${EzEmployeeDashboardView.ezInstance.ezBuildEditButton(timeEntryId, disallowTimeEntryEdit)}
            </div>`;

    }

    /**
     * @public @method
     * Builds the HTML for the the edit time entry button
     * @param {number} timeEntryId
     * @returns {String}
     * HTML for the edit button
     */
    ezBuildEditButton(timeEntryId, noteOnly) {
        timeEntryId = EzObject.isValid(timeEntryId)
            ? timeEntryId
            : EzString.EMPTY;

        noteOnly = EzBoolean.isTrue(noteOnly);

        let buttonTitle = ezApi.isTrue(noteOnly)
            ? 'title="Edit Time Entry Notes"'
            : 'title="Edit Time Entry"';

        let clickHandler = EzBoolean.isTrue(noteOnly)
            ? EzHtml.build`
                ezApi.ezclocker.ezEmployeeDashboardView.ezHandleTimeEntryRowEditButtonClick(
                    ${timeEntryId},
                    false,
                    false,
                    false,
                    true,
                    ${EzBoolean.booleanOrFalse(ezApi.ezclocker.ezBreakInBreakOutHelper.ezAllowRecordingBreaks)},
                    null)`
            : EzHtml.build`
                ezApi.ezclocker.ezEmployeeDashboardView.ezHandleTimeEntryRowEditButtonClick(
                    ${timeEntryId},
                    true,
                    true,
                    true,
                    true,
                    ${EzBoolean.booleanOrFalse(ezApi.ezclocker.ezBreakInBreakOutHelper.ezAllowRecordingBreaks)},
                    null)`;

        return EzHtml.build`
            <button
                id="EzEditTimeEntryButton_${timeEntryId}"
                class="ezToolButton"
                onclick="${clickHandler}"
                type="button"
                ${buttonTitle}>
                <img
                    id="EzEditTimeEntryButtonImage_${timeEntryId}"
                    src="/public/images/freepik/edit/edit1-white.svg"
                    class="ezEditButtonImage"
                    alt="edit"
                    ${buttonTitle}/>
            </button>`;
    }

    /**
     * @public @method
     * Builds the HTML for the delete time entry button
     * @param {number} timeEntryId
     * @param {boolean} disabled
     * @returns {string}
     * HTML for delete button
     */
    ezBuildDeleteButton(timeEntryId, disabled) {
        timeEntryId = EzObject.isValid(timeEntryId)
            ? timeEntryId
            : EzString.EMPTY;

        let titleAndDisabledHtml = EzBoolean.isTrue(disabled)
            ? EzHtml.build`
                title="Your employer has disabled deleting time entries."
                disabled`
            : 'title="Delete Time Entry"';

        return EzHtml.build`
            <button
                id="EzDeleteTimeButton_${timeEntryId}"
                class="ezRedToolButton"
                type="button"
                onclick="ezApi.ezclocker.ezEmployeeDashboardView.ezDeleteTimeEntry(${timeEntryId})"
                ${titleAndDisabledHtml}>
                <img
                    id="EzDeleteTimeButton_${timeEntryId}_image"
                    src="/public/images/freepik/delete/del1-white.svg"
                    class="ezEditButtonImage"
                    alt="delete"
                    ${titleAndDisabledHtml}/>`;
    }

    /**
     * @protected @method
     * Handles the edit time entry row button click
     * @param {number} timeEntryId
     * @param {boolean} allowEditing
     * Default: false
     * @param {boolean} allowEditClockIn
     * Default: false
     * @param {boolean} allowEditClockOut
     * Default: false
     * @param {boolean} allowEditNote
     * Default: false
     * @param {boolean} allowBreaks
     * Default: false
     * @param {boolean} availableJobs
     * Default: false
     */
    ezHandleTimeEntryRowEditButtonClick(
        timeEntryId,
        allowEditing = false,
        allowEditClockIn = false,
        allowEditClockOut = false,
        allowEditNote = false,
        allowBreaks = false,
        availableJobs = false) {
        if (!EzNumber.isNumber(timeEntryId)) {
            throw new EzBadParamException(
                'timeEntryId',
                EzEmployeeDashboardView.ezInstance,
                EzEmployeeDashboardView.ezInstance.ezHandleTimeEntryRowEditButtonClick);
        }

        EzTimeAddEditDialogViewConfiguration.ezGetTimeEntryToEdit(timeEntryId)
            .then(
                (response) => {
                    ezApi.ezclocker.ezTimeAddEditDialogController.ezShow(
                        new EzTimeAddEditDialogViewConfiguration(
                            ezApi.ezclocker.ezClockerContext.ezGetUserContextPrimaryAccountType(),
                            // timeEntry
                            response.entity,
                            // defaultClockInMoment
                            null,
                            // defaultClockOutMoment
                            null,
                            // defaultEditReason
                            null,
                            // allowEditing
                            EzBoolean.booleanOrFalse(allowEditing),
                            // allowEditClockIn
                            EzBoolean.booleanOrFalse(allowEditClockIn),
                            // allowEditClockOut
                            EzBoolean.booleanOrFalse(allowEditClockOut),
                            // allowEditNote
                            EzBoolean.booleanOrFalse(allowEditNote),
                            // allowBreaks
                            EzBoolean.booleanOrFalse(allowBreaks),
                            // availableJobs
                            availableJobs));
                },
                (eResponse) => EzEmployeeDashboardView.ezInstance.ezHandleGetTimeEntryFailure(eResponse, timeEntryId));
    }

    /**
     * @protected @method
     * Handles failure response from EzTimeAddEditDialogViewConfiguration.ezGetTimeEntryToEdit()
     * @param {object} eResponse
     * @param {number} timeEntryId
     */
    ezHandleGetTimeEntryFailure(eResponse, timeEntryId) {
        if (!EzObject.isValid(eResponse)) {
            throw new EzBadParamException(
                'eResponse',
                EzEmployeeDashboardView.ezInstance,
                EzEmployeeDashboardView.ezInstance.ezHandleGetTimeEntryFailure);
        }

        ezApi.ezclocker.ezLogger.error(
            EzString.em`
                Unable to obtain the data for the time entry with timeEntryId=${timeEntryId}.
                Error response: ${EzJson.toJson(eResponse)}`);

        let em = EzString.em`
            Unable to edit the time entry due to an error response from the
            ezClocker cloud services.`;

        let errorDetails = `Error reported: ${eResponse.message}`;

        let mailToBody = EzString.msg`
            I received the following error when I tried to edit a break/time entry:
            Error message: ${em}
            Error details: ${errorDetails}`;

        let mailToLink = ezApi.ezUrlTemplate`mailto:support@ezcocker.com
            ?subject="Help with error while trying to edit a break/time entry."
            &body="${mailToBody}"`;

        ezApi.ezclocker.ezDialog.ezShowErrorDialog(
            'Edit Time Entry Error',
            EzString.em`
                <p>
                    ${em}
                </p>
                <p>
                    Please try again in a few minutes.
                </p>
                <p>
                    If you continue to receive this error please contact ezClocker support at
                    <a
                        href="${mailToLink}">
                        support@ezclocker.com
                    </a>
                    and include any the details provided below.
                    <div
                        id="errorReported"
                        class="ez-error-details-container"
                        rows="4">
                        <textarea
                            id="${EzEmployeeDashboardView.ezInstance.ezDialogId}_EditErrorDetails"
                            readonly="true"
                            class="ezFullWidthEditor ezText-micro-gray">
                            ${errorDetails}
                            ${EzJson.toJson(eResponse)}
                        </textarea>
                    </div>
                </p>`);
    }

    /**
     * @public @method
     * @param {object} timeEntry
     * @returns {String}
     * HTML for the hint image
     */
    ezGetTimeEntryHintImage(timeEntry) {
        if (!EzObject.isValid(timeEntry)) {
            return EzString.EMPTY;
        }

        return EzTimeEntryType.BREAK === timeEntry.timeEntryType || EzTimeEntryType.BREAK_IN === timeEntry.timeEntryType ||
            EzTimeEntryType.BREAK_OUT === timeEntry.timeEntryType
            ? EzEmployeeDashboardView.ezInstance.ezBuildBreakHintImage()
            : EzEmployeeDashboardView.ezInstance.ezBuildTimeEntryHintImage();
    }

    /**
     * @public @method
     * Builds the time entry hint image HTML
     * @param {object} timeEntry
     * @returns {string}
     */
    ezBuildTimeEntryHintImage(timeEntry) {
        if (!EzObject.isValid(timeEntry)) {
            throw new EzBadParamException(
                'timeEntry',
                EzEmployeeDashboardView.ezInstance,
                EzEmployeeDashboardView.ezInstance.ezBuildTimeEntryHintImage);
        }

        let totalDecimalHours = parseFloat(timeEntry.totalDecimalHours) * -1;

        let hintImageUrl;

        let hintImageAlt;

        let hintImageTitle;

        if (timeEntry.isActiveClockIn) {
            hintImageUrl = ezApi.ezclocker.ezNavigation.ezGetPublicPageUrl('images/good.ico');

            hintImageTitle = 'Active Clock In';

            hintImageAlt = 'Active Clock In';
        } else if ('EndDateClipped' === timeEntry.partialTimeEntry || 'StartDateClipped' === timeEntry.partialTimeEntry ||
            'StartAndEndDateClipped' === timeEntry.partialTimeEntry) {
            hintImageUrl = ezApi.ezclocker.ezNavigation.ezGetPublicPageUrl('images/partial.ico');

            hintImageTitle = 'Partial Time Entry';

            hintImageAlt = 'The time entries clock in or clock out date falls outside of the selected period.';
        } else if (totalDecimalHours > 8.00) {
            hintImageUrl = ezApi.ezclocker.ezNavigation.ezGetPublicPageUrl('images/warning.ico');

            hintImageTitle = 'Exceeds Eight Hours';

            hintImageAlt = 'Time Exceeds Eight Hours';
        } else {
            hintImageUrl = ezApi.ezclocker.ezNavigation.ezGetPublicPageUrl('images/good.ico');

            hintImageAlt = 'No problems detected';

            hintImageTitle = 'No problems detected';
        }

        return EzHtml.build`
            <div
                id="EzBreakTimeEntryHint_${timeEntry.id}_Container"
                class="timeEntryHintContainer">
                <img

                    id="EzBreakTimeEntryHint_${timeEntry.id}"
                    class="hintImage"
                    src="${hintImageUrl}"
                    title="${hintImageTitle}"
                    alt="${hintImageAlt}"/>
            </div>`;
    }

    /**
     * @public @method
     * Builds the break entry hint image HTML
     * @param {object} timeEntry
     * @returns {string}
     */
    ezBuildBreakHintImage(timeEntry) {
        if (!EzObject.isValid(timeEntry)) {
            throw new EzBadParamException(
                'timeEntry',
                EzEmployeeDashboardView.ezInstance,
                EzEmployeeDashboardView.ezInstance.ezBuildBreakHintImage);
        }

        let totalDecimalHours = parseFloat(timeEntry.totalDecimalHours) * -1;

        let hintImageUrl;

        let hintImageAlt;

        let hintImageTitle;

        if (timeEntry.isActiveBreak) {
            hintImageUrl = ezApi.ezclocker.ezNavigation.ezGetPublicPageUrl('images/icons/break-teal.svg');

            hintImageTitle = 'Active Break';

            hintImageAlt = 'Active Break';
        } else if (EzPartialTimeEntry.EndDateClipped === timeEntry.partialTimeEntry || EzPartialTimeEntry.StartDateClipped === timeEntry.partialTimeEntry ||
            EzPartialTimeEntry.StartAndEndDateClipped === timeEntry.partialTimeEntry) {
            hintImageUrl = ezApi.ezclocker.ezNavigation.ezGetPublicPageUrl('images/icons/break-baby-blue.svg');

            hintImageTitle = 'Partial Break Entry';

            hintImageAlt = 'The break start or break in date falls outside of the selected period.';
        } else if (totalDecimalHours < 0.25) {
            hintImageUrl = ezApi.ezclocker.ezNavigation.ezGetPublicPageUrl('images/icons/break-gray.svg');

            hintImageTitle = 'Break is less than 15 minutes.';

            hintImageAlt = 'The break is less than 15 minutes.';
        } else if (totalDecimalHours > 1) {
            hintImageUrl = ezApi.ezclocker.ezNavigation.ezGetPublicPageUrl('images/icons/break-red.svg');

            hintImageTitle = 'Break exceeds one hour';

            hintImageAlt = 'The break exceeds one hour.';
        } else if (totalDecimalHours > 0.5) {
            hintImageUrl = ezApi.ezclocker.ezNavigation.ezGetPublicPageUrl('images/icons/break-ezclocker-yellow.svg');

            hintImageTitle = 'Break exceeds 30 minutes';

            hintImageAlt = 'The break exceeds 30 minutes.';
        } else if (totalDecimalHours > 0.25) {
            hintImageUrl = ezApi.ezclocker.ezNavigation.ezGetPublicPageUrl('images/icons/break-ezclocker-yellow.svg');

            hintImageTitle = 'Break exceeds 15 minutes';

            hintImageAlt = 'The break exceeds 15 minutes.';
        } else {
            hintImageUrl = ezApi.ezclocker.ezNavigation.ezGetPublicPageUrl('images/icons/break-green.svg');

            hintImageAlt = 'No problems detected';

            hintImageTitle = 'No problems detected';
        }

        return EzHtml.build`
            <div
                id="EzBreakTimeEntryHint_${timeEntry.id}_Container"
                class="breakHintContainer-white">
                <img

                    id="EzBreakTimeEntryHint_${timeEntry.id}"
                    class="hintImage"
                    src="${hintImageUrl}"
                    title="${hintImageTitle}"
                    alt="${hintImageAlt}"/>
            </div>`;
    }

    /**
     * @public @method
     * @param {object} timeEntry
     * @returns {String}
     * CSS class name to use
     */
    ezGetTimeEntryRowCSSClass(timeEntry) {
        if (!EzObject.isValid(timeEntry)) {
            return EzString.EMPTY;
        }

        if (EzString.hasLength(timeEntry.timeEntryType) && 'BREAK' === timeEntry.timeEntryType.toUpperCase()) {
            return EzBoolean.isTrue(timeEntry.isActiveBreak)
                ? 'ezGridActiveBreakCell'
                : EzString.EMPTY;
        }

        if ('EndDateClipped' === timeEntry.partialTimeEntry || 'StartDateClipped' === timeEntry.partialTimeEntry ||
            'StartAndEndDateClipped' === timeEntry.partialTimeEntry) {
            return 'ezGridPartialCell';
        }

        if (timeEntry.isActiveClockIn) {
            return 'ezGridClockInCell';
        }

        if (parseInt(timeEntry.totalForShift.split(':')) > 8) {
            return 'ezGridWarningCell';
        }

        return 'ezGridDataCell';
    }

    /**
     * @public @method
     * Deletes a time entry
     * @param {Long} id
     */
    deleteTimeEntry(id) {
        ezApi.ezclocker.ezDialog.ezYesNoDialog(
            'Delete Time Entry',
            'Confirm that you want to delete the time entry. Warning: You cannot revert this operation!',
            (result) => {
                if ('NO' === result.dialogStatus) {
                    return;
                }

                ezApi.ezclocker.ezHttpHelper.ezPost(
                    ezApi.ezclocker.ezNavigation.ezGetInternalClassicApiUrl(`timeEntry/remove/${id}`))
                    .then(
                        ezApi.ezclocker.ezServices.ezProcessApiResolve,
                        ezApi.ezclocker.ezServices.ezProcessApiReject)
                    .then(
                        ezApi.ezIgnoreResolve,
                        (eResponse) => {
                            ezApi.ezclocker.ezLogger.error(`Failed to delete time entry: ${EzJson.toJson(eResponse)}`);

                            ezApi.ezclocker.ezDialog.ezShowError(
                                'Delete Time Entry Error',
                                'Unable to delete the time entry at this time.');
                        });
            });
    }

    /**
     * @public @method
     * @param {long} timeEntryId
     */
    ezDeleteTimeEntry(deleteTimeEntryId) {
        if (!EzObject.isValid(deleteTimeEntryId)) {
            return; // nothing selected to delete
        }

        let aEmployee = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee();

        if (!EzObject.isValid(aEmployee)) {
            return; // no active employee
        }

        let aTimeEntry = aEmployee.timeEntriesById[deleteTimeEntryId];

        let clockInMomentTarget = EzString.hasLength(aTimeEntry.clockOutIso)
            ? ezApi.ezclocker.ezDateTime.ezCreateFromIso(aTimeEntry.clockInIso)
            : null;

        let clockOutMomentTarget = EzString.hasLength(aTimeEntry.clockOutIso)
            ? ezApi.ezclocker.ezDateTime.ezCreateFromIso(aTimeEntry.clockInIso)
            : null;

        let timeEntryInOutMsg = EzString.EMPTY;

        let inType = EzString.hasLength(aTimeEntry.timeEntryType) && (EzTimeEntryType.BREAK === aTimeEntry.timeEntryType ||
            EzTimeEntryType.BREAK_IN === aTimeEntry.timeEntryType || EzTimeEntryType.BREAK_OUT === aTimeEntry.timeEntryType)
            ? 'Break in:'
            : 'Clock in:';

        let outType = EzString.hasLength(aTimeEntry.timeEntryType) && (EzTimeEntryType.BREAK === aTimeEntry.timeEntryType ||
            EzTimeEntryType.BREAK_IN === aTimeEntry.timeEntryType || EzTimeEntryType.BREAK_OUT === aTimeEntry.timeEntryType)
            ? 'Break out:'
            : 'Clock out:';

        if (EzObject.isValid(clockInMomentTarget)) {
            timeEntryInOutMsg = `${clockInMomentTarget.format('ddd MM/DD/YYYY')} at ${clockInMomentTarget.format('hh:mm a')}`;
        }

        if (EzTimeEntryType.isTimeOffType(aTimeEntry.timeEntryType)) {
            ezApi.ezclocker.ezDialog.ezShowOK(
                'Cannot Delete Time Off Time Entry',
                'You are not authorized to delete a time entry that was created by a time off record',
                800);

            return;
        }

        timeEntryInOutMsg = EzObject.isValid(clockOutMomentTarget) && (!EzString.hasLength(aTimeEntry.timeEntryType) ||
            EzTimeEntryType.UNKNOWN === aTimeEntry.timeEntryType ||
            EzTimeEntryType.NORMAL === aTimeEntry.timeEntryType ||
            EzTimeEntryType.CLOCK_OUT === aTimeEntry.timeEntryType ||
            EzTimeEntryType.BREAK_OUT === aTimeEntry.timeEntryType)
            ? EzHtml.build`
                <div>
                    ${inType} ${timeEntryInOutMsg}
                </div>
                <div>
                    ${outType}
                    ${clockOutMomentTarget.format('ddd MM/DD/YYYY')} at ${clockOutMomentTarget.format('hh:mm a')}
                </div>`
            : `Starting at ${timeEntryInOutMsg}`;

        if (EzString.hasLength(aTimeEntry.primaryAssignedJob)) {
            timeEntryInOutMsg = EzHtml.build`
                ${timeEntryInOutMsg} with job ${aTimeEntry.primaryAssignedJob}`;
        }

        let warnMessage = EzString.hasLength(aTimeEntry.timeEntryType) && (EzTimeEntryType.BREAK === aTimeEntry.timeEntryType ||
            EzTimeEntryType.BREAK_IN === aTimeEntry.timeEntryType || EzTimeEntryType.BREAK_OUT === aTimeEntry.timeEntryType)
            ? EzHtml.build`
                <h3
                    class="ezH3_warning">
                    You cannot restore a deleted break entry.
                </h3>
                <p>
                    Are you sure you wish to delete the break entry?
                </p>
                <p>
                    ${timeEntryInOutMsg}
                </p>`
            : EzHtml.build`
                <h3
                    class="ezH3_warning">
                    You cannot restore a deleted time entry.
                </h3>
                <p>
                    Are you sure you wish to delete the time entry?
                </p>
                <p>
                    ${timeEntryInOutMsg}
                </p>`;

        ezApi.ezclocker.ezDialog.ezShowYesNo(
            'Delete Time Entry',
            warnMessage,
            deleteTimeEntryId,
            600)
            .then(
                (dialogResult) => {
                    if (ezApi.ezclocker.ezDialog.NO_DIALOG_RESPONSE.dialogStatus === dialogResult.dialogStatus) {
                        return;
                    }

                    ezApi.ezclocker.ezUi.ezStartPageWait(
                        'Deleting time entry ...',
                        (waitDone) => {
                            ezApi.ezclocker.ezHttpHelper.ezPost(
                                ezApi.ezclocker.ezNavigation.ezGetInternalClassicApiUrl(`timeEntry/remove/${dialogResult.passThroughData}`))
                                .then(
                                    ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                                    ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                                .then(
                                    ezApi.ezclocker.ezEmployeeDashboardController.ezRefreshTimeEntriesForPeriod,
                                    (eResponse) => waitDone()
                                        .then(
                                            () => ezApi.ezclocker.ezDialog.ezShowNon200ServiceError(
                                                EzEmployeeDashboardView.ezInstance.DEFAULT_DELETE_TIME_ENTRY_ERROR_TITLE,
                                                eResponse,
                                                EzEmployeeDashboardView.ezInstance.DEFAULT_DELETE_TIME_ENTRY_ERROR)))
                                .then(ezApi.ezclocker.ezClockerContext.ezRefreshActiveEmployeeActiveClockIn)
                                .then(ezApi.ezclocker.ezBreakInBreakOutHelper.ezRefreshEmployeeActiveBreak)
                                .then(waitDone);
                        });
                },
                EzPromise.ignoreReject);
    }

    /**
     * @public @method
     * Refreshes the employee break mode
     */
    ezRefreshEmployeeBreakMode() {
        if (EzBoolean.isFalse(ezApi.ezclocker.ezBreakInBreakOutHelper.ezAllowRecordingBreaks)) {
            ezApi.ezclocker.ezUi.ezSetContent(
                EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockInBreakInOutButtonId,
                EzEmployeeBreakMode.ezToDisplayValue(EzEmployeeBreakMode.CLOCK_IN));

            ezApi.ezclocker.ezUi.ezRemoveClass(
                EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockInBreakInOutButtonId,
                'ezTealMajorButton');

            if (ezApi.ezclocker.ezUi.ezIsElementEnabled(EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockInBreakInOutButtonId)) {
                ezApi.ezclocker.ezUi.ezSetElementProperty(
                    EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockInBreakInOutButtonId,
                    'title',
                    'Clock in to start tracking time for your shift.');
            } else {
                ezApi.ezclocker.ezUi.ezSetElementProperty(
                    EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockInBreakInOutButtonId,
                    'title',
                    'You have clocked into your shift.');
            }

            return;
        }

        switch (ezApi.ezclocker.ezBreakInBreakOutHelper.ezCurrentBreakMode) {
            case EzEmployeeBreakMode.START_BREAK:
                // Switch clockInBreakInOut button to end-break mode
                ezApi.ezclocker.ezUi.ezSetContent(
                    EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockInBreakInOutButtonId,
                    EzEmployeeBreakMode.ezToDisplayValue(ezApi.ezclocker.ezBreakInBreakOutHelper.ezCurrentBreakMode));

                ezApi.ezclocker.ezUi.ezAddClass(
                    EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockInBreakInOutButtonId,
                    'ezTealMajorButton');

                ezApi.ezclocker.ezUi.ezRemoveClass(
                    EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockInBreakInOutButtonId,
                    'ezMajorButton');

                ezApi.ezclocker.ezEmployeeDashboardView.ezEnableClockInBreakInOut();

                if (ezApi.ezclocker.ezUi.ezIsElementEnabled(
                    EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockInBreakInOutButtonId)) {
                    ezApi.ezclocker.ezUi.ezSetElementProperty(
                        EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockInBreakInOutButtonId,
                        'title',
                        'Start your break.');
                }

                break;
            case EzEmployeeBreakMode.END_BREAK:
                // Switch clockInBreakInOut button to end-break mode
                ezApi.ezclocker.ezUi.ezSetContent(
                    EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockInBreakInOutButtonId,
                    EzEmployeeBreakMode.ezToDisplayValue(ezApi.ezclocker.ezBreakInBreakOutHelper.ezCurrentBreakMode));

                ezApi.ezclocker.ezUi.ezAddClass(
                    EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockInBreakInOutButtonId,
                    'ezTealMajorButton');

                ezApi.ezclocker.ezUi.ezRemoveClass(
                    EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockInBreakInOutButtonId,
                    'ezMajorButton');

                ezApi.ezclocker.ezEmployeeDashboardView.ezEnableClockInBreakInOut();

                if (ezApi.ezclocker.ezUi.ezIsElementEnabled(
                    EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockInBreakInOutButtonId)) {
                    ezApi.ezclocker.ezUi.ezSetElementProperty(
                        EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockInBreakInOutButtonId,
                        'title',
                        'End your break and return to tracking time for your shift.');
                }

                break;
            case EzEmployeeBreakMode.CLOCK_IN:
            default:
                // Switch clockInBreakInOut button to clock-in mode
                ezApi.ezclocker.ezUi.ezSetContent(
                    EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockInBreakInOutButtonId,
                    EzEmployeeBreakMode.ezToDisplayValue(ezApi.ezclocker.ezBreakInBreakOutHelper.ezCurrentBreakMode));

                ezApi.ezclocker.ezUi.ezAddClass(
                    EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockInBreakInOutButtonId,
                    'ezMajorButton');

                ezApi.ezclocker.ezUi.ezRemoveClass(
                    EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockInBreakInOutButtonId,
                    'ezTealMajorButton');

                ezApi.ezclocker.ezEmployeeDashboardView.ezEnableClockInBreakInOut();

                if (ezApi.ezclocker.ezUi.ezIsElementEnabled(EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockInBreakInOutButtonId)) {
                    ezApi.ezclocker.ezUi.ezSetElementProperty(
                        EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockInBreakInOutButtonId,
                        'title',
                        'Clock in to start tracking time for your shift.');
                } else {
                    ezApi.ezclocker.ezUi.ezSetElementProperty(
                        EzEmployeeDashboardView.ezInstance.ezIds.buttons.clockInBreakInOutButtonId,
                        'title',
                        'You have clocked into your shift.');
                }
        }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Class Initialization and EzApi Registration Section
    // !! DO NOT PLACE ANY non-initialization fields, getter/setter methods, static methods, or class methods beyond this section !!
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    /**
     * @static
     * @public @readonly @property
     * Gets the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezEmployeeDashboardView';
    }

    /**
     * @static
     * @public @readonly @property
     * Gets an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzEmployeeDashboardView_Ready'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzEmployeeDashboardView}
     */
    static #ezInstance = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzEmployeeDashboardView.ezApiName]
        ? globalThis.ezApi.ezclocker[EzEmployeeDashboardView.ezApiName]
        : null;
    /**
     * @static
     * @public @property @getter
     * Gets the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzEmployeeDashboardView}
     */
    static get ezInstance() {
        return EzEmployeeDashboardView.#ezInstance;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzEmployeeDashboardView} instance
     */
    static set ezInstance(instance) {
        if (null != EzEmployeeDashboardView.#ezInstance) {
            throw new Error('EzEmployeeDashboardView\'s singleton instance is already reigstered with EzApi.');
        }

        EzEmployeeDashboardView.#ezInstance = instance;
    }

    /**
     * @static
     * @private @field
     * Stores the EzApi registration state for this class.
     * Default value is NULL
     * Class is registerd with EzApi when value is EzRegistrationState.REGISTERED
     * @type {string}
     * A valid enum property value from EzRegistrationState
     */
    static #ezApiRegistrationState = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzEmployeeDashboardView.ezApiName]
        ? EzRegistrationState.REGISTERED
        : null;
    /**
     * @static
     * @public @property @getter
     * Gets the ezApi registration state of this classes's singleton instance.
     * @returns {string}
     * A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzEmployeeDashboardView.#ezApiRegistrationState;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzEmployeeDashboardView.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @static
     * @private @readonly @property
     * Gets true when all required dependencies for this class report ready.
     * In otherwords, the require dependency's singleton instance is created
     * and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzEmployeeDashboardView.ezApiRegistrationState &&
            globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker &&
            globalThis.ezApi.ezclocker?.[EzUI.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzBreakInBreakOutHelper.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzTimeAddEditDialogController.ezApiName]?.ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Gets if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzEmployeeDashboardView.ezInstance &&
            EzRegistrationState.REGISTERED === EzEmployeeDashboardView.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzEmployeeDashboardView.#ezCanRegister && !EzEmployeeDashboardView.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzEmployeeDashboardView, EzEmployeeDashboardView.ezApiName);
        }

        return EzEmployeeDashboardView.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzEmployeeDashboardView.ezApiName
     *     2) Property getter EzEmployeeDashboardView.ezEventNames
     *     3) Property getter EzEmployeeDashboardView.ezInstance
     *     4) Property setter EzEmployeeDashboardView.ezInstance
     *     5) Property getter EzEmployeeDashboardView.ezApiRegistrationState
     *     6) Property setter EzEmployeeDashboardView.ezApiRegistrationState
     *     7) Property getter EzEmployeeDashboardView.#ezCanRegister
     *     8) Property getter EzEmployeeDashboardView.#ezIsRegistered
     *     9) Method EzEmployeeDashboardView.#ezRegistrator()
     */
    static {
        if (!EzEmployeeDashboardView.#ezIsRegistered) {
            EzEmployeeDashboardView.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzEmployeeDashboardView.#ezRegistrator()) {
                document.addEventListener(
                    EzEmployeeDashboardView.ezOnEzApiReadyEventName,
                    EzEmployeeDashboardView.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzEmployeeDashboardView.#ezRegistrator);

                document.addEventListener(
                    EzBreakInBreakOutHelper.ezEventNames.onReady,
                    EzEmployeeDashboardView.#ezRegistrator);

                document.addEventListener(
                    EzTimeAddEditDialogController.ezEventNames.onReady,
                    EzEmployeeDashboardView.#ezRegistrator);
            }
        }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // !! DO NOT PLACE ANY non-initialization fields, getter/setter methods, static methods, or class methods beyond above section !!
    // NO CODE AFTER THIS SECTION
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

}

import { EzBadparamException } from '/ezlibrary/exceptions/EzBadparamException.js';

import { EzClockerFeature } from '/ezlibrary/EzClockerFeature.js';

import { EzUI } from '/public/javascript/common/ezui.js';

class EzTimeEntryGrid {
    static ezApiName = 'ezTimeEntryGrid';
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzTimeEntryGrid.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') && globalThis['ezApi'].ready &&
            ezApi.ezclocker[EzUI.ezApiName] && ezApi.ezclocker[EzUI.ezApiName].ready;
    }
    static ezRegistrator() {
        if (EzTimeEntryGrid.ezCanRegister()) {
            EzTimeEntryGrid.ezInstance = ezApi.ezRegisterNewApi(
                EzTimeEntryGrid,
                EzTimeEntryGrid.ezApiName);

            EzTimeEntryGrid.ezApiRegistrationState = 'REGISTERED';
        }
    }
    // Static Initialization
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                this.ezRegistrator);

            document.addEventListener(
                EzUI.ezEventNames.onReady,
                this.ezRegistrator);
        }
    }

    constructor() {
        this.ready = false;
        this.ezTypeName = 'EzTimeEntryGrid';
    }

    ezInit() {
        return EzTimeEntryGrid.ezInstance;
    }

    /**
        @protected
        Performs the QuickRefresh of the employee time entry UI
        @returns {Promise.resolve}
        A resolve only promise.
     */
    ezRefreshTimeEntryUx(employeeInfo) {
        const self = EzTimeEntryGrid.ezInstance;

        if (!ezApi.ezIsValid(employeeInfo)) {
            throw new EzBadparamException('employeeInfo', self.ezTypeName, 'ezRefreshTimeEntryUx');
        }

        return ezUi.ezPageWaitAsync('Refreshing employee time entries ...', (waitDone, finished) => {
            ezUi.ezDisable('_quickFilterSubmit');
            return self.ezBuildEmployeeTimeEntryGrid(employeeInfo)
                .then(() => {
                    ezUi.ezEnable('_quickFilterSubmit');
                    waitDone();
                    return finished();
                });
        });
    }

    /**
        @protected
        Builds the HTML for the time entry display grid
        @returns {Promise.resolve}
     */
    ezBuildEmployeeTimeEntryGrid() {
        const self = EzTimeEntryGrid.ezInstance;

        return ezApi.ezAsyncAction((waitDone, finished) => self.ezResetTimeEntryGrid()
            .then(() => {
                let activeEmployee = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee();

                if (!ezApi.ezIsValid(activeEmployee) || !ezApi.ezArrayHasLength(activeEmployee.timeEntries)) {
                    ezUi.ezContent(
                        self.ezTimeEntryContainerId,
                        ezApi.ezTemplate`<h1>The employee does not have time entries for the selected period.</h1>`);
                    waitDone();
                    return finished();
                }

                return self.ezBuildTimeEntryRows()
                    .then((timeEntryRowsHTML) => {
                        let jobsCol =
                            ezApi.ezclocker.ezClockerContext
                                .ezActiveEmployerFeatureEnabled(EzClockerFeature.EZ_JOBS)
                                ? ezApi.ezTemplate`
                                <td class="ezGridHeaderCell ezGridJobHeaderCell">
                                    Job
                                </td>`
                                : '';

                        let timeEntryRows = '';
                        timeEntryRowsHTML.forEach((rowHtml) => timeEntryRows += rowHtml);

                        // Time Entry Header Data
                        ezUi.ezContent(
                            self.ezTimeEntryContainerId,
                            ezApi.ezTemplate`
                                <table class="ezGrid" id="timeEntryTableHeader">
                                    <thead>
                                        <tr class="header">
                                            <td class="ezGridHiddenCell"></td>
                                            <td class="ezGridHeaderCell ezGridDateCell">Clocked In Date</td>
                                            <td class="ezGridHeaderCell ezGridTimeCell">Clocked In Time</td>
                                            <td class="ezGridHeaderCell ezGridDateCell">Clocked Out Date</td>
                                            <td class="ezGridHeaderCell ezGridTimeCell">Clocked Out Time</td>
                                            <td class="ezGridHeaderCell ezGridTotalTimeCell ezRightAlign">
                                                Total (hh:mm)
                                            </td>
                                            ${jobsCol}
                                            <td class="ezGridHeaderCell ezGridNotesHeaderCell">Notes</td>
                                            <td class="ezGridHeaderCell ezGridMapCell centerCell">
                                                <img src="/public/images/icons/gps_location_info.svg"
                                                    alt="Location Information"
                                                    title="Location Information" class="ezGridLocationHeaderImage"/>
                                            </td>
                                        </tr>
                                    </thead>
                                <tbody class="ezGridData" id="_TimeEntryTableBody">
                                    ${timeEntryRows}
                                </tbody>
                            </table>`);

                        waitDone();
                        return finished();
                    });
            }));
    }

    /**
        @protected
        Builds the time entry grid's time entry rows.
        @returns {Promise.resolve}
     */
    ezBuildTimeEntryRows() {
        const self = EzTimeEntryGrid.ezInstance;

        let timeEntries = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployeeTimeEntries();
        if (!ezApi.ezArrayHasLength(timeEntries)) {
            return ezApi.ezResolve('');
        }

        return ezApi.ezResolver((resolve) => {
            let timeEntryRowsHTML = [];
            let teProcessedCount = 0;
            let totalTimeEntries = timeEntries.length;

            for (let tIndex = 0; tIndex < totalTimeEntries; tIndex++) {
                let timeEntry = timeEntries[tIndex];
                timeEntry.timeEntryIndex = tIndex;

                timeEntryRowsHTML.push('');
                self.ezBuildTimeEntryRow(timeEntry, true)
                    .then((rowResponse) => {
                        timeEntryRowsHTML[rowResponse.timeEntry.timeEntryIndex] = rowResponse.timeEntryRow;
                        teProcessedCount++;
                        if (teProcessedCount >= totalTimeEntries) {
                            return resolve(timeEntryRowsHTML);
                        }
                    });
            }
        });
    }

    /**
        @protected
        Builds the HTML for a single time entry row
        @param {Object} timeEntry
        @param {Object} clockInLocation
        @param {Object} clockOutLocation
        @param {Boolean} showAuditButton
        @returns {Promise.resolve}
     */
    ezBuildTimeEntryRow(timeEntry, showAuditButton) {
        const self = EzTimeEntryGrid.ezInstance;

        if (!ezApi.ezIsValid(timeEntry)) {
            throw new EzBadparamException('timeEntry', self.ezTypeName, 'ezBuildTimeEntryRow');
        }

        let totalHours = parseInt(timeEntry.totalTime.split(':'));
        let rowClass = ezApi.ezTemplate`ezGridDataCell ${self.ezGetTimeEntryRowCSSClass(timeEntry, totalHours)}`;

        return ezApi.ezResolver((resolve) => {
            return self.ezBuildGPSInfoCell(timeEntry, rowClass).then(
                (gpsInfoHtml) => {
                    let clockInMoment = ezApi.ezclocker.ezDateTime.ezCreateFromIso(timeEntry.clockInIso);
                    let clockOutMoment = ezApi.ezclocker.ezDateTime.ezCreateFromIso(timeEntry.clockOutIso);
                    let jobCodeName = ezApi.ezIsValid(timeEntry.primaryAssignedJob)
                        ? ezApi.ezStringOrEmpty(timeEntry.primaryAssignedJob.tagName)
                        : '';

                    let clockOutHTML = timeEntry.isActiveClockIn || timeEntry.isActiveBreak
                        ? ezApi.ezTemplate`
                            <td id="clockOutDate_$[timeEntry.id}" class="ezGridDateCell ${rowClass}">
                                --
                            </td>
                            <td id="clockOutTime_${timeEntry.id}" class="ezGridTimeCell ${rowClass}">
                                --
                            </td>`
                        : ezApi.ezTemplate`
                            <td id="clockOutDate_${timeEntry.id}" class="ezGridDateCell ${rowClass}">
                                ${clockOutMoment.format('ddd MM/DD/YYYY')}
                            </td>
                            <td id="clockOutTime_${timeEntry.id}" class="ezGridTimeCell ${rowClass}">
                                ${clockOutMoment.format('hh:mm a')}
                            </td>`;

                    let jobHTML = ezApi.ezclocker.ezClockerContext.ezActiveEmployerFeatureEnabled(
                        EzClockerFeature.EZ_JOBS)
                        ? ezApi.ezTemplate`
                            <td id="jobcode_${timeEntry.id}" class="ezGridJobCell ${rowClass}">
                                ${jobCodeName}
                            </td>`
                        : '';

                    let isBreak = ezApi.ezStringHasLength(timeEntry.timeEntryType) &&
                        'break' === timeEntry.timeEntryType.toLowerCase()
                        ? '-'
                        : '';

                    // Time Entry Buttons
                    return resolve({
                        timeEntryRow: ezApi.ezTemplate`
                        <tr id="_TimeEntry_${timeEntry.id}" class="ezGridDataRow">
                            <td class="ezTimeEntryGridButtonCell">
                                <table id="EzTimeEntryEditContainer" class="ezFullWidth">
                                    <tr>
                                        <td>
                                            ${self.ezBuildTimeEntryRowEditButtons(timeEntry.id, showAuditButton)}
                                        </td>
                                        <td>
                                            ${self.ezBuildTimeEntryRowHintImage(timeEntry, totalHours)}
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td id="clockInDate_${timeEntry.id}" class="ezGridDateCell ${rowClass}">
                                ${clockInMoment.format('ddd MM/DD/YYYY')}
                            </td>
                            <td id="clockInTime_${timeEntry.id}" class="ezGridTimeCell ${rowClass}">
                                ${clockInMoment.format('hh:mm a')}
                            </td>
                            ${clockOutHTML}
                            <td id="totalTime_${timeEntry.id}" class="ezGridTotalTimeCell ${rowClass} ezRightAlign">
                                ${isBreak}${timeEntry.totalForShift}
                            </td>
                            ${jobHTML}
                            <td id="notes_${timeEntry.id}" class="ezGridNotesCell ${rowClass}">
                                ${ezApi.ezStringOrEmpty(timeEntry.notes)}
                            </td>
                            ${gpsInfoHtml}
                        </tr>`,
                        timeEntry: timeEntry
                    });
                });
        });
    }

}

export {
    EzTimeEntryGrid
};

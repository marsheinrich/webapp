import { EzBadParamException } from '/ezlibrary/exceptions/EzExceptions.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzArray,
    EzHtml,
    EzJson,
    EzPromise,
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzTimeOffStatus,
    EzTimeOffType,
    EzElementEventName
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzDateTime } from '/public/javascript/common/ez-date-time.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

import { EzUI } from '/public/javascript/common/ezui.js';

import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';

import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * Dialog for request time off
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *     import { EzTimeOffRequestDialog } from '/secure/widgets/EzTimeOffDialogs/EzTimeOffRequestDialog.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Ready check:
 *     globalThis.ezApi.ezclocker?.[EzTimeOffRequestDialog.ezApiName]?.ready
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Listen for ready event:
 *     document.addEventListener(
 *         EzTimeOffRequestDialog.ezEventNames.onReady,
 *         (listening_class).#ezRegistrator);
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Singleton Instance Access:
 *      Outside this class: ezApi.ezclocker.ezTimeOffRequestDialog
 *      Within this class: EzTimeOffRequestDialog.ezInstance
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzTimeOffRequestDialog extends EzClass {
    /**
     * @private @field
     * Stores the preferried time zone option value
     */
    #ezPreferredTimeZoneOptionValue = EzString.EMPTY;
    /**
     * @public @property @getter
     * Gets the preferried time zone option value
     * @returns {string}
     */
    get ezPreferredTimeZoneOptionValue() {
        if (!EzString.hasLength(this.#ezPreferredTimeZoneOptionValue)) {
            this.#ezPreferredTimeZoneOptionValue = ezApi.ezclocker.ezDateTime.activeTimeZone;
        }

        return this.#ezPreferredTimeZoneOptionValue;
    }
    /**
     * @public @property @setter
     * Sets the preferried time zone option value
     * @param {string} preferredTimeZone
     * Default: ezApi.ezclocker.ezDateTime.activeTimeZone
     */
    set ezPreferredTimeZoneOptionValue(preferredTimeZone) {
        this.#ezPreferredTimeZoneOptionValue = EzString.stringOrDefault(
            preferredTimeZone,
            ezApi.ezclocker.ezDateTime.activeTimeZone);
    }

    /**
     * @public @readonly @property
     * Gets if the logged in user is a Employer, Payroll Manager logged in as a employer, or Manager logged in as a Employer.
     */
    get isEmployer() {
        return ezApi.ezclocker.ezClockerContext.ezGetUserContext().isEmployerOrActingAsEmployer;
    }

    /**
     * @public @readonly @property
     * Gets if the logged in user is a employer's employee (not personal)
     */
    get isPureEmployee() {
        return ezApi.ezclocker.ezClockerContext.ezGetUserContext().isPureEmployee;
    }

    /**
     * @pulic @readonly @property
     * @returns {string}
     */
    get ezParentContainerId() {
        return '_HideDialogsDiv';
    }

    /**
     * @pulic @readonly @property
     * @returns {string}
     */
    get ezDialogId() {
        return 'EzTimeOffRequestDialog';
    }

    /**
     * @pulic @readonly @property
     * @returns {string}
     */
    get TIMEOFF_API_URL() {
        return ezApi.ezclocker.ezNavigation.getInternalApiUrl('timeoff', 'v1');
    }

    /**
     * @public @method
     * Initializes ezwRequestTimeOffDialog
     * @returns {EzTimeOffRequestDialog}
     */
    ezInit() {
        const ezDefaultClockInMoment = ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay().hour(9);

        EzTimeOffRequestDialog.ezInstance.ezInitUX(
            ezDefaultClockInMoment,
            ezApi.ezclocker.ezDateTime.ezCreateFromMoment(ezDefaultClockInMoment).add(8, 'hours'));

        return EzTimeOffRequestDialog.ezInstance;
    }

    /**
     * @public @method
     * Initializes the dialog's UX
     */
    ezInitUX() {
        if (!ezApi.ezclocker.ezUi.ezElementExists(EzTimeOffRequestDialog.ezInstance.ezParentContainerId)) {
            ezApi.ezclocker.ezUi.ezAppendHtml$(
                'body',
                EzHtml.build`
                    <div
                        id="${EzTimeOffRequestDialog.ezInstance.ezParentContainerId}"
                        class="ezHiddenByDefault">
                    </div>`);
        }

        EzTimeOffRequestDialog.ezInstance.ezBuildDialogHtml();

        let dialogConfig = new EzDialogConfig(EzTimeOffRequestDialog.ezInstance.ezDialogId);

        dialogConfig.width = 780;

        dialogConfig.icons = {
            primary: 'ui-icon-check',
            secondary: 'ui-icon-blank'
        };

        dialogConfig.buttons = [
            {
                id: `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_sendTimeOffRequestBtn`,
                text: 'Send Request',
                click: EzTimeOffRequestDialog.ezInstance.ezSubmit
            },
            {
                id: `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_CancelBtn`,
                text: 'Cancel',
                click: EzTimeOffRequestDialog.ezInstance.ezClose
            }
        ];

        ezApi.ezclocker.ezUi.ezId(EzTimeOffRequestDialog.ezInstance.ezDialogId).dialog(dialogConfig);

        EzTimeOffRequestDialog.ezInstance.ezInitDialogControls();
    }

    /**
     * @public @method
     * Builds the dialog's HTML and initializes the jquery dialog wrapper
     */
    ezBuildDialogHtml() {
        ezApi.ezclocker.ezUi.ezAppendContent(
            EzTimeOffRequestDialog.ezInstance.ezParentContainerId,
            EzHtml.build`
                <div
                    id="${EzTimeOffRequestDialog.ezInstance.ezDialogId}"
                    title="Request Time Off">
                    <div
                        id="${EzTimeOffRequestDialog.ezInstance.ezDialogId}_time-off-main-fragment">
                        <div
                            id="EzRequestTimeOffDialog"
                            title="Request Time Off Dialog">
                            <div
                                id="${EzTimeOffRequestDialog.ezInstance.ezDialogId}MainDiv"
                                class="ezSilverBox marginTop10 ezRequestTimeOffDialogMainDiv">
                                <table
                                    id="${EzTimeOffRequestDialog.ezInstance.ezDialogId}MainTable"
                                    class="ezFullWidth ezRequestTimeOffDialogMainTable">
                                    <tr
                                        id="${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EmployeeIds_div"
                                        style="display:flex">
                                        <td
                                            class="ezRequestTimeOffDialog_EmployeeIds_div leftAlignCell">
                                            <label
                                                for="${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EmployeeIds">
                                                Select Employee
                                            </label>
                                            <select
                                                id="${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EmployeeIds"
                                                class="ezRequestTimeOffDialog_EmployeeIds">
                                            </select>
                                        </td>
                                        <td
                                            class="leftAlignCell"
                                            style="display: flex; margin-top: 24px;padding-left: 5px;"
                                            id="${EzTimeOffRequestDialog.ezInstance.ezDialogId}_ApplyToAllEmployees_Section">
                                            <input
                                                id="${EzTimeOffRequestDialog.ezInstance.ezDialogId}_ApplyToAllEmployees"
                                                type="checkbox" />
                                            <label
                                                for="${EzTimeOffRequestDialog.ezInstance.ezDialogId}_ApplyToAllEmployees"
                                                style="padding-top: 4px;">
                                                Apply time off to all employees
                                            </label>
                                        </td>
                                    </tr>
                                    <tr
                                        style="display: flex; margin-bottom: 10px">
                                        <td
                                            class="leftAlignCell">
                                            <div
                                                for="${EzTimeOffRequestDialog.ezInstance.ezDialogId}_RequestType">
                                                Request Type
                                            </div>
                                            <select
                                                id="${EzTimeOffRequestDialog.ezInstance.ezDialogId}_RequestType"
                                                class="ezRequestTimeOffDialog_RequestType">
                                                <option
                                                    selected
                                                    value="${EzTimeOffType.PAID_PTO}">
                                                    ${EzTimeOffType.ezEnumData(EzTimeOffType.PAID_PTO).displayName}
                                                </option>
                                                <option
                                                    value="${EzTimeOffType.PAID_SICK}">
                                                    ${EzTimeOffType.ezEnumData(EzTimeOffType.PAID_SICK).displayName}
                                                </option>
                                                <option
                                                    value="${EzTimeOffType.UNPAID_TIME_OFF}">
                                                    ${EzTimeOffType.ezEnumData(EzTimeOffType.UNPAID_TIME_OFF).displayName}
                                                </option>
                                            </select>
                                        </td>
                                        <td
                                            id="${EzTimeOffRequestDialog.ezInstance.ezDialogId}_HoursPerDay_TableData"
                                            class="leftAlignCell"
                                            style="width: 109px;">
                                            <label
                                                for="${EzTimeOffRequestDialog.ezInstance.ezDialogId}_HoursPerDay">
                                                Hours per Day
                                            </label>
                                            <input
                                                id="${EzTimeOffRequestDialog.ezInstance.ezDialogId}_HoursPerDay"
                                                type="number"
                                                name="EzRequestTimeOffDialog_HoursPerDay"
                                                min="0"
                                                max="24"
                                                class="ezRequestTimeOffDialog_HoursPerDay"/>
                                        </td>
                                        <td
                                            class="leftAlignCell"
                                            style="width: 100px; display: flex; margin-top: 24px;">
                                            <input
                                                id="${EzTimeOffRequestDialog.ezInstance.ezDialogId}_AllDay"
                                                type="checkbox" />
                                            <label
                                                for="${EzTimeOffRequestDialog.ezInstance.ezDialogId}_AllDay"
                                                style="padding-top: 4px;">
                                                All Day
                                            </label>
                                        </td>
                                    </tr>
                                    <tr
                                        style="display: flex; margin-bottom: 15px">
                                        <td
                                            class="leftAlignCell">
                                            <label>
                                                Start
                                            </label>
                                            <br />
                                            <div
                                                style="display: flex">
                                                <input
                                                    id="${EzTimeOffRequestDialog.ezInstance.ezDialogId}_StartDate"
                                                    type="text"
                                                    readonly="true"
                                                    class="ezRequestTimeOffDialog_StartDate" />
                                                <input
                                                    id="${EzTimeOffRequestDialog.ezInstance.ezDialogId}_StartTime"
                                                    type="text"
                                                    class="ezRequestTimeOffDialog_StartTime"
                                                    style="display:none"/>
                                            </div>
                                        </td>
                                        <td
                                            class="leftAlignCell"
                                            style="padding-left: 10px;">
                                            <label>
                                                End
                                            </label>
                                            <br/>
                                            <div
                                                style="display: flex">
                                                <input
                                                    id="${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EndDate"
                                                    type="text"
                                                    readonly="true"
                                                    class="ezRequestTimeOffDialog_EndDate" />
                                                <input
                                                    id="${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EndTime"
                                                    type="text"
                                                    class="ezRequestTimeOffDialog_EndTime"
                                                    style="display:none"/>
                                            </div>
                                        </td>
                                    </tr>
                                    <!-- Preferred Time Zone Option -->
                                    <tr
                                        style="display: flex; margin-bottom: 15px">
                                        <td
                                            class="leftAlignCell">
                                            <label
                                                for="EZOPTION_REQUEST_TIMEOFF_PREFERRED_TIMEZONE"
                                                class="ezLabel">
                                                Employee Time Zone
                                            </label>
                                            <select
                                                id="EZOPTION_REQUEST_TIMEOFF_PREFERRED_TIMEZONE"
                                                class="ezFullWidth">
                                            </select>
                                        </td>
                                    </tr>
                                    <tr
                                        style="display:flex;margin-bottom:10px">
                                        <td
                                            class="leftAlignCell">
                                            <div
                                                style="vertical-align: top;" for="${EzTimeOffRequestDialog.ezInstance.ezDialogId}_Notes">
                                                Notes
                                            </div>
                                            <textarea
                                                id="${EzTimeOffRequestDialog.ezInstance.ezDialogId}_Notes"
                                                type="text"
                                                maxlength="500"
                                                class="ezRequestTimeOffDialog_Notes">
                                            </textarea>
                                        </td>
                                    </tr>
                                    <tr
                                        style="display:flex;margin-bottom:5px;width:100%;margin-top:30px;">
                                        <td
                                            class="leftAlignCell"
                                            style="display:inline-block;">
                                            <label
                                                id="${EzTimeOffRequestDialog.ezInstance.ezDialogId}_TotalTimeOffLabel"
                                                class="ezRequestTimeOffDialog_TotalTimeOffLabel">
                                                Total Time Off Hours
                                            </label>
                                            <label
                                                id="${EzTimeOffRequestDialog.ezInstance.ezDialogId}_TotalTimeOff"
                                                class="ezRequestTimeOffDialog_TotalTimeOff">
                                            </label>
                                        </td>
                                        <td
                                            class="leftAlignCell"
                                            style="width: 50%">
                                            <div
                                                id="${EzTimeOffRequestDialog.ezInstance.ezDialogId}_ValidationError"
                                                class="ezRequestTimeOffDialog_ValidationError_Main_Div">
                                                <div
                                                    class="ezRequestTimeOffDialog_ValidationError">
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>`);
    }

    /**
     * @public @method
     * Initializes this dialog's UX controls
     */
    ezInitDialogControls() {
        ezApi.ezclocker.ezUi.ezSetInputValue(
            `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_Notes`,
            EzString.EMPTY);

        ezApi.ezclocker.ezUi.ezClearContent(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EmployeeIds`);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_AllDay`,
            EzElementEventName.CLICK,
            EzTimeOffRequestDialog.ezApiName,
            EzTimeOffRequestDialog.ezInstance.ezCalculateStartAndEndTimeAndHourPerDay
        );

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_RequestType`,
            EzElementEventName.CHANGE,
            EzTimeOffRequestDialog.ezApiName,
            EzTimeOffRequestDialog.ezInstance.ezShowOrHideApplyToAllEmployees
        );

        const startMoment = ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay().hour(9);

        ezApi.ezclocker.ezDateTime.ezInitDateTimePicker(
            `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_StartDate`,
            {
                change: (event) => {
                    EzTimeOffRequestDialog.ezInstance.ezUpdateEndDateRestrictions();

                    EzTimeOffRequestDialog.ezInstance.ezCalculateHoursPerDayAndTotalHours(event);
                },
                onClose: () => {
                    let tempStartMoment = ezApi.ezclocker.ezDateTime.ezDateFromDatePicker(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_StartDate`);

                    ezApi.ezclocker.ezUi.ezId(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EndDate`).datepicker(
                        'option',
                        'minDate',
                        tempStartMoment.toDate());

                    ezApi.ezclocker.ezUi.ezId(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EndDate`).datepicker(
                        'option',
                        'maxDate',
                        ezApi.ezclocker.ezDateTime.ezToEndOfYear(tempStartMoment).toDate());
                }
            },
            {
                dateFormat: EzDateTime.DEFAULT_DATE_PICKER_FORMAT,
                constrainInput: true
            },
            startMoment
        );

        ezApi.ezclocker.ezUi.ezId(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_StartTime`).timepicker({
            timeFormat: 'hh:mm:ss tt',
            showPeriod: true,
            showLeadingZero: true
        });

        ezApi.ezclocker.ezUi.ezId(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EndTime`).timepicker({
            timeFormat: 'hh:mm:ss tt',
            showPeriod: true,
            showLeadingZero: true
        });

        ezApi.ezclocker.ezDateTime.ezSetTimePickerValue(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_StartTime`, startMoment);

        ezApi.ezclocker.ezUi.ezHideElement(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_StartTime`);

        ezApi.ezclocker.ezUi.ezHookElementEvent(
            `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_StartTime`,
            'change',
            EzTimeOffRequestDialog.ezInstance.ezCalculateHoursPerDayAndTotalHours);

        ezApi.ezclocker.ezUi.ezHookElementEvent(
            `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_StartDate`,
            'change',
            EzTimeOffRequestDialog.ezInstance.ezCalculateHoursPerDayAndTotalHours);

        ezApi.ezclocker.ezUi.ezHookElementEvent(
            `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EndDate`,
            'change',
            EzTimeOffRequestDialog.ezInstance.ezCalculateHoursPerDayAndTotalHours);

        const endMoment = ezApi.ezclocker.ezDateTime.ezCreateFromMoment(startMoment).add(8, 'hours');

        ezApi.ezclocker.ezDateTime.ezInitDateTimePicker(
            ezApi.ezclocker.ezUi.ezIsCheckboxChecked(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_AllDay`)
                ? `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EndDate`
                : `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_StartDate`,
            {
                change: EzTimeOffRequestDialog.ezInstance.ezCalculateHoursPerDayAndTotalHours
            },
            {
                dateFormat: EzDateTime.DEFAULT_DATE_PICKER_FORMAT,
                minDate: ezApi.ezclocker.ezDateTime.ezDateFromDatePicker(
                    `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_StartDate`)
                    .toDate(),
                maxDate: ezApi.ezclocker.ezDateTime.ezToEndOfYear(
                    ezApi.ezclocker.ezDateTime.ezDateFromDatePicker(
                        `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_StartDate`))
                    .toDate()
            },
            endMoment);

        ezApi.ezclocker.ezUi.ezShowElement(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EndDate`);

        ezApi.ezclocker.ezDateTime.ezSetTimePickerValue(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EndTime`, endMoment);

        ezApi.ezclocker.ezUi.ezHideElement(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EndTime`);

        ezApi.ezclocker.ezUi.ezHookElementEvent(
            `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EndTime`,
            'change',
            EzTimeOffRequestDialog.ezInstance.ezCalculateHoursPerDayAndTotalHours);

        ezApi.ezclocker.ezUi.ezSetInputValue(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_HoursPerDay`, 8);

        ezApi.ezclocker.ezUi.ezEnableElement(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_HoursPerDay`);

        ezApi.ezclocker.ezUi.ezHookElementEvent(
            `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_HoursPerDay`,
            'click',
            EzTimeOffRequestDialog.ezInstance.ezCalculateTotalHours);

        ezApi.ezclocker.ezUi.ezHookElementEvent(
            `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_HoursPerDay`,
            'keyup mouseup',
            EzTimeOffRequestDialog.ezInstance.ezCalculateTotalHours);

        ezApi.ezclocker.ezUi.ezSetInputValue(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_TotalTimeOff`, '8 hours');

        ezApi.ezclocker.ezUi.ezSetContent(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_TotalTimeOff`, '8 hours');

        ezApi.ezclocker.ezUi.ezHideElement(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EmployeeIds_div`);
    }

    ezShowOrHideApplyToAllEmployees() {
        if (ezApi.ezclocker.ezUi.ezGetInputValue(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_RequestType`) === EzTimeOffType.PAID_HOLIDAY && EzTimeOffRequestDialog.ezInstance.isEmployer) {
            ezApi.ezclocker.ezUi.ezShowElement(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_ApplyToAllEmployees_Section`);
            ezApi.ezclocker.ezUi.ezSetCheckboxValue(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_ApplyToAllEmployees`, false);
        } else {
            ezApi.ezclocker.ezUi.ezHideElement(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_ApplyToAllEmployees_Section`);
        }

    }

    /**
     * @public @method
     * Calculates the start and end time and hours per day
     */
    ezCalculateStartAndEndTimeAndHourPerDay() {
        EzTimeOffRequestDialog.ezInstance.ezHideErrorComponent();

        ezApi.ezclocker.ezDateTime.ezSetTimePickerValue(
            `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_StartDate`,
            ezApi.ezclocker.ezDateTime.ezMomentFromDatePicker(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_StartDate`)
                .hour(9)
                .minute(0)
                .seconds(0)
                .millisecond(0));

        ezApi.ezclocker.ezDateTime.ezSetTimePickerValue(
            ezApi.ezclocker.ezUi.ezIsCheckboxChecked(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_AllDay`)
                ? `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EndDate`
                : `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_StartDate`,
            ezApi.ezclocker.ezDateTime.ezMomentFromDatePicker(
                ezApi.ezclocker.ezUi.ezIsCheckboxChecked(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_AllDay`)
                    ? `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EndDate`
                    : `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_StartDate`)
                .hour(17)
                .minute(0)
                .seconds(0)
                .millisecond(0));

        ezApi.ezclocker.ezUi.ezSetInputValue(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_HoursPerDay`, 8);

        ezApi.ezclocker.ezUi.ezSetInputValue(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_TotalTimeOff`, '8 hours');

        ezApi.ezclocker.ezDateTime.ezSetDatePickerValue(
            `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_StartDate`,
            ezApi.ezclocker.ezDateTime.ezNow());

        const startMoment = ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay().hour(9);

        ezApi.ezclocker.ezDateTime.ezSetTimePickerValue(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_StartTime`, startMoment);

        const endMoment = ezApi.ezclocker.ezDateTime.ezCreateFromMoment(startMoment).add(8, 'hours');

        ezApi.ezclocker.ezDateTime.ezSetTimePickerValue(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EndTime`, endMoment);

        ezApi.ezclocker.ezDateTime.ezSetDatePickerValue(
            `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EndDate`,
            ezApi.ezclocker.ezDateTime.ezNow());

        ezApi.ezclocker.ezUi.ezShowElement(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EndDate`);

        if (ezApi.ezclocker.ezUi.ezIsCheckBoxChecked(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_AllDay`)) {
            ezApi.ezclocker.ezUi.ezDisableElement('EzTimeOffRequestDialog_StartTime');

            ezApi.ezclocker.ezUi.ezDisableElement('EzTimeOffRequestDialog_EndTime');

            ezApi.ezclocker.ezUi.ezShowElement('EzTimeOffRequestDialog_HoursPerDay_TableData');

            ezApi.ezclocker.ezUi.ezDisableElement(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_HoursPerDay`);

            ezApi.ezclocker.ezUi.ezSetInputReadOnly(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_HoursPerDay`);

            ezApi.ezclocker.ezUi.ezHideElement(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_StartTime`);

            ezApi.ezclocker.ezUi.ezHideElement(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EndTime`);

            const startMoment = ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay().hour(9);

            ezApi.ezclocker.ezDateTime.ezSetTimePickerValue(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_StartTime`, startMoment);

            const endMoment = ezApi.ezclocker.ezDateTime.ezCreateFromMoment(startMoment).add(8, 'hours');

            ezApi.ezclocker.ezDateTime.ezSetTimePickerValue(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EndTime`, endMoment);

            ezApi.ezclocker.ezDateTime.ezSetDatePickerValue(
                `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EndDate`,
                ezApi.ezclocker.ezDateTime.ezNow());

            ezApi.ezclocker.ezUi.ezShowElement(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EndDate`);
        } else {
            ezApi.ezclocker.ezUi.ezHideElement('EzTimeOffRequestDialog_HoursPerDay_TableData');

            ezApi.ezclocker.ezUi.ezEnableElement('EzTimeOffRequestDialog_StartTime');

            ezApi.ezclocker.ezUi.ezEnableElement('EzTimeOffRequestDialog_EndTime');

            ezApi.ezclocker.ezUi.ezShowElement(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_StartTime`);

            ezApi.ezclocker.ezUi.ezShowElement(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EndTime`);

        }

        EzTimeOffRequestDialog.ezInstance.ezCalculateHoursPerDayAndTotalHours();
    }

    /**
     * @public @method
     * Updates the end-date restrictions once the start date has changed
     */
    ezUpdateEndDateRestrictions() {
        let startMoment = ezApi.ezclocker.ezDateTime.ezMomentFromDatePicker(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_StartDate`);

        let endMoment = ezApi.ezclocker.ezDateTime.ezMomentFromDatePicker(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EndDate`);

        ezApi.ezclocker.ezUi.ezId$(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EndDate`).datepicker(
            'option',
            'minDate',
            startMoment.toDate());

        ezApi.ezclocker.ezUi.ezId$(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EndDate`).datepicker(
            'option',
            'maxDate',
            ezApi.ezclocker.ezDateTime.ezToEndOfYear(startMoment).toDate());

        if (startMoment.year() !== endMoment.year()) {
            endMoment = ezApi.ezclocker.ezDateTime.ezCreateFromMoment(startMoment).add(8, 'hours');

            ezApi.ezclocker.ezUi.ezId$(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EndDate`).datepicker(
            'date',
            endMoment.toDate());
        }
    }

    /**
     * @public @method
     * Calculates the hours per day and total hours
     */
    ezCalculateHoursPerDayAndTotalHours() {
        EzTimeOffRequestDialog.ezInstance.ezHideErrorComponent();

        let hoursOfRequest;

        let allDay = ezApi.ezId(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_AllDay`).is(':checked');

        if (EzBoolean.isTrue(allDay)) {
            hoursOfRequest = EzNumber.strToIntDefault(
                ezApi.ezclocker.ezUi.ezGetInputValue(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_HoursPerDay`),
                0);
        } else {
            hoursOfRequest = EzTimeOffRequestDialog.ezInstance.ezGetTimeDuration();

            if (0 > hoursOfRequest) {
                hoursOfRequest = 0;
            }

            ezApi.ezclocker.ezUi.ezSetInputValue(
                `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_HoursPerDay`,
                hoursOfRequest);
        }

        EzTimeOffRequestDialog.ezInstance.ezCalculateTotalHours();
    }

    /**
     * @public @method
     * Gets the days duration
     */
    ezGetDaysDuration() {
        const allDay = ezApi.ezclocker.ezUi.ezIsCheckBoxChecked(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_AllDay`);

        const startDate = moment(ezApi.ezclocker.ezUi.ezGetInputValue(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_StartDate`));

        const endDate = moment(ezApi.ezclocker.ezUi.ezGetInputValue(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EndDate`));

        const daysDuration = moment.duration(endDate.diff(startDate));

        const numberOfDaysDifference = daysDuration.asDays();

        return numberOfDaysDifference < 0 ? 0 : numberOfDaysDifference;

    }

    /**
     * @public @method
     * Gets the time duration
     * @returns {number}
     */
    ezGetTimeDuration() {
        let startMoment = moment(ezApi.ezclocker.ezUi.ezGetInputValue(
            `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_StartTime`),
            "HH:mm:ss a");

        let endMoment = moment(
            ezApi.ezclocker.ezUi.ezGetInputValue(
                `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EndTime`),
            "HH:mm:ss a");

        let timeDuration = moment.duration(endMoment.diff(startMoment));

        const totalHours = timeDuration.asHours()

        return !isNaN(totalHours) ? Math.round(totalHours * 100) / 100 : EzNumber.strToInt(totalHours);
    }

    /**
     * @public @method
     * Calculates total hours
     */
    ezCalculateTotalHours() {
        EzTimeOffRequestDialog.ezInstance.ezHideErrorComponent();

        let hoursPerDay = ezApi.ezclocker.ezUi.ezGetInputValue(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_HoursPerDay`);

        if (!EzString.stringHasLength(hoursPerDay)) {
            EzTimeOffRequestDialog.ezInstance.ezDisplayErrorComponent('Hours per day is invalid.');
            return;
        }

        hoursPerDay = parseFloat(hoursPerDay);

        if (0 > hoursPerDay || 24 < hoursPerDay) {
            EzTimeOffRequestDialog.ezInstance.ezDisplayErrorComponent('Hours per day is invalid.');
            return;
        }

        let daysOfRequest = EzTimeOffRequestDialog.ezInstance.ezGetDaysDuration();

        if (0 === hoursPerDay && daysOfRequest <= 0) {
            EzTimeOffRequestDialog.ezInstance.ezDisplayErrorComponent('Hours per day is invalid.');
            return;
        }

        let allDay = ezApi.ezId(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_AllDay`).is(':checked');

        let maxHoursPerDay = hoursPerDay;

        if (daysOfRequest > 0 && EzBoolean.isFalse(allDay)) {
            maxHoursPerDay = 24;
        }

        ezApi.ezclocker.ezUi.ezSetInputValue(
            `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_TotalTimeOff`,
            EzHtml.build`${hoursPerDay + (daysOfRequest * maxHoursPerDay)} hours`);

        ezApi.ezclocker.ezUi.ezSetContent(
            `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_TotalTimeOff`,
            EzHtml.build`${(hoursPerDay + (daysOfRequest * maxHoursPerDay))} hours`);
    }

    /**
     * @public @method
     * Shows the dialog for the employer dashboards
     * @param {String} source
     */
    ezShow() {
        EzTimeOffRequestDialog.ezInstance.ezHideErrorComponent();

        ezApi.ezclocker.ezUi.ezSetCheckboxValue(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_AllDay`, true);

        ezApi.ezclocker.ezUi.ezShowElement('EzTimeOffRequestDialog_HoursPerDay_TableData');

        EzTimeOffRequestDialog.ezInstance.ezInitDialogControls();

        EzTimeOffRequestDialog.ezInstance.ezPreferredTimeZoneOptionValue = ezApi.ezclocker.ezDateTime.activeTimeZone;

        if (EzTimeOffRequestDialog.ezInstance.isEmployer) {
            ezApi.ezclocker.ezUi.ezSetContent(
                `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_sendTimeOffRequestBtn`,
                'Add Time Off');

            ezApi.ezclocker.ezUi.ezId(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_RequestType`)
                .find(`option[value=${EzTimeOffType.PAID_HOLIDAY}]`)
                .remove();

            ezApi.ezclocker.ezUi.ezShowElement(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EmployeeIds_div`);

            ezApi.ezclocker.ezUi.ezAppend(
                `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_RequestType`,
                EzHtml.build`
                    <option
                        value="${EzTimeOffType.PAID_HOLIDAY}">
                        ${EzTimeOffType.ezEnumData(EzTimeOffType.PAID_HOLIDAY).displayName}
                    </option>`);

            if (ezApi.ezclocker.ezUi.ezGetInputValue(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_RequestType`) ===
                EzTimeOffType.PAID_HOLIDAY) {
                ezApi.ezclocker.ezUi.ezShowElement(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_ApplyToAllEmployees_Section`);
                ezApi.ezclocker.ezUi.ezSetCheckboxValue(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_ApplyToAllEmployees`, false);
            } else {
                ezApi.ezclocker.ezUi.ezHideElement(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_ApplyToAllEmployees_Section`);
            }

            ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccounts()
                .forEach(
                    (employee) => ezApi.ezclocker.ezUi.ezAppendContent(
                        `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EmployeeIds`,
                        EzHtml.build`
                            <option
                                value=${employee.id}>
                                ${employee.employeeName}
                            </option>`));

            ezApi.ezclocker.ezUi.ezId(EzTimeOffRequestDialog.ezInstance.ezDialogId)
                .dialog(
                    'option',
                    'title',
                    EzString.stringOrDefault('Add Time Off', 'Request Time Off'));
        } else {
            ezApi.ezclocker.ezUi.ezId(EzTimeOffRequestDialog.ezInstance.ezDialogId)
                .dialog(
                    'option',
                    'title',
                    'Time Off Request');
        }

        let foundMatch = false;

        let availableTimeZones = EzString.EMPTY;

        if (EzArray.arrayHasLength(ezApi.ezclocker.ezDateTime.ezSupportedTimeZones)) {
            ezApi.ezclocker.ezDateTime.ezSupportedTimeZones.forEach(
                (timeZone) => {
                    let isSelected = EzString.EMPTY;

                    if (timeZone.utc[0] === EzTimeOffRequestDialog.ezInstance.ezPreferredTimeZoneOptionValue) {
                        foundMatch = true;
                        isSelected = 'selected';
                    }

                    availableTimeZones = EzHtml.build`
                        ${availableTimeZones}
                        <option
                            id="EzAvailableTimeZone_${timeZone.abbr}"
                            value="${timeZone.utc[0]}"
                            ${isSelected}>
                            ${timeZone.value}
                        </option>`;
                });
        }

        let automaticValue = `Automatic (${ezApi.ezclocker.ezDateTime.ezGuessLocalTimeZone()})`;

        let selectDefault = EzBoolean.isFalse(foundMatch)
            ? 'selected'
            : EzString.EMPTY;

        ezApi.ezclocker.ezUi.ezSetContent(
            'EZOPTION_REQUEST_TIMEOFF_PREFERRED_TIMEZONE',
            EzHtml.build`
                <option
                    id="EzAvailableTimeZone_AUTOMATIC"
                    value="AUTOMATIC"
                    ${selectDefault}>
                    ${automaticValue}
                </option>
                ${availableTimeZones}`);

        ezApi.ezclocker.ezDialog.ezShowDialog(EzTimeOffRequestDialog.ezInstance.ezDialogId)
            .then(EzPromise.ignoreResolve);
    }

    /**
     * @public @method
     * Closes the timeoff dialog
     */
    ezClose() {
        ezApi.ezclocker.ezDialog.ezCloseDialog(EzTimeOffRequestDialog.ezInstance.ezDialogId);
    }

    /**
     * @public @method
     * Submits time off request for a user
     */
    ezSubmit() {
        EzTimeOffRequestDialog.ezInstance.ezHideErrorComponent();

        let ezRestrictTimeOffDaysGap = 'NONE';
        let ezRestrictOption = 0;

        if (EzTimeOffRequestDialog.ezInstance.isPureEmployee) {
            const employerOptions = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().options;
            if (employerOptions !== undefined) {
                ezRestrictOption = employerOptions.TIME_OFF_RESTRICT_REQUEST_START_DATE;

                if (ezRestrictOption !== undefined && parseInt(ezRestrictOption) > 0) {
                    ezRestrictTimeOffDaysGap = employerOptions.TIME_OFF_MINIMUM_DAYS_IN_FUTURE;
                }
            }
        }

        let allDay = ezApi.ezId(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_AllDay`).is(':checked');

        const preferredTimeZoneOrDefault = ezApi.ezclocker.ezUi.ezGetInputValue('EZOPTION_REQUEST_TIMEOFF_PREFERRED_TIMEZONE') === 'AUTOMATIC'
            ? ezApi.ezclocker.ezDateTime.activeTimeZone
            : ezApi.ezclocker.ezUi.ezGetInputValue('EZOPTION_REQUEST_TIMEOFF_PREFERRED_TIMEZONE');

        let startMomentActiveTimeZone = EzBoolean.isTrue(allDay)
            ? ezApi.ezclocker.ezDateTime.ezSetMomentStartOfDay(
                ezApi.ezclocker.ezDateTime.ezDateTimeFromPickers(
                    `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_StartDate`,
                    `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_StartTime`),
                preferredTimeZoneOrDefault)
            : ezApi.ezclocker.ezDateTime.ezDateTimeFromPickers(
                `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_StartDate`,
                `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_StartTime`,
                preferredTimeZoneOrDefault);

        const todayStartOfDay = ezApi.ezclocker.ezDateTime.ezSetMomentStartOfDay(moment(), preferredTimeZoneOrDefault);

        const actualDaysGapBetweenStartDateAndToday = (startMomentActiveTimeZone - todayStartOfDay) / (1000 * 24 * 60 * 60);

        if ( ezRestrictTimeOffDaysGap !== undefined &&
            ezRestrictTimeOffDaysGap !== 'NONE' &&
            !isNaN(parseInt(ezRestrictTimeOffDaysGap) ) &&
            actualDaysGapBetweenStartDateAndToday >= 0 &&
            ( actualDaysGapBetweenStartDateAndToday < parseInt(ezRestrictTimeOffDaysGap) ) ) {
            ezApi.ezclocker.ezDialog.ezShowError(
                'Time off request rejected',
                'This request has been automatically rejected because it’s less than ' + ezRestrictTimeOffDaysGap + ' days notice.'
            );

        } else {
            let requestType = ezApi.ezclocker.ezUi.ezGetInputValue(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_RequestType`);

            let applyToAllEmployees = ezApi.ezId(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_ApplyToAllEmployees`).is(':checked');

            let hoursPerDay = ezApi.ezclocker.ezUi.ezGetInputValue(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_HoursPerDay`);

            let endMomentActiveTimeZone = EzBoolean.isTrue(allDay)
                ? ezApi.ezclocker.ezDateTime.ezSetMomentEndOfDay(
                    ezApi.ezclocker.ezDateTime.ezDateTimeFromPickers(
                        `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EndDate`,
                        `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EndTime`), preferredTimeZoneOrDefault)
                : ezApi.ezclocker.ezDateTime.ezDateTimeFromPickers(
                    `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_StartDate`,
                    `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EndTime`,
                    preferredTimeZoneOrDefault);

            let notes = ezApi.ezclocker.ezUi.ezGetInputValue(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_Notes`);

            let totalHours = ezApi.ezclocker.ezUi.ezGetInputValue(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_TotalTimeOff`);

            totalHours = EzString.stringHasLength(totalHours)
                ? totalHours.substr(
                    0,
                    totalHours.indexOf(' '))
                : EzString.EMPTY;

            let timeOffRequest = {
                employerId: ezApi.ezclocker.ezClockerContext.activeEmployer.id,
                employeeId: null,
                submittedDateTimeIso: ezApi.ezclocker.ezDateTime.ezNowUTC().toISOString(),
                reviewedDateTimeIso: ezApi.ezclocker.ezDateTime.ezNowUTC().toISOString(),
                hoursPerDay: hoursPerDay,
                totalHours: totalHours,
                requestType: requestType,
                notesString: notes,
                requestStartDateIso: ezApi.ezclocker.ezDateTime.ezToIso(startMomentActiveTimeZone, preferredTimeZoneOrDefault),
                requestEndDateIso: ezApi.ezclocker.ezDateTime.ezToIso(endMomentActiveTimeZone, preferredTimeZoneOrDefault),
                requestTimeZoneId: preferredTimeZoneOrDefault,
                targetTimeZoneId: ezApi.ezclocker.ezDateTime.activeTimeZone,
                allDay: allDay
                    ? 1
                    : 0
            };

            if (!EzTimeOffRequestDialog.ezInstance.isPureEmployee) {
                timeOffRequest.requestStatus = EzTimeOffStatus.APPROVED;

                timeOffRequest.employeeId = ezApi.ezclocker.ezUi.ezGetInputValue(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_EmployeeIds`);

                const employee = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccounts()
                    .filter(emp => emp.id.toString() === timeOffRequest.employeeId);

                timeOffRequest.requestedByUserId = 0 < employee.length
                    ? employee[0].userId
                    : ezApi.ezclocker.ezClockerContext.activeEmployer.userId;

                timeOffRequest.reviewedByUserId = ezApi.ezclocker.ezClockerContext.activeEmployer.userId;
            } else {
                timeOffRequest.requestStatus = EzTimeOffStatus.PENDING;

                timeOffRequest.employeeId = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().id;

                timeOffRequest.requestedByUserId = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().userId;

                timeOffRequest.reviewedByUserId = 0;
            }

            if (EzTimeOffRequestDialog.ezInstance.isEmployer && applyToAllEmployees && requestType === EzTimeOffType.PAID_HOLIDAY) {
                applyToAllEmployees = true;
            } else {
                applyToAllEmployees = false;
            }

            return EzTimeOffRequestDialog.ezInstance.ezSaveTimeOffRequest(timeOffRequest, applyToAllEmployees)
                .then(EzPromise.ignoreResolve);
        }
    }

    /**
     * @public @method
     * Saves the time off request
     * @param {object} timeOffRequest
     * @returns {Promise.resolve}
     */
    ezSaveTimeOffRequest(timeOffRequest, applyToAllEmployees = false) {
        if (!EzObject.isValid(timeOffRequest)) {
            throw new EzBadParamException(
                'timeOffRequest',
                EzTimeOffRequestDialog.ezInstance,
                EzTimeOffRequestDialog.ezInstance.ezSaveTimeOffRequest);
        }

        return EzPromise.asyncAction(
            (finished) => {
                if (!EzTimeOffRequestDialog.ezInstance.ezIsRequestTimeOffValid(timeOffRequest)) {
                    return finished();
                }

                let applyToAllEmployeeQp = (applyToAllEmployees && `&apply-to-all-employees=${applyToAllEmployees}`) || '';

                return ezApi.ezclocker.ezUi.ezStartPageWait(
                    'Saving time off request ...',
                    (waitDone) => ezApi.ezclocker.ezHttpHelper.ezPost(
                        ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                            `timeoff?target-time-zone-id=${ezApi.ezclocker.ezDateTime.activeTimeZone}${applyToAllEmployeeQp}`,
                            'v1'),
                        EzJson.toJson(timeOffRequest))
                        .then(
                            () => {
                                ezApi.ezclocker.ezTimeOffViewController.ezInitData();

                                return waitDone()
                                    .then(
                                        () => {
                                            EzTimeOffRequestDialog.ezInstance.ezClose();

                                            return !EzTimeOffRequestDialog.ezInstance.isPureEmployee
                                                ? ezApi.ezclocker.ezDialog.ezShowOK(
                                                    'Request Time off Created',
                                                    'Requested time off submitted.')
                                                    .then(finished)
                                                : ezApi.ezclocker.ezDialog.ezShowOK(
                                                    'Request Time off Created',
                                                    'Your time off request has been sent!')
                                                    .then(finished);
                                        });
                            },
                            (eResponse, jqXHR) => waitDone()
                                .then(
                                    () => {
                                        ezApi.ezclocker.ezLogger.error(
                                            `Unable to create a timeoff request. Error: ${EzJson.toJson(eResponse)}`);

                                        return 412 == eResponse.errorCode
                                            ? ezApi.ezclocker.ezDialog.ezShowError(
                                                'Unable to create a timeoff request',
                                                eResponse.message)
                                                .then(finished)
                                            : ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(
                                                'Unable to create a timeoff request',
                                                eResponse.message,
                                                jqXHR,
                                                eResponse,
                                                `REQUEST: ${EzJson.toJson(timeOffRequest)}`)
                                                .then(finished);
                                    })));
            });
    }

    /**
     * @public @method
     * Gets if the time off request is valid or not
     * @param {object} timeOffRequest
     * @returns {boolean}
     */
    ezIsRequestTimeOffValid(timeOffRequest) {
        if (!EzObject.isValid(timeOffRequest)) {
            EzTimeOffRequestDialog.ezInstance.ezDisplayErrorComponent('Timeoff request is empty.');

            return false;
        }

        if (!EzObject.isValid(timeOffRequest.requestType)) {
            EzTimeOffRequestDialog.ezInstance.ezDisplayErrorComponent('Please enter a valid request type.');

            return false;
        }

        let hoursOfRequest = EzTimeOffRequestDialog.ezInstance.ezGetTimeDuration();

        let daysOfRequest = EzTimeOffRequestDialog.ezInstance.ezGetDaysDuration();

        if (0 >= (hoursOfRequest + (daysOfRequest * hoursOfRequest))) {
            EzTimeOffRequestDialog.ezInstance.ezDisplayErrorComponent(
                'Total days/hours are either 0 or in the negative. Please correct start and end time.');

            return false;
        }

        if (0 >= timeOffRequest.hoursPerDay || 24 < timeOffRequest.hoursPerDay || EzString.EMPTY === timeOffRequest.hoursPerDay ||
            undefined === timeOffRequest.hoursPerDay) {
            EzTimeOffRequestDialog.ezInstance.ezDisplayErrorComponent('Hours per day is invalid.');

            return false;
        }

        return true;
    }

    /**
     * @public @method
     * Display the provided error message
     * @param {string} message
     */
    ezDisplayErrorComponent(message) {
        ezApi.ezclocker.ezUi.ezDisableElement(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_sendTimeOffRequestBtn`);

        ezApi.ezclocker.ezUi.ezSetContent(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_ValidationError`, message);

        ezApi.ezclocker.ezUi.ezRemoveElementClass(
            `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_ValidationError`,
            'ezHiddenByDefault');

        ezApi.ezclocker.ezUi.ezSetElementCss(
            `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_ValidationError`,
            'display',
            'flex');
    }

    /**
     * @public @method
     * Hides the error message
     */
    ezHideErrorComponent() {
        ezApi.ezclocker.ezUi.ezEnableElement(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_sendTimeOffRequestBtn`);

        ezApi.ezclocker.ezUi.ezClearContent(`${EzTimeOffRequestDialog.ezInstance.ezDialogId}_ValidationError`);

        ezApi.ezclocker.ezUi.ezAddElementClass(
            `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_ValidationError`,
            'ezHiddenByDefault');

        ezApi.ezclocker.ezUi.ezSetElementCss(
            `${EzTimeOffRequestDialog.ezInstance.ezDialogId}_ValidationError`,
            'display',
            'none');
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
        return 'ezTimeOffRequestDialog';
    }

    /**
     * @static
     * @public @readonly @property
     * Gets an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzTimeOffRequestDialog_Ready',
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzTimeOffRequestDialog}
     */
    static #ezInstance = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzTimeOffRequestDialog.ezApiName]
        ? globalThis.ezApi.ezclocker[EzTimeOffRequestDialog.ezApiName]
        : null;
    /**
     * @static
     * @public @property @getter
     * Gets the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzTimeOffRequestDialog}
     */
    static get ezInstance() {
        return EzTimeOffRequestDialog.#ezInstance;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzTimeOffRequestDialog} instance
     */
    static set ezInstance(instance) {
        if (null != EzTimeOffRequestDialog.#ezInstance) {
            throw new Error('EzTimeOffRequestDialog\'s singleton instance is already reigstered with EzApi.');
        }

        EzTimeOffRequestDialog.#ezInstance = instance;
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
    static #ezApiRegistrationState = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzTimeOffRequestDialog.ezApiName]
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
        return EzTimeOffRequestDialog.#ezApiRegistrationState;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzTimeOffRequestDialog.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @static
     * @private @readonly @property
     * Gets if all required dependencies for this class report ready.
     * In otherwords, the require dependency's singleton instance is created
     * and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzTimeOffRequestDialog.ezApiRegistrationState &&
            globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker &&
            globalThis.ezApi.ezclocker?.[EzDateTime.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzEventEngine.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzNavigation.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzUI.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzDialog.ezApiName]?.ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Gets if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return EzTimeOffRequestDialog.ezInstance &&
            EzRegistrationState.REGISTERED === EzTimeOffRequestDialog.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzTimeOffRequestDialog.#ezCanRegister && !EzTimeOffRequestDialog.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzTimeOffRequestDialog, EzTimeOffRequestDialog.ezApiName);
        }

        return EzTimeOffRequestDialog.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzTimeOffRequestDialog.ezApiName
     *     2) Property getter EzTimeOffRequestDialog.ezEventNames
     *     3) Property getter EzTimeOffRequestDialog.ezInstance
     *     4) Property setter EzTimeOffRequestDialog.ezInstance
     *     5) Property getter EzTimeOffRequestDialog.ezApiRegistrationState
     *     6) Property setter EzTimeOffRequestDialog.ezApiRegistrationState
     *     7) Property getter EzTimeOffRequestDialog.#ezCanRegister
     *     8) Property getter EzTimeOffRequestDialog.#ezIsRegistered
     *     9) Method EzTimeOffRequestDialog.#ezRegistrator()
     */
    static {
        if (!EzTimeOffRequestDialog.#ezIsRegistered) {
            EzTimeOffRequestDialog.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzTimeOffRequestDialog.#ezRegistrator()) {
                document.addEventListener(
                    EzTimeOffRequestDialog.ezOnEzApiReadyEventName,
                    EzTimeOffRequestDialog.#ezRegistrator);

                document.addEventListener(
                    EzDateTime.ezEventNames.onReady,
                    EzTimeOffRequestDialog.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzTimeOffRequestDialog.#ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.onReady,
                    EzTimeOffRequestDialog.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzTimeOffRequestDialog.#ezRegistrator);

                document.addEventListener(
                    EzDialog.ezEventNames.onReady,
                    EzTimeOffRequestDialog.#ezRegistrator);
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

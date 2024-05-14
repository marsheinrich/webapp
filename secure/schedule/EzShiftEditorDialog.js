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
    EzRegistrationState
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzDateTime } from '/public/javascript/common/ez-date-time.js';

import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';
import { EzUI } from '/public/javascript/common/ezui.js';

import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';

import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

import { EzSchedule } from '/ezlibrary/entities/EzSchedule.js';
import { EzScheduleViewDataHelper } from '/secure/schedule/EzScheduleViewDataHelper.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * Schedule Shift Editor Controller
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzShiftEditorDialog } from '/secure/schedule/EzShiftEditorDialog.js';
 * ---------------------------------------------------------------------------
 * Singleton instance ready for use when the below evaluates to true:
 *     globalThis.ezApi.ezclocker?.[EzShiftEditorDialog.ezApiName]?.ready
 * ---------------------------------------------------------------------------
 * Listen to onReady event:
 *     document.addEventListener(
 *         EzShiftEditorDialog.ezEventNames.onReady,
 *         this.#ezRegistrator);
 * ---------------------------------------------------------------------------
 */
export class EzShiftEditorDialog extends EzClass {
    /**
     * @static
     * @public @readonly @property
     * Returns the schedules default start hour
     */
    static get DEFAULT_SCHEDULE_START_HOUR() {
        return 9; // 9:00 AM
    }

    /**
     * @static
     * @public @readonly @property
     * Returns the schedules default end hour
     * @returns {number}
     */
    static get DEFAULT_SCHEDULE_END_HOUR() {
        return 17; // 5:00 PM
    }

    /**
     * @public @readonly @property
     * Returns this dialog's id
     * @returns {string}
     */
    get ezDialogId() {
        return 'ezShiftEditor';
    }

    /**
     * @private @field
     * Stores the employee reference for the shift being edited
     * @type {object}
     */
    #ezEmployee = null;
    /**
     * @public @property @getter
     * Gets the employee reference for the shift being edited
     * @returns {object}
     */
    get ezEmployee() {
        return this.#ezEmployee;
    }
    /**
     * @public @property @setter
     * Sets the employee reference for the shift being edited
     * @param {object} employee
     */
    set ezEmployee(employee) {
        this.#ezEmployee = EzObject.assignOrNull(employee);
    }

    /**
     * @private @field
     * Stores the editing shift schedule instance
     * @type {object}
     */
    #ezEditShiftSchedule = null;
    /**
     * @public @property @getter
     * Gets the editing shift schedule instance
     * @returns {object}
     */
    get ezEditShiftSchedule() {
        return this.#ezEditShiftSchedule;
    }
    /**
     * @public @property @setter
     * Sets the editing shift schedule instance
     * @param {object} editShiftSchedule
     */
    set ezEditShiftSchedule(editShiftSchedule) {
        this.#ezEditShiftSchedule = EzObject.assignOrNull(editShiftSchedule);
    }

    /**
     * @private @field
     * Stores the editing shift schedule instance
     * @type {object}
     */
    #ezAddShiftDateTime = null;
    /**
     * @public @property @getter
     * Gets the editing shift schedule instance
     * @returns {object}
     */
    get ezAddShiftDateTime() {
        return this.#ezAddShiftDateTime;
    }
    /**
     * @public @property @setter
     * Sets the editing shift schedule instance
     * @param {object} addShiftDateTime
     */
    set ezAddShiftDateTime(addShiftDateTime) {
        this.#ezAddShiftDateTime = ezApi.ezclocker.ezDateTime.ezDateTimeOrNowWithTimeAtStartOfDay(addShiftDateTime);
    }

    /**
 * @public @property @getter
 * Gets if the dialog is in edit shift mode
 * @returns {boolean}
 */
    get ezEditShiftMode() {
        return null != this.ezEditShiftSchedule;
    }

    /**
     * @public @method
     * Initializes EzShiffEditorDialog
     * @returns {EzShiftEditorDialog}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzShiftEditorDialog.ezApiName,
            EzShiftEditorDialog.ezEventNames.onShiftEditorDialogShiftAdded);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzShiftEditorDialog.ezApiName,
            EzShiftEditorDialog.ezEventNames.onShiftEditorDialogShiftAddError);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzShiftEditorDialog.ezApiName,
            EzShiftEditorDialog.ezEventNames.onShiftEditorDialogShiftUpdated);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzShiftEditorDialog.ezApiName,
            EzShiftEditorDialog.ezEventNames.onShiftEditorDialogShiftUpdatedError);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzShiftEditorDialog.ezApiName,
            EzShiftEditorDialog.ezEventNames.onShiftEditorDialogCanceled);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzShiftEditorDialog.ezApiName,
            EzShiftEditorDialog.ezEventNames.onShiftEditorDialogClosed);

        EzShiftEditorDialog.ezInstance.ezInitUX();

        return EzShiftEditorDialog.ezInstance;
    }

    /**
     * @protected @method
     * Initializes EzShiftEditorDialog UX
     */
    ezInitUX() {
        ezApi.ezclocker.ezUi.ezAppendContent(
            '_HideDialogsDiv',
            EzShiftEditorDialog.ezInstance.ezBuildShiftEditorDialogHtml());

        let dialogConfig = new EzDialogConfig(EzShiftEditorDialog.ezInstance.ezDialogId);

        dialogConfig.title = 'Add New Shift';

        dialogConfig.width = 600;

        dialogConfig.focus = () => {
            ezApi.ezclocker.ezUi.ezId('ezShiftEditorStartDate').datepicker('hide');
            ezApi.ezclocker.ezUi.ezId('ezShiftEditorEndDate').datepicker('hide');
            ezApi.ezclocker.ezUi.ezId('_EzShiftEditorOkButton').focus();
        };

        dialogConfig.buttons = [
            {
                text: 'OK',
                id: '_EzShiftEditorOkButton',
                click: ezApi.ezclocker.ezShiftEditorDialog.ezSubmit
            },
            {
                text: 'Cancel',
                click: ezApi.ezclocker.ezShiftEditorDialog.ezCancel
            }
        ];

        ezApi.ezclocker.ezDialog.ezInitJQueryDialog(
            EzShiftEditorDialog.ezInstance.ezDialogId,
            dialogConfig);

        // Setup customer editors
        ezApi.ezclocker.ezUi.ezId('ezShiftEditorStartDate').datepicker({
            dateFormat: ezApi.ezclocker.ezDateTime.ezGetPreferredDatePickerFormat(),
            constrainInput: true,
            changeYear: true,
            changeMonth: true,
            showAnim: 'slideDown'
        });

        ezApi.ezclocker.ezUi.ezId('ezShiftEditorStartTime').timepicker({
            timeFormat: 'hh:mm:ss tt',
            showPeriod: true,
            showLeadingZero: true,
            showNowButton: true
        });

        ezApi.ezclocker.ezUi.ezId('ezShiftEditorEndDate').datepicker({
            dateFormat: ezApi.ezclocker.ezDateTime.ezGetPreferredDatePickerFormat(),
            constrainInput: true,
            changeYear: true,
            changeMonth: true,
            showAnim: 'slideDown'
        });

        ezApi.ezclocker.ezUi.ezId('ezShiftEditorEndTime').timepicker({
            timeFormat: 'hh:mm:ss tt',
            showPeriod: true,
            showLeadingZero: true
        });

        ezApi.ezclocker.ezUi.ezClearContent('ezShiftEditorEmployeeSelected');
        ezApi.ezclocker.ezUi.ezClearContent('ezShiftEditorEmployeeName');
    }

    /**
     * @public @method
     * Shows the ezShiftEditorDialog
     * @param {object} employee
     * From: ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccounts()[employeeIndex];
     * @param {undefined|null|moment} addScheduleMoment
     * @param {undefined|null|object} editSchedule
     */
    ezShow(employee, addScheduleMoment, editSchedule) {
        if (!EzObject.isValid(employee)) {
            throw new EzBadParamException(
                'employee',
                EzShiftEditorDialog.ezInstance,
                EzShiftEditorDialog.ezInstance.ezShow);
        }

        EzShiftEditorDialog.ezInstance.ezEmployee = employee;
        //EzShiftEditorDialog.ezInstance.ezEmployee = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccounts()[employeeIndex];
        ezApi.ezclocker.ezUi.ezClearContent('ezShiftEditorEmployeeSelected');
        ezApi.ezclocker.ezUi.ezClearContent('ezShiftEditorEmployeeName');

        if (ezApi.ezclocker.ezDateTime.ezIsValidMoment(addScheduleMoment)) {
            EzShiftEditorDialog.ezInstance.ezShowAddShift(addScheduleMoment);
        } else {
            EzShiftEditorDialog.ezInstance.ezShowEditShift(editSchedule);
        }

        ezApi.ezclocker.ezDialog.ezShowDialog(EzShiftEditorDialog.ezInstance.ezDialogId)
            .then(EzPromise.ignoreResolve());
    }

    /**
     * @public @method
     * Shows the dialog in edit shift mode, loading the provided editShiftSchedule data
     * @param {object} editShiftSchedule
     * From: ezApi.ezclocker.ezScheduleViewDataHelper.schedulesByEmployeeId[sortedScheduleIndex];
     */
    ezShowEditShift(editShiftSchedule) {
        if (!EzObject.isValid(editShiftSchedule)) {
            throw new EzBadParamException(
                'editShiftSchedule',
                EzShiftEditorDialog.ezInstance,
                EzShiftEditorDialog.ezInstance.ezShow);
        }

        EzShiftEditorDialog.ezInstance.ezAddShiftDateTime = null;

        EzShiftEditorDialog.ezInstance.ezEditShiftSchedule = editShiftSchedule;

        EzShiftEditorDialog.ezInstance.ezLoadLocationCombo(
            EzShiftEditorDialog.ezInstance.ezEmployee,
            editShiftSchedule.pendingLocationId);

        ezApi.ezclocker.ezUi.ezSetContent(
            'ezShiftEditorEmployeeName',
            `Employee: ${EzShiftEditorDialog.ezInstance.ezEmployee.employeeName}`);

        EzShiftEditorDialog.ezInstance.ezInitShiftDateTimePickers(
            ezApi.ezclocker.ezDateTime.ezCreateFromIso(editShiftSchedule.pendingStartDateTimeIso8601),
            ezApi.ezclocker.ezDateTime.ezCreateFromIso(editShiftSchedule.pendingEndDateTimeIso8601));

        ezApi.ezclocker.ezUi.ezSetInputValue(
            '_EzShiftNotesEditor',
            EzString.hasLength(editShiftSchedule.pendingNotes)
                ? EzString.decodeURL(editShiftSchedule.pendingNotes.trim())
                : EzString.EMPTY);

        ezApi.ezclocker.ezUi.ezSetElementCss('ezShiftEditorEmployeeSelected_div', 'display', 'block');
        ezApi.ezclocker.ezUi.ezSetElementCss('ezShiftEditorEmployeeName', 'display', 'none');

        ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccounts()
            .forEach(
                (employee) => {
                    ezApi.ezclocker.ezUi.ezAppendContent(
                        'ezShiftEditorEmployeeSelected',
                        EzHtml.build`
                        <option
                            id="${employee.id}"
                            ${EzShiftEditorDialog.ezInstance.ezEmployee.id === employee.id ? 'selected' : ''}
                            value=${employee.id}>
                            ${employee.employeeName}
                        </option>`)
                }
            );
        ezApi.ezclocker.ezUi.ezId('_EzShiftNotesEditor').height(
            ezApi.ezclocker.ezUi.ezId('_EzShiftNotesEditorContainer').height() -
            ezApi.ezclocker.ezUi.ezId('_EzShiftNotesLabel').height() + 'px');

        ezApi.ezclocker.ezUi.ezId(EzShiftEditorDialog.ezInstance.ezDialogId).dialog(
            'option',
            'title',
            'Edit Shift');
    }

    /**
     * Shows the dialog in add new shift mode setting the dates based upon the provided addShiftDateTime
     * @param {moment} addShiftDateTime
     */
    ezShowAddShift(addShiftDateTime) {
        if (!EzObject.isValid(addShiftDateTime)) {
            throw new EzBadParamException(
                'addShiftDateTime',
                EzShiftEditorDialog.ezInstance,
                EzShiftEditorDialog.ezInstance.ezShow);
        }

        EzShiftEditorDialog.ezInstance.ezEditShiftSchedule = null;

        EzShiftEditorDialog.ezInstance.ezAddShiftDateTime = ezApi.ezclocker.ezDateTime.ezDateTimeWithTimeAtStartOfDay(addShiftDateTime);

        EzShiftEditorDialog.ezInstance.ezLoadLocationCombo(EzShiftEditorDialog.ezInstance.ezEmployee);

        ezApi.ezclocker.ezUi.ezSetElementCss('ezShiftEditorEmployeeSelected_div', 'display', 'none');
        ezApi.ezclocker.ezUi.ezSetElementCss('ezShiftEditorEmployeeName', 'display', 'block');

        ezApi.ezclocker.ezUi.ezContent(
            'ezShiftEditorEmployeeName',
            `Employee: ${EzShiftEditorDialog.ezInstance.ezEmployee.employeeName}`);

        if (ezApi.ezclocker.ezDateTime.ezToIsoDate(ezApi.ezclocker.ezDateTime.ezNow()) ===
            ezApi.ezclocker.ezDateTime.ezToIsoDate(EzShiftEditorDialog.ezInstance.ezAddShiftDateTime)) {
            EzShiftEditorDialog.ezInstance.ezInitShiftDateTimePickers(null, null)
        } else {
            EzShiftEditorDialog.ezInstance.ezInitShiftDateTimePickers(
                ezApi.ezclocker.ezDateTime.ezMomentWithPTZ(EzShiftEditorDialog.ezInstance.ezAddShiftDateTime)
                    .hours(9)
                    .minutes(0)
                    .seconds(0)
                    .milliseconds(0),
                ezApi.ezclocker.ezDateTime.ezMomentWithPTZ(EzShiftEditorDialog.ezInstance.ezAddShiftDateTime)
                    .hours(17)
                    .minutes(0)
                    .seconds(0)
                    .milliseconds(0));
        }

        ezApi.ezclocker.ezUi.ezSetInputValue('_EzShiftNotesEditor', '');

        ezApi.ezclocker.ezUi.ezId(EzShiftEditorDialog.ezInstance.ezDialogId).dialog(
            'option',
            'title',
            'Add New Shift');
    }

    /**
     * @public @method
     * Submits the add or edit changes to the schedule
     */
    ezSubmit() {
        if (EzBoolean.isTrue(EzShiftEditorDialog.ezInstance.ezEditShiftMode)) {
            EzShiftEditorDialog.ezInstance.ezUpdateShift();
        } else {
            EzShiftEditorDialog.ezInstance.ezSaveNewShift();
        }
    }

    /**
     * @public @method
     * Reverts any changes made to existing objects by the dialog and then closes the dialog without calling submit.
     */
    ezCancel() {
        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzShiftEditorDialog.ezEventNames.onShiftEditorDialogCanceled,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzShiftEditorDialog.ezApiName,
                'Shift editor dialog closed.'));

        EzShiftEditorDialog.ezInstance.ezClose();
    }

    /**
     * @public @method
     * Closes the dialog without calling submit.
     */
    ezClose() {
        ezApi.ezclocker.ezDialog.ezCloseDialog(EzShiftEditorDialog.ezInstance.ezDialogId);

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzShiftEditorDialog.ezEventNames.onShiftEditorDialogClosed,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzShiftEditorDialog.ezApiName,
                'Shift editor dialog closed.'));
    }

    /**
     * @protected @method
     * Initializes the date time pickers for the dialog
     * @param {moment} startDateTime
     * @param {moment} endDateTime
     */
    ezInitShiftDateTimePickers(startDateTime, endDateTime) {
        let sDate = ezApi.ezclocker.ezDateTime.ezIsValidMoment(startDateTime)
            ? startDateTime
            // Adding one hour, assuming schedule is for later in the current day
            : ezApi.ezclocker.ezDateTime.ezAddHours(
                ezApi.ezclocker.ezDateTime.ezNow(),
                1);

        let eDate = ezApi.ezclocker.ezDateTime.ezIsValidMoment(endDateTime)
            ? endDateTime
            // Just adding 4 hours since today is the current day
            : ezApi.ezclocker.ezDateTime.ezAddHours(
                ezApi.ezclocker.ezDateTime.ezNow(),
                4);

        ezApi.ezclocker.ezDateTime.ezSetDatePickerValue('ezShiftEditorStartDate', sDate);

        ezApi.ezclocker.ezDateTime.ezSetTimePickerValue('ezShiftEditorStartTime', sDate);

        ezApi.ezclocker.ezDateTime.ezSetDatePickerValue('ezShiftEditorEndDate', eDate);

        ezApi.ezclocker.ezDateTime.ezSetTimePickerValue('ezShiftEditorEndTime', eDate);
    }

    /**
     * @public @method
     * Displays a validation error on the dialog
     * @param {undefiend|null|string} message
     */
    ezShowValidationError(message) {
        if (!EzString.hasLength(message)) {
            return;
        }

        ezApi.ezclocker.ezUi.ezContent('ezIdScheduleValidationError', message);

        ezApi.ezclocker.ezUi.ezShowElement('ezIdScheduleValidationError');
    }

    /**
     * @public @method
     * Hides the validation error displayed on the dialog.
     */
    ezHideValidationError() {
        ezApi.ezclocker.ezUi.ezAddCss('ezShiftEditorEndDate', 'background-color', '#ffffff');

        ezApi.ezclocker.ezUi.ezAddCss('ezShiftEditorEndTime', 'background-color', '#ffffff');

        ezApi.ezclocker.ezUi.ezAddCss('ezShiftEditorStartDate', 'background-color', '#ffffff');

        ezApi.ezclocker.ezUi.ezAddCss('ezShiftEditorStartTime', 'background-color', '#ffffff');

        ezApi.ezclocker.ezUi.ezClearContent('ezIdScheduleValidationError');

        ezApi.ezclocker.ezUi.ezHideElement('ezIdScheduleValidationError');
    }

    /**
     * @public @method
     * Validates the schedule's date time values.
     */
    validateScheduleValues() {
        EzShiftEditorDialog.ezInstance.ezHideValidationError();

        let startMoment = EzShiftEditorDialog.ezInstance.ezGetShiftStartMoment();

        if (!EzObject.isValid(startMoment)) {
            ezApi.ezclocker.ezUi.ezSetElementCss(
                'ezShiftEditorStartDate',
                'background-color',
                '#fff0f0');

            ezApi.ezclocker.ezUi.ezSetElementCss(
                'ezShiftEditorStartTime',
                'background-color',
                '#fff0f0');

            EzShiftEditorDialog.ezInstance.ezShowValidationError('You must enter a valid schedule start date and time.');

            return false;
        }

        let endMoment = EzShiftEditorDialog.ezInstance.ezGetShiftEndMoment();
        if (!EzObject.isValid(endMoment)) {
            ezApi.ezclocker.ezUi.ezSetElementCss(
                'ezShiftEditorEndDate',
                'background-color',
                '#fff0f0');

            ezApi.ezclocker.ezUi.ezSetElementCss(
                'ezShiftEditorEndTime',
                'background-color',
                '#fff0f0');

            EzShiftEditorDialog.ezInstance.ezShowValidationError('You must enter a valid schedule end date and time.');

            return false;
        }

        // When modifying, the shift length must be at least 1 minute
        if (endMoment.isBefore(startMoment) || endMoment.isSame(startMoment)) {
            endMoment = ezApi.ezclocker.ezDateTime.ezMomentWithPTZ(startMoment).add(1, 'm');

            ezApi.ezclocker.ezDateTime.ezSetDatePickerValue('ezShiftEditorEndDate', endMoment);

            ezApi.ezclocker.ezDateTime.ezSetTimePickerValue('ezShiftEditorEndTime', endMoment);

            ezApi.ezclocker.ezUi.ezSetElementCss(
                'ezShiftEditorEndDate',
                'background-color',
                '#fff0f0');

            ezApi.ezclocker.ezUi.ezSetElementCss(
                'ezShiftEditorEndTime',
                'background-color',
                '#fff0f0');

            EzShiftEditorDialog.ezInstance.ezShowValidationError(
                EzString.em`
                    The schedule end date must be at least one minute after the schedule start date.
                    EzClocker has adjusted the end date to one minute after the start date for you.`);

            return false;
        }

        return true;
    }

    /**
     * @public @method
     * Returns the moment of the shift start date and time
     * @returns {moment}
     */
    ezGetShiftStartMoment() {
        return ezApi.ezclocker.ezDateTime.ezAppendTimeFromTimePicker(
            'ezShiftEditorStartTime',
            ezApi.ezclocker.ezDateTime.ezDateFromDatePicker('ezShiftEditorStartDate'));
    }

    /**
     * @public @method
     * Returns the moment instance of the shift end date and time.
     * @returns {moment}
     */
    ezGetShiftEndMoment() {
        return ezApi.ezclocker.ezDateTime.ezAppendTimeFromTimePicker(
            'ezShiftEditorEndTime',
            ezApi.ezclocker.ezDateTime.ezDateFromDatePicker('ezShiftEditorEndDate'));
    }

    /**
     * @public @method
     * Saves a new shift
     */
    ezSaveNewShift() {
        if (!EzShiftEditorDialog.ezInstance.validateScheduleValues()) {
            return;
        }

        let shiftLocationId = ezApi.ezclocker.ezUi.ezId('ezShiftEditorLocation').val() || -1;

        let startMoment = EzShiftEditorDialog.ezInstance.ezGetShiftStartMoment();

        let endMoment = EzShiftEditorDialog.ezInstance.ezGetShiftEndMoment();

        if (endMoment.isSame(startMoment) || endMoment.isBefore(startMoment)) {
            EzShiftEditorDialog.ezInstance.ezShowValidationError(
                EzString.em`
                    The schedule end date must be at least one minute after the schedule start date.
                    EzClocker has adjusted the end date to one minute after the start date for you.`);

            return;
        }

        let ezSchedule = new EzSchedule();

        ezSchedule.employerId = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id;

        ezSchedule.employeeId = EzShiftEditorDialog.ezInstance.ezEmployee.id;

        ezSchedule.pendingStartDateTimeIso8601 = ezApi.ezclocker.ezDateTime.ezToIso(startMoment);


        ezSchedule.pendingEndDateTimeIso8601 = ezApi.ezclocker.ezDateTime.ezToIso(endMoment);

        ezSchedule.pendingStartDateTimeIso = ezApi.ezclocker.ezDateTime.ezToIso(startMoment);

        ezSchedule.pendingEndDateTimeIso = ezApi.ezclocker.ezDateTime.ezToIso(endMoment);

        ezSchedule.pendingLocationId = shiftLocationId;

        ezSchedule.pendingNotes = EzString.stringOrEmpty(
            ezApi.ezclocker.ezUi.ezGetInputValue('_EzShiftNotesEditor'))
            .trim();

        ezSchedule.published = false;

        ezSchedule.deleted = false;

        ezSchedule.modified = false;

        ezSchedule.targetTimeZone = ezApi.ezclocker.ezDateTime.activeTimeZone;

        ezApi.ezclocker.ezUi.ezStartPageWait(
            'Saving shift ...',
            (waitDone) => ezApi.ezclocker.ezHttpHelper.ezPost(
                ezApi.ezclocker.ezNavigation.ezGetInternalClassicApiUrl('schedules'),
                ezSchedule.ezToJSON())
                .then(
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                .then(
                    (response) => {
                        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                            EzShiftEditorDialog.ezEventNames.onShiftEditorDialogShiftAdded,
                            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                EzShiftEditorDialog.ezApiName,
                                'Added new shift.',
                                response));

                        ezApi.ezclocker.ezDialog.ezCloseDialog(EzShiftEditorDialog.ezInstance.ezDialogId);

                        return EzPromise.waitDoneIgnoreResolve(waitDone);
                    },
                    (eResponse, jqXHR) => {
                        ezApi.ezclocker.ezLogger.error(
                            `Failed to add a new schedule. Error: ${EzJson.toJson(eResponse)}`);

                        return EzPromise.waitDoneThen(
                            this,
                            waitDone,
                            () => {
                                ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                    EzShiftEditorDialog.ezEventNames.onShiftEditorDialogShiftAddError,
                                    ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                        EzShiftEditorDialog.ezApiName,
                                        'Error while adding a new shift',
                                        eResponse));

                                ezApi.ezclocker.ezDialog.ezReportInternalBugDialog(
                                    jqXHR,
                                    'Schedule Add Failed',
                                    EzString.em`
                                        EzClocker received an error response from the cloud server and was unable to determine
                                        if your schedule was added succesfful. Please try refreshing your browser to reload
                                        the schedule screen and validate if your schedule update was successful or not.`,
                                    eResponse,
                                    null,
                                    false);
                            });
                    }));
    }

    /**
     * @public @method
     * Obtains the selected schedule's index value
     * @returns {number}
     */
    getSelectedScheduleIndex() {
        return EzShiftEditorDialog.ezInstance.ezSortedScheduleIndex;
    }

    /**
     * @public @method
     * Gets the selected schedule that needs updated
     * @returns {object}
     */
    getSelectedUpdatingSchedule() {
        let i = EzShiftEditorDialog.ezInstance.getSelectedScheduleIndex();

        if (-1 === i) {
            ezApi.ezclocker.ezDialog.ezShowError(
                'Update Schedule Error',
                'No currently selected updating schedule available.');

            return null;
        }

        let schedule = ezApi.ezclocker.ezEmployerScheduleController.schedulesByEmployeeId[i];

        if (!EzObject.isValid(schedule)) {
            ezApi.ezclocker.ezDialog.ezShowError(
                'Update Schedule Error',
                EzString.em`Unable to retrieve the associated schedule at index ${i}.`);

            return null;
        }

        return schedule;
    }

    /**
     * @public @method
     * Returns the start/end time for the shift
     * @returns {object}
     */
    getShiftTime() {
        return {
            startTime: ezApi.ezclocker.ezUi.ezId('ezShiftEditorStartTime').timepicker('getTime'),
            endTime: ezApi.ezclocker.ezUi.ezId('ezShiftEditorEndTime').timepicker('getTime')
        };
    }

    /**
     * @public @method
     * Updates a shift
     */
    ezUpdateShift() {
        if (!EzShiftEditorDialog.ezInstance.validateScheduleValues()) {
            return;
        }

        let startMoment = EzShiftEditorDialog.ezInstance.ezGetShiftStartMoment();

        let endMoment = EzShiftEditorDialog.ezInstance.ezGetShiftEndMoment();

        if (endMoment.isSame(startMoment) || endMoment.isBefore(startMoment)) {
            // add one hour if equal or less than
            endMoment = ezApi.ezclocker.ezDateTime.ezCreateFromMoment(startMoment).add(1, 'hours');
        }

        EzShiftEditorDialog.ezInstance.ezEditShiftSchedule.pendingLocationId = ezApi.ezclocker.ezUi.ezGetInputValue('ezShiftEditorLocation') || -1;

        EzShiftEditorDialog.ezInstance.ezEditShiftSchedule.pendingStartDateTimeIso8601 = ezApi.ezclocker.ezDateTime.ezToIso(startMoment);

        EzShiftEditorDialog.ezInstance.ezEditShiftSchedule.pendingStartDateTimeIso = ezApi.ezclocker.ezDateTime.ezToIso(startMoment);

        EzShiftEditorDialog.ezInstance.ezEditShiftSchedule.pendingEndDateTimeIso8601 = ezApi.ezclocker.ezDateTime.ezToIso(endMoment);

        EzShiftEditorDialog.ezInstance.ezEditShiftSchedule.pendingEndDateTimeIso = ezApi.ezclocker.ezDateTime.ezToIso(endMoment);

        EzShiftEditorDialog.ezInstance.ezEditShiftSchedule.pendingNotes = EzString.stringOrEmpty(
            ezApi.ezclocker.ezUi.ezGetInputValue('_EzShiftNotesEditor'));

        EzShiftEditorDialog.ezInstance.ezEditShiftSchedule.modified = true;

        let assignedEmployeeId = EzNumber.strToInt(ezApi.ezclocker.ezUi.ezGetInputValue('ezShiftEditorEmployeeSelected'));

        return EzShiftEditorDialog.ezInstance.ezEditShiftSchedule.employeeId !== assignedEmployeeId
            ? EzShiftEditorDialog.ezInstance.ezUpdateAndReassignShift(assignedEmployeeId)
            : EzShiftEditorDialog.ezInstance.ezUpdateShiftWithoutReassignment();
    }

    /**
     * @public @method
     * Does NOT reassign the shift to a different employee
     * Updates any modified data for the existing shift.
     */
    ezUpdateShiftWithoutReassignment() {
        return ezApi.ezclocker.ezUi.ezStartPageWait(
            'Updating shift ...',
            (waitDone) => ezApi.ezclocker.ezHttpHelper.ezPut(
                ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                    `schedules/${EzShiftEditorDialog.ezInstance.ezEditShiftSchedule.id}`,
                    'v2'),
                EzJson.toJson(EzShiftEditorDialog.ezInstance.ezEditShiftSchedule))
                .then(
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                .then(
                    (response) => {
                        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                            EzShiftEditorDialog.ezEventNames.onShiftEditorDialogShiftUpdated,
                            response);

                        ezApi.ezclocker.ezDialog.ezCloseDialog(EzShiftEditorDialog.ezInstance.ezDialogId);

                        return EzPromise.waitDoneIgnoreResolve(waitDone);
                    },
                    (eResponse, jqXHR) => {
                        ezApi.ezclocker.ezLogger.error(
                            EzString.em`
                                Failed to update the schedule with scheduleId=${EzShiftEditorDialog.ezInstance.ezEditShiftSchedule.id}.
                                Error: ${EzJson.toJson(eResponse)}`);

                        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                            EzShiftEditorDialog.ezEventNames.onShiftEditorDialogShiftUpdatedError,
                            eResponse);

                        return EzPromise.waitDoneThen(
                            this,
                            waitDone,
                            () => ezApi.ezclocker.ezDialog.ezReportInternalBugDialog(
                                jqXHR,
                                'Schedule Update Failed',
                                EzString.em`
                                    EzClocker received an error response from the cloud server and was unable to determine
                                    if your schedule update was succesfful. Please try refreshing your browser to reload
                                    the schedule screen and validate if your schedule update was successful or not.`,
                                eResponse,
                                null,
                                false));
                    }));
    }

    /**
     * @public @method
     * Re-assignes the existing shift to a new employee and updates any modified data.
     */
    ezUpdateAndReassignShift(assignedEmployeeId) {
        // Update and re-assign schedule to a different employee
        let oldEmployeeId = EzShiftEditorDialog.ezInstance.ezEditShiftSchedule.employeeId;

        EzShiftEditorDialog.ezInstance.ezEditShiftSchedule.employeeId = assignedEmployeeId;

        return ezApi.ezclocker.ezUi.ezStartPageWait(
            `Updating and reassigning shift ...`,
            (waitDone) => ezApi.ezclocker.ezHttpHelper.ezPut(
                ezApi.ezclocker.ezNavigation.ezGetInternalClassicApiUrl(
                    `schedules/${EzShiftEditorDialog.ezInstance.ezEditShiftSchedule.id}/reassign/${oldEmployeeId}`),
                EzJson.toJson(EzShiftEditorDialog.ezInstance.ezEditShiftSchedule))
                .then(
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                .then(
                    (response) => {
                        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                            EzShiftEditorDialog.ezEventNames.onShiftEditorDialogShiftUpdated,
                            response);

                        ezApi.ezclocker.ezDialog.ezCloseDialog(EzShiftEditorDialog.ezInstance.ezDialogId);

                        return EzPromise.waitDoneIgnoreResolve(waitDone);
                    },
                    (eResponse, jqXHR) => {
                        ezApi.ezclocker.ezLogger.error(
                            EzString.em`
                                Failed to update the schedule with scheduleId=${EzShiftEditorDialog.ezInstance.ezEditShiftSchedule.id}.
                                Error: ${EzJson.toJson(eResponse)}`);

                        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                            EzShiftEditorDialog.ezEventNames.onShiftEditorDialogShiftUpdatedError,
                            eResponse);

                        return EzPromise.waitDoneThen(
                            this,
                            waitDone,
                            () => ezApi.ezclocker.ezDialog.ezReportInternalBugDialog(
                                jqXHR,
                                'Schedule Update Failed',
                                EzString.em`
                                    EzClocker received an error response from the cloud server and was unable to determine
                                    if your schedule update was succesfful. Please try refreshing your browser to reload
                                    the schedule screen and validate if your schedule update was successful or not.`,
                                eResponse,
                                null,
                                false));
                    }));
    }

    /**
     * @public @method
     * Renders the available locations in the edit dialog
     * @param {Array} employeeAssignedLocations
     * @param {Long|null} selectedLocationId
     * @returns {Promise.resolve}
     */
    renderLocationsInDialog(employeeAssignedLocations, selectedLocationId) {
        if (!EzArray.hasLength(employeeAssignedLocations)) {
            ezApi.ezclocker.ezUi.ezContent(
                'ezShiftEditorLocation',
                EzHtml.build`
                    <option value="-1">
                        [NO ASSIGNED LOCATIONS AVAILABLE]
                    </option>`);

            return EzPromise.resolve();
        }

        return EzPromise.asyncAction(
            (finished) => {
                let htmlForEditLoc = EzHtml.build`
                    <option value="-1">
                        none
                    </option>`;

                employeeAssignedLocations.forEach(
                    (location) => {
                        let selected = location.id === selectedLocationId
                            ? 'selected'
                            : '';

                        htmlForEditLoc = EzHtml.build`
                            ${htmlForEditLoc}
                            <option value=${location.id} ${selected}>
                                ${location.name}
                            </option>`;
                    });

                ezApi.ezclocker.ezUi.ezContent(
                    'ezShiftEditorLocation',
                    htmlForEditLoc);

                ezApi.ezclocker.ezUi.ezEnableElement('ezShiftEditorLocation');

                return finished();
            });
    }

    /**
     * @public @method
     * Loads the available locations select
     * @param {Object} employeeIndex
     * @Param {Number} selectedLocationId
     * @returns {Promise}
     */
    ezLoadLocationCombo(employee, selectedLocationId) {
        ezApi.ezclocker.ezUi.ezDisableElement('ezShiftEditorLocation');

        ezApi.ezclocker.ezUi.ezContent(
            'ezShiftEditorLocation',
            EzHtml.build`
                <option value="-1">
                    loading...
                </option>`);

        return EzShiftEditorDialog.ezInstance.ezLoadAssignedLocationsForEmploye(
            employee,
            selectedLocationId);
    }

    /**
     * @protected @method
     * Loads cached assigned locations for the employee
     * @returns {Promise.resolve}
     */
    ezLoadAssignedLocationsForEmploye(employee, selectedLocationId) {
        if (!EzObject.isValid(employee)) {
            EzShiftEditorDialog.ezInstance.renderLocationsInDialog([]);

            return EzPromise.resolve();
        }

        return EzPromise.asyncAction(
            (finished) => ezApi.ezclocker.ezLocations.ezGetAssignedLocationsForEmployee(employee.id)
                .then(
                    (response) => {
                        employee.assignedLocations = EzArray.arrayOrEmpty(response.entities);

                        return EzShiftEditorDialog.ezInstance.renderLocationsInDialog(
                            employee.assignedLocations,
                            selectedLocationId)
                            .then(finished);
                    },
                    (eResponse) => {
                        ezApi.ezclocker.ezLogger.error(
                            `Failed to obtain employee assigned locations: ${EzJson.toJson(eResponse)}`);

                        employee.assignedLocations = [];

                        return EzShiftEditorDialog.ezInstance.renderLocationsInDialog(employee.assignedLocations)
                            .then(finished);
                    }));
    }

    /**
     * @protected @method
     * Builds the shift editor dialog's UX Html
     * @returns {string}
     */
    ezBuildShiftEditorDialogHtml() {
        return EzHtml.build`
            <div
                id="${EzShiftEditorDialog.ezInstance.ezDialogId}"
                title="Edit Shift">
                <div
                    id="ezIdScheduleValidationError"
                    class="ezSmallNoteBox"
                    style="display:none">
                </div>
                <div id="ezShiftEditorEmployeeSelected_div" style="display:none">
                    <label>
                        Employee
                    </label>
                    <select
                        id="ezShiftEditorEmployeeSelected"
                        class="ezSelect ezFullWidthEditor">
                    </select>
                </div>
                <div
                    id="ezShiftEditorEmployeeName"
                    data-sorted-schedule-index="NaN"
                    class="employeeName"
                    style="display:none">
                    Employee Name
                </div>
                <table
                    id="EzShiftEditorTable"
                    class="ezFullWidth">
                    <tr>
                        <td
                            class="ezTopAlign">
                            <div>
                                <label>
                                    Location
                                </label>
                                <select
                                    id="ezShiftEditorLocation"
                                    class="ezSelect ezFullWidthEditor">
                                </select>
                            </div>
                            <table
                                id="EzShiftEditorDateTimeTable">
                                <tr>
                                    <td
                                        class="ezTopAlign">
                                        <div
                                            class="ezSmallInputBox">
                                            <label
                                                class="shiftEditorInputLabel"
                                                for="ezShiftEditorStartDate">
                                                Shift Start
                                            </label>
                                            <input
                                                id="ezShiftEditorStartDate"
                                                type="text"
                                                class="ezText ezFullWidthEditor"
                                                data-inputmask="mm/dd/yyyy" />
                                        </div>
                                        <div
                                            class="ezSmallInputBox">
                                            <input
                                                id="ezShiftEditorStartTime"
                                                type="text"
                                                class="shiftDateTimeEditor ezFullWidthEditor"
                                                data-inputmask="hh:mm aa" />
                                        </div>
                                    </td>
                                    <td>
                                        <div
                                            class="ezSmallInputBox">
                                            <label
                                                class="shiftEditorInputLabel"
                                                for="ezShiftEditorEndDate">
                                                Shift End
                                            </label>
                                            <input
                                                id="ezShiftEditorEndDate"
                                                type="text"
                                                class="ezText ezFullWidthEditor"
                                                data-inputmask="mm/dd/yyyy" />
                                        </div>
                                        <div class="ezSmallInputBox">
                                            <input
                                                id="ezShiftEditorEndTime"
                                                type="text"
                                                class="shiftDateTimeEditor ezFullWidthEditor"
                                                data-inputmask="hh:mm aa" />
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td
                            id="_EzShiftNotesEditorContainer"
                            class="ezTopAlign">
                            <label>
                                Shift Notes
                            </label>
                            <textarea
                                id="_EzShiftNotesEditor"
                                class="shiftNotesEditor">
                            </textarea>
                        </td>
                    </tr>
                </table>
            </div>`;
    }

    /*
    =========================================================================================================================
    Start of EzClocker Class Initialization and EzApi Registration Section
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    !! FROM THIS POINT FORWARD: ONLY PLACE INITIALIZATION CODE !!
    || All other class code MUST go above this section. ||
    =========================================================================================================================
    */

    /**
     * @static
     * @public @readonly @property
     * Returns the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezShiftEditorDialog';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzShiftEditorDialog_Ready',
            onShiftEditorDialogShiftAdded: 'EzShiftEditorDialog_Shift_Added',
            onShiftEditorDialogShiftAddError: 'EzShiftEditorDialog_Shift_AddError',
            onShiftEditorDialogShiftUpdated: 'EzShiftEditorDialog_Shift_Updated',
            onShiftEditorDialogShiftUpdatedError: 'EzShiftEditorDialog_Shift_UpdatedError',
            onShiftEditorDialogCanceled: 'EzShiftEditorDialog_Canceled',
            onShiftEditorDialogClosed: 'EzShiftEditorDialog_Closed'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzShiftEditorDialog}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzShiftEditorDialog.ezApiName])
        ? globalThis.ezApi.ezclocker[EzShiftEditorDialog.ezApiName]
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzShiftEditorDialog}
     */
    static get ezInstance() {
        return EzShiftEditorDialog.#ezInstance;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzShiftEditorDialog} instance
     */
    static set ezInstance(instance) {
        if (null != EzShiftEditorDialog.#ezInstance) {
            throw new Error('EzShiftEditorDialog\'s singleton instance is already reigstered with EzApi.');
        }

        EzShiftEditorDialog.#ezInstance = instance;
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
    static #ezApiRegistrationState = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzShiftEditorDialog.ezApiName])
        ? EzRegistrationState.REGISTERED
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the ezApi registration state of this classes's singleton instance.
     * @returns {string}
     * A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzShiftEditorDialog.#ezApiRegistrationState;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzShiftEditorDialog.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @static
     * @private @readonly @property
     * Returns true when all required dependencies for this class report ready.
     * In otherwords, the require dependency's singleton instance is created
     * and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzShiftEditorDialog.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzDateTime.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDateTime.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzDialog.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDialog.ezApiName].ready &&

            globalThis.ezApi.ezclocker?.[EzScheduleViewDataHelper.ezApiName]?.ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzShiftEditorDialog.ezInstance &&
            EzRegistrationState.REGISTERED === EzShiftEditorDialog.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzShiftEditorDialog.#ezCanRegister && !EzShiftEditorDialog.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzShiftEditorDialog, EzShiftEditorDialog.ezApiName);
        }

        return EzShiftEditorDialog.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzShiftEditorDialog.ezApiName
     *     2) Property getter EzShiftEditorDialog.ezEventNames
     *     3) Property getter EzShiftEditorDialog.ezInstance
     *     4) Property setter EzShiftEditorDialog.ezInstance
     *     5) Property getter EzShiftEditorDialog.ezApiRegistrationState
     *     6) Property setter EzShiftEditorDialog.ezApiRegistrationState
     *     7) Property getter EzShiftEditorDialog.#ezCanRegister
     *     8) Property getter EzShiftEditorDialog.#ezIsRegistered
     *     9) Method EzShiftEditorDialog.#ezRegistrator()
     */
    static {
        if (!EzShiftEditorDialog.#ezIsRegistered) {
            EzShiftEditorDialog.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzShiftEditorDialog.#ezRegistrator()) {

                document.addEventListener(
                    EzShiftEditorDialog.ezOnEzApiReadyEventName,
                    EzShiftEditorDialog.#ezRegistrator);

                document.addEventListener(
                    EzHttpHelper.ezOnEzApiReadyEventName,
                    EzShiftEditorDialog.#ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezOnEzApiReadyEventName,
                    EzShiftEditorDialog.#ezRegistrator);

                document.addEventListener(
                    EzDateTime.ezOnEzApiReadyEventName,
                    EzShiftEditorDialog.#ezRegistrator);

                document.addEventListener(
                    EzClockerContext.ezEventNames.onReady,
                    EzShiftEditorDialog.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzShiftEditorDialog.#ezRegistrator);

                document.addEventListener(
                    EzDialog.ezEventNames.onReady,
                    EzShiftEditorDialog.#ezRegistrator);

                document.addEventListener(
                    EzScheduleViewDataHelper.ezEventNames.onReady,
                    EzShiftEditorDialog.#ezRegistrator);
            }
        }
    }

    /*
   =========================================================================================================================
   End of EzClocker Class Initialization and EzApi Registration Section
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   !! DO NOT PLACE ANY NON-INITIALIZTION CODE BETWEEN THE START AND END OF THIS INITILIZATION SECTON !!
   !! DO NOT PLACE ANY CODE OF ANY KIND BELOW THIS POINT !!
   =========================================================================================================================
   */
}

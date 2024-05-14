import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzArray,
    EzPromise,
    EzUrl,
    EzHtml,
    EzJson
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import {
    EzRegistrationState
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzElementEventName } from '/ezlibrary/EzElementEventName.js';

import { EzClockerContextEventName } from '/ezlibrary/EzClockerContext/EzClockerContextEventName.js';
import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

import { EzTimeAddEditDialogViewConfiguration } from '/secure/widgets/EzTimeAddEditDialogController/EzTimeAddEditDialogViewConfiguration.js';
import { EzTimeAddEditDialogController } from '/secure/widgets/EzTimeAddEditDialogController/EzTimeAddEditDialogController.js';
import { EzInviteEmployeeDialog } from '/secure/widgets/EzInviteEmployeeDialog/EzInviteEmployeeDialog.js';

import '/secure/employer/employerDashboard-DeleteEmployee.js';
import { EzEmployerTimesheetReportDialog } from '/secure/employer/employerDashboard-DownloadTimeSheet.js';
import { EzSelectedEmployeeView } from '/secure/employer/EzSelectedEmployeeView.js';

/**
    Handles events for the Employer Dashboard's EzSelectedEmployeeViewController
*/
export class EzEmployerDashboardEventHandlers extends EzClass {
    /**
     * @public @constructor
     * Constructor for EzEmployerDashboardEventHandlers
     */
    constructor() {
        super();
    }

    /**
     * @public @method
     * Initializes EzEmployerDashboardEventHandlers class after registering with ezApi.
     * @returns {EzEmployerDashboardEventHandlers}
     */
    ezInit() {
        EzEmployerDashboardEventHandlers.ezInstance.ezHookEzClockerContextEvents();

        EzEmployerDashboardEventHandlers.ezInstance.ezHookEzSelectedEmployeeViewEvents();

        EzEmployerDashboardEventHandlers.ezInstance.ezHookEzEmployeeDisplayControllerEvents();

        EzEmployerDashboardEventHandlers.ezInstance.ezHookEmployerDashboardUxEvents();

        EzEmployerDashboardEventHandlers.ezInstance.ezHookEzInviteEmployeeDialogEvents();

        EzEmployerDashboardEventHandlers.ezInstance.ezHookEzTimeAddEditDialogEvents();

        EzEmployerDashboardEventHandlers.ezInstance.ezHookEmployerDashboardUxEvents();

        return EzEmployerDashboardEventHandlers.ezInstance;
    }

    /**
     * @protected @method
     * Hooks the EzClockerContext events
     */
    ezHookEzClockerContextEvents() {
        // SelectedEmployer event hooks
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSelectedEmployerAccountReady,
            EzEmployerDashboardEventHandlers.ezApiName,
            EzEmployerDashboardEventHandlers.ezInstance.ezHandleOnSelectedEmployerAccountReady,
            true);

        // SelectedEmployer event hooks
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSelectedEmployerEmployeeAccountsUpdated,
            EzEmployerDashboardEventHandlers.ezApiName,
            EzEmployerDashboardEventHandlers.ezInstance.ezHandleOnSelectedEmployerEmployeeAccountsUpdated,
            true);

        // ActiveEmployee Event Hooks
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onActiveEmployeeReady,
            EzEmployerDashboardEventHandlers.ezApiName,
            EzEmployerDashboardEventHandlers.ezInstance.ezHandleOnActiveEmployeeReady,
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onActiveEmployeeChanged,
            EzEmployerDashboardEventHandlers.ezApiName,
            EzEmployerDashboardEventHandlers.ezInstance.ezHandleonActiveEmployeeChanged,
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onActiveEmployeeClosed,
            EzEmployerDashboardEventHandlers.ezApiName,
            EzEmployerDashboardEventHandlers.ezInstance.ezHandleOnActiveEmployeeClosed,
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onActiveEmployeeTimeEntriesChanged,
            EzEmployerDashboardEventHandlers.ezApiName,
            EzEmployerDashboardEventHandlers.ezInstance.ezHandleOnActiveEmployeeTimeEntriesChanged,
            true);
    }

    /**
     * @protected @method
     * Hooks the EzSelectedEmployeeView events
     */
    ezHookEzSelectedEmployeeViewEvents() {
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzSelectedEmployeeView.ezEventNames.onSelectedEmployeeViewClockInSubmit,
            EzEmployerDashboardEventHandlers.ezApiName,
            EzEmployerDashboardEventHandlers.ezInstance.ezHandleClockInButtonClick);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzSelectedEmployeeView.ezEventNames.onSelectedEmployeeViewClockOutSubmit,
            EzEmployerDashboardEventHandlers.ezApiName,
            EzEmployerDashboardEventHandlers.ezInstance.ezHandleClockOutButtonClick);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzSelectedEmployeeView.ezEventNames.onSelectedEmployeeViewQuickFilterSubmit,
            EzEmployerDashboardEventHandlers.ezApiName,
            EzEmployerDashboardEventHandlers.ezInstance.ezHandleQuickFilterSubmit);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzSelectedEmployeeView.ezEventNames.onSelectedEmployeeViewAddTimeEntrySubmit,
            EzEmployerDashboardEventHandlers.ezApiName,
            EzEmployerDashboardEventHandlers.ezInstance.ezHandleAddTimeEntryButtonClick);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzSelectedEmployeeView.ezEventNames.onSelectedEmployeeReInviteSubmit,
            EzEmployerDashboardEventHandlers.ezApiName,
            EzEmployerDashboardEventHandlers.ezInstance.ezHandleSelectedEmployeeReInviteSubmit);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzSelectedEmployeeView.ezEventNames.onSelectedEmployeeDeleteSubmit,
            EzEmployerDashboardEventHandlers.ezApiName,
            EzEmployerDashboardEventHandlers.ezInstance.ezclocker.ezDeleteEmployeeController.ezDeleteEmployee);
    }

    /**
     * @protected @method
     * Hooks EzEmployeeDisplayController events
     */
    ezHookEzEmployeeDisplayControllerEvents() {
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            ezApi.ezclocker.ezInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogEmployeeUpdated,
            EzEmployerDashboardEventHandlers.ezApiName,
            EzEmployerDashboardEventHandlers.ezInstance.ezHandleOnInviteEmployeeDialogEmployeeUpdated);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            ezApi.ezclocker.ezTimeAddEditDialogController.ezEventNames.onTimeEntryDialogTimeEntryUpdated,
            EzEmployerDashboardEventHandlers.ezApiName,
            EzEmployerDashboardEventHandlers.ezInstance.ezHandleOnTimeEntryDialogTimeEntryUpdated);
    }

    /**
     * @protected @method
     * Hooks the EzInviteEmployeeDialog events
     */
    ezHookEzInviteEmployeeDialogEvents() {
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzInviteEmployeeDialog.ezEventNames.onInviteEmployeeDialogEmployeeAdded,
            EzEmployerDashboardEventHandlers.ezApiName,
            EzEmployerDashboardEventHandlers.ezInstance.ezHandleOnInviteEmployeeDialogEmployeeAdded);
    }

    /**
     * @protected @method
     * Hooks the EzTimeAddEditDialog events
     */
    ezHookEzTimeAddEditDialogEvents() {
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            ezApi.ezclocker.ezTimeAddEditDialogController.ezEventNames.onTimeEntryDialogTimeEntryAdded,
            EzEmployerDashboardEventHandlers.ezApiName,
            EzEmployerDashboardEventHandlers.ezInstance.ezHandleOnTimeEntryDialogTimeEntryAdded);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onActiveEmployeeActiveClockInChanged,
            EzEmployerDashboardEventHandlers.ezApiName,
            EzEmployerDashboardEventHandlers.ezInstance.ezHandleOnActiveEmployeeActiveClockInChanged);
    }

    /**
     * @protected @method
     * Hooks UX events for elements within the initial HTML page
     */
    ezHookEmployerDashboardUxEvents() {
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'EzExportTimeSheetButton',
            EzElementEventName.CLICK,
            EzEmployerDashboardEventHandlers.ezApiName,
            EzEmployerDashboardEventHandlers.ezInstance.ezHandleExportTimeSheetsButtonClick);
    }

    /**
     * @protected @method
     * Hooks the main content's resize Ux event
     */
    ezHookMainContentResizeEvent() {
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            '_EzClockerMainContent',
            EzElementEventName.RESIZE,
            EzEmployerDashboardEventHandlers.ezApiName,
            () => ezApi.ezclocker.ezLayoutHelper.sizeContentHeightWithinContainer(
                '_EzClockerMainContent',
                'timeEntryContainerDiv'));
    }

    /**
     * @protected @method
     * Unhooks the main content's resize Ux event
     */
    ezUnhookMainContentResizeEvent() {
        ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
            '_EzClockerMainContent',
            EzElementEventName.RESIZE,
            EzEmployerDashboardEventHandlers.ezApiName);
    }

    /**
     * @protected @method
     * Handles the EzSelectedEmployeeView onSelectedEmployeeViewQuickFilterSubmit event.
     */
    ezHandleQuickFilterSubmit() {
        ezApi.ezclocker.ezEmployeeDisplayController.ezFilterDashboard();
    }

    /**
     * @protected @method
     * Handles the EzClockerContext onSelectedEmployerAccountReady event
     *
     * event.data = selectedEmployerAccount
     *
     * @param {Object} eventData
     */
    ezHandleOnSelectedEmployerAccountReady(event) {
        if (ezApi.ezIsNotValid(event) || ezApi.ezIsNotValid(event.data)) {
            throw new EzBadParamException(
                'event',
                EzEmployerDashboardEventHandlers.ezInstance,
                EzEmployerDashboardEventHandlers.ezInstance.ezHandleOnSelectedEmployerAccountReady);
        }

        ezApi.ezclocker.ezEmployeeDisplayController.ezRefreshEmployeeSelect(event.data);
    }

    /**
     * @protected @method
     * Handles the EzClockerContext onSelectedEmployerEmployeeAccountsUpdated event
     *
     * event.data =
     *  {
     *      account: {Object},
     *      employees: {Array},
     *      options: {Object},
     *      license: {Object}
     *  }
     *
     * @param {Object} event
     */
    ezHandleOnSelectedEmployerEmployeeAccountsUpdated() {
        ezApi.ezclocker.ezEmployeeDisplayController.ezRefreshEmployeeSelect(
            ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountData());
    }

    /**
     * @protected @method
     * Handles EzClockerContext onActiveEmployeeReady event
     *
     * event.data = {
     *      employee: self.activeEmployee,
     *      activeClockIn: self.ezGetActiveEmployeeActiveClockIn()
     *  }
     *
     * @param {event}
     */
    ezHandleOnActiveEmployeeReady(event) {
        if (!EzObject.isValid(event) || !EzObject.isValid(event.data.employee)) {
            throw new EzBadParamException(
                'event',
                EzEmployerDashboardEventHandlers.ezInstance,
                EzEmployerDashboardEventHandlers.ezInstance.ezHandleOnActiveEmployeeReady);
        }

        return ezApi.ezclocker.ezClockerContext.ezSaveActiveAccountOption(
            ezApi.ezclocker.ezOptionsService.EZOPTION_SELECTED_EMPLOYEE_ID,
            event.data.employee.id.toString())
            .then(
                () => ezApi.ezclocker.ezEmployeeDisplayController.ezRenderEmployeeUI(event.data));
    }

    /**
     * @protected @method
     * Handles the EzClockerContext onActiveEmployeeChanged
     *
     * event.data =
     *  {
     *      employee: self.activeEmployee,
     *      activeClockIn: self.ezGetActiveEmployeeActiveClockIn()
     *  }
     *
     * @param {Object} event
     *
     */
    ezHandleonActiveEmployeeChanged(event) {
        if (!ezApi.ezIsValid(event) || !ezApi.ezIsValid(event.data) || !ezApi.ezIsValid(event.data.employee)) {
            throw new EzBadParamException(
                'event',
                EzEmployerDashboardEventHandlers.ezInstance,
                EzEmployerDashboardEventHandlers.ezInstance.ezHandleonActiveEmployeeChanged);
        }

        return ezApi.ezclocker.ezClockerContext.ezSaveActiveAccountOption(
            ezApi.ezclocker.ezOptionsService.EZOPTION_SELECTED_EMPLOYEE_ID,
            event.data.employee.id.toString())
            .then(
                () => {
                    ezApi.ezclocker.ezUi.ezSetInputValue('employeeCombo', event.data.employee.id);
                    ezApi.ezclocker.ezEmployeeDisplayController.ezRenderEmployeeUI(event.data);
                });
    }

    /**
     * @protected @method
     * Handles EzClockerContext onActiveEmployeeClosed event
     */
    ezHandleOnActiveEmployeeClosed() {
        ezApi.ezclocker.ezClockerContext.ezSaveActiveAccountOption(
            ezApi.ezclocker.ezOptionsService.EZOPTION_SELECTED_EMPLOYEE_ID, '-1')
            .then(ezApi.ezclocker.ezEmployeeDisplayController.ezRenderClosedEmployeeUI);
    }

    /**
     * @protected @method
     * Handles the EzClockerContext onActiveEmployeeActiveClockInChanged event
     *
     * event.data =
     *
     *
     * @param {Object} event
     */
    ezHandleOnActiveEmployeeActiveClockInChanged(event) {
        ezApi.ezclocker.ezEmployeeDisplayController.ezDisplayActiveClockInStatusBox(event.data);
    }

    /**
     * @protected @method
     * Handles EzSelectEmployeeComboBox onSelectedEmployeeChanged event
     *
     * event.data = {
     *      instanceName: self.ezNameId,
     *      event: event,
     *      selectedEmployeeId: parseInt(ezUi.ezGetInputValue(self.ezSelectInputId))
     *  }
     *
     * @param {Object} event
     */
    ezHandleOnEmployeeComboSelectionChanged(event) {
        if (!ezApi.ezIsValid(event) || !ezApi.ezIsNumber(event.data.selectedEmployeeId)) {
            throw new EzBadParamException(
                'event',
                EzEmployerDashboardEventHandlers.ezInstance,
                EzEmployerDashboardEventHandlers.ezInstance.ezHandleOnEmployeeComboSelectionChanged);
        }

        let activeEmployee = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee();

        if (ezApi.ezIsValid(activeEmployee) && event.data.selectedEmployeeId === activeEmployee.id) {
            // Already selected
            return;
        }

        ezApi.ezclocker.ezEmployeeDisplayController.ezSetActiveEmployeeById(event.data.selectedEmployeeId);
    }

    /**
     * @protected @method
     * Handles the EzInviteEmployeeDialog onInviteEmployeeDialogEmployeeAdded event
     *
     * event.data = {
     *      assignedLocations: []
     *      employee: {Object}
     *      employer: {Object}
     *      errorCode: {Number}
     *      message: {"Success"|Error Message}
     *  }
     */
    ezHandleOnInviteEmployeeDialogEmployeeAdded(event) {
        if (!ezApi.ezIsValid(event) || !ezApi.ezIsValid(event.data) || !ezApi.ezIsValid(event.data.employee)) {
            throw ezApi.ezBadParam(
                'event',
                EzEmployerDashboardEventHandlers.ezInstance,
                EzEmployerDashboardEventHandlers.ezInstance.ezHandleOnInviteEmployeeDialogEmployeeAdded);
        }

        ezApi.ezclocker.ezClockerContext.ezRefreshSelectedEmployerEmployees().then(
            () => ezApi.ezclocker.ezClockerContext.ezSaveActiveAccountOption(
                ezApi.ezclocker.ezOptionsService.EZOPTION_SELECTED_EMPLOYEE_ID,
                event.data.employee.id.toString())
                .then(
                    () => {
                        ezApi.ezclocker.ezEmployeeDisplayController.ezSetActiveEmployeeById(event.data.employee.id);

                        ezApi.ezclocker.ezEmployeeDisplayController.ezSetEmployeeSelectValue(event.data.employee.id);

                        ezApi.ezclocker.ezClockerContext.ezRefreshSubscriptionContextActiveSubscription()
                            .then(
                                ezApi.ezclocker.ezEmployeeDisplayController.ezUpdateInviteEmployeeButton,
                                (ezRefreshSubscriptionContextActiveSubscriptionErrorResponse) => EzPromise.logReject(
                                    ezRefreshSubscriptionContextActiveSubscriptionErrorResponse,
                                    EzString.em`
                                        Failed to refresh the subscription context's active subscription
                                        due to the following error: ${ezRefreshSubscriptionContextActiveSubscriptionErrorResponse.message}`));
                    }),
            (eResponse) => {
                ezApi.ezclocker.ezLogger.error(
                    EzString.em`
                        Failed to refresh the employer's employees
                        due to the following error: ${eResponse.message}.
                        [Error response: ${EzJson.toJson(eResponse)}]`);

                ezApi.ezclocker.ezEmployeeDisplayController.ezUpdateInviteEmployeeButton();

                ezApi.ezclocker.ezDialog.ezShowError('Employee Refresh Error', eResponse.message);
            });
    }

    /**
     * @protected @method
     * Handles the EzTimeAddEditDialogController onTimeEntryDialogTimeEntryUpdated event
     */
    ezHandleOnTimeEntryDialogTimeEntryUpdated(event) {
        ezApi.ezclocker.ezEmployeeDisplayController.ezAppendTimeEntry(event.detail);
        ezApi.ezclocker.ezEmployeeDisplayController.ezFilterDashboard();
    }

    /**
     * @protected @method
     * Handles the EzSelectedEmployeeView onSelectedEmployeeViewAddTimeEntrySubmit event
     */
    ezHandleAddTimeEntryButtonClick() {
        ezApi.ezclocker[EzTimeAddEditDialogController.ezApiName].ezShow(new EzTimeAddEditDialogViewConfiguration());
    }

    /**
     * @protected @method
     * Handles the EzTimeAddEditDialogController onTimeEntryDialogTimeEntryAdded event
     */
    ezHandleOnTimeEntryDialogTimeEntryAdded(event) {
        ezApi.ezclocker.ezEmployeeDisplayController.ezAppendTimeEntry(event.detail);
        ezApi.ezclocker.ezEmployeeDisplayController.ezFilterDashboard();
    }

    /**
     * @protected @method
     * Handles the EzInviteEmployeeDialog onInviteEmployeeDialogEmployeeUpdated event
     * @param {Object} updatedEmployeeEvent
     */
    ezHandleOnInviteEmployeeDialogEmployeeUpdated(event) {
        if (!ezApi.ezIsValid(event) || !ezApi.ezIsValid(event.data) || !ezApi.ezIsValid(event.data.employee)) {
            throw new EzBadParamException(
                'event',
                EzEmployerDashboardEventHandlers.ezInstance,
                EzEmployerDashboardEventHandlers.ezInstance.ezHandleOnInviteEmployeeDialogEmployeeUpdated);
        }

        ezApi.ezclocker.ezEmployeeDisplayController.ezUpdateEmployeeDetails(
            event.data.employee.id,
            event.data.employee.employeeName,
            event.data.employee.employeeContactEmail,
            ezApi.ezclocker.nav.ezGetPublicImagesUrl('avatars/default-white.svg'));

        let currentActiveEmployee = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee();

        ezApi.ezclocker.ezClockerContext.ezRefreshSelectedEmployerEmployees().then(
            () => {
                ezApi.ezclocker.ezClockerContext.ezSetActiveEmployeeFromSelectedEmployerAccountActiveEmployeeAccountsIdId(
                    currentActiveEmployee.id);
                ezApi.ezclocker.ezEmployeeDisplayController.ezUpdateInviteEmployeeButton();
            },
            (eResponse) => {
                ezApi.ezclocker.logger.error(
                    `Failed to refresh the employer's employees. Error: ${ezApi.ezToJson(eResponse)}`);
                ezApi.ezclocker.ezClockerContext.ezSetActiveEmployeeFromSelectedEmployerAccountActiveEmployeeAccountsIdId(
                    currentActiveEmployee.id);
                ezApi.ezclocker.ezEmployeeDisplayController.ezUpdateInviteEmployeeButton();
                ezApi.ezclocker.ezDialog.ezShowError('Employee Refresh Error', eResponse.message);
            });
    }

    /**
     * @protected @method
     * Handles the EzClockerContext onActiveEmployeeTimeEntriesChange event
     *
     * @param {Object} eventData
     * {
     *      employee: self.activeEmployee,
     *      timeEntries: self.activeEmployee.timeEntries,
     *      timeEntriesById: self.activeEmployee.timeEntriesById,
     *      timeEntryLocations: self.activeEmployee.timeEntryLocations
     * }
     */
    ezHandleOnActiveEmployeeTimeEntriesChanged(eventData) {
        if (!ezApi.ezIsValid(eventData)) {
            throw new EzBadParamException(
                'eventData',
                EzEmployerDashboardEventHandlers.ezInstance,
                EzEmployerDashboardEventHandlers.ezInstance.ezHandleOnActiveEmployeeTimeEntriesChanged);
        }

        ezApi.ezclocker.ezUi.ezStartPageWaitExecute(
            'Refreshing employee time entries ..',
            (waitDone) => {
                ezApi.ezclocker.ezSelectedEmployeeView.ezDisableFilterTimeEntries();
                ezApi.ezclocker.ezEmployeeDisplayController.ezRefreshTimeEntryUx(eventData.data);
                ezApi.ezclocker.ezSelectedEmployeeView.ezEnableFilterTimeEntries();
                waitDone();
            });
    }


    /**
     * @protected @method
     * Handles the EzSelectedEmployeeView onSelectedEmployeeViewClockOutSubmit event
     */
    ezHandleClockOutButtonClick() {
        ezApi.ezclocker.ezUi.ezStartPageWait(
            `Clocking out employee ${ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().employeeName} ...`,
            (waitDone) => {
                ezApi.ezclocker.ezSelectedEmployeeView.ezDisableClockInOut();
                ezApi.ezclocker.ezClockInOutHandler.ezClockOut(
                    ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id,
                    ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().id,
                    ezApi.ezclocker.ezClockerContext.ezGetActiveAccountContextSelectedPeriod())
                    .then(
                        waitDone,
                        (eResponse) => {
                            waitDone();
                            ezApi.ezclocker.ezDialog.ezShowError(
                                'Clock Out Error',
                                ezApi.ezEM`
                                    ezClocker is not able to clock you out at this time.
                                    ${ezApi.ezclocker.ezDialog.ezCreateSupportContactInfo()}
                                    <div class="ezErrorDetails">${ezApi.ezToJson(eResponse)}</div>`);
                        });
            });
    }

    /**
     * @protected @method
     * Handles the EzSelectedEmployeeView onSelectedEmployeeViewClockInSubmit event
     */
    ezHandleClockInButtonClick() {
        ezApi.ezclocker.ezUi.ezStartPageWait(
            `Clocking in employee ${ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().employeeName} ...`,
            (waitDone) => {
                ezApi.ezclocker.ezSelectedEmployeeView.ezDisableClockInOut();
                ezApi.ezclocker.ezClockInOutHandler.ezClockIn(
                    ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id,
                    ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().id,
                    ezApi.ezclocker.ezClockerContext.ezGetActiveAccountContextSelectedPeriod())
                    .then(
                        waitDone,
                        (eResponse) => {
                            waitDone();
                            ezApi.ezclocker.ezDialog.ezShowError(
                                'Clock In Error',
                                ezApi.ezEM`
                                    ezClocker is not able to clock you in at this time.
                                    ${ezApi.ezclocker.ezDialog.ezCreateSupportContactInfo()}
                                    <div class="ezErrorDetails">${ezApi.ezToJson(eResponse)}</div>`);
                        });
            });
    }

    /**
     * @protected @method
     * Handles EzSelectedEmployeeView onSelectedEmployeeReInviteSubmit event.
     */
    ezHandleSelectedEmployeeReInviteSubmit() {
        ezApi.ezclocker.ezEmployerDashboardController.ezReinviteEmployee();
    }

    /**
     * @public @method
     * Handles the EzExportTimeSheetButton element's onclick event
     */
    ezHandleExportTimeSheetsButtonClick() {
        // TODO: Determine if this is still used!
        ezApi.ezclocker[EzEmployerTimesheetReportDialog.ezApiName].ezShow();
    }

    /**
     * @protected
     * Handles the edit time entry row button click
     *
     * @param {Number} timeEntryId
     */
    ezHandleTimeEntryRowEditButtonClick(timeEntryId) {
        // TODO: Determine where this is hooked or REMOVE THIS
        if (!ezApi.ezIsNumber(timeEntryId)) {
            // No valid time entry id to use
            return;
        }

        ezApi.ezclocker.ezTimeAddEditDialogController.ezShow(
            ezApi.ezclocker.ezEmployeeDisplayController.ezCreateEditTimeEntryDialogConfiguration(timeEntryId));
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
     * Returns the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezEmployerDashboardEventHandlers';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_ezEmployerDashboardEventHandlers_Ready'
        };
    }


    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzEmployerDashboardEventHandlers}
     */
    static #ezInstance = globalThis?.ezApi.ready && globalThis.ezApi?.ezclocker?.[EzEmployerDashboardEventHandlers.ezApiName]
        ? globalThis.ezApi.ezclocker[EzEmployerDashboardEventHandlers.ezApiName]
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzEmployerDashboardEventHandlers}
     */
    static get ezInstance() {
        return EzEmployerDashboardEventHandlers.#ezInstance;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzEmployerDashboardEventHandlers} instance
     */
    static set ezInstance(instance) {
        if (null != EzEmployerDashboardEventHandlers.#ezInstance) {
            throw new Error('EzEmployerDashboardEventHandlers\'s singleton instance is already reigstered with EzApi.');
        }

        EzEmployerDashboardEventHandlers.#ezInstance = instance;
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
    static #ezApiRegistrationState = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzEmployerDashboardEventHandlers.ezApiName]
        ? globalThis.ezApi?.ezclocker?.[EzEmployerDashboardEventHandlers.ezApiName].ezApiRegistrationState
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the ezApi registration state of this classes's singleton instance.
     * @returns {string}
     * A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzEmployerDashboardEventHandlers.#ezApiRegistrationState;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzEmployerDashboardEventHandlers.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return 'PENDING' === EzEmployerDashboardEventHandlers.ezApiRegistrationState &&
            globalThis?.ezApi?.ezclocker &&
            globalThis.ezApi.ezclocker?.[EzClockerContextEventName.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzClockerContext.ezApiName]?.ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzEmployerDashboardEventHandlers.ezInstance &&
            EzRegistrationState.REGISTERED === EzEmployerDashboardEventHandlers.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzEmployerDashboardEventHandlers.#ezCanRegister && !EzEmployerDashboardEventHandlers.#ezIsRegistered) {
            EzEmployerDashboardEventHandlers.ezInstance = ezApi.ezRegisterNewApi(
                EzEmployerDashboardEventHandlers,
                EzEmployerDashboardEventHandlers.ezApiName);
        }

        return EzEmployerDashboardEventHandlers.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *      1) Property getter EzEmployerDashboardEventHandlers.ezApiName
     *      2) Property getter EzEmployerDashboardEventHandlers.ezEventNames
     *      3) Property getter EzEmployerDashboardEventHandlers.ezInstance
     *      4) Property setter EzEmployerDashboardEventHandlers.ezInstance
     *      5) Property getter EzEmployerDashboardEventHandlers.ezApiRegistrationState
     *      6) Property setter EzEmployerDashboardEventHandlers.ezApiRegistrationState
     *      7) Property getter EzEmployerDashboardEventHandlers.#ezCanRegister
     *      8) Property getter EzEmployerDashboardEventHandlers.#ezIsRegistered
     *      9) Method EzEmployerDashboardEventHandlers.#ezRegistrator()
     */
    static {
        if (null == EzEmployerDashboardEventHandlers.ezApiRegistrationState) {
            EzEmployerDashboardEventHandlers.ezApiRegistrationState = 'PENDING';

            if (!EzEmployerDashboardEventHandlers.#ezRegistrator()) {
                document.addEventListener(
                    EzEmployerDashboardEventHandlers.ezOnEzApiReadyEventName,
                    EzEmployerDashboardEventHandlers.#ezRegistrator);

                document.addEventListener(
                    EzClockerContextEventName.ezEventNames.onReady,
                    EzEmployerDashboardEventHandlers.#ezRegistrator);

                document.addEventListener(
                    EzClockerContext.ezEventNames.onReady,
                    EzEmployerDashboardEventHandlers.#ezRegistrator);
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

import {
    EzObject,
    EzBoolean,
    EzString,
    EzArray,
    EzHtml,
    EzUrl,
    EzJson,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';
import {
    EzRegistrationState,
    EzElementEventName,
    EzClockerContextEventName,
} from '/ezlibrary/enums/EzEnumerations.js';
import { EzClass } from '/ezlibrary/EzClass.js';
import { EzDateTime } from '/public/javascript/common/ez-date-time.js';
import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';
import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';
import { EzEmployerService } from '/secure/javascript/common/ezclocker-employer-services.js';
import { EzScheduleService } from '/secure/javascript/services/ezclocker-schedule-service.js';
import { EzUI } from '/public/javascript/common/ezui.js';
import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';
import { EzFeatureToggles } from '/ezlibrary/ez-feature-toggles2.js';
import { EzEmployerSchedulePageHeader } from '/secure/schedule/EzEmployerSchedulePageHeader.js';
import { EzScheduleRenderer } from '/secure/schedule/schedule-renderer.js';
import { EzWidgetAccountMode } from '/ezlibrary/enums/EzWidgetAccountMode.js';
import { EzShiftEditorDialog } from '/secure/schedule/EzShiftEditorDialog.js';

import { EzEmployerScheduleControllerReadyState } from '/secure/schedule/EzEmployerScheduleControllerReadyState.js';
import { EzScheduleViewDataHelper } from '/secure/schedule/EzScheduleViewDataHelper.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * Controls the employer schedule UX
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzEmployerScheduleController } from '/secure/schedule/employer-schedule-controller.js';
 * ---------------------------------------------------------------------------
 * Singleton instance ready for use when the below evaluates to true:
 *     globalthis.1ezApi.ezclocker?.[EzEmployerScheduleController.ezApiName]?.ready
 * ---------------------------------------------------------------------------
 * Listen to onReady event:
 *     document.addEventListener(
 *         EzEmployerScheduleController.ezEventNames.onReady,
 *         this.#ezRegistrator);
 * ---------------------------------------------------------------------------
 * Singleton Instance References:
 *     Outside this class: ezApi.ezclocker.ezEmployerScheduleController
 *     Within this class: EzEmployerScheduleController.ezInstance
 * ---------------------------------------------------------------------------
 */
export class EzEmployerScheduleController extends EzClass {
    /**
     * @public @readonly @property
     * Gets the view name for feature toggles
     * @returns {string}
     */
    get ezFeatureViewName() {
        return 'employerSchedule';
    }

    /**
     * @public @readonly @property
     * Gets the default error title
     * @returns {string}
     */
    get DEFAULT_ERROR_TITLE() {
        return 'Schedule Error';
    }

    /**
     * @public @readonly @property
     * Gets the default error message
     * @returns {string}
     */
    get DEFAULT_ERROR_MESSAGE() {
        return 'An unexpected error occurred while processing your schedule data.';
    }

    /**
     * TODO: Moving to EzScheduleViewDataHelper (ezEmployerLocationEntities)
     * @private @field
     * Stores the array of employer location entities
     * @type {array}
     */
    #locations = [];
    /**
     * @public @property @getter
     * Gets the array of employer location entities
     * @returns {array}
     */
    get locations() {
        return this.#locations;
    }
    /**
     * @public @property @getter
     * Sets the array of employer location entities
     * @param {array} locations
     */
    set locations(locations) {
        this.#locations = EzArray.arrayOrEmpty(locations);
    }

    /**
     * @public @readonly @property
     * Returns an object with categories with key=value pairs to use as a constant value
     * for the id of commonly manipulated HTML elements.
     * @returns {object}
     */
    get ezIds() {
        return {
            ezEmployerLogoImageId: '_EmployerLogoImage',
            ezEmployerNameCellId: '_EmployerNameCell',
            ezMainNavigationUx: {
                ezNavTimeOffBtnId: '_NavTimeOff',
                ezNavDashboardBtnId: '_NavDashboard',
                ezNavSchedulesBtnId: '_NavSchedules',
                ezNavArchiveBtnId: '_NavEmployeeArchive',
                ezNavAccountBtnId: '_NavAccount',
                ezNavSignOut: '_NaviSignout',
            }
        };
    }

    /**
     * @private @field
     * Stores the employer schedule controller ready state flags
     * @type {EzEmployerScheduleControllerReadyState}
     */
    #ezReadyStateFlags = null;
    /**
     * @public @property @getter
     * Gets the employer schedule controller ready state flags
     * @returns {EzEmployerScheduleControllerReadyState}
     */
    get ezReadyStateFlags() {
        if (null == this.#ezReadyStateFlags) {
            this.#ezReadyStateFlags = new EzEmployerScheduleControllerReadyState();
        }

        return this.#ezReadyStateFlags;
    }
    /**
     * @public @property @Setter
     * Sets the employer schedule controller ready state flags
     * @param {EzEmployerScheduleControllerReadyState} ezEmployerScheduleControllerReadyState
     */
    set ezReadyStateFlags(ezEmployerScheduleControllerReadyState) {
        if (null == this.#ezReadyStateFlags) {
            this.#ezReadyStateFlags = new EzEmployerScheduleControllerReadyState();
        }

        this.#ezReadyStateFlags.ezLoadFrom(ezEmployerScheduleControllerReadyState);
    }

    /**
     * @public @method
     * Initializes EzEmployerScheduleController
     * @returns {EzEmployerScheduleController}
     */
    ezInit() {
        // ezStopPageWait called in event handler for EzEmployerScheduleControllerReadyState.ezEventNames.onReadyStateReady
        ezApi.ezclocker.ezUi.ezStartPageWait('Loading schedule view ...');

        // EzEmployerScheduleControllerReadyState will hook events needed for the ready state
        // during construction and trigger the EzEmployerScheduleControllerReadyState.ezEventNames.onReadyStateReady
        // event when all ready state properties equal true.
        this.#ezReadyStateFlags = new EzEmployerScheduleControllerReadyState();

        // Waiting for EzEmployerScheduleControllerReadyState.ezEventNames.onReadyStateReady
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzEmployerScheduleControllerReadyState.ezEventNames.onReadyStateReady,
            EzEmployerScheduleController.ezApiName,
            () => {
                if (EzEmployerScheduleController.ezInstance.ezReadyStateFlags.isReady) {
                    EzEmployerScheduleController.ezInstance.ezInitData()
                        .then(
                            () => EzEmployerScheduleController.ezInstance.ezInitUX()
                                .then(
                                    () => {
                                        ezApi.ezclocker.ezFeatureToggles.ezApplyViewFeatureToggles('employerSchedule');

                                        EzEmployerScheduleController.ezInstance.ezRefreshScheduleUx();

                                        ezApi.ezclocker.ezUi.ezStopPageWait();
                                    }));
                }
            },
            true);

        return EzEmployerScheduleController.ezInstance;
    }

    /**
     * @public @method
     * Initializes the schedule page data
     */
    ezInitData() {
        return EzPromise.asyncAction(
            (finished) => {
                if (ezApi.ezclocker.ezClockerContext.ezGetUserContext().isEmployer) {
                    // Disable navigation to the account if the user does not have the employer role
                    ezApi.ezclocker.ezUi.ezEnableElement(
                        EzEmployerScheduleController.ezInstance.ezIds.ezMainNavigationUx.ezNavAccountBtnId);
                }

                return ezApi.ezclocker.ezScheduleLocationsDialog.ezCacheEmployeeAssignedLocations()
                    .then(finished);
            });
    }

    /**
     * @public @method
     * Initializes the EzEmployerScheduleController UX
     */
    ezInitUX() {
        return EzPromise.asyncAction(
            (finished) => {
                // Load employer logo
                ezApi.ezclocker.ezEmployerService.ezLoadEmployerImage(
                    ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id)
                    .then(
                        (imageUrl) => ezApi.ezclocker.ezUi.setImgElementSrc(
                            EzEmployerScheduleController.ezInstance.ezIds.ezEmployerLogoImageId,
                            imageUrl));

                ezApi.ezclocker.ezUi.ezShowContent(
                    EzEmployerScheduleController.ezInstance.ezIds.ezEmployerNameCellId,
                    EzString.stringOrEmpty(
                        ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().employerName));

                // Selected moment in week change event
                /*
                ezApi.ezclocker.ezEventEngine.ezWantEvent(
                    EzScheduleViewDataHelper.ezEventNames.onScheduleSelectedMomentInWeekChanged,
                    EzEmployerScheduleController.ezApiName,
                    () => EzEmployerScheduleController.ezInstance.ezHandleOnScheduleSelectedMomentInWeekChanged);
                */

                // Site Navigation Buttons
                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    EzEmployerScheduleController.ezInstance.ezIds.ezMainNavigationUx.ezNavDashboardBtnId,
                    EzElementEventName.CLICK,
                    EzEmployerScheduleController.ezApiName,
                    () => EzEmployerScheduleController.ezInstance.ezExecuteNavigateAction(
                        EzEmployerScheduleController.ezInstance.ezIds.ezMainNavigationUx.ezNavDashboardBtnId));

                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    EzEmployerScheduleController.ezInstance.ezIds.ezMainNavigationUx.ezNavDashboardBtnId,
                    EzElementEventName.CLICK,
                    EzEmployerScheduleController.ezApiName,
                    () => EzEmployerScheduleController.ezInstance.ezExecuteNavigateAction(
                        EzEmployerScheduleController.ezInstance.ezIds.ezMainNavigationUx.ezNavDashboardBtnId));

                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    EzEmployerScheduleController.ezInstance.ezIds.ezMainNavigationUx.ezNavTimeOffBtnId,
                    EzElementEventName.CLICK,
                    EzEmployerScheduleController.ezApiName,
                    () => EzEmployerScheduleController.ezInstance.ezExecuteNavigateAction(
                        EzEmployerScheduleController.ezInstance.ezIds.ezMainNavigationUx.ezNavTimeOffBtnId));

                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    EzEmployerScheduleController.ezInstance.ezIds.ezMainNavigationUx.ezNavArchiveBtnId,
                    EzElementEventName.CLICK,
                    EzEmployerScheduleController.ezApiName,
                    () => EzEmployerScheduleController.ezInstance.ezExecuteNavigateAction(
                        EzEmployerScheduleController.ezInstance.ezIds.ezMainNavigationUx.ezNavArchiveBtnId));

                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    EzEmployerScheduleController.ezInstance.ezIds.ezMainNavigationUx.ezNavAccountBtnId,
                    EzElementEventName.CLICK,
                    EzEmployerScheduleController.ezApiName,
                    () => EzEmployerScheduleController.ezInstance.ezExecuteNavigateAction(
                        EzEmployerScheduleController.ezInstance.ezIds.ezMainNavigationUx.ezNavAccountBtnId));

                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    EzEmployerScheduleController.ezInstance.ezIds.ezMainNavigationUx.ezNavSignOut,
                    EzElementEventName.CLICK,
                    EzEmployerScheduleController.ezApiName,
                    () => EzEmployerScheduleController.ezInstance.ezExecuteNavigateAction(
                        EzEmployerScheduleController.ezInstance.ezIds.ezMainNavigationUx.ezNavSignOut));

                // Manage location button
                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    EzEmployerSchedulePageHeader.ezIds.ezManageLocationsUx.manageLocationsButtonId,
                    EzElementEventName.CLICK,
                    EzEmployerScheduleController.ezApiName,
                    ezApi.ezclocker.ezScheduleLocationsDialog.ezManageLocationsClick);

                // Export Schedule Button
                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    EzEmployerSchedulePageHeader.ezIds.ezExportSchedulesUx.exportScheduleButtonId,
                    EzElementEventName.CLICK,
                    EzEmployerScheduleController.ezApiName,
                    EzEmployerScheduleController.ezInstance.ezExportSchedule);

                // Schedule shift editor dialog events
                ezApi.ezclocker.ezEventEngine.ezWantEvent(
                    EzShiftEditorDialog.ezEventNames.onShiftEditorDialogShiftAdded,
                    EzEmployerScheduleController.ezApiName,
                    EzEmployerScheduleController.ezInstance.ezHandleOnShiftEditorDialogScheduleAdded);

                ezApi.ezclocker.ezEventEngine.ezWantEvent(
                    EzShiftEditorDialog.ezEventNames.onShiftEditorDialogShiftUpdated,
                    EzEmployerScheduleController.ezApiName,
                    EzEmployerScheduleController.ezInstance.ezHandleOnShiftEditorDialogScheduleUpdated);

                ezApi.ezclocker.ezEventEngine.ezWantEvent(
                    EzScheduleViewDataHelper.ezEventNames.onShiftDeleted,
                    EzEmployerScheduleController.ezApiName,
                    EzEmployerScheduleController.ezInstance.ezHandleOnShiftEditorDialogScheduleDeleted);

                // Data changed refresh events
                ezApi.ezclocker.ezEventEngine.ezWantEvent(
                    EzScheduleViewDataHelper.ezEventNames.onTimeOffEntitiesChanged,
                    EzEmployerScheduleController.ezApiName,
                    EzEmployerScheduleController.ezInstance.ezRefreshScheduleUx);

                ezApi.ezclocker.ezEventEngine.ezWantEvent(
                    EzScheduleViewDataHelper.ezEventNames.onScheduleEntitiesChanged,
                    EzEmployerScheduleController.ezApiName,
                    EzEmployerScheduleController.ezInstance.ezRefreshScheduleUx);

                return finished();
            });
    }

    /**
     * @public @method
     * Handles the onSchedulesChange event
     */
    ezRefreshScheduleUx() {
        let isEmployeeScheduleView = EzBoolean.isTrue(ezApi.ezclocker.ezClockerContext.ezGetActiveAccount().isEmployee) &&
            EzBoolean.isFalse(ezApi.ezclocker.ezClockerContext.ezGetActiveAccount().isPersonal);

        ezApi.ezclocker.ezScheduleRenderer.ezRenderSchedules(
            // scheduleWeekMoment
            ezApi.ezclocker.ezScheduleViewDataHelper.ezScheduleSelectedMomentInWeek,
            // firstDayOfWeek
            ezApi.ezclocker.ezScheduleViewDataHelper.ezFirstDayOfWeek,
            // schedulesByEmployeeId,
            ezApi.ezclocker.ezScheduleViewDataHelper.ezScheduleEntitiesOrderedByEmployeeId,
            // schedulesByDate
            ezApi.ezclocker.ezScheduleViewDataHelper.ezScheduleEntitiesOrderedBystartDateTimeIso,
            // isEmployeeDashboard
            isEmployeeScheduleView,
            // timeOffsByEmployeeId
            ezApi.ezclocker.ezScheduleViewDataHelper.ezTimeOffEntitiesOrderedEmployeeId,
            // timeOffsByDate
            ezApi.ezclocker.ezScheduleViewDataHelper.ezTimeOffEntitiesOrderedByRequestStartDateTimeIso);

        // Note: Publish schedule button re-enabled in call to ezUpdatePublishSchedulesUx()
        EzEmployerScheduleController.ezInstance.ezUpdatePublishSchedulesUx();
    }

    /**
     * @public @method
     * Promps the user to publish schedules if pending
     * @param {String} eventId
     */
    ezConfirmPublishBeforeNavigation() {
        if (EzBoolean.isFalse(EzEmployerScheduleController.ezInstance.ezPublishSchedulesPending)) {
            return EzPromise.finished();
        }

        return EzPromise.asyncAction(
            (finished) => ezApi.ezclocker.ezDialog.ezShowYesNo(
                'Publish Schedule',
                'Do you want to publish before you navigate?')
                .then(
                    (dialogResult) => ezApi.ezclocker.ezDialog.NO_DIALOG_RESPONSE.dialogStatus !== dialogResult.dialogStatus
                        ? ezApi.ezclocker.ezScheduleViewDataHelper.ezPublishSchedulesForWeek(false)
                            .then(finished)
                        : finished()));
    }

    /**
     * @public @method
     * Navigates in the UX based on navigation actionId provided.
     * @param {string} eventId
     */
    ezExecuteNavigateAction(actionId) {
        return EzEmployerScheduleController.ezInstance.ezConfirmPublishBeforeNavigation()
            .then(
                () => {
                    switch (actionId) {
                        case EzEmployerScheduleController.ezInstance.ezIds.ezMainNavigationUx.ezNavAccountBtnId:
                            ezApi.ezclocker.ezNavigation.ezNavigateToEmployerAccountPage();

                            break;
                        case EzEmployerScheduleController.ezInstance.ezIds.ezMainNavigationUx.ezNavArchiveBtnId:
                            ezApi.ezclocker.ezNavigation.ezNavigateToEmployeeArchive();

                            break;
                        case EzEmployerScheduleController.ezInstance.ezIds.ezMainNavigationUx.ezNavSignOut:
                            ezApi.ezclocker.ezNavigation.signOut();

                            break;
                        case EzEmployerScheduleController.ezInstance.ezIds.ezMainNavigationUx.ezNavDashboardBtnId:
                            ezApi.ezclocker.ezNavigation.ezNavigateToEmployerDashboard();

                            break;
                        case EzEmployerScheduleController.ezInstance.ezIds.ezMainNavigationUx.ezNavTimeOffBtnId:
                            EzEmployerScheduleController.ezInstance.ezNavigateToTimeOff();

                            break;
                        default:
                            ezApi.ezclocker.ezLogger.error(`Navigation action '${actionId}' is not supported.`);
                    }
                });
    }

    /**
     * @public @method
     * Exports the schedule as a CSV file
     */
    ezExportSchedule() {
        return ezApi.ezclocker.ezUi.ezStartPageWaitExecute(
            'Exporting schedule to csv ...',
            (waitDone) => {
                let exportSchedulePayload = {
                    employerId: ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id,
                    totalInDecimalFormat: false,
                    timeIn24HourFormat: false,
                    includeJobs: false,
                    isPersonalEmployee: false,
                    selectedEmployeeId: null,
                    dateInWeek: ezApi.ezclocker.ezScheduleViewDataHelper.ezScheduleSelectedIsoInWeek,
                    timePeriod: {
                        dateInWeek: ezApi.ezclocker.ezScheduleViewDataHelper.ezScheduleSelectedIsoInWeek,
                        firstDayOfWeek: ezApi.ezclocker.ezScheduleViewDataHelper.ezFirstDayOfWeek,
                        periodStartDateTimeIso: null,
                        periodEndDateTimeIso: null,
                        targetDateTimeZone: ezApi.ezclocker.ezDateTime.activeTimeZone
                    },
                    includeTimeOff: true
                };

                let downloadName = EzHtml.buildId`
                    Schedule_${ezApi.ezclocker.ezUi.ezId('day0').html().replace(' ', '_').replace('/', '-')}-to-
                    ${ezApi.ezclocker.ezUi.ezId('day6').html().replace(' ', '_').replace('/', '-')}.csv`;

                let url = ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                    EzUrl.build`
                        reports/employer/EmployerExportSchedule/CSV
                            ?report-request=${EzString.encodeURL(EzJson.toJson(exportSchedulePayload))}
                            &download-file-name=${downloadName}&target-time-zone=${ezApi.ezclocker.ezDateTime.activeTimeZone}`, 'v2');

                return EzPromise.waitDoneThen(
                    this,
                    waitDone,
                    () => ezApi.ezclocker.ezReportDownloadDialog.ezShow(
                        url,
                        'Click here to download the schedule.'));
            });
    }

    /**
     * @protected @method
     * Handles resizing of the UX elements on the page
     */
    ezResizeUXElements() {
        let header = ezApi.ezclocker.ezUi.ezFindByElementOrId('_EzClockerHeader');

        let mContent = ezApi.ezclocker.ezUi.ezFindByElementOrId('_EzClockerMainContent');

        let nonContentHeight = EzObject.isValid(header)
            ? header.outerHeight(true)
            : 0;

        if (ezApi.isValid(mContent)) {
            mContent.height(ezApi.ezWindow().height() - (nonContentHeight + 40));
        }
    }

    /**
     * @public @method
     * Locates an employee in the EzEmployerScheduleController.ezInstance.employees array by matching the first employee with the provided employeeId
     * @param {Number} employeeId
     */
    locateEmployeeById(employeeId) {
        EzEmployerScheduleController.ezInstance.employees.forEach(
            (employee) => {
                if (employee.id === employeeId) {
                    return employee;
                }
            });

        return null;
    }

    /**
     * @public @method
     * Disables UX items UX while a refresh of the schedule data is occuring
     */
    disableRefreshSchedules() {
        // Header Buttons
        ezApi.ezclocker.ezUi.ezDisableElement(
            EzEmployerSchedulePageHeader.ezIds.ezSelectWeekUx.navigatePreviousWeekButtonId);

        ezApi.ezclocker.ezUi.ezDisableElement(
            EzEmployerSchedulePageHeader.ezIds.ezSelectWeekUx.selectedWeekDateInputId);

        ezApi.ezclocker.ezUi.ezDisableElement(
            EzEmployerSchedulePageHeader.ezIds.ezSelectWeekUx.navigateNextWeekButtonId);

        ezApi.ezclocker.ezUi.ezDisableElement(
            EzEmployerSchedulePageHeader.ezIds.ezManageLocationsUx.manageLocationsButtonId);

        ezApi.ezclocker.ezUi.ezDisableElement(
            EzEmployerSchedulePageHeader.ezIds.ezExportSchedulesUx.exportScheduleButtonId);

        ezApi.ezclocker.ezUi.ezDisableElement(
            EzEmployerSchedulePageHeader.ezIds.ezPublishScheduleUx.publishScheduleMenuButtonId);
    }

    /**
     * @public @method
     * Enables the UX (normally after a refresh schedule is completed)
     */
    enableRefreshSchedules() {
        // Header Buttons and Inputs
        ezApi.ezclocker.ezUi.ezEnableElement(
            EzEmployerSchedulePageHeader.ezIds.ezSelectWeekUx.navigatePreviousWeekButtonId);

        ezApi.ezclocker.ezUi.ezEnableElement(
            EzEmployerSchedulePageHeader.ezIds.ezSelectWeekUx.selectedWeekDateInputId);

        ezApi.ezclocker.ezUi.ezEnableElement(
            EzEmployerSchedulePageHeader.ezIds.ezSelectWeekUx.navigateNextWeekButtonId);

        ezApi.ezclocker.ezUi.ezEnableElement(
            EzEmployerSchedulePageHeader.ezIds.ezManageLocationsUx.manageLocationsButtonId);

        ezApi.ezclocker.ezUi.ezEnableElement(
            EzEmployerSchedulePageHeader.ezIds.ezExportSchedulesUx.exportScheduleButtonId);

        ezApi.ezclocker.ezUi.ezEnableElement(
            EzEmployerSchedulePageHeader.ezIds.ezPublishScheduleUx.publishScheduleMenuButtonId);
    }

    /**
     * @public @method
     * Updates any UX related to publish schedules based schedule data.
     */
    ezUpdatePublishSchedulesUx() {
        EzEmployerScheduleController.ezInstance.ezPublishSchedulesPending = ezApi.ezclocker.ezScheduleViewDataHelper.ezDetermineIfSchedulesNeedPublished(
            ezApi.ezclocker.ezScheduleViewDataHelper.ezScheduleEntities);

        if (EzBoolean.isTrue(EzEmployerScheduleController.ezInstance.ezPublishSchedulesPending)) {
            ezApi.ezclocker.ezUi.ezEnableElement(
                EzEmployerSchedulePageHeader.ezIds.ezPublishScheduleUx.publishScheduleMenuButtonId);

            ezApi.ezclocker.ezUi.ezSetInputValue(
                EzEmployerSchedulePageHeader.ezIds.ezPublishScheduleUx.publishScheduleMenuButtonId,
                'default');
        } else {
            ezApi.ezclocker.ezUi.ezDisableElement(
                EzEmployerSchedulePageHeader.ezIds.ezPublishScheduleUx.publishScheduleMenuButtonId);

            ezApi.ezclocker.ezUi.ezSetInputValue(
                EzEmployerSchedulePageHeader.ezIds.ezPublishScheduleUx.publishScheduleMenuButtonId,
                'default');
        }
    }

    /**
     * @public @method
     * Navigates to the time-off page
     */
    ezNavigateToTimeOff() {
        ezApi.ezclocker.ezNavigation.ezNavigateToTimeOff();
    }

    /**
     * @public @method
     * Handles the create time off request action: TFACTION_CREATE_TIME_OFF_REQUEST
     */
    ezHandleCreateTimeOffRequest() {
        ezApi.ezclocker.ezTimeOffRequestDialog.ezShow(EzWidgetAccountMode.EMPLOYER);
    }

    /**
     * @protected @method
     * Handles the time off request action: TFACTION_VIEW_TIME_OFF_REQUESTS
     */
    ezHandleViewAllTimeOffRequests() {
        ezApi.ezclocker.ezViewAllTimeOffRequestsDialog.ezShow(
            EzWidgetAccountMode.EMPLOYER,
            EzScheduleViewDataHelper.ezInstance.ezScheduleSelectedMomentInWeek);
    }

    /**
     * @protected @method
     * Handles the EzShiftEditorDialog.onShiftEditorDialogShiftAdded event
     * event.data = {
     *      errorCode: {Number}
     *      message: {'Success'|{Error message}}
     *      schedule: {scheduleObject}
     *  }
     * @param {Object}
     */
    ezHandleOnShiftEditorDialogScheduleAdded() {
        return ezApi.ezclocker.ezScheduleViewDataHelper.ezRefreshScheduleData()
            .then(EzPromise.ignoreResolve);
    }

    /**
     * @protected @method
     * Handles the EzShiftEditorDialog.onShiftEditorDialogShiftUpdated event
     * event.data = {
     *      errorCode: {Number}
     *      message: {'Success'|{Error message}}
     *      schedule: {scheduleObject}
     *  }
     * @param {Object}
     */
    ezHandleOnShiftEditorDialogScheduleUpdated() {
        return ezApi.ezclocker.ezScheduleViewDataHelper.ezRefreshScheduleData()
            .then(EzPromise.ignoreResolve);
    }

    /**
     * @protected @method
     * Handles the EzShiftEditorDialog.onShiftEditorDialogShiftUpdated event
     * event.data = {
     *      errorCode: {Number}
     *      message: {'Success'|{Error message}}
     *      schedule: {scheduleObject}
     *  }
     * @param {Object}
     */
    ezHandleOnShiftEditorDialogScheduleDeleted() {
        return ezApi.ezclocker.ezScheduleViewDataHelper.ezRefreshScheduleData()
            .then(EzPromise.ignoreResolve);
    }

    /**
     * @protected @method
     * Handles the onShiftEditorDialogShiftAddError event
     * event.data = {
     *      errorCode: {Number}
     *      message: {'Success'|{Error message}}
     *      schedule: {scheduleObject},
     *      jqXHR: {Object}
     *  }
     * @param {Object}
     */
    ezHandleOnShiftEditorDialogScheduleAddError(event) {
        return ezApi.ezclocker.ezDialog.ezSomethingIsWrong(
            'Error Adding New Shift',
            EzHtml.build`
                <p
                    id="EzHandleOnShiftEditorDialogScheduleAddError_P1">
                    During the save of your new shift, ezClocker encountered an error response from our cloud servers.
                    It is possible your shift was still added successfully. When you click OK, we will refresh the
                    schedules. If your new shift does not appear after the refresh we recommend adding the shift again.
                </p>
                <p
                    id="EzHandleOnShiftEditorDialogScheduleAddError_P2">
                    If you continue to receive this error after trying to add the shift again then please contact
                    support at <a href="mailto:support@ezclocker.com?subject=\'Add schedule fails\'"> and provide the
                    error message you received and the ezClocker support team will assist you in resolving the problem.
                </p>
                We appologize for the disruption of your day!`,
            null,
            event.jqXHR,
            event.eResponse)
            .then(
                () => ezApi.ezclocker.ezScheduleViewDataHelper.ezRefreshScheduleData()
                    .then(EzPromise.ignoreResolve));
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
        return 'ezEmployerScheduleController';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzEmployerScheduleController_Ready',
            onReadyStateReady: 'EzEmployerScheduleController_ReadyStateReady'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzEmployerScheduleController}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzEmployerScheduleController.ezApiName])
        ? globalThis.ezApi.ezclocker[EzEmployerScheduleController.ezApiName]
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzEmployerScheduleController}
     */
    static get ezInstance() {
        return EzEmployerScheduleController.#ezInstance;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzEmployerScheduleController} instance
     */
    static set ezInstance(instance) {
        if (null != EzEmployerScheduleController.#ezInstance) {
            throw new Error('EzEmployerScheduleController\'s singleton instance is already reigstered with EzApi.');
        }

        EzEmployerScheduleController.#ezInstance = instance;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzEmployerScheduleController.ezApiName])
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
        return EzEmployerScheduleController.#ezApiRegistrationState;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzEmployerScheduleController.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzEmployerScheduleController.ezApiRegistrationState &&

            globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker &&

            globalThis.ezApi.ezclocker?.[EzDateTime.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzClockerContextEventName.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzEventEngine.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzClockerContext.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzFeatureToggles.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzEmployerService.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzScheduleService.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzUI.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzDialog.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzEmployerSchedulePageHeader.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzScheduleRenderer.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzScheduleViewDataHelper.ezApiName]?.ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzEmployerScheduleController.ezInstance &&
            EzRegistrationState.REGISTERED === EzEmployerScheduleController.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzEmployerScheduleController.#ezCanRegister && !EzEmployerScheduleController.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzEmployerScheduleController, EzEmployerScheduleController.ezApiName);
        }

        return EzEmployerScheduleController.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzEmployerScheduleController.ezApiName
     *     2) Property getter EzEmployerScheduleController.ezEventNames
     *     3) Property getter EzEmployerScheduleController.ezInstance
     *     4) Property setter EzEmployerScheduleController.ezInstance
     *     5) Property getter EzEmployerScheduleController.ezApiRegistrationState
     *     6) Property setter EzEmployerScheduleController.ezApiRegistrationState
     *     7) Property getter EzEmployerScheduleController.#ezCanRegister
     *     8) Property getter EzEmployerScheduleController.#ezIsRegistered
     *     9) Method EzEmployerScheduleController.#ezRegistrator()
     */
    static {
        if (!EzEmployerScheduleController.#ezIsRegistered) {
            EzEmployerScheduleController.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzEmployerScheduleController.#ezRegistrator()) {
                document.addEventListener(
                    EzEmployerScheduleController.ezOnEzApiReadyEventName,
                    EzEmployerScheduleController.#ezRegistrator);

                document.addEventListener(
                    EzDateTime.ezEventNames.onReady,
                    EzEmployerScheduleController.#ezRegistrator);

                document.addEventListener(
                    EzClockerContextEventName.ezEventNames.onReady,
                    EzEmployerScheduleController.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzEmployerScheduleController.#ezRegistrator);

                document.addEventListener(
                    EzClockerContext.ezEventNames.onReady,
                    EzEmployerScheduleController.#ezRegistrator);

                document.addEventListener(
                    EzFeatureToggles.ezEventNames.onReady,
                    EzEmployerScheduleController.ezRegistrator);

                document.addEventListener(
                    EzEmployerService.ezEventNames.onReady,
                    EzEmployerScheduleController.#ezRegistrator);

                document.addEventListener(
                    EzScheduleService.ezEventNames.onReady,
                    EzEmployerScheduleController.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzEmployerScheduleController.#ezRegistrator);

                document.addEventListener(
                    EzDialog.ezEventNames.onReady,
                    EzEmployerScheduleController.#ezRegistrator);

                document.addEventListener(
                    EzEmployerSchedulePageHeader.ezEventNames.onReady,
                    EzEmployerScheduleController.#ezRegistrator);

                document.addEventListener(
                    EzScheduleRenderer.ezEventNames.onReady,
                    EzEmployerScheduleController.#ezRegistrator);

                document.addEventListener(
                    EzScheduleViewDataHelper.ezEventNames.onReady,
                    EzEmployerScheduleController.#ezRegistrator);
            }
        }

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // NO CODE AFTER THIS SECTION
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    }
}

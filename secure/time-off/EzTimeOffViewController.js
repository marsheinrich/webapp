import { EzBadParamException } from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzString,
    EzArray,
    EzHtml,
    EzUrl,
    EzJson,
    EzPromise,
    EzNumber,
    EzFunction
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzClass } from '/ezlibrary/EzClass.js';
import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

import {
    EzClockerContextEventName,
    EzElementEventName,
    EzRegistrationState,
    EzWidgetAccountMode,
    EzTimeOffType,
    EzTimeOffStatus,
    EzAccountNavButtonActiveOption
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzDateTime } from '/public/javascript/common/ez-date-time.js';
import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';
import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';
import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
import { EzLicenseHelper } from '/secure/javascript/common/ezclocker-license-helper.js';
import { EzEmployerService } from '/secure/javascript/common/ezclocker-employer-services.js';

import { EzUI } from '/public/javascript/common/ezui.js';

import { EzHelp } from '/secure/widgets/EzHelp/EzHelp.js';
import { EzAccountNavButton } from '/secure/widgets/EzAccountNavButton/EzAccountNavButton.js';

import { EzViewTimeOffRenderer } from './EzViewTimeOffRenderer';
import { EzTimeOffRequestDialog } from "../widgets/EzTimeOffDialogs/EzTimeOffRequestDialog";
import { EzViewTimeOffRequestDialog } from "../widgets/EzTimeOffDialogs/EzViewTimeOffRequestDialog";
import { EzExportDialogMode } from "../widgets/EzExportReportDialog/EzExportDialogMode";
import { EzwEmployerExportTimeOffDialog } from '/secure/widgets/EzExportReportDialog/ez-export-timeoff-report-dialog';

/**
 * @class
 * @extends {EzEnumeration2}
 * Enumeration for the time off view modes
 */
class EzTimeOffViewMode extends EzEnumeration2 {
    /**
     * @private @field
     * Stores the singleton instance of this enumeration class.
     * @type {EzTimeOffViewMode}
     */
    static #ezEnumerationSingleton = null;

    /**
     * @static
     * Static Initialization
     */
    static {
        if (null == this.#ezEnumerationSingleton) {
            this.#ezEnumerationSingleton = new EzTimeOffViewMode(
                // Enum property names
                [
                    'UNKNOWN',
                    'EMPLOYER_MODE',
                    'EMPLOYEE_MODE'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                null,
                // Optional array of additional data for eac enumeration property.
                // Enter null if not needed.
                null);
        }
    }
}

/**
 * @class
 * Stores the ready state flags for the EzTimeOffViewController
 */
class EzTimeOffViewControllerReadyState {
    /**
     * @public @constructor
     * Creates a new instance of EzTimeOffViewControllerReadyState
     * @param {undefined|null|function} ezProcessReadyChecksCallback
     */
    constructor(ezProcessReadyChecksCallback = null) {
        this.ezProcessReadyChecksCallback = ezProcessReadyChecksCallback;
    }

    /**
     * @private @field
     * Stores the reference to the function that is called when a state property is set.
     * Callback function template:
     *  () => {
     *      return EzPromise.asyncAction(
     *          (finished) => {
     *              // ... process ready checks ...
     *
     *              // If success full:
     *              return finished(processingSuccessful);
     *          }
     *  }
     * Default: null
     * @type {function}
     */
    #ezProcessReadyChecksCallback = null;
    get ezProcessReadyChecksCallback() {
        return this.#ezProcessReadyChecksCallback;
    }
    set ezProcessReadyChecksCallback(processReadyChecksCallback) {
        this.#ezProcessReadyChecksCallback = EzFunction.isFunction(processReadyChecksCallback)
            ? processReadyChecksCallback
            : null;
    }

    /**
     * @private @field
     * Stores if the user context is ready
     * Default: false
     * @type {boolean}
     */
    #userContextReady = false;
    /**
     * @public @property @getter
     * Gets if the user context is ready
     * @returns {boolean}
     */
    get userContextReady() {
        return this.#userContextReady;
    }
    /**
     * @public @property @setter
     * Sets if the user context is ready
     * Default: false
     * @param {boolean} userContextReady
     */
    set userContextReady(userContextReady = false) {
        this.#userContextReady = EzBoolean.booleanOrFalse(userContextReady);

        this.#ezCallProcessReadyChecksCallback();
    }

    /**
     * @private @field
     * Stores if the active employer is ready
     * Default: false
     * @type {boolean}
     */
    #activeEmployerReady = false;
    /**
     * @public @property @getter
     * Gets if the active employer is ready
     * @returns {boolean}
     */
    get activeEmployerReady() {
        return this.#activeEmployerReady;
    }
    /**
     * @public @property @setter
     * Sets if the active employer is ready
     * Default: false
     * @param {boolean} activeEmployerReady
     */
    set activeEmployerReady(activeEmployerReady = false) {
        this.#activeEmployerReady = EzBoolean.booleanOrFalse(activeEmployerReady);

        this.#ezCallProcessReadyChecksCallback();
    }

    /**
     * @private @field
     * Stores if the active employee is ready
     * Default: false
     * @type {boolean}
     */
    #activeEmployeeReady = false;
    /**
     * @public @property @getter
     * Gets if the active employee is ready
     * @returns {boolean}
     */
    get activeEmployeeReady() {
        return this.#activeEmployeeReady;
    }
    /**
     * @public @property @setter
     * Sets if the active employee is ready
     * Default: false
     * @param {boolean} activeEmployeeReady
     */
    set activeEmployeeReady(activeEmployeeReady = false) {
        this.#activeEmployeeReady = EzBoolean.booleanOrFalse(activeEmployeeReady);

        this.#ezCallProcessReadyChecksCallback();
    }

    /**
     * @private @field
     * Stores if license helper is ready
     * Default: false
     * @type {boolean}
     */
    #ezLicenseHelperReady = false;
    /**
     * @public @property @getter
     * Gets if license helper is ready
     * @returns {boolean}
     */
    get ezLicenseHelperReady() {
        return this.#ezLicenseHelperReady;
    }
    /**
     * @public @property @setter
     * Sets if license helper is ready
     * Default: false
     * @param {boolean} ezLicenseHelperReady
     */
    set ezLicenseHelperReady(ezLicenseHelperReady = false) {
        this.#ezLicenseHelperReady = EzBoolean.booleanOrFalse(ezLicenseHelperReady);

        this.#ezCallProcessReadyChecksCallback();
    }

    /**
     * @private @field
     * Stores if the EzTimeOffViewController is ready to use or not.
     * Default: false
     * @type {boolean}
     */
    #ezTimeOffViewReady = false;
    /**
     * @public @property @getter
     * Gets if the EzTimeOffViewController is ready to use or not.
     * @returns {boolean}
     */
    get ezTimeOffViewReady() {
        return this.#ezTimeOffViewReady;
    }
    /**
     * @public @property @setter
     * Sets if the EzTimeOffViewController is ready to use or not.
     * Setting this property will not call the EzTimeOffViewControllerReadyState.ezProcessReadyChecksCallback
     * Default: false
     * @param {boolean} ezTimeOffViewReady
     */
    set ezTimeOffViewReady(ezTimeOffViewReady = false) {
        this.#ezTimeOffViewReady = EzBoolean.booleanOrFalse(ezTimeOffViewReady);
    }

    /**
     * @public @readonly @property
     * Gets the EzTimeOffViewMode based upon the current ready state flags.
     * Returns EzTimeOffViewMode.EMPLOYER_MODE when the following is true:
     *  EzTimeOffViewControllerReadyState.ezTimeOffViewReady = true AND EzTimeOffViewControllerReadyState.isEmployerReady = true
     * Returns EzTimeOffViewMode.EMPLOYEE_MODE
     *  EzTimeOffViewControllerReadyState.ezTimeOffViewReady = true AND EzTimeOffViewControllerReadyState.isEmployeeReady = true
     * Otherwise, returns EzTimeOffViewMode.UNKNOWN
     * @returns {String}
     * A valid enumeration property value from EzTimeOffViewMode
     */
    get ezTimeOffViewMode() {
        if (this.ezTimeOffViewControllerReady) {
            if (this.isEmployerReady) {
                return EzTimeOffViewMode.EMPLOYER_MODE;
            }

            if (this.isEmployeeReady) {
                return EzTimeOffViewMode.EMPLOYEE_MODE;
            }
        }

        return EzTimeOffViewMode.UNKNOWN;
    }

    /**
     * @public @readonly @property
     * Determines if the EzTimeOffViewMode is EMPLOYER_MODE or EMPLOYEE_MODE (returning true). Otherwise, returns false.
     */
    get isReady() {
        switch (this.ezTimeOffViewMode) {
            case EzTimeOffViewMode.EMPLOYER_MODE:
            case EzTimeOffViewMode.EMPLOYEE_MODE:
                return true;
            default:
                return false;
        }
    }

    /**
     * @public @readonly @proeprty
     * Determines if all the external dependencies needed for employer time off view features are ready to use.
     * @returns {boolean}
     */
    get isEmployerReady() {
        return EzBoolean.requireAll(
            this.activeEmployerReady,
            this.userContextReady,
            this.ezLicenseHelperReady);
    }

    /**
     * @public @readonly @proeprty
     * Determines if all the external dependencies needed for employee time off view features are ready to use.
     * @returns {boolean}
     */
    get isEmployeeReady() {
        return EzBoolean.requireAll(
            this.activeEmployerReady,
            this.activeEmployeeReady,
            this.userContextReady);
    }

    /**
     * @protected @method
     * Calls the EzTimeOffViewControllerReadyState.ezProcessReadyChecksCallback if available.
     * @returns {undefined|Promise.resolve}
     * If autoHandleResolve, then nothing is returned. Otherwise, Promise.resolve is returned with
     * resolve containing the boolean result from the process ready checks callback.
     */
    #ezCallProcessReadyChecksCallback(autoHandleResolve = true) {
        if (EzBoolean.booleanOrTrue(autoHandleResolve) && EzFunction.isFunction(this.ezProcessReadyChecksCallback)) {
            return this.ezProcessReadyChecksCallback(this)
                .then(EzPromise.ignoreResolve);
        }

        return EzFunction.isFunction(this.ezProcessReadyChecksCallback)
            ? this.ezProcessReadyChecksCallback(this)
            : Promise.resolve(false);
    }
}

/**
 * @class
 * @extends {EzClass}
 * @description
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *  import { EzTimeOffViewController } from '/secure/time-off/EzTimeOffViewController.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Check ready state with (returns true when ready):
 *      globalThis.ezApi?.ezclocker?.[EzTimeOffViewController.ezApiName]?.ready
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Listen for onReady event with:
 *      document.addEventListener(
 *          EzTimeOffViewController.ezEventNames.onReady,
 *          {listening_class}.#ezRegistrator);
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzTimeOffViewController extends EzClass {
    /**
     * @public @readonly @property
     * Gets if the logged in user is a Employer, Payroll Manager logged in as a employer, or Manager logged in as a Employer.
     * @returns {boolean}
     */
    get isEmployer() {
        return ezApi.ezclocker.ezClockerContext.ezGetUserContext().isEmployerOrActingAsEmployer;
    }

    /**
     * @public @readonly @property
     * Gets if the logged in user is a employer's employee (not personal)
     * @returns {boolean}
     */
    get isPureEmployee() {
        return ezApi.ezclocker.ezClockerContext.ezGetUserContext().isPureEmployee;
    }

    /**
     * @private @field
     * Stores the scheduled date moment instance
     * @type {moment}
     */
    #scheduleDate = ezApi.ezclocker.ezDateTime.ezNow();
    /**
     * @public @property @getter
     * Gets the scheduled date moment instance
     * @returns {moment}
     */
    get scheduleDate() {
        return this.#scheduleDate;
    }
    /**
     * @public @property @getter
     * Sets the scheduled date moment instance
     * @param {moment} scheduleDate
     */
    set scheduleDate(scheduleDate) {
        this.#scheduleDate = EzObject.isValid(scheduleDate)
            ? scheduleDate
            : ezApi.ezclocker.ezDateTime.ezNow();
    }

    /**
     * @public @field
     * Stores an array of time off requests
     * @returns {array}
     */
    viewTimeOffRequestsResponse = [];

    /**
     * @public @field
     * Stores an array of time off reques by request status
     * @returns {array}
     */
    timeOffsByRequestStatus = [];

    /**
     * @public @field
     * Stores an array of time off totals by employee
     * @returns {array}
     */
    totalsByEmployee = [];

    /**
     * @public @field
     * Stores if handling the date select
     * @returns {boolean}
     */
    ezHandlingDateSelect = false;

    /**
     * @public @field
     * Stores if handling the status select
     * @returns {boolean}
     */
    ezHandlingStatusSelect = false;

    /**
     * @public @field
     * Stores an object of key/value for commonly used html element ids for this view.
     * @returns {object}
     */
    ezUxIds = {
        ezEmployerLogoImageId: '_EmployerLogoImage',
        ezEmployerNameCellId: '_EmployerNameCell',
        buttons: {
            ezNavDashboardBtnId: '_NavDashboard',
            ezNavSchedulesBtnId: '_NavSchedules',
            ezNavArchiveBtnId: '_NavEmployeeArchive',
            ezNavAccountBtnId: '_NavAccount',
            ezNavSignOut: '_NaviSignout',
            ezApplyFilter: 'timeOffApplyFilterButton',
            ezRequestTimeOff: 'timeOffAddTimeOffButton'
        },
        selects: {
            ezSelectEmployeePickerId: 'requestTimeoffEmployeeOption',
            ezSelectYearPickerId: 'requestTimeoffYearOption',
            ezSelectStatusPickerId: 'requestTimeoffStatusOption'
        },
        tabs: {
            ezTimeOffRequestTabId: 'EzTimeOffViewController_TimeOffRequests',
            ezTimeOffSummaryTabId: 'EzTimeOffViewController_Summary',
        }
    };

    /**
     * @private @field
     * Stores the object of ready check flags
     * @returns {object}
     */
    #ezReadyChecks = new EzTimeOffViewControllerReadyState(this.ezProcessReadyChecks);
    /**
     * @public @property @getter
     * Gets the object of ready check flags
     * @returns {object}
     */
    get ezReadyChecks() {
        return this.#ezReadyChecks;
    }
    /**
     * @public @property @setter
     * Sets the object of ready check flags
     * @param {object} ezReadyChecks
     */
    set ezReadyChecks(ezTimeOffViewControllerReadyState) {
        if (EzObject.isValid(ezTimeOffViewControllerReadyState) &&
            EzObject.isInstanceOfClassName(ezTimeOffViewControllerReadyState, EzTimeOffViewControllerReadyState.constructor.name)) {
            this.#ezReadyChecks = ezTimeOffViewControllerReadyState;
        }
    }

    /**
     * @public @method
     * Initializes EzTimeOffViewController
     * @returns {EzTimeOffViewController}
     */
    ezInit() {
        ezApi.ezclocker.ezUi.ezStartPageWait('Loading time off requests ...');

        EzTimeOffViewController.ezInstance.ezRegisterLicenseEvents();

        ezApi.ezclocker.ezEventEngine.ezWantEventEx({
            eventName: EzClockerContextEventName.onActiveEmployerReady,
            handlerName: EzTimeOffViewController.ezApiName,
            handlerFunction: () => EzTimeOffViewController.ezInstance.ezReadyChecks.activeEmployerReady = true
        });

        // User context ready event
        ezApi.ezclocker.ezEventEngine.ezWantEventEx({
            eventName: EzClockerContextEventName.onUserContextReady,
            handlerName: EzTimeOffViewController.ezApiName,
            handlerFunction: () => EzTimeOffViewController.ezInstance.ezReadyChecks.userContextReady = true
        });

        ezApi.ezclocker.ezEventEngine.ezWantEventEx({
            eventName: EzClockerContextEventName.onActiveEmployeeReady,
            handlerName: EzTimeOffViewController.ezApiName,
            handlerFunction: () => EzTimeOffViewController.ezInstance.ezReadyChecks.activeEmployeeReady = true
        });

        return EzTimeOffViewController.ezInstance;
    }

    /**
     * @public @method
     * Registers event handlers for the EzLicenseHelper events.
     */
    ezRegisterLicenseEvents() {
        ezApi.ezclocker.ezLicenseHelper.ezHookLicenseEvents(
            EzTimeOffViewController.ezApiName,
            // License valid handler (the EzLicenseHelper.ezInstance.ezDefaultLicenseValidHandler handler automaticlly called before this)
            () => EzTimeOffViewController.ezInstance.ezReadyChecks.ezLicenseHelperReady = true,
            // License expired handler
            (ezEvent) => {
                EzTimeOffViewController.ezInstance.ezReadyChecks.ezLicenseHelperReady = true;

                ezApi.ezclocker.ezLicenseHelper.ezDefaultLicenseExpiredHandler(ezEvent)
            },
            // License error handler
            (ezEvent) => {
                EzTimeOffViewController.ezInstance.ezReadyChecks.ezLicenseHelperReady = true;

                ezApi.ezclocker.ezLicenseHelper.ezDefaultLicenseErrorHandler(ezEvent)
            },
            // Free trial expired handler
            (ezEvent) => {
                EzTimeOffViewController.ezInstance.ezReadyChecks.ezLicenseHelperReady = true;

                ezApi.ezclocker.ezLicenseHelper.ezDefaultFreeTrialExpiredHandler(ezEvent)
            },
            // License violation
            (ezEvent) => {
                EzTimeOffViewController.ezInstance.ezReadyChecks.ezLicenseHelperReady = true;

                ezApi.ezclocker.ezLicenseHelper.ezDefaultLicenseViolationErrorHandler(ezEvent)
            });
    }

    /**
     * @public @method
     * Processes the ready check flags and initializes this view when ready
     * @returns {Promise.resolve}
     */
    ezProcessReadyChecks() {
        return EzPromise.asyncAction(
            (finished) => {
                let readyChecksReady = () => {
                    EzTimeOffViewController.ezInstance.ezReadyChecks.ezTimeOffViewControllerReady = true;

                    return EzTimeOffViewController.ezInstance.ezInitUx()
                        .then(
                            () => EzTimeOffViewController.ezInstance.ezInitData()
                                .then(
                                    () => {
                                        ezApi.ezclocker.ezUi.ezStopPageWait();

                                        return finished(true);
                                    }));
                };

                return ((!ezApi.ezclocker.ezClockerContext.ezGetUserContext().isPureEmployee &&
                    EzTimeOffViewController.ezInstance.ezReadyChecks.isEmployerReady) ||
                    (ezApi.ezclocker.ezClockerContext.ezGetUserContext().isPureEmployee &&
                        EzTimeOffViewController.ezInstance.ezReadyChecks.isEmployeeReady))
                    ? readyChecksReady()
                    : finished(false);
            });
    }

    /**
     * @public @method
     * Initializes this view's UX
     * @returns {Promise.resolve}
     */
    ezInitUx() {
        return EzPromise.asyncAction(
            (finished) => {
                ezApi.ezclocker.ezUi.ezShowContent(
                    EzTimeOffViewController.ezInstance.ezUxIds.ezEmployerNameCellId,
                    EzString.stringOrEmpty(
                        ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().employerName));

                ezApi.ezclocker.ezEmployerService.ezLoadEmployerImage(
                    ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id)
                    .then(
                        (imageUrl) => ezApi.ezclocker.ezUi.setImgElementSrc(
                            EzTimeOffViewController.ezInstance.ezUxIds.ezEmployerLogoImageId,
                            imageUrl));

                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    EzTimeOffViewController.ezInstance.ezUxIds.buttons.ezRequestTimeOff,
                    EzElementEventName.CLICK,
                    EzTimeOffViewController.ezApiName,
                    EzTimeOffViewController.ezInstance.ezShowRequestTimeOffModal);

                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    EzTimeOffViewController.ezInstance.ezUxIds.buttons.ezApplyFilter,
                    EzElementEventName.CLICK,
                    EzTimeOffViewController.ezApiName,
                    EzTimeOffViewController.ezInstance.ezApplyFilterAndFetchRequestTimeOffs);

                ezApi.ezclocker.ezUi.ezHookElementEvent(
                    EzTimeOffViewController.ezInstance.ezUxIds.tabs.ezTimeOffRequestTabId,
                    'click',
                    EzTimeOffViewController.ezInstance.setActiveTab);
                /* TODO: Migrate to below solution once handler is updated
                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    EzTimeOffViewController.ezInstance.ezUxIds.tabs.ezTimeOffRequestTabId,
                    EzElementEventName.CLICK,
                    EzTimeOffViewController.ezApiName,
                    EzTimeOffViewController.ezInstance.setActiveTab);
                */

                ezApi.ezclocker.ezUi.ezHookElementEvent(
                    EzTimeOffViewController.ezInstance.ezUxIds.tabs.ezTimeOffSummaryTabId,
                    'click',
                    EzTimeOffViewController.ezInstance.setActiveTab);
                /* TODO: Migrate to below solution once handler is updated
                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    EzTimeOffViewController.ezInstance.ezUxIds.tabs.ezTimeOffSummaryTabId,
                    EzElementEventName.CLICK,
                    EzTimeOffViewController.ezApiName,
                    EzTimeOffViewController.ezInstance.setActiveTab);
                */

                EzTimeOffViewController.ezInstance.setDefaultActiveTab();

                let employees = EzTimeOffViewController.ezInstance.ezGetAvailableEmployees();

                if (!ezApi.ezclocker.ezClockerContext.ezGetUserContext().isPureEmployee &&
                    !EzString.hasLength(
                        ezApi.ezclocker.ezUi.ezGetInputValue(EzTimeOffViewController.ezInstance.ezUxIds.selects.ezSelectEmployeePickerId))) {
                    // Employer Time Off View with Selected Employee
                    EzTimeOffViewController.ezInstance.renderTimeOffEmployee(
                        EzTimeOffViewController.ezInstance.ezUxIds.selects.ezSelectEmployeePickerId,
                        employees);

                    ezApi.ezclocker.ezUi.ezShowElement('EzTimeOffExportTimeOffButton');

                    ezApi.ezclocker.ezUi.ezEnableElement('EzTimeOffExportTimeOffButton');

                    ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                        'EzTimeOffExportTimeOffButton',
                        EzElementEventName.CLICK,
                        EzTimeOffViewController.ezApiName,
                        EzTimeOffViewController.ezInstance.ezHandleExportTimeOffButtonClick);

                    ezApi.ezclocker.ezUi.ezShowElement(
                        'EzTimeOffExportTimeOffButton',
                        'block');
                } else if (ezApi.ezclocker.ezClockerContext.ezGetUserContext().isPureEmployee) {
                    // Employee Time Off View
                    ezApi.ezclocker.ezUi.ezHideElement('EzTimeOffEmployeeFilterContainer');

                    ezApi.ezclocker.ezUi.ezDisableElement('EzTimeOffExportTimeOffButton');

                    ezApi.ezclocker.ezUi.ezHideElement('EzTimeOffExportTimeOffButton');
                }

                if (!EzString.hasLength(ezApi.ezclocker.ezUi.ezGetInputValue(EzTimeOffViewController.ezInstance.ezUxIds.selects.ezSelectYearPickerId))) {
                    // Selected year
                    EzTimeOffViewController.ezInstance.renderRequestYears(
                        EzTimeOffViewController.ezInstance.ezUxIds.selects.ezSelectYearPickerId,
                        EzBoolean.isTrue(EzTimeOffViewController.ezInstance.scheduleDate._isAMomentObject)
                            ? EzTimeOffViewController.ezInstance.scheduleDate.year()
                            : EzTimeOffViewController.ezInstance.scheduleDate.substring(0, 4));
                }

                if (!EzString.hasLength(ezApi.ezclocker.ezUi.ezGetInputValue(EzTimeOffViewController.ezInstance.ezUxIds.selects.ezSelectStatusPickerId))) {
                    // Selected Status
                    EzTimeOffViewController.ezInstance.renderTimeOffStatus(EzTimeOffViewController.ezInstance.ezUxIds.selects.ezSelectStatusPickerId);
                }

                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    '_NavSignout',
                    EzElementEventName.CLICK,
                    EzTimeOffViewController.ezApiName,
                    ezApi.ezclocker.ezNavigation.signOut);

                if (EzTimeOffViewController.ezInstance.isEmployer) {
                    // Employer Time Off View
                    ezApi.ezclocker.ezUi.ezShowElement('_NavAccount');

                    ezApi.ezclocker.ezUi.ezShowElement('_NavEmployeeArchive');

                    ezApi.ezclocker.ezUi.ezShowElement('EzShowHelpButton');

                    ezApi.ezclocker.ezAccountNavButton.ezActiveOptionValue = EzAccountNavButtonActiveOption.ACCOUNT_TIME_OFF_OPTION;

                    ezApi.ezclocker.ezAccountNavButton.ezInitUX();

                    ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                        '_NavSchedules',
                        EzElementEventName.CLICK,
                        EzTimeOffViewController.ezApiName,
                        ezApi.ezclocker.ezNavigation.ezNavigateToEmployerSchedules);

                    ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                        '_NavDashboard',
                        EzElementEventName.CLICK,
                        EzTimeOffViewController.ezApiName,
                        ezApi.ezclocker.ezNavigation.ezNavigateToEmployerDashboard);

                    ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                        '_NavAccount',
                        EzElementEventName.CLICK,
                        EzTimeOffViewController.ezApiName,
                        ezApi.ezclocker.ezNavigation.ezNavigateToEmployerAccountPage);

                    ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                        '_NavEmployeeArchive',
                        EzElementEventName.CLICK,
                        EzTimeOffViewController.ezApiName,
                        ezApi.ezclocker.ezNavigation.ezNavigateToEmployeeArchive);
                }

                if (EzTimeOffViewController.ezInstance.isPureEmployee) {
                    // Employee Time Off View
                    ezApi.ezclocker.ezUi.ezSetContent(
                        'timeOffAddTimeOffButton',
                        'Request Time Off');

                    ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                        '_NavSchedules',
                        EzElementEventName.CLICK,
                        EzTimeOffViewController.ezApiName,
                        ezApi.ezclocker.ezNavigation.ezNavigateToEmployeeSchedules);

                    ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                        '_NavDashboard',
                        EzElementEventName.CLICK,
                        EzTimeOffViewController.ezApiName,
                        ezApi.ezclocker.ezNavigation.ezNavigateToEmployeeDashboard);
                }

                EzTimeOffViewController.ezInstance.renderRequestYears();

                EzTimeOffViewController.ezInstance.renderTimeOffStatus();

                return finished();
            });
    }

    /**
     * @public
     * Initializes the time off page data
     * @param {undefined|null|number} year
     * Default:
     *  EzNumber.numberOrNull(ezApi.ezclocker.ezUi.ezGetInputValue(ezApi.ezclocker[EzTimeOffViewController.ezApiName].ezUxIds.selects.ezSelectYearPickerId))
     * @param {undefined|null|string} timeOffStatus
     * Default:
     *  ezApi.ezclocker.ezUi.ezGetInputValue(EzTimeOffViewController.ezInstance.ezUxIds.selects.ezSelectStatusPickerId)
     * @param {undefined|null|number} employeeId
     * Default:
     *  EzNumber.numberOrNull(ezApi.ezclocker.ezUi.ezGetInputValue(EzTimeOffViewController.ezInstance.ezUxIds.selects.ezSelectEmployeePickerId))
     * @returns {Promise.resolve}
     */
    ezInitData(year = null, timeOffStatus = null, employeeId = null) {
        return EzPromise.asyncAction(
            (finished) => {
                if (!EzObject.isValid(year)) {
                    year = ezApi.ezclocker.ezUi.ezGetInputValue(
                        ezApi.ezclocker[EzTimeOffViewController.ezApiName].ezUxIds.selects.ezSelectYearPickerId);
                }
                if (!EzObject.isValid(timeOffStatus)) {
                    timeOffStatus = ezApi.ezclocker.ezUi.ezGetInputValue(
                        EzTimeOffViewController.ezInstance.ezUxIds.selects.ezSelectStatusPickerId)
                }
                if (!EzObject.isValid(employeeId)) {
                    employeeId = ezApi.ezclocker.ezUi.ezGetInputValue(
                        EzTimeOffViewController.ezInstance.ezUxIds.selects.ezSelectEmployeePickerId)
                }

                const firstDayOfYearMoment = ezApi.ezclocker.ezDateTime.ezFromIso(`${year}-01-01T00:00:00`);

                const lastDayOfYearMoment = ezApi.ezclocker.ezDateTime.ezFromIso(`${year}-12-31T23:59:59`);

                const firstDayOfYearMomentUTC = ezApi.ezclocker.ezDateTime.ezToUTCIsoDateTime(
                    ezApi.ezclocker.ezDateTime.ezFromIso(`${year}-01-01T00:00:00`));

                const lastDayOfYearMomentUTC = ezApi.ezclocker.ezDateTime.ezToUTCIsoDateTime(
                    ezApi.ezclocker.ezDateTime.ezFromIso(`${year}-12-31T23:59:59`));

                let url;

                if (ezApi.ezclocker.ezClockerContext.ezGetUserContext().isPureEmployee) {
                    url = EzUrl.build`
                        ${ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl('timeoff', 'v1')}
                        /employee/${ezApi.ezclocker.ezClockerContext.activeEmployee.id}
                        ?startDate=${firstDayOfYearMomentUTC}
                        &toDate=${lastDayOfYearMomentUTC}
                        &target-time-zone-id=${ezApi.ezclocker.ezDateTime.activeTimeZone}
                        &status=${timeOffStatus}`
                } else {
                    url = ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                        'ALL' !== employeeId
                            ? EzUrl.build`
                                timeoff
                                /employee/${employeeId}
                                ?startDate=${firstDayOfYearMomentUTC}
                                &toDate=${lastDayOfYearMomentUTC}
                                &target-time-zone-id=${ezApi.ezclocker.ezDateTime.activeTimeZone}
                                &status=${timeOffStatus}`
                            : EzUrl.build`
                                timeoff
                                ?startDate=${firstDayOfYearMomentUTC}
                                &endDate=${lastDayOfYearMomentUTC}
                                &target-time-zone-id=${ezApi.ezclocker.ezDateTime.activeTimeZone}
                                &status=${timeOffStatus}
                                &employee=${employeeId}`,
                        'v1');
                }

                const urlForTimeOffBank = EzBoolean.isTrue(ezApi.ezclocker.ezClockerContext.ezGetUserContext().isPureEmployee) ?
                    EzUrl.build`timeoff-bank/employee/${ezApi.ezclocker.ezClockerContext.activeEmployee.id}` :
                    EzUrl.build`timeoff-bank/employer/${ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id}/all-employees`;

                return ezApi.ezclocker.ezUi.ezPageWaitExecute(
                    'Fetching time off requests ...',
                    (waitDone) => Promise.all([
                        ezApi.ezclocker.ezHttpHelper.ezGet(url),
                        ezApi.ezclocker.ezHttpHelper.ezGet(
                            ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(urlForTimeOffBank), 'v1'
                        )])
                        .then(
                            (response) => {
                                const filteredOutResponse = {
                                    entities: (response[0].entity || response[0].entities)
                                        .filter(
                                            record => moment(record.requestStartDateIso).isBetween(firstDayOfYearMoment, lastDayOfYearMoment) ||
                                                moment(record.requestEndDateIso).isBetween(firstDayOfYearMoment, lastDayOfYearMoment))
                                };

                                EzTimeOffViewController.ezInstance.totalTimeOffBankData = response?.[1]?.entity || {};

                                EzTimeOffViewController.ezInstance.ezMapResponseToView(filteredOutResponse);

                                EzTimeOffViewController.ezInstance.viewTimeOffRequestsResponse = filteredOutResponse;

                                ezApi.ezclocker.ezViewTimeOffRenderer.renderViewTimeOffModal(
                                    EzTimeOffViewController.ezInstance.timeOffsByRequestStatus,
                                    EzTimeOffViewController.ezInstance.totalsByEmployee,
                                    year,
                                    EzBoolean.isFalse(ezApi.ezclocker.ezClockerContext.ezGetUserContext().isPureEmployee)
                                        ? EzWidgetAccountMode.EMPLOYER
                                        : EzWidgetAccountMode.EMPLOYEE);

                                if (0 === EzTimeOffViewController.ezInstance.timeOffsByRequestStatus.length) {
                                    let em = `No time off requests available for ${year}`;

                                    ezApi.ezclocker.ezUi.ezContent(
                                        'EzRequestTimeOffSummaryHeader',
                                        em);

                                    ezApi.ezclocker.ezUi.ezContent(
                                        'noTimeOffDetailRequests',
                                        em);
                                }

                                if (0 === EzTimeOffViewController.ezInstance.timeOffsByRequestStatus.filter(
                                    (aTimeOffRequest) => (EzTimeOffStatus.APPROVED === aTimeOffRequest.requestStatus ||
                                        EzTimeOffStatus.PENDING === aTimeOffRequest.requestStatus ||
                                        EzTimeOffStatus.DENIED === aTimeOffRequest.requestStatus)).length) {
                                    let em = `No time off requests available for ${year}`;

                                    ezApi.ezclocker.ezUi.ezContent(
                                        'EzRequestTimeOffSummaryHeader',
                                        em);

                                    ezApi.ezclocker.ezUi.ezContent(
                                        'noTimeOffDetailRequests',
                                        em);
                                }

                                return waitDone().then(finished);
                            },
                            (eResponse) => waitDone()
                                .then(
                                    () => ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(
                                        'Error Obtaining Time Off Data',
                                        eResponse.message,
                                        eResponse,
                                        `URL: ${url}`)
                                        .then(finished))));
            });
    }

    /**
     * @public @method
     * Renders the available locations in the edit dialog
     * @param {undefined|null|string} selectPickerId
     * Default: EzTimeOffViewController.ezInstance.ezUxIds.selects.ezSelectYearPickerId
     */
    renderRequestYears(selectPickerId = EzTimeOffViewController.ezInstance.ezUxIds.selects.ezSelectYearPickerId) {
        let currentYear = EzTimeOffViewController.ezInstance.scheduleDate.year();

        let minYear = 2022;

        let diffYear = parseInt(currentYear) - minYear;

        let htmlForYearsSelect = EzString.EMPTY;

        Array(...Array(diffYear + 3))
            .forEach(
                (_, diff) => {
                    let valueForYearsSelect = parseInt(minYear + diff);

                    htmlForYearsSelect = EzHtml.build`
                        ${htmlForYearsSelect}
                        <option
                            value="${valueForYearsSelect}">
                            ${valueForYearsSelect}
                        </option>`;
                });

        ezApi.ezclocker.ezUi.ezSetContent(
            selectPickerId,
            htmlForYearsSelect);

        ezApi.ezclocker.ezUi.ezEnableElement(selectPickerId);

        ezApi.ezclocker.ezUi.ezSetInputValue(
            selectPickerId, currentYear);
    }

    /**
     @public @method
     Renders the available locations in the edit dialog
     @param {string} selectItemId
     */
    renderTimeOffEmployee(selectItemId, employees) {
        let htmlForEmployeeSelect = EzHtml.build`
            <option
                value="ALL"
                selected>
                ALL
            </option>`;

        employees.forEach(
            (employee) => {
                htmlForEmployeeSelect += EzHtml.build`
                    <option
                        value="${employee.id}">
                        ${employee.name}
                    </option>`;
            });

        ezApi.ezclocker.ezUi.ezSetContent(
            selectItemId,
            htmlForEmployeeSelect);

        ezApi.ezclocker.ezUi.ezEnableElement(selectItemId);

        ezApi.ezclocker.ezUi.ezEnableElement('EzTimeOffEmployeeFilterContainer');
    }

    /**
     * @public @method
     * Renders the available locations in the edit dialog
     * @param {string} selectItemId
     */
    renderTimeOffStatus() {
        let htmlForStatusSelect = EzString.EMPTY;

        EzTimeOffStatus.values.forEach(
            (ezTimeOffStatus) => {
                if (EzTimeOffStatus.ALL === ezTimeOffStatus) {
                    htmlForStatusSelect = EzHtml.build`
                        ${htmlForStatusSelect}
                        <option
                            value="${ezTimeOffStatus}"
                            selected>
                            ${EzTimeOffStatus.ezEnumData(ezTimeOffStatus).displayName}
                        </option>`;
                } else if (EzTimeOffStatus.UNKNOWN !== ezTimeOffStatus) {
                    htmlForStatusSelect = EzHtml.build`
                        ${htmlForStatusSelect}
                        <option
                            value="${ezTimeOffStatus}">
                            ${EzTimeOffStatus.ezEnumData(ezTimeOffStatus).displayName}
                        </option>`;
                }
            });

        ezApi.ezclocker.ezUi.ezSetContent(
            EzTimeOffViewController.ezInstance.ezUxIds.selects.ezSelectStatusPickerId,
            htmlForStatusSelect);

        ezApi.ezclocker.ezUi.ezEnableElement(
            EzTimeOffViewController.ezInstance.ezUxIds.selects.ezSelectStatusPickerId);
    }

    /**
     * @public @method
     */
    ezApplyFilterAndFetchRequestTimeOffs() {
        return ezApi.ezclocker.ezUi.ezPageWaitAsync(
            'Loading time offs ...',
            (waitDone) => EzTimeOffViewController.ezInstance.ezInitData()
                .then(
                    () => waitDone()
                        .then(EzPromise.ignoreFinished)));

    }

    /**
     * @public @method
     */
    ezShowRequestTimeOffModal() {
        ezApi.ezclocker.ezTimeOffRequestDialog.ezShow();
    }

    /**
     * @public @method
     */
    setDefaultActiveTab() {
        ezApi.ezclocker.ezUi.ezId('EzTimeOffViewController_TimeOffRequests')
            .attr('data-active', true);

        ezApi.ezclocker.ezUi.ezId('EzTimeOffViewController_Summary')
            .attr('data-active', false);

        ezApi.ezclocker.ezUi.ezRemoveElementClass(
            'EzTimeOffViewController_TimeOffRequests',
            'ezTabButton');

        ezApi.ezclocker.ezUi.ezAddElementClass(
            'EzTimeOffViewController_TimeOffRequests',
            'ezTabButtonActive');

        ezApi.ezclocker.ezUi.ezRemoveElementClass(
            'EzTimeOffViewController_Summary',
            'ezTabButtonActive');

        ezApi.ezclocker.ezUi.ezAddElementClass(
            'EzTimeOffViewController_Summary',
            'ezTabButton');

        ezApi.ezclocker.ezUi.ezRemoveElementClass(
            'EzTimeOffSelectedTimeOffRequestsView',
            'ezHiddenTabView');

        ezApi.ezclocker.ezUi.ezAddElementClass(
            'EzTimeOffSelectedTimeOffRequestsView',
            'ezActiveTabView');

        ezApi.ezclocker.ezUi.ezAddElementClass(
            'EzTimeOffViewController_TimeOffRequests',
            'ezActiveTabView');

        ezApi.ezclocker.ezUi.ezAddElementClass(
            'EzRequestTimeOffSummary',
            'ezHiddenTabView');

        ezApi.ezclocker.ezUi.ezRemoveElementClass(
            'EzRequestTimeOffSummary',
            'ezActiveTabView');

        ezApi.ezclocker.ezUi.ezRemoveElementClass(
            'EzTimeOffViewController_Summary',
            'ezActiveTabView');
    }

    /**
     * @public @method
     */
    setActiveTab() {
        /* TODO: Migrate to solution below once debugged
        const tabGroup = ezApi.ezclocker.ezUi.ezId$(this)
            .attr('data-tabgroup');

        ezApi.ezclocker.ezUi.ezId$(`button[data-tabgroup=${tabGroup}]`)
            .attr('data-active', false);

        ezApi.ezclocker.ezUi.ezId$(this)
            .attr('data-active', true);

        ezApi.ezclocker.ezUi.ezId$(`button[data-tabgroup=${tabGroup}][data-active=true]`)
            .addClass('ezActiveTab');

        ezApi.ezclocker.ezUi.ezId$(`button[data-tabgroup=${tabGroup}][data-active=false]`)
            .removeClass('ezActiveTab');

        let activateTabView = ezApi.ezclocker.ezUi.ezId$(this)
            .attr('data-tabviewid');

        ezApi.ezclocker.ezUi.ezId$(`div[data-tabgroup=${tabGroup}]`)
            .removeClass('ezActiveTabView');

        ezApi.ezclocker.ezUi.ezId$(`div[data-tabgroup=${tabGroup}]`)
            .addClass('ezHiddenTabView');

        ezApi.ezclocker.ezUi.ezId$(activateTabView).removeClass('ezHiddenTabView')
            .fadeIn(500);

        ezApi.ezclocker.ezUi.ezId$(activateTabView).addClass('ezActiveTabView');
        */

        const tabGroup = ezApi.ez$(this).attr('data-tabgroup');

        ezApi.ez$(`button[data-tabgroup=${tabGroup}]`).attr('data-active', false);

        ezApi.ez$(this).attr('data-active', true);
        ezApi.ez$(`button[data-tabgroup=${tabGroup}][data-active=true]`).addClass('ezActiveTab');
        ezApi.ez$(`button[data-tabgroup=${tabGroup}][data-active=false]`).removeClass('ezActiveTab');

        let activateTabView = ezApi.ez$(this).attr('data-tabviewid');

        ezApi.ez$(`div[data-tabgroup=${tabGroup}]`).removeClass('ezActiveTabView');
        ezApi.ez$(`div[data-tabgroup=${tabGroup}]`).addClass('ezHiddenTabView');
        ezApi.ezclocker.ezUi.ezId(activateTabView)
            .removeClass('ezHiddenTabView').fadeIn(500);

        ezApi.ezclocker.ezUi.ezId(activateTabView)
            .addClass('ezActiveTabView');
    }

    /**
     * @protected
     * Returns an array of the available employee accounts. For employee modes, the array contains just the
     * one active employee.
     * @returns {Array}
     */
    ezGetAvailableEmployees() {
        return ezApi.ezclocker.ezClockerContext.ezGetUserContext().isPureEmployee
            ? [ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee()]
            : EzArray.arrayOrEmpty(ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccounts());
    }

    /**
     * @protected @method
     * Maps the available time off requests to the UX
     * @param {Object} response
     */
    ezMapResponseToView(response) {
        if (!EzObject.isValid(response)) {
            throw new EzBadParamException(
                'response',
                EzTimeOffViewController.ezInstance,
                EzTimeOffViewController.ezInstance.ezMapResponseToView);
        }
        if (!EzArray.hasLength(response.entity || response.entities)) {
            EzTimeOffViewController.ezInstance.totalsByEmployee = [];

            EzTimeOffViewController.ezInstance.timeOffsByRequestStatus = [];

            // Nothing in response to map
            return;
        }

        let employees = EzTimeOffViewController.ezInstance.ezGetAvailableEmployees();

        EzTimeOffViewController.ezInstance.totalsByEmployee = (response.entity || response.entities)
            .filter(
                (timeOffRequest) => EzTimeOffStatus.APPROVED === timeOffRequest.requestStatus)
            .sort(
                (timeOffRequestA, timeOffRequestB) => timeOffRequestA.employeeId - timeOffRequestB.employeeId)
            .reduce(
                (acc, aTimeOffRequest) => {
                    let employeeObject = employees.filter((employee) => employee.id === aTimeOffRequest.employeeId)[0];

                    let employeeName = (employeeObject &&
                        (employeeObject.employee
                            ? employeeObject.employee.employeeName
                            : employeeObject.employeeName)) ||
                        EzString.EMPTY;

                    let existingEmployeeRecord = acc.filter((aAcc) => aAcc.employeeId === aTimeOffRequest.employeeId);

                    if (EzArray.arrayHasLength(existingEmployeeRecord)) {
                        let totalMatchingRecord = existingEmployeeRecord[0].totals.filter(
                            (aTimeOffRequestTotal) => aTimeOffRequestTotal.requestType === aTimeOffRequest.requestType);

                        // TODO: Refactor code use an optional chain instead (see below as possible solution)
                        /*
                        const totalBankHoursByRequestType = existingEmployeeRecord.length > 0 &&
                            EzArray.hasLength(EzTimeOffViewController.ezInstance?.totalTimeOffBankData?.[existingEmployeeRecord[0]?.employeeId])
                            ? EzTimeOffViewController.ezInstance.totalTimeOffBankData[existingEmployeeRecord[0].employeeId].find(
                                bankRecord => bankRecord.ezTimeOffBankType === aTimeOffRequest.requestType)
                                ?.bankDecimalHours
                            : undefined;
                        */
                        const totalBankHoursByRequestType = existingEmployeeRecord.length > 0
                            ? ((EzTimeOffViewController.ezInstance.totalTimeOffBankData[existingEmployeeRecord[0].employeeId] || [])
                                .find(bankRecord => bankRecord.ezTimeOffBankType === aTimeOffRequest.requestType) || {})
                                .bankDecimalHours
                            : undefined;

                        if (EzArray.arrayHasLength(totalMatchingRecord)) {
                            totalMatchingRecord[0].total = totalMatchingRecord[0].total + aTimeOffRequest.totalHours;

                            totalMatchingRecord[0].totalBankHours = totalBankHoursByRequestType;

                            totalMatchingRecord[0].timeOffBankBalance = totalBankHoursByRequestType
                                ? parseFloat(totalBankHoursByRequestType) - parseFloat(totalMatchingRecord[0].total)
                                : totalBankHoursByRequestType;

                            existingEmployeeRecord[0].totals.filter(
                                (aTimeOffRequestTotal) => aTimeOffRequestTotal.requestType === aTimeOffRequest.requestType)
                                .push(totalMatchingRecord);
                        } else {
                            existingEmployeeRecord[0].totals.push({
                                requestType: aTimeOffRequest.requestType,
                                total: aTimeOffRequest.totalHours,
                                totalBankHours: totalBankHoursByRequestType,
                                timeOffBankBalance: totalBankHoursByRequestType
                                    ? parseFloat(totalBankHoursByRequestType) - parseFloat(aTimeOffRequest.totalHours)
                                    : totalBankHoursByRequestType
                            });
                        }

                        acc.filter((a) => a.employeeId !== aTimeOffRequest.employeeId).push(existingEmployeeRecord);

                        return acc;
                    } else {
                        // TODO: Refactor code use an optional chain instead
                        const totalBankHoursMatchingRecord =
                            ((EzTimeOffViewController.ezInstance.totalTimeOffBankData[aTimeOffRequest.employeeId] || [])
                                .find(bankRecord => bankRecord.ezTimeOffBankType === aTimeOffRequest.requestType) || {});
                        acc.push({
                            id: aTimeOffRequest.id,
                            employeeId: aTimeOffRequest.employeeId,
                            employeeName: employeeName,
                            totals: [
                                {
                                    requestType: EzTimeOffType.PAID_PTO,
                                    total: aTimeOffRequest.requestType === EzTimeOffType.PAID_PTO
                                        ? aTimeOffRequest.totalHours
                                        : 0,
                                    totalBankHours: totalBankHoursMatchingRecord.ezTimeOffBankType === EzTimeOffType.PAID_PTO ? totalBankHoursMatchingRecord.bankDecimalHours : undefined,
                                    timeOffBankBalance: totalBankHoursMatchingRecord.ezTimeOffBankType === EzTimeOffType.PAID_PTO ?
                                        ((totalBankHoursMatchingRecord.bankDecimalHours && (parseFloat(totalBankHoursMatchingRecord.bankDecimalHours) - parseFloat(aTimeOffRequest.totalHours))) || undefined) : undefined

                                },
                                {
                                    requestType: EzTimeOffType.PAID_SICK,
                                    total: aTimeOffRequest.requestType === EzTimeOffType.PAID_SICK
                                        ? aTimeOffRequest.totalHours
                                        : 0,
                                    totalBankHours: totalBankHoursMatchingRecord.ezTimeOffBankType === EzTimeOffType.PAID_SICK ? totalBankHoursMatchingRecord.bankDecimalHours : undefined,
                                    timeOffBankBalance: totalBankHoursMatchingRecord.ezTimeOffBankType === EzTimeOffType.PAID_SICK ?
                                        ((totalBankHoursMatchingRecord.bankDecimalHours && (parseFloat(totalBankHoursMatchingRecord.bankDecimalHours) - parseFloat(aTimeOffRequest.totalHours))) || undefined) : undefined
                                },
                                {
                                    requestType: EzTimeOffType.PAID_HOLIDAY,
                                    total: aTimeOffRequest.requestType === EzTimeOffType.PAID_HOLIDAY
                                        ? aTimeOffRequest.totalHours
                                        : 0,
                                    totalBankHours: totalBankHoursMatchingRecord.ezTimeOffBankType === EzTimeOffType.PAID_HOLIDAY ? totalBankHoursMatchingRecord.bankDecimalHours : undefined,
                                    timeOffBankBalance: totalBankHoursMatchingRecord.ezTimeOffBankType === EzTimeOffType.PAID_HOLIDAY ?
                                        ((totalBankHoursMatchingRecord.bankDecimalHours && (parseFloat(totalBankHoursMatchingRecord.bankDecimalHours) - parseFloat(aTimeOffRequest.totalHours))) || undefined) : undefined
                                },
                                {
                                    requestType: EzTimeOffType.UNPAID_TIME_OFF,
                                    total: aTimeOffRequest.requestType === EzTimeOffType.UNPAID_TIME_OFF
                                        ? aTimeOffRequest.totalHours
                                        : 0,
                                    totalBankHours: totalBankHoursMatchingRecord.ezTimeOffBankType === EzTimeOffType.UNPAID_TIME_OFF ? totalBankHoursMatchingRecord.bankDecimalHours : undefined,
                                    timeOffBankBalance: totalBankHoursMatchingRecord.ezTimeOffBankType === EzTimeOffType.UNPAID_TIME_OFF ?
                                        ((totalBankHoursMatchingRecord.bankDecimalHours && (parseFloat(totalBankHoursMatchingRecord.bankDecimalHours) - parseFloat(aTimeOffRequest.totalHours))) || undefined) : undefined
                                }
                            ]
                        });
                    }

                    return acc;
                },
                []);

        EzTimeOffViewController.ezInstance.totalsByEmployee.forEach(
            (employee) => {
                let requestTypeArray = employee.totals.map(
                    (aTimeOffRequestTotal) => aTimeOffRequestTotal.requestType);

                EzTimeOffType.ezNames.filter(
                    ezTimeOffType => [
                        EzTimeOffType.UNPAID_TIME_OFF,
                        EzTimeOffType.PAID_PTO,
                        EzTimeOffType.PAID_SICK,
                        EzTimeOffType.PAID_HOLIDAY]
                        .includes(ezTimeOffType)
                        ? ezTimeOffType
                        : undefined)
                    .forEach(
                        (EzTimeOffType) => {
                            if (0 > requestTypeArray.indexOf(EzTimeOffType) && EzTimeOffType) {
                                return employee.totals.push({
                                    requestType: EzTimeOffType,
                                    total: 0,
                                    timeOffBankBalance: 0
                                });
                            }
                        });
            });

        let timeOffsByRequestStatus = [];

        (response.entity || response.entities)
            .sort(
                (timeOffRequestA, timeOffRequestB) => timeOffRequestA.requestStatus - timeOffRequestB.requestStatus)
            .forEach(
                (timeOffRequest) => {
                    let aEmployee = employees.filter(
                        (employee) => employee.id === timeOffRequest.employeeId)[0];

                    if (EzObject.isValid(aEmployee)) {
                        let requestStatusInTimeOffObject = timeOffsByRequestStatus.filter(
                            (aTimeOffRequest) => aTimeOffRequest.requestStatus === timeOffRequest.requestStatus);

                        let requestedByUserArray = employees.filter(
                            (employee) => employee.userId === timeOffRequest.requestedByUserId);

                        let requestedByUser = !ezApi.ezclocker.ezClockerContext.ezGetUserContext().isPureEmployee
                            ? aEmployee.employeeName
                            : (requestedByUserArray.length > 0 && requestedByUserArray[0].employeeName);

                        if (!requestedByUser) {
                            requestedByUser = ezApi.ezclocker.ezClockerContext.activeEmployer.employerName;
                        }

                        const preferredTimeZone = timeOffRequest.requestTimeZoneId !== timeOffRequest.targetTimeZoneId
                            ? timeOffRequest.requestTimeZoneId
                            : (timeOffRequest.targetTimeZoneId || ezApi.ezclocker.ezDateTime.activeTimeZone);

                        if (aEmployee) {
                            let redefinedTimeOffRequest = {
                                id: timeOffRequest.id,
                                employerId: ezApi.ezclocker.ezClockerContext.activeEmployer.id,
                                employeeId: timeOffRequest.employeeId,
                                requestedByUserId: ezApi.ezclocker.ezClockerContext.ezGetUserContext().userAccount.id,
                                employeeName: aEmployee.employeeName,
                                requestStatus: timeOffRequest.requestStatus,
                                requestType: timeOffRequest.requestType,
                                submittedDate: ezApi.ezclocker.ezDateTime.ezToDisplayDate(
                                    ezApi.ezclocker.ezDateTime.ezFromIso(timeOffRequest.submittedDateTimeIso)),
                                requestStartDate: ezApi.ezclocker.ezDateTime.ezFromIsoAndTimeZone(
                                    timeOffRequest.requestStartDateIso, preferredTimeZone)
                                    .format(ezApi.ezclocker.ezDateTime.ezPreferredDateFormat),
                                requestEndDate: ezApi.ezclocker.ezDateTime.ezFromIsoAndTimeZone(
                                    timeOffRequest.requestEndDateIso, preferredTimeZone)
                                    .format(ezApi.ezclocker.ezDateTime.ezPreferredDateFormat),
                                requestStartDateTime: ezApi.ezclocker.ezDateTime.ezFromIsoAndTimeZone(
                                    timeOffRequest.requestStartDateIso, preferredTimeZone)
                                    .format(ezApi.ezclocker.ezDateTime.ezPreferredDateTimeFormat),
                                requestEndDateTime: ezApi.ezclocker.ezDateTime.ezFromIsoAndTimeZone(
                                    timeOffRequest.requestEndDateIso, preferredTimeZone)
                                    .format(ezApi.ezclocker.ezDateTime.ezPreferredDateTimeFormat),
                                totalHours: timeOffRequest.totalHours,
                                notesString: timeOffRequest.notesString,
                                requestedUser: requestedByUser || EzString.EMPTY,
                                allDay: timeOffRequest.allDay,
                            };

                            if (EzArray.hasLength(requestStatusInTimeOffObject)) {
                                requestStatusInTimeOffObject[0].data.push(redefinedTimeOffRequest);

                                timeOffsByRequestStatus.filter(
                                    (aTimeOffRequest) => aTimeOffRequest.requestStatus !== redefinedTimeOffRequest.requestStatus)
                                    .push(requestStatusInTimeOffObject);
                            } else {
                                timeOffsByRequestStatus.push({
                                    requestStatus: redefinedTimeOffRequest.requestStatus,
                                    data: [redefinedTimeOffRequest]
                                });
                            }
                        }
                    }
                });

        EzTimeOffViewController.ezInstance.timeOffsByRequestStatus = timeOffsByRequestStatus;
    }

    /**
     * @public @method
     * @param {string} requestId
     * @param {string} newRequestStatus
     * @param {string} name
     */
    ezSubmit(requestId, newRequestStatus = EzString.EMPTY, name = EzString.EMPTY) {
        if (!EzString.hasLength(requestId)) {
            throw new EzBadParamException(
                'requestId',
                EzTimeOffViewController.ezInstance,
                EzTimeOffViewController.ezInstance.ezSubmit);
        }
        if (!EzString.hasLength(newRequestStatus)) {
            throw new EzBadParamException(
                'newRequestStatus',
                EzTimeOffViewController.ezInstance,
                EzTimeOffViewController.ezInstance.ezSubmit);
        }

        let requestRecord = (EzTimeOffViewController.ezInstance.viewTimeOffRequestsResponse.entity ||
            EzTimeOffViewController.ezInstance.viewTimeOffRequestsResponse.entities)
            .filter(
                (timeOffRequest) => requestId === timeOffRequest.id.toString())[0];

        let requestEndDate = ezApi.ezclocker.ezDateTime.ezFromIso(requestRecord.requestEndDateIso);

        if ((EzTimeOffStatus.DENIED === newRequestStatus || EzTimeOffStatus.CANCELED === newRequestStatus) &&
            !ezApi.ezclocker.ezClockerContext.ezGetUserContext().isPureEmployee &&
            EzTimeOffStatus.APPROVED === requestRecord.requestStatus &&
            requestEndDate.isBefore(ezApi.ezclocker.ezDateTime.ezNow())) {
            ezApi.ezclocker.ezDialog.ezShowMessage(
                'Time off in past',
                'You cannot deny an approved time off in the past!',
                null);

            return;
        }

        return ezApi.ezclocker.ezUi.ezStartPageWaitExecute(
            'Updating time off record ...',
            (waitDone) => {
                requestRecord.requestStatus = newRequestStatus.toUpperCase();

                let url = ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                    EzUrl.build`
                        timeoff
                        /${requestRecord.id}
                        ?target-time-zone-id=${ezApi.ezclocker.ezDateTime.activeTimeZone}`,
                    'v1');

                let payloadJson = EzJson.toJson(requestRecord);

                ezApi.ezclocker.ezHttpHelper.ezPut(url, payloadJson)
                    .then(
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                    .then(
                        () => waitDone()
                            .then(
                                () => {
                                    let entity = (EzTimeOffViewController.ezInstance.viewTimeOffRequestsResponse.entity ||
                                        EzTimeOffViewController.ezInstance.viewTimeOffRequestsResponse.entities)
                                        .map(
                                            (t) => {
                                                if (t.id.toString() === requestRecord.id.toString()) {
                                                    t.requestStatus = requestRecord.requestStatus.toUpperCase();
                                                }

                                                return t;
                                            });

                                    EzTimeOffViewController.ezInstance.viewTimeOffRequestsResponse.entity = entity;

                                    EzTimeOffViewController.ezInstance.ezMapResponseToView(EzTimeOffViewController.ezInstance.viewTimeOffRequestsResponse);

                                    ezApi.ezclocker.ezDialog.ezShowOK(
                                        'Request Time off Updated',
                                        `${name} time-off request is ${newRequestStatus.toLowerCase()}`)
                                        .then(
                                            () => ezApi.ezclocker.ezViewTimeOffRenderer.renderViewTimeOffModal(
                                                EzTimeOffViewController.ezInstance.timeOffsByRequestStatus,
                                                EzTimeOffViewController.ezInstance.totalsByEmployee,
                                                EzTimeOffViewController.ezInstance.scheduleDate._isAMomentObject
                                                    ? EzTimeOffViewController.ezInstance.scheduleDate.year()
                                                    : EzTimeOffViewController.ezInstance.scheduleDate.substring(0, 4),
                                                !ezApi.ezclocker.ezClockerContext.ezGetUserContext().isPureEmployee
                                                    ? EzWidgetAccountMode.EMPLOYER
                                                    : EzWidgetAccountMode.EMPLOYEE)
                                        );
                                }),
                        (eResponse, jqXHR) => {
                            ezApi.ezclocker.ezLogger.error(`Unable to update timeoff request. Error: ${EzJson.toJson(eResponse)}`);

                            return waitDone()
                                .then(
                                    () => ezApi.ezclocker.ezDialog.ezShowPossibleDefectError(
                                        'Error Updating Time Off Request',
                                        eResponse.message,
                                        jqXHR,
                                        eResponse,
                                        `URL: ${url}, Payload: ${payloadJson}`));
                        });
            });
    }

    /**
     * @public @method
     * @param {string} requestId
     * @param {string} oldRequestStatus
     */
    ezOpenActionModal(requestId, oldRequestStatus) {
        let timeOffRequestsWithStatusArray = EzTimeOffViewController.ezInstance.timeOffsByRequestStatus
            .filter(
                (r) => r.requestStatus === oldRequestStatus.toUpperCase())[0];

        let backendRequestResponseRecord = (EzTimeOffViewController.ezInstance.viewTimeOffRequestsResponse.entity ||
            EzTimeOffViewController.ezInstance.viewTimeOffRequestsResponse.entities)
            .filter(
                (r) => r.id.toString() === requestId)[0];

        let requestRecord = timeOffRequestsWithStatusArray.data
            .filter(
                (r) => r.id.toString() === requestId)[0];

        ezApi.ezclocker.ezViewTimeOffRequestDialog.ezShow(
            requestRecord,
            !ezApi.ezclocker.ezClockerContext.ezGetUserContext().isPureEmployee,
            'EzTimeOffViewRequest',
            backendRequestResponseRecord);
    }

    /**
     * @protected @method
     * Handles the export time off button click
     */
    ezHandleExportTimeOffButtonClick() {
        const activeEmployeeId = ezApi.ezclocker.ezUi.ezGetInputValue(EzTimeOffViewController.ezInstance.ezUxIds.selects.ezSelectEmployeePickerId);

        ezApi.ezclocker.ezwEmployerExportTimeOffDialog.ezShow(
            EzExportDialogMode.EMPLOYER,
            (activeEmployeeId && activeEmployeeId !== 'ALL' &&
                ezApi.ezclocker.ezUi.ezGetInputValue(EzTimeOffViewController.ezInstance.ezUxIds.selects.ezSelectEmployeePickerId)) || undefined,
            ezApi.ezclocker.ezUi.ezGetInputValue(EzTimeOffViewController.ezInstance.ezUxIds.selects.ezSelectYearPickerId));
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
        return 'ezTimeOffViewController';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'EzTimeOffViewController_onReady',
            onSelectedYearChanged: 'EzTimeOffViewController_onSelectedYearChanged',
            onSelectedStatusChanged: 'EzTimeOffViewController_onSelectedStatusChanged'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzTimeOffViewController}
     */
    static #ezInstance = globalThis.ezApi?.ready && globalThis.ezApi.ezclocker?.[EzTimeOffViewController.ezApiName]
        ? globalThis.ezApi.ezclocker[EzTimeOffViewController.ezApiName]
        : null;
    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzTimeOffViewController}
     */
    static get ezInstance() {
        return EzTimeOffViewController.#ezInstance;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzTimeOffViewController} instance
     */
    static set ezInstance(instance) {
        if (null != EzTimeOffViewController.#ezInstance) {
            throw new Error('EzTimeOffViewController\'s singleton instance is already reigstered with EzApi.');
        }

        EzTimeOffViewController.#ezInstance = instance;
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
    static #ezApiRegistrationState = globalThis.ezApi?.ready && globalThis.ezApi.ezclocker?.[EzTimeOffViewController.ezApiName]
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
        return EzTimeOffViewController.#ezApiRegistrationState;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzTimeOffViewController.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzTimeOffViewController.ezApiRegistrationState &&
            globalThis?.ezApi?.ready &&
            globalThis.ezApi?.ezclocker?.[EzDateTime.ezApiName]?.ready &&
            globalThis.ezApi?.ezclocker?.[EzEventEngine.ezApiName]?.ready &&
            globalThis.ezApi?.ezclocker?.[EzHttpHelper.ezApiName]?.ready &&
            globalThis.ezApi?.ezclocker?.[EzLicenseHelper.ezApiName]?.ready &&
            globalThis.ezApi?.ezclocker?.[EzClockerContext.ezApiName]?.ready &&
            globalThis.ezApi?.ezclocker?.[EzClockerContextEventName.ezApiName]?.ready &&
            globalThis.ezApi?.ezclocker?.[EzUI.ezApiName]?.ready &&
            globalThis.ezApi?.ezclocker?.[EzHelp.ezApiName]?.ready &&
            globalThis.ezApi?.ezclocker?.[EzAccountNavButton.ezApiName]?.ready &&
            globalThis.ezApi?.ezclocker?.[EzViewTimeOffRenderer.ezApiName]?.ready &&
            globalThis.ezApi?.ezclocker?.[EzEmployerService.ezApiName]?.ready &&
            globalThis.ezApi?.ezclocker?.[EzwEmployerExportTimeOffDialog.ezApiName]?.ready &&
            globalThis.ezApi?.ezclocker?.[EzTimeOffRequestDialog.ezApiName]?.ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzTimeOffViewController.ezInstance &&
            EzRegistrationState.REGISTERED === EzTimeOffViewController.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzTimeOffViewController.#ezCanRegister && !EzTimeOffViewController.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzTimeOffViewController, EzTimeOffViewController.ezApiName);

            EzTimeOffViewController.ezApiRegistrationState = EzRegistrationState.REGISTERED;
        }

        return EzTimeOffViewController.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzTimeOffViewController.ezApiName
     *     2) Property getter EzTimeOffViewController.ezEventNames
     *     3) Property getter EzTimeOffViewController.ezInstance
     *     4) Property setter EzTimeOffViewController.ezInstance
     *     5) Property getter EzTimeOffViewController.ezApiRegistrationState
     *     6) Property setter EzTimeOffViewController.ezApiRegistrationState
     *     7) Property getter EzTimeOffViewController.#ezCanRegister
     *     8) Property getter EzTimeOffViewController.#ezIsRegistered
     *     9) Method EzTimeOffViewController.#ezRegistrator()
     */
    static {
        if (!EzTimeOffViewController.#ezIsRegistered) {
            EzTimeOffViewController.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzTimeOffViewController.#ezRegistrator()) {
                document.addEventListener(
                    EzTimeOffViewController.ezOnEzApiReadyEventName,
                    EzTimeOffViewController.#ezRegistrator);

                document.addEventListener(
                    EzDateTime.ezEventNames.onReady,
                    EzTimeOffViewController.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzTimeOffViewController.#ezRegistrator);

                document.addEventListener(
                    EzHttpHelper.ezEventNames.onReady,
                    EzTimeOffViewController.#ezRegistrator);

                document.addEventListener(
                    EzLicenseHelper.ezEventNames.onReady,
                    EzTimeOffViewController.#ezRegistrator);

                document.addEventListener(
                    EzClockerContext.ezEventNames.onReady,
                    EzTimeOffViewController.#ezRegistrator);

                document.addEventListener(
                    EzClockerContextEventName.ezEventNames.onReady,
                    EzTimeOffViewController.#ezRegistrator);

                document.addEventListener(
                    EzEmployerService.ezEventNames.onReady,
                    EzTimeOffViewController.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzTimeOffViewController.#ezRegistrator);

                document.addEventListener(
                    EzHelp.ezEventNames.onReady,
                    EzTimeOffViewController.#ezRegistrator);

                document.addEventListener(
                    EzAccountNavButton.ezEventNames.onReady,
                    EzTimeOffViewController.#ezRegistrator);

                document.addEventListener(
                    EzViewTimeOffRenderer.ezEventNames.onReady,
                    EzTimeOffViewController.#ezRegistrator);

                document.addEventListener(
                    EzTimeOffRequestDialog.ezEventNames.onReady,
                    EzTimeOffViewController.#ezRegistrator);

                document.addEventListener(
                    EzViewTimeOffRequestDialog.ezEventNames.onReady,
                    EzTimeOffViewController.#ezRegistrator);

                document.addEventListener(
                    EzwEmployerExportTimeOffDialog.ezEventNames.onReady,
                    EzTimeOffViewController.#ezRegistrator);
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

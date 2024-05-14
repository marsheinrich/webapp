import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzArray,
    EzUrl,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzClockerContextEventName,
    EzElementEventName,
    EzFeaturePackageId
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';
import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

import { EzEmployerService } from '/secure/javascript/common/ezclocker-employer-services.js';
import { EzScheduleService } from '/secure/javascript/services/ezclocker-schedule-service.js';

import { EzUI } from '/public/javascript/common/ezui.js';

import { EzFeatureToggles } from '/ezlibrary/ez-feature-toggles2.js';

import { EzLicenseFeatureToggle } from '/ezlibrary/EzLicenseFeatureToggle.js';
import { EzFeaturePackageManager } from '/ezlibrary/EzFeaturePackageManager.js';

import { EzScheduleRenderer } from '/secure/schedule/schedule-renderer.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * Creates a new instance of EzEmployeeScheduleController
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzEmployeeScheduleController } from '/secure/schedule/employee-schedule-controller.js';
 * ---------------------------------------------------------------------------
 * Listen to onReady event:
 *     document.addEventListener(
 *         EzEmployeeScheduleController.ezEventNames.onReady,
 *         this.#ezRegistrator);
 * ---------------------------------------------------------------------------
 * Singleton instance ready for use when the below evaluates to true:
 *     globalThis.ezApi.ezclocker[EzEmployeeScheduleController.ezApiName] &&
 *     globalThis.ezApi.ezclocker[EzEmployeeScheduleController.ezApiName].ready
 * ---------------------------------------------------------------------------
 */
export class EzEmployeeScheduleController extends EzClass {
    /**
     * @static
     * @public @readonly @property
     * Returns the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezEmployeeScheduleController';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzEmployeeScheduleController_Ready',
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzEmployeeScheduleController}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzEmployeeScheduleController.ezApiName])
        ? globalThis.ezApi.ezclocker[EzEmployeeScheduleController.ezApiName]
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzEmployeeScheduleController}
     */
    static get ezInstance() {
        return EzEmployeeScheduleController.#ezInstance;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzEmployeeScheduleController} instance
     */
    static set ezInstance(instance) {
        if (null != EzEmployeeScheduleController.#ezInstance) {
            throw new Error('EzEmployeeScheduleController\'s singleton instance is already reigstered with EzApi.');
        }

        EzEmployeeScheduleController.#ezInstance = instance;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzEmployeeScheduleController.ezApiName])
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
        return EzEmployeeScheduleController.#ezApiRegistrationState;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzEmployeeScheduleController.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzEmployeeScheduleController.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzClockerContextEventName.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerContextEventName.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzEmployerService.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEmployerService.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzScheduleService.ezApiName] &&
            globalThis.ezApi.ezclocker[EzScheduleService.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzFeaturePackageManager.ezApiName] &&
            globalThis.ezApi.ezclocker[EzFeaturePackageManager.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzFeatureToggles.ezApiName] &&
            globalThis.ezApi.ezclocker[EzFeatureToggles.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzLicenseFeatureToggle.ezApiName] &&
            globalThis.ezApi.ezclocker[EzLicenseFeatureToggle.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzScheduleRenderer.ezApiName] &&
            globalThis.ezApi.ezclocker[EzScheduleRenderer.ezApiName].ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzEmployeeScheduleController.ezInstance &&
            EzRegistrationState.REGISTERED === EzEmployeeScheduleController.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzEmployeeScheduleController.#ezCanRegister && !EzEmployeeScheduleController.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzEmployeeScheduleController, EzEmployeeScheduleController.ezApiName);
        }

        return EzEmployeeScheduleController.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzEmployeeScheduleController.ezApiName
     *     2) Property getter EzEmployeeScheduleController.ezEventNames
     *     3) Property getter EzEmployeeScheduleController.ezInstance
     *     4) Property setter EzEmployeeScheduleController.ezInstance
     *     5) Property getter EzEmployeeScheduleController.ezApiRegistrationState
     *     6) Property setter EzEmployeeScheduleController.ezApiRegistrationState
     *     7) Property getter EzEmployeeScheduleController.#ezCanRegister
     *     8) Property getter EzEmployeeScheduleController.#ezIsRegistered
     *     9) Method EzEmployeeScheduleController.#ezRegistrator()
     */
    static {
        if (!EzEmployeeScheduleController.#ezIsRegistered) {
            EzEmployeeScheduleController.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzEmployeeScheduleController.#ezRegistrator()) {
                document.addEventListener(
                    EzEmployeeScheduleController.ezOnEzApiReadyEventName,
                    EzEmployeeScheduleController.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzEmployeeScheduleController.ezRegistrator);

                document.addEventListener(
                    EzHttpHelper.ezEventNames.onReady,
                    EzEmployeeScheduleController.ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.onReady,
                    EzEmployeeScheduleController.#ezRegistrator);

                document.addEventListener(
                    EzClockerContextEventName.ezEventNames.onReady,
                    EzEmployeeScheduleController.#ezRegistrator);

                document.addEventListener(
                    EzClockerContext.ezEventNames.onReady,
                    EzEmployeeScheduleController.ezRegistrator);

                document.addEventListener(
                    EzEmployerService.ezEventNames.onReady,
                    EzEmployeeScheduleController.ezRegistrator);

                document.addEventListener(
                    EzScheduleService.ezEventNames.onReady,
                    EzEmployeeScheduleController.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzEmployeeScheduleController.ezRegistrator);

                document.addEventListener(
                    EzFeaturePackageManager.ezEventNames.onReady,
                    EzEmployeeScheduleController.#ezRegistrator);

                document.addEventListener(
                    EzFeatureToggles.ezEventNames.onReady,
                    EzEmployeeScheduleController.ezRegistrator);

                document.addEventListener(
                    EzLicenseFeatureToggle.ezEventNames.onReady,
                    EzEmployeeScheduleController.ezRegistrator);

                document.addEventListener(
                    EzScheduleRenderer.ezEventNames.onReady,
                    EzEmployeeScheduleController.#ezRegistrator);
            }
        }
    }

    /**
     * @public @constructor
     * >> DO NOT CREATE NEW INSTANCES OUTSIDE OF THE STATIC INITIALIZATION FLOW <<
     * Use the static singleton instance available from ezApi: ezApi.ezclocker.ezEmployeeScheduleController.
     */
    constructor() {
        super();

        this.scheduleOptions = {
            selectedScheduleMoment: ezApi.ezclocker.ezDateTime.ezNow(),
            firstDayOfWeek: 0,
        };
    }

    /**
     * @public @readonly @property
     * Returns the feature-toggle name of this view
     * @returns {string}
     */
    get featureViewName() {
        return 'employeeSchedule';
    }

    /**
     * @private @field
     * Stores the schedule releated options
     * @type {array}
     */
    #scheduleOptions = {
        selectedScheduleMoment: null,
        firstDayOfWeek: 0,
    };
    /**
     * @public @property @getter
     * Gets the schedule releated options
     * @returns {object}
     */
    get scheduleOptions() {
        return this.#scheduleOptions;
    }
    /**
     * @public @property @setter
     * Sets the schedule releated options
     * @param {object} employee
     */
    set scheduleOptions(scheduleOptions) {
        this.#scheduleOptions = EzObject.assignOrDefault(
            scheduleOptions,
            {
                selectedScheduleMoment: ezApi.ezclocker.ezDateTime.ezNow(),
                firstDayOfWeek: 0,
            });
    }

    /**
     * @public @property @getter
     * Gets the active employer account entity
     * @returns {null|object}
     */
    get employer() {
        return EzObject.assignOrNull(ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer());
    }

    /**
     * @public @readonly @property
     * Gets the active employee account entity
     * @returns {null|object}
     */
    get employee() {
        return EzObject.assignOrNull(ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee());
    }

    /**
     * @private @field
     * Stores the array of schedules ordered by employee id
     * @type {array}
     */
    #schedulesByEmployeeId = [];
    /**
     * @public @property @getter
     * Gets the array of schedules ordered by employee id
     * @returns {array}
     */
    get schedulesByEmployeeId() {
        return this.#schedulesByEmployeeId;
    }
    /**
     * @public @property @setter
     * Sets the array of schedules ordered by employee id
     * @param {array} schedulesByEmployeeId
     */
    set schedulesByEmployeeId(schedulesByEmployeeId) {
        this.#schedulesByEmployeeId = EzArray.arrayOrEmpty(schedulesByEmployeeId);
    }

    /**
     * @private @field
     * Stores the array of schedules ordered by date
     * @type {array}
     */
    #schedulesByDate = [];
    /**
     * @public @property @getter
     * Gets the array of schedules ordered by date
     * @returns {array}
     */
    get schedulesByDate() {
        return this.#schedulesByDate;
    }
    /**
     * @public @property @setter
     * Gets the array of schedules ordered by date
     * @param {array} schedulesByDate
     */
    set schedulesByDate(schedulesByDate) {
        this.#schedulesByDate = EzArray.arrayOrEmpty(schedulesByDate);
    }

    /**
     * @private @field
     * Stores the array of time offs ordered by employee id
     * @type {array}
     */
    #timeOffsByEmployeeId = [];
    /**
     * @public @property @getter
     * Gets the array of time offs ordered by employee id
     * @returns {array}
     */
    get timeOffsByEmployeeId() {
        return this.#timeOffsByEmployeeId;
    }
    /**
     * @public @property @setter
     * Sets the array of time offs ordered by employee id
     * @param {array} timeOffsByEmployeeId
     */
    set timeOffsByEmployeeId(timeOffsByEmployeeId) {
        this.#timeOffsByEmployeeId = EzArray.arrayOrEmpty(timeOffsByEmployeeId);
    }

    /**
     * @private @field
     * Stores the array of time offs ordered by date
     * @type {array}
     */
    #timeOffsByDate = [];
    /**
     * @public @property @getter
     * Gets the array of time offs ordered by date
     * @returns {array}
     */
    get timeOffsByDate() {
        return this.#timeOffsByDate;
    }
    /**
     * @public @property @setter
     * Sets the array of time offs ordered by date
     * @param {array} timeOffsByDate
     */
    set timeOffsByDate(timeOffsByDate) {
        this.#timeOffsByDate = EzArray.arrayOrEmpty(timeOffsByDate);
    }

    /**
     * @private @field
     * Stores the array of time offs
     * @type {array}
     */
    #timeOffs = [];
    /**
     * @public @property @getter
     * Gets the array of time offs
     * @returns {array}
     */
    get timeOffs() {
        return this.#timeOffs;
    }
    /**
     * @public @property @setter
     * Sest the array of time offs
     * @param {array} timeOffs
     */
    set timeOffs(timeOffs) {
        this.#timeOffs = EzArray.arrayOrEmpty(timeOffs);
    }

    /**
     * @protected @method
     * Initializes the EzEmployeeScheduleController
     * @returns {EzEmployeeScheduleController}
     */
    ezInit() {
        ezApi.ezclocker.ezUi.ezPageWaitExecute(
            'Loading your schedule ...',
            (waitDone) => {
                ezApi.ezclocker.ezEventEngine.ezWantEvent(
                    EzClockerContextEventName.onActiveEmployeeReady,
                    EzEmployeeScheduleController.ezApiName,
                    () => {
                        EzEmployeeScheduleController.ezInstance.ezHandleEzEmployeeContextReadyEvent();
                        waitDone().then(EzPromise.ignoreResolve)
                    });

                ezApi.ezclocker.ezEventEngine.ezWantEvent(
                    EzClockerContextEventName.onActiveEmployerReady,
                    EzEmployeeScheduleController.ezApiName,
                    EzEmployeeScheduleController.ezInstance.ezHandleActiveEmployerReady);

                ezApi.ezclocker.ezEventEngine.ezWantEvent(
                    EzFeatureToggles.ezEventNames.onFeatureTogglesReady,
                    EzEmployeeScheduleController.ezApiName,
                    EzEmployeeScheduleController.ezInstance.ezHandleFeatureTogglesReady,
                    true);
            });

        return EzEmployeeScheduleController.ezInstance;
    }

    /**
     * @protected @method
     * Initializes EzEmployeeScheduleController UX
     * @returns {EzEmployeeScheduleController}
     */
    ezInitUX() {
        ezApi.ezclocker.ezEmployerService.ezLoadEmployerImage(
            ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().employerId)
            .then(
                (imageUrl) => ezApi.ezclocker.ezUi.setImgElementSrc(
                    '_EmployerLogoImage',
                    imageUrl));

        if (EzBoolean.isFalse(ezApi.ezclocker.ezFeaturePackageManager.ezStateFlags.featurePackagesLoaded)) {
            // Feature packages loaded event hook
            ezApi.ezclocker.ezEventEngine.ezWantEvent(
                EzFeaturePackageManager.ezEventNames.onFeaturePackagesLoaded,
                EzEmployeeScheduleController.ezApiName,
                EzEmployeeScheduleController.ezInstance.ezApplyFeaturePackageToggles,
                true);
        } else {
            EzEmployeeScheduleController.ezInstance.ezApplyFeaturePackageToggles();
        }

        ezApi.ezclocker.ezUi.ezHookElementEvent(
            '_NavDashboard',
            'click',
            () => ezApi.ezclocker.nav.navigateToSecurePage('employeeDashboard.html'));

        ezApi.ezclocker.ezUi.ezHookElementEvent(
            '_NaviSignout',
            'click',
            ezApi.ezclocker.nav.signOut);

        ezApi.ezclocker.ezDateTime.ezInitDatePicker(
            'scheduleWeek',
            {
                onSelect: ezApi.ezclocker.ezEmployeeScheduleController.ezHandleDateSelection,
                onClose: ezApi.ezclocker.ezEmployeeScheduleController.ezHandleDateSelection
            },
            null,
            EzEmployeeScheduleController.ezInstance.scheduleOptions.selectedScheduleMoment);

        ezApi.ezclocker.ezUi.ezContent(
            '_EmployerNameCell',
            EzString.stringOrEmpty(EzEmployeeScheduleController.ezInstance.employer.employerName));

        let eName = EzString.stringHasLength(EzEmployeeScheduleController.ezInstance.employee.employeeName)
            ? EzEmployeeScheduleController.ezInstance.employee.employeeName
            : EzEmployeeScheduleController.ezInstance.employee.employeeContactEmail;

        if (EzString.stringHasLength(eName)) {
            ezApi.ezclocker.ezUi.ezContent(
                '_ScheduleName',
                `${eName}'s Schedule for the Week`);
        }

        if (!EzObject.isValid(ezApi.ezclocker.ezFeatureToggles)) {
            ezApi.ezclocker.ezEventEngine.ezWantEvent(
                EzFeatureToggles.ezEventNames.onFeatureTogglesReady,
                EzEmployeeScheduleController.ezApiName,
                EzEmployeeScheduleController.ezInstance.featureViewName);
        } else {
            ezApi.ezclocker.ezFeatureToggles.ezApplyViewFeatureToggles(
                EzEmployeeScheduleController.ezInstance.featureViewName);
        }

        EzEmployeeScheduleController.ezInstance.ezRefreshEmployeeSchedules()
            .then(EzPromise.ezIgnoreResolve);
    }

    /**
     * @proteted @method
     * Applies any feature package toggles
     */
    ezApplyFeaturePackageToggles() {
        ezApi.ezclocker.ezUi.ezHideElement('_NavTimeOff');

        ezApi.ezclocker.ezUi.ezDisableElement('_NavTimeOff');

        if (ezApi.ezclocker.ezFeaturePackageManager.ezFeaturePackageEnabled(EzFeaturePackageId.TIME_OFF) ||
            ezApi.ezclocker.ezFeaturePackageManager.ezFeaturePackageEnabled(EzFeaturePackageId.TIME_OFF_YEARLY)) {
            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                '_NavTimeOff',
                EzElementEventName.CLICK,
                EzEmployeeScheduleController.ezApiName,
                ezApi.ezclocker.ezNavigation.ezNavigateToTimeOff);

            ezApi.ezclocker.ezUi.ezShowElement('_NavTimeOff')

            ezApi.ezclocker.ezUi.ezEnableElement('_NavTimeOff');
        }
    }

    /**
     * @protected @method
     * Applies any feature toggles to the UX
     * @returns {Promise.resolve}
     */
    ezApplyFeatureToggles() {
        return EzPromise.asyncAction(
            (finished) => {
                ezApi.ezclocker.ezFeatureToggles.ezApplyViewFeatureToggles(
                    EzEmployeeScheduleController.ezInstance.featureViewName);

                return finished();
            });
    }

    /**
     * @protected @method
     * Applies any license feature toggles to the UX
     * NOTE:
     *     License feature toggles get automaticlly applied when the EzClockerContextEventName.onActiveEmployerReady event is triggered.
     *     If the UX was not ready at the time of the event trigger, then you must place the license feature
     *     toggle logic here.
     * @returns {Promise.resolve}
     */
    ezApplyLicenseFeatureToggles() {
        return EzPromise.asyncAction(
            (finished) => {
                /*
                // Add any additional license feature toggling actions
                if (ezApi.ezclocker.ezLicenseFeatureToggle.ezLicenseFeatureEnabled(...)) {

                }
                */

                return finished();
            });
    }

    /**
     * @protected @method
     * Refreshes the employee schedules
     */
    ezRefreshEmployeeSchedules() {
        return ezApi.ezclocker.ezUi.ezPageWaitAsync(
            'Loading your schedule ...',
            (waitDone, finished) => EzEmployeeScheduleController.ezInstance.ezLoadEmployeeSchedules()
                .then(
                    () => {
                        ezApi.ezclocker.ezScheduleRenderer.ezRenderSchedules(
                            EzEmployeeScheduleController.ezInstance.scheduleOptions.selectedScheduleMoment,
                            EzEmployeeScheduleController.ezInstance.scheduleOptions.firstDayOfWeek,
                            EzEmployeeScheduleController.ezInstance.schedulesByEmployeeId,
                            EzEmployeeScheduleController.ezInstance.schedulesByDate,
                            true,
                            EzEmployeeScheduleController.ezInstance.timeOffsByEmployeeId,
                            EzEmployeeScheduleController.ezInstance.timeOffsByDate);

                        return waitDone().then(finished);
                    }));
    }

    /**
     * @protected @method
     * Maps the schedules into varoius sorted arrays for use by the UX.
     * Response Object:
     * {
     *     startDate: {ISODateTime_TargetTimeZone:20210215T000000-0600}"
     *     endDate: {ISODateTime_TargetTimeZone:20210221T235959-0600},
     *     schedules: {array}
     *     timeOffs: {array}
     *     nextShift: {object}
     *     totalTimeForPeriod: {String:0h:0m},
     *     maximumResponseSizePossible: {Number},
     *     errorCode: {Number:0|Error Code},
     *     message: {String:Success|Error Message}
     * }
     * @param {object} response
     * @returns {Promise.resolve}
     */
    ezBuildSortedSchedules(response) {
        if (!EzObject.isValid(response)) {
            throw ezApi.ezBadParam(
                'response',
                EzEmployeeScheduleController.ezInstance.ezTypeName,
                'ezBuildSortedSchedules');
        }

        return EzPromise.asyncAction(
            (finished) => {
                EzEmployeeScheduleController.ezInstance.ezBuildSortedTimeOffs(response.timeOffs);

                if (!EzArray.arrayHasLength(response.schedules)) {
                    EzEmployeeScheduleController.ezInstance.schedulesByEmployeeId = [];
                    EzEmployeeScheduleController.ezInstance.schedulesByDate = [];
                    EzEmployeeScheduleController.ezInstance.schedules = [];
                    return finished();
                }

                EzEmployeeScheduleController.ezInstance.schedules = response.schedules;

                // Copy the schedules
                EzEmployeeScheduleController.ezInstance.schedulesByEmployeeId = EzEmployeeScheduleController.ezInstance.schedules.slice(0);

                // Sort the copy by employee id
                EzEmployeeScheduleController.ezInstance.schedulesByEmployeeId.sort((a, b) => a.employeeId - b.employeeId);

                EzEmployeeScheduleController.ezInstance.schedulesByDate = EzEmployeeScheduleController.ezInstance.schedules.slice(0);

                // Sort the copy by start date
                EzEmployeeScheduleController.ezInstance.schedulesByDate.sort(
                    (a, b) => {
                        if (a.startDateTimeIso8601 < b.startDateTimeIso8601) {
                            return -1;
                        }

                        return a.startDateTimeIso8601 > b.startDateTimeIso8601
                            ? 1
                            : 0;
                    });

                return finished();
            });
    }

    /**
     * @protected @method
     * Maps the schedules into varoius sorted arrays for use by the UX.
     * @param {array} schedules
     * @returns {Promise.resolve}
     */
    ezBuildSortedTimeOffs(timeOffs) {
        if (!EzArray.arrayHasLength(timeOffs)) {
            EzEmployeeScheduleController.ezInstance.timeOffsByEmployeeId = [];
            EzEmployeeScheduleController.ezInstance.timeOffsByDate = [];
            EzEmployeeScheduleController.ezInstance.timeOffs = [];
        } else {
            EzEmployeeScheduleController.ezInstance.timeOffs = timeOffs;

            // Copy the schedules
            EzEmployeeScheduleController.ezInstance.timeOffsByEmployeeId = timeOffs.slice(0);

            // Sort the copy by employee id
            EzEmployeeScheduleController.ezInstance.timeOffsByEmployeeId.sort((a, b) => a.employeeId - b.employeeId);

            EzEmployeeScheduleController.ezInstance.timeOffsByDate = timeOffs.slice(0);

            // Sort the copy by start date
            EzEmployeeScheduleController.ezInstance.timeOffsByDate.sort(
                (a, b) => {
                    if (a.requestStartDateIso < b.requestStartDateIso) {
                        return -1;
                    }

                    return a.requestStartDateIso > b.requestStartDateIso ? 1 : 0;
                });
        }
    }

    /**
     * @protected @method
     * Loads the employee schedule data from the API
     * @returns {Promise.resolve}
     */
    ezLoadEmployeeSchedules() {
        return EzPromise.asyncAction(
            (finished) => {
                let dateString = ezApi.ezclocker.ezDateTime.ezToUTCIsoDateTime(
                    EzEmployeeScheduleController.ezInstance.scheduleOptions.selectedScheduleMoment);

                let url = ezApi.ezclocker.ezNavigation.ezGetInternalClassicApiUrl(
                    EzUrl.build`
                        employee/${EzEmployeeScheduleController.ezInstance.employee.id}/schedules
                            ?employerId=${EzEmployeeScheduleController.ezInstance.employee.employerId}
                            &dateInWeek=${EzString.encodeURL(dateString)}
                            &timeZoneId=${EzString.encodeURL(ezApi.ezclocker.ezDateTime.activeTimeZone)}`);

                return ezApi.ezclocker.ezHttpHelper.ezGet(url)
                    .then(
                        ezApi.ezclocker.ezServices.ezProcessApiResolve,
                        ezApi.ezclocker.ezServices.ezProcessApiReject)
                    .then(EzEmployeeScheduleController.ezInstance.ezBuildSortedSchedules)
                    .then(
                        (response) => finished(response),
                        (eResponse) => {
                            ezApi.ezclocker.ezDialog.ezReportInternalBugDialog(
                                null,
                                'Unable to load employee schedule data',
                                eResponse);

                            EzEmployeeScheduleController.ezInstance.ezBuildSortedSchedules([]);

                            return finished(eResponse);
                        });
            });
    }

    /**
     * @protected @method
     * Handles the navigate next button click
     */
    navigateNextWeek() {
        EzEmployeeScheduleController.ezInstance.scheduleOptions.selectedScheduleMoment = ezApi.ezclocker.ezDateTime
            .ezMomentFromDatePickerStartOfDay('scheduleWeek')
            .add(7, 'days');

        ezApi.ezclocker.ezDateTime.ezSetDatePickerValue(
            'scheduleWeek',
            EzEmployeeScheduleController.ezInstance.scheduleOptions.selectedScheduleMoment);

        ezApi.ezclocker.ezClockerContext.ezSaveActiveAccountOption(
            ezApi.ezclocker.ezOptionsService.EZOPTION_SELECTED_SCHEDULE_WEEK,
            ezApi.ezclocker.ezDateTime.ezToIso(EzEmployeeScheduleController.ezInstance.scheduleOptions.selectedScheduleMoment))
            .then(
                () => EzEmployeeScheduleController.ezInstance.ezRefreshEmployeeSchedules()
                    .then(ezApi.ezIgnoreResolve));
    }

    /**
     * @protected @method
     * Handles the navigate previos button click
     */
    navigatePreviousWeek() {
        EzEmployeeScheduleController.ezInstance.scheduleOptions.selectedScheduleMoment = ezApi.ezclocker.ezDateTime
            .ezMomentFromDatePickerEndOfDay('scheduleWeek')
            .subtract(7, 'days');

        ezApi.ezclocker.ezDateTime.ezSetDatePickerValue(
            'scheduleWeek',
            EzEmployeeScheduleController.ezInstance.scheduleOptions.selectedScheduleMoment);

        ezApi.ezclocker.ezClockerContext.ezSaveActiveAccountOption(
            ezApi.ezclocker.ezOptionsService.EZOPTION_SELECTED_SCHEDULE_WEEK,
            ezApi.ezclocker.ezDateTime.ezToIso(EzEmployeeScheduleController.ezInstance.scheduleOptions.selectedScheduleMoment))
            .then(
                () => EzEmployeeScheduleController.ezInstance.ezRefreshEmployeeSchedules()
                    .then(ezApi.ezIgnoreResolve));
    }

    /**
     * @protected @method
     * Handles the EzClockerContextEventName.onActiveEmployerReady
     */
    ezHandleActiveEmployerReady() {
        EzEmployeeScheduleController.ezInstance.ezApplyFeatureToggles();

        EzEmployeeScheduleController.ezInstance.ezApplyLicenseFeatureToggles();
    }

    /**
     * @protected @method
     * Handles the EzClockerContext EzEmpoloyeeContextReady event
     */
    ezHandleEzEmployeeContextReadyEvent() {
        ezApi.ezclocker.ezScheduleRenderer.employeeMode = true;

        let firstDayOfWeekOptionId = `${ezApi.ezclocker.ezOptionsService.EZOPTION_EMPLOYER_SCHEDULE_START_DAY}`;

        let selectedScheduleMomentOptionId =
            `${EzEmployeeScheduleController.ezInstance.employee.id}_${ezApi.ezclocker.ezOptionsService.EZOPTION_EMPLOYEE_LAST_SELECTED_SCHEDULE_WEEK}`;

        EzEmployeeScheduleController.ezInstance.scheduleOptions.selectedScheduleMoment =
            EzObject.isValid(EzEmployeeScheduleController.ezInstance.employee.options) &&
                EzObject.hasProperty(EzEmployeeScheduleController.ezInstance.employee.options, selectedScheduleMomentOptionId)
                ? ezApi.ezclocker.ezDateTime.ezFromIso(EzEmployeeScheduleController.ezInstance.employee.options[selectedScheduleMomentOptionId])
                : ezApi.ezclocker.ezOptionsService.ezOptionValueToMoment(
                    ezApi.ezclocker.ezClockerContext.ezReadActiveAccountOption(
                        ezApi.ezclocker.ezOptionsService.EZOPTION_SELECTED_SCHEDULE_WEEK,
                        ezApi.ezclocker.ezDateTime.ezNowAsIso()),
                    ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay());

        EzEmployeeScheduleController.ezInstance.scheduleOptions.firstDayOfWeek =
            EzObject.isValid(EzEmployeeScheduleController.ezInstance.employer.options) &&
                EzObject.hasProperty(EzEmployeeScheduleController.ezInstance.employer.options, firstDayOfWeekOptionId)
                ? EzNumber.asNumber(EzEmployeeScheduleController.ezInstance.employer.options[firstDayOfWeekOptionId])
                : ezApi.ezclocker.ezOptionsService.ezOptionValueToNumber(
                    ezApi.ezclocker.ezClockerContext.ezReadActiveEmployerOption(
                        ezApi.ezclocker.ezOptionsService.EZOPTION_EMPLOYER_SCHEDULE_START_DAY,
                        '0'),
                    0);

        EzEmployeeScheduleController.ezInstance.ezInitUX();
    }

    /**
     * @protected @method
     * Handles the EzFeatureToggles.ezEventNames.onFeatureTogglesReady event.
     */
    ezHandleFeatureTogglesReady() {
        EzEmployeeScheduleController.ezInstance.ezApplyFeatureToggles();
    }

    /**
     * @protected @method
     * Handles the selection of the schedule date, saving the option and refreshing the data
     */
    ezHandleDateSelection() {
        EzEmployeeScheduleController.ezInstance.scheduleOptions.selectedScheduleMoment =
            ezApi.ezclocker.ezDateTime.ezMomentFromDatePickerStartOfDay('scheduleWeek');

        ezApi.ezclocker.ezClockerContext.ezSaveActiveAccountOption(
            ezApi.ezclocker.ezOptionsService.EZOPTION_SELECTED_SCHEDULE_WEEK,
            ezApi.ezclocker.ezDateTime.ezToIso(EzEmployeeScheduleController.ezInstance.scheduleOptions.selectedScheduleMoment))
            .then(
                () => EzEmployeeScheduleController.ezInstance.ezRefreshEmployeeSchedules().then(ezApi.ezIgnoreResolve));
    }
}

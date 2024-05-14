import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzString,
    EzUrl,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzDateTime } from '/public/javascript/common/ez-date-time.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

/**
 * @class
 * @extends {EzClass}
 * Creates a new Instance of the EzScheduleService api
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzScheduleService } from '/secure/javascript/services/ezclocker-schedule-service.js';
 * ---------------------------------------------------------------------------
 * Singleton instance ready for use when the below evaluates to true:
 *     globalThis.globalThis.ezApi.ezclocker[EzScheduleService.ezApiName] &&
 *     globalThis.globalThis.ezApi.ezclocker[EzScheduleService.ezApiName].ready
 * ---------------------------------------------------------------------------
 * Listen for onReady event:
 *     document.addEventListener(
 *         EzScheduleService.ezEventNames.onReady,
 *         this.#ezRegistrator);
 * ---------------------------------------------------------------------------
 */
export class EzScheduleService extends EzClass {
    /**
     * @static
     * @public @readonly @property
     * Returns the name of this class's singleton instance when registered with globalThis.ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezScheduleService';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_ezScheduleService_Ready'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzScheduleService}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.globalThis.ezApi.ezclocker[EzScheduleService.ezApiName])
        ? globalThis.globalThis.ezApi.ezclocker[EzScheduleService.ezApiName]
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzScheduleService}
     */
    static get ezInstance() {
        return EzScheduleService.#ezInstance;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzScheduleService} instance
     */
    static set ezInstance(instance) {
        if (null != EzScheduleService.#ezInstance) {
            throw new Error('EzScheduleService\'s singleton instance is already reigstered with EzApi.');
        }

        EzScheduleService.#ezInstance = instance;
    }

    /**
     * @static
     * @private @field
        Stores the EzApi registration state for this class.
        Default value is NULL
        Class is registerd with EzApi when value is EzRegistrationState.REGISTERED
     * @type {string}
     * A valid enum property value from EzRegistrationState
     */
    static #ezApiRegistrationState = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.globalThis.ezApi.ezclocker[EzScheduleService.ezApiName])
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
        return EzScheduleService.#ezApiRegistrationState;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzScheduleService.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @static
     * @private @readonly @property
     * Returns true when all required dependencies for this class report ready.
     * In otherwords, the require dependency's singleton instance is created
     * and is registered with and accessable from EzApi with globalThis.ezApi.ezclocker.{dependency_name}.
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzScheduleService.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.globalThis.ezApi.ready) &&

            globalThis.globalThis.ezApi.ezclocker[EzDateTime.ezApiName] &&
            globalThis.globalThis.ezApi.ezclocker[EzDateTime.ezApiName].ready &&

            globalThis.globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName] &&
            globalThis.globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName].ready &&

            globalThis.globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzScheduleService.ezInstance &&
            EzRegistrationState.REGISTERED === EzScheduleService.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with globalThis.ezApi. Returns true if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzScheduleService.#ezCanRegister && !EzScheduleService.#ezIsRegistered) {
            globalThis.globalThis.ezApi.ezRegisterNewApi(EzScheduleService, EzScheduleService.ezApiName);
        }

        return EzScheduleService.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzScheduleService.ezApiName
     *     2) Property getter EzScheduleService.ezEventNames
     *     3) Property getter EzScheduleService.ezInstance
     *     4) Property setter EzScheduleService.ezInstance
     *     5) Property getter EzScheduleService.ezApiRegistrationState
     *     6) Property setter EzScheduleService.ezApiRegistrationState
     *     7) Property getter EzScheduleService.#ezCanRegister
     *     8) Property getter EzScheduleService.#ezIsRegistered
     *     9) Method EzScheduleService.#ezRegistrator()
     */
    static {
        if (!EzScheduleService.#ezIsRegistered) {
            EzScheduleService.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzScheduleService.#ezRegistrator()) {
                document.addEventListener(
                    EzScheduleService.ezOnEzApiReadyEventName,
                    EzScheduleService.#ezRegistrator);

                document.addEventListener(
                    EzDateTime.ezEventNames.onReady,
                    EzScheduleService.#ezRegistrator);

                document.addEventListener(
                    EzHttpHelper.ezEventNames.onReady,
                    EzScheduleService.#ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.onReady,
                    EzScheduleService.#ezRegistrator);
            }
        }
    }

    /**
     * @public @constructor
     * >> DO NOT CREATE NEW INSTANCES OUTSIDE OF THE STATIC INITIALIZATION FLOW <<
     * Use the static singleton instance available from ezApi: globalThis.ezApi.ezclocker.ezScheduleService.
     */
    constructor() {
        super();
    }

    /**
     * @public @readonly @property
     * Returns the legacy internal endpoint of the API
     * @returns {string}
     */
    get apiEndpoint() {
        return '/_schedules';
    }

    /**
     * @public @readonly @property
     * Returns the V1 internal endpoint of the API
     * @returns {string}
     */
    get apiV1Endpoint() {
        return '/_api/v1/schedules';
    }

    /**
     * @public @readonly @property
     * Returns the V2 internal endpoint of the API
     * @returns {string}
     */
    get apiV2Endpoint() {
        return '/_api/v2/schedules';
    }

    /**
     * @protected @method
     * Initializes the EzScheduleService.
     * @returns {EzScheduleService}
     */
    ezInit() {
        return EzScheduleService.ezInstance;
    }

    /**
     * @public @method
     * Returns the schedules for all employees for the employer for the week that contains the provided date.
     * @param {string} dateTimeInWeekIso
     * @returns {Promise}
     */
    ezGetEmployerSchedules(dateTimeInWeekIso) {
        if (!EzString.hasLength(dateTimeInWeekIso)) {
            throw new EzBadParamException(
                'dateTimeInWeekIso',
                EzScheduleService.ezInstance,
                EzScheduleService.ezInstance.ezGetEmployerSchedules);
        }

        return globalThis.ezApi.ezclocker.ezHttpHelper.ezGet(
            EzUrl.build`
                ${EzScheduleService.ezInstance.apiV2Endpoint}/
                ?date-in-week=${EzString.encodeURL(dateTimeInWeekIso)}
                &target-time-zone-id=${EzString.encodeURL(globalThis.ezApi.ezclocker.ezDateTime.activeTimeZone)}`)
            .then(
                globalThis.ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                globalThis.ezApi.ezclocker.ezHttpHelper.ezProcesApiReject);
    }

    /**
     * @public @method
     * Returns the schedule in week date MM/DD/YYYY to use in api calls.
     * @param {moment} momentInWeek
     * @param {number} startDay
     * @returns {string}
     */
    getRequestDate(momentInWeek, startDay) {
        if (!EzObject.isValid(momentInWeek)) {
            momentInWeek = globalThis.ezApi.ezclocker.ezDateTime.ezNow();
        }

        let dayOfPeriodStart = momentInWeek.day();

        if (0 < dayOfPeriodStart - startDay) {
            return globalThis.ezApi.ezclocker.ezDateTime.ezCreateFromMoment(momentInWeek)
                .subtract(dayOfPeriodStart - startDay, 'days')
                .format('MM/DD/YYYY');
        }

        if (0 === dayOfPeriodStart - startDay) {
            return globalThis.ezApi.ezclocker.ezDateTime.ezCreateFromMoment(momentInWeek)
                .format('MM/DD/YYYY');
        }

        return globalThis.ezApi.ezclocker.ezDateTime.ezCreateFromMoment(momentInWeek)
            .subtract(7 + (dayOfPeriodStart - startDay), 'days')
            .format('MM/DD/YYYY');
    }

    /**
     * @public @method
     * Returns the moment instance to use in a schedule api request.
     * @param {moment} momentInWeek
     * @param {number} startDay
     * @returns {moment}
     */
    ezGetFirstMomentOfWeek(momentInWeek, startDay) {
        if (!EzObject.isValid(momentInWeek)) {
            momentInWeek = globalThis.ezApi.ezclocker.ezDateTime.ezNow();
        }

        let dayOfPeriodStart = momentInWeek.day();

        if (0 < dayOfPeriodStart - startDay) {
            return globalThis.ezApi.ezclocker.ezDateTime
                .ezCreateFromMomentWithTimeStartOfDay(momentInWeek)
                .subtract(
                    dayOfPeriodStart - startDay,
                    'days');
        }

        if (0 === dayOfPeriodStart - startDay) {
            return globalThis.ezApi.ezclocker.ezDateTime.ezCreateFromMomentWithTimeStartOfDay(momentInWeek);
        }

        return globalThis.ezApi.ezclocker.ezDateTime
            .ezCreateFromMomentWithTimeStartOfDay(momentInWeek)
            .subtract(
                7 + (dayOfPeriodStart - startDay),
                'days');
    }

    /**
     * @public @method
     * Copies an employee's schedule from the specified week to the specified week and the next number of weeks.
     * @param {numbewr} employeeId
     * @param {moment} fromWeekDateTime
     * @param {moment} toWeekDateTime
     * @param {number} numOfWeeks
     * @returns {Promise}
     */
    copySchedule(employeeId, fromWeekDateTime, toWeekDateTime, numOfWeeks) {
        const fromRequestDate = globalThis.ezApi.ezclocker.ezDateTime.ezCreateFromMoment(fromWeekDateTime)
            .utc()
            .toISOString();

        const toRequestDate = globalThis.ezApi.ezclocker.ezDateTime.ezCreateFromMoment(toWeekDateTime)
            .utc()
            .toISOString();

        if (!EzObject.isValid(employeeId)) {
            const em = 'The employee id is required to copy the schedule forward.';

            return globalThis.ezApi.ezclocker.ezDialog.ezShowError(
                'Copy Schedule Error',
                em,
                () => EzPromise.ezReject({
                    errorCode: 500,
                    message: em
                }));
        }

        return globalThis.ezApi.ezclocker.ezHttpHelper.ezPost(
            EzUrl.build`
                ${EzScheduleService.ezInstance.apiEndpoint}
                /${employeeId}/copy/
                ?sourceWeekOfIsoDateTime=${fromRequestDate}
                &destinationWeekOfIsoDateTime=${toRequestDate}
                &numberOfWeeks=${numOfWeeks}
                &timeZoneId=${globalThis.ezApi.ezclocker.ezDateTime.activeTimeZone}
                &source=WEBSITE`)
            .then(
                globalThis.ezApi.ezclocker.ezServices.ezProcessApiResolve,
                globalThis.ezApi.ezclocker.ezServices.ezProcesApiReject);
    }
}

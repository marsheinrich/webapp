import {
    EzObject,
    EzNumber,
    EzString,
    EzFunction
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

/**
 * @class
 * @description
 * Defines a interval ticker EzTickerTimer
 *  ---------------------------------------------------------------------------
 * Import with:
 *     import { EzIntervalTicker } from '/public/javascript/common/ez-ticker-timer.js';
 * ---------------------------------------------------------------------------
 */
export class EzIntervalTicker {
    /**
     * @public @constructor
     * @param {function} callBackFunction
     * @param {number} intervalms
     * @param {string} ezIntervalTickerId
     * @param {object} intervalId
     */
    constructor(callBackFunction, intervalms, ezIntervalTickerId, intervalId) {
        if (!EzFunction.isFunction(callBackFunction)) {
            throw new EzBadParamException(
                'callBackFunction',
                this,
                this.constructor);
        }

        this.callback = callBackFunction;

        this.intervalms = intervalms;

        this.ezIntervalTickerId = ezIntervalTickerId;

        this.intervalId = intervalId;
    }

    #created = null;
    get created() {
        if (!EzString.hasLength(this.#created)) {
            this.#created = ezApi.ezclocker.ezDateTime.ezNowAsIso();
        }
        return this.#created;
    }
    set created(createdIso) {
        if (!EzString.hasLength(this.#created)) {
            this.#created = ezApi.ezclocker.ezDateTime.ezIsValidIso(createdIso)
                ? createdIso
                : ezApi.ezclocker.ezDateTime.ezNowAsIso();
        } else if (ezApi.ezclocker.ezDateTime.ezIsValidIso(createdIso)) {
            this.#created = createdIso;
        }
    }

    #callback = null;
    get callback() {
        return this.#callback;
    }
    set callback(callback = null) {
        this.#callback = EzFunction.isFunction(callback)
            ? callback
            : null;
    }

    #intervalId = null;
    get intervalId() {
        return this.#intervalId;
    }
    set intervalId(intervalId = null) {
        this.#intervalId = EzObject.isValid(intervalId)
            ? intervalId
            : null;
    }

    #ezIntervalTickerId = null;
    get ezIntervalTickerId() {
        if (!EzString.hasLength(this.#ezIntervalTickerId)) {
            this.#ezIntervalTickerId = `ezIntervalTicker_${ezApi.ezclocker.ezDateTime.ezGetNowUTCUnixTimeStamp()}`;
        }

        return this.#ezIntervalTickerId;
    }
    set ezIntervalTickerId(ezIntervalTickerId = null) {
        this.#ezIntervalTickerId = EzString.stringWithLengthOrDefault(
            ezIntervalTickerId,
            `ezIntervalTicker_${ezApi.ezclocker.ezDateTime.ezGetNowUTCUnixTimeStamp()}`);
    }

    #intervalms = 1000;
    get intervalms() {
        return this.#intervalms;
    }
    set intervalms(intervalms = 1000) {
        this.#intervalms = EzNumber.isNumber(intervalms)
            ? intervalms
            : 1000;
    }
}

/**
 * @class
 * @description
 * Defines a timeout trigger for EzTickerTimer
 * -----------------------------------------------------------------
 * Import with:
 *     import { EzTimeoutTigger } from '/public/javascript/common/ez-ticker-timer.js';
 * -----------------------------------------------------------------
 */
export class EzTimeoutTigger {
    /**
     * @public @constructor
     * @param {Function} callBackFunction
     * @param {Number|null} triggerTimeoutMilliseconds
     * @param {String|null} ezTimeoutTiggerId
     * @param {*|null} timeoutId
     */
    constructor(callBackFunction, triggerTimeoutMilliseconds, ezTimeoutTiggerId, timeoutId) {
        if (!EzFunction.isFunction(callBackFunction)) {
            throw new EzBadParamException(
                'callBackFunction',
                this,
                this.constructor);
        }

        this.callback = callBackFunction;

        this.triggerTimeoutMilliseconds = triggerTimeoutMilliseconds;

        this.ezTimeoutTiggerId = ezTimeoutTiggerId;

        this.timeoutId = timeoutId;
    }

    #created = null;
    get created() {
        if (EzString.hasLength(this.#created)) {
            this.#created = ezApi.ezclocker.ezDateTime.ezNowAsIso();
        }

        return this.#created;
    }
    set created(createdIso) {
        if (!EzString.hasLength(this.#created)) {
            this.#created = ezApi.ezclocker.ezDateTime.ezIsValidIso(createdIso)
                ? createdIso
                : ezApi.ezclocker.ezDateTime.ezNowAsIso();
        } else if (ezApi.ezclocker.ezDateTime.ezIsValidIso(createdIso)) {
            this.#created = createdIso;
        }
    }

    #callback = null;
    get callback() {
        return this.#callback;
    }
    set callback(callback) {
        this.#callback = EzFunction.isFunction(callback)
            ? callback
            : null;
    }

    #ezTimeoutTriggerId = null;
    get ezTimeoutTriggerId() {
        if (!EzString.hasLength(this.#ezTimeoutTriggerId)) {
            this.#ezTimeoutTriggerId = `ezTimeoutTrigger_${ezApi.ezclocker.ezDateTime.ezGetNowUTCUnixTimeStamp()}`
        }

        return this.#ezTimeoutTriggerId;
    }
    set ezTimeoutTriggerId(ezTimeoutTriggerId) {
        this.#ezTimeoutTriggerId = EzString.stringWithLengthOrDefault(
            ezTimeoutTriggerId,
            `ezTimeoutTrigger_${ezApi.ezclocker.ezDateTime.ezGetNowUTCUnixTimeStamp()}`);
    }

    #triggerTimeoutMilliseconds = 10000;
    get triggerTimeoutMilliseconds() {
        return this.#triggerTimeoutMilliseconds;
    }
    set triggerTimeoutMilliseconds(triggerTimeoutMilliseconds) {
        this.#triggerTimeoutMilliseconds = EzNumber.isNumber(triggerTimeoutMilliseconds)
            ? triggerTimeoutMilliseconds
            : 10000;
    }

    #timeoutId = null;
    get timeoutId() {
        return this.#timeoutId;
    }
    set timeoutId(timeoutId) {
        this.#timeoutId = EzObject.isValid(timeoutId)
            ? timeoutId
            : null;
    }
}

/**
 * @class
 * @extends { EzClass }
 * @description
 * Creates an instance of EzTickerTimer
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *     import { EzTickerTimer } from '/public/javascript/common/ez-ticker-timer.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Ready checks:
 *     globalThis.ezApi.ezclocker?.[EzTickerTimer.ezApiName]?.ready
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Listen for onReady event:
 *     document.addEventListener(
 *         EzTickerTimer.ezEventNames.onReady,
 *         {listening_class_name}.#ezRegistrator);
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Singleton instance from within EzTimerTimer class: EzTimerTimer.ezInstance
 * Singleton instance from outside EzTimerTimer class: ezApi.ezclocker.ezTickerTimer
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzTickerTimer extends EzClass {
    /**
     * @private @field
     * Stores the map of active interval tickers
     * @object {object}
     */
    #ezActiveIntervalTickers = {};
    /**
     * @public @property @getter
     * Gets the map of active interval tickers
     * @returns {object}
     */
    get ezActiveIntervalTickers() {
        return this.#ezActiveIntervalTickers;
    }
    /**
     * @public @property @setter
     * Sets the map of active interval tickers
     * @param {object} ezActiveIntervalTickers
     */
    set ezActiveIntervalTickers(ezActiveIntervalTickers) {
        this.#ezActiveIntervalTickers = EzObject.assignOrEmpty(ezActiveIntervalTickers);
    }

    /**
     * @private @field
     * Stores the map of active timeout triggers
     * @object {object}
     */
    #ezActiveTimeoutTriggers = {};
    /**
     * @public @property @getter
     * Gets the map of active timeout triggers
     * @returns {object}
     */
    get ezActiveTimeoutTriggers() {
        return this.#ezActiveTimeoutTriggers;
    }
    /**
     * @public @property @setter
     * Sets the map of active timeout triggers
     * @param {object} ezActiveTimeoutTriggers
     */
    set ezActiveTimeoutTriggers(ezActiveTimeoutTriggers) {
        this.#ezActiveTimeoutTriggers = EzObject.assignOrEmpty(ezActiveTimeoutTriggers);
    }

    /**
     * @public @method
     * Initialzies EzTimer
     * @returns {EzTickerTimer}
     */
    ezInit() {
        return EzTickerTimer.ezInstance;
    }

    /**
     * @public @method
     * Determines if an EzIntervalTicker is associated with the provided ezIntervalTickerId
     * @param {String} ezIntervalTickerId
     * @returns {Boolean}
     */
    ezIntervalTickerExists(ezIntervalTickerId) {
        return EzString.hasLength(ezIntervalTickerId) && EzTickerTimer.ezInstance.ezActiveIntervalTickers?.[ezIntervalTickerId];
    }

    /**
     * @public @method
     * Creates an interval ticker using window.setInterval.
     * @returns {EzIntervalTicker}
     * Response Object Format:
     * {
     *   created: {ezApi.ezclocker.ezDateTime.ezNowAsIso()},
     *   callback: {callBackFunction},
     *   ezIntervalTickerId: {tickerId|'ezTimer_' + ezApi.ezclocker.ezDateTime.ezGetNowUTCUnixTimeStamp()},
     *   intervalms: {tickerIntervalms|1000},
     *   intervalId: {response from window.setInterval}
     * }
     */
    ezStartIntervalTicker(callBackFunction, intervalms, ezIntervalTickerId) {
        if (!EzFunction.isFunction(callBackFunction)) {
            throw new EzBadParamException(
                'callBackFunction',
                EzTickerTimer.ezInstance,
                EzTickerTimer.ezInstance.ezStartIntervalTicker);
        }

        if (EzTickerTimer.ezInstance.ezActiveIntervalTickers?.[ezIntervalTickerId]) {
            // Stop the existing EzIntervalTicker
            EzTickerTimer.ezInstance.ezStopIntervalTicker(ezIntervalTickerId);
        }

        // Create the new EzIntervalTicker
        let intervalId = window.setInterval(callBackFunction, intervalms);

        EzTickerTimer.ezInstance.ezActiveIntervalTickers[ezIntervalTickerId] = new EzIntervalTicker(
            callBackFunction,
            intervalms,
            ezIntervalTickerId,
            intervalId);

        return EzTickerTimer.ezInstance.ezActiveIntervalTickers[ezIntervalTickerId];
    }

    /**
     * @public @method
     * Stops and removes an active EzIntervalTicker associated with the provided ezIntervalTickerId.
     * @param {String} ezIntervalTickerId
     * @returns {Object}
     * Returns a response object with error code and message.
     */
    ezStopIntervalTicker(ezIntervalTickerId) {
        if (!EzString.stringHasLength(ezIntervalTickerId)) {
            throw new EzBadParamException(
                'ezIntervalTickerId',
                EzTickerTimer.ezInstance,
                EzTickerTimer.ezInstance.ezStopIntervalTicker);
        }

        let em;

        if (!EzObject.hasProperty(EzTickerTimer.ezInstance.ezActiveIntervalTickers, ezIntervalTickerId)) {
            // No ticker registerd with the provided id, return as success and just warn
            em = EzString.em`
                Did not remove the active EzIntervalTicker with ezIntervalTickerId=${ezIntervalTickerId}.
                The EzIntervalTicker does not exist or has already been removed.`;

            ezApi.ezclocker.ezLogger.warn(em);

            return ezApi.ezclocker.ezServices.ezBuildSuccessResponse(em);
        }

        let ezIntervalTicker = EzTickerTimer.ezInstance.ezActiveIntervalTickers[ezIntervalTickerId];

        let response;

        if (!EzObject.isValid(ezIntervalTicker)) {
            em = EzString.em`
                Unable to remove the EzIntervalTicker with ezIntervalTickerId=${ezIntervalTickerId} due to a null or
                missing EzIntervalTicker instance.`;

            ezApi.ezclocker.ezLogger.error(em);

            response = ezApi.ezclocker.ezServices.ezBuildErrorResponse(500, em);
        } else if (!EzObject.isValid(ezIntervalTicker.intervalId)) {
            em = EzString.em`
                Unable to remove EzIntervalTicker with ezIntervalTickerId=${ezIntervalTickerId} due to a null or
                missing interval id.`;

            ezApi.ezclocker.ezLogger.error(em);

            response = ezApi.ezclocker.ezServices.ezBuildErrorResponse(500, em);
        } else {
            response = ezApi.ezclocker.ezServices.ezBuildSuccessResponse();
        }

        window.clearInterval(ezIntervalTicker.intervalId);

        delete EzTickerTimer.ezInstance.ezActiveIntervalTickers[ezIntervalTickerId];

        return response;
    }

    /**
     * @public @method
     * Starts a new EzTimeoutTrigger
     * @param {Function} callBackFunction
     * @param {Number|null} triggerTimeoutMilliseconds
     * @param {String|null} ezTimeoutTriggerId
     * @returns {EzTimeoutTrigger}
     * Response Object Format:
     * {
     *   created: ezApi.ezclocker.ezDateTime.ezNowAsIso()
     *   callback: callBackFunction;
     *   timeoutId: {response from window.setTimeout()}
     *   ezTimeoutTiggerId: {ezTimeoutTriggerId|ezTimeoutTrigger_' + ezApi.ezclocker.ezDateTime.ezGetNowUTCUnixTimeStamp();
     *   timeoutId: {triggerTimeoutMilliseconds|10000}
     * }
     */
    ezStartTimeoutTrigger(callBackFunction, triggerTimeoutMilliseconds, ezTimeoutTriggerId) {
        if (!EzFunction.isFunction(callBackFunction)) {
            throw new EzBadParamException(
                'callBackFunction',
                EzTickerTimer.ezInstance,
                EzTickerTimer.ezInstance.ezStartTimeoutTrigger);
        }

        if (EzObject.hasProperty(EzTickerTimer.ezInstance.ezActiveTimeoutTriggers, ezTimeoutTriggerId)) {
            // Stop the existing EzTimeTigger
            EzTickerTimer.ezInstance.ezStopIntervalTicker(ezTimeoutTriggerId);
        }

        // Create the new EzTimeTigger
        let timeOutId = window.setTimeout(callBackFunction, triggerTimeoutMilliseconds);

        EzTickerTimer.ezInstance.ezActiveTimeoutTriggers[ezTimeoutTriggerId] = new EzTimeoutTigger(
            callBackFunction,
            triggerTimeoutMilliseconds,
            ezTimeoutTriggerId,
            timeOutId);

        return EzTickerTimer.ezInstance.ezActiveTimeoutTriggers[ezTimeoutTriggerId];
    }

    /**
     * @public @method
     * Stops the active EzTimeoutTrigger associated with the provided ezTimeoutTriggerId
     */
    ezStopTimeoutTrigger(ezTimeoutTriggerId) {
        let em;

        if (!EzString.hasLength(ezTimeoutTriggerId)) {
            em = 'A valid ezTimeoutTriggerId is required in call to EzTimer.ezStopTimeoutTrigger.';

            ezApi.ezclcoker.ezLogger.error(em);

            return ezApi.ezclocker.ezServices.ezBuildErrorResponse(400, em);
        }

        if (!EzTickerTimer.ezInstance.ezActiveTimeoutTriggers?.[ezTimeoutTriggerId]) {
            // No ticker registerd with the provided id, return as success and just warn
            em = EzString.em`
                Did not remove the active EzTimeoutTrigger with ezTimeoutTriggerId=${ezTimeoutTriggerId}.
                The EzTimeoutTrigger does not exist or has already been removed.`;

            ezApi.ezclocker.ezLogger.warn(em);

            return ezApi.ezclocker.ezServices.ezBuildSuccessResponse(em);
        }

        let ezTimeoutTrigger = EzTickerTimer.ezInstance.ezActiveTimeoutTriggers[ezTimeoutTriggerId];

        let response;

        if (!EzObject.isValid(ezTimeoutTrigger)) {
            em = EzString.em`
                Unable to remove the EzTimeoutTrigger with ezTimeoutTriggerId=${ezTimeoutTriggerId}
                due to a null or missing EzTimeoutTrigger instance.`;

            ezApi.ezclocker.ezLogger.error(em);

            response = ezApi.ezclocker.ezServices.ezBuildErrorResponse(500, em);
        } else if (!EzObject.isValid(ezTimeoutTrigger.intervalId)) {
            em = EzString.em`
                Unable to remove EzTimeoutTrigger with ezTimeoutTriggerId=${ezTimeoutTriggerId}
                due to a null or missing timeout id.`;

            ezApi.ezclocker.ezLogger.error(em);

            response = ezApi.ezclocker.ezServices.ezBuildErrorResponse(500, em);
        } else {
            response = ezApi.ezclocker.ezServices.ezBuildSuccessResponse();
        }

        window.clearInterval(ezTimeoutTrigger.intervalId);

        delete EzTickerTimer.ezInstance.ezActiveTimeoutTriggers[ezTimeoutTriggerId];

        return response;
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
        return 'ezTickerTimer';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzTickerTimer_Ready',
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzTickerTimer}
     */
    static #ezInstance = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzTickerTimer.ezApiName]
        ? globalThis.ezApi.ezclocker[EzTickerTimer.ezApiName]
        : null;
    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzTickerTimer}
     */
    static get ezInstance() {
        return EzTickerTimer.#ezInstance;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzTickerTimer} instance
     */
    static set ezInstance(instance) {
        if (EzTickerTimer.#ezInstance) {
            throw new Error('EzTickerTimer\'s singleton instance is already reigstered with EzApi.');
        }

        EzTickerTimer.#ezInstance = instance;
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
    static #ezApiRegistrationState = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzTickerTimer.ezApiName]
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
        return EzTickerTimer.#ezApiRegistrationState;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzTickerTimer.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzTickerTimer.ezApiRegistrationState &&
            globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzTickerTimer.ezInstance && EzRegistrationState.REGISTERED === EzTickerTimer.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzTickerTimer.#ezCanRegister && !EzTickerTimer.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzTickerTimer, EzTickerTimer.ezApiName);

            EzTickerTimer.ezApiRegistrationState = EzRegistrationState.REGISTERED;
        }

        return EzTickerTimer.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzTickerTimer.ezApiName
     *     2) Property getter EzTickerTimer.ezEventNames
     *     3) Property getter EzTickerTimer.ezInstance
     *     4) Property setter EzTickerTimer.ezInstance
     *     5) Property getter EzTickerTimer.ezApiRegistrationState
     *     6) Property setter EzTickerTimer.ezApiRegistrationState
     *     7) Property getter EzTickerTimer.#ezCanRegister
     *     8) Property getter EzTickerTimer.#ezIsRegistered
     *     9) Method EzTickerTimer.#ezRegistrator()
     */
    static {
        if (!EzTickerTimer.#ezIsRegistered) {
            EzTickerTimer.ezApiRegistrationState = EzRegistrationState.PENDING;

            //if (!EzTickerTimer.#ezRegistrator()) {
                document.addEventListener(
                    EzTickerTimer.ezOnEzApiReadyEventName,
                    EzTickerTimer.#ezRegistrator);
            //}
        }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // !! DO NOT PLACE ANY non-initialization fields, getter/setter methods, static methods, or class methods beyond above section !!
    // NO CODE AFTER THIS SECTION
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}

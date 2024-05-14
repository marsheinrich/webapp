import {
    EzObject,
    EzBoolean
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzClockerContextEventName
} from '/ezlibrary/enums/EzEnumerations.js';
import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

/**
 * @class
 * @description
 * Stores the ready state flags for the EzEmployerScheduleController
 * ---------------------------------------------------------------------------
 * Import with:
 *      import { EzScheduleViewDataHelperReadyState } from '/secure/schedule/EzScheduleViewDataHelperReadyState.js';
 * ---------------------------------------------------------------------------
 * Listen to onReadyStateReady event with:
 *      ezApi.ezclocker.ezEventEngine.ezWantEvent(
 *          EzScheduleViewDataHelperReadyState.ezEventNames.onReadyStateReady,
 *          {Class_Wanting_Event}.ezApiName,
 *          {Handler_Function_Reference});
 * ---------------------------------------------------------------------------
 */
export class EzScheduleViewDataHelperReadyState {
    /**
     * @static
     * @public @readonly @property
     * Gets a key/value object of event id = event name for all events triggered by this class.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReadyStateReady: 'ezOn_EzScheduleViewDataHelperReadyState_Ready'
        };
    }

    /**
     * @constructor
     * Creates a new instance of EzScheduleViewDataHelperReadyState.
     * @param {undefined|null|boolean} autoListenToEvents
     * Default: true
     * When autoListentToEvents param is true and the ezApi.ezclocker.ezEventEngine and
     * ezApi.ezclocker.ezClockerContextEventName is available via ezApi then
     * the constructor will listen for the EzClockerContextEventName.onUserContextReady from EzClockerContext
     * to automaticlly set the ezUserContextReady boolean when triggered.
     */
    constructor(autoListenToEvents = true) {
        this.#ezAutoListenToEvents = EzBoolean.booleanOrTrue(autoListenToEvents);

        this.ezHookAutoListenEvents();
    }

    #ezEventHandlerId = 'EzScheduleViewDataHelperReadyState';

    /**
     * @private @field
     * Stores if the EzScheduleViewDataHelperReadyState.ezEventNames.onReadyStateReady event was triggered yet or not.
     * @type {boolean}
     */
    #ezReadyStateReadyEventTriggered = false;

    /**
     * @private @field
     * Stores if this instance was created with autoListenToEvents = true passed into the constructor.
     * When autoListentToEvents param is true and the ezApi.ezclocker.ezEventEngine and
     * ezApi.ezclocker.ezClockerContextEventName is available via ezApi then
     * the constructor will listen for the EzClockerContextEventName.onUserContextReady from EzClockerContext
     * to automaticlly set the ezUserContextReady boolean when triggered.
     * Default value is: true
     * @type {boolean}
     */
    #ezAutoListenToEvents = true;

    /**
     * @private @field
     * Stores if events were hooked as part of the autoListenToEvents option being true.
     * If the autoListentToEvents param is true but the ezApi.ezclocker.ezEventEngine and/or
     * ezApi.ezclocker.ezClockerContextEventName is not yet available then this property is
     * set to false. Otherwise, this propery is true indicating that events were hooked during
     * construction that will automaticlly set some or all of the ready flag properties when
     * triggered.
     * Default value is: false
     * @type {boolean}
     */
    #ezAutoListenEventsHooked = false;
    /**
     * @public @readonly @property
     * Gets if events were hooked as part of the autoListenToEvents option being true.
     * @returns {boolean}
     */
    get ezAutoListenEventsHooked() {
        return this.#ezAutoListenEventsHooked;
    }

    /**
     * @private @field
     * Stores if the EzClockerContext's user context ready event has fired or not
     * Default: false
     * @type {boolean}
     */
    #ezUserContextReady = false;
    /**
     * @public @property @getter
     * Gets if the EzClockerContext's user context ready event has fired or not
     * @returns {boolean}
     */
    get ezUserContextReady() {
        return this.#ezUserContextReady;
    }
    /**
     * @public @property @setter
     * Sets if the EzClockerContext's user context ready event has fired or not
     * @param {boolean} userContextReady
     * Default: false
     */
    set ezUserContextReady(userContextReady) {
        this.#ezUserContextReady = EzBoolean.booleanOrFalse(userContextReady);

        this.ezProcessReadyStateFlags();
    }

    /**
     * @private @field
     * Stores if the EzClockerContext's user context ready event has fired or not
     * Default: false
     * @type {boolean}
     */
    #ezActiveEmployerReady = false;
    /**
     * @public @property @getter
     * Gets if the EzClockerContext's user context ready event has fired or not
     * @returns {boolean}
     */
    get ezActiveEmployerReady() {
        return this.#ezActiveEmployerReady;
    }
    /**
     * @public @property @setter
     * Sets if the EzClockerContext's user context ready event has fired or not
     * @param {boolean} activeEmployerReady
     * Default: false
     */
    set ezActiveEmployerReady(activeEmployerReady) {
        this.#ezActiveEmployerReady = EzBoolean.booleanOrFalse(activeEmployerReady);

        this.ezProcessReadyStateFlags();
    }

    /**
     * @private @field
     * Stores if the EzClockerContextEventName.onActiveAccountReady event was triggered one or more times.
     * @type {boolean}
     */
    #activeAccountReady = false;
    /**
     * @public @property @getter
     * Gets if the EzClockerContextEventName.onActiveAccountReady event was triggered one or more times.
     * @returns {boolean}
     */
    get activeAccountReady() {
        return this.#activeAccountReady;
    }
    /**
     * @public @property @setter
     * Sets if the EzClockerContextEventName.onActiveAccountReady event was triggered one or more times.
     * @param {boolean} activeAccountReady
     */
    set activeAccountReady(activeAccountReady) {
        this.#activeAccountReady = EzBoolean.booleanOrFalse(activeAccountReady);

        this.ezProcessReadyStateFlags();
    }

    /**
     * @public @readonly @property
     * Determines of all the ready state properties equal true or not.
     * @returns {boolean}
     */
    get isReady() {
        return EzBoolean.isTrue(
            //this.#ezUserContextReady &&
            this.#ezActiveEmployerReady &&
            this.#activeAccountReady);
    }

    /**
     * @public @method
     * Sets all properties from the matching properties on the provided ezScheduleViewDataHelperReadyState instance.
     * If the provided ezScheduleViewDataHelperReadyState is undefiend or null, no action is performed.
     * If the provided ezScheduleViewDataHelperReadyState is missing a property or the property is of the
     * wrong type then the default value is assigned instead.
     * @param {EzScheduleViewDataHelperReadyState}
     */
    ezLoadFrom(ezScheduleViewDataHelperReadyState) {
        if (EzObject.isValid(ezScheduleViewDataHelperReadyState)) {
            let storeEzProcessReadyStateFlagsFunction = this.ezProcessReadyStateFlags;

            try {
                this.ezProcessReadyStateFlags = () => { return; };

                this.ezUserContextReady = EzBoolean.booleanOrFalse(ezScheduleViewDataHelperReadyState.ezUserContextReady);

                this.ezActiveEmployerReady = EzBoolean.booleanOrFalse(ezScheduleViewDataHelperReadyState.ezActiveEmployerReady);
            } finally {
                this.ezProcessReadyStateFlags = storeEzProcessReadyStateFlagsFunction;

                this.ezProcessReadyStateFlags();
            }
        }
    }

    /**
     * @protected @method
     * Processes the ready state flags and triggers the onReadyStateReady if all flags equal true.
     */
    ezProcessReadyStateFlags() {
        if (!this.ezReadyStateReadyEventTriggered && this.isReady && ezApi.ezclocker?.ezEventEngine) {
            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzScheduleViewDataHelperReadyState.ezEventNames.onReadyStateReady,
                this);

            this.ezReadyStateReadyEventTriggered = true;
        }
    }

    /**
     * @protected @method
     * If this instance was created with autoListenToEvents = true passed into the constructor.
     * When autoListentToEvents param is true and the ezApi.ezclocker.ezEventEngine and
     * ezApi.ezclocker.ezClockerContextEventName is available via ezApi then
     * the constructor will listen for the EzClockerContextEventName.onUserContextReady from EzClockerContext
     * to automaticlly set the ezUserContextReady boolean when triggered.
     */
    ezHookAutoListenEvents() {
        if (this.#ezAutoListenEventsHooked || !this.#ezAutoListenToEvents || !EzObject.isAvailableFromEzApi(EzEventEngine) ||
            !EzObject.isAvailableFromEzApi(EzClockerContextEventName)) {
            return;
        }

        // Have everything needed to listen to and trigger events
        this.#ezAutoListenEventsHooked = true;

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            this.#ezEventHandlerId,
            EzScheduleViewDataHelperReadyState.ezEventNames.onReadyStateReady);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onActiveAccountReady,
            this.#ezEventHandlerId,
            () => this.activeAccountReady = true,
            true);

        /*ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onUserContextReady,
            this.#ezEventHandlerId,
            () => this.activeAccountReady = true,
            true);*/

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onActiveEmployerReady,
            this.#ezEventHandlerId,
            () => this.ezActiveEmployerReady = true,
            true);
    }
}
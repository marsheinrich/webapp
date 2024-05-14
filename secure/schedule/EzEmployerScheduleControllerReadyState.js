import {
    EzObject,
    EzBoolean
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzClockerContextEventName
} from '/ezlibrary/enums/EzEnumerations.js';
import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzFeatureToggles } from '/ezlibrary/ez-feature-toggles2.js';

// import { EzScheduleViewDataHelper } from '/secure/schedule/EzScheduleViewDataHelper.js';

import { EzScheduleViewDataHelperReadyState } from '/secure/schedule/EzScheduleViewDataHelperReadyState.js';

/**
 * @class
 * @description
 * Stores the ready state flags for the EzEmployerScheduleController
 * ---------------------------------------------------------------------------
 * Import with:
 *  import { EzEmployerScheduleControllerReadyState } from '/secure/schedule/EzEmployerScheduleControllerReadyState.js';
 * ---------------------------------------------------------------------------
 * Listen to onReadyStateReady event:
 *  ezApi.ezclocker.ezEventEngine.ezWantEvent(
 *      EzEmployerScheduleControllerReadyState.ezEventNames.onReadyStateReady,
 *      {Class_Wanting_Event}.ezApiName,
 *      {Handler_Function_Reference});
 * ---------------------------------------------------------------------------
 */
export class EzEmployerScheduleControllerReadyState {
    /**
     * @static
     * @public @readonly @property
     * Gets a key/value object of event id = event name for all events triggered by this class.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReadyStateReady: 'ezOn_EzEmployerScheduleControllerReadyState_Ready'
        }
    }

    /**
     * @constructor
     * Creates a new instance of EzEmployerScheduleControllerReadyState.
     * If the ezApi.ezclocker.ezEventEngine is available and EzClockerContextEventName is available then
     * the constructor will listen for the EzClockerContextEventName.onUserContextReady from EzClockerContext]
     * and automaticlly set the ezUserContextReady boolean when triggered.
     */
    constructor(autoListenToEvents = true) {
        this.#ezEventHandlerId = `${this.constructor.name}_${ezApi.ezclocker.ezDateTime.ezNowAsIso()}`;

        this.#ezAutoListenToEvents = EzBoolean.booleanOrTrue(autoListenToEvents);

        this.ezHookAutoListenEvents();
    }

    #ezEventHandlerId = 'EzEmployerScheduleControllerReadyState';

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
     * Stores if the EzClockerContext's EzClockerContexEventName.onUserContextReady event was triggered one or more times.
     * @type {boolean}
     */
    #ezUserContextReady = false;
    /**
     * @public @property @getter
     * Gets if the EzClockerContext's EzClockerContexEventName.onUserContextReady event was triggered one or more times.
     * @returns {boolean}
     */
    get ezUserContextReady() {
        return this.#ezUserContextReady;
    }
    /**
     * @public @property @setter
     * Sets if the EzClockerContext's EzClockerContexEventName.onUserContextReady event was triggered one or more times.
     * @param {boolean} userContextReady
     */
    set ezUserContextReady(userContextReady) {
        this.#ezUserContextReady = EzBoolean.booleanOrFalse(userContextReady);

        this.ezProcessReadyStateFlags();
    }

    /**
     * @private @field
     * Stores if the EzScheduleViewDataHelper.ezEventNames.onScheduleEntitiesChanged event was triggered one or more times.
     * @type {boolean}
     */
    #scheduleEntitiesReady = false;
    /**
     * @public @property @getter
     * Gets if the EzScheduleViewDataHelper.ezEventNames.onScheduleEntitiesChanged event was triggered one or more times.
     * @returns {boolean}
     */
    get scheduleEntitiesReady() {
        return this.#scheduleEntitiesReady;
    }
    /**
     * @public @property @setter
     * Sets if the EzScheduleViewDataHelper.ezEventNames.onScheduleEntitiesChanged event was triggered one or more times.
     * @param {boolean} scheduleEntitiesReady
     */
    set scheduleEntitiesReady(scheduleEntitiesReady) {
        this.#scheduleEntitiesReady = EzBoolean.booleanOrFalse(scheduleEntitiesReady);

        this.ezProcessReadyStateFlags();
    }

    /**
     * @private @field
     * Stores if the EzScheduleViewDataHelper.ezEventNames.onTimeOffEntitiesChanged event has triggered or not.
     * @type {boolean}
     */
    #timeOffEntitiesReady = false;
    /**
     * @public @property @getter
     * Gets if the EzScheduleViewDataHelper.ezEventNames.onTimeOffEntitiesChanged event was triggered one or more times.
     * @returns {boolean}
     */
    get timeOffEntitiesReady() {
        return this.#timeOffEntitiesReady;
    }
    /**
     * @public @property @setter
     * Sets if the EzScheduleViewDataHelper.ezEventNames.onTimeOffEntitiesChanged event was triggered one or more times.
     * @param {boolean} timeOffEntitiesReady
     */
    set timeOffEntitiesReady(timeOffEntitiesReady) {
        this.#timeOffEntitiesReady = EzBoolean.booleanOrFalse(timeOffEntitiesReady);

        this.ezProcessReadyStateFlags();
    }

    /**
     * @private @field
     * Stores if the EzFeatureToggles.ezEventNames.onFeatureTogglesReady event was triggered one or more times.
     * @type {boolean}
     */
    #featureTogglesReady = false;
    /**
     * @public @property @getter
     * Gets
     * @returns {boolean}
     */
    get featureTogglesReady() {
        return this.#featureTogglesReady;
    }
    /**
     * @public @property @setter
     * Sets
     * @param {boolean} featureTogglesReady
     */
    set featureTogglesReady(featureTogglesReady) {
        this.#featureTogglesReady = EzBoolean.booleanOrFalse(featureTogglesReady);

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
     * @private @field
     * Stores if the EzScheduleViewDataHelperReadyState.onReadyStateReady event was triggered one or more times.
     * @type {boolean}
     */
    #ezScheduleViewDataHelperReady = false;
    /**
     * @public @property @getter
     * Gets if the EzScheduleViewDataHelperReadyState.onReadyStateReady event was triggered one or more times.
     * @returns {boolean}
     */
    get ezScheduleViewDataHelperReady() {
        return this.#ezScheduleViewDataHelperReady;
    }
    /**
     * @public @property @setter
     * Sets if the EzScheduleViewDataHelperReadyState.onReadyStateReady event was triggered one or more times.
     * @param {boolean} ezScheduleViewDataHelperReady
     */
    set ezScheduleViewDataHelperReady(ezScheduleViewDataHelperReady) {
        this.#ezScheduleViewDataHelperReady = EzBoolean.booleanOrFalse(ezScheduleViewDataHelperReady);

        this.ezProcessReadyStateFlags();
    }

    /**
     * @public @readonly @property
     * Determines if all ready state flags are true or not
     * @returns {boolean}
     */
    get isReady() {
        return EzBoolean.isTrue(
            //this.#ezUserContextReady &&
            // this.#activeAccountReady &&
            //this.#scheduleEntitiesReady &&
            //this.#timeOffEntitiesReady &&
            this.#featureTogglesReady &&
            this.#ezScheduleViewDataHelperReady);
    }

    /**
     * @public @method
     * Sets all properties from the matching properties on the provided ezEmployerScheduleControllerReadyState.
     * If the provided ezEmployerScheduleControllerReadyState is undefiend or null, no action is performed.
     * If the provided ezEmployerScheduleControllerReadyState is missing a property or the property is of the
     * wrong type then the default value is assigned instead.
     * @param {EzEmployerScheduleControllerReadyState}
     */
    ezLoadFrom(ezEmployerScheduleControllerReadyState) {
        if (!EzObject.isValid(ezEmployerScheduleControllerReadyState)) {
            return;
        }

        let storeEzProcessReadyStateFlagsFunction = this.ezProcessReadyStateFlags;

        try {
            this.ezProcessReadyStateFlags = () => { return; };

            //this.ezUserContextReady = EzBoolean.booleanOrFalse(ezEmployerScheduleControllerReadyState.ezUserContextReady);

            //this.activeAccountReady = EzBoolean.booleanOrFalse(ezEmployerScheduleControllerReadyState.activeAccountReady)

            //this.scheduleEntitiesReady = EzBoolean.booleanOrFalse(ezEmployerScheduleControllerReadyState.scheduleEntitiesReady);

            //this.timeOffEntitiesReady = EzBoolean.booleanOrFalse(ezEmployerScheduleControllerReadyState.timeOffEntitiesReady);

            this.featureTogglesReady = EzBoolean.booleanOrFalse(ezEmployerScheduleControllerReadyState.featureTogglesReady);

            this.ezScheduleViewDataHelperReady = EzBoolean.booleanOrFalse(ezEmployerScheduleControllerReadyState.ezScheduleViewDataHelperReady);
        } finally {
            this.ezProcessReadyStateFlags = storeEzProcessReadyStateFlagsFunction;

            this.ezProcessReadyStateFlags();
        }
    }

    /**
     * @protected @method
     * Processes the ready state flags and triggers the onReadyStateReady if all flags equal true.
     */
    ezProcessReadyStateFlags() {
        if (!this.#ezReadyStateReadyEventTriggered && this.isReady && ezApi.ezclocker?.ezEventEngine) {
            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                EzEmployerScheduleControllerReadyState.ezEventNames.onReadyStateReady,
                this);

            this.#ezReadyStateReadyEventTriggered = true;
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
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            this.#ezEventHandlerId,
            EzEmployerScheduleControllerReadyState.ezEventNames.onReadyStateReady,
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzScheduleViewDataHelperReadyState.ezEventNames.onReadyStateReady,
            this.#ezEventHandlerId,
            () => this.ezScheduleViewDataHelperReady = true,
            true);

        /*ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onActiveAccountReady,
            this.#ezEventHandlerId,
            () => this.activeAccountReady = true,
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onUserContextReady,
            this.#ezEventHandlerId,
            () => this.ezUserContextReady = true,
            true);*/

        /*ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzScheduleViewDataHelper.ezEventNames.onScheduleEntitiesChanged,
            this.#ezEventHandlerId,
            () => this.scheduleEntitiesReady = true,
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzScheduleViewDataHelper.ezEventNames.onTimeOffEntitiesChanged,
            this.#ezEventHandlerId,
            () => this.timeOffEntitiesReady = true,
            true);*/

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzFeatureToggles.ezEventNames.onFeatureTogglesReady,
            this.#ezEventHandlerId,
            () => this.featureTogglesReady = true,
            true);

        this.#ezAutoListenEventsHooked = true;
    }
}
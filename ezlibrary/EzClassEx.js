import { EzException } from '/ezlibrary/exceptions/EzExceptions.js';

/**
    An extended base class for ezClocker Javascript classes.
    NOTE: Extend from EzClass in nearly ALL cases, this class is not ready for consumption yet.
 */
export class EzClassEx {
    /**
        @public @consructor
     */
    constructor(requiredApiClasses) {
        // Validate esApiName static field is available
        if (!Object.prototype.hasOwnProperty.call(this.constructor, 'ezApiName')) {
            throw new EzException(
                'All classes extending EzClass must implement the static string field ezApiName ' +
                'equal to a valid string.');
        }
        if (!Object.prototype.hasOwnProperty.call(this.constructor, 'ezInstance')) {
            throw new EzException(
                'All classes extending EzClass must provide a static field named ezInstance.');
        }
        if (!Object.prototype.hasOwnProperty.call(this.constructor, 'ezApiRegistrationState')) {
            throw new EzException(
                'All classes extending EzClass must provide a static field named ezApiRegistrationState.');
        }

        // Add the onReady event name if it is missing.
        this.constructor.ezApiName = this.constructor.ezApiName || {
            onReady: `ezOn_${this.constructor.ezApiName}`
        };

        // Process any required classes provided
        if (requiredApiClasses && 'object' !== typeof requiredApiClasses &&
            'Array' !== requiredApiClasses.constructor.name) {
            for (let apiClazz of requiredApiClasses) {
                // Filtering any api classes that do not have static ezApiName or ezEventNames with the onReady event name.
                let apiName = apiClazz.ezApiName;
                let eventNames = apiClazz.ezEventNames;
                if (apiName && 'string' === apiName && 0 < apiName &&
                    eventNames && 'object' === typeof eventNames && eventNames.onReady &&
                    'string' === typeof eventNames.onReady && 0 < eventNames.onReady.length) {
                    this.#ezRequiredApiClasses.push(apiClazz);
                }
            }
        }

        this.#ezStates.push('CONSTRUCTED');

        this.constructor.ezApiRegistrationState = 'PENDING';

        if (!this.#ezRegisterWithEzApi()) {
            this.#ezHookRequiredApiReadyEvents();
        }
    }

    #ezRequiredApiClasses = [];

    #ezCanRegister() {
        if (!Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') ||
            !globalThis.ezApi || !globalThis.ezApi.ready) {
            return false;
        }

        if (0 < this.#ezRequiredApiClasses.length) {
            for (let apiClazz of this.#ezRequiredApiClasses) {
                if (!ezApi.ezclocker[apiClazz.ezApiName] || !ezApi.ezclocker[apiClazz.ezApiName].ready) {
                    // A dependency is not ready yet
                    return false;
                }
            }
        }

        return true;
    }

    #ezRegisterWithEzApi() {
        if (!this.#ezCanRegister()) {
            return false;
        }

        this.constructor.ezInstance = ezApi.ezRegisterNewApi(
            this.constructor,
            this.constructor.ezApiName);

        this.constructor.ezApiRegistrationState = 'REGISTERED';

        this.#ezClearHookedRequiredApiReadyEvents();
        this.#ezRequiredApiClasses = null;

        return true;
    }

    #ezHookRequiredApiReadyEvents() {
        if (!globalThis.document) {
            // No document object to add events to
            return;
        }

        globalThis.document.addEventListener(
            'ezOn_EzApi_Ready',
            this.#ezRegisterWithEzApi);

        if (0 < this.#ezRequiredApiClasses.length) {
            for (let apiClazz of this.#ezRequiredApiClasses) {
                globalThis.document.addEventListener(
                    apiClazz.ezEventNames.onReady,
                    this.#ezRegisterWithEzApi);
            }
        }
    }

    #ezClearHookedRequiredApiReadyEvents() {
        if (!globalThis.document) {
            // No document object to remvoe events from
            return;
        }

        globalThis.document.removeEventListener(
            'ezOn_EzApi_Ready',
            this.#ezRegisterWithEzApi);

        if (0 < this.#ezRequiredApiClasses.length) {
            for (let apiClazz of this.#ezRequiredApiClasses) {
                globalThis.document.removeEventListener(
                    apiClazz.ezEventNames.onReady,
                    this.#ezRegisterWithEzApi);
            }
        }
    }

    /**
        @public @property
        Stores if this class is ready to use
    */
    #ready = false;

    /**
        @public @property
        Stores the EzInstanceStates for this instance
    */
    #ezStates = [];

    /**
        @public @method
        Returns if this instance is ready to use
        @returns {boolean}
    */
    get ready() {
        return this.#ready;
    }

    /**
        @protected @method
        Sets if this instance is ready to use
        @param {boolean} aReady
     */
    set ready(aReady){
        this.#ready = aReady;
    }

    /**
        @public @method
        Returns this instance's states
        @returns {array}
     */
    get ezStates() {
        return this.#ezStates;
    }

    /**
        @public @method
        Sets this instance's states
        @returns {array}
     */
    set ezStates(states) {
        this.#ezStates = states;
    }
}

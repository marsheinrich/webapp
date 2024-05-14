/**
    Base class for ezClocker Enumerations
    @deprecated
    Stop all use of this - enumerations will no longer register with ezApi.
 */
export class EzEnum {
    static get UNKNOWN() {
        return 'UNKNOWN';
    }

    /**
        @public @consructor
     */
    constructor() {
        this.#ezStates.push('CONSTRUCTED');
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
        if (globalThis.console) {
            if (this.#ready) {
                globalThis.console.debug(
                    `[Enumeration ${this.constructor.name}: READY]`);
            } else {
                globalThis.console.debug(
                    `[Enumeration ${this.constructor.name}: NOT READY YET]`);
            }
        }

        return this.#ready;
    }

    /**
        @protected @method
        Sets if this instance is ready to use
        @param {boolean} aReady
     */
    set ready(aReady){
        if ('boolean' !== typeof aReady) {
            return;
        }

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
        if (!states || 'object' !== typeof states || 'Array' !== states.constructor.name) {
            return;
        }

        if (globalThis.console) {
            globalThis.console.debug(
                `[Enumeration ${this.constructor.name}: ezStates Updated (${JSON.stringify(this.#ezStates)})]`);
        }

        this.#ezStates = states;
    }
}

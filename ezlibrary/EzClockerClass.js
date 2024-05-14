import { EzInstanceState } from '/ezlibrary/EzInstanceState.js';

/**
    Base class for other classes that will need to register for ezApi
 */
export default class EzClockerClass {
    /** @private @property */
    #ready = false;

    /** @private @property */
    #ezStates = [];

    /**
        @public @method
        Getter for the ready property.
        @returns {boolean}
     */
    get ready() {
        return this.#ready;
    }

    /**
        @public @method
        Setter for the ready property.
        @param {boolean}
     */
    set ready(ready) {
        this.#ready = ready;
    }

    /**
        @public @method
        Getter for the ezStates property.
        @param {boolean}
     */
    get ezStates() {
        return this.#ezStates;
    }

    /**
        @public @constructor
        Creates a new instance of EzClockerClass
     */
    constructor() {
        this.ezStates.push(EzInstanceState.CONSTRUCTED);
    }

    /**
        @public
        Initializes the EzClockerClass
        @returns {this}
     */
    ezInit() {
        return this;
    }

    /**
        @public @method
        Adds an EzInstanceState to the ezStates array.
        @param {EzInstanceState} ezInstanceState
     */
    ezAddInstanceState(ezInstanceState) {
        EzInstanceState.ezAddStage(this.#ezStates, ezInstanceState);
    }

    /**
        @public @method
        Removes an EzInstanceState from the ezStates array
        @param {EzInstanceState} ezInstanceStateToRemove
     */
    ezRemoveInstanceState(ezInstanceStateToRemove) {
        EzInstanceState.ezAddStage(this.#ezStates, ezInstanceStateToRemove);
    }
}
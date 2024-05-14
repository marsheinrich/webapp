import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzString
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzStaticClass } from '/ezlibrary/EzStaticClass.js';

/**
 * @class
 * @description
 * Stores states by id state of the ezClocker website.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *      import { EzStateTracker } from '/ezlibrary/EzStateTracker.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Access via static method and properties only.
 */
export class EzStateTracker extends EzStaticClass {
    /**
     * @static
     * @private @field
     * Stores the current ezClocker State Properties
     * @type {object}
     */
    static #ezCurrentState = {
        initIso: moment().format(),
        updatedIso: moment().format()
    };

    /**
     * @static
     * @public @method
     * Updates a specific property on the state assocaited with the provided stateName.
     * The stored state must be an object, otherwise the saveStateProp call will not save any information.
     * @param {string} stateName
     * @param {string} propName
     * @param {*} propValue
     * @returns {*}
     * Returns the provided propValue
     */
    static saveStateProp(stateName, propName, propValue = null) {
        if (!EzString.hasLength(stateName)) {
            throw new EzBadParamException(
                'stateName',
                EzStateTracker,
                EzStateTracker.saveStateProp);
        }
        if (!EzString.hasLength(propName)) {
            throw new EzBadParamException(
                'stateName',
                EzStateTracker,
                EzStateTracker.saveStateProp);
        }

        let stateValue = this.#ezCurrentState?.[stateName];

        if (stateValue && !EzString.isString(stateValue) && !EzNumber.isNumber(stateValue) && !EzArray.isArray(stateValue)) {
            stateValue[propName] = propValue;

            return propValue;
        }

        return propValue;
    }



    /**
     * @static
     * @public @method
     * Saves value of statValue for the state named stateName.
     * @param {string} stateName
     * @param {*} stateValue
     * @returns {boolean}
     */
    static saveState(stateName, stateValue) {
        if (!EzString.hasLength(stateName)) {
            throw new EzBadParamException(
                stateName,
                EzStateTracker,
                EzStateTracker.saveState);
        }

        this.#ezCurrentState[stateName] = stateValue;

        this.#ezCurrentState.updatedIso = moment().format();
    }

    /**
     * @static
     * @public @method
     * Returns the state value of for the provided stateName
     * @param {string} stateName
     * @returns {boolean}
     */
    static readState(stateName) {
        if (!EzString.hasLength(stateName)) {
            throw new EzBadParamException(
                stateName,
                EzStateTracker,
                EzStateTracker.saveState);
        }

        return this.#ezCurrentState[stateName];
    }

    /**
     * @static
     * @public @method
     * Determines if the provided stateName exists in the EzStateTracker.
     * @param {string} stateName
     * @returns {boolean}
     */
    static hasState(stateName) {
        if (!EzString.hasLength(stateName)) {
            throw new EzBadParamException(
                stateName,
                EzStateTracker,
                EzStateTracker.saveState);
        }

        return undefined != this.#ezCurrentState?.[stateName];
    }

    /**
     * @static
     * @public @method
     * Returns the current state as a basic JSON object.
     * @returns {object}
     */
    static toJson() {
        return EzJson.toJson(this.#ezCurrentState);
    }

    /**
     * @static
     * @public @method
     * Loads the provided JSON state state into the ezCurrentState
     * @returns {object}
     */
    static fromJson(stateJson) {
        if (!EzString.hasLength(stateJson)) {
            ezApi.ezclocker.ezLogger.warn('Cannot load state from an empty JSON string.');

            return;
        }

        let stateJsonObject = EzJson.fromJson(stateJson);

        if (EzObject.isValid(stateJsonObject) && !EzString.isString(stateJsonObject)) {
            for (let stateProp in stateJsonObject) {
                if (EzString.hasLength(stateProp)) {
                    this.#ezCurrentState[stateProp] = EzObject.assignOrUndefined(stateJsonObject?.[stateProp]);
                }
            }
        }

        return EzJson.toJson(this.#ezCurrentState);
    }

    /**
     * @public @constructor
     * DO NOT CREATE INSTANCES OF EzStateTracker
     */
    constructor() {
        throw new EzException('Do not create new instances of EzStateTracker. Acceses only static properties and methods.');
    }
}
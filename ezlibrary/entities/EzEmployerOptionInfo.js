import {
    EzObject,
    EzString
} from '/ezlibrary/helpers/EzHelpers.js';

/**
 * @class
 * @description
 * Stores additional information for EzEmployerOption enumeration properties
 * -----------------------------------------------------------------
 * Import with:
 *  import { EzEmployerOptionInfo } from '/ezlibrary/entities/EzEmployerOptionInfo.js';
 * -----------------------------------------------------------------
 */
export class EzEmployerOptionInfo {
    /**
     * @public
     * @constructor
     * Creates a new instance of EzEmployerOptionInfo
     * @param {string} employerOptionId
     * @param {string} defaultValue
     * @param {*} defaultTypedValue
     */
    constructor(employerOptionId, defaultValue, defaultTypedValue) {
        this.ezEmployerOptionId = employerOptionId;
        this.ezDefaultValue = defaultValue;
        this.ezDefaultTypedValue = defaultTypedValue;
    }

    /**
     * @private @field
     * Stores the employer options id (key name stored in db)
     * @type {string}
     */
    #employerOptionId = '';
    /**
     * @public @property @getter
     * Gets the employer options id (key name stored in db)
     * @returns {string}
     * Default: ''
     */
    get employerOptionId() {
        return this.#employerOptionId;
    }
    /**
     * @public @property @setter
     * Sets the employer options id (key name stored in db)
     * @param {string} employerOptionId
     */
    set employerOptionId(employerOptionId) {
        this.#employerOptionId = EzString.stringOrEmpty(employerOptionId);
    }

    /**
     * @private @field
     * Stores the default string value for the option (option value stored in db is always a string)
     */
    #ezDefaultValue = '0';
    /**
     * @public @property @getter
     * Gets the default string value for the option (option value stored in db is always a string)
     * @returns {string}
     */
    get ezDefaultValue() {
        return this.#ezDefaultValue;
    }
    /**
     * @public @property @setter
     * Sets the default string value for the option (option value stored in db is always a string)
     * @param {string} ezDefaultValue
     * Default: ''
     */
    set ezDefaultValue(ezDefaultValue) {
        this.#ezDefaultValue = EzString.stringOrEmpty(ezDefaultValue);
    }

    /**
     * @private @field
     * Stores the default value it the correct type for the option
     */
    #ezDefaultTypedValue = false;
    /**
     * @public @property @getter
     * Gets the default value it the correct type for the option
     * @returns {*}
     */
    get ezDefaultTypedValue() {
        return this.#ezDefaultTypedValue;
    }
    /**
     * @public @property @setter
     * Sets the default value it the correct type for the option
     * @param {*} ezDefaultTypedValue
     * Default: false
     */
    set ezDefaultTypedValue(ezDefaultTypedValue) {
        this.#ezDefaultTypedValue = EzObject.assignOrDefault(ezDefaultTypedValue, false);
    }
}
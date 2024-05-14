/**
 * @class
 * @extends {EzEnumeration2}
 * @description
 * Defines the available billing cycles for subscriptions
 * ------------------------------------------------------------------
 * Import into non-enumeration classes with:
 *      import {
 *          EzEnumerationProperty 
 *      } from '/ezlibrary/enums/EzEnumerations.js';
 * ------------------------------------------------------------------
 * Import into other enumeration classes or classes that cannot
 * import EzEnumerations:
 *      import { EzBillingCycle } from '/ezlibrary/enums/EzBillingCycle.js';
 * ------------------------------------------------------------------
 */
export class EzBillingCycle extends EzEnumeration2 {
    /**
     * @private @field
     * Stores the singleton instance of this enumeration class.
     * @type {MyEnumerationClass}
     */
    static #ezEnumerationSingleton = null;

    /**
     * @static
     * Static Initialization
     */
    static {
        if (null == MyEnumerationClass.#ezEnumerationSingleton) {
            MyEnumerationClass.#ezEnumerationSingleton = new MyEnumerationClass(
                // Enum property names
                [
                    'UNKNOWN',
                    'ENUM_PROP_NAME_1',
                    'ENUM_PROP_NAME_2',
                    'ENUM_PROP_NAME_3'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                null,
                // Optional array of additional data for eac enumeration property.
                // Enter null if not needed.
                null);
        }
    }

    /**
     * @public @constructor
     * >> DO NOT CREATE NEW INSTANCES <<
     * The static initializer will create a singleton instance that injects the static properties and methods
     * that you then use to access enumeration values.
     */
    constructor(name, value, optionalData) {
        super(name, value, optionalData);
    }
}
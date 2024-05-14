import {EzEnumeration2} from "./EzEnumeration2";

export class EzPayPeriod extends EzEnumeration2 {

    /**
     @private @field
     Stores the singleton instance of this enumeration class.
     @type {EzPayPeriod}
     */
    static #ezEnumerationSingleton = null;

    /**
     @static
     Static Initialization
     */
    static {
        if (null == EzPayPeriod.#ezEnumerationSingleton) {
            EzPayPeriod.#ezEnumerationSingleton = new EzPayPeriod(
                // Enum property names
                [
                    'NONE',
                    'WEEKLY',
                    'BIWEEKLY',
                    'MONTHLY',
                    'UNKNOWN'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                [
                    0,
                    7,
                    14,
                    30,
                    99
                ],
                // Optional array of additional data for eac enumeration property.
                // Enter null if not needed.
                null);
        }
    }

    /**
     @public @constructor
     The static initializer will create a singleton instance that injects the static properties and methods
     that you then use to access enumeration values.
     */
    constructor(name, value, optionalData) {
        super(name, value, optionalData);
    }


}
import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

/**
    EzEntityType enumeration for use with EzDataMap records
    ---------------------------------------------------------------------------
    Import with:
        import { EzEntityType } from '/ezlibrary/enums/EzEntityType.js';
    ---------------------------------------------------------------------------
    Import with other enumerations:
        import {
            ... <other enumerations> ...,
            EzEntityType
        } from '/ezlibrary/enums/EzEnumerations.js';
    ---------------------------------------------------------------------------
 */
export class EzEntityType extends EzEnumeration2 {
    /**
        @private @field
        Stores the singleton instance of this enumeration class.
        @type {EzEntityType}
     */
    static #ezEnumerationSingleton = null;

    /**
        @static
        Static Initialization
     */
    static {
        if (null == EzEntityType.#ezEnumerationSingleton) {
            EzEntityType.#ezEnumerationSingleton = new EzEntityType(
                // Enum property names
                [
                    'UNKNOWN',
                    'TIME_ENTRY',
                    'EMPLOYEE'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                null,
                // Optional array of additional data for eac enumeration property.
                // Enter null if not needed.
                null);
        }
    }
}

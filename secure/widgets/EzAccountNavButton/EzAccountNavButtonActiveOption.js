import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';


/**
    @class
    @extends {EzEnumeration2}
    @description
    Defines the known feature toggle ids
    ---------------------------------------------------------------------------
    Import into non-enumeration classes with:
        import {
            // < other enumeration classes ... >
            EzAccountNavButtonActiveOption
        } from '/ezlibrary/enums/EzEnumerations.js';
    ---------------------------------------------------------------------------
    Import into non-enumeration classes with:
        import { EzAccountNavButtonActiveOption } from '/secure/widgets/EzAccountNavButton/EzAccountNavButtonActiveOption.js';
    ---------------------------------------------------------------------------
    Access static method/properties only:
        EzAccountNavButtonActiveOption.{property or method name}
    ---------------------------------------------------------------------------
 */
export class EzAccountNavButtonActiveOption extends EzEnumeration2 {
    /**
        @private @field
        Stores the singleton instance of this enumeration class.
        @type {EzAccountNavButtonActiveOption}
     */
    static #ezEnumerationSingleton = null;

    /**
        @static
        Static Initialization
     */
    static {
        if (null == EzAccountNavButtonActiveOption.#ezEnumerationSingleton) {
            EzAccountNavButtonActiveOption.#ezEnumerationSingleton = new EzAccountNavButtonActiveOption(
                // Enum property names
                [
                    'UNKNOWN',
                    'ACCOUNT_OPTION',
                    'ACCOUNT_DETAILS_OPTION',
                    'ACCOUNT_INTEGRATIONS_OPTION',
                    'ACCOUNT_TIME_OFF_OPTION'
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

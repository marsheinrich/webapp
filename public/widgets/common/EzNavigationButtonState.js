import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

/**
    TODO: Move to /ezlibrary/enums/EzNavigationButtonState.js
    Represents the state of a navigation button.
    Import with:
        import { EzNavigationButtonState } from '/public/widgets/common/EzNavigationButtonState.js';
 */
export class EzNavigationButtonState extends EzEnumeration2 {
    /**
        @private @field
        Stores the singleton instance of this enumeration class.
        @type {EzRegistrationState}
     */
    static #ezEnumerationSingleton = null;

    /**
        @static
        Static Initialization
     */
    static {
        if (null == EzNavigationButtonState.#ezEnumerationSingleton) {
            EzNavigationButtonState.#ezEnumerationSingleton = new EzNavigationButtonState(
                // Enum property names
                [
                    'SELECTED',
                    'UNSELECTED'
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

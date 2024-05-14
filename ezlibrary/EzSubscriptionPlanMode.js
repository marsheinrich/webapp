import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

/**
    @class
    @extends {EzEnum}
    @description
    Represents the available subscription plan viewing modes
    ---------------------------------------------------------------------------
    Import in non-enumeration classes with:
        import {
            // other enumeration classes ...
            EzSubscriptionPlanMode
        } from '/ezlibrary/enums/EzEnumerations.js';
    ---------------------------------------------------------------------------
    Import into enumeration classes with:
        import { EzSubscriptionPlanMode } from '/ezlibrary/EzSubscriptionPlanMode.js';
    ---------- -------------------------------------------------------
    Access static reference:
        Inside class: EzSubscriptionPlanMode.{method or property}
        Outside of class: EzSubscriptionPlanMode.{method or property}
    -----------------------------------------------------------------
 */
export class EzSubscriptionPlanMode extends EzEnumeration2 {
    /**
        @private @field
        Stores the singleton instance of this enumeration class.
        @type {EzSubscriptionPlanMode}
     */
    static #ezEnumerationSingleton = null;

    /**
        @static
        Static Initialization
     */
    static {
        if (null == EzSubscriptionPlanMode.#ezEnumerationSingleton) {
            EzSubscriptionPlanMode.#ezEnumerationSingleton = new EzSubscriptionPlanMode(
                // Enum property names
                [
                    'UNKNOWN',
                    'MONTHLY',
                    'YEARLY'
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
        @public @constructor
        >> DO NOT CREATE NEW INSTANCES <<
        The static initializer will create a singleton instance that injects the static properties and methods
        that you then use to access enumeration values.
     */
    constructor(name, value, optionalData) {
        super(name, value, optionalData);
    }
}

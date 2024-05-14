import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

/**
    @class
    @extends {EzEnumeration2}
    Enumeration representing the ezApi registration state of an ezClocker class.
    ---------------------------------------------------------------------------
    Import into non-enumeration classes with:
        import {
            // ... other enumeration classes ...
            EzRegistrationState
        } from '/ezlibrary/enums/EzEnumerations.js';
    ---------------------------------------------------------------------------
    Import into other enumeration classes with:
        import { EzRegistrationState } from '/ezlibrary/enums/EzRegistrationState.js';
    ---------------------------------------------------------------------------
    Static access only with:
        EzRegistrationState.{property or method}
    ---------------------------------------------------------------------------
 */
export class EzRegistrationState extends EzEnumeration2 {
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
        if (null == EzRegistrationState.#ezEnumerationSingleton) {
            EzRegistrationState.#ezEnumerationSingleton = new EzRegistrationState(
                // Enum property names
                [
                    'UNKNOWN',
                    'NOT_REGISTERED',
                    'PENDING',
                    'REGISTERED'
                ],
                // Enum property values (use default (enum property names array))
                null,
                // Enum property optional data (use detail)
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

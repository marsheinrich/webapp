import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

/**
    @class
    @extends {EzEnumeration2}
    @description
    Javascript enumeration class equivlant to GpsDataStatus.java
    ---------------------------------------------------------------------
    >>> IMPORTANT <<<
    Changes made to this class will also need made to the Java
    class com.eznova.common.enumerations.GpsDataStatus.java.
    ---------------------------------------------------------------------
    Import with:
        import { EzGpsDataStatus } from '/ezlibrary/EzGpsDataStatus.js';
    ---------------------------------------------------------------------
    Import with the following if importing more than one enumeration class:
        import {
            <... other enumeration classes ...>
            EzGpsDataStatus
        } from '/ezlibrary/enums/EzEnumerations.js';
    ---------------------------------------------------------------------
 */
export class EzGpsDataStatus extends EzEnumeration2 {
    /**
        @private @field
        Stores the singleton instance of this enumeration class.
        @type {EzGpsDataStatus}
     */
    static #ezEnumerationSingleton = null;

    /**
        @static
        Static Initialization
     */
    static {
        if (null == EzGpsDataStatus.#ezEnumerationSingleton) {
            EzGpsDataStatus.#ezEnumerationSingleton = new EzGpsDataStatus(
                // Enum property names
                [
                    'UNKNOWN',
                    'NONE',
                    'NOT_SUPPORTED',
                    'ACTIVE',
                    'DISABLED',
                    'UNRELIABLE',
                    'NOT_AVAILABLE'
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

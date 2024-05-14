import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

/**
    @class
    @extends {EzEnumeration2}
    @description
    Javascript enumeration for Java's EzDataTagType
    ---------------------------------------------------------------------
    Import with:
        import { Ez
        DataTagType } from '/ezlibrary/enums/EzDataTagType.js';
    ---------------------------------------------------------------------
    Import with other enumeration classes with:
    Import with:
        import {
            < ... other enumeration classes ... >
            EzDataTagType
        } from '/ezlibrary/enums/EzEnumerations.js';
 */
export class EzDataTagType extends EzEnumeration2 {
    /**
        @private @field
        Stores the singleton instance of this enumeration class.
        @type {EzDataTagType}
     */
    static #ezEnumerationSingleton = null;

    /**
        @static
        Static Initialization
     */
    static {
        if (null == EzDataTagType.#ezEnumerationSingleton) {
            EzDataTagType.#ezEnumerationSingleton = new EzDataTagType(
                // Enum property names
                [
                    'UNKNOWN',
                    'JOB_CODE',
                    'NOTE'
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

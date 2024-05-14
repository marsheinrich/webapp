import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

/**
    @class
    @extends {EzEnumeration2}
    @description
    Defines character encoding ids
    ---------------------------------------------------------------------------
    Import all with:
        import {
            < ... other enumerations ... >,
            EzCharacterEncoding
        } from '/ezlibrary/enums/EzEnumerations.js';
    ---------------------------------------------------------------------------
 */
export class EzCharacterEncoding extends EzEnumeration2 {
    /**
        @private @field
        Stores the singleton instance of this enumeration class.
        @type {EzCharacterEncoding}
     */
    static #ezEnumerationSingleton = null;

    /**
        @static
        Static Initialization
     */
    static {
        if (null == EzCharacterEncoding.#ezEnumerationSingleton) {
            EzCharacterEncoding.#ezEnumerationSingleton = new EzCharacterEncoding(
                // Enum property names
                [
                    'UNKNOWN',
                    'UTF-8',
                    'ASCII',
                    'ANSI',
                    '8859'
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

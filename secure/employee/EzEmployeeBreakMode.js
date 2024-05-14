import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

/**
    @class
    @extends {EzEnumeration2}
    @description
    Represents the employee's break mode in the UX
    ---------------------------------------------------------------------
    Import with:
        import { EzEmployeeBreakMode } from '/secure/javascript/employeeDashboard/EzEmployeeBreakMode.js';
    ---------------------------------------------------------------------
    Import with other enumerations:
        import {
            <... other enumerations ..>
            EzEmployeeBreakMode
        } from '/ezlibrary/enums/EzEnumerations.js';
    ---------------------------------------------------------------------
 */
export class EzEmployeeBreakMode extends EzEnumeration2 {
    /**
        @private @field
        Stores the singleton instance of this enumeration class.
        @type {EzEmployeeBreakMode}
     */
    static #ezEnumerationSingleton = null;

    /**
        @static
        Static Initialization
     */
    static {
        if (null == EzEmployeeBreakMode.#ezEnumerationSingleton) {
            EzEmployeeBreakMode.#ezEnumerationSingleton = new EzEmployeeBreakMode(
                // Enum property names
                [
                    'UNKNOWN',
                    'CLOCK_IN',
                    'START_BREAK',
                    'END_BREAK'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                null,
                // Optional array of additional data for eac enumeration property.
                // Enter null if not needed.
                [
                    {
                        display: ''
                    },
                    {
                        display: 'Clock In'
                    },
                    {
                        display: 'Start Break'
                    },
                    {
                        display: 'End Break'
                    }
                ]);
        }
    }

    /**
        @static
        @public @method
        Returns the display name value for the provied enumPropertyNameOrValue
        @param {string} enumPropertyNameOrValue
        @returns {string}
     */
    static ezToDisplayName(enumPropertyNameOrValue) {
        return EzEmployeeBreakMode.ezEnumData(enumPropertyNameOrValue).display;
    }

    /**
        @static
        @public @method
        Returns the display value (aka display name) for the provied enumPropertyNameOrValue
        @param {string} enumPropertyNameOrValue
        @returns {string}
        @deprecated
        Migrate to: EzEmployeeBreakMode.ezToDisplayName(enumPropertyNameOrValue)
     */
    static ezToDisplayValue(enumPropertyValue) {
        return EzEmployeeBreakMode.ezEnumData(enumPropertyValue).display;
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

import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

/**
    @class
    @extends {EzEnumeration2}
    @description
    Defines the different modes of the employee dashboard
    ---------------------------------------------------------------------
    Import with:
        import { EzEmployeeDashboardMode } from '/ezlibrary/enums/EzEmployeeDashboardMode.js';
    ---------------------------------------------------------------------
    Import with other enumerations:
        import {
            EzEmployeeDashboardMode,
            ... other enumerations ...
        } from '/ezlibrary/enums/EzEnumerations.js';
    ---------------------------------------------------------------------
 */
export class EzEmployeeDashboardMode extends EzEnumeration2 {
    /**
        @private @field
        Stores the singleton instance of this enumeration class.
        @type {EzEmployeeDashboardMode}
    */
    static #ezEnumerationSingleton = null;

    /**
        @static
        Static Initialization
     */
    static {
        if (null == EzEmployeeDashboardMode.#ezEnumerationSingleton) {
            EzEmployeeDashboardMode.#ezEnumerationSingleton = new EzEmployeeDashboardMode(
                // Enum property names
                [
                    'UNKNOWN',
                    'EMPLOYEE',
                    'PERSONAL'
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

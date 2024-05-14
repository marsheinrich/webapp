import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

export class EzFeatureToggleViewName extends EzEnumeration2 {
    /**
        @private @field
        Stores the singleton instance of this enumeration class.
        @type {EzFeatureToggleViewName}
     */
    static #ezEnumerationSingleton = null;

    /**
        @static
        Static Initialization
     */
    static {
        if (null == EzFeatureToggleViewName.#ezEnumerationSingleton) {
            EzFeatureToggleViewName.#ezEnumerationSingleton = new EzFeatureToggleViewName(
                // Enum property names
                [
                    'UNKNOWN',
                    'employeeSchedule',
                    'employerSchedule',
                    'employerDashboard',
                    'account',
                    'ezEmployerTimeOffView',
                    'ezEmployeeTimeOffView',
                    'ezTeamChatDialog'
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

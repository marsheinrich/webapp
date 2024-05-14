import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

/**
    @class
    @extends {EzEnumeration2}
    @description
    Defines the known feature toggle ids
    ---------------------------------------------------------------------------
    Import with:
        import {
            < other enumeration classes ... >,
            EzFeatureToggleId
        } from '/ezlibrary/enums/EzEnumerations.js';
    ---------------------------------------------------------------------------
    Static Instance Name:
        EzFeatureToggleId
    ---------------------------------------------------------------------------
 */
export class EzFeatureToggleId extends EzEnumeration2 {
    /**
        @private @field
        Stores the singleton instance of this enumeration class.
        @type {EzFeatureToggleId}
     */
    static #ezEnumerationSingleton = null;

    /**
        @static
        Static Initialization
     */
    static {
        if (null == EzFeatureToggleId.#ezEnumerationSingleton) {
            EzFeatureToggleId.#ezEnumerationSingleton = new EzFeatureToggleId(
                // Enum property names
                [
                    'UNKNOWN',
                    'ezfTeamChat',
                    'ezfEZOPTION_REQUIRE_LOCATION_FOR_CLOCKINOUT',
                    'ezfIntegrations',
                    'ezScheduleDrivenClockIn',
                    'ezfEZOPTION_ALLOW_RECORDING_OF_UNPAID_BREAKS',
                    'ezfEZOPTION_ALLOW_AUTOMATIC_BREAKS',
                    'ezfEZOPTION_NOTIFY_EMPLOYER_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT',
                    'ezfEZOPTION_NOTIFY_EMPLOYEE_MISSED_CLOCK_IN_CLOCK_OUT',
                    'ezfEZOPTION_ALLOW_EMPLOYEES_TO_SEE_COWORKER_SCHEDULES',
                    'ezfEZOPTION_ALLOW_TIME_OFF_REQUESTS',
                    'ezRoundClockInClockOut',
                    'ezfTimeOff',
                    'ezfActiveTimeZoneDisplay',
                    'JOBS',
                    'ezfEmployePdfReport',
                    'ezfPublishSchedule',
                    'ezfExportSchedule'
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

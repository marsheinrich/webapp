import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

/**
    @class
    @extends {EzEnumeration2}
    @description
    Enumeration object definining the known Amplitude event ids.
    ---------------------------------------------------------------------------
    Import with:
        import { EzAmplitudeIntegrationEventId } from '/ezlibrary/analytics_metrics/amplitude/EzAmplitudeIntegrationEventId.js';
    ---------------------------------------------------------------------------
 */
export class EzAmplitudeIntegrationEventId extends EzEnumeration2 {
    /**
        @private @field
        Stores the singleton instance of this enumeration class.
        @type {MyEnumerationClass}
     */
    static #ezEnumerationSingleton = null;

    /**
        @static
        Static Initialization
     */
    static {
        if (null == EzAmplitudeIntegrationEventId.#ezEnumerationSingleton) {
            EzAmplitudeIntegrationEventId.#ezEnumerationSingleton = new EzAmplitudeIntegrationEventId(
                // Enum property names
                [
                    'UNKNOWN',
                    'EMPLOYER_SIGN_UP',
                    'EMPLOYER_VIEW_SCHEDULES'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                null,
                // Optional array of additional data for eac enumeration property.
                // Enter null if not needed.
                [
                    {
                        url: window.location
                    },
                    // EMPLOYER_SIGN_UP
                    {
                        url: window.location,
                        companyName: 'n/a',
                        username: 'n/a',
                        result: 'n/a',
                        response: null
                    },
                    // EMPLOYER_VIEW_SCHEDULES
                    {
                        url: window.location,
                        userId: 'n/a',
                        username: 'n/a',
                        primaryRole: 'n/a',
                        employerId: 'n/a',
                        employerName: 'n/a',
                        firstDayOfWeek: 'n/a',
                        scheduleSelectedDateIso: 'n/a'
                    }
                ]);
        }
    }

    /**
        @public @readonly @property
        Returns the amplitude event properties for the provided amplitudeEventId
        @returns {object}
     */
    static ezGetAmplitudePropertiesForEventId(amplitudeEventId) {
        return EzAmplitudeIntegrationEventId.ezEnumData(amplitudeEventId);
    }
}

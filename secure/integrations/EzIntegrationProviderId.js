import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

/**
    @class
    @extends {EzEnumeration2}
    @description
    Javascript enumeration equivlant of Java's enumeration class EzIntegrationProvierId.java.
    ---------------------------------------------------------------------------
    Import with
        import { EzIntegrationProviderId } from '/secure/integrations/EzIntegrationProviderId.js';
    ---------------------------------------------------------------------------
 */
export class EzIntegrationProviderId extends EzEnumeration2 {
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
        if (null == EzIntegrationProviderId.#ezEnumerationSingleton) {
            EzIntegrationProviderId.#ezEnumerationSingleton = new EzIntegrationProviderId(
                // Enum property names
                [
                    'UNKNOWN',
                    'EZ_INTEGRATION_QUICKBOOKS_ONLINE_PROVIDER',
                    'EZ_INTEGRATION_PAYCHEX_PROVIDER',
                    'EZ_INTEGRATION_ADP_WORKFORCE_NOW_PROVIDER',
                    'EZ_INTEGRATION_GUSTO_API_PROVIDER',
                    'EZ_INTEGRATION_GUSTO_PROVIDER',
                    'EZ_INTEGRATION_ACS_TECHNOLOGIES_PROVIDER',
                    'EZ_INTEGRATION_PAYCOM_PROVIDER'
                ],
                // Enum property values (use default (enum property names array))
                null,
                // Enum property optional data (use detail)
                null);
        }
    }
}

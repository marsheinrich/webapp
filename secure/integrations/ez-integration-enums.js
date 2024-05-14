import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

import { EzObject } from '/ezlibrary/helpers/EzObject.js';
import { EzString } from '/ezlibrary/helpers/EzString.js';
import { EzArray } from '/ezlibrary/helpers/EzArray.js';
import { EzHtml } from '/ezlibrary/helpers/EzHtml.js';

/**
    // TODO: Move this class into its own file in: src/main/webapp/integrations/enums/EzNovaIntegrationProviderId.js
    // TODO: Updated imports once moved to its own file
    @class
    @extends {EzEnumeration2}
    @description
    Javascript enumeration equvalant to Java's EzNovaIntegrationProviderId.java
    ---------------------------------------------------------------------------
    Import with
        import { EzNovaIntegrationProviderId } from '/secure/integrations/ez-integration-enums.js';
    ---------------------------------------------------------------------------
 */
class EzNovaIntegrationProviderId extends EzEnumeration2 {
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
        if (null == EzNovaIntegrationProviderId.#ezEnumerationSingleton) {
            EzNovaIntegrationProviderId.#ezEnumerationSingleton = new EzNovaIntegrationProviderId(
                // Enum property names
                [
                    'UNKNOWN',
                    'QUICKBOOKS_ONLINE',
                    'XERO',
                    'PAYCHEX',
                    'ADP_WORKFORCE_NOW',
                    'GUSTO',
                    'GUSTO_API',
                    'ACS_TECHNOLOGIES'
                ],
                // Enum property values (use default (enum property names array))
                [
                    'UNKNOWN',
                    'EZ_INTEGRATION_QUICKBOOKS_ONLINE_PROVIDER',
                    'XERO',
                    'PAYCHEX',
                    'ADP_WORKFORCE_NOW',
                    'GUSTO',
                    'GUSTO_API',
                    'ACS_TECHNOLOGIES'
                ],
                // Enum property optional data (use detail)
                null);
        }
    }
}

/**
    // TODO: Move this class into its own file in: src/main/webapp/integrations/enums/EzAuthenticationStatus.js
    // TODO: Updated imports once moved to its own file
    @class
    @extends {EzEnumeration2}
    @description
    Javascript enumeration class equvalant to Java's EzAuthenticationStatus.java
    ---------------------------------------------------------------------------
    Import with
        import { EzAuthenticationStatus } from '/secure/integrations/ez-integration-enums.js';
    ---------------------------------------------------------------------------
 */
class EzAuthenticationStatus extends EzEnumeration2 {
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
        if (null == EzAuthenticationStatus.#ezEnumerationSingleton) {
            EzAuthenticationStatus.#ezEnumerationSingleton = new EzAuthenticationStatus(
                // Enum property names
                [
                    'UNKNOWN',
                    'NOT_AUTHENTICATED',
                    'NOT_AVAILABLE',
                    'AUTHENTICATED'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                null,
                // Optional array of additional data for eac enumeration property.
                // Enter null if not needed.
                null);
        }
    }
}

/**
    // TODO: Move this class into its own file in: src/main/webapp/integrations/enums/EzIntegrationOptions.js
    // TODO: Updated imports once moved to its own file
    @class
    @extends {EzEnumeration2}
    @description
    Javascript enumeration for the integration's options id
    ---------------------------------------------------------------------------
    Import with
        import { EzIntegrationOptions } from '/secure/integrations/ez-integration-enums.js';
    ---------------------------------------------------------------------------
 */
class EzIntegrationOptions extends EzEnumeration2 {
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
        if (null == EzIntegrationOptions.#ezEnumerationSingleton) {
            EzIntegrationOptions.#ezEnumerationSingleton = new EzIntegrationOptions(
                // Enum property names
                [
                    'UNKNOWN',
                    'EZ_INTEGRATION_QUICKBOOKS_ONLINE_PROVIDER',
                    'EZ_INTEGRATION_PAYCHEX_PROVIDER',
                    'EZ_INTEGRATION_ADP_WORKFORCE_NOW_PROVIDER',
                    'EZ_INTEGRATION_GUSTO_PROVIDER',
                    'EZ_INTEGRATION_GUSTO_API_PROVIDER',
                    'EZ_INTEGRATION_ACS_TECHNOLOGIES_PROVIDER'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                null,
                // Optional array of additional data for eac enumeration property.
                // Enter null if not needed.
                [
                    {
                        display: 'UNKNOWN'
                    },
                    {
                        display: 'QuickBooks Online'
                    },
                    {
                        display: 'Paychex Integration'
                    },
                    {
                        display: 'ADP Workflow Now Integration'
                    },
                    {
                        display: 'Gusto CSV Integration'
                    },
                    {
                        display: 'Gusto Integration'
                    },
                    {
                        display: 'ACS Technologies'
                    }
                ]);
        }
    }

    /**
        @static
        @public @method
        Returns the display name for the provided enumPropertyName (EzIntegrationOptions)
        @param {string}
        A valid enumeration property name from EzIntegrationOptions
        @returns {string}
     */
    static ezToDisplayName(enumPropertyName) {
         let enumData = this[EzEnumeration2.ENUM_DATA_METHOD_NAME](enumPropertyName);

        return EzObject.isValid(enumData)
            ? EzString.stringOrDefault(
                enumData['display'],
                'UNKNOWN')
            : 'UNKNOWN';
    }
}


/**
    // TODO: Move this class into its own file in: src/main/webapp/integrations/enums/EzNovaAuthType.js
    // TODO: Updated imports once moved to its own file
    @class
    @extends {EzEnumeration2}
    @description
    Javascript enumeration equivlant of Java's enumeration EzNovaAuthType.java
    ---------------------------------------------------------------------------
    Import with
        import { EzNovaAuthType } from '/secure/integrations/ez-integration-enums.js';
    ---------------------------------------------------------------------------
 */
class EzNovaAuthType extends EzEnumeration2 {
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
        if (null == EzNovaAuthType.#ezEnumerationSingleton) {
            EzNovaAuthType.#ezEnumerationSingleton = new EzNovaAuthType(
                // Enum property names
                [
                    'UNKNOWN',
                    'OAUTH_1',
                    'OAUTH_2',
                    'PRIVATE_PUBLIC_KEY',
                    'GOOGLE',
                    'FACEBOOK',
                    'NONE'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                null,
                // Enum property optional data (use detail)
                null);
        }
    }
}


/**
    // TODO: Move this class into its own file in: src/main/webapp/integrations/enums/EzOAuth2ProviderId.js
    // TODO: Updated imports once moved to its own file
    @class
    @extends {EzEnumeration2}
    @description
    Javascript enumeration equivlant of Java's enumeration EzOAuth2ProviderId.java
    ---------------------------------------------------------------------------
    Import with
        import { EzOAuth2ProviderId } from '/secure/integrations/ez-integration-enums.js';
    ---------------------------------------------------------------------------
 */
class EzOAuth2ProviderId extends EzEnumeration2 {
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
        if (null == EzOAuth2ProviderId.#ezEnumerationSingleton) {
            EzOAuth2ProviderId.#ezEnumerationSingleton = new EzOAuth2ProviderId(
                // Enum property names
                [
                    'UNKNOWN',
                    'NONE',
                    'INTUIT',
                    'GUSTO'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                null,
                // Enum property optional data (use detail)
                null);
        }
    }
}


/**
    // TODO: Move this class into its own file in: src/main/webapp/integrations/enums/EzNovaOAuth2ConfigurationProviderId.js
    // TODO: Updated imports once moved to its own file
    @class
    @extends {EzEnumeration2}
    @description
    Javascript enumeration equivlant of Java's enumeration EzNovaOAuth2ConfigurationProviderId.java
    ---------------------------------------------------------------------------
    Import with
        import { EzNovaOAuth2ConfigurationProviderId } from '/secure/integrations/ez-integration-enums.js';
    ---------------------------------------------------------------------------
 */
class EzNovaOAuth2ConfigurationProviderId extends EzEnumeration2 {
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
        if (null == EzNovaOAuth2ConfigurationProviderId.#ezEnumerationSingleton) {
            EzNovaOAuth2ConfigurationProviderId.#ezEnumerationSingleton = new EzNovaOAuth2ConfigurationProviderId(
                // Enum property names
                [
                    'UNKNOWN',
                    'NONE',
                    'INTUIT',
                    'GUSTO'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                null,
                // Enum property optional data (use detail)
                [
                    {
                        ezNovaOAuth2ProviderId: EzOAuth2ProviderId.UNKNOWN,
                        ezNovaAuthType: EzNovaAuthType.UNKNOWN
                    },
                    {
                        ezNovaOAuth2ProviderId: EzOAuth2ProviderId.NONE,
                        ezNovaAuthType: EzNovaAuthType.NONE
                    },
                    {
                        ezNovaOAuth2ProviderId: EzOAuth2ProviderId.INTUIT,
                        ezNovaAuthType: EzNovaAuthType.OAUTH_2
                    },
                    {
                        ezNovaOAuth2ProviderId: EzOAuth2ProviderId.GUSTO,
                        ezNovaAuthType: EzNovaAuthType.OAUTH_2
                    }
                ]);
        }
    }

    /**
        @static
        @public @method
        Returns the EzOAuth2ProviderId for the provided enumPropertyName (EzNovaOAuth2ConfigurationProviderId)
        @param {string}
        A valid enumeration property name from EzNovaOAuth2ConfigurationProviderId
        @returns {string}
        A valid enumeration property value from EzOAuth2ProviderId
     */
    static ezToEzNovaOAuth2ProviderId(enumPropertyName) {
        let enumData = this[EzEnumeration2.ENUM_DATA_METHOD_NAME](enumPropertyName);

        return EzObject.isValid(enumData)
            ? EzOAuth2ProviderId.ezValueOf(
                EzString.stringOrDefault(
                    enumData['ezNovaOAuth2ProviderId'],
                    EzOAuth2ProviderId.UNKNOWN))
            : EzOAuth2ProviderId.UNKNOWN;
    }

    /**
        @static
        @public @method
        Returns the EzNovaAuthType for the provided enumPropertyName (EzNovaOAuth2ProviderId)
        @param {string}
        A valid enumeration property name from EzNovaOAuth2ProviderId
        @returns {string}
        A valid enumeration property value from EzNovaAuthType
     */
    static ezToEzNovaAuthType(enumPropertyName) {
        let enumData = this[EzEnumeration2.ENUM_DATA_METHOD_NAME](enumPropertyName);

        return EzObject.isValid(enumData)
            ? EzNovaAuthType.ezValueOf(
                EzString.stringOrDefault(
                    enumData['ezNovaAuthType'],
                    EzNovaAuthType.UNKNOWN))
            : EzNovaAuthType.UNKNOWN;
    }
}


/**
    // TODO: Move this class into is own file in: src/main/webapp/integrations/enums/EzNovaOAuth2ProviderId.js
    // TODO: Updated imports once moved to its own file
    @class
    @extends {EzEnumeration2}
    @description
    Javascript enumeration equivlant of Java's enumeration EzNovaOAuth2ProviderId.java
    ---------------------------------------------------------------------------
    Import with
        import { EzNovaOAuth2ConfigurationProviderId } from '/secure/integrations/ez-integration-enums.js';
    ---------------------------------------------------------------------------
 */
class EzNovaOAuth2ProviderId extends EzEnumeration2 {
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
        if (null == EzNovaOAuth2ProviderId.#ezEnumerationSingleton) {
            EzNovaOAuth2ProviderId.#ezEnumerationSingleton = new EzNovaOAuth2ProviderId(
                // Enum property names
                [
                    'UNKNOWN',
                    'NONE',
                    'INTUIT',
                    'GUSTO'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                null,
                // Enum property optional data (use detail)
                [
                    {
                        ezOAuth2ProviderId: EzOAuth2ProviderId.UNKNOWN,
                        ezNovaOAuth2ConfigurationProviderId: EzNovaOAuth2ConfigurationProviderId.UNKNOWN,
                        ezNovaAuthType: EzNovaAuthType.UNKNOWN
                    },
                    {
                        ezOAuth2ProviderId: EzOAuth2ProviderId.NONE,
                        ezNovaOAuth2ConfigurationProviderId: EzNovaOAuth2ConfigurationProviderId.NONE,
                        ezNovaAuthType: EzNovaAuthType.NONE
                    },
                    {
                        ezOAuth2ProviderId: EzOAuth2ProviderId.INTUIT,
                        ezNovaOAuth2ConfigurationProviderId: EzNovaOAuth2ConfigurationProviderId.INTUIT,
                        ezNovaAuthType: EzNovaAuthType.OAUTH_2
                    },
                    {
                        ezOAuth2ProviderId: EzOAuth2ProviderId.GUSTO,
                        ezNovaOAuth2ConfigurationProviderId: EzNovaOAuth2ConfigurationProviderId.GUSTO,
                        ezNovaAuthType: EzNovaAuthType.OAUTH_2
                    }
                ]);
        }
    }

    /**
        @static
        @public @method
        Returns the EzOAuth2ProviderId for the provided enumPropertyName (EzNovaOAuth2ProviderId)
        @param {string}
        A valid enumeration property name from EzNovaOAuth2ProviderId
        @returns {string}
        A valid enumeration property value from EzOAuth2ProviderId
     */
    static ezToEzOAuth2ProviderId(enumPropertyName) {
        let enumData = this[EzEnumeration2.ENUM_DATA_METHOD_NAME](enumPropertyName);

        return EzObject.isValid(enumData)
            ? EzOAuth2ProviderId.ezValueOf(
                EzString.stringOrDefault(
                    enumData['ezOAuth2ProviderId'],
                    EzOAuth2ProviderId.UNKNOWN))
            : EzOAuth2ProviderId.UNKNOWN;
    }

    /**
        @static
        @public @method
        Returns the EzNovaOAuth2ConfigurationProviderId for the provided enumPropertyName (EzNovaOAuth2ProviderId)
        @param {string}
        A valid enumeration property name from EzNovaOAuth2ProviderId
        @returns {string}
        A valid enumeration property value from EzNovaOAuth2ConfigurationProviderId
     */
    static ezToEzNovaOAuth2ConfigurationProviderId(enumPropertyName) {
        let enumData = this[EzEnumeration2.ENUM_DATA_METHOD_NAME](enumPropertyName);

        return EzObject.isValid(enumData)
            ? EzNovaOAuth2ConfigurationProviderId.ezValueOf(
                EzString.stringOrDefault(
                    enumData['ezNovaOAuth2ConfigurationProviderId'],
                    EzNovaOAuth2ConfigurationProviderId.UNKNOWN))
            : EzNovaOAuth2ConfigurationProviderId.UNKNOWN;
    }

    /**
        @static
        @public @method
        Returns the EzOAuth2ProviderId for the provided EzNovaOAuth2ProviderId enumPropertyName (EzNovaOAuth2ProviderId)
        @param {string}
        A valid enumeration property name from EzNovaOAuth2ProviderId
        @returns {string}
        A valid enumeration property value from EzOAuth2ProviderId
     */
    static ezToEzNovaAuthType(enumPropertyName) {
        let enumData = this[EzEnumeration2.ENUM_DATA_METHOD_NAME](enumPropertyName);

        return EzObject.isValid(enumData)
            ? EzOAuth2ProviderId.ezValueOf(
                EzString.stringOrDefault(
                    enumData['ezNovaAuthType'],
                    EzOAuth2ProviderId.UNKNOWN))
            : EzOAuth2ProviderId.UNKNOWN;
    }
}

/**
    // TODO: Move this class into its own file in: src/main/webapp/integrations/enums/EzNovaAuthenticationProviderId.js
    // TODO: Updated imports once moved to its own file
    @class
    @extends {EzEnumeration2}
    @description
    Javascript enumeration equivlant of Java's enumeration EzNovaAuthenticationProviderId.java
    ---------------------------------------------------------------------------
    Import with
        import { EzNovaAuthenticationProviderId } from '/secure/integrations/ez-integration-enums.js';
    ---------------------------------------------------------------------------
 */
class EzNovaAuthenticationProviderId extends EzEnumeration2 {
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
        if (null == EzNovaAuthenticationProviderId.#ezEnumerationSingleton) {
            EzNovaAuthenticationProviderId.#ezEnumerationSingleton = new EzNovaAuthenticationProviderId(
                // Enum property names
                [
                    'UNKNOWN',
                    'NONE',
                    'INTUIT',
                    'PUZZL',
                    'XERO',
                    'PAYCHEX',
                    'ADP_WORKFORCE_NOW',
                    'GUSTO',
                    'GUSTO_API',
                    'ACS_TECHNOLOGIES'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                null,
                // Enum property optional data (use detail)
                [
                    // Unknown
                    {
                        ezNovaOAuth2ProviderId: EzNovaOAuth2ProviderId.UNKNOWN,
                        ezNovaOAuth2ConfigurationProviderId: EzNovaOAuth2ConfigurationProviderId.UNKNOWN,
                        ezNovaAuthType: EzNovaAuthType.UNKNOWN
                    },
                    // NONE
                    {
                        ezNovaOAuth2ProviderId: EzNovaOAuth2ProviderId.NONE,
                        ezNovaOAuth2ConfigurationProviderId: EzNovaOAuth2ConfigurationProviderId.NONE,
                        ezNovaAuthType: EzNovaAuthType.NONE
                    },
                    // INTUIT
                    {
                        ezNovaOAuth2ProviderId: EzNovaOAuth2ProviderId.INTUIT,
                        ezNovaOAuth2ConfigurationProviderId: EzNovaOAuth2ConfigurationProviderId.INTUIT,
                        ezNovaAuthType: EzNovaAuthType.OAUTH_2
                    },
                    // PUZZL
                    {
                        ezNovaOAuth2ProviderId: EzNovaOAuth2ProviderId.NONE,
                        ezNovaOAuth2ConfigurationProviderId: EzNovaOAuth2ConfigurationProviderId.NONE,
                        ezNovaAuthType: EzNovaAuthType.PRIVATE_PUBLIC_KEY
                    },
                    // XERO
                    {
                        ezNovaOAuth2ProviderId: EzNovaOAuth2ProviderId.NONE,
                        ezNovaOAuth2ConfigurationProviderId: EzNovaOAuth2ConfigurationProviderId.NONE,
                        ezNovaAuthType: EzNovaAuthType.PRIVATE_PUBLIC_KEY
                    },
                    // PAYCHEX
                    {
                        ezNovaOAuth2ProviderId: EzNovaOAuth2ProviderId.NONE,
                        ezNovaOAuth2ConfigurationProviderId: EzNovaOAuth2ConfigurationProviderId.NONE,
                        ezNovaAuthType: EzNovaAuthType.NONE
                    },
                    // ADP_WORKFORCE_NOW
                    {
                        ezNovaOAuth2ProviderId: EzNovaOAuth2ProviderId.NONE,
                        ezNovaOAuth2ConfigurationProviderId: EzNovaOAuth2ConfigurationProviderId.NONE,
                        ezNovaAuthType: EzNovaAuthType.NONE
                    },
                    // GUSTO
                    {
                        ezNovaOAuth2ProviderId: EzNovaOAuth2ProviderId.NONE,
                        ezNovaOAuth2ConfigurationProviderId: EzNovaOAuth2ConfigurationProviderId.NONE,
                        ezNovaAuthType: EzNovaAuthType.NONE
                    },
                    // GUSTO_API
                    {
                        ezNovaOAuth2ProviderId: EzNovaOAuth2ProviderId.GUSTO,
                        ezNovaOAuth2ConfigurationProviderId: EzNovaOAuth2ConfigurationProviderId.GUSTO,
                        ezNovaAuthType: EzNovaAuthType.NONE
                    },
                    // ACS_TECHNOLOGIES
                    {
                        ezNovaOAuth2ProviderId: EzNovaOAuth2ProviderId.NONE,
                        ezNovaOAuth2ConfigurationProviderId: EzNovaOAuth2ConfigurationProviderId.NONE,
                        ezNovaAuthType: EzNovaAuthType.NONE
                    }
                ]);
        }
    }

    /**
        @static
        @public @method
        Returns the EzNovaOAuth2ProviderId for the provided enumPropertyName (EzNovaAuthenticationProviderId)
        @param {string} enumPropertyName
        A valid enum property name from EzNovaAuthenticationProviderId
        @returns {string}
        A valid enum property value from EzNovaOAuth2ProviderId
     */
    static ezToEzNovaOAuth2ProviderId(enumPropertyName) {
        let enumData = this[EzEnumeration2.ENUM_DATA_METHOD_NAME](enumPropertyName);

        return EzObject.isValid(enumData)
            ? EzNovaOAuth2ProviderId.ezValueOf(
                EzString.stringOrDefault(
                    enumData['ezNovaOAuth2ProviderId'],
                    EzNovaOAuth2ProviderId.UNKNOWN))
            : EzNovaOAuth2ProviderId.UNKNOWN;
    }

    /**
        @static
        @public @method
        Returns the EzNovaOAuth2ConfigurationProviderId for the provided enumPropertyName (EzNovaAuthenticationProviderId)
        @param {string} enumPropertyName
        A valid enum property name from EzNovaAuthenticationProviderId
        @returns {string}
        A valid enum property value from EzNovaOAuth2ConfigurationProviderId
     */
    static ezToEzNovaOAuth2ConfigurationProviderId(enumPropertyName) {
        let enumData = this[EzEnumeration2.ENUM_DATA_METHOD_NAME](enumPropertyName);

        return EzObject.isValid(enumData)
            ? EzNovaOAuth2ConfigurationProviderId.ezValueOf(
                EzString.stringOrDefault(
                    enumData['ezNovaOAuth2ConfigurationProviderId'],
                    EzNovaOAuth2ConfigurationProviderId.UNKNOWN))
            : EzNovaOAuth2ConfigurationProviderId.UNKNOWN;
    }

    /**
        @static
        @public @method
        Returns the EzNovaAuthType for the provided enumPropertyName (EzNovaAuthenticationProviderId)
        @param {string} enumPropertyName
        A valid enum property name from EzNovaAuthenticationProviderId
        @returns {string}
        A valid enum property value from EzNovaAuthType
     */
    static ezToEzNovaAuthType(enumPropertyName) {
        let enumData = this[EzEnumeration2.ENUM_DATA_METHOD_NAME](enumPropertyName);

        return EzObject.isValid(enumData)
            ? EzNovaAuthType.ezValueOf(
                EzString.stringOrDefault(
                    enumData['ezNovaAuthType'],
                    EzNovaAuthType.UNKNOWN))
            : EzNovaAuthType.UNKNOWN;
    }
}

/**
    // TODO: Remove this class once all use is migrated
    @class
    @extends {EzEnumeration2}
    @description
    Javascript enumeration that represents an id for OAuth1
    ---------------------------------------------------------------------------
    Import with
        import { EzNovaOAuthProviderId } from '/secure/integrations/ez-integration-enums.js';
    ---------------------------------------------------------------------------
    @deprecated
    Migrate to using EzNovaOAuth2ProviderId
 */
class EzNovaOAuthProviderId extends EzEnumeration2 {
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
        if (null == EzNovaOAuthProviderId.#ezEnumerationSingleton) {
            EzNovaOAuthProviderId.#ezEnumerationSingleton = new EzNovaOAuthProviderId(
                // Enum property names
                [
                    'UNKNOWN',
                    'NONE',
                    'INTUIT',
                    'GUSTO'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                null,
                // Enum property optional data (use detail)
                [
                    {
                        // OAuth2 provider id name (use null to use enum name)
                        oAuth2ProviderId: EzOAuth2ProviderId.NONE,
                        // Associated EzNovaOAuth2ConfigurationProviderId
                        ezNovaOAuth2ConfigurationProviderId: EzNovaOAuth2ConfigurationProviderId.UNKNOWN,
                        // Associated EzNovaAuthType
                        authType: EzNovaAuthType.UNKNOWN
                    },
                    {

                        // OAuth2 provider id name (use null to use enum name)
                        oAuth2ProviderId: EzOAuth2ProviderId.NONE,
                        // Associated EzNovaOAuth2ConfigurationProviderId
                        ezNovaOAuth2ConfigurationProviderId: EzNovaOAuth2ConfigurationProviderId.NONE,
                        // Associated EzNovaAuthType
                        authType: EzNovaAuthType.NONE
                    },
                    {
                        // OAuth2 provider id name (use null to use enum name)
                        oAuth2ProviderId: EzOAuth2ProviderId.INTUIT,
                        // Associated EzNovaOAuth2ConfigurationProviderId
                        ezNovaOAuth2ConfigurationProviderId: EzNovaOAuth2ConfigurationProviderId.INTUIT,
                        // Associated EzNovaAuthType
                        authType: EzNovaAuthType.OAUTH_2
                    },
                    {
                        // OAuth2 provider id name (use null to use enum name)
                        oAuth2ProviderId: EzOAuth2ProviderId.GUSTO,
                        // Associated EzNovaOAuth2ConfigurationProviderId
                        ezNovaOAuth2ConfigurationProviderId: EzNovaOAuth2ConfigurationProviderId.GUSTO,
                        // Associated EzNovaAuthType
                        authType: EzNovaAuthType.OAUTH_2
                    }
                ]);
        }
    }

    /**
        @static
        @public @method
        Returns the EzOAuth2ProviderId for the provided enumPropertyName (EzNovaOAuthProviderId)
        @param {string} enumPropertyName
        A valid enum property name from EzNovaOAuthProviderId
        @returns {string}
        A valid enum property value from EzOAuth2ProviderId
     */
    static ezToEzNovaOAuthProviderId(enumPropertyName) {
        let enumData = this[EzEnumeration2.ENUM_DATA_METHOD_NAME](enumPropertyName);

        return EzObject.isValid(enumData)
            ? EzOAuth2ProviderId.ezValueOf(
                EzString.stringOrDefault(
                    enumData['oAuth2ProviderId'],
                    EzOAuth2ProviderId.UNKNOWN))
            : null;
    }

    /**
        @static
        @public @method
        Returns EzNovaOAuth2ConfigurationProviderId for the provided enumPropertyName (EzNovaOAuthProviderId)
        @param {string} enumPropertyName
        A valid enum property name from EzNovaOAuthProviderId
        @returns {string}
        A valid enum property value from EzNovaOAuth2ConfigurationProviderId
     */
    static ezToEzNovaOAuth2ConfigurationProviderId(enumPropertyName) {
        let enumData = this[EzEnumeration2.ENUM_DATA_METHOD_NAME](enumPropertyName);

        return EzObject.isValid(enumData)
            ? EzNovaOAuth2ConfigurationProviderId.ezValueOf(
                EzString.stringOrDefault(
                    enumData['ezNovaOAuth2ConfigurationProviderId'],
                    EzNovaOAuth2ConfigurationProviderId.UNKNOWN))
            : null;
    }

    /**
        @static
        @public @method
        Returns the EzNovaAuthType for the provided enumPropertyName (EzNovaOAuthProviderId)
        @param {string} enumPropertyName
        A valid enum property name from EzNovaOAuthProviderId
        @returns {string}
        A valid enum property value from EzNovaAuthType
     */
    static ezToEzNovaAuthType(enumPropertyName) {
        let enumData = this[EzEnumeration2.ENUM_DATA_METHOD_NAME](enumPropertyName);

        return EzObject.isValid(enumData)
            ? EzNovaAuthType.ezValueOf(
                EzString.stringOrDefault(
                    enumData['authType'],
                    EzNovaAuthType.UNKNOWN))
            : null;
    }
}


/**
    // TODO: Move this class into its own file in: src/main/webapp/integrations/enums/EzIntegrationType.js
    // TODO: Updated imports once moved to its own file
    @class
    @extends {EzEnumeration2}
    @description
    Javascript enumeration equivlant of Java's enumeration EzIntegrationType.java
    ---------------------------------------------------------------------------
    Import with
        import { EzIntegrationType } from '/secure/integrations/ez-integration-enums.js';
    ---------------------------------------------------------------------------
 */
class EzIntegrationType extends EzEnumeration2 {
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
        if (null == EzIntegrationType.#ezEnumerationSingleton) {
            EzIntegrationType.#ezEnumerationSingleton = new EzIntegrationType(
                // Enum property names
                [
                    'UNKNOWN',
                    'TIME_ENTRY_EXPORT',
                    'TIME_ENTRY_EXPORT_FILE'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                null,
                // Enum property optional data (use detail)
                [
                    {
                        supportedIntegrationProviders: [
                            EzNovaIntegrationProviderId.UNKNOWN
                        ]
                    },
                    {
                        supportedIntegrationProviders: [
                            EzNovaIntegrationProviderId.EZ_INTEGRATION_QUICKBOOKS_ONLINE_PROVIDER
                        ]
                    },
                    {
                        supportedIntegrationProviders: [
                            EzNovaIntegrationProviderId.XERO,
                            EzNovaIntegrationProviderId.PAYCHEX,
                            EzNovaIntegrationProviderId.ADP_WORKFORCE_NOW,
                            EzNovaIntegrationProviderId.GUSTO_API,
                            EzNovaIntegrationProviderId.GUSTO,
                            EzNovaIntegrationProviderId.ACS_TECHNOLOGIES
                        ]
                    }
                ]);
        }
    }

    /**
        @static
        @public @method
        Returns an array EzNovaIntegrationProviderId that support the EzIntegrationType for the provided enumPropertyName
        @param {string} enumPropertyName
        A valid enum property name for EzIntegrationType
        @returns {array}
     */
    static ezGetSupportedIntegrationProvidersForEzIntegrationType(enumPropertyName) {
        let enumData = this[EzEnumeration2.ENUM_DATA_METHOD_NAME](enumPropertyName);

        return EzObject.isValid(enumData)
            ? EzArray.arrayOrEmpty(enumData['supportedIntegrationProviders'])
            : [];
    }
}

/**
    // TODO: Move this class into its own file in: src/main/webapp/integrations/enums/EzIntegrationProviderId.js
    // TODO: Updated imports once moved to its own file
    @class
    @extends {EzEnumeration2}
    @description
    Javascript enumeration equivlant of Java's enumeration EzIntegrationProviderId.java
    ---------------------------------------------------------------------------
    Import with
        import { EzIntegrationProviderId } from '/secure/integrations/ez-integration-enums.js';
    ---------------------------------------------------------------------------
 */
class EzIntegrationProviderId extends EzEnumeration2 {
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
                    'QUICKBOOKS_ONLINE',
                    'QBO',
                    'XERO',
                    'PAYCHEX',
                    'ADP_WORKFORCE_NOW',
                    'GUSTO',
                    'GUSTO_API',
                    'ACS_TECHNOLOGIES',
                    'PAYCOM'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                null,
                // Enum property optional data (use detail)
                [
                    // UNKNOWN
                    {
                        ezNovaAuthenticationProviderId: EzNovaAuthenticationProviderId.UNKNOWN,
                        ezIntegrationType: 'UNKNOWN',
                        ezShortName: 'UKN',
                        ezCodeId: 'UNKNOWN',
                        ezIntegrationHomeUrl: null,
                        ezIntegrationLogoUrl: null,
                        ezIntegrationLogoText: null,
                        ezIntegrationSubTitleText: null,
                        ezIntegrationSetupDialogApiName: null,
                        ezIntegrationProductName: 'UNKNOWN',
                        ezIntegrationProductHomeUrl: EzString.EMPTY,
                        ezIntegrationProductImportSupportUrl: EzString.EMPTY,
                        ezIntegrationSetupDialogId: null,
                        ezIntegrationSetupNotes: null,
                        ezIntegrationHelpUrl: null,
                        ezAdditionalResourcesInfo: null,
                        display: 'UNKNOWN'
                    },
                    // QUICKBOOKS_ONLINE
                    {
                        ezNovaAuthenticationProviderId: EzNovaAuthenticationProviderId.INTUIT,
                        ezIntegrationType: EzIntegrationType.TIME_ENTRY_EXPORT,
                        ezShortName: 'Intuit QBO',
                        ezCodeId: 'IntuitQBO',
                        ezIntegrationHomeUrl: 'https://intuit.com',
                        ezIntegrationLogoUrl: '/public/images/integrations/intuit-qbo.svg',
                        ezIntegrationLogoText: 'QuickBooks Online®',
                        ezIntegrationSubTitleText: 'Direct Integration',
                        ezIntegrationSetupDialogApiName: 'ezQBOIntegrationSetupDialog',
                        ezIntegrationSetupDialogId: 'EzQBOIntegrationSetupDialog',
                        ezIntegrationProductName: 'Intuit QuickBooks Online®',
                        ezIntegrationProductHomeUrl: '',
                        ezIntegrationProductImportSupportUrl: '',
                        ezIntegrationSetupNotes: EzString.EMPTY,
                        ezIntegrationHelpUrl: '/integrations/quickbooks-online',
                        ezIntegrationSetupNotes: EzString.EMPTY,
                        display: 'Intuit QuickBooks Online'
                    },
                    // QBO
                    {
                        ezNovaAuthenticationProviderId: EzNovaAuthenticationProviderId.INTUIT,
                        ezIntegrationType: EzIntegrationType.TIME_ENTRY_EXPORT,
                        ezShortName: 'Intuit QBO',
                        ezCodeId: 'IntuitQBO',
                        ezIntegrationHomeUrl: EzString.EMPTY,
                        ezIntegrationLogoUrl: EzString.EMPTY,
                        ezIntegrationLogoText: 'QuickBooks Online®',
                        ezIntegrationSubTitleText: 'Direct Integration',
                        ezIntegrationSetupDialogApiName: EzString.EMPTY,
                        ezIntegrationSetupDialogId: EzString.EMPTY,
                        ezIntegrationProductName: 'Intuit QuickBooks Online®',
                        ezIntegrationProductHomeUrl: EzString.EMPTY,
                        ezIntegrationProductImportSupportUrl: EzString.EMPTY,
                        ezIntegrationSetupNotes: EzString.EMPTY,
                        ezIntegrationHelpUrl: '/integrations/quickbooks-online',
                        ezAdditionalResourcesInfo: EzString.EMPTY,
                        displayName: 'Intuit QuickBooks Online'
                    },
                    // XERO
                    {
                        ezNovaAuthenticationProviderId: EzNovaAuthenticationProviderId.NONE,
                        ezIntegrationType: EzIntegrationType.TIME_ENTRY_EXPORT,
                        ezShortName: 'Xero',
                        ezCodeId: 'Xero',
                        ezIntegrationHomeUrl: EzString.EMPTY,
                        ezIntegrationLogoUrl: EzString.EMPTY,
                        ezIntegrationLogoText: 'XERO®',
                        ezIntegrationSubTitleText: 'CSV File Export',
                        ezIntegrationSetupDialogApiName: EzString.EMPTY,
                        ezIntegrationSetupDialogId: EzString.EMPTY,
                        ezIntegrationProductName: 'Xero®',
                        ezIntegrationProductHomeUrl: 'https://www.xero.com/us/',
                        ezIntegrationProductImportSupportUrl: EzString.EMPTY,
                        ezIntegrationSetupNotes: EzString.EMPTY,
                        ezIntegrationHelpUrl: '/integrations/xero',
                        ezAdditionalResourcesInfo: EzString.EMPTY,
                        displayName: 'Xero'
                    },
                    // PAYCHEX
                    {
                        ezNovaAuthenticationProviderId: EzNovaAuthenticationProviderId.NONE,
                        ezIntegrationType: EzIntegrationType.TIME_ENTRY_EXPORT_FILE,
                        ezShortName: 'PAYCHEX®',
                        ezCodeId: 'PayChex',
                        ezIntegrationHomeUrl: 'https://www.paychex.com',
                        ezIntegrationLogoUrl: '/public/images/integrations/paychex.svg',
                        ezIntegrationLogoText: 'Flex® Payroll',
                        ezIntegrationSubTitleText: 'CSV File Export',
                        ezIntegrationSetupDialogApiName: 'ezPayChexIntegrationSetupDialog',
                        ezIntegrationSetupDialogId: 'EzPayChexIntegrationSetupDialog',
                        ezIntegrationProductName: 'Paychex Flex® Payroll',
                        ezIntegrationProductHomeUrl: EzString.EMPTY,
                        ezIntegrationProductImportSupportUrl: EzString.EMPTY,
                        ezIntegrationSetupNotes: EzHtml.build`
                            <h2>ezClocker's Paychex Flex® Integration</h2>
                            Export time period data to a CSV file and import into PAYCHEX
                            <h3>Requirements</h3>
                            Your Paychex account must meet the following requirements to use the integration:
                            <ul>
                                <li>A Paychex Flex plan is required to import time entries.</li>
                                <li>The Paychex Standard Payroll Import setting needs enabled on your account.</li>
                            </ul>
                            <h3>Setting Up the Integration</h3>
                            Setting up the integration will require the following information from PAYCHEX:
                            <ul>
                                <li>Your Paychex Client Id</li>
                                <li>The Worker Id for each employee</li>
                                <li>Your Paychex Pay Component Ids</li>
                                <li>Your Paychex Labor Assignment Ids</li>
                            </ul>`,
                        ezIntegrationHelpUrl: '/integrations/paychex',
                        ezAdditionalResourcesInfo: EzString.EMPTY,
                        displayName: 'PAYCHEX'
                    },
                    // ADP_WORKFORCE_NOW
                    {
                        ezNovaAuthenticationProviderId: EzNovaAuthenticationProviderId.NONE,
                        ezIntegrationType: EzIntegrationType.TIME_ENTRY_EXPORT_FILE,
                        ezShortName: 'ADP',
                        ezCodeId: 'ADPWorkforceNow',
                        ezIntegrationHomeUrl: 'https://www.adp.com',
                        ezIntegrationLogoUrl: '/public/images/integrations/adp.svg',
                        ezIntegrationLogoText: 'Workforce Now® Payroll',
                        ezIntegrationSubTitleText: 'CSV File Export',
                        ezIntegrationSetupDialogApiName: 'ezADPIntegrationSetupDialog',
                        ezIntegrationSetupDialogId: 'EzADPIntegrationSetupDialog',
                        ezIntegrationProductName: 'ADP Workforce Now®',
                        ezIntegrationProductHomeUrl: 'https://www.adp.com/what-we-offer/products/adp-workforce-now.aspx',
                        ezIntegrationProductImportSupportUrl: EzString.EMPTY,
                        ezIntegrationSetupNotes: EzString.EMPTY,
                        ezIntegrationHelpUrl: '/integrations/adp-workforce-now',
                        ezAdditionalResourcesInfo: EzHtml.build`
                            <h2>Additional Resources for the ADP Workforce Now Payroll® Integration</h2>
                            <p>
                                To further help you successfully integrate ezClocker with ADP Workforce Now Payroll® we have
                                collected a list of external (not owned or maintained by ezClocker) websites that provide
                                additional information and help if you need it.
                            </p>
                            <ul>
                                <li>
                                    <a href="https://www.adp.com">
                                        ADP Main Website
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.adp.com/what-we-offer/products/adp-workforce-now/payroll.aspx"
                                        target="ADP_WORKFORCE_NOW">
                                        ADP Workforce Now Payroll Information Page
                                    </a>
                                </li>
                            </ul>`,
                        displayName: 'ADP Workforce Now'
                    },

                    // GUSTO
                    {
                        ezNovaAuthenticationProviderId: EzNovaAuthenticationProviderId.NONE,
                        ezIntegrationType: EzIntegrationType.TIME_ENTRY_EXPORT_FILE,
                        ezShortName: 'Gusto',
                        ezCodeId: 'Gusto',
                        ezIntegrationHomeUrl: 'https://gusto.com',
                        ezIntegrationLogoUrl: '/public/images/integrations/gusto.svg',
                        ezIntegrationLogoText: 'Payroll',
                        ezIntegrationSubTitleText: 'CSV File Export',
                        ezIntegrationSetupDialogApiName: 'ezGustoCSVIntegrationSetupDialog',
                        ezIntegrationSetupDialogId: 'EzGustoCSVIntegrationSetupDialog',
                        ezIntegrationProductName: 'Gusto Payroll® CSV',
                        ezIntegrationProductHomeUrl: 'https://gusto.com/product/payroll',
                        ezIntegrationProductImportSupportUrl: 'https://support.gusto.com/payroll/payroll-settings/CSV-Upload/999914471/Upload-payroll-data-with-a-CSV.htm',
                        ezIntegrationSetupNotes: EzHtml.build`
                            <h2>ezClocker's Gusto Integration</h2>
                            Export time period data to a CSV file and import into Gusto.
                            <h3>Requirements</h3>
                            <ul>
                            </ul>
                            <h3>Integration Setup</h3>
                            <ul>
                            </ul>`,
                        ezIntegrationHelpUrl: '/integrations/gusto',
                        ezAdditionalResourcesInfo: EzHtml.build`
                            <h2>Additional Resources for the Gusto Payroll® Integration</h2>
                            <p>
                                To further help you successfully integrate ezClocker with Gusto Payroll® we have collected a list
                                of external (not owned or maintained by ezClocker) websites that provide additional information
                                and help if you need it.
                            </p>
                            <ul>
                                <li>
                                    <a href="https://gusto.com">
                                        Gusto Main Website
                                    </a>
                                </li>
                                <li>
                                    <a href="https://gusto.com/product/payroll">
                                        Gusto Payroll Information Site
                                    </a>
                                </li>
                                <li>
                                    <a href="https://support.gusto.com/payroll/payroll-settings/CSV-Upload/999913061/Upload-hours-and-earnings-to-payroll.htm">
                                        Gusto Help Center: Upload Hours and Earnings to Payroll
                                    </a>
                                </li>
                            </ul>
                        `,
                        displayName: 'Gusto CSV'
                    },
                    // GUSTO_API
                    {
                        ezNovaAuthenticationProviderId: EzNovaAuthenticationProviderId.GUSTO,
                        ezIntegrationType: EzIntegrationType.TIME_ENTRY_EXPORT,
                        ezShortName: 'Gusto',
                        ezCodeId: 'GustoAPI',
                        ezIntegrationHomeUrl: 'https://gusto.com',
                        ezIntegrationLogoUrl: '/public/images/integrations/gusto.svg',
                        ezIntegrationLogoText: 'Payroll',
                        ezIntegrationSubTitleText: 'Direct Integration',
                        ezIntegrationSetupDialogApiName: 'ezGustoIntegrationSetupDialog',
                        ezIntegrationSetupDialogId: 'EzGustoIntegrationSetupDialog',
                        ezIntegrationProductName: 'Gusto Payroll®',
                        ezIntegrationProductHomeUrl: 'https://gusto.com/product/payroll',
                        ezIntegrationProductImportSupportUrl: 'https://support.gusto.com/payroll/payroll-settings/CSV-Upload/999914471/Upload-payroll-data-with-a-CSV.htm',
                        ezIntegrationSetupNotes: EzHtml.build`
                            <h2>EzClocker's Gusto Integration</h2>
                            Export time period data to a CSV file and import into Gusto.
                            <h3>Requirements</h3>
                            <ul>
                            </ul>
                            <h3>Integration Setup</h3>
                            <ul>
                            </ul>`,
                        ezIntegrationHelpUrl: '/integrations/gusto',
                        ezAdditionalResourcesInfo: EzHtml.build`
                            <h2>Additional Resources for the Gusto Payroll® Integration</h2>
                            <p>
                                To further help you successfully integrate ezClocker with Gusto Payroll® we have collected a list
                                of external (not owned or maintained by ezClocker) websites that provide additional information
                                and help if you need it.
                            </p>
                            <ul>
                                <li>
                                    <a href="https://gusto.com">
                                        Gusto Main Website
                                    </a>
                                </li>
                                <li>
                                    <a href="https://gusto.com/product/payroll">
                                        Gusto Payroll Information Site
                                    </a>
                                </li>
                                <li>
                                    <a href="https://support.gusto.com/payroll/payroll-settings/CSV-Upload/999913061/Upload-hours-and-earnings-to-payroll.htm">
                                        Gusto Help Center: Upload Hours and Earnings to Payroll
                                    </a>
                                </li>
                            </ul>
                        `,
                        displayName: 'Gusto'
                    },

                    // ACS_TECHNOLOGIES
                    {
                        ezNovaAuthenticationProviderId: EzNovaAuthenticationProviderId.NONE,
                        ezIntegrationType: EzIntegrationType.TIME_ENTRY_EXPORT_FILE,
                        ezShortName: 'ACS',
                        ezCodeId: 'ACSTechnologies',
                        ezIntegrationHomeUrl: 'https://www.acstechnologies.com',
                        ezIntegrationLogoUrl: '/public/images/integrations/acs-technologies-small.png',
                        ezIntegrationLogoText: 'Payroll®',
                        ezIntegrationSubTitleText: 'CSV File Export',
                        ezIntegrationSetupDialogApiName: 'ezACSIntegrationSetupDialog',
                        ezIntegrationSetupDialogId: 'EzACSIntegrationSetupDialog',
                        ezIntegrationProductName: 'ACS Payroll®',
                        ezIntegrationProductHomeUrl: 'https://www.acstechnologies.com/acs/church-accounting-software/acs-payroll',
                        ezIntegrationProductImportSupportUrl: 'https://wiki.acstechnologies.com/display/ACSDOC/Importing+Time+into+ACS+Payroll',
                        ezIntegrationSetupNotes: EzHtml.build`
                            <h2>ezClocker's ACS Technologies Integration</h2>
                            Export time period data to a CSV file and import into ACS Payroll®.
                            <h3>Requirements</h3>
                            <ul>
                            </ul>
                            <h3>Integration Setup</h3>
                            <ul>
                            </ul>`,
                        ezIntegrationHelpUrl: '/integrations/acs-technologies',
                        ezAdditionalResourcesInfo: EzHtml.build`
                            <h2>Additional Resources for the ACS Payroll® Integration</h2>
                            <p>
                                To further help you successfully integrate ezClocker with ACS Payroll® we have collected a list
                                of external (not owned or maintained by ezClocker) websites that provide additional information
                                and help if you need it.
                            </p>
                            <ul>
                                <li>
                                    <a href="https://www.acstechnologies.com" target="ACS_TECHNOLOGIES">
                                        ACS Technologies Website
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.acstechnologies.com/expertise/support/" target="ACS_TECHNOLOGIES">
                                        ACS Technologies Support
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.acstechnologies.com/acs/church-accounting-software/acs-payroll/"
                                        target="ACS_TECHNOLOGIES">
                                        ACS Payroll Information Site
                                    </a>
                                </li>
                                <li>
                                    <a href="https://wiki.acstechnologies.com/display/ACSDOC/Payroll" target="ACS_TECHNOLOGIES">
                                        ACS Payroll Documentation Wiki
                                    </a>
                                <li>
                                    <a href="https://wiki.acstechnologies.com/display/ACSDOC/Importing+Time+into+ACS+Payroll"
                                        target="ACS_TECHNOLOGIES">
                                        ACS Technologies Documentation on Importing Time into ACS Payroll
                                    </a>
                                </li>
                            </ul>`,
                        displayName: 'ACS Technologies'
                    },
                    // PAYCOM
                    {
                        ezNovaAuthenticationProviderId: EzNovaAuthenticationProviderId.NONE,
                        ezIntegrationType: EzIntegrationType.TIME_ENTRY_EXPORT_FILE,
                        ezShortName: 'Paycom®',
                        ezCodeId: 'Paycom',
                        ezIntegrationHomeUrl: 'https://www.paycom.com',
                        ezIntegrationLogoUrl: '',
                        ezIntegrationLogoText: 'Paycom Payroll',
                        ezIntegrationSubTitleText: 'CSV File Export',
                        ezIntegrationSetupDialogApiName: 'ezPaycomIntegrationSetupDialog',
                        ezIntegrationSetupDialogId: 'EzPaycomIntegrationSetupDialog',
                        ezIntegrationProductName: 'Paycom Payroll',
                        ezIntegrationProductHomeUrl: EzString.EMPTY,
                        ezIntegrationProductImportSupportUrl: EzString.EMPTY,
                        ezIntegrationSetupNotes: EzHtml.build`
                            <h2>EzClocker Paycom® Integration</h2>
                            Export time period data to a CSV file and import into Paycom.
                            <h3>Setting Up the Integration</h3>`,
                        ezIntegrationHelpUrl: '/integrations/paycom',
                        ezAdditionalResourcesInfo: EzString.EMPTY,
                        displayName: 'Paycom'
                    }
                ]);
        }
    }

    /**
        @static
        @public @method
        Returns the integrations display name.
        @param {string} enumPropertyName
        A valid enum property name for EzIntegrationProviderId
        @returns {string}
     */
    static ezToDisplayValue(enumPropertyName) {
        let enumData = this[EzEnumeration2.ENUM_DATA_METHOD_NAME](enumPropertyName);

        return EzObject.isValid(enumData)
            ? EzString.stringOrEmpty(enumData['displayName'])
            : EzString.EMPTY;
    }

    /**
        @static
        @public @method
        Returns the integration's setup dialog name as registered with ezApi
        The result is normally used to get the reference of the dialog's class from
        ezApi as such:
            ezApi.ezclocker[{setup_dialog_api_name}]
        @param {string} enumPropertyName
        A valid enum property name for EzIntegrationProviderId
        @returns {string}
     */
    static ezToIntegrationSetupDialogApiName(enumPropertyName) {
        let enumData = this[EzEnumeration2.ENUM_DATA_METHOD_NAME](enumPropertyName);

        return EzObject.isValid(enumData)
            ? EzString.stringOrEmpty(enumData['ezIntegrationSetupDialogApiName'])
            : EzString.EMPTY;
    }

    /**
        @static
        @public @method
        Returns the integration's application/company website.
        @param {string} enumPropertyName
        A valid enum property name for EzIntegrationProviderId
        @returns {string}
     */
    static ezToIntegrationHomeUrl(enumPropertyName) {
        let enumData = this[EzEnumeration2.ENUM_DATA_METHOD_NAME](enumPropertyName);

        return EzObject.isValid(enumData)
            ? EzString.stringOrEmpty(enumData['ezIntegrationHomeUrl'])
            : EzString.EMPTY;
    }

    /**
        @static
        @public @method
        Returns the url to the logo that can be used for the integration.
        NOTE: Some logos we cannot use without permission so the result could be a generic image or none at all.
        @param {string} enumPropertyName
        A valid enum property name for EzIntegrationProviderId
        @returns {string}
     */
    static ezToIntegrationLogoUrl(enumPropertyName) {
        let enumData = this[EzEnumeration2.ENUM_DATA_METHOD_NAME](enumPropertyName);

        return EzObject.isValid(enumData)
            ? EzString.stringOrEmpty(enumData['ezIntegrationLogoUrl'])
            : EzString.EMPTY;
    }

    /**
        @static
        @public @method
        Returns the text that is used along with the integration logo to identify the integration.
        @param {string} enumPropertyName
        A valid enum property name for EzIntegrationProviderId
        @returns {string}
     */
    static ezToIntegrationLogoText(enumPropertyName) {
        let enumData = this[EzEnumeration2.ENUM_DATA_METHOD_NAME](enumPropertyName);

        return EzObject.isValid(enumData)
            ? EzString.stringOrEmpty(enumData['ezIntegrationLogoText'])
            : EzString.EMPTY;
    }
    static ezToIntegrationSubTitleText(enumPropertyName) {
        let enumData = this[EzEnumeration2.ENUM_DATA_METHOD_NAME](enumPropertyName);

        return EzObject.isValid(enumData)
            ? EzString.stringOrEmpty(enumData['ezIntegrationSubTitleText'])
            : EzString.EMPTY;
    }

    /**
        @static
        @public @method
        Returns the root HTML element id for the integration's ezClocker setup dialog.
        @param {string} enumPropertyName
        A valid enum property name for EzIntegrationProviderId
        @returns {string}
     */
    static ezToIntegrationSetupDialogId(enumPropertyName) {
        let enumData = this[EzEnumeration2.ENUM_DATA_METHOD_NAME](enumPropertyName);

        return EzObject.isValid(enumData)
            ? EzString.stringOrEmpty(enumData['ezIntegrationSetupDialogId'])
            : EzString.EMPTY;
    }

    /**
        @static
        @public @method
        Returns the name of the product that ezClocker is integrating with.
        @param {string} enumPropertyName
        A valid enum property name for EzIntegrationProviderId
        @returns {string}
     */
    static ezToIntegrationProductName(enumPropertyName) {
        let enumData = this[EzEnumeration2.ENUM_DATA_METHOD_NAME](enumPropertyName);

        return EzObject.isValid(enumData)
            ? EzString.stringOrEmpty(enumData['ezIntegrationProductName'])
            : EzString.EMPTY;
    }

    /**
        @static
        @public @method
        Returns the home website of the specific product Ezclocker is integrating with.
        @param {string} enumPropertyName
        A valid enum property name for EzIntegrationProviderId
        @returns {string}
     */
    static ezToIntegrationProductHomeUrl(enumPropertyName) {
        let enumData = this[EzEnumeration2.ENUM_DATA_METHOD_NAME](enumPropertyName);

        return EzObject.isValid(enumData)
            ? EzString.stringOrEmpty(enumData['ezIntegrationProductHomeUrl'])
            : EzString.EMPTY;
    }

    /**
        @static
        @public @method
        Returns the HTML 'notes' relating to the integration for use in ezClocker's UX
        @param {string} enumPropertyName
        A valid enum property name for EzIntegrationProviderId
        @returns {string}
     */
    static ezToIntegrationSetupNotes(enumPropertyName) {
        let enumData = this[EzEnumeration2.ENUM_DATA_METHOD_NAME](enumPropertyName);

        return EzObject.isValid(enumData)
            ? EzString.stringOrEmpty(enumData['ezIntegrationSetupNotes'])
            : EzString.EMPTY;
    }

    /**
        @static
        @public @method
        Returns the integration's help url relating to integrations.
        Most of the time, this is an external site not maintained or owned by Ezclocker.
        @param {string} enumPropertyName
        A valid enum property name for EzIntegrationProviderId
        @returns {string}
     */
    static ezToIntegrationHelpUrl(enumPropertyName) {
        let enumData = this[EzEnumeration2.ENUM_DATA_METHOD_NAME](enumPropertyName);

        return EzObject.isValid(enumData)
            ? EzString.stringOrEmpty(enumData['ezIntegrationHelpUrl'])
            : EzString.EMPTY;
    }

    /**
        @static
        @public @method
        Returns ezClocker's EzNovaAuthenticationProviderId for the provided enumPropertyName (EzIntegrationProviderId)
        @param {string} enumPropertyName
        A valid enum property name from EzIntegrationProviderId
        @returns {string}
        A valid enum property value from EzNovaAuthenticationProviderId
     */
    static ezToEzNovaAuthenticationProviderId(enumPropertyName) {
        let enumData = this[EzEnumeration2.ENUM_DATA_METHOD_NAME](enumPropertyName);

        return EzObject.isValid(enumData)
            ? EzNovaAuthenticationProviderId.ezValueOf(
                EzString.stringOrDefault(
                    enumData['ezNovaAuthenticationProviderId'],
                    EzNovaAuthenticationProviderId.UNKNOWN))
            : EzNovaAuthenticationProviderId;
    }

    /**
        @static
        @public @method
        Returns EzIntegrationType for the provided enumPropertyName (EzIntegrationProviderId)
        @param {string} enumPropertyName
        A valid enum property name from EzIntegrationProviderId
        @returns {string}
        A valid enum property value from EzIntegrationType
     */
    static ezToEzIntegrationType(enumPropertyName) {
        let enumData = this[EzEnumeration2.ENUM_DATA_METHOD_NAME](enumPropertyName);

        return EzObject.isValid(enumData)
            ? EzIntegrationType.ezValueOf(
                EzString.stringOrDefault(
                    enumData['ezIntegrationType'],
                    EzIntegrationType.UNKNOWN))
            : EzIntegrationType.UNKNOWN;
    }

    /**
        @static
        @public @method
        Returns a string code id for the integration
        @param {string} enumPropertyName
        A valid enum property name for EzIntegrationProviderId
        @returns {string}
     */
    static ezToCodeId(enumPropertyName) {
        let enumData = this[EzEnumeration2.ENUM_DATA_METHOD_NAME](enumPropertyName);

        return EzObject.isValid(enumData)
            ? EzString.stringOrDefault(
                enumData['ezCodeId'],
                'UNKNOWN')
            : 'UNKNOWN';
    }

    /**
        @static
        @public @method
        Returns the integrations short name.
        @param {string} enumPropertyName
        A valid enum property name for EzIntegrationProviderId
        @returns {string}
     */
    static ezToShortName(enumPropertyName) {
        let enumData = this[EzEnumeration2.ENUM_DATA_METHOD_NAME](enumPropertyName);

        return EzObject.isValid(enumData)
            ? EzString.stringOrEmpty(enumData['ezShortName'])
            : EzString.EMPTY;
    }
}

export {
    EzNovaIntegrationProviderId,
    EzAuthenticationStatus,
    EzIntegrationOptions,
    EzNovaAuthType,
    EzOAuth2ProviderId,
    EzNovaOAuth2ConfigurationProviderId,
    EzNovaOAuth2ProviderId,
    EzNovaOAuthProviderId,
    EzNovaAuthenticationProviderId,
    EzIntegrationType,
    EzIntegrationProviderId
};

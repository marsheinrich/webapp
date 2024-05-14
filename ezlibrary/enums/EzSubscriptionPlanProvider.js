/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ENGINEERING NOTES
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Keep this enumeration class in sync with:
        Java enum: com.ezclocker.constants.EzSubscriptionPlanProvider
        Project: git@github.com:ezclocker/ezclocker.git
    -----------------------------------------------------------------
    Please be aware of mixing up this class with a similar enum class
    named EzNovaBillingProviderId at /ezlibrary/enums/EzNovaBillingProviderId.js.
    Before using EzSubscriptionPlanProvider (this enum) or the
    EzNovaBillingProviderId make sure you understand the definition
    and intended use of each of them:
        * EzSubscriptionPlanProvider (this class):
            1) Defines the available subscription types from available
            from billing providers.
            2) Used to identify a subscription type for a specific
               billing provider.
        * EzNovaBillingProviderId:
            1) Defines the available billing providers.
            2) Used to identify a specific billing provider
               (not a subscription from a billing provider).
    In mose cases, the EzSubscriptionPlanProvider (this class) is what
    you want to use. Especially when dealing with licenses or
    subscriptions.
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzString,
    EzBoolean
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

import { EzNovaBillingProviderId } from '/ezlibrary/enums/EzNovaBillingProviderId.js';

/**
    @class
    @extends {EzEnumeration2}
    @description
    Defines the available subscription types from billing providers
    -----------------------------------------------------------------
    Import into non-enumeration classes with:
        import {
            // ... other enumeration classes ...
            EzSubscriptionPlanProvider
        } from '/ezlibrary/enums/EzEnumerations.js';
    -----------------------------------------------------------------
    Import into another enumeration class with:
        import { EzSubscriptionPlanProvider } from '/ezlibrary/enums/EzSubscriptionPlanProvider.js';
    -----------------------------------------------------------------
    Access static reference:
        Inside class: EzSubscriptionPlanProvider.{method or property}
        Outside of class: EzSubscriptionPlanProvider.{method or property}
    -----------------------------------------------------------------
 */
export class EzSubscriptionPlanProvider extends EzEnumeration2 {
    /**
        @private @field
        Stores the singleton instance of this enumeration class.
        @type {EzSubscriptionPlanProvider}
     */
    static #ezEnumerationSingleton = null;

    /**
        @static
        Static Initialization
     */
    static {
        if (null == EzSubscriptionPlanProvider.#ezEnumerationSingleton) {
            EzSubscriptionPlanProvider.#ezEnumerationSingleton = new EzSubscriptionPlanProvider(
                // Enum property names
                [
                    'UNKNOWN',
                    'APPLE_SUBSCRIPTION',
                    'BRAINTREEPAYMENTS_SUBSCRIPTION',
                    'EZCLOCKER_FREE_TRIAL',
                    'EZCLOCKER_SUBSCRIPTION',
                    'GOOGLE_PLAY_SUBSCRIPTION',
                    'PAY_PAL_SUBSCRIPTION'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                [
                    "UNKNOWN_SUBSCRIPTION_PROVIDER",
                    "APPLE_SUBSCRIPTION",
                    "BRAINTREEPAYMENTS_SUBSCRIPTION",
                    "EZCLOCKER_FREE_TRIAL",
                    "EZCLOCKER_SUBSCRIPTION",
                    "GOOGLE_PLAY_SUBSCRIPTION",
                    "PAY_PAL_SUBSCRIPTION"
                ],
                // Optional array of additional data for eac enumeration property.
                // Enter null if not needed.
                [
                    // UNKNOWN
                    {
                        ezNovaBillingProviderId: EzNovaBillingProviderId.UNKNOWN,
                        providerDisplayName: "Unknown subscription plan provider",
                        subscriptionInfoUrl: "/secure/account.html",
                        subscriptionManagementUrl: "/secure/account.html",
                        websiteManagementAvailable: true
                    },
                    // APPLE_SUBSCRIPTION
                    {
                        ezNovaBillingProviderId: EzNovaBillingProviderId.APPLE_STORE,
                        providerDisplayName: "Apple App Store",
                        subscriptionInfoUrl: "https://support.apple.com/en-us/HT202039",
                        subscriptionManagementUrl: "https://support.apple.com/en-us/HT202039",
                        websiteManagementAvailable: false
                    },
                    //BRAINTREEPAYMENTS_SUBSCRIPTION
                    {
                        ezNovaBillingProviderId: EzNovaBillingProviderId.BRAIN_TREE_PAYMENTS,
                        providerDisplayName: "Unknown subscription plan provider",
                        subscriptionInfoUrl: "/secure/account.html",
                        subscriptionManagementUrl: "/secure/account.html",
                        websiteManagementAvailable: true
                    },
                    // EZCLOCKER_FREE_TRIAL
                    {
                        ezNovaBillingProviderId: EzNovaBillingProviderId.EZCLOCKER,
                        providerDisplayName: "Unknown subscription plan provider",
                        subscriptionInfoUrl: "/secure/account.html",
                        subscriptionManagementUrl: "/secure/account.html",
                        websiteManagementAvailable: true
                    },
                    // EZCLOCKER_SUBSCRIPTION
                    {
                        ezNovaBillingProviderId: EzNovaBillingProviderId.EZCLOCKER,
                        providerDisplayName: "Unknown subscription plan provider",
                        subscriptionInfoUrl: "/secure/account.html",
                        subscriptionManagementUrl: "/secure/account.html",
                        websiteManagementAvailable: true
                    },
                    // GOOGLE_PLAY_SUBSCRIPTION
                    {
                        ezNovaBillingProviderId: EzNovaBillingProviderId.GOOGLE_PLAY,
                        providerDisplayName: "Unknown subscription plan provider",
                        subscriptionInfoUrl: "/secure/account.html",
                        subscriptionManagementUrl: "/secure/account.html",
                        websiteManagementAvailable: false
                    },
                    // PAY_PAL_SUBSCRIPTION
                    {
                        ezNovaBillingProviderId: EzNovaBillingProviderId.PAY_PAL,
                        providerDisplayName: "Unknown subscription plan provider",
                        subscriptionInfoUrl: "/secure/account.html",
                        subscriptionManagementUrl: "/secure/account.html",
                        websiteManagementAvailable: false
                    }
                ]);
        }
    }

    /**
        @static
        @public @method
        Returns the subscription plan provider's display name
        @param {string} enumValue
        A valid enum property value from EzSubscriptionPlanProvider
        @returns {string}
     */
    static ezGetSubscriptionPlanProviderDisplayName(enumValue) {
        if (!EzString.stringHasLength(enumValue)) {
            throw new EzBadParamException(
                'enumValue',
                EzSubscriptionPlanProvider,
                EzSubscriptionPlanProvider.ezGetProviderDisplayName);
        }

        return EzSubscriptionPlanProvider.ezEnumData(enumValue).providerDisplayName;
    }

    /**
        @static
        @public @method
        Returns the subscription plan provider's subscription information
        Could be internal to ezClocker or an external website.
        @param {string} enumValue
        A valid enum property value from EzSubscriptionPlanProvider
        @returns {string}
     */
    static ezGetSubscriptionPlanProviderSubscriptionInfoUrl(enumValue) {
        if (!EzString.stringHasLength(enumValue)) {
            throw new EzBadParamException(
                'enumValue',
                EzSubscriptionPlanProvider,
                EzSubscriptionPlanProvider.ezGetProviderDisplayName);
        }

        return EzSubscriptionPlanProvider.ezEnumData(enumValue).subscriptionInfoUrl;
    }

    /**
        @static
        @public @method
        Returns the subscription plan provider's management url
        Could be internal to ezClocker or an external website.
        @param {string} enumValue
        A valid enum property value from EzSubscriptionPlanProvider
        @returns {string}
     */
    static ezGetSubscriptionPlanProviderSubscriptionManagementUrl(enumValue) {
        if (!EzString.stringHasLength(enumValue)) {
            throw new EzBadParamException(
                'enumValue',
                EzSubscriptionPlanProvider,
                EzSubscriptionPlanProvider.ezGetProviderDisplayName);
        }

        return EzSubscriptionPlanProvider.ezEnumData(enumValue).subscriptionManagementUrl;
    }

    /**
        @static
        @public @method
        Determines if the provided subscription plan manager id has ezClocker website management support
        (instead of going to the provider's own website)
        @param {string} enumValue
        A valid enum property value from EzSubscriptionPlanProvider
        @returns {boolean}
     */
    static ezIsWebsiteManagementAvailableForSubscriptionPlanProvider(enumValue) {
        if (!EzString.stringHasLength(enumValue)) {
            throw new EzBadParamException(
                'enumValue',
                EzSubscriptionPlanProvider,
                EzSubscriptionPlanProvider.ezGetProviderDisplayName);
        }

        return EzBoolean.isTrue(EzSubscriptionPlanProvider.ezEnumData(enumValue).websiteManagementAvailable);
    }

    /**
        @static
        @public @method
        Determines if the provided ezSubscriptionPlanProviderValue is a free plan provider.
        @param {string} ezSubscriptionPlanProviderValue
        A valid enum property value from EzSubscriptionPlanProviderValue
        @returns {boolean}
     */
    static isFreePlanProvider(ezSubscriptionPlanProviderValue) {
        return EzSubscriptionPlanProvider.EZCLOCKER_SUBSCRIPTION === ezSubscriptionPlanProviderValue;
    }

    /**
        @static
        @public @method
        Determines if the provided ezSubscriptionPlanProviderValue is a free-trial plan provider.
        @param {string} ezSubscriptionPlanProviderValue
        A valid enum property value from EzSubscriptionPlanProviderValue
        @returns {boolean}
     */
    static isFreeTrialPlanProvider(ezSubscriptionPlanProviderValue) {
        return EzSubscriptionPlanProvider.EZCLOCKER_FREE_TRIAL === ezSubscriptionPlanProviderValue;
    }

    /**
        @static
        @public @method
        Determines if the provided ezSubscriptionPlanProviderValue is a paid-plan provider.
        @param {string} ezSubscriptionPlanProviderValue
        A valid enum property value from EzSubscriptionPlanProviderValue
        @returns {boolean}
     */
    static isPaidPlanProvider(ezSubscriptionPlanProviderValue) {
        return EzSubscriptionPlanProvider.BRAINTREEPAYMENTS_SUBSCRIPTION === ezSubscriptionPlanProviderValue ||
        EzSubscriptionPlanProvider.APPLE_SUBSCRIPTION === ezSubscriptionPlanProviderValue ||
        EzSubscriptionPlanProvider.GOOGLE_PLAY_SUBSCRIPTION === ezSubscriptionPlanProviderValue ||
        EzSubscriptionPlanProvider.PAY_PAL_SUBSCRIPTION === ezSubscriptionPlanProviderValue;
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

/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ENGINEERING NOTES
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Keep this enumeration class in sync with:
        Java enum: com.eznova.common.billing.providers.EzNovaBillingProviderId
        Project: git@github.com:ezclocker/eznova-shared-parent.git
    -----------------------------------------------------------------
    Please be aware of mixing up this class with a similar enum class
    named EzSubscriptionPlanProvider at /ezlibrary/enums/EzSubscriptionPlanProvider.js.
    Before using EzNovaBillingProviderId (this enum) or the
    EzSubscriptionPlanProvider make sure you understand the definition
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
    In mose cases, the EzSubscriptionPlanProvider is what you want
    to use. Especially when dealing with licenses or subscriptions.
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

/**
    @class
    @extends {EzEnumeration2}
    @description
    Javascript enumeration equivlant to Javas's enum com.eznova.common.billing.providers.BillingProviderId.java.
    -----------------------------------------------------------------
    Import into non-enumeration classes with:
        import {
            // ... other enumeration classes ...
            EzBillingProviderId
        } from '/ezlibrary/enums/EzEnumerations.js';
    ---------------------------------------------------------------------------
    Import into another enumeration class with:
        import { EzNovaBillingProviderId } from '/ezlibrary/enums/EzNovaBillingProviderId.js';
    ---------------------------------------------------------------------------
    Access static reference:
        Inside class: EzNovaBillingProviderId.{method or property}
        Outside of class: EzNovaBillingProviderId.{method or property}
    ---------------------------------------------------------------------------
 */
export class EzNovaBillingProviderId extends EzEnumeration2 {
    /**
        @private @field
        Stores the singleton instance of this enumeration class.
        @type {EzNovaBillingProviderId}
     */
    static #ezEnumerationSingleton = null;

    /**
        @static
        Static Initialization
     */
    static {
        if (null == EzNovaBillingProviderId.#ezEnumerationSingleton) {
            EzNovaBillingProviderId.#ezEnumerationSingleton = new EzNovaBillingProviderId(
                // Enum property names
                [
                    'UNKNOWN',
                    'EZCLOCKER',
                    'EZNOVA_TECHNOLOGIES',
                    'BRAIN_TREE_PAYMENTS',
                    'APPLE_STORE',
                    'GOOGLEPLAY',
                    'PAY_PAL'
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

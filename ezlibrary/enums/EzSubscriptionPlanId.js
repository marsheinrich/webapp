import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzJson
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

/**
    @class
    @extends {EzEnumeration2}
    @description
    Defines the available (known) subscription plan ids. From the
    SubscriptionPlan.planId column in the subscription_plan db.
    ---------------------------------------------------------------------------
    Import in non-enumeration classes:
        import {
            // <other enumeration classes ...>
            EzSubscriptionPlanId
        } from '/ezlibrary/enums/EzEnumerations.js';
    ---------------------------------------------------------------------------
    Import into other enumeration classes:
        import { EzSubscriptionPlanId } from '/ezlibrary/enums/EzSubscriptionPlanId.js';
    ---------------------------------------------------------------------------
    Access static reference:
        Inside of EzSubscriptionPlanId: EzSubscriptionPlanId.{method or property}
        Outside of EzSubscriptionPlanId: EzSubscriptionPlanId.{method or property}
    ---------------------------------------------------------------------------
 */
export class EzSubscriptionPlanId extends EzEnumeration2 {
    /**
        @private @field
        Stores the singleton instance of this enumeration class.
        @type {EzSubscriptionPlanId}
     */
    static #ezEnumerationSingleton = null;

    /**
        @static
        Static Initialization
     */
    static {
        if (null == EzSubscriptionPlanId.#ezEnumerationSingleton) {
            EzSubscriptionPlanId.#ezEnumerationSingleton = new EzSubscriptionPlanId(
                // Enum property names
                [
                    'UNKNOWN',
                    'FREE',
                    'EZCLOCKER_5',
                    'EZCLOCKER_5_FREE',
                    'EZCLOCKER_10',
                    'EZCLOCKER_10_FREE',
                    'EZCLOCKER_20',
                    'EZCLOCKER_20_FREE',
                    'EZCLOCKER_50',
                    'EZCLOCKER_50_FREE',
                    'EZCLOCKER_PERSONAL',
                    'EZCLOCKER_PERSONAL_EMPLOYER_UNLIMITED',
                    'EZCLOCKER_Unlimited',
                    'COM_EZNOVATECH_EZCLOCKER_EZCLOCKER_5',
                    'COM_EZNOVATECH_EZCLOCKER_EZCLOCKER_FREE_5',
                    'COM_EZNOVATECH_EZCLOCKER_EZCLOCKER_10',
                    'COM_EZNOVATECH_EZCLOCKER_EZCLOCKER_FREE_10',
                    'COM_EZNOVATECH_EZCLOCKER_EZCLOCKER_20',
                    'COM_EZNOVATECH_EZCLOCKER_EZCLOCKER_FREE_20',
                    'COM_EZNOVATECH_EZCLOCKER_EZCLOCKER_50',
                    'COM_EZNOVATECH_EZCLOCKER_EZCLOCKER_FREE_50',
                    'COM_EZNOVATECH_EZCLOCKER_EZCLOCKER_100',
                    'COM_EZNOVATECH_EZCLOCKER_EZCLOCKER_FREE_100',
                    'COM_EZNOVATECH_EZCLOCKER_EZCLOCKER_150',
                    'COM_EZNOVATECH_EZCLOCKER_EZCLOCKER_FREE_150',
                    'COM_EZNOVATECH_EZCLOCKER_EZCLOCKER_THANK_YOU',
                    'EZ_2018_MONTHLY_EZCLOCKER_FREE',
                    'EZ_2018_MONTHLY_EZCLOCKER_DEV',
                    'EZ_2018_YEARLY_EZCLOCKER_5_ONCE',
                    'EZ_2018_MONTHLY_EZCLOCKER_10',
                    'EZ_2018_YEARLY_EZCLOCKER_10_ONCE',
                    'EZ_2018_MONTHLY_EZCLOCKER_10_FREE',
                    'EZ_2018_YEARLY_EZCLOCKER_20',
                    'EZ_2018_YEARLY_EZCLOCKER_20_ONCE',
                    'EZ_2018_YEARLY_EZCLOCKER_20_FREE',
                    'EZ_2018_MONTHLY_EZCLOCKER_25',
                    'EZ_2018_MONTHLY_EZCLOCKER_25_FREE',
                    'EZ_2018_MONTHLY_EZCLOCKER_50',
                    'EZ_2018_MONTHLY_EZCLOCKER_50_FREE',
                    'EZ_2018_YEARLY_EZCLOCKER_50_ONCE',
                    'EZ_2018_YEARLY_EZCLOCKER_120',
                    'EZ_2018_YEARLY_EZCLOCKER_120_FREE',
                    'EZ_2018_YEARLY_EZCLOCKER_300',
                    'EZ_2018_YEARLY_EZCLOCKER_300_FREE',
                    'EZ_2018_YEARLY_EZCLOCKER_600',
                    'EZ_2018_YEARLY_EZCLOCKER_600_FREE',
                    'EZ_2020_MONTHLY_EZCLOCKER_35',
                    'EZ_2020_MONTHLY_EZCLOCKER_35_FREE',
                    'EZ_2020_MONTHLY_EZCLOCKER_250',
                    'EZ_2020_MONTHLY_EZCLOCKER_250_FREE',
                    'EZ_2020_YEARLY_EZCLOCKER_120',
                    'EZ_2020_YEARLY_EZCLOCKER_120_FREE',
                    'EZ_2020_YEARLY_EZCLOCKER_300',
                    'EZ_2020_YEARLY_EZCLOCKER_300_FREE',
                    'EZ_2020_YEARLY_EZCLOCKER_600',
                    'EZ_2020_YEARLY_EZCLOCKER_600_FREE',
                    'EZ_2020_MONTHLY_EZCLOCKER_PERSONAL_EMPLOYER',
                    'EZ_2020_MONTHLY_PERSONAL_PRO',
                    'EZ_2020_MONTHLY_PERSONAL_PRO_FREE',
                    'EZ_2021_MONTHLY_EZCLOCKER_PERSONAL_FREE',
                    'EZ_2021_MONTHLY_EZCLOCKER_200',
                    'EZ_2021_MONTHLY_EZCLOCKER_200_FREE',
                    'EZ_2023_MONTHLY_EZCLOCKER_BASIC_PLUS',
                    'EZ_2023_MONTHLY_EZCLOCKER_BASIC_PLUS_FREE',
                    'EZ_2023_MONTHLY_EZCLOCKER_STANDARD_PLUS',
                    'EZ_2023_MONTHLY_EZCLOCKER_STANDARD_PLUS_FREE',
                    'EZ_2023_MONTHLY_EZCLOCKER_PREMIUM_PLUS',
                    'EZ_2023_MONTHLY_EZCLOCKER_PREMIUM_PLUS_FREE'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                [
                    'UNKNOWN',
                    'free',
                    'ezclocker5',
                    'ezclocker5free',
                    'ezclocker10',
                    'ezclocker10Free',
                    'ezclocker20',
                    'ezclocker20Free',
                    'ezclocker50',
                    'ezclocker50Free',
                    'ezclockerPersonal',
                    'ezclockerPersonalEmployer.UNLIMITED',
                    'ezclockerUnlimited',
                    'com.eznovatech.ezclocker.ezClocker5',
                    'com.eznovatech.ezclocker.ezclockerFree5',
                    'com.eznovatech.ezclocker.ezClocker10',
                    'com.eznovatech.ezclocker.ezclockerFree10',
                    'com.eznovatech.ezclocker.ezClocker20',
                    'com.eznovatech.ezclocker.ezClockerFree20',
                    'com.eznovatech.ezclocker.ezClocker50',
                    'com.eznovatech.ezclocker.ezClockerFree50',
                    'com.eznovatech.ezclocker.ezClocker100',
                    'com.eznovatech.ezclocker.ezClockerFree100',
                    'com.eznovatech.ezclocker.ezClocker150',
                    'com.eznovatech.ezclocker.ezClockerFree150',
                    'com.eznovatech.ezclocker.ezclockerThankYou',
                    'ez2018.monthly.ezclocker.free',
                    'ez2018-monthly-ezclockerDev',
                    'ez2018.yearly.ezclocker5.once',
                    'ez2018.monthly.ezclocker10',
                    'ez2018.yearly.ezclocker10.once',
                    'ez2018.monthly.ezclocker10free',
                    'ez2018.yearly.ezclocker20',
                    'ez2018.yearly.ezclocker20.once',
                    'ez2018.yearly.ezclocker20free',
                    'ez2018.monthly.ezclocker25',
                    'ez2018.monthly.ezclocker25free',
                    'ez2018.monthly.ezclocker50',
                    'ez2018.monthly.ezclocker50free',
                    'ez2018.yearly.ezclocker50.once',
                    'ez2018-yearly-ezclocker120',
                    'ez2018-yearly-ezclocker120-free',
                    'ez2018-yearly-ezclocker300',
                    'ez2018-yearly-ezclocker300-free',
                    'ez2018-yearly-ezclocker600',
                    'ez2018-yearly-ezclocker600-free',
                    'ez2020.monthly.ezclocker35',
                    'ez2020.monthly.ezclocker35-free',
                    'ez2020-montly-ezclocker250',
                    'ez2020-montly-ezclocker250-free',
                    'ez2020-yearly-ezclocker120',
                    'ez2020-yearly-ezclocker120-free',
                    'ez2020-yearly-ezclocker300',
                    'ez2020-yearly-ezclocker300-free',
                    'ez2020-yearly-ezclocker600',
                    'ez2020-yearly-ezclocker600-free',
                    'ez2020.monthly.ezclocker-personal-employer',
                    'ez2020-montly-personal-pro',
                    'ez2020-montly-personal-pro-free',
                    'ez2021.monthly.ezclocker.personal.free',
                    'ez2021.monthly.ezclocker200',
                    'ez2021.monthly.ezclocker200-free',
                    'ez2023.monthly.ezclocker.basic.plus',
                    'ez2023.monthly.ezclocker.basic.plus.free',
                    'ez2023.monthly.ezclocker.standard.plus',
                    'ez2023.monthly.ezclocker.standard.plus.free',
                    'ez2023.monthly.ezclocker.premium.plus',
                    'ez2023.monthly.ezclocker.premium.plus.free'
                ],
                // Optional array of additional data for eac enumeration property.
                // Enter null if not needed.
                [
                    // UNKNOWN
                    {
                        enabled: false,
                        plan_level:  -99999999,
                        plan_iteration: -99999999,
                        version: 1,
                        prdEnabled: false,
                        displayName: EzString.EMPTY
                    },
                    // free
                    {
                        enabled: false,
                        plan_level:  0,
                        plan_iteration: 0,
                        version: 1,
                        prdEnabled: true,
                        displayName: 'Free Plan'
                    },
                    // ezclocker5
                    {
                        enabled: false,
                        plan_level:  5,
                        plan_iteration: 0,
                        version: 1,
                        prdEnabled: false,
                        displayName: 'Small Business Plan'
                    },
                    // ezclocker5free
                    {
                        enabled: false,
                        plan_level:  -5,
                        plan_iteration: 0,
                        version: 1,
                        prdEnabled: true,
                        displayName: 'Small Business Free Plan'
                    },
                    // ezclocker10
                    {
                        enabled: false,
                        plan_level:  10,
                        plan_iteration: 0,
                        version: 1,
                        prdEnabled: true,
                        displayName: 'Medium Business Plan'
                    },
                    // ezclocker10Free
                    {
                        enabled: false,
                        plan_level:  -10,
                        plan_iteration: 0,
                        version: 1,
                        prdEnabled: false,
                        displayName: 'Medium Business Free Plan'
                    },
                    // ezclocker20
                    {
                        enabled: false,
                        plan_level:  20,
                        plan_iteration: 0,
                        version: 1,
                        prdEnabled: false,
                        displayName: 'Large Business Plan'
                    },
                    // ezclocker20Free
                    {
                        enabled: false,
                        plan_level:  -20,
                        plan_iteration: 0,
                        version: 1,
                        prdEnabled: false,
                        displayName: 'Large Business Free Plan'
                    },
                    // ezclocker50
                    {
                        enabled: false,
                        plan_level:  50,
                        plan_iteration: 0,
                        version: 1,
                        prdEnabled: false,
                        displayName: 'Corporate Plan'
                    },
                    // ezclocker50Free
                    {
                        enabled: false,
                        plan_level:  -50,
                        plan_iteration: 0,
                        version: 1,
                        prdEnabled: false,
                        displayName: 'Corporate Free Plan'
                    },
                    // ezclockerPersonal
                    {
                        enabled: false,
                        plan_level:  20140000,
                        plan_iteration: 0,
                        version: 1,
                        prdEnabled: true,
                        displayName: 'Personal Free Plan'
                    },
                    // ezclockerPersonalEmployer.UNLIMITED
                    {
                        enabled: false,
                        plan_level:  -20149999,
                        plan_iteration: 3,
                        version: 2014,
                        prdEnabled: true,
                        displayName: 'Personal Unlimited Free Plan'
                    },
                    // ezclockerUnlimited
                    {
                        enabled: false,
                        plan_level:  -20149999,
                        plan_iteration: 2,
                        version: 2014,
                        prdEnabled: true,
                        displayName: 'Unlimited Free Plan'
                    },
                    // com.eznovatech.ezclocker.ezClocker5
                    {
                        enabled: false,
                        plan_level:  20140005,
                        plan_iteration: 0,
                        version: 2014,
                        prdEnabled: true,
                        displayName: '$5 Small Business Plan'
                    },
                    // com.eznovatech.ezclocker.ezclockerFree5
                    {
                        enabled: false,
                        plan_level:  -20140005,
                        plan_iteration: 0,
                        version: 2014,
                        prdEnabled: true,
                        displayName: '$5 Small Business Free Plan'
                    },
                    // com.eznovatech.ezclocker.ezClocker10
                    {
                        enabled: false,
                        plan_level:  20140010,
                        plan_iteration: 0,
                        version: 2014,
                        prdEnabled: true,
                        displayName: '$10 Medium Business Plan'
                    },
                    // com.eznovatech.ezclocker.ezclockerFree10
                    {
                        enabled: false,
                        plan_level:  -20140010,
                        plan_iteration: 0,
                        version: 2014,
                        prdEnabled: true,
                        displayName: '$10 Medium Business Free Plan'
                    },
                    // com.eznovatech.ezclocker.ezClocker20
                    {
                        enabled: false,
                        plan_level:  20140020,
                        plan_iteration: 0,
                        version: 2014,
                        prdEnabled: true,
                        displayName: '$20 Large Business Plan'
                    },
                    // com.eznovatech.ezclocker.ezClockerFree20
                    {
                        enabled: false,
                        plan_level:  -20140020,
                        plan_iteration: 0,
                        version: 2014,
                        prdEnabled: true,
                        displayName: '$20 Large Business Free Plan'
                    },
                    // com.eznovatech.ezclocker.ezClocker50
                    {
                        enabled: false,
                        plan_level:  20140050,
                        plan_iteration: 0,
                        version: 2014,
                        prdEnabled: true,
                        displayName: '$50 Corporate Plan'
                    },
                    // com.eznovatech.ezclocker.ezClockerFree50
                    {
                        enabled: false,
                        plan_level:  -20140050,
                        plan_iteration: 0,
                        version: 2014,
                        prdEnabled: false,
                        displayName: '$50 Corporate Free Plan'
                    },
                    // com.eznovatech.ezclocker.ezClocker100
                    {
                        enabled: false,
                        plan_level:  20140100,
                        plan_iteration: 0,
                        version: 2014,
                        prdEnabled: true,
                        displayName: 'Corporate Level 2 Plan'
                    },
                    // com.eznovatech.ezclocker.ezClockerFree100
                    {
                        enabled: false,
                        plan_level:  -20140100,
                        plan_iteration: 0,
                        version: 2014,
                        prdEnabled: true,
                        displayName: 'Corporate Level 2 Free Plan'
                    },
                    // com.eznovatech.ezclocker.ezClocker150
                    {
                        enabled: false,
                        plan_level:  20140150,
                        plan_iteration: 0,
                        version: 2014,
                        prdEnabled: true,
                        displayName: 'Corporate Level 3 Plan'
                    },
                    // com.eznovatech.ezclocker.ezClockerFree150
                    {
                        enabled: false,
                        plan_level:  -20140150,
                        plan_iteration: 0,
                        version: 2014,
                        prdEnabled: false,
                        displayName: 'Corporate Level 3 Free Plan'
                    },
                    // com.eznovatech.ezclocker.ezclockerThankYou
                    {
                        enabled: false,
                        plan_level:  -20149999,
                        plan_iteration: 1,
                        version: 2014,
                        prdEnabled: true,
                        displayName: 'EzClocker THANK YOU Free Plan'
                    },
                    // ez2018.monthly.ezclocker.free
                    {
                        enabled: true,
                        plan_level:  20180001,
                        plan_iteration: 0,
                        version: 2018,
                        prdEnabled: true,
                        displayName: 'Free Plan'
                    },
                    // ez2018-monthly-ezclockerDev
                    {
                        enabled: false,
                        plan_level:  -20189999,
                        plan_iteration: 0,
                        version: 2018,
                        prdEnabled: false,
                        displayName: 'Engineering Testing Plan'
                    },
                    // ez2018.yearly.ezclocker5.once
                    {
                        enabled: false,
                        plan_level:  20180005,
                        plan_iteration: 1,
                        version: 2018,
                        prdEnabled: false,
                        displayName: 'Small Business Yearly Plan'
                    },
                    // ez2018.monthly.ezclocker10
                    {
                        enabled: true,
                        plan_level:  20180010,
                        plan_iteration: 0,
                        version: 2018,
                        prdEnabled: true,
                        displayName: 'Basic Plan'
                    },
                    // ez2018.yearly.ezclocker10.once
                    {
                        enabled: false,
                        plan_level:  20180010,
                        plan_iteration: 1,
                        version: 2018,
                        prdEnabled: false,
                        displayName: 'Basic Plan for One Year'
                    },
                    // ez2018.monthly.ezclocker10free
                    {
                        enabled: false,
                        plan_level:  -20180010,
                        plan_iteration: 2,
                        version: 2018,
                        prdEnabled: true,
                        displayName: 'Basic Free Plan'
                    },
                    // ez2018.yearly.ezclocker20
                    {
                        enabled: false,
                        plan_level:  20180020,
                        plan_iteration: 2,
                        version: 2018,
                        prdEnabled: false,
                        displayName: 'Basic Business Plan'
                    },
                    // ez2018.yearly.ezclocker20.once
                    {
                        enabled: false,
                        plan_level:  20180020,
                        plan_iteration: 1,
                        version: 2018,
                        prdEnabled: false,
                        displayName: 'Basic Business Plan for One Year'
                    },
                    // ez2018.yearly.ezclocker20free
                    {
                        enabled: false,
                        plan_level:  -20180020,
                        plan_iteration: 2,
                        version: 2018,
                        prdEnabled: false,
                        displayName: 'Basic Business Free Plan'
                    },
                    // ez2018.monthly.ezclocker25
                    {
                        enabled: true,
                        plan_level:  20180025,
                        plan_iteration: 0,
                        version: 2018,
                        prdEnabled: true,
                        displayName: 'Standard Plan'
                    },
                    // ez2018.monthly.ezclocker25free
                    {
                        enabled: false,
                        plan_level:  -20180025,
                        plan_iteration: 0,
                        version: 2018,
                        prdEnabled: true,
                        displayName: 'Standard Free Plan'
                    },
                    // ez2018.monthly.ezclocker50
                    {
                        enabled: true,
                        plan_level:  20180050,
                        plan_iteration: 0,
                        version: 2018,
                        prdEnabled: true,
                        displayName: 'Premium Plan'
                    },
                    // ez2018.monthly.ezclocker50free
                    {
                        enabled: false,
                        plan_level:  -20180050,
                        plan_iteration: 0,
                        version: 2018,
                        prdEnabled: false,
                        displayName: 'Premium Free Plan'
                    },
                    // ez2018.yearly.ezclocker50.once
                    {
                        enabled: false,
                        plan_level:  20180050,
                        plan_iteration: 1,
                        version: 2018,
                        prdEnabled: false,
                        displayName: 'Premium Plan for One Year'
                    },
                    // ez2018-yearly-ezclocker120
                    {
                        enabled: false,
                        plan_level:  20180120,
                        plan_iteration: 2,
                        version: 2018,
                        prdEnabled: false,
                        displayName: 'Basic Yearly Plan'
                    },
                    // ez2018-yearly-ezclocker120-free
                    {
                        enabled: false,
                        plan_level:  -20180120,
                        plan_iteration: 2,
                        version: 2018,
                        prdEnabled: false,
                        displayName: 'Basic Yearly Free Plan'
                    },
                    // ez2018-yearly-ezclocker300
                    {
                        enabled: false,
                        plan_level:  20180300,
                        plan_iteration: 2,
                        version: 2018,
                        prdEnabled: false,
                        displayName: 'Standard Yearly Plan'
                    },
                    // ez2018-yearly-ezclocker300-free
                    {
                        enabled: false,
                        plan_level:  -20180300,
                        plan_iteration: 2,
                        version: 2018,
                        prdEnabled: false,
                        displayName: 'Standard Yearly Free Plan'
                    },
                    // ez2018-yearly-ezclocker600
                    {
                        enabled: false,
                        plan_level: 20180600,
                        plan_iteration: 2,
                        version: 2018,
                        prdEnabled: false,
                        displayName: 'Premium Yearly Plan'
                    },
                    // ez2018-yearly-ezclocker600-free
                    {
                        enabled: false,
                        plan_level: -20180600,
                        plan_iteration: 2,
                        version: 2018,
                        prdEnabled: false,
                        displayName: 'Premium Yearly Free Plan'
                    },
                    // ez2020.monthly.ezclocker35
                    {
                        enabled: false,
                        plan_level: 20200035,
                        plan_iteration: 0,
                        version: 2020,
                        prdEnabled: true,
                        displayName: 'Standard Plus Business Plan'
                    },
                    // ez2020.monthly.ezclocker35-free
                    {
                        enabled: false,
                        plan_level:  -20200035,
                        plan_iteration: 0,
                        version: 2020,
                        prdEnabled: true,
                        displayName: 'Standard Plus Business Free Plan'
                    },
                    // ez2020-montly-ezclocker250
                    {
                        enabled: false,
                        plan_level:  20200250,
                        plan_iteration: 0,
                        version: 2020,
                        prdEnabled: true,
                        displayName: EzString.EMPTY
                    },
                    // ez2020-montly-ezclocker250-free
                    {
                        enabled: false,
                        plan_level:  -20200250,
                        plan_iteration: 0,
                        version: 2020,
                        prdEnabled: false,
                        displayName: 'Corporate Level 4 Plan'
                    },
                    // ez2020-yearly-ezclocker120
                    {
                        enabled: false,
                        plan_level:  20200120,
                        plan_iteration: 2,
                        version: 2020,
                        prdEnabled: false,
                        displayName: 'Basic Yearly Plan'
                    },
                    // ez2020-yearly-ezclocker120-free
                    {
                        enabled: false,
                        plan_level:  -20200120,
                        plan_iteration: 2,
                        version: 2020,
                        prdEnabled: false,
                        displayName: 'Basic Yearly Free Plan'
                    },
                    // ez2020-yearly-ezclocker300
                    {
                        enabled: false,
                        plan_level:  20200300,
                        plan_iteration: 2,
                        version: 2020,
                        prdEnabled: false,
                        displayName: 'Standard Yearly Plan'
                    },
                    // ez2020-yearly-ezclocker300-free
                    {
                        enabled: false,
                        plan_level:  -20200300,
                        plan_iteration: 2,
                        version: 2020,
                        prdEnabled: false,
                        displayName: 'Standard Yearly Free Plan'
                    },
                    // ez2020-yearly-ezclocker600
                    {
                        enabled: false,
                        plan_level:  20200600,
                        plan_iteration: 2,
                        version: 2020,
                        prdEnabled: false,
                        displayName: 'Premium Yearly Plan'
                    },
                    // ez2020-yearly-ezclocker600-free
                    {
                        enabled: false,
                        plan_level:  -20200600,
                        plan_iteration: 2,
                        version: 2020,
                        prdEnabled: false,
                        displayName: 'Premium Yearly Free Plan'
                    },
                    // ez2020.monthly.ezclocker-personal-employer
                    {
                        enabled: false,
                        plan_level:  20209999,
                        plan_iteration: 0,
                        version: 2020,
                        prdEnabled: true,
                        displayName: 'EzClocker Personal Employer Plan'
                    },
                    // ez2020-monthly-personal-pro
                    {
                        enabled: false,
                        plan_level:  20200005,
                        plan_iteration: 0,
                        version: 2020,
                        prdEnabled: true,
                        displayName: 'Personal Pro Plan'
                    },
                    // ez2020-monthly-personal-pro-free
                    {
                        enabled: false,
                        plan_level:  -20200005,
                        plan_iteration: 0,
                        version: 2020,
                        prdEnabled: false,
                        displayName: 'Personal Pro Free Plan'
                    },
                    // ez2021.monthly.ezclocker.personal.free
                    {
                        enabled: false,
                        plan_level:  20210000,
                        plan_iteration: 0,
                        version: 2021,
                        prdEnabled: false,
                        displayName: 'Personal Pro Free Plan'
                    },
                    // ez2021.monthly.ezclocker200
                    {
                        enabled: false,
                        plan_level:  20200200,
                        plan_iteration: 0,
                        version: 2021,
                        prdEnabled: true,
                        displayName: 'Premium Level 2 Plan'
                    },
                    // ez2021.monthly.ezclocker200-free
                    {
                        enabled: false,
                        plan_level:  -20210200,
                        plan_iteration: 0,
                        version: 2021,
                        prdEnabled: false,
                        displayName: 'Premium Level 2 Free Plan'
                    },
                    // ez2023.monthly.ezclocker.basic.plus
                    {
                        enabled: false,
                        plan_level:  20230020,
                        plan_iteration: 0,
                        version: 2023,
                        prdEnabled: false,
                        displayName: 'Basic Plus Plan'
                    },
                    // ez2023.monthly.ezclocker.basic.plus.free
                    {
                        enabled: false,
                        plan_level:  -20230020,
                        plan_iteration: 0,
                        version: 2023,
                        prdEnabled: false,
                        displayName: 'Basic Plus Free Plan'
                    },
                    // ez2023.monthly.ezclocker.standard.plus
                    {
                        enabled: false,
                        plan_level:  20230035,
                        plan_iteration: 0,
                        version: 2023,
                        prdEnabled: false,
                        displayName: 'Standard Plus Plan'
                    },
                    // ez2023.monthly.ezclocker.standard.plus.free
                    {
                        enabled: false,
                        plan_level:  -20230035,
                        plan_iteration: 0,
                        version: 2023,
                        prdEnabled: false,
                        displayName: 'Standard Plus Free Plan'
                    },
                    // ez2023.monthly.ezclocker.premium.plus
                    {
                        enabled: false,
                        plan_level:  20230050,
                        plan_iteration: 0,
                        version: 2023,
                        prdEnabled: false,
                        displayName: 'Premium Plus Plan'
                    },
                    // ez2023.monthly.ezclocker.premium.plus.free
                    {
                        enabled: false,
                        plan_level:  20230060,
                        plan_iteration: 0,
                        version: 2023,
                        prdEnabled: false,
                        displayName: 'Premium Plus Free Plan'
                    }
                ]);
        }
    }

    /**
        @static
        @public @method
        Gets the enum data object for the enumeration property who's value matches the provided
        ezSubscriptionPlanIdValue.
        If not match is found, the enum data for the UNKNOWN property is returned.
        @returns {object}
     */
    static ezGetEzEnumDataForEnumValue(ezSubscriptionPlanIdValue) {
        if (!EzString.stringHasLength(ezSubscriptionPlanIdValue)) {
            throw new EzBadParamException(
                'ezSubscriptionPlanIdValue',
                EzSubscriptionPlanId,
                EzSubscriptionPlanId.ezGetEzSubscriptionPlanIdForEnumValue);
        }

        ezSubscriptionPlanIdValue = ezSubscriptionPlanIdValue.toUpperCase();

        for (let index = 0; index < EzSubscriptionPlanId.ezValues.length; index++) {
            if (EzSubscriptionPlanId.ezValues[index].toUpperCase() === ezSubscriptionPlanIdValue) {
                return EzSubscriptionPlanId.ezData[index];
            }
        }

        return EzSubscriptionPlanId.ezData[0];
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

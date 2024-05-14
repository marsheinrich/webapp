/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ENGINEERING NOTES
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Keep this class in sync with:
        Java enum: com.eznova.integrations.braintreepayments.enums.EzFeaturePackageId.java
        Project: git@github.com:ezclocker/ezclocker.git
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
import {
    EzString,
    EzHtml
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

import { EzFeaturePackageInfo } from '/ezlibrary/entities/billing/EzFeaturePackageInfo.js';

import { EzSubscriptionPlanProvider } from '/ezlibrary/enums/EzSubscriptionPlanProvider.js';


/**
 * @class
 * @extends {EzEnumeration2}
 * @description
 * Defines the known Feature Package ids for ezClocker
 * ---------------------------------------------------------------------
 * Import into non-enumeration classes with:
 *     import {
 *         // .. other enumeration classes in use ...
 *         EzFeaturePackageId
 *     } from '/ezlibrary/enums/EzEnumerations.js';
 * ---------------------------------------------------------------------------
 * Import into another enumeration class with:
 *     import { EzFeaturePackageId } from '/ezlibrary/enums/EzFeaturePackageId.js';
 * ---------------------------------------------------------------------------
 * Access static reference:
 *     Inside of EzFeaturePackageId: EzFeaturePackageId.{method or property}
 *     Outside of EzFeaturePackageId: EzFeaturePackageId.{method or property}
 * ---------------------------------------------------------------------------
 */
export class EzFeaturePackageId extends EzEnumeration2 {
    /**
     * @private @field
     * Stores the singleton instance of this enumeration class.
     * @type {EzFeaturePackageId}
    */
    static #ezEnumerationSingleton = null;

    /**
     * @private @field
     * Stores the EzFeaturePackageInfo for each EzSubscriptionAddOnId
     * @type {array}
     * An array of ezFeaturePackageInfo objects
     */
    static #ezFeaturePackageInfo = [];
    /**
     * @static
     * @public @property @getter
     * Gets the EzFeaturePackageInfo for each EzSubscriptionAddOnId
     * @returns {array}
     * An array of EzFeaturePackageAddOns objects
     */
    static get ezFeaturePackageInfo() {
        return this.#ezFeaturePackageInfo;
    }

    /**
     * @static
     * @private @method
     * Creates a billing provider subscription configuration for each add-on and supported billing provider
     */
    static #ezCreateFeaturePackageIdData() {
        // UNKNOWN
        // Index in ezSubscriptionAddOns: 0
        this.#ezFeaturePackageInfo.push(
            new EzFeaturePackageInfo(
                'UNKNOWN',
                // providerAddOnId
                'UNKNOWN',
                // braintreeAddOnId
                'UNKNOWN',
                // appleAddOnId
                'UNKNOWN',
                // googlePlayAddOnId
                'UNKNOWN',
                // payPalAddOnId
                'UNKNOWN',
                // name
                'Unknown Feature Package',
                false,
                [],
                0.00,
                false,
                false,
                false,
                false,
                EzString.EMPTY));

        // TIME_OFF
        // Index in ezSubscriptionAddOns: 1
        this.#ezFeaturePackageInfo.push(
            new EzFeaturePackageInfo(
                'TIME_OFF',
                // providerAddOnId
                'time-off-features-package',
                // braintreeAddOnId
                'time-off-features-package',
                // appleAddOnId
                'com.eznovatech.ezclocker.ezClocker.Timeoff',
                // googlePlayAddOnId
                'ez2023.monthly.ezclocker.timeoff',
                // payPalAddOnId
                'ez2023.monthly.ezclocker.timeoff',
                // name
                'Time Off Feature Package',
                true,
                [
                    'ez2018.monthly.ezclocker10',
                    'ez2018.monthly.ezclocker25',
                    'ez2018.monthly.ezclocker50',
                    "ez2018.monthly.ezclocker10",
                    "ez2018.monthly.ezclocker12",
                    "ez2018.monthly.ezclocker30",
                    "ez2018.monthly.ezclocker60",
                    "ez2023-yearly-ezclocker120",
                    "ez2023-yearly-ezclocker300",
                    "ez2023-yearly-ezclocker600",
                    "ez2023-yearly-engineering",
                    "ez2023.monthly.ezclocker50.check"
                ],
                10.00,
                false,
                true,
                false,
                false,
                EzHtml.build`
                    <h4
                        id="EzTimeOffFeaturePackageMarketingBlurb">
                        Enhance your subscription with the Time Off Features Package for an additional $10/month.
                    </h4>
                    <p
                        id="EzTimeOffFeaturePackageMarketingVideoParagraph">
                        Click
                            <a
                                id="EzTimeOffFeaturePackageMarketingVideoInfoLink"
                                href="https://vimeo.com/832430759"
                                target="EZCLOCKER_TIME_OFF_INFO_VIDEO">
                                here
                            </a>
                            to watch a video about ezClocker's new Time Off features.
                    </p>
                    <p
                        id="EzTimeOffFeaturePackageMarketingDetails">
                        Adding the Time Off Features Package to your Basic, Standard, or Premium subscription will enable the following features:
                        <ul
                            id="EzTimeOffFeaturePackageMarketingPoints">
                            <li
                                id="EzTimeOffFeaturePackageMarketingPoint1">
                                Employees can request paid and unpaid time off and track the status
                            </li>
                            <li
                                id="EzTimeOffFeaturePackageMarketingPoint2">
                                Employers/Managers can review, approve, deny, and track the status of employee time off requests.
                            </li>
                            <li
                                id="EzTimeOffFeaturePackageMarketingPoint3">
                                Time sheet reports will include approved time off.
                            </li>
                            <li
                                id="EzTimeOffFeaturePackageMarketingPoint4">
                                Time off requests visible in the schedule view.
                            </li>
                        </ul>
                    </p>`,
                EzHtml.build`
                    <h4
                        id="EzTimeOffFeaturePackageMarketingBlurb">
                        Additional Time Off Features Enabled
                    </h4>
                    <p
                        id="EzTimeOffFeaturePackageMarketingVideoParagraph">
                        Click
                            <a
                                id="EzTimeOffFeaturePackageSubscribedVideoInfoLink"
                                href="https://vimeo.com/832430759"
                                target="EZCLOCKER_TIME_OFF_INFO_VIDEO">
                                here
                            </a>
                            to watch a video about ezClocker's new Time Off features.
                    </p>
                    <p
                        id="EzTimeOffFeaturePackageMarketingDetails">
                        <ul
                            id="EzTimeOffFeaturePackageMarketingPoints">
                            <li
                                id="EzTimeOffFeaturePackageMarketingPoint1">
                                Employees can request paid and unpaid time off and track the status
                            </li>
                            <li
                                id="EzTimeOffFeaturePackageMarketingPoint2">
                                Employers/Managers can review, approve, deny, and track the status of employee time off requests.
                            </li>
                            <li
                                id="EzTimeOffFeaturePackageMarketingPoint3">
                                Time sheet reports will include approved time off.
                            </li>
                            <li
                                id="EzTimeOffFeaturePackageMarketingPoint4">
                                Time off requests visible in the schedule view.
                            </li>
                        </ul>
                    </p>`));

        // TIME_OFF_YEARLY
        // Index in ezSubscriptionAddOns: 1
        this.#ezFeaturePackageInfo.push(
            new EzFeaturePackageInfo(
                'TIME_OFF_YEARLY',
                // providerAddOnId
                'time-off-features-package-yearly',
                // braintreeAddOnId
                'time-off-features-package-yearly',
                // appleAddOnId
                'com.eznovatech.ezclocker.ezClocker.Timeoff-Yearly',
                // googlePlayAddOnId
                'ez2023.monthly.ezclocker.timeoff-yearly',
                // payPalAddOnId
                'ez2023.monthly.ezclocker.timeoff-yearly',
                // name
                'Time Off Feature Package',
                true,
                [
                    "ez2023-yearly-basic",
                    "ez2023-yearly-standard",
                    "ez2023-yearly-premium"
                ],
                120.00,
                false,
                false,
                true,
                false,
                EzHtml.build`
                    <h4
                        id="EzTimeOffFeaturePackageMarketingBlurb">
                        Enhance your subscription with the Time Off Features Package for an additional $10/month.
                    </h4>
                    <p
                        id="EzTimeOffFeaturePackageMarketingVideoParagraph">
                        Click
                            <a
                                id="EzTimeOffFeaturePackageMarketingVideoInfoLink"
                                href="https://vimeo.com/832430759"
                                target="EZCLOCKER_TIME_OFF_INFO_VIDEO">
                                here
                            </a>
                            to watch a video about ezClocker's new Time Off features.
                    </p>
                    <p
                        id="EzTimeOffFeaturePackageMarketingDetails">
                        Adding the Time Off Features Package to your Basic, Standard, or Premium subscription will enable the following features:
                        <ul
                            id="EzTimeOffFeaturePackageMarketingPoints">
                            <li
                                id="EzTimeOffFeaturePackageMarketingPoint1">
                                Employees can request paid and unpaid time off and track the status
                            </li>
                            <li
                                id="EzTimeOffFeaturePackageMarketingPoint2">
                                Employers/Managers can review, approve, deny, and track the status of employee time off requests.
                            </li>
                            <li
                                id="EzTimeOffFeaturePackageMarketingPoint3">
                                Time sheet reports will include approved time off.
                            </li>
                            <li
                                id="EzTimeOffFeaturePackageMarketingPoint4">
                                Time off requests visible in the schedule view.
                            </li>
                        </ul>
                    </p>`,
                EzHtml.build`
                    <h4
                        id="EzTimeOffFeaturePackageMarketingBlurb">
                        Additional Time Off Features Enabled
                    </h4>
                    <p
                        id="EzTimeOffFeaturePackageMarketingVideoParagraph">
                        Click
                            <a
                                id="EzTimeOffFeaturePackageSubscribedVideoInfoLink"
                                href="https://vimeo.com/832430759"
                                target="EZCLOCKER_TIME_OFF_INFO_VIDEO">
                                here
                            </a>
                            to watch a video about ezClocker's new Time Off features.
                    </p>
                    <p
                        id="EzTimeOffFeaturePackageMarketingDetails">
                        <ul
                            id="EzTimeOffFeaturePackageMarketingPoints">
                            <li
                                id="EzTimeOffFeaturePackageMarketingPoint1">
                                Employees can request paid and unpaid time off and track the status
                            </li>
                            <li
                                id="EzTimeOffFeaturePackageMarketingPoint2">
                                Employers/Managers can review, approve, deny, and track the status of employee time off requests.
                            </li>
                            <li
                                id="EzTimeOffFeaturePackageMarketingPoint3">
                                Time sheet reports will include approved time off.
                            </li>
                            <li
                                id="EzTimeOffFeaturePackageMarketingPoint4">
                                Time off requests visible in the schedule view.
                            </li>
                        </ul>
                    </p>`));
    }

    /**
     * @static
     * Static Initialization
     */
    static {
        if (null == EzFeaturePackageId.#ezEnumerationSingleton) {
            EzFeaturePackageId.#ezCreateFeaturePackageIdData();

            EzFeaturePackageId.#ezEnumerationSingleton = new EzFeaturePackageId(
                // Enum property names
                [
                    'UNKNOWN',
                    'TIME_OFF',
                    'TIME_OFF_YEARLY'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                null,
                // Optional array of additional data for eac enumeration property.
                // Enter null if not needed.
                EzFeaturePackageId.#ezFeaturePackageInfo);
        }
    }

    /**
     * @static
     * @public @method
     * Gets the EzFeaturePackageInfo object for the provided ezFeaturePackageIdValue
     * @param {string} ezFeaturePackageIdValue
     * A valid enum property value from EzFeaturePackageId
     * @returns {EzFeaturePackageInfo}
     */
    static ezGetFeaturePackageInfo(ezFeaturePackageIdValue) {
        if (!EzString.stringHasLength(ezFeaturePackageIdValue)) {
            throw new EzBadParamException(
                'ezFeaturePackageIdValue',
                EzFeaturePackageId,
                EzFeaturePackageId.ezGetFeaturePackageInfo);
        }

        return EzSubscriptionPlanProvider.ezEnumData(ezFeaturePackageIdValue);
    }

    /**
     * @static
     * @public @method
     * Obtains the billing provider's specific add-on id for the provided ezFeaturePackageIdValue. If a match isn't
     * found then an empty string is returned.
     * @param {string} ezFeaturePackageIdValue
     * A valid enum property value from EzFeaturePackageId
     * @param {string} ezSubscriptionPlanProvider
     * A valid enum property value from EzSubscriptionPlanProvider
     * @returns {string}
     */
    static ezProviderAddOnIdForBillingProviderId(ezFeaturePackageIdValue, ezSubscriptionPlanProvider) {
        if (!EzString.stringHasLength(ezFeaturePackageIdValue)) {
            throw new EzBadParamException(
                'ezFeaturePackageIdValue',
                EzFeaturePackageId,
                EzFeaturePackageId.ezProviderAddOnIdForBillingProviderId);
        }
        if (!EzString.stringHasLength(ezSubscriptionPlanProvider)) {
            throw new EzBadParamException(
                'ezSubscriptionPlanProvider',
                EzFeaturePackageId,
                EzFeaturePackageId.ezProviderAddOnIdForBillingProviderId);
        }

        switch (ezSubscriptionPlanProvider) {
            case 'APPLE_SUBSCRIPTION':
                return EzFeaturePackageId.ezEnumData(ezFeaturePackageIdValue).appleAddOnId;
            case 'BRAINTREEPAYMENTS_SUBSCRIPTION':
                return EzFeaturePackageId.ezEnumData(ezFeaturePackageIdValue).braintreeAddOnId;
            case 'EZCLOCKER_FREE_TRIAL':
                return EzFeaturePackageId.ezEnumData(ezFeaturePackageIdValue).providerAddOnId;
            case 'EZCLOCKER_SUBSCRIPTION':
                return EzFeaturePackageId.ezEnumData(ezFeaturePackageIdValue).braintreeAddOnId;
            case 'GOOGLE_PLAY_SUBSCRIPTION':
                return EzFeaturePackageId.ezEnumData(ezFeaturePackageIdValue).googlePlayAddOnId;
            case 'PAY_PAL_SUBSCRIPTION':
                return EzFeaturePackageId.ezEnumData(ezFeaturePackageIdValue).payPalAddOnId;
            case 'UNKNOWN':
            default:
                return EzString.EMPTY;
        }
    }
}

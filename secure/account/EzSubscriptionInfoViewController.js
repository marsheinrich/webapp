import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzArray,
    EzHtml,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzClockerContextEventName,
    EzSubscriptionPlanProvider,
    EzElementEventName,
    EzBillingFrequency,
    EzFeaturePackageId
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzSubscriptionFeeCalcEngine } from '/ezlibrary/calc-engines/EzSubscriptionFeeCalcEngine.js';

import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';

import { EzUI } from '/public/javascript/common/ezui.js';

import { EzUxState } from '/ezlibrary/ux/EzUxState.js';
import { EzUxElementState } from '/ezlibrary/ux/EzUxElementState.js';

import { EzSubscriptionPlansView } from '/secure/account/EzSubscriptionPlansView.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * Subscription information view controller
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzSubscriptionInfoViewController } from '/secure/account/EzSubscriptionInfoViewController.js';
 * ---------------------------------------------------------------------------
 * Singleton instance ready for use when the below evaluates to true:
 *     globalThis.ezApi.ezclocker[EzSubscriptionInfoViewController.ezApiName] &&
 *     globalThis.ezApi.ezclocker[EzSubscriptionInfoViewController.ezApiName].ready &&
 * ---------------------------------------------------------------------------
 * Listen to onReady event:
 *     document.addEventListener(
 *         EzSubscriptionInfoViewController.ezEventNames.onReady,
 *         this.#ezRegistrator);
 * ---------------------------------------------------------------------------
 * Singleton Instance Reference:
 *     ezApi.ezclocker.ezSubscriptionInfoViewController
 * ---------------------------------------------------------------------------
 */
export class EzSubscriptionInfoViewController extends EzClass {
    /**
     * @public @readonly @property
     * Gets an object with element type categories with key = element name for commonly referenced HTML elements.
     * @returns {object}
     */
    get ezIds() {
        return {
            buttons: {
                ezDeleteAccountButtonId: 'EzDeleteAccountButton',
                ezCancelSubscriptionButtonId: 'EzCancelSubscriptionButton',
                ezEggButtonId: 'EzCurrentSubscriptionInfo_HiddenDetails_Button'
            },
            containers: {
                ezSubscriptionInfoContainerId: 'EzSubscriptionInfoContainer',
                ezSubscriptionInfoContentContainerId: 'EzSubscriptionInfoContentContainer',
                ezSubscriptionDetailsContainerId: '_SubscriptionInformationContainer',
                ezSubscriptionInfoContentId: 'EzCurrentSubscriptionInfo_Content',
                ezDebugSubscriptionProviderIdDisplayId: 'EzSubscriptionProviderIdDisplay',
                ezSubscriptionInfoDetailsContainerId: 'ezwcSubscriptionInfoDetails',
                ezSubscriptionExpireDateContainerId: 'ezwcSubscriptionExpireDate',
                ezBillingInformationGridId: 'EzBillingInformationGrid',
                ezSubscriptionManagedByThirdPartyContainerId: 'EzSubscriptionManagedByThirdParthMessage',
                ezSubscriptionManagedByPayPalContainerId: 'EzSubscriptionManagedByPayPalContainer',
                ezSubscriptionManagedByAppleContainerId: 'EzSubscriptionManagedByAppleContainer',
                ezSubscriptionManagedByGoogleContainerId: 'EzSubscriptionManagedByGoogleContainer',
            },
            tables: {
                ezSubscriptionInfoTableId: '_SubscriptionInformation'
            },
            styles: {
                ezSubscriptionInfoStylesId: 'EzSubscriptionInfoStyles'
            }
        }
    }

    /**
     * @protected @readonly @property
     * Injects the styling needed for the subscription-info display
     * @returns {string}
     */
    get ezUxStyles() {
        return EzHtml.build`
            <style
                id="${EzSubscriptionInfoViewController.ezInstance.ezIds.styles.ezSubscriptionInfoStylesId}">
                .subscriptionInfoTable {
                    background-color: #ffffff;
                    width: 100%;
                    border-collapse: collapse;
                }
                .subscriptionInfoData {
                    border-style: solid;
                    border-width: 1px;
                    border-color: #6d6e70;
                    padding: 8px;
                    vertical-align: top;
                }
                .subscriptionInfoLabel {
                    font-size: 12pt;
                    font-family: sans-serif;
                    padding-right: 4px;
                    color: #ffffff;
                }
                .subscriptionInfoTitle {
                    font-family: sans-serif;
                    font-size: 14pt;
                    color: # fff;
                    background-color: #0f4777;
                    padding: 4px;
                    font-weight: bold;
                    border-style: solid;
                    border-width: 1px;
                    border-bottom-width: 0;
                    border-color: # 6 d6e70;
                    border-top-left-radius: 4 px;
                    border-top-right-radius: 4 px;
                }
            </style>`;
    }

    /**
     * @protected @readonly @property
     * Injects the HTML for the subscription info display
     * @returns {string}
     */
    get ezSubscriptionInfoPanelHtml() {
        return EzHtml.build`
            ${EzSubscriptionInfoViewController.ezInstance.ezUxStyles}
            <div
                id="${EzSubscriptionInfoViewController.ezInstance.ezIds.tables.ezSubscriptionInfoTableId}"
                class="ezAutoRow">
                <div
                    id="EzCurrentSubscriptionInfo_Header"
                    class="ezContainer-title-box-ezClockerNavy-pad-8 ezAutoCol_AxA ezGrid-vertical-align-middle ezGrid-align-space-between">
                    <div
                        id="EzCurrentSubscriptionInfo_Header_Title"
                        class="ezAutoCol_A ezGrid-vertical-align-middle ezGrid-align-left">
                        Current Subscription
                        <span
                            id="${EzSubscriptionInfoViewController.ezInstance.ezIds.containers.ezDebugSubscriptionProviderIdDisplayId}">
                        </span>
                    </div>
                    <div
                        id="EzCurrentSubscriptionInfo_Header_ActionBar">
                        <div
                            id="EzCurrentSubscriptionInfo_HiddenDetails_Button"
                            class="ezButton-hidden-egg">
                            o.O
                        </div>
                    </div>
                </div>
                <div
                    id="${EzSubscriptionInfoViewController.ezInstance.ezIds.containers.ezSubscriptionInfoContentId}"
                    class="ezContainer-bottom-ezClockerWhite-pad-10">
                </div>
            </div>`;
    }

    /**
     * @public @method
     * Initializes EzSubscriptionInfoViewController
     * @returns {EzSubscriptionInfoViewController}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSelectedEmployerLicenseUpdated,
            EzSubscriptionInfoViewController.ezApiName,
            () => EzSubscriptionInfoViewController.ezInstance.ezUpdateUxState()
                .then(EzPromise.ignoreResolve));

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSubscriptionContextActiveSubscriptionReady,
            EzSubscriptionInfoViewController.ezApiName,
            () => EzSubscriptionInfoViewController.ezInstance.ezUpdateUxState()
                .then(EzPromise.ignoreResolve));

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSubscriptionContextActiveSubscriptionChanged,
            EzSubscriptionInfoViewController.ezApiName,
            () => EzSubscriptionInfoViewController.ezInstance.ezUpdateUxState()
                .then(EzPromise.ignoreResolve));

        EzSubscriptionInfoViewController.ezInstance.ezInitUX();

        return EzSubscriptionInfoViewController.ezInstance;
    }

    /**
     * @public @method
     * Initializes the subscription info UX
     */
    ezInitUX() {
        ezApi.ezclocker.ezUi.ezSetContent(
            EzSubscriptionInfoViewController.ezInstance.ezIds.containers.ezSubscriptionInfoContainerId,
            EzSubscriptionInfoViewController.ezInstance.ezSubscriptionInfoPanelHtml);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzSubscriptionInfoViewController.ezInstance.ezIds.buttons.ezEggButtonId,
            EzElementEventName.CLICK,
            EzSubscriptionInfoViewController.ezApiName,
            EzSubscriptionInfoViewController.ezInstance.ezHandleEggClick);
    }

    /**
     * @public @method
     * Renders the subscription information data into the UX
     */
    ezRenderSubscriptionInfo() {
        EzSubscriptionInfoViewController.ezInstance.ezApplySubscriptionUxState();

        ezApi.ezclocker.ezUi.ezContent(
            EzSubscriptionInfoViewController.ezInstance.ezIds.containers.ezSubscriptionInfoContentId,
            EzSubscriptionInfoViewController.ezInstance.ezBuildCurrentSubscriptionInfoHtml());

        ezApi.ezclocker.ezUi.ezSetContent(
            EzSubscriptionInfoViewController.ezInstance.ezIds.containers.ezDebugSubscriptionProviderIdDisplayId,
            EzBoolean.isTrue(ezApi.ezclocker.ezUrlHelper.ezDebugMode)
                ? ` (${ezApi.ezclocker.ezClockerContext.ezGetActiveEmployerLicense().subscriptionProvider})`
                : EzString.EMPTY);
    }

    /**
     * @public @method
     * Applies the provided subscription detail data for Free or EzClocker subscriptions to the UX.
     * @param {object} activeEmployerLicense
     */
    ezApplyFreeTrialAndFreeSubscriptionUxState(activeEmployerLicense = ezApi?.ezclocker?.ezClockerContext?.ezGetActiveEmployerLicense()) {
        if (!EzObject.isValid(activeEmployerLicense)) {
            throw new EzBadParamException(
                activeEmployerLicense,
                EzSubscriptionInfoViewController.ezInstance,
                EzSubscriptionInfoViewController.ezInstance.ezApplyFreeTrialAndFreeSubscriptionUxState);
        }

        ezApi.ezclocker.ezUxState.ezApplyElementState(
            EzSubscriptionInfoViewController.ezInstance.ezIds.containers.ezSubscriptionManagedByThirdPartyContainerId,
            // Visible
            false,
            // Enabled
            false,
            // Remove
            true);

        ezApi.ezclocker.ezUxState.ezApplyElementState(
            new EzUxElementState(
                EzSubscriptionInfoViewController.ezInstance.ezIds.buttons.ezDeleteAccountButtonId,
                // Visible
                true,
                // Enabled
                true,
                // Remove
                false));

        ezApi.ezclocker.ezUxState.ezApplyElementState(
            new EzUxElementState(
                'EzBillingInformationGrid',
                // Visible
                false,
                // Enabled
                false,
                // Remove
                false));

        ezApi.ezclocker.ezUxState.ezApplyElementState(
            new EzUxElementState(
                EzSubscriptionInfoViewController.ezInstance.ezIds.buttons.ezCancelSubscriptionButtonId,
                // Visible
                false,
                // Enabled
                false,
                // Remove
                false));

        ezApi.ezclocker.ezUxState.ezApplyElementState(
            new EzUxElementState(
                EzSubscriptionInfoViewController.ezInstance.ezIds.containers.ezBillingInformationGridId,
                false,
                false,
                false));

        ezApi.ezclocker.ezUxState.ezApplyElementState(
            new EzUxElementState(
                ezApi.ezclocker.ezSubscriptionPlansView.ezIds.containers.ezFeaturePackagesContainerId,
                true,
                true,
                false));

        // Hide the selected plans select button
        ezApi.ezclocker.ezUxState.ezApplyElementState(
            new EzUxElementState(
                `EzAvailableSubscriptionPlan_Button${activeEmployerLicense.subscriptionPlan.id}`,
                false,
                false,
                false));
    }

    /**
     * @public @method
     * Applies the provided subscription detail data for Braintree subscriptions to the UX.
     * @param {object} activeEmployerLicense
     */
    ezApplyBraintreePaymentsSubscriptionUXState(activeEmployerLicense = ezApi?.ezclocker?.ezClockerContext?.ezGetActiveEmployerLicense()) {
        if (!EzObject.isValid(activeEmployerLicense)) {
            throw new EzBadParamException(
                activeEmployerLicense,
                EzSubscriptionInfoViewController.ezInstance,
                EzSubscriptionInfoViewController.ezInstance.ezApplyBraintreePaymentsSubscriptionUXState);
        }

        let isCanceled = activeEmployerLicense.canceled;

        // Subscription managed by third-party container
        ezApi.ezclocker.ezUxState.ezApplyElementState(
            EzSubscriptionInfoViewController.ezInstance.ezIds.containers.ezSubscriptionManagedByThirdPartyContainerId,
            false,
            false,
            true);

        ezApi.ezclocker.ezUxState.ezApplyElementState(
            new EzUxElementState(
                'EzBillingInformationGrid',
                // Visible
                true,
                // Enabled
                true,
                // Remove
                false));

        // Cancel subscription button
        ezApi.ezclocker.ezUxState.ezApplyElementState(
            new EzUxElementState(
                EzSubscriptionInfoViewController.ezInstance.ezIds.buttons.ezCancelSubscriptionButtonId,
                true,
                true,
                EzBoolean.isTrue(activeEmployerLicense.canceled)));

        // Delete account button
        ezApi.ezclocker.ezUxState.ezApplyElementState(
            new EzUxElementState(
                EzSubscriptionInfoViewController.ezInstance.ezIds.buttons.ezDeleteAccountButtonId,
                // Visible
                isCanceled,
                // Enabled
                isCanceled,
                // remove
                !isCanceled));

        // Billing information grid
        ezApi.ezclocker.ezUxState.ezApplyElementState(
            new EzUxElementState(
                EzSubscriptionInfoViewController.ezInstance.ezIds.containers.ezBillingInformationGridId,
                true,
                true,
                false));

        let timeOffComplementary = false;

        for (let ezEmployerFeaturePackage of activeEmployerLicense.featurePackages) {
            if (ezEmployerFeaturePackage.isComplementary) {
                timeOffComplementary = true;
            }
        }

        let disableTimeOffFeaturePackageButton = isCanceled || timeOffComplementary;

        // Add feature package button
        ezApi.ezclocker.ezUxState.ezApplyElementState(
            new EzUxElementState(
                ezApi.ezclocker.ezSubscriptionPlansView.ezIds.buttons.ezAddFeaturePackageButtonId,
                true,
                !disableTimeOffFeaturePackageButton, // Disable if false
                false));

        // Feature packages container
        ezApi.ezclocker.ezUxState.ezApplyElementState(
            new EzUxElementState(
                ezApi.ezclocker.ezSubscriptionPlansView.ezIds.containers.ezFeaturePackagesContainerId,
                true,
                true,
                false));

        /* Disabled since we no longer apply the yearly subscription after the current subscription expires.
        if (isCanceled) {
            let isExpired = true;

            if (EzString.hasLength(activeEmployerLicense.planExpireIso)) {
                let realPlanExpireDateTime = ezApi.ezclocker.ezDateTime.ezFromIso(activeEmployerLicense.realPlanExpireIso);

                isExpired = realPlanExpireDateTime.isBefore(ezApi.ezclocker.ezDateTime.ezNow());
            }

            if (!isExpired) {
                ezApi.ezclocker.ezSubscriptionPlansView.ezDisableSubscriptionButtons();
            } else {
                ezApi.ezclocker.ezSubscriptionPlansView.ezEnableSubscriptionButtons();
            }
        }
        */

        // Hide the selected plans select button
        ezApi.ezclocker.ezUxState.ezApplyElementState(
            new EzUxElementState(
                `EzAvailableSubscriptionPlan_Button${activeEmployerLicense.subscriptionPlan.id}`,
                false,
                false,
                false));

        // Free subscription plan button
        ezApi.ezclocker.ezUxState.ezApplyElementState(
            new EzUxElementState(
                `EzAvailableSubscriptionPlan_Button${ezApi.ezclocker.ezSubscriptionPlansView.ezLicenseManagerConfiguration.freeSubscriptionPlanId}`,
                true,
                false,
                false,
                null,
                "",
                "Before you can select the free plan you must first cancel your subscription and then let the final subscription duration expire."));
    }

    /**
     * @public @method
     * Applies the provided subscription detail data for Google Play subscriptions to the UX.
     * @param {object} activeEmployerLicense
     */
    ezApplyGooglePlaySubscriptionUXState(activeEmployerLicense = ezApi?.ezclocker?.ezClockerContext?.ezGetActiveEmployerLicense()) {
        if (!EzObject.isValid(activeEmployerLicense)) {
            throw new EzBadParamException(
                activeEmployerLicense,
                EzSubscriptionInfoViewController.ezInstance,
                EzSubscriptionInfoViewController.ezInstance.ezApplyGooglePlaySubscriptionUXState);
        }

        ezApi.ezclocker.ezSubscriptionPlansView.ezHideSubscriptionButtons();

        ezApi.ezclocker.ezUxState.ezApplyElementState(
            new EzUxElementState(
                EzSubscriptionInfoViewController.ezInstance.ezIds.buttons.ezDeleteAccountButtonId,
                true,
                true,
                false));


        ezApi.ezclocker.ezUxState.ezApplyElementState(
            new EzUxElementState(
                'EzBillingInformationGrid',
                // Visible
                false,
                // Enabled
                false,
                // Remove
                false));

        ezApi.ezclocker.ezUxState.ezApplyElementState(
            new EzUxElementState(
                EzSubscriptionInfoViewController.ezInstance.ezIds.buttons.ezCancelSubscriptionButtonId,
                false,
                false,
                true));

        ezApi.ezclocker.ezUxState.ezApplyElementState(
            new EzUxElementState(
                EzSubscriptionInfoViewController.ezInstance.ezIds.containers.ezBillingInformationGridId,
                false,
                false,
                true));

        ezApi.ezclocker.ezUxState.ezApplyElementState(
            new EzUxElementState(
                EzSubscriptionInfoViewController.ezInstance.ezIds.containers.ezSubscriptionManagedByThirdPartyContainerId,
                true,
                true,
                false));

        ezApi.ezclocker.ezUxState.ezApplyElementState(
            new EzUxElementState(
                ezApi.ezclocker.ezSubscriptionPlansView.ezIds.containers.ezFeaturePackagesContainerId,
                false,
                false,
                false));

        // Hide the selected plans select button
        ezApi.ezclocker.ezUxState.ezApplyElementState(
            new EzUxElementState(
                `EzAvailableSubscriptionPlan_Button${activeEmployerLicense.subscriptionPlan.id}`,
                false,
                false,
                false));

        EzSubscriptionInfoViewController.ezInstance.ezApplyGooglePlaySubscriptionState();
    }

    /**
      * @public @method
      * Applies the provided subscription detail data for Apple subscriptions to the UX.
      * @param {object} activeEmployerLicense
      */
    ezApplyAppleSubscriptionUxState(activeEmployerLicense = ezApi?.ezclocker?.ezClockerContext?.ezGetActiveEmployerLicense()) {
        if (!EzObject.isValid(activeEmployerLicense)) {
            throw new EzBadParamException(
                activeEmployerLicense,
                EzSubscriptionInfoViewController.ezInstance,
                EzSubscriptionInfoViewController.ezInstance.ezApplyAppleSubscriptionUxState);
        }

        ezApi.ezclocker.ezSubscriptionPlansView.ezHideSubscriptionButtons();

        ezApi.ezclocker.ezUxState.ezApplyElementState(
            new EzUxElementState(
                EzSubscriptionInfoViewController.ezInstance.ezIds.buttons.ezDeleteAccountButtonId,
                true,
                true,
                false));

        ezApi.ezclocker.ezUxState.ezApplyElementState(
            new EzUxElementState(
                'EzBillingInformationGrid',
                // Visible
                false,
                // Enabled
                false,
                // Remove
                false));

        ezApi.ezclocker.ezUxState.ezApplyElementState(
            new EzUxElementState(
                EzSubscriptionInfoViewController.ezInstance.ezIds.buttons.ezCancelSubscriptionButtonId,
                false,
                false,
                true));

        ezApi.ezclocker.ezUxState.ezApplyElementState(
            new EzUxElementState(
                EzSubscriptionInfoViewController.ezInstance.ezIds.containers.ezBillingInformationGridId,
                false,
                false,
                true));

        ezApi.ezclocker.ezUxState.ezApplyElementState(
            new EzUxElementState(
                EzSubscriptionInfoViewController.ezInstance.ezIds.containers.ezSubscriptionManagedByThirdPartyContainerId,
                true,
                true,
                false));

        ezApi.ezclocker.ezUxState.ezApplyElementState(
            new EzUxElementState(
                ezApi.ezclocker.ezSubscriptionPlansView.ezIds.containers.ezFeaturePackagesContainerId,
                false,
                false,
                false));

        EzSubscriptionInfoViewController.ezInstance.ezApplyAppleAppStoreSubscriptionState();
    }

    /**
     * @public @method
     * Applies the provided subscription detail data for pay-pal subscriptions to the UX.
     * @param {object} activeEmployerLicense
     */
    ezApplyPayPalSubscriptionUxState(activeEmployerLicense = ezApi?.ezclocker?.ezClockerContext?.ezGetActiveEmployerLicense()) {
        if (!EzObject.isValid(activeEmployerLicense)) {
            throw new EzBadParamException(
                activeEmployerLicense,
                EzSubscriptionInfoViewController.ezInstance,
                EzSubscriptionInfoViewController.ezInstance.ezApplyPayPalSubscriptionUxState);
        }

        ezApi.ezclocker.ezSubscriptionPlansView.ezHideSubscriptionButtons();

        ezApi.ezclocker.ezUxState.ezApplyElementState(
            new EzUxElementState(
                EzSubscriptionInfoViewController.ezInstance.ezIds.buttons.ezDeleteAccountButtonId,
                true,
                true,
                false));

        ezApi.ezclEzUxElementStateocker.ezUxState.ezApplyElementState(
            new EzUxElementState(
                EzSubscriptionInfoViewController.ezInstance.ezIds.buttons.ezCancelSubscriptionButtonId,
                false,
                false,
                true));

        ezApi.ezclocker.ezUxState.ezApplyElementState(
            new EzUxElementState(
                EzSubscriptionInfoViewController.ezInstance.ezIds.containers.ezBillingInformationGridId,
                false,
                false,
                true));

        ezApi.ezclocker.ezUxState.ezApplyElementState(
            new EzUxElementState(
                EzSubscriptionInfoViewController.ezInstance.ezIds.containers.ezSubscriptionManagedByThirdPartyContainerId,
                true,
                true,
                false));

        ezApi.ezclocker.ezUxState.ezApplyElementState(
            new EzUxElementState(
                ezApi.ezclocker.ezSubscriptionPlansView.ezIds.containers.ezFeaturePackagesContainerId,
                false,
                false,
                false));

        EzSubscriptionInfoViewController.ezInstance.ezApplyPayPalSubscriptionState();
    }

    /**
     * @public @method
     * Applies the provided subscription detail data to the UX.
     */
    ezApplySubscriptionUxState() {
        let activeEmployerLicense = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployerLicense();

        if (!EzObject.isValid(activeEmployerLicense)) {
            // No active employer license to apply subscription ux state data for
            return;
        }

        switch (activeEmployerLicense.subscriptionProvider) {
            case EzSubscriptionPlanProvider.EZCLOCKER_FREE_TRIAL:
            case EzSubscriptionPlanProvider.EZCLOCKER_SUBSCRIPTION:
                return EzSubscriptionInfoViewController.ezInstance.ezApplyFreeTrialAndFreeSubscriptionUxState(activeEmployerLicense);
            case EzSubscriptionPlanProvider.BRAINTREEPAYMENTS_SUBSCRIPTION:
                return EzSubscriptionInfoViewController.ezInstance.ezApplyBraintreePaymentsSubscriptionUXState(activeEmployerLicense);
            case EzSubscriptionPlanProvider.GOOGLE_PLAY_SUBSCRIPTION:
                return EzSubscriptionInfoViewController.ezInstance.ezApplyGooglePlaySubscriptionUXState(activeEmployerLicense);
            case EzSubscriptionPlanProvider.APPLE_SUBSCRIPTION:
                return EzSubscriptionInfoViewController.ezInstance.ezApplyAppleSubscriptionUxState(activeEmployerLicense);
            case EzSubscriptionPlanProvider.PAY_PAL_SUBSCRIPTION:
                return EzSubscriptionInfoViewController.ezInstance.ezApplyPayPalSubscriptionUxState(activeEmployerLicense);
            default:
                ezApi.ezclocker.ezLogger.error(
                    `Unable to apply subscription UX state for unknown or unsupported provider ${activeEmployerLicense.subscriptionProvider}.`);
        }
    }

    /**
     * @public @method
     * Builds the subscription status and details UX elements
     * @returns {string}
     */
    ezBuildCurrentSubscriptionInfoHtml() {
        let activeEmployerLicense = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployerLicense();

        return EzHtml.build`
            <div
                id="EzSubscriptionInfo_LayoutContainer"
                class="ezAutoCol_50x50 ezGrid-col-gap_8 ezGrid-vertical-align-top ezGrid-align-full">
                <div
                    id="EzSubscriptionInfo_DetailsContainer">
                    ${EzSubscriptionInfoViewController.ezInstance.ezBuildSubscriptionDetails()}
                </div>
                <div id="EzSubscriptionInfo_ExpireContainer">
                    ${EzSubscriptionInfoViewController.ezInstance.ezBuildSubscriptionStatusInformation(activeEmployerLicense)}
                </div>
            </div>`;
    }

    /**
     * @public @method
     * Appends subscription plan information to the subscriptiond details.
     * @param {object} subscriptionDetails
     * @returns {string}
     * Html UX for plan details
     */
    ezBuildSubscriptionDetails() {
        let activeEmployerLicense = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployerLicense();

        if (!EzObject.isValid(activeEmployerLicense)) {
            // No active license info to build info for
            return EzString.EMPTY;
        }

        let planDetails = EzString.EMPTY;

        let subscriptionFeeHtml = EzString.EMPTY;

        let subscriptionDiscountHtml = EzString.EMPTY;

        if (EzSubscriptionPlanProvider.isFreePlanProvider(activeEmployerLicense.subscriptionProvider)) {
            subscriptionFeeHtml = EzHtml.build`
                <div
                    id="EzSubscriptionInfo_SubscriptionFeeItem">
                    <span
                        id="EzSubscriptionInfo_SubscriptionFee">
                        Subscription Fee:&nbsp;
                        <span
                            id="EzSubscriptionInfo_SubscriptionFee_Value"
                            class="ezText-data-navy">
                            NONE
                        </span>
                    </span>
                </div>`;
        } else if (EzSubscriptionPlanProvider.isFreeTrialPlanProvider(activeEmployerLicense.subscriptionProvider)) {
            let ezSubscriptionFeeCalcEngine = EzSubscriptionFeeCalcEngine.calculate(activeEmployerLicense);

            if (EzArray.arrayHasLength(activeEmployerLicense.braintreeDiscounts)) {
                subscriptionDiscountHtml = EzHtml.build`
                    <div
                        id="EzSubscriptionInfo_DiscountsItem">
                        <span
                            id="EzSubscriptionInfo_Discounts">
                            Discount:&nbsp;
                            <span
                                id="EzSubscriptionInfo_Discounts_Value"
                                class="ezText-data-navy">
                                -$${ezSubscriptionFeeCalcEngine.ezSubscriptionTotalDiscountNegativeAmount}
                            </span>
                        </span>
                    </div>`;
            }

            subscriptionFeeHtml = EzBillingFrequency.MONTHLY === activeEmployerLicense.subscriptionPlan.billingFrequency
                ? EzHtml.build`
                    ${planDetails}
                    <div
                        id="EzSubscriptionInfo_BillingAmountItem">
                        <span
                            id="EzSubscriptionInfo_BillingAmount">
                            Subscription Fee:&nbsp;
                            <span
                                id="EzSubscriptionInfo_BillingAmount_Value"
                                class="ezText-data-navy">
                                $${ezSubscriptionFeeCalcEngine.ezSubscriptionMonthlyFees.ezAdjustedTotalMonthlyFee}/month (after free trial ends)
                            </span>
                        </span>
                    </div>`
                : EzHtml.build`
                    ${planDetails}
                    <div
                        id="EzSubscriptionInfo_BillingAmountItem">
                         <span
                            id="EzSubscriptionInfo_BillingAmount">
                            Subscription Fee:&nbsp;
                            <span
                                id="EzSubscriptionInfo_BillingAmount_Value"
                                class="ezText-data-navy">
                                $${ezSubscriptionFeeCalcEngine.ezSubscriptionYearlyFees.ezAdjustedTotalYearlyFee}/year (after free trial ends)
                            </span>
                        </span>
                    </div>`;
        } else if (EzSubscriptionPlanProvider.isPaidPlanProvider(activeEmployerLicense.subscriptionProvider)) {
            let ezSubscriptionFeeCalcEngine = EzSubscriptionFeeCalcEngine.calculate(activeEmployerLicense);

            if (EzArray.arrayHasLength(activeEmployerLicense.braintreeDiscounts)) {
                subscriptionDiscountHtml = EzHtml.build`
                    <div
                        id="EzSubscriptionInfo_DiscountsItem">
                        <span
                            id="EzSubscriptionInfo_Discounts">
                            Discount:&nbsp;
                            <span
                                id="EzSubscriptionInfo_Discounts_Value"
                                class="ezText-data-navy">
                                -$${ezSubscriptionFeeCalcEngine.ezSubscriptionTotalDiscountNegativeAmount}
                            </span>
                        </span>
                    </div>`;
            }

            subscriptionFeeHtml = EzBillingFrequency.MONTHLY === activeEmployerLicense.subscriptionPlan.billingFrequency
                ? EzHtml.build`
                    <div
                        id="EzSubscriptionInfo_BillingAmountItem">
                        <span
                            id="EzSubscriptionInfo_BillingAmount">
                            Subscription Fee:&nbsp;
                            <span
                                id="EzSubscriptionInfo_BillingAmount_Value"
                                class="ezText-data-navy">
                                $${ezSubscriptionFeeCalcEngine.ezSubscriptionMonthlyFees.ezAdjustedTotalMonthlyFee}/month
                            </span>
                        </span>
                    </div>`
                : EzHtml.build`
                    <div
                        id="EzSubscriptionInfo_BillingAmountItem">
                        <span
                            id="EzSubscriptionInfo_BillingAmount">
                            Subscription Fee:&nbsp;
                            <span
                                id="EzSubscriptionInfo_BillingAmount_Value"
                                class="ezText-data-navy">
                                $${ezSubscriptionFeeCalcEngine.ezSubscriptionYearlyFees.ezAdjustedTotalYearlyFee}/year
                            </span>
                        </span>
                    </div>`
        }

        let numberOfEmployeesHtml = EzHtml.build`
            <div
                id="EzSubscriptionInfo_NumberOfEmployeesItem">
                <span
                    id="EzSubscriptionInfo_NumberOfEmployees">
                    Number of employees:&nbsp;
                    <span
                        id="EzSubscriptionInfo_NumberOfEmployees_Value"
                        class="ezText-data-navy">
                        ${activeEmployerLicense.subscriptionPlan.maximumEmployees - activeEmployerLicense.availableEmployeeSlots}
                        out of
                        ${activeEmployerLicense.subscriptionPlan.maximumEmployees} total
                    </span>
                </span>
            </div>`;

        return EzHtml.build`
            <div
                id="EzSubscriptionInfoNameContainer">
                <h3
                    id="EzSubscriptionInfoName">
                    ${activeEmployerLicense.subscriptionPlan.description}
                    ${EzSubscriptionInfoViewController.ezInstance.ezBuildSubscribedFeaturePackagesHTML()}
                </h3>
            </div>
            <hr
                id="EzSubscriptionInfoNameHR"/>
            <div
                id="EzSubscriptionInfo_PlanDetailsList">
                ${subscriptionDiscountHtml}
                ${subscriptionFeeHtml}
                ${numberOfEmployeesHtml}
            </div>`;
    }

    /**
     * @public @method
     * Builds the list of feature packages added to the subscription
     * @returns {string}
     */
    ezBuildSubscribedFeaturePackagesHTML() {
        let activeEmployerLicense = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployerLicense();

        if (!EzObject.isValid(activeEmployerLicense)) {
            // No active license info to build info for
            return EzString.EMPTY;
        }

        let subscribedFeaturePackages = EzString.EMPTY;

        for (let featurePackage of activeEmployerLicense.featurePackages) {
            if (EzString.hasLength(featurePackage?.featurePackageId)) {
                subscribedFeaturePackages = !EzString.hasLength(subscribedFeaturePackages)
                    ? EzFeaturePackageId.ezEnumData(featurePackage.featurePackageId).name
                    : `, ${EzFeaturePackageId.ezEnumData(featurePackage.featurePackageId).name}`;
            }
        }

        return EzString.hasLength(subscribedFeaturePackages)
            ? EzHtml.build`
                <span
                    id="EzSubscribedFeaturePackages">
                    with ${subscribedFeaturePackages}
                </span>`
            : EzString.EMPTY;
    }

    /**
     * @public @method
     * Applies the Apple Store subscription management state.
     * Hides the subscribe buttons, cancel subscription button, and delete account button.
     */
    ezApplyAppleAppStoreSubscriptionState() {
        let storeName = 'Apple App Store';

        ezApi.ezclocker.ezUi.ezContent(
            EzSubscriptionInfoViewController.ezInstance.ezIds.containers.ezSubscriptionManagedByThirdPartyContainerId,
            EzHtml.build`
                <div
                    id="${EzSubscriptionInfoViewController.ezInstance.ezIds.containers.ezSubscriptionManagedByAppleContainerId}_Content"
                    class="ezContainer-bottom-ezClockerWhite-pad-10">
                    <h3>
                        Your subscription billing is managed and supported by Apple.
                    </h3>
                    <h4>
                        How to View, Upgrade or Downgrade your ezClocker Subscription through the ${storeName}
                    </h4>
                    <p>
                        The instructions below will help you view, upgrade, downgrade, or cancel your ezClocker subscription on your Apple device.
                        <ol>
                            <li>
                                Open the ezClocker app on your mobile device
                            </li>
                            <li>
                                Tap the menu button at the top left in the ezClocker mobile app.
                                <div
                                    id="EzIOSHamburgerMenuTip"
                                    class="ezContainers-ezClockerWhite-small-content">
                                    <p>
                                        The ezClocker mobile apps menu button is the three white lines at the top left in the ezClocker mobile app and looks
                                        like the example below:
                                    </p>
                                    <div
                                        id="EzIOSHamburgerMenuTipImgContainer">
                                        <div
                                            class="ezContainers-ezMobileBlue-pad2"
                                            style="display:inline-block">
                                            <img
                                                id="EzIOSHamburgerMenuTipImg"
                                                style="width:24px;"
                                                src="/public/images/icons/mobile-menu-white.svg"
                                                alt="Example of ezClocker's mobile app menu button"/>
                                            </img>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                Select the <span id="ezText-bold">Subscription</span> item from the menu.
                                <div
                                    id="EzSelectIOSMobileSubscriptionsMenuTip"
                                    class="ezContainers-ezClockerWhite-small-content">
                                    <p>
                                        The orange arrow in the below screen shot points to the Subscription item in the ezClocker mobile app's main menu.
                                    </p>
                                    <div
                                        id="EzSelectIOSMobileSubscriptionsMenuTipImgContainer">
                                        <img
                                            id="EzSelectIOSMobileSubscriptionsMenuTipImg"
                                            src="/images/phone/subscriptions-menu-ios.png"
                                            alt="Location of the Suscriptions item within ezClocker's mobile app menu."/>
                                    </div>
                                </div>
                            </li>
                            <li>
                                On the subscription screen select the Manage button to view the Manage Subscription pop-up screen.
                                <div
                                    id="EzSelectIOSMobileSubscriptionsMenuTip"
                                    class="ezContainers-ezClockerWhite-small-content">
                                    <p>
                                        The <span class="ezText-navy">Manage</span> link is located under the
                                        <span class="ezText-bold">Current Subscription</span> section to the right of the
                                        <span class="ezText-bold">Manage Subscription</span> text in the below screen shot.
                                    </p>
                                    <div
                                        id="EzSelectIOSMobileSubscriptionsMenuTipImgContainer">
                                        <img
                                            id="EzSelectIOSMobileSubscriptionsMenuTipImg"
                                            src="/images/phone/iphone-subscription-screen.png"
                                            alt="Example of ezClocker's subscription screen on iOS devices."/>
                                    </div>
                                </div>
                            </li>
                        </ol>
                    </p>
                    <h4>
                        If you want to cancel your subscription:
                    </h4>
                    <p>
                        <ol>
                            <li>Enter why you choose to cancel the subscription in the box provided on the Manage Subscription screen.</li>
                            <li>
                                Press the Go to iTunes Store link at the bottom of the ezClocker Manage Subscription screen to jump to your
                                button to jump to your Apple account's subscriptions screen.
                            </li>
                            <li>
                                Scroll through your list of Active subscriptions to locate the ezClocker app.
                            </li>
                            <li>
                                Tap the ezClocker app listed under your Active subscriptions to view the subscription.
                            </li>
                            <li>
                                Finally, tap the Cancel Subscription link cancel your subscription.
                                <div
                                    id="EzSubscriptionCancelNoteTip"
                                    class="ezContainers-ezClockerWhite-small-content">
                                    <p>
                                        Please note that your existing data is not deleted when you cancel a subscription. You will need to renew
                                        your subscription to access the data again.
                                    </p>
                                </div>
                            </li>
                        </ol>
                    </p>
                    <h4>
                        If you want to upgrade or downgrade your subscription:
                    </h4>
                    <p>
                        <ol>
                            <li>
                                Press the <span class="ezText-navy">Go to iTunes Store</span> link at the bottom of ezClocker's
                                Manage Subscription screen to view your Apple account subscriptions.
                            </li>
                            <li>
                                Scroll through your list of Active subscriptions to locate the ezClocker app.
                            </li>
                            <li>
                                Tap the ezClocker app listed under your Active subscriptions to view the subscription.
                            </li>
                            <li>
                                From the subscription's details screen you can tap the <span class="ezText-navy">See All Plans ></span> link to
                                view the available subscription plans.
                            </li>
                            <li>
                                Tap the plan you wish to switch to and follow the prompts for payment information.
                                <div
                                    id="EzSubscriptionRefreshDataTip"
                                    class="ezContainers-ezClockerWhite-small-help">
                                    <p>
                                        If the Current Subscription information doesn't reflect the subscription you switched to, fully
                                        close then re-open the ezClocker app.
                                    </p>
                                </div>
                            </li>
                        </ol>
                    </p>
                    <div
                        id="${EzSubscriptionInfoViewController.ezInstance.ezIds.containers.ezSubscriptionManagedByAppleContainerId}_AdditionalInfo"
                        class="ezContainer-bottom-ezClockerSilver-pad-10">
                        <h3>
                            Additional Information
                        </h3>
                        <h4>
                            <a
                                id="EzAppleBilingSupportLink"
                                class="ezNavyLink"
                                href="https://support.apple.com/billing"
                                target="_APPLE_SUPPORT">
                                Apple Billing and Subscriptions Support
                            </a>
                        </h4>
                        <ul>
                            <li>
                                <a
                                    id="EzAppleCancelSubscriptionInfoLink"
                                    href="https://support.apple.com/en-us/HT202039"
                                    class="ezNavyLink"
                                    target="_APPLE_SUPPORT">
                                    How to cancel a subscription from Appple.
                                </a>
                                <span class="ezText-small-gray">(opens in new tab)</span>
                            <li>
                                <a
                                    id="EzAppleSeePurchaseHistroyInfoLink"
                                    href="https://support.apple.com/en-us/HT204088"
                                    class="ezNavyLink"
                                    target="_APPLE_SUPPORT">
                                    See your purchase history
                                </a>
                                <span class="ezText-small-gray">(opens in new tab)</span>
                            </li>
                            <li>
                                <a
                                    id="EzAppleFixDeclinedPaymentsInfoLink"
                                    href="https://support.apple.com/en-us/HT203005"
                                    class="ezNavyLink"
                                    target="_APPLE_SUPPORT">
                                    Fix declined payments or unpaid balances
                                </a>
                                <span class="ezText-small-gray">(opens in new tab)</span>
                            </li>
                        </ul>
                    </div>
                </div>`);

        ezApi.ezclocker.ezUxState.ezApplyElementState(
            EzSubscriptionInfoViewController.ezInstance.ezIds.containers.ezSubscriptionManagedByThirdPartyContainerId,
            true,
            true,
            false);
    }

    /**
     * @public @method
     * Displays subscription manages by Pay Pal info box.
     */
    ezApplyPayPalSubscriptionState() {
        let storeName = 'Pay Pal';

        ezApi.ezclocker.ezUi.ezContent(
            EzSubscriptionInfoViewController.ezInstance.ezIds.containers.ezSubscriptionManagedByThirdPartyContainerId,
            EzHtml.build`
                <div
                    id="${EzSubscriptionInfoViewController.ezInstance.ezIds.containers.ezSubscriptionManagedByPayPalContainerId}">
                    <div
                        id="${EzSubscriptionInfoViewController.ezInstance.ezIds.containers.ezSubscriptionManagedByPayPalContainerId}_Title"
                        class="ezLightGrayBox8">
                        <h2>
                            Your subscription billing is managed and supported by Pay Pal.
                        </h2>
                    </div>
                    <h3>
                        View, Upgrade or Downgrade your ${storeName} EzClocker Subscription
                    </h3>
                    <p>
                        <ul>
                            <li>
                                <a
                                    id="${EzSubscriptionInfoViewController.ezInstance.ezIds.containers.ezSubscriptionManagedByPayPalContainerId}_ManageSubscriptionLink"
                                    target="_PAYPAL_MANAGE_SUBSCRIPTION"
                                    class="ezNavyLink"
                                    href="
                                    href="${EzSubscriptionPlanProvider.ezEnumData(EzSubscriptionPlanProvider.PAY_PAL_SUBSCRIPTION).subscriptionInfoUrl}}">
                                    Manage your Pal Pal subscription ...
                                </a>
                            </li>
                            <li>
                                <a
                                    id="${EzSubscriptionInfoViewController.ezInstance.ezIds.containers.ezSubscriptionManagedByPayPalContainerId}_ManageSubscriptionLink"
                                    target="_PAYPAL_MANAGE_SUBSCRIPTION"
                                    class="ezNavyLink"
                                    href="
                                    href="${EzSubscriptionPlanProvider.ezEnumData(EzSubscriptionPlanProvider.PAY_PAL_SUBSCRIPTION).subscriptionManagementUrl}}">
                                    Cancel your Pal Pal subscription ...
                                </a>
                            </li>
                        </ul>
                    </p>
                    <p>
                        Your existing data is not deleted when you cancel a subscription. You will need to resubscribe to access the data again.
                    </p>
                </div>`);
    }

    /**
     * @public @method
     * Applies the Google Play subscription management state.
     * Hides the subscribe buttons, cancel subscription button, and delete account button.
     */
    ezApplyGooglePlaySubscriptionState() {
        let appStoreName = 'Google Play';

        ezApi.ezclocker.ezUi.ezContent(
            EzSubscriptionInfoViewController.ezInstance.ezIds.containers.ezSubscriptionManagedByThirdPartyContainerId,
            EzHtml.build`
                <div
                    id="${EzSubscriptionInfoViewController.ezInstance.ezIds.containers.ezSubscriptionManagedByGoogleContainerId}_Content"
                    class="ezTopMargin_10 ezContainer-bottom-ezClockerWhite-pad-10">
                    <h3>
                        Your subscription billing is managed in Google Play and supported by Google.
                    </h3>
                    <h4>
                        How to View, Upgrade or Downgrade your ${appStoreName} Subscription to ezClocker
                    </h4>
                    <p>
                        <ol>
                            <li>
                                Open the ezClocker app on your device.
                            </li>
                            <li>
                                Click the menu icon (the 3 dots to the top right corner of the screen).
                            </li>
                            <li>
                                Select the Subscriptions menu option.
                            </li>
                            <li>
                                On the subscription screen select the Manage button.
                            </li>
                            <li>
                                If you are planning to cancel then enter the reason you wish to cancel your subscription in the comment section.
                            </li>
                            <li>
                                Press the continue button to then view your ${appStoreName} subscriptions.
                            </li>
                            <li>
                                In the list of subscriptions locate and tap ezClocker and then select Cancel Subscription or upgrade/downgrade.
                            </li>
                        </ol>
                    </p>
                    <p>
                        Your existing data is not deleted when you cancel a subscription. You will need to resubscribe to
                        access the data again.
                    </p>
                    <div
                        id="${EzSubscriptionInfoViewController.ezInstance.ezIds.containers.ezSubscriptionManagedByGoogleContainerId}_AdditionalInfo"
                        class="ezContainer-bottom-ezClockerSilver-pad-10">
                        <h3>
                            Additional Information
                        </h3>
                        <h3>
                            <a
                                href="https://support.google.com/googleplay#topic=3364260"
                                class="ezNavyLink"
                                target="_Google_Play_Support">
                                Google Play Help
                            </a>
                        </h3>
                        <ul>
                            <li>
                                <a
                                    href="https://support.google.com/googleplay/answer/9818348"
                                    class="ezNavyLink"
                                    target="_Google_Play_Support">
                                    Fix problems with subscriptions
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://support.google.com/googleplay/answer/7018481"
                                    class="ezNavyLink"
                                    target="_Google_Play_Support">
                                    Cancel or Change Subscriptions
                                </a>
                            </li>
                        <ul>
                    </div>
                </div>`);

        ezApi.ezclocker.ezUi.ezShowElement(
            EzSubscriptionInfoViewController.ezInstance.ezIds.containers.ezSubscriptionManagedByThirdPartyContainerId);
    }

    /**
     * @public @method
     * Builds the subscription information UX HTML for free plans
     * @param {string} subscriptionStatusInfoIdPrefix
     * Default: 'EzSubscriptionInfo_Status'
     * @returns {string}
     */
    ezBuildFreePlanStatusInformation(subscriptionStatusInfoIdPrefix = 'EzSubscriptionInfo_Status') {
        return EzHtml.build`
            <div
                id="${subscriptionStatusInfoIdPrefix}_SubscriptionStateBullet"
                class="ezText-ezActiveStatusColor ezBold">
                Active (free plan)
            </div>`;
    }

    /**
     * @public @method
     * Builds the free-trial subscription information UX HTML
     * @param {object} activeEmployerLicense
     * @param {string} subscriptionStatusInfoIdPrefix
     * Default: 'EzSubscriptionInfo_Status'
     * @returns {string}
     */
    ezBuildFreeTrialStatusInformation(activeEmployerLicense, subscriptionStatusInfoIdPrefix = 'EzSubscriptionInfo_Status') {
        if (!EzObject.isValid(activeEmployerLicense)) {
            throw new EzBadParamException(
                'activeEmployerLicense',
                EzSubscriptionInfoViewController.ezInstance,
                EzSubscriptionInfoViewController.ezInstance.ezBuildFreeTrialStatusInformation);
        }

        let freeTrialExpireInfo = EzString.hasLength(activeEmployerLicense.freeTrialExpireIso)
            ? EzHtml.build`
                <div
                    id="${subscriptionStatusInfoIdPrefix}_FreeTrialExpireDateBullet">
                    <span
                        id="${subscriptionStatusInfoIdPrefix}_FreeTrialExpireDate">
                        Free trial expires:&nbsp;
                        <span
                            id="${subscriptionStatusInfoIdPrefix}_FreeTrialExpireDate_Value"
                            class="ezText-data-navy">
                            ${ezApi.ezclocker.ezDateTime.ezIsoToDisplayDate(activeEmployerLicense.freeTrialExpireIso)}
                        </span>
                    </span>
                </div>`
            : EzString.EMPTY;

        let freeTrialDaysLeftInfo = EzNumber.isNumber(activeEmployerLicense.freeTrialDaysLeft)
            ? EzHtml.build`
                <div
                    id="${subscriptionStatusInfoIdPrefix}_FreeTrialDaysLeft_Bullet">
                    <span
                        id="${subscriptionStatusInfoIdPrefix}_FreeTrialDaysLeft">
                        Free trial days left:&nbsp;
                        <span
                            id="${subscriptionStatusInfoIdPrefix}_FreeTrialDaysLeft_Value"
                            class="ezText-data-navy">
                            ${EzNumber.numberOrZero(activeEmployerLicense.freeTrialDaysLeft, 0)}
                        </span>
                    </span>
                </div>`
            : EzString.EMPTY;

        return EzHtml.build`
            <div
                id="${subscriptionStatusInfoIdPrefix}_LicenseState_Bullet"
                class="ezText-navy">
                <span
                    id="${subscriptionStatusInfoIdPrefix}_LicenseState"
                    class="ezText-ezActiveStatusColor ezBold">
                    Active (free trial)
                </span>
            </div>
            ${freeTrialExpireInfo}
            ${freeTrialDaysLeftInfo}`;
    }

    /**
     * @public @method
     * Builds the active paid plan information UX HTML
     * @param {object} activeEmployerLicense
     * @param {string} subscriptionStatusInfoIdPrefix
     * Default: 'EzSubscriptionInfo_Status'
     * @returns {string}
     */
    ezBuildActivePaidPlanStatusInformationHTML(activeEmployerLicense, subscriptionStatusInfoIdPrefix = 'EzSubscriptionInfo_Status') {
        if (!EzObject.isValid(activeEmployerLicense)) {
            throw new EzBadParamException(
                'activeEmployerLicense',
                EzSubscriptionInfoViewController.ezInstance,
                EzSubscriptionInfoViewController.ezInstance.ezBuildActivePaidPlanStatusInformationHTML);
        }

        let nextBillingDate = '-';

        if (EzString.hasLength(activeEmployerLicense.nextBillingDate)) {
            nextBillingDate = activeEmployerLicense.nextBillingDate;
        } else if (EzString.hasLength(activeEmployerLicense.planExpireDate)) {
            // Is this correct? Possibly deailing with a future-subscription date
            // so choose the expire date (of last subscription)? Maybe?
            nextBillingDate = activeEmployerLicense.planExpireDate;
        }

        let nextBillingDateInfo = EzString.hasLength(nextBillingDate)
            ? EzHtml.build`
                <div
                    id="${subscriptionStatusInfoIdPrefix}_NextBillingDate_Bullet">
                    <span
                        id="${subscriptionStatusInfoIdPrefix}_NextBillingDate">
                        Estimated next billing date:&nbsp;
                        <span
                            id="${subscriptionStatusInfoIdPrefix}_NextBillingDate_Value"
                            class="ezText-data-navy">
                            ${nextBillingDate}
                        </span>
                    </span>
                </div>`
            : EzString.EMPTY;

        let billingFrequency = EzBoolean.isFalse(activeEmployerLicense.canceled)
            ? EzHtml.build`
                <span
                    id="${subscriptionStatusInfoIdPrefix}_BillingFrequency"
                    class="ezText-data-navy">
                    (${EzBillingFrequency.ezEnumData(activeEmployerLicense.subscriptionPlan.billingFrequency).displayName})
                </span>`
            : EzString.EMPTY;

        return EzHtml.build`
            <div
                id="${subscriptionStatusInfoIdPrefix}_LicenseState_Bullet"
                class="ezText-navy">
                <span
                    id="${subscriptionStatusInfoIdPrefix}_LicenseState"
                    class="ezText-ezActiveStatusColor ezBold">
                    ACTIVE
                </span>
                ${billingFrequency}
            </div>
            ${nextBillingDateInfo}`;
    }

    /**
     * @public @method
     * Builds the cancled but still active plan information UX HTML
     * @param {object} activeEmployerLicense
     * @param {string} subscriptionStatusInfoIdPrefix
     * Default: 'EzSubscriptionInfo_Status'
     * @returns {string}
     */
    ezBuildCancledStillActivePaidPlanStatusInformationHTML(activeEmployerLicense, subscriptionStatusInfoIdPrefix = 'EzSubscriptionInfo_Status') {
        if (!EzObject.isValid(activeEmployerLicense)) {
            throw new EzBadParamException(
                'activeEmployerLicense',
                EzSubscriptionInfoViewController.ezInstance,
                EzSubscriptionInfoViewController.ezInstance.ezBuildCancledStillActivePaidPlanStatusInformationHTML);
        }

        let cancleInfo = EzString.hasLength(activeEmployerLicense.cancledDate) &&
            ezApi.ezclocker.ezDateTime.NEVER_EXPIRE_DISPLAY_DATE !== activeEmployerLicense.cancledDate
            ? EzHtml.build`
                <div
                    id="${subscriptionStatusInfoIdPrefix}_SubscriptoinCanceledDate_Bullet">
                    <span
                        id="${subscriptionStatusInfoIdPrefix}_SubscriptoinCanceledDate">
                        Cancled on:&nbsp;
                        <span
                            id="${subscriptionStatusInfoIdPrefix}_SubscriptoinCanceledDate_Value"
                            class="ezText-data-navy">
                            ${activeEmployerLicense.cancledDate}
                        </span>
                    </span>
                </div>`
            : EzString.EMPTY;

        let expireInfo = EzString.hasLength(activeEmployerLicense.planExpireDate)
            ? EzHtml.build`
                <div
                    id="${subscriptionStatusInfoIdPrefix}_SubscriptoinExpireDate_Bullet">
                    <span
                        id="${subscriptionStatusInfoIdPrefix}_SubscriptoinExpireDate">
                        Expires on:&nbsp;
                        <span
                            id="${subscriptionStatusInfoIdPrefix}_SubscriptoinExpireDate_Value"
                            class="ezText-data-navy">
                            ${activeEmployerLicense.planExpireDate}
                        </span>
                    </span>
                </div>`
            : EzString.EMPTY;

        return EzHtml.build`
            <div
                id="${subscriptionStatusInfoIdPrefix}_LicenseState_Bullet">
                <span
                    id="${subscriptionStatusInfoIdPrefix}_LicenseState"
                    class="ezText-ezWarningStatusColor ezBold">
                    CANCELED
                </span>
            </div>
            ${cancleInfo}
            ${expireInfo}`;
    }

    /**
     * @public @method
     * Builds the cancled and expired plan information UX HTML
     * @param {object} activeEmployerLicense
     * @param {string} subscriptionStatusInfoIdPrefix
     * Default: 'EzSubscriptionInfo_Status'
     * @returns {string}
     */
    ezBuildCancledAndExpiredPaidPlanStatusInformationHTML(activeEmployerLicense, subscriptionStatusInfoIdPrefix = 'EzSubscriptionInfo_Status') {
        if (!EzObject.isValid(activeEmployerLicense)) {
            throw new EzBadParamException(
                'activeEmployerLicense',
                EzSubscriptionInfoViewController.ezInstance,
                EzSubscriptionInfoViewController.ezInstance.ezBuildCancledAndExpiredPaidPlanStatusInformationHTML);
        }

        let cancleInfo = EzString.hasLength(activeEmployerLicense.cancledDate) &&
            ezApi.ezclocker.ezDateTime.NEVER_EXPIRE_DISPLAY_DATE !== activeEmployerLicense.cancledDate
            ? EzHtml.build`
                <div
                    id="${subscriptionStatusInfoIdPrefix}_SubscriptoinCancledDate_Bullet">
                    <span
                        id="${subscriptionStatusInfoIdPrefix}_SubscriptoinCancledDate">
                        Cancled on:&nbsp;
                        <span
                            id="${subscriptionStatusInfoIdPrefix}_SubscriptoinCancledDate_Value"
                            class="ezText-data-navy">
                            ${activeEmployerLicense.cancledDate}
                        </span>
                    </span>
                </div>`
            : EzString.EMPTY;

        let expireInfo = EzString.hasLength(activeEmployerLicense.planExpireDate)
            ? EzHtml.build`
                <div
                    id="${subscriptionStatusInfoIdPrefix}_SubscriptoinExpireDate_Bullet">
                    <span
                        id="${subscriptionStatusInfoIdPrefix}_SubscriptoinExpireDate">
                        Expired on:&nbsp;
                        <span
                            id="${subscriptionStatusInfoIdPrefix}_SubscriptoinExpireDate_Value"
                            class="ezText-data-navy">
                            ${activeEmployerLicense.planExpireDate}
                        </span>
                    </span>
                </div>`
            : EzString.EMPTY;

        return EzHtml.build`
            <div
                id="${subscriptionStatusInfoIdPrefix}_LicenseState_Bullet">
                <span
                    id="${subscriptionStatusInfoIdPrefix}_LicenseState"
                    class="ezText-ezErrorStatusColor ezBold">
                    EXPIRED
                </span>
            </div>
            ${cancleInfo}
            ${expireInfo}`;
    }

    /**
     * @public @method
     * Builds the expired paid plan information UX HTML
     * @param {object} activeEmployerLicense
     * @param {string} subscriptionStatusInfoIdPrefix
     * Default: 'EzSubscriptionInfo_Status'
     * @returns {string}
     */
    ezBuildExpiredPaidPlanStatusInformationHTML(activeEmployerLicense, subscriptionStatusInfoIdPrefix = 'EzSubscriptionInfo_Status') {
        if (!EzObject.isValid(activeEmployerLicense)) {
            throw new EzBadParamException(
                'activeEmployerLicense',
                EzSubscriptionInfoViewController.ezInstance,
                EzSubscriptionInfoViewController.ezInstance.ezBuildExpiredPaidPlanStatusInformationHTML);
        }

        let cancelInfo = EzString.hasLength(activeEmployerLicense.cancledDate) &&
            ezApi.ezclocker.ezDateTime.NEVER_EXPIRE_DISPLAY_DATE !== activeEmployerLicense.cancledDate
            ? EzHtml.build`
                <div
                    id="${subscriptionStatusInfoIdPrefix}_SubscriptoinCanceledDate_Bullet">
                    <span
                        id="${subscriptionStatusInfoIdPrefix}_SubscriptoinCanceledDate">
                        Cancled on:&nbsp;
                        <span
                            id="${subscriptionStatusInfoIdPrefix}_SubscriptoinCanceledDate_Value"
                            class="ezText-data-navy"
                            ${activeEmployerLicense.cancledDate}
                        </span>
                    </span>
                </div>`
            : EzString.EMPTY;

        let expireInfo = EzString.hasLength(activeEmployerLicense.planExpireDate)
            ? EzHtml.build`
                <div
                    id="${subscriptionStatusInfoIdPrefix}_SubscriptionExpireDate_Bullet">
                    <span
                        id="${subscriptionStatusInfoIdPrefix}_SubscriptoinExpireDate">
                        Expired on:&nbsp;
                        <span
                            id="${subscriptionStatusInfoIdPrefix}_SubscriptoinExpireDate_Value"
                            class="ezText-data-navy">
                            ${activeEmployerLicense.planExpireDate}
                        </span>
                    </span>
                </div>`
            : EzString.EMPTY;

        return EzHtml.build`
            <div
                id="${subscriptionStatusInfoIdPrefix}_LicenseState_Bullet"
                class="ezText-navy">
                <span
                    id="${subscriptionStatusInfoIdPrefix}_LicenseState"
                    class="ezText-ezErrorStatusColor ezBold">
                    EXPIRED
                </span>
            </div>
            ${cancelInfo}
            ${expireInfo}`
    }



    /**
     * @public @method
     * Builds the subscription information for paid plans UX HTML
     * @param {object} activeEmployerLicense
     * @param {string} subscriptionStatusInfoIdPrefix
     * Default: 'EzSubscriptionInfo_Status'
     * @returns {string}
     */
    ezBuildSubscriptionStatusInformation(activeEmployerLicense, subscriptionStatusInfoIdPrefix = 'EzSubscriptionInfo_Status') {
        if (!EzObject.isValid(activeEmployerLicense)) {
            return EzHtml.build`
                <div
                    id="${subscriptionStatusInfoIdPrefix}_Container">
                    <h3
                        id="${subscriptionStatusInfoIdPrefix}_Header">
                        Status
                    </h3>
                </div>
                <hr
                    id="${subscriptionStatusInfoIdPrefix}_HR"/>
                <div
                    id="${subscriptionStatusInfoIdPrefix}_Loading>
                    <img
                        id="${subscriptionStatusInfoIdPrefix}_LoadingSubscriptionStatusSpinner"
                        src="/public/images/spinners/infinity-snake-spinner-orange.svg"
                        style="height:12pt"/>
                </div>`;
        }

        let statusInfo;

        if (EzSubscriptionPlanProvider.isFreePlanProvider(activeEmployerLicense.subscriptionProvider)) {
            statusInfo = EzSubscriptionInfoViewController.ezInstance.ezBuildFreePlanStatusInformation(subscriptionStatusInfoIdPrefix);
        } else if (EzSubscriptionPlanProvider.isFreeTrialPlanProvider(activeEmployerLicense.subscriptionProvider)) {
            statusInfo = EzSubscriptionInfoViewController.ezInstance.ezBuildFreeTrialStatusInformation(
                activeEmployerLicense,
                subscriptionStatusInfoIdPrefix);
        } else if (EzBoolean.isTrue(activeEmployerLicense.canceled) && EzBoolean.isTrue(activeEmployerLicense.valid)) {
            // Canceled but still active
            statusInfo = EzSubscriptionInfoViewController.ezInstance.ezBuildCancledStillActivePaidPlanStatusInformationHTML(
                activeEmployerLicense,
                subscriptionStatusInfoIdPrefix);
        } else if (EzBoolean.isTrue(activeEmployerLicense.canceled) && EzBoolean.isFalse(activeEmployerLicense.valid)) {
            // Canceled and expired
            statusInfo = EzSubscriptionInfoViewController.ezInstance.ezBuildCancledAndExpiredPaidPlanStatusInformationHTML(
                activeEmployerLicense,
                subscriptionStatusInfoIdPrefix);
        } else if (EzBoolean.isFalse(activeEmployerLicense.valid)) {
            // Expired plan
            statusInfo = EzSubscriptionInfoViewController.ezInstance.ezBuildExpiredPaidPlanStatusInformationHTML(
                activeEmployerLicense,
                subscriptionStatusInfoIdPrefix);
        } else {
            // Active Plans
            statusInfo = EzSubscriptionInfoViewController.ezInstance.ezBuildActivePaidPlanStatusInformationHTML(
                activeEmployerLicense,
                subscriptionStatusInfoIdPrefix);
        }

        return EzHtml.build`
            <div
                id="${subscriptionStatusInfoIdPrefix}_Container">
                <h3
                    id="${subscriptionStatusInfoIdPrefix}_Header">
                    Status
                </h3>
            </div>
            <hr
                id="${subscriptionStatusInfoIdPrefix}_HR"/>
            <div
                id="${subscriptionStatusInfoIdPrefix}_Bullets">
                ${statusInfo}
            </div>`;
    }

    /**
     * @protected @method
     * Handles the doubleclick event for EzSubscriptionInfoViewController.ezInstance.ezIds.buttons.ezEggButtonId
     * @param {object} ezEvent
     */
    ezHandleEggClick(ezEvent) {
        if (EzBoolean.isTrue(ezEvent.data.elementEvent.ctrlKey)) {
            let activeEmployerLicense = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployerLicense();

            if (EzObject.isValid(activeEmployerLicense)) {
                let eggDialogId = `${EzSubscriptionInfoViewController.ezApiName}_EggDialog`;

                let ezDialogConfig = new EzDialogConfig(eggDialogId);

                ezDialogConfig.title = 'Employer License Details';

                ezDialogConfig.modal = false;

                ezDialogConfig.buttons = [
                    {
                        id: `${eggDialogId}_CloseButton`,
                        text: 'Close',
                        click: () => ezApi.ezclocker.ezDialog.ezCloseDialog(eggDialogId)
                    }
                ];

                let activeEmployerLicenseProperties = EzString.EMPTY;

                Object.keys(activeEmployerLicense).forEach(
                    (propName) => {
                        let value = activeEmployerLicense[propName];

                        if (!EzObject.isValid(value)) {
                            value = 'null';
                        } else if (!EzString.isString(value)) {
                            value = value.toString();
                        }

                        activeEmployerLicenseProperties = EzHtml.build`
                            ${activeEmployerLicenseProperties}
                            <div
                                id="${eggDialogId}_${propName}Name">
                                ${propName}
                            </div>
                            <div
                                id="${eggDialogId}_${propName}_Value">
                                ${value}
                            </div>`;
                    });

                ezDialogConfig.ezDialogContentHtml = EzHtml.build`
                    <div
                        id="${eggDialogId}_Content">
                        <div
                            id="${eggDialogId}_EmployerId">
                            Employer Id: ${activeEmployerLicense.employerId}
                        </div>
                        <h3>
                            License Details
                        </h3>
                        <div
                            id="${eggDialogId}_DetailsContainer"
                            class="ezAutoRow">
                            ${activeEmployerLicenseProperties}
                        </div>

                    </div>`;

                ezApi.ezclocker.ezDialog.ezInitDialogTemplateFromDialogConfig(ezDialogConfig);

                ezApi.ezclocker.ezDialog.ezShowDialog(eggDialogId)
            }


        }
    }

    /**
     * @public @method
     * Updates the Subscription Information UX
     */
    ezUpdateUxState() {
        return EzPromise.asyncAction(
            (finished) => {
                EzSubscriptionInfoViewController.ezInstance.ezRenderSubscriptionInfo();

                return finished();
            });
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Class Initialization and EzApi Registration Section
    // !! DO NOT PLACE ANY non-initialization fields, getter/setter methods, static methods, or class methods beyond this section !!
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    /**
     * @static
     * @public @readonly @property
     * Returns the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezSubscriptionInfoViewController';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzSubscriptionInfoViewController_Ready'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzSubscriptionInfoViewController}
     */
    static #ezInstance = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzSubscriptionInfoViewController.ezApiName]
        ? globalThis.ezApi.ezclocker[EzSubscriptionInfoViewController.ezApiName]
        : null;
    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzSubscriptionInfoViewController}
     */
    static get ezInstance() {
        return EzSubscriptionInfoViewController.#ezInstance;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzSubscriptionInfoViewController} instance
     */
    static set ezInstance(instance) {
        if (null != EzSubscriptionInfoViewController.#ezInstance) {
            throw new Error('EzSubscriptionInfoViewController\'s singleton instance is already reigstered with EzApi.');
        }

        EzSubscriptionInfoViewController.#ezInstance = instance;
    }

    /**
     * @static
     * @private @field
     * Stores the EzApi registration state for this class.
     * Default value is NULL
     * Class is registerd with EzApi when value is EzRegistrationState.REGISTERED
     * @type {string}
     * A valid enum property value from EzRegistrationState
     */
    static #ezApiRegistrationState = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzSubscriptionInfoViewController.ezApiName]
        ? EzRegistrationState.REGISTERED
        : null;
    /**
     * @static
     * @public @property @getter
     * Returns the ezApi registration state of this classes's singleton instance.
     * @returns {string}
     * A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzSubscriptionInfoViewController.#ezApiRegistrationState;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzSubscriptionInfoViewController.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @static
     * @private @readonly @property
     * Returns true when all required dependencies for this class report ready.
     * In otherwords, the require dependency's singleton instance is created
     * and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzSubscriptionInfoViewController.ezApiRegistrationState &&
            globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker &&

            globalThis.ezApi.ezclocker?.[EzClockerContextEventName.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzClockerContext.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzUI.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzUxState.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzSubscriptionPlansView.ezApiName]?.ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzSubscriptionInfoViewController.ezInstance &&
            EzRegistrationState.REGISTERED === EzSubscriptionInfoViewController.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzSubscriptionInfoViewController.#ezCanRegister && !EzSubscriptionInfoViewController.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzSubscriptionInfoViewController, EzSubscriptionInfoViewController.ezApiName);
        }

        return EzSubscriptionInfoViewController.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzSubscriptionInfoViewController.ezApiName
     *     2) Property getter EzSubscriptionInfoViewController.ezEventNames
     *     3) Property getter EzSubscriptionInfoViewController.ezInstance
     *     4) Property setter EzSubscriptionInfoViewController.ezInstance
     *     5) Property getter EzSubscriptionInfoViewController.ezApiRegistrationState
     *     6) Property setter EzSubscriptionInfoViewController.ezApiRegistrationState
     *     7) Property getter EzSubscriptionInfoViewController.#ezCanRegister
     *     8) Property getter EzSubscriptionInfoViewController.#ezIsRegistered
     *     9) Method EzSubscriptionInfoViewController.#ezRegistrator()
     */
    static {
        if (!EzSubscriptionInfoViewController.#ezIsRegistered) {
            EzSubscriptionInfoViewController.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzSubscriptionInfoViewController.#ezRegistrator()) {
                document.addEventListener(
                    EzSubscriptionInfoViewController.ezOnEzApiReadyEventName,
                    EzSubscriptionInfoViewController.#ezRegistrator);

                document.addEventListener(
                    EzClockerContextEventName.ezEventNames.onReady,
                    EzSubscriptionInfoViewController.#ezRegistrator);

                document.addEventListener(
                    EzClockerContext.ezEventNames.onReady,
                    EzSubscriptionInfoViewController.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzSubscriptionInfoViewController.#ezRegistrator);

                document.addEventListener(
                    EzUxState.ezEventNames.onReady,
                    EzSubscriptionInfoViewController.#ezRegistrator);

                document.addEventListener(
                    EzSubscriptionPlansView.ezEventNames.onReady,
                    EzSubscriptionInfoViewController.#ezRegistrator);
            }
        }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // !! DO NOT PLACE ANY non-initialization fields, getter/setter methods, static methods, or class methods beyond above section !!
    // NO CODE AFTER THIS SECTION
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}

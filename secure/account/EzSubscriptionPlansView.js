
import {
    EzBadParamException,
    EzBadStateException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzArray,
    EzHtml,
    EzPromise,
    EzJson
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzClockerContextEventName,
    EzFeaturePackageId,
    EzSubscriptionPlanId,
    EzSubscriptionPlanProvider,
    EzBillingFrequency,
    EzElementEventName,
    EzErrorCode
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

import { EzWantEventSettings } from '/ezlibrary/entities/EzWantEventSettings.js';
import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzAnalyticsAndMetrics } from '/ezlibrary/analytics_metrics/EzAnalyticsAndMetrics.js';

import { EzLicenseManagerConfiguration } from '/ezlibrary/entities/EzLicenseManagerConfiguration.js';

import { EzUx } from '/ezlibrary/ux/EzUx.js';
import { EzUI } from '/public/javascript/common/ezui.js';
import { EzUxState } from '/ezlibrary/ux/EzUxState.js';
import { EzUxElementState } from '/ezlibrary/ux/EzUxElementState.js';

import { EzUrlHelper } from '/public/javascript/common/ezclocker-url-helper2.js';

import { EzSubscriptionCards } from '/secure/widgets/EzSubscriptionCard/EzSubscriptionCards.js';

import { EzSubscriptionPlansViewReadyStates } from '/ezlibrary/entities/EzSubscriptionPlansViewReadyStates.js';

import { EzAccountSubscriptionActions } from '/secure/account/EzAccountSubscriptionActions';

import { EzSubscriptionDialog } from '/secure/widgets/EzSubscriptionDialog/EzSubscriptionDialog.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * Handles presenting subscription plans
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzSubscriptionPlansView } from '/secure/account/EzSubscriptionPlansView.js';
 * ---------------------------------------------------------------------------
 * Singleton instance ready for use when the below evaluates to true:
 *     globalThis.ezApi.ezclocker[EzSubscriptionPlansView.ezApiName] &&
 *     globalThis.ezApi.ezclocker[EzSubscriptionPlansView.ezApiName].ready
 * ---------------------------------------------------------------------------
 * Listen to onReady event:
 *     document.addEventListener(
 *         EzSubscriptionPlansView.ezEventNames.onReady,
 *         this.#ezRegistrator);
 * ---------------------------------------------------------------------------
 * Singleton Instance Reference:
 *     Inside this class: EzSubscriptionPlansView.ezInstance
 *     Outside this class: ezApi.ezclocker.ezSubscriptionPlansView
 * ---------------------------------------------------------------------------
 */
export class EzSubscriptionPlansView extends EzClass {
    /**
     * @public @readonly @property
     * Gets an object of key/value for commonly used element ids
     * @returns {object}
     */
    get ezIds() {
        return {
            containers: {
                ezAvailableSubscriptionsContainerId: 'EzAvailableSubscriptionsContainer',
                ezMonthlyYearlyToggleContainerId: 'EzMonthlyYearlyToggleContainer',
                ezMonthlyYearlyToggleLayoutContainerId: 'EzMonthlyYearlyToggleLayoutContainer',
                ezAvailableFeaturePackagesContainerId: 'EzAvailableFeaturePackagesContainer',
                ezSubscriptionManagedByThirdParyContainerId: 'EzSubscriptionManagedByThirdParyContainer',
                ezSubscriptionPlansContainerId: 'EzSubscriptionPlansContainerId',
                ezSubscriptionPlansMonthlyContainerId: 'EzSubscriptionPlansMonthlyContainer',
                ezSubscriptionPlansYearlyContainerId: 'EzSubscriptionPlansYearlyContainer',
                ezFeaturePackagesContainerId: 'EzFeaturePackagesContainer',
            },
            buttons: {
                ezAddFeaturePackageButtonId: 'EzAddFeaturePackageButton',
                ezCancelFeaturePackageButtonId: 'EzCancelFeaturePackageButton',
                ezMonthlyToggleButtonId: 'EzMonthlyToggleButton',
                ezYearlyToggleButtonId: 'EzYearlyToggleButton'
            },
            labels: {
                ezMonthYearToggleSwitchLabelId: 'EzMonthYearToggleSwitchLabel'
            },
            tables: {
                ezSubscriptionPlanAlignmentTableId: 'EzSubscriptionPlanAlignmentTable',
                ezSubscriptionPlanAlignmentTableBodyId: 'EzSubscriptionPlanAlignmentTable_Body',
                ezSubscriptionPlanAlignmentTableSubscriptionBoxesRowId: 'ezSubscriptionPlanAlignmentTable_SubscriptionBoxesRowId',
                ezSubscriptionPlanAlignmentTableSubscriptionBoxButtonsRowId: 'ezSubscriptionPlanAlignmentTable_SubscriptionBoxButtonsRow'
            }
        };
    }

    /**
     * @private @field
     * Stores the EzSubscriptionPlansView ready states.
     * @type {EzSubscriptionPlansViewReadyStates}
     */
    #ezSubscriptionPlansViewReadyStates = new EzSubscriptionPlansViewReadyStates();
    /**
     * @public @pr47yields\.operty @getter
     * Gets the EzSubscriptionPlansView ready states.
     * @returns {EzSubscriptionPlansViewReadyStates}
     */
    get ezSubscriptionPlansViewReadyStates() {
        return this.#ezSubscriptionPlansViewReadyStates;
    }
    /**
     * @public @property @setter
     * Sets the EzSubscriptionPlansView ready states.
     * @param {object} ezSubscriptionPlansViewReadyStates
     */
    set ezSubscriptionPlansViewReadyStates(ezSubscriptionPlansViewReadyStates) {
        if (!EzObject.isValid(ezSubscriptionPlansViewReadyStates)) {
            throw new EzBadParamException(
                'ezSubscriptionPlansViewReadyStates',
                this,
                this.ezSubscriptionPlansViewReadyStates);
        }

        this.#ezSubscriptionPlansViewReadyStates = ezSubscriptionPlansViewReadyStates;
    }

    /**
     * @private @field
     * Stores the avaialble subscription cards info
     * @type {EzSubscriptionCards}
     */
    #ezAvailableSubscriptionCards = new EzSubscriptionCards();
    /**
     * @public @property @getter
     * Gets the avaialble subscription cards info
     * @returns {EzSubscriptionCards}
     */
    get ezAvailableSubscriptionCards() {
        return this.#ezAvailableSubscriptionCards;
    }
    /**
     * @public @property @setter
     * Sets the avaialble subscription cards info
     * @param {EzSubscriptionCards} ezSubscriptionCards
     */set ezAvailableSubscriptionCards(ezSubscriptionCards) {
        this.#ezAvailableSubscriptionCards = EzObject.assignOrDefault(
            ezSubscriptionCards,
            new EzSubscriptionCards());
    }

    /**
     * @private @field
     * Stores the last selected license entity
     * @type {object}
     */
    #lastSelectedLicense = null;
    /**
     * @public @property @getter
     * Gets the last selected license entity
     * @returns {object}
     */
    get lastSelectedLicense() {
        return this.#lastSelectedLicense;
    }
    /**
     * @public @property @setter
     * Sets the last selected license entity
     * @param {object} lastSelectedLicense
     */
    set lastSelectedLicense(lastSelectedLicense) {
        this.#lastSelectedLicense = EzObject.assignOrNull(lastSelectedLicense);
    }

    /**
     * @private @field
     * Stores the license manager configuration data
     * @type {EzLicenseManagerConfiguration}
     */
    #ezLicenseManagerConfiguration = new EzLicenseManagerConfiguration();
    /**
     * @public @property @getter
     * Gets the license manager configuration data
     * @returns {EzLicenseManagerConfiguration}
     */
    get ezLicenseManagerConfiguration() {
        return this.#ezLicenseManagerConfiguration;
    }
    /**
     * @public @property @setter
     * Sets the license manager configuration data
     * @param {object|EzLicenseManagerConfiguration} ezLicenseManagerConfiguration
     */
    set ezLicenseManagerConfiguration(ezLicenseManagerConfiguration) {
        this.#ezLicenseManagerConfiguration = new EzLicenseManagerConfiguration(ezLicenseManagerConfiguration);
    }

    /**
     * @private @field
     * Stores the available feature packages
     * @type {array}
     */
    #ezAvailableFeaturePackages = [];
    /**
     * @public @property @getter
     * Gets the available feature packages
     * @returns {array}
     */
    get ezAvailableFeaturePackages() {
        return this.#ezAvailableFeaturePackages;
    }
    /**
     * @public @property @setter
     * Sets the available feature packages
     * @param {array} ezAvailableFeaturePackages
     */
    set ezAvailableFeaturePackages(ezAvailableFeaturePackages) {
        this.#ezAvailableFeaturePackages = EzArray.arrayOrEmpty(ezAvailableFeaturePackages);
    }

    /**
     * @private @field
     * Stores if a feature package is active (aka subscribed)
     * @type {boolean}
     */
    #ezFeaturePackageActive = false;
    /**
     * @public @property @getter
     * Gets the available feature packages
     * @returns {boolean}
     */
    get ezFeaturePackageActive() {
        return this.#ezFeaturePackageActive;
    }
    /**
     * @public @property @setter
     * Sets the available feature packages
     * @param {boolean} ezFeaturePackageActive
     */
    set ezFeaturePackageActive(ezFeaturePackageActive) {
        this.#ezFeaturePackageActive = EzBoolean.booleanOrFalse(ezFeaturePackageActive);
    }

    /**
     * @private @field
     * Stores the monthly yearly toggle switch html
     * @type {string}
     */
    #ezMonthYearToggleSwitchHtml = null;
    /**
     * @public @readonly @property
     * Gets the monthly yearly toggle switch html
     * @returns {string}
     */
    get ezMonthYearToggleSwitchHtml() {
        if (null == this.#ezMonthYearToggleSwitchHtml) {
            this.#ezMonthYearToggleSwitchHtml = EzHtml.build`
                <div
                    data-feature-id="ezfYearlySubscriptions2023"
                    id="ezfYearlySubscriptions2023_FeatureContainer"
                    class="ezFeatureContainer"
                    style="display:none">
                    <div
                        id="${this.ezIds.containers.ezMonthlyYearlyToggleContainerId}"
                        class="ezGrid-align-middle-center">
                        <div
                            id="${this.ezIds.containers.ezMonthlyYearlyToggleLayoutContainerId}"
                            class="ezButtons-toggle-button-large-2col-container">
                            <button
                                id="${this.ezIds.buttons.ezMonthlyToggleButtonId}"
                                class="ezButtons-toggle-button-large-unselected">
                                Monthly
                            </button>
                            <button
                                id="${this.ezIds.buttons.ezYearlyToggleButtonId}"
                                class="ezButtons-toggle-button-large-unselected">
                                Yearly
                            </button>
                        </div>
                    </div>
                </div>`;
        }

        return this.#ezMonthYearToggleSwitchHtml;
    }

    /**
     * @private @field
     * Stores the subscription plans container html
     * @type {string}
     */
    #ezSubscriptionPlansContainerHtml = null;
    /**
     * @public @readonly @property
     * Gets the subscription plans container html
     * @returns {string}
     */
    get ezSubscriptionPlansContainerHtml() {
        if (null == this.#ezSubscriptionPlansContainerHtml) {
            this.#ezSubscriptionPlansContainerHtml = EzHtml.build`
                <div
                    id="${this.ezIds.containers.ezSubscriptionPlansContainerId}"
                    class="ezSubscriptions-available-subscription-plans-container"
                    data-user-role-feature-id="EZROLE_FEATURE_ACCOUNT_SUBSCRIPTION_EDITING">
                </div>`;
        }

        return this.#ezSubscriptionPlansContainerHtml;
    }

    /**
     * @private @field
     * Stores the subscription managed by third party container HTML
     * @type {string}
     */
    #ezSubscriptionManagedByThirdPartyContainerHtml = null;
    /**
     * @public @readonly @property
     * Gets the subscription managed by third party container HTML
     * @returns {string}
     */
    get ezSubscriptionManagedByThirdPartyContainerHtml() {
        if (null == this.#ezSubscriptionManagedByThirdPartyContainerHtml) {
            this.#ezSubscriptionManagedByThirdPartyContainerHtml = EzHtml.build`
                <div
                    id="${EzSubscriptionPlansView.ezInstance.ezIds.containers.subscriptionManagedByThirdPartyContainerId}"
                    data-user-role-feature-id="EZROLE_FEATURE_ACCOUNT_SUBSCRIPTION_EDITING"
                    class="subscriptionManagedByThirdPartyContainer"
                    style="display:none">
                    <div
                        id="${EzSubscriptionPlansView.ezInstance.ezIds.containers.ezSubscriptionManagedByThirdParyContainerId}"
                        class="subscriptionManagedByThirdParthMessage">
                    </div>
                </div>`;
        }

        return this.#ezSubscriptionManagedByThirdPartyContainerHtml;
    }

    /**
     * @public @method
     * Initializes EzSubscriptionPlansView
     * @returns {EzSubscriptionPlansView}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezWantEventEx(
            new EzWantEventSettings(
                EzSubscriptionPlansViewReadyStates.ezEventNames.ezOnEzSubscriptionPlansViewStateReady,
                EzSubscriptionPlansView.ezApiName,
                EzSubscriptionPlansView.ezInstance.ezHandleOnEzSubscriptionPlansViewStateReady));

        ezApi.ezclocker.ezUi.ezPageWaitStart('Loading subscription information ...');

        EzSubscriptionPlansView.ezInstance.ezInitUX()
            .then(EzSubscriptionPlansView.ezInstance.ezInitWantEvents)
            .then(EzSubscriptionPlansView.ezInstance.ezInitSubscriptionData)
            .then(EzPromise.ignoreResult);

        return EzSubscriptionPlansView.ezInstance;
    }

    /**
     * @protected @method
     * Handles the EzSubscriptionPlansViewReadyStates's ezOnEzSubscriptionPlansViewStateReady event
     */
    ezHandleOnEzSubscriptionPlansViewStateReady() {
        ezApi.ezclocker.ezUi.ezPageWaitStop();

        return EzPromise.executeIgnoreResolve(
            this,
            EzSubscriptionPlansView.ezInstance.ezUpdateUxState,
            'EzSubscriptionPlansView.ezHandleOnEzSubscriptionPlansViewStateReady');
    }

    /**
     * @public @method
     * Initializes event handlers for EzSubscriptionPlansView
     * @returns {Promise.resolve}
     */
    ezInitWantEvents() {
        // The following events must trigger before the UX can initialize
        /*
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSelectedEmployerLicenseReady,
            EzSubscriptionPlansView.ezApiName,
            EzSubscriptionPlansView.ezInstance.ezHandleOnSelectedEmployerLicenseReadyUpdated,
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSelectedEmployerLicenseUpdated,
            EzSubscriptionPlansView.ezApiName,
            EzSubscriptionPlansView.ezInstance.ezHandleOnSelectedEmployerLicenseReadyUpdated,
            true);
        */

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSubscriptionContextActiveSubscriptionReady,
            EzSubscriptionPlansView.ezApiName,
            EzSubscriptionPlansView.ezInstance.ezHandleOnSubscriptionContextActiveSubscriptionReadyChanged);


        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSubscriptionContextActiveSubscriptionChanged,
            EzSubscriptionPlansView.ezApiName,
            EzSubscriptionPlansView.ezInstance.ezHandleOnSubscriptionContextActiveSubscriptionReadyChanged);

        /*
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSubscriptionContextAvailablePlansReady,
            EzSubscriptionPlansView.ezApiName,
            EzSubscriptionPlansView.ezInstance.ezHandleOnSubscriptionContextAvailablePlansReadyChanged,
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSubscriptionContextAvailablePlansChanged,
            EzSubscriptionPlansView.ezApiName,
            EzSubscriptionPlansView.ezInstance.ezHandleOnSubscriptionContextAvailablePlansReadyChanged,
            true);
        */

        // The following events do not need to trigger before the UX can initialize
        // However, their processing is ignored unless the ready state is ready.
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onSubscriptionContextAvailablePlansModeChanged,
            EzSubscriptionPlansView.ezApiName,
            EzSubscriptionPlansView.ezInstance.ezHandleOnSubscriptionContextAvailablePlansModeChanged,
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzClockerContextEventName.onActiveEmployerChanged,
            EzSubscriptionPlansView.ezApiName,
            EzSubscriptionPlansView.ezInstance.ezHandleOnActiveEmployerChanged,
            true);
    }

    /**
     * @public @method
     * Initializes the Subscription Plans UXezApi.ezclocker.ezClockerContext.
     * @returns {Promise.resolve}
     */
    ezInitUX() {
        return EzPromise.asyncAction(
            (finished) => {
                ezApi.ezclocker.ezUi.ezContent(
                    EzSubscriptionPlansView.ezInstance.ezIds.containers.ezAvailableSubscriptionsContainerId,
                    EzHtml.build`
                        ${EzSubscriptionPlansView.ezInstance.ezMonthYearToggleSwitchHtml}
                        ${EzSubscriptionPlansView.ezInstance.ezSubscriptionPlansContainerHtml}
                        ${EzSubscriptionPlansView.ezInstance.ezSubscriptionManagedByThirdPartyContainerHtml}
                        ${EzSubscriptionPlansView.ezInstance.ezSubscriptionInfoHtml}`);

                ezApi.ezclocker.ezEventEngine.ezWantEvent(
                    EzSubscriptionDialog.ezEventNames.ezOnSubscriptionDialogSubscribeSuccess,
                    EzSubscriptionPlansView.ezApiName,
                    EzSubscriptionPlansView.ezInstance.ezHandleOnSubscriptionDialogSubscribeSuccessError);

                ezApi.ezclocker.ezEventEngine.ezWantEvent(
                    EzSubscriptionDialog.ezEventNames.ezOnSubscriptionDialogSubscribeError,
                    EzSubscriptionPlansView.ezApiName,
                    EzSubscriptionPlansView.ezInstance.ezHandleOnSubscriptionDialogSubscribeSuccessError);

                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    EzSubscriptionPlansView.ezInstance.ezIds.buttons.ezMonthlyToggleButtonId,
                    EzElementEventName.CLICK,
                    EzSubscriptionPlansView.ezApiName,
                    EzSubscriptionPlansView.ezInstance.ezHandleMonthlyToggleButtonClick);

                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    EzSubscriptionPlansView.ezInstance.ezIds.buttons.ezYearlyToggleButtonId,
                    EzElementEventName.CLICK,
                    EzSubscriptionPlansView.ezApiName,
                    EzSubscriptionPlansView.ezInstance.ezHandleYearlyToggleButtonClick);

                return finished();
            });
    }

    /**
     * @public @method
     * Initializes the subscription plan and feature packages data as needed
     * @returns {Promise.resolve}
     */
    ezInitSubscriptionData() {
        return EzPromise.asyncAction(
            (finished) => EzSubscriptionPlansView.ezInstance.ezRefreshAvailableSubscriptionFeaturePackages()
                .then(
                    () => EzSubscriptionPlansView.ezInstance.ezRefreshLicenseManagerConfiguration()
                        .then(finished)));
    }

    /**
     * @public @method
     * Refreshes the available subscription feature packages
     * @returns {Promise.resolve}
     */
    ezRefreshAvailableSubscriptionFeaturePackages() {
        return EzPromise.asyncAction(
            (finished) => ezApi.ezclocker.ezSubscriptionApiClient.ezGetAvailableSubscriptionFeaturePackagesArray()
                .then(
                    (response) => {
                        EzSubscriptionPlansView.ezInstance.ezAvailableFeaturePackages = response.subscriptionFeaturePackages;

                        return finished();
                    },
                    (eResponse) => {
                        EzSubscriptionPlansView.ezInstance.ezAvailableFeaturePackages = [];

                        ezApi.ezclocker.ezLogger.error(
                            EzString.em`
                                Failed to obtain the available feature packages
                                due to the following error: ${eResponse.message}.
                                Error response: ${EzJson.toJson(eResponse)}`);

                        return ezApi.ezclocker.ezDialog.ezShowServiceResponseErrorDialog(
                            'Available Subscription Feature Packages Error',
                            EzString.msg`
                                EzClocker is unable to obtain the available subscription feature packages at this time.
                                ${EzDialog.REFRESH_PAGE_THEN_REPORT}`,
                            eResponse)
                            .then(finished)
                    }));
    }

    /**
     * @public @method
     * Refreshes the license manager configuration data
     * @returns {Promise.resolve}
     */
    ezRefreshLicenseManagerConfiguration() {
        return EzPromise.asyncAction(
            (finished) => ezApi.ezclocker.ezSubscriptionApiClient.ezGetLicenseManagerConfiguration()
                .then(
                    (response) => {
                        EzSubscriptionPlansView.ezInstance.ezLicenseManagerConfiguration = response;

                        return finished();
                    },
                    (eResponse) => {
                        ezApi.ezclocker.ezLogger.error(
                            EzString.em`
                                Failed to refresh the license manager configuration due to the following error:
                                ${eResponse.message}.
                                Error Response: ${EzJson.toJson(eResponse)}`);

                        // Default values
                        EzSubscriptionPlansView.ezInstance.ezLicenseManagerConfiguration = {
                            freeSubscriptionPlanId: 19,
                            subscriptionFreePlanId: 'ez2018.monthly.ezclocker.free',
                            gracePeriod: 3,
                            manageAppleAccountInformationUrl: EzString.EMPTY,
                            maximumFreeTrialDays: 30,
                            maximumPersonalEmployees: 100000,
                            personalProSubscriptionId: 139,
                            personalProSubscriptionPlanId: 'ez2020-monthly-personal-pro',
                            personalSubscriptionId: 6,
                            personalSubscriptionPlanId: 'ezclockerPersonal',
                            forceNeverSkipProviderChecks: true,
                            forceSkipRemoteProviderChecks: false
                        };

                        return finished();
                    }));
    }

    /**
     * @public @method
     * Renders the available subscription plans
     * @returns {Promise.resolve}
     */
    ezRenderSubscriptionPlans() {
        if (!ezApi.ezclocker.ezUi.ezElementExists(EzSubscriptionPlansView.ezInstance.ezIds.containers.ezSubscriptionPlansContainerId)) {
            ezApi.ezclocker.ezLogger.error(
                EzString.em`
                    Unable to render the available subscription plans due to the following error:
                    The UX container (id=${EzSubscriptionPlansView.ezInstance.ezIds.containers.ezSubscriptionPlansContainerId})
                    for the subscription plans HTML is not available in the document yet.`);

            // Container for the subscription plans html isn't available yet
            return;
        }

        if (!EzObject.isValid(ezApi.ezclocker.ezClockerContext.ezAvailableSubscriptionPlansInfo)) {
            ezApi.ezclocker.ezLogger.error(
                EzString.em`
                    Unable to render the available subscription plans due to the following error:
                    No available subscription plans information available in the EzClockerContext.`);

            return;
        }

        let subscriptionPlanRenderer = null;

        if (EzBillingFrequency.UNKNOWN === ezApi.ezclocker.ezClockerContext.ezSubscriptionContextSubscriptionPlanMode) {
            ezApi.ezclocker.ezClockerContext.ezSubscriptionContextSubscriptionPlanMode = EzBillingFrequency.UNKNOWN;
        }

        switch (ezApi.ezclocker.ezClockerContext.ezSubscriptionContextSubscriptionPlanMode) {
            case EzBillingFrequency.YEARLY:
                subscriptionPlanRenderer = EzSubscriptionPlansView.ezInstance.ezRenderAvailableYearlySubscriptionPlans;

                break;
            case EzBillingFrequency.MONTHLY:
                subscriptionPlanRenderer = EzSubscriptionPlansView.ezInstance.ezRenderAvailableMonthlySubscriptionPlans;

                break;
            default:
                // Nothing to render yet
                return;
        }

        if (EzObject.isValid(subscriptionPlanRenderer))
            return subscriptionPlanRenderer()
                .then(
                    (subscriptionPlansHtml) => {
                        ezApi.ezclocker.ezUi.ezSetContent(
                            EzSubscriptionPlansView.ezInstance.ezIds.containers.ezSubscriptionPlansContainerId,
                            subscriptionPlansHtml);

                        return EzSubscriptionPlansView.ezInstance.ezUpdateFeaturePackagesUX()
                            .then(EzPromise.ignoreFinished)
                    });
    }

    /**
     * @public @method
     * Loads the available monthly subscription plans into the UX.
     * @returns {Promise.resolve}
     */
    ezRenderAvailableMonthlySubscriptionPlans() {
        return EzPromise.asyncAction(
            (finished) => {
                if (EzBillingFrequency.MONTHLY !== ezApi.ezclocker.ezClockerContext.ezSubscriptionContextSubscriptionPlanMode &&
                    EzBillingFrequency.NONE !== ezApi.ezclocker.ezClockerContext.ezSubscriptionContextSubscriptionPlanMode) {
                    // Provided subscription plan data was not for monthly
                    ezApi.ezclocker.ezLogger.error(
                        EzString.em`
                            Not rendering the available monthly subscription plans due to the provided
                            monthly subscription plans data having a subscription plan mode of
                            ${ezApi.ezclocker.ezClockerContext.ezSubscriptionContextSubscriptionPlanMode}.`);

                    return finished(EzSubscriptionPlansView.ezInstance.ezRenderedMonthlySubscriptionPlansHtmlCache);
                }

                return EzSubscriptionPlansView.ezInstance.ezBuildAvailableSubscriptionPlansHTML(
                    ezApi.ezclocker.ezClockerContext.ezAvailableSubscriptionPlansInfo.availableSubscriptionPlans.monthlyPlans,
                    EzBillingFrequency.MONTHLY)
                    .then(finished);
            });
    }

    /**
     * @public @method`
     * Loads the available yearly subscription plans into the UX
     * @returns {Promise.resolve}
     */
    ezRenderAvailableYearlySubscriptionPlans() {
        return EzPromise.asyncAction(
            (finished) => {
                if (EzBillingFrequency.NONE !== ezApi.ezclocker.ezClockerContext.ezSubscriptionContextSubscriptionPlanMode &&
                    EzBillingFrequency.YEARLY !== ezApi.ezclocker.ezClockerContext.ezSubscriptionContextSubscriptionPlanMode) {
                    // Provided subscription plan data was not for yearly
                    ezApi.ezclocker.ezLogger.error(
                        EzString.em`
                            Not rendering the available yearly subscription plans due to the provided
                            yearly subscription plans data having a subscription plan mode of
                            ${ezApi.ezclocker.ezClockerContext.ezSubscriptionContextSubscriptionPlanMode}.`);

                    return finished(EzSubscriptionPlansView.ezInstance.ezRenderedYearlySubscriptionPlansHtmlCache);
                }

                // Full render
                return EzSubscriptionPlansView.ezInstance.ezBuildAvailableSubscriptionPlansHTML(
                    ezApi.ezclocker.ezClockerContext.ezAvailableSubscriptionPlansInfo.availableSubscriptionPlans.yearlyPlans,
                    EzBillingFrequency.YEARLY)
                    .then(finished);
            });
    }

    /**
     * @public @method
     * Builds the Subscription Add-ons container
     * @returns {string}
     */
    ezBuildAvailableFeaturePackagesHtml() {
        return EzPromise.asyncAction(
            (finished) => {
                let activeEmployerLicense = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployerLicense();

                if (!EzObject.isValid(activeEmployerLicense)) {
                    // No license info, no subscription feature packages :)
                    return finished(EzString.EMPTY);
                }

                // Subscription does not already have the ezNovaAddOn
                let featurePackageCardsHtml = EzString.EMPTY;

                let subscribedFeaturePackages = EzSubscriptionPlansView.ezInstance.ezGetSubscribedFeaturePackageIdList();

                if (EzArray.hasLength(EzSubscriptionPlansView.ezInstance.ezAvailableFeaturePackages)) {
                    for (let featurePackage of EzSubscriptionPlansView.ezInstance.ezAvailableFeaturePackages) {
                        if ((EzBoolean.isTrue(featurePackage.enabled) || -1 != subscribedFeaturePackages.indexOf(featurePackage.featurePackageId)) &&
                            featurePackage.subscriptionPlanProvider === activeEmployerLicense.subscriptionProvider ||
                            EzSubscriptionPlanProvider.BRAINTREEPAYMENTS_SUBSCRIPTION === featurePackage.subscriptionPlanProvider) {
                            featurePackageCardsHtml = EzHtml.build`
                                ${featurePackageCardsHtml}
                                ${EzSubscriptionPlansView.ezInstance.ezBuildFeaturePackageCard(activeEmployerLicense, featurePackage)}`;
                        }
                    }
                }

                if (EzString.hasLength(featurePackageCardsHtml)) {
                    featurePackageCardsHtml = EzHtml.build`
                        <div
                            id="${EzSubscriptionPlansView.ezInstance.ezIds.containers.ezAvailableFeaturePackagesContainerId}"
                            class="ezGrid-fullsize ezTopMargin_10">
                            ${featurePackageCardsHtml}
                        </div>`
                }

                return finished(
                    EzHtml.build`
                        <div
                            id="${EzSubscriptionPlansView.ezInstance.ezIds.containers.ezFeaturePackagesContainerId}">
                            ${featurePackageCardsHtml}
                        </div>`);
            });
    }

    /**
     * @public @method
     * Gets the active employer license's subscribed feature packages ids in an array
     * @returns {array}
     */
    ezGetSubscribedFeaturePackageIdList() {
        let activeEmployerLicense = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployerLicense();

        let subscribedFeaturePackageIds = [];

        if (EzArray.hasLength(activeEmployerLicense?.featurePackages)) {
            for (let subscribedFeaturePackage of activeEmployerLicense.featurePackages) {
                if (EzString.hasLength(subscribedFeaturePackage.featurePackageId)) {
                    subscribedFeaturePackageIds.push(subscribedFeaturePackage.featurePackageId);
                }
            }
        }

        return subscribedFeaturePackageIds;
    }

    /**
     * @public @method
     * Builds a feature package's information card
     * @param {object} activeEmployerLicense
     * Insance of the active employer's license
     * Obtained from: ezApi.ezclocker.ezClockerContext.ezGetActiveEmployerLicense()
     * @param {object} ezSubscriptionFeaturePackage
     * EzSubscriptionFeaturePackage entity to build the feature package card UX for
     * @returns {string}
     */
    ezBuildFeaturePackageCard(activeEmployerLicense, ezSubscriptionFeaturePackage) {
        if (null == activeEmployerLicense) {
            throw new EzBadParamException(
                'activeEmployerLicense',
                EzSubscriptionPlansView.ezInstance,
                EzSubscriptionPlansView.ezInstance.ezBuildFeaturePackageCard);
        }
        if (null == ezSubscriptionFeaturePackage) {
            throw new EzBadParamException(
                'ezSubscriptionFeaturePackage',
                EzSubscriptionPlansView.ezInstance,
                EzSubscriptionPlansView.ezInstance.ezBuildFeaturePackageCard);
        }

        /*
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            ENGINEERING NOTES
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            If activeEmployerLicense includes a subscription to the provided featurePackageInstanceToBuildCardFor, then obtain
            the EzEmployerFeaturePackage entity for the featurePackageId of the provided ezSubscriptionFeaturePackage from the
            active employer's license.
            The EzEmployerFeaturePackage instance is available from the
            ezApi.ezclocker.ezClockerContext.ezGetActiveEmployerLicense().featurePackages array.
            References:
                * EzEmployerFeaturePackage defined in Java class: com.ezclocker.domain.entities.EzEmployerFeaturePackage
                * EzClockerContext JS class: /ezlibrary/EzClockerContext/ez-context.js
        */
        let ezEmployerFeaturePackage = EzSubscriptionPlansView.ezInstance.ezGetFeaturePackageIfActiveEmployerIsSubscribed(
            activeEmployerLicense.featurePackages,
            ezSubscriptionFeaturePackage.featurePackageId);

        /*
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            ENGINEERING NOTES
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            Get the EzFeaturePackageInfo for the the ezSubscriptionFeaturePackage.featurePackageId from the EzFeaturePackageId enumeration.
            ---------------------------------------------------------
            References:
                * EzFeaturePackageInfo JS class: /ezlibrary/entities/billing/EzFeaturePackageInfo.js
                * EzFeaturePackageId JS (enum) class: Javascript enumeration: /ezlibrary/enums/EzFeaturePackageId.js
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        */
        let ezFeaturePackageInfo = EzFeaturePackageId.ezEnumData(ezSubscriptionFeaturePackage.featurePackageId);

        let featurePackageCardProps = EzObject.isValid(ezEmployerFeaturePackage)
            ? {
                // Employer is subscribed to the feature package
                nameContainerStatusClass: 'EzContainer-check-black',
                nameContainerContent: '&nbsp;(Active)',
                featurePackageBlurb: ezFeaturePackageInfo.subscribedBlurb,
                featurePackageAdditionalFeeText: EzSubscriptionPlansView.ezInstance.ezBuildAdditionalFeeText(
                    // Employer's feature package subscription info
                    ezEmployerFeaturePackage,
                    // Feature package entity
                    ezSubscriptionFeaturePackage),
                buttonOrInfoHtml: EzSubscriptionPlansView.ezInstance.ezBuildFeaturePackageButton(
                    // Employer's license
                    activeEmployerLicense,
                    // Feature package entity
                    ezSubscriptionFeaturePackage,
                    // Feature package info for feature package entity
                    ezFeaturePackageInfo,
                    // Employer's feature package subscription info (could be null if not subscribed)
                    ezEmployerFeaturePackage)
            }
            : {
                // Employer is NOT subscribed to the feature package
                nameContainerStatusClass: EzString.EMPTY,
                nameContainerContent: EzString.EMPTY,
                featurePackageBlurb: ezFeaturePackageInfo.marketingBlurb,
                featurePackageAdditionalFeeText: ezFeaturePackageInfo.additionalFeeDisplay,
                buttonOrInfoHtml: EzSubscriptionPlansView.ezInstance.ezBuildFeaturePackageButton(
                    // Employer's license
                    activeEmployerLicense,
                    // Feature package entity
                    ezSubscriptionFeaturePackage,
                    // Feature package info for feature package entity
                    ezFeaturePackageInfo,
                    // Employer's feature package subscription info (could be null if not subscribed)
                    ezEmployerFeaturePackage)
            };

        let showFeaturePackageId = ezApi.ezclocker.ezUrlHelper.ezShowIds
            ? EzHtml.build`
                <span
                    id="EzFeaturePackageAddOn_DisplayId_${ezSubscriptionFeaturePackage.featurePackageId}"
                    class="ezText-debug-id">
                    (${ezSubscriptionFeaturePackage.featurePackageId})
                </span>`
            : EzString.EMPTY;

        return EzHtml.build`
            <div
                id="EzFeaturePackageAddOn__${ezSubscriptionFeaturePackage.featurePackageId}"
                class="ezGrid-fullsize ezContainer-default-ezClockerWhite">
                <div
                    id="EzFeaturePacakgeCardTitleContainer_${ezSubscriptionFeaturePackage.featurePackageId}"
                    class="ezContainer-title-box-ezClockerNavy-pad-8 ezText-topic-size-14pt ezText-bold ezAutoCol_AxA ezGrid-vertical-align-middle ezGrid-align-space-between">
                    <div
                        id="EzFeaturePackageCardNameContainer_${ezSubscriptionFeaturePackage.featurePackageId}"
                        class="ezAutoCol_AxA ezGrid-vertical-align-middle ezGrid-align-left">
                        <span
                            id="EzFeaturePackageCardNameContainer_Name">
                            ${ezFeaturePackageInfo.name}
                        </span>
                        ${showFeaturePackageId}
                        <span
                            id="EzFeaturePackageCardNameContainer_Status_${ezSubscriptionFeaturePackage.featurePackageId}"
                            class="${featurePackageCardProps.nameContainerStatusClass}">
                            ${featurePackageCardProps.nameContainerContent}
                        </span>
                    </div>
                </div>
                <div
                    id="EzFeaturePackageInfoContainer_${ezSubscriptionFeaturePackage.featurePackageId}"
                    class="ezContainer-bottom-ezClockerWhite-pad-10 ezGrid-align-space-between ezGrid-vertical-align-middle ezAutoCol_AxA ezGridGap_20">
                    <div
                        id="EzFeaturePackageMarketingBlurbContainer_${ezSubscriptionFeaturePackage.featurePackageId}">
                        <span
                            id="EzFeaturePackageMarketingBlurbContainer_Blurb_${ezSubscriptionFeaturePackage.featurePackageId}">
                            ${featurePackageCardProps.featurePackageBlurb}
                        </span>
                    </div>
                    <div
                        id="EzAddTimeOffAddOnButtonContainer_${ezSubscriptionFeaturePackage.featurePackageId}"
                        class="ezAutoRow_AxA ezGrid-align-middle-center ezContainer-glass-bubble-pad-20">
                        <div
                            id="EzFeaturePackageMontlyFeeContainer_${ezSubscriptionFeaturePackage.featurePackageId}"
                            class="ezText-black ezText-topic-size-14pt ezPad8">
                            <span
                                id="EzFeaturePackageMontlyFeeContainer_AdditionalFeeText_${ezSubscriptionFeaturePackage.featurePackageId}">
                                ${featurePackageCardProps.featurePackageAdditionalFeeText}
                            </span>
                        </div>
                        ${featurePackageCardProps.buttonOrInfoHtml}
                    </div>
                </div>
            </div>`;
    }

    /**
     * @public @method
     * Builds the feature package's subscription button html
     * @param {object} activeEmployerLicense
     * Insance of the active employer's license
     * Normally obtained from: ezApi.ezclocker.ezClockerContext.ezGetActiveEmployerLicense()
     * @param {object} ezSubscriptionFeaturePackage
     * EzSubscriptionFeaturePackage entity to display the card for
     * @param {object} ezFeaturePackageInfo
     * EnumData instance from EzFeaturePackageId for the featurePackageId of the provided ezSubscriptionFeaturePackage.
     * @param {undefined|null|object} ezEmployerFeaturePackage
     * Employer feature package subscription info instance (if subscribed to feature package)
     * @returns {string}
     */
    ezBuildFeaturePackageButton(activeEmployerLicense, ezSubscriptionFeaturePackage, ezFeaturePackageInfo, ezEmployerFeaturePackage = null) {
        if (!EzObject.isValid(activeEmployerLicense)) {
            throw new EzBadParamException(
                'activeEmployerLicense',
                EzSubscriptionPlansView.ezInstance,
                EzSubscriptionPlansView.ezInstance.ezBuildFeaturePackageButton);
        }
        if (!EzObject.isValid(ezSubscriptionFeaturePackage)) {
            throw new EzBadParamException(
                'ezSubscriptionFeaturePackage',
                EzSubscriptionPlansView.ezInstance,
                EzSubscriptionPlansView.ezInstance.ezBuildFeaturePackageButton);
        }
        if (!EzObject.isValid(ezFeaturePackageInfo)) {
            throw new EzBadParamException(
                'ezFeaturePackageInfo',
                EzSubscriptionPlansView.ezInstance,
                EzSubscriptionPlansView.ezInstance.ezBuildFeaturePackageButton);
        }

        if (EzObject.isValid(ezEmployerFeaturePackage)) {
            return EzSubscriptionPlanProvider.EZCLOCKER_SUBSCRIPTION !== activeEmployerLicense.planProvider
                // Build cancel feature package subscription
                ? EzSubscriptionPlansView.ezInstance.ezBuildCancelFeaturePackageSubscriptionButton(
                    ezEmployerFeaturePackage,
                    ezFeaturePackageInfo.name,
                    activeEmployerLicense.canceled)
                // Build complementry feature package subscription info
                : EzSubscriptionPlansView.ezInstance.ezBuildComplementryFeaturePackageSubscriptionInfo(
                    ezEmployerFeaturePackage,
                    ezFeaturePackageInfo.name);
        }

        if (!ezSubscriptionFeaturePackage.ezIsAvailableForSubscriptionPlanId(activeEmployerLicense.subscriptionPlan.planId)) {
            // Build the feature package not available info
            return EzSubscriptionPlansView.ezInstance.ezBuildSubscriptionFeaturePackageNotAvailableHTML(
                ezSubscriptionFeaturePackage.availableForSubscriptionIds);
        }

        // Build subscribe to feature package button
        return EzSubscriptionPlansView.ezInstance.ezBuildSubscribeToFeaturePackageButton(
            activeEmployerLicense,
            ezSubscriptionFeaturePackage,
            ezFeaturePackageInfo);
    }

    /**
     * @public @method
     * Builds the subscription feature package's cancel subscription button
     * @param {object} ezEmployerFeaturePackage
     * @param {undefiend|null|string} featurePackageDisplayName
     * @param {undefined|null|boolean} employerSubscriptionCanceled
     * If true, indicates that the employer's active subscription is canceled.
     * Any other value indicates the employer's active subscription is NOT canceled.
     * @returns {string}
     */
    ezBuildCancelFeaturePackageSubscriptionButton(ezEmployerFeaturePackage, featurePackageDisplayName, employerSubscriptionCanceled) {
        if (null == ezEmployerFeaturePackage) {
            throw new EzBadParamException(
                'ezEmployerFeaturePackage',
                EzSubscriptionPlansView.ezInstance,
                EzSubscriptionPlansView.ezInstance.ezBuildCancelFeaturePackageSubscriptionButton);
        }

        EzSubscriptionPlansView.ezInstance.ezFeaturePackageActive = true;

        let buttonId = `${EzSubscriptionPlansView.ezInstance.ezIds.buttons.ezCancelFeaturePackageButtonId}_${ezEmployerFeaturePackage.id}`;

        let buttonProps = {
            id: buttonId,
            cssClasses: 'ezDeleteMajorButton',
            title: 'Click to cancel your feature package subscription. Your regular subscription will remain as it is.',
            onClick: `ezApi.ezclocker.ezSubscriptionPlansView.ezHandleCancelFeaturePackageButtonClick('${ezEmployerFeaturePackage.featurePackageId}')`,
            disabled: EzString.EMPTY,
            dataEzFpId: ezEmployerFeaturePackage.featurePackageId,
            dataEzFpProviderAddOnId: ezEmployerFeaturePackage.providerAddOnId,
            buttonLabel: EzHtml.build`
                <div
                    id="${buttonId}_Label">
                    Cancel
                </div>
                <div
                    id="${buttonId}_FeaturePackageDisplayName">
                    ${EzString.stringOrDefault(featurePackageDisplayName, ezEmployerFeaturePackage.featurePackageId)}
                </div>`
        };

        if (EzBoolean.isTrue(employerSubscriptionCanceled)) {
            buttonProps.title =
                `Your active subscription is canceled which has also canceled the subscription to ${featurePackageDisplayName} feature package.`;

            buttonProps.onClick = EzString.EMPTY;

            buttonProps.disabled = 'disabled';

            buttonProps.buttonLabel = 'Canceled';

            buttonProps.featurePackageDisplayName = EzString.EMPTY;
        }

        return EzSubscriptionPlansView.ezInstance.ezBuildFeaturePackageButtonHTML(buttonProps);
    }

    /**
     * @public @method
     * Builds the complementry feature package subscription info HTML
     * @param {object} ezEmployerFeaturePackage
     * @param {undefined|null|string} featurePackageDisplayName
     * @returns {string}
     */
    ezBuildComplementryFeaturePackageSubscriptionInfo(ezEmployerFeaturePackage, featurePackageDisplayName) {
        if (null == ezEmployerFeaturePackage) {
            throw new EzBadParamException(
                'ezEmployerFeaturePackage',
                EzSubscriptionPlansView.ezInstance,
                EzSubscriptionPlansView.ezInstance.ezBuildComplementryFeaturePackageSubscriptionInfo);
        }

        EzSubscriptionPlansView.ezInstance.ezFeaturePackageActive = true;

        let buttonId = `${EzSubscriptionPlansView.ezInstance.ezIds.buttons.ezCancelFeaturePackageButtonId}_${ezEmployerFeaturePackage.id}`;

        return EzSubscriptionPlansView.ezInstance.ezBuildFeaturePackageButtonHTML({
            id: buttonId,
            cssClasses: 'ezDeleteMajorButton',
            title: `EzClocker has added the ${featurePackageDisplayName} feature package to your account for free.`,
            onClick: EzString.EMPTY,
            dataEzFpId: ezEmployerFeaturePackage.featurePackageId,
            dataEzFpProviderAddOnId: ezEmployerFeaturePackage.providerAddOnId,
            disabled: 'disabled',
            buttonLabel: EzHtml.build`
                <div
                    id="${buttonId}_ActionTextContainer">
                    Complementary Subscription (Thank you!)',
                </div>`
        });
    }

    /**
     * @public @method
     * Builds the feature package subscription button
     * @param {object} activeEmployerLicense
     * Instance of the active employer's license
     * @param {object} ezSubscriptionFeaturePackage
     * EzSubscriptionFeaturePackage entity to build the button for
     * @param {object} featurePackageInfo
     * EzFeaturePackageInfo instance from the EzFeaturePackageId ezEnum Data
     * @returns {string}
     */
    ezBuildSubscribeToFeaturePackageButton(activeEmployerLicense, ezSubscriptionFeaturePackage, featurePackageInfo) {
        if (!activeEmployerLicense) {
            throw new EzBadParamException(
                'activeEmployerLicense',
                EzSubscriptionPlansView.ezInstance,
                EzSubscriptionPlansView.ezInstance.ezBuildSubscribeToFeaturePackageButton);
        }
        if (!ezSubscriptionFeaturePackage) {
            throw new EzBadParamException(
                'ezSubscriptionFeaturePackage',
                EzSubscriptionPlansView.ezInstance,
                EzSubscriptionPlansView.ezInstance.ezBuildSubscribeToFeaturePackageButton);
        }
        if (!featurePackageInfo) {
            throw new EzBadParamException(
                'featurePackageInfo',
                EzSubscriptionPlansView.ezInstance,
                EzSubscriptionPlansView.ezInstance.ezBuildSubscribeToFeaturePackageButton);
        }

        let buttonId = `${EzSubscriptionPlansView.ezInstance.ezIds.buttons.ezAddFeaturePackageButtonId}_${ezSubscriptionFeaturePackage.featurePackageId}`;

        let buttonProps = {
            id: buttonId,
            cssClasses: 'ezActionButton',
            title: `Click to subscribe to the ${featurePackageInfo.name} feature package!`,
            onClick: `ezApi.ezclocker.ezSubscriptionPlansView.ezHandleAddFeaturePackageButtonClick('${ezSubscriptionFeaturePackage.featurePackageId}')`,
            dataEzFpId: ezSubscriptionFeaturePackage.featurePackageId,
            dataEzFpProviderAddOnId: ezSubscriptionFeaturePackage.providerAddOnId,
            disabled: EzString.EMPTY,
            buttonLabel: EzHtml.build`
                <div
                    id="${buttonId}_ActionText"
                    class="ezText-topic-size-14pt">
                    Add
                </div>
                <div
                    id="${buttonId}_FeaturePackageName"
                    class="ezText-small-size-10pt">
                    ${featurePackageInfo.name}
                </div>`
        };

        if (EzBoolean.booleanOrFalse(activeEmployerLicense.canceled)) {
            buttonProps.title = 'You cannot subscribe to a feature package if your subscription is canceled.';

            buttonProps.onClick = EzString.EMPTY;

            buttonProps.disabled = 'disabled';

            buttonProps.buttonLabel = 'Not Currently Available';
        };

        return EzSubscriptionPlansView.ezInstance.ezBuildFeaturePackageButtonHTML(buttonProps);
    }

    /**
     * @public @method
     * Builds the feature package's action UX button HTML
     * @param {object} buttonProps
     * Expecting object: {
     *     id: {string},
     *     cssClasses: {string},
     *     title: {string},
     *     onClick: {EzString.EMPTY|Javascript onClick Handler as String},
     *     dataEzFpId: {string|number},
     *     dataEzFpProviderAddOnId: {string},
     *     disabled: {EzString.EMPTY|'disabled'},
     *     buttonLabel: {string}
     * }
     * @returns {string}
     */
    ezBuildFeaturePackageButtonHTML(buttonProps) {
        if (!buttonProps) {
            throw new EzBadParamException(
                'buttonProps',
                EzSubscriptionPlansView.ezInstance,
                EzSubscriptionPlansView.ezInstance.ezBuildFeaturePackageButton);
        }

        return EzHtml.build`
            <button
                id="${buttonProps.id}"
                class="${buttonProps.cssClasses}"
                title="${buttonProps.title}"
                data-ezfp-id="${buttonProps.dataEzFpId}"
                data-ezfp-provider-add-on-id="${buttonProps.dataEzFpProviderAddOnId}"
                onClick="${buttonProps.onClick}"
                ${buttonProps.disabled}>
                ${buttonProps.buttonLabel}
            </button>`;
    }

    /**
     * @public @method
     * Builds the subscription feature package not available HTML
     * @param {array} availableForSubscriptionIds
     * Array of subscription plan is available for a feature package.
     * Reference normally from EzSubscriptionFeaturePackage.availableForSubscriptionIds array.
     * @returns {string}
     */
    ezBuildSubscriptionFeaturePackageNotAvailableHTML(availableForSubscriptionIds) {
        let availableForSubscriptionPlans = EzString.EMPTY;

        for (let subscriptionPlanId of availableForSubscriptionIds) {
            let ezSubscriptionPlanIdInfo = EzSubscriptionPlanId.ezGetEzEnumDataForEnumValue(subscriptionPlanId);

            if (EzObject.isValid(ezSubscriptionPlanIdInfo) && EzString.hasLength(ezSubscriptionPlanIdInfo.displayName)) {
                availableForSubscriptionPlans = EzHtml.build`
                    ${availableForSubscriptionPlans}
                    <li
                        id="EzAvailableForSubscriptionPlanBullet_${subscriptionPlanId}">
                        <span
                            id="EzAvailableForSubscriptionPlanBullet_DisplayName_${subscriptionPlanId}">
                            ${ezSubscriptionPlanIdInfo.displayName}
                        </span>
                    </li>`;
            }
        }

        let ezFeaturePackageNotAvailableIdPrefix = "EzFeaturePackageNotAvailableForYourSubscription";

        return EzString.hasLength(availableForSubscriptionPlans)
            ? EzHtml.build`
                <div
                    id="${ezFeaturePackageNotAvailableIdPrefix}">
                    <span
                        id="${ezFeaturePackageNotAvailableIdPrefix}_Message">
                            Sorry, this feature package is only available for the following subscriptions:
                    </span>
                    <div
                        id="${ezFeaturePackageNotAvailableIdPrefix}_SupportedSubscriptionsContainer">
                        <ul
                            id="${ezFeaturePackageNotAvailableIdPrefix}_SupportedSubscriptionsBullets">
                            ${availableForSubscriptionPlans}
                        </ul>
                    </div>
                </div>`
            : EzHtml.build`
                <div
                    id="${ezFeaturePackageNotAvailableIdPrefix}">
                    <span
                        id="${ezFeaturePackageNotAvailableIdPrefix}_Message">
                        Sorry, this feature package is not available for your current subscription.
                    </span>
                </div>`;
    }

    /**
     * @public @method
     * Builds the additional fee text for the ezEemployerFeaturePackage to display
     * @param {object} ezEmployerFeaturePackage
     * EzEmployerFeaturePackage entity the employer is subscribed to.
     * Instance is obtained from ezGetActiveEmployerLicense().featurePackages array
     * @param {object} ezSubscriptionFeaturePackage
     * EzSubscriptionFeaturePackage entity to build the button for
     * @returns {string}
     */
    ezBuildAdditionalFeeText(ezEmployerFeaturePackage, ezSubscriptionFeaturePackage) {
        if (!EzObject.isValid(ezEmployerFeaturePackage)) {
            throw new EzBadParamException(
                'ezEmployerFeaturePackage',
                EzSubscriptionPlansView.ezInstance,
                EzSubscriptionPlansView.ezInstance.ezBuildAdditionalFeeText);
        }
        if (!EzObject.isValid(ezSubscriptionFeaturePackage)) {
            throw new EzBadParamException(
                'ezSubscriptionFeaturePackage',
                EzSubscriptionPlansView.ezInstance,
                EzSubscriptionPlansView.ezInstance.ezBuildAdditionalFeeText);
        }

        if ((EzObject.isValid(ezEmployerFeaturePackage) && EzSubscriptionPlanProvider.EZCLOCKER_SUBSCRIPTION === ezEmployerFeaturePackage.billingProviderId) ||
            EzBoolean.isTrue(ezSubscriptionFeaturePackage.free) || 0 == ezSubscriptionFeaturePackage.billingAmount) {
            // Employer is subscribed to a complementry or free feature package
            return 'Free (No additional fees)';
        }

        if (EzBoolean.isTrue(ezSubscriptionFeaturePackage.billedMonthly)) {
            // Employer is subscribed to a feature package that is billed monthly
            return EzString.msg`$${ezEmployerFeaturePackage.billingAmount}/month additional fee`;
        }

        if (EzBoolean.isTrue(ezSubscriptionFeaturePackage.billedYearly)) {
            // Employer is subscribed to a feature package that is billed yearly
            return EzString.msg`$${ezSubscriptionFeaturePackage.billingAmount}/year additional fee`;
        }

        if (EzBoolean.isTrue(ezSubscriptionFeaturePackage.billedOnce)) {
            // Employer is subscribed to a feature package that was billed once
            return EzString.msg`One time fee of $${ezSubscriptionFeaturePackage.billingAmount} (PAID)`;
        }
    }

    /**
     * @public @method
     * 1) If the active employer is subscribed to the feature package associated with the provided featurePackageId, then feature package entity reference
     *    from the activeEmployerLicense.featurePackages array is returned.
     * 2) Otherwise, null is returned.
     * @param {array} featurePackages
     * @param {string} featurePackageId
     * A valid enum property value from EzFeaturePackageId
     * @returns {null|object}
     */
    ezGetFeaturePackageIfActiveEmployerIsSubscribed(featurePackages, featurePackageId) {
        if (!EzObject.isValid(featurePackages)) {
            throw new EzBadParamException(
                'featurePackages',
                EzSubscriptionPlansView.ezInstance,
                EzSubscriptionPlansView.ezInstance.ezGetFeaturePackageIfActiveEmployerIsSubscribed);
        }
        if (!EzString.hasLength(featurePackageId)) {
            throw new EzBadParamException(
                'featurePackageId',
                EzSubscriptionPlansView.ezInstance,
                EzSubscriptionPlansView.ezInstance.ezGetFeaturePackageIfActiveEmployerIsSubscribed);
        }

        if (EzArray.hasLength(featurePackages)) {
            for (let activeEmployerSubscribedFeaturePackage of featurePackages) {
                if (EzFeaturePackageId.ezEnumData(featurePackageId).providerAddOnId === activeEmployerSubscribedFeaturePackage.providerAddOnId) {
                    return activeEmployerSubscribedFeaturePackage;
                }
            }
        }

        return null;
    }

    /**
     * @public @method
     * @param {array} availableSubscriptionPlans
     * @param {string} ezBillingFrequency
     * A valid enum property value from EzBillingFrequency
     * @returns {Promise.resolve}
     * Resolve contains the HTML representing the available subscription plans
     */
    ezBuildAvailableSubscriptionPlansHTML(availableSubscriptionPlans, ezBillingFrequency) {
        ezBillingFrequency = EzBillingFrequency.ezValueOf(ezBillingFrequency);

        return EzPromise.asyncAction(
            (finished) => {
                return EzSubscriptionPlansView.ezInstance.ezGenerateAvailableezSubscriptionCards(availableSubscriptionPlans, ezBillingFrequency)
                    .then(
                        (ezSubscriptionCards) => finished(
                            EzHtml.build`
                                <div
                                    id="${EzSubscriptionPlansView.ezInstance.ezIds.containers.ezSubscriptionPlansMonthlyContainerId}">
                                    <div
                                        id="${EzSubscriptionPlansView.ezInstance.ezIds.containers.ezSubscriptionPlansMonthlyContainerId}"
                                        class="ezSubscriptions-subscription-plans-layoutContainer">
                                        ${ezSubscriptionCards}
                                    </div>
                                </div>
                                <div
                                    id="${EzSubscriptionPlansView.ezInstance.ezIds.containers.ezSubscriptionPlansContainerId}_FeaturePackagesContainer">
                                </div>`));
            });
    }

    /**
     * @public @method
     * Determines if the provided subscription plan is an internal only subscription plan.
     * @param {object} subscriptionPlan
     * @returns {boolean}
     */
    ezIsInternalSubscriptionPlan(subscriptionPlan) {
        if (!EzObject.isValid(subscriptionPlan)) {
            return false;
        }

        switch (subscriptionPlan.planId) {
            case 'ez2023-monthly-engineering':
            case 'ez2023-yearly-engineering':
            case 'ez2018-monthly-ezclockerDev':
                return true;
            default:
                return false;
        }
    }

    /**
     * @public @method
     * Builds subscription plan boxes and selection buttons from the provided availableSubscriptionPlanData
     * @param {array} availableSubscriptionPlans
     * @param {string} billingFrequency
     * A valid enum property value from EzBillingFrequency
     * @returns {Object}
     * Return object:
     *  {
     *      subscriptionBoxes: {String},
     *      planSelectionButtons: {String}
     *  }
     */
    ezGenerateAvailableezSubscriptionCards(availableSubscriptionPlans, ezBillingFrequency) {
        ezBillingFrequency = EzBillingFrequency.ezValueOf(ezBillingFrequency);

        if (EzBillingFrequency.UNKNOWN === ezBillingFrequency) {
            throw new EzBadParamException(
                'ezBillingFrequency',
                EzSubscriptionPlansView.ezInstance,
                EzSubscriptionPlansView.ezInstance.ezGenerateAvailableezSubscriptionCards);
        }

        return EzPromise.asyncAction(
            (finished) => {
                let ezSubscriptionCards = ezApi.ezclocker.ezUrlHelper.ezShowIds
                    ? EzHtml.build`
                        <style
                            id="EzInternalSubscriptionPlanCssClasses">
                            .ezContainer-internal-subscription-plan {
                                position: fixed;
                                top: 20px;
                                left: 80vw;
                                scale: 70%;
                                opacity: 25%;
                                border-style: solid;
                                border-width: 2px;
                                border-color: var(--ezClockerHotGreen);
                                box-shadow: 8px 8px 8px 0px var(--ezClockerGray);
                            }
                            .ezContainer-internal-subscription-plan:hover {
                                position: fixed;
                                top: 20px;
                                left: 80vw;
                                scale: 70%;
                                opacity: 100%;
                                border-style: solid;
                                border-width: 2px;
                                border-color: var(--ezClockerHotGreen);
                                box-shadow: 8px 8px 8px 0px var(--ezClockerGray);
                            }
                        </style>`
                    : EzString.EMPTY;

                if (!EzArray.hasLength(availableSubscriptionPlans)) {
                    // No data
                    return finished(ezSubscriptionCards);
                }

                for (let subscriptionPlan of availableSubscriptionPlans) {
                    let isInternalPlan = EzSubscriptionPlansView.ezInstance.ezIsInternalSubscriptionPlan(subscriptionPlan);

                    if (!ezApi.ezclocker.ezUrlHelper.ezShowIds && isInternalPlan) {
                        ezApi.ezclocker.ezLogger.debug(
                            '[EzSubscriptionPlansView.ezGenerateAvailableezSubscriptionCards: Skipped showing internal subscriptions]');
                    } else {
                        let ezSubscriptionCard = EzSubscriptionPlansView.ezInstance.ezAvailableSubscriptionCards.ezAddSubscriptionCard(subscriptionPlan);

                        let internalPlanClassName = isInternalPlan
                            ? 'ezContainer-internal-subscription-plan'
                            : EzString.EMPTY;

                        if (ezBillingFrequency === EzBillingFrequency.ezValueOf(ezSubscriptionCard.subscriptionPlan.billingFrequency) ||
                            EzBillingFrequency.NONE === EzBillingFrequency.ezValueOf(ezSubscriptionCard.subscriptionPlan.billingFrequency)) {
                            ezSubscriptionCards += EzHtml.build`
                                <div
                                    id="${ezSubscriptionCard.ezSubscriptionCardLayoutContainerId}"
                                    class="ezSubscriptions-subscription-pland-card-layoutContainer ${internalPlanClassName}">
                                    <div
                                        id="${ezSubscriptionCard.ezSubscriptionCardContainerId}"
                                        class="ezSubscriptions-subscription-plan-card-container">
                                        ${EzSubscriptionPlansView.ezInstance.ezBuildSubscriptionPlanBox(ezSubscriptionCard)}
                                    </div>
                                    <div
                                        id="${ezSubscriptionCard.ezSubscriptionCardSubscribeButtonContainerId}"
                                        class="ezSubscriptions-subscription-plan-button-container">
                                        ${EzSubscriptionPlansView.ezInstance.ezBuildSelectPlanButton(ezSubscriptionCard)}
                                    </div>
                                </div>`;
                        }
                    }
                }

                return finished(ezSubscriptionCards);
            });
    }

    /**
     * @public @method
     * Builds the subscription plan box UX
     * @param {EzezSubscriptionCard} ezSubscriptionCard
     * @returns {string}
     * Returns HTML for the subscription plan box
     */
    ezBuildSubscriptionPlanBox(ezSubscriptionCard) {
        if (!ezSubscriptionCard) {
            throw new EzBadParamException(
                'ezSubscriptionCard',
                EzSubscriptionPlansView.ezInstance,
                EzSubscriptionPlansView.ezInstance.ezBuildSubscriptionPlanBox);
        }

        let bulletPointsHtml = EzString.EMPTY;

        let subscriptionPlanBoxTitle = EzString.EMPTY;

        let subscriptionPlanBoxDetails = EzString.EMPTY;

        let subscriptionCardTitleIdPrefix = ezSubscriptionCard.ezSubscriptionCardTitleId;

        let showSubscriptionPlanId = ezApi.ezclocker.ezUrlHelper.ezShowIds
            ? EzHtml.build`
                <span
                    id="${subscriptionCardTitleIdPrefix}_SubscriptionPlanId_${ezSubscriptionCard.subscriptionPlan.id}"
                    class="ezText-debug-id ">
                    (${ezSubscriptionCard.subscriptionPlan.id})
                </span>`
            : EzString.EMPTY;

        if (EzObject.isValid(ezSubscriptionCard) && EzObject.isValid(ezSubscriptionCard.ezSubscriptionPlan)) {
            subscriptionPlanBoxTitle = EzHtml.build`
                <div
                    id="${subscriptionCardTitleIdPrefix}_${ezSubscriptionCard.subscriptionPlan.id}"
                    class="accountDataTitle ezSubscriptions-subscription-plan-title-container">
                    <span
                        id="${subscriptionCardTitleIdPrefix}_SubscriptionPlanName_${ezSubscriptionCard.subscriptionPlan.id}">
                        ${ezSubscriptionCard.subscriptionPlan.name}
                    </span>
                    ${showSubscriptionPlanId}
                </div>`;

            let subscriptionCardDetailsIdPrefix = ezSubscriptionCard.ezSubscriptionCardDetailsContainerId;

            let bulletPoints = EzString.isString(ezSubscriptionCard.subscriptionPlan.bulletPointsJson)
                ? EzJson.fromJson(
                    EzString.stringOrDefault(
                        ezSubscriptionCard.subscriptionPlan.bulletPointsJson,
                        '{"items":[]}'))
                : ezSubscriptionCard.subscriptionPlan.bulletPointsJson;

            if (EzObject.isValid(bulletPoints) &&
                EzArray.hasLength(bulletPoints.items)) {
                for (let index = 0; index < bulletPoints.items.length; index++) {
                    let bulletPoint = bulletPoints.items[index];

                    if (EzString.hasLength(bulletPoint)) {
                        let bulletPointId = ezSubscriptionCard.ezGenerateSubscriptionCardBulletPointIdForIndex(index);

                        bulletPointsHtml = EzHtml.build`
                            ${bulletPointsHtml}
                            <li
                                id="${subscriptionCardDetailsIdPrefix}_${bulletPointId}_${ezSubscriptionCard.subscriptionPlan.id}">
                                <span
                                    id="${subscriptionCardDetailsIdPrefix}_${bulletPointId}_${ezSubscriptionCard.subscriptionPlan.id}_Text">
                                    ${bulletPoint}
                                </span>
                            </li>`;
                    }
                }
            }

            subscriptionPlanBoxDetails = EzHtml.build`
                <div
                    id="${subscriptionCardDetailsIdPrefix}_${ezSubscriptionCard.subscriptionPlan.id}"
                    class="ezSubscriptions-subscription-plan-detail-container">
                    <div
                        id="${subscriptionCardDetailsIdPrefix}_${ezSubscriptionCard.subscriptionPlan.id}"
                        class="ezSubscriptions-subscription-plan-detail-description">
                        <span
                            id="${subscriptionCardDetailsIdPrefix}_SubscriptionDescription_${ezSubscriptionCard.subscriptionPlan.id}">
                            ${ezSubscriptionCard.subscriptionPlan.description}
                        </span>
                    </div>
                    <ul
                        id="${subscriptionCardDetailsIdPrefix}_BulletPoints_${ezSubscriptionCard.subscriptionPlan.id}">
                        ${bulletPointsHtml}
                    </ul>
                </div>`;
        }

        return EzHtml.build`
            <div
                id="${ezSubscriptionCard.ezSubscriptionCardLayoutContainerId}"
                class="ezSubscriptions-subscription-plan-layout-container">
                ${subscriptionPlanBoxTitle}
                ${subscriptionPlanBoxDetails}
            </div>`;
    }

    /**
     * @public @method
     * Builds a selected subscription plan button
     * @param {ezSubscriptionCard} ezSubscriptionCard
     * @returns {string}
     */
    ezBuildSelectPlanButton(ezSubscriptionCard) {
        if (!EzObject.isValid(ezSubscriptionCard)) {
            throw new EzBadParamException(
                'ezSubscriptionCard',
                EzSubscriptionPlansView.ezInstance,
                EzSubscriptionPlansView.ezInstance.ezBuildSelectPlanButton);
        }

        let selectPlanButton = EzString.EMPTY;

        let activeEmployerLicense = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployerLicense();

        if (EzObject.isValid(ezSubscriptionCard.subscriptionPlan)) {
            let buttonDisabled = EzBoolean.booleanOrFalse(activeEmployerLicense.canceled)
                ? 'disabled'
                : EzString.EMPTY;

            let title = EzBoolean.booleanOrFalse(activeEmployerLicense.canceled)
                ? 'title="You must wait until you have used the remaining time on your canceled subscription before you can select a new plan."'
                : EzString.EMPTY;

            selectPlanButton = EzHtml.build`
                <button
                    id="${ezSubscriptionCard.ezSubscriptionCardSubscribeButtonId}"
                    data-subscription-plan-id='${ezSubscriptionCard.subscriptionPlan.id}'
                    data-subscription-plan-info-json='${EzJson.toJson(ezSubscriptionCard.subscriptionPlan)}'
                    onclick="ezApi.ezclocker.ezSubscriptionPlansView.ezHandleSubscribeToPlanButtonClick(event)"
                    class="actionButton fullWidth ezSubscriptions-select-plan-button"
                    ${title}
                    ${buttonDisabled}>
                    <span
                        id="${ezSubscriptionCard.ezSubscriptionCardSubscribeButtonId}_SelectDescription">
                        Select the ${ezSubscriptionCard.subscriptionPlan.description}
                    </span>
                </button>`;
        }

        let hideSelectPlanButton = ezSubscriptionCard.subscriptionPlan.id == activeEmployerLicense.subscriptionPlan.id
            ? 'style="display:none;"'
            : EzString.EMPTY;

        return EzHtml.build`
            <div
                id="${ezSubscriptionCard.ezSubscriptionCardSubscribeButtonContainerId}"
                ${hideSelectPlanButton}>
                ${selectPlanButton}
            </div>
            ${EzSubscriptionPlansView.ezInstance.ezBuildSubscribedStatusBoxHTML(ezSubscriptionCard)}`;
    }

    /**
     * @public @method
     * Builds the Subscribed status box html
     * @param {EzSubscriptionCard} ezSubscriptionCard
     * @returns {string}
     */
    ezBuildSubscribedStatusBoxHTML(ezSubscriptionCard) {
        if (null == ezSubscriptionCard) {
            throw new EzBadParamException(
                'ezSubscriptionCard',
                EzSubscriptionPlansView.ezInstance,
                EzSubscriptionPlansView.ezInstance.ezBuildSubscribedStatusBoxHTML);
        }

        let activeEmployerLicense = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployerLicense();

        if (!EzObject.isValid(activeEmployerLicense)) {
            // No active license
            return EzString.EMPTY;
        }

        let subscriptionStatus = EzString.EMPTY;

        if (ezSubscriptionCard.subscriptionPlan.id == activeEmployerLicense.subscriptionPlan.id) {
            if (EzSubscriptionPlanProvider.isFreePlanProvider(activeEmployerLicense.subscriptionProvider)) {
                subscriptionStatus = EzHtml.build`
                    <span
                        id="${ezSubscriptionCard.ezSubscriptionStatusLabelId}">
                        Active
                    </span>`;
            } else if (EzSubscriptionPlanProvider.isFreeTrialPlanProvider(activeEmployerLicense.subscriptionProvider)) {
                subscriptionStatus = EzHtml.build`
                    <span
                        id="${ezSubscriptionCard.ezSubscriptionStatusLabelId}">
                        Active (Free Trial)
                    </span>`;
            } else {
                subscriptionStatus = EzHtml.build`
                    <span
                        id="${ezSubscriptionCard.ezSubscriptionStatusLabelId}">
                        Subscribed
                    </span>`;
            }
        }

        let hideStatusBoxStyle = !EzString.hasLength(subscriptionStatus)
            ? 'style="display:none"'
            : EzString.EMPTY;

        return EzHtml.build`
            <div
                id="EzSubscriptionStatusLayoutContainer"
                class="ezSubscriptions-subscribed-label-container"
                ${hideStatusBoxStyle}>
                <div
                    id="${ezSubscriptionCard.ezSubscriptionStatusContainerId}"
                    class="ezImages-black-check-left-container-18x18">
                    ${subscriptionStatus}
                </div>
            </div>`;
    }

    /**
     * @public @method
     * Displays an error when unable to activate a subscription
     * @param {object} eResponse
     * @param {string|null} em
     */
    ezShowActivateSubscriptionError(eResponse, em) {
        let errorDisplayName = 'EzClocker Subscription Error';

        let errorTextDetails = EzString.em`
            ${errorDisplayName}:
            ${EzString.stringOrEmpty(em)}`;

        let activateSubscriptionErrorIdPrefix = 'EzActivateSubscriptionError';

        let htmlEM = EzString.hasLength(em)
            ? EzHtml.build`
                <p
                    id="${activateSubscriptionErrorIdPrefix}_ProvidedMessage">
                    ${em}
                </p>`
            : EzString.EMPTY;

        let htmlErrorDetails = EzHtml.build`
            <h3
                id="${activateSubscriptionErrorIdPrefix}_DisplayName">
                ${errorDisplayName}
            </h3>
            ${htmlEM}`;


        if (EzObject.isValid(eResponse) && 0 != eResponse.errorCode && -1 != EzErrorCode.ezValues.indexOf(eResponse.errorCode)) {
            let ezErrorCodeInfo = EzErrorCode.ezEnumData(eResponse.errorCode);

            errorDisplayName = ezErrorCodeInfo.ezDisplayName;

            errorTextDetails = EzString.em`
                ${errorTextDetails}
                ${ezErrorCodeInfo.ezTextErrorMessage}
                (Error #${eResponse.errorCode})`;

            htmlErrorDetails = EzHtml.build`
                ${htmlErrorDetails}
                <p
                    id="${activateSubscriptionErrorIdPrefix}_ErrorCodeMessage">
                    ${ezErrorCodeInfo.ezHtmlErrorMessage}
                </p>
                <div
                    id="${activateSubscriptionErrorIdPrefix}_ErrorCode">
                    Error #${eResponse.errorCode}
                </div>`;

            /*
            let ezErrorCodeInfo = EzErrorCode.ezEnumData(EzErrorCode.ERROR_FREE_TRIAL_EXPIRED);

            em = EzString.em`
                [${errorDisplayName}]:
                ${EzString.stringOrEmpty(em)}
                ${ezErrorCodeInfo.ezTextErrorMessage}
                (Error #${eResponse.errorCode})`;
            */
        }

        ezApi.ezclocker.ezLogger.error(
            EzString.em`
                ${errorTextDetails}
                [Error response: ${EzJson.toJson(eResponse)}]`);

        ezApi.ezclocker.ezDialog.ezShowError(
            errorDisplayName,
            htmlErrorDetails);
    }

    /**
     * @static
     * @public @readonly @property
     * Gets the subscribe button element's dataSet key name for HTML data attribute "data-subscription-plan-info-json"
     * @returns {string}
     */
    static get EZDA_subscriptionPlanInfoJson() {
        return "subscriptionPlanInfoJson";
    }

    /**
     * @static
     * @public @readonly @property
     * Gets the subscribe button element's dataSet key name for HTML data attribute "data-subscription-plan-id"
     * @returns {string}
     */static get EZDA_subscriptionPlanId() {
        return "subscriptionPlanId";
    }

    /**
     * @public @method
     * Handles a subscription plan's subscribe to plan button click.
     * @param {object} event
     * Event is from a HTML event hook with event.currentTarget referencing the HTML element who triggered the event.
     */
    ezHandleSubscribeToPlanButtonClick(event) {
        if (!EzObject.isValid(event) || !EzObject.isValid(event?.currentTarget)) {
            throw new EzBadParamException(
                'event',
                EzSubscriptionPlansView.ezInstance,
                EzSubscriptionPlansView.ezInstance.ezHandleSubscribeToPlanButtonClick);
        }

        let buttonElement = event.currentTarget;

        let subscriptionPlanId = EzUx.getDatasetValueAsInt(
            buttonElement.id,
            'subscriptionPlanId');

        if (!EzNumber.isNumber(subscriptionPlanId) || EzNumber.isNaN(subscriptionPlanId)) {
            throw new EzBadStateException(
                'Expected valid number from event.currentTarget\'s data attribute "data-subscription-plan-id".',
                EzString.em`
                    However, the value for event.currentTarget\'s data attribute "data-subscription-plan-id" is undefined, null, or not a number (as a string).
                    [subscriptionPlanId: ${EzObject.isValid(subscriptionPlanId) ? subscriptionPlanId.toString() : 'undefined or null'}]`,
                EzSubscriptionPlansView.ezInstance,
                EzSubscriptionPlansView.ezInstance.ezHandleSubscribeToPlanButtonClick);
        }

        let newSubscriptionPlanInfo = EzUx.getDatasetValueAsJsonObject(
            buttonElement.id,
            'subscriptionPlanInfoJson');

        if (!EzObject.isValid(newSubscriptionPlanInfo) || !EzNumber.isNumber(newSubscriptionPlanInfo?.id)) {
            throw new EzBadStateException(
                'Expected valid JSON from event.currentTarget\'s data attribute "data-subscription-plan-info-json".',
                EzString.em`
                    However, the value for event.currentTarget\'s data attribute "data-subscription-plan-info-json" is undefined, null, or not a JSON string.
                    [subscriptionPlanInfo: ${EzObject.isValid(newSubscriptionPlanInfo) ? EzJson.toJson(newSubscriptionPlanInfo) : 'undefiend or null'}]`,
                EzSubscriptionPlansView.ezInstance,
                EzSubscriptionPlansView.ezInstance.ezHandleSubscribeToPlanButtonClick);
        }

        return EzSubscriptionPlansView.ezInstance.ezConfirmChangeSubscription(newSubscriptionPlanInfo)
            .then(
                () => EzSubscriptionPlansView.ezInstance.ezSwitchSubscriptionPlan(newSubscriptionPlanInfo),
                EzPromise.ignoreReject);
    }

    /**
     * @public @method
     * Prompts the user to confirm a change to their selected subscrption plan.
     * @returns {Promise}
     * Promise.resolve indicates the user confirmed the change.
     * Promise.reject indicates the user cancled the change.
     */
    ezConfirmChangeSubscription(newSubscriptionPlanInfo) {
        let confirmChangeSubscriptionIdPrefix = 'EzConfirmChangeSubscription';

        let activeEmployerLicense = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployerLicense();

        let confirmationTitle;

        let confirmationMessage;

        if (EzBoolean.booleanOrFalse(activeEmployerLicense?.isFreeAccountEzHtml)) {
            if (0 < activeEmployerLicense?.freeTrialDaysLeft) {
                confirmationTitle = 'Please Confirm';

                confirmationMessage = EzHtml.build`
                    Do you wish to switch from the ${ezApi.ezclocker.ezClockerContext.ezGetActiveEmployerLicense().subscriptionPlan.description} to
                    to start or continue your free trial with the ${newSubscriptionPlanInfo.description}?
                    <div
                        id="${confirmChangeSubscriptionIdPrefix}_FreeTrialDaysLeftNote">
                        Note: You currently have ${activeEmployerLicense.freeTrialDaysLeft} left in your free trial.
                    </div>`;
            }
        } else if (0 < activeEmployerLicense?.freeTrialDaysLeft) {
            confirmationTitle = 'Please Confirm Free Trial Plan Change';

            // Free trial
            confirmationMessage = EzHtml.build`
                Do you wish to switch your free trial from the ${ezApi.ezclocker.ezClockerContext.ezGetActiveEmployerLicense().subscriptionPlan.description}
                to the ${newSubscriptionPlanInfo.description}?
                <div
                    id="${confirmChangeSubscriptionIdPrefix}_FreeTrialDaysLeftNote">
                    Note: You currently have ${activeEmployerLicense.freeTrialDaysLeft} left in your free trial.
                </div>`;
        } else {
            // No free trial

            confirmationTitle = 'Please Confirm Subscription Plan Change';

            let fromCurrentPrice;

            if (EzBillingFrequency.NONE === activeEmployerLicense.subscriptionPlan.billingFrequency) {
                fromCurrentPrice = EzHtml.build`
                    from
                    <span
                        class="ezBold">
                        free
                    </span>`
            } else {
                fromCurrentPrice = EzBillingFrequency.MONTHLY === activeEmployerLicense.subscriptionPlan.billingFrequency
                    ? EzHtml.build`
                        from a
                        <span
                            class="ezBold">
                            monthly
                        </span>
                        charge of
                        <span
                            class="ezBold">
                            $${activeEmployerLicense.subscriptionPlan.monthlyFee}
                        </span>`
                    : EzHtml.build`
                        from a
                        <span
                            class="ezBold">
                            yearly
                        </span>
                        charge of
                        <span
                            class="ezBold">
                            $${activeEmployerLicense.subscriptionPlan.yearlyFee}
                        </span>
                        (or $${activeEmployerLicense.subscriptionPlan.yearlyFee / 12} a month billed yearly)`;
            }

            let newPrice;

            if (EzBillingFrequency.NONE === newSubscriptionPlanInfo.billingFrequency) {
                newPrice = EzHtml.build`
                    to
                    <span
                        class="ezBold">
                        free
                    </span>`
            } else {
                newPrice = EzBillingFrequency.MONTHLY === newSubscriptionPlanInfo.billingFrequency
                    ? EzHtml.build`
                    to a
                    <span
                        class="ezBold">
                        monthly
                    </span>
                    charge of
                    <span
                        class="ezBold">
                        $${newSubscriptionPlanInfo.monthlyFee}
                    </span>`
                    : EzHtml.build`
                    to a
                    <span
                        class="ezBold">
                        yearly
                    </span>
                    charge of
                    <span
                        class="ezBold">
                        $${newSubscriptionPlanInfo.yearlyFee}
                    </span>
                    (or $${newSubscriptionPlanInfo.yearlyFee / 12} a month billed yearly)`;
            }

            confirmationMessage = EzHtml.build`
                Do you wish to change your current subscription from the
                ${ezApi.ezclocker.ezClockerContext.ezGetActiveEmployerLicense().subscriptionPlan.description}
                to the ${newSubscriptionPlanInfo.description}?
                <div
                    id="${confirmChangeSubscriptionIdPrefix}_PriceChangeNote">
                    Note: Your subscription fee will change ${fromCurrentPrice} to ${newPrice}.
                </div>`;
        }

        let confirmationDialogContentHtml = EzHtml.build`
            <h3
                id="${confirmChangeSubscriptionIdPrefix}_ContentHeader">
                ${confirmationTitle}
            </h3>
            <p
                id="${confirmChangeSubscriptionIdPrefix}_Confirm_Content">
                ${confirmationMessage}
                <ul
                    id="${confirmChangeSubscriptionIdPrefix}_ContentBullets">
                    <li
                        id="${confirmChangeSubscriptionIdPrefix}_Bullet1">
                        Click
                        <span
                            class="ezBold">
                            OK
                        </span>
                        to confirm the change to the ${newSubscriptionPlanInfo.description}.
                    </li>
                    <li
                        id="${confirmChangeSubscriptionIdPrefix}_Bullet2">
                        Click
                        <span
                            class="ezBold">
                            Cancel
                        </span>
                        to make no changes and continue with the current
                        ${ezApi.ezclocker.ezClockerContext.ezGetActiveEmployerLicense().subscriptionPlan.description}.
                    </li>
                </ul>
            </p>`;

        return EzPromise.promise(
            (confirmed, canceled) => ezApi.ezclocker.ezDialog.ezConfirmationDialog(
                'Confirm Plan Change',
                confirmationDialogContentHtml,
                null,
                800)
                .then(
                    (dialogResult) => 'CANCEL' !== dialogResult.dialogStatus
                        ? confirmed(dialogResult)
                        : canceled(dialogResult)));
    }

    /**
     * @public @method
     * Switches the current subscription plan to the provided newSubscriptionPlanInfo
     * @param {object} newSubscriptionPlanInfo
     */
    ezSwitchSubscriptionPlan(newSubscriptionPlanInfo) {
        if (!EzObject.isValid(newSubscriptionPlanInfo)) {
            throw new EzBadParamException(
                'newSubscriptionPlanInfo',
                EzSubscriptionPlansView.ezInstance,
                EzSubscriptionPlansView.ezInstance.ezSwitchSubscriptionPlan);
        }

        return ezApi.ezclocker.ezAccountSubscriptionActions.ezStartFreeTrialOrSubscribe(newSubscriptionPlanInfo)
            .then(
                // Track subscription in Amplitude if not free
                () => {
                    EzPromise.executeIgnoreResolve(
                        this,
                        EzSubscriptionPlansView.ezInstance.ezUpdateUxState,
                        'EzSubscriptionPlansView.ezSwitchSubscriptionPlan (resolve)');

                    EzSubscriptionPlansView.ezInstance.ezTrackSubscriptionInAmplitude(newSubscriptionPlanInfo.id);
                },
                () => EzPromise.executeIgnoreResolve(
                    this,
                    EzSubscriptionPlansView.ezInstance.ezUpdateUxState,
                    'EzSubscriptionPlansView.ezSwitchSubscriptionPlan (reject)'));
    }

    /**
     * @public @method
     * Tracks a subscription (if not the free subscription) in Amplitude
     */
    ezTrackSubscriptionInAmplitude(newSubscriptionPlanId) {
        if (!EzNumber.isNumber(newSubscriptionPlanId)) {
            throw new EzBadParamException(
                'newSubscriptionPlanId',
                EzSubscriptionPlansView.ezInstance,
                EzSubscriptionPlansView.ezInstance.ezTrackSubscriptionInAmplitude);
        }

        return ezApi.ezclocker.ezSubscriptionApiClient.ezGetEmployerDefaultFreeSubscriptionPlan()
            .then(
                (response) => {
                    if (response.subscriptionPlan.id != newSubscriptionPlanId) {
                        // Track subscriptions if not the free subscription plan id
                        ezApi.ezclocker.ezAnalyticsAndMetrics.ezAmplitudeIntegration.ezTrack(
                            `Subscribed to ${newSubscriptionPlanId}`);
                    }
                },
                (eResponse) => ezApi.ezclocker.ezLogger.error(
                    EzString.em`
                        Failed to determine the default free subscription plan for Employer accounts and therefore could not
                        notify Amplitude integration of subscription.
                        [Error response: ${EzJson.toJson(eResponse)}]`));
    }

    /**
     * @public @method
     * Validated the employee count with the current license.
     * @param {String} newSubscriptionPlanId
     * @returns {Promise}
     */
    ezVerifyEmployeeCount(newSubscriptionPlanId) {
        return EzPromise.promise(
            (resolve, reject) => {
                if (!newSubscriptionPlanId) {
                    return reject(false);
                }

                let newSubscriptionPlan = null;

                let availableSubscriptionPlans = ezApi.ezclocker.ezClockerContext.ezGetSubscriptionContextAvailableSubscriptionPlans();

                let ezBillingFrequency = ezApi.ezclocker.ezClockerContext.ezGetSubscriptionContext().ezBillingFrequency;

                if (!availableSubscriptionPlans || !EzObject.hasProperty(availableSubscriptionPlans, ezBillingFrequency)) {
                    return reject(false);
                }

                availableSubscriptionPlans[ezApi.ezclocker.ezClockerContext.ezGetSubscriptionContext().ezBillingFrequency]
                    .forEach(
                        (subscriptionPlan) => {
                            if (subscriptionPlan.id === newSubscriptionPlanId) {
                                newSubscriptionPlan = subscriptionPlan;
                            }
                        });

                if (!EzObject.isValid(newSubscriptionPlan)) {
                    ezApi.ezclocker.ezLogger.error(`Failed to find a subscription plan with id=${newSubscriptionPlanId}`);

                    return reject(false);
                }

                let activeSubscription = ezApi.ezclocker.ezClockerContext.ezGetSubscriptionContext().activeSubscription;

                if (!EzObject.isValid(activeSubscription)) {
                    ezApi.ezclocker.ezLogger.error('Active subscription is not available');

                    return reject(false);
                }

                if (newSubscriptionPlan.maximumEmployees >= activeSubscription.maximumEmployees) {
                    return resolve(true);
                }

                return EzSubscriptionPlansView.ezInstance.ezPromptToArchiveEmployeesBeforeSubscriptionSwitch(newSubscriptionPlan.maximumEmployees)
                    .then(resolve, reject);
            });
    }

    /**
     * @public @method
     * Prompts the user to archive employees before switching subscriptions because the current employee counts
     * are too hight.
     * @returns {Promise}
     */
    ezPromptToArchiveEmployeesBeforeSubscriptionSwitch(maximumEmployees) {
        // User must archive before switching plans
        return EzPromise.promise(
            (resolve, reject) => {
                return ezApi.ezclocker.ezEmployeeService.getEmployees(
                    ezApi.ezclocker.ezClockerContext.activeEmployer.id,
                    (result) => {
                        if (result.length <= maximumEmployees) {
                            return resolve(true); // good to go
                        }

                        return ezApi.ezclocker.ezDialog.ezOkCancel(
                            'Archive Employees',
                            EzHtml.build`
                                You will downgrade to a plan that only supports up to ${maximumEmployees}
                                employees. However, your account currently has ${result.length} employees.
                                <p
                                    id="EzDowngradeError_FixInstructions">
                                    In order to downgrade your subscription you will first need to archive enough
                                    employees so that your total employee count is less than or equal to
                                    ${maximumEmployees}.
                                </p>
                                <p
                                    id="EzDowngradeError_ContinueInstructions">
                                    Click the OK button below to visit your Employee Archive screen and archive the
                                    employees you no longer need. Once you are done you can return to this account page
                                    and downgrade your subscription plan.
                                </p>`,
                            650,
                            440)
                            .then(
                                () => {
                                    reject(false);

                                    ezApi.ezclocker.ezNavigation.ezNavigateToEmployeeArchive();

                                    // No need to return since the page will navigate away here
                                });
                    },
                    (em) => {
                        ezApi.ezclocker.ezLogger.error(em);

                        return ezApi.ezclocker.ezDialog.ezShowError(
                            'Subscription Error',
                            EzHtml.build`
                                <p
                                    id="SubscriptionError_Message">
                                    EzClocker is unable to update your subscription plan at this time. ${em}
                                </p>
                                <p
                                    id="SubscriptionError_FixInstructions">
                                    You can try selecting the plan again. If you continue to see this error please contact
                                    ezClocker support at <a href='mailto:support@ezclocoker.com'>support@ezclocker.com</a>
                                    and request support to diagnose the error and provide a solution.
                                </p>
                                Thank You!`)
                            .then(
                                () => reject(false));
                    }
                );
            });
    }

    /**
     * @public @method
     * Disables all the subscription buttons
     */
    ezDisableSubscriptionButtons() {
        for (let availableSubscriptionCard of EzSubscriptionPlansView.ezInstance.ezAvailableSubscriptionCards.ezAllSubscriptionCardsList) {
            ezApi.ezclocker.ezUxState.ezApplyElementState(
                new EzUxElementState(
                    availableSubscriptionCard.ezSubscriptionCardSubscribeButtonId,
                    // Visible
                    true,
                    // Enabled
                    false,
                    // Remove
                    false,
                    // stateModifiedCallback
                    null,
                    // enabledHint
                    `Select the ${availableSubscriptionCard.subscriptionPlan.name} plan`,
                    // Disabled hint
                    'Your canceled subscription must expire before you can select a different plan.'));
        }
    }

    /**
     * @public @method
     * Enables all the subscription buttons
     */
    ezEnableSubscriptionButtons() {
        for (let availableSubscriptionCard of EzSubscriptionPlansView.ezInstance.ezAvailableSubscriptionCards.ezAllSubscriptionCardsList) {
            ezApi.ezclocker.ezUxState.ezApplyElementState(
                new EzUxElementState(
                    availableSubscriptionCard.ezSubscriptionCardSubscribeButtonId,
                    // Visible
                    true,
                    // Enabled
                    true,
                    // Remove
                    false,
                    // stateModifiedCallback
                    null,
                    // enabledHint
                    `Select the ${availableSubscriptionCard.subscriptionPlan.name} plan`,
                    // Disabled hint
                    'Your canceled subscription must expire before you can select a different plan.'));
        }
    }

    /**
     * @public @method
     * Hides all the subscription buttons
     */
    ezHideSubscriptionButtons() {
        for (let availableSubscriptionCard of EzSubscriptionPlansView.ezInstance.ezAvailableSubscriptionCards.ezAllSubscriptionCardsList) {
            ezApi.ezclocker.ezUxState.ezApplyElementState(
                new EzUxElementState(
                    availableSubscriptionCard.ezSubscriptionCardSubscribeButtonId,
                    false,
                    false,
                    false,
                    null,
                    null,
                    null));
        }
    }

    /**
     * @public @method
     * Hides all the subscription buttons
     */
    ezShowSubscriptionButtons() {
        for (let availableSubscriptionCard of EzSubscriptionPlansView.ezInstance.ezAvailableSubscriptionCards.ezAllSubscriptionCardsList) {
            ezApi.ezclocker.ezUxState.ezApplyElementState(
                new EzUxElementState(
                    availableSubscriptionCard.ezSubscriptionCardSubscribeButtonId,
                    true,
                    true,
                    false,
                    null,
                    null,
                    null));
        }
    }

    /**
     * @protected @method
     * Handles the EzMonthYearToggleSwitch onchange event.
     */
    ezHandleMonthlyToggleButtonClick() {
        EzSubscriptionPlansView.ezInstance.ezDeactivateYearlyToggle();

        ezApi.ezclocker.ezClockerContext.ezSubscriptionContextSubscriptionPlanMode = EzBillingFrequency.MONTHLY;

        EzSubscriptionPlansView.ezInstance.ezActivateMonthlyToggle();
    }

    /**
     * @protected @method
     * Handles the EzMonthYearToggleSwitch onchange event.
     */
    ezHandleYearlyToggleButtonClick() {
        EzSubscriptionPlansView.ezInstance.ezDeactivateMonthlyToggle();

        ezApi.ezclocker.ezClockerContext.ezSubscriptionContextSubscriptionPlanMode = EzBillingFrequency.YEARLY;

        EzSubscriptionPlansView.ezInstance.ezActivateYearlyToggle();
    }

    /**
     * @public @method
     * Handles the onSubscriptionContextAvailablePlansModeChanged event
     */
    ezHandleOnSubscriptionContextAvailablePlansModeChanged() {
        if (EzBoolean.isTrue(EzSubscriptionPlansView.ezInstance.ezSubscriptionPlansViewReadyStates.isReady)) {
            EzPromise.executeIgnoreResolve(
                this,
                EzSubscriptionPlansView.ezInstance.ezUpdateUxState,
                'EzSubscriptionPlansView.ezHandleOnSubscriptionContextAvailablePlansModeChanged');
        }
    }

    /**
     * @protected @method
     * Handles the  onSubscriptionContextAvailablePlansReady and onSubscriptionContextAvailablePlansChanged events
     */
    ezHandleOnSubscriptionContextAvailablePlansReadyChanged() {
        EzSubscriptionPlansView.ezInstance.ezSubscriptionPlansViewReadyStates.ezSubscriptionContextAvailablePlansReady = true;

        if (EzBoolean.isTrue(EzSubscriptionPlansView.ezInstance.ezSubscriptionPlansViewReadyStates.isReady)) {
            EzSubscriptionPlansView.ezInstance.ezSelectYearlyMonthlyToggleButtonForActiveSubscription()
                .then(
                    () => EzPromise.executeIgnoreResolve(
                        this,
                        EzSubscriptionPlansView.ezInstance.ezUpdateUxState,
                        'EzSubscriptionPlansView.ezHandleOnSubscriptionContextAvailablePlansReadyChanged'));
        }
    }

    /**
     * @protected @method
     * Handles the EzClockerContextEventName.onActiveEmployerChanged event
     */
    ezHandleOnActiveEmployerChanged() {
        if (EzBoolean.isTrue(EzSubscriptionPlansView.ezInstance.ezSubscriptionPlansViewReadyStates.isReady)) {
            EzPromise.executeIgnoreResolve(
                this,
                EzSubscriptionPlansView.ezInstance.ezUpdateUxState,
                'EzSubscriptionPlansView.ezHandleOnActiveEmployerChanged');
        }
    }

    /**
     * @protected @method
     * Handles the onSubscriptionContextActiveSubscriptionReadyChanged
     */
    ezHandleOnSubscriptionContextActiveSubscriptionReadyChanged() {
        EzSubscriptionPlansView.ezInstance.ezSubscriptionPlansViewReadyStates.ezSubscriptionContextActiveSubscriptionReady = true;

        if (EzBoolean.isTrue(EzSubscriptionPlansView.ezInstance.ezSubscriptionPlansViewReadyStates.isReady)) {
            EzSubscriptionPlansView.ezInstance.ezSelectYearlyMonthlyToggleButtonForActiveSubscription()
                .then(
                    () => EzPromise.executeIgnoreResolve(
                        this,
                        EzSubscriptionPlansView.ezInstance.ezUpdateUxState,
                        'EzSubscriptionPlansView.ezHandleOnSubscriptionContextActiveSubscriptionReadyChanged'));
        }
    }

    /**
     * @protected @method
     * Handles the OnSubscribeDialogSuccessEvent
     */
    ezHandleOnSubscriptionDialogSubscribeSuccessError() {
        ezApi.ezclocker.ezAccountSubscriptionActions.ezRefreshLicenseAndBillingInfo()
            .then(
                () => EzPromise.executeIgnoreResolve(
                    this,
                    EzSubscriptionPlansView.ezInstance.ezUpdateUxState,
                    'EzSubscriptionPlansView.ezHandleOnSubscriptionDialogSubscribeSuccessError (resolve)'),
                () => EzPromise.executeIgnoreResolve(
                    this,
                    EzSubscriptionPlansView.ezInstance.ezUpdateUxState,
                    'EzSubscriptionPlansView.ezHandleOnSubscriptionDialogSubscribeSuccessError (reject)'));
    }

    /**
     * @protected @method
     * Handles the add feature package button click
     * @param {string} featurePackageId
     * A valid enum property value from EzFeaturePackageId
     */
    ezHandleAddFeaturePackageButtonClick(featurePackageId) {
        if (!EzString.hasLength(featurePackageId)) {
            throw new EzBadParamException(
                'featurePackageId',
                EzSubscriptionPlansView.ezInstance,
                EzSubscriptionPlansView.ezInstance.ezHandleAddFeaturePackageButtonClick);
        }

        /**
         * @protected @method
         * Handles add feature package errors
         * @param {object} eResponse
         */
        function handleAddFeaturePackageErrorResponse(eResponse) {
            let em = 'Encountered an unexpected error while adding a feature package.';

            if (!EzObject.isValid(eResponse)) {
                eResponse = {
                    errorCode: 500,
                    message: em
                };
            } else {
                em = EzString.stringOrDefault(em, em);
            }

            let errorDetails = {
                featurePackageId: featurePackageId,
                errorResponse: EzObject.assignOrNull(eResponse)
            };

            let errorMessage = EzString.em`
                EzClocker was unable to add the ${EzFeaturePackageId.ezEnumData(featurePackageId).name} at this time
                due to the following error: ${em}`;

            let emailSupportInfo = ezApi.ezclocker.ezDialog.ezCreateSupportContactInfo(
                `Help with Error when Trying to Add the ${EzFeaturePackageId.ezEnumData(featurePackageId).name}!`,
                errorMessage);

            errorDetails.errorMessage = errorMessage;

            ezApi.ezclocker.ezLogger.error(
                EzString.em`
                    Failed to add feature package to your existing subscription due to the following error: ${em}.
                    [Error details: ${EzJson.toJson(errorDetails)}]`);

            switch (eResponse.errorCode) {
                case 400:
                case 1413:
                case 1414:
                case 1415:
                case 1416:
                case 1417:
                case 1418:
                    return ezApi.ezclocker.ezDialog.ezShowError(
                        'Add Feature Package Error',
                        eResponse.message)
                        .then(
                            () => ezApi.ezclocker.ezClockerContext.ezRefreshSubscriptionContextActiveSubscription()
                                .then(
                                    EzPromise.ignoreResult,
                                    (eResponse) => EzPromise.logReject(
                                        eResponse,
                                        EzString.em`
                                            Failed to refresh the subscription context's active subscription
                                            due to the following error: ${eResponse.message}`)));
                default:
                    return ezApi.ezclocker.ezDialog.ezShowServiceResponseErrorDialog(
                        'Add Feature Package Error',
                        EzHtml.build`
                            <p
                                id="${EzSubscriptionPlansView.ezApiName}_ErrorMessage">
                                ${errorMessage}
                            </p>
                            <div
                                id="${EzSubscriptionPlansView.ezApiName}_EmailSupportInfo">
                                ${emailSupportInfo}
                            </div>`,
                        errorDetails)
                        .then(
                            () => ezApi.ezclocker.ezClockerContext.ezRefreshSubscriptionContextActiveSubscription()
                                .then(
                                    EzPromise.ignoreResult,
                                    (eResponse) => EzPromise.logReject(
                                        eResponse,
                                        EzString.em`
                                            Failed to refresh the subscrition context's active subscription
                                            due to the following error: ${eResponse.message}`)));
            }
        }

        return ezApi.ezclocker.ezAccountSubscriptionActions.ezSubscribeToFeaturePackage(featurePackageId)
            .then(
                () => {
                    return EzSubscriptionPlansView.ezInstance.ezUpdateUxState('EzSubscriptionPlansView.ezHandleAddFeaturePackageButtonClick')
                        .then(
                            () => ezApi.ezclocker.ezDialog.ezShowOK(
                                'Successfully Added Feature Package',
                                `The ${EzFeaturePackageId.ezEnumData(featurePackageId).name} was successfully added to your subscription.`)
                                .then(EzPromise.ignoreFinished));
                },
                handleAddFeaturePackageErrorResponse);
    }

    /**
     * @protected @method
     * Handles the cancel feature package button click event
     * @param {string} featurePackageId
     * A valid enum property value from EzFeaturePackageId
     */
    ezHandleCancelFeaturePackageButtonClick(featurePackageId) {
        if (!EzString.hasLength(featurePackageId)) {
            throw new EzBadParamException(
                'featurePackageId',
                EzSubscriptionPlansView.ezInstance,
                EzSubscriptionPlansView.ezInstance.ezHandleCancelFeaturePackageButtonClick);
        }

        /**
         * @protected @method
         * Handles cancel feature package errors
         * @param {object} eResponse
         */
        function handleCancelFeaturePackageErrorResponse(eResponse) {
            let em = 'Encountered an unexpected error while canceling a feature package.';

            if (!EzObject.isValid(eResponse)) {
                eResponse = {
                    errorCode: 500,
                    message: em
                };
            } else {
                em = EzString.stringOrDefault(em, em);
            }

            let errorDetails = EzJson.toJson({
                featurePackageId: featurePackageId,
                errorResponse: EzObject.assignOrNull(eResponse)
            });

            ezApi.ezclocker.ezLogger.error(
                EzString.em`
                    Failed to cancel the ${EzFeaturePackageId.ezEnumData(featurePackageId).name}
                    due to the following error: ${em}.
                    [Error details: ${errorDetails}]`);

            return ezApi.ezclocker.ezDialog.ezShowErrorWithDetails(
                'Add Feature Package Error',
                EzHtml.build`
                    <p>
                        EzClocker is unable to add the ${EzFeaturePackageId.ezEnumData(featurePackageId).name} at this time
                        due to the following error: ${em}
                    </p>
                    ${ezApi.ezclocker.ezDialog.ezCreateSupportContactInfo('Help with adding feature package error', errorDetails)}`,
                errorDetails)
                .then(
                    () => ezApi.ezclocker.ezClockerContext.ezRefreshSubscriptionContextActiveSubscription()
                        .then(
                            EzPromise.ignoreResult,
                            (eResponse) => EzPromise.logReject(
                                eResponse,
                                EzString.em`
                                    Failed to refresh the subscrition context's active subscription
                                    due to the following error: ${eResponse.message}`)));
        }

        return ezApi.ezclocker.ezAccountSubscriptionActions.ezCancelFeaturePackageSubscription(featurePackageId)
            .then(
                (response) => 0 == response.errorCode
                    ? ezApi.ezclocker.ezDialog.ezShowOK(
                        'Successfully Canceled Feature Package',
                        `The ${EzFeaturePackageId.ezEnumData(featurePackageId).name} was successfully canceled and removed from your subscription.`)
                        .then(
                            () => {
                                if (!EzObject.isValid(response.validLicenseResponse)) {
                                    return ezApi.ezclocker.ezClockerContext.ezRefreshSubscriptionContextActiveSubscription()
                                        .then(
                                            EzPromise.ignoreResult,
                                            (eResponse) => EzPromise.logReject(
                                                eResponse,
                                                EzString.em`
                                                    Failed to refresh the subscrition context's active subscription
                                                    due to the following error: ${eResponse.message}`));
                                }

                                ezApi.ezclocker.ezClockerContext.ezSetSelectedEmployerAccountLicense(response.validLicenseResponse);

                                return EzPromise.executeIgnoreResolve(
                                    this,
                                    EzSubscriptionPlansView.ezInstance.ezUpdateUxState,
                                    'EzSubscriptionPlansView.ezHandleCancelFeaturePackageButtonClick');
                            })
                    : handleCancelFeaturePackageErrorResponse(response),
                handleCancelFeaturePackageErrorResponse);
    }

    /**
     * @protected @method
     * Handles the EzClockerContextEventName.onSelectedEmployerLicenseUpdated and EzClockerContextEventName.onSelectedEmployerLicenseReady
     * events from EzClockerContext
     */
    ezHandleOnSelectedEmployerLicenseReadyUpdated() {
        EzSubscriptionPlansView.ezInstance.ezSubscriptionPlansViewReadyStates.ezSelectedEmployerLicenseReady = true;

        if (EzBoolean.isTrue(EzSubscriptionPlansView.ezInstance.ezSubscriptionPlansViewReadyStates.isReady)) {
            EzPromise.executeIgnoreResolve(
                this,
                EzSubscriptionPlansView.ezInstance.ezUpdateUxState,
                'EzSubscriptionPlansView.ezHandleOnSelectedEmployerLicenseReadyUpdated');
        }
    }

    /**
     * @protected @method
     * Activates the monthly toggle
     */
    ezActivateMonthlyToggle() {
        ezApi.ezclocker.ezUi.ezAddElementClass(
            EzSubscriptionPlansView.ezInstance.ezIds.buttons.ezMonthlyToggleButtonId,
            'ezButtons-toggle-button-large-selected');
    }

    /**
     * @protected @method
     * De-activates the monthly toggle
     */
    ezDeactivateMonthlyToggle() {
        ezApi.ezclocker.ezUi.ezRemoveElementClass(
            EzSubscriptionPlansView.ezInstance.ezIds.buttons.ezMonthlyToggleButtonId,
            'ezButtons-toggle-button-large-selected');
    }

    /**
     * @protected @method
     * Activates the yearly toggle
     */
    ezActivateYearlyToggle() {
        ezApi.ezclocker.ezUi.ezAddElementClass(
            EzSubscriptionPlansView.ezInstance.ezIds.buttons.ezYearlyToggleButtonId,
            'ezButtons-toggle-button-large-selected');
    }

    /**
     * @protected @method
     * De-activates the monthly toggle
     */
    ezDeactivateYearlyToggle() {
        ezApi.ezclocker.ezUi.ezRemoveElementClass(
            EzSubscriptionPlansView.ezInstance.ezIds.buttons.ezYearlyToggleButtonId,
            'ezButtons-toggle-button-large-selected');
    }

    /**
     * @public @method
     * Refreshes the subscription information
     * @returns {Promise.resolve}
     */
    ezUpdateFeaturePackagesUX() {
        return EzPromise.asyncAction(
            (finished) => EzSubscriptionPlansView.ezInstance.ezBuildAvailableFeaturePackagesHtml()
                .then(
                    (availableFeaturePackagesHtml) => {
                        ezApi.ezclocker.ezUi.ezSetContent(
                            `${EzSubscriptionPlansView.ezInstance.ezIds.containers.ezSubscriptionPlansContainerId}_FeaturePackagesContainer`,
                            EzString.stringOrEmpty(availableFeaturePackagesHtml));

                        ezApi.ezclocker.ezSubscriptionInfoViewController.ezApplySubscriptionUxState();

                        return finished();
                    }));

    }

    /**
     * @public @method
     * Activates either the monthly or yearly subscription toggle button based upon the billing frequency of the active subscription.
     * @returns {Promise.resolve}
     */
    ezSelectYearlyMonthlyToggleButtonForActiveSubscription() {
        return EzPromise.async(
            (finished) => {
                let activeEmployerLicense = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployerLicense();

                if (!EzObject.isValid(activeEmployerLicense) || !EzObject.isValid(activeEmployerLicense.subscriptionPlan)) {
                    // Active subscription not available yet
                    return finished();
                }

                if (!EzString.hasLength(activeEmployerLicense.subscriptionPlan.billingFrequency)) {
                    activeEmployerLicense.subscriptionPlan.billingFrequency = EzBillingFrequency.MONTHLY;
                }

                if (EzBillingFrequency.NONE === activeEmployerLicense.subscriptionPlan.billingFrequency.toUpperCase() ||
                    EzBillingFrequency.YEARLY === activeEmployerLicense.subscriptionPlan.billingFrequency.toUpperCase()) {
                    ezApi.ezclocker.ezClockerContext.ezSubscriptionContextSubscriptionPlanMode = EzBillingFrequency.YEARLY;

                    EzSubscriptionPlansView.ezInstance.ezDeactivateMonthlyToggle();

                    EzSubscriptionPlansView.ezInstance.ezActivateYearlyToggle();

                    EzSubscriptionPlansView.ezInstance.ezHandleYearlyToggleButtonClick();

                    return finished();
                }

                // Default MONTHLY
                // case EzBillingFrequency.SUPPORT_MONTHLY:
                // case EzBillingFrequency.MONTHLY:
                /* Not yet supported
                case EzBillingFrequency.QUARTERLY:
                case EzBillingFrequency.WEEKLY:
                case EzBillingFrequency.DAILY:
                case EzBillingFrequency.ONE_TIME:
                case EzBillingFrequency.SUPPORT_YEARLY:
                case EzBillingFrequency.SUPPORT_QUARTERLY:
                case EzBillingFrequency.SUPPORT_WEEKLY:
                case EzBillingFrequency.SUPPORT_DAILY:
                case EzBillingFrequency.SUPPORT_ONE_TIME:
                case EzBillingFrequency.SUPPORT:
                */
                ezApi.ezclocker.ezClockerContext.ezSubscriptionContextSubscriptionPlanMode = EzBillingFrequency.MONTHLY;

                EzSubscriptionPlansView.ezInstance.ezDeactivateYearlyToggle();

                EzSubscriptionPlansView.ezInstance.ezActivateMonthlyToggle();

                EzSubscriptionPlansView.ezInstance.ezHandleMonthlyToggleButtonClick();

                return finished();
            });
    }

    /**
     * @public @met.hod
     * Updates the subscription UX
     * @param {undefined|null|string} calledFrom
     * Optional name of who called ezUpdateUxState method
     * @returns {Promise.resolve}
     */
    ezUpdateUxState(calledFrom) {
        /*
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            ENGINEERING NOTES
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            First Page Load Call to ezUpdateUxState Order:
                Called from EzSubscriptionPlansView.ezHandleOnEzSubscriptionPlansViewStateReady
                Called from EzSubscriptionPlansView.ezHandleOnSubscriptionContextAvailablePlansModeChanged
                Called from EzSubscriptionPlansView.ezHandleOnSubscriptionContextAvailablePlansModeChanged
                Called from EzSubscriptionPlansView.ezHandleOnSubscriptionContextAvailablePlansModeChanged
                Called from EzSubscriptionPlansView.ezHandleOnSubscriptionContextAvailablePlansModeChanged
                Called from EzSubscriptionPlansView.ezHandleOnSubscriptionContextAvailablePlansModeChanged
                Called from EzSubscriptionPlansView.ezHandleOnSubscriptionContextAvailablePlansReadyChanged
                Called from EzSubscriptionPlansView.ezHandleOnSubscriptionContextActiveSubscriptionReadyChanged
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            Change Subscription (Free Trial) Call to ezUpdateUxState Order:
                Called from EzSubscriptionPlansView.ezHandleOnSubscriptionContextAvailablePlansModeChanged
                Called from EzSubscriptionPlansView.ezHandleOnSubscriptionContextAvailablePlansModeChanged
                Called from EzSubscriptionPlansView.ezHandleOnSelectedEmployerLicenseReadyUpdated
                Called from EzSubscriptionPlansView.ezHandleOnSubscriptionContextActiveSubscriptionReadyChanged
                Called from EzSubscriptionPlansView.ezHandleSubscribeToPlanButtonClick (tracking resolve)
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        */
        if (EzString.hasLength(calledFrom)) {
            ezApi.ezclocker.ezLogger.debug(`[EzSubscriptionPlansView.ezUpdateUxState: Called from ${calledFrom}]`);
        }

        return EzPromise.asyncAction(
            (finished) => {
                if (EzObject.isValid(ezApi.ezclocker.ezClockerContext.ezAvailableSubscriptionPlansInfo)) {
                    // Subscription plans available to render
                    EzSubscriptionPlansView.ezInstance.ezRenderSubscriptionPlans();

                    return EzSubscriptionPlansView.ezInstance.ezUpdateFeaturePackagesUX()
                        .then(
                            () => ezApi.ezclocker.ezSubscriptionInfoViewController.ezUpdateUxState()
                                .then(finished));
                } else {
                    // Does not have subscription plan data to render yet
                    return ezApi.ezclocker.ezSubscriptionInfoViewController.ezUpdateUxState()
                        .then(finished);
                }
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
        return 'ezSubscriptionPlansView';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzSubscriptionPlansView_Ready'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzSubscriptionPlansView}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzSubscriptionPlansView.ezApiName])
        ? globalThis.ezApi.ezclocker[EzSubscriptionPlansView.ezApiName]
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzSubscriptionPlansView}
     */
    static get ezInstance() {
        return EzSubscriptionPlansView.#ezInstance;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzSubscriptionPlansView} instance
     */
    static set ezInstance(instance) {
        if (null != EzSubscriptionPlansView.#ezInstance) {
            throw new Error('EzSubscriptionPlansView\'s singleton instance is already reigstered with EzApi.');
        }

        EzSubscriptionPlansView.#ezInstance = instance;
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
    static #ezApiRegistrationState = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzSubscriptionPlansView.ezApiName])
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
        return EzSubscriptionPlansView.#ezApiRegistrationState;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzSubscriptionPlansView.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzSubscriptionPlansView.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzAnalyticsAndMetrics.ezApiName] &&
            globalThis.ezApi.ezclocker[EzAnalyticsAndMetrics.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzClockerContextEventName.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerContextEventName.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUxState.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUxState.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUrlHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUrlHelper.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzAccountSubscriptionActions.ezApiName] &&
            globalThis.ezApi.ezclocker[EzAccountSubscriptionActions.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzSubscriptionDialog.ezApiName] &&
            globalThis.ezApi.ezclocker[EzSubscriptionDialog.ezApiName].ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzSubscriptionPlansView.ezInstance &&
            EzRegistrationState.REGISTERED === EzSubscriptionPlansView.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzSubscriptionPlansView.#ezCanRegister && !EzSubscriptionPlansView.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzSubscriptionPlansView, EzSubscriptionPlansView.ezApiName);
        }

        return EzSubscriptionPlansView.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzSubscriptionPlansView.ezApiName
     *     2) Property getter EzSubscriptionPlansView.ezEventNames
     *     3) Property getter EzSubscriptionPlansView.ezInstance
     *     4) Property setter EzSubscriptionPlansView.ezInstance
     *     5) Property getter EzSubscriptionPlansView.ezApiRegistrationState
     *     6) Property setter EzSubscriptionPlansView.ezApiRegistrationState
     *     7) Property getter EzSubscriptionPlansView.#ezCanRegister
     *     8) Property getter EzSubscriptionPlansView.#ezIsRegistered
     *     9) Method EzSubscriptionPlansView.#ezRegistrator()
     */
    static {
        if (!EzSubscriptionPlansView.#ezIsRegistered) {
            EzSubscriptionPlansView.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzSubscriptionPlansView.#ezRegistrator()) {
                document.addEventListener(
                    EzSubscriptionPlansView.ezOnEzApiReadyEventName,
                    EzSubscriptionPlansView.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzSubscriptionPlansView.#ezRegistrator);

                document.addEventListener(
                    EzAnalyticsAndMetrics.ezEventNames.onReady,
                    EzSubscriptionPlansView.#ezRegistrator);

                document.addEventListener(
                    EzClockerContextEventName.ezEventNames.onReady,
                    EzSubscriptionPlansView.#ezRegistrator);

                document.addEventListener(
                    EzClockerContext.ezEventNames.onReady,
                    EzSubscriptionPlansView.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzSubscriptionPlansView.#ezRegistrator);

                document.addEventListener(
                    EzUxState.ezEventNames.onReady,
                    EzSubscriptionPlansView.#ezRegistrator);

                document.addEventListener(
                    EzUrlHelper.ezEventNames.onReady,
                    EzSubscriptionPlansView.#ezRegistrator);

                document.addEventListener(
                    EzAccountSubscriptionActions.ezEventNames.onReady,
                    EzSubscriptionPlansView.#ezRegistrator);

                document.addEventListener(
                    EzSubscriptionDialog.ezEventNames.onReady,
                    EzSubscriptionPlansView.#ezRegistrator);
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

import {
    EzException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzString,
    EzUrl,
    EzPromise,
    EzArray
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzSubscriptionFeaturePackage } from '/ezlibrary/entities/EzSubscriptionFeaturePackage.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';

/**
 * @class
 * @extends { EzClass }
 * @description
 * Description of what class is for here :)
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzSubscriptionApiClient } from '/ezlibrary/api_clients/EzSubscriptionApiClient.js';
 * ---------------------------------------------------------------------------
 * Ready Check:
 *     globalThis.ezApi.ezclocker[EzSubscriptionApiClient.ezApiName] &&
 *     globalThis.ezApi.ezclocker[EzSubscriptionApiClient.ezApiName].ready
 * ---------------------------------------------------------------------------
 * Listen for Ready Event:
 *     document.addEventListener(
 *         EzSubscriptionApiClient.ezEventNames.onReady,
 *         this.#ezRegistrator);
 * ---------------------------------------------------------------------------
 * Singleton Instance Reference:
 *     ezApi.ezclocker.ezSubscriptionApiClient
 * ---------------------------------------------------------------------------
 */
export class EzSubscriptionApiClient extends EzClass {
    /**
     * @public @readonly @property
     * Returns the root URI of the Subscriptions API
     * @returns {string}
     */
    get ezApiRootUri() {
        return ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl('subscriptions', 'v1');
    }

    /**
     * @protected @method
     * Initializes EzSubscriptionApiClient
     * @returns {EzSubscriptionApiClient}
     */
    ezInit() {
        return EzSubscriptionApiClient.ezInstance;
    }

    /**
     * @public @method
     * Gets the available Subscription Feature Package entities array
     * Transforms the result entities into EzSubscriptionFeaturePackage objects before returning.
     * @returns {Promise}
     * Entity returned: {
     *     errorCode: <number>,
     *     message: <string>,
     *     subscriptionFeaturePackages: <array>
     * }
     */
    ezGetAvailableSubscriptionFeaturePackagesArray() {
        return EzPromise.promise(
            (resolve, reject) => ezApi.ezclocker.ezSubscriptionApiClient.ezGetAvailableSubscriptionFeaturePackages()
                .then(
                    (response) => {
                        let subscriptionFeaturePackages = [];

                        if (EzArray.arrayHasLength(response.entities)) {
                            for (let subscriptionFeaturePackage of response.entities) {
                                subscriptionFeaturePackages.push(new EzSubscriptionFeaturePackage(subscriptionFeaturePackage));
                            }
                        }

                        return resolve({
                            errorCode: 0,
                            message: 'Success',
                            subscriptionFeaturePackages: subscriptionFeaturePackages
                        });
                    },
                    (eResponse) => reject({
                        errorCode: eResponse.errorCode,
                        message: eResponse.message,
                        subscriptionFeaturePackages: []
                    })));
    }

    /**
     * @public @method
     * WARNING: This method ASSUMES it is for a employer account and NOT a personal account.
     * Obtains the available feature packages from the API
     * GET: /_api/v1/subscriptions/feature-packages
     * It is recommended to call ezApi.ezclocker.ezSubscriptionApiClient.ezGetAvailableSubscriptionFeaturePackagesArray()
     * instead of this method as it will return the array of subscription feature packages as
     * EzSubscriptionFeaturePacakge objects instead of a simple JSON object.
     * @returns {Promise}
     * Entity returned: {
     *     errorCode: <number>,
     *     message: <string>,
     *     entities: <null|array>
     * }
     * @deprecated
     * Migrate to one of the followign:
     *  1) ezApi.ezclocker.ezSubscriptionApiClient.ezGetAvailableSubscriptionFeaturePackagesArray() (recommended)
     *  2) ezApi.ezclocker.ezSubscriptionApiClient.ezGetAvailableEmployerSubscriptionFeaturePackages()
     */
    ezGetAvailableSubscriptionFeaturePackages() {
        return EzSubscriptionApiClient.ezInstance.ezGetAvailableEmployerSubscriptionFeaturePackages();
    }

    /**
     * @public @method
     * Obtains the available feature packages from the API
     * GET: /_api/v1/subscriptions/feature-packages
     * It is recommended to call ezApi.ezclocker.ezSubscriptionApiClient.ezGetAvailableSubscriptionFeaturePackagesArray()
     * instead of this method as it will return the array of subscription feature packages as
     * EzSubscriptionFeaturePacakge objects instead of a simple JSON object.
     * @returns {Promise}
     * Entity returned: {
     *     errorCode: <number>,
     *     message: <string>,
     *     entities: <null|array>
     * }
     * @deprecated
     * Migrate to:
     *  ezApi.ezclocker.ezSubscriptionApiClient.ezGetAvailableSubscriptionFeaturePackagesArray()
     */
    ezGetAvailableEmployerSubscriptionFeaturePackages() {
        return ezApi.ezclocker.ezHttpHelper.ezGet(
            EzUrl.build`
                ${EzSubscriptionApiClient.ezInstance.ezApiRootUri}
                /feature-packages`)
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);
    }

    /**
     * @public @method
     * Gets the LicenseManagerConfiguration from the EzClocker api
     * @returns {Promise}
     */
    ezGetLicenseManagerConfiguration() {
        return ezApi.ezclocker.ezHttpHelper.ezGet(
            EzUrl.build`
                ${EzSubscriptionApiClient.ezInstance.ezApiRootUri}
                /license-configuration`)
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);
    }

    /**
     * @public @method
     * WARNING: This method ASSUMES it is for a employer account and NOT a personal account.
     * GET: /_api/v1/subscriptions/employer/plans/available
     * @returns {Promise}
     * Migrate to:
     *  ezApi.ezclocker.ezSubscriptionApiClient.ezGetAvailableEmployerSubscriptionPlans()
     */
    ezGetAvailableSubscriptionPlans() {
        return EzSubscriptionApiClient.ezInstance.ezGetAvailableEmployerSubscriptionPlans();
    }

    /**
     * @public @method
     * GET: /_api/v1/subscriptions/employer/plans/available
     * @returns {Promise}
     */
    ezGetAvailableEmployerSubscriptionPlans() {
        return ezApi.ezclocker.ezHttpHelper.ezGet(
            EzUrl.build`
                ${EzSubscriptionApiClient.ezInstance.ezApiRootUri}
                /employer/plans/available`)
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);
    }

    /**
     * @public @method
     * WARNING: This method ASSUMES it is for a employer account and NOT a personal account.
     * GET: /_api/v1/subscriptions/employer/plans/active
     * @returns {Promise}
     * @deprecated
     * Migrate to:
     *  ezApi.ezclocker.ezSubscriptionApiClient.ezGetActiveEmployerSubscriptionPlans()
     */
    ezGetActiveSubscriptionPlans() {
        return EzSubscriptionApiClient.ezInstance.ezGetActiveEmployerSubscriptionPlans();
    }

    /**
     * @public @method
     * GET: /_api/v1/subscriptions/plans/active
     * @returns {Promise}
     */
    ezGetActiveEmployerSubscriptionPlans() {
        return ezApi.ezclocker.ezHttpHelper.ezGet(
            EzUrl.build`
                ${EzSubscriptionApiClient.ezInstance.ezApiRootUri}
                /plans/active`)
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);

    }

    /**
     * @public @method
     * WARNING: This method ASSUMES it is for a employer account and NOT a personal account.
     * GET: /_api/v1/subscriptions/employer/billing-address
     * @returns {Promise}
     * @deprecated
     * Migrate to:
     *  ezApi.ezclocker.ezSubscriptionApiClient.ezGetEmployerBillingAddress()
     */
    ezGetBillingAddress() {
        return EzSubscriptionApiClient.ezInstance.ezGetEmployerBillingAddress();
    }

    /**
     * @public @method
     * GET: /_api/v1/subscriptions/employer/billing-address
     * @returns {Promise}
     */
    ezGetEmployerBillingAddress() {
        return ezApi.ezclocker.ezHttpHelper.ezGet(
            EzUrl.build`
                ${EzSubscriptionApiClient.ezInstance.ezApiRootUri}
                /employer/billing-address
                ?time-zone-id=${ezApi.ezclocker.ezDateTime.activeTimeZone}`)
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);

    }

    /**
     * @public @method
     * WARNING: This method ASSUMES it is for a employer account and NOT a personal account.
     * GET: /_api/v1/subscriptions/employer/billing-information
     * @returns {Promise}
     * @deprecated
     * Migrate to:
     *  ezApi.ezclocker.ezSubscriptionApiClient.ezGetEmployerBillingInformation()
     */
    ezGetBillingInformation() {
        return EzSubscriptionApiClient.ezInstance.ezGetEmployerBillingInformation();
    }

    /**
     * @public @method
     * WARNING: This method ASSUMES it is for a employer account and NOT a personal account.
     * GET: /_api/v1/subscriptions/employer/billing-information
     * @returns {Promise}
     */
    ezGetEmployerBillingInformation() {
        return ezApi.ezclocker.ezHttpHelper.ezGet(
            EzUrl.build`
                ${EzSubscriptionApiClient.ezInstance.ezApiRootUri}
                /employer/billing-information
                ?time-zone-id=${ezApi.ezclocker.ezDateTime.activeTimeZone}`)
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);

    }

    /**
     * @public @method
     * WARNING: This method ASSUMES it is for a employer account and NOT a personal account.
     * Gets the employer's credit card info
     * GET: /_api/v1/subscriptions/employer/credit-card
     * @returns {Promise}
     * @deprecated
     * Migrate to:
     *  ezApi.ezclocker.ezSubscriptionApiClient.ezGetEmployerCreditCardInfo()
     */
    ezGetCreditCardInfo() {
        return EzSubscriptionApiClient.ezInstance.ezGetEmployerCreditCardInfo();
    }

    /**
     * @public @method
     * Gets the employer's credit card info
     * GET: /_api/v1/subscriptions/employer/credit-card
     * @returns {Promise}
     */
    ezGetEmployerCreditCardInfo() {
        return ezApi.ezclocker.ezHttpHelper.ezGet(
            EzUrl.build`
                ${EzSubscriptionApiClient.ezInstance.ezApiRootUri}
                /employer/credit-card`)
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);

    }

    /**
     * @public @method
     * WARNING: This method ASSUMES it is for a employer account and NOT a personal account.
     * GET: /_api/v1/subscriptions/employer/current
     * @returns {Promise}
     * @deprecated
     * Migrate to:
     *  ezApi.ezclocker.ezSubscriptionApiClient.ezGetCurrentEmployerSubscriptionPlan(skipProviderCheck = false)
     */
    ezGetCurrentSubscriptionPlan(skipProviderCheck = false) {
        return EzSubscriptionApiClient.ezInstance.ezGetCurrentEmployerSubscriptionPlan(skipProviderCheck);
    }

    /**
     * @public @method
     * GET: /_api/v1/subscriptions/employer/current
     * @returns {Promise}
     */
    ezGetCurrentEmployerSubscriptionPlan(skipProviderCheck = false) {
        return ezApi.ezclocker.ezHttpHelper.ezGet(
            EzUrl.build`
                ${EzSubscriptionApiClient.ezInstance.ezApiRootUri}
                /employer/current
                ?time-zone-id=${ezApi.ezclocker.ezDateTime.activeTimeZone}
                &skip-provider-check=${skipProviderCheck}`)
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);

    }

    /**
     * @public @method
     * GET: /_api/v1/subscriptions/braintree/{braintreePlanName}
     * @returns {Promise}
     */
    ezGetSubscriptionForBraintreePlanName(braintreePlanName) {
        if (!EzString.stringHasLength(braintreePlanName)) {
            throw new EzBadParamException(
                'braintreePlanName',
                EzSubscriptionApiClient.ezInstance,
                EzSubscriptionApiClient.ezInstance.ezGetSubscriptionForBraintreePlanName);
        }

        return ezApi.ezclocker.ezHttpHelper.ezGet(
            EzUrl.build`
                ${EzSubscriptionApiClient.ezInstance.ezApiRootUri}
                /braintree
                /${braintreePlanName}`)
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);

    }

    /**
     * @public @method
     * Obtains the active employer's license
     * @param {undefiend|null|boolean} skipProviderCheck
     * Default: false
     * @returns {Promise}
     * Promiser resolve and reject returns entity:
     * {
     *      errorCode: {number},
     *      message: {string},
     *      entity: {ValidLicenseResponse}
     * }
     */
    ezGetActiveEmployerLicense(skipProviderCheck = false) {
        return ezApi.ezclocker.ezHttpHelper.ezGet(
            EzUrl.build`
                ${EzSubscriptionApiClient.ezInstance.ezApiRootUri}
                /employer/license
                ?target-time-zone-id=${ezApi.ezclocker.ezDateTime.activeTimeZone}
                &skip-provider-check=${EzBoolean.booleanOrFalse(skipProviderCheck)}`)
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);
    }

    /**
     * @public @method
     * GET: /_api/v1/subscriptions/is-valid
     * @returns {Promise}
     * @deprecated
     * Migrate to:
     *  ezApi.ezclocker.ezSubscriptionApiClient.ezGetActiveEmployerLicense(skipProviderCheck = false)
     */
    ezGetHasValidLicense(skipProviderCheck = false) {
        return ezApi.ezclocker.ezHttpHelper.ezGet(
            EzUrl.build`
                ${EzSubscriptionApiClient.ezInstance.ezApiRootUri}
                /is-valid
                ?time-zone-id=${ezApi.ezclocker.ezDateTime.activeTimeZone}
                &skip-provider-check=${skipProviderCheck}`)
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);
    }

    /**
     * @public @method
     * Adds an add-on associated with the provided ezSubscriptionAddOnId to the current subscription.
     * @param {string} ezSubscriptionAddOnId
     * A valid enum property from EzSubscriptionAddOnId
     * @returns {Promise}
     * Promise.resolve contains a ValidLicenseResponse
     * Promise.reject contains the response error
     */
    ezAddBraintreeAddOnToExistingEmployerSubscription(braintreeAddOnId) {
        if (!EzString.stringHasLength(braintreeAddOnId)) {
            throw new EzBadParamException(
                'braintreeAddOnId',
                EzAccountSubscriptionActions.ezInstance,
                EzAccountSubscriptionActions.ezInstance.ezExecuteAddBrainTreeAddOnToExistingEmployerSubscription);
        }

        return ezApi.ezclocker.ezHttpHelper.ezPost(
            EzUrl.build`
                ${EzSubscriptionApiClient.ezInstance.ezApiRootUri}
                /employer/add-on
                /${braintreeAddOnId}
                ?target-time-zone-id=${ezApi.ezclocker.ezDateTime.activeTimeZone}`)
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);
    }

    /**
     * @public @method
     * Canceles the subscription to the feature package
     */
    ezCancelFeaturePackageSubscription(ezFeaturePackageId) {
        if (!EzString.stringHasLength(ezFeaturePackageId)) {
            throw new EzBadParamException(
                'ezFeaturePackageId',
                EzAccountSubscriptionActions.ezInstance,
                EzAccountSubscriptionActions.ezInstance.ezExecuteAddBrainTreeAddOnToExistingEmployerSubscription);
        }

        return ezApi.ezclocker.ezHttpHelper.ezDelete(
            EzUrl.build`
                ${EzSubscriptionApiClient.ezInstance.ezApiRootUri}
                /employer/feature-package
                /${ezFeaturePackageId}
                ?target-time-zone-id=${ezApi.ezclocker.ezDateTime.activeTimeZone}`)
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);
    }

    /**
     * @public @method
     * Gets the default employer free subscription plan information.
     * @returns {Promise}
     * Promise resolve contains the subscription plan response.
     */
    ezGetEmployerDefaultFreeSubscriptionPlan() {
        return ezApi.ezclocker.ezHttpHelper.ezGet(
            EzUrl.build`
                ${EzSubscriptionApiClient.ezInstance.ezApiRootUri}
                /employer/plans/default-free-plan`)
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);
    }

    /*
        =============================================================================================================
        !!! Only Place EzAPI Initialization code for this clase from this point forward !!!
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Class Static Properties, Method, and Initialization
        =============================================================================================================
    */

    /**
     * @static
     * @public @readonly @property
     * Returns the name of this class's singleton instance when registered with ezApi.
     * ezApiName value.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezSubscriptionApiClient';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzSubscriptionApiClient_Ready'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzSubscriptionApiClient}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzSubscriptionApiClient.ezApiName])
        ? globalThis.ezApi.ezclocker[EzSubscriptionApiClient.ezApiName]
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzSubscriptionApiClient}
     */
    static get ezInstance() {
        return EzSubscriptionApiClient.#ezInstance;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzSubscriptionApiClient} instance
     */
    static set ezInstance(instance) {
        if (null != EzSubscriptionApiClient.#ezInstance) {
            throw new EzException('EzSubscriptionApiClient\'s singleton instance is already reigstered with EzApi.');
        }

        EzSubscriptionApiClient.#ezInstance = instance;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzSubscriptionApiClient.ezApiName])
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
        return EzSubscriptionApiClient.#ezApiRegistrationState;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzSubscriptionApiClient.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzSubscriptionApiClient.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName].ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzSubscriptionApiClient.ezInstance &&
            EzRegistrationState.REGISTERED === EzSubscriptionApiClient.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzSubscriptionApiClient.#ezCanRegister && !EzSubscriptionApiClient.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzSubscriptionApiClient, EzSubscriptionApiClient.ezApiName);
        }

        return EzSubscriptionApiClient.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *    1) Property getter EzSubscriptionApiClient.ezApiName
     *    2) Property getter EzSubscriptionApiClient.ezEventNames
     *    3) Property getter EzSubscriptionApiClient.ezInstance
     *    4) Property setter EzSubscriptionApiClient.ezInstance
     *    5) Property getter EzSubscriptionApiClient.ezApiRegistrationState
     *    6) Property setter EzSubscriptionApiClient.ezApiRegistrationState
     *    7) Property getter EzSubscriptionApiClient.#ezCanRegister
     *    8) Property getter EzSubscriptionApiClient.#ezIsRegistered
     *    9) Method EzSubscriptionApiClient.#ezRegistrator()
     */
    static {
        if (!EzSubscriptionApiClient.#ezIsRegistered) {
            EzSubscriptionApiClient.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzSubscriptionApiClient.#ezRegistrator()) {
                document.addEventListener(
                    EzSubscriptionApiClient.ezOnEzApiReadyEventName,
                    EzSubscriptionApiClient.#ezRegistrator);

                document.addEventListener(
                    EzHttpHelper.ezEventNames.onReady,
                    EzSubscriptionApiClient.#ezRegistrator);
            }
        }
    }
}

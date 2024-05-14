import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzString,
    EzArray,
    EzFunction,
    EzJson,
    EzPromise,
    EzUrl,
    EzHtml
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzFeaturePackageId,
    EzErrorCode
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';
import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

import { EzSubscriptionService } from '/public/javascript/services/ezclocker-subscriptions.js';
import { EzSubscriptionApiClient } from '/ezlibrary/api_clients/EzSubscriptionApiClient.js';

import { EzUI } from '/public/javascript/common/ezui.js';
import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

import { EzSubscriptionDialog } from '/secure/widgets/EzSubscriptionDialog/EzSubscriptionDialog.js';

import { EzBillingAddress } from '/ezlibrary/entities/EzBillingAddress.js';
import { EzCreditCard } from '/ezlibrary/entities/EzCreditCard.js';

import { EzPaymentInfoRequest } from '/ezlibrary/entities/requests/EzPaymentInfoRequest.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * ---------------------------------------------------------------------
 * Import with:
 *     import { EzAccountSubscriptionActions } from '/secure/account/EzAccountSubscriptionActions.js';
 * ---------------------------------------------------------------------
 * Ready Check:
 *     globalThis.ezApi.ezclocker[EzAccountSubscriptionActions.ezApiName] &&
 *     globalThis.ezApi.ezclocker[EzAccountSubscriptionActions.ezApiName].ready &&
 * ---------------------------------------------------------------------
 * Listen for Ready Event:
 *     // Ready event
 *     document.addEventListener(
 *         EzAccountSubscriptionActions.ezEventNames.onReady,
 *         this.#ezRegistrator);
 * ---------------------------------------------------------------------------
 * Singleton Instance Reference:
 *  * Inside this class...: EzAccountSubscriptionActions.ezInstance
 *     Outside this class..: ezApi.ezclocker.ezAccountSubscriptionActions
 * ---------------------------------------------------------------------------
 */
export class EzAccountSubscriptionActions extends EzClass {
    /**
     * @protected @method
     * @returns {EzAccountSubscriptionActions}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzSubscriptionDialog.ezEventNames.ezOnSubscriptionDialogSubscribeSuccess,
            EzAccountSubscriptionActions.ezApiName,
            EzAccountSubscriptionActions.ezInstance.ezRefreshLicenseAndBillingInfo);

        return EzAccountSubscriptionActions.ezInstance;
    }

    /**
     * @public @method
     * Determines which type of subscription to start (free trial, or subscribe)
     * @param {object} newSubscriptionPlanInfo
     * @returns {Promise}
     */
    ezStartFreeTrialOrSubscribe(newSubscriptionPlanInfo) {
        if (!EzObject.isValid(newSubscriptionPlanInfo)) {
            throw new EzBadParamException(
                'newSubscriptionPlanInfo',
                EzAccountSubscriptionActions.ezInstance,
                EzAccountSubscriptionActions.ezInstance.ezStartFreeTrialOrSubscribe);
        }
        if (!EzObject.isValid(ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountLicense()) ||
            !EzBoolean.isTrue(ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountLicense().ready)) {
            let em = EzString.em`
                Cannot change the subscription to subscriptionPlanId=${newSubscriptionPlanInfo.id}
                due to the following error: The selected employer account's license is not yet available.`;

            ezApi.ezclocker.ezLogger.error(em);

            return EzPromise.reject({
                errorCode: 400,
                message: em
            });
        }

        return EzPromise.promise(
            (resolve, reject) => 0 < ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountLicense().freeTrialDaysLeft
                // Has free trial time left and can start or continue a free trial
                ? EzAccountSubscriptionActions.ezInstance.ezStartOrContinueFreeTrial(newSubscriptionPlanInfo)
                    .then(resolve, reject)
                // Does not have any free trial time left but provid payment
                : EzAccountSubscriptionActions.ezInstance.ezExecuteActivateSubscriptionPlan(newSubscriptionPlanInfo)
                    .then(resolve, reject));
    }

    /**
     * @public @method
     * @param {object} newSubscriptionPlanInfo
     * @returns {Promise}
     */
    ezStartOrContinueFreeTrial(newSubscriptionPlanInfo) {
        if (!EzObject.isValid(newSubscriptionPlanInfo)) {
            throw new EzBadParamException(
                'newSubscriptionPlanInfo',
                EzAccountSubscriptionActions.ezInstance,
                EzAccountSubscriptionActions.ezInstance.ezStartOrContinueFreeTrial);
        }

        return ezApi.ezclocker.ezUi.ezStartPageWaitPromise(
            'Subscribing to plan ...',
            (waitDone, resolve, reject) => {
                ezApi.ezclocker.ezSubscriptionPlansView.lastSelectedLicense = ezApi.ezclocker.ezClockerContext.ezGetSubscriptionContext.activeSubscription;

                // No payment info for free trial attempts
                let ePaymentInfoRequest = new EzPaymentInfoRequest();

                return ezApi.ezclocker.ezSubscriptionService.ezChangeEmployerSubscriptionPlan(newSubscriptionPlanInfo.id, ePaymentInfoRequest)
                    .then(
                        (validLicenseResponse) => EzAccountSubscriptionActions.ezInstance.ezUpdateLicenseAndBillingInfo(validLicenseResponse)
                            .then(
                                () => EzPromise.waitDoneThen(
                                    this,
                                    waitDone,
                                    () => resolve(validLicenseResponse))),
                        (eResponse) => EzPromise.waitDoneThen(
                            this,
                            waitDone,
                            () => {
                                if (EzObject.isValid(eResponse) &&
                                    EzErrorCode.ERROR_FREE_TRIAL_EXPIRED == eResponse.errorCode ||
                                    EzErrorCode.SUBSCRIPTION_PAYMENT_NEEDED == eResponse.errorCode) {
                                    // trial expired, start collect payment flow
                                    EzAccountSubscriptionActions.ezInstance.ezCollectPaymentFromCustomer(newSubscriptionPlanInfo);

                                    return reject(eResponse);
                                }

                                let em = EzObject.isValid(eResponse) && EzString.hasLength(eResponse.message)
                                    ? eResponse.message
                                    : EzString.EMPTY;

                                ezApi.ezclocker.ezSubscriptionPlansView.ezShowActivateSubscriptionError(eResponse, em);

                                return reject(eResponse)
                            }));
            });
    }

    /**
     * @public @method
     * Displays the enter payment information dialog.
     * @param {object} subscriptionPlanInfo
     */
    ezCollectPaymentFromCustomer(subscriptionPlanInfo) {
        if (!EzObject.isValid(subscriptionPlanInfo)) {
            throw new EzBadParamException(
                'subscriptionPlanInfo',
                EzAccountSubscriptionActions.ezInstance,
                EzAccountSubscriptionActions.ezInstance.ezCollectPaymentFromCustomer);
        }

        if (EzBoolean.isTrue(ezApi.ezclocker.ezSubscriptionDialog.ezIsVisible)) {
            // Dialog already visible, ignore call
            return;
        }

        ezApi.ezclocker.ezSubscriptionDialog.ezShow(
            // Subscription plan id
            subscriptionPlanInfo,
            null,

            // Employer Info
            ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer(),
            // Billing Address
            ezApi.ezclocker.ezClockerContext.ezGetSubscriptionContextBillingAddress());
    }


    /**
     * @public @method
     * Determines if payment will need collected if the user switches from the current subscription to another subscription.
     * @returns {Promise}
     * Promise.resolve indicates no payment collection is needed.
     * Promise.reject indicates payment collection is needed.
     */
    ezDoesPaymentNeedCollected() {
        let subscriptionContext = ezApi.ezclocker.ezClockerContext.ezGetSubscriptionContext();

        if (!EzObject.isValid(subscriptionContext)) {
            throw new EzException('A valid subscription context is required to determine if payment collection is needed before subscribing.');
        }

        return EzPromise.promise(
            (resolve, reject) => {
                /*
                    Example Active Customer Entity
                    {
                        "ready":true,
                        "providerId":"40543373251",
                        "companyName":"Peggy Sue's Cookie Shop",
                        "contactFirstName":"Peggy",
                        "contactLastName":"Sue"
                        ,"contactEmail":"signupb@mailinator.com",
                        "contactNumber":"",
                        "contactAddress":"1000 Main Street",
                        "contactCity":"Acityin",
                        "contactState":"Texas",
                        "contactCountry":"",
                        "contactPostalCode":"75024"
                    }
                */
                let activeCustomer = ezApi.ezclocker.ezClockerContext.ezGetSubscriptionContext().activeCustomer;

                let customerBillingInfoAvailable = EzObject.isValid(activeCustomer) &&
                    EzBoolean.isTrue(activeCustomer.ready) &&
                    (EzString.hasLength(activeCustomer.companyName) ||
                    EzString.hasLength(activeCustomer.contactFirstName) && EzString.hasLength(activeCustomer.contactLastName)) &&
                    EzString.hasLength(activeCustomer.contactEmail) &&
                    EzString.hasLength(activeCustomer.contactPostalCode)
                    EzString.hasLength(activeCustomer.contactAddress) &&
                    EzString.hasLength(activeCustomer.contactCity) &&
                    EzString.hasLength(activeCustomer.contactState) &&
                    EzString.hasLength(activeCustomer.contactPostalCode);

                /*
                Example Active Billing Address Entity
                {
                    "ready":true,
                    "providerId":"c6",
                    "companyName":"Peggy Sue's Cookie Shop",
                    "billingContactName":"Peggy Sue",
                    "billingFirstName":"Peggy",
                    "billingLastName":"Sue",
                    "billingContactPhone":"",
                    "billingContactEmail":"signupb@mailinator.com",
                    "billingStreetAddress":"1000 Main Street",
                    "billingAdditionalAddress":"",
                    "billingCity":"Acityin",
                    "billingState":"Texas",
                    "billingPostalCode":"75024",
                    "billingCountry":"",
                    "billingEmail":""
                }
                */
                let activeBillingAddress = ezApi.ezclocker.ezClockerContext.ezGetSubscriptionContext().activeBillingAddress;

                let addressDataAvailable = EzObject.isValid(activeBillingAddress) &&
                    EzBoolean.isTrue(activeBillingAddress.ready) &&
                    (EzString.hasLength(activeBillingAddress.companyName) ||
                    EzString.hasLength(activeBillingAddress.billingFirstName) && EzString.hasLength(activeBillingAddress.billingLastName)) &&
                    EzString.hasLength(activeBillingAddress.billingContactEmail) &&
                    EzString.hasLength(activeBillingAddress.billingStreetAddress) &&
                    EzString.hasLength(activeBillingAddress.billingCity) &&
                    EzString.hasLength(activeBillingAddress.billingState) &&
                    EzString.hasLength(activeBillingAddress.billingPostalCode) &&
                    EzString.hasLength(activeBillingAddress.billingState) &&
                    EzString.hasLength(activeBillingAddress.billingState);

                /*
                    Example Active Creidt Card Entity
                    {
                        "ready":true,
                        "providerToken":"EZCLOCKER_SUBSCRIPTION",
                        "cardType":"Visa",
                        "cardHolderName":"Peggy Sue",
                        "cardNumber":"",
                        "cardExpireDate":"09/2024",
                        "cardSpecialNumber":"",
                        "creditCardZipCode":"",
                        "creditCardImageUrl":"https://assets.braintreegateway.com/payment_method_logo/visa.png?environment=sandbox"
                    }
                */
                let activeCreditCard = ezApi.ezclocker.ezClockerContext.ezGetSubscriptionContext().activeCreditCard;

                let creditCardDataAvailable = EzObject.isValid(activeCreditCard) &&
                    EzBoolean.isTrue(activeCreditCard.ready) &&
                    EzString.hasLength(activeCreditCard.cardHolderName) &&
                    EzString.hasLength(activeCreditCard.cardExpireDate) &&
                    EzString.hasLength(activeCreditCard.cardType);

                return creditCardDataAvailable && addressDataAvailable && customerBillingInfoAvailable
                    ? resolve({
                        errorCode: EzErrorCode.NONE,
                        message: 'Payment information is already avaialble',
                        activeCustomer: activeCustomer,
                        activeBillingAddress: activeBillingAddress,
                        activeCreditCard: activeCreditCard
                    })
                    : reject({
                        errorCode: EzErrorCode.SUBSCRIPTION_PAYMENT_NEEDED,
                        message: EzErrorCode.ezEnumData(EzErrorCode.SUBSCRIPTION_PAYMENT_NEEDED).ezTextErrorMessage,
                        activeCustomer: activeCustomer,
                        activeBillingAddress: activeBillingAddress,
                        activeCreditCard: activeCreditCard
                    });
            });
    }

    /**
     * @public @method
     * Creates the EzPaymentInfoRequest entity
     * @param {object} activeBillingAddress
     * @param {object} activeCreditCard
     * @returns {EzPaymentInfoRequest}
     */
    ezCreateEzPaymentInfoRequest(activeBillingAddress, activeCreditCard) {
        if (!EzObject.isValid(activeBillingAddress)) {
            throw new EzBadParamException(
                'activeBillingAddress',
                EzAccountSubscriptionActions.ezInstanc,
                EzAccountSubscriptionActions.ezInstance.ezCreatePaymentInfoRequest);
        }
        if (!EzObject.isValid(activeCreditCard)) {
            throw new EzBadParamException(
                'activeCreditCard',
                EzAccountSubscriptionActions.ezInstanc,
                EzAccountSubscriptionActions.ezInstance.ezCreatePaymentInfoRequest);
        }

        return new EzPaymentInfoRequest(
            new EzBillingAddress(
                // employerId
                null,
                // employeeId
                null,
                // personalId
                null,
                // aCompanyName
                EzString.stringOrEmpty(
                    activeBillingAddress.companyName),
                // aBillingFirstName
                EzString.stringOrEmpty(
                    activeBillingAddress.billingFirstName),
                // aBillingLastName
                EzString.stringOrEmpty(
                    activeBillingAddress.billingLastName),
                // aBillingStreetAddress
                EzString.stringOrEmpty(
                    activeBillingAddress.billingStreetAddress),
                // aBillingAdditionalAddress
                EzString.stringOrEmpty(
                    activeBillingAddress.billingAdditionalAddress),
                // aBillingCity
                EzString.stringOrEmpty(
                    activeBillingAddress.BillingCity),
                // aBillingState
                EzString.stringOrEmpty(
                    activeBillingAddress.billingState),
                // aBillingPostalCode
                EzString.stringOrEmpty(
                    activeBillingAddress.billingPostalCode),
                // aBillingCountry
                EzString.stringOrEmpty(
                    activeBillingAddress.billingCountry),
                // aBillingEmail
                EzString.stringOrEmpty(
                    activeBillingAddress.billingEmail),
                // aBillingContactNumber
                EzString.stringOrEmpty(
                    activeBillingAddress.billingContactPhone),
                // locality
                EzString.stringOrEmpty(
                    activeBillingAddress.BillingCity),
                // region
                EzString.stringOrEmpty(
                    activeBillingAddress.billingState),
                // postalCode
                EzString.stringOrEmpty(
                    activeBillingAddress.billingPostalCode),
                // countryName
                EzString.stringOrEmpty(
                    activeBillingAddress.billingCountry),
                // contactEmail
                EzString.stringOrEmpty(
                    activeBillingAddress.billingEmail),
                // contactPhone
                EzString.stringOrEmpty(
                    activeBillingAddress.billingContactPhone),
                // providerCreditCardId
                null,
                // providerBillingAddressId
                null,
                // countryCodeAlpha2
                null,
                // countryCodeAlpha3
                null,
                // countryCodeNumeric
                null,
                // targetDateTimeZoneId
                ezApi.ezclocker.ezDateTime.activeTimeZone),
            new EzCreditCard(
                // cardHolderName
                EzString.stringOrEmpty(
                    activeCreditCard.cardHolderName),
                // cardNumber
                EzString.stringOrEmpty(
                    activeCreditCard.cardNumber),
                // cardExpireDate
                EzString.stringOrEmpty(
                    activeCreditCard.cardExpireDate),
                // cardSpecialNumber
                EzString.stringOrEmpty(
                    activeCreditCard.cardSpecialNumber),
                // cardZipCode
                EzString.stringOrEmpty(
                    activeCreditCard.creditCardZipCode),
                // discountId
                null,
                // ezCreditCardType
                null,
                // cardImageUrl
                null));
    }

    /**
     * @public @method
     * Activates a subscription plan with payment information.
     * @param {object} newSubscriptionPlanInfo
     * @returns {Promise}
     */
    ezExecuteActivateSubscriptionPlan(newSubscriptionPlanInfo) {
        if (!EzObject.isValid(newSubscriptionPlanInfo)) {
            throw new EzBadParamException(
                'newSubscriptionPlanInfo',
                EzAccountSubscriptionActions.ezInstance,
                EzAccountSubscriptionActions.ezInstance.ezExecuteActivateSubscriptionPlan);
        }

        return EzAccountSubscriptionActions.ezInstance.ezDoesPaymentNeedCollected()
            .then(
                (response) => ezApi.ezclocker.ezUi.ezStartPageWaitPromise(
                    `Switching to the ${newSubscriptionPlanInfo.description} ...`,
                    (waitDone, resolve, reject) => {
                        ezApi.ezclocker.ezSubscriptionPlansView.lastSelectedLicense = ezApi.ezclocker.ezClockerContext.ezGetSubscriptionContext()
                            .activeSubscription;

                        return ezApi.ezclocker.ezSubscriptionService.ezChangeEmployerSubscriptionPlan(
                            newSubscriptionPlanInfo.id,
                            EzAccountSubscriptionActions.ezInstance.ezCreateEzPaymentInfoRequest(
                                response.activeBillingAddress,
                                response.activeCreditCard))
                            .then(
                                // Response is ValidLicenseResponse entity
                                (validLicenseResponse) => EzAccountSubscriptionActions.ezInstance.ezUpdateLicenseAndBillingInfo(validLicenseResponse)
                                    .then(
                                        () => EzPromise.waitDoneResolve(
                                            this,
                                            waitDone,
                                            resolve,
                                            response)),
                                (eResponse) => EzPromise.waitDoneThen(
                                    this,
                                    waitDone,
                                    () => {
                                        if (EzObject.isValid(eResponse) && EzErrorCode.ERROR_FREE_TRIAL_EXPIRED == eResponse.errorCode ||
                                            EzErrorCode.SUBSCRIPTION_PAYMENT_NEEDED == eResponse.errorCode) {
                                            // trial expired, start collect payment flow
                                            EzAccountSubscriptionActions.ezInstance.ezCollectPaymentFromCustomer(newSubscriptionPlanInfo);
                                        } else {
                                            let em = 'EzClocker is unable to process your subscription';

                                            em = EzObject.isValid(eResponse) && EzString.hasLength(eResponse.message)
                                                ? `${em} due to the following error: ${eResponse.message}`
                                                : `${em} at this time.`;

                                            ezApi.ezclocker.ezDialog.ezShowServiceResponseErrorDialog(
                                                'Subscription Error',
                                                EzHtml.build`
                                                    <p
                                                        id="ezExecuteActivateSubscriptionPlanErrorParagraph1">
                                                        ${em}
                                                    </p>
                                                    <p
                                                        id="ezExecuteActivateSubscriptionPlanErrorParagraph2">
                                                        Please contact <a href="mailto:support@ezclocker.com">support@ezclocker.com</a> and include the
                                                        additional details below in the email.
                                                    </p>`,
                                                eResponse,
                                                'No additional details',
                                                true)
                                                .then(EzPromise.ignoreResolve);
                                        }

                                        return reject(eResponse);
                                    }));
                    }),
                (eResponse) => {
                    EzAccountSubscriptionActions.ezInstance.ezCollectPaymentFromCustomer(newSubscriptionPlanInfo);

                    return Promise.reject(eResponse);
                });
    }

    /**
     * @public @method
     * Cancels the existing subscription plan
     */
    cancelExistingPlan() {
        ezApi.ezclocker.ezUi.ezStartPageWait(
            'Canceling your subscription ...',
            (waitDone) => ezApi.ezclocker.ezHttpHelper.ezPost(
                EzUrl.build`
                    /_api/v1/subscriptions/cancel
                    ?target-time-zone-id=${ezApi.ezclocker.ezDateTime.activeTimeZone}`)
                .then(
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiResponse,
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                .then(
                    () => {
                        waitDone();

                        ezApi.ezclocker.ezSubscriptionInfoViewController.ezApplySubscriptionUxState();

                        ezApi.ezclocker.ezDialog.ezShowOk(
                            'Subscription Cancled',
                            'Your subscription was succesfully canceled.');
                    },
                    (eResponse) => {
                        waitDone();

                        ezApi.ezclocker.ezLogger.error(
                            EzString.em`
                                Failed to cancel the existing subscription due to the following error:
                                ${EzString.stringOrDefault(eResponse.message, 'No reason provided')}.
                                Error response: ${EzJson.toJson(eResponse)}`);

                        ezApi.ezclocker.ezDialog.ezShowServiceResponseErrorDialog(
                            'Cancel Subscription Error',
                            EzString.em`
                                EzClocker is unable to cancel your subscription at this time
                                due to the following error: ${EzString.stringOrDefault(eResponse.message, 'No reason provided')}.`,
                            eResponse,
                            'No additional details',
                            true);
                    }));
    }

    /**
     * @public @method
     * Downgrades the user's account to a free account
     * @returns {Promise}
     */
    downGradeToFree() {
        return ezApi.ezclocker.ezUi.ezStartPageWaitPromise(
            'Downgrading subscription to free ...',
            (waitDone, resolve, reject) => {
                ezApi.ezclocker.ezHttpHelper.ezPost(
                    ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                        '/subscriptions/employer/downgrade-to-free',
                        'v1'))
                    .then(
                        ezApi.ezclocker.ezServices.ezProcessApiResponse,
                        ezApi.ezclocker.ezServices.ezProcessApiReject)
                    .then(
                        (validLicenseResponse) => EzAccountSubscriptionActions.ezInstance.ezUpdateLicenseAndBillingInfo(validLicenseResponse)
                            .then(
                                () => EzPromise.waitDoneResolve(
                                    this,
                                    waitDone,
                                    resolve,
                                    response)),
                        (eResponse) => EzPromise.waitDoneThen(
                            this,
                            waitDone,
                            () => {
                                ezApi.ezclocker.ezLogger.error(
                                    `Failed to downgrade subscription to free. Error: ${EzJson.toJson(eResponse)}`);

                                return ezApi.ezclocker.ezDialog.ezShowErrorWithDetails(
                                    'Subscription Downgrade Error',
                                    'EzClocker is unable to down grade your account at this time.',
                                    eResponse)
                                    .then(
                                        () => reject(eResponse));
                            }));
            });
    }

    /**
     * @public @method
     * Obtain feedback and then cancel the subscription
     * @returns {Promise.resolve}
     */
    ezFeedbackAndCancelSubscription() {
        return EzPromise.asyncAction(
            (finished) => {
                ezApi.ezclocker.ezSendFeedbackDialog.ezShow();

                ezApi.ezclocker.ezEventEngine.ezWantEvent(
                    ezApi.ezclocker.ezSendFeedbackDialog.ezEventNames.ezOnSendFeedbackDialogSubmit,
                    EzAccountSubscriptionActions.ezApiName,
                    () => ezApi.ezclocker.ezUi.ezStartPageWaitExecute(
                        'Canceling your subscription ..',
                        (waitDone) => ezApi.ezclocker.ezSubscriptionService.ezCancelActiveEmployerSubscription()
                            .then(
                                (validLicenseResponse) => EzAccountSubscriptionActions.ezInstance.ezUpdateLicenseAndBillingInfo(validLicenseResponse)
                                    .then(
                                        () => EzPromise.waitDoneThen(
                                            this,
                                            waitDone,
                                            () => ezApi.ezclocker.ezDialog.ezShowMessage(
                                                'Subscription Canceled',
                                                'Your ezClocker subscription is now canceled.')
                                                .then(finished))),
                                (eResponse) => EzPromise.waitDoneThen(
                                    this,
                                    waitDone,
                                    () => ezApi.ezclocker.ezDialog.ezShowError(
                                        'Cancel Subscription Error',
                                        EzString.em`
                                            EzClocker is unable to cancel your subscription at this time.
                                            ${eResponse.message}`)
                                        .then(finished)))));
            });
    }

    /**
     * @public @method
     * Adds the addon associated with the provdied EzFeaturePackageId to the employer's current subscription.
     * @param {string} ezFeaturePackageId
     * A valid enum property value from EzFeaturePackageId
     * @returns {Promise}
     * Result object: {
     *     errorCode: {0 == success, anything else is failure}
     *     validLicenseResponse: {ValidLicenseResponse},
     *     message: {message},
     *     eResponse: {error response}
     * }
     */
    ezSubscribeToFeaturePackage(ezFeaturePackageId) {
        if (!EzString.hasLength(ezFeaturePackageId)) {
            throw new EzBadParamException(
                'ezFeaturePackageId',
                this,
                this.ezAddAddonToSubscription);
        }

        return ezApi.ezclocker.ezUi.ezStartPageWaitPromise(
            'Adding feature package to your current subscription ...',
            (waitDone, resolve, reject) => {
                let vResult = EzAccountSubscriptionActions.ezInstance.ezValidateCanAddAddOnToExistingEmployerSubscription(ezFeaturePackageId);

                if (EzBoolean.isFalse(vResult.valid)) {
                    return EzPromise.waitDoneReject(
                        this,
                        waitDone,
                        reject,
                        {
                            errorCode: 400,
                            message: vResult.message
                        });
                }

                return ezApi.ezclocker.ezSubscriptionApiClient.ezAddBraintreeAddOnToExistingEmployerSubscription(ezFeaturePackageId)
                    .then(
                        (validLicenseResponse) => EzAccountSubscriptionActions.ezInstance.ezUpdateLicenseAndBillingInfo(validLicenseResponse)
                            .then(
                                () => EzPromise.waitDoneResolve(
                                    this,
                                    waitDone,
                                    resolve,
                                    validLicenseResponse)),
                        (eResponse) => EzPromise.waitDoneThen(
                            this,
                            waitDone,
                            () => {
                                ezApi.ezclocker.ezLogger.error(
                                    EzString.em`
                                            Failed to add ${EzFeaturePackageId.ezEnumData(ezFeaturePackageId).displayName}
                                            to your existing subscription.
                                            Error response: ${EzJson.toJson(eResponse)}`);

                                return 400 == eResponse.errorCode
                                    ? ezApi.ezclocker.ezDialog.ezShowError(
                                        'Add Features Package Error',
                                        eResponse.message)
                                        .then(
                                            () => reject(eResponse))
                                    : reject(eResponse);
                            }));
            });
    }

    /**
     * @public @method
     * Cancles the provided feature package subscription
     * @param {string} ezFeaturePackageId
     * A valid enum property value from EzFeaturePackageId
     * @returns {Promise}
     */
    ezCancelFeaturePackageSubscription(ezFeaturePackageId) {
        if (!EzString.hasLength(ezFeaturePackageId)) {
            throw new EzBadParamException(
                'ezFeaturePackageId',
                EzAccountSubscriptionActions.ezInstance,
                EzAccountSubscriptionActions.ezInstance.ezCancelFeaturePackageSubscription);
        }

        let featurePackageDisplayName = EzString.stringOrDefault(
            EzFeaturePackageId.ezEnumData(ezFeaturePackageId).name,
            ezFeaturePackageId);

        return ezApi.ezclocker.ezUi.ezStartPageWaitPromise(
            `Removing feature package ${featurePackageDisplayName} from you current subscription ...`,
            (waitDone, resolve, reject) => {
                return ezApi.ezclocker.ezSubscriptionApiClient.ezCancelFeaturePackageSubscription(ezFeaturePackageId)
                    .then(
                        (validLicenseResponse) => EzAccountSubscriptionActions.ezInstance.ezUpdateLicenseAndBillingInfo(validLicenseResponse)
                            .then(
                                () => EzPromise.waitDoneResolve(
                                    this,
                                    waitDone,
                                    resolve,
                                    validLicenseResponse)),
                        (eResponse) => EzPromise.waitDoneThen(
                            this,
                            waitDone,
                            () => EzAccountSubscriptionActions.ezInstance.ezHandleCancelFeaturePackageSubscriptionReject(
                                reject,
                                ezFeaturePackageId,
                                eResponse)));
            });
    }

    /**
     * @protected @method
     * Handles Promise.reject for ezHandleCancelFeaturePackageSubscriptionReject
     * @param {function} reject
     * @param {string} ezFeaturePackageId
     * @param {object} eResponse
     * @returns {Promise.reject}
     */
    ezHandleCancelFeaturePackageSubscriptionReject(reject, ezFeaturePackageId, eResponse) {
        if (!EzFunction.isFunction(reject)) {
            throw new EzBadParamException(
                'reject',
                EzAccountSubscriptionActions.ezInstance,
                EzAccountSubscriptionActions.ezInstance.ezHandleCancelFeaturePackageSubscriptionError);
        }
        if (!EzString.hasLength(ezFeaturePackageId)) {
            throw new EzBadParamException(
                'ezFeaturePackageId',
                EzAccountSubscriptionActions.ezInstance,
                EzAccountSubscriptionActions.ezInstance.ezHandleCancelFeaturePackageSubscriptionError);
        }
        if (!EzObject.isValid(eResponse)) {
            throw new EzBadParamException(
                'eResponse',
                EzAccountSubscriptionActions.ezInstance,
                EzAccountSubscriptionActions.ezInstance.ezHandleCancelFeaturePackageSubscriptionError);
        }

        let featurePackageDisplayName = EzString.stringOrDefault(
            EzFeaturePackageId.ezEnumData(ezFeaturePackageId).displayName,
            ezFeaturePackageId);

        let userIdInfo = ezApi.ezclocker.ezClockerContext.ezActiveUserIdentificationInfo;

        let emailSupportInfo = ezApi.ezclocker.ezDialog.ezCreateSupportContactInfo(
            `Help with Error when Trying to Cancel the ${EzFeaturePackageId.ezEnumData(featurePackageId).name}!`,
            EzString.build`
                EzClocker support,

                Please help me resolve an error I get when I try to cancel the ${EzFeaturePackageId.ezEnumData(featurePackageId).name}
                subscrption.

                Error message:
                ${errorMessage}

                Error details:
                ${EzJson.toJson(errorDetails)}

                Thanks!
                ${userIdInfo.user}

                My Account Details:
                ${EzJson.toJson(userIdInfo)}`);

        let rejectResponse = {
            errorCode: eResponse.errorCode,
            message: EzString.em`
                EzClocker was unable to cancel the ${featurePackageDisplayName} susbscription at this time due to the following error:
                ${eResponse.message}`,
            eResponse: eResponse,
            ezFeaturePackageId: ezFeaturePackageId
        };

        ezApi.ezclocker.ezLogger.error(
            EzString.em`
                Failed to cancel the subscription to ${featurePackageDisplayName} with ezFeaturePackageId=${ezFeaturePackageId}.
                Error response: ${EzJson.toJson(eResponse)}`);

        return ezApi.ezclocker.ezDialog.ezShowErrorDialog(
            'Cancel Features Package Subscription Error',
            EzHtml.build`
                <p>
                    ${rejectResponse.message}
                </p>
                <div>
                    ${emailSupportInfo}
                </div>`,
            rejectResponse)
            .then(
                () => reject(rejectResponse));
    }

    /**
     * @public @method
     * Validates that the provided EzFeaturePackageId can get added to the employer's current subscription.
     * @param {string} EzFeaturePackageId
     * A valid enum property value from EzFeaturePackageId
     * @returns {object}
     * {
     *     valid: {boolean}
     *     message: {validation_message}
     * }
     */
    ezValidateCanAddAddOnToExistingEmployerSubscription(ezFeaturePackageId) {
        if (!EzString.hasLength(ezFeaturePackageId)) {
            throw new EzBadParamException(
                'ezFeaturePackageId',
                this,
                this.ezValidateCanAddAddOnToExistingSubscription);
        }

        let activeEmployerLicense = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployerLicense();

        if (null == activeEmployerLicense) {
            return {
                valid: false,
                message: 'You cannot add a feature package without a valid subscription.'
            };
        }

        if (EzBoolean.isTrue(activeEmployerLicense.canceled)) {
            return {
                valid: false,
                message: 'You cannot add a feature package to a canceled subscription.'
            };
        }

        if (EzBoolean.isTrue(activeEmployerLicense.isFreeAccount)) {
            return {
                valid: false,
            };
        }

        if (EzArray.hasLength(activeEmployerLicense.featurePackages)) {
            for (let ezEmployerFeaturePackage of activeEmployerLicense.featurePackages) {
                if (ezEmployerFeaturePackage.featurePackageId === ezFeaturePackageId) {
                    let ezFeaturePackageInfo = EzFeaturePackageId.ezEnumData(ezEmployerFeaturePackage.featurePackageId);

                    if (EzObject.isValid(ezFeaturePackageInfo)) {
                        return {
                            valid: false,
                            message: `Your subscription is already has the ${ezFeaturePackageInfo.name}.`
                        };
                    }
                }
            }
        }

        return {
            valid: true,
            message: 'Successfully Validated'
        };
    }

    /**
     * @public @method
     * Updates the license and billing information from the provided validLicenseResponse
     * @param {undefined|null|object} validLicenseResponse
     * If undefined or null, will call ezRefreshLicenseBillingInfo() which will use the API
     * to obtain the validLicenseResponse.
     * @returns {Promise.resolve}
     */
    ezUpdateLicenseAndBillingInfo(validLicenseResponse) {
        if (!EzObject.isValid(validLicenseResponse)) {
            return EzAccountSubscriptionActions.ezInstance.ezRefreshLicenseAndBillingInfo();
        }

        return ezApi.ezclocker.ezUi.ezPageWaitAsync(
            "Refreshing subscription information ...",
            (waitDone, finished) => {
                /*
                    EzClockerContext.ezInstance.ezSetSubscriptionContextBillingInformation(...) can trigger
                    one of the following events:
                        1) EzClockerContextEventName.onSubscriptionContextBillingInformationChanged
                        2) EzClockerContextEventName.onSubscriptionContextBillingInformationReady
                 */
                ezApi.ezclocker.ezClockerContext.ezSetSubscriptionContextBillingInformation(
                    validLicenseResponse.ezNovaBillingInformation);

                /*
                    EzClockerContext.ezInstance.ezSetSubscriptionContextBillingAddress(...) can trigger
                    one of the following events:
                        1) EzClockerContextEventName.onSubscriptionContextBillingAddressChanged
                        2) EzClockerContextEventName.onSubscriptionContextBillingAddressReady
                */
                ezApi.ezclocker.ezClockerContext.ezSetSubscriptionContextBillingAddress(
                    validLicenseResponse.ezNovaBillingInformation);

                /*
                    EzClockerContext.ezInstance.ezSetSubscriptionContextCreditCardInfo(...) can trigger
                    one of the following events:
                        1) EzClockerContextEventName.onSubscriptionContextActiveCreditCardChanged
                        2) EzClockerContextEventName.onSubscriptionContextActiveCreditCardReady
                */
                ezApi.ezclocker.ezClockerContext.ezSetSubscriptionContextCreditCardInfo(
                    validLicenseResponse.ezNovaBillingInformation);

                /*
                    EzClockerContext.ezInstance.ezSetSubscriptionContextCustomerInfo(...) can trigger
                    one of the following events:
                        1) EzClockerContextEventName.onSubscriptionContextActiveCustomerChanged
                        2) EzClockerContextEventName.onSubscriptionContextActiveCustomerReady,
                */
                ezApi.ezclocker.ezClockerContext.ezSetSubscriptionContextCustomerInfo(
                    validLicenseResponse.ezNovaBillingInformation);

                /*
                    EzClockerContext.ezInstance.ezSetSelectedEmployerAccountLicense(response) can trigger
                    one of the following events:
                        1) EzClockerContextEventName.onSelectedEmployerLicenseReady
                        2) EzClockerContextEventName.onSelectedEmployerLicenseUpdated
                        3) ==> EzClockerContext.ezInstance.ezSubscriptionContextActiveSubscriptionPlan:
                            1) EzClockerContextEventName.onSubscriptionContextActiveSubscriptionReady
                            2) EzClockerContextEventName.onSubscriptionContextActiveSubscriptionChanged
                */
                ezApi.ezclocker.ezClockerContext.ezSetSelectedEmployerAccountLicense(validLicenseResponse);

                return waitDone().then(finished);
            });
    }
    /**
     * @public @method
     * Refreshes the employer's license and billing information
     * @returns {Promise}
     */
    ezRefreshLicenseAndBillingInfo() {
        return ezApi.ezclocker.ezUi.ezPageWaitAsync(
            "Refreshing subscription information ...",
            (waitDone, finished) => ezApi.ezclocker.ezClockerContext.ezRefreshSubscriptionContextActiveSubscription()
                .then(
                    () => EzPromise.waitDoneResolve(
                        this,
                        waitDone,
                        finished)));
    }

    /*
    =========================================================================================================================
    Start of EzClocker Class Initialization and EzApi Registration Section
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    !! FROM THIS POINT FORWARD: ONLY PLACE INITIALIZATION CODE !!
    || All other class code MUST go above this section. ||
    =========================================================================================================================
    */

    /**
     * @static
     * @public @readonly @property
     * Returns the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezAccountSubscriptionActions';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzAccountSubscriptionActions_Ready'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzAccountSubscriptionActions}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzAccountSubscriptionActions.ezApiName])
        ? globalThis.ezApi.ezclocker[EzAccountSubscriptionActions.ezApiName]
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzAccountSubscriptionActions}
     */
    static get ezInstance() {
        return EzAccountSubscriptionActions.#ezInstance;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzAccountSubscriptionActions} instance
     */
    static set ezInstance(instance) {
        if (null != EzAccountSubscriptionActions.#ezInstance) {
            throw new Error('EzAccountSubscriptionActions\'s singleton instance is already reigstered with EzApi.');
        }

        EzAccountSubscriptionActions.#ezInstance = instance;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzAccountSubscriptionActions.ezApiName])
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
        return EzAccountSubscriptionActions.#ezApiRegistrationState;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzAccountSubscriptionActions.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @static
     * @private @readonly @property
     * Returns true when all required dependencies for this class report ready.
     * In otherwords, the require dependency's singleton instance is created
     * And is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzAccountSubscriptionActions.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzSubscriptionService.ezApiName] &&
            globalThis.ezApi.ezclocker[EzSubscriptionService.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzSubscriptionApiClient.ezApiName] &&
            globalThis.ezApi.ezclocker[EzSubscriptionApiClient.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzSubscriptionDialog.ezApiName] &&
            globalThis.ezApi.ezclocker[EzSubscriptionDialog.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzDialog.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDialog.ezApiName].ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzAccountSubscriptionActions.ezInstance &&
            EzRegistrationState.REGISTERED === EzAccountSubscriptionActions.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzAccountSubscriptionActions.#ezCanRegister && !EzAccountSubscriptionActions.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzAccountSubscriptionActions, EzAccountSubscriptionActions.ezApiName);
        }

        return EzAccountSubscriptionActions.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzAccountSubscriptionActions.ezApiName
     *     2) Property getter EzAccountSubscriptionActions.ezEventNames
     *     3) Property getter EzAccountSubscriptionActions.ezInstance
     *     4) Property setter EzAccountSubscriptionActions.ezInstance
     *     5) Property getter EzAccountSubscriptionActions.ezApiRegistrationState
     *     6) Property setter EzAccountSubscriptionActions.ezApiRegistrationState
     *     7) Property getter EzAccountSubscriptionActions.#ezCanRegister
     *     8) Property getter EzAccountSubscriptionActions.#ezIsRegistered
     *     9) Method EzAccountSubscriptionActions.#ezRegistrator()
     */
    static {
        if (!EzAccountSubscriptionActions.#ezIsRegistered) {
            EzAccountSubscriptionActions.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzAccountSubscriptionActions.#ezRegistrator()) {
                document.addEventListener(
                    EzAccountSubscriptionActions.ezOnEzApiReadyEventName,
                    EzAccountSubscriptionActions.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzAccountSubscriptionActions.#ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.onReady,
                    EzAccountSubscriptionActions.#ezRegistrator);

                document.addEventListener(
                    EzHttpHelper.ezEventNames.onReady,
                    EzAccountSubscriptionActions.#ezRegistrator);

                document.addEventListener(
                    EzSubscriptionService.ezEventNames.onReady,
                    EzAccountSubscriptionActions.#ezRegistrator);

                document.addEventListener(
                    EzSubscriptionApiClient.ezEventNames.onReady,
                    EzAccountSubscriptionActions.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzAccountSubscriptionActions.#ezRegistrator);

                document.addEventListener(
                    EzDialog.ezEventNames.onReady,
                    EzAccountSubscriptionActions.#ezRegistrator);

                document.addEventListener(
                    EzSubscriptionDialog.ezEventNames.onReady,
                    EzAccountSubscriptionActions.#ezRegistrator);
            }
        }
    }

    /*
    =========================================================================================================================
    End of EzClocker Class Initialization and EzApi Registration Section
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    !! DO NOT PLACE ANY NON-INITIALIZTION CODE BETWEEN THE START AND END OF THIS INITILIZATION SECTON !!
    !! DO NOT PLACE ANY CODE OF ANY KIND BELOW THIS POINT !!
    =========================================================================================================================
    */
}

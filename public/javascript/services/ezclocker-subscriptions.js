import {
    EzException,
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzFunction,
    EzUrl,
    EzJson
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzBillingAddress } from '/ezlibrary/entities/EzBillingAddress.js';
import { EzCreditCard } from '/ezlibrary/entities/EzCreditCard.js';

import { EzBillingInfoRequest } from '/ezlibrary/entities/requests/EzBillingInfoRequest.js';
import { EzPaymentInfoRequest } from '/ezlibrary/entities/requests/EzPaymentInfoRequest.js';

import { EzUpdateBillingAddressRequest } from '/ezlibrary/entities/requests/EzUpdateBillingAddressRequest.js';

import { EzUserRole } from '/ezlibrary/EzUserRole.js';

// TODO: Move all non-deprecated methods to EzSubscriptionApiClient.js

/**
 * @class
 * @extends { EzClass }
 * @description
 * Wrapper for ezClocker's subscription api
 * Import with:
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *     Import with:
 *     import { EzSubscriptionService } from '/public/javascript/services/ezclocker-subscriptions.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Ready Check:
 *     globalThis.ezApi.ezclocker[EzSubscriptionService.ezApiName] &&
 *     globalThis.ezApi.ezclocker[EzSubscriptionService.ezApiName].ready
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Listen for Ready Event:
 *     document.addEventListener(
 *         EzSubscriptionService.ezEventNames.onReady,
 *         this.#ezRegistrator);
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Singleton Instance Reference:
 *     Inside this class: EzSubscriptionService.ezInstance
 *     Outside this class: ezApi.ezclocker.ezSubscriptionService
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * @deprecated
 * Migrate existing methods and add all new methods to /ezlibrary/api_clients/EzSubscriptionApiClient.js
 */
export class EzSubscriptionService extends EzClass {
    /**
     * @protected @method
     */
    ezInit() {
        EzSubscriptionService.ezInstance._Public_SubscriptionService_Base_Url =
            ezApi.ezclocker.ezNavigation.ezGetPublicClassicApiUrl('subscriptionPlan');

        EzSubscriptionService.ezInstance._Internal_SubscriptionService_Base_Url =
            ezApi.ezclocker.ezNavigation.ezGetInternalClassicApiUrl('_subscriptionPlan');

        // public only?
        EzSubscriptionService.ezInstance._SubscriptionService_active_URI =
            `${EzSubscriptionService.ezInstance._Public_SubscriptionService_Base_Url}/active`;

        EzSubscriptionService.ezInstance._SubscriptionService_getCreditCardInfo_URI =
            `${EzSubscriptionService.ezInstance._Internal_SubscriptionService_Base_Url}/getCreditCardInfo`;

        EzSubscriptionService.ezInstance._SubscriptionService_getBillingInformation_URI =
            `${EzSubscriptionService.ezInstance._Internal_SubscriptionService_Base_Url}/getBillingInformation`;

        EzSubscriptionService.ezInstance._SubscriptionService_change_URI =
            `${EzSubscriptionService.ezInstance._Internal_SubscriptionService_Base_Url}/change`;

        EzSubscriptionService.ezInstance._SubscriptionService_subscribe_URI =
            `${EzSubscriptionService.ezInstance._Internal_SubscriptionService_Base_Url}/subscribe`;

        EzSubscriptionService.ezInstance._SubscriptionService_updateBillingAddress_URI =
            `${EzSubscriptionService.ezInstance._Internal_SubscriptionService_Base_Url}/updateBillingAddress`;

        EzSubscriptionService.ezInstance._SubscriptionService_updateCreditCard_URI =
            `${EzSubscriptionService.ezInstance._Internal_SubscriptionService_Base_Url}/updateCreditCard`;

        EzSubscriptionService.ezInstance._SubscriptionService_cancelCurrent_URI =
            `${EzSubscriptionService.ezInstance._Internal_SubscriptionService_Base_Url}/cancelCurrent`;

        return EzSubscriptionService.ezInstance;
    }

    /**
     * @public
     * Gets the available subscription plans.
     * @returns {Promise}
     */
    ezGetAvailablePlans() {
        return ezApi.ezclocker.ezHttpHelper.ezGet(
            ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl('subscriptions/plans/active'))
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
     * @public
     * Gets the available subscription plans
     * @param {Function|null} success
     * @param {Function|null} failure
     * @deprecated Migrate to ezApi.ezclocker.ezSubscriptionService.ezGetAvailablePlans()
     */
    getAvailablePlans(success, failure) {
        return ezApi.ezclocker.ezHttpHelper.ezGet(
            ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl('subscriptions/plans/active'))
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
            .then(
                (response, jqXHR) => EzFunction.callBack(success, response, jqXHR),
                (errorResponse, jqXHR) => EzFunction.callBack(failure, errorResponse, jqXHR));
    }

    /**
     * @public
     * Gets the active employer's credit card information
     * NOTE: Requires the logged in user to have the ROLE_EMPLOYER
     * @returns {Promise}
     */
    ezGetSelectedEmployerCreditCardInfo() {
        if (!EzObject.isValid(ezApi.ezclocker.ezClockerContext.ezUserContext())) {
            throw new EzException(
                EzString.em`
                    The EzClockerContext user context is required in
                    ezSubscriptionService.ezGetSelectedEmployerCreditCardInfo`);
        }
        if (!EzObject.isValid(ezApi.ezclocker.ezClockerContext.ezGetEmployerContext())) {
            throw new EzException(
                EzString.em`
                    The EzClockerContext employer context is required in
                    ezSubscriptionService.ezGetSelectedEmployerCreditCardInfo`);
        }
        if (!ezApi.ezclocker.ezClockerContext.ezUserContext().isEmployer) {
            throw new EzException(
                'Only Employer accounts can get the Employer account\'s credit card information.');
        }

        return ezApi.ezclocker.ezHttpHelper.ezGet(
            ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl('subscriptions/credit-card'))
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);
    }

    /**
     * @public
     * Gets the credit card information for the employer associated with the provided employerId
     * NOTE: Requires the logged in user to have the ROLE_EMPLOYER
     * @returns {Promise}
     * @deprecated Migrate to ezApi.ezclocker.ezSubscriptionService.ezGetSelectedEmployerCreditCardInfo()
     */
    getCreditCardInformation(employerId) {
        if (EzBoolean.isFalse(employerId)) {
            throw new EzBadParamException(
                'employerId',
                EzSubscriptionService.ezInstance,
                EzSubscriptionService.ezInstance.getCreditCardInformation);
        }

        if (EzBoolean.isFalse(ezApi.ezclocker.ezClockerContext.ezUserHasRole(EzUserRole.ROLE_EMPLOYER))) {
            return ezApi.ezShowUnauthorizedDialogAndSignout(
                'You do not have authorization ',
                'to update the Employer account\'s credit card information.',
                false);
        }

        let url = ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
            `${EzSubscriptionService.ezInstance._SubscriptionService_getCreditCardInfo_URI}/${employerId}`);

        return ezApi.ezclocker.ezHttpHelper.ezGet(url)
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);
    }

    /**
     * @public
     * Updates the credit card information
     * NOTE: Requires the logged in user to have the ROLE_EMPLOYER
     * @param {number} employerId
     * @param {string} formData
     * @param {function} success
     * @param {function} failure
     * @deprecated Migrate to ezApi.ezclocker.ezSubscriptionService.ezUpdateCreditCard()
     */
    putCreditCardInformation(employerId, formData, success, failure) {
        if (!EzObject.isValid(employerId)) {
            throw new EzBadParamException(
                'employerId',
                EzSubscriptionService.ezInstance,
                EzSubscriptionService.ezInstance.putCreditCardInformation);
        }
        if (!EzObject.isValid(formData)) {
            throw new EzBadParamException(
                'formData',
                EzSubscriptionService.ezInstance,
                EzSubscriptionService.ezInstance.putCreditCardInformation);
        }

        if (EzBoolean.isFalse(ezApi.ezclocker.ezClockerContext.ezUserHasRole(EzUserRole.ROLE_EMPLOYER))) {
            return ezApi.ezShowUnauthorizedDialogAndSignout(
                'You do not have authorization ',
                'to update the Employer account\'s credit card information.',
                false);
        }

        if (!EzNumber.isNumber(employerId)) {
            ezApi.ezShowUnauthorizedDialogAndSignout(
                'You do not have authorization ',
                'to get the Employer account\'s credit card information.',
                false)
                .then(
                    ezApi.ezIgnoreResolve,
                    (eResponse, jqXHR) => EzFunction.callBack(failure, eResponse, jqXHR));
        }

        return ezApi.ezclocker.ezHttpHelper.httpPOSTForm(
            `${EzSubscriptionService.ezInstance._SubscriptionService_updateCreditCard_URI}/${employerId}`,
            formData,
            (response, jqXHR) => EzFunction.callBack(success, response, jqXHR),
            (errorResponse, jqXHR) => {
                ezApi.ezclocker.ezLogger.error(errorResponse);
                EzFunction.callBack(failure, errorResponse, jqXHR);
            });
    }

    /**
     * @public
     * Updates the credit card information for employer associated with the provided employerId.
     * NOTE: Requires the logged in user to have the ROLE_EMPLOYER
     * @param {Number} employerId
     * @param {String} cardHolderName
     * @param {String} cardNumber
     * @param {String} cardExpireDate
     * @param {String} cardSpecialNumber
     * @param {String} creditCardZipCode
     * @returns {Promise}
     */
    ezUpdateCreditCard(employerId, cardHolderName, cardNumber, cardExpireDate, cardSpecialNumber, creditCardZipCode) {
        if (!EzObject.isValid(employerId)) {
            throw new EzBadParamException(
                'employerId',
                EzSubscriptionService.ezInstance,
                EzSubscriptionService.ezInstance.ezUpdateCreditCard);
        }

        if (EzBoolean.isFalse(ezApi.ezclocker.ezClockerContext.ezUserHasRole(EzUserRole.ROLE_EMPLOYER))) {
            return ezApi.ezShowUnauthorizedDialogAndSignout(
                'You do not have authorization ',
                'to update the Employer account\'s credit card information.',
                false);
        }

        return ezApi.ezclocker.ezHttpHelper.ezPut(
            ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl('subscriptions/credit-card'),
            EzJson.toJson({
                cardHolderName: ezApi.ezStringOrEmpty(cardHolderName),
                cardExpireDate: ezApi.ezStringOrEmpty(cardExpireDate),
                cardNumber: ezApi.ezStringOrEmpty(cardNumber),
                cardSpecialNumber: ezApi.ezStringOrEmpty(cardSpecialNumber),
                creditCardZipCode: ezApi.ezStringOrEmpty(creditCardZipCode)
            }))
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);
    }

    /**
     * @public
     * Builds the update credit card request object
     * @param {String} cardHolderName
     * @param {String} cardNumber
     * @param {String} cardExpireDate
     * @param {String} cardSpecialNumber
     * @param {String} cardZipCode
     */
    ezBuildUpdateCreditCardRequest(cardHolderName, cardNumber, cardExpireDate, cardSpecialNumber, cardZipCode) {
        return {
            cardHolderName: ezApi.ezStringOrEmpty(cardHolderName, ''),
            cardNumber: ezApi.ezStringOrEmpty(cardNumber, ''),
            cardExpireDate: ezApi.ezStringOrEmpty(cardExpireDate, ''),
            cardSpecialNumber: ezApi.ezStringOrEmpty(cardSpecialNumber, ''),
            cardZipCode: ezApi.ezStringOrEmpty(cardZipCode, '')
        };
    }

    /**
     * @public
     * Updates the active employer's credit card.
     * NOTE: Requires the logged in user to have the ROLE_EMPLOYER
     * @param {Object} updateCreditCardRequest
     * @returns {Promise}
     */
    ezUpdateActiveEmployerCreditCard(updateCreditCardRequest) {
        if (!EzObject.isValid(updateCreditCardRequest)) {
            throw new EzBadParamException(
                'updateCreditCardRequest',
                EzSubscriptionService.ezInstance,
                EzSubscriptionService.ezInstance.ezUpdateActiveEmployerCreditCard);
        }

        if (EzBoolean.isFalse(ezApi.ezclocker.ezClockerContext.ezUserHasRole(EzUserRole.ROLE_EMPLOYER))) {
            return ezApi.ezShowUnauthorizedDialogAndSignout(
                'You do not have authorization to update the Employer account\'s credit card information.',
                false);
        }

        return ezApi.ezclocker.ezHttpHelper.ezPut(
            ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl('subscriptions/credit-card'),
            EzJson.toJson(updateCreditCardRequest))
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);
    }

    /**
     * @public
     * Gets the active employer's billing information
     * NOTE: Requires the logged in user to have the ROLE_EMPLOYER
     * @returns {Promise}
     */
    ezGetSelectedEmployerBillingInformation() {
        if (!EzObject.isValid(ezApi.ezclocker.ezClockerContext.ezGetUserContext())) {
            throw new EzException(
                EzString.em`
                    A EzClockerContext user context is required for
                    EzSubscriptionService.ezGetSelectedEmployerBillingInformation`);
        }
        if (EzBoolean.isFalse(ezApi.ezclocker.ezClockerContext.ezGetUserContext().isEmployer)) {
            return ezApi.ezShowUnauthorizedDialogAndSignout(
                'You do not have authorization ',
                'to get the Employer account\'s credit card information.',
                false);
        }

        return ezApi.ezclocker.ezHttpHelper.ezGet(
            ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                `subscriptions/billing-information?time-zone-id=${ezApi.ezclocker.ezDateTime.activeTimeZone}`))
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);
    }

    /**
     * @pubic @method
     * Returns the subscription plan with the braintree plan name that equals the one provided.
     * @param {string} braintreePlanName
     * @returns {Promise}
     */
    ezGetSubscriptionPlanForBraintreePlanName(braintreePlanName) {
        if (!EzString.stringHasLength(braintreePlanName)) {
            throw new EzBadParamException(
                'braintreePlanName',
                this,
                this.ezGetSubscriptionPlanIdForBraintreePlanName);
        }

        return ezApi.ezclocker.ezHttpHelper.ezGet(
            ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                `subscriptions/braintree/${braintreePlanName}`))
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);
    }

    /**
     * @public
     * Gets the billing information for the provided employerId
     * NOTE: Requires the logged in user to have the ROLE_EMPLOYER
     * @param {Number} employerId
     * @param {Function} success
     * @param {Function} failure
     * @deprecated Migrate to ezApi.ezclocker.ezSubscriptionService.ezGetBillingInformation()
     */
    getBillingInformation(employerId, success, failure) {
        if (!EzObject.isValid(employerId)) {
            throw new EzBadParamException(
                'employerId',
                EzSubscriptionService.ezInstance,
                EzSubscriptionService.ezInstance.getBillingInformation);
        }

        if (EzBoolean.isFalse(ezApi.ezclocker.ezClockerContext.ezUserHasRole(EzUserRole.ROLE_EMPLOYER))) {
            return ezApi.ezShowUnauthorizedDialogAndSignout(
                'You do not have authorization ',
                'to update the Employer account\'s credit card information.',
                false);
        }

        let url = ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl('subscriptions/billing-information');

        return ezApi.ezclocker.ezHttpHelper.ezGet(url)
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
            .then(
                (response, jqXHR) => EzFunction.callBack(success, response, jqXHR),
                (errorResponse, jqXHR) => EzFunction.callBack(failure, errorResponse, jqXHR));
    }

    /**
     * @public
     * Creates the UpdateBillingAddress request object.
     * WARNING: Must now use the returned object's toJson property instead of JSON.serialize or ezApi.toJson()
     * @param {String} companyName
     * @param {String} billingFirstName
     * @param {String} billingLastName
     * @param {String} billingContactName
     * @param {String} billingStreetAddress
     * @param {String} billlingAdditionalAddress
     * @param {String} billingCity
     * @param {String} billingState
     * @param {String} billingPostalCode
     * @param {String} billingCountry
     * @param {String} billingEmail
     * @param {String} billingContactNumber
     * @returns {EzUpdateBillingAddressRequest}
     * @deprecated
     * Migrate to create a new instance of EzUpdateBillingAddressRequest instead of using this method.
     */
    ezCreateUpdateBillingAddressRequest(companyName, billingFirstName, billingLastName, billingContactName,
        billingStreetAddress, billingAdditionalAddress, billingCity, billingState, billingPostalCode,
        billingCountry, billingEmail, billingContactNumber) {
        return new EzUpdateBillingAddressRequest(
            companyName,
            billingFirstName,
            billingLastName,
            billingContactName,
            billingStreetAddress,
            billingAdditionalAddress,
            billingCity,
            billingState,
            billingPostalCode,
            billingCountry,
            billingEmail,
            billingContactNumber);
    }

    /**
     * @public @method
     * Updates the active employer's billing address.
     * @param {EzBillingAddress} ezBillingAddress
     * @returns {Promise.resolve}
     */
    ezUpdateActiveEmployerBillingAddress(ezBillingAddress) {
        if (!EzObject.isValid(ezBillingAddress)) {
            throw new EzBadParamException(
                'updatedBillingAddress',
                EzSubscriptionService.ezInstance,
                EzSubscriptionService.ezInstance.ezBillingAddress);
        }

        if (EzBoolean.isFalse(ezApi.ezclocker.ezClockerContext.ezUserHasRole(EzUserRole.ROLE_EMPLOYER))) {
            return ezApi.ezShowUnauthorizedDialogAndSignout(
                'You do not have authorization ',
                'to update the Employer account\'s credit card information.',
                false);
        }

        let url = ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl('subscriptions/billing-address');

        return ezApi.ezclocker.ezHttpHelper.ezPut(
            url,
            EzJson.toJson(ezBillingAddress.toEzBillingInformationJsonObject))
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);
    }

    /**
     * @public
     * Updates the subscription's billing address
     * NOTE: Requires the logged in user to have the ROLE_EMPLOYER
     * @param {Number} employerId
     * @param {String} formData
     * @returns {Promise}
     * @deprecated Migrate to ezApi.ezclocker.ezSubscriptionService.ezUpdateEmployerBillingAddress()
     */
    putBillingAddress(employerId, formData) {
        if (!ezApi.eIsValid(employerId)) {
            throw new EzBadParamException(
                'employerId',
                EzSubscriptionService.ezInstance,
                EzSubscriptionService.ezInstance.putBillingAddress);
        }
        if (!EzObject.isValid(formData)) {
            throw new EzBadParamException(
                'formData',
                EzSubscriptionService.ezInstance,
                EzSubscriptionService.ezInstance.putBillingAddress);
        }

        if (EzBoolean.isFalse(ezApi.ezclocker.ezClockerContext.ezUserHasRole(EzUserRole.ROLE_EMPLOYER))) {
            return ezApi.ezShowUnauthorizedDialogAndSignout(
                'You do not have authorization ',
                'to update the Employer account\'s credit card information.',
                false);
        }

        let url = EzUrl.build`
            ${EzSubscriptionService.ezInstance._SubscriptionService_updateBillingAddress_URI}/
            ${employerId}`;

        return ezApi.ezclocker.ezHttpHelper.ezPostForm(url, formData)
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);
    }

    /**
     * @public
     * Changes the active employer's subscription plan.
     * Requires the logged in user to have the ROLE_EMPLOYER
     * @param {Number} subscriptionId
     * @param {EzPaymentInfoRequest} ezPaymentInfoRequest
     * @returns {Promise}
     */
    ezChangeEmployerSubscriptionPlan(subscriptionId, ezPaymentInfoRequest) {
        if (!EzNumber.isNumber(subscriptionId)) {
            throw new EzBadParamException(
                'subscriptionId',
                EzSubscriptionService.ezInstance,
                EzSubscriptionService.ezInstance.ezChangeEmployerSubscriptionPlan);
        }
        if (!EzObject.isValid(ezPaymentInfoRequest)) {
            throw new EzBadParamException(
                'ezPaymentInfoRequest',
                EzSubscriptionService.ezInstance,
                EzSubscriptionService.ezInstance.ezChangeEmployerSubscriptionPlan);
        }

        if (EzBoolean.isFalse(ezApi.ezclocker.ezClockerContext.ezUserHasRole(EzUserRole.ROLE_EMPLOYER))) {
            return ezApi.ezShowUnauthorizedDialogAndSignout(
                'You do not have authorization ',
                'to update the Employer account\'s credit card information.',
                false);
        }

        return ezApi.ezclocker.ezHttpHelper.ezPut(
            ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                EzUrl.build`
                    subscriptions/employer/subscribe/
                    ${subscriptionId}
                    ?time-zone-id=${ezApi.ezclocker.ezDateTime.activeTimeZone}`),
            ezPaymentInfoRequest.toJson)
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);
    }

    /**
     * @public
     * Changes the subscription for the employer associated with the provided employerId
     * NOTE: Requires the logged in user to have the ROLE_EMPLOYER
     * @param {Number} employerId
     * @param {Number} subscriptionId
     * @param {Function|null} success
     * @param {Function|null} failure
     * @deprecated Migrate to ezApi.ezclocker.ezSubscriptionService.ezChangeEmployerSubscriptionPlan()
     */
    changeSubscriptionPlan(employerId, subscriptionId, success, failure) {
        if (!EzNumber.isNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                EzSubscriptionService.ezInstance,
                EzSubscriptionService.ezInstance.changeSubscriptionPlan);
        }
        if (!EzObject.isValid(subscriptionId)) {
            throw new EzBadParamException(
                'subscriptionId',
                EzSubscriptionService.ezInstance,
                EzSubscriptionService.ezInstance.changeSubscriptionPlan);
        }

        if (EzBoolean.isFalse(ezApi.ezclocker.ezClockerContext.ezUserHasRole(EzUserRole.ROLE_EMPLOYER))) {
            return ezApi.ezShowUnauthorizedDialogAndSignout(
                'You do not have authorization ',
                'to update the Employer account\'s credit card information.',
                false);
        }

        let url = ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
            EzUrl.build`
                subscriptions/subscribe/
                ${subscriptionId}
                ?time-zone-id=${ezApi.ezclocker.ezDateTime.activeTimeZone}`);

        return ezApi.ezclocker.ezHttpHelper.ezPut(url)
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
            .then(
                (response, jqXHR) => EzFunction.callBack(success, response, jqXHR),
                (eResponse, jqXHR) => EzFunction.callBack(failure, eResponse, jqXHR));
    }

    /**
     * @public
     * Creates the request to subscribe an employer account
     * @param {String} aCompanyName
     * @param {String} aBillingFirstName
     * @param {String} aBillingLastName
     * @param {String} aBillingStreetAddress
     * @param {String} aBillingAdditionalAddress
     * @param {String} aBillingCity
     * @param {String} aBillingState
     * @param {String} aBillingPostalCode
     * @param {String} aBillingCountry
     * @param {String} aBillingEmail
     * @param {String} aBillingContactNumber
     * @param {String} aDiscountId
     * @deprecated
     * Migrate to creating a new EzBilllingInfoRequest object instead.
     */
    ezCreateBillingInfoRequest(aCompanyName, aBillingFirstName, aBillingLastName,
        aBillingStreetAddress, aBillingAdditionalAddress, aBillingCity, aBillingState, aBillingPostalCode,
        aBillingCountry, aBillingEmail, aBillingContactNumber, aCardHolderName, aCardNumber, aCardExpireDate,
        aCardSpecialNumber, aCardZipCode, aDiscountId) {
        return new EzBillingInfoRequest(
            aCompanyName,
            aBillingFirstName,
            aBillingLastName,
            aBillingStreetAddress,
            aBillingAdditionalAddress,
            aBillingCity,
            aBillingState,
            aBillingPostalCode,
            aBillingCountry,
            aBillingEmail,
            aBillingContactNumber,
            aCardHolderName,
            aCardNumber,
            aCardExpireDate,
            aCardSpecialNumber,
            aCardZipCode,
            aDiscountId);
    }

    /**
     * @public
     * Creates the request to subscribe an employer account
     * @param {String} aCompanyName
     * @param {String} aBillingFirstName
     * @param {String} aBillingLastName
     * @param {String} aBillingStreetAddress
     * @param {String} aBillingAdditionalAddress
     * @param {String} aBillingCity
     * @param {String} aBillingState
     * @param {String} aBillingPostalCode
     * @param {String} aBillingCountry
     * @param {String} aBillingEmail
     * @param {String} aBillingContactNumber
     * @param {String} aDiscountId
     * @deprecated
     * Migrate to creating new EzBillingAddress, EzCreditCard, and EzPaymentInfoRequest objects
     * instead of using this method.
     */
    ezCreatePaymentInfoRequest(aCompanyName, aBillingFirstName, aBillingLastName,
        aBillingStreetAddress, aBillingAdditionalAddress, aBillingCity, aBillingState, aBillingPostalCode,
        aBillingCountry, aBillingEmail, aBillingContactNumber, aCardHolderName, aCardNumber, aCardExpireDate,
        aCardSpecialNumber, aCardZipCode, aDiscountId) {

        let ezBillingAddress = new EzBillingAddress(
            // employerId
            null,
            // employeeId
            null,
            // personalId
            null,
            // companyName
            aCompanyName,
            // firstName
            aBillingFirstName,
            // lastName
            aBillingLastName,
            // streetAddress
            aBillingStreetAddress,
            // extendedAddress
            aBillingAdditionalAddress,
            // locality
            aBillingCity,
            // region
            aBillingState,
            // postalCode
            aBillingPostalCode,
            // countryName
            aBillingCountry,
            // contactEmail
            aBillingEmail,
            // contactPhone
            aBillingContactNumber,
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
            null);

        let ezCreditCard = new EzCreditCard(
            aCardHolderName,
            aCardNumber,
            aCardExpireDate,
            aCardSpecialNumber,
            aCardZipCode,
            aDiscountId);

        return new EzPaymentInfoRequest(
            ezBillingAddress,
            ezCreditCard);
    }

    /**
     * @public
     * Subscribes the active employer to the provided subscriptionPlanId with the provided billingInfoReuqest
     * @param {Number} subscriptionPlanId
     * @param {EzPaymentInfoRequest} paymentInfoRequest
     * @returns {Promise}
     */
    ezSubcribeEmployerToPlan(subscriptionPlanId, paymentInfoRequest) {
        if (!EzNumber.isNumber(subscriptionPlanId)) {
            throw new EzBadParamException(
                'subscriptionPlanId',
                EzSubscriptionService.ezInstance,
                EzSubscriptionService.ezInstance.ezSubcribeActiveEmployerToPlan);
        }
        if (!EzObject.isValid(paymentInfoRequest)) {
            throw new EzBadParamException(
                'paymentInfoRequest',
                EzSubscriptionService.ezInstance,
                EzSubscriptionService.ezInstance.ezSubcribeActiveEmployerToPlan);
        }

        if (EzBoolean.isFalse(ezApi.ezclocker.ezClockerContext.ezUserHasRole(EzUserRole.ROLE_EMPLOYER))) {
            return ezApi.ezShowUnauthorizedDialogAndSignout(
                'You do not have authorization ',
                'to subscribe to an ezClocker subscription plan.',
                false);
        }

        let url = ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
            EzUrl.build`
                subscriptions/employer/subscribe/
                ${subscriptionPlanId}
                ?time-zone-id=${ezApi.ezclocker.ezDateTime.activeTimeZone}`);

        return ezApi.ezclocker.ezHttpHelper.ezPost(
            url,
            EzJson.toJson(paymentInfoRequest))
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);
    }

    /**
     * @public
     * Subscribes the active employer to the provided subscriptionPlanId with the provided billingInfoReuqest
     * @param {Number} subscriptionPlanId
     * @param {EzPaymentInfoRequest} paymentInfoRequest
     * @returns {Promise}
     */
    ezSubmitPaymentForSubscription(subscriptionPlanId, paymentInfoRequest) {
        if (!EzNumber.isNumber(subscriptionPlanId)) {
            throw new EzBadParamException(
                'subscriptionPlanId',
                EzSubscriptionService.ezInstance,
                EzSubscriptionService.ezInstance.ezSubcribeActiveEmployerToPlan);
        }
        if (!EzObject.isValid(paymentInfoRequest)) {
            throw new EzBadParamException(
                'paymentInfoRequest',
                EzSubscriptionService.ezInstance,
                EzSubscriptionService.ezInstance.ezSubcribeActiveEmployerToPlan);
        }

        if (EzBoolean.isFalse(ezApi.ezclocker.ezClockerContext.ezUserHasRole(EzUserRole.ROLE_EMPLOYER))) {
            return ezApi.ezShowUnauthorizedDialogAndSignout(
                'You do not have authorization ',
                'to update the Employer account\'s credit card information.',
                false);
        }

        let url = ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
            EzUrl.build`
                subscriptions/employer/payment/
                ${subscriptionPlanId}
                ?time-zone-id=${ezApi.ezclocker.ezDateTime.activeTimeZone}`);

        return ezApi.ezclocker.ezHttpHelper.ezPost(url, paymentInfoRequest.toJson)
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);
    }

    /**
     * @public
     * Subscribes to a plan for the employer associated with the provided employerId
     * NOTE: Requires the logged in user to have the ROLE_EMPLOYER
     * @param {Number} subscriptionId
     * @param {String} formData
     * @returns {Promise}
     * @deprecated Migrate to:
     *      ezApi.ezclocker.ezSubscriptions.ezSubcribeEmployerToPlan(
     *          subscriptionPlanId,
     *          paymentInfoRequest)
     */
    ezSubscribeToPlan(subscriptionId, formData) {
        if (!EzNumber.isNumber(subscriptionId)) {
            throw new EzBadParamException(
                'subscriptionId',
                EzSubscriptionService.ezInstance,
                EzSubscriptionService.ezInstance.ezSubscribeToPlan);
        }
        if (!EzObject.isValid(formData)) {
            throw new EzBadParamException(
                'formData',
                EzSubscriptionService.ezInstance,
                EzSubscriptionService.ezInstance.ezSubscribeToPlan);
        }

        if (EzBoolean.isFalse(ezApi.ezclocker.ezClockerContext.ezUserHasRole(EzUserRole.ROLE_EMPLOYER))) {
            return ezApi.ezShowUnauthorizedDialogAndSignout(
                'You do not have authorization ',
                'to update the Employer account\'s credit card information.',
                false);
        }

        let url = ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
            EzUrl.build`
                subscriptions/subscribe/
                ${subscriptionId}
                ?time-zone-id=${ezApi.ezclocker.ezDateTime.activeTimeZone}`);

        return ezApi.ezclocker.ezHttpHelper.ezPostForm(url, formData)
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);
    }

    /**
     * @public
     * Subscribes to a plan for the employer associated with the provided employerId
     * NOTE: Requires the logged in user to have the ROLE_EMPLOYER
     * @param {Number} employerId
     * @param {Number} subscriptionId
     * @param {String} formData
     * @param {Function|null} success
     * @param {Function|null} failure
     * @deprecated
     * Migrate to:
     *     EzSubscriptionService.ezInstance.ezSubcribeEmployerToPlan(
     *         subscriptionPlanId,
     *         paymentInfoRequest)
     */
    subscribeToPlanWithFormData(employerId, subscriptionId, formData, success, failure) {
        if (!EzNumber.isNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                EzSubscriptionService.ezInstance,
                EzSubscriptionService.ezInstance.subscribeToPlanWithFormData);
        }
        if (!EzNumber.isNumber(subscriptionId)) {
            throw new EzBadParamException(
                'subscriptionId',
                EzSubscriptionService.ezInstance,
                EzSubscriptionService.ezInstance.subscribeToPlanWithFormData);
        }
        if (!EzObject.isValid(formData)) {
            throw new EzBadParamException(
                'formData',
                EzSubscriptionService.ezInstance,
                EzSubscriptionService.ezInstance.subscribeToPlanWithFormData);
        }

        if (EzBoolean.isFalse(ezApi.ezclocker.ezClockerContext.ezUserHasRole(EzUserRole.ROLE_EMPLOYER))) {
            return ezApi.ezShowUnauthorizedDialogAndSignout(
                'You do not have authorization ',
                'to update the Employer account\'s credit card information.',
                false);
        }

        let url = EzUrl.build`
            ${EzSubscriptionService.ezInstance._SubscriptionService_subscribe_URI}/
            ${employerId}/
            ${subscriptionId}`;

        return ezApi.ezclocker.ezHttpHelper.ezPostForm(url, formData)
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
            .then(
                (response, jqXHR) => EzFunction.callBack(success, response, jqXHR),
                (eResponse, jqXHR) => EzFunction.callBack(failure, eResponse, jqXHR));
    }

    /**
     * @public
     * Cancels the subscription of the employer associated with the provided employerId
     * NOTE: Requires the logged in user to have the ROLE_EMPLOYER
     * @param {Number} employerId
     * @returns {Promise}
     */
    ezCancelActiveEmployerSubscription() {
        if (EzBoolean.isFalse(ezApi.ezclocker.ezClockerContext.ezUserHasRole(EzUserRole.ROLE_EMPLOYER))) {
            return ezApi.ezShowUnauthorizedDialogAndSignout(
                'You do not have authorization',
                ' to update the Employer account\'s credit card information.',
                false);
        }

        let url = ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
            EzUrl.build`
                subscriptions/employer/cancel
                ?time-zone-id=${ezApi.ezclocker.ezDateTime.activeTimeZone}`);

        return ezApi.ezclocker.ezHttpHelper.ezPost(url)
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);
    }

    /**
     * @public
     * Cancels the subscription of the employer associated with the provided employerId
     * Requires the logged in user to have the ROLE_EMPLOYER
     * @param {Number} employerId
     * @param {Function|null} success
     * @param {Function|null} failure
     * @deprecated
     * Migrate to:
     *  EzSubscriptionService.ezInstance.ezCancelActiveEmployerSubscription()
     */
    ezCancelSubscription(employerId, success, failure) {
        if (!EzNumber.isNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                EzSubscriptionService.ezInstance,
                EzSubscriptionService.ezInstance.ezCancelSubscription);
        }

        if (EzBoolean.isFalse(ezApi.ezclocker.ezClockerContext.ezUserHasRole(EzUserRole.ROLE_EMPLOYER))) {
            return ezApi.ezShowUnauthorizedDialogAndSignout(
                'You do not have authorization',
                ' to update the Employer account\'s credit card information.',
                false);
        }

        let url = EzUrl.build`
            ${EzSubscriptionService.ezInstance._SubscriptionService_cancelCurrent_URI}/
            ${employerId}`;

        return ezApi.ezclocker.ezHttpHelper.ezPut(url)
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
            .then(
                (response, jqXHR) => EzFunction.callBack(success, response, jqXHR),
                (errorResponse, jqXHR) => EzFunction.callBack(failure, errorResponse, jqXHR));
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
        return 'ezSubscriptionService';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzSubscriptionService_Ready'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzSubscriptionService}
     */
    static #ezInstance = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzSubscriptionService.ezApiName]
        ? globalThis.ezApi.ezclocker[EzSubscriptionService.ezApiName]
        : null;
    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzSubscriptionService}
     */
    static get ezInstance() {
        return EzSubscriptionService.#ezInstance;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzSubscriptionService} instance
     */
    static set ezInstance(instance) {
        if (null != EzSubscriptionService.#ezInstance) {
            ezApi.ezclocker.ezLogger.error('EzBillingAddressDialog\'s singleton instance is already assigned.');
            return;
        }

        EzSubscriptionService.#ezInstance = instance;
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
    static #ezApiRegistrationState = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzSubscriptionService.ezApiName]
        ? EzRegistrationState.REGISTERED
        : null;
    /**
     * @public @static @property @getter
     * @returns {string}
     * A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzSubscriptionService.#ezApiRegistrationState;
    }
    /**
     * @public @static @property @setter
     * @param {string} registrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(registrationState) {
        EzSubscriptionService.#ezApiRegistrationState = EzRegistrationState.ezValueOf(registrationState);
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
        return EzRegistrationState.PENDING === EzSubscriptionService.ezApiRegistrationState &&
            globalThis?.ezApi?.ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzSubscriptionService.ezInstance &&
            EzRegistrationState.REGISTERED === EzSubscriptionService.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzSubscriptionService.#ezCanRegister && !EzSubscriptionService.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzSubscriptionService, EzSubscriptionService.ezApiName);

            EzSubscriptionService.ezApiRegistrationState = EzRegistrationState.REGISTERED;
        }

        return EzSubscriptionService.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzSubscriptionService.ezApiName
     *     2) Property getter EzSubscriptionService.ezEventNames
     *     3) Property getter EzSubscriptionService.ezInstance
     *     4) Property setter EzSubscriptionService.ezInstance
     *     5) Property getter EzSubscriptionService.ezApiRegistrationState
     *     6) Property setter EzSubscriptionService.ezApiRegistrationState
     *     7) Property getter EzSubscriptionService.#ezCanRegister
     *     8) Property getter EzSubscriptionService.#ezIsRegistered
     *     9) Method EzSubscriptionService.#ezRegistrator()
     */
    static {
        if (null == EzSubscriptionService.ezApiRegistrationState) {
            EzSubscriptionService.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzSubscriptionService.#ezRegistrator()) {
                document.addEventListener(
                    EzSubscriptionService.ezOnEzApiReadyEventName,
                    EzSubscriptionService.#ezRegistrator);
            }
        }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // NO CODE AFTER THIS SECTION
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}

import { EzJSONSerializable } from '/ezlibrary/entities/EzJSONSerializable.js';

import {
    EzObject,
    EzBoolean,
    EzString,
    EzArray,
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzBillingAddress } from '/ezlibrary/entities/EzBillingAddress.js';
import { EzCreditCard } from '/ezlibrary/entities/EzCreditCard.js';

/**
    Entity for Payment information ezClocker api requests.
    NOTE:
        To convert this object to a JSON string, use EzEmployeeInviteRequest.toJson() instead of
        JSON.serialize or ezApi.ezToJson()
    Import with:
        import { EzPaymentInfoRequest } from '/ezlibrary/entities/requests/EzPaymentInfoRequest.js';
 */
export class EzPaymentInfoRequest extends EzJSONSerializable {
    /**
        @public @constructor
        @param {null|undefined|EzBillingAddress} ezBillingAddress
        Default is a new EzBillingAddress instance
        @param {null|undefined|EzCreditCard} ezCreditCard
        Default is a new EzCreditCard instance
     */
    constructor(ezBillingAddress, ezCreditCard) {
        super();

        this.ezBillingAddress = ezBillingAddress;

        this.ezCreditCard = ezCreditCard;
    }

    #ezBillingAddress = new EzBillingAddress();
    /**
        @public @readonly @property
        Returns the stored EzBillingAddress instance.
        @returns {EzBillingAddress}
     */
    get ezBillingAddress() {
        return this.#ezBillingAddress;
    }
    /**
        @public @property @setter
        Sets the stored EzBillingAddress instance.
        @param {EzBillingAddress} ezBillingAddress
     */
    set ezBillingAddress(ezBillingAddress) {
        this.#ezBillingAddress = EzObject.assignOrDefault(
            ezBillingAddress,
            new EzBillingAddress());
    }

    /**
        @public @readonly @property
        Returns the stored EzBillingAddress instance.
        @returns {EzBillingAddress}
        @deprecated
        Migrate to:
        EzPaymentInfoRequest.ezBillingAddress()
     */
    get billingAddress() {
        return this.ezBillingAddress;
    }
    /**
        @public @property @setter
        Sets the stored EzBillingAddress instance.
        @param {EzBillingAddress} billingAddress
     */
    set billingAddress(billingAddress) {
        this.ezBillingAddress = billingAddress;
    }

    #ezCreditCard = new EzCreditCard();
    /**
        @public @property @getter
        Returns the stored EzCreditCard instance.
        @returns {EzCreditCard}
     */
    get ezCreditCard() {
        return this.#ezCreditCard;
    }
    /**
        @public @property @setter
        Sets the stored EzCreditCard instance.
        @param {EzCreditCard} ezCreditCard
     */
    set ezCreditCard(ezCreditCard) {
        this.#ezCreditCard = EzObject.assignOrDefault(
            ezCreditCard,
            new EzCreditCard());
    }

    /**
        @public @readonly @property
        Returns the stored EzCreditCard instance.
        @returns {EzCreditCard}
        @deprecated
        Migrate to:
        EzPaymentInfoRequest.ezCreditCard()
     */
    get creditCard() {
        return this.ezCreditCard;
    }
    /**
        @public @readonly @property
        Sets the stored EzCreditCard instance.
        @param {EzCreditCard} creditCard
        @deprecated
        Migrate to:
        EzPaymentInfoRequest.ezCreditCard()
     */
    set creditCard(ezCreditCard) {
        this.ezCreditCard = ezCreditCard;
    }

    /**
        @public @readonly @property
        Gets the stored EzCreditCard instance.
        @returns {EzCreditCard}
        @deprecated
        Migrate to:
        EzPaymentInfoRequest.ezCreditCard()
     */
    get creditCardInfo() {
        return this.ezCreditCard;
    }
    /**
        @public @readonly @property
        Sets the stored EzCreditCard instance.
        @param {EzCreditCard} ezCreditCard
        @deprecated
        Migrate to:
        EzPaymentInfoRequest.ezCreditCard()
     */
    set creditCardInfo(ezCreditCard) {
        this.ezCreditCard = ezCreditCard;
    }

    #providerSubscriptionId = '';
    /**
        @public @getter @property
        Returns the provider subscription id
        @returns {string}
     */
    get providerSubscriptionId() {
        return this.#providerSubscriptionId;
    }
    /**
        @public @getter @property
        Sets the provider subscription id
        @param {string}
     */
    set providerSubscriptionId(providerSubscriptionId) {
        this.#providerSubscriptionId = providerSubscriptionId;
    }

    #discountId = '';
    /**
        @public @getter @property
        Returns the discount id
        @returns {string}
     */
    get discountId() {
        return this.#discountId;
    }
     /**
        @public @getter @property
        Sets the discount id
        @param {string}
     */
    set discountId(discountId) {
        this.#discountId = EzString.stringOrEmpty(discountId);
    }

    #braintreeDiscounts = [];
    /**
        @public @getter @property
        Returns an array of braintree discounts
        @returns {array}
     */
    get braintreeDiscounts() {
        return this.#braintreeDiscounts;
    }
    /**
        @public @getter @property
        Sets the array of braintree discounts
        @param {array}
     */
    set braintreeDiscounts(braintreeDiscounts) {
        this.#braintreeDiscounts = EzArray.arrayOrEmpty(braintreeDiscounts);
    }

    #canceled = false;
    /**
        @public @getter @property
        Returns if the subscription is canceled
        @returns {boolean}
     */
    get canceled() {
        return this.#canceled;
    }
    /**
        @public @getter @property
        Sets if the subscription is canceled
        @param {boolean}
     */
    set canceled(canceled) {
        this.#canceled = EzBoolean.isTrue(canceled);
    }

    #subscriptionEndDate = '';
    /**
        @public @getter @property
        Returns the subscription end date iso
        @returns {string}
     */
    get subscriptionEndDate() {
        return this.#subscriptionEndDate;
    }
    /**
        @public @getter @property
        Sets the subscription end date iso
        @param {string}
     */
    set subscriptionEndDate(subscriptionEndDate) {
        this.#subscriptionEndDate = EzString.stringOrEmpty(subscriptionEndDate);
    }

    #subscriptionStartDate = '';
    /**
        @public @getter @property
        Returns the subscription start date iso
        @returns {string}
     */
    get subscriptionStartDate() {
        return this.#subscriptionStartDate;
    }
    /**
        @public @setter @property
        Sets the subscription start date iso
        @param {string}
     */
    set subscriptionStartDate(subscriptionStartDate) {
        this.#subscriptionStartDate = EzString.stringOrEmpty(subscriptionStartDate);
    }

    /**
        @public @method
        Returns this instance as a JSON object
        @returns {object}
        @deprecated
        Migrate to the inherited asJSONObject property
     */
    get toJsonObject() {
        return this.asJSONObject;
    }

    /**
        @public @method
        Returns this instance as a JSON string
        @returns {String}
        @deprecated
        Migrate to the inherited ezAsJSON property or ezToJSON() method
     */
    get toJson() {
        return this.asJSON;
    }

    /**
        @override
        @public @readonly @property
        Returns this instance as a JSON Object (will no longer have the getter/setter methods).
        Useful for serailization to JSON.
        @returns {object}
     */
    get asJSONObject() {
        return {
            subscriptionStartDate: this.subscriptionStartDate,
            subscriptionEndDate: this.subscriptionEndDate,
            providerSubscriptionId: this.providerSubscriptionId,
            discountId: this.discountId,
            braintreeDiscounts: this.braintreeDiscounts,
            canceled: this.canceled,
            billingAddress: this.ezBillingAddress.asJSONObject,
            creditCardInfo: this.ezCreditCard.asJSONObject
        };
    }

    /**
        @override
        @public @readonly @property
        Returns this instance as JSON string (no formatting)
        @returns {String}
     */
    get asJSON() {
        return super.asJSON;
    }

    /**
        @override
        @public @method
        Converts this instance into a JSON string with optional formatting.
        @param {undefined|null|Number} indentValue
        @param {undefined|null|Boolean} htmlDisplay
        @returns {String}
     */
    ezToJSON(indentValue, htmlDisplay) {
        return super.ezToJSON(indentValue, htmlDisplay);
    }

    /**
        @override
        @public @method
        Copies properties from the provided jsonObject to this instance (even if this instance does not define the property)
        @param {Object} jsonObject
        @returns {Object}
        Returns this instance with the key & values from the provided jsonObject.
     */
    ezFromJSONObject(jsonObject) {
        return super.ezFromJSONObject(jsonObject);
    }

    /**
        @override
        @public @method
        Converts the provided jsonString to a JSON object and then
        passes that object to ezFromJSONObject() to copies properties to this instance
        (even if this instance does not define the property)
        @param {String} jsonString
        @returns {Object}
        Returns this instance with the key & values from the provided json string.
     */
    ezLoadFromJson(jsonString) {
        return super.ezLoadFromJson(jsonString);
    }
}

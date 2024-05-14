import { EzJSONSerializable } from '/ezlibrary/entities/EzJSONSerializable.js';

import {
    EzObject,
    EzString
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzCreditCardType } from '/ezlibrary/enums/EzCreditCardType.js';

/**
 * @class
 * @extends {EzJSONSerializable}
 * @description
 * Represents a Credit Card entity
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * WARNING: Using JSON.serialize will NOT return the getter/setter properties.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * To convert this object to a JSON string either use the
 * EzCreditCard.asJSON property or serialize the object via
 * ezApi.ezToJson so that the getters/setters serialize property.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *     import { EzCreditCard } from '/ezlibrary/entities/EzCreditCard.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzCreditCard extends EzJSONSerializable {
    /**
     * @public @constructor
     * @param {undefined|null|string} cardHolderName
     * @param {undefined|null|string} cardNumber
     * @param {undefined|null|string} cardExpireDate
     * @param {undefined|null|string} cardSpecialNumber
     * @param {undefined|null|string} cardZipCode
     * @param {undefined|null|string} discountId
     * @param {undefined|null|string} cardType
     * @param {undefined|null|string} cardImageUrl
     */
    constructor(
        cardHolderName = EzString.empty,
        cardNumber = EzString.empty,
        cardExpireDate = EzString.empty,
        cardSpecialNumber = EzString.empty,
        cardZipCode = EzString.empty,
        discountId = EzString.empty,
        ezCreditCardType = EzString.empty,
        cardImageUrl = EzString.empty,
        lastFour = EzString.empty) {
        super();

        this.cardHolderName = cardHolderName;
        this.cardNumber = cardNumber;
        this.cardExpireDate = cardExpireDate;
        this.cardSpecialNumber = cardSpecialNumber;
        this.cardZipCode = cardZipCode;
        this.discountId = discountId;
        this.cardType = ezCreditCardType;
        this.cardImageUrl = cardImageUrl;
        this.cardLastFour = lastFour;
    }

    /**
     * @private @field
     * Stores
     * @type {string}
     */
    #providerCustomerId = '';
    /**
     * @public @property @getter
     * Gets
     * @returns {string}
     */
    get providerCustomerId() {
        return this.#providerCustomerId;
    }
    /**
     * @public @property @setter
     * Sets
     * @param {string} cardLastFour
     */
    set providerCustomerId(providerCustomerId) {
        this.#providerCustomerId = EzString.stringOrEmpty(providerCustomerId);
    }

    /**
     * @private @field
     * Stores
     * @type {string}
     */
    #companyName = '';
    /**
     * @public @property @getter
     * Gets
     * @returns {string}
     */
    get companyName() {
        return this.#companyName;
    }
    /**
     * @public @property @setter
     * Sets
     * @param {string} cardLastFour
     */
    set companyName(companyName) {
        this.#companyName = EzString.stringOrEmpty(companyName);
    }

    /**
     * @private @field
     * Stores
     * @type {string}
     */
    #billingFirstName = '';
    /**
     * @public @property @getter
     * Gets
     * @returns {string}
     */
    get billingFirstName() {
        return this.#billingFirstName;
    }
    /**
     * @public @property @setter
     * Sets
     * @param {string} cardLastFour
     */
    set billingFirstName(billingFirstName) {
        this.#billingFirstName = EzString.stringOrEmpty(billingFirstName);
    }

    /**
     * @private @field
     * Stores
     * @type {string}
     */
    #billingLastName = '';
    /**
     * @public @property @getter
     * Gets
     * @returns {string}
     */
    get billingLastName() {
        return this.#billingLastName;
    }
    /**
     * @public @property @setter
     * Sets
     * @param {string} cardLastFour
     */
    set billingLastName(billingLastName) {
        this.#billingLastName = EzString.stringOrEmpty(billingLastName);
    }

    /**
     * @private @field
     * Stores
     * @type {string}
     */
    #billingEmail = '';
    /**
     * @public @property @getter
     * Gets
     * @returns {string}
     */
    get billingEmail() {
        return this.#billingEmail;
    }
    /**
     * @public @property @setter
     * Sets
     * @param {string} cardLastFour
     */
    set billingEmail(billingEmail) {
        this.#billingEmail = EzString.stringOrEmpty(billingEmail);
    }

    /**
     * @private @field
     * Stores
     * @type {string}
     */
    #billingContactNumber = '';
    /**
     * @public @property @getter
     * Gets
     * @returns {string}
     */
    get billingContactNumber() {
        return this.#billingContactNumber;
    }
    /**
     * @public @property @setter
     * Sets
     * @param {string} cardLastFour
     */
    set billingContactNumber(billingContactNumber) {
        this.#billingContactNumber = EzString.stringOrEmpty(billingContactNumber);
    }

    /**
     * @private @field
     * Stores
     * @type {string}
     */
    #providerCreditCardId;
    /**
     * @public @property @getter
     * Gets
     * @returns {string}
     */
    get providerCreditCardId() {
        return this.#providerCreditCardId;
    }
    /**
     * @public @property @setter
     * Sets
     * @param {string} cardLastFour
     */
    set providerCreditCardId(providerCreditCardId) {
        this.#providerCreditCardId = EzString.stringOrEmpty(providerCreditCardId);
    }

    /**
     * @private @field
     * Stores
     * @type {string}
     */
    #cardHolderName;
    /**
     * @public @property @getter
     * Gets
     * @returns {string}
     */
    get cardHolderName() {
        return this.#cardHolderName;
    }
    /**
     * @public @property @setter
     * Sets
     * @param {string} cardLastFour
     */
    set cardHolderName(cardHolderName) {
        this.#cardHolderName = EzString.stringOrEmpty(cardHolderName);
    }

    /**
     * @private @field
     * Stores
     * @type {string}
     */
    #cardNumber;
    /**
     * @public @property @getter
     * Gets
     * @returns {string}
     */
    get cardNumber() {
        return this.#cardNumber;
    }
    /**
     * @public @property @setter
     * Sets
     * @param {string} cardLastFour
     */
    set cardNumber(cardNumber) {
        this.#cardNumber = EzString.stringOrEmpty(cardNumber);
    }

    /**
     * @private @field
     * Stores
     * @type {string}
     */
    #cardExpireDate;
    /**
     * @public @property @getter
     * Gets
     * @returns {string}
     */
    get cardExpireDate() {
        return this.#cardExpireDate;
    }
    /**
     * @public @property @setter
     * Sets
     * @param {string} cardLastFour
     */
    set cardExpireDate(cardExpireDate) {
        this.#cardExpireDate = EzString.stringOrEmpty(cardExpireDate);
    }

    /**
     * @private @field
     * Stores
     * @type {string}
     */
    #cardSpecialNumber;
    /**
     * @public @property @getter
     * Gets
     * @returns {string}
     */
    get cardSpecialNumber() {
        return this.#cardSpecialNumber;
    }
    /**
     * @public @property @setter
     * Sets
     * @param {string} cardLastFour
     */
    set cardSpecialNumber(cardSpecialNumber) {
        this.#cardSpecialNumber = EzString.stringOrEmpty(cardSpecialNumber);
    }

    /**
     * @private @field
     * Stores
     * @type {string}
     */
    #cardZipCode;
    /**
     * @public @property @getter
     * Gets
     * @returns {string}
     */
    get cardZipCode() {
        return this.#cardZipCode;
    }
    /**
     * @public @property @setter
     * Sets
     * @param {string} cardLastFour
     */
    set cardZipCode(cardZipCode) {
        this.#cardZipCode = EzString.stringOrEmpty(cardZipCode);
    }

    /**
     * @private @field
     * Stores
     * @type {string}
     */
    #discountId;
    /**
     * @public @property @getter
     * Gets
     * @returns {string}
     */
    get discountId() {
        return this.#discountId;
    }
    /**
     * @public @property @setter
     * Sets
     * @param {string} cardLastFour
     */
    set discountId(discountId) {
        this.#discountId = EzString.stringOrEmpty(discountId);
    }

    /**
     * @private @field
     * Stores
     * @type {string}
     */
    #cardType;
    /**
     * @public @property @getter
     * Gets
     * @returns {string}
     */
    get cardType() {
        return this.#cardType;
    }
    /**
     * @public @property @setter
     * Sets
     * @param {string} cardLastFour
     */
    set cardType(cardType) {
        this.#cardType = EzString.stringOrDefault(cardType, EzCreditCardType.UNKNOWN);
    }

    /**
     * @private @field
     * Stores
     * @type {string}
     */
    #cardImageUrl;
    /**
     * @public @property @getter
     * Gets
     * @returns {string}
     */
    get cardImageUrl() {
        return this.#cardImageUrl;
    }
    /**
     * @public @property @setter
     * Sets
     * @param {string} cardLastFour
     */
    set cardImageUrl(cardImageUrl) {
        this.#cardImageUrl = EzString.stringOrEmpty(cardImageUrl);
    }

    /**
     * @private @field
     * Stores the last four digits of the credit card for display purposes.
     * @type {string}
     */
    #cardLastFour;
    /**
     * @public @property @getter
     * Gets
     * @returns {string}
     */
    get cardLastFour() {
        return this.#cardLastFour;
    }
    /**
     * @public @property @setter
     * Sets
     * @param {string} cardLastFour
     */
    set cardLastFour(cardLastFour) {
        this.#cardLastFour = EzString.stringOrEmpty(cardLastFour);
    }

    /**
     * @public @method
     * Returns this instance as a JSON object
     * @returns {object}
     * @deprecated
     * Migrate to the inherited asJSONObject property
     */
    get toJsonObject() {
        return this.asJSONObject;
    }

    /**
     * @public @method
     * Returns this instance as a JSON string
     * @returns {String}
     * @deprecated
     * Migrate to the inherited asJSON property or ezToJSON() method
     */
    get toJson() {
        return this.asJSON;
    }

    /**
     * @override
     * @public @readonly @property
     * Returns this instance as a JSON Object (will no longer have the getter/setter methods).
     * Useful for serailization to JSON.
     * @returns {object}
     */
    get asJSONObject() {
        return {
            providerCustomerId: this.providerCustomerId,
            companyName: this.companyName,
            billingFirstName: this.billingFirstName,
            billingLastName: this.billingLastName,
            billingEmail: this.billingEmail,
            billingContactNumber: this.billingContactNumber,
            providerCreditCardId: this.providerCreditCardId,
            cardHolderName: this.cardHolderName,
            cardNumber: this.cardNumber,
            cardExpireDate: this.cardExpireDate,
            cardSpecialNumber: this.cardSpecialNumber,
            cardZipCode: this.cardZipCode,
            discountId: this.discountId,
            cardType: this.cardType,
            cardImageUrl: this.cardImageUrl,
            cardLastFour: this.cardLastFour
        };
    }

    /**
     * @override
     * @public @readonly @property
     * Returns this instance as JSON string (no formatting)
     * @returns {String}
     */
    get asJSON() {
        return super.asJSON;
    }

    /**
     * @override
     * @public @method
     * Converts this instance into a JSON string with optional formatting.
     * @param {undefined|null|Number} indentValue
     * @param {undefined|null|Boolean} htmlDisplay
     * @returns {String}
     */
    ezToJSON(indentValue, htmlDisplay) {
        return super.ezToJSON(indentValue, htmlDisplay);
    }

    /**
     * @override
     * @public @method
     * Copies properties from the provided jsonObject to this instance (even if this instance does not define the property)
     * @param {Object} jsonObject
     * @returns {Object}
     * Returns this instance with the key & values from the provided jsonObject.
     */
    ezFromJSONObject(jsonObject) {
        if (EzObject.isValid(jsonObject)) {
            this.providerCustomerId= jsonObject.providerCustomerId;

            this.companyName= jsonObject.companyName;

            this.billingFirstName= jsonObject.billingFirstName;

            this.billingLastName= jsonObject.billingLastName;

            this.billingEmail= jsonObject.billingEmail;

            this.billingContactNumber= jsonObject.billingContactNumber;

            this.providerCreditCardId= jsonObject.providerCreditCardId;

            this.cardHolderName= jsonObject.cardHolderName;

            this.cardNumber= jsonObject.cardNumber;

            this.cardExpireDate= jsonObject.cardExpireDate;

            this.cardSpecialNumber= jsonObject.cardSpecialNumber;

            this.cardZipCode= jsonObject.cardZipCode;

            this.discountId= jsonObject.discountId;

            this.cardType= jsonObject.cardType;

            this.cardImageUrl= jsonObject.cardImageUrl;

            this.cardLastFour= jsonObject.cardLastFour;
        }

        return this;
    }

    /**
     * @override
     * @public @method
     * Converts the provided jsonString to a JSON object and then
     * passes that object to ezFromJSONObject() to copies properties to this instance
     * (even if this instance does not define the property)
     * @param {String} jsonString
     * @returns {Object}
     * Returns this instance with the key & values from the provided json string.
     */
    ezLoadFromJson(jsonString) {
        return super.ezLoadFromJson(jsonString);
    }
}

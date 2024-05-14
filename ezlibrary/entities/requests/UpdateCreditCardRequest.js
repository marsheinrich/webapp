import { EzJSONSerializable } from '/ezlibrary/entities/EzJSONSerializable.js';

export class UpdateCreditCardRequest extends EzJSONSerializable {
    /**
        @public @constructor
        Creates a new instance of UpdateCreditCardRequest
        @param {String} cardHolderName
        @param {String} cardNumber
        @param {String} cardExpireDate
        @param {String} cardSpecialNumber
        @param {String} cardZipCode
     */
    constructor(cardHolderName, cardNumber, cardExpireDate, cardSpecialNumber, cardZipCode) {
        super();

        this.cardHolderName = cardHolderName;
        this.cardNumber = cardNumber;
        this.cardExpireDate = cardExpireDate;
        this.cardSpecialNumber = cardSpecialNumber;
        this.cardZipCode = cardZipCode;
    }

    #cardHolderName = '';
    get cardHolderName() {
        return this.#cardHolderName;
    }
    set cardHolderName(cardHolderName) {
        this.#cardHolderName = ezApi.ezStringOrEmpty(cardHolderName);
    }

    #cardNumber = '';
    get cardNumber() {
        return this.#cardNumber;
    }
    set cardNumber(cardNumber) {
        this.#cardNumber = ezApi.ezStringOrEmpty(cardNumber);
    }

    #cardExpireDate = '';
    get cardExpireDate() {
        return this.#cardExpireDate;
    }
    set cardExpireDate(cardExpireDate) {
        this.#cardExpireDate = ezApi.ezStringOrEmpty(cardExpireDate);
    }

    #cardSpecialNumber = '';
    get cardSpecialNumber() {
        return this.#cardSpecialNumber;
    }
    set cardSpecialNumber(cardSpecialNumber) {
        this.#cardSpecialNumber = ezApi.ezStringOrEmpty(cardSpecialNumber);
    }

    #cardZipCode = '';
    get cardZipCode() {
        return this.#cardZipCode;
    }
    set cardZipCode(cardZipCode) {
        this.#cardZipCode = ezApi.ezStringOrEmpty(cardZipCode);
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
            cardHolderName: this.cardHolderName,
            cardNumber: this.cardNumber,
            cardExpireDate: this.cardExpireDate,
            cardSpecialNumber: this.cardSpecialNumber,
            cardZipCode: this.cardZipCode
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

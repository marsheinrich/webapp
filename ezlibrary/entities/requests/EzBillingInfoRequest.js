import { EzJSONSerializable } from '/ezlibrary/entities/EzJSONSerializable.js'

/**
    Represents a BillingInfoRequest entity for ezClocker API calls
    NOTE:
        To convert this object to a JSON string, use EzEmployeeInviteRequest.toJson() instead of
        JSON.serialize or ezApi.ezToJson()
    Import with:
        import { EzBillingInfoRequest } from '/ezlibrary/entities/requests/EzBillingInfoRequest.js';
 */
export class EzBillingInfoRequest extends EzJSONSerializable {
    constructor(aCompanyName, aBillingFirstName, aBillingLastName,
        aBillingStreetAddress, aBillingAdditionalAddress, aBillingCity, aBillingState, aBillingPostalCode,
        aBillingCountry, aBillingEmail, aBillingContactNumber, aCardHolderName, aCardNumber, aCardExpireDate,
        aCardSpecialNumber, aCardZipCode, aDiscountId) {
        super();

        this.companyName = ezApi.ezStringOrEmpty(aCompanyName);
        this.billingFirstName = ezApi.ezStringOrEmpty(aBillingFirstName);
        this.billingLastName = ezApi.ezStringOrEmpty(aBillingLastName);
        this.billingStreetAddress = ezApi.ezStringOrEmpty(aBillingStreetAddress);
        this.billingAdditionalAddress = ezApi.ezStringOrEmpty(aBillingAdditionalAddress);
        this.billingCity = ezApi.ezStringOrEmpty(aBillingCity);
        this.billingState = ezApi.ezStringOrEmpty(aBillingState);
        this.billingPostalCode = ezApi.ezStringOrEmpty(aBillingPostalCode);
        this.billingCountry = ezApi.ezStringOrEmpty(aBillingCountry);
        this.billingEmail = ezApi.ezStringOrEmpty(aBillingEmail);
        this.billingContactNumber = ezApi.ezStringOrEmpty(aBillingContactNumber);
        this.cardHolderName = ezApi.ezStringOrEmpty(aCardHolderName);
        this.cardNumber = ezApi.ezStringOrEmpty(aCardNumber);
        this.cardExpireDate = ezApi.ezStringOrEmpty(aCardExpireDate);
        this.cardSpecialNumber = ezApi.ezStringOrEmpty(aCardSpecialNumber);
        this.cardZipCode = ezApi.ezStringOrEmpty(aCardZipCode);
        this.discountId = ezApi.ezStringOrEmpty(aDiscountId);
    }

    #companyName;
    #billingFirstName;
    #billingLastName;
    #billingStreetAddress;
    #billingAdditionalAddress;
    #billingCity;
    #billingState;
    #billingPostalCode;
    #billingCountry;
    #billingEmail;
    #billingContactNumber;
    #cardHolderName;
    #cardNumber;
    #cardExpireDate;
    #cardSpecialNumber;
    #cardZipCode;
    #discountId;

    /**
        @public @property @getter
        @returns {string}
     */
    get companyName() {
        return this.#companyName;
    }

    /**
        @public @property @getter
        @returns {string}
     */
    get billingFirstName() {
        return this.#billingFirstName;
    }

    /**
        @public @property @getter
        @returns {string}
     */
    get billingLastName() {
        return this.#billingLastName;
    }

    /**
        @public @property @getter
        @returns {string}
     */
    get billingStreetAddress() {
        return this.#billingStreetAddress;
    }

    /**
        @public @property @getter
        @returns {string}
     */
    get billingAdditionalAddress() {
        return this.#billingAdditionalAddress;
    }

    /**
        @public @property @getter
        @returns {string}
     */
    get billingCity() {
        return this.#billingCity;
    }

    /**
        @public @property @getter
        @returns {string}
     */
    get billingState() {
        return this.#billingState;
    }

    /**
        @public @property @getter
        @returns {string}
     */
    get billingPostalCode() {
        return this.#billingPostalCode;
    }

    /**
        @public @property @getter
        @returns {string}
     */
    get billingCountry() {
        return this.#billingCountry;
    }

    /**
        @public @property @getter
        @returns {string}
     */
    get billingEmail() {
        return this.#billingEmail;
    }

    /**
        @public @property @getter
        @returns {string}
     */
    get billingContactNumber() {
        return this.#billingContactNumber;
    }

    /**
        @public @property @getter
        @returns {string}
     */
    get cardHolderName() {
        return this.#cardHolderName;
    }

    /**
        @public @property @getter
        @returns {string}
     */
    get cardNumber() {
        return this.#cardNumber;
    }

    /**
        @public @property @getter
        @returns {string}
     */
    get cardExpireDate() {
        return this.#cardExpireDate;
    }

    /**
        @public @property @getter
        @returns {string}
     */
    get cardSpecialNumber() {
        return this.#cardSpecialNumber;
    }

    /**
        @public @property @getter
        @returns {string}
     */
    get cardZipCode() {
        return this.#cardZipCode;
    }

    /**
        @public @property @getter
        @returns {string}
     */
    get discountId() {
        return this.#discountId;
    }

    /**
        @public @property @setter
        @param {string} companyName
     */
    set companyName(companyName) {
        this.#companyName = ezApi.ezStringOrEmpty(companyName);
    }

    /**
        @public @property @setter
        @param {string} billingFirstName
     */
    set billingFirstName(billingFirstName) {
        this.#billingFirstName = ezApi.ezStringOrEmpty(billingFirstName);
    }

    /**
        @public @property @setter
        @param {string} billingLastName
     */
    set billingLastName(billingLastName) {
        this.#billingLastName = ezApi.ezStringOrEmpty(billingLastName);
    }

    /**
        @public @property @setter
        @param {string} billingStreetAddress
     */
    set billingStreetAddress(billingStreetAddress) {
        this.#billingStreetAddress = ezApi.ezStringOrEmpty(billingStreetAddress);
    }

    /**
        @public @property @setter
        @param {string} billingAdditionalAddress
     */
    set billingAdditionalAddress(billingAdditionalAddress) {
        this.#billingAdditionalAddress = ezApi.ezStringOrEmpty(billingAdditionalAddress);
    }

    /**
        @public @property @setter
        @param {string} billingCity
     */
    set billingCity(billingCity) {
        this.#billingCity = ezApi.ezStringOrEmpty(billingCity);
    }

    /**
        @public @property @setter
        @param {string} billingState
     */
    set billingState(billingState) {
        this.#billingState = ezApi.ezStringOrEmpty(billingState);
    }

    /**
        @public @property @setter
        @param {string} billingPostalCode
     */
    set billingPostalCode(billingPostalCode) {
        this.#billingPostalCode = ezApi.ezStringOrEmpty(billingPostalCode);
    }

    /**
        @public @property @setter
        @param {string} billingCountry
     */
    set billingCountry(billingCountry) {
        this.#billingCountry = ezApi.ezStringOrEmpty(billingCountry);
    }

    /**
        @public @property @setter
        @param {string} billingEmail
     */
    set billingEmail(billingEmail) {
        this.#billingEmail = ezApi.ezStringOrEmpty(billingEmail);
    }

    /**
        @public @property @setter
        @param {string} billingContactNumber
     */
    set billingContactNumber(billingContactNumber) {
        this.#billingContactNumber = ezApi.ezStringOrEmpty(billingContactNumber);
    }

    /**
        @public @property @setter
        @param {string} cardHolderName
     */
    set cardHolderName(cardHolderName) {
        this.#cardHolderName = ezApi.ezStringOrEmpty(cardHolderName);
    }

    /**
        @public @property @setter
        @param {string} cardNumber
     */
    set cardNumber(cardNumber) {
        this.#cardNumber = ezApi.ezStringOrEmpty(cardNumber);
    }

    /**
        @public @property @setter
        @param {string} cardExpireDate
     */
    set cardExpireDate(cardExpireDate) {
        this.#cardExpireDate = ezApi.ezStringOrEmpty(cardExpireDate);
    }

    /**
        @public @property @setter
        @param {string} cardSpecialNumber
     */
    set cardSpecialNumber(cardSpecialNumber) {
        this.#cardSpecialNumber = ezApi.ezStringOrEmpty(cardSpecialNumber);
    }

    /**
        @public @property @setter
        @param {string} cardZipCode
     */
    set cardZipCode(cardZipCode) {
        this.#cardZipCode = ezApi.ezStringOrEmpty(cardZipCode);
    }

    /**
        @public @property @setter
        @param {string} discountId
     */
    set discountId(discountId) {
        this.#discountId = ezApi.ezStringOrEmpty(discountId);
    }

    /**
        @public @method
        Returns this instance as a JSON Object
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
        @returns {string}
        @deprecated
        Migrate to the inherited asJSON property
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
            companyName: this.companyName,
            billingFirstName: this.billingFirstName,
            billingLastName: this.billingLastName,
            billingStreetAddress: this.billingStreetAddress,
            billingAdditionalAddress: this.billingAdditionalAddress,
            billingCity: this.billingCity,
            billingState: this.billingState,
            billingPostalCode: this.billingPostalCode,
            billingCountry: this.billingCountry,
            billingEmail: this.billingEmail,
            billingContactNumber: this.billingContactNumber,
            cardHolderName: this.cardHolderName,
            cardNumber: this.cardNumber,
            cardExpireDate: this.cardExpireDate,
            cardSpecialNumber: this.cardSpecialNumber,
            cardZipCode: this.cardZipCode,
            discountId: this.discountId
        }
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

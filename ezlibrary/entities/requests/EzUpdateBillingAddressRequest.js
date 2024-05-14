import { EzJSONSerializable } from '/ezlibrary/entities/EzJSONSerializable.js';

/**
    Request entity for update billing address ezClocker api requests.
    Import with:
        import { EzUpdateBillingAddressRequest } from '/ezlibrary/entities/requests/EzUpdateBillingAddressRequest.js';
 */
export class EzUpdateBillingAddressRequest extends EzJSONSerializable {
    /**
        @public @constructor
     */
    constructor(companyName, billingFirstName, billingLastName, billingContactName,
        billingStreetAddress, billingAdditionalAddress, billingCity, billingState, billingPostalCode,
        billingCountry, billingEmail, billingContactNumber) {
        super();

        this.companyName = companyName;
        this.billingFirstName = billingFirstName;
        this.billingLastName = billingLastName;
        this.billingContactName = billingContactName;
        this.billingStreetAddress = billingStreetAddress;
        this.billingAdditionalAddress = billingAdditionalAddress;
        this.billingCity = billingCity;
        this.billingState = billingState;
        this.billingPostalCode = billingPostalCode;
        this.billingCountry = billingCountry;
        this.billingEmail = billingEmail;
        this.billingContactNumber = billingContactNumber;
    }

    #companyName;
    #billingFirstName;
    #billingLastName;
    #billingContactName;
    #billingStreetAddress;
    #billingAdditionalAddress;
    #billingCity;
    #billingState;
    #billingPostalCode;
    #billingCountry;
    #billingEmail;
    #billingContactNumber;

    get companyName() {
        return this.#companyName;
    }

    get billingFirstName() {
        return this.#billingFirstName;
    }

    get billingLastName() {
        return this.#billingLastName;
    }

    get billingContactName() {
        return this.#billingContactName;
    }

    get billingStreetAddress() {
        return this.#billingStreetAddress;
    }

    get billingAdditionalAddress() {
        return this.#billingAdditionalAddress;
    }

    get billingCity() {
        return this.#billingCity;
    }

    get billingState() {
        return this.#billingState;
    }

    get billingPostalCode() {
        return this.#billingPostalCode;
    }

    get billingCountry() {
        return this.#billingCountry;
    }

    get billingEmail() {
        return this.#billingEmail;
    }

    get billingContactNumber() {
        return this.#billingContactNumber;
    }

    set companyName(companyName) {
        this.#companyName = ezApi.ezStringOrEmpty(companyName);
    }

    set billingFirstName(billingFirstName) {
        this.#billingFirstName = ezApi.ezStringOrEmpty(billingFirstName);
    }

    set billingLastName(billingLastName) {
        this.#billingLastName = ezApi.ezStringOrEmpty(billingLastName);
    }

    set billingContactName(billingContactName) {
        this.#billingContactName = ezApi.ezStringOrEmpty(billingContactName);
    }

    set billingStreetAddress(billingStreetAddress) {
        this.#billingStreetAddress = ezApi.ezStringOrEmpty(billingStreetAddress);
    }

    set billingAdditionalAddress(billingAdditionalAddress) {
        this.#billingAdditionalAddress = ezApi.ezStringOrEmpty(billingAdditionalAddress);
    }

    set billingCity(billingCity) {
        this.#billingCity = ezApi.ezStringOrEmpty(billingCity);
    }

    set billingState(billingState) {
        this.#billingState = ezApi.ezStringOrEmpty(billingState);
    }

    set billingPostalCode(billingPostalCode) {
        this.#billingPostalCode = ezApi.ezStringOrEmpty(billingPostalCode);
    }

    set billingCountry(billingCountry) {
        this.#billingCountry = ezApi.ezStringOrEmpty(billingCountry);
    }

    set billingEmail(billingEmail) {
        this.#billingEmail = ezApi.ezStringOrEmpty(billingEmail);
    }

    set billingContactNumber(billingContactNumber) {
        this.#billingContactNumber = ezApi.ezStringOrEmpty(billingContactNumber);
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
            companyName: this.companyName,
            billingFirstName: this.billingFirstName,
            billingLastName: this.billingLastName,
            billingContactName: this.billingContactName,
            billingStreetAddress: this.billingStreetAddress,
            billingAdditionalAddress: this.billingAdditionalAddress,
            billingCity: this.billingCity,
            billingState: this.billingState,
            billingPostalCode: this.billingPostalCode,
            billingCountry: this.billingCountry,
            billingEmail: this.billingEmail,
            billingContactNumber: this.billingContactNumber
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

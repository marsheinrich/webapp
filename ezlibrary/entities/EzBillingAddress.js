import { EzJSONSerializable } from '/ezlibrary/entities/EzJSONSerializable.js'

import {
    EzBoolean,
    EzNumber,
    EzString,
    EzArray
} from '/ezlibrary/helpers/EzHelpers.js';

/**
    Represents a BillingAddress entity, matches Java object com.ezclocker.domain.entities.EzBillingAddress.java
    NOTE:
        To convert this object to a JSON string, use EzEmployeeInviteRequest.toJson() instead of
        JSON.serialize or ezApi.ezToJson()
    Import with:
        import { EzBillingAddress } from '/ezlibrary/entities/EzBillingAddress.js';
 */
export class EzBillingAddress extends EzJSONSerializable {
    /**
        @public @constructor
        Creates a new instance of EzBillingAddress
        @param {undefined|null|number} employerId
        @param {undefined|null|number} employeeId
        @param {undefined|null|number} personalId
        @param {undefined|null|string} companyName
        @param {undefined|null|string} firstName
        @param {undefined|null|string} lastName
        @param {undefined|null|string} streetAddress
        @param {undefined|null|string} extendedAddress
        @param {undefined|null|string} locality
        @param {undefined|null|string} region
        @param {undefined|null|string} postalCode
        @param {undefined|null|string} countryName
        @param {undefined|null|string} contactEmail
        @param {undefined|null|string} contactPhone
        @param {undefined|null|string} providerCreditCardId
        @param {undefined|null|string} providerBillingAddressId
        @param {undefined|null|string} countryCodeAlpha2
        @param {undefined|null|string} countryCodeAlpha3
        @param {undefined|null|string} countryCodeNumeric
        @param {undefined|null|string} targetDateTimeZoneId
     */
    constructor(
        employerId = null,
        employeeId = null,
        personalId = null,
        companyName = EzString.EMPTY,
        firstName = EzString.EMPTY,
        lastName = EzString.EMPTY,
        streetAddress = EzString.EMPTY,
        extendedAddress = EzString.EMPTY,
        locality = EzString.EMPTY,
        region = EzString.EMPTY,
        postalCode = EzString.EMPTY,
        countryName = EzString.EMPTY,
        contactEmail = EzString.EMPTY,
        contactPhone = EzString.EMPTY,
        providerCreditCardId = EzString.EMPTY,
        providerBillingAddressId = EzString.EMPTY,
        countryCodeAlpha2 = EzString.EMPTY,
        countryCodeAlpha3 = EzString.EMPTY,
        countryCodeNumeric = EzString.EMPTY,
        targetDateTimeZoneId = 'UTC') {
        super();

        this.employerId = employerId;
        this.employeeId = employeeId;
        this.personalId = personalId;

        this.companyName = companyName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.streetAddress = streetAddress;
        this.extendedAddress = extendedAddress;
        this.locality = locality;
        this.region = region;
        this.postalCode = postalCode;
        this.countryName = countryName;
        this.contactEmail = contactEmail;
        this.contactPhone = contactPhone;

        this.providerCreditCardId = providerCreditCardId;
        this.providerBillingAddressId = providerBillingAddressId;
        this.countryCodeAlpha2 = countryCodeAlpha2;
        this.countryCodeAlpha3 = countryCodeAlpha3;
        this.countryCodeNumeric = countryCodeNumeric;

        this.targetDateTimeZoneId = targetDateTimeZoneId;
    }

    /**
        @private @field
        @type {number}
     */
    #id = null;
    get id() {
        return this.#id;
    }
    set id(id) {
        this.#id = EzNumber.numberOrNull(id);
    }

    /**
        @private @field
        @type {number}
     */
    #employerId = null;
    /**
        @public @property @getter
        @returns {number}
     */
    get employerId() {
        return this.#employerId;
    }
    /**
        @public @property @setter
        @param {number} employerId
     */
    set employerId(employerId) {
        this.#employerId = EzNumber.numberOrNull(employerId);
    }

    /**
        @private @field
        @type {number}
     */
    #employeeId = null;
    /**
        @public @property @getter
        @returns {number}
     */
    get employeeId() {
        return this.#employeeId;
    }
    /**
        @public @property @setter
        @param {number} employeeId
     */
    set employeeId(employeeId) {
        this.#employeeId = EzNumber.numberOrNull(employeeId);
    }

    /**
        @private @field
        @type {number}
     */
    #personalId = null;
    /**
        @public @property @getter
        @returns {number}
     */
    get personalId() {
        return this.#personalId;
    }
    /**
        @public @property @setter
        @param {number} personalId
     */
    set personalId(personalId) {
        this.#personalId = EzNumber.numberOrNull(personalId);
    }

    /**
        @private @field
        @type {string}
     */
    #paymentProviderId = 'EZCLOCKER_SUBSCRIPTION';
    /**
        @public @getter @property
        @returns {string}
     */
    get paymentProviderId() {
        return this.#paymentProviderId;
    }
    /**
        @public @setter @property
        @param {string} paymentProviderId
     */
    set paymentProviderId(paymentProviderId) {
        this.#paymentProviderId = EzString.stringOrDefault(paymentProviderId, 'EZCLOCKER_SUBSCRIPTION');
    }

    /**
        @private @field
        @type {boolean}
     */
    #primaryAddress = true;
    /**
        @public @setter @property
        @param {string} billingAmount
     */
    get primaryAddress() {
        return this.#primaryAddress;
    }
    /**
        @public @setter @property
        @param {string} billingAmount
     */
    set primaryAddress(primaryAddress) {
        this.#primaryAddress = EzBoolean.isTrue(primaryAddress);
    }

    /**
        @private @field
        @type {string}
     */
    #companyName = '';
    /**
        @public @property @getter
        @returns {string}
     */
    get companyName() {
        return this.#companyName;
    }
    /**
        @public @property @setter
        @param {string} companyName
     */
    set companyName(companyName) {
        this.#companyName = EzString.stringOrEmpty(companyName);
    }

    /**
        @private @field
        @type {string}
     */
    #firstName = '';
    /**
        @public @property @getter
        @returns {string}
     */
    get firstName() {
        return this.#firstName;
    }
    /**
        @public @property @setter
        @param {string} firstName
     */
    set firstName(firstName) {
        this.#firstName = EzString.stringOrEmpty(firstName);
    }

    /**
        @public @property @getter
        @returns {string}
     */
    get billingFirstName() {
        return this.#firstName;
    }
    /**
        @public @property @setter
        @param {string} firstName
     */
    set billingFirstName(firstName) {
        this.#firstName = EzString.stringOrEmpty(firstName);
    }

    /**
        @public @property @getter
        @returns {string}
     */
    get billingContactFirstName() {
        return this.#firstName;
    }


    /**
        @private @field
        @type {string}
     */
    #lastName = '';
    /**
        @public @property @getter
        @returns {string}
     */
    get lastName() {
        return this.#lastName;
    }
    /**
        @public @property @setter
        @param {string} lastName
     */
    set lastName(lastName) {
        this.#lastName = EzString.stringOrEmpty(lastName);
    }

    /**
        @public @property @getter
        @returns {string}
     */
    get billingLastName() {
        return this.#lastName;
    }
    /**
        @public @property @setter
        @param {string} lastName
     */
    set billingLastName(lastName) {
        this.#lastName = EzString.stringOrEmpty(lastName);
    }

    /**
        @public @getter @property
        @returns {string}
     */
    get billingContactLastName() {
        return this.#lastName;
    }

    /**
        @public @getter @property
        @returns {string}
     */
    get name() {
        return `${this.firstName} ${this.lastName}`;
    }

    /**
        @public @getter @property
        @returns {string}
     */
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    /**
        @public @getter @property
        @returns {string}
     */
    get contactFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    /**
        @public @getter @property
        @returns {string}
     */
    get billingContactName() {
        return `${this.firstName} ${this.lastName}`;
    }

    /**
        @public @getter @property
        @returns {string}
     */
    get billingContactFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    /**
        @private @field
        @type {string}
     */
    #streetAddress = '';
    /**
        @public @property @getter
        @returns {string}
     */
    get streetAddress() {
        return this.#streetAddress;
    }
    /**
        @public @property @setter
        @param {string} streetAddress
     */
    set streetAddress(streetAddress) {
        this.#streetAddress = EzString.stringOrEmpty(streetAddress);
    }

    /**
        @public @getter @property
        @returns {string}
     */
    get billingStreetAddress() {
        return this.#streetAddress;
    }
    /**
        @public @property @setter
        @param {string} streetAddress
     */
    set billingStreetAddress(streetAddress) {
        this.#streetAddress = EzString.stringOrEmpty(streetAddress);
    }

    /**
        @private @field
        @type {string}
     */
    #extendedAddress = '';
    /**
        @public @property @getter
        @returns {string}
     */
    get extendedAddress() {
        return this.#extendedAddress;
    }
    /**
        @public @property @setter
        @param {string} extendedAddress
     */
    set extendedAddress(extendedAddress) {
        this.#extendedAddress = EzString.stringOrEmpty(extendedAddress);
    }

    /**
        @public @property @getter
        @returns {string}
     */
    get billingAdditionalAddress() {
        return this.#extendedAddress;
    }
    /**
        @public @property @setter
        @param {string} extendedAddress
     */
    set billingAdditionalAddress(extendedAddress) {
        this.#extendedAddress = EzString.stringOrEmpty(extendedAddress);
    }

    /**
        @private @field
        @type {string}
     */
    #locality = '';
    /**
        @public @property @getter
        @returns {string}
     */
    get locality() {
        return this.#locality;
    }
    /**
        @public @property @setter
        @param {string} locality
     */
    set locality(locality) {
        this.#locality = EzString.stringOrEmpty(locality);
    }

    /**
        @public @property @getter
        @returns {string}
     */
    get billingCity() {
        return this.#locality;
    }
    /**
        @public @property @setter
        @param {string} locality
     */
    set billingCity(locality) {
        this.#locality = EzString.stringOrEmpty(locality);
    }

    /**
        @public @property @setter
        @param {string} locality
     */
    set city(locality) {
        this.#locality = EzString.stringOrEmpty(locality);
    }

    /**
        @private @field
        @type {string}
     */
    #region = '';
    /**
        @public @property @getter
        @returns {string}
     */
    get region() {
        return this.#region;
    }
    /**
        @public @property @setter
        @param {string} region
     */
    set region(region) {
        this.#region = EzString.stringOrEmpty(region);
    }

    /**
        @public @property @getter
        @returns {string}
     */
    get billingState() {
        return this.#region;
    }
    /**
        @public @property @setter
        @param {string} region
     */
    set billingState(region) {
        this.#region = EzString.stringOrEmpty(region);
    }

    /**
        @public @property @setter
        @param {string} region
     */
    set state(region) {
        this.#region = EzString.stringOrEmpty(region);
    }

    /**
        @private @field
        @type {string}
     */
    #postalCode = '';
    /**
        @public @property @getter
        @returns {string}
     */
    get postalCode() {
        return this.#postalCode;
    }
    /**
        @public @property @setter
        @param {string} postalCode
     */
    set postalCode(postalCode) {
        this.#postalCode = EzString.stringOrEmpty(postalCode);
    }

    /**
        @public @property @getter
        @returns {string}
     */
    get billingPostalCode() {
        return this.#postalCode;
    }
    /**
        @public @property @setter
        @param {string} postalCode
     */
    set billingPostalCode(postalCode) {
        this.#postalCode = EzString.stringOrEmpty(postalCode);
    }

    /**
        @public @property @setter
        @param {string} postalCode
     */
    set zipcode(postalCode) {
        this.#postalCode = EzString.stringOrEmpty(postalCode);
    }

    /**
        @private @field
        @type {string}
     */
    #countryName = '';
    /**
        @public @property @getter
        @returns {string}
     */
    get countryName() {
        return this.#countryName;
    }
    /**
        @public @property @setter
        @param {string} countryName
     */
    set countryName(countryName) {
        this.#countryName = EzString.stringOrEmpty(countryName);
    }

    /**
        @public @property @getter
        @returns {string}
     */
    get billingCountry() {
        return this.countryName;
    }
    /**
        @public @property @setter
        @param {string} countryName
     */
    set billingCountry(countryName) {
        this.countryName = countryName;
    }

    /**
        @private @field
        @type {string}
     */
    #contactEmail = '';
    /**
        @public @property @getter
        @returns {string}
     */
    get contactEmail() {
        return this.#contactEmail;
    }
    /**
        @public @property @setter
        @param {string} contactEmail
     */
    set contactEmail(contactEmail) {
        this.#contactEmail = EzString.stringOrEmpty(contactEmail);
    }

    /**
        @public @property @getter
        @returns {string}
     */
    get email() {
        return this.#contactEmail;
    }
    /**
        @public @property @setter
        @param {string} contactEmail
     */
    set email(contactEmail) {
        this.#contactEmail = EzString.stringOrEmpty(contactEmail);
    }

    /**
        @public @property @getter
        @returns {string}
     */
    get billingEmail() {
        return this.#contactEmail;
    }

    /**
        @private @field
        @type {string}
     */
    #contactPhone = '';
    /**
        @public @property @getter
        @returns {string}
     */
    get contactPhone() {
        return this.#contactPhone;
    }
    /**
        @public @property @setter
        @param {string} contactPhone
     */
    set contactPhone(contactPhone) {
        this.#contactPhone = EzString.stringOrEmpty(contactPhone);
    }

    /**
        @public @property @getter
        @returns {string}
     */
    get phone() {
        return this.#contactPhone;
    }
    /**
        @public @property @setter
        @param {string} contactPhone
     */
    set phone(contactPhone) {
        this.#contactPhone = EzString.stringOrEmpty(contactPhone);
    }

    /**
        @public @property @getter
        @returns {string}
     */
    get phoneNumber() {
        return this.#contactPhone;
    }
    /**
        @public @property @setter
        @param {string} contactPhone
     */
    set phoneNumber(contactPhone) {
        this.#contactPhone = EzString.stringOrEmpty(contactPhone);
    }

    /**
        @public @property @getter
        @returns {string}
     */
    get contactNumber() {
        return this.#contactPhone;
    }

    /**
        @public @property @getter
        @returns {string}
     */
    get billingContactNumber() {
        return this.#contactPhone;
    }
    /**
        @public @property @setter
        @param {string} contactPhone
     */
    set billingContactNumber(contactPhone) {
        this.#contactPhone = EzString.stringOrEmpty(contactPhone);
    }

    /**
        @private @field
        @type {string}
     */
    #providerCreditCardId = '';
    /**
        @public @property @getter
        @returns {string}
     */
    get providerCreditCardId() {
        return this.#providerCreditCardId;
    }
    /**
        @public @property @setter
        @param {string} providerCreditCardId
     */
    set providerCreditCardId(providerCreditCardId) {
        this.#providerCreditCardId = EzString.stringOrNull(providerCreditCardId);
    }

    /**
        @private @field
        @type {string}
     */
    #providerBillingAddressId = '';
    /**
        @public @getter @property
        @returns {string}
     */
    get providerBillingAddressId() {
        return this.#providerBillingAddressId;
    }
    /**
        @public @property @setter
        @param {string} providerBillingAddressId
     */
    set providerBillingAddressId(providerBillingAddressId) {
        this.#providerBillingAddressId = EzString.stringOrNull(providerBillingAddressId);
    }

    /**
        @private @field
        @type {string}
     */
    #providerSubscriptionId = '';
    /**
        @public @getter @property
        @returns {string}
     */
    get providerSubscriptionId() {
        return this.#providerSubscriptionId;
    }
    /**
        @public @getter @property
        @returns {string}
     */
    set providerSubscriptionId(providerSubscriptionId) {
        this.#providerSubscriptionId = EzString.stringOrEmpty(providerSubscriptionId);
    }

    /**
        @private @field
        @type {string}
     */
    #countryCodeAlpha2 = '';
    /**
        @public @property @getter
        @returns {string}
     */
    get countryCodeAlpha2() {
        return this.#countryCodeAlpha2;
    }
    /**
        @public @property @setter
        @param {string} countryCodeAlpha2
     */
    set countryCodeAlpha2(countryCodeAlpha2) {
        this.#countryCodeAlpha2 = EzString.stringOrNull(countryCodeAlpha2);
    }

    /**
        @private @field
        @type {string}
     */
    #countryCodeAlpha3 = '';
    /**
        @public @property @getter
        @returns {string}
     */
    get countryCodeAlpha3() {
        return this.#countryCodeAlpha3;
    }
    /**
        @public @property @setter
        @param {string} countryCodeAlpha3
     */
    set countryCodeAlpha3(countryCodeAlpha3) {
        this.#countryCodeAlpha3 = EzString.stringOrNull(countryCodeAlpha3);
    }

    /**
        @private @field
        @type {string}
     */
    #countryCodeNumeric = '';
    /**
        @public @property @getter
        @returns {string}
     */
    get countryCodeNumeric() {
        return this.#countryCodeNumeric;
    }
    /**
        @public @property @setter
        @param {string} countryCodeNumeric
     */
    set countryCodeNumeric(countryCodeNumeric) {
        this.#countryCodeNumeric = EzString.stringOrNull(countryCodeNumeric);
    }

    /**
        @private @field
        Only useful when getting data from API
        @type {string}
     */
    #billingAmount = '';
    /**
        @public @getter @property
        @param {string}
     */
    get billingAmount() {
        return this.#billingAmount;
    }
    /**
        @public @setter @property
        @param {string}
     */
    set billingAmount(billingAmount) {
        this.#billingAmount = EzString.stringOrEmpty(billingAmount);
    }

    /**
        @private @field
        Only useful when getting data from API
        @type {array}
     */
    #braintreeDiscounts = [];
    /**
        @public @getter @property
        @param {array}
     */
    get braintreeDiscounts() {
        return this.#braintreeDiscounts;
    }
    /**
        @public @setter @property
        @param {string}
     */
    set braintreeDiscounts(braintreeDiscounts) {
        this.#braintreeDiscounts = EzArray.arrayOrEmpty(braintreeDiscounts);
    }

    /**
        @private @field
        Only useful when getting data from API
        @type {string}
     */
    #discountId = '';
    /**
        @public @getter @property
        @param {string}
     */
    get discountId() {
        return this.#discountId;
    }
    /**
        @public @setter @property
        @param {string}
     */
    set discountId(discountId) {
        this.#discountId = EzString.stringOrEmpty(discountId);
    }

    /**
        @private @field
        Only useful when getting data from API
        @type {boolean}
     */
    #canceled = false;
    /**
        @public @getter @property
        @param {boolean}
     */
    get canceled() {
        return this.#canceled;
    }
    /**
        @public @setter @property
        @param {boolean}
     */
    set canceled(canceled) {
        this.#canceled = EzBoolean.isTrue(canceled);
    }

    /**
        @private @field
        Only useful when getting data from API
        @type {string}
     */
    #updatedIso = null;
    /**
        @public @getter @property
        @returns {string}
     */
    get updatedIso() {
        return this.#updatedIso;
    }
    /**
        @public @setter @property
        @returns {string} updatedIso
     */
    set updatedIso(updatedIso) {
        this.#updatedIso = EzString.stringOrDefault(updatedIso, null);
    }

    /**
        @private @field
        Only useful when getting data from API
        @type {string}
     */
    #createdIso = null;
    /**
        @public @getter @property
        @returns {string}
     */
    get createdIso() {
        return this.#createdIso;
    }
    /**
        @public @setter @property
        @returns {string} createdIso
     */
    set createdIso(createdIso) {
        this.#createdIso = EzString.stringOrDefault(createdIso, null);
    }

    /**
        @private @field
        Only useful when getting data from API
        @type {string}
     */
    #deletedIso = null;
    /**
        @public @getter @property
        @returns {string}
     */
    get deletedIso() {
        return this.#deletedIso;
    }
    /**
        @public @setter @property
        @returns {string} deletedIso
     */
    set deletedIso(deletedIso) {
        this.#deletedIso = EzString.stringOrDefault(deletedIso, null);
    }

    /**
        @private @field
        @type {string}
     */
    #source = null;
     /**
        @public @getter @property
        @returns {string}
     */
    get source() {
        return this.#source;
    }
    /**
        @public @setter @property
        @returns {string} source
     */
    set source(source) {
        this.#source = EzString.stringOrDefault(source, null);
    }

    /**
        @private @field
        Only useful when getting data from API
        @type {string}
     */
    #cardExpireDate = '';
    /**
        @public @getter @property
        @returns {string}
     */
    get cardExpireDate() {
        return this.#cardExpireDate;
    }
    /**
        @public @setter @property
        @param {string} cardExpireDate
     */
    set cardExpireDate(cardExpireDate) {
        this.#cardExpireDate = EzString.stringOrEmpty(cardExpireDate);
    }

    /**
        @private @field
        Only useful when getting data from API
        @type {string}
     */
    #cardHolderName = '';
    /**
        @public @getter @property
        @returns {string}
     */
    get cardHolderName() {
        return this.#cardHolderName;
    }
    /**
        @public @setter @property
        @param {string} cardHolderName
     */
    set cardHolderName(cardHolderName) {
        this.#cardHolderName = EzString.stringOrEmpty(cardHolderName);
    }

    /**
        @private @field
        Only useful when getting data from API
        @type {string}
     */
    #cardNumber = '';
    /**
        @public @getter @property
        @returns {string}
     */
    get cardNumber() {
        return this.#cardNumber;
    }
    /**
        @public @setter @property
        @param {string} cardNumber
     */
    set cardNumber(cardNumber) {
        this.#cardNumber = EzString.stringOrEmpty(cardNumber);
    }

    /**
        @private @field
        Only useful when getting data from API
        @type {string}
     */
    #cardSpecialNumber = '';
    /**
        @public @getter @property
        @returns {string}
     */
    get cardSpecialNumber() {
        return this.#cardSpecialNumber;
    }
    /**
        @public @setter @property
        @param {string} cardSpecialNumber
     */
    set cardSpecialNumber(cardSpecialNumber) {
        this.#cardSpecialNumber = EzString.stringOrEmpty(cardSpecialNumber);
    }

    /**
        @private @field
        Only useful when getting data from API
        @type {string}
     */
    #cardType = '';
    /**
        @public @getter @property
        @returns {string}
     */
    get cardType() {
        return this.#cardType;
    }
    /**
        @public @setter @property
        @param {string} cardType
     */
    set cardType(cardType) {
        this.#cardType = EzString.stringOrEmpty(cardType);
    }

    /**
        @private @field
        Only useful when getting data from API
        @type {string}
     */
    #cardZipCode = '';
    /**
        @public @getter @property
        @returns {string}
     */
    get cardZipCode() {
        return this.#cardZipCode;
    }
    /**
        @public @setter @property
        @param {string} cardZipCode
     */
    set cardZipCode(cardZipCode) {
        this.#cardZipCode = EzString.stringOrEmpty(cardZipCode);
    }

    /**
        @private @field
        Only useful when getting data from API
        @type {string}
     */
    #creditCardImageUrl = '';
    /**
        @public @getter @property
        @returns {string}
     */
    get creditCardImageUrl() {
        return this.#creditCardImageUrl;
    }
    /**
        @public @setter @property
        @param {string} creditCardImageUrl
     */
    set creditCardImageUrl(creditCardImageUrl) {
        this.#creditCardImageUrl = EzString.stringOrEmpty(creditCardImageUrl);
    }

    /**
        @private @field
        @type {string}
     */
    #targetDateTimeZoneId = 'UTC';
    /**
        @public @getter @property
        @returns {string}
     */
    get targetDateTimeZoneId() {
        return this.#targetDateTimeZoneId;
    }
    /**
        @public @setter @property
        @param {string}
     */
    set targetDateTimeZoneId(targetDateTimeZoneId) {
        this.#targetDateTimeZoneId = EzString.stringOrDefault(
            targetDateTimeZoneId,
            ezApi.ezclocker.ezDateTime.activeTimeZone);
    }

    /**
        @private @field
        Only useful when getting data from API
        @type {string}
     */
    #subscriptionEndDate = '';
    /**
        @public @getter @property
        @param {string}
     */
    get subscriptionEndDate() {
        return this.#subscriptionEndDate;
    }
    /**
        @public @setter @property
        @param {string}
     */
    set subscriptionEndDate(subscriptionEndDate) {
        this.#subscriptionEndDate = EzString.stringOrEmpty(subscriptionEndDate);
    }

    /**
        @private @field
        Only useful when getting data from API
        @type {string}
     */
    #subscriptionStartDate = '';
    /**
        @public @getter @property
        @param {string}
     */
    get subscriptionStartDate() {
        return this.#subscriptionStartDate;
    }
    /**
        @public @setter @property
        @param {string}
     */
    set subscriptionStartDate(subscriptionStartDate) {
        this.#subscriptionStartDate = EzString.stringOrEmpty(subscriptionStartDate);
    }

    /**
        @private @field
        Only useful when getting data from API
        @type {string}
     */
    #nextBillingDate = '';
    /**
        @public @getter @property
        @param {string}
     */
    get nextBillingDate() {
        return this.#nextBillingDate;
    }
    /**
        @public @setter @property
        @param {string}
     */
    set nextBillingDate(nextBillingDate) {
        this.#nextBillingDate = EzString.stringOrEmpty(nextBillingDate);
    }

    /**
        @private @field
        Only useful when getting data from API
        @type {string}
     */
    #lastBillingDate = '';
    /**
        @public @getter @property
        @param {string}
     */
    get lastBillingDate() {
        return this.#lastBillingDate;
    }
    /**
        @public @setter @property
        @param {string}
     */
    set lastBillingDate(lastBillingDate) {
        this.#lastBillingDate = EzString.stringOrEmpty(lastBillingDate);
    }

    /**
        @private @field
        Only useful when getting data from API
        @type {boolean}
     */
    #pastDue = '';
    /**
        @public @getter @property
        @param {boolean}
     */
    get pastDue() {
        return this.#pastDue;
    }
    /**
        @public @setter @property
        @param {boolean}
     */
    set pastDue(pastDue) {
        this.#pastDue = EzString.stringOrEmpty(pastDue);
    }

    /**
        @public @method
        Returns this instance as a JSON string
        @returns {String}
        @deprecated
        Migrate to the asJSON property
     */
    get toJson() {
        return this.asJSON;
    }

    /**
        @public @method
        Returns this instance's optimized JSON Object as a JSON string
        @returns {String}
        @deprecated
        Migrate to the inherited asJSON property or ezToJSON() method
     */
    get toObtimizedJson() {
        return ezApi.ezToJson(this.toObtimizedJsonObject);
    }

    /**
        @public @method
        Returns this instance as a JSON object
        @returns {object}
        @deprecated
        Migrate to the inherited asJSONObject property
     */
    get toJsonObject() {
        return {
            id: this.id,
            employerId: this.employerId,
            employeeId: this.employeeId,
            personalId: this.personalId,

            providerCustomerId: this.customerId,
            providerSubscriptionId: this.providerSubscriptionId,
            providerCreditCardId: this.providerCreditCardId,
            providerBillingAddressId: this.providerBillingAddressId,
            paymentProviderId: this.paymentProviderId,

            primaryAddress: this.primaryAddress,

            companyName: this.companyName,

            firstName: this.firstName,
            billingFirstName: this.firstName,
            billingContactFirstName: this.billingContactFirstName,

            lastName: this.lastName,
            billingLastName: this.lastName,
            billingContactLastName: this.billingContactLastName,

            name: this.name,
            billingContactName: this.billingContactName,
            contactName: this.contactName,
            contactFullName: this.contactFullName,
            billingContactFullName: this.billingContactFullName,
            fullName: this.fullName,

            streetAddress: this.streetAddress,
            billingStreetAddress: this.streetAddress,

            extendedAddress: this.extendedAddress,
            billingAdditionalAddress: this.extendedAddress,

            locality: this.locality,
            billingCity: this.locality,

            city: this.locality,
            region: this.region,
            billingState: this.region,
            state: this.region,

            zipcode: this.postalCode,
            postalCode: this.postalCode,
            billingPostalCode: this.postalCode,

            countryName: this.countryName,
            billingCountry: this.countryName,
            country: this.countryName,

            countryCodeAlpha2: this.countryCodeAlpha2,
            countryCodeAlpha3: this.countryCodeAlpha3,
            countryCodeNumeric: this.countryCodeNumeric,

            contactEmail: this.contactEmail,
            email: this.contactEmail,
            contactPhone: this.contactPhone,
            billingEmail: this.contactEmail,

            billingContactNumber: this.contactPhone,
            phoneNumber: this.contactPhone,
            phone: this.contactPhone,

            // Only useful when getting info from the api
            // canceled: this.canceled,
            // updatedIso: this.updatedIso,
            // createdIso: this.createdIso,
            // deletedIso: this.deletedIso,

            source: this.source,

            // Deprecated fields, otherwise only useful when getting info from the api
            // billingAmount: this.billingAmount,
            // braintreeDiscounts: this.braintreeDiscounts,
            // discountId: this.discountId,

            // Deprecated fields, use EzCreditCard instead.
            // Otherwise only useful when getting info from the api
            // cardHolderName: this.cardHolderName,
            // cardNumber: this.cardNumber,
            // cardExpireDate: this.cardExpireDate,
            // cardZipCode: this.cardZipCode,
            // cardSpecialNumber: this.cardSpecialNumber,
            // cardType: this.cardType,
            // creditCardImageUrl: this.creditCardImageUrl
        };
    }

    /**
        @public @method
        Returns this instance's JSON object with properties
        that match the com.ezclocker.domain.entities.EzBillingInformation.java entity used
        in some API payloads.
        @returns {Object}
        @deprecated
        Migrate to the inherited asJSONObject property
     */
    get toEzBillingInformationJsonObject() {
        return {
            id: this.id,
            employerId: this.employerId,
            employeeId: this.employeeId,
            personalId: this.personalId,

            providerCustomerId: this.customerId,
            providerBillingAddressId: this.providerBillingAddressId,
            // Only use when getting info from api
            // providerCreditCardId: this.providerCreditCardId,
            // providerSubscriptionId: this.providerSubscriptionId,

            companyName: this.companyName,
            billingFirstName: this.firstName,
            billingLastName: this.lastName,
            billingStreetAddress: this.streetAddress,
            billingAdditionalAddress: this.extendedAddress,
            billingCity: this.locality,
            billingState: this.region,
            billingPostalCode: this.postalCode,
            billingCountry: this.countryName,
            billingEmail: this.contactEmail,
            billingContactNumber: this.contactPhone,

            // Only useful when getting info from the api
            // createdIso: this.createdIso,
            // updatedIso: this.updatedIso,
            // deletedIso: this.deletedIso,

            // Only useful when getting info from the api
            // subscriptionEndDate: this.subscriptionEndDate,
            // subscriptionStartDate: this.subscriptionStartDate,
            // nextBillingDate: this.nextBillingDate,
            // lastBillingDate: this.lastBillingDate,
            // billingAmount: this.billingAmount,
            // pastDue: this.pastDue,
            // canceled: this.canceled,
            // discountId: this.discountId,
            // braintreeDiscounts: this.braintreeDiscounts,

            targetDateTimeZoneId: this.targetDateTimeZoneId,

            source: this.source
        };
    }

    /**
        @public @method
        Returns this instance's obtimized JSON object that includes only the non-legacy properties.
        No legacy or alternative properties.
        @returns {Object}
        @deprecated
        Migrate to the inherited asJSONObject property
     */
    get toOptimizedJsonObject() {
        // Optimized version contains the non-legacy properties only.
        return {
            id: this.id,
            employerId: this.employerId,
            employeeId: this.employeeId,
            personalId: this.personalId,

            providerCustomerId: this.customerId,
            providerSubscriptionId: this.providerSubscriptionId,
            providerCreditCardId: this.providerCreditCardId,
            providerBillingAddressId: this.providerBillingAddressId,
            paymentProviderId: this.paymentProviderId,

            primaryAddress: this.primaryAddress,

            companyName: this.companyName,

            firstName: this.firstName,

            lastName: this.lastName,

            fullName: this.fullName,

            streetAddress: this.streetAddress,

            extendedAddress: this.extendedAddress,

            locality: this.locality,

            region: this.region,

            postalCode: this.postalCode,

            countryName: this.countryName,

            countryCodeAlpha2: this.countryCodeAlpha2,
            countryCodeAlpha3: this.countryCodeAlpha3,
            countryCodeNumeric: this.countryCodeNumeric,

            contactEmail: this.contactEmail,

            contactPhone: this.contactPhone,

            source: this.source,

            targetDateTimeZoneId: this.targetDateTimeZoneId,

            // Only useful when getting info from the api
            // createdIso: this.createdIso,
            // updatedIso: this.updatedIso,
            // deletedIso: this.deletedIso,
        };
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
            id: this.id,
            employerId: this.employerId,
            employeeId: this.employeeId,
            personalId: this.personalId,
            paymentProviderId: this.paymentProviderId,
            primaryAddress: this.primaryAddress,
            companyName: this.companyName,
            firstName: this.firstName,
            lastName: this.lastName,
            streetAddress: this.streetAddress,
            extendedAddress: this.extendedAddress,
            locality: this.locality,
            region: this.region,
            postalCode: this.postalCode,
            countryName: this.countryName,
            contactEmail: this.contactEmail,
            contactPhone: this.contactPhone,
            providerCreditCardId: this.providerCreditCardId,
            providerBillingAddressId: this.providerBillingAddressId,
            providerSubscriptionId: this.providerSubscriptionId,
            countryCodeAlpha2: this.countryCodeAlpha2,
            countryCodeAlpha3: this.countryCodeAlpha3,
            countryCodeNumeric: this.countryCodeNumeric,
            billingAmount: this.billingAmount,
            braintreeDiscounts: this.braintreeDiscounts,
            discountId: this.discountId,
            canceled: this.canceled,
            updatedIso: this.updatedIso,
            createdIso: this.createdIso,
            deletedIso: this.deletedIso,
            source: this.source,
            cardExpireDate: this.cardExpireDate,

            cardHolderName: this.cardHolderName,
            cardNumber: this.cardNumber,
            cardType: this.cardType,
            cardZipCode: this.cardZipCode,
            creditCardImageUrl: this.creditCardImageUrl,
            targetDateTimeZoneId: this.targetDateTimeZoneId,
            subscriptionEndDate: this.subscriptionEndDate,
            subscriptionStartDate: this.subscriptionStartDate,
            nextBillingDate: this.nextBillingDate,
            lastBillingDate: this.lastBillingDate,
            pastDue: this.pastDue
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

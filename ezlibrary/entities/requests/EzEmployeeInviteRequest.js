import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzJSONSerializable } from '/ezlibrary/entities/EzJSONSerializable.js'

/**
    Entity for employee invite request ezclocker apis.
    Import with:
        import { EzEmployeeInviteRequest } from '/ezlibrary/entities/requests/EzEmployeeInviteRequest.js';
 */
export class EzEmployeeInviteRequest extends EzJSONSerializable {
    /**
        @public @constructor
        Creates a new instance of EzEmployeeInviteRequest
        @param {number} employerId
        @param {string} name
        @param {undefined|nullstring} mobilePhone
        @param {undefined|nullstring} hourlyRate
        @param {undefined|nullstring} pin
        @param {undefined|null|array} authorities
        @param {undefined|null|array} permissions
        @param {undefined|null|boolean} sendInviteByEmail
        @param {undefined|null|boolean} sendInviteToMobilePhone
     */
    constructor(
        employerId,
        name,
        email,
        mobilePhone,
        username,
        hourlyRate,
        pin,
        authorities,
        permissions,
        sendInviteByEmail,
        sendInviteToMobilePhone) {
        super();

        if (!ezApi.ezIsNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                this,
                this.constructor);
        }
        if (!ezApi.ezStringHasLength(name)) {
            throw new EzBadParamException(
                'name',
                this,
                this.constructor);
        }

        this.employerId = ezApi.ezNumberOrNull(employerId);

        this.name = ezApi.ezStringOrNull(name);

        this.email = ezApi.ezStringOrNull(email);

        this.mobilePhone = ezApi.ezStringOrNull(mobilePhone);

        this.hourlyRate = ezApi.ezNumberOrDefault(hourlyRate, 0.00);

        this.pin = ezApi.ezStringOrNull(pin);

        this.authorities = ezApi.ezArrayOrEmpty(authorities);

        this.permissions = ezApi.ezArrayOrEmpty(permissions);

        this.sendInviteByEmail = ezApi.ezIsTrue(sendInviteByEmail);

        this.sendInviteToMobilePhone = ezApi.ezIsTrue(sendInviteToMobilePhone);

        this.username = ezApi.ezStringOrNull(username);
    }

    employerId = null;
    employerNumber = null;
    name = null;
    email = null;
    homePhone = null;
    mobilePhone = null;

    hourlyRate = 0.00;

    homeStreetAddress = null;
    homeAddressAdditional = null;
    homeAddressCity = null;
    homeAddressState = null;
    homeAddressPostalCode = null;

    username = null;
    password = null;
    pin = null;

    sendInviteByEmail = false;
    sendInviteToMobilePhone = false;

    authorities = [];
    permissions = [];

    get targetTimeZoneId() {
        return ezApi.ezclocker.ezDateTime.activeTimeZone;
    }

    get phone() {
        return this.mobilePhone;
    }

    get sendInviteByPhone() {
        return this.sendInviteToMobilePhone;
    }

    /**
        @public @method
        Returns this instance as a JSON object
        @returns {object}
        @deprecated
        Migrate to the inherited the asJSONObject property
     */
    get toJsonObject() {
        return this.asJSONObject();
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
            employerId: this.employerId,
            employerNumber: this.employerNumber,
            name: this.name,
            email: this.email,
            homePhone: this.homePhone,
            mobilePhone: this.mobilePhone,
            hourlyRate: this.hourlyRate,
            homeStreetAddress: this.homeStreetAddress,
            homeAddressAdditional: this.homeAddressAdditional,
            homeAddressCity: this.homeAddressCity,
            homeAddressState: this.homeAddressState,
            homeAddressPostalCode: this.homeAddressPostalCode,
            username: this.username,
            password: this.password,
            pin: this.pin,
            sendInviteByEmail: this.sendInviteByEmail,
            sendInviteToMobilePhone: this.sendInviteToMobilePhone,
            authorities: this.authorities,
            permissions: this.permissions,
            targetTimeZoneId: this.targetTimeZoneId,
            phone: this.phone,
            sendInviteByPhone: this.sendInviteByPhone,
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
            employerId: this.employerId,
            employerNumber: this.employerNumber,
            name: this.name,
            email: this.email,
            homePhone: this.homePhone,
            mobilePhone: this.mobilePhone,
            hourlyRate: this.hourlyRate,
            homeStreetAddress: this.homeStreetAddress,
            homeAddressAdditional: this.homeAddressAdditional,
            homeAddressCity: this.homeAddressCity,
            homeAddressState: this.homeAddressState,
            homeAddressPostalCode: this.homeAddressPostalCode,
            username: this.username,
            password: this.password,
            pin: this.pin,
            sendInviteByEmail: this.sendInviteByEmail,
            sendInviteToMobilePhone: this.sendInviteToMobilePhone,
            authorities: this.authorities,
            permissions: this.permissions,
            targetTimeZoneId: this.targetTimeZoneId,
            phone: this.phone,
            sendInviteByPhone: this.sendInviteByPhone
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

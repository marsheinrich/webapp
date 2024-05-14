import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzJSONSerializable } from '/ezlibrary/entities/EzJSONSerializable.js';

/**
    Javascript entity for the UpdateEmployeeInfoRequest.java entity
    NOTE:
        To convert this object to a JSON string, use EzEmployeeInviteRequest.toJson() instead of
        JSON.serialize or ezApi.ezToJson()
    Import with:
        import { EzUpdateEmployeeInfoRequestEntity } from '/ezlibrary/entities/requests/EzUpdateEmployeeInfoRequestEntity.js';
 */
export class EzUpdateEmployeeInfoRequestEntity extends EzJSONSerializable {
    constructor(
        ezClockerIdContext,
        name,
        email,
        mobilePhone,
        username,
        hourlyRate,
        pin,
        authorities,
        permissions) {
        super();

        if (!ezApi.ezIsValid(ezClockerIdContext) || !ezApi.ezIsNumber(ezClockerIdContext.activeEmployerId) ||
            !ezApi.ezIsNumber(ezClockerIdContext.activeEmployeeId)) {
            throw new EzBadParamException(
                'ezClockerIdContext',
                this,
                this.constructor);
        }
        if (!ezApi.ezStringHasLength(name)) {
            throw new EzBadParamException(
                'name',
                this,
                this.constructor);
        }

        this.username = ezApi.ezStringOrNull(username);

        this.employerId = ezApi.ezNumberOrNull(ezClockerIdContext.activeEmployerId);

        this.employeeId = ezApi.ezNumberOrNull(ezClockerIdContext.activeEmployeeId);

        this.userId = ezApi.ezNumberOrNull(ezClockerIdContext.userId);

        this.name = ezApi.ezStringOrNull(name);

        this.email = ezApi.ezStringOrNull(email);

        this.mobilePhone = ezApi.ezStringOrNull(mobilePhone);

        this.hourlyRate = ezApi.ezIsNumber(hourlyRate)
            ? hourlyRate
            : 0.00;

        this.pin = ezApi.ezStringOrNull(pin);

        this.authorities = ezApi.ezArrayOrEmpty(authorities);

        this.permissions = ezApi.ezArrayOrEmpty(permissions);
    }

    /**
        @public @field
        @type {number}
     */
    employerId = null;

    /**
        @public @field
        @type {number} */
    employeeId = null;

    /**
        @public @field
        @type {number}
     */
    userId = null;

    /**
        @public @field
        @type {string}
     */
    username = null;

    /**
        @public @field
        @type {string}
     */
    employeeNumber = '';

    /**
        @public @field
        @type {string}
     */
    pin = '';

    /**
        @public @field
        @type {string}
     */
    hourlyRate = 0.00;

    /**
        @public @field
        @type {string}
     */
    name = null;

    /**
        @public @field
        @type {string}
     */
    email = null;

    /**
        @public @field
        @type {string}
     */
    homePhone = '';

    /**
        @public @field
        @type {string}
     */
    mobilePhone = '';

    /**
        @public @field
        @type {string}
     */
    homeStreetAddress = '';

    /**
        @public @field
        @type {string}
     */

    homeAddressAdditional = '';
    /**
        @public @field
        @type {string}
     */

    homeAddressCity = '';
    /**
        @public @field
        @type {string}
     */

    homeAddressState = '';
    /**
        @public @field
        @type {string}
     */

    homeAddressPostalCode = '';

    /**
        @public @field
        @type {array}
     */
    authorities = [];

    /** @public @field
        @type {array}
     */
    permissions = [];

    /** @public @field
        @type {boolean}
     */
    sendInviteToEmail = false;

    /**
        @public @field
        @type {boolean}
    */
    sendInviteToMobilePhone = false;

    /**
        @public @readonly @property
        @type {string}
     */
    get source() {
        return 'WEBSITE';
    }

    /**
        @public @readonly @property
        @returns {string}
    */
    get targetTimeZoneId() {
        return ezApi.ezclocker.ezDateTime.activeTimeZone;
    }

    /**
        @public @method
        Returns this instance as a JSON object
        @returns {object}
        @deprecated
        Migrate to the asJSONObject property
     */
    get toJsonObject() {
        return this.asJSONObject;
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
        @override
        @public @readonly @property
        Returns this instance as a JSON Object (will no longer have the getter/setter methods).
        Useful for serailization to JSON.
        @returns {object}
     */
    get asJSONObject() {
        return {
            employerId: this.employerId,
            employeeId: this.employeeId,
            userId: this.userId,
            username: this.username,
            employeeNumber: this.employeeNumber,
            pin: this.pin,
            hourlyRate: this.hourlyRate,
            name: this.name,
            email: this.email,
            homePhone: this.homePhone,
            mobilePhone: this.mobilePhone,
            homeStreetAddress: this.homeStreetAddress,
            homeAddressAdditional: this.homeAddressAdditional,
            homeAddressCity: this.homeAddressCity,
            homeAddressState: this.homeAddressState,
            homeAddressPostalCode: this.homeAddressPostalCode,
            authorities: this.authorities,
            permissions: this.permissions,
            sendInviteToEmail: this.sendInviteToEmail,
            sendInviteToMobilePhone: this.sendInviteToMobilePhone,
            source: this.source,
            targetTimeZoneId: this.targetTimeZoneId
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

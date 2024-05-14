import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import {
    EzObject,
    EzNumber,
    EzString,
    EzBoolean,
    EzArray
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzJSONSerializable } from '/ezlibrary/entities/EzJSONSerializable.js';

/**
 * Javascript entity for Java class UserPermission.java
 * ---------------------------------------------------------------------------
 * Import with:
 *      import { EzUserPermission } from '/ezlibrary/EzUserPermission.js';
 * ---------------------------------------------------------------------------
 */
export class EzUserPermission extends EzJSONSerializable {
    /**
     * @public @constructor
     * Creates a new instance of EzUserPermission
     * @param {number} employerId
     * @param {number} employeeId
     * @param {string} permissionId
     * @param {string|undefined|null} permissionValue
     * @param {boolean|undefined|null} enabled
     */
    constructor(employerId, employeeId, permissionId, permissionValue, enabled, childRestrictions, appliesToRoles) {
        super();

        if (!EzNumber.isNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                this,
                this.constructor);
        }
        if (!EzString.hasLength(permissionId)) {
            throw new EzBadParamException(
                'permissionId',
                this,
                this.constructor);
        }

        this.employerId = employerId;

        this.employeeId = EzNumber.isNumber(employeeId)
            ? employeeId
            : null;

        this.permissionId = permissionId;

        this.permissionValue = EzString.stringOrDefault(permissionValue, null);

        this.enabled = !ezApi.ezIsFalse(enabled);

        this.appliesToRoles = EzArray.arrayOrEmpty(appliesToRoles);

        this.childRestrictions = EzArray.arrayOrEmpty(childRestrictions);
    }

    #employerId;
    /**
     * @public @property @getter
     * Gets
     * @returns {}
     */
    get employerId() {
        return this.#employerId;
    }
    /**
     * @public @property @setter
     * sets
     * @param {} employerId
     */
    set employerId(employerId) {
        this.#employerId = employerId;
    }
    /**
     * @public
     * Returns the EzUsePermission's employerId value
     * @returns {number}
     */
    ezGetEmployerId() {
        return this.employerId;
    }

    #employeeId;
    /**
     * @public @property @getter
     * Gets
     * @returns {}
     */
    get employeeId() {
        return this.#employeeId;
    }
    /**
     * @public @property @setter
     * sets
     * @param {} employeeId
     */
    set employeeId(employeeId) {
        this.#employeeId = employeeId;
    }
    /**
     * @public
     * Returns the EzUsePermission's employeeId value
     * @returns {number}
     */
    ezGetEmployeeId() {
        return this.employeeId;
    }

    #permissionId;
    /**
     * @public @property @getter
     * Gets
     * @returns {}
     */
    get permissionId() {
        return this.#permissionId;
    }
    /**
     * @public @property @setter
     * sets
     * @param {} permissionId
     */
    set permissionId(permissionId) {
        this.#permissionId = permissionId;
    }
    /**
     * @public
     * Returns the EzUsePermission's permisionId value
     * @returns {string}
     */
    ezGetPermissionId() {
        return this.permissionId;
    }

    #enabled;
    /**
     * @public @property @getter
     * Gets
     * @returns {}
     */
    get enabled() {
        return this.#enabled;
    }
    /**
     * @public @property @setter
     * sets
     * @param {} enabled
     */
    set enabled(enabled) {
        this.#enabled = enabled
    }
    /**
     * @public
     * Returns the EzUserPermission's enabled value
     * @returns {boolean}
     */
    ezGetEnabled() {
        return this.enabled;
    }

    #permissionValue;
    /**
     * @public @property @getter
     * Gets
     * @returns {string}
     */
    get permissionValue() {
        return this.#permissionValue;
    }
    /**
     * @public @property @setter
     * sets
     * @param {string} permissionValue
     */
    set permissionValue(permissionValue) {
        this.#permissionValue = permissionValue;
    }
    /**
     * @public
     * Returns the EzUserPermission's permissionValue value
     * @returns {string|null}
     */
    ezGetPermissionValue() {
        return this.permissionValue;
    }

    #childRestrictions;
    /**
     * @public @property @getter
     * Gets
     * @returns {array}
     */
    get childRestrictions() {
        return this.#childRestrictions;
    }
    /**
     * @public @property @setter
     * sets
     * @param {array} childRestrictions
     */
    set childRestrictions(childRestrictions) {
        this.#childRestrictions = childRestrictions;
    }
    /**
     * @public
     * Returns the permission id's that contribute to a parent permission.
     * @returns {array}
     */
    ezGetChildRestrictions() {
        return EzArray.arrayOrEmpty(this.childRestrictions);
    }

    #appliesToRoles;
    /**
     * @public @property @getter
     * Gets
     * @returns {boolean}
     */
    get appliesToRoles() {
        return this.#appliesToRoles;
    }
    /**
     * @public @property @setter
     * sets
     * @param {boolean} appliesToRoles
     */
    set appliesToRoles(appliesToRoles) {
        this.#appliesToRoles = appliesToRoles;
    }
    ezGetAppliesToRoles() {
        return this.appliesToRoles;
    }

    /**
     * @public @method
     * Determines if the EzUserPermission is a valid EzUserPermission
     * @returns {boolean}
     */
    ezIsValid() {
        return EzNumber.isNumber(this.ezGetEmployerId()) &&
            EzNumber.isNumber(this.ezGetEmployeeId()) &&
            EzString.hasLength(this.ezGetPermissionId()) &&
            EzBoolean.isBoolean(this.ezGetEnabled());
    }

    /**
     * @override
     * From class EzJSONSerializable
     * @public @readonly @property
     * Returns this instance as a JSON Object (will no longer have the getter/setter methods).
     * Useful for serailization to JSON.
     * @returns {object}
    */
    get asJSONObject() {
        return {
            employerId: this.ezGetEmployerId(),
            employeeId: this.ezGetEmployeeId(),
            permissionId: this.ezGetPermissionId(),
            permissionValue: this.ezGetPermissionValue(),
            enabled: this.ezGetEnabled(),
            childRestrictions: this.ezGetChildRestrictions(),
            appliesToRoles: this.appliesToRoles
        };
    }

    /**
     * @override
     * From class EzJSONSerializable
     * @public @method
     * Copies properties from the provided jsonObject to this instance (even if this instance does not define the property)
     * @param {Object} jsonObject
     * @returns {Object}
     * Returns this instance with the key & values from the provided jsonObject.
    */
    ezFromJSONObject(jsonObject) {
        if (EzObject.isValid(jsonObject)) {
            this.employerId = jsonObject.employerId;

            this.employeeId = jsonObject.employeeId;

            this.permissionId = jsonObject.permissionId;

            this.permissionValue = jsonObject.permissionValue;

            this.enabled = jsonObject.enabled;

            this.childRestrictions = jsonObject.childRestrictions;

            this.appliesToRoles = jsonObject.appliesToRoles;
        }

        return this;
    }
}
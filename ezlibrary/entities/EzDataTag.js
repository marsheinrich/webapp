/*
    ---------------------------------------------------------------------------
    !! DO NOT IMPORT THE FOLLOWING INTO THIS CLASS !!
    ---------------------------------------------------------------------------
    import {
            EzEntity,
            EzBillingAddress,
            EzCreditCard,
            EzDataTag,
            EzDataTagMap,
            EzTimeEntry,
            EzWantEventSettings,
            EzBillingInfoRequest,
            EzClockInRequest,
            EzClockOutRequest,
            EzEmployeeInviteRequest,
            EzPaymentInfoRequest,
            EzTimeEntryRequest,
            EzUpdateBillingAddressRequest,
            EzUpdateEmployeInfoRequestEntity,
            EzUpdateCreditCardRequests,
            EzApiResponse,
            EzEntityCollectionResponse,
            EzEntityResponse
    } from '/ezlibrary/entities/EzEntities.js';
    NOTE: If you need any of the above classes, import them individually.
    ---------------------------------------------------------------------------
*/

// Exceptions
import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import { EzJSONSerializable } from '/ezlibrary/entities/EzJSONSerializable.js'

// Helpers
import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzArray
} from '/ezlibrary/helpers/EzHelpers.js'

// Enumerations
import {
    EzDataTagType,
    EzInstanceState,
    EzDataTagValueType
} from '/ezlibrary/enums/EzEnumerations.js';

/**
 * TODO: Change parent class to EzEntity
 * @class
 * @extends {EzJSONSerializable}
 * @description
 * Javascript entity equivlant of the Java EzDataTag.java entity.
 * To convert this object to a JSON string:
 *     * Call the instances asJson proeprty
 *     * Call the instances ezToJson() function
 *     * Use ezApi.ezToJson(instance) or EzJson.toJson(instance)
 * DO NOT USE JSON.serialize directly to avoid losing any getter/settter properties.
 * ---------------------------------------------------------------------
 * Import with:
 *     import { EzDataTag } from '/ezlibrary/entities/EzDataTag.js';
 * ---------------------------------------------------------------------
 * Import if also importing other entity classes:
 *     import {
 *         ... other classes ...
 *         EzDataTag
 *     } from '/ezlibrary/entities/EzEntities.js';
 * ---------------------------------------------------------------------
 */
export class EzDataTag extends EzJSONSerializable {
    /**
     * @static
     * @public @method
     * Returns the provided simpleJSONObjectOrEzDataTagEntity as an EzDatTag entity.
     * If the provied simpleJSONObjectOrEzDataTagEntity is already a EzDataTag entity, it is returned.
     * Otherwise, a new EzDataTag instance is creatd and the matching property values from the
     * simpleJavaScriptObjectOrEzDataTagEntity get assigned to the EzDataTag instance's properties.
     * @param {object|EzDataTag} dataTag
     * @returns {EzDataTag}
     */
    static asEzDataTag(dataTag) {
        if (!EzObject.isValid(dataTag)) {
            throw new EzBadParamException(
                'dataTag',
                EzDataTag,
                EzDataTag.ezInstanceFrom);
        }

        return EzBoolean.isTrue(EzDataTag.isEzDataTag(dataTag))
            // Detected the provided instance is already EzDataTag entity
            ? dataTag
            : new EzDataTag(
                // id
                EzNumber.numberOrNull(dataTag.id),
                // employerId
                EzNumber.numberOrNull(dataTag.employerId),
                // dataTagType
                EzDataTagType.ezAsEnum(
                    EzString.stringWithLengthOrDefault(
                        dataTag.dataTagType,
                        EzDataTagType.UNKNOWN)),
                // tagName
                EzString.stringOrEmpty(dataTag.tagName),
                // description
                EzString.stringOrEmpty(dataTag.description),
                // valueName
                EzString.stringOrEmpty(dataTag.valueName),
                // valueType
                EzDataTagValueType.ezAsEnum(dataTag.valueType),
                // value
                EzString.stringOrEmpty(dataTag.value),
                // enabled
                EzBoolean.booleanOrTrue(dataTag.enabled),
                // archived
                EzBoolean.booleanOrFalse(dataTag.archived),
                // deleted
                EzBoolean.booleanOrFalse(dataTag.deleted),
                // personalId
                EzNumber.numberOrNull(dataTag.personalId),);
    }

    /**
     * @static
     * @public @method
     * Transforms the provided dataTags array into an array of simple data tag Javascript objects.
     * The data tag Javascript objects will have fields for all the EzDataTag's properties/fields
     * The data tag Javascript objects will not have a constructor or any additional methods, getters, or setters.
     * @param {array} dataTags
     * An array of one of the following types:
     *     1) EzDataTag entity objects
     *     2) Simple data tag Javascript objects
     * @returns {array}
     * Array of simple data tag Javascript objects
     */
    static toArrayOfSimpleDataTagJavascriptObjects(dataTags) {
        if (!EzArray.isArray(dataTags)) {
            throw new EzBadParamException(
                'dataTags',
                EzDataTag,
                EzDataTag.toJSONArray);
        }

        let simpleDataTags = [];

        if (!EzArray.arrayHasLength(dataTags)) {
            return simpleDataTags;
        }

        for (let dataTag of dataTags) {
            simpleDataTags.push(EzDataTag.asEzDataTag(dataTag));
        }

        return simpleDataTags;
    }

    /**
     * @static
     * @public @method
     * Transforms the provided dataTags array into an array of EzDataTag instances.
     * If an object in the dataTags array is already a EzDataTag then the object
     * is added to the result array.
     * If an object in the dataTags array is not a EzDataTag then the object is
     * transformed to a new EzDataTag entity and the new entity is added to the result array.
     * If the dataTags entry is undefined or null, then null is added to the result array.
     * @param {array} dataTags
     * @returns {array}
     * An array of EzDataTag instances or null values.
     */
    static toArrayOfEzDataTags(dataTags) {
        if (!EzArray.isArray(dataTags)) {
            throw new EzBadParamException(
                'dataTags',
                EzDataTag,
                EzDataTag.toArrayOfEzDataTags);
        }

        if (!EzArray.arrayHasLength(dataTags)) {
            return [];
        }

        let ezDataTags = [];

        for (let dataTag of dataTags) {
            ezDataTags.push(
                EzObject.isValid(dataTag)
                    ? EzDataTag.asEzDataTag(dataTag)
                    : null);
        }

        return ezDataTags;
    }

    /**
     * @static
     * @public @method
     * Transforms the provided ezDataTags (array of EzDataTag entities) to a
     * a JSON array string.
     * @param {array} dataTags
     * Arrray of EzDataTag entities
     * @returns {string}
     * JSON array of EzDataTags (transformed to simple JSON Objects, no getters/setters)
     */
    static toJSONArray(dataTags) {
        if (!EzArray.isArray(dataTags)) {
            throw new EzBadParamException(
                'dataTags',
                EzDataTag,
                EzDataTag.toJSONArray);
        }

        return EzJson.toJsonArray(
            EzDataTag.toArrayOfSimpleDataTagJavascriptObjects(dataTags));
    }

    /**
     * @static
     * @public @method
     * Determines if the provided value is a EzDataTag entity or not.
     * @param {undefined|null|EzDataTag|*} value
     * @returns {boolean}
     */
    static isEzDataTag(value) {
        return EzObject.isValid(value) && EzDataTag.constructor.name === value.constructor.name;
    }

    /**
     * @public @constructor
     * Creates a new instance of
     * @param {undefined|null|number} id
     * @param {undefined|null|number} employerId
     * @param {undefined|null|string} dataTagType
     * @param {undefined|null|string} tagName
     * @param {undefined|null|string} description
     * @param {undefined|null|string} valueName
     * @param {undefined|null|string} valueType
     * @param {undefined|null|string} value
     * @param {undefined|null|boolean} enabled
     */
    constructor(id, employerId, dataTagType, tagName, description, valueName, valueType, value, enabled,
        archived, deleted, personalId) {
        super();

        this.id = EzNumber.numberOrNull(id);

        this.employerId = !EzObject.isValid(personalId) && EzNumber.isNumber(employerId)
            ? employerId
            : ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id;

        this.personalId = null == !EzObject.isValid(employerId) && EzNumber.isNumber(personalId)
            ? personalId
            : null;

        this.dataTagType = EzString.stringHasLength(dataTagType)
            ? dataTagType
            : EzDataTagType.JOB_CODE;

        this.tagName = EzString.stringOrEmpty(tagName);

        this.description = EzString.stringOrEmpty(description);

        this.valueName = EzString.stringOrDefault(
            valueName,
            'Hourly Rate');

        this.valueType = EzString.stringOrDefault(
            valueType,
            'Double');

        this.value = EzString.stringOrDefault(
            value,
            '0.00');

        this.enabled = EzBoolean.booleanOrTrue(enabled);

        this.archived = EzBoolean.booleanOrTrue(archived);

        this.deleted = EzBoolean.booleanOrTrue(deleted);

        this.ezStates.push(EzInstanceState.CONSTRUCTED);
    }

    ezStates = [];

    /**
     * @public @field
     * @returns {number}
     */
    id = null;

    /**
     * @public @field
     * @returns {number}
     */
    employerId = null;

    /**
     * @public @field
     * @returns {number}
     */
    personalId = null;

    /**
     * @public @field
     * @returns {string}
     */
    ezDataTagType = EzDataTagType.JOB_CODE;

    /**
     * @public @field
     * @returns {string}
     */
    tagName = '';

    /**
     * @public @field
     * @returns {string}
     */
    displayValue = '';

    /**
     * @public @field
     * @returns {string}
     */
    description = '';

    /**
     * @public @field
     * @returns {string}
     */
    valueName = '';

    /**
     * @public @field
     * @returns {string}
     */
    valueType = '';

    /**
     * @public @field
     * @returns {string}
     */
    value = '';

    /**
     * @public @field
     * @returns {boolean}
     */
    enabled = true;

    /**
     * @public @field
     * @returns {boolean}
     */
    archived = false;

    /**
     * @public @field
     * @returns {boolean}
     */
    deleted = false;

    /**
     * @public @field
     * @returns {string}
     */
    createdIso = null;

    /**
     * @public @field
     * @returns {string}
     */
    updatedIso = null;

    /**
     * @public @field
     * @returns {string}
     */
    source = null;

    /**
     * @public @field
     * Map of data tags by EzClockerEntityType
     */
    dataTagMapsByEzEntityType = {};

    /**
     * @public @field
     * List of entities the datatag is assigned to.
     */
    assignedToEntities = [];

    /**
     * @public @method
     * Copies the fields from the provided ezDataTag to this instance.
     * @param {EzDataTag|object} ezDataTag
     */
    ezCopyFrom(aDataTagObject) {
        if (!EzObject.isValid(aDataTagObject)) {
            throw new EzBadParamException(
                'ezDataTag',
                this,
                self.copyFrom);
        }

        this.id = EzNumber.isNumber(aDataTagObject.id)
            ? aDataTagObject.id
            : null;
        this.employerId = EzNumber.isNumber(aDataTagObject.employerId)
            ? aDataTagObject.employerId
            : null;
        this.personalId = EzNumber.isNumber(aDataTagObject.personalId)
            ? aDataTagObject.personalId
            : null;

        this.ezDataTagType = EzString.stringOrDefault(
            aDataTagObject.ezDataTagType,
            EzDataTagType.JOB_CODE);

        this.tagName = EzString.stringOrEmpty(aDataTagObject.tagName);

        this.displayValue = EzString.stringOrEmpty(aDataTagObject.displayValue);

        this.description = EzString.stringOrEmpty(aDataTagObject.description);

        this.valueName = EzString.stringOrEmpty(aDataTagObject.valueName);

        this.valueType = EzString.stringOrEmpty(aDataTagObject.valueType);

        this.value = EzString.stringOrEmpty(aDataTagObject.value);

        this.enabled = EzBoolean.isTrue(aDataTagObject.enabled);

        this.archived = EzBoolean.isTrue(aDataTagObject.archived);

        this.deleted = EzBoolean.isTrue(aDataTagObject.deleted);
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
            id: this.id,
            employerId: this.employerId,
            personalId: this.personalId,
            ezDataTagType: this.ezDataTagType,
            tagName: this.tagName,
            displayValue: this.displayValue,
            description: this.description,
            valueName: this.valueName,
            valueType: this.valueType,
            value: this.value,
            enabled: this.enabled,
            archived: this.archived,
            deleted: this.deleted,
            createdIso: this.createdIso,
            updatedIso: this.updatedIso,
            source: this.source,
            dataTagMapsByEzEntityType: this.dataTagMapsByEzEntityType,
            assignedToEntities: this.assignedToEntities,
            ezStates: this.ezStates
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
        return super.ezFromJSONObject(jsonObject);
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

/*
    ---------------------------------------------------------------------------
    !! DO NOT IMPORT THE FOLLOWING INTO THIS CLASS !!
    ---------------------------------------------------------------------------
    import {
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
            EzEntity,
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

// Base Classes
import { EzJSONSerializable } from '/ezlibrary/entities/EzJSONSerializable.js';

// Helpers
import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzArray
} from '/ezlibrary/helpers/EzHelpers.js';

// Enumerations
import {
    EzEntityType
} from '/ezlibrary/enums/EzEnumerations.js';

/**
    // TODO: Change parent class to EzEntity
    @class
    @extends {EzJSONSerializable}
    @description
    Javascript entity equivlent to Java's EzDataTagMap.java
    To convert this object to a JSON string:
        * Call the instances asJson proeprty
        * Call the instances ezToJson() function
        * Use ezApi.ezToJson(instance) or EzJson.toJson(instance)
    DO NOT USE JSON.serialize directly to avoid losing any getter/settter properties.
    ---------------------------------------------------------------------
    Import with:
        import { EzDataTagMap } from '/ezlibrary/entities/EzDataTagMap.js';
    ---------------------------------------------------------------------
    Import if also importing other entity classes:
        import {
            ... <other entity classes> ...
            EzDataTagMap
        } from '/ezlibrary/entities/EzEntities.js';
    ---------------------------------------------------------------------
 */
export class EzDataTagMap extends EzJSONSerializable {
    /**
        @static
        @public @method
        Returns the provided simpleJavaScriptObjectOrEzDataTagMapEntity as an EzDatTag entity.
        If the provied simpleJSONObjectOrEzDataTagEntity is already a EzDataTagMap entity, it is returned.
        Otherwise, a new EzDataTagMap instance is creatd and the matching property values from the
        simpleJavaScriptObjectOrEzDataTagMapEntity get assigned to the EzDataTagMap instance's properties.
        @param {object|EzDataTagMap} simpleJavaScriptObjectOrEzDataTagEntity
        @returns {EzDataTagMap}
     */
    static asEzDataTagMap(dataTagMap) {
        if (!EzObject.isValid(dataTagMap)) {
            throw new EzBadParamException(
                'dataTagMap',
                EzDataTagMap,
                EzDataTagMap.ezInstanceFrom);
        }

        if (EzBoolean.booleanOrFalse(EzDataTagMap.isEzDataTagMap(dataTagMap))) {
            // Detected the provided instance is already EzDataTag entity
            return dataTagMap;
        }

        return new EzDataTagMap(
            EzNumber.numberOrNull(dataTagMap.id),
            EzNumber.numberOrNull(dataTagMap.employerId),
            EzNumber.numberOrNull(dataTagMap.dataTagId),
            EzString.stringOrEmpty(dataTagMap.assignedEzEntityTypeName),
            EzNumber.numberOrNull(dataTagMap.assignedEzEntityId),
            EzBoolean.booleanOrFalse(dataTagMap.assignedToAllEntities),
            EzNumber.numberOrDefault(dataTagMap.level, 0),
            EzBoolean.isTrue(dataTagMap.remove));
    }

    /**
        @static
        @public @method
        Transforms the provided dataTagMaps array into an array of EzDataTagMap instances.
        If an object in the dataTagMaps array is already a EzDataTagMap then the object
        is added to the result array.
        If an object in the dataTagMaps array is not a EzDataTagMap then the object is
        transformed to a new EzDataTagMap entity and the new entity is added to the result array.
        If the dataTagMaps entry is undefined or null, then null is added to the result array.
        @param {array} dataTagMaps
        @returns {array}
        An array of EzDataTagMap instances or null values.
     */
    static toArrayOfEzDataTagMaps(dataTagMaps) {
        if (!EzArray.isArray(dataTagMaps)) {
            throw new EzBadParamException(
                'dataTagMaps',
                EzDataTagMap,
                EzDataTagMap.toArrayOfEzDataTagMaps);
        }

        if (!EzArray.arrayHasLength(dataTagMaps)) {
            return [];
        }

        let ezDataTagMaps = [];

        for (let dataTagMap of dataTagMaps) {
            ezDataTagMaps.push(
                EzObject.isValid(dataTagMap)
                    ? EzDataTagMap.asEzDataTagMap(dataTagMap)
                    : null);
        }

        return ezDataTagMaps;
    }

    /**
        @static
        @public @method
        Transforms the provided ezDataTagMaps (array of EzDataTagMap entities) to a simple
        JSON Object array (without gettters/setters).
        @param {array} ezDataTagMaps
        Arrray of EzDataTagMap entities
        @returns {array}
        Array of EzDataTagMap entities transformed into a single JSON object.
     */
    static toArrayOfSimpleDataTagMapJavascriptObjects(jsArrayOfEzDataTagMapEntities) {
        if (!EzArray.isArray(jsArrayOfEzDataTagMapEntities)) {
            throw new EzBadParamException(
                'jsArrayOfEzDataTagMapEntities',
                EzDataTagMap,
                EzDataTagMap.toJSONArray);
        }

        if (!EzArray.arrayHasLength(jsArrayOfEzDataTagMapEntities)) {
            return [];
        }

        let simpleJSArrayOfJSObjects = [];

        for (let ezDataTagMap of jsArrayOfEzDataTagMapEntities) {
            simpleJSArrayOfJSObjects.push(
                EzDataTagMap.asEzDataTagMap(ezDataTagMap)
                    .asJSONObject);
        }

        return simpleJSArrayOfJSObjects;
    }

    /**
        @static
        @public @method
        Transforms the provided ezDataTagMaps to a simple Javascript object array and then transaforms
        the simple Javascript object array to a JSON array string.
        If the object in the array is already a simple Javascript object, then that simple Javascript object
        is transformed into a EzDataTagMap instance before further processing.
        @param {array} ezDataTagMaps
        Arrray of EzDataTagMap entities or Javascript objects with matching EzDataTagMap properties.
        @returns {string}
        JSON array of EzDataTagMaps transformed to simple JSON Objects (aka no getters/setters) and then
        transformed to a JSON array string.
     */
    static toJSONArray(ezDataTagMaps) {
        if (!EzArray.isArray(ezDataTagMaps)) {
            throw new EzBadParamException(
                'ezDataTagMaps',
                EzDataTagMap,
                EzDataTagMap.toJSONArray);
        }

        let simpleJSArrayOfJSObjects = EzDataTagMap.toArrayOfSimpleDataTagMapJavascriptObjects(jsArrayOfEzDataTagMapEntities);

        return EzJson.toJsonArray(simpleJSArrayOfJSObjects);
    }

    /**
        @static
        @public @method
        Determines if the provided value is a EzDataTag entity or not.
        @param {undefined|null|EzDataTag|*} value
        @returns {boolean}
     */
    static isEzDataTagMap(value) {
        return EzObject.isValid(value) && EzDataTagMap.constructor.name === value.constructor.name;
    }

    /**
        @static
        @public @method
        Creates a new DataTagMap for a time entry.
        @param {number} employerId
        A valid employerId is required.
        @param {number} dataTagId
        A valid dataTagId id is required
        @param {number} assignedEzEntityId
        Optional - New time entries will not have an id until they get persisted so null is used to indicate
        the DataTagMap is not yet persisted and will need persisted AFTER the time entry Id is known.
        For existing time entries passin the timeEntryId
        Default: null
     */
    static newTimeEntryDataTagMap(
        employerId = null,
        dataTagId = null,
        assignedEzEntityId = null) {

        return new EzDataTagMap(
            // id
            null,
            // employerId
            employerId,
            // dataTagId
            dataTagId,
            // assignedEzEntityTypeName
            EzEntityType.TIME_ENTRY,
            // assignedEzEntityId
            assignedEzEntityId,
            // assignedToAllEntities
            false,
            // level
            0,
            // remove
            false);
    }

    /**
        @public @constructor
        Creates a new EzDataTagMap instance.
        @param {undefined|null|number} id
        Optional id. Use null to represent a new DataTabMap that is not yet persisted to the db.
        Default: null
        @param {number} employerId
        Value is required to create a new instance!
        @param {undefined|null|number} dataTagId
        Value is required to create a new instance!
        @param {string} assignedEzEntityTypeName
        A valid enum property value from EzEntityType
        Value is required to create a new instance!
        @param {undefined|null|number} assignedEzEntityId
        Default is: null
        @param {undefined|null||boolean} assignedToAllEntities
        Default is: false
        @param {undefined|null|number} level
        Default is: 0
        @param {undefined|null||boolean} remove
        Default is: false
     */
    constructor(
        id = null,
        employerId = null,
        dataTagId = null,
        assignedEzEntityTypeName = null,
        assignedEzEntityId = null,
        assignedToAllEntities = false,
        level = 0,
        remove = false) {
        super();

        if (!EzNumber.isNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                this,
                this.constructor);
        }
        if (!EzNumber.isNumber(dataTagId)) {
            throw new EzBadParamException(
                'dataTagId',
                this,
                this.constructor);
        }
        if (!EzString.stringHasLength(assignedEzEntityTypeName)) {
            throw new EzBadParamException(
                'assignedEzEntityTypeName',
                this,
                this.constructor);
        }

        this.id = id;
        this.employerId = employerId;
        this.dataTagId = dataTagId;
        this.assignedEzEntityTypeName = assignedEzEntityTypeName;
        this.assignedEzEntityId = assignedEzEntityId;
        this.assignedToAllEntities = assignedToAllEntities;
        this.level = level;
        this.remove = remove;
    }

    /**
        @private @field
        Stores the DataTagMap's id
        @type {number}
     */
    #id = null;

    /**
        @public @property @getter
        Gets the DataTagMap's id
        @returns {number}
     */
    get id() {
        return this.#id;
    }

    /**
        @public @property @setter
        Sets the DataTagMap's id
        @param {number} id
     */
    set id(id) {
        this.#id = EzNumber.numberOrNull(id);
    }

    /**
        @private @field
        Stores the DataTagMap's employerId
        @type {number}
     */
    #employerId = null;

    /**
        @public @property @getter
        Gets the DataTagMap's employerId
        @returns {number}
     */
    get employerId() {
        return this.#employerId;
    }

    /**
        @public @property @setter
        Sets the DataTagMap's employerId
        @param {number} employerId
     */
    set employerId(employerId) {
        this.#employerId = EzNumber.numberOrNull(employerId);
    }

    /**
        @private @field
        Stores the personal id for this EzDataTagMap instance.
        @type {number}
     */
    #personalId

    /**
        @public @property @getter
        Gets the personal id for this EzDataTagMap instance.
        @returns {number}
     */
    get personalId() {
        return this.#personalId;
    }

    /**
        @public @property @setter
        Sets the personal id for this EzDataTagMap instance.
        @param {number} personalId
     */
    set personalId(personalId) {
        this.#personalId = EzNumber.numberOrNull(personalId);
    }

    /**
        @private @field
        Stores the DataTagMap's dataTagId
        @type {number}
     */
    #dataTagId = null;

    /**
        @public @property @getter
        Gets the DataTagMap's dataTagId
        @returns {number}
     */
    get dataTagId() {
        return this.#dataTagId;
    }

    /**
        @public @property @setter
        Sets the DataTagMap's dataTagId
        @param {number} dataTagId
     */
    set dataTagId(dataTagId) {
        this.#dataTagId = EzNumber.numberOrNull(dataTagId);
    }

    /**
        @private @field
        Stores the DataTagMap's assignedEzEntityTypeName
        @type {number}
        A valid enum property value from EzEntityType
     */
    #assignedEzEntityTypeName = EzEntityType.UNKNOWN;

    /**
        @public @property @getter
        Gets the DataTagMap's assignedEzEntityTypeName
        @returns {string}
        A valid enum property value from EzEntityType
     */
    get assignedEzEntityTypeName() {
        return this.#assignedEzEntityTypeName;
    }

    /**
        @public @property @setter
        Sets the DataTagMap's assignedEzEntityTypeName
        @param {string} assignedEzEntityTypeName
        A valid enum property value from EzEntityType
     */
    set assignedEzEntityTypeName(assignedEzEntityTypeName) {
        this.#assignedEzEntityTypeName = EzEntityType.ezAsEnum(assignedEzEntityTypeName);
    }

    /**
        @private @field
        Stores the DataTagMap's assignedEzEntityId
        @type {number}
     */
    #assignedEzEntityId = null;

    /**
        @public @property @getter
        Gets the DataTagMap's assignedEzEntityId
        @returns {number}
     */
    get assignedEzEntityId() {
        return this.#assignedEzEntityId;
    }

    /**
        @public @property @setter
        Sets the DataTagMap's assignedEzEntityId
        @param {number} assignedEzEntityId
     */
    set assignedEzEntityId(assignedEzEntityId) {
        this.#assignedEzEntityId = EzNumber.numberOrNull(assignedEzEntityId);
    }

    /**
        @private @field
        Stores the DataTagMap's assignedToAllEntities
        Default is false
        @type {boolean}
     */
    #assignedToAllEntities = false;

    /**
        @public @property @getter
        Gets the DataTagMap's assignedToAllEntities
        @returns {boolean}
     */
    get assignedToAllEntities() {
        return this.#assignedToAllEntities;
    }

    /**
        @public @property @setter
        Sets the DataTagMap's assignedToAllEntities
        @param {boolean} assignedToAllEntities
     */
    set assignedToAllEntities(assignedToAllEntities) {
        this.#assignedToAllEntities = EzBoolean.isTrue(assignedToAllEntities);
    }

    /**
        @private @field
        Stores the DataTagMap's level
        Default is 0
        @type {number}
     */
    #level = 0;

    /**
        @public @property @getter
        Gets the DataTagMap's level
        @returns {number}
     */
    get level() {
        return this.#level;
    }

    /**
        @public @property @setter
        Sets the DataTagMap's level
        @param {number} level
     */
    set level(level) {
        this.#level = EzNumber.numberOrDefault(level, 0);
    }

    /**
        @private @field
        Stores the if the DataTag is to get removed during
        an update api call.
        Default is false
        @type {boolean}
     */
    #remove = false;

    /**
        @public @property @getter
        Gets if the DataTag is to get removed during
        an update api call.
        @returns {boolean}
     */
    get remove() {
        return this.#remove;
    }

    /**
        @public @property @setter
        Sets if the DataTag is to get removed during
        an update api call.
        @param {boolean} remove
     */
    set remove(remove) {
        this.#remove = EzBoolean.isTrue(remove);
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
        Returns this instance as a JSON object
        @returns {object}
        @deprecated
        Migrate to the asJSONObject property
     */
    get toJSONObject() {
        return this.asJSONObject;
    }

    /**
        @public @method
        Returns this instance as a JSON string
        @returns {String}
        @deprecated
        Migrate to asJSON property
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
            id: this.id,
            employerId: this.employerId,
            personalId: this.personalId,
            dataTagId: this.dataTagId,
            assignedEzEntityTypeName: this.assignedEzEntityTypeName,
            assignedEzEntityId: this.assignedEzEntityId,
            assignedToAllEntities: this.assignedToAllEntities,
            level: this.level,
            remove: this.remove
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

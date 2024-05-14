// Base classes
import { EzJSONSerializable } from '/ezlibrary/entities/EzJSONSerializable.js'

// Helper classes
import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzArray
} from '/ezlibrary/helpers/EzHelpers.js';

/**
    TODO: Move class to /ezlibrary/entities path
    @class
    @extends {EzJSONSerializable}
    @description
    Javascript equivalant of Java's EzEntity.java class.
    NOTE: When this class is modified you will also need to make the same
    modifications to the Java class EzEntity.java (com.ezclocker.domain.entities).
    ---------------------------------------------------------------------
    Import with:
        import { EzEntity } from '/ezlibrary/entities/requests/EzEntity.js';
    ---------------------------------------------------------------------
    Import with other entity classes:
        Import with:
        import {
            < ... other entity classes ..>
            EzEntity
    } from '/ezlibrary/entities/EzEntities.js';
    ---------------------------------------------------------------------
 */
export class EzEntity extends EzJSONSerializable {
     /**
        @static
        @public @method
        Returns the provided entity as an EzEntity entity.
        If the provied entity is already a EzEntity entity, it is returned.
        Otherwise, a new EzEntity instance is creatd and the matching property values from the
        entity get assigned to the EzEntity instance's properties.
        @param {object|EzEntity} entity
        @returns {EzEntity}
     */
    static asEzEntity(entity) {
        if (!EzObject.isValid(entity)) {
            throw new EzBadParamException(
                'entity',
                EzEntity,
                EzEntity.ezInstanceFrom);
        }

        if (EzBoolean.booleanOrFalse(EzEntity.isEzEntity(entity))) {
            // Detected the provided instance is already EzDataTag entity
            return entity;
        }

        return new EzEntity(
            entity.id,
            entity.createdIso,
            entity.updatedIso,
            entity.deletedIso,
            entity.source);
    }

    /**
        @static
        @public @method
        Transforms the provided entities into an array of simple entity Javascript objects.
        The simple entity Javascript objects will have fields for all the EzEntity's properties/fields
        The simple entity Javascript object will not have a constructor or any additional methods, getters, or setters.
        @param {array} entities
        An array of one of the following types:
            1) EzEntity entity objects
            2) Simple entity Javascript objects
        @returns {array}
        Array of simple data tag map Javascript objects (without getters, setters, constructor, or other methods found on EzEntity)
     */
    static toArrayOfSimpleEntityJavascriptObjects(entities) {
        if (!EzArray.isArray(entities)) {
            throw new EzBadParamException(
                'entities',
                EzEntity,
                EzEntity.toJSONArray);
        }

        let simpleEntities = [];

        if (!EzArray.arrayHasLength(entities))  {
            return simpleEntities;
        }

        for (let entity of entities) {
            simpleEntities.push(EzEntity.asEzEntity(entity));
        }

        return simpleEntities;
    }

    /**
        @static
        @public @method
        Transforms the provided entities into an array of simple Javascript objects (no getter or setter methos).
        @param {array} entities
        Array of EzEntity instances or an array of simple Javascript objects with fields that match at least one EzEntity property/field.
        @returns {string}
        JSON array string
     */
    static toJSONArray(entities) {
        if (!EzArray.isArray(entities)) {
            throw new EzBadParamException(
                'entities',
                EzDataTag,
                EzDataTag.toJSONArray);
        }

        let simpleEntities = EzEntity.toSimpleJavascriptObjectArray(entities);

        return EzJson.toJsonArray(simpleEntities);
    }

    /**
        @static
        @public @method
        Determines if the provided value is a EzEntity entity or not.
        @param {undefined|null|EzDataTag|*} value
        @returns {boolean}
     */
    static isEzEntity(value) {
        return EzObject.isValid(value) && EzEntity.constructor.name === value.constructor.name;
    }

    /**
        @static
        @public @method
        Creates a new EzEntity instance and copied the
        properties from the provided ezEntity instance
        to the new EzInstance.
        If the provied ezEntity is undefined or null then
        null is returned.
        @param {undefined|null|object|EzEntity} entity
        @returns {EzEntity}
        @deprecated
        Migrate to EzEntity.asEzEntity(entity)
     */
    static ezCopyFrom(entity) {
        return EzEntity.asEzDataTag(entity);
    }

    /**
        @public @constructor
        Creates a new instance of EzEntity
        @param {Number} id
        @param {String} createdIso
        @param {String} updatedIso
        @param {String} deletedIso
        @param {String} source
     */
    constructor(id, createdIso, updatedIso, deletedIso, source) {
        super();

        this.id = id;
        this.createdIso = createdIso;
        this.updatedIso = updatedIso;
        this.deletedIso = deletedIso;
        this.source = source;
    }

    #id = null;

    get id() {
        return this.#id;
    }

    set id(id) {
        this.#id = EzNumber.numberOrNull(id);
    }

    #createdIso = null;

    get createdIso() {
        return this.#createdIso;
    }

    set createdIso(createdIso) {
        this.#createdIso = EzString.stringOrNull(createdIso);
    }

    #updatedIso = null;

    get updatedIso() {
        return this.#updatedIso;
    }

    set updatedIso(updatedIso) {
        this.#updatedIso = EzString.stringOrNull(updatedIso);
    }

    #deletedIso = null;

    get deletedIso() {
        return this.#deletedIso;
    }

    set deletedIso(deletedIso) {
        this.#deletedIso = EzString.stringOrNull(deletedIso);
    }

    #source = null;

    get source() {
        return this.#source;
    }

    set source(source) {
        this.#source = EzString.stringOrDefault(source, 'WEBSITE');
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
            id: id,
            createdIso: createdIso,
            updatedIso: updatedIso,
            deletedIso: deletedIso,
            source: source
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

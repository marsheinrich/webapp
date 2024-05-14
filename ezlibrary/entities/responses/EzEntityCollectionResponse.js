import { EzApiResponse } from '/ezlibrary/entities/responses/EzApiResponse.js';

import {
    EzObject,
    EzNumber,
    EzString,
    EzArray
} from '/ezlibrary/helpers/EzHelpers.js';

/**
    Javascript entity equivlant for the Java entity EzEntityCollectionResponse<T>
    Import with:
        import { EzEntityCollectionResponse } from '/ezlibrary/entities/responses/EzEntityCollectionResponse.js';
 */
export class EzEntityCollectionResponse extends EzApiResponse {
    /**
        @static
        @public @method
        Transforms the provided response to an EzEntityCollectionResponse instance.
        @param {object} response
        @returns {EzEntityCollectionResponse}
     */
    static ezFromResponse(response) {
        if (!EzObject.isValid(response)) {
            return new EzEntityCollectionResponse(
                404,
                'Response is undefined or null',
                []);
        }

        if (!EzObject.isObject(response)) {
            return new EzEntityCollectionResponse(
                0,
                response.toString(),
                []);
        }

        return new EzEntityCollectionResponse(
            EzNumber.numberOrDefault(
                response.errorCode,
                0),
            EzString.stringOrDefault(
                response.message,
                'Success'),
            EzArray.arrayOrEmpty(
                response.entities));
    }

    /**
        @public @static @method
        Creates a new instance of EzEntityCollectionResponse from the provided
        EzClocker api response object.
        @param {Object} aResponse
        @returns {EzEntityCollectionResponse}
        @deprecated
        Migrate to: EzEntityCollectionResponse.ezFromResposne(response);
     */
    static ezEntityCollectionResponse(aResponse) {
        return EzEntityCollectionResponse.ezFromResponse(aResponse);
    }

    /**
        @public @constructor
        Creates a new instance of EzEntityCollectionResponse
     */
    constructor(errorCode, message, entities) {
        super(errorCode, message);

        this.entities = entities;
    }

    /**
        @private @field
        Stores the array of entities returned by the api.
        @type {Array}
     */
    #entities = [];

    /**
        @public @property @getter
        Gets the array of entities returned by the api.
        @returns {Array}
     */
    get entities() {
        return this.#entities;
    }

    /**
        @public @property @setter
        Sets the array of entities returned by the api.
        If the provied entities array is undefined or null then an empty array is assigned.
        @param {Array} entities
     */
    set entities(entities) {
        this.#entities = EzArray.arrayOrEmpty(entities);
    }

    /**
        @override
        @public @readonly @property
        Returns this instance as a JSON Object (will no longer have the getter/setter methods).
        Useful for serailization to JSON.
        @returns {object}
     */
    get asJSONObject() {
        let jsonObject = super.asJSONObject

        jsonObject['entities'] = this.entities;

        return jsonObject;
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

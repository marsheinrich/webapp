import { EzApiResponse } from '/ezlibrary/entities/responses/EzApiResponse.js';

/**
    Javascript Entity equivlent to Java entity EzEntityResponse.java
    Import with:
        import { EzEntityResponse } from '/ezlibrary/entities/responses/EzEntityResponse.js';
 */
export class EzEntityResponse extends EzApiResponse {

    /**
        @public @static @method
        Creates a new EzEntityResponse from the provided ezClockerApiResponse object.
        @param {undefined|null|Object} ezClockerApiResponse
        @returns {EzEntityResponse}
     */
    static ezEntityResponse(ezClockerApiResponse) {
        if (!ezApi.ezIsValid(ezClockerApiResponse)) {
            return new EzEntityResponse(
                404,
                'Response is undefined or null',
                []);
        }

        if (!ezApi.ezIsObject(ezClockerApiResponse)) {
            return new EzEntityResponse(
                0,
                ezClockerApiResponse.toString(),
                []);
        }

        return new EzEntityResponse(
            ezApi.ezNumberOrDefault(ezClockerApiResponse.errorCode, 0),
            ezApi.ezStringOrDefault(ezClockerApiResponse.message, 'Success'),
            ezApi.ezIsValid(ezClockerApiResponse.entity)
                ? ezClockerApiResponse.entity
                : null);
    }

    /**
        @public @constructor
        Creates a new instance of EzEntityResponse
        @param {undefined|null|Number} errorCode
        @param {undefined|null|String} message
        @param {undefined|null|Object} entity
     */
    constructor(errorCode, message, entity) {
        super(errorCode, message);

        this.entity = entity;
    }

    /**
        @private @field
        Stores the entity for the response
        Default is null.
        @type {Object}
     */
    #entity = null;

    /**
        @public @property @getter
        Gets the entity for the response.
        @returns {Object}
     */
    get entity() {
        return this.#entity;
    }

    /**
        @public @property @setter
        Sets the entity for the response.
        @returns {Object}
     */
    set entity(entity) {
        this.#entity = ezApi.ezIsValid(entity)
            ? entity
            : null;
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
        jsonObject['entity'] = this.entity;
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

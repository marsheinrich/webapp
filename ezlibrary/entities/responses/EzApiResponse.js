import { EzJSONSerializable } from '/ezlibrary/entities/EzJSONSerializable.js';

/**
    @class
    @extends {EzJSONSerializable}
    Base class for API response entities.
    Javascript entity equivlant to the Java entity BaseResponse
    ---------------------------------------------------------------------
    Import with:
        import { EzApiResponse } from '/ezlibrary/entities/responses/EzApiResponse.js';
    ---------------------------------------------------------------------
 */
export class EzApiResponse extends EzJSONSerializable {
    /**
        @public @static @method
        Creates a new instance of EzApiResponse from the provided
        EzClocker api response object.
        @param {Object} ezClockerApiResponse
     */
    static ezApiResponse(ezClockerApiResponse) {
        if (!ezApi.ezIsValid(ezClockerApiResponse)) {
            return new EzApiResponse(
                404,
                'EzClockerApiResponse is undefined or null');
        }

        if (!ezApi.ezIsObject(ezClockerApiResponse)) {
            return new EzApiResponse(
                0,
                ezClockerApiResponse.toString());
        }

        return new EzEntityCollectionResponse(
            ezApi.ezNumberOrDefault(ezClockerApiResponse.errorCode, 0),
            ezApi.ezStringOrDefault(ezClockerApiResponse.message, 'Success'));
    }

    /**
        @public @constructor
        Creates a new instance of EzApiResponse
     */
    constructor(errorCode, message) {
        super();

        this.errorCode = errorCode;
        this.message = message;
    }

    /**
        @override
        @public @readonly @property
        Gets an array of JSON property names. This array is used
        to determine what properties should serialize to JSON when
        accessing properties asJSONObject or asJSON or method ezToJSON()
        @returns {array}
     */
    get ezJSONProps() {
        return [
            'errorCode',
            'message'
        ];
    }

    /**
        @private @field
        Stores the error code for the api response.
        @type {Number}
     */
    #errorCode = 0;

    /**
        @public @property @getter
        Gets the error code for the api response.
        @returns {Number}
     */
    get errorCode() {
        return this.#errorCode;
    }

    /**
        @public @property @setter
        Sets the error code for the api response.
        @param {Number} errorCode
     */
    set errorCode(errorCode) {
        this.#errorCode = ezApi.ezNumberOrDefault(errorCode, 0);
    }

    /**
        @private @field
        Stores the string message for the api response.
        Default value is 'Success'
        @type {String}
     */
    #message = 'Success';

    /**
        @public @property @getter
        Gets the string message for the api response.
        @returns {String}
     */
    get message() {
        return this.#message;
    }

    /**
        @public @property @setter
        Sets the string message for the api response.
        @param {String} message
     */
    set message(message) {
        this.#message = ezApi.ezStringOrEmpty(message);
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
            errorCode: this.errorCode,
            message: this.message
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

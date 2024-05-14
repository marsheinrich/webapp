import {
    EzNumber,
    EzString
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzJSONSerializable } from "./EzJSONSerializable";

/**
    @class
    @extends {EzJSONSerializable}
    @description
    Stores additional information about the EzErrorCode enumeration.
    -----------------------------------------------------------------
    Import with:
        import { EzErrorCodeInfo } from '/ezlibrary/entities/EzErrorCodeInfo.js';
    -----------------------------------------------------------------
 */
export class EzErrorCodeInfo extends EzJSONSerializable {
    /**
        @public @constructor
        Creates a new instance of EzErrorCodeInfo
        @param {undefined|null|number} statusCode
        Default: 500
        @param {undefined|null|number} errorCode
        Default: this.statusCode
        @param {undefined|null|string} category
        Default: 'EzClocker'
        @param {undefined|null|string} title
        Default: `${this.ezErrorCategory} Error #${this.ezErrorCode}`
        @param {undefined|null|string} textErrorMessage
        Default: `${this.ezErrorCategory} Error #${this.ezErrorCode}`
        @param {undefined|null|string} htmlErrorMessage
        Default: this.textErrormessage
     */
    constructor(
        statusCode,
        errorCode,
        category,
        displayName,
        textErrorMessage,
        htmlErrorMessage) {
        super();

        this.ezStatusCode = statusCode;

        this.ezErrorCode = errorCode;

        this.ezCategory = category;

        this.ezDisplayName = displayName;

        this.ezTextErrorMessage = textErrorMessage;

        this.ezHtmlErrorMessage = htmlErrorMessage;
    }

    /**
     * @private @field
     * Stores the error's HTTP status code
     * @type {number}
     */
    #ezStatusCode;
    /**
     * @public @property @getter
     * Gets the error's HTTP status code
     * @returns {number}
     */
    get ezStatusCode() {
        return this.#ezStatusCode;
    }
    /**
     * @public @property @setter
     * Sets the error's HTTP status code
     * @returns {number}
     */
    set ezStatusCode(ezStatusCode) {
        this.#ezStatusCode = EzNumber.numberOrDefault(
            ezStatusCode,
            500);
    }

    /**
     * @private @field
     * Stores the error's error code
     * @type {number}
     */
    #ezErrorCode;
    /**
     * @public @readonly @property
     * Gets the error's error code
     * @returns {number}
     */
    get ezErrorCode() {
        return this.#ezErrorCode;
    }
    /**
     * @public @property @setter
     * Sets the error's error code
     * @returns {number}
     */
    set ezErrorCode(ezErrorCode) {
        this.#ezErrorCode = EzNumber.numberOrDefault(
            ezErrorCode,
            this.statusCode);
    }

    /**
     * @private @field
     * Stores the error's category name
     * @type {string}
     */
    #ezCategory;
    /**
     * @public @readonly @property
     * Gets the error's category name
     * @returns {string}
     */
    get ezCategory() {
        return this.#ezCategory;
    }
    /**
     * @public @property @setter
     * Sets the error's category name
     * @returns {string}
     */
    set ezCategory(ezCategory) {
        this.#ezCategory = EzString.stringOrDefault(
            ezCategory,
            'EzClocker');
    }

    /**
     * @private @field
     * Stores the error's display name
     * @type {string}
     */
    #ezDisplayName;
    /**
     * @public @readonly @property
     * Gets the error's display name
     * @returns {string}
     */
    get ezDisplayName() {
        return this.#ezDisplayName;
    }
    /**
     * @public @property @setter
     * Sets the error's display name
     * @returns {string}
     */
    set ezDisplayName(ezDisplayName) {
        this.#ezDisplayName = EzString.stringOrDefault(
            ezDisplayName,
            `${this.ezErrorCategory} Error #${this.ezErrorCode}`);
    }

    /**
     * @private @field
     * Stores the error's plain text message
     * @type {string}
     */
    #ezTextErrorMessage;
    /**
     * @public @readonly @property
     * Gets the error's plain text message
     * @returns {string}
     */
    get ezTextErrorMessage() {
        return this.#ezTextErrorMessage;
    }
    /**
     * @public @property @setter
     * Sets the error's plain text message
     * @returns {string}
     */
    set ezTextErrorMessage(ezTextErrorMessage) {
        this.#ezTextErrorMessage = EzString.stringOrDefault(
            ezTextErrorMessage,
            this.ezErrorTitle);
    }

    /**
     * @private @field
     * Stores the error's HTML formatted message
     * @type {string}
     */
    #ezHtmlErrorMessage;
    /**
     * @public @readonly @property
     * Gets the error's HTML formatted message
     * @returns {string}
     */
    get ezHtmlErrorMessage() {
        return this.#ezHtmlErrorMessage;
    }
    /**
     * @public @property @setter
     * Sets the error's HTML formatted message
     * @returns {string}
     */
    set ezHtmlErrorMessage(ezHtmlErrorMessage) {
        this.#ezHtmlErrorMessage = EzString.stringOrDefault(
            ezHtmlErrorMessage,
            this.textErrorMessage);
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
            ezStatusCode: this.ezStatusCode,
            ezErrorCode: this.ezErrorCode,
            ezCategory: this.ezCategory,
            ezDisplayName: this.ezDisplayName,
            ezHtmlErrorMessage: this.ezHtmlErrorMessage,
            ezTextErrorMessage: this.ezTextErrorMessage
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
        this.ezStatusCode = jsonObject.ezStatusCode;

        this.ezErrorCode = jsonObject.ezErrorCode;

        this.ezCategory = jsonObject.ezCategory;

        this.ezDisplayName = jsonObject.ezDisplayName;

        this.ezHtmlErrorMessage = jsonObject.ezHtmlErrorMessage;

        this.ezTextErrorMessage = jsonObject.ezTextErrorMessage;

        return this;
    }

    /**
     * @override
     * From class EzJSONSerializable
     * @public @readonly @property
     * Returns this instance as JSON string (no formatting)
     * @returns {String}
     */
    get asJSON() {
        return super.asJSON;
    }

    /**
     * @override
     * From class EzJSONSerializable
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
     * From class EzJSONSerializable
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

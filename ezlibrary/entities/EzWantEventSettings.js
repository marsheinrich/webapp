import { EzObject } from '/ezlibrary/helpers/EzObject.js';
import { EzBoolean } from '/ezlibrary/helpers/EzBoolean.js';
import { EzString } from '/ezlibrary/helpers/EzString.js';

import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzJSONSerializable } from '/ezlibrary/entities/EzJSONSerializable.js';

// TODO: Move this class to /ezlibrary/events/EzEventEngine.js and update import references.

/**
 * @class
 * @extends {EzJSONSerializable}
 * @description
 * Represents a want event registration
 * To convert this object to a JSON string, use EzEmployeeInviteRequest.toJson() instead of
 * JSON.serialize or ezApi.ezToJson()
 * ------------------------------------------------------------------
 * Import with:
 *      import { EzWantEventSettings } from '/ezlibrary/entities/EzWantEventSettings.js';
 * ------------------------------------------------------------------
 */
export class EzWantEventSettings extends EzJSONSerializable {
    /**
     * @public @constructor
     * @param {string} aEventName
     * @param {string} aWantEventHandlerName
     * @param {function} aWantEventHandlerFunction
     * @param {object|null} aWantEventOptions
     * Optional, default is: {
     *      immediateTriggerIfAlreadyTriggered: false,
     *      unwantAfterFirstTrigger: false
     * }
     * @returns {EzWantEventSettings}
     */
    constructor(aEventName, aWantEventHandlerName, aWantEventHandlerFunction, aWantEventOptions) {
        super();

        if (!EzString.stringHasLength(aEventName)) {
            throw new EzBadParamException(
                'aEventName',
                this,
                this.constructor);
        }
        if (!EzString.stringHasLength(aWantEventHandlerName)) {
            throw new EzBadParamException(
                'aWantEventHandlerName',
                this,
                this.constructor);
        }
        if (!EzString.stringHasLength(aWantEventHandlerName)) {
            throw new EzBadParamException(
                'aWantEventHandlerName',
                this,
                this.constructor);
        }

        if (!EzObject.isValid(aWantEventOptions)) {
            aWantEventOptions = {
                immediateTriggerIfAlreadyTriggered: false,
                unwantAfterFirstTrigger: false
            };
        }

        this.eventName = aEventName;

        this.handlerName = aWantEventHandlerName;

        this.handlerFunction = aWantEventHandlerFunction;

        this.options = aWantEventOptions;
    }

    /**
     * @private @field
     * @type {string}
     */
    #eventName = '';

    /**
     * @public @property @getter
     * @returns {string}
     */
    get eventName() {
        return this.#eventName;
    }

    /**
     * @public @property @setter
     * @param {string} aEventName
     */
    set eventName(aEventName) {
        if (!EzString.stringHasLength(aEventName)) {
            throw new EzBadParamException(
                'aEventName',
                this,
                this.eventName);
        }

        this.#eventName = aEventName;
    }

    /**
     * @private @field
     * @type {string}
     */
    #wantEventHandlerName = '';

    /**
     * @public @property @getter
     * @returns {string}
     */
    get handlerName() {
        return this.#wantEventHandlerName;
    }

    /**
     * @public @property @setter
     * @param {string} aWantEventHandlerName
     */
    set handlerName(aWantEventHandlerName) {
        if (!EzString.stringHasLength(aWantEventHandlerName)) {
            throw new EzBadParamException(
                'aWantEventHandlerName',
                this,
                this.handlerName);
        }

        this.#wantEventHandlerName = aWantEventHandlerName;
    }

    /**
     * @private @field
     * @type {function}
     */
    #wantEventHandlerFunction = null;

    /**
     * @public @property @getter
     * @returns {function}
     */
    get handlerFunction() {
        return this.#wantEventHandlerFunction;
    }

    /**
     * @public @property @setter
     * @param {function} aWantEventHandlerFunction
     */
    set handlerFunction(aWantEventHandlerFunction) {
        if (!ezApi.ezIsFunction(aWantEventHandlerFunction)) {
            throw new EzBadParamException(
                'aWantEventHandlerFunction',
                this,
                this.handlerFunction);
        }

        this.#wantEventHandlerFunction = aWantEventHandlerFunction;
    }

    /**
     * @private @field
     * @type {object}
     */
    #wantEventOptions = {
        immediateTriggerIfAlreadyTriggered: false,
        unwantAfterFirstTrigger: false
    };

    /**
     * @public @property @getter
     * @returns {object}
     */
    get options() {
        return this.#wantEventOptions;
    }

    /**
     * @public @property @setter
     * @param {object} aWantEventOptions
     */
    set options(aWantEventOptions) {
        if (!EzObject.isValid(aWantEventOptions)) {
            throw new EzBadParamException(
                'aWantEventOptions',
                this,                     
                this.options);
        }

        this.#wantEventOptions = aWantEventOptions;

        this.#wantEventOptions.immediateTriggerIfAlreadyTriggered =
            EzBoolean.isTrue(aWantEventOptions.immediateTriggerIfAlreadyTriggered);

        this.#wantEventOptions.unwantAfterFirstTrigger =
            EzBoolean.isTrue(aWantEventOptions.unwantAfterFirstTrigger);
    }

    /**
     * @public @method
     * Returns this instance as a JSON string
     * @returns {string}
     * @deprecated
     * Migrate to the asJSON property
     */
    get toJson() {
        return this.asJson;
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
            'eventName': this.eventName,
            'handlerName': this.handlerName,
            'options': this.options
        };
    }

    /**
     * @override
     * @public @readonly @property
     * Returns this instance as JSON string (no formatting)
     * @returns {string}
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
     * @returns {string}
     */
    ezToJSON(indentValue, htmlDisplay) {
        return super.ezToJSON(indentValue, htmlDisplay);
    }

    /**
     * @override
     * @public @method
     * Copies properties from the provided jsonObject to this instance (even if this instance does not define the property)
     * @param {object} jsonObject
     * @returns {object}
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
     * @param {string} jsonString
     * @returns {object}
     * Returns this instance with the key & values from the provided json string.
     */
    ezLoadFromJson(jsonString) {
        return super.ezLoadFromJson(jsonString);
    }
}

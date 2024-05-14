import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import {
    EzObject,
    EzString,
} from '/ezlibrary/helpers/EzHelpers.js';


import { EzJSONSerializable } from '/ezlibrary/entities/EzJSONSerializable.js';

/**
    Data object that is sometimes available via the event object
    passed to handlers by events triggered by EzEventEngine.
    Import with:
        import { EzEventData } from '/ezlibrary/entities/EzEventData.js';
 */
// TODO: Move this class to /ezlibrary/events/EzEventData.js and update import references.
export class EzEventData extends EzJSONSerializable {
    /**
        @public @constructor
        @param {Object} triggeredByRef
        @param {undefined|null|String} message
        @param {undefined|null|*} data
     */
    constructor(triggeredByRef, message, data) {
        super();
        if (!EzObject.isValid(triggeredByRef)) {
            throw new EzBadParamException(
                'triggeredByRef',
                EzEventData,
                EzEventData.constructor);
        }

        this.triggeredByRef = triggeredByRef;
        this.message = message;
        this.data = data;
    }

    /**
        @private @field
        Stores the reference to the object that triggered the event
        @type {undefined|null|Object}
     */
    #triggeredByRef = null;

    /**
        @public @property @getter
        Gets the reference to the object that triggered the event
        @returns {Object}
     */
    get triggeredByRef() {
        if (null == triggerOwner) {
            throw new EzBadParamException(
                'triggeredByRef',
                this,
                this.triggeredByRef);
        }

        return this.#triggeredByRef;
    }

    /**
        @public @property @setter
        Sets the reference to the object that triggered the event
        @param {undefined|null|Object}
     */
    set triggeredByRef(triggeredByRef) {
        this.#triggeredByRef = EzObject.assignOrNull(triggeredByRef);
    }

    /**
        @public @readonly @property
        Gets the reference to the object that triggered the event
        @returns {Object}
        @deprecated
        Migrate to using property EzEventData.triggeredByRef instead.
     */
    get triggerOwner() {
        return this.#triggeredByRef;
    }

    /**
        @private @field
        Stores the string message for the event.
        @type {undefined|null|String}
     */
    #message = '';

    /**
        @public @property @getter
        Gets the string message for the event.
        @returns {undefined|null|String}
     */
    get message() {
        return this.#message;
    }

    /**
        @public @property @getter
        Sets the string message for the event.
        @param {undefined|null|String}
     */
    set message(message) {
        this.#message = EzString.stringOrEmpty(message);
    }

    /**
        @private @field
        Stores any data associated with the event
     */
    #data = null;

    /**
        @public @property @getter
        Gets any data associated with the event
        @returns {undefined|null|Object}
     */
    get data() {
        return this.#data;
    }

    /**
        @public @property @getter
        Sets any data associated with the event
        @param {undefined|null|Object}
     */
    set data(data) {
        this.#data = EzObject.assignOrNull(data);
    }

    /**
        @override
        @public @readonly @property
        Returns this instance as a JSON Object (will no longer have the getter/setter methods).
        Useful for serailization to JSON.
        @returns {object}
     */
    get asJSONObject() {
        let triggeredByName = EzString.stringOrNull(this.triggeredByRef);
        if (null == triggeredByName && EzObject.isValid(this.triggeredByRef)) {
            triggeredByName = this.triggeredByRef.constructor.name;
        }

        return {
            triggeredByRef: triggeredByName,
            message: this.message,
            data: ezApi.ezToJson(this.data)
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

import { EzException } from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzJson
} from '/ezlibrary/helpers/EzHelpers.js';

/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ENGINEERING NOTES
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Classes that extend EzJSONSerializable MUST override and implement the JSON
    serialization methods and properties by calling the super property or
    method to make sure the property this context is pass along.

    In addition, you should override and implement the ezJSONProps getter
    and return an array of property names that should serialize to JSON.
    Not implementing the ezJSONProps could result in an exception
    (if the auto-serialize fails) and will then require you to
    override and implement the full asJSONObject getter for the class.
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Recommended Implementation Template
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//      /**
//       * @override
//       * From class EzJSONSerializable
//       * @public @readonly @property
//       * Returns this instance as a JSON Object (will no longer have the getter/setter methods).
//       * Useful for serailization to JSON.
//       * @returns {object}
//       */
//      get asJSONObject() {
//          return super.asJSONObject;
//      }
//
//      /**
//       * @override
//       * From class EzJSONSerializable
//       * @public @method
//       * Copies properties from the provided jsonObject to this instance (even if this instance does not define the property)
//       * @param {Object} jsonObject
//       * @returns {Object}
//       * Returns this instance with the key & values from the provided jsonObject.
//       */
//      ezFromJSONObject(jsonObject) {
//          return super.ezFromJSONObject(jsonObject);
//      }
//
//      /**
//       * @override
//       * From class EzJSONSerializable
//       * @public @readonly @property
//       * Returns this instance as JSON string (no formatting)
//       * @returns {String}
//       */
//      get asJSON() {
//          return super.asJSON;
//      }
//
//      /**
//       * @override
//       * From class EzJSONSerializable
//       * @public @method
//       * Converts this instance into a JSON string with optional formatting.
//       * @param {undefined|null|Number} indentValue
//       * @param {undefined|null|Boolean} htmlDisplay
//       * @returns {String}
//       */
//      ezToJSON(indentValue, htmlDisplay) {
//          return super.ezToJSON(indentValue, htmlDisplay);
//      }
//
//      /**
//       * @override
//       * From class EzJSONSerializable
//       * @public @method
//       * Converts the provided jsonString to a JSON object and then
//       * passes that object to ezFromJSONObject() to copies properties to this instance
//       * (even if this instance does not define the property)
//       * @param {String} jsonString
//       * @returns {Object}
//       * Returns this instance with the key & values from the provided json string.
//       */
//      ezLoadFromJson(jsonString) {
//          return super.ezLoadFromJson(jsonString);
//      }
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * @class
 * @description
 * Provides JSON serialization methods and properties. See the recommended
 * implementation template above.
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzJSONSerializable } from '/ezlibrary/entities/EzJSONSerializable.js';
 * ---------------------------------------------------------------------------
 */
export class EzJSONSerializable {
    /**
     * @static
     * @public @method
     * Assings the values of the properties from loadFromJsonObject (2nd param)
     * that match properties in loadToJsonObject.
     * 1) If the loadFromJsonObject and loadToJsonObject is undefined or null then
     *    an empty object is returned.
     * 2) If the loadFromJsonObject is undefined or null, then the loadToJsonObject is
     *    returned.
     * 3) If the loadToJsonObject is undefined or null then a copy of loadFromJsonObject
     *    is created and returned.
     * @param {undefined|null|object} loadFromJsonObject
     * @param {undefined|null|object} loadToJsonObject
     * @returns {object}
     */
    static ezLoadFromJSONObject(loadFromJsonObject, loadToJsonObject) {
        if (!EzObject.isValid(loadToJsonObject)) {
            loadToJsonObject = EzObject.EMPTY;

            if (!EzObject.isValid(loadFromJsonObject)) {
                return loadToJsonObject;
            }

            return Object.assign({}, loadFromJsonObject);
        }

        if (!EzObject.isValid(loadFromJsonObject)) {
            return destJsonObject;
        }

        for (let propertyName in loadFromJsonObject) {
            if (EzObject.hasProperty(destJsonObject, propertyName)) {
                loadToJsonObject[propertyName] = loadFromJsonObject[propertyName];
            }
        }

        return loadToJsonObject;
    }

    /**
     * @public @readonly @property
     * Returns this instance as JSON string (no formatting)
     * @returns {String}
     */
    get asJSON() {
        return this.ezToJSON(3, false);
    }

    /**
     * @public @readonly @property
     * Returns this instance as a JSON Object (will no longer have the getter/setter methods).
     * Useful for serailization to JSON.
     * @returns {object}
     */
    get asJSONObject() {
        try {
            return this.#ezAutoAsJSONObject();
        } catch (err) {
            // If automatic fails, then the class needs to impliment its own asJSONObject
            throw new EzException(
                `Unable to automaticlly generate the simple JSON object of class ${this.constructor.name}
                due to error ${err.message}. To resolve, the class will need to override the
                asJSONObject property and provide a custom implementation that returns the class
                as a simple JSON object.`);
        }
    }

    /**
     * @public @method
     * Converts this instance into a JSON string with optional formatting.
     * @param {undefined|null|Number} indentValue
     * @param {undefined|null|Boolean} htmlDisplay
     * @returns {String}
     */
    ezToJSON(indentValue, htmlDisplay) {
        try {
            return EzJson.toJson(
                this.asJSONObject,
                EzNumber.numberOrNull(indentValue),
                EzBoolean.isTrue(htmlDisplay));
        } catch (err) {
            throw new EzException(
                EzString.em`
                    Failed to transform instance of ${this.constructor.name} to a JSON string with optional formatting.
                    Error: ${err.message}`,
                err);
        }
    }

    /**
     * @public @method
     * Copies properties from the provided jsonObject to this instance (even if this instance does not define the property)
     * @param {Object} jsonObject
     * @returns {Object}
     * Returns this instance with the key & values from the provided jsonObject.
     */
    ezFromJSONObject(jsonObject) {
        if (!EzObject.isValid(jsonObject)) {
            throw new EzBadParamException(
                'jsonObject',
                this,
                this.ezFromJSONObject);
        }

        try {
            for (const propertyName in jsonObject) {
                // Assigning the properties from the jsonObject to this instance
                this[propertyName] = jsonObject[propertyName];
            }
        } catch (err) {
            throw new EzException(
                EzString.em`
                    Failed to transform instance of ${this.constructor.name} to a JSON Object.
                    Error: ${err.message}`,
                err);
        }

        return this;
    }

    /**
     * @public @method
     * Converts the provided jsonString to a JSON object and then
     * passes that object to ezFromJSONObject() to copies properties to this instance
     * (even if this instance does not define the property)
     * @param {String} jsonString
     * @returns {Object}
     * Returns this instance with the key & values from the provided json string.
     */
    ezLoadFromJson(jsonString) {
        if (!EzString.stringHasLength(jsonString)) {
            throw new EzBadParamException(
                'jsonString',
                this,
                this.ezLoadFromJson);
        }

        return this.ezLoadFromJSONObject(EzJson.fromJson(jsonString));
    }

    /**
     * @public @method
     * Allows JSON.stringify the ability to transform the class to JSON after the simple JSON Object is created.
     * NOTE: JSON.stringify will call the toJSON() method if it is available for the object.
     * @returns {string}
     */
    toJSON() {
        return EzJson.toJson(this);
    }

    /**
     * @private @readonly @property
     * Experimental property that attempts to automaticlly generate the JSON object while
     * including getters and setters.
     * @returns {object}
     */
    #ezAutoAsJSONObject() {
        let jsonObject = Object.assign({}, this);

        try {
            // Experimental logic to transform get/set properties to basic public fields on the jsonObject.

            // Info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf
            let thisPrototype = Object.getPrototypeOf(this);

            // Info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors
            let thisPropertyDescriptors = Object.getOwnPropertyDescriptors(thisPrototype);

            Object.entries(thisPropertyDescriptors)
                .filter(
                    // Filter only the getter property descriptors
                    ([key, descriptor]) => 'function' === typeof descriptor.get)
                .map(
                    ([key, descriptor]) => {
                        // Key = Getter/property name
                        if (EzObject.isValid(descriptor) && EzObject.isValid(key) && 0 != key.length && '_' !== key[0]) {
                            // Ignoring null/undefined descriptors, null/undefined and empty key values, and any key that
                            // starts with the '_'.
                            try {
                                jsonObject[key] = this[key];
                            } catch (err) {
                                ezApi.ezclocker.ezLogger.error(
                                    EzString.em`
                                        Unexpected error while auto-transforming object ${this.constructor.name} to a simple JSON object:
                                        Tranformation of getter ${key} failed with error ${err.message}. Will ignore the property and
                                        continue with auto-transforming.`);

                                if (EzObject.isValid(window) && EzObject.isValid(console)) {
                                    window.console.error(err);
                                }
                            }
                        }
                    });
        } catch (err) {
            ezApi.ezclocker.ezLogger.error(
                EzString.em`
                    Failed to fully auto-transform object ${this.constructor.name} to a simple JSON object due to
                    the following error: ${err.message}. Returning simi-transformed object that will most likely
                    have missing properties.`);

            if (EzObject.isValid(window) && EzObject.isValid(console)) {
                window.console.error(err);
            }
        }

        return jsonObject;
    }
}

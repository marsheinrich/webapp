/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ENGINEERING NOTES
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        1) Do not import anything from /ezlibrary/helpers/EzHelpers.js into this module
        2) Do not import the following into this module:
            import { EzApi } from '/public/common/javascript/ezapi.js';
            import { EzUI } from '/public/common/javascript/ezui.js';
            import { ezUI } from '/public/common/javascript/ezui.js';
            import { EzJson } from '/ezlibrary/helpers/EzJson.js';
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

import { EzStaticClass } from '/ezlibrary/EzStaticClass.js';

import { EzObject } from '/ezlibrary/helpers/EzObject.js';
import { EzNumber } from '/ezlibrary/helpers/EzNumber.js';
import { EzBoolean } from '/ezlibrary/helpers/EzBoolean.js';
import { EzString } from '/ezlibrary/helpers/EzString.js';
import { EzFunction } from '/ezlibrary/helpers/EzFunction.js';

/**
    @class
    @extends {EzStaticClass}
    @description
    Static class that provides utility methods and properties for Objects
    >>> WOOT: Does not require EzApi <<<
    ---------------------------------------------------------------------------
    Import with:
        import { EzJson } from '/ezlibrary/helpers/EzJson.js';
    ---------------------------------------------------------------------------
 */
export class EzJson extends EzStaticClass {

    /**
        @static
        @public @method
        Transforms the provided jsonObject to a JSON string in the following ways:
            1) If the provided jsonObject implements a function name "ezToJSON", then
               that function is called to return the JSON string (JSON.stringify is not used).
            2) If the provided jsonObject implements the (legacy) function name "toJson", then
               that function is called to return the JSON string (JSON.stringify is not used).
            3) Otherwise, JSON.stringify is used to transform the object to a JSON string.
        If an error occurs during transformation with JSON.stringify then the error is loggged
        and the provided jsonObject is returned.
        @param {undefined|null|object} simpleJSObjectOrEzEntity
        @param {undefined|null|number} indentValue
        If the indentValue is a valid number, then the JSON string is formatted
        with {indentValue} number of spaces for each tab.
        @param {undefined|null|boolean} forHtmlDisplay
        If the forHtmlDisplay is true then all the initial \n characters present after
        transforming get converted to <br/> HTML tags and all spaces that represent
        a tab get repalced with &nbsp;
        @returns {object}
     */
    static toJson(simpleJSObjectOrEzEntity, indentValue, forHtmlDisplay) {
        if (EzString.isString(simpleJSObjectOrEzEntity)) {
            return simpleJSObjectOrEzEntity;
        }

        if (!EzObject.isValid(simpleJSObjectOrEzEntity)) {
            return '{}';
        }

        if (EzFunction.isFunction(simpleJSObjectOrEzEntity.ezToJSON)) {
            // Use the objects own ezToJson() serilization method
            return simpleJSObjectOrEzEntity.ezToJSON(indentValue, forHtmlDisplay);
        }

        if (EzFunction.isFunction(simpleJSObjectOrEzEntity.toJson)) {
            // Use the objects own legacy toJson() serialization method
            return simpleJSObjectOrEzEntity.toJson(indentValue, forHtmlDisplay);
        }

        if (EzObject.isValid(simpleJSObjectOrEzEntity.jqXHR)) {
            // Prevent full serialization of jqXHR
            simpleJSObjectOrEzEntity.jqXHR = {
                readyState: simpleJSObjectOrEzEntity.jqXHR.readyState,
                responseText: simpleJSObjectOrEzEntity.jqXHR.responseText,
                status: simpleJSObjectOrEzEntity.jqXHR.status,
                statusText: simpleJSObjectOrEzEntity.jqXHR.statusText
            }
        }

        // Use the Javascript JSON.stringify on the object
        try {
            let tabs = EzString.EMPTY;

            for (let tab = 0; tab < indentValue; tab++) {
                tabs += '&nbsp;';
            }

            if (EzBoolean.isTrue(forHtmlDisplay)) {
                return JSON.stringify(
                    simpleJSObjectOrEzEntity,
                    null,
                    indentValue)
                    .replaceAll("\n", `<br/>${tabs}`);
            }

            if (EzNumber.isNumber(indentValue)) {
                return JSON.stringify(
                    simpleJSObjectOrEzEntity,
                    null,
                    indentValue);
            }

            let jsonString = JSON.stringify(simpleJSObjectOrEzEntity);

            return '{}' === jsonString
                // Probably not a JSON object so return the object itself instead
                ? simpleJSObjectOrEzEntity
                : jsonString;
        } catch (err) {
            if (EzObject.isValid(globalThis.console)) {
                globalThis.console.error(
                    ezApi.ezEM`
                        Failed to convert the simple Javascript object or EzEntity object to a json string
                        due to the following error: ${err.message}.`);
            }

            return simpleJSObjectOrEzEntity;
        }
    }

    /**
        @static
        @public @method
        Transforms the provided simpleJSONObjectArray, which is a Javascript array of
        Javascript objects without getters/setters, to a JSON array string.
        If the provided simpleJSObjectArray is a string, that string value is returned.
        If the provided simpleJSObjectArray is undefined, null, or empty then an empty JSON array is returned.
        If an error occurs during transformation with JSON.stringify then the error is loggged
        and the provided simpleJSObjectArray is returned.
        @param {undefined|null|object} simpleJSObjectArray
        @param {undefined|null|number} indentValue
        If the indentValue is a valid number, then the JSON string is formatted
        with tabs equal to indentValue nu mber of spaces.
        @param {undefined|null|boolean} forHtmlDisplay
        If the forHtmlDisplay is true then all the initial \n characters present after
        transforming get converted to <br/> HTML tags and all spaces that represent
        a tab get repalced with &nbsp;
        @returns {string}
     */
    static toJsonArray(simpleJSObjectArray, indentValue, forHtmlDisplay) {
        if (!EzObject.isValid(simpleJSObjectArray)) {
            return '[]';
        }

        if (EzString.isString(simpleJSObjectArray)) {
            return simpleJSObjectArray;
        }

        // Use the Javascript JSON.stringify on the object
        try {
            if (EzBoolean.isTrue(forHtmlDisplay)) {
                return JSON
                    .stringify(simpleJSObjectArray, null, '&nbsp;')
                    .replace('\n', '<br/>');
            }

            if (EzNumber.isNumber(indentValue)) {
                return JSON.stringify(simpleJSObjectArray, null, indentValue);
            }

            let jsonArrayString = JSON.stringify(simpleJSObjectArray);

            return '[]' === jsonArrayString
                // Probably not a JSON object so return the object itself instead
                ? simpleJSObjectArray
                : jsonArrayString;
        } catch (err) {
            if (EzObject.isValid(globalThis.console)) {
                globalThis.console.error(
                    ezApi.ezEM`
                        Failed to convert the simple Javascript object array to a json array string
                        due to the following error: ${err.message}.`);
            }

            return simpleJSObjectArray;
        }
    }

    /**
        @static
        @public @method
        Transforms the provided JSON string to a simple Javascript JSON Object.
        If the string is undefined, null, or empty then an empty string is returned.
        If the transformation fails the error is logged and the provided jsonString is returned.
        @param {string} jsonString
        @returns {string|object}
     */
    static fromJson(jsonString, ignoreParseError = false) {
        if (!EzString.stringHasLength(jsonString)) {
            return jsonString;
        }

        try {
            return JSON.parse(jsonString);
        } catch (ex) {
            if (true === ignoreParseError) {
                if (EzObject.isValid(globalThis.console)) {
                    globalThis.console.error(
                        `Failed to convert JSON to a Javascript json object. [JSON: ${jsonString}`);
                }
            }
            return jsonString;
        }
    }
}

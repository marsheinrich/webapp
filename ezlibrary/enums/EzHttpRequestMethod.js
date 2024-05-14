import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';



/**
 * @class
 * @extends {EzEnumeration2}
 * @description
 * Enumeration for RequestMethods
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import into non-enumeration classes with:
 *     import {
 *         // ... other enumeration classes ...
 *         EzHttpRequestMethod
 *     } from '/ezlibrary/enums/EzEnumerations.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import into other enumeration classes with:
 *     import { EzHttpRequestMethod } from '/ezlibrary/enums/EzHttpRequestMethod.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Access only static properties and methods
 *      EzHttpRequestMethod.{PROPERTY_NAME}
 *      EzHttpRequestMethod.ezNames()
 *      EzHttpRequestMethod.ezValues()
 *      EzHttpRequestMethod.ezData(EzHttpRequestMethod.{PROPERTY_NAME})
 *      EzHttpRequestMethod.ezNameOf({PROPERTY_VALUE})
 *      EzHttpRequestMethod.ezValueOf({PROPERTY_VALUE})
 *      EzHttpRequestMethod.ezAsEnum({PROPERTY_VALUE})
 *      EzHttpRequestMethod.ezEnumData(EzHttpRequestMethod.{PROPERTY_NAME})
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzHttpRequestMethod extends EzEnumeration2 {
    /**
     * @private @field
     * Stores the singleton instance of this enumeration class.
     * @type {EzHttpRequestMethod}
     */
    static #ezEnumerationSingleton = null;

    /**
     * @static
     * Static Initialization
     */
    static {
        if (null == EzHttpRequestMethod.#ezEnumerationSingleton) {
            EzHttpRequestMethod.#ezEnumerationSingleton = new EzHttpRequestMethod(
                // Enum property names
                [
                    // The GET method requests a representation of the specified resource. Requests using GET should only retrieve data.
                    'GET',
                    'get',

                    // The POST method submits an entity to the specified resource, often causing a change in state or side effects on the server.
                    'POST',
                    'post',

                    // The PUT method replaces all current representations of the target resource with the request payload.
                    'PUT',
                    'put',

                    // The PATCH method applies partial modifications to a resource.
                    'PATCH',
                    'patch',

                    // The DELETE method deletes the specified resource.
                    'DELETE',
                    'delete',

                    // The HEAD method asks for a response identical to a GET request, but without the response body.
                    'HEAD',
                    'head',

                    // The CONNECT method establishes a tunnel to the server identified by the target resource.
                    'CONNECT',
                    'connect',

                    // The OPTIONS method describes the communication options for the target resource.
                    'OPTIONS',
                    'options',

                    // The TRACE method performs a message loop-back test along the path to the target resource.
                    'TRACE',
                    'trace'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                null,
                // Optional array of additional data for eac enumeration property.
                // Enter null if not needed.
                null);
        }
    }
}
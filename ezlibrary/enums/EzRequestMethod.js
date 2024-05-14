import {
    EzEnumeration2
} from '/ezlibrary/enums/EzEnumeration2.js';

/**
    @class
    @extends {EzEnumeration2}
    @description
    Enumeration for http request methods
    ---------------------------------------------------------------------
    Import with:
        import { EzRequestMethod } from '/ezlibrary/enums/EzRequestMethod.js';
    ---------------------------------------------------------------------
 */
export class EzRequestMethod extends EzEnumeration2 {
    /**
        @private @field
        Stores the singleton instance of this enumeration class.
        @type {EzRequestMethod}
     */
    static #ezEnumerationSingleton = null;

    /**
        @static
        Static Initialization
     */
    static {
        if (null == EzRequestMethod.#ezEnumerationSingleton) {
            EzRequestMethod.#ezEnumerationSingleton = new EzRequestMethod(
                // Enum property names
                [
                    'POST',
                    'GET',
                    'PUT',
                    'DELETE',
                    'PATCH',
                    'post',
                    'get',
                    'put',
                    'delete',
                    'patch'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                null,
                // Optional array of additional data for eac enumeration property.
                // Enter null if not needed.
                null);
        }
    }

    /**
        @public @constructor
        >> DO NOT CREATE NEW INSTANCES <<
        The static initializer will create a singleton instance that injects the static properties and methods
        that you then use to access enumeration values.
     */
    constructor(name, value, optionalData) {
        super(name, value, optionalData);
    }
}

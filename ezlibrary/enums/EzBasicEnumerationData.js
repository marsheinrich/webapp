/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ENGINEERING NOTES
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    !! IMPORTANT !!
    Do NOT import this class into the following to avoid circular dependency problems:
        import { EzEnumerations } from '/ezlibrary/enums/EzEnumerations.js';
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Only import helper objects individually. Do not import from EzHelpers
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import { EzObject } from '/ezlibrary/helpers/EzObject.js';
import { EzArray } from '/ezlibrary/helpers/EzArray.js';

/**
 * @class
 * @description
 * Implementation of a a basic enumeration property data instance.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *      import { EzBasicEnumerationData } from '/ezlibrary/enums/EzBasicEnumerationData.js'
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzBasicEnumerationData {
    /**
     * @public @constructor
     * Creates a new instance of EzBasicEnumerationData
     * @param {object} enumClassRef
     * Required: Normally the enumeration class is extended from EzEnumeration2 from /ezlibrary/enums/EzEnumeration2.js. However,
     * there might be some older enumeration classes that do not extend from EzEnumeration2.
     */
    constructor(enumClassRef, enumPropertyName) {
        if (!EzObject.isValid(enumClassRef)) {
            throw new EzBadParamException(
                'enumClassRef',
                this,
                this.constructor);
        }

        let enumIndex = EzArray.hasLength(enumClassRef?.[Enumeration2.NAMES_PROPERTY_NAME])
            ? enumClassRef[Enumeration2.NAMES_PROPERTY_NAME].indexOf(enumPropertyName)
            : -1;

        if (-1 == enumIndex) {
            let em = `Enumeration class ${enumClassRef.constructor.name} does not contain an enumeration property named ${enumPropertyName}.`;

            ezApi.ezclocker.ezLogger.error(em);

            throw new EzBadParamException(
                'enumPropertyName',
                this,
                this.constructor,
                em);
        }

        this.#enumClassRef = enumClassRef;

        this.#enumPropertyName = this.#enumClassRef[Enumeration2.NAMES_PROPERTY_NAME][enumIndex];

        this.#enumPropertyValue = EzArray.hasLength(this.#enumClassRef?.[Enumeration2.VALUES_PROPERTY_NAME]) &&
            enumIndex < this.#enumClassRef[Enumeration2.VALUES_PROPERTY_NAME].length
            ? this.#enumClassRef[Enumeration2.VALUES_PROPERTY_NAME][enumIndex]
            : this.#enumClassRef[Enumeration2.NAMES_PROPERTY_NAME][enumIndex];
    }

    /**
     * @private @field
     * Stores the reference to the enumeration class the enumeration data is assocaited with.
     * Default: null
     * @type {object}
     * Normally the enumeration class is extended from EzEnumeration2 from /ezlibrary/enums/EzEnumeration2.js. However,
     * there might be some older enumeration classes that do not extend from EzEnumeration2.
     */
    #enumClassRef = null;
    /**
     * @public @readonly @property
     * Gets the reference to the enumeration class the enumeration data is assocaited with.
     * @returns {null|object}
     * Normally the enumeration class is extended from EzEnumeration2 from /ezlibrary/enums/EzEnumeration2.js. However,
     * there might be some older enumeration classes that do not extend from EzEnumeration2.
     */
    get enumClassRef() {
        return this.#enumClassRef;
    }

    /**
     * @private @field
     * Stores the property name
     * @type {string}
     * Default: 'UNKNOWN'
     */
    #enumPropertyName = 'UNKNOWN';
    /**
     * @public @readonly @property
     * @returns {string}
     * A valid enum
     */
    get enumPropertyName() {
        return this.#enumPropertyName;
    }

    #enumPropertyValue = 'UNKNOWN';
    get enumPropertyValue() {
        return this.#enumPropertyValue;
    }
}
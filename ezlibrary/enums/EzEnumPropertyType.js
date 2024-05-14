import { EzException } from '/ezlibrary/exceptions/EzExceptions.js';

/**
    Experiment to create an enumeration property type
    Import with:
        import { EzEnumPropertyType } from '/ezlibrary/enums/EzEnumPropertyType.js';
 */
export class EzEnumPropertyType {
    /**
        @public @constructor
        @param {string} name
        @param {*} value
     */
    constructor(name, value) {
        if (undefined == name || null == name || 'string' !== typeof(name) ||
            0 == name.length) {
            throw new EzException(
                'A valid non-empty and non-blank string value is required as the EzEnumPropertyType\'s name.');
        }

        if (undefined == value || null == value) {
            value = name;
        }

        this.#name = name;
        this.#value = value;
    }

    /**
        @private @field
        Stores the name of the EzEnumTypeProperty
        @type {string}
     */
    #name;

    /**
        @private @field
        Stores the value of the EzEnumTypeProperty
        @type {string}
     */
    #value;

    /**
        @public @readonly @property
        Returns the name of the enumeration property
        @returns {string}
     */
    get name() {
        return this.#name;
    }

    /**
        @public @readonly @property
        Returns the value of the EzEnumPropertyType
        @returns {*}
     */
    get value() {
        return this.#value;
    }

    /**
        @public @readonly @property
        Returns the name of the EzEnumPropertyType
        @returns {*}
     */
    get $() {
        return this.name;
    }

    /**
        @public @readonly @property
        Returns the value of the EzEnumPropertyType
        @returns {*}
     */
    get $$() {
        return this.value;
    }
}

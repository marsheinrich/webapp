/**
 * @module {/ezlibrary/enums/EzEnumeration2.js}
 * @exports {EzEnumerationProperty, EzEnumeration2}
 * @description
 * Module provides base classes for a Javascript "enumeration"
 * ---------------------------------------------------------------------------
 * Import EzEnumeration2 with:
 *     import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';
 * ---------------------------------------------------------------------------
 * Import all with:
 *     import {
 *         EzEnumerationProperty,
 *         EzEnumeration2
 *     } from '/ezlibrary/enums/EzEnumeration2.js';
 * ---------------------------------------------------------------------------
 * Import EzEnumerationProperty with:
 *     import { EzEnumerationProperty } from '/ezlibrary/enums/EzEnumeration2.js';
 * ---------------------------------------------------------------------------
 */

/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ENGINEERING NOTES
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    !! IMPORTANT !!
    Do NOT import this class into the following to avoid circular
    dependency issues:
        import { EzEnumerations } from '/ezlibrary/enums/EzEnumerations.js';
    ---------------------------------------------------------------------
    Recommended to add any new enumerations to the /ezlibrary/enums/EzEnumerations.js
    module to make importing enumerations easier.
    However, do NOT add the enumeration to the EzEnumerations.js if it
    imports any dependencies that might cause a circular reference.
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

import {
    EzBadParamException,
    EzBadStateException
} from '/ezlibrary/exceptions/EzExceptions.js';

import { EzObject } from '/ezlibrary/helpers/EzObject.js';
import { EzBoolean } from '/ezlibrary/helpers/EzBoolean.js';
import { EzString } from '/ezlibrary/helpers/EzString.js';
import { EzArray } from '/ezlibrary/helpers/EzArray.js';

import { EzBasicEnumerationData } from '/ezlibrary/enums/EzBasicEnumerationData.js'

/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ENGINEERING NOTES
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    New Enumeration Template
    1) Copy + paste the lines below into your Javascript file or optionally
       copy and paste the template from:
        {project-root}/source-templates/javascript/EzEnumTemplate.js
    2) Remove the beginning // comments (hint: use block editing mode)
    3) Search + replace EzEnumTemplate with the name of the enumeration
       class you want to create.
    4) Edit static initialization code:
        4a) Update/add your enumeration property names to the names array.
        4b) If needed, add the enumeration values array. Otherwise, keep null.
        4c) If needed, add the array for optional data. Otherwise, keep null.
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
// import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';
//
// /**
//  * @class
//  * @extends {EzEnumeration2}
//  * @description
//  * A template for an ezClocker enumeration class.
//  * ------------------------------------------------------------------
//  * Import into non-enumeration classes with:
//  *      import {
//  *          // ... other enumeration classes ...
//  *          EzEnumTemplate
//  *      } from '/ezlibrary/enums/EzEnumerations.js';
//  * ------------------------------------------------------------------
//  * Import into other enumeration classes or classes that cannot
//  * import EzEnumerations:
//  *      import { EzEnumTemplate } from '/ezlibrary/enums/EzEnumTemplate.js';
//  * ------------------------------------------------------------------
//  * Access static reference:
//  *      Inside class: EzEnumTemplate.{method or property}
//  *      Outside of class: EzEnumTemplate.{method or property}
//  * ------------------------------------------------------------------
//  */
// export class EzEnumTemplate extends EzEnumeration2 {
//     /**
//      * @private @field
//      * Stores the singleton instance of this enumeration class.
//      * @type {EzEnumTemplate}
//      */
//     static #ezEnumerationSingleton = null;
//
//     /**
//      * @static
//      * Static Initialization
//      */
//     static {
//         if (null == this.#ezEnumerationSingleton) {
//             this.#ezEnumerationSingleton = new EzEnumTemplate(
//                 // Enum property names
//                 [
//                     'UNKNOWN',
//                     'ENUM_PROP_NAME_1',
//                     'ENUM_PROP_NAME_2',
//                     'ENUM_PROP_NAME_3'
//                 ],
//                 // Enum property values for each enum property name as an array
//                 // Enter null if the values are equal to the names
//                 null,
//                 // Optional array of additional data for eac enumeration property.
//                 // Enter null if not needed.
//                 null);
//         }
//     }
// }

/**
 * @class
 * @description
 * Defines an enumeration property for an EzEnumeration2 instance.
 * >>> WOOT: Does not require EzApi <<<
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzEnumerationProperty } from '/ezlibrary/enums/EzEnumeration2.js';
 * ---------------------------------------------------------------------------
 */
export class EzEnumerationProperty {
    /**
     * @public @constructor
     * Creates a new instance of EzEnumerationProperty
     * @param {string} name
     * @param {*} value
     * @param {undefined|null|*|object} optionalData
     * Default is:
     * {
     *     enumName: this.ezName,
     *     enumValue: this.ezValue
     * }
     */
    constructor(name, value, optionalData) {
        if (!EzString.hasLength(name)) {
            throw new EzBadParamException(
                'name',
                EzEnumerationProperty,
                EzEnumerationProperty.constructor);
        }

        this.#ezName = name;

        this.#ezValue = EzObject.assignOrNull(value);

        this.#ezData = EzObject.assignOrDefault(
            optionalData,
            {
                enumName: this.ezName,
                enumValue: this.ezValue
            });
    }

    /**
     * @private @field
     * Stores the name of the enumeration property
     * @type {string}
     */
    #ezName = null;
    /**
     * @public @readonly @property
     * Returns the name of the enumeration property
     * @returns {string}
     */
    get ezName() {
        return this.#ezName;
    }

    /**
     * @private @field
     * Stores the value of the enumeration property
     * @type {*}
     */
    #ezValue = null;
    /**
     * @public @readonly @property
     * Returns the value of the enumeration property.
     * @returns {*}
     */
    get ezValue() {
        return this.#ezValue;
    }

    /**
     * @private @field
     * Stores the optional data associated with the enumeration property.
     * Default is:
     * {
     *     enumName: this.ezName,
     *     enumValue: this.ezValue
     * }
     * @type {string}
     */
    #ezData = null;
    /**
     * @public @property @getter
     * Gets the optional data associated with the enumeration property.
     * @returns {*|object}
     */
    get ezData() {
        return this.#ezData;
    }
}

/**
 * @class
 * @description
 * A base class thta provides 'enumeration class' functionality any
 * class that extends EzEnumeration2.
 * -----------------------------------------------------------------
 * Import with:
 *     import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';
 * -----------------------------------------------------------------
 * Adds the following static methods to classes extending EzEnumeration2:
 *      {EXTENDING_CLASS}.ezNames()
 *      {EXTENDING_CLASS}.ezValues()
 *      {EXTENDING_CLASS}.ezData(EzHttpRequestMethod.{PROPERTY_NAME})
 *      {EXTENDING_CLASS}.ezNameOf({PROPERTY_VALUE})
 *      {EXTENDING_CLASS}.ezValueOf({PROPERTY_VALUE})
 *      {EXTENDING_CLASS}.ezAsEnum({PROPERTY_VALUE})
 *      {EXTENDING_CLASS}.ezEnumData(EzHttpRequestMethod.{PROPERTY_NAME})
 */
export class EzEnumeration2 {
    /**
     * @static
     * @public @readonly @property
     * Returns the name of the default enumeration property: 'UNKNOWN'
     * @returns {string}
     */
    static get DEFAULT_UNKNOWN_ENUM_PROP_NAME() {
        return 'UNKNOWN';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns the name of the property that will return the array of
     * enumeration property names.
     * @returns {string}
     */
    static get NAMES_PROPERTY_NAME() {
        return 'ezNames';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns the name of the property that will return the array of
     * enumeration property values.
     * @returns {string}
     */
    static get VALUES_PROPERTY_NAME() {
        return 'ezValues';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns the name of the property that will return the array of
     * enumeration property data.
     * @returns {string}
     */
    static get DATA_PROPERTY_NAME() {
        return 'ezData';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns the name of the method 'ezNameOf' (to avoid typos)
     * @returns {string}
     */
    static get NAME_OF_METHOD_NAME() {
        return 'ezNameOf';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns the name of the static method 'ezValueOf' (to avoid typos)
     * @returns {string}
     */
    static get VALUE_OF_METHOD_NAME() {
        return 'ezValueOf';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns the name of the static method 'ezAsEnum' (to avoid typos)
     * @returns {string}
     */
    static get AS_ENUM_METHOD_NAME() {
        return 'ezAsEnum';
    }

    /**
     * @static
     * @public @readonly @property
        Returns the name of the static method 'ezEnumData' (to avoid typos)
     * @returns {string}
     */
    static get ENUM_DATA_METHOD_NAME() {
        return 'ezEnumData';
    }

    /**
     * @public @constructor
     * >> DO NOT CREATE NEW INSTANCES <<
     * The static initializer will create a singleton instance that injects the static properties and methods
     * that you then use to access enumeration values.
     *
     * Creates a new instance of EzEnumeration2.
     * Upon construction, EzEnumeration2 will inject static fields for each enumeration property name.
     * Example enumeration property access:
     *     MyEnunmType.PROPERTY_NAME_1 (returns the value for PROPERTY_NAME_1)
     *     MyEnunmType.PROPERTY_NAME_2 (returns the value for PROPERTY_NAME_1)
     *     ...
     *     MyEnunmType.PROPERTY_NAME_n (returns the value for PROPERTY_NAME_n)
     * In addition to the static properties the following three static methods get added to the implementing class
     * that provide some 'common' functionality for all enumerations:
     *     1) MyEnumType.ezValueOf(propertyName) (returns the property value that matches the propertyName)
     *     2) MyEnumType.ezNameOf(propertyValue) (returns the name that matches the propertyValue)
     *     3) MyEnumType.ezAsEnum(propertyName_or_propertyValue) (returns the matching enum property name)
     * @param {undefined|null|array} names
     * * If the names array is undefined, null, or an empty array then the default names array is used.
     *   Default names array is:
     *   [
     *     'UNKNOWN'
     *   ]
     * @param {undefined|null|array} values
     * * If the values array is undefiend or null then the values array is assumed to equal the
     *   provided names array.
     * * If the values array is not undefined and not null then
     *   the length of the values array is required to equal the length of the provided names array.
     * @param {undefined|null|array} optionalData
     * * If the optionalData array is provided and has a length then
     *   the length of the optionalData array is required to equal the length of the provided names array.
     * * If the optionalData array is undefined or null then a default data object is created for each
     *   property in the names array. The default data object is:
     *   {
     *     name: enumName,
     *     value: enumValue
     *   }
     */
    constructor(names, values, optionalData) {
        let prependedUnknownProp = !EzArray.hasLength(names) || -1 == names.indexOf(EzEnumeration2.DEFAULT_UNKNOWN_ENUM_PROP_NAME);

        if (EzBoolean.isTrue(prependedUnknownProp)) {
            names = EzArray.arrayHasLength(names)
                ? [
                    ...[EzEnumeration2.DEFAULT_UNKNOWN_ENUM_PROP_NAME],
                    ...names
                ]
                : [EzEnumeration2.DEFAULT_UNKNOWN_ENUM_PROP_NAME];
        }

        if (EzArray.hasLength(values)) {
            if (names.length > values.length) {
                throw new EzBadParamException(
                    'values',
                    EzEnumeration2,
                    EzEnumeration2.constructor);
            }
            if (EzBoolean.isTrue(prependedUnknownProp)) {
                values = [
                    ...[EzEnumeration2.DEFAULT_UNKNOWN_ENUM_PROP_NAME],
                    ...values
                ];
            }
        } else {
            values = [...names];
        }

        if (EzArray.isArray(optionalData)) {
            if (names.length > optionalData.length) {
                throw new EzBadParamException(
                    'optionalData',
                    EzEnumeration2,
                    EzEnumeration2.constructor);
            }

            if (EzBoolean.isTrue(prependedUnknownProp)) {
                optionalData = [
                    ...[{
                        name: EzEnumeration2.DEFAULT_UNKNOWN_ENUM_PROP_NAME,
                        value: EzEnumeration2.DEFAULT_UNKNOWN_ENUM_PROP_NAME
                    }],
                    ...optionalData
                ];
            }
        } else {
            optionalData = null;
        }

        this.#ezCreateEnumerationProperties(names, values, optionalData);

        this.#ezCreateStaticEnumerationMethods();
    }

    /**
     * @private @field
     * Storese the array of EzEnumerationProperty instances for the
     * 'enumeration' class that extends EzEnumeration2.
     * @type {array}
     */
    #ezEnumProps = [];

    /**
     * @private @method
     * Creates the EzEnumerationProperties with the values
     * from the provided arrays.
     * @param {array} names
     * Array must have a length of 1 or greater
     * @param {undefined|null|array} values
     * If values is a valid array then it's length must equal the length of the names array.
     * @param {undefined|null|array} optionalData
     * If optionalData is a valid array then it's length must equal the length of the names array.
     */
    #ezCreateEnumerationProperties(names, values, optionalData) {
        if (!EzArray.isArray(names) || 1 > names.length) {
            throw new EzBadParamException(
                'names',
                this,
                this.#ezCreateEnumerationProperties);
        }
        if (EzArray.isArray(values) && names.length != values.length) {
            throw new EzBadParamException(
                'values',
                this,
                this.#ezCreateEnumerationProperties);
        }
        if (EzArray.isArray(optionalData) && names.length != optionalData.length) {
            throw new EzBadParamException(
                'optionalData',
                this,
                this.#ezCreateEnumerationProperties);
        }

        this.constructor[EzEnumeration2.NAMES_PROPERTY_NAME] = [];

        this.constructor[EzEnumeration2.VALUES_PROPERTY_NAME] = [];

        this.constructor[EzEnumeration2.DATA_PROPERTY_NAME] = [];

        for (let index = 0; index < names.length; index++) {
            let enumName = names[index];

            if (EzString.hasLength(enumName)) {
                let enumValue = EzArray.hasLength(values)
                    ? values[index]
                    : enumName;

                let enumData = EzArray.hasLength(optionalData)
                    ? optionalData[index]
                    : {
                        name: enumName,
                        value: enumValue
                    };

                let enumProperty = new EzEnumerationProperty(
                    enumName,
                    enumValue,
                    enumData);

                this.#ezEnumProps.push(enumProperty);

                this.constructor[EzEnumeration2.NAMES_PROPERTY_NAME].push(enumProperty.ezName);

                this.constructor[EzEnumeration2.VALUES_PROPERTY_NAME].push(enumProperty.ezValue);

                this.constructor[EzEnumeration2.DATA_PROPERTY_NAME].push(enumProperty.ezData);

                this.constructor[enumProperty.ezName] = enumProperty.ezValue;
            }
        }
    }

    /**
     * @private @method
     * Creates the static enumeration methods on the constructor of the class that
     * extended EzEnumeration2.
     */
    #ezCreateStaticEnumerationMethods() {
        const clazz = this.constructor;

        this.constructor[EzEnumeration2.NAME_OF_METHOD_NAME] = (enumPropertyValue) => this.#ezNameOf(clazz, enumPropertyValue);

        this.constructor[EzEnumeration2.VALUE_OF_METHOD_NAME] = (enumPropertyName) => this.#ezValueOf(clazz, enumPropertyName);

        this.constructor[EzEnumeration2.AS_ENUM_METHOD_NAME] = (enumPropertyNameOrValue) => this.#ezAsEnum(clazz, enumPropertyNameOrValue);

        this.constructor[EzEnumeration2.ENUM_DATA_METHOD_NAME] = (enumPropertyNameOrValue) => this.#ezEnumData(clazz, enumPropertyNameOrValue);
    }

    /**
     * @private @method
     * Returns the enum property name associated with the provided enumPropertyValue.
     * If the provided enumPropertyValue does not match an existing enumeration
     * property value then the then enum property name at index 0 in the
     * ezNames[] array is returned.
     * @param {class} clazz
     * @param {string} enumPropertyValue
     * A valid enumeration property value from this enumeration class.
     * @returns {string}
     * A valid enumeration property name from this enumeration class.
     */
    #ezNameOf(clazz, enumPropertyValue) {
        if (!EzObject.isValid(clazz)) {
            throw new EzBadParamException(
                'clazz',
                this,
                this.#ezNameOf);
        }
        if (!EzObject.isValid(enumPropertyValue)) {
            throw new EzBadParamException(
                'enumPropertyValue',
                this,
                this.#ezNameOf);
        }
        if (!clazz?.[EzEnumeration2.VALUES_PROPERTY_NAME]) {
            throw new EzBadStateException(
                `Expected class ${clazz.name} to have static property ${clazz.name}.${EzEnumeration2.VALUES_PROPERTY_NAME}.`,
                `Class ${clazz.name} does not seem to have the static property ${clazz.name}.${EzEnumeration2.VALUES_PROPERTY_NAME}`,
                clazz,
                clazz['ezAsEnum']);
        }
        if (!clazz?.[EzEnumeration2.NAMES_PROPERTY_NAME]) {
            throw new EzBadStateException(
                `Expected class ${clazz.name} to have static property ${clazz.name}.${EzEnumeration2.NAMES_PROPERTY_NAME}.`,
                `Class ${clazz.name} does not have the static property ${clazz.name}.${EzEnumeration2.NAMES_PROPERTY_NAME}`,
                clazz,
                clazz['ezAsEnum']);
        }

        if (EzArray.hasLength(clazz?.[EzEnumeration2.VALUES_PROPERTY_NAME])) {
            let valueIndex = clazz[EzEnumeration2.VALUES_PROPERTY_NAME].indexOf(enumPropertyValue);

            if (0 <= index) {
                return clazz[EzEnumeration2.NAMES_PROPERTY_NAME][valueIndex];
            }
        }

        return null;
    }

    /**
     * @public @static @method
     * Returns the enum property value for the provided enumPropertyName
     * If the provided enumPropertyName does not match an existing enumeration
     * property then the value of the enum property name at index 0 in the ezNames[]
     * array is returned.
     * @param {String} enumPropertyName
     * A valid enumeration property name from this enumeration class.
     * @returns {String}
     * A valid enumeration property value from this enumeration class.
     */
    #ezValueOf(clazz, enumPropertyName) {
        if (!EzObject.isValid(clazz)) {
            throw new EzBadParamException(
                'clazz',
                this,
                this.#ezValueOf);
        }
        if (!EzObject.isValid(enumPropertyName)) {
            throw new EzBadParamException(
                'enumPropertyNameOrValue',
                this,
                this.#ezAsEnum);
        }
        if (!clazz?.[EzEnumeration2.NAMES_PROPERTY_NAME]) {
            throw new EzBadStateException(
                `Expected class ${clazz.name} to have static property ${clazz.name}.${EzEnumeration2.NAMES_PROPERTY_NAME}.`,
                `Class ${clazz.name} does not have the static property ${clazz.name}.${EzEnumeration2.NAMES_PROPERTY_NAME}`,
                clazz,
                clazz['ezValueOf']);
        }

        if (EzArray.hasLength(clazz?.[EzEnumeration2.NAMES_PROPERTY_NAME])) {
            let nameIndex = clazz[EzEnumeration2.NAMES_PROPERTY_NAME].indexOf(enumPropertyName);

            if (0 <= nameIndex) {
                return clazz[clazz[EzEnumeration2.NAMES_PROPERTY_NAME][nameIndex]];
            }
        }

        return null;
    }

    /**
     * @public @static @method
     * Returns the enum property value for the provided enumPropertyNameOrValue which can be either
     * a enumeration property name OR a enumeration property value.
     * If the provided enumPropertyNameOrValue does not match an existing enumeration property value
     * then an attempt is made to match a enum property name.
     * If the enumPropertyNameOrValue does not match an enum property name OR enum property value then
     * the value of the enum property name at index 0 in the ezNames[] array is returned.
     * @param {String} enumPropertyNameOrValue
     * A valid enumeration property name OR enum property value from this enumeration class.
     * @returns {String}
     * A valid enumeration property value from this enumeration class.
     */
    #ezAsEnum(clazz, enumPropertyNameOrValue = null) {
        if (!EzObject.isValid(clazz)) {
            throw new EzBadParamException(
                'clazz',
                this,
                this.#ezAsEnum);
        }
        if (!EzObject.isValid(enumPropertyNameOrValue)) {
            throw new EzBadParamException(
                'enumPropertyNameOrValue',
                this,
                this.#ezAsEnum);
        }
        if (!clazz?.[EzEnumeration2.NAMES_PROPERTY_NAME]) {
            throw new EzBadStateException(
                `Expected class ${clazz.name} to have static property ${clazz.name}.${enumPropertyNameOrValue}.`,
                clazz,
                clazz.ezAsEnum);
        }
        if (!clazz?.[EzEnumeration2.VALUES_PROPERTY_NAME]) {
            throw new EzBadStateException(
                `Expected class ${clazz.name} to have a static property with value ${enumPropertyNameOrValue}.`,
                clazz,
                clazz.ezAsEnum);
        }

        if (EzArray.hasLength(clazz?.[EzEnumeration2.NAMES_PROPERTY_NAME])) {
            let nameIndex = clazz[EzEnumeration2.NAMES_PROPERTY_NAME].indexOf(enumPropertyNameOrValue)

            if (0 <= nameIndex) {
                let enumPropertyName = clazz[EzEnumeration2.NAMES_PROPERTY_NAME][nameIndex];

                if (!clazz?.[enumPropertyName]) {
                    throw new EzBadStateException(
                        `Expected class ${clazz.name} to have static property ${clazz.name}.${enumPropertyName}`,
                        `However, the class ${clazz.name} does not seem to have a static property named ${clazz.name}.${enumPropertyName}`,
                        clazz,
                        clazz['ezAsEnum']);
                }

                return clazz[enumPropertyName];
            }
        }

        if (EzArray.hasLength(clazz?.[EzEnumeration2.VALUES_PROPERTY_NAME])) {
            let valueIndex = clazz[EzEnumeration2.VALUES_PROPERTY_NAME].indexOf(enumPropertyNameOrValue);

            if (0 <= valueIndex) {
                if (EzArray.hasLength(clazz?.[EzEnumeration2.NAMES_PROPERTY_NAME])) {
                    let enumPropertyName = clazz[EzEnumeration2.NAMES_PROPERTY_NAME][valueIndex];

                    if (!clazz?.[enumPropertyName]) {
                        throw new EzBadStateException(
                            `Expected class ${clazz.name} to have static property ${clazz.name}.${enumPropertyName}`,
                            `However, the class ${clazz.name} does not seem to have a static property named ${clazz.name}.${enumPropertyName}`,
                            clazz,
                            clazz['ezAsEnum']);
                    }

                    return clazz[enumPropertyName];
                }
            }
        }

        // Returning the first property
        throw new EzBadStateException(
            EzString.em`
                Expected class ${clazz.name} to have static property ${clazz.name}.${enumPropertyNameOrValue}
                or a static property with the value of ${enumPropertyNameOrValue}`,
            EzString.em`
                However, the class ${clazz.name} does not seem to have a static property named ${clazz.name}.${enumPropertyNameOrValue}
                or a static property with the value of ${enumPropertyNameOrValue}`,
            clazz,
            clazz['ezAsEnum']);
    }

    /**
     * @static
     * @private @method
     * Obtains the enumeration data (if available) for the provided enumPropertyNameOrValue.
     * If the enumPropertynameOrValue provided doesn't match any enum propert names or values then the
     * default data value is returned (normally, this is the value fro the UNKNOWN property name.)
     * @param {string} enumPropertyNameOrValue
     * @returns {null|*}
     * Returns the enum property's data (if it exists)
     * If the enum property does not have data, then null is returned.
     */
    #ezEnumData(clazz, enumPropertyNameOrValue = null) {
        if (!EzObject.isValid(clazz)) {
            throw new EzBadParamException(
                'clazz',
                this,
                this.#ezEnumData);
        }
        if (!EzObject.isValid(enumPropertyNameOrValue)) {
            throw new EzBadParamException(
                'enumPropertyNameOrValue',
                this,
                this.#ezEnumData);
        }
        if (!clazz?.[EzEnumeration2.NAMES_PROPERTY_NAME]) {
            throw new EzBadStateException(
                `Expected class ${clazz.name} to have static property ${clazz.name}.${EzEnumeration2.NAMES_PROPERTY_NAME}.`,
                `Class ${clazz.name} does not have the static property ${clazz.name}.${EzEnumeration2.NAMES_PROPERTY_NAME}`,
                clazz,
                clazz['ezAsEnum']);
        }
        if (!clazz?.[EzEnumeration2.VALUES_PROPERTY_NAME]) {
            throw new EzBadStateException(
                `Expected class ${clazz.name} to have static property ${clazz.name}.${EzEnumeration2.VALUES_PROPERTY_NAME}.`,
                `Class ${clazz.name} does not seem to have the static property ${clazz.name}.${EzEnumeration2.VALUES_PROPERTY_NAME}`,
                clazz,
                clazz['ezAsEnum']);
        }

        if (EzArray.hasLength(clazz?.[EzEnumeration2.VALUES_PROPERTY_NAME])) {
            let valueIndex = clazz[EzEnumeration2.VALUES_PROPERTY_NAME].indexOf(enumPropertyNameOrValue);

            if (0 <= valueIndex && valueIndex < clazz[EzEnumeration2.DATA_PROPERTY_NAME].length) {
                if (!EzArray.hasLength(clazz?.[EzEnumeration2.DATA_PROPERTY_NAME])) {
                    // No data for this enumeration, returning a default enumeration data instance
                    return new EzBasicEnumerationData(
                        clazz,
                        clazz[EzEnumeration2.NAMES_PROPERTY_NAME][valueIndex]);
                }

                return clazz[EzEnumeration2.DATA_PROPERTY_NAME][valueIndex]
            }
        }

        if (EzArray.hasLength(clazz?.[EzEnumeration2.NAMES_PROPERTY_NAME])) {
            let nameIndex = clazz[EzEnumeration2.NAMES_PROPERTY_NAME].indexOf(enumPropertyNameOrValue);

            if (!EzArray.hasLength(clazz?.[EzEnumeration2.DATA_PROPERTY_NAME])) {
                // No data for this enumeration, returning a default enumeration data instance
                return new EzBasicEnumerationData(
                    clazz,
                    clazz[EzEnumeration2.VALUES_PROPERTY_NAME][nameIndex]);
            }

            if (0 <= nameIndex && nameIndex < clazz[EzEnumeration2.DATA_PROPERTY_NAME].length) {
                return clazz[EzEnumeration2.DATA_PROPERTY_NAME][nameIndex]
            }
        }

        let errorEnumData = {
            errorCode: 404,
            enumName: enumPropertyNameOrValue,
            message: `Enumeration with enumeration property name of value equal to '${enumPropertyNameOrValue}' does not exist.`
        };

        // Enumeration uknown, returning an error data instance
        ezApi.ezclocker.ezLogger.error(errorEnumData.message);

        return errorEnumData;
    }
}
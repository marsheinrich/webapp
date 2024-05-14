import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

/**
 * @class
 * @extends {EzEnumeration2}
 * @description
 * A template for an ezClocker enumeration class.
 * -----------------------------------------------------------------
 * ENGINEERING NOTES:
 *     Static Methods provided by EzEnumeration2:
 *         * EzEnumTemplate.ezValueOf(ezEnumTemplateEnumPropertyValue)
 *             Returns the enum property value for the provided enumPropertyName
 *             If the provided enumPropertyName does not match an existing enumeration
 *             property then the value of the enum property name at index 0 in the ezNames[]
 *             array is returned.
 *         * EzEnumTemplate.ezEnumData(ezEnumTemplateEnumPropertyValue)
 *             Obtains the enumeration data (if available) for the provided enumPropertyNameOrValue.
 *             If the enumPropertynameOrValue provided doesn't match any enum propert names or values then the
 *             default data value is returned (normally, this is the value fro the UNKNOWN property name.)
 *         * EzEnumTemplate.ezAsEnum(ezEnumTemplateEnumPropertyValue)
 *             Returns the enum property value for the provided enumPropertyNameOrValue which can be either
 *             a enumeration property name OR a enumeration property value.
 *             If the provided enumPropertyNameOrValue does not match an existing enumeration property value
 *             then an attempt is made to match a enum property name.
 *             If the enumPropertyNameOrValue does not match an enum property name OR enum property value then
 *             the value of the enum property name at index 0 in the ezNames[] array is returned.
 *         * EzEnumTemplate.ezNameOf(ezEnumTemplateEnumPropertyName)
 *             Returns the enum property name associated with the provided enumPropertyValue.
 *             If the provided enumPropertyValue does not match an existing enumeration
 *             property value then the then enum property name at index 0 in the
 *             ezNames[] array is returned.
 * -----------------------------------------------------------------
 * Import into non-enumeration classes with:
 *     import {
 *         // ... other enumeration classes ...
 *         EzEnumTemplate
 *     } from '/ezlibrary/enums/EzEnumerations.js';
 * -----------------------------------------------------------------
 * Import into another enumeration class with:
 *     import { EzEnumTemplate } from '/ezlibrary/enums/EzEnumTemplate.js';
 * -----------------------------------------------------------------
 * Access static reference:
 *     Inside class: EzEnumTemplate.{method or property}
 *     Outside of class: EzEnumTemplate.{method or property}
 * -----------------------------------------------------------------
 */
export class EzEnumTemplate extends EzEnumeration2 {
    /**
     * @private @field
     * Stores the singleton instance of this enumeration class.
     * @type {EzEnumTemplate}
     */
    static #ezEnumerationSingleton = null;

    /**
     * @static
     * Static Initialization
     */
    static {
        if (null == EzEnumTemplate.#ezEnumerationSingleton) {
            EzEnumTemplate.#ezEnumerationSingleton = new EzEnumTemplate(
                // Enum Property Names Array
                // Converted to static read-only properties:
                //      * EzEnumTemplate.UNKNOWN
                //      * ENUM_TYPE_1.UNKNOWN
                //      * ENUM_TYPE_2.UNKNOWN
                //      * ENUM_TYPE_3.UNKNOWN
                // The result from the static properties is:
                // If the enum property values array is used, then the result is the value from the enum property values array at the same index as the static
                // property name in the enum property names array.
                // Otherwise, the value is the name of the property
                [
                    'UNKNOWN',
                    'ENUM_TYPE_1',
                    'ENUM_TYPE_2',
                    'ENUM_TYPE_3'
                ],
                // Enum Property Values Array (optional)
                // Must equal the length of the Enum Property Names array, index for index
                // Enter null if the values are equal to the names
                [
                    'UNKNOWN',
                    'ENUM_VALUE_1',
                    'ENUM_VALUE_2',
                    'ENUM_VALUE_3'
                ],
                // Array of Additional Enumeration Data (optional)
                // Must equal the length of the Enum Property Names array, index for index
                // Enter null if not needed.
                [
                    {
                        displayName: 'Unknown',
                        intValue: 0
                    },
                    {
                        displayName: 'Enum value 1',
                        intValue: 1
                    },
                    {
                        displayName: 'Enum value 2',
                        intValue: 2
                    },
                    {
                        displayName: 'Enum value 3',
                        intValue: 3
                    }
                ]);
        }
    }

    /**
     * @public @constructor
     * >> DO NOT CREATE NEW INSTANCES <<
     * The static initializer will create a singleton instance that injects the static properties and methods
     * that you then use to access enumeration values.
     */
    constructor(name, value, optionalData) {
        super(name, value, optionalData);
    }
}

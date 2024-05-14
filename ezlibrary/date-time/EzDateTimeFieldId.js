import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

/**
    @class
    @extends {EzEnumeration2}
    @description
    Defines the fields in a date time object
    -----------------------------------------------------------------
    ENGINEERING NOTES:
        Static Methods provided by EzEnumeration2:
            * EzEnumTemplate.ezValueOf(ezEnumTemplateEnumPropertyValue)
                Returns the enum property value for the provided enumPropertyName
                If the provided enumPropertyName does not match an existing enumeration
                property then the value of the enum property name at index 0 in the ezNames[]
                array is returned.
            * EzEnumTemplate.ezEnumData(ezEnumTemplateEnumPropertyValue)
                Obtains the enumeration data (if available) for the provided enumPropertyNameOrValue.
                If the enumPropertynameOrValue provided doesn't match any enum propert names or values then the
                default data value is returned (normally, this is the value fro the UNKNOWN property name.)
            * EzEnumTemplate.ezAsEnum(ezEnumTemplateEnumPropertyValue)
                Returns the enum property value for the provided enumPropertyNameOrValue which can be either
                a enumeration property name OR a enumeration property value.
                If the provided enumPropertyNameOrValue does not match an existing enumeration property value
                then an attempt is made to match a enum property name.
                If the enumPropertyNameOrValue does not match an enum property name OR enum property value then
                the value of the enum property name at index 0 in the ezNames[] array is returned.
            * EzEnumTemplate.ezNameOf(ezEnumTemplateEnumPropertyName)
                Returns the enum property name associated with the provided enumPropertyValue.
                If the provided enumPropertyValue does not match an existing enumeration
                property value then the then enum property name at index 0 in the
                ezNames[] array is returned.
    -----------------------------------------------------------------
    Import into another enumeration class with:
        import { EzDateTimeFieldId } from '/ezlibrary/date-time/EzDateTimeFieldId.js';
    -----------------------------------------------------------------
    Access static reference:
        Inside class: EzDateTimeFieldId.{method or property}
        Outside of class: EzDateTimeFieldId.{method or property}
    -----------------------------------------------------------------
 */
export class EzDateTimeFieldId extends EzEnumeration2 {
    /**
        @private @field
        Stores the singleton instance of this enumeration class.
        @type {EzDateTimeFieldId}
     */
    static #ezEnumerationSingleton = null;

    /**
        @static
        Static Initialization
     */
    static {
        if (null == EzDateTimeFieldId.#ezEnumerationSingleton) {
            EzDateTimeFieldId.#ezEnumerationSingleton = new EzDateTimeFieldId(
                // Enum property names
                [
                    'UNKNOWN',
                    'YEARS',
                    'QUARTERS',
                    'MONTHS',
                    'WEEKS',
                    'DAYS',
                    'HOURS',
                    'MINUTES',
                    'SECONDS',
                    'MILLISECONDS'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                [
                    'y',
                    'Q',
                    'M',
                    'w',
                    'd',
                    'h',
                    'm',
                    's',
                    'ms'
                ],
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

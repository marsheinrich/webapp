import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

// Helpers
import {
    EzObject,
    EzBoolean,
    EzString
} from '/ezlibrary/helpers/EzHelpers.js';

/**
    @class
    @extends {EzEnumeration2}
    @description
    Enum of known data tag value types.
    Javascript enumeration class equivlant to DataTagValueType.java
    ---------------------------------------------------------------------
    >>> IMPORTANT <<<
    Changes made to this class will also need made to the Java
    class com.ezclocker.domain.DataTagValueType.java.
    ---------------------------------------------------------------------
    Import with:
        import { EzDataTagValueType } from '/ezlibrary/enums/EzDataTagValueType.js';
    ---------------------------------------------------------------------
    Import with the following if importing more than one enumeration class:
        import {
            <... other enumeration classes ...>
            EzDataTagValueType
        } from '/ezlibrary/enums/EzEnumerations.js';
    ---------------------------------------------------------------------
 */
export class EzDataTagValueType extends EzEnumeration2 {
    /**
       @private @field
       Stores the singleton instance of this enumeration class.
       @type {EzDataTagValueType}
    */
    static #ezEnumerationSingleton = null;

    /**
        @static
        Static Initialization
     */
    static {
        if (null == EzDataTagValueType.#ezEnumerationSingleton) {
            EzDataTagValueType.#ezEnumerationSingleton = new EzDataTagValueType(
                // Enum property names
                [
                    "UNKNOWN",
                    "NOTE",
                    "RATE",
                    "HOURLY",
                    "BILLABLE_AMOUNT",
                    "NON_BILLABLE_AMOUNT",
                    "FIXED_FEE",
                    "TIME_MATERIALS_CUSTOMER_HOURLY_RATE",
                    "TIME_MATERIALS_CUSTOMER_PERSON_RATE",
                    "TIME_MATERIALS_CUSTOMER_TASK_RATE"
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                null,
                // Optional array of additional data for eac enumeration property.
                // Enter null if not needed.
                [
                    {
                        valueName: 'Unknown',
                        valueType: String,
                        defaultValue: EzString.EMPTY,
                        isCurrency: false
                    },
                    {
                        valueName: "Note",
                        valueType: String,
                        defaultValue: EzString.EMPTY,
                        isCurrency: false
                    },
                    {
                        valueName: "Rate",
                        valueType: Number,
                        defaultValue: 0.00,
                        isCurrency: true
                    },
                    {
                        valueName: "Hourly Rate",
                        valueType: Number,
                        defaultValue: 0.00,
                        isCurrency: true
                    },
                    {
                        valueName: "Billable Amount",
                        valueType: Number,
                        defaultValue: 0.00,
                        isCurrency: true
                    },
                    {
                        valueName: "Non-Billable Amount",
                        valueType: Number,
                        defaultValue: 0.00,
                        isCurrency: true
                    },
                    {
                        valueName: "Fixed Fee",
                        valueType: 'number',
                        defaultValue: 0.00,
                        isCurrency: true
                    },
                    {
                        valueName: "Customer Hourly Rate",
                        valueType: Number,
                        defaultValue: 0.00,
                        isCurrency: true
                    },
                    {
                        valueName: "Customer Person Rate",
                        valueType: Number,
                        defaultValue: 0.00,
                        isCurrency: true
                    },
                    {
                        valueName: "Customer Task Rate",
                        valueType: Number,
                        defaultValue: 0.00,
                        isCurrency: true
                    }
                ]);
        }
    }

    /**
        @static
        @public @method
        @param {string} enumPropertyNameOrValue
        @returns {string}
     */
    static ezValueName(enumPropertyNameOrValue) {
        let enumData = this.ezData.ezEnumData(enumPropertyNameOrValue);
        return null != enumData
            ? EzString.stringOrDefault(enumData.valueName, 'Unknown')
            : 'Unknown';
    }

    /**
        @static
        @public @method
        @param {string} enumPropertyNameOrValue
        @returns {string}
     */
    static ezValueType(enumPropertyNameOrValue) {
        let enumData = this.ezData.ezEnumData(enumPropertyNameOrValue);
        return null != enumData
            ? EzString.stringOrDefault(enumData.valueType, 'string')
            : 'string';
    }

    /**
        @static
        @public @method
        @param {string} enumPropertyNameOrValue
        @returns {*}
     */
    static ezDefaultValue(enumPropertyNameOrValue) {
        let enumData = this.ezData.ezEnumData(enumPropertyNameOrValue);
        return null != enumData
            ? EzObject.assignOrNull(enumData.defaultValue)
            : null;
    }


    /**
        @static
        @public @method
        @param {string} enumPropertyNameOrValue
        @returns {boolean}
     */
    static ezIsCurrency(enumPropertyNameOrValue) {
        let enumData = this.ezData.ezEnumData(enumPropertyNameOrValue);
        return null != enumData
            ? EzBoolean.isTrue(enumData.isCurrency)
            : false;
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

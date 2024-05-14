import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

/**
    @class
    @description
    Locale Currencies enumeration
    Currency definition references:
    * https://www.six-group.com/en/products-services/financial-information/data-standards.html#scrollTo=currency-codes
    * https://www.six-group.com/dam/download/financial-information/data-center/iso-currrency/lists/list-one.xls
    ---------------------------------------------------------------------------
    Import into non-enumeration classes with:
        import {
            // < ... other enumerations ... >
            EzCurrency
        } from '/ezlibrary/enums/EzEnumerations.js';
    ---------------------------------------------------------------------------
    Import into another enumeration class with:
        import { EzCurrency } from '/ezlibrary/locales/EzCurrency.js';
    ---------------------------------------------------------------------------
    Access static reference:
        Inside EzCurrency class: EzCurrency.{method or property}
        Outside of EzCurrency: EzCurrency.{method or property}
    ---------------------------------------------------------------------------
 */
export class EzCurrency extends EzEnumeration2 {
    /**
        @private @field
        Stores the singleton instance of this enumeration class.
        @type {EzCurrency}
     */
    static #ezEnumerationSingleton = null;

    /**
        @static
        Static Initialization
     */
    static {
        if (null == EzCurrency.#ezEnumerationSingleton) {
            EzCurrency.#ezEnumerationSingleton = new EzCurrency(
                // Enum property names
                [
                    'UNKNOWN',
                    'ENGLISH',
                    'FRENCH',
                    'GERMAN',
                    'ITALIAN',
                    'JAPANESE',
                    'KOREAN',
                    'CHINESE',
                    'SIMPLIFIED_CHINESE',
                    'TRADITIONAL_CHINESE',
                    'FRANCE',
                    'GERMANY',
                    'ITALY',
                    'JAPAN',
                    'KOREA',
                    'CHINA',
                    'PRC',
                    'TAIWAN',
                    'UK',
                    'US',
                    'CANADA',
                    'CANADA_FRENCH',
                    'DEFAULT_LOCALE'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                [
                    'UNKNOWN',
                    'USD',
                    'EUR',
                    'EUR',
                    'EUR',
                    'JPY',
                    'KRW',
                    'CNY',
                    'CNY',
                    'CNY',
                    'EUR',
                    'EUR',
                    'EUR',
                    'JPY',
                    'KRW',
                    'CNY',
                    'CNY',
                    'TWD',
                    'GBP',
                    'USD',
                    'CAD',
                    'CAD',
                    'USD'
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

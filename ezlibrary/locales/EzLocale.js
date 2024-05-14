import {
    EzString
} from '/ezlibrary/helpers/EzString.js';

import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';


/**
    @class
    @description
    Locality Enumeration
    Not registerd with ezApi, use directly
    ---------------------------------------------------------------------------
    Import into non-enumeration classes with:
        import {
            // < ... other enumerations ... >
            EzLocale
        } from '/ezlibrary/enums/EzEnumerations.js';
    ---------------------------------------------------------------------------
    Import into another enumeration class with:
        import { EzLocale } from '/ezlibrary/locales/EzLocale.js';
    ---------------------------------------------------------------------------
    Access static reference:
        Inside EzLocale class: EzLocale.{method or property}
        Outside of EzLocale: EzLocale.{method or property}
    ---------------------------------------------------------------------------
 */
export class EzLocale extends EzEnumeration2 {
    /**
        @private @field
        Stores the singleton instance of this enumeration class.
        @type {EzLocale}
     */
    static #ezEnumerationSingleton = null;

    /**
        @static
        Static Initialization
     */
    static {
        if (null == EzLocale.#ezEnumerationSingleton) {
            EzLocale.#ezEnumerationSingleton = new EzLocale(
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
                    'DEFAULT'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                [
                    // UNKNOWN
                    'en',
                    // ENGLISH
                    'en',
                    // FRENCH
                    'fr',
                    // GERMAN
                    'de',
                    // ITALIAN
                    'it',
                    // JAPANESE
                    'ja',
                    // KOREAN
                    'ko',
                    // CHINESE
                    'zh',
                    // SIMPLIFIED_CHINESE
                    'zh',
                    // TRADITIONAL_CHINESE
                    'zh',
                    // FRANCE
                    'fr',
                    // GERMANY
                    'de',
                    // ITALY
                    'it',
                    // JAPAN
                    'ja',
                    // KOREA
                    'ko',
                    // CHINA
                    'zh',
                    // PRC
                    'zh',
                    // TAIWAN
                    'zh',
                    // UK
                    'en',
                    // US
                    'en',
                    // CANADA
                    'en',
                    // CANADA_FRENCH
                    'fr',
                    // DEFAULT_LOCALE
                    'en'
                ],
                // Optional array of additional data for eac enumeration property.
                // Enter null if not needed.
                null);
        }
    }

    /**
        @static
        @public @method
        Returns the EzLocale enum property value that matches the provided enum property value string.
        If the provided file is undefined, null, or no match is found, returns EzLocal.DEFAULT_LOCALE
        @param {string} ezLocaleValue
        @returns {string}
        A valid enum property value from EzLocale
     */
    static ezLocaleForValue(ezLocalValue) {
        if (!EzString.stringHasLength(ezLocalValue)) {
            return EzLocale.BROWSER_LOCALE;
        }

        switch (ezLocalValue.toUpperCase()) {
            case EzLocale.ENGLISH:
                return EzLocale.ENGLISH;
            case EzLocale.FRENCH:
                return EzLocale.FRENCH;
            case EzLocale.GERMAN:
                return EzLocale.GERMAN;
            case EzLocale.ITALIAN:
                return EzLocale.ITALIAN;
            case EzLocale.JAPANESE:
                return EzLocale.JAPANESE;
            case EzLocale.KOREAN:
                return EzLocale.KOREAN;
            case EzLocale.CHINESE:
                return EzLocale.CHINESE;
            case EzLocale.SIMPLIFIED_CHINESE:
                return EzLocale.SIMPLIFIED_CHINESE;
            case EzLocale.TRADITIONAL_CHINESE:
                return EzLocale.TRADITIONAL_CHINESE;
            case EzLocale.FRANCE:
                return EzLocale.FRANCE;
            case EzLocale.GERMANY:
                return EzLocale.GERMANY;
            case EzLocale.ITALY:
                return EzLocale.ITALY;
            case EzLocale.JAPAN:
                return EzLocale.JAPAN;
            case EzLocale.KOREA:
                return EzLocale.KOREA;
            case EzLocale.CHINA:
                return EzLocale.CHINA;
            case EzLocale.PRC:
                return EzLocale.PRC;
            case EzLocale.TAIWAN:
                return EzLocale.TAIWAN;
            case EzLocale.UK:
                return EzLocale.UK;
            case EzLocale.US:
                return EzLocale.US;
            case EzLocale.CANADA_FRENCH:
                return EzLocale.CANADA_FRENCH;
            default:
                // If no match, return the provided ezLocaleValue in upper case
                return ezLocalValue.toUpperCase();
        }
    }

    /**
        @static
        @public @readonly @property
        Returns the EzLocale as defined by the browser's navigator.language property.
        @returns {string}
        A valid enum property value or a two letter string representing the language.
     */
    static BROWSER_LOCALE() {
        let lang = navigator.language;

        return EzString.stringHasLength(lang) && 2 <= lang.length
            ? lang.slice(0, 2).toUpperCase()
            : EzLocale.DEFAULT_LOCALE;
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

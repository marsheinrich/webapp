import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzEnumPropertyType } from '/ezlibrary/enums/EzEnumPropertyType.js';

/**
    Enumeration of known credit card types.
    Import with:
        import { EzCreditCardType } from '/ezlibrary/enums/EzCreditCardType.js';
 */
export class EzCreditCardType {
    /**
        @private @static @field
        Returns the array of EzEnumPropertType instances for all enumeration properties.
        @returns {array}
     */
    static #ezEnumProperties = [];

    /**
        @private @static @field
        Stors the array of names of the enumeration properties.
        @returns {array}
     */
    static #ezNames = [];

    /**
        @private @static @field
        Stors the array of values for the enumeration properties.
        @returns {array}
     */
    static #ezValues = [];

    /**
        @private @static @method
        Appends EzEnumPropertyType instances as enumeration properties.
        @param {EzEnumPropertyType} ezEnumPropertyType
     */
    static #appendEnumPropertyType(ezEnumPropertyType) {
        if (!ezEnumPropertyType) {
            throw new EzBadParamException(
                'ezEnumPropertyType',
                EzCreditCardType,
                EzCreditCardType.#appendEnumPropertyType);
        }

        EzCreditCardType.#ezEnumProperties.push(ezEnumPropertyType);

        EzCreditCardType.#ezNames.push(
            EzCreditCardType.#ezEnumProperties[EzCreditCardType.#ezEnumProperties.length -1].$);

        EzCreditCardType.#ezValues.push(
            EzCreditCardType.#ezEnumProperties[EzCreditCardType.#ezEnumProperties.length -1].$);
    }

    // Static Initializer
    static {
        EzCreditCardType.#appendEnumPropertyType(
            new EzEnumPropertyType(
                'AMERICAN_EXPIRESS',
                'American Express'));

        EzCreditCardType.#appendEnumPropertyType(
            new EzEnumPropertyType(
                'CARTE_BLANCHE',
                'Carte Blanche'));

        EzCreditCardType.#appendEnumPropertyType(
            new EzEnumPropertyType(
                'CHINA_UNIONPAY',
                'China UnionPay'));

        EzCreditCardType.#appendEnumPropertyType(
            new EzEnumPropertyType(
                'DISCOVER',
                'Discover'));

        EzCreditCardType.#appendEnumPropertyType(
            new EzEnumPropertyType(
                'ELO',
                'Elo'));

        EzCreditCardType.#appendEnumPropertyType(
            new EzEnumPropertyType(
                'JCB',
                'JCB'));

        EzCreditCardType.#appendEnumPropertyType(
            new EzEnumPropertyType(
                'LASER',
                'Laser'));

        EzCreditCardType.#appendEnumPropertyType(
            new EzEnumPropertyType(
                'MAESTRO',
                'Maestro'));

        EzCreditCardType.#appendEnumPropertyType(
            new EzEnumPropertyType(
                'MASTERCARD',
                'MasterCard'));

        EzCreditCardType.#appendEnumPropertyType(
            new EzEnumPropertyType(
                'SOLO',
                'Solo'));

        EzCreditCardType.#appendEnumPropertyType(
            new EzEnumPropertyType(
                'SWITCH',
                'Switch'));

        EzCreditCardType.#appendEnumPropertyType(
            new EzEnumPropertyType(
                'VISA',
                'Visa'));
    }

    /**
        @public @readonly @property
        Returns an array of valuse for each enumeration property;
        @returns {array}
     */
    static get ezValues() {
        return EzCreditCardType.#ezValues;
    }

    /**
        @public @static @readonly @property
        Returns an array names for the each enumeration property.
        @returns {array}
     */
    static get ezNames() {
        return EzCreditCardType.#ezNames;
    }

    /**
        @public @static @method
        Returns the enumeration property value that matches the
        enumeration property's name.
        If no match is found the value for EzCreditCardType.UNKNOWN is returned.
        @param {string} enumPropertyName
        @returns {string}
     */
    static ezValueOf(enumPropertyName) {
        let index = EzCreditCardType.ezNames.indexOf(enumPropertyName.toUpperCase());

        return -1 != index
            ? EzCreditCardType.ezValues[index]
            : EzCreditCardType.UNKNOWN;
    }

    /**
        @public @static @method
        Returns the enumeration property's name whos value matches
        the provided provided enumPropertyValue.
        If no match is found, the name for EzCreditCardType.UNKNOWN is returned.
        @param {string} enumPropertyName
        @returns {string}
     */
    static ezNameOf(enumPropertyValue) {
        let index = EzCreditCardType.ezValues.indexOf(enumPropertyValue);

        return -1 != index
            ? EzCreditCardType.ezNames[index]
            : EzCreditCardType.ezNames[0];
    }
}
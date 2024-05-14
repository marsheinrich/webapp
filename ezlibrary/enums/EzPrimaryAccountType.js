import { EzEnum } from '/ezlibrary/enums/EzEnum.js';

/**
    TODO: Re-factor so enumeration class extends from EzEnumeration2.js
    Defines the available primary ezClocker user account types.
    See also EzClockerAccountType.js for full list of account types.

    Import with:
        import { EzPrimaryAccountType } from '/ezlibrary/enums/EzPrimaryAccountType.js';
 */
export class EzPrimaryAccountType extends EzEnum {
    /**
        @public @static @readonly @property
        Access to the EzPrimaryAccountType array of 'keys' (enumeration property name/values)
        @returns {array}
     */
    static get ezKeys() {
        return [
            'UNKNOWN',
            'EMPLOYER',
            'EMPLOYEE',
            'PERSONAL'
        ];
    }

    /**
        @public @static @readonly @property
        Indicates the EzPrimaryAccountType is null or not yet set
        @returns {string}
     */
    static get UNKNOWN() {
        return EzPrimaryAccountType.ezKeys[0];
    }

    /**
        @public @static @readonly @property
        Represents an ezClocker Employer account type
        @returns {string}
     */
    static get EMPLOYER() {
        return EzPrimaryAccountType.ezKeys[1];
    }

    /**
        @public @static @readonly @property
        Represents an ezClocker Employee account type
        @returns {string}
     */
    static get EMPLOYEE() {
        return EzPrimaryAccountType.ezKeys[2];
    }

    /**
        @public @static @readonly @property
        Represents an ezClocker Personal (aka Individual) account type
        @returns {string}
     */
    static get PERSONAL() {
        return EzPrimaryAccountType.ezKeys[3];
    }

    /**
        @public @static @method
        Returns one of the enumeration's static property
        values if the provided enumValue matches supported property names.
        @param {string} enumValue
        @returns {string}
        A value of one of EzPrimaryAccountType's enumeration properties
     */
    static ezValueOf(enumValue) {
        return undefined !== enumValue && null !== enumValue && 'string' === typeof enumValue &&
            0 <= EzPrimaryAccountType.ezKeys.indexOf(enumValue.toUpperCase())
            ? EzPrimaryAccountType[enumValue]
            : EzPrimaryAccountType.UNKNOWN;
    }

    /**
        @public @constructor
     */
    constructor() {
        super();
    }
}


/**
    EzDataTagFilterType enumeration for use with EzDataMap records
    Import with:
        import { EzDataTagFilterType } from '/ezlibrary/enums/EzDataTagFilterType.js';
 */
export class EzDataTagFilterType {
    /**
        @public @static @readonly @property
        Returns an array of enumeration property names
        @returns {array}
     */
    static get ezNames() {
        return [
            'UNKNOWN',
            'ALL',
            'ACTIVE',
            'ARCHIVED',
            'DISABLED',
            'DELETED'
        ];
    }

    static get UNKNOWN() {
        return EzDataTagFilterType.ezNames[0];
    }

    static get ALL() {
        return EzDataTagFilterType.ezNames[1];
    }

    static get ACTIVE() {
        return EzDataTagFilterType.ezNames[2];
    }

    static get ARCHIVED() {
        return EzDataTagFilterType.ezNames[3];
    }

    static get DISABLED() {
        return EzDataTagFilterType.ezNames[4];
    }

    static get DELETED() {
        return EzDataTagFilterType.ezNames[5];
    }

    /**
        @public @static @method
        Obtains the enum property value that matches the provided enum property name. If a match is not found,
        UNKNOWN is returned.
        @param {string} enumName
        A valid enum property name.
        @returns {string}
     */
    static ezValueOf(enumName) {
        let index = EzDataTagFilterType.ezNames.indexOf(enumName.toUpperCase());

        return -1 != index
            ? EzDataTagFilterType[EzDataTagFilterType.ezNames[index]]
            : EzDataTagFilterType.UNKNOWN;
    }
}
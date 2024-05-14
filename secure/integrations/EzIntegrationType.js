/**
    Enumeration of integration types.
    Matches EzIntegrationType.java
    Import with:
        import { EzIntegrationType } from '/secure/integrations/EzIntegrationType.js';
 */
export class EzIntegrationType {
    static get ezValues() {
        return [
            "UNKNOWN",
            "TIME_ENTRY_EXPORT",
            "TIME_ENTRY_EXPORT_FILE"
        ];
    }

    /**
        @public @static @readonly @property
        Enumeration property UNKNOWN
        @returns {string}
     */
    static get UNKNOWN() {
        return EzIntegrationType.ezValues[0];
    }

    /**
        @public @static @readonly @property
        Enumeration property TIME_ENTRY_EXPORT
        @returns {string}
     */
    static get TIME_ENTRY_EXPORT() {
        return EzIntegrationType.ezValues[1];
    }

    /**
        @public @static @readonly @property
        Enumeration property TIME_ENTRY_EXPORT_FILE
        @returns {string}
     */
    static get TIME_ENTRY_EXPORT_FILE() {
        return EzIntegrationType.ezValues[2];
    }

    /**
        @public @static @method
        Evaulates the provided enumPropertyValue and if it matches a enumeration property value of this
        instance, then the enumeration property value is returned. If not match is found, the first enumeration property
        value is returned (normall UNKNOWN)
        @param {string} enumPropertyValue
        @returns {string}
     */
    static ezValueOf(enumPropertyValue) {
        let index = EzIntegrationType.ezValues.indexOf(enumPropertyValue.toUpperCase());

        return 0 >= index
            ? EzIntegrationType[EzIntegrationType.ezValues[index]]
            : EzIntegrationType.UNKNOWN;
    }
}

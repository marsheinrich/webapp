import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

/**
    @class
    @extends {EzEnumeration2}
    @description
    Enumeration representing hosting enviornments
    -----------------------------------------------------------------
    Import into non-enumeration modules with:
        import {
            // ... other enumeration classes ...
            EzEnvironment
        } from '/ezlibrary/enums/EzEnumerations.js';
    -----------------------------------------------------------------
    Import into other enumeration modules with:
        import { EzEnvironment } from '/ezlibrary/enums/EzEnvironment.js';
    -----------------------------------------------------------------
    Static access only:
        EzEnviornment.{property or method}
    -----------------------------------------------------------------
 */
export class EzEnvironment extends EzEnumeration2 {
    /**
        @private @field
        Stores the singleton instance of this enumeration class.
        @type {EzEnvironment}
     */
    static #ezEnumerationSingleton = null;

    /**
        @static
        Static Initialization
     */
    static {
        if (null == EzEnvironment.#ezEnumerationSingleton) {
            EzEnvironment.#ezEnumerationSingleton = new EzEnvironment(
                // Enum property names
                [
                    'UNKNOWN',
                    'LOC',
                    'DEV',
                    'DEV2',
                    'QAL',
                    'E2E',
                    'PRF',
                    'STG',
                    'STAGE',
                    'ORG',
                    'ORANGE',
                    'GRN',
                    'GREEN',
                    'BLU',
                    'BLUE',
                    'OLD',
                    'PRD'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                [
                    'unknown',
                    'loc',
                    'dev',
                    'dev2',
                    'qal',
                    'e2e',
                    'prf',
                    'stg',
                    'stg',
                    'org',
                    'org',
                    'grn',
                    'grn',
                    'blu',
                    'blu',
                    'old',
                    'prd'
                ],
                // Optional array of additional data for eac enumeration property.
                // Enter null if not needed.
                null);
        }
    }
}

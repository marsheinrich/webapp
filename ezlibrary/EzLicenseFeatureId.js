import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

/**
 * @class
 * @extends {EzEnumeration2}
 * @desciption
 * Defines Ids for license features
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *     import {
 *         < other enumeration classes ... >,
 *         EzLicenseFeatureId
 *     } from '/ezlibrary/enums/EzEnumerations.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Static Instance Name:
 *     EzLicenseFeatureId
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzLicenseFeatureId extends EzEnumeration2 {
    /**
     * @private @field
     * Stores the singleton instance of this enumeration class.
     * @type {EzLicenseFeatureId}
    */
    static #ezEnumerationSingleton = null;

    /**
     * @static
     * Static Initialization
     */
    static {
        if (null == EzLicenseFeatureId.#ezEnumerationSingleton) {
            EzLicenseFeatureId.#ezEnumerationSingleton = new EzLicenseFeatureId(
                // Enum property names
                [
                    'UNKNOWN',
                    'JOBS',
                    'OVERTIME',
                    'INTEGRATIONS',
                    'TIME_OFF'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                null,
                // Optional array of additional data for eac enumeration property.
                // Enter null if not needed.
                [
                    {
                        display: 'Unknown',
                        ezLicenseFeatureEnabled: true
                    },
                    {
                        display: 'Jobs',
                        ezLicenseFeatureEnabled: true
                    },
                    {
                        display: 'Overtime',
                        ezLicenseFeatureEnabled: true
                    },
                    {
                        display: 'Integrations',
                        ezLicenseFeatureEnabled: true
                    },
                    {
                        display: 'Time Off',
                        ezLicenseFeatureEnabled: true
                    }
                ]);
        }
    }

    /**
     * @static
     * @public @method
     * @param {string} enumValue
     * @returns {*}
     */
    static ezToLicenseFeatureEnabled(enumValue) {
        return EzLicenseFeatureId.ezEnumData(enumValue).ezLicenseFeatureEnabled;
    }
}

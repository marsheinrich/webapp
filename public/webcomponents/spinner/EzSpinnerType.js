import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

/**
 * @class
 * @extends {EzEnumeration2}
 * @description
 * The spinners available to display
 * ---------------------------------------------------------------------
 *     import { EzSpinnerType } from '/public/webcomponents/spinner/EzSpinnerType.js';
 * ---------------------------------------------------------------------
 */
export class EzSpinnerType extends EzEnumeration2 {
    /**
     * @private @field
     * Stores the singleton instance of this enumeration class.
     * @type {EzRegistrationState}
     */
    static #ezEnumerationSingleton = null;

    /**
     * @static
     * Static Initialization
     */
    static {
        if (null == EzSpinnerType.#ezEnumerationSingleton) {
            EzSpinnerType.#ezEnumerationSingleton = new EzSpinnerType(
                // Enum property names
                [
                    'UNKNOWN',
                    'GEAR_SVG',
                    'INFINITY_GIF',
                    'INFINITY_SNAKE_SVG',
                    'LINE_SPINNER_SVG',
                    'EZCLOCKER_GIF'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                null,
                // Optional array of additional data for eac enumeration property.
                // Enter null if not needed.
                [
                    // UNKNOWN
                    {
                        id: 'UNKNOWN',
                        display: 'Gear SVG',
                        type: 'gif',
                        assetUrl: '/public/webcomponents/spinner/assets/gear-172px.svg',
                        maxWidth: null,
                        minWidth: null,
                        width: '172',
                        height: '172',
                        canResize: true
                    },
                    // GEAR_SVG
                    {
                        id: 'GEAR_SVG',
                        display: 'Gear SVG',
                        type: 'gif',
                        assetUrl: '/public/webcomponents/spinner/assets/gear-172px.svg',
                        maxWidth: null,
                        minWidth: null,
                        width: '172',
                        height: '172',
                        canResize: true
                    },
                    // INFINITY_GIF
                    {
                        id: 'INFINITY_GIF',
                        display: 'Infinity SVG',
                        type: 'gif',
                        assetUrl: '/public/webcomponents/spinner/assets/infinity.gif',
                        maxWidth: '200',
                        minWidth: '92',
                        width: '200',
                        height: '92',
                        canResize: false
                    },
                    // INFINITY_SNAKE_SVG
                    {
                        id: 'INFINITY_SNAKE_SVG',
                        display: 'Infinity Snake SVG',
                        type: 'gif',
                        assetUrl: '/public/webcomponents/spinner/assets/infinity-snake-spinner-orange.svg',
                        maxWidth: null,
                        minWidth: null,
                        width: '200',
                        height: '92',
                        canResize: true
                    },
                    // LINE_SPINNER_SVG
                    {
                        id: 'LINE_SPINNER_SVG',
                        display: 'Line Spinner SVG',
                        type: 'gif',
                        assetUrl: '/public/webcomponents/spinner/assets/line-spinner-orange.svg',
                        maxWidth: null,
                        minWidth: null,
                        width: '100',
                        height: '100',
                        canResize: true
                    },
                    // EZCLOCKER_GIF
                    {
                        id: 'EZCLOCKER_GIF',
                        display: 'EzClocker GIF',
                        type: 'gif',
                        assetUrl: '/public/webcomponents/spinner/assets/ezclocker-172px.gif',
                        maxWidth: '100',
                        minWidth: '100',
                        width: '100',
                        height: '100',
                        canResize: false
                    }
                ]);
        }
    }

    /**
     * @static
     * @public @medthod
     * Returns the spinner configuration for the provided enumPropertyName
     * @param {string} enumPropertyNameOrValue
     * A valid enum property name or value from EzSpinnerType
     * @returns {object}
     */
    static ezSpinnerConfig(enumPropertyNameOrValue) {
        return this.ezEnumData(enumPropertyNameOrValue);
    }

    /**
     * @static
     * @public @medthod
     * Returns the full url of the spinner's image asset for the provided enumPropertyNameOrValue
     * @param {string} enumPropertyNameOrValue
     * A valid enum property name or value from EzSpinnerType
     * @returns {string}
     */
    static ezAssetUrl(enumPropertyNameOrValue) {
        return ezApi.ezclocker.ezNavigation.ezGetPublicPageUrl(
            this.ezEnumData(enumPropertyNameOrValue).assetUrl);
    }
}

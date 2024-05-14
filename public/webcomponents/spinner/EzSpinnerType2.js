/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ENGINEERING NOTES
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Do not import this class into EzEnumerations.js as it will cause a circular reference through EzSpinnerConfiguration.js
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

import { EzSpinnerConfiguration } from '/public/webcomponents/spinner/EzSpinnerConfiguration.js';

/**
    @class
    @extends {EzEnumeration2}
    @description
    The spinners available to display
    -----------------------------------------------------------------
    Import into enum classes with:
        import { EzSpinnerType2 } from '/public/webcomponents/spinner/EzSpinnerType2.js';
    -----------------------------------------------------------------
    Access static reference:
        Inside class: EzSpinnerType2.{method or property}
        Outside of class: EzSpinnerType2.{method or property}
    -----------------------------------------------------------------
 */
export class EzSpinnerType2 extends EzEnumeration2 {
    /**
        @private @field
        Stores the singleton instance of this enumeration class.
        @type {EzSpinnerType2}
     */
    static #ezEnumerationSingleton = null;

    /**
        @static
        Static Initialization
     */
    static {
        if (null == EzSpinnerType2.#ezEnumerationSingleton) {
            EzSpinnerType2.#ezEnumerationSingleton = new EzSpinnerType2(
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
                [
                    'UNKNOWN',
                    'GEAR_SVG',
                    'INFINITY',
                    'INFINITY_SNAKE_SVG',
                    'LINE_SPINNER',
                    'EZCLOCKER'
                ],
                // Optional array of additional data for eac enumeration property.
                // Enter null if not needed.
                [
                    new EzSpinnerConfiguration(
                        // id
                        'UNKNOWN',
                        // name
                        'Gear SVG',
                        // spinnerType = ''
                        'gif',
                        // spinnerImgUrl = ''
                        '/public/webcomponents/spinner/assets/gear-172px.svg',
                        // maxWidth = null
                        null,
                        // minWidth = null
                        null,
                        // width = 'auto'
                        '172',
                        // height = 'auto'
                        '172',
                        // resizeWithWindow = true
                        true,
                        // waitMessage = 'Please wait ...'
                        'Please wait ...'),
                    new EzSpinnerConfiguration(
                         'GEAR_SVG',
                         'Gear SVG',
                         'gif',
                         '/public/webcomponents/spinner/assets/gear-172px.svg',
                         null,
                         null,
                         '172',
                         '172'),
                    new EzSpinnerConfiguration(
                         'INFINITY',
                         'Infinity SVG',
                         'gif',
                         '/public/webcomponents/spinner/assets/infinity.gif',
                         '200',
                         '92',
                         '200',
                         '92',
                         false),
                    new EzSpinnerConfiguration(
                         'INFINITY_SNAKE_SVG',
                         'Infinity Snake SVG',
                         'gif',
                         '/public/webcomponents/spinner/assets/infinity-snake-spinner-orange.svg',
                         null,
                         null,
                         '200',
                         '92'),
                    new EzSpinnerConfiguration(
                         'LINE_SPINNER',
                         'Line Spinner SVG',
                         'gif',
                         '/public/webcomponents/spinner/assets/line-spinner-orange.svg',
                         null,
                         null,
                         '100',
                         '100'),
                    new EzSpinnerConfiguration(
                         'EZCLOCKER',
                         'EzClocker GIF',
                         'gif',
                         '/public/webcomponents/spinner/assets/ezclocker-172px.gif',
                         '100',
                         '100',
                         '100',
                         '100')
                ]);
        }
    }

    /**
        @static
        @public @medthod
        Returns the spinner configuration for the provided enumPropertyName
        @param {string} enumPropertyNameOrValue
        A valid enum property name or value from EzSpinnerType2
        @returns {EzSpinnerConfiguration}
     */
    static ezSpinnerConfig(enumPropertyNameOrValue) {
        return this.ezEnumData(enumPropertyNameOrValue);
    }

    /**
        @static
        @public @medthod
        Returns the full url of the spinner's image asset for the provided enumPropertyNameOrValue
        @param {string} enumPropertyNameOrValue
        A valid enum property name or value from EzSpinnerType2
        @returns {string}
     */
    static ezAssetUrl(enumPropertyNameOrValue) {
        return ezApi.ezclocker.ezNavigation.ezGetPublicPageUrl(
            this.ezEnumData(enumPropertyNameOrValue).assetUrl);
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

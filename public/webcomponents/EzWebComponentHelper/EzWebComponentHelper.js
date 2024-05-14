import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzFloat,
    EzString,
    EzArray,
    EzUrl,
    EzHtml,
    EzFunction,
    EzJson,
    EzConsole,
    EzAsync,
    EzPromise,
    EzDocument
} from '/ezlibrary/helpers/EzHelpers.js';


/**
 * @class
 * @description
 * Constants and utility functions for web components.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *  import { EzWebComponentHelper } from '/public/webcomponents/EzWebComponentHelper/EzWebComponentHelper.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzWebComponentHelper {
    /**
     * @public @readonly @property
     * Gets sizing value: 'auto'
     * @returns {string}
     */
    static get auto() {
        return 'auto';
    }

    /**
     * @public @readonly @property
     * Gets units indicator: 'rem'
     * @returns {string}
     */
    static get rem() {
        return 'rem';
    }
    /**
     * @public @method
     * Appends units indicator 'rem' to the provided value and returns the resulting string
     * rem = Relative to font-size of the root element
     * @param {string|number} aValue
     * @returns {string}
     */
    static asRem(aValue) {
        if (!aValue) {
            throw new EzBadParamException(
                'aValue',
                EzWebComponentHelper,
                EzWebComponentHelper.asRem);
        }

        return `${aValue.toString()}${EzWebComponentHelper.rem}`;
    }

    /**
     * @public @readonly @property
     * Gets units indicator: 'vmin'
     * @returns {string}
     */
    static get vmin() {
        return 'vmin';
    }
    /**
     * @public @method
     * Appends units indicator 'vmin' to the provided value and returns the resulting string
     * vmin = Relative to 1% of viewport's smaller dimension
     * Viewport = the browser window size. If the viewport is 50cm wide, 1vw = 0.5cm.
     * @param {string|number} aValue
     * @returns {string}
     */
    static asVMIN(aValue) {
        if (!aValue) {
            throw new EzBadParamException(
                'aValue',
                EzWebComponentHelper,
                EzWebComponentHelper.asRem);
        }

        return `${aValue.toString()}${EzWebComponentHelper.vmin}`;
    }

    /**
     * @public @readonly @property
     * Gets units indicator: 'vmax'
     * @returns {string}
     */
    static get vmax() {
        return 'vmax';
    }
    /**
     * @public @method
     * Appends units indicator 'vmax' to the provided value and returns the resulting string
     * vmax = Relative to 1% of viewport's larger dimension
     * Viewport = the browser window size. If the viewport is 50cm wide, 1vw = 0.5cm.
     * @param {string|number} aValue
     * @returns {string}
     */
    static asVMAX(aValue) {
        if (!aValue) {
            throw new EzBadParamException(
                'aValue',
                EzWebComponentHelper,
                EzWebComponentHelper.asRem);
        }

        return `${aValue.toString()}${EzWebComponentHelper.vmax}`;
    }

    /**
     * @public @readonly @property
     * Gets units indicator: 'px'
     * px = pixels (1px = 1/96th of 1in)
     * Pixels (px) are relative to the viewing device. For low-dpi devices, 1px is one device pixel (dot) of the display.
     * For printers and high resolution screens 1px implies multiple device pixels.
     * @returns {string}
     */
    static get px() {
        return 'px';
    }
    /**
     * @public @method
     * Appends units indicator 'px' to the provided value and returns the resulting string
     * @param {string|number} aValue
     * @returns {string}
     */
    static asPX(aValue) {
        if (!aValue) {
            throw new EzBadParamException(
                'aValue',
                EzWebComponentHelper,
                EzWebComponentHelper.asRem);
        }

        return `${aValue.toString()}${EzWebComponentHelper.px}`;
    }

    /**
     * @public @readonly @property
     * Gets units indicator: 'cm'
     * @returns {string}
     */
    static get cm() {
        return 'cm';
    }
    /**
     * @public @method
     * Appends units indicator 'cm' to the provided value and returns the resulting string
     * cm = centimeters
     * @param {string|number} aValue
     * @returns {string}
     */
    static asCM(aValue) {
        if (!aValue) {
            throw new EzBadParamException(
                'aValue',
                EzWebComponentHelper,
                EzWebComponentHelper.asRem);
        }

        return `${aValue.toString()}${EzWebComponentHelper.cm}`;
    }

    /**
     * @public @readonly @property
     * Gets units indicator: 'mm'
     * mm = millimeters
     * @returns {string}
     */
    static get mm() {
        return 'mm';
    }
    /**
     * @public @method
     * Appends units indicator 'mm' to the provided value and returns the resulting string
     * @param {string|number} aValue
     * @returns {string}
     */
    static asMM(aValue) {
        if (!aValue) {
            throw new EzBadParamException(
                'aValue',
                EzWebComponentHelper,
                EzWebComponentHelper.asRem);
        }

        return `${aValue.toString()}${EzWebComponentHelper.mm}`;
    }

    /**
     * @public @readonly @property
     * Gets units indicator: 'in'
     * @param {string|number} aValue
     * @returns {string}
     */
    static get in() {
        return 'in';
    }
    /**
     * @public @method
     * Appends units indicator 'in' to the provided value and returns the resulting string
     * in = inches (1in = 96px = 2.54cm)
     * @param {string|number} aValue
     * @returns {string}
     */
    static asIN(aValue) {
        if (!aValue) {
            throw new EzBadParamException(
                'aValue',
                EzWebComponentHelper,
                EzWebComponentHelper.asRem);
        }

        return `${aValue}${EzWebComponentHelper.in}`;
    }

    /**
     * @public @readonly @property
     * Gets unit indicator: 'pt'
     * @returns {string}
     */
    static get pt() {
        return 'pt';
    }
    /**
     * @public @method
     * Appends units indicator 'pt' to the provided value and returns the resulting string
     * pt = points (1pt = 1/72 of 1in)
     * @param {string|number} aValue
     * @returns {string}
     */
    static asPT(aValue) {
        if (!aValue) {
            throw new EzBadParamException(
                'aValue',
                EzWebComponentHelper,
                EzWebComponentHelper.asRem);
        }

        return `${aValue.toString()}${EzWebComponentHelper.pt}`;
    }

    /**
     * @public @readonly @property
     * Gets unit indicator: 'pc'
     * pc = picas (1pc = 12 pt)
     * @returns {string}
     */
    static get pc() {
        return 'pc';
    }
    /**
     * @public @method
     * Appends units indicator 'pc' to the provided value and returns the resulting string
     * @param {string|number} aValue
     * @returns {string}
     */
    static asPC(aValue) {
        if (!aValue) {
            throw new EzBadParamException(
                'aValue',
                EzWebComponentHelper,
                EzWebComponentHelper.asRem);
        }

        return `${aValue.toString()}${EzWebComponentHelper.pc}`;
    }

    /**
     * @public @readonly @property
     * Gets unit indicator: 'em'
     * @returns {string}
     */
    static get em() {
        return 'em';
    }
    /**
     * @public @method
     * Appends units indicator 'em' to the provided value and returns the resulting string
     * em = Relative to the font-size of the element (2em means 2 times the size of the current font)
     * @param {string|number} aValue
     * @returns {string}
     */
    static asEM(aValue) {
        if (!aValue) {
            throw new EzBadParamException(
                'aValue',
                EzWebComponentHelper,
                EzWebComponentHelper.asRem);
        }

        return `${aValue.toString()}${EzWebComponentHelper.em}`;
    }

    /**
     * @public @readonly @property
     * Gets unit indicator: 'ex'
     * @returns {string}
     */
    static get ex() {
        return 'ex';
    }
    /**
     * @public @method
     * Appends units indicator 'ex' to the provided value and returns the resulting string
     * ex = Relative to the x-height of the current font (rarely used)
     * @param {string|number} aValue
     * @returns {string}
     */
    static asEX(aValue) {
        if (!aValue) {
            throw new EzBadParamException(
                'aValue',
                EzWebComponentHelper,
                EzWebComponentHelper.asRem);
        }

        return `${aValue.toString()}${EzWebComponentHelper.ex}`;
    }

    /**
     * @public @readonly @property
     * Gets unit indicator: 'ch'
     * @returns {string}
     */
    static get ch() {
        return 'ch';
    }
    /**
     * @public @method
     * Appends units indicator 'ch' to the provided value and returns the resulting string
     * ch = Relative to the width of the "0" (zero)
     * @param {string|number} aValue
     * @returns {string}
     */
    static asCH(aValue) {
        if (!aValue) {
            throw new EzBadParamException(
                'aValue',
                EzWebComponentHelper,
                EzWebComponentHelper.asRem);
        }

        return `${aValue.toString()}${EzWebComponentHelper.ch}`;
    }

    /**
     * @public @readonly @property
     * Gets unit indicator: 'vw'
     * @returns {string}
     */
    static get vw() {
        return 'vw';
    }
    /**
     * @public @method
     * Appends units indicator 'vw' to the provided value and returns the resulting string
     * vw = Relative to 1% of the width of the viewport
     * Viewport = the browser window size. If the viewport is 50cm wide, 1vw = 0.5cm.
     * @param {string|number} aValue
     * @returns {string}
     */
    static asVW(aValue) {
        if (!aValue) {
            throw new EzBadParamException(
                'aValue',
                EzWebComponentHelper,
                EzWebComponentHelper.asRem);
        }

        return `${aValue.toString()}${EzWebComponentHelper.vw}`;
    }

    /**
     * @public @readonly @property
     * Gets unit indicator: 'vh'
     * @returns {string}
     */
    static get vh() {
        return 'vh';
    }
    /**
     * @public @method
     * Appends units indicator 'vh' to the provided value and returns the resulting string
     * vh = Relative to 1% of the height of the viewport
     * Viewport = the browser window size. If the viewport is 50cm wide, 1vw = 0.5cm.
     * @param {string|number} aValue
     * @returns {string}
     */
    static asVH(aValue) {
        if (!aValue) {
            throw new EzBadParamException(
                'aValue',
                EzWebComponentHelper,
                EzWebComponentHelper.asRem);
        }

        return `${aValue.toString()}${EzWebComponentHelper.vh}`;
    }

    /**
     * @static
     * @public @method
     * Validates the provided widthHeight value and if a valid widthHeight value, returns the widthHeight value.
     * Otherwise, returns the defaultWidthHeight value.
     * @param {undefined|null|number|string} widthHeight
     * @param {number|string} defaultWidthHeight
     * Default: EzWebComponentHelper.AUTO
     */
    static valueInUnitsOrDefault(widthHeight, defaultWidthHeight = EzWebComponentHelper.AUTO) {
        if (!EzObject.isValid(widthHeight)) {
            return defaultWidthHeight;
        }

        if (EzString.isString(widthHeight)) {
            let wh = widthHeight
                .trim()
                .replaceAll(' ', '')
                .toLowerCase();

            switch (wh) {
                case EzWebComponentHelper.AUTO:
                    return EzWebComponentHelper.AUTO;
                case EzWebComponentHelper.FULL:
                    return EzWebComponentHelper.FULL;
            }

            let startsWidth = wh.substring(0, wh.length - 2);

            if (isNaN(parseFloat(startsWidth))) {
                return defaultWidthHeight;
            }

            if (wh.endsWith('%') ||
                // Relative to font-size of the root element
                // The rem units are practical in creating perfectly scalable layout!
                wh.endsWith('rem') ||
                // Relative to 1% of viewport's* smaller dimension
                // Viewport = the browser window size. If the viewport is 50cm wide, 1vw = 0.5cm.
                wh.endsWith('vmin') ||
                // Relative to 1% of viewport's* larger dimension
                // Viewport = the browser window size. If the viewport is 50cm wide, 1vw = 0.5cm.
                wh.endsWith('vmax')) {
                return wh;
            }

            let endsWith = wh.substring(wh.length - 2);

            switch (endsWith) {
                /**
                 * Pixels (1px = 1/96th of 1in)
                 */
                case 'px':
                /**
                 * Centimeters
                 */
                case 'cm':
                /**
                 * Millimeters
                 */
                case 'mm':
                /**
                 * Inches (1in = 96px = 2.54cm)
                 */
                case 'in':
                /**
                 * Points (1pt = 1/72 of 1in)
                 */
                case 'pt':
                /**
                 * Picas (1pc = 12 pt)
                 */
                case 'pc':
                /*
                 * Relative to the font-size of the element (2em means 2 times the size of the current font)
                 * The em units are practical in creating perfectly scalable layout!
                 */
                case 'em':
                /*
                 * Relative to the x-height of the current font (rarely used)
                 */
                case 'ex':
                /*
                 * Relative to the width of the "0" (zero)
                 */
                case 'ch':
                /*
                 * Relative to 1% of the width of the viewport
                 * Viewport = the browser window size. If the viewport is 50cm wide, 1vw = 0.5cm.
                 */
                case 'vw':
                /*
                 * Relative to 1% of the height of the viewport
                 * Viewport = the browser window size. If the viewport is 50cm wide, 1vw = 0.5cm.
                 */
                case 'vh':
                    return wh;
            }
        }

        return EzNumber.isNumber(widthHeight)
            ? `${widthHeight}px`
            : defaultWidthHeight;
    }
}
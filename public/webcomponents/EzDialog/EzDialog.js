import {
    EzBadParamException,
} from '/ezlibrary/exceptions/EzExceptions.js';

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

import { EzWebComponentHelper } from '/public/webcomponents/EzWebComponentHelper/EzWebComponentHelper.js';

/**
 * @class
 * @description
 * EzDialog's configuration instance
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *  import {
 *      EzDialogConfiguration,
 *      EzDialog
 *  } from '/public/webcomponents/EzDialog/EzDialog.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzDialogConfiguration {
    /**
     * @private @field
     * Stores the dialog's title
     * @type {string}
     */
    #title = 'EzClocker';
    /**
     * @public @property @getter
     * Gets the dialog's title
     * @returns {string}
     */
    get title() {
        return this.#title;
    }
    /**
     * @public @property @setter
     * Sets the dialog's title
     * @param {string} title
     */
    set title(title) {
        this.#title = EzString.stringOrDefault(title, 'EzClocker');
    }

    /**
     * @private @field
     * Stores if the dialog should have the X close button in the title bar.
     * @type {boolean}
     */
    #xClose = true;
    /**
     * @public @property @getter
     * Gets if the dialog should have the X close button in the title bar.
     * @returns {boolean}
     */
    get xClose() {
        return this.#xClose;
    }
    /**
     * @public @property @setter
     * Sets if the dialog should have the X close button in the title bar.
     * @param {boolean} xClose
     */
    set xClose(xClose) {
        this.#xClose = EzBoolean.booleanOrFalse(xClose);
    }

    /**
     * @private @field
     * Stores if the dialog is resizeable or not
     * @type {boolean}
     */
    #resizeable = false;
    /**
     * @public @property @getter
     * Gets if the dialog is resizeable or not
     * @returns {boolean}
     */
    get resizeable() {
        return this.#resizeable;
    }
    /**
     * @public @property @setter
     * Sets if the dialog is resizeable or not
     * @param {boolean} resizeable
     */
    set resizeable(resizeable) {
        this.#resizeable = EzBoolean.booleanOrFalse(resizeable);
    }

    /**
     * @private @field
     * Stores the dialog's width value.
     * A number is assumed in pixel units.
     * @type {number|string}
     */
    #width = 'auto';
    /**
     * @public @property @getter
     * Gets the dialog's width value.
     * @returns {number|string}
     */
    get width() {
        return this.#width;
    }
    /**
     * @public @property @setter
     * Sets the dialog's width value.
     * @param {number|string} width
     */
    set width(width) {
        this.#width = EzObject.assignOrDefault(width, 'auto');
    }

    /**
     * @private @field
     * Stores the dialog's height value.
     * A number is assumed in pixel units.
     * @type {number|string}
     */
    #height = 'auto';
    /**
     * @public @property @getter
     * Gets the dialog's height value.
     * @returns {number|string}
     */
    get height() {
        return this.#height;
    }
    /**
     * @public @property @setter
     * Sets the dialog's height value.
     * @param {number|string} height
     */
    set height(height) {
        this.#height = EzNumber.isNumber(height)
            ? `${height.toString}px`
            : EzWebComponentHelper.EzObject.assignOrDefault(height, 'auto');
    }

    /**
     * @private @field
     * Stores the initial position position of the dialog when shown
     * Default: 'center'
     * @type {string}
     */
    #initPositionX = 'center';
    /**
     * @public @property @getter
     * Gets the initial X position position of the dialog when shown
     * @returns {number|string}
     */
    get initPositionX() {
        return this.#initPositionX;
    }
    /**
     * @public @property @setter
     * Sets the initial position position of the dialog when shown
     * @param {number|string} positionX
     * Acceptable values: 'left', 'center', 'right', or a number representing absolute position within the document (assumed as pixels)
     * Default: 'center'
     */
    set initPositionX(initPositionX = 'center') {
        this.#initPositionX = EzWebComponentHelper.valueInUnitsOrDefault(initPositionX, 'center');
    }

    /**
     * @private @field
     * Stores the initial Y position of the dialog when shown
     * Acceptable values: 'top', 'center', 'bottom', or a number representing absolute position within the document (assumed as pixels)
     * Default: 'center'
     * @type {string}
     */
    #initPositionY = 'center';
    /**
     * @public @property @getter
     * Gets the initial Y position of the dialog when shown
     * @returns {number|string}
     */
    get initPositionY() {
        return this.#initPositionY;
    }
    /**
     * @public @property @setter
     * Sets the initial Y position of the dialog when shown
     * @param {number|string} initPositionY
     * Acceptable values: 'top', 'center', 'bottom', or a number representing absolute position within the document (assumed as pixels)
     * Default: 'center'
     */
    set initPositionY(initPositionY = 'center') {
        this.#initPositionY = EzWebComponentHelper.valueInUnitsOrDefault(initPositionY, 'center');
    }

    /**
     * @private @field
     * Stores the animation class (from animate.css) to use when showing the dialog.
     * @type {string}
     * A valid class from animate.css (https://animate.style)
     */
    #showAnimation = 'animate__fadeInDown'
    /**
     * @public @property @getter
     * Gets the animation class (from animate.css) to use when showing the dialog.
     * @returns {string}
     */
    get showAnimation() {
        return this.#showAnimation;
    }
    /**
     * @public @property @setter
     * Sets the animation class (from animate.css) to use when showing the dialog.
     * @param {string} showAnimation
     * A valid class from animate.css (https://animate.style)
     */
    set showAnimation(showAnimation) {
        this.#showAnimation = EzString.stringOrDefault(showAnimation, 'animate__fadeInDown');
    }

    /**
     * @private @field
     * Stores the animation class (from animate.css) to use when closing the dialog.
     * @type {string}
     * A valid class from animate.css (https://animate.style)
     */
    #closeAnimation = 'animate__fadeOutUp';
    /**
     * @public @property @getter
     * Gets the animation class (from animate.css) to use when closing the dialog.
     * @returns {string}
     */
    get closeAnimation() {
        return this.#closeAnimation;
    }
    /**
     * @public @property @setter
     * Sets the animation class (from animate.css) to use when closing the dialog.
     * @param {string} closeAnimation
     * A valid class from animate.css (https://animate.style)
     */
    set closeAnimation(closeAnimation) {
        this.#closeAnimation = EzString.stringOrDefault(closeAnimation, 'animate__fadeOutUp');
    }

    /**
     * @private @field
     * Stores if the dialog should close when the escape key is pressed.
     * @type {boolean}
     * Default: true
     */
    #closeOnEscape = true;
    /**
     * @public @property @getter
     * Gets if the dialog should close when the escape key is pressed.
     * @returns {boolean}
     */
    get closeOnEscape() {
        return this.#closeOnEscape;
    }
    /**
     * @public @property @setter
     * Sets if the dialog should close when the escape key is pressed.
     * @param {boolean} closeOnEscape
     * Default: true
     */
    set closeOnEscape(closeOnEscape = true) {
        this.#closeOnEscape = EzBoolean.booleanOrTrue(closeOnEscape);
    }

    /**
     * @private @field
     * Stores if the dialog is visible or not
     * @type {boolean}
     * Default: false
     */
    #visible = false;
    /**
     * @public @property @getter
     * Gets if the dialog is visible or not
     * @returns {boolean}
     */
    get visible() {
        return this.#visible;
    }
    /**
     * @public @property @setter
     * Sets if the dialog is visible or not
     * @param {boolean} visible
     * Default: false
     */
    set visible(visible = false) {
        this.#visible = EzBoolean.booleanOrFalse(visible);
    }

    /**
     * @private @field
     * Stores the innerhtml content for the dialog
     * @type {boolean}
     * Default: false
     */
    #content = EzString.EMPTY;
    /**
     * @public @property @getter
     * Gets the innerhtml content for the dialog
     * @returns {boolean}
     */
    get content() {
        return this.#content;
    }
    /**
     * @public @property @setter
     * Sets the innerhtml content for the dialog
     * @param {boolean} content
     * Default: false
     */
    set visicontentble(content = EzString.EMPTY) {
        this.#content = EzString.stringOrEmpty(content);
    }
}

/**
 * @class
 * @description
 * A generic UX dialog
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *  import {
 *      EzDialogConfiguration,
 *      EzDialog
 *  } from '/public/webcomponents/EzDialog/EzDialog.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzDialog {
    constructor(ezDialogConfiguration) {
        if (!ezDialogConfiguration) {
            ezDialogConfiguration = new EzDialogConfiguration();
        }

        this.#ezDialogConfiguration = ezDialogConfiguration;
    }

    /**
     * @private @field
     * Stores the dialog's EzDialogConfiguration instance.
     * @type {EzDialogConfiguration}
     */
    #ezDialogConfiguration;
    /**
     * @public @proeprty @getter
     * Gets
     * @returns {EzDialogConfiguration}
     */
    get ezDialogConfiguration() {
        return this.#ezDialogConfiguration;
    }
    /**
     * @public @property @setter
     * Sets
     * @param {EzDialogConfiguration} ezDialogConfiguration
     */
    set ezDialogConfiguration(ezDialogConfiguration) {
        this.#ezDialogConfiguration = EzObject.assignOrDefault(
            ezDialogConfiguration,
            new EzDialogConfiguration());
    }
    
    ezShow() {
        ezApi.ezclocker.ezUi.ez
    }
    
    ezClose() {
        
    }
    
    ezSubmit() {
        
    }
}
import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzJSONSerializable } from '/ezlibrary/entities/EzJSONSerializable.js';

import { EzObject } from '/ezlibrary/helpers/EzObject.js';
import { EzNumber } from '/ezlibrary/helpers/EzNumber.js';

/**
    @class
    @extends {EzJSONSerializable}
    @description
    Stores information about an HTML element's top, right, bottom, and left values.
    ---------------------------------------------------------------------------
    Import with:
        import { EzDomRect } from '/ezlibrary/ux/EzDomRect.js';
    ---------------------------------------------------------------------------
 */
export class EzDomRect extends EzJSONSerializable {
    /**
        @public @constructor
        Creates anew instance of EzElementRect
        @param {undefined|null|DOMRect} optionalDOMRect
        @param {undefined|null|number} top
        @param {undefined|null|number} right
        @param {undefined|null|number} bottom
        @param {undefined|null|number} left
        @param {undefined|null|number} height
        @param {undefined|null|number} width
        @param {undefined|null|number} x
        @param {undefined|null|number} y
     */
    constructor(domRect, top, right, bottom, left, height, width, x, y) {
        super();

        if (EzObject.isValid(domRect)) {
            this.ezLoadFromDOMRect(domRect);
        }

        if (EzNumber.isNumber(top)) {
            this.ezTop = top;
        }

        if (EzNumber.isNumber(right)) {
            this.ezRight = right;
        }

        if (EzNumber.isNumber(bottom)) {
            this.ezBottom = bottom;
        }

        if (EzNumber.isNumber(left)) {
            this.ezLeft = left;
        }

        if (EzNumber.isNumber(height)) {
            this.ezHeight = height;
        }

        if (EzNumber.isNumber(width)) {
            this.ezWidth = width;
        }

        if (EzNumber.isNumber(x)) {
            this.ezX = x;
        }

        if (EzNumber.isNumber(y)) {
            this.ezY = y;
        }
    }

    /**
        @private @field
        Stores the top position
        @type {number}
     */
    #ezTop = NaN;

    /**
        @public @property @getter
        Gets the top position
        @returns {number}
     */
    get ezTop() {
        return this.#ezTop;
    }

    /**
        @public @property @setter
        Sets the top position
        @param {number} bottom
     */
    set ezTop(top) {
        this.#ezTop = EzNumber.numberOrNaN(top);
    }

    /**
        @private @field
        Stores the left position
        @type {number}
     */
    #ezLeft = NaN;

    /**
        @public @property @getter
        Gets the left position
        @returns {number}
     */
    get ezLeft() {
        return this.#ezLeft;
    }

    /**
        @public @property @setter
        Sets the left position
        @param {number} left
     */
    set ezLeft(left) {
        this.#ezLeft = EzNumber.numberOrNaN(left);
    }

    /**
        @private @field
        Stores the right position
        @type {number}
     */
    #ezRight = NaN;

    /**
        @public @property @getter
        Gets the right position
        @returns {number}
     */
    get ezRight() {
        return this.#ezRight;
    }

    /**
        @public @property @setter
        Sets the right position
        @param {number} right
     */
    set ezRight(right) {
        this.#ezRight = EzNumber.numberOrNaN(right);
    }

    /**
        @private @field
        Stores the bottom position
        @type {number}
     */
    #ezBottom = NaN;

    /**
        @public @property @getter
        Gets the bottom position
        @returns {number}
     */
    get ezBottom() {
        return this.#ezBottom;
    }

    /**
        @public @property @setter
        Sets the bottom position
        @param {number} bottom
     */
    set ezBottom(bottom) {
        this.#ezBottom = EzNumber.numberOrNaN(bottom);
    }

    /**
        @private @field
        Stores the height position
        @type {number}
     */
    #ezHeight = NaN;

    /**
        @public @property @getter
        Gets the height position
        @returns {height}
     */
    get ezHeight() {
        return this.#ezHeight;
    }

    /**
        @public @property @setter
        Sets the height
        @param {number} bottom
     */
    set ezHeight(height) {
        this.#ezHeight = EzNumber.numberOrNaN(height);
    }

    /**
        @private @field
        Stores the width
        @type {number}
     */
    #ezWidth = NaN;

    /**
        @public @property @getter
        Gets the width position
        @returns {number}
     */
    get ezWidth() {
        return this.#ezWidth;
    }

    /**
        @public @property @setter
        Sets the width position
        @param {number} width
     */
    set ezWidth(width) {
        this.#ezWidth = EzNumber.numberOrNaN(width);
    }

    /**
        @private @field
        Stores the x position
        @type {number}
     */
    #ezX = NaN;

    /**
        @public @property @getter
        Gets the x position
        @returns {number}
     */
    get ezBottom() {
        return this.#ezX;
    }

    /**
        @public @property @setter
        Sets the x position
        @param {number} x
     */
    set ezBottom(x) {
        this.#ezX = EzNumber.numberOrNaN(x);
    }

    /**
        @private @field
        Stores the y position
        @type {number}
     */
    #ezY = NaN;

    /**
        @public @property @getter
        Gets the y position
        @returns {number}
     */
    get ezY() {
        return this.#ezY;
    }

    /**
        @public @property @setter
        Sets the y position
        @param {number} y
     */
    set ezY(y) {
        this.#ezY = EzNumber.numberOrNaN(y);
    }

    /**
        @public @method
        Resets all the values to NaN
     */
    ezClearValues() {
        this.ezTop = NaN;
        this.ezRight = NaN;
        this.ezBottom = NaN;
        this.ezLeft = NaN;
        this.ezHeight = NaN;
        this.ezWidth = NaN;
        this.ezX = NaN;
        this.ezY = NaN;
        this.ezDOMRect = null;
    }

    /**
        @public @method
        Loads the values from the provided DOMRect
        @param {DOMRect} domRect
     */
    ezLoadFromDOMRect(domRect) {
        if (!EzObject.isValid(domRect)) {
            throw new EzBadParamException(
                'elementOrId',
                this,
                this.ezLoadFromDOMRect);
        }

        this.ezTop = domRect.top;
        this.ezRight = domRect.right;
        this.ezBottom = domRect.bottom;
        this.ezLeft = domRect.left;
        this.ezHeight = domRect.height;
        this.ezWidth = domRect.width;
        this.ezX = domRect.x;
        this.ezY = domRect.y;
        this.ezDOMRect = domRect;
    }

    /**
        @override
        @public @readonly @property
        Gets an array of JSON property names. This array is used
        to determine what properties should serialize to JSON when
        accessing properties asJSONObject or asJSON or method ezToJSON()
        @returns {array}
    */
    get ezJSONProps() {
        return [
            'ezBottom',
            'ezHeight',
            'ezLeft',
            'ezRight',
            'ezTop',
            'ezWidth',
            'ezX',
            'ezY',
            'ezDOMRect'
        ];
    }

    /**
        @override
        @public @readonly @property
        Returns this instance as a JSON Object (will no longer have the getter/setter methods).
        Useful for serailization to JSON.
        @returns {object}
     */
    get asJSONObject() {
        return {
            ezBottom: this.ezBottom,
            ezHeight: this.ezHeight,
            ezLeft: this.ezLeft,
            ezRight: this.ezRight,
            ezTop: this.ezTop,
            ezWidth: this.ezWidth,
            ezX: this.ezX,
            ezY: this.ezY,
            ezDOMRect: this.ezDOMRect
        }
    }

    /**
        @override
        @public @readonly @property
        Returns this instance as JSON string (no formatting)
        @returns {String}
    */
    get asJSON() {
        return super.asJSON;
    }

    /**
        @override
        @public @method
        Converts this instance into a JSON string with optional formatting.
        @param {undefined|null|Number} indentValue
        @param {undefined|null|Boolean} htmlDisplay
        @returns {String}
    */
    ezToJSON(indentValue, htmlDisplay) {
        return super.ezToJSON(indentValue, htmlDisplay);
    }

    /**
        @override
        @public @method
        Copies properties from the provided jsonObject to this instance (even if this instance does not define the property)
        @param {Object} jsonObject
        @returns {Object}
        Returns this instance with the key & values from the provided jsonObject.
    */
    ezFromJSONObject(jsonObject) {
        return super.ezFromJSONObject(jsonObject);
    }

    /**
        @override
        @public @method
        Converts the provided jsonString to a JSON object and then
        passes that object to ezFromJSONObject() to copies properties to this instance
        (even if this instance does not define the property)
        @param {String} jsonString
        @returns {Object}
        Returns this instance with the key & values from the provided json string.
    */
    ezLoadFromJson(jsonString) {
        return super.ezLoadFromJson(jsonString);
    }
}

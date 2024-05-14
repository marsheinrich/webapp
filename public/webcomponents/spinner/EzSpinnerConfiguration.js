/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ENGINEERING NOTES
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Do not import the following enumeration class into this class:
        import { EzSpinnerType } from '/public/webcomponents/spinner/EzSpinnerType.js';
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    // Comment out or remove the helpers you do not use
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzHtml,
    EzDocument
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzElementEventName
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzJSONSerializable } from '/ezlibrary/entities/EzJSONSerializable.js';

/**
    @class
    @extends {EzJSONSerializable}
    @description
    Represents the configuration for an EzSpinner
    -----------------------------------------------------------------
    Import with:
        import { EzSpinnerConfiguration } from '/public/webcomponents/spinner/EzSpinnerConfiguration.js';
    -----------------------------------------------------------------
 */
export class EzSpinnerConfiguration extends EzJSONSerializable {
    /**
        @public @constructor
        Creates a new instance of EzSpinnerConfiguration
     */
    constructor(
        id,
        name,
        spinnerType = '',
        spinnerImgUrl = '',
        maxWidth = null,
        minWidth = null,
        width = 'auto',
        height = 'auto',
        resizeWithWindow = true,
        waitMessage = 'Please wait ...') {
        super();

        if (!EzString.stringHasLength(id)) {
            throw new EzBadParamException(
                'id',
                this,
                this.constructor);
        }
        if (!EzString.stringHasLength(name)) {
            throw new EzBadParamException(
                'name',
                this,
                this.constructor);
        }

        this.ezId = id;

        this.ezName = name;

        this.ezSpinnerType = spinnerType;

        this.ezSpinnerImgUrl = spinnerImgUrl;

        this.ezMaxWidth = maxWidth;

        this.ezMinWidth = minWidth;

        this.ezWidth = width;

        this.ezHeight = height;

        this.ezResizeWithWindow = resizeWithWindow;

        this.ezWaitMessage = waitMessage;
    }

    /**
        @private @field
        Stores the element id for the spinner
        @type {string}
     */
    #ezId = 'UNKNOWN';
    /**
        @public @property @getter
        Gets the element id for the spinner
        @returns {string}
     */
    get ezId() {
        return this.#ezId;
    }
    /**
        @public @property @getter
        Sets the element id for the spinner
        @param {string} ezId
     */
    set ezId(ezId) {
        if (!EzString.stringHasLength(ezId)) {
            throw new EzBadParamException(
                'ezId',
                this,
                'ezId(ezId) (setter)');
        }

        this.#ezId = ezId;
    }

    /**
        @private @field
        Stores the parent container id or global element name the spinner will get injected into
        when visible.
        @type {string}
        A valid HTML id or the element name 'body'
     */
    #ezParentContainerId = 'body';
    /**
        @public @property @getter
        Gets the parent container id or global element name the spinner will get injected into
        when visible.
        @returns {string}
     */
    get ezParentContainerId() {
        return this.#ezParentContainerId;
    }
    /**
        @public @property @getter
        Sets the parent container id or global element name the spinner will get injected into
        when visible.
        @param {string} ezSpinnerType
        Default: 'body'
     */
    set ezParentContainerId(ezParentContainerId) {
        this.#ezParentContainerId = EzString.stringOrDefault(
            ezParentContainerId,
            'body');
    }

    /**
        @private @field
        Stores the name of the spinner
        @type {string}
     */
    #ezName = 'Gear SVG';
    /**
        @public @property @getter
        Gets the name of the spinner
        @returns {string}
     */
    get ezName() {
        return this.#ezName;
    }
    /**
        @public @property @getter
        Sets the name of the spinner
        @param {string} ezName
     */
    set ezName(ezName) {
        if (!EzString.stringHasLength(ezName)) {
            throw new EzBadParamException(
                'ezName',
                this,
                'ezName(ezIezName) (setter)');
        }

        this.#ezName = ezName;
    }

    /**
        @private @field
        Stores the spinner's image type (if any)
        @type {string}
        Acceptable values: EzString.EMPTY, 'gif', 'svg'
     */
    #ezSpinnerType = EzString.EMPTY;
    /**
        @public @property @getter
        Gets the spinner's image type (if any)
        @returns {string}
        Possible values: EzString.EMPTY, 'gif', 'svg'
     */
    get ezSpinnerType() {
        return this.#ezSpinnerType;
    }
    /**
        @public @property @getter
        Sets the spinner's image type (if any)
        @param {string} ezSpinnerType
        Acceptable values: EzString.EMPTY, 'gif', 'svg'
        Default: EzString.EMPTY
     */
    set ezSpinnerType(ezSpinnerType) {
        ezSpinnerType = ezSpinnerType.toLowerCase();

        this.#ezSpinnerType = 'gif' === ezSpinnerType || 'svg' === ezSpinnerType
            ? ezSpinnerType
            : EzString.EMPTY;
    }

    /**
        @private @field
        Stores the spinner's image url (if any)
        @type {string}
        Acceptable values: EzString.EMPTY, and any valid URL
     */
    #ezSpinnerImgUrl = EzString.EMPTY;
    /**
        @public @property @getter
        Gets the spinner's image url (if any)
        @returns {string}
     */
    get ezSpinnerImgUrl() {
        return this.#ezSpinnerImgUrl;
    }
    /**
        @public @property @getter
        Sets the spinner's image url (if any)
        @param {string} ezSpinnerImgUrl
        Acceptable values: EzString.EMPTY, and any valid URL
        Default: EzString.EMPTY
     */
    set ezSpinnerImgUrl(ezSpinnerImgUrl) {
        this.#ezSpinnerImgUrl = EzString.stringOrEmpty(ezSpinnerImgUrl);
    }

    /**
        @private @field
        Stores the maximum width of the spinner
        Null indicates the maximum width is not set.
        @type {string}
        Default: null
     */
    #ezMaxWidth = null;
    /**
        @public @property @getter
        Gets the maximum width of the spinner
        Null indicates the maximum width is not set.
        @returns {string}
     */
    get ezMaxWidth() {
        return this.#ezMaxWidth;
    }
    /**
        @public @property @getter
        Sets the maximum width of the spinner
        Null indicates the maximum width is not set.
        If the provdied ezMaxWidth is a number, it is assumed to represent pixels and the px is appended.
        @param {undefined|null|number|string} ezMaxWidth
        Default: null
     */
    set ezMaxWidth(ezMaxWidth) {
        this.#ezMaxWidth = EzNumber.isNumber(ezMaxWidth)
            ? `${EzNumber.toString(ezMaxWidth)}px`
            : EzString.stringOrNull(ezMaxWidth);
    }

    /**
        @private @field
        Stores the minimum width of the spinner
        Null indicates the minimum width is not set.
        @type {number}
        Default: null
     */
    #ezMinWidth = null;
    /**
        @public @property @getter
        Gets the minimum width of the spinner
        Null indicates the minimum width is not set.
        @returns {number}
     */
    get ezMinWidth() {
        return this.#ezMinWidth;
    }
    /**
        @public @property @getter
        Sets the minimum width of the spinner
        Null indicates the minimum width is not set.
        If the provdied ezMinWidth is a number, it is assumed to represent pixels and the px is appended.
        @param {undefined|null|number|string} ezMinWidth
        Default: null
     */
    set ezMinWidth(ezMinWidth) {
        this.#ezMinWidth = EzNumber.isNumber(ezMinWidth)
            ? `${EzNumber.toString(ezMinWidth)}px`
            : EzString.stringOrNull(ezMinWidth);
    }

    /**
        @private @field
        Stores the specific width of the spinner.
        Set to 'auto' to dynamiclly adjust the width to fit the contents of the spinner UX
        @type {number|string}
        Default: 'auto'
     */
    #ezWidth = 'auto'
    /**
        @public @property @getter
        Gets the specific width of the spinner.
        Set to 'auto' to dynamiclly adjust the width to fit the contents of the spinner UX
        @returns {number|string}
     */
    get ezWidth() {
        return this.#ezWidth;
    }
    /**
        @public @property @getter
        Sets the specific width of the spinner.
        Set to 'auto' to dynamiclly adjust the width to fit the contents of the spinner UX
        If the provdied ezWidth is a number, it is assumed to represent pixels and the px is appended.
        @param {undefined|null|number|string} ezWidth
        Default: 'auto'
     */
    set ezWidth(ezWidth) {
        this.#ezWidth = EzNumber.isNumber(ezWidth)
            ? `${EzNumber.toString(ezWidth)}px`
            : EzString.stringOrDefault(
                ezWidth,
                'auto');
    }

    /**
        @private @field
        Stores the specific height of the spinner.
        Set to 'auto' to dynamiclly adjust the height to fit the contents of the spinner UX
        @type {string}
        Acceptable values: Any valid CSS height value.'
     */
    #ezHeight = 'auto';
    /**
        @public @property @getter
        Gets the specific height of the spinner.
        Set to 'auto' to dynamiclly adjust the height to fit the contents of the spinner UX
        @returns {string}
     */
    get ezHeight() {
        return this.#ezHeight;
    }
    /**
        @public @property @getter
        Sets the specific height of the spinner.
        Set to 'auto' to dynamiclly adjust the height to fit the contents of the spinner UX
        If the provdied ezHeight is a number, it is assumed to represent pixels and the px is appended.
        @param {undefined|null|string|number} ezHeight
        Acceptable values: 'auto' or an integer number
        Default: 'auto'
     */
    set ezHeight(ezHeight) {
        this.#ezHeight = EzNumber.isNumber(ezHeight)
            ? `${EzNumber.toString(ezHeight)}px`
            : EzString.stringOrDefault(
                ezHeight,
                'auto');
    }

    /**
        @private @field
        Stores if the spinner should resize when the window resizes
        @type {boolean}
        Default: true
     */
    #ezResizeWithWindow = true;
    /**
        @public @property @getter
        Gets if the spinner should resize when the window resizes
        @returns {boolean}
     */
    get ezResizeWithWindow() {
        return this.#ezResizeWithWindow;
    }
    /**
        @public @property @getter
        Sets if the spinner should resize when the window resizes
        @param {boolean} ezResizeWithWindow
        Default: true
     */
    set ezResizeWithWindow(ezResizeWithWindow) {
        this.#ezResizeWithWindow = EzBoolean.booleanOrTrue(ezResizeWithWindow);
    }

    /**
        @private @field
        Stores the message to display in the spinner window
        @type {string}
        Default: 'Please wait ...'
     */
    #ezWaitMessage = 'Please wait ...';
    /**
        @public @property @getter
        Gets the message to display in the spinner window
        @returns {string}
     */
    get ezWaitMessage() {
        return this.#ezWaitMessage;
    }
    /**
        @public @property @getter
        Sets the message to display in the spinner window
        @param {string} ezWaitMessage
        Default: 'Please wait ...'
     */
    set ezWaitMessage(ezWaitMessage) {
        this.#ezWaitMessage = EzString.stringOrDefault(
            ezWaitMessage,
            'Please wait ...');
    }

    /**
        @private @field
        Stores the message to display in the spinner window
        @type {string}
        Default: 'Please wait ...'
     */
    #ezSpinnerHtml;
    /**
        @public @property @getter
        Gets the message to display in the spinner window
        @returns {string}
     */
    get ezSpinnerHtml() {
        if (!EzString.stringHasLength(this.#ezSpinnerHtml)) {
            this.#ezSpinnerHtml = this.ezBuildSpinnerHtml();
        }

        return this.#ezSpinnerHtml;
    }
    /**
        @public @property @getter
        Sets the message to display in the spinner window
        @param {string} ezWaitMessage
        Default: this.ezBuildSpinnerHtml()
     */
    set ezSpinnerHtml(ezSpinnerHtml) {
        this.#ezSpinnerHtml = EzString.stringOrDefault(
            ezSpinnerHtml,
            this.ezBuildSpinnerHtml());
    }

    /**
        @public @method
        Builds the spinner's HTML
        @returns {string}
     */
    ezBuildSpinnerHtml() {
        let minWidthCss = null != this.ezMinWidth
            ? `min-width: ${this.ezMinWidth}`
            : EzString.EMPTY;

        let maxWidthCss = null != this.ezMaxWidth
            ? `max-width: ${this.ezMaxWidth}`
            : EzString.EMPTY;

        let spinnerImgHtml = EzString.stringHasLength(this.ezSpinnerImgUrl)
            ? EzString.build`
                <img
                    id="${this.ezId}_Image"
                    src="${this.ezSpinnerImageUrl}
                    class="spinnerImg"
                    align="center"/>`
            : EzString.EMPTY;

        return EzHtml.build`
            <div
                id="${this.ezId}"
                style="display:fixed;z-index:9999;">
                <style
                    id="${this.ezId}_Styles">
                    .spinnerWindow {
                        display: none;
                        padding: 8px;
                        background-color: rgba(255, 255, 255, .85);
                        color: #000000;
                        font-size: 24pt;
                        text-align: center;
                        box-shadow: 0px 0px 10px 0px #000000;
                    }
                   .spinnerImg {
                        margin: 0px;
                        padding: 0px;
                        ${minWidthCss}
                        ${maxWidthCss}
                        width: ${this.ezWidth};
                        height: ${this.ezHeight};
                        text-align: center;
                        vertical-align: middle;
                    }
                   .spinnerMessage {
                        margin: 0px;
                        padding: 0px;
                        color: #000000;
                        font-size: 24pt;
                        text-align: center;
                    }
                </style>
                <div
                    id="${this.ezId}_Window"
                    class="spinnerWindow">
                    ${spinnerImgHtml}
                    <div
                        id="${this.ezId}_Message"
                        class="spinnerMessage">
                        ${this.ezWaitMessage}
                    </div>
                </div>
            </div>`;
    }

    /**
        @protected @method
        Resizes the spinner when the container resizes
        @param {string} spinnerId
     */
    ezResizeSpinnerToWindow() {
        // Adjust the sizing
        let windowHeight = EzDocument.window.innerHeight;

        let windowWidth = EzDocument.window.innerWidth;

        if (0 == windowHeight || 0 == windowWidth) {
            // Window has no size, do not resize
            return;
        }

        EzDocument.setElementCSSProp(
            this.ezId,
            'width',
            windowWidth);

        EzDocument.setElementCSSProp(
            this.ezId,
            'margin-top',
            `${EzNumber.toString((windowHeight / 2) - (this.ezHeight / 2))}px`);
    }

    /**
        @public @method
        Shows the spinner UX
        @param {string} waitMessage
     */
    ezShow() {
        if (!EzDocument.elementExists(this.ezId)) {
            EzDocument.prependElementContent(
                this.ezParentContainerId,
                this.ezSpinnerHtml);

            // Hook window resize event to make sure the spinner size stays the same
            if (EzBoolean.isTrue(this.#ezResizeWithWindow)) {
                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    this.ezParentContainerId,
                    EzElementEventName.RESIZE,
                    this.ezId,
                    this.ezResizeSpinnerToWindow);
            }

            EzDocument.showElement(this.ezId);
        }

        this.ezUpdateUXState();
    }

    /**
        @public @method
        Closes spinner and removes the HTML from the document.
     */
    ezClose() {
        if (EzDocument.elementExists(this.ezId)) {
            if (EzBoolean.isTrue(this.#ezResizeWithWindow)) {
                ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
                    this.ezParentContainerId,
                    EzElementEventName.RESIZE,
                    this.ezId);
            }

            EzDocument.hideElement(this.ezId);

            EzDocument.removeElement(this.ezId);
        }
    }

    /**
        @public @method
        Updates the state of the spinner ux
     */
    ezUpdateUXState() {
        if (!EzDocument.elementExists(this.ezId)) {
            // not injected yet, nothing to update
            return;
        }

        EzDocument.setElementContent(
            `${this.ezId}_Message`,
            this.ezWaitMessage);

        this.ezResizeSpinnerToWindow();
    }

    /**
        @override
        From class EzJSONSerializable
        @public @readonly @property
        Returns this instance as a JSON Object (will no longer have the getter/setter methods).
        Useful for serailization to JSON.
        @returns {object}
     */
    get asJSONObject() {
        return {
            ezId: this.ezId,
            ezName: this.ezName,
            ezSpinnerType: this.ezSpinnerType,
            ezSpinnerImgUrl: this.ezSpinnerImgUrl,
            ezMaxWidth: this.ezMaxWidth,
            ezMinWidth: this.ezMinWidth,
            ezWidth: this.ezWidth,
            ezHeight: this.ezHeight,
            ezResizeWithWindow: this.ezResizeWithWindow,
            ezWaitMessage: this.ezWaitMessage,
            ezSpinnerHtml: this.ezSpinnerHtml,
            ezParentContainerId: this.ezParentContainerId
        };
    }

    /**
        @override
        From class EzJSONSerializable
        @public @method
        Copies properties from the provided jsonObject to this instance (even if this instance does not define the property)
        @param {Object} jsonObject
        @returns {Object}
        Returns this instance with the key & values from the provided jsonObject.
    */
    ezFromJSONObject(jsonObject) {
        if (!EzObject.isValid(jsonObject)) {
            throw new EzBadParamException(
                'jsonObject',
                this,
                this.ezFromJSONObject);
        }

        this.ezId = jsonObject.ezId;

        this.ezName = jsonObject.ezName;

        this.ezParentContainerId = jsonObject.ezParentContainerId;

        this.ezSpinnerType = jsonObject.ezSpinnerType;

        this.ezSpinnerImgUrl = jsonObject.ezSpinnerImgUrl;

        this.ezMaxWidth = jsonObject.ezMaxWidth;

        this.ezMinWidth = jsonObject.ezMinWidth;

        this.ezWidth = jsonObject.ezWidth;

        this.ezHeight = jsonObject.ezHeight;

        this.ezResizeWithWindow = jsonObject.ezResizeWithWindow;

        this.ezWaitMessage = jsonObject.ezWaitMessage;

        this.ezSpinnerHtml = jsonObject.ezSpinnerHtml;

        return this;
    }
}

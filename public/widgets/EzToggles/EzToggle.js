import {
    EzException,
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import { EzElementEventName } from '/ezlibrary/enums/EzEnumerations.js';

import {
    EzObject,
    EzBoolean,
    EzString,
    EzFunction
} from '/ezlibrary/helpers/EzHelpers.js';

/**
    @public @class {EzToggle} @implements {EzClass}
    @description
    Provides easy setup of the EzToggle UX component
 */
export class EzToggle {
    /**
        @static
        @public @method
        Initializes an HTML radio or checkbox input as an EzToggle element.
        @param {string} htmlElementId
        @param {undefined|null|boolean} checked
        Default is false
        @param {undefined|null|function} onCheckedHandler
        @param {undefined|null|function} onUncheckedHandler
     */
    static ezInitEzToggle(htmlElementId, checked, onCheckedHandler, onUncheckedHandler) {
        if (!EzString.stringHasLength(htmlElementId)) {
            throw new EzBadParamException(
                'htmlElementId',
                this,
                this.ezInitEzToggle);
        }

        return new EzToggle(
            htmlElementId,
            checked,
            onCheckedHandler,
            onUncheckedHandler);
    }

    /**
        @public @constructor
        >> DO NOT CREATE NEW INSTANCES <<
        Always use the EzToggle.ezInitEzToggle static method to associate a
        HTML input or radio element with an EzToggle instance.
     */
    constructor(htmlElementId, checked, onCheckedHandler, onUncheckedHandler) {
        if (!EzString.stringHasLength(htmlElementId)) {
            throw new EzBadParamException(
                'htmlElementId',
                this,
                this.ezInitEzToggle);
        }

        let htmlElement = ezApi.ezclocker.ezUi.ezFindByElementOrId(htmlElementId);

        if (!EzObject.isValid(htmlElement)) {
            throw new EzException(
                ezApi.ezEM`
                    Unable to initialize an HTML element as an EzToggle:
                    An HTML element with id=${htmlElementId} does not exist in the documen tyet.`);
        }

        /*
        if (!ezApi.ezHasOwnProperty(htmlElement, 'type') ||
            !EzString.stringHasLength(htmlElement.type) ||
            ('checkbox' !== x.type && 'radio' !== x.type)) {
            let em = ezApi.ezEM`
                You applied EzToggle to HTML element with id=${htmlElementId}.
                However, the HTML element does not appear to be a radio or checkbox input element.`;

            if (ezApi.ezHasOwnProperty(htmlElement, 'nodeName') &&
                EzString.stringHasLength(htmlElement.nodeName) &&
                'INPUT' !== x.nodeName) {
                em = `${em} EzToggle may not function as expected when applied to a ${x.nodeName} element.`;
            }
            ezApi.ezclocker.ezLogger.warn(em);
        }
        */

        this.ezId = htmlElementId
        this.ezChecked = EzBoolean.isTrue(checked);
        this.ezOnChecked = onCheckedHandler;
        this.ezOnUnchecked = onUncheckedHandler;

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            element.id,
            EzElementEventName.CHANGE,
            `${EzToggle.ezApiName}_${this.ezId}`,
            this.ezHandleHTMLElementOnChangeEvent);

        ezApi.ezclocker.ezUi.ezSetElementDataAttributeValue(
            htmlElementId,
            'eztoggle',
            this);
    }

    /**
        @private @field
        Stores the associated HTML radio or checkbox input element's ID
        @type {string}
     */
    #ezId = null;

    /**
        @public @property @getter
        Gets the associated HTML radio or checkbox input element's ID
        @returns {string}
     */
    get ezId() {
        return this.#ezId;
    }

    /**
        @public @property @setter
        Sets the associated HTML radio or checkbox input element's ID
        @param {string} ezId
     */
    set ezId(ezId) {
        if (!EzString.stringHasLength(ezId)) {
            throw new EzBadParamException(
                'ezId',
                this,
                this.ezId);
        }

        this.#ezId = EzString.stringOrDefault(ezId, null);
    }

    /**
        @private @field
        Stores the onChecked event callback function
        @type {boolean}
     */
    #ezOnChecked = null;

    /**
        @public @property @getter
        Gets  the onChecked event callback function
        @returns {boolean}
     */
    get ezOnChecked() {
        return this.#ezOnChecked;
    }

    /**
        @public @property @setter
        Sets the onChecked event callback function
        @param {boolean} ezOnChecked
     */
    set ezOnChecked(ezOnChecked) {
        this.#ezOnChecked = EzFunction.isFunction(ezOnChecked)
            ? ezOnChecked
            : null;

        ezApi.ezclocker.ezUi.ezSetElementDataAttributeValue(
            this.ezId,
            'ezOnChecked',
            this.#ezOnChecked);
    }

    /**
        @private @field
        Stores the onUnchecked callback function
        @type {boolean}
     */
    #ezOnUnchecked = null;

    /**
        @public @property @getter
        Gets the onUnchecked callback function
        @returns {boolean}
     */
    get ezOnUnchecked() {
        return this.#ezOnUnchecked;
    }

    /**
        @public @property @setter
        Sets the onUnchecked callback function
        @param {boolean} ezOnUnchecked
     */
    set ezOnUnchecked(ezOnUnchecked) {
        this.#ezOnUnchecked = EzFunction.isFunction(ezOnUnchecked)
            ? ezOnUnchecked
            : null;

        ezApi.ezclocker.ezUi.ezSetElementDataAttributeValue(
            this.ezId,
            'ezOnUnchecked',
            this.#ezOnUnchecked);
    }

    /**
        @public @property @getter
        Gets the associated HTML radio or checkbox input element's reference
        @returns {string}
     */
    get ezHTMLElement() {
        return ezApi.ezclocker.ezUi.ezFindByElementOrId(this.ezId);
    }


    /**
        @public @property @getter
        Gets if the HTML element radio or input box is checked or not.
        @returns {boolean}
     */
    get ezChecked() {
        if (!EzObject.isValid(!this.ezHTMLElement)) {
            ezApi.ezclocker.ezLogger.error(`Unable to find EzToggle element with id=${this.ezId}`);
            return false;
        }

        return EzBoolean.isTrue(this.ezHTMLElement.checked);
    }

    /**
        @public @property @setter
        Sets if the HTML element radio or input box is checked or not.
        @param {string} ezId
     */
    set ezChecked(ezChecked) {
        if (!EzBoolean.isBoolean(ezChecked)) {
            throw new EzBadParmException(
                'ezChecked',
                this,
                this.ezChecked);
        }

        if (!EzObject.isValid(!this.ezHTMLElement)) {
            ezApi.ezclocker.ezLogger.error(`Unable to find EzToggle element with id=${this.ezId}`);
            return;
        }

        this.ezHTMLElement.checked = EzBoolean.isTrue(ezChecked);
    }

    /**
        @private @field
        Stores if triggering of the onChecked or onUnchcked events is paused or not
     */
    #ezPauseCheckEvents = false;

    /**
        @public @property @getter
        Gets if triggering of the onChecked or onUnchcked events is paused or not
        @returns {boolean}
     */
    get ezPauseCheckEvents() {
        return this.#ezPauseCheckEvents;
    }

    /**
        @public @property @setter
        Sets if triggering of the onChecked or onUnchcked events is paused or not
        @param {boolean} ezPauseCheckEvents
     */
    set ezPauseCheckEvents(ezPauseCheckEvents) {
        this.#ezPauseCheckEvents = EzBoolean.isTrue(ezPauseCheckEvents);
    }

    /**
        @public @property @setter
        Sets the associated HTML radio or input element's checked value without triggering
        the onChecked or onUnchecked events.
        @param {boolean} checked
     */
    set ezSilentChecked(checked) {
        try {
            this.ezPauseCheckEvents = true;

            this.ezChecked = EzBoolean.isTrue(checked);
        } finally {
            this.ezPauseCheckEvents = false;
        }
    }

    /**
        @protected @method
        Handles the CHANGE event for EzToggle elements and then fires the ezClocker onChecked or onUnchecked
        handlers provided in the ezInitEzToggle method.
        The element reference is available from: event.data.elementEvent
        @param {object} ezEvent
        The EzEventEngine event object
     */
    ezHandleHTMLElementOnChangeEvent(ezEvent) {
        if (!EzObject.isValid(ezEvent) || !EzObject.isValid(ezEvent.data) || !EzObject.isValid(ezEvent.data.elementEvent)) {
            ezApi.ezclocker.ezLogger.error(
                ezApi.ezEM`
                    Handled EzToggle change event but did not receive the expected EzEventEngine event object.
                    Ignoring the event.`);
        }

        if (this.ezPauseCheckEvents) {
            // OnChecked and OnUnchecked events paused
            return;
        }

        if (EzBoolean.isTrue(this.ezChecked) && EzFunction.isFunction(this.ezOnChecked)) {
            return this.ezOnChecked(ezEvent);
        }

        if (EzBoolean.isFalse(this.ezChecked) && EzFunction.isFunction(this.ezOnUnchecked)) {
            return this.ezOnUnchecked(ezEvent);
        }
    }
}

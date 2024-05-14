import {
    EzObject,
    EzBoolean,
    EzString
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzBadParamException,
    EzBadStateException
} from '/ezlibrary/exceptions/EzExceptions.js'

/**
    @class
    @summary
    Wraps the creation and triggering of a CustomEvent.
    ---------------------------------------------------------------------
    Import with:
        import { EzCustomEvent } from '/ezlibrary/events/EzCustomEvent.js';
    ---------------------------------------------------------------------
 */
export class EzCustomEvent {
    /**
        @static
        @public @method
        Creates a new instance of EzCustomEvent
        @param {string} eventName
        @param {boolean} bubbles
        Default: false
        @param {boolean} cancelable
        Default: false
        @param {boolean} composed
        Default: false
     */
    static build(eventName, bubbles, cancelable, composed) {
        return new EzCustomEvent(
            eventName,
            bubbles,
            cancelable,
            composed);
    }

    /**
        @public @constructor
        Creates a new instance of EzCustomEvent
        @param {string} eventName
        @param {boolean} bubbles
        Default: false
        @param {boolean} cancelable
        Default: false
        @param {boolean} composed
        Default: false
     */
    constructor(eventName, bubbles, cancelable, composed) {
        if (!EzString.stringHasLength(eventName)) {
            throw new EzBadParamException(
                'eventName',
                this,
                this.ezEventName);
        }

        this.#ezEventName = eventName;
        this.#ezBubbles = EzBoolean.isTrue(bubbles);;
        this.#ezCancelable = EzBoolean.isTrue(cancelable);
        this.#ezComposed = EzBoolean.isTrue(composed);
    }

    /**
        @private @field
        Stores the name of the custom event
        @type {string}
     */
    #ezEventName = null;

    /**
        @public @property @getter
        Gets
        @returns {string}
     */
    get ezEventName() {
        return this.#ezEventName;
    }

    /**
        @private @field
        Stores a boolean value indicating whether the event bubbles
        @type {boolean}
     */
    #ezBubbles = false;

    /**
        @private @field
        Stores a boolean value indicating whether the event can be cancelled.
        @type {boolean}
     */
    #ezCancelable = false;

    /**
        @private @field
        Stores a boolean value indicating whether the event will trigger listeners outside of a shadow root
        @type {string}
     */
    #ezComposed = true;

    /**
        @private @method
        Returns the Event Options object for the CustomEvent
        @param {detail}
        @returns {object}
        {
            bubbles: {boolean},
            cancelable : {boolean},
            composed: {boolean},
            detail: {null|*},
        }
     */
    #ezBuildCustomEventOptions(detail) {
        return {
            bubbles: this.#ezBubbles,
            cancelable: this.#ezCancelable,
            composed: this.#ezComposed,
            detail: EzObject.assignOrNull(detail)
        };
    }

    /**
        @public @method
        Triggers this event from globalThis.window.document with the CustomEvent's detail property
        equal to the provided detail param.
        @param {undefined|null|*} detail
        @returns {boolean}
        If the CustomEvent is cancelable and at least one of the event handlers which received event called Event.preventDefault(), then false is returned.
        Otherwise, true is returned.
     */
    ezGlobalThisTiggerEvent(detail) {
        if (!EzObject.isValid(globalThis)) {
            throw new EzBadStateException(
                'Expecting a valid instance from call to: globalThis',
                'Call to gobalThis.window.document returned an undefined or null instance.',
                this,
                this.ezGlobalThisTiggerEvent);
        }

        globalThis.dispatchEvent(
            new CustomEvent(
                this.#ezEventName,
                this.#ezBuildCustomEventOptions(detail)));
    }

    /**
        @public @method
        Triggers this event from globalThis.window with the CustomEvent's detail property
        equal to the provided detail param.
        @param {undefined|null|*} detail
        @returns {boolean}
        If the CustomEvent is cancelable and at least one of the event handlers which received event called Event.preventDefault(), then false is returned.
        Otherwise, true is returned.
     */
    ezWindowTiggerEvent(detail) {
        if (!EzObject.isValid(globalThis) || !EzObject.isValid(globalThis.window)) {
            throw new EzBadStateException(
                'Expecting a valid instance from call to globalThis.window.',
                'Call to gobalThis.window returned an undefined or null instance.',
                this,
                this.ezWindowTiggerEvent);
        }

        return globalThis.window.dispatchEvent(
            new CustomEvent(
                this.#ezEventName,
                this.#ezBuildCustomEventOptions(detail)));
    }

    /**
        @public @method
        Triggers this event from globalThis.window.document with the CustomEvent's detail property
        equal to the provided detail param.
        @param {undefined|null|*} detail
        @returns {boolean}
        If the CustomEvent is cancelable and at least one of the event handlers which received event called Event.preventDefault(), then false is returned.
        Otherwise, true is returned.
     */
    ezDocumentTiggerEvent(detail) {
        if (!EzObject.isValid(globalThis) || !EzObject.isValid(globalThis.window) || !EzObject.isValid(globalThis.window.document)) {
            throw new EzBadStateException(
                'Expecting a valid instance from call to: globalThis.window.document.',
                'Call to gobalThis.window.document returned an undefined or null instance.',
                this,
                this.ezDocumentTiggerEvent);
        }

        return globalThis.window.document.dispatchEvent(
            new CustomEvent(
                this.#ezEventName,
                this.#ezBuildCustomEventOptions(detail)));
    }

    /**
        @public @method
        Triggers this event from globalThis.window.document with the CustomEvent's detail property
        equal to the provided detail param.
        @param {undefined|null|*} detail
        @returns {boolean}
        If the CustomEvent is cancelable and at least one of the event handlers which received event called Event.preventDefault(), then false is returned.
        Otherwise, true is returned.
     */
    ezElementTiggerEvent(elementId, detail) {
        if (!EzString.stringHasLength(elementId)) {
            throw new EzBadParamException(
                'elementId',
                this,
                this.ezElementTiggerEvent);
        }
        if (!EzObject.isValid(globalThis) || !EzObject.isValid(globalThis.window) || !EzObject.isValid(globalThis.window.document)) {
            throw new EzBadStateException(
                'Expecting a valid instance from call to: globalThis.window.document.',
                'Call to gobalThis.window.document returned an undefined or null instance.',
                this,
                this.ezElementTiggerEvent);
        }

        let htmlElement = globalThis.window.document.getElementById(elementId);

        if (!EzObject.isValid(htmlElement)) {
            throw new EzBadStateException(
                `Expecting a valid HTML element result from call to: globalThis.window.document.getElementById(${elementId})`,
                `Call to globalThis.window.document.getElementById(${elementId} returned an undefined or null result.`,
                this,
                this.ezElementTiggerEvent);
        }

        return htmlElement.dispatchEvent(
            new CustomEvent(
                this.#ezEventName,
                this.#ezBuildCustomEventOptions(detail)));
    }
}

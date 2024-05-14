import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    @module /ezlibrary/events/EzWantEventDef.js
    @summary EzEventEngine's want event definition objects.
    @description
    ---------------------------------------------------------------------------
    Exported Classes:
        1) EzWantEventDef
    ---------------------------------------------------------------------------
    Import Statements:
        import { EzWantEventDef } from '/ezlibrary/events/EzWantEventDef.js';
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/**
    @public @class {EzWantEventDef}
    @description
    Represents a EzEventEngine want event registration.
    Used when registering want events in bulk with EzEventEngine.
    ---------------------------------------------------------------------------
    Import with:
        import { EzWantEventDef } from '/ezlibrary/events/EzWantEventDef.js';
    ---------------------------------------------------------------------------
 */
export class EzWantEventDef {
    /**
        @public @constructor
        Creates a new instance of EzWantEventDef
        @param {string} eventName
        @param {function} eventHandlerFunction
        @param {undefined|null|boolean} immediateTriggerIfAlreadyTriggered
        Default is false
        @param {undefined|null|boolean} unwantAfterFirstTrigger
        Default is false
     */
    constructor(eventName, eventHandlerFunction, immediateTriggerIfAlreadyTriggered, unwantAfterFirstTrigger) {
        if (!ezApi.ezStringHasLength(eventName)) {
            throw new EzBadParamException(
                'eventName',
                this,
                this.constructor);
        }
        if (!ezApi.ezIsFunction(eventHandlerFunction)) {
            throw new EzBadParamException(
                'eventHandlerFunction',
                this,
                this.constructor);
        }

        this.ezEventName = eventName;
        this.ezEventHandlerFunction = eventHandlerFunction;
        this.ezImmediateTriggerIfAlreadyTriggered = ezApi.ezIsTrue(immediateTriggerIfAlreadyTriggered);
        this.ezUnwantAfterFirstTrigger = ezApi.ezIsTrue(unwantAfterFirstTrigger);
    }

    ezEventName = null;
    ezEventHandlerFunction = null;
    ezImmediateTriggerIfAlreadyTriggered = false;
    ezUnwantAfterFirstTrigger = false;
}

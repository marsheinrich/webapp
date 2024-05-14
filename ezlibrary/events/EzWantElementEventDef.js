import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    @module /ezlibrary/events/EzWantElementEventDef.js
    @summary EzEventEngine's want element event definition objects.
    @description
    ---------------------------------------------------------------------------
    Exported Classes:
        1) EzWantElementEventDef
    ---------------------------------------------------------------------------
    Import Statements:
        import { EzWantElementEventDef } from '/ezlibrary/events/EzWantElementEventDef.js';
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/**
    @public @class {EzWantElementEventDef}
    @description
    Represents a EzEventEngine want element event registration.
    Used when registering want element events in bulk with EzEventEngine.
    ---------------------------------------------------------------------------
    Import with:
        import { EzWantElementEventDef } from '/ezlibrary/events/EzWantElementEventDef.js';
    ---------------------------------------------------------------------------
 */
export class EzWantElementEventDef {
    /**
        @public @constructor
        Creates a new instance of EzWantElementEventDef
        @param {string} elementId
        @param {string} elementEventName
        @param {function} elementEventHandlerFunction
     */
    constructor(elementId, elementEventName, elementEventHandlerFunction) {
        if (!ezApi.ezStringHasLength(elementId)) {
            throw new EzBadParamException(
                'elementId',
                this,
                this.constructor);
        }
        if (!ezApi.ezStringHasLength(elementEventName)) {
            throw new EzBadParamException(
                'elementEventName',
                this,
                this.constructor);
        }
        if (!ezApi.ezIsFunction(elementEventHandlerFunction)) {
            throw new EzBadParamException(
                'elementEventHandlerFunction',
                this,
                this.constructor);
        }

        this.ezElementId = elementId;
        this.ezElementEventName = elementEventName;
        this.ezElementEventHandlerFunction = elementEventHandlerFunction;
    }

    ezElementId = null;
    ezElementEventName = null;
    ezElementEventHandlerFunction = null;
}

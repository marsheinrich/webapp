import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import {
    EzBoolean,
    EzFunction
} from '/ezlibrary/helpers/EzHelpers.js';

/**
 * @class
 * Represents the EzClocker website application.
 */
class EzClocker {
    /**
     * @public @readonly @property
     * Returns an object of event names triggered by this class.
     * @returns {Object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzClocker_Ready',
        };
    }

    /**
     * @public @static
     * Executes the document.dispatchEvent for a CustomEvent with name customEventName.
     * CustomEvent is created using the provided parameters:
     *     new CustomEvent(
     *         <customEventName>,
     *         {
     *             bubbles: <bubbles|true>,
     *             dispatcher: <dispatcherInstance|EzClocker.ezInstance>,
     *             data: <null|data>
     *         });
     * @param {string} customEventName
     * @param {null|undefined|*} dispatcherInstance
     * @param {null|undefined|*} data
     * @param {null|undefined|boolean} bubbles
     */
    static ezDispatchCustomDocumentEvent(customEventName, dispatcherInstance, data, bubbles) {
        if (undefined == customEventName || null == customEventName || 'string' !== typeof customEventName) {
            throw new EzBadParamException(
                'customEventName',
                'EzClocker',
                '{class}ezDispatchCustomDocumentEvent(customEventName)');
        }

        let customEvent = new CustomEvent(
            customEventName,
            {
                bubbles: undefined != bubbles && null != bubbles && 'boolean' === typeof bubbles
                    ? bubbles
                    : true,
                dispatcher: undefined != dispatcherInstance && null != dispatcherInstance
                    ? dispatcherInstance
                    : EzClocker.ezInstance,
                data: undefined != data && null != data
                    ? data
                    : null
            });

        document.dispatchEvent(customEvent);
    }

    /**
     * @public @static @readonly @property
     * Returns a reference to the globalThis.console or a dummy object with empty implementations of
     * log functions.
     * @returns {Object}
     */
    static get ezConsole() {
        return globalThis.console || {
            assert: EzFunction.dummyFunction,
            clear: EzFunction.dummyFunction,
            debug: EzFunction.dummyFunction,
            error: EzFunction.dummyFunction,
            info: EzFunction.dummyFunction,
            log: EzFunction.dummyFunction,
            trace: EzFunction.dummyFunction,
            warn: EzFunction.dummyFunction,
        };
    }

    /**
     * @private @field
     * Stores if the EzClockerApp is ready to use or not
     */
    #ready = false;
    /**
     * @public @property @getter
     * Gets if the EzClockerApp is ready to use or not
     * @returns {boolean}
     */
    get ready() {
        return this.#ready;
    }
    /**
     * @public @property @setter
     * Sets if the EzClockerApp is ready to use or not
     * @param {boolean} ready
     */
    set ready(ready) {
        this.#ready = EzBoolean.booleanOrFalse(ready);
    }
}

globalThis['ezClockerApp'] = new EzClocker();

EzClocker.ezDispatchCustomDocumentEvent(
    EzClocker.ezEventNames.onReady,
    globalThis['ezClockerApp']);

export let ezClockerApp = globalThis['ezClockerApp'];

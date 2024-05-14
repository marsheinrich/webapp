import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzUx } from '/ezlibrary/ux/EzUx.js';
import { EzUI } from '/public/javascript/common/ezui.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * A controller & view class for ezClocker's Manage Job Codes dialog.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *     import { EzUxState } from '/ezlibrary/ux/EzUxState.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Singleton instance ready for use when the below evaluates to true:
 *     globalThis.ezApi.ezclocker[EzUxState.ezApiName] &&
 *     globalThis.ezApi.ezclocker[EzUxState.ezApiName].ready
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Listen to onReady event:
 *     document.addEventListener(
 *         EzUxState.ezEventNames.onReady,
 *         <class_name>.#ezRegistrator);
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Singleton Instance Reference:
 *     Inside this class...: EzUxState.ezInstance
 *     Outside this class..: ezApi.ezclocker.ezUxState
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzUxState extends EzClass {
    /**
     * @public @method
     * Applies the prodied state to the element with the provdied elementId
     * @param {EzUxElementState} ezUxElementState
     * @returns {Promise.resolve}
     * The resolve contains the ezUxElementState
     */
    ezApplyElementState(ezUxElementState) {
        if (!EzObject.isValid(ezUxElementState)) {
            throw new EzBadParamException(
                'ezUxElementState',
                this,
                this.constructor);
        }

        return EzPromise.asyncAction(
            (finished) => {
                if (!EzUx.elementExists(ezUxElementState.ezElementId)) {
                    // element does not exist, ignore
                    return finished(ezUxElementState);
                }

                if (this.ezApplyRemoveState(ezUxElementState)) {
                    return finished(ezUxElementState);
                }

                this.ezApplyVisibleState(ezUxElementState);

                this.ezApplyEnabledState(ezUxElementState);

                this.ezApplySelectedState(ezUxElementState);

                return finished(ezUxElementState);
            });
    }

    /**
     * @public @method
     * Applies the ezUxElementState's ezRemove state
     * @param {object} ezUxElementState
     */
    ezApplyRemoveState(ezUxElementState) {
        if (!EzObject.isValid(ezUxElementState)) {
            throw new EzBadParamException(
                'ezUxElementState',
                this,
                this.constructor);
        }

        if (!EzUx.elementExists(ezUxElementState.ezElementId)) {
            // element does not exist, ignore
            return true;
        }

        if (EzBoolean.isTrue(ezUxElementState.ezRemove)) {
            ezApi.ezclocker.ezUi.ezRemoveElement(ezUxElementState.ezElementId);

            ezUxElementState.triggerStateModified(
                'ezRemove',
                'Removed from document');

            return true;
        }

        return false;
    }

    /**
     * @public @method
     * Applies the ezUxElementState's ezEnabled state
     * @param {object} ezUxElementState
     */
    ezApplyEnabledState(ezUxElementState) {
        if (!EzObject.isValid(ezUxElementState)) {
            throw new EzBadParamException(
                'ezUxElementState',
                this,
                this.constructor);
        }

        if (EzUx.elementExists(ezUxElementState.ezElementId)) {
            if (EzBoolean.isTrue(ezUxElementState.ezEnabled)) {
                EzUx.enable(ezUxElementState.ezElementId);

                if (null != ezUxElementState.ezEnabledHint) {
                    ezApi.ezclocker.ezUi.ezSetElementProperty(
                        ezUxElementState.ezElementId,
                        'title',
                        ezUxElementState.ezEnabledHint);
                }

                ezUxElementState.triggerStateModified(
                    'ezEnable',
                    ezUxElementState.ezEnabled);

                return true;
            }

            if (null != ezUxElementState.ezDisabledHint) {
                ezApi.ezclocker.ezUi.ezSetElementProperty(
                    ezUxElementState.ezElementId,
                    'title',
                    ezUxElementState.ezDisabledHint);
            }

            EzUx.disable(ezUxElementState.ezElementId);

            ezUxElementState.triggerStateModified(
                'ezEnable',
                ezUxElementState.ezEnabled);

        }

        return false;
    }

    /**
     * @public @method
     * Applies the ezUxElementState's ezVisible state
     * @param {object} ezUxElementState
     */
    ezApplyVisibleState(ezUxElementState) {
        if (!EzObject.isValid(ezUxElementState)) {
            throw new EzBadParamException(
                'ezUxElementState',
                this,
                this.constructor);
        }

        if (EzUx.elementExists(ezUxElementState.ezElementId)) {
            if (EzBoolean.isTrue(ezUxElementState.ezVisible)) {
                EzUx.show(ezUxElementState.ezElementId);

                ezUxElementState.triggerStateModified(
                    'ezVisible',
                    ezUxElementState.ezVisible);

                return true;
            }

            EzUx.hide(ezUxElementState.ezElementId);

            ezUxElementState.triggerStateModified(
                'ezVisible',
                ezUxElementState.ezVisible);
        }

        return false;
    }

    /**
     * @public @method
     * Applies the ezUxElementState's ezVisible state
     * @param {object} ezUxElementState
     */
    ezApplySelectedState(ezUxElementState) {
        if (!EzObject.isValid(ezUxElementState)) {
            throw new EzBadParamException(
                'ezUxElementState',
                this,
                this.constructor);
        }

        if (EzUx.elementExists(ezUxElementState.ezElementId)) {
            if (EzBoolean.isTrue(ezUxElementState.ezSelected)) {
                EzUx.select(ezUxElementState.ezElementId);

                ezUxElementState.triggerStateModified(
                    'ezSelect',
                    ezUxElementState.ezVisible);

                return true;
            }

            EzUx.unselect(ezUxElementState.ezElementId);

            ezUxElementState.triggerStateModified(
                'ezSelect',
                ezUxElementState.ezVisible);
        }

        return false;
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Class Initialization and EzApi Registration Section
    // !! DO NOT PLACE ANY non-initialization fields, getter/setter methods, static methods, or class methods beyond this section !!
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    /**
     * @static
     * @public @readonly @property
     * Returns the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezUxState';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzUxState_Ready'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzUxState}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzUxState.ezApiName])
        ? globalThis.ezApi.ezclocker[EzUxState.ezApiName]
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzUxState}
     */
    static get ezInstance() {
        return EzUxState.#ezInstance;
    }

    /**
        @static
        @public @property @setter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzUxState} instance
     */
    static set ezInstance(instance) {
        if (null != EzUxState.#ezInstance) {
            throw new Error('EzUxState\'s singleton instance is already reigstered with EzApi.');
        }

        EzUxState.#ezInstance = instance;
    }

    /**
     * @static
     * @private @field
     * Stores the EzApi registration state for this class.
     * Default value is NULL
     * Class is registerd with EzApi when value is EzRegistrationState.REGISTERED
     * @type {string}
     * A valid enum property value from EzRegistrationState
     */
    static #ezApiRegistrationState = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzUxState.ezApiName])
        ? EzRegistrationState.REGISTERED
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the ezApi registration state of this classes's singleton instance.
     * @returns {string}
     * A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzUxState.#ezApiRegistrationState;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzUxState.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @static
     * @private @readonly @property
     * Returns true when all required dependencies for this class report ready.
     * In otherwords, the require dependency's singleton instance is created
     * and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzUxState.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzUxState.ezInstance &&
            EzRegistrationState.REGISTERED === EzUxState.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzUxState.#ezCanRegister && !EzUxState.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzUxState, EzUxState.ezApiName);
        }

        return EzUxState.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzUxState.ezApiName
     *     2) Property getter EzUxState.ezEventNames
     *     3) Property getter EzUxState.ezInstance
     *     4) Property setter EzUxState.ezInstance
     *     5) Property getter EzUxState.ezApiRegistrationState
     *     6) Property setter EzUxState.ezApiRegistrationState
     *     7) Property getter EzUxState.#ezCanRegister
     *     8) Property getter EzUxState.#ezIsRegistered
     *     9) Method EzUxState.#ezRegistrator()
     */
    static {
        if (!EzUxState.#ezIsRegistered) {
            EzUxState.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzUxState.#ezRegistrator()) {
                document.addEventListener(
                    EzUxState.ezOnEzApiReadyEventName,
                    EzUxState.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzUxState.#ezRegistrator);
            }
        }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // !! DO NOT PLACE ANY non-initialization fields, getter/setter methods, static methods, or class methods beyond above section !!
    // NO CODE AFTER THIS SECTION
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

}

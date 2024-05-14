import {
    EzRegistrationState
} from '/ezlibrary/enums/EzEnumerations.js';

import {
    EzString,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzClass } from '/ezlibrary/EzClass.js';
import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';
import { EzElementEventName } from '/ezlibrary/EzElementEventName.js';

import { EzElevioIntegration } from '/secure/widgets/EzHelp/EzElevioIntegration.js';

import { EzUI } from '/public/javascript/common/ezui.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * Controller for the EzHelp system
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *     import { EzHelp } from '/secure/widgets/EzHelp/EzHelp.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Singleton instance ready for use when the below evaluates to true:
 *     globalThis.ezApi?.ezclocker?.[EzHelp.ezApiName].ready
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Listen to onReady event:
 *     document.addEventListener(
 *         EzHelp.ezEventNames.onReady,
 *         {listening class}.#ezRegistrator);
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Singleton Instance Reference from within EzHelp class: EzHelp.ezInstance
 * Singleton instance reference outside of EzHelp class: ezApi.ezclocker.ezHelp
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
export class EzHelp extends EzClass {
    /**
     * @static
     * @public @readonly @property
     * Gets the default help button id
     * @returns {string}
     */
    static get DEFAULT_HELP_BUTTON_ID() {
        return 'EzShowHelpButton';
    }

    #ezHelpButtonId = null;
    /**
     * @public @property @getter
     * Gets the page's help button id that shows the help popup.
     * @returns {null|string}
     */
    get ezHelpButtonId() {
        if (null == this.#ezHelpButtonId) {
            this.#ezHelpButtonId = EzHelp.DEFAULT_HELP_BUTTON_ID;
        }

        return this.#ezHelpButtonId;
    }
    /**
     * @public @property @setter
     * Sets the help button id for the page
     * @param {undefined|null|string} ezHelpButtonId
     */
    set ezHelpButtonId(ezHelpButtonId) {
        this.#ezHelpButtonId = EzString.stringWithLengthOrDefault(
            ezHelpButtonId,
            EzHelp.DEFAULT_HELP_BUTTON_ID);
    }

    /**
     * @public @readonly @property
     * Returns if the EzHelp system is initialized yet or not
     * @returns {boolean}
     */
    get ezIsInitialized() {
        return null != this.#ezHelpButtonId;
    }

    /**
     * @public @readonly @property
     * Returns if the EzHelp system is enabled.
     * @returns {boolean}
     */
    get ezIsEnabled() {
        return this.ezIsInitialized && ezApi.ezElevioIntegration.ezElevioLoaded && ezApi.ezclocker.ezUi.ezElementExists(this.ezHelpButtonId);
    }

    /**
     * @protected @method
     * Initializes the EzHelp instance
     * @returns {EzHelp}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzHelp.ezApiName,
            EzHelp.ezEventNames.onInjected);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzElevioIntegration.ezEventNames.onEnabled,
            EzHelp.ezApiName,
            EzHelp.ezInstance.ezEnableHelp);

        // If an element with id 'EzShowHelpButton' doesn't exist,
        // then the help button will need enabled via code once it is by
        // calling EzHelp.ezInstance.ezEnableHelp('EzShowHelpButton');
        if (ezApi.ezclocker.ezUi.ezElementExists(EzHelp.ezInstance.ezHelpButtonId)) {
            EzHelp.ezInstance.ezEnableHelp(EzHelp.ezInstance.ezHelpButtonId);
        }

        return EzHelp.ezInstance;
    }

    /**
     * @public @method
     * Initialize the help system (if not already)
     * @param {string} helpButtonId
     * Default: EzHelp.DEFAULT_HELP_BUTTON_ID
     * @returns {Promise}
     */
    ezEnableHelp(helpButtonId = EzHelp.DEFAULT_HELP_BUTTON_ID) {
        if (!EzHelp.ezInstance.ezIsInitialized && !EzString.hasLength(helpButtonId)) {
            helpButtonId = EzHelp.DEFAULT_HELP_BUTTON_ID;
        }

        return EzPromise.promise(
            (resolve, reject) => {
                EzHelp.ezInstance.ezHelpButtonId = helpButtonId;

                if (!ezApi.ezclocker.ezElevioIntegration.ezElevioLoaded) {
                    // First, enable Elevio before continuing.
                    // The EzElevioIntegration.ezEnable call will trigger the ezOn_EzElevioIntegration_Enabled event
                    // which will then re-call this method to complete the enabling of help.
                    return ezApi.ezclocker.ezElevioIntegration.ezEnable()
                        .then(resolve, reject);
                }

                if (!ezApi.ezclocker.ezElevioIntegration.ezElevioLoaded) {
                    ezApi.ezclocker.ezLogger.error('Unable to enable EzHelp. The EzElevioIntegration is not loaded or failed to load.');

                    return reject();
                }

                if (!ezApi.ezclocker.ezUi.ezElementExists(EzHelp.ezInstance.ezHelpButtonId)) {
                    ezApi.ezclocker.ezLogger.warn(
                        `Skipped enabling the EzHelp button element with id=${EzHelp.ezInstance.ezHelpButtonId} does not currently exist in the document.`);

                    return reject();
                }

                ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                    EzHelp.ezInstance.ezHelpButtonId,
                    EzElementEventName.CLICK,
                    EzHelp.ezApiName,
                    EzHelp.ezInstance.ezShowHelp);

                ezApi.ezclocker.ezUi.ezEnableElement(EzHelp.ezInstance.ezHelpButtonId);

                ezApi.ezclocker.ezUi.ezSetElementHint(
                    EzHelp.ezInstance.ezHelpButtonId,
                    'View ezClocker help');

                ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                    EzHelp.ezEventNames.onInjected,
                    EzHelp.ezInstance);

                return resolve();
            });
    }

    /**
     * @public @method
     * Disables EzHelp
     */
    ezDisableHelp() {
        if (!EzHelp.ezInstance.ezIsEnabled || !EzHelp.ezInstance.ezIsInitialized) {
            // Already disabled.
            return;
        }

        if (ezApi.ezclocker.ezElevioIntegration.ezElevioLoaded) {
            // First, disable Elevio before continuing.
            // The EzElevioIntegration.ezDisable call will trigger the ezOn_EzElevioIntegration_Disabled event
            // which will then re-call this method to complete the disabling of help.
            ezApi.ezclocker.ezElevioIntegration.ezDisable();

            return;
        }

        if (!ezApi.ezclocker.ezUi.ezElementExists(EzHelp.ezInstance.ezHelpButtonId)) {
            ezApi.ezclocker.ezLogger.warn(
                EzString.em`
                    Skipped disabling the EzHelp button element with id=${EzHelp.ezInstance.ezHelpButtonId} due to the following error:
                    The HTML element does not currently exist in the document.`);

            return;
        }

        ezApi.ezclocker.ezUi.ezDisableElement(EzHelp.ezInstance.ezHelpButtonId);

        ezApi.ezclocker.ezUi.ezSetElementHint(
            EzHelp.ezInstance.ezHelpButtonId,
            'EzClocker help is currently disabled.');

        ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
            EzHelp.ezInstance.ezHelpButtonId,
            EzElementEventName.CLICK,
            EzHelp.ezApiName);
    }

    /**
     * @public @method
     * Shows the help pop-up
     */
    ezShowHelp() {
        if (!ezApi.ezclocker.ezElevioIntegration.ezElevioLoaded) {
            ezApi.ezclocker.ezLogger.warn('Unable to show ezClocker help. EzHelp is not currently loaded.');

            return;
        }

        ezApi.ezclocker.ezElevioIntegration.ezOpen();

        ezApi.ezclocker.ezElevioIntegration.ezOpenHome();
    }

    /**
     * @public @method
     * Hides all help pop-ups.
     */
    ezHideHelp() {
        if (!EzHelp.ezInsance.ezIsEnabled) {
            ezApi.ezclocker.ezLogger.warn('Unable to show ezClocker help. EzHelp is not currently enabled.');

            return;
        }

        ezApi.ezclocker.ezElevioIntegration.ezClose();
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Class Initialization and EzApi Registration Section
    // !! DO NOT PLACE ANY non-initialization fields, getter/setter methods, static methods, or class methods beyond this section !!
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    /**
     * @public @static @readonly @property
     * Returns the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezHelp';
    }

    /**
     * @public @static @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzHelp_Ready',
            onInjected: 'ezOn_EzHelp_Injected'
        };
    }

    /**
     * @private @static @field
     * Stores the single instance registered with ezApi.
     * @type {EzHelp}
     */
    static #ezInstance = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzHelp.ezApiName]
        ? globalThis.ezApi.ezclocker[EzHelp.ezApiName]
        : null;
    /**
     * @public @static @getter @property
     * Returns the singleton instance of EzDateTime registered with EzApi (if available yet)
     * @param {EzHelp}
     */
    static get ezInstance() {
        return EzHelp.#ezInstance;
    }
    /**
     * @public @static @getter @property
     * Returns the singleton instance of EzDateTime registered with EzApi (if available yet)
     * @param {EzHelp} instance
     */
    static set ezInstance(instance) {
        if (null != EzHelp.#ezInstance) {
            throw new Error('EzHelp\'s singleton instance is already reigstered with EzApi.');
        }

        EzHelp.#ezInstance = instance;
    }

    /**
     * @private @static @field
     * Stores the EzApiRegistrationState of the single instance registered with ezApi.
     * @type {String}
     * A valid enum property value from EzApiRegistrationState
     */
    static #ezApiRegistrationState = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzHelp.ezApiName]
        ? EzRegistrationState.REGISTERED
        : null;
    /**
     * @public @static @property @getter
     * Returns the ezApi registration state of this classes's singleton instance.
     * @returns {string}
     * A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzHelp.#ezApiRegistrationState;
    }
    /**
     * @public @static @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzHelp.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @public @static @readonly @property
     * Returns if all necessary dependences are ready and therefore it is ok for this class to
     * register it's singleton instance with ezApi.
     * @returns {boolean}
     */
    static get ezCanRegister() {
        return EzRegistrationState.PENDING === EzHelp.ezApiRegistrationState &&
            globalThis?.ezApi?.ready &&
            globalThis.ezApi?.ezclocker?.[EzEventEngine.ezApiName]?.ready &&
            globalThis.ezApi?.ezclocker?.[EzUI.ezApiName]?.ready &&
            globalThis.ezApi?.ezclocker?.[EzElevioIntegration.ezApiName]?.ready;
    }

    /**
     * @private @static @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzHelp.ezInstance && EzRegistrationState.REGISTERED === EzHelp.ezApiRegistrationState;
    }

    /**
     * @private @static @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzHelp.ezCanRegister && !EzHelp.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzHelp, EzHelp.ezApiName);

            EzHelp.ezIsRegistered = EzRegistrationState.REGISTERED;
        }

        return EzHelp.ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzHelp.ezApiName
     *     2) Property getter EzHelp.ezEventNames
     *     3) Property getter EzHelp.ezInstance
     *     4) Property setter EzHelp.ezInstance
     *     5) Property getter EzHelp.ezApiRegistrationState
     *     6) Property setter EzHelp.ezApiRegistrationState
     *     7) Property getter EzHelp.#ezCanRegister
     *     8) Property getter EzHelp.#ezIsRegistered
     *     9) Method EzHelp.#ezRegistrator()
     */
    static {
        if (!EzHelp.#ezIsRegistered) {
            EzHelp.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzHelp.#ezRegistrator()) {
                document.addEventListener(
                    EzHelp.ezOnEzApiReadyEventName,
                    EzHelp.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzHelp.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzHelp.#ezRegistrator);

                document.addEventListener(
                    EzElevioIntegration.ezEventNames.onReady,
                    EzHelp.#ezRegistrator);
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

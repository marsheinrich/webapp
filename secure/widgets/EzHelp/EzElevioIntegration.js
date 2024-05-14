import Elevio from 'elevio/lib/client';

import { EzClass } from '/ezlibrary/EzClass.js';
import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzUI } from '/public/javascript/common/ezui.js';

/**
    EzClocker's Elevio Integration
    Documentation for passing user information, please see:
    https://api-docs.elevio.help/en/articles/24
    Import with:
        import { EzElevioIntegration } from '/secure/widgets/EzHelp/EzElevioIntegration.js';

        globalThis.ezApi.ezclocker[EzElevioIntegration.ezApiName] &&
        globalThis.ezApi.ezclocker[EzElevioIntegration.ezApiName].ready

        document.addEventListener(
            EzElevioIntegration.ezEventNames.onReady,
            this.#ezRegistrator);
 */
export class EzElevioIntegration extends EzClass {
    /**
     * @public @static @field
     * @type {EzElevioIntegration}
     */
    static ezInstance = null;

    /**
     * @public @static @field
     * @type {string}
     */
    static ezApiRegistrationState = null;

    /**
     * @public @static @readonly @property
        Returns the name of the global variable registered for the Elevio integration.
     * @returns {string}
     */
    static get ezGlobalElevioInstanceName() {
        return '_elev';
    }

    /**
     * @public @static @readonly @property
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezElevioIntegration';
    }

    /**
     * @public @static @readonly @property
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzElevioIntegration_Ready',
            onEnabled: 'ezOn_EzElevioIntegration_Enabled'
        };
    }

    /**
     * @public @static @readonly @property
     * @returns {boolean}
     */
    static get ezCanRegister() {
        return 'PENDING' === EzElevioIntegration.ezApiRegistrationState &&
            Object.hasOwn(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready;
    }

    /**
     * @private @static @method
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (!EzElevioIntegration.ezCanRegister) {
            return false;
        }

        ezApi.ezRegisterNewApi(
            EzElevioIntegration,
            EzElevioIntegration.ezApiName);

        EzElevioIntegration.ezApiRegistrationState = 'REGISTERED';
        return true;
    }

    // Static constructor
    static {
        if (null == EzElevioIntegration.ezApiRegistrationState) {
            EzElevioIntegration.ezApiRegistrationState = 'PENDING';

            if (!EzElevioIntegration.#ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    () => {
                        if (!EzElevioIntegration.#ezRegistrator()) {
                            document.addEventListener(
                                EzEventEngine.ezEventNames.onReady,
                                EzElevioIntegration.#ezRegistrator);

                            document.addEventListener(
                                EzUI.ezEventNames.onReady,
                                EzElevioIntegration.#ezRegistrator);
                        }
                    });
            }
        }
    }

    /**
     * @private @field
        Stores the Elevio Api Id for the integration.
     * @returns {string}
     */
    #ezElevioApiId = '61991abe45da6';

    #ezElevioLoaded = false;

    ezElevio = null;

    /**
     * @public @property @getter
        Returns if the Elevio instance is loaded or not. When loaded, the Elevio API is ready to use.
     * @returns {boolean}
     */
    get ezElevioLoaded() {
        return this.#ezElevioLoaded;
    }

    /**
     * @public @property @setter
        Sets if the Elevio instance is loaded and the api is ready to use.
     * @param {boolean} ezElevioLoaded
     */
    set ezElevioLoaded(ezElevioLoaded) {
        this.#ezElevioLoaded = ezApi.ezIsBoolean(ezElevioLoaded)
            ? ezElevioLoaded
            : false;
    }

    /**
     * @public @readonly @property
        Returns the Elevio Api id to use for the integration.
     * @returns {string}
     */
    get ezElevioApiId() {
        return this.#ezElevioApiId;
    }

    /**
     * @public @readonly @property
        HTML document element ids used by EzElevioIntegration
     * @returns {object}
     */
    get ezIds() {
        return {
            ezInitScriptId: 'EzElevioIntegrationScript'
        };
    }

    /**
     * @protected @method
        Initializes the EzElevioIntegration instance
     * @returns {EzElevioIntegration}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzElevioIntegration.ezApiName,
            EzElevioIntegration.ezEventNames.onEnabled);

        return EzElevioIntegration.ezInstance;
    }

    /**
     * @public @method
        Adds/enables the Elevio integration.
     * @returns {boolean}
     */
    ezEnable() {
        return ezApi.ezPromise(
            (resolve, reject) => {
                try {
                    ezApi.ezclocker.ezLogger.debug('[EzElevioIntegration: Enabling the ezClocker Elevio integration.]');

                    window._elev.on(
                        'load',
                        (elevio) => {
                            EzElevioIntegration.ezInstance.ezElevio = elevio;

                            EzElevioIntegration.ezInstance.ezElevio.setSettings({
                                autoInitialize: false,
                                hideLauncher: true,
                                reinitializeOnUrlChange: true
                            });

                            EzElevioIntegration.ezInstance.ezElevio.initialize();

                            EzElevioIntegration.ezInstance.ezElevioLoaded = true;

                            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                EzElevioIntegration.ezEventNames.onEnabled,
                                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                    EzElevioIntegration.ezApiName,
                                    "Elevio integration is enabled.",
                                    {
                                        ezElevioIntegration: EzElevioIntegration.ezInstance,
                                        elevio: EzElevioIntegration.ezInstance.ezElevio
                                    }));

                            ezApi.ezclocker.ezLogger.debug('[EzElevioIntegration: Successfully enabled the ezClocker Elevio integration.]');

                            return resolve();
                        });

                    return Elevio.load(EzElevioIntegration.ezInstance.ezElevioApiId)
                        .then(
                            () => ezApi.ezclocker.ezLogger.debug('[EzElevioIntegration: Loading ezClocker Elevio integration.]'));
                } catch (error) {
                    ezApi.ezclocker.logger.error(`Unable to enable the Elevio integration due to the following error: ${error.message}`);

                    return reject(error);
                }
            });
    }

    /**
     * @protected @method
        Injects the Elevio integration's initialization script into the document head.
     * @returns {boolean}
     */
    ezEjectElevioIntegrationScript() {
        if (!ezApi.ezclocker.ezUi.ezElementExists(EzElevioIntegration.ezInstance.ezIds.ezInitScriptId)) {
            ezApi.ezclocker.ezLogger.debug(
                '[EzElevioIntegration: The ezClocker Elevio integration\'s initialization script never existed or is already ejected from the page.]');

            return true;
        }

        try {
            EzElevioIntegration.ezInstance.ezElevioLoaded = false;

            ezApi.ezclocker.ezLogger.debug(
                '[EzElevioIntegration: Successfully ejected the ezClocker Elevio integration\'s initialization script from the document.]');

            return true;
        } catch (error) {
            ezApi.ezclocker.ezLogger.error(`Unable to eject the Elevio integration from the current page due to the following error: ${error.message}`);

            return false;
        }
    }

    /**
     * @public @method
        Opens the help widget to the last page the user was on
     * @returns {boolean}
     */
    ezOpen() {
        if (!EzElevioIntegration.ezInstance.ezElevioLoaded || !ezApi.ezIsValid(EzElevioIntegration.ezInstance.ezElevio)) {
            ezApi.ezclocker.ezLogger.error(
                'Unable to show the Elevio integration help due to the following error: The Elevio integration is not yet loaded.');

            return false;
        }

        try {
            EzElevioIntegration.ezInstance.ezElevio.open();

            return true;
        } catch (error) {
            ezApi.ezclocker.ezLogger.error(`Unable to show the Elevio integration help due to the following error: ${error.message}`);

            return false;
        }
    }

    /**
     * @public @method
        Shows the help's home pop-up
     * @returns {boolean}
     */
    ezOpenHome() {
        if (!EzElevioIntegration.ezInstance.ezElevioLoaded || !ezApi.ezIsValid(EzElevioIntegration.ezInstance.ezElevio)) {
            ezApi.ezclocker.ezLogger.error(
                'Unable to show the Elevio integration help due to the following error: The Elevio integration is not yet loaded.');

            return false;
        }

        try {
            EzElevioIntegration.ezInstance.ezElevio.openHome();

            return true;
        } catch (error) {
            ezApi.ezclocker.ezLogger.error(`Unable to show the Elevio integration help due to the following error: ${error.message}`);

            return false;
        }
    }

    /**
     * @public @method
        Closes all Elevio pop ups.
     * @returns {boolean}
     */
    ezClose() {
        if (!EzElevioIntegration.ezInstance.ezElevioLoaded || !ezApi.ezIsValid(EzElevioIntegration.ezInstance.ezElevio)) {
            ezApi.ezclocker.ezLogger.error(
                'Unable to show the Elevio integration help due to the following error: The Elevio integration is not yet loaded.');
            return false;
        }

        try {
            EzElevioIntegration.ezInstance.ezElevio.close();

            return true;
        } catch (error) {
            ezApi.ezclocker.ezLogger.error(`Unable to hide the Elevio integration help due to the following error: ${error.message}`);

            return false;
        }
    }
}
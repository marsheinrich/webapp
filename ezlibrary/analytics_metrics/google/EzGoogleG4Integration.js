import {
    EzObject,
    EzBoolean,
    EzHtml
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzUI } from '/public/javascript/common/ezui.js';

/**
    @class
    @extends {EzClass}
    @description
    Provides the integration to Google G4
    ---------------------------------------------------------------------------
    Import with:
        import { EzGoogleG4Integration } from '/public/javascript/common/ezui.js';
    ---------------------------------------------------------------------------
    Singleton instance ready for use when the below evaluates to true:
        globalThis.ezApi.ezclocker[EzGoogleG4Integration.ezApiName] &&
        globalThis.ezApi.ezclocker[EzGoogleG4Integration.ezApiName].ready;
    ---------------------------------------------------------------------------
    Listen to onReady event:
        document.addEventListener(
            EzGoogleG4Integration.ezEventNames.onReady,
            this.#ezRegistrator);
    ---------------------------------------------------------------------------
    Singleton instance:
        ezApi.ezclocker.ezGoogleG4Integration
    ---------------------------------------------------------------------------
 */
export class EzGoogleG4Integration extends EzClass {
    /**
       @static
       @public @readonly @property
       Returns the name of this class's singleton instance when registered with ezApi.
       @returns {string}
    */
    static get ezApiName() {
        return 'ezGoogleG4Integration';
    }

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzGoogleG4Integration_Ready'
        };
    }

    /**
        @static
        @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
        @type {EzGoogleG4Integration}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzGoogleG4Integration.ezApiName])
        ? globalThis.ezApi.ezclocker[EzGoogleG4Integration.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzGoogleG4Integration}
     */
    static get ezInstance() {
        return EzGoogleG4Integration.#ezInstance;
    }

    /**
        @static
        @public @property @setter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzGoogleG4Integration} instance
     */
    static set ezInstance(instance) {
        if (null != EzGoogleG4Integration.#ezInstance) {
            throw new Error('EzGoogleG4Integration\'s singleton instance is already reigstered with EzApi.');
        }

        EzGoogleG4Integration.#ezInstance = instance;
    }

    /**
        @static
        @private @field
        Stores the EzApi registration state for this class.
        Default value is NULL
        Class is registerd with EzApi when value is EzRegistrationState.REGISTERED
        @type {string}
        A valid enum property value from EzRegistrationState
     */
    static #ezApiRegistrationState = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzGoogleG4Integration.ezApiName])
        ? EzRegistrationState.REGISTERED
        : null;

    /**
        @static
        @public @property @getter
        Returns the ezApi registration state of this classes's singleton instance.
        @returns {string}
        A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzGoogleG4Integration.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzGoogleG4Integration.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
        @static
        @private @readonly @property
        Returns true when all required dependencies for this class report ready.
        In otherwords, the require dependency's singleton instance is created
        and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
        @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzGoogleG4Integration.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready;
    }

    /**
        @static
        @private @readonly @property
        Returns if this class's singleton instance is registered with ezApi yet.
        @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzGoogleG4Integration.ezInstance &&
            EzRegistrationState.REGISTERED === EzGoogleG4Integration.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzGoogleG4Integration.#ezCanRegister && !EzGoogleG4Integration.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzGoogleG4Integration, EzGoogleG4Integration.ezApiName);
        }

        return EzGoogleG4Integration.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzGoogleG4Integration.ezApiName
            2) Property getter EzGoogleG4Integration.ezEventNames
            3) Property getter EzGoogleG4Integration.ezInstance
            4) Property setter EzGoogleG4Integration.ezInstance
            5) Property getter EzGoogleG4Integration.ezApiRegistrationState
            6) Property setter EzGoogleG4Integration.ezApiRegistrationState
            7) Property getter EzGoogleG4Integration.#ezCanRegister
            8) Property getter EzGoogleG4Integration.#ezIsRegistered
            9) Method EzGoogleG4Integration.#ezRegistrator()
     */
    static {
        if (!EzGoogleG4Integration.#ezIsRegistered) {
            EzGoogleG4Integration.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzGoogleG4Integration.#ezRegistrator()) {
                document.addEventListener(
                    EzGoogleG4Integration.ezOnEzApiReadyEventName,
                    EzGoogleG4Integration.#ezRegistrator);
            }
        }
    }

    /**
        @public @readonly @property
        Gets if the EzGoogleG4Integration is enabled or not
        @returns {boolean}
     */
    get ezEnabled() {
        return ezApi.ezclocker.ezUi.ezElementExists('EzGoogleG4Integration_GTagJS');
    }

    /**
        @protected @method
        Determines the Google G4 Id to use based upon the env
        @param {string} env
        Current Enviornment Id
        @returns {string}
     */
    ezDetermineGoogleG4Id(env) {
        switch (env) {
            case 'DEV':
            case 'QAL':
            case 'E2E':
            case 'PRF':
            case 'LOC':
                return 'G-YJ6VF6K2ST';
            case 'PRD':
            default:
                return 'G-DMMT6VL084';
        }
    }

    /**
        @public @method
        Initializes EzGoogleG4Integration
        @returns {EzGoogleG4Integration}
     */
    ezInit() {
        return EzGoogleG4Integration.ezInstance;
    }

    /**
        @public @method
        Enables the Google G4 by removing the injected scripts and re-injecting the scripts.
        @param {string} env
        Current Enviornment Id
     */
    ezEnable(env) {
        // Disable any existing integration
        EzGoogleG4Integration.ezInstance.ezDisable(env);

        // Inject the integration
        EzGoogleG4Integration.ezInstance.ezInjectGoogleG4(env);
    }

    /**
        @public @method
        Reloads the Google G4 by removing the injected scripts and re-injecting the scripts.
        @param {string} env
        Current Enviornment Id
     */
    ezReload(env) {
        EzGoogleG4Integration.ezInstance.ezDisable();

        EzGoogleG4Integration.ezInstance.ezEnable(env);
    }

    /**
        @public @method
        Disables the Google G4 by removing the injected scripts.
        @param {string} env
     */
    ezDisable(env) {
        if (ezApi.ezclocker.ezUi.ezElementExists('EzGoogleG4Integration_GTagJS')) {
            ezApi.ezclocker.ezUi.ezRemoveElement('EzGoogleG4Integration_GTagJS');
        }

        if (ezApi.ezclocker.ezUi.ezElementExists('EzGoogleG4Integration_DataLayerJS')) {
            ezApi.ezclocker.ezUi.ezRemoveElement('EzGoogleG4Integration_DataLayerJS');
        }
    }

    /**
        @protected @method
        Injects the Google G4 script into the document
        @param {string} env
        Current Enviornment Id
     */
    ezInjectGoogleG4(env) {
        ezApi.ezclocker.ezUi.ezPrependContent(
            'head',
            EzHtml.build`
                <script
                    id="EzGoogleG4Integration_GTagJS"
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-DMMT6VL084">
                </script>
                <script
                    id="EzGoogleG4Integration_DataLayerJS">
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){
                        dataLayer.push(arguments);
                    }
                    gtag('js', new Date());
                    gtag(
                        'config',
                        '${EzGoogleG4Integration.ezInstance.ezDetermineGoogleG4Id(env)}');
                </script>`);
    }


}

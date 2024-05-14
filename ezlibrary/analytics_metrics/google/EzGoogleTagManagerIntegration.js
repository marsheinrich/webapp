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
        import { EzGoogleTagMangerIntegration } from '/ezlibrary/analytics_metrics/google/EzGoogleTagManagerIntegration.js';
    ---------------------------------------------------------------------------
    Singleton instance ready for use when the below evaluates to true:
        globalThis.ezApi.ezclocker[EzGoogleTagMangerIntegration.ezApiName] &&
        globalThis.ezApi.ezclocker[EzGoogleTagMangerIntegration.ezApiName].ready;
    ---------------------------------------------------------------------------
    Listen to onReady event:
        document.addEventListener(
            EzGoogleTagMangerIntegration.ezEventNames.onReady,
            this.#ezRegistrator);
    ---------------------------------------------------------------------------
    Singleton instance:
        ezApi.ezclocker.ezGoogleTagMangerIntegration
    ---------------------------------------------------------------------------
 */
export class EzGoogleTagMangerIntegration extends EzClass {
     /**
        @static
        @public @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'ezGoogleTagMangerIntegration';
    }

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzGoogleTagMangerIntegration_Ready'
        };
    }

    /**
        @static
        @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
        @type {EzGoogleTagMangerIntegration}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzGoogleTagMangerIntegration.ezApiName])
        ? globalThis.ezApi.ezclocker[EzGoogleTagMangerIntegration.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzGoogleTagMangerIntegration}
     */
    static get ezInstance() {
        return EzGoogleTagMangerIntegration.#ezInstance;
    }

    /**
        @static
        @public @property @setter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzGoogleTagMangerIntegration} instance
     */
    static set ezInstance(instance) {
        if (null != EzGoogleTagMangerIntegration.#ezInstance) {
            throw new Error('EzGoogleTagMangerIntegration\'s singleton instance is already reigstered with EzApi.');
        }

        EzGoogleTagMangerIntegration.#ezInstance = instance;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzGoogleTagMangerIntegration.ezApiName])
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
        return EzGoogleTagMangerIntegration.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzGoogleTagMangerIntegration.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzGoogleTagMangerIntegration.ezApiRegistrationState &&
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
        return null != EzGoogleTagMangerIntegration.ezInstance &&
            EzRegistrationState.REGISTERED === EzGoogleTagMangerIntegration.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzGoogleTagMangerIntegration.#ezCanRegister && !EzGoogleTagMangerIntegration.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzGoogleTagMangerIntegration, EzGoogleTagMangerIntegration.ezApiName);
        }

        return EzGoogleTagMangerIntegration.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzGoogleTagMangerIntegration.ezApiName
            2) Property getter EzGoogleTagMangerIntegration.ezEventNames
            3) Property getter EzGoogleTagMangerIntegration.ezInstance
            4) Property setter EzGoogleTagMangerIntegration.ezInstance
            5) Property getter EzGoogleTagMangerIntegration.ezApiRegistrationState
            6) Property setter EzGoogleTagMangerIntegration.ezApiRegistrationState
            7) Property getter EzGoogleTagMangerIntegration.#ezCanRegister
            8) Property getter EzGoogleTagMangerIntegration.#ezIsRegistered
            9) Method EzGoogleTagMangerIntegration.#ezRegistrator()
     */
    static {
        if (!EzGoogleTagMangerIntegration.#ezIsRegistered) {
            EzGoogleTagMangerIntegration.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzGoogleTagMangerIntegration.#ezRegistrator()) {
                document.addEventListener(
                    EzGoogleTagMangerIntegration.ezOnEzApiReadyEventName,
                    EzGoogleTagMangerIntegration.#ezRegistrator);
            }
        }
    }

    /**
        @public @readonly @property
        Gets if the EzGoogleTabManagerIntegration is enabled or not
        @returns {boolean}
     */
    get ezEnabled() {
        return ezApi.ezclocker.ezUi.ezElementExists('EzGoogleTagManager_JS');
    }

    /**
        @protected @method
        Determines the Google G4 Id to use based upon the env
        @param {string} env
        @returns {string}
     */
    ezDetermineGoogleTagManagerContainerId(env) {
        switch (env) {
            case 'DEV':
            case 'QAL':
            case 'E2E':
            case 'PRF':
            case 'LOC':
                return 'GTM-NBV5RCJ';
            case 'PRD':
            default:
                return 'GTM-5WFN8JM';
        }
    }

    /**
        @public @method
        Initializes EzGoogleTagMangerIntegration
        @returns {EzGoogleTagMangerIntegration}
     */
    ezInit() {
        return EzGoogleTagMangerIntegration.ezInstance;
    }

    /**
        @public @method
        Enables the Google G4 by removing the injected scripts and re-injecting the scripts.
        @param {string} env
        Current Enviornment Id
     */
    ezEnable(env) {
        // Disable any existing integration
        EzGoogleTagMangerIntegration.ezInstance.ezDisable();

        // Inject the tag manager
        EzGoogleTagMangerIntegration.ezInstance.ezInjectGoogleTagManager(env);
    }

    /**
        @public @method
        Reloads the Google G4 by removing the injected scripts and re-injecting the scripts.
        @param {string} env
        Current Enviornment Id
     */
    ezReload(env) {
        EzGoogleTagMangerIntegration.ezInstance.ezDisable();

        EzGoogleTagMangerIntegration.ezInstance.ezEnable(env);
    }

    /**
        @public @method
        Disables the Google G4 by removing the injected scripts.
     */
    ezDisable() {
        if (EzBoolean.isTrue(EzGoogleTagMangerIntegration.ezInstance.ezEnabled)) {
            if (ezApi.ezclocker.ezUi.ezElementExists('EzGoogleTagManager_JS')) {
                ezApi.ezclocker.ezUi.ezRemoveElement('EzGoogleTagManager_JS');
            }

            if (ezApi.ezclocker.ezUi.ezElementExists('EzGoogleTagManager_DataLayerJS')) {
                ezApi.ezclocker.ezUi.ezRemoveElement('EzGoogleTagManager_DataLayerJS');
            }
        }
    }

    /**
        @protected @method
        Injects the Google Tag Manager script into the document
        @param {string} env
        Current Enviornment Id
     */
    ezInjectGoogleTagManager(env) {
        let gtagId = EzGoogleTagMangerIntegration.ezInstance.ezDetermineGoogleTagManagerContainerId(env);

        ezApi.ezclocker.ezUi.ezPrependContent(
            'head',
            EzHtml.build`
                <script
                    id="EzGoogleTagManager_JS"
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=${gtagId}">
                </script>
                <script
                    id="EzGoogleTagManager_DataLayerJS">
                    window.dataLayer = window.dataLayer || [];
                    function gtag() {
                        dataLayer.push(arguments);
                    };
                    gtag('js', new Date());
                    gtag('config', '${gtagId}');
                    /* DEFAULT SCRIPT
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    */
                    })(window,document,'script','dataLayer','${gtagId}');
                </script>`);
    }
}

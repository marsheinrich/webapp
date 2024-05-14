import {
    EzObject,
    EzBoolean,
    EzString,
    EzConsole,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
import { EzUrlHelper } from '/public/javascript/common/ezclocker-url-helper2.js';

import { EzClockerVersionInfo } from '/ezlibrary/entities/EzClockerVersionInfo.js';

/**
    @class
    @extends {EzClass}
    @description
    Determines if the current page is using the latest version param. If not, the page is re-loaded with the
    correct version param.
    ---------------------------------------------------------------------------
    Import with:
        import { EzVersionChecker } from '/ezlibrary/EzVersionChecker.js';
    ---------------------------------------------------------------------------
    Ready check:
        globalThis.ezApi.ezclocker[EzVersionChecker.ezApiName] &&
        globalThis.ezApi.ezclocker[EzVersionChecker.ezApiName].ready
    ---------------------------------------------------------------------------
    Ready event hook:
        document.addEventListener(
            EzVersionChecker.ezEventNames.onReady,
            this.#ezRegistrator);
    ---------------------------------------------------------------------------
 */
export class EzVersionChecker extends EzClass {
    /*
        @static
        @public @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
    */
    static ezApiName = 'ezVersionChecker';

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static ezEventNames = {
        onReady: 'ezOn_EzVersionChecker_Ready'
    };

    /**
        @static
        @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
        @type {EzVersionChecker}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzVersionChecker.ezApiName])
        ? globalThis.ezApi.ezclocker[EzVersionChecker.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzVersionChecker}
     */
    static get ezInstance() {
        return EzVersionChecker.#ezInstance;
    }

    /**
        @static
        @public @property @setter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzVersionChecker} instance
     */
    static set ezInstance(instance) {
        if (null != EzVersionChecker.#ezInstance) {
            throw new Error('EzVersionChecker\'s singleton instance is already reigstered with EzApi.');
        }

        EzVersionChecker.#ezInstance = instance;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzVersionChecker.ezApiName])
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
        return EzVersionChecker.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzVersionChecker.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzVersionChecker.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            // Optional other dependencies needed before this class initializes:
            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUrlHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUrlHelper.ezApiName].ready;
    }

    /**
        @static
        @private @readonly @property
        Returns if this class's singleton instance is registered with ezApi yet.
        @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzVersionChecker.ezInstance &&
            EzRegistrationState.REGISTERED === EzVersionChecker.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzVersionChecker.#ezCanRegister && !EzVersionChecker.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzVersionChecker, EzVersionChecker.ezApiName);
        }

        return EzVersionChecker.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzVersionChecker.ezApiName
            2) Property getter EzVersionChecker.ezEventNames
            3) Property getter EzVersionChecker.ezInstance
            4) Property setter EzVersionChecker.ezInstance
            5) Property getter EzVersionChecker.ezApiRegistrationState
            6) Property setter EzVersionChecker.ezApiRegistrationState
            7) Property getter EzVersionChecker.#ezCanRegister
            8) Property getter EzVersionChecker.#ezIsRegistered
            9) Method EzVersionChecker.#ezRegistrator()
     */
    static {
        if (!EzVersionChecker.#ezIsRegistered) {
            EzVersionChecker.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzVersionChecker.#ezRegistrator()) {
                document.addEventListener(
                    EzVersionChecker.ezOnEzApiReadyEventName,
                    EzVersionChecker.#ezRegistrator);

                // Other ready listeners as needed
                // If a dependency ready check is added to the #ezCanRegister()
                // then the ready listener will need added here as well.
                document.addEventListener(
                    EzHttpHelper.ezEventNames.onReady,
                    EzVersionChecker.#ezRegistrator);

                document.addEventListener(
                    EzUrlHelper.ezEventNames.onReady,
                    EzVersionChecker.#ezRegistrator);
            }
        }
    }

    /**
        @public @constructor
        >> DO NOT CREATE NEW INSTANCES OUTSIDE OF THE STATIC INITIALIZATION FLOW <<
        Use the static singleton instance available from ezApi: ezApi.ezclocker.ezVersionChecker.
    */
    constructor() {
        super();
    }

    ezVersionInfo = null;

    /**
        @protected @method
        Initializes EzVersionChecker
        @returns {EzVersionChecker}
     */
    ezInit() {
        EzVersionChecker.ezInstance.ezGetEzClockerVersion()
            .then(EzVersionChecker.ezInstance.ezVerifyPageVersion);

        return EzVersionChecker.ezInstance;
    }

    /**
        @public @method
        Loads the EzClockerVersionInfo from the version.properties file
        @returns Promise.resolve
     */
    ezGetEzClockerVersion() {
        window.document.body.style.display = 'none';

        return EzPromise.asyncAction(
            (finished) => {
                ezApi.ezclocker.ezHttpHelper.ezGet('/version.properties')
                    .then(
                        (response) => {
                            if (EzString.isString(response)) {
                                EzVersionChecker.ezInstance.ezVersionInfo = new EzClockerVersionInfo(response);
                            } else {
                                EzVersionChecker.ezInstance.ezVersionInfo = new EzClockerVersionInfo();

                                EzVersionChecker.ezInstance.ezVersionInfo.websiteVersion = EzString.stringOrDefault(response.websiteVersion, 'r72-3');

                                EzVersionChecker.ezInstance.ezVersionInfo.servicesVersion = EzString.stringOrEmpty(response.servicesVersion);

                                EzVersionChecker.ezInstance.ezVersionInfo.version = EzString.stringOrEmpty(response.version);

                                EzVersionChecker.ezInstance.ezVersionInfo.build = EzString.stringOrEmpty(response.build);

                                EzVersionChecker.ezInstance.ezVersionInfo.ezClockerEnvironment = EzString.stringOrEmpty(response.ezClockerEnvironment);

                                EzVersionChecker.ezInstance.ezVersionInfo.ezClockerEnv = EzString.stringOrEmpty(response.ezClockerEnv);

                                EzVersionChecker.ezInstance.ezVersionInfo.buildDate = EzString.stringOrEmpty(response.buildDate);

                                EzVersionChecker.ezInstance.ezVersionInfo.branch = EzString.stringOrEmpty(response.branch);
                            }

                            return finished();
                        },
                        (eResponse) => {
                            EzVersionChecker.ezInstance.ezVersionInfo = new EzClockerVersionInfo();

                            EzConsole.error(
                                EzString.em`
                                    Unable to load the version.properties information.
                                    Error response: ${eResponse}`);

                            return finished();
                        });
            });
    }

    /**
        @public @method
        Verifies the current page has the current version param. If not,
        the page is reloaded with the correct version param.
        @returns {boolean}
        Returns true if the page has the correct version param. False otherwise.
     */
    ezVerifyPageVersion() {
        if (ezApi.ezclocker.ezUrlHelper.getVersionParam() === EzVersionChecker.ezInstance.ezVersionInfo.build) {
            window.document.body.style.display = '';
            return true;
        }

        let updatedUrl = ezApi.ezclocker.ezUrlHelper.ezReplaceUrlParam(
            window.location.href,
            'v',
            EzVersionChecker.ezInstance.ezVersionInfo.build);

        window.location.assign(updatedUrl);

        return false;
    }
}

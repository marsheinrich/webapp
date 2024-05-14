import { EzClass } from '/ezlibrary/EzClass.js';

import { EzRegistrationState } from '/ezlibrary/enums/EzEnumerations.js';

import { EzDateTime } from '/public/javascript/common/ez-date-time.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';
import { EzUI } from '/public/javascript/common/ezui.js';
import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

export class EzReleaseVersionCheck extends EzClass {
    /**
        @public @static @field
        @type {EzClockerContext}
     */
    static #ezInstance = Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
        globalThis.ezApi &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi, 'ezclocker') &&
        globalThis.ezApi.ezclocker &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi.ezclocker, EzReleaseVersionCheck.ezApiName) &&
        globalThis.ezApi.ezclocker[EzReleaseVersionCheck.ezApiName]
        ? globalThis.ezApi.ezclocker[EzReleaseVersionCheck.ezApiName]
        : null;

    /**
        @public @static @field
        @type {String}
        Acceptable values: null, 'PENDING', 'REGISTERED'
     */
    static #ezApiRegistrationState = Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
        globalThis.ezApi &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi, 'ezclocker') &&
        globalThis.ezApi.ezclocker &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi.ezclocker, EzReleaseVersionCheck.ezApiName) &&
        globalThis.ezApi.ezclocker[EzReleaseVersionCheck.ezApiName]
        ? EzRegistrationState.REGISTERED
        : null;

    /**
        @public @static @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'ezReleaseVersionCheck';
    }

    /**
        @public @static @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzReleaseVersionCheck_Ready'
        };
    }

    /**
        @public @static @property @getter
        Returns the ezApi registration state of this classes's singleton instance.
        @returns {string}
        A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzReleaseVersionCheck.#ezApiRegistrationState;
    }

    /**
        @public @static @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzReleaseVersionCheck.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
        @public @static @getter @property
        Returns the singleton instance of EzDateTime registered with EzApi (if available yet)
        @param {EzClockerContext}
     */
    static get ezInstance() {
        return EzReleaseVersionCheck.#ezInstance;
    }

    /**
        @public @static @getter @property
        Returns the singleton instance of EzDateTime registered with EzApi (if available yet)
     */
    static set ezInstance(ezReleaseVersionCheck) {
        if (null != EzReleaseVersionCheck.#ezInstance) {
            throw new Error('EzReleaseVersionCheck\'s singleton instance is already reigstered with EzApi.');
        }

        EzReleaseVersionCheck.#ezInstance = ezReleaseVersionCheck;
    }

    /**
        @public @static @readonly @property
        Returns if all necessary dependences are ready and therefore it is ok for this class to
        register it's singleton instance with ezApi.
        @returns {boolean}
     */
    static get ezCanRegister() {
        return EzRegistrationState.PENDING === EzReleaseVersionCheck.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzDateTime.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDateTime.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzDialog.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDialog.ezApiName].ready;
    }

    /**
        @private @static @readonly @property
        Returns if this class's singleton instance is registered with ezApi yet.
        @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzReleaseVersionCheck.ezInstance &&
            EzRegistrationState.REGISTERED === EzReleaseVersionCheck.ezApiRegistrationState;
    }

    /**
        @private @static @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzReleaseVersionCheck.ezCanRegister && !EzReleaseVersionCheck.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzReleaseVersionCheck, EzReleaseVersionCheck.ezApiName);
        }

        return EzRegistrationState.REGISTERED === EzReleaseVersionCheck.ezApiRegistrationState;
    }

    /**
        @static
        Static Initializer
     */
    static {
        if (!EzReleaseVersionCheck.#ezIsRegistered) {
            EzReleaseVersionCheck.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzReleaseVersionCheck.#ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    EzReleaseVersionCheck.#ezRegistrator);

                document.addEventListener(
                    EzDateTime.ezEventNames.onReady,
                    EzReleaseVersionCheck.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzReleaseVersionCheck.#ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.onReady,
                    EzReleaseVersionCheck.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzReleaseVersionCheck.#ezRegistrator);

                document.addEventListener(
                    EzDialog.ezEventNames.onReady,
                    EzReleaseVersionCheck.#ezRegistrator);
            }
        }
    }

    /**
        @public @constructor
     */
    constructor() {
        super();
    }

    ezInit() {
        return EzReleaseVersionCheck.ezInstance;
    }
}

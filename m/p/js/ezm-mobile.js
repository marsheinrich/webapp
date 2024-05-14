import { detect } from 'detect-browser';

import {
    EzException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzNumber,
    EzString
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzmNavigator } from '/m/p/js/ezm-navigation.js';

/**
 * @class
 * @extends {EzClass}
 * Provides various utilities for the mobile site
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *      import { EzmMobileHelper } from '/m/p/js/ezm-navigation.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Check ready state:
 *      globalThis.ezApi.ezclocker?.[EzmMobileHelper.ezApiName]?.ready
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Listen for ready event:
 *      document.addEventListener(
 *          EzmMobileHelper.ezEventNames.onReady,
 *          {listening_class}.#ezRegistrator);
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Access singleton instance:
 *      Within EzmMobileHelper: EzmMobileHelper.ezInstance
 *      Outside of EzmMobileHelper: ezApi.ezclocker.EzmMobileHelper
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzmMobileHelper extends EzClass {
    /**
     * @private @field
     * Stores
     * Default: 0
     * @type {number}
     */
    #pageWaitCount = 0;
    /**
     * @public @property @getter
     * Gets
     * @returns {number}
     */
    get pageWaitCount() {
        return this.#pageWaitCount;
    }
    /**
     * @public @property @setter
     * Sets
     * @param {number} pageWaitCount
     */
    set pageWaitCount(pageWaitCount) {
        this.#pageWaitCount = EzNumber.numberOrZero(pageWaitCount);
    }

    /**
     * @public @readonly @property
     * Gets if the current browser was detected as an Andriod mobile device.
     * @returns {boolean}
     */
    get isAndriodDevice() {
        return ezApi.ezclocker.ezmMobileHelper.context.mobile &&
            0 <= ezApi.ezclocker.ezmMobileHelper.context.os.indexOf('Android');
    }
    /**
     * @public @method
     * Returns if the current browser was detected as an Andriod mobile device.
     * @returns {boolean}
     * @deprecated since 2024.01.05;
     * Migrate to: ezApi.ezclocker.ezmMobileHelper.isAndriodDevice
     */
    ezmIsAndriod() {
        return EzmMobileHelper.ezInstance.isAndriodDevice;
    }

    /**
     * @public @readonly @property
     * Gets if the current browser was detected as an Andriod mobile device.
     * @returns {boolean}
     */
    get isIOSDevice() {
        return ezApi.ezclocker.ezmMobileHelper.context.mobile &&
            (ezApi.ezclocker.ezmMobileHelper.context.os.indexOf('Mac') >= 0 ||
                0 <= ezApi.ezclocker.ezmMobileHelper.context.os.indexOf('OS X'));
    }
    /**
     * @public @method
     * Original: isMobileiOS
     * @returns {boolean}
     * @deprecated since 2024.01.05;
     * Migrate to: ezApi.ezclocker.ezmMobileHelper.isIOSDevice
     */
    ezmIsIos() {
        return EzmMobileHelper.ezInstance.isIOSDevice;
    }

    /**
     * @public @readonly @property
     * Gets the reference to the globalThis.window object or a 'fake' window object if not available.
     * @returns {object}
     */
    get ezmWindow() {
        return globalThis?.window
            ? globalThis.window
            : {
                location: this.ezmWindowLocation,
                console: this.ezmWindowConsole
            };
    }

    /**
     * @public @readonly @property
     * Gets the reference to the globalThis.window.console object or a 'fake' console object if not available.
     * @returns {string}
     */
    get ezmConsole() {
        return globalThis?.window?.console
            ? globalThis.window.console
            : {
                assert: EzFunction.dummyFunction,
                clear: EzFunction.dummyFunction,
                context: EzFunction.dummyFunction,
                count: EzFunction.dummyFunction,
                countReset: EzFunction.dummyFunction,
                createTask: EzFunction.dummyFunction,
                debug: EzFunction.dummyFunction,
                dir: EzFunction.dummyFunction,
                dirxml: EzFunction.dummyFunction,
                error: EzFunction.dummyFunction,
                group: EzFunction.dummyFunction,
                groupCollapsed: EzFunction.dummyFunction,
                groupEnd: EzFunction.dummyFunction,
                info: EzFunction.dummyFunction,
                log: EzFunction.dummyFunction,
                memory: {
                    totalJSHeapSize: 0,
                    usedJSHeapSize: 0,
                    jsHeapSizeLimit: 0
                },
                profile: EzFunction.dummyFunction,
                profileEnd: EzFunction.dummyFunction,
                table: EzFunction.dummyFunction,
                time: EzFunction.dummyFunction,
                timeEnd: EzFunction.dummyFunction,
                timeLog: EzFunction.dummyFunction,
                timeStamp: EzFunction.dummyFunction,
                trace: EzFunction.dummyFunction,
                warn: EzFunction.dummyFunction,
            };
    }

    /**
     * @public @readonly @property
     * Gets the reference to the globalThis.window.location object or a 'fake' location object if not available.
     * @returns {string}
     */
    get ezmLocation() {
        return globaclThis?.window?.location
            ? globalThis.window.location
            : {
                ancestorOrigins: [],
                assign: EzFunction.dummyFunction,
                href: EzString.EMPTY,
                origin: EzString.EMPTY,
                protocol: EzString.EMPTY,
                host: EzString.EMPTY,
                hostname: EzString.EMPTY,
                port: EzString.EMPTY,
                pathname: EzString.EMPTY,
                search: EzString.EMPTY,
                hash: EzString.EMPTY,
                reload: EzFunction.dummyFunction,
                replace: EzFunction.dummyFunction,
                valueOf: EzFunction.dummyFunction
            };
    }

    /**
     * @public @readonly @property
     * Gets the reference to globalThis.$.mobile (jQuery Mobile) if available.
     * @returns {object}
     */
    get ezm$() {
        if (!globalThis?.$?.mobile) {
            throw new EzException('JQuery Mobile reference ($.mobile) is not currently available.');
        }

        return globalThis.$.mobile;
    }

    /**
     * @public @readonly @property
     * Gets the reference to globalThis.$ (jQuery) if available.
     * @returns {object}
     */
    get ez$() {
        if (!globalThis?.$) {
            throw new EzException('JQuery reference is not currently available.');
        }

        return globalThis.$;
    }

    /**
     * @public @readonly @property
     * Gets the current browser context from detect-browser's detect() method.
     * See: https://github.com/DamonOehlman/detect-browser
     * @returns {object}
     * Return Object template: {
     *      type: {string},
     *      name: {string},
     *      version: {string},
     *      os: {string},
     *      bot: {string}
     * }
     */
    get browserContext() {
        return detect();
    }
    /**
     * @public @readonly @property
     * Gets the current browser context from call to browser()
     * @returns {object}
     * Return Object template: {
     *      name: {string},
     *      version: {string},
     *      versionNumber: {number},
     *      mobile: {boolean},
     *      os: {string}
     * }
     * @deprecated since 2024.01.05;
     * Migrate to: ezApi.ezclocker.ezmMobileHelper.browserContext
     */
    get context() {
        return this.browserContext;
    }

    /**
     * @public @readonly @property
     * Gets message: 'You may try again in a few minutes.'
     * @returns {string}
     */
    get ezYouMayTryAgainMsg() {
        return 'You may try again in a few minutes.';
    }

    /**
     * @public @readonly @property
     * Gets message: 'If you continue to receive an error please contact ezClocker support at support@ezclocker.com for assistance.
     * @returns {string}
     */
    get ezErrorContinuesContactSupportMsg() {
        return 'If you continue to receive an error please contact ezClocker support at support@ezclocker.com for assistance.';
    }

    /**
     * @public @readonly @property
     * Gets message: 'We do appologize for this disruption.'
     * @returns {string}
     */
    get ezAppologizeForThisDisruptionMsg() {
        return 'We do appologize for this disruption.';
    }

    /**
     * @public @readonly @property
     * Gets message:
     *      EzHtml.build`
     *          ${this.ezBuildClockerTantrumMsg('and refuses to sign you up at this time!')}
     *          ${this.ezYouMayTryAgainMsg}
     *          ${this.ezErrorContinuesContactSupportMsg}
     *          ${this.ezAppologizeForThisDisruptionMsg}`
     * @returns {string}
     */
    get uhOhMessageSignUp() {
        return EzString.build`
            ${this.ezBuildClockerTantrumMsg('and refuses to sign you up at this time!')}
            ${this.ezYouMayTryAgainMsg}
            ${this.ezErrorContinuesContactSupportMsg}
            ${this.ezAppologizeForThisDisruptionMsg}`;
    }

    /**
     * @public @method
     * Initializes EzmMobileHelper
     * @returns {EzmMobileHelper}
     */
    ezInit() {
        return EzmMobileHelper.ezInstance;
    }

    /**
     * @public @method
     * Builds the 'uh oh' tantrum funny general error message.
     * @param {undefined|null|string} failedAction
     * Appended to the end of 'Uh oh...ezClocker is throwing a tantrum at the moment '
     * If not provided, the sentence is completed with the '!' character.
     * Default: '!'
     * @returns {string}
     */
    ezBuildClockerTantrumMsg(failedAction = "!") {
        return `Uh oh...ezClocker is throwing a tantrum at the moment ${EzString.stringOrDefault(failedAction, '!')}`;
    }

    /**
     * @public @method
     * Original: showWaitSpinner, showMobileWaitSpinner
     * @param {string} message
     */
    ezmStartPageWait(message) {
        if (0 !== EzmMobileHelper.ezInstance.pageWiatCount) {
            EzmMobileHelper.ezInstance.ezm$.loading('hide');
        }

        EzmMobileHelper.ezInstance.ezm$.loading(
            'show',
            {
                text: EzString.stringOrDefault(
                    message,
                    'Please wait ...'),
                textVisible: true,
                theme: 'a',
                html: ''
            });

        EzmMobileHelper.ezInstance.pageWaitCount++;
    }

    /**
     * @public @method
     * Original: hideMobileWaitSpinner, hideWaitSpinner
     */
    ezmStopPageWait() {
        EzmMobileHelper.ezInstance.pageWaitCount--;

        if (0 >= EzmMobileHelper.ezInstance.pageWaitCount) {
            EzmMobileHelper.ezInstance.ezm$.loading('hide');

            EzmMobileHelper.ezInstance.pageWaitCount = 0;
        }
    }

    /**
     * @public @method
     * Starts the mobile wait spinner. After the spinner starts the provided functionToExecute reference is called
     * with one param known as the waitDone function callback. The waitDone param is a call back function
     * that will hide the spinner when called.
     *
     * If the provided functionToExecute is not a valid function, then a return of false is returned and
     * the spinner is not shown.
     *
     * Example:
     * <code>
     * return ezApi.ezclocker.ezSpinner.ezStartPageWaitExecute('Please wait ...', function(waitDone) {
     *      // do some work here ...
     *
     *      // Finally, call the provided waitDone() callback to close the spinner.
     *      waitDone();
     * });
     * </code>
     *
     * @param {string} message
     * @param {function} functionToExecute
     *
     * @returns {*}
     * Returns the result of the provided functionToExecute or false if the provided functionToExecute was not
     * a valid function.
     */
    ezmStartPageWaitExecute(message, functionToExecute) {
        if (!EzFunction.isFunction(functionToExecute)) {
            return false;
        }

        EzmMobileHelper.ezInstance.ezmStartPageWait(message);

        return functionToExecute(EzmMobileHelper.ezInstance.ezmStopPageWait);
    }

    /**
     * @public @method
     * Refreshes JQuery mobile
     */
    ezmRefreshJqueryMobile() {
        if (!EzmMobileHelper.ezInstance.ez$) {
            EzmMobileHelper.ezInstance.ezmConsole.error(
                '[EzClockerLoader]:[ezRefreshJqueryMobile]: jQuery is not yet available for the page.');

            return;
        }

        if (!EzmMobileHelper.ezInstance.ezm$) {
            EzmMobileHelper.ezInstance.ezmConsole.error(
                '[EzClockerLoader]:[ezRefreshJqueryMobile]: jQuery Mobile is not yet available for the page.');

            return;
        }

        EzmMobileHelper.ezInstance.ezm$.changePage(
            EzmMobileHelper.ezInstance.ezmLocation.href,
            {
                allowSamePageTransition: true,
                transition: 'none',
                reloadPage: true
            });
    }

    /**
     * @public @method
     * Signs out of ezClocker
     * @deprecated since 2024.01.05;
     * Migrate to: ezApi.ezclocker.ezmNavigator.ezSignOut()
     */
    ezmSignOut() {
        ezApi.ezclocker.ezmNavigator.signOut();
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
     * Gets the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezmMobileHelper';
    }

    /**
     * @static
     * @public @readonly @property
     * Gets an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzmMobileHelper_Ready'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzmMobileHelper}
     */
    static #ezInstance = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzmMobileHelper.ezApiName]
        ? globalThis.ezApi.ezclocker[EzmMobileHelper.ezApiName]
        : null;
    /**
     * @static
     * @public @property @getter
     * Gets the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzmMobileHelper}
     */
    static get ezInstance() {
        return EzmMobileHelper.#ezInstance;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzmMobileHelper} instance
     */
    static set ezInstance(instance) {
        if (null != EzmMobileHelper.#ezInstance) {
            throw new Error('EzmMobileHelper\'s singleton instance is already reigstered with EzApi.');
        }

        EzmMobileHelper.#ezInstance = instance;
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
    static #ezApiRegistrationState = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzmMobileHelper.ezApiName]
        ? EzRegistrationState.REGISTERED
        : null;
    /**
     * @static
     * @public @property @getter
     * Gets the ezApi registration state of this classes's singleton instance.
     * @returns {string}
     * A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzmMobileHelper.#ezApiRegistrationState;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzmMobileHelper.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @static
     * @private @readonly @property
     * Gets true when all required dependencies for this class report ready.
     * In otherwords, the require dependency's singleton instance is created
     * and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzmMobileHelper?.ezApiRegistrationState &&
            globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker &&
            globalThis.ezApi.ezclocker?.[EzmNavigator.ezApiName]?.ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Gets if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzmMobileHelper.ezInstance &&
            EzRegistrationState.REGISTERED === EzmMobileHelper.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzmMobileHelper.#ezCanRegister && !EzmMobileHelper.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(
                EzmMobileHelper,
                EzmMobileHelper.ezApiName,
                false,
                [EzmMobileHelper.ezApiShortName]);
        }

        return EzmMobileHelper.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzmMobileHelper.ezApiName
     *     2) Property getter EzmMobileHelper.ezEventNames
     *     3) Property getter EzmMobileHelper.ezInstance
     *     4) Property setter EzmMobileHelper.ezInstance
     *     5) Property getter EzmMobileHelper.ezApiRegistrationState
     *     6) Property setter EzmMobileHelper.ezApiRegistrationState
     *     7) Property getter EzmMobileHelper.#ezCanRegister
     *     8) Property getter EzmMobileHelper.#ezIsRegistered
     *     9) Method EzmMobileHelper.#ezRegistrator()
     */
    static {
        if (!EzmMobileHelper.#ezIsRegistered) {
            EzmMobileHelper.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzmMobileHelper.#ezRegistrator()) {
                document.addEventListener(
                    EzmMobileHelper.ezOnEzApiReadyEventName,
                    EzmMobileHelper.#ezRegistrator);

                document.addEventListener(
                    EzmNavigator.onReady,
                    EzmMobileHelper.#ezRegistrator);
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
import {
    EzString,
    EzHtml,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzBrowserInfo } from '/public/javascript/common/ezclocker-mobile-helper.js';

import { EzUrlHelper } from '/public/javascript/common/ezclocker-url-helper2.js';

import { EzUI } from '/public/javascript/common/ezui.js';
import { EzmNavigator } from '/m/p/js/ezm-navigation.js';

/**
 * @class
 * @extends {EzClass}
 * Provides various mobile site navigation utilities
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *      import { EzDownloadMobileAppViewController } from '/m/p/download/ez-download-mobile-app-view-controller.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Check ready state:
 *      globalThis.ezApi.ezclocker?.[EzDownloadMobileAppViewController.ezApiName]?.ready
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Listen for ready event:
 *      document.addEventListener(
 *          EzDownloadMobileAppViewController.ezEventNames.onReady,
 *          {listening_class}.#ezRegistrator);
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Access singleton instance:
 *      Within EzDownloadMobileAppViewController: EzDownloadMobileAppViewController.ezInstance
 *      Outside of EzDownloadMobileAppViewController: ezApi.ezclocker.ezDownloadMobileAppViewController
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzDownloadMobileAppViewController extends EzClass {
    /**
     * @public @readonly @property
     * Gets the name of the view this class is controlling.
     * @returns {string}
     */
    get ezViewName() {
        return 'EzDownloadMobileApp';
    }

    /**
     * @public @readonly @property
     * Gets an object of key = element id for commonly referenced HTML elements.
     * @returns {object}
     */
    get ezIds() {
        return {
            containers: {
                subHeaderContainerId: `${this.ezViewName}_SubHeaderContainer`,
            },
            buttons: {
                downloadGooglePlayAppButtonId: `${this.ezViewName}_DownloadGooglePlayApp_Button`,
                downloadAppleAppStoreAppButtonId: `${this.ezViewName}_DownloadAppleAppStoreApp_Button`
            },
            other: {
                howToSignInInfoId: `${this.ezViewName}_HowToSignInInfo`
            }
        };
    }

    /**
     * @public @readonly @property
     * Gets the Download mobile app view's sub-header UX HTML
     * @returns {string}
     */
    get ezBuildSubHeaderHtml() {
        let subHeaderHtml = EzHtml.build`
            <p
                id="${EzDownloadMobileAppViewController.ezInstance.ezIds.other.howToSignInInfoId}">
                Congradulations! You have successfully accepted your employer's invite to use ezClocker!
            </p>
            <h2
                id="${EzDownloadMobileAppViewController.ezInstance.ezIds.other.howToSignInInfoId}_NextStepsHeader">
                Next Steps
            </h3>
            <ol
                id="${EzDownloadMobileAppViewController.ezInstance.ezIds.other.howToSignInInfoId}_NextStepsList">
                <li
                    id=${EzDownloadMobileAppViewController.ezInstance.ezIds.other.howToSignInInfoId}_NextStepsList_Step1">
                    First, download the mobile app from your mobile device's app store by tapping the app store badge below.
                </li>`;

        let userNameParamValue = ezApi.ezclocker.ezUrlHelper.getUserNameParam(true);

        subHeaderHtml = EzString.hasLength(userNameParamValue)
            ? EzHtml.build`
                ${subHeaderHtml}
                    <li
                        id=${EzDownloadMobileAppViewController.ezInstance.ezIds.other.howToSignInInfoId}_NextStepsList_Step2">
                        Finally, launch the ezClocker app and sign in with the user name <span style="font-weight:bold">${userNameParamValue}</span> and the `
            : EzHtml.build`
                ${subHeaderHtml}
                    <li
                        id=${EzDownloadMobileAppViewController.ezInstance.ezIds.other.howToSignInInfoId}_NextStepsList_Step2">
                        Finally, launch the ezClocker app and sign in with the user name and `;

        return EzHtml.build`
            ${subHeaderHtml}
                    password you created when you accepted the invite.
                    </li>
                </ul>
            </ol>`;
    }

    /**
     * @public @method
     * Initializes EzDownloadMobileAppViewController
     * @returns {EzDownloadMobileAppViewController}
     */
    ezInit() {
        EzDownloadMobileAppViewController.ezInstance.ezInitUx();

        return EzDownloadMobileAppViewController.ezInstance;
    }

    /**
     * @public @method
     * Initializes the view's UX
     */
    ezInitUx() {
        ezApi.ezclocker.ezUi.ezSetElementAttribute(
            EzDownloadMobileAppViewController.ezInstance.ezIds.buttons.downloadGooglePlayAppButtonId,
            'href',
            ezApi.ezclocker.ezmNav.ANDRIOD_BUSINESS_APPSTORE_URL);

        if (ezApi.ezclocker.ezBrowserInfo.isiOSDevice()) {
            ezApi.ezclocker.ezUi.ezHideElement(
                EzDownloadMobileAppViewController.ezInstance.ezIds.buttons.downloadGooglePlayAppButtonId);
        }

        ezApi.ezclocker.ezUi.ezSetElementAttribute(
            EzDownloadMobileAppViewController.ezInstance.ezIds.buttons.downloadAppleAppStoreAppButtonId,
            'href',
            ezApi.ezclocker.ezmNav.IPHONE_BUSINESS_APPSTORE_URL);

        if (ezApi.ezclocker.ezBrowserInfo.isAndriodDevice()) {
            ezApi.ezclocker.ezUi.ezHideElement(
                EzDownloadMobileAppViewController.ezInstance.ezIds.buttons.downloadAppleAppStoreAppButtonId);
        }

        EzDownloadMobileAppViewController.ezInstance.ezUpdateUxState()
            .then(EzPromise.ignoreResolve);
    }

    /**
     * @public @method
     * Updates the mobile download view's UX state
     */
    ezUpdateUxState() {
        return EzPromise.asyncAction(
            (finished) => {
                ezApi.ezclocker.ezUi.ezContent(
                    EzDownloadMobileAppViewController.ezInstance.ezIds.containers.subHeaderContainerId,
                    EzDownloadMobileAppViewController.ezInstance.ezBuildSubHeaderHtml);

                return finished();
            });
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
        return 'ezDownloadMobileAppViewController';
    }

    /**
     * @static
     * @public @readonly @property
     * Gets an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzDownloadMobileAppViewController_Ready'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzDownloadMobileAppViewController}
     */
    static #ezInstance = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzDownloadMobileAppViewController.ezApiName]
        ? globalThis.ezApi.ezclocker[EzDownloadMobileAppViewController.ezApiName]
        : null;
    /**
     * @static
     * @public @property @getter
     * Gets the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzDownloadMobileAppViewController}
     */
    static get ezInstance() {
        return EzDownloadMobileAppViewController.#ezInstance;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzDownloadMobileAppViewController} instance
     */
    static set ezInstance(instance) {
        if (null != EzDownloadMobileAppViewController.#ezInstance) {
            throw new Error('EzDownloadMobileAppViewController\'s singleton instance is already reigstered with EzApi.');
        }

        EzDownloadMobileAppViewController.#ezInstance = instance;
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
    static #ezApiRegistrationState = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzDownloadMobileAppViewController.ezApiName]
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
        return EzDownloadMobileAppViewController.#ezApiRegistrationState;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzDownloadMobileAppViewController.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzDownloadMobileAppViewController?.ezApiRegistrationState &&
            globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker &&
            globalThis.ezApi.ezclocker?.[EzmNavigator.ezApiName]?.ready &&
            globalThis.ezApi.ezclocker?.[EzUI.ezApiName]?.ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Gets if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzDownloadMobileAppViewController.ezInstance &&
            EzRegistrationState.REGISTERED === EzDownloadMobileAppViewController.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzDownloadMobileAppViewController.#ezCanRegister && !EzDownloadMobileAppViewController.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(
                EzDownloadMobileAppViewController,
                EzDownloadMobileAppViewController.ezApiName,
                false,
                [EzDownloadMobileAppViewController.ezApiShortName]);
        }

        return EzDownloadMobileAppViewController.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzDownloadMobileAppViewController.ezApiName
     *     2) Property getter EzDownloadMobileAppViewController.ezEventNames
     *     3) Property getter EzDownloadMobileAppViewController.ezInstance
     *     4) Property setter EzDownloadMobileAppViewController.ezInstance
     *     5) Property getter EzDownloadMobileAppViewController.ezApiRegistrationState
     *     6) Property setter EzDownloadMobileAppViewController.ezApiRegistrationState
     *     7) Property getter EzDownloadMobileAppViewController.#ezCanRegister
     *     8) Property getter EzDownloadMobileAppViewController.#ezIsRegistered
     *     9) Method EzDownloadMobileAppViewController.#ezRegistrator()
     */
    static {
        if (!EzDownloadMobileAppViewController.#ezIsRegistered) {
            EzDownloadMobileAppViewController.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzDownloadMobileAppViewController.#ezRegistrator()) {
                document.addEventListener(
                    EzDownloadMobileAppViewController.ezOnEzApiReadyEventName,
                    EzDownloadMobileAppViewController.#ezRegistrator);

                document.addEventListener(
                    EzBrowserInfo.onReady,
                    EzDownloadMobileAppViewController.#ezRegistrator);

                document.addEventListener(
                    EzUrlHelper.onReady,
                    EzDownloadMobileAppViewController.#ezRegistrator);

                document.addEventListener(
                    EzUI.onReady,
                    EzDownloadMobileAppViewController.#ezRegistrator);

                document.addEventListener(
                    EzmNavigator.onReady,
                    EzDownloadMobileAppViewController.#ezRegistrator);
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

import {
    EzObject,
    EzBoolean,
    EzHtml,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzElementEventName
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';
import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

import { EzUI } from '/public/javascript/common/ezui.js';

import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

import { EzDebug } from '/public/javascript/common/ezclocker-debug.js';

/**
    @class
    @extends {EzClass}
    @description
    Account page debugger tools
    ---------------------------------------------------------------------------
    Import with:
        import { EzAccountDebugTools } from '/secure/account/EzAccountDebugTools.js';
    ---------------------------------------------------------------------------
    Singleton instance ready for use when the below evaluates to true:
        // Can register
        globalThis.ezApi.ezclocker[EzAccountDebugTools.ezApiName] &&
        globalThis.ezApi.ezclocker[EzAccountDebugTools.ezApiName].ready;
    ---------------------------------------------------------------------------
    Listen to onReady event:
        document.addEventListener(
            EzAccountDebugTools.ezEventNames.onReady,
            this.#ezRegistrator);
    ---------------------------------------------------------------------------
    Singleton Instance Reference:
        ezApi.ezclocker.ezAccountDebugTools
    ---------------------------------------------------------------------------
 */
export class EzAccountDebugTools extends EzClass {
    /**
        @static
        @public @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'ezAccountDebugTools';
    }

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzAccountDebugTools_Ready'
        };
    }

    /**
        @static
        @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
        @type {EzAccountDebugTools}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzAccountDebugTools.ezApiName])
        ? globalThis.ezApi.ezclocker[EzAccountDebugTools.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzAccountDebugTools}
     */
    static get ezInstance() {
        return EzAccountDebugTools.#ezInstance;
    }

    /**
        @static
        @public @property @setter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzAccountDebugTools} instance
     */
    static set ezInstance(instance) {
        if (null != EzAccountDebugTools.#ezInstance) {
            throw new Error('EzAccountDebugTools\'s singleton instance is already reigstered with EzApi.');
        }

        EzAccountDebugTools.#ezInstance = instance;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzAccountDebugTools.ezApiName])
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
        return EzAccountDebugTools.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzAccountDebugTools.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzAccountDebugTools.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzDialog.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDialog.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzDebug.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDebug.ezApiName].ready;
    }

    /**
        @static
        @private @readonly @property
        Returns if this class's singleton instance is registered with ezApi yet.
        @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzAccountDebugTools.ezInstance &&
            EzRegistrationState.REGISTERED === EzAccountDebugTools.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzAccountDebugTools.#ezCanRegister && !EzAccountDebugTools.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzAccountDebugTools, EzAccountDebugTools.ezApiName);
        }

        return EzAccountDebugTools.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzAccountDebugTools.ezApiName
            2) Property getter EzAccountDebugTools.ezEventNames
            3) Property getter EzAccountDebugTools.ezInstance
            4) Property setter EzAccountDebugTools.ezInstance
            5) Property getter EzAccountDebugTools.ezApiRegistrationState
            6) Property setter EzAccountDebugTools.ezApiRegistrationState
            7) Property getter EzAccountDebugTools.#ezCanRegister
            8) Property getter EzAccountDebugTools.#ezIsRegistered
            9) Method EzAccountDebugTools.#ezRegistrator()
     */
    static {
        if (!EzAccountDebugTools.#ezIsRegistered) {
            EzAccountDebugTools.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzAccountDebugTools.#ezRegistrator()) {
                document.addEventListener(
                    EzAccountDebugTools.ezOnEzApiReadyEventName,
                    EzAccountDebugTools.#ezRegistrator);
                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzAccountDebugTools.#ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.onReady,
                    EzAccountDebugTools.#ezRegistrator);

                document.addEventListener(
                    EzHttpHelper.ezEventNames.onReady,
                    EzAccountDebugTools.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzAccountDebugTools.#ezRegistrator);

                document.addEventListener(
                    EzDialog.ezEventNames.onReady,
                    EzAccountDebugTools.#ezRegistrator);

                document.addEventListener(
                    EzDebug.ezEventNames.onReady,
                    EzAccountDebugTools.#ezRegistrator);

            }
        }
    }

    ezAccountDebugToolbarDragEnabled = false;

    /**
        @public @readonly @property
        @returns {string}
     */
    get ezDebugCreditCardDialogId() {
        return 'EzDebugCreditCardDialog';
    }

    /**
        @public @readonly @property
        @returns {string}
     */
    get ezDebugToolbarStyleId() {
        return 'EzDebugToolbarStyle';
    }

    /**
        @public @readonly @property
        @returns {string}
     */
    get ezAccountDebugToolbarId() {
        return 'EzAccountDebugToolbar';
    }

    /**
        @public @readonly @property
        @returns {string}
     */
    get ezShowTestCreditCardDialogButtonId() {
        return 'EzAccountDebugToolbar_ShowTestCreditCardDialogButton';
    }

    /**
        @public @readonly @property
        @returns {string}
     */
    get ezShowSubscribeDialogButtonId() {
        return 'EzAccountDebugToolbar_ShowSubscribeDialogButton';
    }

    /**
        @public @readonly @property
        @returns {string}
     */
    get ezExpireFreeTrialId() {
        return 'EzAccountDebugToolbar_ExpireFreeTrial';
    }

    /**
        @public @method
        Initializes the EzAccountDebugTools
        @returns {EzAccountDebugTools}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzDebug.ezEventNames.onDebugEnabled,
            EzAccountDebugTools.ezApiName,
            EzAccountDebugTools.ezInstance.ezHandleDebugEnabled,
            true);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzDebug.ezEventNames.onDebugDisabled,
            EzAccountDebugTools.ezApiName,
            EzAccountDebugTools.ezInstance.ezHandleDebugDisabled,
            true);

        if (ezApi.ezclocker.ezDebug.ezIsDebug()) {
            EzAccountDebugTools.ezInstance.ezHandleDebugEnabled();
        } else {
            EzAccountDebugTools.ezInstance.ezHandleDebugDisabled();
        }

        return EzAccountDebugTools.ezInstance;
    }

    /**
        @public @method
        Shows the test credit cards dialog (if debug is enabled)
     */
    ezShowTestCreditCardDialog() {
        if (!ezApi.ezclocker.ezUi.ezElementExists(EzAccountDebugTools.ezInstance.ezDebugCreditCardDialogId)) {
            ezApi.ezclocker.ezDialog.ezShowError(
                'Debug Error',
                'The test credit card dialog is not currently available.');

            return;
        }

        ezApi.ezclocker.ezDialog.ezShowDialog(EzAccountDebugTools.ezInstance.ezDebugCreditCardDialogId).then(ezApi.ezIgnoreResolve());
    }

    /**
        @public @method
        Force shows the collect payment subscription dialog (if debug is enabled)
     */
    ezShowSubscribeDialog() {
        if (!EzObject.isValid(ezApi.ezclocker.ezSubscriptionPlansView)) {
            ezApi.ezclocker.ezDialog.ezShowError(
                'Debug Error',
                'The subscription dialog is not currently available.');

            return;
        }

        ezApi.ezclocker.ezAccountSubscriptionActions.ezCollectPaymentFromCustomer(
            ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountLicense().subscriptionPlan);
    }

    /**
     * @public @method
     * Expires the logged in employer's free trial
     */
    ezExpireFreeTrial() {
        ezApi.ezclocker.ezUi.ezPageWaitAsync(
            'Expiring free trial ...',
            (waitDone) => ezApi.ezclocker.ezHttpHelper.ezPost(
                '/_api/v1/subscriptions/employer/expire-free-trial')
                .then(
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                .then(
                    () => ezApi.ezclocker.ezClockerContext.ezRefreshSelectedEmployerAccountLicense()
                        .then(
                            () => waitDone()
                                .then(EzPromise.ignoreResovle)),
                    () => ezApi.ezclocker.ezClockerContext.ezRefreshSelectedEmployerAccountLicense()
                        .then(
                            () => waitDone()
                                .then(EzPromise.ignoreResolve))));
    }

    /**
        @protected @method
        Initializes the debugb toolbar UX when debug is enabled.
     */
    ezInitDebugToolbarUx() {
        if (!ezApi.ezclocker.ezUi.ezElementExists(EzAccountDebugTools.ezInstance.ezDebugToolbarStyleId)) {
            ezApi.ezclocker.ezUi.ezAppendContent(
                'head',
                EzHtml.build`
                    <style
                        id="${EzAccountDebugTools.ezInstance.ezDebugToolbarStyleId}">
                        .ezAccountDebugToolbar {
                            opacity: 25%;
                            position: absolute;
                            margin: 4px;
                            top: 65px;
                            left: 30px;
                            background-color: transparent;
                        }
                        .ezAccountDebugToolbar:hover {
                            opacity: 100%;
                            position: absolute;
                            margin: 4px;
                            top: 65px;
                            left: 30px;
                            background-color: transparent;
                        }
                        .ezAccountDebugToolbarButtonContainer {
                            display: grid;
                            grid-template-columns: auto auto auto;
                            padding: 8px;
                            background-color: rgba(0, 0, 0, 0.5);
                            color: var(--ezClockerWhite);
                            border-color: var(--ezClockerBlack);
                            border-style: solid;
                            border-width: 2px;
                            justify-content: start;
                            align-content: center;
                        }
                        button.ezDebugButton {
                            padding: 4px;
                            margin: 1px;
                            background-color: var(--ezTeal);
                            color: var(--ezClockerWhite);
                            font-size: 10pt;
                            vertical-align: middle;
                            text-align: center;
                            border-color: var(--ezTealBorder);
                            border-width: 1px;
                            border-style: solid;
                        }
                        button.ezDebugButton:hover {
                            padding: 4px;
                            margin: 1px;
                            background-color: var(--ezTealHover);
                            color: var(--ezTealContainerTextColor);
                            font-size: 10pt;
                            vertical-align: middle;
                            text-align: center;
                            border-color: var(--ezTealBorder);
                            border-width: 1px;
                            border-style: solid;
                            box-shadow: var(--ezTealBoxShadow);
                        }
                        button.ezDebugButton:active,
                        button.ezDebugButton:active:focus {
                            padding: 4px;
                            margin: 1px;
                            background-color: var(--ezTealHover);
                            color: var(--ezTealContainerTextColor);
                            font-size: 10pt;
                            vertical-align: middle;
                            text-align: center;
                            border-color: var(--ezTealBorder);
                            border-width: 1px;
                            border-style: solid;
                            box-shadow: var(--ezTealInsetBoxShadow);
                        }
                        button.ezDebugButton:focus {
                            padding: 4px;
                            margin: 1px;
                            background-color: var(--ezTealHover);
                            color: var(--ezTealContainerTextColor);
                            font-size: 10pt;
                            vertical-align: middle;
                            text-align: center;
                            border-color: var(--ezTealBorder);
                            border-width: 1px;
                            border-style: solid;
                        }
                        button.ezDebugButton:disabled {
                            padding: 4px;
                            margin: 1px;
                            background-color: var(--ezTealHover);
                            color: var(--ezTealContainerDisabledTextColor);
                            font-size: 10pt;
                            vertical-align: middle;
                            text-align: center;
                            border-color: var(--ezTealBorder);
                            border-width: 1px;
                            border-style: solid;
                            cursor: default;
                        }
                    </style>`);
        }

        if (!ezApi.ezclocker.ezUi.ezElementExists(EzAccountDebugTools.ezInstance.ezAccountDebugToolbarId)) {
            ezApi.ezclocker.ezUi.ezAppendContent(
                'body',
                EzHtml.build`
                    <div
                        id="${EzAccountDebugTools.ezInstance.ezAccountDebugToolbarId}"
                        class="ezAccountDebugToolbar">
                        <div
                            id="${EzAccountDebugTools.ezInstance.ezAccountDebugToolbarId}_ButtonContainer"
                            class="ezAccountDebugToolbarButtonContainer">
                            <button
                                id="${EzAccountDebugTools.ezInstance.ezShowTestCreditCardDialogButtonId}"
                                class="ezDebugButton">
                                Show Test Credit Cards
                            </button>
                            <button
                                id="${EzAccountDebugTools.ezInstance.ezShowSubscribeDialogButtonId}"
                                class="ezDebugButton">
                                Show Subscription Dialog
                            </button>
                            <button
                                id="${EzAccountDebugTools.ezInstance.ezExpireFreeTrialId}"
                                class="ezDebugButton">
                                Expire Free Trial
                            </button>
                        </div>
                    </div>`);

            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                EzAccountDebugTools.ezInstance.ezShowTestCreditCardDialogButtonId,
                EzElementEventName.CLICK,
                EzAccountDebugTools.ezApiName,
                EzAccountDebugTools.ezInstance.ezShowTestCreditCardDialog);

            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                EzAccountDebugTools.ezInstance.ezShowSubscribeDialogButtonId,
                EzElementEventName.CLICK,
                EzAccountDebugTools.ezApiName,
                EzAccountDebugTools.ezInstance.ezShowSubscribeDialog);

            ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                EzAccountDebugTools.ezInstance.ezExpireFreeTrialId,
                EzElementEventName.CLICK,
                EzAccountDebugTools.ezApiName,
                EzAccountDebugTools.ezInstance.ezExpireFreeTrial);
        }
    }

    /**
        @protected @method
        Removes the debug tool bar when debug is disabled.
     */
    ezRemoveDebugToolbarUx() {
        if (ezApi.ezclocker.ezUi.ezElementExists(EzAccountDebugTools.ezInstance.ezAccountDebugToolbarId)) {
            ezApi.ezclocker.ezUi.ezUnHookElementEvent(
                EzAccountDebugTools.ezInstance.ezShowTestCreditCardDialogButtonId,
                EzAccountDebugTools.ezInstance.ezShowTestCreditCardDialog);

            ezApi.ezclocker.ezUi.ezUnHookElementEvent(
                EzAccountDebugTools.ezInstance.ezShowSubscribeDialogButtonId,
                EzAccountDebugTools.ezInstance.ezShowSubscribeDialog);

            ezApi.ezclocker.ezUi.ezUnHookElementEvent(
                EzAccountDebugTools.ezInstance.ezExpireFreeTrialId,
                EzAccountDebugTools.ezInstance.ezExpireFreeTrial);

            ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
                `${EzAccountDebugTools.ezInstance.ezAccountDebugToolbarId}`,
                EzElementEventName.DRAG,
                EzAccountDebugTools.ezApiName);

            ezApi.ezclocker.ezUi.ezRemoveElement(EzAccountDebugTools.ezInstance.ezAccountDebugToolbarId);
        }

        if (ezApi.ezclocker.ezUi.ezElementExists(EzAccountDebugTools.ezInstance.ezDebugToolbarStyleId)) {
            ezApi.ezclocker.ezUi.ezRemoveElement(EzAccountDebugTools.ezInstance.ezDebugToolbarStyleId);
        }
    }

    /**
        @protected @method
        Initializes the test credit card dialog UX when debug is enabled.
     */
    ezInitTestCreditCardUX() {
        if (!ezApi.ezclocker.ezUi.ezElementExists(EzAccountDebugTools.ezInstance.ezDebugCreditCardDialogId)) {
            ezApi.ezclocker.ezUi.ezAppendContent(
                'body',
                EzHtml.build`
                    <div
                        id="${EzAccountDebugTools.ezInstance.ezDebugCreditCardDialogId}"
                        style="font-size: 10pt"
                        title="Available Fake Credit Cards">
                        <p>
                            The below information is for sand box payment testing.
                            None of the the below cards will function in the production environments.
                        </p>
                        <div>
                            <h2>
                                Success Credit Cards
                            </h2>
                            <table
                                id="DebugCreditCardInfoTable"
                                style="width: 100%; border-style: solid; border-width: 1px; border-color: #000000">
                                <tr
                                    style="font-weight: bold">
                                    <td>
                                        Credit Card Number
                                    </td>
                                    <td>
                                        Credit Card Brand
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        378282246310005
                                    </td>
                                    <td>
                                        American Express
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        371449635398431
                                    </td>
                                    <td>
                                        American Express
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        6011111111111117
                                    </td>
                                    <td>
                                        Discover
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        3530111333300000
                                    </td>
                                    <td>
                                        JCB
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        6304000000000000
                                    </td>
                                    <td>
                                        Maestro
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        5555555555554444
                                    </td>
                                    <td>
                                        Mastercard
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        2223000048400011
                                    </td>
                                    <td>
                                        Mastercard
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        4111111111111111
                                    </td>
                                    <td>
                                        Visa
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        4005519200000004
                                    </td>
                                    <td>
                                        Visa
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        4009348888881881
                                    </td>
                                    <td>
                                        Visa
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        4012000033330026
                                    </td>
                                    <td>
                                        Visa
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        4012000077777777
                                    </td>
                                    <td>
                                        Visa
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        4012888888881881
                                    </td>
                                    <td>
                                        Visa
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        4217651111111119
                                    </td>
                                    <td>
                                        Visa
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        4500600000000061
                                    </td>
                                    <td>
                                        Visa
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div>
                            <h2>
                                Failure Credit Cards
                            </h2>
                            <table
                                id="DebugFailureCreditCardsTable"
                                style="width: 100%; border-style: solid; border-width: 1px; border-color: #000000">
                                <tr
                                    style="font-weight: bold">
                                    <td>
                                        Credit Card Number
                                    </td>
                                    <td>
                                        Credit Card Brand
                                    </td>
                                    <td>
                                        Failure Response
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        000111111111115
                                    </td>
                                    <td>
                                        Visa
                                    </td>
                                    <td>
                                        processor declined
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        5105105105105100
                                    </td>
                                    <td>
                                        Mastercard
                                    </td>
                                    <td>
                                        processor declined
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        378734493671000
                                    </td>
                                    <td>
                                        American Express
                                    </td>
                                    <td>
                                        processor declined
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        6011000990139424
                                    </td>
                                    <td>
                                        Discover
                                    </td>
                                    <td>
                                        processor declined
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        3566002020360505
                                    </td>
                                    <td>
                                        JCB
                                    </td>
                                    <td>
                                        failed (3000)
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div>
                            <h2>
                                Available Test CVV/CDD Values
                            </h2>
                            <table id="DebugAvailableCVVValuesTable"
                                style="width: 100%; border-style: solid; border-width: 1px; border-color: #000000">
                                <tr
                                    style="font-weight: bold">
                                    <td>
                                        CVV Value
                                    </td>
                                    <td>
                                        CID (Amex)
                                    </td>
                                    <td>
                                        Response
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        200
                                    </td>
                                    <td>
                                        2000
                                    </td>
                                    <td>
                                        N (does not match)
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        201
                                    </td>
                                    <td>
                                        2011
                                    </td>
                                    <td>
                                        U (not verified)
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        301
                                    </td>
                                    <td>
                                        3011
                                    </td>
                                    <td>
                                        S (issuer does not participate)
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        no value passed
                                    </td>
                                    <td>
                                        no value passed
                                    </td>
                                    <td>
                                        I (not provided)
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        any other value
                                    </td>
                                    <td>
                                        any other value
                                    </td>
                                    <td>
                                        M (matches)
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>`);

            let ezDialogConfig = ezApi.ezclocker.ezDialog.ezCreateDefaultDialogOptions(
                EzAccountDebugTools.ezInstance.ezDebugCreditCardDialogId);

            ezDialogConfig.title = "EzClocker Test Credit Cards";

            ezDialogConfig.buttons = [
                {
                    text: 'Close',
                    id: `${EzAccountDebugTools.ezInstance.ezDebugCreditCardDialogId}_CLOSE`,
                    click: () => ezApi.ezclocker.ezDialog.ezCloseDialog(EzAccountDebugTools.ezInstance.ezDebugCreditCardDialogId),
                }
            ];

            ezApi.ezclocker.ezDialog.ezInitDialogWithConfig(
                EzAccountDebugTools.ezInstance.ezDebugCreditCardDialogId,
                ezDialogConfig);

            ezApi.ezclocker.ezUi.ezId(
                EzAccountDebugTools.ezInstance.ezDebugCreditCardDialogId)
                .parent()
                .css(
                    'background-color',
                    'rgba(255, 255, 255, 0.9)');
        }
    }

    /**
        @protected @method
        Removes the test credit card UX when debug is disabled
     */
    ezRemoveTestCreditCardUX() {
        if (ezApi.ezclocker.ezUi.ezElementExists(EzAccountDebugTools.ezInstance.ezDebugCreditCardDialogId)) {
            ezApi.ezclocker.ezUi.ezRemove(EzAccountDebugTools.ezInstance.ezDebugCreditCardDialogId);
        }
    }

    /**
        @protected @method
        Handles the ezOnDebugEnabled event
     */
    ezHandleDebugEnabled() {
        EzAccountDebugTools.ezInstance.ezInitDebugToolbarUx();

        EzAccountDebugTools.ezInstance.ezInitTestCreditCardUX();
    }

    /**
        @protected @method
        Handles the ezOnDebugDisabled event
     */
    ezHandleDebugDisabled() {
        EzAccountDebugTools.ezInstance.ezRemoveDebugToolbarUx();

        EzAccountDebugTools.ezInstance.ezRemoveTestCreditCardUX();
    }
}

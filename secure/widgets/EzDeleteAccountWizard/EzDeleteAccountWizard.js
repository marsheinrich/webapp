import {
    EzObject,
    EzBoolean,
    EzString,
    EzHtml,
    EzUrl,
    EzPromise,
    EzJson,
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';
import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

import { EzUI } from '/public/javascript/common/ezui.js';

import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';
import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';
import { EzEmployerService } from '/secure/javascript/common/ezclocker-employer-services.js';

/**
    @class
    @extends {EzClass}
    @description
    Provides flow support for deleting employer accounts
    ---------------------------------------------------------------------------
    Import with:
        import { EzDeleteAccountWizard } from '/secure/widgets/EzDeleteAccountWizard/EzDeleteAccountWizard.js';
    ---------------------------------------------------------------------------
    Singleton instance ready for use when the below evaluates to true:
        globalThis.ezApi.ezclocker[EzDeleteAccountWizard.ezApiName] &&
        globalThis.ezApi.ezclocker[EzDeleteAccountWizard.ezApiName].ready &&
    ---------------------------------------------------------------------------
    Listen to onReady event:
        document.addEventListener(
            EzDeleteAccountWizard.ezEventNames.onReady,
            this.#ezRegistrator);
    ---------------------------------------------------------------------------
    Singleton Instance Reference:
        ezApi.ezclocker.ezDeleteAccountWizard
    ---------------------------------------------------------------------------
 */
export class EzDeleteAccountWizard extends EzClass {
    /**
        @static
        @public @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'ezDeleteAccountWizard';
    }

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzDeleteAccountWizard_Ready'
        };
    }

    /**
        @static
        @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
        @type {EzDeleteAccountWizard}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzDeleteAccountWizard.ezApiName])
        ? globalThis.ezApi.ezclocker[EzDeleteAccountWizard.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzDeleteAccountWizard}
     */
    static get ezInstance() {
        return EzDeleteAccountWizard.#ezInstance;
    }

    /**
        @static
        @public @property @setter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzDeleteAccountWizard} instance
     */
    static set ezInstance(instance) {
        if (null != EzDeleteAccountWizard.#ezInstance) {
            throw new Error('EzDeleteAccountWizard\'s singleton instance is already reigstered with EzApi.');
        }

        EzDeleteAccountWizard.#ezInstance = instance;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzDeleteAccountWizard.ezApiName])
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
        return EzDeleteAccountWizard.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzDeleteAccountWizard.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzDeleteAccountWizard.ezApiRegistrationState &&
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

            globalThis.ezApi.ezclocker[EzEmployerService.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEmployerService.ezApiName].ready;
    }

    /**
        @static
        @private @readonly @property
        Returns if this class's singleton instance is registered with ezApi yet.
        @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzDeleteAccountWizard.ezInstance &&
            EzRegistrationState.REGISTERED === EzDeleteAccountWizard.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzDeleteAccountWizard.#ezCanRegister && !EzDeleteAccountWizard.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzDeleteAccountWizard, EzDeleteAccountWizard.ezApiName);
        }

        return EzDeleteAccountWizard.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzDeleteAccountWizard.ezApiName
            2) Property getter EzDeleteAccountWizard.ezEventNames
            3) Property getter EzDeleteAccountWizard.ezInstance
            4) Property setter EzDeleteAccountWizard.ezInstance
            5) Property getter EzDeleteAccountWizard.ezApiRegistrationState
            6) Property setter EzDeleteAccountWizard.ezApiRegistrationState
            7) Property getter EzDeleteAccountWizard.#ezCanRegister
            8) Property getter EzDeleteAccountWizard.#ezIsRegistered
            9) Method EzDeleteAccountWizard.#ezRegistrator()
     */
    static {
        if (!EzDeleteAccountWizard.#ezIsRegistered) {
            EzDeleteAccountWizard.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzDeleteAccountWizard.#ezRegistrator()) {
                document.addEventListener(
                    EzDeleteAccountWizard.ezOnEzApiReadyEventName,
                    EzDeleteAccountWizard.#ezRegistrator);

                            document.addEventListener(
                                EzEventEngine.ezEventNames.onReady,
                                this.#ezRegistrator);

                            document.addEventListener(
                                EzNavigation.ezEventNames.onReady,
                                this.#ezRegistrator);

                            document.addEventListener(
                                EzHttpHelper.ezEventNames.onReady,
                                this.#ezRegistrator);

                            document.addEventListener(
                                EzUI.ezEventNames.onReady,
                                this.#ezRegistrator);

                            document.addEventListener(
                                EzDialog.ezEventNames.onReady,
                                this.#ezRegistrator);

                            document.addEventListener(
                                EzEmployerService.ezEventNames.onReady,
                                this.#ezRegistrator);

            }
        }
    }

    /**
        @public @constructor
        >> DO NOT CREATE NEW INSTANCES OUTSIDE OF THE STATIC INITIALIZATION FLOW <<
        Use the static singleton instance available from ezApi: ezApi.ezclocker.ezDeleteAccountWizard.
     */
    constructor() {
        super();
    }

    deletingUserName = null;
    deletingAccountPassword = null;

    /**
        @public @readonly @property
        Gets the Step 1 Delete Account message.
        @returns {string}
     */
    get DELETE_MESSAGE_STEP1() {
        return EzHtml.build`
            <div
                class="ezContainer-warning-no-image">
                <h2
                    class="ezText-warning-dark-alert-red">
                    WARNING
                </h2>
                <h3
                    class="ezText-warning-dark-alert-red">
                    The ezClocker team CAN NOT restore a deleted Employer account!
                </h3>
                Deleting your ezClocker Employer account will delete ALL of your data!
            </div>
            <p>
                The ezClocker team is always disappointed to see any account get deleted. Please consider
                letting us know how we failed to meet your expectations or were not the right solution to your
                employee time tracking and scheduling needs. We constantly improve the ezClocker product based
                upon feedback from our customers so we hope you'll consider us again in the future!
            </p>
            <h3>
                Do you wish to continue to delete your ezClocker employer account?
            </h3>`;
    }

    /**
        @public @readonly @property
        Gets the Step 2 Delete Account message.
        @returns {string}
     */
    DELETE_MESSAGE_STEP2() {
        return EzHtml.build`
            <div
                class="ezContainer-warning-no-image">
                <h2
                    class="ezText-warning-dark-alert-red">
                    WARNING
                </h2>
                <h3
                    class="ezText-warning-dark-alert-red">
                    The ezClocker team CAN NOT restore a deleted Employer account!
                </h3>
                Deleting your ezClocker Employer account will delete ALL of your data!
            </div>
            <div
                class="ezSilverBox8">
                <h2>
                    Please verify that you own the account by entering your Employer sign in information below.
                </h2>
                <div
                    class="ezInputContainer">
                    <label
                        for="_AccountUserName">
                        Email Address or Phone Number
                    </label>
                    <input
                        id="_AccountUserName"
                        class="ezText ezFullWidth"
                        type="text"
                        autocomplete="EzclockerDeleteVerifyUsername"/>
                </div>
                <div
                    class="ezInputContainer">
                    <label
                        for="_AccountPassword">
                        Password
                    </label>
                    <input
                        id="_AccountPassword"
                        class="ezPassword ezFullWidth"
                        type="password"
                        autocomplete="EzclockerDeleteVerifyPassword"/>
                </div>
            </div>
            <h3>
                Click the Verify Account button below to continue to delete your Employer account. Otherwise,
                click cancel to keep your Employer account.
            </h3>`;
    }

    /**
        @public @method
        Initializes EzDeleteAccountWizard
        @returns {EzDeleteAccountWizard}
     */
    ezInit() {
        return EzDeleteAccountWizard.ezInstance;
    }

    /**
        @public @method
        Executes the flow of deleting an employer account
     */
    ezDeleteEmployerAccount() {
        return EzDeleteAccountWizard.ezInstance.ezDeleteEmployerAccountStep1();
    }

    /**
        @public @method
        Successfully deleted the account.
     */
    ezShowAccountDeleteSuccessMessage() {
        return ezApi.ezclocker.ezDialog.ezShowOK(
            'Account Deleted',
            'Your employer account is now deleted. Come back soon!')
            .then(
                () => ezApi.ezclocker.ezNavigation.ezSilentSignOut()
                    .then(ezApi.ezclocker.ezNavigation.ezSignOut));
    }

    /**
        @public @method
        Record a delete account failure via email
        @param {string} errorTitle
        @param {string} deleteStep
        @param {object} eResponse
        @param {string} additionalDetails
     */
    ezRecordAccountDeleteFailure(errorTitle, deleteStep, eResponse, additionalDetails) {
        let errorReport = {
            userId: ezApi.ezclocker.ezClockerContext.ezGetActiveAccount().id,
            errorDetails: ezApi.ezEncode(
                EzHtml.build`
                    <h1>
                        Delete Employer Failure
                    </h1>
                    <h2>
                        ${errorTitle}
                    </h2>
                    <p>
                        EzClocker encountered an error while attempting to delete the employer account.
                        Error was encountered during delete step ${deleteStep}.
                    </p>
                    <h3>
                        Additional Details
                    </h3>
                    <p>
                        ${ezApi.ezStringOrDefault(additionalDetails, 'No additional details provided.')}
                    </p>
                    <h3>
                        Error Response
                    </h3>
                    <pre>
                        <code>
                            ${EzJson.toJson(eResponse)}
                        </code>
                    </pre>
                    <h3>
                        EzClocker Context
                    </h3>
                    <pre>
                        <code>
                            ${EzJson.toJson(ezApi.ezclocker.ezClockerContext)}
                        </code>
                    </pre>`)
        };

        let errorReportPayloadJson = EzJson.toJson(errorReport);

        ezApi.ezclocker.ezLogger.error(`Delete Employer Error: ${errorReportPayloadJson}`);

        return ezApi.ezclocker.ezHttpHelper.ezPost(
            ezApi.ezclocker.ezNavigation.ezGetInternalClassicApiUrl('email/send-error-report'),
            EzJson.toJson(errorReportPayloadJson))
            .then(
                EzPromise.ignoreResolve,
                EzPromise.ignoreReject);
    }

    /**
        @public @method
        Cancled delete account
     */
    ezShowDeleteAccountCanceledMessage() {
        return ezApi.ezclocker.ezDialog.ezShowOK(
            'Account Not Deleted',
            EzString.em`
                <h1>
                    AWESOME!
                </h1>
                <p>
                    You have chosen to NOT delete your account and your account is still active.
                </p>
                <p>
                    Thanks for sticking around!
                </p>`)
            .then(ezApi.ezIgnoreResolve);
    }

    /**
        @public @method
        First step, prompt to confirm delete
     */
    ezDeleteEmployerAccountStep1() {
        let deleteEmployerAccountStep1DialogId = 'EzDeleteEmployerAccountDialogStep1';

        let deleteEmployerAccountStep1Config = new EzDialogConfig(deleteEmployerAccountStep1DialogId);

        deleteEmployerAccountStep1Config.width = 1024;

        deleteEmployerAccountStep1Config.title = 'Delete Employer Account';

        deleteEmployerAccountStep1Config.closeOnEscape = false;

        deleteEmployerAccountStep1Config.buttons = [
            {
                id: 'EzVerifyAccountButton',
                text: 'Delete Account',
                click: () => {
                    ezApi.ezclocker.ezDialog.ezCloseDialog(deleteEmployerAccountStep1DialogId);
                    EzDeleteAccountWizard.ezInstance.ezDeleteEmployerAccountStep2();
                }
            },
            {
                id: 'EzKeepAccountButton',
                text: 'Cancel and Keep Account',
                click: () => {
                    ezApi.ezclocker.ezDialog.ezCloseDialog(deleteEmployerAccountStep1DialogId);
                    EzDeleteAccountWizard.ezInstance.ezShowDeleteAccountCanceledMessage();
                }
            }
        ];

        deleteEmployerAccountStep1Config.ezDialogContentHtml = EzHtml.build`
            <div
                id="${deleteEmployerAccountStep1DialogId}_ContentWarning"
                class="ezContainer-warning-no-image-thick-dark-alert-red-border">
                <h4
                    class="ezText-warning-dark-alert-red">
                    WARNING: The ezClocker team CAN NOT restore a deleted Employer account!
                </h4>
            </div>
            <div
                id="${deleteEmployerAccountStep1DialogId}_Content"
                class="ezDialog-content-silver-container_8px">
                <p>
                    The ezClocker team is always disappointed to see any account get deleted. Please consider
                    letting us know how we failed to meet your expectations or were not the right solution to your
                    employee time tracking and scheduling needs. We constantly improve the ezClocker product based
                    upon feedback from our customers so we hope you'll consider us again in the future!
                </p>
            </div>
            <p>
                Click <strong>Delete Account</strong> to continue to delete your Employer account and ALL of
                your data. Otherwise, click <strong>Cancel and Keep Account</strong> to stop and keep your Employer account and data.
            </p>`;

        ezApi.ezclocker.ezDialog.ezInitDialogTemplateFromDialogConfig(deleteEmployerAccountStep1Config);

        ezApi.ezclocker.ezDialog.ezShowDialog(deleteEmployerAccountStep1DialogId);
    }

    /**
        @public @method
        Second step, final confirmation to delete
        @returns {Promise.resolve}
     */
    ezDeleteEmployerAccountStep2() {
        let deleteEmployerAccountStep2DialogId = 'EzDeleteEmployerAccountDialogStep2';

        let deleteEmployerAccountStep2Config = new EzDialogConfig(deleteEmployerAccountStep2DialogId);

        deleteEmployerAccountStep2Config.width = 1024;

        deleteEmployerAccountStep2Config.title = 'Delete Employer Account';

        deleteEmployerAccountStep2Config.closeOnEscape = false;

        deleteEmployerAccountStep2Config.buttons = [
            {
                id: 'EzVerifyAccountButton',
                text: 'Verify Employer Account',
                click: () => {
                    ezApi.ezclocker.ezDialog.ezCloseDialog(deleteEmployerAccountStep2DialogId);

                    EzDeleteAccountWizard.ezInstance.deletingUserName = ezApi.ezclocker.ezUi.ezGetInputValue('EzVerifyEmployerAccountUserName');

                    EzDeleteAccountWizard.ezInstance.deletingAccountPassword = ezApi.ezclocker.ezUi.ezGetInputValue('EzVerifyEmployerAccountPassword');

                    let license = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountLicense();

                    if (!EzObject.isValid(license)) {
                        // Report missing license
                        return EzDeleteAccountWizard.ezInstance.ezRecordAccountDeleteFailure(
                            'Failed to Obtain Employer License',
                            'Step 2',
                            EzString.em`
                                <p>
                                    Call to ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountLicense()
                                    resulted in an undefined or null license response for
                                    employerId=${ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().id}.
                                </p>`,
                            {
                                error: 500,
                                message: 'License response was null'
                            })
                            .then(EzDeleteAccountWizard.ezInstance.ezDeleteEmployerAccountStep3);
                    }

                    if ('BRAINTREEPAYMENTS_SUBSCRIPTION' === license.planProvider) {
                        return ezApi.ezclocker.ezUi.ezStartPageWaitExecute(
                            'Canceling any active subscriptions you might have ... ',
                            (waitDone) => ezApi.ezclocker.ezSubscriptionService.ezCancelActiveEmployerSubscription()
                                .then(
                                    () => waitDone()
                                        .then(EzDeleteAccountWizard.ezInstance.ezDeleteEmployerAccountStep3),
                                    (eResponse) => waitDone()
                                        .then(
                                            // continue anyway
                                            () => EzDeleteAccountWizard.ezInstance.ezRecordAccountDeleteFailure(
                                                'Failed to Cancel Active Subscriptions',
                                                'Step 2',
                                                EzString.em`
                                                    <p>
                                                        Possibly failed to cancel an active subscription with
                                                        ${license.planProvider} via call
                                                        ezApi.ezclocker.ezSubscriptionService.ezCancelActiveEmployerSubscription()
                                                        for employerId=${ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().id}.
                                                    </p>
                                                    <h3>
                                                        Employer License
                                                    </h3>
                                                    <pre>
                                                        <code>
                                                            ${EzJson.toJson(license)}
                                                        </code>
                                                    </pre>`,
                                                eResponse)
                                                .then(EzDeleteAccountWizard.ezInstance.ezDeleteEmployerAccountStep3))));
                    }

                    if ('APPLE_SUBSCRIPTION' === license.planProvider) {
                        // Provide information about canceling the Apple Subscription
                        return EzDeleteAccountWizard.ezInstance.ezDeleteEmployerAccountStep3();
                    }

                    if ('GOOGLE_PLAY_SUBSCRIPTION' === license.planProvider) {
                        // Provide information about canceling the google play subscription
                        return EzDeleteAccountWizard.ezInstance.ezDeleteEmployerAccountStep3();
                    }

                    EzDeleteAccountWizard.ezInstance.ezDeleteEmployerAccountStep3();
                }
            },
            {
                id: 'EzKeepAccountButton',
                text: 'Cancel and Keep Account',
                click: () => ezApi.ezclocker.ezDialog.ezCloseDialog(deleteEmployerAccountStep2DialogId)
            }
        ];

        deleteEmployerAccountStep2Config.ezDialogContentHtml = EzHtml.build`
            <div
                id="${deleteEmployerAccountStep2DialogId}_Content"
                class="ezContainer-warning-no-image-thick-dark-alert-red-border">
                <h4
                    class="ezText-warning-dark-alert-red">
                    WARNING: The ezClocker team CAN NOT restore a deleted Employer account!
                </h4>
            </div>
            <p>
                Please verify that you own the Employer account by entering your account sign-in information below.
            </p>
            <div
                class="ezDialog-content-silver-container_8px">
                <div
                    class="ezInputContainer">
                    <label
                        for="EzVerifyEmployerAccountUserName"
                        class="ezBoldInputLabel">
                        Employer Account Email Address or Phone Number
                    </label>
                    <input
                        id="EzVerifyEmployerAccountUserName"
                        class="ezInputs-large-full-width"
                        type="text"
                        name="username"
                        autocomplete="off"/>
                </div>
                <div
                    class="ezInputContainer">
                    <label
                        for="EzVerifyEmployerAccountPassword"
                        class="ezBoldInputLabel">
                        Employer Account Password
                    </label>
                    <input
                        id="EzVerifyEmployerAccountPassword"
                        class="ezInputs-large-full-width"
                        type="password"
                        name="password"
                        autocomplete="off"/>
                </div>
            </div>
            <p>
                Click the <strong>Verify Employer Account</strong> button below to continue to delete your Employer account.
                Otherwise, click <strong>Cancel and Keep Account</strong> to stop and keep your Employer account.
            </p>`;

        ezApi.ezclocker.ezDialog.ezInitDialogTemplateFromDialogConfig(deleteEmployerAccountStep2Config);

        ezApi.ezclocker.ezDialog.ezShowDialog(deleteEmployerAccountStep2DialogId);
    }

    /**
        @public @method
        Step 2A: Cancel Apple App Store Subscription
        @returns {Promise.resolve}
     */
    ezDeleteEmployerAccountStep2A() {
        let ezclockerSupportUrl = EzUrl.build`
            mailto:support@ezclocker.com
            ?subject=Need Help Canceling my Apple App Store Subscription
            &body=Please help me cancel my Apple App Store subscription to ezClocker.`;

        return ezApi.ezclocker.ezDialog.ezShowOK(
            'Cancel Your Subscription',
            EzHtml.build`
                <h3>Canceling your Apple App Store Subscription</h3>
                <p>
                    If you have not already canceled your ezClocker subscription via the Apple App Store you
                    will need to do so through your Apple App Store Account. ezClocker cannot cancel the subscription
                    for you at this time.
                </p>
                <p>
                    If you have an active subscription for ezClocker through your Apple App Store account please
                    visit (click or tap) the following link to Apple Support and follow the instructions Apple
                    has provided on the support page.
                </p>
                <ul>
                    <li>
                        Apple Support:
                        <a
                            href="https://support.apple.com/en-us/HT202039"
                            target="EzClocker_TO_AppleSupport">
                            Cancel a Subscription on the Apple App Store
                        </a>
                    </li>
                </ul>
                <p>
                    EzClocker support is also here to help you. If you can't find what you need from Apple Support,
                    please feel free to contact us at
                    <a
                        href="${ezclockerSupportUrl}"
                        target="EzClocker_TO_EMAIL">
                        support@ezclocker.com
                    </a>.
                </p>
                <p>
                    <small>
                        EzClocker provides the information in this dialog as a courtesy to our customers. However,
                        ezClocker does not own or maintain the information provided by Apple Support and
                        Apple Support may remove or change the information available at the provided link at any time.
                        Please carefully ready the information available from Apple Support to make sure it
                        fits your specific situation. Otherwise, we encourage you to contact
                        <a
                            href="https://support.apple.com/"
                            target="EzClocker_TO_AppleSupport">
                            Apple Support
                        </a>
                        directly for their assistance in cancling your Apple App Store subscription.
                    </small>
                </p>`,
            null,
            '50%')
            .then(EzDeleteAccountWizard.ezInstance.ezDeleteEmployerAccountStep3);

    }

    /**
        @public @method
        Stpe 2B: Cancel Google Play Subscription
        @returns {Promise.resolve}
     */
    ezDeleteEmployerAccountStep2B() {
        let ezclockerSupportUrl = EzUrl.build`
            mailto:support@ezclocker.com
            ?subject=Need Help Canceling my Google Play Subscription
            &body=Please help me cancel my Google Play subscription to ezClocker.`;

        return ezApi.ezclocker.ezDialog.ezShowOK(
            'Cancel Your Subscription',
            EzHtml.build`
                <h3>Canceling Your Google Play Subscription</h3>
                <p>
                    If you have not already canceled your ezClocker subscription via the Apple App Store you
                    will need to do so through your Apple App Store Account as ezClocker cannot cancel the subscription
                    for you at this time.
                </p>
                <p>
                    If you have an active subscription for ezClocker through your Apple App Store account please
                    visit (click or tap) the following link to Apple Support and follow the instructions Apple
                    has provided on the support page.
                </p>
                <ul>
                    <li>
                        Google Play Support:
                            <a href="https://support.google.com/googleplay/answer/7018481"
                                target="EzClocker_TO_GoogleSupport">Cancel a Subscription on Google Play</a>
                    </li>
                </ul>
                <p>
                    EzClocker support is also here to help you. If you can't find what you need from Google Play Support,
                    please feel free to contact
                    <a
                        href="${ezclockerSupportUrl}"
                        target="EzClocker_TO_EMAIL">
                        support@ezclocker.com
                    </a>.
                </p>
                <p>
                    <small>
                        EzClocker provides the information in this dialog as a courtesy to our customers. However,
                        ezClocker does not own or maintain the information provided by Google Play Support and
                        Google Play Support may remove or change the information available at the provided link at
                        any time. Please carefully ready the information available from Google Play Support to make
                        sure it fits your specific situation. Otherwise, we encourage you to contact
                        <a
                            href="https://support.google.com/"
                            target="EzClocker_TO_GoogleSupport">
                            Google Support
                        </a>
                        directly for their assistance in cancling your Google Play subscription.
                    </small>
                </p>`,
            null,
            '50%')
            .then(EzDeleteAccountWizard.ezInstance.ezDeleteEmployerAccountStep3);
    }


    /**
        @public
        Deletes the actual account, no prompts
        @returns {Promise}
     */
    ezDeleteEmployerAccountStep3() {
        return ezApi.ezclocker.ezUi.ezStartPageWaitExecute(
            'Deleting account data ...',
            (waitDone) => ezApi.ezclocker.ezEmployerService.ezDeleteEmployerAccount(
                ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().userId,
                ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id,
                EzDeleteAccountWizard.ezInstance.deletingUserName,
                EzDeleteAccountWizard.ezInstance.deletingAccountPassword)
                .then(
                    () => waitDone()
                        .then(EzDeleteAccountWizard.ezInstance.ezShowAccountDeleteSuccessMessage),
                    (eResponse) => waitDone()
                        .then(
                            () => EzDeleteAccountWizard.ezInstance.ezRecordAccountDeleteFailure(
                                'Failed to Delete Employer Account',
                                'Step 3',
                                EzString.em`
                                    Failed to remove the employer's account with call to
                                    ezApi.ezclocker.ezEmployerService.ezDeleteEmployerAccount(),
                                    userId=${ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().userId},
                                    employerId=${ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id},
                                    deletingUserNameProvided=${EzDeleteAccountWizard.ezInstance.deletingUserName}
                                    deletingAccountPasswordProvided=${EzDeleteAccountWizard.ezInstance.deletingAccountPassword}`,
                                eResponse)
                                .then(
                                    () => waitDone()
                                        .then(EzDeleteAccountWizard.ezInstance.ezShowAccountDeleteSuccessMessage)))));
    }
}

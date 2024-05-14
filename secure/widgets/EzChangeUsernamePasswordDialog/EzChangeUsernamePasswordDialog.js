import {
    EzObject,
    EzString,
    EzFunction,
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

import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';

import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';


/**
 * @class
 * @extends {EzClass}
 * @description
 * Provides the account view's change email and/or password dialog
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzChangeUsernamePasswordDialog } from '/secure/widgets/EzChangeUsernamePasswordDialog/EzChangeUsernamePasswordDialog.js';
 * ---------------------------------------------------------------------------
 * Singleton instance ready for use when the below evaluates to true:
 *     globalThis.ezApi.ezclocker[EzChangeUsernamePasswordDialog.ezApiName] &&
 *     globalThis.ezApi.ezclocker[EzChangeUsernamePasswordDialog.ezApiName].ready &&
 * ---------------------------------------------------------------------------
 * Listen to onReady event:
 *     document.addEventListener(
 *         EzChangeUsernamePasswordDialog.ezEventNames.onReady,
 *         this.#ezRegistrator);
 * ---------------------------------------------------------------------------
 * Singleton Instance Reference:
 *     ezApi.ezclocker.ezChangeUsernamePasswordDialog
 * ---------------------------------------------------------------------------
 */
export class EzChangeUsernamePasswordDialog extends EzClass {
    /**
     * @public @readonly @property
     * Gets the HTML error message for change email failures.
     * @returns {string}
     */
    get CHANGE_EMAIL_ERROR_MESSAGE() {
        return EzHtml.build`
            Verify your existing account by entering your current sign in information. Then enter the new email
            address you wish to use. Your new email address must meet the following requirements:
            <ul>
                <li>Not associated with an existing ezClocker account.</li>
                <li>Does not match your existing email address.</li>
            </ul>`;
    }

    /**
     * @public @readonly @property
     * Gets the dialog title for failure messages
     * @returns {string}
     */
    get CHANGING_EMAIL_ERROR_TITLE() {
        return 'Changing Your Email Address';
    }

    /**
     * @public @readonly @property
     * Gets the dialog title for success messages
     * @returns {string}
     */
    get EMAIL_ADDRESS_CHANGED_TITLE() {
        return 'Email Address Changed';
    }

    /**
     * @public @method
     * Initializes EzChangeUsernamePasswordDialog
     * @returns {EzChangeUsernamePasswordDialog}
     */
    ezInit() {
        EzChangeUsernamePasswordDialog.ezInstance.ezInitUX();

        return EzChangeUsernamePasswordDialog.ezInstance;
    }

    /**
     * @public @method
     * Initializes the HTML UX for this dialog
     */
    ezInitUX() {
        ezApi.ezclocker.ezUi.ezAppendContent(
            '_HideDialogsDiv',
            EzChangeUsernamePasswordDialog.ezInstance.ezBuildDialogHtml());

        let dialogConfig = new EzDialogConfig(EzChangeUsernamePasswordDialog.ezApiName);
        dialogConfig.width = 570;
        dialogConfig.buttons = {
            'Change E-Mail': EzChangeUsernamePasswordDialog.ezInstance.ezSubmit,
            Cancel: EzChangeUsernamePasswordDialog.ezInstance.ezClose
        };
        ezApi.ezclocker.ezDialog.ezInitDialogWithConfig(EzChangeUsernamePasswordDialog.ezApiName, dialogConfig);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'changeEmailButton',
            EzElementEventName.CLICK,
            EzChangeUsernamePasswordDialog.ezApiName,
            EzChangeUsernamePasswordDialog.ezInstance.ezShow);
    }

    /**
     * @public @method
     * Shows the dialog
     */
    ezShow() {
        ezApi.ezclocker.ezDialog.ezShowDialog(EzChangeUsernamePasswordDialog.ezApiName);
    }

    /**
     * @public @method
     * Closes the dialog
     */
    ezClose() {
        ezApi.ezclocker.ezDialog.ezCloseDialog(EzChangeUsernamePasswordDialog.ezApiName);
    }

    /**
     * @public @method
     * Shows the error message box
     * @param {string} em
     */
    ezShowSignInError(em) {
        if (!EzString.hasLength(em)) {
            EzChangeUsernamePasswordDialog.ezInstance.ezHideSignInError();

            return;
        }

        ezApi.ezclocker.ezUi.ezContent('EzChangeEmailSignInErrorBox', em);

        ezApi.ezclocker.ezUi.ezShowElement('EzChangeEmailSignInErrorBox');
    }

    /**
     * @public
     * Hides the error message box
     */
    ezHideSignInError() {
        ezApi.ezclocker.ezUi.ezContent('EzChangeEmailSignInErrorBox', EzString.EMPTY);

        ezApi.ezclocker.ezUi.ezHideElement('EzChangeEmailSignInErrorBox');
    }

    /**
     * @public
     * Shows the confirm email error message
     * @param {String} em
     */
    ezShowConfirmEmailError(em) {
        if (!EzString.hasLength(em)) {
            EzChangeUsernamePasswordDialog.ezInstance.ezHideSignInError();

            return;
        }

        ezApi.ezclocker.ezUi.ezContent(
            'EzChangeEmailConfirmEmailErrorBox',
            em);

        ezApi.ezclocker.ezUi.ezShowElement('EzChangeEmailConfirmEmailErrorBox');
    }

    /**
     * @public @method
     * Hides the confirm email error message
     */
    ezHideConfirmEmailErrorr() {
        ezApi.ezclocker.ezUi.ezContent(
            'EzChangeEmailConfirmEmailErrorBox',
            EzString.EMPTY);

        ezApi.ezclocker.ezUi.ezHideElement('EzChangeEmailConfirmEmailErrorBox');
    }

    /**
     * @public @method
     * Validates the inputs
     */
    validateChangeAccountEmailEntries() {
        EzChangeUsernamePasswordDialog.ezInstance.ezHideSignInError();

        EzChangeUsernamePasswordDialog.ezInstance.ezHideConfirmEmailErrorr();

        let newEmailAddress = ezApi.ezclocker.ezUi.ezGetInputValue('EzNewEmail').trim();

        let vResponse = ezApi.ezclocker.ezValidation.ezValidateEmailAddress(newEmailAddress);

        if (0 != vResponse.errorCode) {
            return null;
        }

        let confirmNewEmailAddress = ezApi.ezclocker.ezUi.ezGetInputValue('EzConfirmNewEmail').trim();

        if (newEmailAddress != confirmNewEmailAddress) {
            EzChangeUsernamePasswordDialog.ezInstance.ezShowConfirmEmailError('Your new email address and confirmation email address must match.');

            return null;
        }

        let currentEmailAddress = ezApi.ezclocker.ezUi.ezGetInputValue('EzCurrentEmail').trim();

        if (currentEmailAddress == newEmailAddress) {
            EzChangeUsernamePasswordDialog.ezInstance.ezShowConfirmEmailError('Your new email address is the same as your current email address.');

            return null;
        }

        let currentPassword = ezApi.ezclocker.ezUi.ezGetInputValue('EzCurrentPassword').trim();

        vResponse = ezApi.ezclocker.ezValidation.ezValidatePassword(currentPassword);

        if (0 !== vResponse.errorCode) {
            EzChangeUsernamePasswordDialog.ezInstance.ezShowSignInError(vResponse.message);

            return null;
        }

        return {
            email: currentEmailAddress,
            newEmail: newEmailAddress,
            newEmailConfirm: confirmNewEmailAddress,
            password: currentPassword
        };
    }

    /**
     * @public @method
     * Submits the changes
     */
    ezSubmit() {
        let changeAccountEmailData = EzChangeUsernamePasswordDialog.ezInstance.validateChangeAccountEmailEntries();

        if (!EzObject.isValid(changeAccountEmailData)) {
            // validation failure
            return;
        }

        return ezApi.ezclocker.ezUi.ezStartPageWaitExecute(
            'Requesting e-mail address change ...',
            (waitDone) => ezApi.ezclocker.ezAccountServices.ezChangeUserName(changeAccountEmailData)
                .then(
                    () => EzChangeUsernamePasswordDialog.ezInstance.ezSignOutSignIn(waitDone)
                        .then(
                            () => ezApi.ezclocker.ezDialog.ezCloseDialog(EzChangeUsernamePasswordDialog.ezApiName)),
                    (eResponse) => waitDone()
                        .then(
                            () => {
                                if (401 === eResponse.errorCode) {
                                    EzChangeUsernamePasswordDialog.ezInstance.ezShowSignInError('User name and/or password is incorrect.');

                                    return;
                                }

                                if (400 === eResponse.errorCode) {
                                    EzChangeUsernamePasswordDialog.ezInstance.ezShowConfirmEmailError(eResponse.message);

                                    return;
                                }

                                ezApi.ezclocker.ezLogger.error(`Failed to change user name/email address. Error: ${ezApi.ezToJson(eResponse)}`);

                                ezApi.ezclocker.ezDialog.ezShowError(
                                    EzChangeUsernamePasswordDialog.ezInstance.CHANGING_EMAIL_ERROR_TITLE,
                                    EzChangeUsernamePasswordDialog.ezInstance.CHANGE_EMAIL_ERROR_MESSAGE);
                            })));
    }


    /**
     * @public @method
     * Signs the user out of their account with the old credentials and then attempts to re-sign them in
     * with the new credentials. If signing in fails, user is directed to manually sign-in via the sign in page.
     * @param {function} waitDone
     * @returns {Promise.resolve}
     */
    ezSignOutSignIn(waitDone) {
        if (!EzFunction.isFunction(waitDone)) {
            throw new EzBadParamException(
                'waitDone',
                EzChangeUsernamePasswordDialog.ezInstance,
                EzChangeUsernamePasswordDialog.ezInstance.ezSignOutSignIn);
        }

        // Re-log them in now
        return EzPromise.asyncAction(
            (finished) => ezApi.ezclocker.ezAccountServices.ezSignOut()
                .then(
                    () => ezApi.ezclocker.ezAccountServices.ezSilentSignIn(
                        ezApi.ezclocker.ezUi.ezGetInputValue('EzNewEmail'),
                        ezApi.ezclocker.ezUi.ezGetInputValue('EzCurrentPassword'))
                        .then(
                            () => waitDone()
                                .then(
                                    () => ezApi.ezclocker.ezDialog.ezShowOK(
                                        EzChangeUsernamePasswordDialog.ezInstance.EMAIL_ADDRESS_CHANGED_TITLE,
                                        EzHtml.build`
                                            <p>
                                                Your account email address is updated to:
                                            </p>
                                            <div class="ezGrid-vertical-align-middle ezBold">
                                                ${ezApi.ezclocker.ezUi.ezGetInputValue('EzNewEmail')}
                                            </div>`)
                                        .then(finished)),
                            (eSilentSignInResponse) => waitDone()
                                .then(
                                    () => {
                                        ezApi.ezclocker.ezLogger.error(
                                            EzString.em`
                                                Failed properly execute the silent sign in with the new user email.
                                                Error: ${ezApi.ezToJson(eSilentSignInResponse)}.`);

                                        ezApi.ezclocker.ezDialog.ezShowOK(
                                            EzChangeUsernamePasswordDialog.ezInstance.EMAIL_ADDRESS_CHANGED_TITLE,
                                            EzHtml.build`
                                                <p>
                                                    Your account email address is updated to:
                                                </p>
                                                <div class="ezGrid-vertical-align-middle ezBold">
                                                    ${ezApi.ezclocker.ezUi.ezGetInputValue('EzNewEmail')}
                                                </div>
                                                <p>
                                                    You will need to sign in with your new email address to continue.
                                                </p>`)
                                            .then(ezApi.ezclocker.ezNavigation.ezSignOut);

                                        return finished();
                                    })),
                    (eSignOutResponse) => waitDone()
                        .then(
                            () => {
                                ezApi.ezclocker.ezLogger.error(
                                    EzString.em`
                                        Failed sign out due to the following error: ${eSignOutResponse.message}
                                        Error response: ${EzJson.toJson(eSignOutResponse)}.`);

                                ezApi.ezclocker.ezDialog.ezShowOK(
                                    EzChangeUsernamePasswordDialog.ezInstance.EMAIL_ADDRESS_CHANGED_TITLE,
                                    EzHtml.build`
                                        <p>
                                            Your account email address is updated to:
                                        </p>
                                        <div class="ezGrid-vertical-align-middle ezBold">
                                            ${ezApi.ezclocker.ezUi.ezGetInputValue('EzNewEmail')}
                                        </div>
                                        <p>
                                            You will need to sign in with your new email address to continue.
                                        </p>`)
                                    .then(ezApi.ezclocker.ezNavigation.ezSignOut);

                                return finished();
                            })));
    }

    /**
     * @public @method
     * Builds the dialogs HTML
     * @returns {String}
     */
    ezBuildDialogHtml() {
        return EzHtml.build`
            <style>
                .currentAccountInfoContainer {
                    padding: 8px;
                    background-color: var(--ezClockerYellow);
                    border-color: var(--ezBorderYellow);
                    border-style: solid;
                    border-width: 1px;
                }
                .newAccountInformationContainer {
                    padding: 8px;
                    margin-top: 10px;
                    background-color: var(--ezClockerNavy);
                    color: var(--ezNavyContainerTextColor);
                    border-style: solid;
                    border-width: 1px;
                    border-color: var(--ezBorderNavy);
                }
                .changeAccountInfoTable {
                    width: 100%;
                    padding-right: 10px;
                    padding-bottom: 8px;
                }
            </style>
            <div
                id="${EzChangeUsernamePasswordDialog.ezApiName}"
                title="Change Email Address">
                <p>
                    You can change your employer account email address below. If you also use the ezClocker mobile
                    applications you might also need to sign out and sign back in with your new email address.
                </p>
                <div
                    id="EzChangeEmailContainer"
                    class="currentAccountInfoContainer">
                    <div
                        id="EzChangeEmailSignInErrorBox"
                        class="ezErrorBox"
                        style="display:none">
                    </div>
                    <table
                        id="ChangeEmailTable"
                        class="changeAccountInfoTable">
                        <tr>
                            <td>Enter your current account email address:</td>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    id="EzCurrentEmail"
                                    type="text"
                                    class="ezFullWidthEditor" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Enter your current password:
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    id="EzCurrentPassword"
                                    type="password"
                                    class="ezFullWidthEditor" />
                            </td>
                        </tr>
                    </table>
                </div>
                <div
                    id="EzNewEmailInfoContainer"
                    class="newAccountInformationContainer">
                    <table
                        id="EzNewEmailInfoTable"
                        class="changeAccountInfoTable">
                        <tr>
                            <td>
                                Enter your new email address:
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    id="EzNewEmail"
                                    type="email"
                                    class="ezFullWidthEditor" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Confirm you new email address:
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    id="EzConfirmNewEmail"
                                    type="email"
                                    class="fullWidthEditor" />
                                <div
                                    id="EzChangeEmailConfirmEmailErrorBox"
                                    class="ezErrorBox"
                                    style="display:none">
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>`;
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
     * Returns the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezChangeUsernamePasswordDialog';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzChangeUsernamePasswordDialog_Ready'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzChangeUsernamePasswordDialog}
     */
    static #ezInstance = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzChangeUsernamePasswordDialog.ezApiName]
        ? globalThis.ezApi.ezclocker[EzChangeUsernamePasswordDialog.ezApiName]
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzChangeUsernamePasswordDialog}
     */
    static get ezInstance() {
        return EzChangeUsernamePasswordDialog.#ezInstance;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzChangeUsernamePasswordDialog} instance
     */
    static set ezInstance(instance) {
        if (null != EzChangeUsernamePasswordDialog.#ezInstance) {
            throw new Error('EzChangeUsernamePasswordDialog\'s singleton instance is already reigstered with EzApi.');
        }

        EzChangeUsernamePasswordDialog.#ezInstance = instance;
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
    static #ezApiRegistrationState = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzChangeUsernamePasswordDialog.ezApiName]
        ? EzRegistrationState.REGISTERED
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the ezApi registration state of this classes's singleton instance.
     * @returns {string}
     * A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzChangeUsernamePasswordDialog.#ezApiRegistrationState;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzChangeUsernamePasswordDialog.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @static
     * @private @readonly @property
     * Returns true when all required dependencies for this class report ready.
     * In otherwords, the require dependency's singleton instance is created
     * and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzChangeUsernamePasswordDialog.ezApiRegistrationState &&
            globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker &&

            globalThis.ezApi.ezclocker?.[EzEventEngine.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzNavigation.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzHttpHelper.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzUI.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzDialog.ezApiName]?.ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzChangeUsernamePasswordDialog.ezInstance &&
            EzRegistrationState.REGISTERED === EzChangeUsernamePasswordDialog.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzChangeUsernamePasswordDialog.#ezCanRegister && !EzChangeUsernamePasswordDialog.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzChangeUsernamePasswordDialog, EzChangeUsernamePasswordDialog.ezApiName);
        }

        return EzChangeUsernamePasswordDialog.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzChangeUsernamePasswordDialog.ezApiName
     *     2) Property getter EzChangeUsernamePasswordDialog.ezEventNames
     *     3) Property getter EzChangeUsernamePasswordDialog.ezInstance
     *     4) Property setter EzChangeUsernamePasswordDialog.ezInstance
     *     5) Property getter EzChangeUsernamePasswordDialog.ezApiRegistrationState
     *     6) Property setter EzChangeUsernamePasswordDialog.ezApiRegistrationState
     *     7) Property getter EzChangeUsernamePasswordDialog.#ezCanRegister
     *     8) Property getter EzChangeUsernamePasswordDialog.#ezIsRegistered
     *     9) Method EzChangeUsernamePasswordDialog.#ezRegistrator()
     */
    static {
        if (!EzChangeUsernamePasswordDialog.#ezIsRegistered) {
            EzChangeUsernamePasswordDialog.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzChangeUsernamePasswordDialog.#ezRegistrator()) {
                document.addEventListener(
                    EzChangeUsernamePasswordDialog.ezOnEzApiReadyEventName,
                    EzChangeUsernamePasswordDialog.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzChangeUsernamePasswordDialog.#ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.onReady,
                    EzChangeUsernamePasswordDialog.#ezRegistrator);

                document.addEventListener(
                    EzHttpHelper.ezEventNames.onReady,
                    EzChangeUsernamePasswordDialog.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzChangeUsernamePasswordDialog.#ezRegistrator);

                document.addEventListener(
                    EzDialog.ezEventNames.onReady,
                    EzChangeUsernamePasswordDialog.#ezRegistrator);
            }
        }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // NO CODE AFTER THIS SECTION
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}

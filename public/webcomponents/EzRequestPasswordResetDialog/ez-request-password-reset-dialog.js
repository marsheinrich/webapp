import {
    EzObject,
    EzBoolean,
    EzString,
    EzHtml
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzElementEventName,
    EzValidationResponseStatus
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzAccountServices } from '/public/javascript/services/ezclocker-account-services.js';

import { EzFormat } from '/public/javascript/common/ez-format.js';
import { EzTickerTimer } from '/public/javascript/common/ez-ticker-timer.js';
import { EzUI } from '/public/javascript/common/ezui.js';

import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';

import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * Provides functionality to request a password reset.
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzRequestPasswordResetDialog } from '/public/webcomponents/EzRequestPasswordResetDialog/ez-request-password-reset-dialog.js';
 * ---------------------------------------------------------------------------
 * Singleton instance ready for use when the below evaluates to true:
 *     globalThis.ezApi.ezclocker[EzRequestPasswordResetDialog.ezApiName] &&
 *     globalThis.ezApi.ezclocker[EzRequestPasswordResetDialog.ezApiName].ready
 * ---------------------------------------------------------------------------
 * Listen to onReady event:
 *     document.addEventListener(
 *         EzRequestPasswordResetDialog.ezEventNames.onReady,
 *         this.#ezRegistrator);
 * ---------------------------------------------------------------------------
 * Singleton Instance Reference:
 *     Inside this class: EzRequestPasswordResetDialog.ezInstance
 *     Outside this class: ezApi.ezclocker.ezRequestPasswordResetDialog
 * ---------------------------------------------------------------------------
 */
export class EzRequestPasswordResetDialog extends EzClass {
    /**
     * @static
     * @public @readonly @property
     * Returns the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezRequestPasswordResetDialog';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzRequestPasswordResetDialog_Ready',
            onResetPasswordSubmitted: 'EzRequestPasswordResetDialog_OnSubmitted',
            onResetPasswordCanceled: 'EzRequestPasswordResetDialog_OnCanceled',
            onResetPasswordError: 'EzRequestPasswordResetDialog_OnError'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzRequestPasswordResetDialog}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzRequestPasswordResetDialog.ezApiName])
        ? globalThis.ezApi.ezclocker[EzRequestPasswordResetDialog.ezApiName]
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzRequestPasswordResetDialog}
     */
    static get ezInstance() {
        return EzRequestPasswordResetDialog.#ezInstance;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzRequestPasswordResetDialog} ezInstance
     */
    static set ezInstance(ezInstance) {
        if (null != EzRequestPasswordResetDialog.#ezInstance) {
            throw new Error('EzRequestPasswordResetDialog\'s singleton instance is already reigstered with EzApi.');
        }

        EzRequestPasswordResetDialog.#ezInstance = ezInstance;
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
    static #ezApiRegistrationState = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzRequestPasswordResetDialog.ezApiName])
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
        return EzRequestPasswordResetDialog.#ezApiRegistrationState;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzRequestPasswordResetDialog.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzRequestPasswordResetDialog.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzAccountServices.ezApiName] &&
            globalThis.ezApi.ezclocker[EzAccountServices.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzFormat.ezApiName] &&
            globalThis.ezApi.ezclocker[EzFormat.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzTickerTimer.ezApiName] &&
            globalThis.ezApi.ezclocker[EzTickerTimer.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzDialog.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDialog.ezApiName].ready;

    }
    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzRequestPasswordResetDialog.ezInstance &&
            EzRegistrationState.REGISTERED === EzRequestPasswordResetDialog.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzRequestPasswordResetDialog.#ezCanRegister && !EzRequestPasswordResetDialog.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzRequestPasswordResetDialog, EzRequestPasswordResetDialog.ezApiName);
        }

        return EzRequestPasswordResetDialog.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzRequestPasswordResetDialog.ezApiName
     *     2) Property getter EzRequestPasswordResetDialog.ezEventNames
     *     3) Property getter EzRequestPasswordResetDialog.ezInstance
     *     4) Property setter EzRequestPasswordResetDialog.ezInstance
     *     5) Property getter EzRequestPasswordResetDialog.ezApiRegistrationState
     *     6) Property setter EzRequestPasswordResetDialog.ezApiRegistrationState
     *     7) Property getter EzRequestPasswordResetDialog.#ezCanRegister
     *     8) Property getter EzRequestPasswordResetDialog.#ezIsRegistered
     *     9) Method EzRequestPasswordResetDialog.#ezRegistrator()
     */
    static {
        if (!EzRequestPasswordResetDialog.#ezIsRegistered) {
            EzRequestPasswordResetDialog.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzRequestPasswordResetDialog.#ezRegistrator()) {
                document.addEventListener(
                    EzRequestPasswordResetDialog.ezOnEzApiReadyEventName,
                    EzRequestPasswordResetDialog.#ezRegistrator);

                document.addEventListener(
                    EzAccountServices.ezEventNames.onReady,
                    EzRequestPasswordResetDialog.#ezRegistrator);

                document.addEventListener(
                    EzFormat.ezEventNames.onReady,
                    EzRequestPasswordResetDialog.#ezRegistrator);

                document.addEventListener(
                    EzTickerTimer.ezEventNames.onReady,
                    EzRequestPasswordResetDialog.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzRequestPasswordResetDialog.#ezRegistrator);

                document.addEventListener(
                    EzDialog.ezEventNames.onReady,
                    EzRequestPasswordResetDialog.#ezRegistrator);
            }
        }
    }

    /**
     * @public @readonly @property
     * Returns the root Element's id for this dialog.
     * @returns {string}
     */
    get ezDialogId() {
        return 'EzRequestPasswordResetDialog';
    }

    /**
     * @public @readonly @property
     * Returns an object of HTML element names to ids
     * @returns {object}
     */
    get ezIds() {
        return {
            ezResetRequestInputViewId: 'ezOn_EzRequestPasswordResetDialog_ResetRequestsInputView',
            ezConfirmationViewId: 'ezOn_EzRequestPasswordResetDialog_ConfirmationView',
            ezErrorBoxId: 'ezOn_EzRequestPasswordResetDialog_ErrorBox',
            ezWarningBoxId: 'ezOn_EzRequestPasswordResetDialog_WarningBox',
            inputs: {
                ezEmailOrUserNameInputId: 'ezOn_EzRequestPasswordResetDialog_EmailOrUserName',
                ezMobilePhoneNumberInputId: 'ezOn_EzRequestPasswordResetDialog_MobilePhoneNumber'
            },
            buttons: {
                ezOKButtonId: 'ezOn_EzRequestPasswordResetDialog_OKBtn',
                ezResetPasswordButtonId: 'ezOn_EzRequestPasswordResetDialog}_RequestdBtn',
                ezCancelButtonId: 'ezOn_EzRequestPasswordResetDialog_CancelBtn'
            }
        };
    }

    /**
     * @public @method
     * Initializes EzRequestPasswordResetDialog
     * @returns {EzRequestPasswordResetDialog}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzRequestPasswordResetDialog.ezApiName,
            EzRequestPasswordResetDialog.ezEventNames.onResetPasswordSubmitted);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzRequestPasswordResetDialog.ezApiName,
            EzRequestPasswordResetDialog.ezEventNames.onResetPasswordCanceled);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzRequestPasswordResetDialog.ezApiName,
            EzRequestPasswordResetDialog.ezEventNames.onResetPasswordError);

        EzRequestPasswordResetDialog.ezInstance.ezInitUX();

        return EzRequestPasswordResetDialog.ezInstance;
    }

    /**
     * @protected @method
     * Initializes the dialogs UX
     */
    ezInitUX() {
        ezApi.ezclocker.ezUi.ezAppendContent(
            'body',
            EzHtml.build`
                <div
                    id="EzHiddenRestPasswordRequestDialogContainer"
                    style="display:none">
                    ${EzRequestPasswordResetDialog.ezInstance.ezBuildResetPasswordRequestDialogHtml()}
                </div>`);

        let ezDialogConfig = new EzDialogConfig(EzRequestPasswordResetDialog.ezInstance.ezDialogId);

        ezDialogConfig.width = 400;

        ezDialogConfig.buttons = [
            {
                id: EzRequestPasswordResetDialog.ezInstance.ezIds.buttons.ezOKButtonId,
                text: 'OK',
                click: EzRequestPasswordResetDialog.ezInstance.ezClose
            },
            {
                id: EzRequestPasswordResetDialog.ezInstance.ezIds.buttons.ezResetPasswordButtonId,
                text: 'Reset My Password',
                click: EzRequestPasswordResetDialog.ezInstance.ezSubmit
            },
            {
                id: EzRequestPasswordResetDialog.ezInstance.ezIds.buttons.ezCancelButtonId,
                text: 'Cancel',
                click: EzRequestPasswordResetDialog.ezInstance.ezCancel
            }
        ];

        ezApi.ezclocker.ezDialog.ezInitDialogWithConfig(
            EzRequestPasswordResetDialog.ezInstance.ezDialogId,
            ezDialogConfig);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzRequestPasswordResetDialog.ezInstance.ezIds.inputs.ezEmailOrUserNameInputId,
            EzElementEventName.BLUR,
            EzRequestPasswordResetDialog.ezApiName,
            EzRequestPasswordResetDialog.ezInstance.ezValidateInputs);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzRequestPasswordResetDialog.ezInstance.ezIds.inputs.ezMobilePhoneNumberInputId,
            EzElementEventName.BLUR,
            EzRequestPasswordResetDialog.ezApiName,
            EzRequestPasswordResetDialog.ezInstance.ezValidateInputs);
    }

    /**
     * @protected @method
     * Resets the dialog to it's initial state
     */
    ezResetDialog() {
        // Hide confirmation elements and error boxes
        ezApi.ezclocker.ezUi.ezHideElement(EzRequestPasswordResetDialog.ezInstance.ezIds.ezConfirmationViewId);

        ezApi.ezclocker.ezUi.ezHideElement(EzRequestPasswordResetDialog.ezInstance.ezIds.ezErrorBoxId);

        ezApi.ezclocker.ezUi.ezHideElement(EzRequestPasswordResetDialog.ezInstance.ezIds.ezWarningBoxId);

        ezApi.ezclocker.ezUi.ezHideElement(EzRequestPasswordResetDialog.ezInstance.ezIds.buttons.ezOKButtonId);

        // Show initial elements
        ezApi.ezclocker.ezUi.ezShowElement(EzRequestPasswordResetDialog.ezInstance.ezIds.ezResetRequestInputViewId);

        ezApi.ezclocker.ezUi.ezShowElement(EzRequestPasswordResetDialog.ezInstance.ezIds.buttons.ezResetPasswordButtonId);

        ezApi.ezclocker.ezUi.ezShowElement(EzRequestPasswordResetDialog.ezInstance.ezIds.buttons.ezCancelButtonId);

        // Inputs
        ezApi.ezclocker.ezUi.ezHideInputError(EzRequestPasswordResetDialog.ezInstance.ezIds.inputs.ezEmailOrUserNameInputId);

        ezApi.ezclocker.ezUi.ezHideInputError(EzRequestPasswordResetDialog.ezInstance.ezIds.inputs.ezMobilePhoneNumberInputId);

        ezApi.ezclocker.ezUi.ezHideInputWarning(EzRequestPasswordResetDialog.ezInstance.ezIds.inputs.ezEmailOrUserNameInputId);

        ezApi.ezclocker.ezUi.ezHideInputWarning(EzRequestPasswordResetDialog.ezInstance.ezIds.inputs.ezMobilePhoneNumberInputId);

        ezApi.ezclocker.ezUi.ezSetInputValue(
            EzRequestPasswordResetDialog.ezInstance.ezIds.inputs.ezEmailOrUserNameInputId,
            EzString.EMPTY);

        ezApi.ezclocker.ezUi.ezSetInputValue(
            EzRequestPasswordResetDialog.ezInstance.ezIds.inputs.ezMobilePhoneNumberInputId,
            EzString.EMPTY);
    }

    /**
     * @public @method
     * Shows the dialog
     */
    ezShow(email) {
        EzRequestPasswordResetDialog.ezInstance.ezResetDialog();

        if (EzString.hasLength(email)) {
            ezApi.ezclocker.ezUi.ezSetInputValue(EzRequestPasswordResetDialog.ezInstance.ezIds.inputs.ezEmailOrUserNameInputId, email.trim());

            ezApi.ezclocker.ezUi.ezFocus(EzRequestPasswordResetDialog.ezInstance.ezIds.inputs.ezMobilePhoneNumberInputId);

            ezApi.ezclocker.ezUi.ezSelectAll(EzRequestPasswordResetDialog.ezInstance.ezIds.inputs.ezMobilePhoneNumberInputId);

            EzRequestPasswordResetDialog.ezInstance.ezValidateInputs();
        } else {
            ezApi.ezclocker.ezUi.ezFocus(EzRequestPasswordResetDialog.ezInstance.ezIds.inputs.ezEmailOrUserNameInputId);
        }

        ezApi.ezclocker.ezDialog.ezShowDialog(EzRequestPasswordResetDialog.ezInstance.ezDialogId);

    }

    /**
     * @public @method
     * Closes the password reset view without submitting. Does NOT call the onCancel callback.
     */
    ezClose() {
        ezApi.ezclocker.ezDialog.ezCloseDialog(EzRequestPasswordResetDialog.ezInstance.ezDialogId);
    }

    /**
     * @public @method
     * Cancels the dialog and closes the dialog. Calls the onCancel callback.
     */
    ezCancel() {
        EzRequestPasswordResetDialog.ezInstance.ezClose();

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzRequestPasswordResetDialog.ezEventNames.onResetPasswordCanceled,
            EzRequestPasswordResetDialog.ezInstance);
    }

    /**
     * @public @method
     * Submits the password reset request
     */
    ezSubmit() {
        if (!EzRequestPasswordResetDialog.ezInstance.ezValidateInputs()) {
            return;
        }

        ezApi.ezclocker.ezUi.ezHideElement(EzRequestPasswordResetDialog.ezInstance.ezIds.ezErrorBoxId);

        ezApi.ezclocker.ezUi.ezHideElement(EzRequestPasswordResetDialog.ezInstance.ezIds.ezWarningBoxId);

        let emailAddress = EzRequestPasswordResetDialog.ezInstance.ezGetEmailOrUserName();

        let phone = EzRequestPasswordResetDialog.ezInstance.ezGetMobilePhoneNumber();

        let userNameToUse = EzString.hasLength(emailAddress)
            ? emailAddress
            : phone;

        return ezApi.ezclocker.ezUi.ezPageWaitAsync(
            'Requesting password reset ...',
            (waitDone, finished) => ezApi.ezclocker.ezAccountServices.ezRequestPasswordReset(
                userNameToUse,
                emailAddress,
                phone)
                .then(
                    () => waitDone()
                        .then(
                            () => {
                                EzRequestPasswordResetDialog.ezInstance.ezShowConfirmationView();

                                ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                    EzRequestPasswordResetDialog.ezEventNames.onResetPasswordSubmitted,
                                    EzRequestPasswordResetDialog.ezInstance);

                                return finished();
                            }),
                    (eResponse) => waitDone()
                        .then(
                            () => {
                                EzRequestPasswordResetDialog.ezInstance.ezClose();

                                let em = ezApi.ezEM`
                                    ezClocker is unable to reset your password at this time.
                                    Please contact support at
                                    <a href="mailto:support@ezclocker.com?subject='Help reset password'>
                                        support@ezclocker.com
                                    </a>.`;

                                let details = ezApi.ezEM`
                                    [Error Response]\n
                                    ${ezApi.ezToJson(eResponse)}`;

                                ezApi.ezclocker.ezDialog.ezShowErrorWithDetails(
                                    'Error During Password Reset',
                                    em,
                                    details)
                                    .then(
                                        () => {
                                            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                                EzRequestPasswordResetDialog.ezEventNames.onResetPasswordError,
                                                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                                    EzRequestPasswordResetDialog.ezApiName,
                                                    em,
                                                    eResponse));

                                            return finished();
                                        });
                            })));
    }

    /**
     * @protected @method
     * Shows the confirmation view and hides the initial request password reset view.
     */
    ezShowConfirmationView() {
        ezApi.ezclocker.ezUi.ezHideElement(EzRequestPasswordResetDialog.ezInstance.ezIds.ezResetRequestInputViewId);

        ezApi.ezclocker.ezUi.ezHideElement(EzRequestPasswordResetDialog.ezInstance.ezIds.buttons.ezResetPasswordButtonId);

        ezApi.ezclocker.ezUi.ezHideElement(EzRequestPasswordResetDialog.ezInstance.ezIds.buttons.ezCancelButtonId);

        ezApi.ezclocker.ezUi.ezShowElement(EzRequestPasswordResetDialog.ezInstance.ezIds.ezConfirmationViewId);

        ezApi.ezclocker.ezUi.ezShowElement(EzRequestPasswordResetDialog.ezInstance.ezIds.buttons.ezOKButtonId);
    }

    /**
     * @protected @method
     * Validates that the user has enterd enough information to request a password reset.
     */
    ezValidateInputs() {
        ezApi.ezclocker.ezUi.ezHideElement(EzRequestPasswordResetDialog.ezInstance.ezIds.ezErrorBoxId);

        ezApi.ezclocker.ezUi.ezContent(EzRequestPasswordResetDialog.ezInstance.ezIds.ezErrorBoxId, EzString.EMPTY);

        ezApi.ezclocker.ezUi.ezHideElement(EzRequestPasswordResetDialog.ezInstance.ezIds.ezWarningBoxId);

        ezApi.ezclocker.ezUi.ezContent(EzRequestPasswordResetDialog.ezInstance.ezIds.ezWarningBoxId, EzString.EMPTY);

        let email = EzRequestPasswordResetDialog.ezInstance.ezGetEmailOrUserName();

        let phone = EzRequestPasswordResetDialog.ezInstance.ezGetMobilePhoneNumber();

        if (!EzString.hasLength(email) && !EzString.hasLength(phone)) {
            ezApi.ezclocker.ezUi.ezSetContent(
                EzRequestPasswordResetDialog.ezInstance.ezIds.ezErrorBoxId,
                'Enter a valid email address, user name, OR the mobile phone number for your account.');

            ezApi.ezclocker.ezUi.ezShowElement(EzRequestPasswordResetDialog.ezInstance.ezIds.ezErrorBoxId);

            ezApi.ezclocker.ezUi.ezDisableElement(EzRequestPasswordResetDialog.ezInstance.ezIds.buttons.ezOKButtonId);

            return false;
        }

        if (EzString.hasLength(email)) {
            let vResponse = ezApi.ezclocker.ezValidation.ezValidateEmailAddressInput(
                EzRequestPasswordResetDialog.ezInstance.ezIds.inputs.ezEmailOrUserNameInputId,
                EzRequestPasswordResetDialog.ezInstance.ezIds.ezErrorBoxId);

            if (EzValidationResponseStatus.ERROR === vResponse.ezGetStatus()) {
                ezApi.ezclocker.ezUi.ezSetContent(
                    EzRequestPasswordResetDialog.ezInstance.ezIds.ezErrorBoxId,
                    vResponse.message);

                ezApi.ezclocker.ezUi.ezShowElement(EzRequestPasswordResetDialog.ezInstance.ezIds.ezErrorBoxId);

                ezApi.ezclocker.ezUi.ezDisableElement(EzRequestPasswordResetDialog.ezInstance.ezIds.buttons.ezOKButtonId);

                return false;
            }
        }

        if (EzString.hasLength(phone)) {
            let vResponse = ezApi.ezclocker.ezValidation.ezValidatePhoneNumberInput(
                EzRequestPasswordResetDialog.ezInstance.ezIds.inputs.ezMobilePhoneNumberInputId,
                false,
                EzRequestPasswordResetDialog.ezInstance.ezIds.ezErrorBoxId,
                EzRequestPasswordResetDialog.ezInstance.ezIds.ezWarningBoxId);

            if (EzValidationResponseStatus.ERROR === vResponse.ezGetStatus()) {
                 ezApi.ezclocker.ezUi.ezSetContent(
                    EzRequestPasswordResetDialog.ezInstance.ezIds.ezErrorBoxId,
                    vResponse.message);

                ezApi.ezclocker.ezUi.ezShowElement(EzRequestPasswordResetDialog.ezInstance.ezIds.ezErrorBoxId);

                ezApi.ezclocker.ezUi.ezDisableElement(EzRequestPasswordResetDialog.ezInstance.ezIds.buttons.ezOKButtonId);

                return false;
            }
        }

        ezApi.ezclocker.ezUi.ezEnableElement(EzRequestPasswordResetDialog.ezInstance.ezIds.buttons.ezOKButtonId);

        return true;
    }

    /**
     * @protected @method
     */
    ezGetEmailOrUserName() {
        return ezApi.ezclocker.ezUi.ezGetInputValue(
            EzRequestPasswordResetDialog.ezInstance.ezIds.inputs.ezEmailOrUserNameInputId).trim();
    }

    /**
     * @protected @method
     */
    ezGetMobilePhoneNumber() {
        let phoneNumber = ezApi.ezclocker.ezUi.ezGetInputValue(
            EzRequestPasswordResetDialog.ezInstance.ezIds.inputs.ezMobilePhoneNumberInputId);

        if (!ezApi.ezclocker.ezFormat.ezIsUSPhoneNumber(phoneNumber)) {
            phoneNumber = EzString.hasLength(phoneNumber)
                ? ezApi.ezclocker.ezFormat.ezFormatUSPhoneNumber(phoneNumber)
                : EzString.EMPTY;

            // Update the value in the editor
            ezApi.ezclocker.ezUi.ezSetInputValue(
                EzRequestPasswordResetDialog.ezInstance.ezIds.inputs.ezMobilePhoneNumberInputId,
                phoneNumber);
        }

        return phoneNumber;
    }

    /**
     * @protected @method
     * Builds the dialog's HTML
     */
    ezBuildResetPasswordRequestDialogHtml() {
        return EzHtml.build`
            <div
                id="${EzRequestPasswordResetDialog.ezInstance.ezDialogId}"
                title="Request Password Reset">
                <style>
                    .ez-request-password-reset-view {
                    }
                    .ez-request-password-reset-confirmation-view {
                    }
                </style>
                <div
                    id="${EzRequestPasswordResetDialog.ezInstance.ezIds.ezResetRequestInputViewId}"
                    class="ez-request-password-reset-view">
                    <p>
                        To reset your password, enter either the email address/user name you use to log into ezclocker
                        or the mobile phone number associated with your account.
                    </p>
                    <div
                        class="ezInputBox">
                        <label
                            id="${EzRequestPasswordResetDialog.ezInstance.ezIds.inputs.ezEmailOrUserNameInputId}_Label"
                            for="${EzRequestPasswordResetDialog.ezInstance.ezIds.inputs.ezEmailOrUserNameInputId}"
                            class="ezBold">
                            Email Address or User Name
                        </label>
                        <input
                            id="${EzRequestPasswordResetDialog.ezInstance.ezIds.inputs.ezEmailOrUserNameInputId}"
                            type="text"
                            class="ezFullWidthEditor"
                            autocomplete="username"
                            name="emailOrUserName"/>
                    </div>
                    <div
                        class="ezCenterInputBox">
                        <label
                            class="ezBold">
                            - OR -
                        </label>
                    </div>
                    <div
                        class="ezInputBox">
                        <label
                            id="${EzRequestPasswordResetDialog.ezInstance.ezIds.inputs.ezMobilePhoneNumberInputId}Label"
                            for="${EzRequestPasswordResetDialog.ezInstance.ezIds.inputs.ezMobilePhoneNumberInputId}"
                            class="ezBold">
                            Mobile Phone Number
                        </label>
                        <input
                            id="${EzRequestPasswordResetDialog.ezInstance.ezIds.inputs.ezMobilePhoneNumberInputId}"
                            type="text"
                            class="ezFullWidthEditor"
                            title="Format: 555-555-5555"
                            name="mobilephone"
                            autocomplete="tel"/>
                        <label
                            id="${EzRequestPasswordResetDialog.ezInstance.ezIds.inputs.ezMobilePhoneNumberInputId}_FormatHint"
                            class="ezInputFormatLabel">
                            Format: 555-555-5555
                        </label>
                    </div>
                </div>
                <div
                    id="${EzRequestPasswordResetDialog.ezInstance.ezIds.ezErrorBoxId}"
                    class="ezErrorBox"
                    style="display:none">
                    <!-- for error messages -->
                </div>
                <div
                    id="${EzRequestPasswordResetDialog.ezInstance.ezIds.ezWarningBoxId}"
                    class="ezWarningBox"
                    style="display:none">
                    <!-- for warning messages -->
                </div>
                <div
                    id="${EzRequestPasswordResetDialog.ezInstance.ezIds.ezConfirmationViewId}"
                    style="display:none"
                    class="ez-request-password-reset-confirmation-view">
                    <div
                        class="passwordResetConfirmationDiv">
                        <label
                            class="ezBold">
                            Thank you!
                        </label>
                    </div>
                    <p>
                        If we find an account that matches the email address/user name or mobile phone number you
                        entered we will send either a email or text message with the reset password link.
                    </p>
                </div>
            </div>`;
    }
}

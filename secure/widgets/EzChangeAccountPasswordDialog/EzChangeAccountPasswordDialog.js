import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzString,
    EzHtml,
    EzJson,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzUserRoleFeature
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzErrorDialog } from '/public/widgets/EzErrorDialog/EzErrorDialog.js';

import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

import { EzUserRoleFeatures } from '/ezlibrary/ez-user-role-features.js';

import { EzUx } from '/ezlibrary/ux/EzUx.js';

import { EzUI } from '/public/javascript/common/ezui.js';

import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';

import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * Implementation of the ezClocker change account password dialog.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *     import { EzChangeAccountPasswordDialog} from '/secure/widgets/EzChangeAccountPasswordDialog/EzChangeAccountPasswordDialog.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Ready check:
 *     globalThis.ezApi.ezclocker?.[EzChangeAccountPasswordDialog.ezApiName].?ready;
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Listen to onReady event:
 *  document.addEventListener(
 *      EzChangeAccountPasswordDialog.ezEventNames.onReady,
 *      {listening_class_name}.#ezRegistrator);
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzChangeAccountPasswordDialog extends EzClass {
    /**
     * @public @readonly @property
     * Returns a key/value object with the key = elementId of commonly references element ids.
     * @returns {object}
     */
    get ezIds() {
        return {
            dialogId: 'EzChangeAccountPasswordDialog',
            currentUsernameInputId: 'EzChangeAccountPasswordDialog_CurrentUsername',
            currentPasswordInputId: 'EzChangeAccountPasswordDialog_CurrentPassword',
            newPasswordInputId: 'EzChangeAccountPasswordDialog_NewPassword',
            confirmNewPasswordInputId: 'EzChangeAccountPasswordDialog_ConfirmNewPassword',
            containers: {
                genericErrorContainerId: 'EzChangeAccountPasswordDialog_GenericErrorContainer',
                currentUsernameErrorContainerId: 'EzChangeAccountPasswordDialog_CurrentUsernameErrorContainer',
                currentPasswordErrorContainerId: 'EzChangeAccountPasswordDialog_CurrentPasswordErrorContainer',
                newPasswordErrorContainerId: 'EzChangeAccountPasswordDialog_NewPasswordErrorContainer',
                confirmNewPasswordErrorContainerId: 'EzChangeAccountPasswordDialog_ConfirmNewPasswordErrorContainer',
            }
        };
    }

    /**
     * @public @method
     * Initializes EzChangeAccountPasswordDialog
     */
    ezInit() {
        EzChangeAccountPasswordDialog.ezInstance.ezInitUX();

        return EzChangeAccountPasswordDialog.ezInstance;
    }

    /**
     * @public @method
     * Initializes the dialog's UX
     */
    ezInitUX() {
        ezApi.ezclocker.ezUi.ezAppendContent(
            '_HideDialogsDiv',
            EzChangeAccountPasswordDialog.ezInstance.ezBuildDialogUX());

        let dialogConfig = new EzDialogConfig(EzChangeAccountPasswordDialog.ezInstance.ezIds.dialogId);

        dialogConfig.width = 550;

        dialogConfig.buttons = {
            'Change': EzChangeAccountPasswordDialog.ezInstance.ezSubmit,
            'Cancel': EzChangeAccountPasswordDialog.ezInstance.ezCancel
        };

        ezApi.ezclocker.ezDialog.ezInitDialogWithConfig(EzChangeAccountPasswordDialog.ezInstance.ezIds.dialogId, dialogConfig);
    }

    /**
     * @public @method
     * Resets the dialog's input data
     */
    ezResetDialogUX() {
        ezApi.ezclocker.ezUi.ezSetInputValue(
            EzChangeAccountPasswordDialog.ezInstance.ezIds.currentUsernameInputId,
            EzString.EMPTY);

        ezApi.ezclocker.ezUi.ezSetInputValue(
            EzChangeAccountPasswordDialog.ezInstance.ezIds.currentPasswordInputId,
            EzString.EMPTY);

        ezApi.ezclocker.ezUi.ezSetInputValue(
            EzChangeAccountPasswordDialog.ezInstance.ezIds.newPasswordInputId,
            EzString.EMPTY);

        ezApi.ezclocker.ezUi.ezSetInputValue(
            EzChangeAccountPasswordDialog.ezInstance.ezIds.confirmNewPasswordInputId,
            EzString.EMPTY);
    }

    /**
     * @public @method
     * Shows the change password dialog.
     * @returns {Promise.resolve}
     */
    ezShow() {
        // TODO: Finished user role feature toggles
        /*
        let featureSupported = !ezApi.ezclocker.ezUserRoleFeatures.ezUserRoleFeatureEnabledForUser(
            'account',
            EzUserRoleFeature.EZROLE_FEATURE_ACCOUNT_CHANGE_EMPLOYER_PASSWORD);

        if (EzBoolean.isFalse(featureSupported)) {
            return;
        }
        */

        EzChangeAccountPasswordDialog.ezInstance.ezResetDialogUX();

        ezApi.ezclocker.ezDialog.ezShowDialog(EzChangeAccountPasswordDialog.ezInstance.ezIds.dialogId);

        EzUx.focus(EzChangeAccountPasswordDialog.ezInstance.ezIds.currentUsernameInputId);
    }

    /**
     * @public @method
     * Cancels the dialog
     */
    ezCancel() {
        EzChangeAccountPasswordDialog.ezInstance.ezClose();
    }

    /**
     * @public @method
     * Closes the dialogs (not the same as cancel)
     */
    ezClose() {
        EzChangeAccountPasswordDialog.ezInstance.ezResetDialogUX();

        ezApi.ezclocker.ezDialog.ezCloseDialog(EzChangeAccountPasswordDialog.ezInstance.ezIds.dialogId);
    }

    /**
     * @public @method
     * Validates the payload before submitting.
     * @param {Object} payload
     */
    ezValidate(payload) {
        if (!EzObject.isValid(payload)) {
            throw new EzBadParamException(
                'payload',
                EzChangeAccountPasswordDialog.ezInstance,
                EzChangeAccountPasswordDialog.ezInstance.ezValidate);
        }

        // Reset error messages
        ezApi.ezclocker.ezUi.ezContent(
            EzChangeAccountPasswordDialog.ezInstance.ezIds.containers.currentUsernameErrorContainerId,
            EzString.EMPTY);
        ezApi.ezclocker.ezUi.ezHideElement(EzChangeAccountPasswordDialog.ezInstance.ezIds.containers.currentUsernameErrorContainerId);
        ezApi.ezclocker.ezUi.ezRemoveElementClass(
            EzChangeAccountPasswordDialog.ezInstance.ezIds.currentUsernameInputId,
            'ezInputErrorHighlight');

        ezApi.ezclocker.ezUi.ezContent(
            EzChangeAccountPasswordDialog.ezInstance.ezIds.containers.currentPasswordErrorContainerId,
            EzString.EMPTY);
        ezApi.ezclocker.ezUi.ezHideElement(EzChangeAccountPasswordDialog.ezInstance.ezIds.containers.currentPasswordErrorContainerId);
        ezApi.ezclocker.ezUi.ezRemoveElementClass(
            EzChangeAccountPasswordDialog.ezInstance.ezIds.currentPasswordInputId,
            'ezInputErrorHighlight');

        ezApi.ezclocker.ezUi.ezContent(
            EzChangeAccountPasswordDialog.ezInstance.ezIds.containers.newPasswordErrorContainerId,
            EzString.EMPTY);
        ezApi.ezclocker.ezUi.ezHideElement(EzChangeAccountPasswordDialog.ezInstance.ezIds.containers.newPasswordErrorContainerId);
        ezApi.ezclocker.ezUi.ezRemoveElementClass(
            EzChangeAccountPasswordDialog.ezInstance.ezIds.newPasswordInputId,
            'ezInputErrorHighlight');

        ezApi.ezclocker.ezUi.ezContent(
            EzChangeAccountPasswordDialog.ezInstance.ezIds.containers.confirmNewPasswordErrorContainerId,
            EzString.EMPTY);
        ezApi.ezclocker.ezUi.ezHideElement(EzChangeAccountPasswordDialog.ezInstance.ezIds.containers.confirmNewPasswordErrorContainerId);
        ezApi.ezclocker.ezUi.ezRemoveElementClass(
            EzChangeAccountPasswordDialog.ezInstance.ezIds.confirmNewPasswordInputId,
            'ezInputErrorHighlight');

        let featureSupported = !ezApi.ezclocker.ezUserRoleFeatures.ezUserRoleFeatureEnabledForUser(
            'account',
            EzUserRoleFeature.EZROLE_FEATURE_ACCOUNT_CHANGE_EMPLOYER_PASSWORD);

        if (EzBoolean.isFalse(featureSupported)) {
            EzChangeAccountPasswordDialog.ezInstance.close();

            return false;
        }

        if (!EzString.hasLength(payload.userName)) {
            ezApi.ezclocker.ezUi.ezContent(
                EzChangeAccountPasswordDialog.ezInstance.ezIds.containers.currentUsernameErrorContainerId,
                'Please enter your current user name.');

            ezApi.ezclocker.ezUi.ezShowElement(EzChangeAccountPasswordDialog.ezInstance.ezIds.containers.currentUsernameErrorContainerId);

            ezApi.ezclocker.ezUi.ezAddElementClass(
                EzChangeAccountPasswordDialog.ezInstance.ezIds.currentUsernameInputId,
                'ezInputErrorHighlight');

            return false;
        }

        if (!EzString.hasLength(payload.password)) {
            ezApi.ezclocker.ezUi.ezContent(
                EzChangeAccountPasswordDialog.ezInstance.ezIds.containers.currentPasswordErrorContainerId,
                'Please enter your current password.');

            ezApi.ezclocker.ezUi.ezShowElement(EzChangeAccountPasswordDialog.ezInstance.ezIds.containers.currentPasswordErrorContainerId);

            ezApi.ezclocker.ezUi.ezAddElementClass(
                EzChangeAccountPasswordDialog.ezInstance.ezIds.currentPasswordInputId,
                'ezInputErrorHighlight');

            return false;
        }

        if (!EzString.hasLength(payload.newPassword)) {
            ezApi.ezclocker.ezUi.ezContent(
                EzChangeAccountPasswordDialog.ezInstance.ezIds.containers.newPasswordErrorContainerId,
                'Please enter a new password.');

            ezApi.ezclocker.ezUi.ezShowElement(EzChangeAccountPasswordDialog.ezInstance.ezIds.containers.newPasswordErrorContainerId);

            ezApi.ezclocker.ezUi.ezAddElementClass(
                EzChangeAccountPasswordDialog.ezInstance.ezIds.newPasswordInputId,
                'ezInputErrorHighlight');

            return false;
        }

        let vResponse = ezApi.ezclocker.ezValidation.ezValidatePassword(payload.newPassword);

        if (0 != vResponse.errorCode) {
            EzUx.setContent(
                EzChangeAccountPasswordDialog.ezInstance.ezIds.containers.newPasswordErrorContainerId,
                vResponse.message);

            EzUx.show(EzChangeAccountPasswordDialog.ezInstance.ezIds.containers.newPasswordErrorContainerId);

            /*ezApi.ezclocker.ezUi.ezContent(
                EzChangeAccountPasswordDialog.ezInstance.ezIds.containers.newPasswordErrorContainerId,
                vResponse.message);

            ezApi.ezclocker.ezUi.ezShowElement(EzChangeAccountPasswordDialog.ezInstance.ezIds.containers.newPasswordErrorContainerId);*/

            ezApi.ezclocker.ezUi.ezAddElementClass(
                EzChangeAccountPasswordDialog.ezInstance.ezIds.newPasswordInputId,
                'ezInputErrorHighlight');

            ezApi.ezclocker.ezUi.ezAddElementClass(
                EzChangeAccountPasswordDialog.ezInstance.ezIds.confirmNewPasswordInputId,
                'ezInputErrorHighlight');

            return false;
        }

        if (!EzString.hasLength(payload.confirmNewPassword)) {
            ezApi.ezclocker.ezUi.ezContent(
                EzChangeAccountPasswordDialog.ezInstance.ezIds.containers.confirmNewPasswordErrorContainerId,
                'Please confirm your new password.');

            ezApi.ezclocker.ezUi.ezShowElement(EzChangeAccountPasswordDialog.ezInstance.ezIds.containers.confirmNewPasswordErrorContainerId);

            ezApi.ezclocker.ezUi.ezAddElementClass(
                EzChangeAccountPasswordDialog.ezInstance.ezIds.confirmNewPasswordInputId,
                'ezInputErrorHighlight');

            return false;
        }

        if (payload.newPassword !== payload.confirmNewPassword) {
            ezApi.ezclocker.ezUi.ezContent(
                EzChangeAccountPasswordDialog.ezInstance.ezIds.containers.confirmNewPasswordErrorContainerId,
                'Your new password does not match the confirmation password.');

            ezApi.ezclocker.ezUi.ezShowElement(EzChangeAccountPasswordDialog.ezInstance.ezIds.containers.confirmNewPasswordErrorContainerId);

            ezApi.ezclocker.ezUi.ezAddElementClass(
                EzChangeAccountPasswordDialog.ezInstance.ezIds.newPasswordInputId,
                'ezInputErrorHighlight');

            ezApi.ezclocker.ezUi.ezAddElementClass(
                EzChangeAccountPasswordDialog.ezInstance.ezIds.confirmNewPasswordInputId,
                'ezInputErrorHighlight');

            return false;
        }

        return true;
    }

    /**
     * @public @method
     * Submits the dialog information to the service to change the current account's password.
     */
    ezSubmit() {
        let payload = {
            userName: ezApi.ezclocker.ezUi.ezGetInputValue(EzChangeAccountPasswordDialog.ezInstance.ezIds.currentUsernameInputId),
            password: ezApi.ezclocker.ezUi.ezGetInputValue(EzChangeAccountPasswordDialog.ezInstance.ezIds.currentPasswordInputId),
            newPassword: ezApi.ezclocker.ezUi.ezGetInputValue(EzChangeAccountPasswordDialog.ezInstance.ezIds.newPasswordInputId),
            confirmNewPassword: ezApi.ezclocker.ezUi.ezGetInputValue(EzChangeAccountPasswordDialog.ezInstance.ezIds.confirmNewPasswordInputId)
        };

        if (EzChangeAccountPasswordDialog.ezInstance.ezValidate(payload)) {
            ezApi.ezclocker.ezUi.ezPageWaitExecute(
                'Changing account password ...',
                (waitDone) => ezApi.ezclocker.ezHttpHelper.ezPost(
                    ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl('account/password'),
                    EzJson.toJson(payload))
                    .then(
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                    .then(
                        () => {
                            waitDone();

                            EzChangeAccountPasswordDialog.ezInstance.ezClose();

                            return ezApi.ezclocker.ezDialog.ezShowOK(
                                'Account Password Changed',
                                'Your account password is successfully changed.')
                                .then(EzPromise.ignoreResolve);
                        },
                        (eResponse) => {
                            waitDone();

                            if (400 == eResponse.errorCode) {
                                ezApi.ezclocker.ezDialog.ezShowErrorDialog(
                                    'Change Password Error',
                                    eResponse.message);

                                return;
                            }

                            ezApi.ezclocker.ezLogger.error(`Failed to change the account's password. Error: ${ezApi.ezResponse}`);

                            let rootCause = ezApi.ezclocker.ezHttpHelper.extractErrorResponseMessage(eResponse);

                            return EzErrorDialog.ezShowErrorDialog(
                                EzErrorDialog.ezCreateErrorMessageInfo(
                                    // errorTitle
                                    'Change Account Password Error',
                                    // errorMessage
                                    `EzClocker is unable to change your account password at this time. ${rootCause}`,
                                    // rootCause
                                    rootCause,
                                    // userFixActions
                                    null,
                                    // eResponse
                                    eResponse,
                                    // employerId
                                    null,
                                    // employeeId
                                    null,
                                    // supportEmailTopic
                                    'Help with change account password error',
                                    // supportEmailBody
                                    null,
                                    // optionalDialogWidth
                                    null,
                                    // optionalDialogHeight
                                    null))
                                .then(EzPromise.ignoreResolve);
                        }));
        }
    }

    /**
     * @public @method
     * Builds the reset dialog's HTML
     * @returns {String}
     */
    ezBuildDialogUX() {
        return EzHtml.build`
            <!-- change password dialog -->
            <div
                id="${EzChangeAccountPasswordDialog.ezInstance.ezIds.dialogId}"
                title="Change Password">
                <p
                    id="${EzChangeAccountPasswordDialog.ezInstance.ezIds.dialogId}_Message">
                    You can change your employer account password below. If you also use the ezClocker mobile
                    applications you might also need to sign out and sign back in with your new password.
                </p>
                <div
                    id="${EzChangeAccountPasswordDialog.ezInstance.ezIds.dialogId}_InputLayoutContainer"
                    class="ezAutoCol_A ezAutoRow_A_A ezGridGap_8">
                    <div
                        id="${EzChangeAccountPasswordDialog.ezInstance.ezIds.dialogId}_CurrentInfoLayoutContainer"
                        class="ezContainer-ezClockerYellow-pad8 ezAutoCol_A ezAutoRow_A_A ezGridGap_4">
                        <div
                            id="${EzChangeAccountPasswordDialog.ezInstance.ezIds.currentUsernameInputId}_Container">
                            <label
                                id="${EzChangeAccountPasswordDialog.ezInstance.ezIds.currentUsernameInputId}_Label"
                                class="ezInput-label-black-12pt-bold"
                                for="${EzChangeAccountPasswordDialog.ezInstance.ezIds.currentUsernameInputId}">
                                Current Account Username or Email Address
                            </label>
                            <input
                                id="${EzChangeAccountPasswordDialog.ezInstance.ezIds.currentUsernameInputId}"
                                type="email"
                                class="ezEmail ezInputs-important-data fullWidthEditor"/>
                            <div
                                id="${EzChangeAccountPasswordDialog.ezInstance.ezIds.containers.currentUsernameErrorContainerId}"
                                class="ezContainer-validation-error-box"
                                style="display:none">
                            </div>
                        </div>
                        <div
                            id="${EzChangeAccountPasswordDialog.ezInstance.ezIds.currentPasswordInputId}_Container">
                            <label
                                id="${EzChangeAccountPasswordDialog.ezInstance.ezIds.currentPasswordInputId}_Label"
                                class="ezInput-label-black-12pt-bold"
                                for="${EzChangeAccountPasswordDialog.ezInstance.ezIds.currentPasswordInputId}">
                                Current Account Password
                            </label>
                            <input
                                id="${EzChangeAccountPasswordDialog.ezInstance.ezIds.currentPasswordInputId}"
                                type="password"
                                class="ezPassword ezInputs-important-data fullWidthEditor"/>
                            <div
                                id="${EzChangeAccountPasswordDialog.ezInstance.ezIds.containers.currentPasswordErrorContainerId}"
                                class="ezContainer-validation-error-box"
                                style="display:none">
                            </div>
                        </div>
                    </div>
                    <div
                        id="${EzChangeAccountPasswordDialog.ezInstance.ezIds.dialogId}_NewPasswordInfoLayoutContainer"
                        class="ezContainer-navy8 ezAutoCol_A ezAutoRow_A_A ezGridGap_4">
                        <div
                            id="${EzChangeAccountPasswordDialog.ezInstance.ezIds.newPasswordInputId}_Container">
                            <label
                                id="${EzChangeAccountPasswordDialog.ezInstance.ezIds.newPasswordInputId}_Label"
                                class="ezInput-label-white-12pt-bold"
                                for="${EzChangeAccountPasswordDialog.ezInstance.ezIds.newPasswordInputId}">
                                New Password
                            </label>
                            <input
                                id="${EzChangeAccountPasswordDialog.ezInstance.ezIds.newPasswordInputId}"
                                type="password"
                                class="ezPassword ezInputs-important-data fullWidthEditor"/>
                            <div
                                id="${EzChangeAccountPasswordDialog.ezInstance.ezIds.newPasswordInputId}_MessageLayoutContainer"
                                class="ezAutoRow_A_A ezGridGap_4">
                                <div
                                    id="${EzChangeAccountPasswordDialog.ezInstance.ezIds.newPasswordInputId}_PasswordInfo"
                                    class="ezContainer-input-info-box-white-text">
                                    Minimum password length is 8 characters.
                                </div>
                                <div
                                    id="${EzChangeAccountPasswordDialog.ezInstance.ezIds.containers.newPasswordErrorContainerId}"
                                    class="ezContainer-validation-error-box"
                                    style="display:none">
                                </div>
                            </div>
                        </div>
                        <div
                            id="${EzChangeAccountPasswordDialog.ezInstance.ezIds.confirmNewPasswordInputId}_Container">
                            <label
                                id="${EzChangeAccountPasswordDialog.ezInstance.ezIds.confirmNewPasswordInputId}_Label"
                                class="ezInput-label-white-12pt-bold"
                                for="${EzChangeAccountPasswordDialog.ezInstance.ezIds.confirmNewPasswordInputId}">
                                Confirm New Password
                            </label>
                            <input
                                id="${EzChangeAccountPasswordDialog.ezInstance.ezIds.confirmNewPasswordInputId}"
                                type="password"
                                class="ezPassword ezInputs-important-data fullWidthEditor"/>
                            <div
                                id="${EzChangeAccountPasswordDialog.ezInstance.ezIds.newPasswordInputId}_MessageLayoutContainer"
                                class="ezAutoRow_A_A ezGridGap_4">
                                <div
                                    id="${EzChangeAccountPasswordDialog.ezInstance.ezIds.confirmNewPasswordInputId}_PasswordInfo"
                                    class="ezContainer-input-info-box-white-text">
                                    Minimum password length is 8 characters.
                                </div>
                                <div
                                    id="${EzChangeAccountPasswordDialog.ezInstance.ezIds.containers.confirmNewPasswordErrorContainerId}"
                                    class="ezContainer-validation-error-box"
                                    style="display:none">
                                </div>
                            </div>
                        </div>
                    </div>
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
        return 'ezChangeAccountPasswordDialog';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzChangeAccountPasswordDialog_Ready'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzChangeAccountPasswordDialog}
     */
    static #ezInstance = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzChangeAccountPasswordDialog.ezApiName]
        ? globalThis.ezApi.ezclocker[EzChangeAccountPasswordDialog.ezApiName]
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzChangeAccountPasswordDialog}
     */
    static get ezInstance() {
        return EzChangeAccountPasswordDialog.#ezInstance;
    }

    /**
     * @static
     * @public @property @getter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzChangeAccountPasswordDialog} instance
     */
    static set ezInstance(instance) {
        if (null != EzChangeAccountPasswordDialog.#ezInstance) {
            throw new Error('EzChangeAccountPasswordDialog\'s singleton instance is already reigstered with EzApi.');
        }

        EzChangeAccountPasswordDialog.#ezInstance = instance;
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
    static #ezApiRegistrationState = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzChangeAccountPasswordDialog.ezApiName]
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
        return EzChangeAccountPasswordDialog.#ezApiRegistrationState;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string}ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzChangeAccountPasswordDialog.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzChangeAccountPasswordDialog.ezApiRegistrationState &&
            globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker &&

            globalThis.ezApi.ezclocker?.[EzNavigation.ezApiName]?.ready &&

            globalThis.ezApi.ezclocker?.[EzUserRoleFeatures.ezApiName]?.ready &&

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
        return null != EzChangeAccountPasswordDialog.ezInstance &&
            EzRegistrationState.REGISTERED === EzChangeAccountPasswordDialog.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzChangeAccountPasswordDialog.#ezCanRegister && !EzChangeAccountPasswordDialog.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzChangeAccountPasswordDialog, EzChangeAccountPasswordDialog.ezApiName);
        }

        return EzChangeAccountPasswordDialog.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzChangeAccountPasswordDialog.ezApiName
     *     2) Property getter EzChangeAccountPasswordDialog.ezEventNames
     *     3) Property getter EzChangeAccountPasswordDialog.ezInstance
     *     4) Property setter EzChangeAccountPasswordDialog.ezInstance
     *     5) Property getter EzChangeAccountPasswordDialog.ezApiRegistrationState
     *     6) Property setter EzChangeAccountPasswordDialog.ezApiRegistrationState
     *     7) Property getter EzChangeAccountPasswordDialog.#ezCanRegister
     *     8) Property getter EzChangeAccountPasswordDialog.#ezIsRegistered
     *     9) Method EzChangeAccountPasswordDialog.#ezRegistrator()
     */
    static {
        if (!EzChangeAccountPasswordDialog.#ezIsRegistered) {
            EzChangeAccountPasswordDialog.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzChangeAccountPasswordDialog.#ezRegistrator()) {
                document.addEventListener(
                    EzChangeAccountPasswordDialog.ezOnEzApiReadyEventName,
                    EzChangeAccountPasswordDialog.#ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.onReady,
                    EzChangeAccountPasswordDialog.#ezRegistrator);

                document.addEventListener(
                    EzUserRoleFeatures.ezEventNames.onReady,
                    EzChangeAccountPasswordDialog.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzChangeAccountPasswordDialog.#ezRegistrator);

                document.addEventListener(
                    EzDialog.ezEventNames.onReady,
                    EzChangeAccountPasswordDialog.#ezRegistrator);
            }
        }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // NO CODE AFTER THIS SECTION
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}

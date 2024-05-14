import {
    EzObject,
    EzBoolean,
    EzString,
    EzPromise,
    EzJson
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzUserRoleFeature
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';

import { EzUI } from '/public/javascript/common/ezui.js';

import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * Account change password dialog
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzChangePasswordDialog } from '/secure/widgets/EzChangePasswordDialog/EzChangePasswordDialog.js';
 * ---------------------------------------------------------------------------
 * Singleton instance ready for use when the below evaluates to true:
 *     globalThis.ezApi.ezclocker[EzChangePasswordDialog.ezApiName] &&
 *     globalThis.ezApi.ezclocker[EzChangePasswordDialog.ezApiName].ready
 * ---------------------------------------------------------------------------
 * Listen to onReady event:
 *     document.addEventListener(
 *         EzChangePasswordDialog.ezEventNames.onReady,
 *         this.#ezRegistrator);
 * ---------------------------------------------------------------------------
 * Singleton Instance Reference:
 *     ezApi.ezclocker.ezChangePasswordDialog
 * ---------------------------------------------------------------------------
 */
export class EzChangePasswordDialog extends EzClass {
    /**
     * @public @field
     */
    ready = false;

    /**
     * @public @field
     */
    ezStates = [];

    /**
     * @public @field
     */
    _DialogClosing = false;

    /**
     * @public @field
     */
    _DialogCanceling = false;

    /**
     * @public @field
     */
    dialogId = undefined;

    /**
     * @public @field
     */
    currentUsernameInputId = undefined;

    /**
     * @public @field
     */
    currentPasswordInputId = undefined;

    /**
     * @public @field
     */
    newPasswordInputId = undefined;

    /**
     * @public @field
     */
    confirmNewPasswordInputId = undefined;

    /**
     * @public @field
     */
    onSuccess = undefined;

    /**
     * @public @field
     */
    onFailure = undefined;

    /**
     * @public @field
     */
    onCancel = undefined;

    /**
     * @public @method
     * Initializes the EzChangePasswordDialog
     * @returns {EzChangePasswordDialog}
     */
    ezInit() {
        EzChangePasswordDialog.ezInstance.dialogId = '_ezChangePasswordDialog';

        EzChangePasswordDialog.ezInstance.currentUsernameInputId = '_CurrentEmail';

        EzChangePasswordDialog.ezInstance.currentPasswordInputId = '_CurrentPassword';

        EzChangePasswordDialog.ezInstance.newPasswordInputId = '_NewPassword';

        EzChangePasswordDialog.ezInstance.confirmNewPasswordInputId = '_ConfirmNewPassword';

        EzChangePasswordDialog.ezInstance._DialogClosing = false;

        EzChangePasswordDialog.ezInstance._DialogCanceling = false;

        EzChangePasswordDialog.ezInstance.onSuccess = undefined;

        EzChangePasswordDialog.ezInstance.onFailure = undefined;

        EzChangePasswordDialog.ezInstance.onCancel = undefined;

        let dialogConfig = new EzDialogConfig(EzChangePasswordDialog.ezInstance.dialogId);
        dialogConfig.width = 550;
        dialogConfig.buttons = {
            'Change': () => {
                EzChangePasswordDialog.ezInstance.changePassword(
                    ezApi.ezclocker.ezUi.ezGetInputValue(EzChangePasswordDialog.ezInstance.currentUsernameInputId),
                    ezApi.ezclocker.ezUi.ezGetInputValue(EzChangePasswordDialog.ezInstance.currentPasswordInputId),
                    ezApi.ezclocker.ezUi.ezGetInputValue(EzChangePasswordDialog.ezInstance.newPasswordInputId),
                    ezApi.ezclocker.ezUi.ezGetInputValue(EzChangePasswordDialog.ezInstance.confirmNewPasswordInputId));
            },
            Cancel: EzChangePasswordDialog.ezInstance.close
        };

        ezApi.ezclocker.ezUi.ezId(EzChangePasswordDialog.ezInstance.dialogId).dialog(dialogConfig);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'changePassButton',
            EzElementEventName.CLICK,
            EzChangePasswordDialog.ezApiName,
            ezApi.ezclocker.ezChangePasswordDialog.show);

        return EzChangePasswordDialog.ezInstance;
    }

    ezResetDialogData() {
        ezApi.ezclocker.ezUi.ezSetInputValue(
            EzChangePasswordDialog.ezInstance.currentUsernameInputId,
            EzString.empty);

        ezApi.ezclocker.ezUi.ezSetInputValue(
            EzChangePasswordDialog.ezInstance.currentPasswordInputId,
            EzString.empty);

        ezApi.ezclocker.ezUi.ezSetInputValue(
            EzChangePasswordDialog.ezInstance.newPasswordInputId,
            EzString.empty);

        ezApi.ezclocker.ezUi.ezSetInputValue(
            EzChangePasswordDialog.ezInstance.confirmNewPasswordInputId,
            EzString.empty);
    }

    /**
     * @public @method
     * Shows the dialog
     */
    show() {
        let featureSupported = !ezApi.ezclocker.ezUserRoleFeatures.ezUserRoleFeatureEnabledForUser(
            'account',
            EzUserRoleFeature.EZROLE_FEATURE_ACCOUNT_CHANGE_EMPLOYER_PASSWORD);

        if (EzBoolean.isFalse(featureSupported)) {
            return;
        }

        EzChangePasswordDialog.ezInstance.ezResetDialogData();

        ezApi.ezclocker.ezDialog.ezShowDialog(EzChangePasswordDialog.ezInstance.dialogId)
            .then(EzPromise.ignoreResolve);
    }

    /**
     * @public @method
     * Cancels the dialog
     */
    cancel() {
        if (EzChangePasswordDialog.ezInstance._DialogClosing) {
            return;
        }

        if (EzChangePasswordDialog.ezInstance._DialogCanceling) {
            return;
        }

        EzChangePasswordDialog.ezInstance._DialogCanceling = false;

        try {
            EzChangePasswordDialog.ezInstance.ezResetDialogData();

            ezApi.ezclocker.ezUi.ezId(EzChangePasswordDialog.ezInstance.dialogId).dialog('close');

            if (!EzObject.isValid(EzChangePasswordDialog.ezInstance.onCancel)) {
                return;
            }

            EzChangePasswordDialog.ezInstance.onCancel();
        } finally {
            EzChangePasswordDialog.ezInstance._DialogCanceling = false;
        }
    }

    /**
     * @public @method
     * Closes the dialog
     */
    close() {
        if (EzChangePasswordDialog.ezInstance._DialogClosing) {
            return;
        }

        EzChangePasswordDialog.ezInstance._DialogClosing = true;
        try {
            EzChangePasswordDialog.ezInstance.ezResetDialogData();

            ezApi.ezclocker.ezUi.ezId(EzChangePasswordDialog.ezInstance.dialogId).dialog('close');
        } finally {
            EzChangePasswordDialog.ezInstance._DialogClosing = false;
        }
    }

    /**
     * @protected @method
     * Executes the change password requesat
     * @param {string} username
     * @param {string} password
     * @param {string} newPassword
     * @param {string} confirmPassword
     */
    changePassword(username, password, newPassword, confirmPassword) {
        let featureSupported = !ezApi.ezclocker.ezUserRoleFeatures.ezUserRoleFeatureEnabledForUser('account',
            EzUserRoleFeature.EZROLE_FEATURE_ACCOUNT_CHANGE_EMPLOYER_PASSWORD);

        if (EzBoolean.isFalse(featureSupported)) {
            return;
        }

        if (newPassword != confirmPassword) {
            ezApi.ezclocker.ezDialog.ezShowError(
                'Password Change Error',
                'Your new password does not match the new password confirmation.');

            return;
        }

        let payload = {
            userName: EzString.stringHasLength(username)
                ? username
                : ezApi.ezclocker.ezUi.ezGetInputValue(EzChangePasswordDialog.ezInstance.currentUsernameInputId),
            password: EzString.stringHasLength(password)
                ? password
                : ezApi.ezclocker.ezUi.ezGetInputValue(EzChangePasswordDialog.ezInstance.currentPasswordInputId),
            newPassword: EzString.stringHasLength(newPassword)
                ? newPassword
                : ezApi.ezclocker.ezUi.ezGetInputValue(EzChangePasswordDialog.ezInstance.newPasswordInputId),
            confirmNewPassword: EzString.stringHasLength(confirmPassword)
                ? confirmPassword
                : ezApi.ezclocker.ezUi.ezGetInputValue(EzChangePasswordDialog.ezInstance.confirmNewPasswordInputId)
        };

        ezApi.ezclocker.ezHttpHelper.ezPost(
            ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl('account/password'),
            EzJson.toJson(payload))
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
            .then(
                (response, jqXHR) => {
                    if (ezApi.ezclocker.ezHttpHelper.isErrorResponse(response)) {
                        let em = ezApi.ezclocker.http.extractErrorResponseMessage(response);

                        ezApi.ezclocker.ezLogger.error(em);

                        ezApi.ezclocker.ezDialog.ezShowError('Password Change Error', em);

                        if (EzFunction.isFunction(EzChangePasswordDialog.ezInstance.onFailure)) {
                            EzChangePasswordDialog.ezInstance.onFailure(response, jqXHR);
                        }

                        return;
                    }

                    ezApi.ezclocker.ezDialog.ezShowMessage(
                        'Password Changed',
                        'You have successfully changed your password.');

                    EzChangePasswordDialog.ezInstance.close();

                    if (EzFunction.isFunction(EzChangePasswordDialog.ezInstance.onSuccess)) {
                        EzChangePasswordDialog.ezInstance.onSuccess(response, jqXHR);
                    }
                },
                (eResponse, jqXHR) => {
                    let em = ezApi.ezclocker.ezHttpHelper.extractErrorResponseMessage(eResponse);

                    ezApi.ezclocker.ezLogger.error(em);

                    ezApi.ezclocker.ezDialog.ezShowError('Password Change Error', em);

                    if (EzFunction.isFunction(EzChangePasswordDialog.ezInstance.onFailure)) {
                        EzChangePasswordDialog.ezInstance.onFailure(eResponse, jqXHR);
                    }
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
     * Returns the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static ezApiName = 'ezChangePasswordDialog';

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzChangePasswordDialog_Ready'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzChangePasswordDialog}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzChangePasswordDialog.ezApiName])
        ? globalThis.ezApi.ezclocker[EzChangePasswordDialog.ezApiName]
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzChangePasswordDialog}
     */
    static get ezInstance() {
        return EzChangePasswordDialog.#ezInstance;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzChangePasswordDialog} instance
     */
    static set ezInstance(instance) {
        if (null != EzChangePasswordDialog.#ezInstance) {
            throw new Error('EzChangePasswordDialog\'s singleton instance is already reigstered with EzApi.');
        }

        EzChangePasswordDialog.#ezInstance = instance;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzChangePasswordDialog.ezApiName])
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
        return EzChangePasswordDialog.#ezApiRegistrationState;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzChangePasswordDialog.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzChangePasswordDialog.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready &&

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
        return null != EzChangePasswordDialog.ezInstance &&
            EzRegistrationState.REGISTERED === EzChangePasswordDialog.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzChangePasswordDialog.#ezCanRegister && !EzChangePasswordDialog.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzChangePasswordDialog, EzChangePasswordDialog.ezApiName);
        }

        return EzChangePasswordDialog.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzChangePasswordDialog.ezApiName
     *     2) Property getter EzChangePasswordDialog.ezEventNames
     *     3) Property getter EzChangePasswordDialog.ezInstance
     *     4) Property setter EzChangePasswordDialog.ezInstance
     *     5) Property getter EzChangePasswordDialog.ezApiRegistrationState
     *     6) Property setter EzChangePasswordDialog.ezApiRegistrationState
     *     7) Property getter EzChangePasswordDialog.#ezCanRegister
     *     8) Property getter EzChangePasswordDialog.#ezIsRegistered
     *     9) Method EzChangePasswordDialog.#ezRegistrator()
     */
    static {
        if (!EzChangePasswordDialog.#ezIsRegistered) {
            EzChangePasswordDialog.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzChangePasswordDialog.#ezRegistrator()) {
                document.addEventListener(
                    EzChangePasswordDialog.ezOnEzApiReadyEventName,
                    EzChangePasswordDialog.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzChangePasswordDialog.#ezRegistrator);

                document.addEventListener(
                    EzHttpHelper.ezEventNames.onReady,
                    EzChangePasswordDialog.#ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.onReady,
                    EzChangePasswordDialog.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezOnEzApiReadyEventName,
                    EzChangePasswordDialog.#ezRegistrator);

                document.addEventListener(
                    EzDialog.ezOnEzApiReadyEventName,
                    EzChangePasswordDialog.#ezRegistrator);
            }
        }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // NO CODE AFTER THIS SECTION
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


}


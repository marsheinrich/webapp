import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzArray
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzRegistrationState } from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzUI } from '/public/javascript/common/ezui.js';

import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';

import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

/**
    @class
    @extends {EzClass}
    @description
    Provides the reset password
    ---------------------------------------------------------------------
    Import with:
        import { EzResetPasswordView } from '/public/widgets/EzResetPasswordView/EzResetPasswordView.js';
    ---------------------------------------------------------------------
    Ready Check:
        globalThis.ezApi.ezclocker[EzResetPasswordView.ezApiName] &&
        globalThis.ezApi.ezclocker[EzResetPasswordView.ezApiName].ready
    ---------------------------------------------------------------------
    Listen for Ready Event:
        document.addEventListener(
            EzResetPasswordView.ezEventNames.onReady,
            this.#ezRegistrator);
    ---------------------------------------------------------------------
 */
export class EzResetPasswordView extends EzClass {
    /**
        @static
        @public @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */
    static ezApiName = 'ezResetPasswordView';

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static ezEventNames = {
        onReady: 'ezOn_EzResetPasswordView_Ready',
        onShow: 'ezOn_EzResetPasswordView_Show',
        onClose: 'ezOn_EzResetPasswordView_Close',
        onSubmit: 'ezOn_EzResetPasswordView_Submit',
        onCancel: 'ezOn_EzResetPasswordView_Cancel',
        onError: 'ezOn_EzResetPasswordView_Error'
    };

    /**
        @static
        @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
        @type {EzResetPasswordView}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzResetPasswordView.ezApiName])
        ? globalThis.ezApi.ezclocker[EzResetPasswordView.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzResetPasswordView}
     */
    static get ezInstance() {
        return EzResetPasswordView.#ezInstance;
    }

    /**
        @static
        @public @property @setter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzResetPasswordView} ezResetPasswordView
     */
    static set ezInstance(ezResetPasswordView) {
        if (null != EzResetPasswordView.#ezInstance) {
            throw new Error('EzResetPasswordView\'s singleton instance is already reigstered with EzApi.');
        }

        EzResetPasswordView.#ezInstance = ezResetPasswordView;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzResetPasswordView.ezApiName])
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
        return EzResetPasswordView.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzResetPasswordView.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzResetPasswordView.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzDialog.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDialog.ezApiName].ready;
    }

    /**
        @static
        @private @readonly @property
        Returns if this class's singleton instance is registered with ezApi yet.
        @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzResetPasswordView.ezInstance &&
            EzRegistrationState.REGISTERED === EzResetPasswordView.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzResetPasswordView.#ezCanRegister && !EzResetPasswordView.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzResetPasswordView, EzResetPasswordView.ezApiName);
        }

        return EzResetPasswordView.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzResetPasswordView.ezApiName
            2) Property getter EzResetPasswordView.ezEventNames
            3) Property getter EzResetPasswordView.ezInstance
            4) Property setter EzResetPasswordView.ezInstance
            5) Property getter EzResetPasswordView.ezApiRegistrationState
            6) Property setter EzResetPasswordView.ezApiRegistrationState
            7) Property getter EzResetPasswordView.#ezCanRegister
            8) Property getter EzResetPasswordView.#ezIsRegistered
            9) Method EzResetPasswordView.#ezRegistrator()
     */
    static {
        if (!EzResetPasswordView.#ezIsRegistered) {
            EzResetPasswordView.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzResetPasswordView.#ezRegistrator()) {
                document.addEventListener(
                    EzResetPasswordView.ezOnEzApiReadyEventName,
                    EzResetPasswordView.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzResetPasswordView.#ezRegistrator);

                document.addEventListener(
                    EzDialog.ezEventNames.onReady,
                    EzResetPasswordView.#ezRegistrator);
            }
        }
    }

    /**
        @public @readonly @property
        Returns the root element's ID for this dialog
        @returns {string}
     */
    get ezDialogId() {
        return 'EzPasswordResetDialog'
    }

    /**
        @public @readonly @property
        Returns an object of key/value that represent the UX element name = element id
        @returns {string}
     */
    get ezIds() {
        return {
            dialogId: this.ezDialogId,
            inputs: {
                emailOrUsernameInputId: `${this.ezDialogId}_EmailAddressOrUserNameInput`,
                mobilePhoneNumberInputId: `${this.ezDialogId}_MobilePhoneNumberInput`
            },
            containers: {

            },
            buttons: {
                resetMyPasswordButtonId: `${this.ezDialogId}_ReesetMyPasswordButton`,
                cancelButtonId: `${this.ezDialogId}_CancelButton`
            }
        };
    }

    /**
        @protected @method
        Initializes EzResetPasswordView
        @returns {EzResetPasswordView}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzResetPasswordView.ezApiName,
            EzResetPasswordView.ezEventNames.onShow);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzResetPasswordView.ezApiName,
            EzResetPasswordView.ezEventNames.onClose);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzResetPasswordView.ezApiName,
            EzResetPasswordView.ezEventNames.onSubmit);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzResetPasswordView.ezApiName,
            EzResetPasswordView.ezEventNames.onError);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzResetPasswordView.ezApiName,
            EzResetPasswordView.ezEventNames.onCancel);

        EzResetPasswordView.ezInstance.ezInitUX();

        return EzResetPasswordView.ezInstance;
    }

    /**
        @protected @method
        Initializes the UX
     */
    ezInitUX() {
        let ezDialogConfig = new EzDialogConfig(EzResetPasswordView.ezInstance.ezDialogId);

        ezDialogConfig.title = 'Reset Password'

        ezDialogConfig.width = 400;

        ezDialogConfig.buttons = [
            {
                id: EzResetPasswordView.ezInstance.ezIds.buttons.resetMyPasswordButtonId,
                text: 'Reset My Password',
                click: EzResetPasswordView.ezInstance.ezSubmit,
            },
            {
                id: EzResetPasswordView.ezInstance.ezIds.buttons.cancelButtonId,
                text: 'Cancel',
                click: EzResetPasswordView.ezInstance.ezCancel
            }
        ];

        ezApi.ezclocker.ezDialog.ezInitDialogWithConfig(
            EzResetPasswordView.ezInstance.ezDialogId,
            ezDialogConfig);
    }

    /**
        @public @method
        Displays the dialog's UX
     */
    ezShow(emailOrUsername) {
        ezApi.ezclocker.ezUi.ezSetInputValue(
            EzResetPasswordView.ezInstance.ezIds.inputs.emailOrUsernameInputId,
            EzString.stringOrEmpty(emailOrUsername));

        ezApi.ezclocker.ezDialog.ezShowDialog(EzResetPasswordView.ezInstance.ezDialogId);

        ezApi.ezclocker.ezUi.ezFocusElement(EzResetPasswordView.ezInstance.ezIds.inputs.emailOrUsernameInputId);

        ezApi.ezclocker.ezUi.ezSelectAll(EzResetPasswordView.ezInstance.ezIds.inputs.emailOrUsernameInputId);
    }

    /**
        @public @method
        Closes dialog (no other action performed)
     */
    ezClose() {
        ezApi.ezclocker.ezDialog.ezCloseDialog(EzResetPasswordView.ezInstance.ezDialogId);

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzResetPasswordView.ezInstance.ezEventNames.onClose);
    }

    /**
        @public @method
        Cancels the dialog without executing the submission.
     */
    ezCancel() {
        EzResetPasswordView.ezInstance.ezClose();

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzResetPasswordView.ezInstance.ezEventNames.onCancel);
    }

    /**
        @public @method
        Submits the password reset request for the dialog
     */
    ezSubmit() {
        let emailAddress = ezApi.ezclocker.ezUi.ezGetInputValue(EzResetPasswordView.ezInstance.ezIds.inputs.emailOrUsernameInputId);

        let phone = ezApi.ezclocker.ezUi.ezGetInputValue(EzResetPasswordView.ezInstance.ezIds.inputs.mobilePhoneNumberInputId);

        let userNameToUse = EzString.stringHasLength(emailAddress)
            ? emailAddress
            : phone;

        ezApi.ezclocker.ezUi.ezStartPageWaitExecute('Requesting a password reset for your account ...',
            (waitDone) => ezApi.ezclocker.ezAccountServices.ezRequestPasswordReset(
                userNameToUse,
                emailAddress,
                phone)
                .then(
                    (response) => waitDone()
                        .then(
                            () => {
                                if (ezApi.ezclocker.ezHttpHelper.isErrorResponse(response)) {
                                    let eTitle = 'Error During Password Reset';
                                    let eMessage = ezApi.ezEM`
                                        EzClocker is unable to reset your password at this time. Please tray again later.
                                        If you continue to see this error please contact support@ezclocker.com.`;

                                    ezApi.ezclocker.ezDialog.ezShowError(
                                        eTitle,
                                        eMessage,
                                        null,
                                        600,
                                        400);

                                    ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                        EzResetPasswordView.ezEventNames.onError,
                                        ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                            EzResetPasswordView.ezApiName,
                                            eTitle,
                                            {
                                                message: eMessage,
                                                errorResponse: response
                                            }));
                                } else {
                                    let title = 'Next Steps';

                                    let message = EzHtml.build`
                                        <div>
                                            Please check your email. EzClocker has sent you instructions on how to
                                            reset your password.
                                        </div>`;

                                    if (0 < emailAddress.indexOf('@')) {
                                        let mailName = emailAddress.substring(0, amail.indexOf('@')).toLowerCase();

                                        let emailDomain = emailAddress.substring(emailAddress.indexOf('@') + 1).toLowerCase();

                                        switch (emailDomain) {
                                            case 'mailinator.com':
                                                message = EzHtml.build`
                                                    ${message}
                                                    <p>
                                                        <a
                                                            href="https://www.mailinator.com/v4/public/inboxes.jsp?to=${mailName}"
                                                            target="_MAILINATOR_INBOX_FOR_${mailName}"
                                                            class="ezLink-ezClockerNavy">
                                                            Click to open ${emailDomain} in a new browser tab.
                                                        </a>
                                                    </p>`;
                                                break;
                                            case 'google.com':
                                                message = EzHtml.build`
                                                    ${message}
                                                    <p>
                                                        <a
                                                            href="https://mail.google.com"
                                                            target="_GMAIL_INBOX_FOR_${mailName}"
                                                            class="ezLink-ezClockerNavy">
                                                            Click to open ${mail.google.com} in a new browser tab.
                                                        </a>
                                                    </p>`;
                                                break;
                                            case 'ymail.com':
                                            case 'yahoo.com':
                                                message = EzHtml.build`
                                                ${message}
                                                <p>
                                                    <a
                                                        href="https://mail.yahoo.com"
                                                        target="_YAHOO_INBOX_FOR_${mailName}"
                                                        class="ezLink-ezClockerNavy">
                                                        Click to open ${mail.yahoo.com} in a new browser tab.
                                                    </a>
                                                </p>`;
                                                break;
                                            case 'live.com':
                                            case 'msn.com':
                                            case 'hotmail.com':
                                            case 'outlook.com':
                                                // https://outlook.live.com/
                                                message = EzHtml.build`
                                                ${message}
                                                <p>
                                                    <a
                                                        href="https://outlook.live.com"
                                                        target="_YAHOO_INBOX_FOR_${mailName}"
                                                        class="ezLink-ezClockerNavy">
                                                        Click to open ${mail.yahoo.com} in a new browser tab.
                                                    </a>
                                                </p>`;
                                                break;
                                            case 'aol.com':
                                                // https://login.aol.com/?src=mail
                                                message = EzHtml.build`
                                                ${message}
                                                <p>
                                                    <a
                                                        href="https://login.aol.com/?src=mail"
                                                        target="_AOL_INBOX_FOR_${mailName}"
                                                        class="ezLink-ezClockerNavy">
                                                        Click to open ${mail.yahoo.com} in a new browser tab.
                                                    </a>
                                                </p>`;
                                                break;
                                            case 'xfinity.com':
                                            case 'comcast.net':
                                                // https://login.xfinity.com/login
                                                message = EzHtml.build`
                                                ${message}
                                                <p>
                                                    <a
                                                        href="https://login.xfinity.com/login"
                                                        target="_XFINITY_INBOX_FOR_${mailName}"
                                                        class="ezLink-ezClockerNavy">
                                                        Click to open ${mail.yahoo.com} in a new browser tab.
                                                    </a>
                                                </p>`;
                                                break;
                                            case 'earthlink.net':
                                                // https://webmail1.earthlink.net/login
                                                message = EzHtml.build`
                                                ${message}
                                                <p>
                                                    <a
                                                        href="https://webmail.earthlink.net"
                                                        target="_EARTHLINK_INBOX_FOR_${mailName}"
                                                        class="ezLink-ezClockerNavy">
                                                        Click to open ${mail.yahoo.com} in a new browser tab.
                                                    </a>
                                                </p>`;
                                                break;
                                            case 'icloud.com':
                                            case 'me.com':
                                            case 'mac.com':
                                                // https://www.icloud.com/mail
                                                message = EzHtml.build`
                                                ${message}
                                                <p>
                                                    <a
                                                        href="https://www.icloud.com/mail"
                                                        target="_icloud_INBOX_FOR_${mailName}"
                                                        class="ezLink-ezClockerNavy">
                                                        Click to open ${mail.yahoo.com} in a new browser tab.
                                                    </a>
                                                </p>`;
                                                break;
                                            default:
                                            // Rare, custom, or unknown email provider ... ignoring
                                        }
                                    }

                                    ezApi.ezclocker.ezDialog.ezShowMessage(
                                        title,
                                        message,
                                        null,
                                        null,
                                        600,
                                        250);

                                    ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                        EzResetPasswordView.ezEventNames.onSubmit,
                                        ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                            EzResetPasswordView.ezApiName,
                                            title,
                                            {
                                                message: message,
                                                response: response
                                            }));
                                }
                            }),
                    (eResponse) => waitDone()
                        .then(
                            () => {
                                let eTitle = 'Error During Password Reset';

                                let eMessage = ezApi.ezEM`
                                    EzClocker is unable to reset your password at this time. Please tray again later.
                                    If you continue to see this error please contact support@ezclocker.com.`;

                                ezApi.ezclocker.ezDialog.ezShowError(
                                    eTitle,
                                    eMessage,
                                    null,
                                    600,
                                    400);

                                ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                                    EzResetPasswordView.ezEventNames.onError,
                                    ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                                        EzResetPasswordView.ezApiName,
                                        eTitle,
                                        {
                                            message: eMessage,
                                            errorResponse: eResponse
                                        }));
                            })));
    }
}

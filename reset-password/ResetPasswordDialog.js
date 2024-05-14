import {
    EzObject,
    EzBoolean,
    EzString
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzValidationResponseStatus,
    EzElementEventName
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';
import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

import { EzAccountServices } from '/public/javascript/services/ezclocker-account-services.js';

import { EzUI } from '/public/javascript/common/ezui.js';

/**
    @class
    @extends {EzClass}
    @description
    Controller for the reset-password view
    ---------------------------------------------------------------------------
    Import with:
        import { EzResetPasswordPage } from '/reset-password/ResetPasswordDialog.js';
    ---------------------------------------------------------------------------
    Is ready check:
        globalThis.ezApi.ezclocker[EzResetPasswordPage.ezApiName] &&
        globalThis.ezApi.ezclocker[EzResetPasswordPage.ezApiName].ready &&
    ---------------------------------------------------------------------------
    Listen for ready event:
        document.addEventListener(
            EzResetPasswordPage.ezEventNames.onReady,
            this.#ezRegistrator);
    ---------------------------------------------------------------------------
 */
export class EzResetPasswordPage extends EzClass {
    /**
        @static
        @public @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'ezResetPasswordPage';
    }

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzResetPasswordPage_Ready'
        };
    }

    /**
        @static
        @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
        @type {EzResetPasswordPage}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzResetPasswordPage.ezApiName])
        ? globalThis.ezApi.ezclocker[EzResetPasswordPage.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzResetPasswordPage}
     */
    static get ezInstance() {
        return EzResetPasswordPage.#ezInstance;
    }

    /**
        @static
        @public @property @setter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzResetPasswordPage} instance
     */
    static set ezInstance(instance) {
        if (null != EzResetPasswordPage.#ezInstance) {
            throw new Error('EzResetPasswordPage\'s singleton instance is already reigstered with EzApi.');
        }

        EzResetPasswordPage.#ezInstance = instance;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzResetPasswordPage.ezApiName])
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
        return EzResetPasswordPage.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzResetPasswordPage.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzResetPasswordPage.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzAccountServices.ezApiName] &&
            globalThis.ezApi.ezclocker[EzAccountServices.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready;
    }

    /**
        @static
        @private @readonly @property
        Returns if this class's singleton instance is registered with ezApi yet.
        @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzResetPasswordPage.ezInstance &&
            EzRegistrationState.REGISTERED === EzResetPasswordPage.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzResetPasswordPage.#ezCanRegister && !EzResetPasswordPage.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzResetPasswordPage, EzResetPasswordPage.ezApiName);
        }

        return EzResetPasswordPage.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzResetPasswordPage.ezApiName
            2) Property getter EzResetPasswordPage.ezEventNames
            3) Property getter EzResetPasswordPage.ezInstance
            4) Property setter EzResetPasswordPage.ezInstance
            5) Property getter EzResetPasswordPage.ezApiRegistrationState
            6) Property setter EzResetPasswordPage.ezApiRegistrationState
            7) Property getter EzResetPasswordPage.#ezCanRegister
            8) Property getter EzResetPasswordPage.#ezIsRegistered
            9) Method EzResetPasswordPage.#ezRegistrator()
     */
    static {
        if (!EzResetPasswordPage.#ezIsRegistered) {
            EzResetPasswordPage.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzResetPasswordPage.#ezRegistrator()) {
                document.addEventListener(
                    EzResetPasswordPage.ezOnEzApiReadyEventName,
                    () => {
                        if (!EzResetPasswordPage.#ezRegistrator()) {

                            document.addEventListener(
                                EzEventEngine.ezEventNames.onReady,
                                EzResetPasswordPage.#ezRegistrator);

                            document.addEventListener(
                                EzNavigation.ezEventNames.onReady,
                                EzResetPasswordPage.#ezRegistrator);

                            document.addEventListener(
                                EzAccountServices.ezEventNames.onReady,
                                EzResetPasswordPage.#ezRegistrator);

                            document.addEventListener(
                                EzUI.ezEventNames.onReady,
                                EzResetPasswordPage.#ezRegistrator);
                        }
                    });
            }
        }
    }

    /**
        @public @constructor
        >> DO NOT CREATE NEW INSTANCES OUTSIDE OF THE STATIC INITIALIZATION FLOW <<
        Use the static singleton instance available from ezApi: ezApi.ezclocker.EzResetPasswordPage.
     */
    constructor() {
        super();
    }

    /**
        @public @readonly @property
        Gets the dialog id
        @returns {string}
     */
    get ezDialogId() {
        return 'EzResetPasswordDialog';
    }

    /**
        @public @readonly @property
        Gets the email address input id
        @returns {string}
     */
    get ezEmailAddressInputId() {
        return 'EzEmailAddress';
    }

    /**
        @public @readonly @property
        Gets the password input id
        @returns {string}
     */
    get ezNewPasswordInputId() {
        return 'EzNewPassword';
    }

    /**
        @public @readonly @property
        Gets the confirm password input id
        @returns {string}
     */
    get ezConfirmPasswordInputId() {
        return 'EzConfirmPassword';
    }

    /**
        @public @readonly @property
        Gets the reset password button id
        @returns {string}
     */
    get ezResetPasswordButtonId() {
        return 'EzResetPasswordButton';
    }

    /**
        @public @readonly @property
        Gets the cancel button id
        @returns {string}
     */
    get ezCancelPasswordResetButtonId() {
        return 'EzCancelPasswordReset';
    }

    /**
        @public @readonly @property
        Gets the password error box id
        @returns {string}
     */
    get ezNewPasswordErrorBoxId() {
        return 'EzNewPasswordError';
    }

    /**
        @public @readonly @property
        Gets the general reset error box id
        @returns {string}
     */
    get ezGeneralResetErrorBox() {
        return 'EzResetPassword_ErrorBox';
    }

    /**
        @protected @method
        Initializes the EzResetPasswordPage
        @returns {EzResetPasswordPage}
     */
    ezInit() {
        ezApi.ezclocker.ezUrlHelper.getPasswordResetTokenParam();

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzResetPasswordPage.ezInstance.ezResetPasswordButtonId,
            EzElementEventName.CLICK,
            EzResetPasswordPage.ezApiName,
            EzResetPasswordPage.ezInstance.ezSubmit);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            EzResetPasswordPage.ezInstance.ezCancelPasswordResetButtonId,
            EzElementEventName.CLICK,
            EzResetPasswordPage.ezApiName,
            EzResetPasswordPage.ezInstance.ezClose);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'document',
            EzElementEventName.KEY_PRESS,
            EzResetPasswordPage.ezApiName,
            EzResetPasswordPage.ezInstance.ezHandleWindowKeyPress);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'window',
            EzElementEventName.RESIZE,
            EzResetPasswordPage.ezApiName,
            EzResetPasswordPage.ezInstance.ezHandleWindowResizeEvent);

        EzResetPasswordPage.ezInstance.ezShow();

        return EzResetPasswordPage.ezInstance;
    }

    /**
        @protected @method
        Resets the dialog to default state
     */
    ezReset() {
        EzResetPasswordPage.ezInstance.ezHideNewPasswordErrorBox();

        EzResetPasswordPage.ezInstance.ezHideResetPasswordErrorBox();
    }

    /**
        @protected @method
        Closes the dialog
     */
    ezClose() {
        ezApi.ezclocker.ezNavigation.ezNavigateToSignIn();
    }

    /**
        @protected @method
        Shows the dialog
     */
    ezShow() {
        EzResetPasswordPage.ezInstance.ezReset();

        EzResetPasswordPage.ezInstance.ezHandleWindowResizeEvent();

        ezApi.ezclocker.ezUi.ezFocusElement(EzResetPasswordPage.ezInstance.ezEmailAddressInputId);
    }

    /**
        @protected @method
        Submits the reset password data
     */
    ezSubmit() {
        if (!EzResetPasswordPage.ezInstance.ezValidate()) {
            return;
        }

        ezApi.ezclocker.ezUi.ezDisableElement(EzResetPasswordPage.ezInstance.ezResetPasswordButtonId);

        let emailAddress = ezApi.ezclocker.ezUi.ezGetInputValue(EzResetPasswordPage.ezInstance.ezEmailAddressInputId);

        let newPW = ezApi.ezclocker.ezUi.ezGetInputValue(EzResetPasswordPage.ezInstance.ezNewPasswordInputId);

        ezApi.ezclocker.ezUi.ezStartPageWaitExecute(
            'Reseting your password...',
            (waitDone) => ezApi.ezclocker.ezAccountServices.ezResetPassword(
                ezApi.ezclocker.ezUrlHelper.passwordResetToken,
                emailAddress,
                newPW,
                ezApi.ezclocker.ezUi.ezGetInputValue(EzResetPasswordPage.ezInstance.ezConfirmPasswordInputId))
                .then(
                    () => waitDone()
                        .then(
                            () => {
                                if (!ezApi.ezclocker.ezBrowserInfo.ezIsMobile()) {
                                    ezApi.ezclocker.ezAccountServices.ezSignIn(
                                        emailAddress,
                                        ezApi.ezclocker.ezUi.ezGetInputValue(EzResetPasswordPage.ezInstance.ezNewPasswordInputId),
                                        null,
                                        false,
                                        'EzHideDialogsDiv');
                                } else {
                                    ezApi.ezclocker.ezNavigation.ezNavigateToNewMobilePublicPage('download');
                                }
                            }),
                    (eResponse) => waitDone()
                        .then(
                            () => {
                                EzResetPasswordPage.ezInstance.ezShowResetPasswordErrorBox(eResponse.message);

                                ezApi.ezclocker.ezUi.ezEnableElement(EzResetPasswordPage.ezInstance.ezResetPasswordButtonId);
                            })));
    }

    /**
        @protected @method
        Validates the reset password inputs
     */
    ezValidate() {
        return EzValidationResponseStatus.ERROR !== ezApi.ezclocker.ezValidation.ezValidateResetPasswordInputs(
            EzResetPasswordPage.ezInstance.ezNewPasswordInputId,
            EzResetPasswordPage.ezInstance.ezConfirmPasswordInputId,
            EzResetPasswordPage.ezInstance.ezNewPasswordErrorBoxId).ezStatus;
    }

    /**
        @protected @method
        Hides the new password error box
     */
    ezHideNewPasswordErrorBox() {
        ezApi.ezclocker.ezUi.ezHideElement(EzResetPasswordPage.ezInstance.ezNewPasswordErrorBoxId);

        ezApi.ezclocker.ezUi.ezContent(EzResetPasswordPage.ezInstance.ezNewPasswordErrorBoxId, '');
    }

    /**
        @protected @method
        Hides the general error box
     */
    ezHideResetPasswordErrorBox() {
        ezApi.ezclocker.ezUi.ezHideElement(EzResetPasswordPage.ezInstance.ezGeneralResetErrorBox);

        ezApi.ezclocker.ezUi.ezContent(EzResetPasswordPage.ezInstance.ezGeneralResetErrorBox, '');
    }

    /**
        @protected @method
        Shows the dialogs general error box with the provided message
        @param {string} em
     */
    ezShowResetPasswordErrorBox(em) {
        if (EzString.stringHasLength(em)) {
            ezApi.ezclocker.ezUi.ezContent(
                EzResetPasswordPage.ezInstance.ezGeneralResetErrorBox,
                em);

            ezApi.ezclocker.ezUi.ezShowElement(EzResetPasswordPage.ezInstance.ezGeneralResetErrorBox);
        }
    }

    /**
        @protected @method
        Handles document onkeypress event
        event.data = element's event object
        @param {object} event
     */
    ezHandleWindowKeyPress(event) {
        let key = event.data.elementEvent.key;

        let keyCode = event.data.elementEvent.keyCode;

        let which = event.data.elementEvent.which;

        if ('Escape' === key || 27 === keyCode || 27 === which) {
            EzResetPasswordPage.ezInstance.ezClose();
        } else if ('Enter' === key || 13 === keyCode || 13 === which) {
            EzResetPasswordPage.ezInstance.ezSubmit();
        }
    }

    /**
        @protected @method
        Handles the window's resize event
     */
    ezHandleWindowResizeEvent() {
        let em = ezApi.ezclocker.ezUi.ezGetElementContent(EzResetPasswordPage.ezInstance.ezGeneralResetErrorBox);

        ezApi.ezclocker.ezUi.ezHideElement(EzResetPasswordPage.ezInstance.ezGeneralResetErrorBox);

        if (!ezApi.ezclocker.ezBrowserInfo.ezIsMobile() && window.innerWidth > 600) {
            ezApi.ezclocker.ezUi.ezSetElementCss(
                EzResetPasswordPage.ezInstance.ezDialogId,
                'minWidth',
                '600px');

            ezApi.ezclocker.ezUi.ezSetElementCss(
                EzResetPasswordPage.ezInstance.ezDialogId,
                'maxWidth',
                `${ezApi.ezclocker.ezUi.ezGetElementRect(EzResetPasswordPage.ezInstance.ezDialogId).ezWidth().get()}px`);
        } else {
            ezApi.ezclocker.ezUi.ezSetElementCss(
                EzResetPasswordPage.ezInstance.ezDialogId,
                'minWidth',
                'auto');
        }

        if (EzString.stringHasLength(em)) {
            EzResetPasswordPage.ezInstance.ezShowResetPasswordErrorBox(em);
        }
    }
}

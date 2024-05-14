import {
    EzObject,
    EzBoolean,
    EzString,
    EzUrl,
    EzJson,
    EzHtml
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzElementEventName,
    EzRegistrationState,
    EzValidationResponseStatus
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

import { EzAccountServices } from '/public/javascript/services/ezclocker-account-services.js';

import { EzUI } from '/public/javascript/common/ezui.js';

/**
 * Controller for the employee sign-up page.
 */
export class EzEmployeeSignupNewController extends EzClass {
    /**
        @static
        @public @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'ezEmployeeSignupNewController';
    }

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzEmployeeSignupNewController_Ready'
        };
    }

    /**
        @static
        @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
        @type {EzEmployeeSignupNewController}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzEmployeeSignupNewController.ezApiName])
        ? globalThis.ezApi.ezclocker[EzEmployeeSignupNewController.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzEmployeeSignupNewController}
     */
    static get ezInstance() {
        return EzEmployeeSignupNewController.#ezInstance;
    }

    /**
        @static
        @public @property @setter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzEmployeeSignupNewController} instance
     */
    static set ezInstance(instance) {
        if (null != EzEmployeeSignupNewController.#ezInstance) {
            throw new Error('EzEmployeeSignupNewController\'s singleton instance is already reigstered with EzApi.');
        }

        EzEmployeeSignupNewController.#ezInstance = instance;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzEmployeeSignupNewController.ezApiName])
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
        return EzEmployeeSignupNewController.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzEmployeeSignupNewController.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzEmployeeSignupNewController.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName].ready &&

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
        return null != EzEmployeeSignupNewController.ezInstance &&
            EzRegistrationState.REGISTERED === EzEmployeeSignupNewController.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzEmployeeSignupNewController.#ezCanRegister && !EzEmployeeSignupNewController.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzEmployeeSignupNewController, EzEmployeeSignupNewController.ezApiName);
        }

        return EzEmployeeSignupNewController.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzEmployeeSignupNewController.ezApiName
            2) Property getter EzEmployeeSignupNewController.ezEventNames
            3) Property getter EzEmployeeSignupNewController.ezInstance
            4) Property setter EzEmployeeSignupNewController.ezInstance
            5) Property getter EzEmployeeSignupNewController.ezApiRegistrationState
            6) Property setter EzEmployeeSignupNewController.ezApiRegistrationState
            7) Property getter EzEmployeeSignupNewController.#ezCanRegister
            8) Property getter EzEmployeeSignupNewController.#ezIsRegistered
            9) Method EzEmployeeSignupNewController.#ezRegistrator()
     */
    static {
        if (!EzEmployeeSignupNewController.#ezIsRegistered) {
            EzEmployeeSignupNewController.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzEmployeeSignupNewController.#ezRegistrator()) {
                document.addEventListener(
                    EzEmployeeSignupNewController.ezOnEzApiReadyEventName,
                    EzEmployeeSignupNewController.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzEmployeeSignupNewController.#ezRegistrator);

                document.addEventListener(
                    EzHttpHelper.ezEventNames.onReady,
                    EzEmployeeSignupNewController.#ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.onReady,
                    EzEmployeeSignupNewController.#ezRegistrator);

                document.addEventListener(
                    EzAccountServices.ezEventNames.onReady,
                    EzEmployeeSignupNewController.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzEmployeeSignupNewController.#ezRegistrator);
            }
        }
    }

    /**
        @private @field
        Stores the invite token from the url query params
        @type {string}
     */
    #inviteToken = null;
    /**
        @public @property @getter
        Gets the invite token from the url query params
        @returns {string}
     */
    get inviteToken() {
        return this.#inviteToken;
    }
    /**
        @public @property @setter
        Sets the invite token from the url query params
        @param {string} inviteToken
     */
    set inviteToken(inviteToken) {
        this.#inviteToken = EzString.stringOrEmpty(inviteToken);
    }

    /**
        @private @field
        Stores the email address from the url query params
        @type {string}
     */
    #email = null;
    /**
        @public @property @getter
        Gets the email address from the url query params
        @returns {string}
     */
    get email() {
        return this.#email;
    }
    /**
        @public @property @setter
        Sets the email address from the url query params
        @param {string} email
     */
    set email(email) {
        this.#email = EzString.stringOrEmpty(email);
    }

    /**
        @private @field
        Stores the user name from the url query params
        @type {string}
     */
    #userName = null;
    /**
        @public @property @getter
        Gets the user name from the url query params
        @returns {string}
     */
    get userName() {
        return this.#userName;
    }
    /**
        @public @property @setter
        Sets the user name from the url query params
        @param {string} userName
     */
    set userName(userName) {
        this.#userName = EzString.stringOrEmpty(userName);
    }

    /**
        @private @field
        Stores the name from the url query params
        @type {string}
     */
    #name = null;
    /**
        @public @property @getter
        Gets the name from the url query params
        @returns {string}
     */
    get name() {
        return this.#name;
    }
    /**
        @public @property @setter
        Sets the name from the url query params
        @param {string} name
     */
    set name(name) {
        this.#name = EzString.stringOrEmpty(name);
    }

    /**
        Initializes ezEmployeeSignupNewController
        @public @method
        Initializes the EzEmployeeSignupNewController
     */
    ezInit() {
        EzEmployeeSignupNewController.ezInstance.inviteToken = EzUrl.decodeURL(ezApi.ezclocker.ezUrlHelper.getInviteTokenParam());

        EzEmployeeSignupNewController.ezInstance.email = EzHtml.encodeHtml(
            EzUrl.decodeURL(ezApi.ezclocker.ezUrlHelper.getEmailParam()));

        EzEmployeeSignupNewController.ezInstance.name = EzHtml.encodeHtml(
            EzUrl.decodeURL(ezApi.ezclocker.ezUrlHelper.getNameParam()));

        EzEmployeeSignupNewController.ezInstance.userName = EzHtml.encodeHtml(
            EzUrl.decodeURL(ezApi.ezclocker.ezUrlHelper.getUserNameParam()));

        EzEmployeeSignupNewController.ezInstance.ezInitUX();

        return EzEmployeeSignupNewController.ezInstance;
    }

    /**
        Initalizes the dialog UX
        @public @method
     */
    ezInitUX() {
        ezApi.ezclocker.ezUi.ezSetInputValue(
            'EzEmployeeSignUp_Name',
            EzEmployeeSignupNewController.ezInstance.name);

        ezApi.ezclocker.ezUi.ezSetContent(
            'EzEmployeeSignUp_NameLabel',
            EzEmployeeSignupNewController.ezInstance.name);

        // Assign the params to the inputs
        ezApi.ezclocker.ezUi.ezSetInputValue(
            'EzEmployeeSignUp_InviteToken',
            EzEmployeeSignupNewController.ezInstance.inviteToken);

        if (EzString.hasLength(EzEmployeeSignupNewController.ezInstance.email)) {
            ezApi.ezclocker.ezUi.ezHideElement('EzEmployeeSignUp_UserNameRow');

            ezApi.ezclocker.ezUi.ezClearContent('EzEmployeeSignUp_UserNameLabel');

            ezApi.ezclocker.ezUi.ezSetInputValue('EzEmployeeSignUp_UserName', EzString.EMPTY);

            ezApi.ezclocker.ezUi.ezSetContent(
                'EzEmployeeSignUp_EmailAddressLabel',
                EzUrl.decodeURL(EzEmployeeSignupNewController.ezInstance.email));

            ezApi.ezclocker.ezUi.ezShowElement('EzEmployeeSignUp_EmailAddressRow');

            ezApi.ezclocker.ezUi.ezSetInputValue(
                'EzEmployeeSignUp_EmailAddress',
                EzUrl.decodeURL(EzEmployeeSignupNewController.ezInstance.email));
        } else if (EzString.hasLength(EzEmployeeSignupNewController.ezInstance.userName)) {
            ezApi.ezclocker.ezUi.ezHideElement('EzEmployeeSignUp_EmailAddressRow');

            ezApi.ezclocker.ezUi.ezSetContent(
                'EzEmployeeSignUp_EmailAddressLabel',
                EzString.EMPTY);

            ezApi.ezclocker.ezUi.ezSetInputValue(
                'EzEmployeeSignUp_EmailAddress',
                EzString.EMPTY);

            ezApi.ezclocker.ezUi.ezSetContent(
                'EzEmployeeSignUp_UserNameLabel',
                EzUrl.decodeURL(EzEmployeeSignupNewController.ezInstance.userName));

            ezApi.ezclocker.ezUi.ezShowElement('EzEmployeeSignUp_UserNameRow');

            ezApi.ezclocker.ezUi.ezSetInputValue(
                'EzEmployeeSignUp_UserName',
                EzUrl.decodeURL(EzEmployeeSignupNewController.ezInstance.userName));
        }

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'EzEmployeeSignUp_CancelBtn',
            EzElementEventName.CLICK,
            EzEmployeeSignupNewController.ezApiName,
            ezApi.ezclocker.ezNavigation.navigateToMain);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'EzEmployeeSignUp_Password',
            EzElementEventName.KEY_UP,
            EzEmployeeSignupNewController.ezApiName,
            EzEmployeeSignupNewController.ezInstance.ezHandlePasswordKeyPress);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'EzEmployeeSignUp_SubmitBtn',
            EzElementEventName.CLICK,
            EzEmployeeSignupNewController.ezApiName,
            EzEmployeeSignupNewController.ezInstance.ezSubmit);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'document',
            EzElementEventName.KEY_PRESS,
            EzEmployeeSignupNewController.ezApiName,
            EzEmployeeSignupNewController.ezInstance.ezHandleWindowKeyPress);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'window',
            EzElementEventName.RESIZE,
            EzEmployeeSignupNewController.ezApiName,
            EzEmployeeSignupNewController.ezInstance.ezHandleWindowResizeEvent);

        EzEmployeeSignupNewController.ezInstance.ezHandleWindowResizeEvent();

        EzEmployeeSignupNewController.ezInstance.ezShow();
    }

    /**
        @public @method
        Resets the employee sign-up dialog to defaults.
     */
    ezReset() {
        EzEmployeeSignupNewController.ezInstance.ezHideSignupError();

        EzEmployeeSignupNewController.ezInstance.ezHideEmployeeSignUpErrorBox();
    }

    /**
        @public @method
        Shows the employee sign-up dialog
     */
    ezShow() {
        // Make sure user is signed out
        ezApi.ezclocker.ezNavigation.ezSilentSignOut();

        EzEmployeeSignupNewController.ezInstance.ezReset();

        ezApi.ezclocker.ezUi.ezShowElementAnimated(
            'EzEmployeeSignupDialog',
            'animate__zoomInDown');

        ezApi.ezclocker.ezUi.ezFocusElement('EzEmployeeSignUp_Password');
    }

    /**
        @public @method
        Closes the employee signin dialog
     */
    ezClose() {
        ezApi.ezclocker.ezUi.ezHideElementAnimated(
            'EzEmployeeSignupDialog',
            'animate__zoomOutUp');

        ezApi.ezclocker.ezNavigation.ezNavigateToMain();
    }

    /**
        @public @method
        Submits the employee signup
     */
    ezSubmit() {
        if (!EzEmployeeSignupNewController.ezInstance.ezValidate()) {
            return;
        }

        ezApi.ezclocker.ezUi.ezStartPageWait(
            'Creating your employee account ...',
            (waitDone) => {
                let payload = {
                    inviteToken: ezApi.ezclocker.ezUi.ezGetInputValue('EzEmployeeSignUp_InviteToken'),
                    name: ezApi.ezclocker.ezUi.ezGetInputValue('EzEmployeeSignUp_Name'),
                    emailAddress: ezApi.ezclocker.ezUi.ezGetInputValue('EzEmployeeSignUp_EmailAddress'),
                    userName: ezApi.ezclocker.ezUi.ezGetInputValue('EzEmployeeSignUp_UserName'),
                    displayName: ezApi.ezclocker.ezUi.ezGetInputValue('EzEmployeeSignUp_Name'),
                    password: ezApi.ezclocker.ezUi.ezGetInputValue('EzEmployeeSignUp_Password'),
                    source: 'WEBSITE'
                };

                let emailOrUserName = EzString.hasLength(ezApi.ezclocker.ezUi.ezGetInputValue('EzEmployeeSignUp_EmailAddress'))
                    ? ezApi.ezclocker.ezUi.ezGetInputValue('EzEmployeeSignUp_EmailAddress')
                    : ezApi.ezclocker.ezUi.ezGetInputValue('EzEmployeeSignUp_UserName');

                ezApi.ezclocker.ezHttpHelper.ezPost(
                    ezApi.ezclocker.ezNavigation.ezGetPublicApiUrl('account/ezclocker/accept-employee-invite'),
                    EzJson.toJson(payload))
                    .then(
                        ezApi.ezclocker.ezServices.ezProcessApiResolve,
                        ezApi.ezclocker.ezServices.ezProcessApiReject)
                    .then(
                        () => waitDone()
                            .then(
                                () => {
                                    if (!ezApi.ezclocker.ezBrowserInfo.ezIsMobile()) {
                                        ezApi.ezclocker.ezAccountServices.ezSignIn(
                                            // userName
                                            emailOrUserName,
                                            // password
                                            ezApi.ezclocker.ezUi.ezGetInputValue('EzEmployeeSignUp_Password'),
                                            // targetUrl
                                            null,
                                            // mobile
                                            false,
                                            // parentContainerId
                                            'EzHideDialogsDiv');
                                    } else {
                                        ezApi.ezclocker.ezNavigation.ezNavigateToNewMobilePublicPage(`download?un=${emailOrUserName}`);
                                    }
                                }),
                        (eResponse) => waitDone()
                            .then(
                                () => {
                                    ezApi.ezclocker.ezUi.ezDisableElement('EzEmployeeSignUp_SubmitBtn');

                                    EzEmployeeSignupNewController.ezInstance.ezShowEmployeeSignUpErrorBox(
                                        EzString.em`
                                            ${eResponse.message}
                                            <div>
                                                Do you want to
                                                <a id="EzEmployeeSignUp_SignInInstead" href="#">
                                                    Sign In
                                                </a> instead?
                                            </div>`);

                                    ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
                                        'EzEmployeeSignUp_SignInInstead',
                                        EzElementEventName.CLICK,
                                        EzEmployeeSignupNewController.ezApiName,
                                        () => ezApi.ezclocker.ezNavigation.ezNavigateToSignIn(
                                            EzString.EMPTY,
                                            ezApi.ezclocker.ezUi.ezGetInputValue('EzEmployeeSignUp_EmailAddress'),
                                            ezApi.ezclocker.ezUi.ezGetInputValue('EzEmployeeSignUp_UserName')));
                                }));
            });
    }

    /**
        @public @method
        Validates the dialog's inputs
     */
    ezValidate() {
        EzEmployeeSignupNewController.ezInstance.ezHideSignupError();

        EzEmployeeSignupNewController.ezInstance.ezHideEmployeeSignUpErrorBox();

        let vResponse = ezApi.ezclocker.ezValidation.ezValidatePasswordInput(
            'EzEmployeeSignUp_Password',
            'EzEmployeeSignUp_PasswordError');

        if (EzValidationResponseStatus.ERROR === vResponse.ezGetStatus()) {
            EzEmployeeSignupNewController.ezInstance.ezShowSignupError(vResponse.message);

            ezApi.ezclocker.ezUi.ezFocusInput('EzEmployeeSignUp_Password');

            return false;
        }

        return true;
    }

    /**
        @public @method
        Shows the error box with the provided message
        @param {string} message
     */
    ezShowSignupError(message) {
        if (!EzString.stringHasLength(message)) {
            EzEmployeeSignupNewController.ezInstance.ezHideSignupError();
        } else {
            ezApi.ezclocker.ezUi.ezSetContent(
                'EzEmployeeSignUp_PasswordError',
                EzString.stringOrEmpty(message));

            ezApi.ezclocker.ezUi.ezShowElement('EzEmployeeSignUp_PasswordError');
        }
    }

    /**
        @public @method
        Hides the password error box
     */
    ezHideSignupError() {
        ezApi.ezclocker.ezUi.ezSetContent(
            'EzEmployeeSignUp_PasswordError',
            EzString.EMPTY);

        ezApi.ezclocker.ezUi.ezHideElement('EzEmployeeSignUp_PasswordError');
    }

    /**
        @public @method
        Shows the employee signup error box
        @param {string} em
     */
    ezShowEmployeeSignUpErrorBox(em) {
        if (!EzString.stringHasLength(em)) {
            return;
        }

        ezApi.ezclocker.ezUi.ezSetContent(
            'EzEmployeeSighUp_ErrorBox',
            em);

        ezApi.ezclocker.ezUi.ezShowElement('EzEmployeeSighUp_ErrorBox');
    }

    /**
        @public @method
        Hides the employee signup error box.
     */
    ezHideEmployeeSignUpErrorBox() {
        ezApi.ezclocker.ezUi.ezHideElement('EzEmployeeSighUp_ErrorBox');

        ezApi.ezclocker.ezUi.ezSetContent(
            'EzEmployeeSighUp_ErrorBox',
            EzString.EMPTY);
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
            EzEmployeeSignupNewController.ezInstance.ezClose();
        } else if ('Enter' === key || 13 === keyCode || 13 === which) {
            EzEmployeeSignupNewController.ezInstance.ezSubmit();
        }
    }

    /**
        @protected @method
        Handles the window's resize event
     */
    ezHandleWindowResizeEvent() {
        if (!ezApi.ezclocker.ezBrowserInfo.ezIsMobile() && window.innerWidth > 600) {
            ezApi.ezclocker.ezUi.ezSetElementCss(
                'EzEmployeeSignupDialog',
                'minWidth',
                '600px');
        } else {
            ezApi.ezclocker.ezUi.ezSetElementCss(
                'EzEmployeeSignupDialog',
                'minWidth',
                'auto');
        }
    }

    /**
        @protected @method
        Handles password key press event
     */
    ezHandlePasswordKeyPress() {
        let pw = ezApi.ezclocker.ezUi.ezGetInputValue('EzEmployeeSignUp_Password');

        if (4 <= pw.length) {
            ezApi.ezclocker.ezUi.ezEnableElement('EzEmployeeSignUp_SubmitBtn');
        } else {
            ezApi.ezclocker.ezUi.ezDisableElement('EzEmployeeSignUp_SubmitBtn');
        }
    }
}

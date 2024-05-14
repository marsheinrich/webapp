import { EzInstanceState } from '/ezlibrary/EzInstanceState.js';

// TODO: Remove all of validators
import '/public/javascript/common/ezclocker-validators.js';
import '/public/javascript/common/ezclocker-validation-helper.js';
import '/public/javascript/common/ezclocker-size-divs.js';

import { EzAnalyticsAndMetrics } from '/ezlibrary/analytics_metrics/EzAnalyticsAndMetrics.js';

import { EzUserRole } from '/ezlibrary/EzUserRole.js';

import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

import { EzUI } from '/public/javascript/common/ezui.js';


/**
 * Controller for the employee sign-up page.
 * @public
 */
class EzEmployeeSignupController {
    /**
        @public @static @field
        @type {string}
     */
    static ezApiName = 'ezEmployeeSignupController';
    /**
        @public @static @field
        @type {object}
     */
    static ezEventNames = {
        onReady: 'ezOn_EzEmployeeSignupController_Ready',
    };
    /**
        @public @static @field
        @type {EzEmployeeSignupController}
     */
    static ezInstance = null;
    /**
        @public @static @field
        @type {string}
     */
    static ezApiRegistrationState = null;
    /**
        @public @static @method
     */
    static ezCanRegister() {
        return 'PENDING' === EzEmployeeSignupController.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzAnalyticsAndMetrics.ezApiName] &&
            globalThis.ezApi.ezclocker[EzAnalyticsAndMetrics.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready;
    }
    /**
        @public @static @method
     */
    static ezRegistrator() {
        if (!EzEmployeeSignupController.ezCanRegister()) {
            return false;
        }
        EzEmployeeSignupController.ezInstance = ezApi.ezRegisterNewApi(
            EzEmployeeSignupController,
            EzEmployeeSignupController.ezApiName);

        EzEmployeeSignupController.ezApiRegistrationState = 'REGISTERED';
        return true;
    }
    // Static constructor
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            if (!this.ezRegistrator()) {

                document.addEventListener(
                    'onEzApiReady',
                    this.ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.onReady,
                    this.ezRegistrator);

                document.addEventListener(
                    EzAnalyticsAndMetrics.ezEventNames.onReady,
                    this.ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    this.ezRegistrator);
            }
        }
    }

    /**
        @public @constructor
     */
    constructor() {
        this.ezStates.push(EzInstanceState.CONSTRUCTED);
    }

    /**
        @public @field
        @type {boolean}
    */
    ready = false;

    /**
        @public @field
        @type {array}
     */
    ezStates = [];

    /**
        @public @field
        @type {string}
     */
    ezInviteToken = null;

    /**
        @public @field
        @type {string}
     */
    ezEmail = null;

    /**
        @public @field
        @type {string}
     */
    ezName = null;

    /**
     * Initializes EzEmployeeSignupController
     * @protected
     */
    ezInit() {
        if (window.ieDetected) {
            // Do not initialize if IE is detected
            return EzEmployeeSignupController.ezInstance;
        }

        const self = EzEmployeeSignupController.ezInstance;



        EzEmployeeSignupController.ezInstance.ezInviteToken = ezApi.ezclocker.ezUrlHelper.getInviteTokenParam();
        EzEmployeeSignupController.ezInstance.ezEmail = ezApi.ezclocker.ezUrlHelper.getEmailParam();
        EzEmployeeSignupController.ezInstance.ezName = ezApi.ezclocker.ezUrlHelper.getNameParam();

        if (ezApi.ezclocker.ezBrowserInfo.ezRedirectToMobileAcceptEmployeeInvite(
            EzEmployeeSignupController.ezInstance.ezInviteToken,
            EzEmployeeSignupController.ezInstance.ezName,
            EzEmployeeSignupController.ezInstance.ezEmail)) {
            return EzEmployeeSignupController.ezInstance;
        }

        self.ezInitUX();

        return EzEmployeeSignupController.ezInstance;
    }

    /**
     * Initalizes the dialog UX
     * @protected
     */
    ezInitUX() {
        const self = EzEmployeeSignupController.ezInstance;

        ezApi.ezclocker.ezUi.ezSetInputValue('EzAcceptInviteName', self.ezName);
        ezApi.ezclocker.ezUi.ezSetInputValue('EzAcceptInviteEmail', self.ezEmail);

        ezApi.ezclocker.ezUi.ezHookElementEvent('_EmployeeSignUpCancel', 'click', ezApi.ezclocker.nav.navigateToMain);
        ezApi.ezclocker.ezUi.ezHookElementEvent('_EmployeeSignUpSubmit', 'click', self.ezSubmit);

        ezApi.ezclocker.ezUi.ezId('filler').height(ezApi.ezDocument().height());
        ezApi.ezclocker.ezUi.ezHideElement('_SignUpError');
        ezApi.ezclocker.ezUi.ezFocus('EzAcceptInvitePassword');

        self.onWindowResize();
        ezApi.ezclocker.ezUi.ezHookElementEvent('window', 'resize', self.onWindowResize);
    }

    /**
     * Handles window resizing
     * @protected
     */
    onWindowResize() {
        let header = ezApi.ezclocker.ezUi.ezId('_EzClockerHeader');
        let content = ezApi.ezclocker.ezUi.ezId('_EzClockerMainContent');
        let windowHeight = ezApi.ezclocker.ezUi.ezWindow().height();
        let nonContentHeight = 0;

        if (null !== header) {
            nonContentHeight += header.outerHeight(true);
        }
        if (null !== content) {
            content.height(windowHeight - (nonContentHeight + 40));
        }
        ezApi.ezclocker.ezUi.ezId('filler').height($(document).height());
    }

    /**
     * Handles the enter key press when signing up to submit the dialog
     * @param {object} event
     * @protected
     */
    onEnterKey(event) {
        const self = EzEmployeeSignupController.ezInstance;

        if (13 == event.keyCode) {
            self.ezSubmit();
        }
    }

    /**
     * Submits the employee signup
     * @protected
     */
    ezSubmit() {
        const self = EzEmployeeSignupController.ezInstance;

        let password = ezUi.ezGetInputValue('EzAcceptInvitePassword');
        let email = self.ezEmail.toLowerCase();

        let vResponse = ezApi.ezclocker.ezValidation.ezValidatePassword(password);
        if (0 !== vResponse.errorCode) {
            self.ezShowSignupError(vResponse.message);
            ezApi.ezclocker.ezUi.ezFocus('EzAcceptInvitePassword');
            return;
        }

        ezApi.ezclocker.ezUi.ezStartPageWait('Enabling your employee account ...', (waitDone) => {
            let payload = {
                accountType: EzUserRole.ezToLegacyAccountType(EzUserRole.ROLE_EMPLOYEE),
                inviteToken: self.ezInviteToken,
                name: self.ezName,
                emailAddress: email,
                password: password,
                source: 'WEBSITE'
            };

            let url = ezApi.ezclocker.ezNavigation.getPublicApiUrl('account/ezclocker/signup');
            ezApi.ezclocker.http.ezPost(url, ezApi.ezToJson(payload)).then(
                (response) => {
                    waitDone();
                    response = ezApi.ezFromJson(response);
                    if (ezApi.ezIsValid(response) && 0 !== response.errorCode) {
                        self.ezShowSignupError(response.message);
                        return;
                    }

                    ezApi.ezclocker.ezDialog.ezShowOKMessage('Account Created',
                        '<h2>Your Employee account is ready to go!</h2>' +
                        '<p>Click the OK button below to continue to your Employee dashboard.</p>' +
                        '<h3>Welcome to ezClocker!</h3>').then(() => ezApi.ezclocker.ezAccountServices.ezSignIn(
                        email,
                        password,
                        ezApi.ezclocker.nav.ezGetPublicApiUrl('redirect/dashboard'),
                        false,
                        'EzHiddenDialogsContainer'));
                },
                (eResponse) => {
                    waitDone();
                    if (8 === eResponse.errorCode) {
                        ezApi.ezclocker.nav.navigateToSignIn(null, ezApi.ezEncode(ezApi.ezId('_EmailAddress').val()));
                    } else {
                        self.ezShowSignupError(eResponse.message);
                        ezApi.ezclocker.ezUi.ezSelectAll('EzAcceptInvitePassword');
                    }
                });
        });
    }

    /**
     * Shows the error box with the provided message
     * @param {string} message
     */
    ezShowSignupError(message) {
        ezApi.ezclocker.ezUi.ezContent('_SignUpError', message);
        ezApi.ezclocker.ezUi.ezShowElement('_SignUpError');
    }
}

export {
    EzEmployeeSignupController
};

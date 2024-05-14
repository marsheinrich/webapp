import '/public/javascript/common/ezclocker-validators.js';
import '/public/javascript/common/ezclocker-validation-helper.js';
import '/public/javascript/common/ezclocker-size-divs.js';

import { EzUserRole } from '/ezlibrary/EzUserRole.js';

/**
 * Controller for the employee sign-up page.
 * @public
 */
class EzEmployeeSignupController {
    constructor() {
        this.ready = false;
        this.ezTypeName = 'EzEmployeeSignupController';

        this.ezInviteToken = null;
        this.ezEmail = null;
        this.ezName = null;
    }

    /**
     * Initializes EzEmployeeSignupController
     * @protected
     */
    ezInit() {
        let self = ezApi.ezclocker[EzEmployeeSignupController.ezApiName];

        if (window.ieDetected) {
            // Do not initialize if IE is detected
            return self;
        }

        self.ezInviteToken = ezApi.ezclocker.ezUrlHelper.getInviteTokenParam();
        self.ezEmail = ezApi.ezclocker.ezUrlHelper.getEmailParam();
        self.ezName = ezApi.ezclocker.ezUrlHelper.getNameParam();

        if (ezApi.ezclocker.ezBrowserInfo.ezRedirectToMobileAcceptEmployeeInvite(
            self.ezInviteToken, self.ezName, self.ezEmail)) {
            return self;
        }

        self.ezInitUX();

        self.ready = true;
        return self;
    }

    /**
     * Initalizes the dialog UX
     * @protected
     */
    ezInitUX() {
        let self = ezApi.ezclocker[EzEmployeeSignupController.ezApiName];

        ezUi.ezSetInputValue('EzAcceptInviteName', self.ezName);
        ezUi.ezSetInputValue('EzAcceptInviteEmail', self.ezEmail);

        ezUi.ezHookElementEvent('_EmployeeSignUpCancel', 'click', ezApi.ezclocker.nav.navigateToMain);
        ezUi.ezHookElementEvent('_EmployeeSignUpSubmit', 'click', self.ezSubmit);

        ezUi.ezId('filler').height(ezApi.ezDocument().height());
        ezUi.ezHideElement('_SignUpError');
        ezUi.ezFocus('EzAcceptInvitePassword');

        self.onWindowResize();
        ezUi.ezHookElementEvent('window', 'resize', self.onWindowResize);
    }

    /**
     * Handles window resizing
     * @protected
     */
    onWindowResize() {
        let header = ezUi.ezId('_EzClockerHeader');
        let content = ezUi.ezId('_EzClockerMainContent');
        let windowHeight = ezUi.ezWindow().height();
        let nonContentHeight = 0;

        if (null !== header) {
            nonContentHeight += header.outerHeight(true);
        }
        if (null !== content) {
            content.height(windowHeight - (nonContentHeight + 40));
        }
        ezUi.ezId('filler').height($(document).height());
    }

    /**
     * Handles the enter key press when signing up to submit the dialog
     * @param {object} event
     * @protected
     */
    onEnterKey(event) {
        let self = ezApi.ezclocker[EzEmployeeSignupController.ezApiName];

        if (13 == event.keyCode) {
            self.ezSubmit();
        }
    }

    /**
     * Submits the employee signup
     * @protected
     */
    ezSubmit() {
        let self = ezApi.ezclocker[EzEmployeeSignupController.ezApiName];

        let password = ezUi.ezGetInputValue('EzAcceptInvitePassword');
        let email = self.ezEmail.toLowerCase();

        let vResponse = ezApi.ezclocker.ezValidation.ezValidatePassword(password);
        if (0 !== vResponse.errorCode) {
            self.ezShowSignupError(vResponse.message);
            ezUi.ezFocus('EzAcceptInvitePassword');
            return;
        }

        ezUi.ezStartPageWait('Enabling your employee account ...', (waitDone) => {
            let payload = {
                accountType: EzUserRole.ezToLegacyAccountType(EzUserRole.ROLE_EMPLOYEE),
                inviteToken: self.ezInviteToken,
                name: self.ezName,
                emailAddress: email,
                password: password,
                source: 'WEBSITE'
            };

            let url = ezApi.ezclocker.nav.getPublicApiUrl('account/ezclocker/signup');
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
                        '<h3>Welcome to ezClocker!</h3>')
                        .then(
                            () => ezApi.ezclocker.ezAccountServices.ezSignIn(
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
                        ezUi.ezSelectAll('EzAcceptInvitePassword');
                    }
                });
        });
    }

    /**
     * Shows the error box with the provided message
     * @param {string} message
     */
    ezShowSignupError(message) {
        ezApi.ezId('_SignUpError').html(message);
        ezApi.ezId('_SignUpError').show();
    }
};
EzEmployeeSignupController.ezApiName = 'ezEmployeeSignupController';

export {
    EzEmployeeSignupController
};

/**
 * ezApi Registration
 */
document.addEventListener('onEzApiReady',
    () => ezApi.ezRegisterNewApi(EzEmployeeSignupController, EzEmployeeSignupController.ezApiName));
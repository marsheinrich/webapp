function EzmEmployeeSignupController() {
    this.ready = false;

    this.ezInviteToken = null;
    this.ezEmailParam = '';
    this.ezNameParam = '';

    this.IPHONE_PERSONAL_APPSTORE_URL =
        'https://itunes.apple.com/us/app/ezclocker-personal-time-tracking/id833047956?ls=1&mt=8';
    this.ANDRIOD_BUSINESS_APPSTORE_URL = 'https://play.google.com/store/apps/details?id=com.ezclocker';
    this.IPHONE_BUSINESS_APPSTORE_URL = 'https://itunes.apple.com/us/app/ezclocker/id800807197?ls=1&mt=8';
    this.NATIVE_APP_SIGNIN_URL = 'ezlogin://signin';

    return this;
};

EzmEmployeeSignupController.prototype.ezInit = function() {
    let self = ezApi.ezclocker.ezmEmployeeSignupController;

    self.ezEmailParam = ezApi.ezAssignOrDefault(ezApi.ezclocker.ezUrlHelper.getEmailParam(), '').trim();
    if (ezApi.ezIsEmptyString(self.ezEmailParam)) {
        self.ezEmailParam = '- email not provided -';
    }
    self.ezNameParam = ezApi.ezAssignOrDefault(ezApi.ezclocker.ezUrlHelper.getNameParam(), '').trim();
    if (ezApi.ezIsEmptyString(self.ezNameParam)) {
        self.ezNameParam = '- name not provided -';
    }

    self.ezInviteToken = ezApi.ezAssignOrDefault(ezApi.ezclocker.ezUrlHelper.getInviteTokenParam(), '').trim();
    if (ezApi.ezIsEmptyString(self.ezInviteToken)) {
        ezApi.ezclocker.ezUi.ezHideElement('EzSignUpButtonContainer');
        ezApi.ezclocker.ezUi.ezShowElement('EzMissingInviteTokenInUrlError');
        ezApi.ezclocker.ezUi.ezDisable('EzmEmployeeAcceptInvitePassword');
    }

    self.ezInitUx();
    return self;
};

EzmEmployeeSignupController.prototype.ezInitUx = function() {
    let self = ezApi.ezclocker.ezmEmployeeSignupController;

    ezApi.ezclocker.ezUi.ezSetElementAttribute('EzmEmployeeAcceptInviteDownloadAndriodButton', 'href',
        self.ANDRIOD_BUSINESS_APPSTORE_URL);
    ezApi.ezclocker.ezUi.ezSetElementAttribute('EzmEmployeeAcceptInviteDownloadiPhoneButton', 'href',
        self.IPHONE_BUSINESS_APPSTORE_URL);

    ezApi.ezclocker.ezUi.ezSetInputValue('EzmEmployeeAcceptInviteName', self.ezNameParam);
    ezApi.ezclocker.ezUi.ezContent('EzmEmployeeAcceptInviteNameDisplay', self.ezNameParam);
    ezApi.ezclocker.ezUi.ezSetInputValue('EzmEmployeeAcceptInviteEmail', self.ezEmailParam);
    ezApi.ezclocker.ezUi.ezContent('EzmEmployeeAcceptInviteEmailDisplay', self.ezEmailParam);

    ezApi.ezclocker.ezUi.ezFocus('EzmEmployeeAcceptInvitePassword');
    ezApi.ezclocker.ezUi.ezHookElementEvent('EzmEmployeeAcceptInvitePassword', 'blur', self.ezValidate);

    $('#EzmEmployeeAcceptInvitePassword').on('change paste keyup', function() {
        if (0 !== ezApi.ezclocker.ezValidation.ezValidatePassword(
            ezApi.ezclocker.ezUi.ezGetInputValue('EzmEmployeeAcceptInvitePassword')).errorCode) {
            ezApi.ezclocker.ezUi.ezDisable('EzmEmployeeAcceptInviteSignupButton');
        } else {
            ezApi.ezclocker.ezUi.ezEnable('EzmEmployeeAcceptInviteSignupButton');
        }
    });

    ezApi.ezclocker.ezUi.ezHookElementEvent('EzmEmployeeAcceptInviteSignupButton', 'click', self.ezSubmit);

    ezApi.ezclocker.ezUi.ezHookElementEvent('EzmEmployeeAcceptInviteTOSButton', 'click', function() {
        ezApi.ezclocker.ezmNav.mNavMobile('p/tos');
    });

    ezApi.ezclocker.ezUi.ezHookElementEvent('EzmEmployeeAcceptInvitePrivacyButton', 'click', function() {
        ezApi.ezclocker.ezmNav.mNavMobile('m.privacyPolicy.html');
    });
};

/**
 * @private
 * Validates the password entered
 *
 * @returns {Boolean}
 */
EzmEmployeeSignupController.prototype.ezValidate = function() {
    let vResponse = ezApi.ezclocker.ezValidation.ezValidatePassword(
        ezApi.ezclocker.ezUi.ezGetInputValue('EzmEmployeeAcceptInvitePassword'));

    if (0 !== vResponse.errorCode) {
        alert(vResponse.message);
        ezApi.ezclocker.ezUi.ezFocus('EzmEmployeeAcceptInvitePassword');
        ezApi.ezclocker.ezUi.ezSelectAll('EzmEmployeeAcceptInvitePassword');
        ezApi.ezclocker.ezUi.ezDisable('EzmEmployeeAcceptInviteSignupButton');
        return false;
    }

    ezApi.ezclocker.ezUi.ezEnable('EzmEmployeeAcceptInviteSignupButton');
    return true;
};

/**
 * @public
 * Submits the employee accept invite request.
 */
EzmEmployeeSignupController.prototype.ezSubmit = function() {
    let self = ezApi.ezclocker.ezmEmployeeSignupController;

    ezApi.ezclocker.ezUi.ezDisable('EzmEmployeeAcceptInviteSignupButton');

    ezApi.ezclocker.ezmMobileHelper.ezmStartPageWaitExecute('Enabling account ...', function(waitDone) {
        ezApi.ezclocker.ezAccountServices.ezAcceptEmployeeInvite(
            self.ezInviteToken,
            self.ezNameParam,
            self.ezEmailParam,
            ezApi.ezclocker.ezUi.ezGetInputValue('EzmEmployeeAcceptInvitePassword')).then(
            function() {
                waitDone();
                self.ezShowNextStepMessage();
            },
            function(eResponse) {
                waitDone();
                if (21 === eResponse.errorCode) {
                    window.alert(eResponse.message);
                    return;
                }

                ezApi.ezclocker.ezUi.ezEnable('EzmEmployeeAcceptInviteSignupButton');
                if (ezApi.ezIsNotEmptyString(eResponse.message)) {
                    window.alert(eResponse.message);
                } else {
                    window.alert('EzClocker is unable to sign you up at this time. Please try again later.');
                }
            });
    });
};

/**
 * @private
 * Shows the next step message after successfully accepting the employee invite.
 */
EzmEmployeeSignupController.prototype.ezShowNextStepMessage = function() {
    // Disable all inputs, cannot re-submit
    ezApi.ezclocker.ezUi.ezDisable$('input');

    if (ezApi.ezclocker.ezmMobileHelper.ezmIsAndriod()) {
        $.mobile.pageContainer.pagecontainer('change', '#EzmEmployeeAcceptInviteDownloadAndriod');
    } else if (ezApi.ezclocker.ezmMobileHelper.ezmIsIos()) {
        $.mobile.pageContainer.pagecontainer('change', '#EzmEmployeeAcceptInviteDownloadiPhone');
    } else {
        window.alert('You have successfully enabled your account. ' +
            'Please download the ezClocker Employer app from you mobile device\'s app store.');
    }
};

/**
 * ezApi registration
 */
document.addEventListener('onEzApiReady', function() {
    ezApi.ezRegisterNewApi(EzmEmployeeSignupController, 'ezmEmployeeSignupController');
});
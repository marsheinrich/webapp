import {
    EzString
} from '/ezlibrary/helpers/EzHelpers.js';

/* exported exEmployerSignupViewController
/**
 * @public
 * Controller for the m.employerSignup.html mobile page
 */
let ezEmployerSignupViewController = {
    ready: false,
    ezInit: function() {
        let self = ezApi.ezclocker.ezEmployerSignupViewController;

        self.ezInitUx();

        self.ready = true;

        return self;
    },
    ezInitUx: function() {
        let self = ezApi.ezclocker.ezEmployerSignupViewController;

        try {
            self.hideErrorMessage();

            self.loadParams();

            ezApi.ezclocker.ezUi.ezId('_SignUp').on('click', self.signUp);
        } finally {
            let signUpError = ezApi.ezclocker.ezUrlHelper.getErrorParam();

            if (ezApi.isNotEmptyString(signUpError)) {
                ezApi.ezclocker.ezUi.ezHtml('_ErrorMessage', signUpError);

                ezApi.ezclocker.ezUi.ezFadeIn('_ErrorMessage');
            }
            ezApi.ezclocker.ezUi.ezFocusInput('_EmployerName');
        }
    },
    showErrorMessage: function(message) {
        ezApi.ezclocker.ezmMobileHelper.ezmStopPageWait();

        ezApi.ezclocker.ezUi.ezId('_ErrorMessage').html(message);

        ezApi.ezclocker.ezUi.ezId('_ErrorMessage').fadeIn('slow');
    },
    hideErrorMessage: function() {
        ezApi.ezId('_ErrorMessage').hide();
    },
    loadParams: function() {
        ezApi.ezclocker.ezUi.ezId('_EmployerName').val(ezApi.ezclocker.ezUrlHelper.getNameParam());

        ezApi.ezclocker.ezUi.ezId('_Source').val(ezApi.ezclocker.ezUrlHelper.getSourceParam());

        ezApi.ezclocker.ezUi.ezId('_EmailAddress').val(ezApi.ezclocker.ezUrlHelper.getEmailParam());

        ezApi.ezclocker.ezUi.ezId('_ErrorMessage').html(ezApi.ezclocker.ezUrlHelper.getErrorParam());
    },
    signUp: function() {
        let self = ezApi.ezclocker.ezEmployerSignupViewController;

        ezApi.ezclocker.ezmMobileHelper.ezmStartPageWait('creating your account', 'a');

        self.hideErrorMessage();

        let email = ezApi.ezId('_EmailAddress').val();

        let vResponse = ezApi.ezclocker.ezValidation.ezValidateEmailAddress(email);

        if (0 !== vResponse.errorCode) {
            self.showErrorMessage(vResponse.message);

            return;
        }

        let password = ezApi.ezclocker.ezUi.ezId('_Password').val();

        vResponse = ezApi.ezclocker.ezValidation.ezValidatePassword(password);

        if (0 !== vResponse.errorCode) {
            self.showErrorMessage(vResponse.message);

            return;
        }

        ezApi.ezclocker.ezAccountServices.signUp(
            ezApi.ezclocker.ezUi.ezId('_AccountType').val(), // account type
            null, // Employee name
            null, // employer id
            null, // invite token
            EzString.encodeHtml(ezApi.ezId('_EmployerName').val()), // employer name
            email, // username
            password // password
        )
            .then(
                function() {
                    self.signUpSuccess();
                }, self.signUpError);
    },
    signUpSuccess: function(result) {
        let self = ezApi.ezclocker.ezEmployerSignupViewController;

        ezApi.ezclocker.ezmMobileHelper.ezmStopPageWait();

        if (ezApi.ezIsValid(result) && result.errorCode !== 0) {
            self.showErrorMessage(ezApi.ezclocker.ezmMobileHelper.uhOhMessageSignUp);

            return;
        }

        ezApi.ezclocker.ezGoogleAnalytics.logEvent('Employer Sign Up', 'Mobile', 'Success');

        self.ezRecordUtmParams()
            .then(
                function() {
                    ezApi.ezclocker.ezAccountServices.silentSignIn(
                        ezApi.ezclocker.ezUi.ezId('_EmailAddress').val(),
                        ezApi.ezclocker.ezUi.ezId('_Password').val(),
                        true,
                        ezApi.ezclocker.ezAffiliate.affiliateId)
                        .then(
                            function() {
                                ezApi.ezclocker.ezGoogleAnalytics.reportConversion('prd');
                                ezApi.ezclocker.ezmEmployerService.activeEmployersForUser()
                                    .then(
                                        function(employer) {
                                            if (ezApi.ezclocker.ezAffiliate.affiliateId) {
                                                ezApi.ezclocker.ezShareASale.injectLeadPixel(employer[0].employer.id);
                                            }

                                            self.showNextStepMessage();
                                        });
                                return true;
                            });
                });
    },
    /**
     * @private
     * Records the UTM params settings for signup
     */
    ezRecordUtmParams: function() {
        return ezApi.ezPromise(
            function(resolve) {
                ezApi.ezclocker.ezUtmTagMapService.ezSaveUtmTagMap(
                    null /* employer id */,
                    null /* employee id */,
                    null /* user id */,
                    ezUi.ezGetInputValue('_EmailAddress').trim() /* email address */,
                    ezApi.ezclocker.ezUrlHelper.getUrlParam(ezApi.ezclocker.ezUtmTagMapService.UTM_TAG_NAMES.UTM_MEDIUM),
                    ezApi.ezclocker.ezUrlHelper.getUrlParam(ezApi.ezclocker.ezUtmTagMapService.UTM_TAG_NAMES.UTM_SOURCE),
                    ezApi.ezclocker.ezUrlHelper.getUrlParam(ezApi.ezclocker.ezUtmTagMapService.UTM_TAG_NAMES.UTM_CAMPAIGN))
                    .then(resolve,
                        function(eResponse) {
                            ezApi.ezclocker.logger.error(
                                'Failed to record the UTM params for sign up. ' +
                                ezApi.ezToJson(eResponse, 3));

                            return resolve();
                        });
            });
    },
    signUpError: function(eResponse) {
        let self = ezApi.ezclocker.ezEmployerSignupViewController;

        ezApi.ezclocker.ezmMobileHelper.ezmStopPageWait();

        if (ezApi.isNotEmptyString(eResponse.message)) {
            self.showErrorMessage(eResponse.message);
            ezApi.ezclocker.ezGoogleAnalytics.logEvent('Employer Sign Up', 'Mobile', eResponse.message);
            return;
        }

        ezApi.ezclocker.ezGoogleAnalytics.logEvent('Sign Up', 'Mobile Employer Sign Up',
            ezApi.ezclocker.ezmMobileHelper.uhOhMessageSignUp);

        self.showErrorMessage(ezApi.ezclocker.ezmMobileHelper.uhOhMessageSignUp);
    },
    showNextStepMessage: function() {
        if (ezApi.ezclocker.ezmMobileHelper.ezmIsAndriod()) {
            $.mobile.pageContainer.pagecontainer('change', '#_DownloadAndriod');

            return;
        }

        if (ezApi.ezclocker.ezmMobileHelper.ezmIsIos()) {
            $.mobile.pageContainer.pagecontainer('change', '#_DownloadiPhone');

            return;
        }

        window.alert('Success! You can now sign in to the mobile website!');

        ezApi.ezclocker.ezNavigation.ezNavigateTo('m.signin.html?email=' + ezApi.ezId('emailAddress').val());
    },
    signInMobileWebsite: function() {
        $.mobile.pageContainer.pagecontainer('change', 'm.signin.html?email=' + ezApi.ezId('emailAddress').val(), {
            transition: 'fade',
            changeHash: false,
            reload: true
        });
    },
    introduceAndNavigateToNativeEmployerApps: function(e, p) {
        ezApi.ezclocker.ezmMobileHelper.ezmStartPageWait('taking you to the app store', 'a');

        if (ezApi.ezclocker.ezmMobileHelper.ezmIsAndriod()) {
            ezApi.ezclocker.ezmNav.ezmNavToGoooglePlayStore(true);
        }

        if (ezApi.ezclocker.ezmMobileHelper.ezmIsIos()) {
            ezApi.ezclocker.ezmNav.ezmNavToIosAppStore(e, p);
        }

        ezApi.ezclocker.ezmMobileHelper.ezmStopPageWait();
    }
};

/**
 * ezApi registration
 */
document.addEventListener('onEzApiReady', function() {
    if (typeof ezApi === 'undefined' || !ezApi) {
        window.console.warn('EzApi is require for ezclocker-dialog-helper.js module');
    }

    if (typeof ezUi === 'undefined' || !ezUi) {
        window.console.warn('EzUi is require for ezclocker-dialog-helper.js module');
    }

    ezApi.ezRegisterPublic('ezEmployerSignupViewController', ezEmployerSignupViewController);

    ezApi.ezclocker.ezEmployerSignupViewController.ezInit();
});

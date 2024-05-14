/* globals
    ezDebug, ezHotKey, accountServices, ezGoogleAnalytics
*/
import amplitude from 'amplitude-js';

var ezSignUpNowFold = {
    ready: false,
    initFold: function() {
        ezSignUpNowFold._companyInput_ = $('#ez_employer_name');
        ezSignUpNowFold._emailInput_ = $('#ez_userName');
        ezSignUpNowFold._passwordInput_ = $('#ez_password');
        if (ezDebug.isDebug()) {
            ezSignUpNowFold._emailInput_.val('@mailinator.com');
            ezSignUpNowFold._passwordInput_.val('1234');
            ezSignUpNowFold._emailInput_.focus();
            ezSignUpNowFold._emailInput_[0].setSelectionRange(0, 0);
            ezSignUpNowFold.validateSignupSubmit();
        }
        ezSignUpNowFold._companyInput_.keydown(ezSignUpNowFold.validateLandingSignup);
        ezSignUpNowFold._emailInput_.keydown(ezSignUpNowFold.validateLandingSignup);
        ezSignUpNowFold._passwordInput_.keydown(ezSignUpNowFold.validateLandingSignup);
        ezSignUpNowFold.amplitudeInstance = amplitude.getInstance();
        ezSignUpNowFold.amplitudeInstance.init('63b4edbc4ad58e5fc414875544c4a3db');
        $('#_SignUpButton').click(ezSignUpNowFold.quickSignUpFormSubmit);
        ezHotKey.hookEnter('body', ezSignUpNowFold.executeHotKeySignUp);

    },
    executeHotKeySignUp: function(event) {
        if (ezSignUpNowFold.validateSignupSubmit()) {
            if (event) {
                event.preventDefault();
            }
            ezSignUpNowFold.quickSignUpFormSubmit();
        }
    },
    validateLandingSignup: function() {
        var companyName = ezSignUpNowFold._companyInput_.val().trim();
        var emailAddress = ezSignUpNowFold._emailInput_.val().trim();
        var password = ezSignUpNowFold._passwordInput_.val().trim();
        if (companyName.length !== 0 && emailAddress.length !== 0 && password.length !== 0) {
            ezSignUpNowFold.hideErrorMessages();
        }
    },
    hideErrorMessages: function() {
        $('#_EZERROR_').remove();
    },
    showErrorMessage: function(inputRef, message) {
        var errorMessage = '<div id="_EZERROR_" class="inputErrorMessage ezRounded2pxAllCorners">' + message +
            '</div>';
        inputRef.parent().append(errorMessage);
    },
    validateSignupSubmit: function() {
        var emailAddress = ezSignUpNowFold._emailInput_.val();
        if (emailAddress && emailAddress.length != 0) {
            emailAddress = emailAddress.trim();
        }
        var password = ezSignUpNowFold._passwordInput_.val().trim();
        ezSignUpNowFold.hideErrorMessages();

        if (emailAddress.length > 256) {
            ezSignUpNowFold.showErrorMessage(ezSignUpNowFold._emailInput_,
                'Your email address cannot have more than 256 characters.');
            return false;
        }
        if (emailAddress.indexOf('@') === -1) {
            ezSignUpNowFold.showErrorMessage(ezSignUpNowFold._emailInput_,
                'Please enter a valid email address.');
            return false;
        }
        if (emailAddress.indexOf('@') === 0) {
            ezSignUpNowFold.showErrorMessage(ezSignUpNowFold._emailInput_,
                'Please enter a valid email address.');
            return false;
        }
        if (emailAddress.indexOf(' ') >= 0) {
            ezSignUpNowFold.showErrorMessage(ezSignUpNowFold._emailInput_,
                'Your email addresses cannot have spaces.');
            return false;
        }
        if (password.length <= 3) {
            ezSignUpNowFold.showErrorMessage(ezSignUpNowFold._passwordInput_,
                'Your password must have at least 4 characters');
            return false;
        } else if (password.length > 256) {
            ezSignUpNowFold.showErrorMessage(ezSignUpNowFold._passwordInput_,
                'Your password must be smaller than 256 characters');
            return false;
        }
        return true;
    },
    quickSignUpFormSubmit: function() {
        var self = ezApi.p.ezSignUpNowFold;
        self.amplitudeInstance.logEvent('Signup');
        if (!self.validateSignupSubmit()) {
            return;
        }
        ezUi.ezStartPageWait('Creating account');
        var companyName = $('#ez_employer_name').val();
        companyName = ezApi.isNotEmptyString(companyName) ? companyName.trim() : companyName;
        var emailAddress = $('#ez_userName').val();
        emailAddress = ezApi.isNotEmptyString(emailAddress) ? emailAddress.trim() : emailAddress;
        var password = $('#ez_password').val();
        password = ezApi.isNotEmptyString(password) ? password.trim() : password;
        accountServices.signUp(null, null, null, null, companyName, emailAddress, password,
            function(response) { // success
                ezUi.ezStopPageWait();
                if (ezApi.p.http.isErrorResponse(response)) {
                    var em = ezApi.p.http.extractErrorResponseMessageOrDefault(response,
                        'ezClocker is unable to create new accounts at this time. Please try again in a few minutes.'
                    );
                    ezApi.p.ezDialog.ezShowError('Sign Up', em);
                    return;
                }
                if (ezGoogleAnalytics) {
                    ezGoogleAnalytics.logEvent('Employer Sign Up', 'Stand Alone', 'Success');
                    ezGoogleAnalytics.reportConversion('prd');
                    accountServices.signIn(emailAddress, password,
                        ezApi.p.nav.getSecurePageUrl('employerDashboard.html'));
                }

            }, function(errorResponse) { // failure
                ezUi.ezStopPageWait();
                var em = ezApi.p.http.extractErrorResponseMessageOrDefault(errorResponse,
                    'ezClocker is unable to create new accounts at this time. Please try again in a few minutes.'
                );
                if (ezGoogleAnalytics) {
                    ezGoogleAnalytics.logEvent('Employer Sign Up', 'Stand Alone', em);
                }
                ezApi.p.ezDialog.ezShowError('Sign Up', em);
            });
    }
};

/**
 * ezApi Registration
 */
document.addEventListener('onEzApiReady', function() {
    if (typeof ezApi !== 'undefined' && ezApi) {
        ezApi.ezRegisterPublic('ezSignUpNowFold', ezSignUpNowFold);
    }
});

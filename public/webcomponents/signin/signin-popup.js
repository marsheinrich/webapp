/* exported ezSignInPopupDialog */

/**
 * @public
 * Controls the pop-up sign-in dialog
 */
var ezSignInPopupDialog = {
    ready: false,
    visible: false,
    ezDefaultUserName: '',
    ezDefaultPassword: '',
    ezInit: function() {
        var self = ezApi.p.ezSignInPopupDialog;
        self.ezInitUx();
        self.ready = true;
        return self;
    },
    ezInitUx: function() {
        var self = ezApi.p.ezSignInPopupDialog;
        ezApi.p.ezWebComp.insert('_SignInPopupContainer', '_SignInPopUpDialog',
            ezApi.p.nav.getPublicPageUrl('webcomponents/signin/signin-popup.html')).then(function() {
            // Hook dialog events
            ezUi.ezHookElementEvent('j_username', 'keydown', self.handleKeyPress);
            ezUi.ezHookElementEvent('j_password', 'keydown', self.handleKeyPress);
            ezUi.ezHookElementEvent('_SoloSignInButton', 'click', self.handleSignUpButtonClick);
            ezUi.ezHookElementEvent('_SignInButton', 'click', self.submit);
            ezUi.ezHookElementEvent('_CancelSignInButton', 'click', self.close);
            ezUi.ezHookElementEvent('_ForgotPasswordLink', 'click',
                function() {
                    self.close();
                    ezApi.p.ezPasswordResetDialog.ezShow();
                });
        });
    },
    handleSignUpButtonClick: function() {
        var self = ezApi.p.ezSignInPopupDialog;
        ezApi.ezId('_SignInPopUpContainer').outerWidth(300);
        ezApi.ezId('_SoloSignInButton').hide('fade');
        self.show();
    },
    handleKeyPress: function(e) {
        var self = ezApi.p.ezSignInPopupDialog;
        if (!self.visible) {
            return;
        }
        switch (e.keyCode) {
            case 13:
                self.submit();
                break;
            case 27:
                self.close();
                break;
            default:
                // Otherwise do nothing
        }
    },
    show: function() {
        var self = ezApi.p.ezSignInPopupDialog;
        ezApi.ezWindow().on('resize', self.close);
        ezApi.ezDocument().on('keydown', self.handleEnterKey);
        
        var userName = '';

        ezApi.ezId('_SignInPopUpContainer').css('right', 5);
        ezApi.ezId('_SignInPopUpContainer').css('top', 5);
        ezApi.ezId('_SignInPopUpContainer').show('slide', {
            'direction': 'up'
        }, 500);

        if (userName) {
            ezApi.ezId('j_username').val(userName);
            ezApi.ezId('j_password').val(self.ezDefaultPassword);
            ezApi.ezId('j_password').focus();
        } else {
            ezApi.ezId('j_username').val(self.ezDefaultUserName);
            ezApi.ezId('j_password').val(self.ezDefaultPassword);
            ezApi.ezId('j_username').focus();
        }

        self.visible = true;
        return self.visible;
    },
    close: function() {
        var self = ezApi.p.ezSignInPopupDialog;
        ezApi.ezWindow().off('resize');
        ezApi.ezBody().off('keydown');
        ezApi.ezId('_SoloSignInButton').show('fade');
        ezApi.ezId('_SignInPopUpContainer').hide('fade');
        self.visible = false;
        return self.visible;
    },
    submit: function() {
        var self = ezApi.p.ezSignInPopupDialog;
        if (!self.validate()) {
            return;
        }
        self.close();

        ezApi.s.ezAccountServices.signIn(ezApi.ezId('j_username').val(), ezApi.ezId('j_password').val());
    },
    validate: function() {
        var self = ezApi.p.ezSignInPopupDialog;
        var vResponse = ezApi.p.ezValidation.ezValidatePasswordLegacy(ezApi.ezId('j_password').val());
        if (vResponse.errorCode !== 0) {
            self.ezRenderSignInError(vResponse.message);
            ezUi.ezFocusInput('j_password');
            return false;
        }
        return true;
    },
    /**
     * Displays errors within the sign-in pop-up box.
     */
    ezRenderSignInError: function(message) {
        ezUi.ezHtml('_EzSignInErrorMessage', message);
        ezUi.ezFadeIn('_SignInError');
    },
    clearError: ezApi.ezResolve(function() {
        ezApi.ezId('_EzSignInErrorMessage').html('');
        ezApi.ezId('_SignInError').hide();
        return true;
    }),
    showError: ezApi.ezResolve(function(em) {
        var errorMessage = em;
        if (!errorMessage) {
            var result = ezApi.p.ezUrlHelper.getUrlParam('error');
            errorMessage = decodeURIComponent(result);
            if (ezApi.p.isNotValid(errorMessage)) {
                ezApi.ezId('_SignInError').hide();
                return true;
            }
        }
        ezApi.ezId('_EzSignInErrorMessage').html(errorMessage);
        ezApi.ezId('_SignInError').show();
        return true;
    })
};

/**
 * EzApi Registration
 */
document.addEventListener('onEzApiReady', function() {
    if (typeof ezApi === 'undefined' || !ezApi) {
        window.console.error('EzApi is required for signing-popup.js module.');
    }
    ezApi.ezRegisterPublic('ezSignInPopupDialog', ezSignInPopupDialog);
    ezSignInPopupDialog.ezInit();
});

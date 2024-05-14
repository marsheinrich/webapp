/* exported ezPasswordResetDialog */

/**
 * @public
 * Javascript Support File for password-reset.html component
 */
var ezPasswordResetDialog = {
    ready: false,
    visible: false,
    ezInit: function() {
        var self = ezApi.p.ezPasswordResetDialog;
        self.ezInitUx();
        self.ready = true;
        return self;
    },
    ezInitUx: function() {
        var self = ezApi.p.ezPasswordResetDialog;
        ezApi.p.ezWebComp.append('_DialogContainer', '_EzPasswordResetDialog',
            ezApi.p.nav.getPublicPageUrl('webcomponents/signin/password-reset.html')).then(function() {
            ezApi.ezId('_PasswordResetDialog').dialog({
                dialogClass: ezApi.p.ezDialog.DEFAULTS.dialogClass,
                autoOpen: ezApi.p.ezDialog.DEFAULTS.autoOpen,
                closeOnEscape: ezApi.p.ezDialog.DEFAULTS.closeOnEscape,
                modal: ezApi.p.ezDialog.DEFAULTS.modal,
                show: ezApi.p.ezDialog.DEFAULTS.show,
                hide: ezApi.p.ezDialog.DEFAULTS.hide,
                width: 400,
                buttons: {
                    'ResetPasswordBtn': {
                        text: 'Reset Password',
                        id: '_ResetPasswordButton',
                        click: self.ezSubmit
                    },
                    Cancel: self.ezClose
                },
                close: self.ezClose
            });
        });
    },
    handleEnterKey: function(e) {
        var self = ezApi.p.ezPasswordResetDialog;
        switch (e.keyCode) {
            case 13:
                if (!self.visible) {
                    return;
                }
                self.submit();
                return;
            case 27:
                if (!self.visible) {
                    return;
                }
                self.hide();
                return;
            default:
                return;
        }
    },
    /**
     * @public
     * Original: show
     * @param {string|null} emailAddress
     */
    ezShow: function(emailAddress) {
        var self = ezApi.p.ezPasswordResetDialog;
        ezUi.ezHtml('_EzPasswordResetErrorMessage', '');
        if (emailAddress) {
            ezApi.ezId('emailAddress').val(emailAddress);
        }
        ezApi.ezId('_PasswordResetDialog').dialog('open');
        self.visible = true;
    },
    ezClose: function() {
        var self = ezApi.p.ezPasswordResetDialog;
        ezUi.ezHide('_PasswordReset_Error');
        ezApi.ezId('_PasswordResetDialog').dialog('close');
        self.visible = false;
    },
    ezShowError: function(em) {
        if (ezApi.isEmptyString(em)) {
            return;
        }
        ezUi.ezHtml('_EzPasswordResetErrorMessage', em);
        ezUi.ezFadeIn('_PasswordReset_Error');
    },
    ezSubmit: function() {
        var self = ezApi.p.ezPasswordResetDialog;
        ezUi.ezStartPageWait('Sending reset password email');
        ezUi.ezDisable('_ResetPasswordButton');
        ezUi.ezHide('_PasswordReset_Error');
        var ea = ezApi.ezId('_PasswordReset_EmailAddress').val();
        var vResponse = ezApi.p.ezValidation.ezValidateEmailAddress(ea);
        if (vResponse.errorCode !== 0) {
            ezUi.ezStopPageWait();
            self.ezShowError('Please enter a valid email address.');
            ezUi.ezFocusInput('_PasswordReset_EmailAddress');
            ezUi.ezEnable('_ResetPasswordButton');
            return;
        }
        ezApi.p.ezAccountServices.requestPasswordReset(ea,
            function(r) {
                ezUi.ezStopPageWait();
                if (ezApi.p.http.isErrorResponse(r)) {
                    ezUi.ezStopPageWait();
                    self.ezShowError(r.message);
                    ezUi.ezFocusInput('_PasswordReset_EmailAddress');
                    ezUi.ezEnable('_ResetPasswordButton');
                    return;
                }
                self.ezClose();
                ezApi.p.ezDialog.ezShowMessage('Next Steps',
                    'Please check your email. ezClocker has sent you instructions on how to reset your password.'
                );
            },
            function(err) { // failure
                ezUi.ezStopPageWait();
                self.ezClose();
                var em = ezApi.p.http.extractErrorResponseMessageOrDefault(err,
                    'ezClocker is unable to reset your password. Please verify you entered the email address ' +
                    'associated with your account.<br/>If you need assistence please contact ezclocker ' +
                    '<a href="mailto:support@ezclocker.com">support@ezclocker.com</a>');
                ezApi.p.ezDialog.ezShowError('Reset Password', em);
            }
        );
    }
};

/**
 * EzApi Registration
 */
document.addEventListener('onEzApiReady', function() {
    if (typeof ezApi === 'undefined' || !ezApi) {
        window.console.error('EzApi is required for password-reset.js module.');
    }
    ezApi.ezRegisterPublic('ezPasswordResetDialog', ezPasswordResetDialog);
    ezApi.p.ezPasswordResetDialog.ezInit();
});

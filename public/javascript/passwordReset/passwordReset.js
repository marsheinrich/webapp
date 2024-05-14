/**
 * Javascript support for passwordReset.html page
 */
class EzPasswordResetPage {
    constructor() {
        this.ready = false;
        this.ezTypeName = 'EzPasswordResetPage';
    }

    ezInit() {
        let self = ezApi.ezclocker[EzPasswordResetPage.ezApiName];

        ezApi.ezclocker.ezUrlHelper.getPasswordResetTokenParam();

        let mobileUrl = ezApi.ezUrlTemplate`
            m.passwordReset.html
                ?token=${ezApi.ezclocker.ezUrlHelper.passwordResetToken}`;
        if (ezApi.ezclocker.ezMobile.redirectIfMobilePublic(mobileUrl)) {
            return;
        }

        ezUi.ezHookElementEvent('_ResetPasswordButton', 'click', self.submit);
        ezUi.ezHookElementEvent('_CancelPasswordReset', 'click', ezApi.ezclocker.nav.navigateToSignIn);

        ezApi.ezclocker.ezWebComp.insert(
            '_NewPasswordInput',
            '_NewPasswordInputContent',
            'webcomponents/editors/new-password-editor.html');
        ezApi.ezclocker.ezWebComp.insert(
            '_ConfirmPasswordInput',
            '_ConfirmPasswordInputContent',
            'webcomponents/editors/confirm-password-editor.html');

        ezUi.ezShowElement('_ResetPasswordFixedDialog');
        ezUi.ezShowElement('_ViewPasswordHover');
        ezUi.ezFocusElement('_EmailAddress');

        self.ready = true;
        return self;
    }

    ezValidate() {
        ezUi.ezHideElement('_EmailAddressError');
        ezUi.ezHideElement('_NewPasswordError');
        ezUi.ezHideElement('_ConfirmPasswordError');

        let vResponse = ezApi.ezclocker.ezValidation.ezValidateEmailAddress(ezUi.ezGetInputValue('_EmailAddress'));
        if (0 !== vResponse.errorCode) {
            ezUi.ezShowContent('_EmailAddressError', vResponse.message);
            ezUi.ezFocusElement('_EmailAddress');
            return false;
        }

        vResponse = ezApi.ezclocker.ezValidation.validateResetPasswords(ezUi.ezGetInputValue('_NewPassword'),
            ezApi.ezId('_ConfirmNewPassword').val());
        if (0 !== vResponse.errorCode) {
            ezUi.ezShowContent('_NewPasswordError', vResponse.message);
            ezUi.ezFocusElement('_NewPassword');
            return false;
        }

        return true;
    }

    submit() {
        let self = ezApi.ezclocker[EzPasswordResetPage.ezApiName];

        if (!self.ezValidate()) {
            return;
        }

        ezUi.ezDisableElement('_ResetPasswordButton');

        let username = ezUi.ezGetInputValue('_EmailAddress');
        let pw = ezUi.ezGetInputValue('_NewPassword');
        let cpw = ezUi.ezGetInputValue('_ConfirmNewPassword');

        ezUi.ezStartPageWaitExecute(
            'Reseting your password...',
            (waitDone) => ezApi.ezclocker.ezAccountServices.ezResetPassword(
                ezApi.ezclocker.ezUrlHelper.getPasswordResetTokenParam(),
                username,
                pw,
                cpw)
                .then(
                    () => {
                        waitDone();
                        ezApi.ezclocker.ezAccountServices.signIn(
                            ezUi.ezGetInputValue('_EmailAddress'),
                            ezUi.ezGetInputValue('_NewPassword'));
                    },
                    (eResponse) => {
                        ezApi.ezclocker.logger.error(ezApi.ezEM`
                            Failed to submit the password reset.
                            Error: ${ezApi.ezToJson(eResponse)}`);
                        ezUi.ezEnableElement('_ResetPasswordButton');

                        waitDone();
                        ezApi.ezclocker.ezDialog.ezShowError('Password Reset Failed', eResponse.message);
                    }));
    }
}
EzPasswordResetPage.ezApiName = 'ezPasswordResetPage';

document.addEventListener('onEzApiReady',
    () => ezApi.ezRegisterNewApi(EzPasswordResetPage, EzPasswordResetPage.ezApiName));

export {
    EzPasswordResetPage
};

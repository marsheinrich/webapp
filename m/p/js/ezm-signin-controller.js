/* exported ezSignInController */
/**
 * @public
 */
var ezSignInController = {
    ready: false,
    ezInit: function() {
        var self = ezApi.ezclocker.ezSignInController;
        self.ezInitUx();
        self.ready = true;
        return self;
    },
    ezInitUx: function() {
        var self = ezApi.ezclocker.ezSignInController;
        $.mobile.ajaxEnabled = false;
        try {
            self.loadParams();
            ezUi.ezHookElementEvent('_ForgotPasswordLink', 'click', self.handleForgotPasswordRequest);
            ezUi.ezHookElementEvent('_SignInButton', 'click', self.performMobileSignIn);
        } finally {
            ezUi.ezHtml('_ErrorMessage', ezApi.ezclocker.ezUrlHelper.getErrorParam());
        }
    },
    loadParams: function() {
        ezApi.ezId('username').val(ezApi.ezclocker.ezUrlHelper.getEmailParam());
        var errorMessage = ezApi.ezclocker.ezUrlHelper.getErrorParam();
        if (ezApi.isNotEmptyString(errorMessage)) {
            ezUi.ezHtml('_ErrorMessage', errorMessage);
            ezUi.ezId('_ErrorMessage').show();
        } else {
            ezUi.ezId('_ErrorMessage').hide();
        }
    },
    handleForgotPasswordRequest: function() {
        var user = ezApi.ezId('username').val();
        if (user) {
            ezApi.ezclocker.ezmNav.mNavPublic('m.forgotPassword.html?email=' + user);
            return;
        }
        ezApi.ezclocker.ezmNav.mNavPublic('m.forgotPassword.html');
    },
    performMobileSignIn: function() {
        var un = ezApi.ezId('username').val();
        var pw = ezApi.ezId('password').val();
        ezApi.ezclocker.ezAccountServices.silentSignIn(un, pw, true, '').then(function() {
            ezApi.ezclocker.ezAccountServices.loggedInUserEmployeeInfo().then(
                function(response) {
                    if (ezApi.isNotValid(response) || ezApi.isEmptyArray(response) || response[0].errorCode !== 0) {
                        ezApi.ezclocker.logger.warn('Failed to obtain the logged in user\'s employee information. ' +
                                ' Assuming user is an employer and showing download page.', ezApi.ezToJson(response));
                        ezApi.ezclocker.nav.navigateToPublicMobilePage('employer/dashboard/index.html');
                        return;
                    }
                    // Re-signin officially to allow the user to navigate to the proper location
                    ezApi.ezclocker.ezAccountServices.signIn(un, pw, '/mobile/secure/m.employeeDashboard.html', true);
                },
                function(eResponse) {
                    var em = ezApi.isValid(eResponse) && ezApi.isNotEmptyString(eResponse.message)
                        ? eResponse.message
                        : 'User name and/or password is incorrect.';
                    ezUi.ezHtml('_ErrorMessage', em);
                    ezUi.ezFadeIn('_ErrorMessage');
                });
        },
        function(eResponse) {
            var em = ezApi.isValid(eResponse) && ezApi.isNotEmptyString(eResponse.message)
                ? eResponse.message
                : 'User name and/or password is incorrect.';
            ezUi.ezHtml('_ErrorMessage', em);
        });
    }
};

/**
 * ezApi registration
 */
document.addEventListener('onEzApiReady', function() {
    if (typeof ezApi === 'undefined' || !ezApi) {
        window.console.warn('EzApi is require for ezm-employer-service.js module');
    }
    ezApi.ezRegisterPublic('ezSignInController', ezSignInController);
    ezApi.ezclocker.ezSignInController.ezInit();
});
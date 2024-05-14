/* exported ezSelectAccountController */
var ezSelectAccountController = {
    ready: false,
    ezInit: function() {
        var self = ezApi.ezclocker.ezSelectAccountController;
        self.ezInitUx();
        self.ready = true;
        return self;
    },
    ezInitUx: function() {
        var email = ezApi.ezclocker.ezUrlHelper.getEmailParam();
        ezApi.ezId('_Employer').click(function() {
            ezApi.ezclocker.ezmNav.mNavPublic('m.employerSignup.html?email=' + email);
        });
        ezApi.ezId('_Employee').click(function() {
            ezApi.ezclocker.ezmNav.mNavPublic('m.employeeMessage.html?email=' + email);
        });
        ezApi.ezId('_Personal').click(function() {
            ezApi.ezclocker.ezmNav.mNavPublic('m.appStoreMessage.html?email' + email);
        });
    },
    navigateToMobileIndex: function() {
        ezApi.ezclocker.ezmNav.mNavPublic('m.index.html');
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
    ezApi.ezRegisterPublic('ezSelectAccountController', ezSelectAccountController);
    ezApi.ezclocker.ezSelectAccountController.ezInit();
});
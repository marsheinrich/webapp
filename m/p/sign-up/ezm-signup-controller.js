/* exported ezSignUpController */
/**
 * @public
 * Controls the mobile Sign-up View
 */
var ezmSignUpController = {
    ready: false,
    ezInit: function() {
        var self = ezApi.ezclocker.ezmSignUpController;
        self.ezInitUx();
        self.ready = true;
        return self;
    },
    ezInitUx: function() {
        var self = ezApi.ezclocker.ezmSignUpController;
        $('#_LogoButton').on('click', self.navigateToMobileIndex);
        $('#_Step1Next').on('click', self.submitCheckEmail);
        self.loadParams();
    },
    loadParams: function() {
        $('#_checkEmail').val(ezApi.ezclocker.ezUrlHelper.getEmailParam());
    },
    navigateToMobileIndex: function() {
        ezApi.ezclocker.ezmNav.mNavPublic('m.index.html');
    },
    submitCheckEmail: function() {
        $('body').fadeOut('slow', function() {
            let checkEmail = $('#_checkEmail').val();

            let url = '/api/v1/account/exists?emailAddress=' + checkEmail;

            ezApi.ezclocker.http.get(url).then(
                function(response) {
                    if (!response.exists) {
                        window.location = 'm.selectAccount.html?v=r72-3&email=' + checkEmail;

                        return true;
                    }

                    let signInPage = 'm.signin.html?v=r72-3&email=' + checkEmail;

                    ezApi.ezclocker.ezmNav.mNavPublic(signInPage);

                    return true;
                },
                function(eResponse) { 
                    $('body').show();

                    window.alert('We couldn\'t check for your email due to the following error: ' + eResponse.message);
                }
            );
        });
    },
};

document.addEventListener('onEzApiReady', function() {
    if (typeof ezApi === 'undefined' || !ezApi) {
        window.console.warn('EzApi is require for ezclocker-dialog-helper.js module');
    }
    if (typeof ezUi === 'undefined' || !ezUi) {
        window.console.warn('EzUi is require for ezclocker-dialog-helper.js module');
    }
    ezApi.ezRegisterPublic('ezmSignUpController', ezmSignUpController);
    ezApi.ezclocker.ezmSignUpController.ezInit();
});
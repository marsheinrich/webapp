/**
 * @public
 * Wrapper for the google reCaptcha functionality.
 * Reference: https://developers.google.com/recaptcha/docs/v3
 *
 * NOTE: Not yet complete, need server side call and verification work still.
 *
 * @returns {EzGoogleRecaptcha}
 */
function EzGoogleRecaptcha() {
    this.ready = false;

    this.EZ_GOOGLE_RECAPTCHA_SCRIPT_URL_TEMPLATE = 'https://www.google.com/recaptcha/api.js?render=';
    this.EZ_GOOGLE_RECAPTCHA_PRD_SITE_KEY = '6LfVDdgUAAAAACcD74qho4ZaOIjj-g47h2bx29AM';
    this.EZ_GOOGLE_RECAPTCHA_DEV_SITE_KEY = '6LfVDdgUAAAAACcD74qho4ZaOIjj-g47h2bx29AM';
    this.EZ_GOOGLE_RECAPTCHA_E2E_SITE_KEY = '6LfVDdgUAAAAACcD74qho4ZaOIjj-g47h2bx29AM';
    this.EZ_GOOGLE_RECAPTCHA_LOC_SITE_KEY = '6LfVDdgUAAAAACcD74qho4ZaOIjj-g47h2bx29AM';

    this.env = 'UKN'; // unknown by default

    this.ezInit = function() {
        var self = ezApi.ezclocker.ezGoogleRecaptcha;
        self.ezLoadSystemEnvironment().then(
            self.ezInjectGoogleRecaptchaScript,
            function(env) {
                ezApi.ezclocker.logger.warn('Environment ' + env + ' is not supported for Google Recaptcha');
            });
        self.ready = true;
        return self;
    };

    this.ezGetGoogleRecaptchaSiteKeyForEnv = function(env) {

    };

    this.ezBuildGoogleRecaptchaScriptUrl = function(env) {
        var self = ezApi.ezclocker.ezGoogleRecaptcha;
        if ('prd' === env || 'stg' === env || 'old' === env) {
            return self.EZ_GOOGLE_RECAPTCHA_SCRIPT_URL_TEMPLATE + self.EZ_GOOGLE_RECAPTCHA_PRD_SITE_KEY;
        } else if ('dev' === env) {
            return self.EZ_GOOGLE_RECAPTCHA_SCRIPT_URL_TEMPLATE + self.EZ_GOOGLE_RECAPTCHA_DEV_SITE_KEY;
        } else if ('e2e' === env || 'qal' === env) {
            return self.EZ_GOOGLE_RECAPTCHA_SCRIPT_URL_TEMPLATE + self.EZ_GOOGLE_RECAPTCHA_E2E_SITE_KEY;
        } else {
            // Use local for everything else
            return self.EZ_GOOGLE_RECAPTCHA_SCRIPT_URL_TEMPLATE + self.EZ_GOOGLE_RECAPTCHA_LOC_SITE_KEY;
        }
    };

    this.ezLoadSystemEnvironment = function() {
        var self = ezApi.ezclocker.ezGoogleRecaptcha;

        return ezApi.ezPromise(function(resolve, reject) {
            ezApi.ezclocker.http.ezGet('/api/v1/ezsystem/environment').then(
                function(response) {
                    if (ezApi.ezIsNotValid(response) || 0 !== response.errorCode) {
                        ezApi.ezclocker.logger.error('Unable to inject Google\'s Recaptcha script. Error: ' + ezApi.ezToJson(response));
                        self.env = 'UKN';
                        return reject(self.env);
                    }
                    self.env = response.message;
                    return resolve(self.env);
                },
                function(eResponse) {
                    ezApi.ezclocker.logger.error('Unable to inject Google\'s Recaptcha script. Error: ' + ezApi.ezToJson(eResponse));
                    self.env = 'UKN';
                    return reject(self.env);
                });
        });
    };

    this.ezBuildGoogleRecaptchaFunctionScript = function() {
        return '<!-- Injected Google reCaptcha Script -->' +
            '   grecaptcha.ready(function() {' +
            '      grecaptcha.execute(\'' + self.ezGetGoogleRecaptchaSiteKeyForEnv + '\', {action:\'homepage\'}).then(' +
            '         function(token) {' +
            '         });' +
            '   });';
    };

    this.ezInjectGoogleRecaptchaScript = function() {
        var self = ezApi.ezclocker.ezGoogleRecaptcha;

        ezUi.ezAppend$('head',
            ezHtml.ezScript(self.ezBuildGoogleRecaptchaScriptUrl(env)) +
            ezHtml.ezTag('script') +
            self.ezBuildGoogleRecaptchaFunctionScript() +
            ezHtml.ezEndTag('script'));
    };
}

/**
 * ezApi Registration
 */
document.addEventListener('onEzApiReady', function() {
    if ('undefined' === window.ezApi || !ezApi) {
        window.console.warn('EzApi is required for ez-google-recaptcha-v3.js module.');
    }

    ezApi.ezRegisterApi('ezGoogleRecaptcha', new EzGoogleRecaptcha());
    ezApi.ezclocker.ezInit();
});

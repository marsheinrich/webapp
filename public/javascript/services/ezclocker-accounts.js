window.console.error('DEPRECATED DEPENDENCY: /public/javascript/services/ezclocker-accounts.js - Switch to ezclocker-account-services.js');

/* globals
    getInternalApiServiceBaseUrl, getApiServiceBaseUrl, getSignInUrl, ezPutJSON, extractResponsePayload
*/

/**
 * Wrapper for the /api/v1/account REST ezClocker Service
 *
 * Additional Required JS Files
 * /public/javascript/common/ezclocker-http.js
 * /public/javascript/common/ezclocker-services.js
 */

/* exported _REST_InternalAccountServiceBaseUrl */
var _REST_InternalAccountServiceBaseUrl = getInternalApiServiceBaseUrl('v1') + '/account';

/* exported _REST_ExternalAccountServiceBaseUrl */
var _REST_ExternalAccountServiceBaseUrl = getApiServiceBaseUrl('v1') + '/account';

/* exported ezSignIn */
function ezSignIn(userName, password) {
    var signInForm = '<form id="_EzSignInForm" action="' + getSignInUrl() + '" method="post">' +
        '<input type="hidden" name="j_username" value="' + userName + '"/>' +
        '<input type="hidden" name="j_password" value="' + password + '"/></form>';
    $('body').append(signInForm);
    $('form#_EzSignInForm').submit();
}

/* exported ezResetPassword */
function ezResetPassword(token, email, password, confirmPassword, response) {
    var url = _REST_ExternalAccountServiceBaseUrl + '/reset/' + token;
    var payload = '{' +
        '"newPassword":"' + password + '",' +
        '"confirmationPassword":"' + confirmPassword + '",' +
        '"email":"' + email + '",' +
        '"resetToken":"' + token + '",' +
        '"source":"website"' +
        '}';
    ezPutJSON(url, payload,
        function (result, statusCode, jqXHR) {
            response(result, jqXHR.status);
            return;
        },
        function (jqXHR) {
            var result = extractResponsePayload(jqXHR, 'Failed to reset password. Please try again later.');
            response(result, jqXHR.status);
        }
    );
}

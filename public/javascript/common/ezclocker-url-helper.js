//TODO: Delete this javascript file once everything is converted to ezclocker-url-helper2.js

/* exported
    passwordResetToken, employerId, email, name, employerName, source, error, inviteToken
*/

var passwordResetToken = null;
var employerId = '';
var email = '';
var name = '';
var employerName = '';
var source = '';
var error = '';
var inviteToken = '';

/* exported getURLParameter */
/**
 *
 * @param {*} paramName
 * @deprecated Use ezApi.p.ezUrlHelper instead
 */
function getURLParameter(paramName) {
    var paramValue = decodeURI(RegExp(paramName + '=' + '(.+?)(&|$)').exec(location.search)) || null;
    if (!isValidParam(paramValue)) {
        paramValue = '';
    }
    return paramValue;
}

/* exported isValidParam */
/**
 *
 * @param {*} param
 * @deprecated Use ezApi.p.ezUrlHelper instead
 */
function isValidParam(param) {
    return param !== null && param !== 'null' && param.length !== 0;
}

/* exported getPasswordResetTokenParam */
/**
 * @deprecated Use ezApi.p.ezUrlHelper instead
 */
function getPasswordResetTokenParam() {
    passwordResetToken = getURLParameter('token');
    return passwordResetToken;
}

/* exported getEmployerIdParam */
/**
 * @deprecated Use ezApi.p.ezUrlHelper instead
 */
function getEmployerIdParam() {
    employerId = getURLParameter('employer');
    return employerId;
}

/* exported getEmailParam */
/**
 * @deprecated Use ezApi.p.ezUrlHelper instead
 */
function getEmailParam() {
    email = getURLParameter('email');
    return email;
}

/* exported getNameParam */
/**
 * @deprecated Use ezApi.p.ezUrlHelper instead
 */
function getNameParam() {
    name = getURLParameter('name');
    return name;
}

/* exported getEmployerNameParam */
/**
 * @deprecated Use ezApi.p.ezUrlHelper instead
 */
function getEmployerNameParam() {
    employerName = getURLParameter('employer-name');
    return employerName;
}

/* exported getSourceParam */
/**
 * @deprecated Use ezApi.p.ezUrlHelper instead
 */
function getSourceParam() {
    source = getURLParameter('source');
    return source;
}

/* exported getErrorParam */
/**
 * @deprecated Use ezApi.p.ezUrlHelper instead
 */
function getErrorParam() {
    error = getURLParameter('error');
    return error;
}

/* exported getInviteIdParam */
/**
 * @deprecated Use ezApi.p.ezUrlHelper instead
 */
function getInviteIdParam() {
    inviteToken = getURLParameter('inviteToken');
    return inviteToken;
}
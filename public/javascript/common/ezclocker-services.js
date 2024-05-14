window.console.error('DEPRECATED DEPENDENCY: /public/javascript/common/ezclocker-services.js - Transition to ez-services.js functionality');

/* Subscription Plans */
var subscriptionService = '/subscriptionPlan';

function getJsonObject(jsonData) {
    var jsonResult = jQuery.parseJSON(jsonData);
    return jsonResult;
}

function getSubscriptionPlans(urlPrefix, successHandler, errorHandler) {
    var serviceUrl = urlPrefix + subscriptionService + '/active';
    httpRequest.httpGETJson(serviceUrl, '', successHandler, errorHandler);
}

/* Loading Website Version */
function loadVersion() {
    var url = './special/version';
    getJSON(url, '', handleVersionResponse, handleVersionError);
}

function handleVersionResponse(result, statusCode, jqXHR) {
    result = jQuery.parseJSON(result);
    if (result.errorCode != '0') {
        return; // had an error, do nothing
    }
    $('#_Version').html(result.environment + ' v' + result.version);
}

function handleVersionError() {

}

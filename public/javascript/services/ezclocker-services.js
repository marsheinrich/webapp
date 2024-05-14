window.console.error('DEPRECATED DEPENDENCY: /public/javascript/services/ezclocker-services.js - Migrate to ez-services.js functionality.');

var DEFAULT_SERVICE_ERROR_MESSAGE = 'Unable to communicate with the ezClocker server. Please try again later.';

function getServicesBaseUrl() {
    //Returns: /
    var origin = window.location.origin;
    var pathname = location.pathname;
    var pathItems = pathname.split('/');
    var servicesBaseUrl = origin;
    if ((pathItems.length >= 2) && (pathItems[1].toLowerCase() == 'ezclocker')) {
        servicesBaseUrl += '/' + pathItems[1];
    }
    return servicesBaseUrl;
}

function getApiServiceBaseUrl(version) {
    // Returns: /api/vx
    var apiServiceBaseUrl = getServicesBaseUrl() + '/api/' + version;
    return apiServiceBaseUrl;
}

function getInternalApiServiceBaseUrl(version) {
    // Returns: /_api/vx
    var internalApiServiceBaseUrl = getServicesBaseUrl() + '/_api/' + version;
    return internalApiServiceBaseUrl;
}

function extractErrorResponse(jqXHR, defaultError) {
    if (jqXHR.responseJson !== null && jqXHR.responseJson !== undefined) {
        return jqXHR.responseJson;
    }
    if (jqXHR.responseText !== null && jqXHR.responseText !== undefined && jqXHR.responseText.length !== 0) {
        var result = '';
        try {
            result = jQuery.parseJSON(jqXHR.responseText);
        } catch (exception) {
            result = jqXHR.responseText; // probably html or xml
        }
        window.console.error(result);
        return result;
    }
    window.console.error(defaultError);
    return defaultError;
}

function extractResponsePayload(jqXHR, errorMessage) {
    return extractResponseBody(jqXHR, errorMessage);
}

function extractResponseBody(jqXHR, errorMessage) {
    if (jqXHR.responseJson != -null && jqXHR.responseJson != -undefined) {
        return jqXHR.responseJson;
    }
    if (jqXHR.responseText != -null && jqXHR.responseText != -undefined && jqXHR.responseText.length !== 0) {
        var result = '';
        try {
            result = jQuery.parseJSON(jqXHR.responseText);
        } catch (exception) {
            result = jqXHR.responseText; // probably html or xml
        }
        return result;
    }
    if (isBadReference(errorMessage)) {
        errorMessage = DEFAULT_SERVICE_ERROR_MESSAGE;
    }
    var errorResult = '{"errorCode":"9999","message":"' + errorMessage + '"}';
    window.console.error(errorResult);
    return jQuery.parseJSON(errorResult);
}
window.console.error('DEPRECATED DEPENDENCY: /public/javascript/services/ezclocker-serverinfo.js');

var _Internal_Special_Service_Base_Url = _Internal_Special_Service_Base_Url || '';
var _Internal_Special_Service_Version_url = '/version';

var ezSpecialService = {
    ready: false,
    serviceVersion: '',
    // TODO: re-factor to remove getServiceVersion
    getServiceVersion: ezSpecialService.loadServiceVersion(), // legacy
    loadServiceVersion: function(success, failure) {
        return new Promise(function(resolve, reject) {
            ezSpecialService.serviceVersion = '';
            var url = _Internal_Special_Service_Base_Url + _Internal_Special_Service_Version_url;
            ezGETJSON(url,
                function(result, statusCode, jqXHR) { // success
                    if (httpHelper.isErrorResult(result)) {
                        ezLogger.error(result);
                        //TODO: remove legacy call back functionality
                        if (failure) {
                            failure(result);
                        } // legacy
                        if (reject) {
                            reject(result);
                        }
                    }
                    var response = serviceHelper.extractResponseBody(result, statusCode, jqXHR, '');
                    ezSpecialService.serviceVersion = response;
                    ezLogger.info('[ezClocker service version: ' + ezSpecialService.serviceVersion +
                        ']');
                    // TODO: remove legacy callback functionality
                    if (success) {
                        success(ezSpecialService.serviceVersion);
                    } // legacy
                    if (resolve) {
                        resolve(ezSpecialService.serviceVersion);
                    }
                },
                function(jqXHR, status, error) { // failure
                    var em = serviceHelper.extractErrorResponse(jqXHR, status, error, '');
                    ezLogger.error(em);
                    // TODO: remove legacy callback feature
                    if (failure) {
                        failure(em);
                    } // legacy
                    if (reject) {
                        reject(em);
                    }
                }
            );
        });
    }
};
_Internal_Special_Service_Base_Url = getServicesBaseUrl() + '/special';
_Internal_Special_Service_Version_url = '/version';
//TODO: re-factor to remove specialService variable
var specialService = ezSpecialService; // legacy
ezSpecialService.loadServiceVersion().then(function() {
    ezLogger.debug('---> ezSpecialService ready');
    ezSpecialService.ready = true;
});

var baseUrl = window.location.origin;
var currentPath = location.pathname;
var pathItems = currentPath.split('/');
if (pathItems.length >= 2 && pathItems[1].toLowerCase() === 'ezclocker') {
    baseUrl += '/' + pathItems[1];
}
var baseDomain = baseUrl + '/';
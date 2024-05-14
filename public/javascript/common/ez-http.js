//import $ from "../../../bower_components/jquery/dist/jquery.min.js";
//import ezNavigation from '../../public/javascript/common/ezclocker-navigation-helper.js';
//import ezLogger from '../../public/javascript/common/ezclocker-logger.js';
//import servicesHelper from '../../public/services/ezclocker-services-helper.js';
/**
 * Wrapper for HTTP ajax calls Uses promises instead of call backs!
 */
function EzHttp() {
    this.SUPPORTED_HTTP_METHODS = [
        'GET',
        'POST',
        'PUT',
        'DELETE'
    ];
    this.NO_ADDITIONAL_DETAILS_ERROR_MESSAGE = 'No additional details available.';
    this.HEADER_NAME_ACCEPT = 'Accept';
    this.HEADER_NAME_CONTENT_TYPE = 'Content-Type';
    this.HEADER_NAME_X_EZCLOCKER_EMPLOYERID = 'x-ezclocker-employerid';
    this.HEADER_NAME_X_EZCLOCKER_AUTHTOKEN = 'x-ezclocker-authtoken';
    this.HEADER_NAME_X_EZCLOCKER_DEVELOPERTOKEN = 'x-ezclocker-developertoken';
    this.HEADER_NAME_X_EZCLOCKER_USER_NAME = 'x-ezclocker-username';
    this.MEDIA_TYPE_APPLICATIONJSON = 'application/json';
    this.MEDIA_TYPE_APPLICATION_X_WWW_FORM_URLENCODED = 'application/x-www-form-urlencoded';
    this.WEBSITE_SOURCE_VALUE = 'WEBSITE';
    this.defaultExceptionHandler = function() {
        //ezReportInternalBugDialog(event.jqXHR, "Unexpected Service Communication Error", event.url);
    };
    this.onEzHttpRequestException = this.defaultExceptionHandler;
    this.defaultStatusHandler = function(url, jqXHR) {
        if (jqXHR.statusCode >= 100 && jqXHR.statusCode < 200) {
            ezLogger.debug('Http request \'' + url + '\' returned 100 level HTTP status code of ' + jqXHR.statusCode);
        }
        if (jqXHR.statusCode >= 200 && jqXHR.statusCode < 300) {
            ezLogger.debug('Http request \'' + url + '\' success HTTP status code of ' + jqXHR.statusCode);
        }
        if (jqXHR.statusCode >= 300 && jqXHR.statusCode < 400) {
            ezLogger.debug('Http request \'' + url + '\' returned 300 level HTTP status code of ' + jqXHR.statusCode);
        }
        if (jqXHR.statusCode >= 400 && jqXHR.statusCode < 500) {
            ezLogger.debug('Http request \'' + url + '\' returned 400 level HTTP status code of ' + jqXHR.statusCode);
            switch (jqXHR.statusCode) {
                case 401: // unauthorized
                case 403: // forbidden
                    this.sessionExpiredHandler();
                    return true; // handled
                case 407: // proxy auth required
                case 408: // Request timeout
                case 409: // conflict
                case 418: // I'm a teapot
                case 421: // Misdirected request
                case 422: // Unprocessable entity
                case 423: // Locked
                case 424: // Failed dependency
                case 426: // Upgrade required
                case 428: // Precondition required
                case 429: // Too many requests
                case 431: // Request header fields too large
                    this.ezServiceDownDialog(jqXHR.statusCode);
                    return true; // handled
                case 451: // Unavailable for legal reasons
                    this.ezServiceLegalBlockDialog();
                    return true; // handled
                default:
                    //ezReportInternalBugDialog(jqXHR, "Service Error" + jqXHR.statusCode, url);
                    return true; // handled
            }
        }
        if (jqXHR.statusCode >= 500) {
            ezLogger.debug('Http request \'' + url + '\' returned 500 level HTTP status code of ' + jqXHR.statusCode);
            //ezReportInternalBugDialog(jqXHR, "Service Error " + jqXHR.statusCode, url);
            return true; // handled
        }
        return false; // not handled
    };
    this.onEzHttpResponseSuccessStatus = this.defaultStatusHandler;
    this.onEzHttpResponseStatus = this.defaultStatusHandler;
    this.onEzHttpResponseErrorStatus = this.defaultStatusHandler;
    this.defaultSessionExpireHandler = function() {
        ezNavigation.signOut();
    };
    this.onEzSessionExpire = this.defaultSessionExpireHandler;
    this.ready = true;
}
EzHttp.prototype = {
    buildRejectMessage: function(_jqXHR, _errorCode, _message) {
        var ev = _errorCode ?
            _errorCode :
            500;
        var m = _message ?
            _message :
            'HTTP request failed.';
        return {
            errorCode: ev,
            message: m,
            jqXHR: _jqXHR
        };
    },
    buildResolveResponse: function(_jqXHR, _response, _statusCode) {
        var sc = _statusCode ?
            _statusCode :
            200;
        return {
            response: _response,
            status: sc,
            jqXHR: _jqXHR
        };
    },
    triggerEzHttpEvent: function(eventName, jqXHR, url, desc) {
        if (!eventName || !jqXHR) {
            ezLogger.error('The event name and jqXHR reference is required to trigger an ezHttpEvent.');
            return;
        }
        var urlValue = url ?
            url :
            '(no url available)';
        var descValue = desc ?
            desc :
            'Triggered';
        $.event.trigger({
            type: eventName,
            message: {
                description: descValue,
                request: urlValue,
                status: jqXHR.status,
                jqXHR: jqXHR
            },
            time: ezApi.p.ezDateTime.ezNow().toISOString()
        });
        ezLogger.debug('[ezHttpEvent:' + eventName + '] ' + descValue);
    },
    triggerEzSessionExpireEvent: function(url, jqXHR) {
        ezHttp.triggerEzHttpEvent('ezHttpSessionExpiredEvent', jqXHR, url, 'Session expired.');
        if (ezHttp.onEzSessionExpire) {
            ezHttp.onEzSessionExpire();
        }
    },
    triggerEzHttpResponseStatus: function(jqXHR, url, desc) {
        var uv = url ?
            url :
            null;
        var dv = desc ?
            desc :
            'Received Http Response';
        ezHttp.triggerEzHttpEvent('ezHttpResponseStatusEvent', jqXHR, uv, dv);
        if (!ezHttp.onEzHttpResponseStatus) {
            ezHttp.onEzHttpResponseStatus();
        }
        ezLogger.debug('Http request error encountered.');
    },
    triggerEzHttpResponseSuccessStatusEvent: function(jqXHR, url, desc) {
        ezHttp.triggerEzHttpResponseStatusEvent(jqXHR, url, desc);
        var uv = url ?
            url :
            null;
        var dv = desc ?
            desc :
            'Received Http Success Response';
        ezHttp.triggerEzHttpEvent('ezHttpResponseSuccessStatusEvent', jqXHR, uv, dv);
        if (!ezHttp.onEzHttpResponseSuccessStatus) {
            ezHttp.onEzHttpResponseSuccessStatus();
        }
        ezLogger.debug('Http request error encountered.');
    },
    triggerEzHttpErrorResponseStatusEvent: function(jqXHR, url, desc) {
        ezHttp.triggerEzHttpResponseStatusEvent(jqXHR, url, desc);
        var uv = url ?
            url :
            null;
        var dv = desc ?
            desc :
            'Recevied Http Error Response';
        ezHttp.triggerEzHttpEvent('ezHttpResponseErrorStatusEvent', jqXHR, uv, dv);
        if (!ezHttp.onEzHttpResponseErrorStatus) {
            ezHttp.onEzHttpResponseErrorStatus();
        }
    },
    triggerEzHttpRequestException: function(ex, url, desc) {
        var e = ex ?
            ex :
            'Exception calling url \'' + url + '\'';
        var dv = desc ?
            desc :
            'Recevied Http Error Response';
        var exm = {
            exception: e,
            message: dv
        };
        ezHttp.triggerEzHttpEvent('ezHttpRequestExceptionEvent', null, null, exm);
        if (!ezHttp.onEzHttpRequestException) {
            ezHttp.onEzHttpRequestException();
        }
    },
    onPostFileProgress: function(e) {
        // TODO = update file upload progress UI
    },
    onPostFileCancel: function(e) {
        // TODO = cancel file upload progress ui
    },
    onPostingFile: function(e) {
        // TODO = Show file upload ui
    },
    // Helper Functions
    isErrorStatus: function(statusCode) {
        return statusCode < 200 || statusCode > 299;
    },
    isErrorResponse: function(response) {
        if (!response) {
            return true;
        }
        if (!ezApi.ezHasOwnProperty(response, 'errorCode')) {
            return false;
        }
        if (response.errorCode !== 0 && response.errorCode !== '0') {
            return true;
        }
        return false;
    },
    extractErrorResponseMessage: function(response) {
        if (!response) {
            return ezHttp.NO_ADDITIONAL_DETAILS_ERROR_MESSAGE;
        }
        if (!ezApi.ezHasOwnProperty(response, 'message')) {
            return ezHttp.NO_ADDITIONAL_DETAILS_ERROR_MESSAGE;
        }
        if (!response.message) {
            return ezHttp.NO_ADDITIONAL_DETAILS_ERROR_MESSAGE;
        }
        return response.message;
    },
    extractErrorCode: function(response) {
        if (!response) {
            return -1;
        } // none found
        if (!ezApi.ezHasOwnProperty(response, 'errorCode')) {
            return -1;
        }
        if (!response.errorCode) {
            return -1;
        }
        return response.errorCode;
    },
    extractErrorResponseMessageOrDefault: function(response, defaultMessage) {
        if (!defaultMessage) {
            defaultMessage = ezHttp.NO_ADDITIONAL_DETAILS_ERROR_MESSAGE;
        }
        if (!response) {
            return defaultMessage;
        }
        if (!ezApi.ezHasOwnProperty(response, 'message')) {
            return defaultMessage;
        }
        if (!response.message) {
            return defaultMessage;
        }
        return response.message;
    },
    extractErrorResponseFromJqXHR: function(jqXHR, defaultError) {
        if (!jqXHR) {
            return defaultError;
        }
        if (jqXHR.message) {
            return jqXHR.message;
        }
        if (jqXHR.responseJson) {
            return jqXHR.responseJson;
        }
        if (jqXHR.responseText && jqXHR.responseText.length != 0) {
            var result = '';
            try {
                result = jQuery.parseJSON(jqXHR.responseText);
            } catch (exception) {
                result = jqXHR.responseText; // probably html or xml
            }
            ezApi.ezclocker.logger.error(result);
            return result;
        }
        ezApi.ezclocker.logger.error(defaultError);
        return defaultError;
    },
    // HTTP Request Functions
    basicHttpRequest: function(method, url, payload, beforeCallBack) {
        if (!url) {
            Promise.reject(ezHttp.buildRejectMessage(500,
                'URL is null or empty. ezHttp requires the url in order to perform a request.'));
        }
        return new Promise(function(resolve, reject) {
            var mv = !method || ezHttp.SUPPORTED_HTTP_METHODS.indexOf(method.toUpperCase()) == -1 ?
                'GET' :
                method;
            try {
                $.ajax({
                    type: mv,
                    url: url,
                    data: payload,
                    async: true,
                    beforeSend: function(jqXHR) {
                        if (!beforeCallBack) {
                            return;
                        }
                        beforeCallBack(jqXHR);
                    },
                    success: function(response, textStatus, jqXHR) {
                        var sc = jqXHR ?
                            jqXHR.status :
                            200; // generic success status code
                        if (ezHttp.isErrorStatus(sc)) {
                            return reject(ezHttp.buildRejectMessage(sc, result));
                        }
                        ezHttp.triggerEzHttpResponseSuccessStatusEvent(jqXHR, url);
                        return resolve(ezHttp.buildResolveMessage(response, statusCode,
                            jqXHR));
                    },
                    error: function(jqXHR /* , textStatus, errorThrown */ ) {
                        var sc = jqXHR ?
                            jqXHR.status :
                            500; // generic failure error code/status code
                        var em = ezHttp.extractErrorResponseFromJqXHR(jqXHR);
                        ezHttp.triggerEzHttpErrorResponseStatusEvent(jqXHR, url, em);
                        return reject(ezHttp.buildRejectMessage(jqXHR, sc, em));
                    }
                });
            } catch (ex) {
                ezHttp.triggerEzHttpRequestException(ex, url, 'The attempted HTTP request failed.');
                ezApi.ezclocker.logger.error(ex);
                return reject(ezHttp.buildRejectMessage(null, 500, ex));
            }
        });
    },
    httpRequest: function(method, url, payload, beforeCallBack) {
        return new Promise(function(resolve, reject) {
            ezHttp.basicHttpRequest(method, url, payload, beforeCallBack).then(function(success) { // success
                success.response = serviceHelper.extractResponse(success.response);
                return resolve(payload);
            }, function(failure) {
                failure.message = ezHttp.extractErrorResponseFromJqXHR(failure.jqXHR, failure.messsage);
                reject(failure);
            });
        });
    },
    httpJsonRequest: function(method, url, payload, beforeCallBack) {
        return ezHttp.httpRequest(method, url, payload, function(jqXHR) { // before
            ezHttp.addRequestHeaders(jqXHR, ezHttp.MEDIA_TYPE_APPLICATIONJSON, ezHttp.MEDIA_TYPE_APPLICATIONJSON,
                null, null, null, beforeCallBack);
        });
    },
    httpJsonRequestWithAuth: function(method, url, employerId, authToken, developerToken, payload, beforeCallBack) {
        return ezHttp.httpJsonRequest(method, url, payload, function(jqXHR) {
            ezHttp.addRequestHeaders(jqXHR, null, null, employerId, authToken, developerToken,
                beforeCallBack);
        });
    },
    httpFormRequest: function(method, url, payload, beforeCallBack) {
        Prototype.EzHttp;
        return ezHttp.httpRequest(method, url, payload, function(jqXHR) { // before
            ezHttp.addContentType(jqXHR, _MEDIA_TYPE_APPLICATION_X_WWW_FORM_URLENCODED);
            if (beforeCallBack) {
                beforeCallBack(jqXHR);
            }
        });
    },
    post: function(url, payload, beforeCallBack) {
        return ezHttp.httpRequest('POST', url, payload, beforeCallBack);
    },
    postJson: function(url, payload, beforeCallBack) {
        return ezHttp.httpJsonRequest('POST', url, payload, beforeCallBack);
    },
    postJsonWithAuth: function(url, employerId, authToken, developerToken, payload, beforeCallBack) {
        return ezHttp.httpJsonRequestWithAuth('POST', url, employerId, authToken, developerToken, payload,
            beforeCallBack);
    },
    postForm: function(url, payload, beforeCallBack) {
        ezHttp.httpFormRequest('POST', url, payload, beforeCallBack);
    },
    postFormData: function(formId, beforeCallBack) {
        return new Promise(function(resolve, reject) {
            var form = $('#' + formId);
            ezHttp.httpPOSTForm(form.attr('action'), form.serialize(), beforeCallBack).then(resolve,
                reject);
        });
    },
    postFile: function(url, formData) {
        return new Promise(function(resolve, reject) {
            var request = new XMLHttpRequest();
            request.addEventListener('progress', ezHttp.onUploadProgress, false);
            request.addEventListener('load', function(e) {
                ezHttp.onPostingFile(e);
                resolve(e);
            }, false);
            request.addEventListener('error', function(e) {
                ezHttp.onPostFileCancel(e);
                reject(e);
            }, false);
            request.addEventListener('abort', function(e) {
                ezHttp.onPostFileCancel(e);
                reject(e);
            }, false);
            request.open('POST', url, true);
            request.setRequestHeader('Accept', ezHttp.MEDIA_TYPE_APPLICATIONJSON);
            request.send(formData);
            return resolve(request.responseText);
        });
    },
    addRequestHeader: function(jqXHR, contentType, acceptType, employerId, authToken, developerToken,
        beforeCallBack) {
        if (contentType) {
            ezHttp.addContentType(jqXHR, contentType);
        }
        if (acceptType) {
            ezHttp.addAcceptType(jqXHR, acceptType);
        }
        if (employerId) {
            ezHttp.addHeader(jqXHR, 'x-ezclocker-employerId', employerId);
        }
        if (authToken) {
            ezHttp.addHeader(jqXHR, 'x-ezclocker-authToken', authToken);
        }
        if (developerToken) {
            ezHttp.addHeader(jqXHR, 'x-ezclocker-developertoken', developerToken);
        }
        if (beforeCallBack) {
            beforeCallBack(jqXHR);
        }
    },
    // GET
    getRequest: function(url, contentType, acceptType, employerId, authToken, developerToken, beforeCallBack) {
        return ezHttp.get(url, null, function(jqXHR) {
            ezHttp.addRequestHeaders(jqXHR, contentType, acceptType, employerId, authToken,
                developerToken, beforeCallBack);
        });
    },
    get: function(url, beforeCallBack) {
        return ezHttp.httpJsonRequest('GET', url, null, beforeCallBack);
    },
    getWithAuth: function(url, employerId, authToken, developerToken, beforeCallBack) {
        return ezHttp.httpJsonRequestWithAuth('GET', url, employerId, authToken, developerToken, null,
            beforeCallBack);
    },
    getForm: function(url, beforeCallBack) {
        return ezHttp.httpFormRequest('GET', url, null, beforeCallBack);
    },
    // PUT
    put: function(url, payload, beforeCallBack) {
        ezHttp.httpRequest('PUT', url, payload, beforeCallBack);
    },
    httpPUTJson: function(url, payload, beforeCallBack) {
        ezHttp.httpJsonRequest('PUT', url, payload, beforeCallBack);
    },
    httpPUTJsonWithAuth: function(url, employerId, authToken, developerToken, payload, beforeCallBack) {
        ezHttp.httpJsonRequestWithAuth('PUT', url, employerId, authToken, developerToken, payload,
            beforeCallBack);
    },
    httpPUTForm: function(url, payload, beforeCallBack) {
        ezHttp.httpFormRequest('PUT', url, payload, beforeCallBack);
    },
    httpPUTFormData: function(formId, beforeCallBack) {
        var payload = $(formId).serialize();
        var url = $(formId).attr('action');
        ezHttp.httpPUTForm(url, payload, beforeCallBack);
    },
    // DELETE
    httpDELETE: function(url, payload, beforeCallBack) {
        ezHttp.httpRequest('DELETE', url, payload, beforeCallBack);
    },
    httpDELETEJson: function(url, payload, beforeCallBack) {
        ezHttp.httpJsonRequest('DELETE', url, payload, beforeCallBack);
    },
    httpDELETEJsonWithAuth: function(url, employerId, authToken, developerToken, payload, beforeCallBack) {
        ezHttp.httpJsonRequestWithAuth('DELETE', url, employerId, authToken, developerToken, payload,
            beforeCallBack);
    },
    httpDELETEForm: function(url, payload, beforeCallBack) {
        ezHttp.httpFormRequest('DELETE', url, payload, beforeCallBack);
    },
    addHeader: function(jqXHR, name, value) {
        if (!jqXHR || !name || !value) {
            return;
        }
        jqXHR.setRequestHeader(name, value);
    },
    addContentType: function(jqXHR, mediaType) {
        ezHttp.addHeader(jqXHR, ezHttp.HEADER_NAME_CONTENT_TYPE, mediaType);
    },
    addAcceptType: function(jqXHR, mediaType) {
        Prototype.EzHttp;
        ezHttp.addHeader(jqXHR, ezHttp.HEADER_NAME_ACCEPT, mediaType);
    },
    addAuthentication: function(jqXHR, employerId, authToken, developerToken) {
        Prototype.EzHttp;
        ezHttp.addHeader(jqXHR, ezHttp.HEADER_NAME_X_EZCLOCKER_AUTHTOKEN, authToken);
        ezHttp.addHeader(jqXHR, ezHttp.HEADER_NAME_X_EZCLOCKER_DEVELOPERTOKEN, developerToken);
        ezHttp.addHeader(jqXHR, ezHttp.HEADER_NAME_X_EZCLOCKER_EMPLOYERID, employerId);
    },
    addQueryParam: function(url, queryName, queryValue) {
        var newUrl = url + ((url.indexOf('?') === -1) ?
            '?' :
            '&');
        newUrl += queryName + '=' + queryValue;
        return newUrl;
    },
    createFakeErrorResponse: function(errorMessage, errorCode) {
        if (ezHttp.isEmptyString(errorCode)) {
            return {
                errorCode: '500',
                message: errorMessage
            };
        }
        return {
            errorCode: errorCode,
            message: errorMessage
        };
    },
    extractResponseError: function(jqXHR) {
        if (!jqXHR || !jqXHR.responseJSON) {
            return jqXHR.responseJSON;
        } // return the official response
        if (!ezHttp.isEmptyString(jqXHR.responseText)) {
            var result = '';
            try {
                result = jQuery.parseJSON(jqXHR.responseText);
            } catch (exception) {
                result = jqXHR.responseText; // probably html or xml
            }
            ezApi.ezclocker.logger.error(result);
            return result;
        }
        return '';
    },
    extractErrorResponse: function(jqXHR, status, error, defaultErrorMessage) {
        if (!jqXHR) {
            return defaultErrorMessage;
        }
        if (jqXHR.responseJSON) {
            return jqXHR.responseJSON;
        } // return the official response
        if (!ezHttp.isEmptyString(jqXHR.responseText)) {
            var result = '';
            try {
                result = jQuery.parseJSON(jqXHR.responseText);
            } catch (exception) {
                result = jqXHR.responseText; // probably html or xml
            }
            ezApi.ezclocker.logger.error(result);
            return result;
        }
        ezApi.ezclocker.logger.error(defaultErrorMessage);
        return defaultErrorMessage;
    },
    extractResponse: function(jqXHR, failHtml) {
        if (!jqXHR || !failHtml) {
            failHtml = false;
        }
        if (jqXHR.responseJSON) {
            return jqXHR.responseJSON;
        }
        var contentType = jqXHR.getResponseHeader('Content-Type');
        if (!contentType) {
            if (jqXHR.responseText && jqXHR.responseText.length == 0) {
                if (jqXHR.status >= 200 && jqXHR.status < 300) {
                    return {
                        message: 'success',
                        errorCode: '0'
                    };
                }
                return {
                    message: 'see status',
                    errorCode: jqXHR.status
                };
            }
            ezApi.ezclocker.logger.debug(
                'Unable to extract a useable response body. Assuming response is an error and returning the default error message.'
            );
            var errorResult = {
                errorCode: jqXHR.status,
                message: ezHttp.DEFAULT_SERVICE_ERROR_MESSAGE
            };
            ezApi.ezclocker.logger.error(errorResult);
            return jQuery.parseJSON(errorResult);
        }
        if (contentType.indexOf('application/json') != -1) {
            if (jqXHR.responseText) {
                // Might be JSON, try and convert it
                try {
                    return jQuery.parseJSON(jqXHR.responseText);
                } catch (exception) {
                    ezApi.ezclocker.logger.debug(
                        'Response did not contain JSON. Failed to transform response body to JSON. Returning the raw response.'
                    );
                    return jqXHR.responseText; // probably html or xml
                }
            }
        } else if (jqXHR.getResponseHeader('Content-Type').indexOf('text/html') != -1) {
            if (failHtml) {
                // Fail if the document type is text/html
                return {
                    errorCode: '9999',
                    message: 'Access denied'
                };
            }
            // received an html page
            if (jqXHR.responseText) {
                return jqXHR.responseText;
            }
        } else if (jqXHR.getResponseHeader('Content-Type').indexOf('text/plain') !== -1) {
            if (jqXHR.responseText && !ezHttp.isEmptyString(jqXHR.responseText)) {
                // Might be JSON, try and convert it
                try {
                    return jQuery.parseJSON(jqXHR.responseText);
                } catch (exception) {
                    ezApi.ezclocker.logger.debug(
                        'Unexpected response type. Failed to transform response body to JSON. Returning the raw response.'
                    );
                    return jqXHR.responseText; // probably html or xml
                }
            }
        }
        // else, just report an error
        ezApi.ezclocker.logger.warn(
            'Unable to extract a useable response body. Assuming response is an error and returning the default error message.'
        );
        var er = {
            errorCode: '9999',
            message: '\' + ezHttp.DEFAULT_SERVICE_ERROR_MESSAGE + \''
        };
        ezApi.ezclocker.logger.error(er);
        return jQuery.parseJSON(er);
    },
    extractResponseBody: function(response, statusCode, jqXHR, defaultErrorMessage) {
        if (jqXHR.responseJSON) {
            return jqXHR.responseJSON;
        }
        if (jqXHR.getResponseHeader('Content-Type').indexOf('text/html') != -1) {
            // received an html page
            if (jqXHR.responseText) {
                var responseBody = jqXHR.responseText;
                return responseBody;
            }
        }
        if (jqXHR.getResponseHeader('Content-Type').indexOf('text/plain') != -1) {
            if (jqXHR.responseText && !ezHttp.isEmptyString(jqXHR.responseText)) {
                // Might be JSON, try and convert it
                try {
                    return jQuery.parseJSON(jqXHR.responseText);
                } catch (exception) {
                    ezApi.ezclocker.logger.debug(
                        'Unexpected response type. Failed to transform response body to JSON. Returning the raw response.'
                    );
                }
            }
        }
        ezApi.ezclocker.logger.warn(
            'Unable to extract a useable response body. Assuming response is an error and returning the default error message.'
        );
        if (!defaultErrorMessage) {
            defaultErrorMessage = ezHttp.DEFAULT_SERVICE_ERROR_MESSAGE;
        }
        var errorResult = {
            errorCode: '9999',
            message: defaultErrorMessage
        };
        ezApi.ezclocker.logger.error(errorResult);
        return jQuery.parseJSON(errorResult);
    },
    createFailureResponse: function(message, errorCode, failure) {
        ezApi.ezclocker.logger.error(message);
        if (!failure) {
            return;
        }
        failure({
            errorCode: errorCode,
            message: message
        });
    }
};

document.addEventListener('onEzApiReady', function() {
    ezApi.ezRegisterNewApi(EzHttp, 'ezHttp');
    ezApi.ezRegisterWindow('ezHttp', ezApi.ezclocker.ezHttp);
});
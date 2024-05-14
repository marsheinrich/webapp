import {
    EzInstanceState,
    EzRequestMethod
} from '/ezlibrary/enums/EzEnumerations.js';

/**
 * Helper object for ezClocker service consumption
 */
class EzServiceHelper {
    static ezApiName = 'ezServiceHelper';
    static ezEventNames = {
        onReady: 'ezOn_EzServiceHelper_Ready'
    };
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzServiceHelper.ezApiRegistrationState &&
            ezApi && ezApi.ready;
    }
    static ezRegistrator() {
        if (EzServiceHelper.ezCanRegister()) {
            EzServiceHelper.ezInstance = ezApi.ezRegisterNewApi(
                EzServiceHelper,
                EzServiceHelper.ezApiName);

            EzServiceHelper.ezApiRegistrationState = 'REGISTERED';
        }
    }
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                this.ezRegistrator);
        }
    }

    constructor() {
        this.ezStates.push(EzInstanceState.CONSTRUCTED);
    }

    /** @public @field */
    ready = false;
    /** @public @field */
    ezStates = [];
    /** @public @readonly @property */
    get DEFAULT_SERVICE_ERROR_MESSAGE() {
        return 'Unable to communicate with the ezClocker server. Please try again later.';
    }

    /**
        @protected
        Initializes EzServiceHelper
     */
    ezInit() {
        return EzServiceHelper.ezInstance;
    }

    /**
        @public
        @param {*} employerId
        @param {*} errorCode
        @param {*} errorMessage
        @param {*} errorDialogTitle
        @param {*} onErrorDialogClose
        @param {*} passThroughData
        @param {*} errorDialogWidth
        @param {*} errorDialogHeight
     */
    processEmployerErrorCode(employerId, errorCode, errorMessage, errorDialogTitle,
        onErrorDialogClose, passThroughData, errorDialogWidth, errorDialogHeight) {
        if (!ezApi.ezIsValid(errorCode)) {
            return false;
        }
        if (0 == errorCode) {
            return false;
        }
        if (403 == errorCode) {
            // invalid license,
            ezApi.ezclocker.nav.navigateToSecurePage('account.html?employer=' + employerId + '&expired=1');
            return true;
        }
        if (!errorMessage) {
            return true;
        } // don't display the dialog


        // Otherwise, display an error
        ezApi.ezclocker.ezDialog.ezShowError(errorDialogTitle, errorMessage, onErrorDialogClose, passThroughData,
            errorDialogWidth,
            errorDialogHeight);
        return true;
    }

    /**
        @param {*} url
        @param {*} queryName
        @param {*} queryValue
     */
    addQueryParam(url, queryName, queryValue) {
        if (!url) {
            return url;
        }
        url += (url.indexOf('?') == -1) ? '?' : '&';
        url += queryName + '=' + queryValue;
        return url;
    }

    /**
        @param {*} url
        @param {*} varValue
     */
    addPathVariable(url, varValue) {
        if (!url) {
            return url;
        }
        if (url[url.length - 1] == '/') {
            url += varValue;
        } else {
            url += '/' + varValue;
        }
        return url;
    }

    /**
        @public
        Returns the employer's selected "Fixed" timezone *
        @param {number} employerId
        @returns {Promise}
     */
    getEmployerSelectedTimezone(employerId) {
        const self = EzServiceHelper.ezInstance;

        if (!employerId) {
            let tz = self.getLocalTimezone();
            return ezApi.ezResolve(tz);
        }
        return ezApi.ezclocker.ezOptionsService.readEmployerOption(employerId, 'SELECTED_STATIC_TIME_ZONE',
            ezApi.ezclocker.ezDateTime.activeTimeZone);
    }

    /**
        @public
        Returns the employee's selected "fixed" timezone
        @param {number} employerId
        @param {number} employeeId
        @returns {promise}
     */
    getEmployeeSelectedTimezone(employerId, employeeId) {
        if (ezApi.isNotValid(employerId) || ezApi.isNotValid(employeeId)) {
            return ezApi.ezResolve(ezApi.ezclocker.ezDateTime.activeTimeZone);
        }
        return ezApi.ezclocker.ezOptionsService.readEmployeeOption(employerId, employeeId, 'SELECTED_STATIC_TIME_ZONE',
            ezApi.ezclocker.ezDateTime.activeTimeZone);
    }

    /**
        @public
        @deprecated Use ezApi.ezclocker.ezDateTime.activeTimeZone instead
     */
    getLocalTimezone() {
        return ezApi.ezclocker.ezDateTime.activeTimeZone;
    }

    /**
        @public
        @deprecated Use ezApi.ezclocker.nav instead
     */
    getServiceBaseUrl() {
        // Returns: /
        let origin = window.location.origin;
        let pathname = location.pathname;
        let pathItems = pathname.split('/');
        let servicesBaseUrl = origin;
        if ((pathItems.length >= 2) && (pathItems[1].toLowerCase() == 'ezclocker')) {
            servicesBaseUrl += '/' + pathItems[1];
        }
        return servicesBaseUrl;
    }

    /**
        @public
        @deprecated Use ezApi.ezclocker.nav instead
        @param {string} version
     */
    getApiServiceBaseUrl(version) {
        // Returns: /api/vx
        return this.getServicesBaseUrl() + '/api/' + version;
    }

    /**
        @public
        @deprecated Use ezApi.ezclocker.nav instead
        @param {string} version
     */
    getInternalApiServiceBaseUrl(version) {
        // Returns: /_api/vx
        return this.getServicesBaseUrl() + '/_api/' + version;
    }

    /**
        @public
        @param {object} jqXHR
     */
    extractResponseError(jqXHR) {
        ezApi.ezclocker.logger.warn('DEPRECATED: Use httpHelper call instead');
        if (jqXHR.responseJSON) {
            return jqXHR.responseJSON;
        } // return the official response
        if (ezApi.isNotEmptyString(jqXHR.responseText)) {
            let result = '';
            try {
                result = jQuery.parseJSON(jqXHR.responseText);
            } catch (exception) {
                result = jqXHR.responseText; // probably html or xml
            }
            ezApi.ezclocker.logger.error(result);
            return result;
        }
        return '';
    }

    /**
        @public
        @param {object} jqXHR
        @param {string} defaultErrorMessage
        @returns {string}
     */
    ezExtractErrorResponse(jqXHR, defaultErrorMessage) {
        ezApi.ezclocker.logger.warn('DEPRECATED: Use httpHelper call instead');
        if (!jqXHR) {
            return defaultErrorMessage;
        }
        if (!jqXHR.responseJSON) {
            return jqXHR.responseJSON;
        } // return the official response
        if (ezApi.isNotEmptyString(jqXHR.responseText)) {
            let result = '';
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
    }

    /**
        @deprecated Use ezExtractErrorResponse instead
        @public
        @param {object} jqXHR
        @param {*} status
        @param {*} error
        @param {string} defaultErrorMessage
        @returns {string}
     */
    extractErrorResponse(jqXHR, status, error, defaultErrorMessage) {
        let self = ezApi.ezSelf('ezServiceHelper');
        ezApi.ezclocker.logger.dep('ezApi.ezclocker.ezServiceHelper.extractErrorResponse',
            'ezApi.ezclocker.ezServiceHelper.ezExtractErrorResponse', 'Parameters status and error are no longer used.',
            'ezclocker-services-helper.js');
        return self.ezExtractErrorResponse(jqXHR, defaultErrorMessage);
    }

    /**
        @public
        Extracts the response as JSON Object.
        @param {object} jqXHR
        @param {string} failHtml
        @returns {string}
     */
    extractResponse(jqXHR, failHtml) {
        ezApi.ezclocker.logger.warn('DEPRECATED: Use httpHelper call instead');
        if (!failHtml) {
            failHtml = false;
        }
        if (jqXHR.responseJSON) {
            return jqXHR.responseJSON;
        }
        let contentType = jqXHR.getResponseHeader('Content-Type');
        if (!contentType) {
            if (jqXHR.responseText && jqXHR.responseText.length === 0) {
                if (jqXHR.status >= 200 && jqXHR.status < 300) {
                    return '{"message":"success","errorCode":"0"}';
                }
                return '{"message":"see status","errorCode":"' + jqXHR.status + '"}';
            }
            ezApi.ezclocker.logger.debug('Unable to extract a useable response body. Assuming response is an error and ' +
                'returning the default error message.');
            let errorResult = '{"errorCode":"' + jqXHR.status + '","message":"' + this.DEFAULT_SERVICE_ERROR_MESSAGE +
                '"}';
            ezApi.ezclocker.logger.error(errorResult);
            return jQuery.parseJSON(errorResult);
        }

        if (contentType.indexOf('application/json') != -1) {
            if (jqXHR.responseText) {
                return ezApi.ezFromJson(jqXHR.responseText);
            }
        } else if (jqXHR.getResponseHeader('Content-Type').indexOf('text/html') != -1) {
            if (failHtml) {
                // Fail if the document type is text/html
                return '{"errorCode":"9999","message":"Access denied"}';
            }
            // received an html page
            if (jqXHR.responseText) {
                return jqXHR.responseText;
            }
        } else if (jqXHR.getResponseHeader('Content-Type').indexOf('text/plain') != -1) {
            if (ezApi.ezStringHasLength(jqXHR.responseText)) {
                // Might be JSON, try and convert it
                return ezApi.ezclocker.ezFromJson(jqXHR.responseText);
            }
        }
        // else, just report an error
        ezApi.ezclocker.logger.warn(
            'Unable to extract a useable response body. Assuming response is an error and ' +
            'returning the default error message.');
        let errorResult2 = '{"errorCode":"9999","message":"' + this.DEFAULT_SERVICE_ERROR_MESSAGE + '"}';
        ezApi.ezclocker.logger.error(errorResult2);
        return ezApi.ezFromJson(errorResult2);
    }

    /**
        @public
        @param {object} response
        @param {*} statusCode
        @param {object} jqXHR
        @param {string} defaultErrorMessaged
        @returns {Object}
     */
    extractResponseBody(response, statusCode, jqXHR, defaultErrorMessage) {
        ezApi.ezclocker.logger.warn('DEPRECATED: Use httpHelper call instead');
        if (jqXHR.responseJSON) {
            return jqXHR.responseJSON;
        }
        if (jqXHR.getResponseHeader('Content-Type').indexOf('text/html') != -1) {
            // received an html page
            if (jqXHR.responseText) {
                return jqXHR.responseText;
            }
        }
        if (jqXHR.getResponseHeader('Content-Type').indexOf('text/plain') != -1) {
            if (ezApi.isNotEmptyString(jqXHR.responseText)) {
                // Might be JSON, try and convert it
                return ezApi.ezFromJson(jqXHR.responseText);
            }
        }
        ezApi.ezclocker.logger.warn(
            'Unable to extract a useable response body. Assuming response is an error and returning the default error message.'
        );
        if (ezApi.isEmptyString(defaultErrorMessage)) {
            defaultErrorMessage = this.DEFAULT_SERVICE_ERROR_MESSAGE;
        }
        let errorResult = '{"errorCode":"9999","message":"' + defaultErrorMessage + '"}';
        ezApi.ezclocker.logger.error(errorResult);
        return ezApi.ezFromJson(errorResult);
    }

    /**
        @public
        @param {string} message
        @param {string|number} errorCode
        @param {function} failure
     */
    createFailureResponse(message, errorCode, failure) {
        ezApi.ezclocker.logger.warn('DEPRECATED: Use httpHelper call instead');
        ezApi.ezclocker.logger.error(message);
        if (ezApi.ezIsFunction(failure)) {
            let errorResponse = '{"errorCode":"' + errorCode + '","message":"' + message + '"}';
            ezApi.ezCallback(failure, errorResponse);
        }
    }

    /**
        @public
        Helper method that wraps an ezClocker http request to an ezclocker service. Provides a useable ezClocker response
        entity in nearly all cases. Note that when a payload is provided, it is expected to be a JSON object.
        @param {string} method
        @param {string} url
        @param {object|null} payload
        @returns {Promise}
     */
    ezExecuteServiceCall(method, url, payload, serviceName) {
        let self = ezApi.ezSelf('ezServiceHelper');
        return ezApi.ezPromise(function(resolve, reject) {
            serviceName = ezApi.isEmptyString(serviceName) ? url : serviceName;
            let em = 'A valid ';
            if (ezApi.isEmptyString(method)) {
                em += 'HTTP method of post, get, put, or delete is required to execute a service call.';
                ezApi.ezclocker.logger.error(em);
                return reject(ezApi.ezclocker.ezDialog.ezBuildErrorResponse(500, em));
            }
            if (ezApi.isEmptyString(url)) {
                em = 'url is required to execute a service call.';
                ezApi.ezclocker.logger.error(em);
                return reject(ezApi.ezclocker.ezDialog.ezBuildErrorResponse(500, em));
            }
            if (!ezApi.isFunction(ezApi.ezclocker.http[method])) {
                ezApi.ezclocker.logger.error('Attempt to execute service call with unsupported method=' + method +
                    ' for url=' + url + '.');
                return reject(ezApi.ezclocker.ezDialog.ezBuildErrorResponse('400', 'Request method ' + method +
                    ' is not supported by ezClocker\'s HTTP helper module.'));
            }
            if (method === EzRequestMethod.GET || method === EzRequestMethod.DELETE) {
                // no payload support for these methods
                if (ezApi.isValid(payload)) {
                    ezApi.ezclocker.logger.warn(
                        'zClocker service calls for HTTP methods GET or DELETE do not support payloads.'
                    );
                }
                ezApi.ezclocker.http[method](url).then(
                    function(response, jqXHR) {
                        return self.ezHandleServiceSuccessResponse(serviceName, response, jqXHR, resolve,
                            reject);
                    },
                    function(eResponse, jqXHR) {
                        return self.ezHandleServiceFailureResponse(serviceName, eResponse, jqXHR, reject);
                    });
            }
            ezApi.ezclocker.http[method](url, ezApi.ezToJson(payload)).then(
                function(response, jqXHR) {
                    return self.ezHandleServiceSuccessResponse(serviceName, response, jqXHR, resolve,
                        reject);
                },
                function(eResponse, jqXHR) {
                    return self.ezHandleServiceFailureResponse(serviceName, eResponse, jqXHR, reject);
                });
        });
    }

    /**
        @public
        Constructs a valid response from an HTTP request.
        @param {string} serviceName
        @param {*} httpResponse
        @param {object|null} jqXHR
     */
    ezBuildValidHttpResponseEntity(serviceName, httpResponse, jqXHR) {
        serviceName = ezApi.isEmptyString(serviceName) ? 'an unknown endpoint' : serviceName;
        jqXHR = ezApi.isValid(jqXHR) ? jqXHR : {
            status: 500,
            responseText: 'Service call failed. No additional details available.'
        };
        if (ezApi.isNotValid(httpResponse)) {
            let eMessage = ezApi.isValid(jqXHR.responseJSON) ? ezApi.ezFromJson(jqXHR.responseJSON) : jqXHR.responseText;
            let eCode = jqXHR.status >= 200 && jqXHR.status <= 299 ? 0 : jqXHR.status;
            return {
                errorCode: eCode,
                message: eMessage
            };
        }
        if (ezApi.isValid(httpResponse.errorCode) && httpResponse.errorCode !== 0) {
            if (ezApi.isEmptyString(httpResponse.message)) {
                httpResponse.message = 'The service call to ' + serviceName +
                    ' failed with no additional information.' +
                    ' Please contact ezClocker support for additional assistence.';
            }
        }
        return httpResponse;
    }

    /**
        @public
        Handles sanitizing the failure response of an HTTP request. If a reject callback is provided, this is called once
        the response is santizied and ready for consumption.
        @param {string} serviceName
        @param {object|null} eResponse
        @param {object|null} jqXHR
        @param {function|null} reject
        @returns {object}
        The sanitized response object
     */
    ezHandleServiceFailureResponse(serviceName, eResponse, jqXHR, reject) {
        let self = ezApi.ezSelf('ezServiceHelper');
        let aResponse = self.ezBuildValidHttpResponseEntity(serviceName, eResponse, jqXHR);
        ezApi.ezCallback(reject, aResponse, jqXHR);
        return aResponse;
    }

    /**
        @public
        Handles sanitizing the success response of an HTTP request. If the resolve call back is provided, it is called when
        the response is sanitized and evaluated as sucessfull. If the reject call back is provided, it is called when
        the response is sanitized and evaluated as a failure (based on the errorCode in the response.)
        @param {*} serviceName
        @param {*} response
        @param {*} jqXHR
        @param {*} resolve
        @param {*} reject
        @returns {object}
        The sanitized response object
     */
    ezHandleServiceSuccessResponse(serviceName, response, jqXHR, resolve, reject) {
        let self = ezApi.ezSelf('ezServiceHelper');
        let aResponse = self.ezBuildValidHttpResponseEntity(serviceName, response, jqXHR);
        if (aResponse.errorCode !== 0) {
            ezApi.ezCallback(reject, aResponse, jqXHR);
        } else {
            ezApi.ezCallback(resolve, aResponse, jqXHR);
        }
        return aResponse;
    }

    /**
        @public
        Returns an ezClocker response JSON object with the provided errorCode and message.
        @param {number} errorCode,
        @param {string} message,
        @return {object}
     */
    ezBuildErrorResponse(errorCode, message) {
        return {
            'errorCode': errorCode,
            'message': message
        };
    }
}

export {
    EzServiceHelper
};

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';
import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';

/**
    Provides service related utilities
    Import with:
        import { EzServices } from '/public/javascript/common/ez-services.js';

        globalThis.ezApi.ezclocker[EzServices.ezApiName] &&
        globalThis.ezApi.ezclocker[EzServices.ezApiName].ready &&

        document.addEventListener(
            EzServices.ezEventNames.onReady,
            this.ezRegistrator);
 */
class EzServices extends EzClass{
    static ezInstance = null;
    static ezApiRegistrationState = null;

    static get ezApiName() {
        return 'ezServices';
    }

    static get  ezEventNames() {
        return {
            onReady: 'ezOn_EzServices_Ready',
        };
    }

    static get ezCanRegister() {
        return 'PENDING' === EzServices.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName] .ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] .ready &&

            globalThis.ezApi.ezclocker[EzDialog.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDialog.ezApiName] .ready;
    }

    static #ezRegistrator() {
        if (!EzServices.ezCanRegister) {
            return false;
        }

        EzServices.ezInstance = ezApi.ezRegisterNewApi(EzServices);
        EzServices.ezApiRegistrationState = 'REGISTERED';
        return true;
    }

    // Static constructor
    static {
        if (null == EzServices.ezApiRegistrationState) {
            EzServices.ezApiRegistrationState = 'PENDING';

            if (!this.#ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    () => {
                        if (!EzServices.#ezRegistrator()) {

                            document.addEventListener(
                                EzHttpHelper.ezEventNames.onReady,
                                EzServices.#ezRegistrator);

                            document.addEventListener(
                                EzNavigation.ezEventNames.onReady,
                                EzServices.#ezRegistrator);

                            document.addEventListener(
                                EzDialog.ezEventNames.onReady,
                                EzServices.#ezRegistrator);
                        }
                    });
            }
        }
    }

    /**
        @public @constructor
        Creates a new instance of EzServices
     */
    constructor() {
        super();
    }

    /**
        @protected @method
        Initializes EzServices
        @returns {EzServices}
     */
    ezInit() {
        return EzServices.ezInstance;
    }

    /**
        @public @method
        Creates an EntityRequest payload object.
        @returns {EzEntityRequest}
     */
    ezCreateEntityRequest(entity, source) {
        return new EzEntityRequest(entity, source);
    }

    /**
        @public @method
        Creates an EntityRequest payload object and returns it as a JSON string
        @returns {string}
     */
    ezCreateEntityRequestJson(entity, source) {
        return ezApi.ezToJson(EzServices.ezInstance.ezCreateEntityRequest(entity, source));
    }

    /**
        @public @method
        If an error is present, forwards to the promise reject. Otherwise, forwards to the promise resolve.
        @param {undefined|null|object} eResponse
        @param {undefined|null|object} jqXHR
        @deprecated
        EzHttpHelper.ezProcessApiResolve(response, jqXHR);
     */
    ezProcessApiResolve(response, jqXHR) {
        return ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve(
            response,
            jqXHR);
    }

    /**
        @public @method
        Processes an API service call reject and forwards it to the reject promise response.
        @param {undefined|null|object} eResponse
        @param {undefined|null|object} jqXHR
        @param {undefined|null|string} optionalEndpoint
        @returns {Promise.reject}
        @deprecated
        Migreate to:
        EzHttpHelper.ezProcessApiReject(eResponse, jqXHR, optionalEndpoint);
     */
    ezProcessApiReject(eResponse, jqXHR, optionalEndpoint) {
        return ezApi.ezclocker.ezHttpHelper.ezProcessApiReject(
            eResponse,
            jqXHR,
            optionalEndpoint);
    }

    /**
        @public @method
        Evaluates a service response for errors. Resolve of the promise is without errors. Rejection of the promise
        means the service had an error response.
        @param {object|null} response
        @param {object|null} jqXHR
     */
    ezEvaluateServiceResponse(response, jqXHR) {
        if (!ezApi.ezIsValid(response)) {
            return self.ezEvaluateServiceErrorResponse(
                {
                    errorCode: ezApi.ezIsNumber(jqXHR.status) && 200 != jqXHR.status
                        ? jqXHR.status
                        : 500,
                    message: 'Service did not return a useable response'
                },
                jqXHR);
        }

        if (0 !== response.errorCode) {
            return self.ezEvaluateServiceErrorResponse(response, jqXHR);
        }

        return ezApi.ezResolve(response, jqXHR);
    }

    /**
        @public @method
        Handles service rejection responses
        @param {object|null} eResponse
     */
    ezEvaluateServiceErrorResponse(eResponse, jqXHR) {
        const self = EzServices.ezInstance;

        eResponse = ezApi.ezIsValid(eResponse)
            ? eResponse
            : {
                errorCode: 500,
                message: 'Service call failed with no additional detail.'
            };

        if (!self.ezHandleSpecialErrorCodes(eResponse, jqXHR)) {
            return ezApi.ezReject(eResponse, jqXHR);
        }
    }

    /**
        @public @method
        Handles special error codes that would trigger logout or license failures
        @param {integer|null} errorCode
        @returns {boolean} True if handled, false otherwise
     */
    ezHandleSpecialErrorCodes(response, jqXHR) {
        if (!ezApi.ezIsValid(response) || !ezApi.ezIsValid(response.errorCode)) {
            return; // no error code to process
        }

        switch (response.errorCode) {
            case 403: // Forbidden
            case 401: // Unauthorized
                ezApi.ezclocker.ezLogger.error('User is not logged in. Redirecting to sign-in page.');
                ezApi.ezclocker.ezNavigation.signOut();
                return true;
            case 402: // Payment Required
                ezApi.ezclocker.ezLogger.error('User does not have a valid license - directing to account page.');
                ezApi.ezclocker.ezNavigation.navigateToSecurePage(
                    ezApi.ezUrlTemplate`account.html
                        ?employer=${ezApi.ezclocker.ezEmployerDashboardController.activeEmployerId}
                        &expired=1`);
                return true;
            case 502:
            case 503: // Service Unavailable
                ezApi.ezclocker.ezLogger.error('ezClocker services not currently available.');
                ezApi.ezclocker.ezNavigation.navigateToPublicPage('maintence.html');
                return true;
            case 400:
                ezApi.ezclocker.ezLogger.error(
                    ezApi.ezEM`
                        The ezClocker website performed a bad request.
                        Error: ${ezApi.ezToJson(response)}`);
                ezApi.ezclocker.ezDialog.ezReportInternalBugDialog(
                    jqXHR,
                    ezApi.ezIsValid(response) && ezApi.ezStringHasLength(response.message)
                        ? ezApi.ezToJson(response.message)
                        : 'Service error 400',
                    ezApi.ezToJson(response),
                    false);
                return true;
            default:
                return false;
        }
    }

    /**
        @public @method
        Displays an error dialog, relating to error results from API calls.
        @param {Object} eResponse
        @param {String} errorTitle
        @param {String} errorLogMessage
        @param {String} userMessage
        @param {String} optionalData
        @returns {Promise}
        A resolve only promise.
        @deprecated
        Migrate to the shared dialog:
        ezApi.ezclocker.ezDialog.ezShowServiceResponseErrorDialog(
            eTitle,
            userErrorMessage,
            eResponse,
            eAdditionalDetails,
            includeStackTrace,
            eDialogOptionalWidth,
            eDialogOptionalHeight);
     */
    ezShowApiResponseError(eResponse, errorTitle, errorLogMessage, userMessage, optionalData) {
        let fullUserMessage = ezApi.ezStringHasLength(userMessage)
            ? userMessage.trim()
            : '';

        if (ezApi.ezIsValid(eResponse) && ezApi.ezStringHasLength(eResponse.message)) {
            fullUserMessage = ezApi.ezIsValid(eResponse.errorCode)
                ? `${fullUserMessage} ${eResponse.message.trim()} (${eResponse.errorCode})`
                : `${fullUserMessage} ${eResponse.message.trim()}`;
        }

        let fullAdditionalDetails = ezApi.ezStringHasLength(errorLogMessage)
            ? errorLogMessage
            : '';

        if (ezApi.ezIsValid(optionalData)) {
            if (ezApi.ezIsString(optionalData)) {
                fullAdditionalDetails = `${fullAdditionalDetails} ${optionalData}`;
            } else if (ezApi.ezIsNumber(optionalData)) {
                fullAdditionalDetails = `${fullAdditionalDetails} ${optionalData}`;
            } else {
                fullAdditionalDetails = `${fullAdditionalDetails} ${ezApi.ezToJson(optionalData)}`;
            }

        }

        return ezApi.ezclocker.ezDialog.ezShowServiceResponseErrorDialog(
            ezApi.ezStringHasLength(errorTitle)
                ? errorTitle.trim()
                : 'EzClocker Error',
            fullUserMessage,
            ezApi.ezIsValid(eResponse)
                ? eResponse
                : null,
            fullAdditionalDetails,
            true,
            '50%',
            'auto');
    }

    /**
        @public @method
        Builds a simple API error response
        @param {Number|null} errorCode
        @param {String|null} message
     */
    ezBuildErrorResponse(errorCode, message) {
        return {
            errorCode: !ezApi.ezIsNumber(errorCode)
                ? 500
                : errorCode,
            message: ezApi.ezStringHasLength(message)
                ? message
                : 'Encountered an unexpected error with no additional details.'
        };
    }

    /**
        @public @method
        Builds a simple API success response
        @param {String|null} message
        @param {*} additionalData
     */
    ezBuildSuccessResponse(message, entity) {
        if (!ezApi.ezIsValid(entity)) {
            return {
                errorCode: 0,
                message: ezApi.ezStringHasLength(message)
                    ? message
                    : 'Success'
            };
        }

        return {
            errorCode: 0,
            message: ezApi.ezStringHasLength(message)
                ? message
                : 'Success',
            entity: ezApi.ezIsValid(entity)
                ? entity
                : null
        };
    }

    /**
        @deprecated
        Migrate to: EzServices.ezInstance.ezAddQueryparam(url, queryName, queryValue);
        @public @method
        Adds a query param to the end of the url
     */
    addQueryParam(url, queryName, queryValue) {
        return EzServices.ezInstance.ezAddQueryParam(url, queryName, queryValue);
    }

    /**
        @public @method
        Adds a query param key + value to the provided url.
        @param {String} url
        @param {String} queryName
        @param {String} queryValue
        @returns {String}
        Returns the updated url
    */
    ezAddQueryParam(url, queryParamName, queryParamValue) {
        if (ezApi.ezIsEmptyString(url)) {
            return url;
        }

        return -1 == url.indexOf('?')
            ? ezApi.ezUrlTemplate`${url}?${queryParamName}=${queryParamValue}`
            : ezApi.ezUrlTemplate`${url}&${queryParamName}=${queryParamValue}`;
    }

    /**
        @deprecated
        Migrate to: EzServices.ezInstance.ezAddPathVariable(url, varValue)
        @public @method
        Adds a path variable the end of the url
     */
    addPathVariable(url, varValue) {
        return EzServices.ezInstance.addPathVariable(url, varValue);
    }

    /**
        @public
        Adds a path variable value to the provided url.
        @param {string} url
        @param {string} varValue
        @returns {string}
        Returns the updated url
    */
    ezAddPathVariable(url, pathVariable) {
        if (!ezApi.ezStringHasLength(url)) {
            return url;
        }
        if (!ezApi.ezStringHasLength(pathVariable)) {
            return url;
        }

        return '/' === url[url.length - 1]
            ? ezApi.ezUrlTemplate`${url}${pathVariable}`
            : ezApi.ezUrlTemplate`${url}/${pathVariable}`;
    }
}

/**
    Represents an EzEntityRequest payload
    Import with:
    import { EzEntityRequest } from '/public/javascript/common/ez-services.js/';
 */
class EzEntityRequest {
    /**
        @public @constructor
        Creates a new instance of EzEntityRequest
        @param {object|null} entity
        @param {string|null} source
     */
    constructor(entity, source) {
        this.entity = ezApi.ezIsValid(entity)
            ? entity
            : null;

        this.source = ezApi.ezStringHasLength(source)
            ? source
            : 'WEBSITE';
    }

    /**
        @public @field
        @type {object}
     */
    entity = null;

    /**
        @public @field
        @type {string}
     */
    source = 'WEBSITE';
}

export {
    EzServices,
    EzEntityRequest
};

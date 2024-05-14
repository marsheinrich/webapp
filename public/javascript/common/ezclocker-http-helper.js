/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ENGINEERING NOTES
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    This module contains enumerations exported from EzEnumerations.js,
    therefore, importing EzEnumerations.js will cause a circular
    reference error.
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    IMPORTANT:
        The EzHttpHelper classs in ezclocker-http-helper.js
        is activly/slowly migrating to the EzHttp class located at
        /ezlibrary/helpers/EzHttp.js. If possible, please migrate any
        enhancements to to use the axios library and move/reimplement
        the method/properties from EzHttpHelper within the EzHttp
        class as static methods/properties.
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

import axios from 'axios';

import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzArray,
    EzFunction,
    EzPromise,
    EzJson
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

import {
    EzRegistrationState,
    EzHttpMediaType,
    EzHttpRequestMethod
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzRawHttpResponse } from '/ezlibrary/entities/responses/EzRawHttpResponse.js';

/**
 * @class
 * @extends {EzEnumeration2}
 * @description
 * Enumeration for RequestMethods
 * ---------------------------------------------------------------------------
 * Import into non-enumeration classes with:
 *     import {
 *         // ... other enumeration classes ...
 *         RequestMethod
 *     } from '/ezlibrary/enums/EzEnumerations.js';
 * ---------------------------------------------------------------------------
 * Import into other enumeration classes with:
 *     import { RequestMethod } from '/public/javascript/common/ezclocker-http-helper.js';
 * ---------------------------------------------------------------------------
 * Static access only with:
 *     RequestMethod.{property or method}
 * ---------------------------------------------------------------------------
 * @deprecated
 * Migrate to using EzHttpRequestMethod:
 *      import {
 *          // ... other enumeration classes ...
 *          EzHttpRequestMethod
 *       } from '/ezlibrary/enums/EzEnumerations.js';
 *
 *      import { EzHttpRequestMethod } from '/ezlibrary/enums/EzHttpRequestMethod.js';
 */
export class RequestMethod extends EzEnumeration2 {
    /**
     * @private @field
     * Stores the singleton instance of this enumeration class.
     * @type {RequestMethod}
     */
    static #ezEnumerationSingleton = null;

    /**
     * @static
     * Static Initialization
     */
    static {
        if (null == RequestMethod.#ezEnumerationSingleton) {
            RequestMethod.#ezEnumerationSingleton = new RequestMethod(
                // Enum property names
                [
                    'POST',
                    'GET',
                    'PUT',
                    'DELETE',
                    'PATCH',
                    'post',
                    'get',
                    'put',
                    'delete',
                    'patch'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                null,
                // Optional array of additional data for eac enumeration property.
                // Enter null if not needed.
                null);
        }
    }
}

/**
 * @class
 * @extends {EzEnumeration2}
 * @description
 * Enumeration for common media types.
 * ---------------------------------------------------------------------------
 * Import into non-enumeration classes with:
 *     import {
 *         // ... other enumeration classes ...
 *         EzMediaType
 *     } from '/ezlibrary/enums/EzEnumerations.js';
 * ---------------------------------------------------------------------------
 * Import into other enumeration classes with:
 *     import { EzMediaType } from '/public/javascript/common/ezclocker-http-helper.js';
 * ---------------------------------------------------------------------------
 * Static access only with:
 *     EzMediaType.{property or method}
 * ---------------------------------------------------------------------------
 * @deprecated
 * Migrate to using EzHttpMediaType:
 *      import {
 *          // ... other enumeration classes ...
 *         EzHttpMediaType
*       } from '/ezlibrary/enums/EzEnumerations.js';
 *
 *      import { EzHttpMediaType } from '/ezlibrary/enums/EzHttpMediaType.js';
 */
export class EzMediaType extends EzEnumeration2 {
    /**
     * @private @field
     * Stores the singleton instance of this enumeration class.
     * @type {EzMediaType}
     */
    static #ezEnumerationSingleton = null;

    /**
     * @static
     * Static Initialization
     */
    static {
        if (null == EzMediaType.#ezEnumerationSingleton) {
            EzMediaType.#ezEnumerationSingleton = new EzMediaType(
                // Enum property names
                [
                    'UNKNOWN',
                    'APPLICATION_XHTML_XML',
                    'APPLICATION_XML',
                    'APPLICATION_JSON',
                    'APPLICATION_FORM_URLENCODED',
                    'APPLICATION_OCTET_STREAM',
                    'APPLICATION_PDF',
                    'APPLICATION_RSS_XML',
                    'APPLICATION_XALM_XML',
                    'APPLICATION_JAVASCRIPT',
                    'APPLICATION_OGG',
                    'AUDIO_ALL',
                    'AUDIO_WEBM',
                    'AUDIO_WAV',
                    'TEXT_HTML',
                    'TEXT_MARKDOWN',
                    'TEXT_PLAIN',
                    'TEXT_XML',
                    'TEXT_EVENT_STREAM',
                    'TEXT_CSS',
                    'IMAGE_ALL',
                    'IMAGE_SVG_XML',
                    'IMAGE_GIF',
                    'IMAGE_JPEG',
                    'IMAGE_PNG',
                    'IMAGE_WEBP',
                    'IMAGE_APNG',
                    'IMAGE_PJPEG',
                    'IMAGE_JXR',
                    'IMAGE_X_XBITMAP',
                    'IMAGE_AVIF',
                    'VIDEO_ALL',
                    'VIDEO_WEBM',
                    'VIDEO_OGG',
                    'MULTIPART_FORM_DATA'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                [
                    // 'UNKNOWN'
                    '*/*;q=0.8',
                    // 'APPLICATION_XHTML_XML'
                    'application/xhtml+xml',
                    // 'APPLICATION_XML'
                    'application/xhtml+xml',
                    // 'APPLICATION_JSON'
                    'application/json',
                    // 'APPLICATION_FORM_URLENCODED'
                    'application/x-www-form-urlencoded',
                    // 'APPLICATION_OCTET_STREAM'
                    'application/octet-stream',
                    // 'APPLICATION_PDF'
                    'application/pdf',
                    // 'APPLICATION_RSS_XML'
                    'application/rss+xml',
                    // 'APPLICATION_XALM_XML'
                    'application/xaml+xml',
                    // 'APPLICATION_JAVASCRIPT'
                    'application/javascript',
                    //'APPLICATION_OGG'
                    'application/ogg;q=0.7',
                    // 'AUDIO_ALL'
                    'audio/*;q=0.9',
                    // 'AUDIO_WEBM'
                    'audio/webm',
                    // 'AUDIO_WAV'
                    'audio/wav',
                    // 'TEXT_HTML'
                    'text/html',
                    // 'TEXT_MARKDOWN'
                    'text/markdown',
                    // 'TEXT_PLAIN'
                    'text/plain',
                    //'TEXT_XML',
                    'text/xml',
                    //'TEXT_EVENT_STREAM'
                    'text/event-stream',
                    // 'TEXT_CSS'
                    'text/css',
                    // 'IMAGE_ALL'
                    'image/*;q=0.8',
                    // 'IMAGE_SVG_XML'
                    'image/svg+xml',
                    // 'IMAGE_GIF'
                    'image/gif',
                    // 'IMAGE_JPEG'
                    'image/jpeg',
                    // 'IMAGE_PNG'
                    'image/png',
                    // 'IMAGE_WEBP'
                    'image/webp',
                    // 'IMAGE_APNG'
                    'image/apng',
                    // 'IMAGE_PJPEG'
                    'image/pjpeg',
                    // 'IMAGE_JXR'
                    'image/jxr',
                    // 'IMAGE_X_XBITMAP'
                    'image/x-xbitmap',
                    // 'IMAGE_AVIF'
                    'image/avif',
                    // 'VIDEO_ALL'
                    'video/*;q=0.8',
                    // 'VIDEO_WEBM'
                    'video/webm',
                    //'VIDEO_OGG'
                    'video/ogg',
                    // 'MULTIPART_FORM_DATA'
                    'multipart/form-data'
                ],
                // Optional array of additional data for eac enumeration property.
                // Enter null if not needed.
                null);
        }
    }

    /**
     * @static
     * @public @method @method
     * Builds a media type string from the provided mediaType and subType params.
     * @param {string} mediaType
     * @param {string} subType
     * @deprecated
     * Migrate to using EzHttpMediaType.ezOtherMediaType(mediaType, subType)
     */
    static ezOtherMediaType(mediaType, subType) {
        if (!EzString.hasLength(mediaType)) {
            throw new EzBadParamException(
                'mediaType',
                this,
                this.ezOtherMediaType);
        }
        if (!EzString.hasLength(subType)) {
            throw new EzBadParamException(
                'subType',
                this,
                this.ezOtherMediaType);
        }

        return `${mediaType}/${subType}`;
    }
}

/**
 * @class
 * @extends {EzClass}
 * @description
 * Provides HTTP AJAX support
 * ---------------------------------------------------------------------
 * Import with:
 *     import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
 * ---------------------------------------------------------------------
 * Check if ready:
 *     globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName] &&
 *     globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName].ready
 * ---------------------------------------------------------------------
 * Hook onReady event:
 *     document.addEventListener(
 *         EzHttpHelper.ezEventNames.onReady,
 *         {class-name}.#ezRegistrator);
 * ---------------------------------------------------------------------
 * Access singleton instance from outside this class:
 *     ezApi.ezclocker.ezHttpHelper
 * Access instance from within this class:
 *     EzHttpHelper.ezInstance
 * ---------------------------------------------------------------------
 */
export class EzHttpHelper extends EzClass {
    /**
     * @static
     * @public @method @readonly @property
     * Returns the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezHttpHelper';
    }

    /**
     * @static
     * @public @method @readonly @property
     * Returns the short-name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezShortApiName() {
        return 'http';
    }

    /**
     * @static
     * @public @method @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzHttpHelper_Ready'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzHttpHelper}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName])
        ? globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName]
        : null;
    /**
     * @static
     * @public @method @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzHttpHelper}
     */
    static get ezInstance() {
        return EzHttpHelper.#ezInstance;
    }
    /**
     * @static
     * @public @method @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzHttpHelper} instance
     */
    static set ezInstance(instance) {
        if (null != EzHttpHelper.#ezInstance) {
            throw new Error('EzHttpHelper\'s singleton instance is already reigstered with EzApi.');
        }

        EzHttpHelper.#ezInstance = instance;
    }

    /**
     * @static
     * @private @field
     * Stores the EzApi registration state for this class.
     * Default value is NULL
     * Class is registerd with EzApi when value is EzRegistrationState.REGISTERED
     * @type {string}
     * A valid enum property value from EzRegistrationState
     */
    static #ezApiRegistrationState = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName])
        ? EzRegistrationState.REGISTERED
        : null;
    /**
     * @static
     * @public @method @property @getter
     * Returns the ezApi registration state of this classes's singleton instance.
     * @returns {string}
     * A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzHttpHelper.#ezApiRegistrationState;
    }
    /**
     * @static
     * @public @method @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzHttpHelper.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @static
     * @private @readonly @property
     * Returns true when all required dependencies for this class report ready.
     * In otherwords, the require dependency's singleton instance is created
     * and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzHttpHelper.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready);
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzHttpHelper.ezInstance &&
            EzRegistrationState.REGISTERED === EzHttpHelper.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzHttpHelper.#ezCanRegister && !EzHttpHelper.#ezIsRegistered) {

            globalThis.ezApi.ezRegisterNewApi(
                EzHttpHelper,
                EzHttpHelper.ezApiName,
                null,
                [
                    EzHttpHelper.ezShortApiName
                ]);
        }

        return EzHttpHelper.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzHttpHelper.ezApiName
     *     2) Property getter EzHttpHelper.ezEventNames
     *     3) Property getter EzHttpHelper.ezInstance
     *     4) Property setter EzHttpHelper.ezInstance
     *     5) Property getter EzHttpHelper.ezApiRegistrationState
     *     6) Property setter EzHttpHelper.ezApiRegistrationState
     *     7) Property getter EzHttpHelper.#ezCanRegister
     *     8) Property getter EzHttpHelper.#ezIsRegistered
     *     9) Method EzHttpHelper.#ezRegistrator()
     */
    static {
        if (!EzHttpHelper.#ezIsRegistered) {
            EzHttpHelper.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzHttpHelper.#ezRegistrator()) {
                document.addEventListener(
                    EzHttpHelper.ezOnEzApiReadyEventName,
                    EzHttpHelper.#ezRegistrator);
            }
        }
    }

    /** @static @public @method */
    static HEADER_NAME_ACCEPT = 'Accept';
    /** @static @public @method */
    static HEADER_NAME_CONTENT_TYPE = 'Content-Type';
    /** @static @public @method */
    static NO_ADDITIONAL_DETAILS_ERROR_MESSAGE = 'No additional details available.';
    /** @static @public @method */
    static DEFAULT_SERVICE_ERROR_MESSAGE = 'Unable to communicate with the ezClocker server. Please try again later.';
    /** @static @public @method */
    static HEADER_NAME_X_EZCLOCKER_EMPLOYERID = 'x-ezclocker-employerid';
    /** @static @public @method */
    static HEADER_NAME_X_EZCLOCKER_AUTHTOKEN = 'x-ezclocker-authtoken';
    /** @static @public @method */
    static HEADER_NAME_X_EZCLOCKER_DEVELOPERTOKEN = 'x-ezclocker-developertoken';
    /** @static @public @method */
    static MEDIA_TYPE_APPLICATIONJSON = 'application/json';
    /** @static @public @method */
    static MEDIA_TYPE_APPLICATION_X_WWW_FORM_URLENCODED = 'application/x-www-form-urlencoded';

    /** @static @public @method */
    static get ezClockerHeaders() {
        return {
            authStatus: {
                name: 'x-ezclocker-auth-status',
                value: 'none'
            },
            environment: {
                name: 'x-ezclocker-environment',
                value: 'UNKNOWN'
            },
            userId: {
                name: 'x-ezclocker-userid',
                value: EzString.EMPTY
            },
            employerId: {
                name: 'x-ezclocker-employerid',
                value: EzString.EMPTY
            },
            employeeId: {
                name: 'x-ezclocker-employeeid',
                value: EzString.EMPTY
            },
            developerToken: {
                name: 'x-ezclocker-developertoken',
                value: EzString.EMPTY
            },
            authToken: {
                headerName: 'x-ezclocker-authtoken',
                value: EzString.EMPTY
            },
            mobile: {
                headerName: 'x-ezclocker-mobile',
                value: EzString.EMPTY
            },
            accessControlAllowOrigin: {
                headerName: 'Access-Control-Allow-Origin',
                value: window.location.origin
            }
        };
    }

    /**
     * @protected
     * Initializes EzHttpHelper
     */
    ezInit() {
        return EzHttpHelper.ezInstance;
    }

    /**
     * @public @method
     * Sends an internal error report from the website
     * @Param {string} event
     * @Param {string} details
     * @Param {string} source
     */
    ezSendInternalErrorFeedback(event, details, source) {
        return EzHttpHelper.ezInstance.ezPost(
            '/_api/v1/feedback/website-error',
            EzJson.toJson({
                event: event,
                details: details,
                instance: EzObject.isValid(ezApi.ezclocker.ezNavigation)
                    ? ezApi.ezclocker.ezNavigation.environment
                    : 'UNKNOWN',
                source: EzString.hasLength(source)
                    ? source
                    : 'WEBSITE'
            }),
            true,
            null,
            false);
    }

    /**
     * @public @method
     * Processes the response for errors and packages an error response if needed or returns the response as provided.
     * @param {object|null} response
     * @param {object|null} jqXHR
     * @param {string|null} url
     */
    ezProcessResponseStatus(response, jqXHR, url) {
        return EzPromise.promise(
            (resolve, reject) => {
                let statusCode = EzObject.isValid(jqXHR) && EzObject.isValid(jqXHR.status)
                    ? jqXHR.status
                    : 500;

                if (EzString.isString(response)) {
                    response = {
                        jqXHR: EzJson.toJson(jqXHR),
                        errorCode: statusCode,
                        message: response
                    };
                } else {
                    response = EzObject.isValid(response)
                        ? response
                        : {
                            errorCode: 500,
                            message: 'An unexpected error occurred while executing an HTTP request.'
                        };

                    response.errorCode = EzObject.isValid(response.errorCode)
                        ? response.errorCode
                        : 500;

                    response.message = EzObject.isValid(response.message)
                        ? response.message
                        : 'An unexpected error occurred while executing an HTTP request.';
                }

                url = EzString.hasLength(url)
                    ? url
                    : EzString.EMPTY;

                let em = EzString.stringOrDefault(
                    response.message,
                    `Service Error ${statusCode}`);

                let errorCode = EzNumber.numberOrDefault(
                    response.errorCode,
                    500);

                if (statusCode >= 400 && statusCode < 500) {
                    switch (statusCode) {
                        case 400: // bad request
                        case 409:
                            if (EzObject.isValid(response) && EzObject.isValid(response.errorCode)) {
                                return reject(response, jqXHR);
                            } else if (EzObject.isValid(response)) {
                                response.errorCode = statusCode;
                                return reject(response, jqXHR);
                            }

                            return reject(
                                {
                                    jqXHR: EzJson.toJson(jqXHR),
                                    errorCode: errorCode,
                                    message: EzJson.toJson(response)
                                },
                                jqXHR);
                        // Auto handle authentication issues
                        case 401: // unauthorized
                        case 403: // forbidden
                            if (EzObject.isValid(ezApi.ezclocker.ezDialog)) {
                                return ezApi.ezclocker.ezDialog.ezShowSessionExpiredDialog()
                                    .then(
                                        () => reject(response));
                            }

                            ezApi.ezclocker.ezLogger.error('Authentication session is expired.');

                            return EzObject.isValid(ezApi.ezclocker.ezNavigation) &&
                                ezApi.ezclocker.ezNavigation.ready
                                ? reject(ezApi.ezclocker.ezNavigation.ezSignOut())
                                : reject(response, jqXHR);
                        case 404:
                            return reject(response, jqXHR);
                        case 407: // proxy auth required
                        case 408: // Request timeout
                        case 418: // I'm a teapot
                        case 421: // Misdirected request
                        case 422: // Unprocessable entity
                        case 423: // Locked
                        case 424: // Failed dependency
                        case 426: // Upgrade required
                        case 428: // Precondition required
                        case 429: // Too many requests
                        case 431: // Request header fields too large
                            em += ': EzClocker is unable to communicate to the cloud services at this time.';
                            EzHttpHelper.ezInstance.ezSendInternalErrorFeedback(url, em + EzJson.toJson(response, 3));

                            return reject(
                                {
                                    jqXHR: EzJson.toJson(jqXHR),
                                    errorCode: errorCode,
                                    message: em
                                },
                                jqXHR);
                        case 451: // Unavailable for legal reasons
                            EzHttpHelper.ezInstance.ezSendInternalErrorFeedback(url, EzJson.toJson(response, 3));

                            return reject(
                                {
                                    jqXHR: EzJson.toJson(jqXHR),
                                    errorCode: errorCode,
                                    message: 'Acting under a service legal block order.'
                                },
                                jqXHR);
                        default:
                            EzHttpHelper.ezInstance.ezSendInternalErrorFeedback(url, EzJson.toJson(response, 3));

                            return reject(
                                {
                                    jqXHR: EzJson.toJson(jqXHR),
                                    errorCode: errorCode,
                                    message: em
                                },
                                jqXHR);
                    }
                } else if (statusCode >= 500) {
                    EzHttpHelper.ezInstance.ezSendInternalErrorFeedback(
                        url,
                        EzJson.toJson(response, 3));

                    return reject(
                        {
                            jqXHR: EzJson.toJson(jqXHR),
                            errorCode: errorCode,
                            message: em
                        },
                        jqXHR);
                }

                return resolve(response, jqXHR);
            });
    }

    /**
     * @public @method @method
     * Determines the rawResponse object properties from the provided jqXHR
     * @param {undefined|null|object} jqXHR
     * @returns {EzRawHttpResponse}
     */
    ezDetermineRawResponse(jqXHR) {
        return new EzRawHttpResponse(jqXHR);
    }

    /**
     * @public @method @method
     * Determines the response error code from the provided eResponse and/or jqXHR
     * @param {undefined|null|object} eResponse
     * @param {undefined|null|object} jqXHR
     * @returns {number}
     */
    ezDetermineResponseErrorCode(eResponse, jqXHR) {
        if (EzObject.isValid(eResponse)) {
            if (EzNumber.isNumber(eResponse.errorCode)) {
                return 200 <= eResponse.errorCode && 299 >= eResponse.errorCode
                    // Set error code to a generic 5000 + actual errorCode if coming in as a 200 'status'
                    ? eResponse.errorCode = 5000 + eResponse.errorCode
                    : eResponse.errorCode;
            }
            if (EzObject.isValid(eResponse.errorCode)) {
                return EzNumber.asNumberOrDefault(EzNumber.eResponse.errorCode, 500);
            }
        }

        if (EzObject.isValid(jqXHR) && EzObject.isValid(jqXHR.status)) {
            return errorCode = jqXHR.status;
        }

        if (EzString.hasLength(jqXHR.statusText)) {
            if ('success' === jqXHR.statusText) {
                return 0;
            }
            if ('error' === jqXHR.statusText) {
                return 500;
            }
        }

        return 500;
    }

    /**
     * @public @method @method
     * Determines the error message from the provided eResponse and/or jqXHR
     * @param {undefined|null|object} eResponse
     * @param {undefined|null|object} jqXHR
     * @returns {string}
     */
    ezDetermineResponseErrorMessage(eResponse, jqXHR) {
        if (EzObject.isValid(eResponse)) {
            if (EzString.hasLength(eResponse.message)) {
                return EzString.em`${eResponse.message}`;
            }
        }

        if (EzObject.isValid(jqXHR)) {
            if (EzString.hasLength(jqXHR.responseText)) {
                return EzString.em`${jqXHR.responseText}`;
            }
            if (EzObject.isValid(jqXHR.responseJson)) {
                return EzString.em`${jqXHR.responseJson}`;
            }
            if (EzObject.isValid(jqXHR.status)) {
                return EzString.em`Error status ${jqXHR.status}`;
            }
        }

        return '(not provided)';
    }

    /**
     * @public @method @method
     * Processes an API response:
     *  1) Returns the response in Promise.resolve if it is determined to be a success response
     *  2) Returns the response in Promise.reject if it is determined to be a failure response
     * @param {undefined|null|string|object} response
     * @param {undefined|null|string} jqXHR
     * @returns {Promise}
     */
    ezProcessApiResponse(response, jqXHR, optionalEndpoint) {
        if (!EzObject.isValid(jqXHR)) {
            throw new EzBadParamException(jqXHR);
        }

        let isSuccessStatus = 200 <= jqXHR && 300 > jqXHR.status;

        if (EzObject.isValid(response)) {
            if (!EzString.isString(response)) {

                if (!EzObject.hasProperty(response, 'errorCode')) {
                    response.errorCode = EzBoolean.isTrue(isSuccessStatus)
                        ? 0
                        : jqXHR.status;
                }

                if (!EzObject.hasProperty(response.message)) {
                    response.message = EzBoolean.isTrue(isSuccessStatus)
                        ? 'Success'
                        : 'Failed';
                }

                return 0 == response.errorCode
                    ? EzHttpHelper.ezInstance.ezProcessApiResolve(
                        response,
                        jqXHR,
                        optionalEndpoint)
                    : EzHttpHelper.ezInstance.ezProcessApiReject(
                        response,
                        jqXHR,
                        optionalEndpoint);
            }

            let responseWrapper = {
                errorCode: 200 <= EzBoolean.isTrue(isSuccessStatus)
                    ? 0
                    : jqXHR.status,
                message: response
            }

            return 0 == responseWrapper.errorCode
                ? EzHttpHelper.ezInstance.ezProcessApiResolve(
                    responseWrapper,
                    jqXHR,
                    optionalEndpoint)
                : EzHttpHelper.ezInstance.ezProcessApiReject(
                    responseWrapper,
                    jqXHR,
                    optionalEndpoint);
        }

        let responseWrapper = {
            errorCode: 200 <= EzBoolean.isTrue(isSuccessStatus)
                ? 0
                : jqXHR.status,
            message: 200 <= EzBoolean.isTrue(isSuccessStatus)
                ? 'Success'
                : 'Failed'
        };

        return 0 == responseWrapper.errorCode
            ? EzHttpHelper.ezInstance.ezProcessApiResolve(
                responseWrapper,
                jqXHR,
                optionalEndpoint)
            : EzHttpHelper.ezInstance.ezProcessApiReject(
                onseWrapper,
                jqXHR,
                onalEndpoint);
    }

    /**
     * @public @method @method
     * Evaluates the response:
     *  1) If the response is undefined or null, then calls ezApi.ezclocker.ezHttpHelper.ezProccessApiReject passing the provided
     *     response, jqXHR, and optionalEndpoint to report an error.
     *  2) If the response.errorCode is not zero, then calls ezApi.ezclocker.ezHttpHelper.ezProccessApiReject passing the provided
     *     response, jqXHR, and optionalEndpoint to report an error.
     *  3) Otherwise, Promise.resolve is called passing the provided response and jqXHR.
     * @param {undefined|null|object} eResponse
     * @param {undefined|null|object} jqXHR
     * @param {undefined|null|string} optionalEndpoint
     * If provided, the adds the endpoint property to the response equal to the provided optionalEndpoint.
     * @returns {Promise.resolve}
     */
    ezProcessApiResolve(
        response = null,
        jqXHR = null,
        optionalEndpoint = EzString.EMPTY) {
        if (!EzString.hasLength(optionalEndpoint)) {
            optionalEndpoint = EzString.EMPTY;
        }

        if (EzObject.isValid(response)) {
            if (!EzString.isString(response)) {
                response.endpoint = optionalEndpoint;

                if (!EzObject.hasOwnProperty(response, 'errorCode')) {
                    response.errorCode = 0;
                }

                if (!EzObject.hasOwnProperty(response, 'message')) {
                    response.message = 'Success';
                }

                return EzPromise.resolve(
                    response,
                    jqXHR);
            }

            return EzPromise.resolve(
                {
                    errorCode: 0,
                    message: response,
                    endpoint: optionalEndpoint,
                    rawResponse: response
                },
                jqXHR);
        }

        return EzPromise.resolve(
            {
                errorCode: 0,
                message: 'Success',
                endpoint: optionalEndpoint,
                rawResponse: response
            },
            jqXHR);
    }

    /**
     * @public @method @method
     * Assumes the response is an error response. Then processes as follows:
     *  1) If eResponse is undefined or null then an eResponse object is created.
     *  2) If jqXHR is not undefined or null then a rawResponse object is created with template:
     *      {
     *          responseStatus: jqXHR.status,
     *          responseStatus: qXHR.statusText,
     *          responseJson: jqXHR.responseJson,
     *          responseText: jqXHR.responseText,
     *          jqXHR: jqXHR
     *      }
     *  3) If jqXHR is undefined or null, then a rawResponse object is created with template:
     *      {
     *          responseStatus: ${errorCode.toString()}
     *          responseStatusText: ${errorCode.toString()}
     *          responseJson: {}
     *          responseText: '(not available)'
     *          jqXHR: null
     *      }
     * Processes an API service call reject and forwards it to the reject promise response.
     * @param {undefined|null|object} eResponse
     * @param {undefined|null|object} jqXHR
     * @param {undefined|null|string} optionalEndpoint
     * @returns {Promise.reject}
     */
    ezProcessApiReject(
        eResponse = null,
        jqXHR = null,
        optionalEndpoint = EzString.EMPTY) {
        if (!EzString.hasLength(optionalEndpoint)) {
            optionalEndpoint = EzString.EMPTY;
        }

        if (EzObject.isValid(eResponse)) {
            if (!EzString.isString(eResponse)) {
                eResponse.endpoint = optionalEndpoint;

                if (!EzObject.hasProperty(eResponse, 'errorCode')) {
                    eResponse.errorCode = 500;
                }

                if (!EzObject.hasProperty(eResponse, 'message') || !EzString.hasLength(eResponse.message)) {
                    eResponse.message = EzHttpHelper.ezInstance.ezDetermineResponseErrorMessage(eResponse, jqXHR);
                }

                return EzPromise.reject(
                    eResponse,
                    jqXHR)
            }

            return EzPromise.reject(
                {
                    errorCode: 500,
                    message: eResponse,
                    rawResponse: EzHttpHelper.ezInstance.ezDetermineRawResponse(jqXHR),
                    endpoint: optionalEndpoint
                },
                jqXHR);
        }

        return EzPromise.reject(
            {
                errorCode: EzObject.isValid(jqXHR)
                    ? jqXHR.status
                    : 500,
                message: 'Failed',
                endpoint: optionalEndpoint,
            },
            jqXHR);
    }

    /**
     * @public @method @method
     * Creates an error response object from the provided parameter data.
     * @param {undefined|null|jqXHR|object} jqXHR
     * @param {undefined|null|string} textStatus
     * @param {undefined|null|string} errorThrown
     * @param {undefined|null|string} optionalDefaultErrorMessage
     * @param {undefined|null|string} optionalRequestUrl
     * @param {undefined|null|string} optionalRequestMethod
     * @returns {object}
     * Returns a valid eResponse instance
     */
    ezExtractErrorResponseFromJqXHR(
        jqXHR = null,
        textStatus = null,
        errorThrown = null,
        optionalDefaultErrorMessage = null,
        optionalRequestUrl = null,
        optionalRequestMethod = null) {

        let defaultErrorResponse = EzHttpHelper.ezInstance.ezCreateDefaultErrorResponse(
            jqXHR,
            textStatus,
            errorThrown,
            optionalDefaultErrorMessage,
            optionalRequestUrl,
            optionalRequestMethod);

        if (EzObject.isValid(jqXHR)) {
            let eResponse = EzHttpHelper.ezInstance.ezExtractErrorFromResponseJSON(defaultErrorResponse, jqXHR);

            if (null != eResponse) {
                return eResponse;
            }

            eResponse = EzHttpHelper.ezInstance.ezExtractErrorFromResponseText(defaultErrorResponse, jqXHR);

            if (null != eResponse) {
                return eResponse;
            }

            eResponse = ezExtractErrorFromResponseXML(defaultErrorResponse, jqXHR);

            if (null != eResponse) {
                return eResponse;
            }
        }

        return defaultErrorResponse;
    }

    /**
     * @public @method @method
     * Creates a default error response from the provided parameter data.
     * @param {undefined|null|jqXHR} jqXHR
     * @param {undefined|null|string} textStatus
     * @param {undefined|null|string} errorThrown
     * @param {undefined|null|string} optionalDefaultErrorMessage
     * @param {undefined|null|string} optionalRequestUrl
     * @param {undefined|null|string} optionalRequestMethod
     * @returns {object}
     * A valid error response object.
     */
    ezCreateDefaultErrorResponse(
        jqXHR = null,
        textStatus = null,
        errorThrown = null,
        optionalDefaultErrorMessage = null,
        optionalRequestUrl = null,
        optionalRequestMethod = null) {

        const NONE_PROVIDED = '(none provided)';

        if (!EzString.hasLength(textStatus)) {
            textStatus = NONE_PROVIDED;
        }

        if (!EzString.hasLength(errorThrown)) {
            errorThrown = NONE_PROVIDED;
        }

        if (!EzString.hasLength(optionalDefaultErrorMessage)) {
            optionalDefaultErrorMessage = null;
        }

        if (!EzString.hasLength(optionalRequestUrl)) {
            optionalRequestUrl = null;
        }

        optionalRequestMethod = EzString.hasLength(optionalRequestMethod)
            ? optionalRequestMethod.toUpperCase()
            : null;

        const ERROR_MSG_PREFIX = 'Encountered an unexpected error while processing an ezClocker HTTP response: ';

        let defaultErrorThrown = EzString.hasLength(errorThrown)
            ? errorThrown
            : EzString.EMPTY;

        let defaultTextStatus = EzString.hasLength(textStatus)
            ? `(${textStatus})`
            : EzString.EMPTY;

        let defaultErrorMessage = EzString.hasLength(optionalDefaultErrorMessage)
            ? EzString.em`
                ${ERROR_MSG_PREFIX}
                ${optionalDefaultErrorMessage.trim()}`
            : EzString.em`
                ${ERROR_MSG_PREFIX}
                ${defaultErrorThrown}
                ${defaultTextStatus}`;

        let defaultErrorResponse = EzObject.isValid(jqXHR)
            ? {
                errorCode: jqXHR.status,
                message: EzString.em`
                    ${defaultErrorMessage}
                    (${jqXHR.status})`
            }
            : {
                errorCode: 500,
                message: EzString.em`
                    ${defaultErrorMessage}
                    Unable to extract the actual error response due to an undefined or null jqXHR instance.
                    (500)`
            };

        return EzHttpHelper.ezInstance.ezAddErrorResponseDetails(
            defaultErrorResponse,
            jqXHR,
            textStatus,
            errorThrown,
            optionalDefaultErrorMessage,
            optionalRequestUrl,
            optionalRequestMethod);
    }

    /**
     * @public @method @method
     * Adds error response details to an error response
     * @param {object} eResponse
     * @param {undefined|null|jqXHR} jqXHR
     * @param {undefined|null|string} textStatus
     * @param {undefined|null|string} errorThrown
     * @param {undefined|null|string} optionalDefaultErrorMessage
     * @param {undefined|null|string} optionalRequestUrl
     * @param {undefined|null|string} optionalRequestMethod
     * @returns {object}
     * The provided eResponse with errorDetails property added.
     */
    ezAddErrorResponseDetails(eResponse, jqXHR = null, textStatus = null, errorThrown = null, optionalDefaultErrorMessage = null, optionalRequestUrl = null,
        optionalRequestMethod = null) {
        if (!EzObject.isValid(eResponse)) {
            throw new EzBadParamException(
                'eResponse',
                EzHttpHelper.ezInstance,
                EzHttpHelper.ezInstance.ezAddErrorDetailsFromJqXHR);
        }

        const NONE_PROVIDED = '(none provided)';

        eResponse.errorDetails = {
            jqXHR: EzObject.isValid(jqXHR)
                ? {
                    status: jqXHR.status,
                    statusText: jqXHR.statusText,
                    responseJSON: EzObject.hasProperty(jqXHR, 'responseJSON')
                        // Always translate the responseJSON object into a JSON string to avoid
                        // circular serialization issues.
                        ? EzJson.toJson(jqXHR.responseJSON)
                        : null,
                    responseText: EzObject.hasProperty(jqXHR, 'responseText')
                        ? EzObject.assignOrNull(jqXHR.responseText)
                        : null,
                    responseXML: EzObject.hasProperty(jqXHR, 'statusText')
                        ? EzObject.assignOrNull(jqXHR.responseXML)
                        : null
                }
                : {
                    status: 500,
                    statusText: 'Internal server error (with jqXHR undefined or null)',
                    responseJSON: null,
                    responseText: null,
                    responseXML: null
                },
            textStatus: EzString.stringOrDefault(
                textStatus,
                NONE_PROVIDED),
            errorThrown: EzString.stringOrDefault(
                errorThrown,
                NONE_PROVIDED),
            errorMessage: EzString.stringOrDefault(
                optionalDefaultErrorMessage,
                NONE_PROVIDED),
            requestMethod: EzString.stringOrDefault(
                optionalRequestMethod,
                NONE_PROVIDED),
            requestUrl: EzString.stringOrDefault(
                optionalRequestUrl,
                NONE_PROVIDED)
        };

        return eResponse;
    }

    /**
     * @public @method @method
     * Extracts an error response from the jqXHR.responseXML value.
     * @param {object} defaultErrorResponse
     * A valid default error response object
     * @param {undefined|null|object} jqXHR
     * @returns {null|object}
     * Returns null if the provided jqXHR instance is null.
     * Otehrwise, returns the provided defaultErrorResponse with an additional entity property that contains the jqXHR.responseXML
     */
    ezExtractErrorFromResponseXML(defaultErrorResponse, jqXHR) {
        if (!EzObject.isValid(defaultErrorResponse)) {
            throw new EzBadParamException(
                'defaultErrorResponse',
                EzHttpHelper.ezInstance,
                EzHttpHelper.ezInstance.ezExtractErrorFromResponseJSON);
        }

        if (!EzObject.hasProperty(jqXHR, 'responseXML')) {
            // Do not return a response object
            return null;
        }

        defaultErrorResponse.entity = EzObject.assignOrNull(jqXHR.responseXML);

        return defaultErrorResponse;
    }

    /**
     * @public @method @method
     * Extracts an error response from the jqXHR.responseText value.
     * @param {object} defaultErrorResponse
     * A valid default error response object
     * @param {undefined|null|object} jqXHR
     * @returns {null|object}
     * Returns null if the provided jqXHR instance is null.
     * Otherwise, returns the defaultErrorResponse enhanced with the the extracted error response from the jqXHR.responseText value.
     */
    ezExtractErrorFromResponseText(defaultErrorResponse, jqXHR) {
        if (!EzObject.isValid(defaultErrorResponse)) {
            throw new EzBadParamException(
                'defaultErrorResponse',
                EzHttpHelper.ezInstance,
                EzHttpHelper.ezInstance.ezExtractErrorFromResponseJSON);
        }

        if (!EzObject.hasProperty(jqXHR, 'responseText')) {
            // Do not return a response object
            return null;
        }

        try {
            let errorResponseFromResponseText = EzString.hasLength(jqXHR.responseText)
                ? EzJson.fromJson(jqXHR.responseText)
                : jqXHR.responseText;

            if (EzString.isString(errorResponseFromResponseText)) {
                defaultErrorResponse.entity = errorResponseFromResponseText;

                return defaultErrorResponse;
            }

            // Response did serialized to a JSON object
            if (!EzObject.hasProperty(errorResponseFromResponseText, 'errorCode') || !EzObject.isValid(errorResponseFromResponseText.errorCode)) {
                errorResponseFromResponseText.errorCode = defaultErrorResponse.errorCode;
            }

            if (!EzObject.hasProperty(defaultErrorResponse, 'message') ||
                !EzString.isString(errorResponseFromResponseText.message) ||
                0 == errorResponseFromResponseText.message.length) {
                errorResponseFromResponseText.message = defaultErrorResponse.message;
            }

            errorResponseFromResponseText.errorDetails = defaultErrorResponse.errorDetails;

            return errorResponseFromResponseText;
        } catch (err) {
            defaultErrorResponse.entity = {
                serializationError: err.message,
                responseText: jqXHR.responseText,
                responseXML: EzObject.hasProperty(jqXHR, 'responseXML')
                    ? EzObject.assignOrNull(jqXHR.responseXML)
                    : null
            };
        }

        return defaultErrorResponse;
    }

    /**
     * @public @method @method
     * Extracts an error response from the jqXHR.responseJSON value.
     * @param {object} defaultErrorResponse
     * A valid default error response object
     * @param {undefined|null|object} jqXHR
     * @returns {null|object}
     * Returns null if the provided jqXHR instance is null.
     * Otherwise, returns the jqXHR.responseText object enhanced with missing default properties from the defaultErrorResponse.
     */
    ezExtractErrorFromResponseJSON(defaultErrorResponse, jqXHR) {
        if (!EzObject.isValid(defaultErrorResponse)) {
            throw new EzBadParamException(
                'defaultErrorResponse',
                EzHttpHelper.ezInstance,
                EzHttpHelper.ezInstance.ezExtractErrorFromResponseJSON);
        }

        if (!EzObject.hasProperty(jqXHR, 'responseJSON')) {
            // Do not return a response object
            return null;
        }

        /*
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            ENGINEERING NOTES
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            The jqXHR.responseJSON is already a Javascript object
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        */

        let eResponseFromResponseJson = jqXHR.responseJSON;

        if (!EzObject.hasProperty(eResponseFromResponseJson, 'errorCode') || !EzObject.isValid(eResponseFromResponseJson.errorCode)) {
            // Otherwise, build a valid ezClocker API response and set the eResponse as the entity property.
            eResponseFromResponseJson.errorCode = defaultErrorResponse.errorCode;
        }

        if (!EzObject.hasProperty(eResponseFromResponseJson, 'message') || !EzObject.isValid(eResponseFromResponseJson.message) ||
            ('string' === typeof eResponseFromResponseJson && 0 == eResponseFromResponseJson.length)) {
            eResponseFromResponseJson.message = defaultErrorResponse.message;
        }

        eResponseFromResponseJson.errorDetails = defaultErrorResponse.errorDetails;

        return eResponseFromResponseJson;
    }

    /**
     * @public @method
     * Basic implementation of the HTTP request
     * @param {string|null} method
     * @param {string} url
     * @param {string|null} payload
     * @param {function|null} success
     * @param {function|null} failure
     * @param {boolean|null} async
     * @param {function|null} beforeHandler
     * @param {boolean|null} autoHandleStatus
     * @returns {Promise}
     */
    ezSendRequest(method, url, payload, async, beforeHandler, autoHandleStatus) {
        autoHandleStatus = EzBoolean.booleanOrTrue(autoHandleStatus);

        let eResponse = {
            errorCode: 500,
            message: `Error executing ${method} HTTP request for url: ${url}`
        };

        return EzPromise.promise(
            (resolve, reject) => {
                try {
                    $.ajax({
                        type: !EzString.hasLength(method) ||
                            method !== 'GET' &&
                            EzHttpRequestMethod.POST !== method &&
                            EzHttpRequestMethod.PUT !== method &&
                            EzHttpRequestMethod.DELETE !== method
                            ? 'GET'
                            : method,
                        url: url,
                        data: payload,
                        async: EzBoolean.booleanOrTrue(async),
                        cache: false,
                        beforeSend: (jqXHR) => EzHttpHelper.ezInstance.ezHandleSendRequestBeforeSend(jqXHR, beforeHandler),
                        // Note: The status param will have 'success' or 'error' - not the status code.
                        success: (response, status = null, jqXHR = null) => {
                            EzHttpHelper.ezInstance.ezSaveEzClockerHeaders(jqXHR);

                            if (EzObject.isValid(response) &&
                                !EzString.isString(response) &&
                                EzString.isString(response.message) &&
                                EzNumber.isNumber(response.errorCode)) {
                                response.jqXHR = jqXHR;

                                response.status = status;

                                return resolve(response);
                            }

                            if (EzObject.isValid(response.errorCode)) {
                                response.status = jqXHR.status;
                            }

                            if (autoHandleStatus && !EzString.isString(response)) {
                                if (response && response.jqXHR) {
                                    response.jqXHR = jqXHR;

                                    return EzHttpHelper.ezInstance.ezProcessResponseStatus(response, jqXHR, url)
                                        .then(resolve, reject);
                                } else {
                                    return resolve(response, jqXHR);
                                }

                            }

                            if (!EzString.isString(response)) {
                                response.jqXHR = jqXHR;
                            }

                            return resolve(response, jqXHR);
                        },
                        error: (jqXHR, textStatus, errorThrown) => {
                            EzHttpHelper.ezInstance.ezSaveEzClockerHeaders(jqXHR);

                            eResponse = EzHttpHelper.ezInstance.ezExtractErrorResponseFromJqXHR(
                                jqXHR,
                                textStatus,
                                errorThrown,
                                null,
                                url,
                                method);

                            if (EzObject.isValid(eResponse) && !EzString.isString(eResponse) && EzString.isString(eResponse.message) &&
                                EzNumber.isNumber(eResponse.errorCode)) {
                                eResponse.jqXHR = EzJson.toJson(jqXHR);

                                eResponse.status = jqXHR.status;

                                return reject(eResponse);
                            }

                            if (autoHandleStatus) {
                                eResponse.jqXHR = jqXHR;

                                return EzHttpHelper.ezInstance.ezProcessResponseStatus(
                                    eResponse,
                                    jqXHR,
                                    url)
                                    .then(resolve, reject);
                            }

                            if (!EzObject.isValid(eResponse) || !EzObject.hasProperty(eResponse, 'errorCode')) {
                                eResponse = {
                                    jqXHR: EzJson.toJson(jqXHR),
                                    errorCode: jqXHR.status,
                                    message: eResponse
                                };
                            } else {
                                eResponse.jqXHR = EzJson.toJson(jqXHR);
                            }

                            return reject(eResponse, jqXHR);
                        },
                        // complete: (jqXHR, textStatus) => { },
                        /*
                        statusCode: {
                            400: () => {

                            },
                            401: () => {

                            },
                            500: () => {

                            },
                        }
                        */
                    });
                } catch (err) {
                    let em = EzString.em`
                        EzHttpHelper.ezSendRawRequest:
                        Error code=${EzNumber.numberOrDefault(error.errorCode, 500)}
                        Message=${EzString.stringOrDefault(error.message, 'No error message provided')}`;

                    EzHttpHelper.ezInstance.ezSendInternalErrorFeedback(
                        'EzHttpHelper.ezSendRawRequest',
                        em);

                    ezApi.ezclocker.ezLogger.error(em);

                    eResponse = {
                        errorCode: 500,
                        message: em
                    };

                    return reject(eResponse);
                }
            });
    }

    /**
     * @public @method
     * Handles bad request stuatws 400
     * @param {object} jqXHR
     * @param {string} textStatus
     * @param {object} errorThrown
     * @param {undefined|null|string} optionalRequestUrl
     * @param {undefined|null|string} optionalMethod
     */
    ezHandleSendRequestStatus400(jqXHR, textStatus, errorThrown, optionalRequestUrl = EzString.EMPTY, optionalMethod = EzString.EMPTY) {
        return EzHttpHelper.ezHandleSendRequestStatusResponse(
            jqXHR,
            textStatus,
            errorThrown,
            'EzClocker detected the requested action was incorrectly formatted (Bad Request). Please contact ezClocker support for assistance.',
            optionalRequestUrl,
            optionalMethod);
    }

    /**
     * @public @method
     * Handles bad request stuatws 401
     * @param {object} jqXHR
     * @param {string} textStatus
     * @param {object} errorThrown
     * @param {undefined|null|string} optionalRequestUrl
     * @param {undefined|null|string} optionalMethod
     */
    ezHandleSendRequestStatus401(jqXHR, textStatus, errorThrown, optionalRequestUrl = EzString.EMPTY, optionalMethod = EzString.EMPTY) {
        return EzHttpHelper.ezHandleSendRequestStatusResponse(
            jqXHR,
            textStatus,
            errorThrown,
            'Your sign-in session is expired or not available at this time. Please sign (or re-sign) into ezClocker.',
            optionalRequestUrl,
            optionalMethod);
    }

    /**
     * @public @method
     * Handles bad request status 403
     * @param {object} jqXHR
     * @param {string} textStatus
     * @param {object} errorThrown
     * @param {undefined|null|string} optionalRequestUrl
     * @param {undefined|null|string} optionalMethod
     */
    ezHandleSendRequestStatus403(jqXHR, textStatus, errorThrown, optionalRequestUrl = EzString.EMPTY, optionalMethod = EzString.EMPTY) {
        return EzHttpHelper.ezHandleSendRequestStatusResponse(
            jqXHR,
            textStatus,
            errorThrown,
            'Access to the resource was denied by ezClocker\'s services. Verify you have signed into ezClocker using the correct account.',
            optionalRequestUrl,
            optionalMethod);
    }

    /**
     * @public @method
     * Handles bad request status 404
     * @param {object} jqXHR
     * @param {string} textStatus
     * @param {object} errorThrown
     * @param {undefined|null|string} optionalRequestUrl
     * @param {undefined|null|string} optionalMethod
     */
    ezHandleSendRequestStatus404(jqXHR, textStatus, errorThrown, optionalRequestUrl = EzString.EMPTY, optionalMethod = EzString.EMPTY) {
        return EzHttpHelper.ezHandleSendRequestStatusResponse(
            jqXHR,
            textStatus,
            errorThrown,
            'EzClocker is unable to communicate to the cloud services at this time (received resource not found error).',
            optionalRequestUrl,
            optionalMethod);
    }

    /**
     * @public @method
     * Handles bad request status 408
     * @param {object} jqXHR
     * @param {string} textStatus
     * @param {object} errorThrown
     * @param {undefined|null|string} optionalRequestUrl
     * @param {undefined|null|string} optionalMethod
     */
    ezHandleSendRequestStatus408(jqXHR, textStatus, errorThrown, optionalRequestUrl = EzString.EMPTY, optionalMethod = EzString.EMPTY) {
        return EzHttpHelper.ezHandleSendRequestStatusResponse(
            jqXHR,
            textStatus,
            errorThrown,
            'EzClocker is unable to communicate to the cloud services at this time (received a request timeout).',
            optionalRequestUrl,
            optionalMethod);
    }

    /**
     * @public @method
     * Handles bad request status 409
     * @param {object} jqXHR
     * @param {string} textStatus
     * @param {object} errorThrown
     * @param {undefined|null|string} optionalRequestUrl
     * @param {undefined|null|string} optionalMethod
     */
    ezHandleSendRequestStatus409(jqXHR, textStatus, errorThrown, optionalRequestUrl = EzString.EMPTY, optionalMethod = EzString.EMPTY) {
        return EzHttpHelper.ezHandleSendRequestStatusResponse(
            jqXHR,
            textStatus,
            errorThrown,
            'EzClocker is unable to communicate to the cloud services at this time (received too many requests error response).',
            optionalRequestUrl,
            optionalMethod);
    }

    /**
     * @public @method
     * Handles bad request status 429
     * @param {object} jqXHR
     * @param {string} textStatus
     * @param {object} errorThrown
     * @param {undefined|null|string} optionalRequestUrl
     * @param {undefined|null|string} optionalMethod
     */
    ezHandleSendRequestStatus429(jqXHR, textStatus, errorThrown, optionalRequestUrl = EzString.EMPTY, optionalMethod = EzString.EMPTY) {
        return EzHttpHelper.ezHandleSendRequestStatusResponse(
            jqXHR,
            textStatus,
            errorThrown,
            'EzClocker is unable to communicate to the cloud services at this time (HttpStatus 429: received too many requests error response).',
            optionalRequestUrl,
            optionalMethod);
    }

    /**
     * @public @method
     * Handles bad request status 431
     * @param {object} jqXHR
     * @param {string} textStatus
     * @param {object} errorThrown
     * @param {undefined|null|string} optionalRequestUrl
     * @param {undefined|null|string} optionalMethod
     */
    ezHandleSendRequestStatus431(jqXHR, textStatus, errorThrown, optionalRequestUrl = EzString.EMPTY, optionalMethod = EzString.EMPTY) {
        return EzHttpHelper.ezHandleSendRequestStatusResponse(
            jqXHR,
            textStatus,
            errorThrown,
            'EzClocker is unable to communicate to the cloud services at this time.',
            optionalRequestUrl,
            optionalMethod);
    }

    /**
     * @public @method
     * Handles bad request status 451
     * @param {object} jqXHR
     * @param {string} textStatus
     * @param {object} errorThrown
     * @param {undefined|null|string} optionalRequestUrl
     * @param {undefined|null|string} optionalMethod
     */
    ezHandleSendRequestStatus451(jqXHR, textStatus, errorThrown, optionalRequestUrl = EzString.EMPTY, optionalMethod = EzString.EMPTY) {
        return EzHttpHelper.ezHandleSendRequestStatusResponse(
            jqXHR,
            textStatus,
            errorThrown,
            'Acting under a service legal block order.',
            optionalRequestUrl,
            optionalMethod);
    }

    /**
     * @public @method
     * Handles a send request response
     * @param {object} jqXHR
     * @param {string} textStatus
     * @param {object} errorThrown
     * @param {undefined|null|string} optionalErrorMessage
     * @param {undefined|null|string} optionalRequestUrl
     * @param {undefined|null|string} optionalMethod
     */
    ezHandleSendRequestStatusResponse(jqXHR, textStatus, errorThrown, optionalErrorMessage = EzString.EMPTY, optionalRequestUrl = EzString.EMPTY,
        optionalMethod = EzString.EMPTY) {
        let eResponse = EzHttpHelper.ezInstance.ezExtractErrorResponseFromJqXHR(
            jqXHR,
            textStatus,
            errorThrown,
            EzString.stringOrNull(optionalErrorMessage),
            optionalRequestUrl,
            optionalMethod);

        EzHttpHelper.ezInstance.ezSendInternalErrorFeedback(
            EzString.stringOrDefault(
                EzString.msg`
                    ${EzString.hasLength(optionalMethod) ? optionalMethod + ': ' : EzString.EMPTY}
                    ${optionalRequestUrl}`
                    .trim(),
                'No request url provided'),
            EzJson.toJson(eResponse));

        return eResponse;
    }

    /**
     * @public @method
     * Handles bad request status 500
     * @param {object} jqXHR
     * @param {string} textStatus
     * @param {object} errorThrown
     */
    ezHandleSendRequestStatus500(jqXHR, textStatus, errorThrown) {
        return EzHttpHelper.ezInstance.ezExtractErrorResponseFromJqXHR(
            jqXHR,
            textStatus,
            errorThrown);
    }

    /**
     * @public @method
     */
    ezHandleSendRequestBeforeSend(jqXHR, beforeHandler) {
        EzHttpHelper.ezInstance.ezAddEzClockerHeaders(jqXHR);

        if (EzFunction.isFunction(beforeHandler)) {
            beforeHandler(jqXHR);
        }
    }

    /**
     * @public @method
     */
    ezHandleSendRequestSuccess(response, status = 200, jqXHR = null) {
        EzHttpHelper.ezInstance.ezSaveEzClockerHeaders(jqXHR);

        if (EzObject.isValid(response) && !EzString.isString(response) && EzString.isString(response.message) && EzNumber.isNumber(response.errorCode)) {
            response.jqXHR = jqXHR;

            response.status = status;

            return resolve(response);
        }

        if (EzObject.isValid(response.errorCode)) {
            response.status = jqXHR.status;
        }

        if (autoHandleStatus && !EzString.isString(response)) {
            response.jqXHR = jqXHR;

            return EzHttpHelper.ezInstance.ezProcessResponseStatus(response, jqXHR, url)
                .then(resolve, reject);
        }

        if (!EzString.isString(response)) {
            response.jqXHR = jqXHR;
        }

        return resolve(response, jqXHR);
    }

    /**
     * @public @method
     */
    ezHandleSendRequestError() {
        // Not implemented
    }

    /**
     * @public @method @method
     * Use EzHttpHelper.ezInstance.ezProcessResponseStatus
     * @public @method @method
     * @param {undefined|null|number} statusCode
     * @param {undefined|null|string} url
     * @param {undefined|null|object} jqXHR
     * @returns {boolean}
     */
    ezDefaultErrorStatusHandler(statusCode, url, jqXHR) {
        if (statusCode >= 400 && statusCode < 500) {
            switch (statusCode) {
                case 401: // unauthorized
                case 403: // forbidden
                    return false;
                case 409: // conflict
                    return false;
                case 407: // proxy auth required
                case 408: // Request timeout
                case 418: // I'm a teapot
                case 421: // Misdirected request
                case 422: // Unprocessable entity
                case 423: // Locked
                case 424: // Failed dependency
                case 426: // Upgrade required
                case 428: // Precondition required
                case 429: // Too many requests
                case 431: // Request header fields too large
                case 451: // Unavailable for legal reasons
                    ezApi.ezclocker.ezDialog.ezReportInternalBugDialog(
                        jqXHR,
                        `Service error: ${statusCode}`,
                        url);

                    return true;
                case 404:
                default:
                    ezApi.ezclocker.ezDialog.ezReportInternalBugDialog(
                        jqXHR,
                        `Service Error ${statusCode}`,
                        url);

                    return true;
            }
        }

        if (500 <= statusCode) {
            ezApi.ezclocker.ezDialog.ezReportInternalBugDialog(
                jqXHR,
                `Service Error ${statusCode}`,
                url);

            return true;
        }

        return false; // not handled
    }

    /**
     * @public @method
     * Performs a request that updates status via the streamCallback method.
     * The downloadStatusCallback called with param object:
     * {
     *     loaded: number;
     *     total?: number;
     *     progress?: number;
     *     bytes: number;
     *     estimated?: number;
     *     rate?: number; // download speed in bytes
     *     download: true; // download sign
     * }
     * The uploadStatusCallback is called with the following param object:
     * {
     *     loaded: number;
     *     total?: number;
     *     progress?: number; // in range [0..1]
     *     bytes: number; // how many bytes have been transferred since the last trigger (delta)
     *     estimated?: number; // estimated time in seconds
     *     rate?: number; // upload speed in bytes
     *     upload: true; // upload sign
     * }
     * Call response object: {
     *     // `data` is the response that was provided by the server
     *     data: {},
     *     // `status` is the HTTP status code from the server response
     *     status: 200,
     *     // `statusText` is the HTTP status message from the server response
     *     statusText: 'OK',
     *     // `headers` the HTTP headers that the server responded with
     *     // All header names are lowercase and can be accessed using the bracket notation.
     *     // Example: `response.headers['content-type']`
     *     headers: {},
     *     // `config` is the config that was provided to `axios` for the request
     *     config: {},
     *     // `request` is the request that generated this response
     *     // It is the last ClientRequest instance in node.js (in redirects)
     *     // and an XMLHttpRequest instance in the browser
     *     request: {}
     * }
     * @param {undefined|null|String} method
     * Default is GET
     * @param {String} url
     * Param is required
     * @param {undefined|null|Object} params
     * URL paramerts object of paramName = paramValue
     * @param {undefined|null|Object} headers
     * Request headers object of headerName = headerValue
     * @param {undefined|null|String} acceptMediaType
     * Default is JSON
     * @param {undefined|null|String} contentMediaType
     * Default is JSON
     * @param {undefined|null|Object|String} payload
     * Optional payload to provide in the request (PUT, POST operations only)
     * @param {undefined|null|Function} downloadStatusCallback
     * @param {undefined|null|Function} uploadStatusCallback
     * @returns {Promise}
     * Promise.resolve returns an Axios success response object.Promise.reject returns an Axios failure response object.
     */
    ezSendAxiosRequest(method, url, params, headers, acceptMediaType, payload, contentMediaType, downloadStatusCallback, uploadStatusCallback) {
        let requestMethod = EzHttpRequestMethod.ezAsEnum(method).toUpperCase();

        if (!EzString.hasLength(url)) {
            throw new EzBadParamException(
                'url',
                EzHttpHelper,
                EzHttpHelper.ezSendAxiosRequest);
        }

        let axiosHeaders = EzObject.isValid(headers)
            ? headers
            : {};

        if (!EzObject.hasOwnProperty(axiosHeaders, 'Accept')) {
            axiosHeaders['Accept'] = EzString.stringOrDefault(
                acceptMediaType,
                EzHttpMediaType.APPLICATION_JSON);
        }
        if (EzHttpRequestMethod.POST === requestMethod || EzHttpRequestMethod.PUT === requestMethod && !EzObject.hasOwnProperty(axiosHeaders, 'Content-Type')) {
            axiosHeaders['Content-Type'] = EzString.stringOrDefault(
                contentMediaType,
                EzHttpMediaType.APPLICATION_JSON);
        }

        let axiosRequestConfig = {
            url: url,
            method: requestMethod.toLowerCase(),
            headers: axiosHeaders,
            params: EzObject.isValid(params)
                ? params
                : null,
            data: EzObject.isValid(payload)
                ? payload
                : null,
            timeout: 20000,
            responseType: axiosHeaders['Accept'],
            responseEncoding: 'utf8',
            onDownloadProgress: (downloadProgress) => {
                if (EzFunction.isFunction(downloadStatusCallback)) {
                    downloadStatusCallback.apply(this, downloadProgress);
                }
            },
            onUploadProgress: (uploadProgress) => {
                if (EzFunction.isFunction(uploadStatusCallback)) {
                    uploadStatusCallback.apply(this, uploadProgress);
                }
            }
        };

        return axios(axiosRequestConfig);
    }

    /**
     * @public @method
     * Performs an HTTP request using AXIOS with assumed accept and content type (if payload is not null) as Application/JSON
     * @param {String} method
     * @param {String} url
     * @param {Object} params
     * @param {Object} headers
     * @param {*} payload,
     * @param {Function} downloadStatusCallback
     * @param {Function} uploadStatusCallback
     * @returns {Promise}
     */
    ezSendAxiosJsonRequest(method, url, params, headers, payload, downloadStatusCallback, uploadStatusCallback) {
        return EzHttpHelper.ezInstance.ezSendAxiosRequest(
            // method
            EzHttpRequestMethod.ezAsEnum(method).toUpperCase(),
            // url
            url,
            // params
            params,
            // headers
            headers,
            // acceptMediaType
            EzHttpMediaType.APPLICATION_JSON,
            // payload
            EzObject.isValid(payload)
                ? payload
                : null,
            // contentMediaType
            EzObject.isValid(payload)
                ? EzHttpMediaType.APPLICATION_JSON
                : null,
            // downloadStatusCallback
            EzFunction.isFunction(downloadStatusCallback)
                ? downloadStatusCallback
                : null,
            // uploadStatusCallback
            EzFunction.isFunction(uploadStatusCallback)
                ? uploadStatusCallback
                : null);
    }

    /**
     * @public @method
     * Performs a JSON request
     * @param {string} method
     * @param {string} url
     * @param {*|null} payload
     * @param {boolean|null} async
     * @param {function|null} beforeHandler
     * @param {boolean|null} autoHandleStatus
     * @returns {Promise}
     */
    ezSendJsonRequest(method, url, payload, async, beforeHandler, autoHandleStatus) {
        return EzHttpHelper.ezInstance.ezSendRequest(
            method,
            url,
            payload,
            async,
            (jqXHR) => {
                EzHttpHelper.ezInstance.addContentType(jqXHR, EzHttpHelper.MEDIA_TYPE_APPLICATIONJSON);

                EzHttpHelper.ezInstance.addAcceptType(jqXHR, EzHttpHelper.MEDIA_TYPE_APPLICATIONJSON);

                EzHttpHelper.ezInstance.addNoCache(jqXHR, EzHttpHelper.MEDIA_TYPE_APPLICATIONJSON);

                //EzHttpHelper.ezInstance.addAccessControlAllowOriginHeader(jqXHR);

                if (EzFunction.isFunction(beforeHandler)) {
                    return beforeHandler(jqXHR);
                }
            },
            autoHandleStatus);
    }

    /**
     * @public @method @method
     * Performs an HTTP request, assuming form data as the payload.
     * @param {string} method
     * @param {string} url
     * @param {string|null} formData
     * @param {boolean|null} async
     * @param {function|null} beforeHandler
     * @returns {Promise}
     */
    ezSendFormRequest(method, url, formData, async, beforeHandler) {
        return EzHttpHelper.ezInstance.ezSendRequest(
            method,
            url,
            formData,
            async,
            (jqXHR) => {
                EzHttpHelper.ezInstance.addContentType(jqXHR, EzHttpHelper.MEDIA_TYPE_APPLICATION_X_WWW_FORM_URLENCODED);

                EzHttpHelper.ezInstance.addAcceptType(jqXHR, EzHttpHelper.MEDIA_TYPE_APPLICATIONJSON);

                EzHttpHelper.ezInstance.addNoCache(jqXHR, EzHttpHelper.MEDIA_TYPE_APPLICATIONJSON);

                EzHttpHelper.ezInstance.addAccessControlAllowOriginHeader(jqXHR);

                if (EzFunction.isFunction(beforeHandler)) {
                    return beforeHandler(jqXHR);
                }
            });
    }

    /**
     * @public @method
     * @param {string} url
     * @param {string} method
     * @param {*} payload
     * @param {string} contentType
     * @param {string} accept
     * @returns {Promise}
     */
    ezPostOther(url, payload, contentType, accept) {
        return EzHttpHelper.ezInstance.ezSendRequest(
            EzHttpRequestMethod.POST,
            url,
            payload,
            true,
            (jqXHR) => {
                jqXHR.setRequestHeader('Content-Type', contentType);

                jqXHR.setRequestHeader('Accept', accept);
            });
    }

    /**
     * @public @method
     * Performs an HTTP post request (payload content type and accept type is up to caller to add as needed in before handler)
     * @param {string} url
     * @param {*|null} payload
     * @param {boolean} async
     * @param {function} beforeHandler
     * @param {boolean|null} autoHandleStatus
     * @returns {Promise}
     */
    ezPost(url, payload, async, beforeHandler, autoHandleStatus) {
        return EzHttpHelper.ezInstance.ezSendJsonRequest(
            EzHttpRequestMethod.POST,
            url,
            payload,
            async,
            beforeHandler,
            autoHandleStatus);
    }

    /**
     * @public @method
     * Performs an HTTP request using AXIOS with assumed accept and content type (if payload is not null) as Application/JSON
     * @param {String} method
     * @param {String} url
     * @param {Object} params
     * @param {Object} headers
     * @param {*} payload,
     * @param {Function} downloadStatusCallback
     * @param {Function} uploadStatusCallback
     * @returns {Promise}
     */
    ezAxiosPost(url, params, headers, payload, downloadStatusCallback, uploadStatusCallback) {
        return EzHttpHelper.ezInstance.ezSendAxiosJsonRequest(
            // method
            EzHttpRequestMethod.POST.toUpperCase(),
            // url
            url,
            // params
            EzObject.isValid(params)
                ? params
                : null,
            EzObject.isValid(headers)
                ? headers
                : null,
            payload,
            EzFunction.isFunction(downloadStatusCallback)
                ? downloadStatusCallback
                : null,
            EzFunction.isFunction(uploadStatusCallback)
                ? uploadStatusCallback
                : null);
    }

    /**
     * @public @method
     * Performs an HTTP request using AXIOS with assumed accept and content type (if payload is not null) as Application/JSON
     * @param {String} method
     * @param {String} url
     * @param {Object} params
     * @param {Object} headers
     * @param {*} payload,
     * @param {Function} downloadStatusCallback
     * @param {Function} uploadStatusCallback
     * @returns {Promise}
     */
    ezAxiosPut(url, params, headers, payload, downloadStatusCallback, uploadStatusCallback) {
        return EzHttpHelper.ezInstance.ezSendAxiosJsonRequest(
            // method
            EzHttpRequestMethod.PUT.toUpperCase(),
            // url
            url,
            // params
            EzObject.isValid(params)
                ? params
                : null,
            EzObject.isValid(headers)
                ? headers
                : null,
            payload,
            EzFunction.isFunction(downloadStatusCallback)
                ? downloadStatusCallback
                : null,
            EzFunction.isFunction(uploadStatusCallback)
                ? uploadStatusCallback
                : null);
    }

    /**
     * @public @method
     * Executes an HTTP post assuming JSON content and accept
     * @param {string} url
     * @param {string|null} payload
     * @param {function|null} beforeHandler
     * @returns {Promise}
     * @deprecated
     * Migrate to ezApi.ezclocker.ezHttpHelper.ezPost(url, payload, async, beforeHandler, autoHandleStatus)
     */
    post(url, payload, beforeHandler) {
        return EzHttpHelper.ezInstance.ezPost(
            url,
            payload,
            true,
            beforeHandler);
    }

    /**
     * @public @method
     * Performs a post with custom headers
     * @param {string} url
     * @param {string|null} payload
     * @param {function|null} beforeHandler
     * @param {boolean|null} autoHandleStatus
     * @returns {Promise}
     */
    ezCustomPost(url, payload, beforeHandler, autoHandleStatus) {
        return EzHttpHelper.ezInstance.ezSendRequest(
            EzHttpRequestMethod.POST,
            url,
            payload,
            true,
            beforeHandler,
            autoHandleStatus);
    }

    /**
     * @public @method
     * Executes an HTTP GET (payload content type and accept type is up to caller to add as needed in before handler)
     * @param {string} url
     * @param {boolean|null} async
     * @param {function|null} beforeHandler
     * @param {boolean|null} autoHandleStatus
     * @returns {Promise}
     */
    ezGet(url, async, beforeHandler, autoHandleStatus) {
        return EzHttpHelper.ezInstance.ezSendJsonRequest(
            EzHttpRequestMethod.GET,
            url,
            // No payload
            null,
            !EzBoolean.isFalse(async),
            beforeHandler,
            !EzBoolean.isFalse(autoHandleStatus));
    }

    /**
     * @public @method
     * Performs a get for the provided media type.
     * @param {String} url
     * @param {String} acceptMediaType
     * @param {Boolean|null} async
     * @param {Function|null} beforeHandler
     * @param {Boolean|null} autoHandleStatus
     */
    ezGetMediaType(url, acceptMediaType, async, beforeHandler, autoHandleStatus) {
        return EzHttpHelper.ezInstance.ezSendRequest(
            EzHttpRequestMethod.GET,
            url,
            // No payload
            null,
            !EzBoolean.isFalse(async),
            (jqXHR) => {
                EzHttpHelper.ezInstance.addAcceptType(jqXHR, acceptMediaType);

                if (EzFunction.isFunction(beforeHandler)) {
                    return beforeHandler(jqXHR);
                }
            },
            !EzBoolean.isFalse(autoHandleStatus));
    }

    /**
     * @public @method
     * Downloads a file at the provided URL.
     * @param {string} url
     * @param {boolean|null} async
     * @param {function|null} beforeHandler
     * @param {boolean|null} autoHandleStatus
     * @returns {Promise}
     */
    ezGetFile(url, async, mediaType, beforeHandler, autoHandleStatus) {
        return EzHttpHelper.ezInstance.ezSendRequest(
            EzHttpRequestMethod.GET,
            url,
            null,
            async,
            (jqXHR) => {
                if (EzString.hasLength(mediaType)) {
                    EzHttpHelper.ezInstance.addAcceptType(jqXHR, mediaType);
                }

                if (EzFunction.isFunction(beforeHandler)) {
                    return beforeHandler(jqXHR);
                }
            },
            autoHandleStatus);
    }

    /**
     * @public @method
     * Downloads a file at the provided URL.
     * @param {string} url
     * @param {boolean|null} async
     * @param {function|null} beforeHandler
     * @param {boolean|null} autoHandleStatus
     * @returns {Promise}
     */
    ezGetHtml(url, beforeHandler, autoHandleStatus) {
        return EzHttpHelper.ezInstance.ezSendRequest(
            EzHttpRequestMethod.GET,
            url,
            null, true,
            function(jqXHR) {
                EzHttpHelper.ezInstance.addAcceptType(jqXHR, 'text/html');

                if (EzFunction.isFunction(beforeHandler)) {
                    return beforeHandler(jqXHR);
                }
            },
            autoHandleStatus);
    }

    /**
     * @public @method
     * Executes a GET HTTP Form Request
     * @param {string} url
     * @param {boolean|null} async
     * @param {function|null} before
     * @returns {Promise}
     */
    ezGetForm(url, async, before) {
        return EzHttpHelper.ezInstance.ezSendFormRequest(
            EzHttpRequestMethod.GET,
            url,
            null,
            async,
            before);
    }

    /**
     * @deprecated Use EzHttpHelper.ezInstance.ezGet() instead
     * @public @method
     * Executes a GET http request with JSON accept and content type headers
     * @param {string} url
     * @param {function|null} before
     * @returns {Promise}
     * @deprecated
     * Migrate to ezApi.ezclocker.ezHttpHelper.ezGet(url, async, beforeHandler, autoHandleStatus)
     */
    get(url, before) {
        return EzHttpHelper.ezInstance.ezGet(
            url,
            true,
            before);
    }

    /**
     * @public @method
     * Executes an HTTP PUT request (payload content type and accept type is up to caller to add as needed in before handler)
     * @param {string} url
     * @param {string|null} payload
     * @param {boolean|null} async
     * @param {function|null} beforeHandler
     * @param {Boolean|null}  autoHandleResponse
     * @returns {Promise}
     */
    ezPut(url, payload, async, beforeHandler, autoHandleResponse) {
        return EzHttpHelper.ezInstance.ezSendJsonRequest(
            EzHttpRequestMethod.PUT,
            url,
            payload,
            async,
            beforeHandler,
            autoHandleResponse);
    }

    /**
     * Executes an HTTP PUT request for an HTML form
     * @param {string} url
     * @param {string|null} payload
     * @param {boolean|null} async
     * @param {function|null} beforeHandler
     * @returns {Promise}
     */
    ezPutForm(url, payload, async, beforeHandler) {
        return EzHttpHelper.ezInstance.ezSendFormRequest(
            EzHttpRequestMethod.PUT,
            url,
            payload,
            async,
            beforeHandler);
    }

    /**
     * @deprecated Use EzHttpHelper.ezInstance.ezPut() instead.
     * Executes an HTTP PUT request content and accept types set to json
     * @param {*} url
     * @param {*} payload
     * @param {*} beforeHandler
     * @returns {Promise}
     */
    put(url, payload, beforeHandler) {
        return EzHttpHelper.ezInstance.ezSendJsonRequest(
            EzHttpRequestMethod.PUT,
            url,
            payload,
            true,
            beforeHandler);
    }

    /**
     * @public @method
     * Executes an HTTP DELETE request (payload content type and accept type is up to caller to add as needed in before handler)
     * @param {string} url
     * @param {string|null} payload
     * @param {boolean|null} async
     * @param {function|null} beforeHandler
     * @returns {Promise}
     */
    ezDelete(url, payload, async, beforeHandler) {
        return EzHttpHelper.ezInstance.ezSendJsonRequest(
            EzHttpRequestMethod.DELETE,
            url,
            payload,
            async,
            beforeHandler);
    }

    /**
     * @public @method
     * Executes a DELETE HTTP Form Request
     * @param {string} url
     * @param {string|null} payload
     * @param {boolean|null} async
     * @param {function|null} beforeHandler
     * @returns {Promise}
     */
    ezDeleteForm(url, payload, async, before) {
        return EzHttpHelper.ezInstance.ezSendFormRequest('DELETE', url, payload, async, before);
    }

    /**
     * @deprecated Use EzHttpHelper.ezInstance.ezDelete() instead
     * @public @method
     * Executes a DELETE http request with JSON accept/content types.
     * @param {string} url
     * @param {string|null} payload
     * @param {function|null} before
     * @returns {Promise}
     */
    del(url, payload, before) {
        return EzHttpHelper.ezInstance.ezSendJsonRequest('DELETE', url, payload, true, before);
    }

    /**
     * @public @method
     * Upload the formFileData (as a file) to the provided url
     * @param {string} url
     * Url to upload the file to
     * @param {file} formFileData
     * Form file select data
     * @param {string} contentType
     * Default: application/x-www-form-urlencoded
     * @param {string} acceptType
     * Default: application/json
     * @param {function|null} onUploadProgressCallback
     * Callback function to handle upload progress
     * @returns {Promise}
     */
    ezUploadFile(url, formFileData, contentType, acceptType, onUploadProgressCallback) {
        if (!EzString.hasLength(url)) {
            ezApi.ezReject({
                errorCode: 401,
                message: 'A valid url is required to upload a file.'
            });
        }

        contentType = EzString.hasLength(contentType)
            ? contentType
            : EzHttpHelper.MEDIA_TYPE_APPLICATION_X_WWW_FORM_URLENCODED;

        acceptType = EzString.hasLength(acceptType)
            ? acceptType
            : EzHttpHelper.MEDIA_TYPE_APPLICATIONJSON;

        return EzPromise.promise(
            (resolve, reject) => {
                let request = new XMLHttpRequest();

                if (EzFunction.isFunction(onUploadProgressCallback)) {
                    // Hook request's progress event
                    request.addEventListener(
                        'progress',
                        (event) => {
                            ezApi.ezCallback(onUploadProgressCallback, request.upload, event);
                        },
                        false);
                }

                // Hook requests load event
                request.addEventListener(
                    'load',
                    (event) => {
                        let uploadResponse = 'json' === request.responseType
                            ? ezApi.ezFromJson(request.response)
                            : request.responseText;

                        return resolve({
                            errorCode: 100 < request.status && 200 <= request.status && 300 > request.status
                                ? 0 // success
                                : request.status,// other http status error code
                            message: EzString.hasLength(request.statusText)
                                ? request.statusText
                                : 'Success',
                            response: uploadResponse,
                            handlingEvent: event
                        });
                    },
                    false);

                // Hook requests error event
                request.addEventListener(
                    'error',
                    (event) => {
                        return reject({
                            errorCode: 500,
                            message: 'Failed to upload file',
                            handlingEvent: event
                        });
                    },
                    false);

                // Hook requests abort event
                request.addEventListener(
                    'abort',
                    (event) => {
                        return reject({
                            errorCode: 499,
                            message: 'Upload was canceled by the user',
                            handlingEvent: event
                        });
                    },
                    false);

                // Perform the request
                request.open('POST', url);
                request.setRequestHeader('ContentType', contentType);
                request.setRequestHeader('Accept', acceptType);
                request.send(formFileData);
            });
    }

    /**
     * @public @method
     * Adds a header to a request
     * @param {object} jqXHR
     * @param {string|null} name
     * @param {string|null} value
     */
    ezAddHeader(jqXHR, name, value) {
        if (!EzObject.isValid(jqXHR) || !EzString.hasLength(name) || !EzString.hasLength(value)) {
            return;
        }
        jqXHR.setRequestHeader(name, value);
    }

    /**
     * @deprecated Use EzHttpHelper.ezInstance.ezAddHeader() instead
     * @public @method
     * @param {object} jqXHR
     * @param {string|null} name
     * @param {string|null} value
     */
    addHeader(jqXHR, name, value) {
        if (!EzObject.isValid(jqXHR) || !EzString.hasLength(name) || !EzString.hasLength(value)) {
            return;
        }

        jqXHR.setRequestHeader(name, value);
    }

    /**
     * @param {object} jqXHR
     * @param {string|null} mediaType
     */
    addContentType(jqXHR, mediaType) {
        EzHttpHelper.ezInstance.addHeader(jqXHR, EzHttpHelper.HEADER_NAME_CONTENT_TYPE, mediaType);
    }

    /**
     * @param {object} jqXHR
     * @param {string|null} mediaType
     */
    addAcceptType(jqXHR, mediaType) {
        EzHttpHelper.ezInstance.addHeader(jqXHR, EzHttpHelper.HEADER_NAME_ACCEPT, mediaType);
    }

    /**
     * @public @method @method
     * Adds the Cache-control: no-store, no-transform header to the jqXHR request
     * @param {object} jqXHR
     */
    addNoCache(jqXHR) {
        EzHttpHelper.ezInstance.addHeader(jqXHR, 'Cache-Control', 'no-store, no-transform');
    }

    /**
     * @public @method @method
     * Adds the access-control-allow-origin header as window.location.origin
     * @param {object} jqXHR
     */
    addAccessControlAllowOriginHeader(jqXHR) {
        EzHttpHelper.ezInstance.addHeader(
            jqXHR,
            EzHttpHelper.ACCESS_CONTROL_ALLOW_ORIGIN,
            window.location.origin);
    }

    /**
     * @public @method @method
     * Adds the known ezclocker headers to a request
     * @param {object} jqXHR
     */
    ezAddEzClockerHeaders(jqXHR) {
        /*
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            ENGINEERING NOTES
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            Never send auth status, environment, developer token, or the
            auth token back to the server.
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        */

        EzHttpHelper.ezInstance.ezAddEzlockerHeader(jqXHR, EzHttpHelper.ezClockerHeaders.userId);

        EzHttpHelper.ezInstance.ezAddEzlockerHeader(jqXHR, EzHttpHelper.ezClockerHeaders.employerId);

        EzHttpHelper.ezInstance.ezAddEzlockerHeader(jqXHR, EzHttpHelper.ezClockerHeaders.employeeId);

        EzHttpHelper.ezInstance.ezAddEzlockerHeader(jqXHR, EzHttpHelper.ezClockerHeaders.mobile);

        EzHttpHelper.ezInstance.ezAddEzlockerHeader(jqXHR, EzHttpHelper.ezClockerHeaders.accessControlAllowOrigin);
    }

    /**
     * @public @method
     * Saves exclocker headers for future use.
     * @param {object} jqXHR
     */
    ezSaveEzClockerHeaders(jqXHR) {
        EzHttpHelper.ezInstance.ezReadEzlockerHeader(jqXHR, EzHttpHelper.ezClockerHeaders.authStatus);

        EzHttpHelper.ezInstance.ezReadEzlockerHeader(jqXHR, EzHttpHelper.ezClockerHeaders.environment);

        EzHttpHelper.ezInstance.ezReadEzlockerHeader(jqXHR, EzHttpHelper.ezClockerHeaders.userId);

        EzHttpHelper.ezInstance.ezReadEzlockerHeader(jqXHR, EzHttpHelper.ezClockerHeaders.employerId);

        EzHttpHelper.ezInstance.ezReadEzlockerHeader(jqXHR, EzHttpHelper.ezClockerHeaders.employeeId);

        EzHttpHelper.ezInstance.ezReadEzlockerHeader(jqXHR, EzHttpHelper.ezClockerHeaders.developerToken);

        EzHttpHelper.ezInstance.ezReadEzlockerHeader(jqXHR, EzHttpHelper.ezClockerHeaders.authToken);

        EzHttpHelper.ezInstance.ezReadEzlockerHeader(jqXHR, EzHttpHelper.ezClockerHeaders.mobile);
    }

    /**
     * @public @method
     * Adds an ezclocker header
     * @param {object} jqXHR
     * @param {object} ezClockerHeader
     */
    ezAddEzlockerHeader(jqXHR, ezClockerHeader) {
        if (!EzObject.isValid(jqXHR) || !EzObject.isValid(ezClockerHeader) ||
            ezApi.ezIsEmptyString(ezClockerHeader.headerName) || ezApi.ezIsEmptyString(ezClockerHeader.value)) {
            return;
        }
        jqXHR.setRequestHeader(ezClockerHeader.headerName, ezClockerHeader.value);
    }

    /**
     * @public @method
     * Stores an ezclocker header for future requests
     * @param {object} jqXHR
     * @param {object} ezClockerHeader
     */
    ezReadEzlockerHeader(jqXHR, ezClockerHeader) {
        if (!EzObject.isValid(jqXHR) || !EzObject.isValid(ezClockerHeader) ||
            ezApi.ezIsEmptyString(ezClockerHeader.headerName)) {
            return;
        }

        ezClockerHeader.value = jqXHR.getResponseHeader(ezClockerHeader.headerName);
    }

    /**
     * @param {object} jqXHR
     * @param {*} employerId
     * @param {string|null} authToken
     * @param {string|null} developerToken
     */
    addAuthentication(jqXHR, employerId, authToken, developerToken) {
        EzHttpHelper.ezInstance.addHeader(jqXHR, EzHttpHelper.HEADER_NAME_X_EZCLOCKER_AUTHTOKEN, authToken);
        EzHttpHelper.ezInstance.addHeader(jqXHR, EzHttpHelper.HEADER_NAME_X_EZCLOCKER_DEVELOPERTOKEN, developerToken);
        EzHttpHelper.ezInstance.addHeader(jqXHR, EzHttpHelper.HEADER_NAME_X_EZCLOCKER_EMPLOYERID, employerId);
    }

    /**
     * @deprecated Migrate to EzHttpHelper.ezInstance.ezAddQueryParam()
     * @public @method
     * Appends a query param to the provided url.
     * @param {string|null} url
     * @param {string|null} queryName
     * @param {string|null} queryValue
     * @returns {string}
     */
    addQueryParam(url, queryName, queryValue) {
        return EzHttpHelper.ezInstance.ezAddQueryParam(url, queryName, queryValue);
    }

    /**
     * @public @method
     * Appends a query param to the provided url.
     * @param {string|null} url
     * @param {string|null} queryName
     * @param {string|null} queryValue
     */
    ezAddQueryParam(url, queryName, queryValue) {
        if (!EzSring.stringHasLength(queryName)) {
            return url;
        }

        let newUrl = EzString.hasLength(url)
            ? url
            : EzSring.EMPTY;

        newUrl += url.indexOf('?') === -1
            ? `${newUrl}?`
            : `${newUrl}&`;

        newUrl += `${queryName}=${queryValue}`;

        return newUrl;
    }

    /**
     * @param {string|null} errorMessage
     * @param {*} errorCode
     */
    createFakeErrorResponse(errorMessage, errorCode) {
        if (!EzString.hasLength(errorCode)) {
            return EzString.msg`
            {
                "errorCode": "500",
                "message": "${errorMessage}"
            }`;
        }

        return EzString.msg`
            {
                "errorCode" :"${errorCode}",
                "message": "${errorMessage}"
            }`;
    }

    /**
     * @deprecated DO NOT USE
     * @public @method
     * @param {object} jqXHR
     */
    extractResponseError(jqXHR) {
        if (!jqXHR || !jqXHR.responseJSON) {
            return jqXHR.responseJSON; // return the official response
        }
        if (EzString.hasLength(jqXHR.responseText)) {
            let result = EzString.EMPTY;
            try {
                result = EzJson.fromJson(jqXHR.responseText);
                result.statusCode = jqXHR.status;
            } catch (exception) {
                result = {
                    errorCode: 500,
                    statusCode: jqXHR.status,
                    message: jqXHR.responseText // probably html or xml
                };
            }
            ezApi.ezclocker.ezLogger.error(result);
            return result;
        }
        return {
            errorCode: 500,
            statusCode: jqXHR.statusCode,
            message: 'Failure with no response.'
        };
    }

    /**
     * @public @method
     * @param {object} jqXHR
     * @param {*} status
     * @param {*} error
     * @param {*} defaultErrorMessage
     */
    ezExtractErrorResponse(jqXHR) {
        let response = {
            errorCode: 500,
            message: 'Service response error is un-readable. Content is not available from a null jqXHR instance.',
            statusCode: 500,
        };

        if (!EzObject.isValid(jqXHR)) {
            ezApi.ezclocker.ezLogger.debug(`Failed to extract service error response. Error: ${EzJson.toJson(response)}`);

            return response;
        }

        if (jqXHR.responseJSON) {
            // return the official response
            response = jqXHR.responseJSON;

            if (!EzArray.isArray(response)) {
                if (!EzObject.isValid(response.errorCode)) {
                    response.errorCode = 0;
                }

                response.statusCode = jqXHR.status;
            }
        } else if (EzString.hasLength(jqXHR.responseText)) {
            try {
                let jsonError = EzJson.fromJson(jqXHR.responseText);

                response = jsonError;

                if (!EzArray.isArray(response)) {
                    if (!EzObject.isValid(response.errorCode)) {
                        response.errorCode = 0;
                    }

                    response.statusCode = jqXHR.status;
                }
            } catch (exception) {
                response = jqXHR.responseText; // probably html or xml
            }
        } else if (EzString.hasLength(jqXHR.message)) {
            response = jqXHR.message;
        }

        ezApi.ezclocker.ezLogger.error(
            `Service error response: ${EzJson.toJson(response)}`);

        return response;
    }

    /**
     * @public @method
     * @param {object} jqXHR
     * @param {*} failHtml
     */
    ezExtractResponse(jqXHR, failHtml) {
        failHtml = EzBoolean.isTrue(failHtml);

        if (!jqXHR) {
            failHtml = false;
        }

        let response = {
            errorCode: 500,
            message: 'Service response is un-readable. Content is not available from a null jqXHR instance.',
            statusCode: 500,
        };

        // If a JSON response is available, return this over all
        if (EzObject.isValid(jqXHR.responseJSON)) {
            response = jqXHR.responseJSON;

            if (!EzArray.isArray(response)) {
                if (!EzObject.isValid(response.errorCode)) {
                    response.errorCode = 0;
                }

                response.statusCode = jqXHR.status;
            }

            return response;
        }

        let contentType = jqXHR.getResponseHeader('Content-Type');

        if (!contentType) {
            return EzHttpHelper.ezInstance.ezExtractUnknownContentTypeResponse(jqXHR, response);
        } else if (contentType.indexOf('application/json') !== -1) {
            return EzHttpHelper.ezInstance.ezExtractJsonResponse(jqXHR, response);
        } else if (jqXHR.getResponseHeader('Content-Type').indexOf('text/html') != -1) {
            return EzHttpHelper.ezInstance.ezExtractHtmlResponse(jqXHR, failHtml, response);
        } else if (jqXHR.getResponseHeader('Content-Type').indexOf('text/plain') != -1) {
            return EzHttpHelper.ezInstance.ezExtractTextResponse(jqXHR, response);
        }

        // else, just report an error
        response.message = `EzHttpHelper does not current support content type ${contentType} and is unable to process the response.`;

        ezApi.ezclocker.ezLogger.error(`Failed to process the service response. Error: ${EzJson.toJson(response)}`);

        return response;
    }

    /**
     * @protected
     * Attempts to extract the response from the jqXHR object without knowing the content type.
     * @param {object|null} jqXHR
     */
    ezExtractUnknownContentTypeResponse(jqXHR, response) {
        if (!EzObject.isValid(jqXHR)) {
            ezApi.ezclocker.ezLogger.debug(`Failed to extract service response. Error: ${EzJson.toJson(response)}`);

            return response;
        }

        response.statusCode = jqXHR.status;

        response.errorCode = jqXHR.status >= 200 && jqXHR.status < 300 ? 0 : 500;

        if (jqXHR.responseText) {
            response.message = jqXHR.responseText.length !== 0 ? jqXHR.responseText : 'success';
        } else {
            ezApi.ezclocker.ezLogger.debug(
                EzString.em`
                    ${EzHttpHelper.ezInstance.DEFAULT_SERVICE_ERROR_MESSAGE}
                    Error message: Unable to extract a useable response body.
                    Assuming response is an error and returning the default error message.`);

            response.message = EzHttpHelper.DEFAULT_SERVICE_ERROR_MESSAGE;
        }

        return response;

    }

    /**
     * @protected
     * Attempts to extract a JSON response from the jqXHR object.
     * @param {object|null} jqXHR
     */
    ezExtractJsonResponse(jqXHR, response) {
        if (!EzObject.isValid(jqXHR)) {
            ezApi.ezclocker.ezLogger.debug(`Failed to extract the JSON response. Error: ${EzJson.toJson(response)}`);

            return response;
        }

        response.statusCode = jqXHR.status;

        if (EzObject.isValid(jqXHR.responseJSON)) {
            response = jqXHR.responseJSON;

            if (!EzArray.isArray(response)) {
                if (!EzObject.isValid(response.errorCode)) {
                    response.errorCode = 0;
                }

                response.statusCode = jqXHR.status;
            }
        } else if (EzObject.isValid(jqXHR.responseText)) {
            // Might be JSON, try and convert it
            try {
                let extractedResponse = EzJson.fromJson(jqXHR.responseText);

                response = extractedResponse;

                if (!EzArray.isArray(response)) {
                    if (!EzObject.isValid(response.errorCode)) {
                        response.errorCode = 0;
                    }

                    response.statusCode = jqXHR.status;
                }
            } catch (exception) {
                response.message = `Failed to parse the response JSON. JSON response=${jqXHR.responseText}`;

                ezApi.ezclocker.ezLogger.debug(response.message);
            }
        }

        return response;
    }

    /**
     * @protected
     * Returns an HTML response UNLESS failHtml is true, then an error response is generated instead.
     * @param {object|null} jqXHR
     * @param {boolean|null} failHtml
     */
    ezExtractHtmlResponse(jqXHR, failHtml, response) {
        if (!EzObject.isValid(jqXHR)) {
            ezApi.ezclocker.ezLogger.debug(`Failed to extract the JSON response. Error: ${EzJson.toJson(response)}`);

            return response;
        }

        if (failHtml) {
            response.message = 'Response is HTML and not valid for the service call.';

            ezApi.ezclocker.ezLogger.error(`Encountered unexpected HTML from a service call. Error: ${EzJson.toJson(response)}`);
        } else {
            response = jqXHR.responseText;
        }

        return response;
    }

    /**
     * @protected
     * Attempts to extract a plain text response from the jqXHR object.
     * @param {object|null} jqXHR
     */
    ezExtractTextResponse(jqXHR, response) {
        if (!EzObject.isValid(jqXHR)) {
            ezApi.ezclocker.ezLogger.debug(`Failed to extract the JSON response. Error: ${EzJson.toJson(response)}`);

            return response;
        }

        if (EzObject.isValid(jqXHR.responseText) && jqXHR.responseText.length !== 0) {
            try {
                let textToJson = EzJson.fromJson(jqXHR.responseText);

                response = textToJson;

                if (!EzArray.isArray(response)) {
                    if (!EzObject.isValid(response.errorCode)) {
                        response.errorCode = 0;
                    }

                    response.statusCode = jqXHR.status;
                }
            } catch (exception) {
                response = jqXHR.responseText;
            }
        } else {
            response = EzString.EMPTY; // nothing
        }

        return response;
    }

    /**
     * @param {*} message
     * @param {*} errorCode
     * @param {*} failure
     */
    createFailureResponse(message, errorCode, failure) {
        ezApi.ezclocker.ezLogger.error(message);

        if (null != failure) {
            failure.apply(
                this,
                `{"errorCode":"${errorCode}","message":"${message}"}`);
        }
    }

    // DEPRECATED STUFF BELOW
    /**
     * @public @method
     * Extract a service response
     * @param {object|null} jqXHR
     * @param {boolean|null} failHtml
     * @deprecated Use EzHttpHelper.ezInstance.ezExtractResponse() instead.
     */
    extractResponse(jqXHR, failHtml) {
        return EzHttpHelper.ezInstance.exExtractResponse(jqXHR, failHtml);
    }

    /**
     * @param {*} jqXHR
     * @param {*} defaultErrorMessage
     * @deprecated Use EzHttpHelper.ezInstance.ezExtractErrorResponse(jqXHR) instead
     */
    extractErrorResponse(jqXHR, defaultErrorMessage) {
        ezApi.ezclocker.ezLogger.error('Called deprecated method with default error message: ' + defaultErrorMessage);
        return this.ezExtractErrorResponse(jqXHR);
    }

    /**
     * @public @method
     * @param {null} response
     * No longer used
     * @param {null} statusCode
     * No longer used
     * @param {object} jqXHR
     * @param {string|null} defaultErrorMessage
     * @deprecated Use EzHttpHelper.ezInstance.extractResponse instead
     */
    extractResponseBody(response, jqXHR) {
        if (EzObject.isValid(response)) {
            if (!EzArray.isArray(response)) {
                if (!EzObject.isValid(response.errorCode)) {
                    response.errorCode = 0;
                }

                response.statusCode = jqXHR.status;
            }

            return response;
        }

        return EzHttpHelper.ezInstance.extractResponse(jqXHR, false);
    }

    /**
     * @public @method
     * Obtains a webcomponent from the ezClocker Services
     * @param {string} url
     * @param {function|null} success
     * @param {function|null} failure
     * @param {boolean|null} async
     * @param {function|null} before
     * @param {function|null} exhandler
     * @deprecated Use EzHttpHelper.ezInstance.get instead
     */
    getWebComponent(url, success, failure, async, before, exhandler) {
        url = EzHttpHelper.ezInstance.addQueryParam(url, 'nc', moment().valueOf());

        EzHttpHelper.ezInstance.basicHttpRequest('GET', url, undefined,
            function(result, jqXHR) {
                ezApi.ezCallback(success, result, jqXHR);
            },
            function(eResponse, jqXHR) {
                ezApi.ezCallback(failure, EzHttpHelper.ezInstance.ezExtractErrorResponse(jqXHR, eResponse.message), jqXHR);
            },
            async,
            function(jqXHR) {
                // before actions
                ezApi.ezCallback(before, jqXHR);
            }, exhandler);
    }

    /**
     * @public @method
     * Obtains a webcomponent from the ezClocker Services
     * @param {string} url
     * @param {function|null} success
     * @param {function|null} failure
     * @param {boolean|null} async
     * @param {function|null} before
     * @param {function|null} exhandler
     * @deprecated Use EzHttpHelper.ezInstance.get instead
     */
    ezGetWebComponent(url, beforeHandler, autoHandleStatus) {
        url = EzHttpHelper.ezInstance.addQueryParam(url, 'nc', moment().valueOf());

        return EzHttpHelper.ezInstance.ezSendRequest(
            // Method
            'GET',
            //  URL
            url,
            // async
            true,
            // beforeHandler
            beforeHandler,
            // autoHandleStatus
            autoHandleStatus);
    }

    /**
     * @public @method
     * Basic implementation of the HTTP request
     * @param {string|null} method
     * @param {string} url
     * @param {string|null} payload
     * @param {function|null} success
     * @param {function|null} failure
     * @param {boolean|null} async
     * @param {function|null} before
     * @param {function|null} exhandler
     * @deprecated Use EzHttpHelper.ezInstance.ezSendRawRequest
     */
    basicHttpRequest(method, url, payload, success, failure, async, before, exhandler) {
        if (!async) {
            async = true;
        }

        if (!method || (method != 'GET' && method != 'POST' && method != 'PUT' && method != 'DELETE')) {
            method = 'GET';
        }

        try {
            $.ajax({
                type: method,
                url: url,
                data: payload,
                async: async,
                beforeSend: (jqXHR) => {
                    return ezApi.ezCallback(before, jqXHR);
                },
                success: (response, statusCode, jqXHR) => {
                    response.statusCode = statusCode;

                    if (EzBoolean.isTrue(EzHttpHelper.ezInstance.ezDefaultErrorStatusHandler(statusCode, url, jqXHR))) {
                        return EzFunction.isFunction(failure)
                            ? failure.apply(this, [response, jqXHR])
                            : response;
                    } else {
                        return EzFunction.isFunction(success)
                            ? success.apply(this, [response, jqXHR])
                            : response;
                    }
                },
                error: (jqXHR) => {
                    let statusCode = !jqXHR
                        ? 500
                        : jqXHR.status;

                    let em = EzHttpHelper.ezInstance.ezExtractErrorResponseFromJqXHR(jqXHR);

                    EzHttpHelper.ezInstance.ezDefaultErrorStatusHandler(statusCode, url, jqXHR);

                    return ezApi.ezCallback(failure, em, jqXHR);
                }
            });
        } catch (ex) {
            ezApi.ezclocker.ezDialog.ezReportInternalBugDialog(
                500,
                EzString.EMPTY,
                ex);
            ezApi.ezclocker.ezLogger.error(ex);

            if (exhandler) {
                exhandler(ex);
            }
        }
    }

    /**
     * @public @method
     * Performs an HTTP request
     * @param {string|null} method
     * @param {string} url
     * @param {string|null} payload
     * @param {function|null} success
     * @param {function|null} failure
     * @param {boolean|null} async
     * @param {function|null} before
     * @param {function|null} exhandler
     * @deprecated Use EzHttpHelper.ezInstance.ezSendRequest instead
     */
    httpRequest(method, url, payload, success, failure, async, before, exhandler) {
        EzHttpHelper.ezInstance.basicHttpRequest(
            method,
            url,
            payload,
            (response, jqXHR) => ezApi.ezCallback(success, response, jqXHR),
            (eResponse, jqXHR) => ezApi.ezCallback(failure, eResponse, jqXHR),
            async,
            (jqXHR) => ezApi.ezCallback(before, jqXHR),
            exhandler);
    }

    /**
     * @public @method
     * Performs an HTTP request
     * @param {string|null} method
     * @param {string} url
     * @param {string|null} payload
     * @param {function|null} success
     * @param {function|null} failure
     * @param {boolean|null} async
     * @param {function|null} before
     * @param {function|null} exhandler
     * @returns {Promise}
     * @deprecated Use EzHttpHelper.ezInstance.ezSendRequest instead
     */
    ezHttpRequest(method, url, payload, async, before) {
        return EzHttpHelper.ezInstance.ezSendRequest(method, url, payload, async, before);
    }

    /**
     * @public @method
     * Performs an HTTP request assuming a JSON content type and accept type
     * @param {string|null} method
     * @param {string} url
     * @param {string|null} payload
     * @param {function|null} success
     * @param {function|null} failure
     * @param {boolean|null} async
     * @param {function|null} before
     * @param {function|null} exhandler
     * @deprecated Use EzHttpHelper.ezInstance.ezSendJsonRequest instead
     */
    httpJsonRequest(method, url, payload, success, failure, async, before, exhandler) {
        EzHttpHelper.ezInstance.httpRequest(
            method,
            url,
            payload,
            success,
            failure,
            async,
            (jqXHR) => {
                // before
                EzHttpHelper.ezInstance.addContentType(jqXHR, EzHttpHelper.MEDIA_TYPE_APPLICATIONJSON);
                EzHttpHelper.ezInstance.addAcceptType(jqXHR, EzHttpHelper.MEDIA_TYPE_APPLICATIONJSON);

                if (EzFunction.isFunction(before)) {
                    before(jqXHR);
                }
            }, exhandler);
    }

    /**
     * @public @method
     * @param {string|null} method
     * @param {string} url
     * @param {long} employerId
     * @param {string} authToken
     * @param {string} developerToken
     * @param {string|null} payload
     * @param {function|null} success
     * @param {function|null} failure
     * @param {boolean|null} async
     * @param {function|null} before
     * @param {function|null} exhandler
     * @deprecated Never used
     */
    httpJsonRequestWithAuth(method, url, employerId, authToken, developerToken, payload,
        success, failure, async, before, exhandler) {
        EzHttpHelper.ezInstance.httpJsonRequest(
            method,
            url,
            payload,
            success,
            failure,
            async,
            (jqXHR) => {
                // before
                EzHttpHelper.ezInstance.addHeader(jqXHR, EzHttpHelper.HEADER_NAME_X_EZCLOCKER_EMPLOYERID, employerId);
                EzHttpHelper.ezInstance.addHeader(jqXHR, EzHttpHelper.HEADER_NAME_X_EZCLOCKER_AUTHTOKEN, authToken);
                EzHttpHelper.ezInstance.addHeader(jqXHR, EzHttpHelper.HEADER_NAME_X_EZCLOCKER_DEVELOPERTOKEN, developerToken);

                if (EzFunction.isFunction(before)) {
                    before(jqXHR);
                }

            }, exhandler);
    }

    /**
     * @public @method
     * Performs an HTTP request, assuming form data as the payload.
     * @param {string|null} method
     * @param {string} url
     * @param {string|null} payload
     * @param {function|null} success
     * @param {function|null} failure
     * @param {boolean|null} async
     * @param {function|null} before
     * @param {function|null} exhandler
     * @deprecated Use EzHttpHelper.ezInstance.ezSendFormRequest
     */
    httpFormRequest(method, url, payload, success, failure, async, before, exhandler) {
        return EzHttpHelper.ezInstance.httpRequest(
            method,
            url,
            payload,
            success,
            failure,
            async,
            (jqXHR) => {
                // before actions
                EzHttpHelper.ezInstance.addContentType(jqXHR, EzHttpHelper.MEDIA_TYPE_APPLICATION_X_WWW_FORM_URLENCODED);
                EzHttpHelper.ezInstance.addAcceptType(jqXHR, EzHttpHelper.MEDIA_TYPE_APPLICATIONJSON);
                ezApi.ezCallback(before, jqXHR);
            },
            exhandler);
    }

    /**
     * @public @method
     * Performs an HTTP request, assuming form data as the payload.
     * @param {string|null} method
     * @param {string} url
     * @param {string|null} payload
     * @param {boolean|null} async
     * @param {function|null} beforeHandler
     * @returns {Promise}
     * @deprecated Use EzHttpHelper.ezInstance.ezSendFormRequest
     */
    ezHttpFormRequest(method, url, payload, async, beforeHandler) {
        return EzHttpHelper.ezInstance.ezHttpRequest(
            method,
            url,
            payload,
            async,
            (jqXHR) => {
                // before
                EzHttpHelper.ezInstance.addContentType(jqXHR, EzHttpHelper.MEDIA_TYPE_APPLICATION_X_WWW_FORM_URLENCODED);
                EzHttpHelper.ezInstance.addAcceptType(jqXHR, EzHttpHelper.MEDIA_TYPE_APPLICATIONJSON);
                ezApi.ezCallback(beforeHandler, jqXHR);
            });
    }

    /**
     * @public @method
     * @param {string|null} method
     * @param {string} url
     * @param {string|null} payload
     * @param {function|null} success
     * @param {function|null} failure
     * @param {boolean|null} async
     * @param {function|null} before
     * @param {function|null} exhandler
     * @deprecated Migrate to EzHttpHelper.ezInstance.ezPostForm()
     */
    httpPOST(url, payload, success, failure, async, before, exhandler) {
        return EzHttpHelper.ezInstance.httpRequest(
            'POST',
            url,
            payload,
            success,
            failure,
            async,
            before,
            exhandler);
    }

    /**
     * @public @method
     * @param {string|null} method
     * @param {string} url
     * @param {string|null} payload
     * @param {function|null} success
     * @param {function|null} failure
     * @param {boolean|null} async
     * @param {function|null} before
     * @param {function|null} exhandler
     * @deprecated Migrate to EzHttpHelper.ezInstance.ezPost()
     */
    httpPOSTJson(url, payload, success, failure, async, before, exhandler) {
        return EzHttpHelper.ezInstance.httpJsonRequest('POST', url, payload, success, failure, async, before, exhandler);
    }

    /**
     * @public @method
     * @param {*} url
     * @param {*} employerId
     * @param {*} authToken
     * @param {*} developerToken
     * @param {*} payload
     * @param {*} success
     * @param {*} failure
     * @param {*} async
     * @param {*} before
     * @param {*} exhandler
     * @deprecated Do not use
     */
    httpPOSTJsonWithAuth(url, employerId, authToken, developerToken, payload, success,
        failure, async, before, exhandler) {
        EzHttpHelper.ezInstance.httpJsonRequestWithAuth('POST', url, employerId, authToken, developerToken,
            payload, success, failure, async, before, exhandler);
    }

    /**
     * @public @method
     * @param {string|null} method
     * @param {string} url
     * @param {string|null} payload
     * @param {function|null} success
     * @param {function|null} failure
     * @param {boolean|null} async
     * @param {function|null} before
     * @param {function|null} exhandler
     * @deprecated Migrate to EzHttpHelper.ezInstance.ezPostForm
     */
    httpPOSTForm(url, payload, success, failure, async, before, exhandler) {
        return EzHttpHelper.ezInstance.httpFormRequest('POST', url, payload, success, failure, async, before, exhandler);
    }

    /**
     * @public @method
     * Executes an HTTP post with media type application/x-www-form-urlencoded
     * @param {string} url
     * @param {string|null} formData
     * @param {boolean|null} async
     * @param {function|null} beforeHandler
     * @returns {Promise}
     * @deprecated Will remove in a future release
     */
    ezPostForm(url, formData, async, beforeHandler) {
        return EzHttpHelper.ezInstance.ezSendFormRequest('POST', url, formData, async, beforeHandler);
    }

    /**
     * @public @method @method
     * Handles a form submission, preventing any default actions.
     * @param {object} event
     * @returns {Promise}
     */
    ezHandleSubmitForm(event) {
        if (!EzObject.isValid(event)) {
            throw new EzBadParamException(
                'event',
                EzHttpHelper.ezInstance,
                EzHttpHelper.ezInstance.ezHandleSubmitForm);
        }

        // Stop normal posting...
        event.preventDefault();

        let method = event.currentTarget.method;

        let actionUrl = event.currentTarget.action;

        let formData = $(event.currentTarget).serialize();

        return EzHttpHelper.ezInstance.ezSendFormRequest(
            method.toUpperCase(),
            actionUrl,
            formData);
    }

    /**
     * @public @method @method
     * Handles a form submission, preventing any default actions.
     * @param {object} event
     * @returns {Promise}
     */
    ezHandleSubmitFormCustomAction(event, customAction) {
        if (!EzObject.isValid(event)) {
            throw new EzBadParamException(
                'event',
                EzHttpHelper.ezInstance,
                EzHttpHelper.ezInstance.ezHandleSubmitForm);
        }

        // Stop normal posting...
        event.preventDefault();

        let method = event.currentTarget.method;

        let formData = $(event.currentTarget).serialize();

        return EzHttpHelper.ezInstance.ezSendFormRequest(
            method.toUpperCase(),
            customAction,
            formData);
    }

    /**
     * @public @method
     * Posts the data from the form reference by the provideId to the form's action url.
     * @param {string} formId
     * @param {boolean|null} async
     * @param {function|null} before
     * @returns {Promise}
     * @deprecated Will remove in a future release
     */
    ezPostFormData(formId, async, before) {
        let formData = $(formId).formData;
        let url = $(formId).attr('action');

        return EzHttpHelper.ezInstance.ezPostForm(url, formData, async, before);
    }

    /**
     * @public @method
     * Posts the data from the form reference by the provideId to the form's action url.
     * @param {@} formId
     * @param {*} success
     * @param {*} failure
     * @param {*} async
     * @param {*} before
     * @param {*} exhandler
     * @deprecated Migrate to EzHttpHelper.ezInstance.ezPostFormData or EzHttpHelper.ezInstance.ezPostForm
     */
    httpPOSTFormData(formId, success, failure, async, before, exhandler) {
        let payload = $(formId).formData;

        let url = $(formId).attr('action');

        return EzHttpHelper.ezInstance.httpPOSTForm(
            url,
            payload,
            success,
            failure,
            async,
            before,
            exhandler);
    }

    /**
     * @public @method
     * @param {string} url
     * @param {string|null} formData
     * @param {function|null} success
     * @param {function|null} error
     * @param {boolean|null} progress
     * @deprecated Use EzHttpHelper.ezInstance.ezUploadFile() instead
     */
    httpPOSTFileUpload(url, formData, success, error, progress) {
        let request = new XMLHttpRequest();

        if (EzFunction.isFunction(success)) {
            request.addEventListener('load', success, false);
        }
        if (EzFunction.isFunction(error)) {
            request.addEventListener('error', error, false);
        }
        if (EzFunction.isFunction(progress)) {
            request.addEventListener('abort', progress, false);
        }

        request.open('POST', url, true);

        request.setRequestHeader('Accept', EzHttpHelper.MEDIA_TYPE_APPLICATIONJSON);

        request.send(formData);
    }

    /**
     * @public @method
     * @param {string} url
     * @param {function|null} success
     * @param {function|null} failure
     * @param {boolean|null} async
     * @param {function|null} before
     * @param {function|null} exhandler
     * @deprecated
     * Migrate to ezApi.ezclocker.ezGet(...)
     */
    GET(url, success, failure, async, before, exhandler) {
        EzHttpHelper.ezInstance.httpGET(
            url,
            undefined,
            success,
            failure,
            async,
            before,
            exhandler);
    }

    /**
     * @public @method
     * @param {string} url
     * @param {string|null} payload
     * @param {function|null} success
     * @param {function|null} failure
     * @param {boolean|null} async
     * @param {function|null} before
     * @param {function|null} exhandler
     * @deprecated
     * Migrate to ezApi.ezclocker.ezGet(...)
     */
    httpGET(url, payload, success, failure, async, before, exhandler) {
        EzHttpHelper.ezInstance.httpRequest(
            'GET',
            url,
            payload,
            success,
            failure,
            async,
            before,
            exhandler);
    }

    /**
     * @public @method
     * @param {string} url
     * @param {function|null} success
     * @param {function|null} failure
     * @param {boolean|null} async
     * @param {function|null} before
     * @param {function|null} exhandler
     * @deprecated Use EzHttpHelper.ezInstance.get instead
     */
    httpGETJSON(url, success, failure, async, before, exhandler) {
        EzHttpHelper.ezInstance.httpJsonRequest('GET', url, undefined, success, failure, async, before, exhandler);
    }

    /**
     * @public @method
     * @param {string} url
     * @param {string|null} payload
     * @param {function|null} success
     * @param {function|null} failure
     * @param {boolean|null} async
     * @param {function|null} before
     * @param {function|null} exhandler
     * @deprecated Use EzHttpHelper.ezInstance.get instead
     */
    httpGETJson(url, payload, success, failure, async, before, exhandler) {
        EzHttpHelper.ezInstance.ezGet(
            url,
            async,
            before,
            exhandler);
    }

    /**
     * @param {*} url
     * @param {*} employerId
     * @param {*} authToken
     * @param {*} developerToken
     * @param {*} payload
     * @param {*} success
     * @param {*} failure
     * @param {*} async
     * @param {*} before
     * @param {*} exhandler
     * @deprecated
     * Will remove in a future release
     * Stop all use and migrate to another solution.
     */
    httpGETJsonWithAuth(url, employerId, authToken, developerToken, payload, success, failure, async, before, exhandler) {
        EzHttpHelper.ezInstance.httpJsonRequestWithAuth(
            'GET',
            url,
            employerId,
            authToken,
            developerToken,
            payload,
            success,
            failure,
            async,
            before,
            exhandler);
    }

    /**
     * @public @method
     * @param {string} url
     * @deprecated @param {string|null} payload
     * Payload is no longer supported and is ignored
     * @param {function|null} success
     * @param {function|null} failure
     * @param {boolean|null} async
     * @param {function|null} before
     * @param {function|null} exhandler
     * @deprecated
     * Migrate to ezApi.ezclocker.ezHttpHelper.ezGetForm(url, async, before)
     */
    httpGETForm(url, payload, success, failure, async, before, exhandler) {
        if (EzObject.isValid(payload)) {
            ezApi.ezclocker.ezLogger.warn(
                EzString.msg`
                    The payload parameter is ignored and no longer supported in calls to
                    ezApi.ezclocker.ezHttpHelper.httpGetForm(url, payload = null, success, failure, async, before, exhandler)`);
        }

        EzHttpHelper.ezInstance.ezGetForm(
            url,
            async,
            before)
            .then(
                (response) => EzHttpHelper.ezInstance.ezWrapPromiseResolveHandler(response, success),
                (eResponse) => EzHttpHelper.ezInstance.ezWrapPromiseResolveHandler(eResponse, failure))
            .catch(
                (err) => EzHttpHelper.ezInstance.ezWrapPromiseExceptionHandler(err, exhandler));
    }

    /**
     * @public @method
     * @param {string} url
     * @param {string|null} payload
     * @param {function|null} success
     * @param {function|null} failure
     * @param {boolean|null} async
     * @param {function|null} before
     * @param {function|null} exhandler
     * @deprecated
     * Migrate to ezApi.ezclocker.ezHttpHelper.ezPut(url, payload, async, beforeHandler, autoHandleResponse)
     */
    httpPUT(url, payload, success, failure, async, before, exhandler) {
        EzHttpHelper.ezInstance.ezPut(
            url,
            payload,
            async,
            before)
            .then(
                (response) => EzHttpHelper.ezInstance.ezWrapPromiseResolveHandler(response, success),
                (eResponse) => EzHttpHelper.ezInstance.ezWrapPromiseResolveHandler(eResponse, failure))
            .catch(
                (err) => EzHttpHelper.ezInstance.ezWrapPromiseExceptionHandler(err, exhandler));
    }

    /**
     * @public @method
     * @param {string} url
     * @param {string|null} payload
     * @param {function|null} success
     * @param {function|null} failure
     * @param {boolean|null} async
     * @param {function|null} before
     * @param {function|null} exhandler
     * @deprecated
     * Migrate to ezApi.ezclocker.ezHttpHelper.ezPut(url, payload, async, beforeHandler, autoHandleResponse)
     */
    httpPUTJson(url, payload, success, failure, async, before, exhandler) {
        return EzHttpHelper.ezInstance.ezPut(
            url,
            payload,
            async,
            before)
            .then(
                (response) => EzHttpHelper.ezInstance.ezWrapPromiseResolveHandler(response, success),
                (eResponse) => EzHttpHelper.ezInstance.ezWrapPromiseResolveHandler(eResponse, failure))
            .catch(
                (err) => EzHttpHelper.ezInstance.ezWrapPromiseExceptionHandler(err, exhandler));
    }

    /**
     * @param {*} url
     * @param {*} employerId
     * @param {*} authToken
     * @param {*} developerToken
     * @param {*} payload
     * @param {*} success
     * @param {*} failure
     * @param {*} async
     * @param {*} before
     * @param {*} exhandler
     * @deprecated
     * Will remove in a future release
     * Stop all use and migrate to another solution.
     */
    httpPUTJsonWithAuth(url, employerId, authToken, developerToken, payload, success,
        failure, async, before, exhandler) {
        EzHttpHelper.ezInstance.httpJsonRequestWithAuth(
            'PUT',
            url,
            employerId,
            authToken,
            developerToken,
            payload,
            success,
            failure,
            async,
            before,
            exhandler);
    }

    /**
     * @public @method
     * @param {string} url
     * @param {string|null} payload
     * @param {function|null} success
     * @param {function|null} failure
     * @param {boolean|null} async
     * @param {function|null} before
     * @param {function|null} exhandler
     * @deprecated
     * Migrate to ezApi.ezclocker.ezHttpHelper.ezPutForm(url, payload, async, beforeHandler)
     */
    httpPUTForm(url, payload, success, failure, async, before, exhandler) {
        return EzHttpHelper.ezInstance.ezPutForm(
            url,
            payload,
            success,
            failure,
            async,
            before,
            exhandler)
            .then(
                (response) => EzHttpHelper.ezInstance.ezWrapPromiseResolveHandler(response, success),
                (eResponse) => EzHttpHelper.ezInstance.ezWrapPromiseResolveHandler(eResponse, failure))
            .catch(
                (err) => EzHttpHelper.ezInstance.ezWrapPromiseExceptionHandler(err, exhandler));
    }

    /**
     * @public @method
     * @param {string} formId
     * @param {function|null} success
     * @param {function|null} failure
     * @param {boolean|null} async
     * @param {function|null} before
     * @param {function|null} exhandler
     * @deprecated
     * Migrate to ezApi.ezclocker.ezHttpHelper.ezPutForm(...)
     */
    httpPUTFormData(formId, success, failure, async, before, exhandler) {
        let payload = $(formId).formData;

        let url = $(formId).attr('action');

        return EzHttpHelper.ezInstance.ezPutForm(
            url,
            payload,
            success,
            failure,
            async,
            before,
            exhandler)
            .then(
                (response) => EzHttpHelper.ezInstance.ezWrapPromiseResolveHandler(response, success),
                (eResponse) => EzHttpHelper.ezInstance.ezWrapPromiseResolveHandler(eResponse, failure))
            .catch(
                (err) => EzHttpHelper.ezInstance.ezWrapPromiseExceptionHandler(err, exhandler));
    }

    /**
     * @public @method
     * @param {string} url
     * @param {string|null} payload
     * @param {function|null} success
     * @param {function|null} failure
     * @param {boolean|null} async
     * @param {function|null} before
     * @param {function|null} exhandler
     * @deprecated
     * Migrate to ezApi.ezclocker.ezHttpHelper.ezDelete(url, payload, async, beforeHandler)
     */
    httpDELETE(url, payload, success, failure, async, before, exhandler) {
        EzHttpHelper.ezInstance.ezDelete(
            url,
            payload,
            async,
            before)
            .then(
                (response) => EzHttpHelper.ezInstance.ezWrapPromiseResolveHandler(response, success),
                (eResponse) => EzHttpHelper.ezInstance.ezWrapPromiseResolveHandler(eResponse, failure))
            .catch(
                (err) => EzHttpHelper.ezInstance.ezWrapPromiseExceptionHandler(err, exhandler));
    }

    /**
     * @public @method
     * @param {string} url
     * @param {string|null} payload
     * @param {function|null} success
     * @param {function|null} failure
     * @param {boolean|null} async
     * @param {function|null} before
     * @param {function|null} exhandler
     * @deprecated
     * Migrate to ezApi.ezclocker.ezHttpHelper.ezDelete(url, payload, async, beforeHandler)
     */
    httpDELETEJson(url, payload, success, failure, async, before, exhandler) {
        EzHttpHelper.ezInstance.ezDelete(
            url,
            payload,
            async,
            before)
            .then(
                (response) => EzHttpHelper.ezInstance.ezWrapPromiseResolveHandler(response, success),
                (eResponse) => EzHttpHelper.ezInstance.ezWrapPromiseResolveHandler(eResponse, failure))
            .catch(
                (err) => EzHttpHelper.ezInstance.ezWrapPromiseExceptionHandler(err, exhandler));
    }

    /**
     * @public @method
     * @param {*} url
     * @param {*} employerId
     * @param {*} authToken
     * @param {*} developerToken
     * @param {*} payload
     * @param {*} success
     * @param {*} failure
     * @param {*} async
     * @param {*} before
     * @param {*} exhandler
     * @deprecated
     * Will remove in a future release
     * Stop all use and migrate to another solution.
     */
    httpDELETEJsonWithAuth(url, employerId, authToken, developerToken, payload, success, failure, async, before, exhandler) {
        EzHttpHelper.ezInstance.httpJsonRequestWithAuth(
            'DELETE',
            url,
            employerId,
            authToken,
            developerToken,
            payload,
            success,
            failure, async, before, exhandler);
    }

    /**
     * @public @method
     * @param {string} url
     * @param {string|null} payload
     * @param {function|null} success
     * @param {function|null} failure
     * @param {boolean|null} async
     * @param {function|null} before
     * @param {function|null} exhandler
     * @deprecated
     * Migrate to ezApi.ezclocker.ezHttpHelper.ezDeleteForm(...)
     */
    httpDELETEForm(url, payload, success, failure, async, before, exhandler) {
        EzHttpHelper.ezInstance.httpFormRequest(
            'DELETE',
            url,
            payload,
            success,
            failure,
            async,
            before,
            exhandler);
    }

    /**
     * @public @method
     * Returns if the passed assumged ezclocker response object has an errorCode who's value is not zero
     * @param {boolean} response
     * @deprecated
     * Migrate to:
     *  EzHttpHelper.ezInstance.ezIsErrorResponse(response);
     */
    isErrorResponse(response) {
        return EzObject.isValid(response) &&
            (EzNumber.isNumber(response.errorCode) && 0 != response.errorCode) ||
            (EzString.isString(response.errorCode) && '0' !== response.errorCode);
    }

    /**
     * @public @method
     * Returns if the passed assumged ezclocker response object has an errorCode who's value is not zero
     * @param {boolean} response
     * @deprecated
     * Migrate to pre-processing http responses with:
     *  EzHttpHelper.ezInstance.ez{get|post|put|delete}(..)
     *      .then(
     *          EzServices.ezInstance.ezProcessApiResolve,
     *          EzServices.ezInstance.ezProcessApiReject)
     *      .then(
     *          (response) => { ... }, // success handling
     *          (eResponse) => { ... }); // failure handling
     */
    ezIsErrorResponse(response) {
        return EzObject.isValid(response) &&
            EzObject.hasOwnProperty(response, 'errorCode') &&
            (0 != response.errorCode || '0' !== response.errorCode);
    }

    /**
     * @public @method
     * Extract the error message from the assumged ezclocker response object
     * @param {*} response
     * @deprecated
     * Will remove in a future release
     * Stop all use and migrate to another solution.
     */
    extractErrorResponseMessage(response) {
        if (!response) {
            return EzHttpHelper.NO_ADDITIONAL_DETAILS_ERROR_MESSAGE;
        }

        if (!EzObject.hasOwnProperty(response, 'message')) {
            return EzHttpHelper.NO_ADDITIONAL_DETAILS_ERROR_MESSAGE;
        }

        if (!response.message) {
            return EzHttpHelper.NO_ADDITIONAL_DETAILS_ERROR_MESSAGE;
        }

        return response.message;
    }

    /**
     * @public @method
     * Extract the error code value from the assumged ezclocker response object. Will return -1 if none is found;
     * @param {*} response
     * @deprecated
     * Will remove in a future release
     * Stop all use and migrate to another solution.
     */
    extractErrorCode(response) {
        return !EzObject.isValid(response) || EzObject.hasOwnProperty(response, 'errorCode') ||
            !EzObject.isValid(response.errorCode)
            ? -1
            : response.errorCode;
    }

    /**
     * @public @method
     * Extract an error response from the assumed ezClocker response object format.
     * @param {*} response
     * @param {string} defaultMessage
     * @deprecated
     * Stop all use
     * Will remove in a future release
     */
    extractErrorResponseMessageOrDefault(response, defaultMessage) {
        if (!defaultMessage) {
            defaultMessage = EzHttpHelper.NO_ADDITIONAL_DETAILS_ERROR_MESSAGE;
        }

        if (!response) {
            return defaultMessage;
        }

        if (!EzObject.hasOwnProperty(response, 'message')) {
            return defaultMessage;
        }

        if (!response.message) {
            return defaultMessage;
        }

        return response.message;
    }

    /**
     * @public @method
     * Executes an HTTP post with media type application/x-www-form-urlencoded
     * @param {string} url
     * @param {string|null} formData
     * @param {boolean|null} async
     * @param {function|null} beforeHandler
     * @returns {Promise}
     * @deprecated
     * Migrate to ezApi.ezclocker.ezPostForm(...)
     */
    postForm(url, formData, async, beforeHandler) {
        return EzHttpHelper.ezInstance.ezPostForm(
            url,
            formData,
            async,
            beforeHandler);
    }

    /**
     * @public @method
     * Submits the form represented by the elementOrId param.
     * @param {String|Object} elementOrId
     * @returns {Object|null}
     * Returns the element (if any)
     * @deprecated Will remove in a future release
     */
    ezSubmitForm(elementOrId) {
        let element = ezApi.ezclocker.ezUi.ezFindByElementOrId(elementOrId);

        if (!EzObject.isValid(element)) {
            throw new EzBadParamException(
                'elementOrId',
                EzHttpHelper.ezInstance,
                EzHttpHelper.ezInstance.ezSubmitForm);
        }

        element.submit();

        return element;
    }

    /**
     * @public @method
     * Wraps a promise resolve response and forwards it to the provided successHandler method (if available)
     * If the successHandler is not a valid method, then EzPromise.resolve(response) is used instead.
     * @returns {*}
     * Returns the result from the call to successHandler(response) call if it is a valid function,
     * otherwise, returns EzPromise.reject(response).
     */
    ezWrapPromiseResolveHandler(response, successHandler) {
        return EzFunction.isFunction(success)
            ? successHandler(response)
            : EzPromise.resolve(response);
    }

    /**
     * @public @method
     * Wraps a promise reject response and forwards it to the provided failureHandler method (if available)
     * If the failureHandler is not a valid method, then EzPromise.reject(eResponse) is used instead.
     * @returns {*}
     * Returns the result from the failureHandler(...) call if it is a valid function.
     * Returns EzPromise.reject(eResponse) if failureHandler is not a valid function.
     */
    ezWrapPromiseRejectHandler(eResponse, failureHandler) {
        return EzFunction.isFunction(failureHandler)
            ? failureHandler(eResponse)
            : EzPromise.reject(eResponse);
    }

    /**
     * @public @method
     * Wraps a promise catch response and forwards it to the provided exceptionHandler method (if available)
     * Otherwise throws EzException for the err.
     * @returns {*}
     * Returns result from exceptionHandler(...) call if a valid function.
     * Otherwise, an exception is thrown and now return is made.
     */
    ezWrapPromiseExceptionHandler(err, exceptionHandler) {
        let em = err?.message
            ? err.message
            : 'No error message provided.';

        let exResponse = {
            errorCode: 500,
            message: em,
            err: err
        };

        if (EzFunction.isFunction(exceptionHandler)) {
            return exceptionHandler(exResponse);
        }

        throw new EzException(
            EzString.em`
                An unexpected exception occurred during an EzHttpHelper call.
                Message: ${em}`);
    }
}

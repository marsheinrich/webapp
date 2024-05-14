/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ENGINEERING NOTES
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    WARNING:
        1) Do not import anything from /ezlibrary/helpers/EzHelpers.js into this module
        2) Do not import the following into this module:
            import { EzApi } from '/public/common/javascript/ezapi.js';
            import { EzUI } from '/public/common/javascript/ezui.js';
            import { ezUI } from '/public/common/javascript/ezui.js';
            import { RequestMethod } from '/public/javascript/common/ezclocker-http-helper.js';
            import { EzMediaType } from '/public/javascript/common/ezclocker-http-helper.js';
            import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import axios from 'axios';

import { EzStaticClass } from '/ezlibrary/EzStaticClass.js';

import { EzConsole } from '/ezlibrary/helpers/EzConsole.js';
import { EzObject } from '/ezlibrary/helpers/EzObject.js';
import { EzPromise } from '/ezlibrary/helpers/EzPromise.js';
import { EzString } from '/ezlibrary/helpers/EzString.js';

/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ENGINEERING NOTES
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Import all enumerations individually for this file
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
import { EzHttpHeader } from '/ezlibrary/enums/EzHttpHeader.js';
import { EzHttpMediaType } from '/ezlibrary/enums/EzHttpMediaType.js';
import { EzHttpRequestMethod } from '/ezlibrary/enums/EzHttpRequestMethod.js';

/**
 * @class
 * @extends {EzStaticClass}
 * @description
 * Provides HTTP request method and properties
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with other helpers with:
 *  import {
 *      // .. other helepers ...
 *      EzHttp
 *  } from '/ezlibrary/helpers/EzHelpers.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *  import { EzHttp } from '/ezlibrary/helpers/EzHttp.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzHttp extends EzStaticClass {
    /**
     * @static
     * @public @method
     * Performs a request that updates status via the streamCallback method.
     * @param {undefined|null|string} ezHttpRequestMethod
     * A valid enum property value from EzHttpRequestMethod
     * Default: EzHttpRequestMethod.GET
     * @param {String} url
     * Param is required
     * @param {undefined|null|object} payload
     * Default: null
     * @param {undefined|null|object} params
     * Default: null
     * @param {undefined|null|object} headers
     * Default:
     *  {
     *      'Accept': EzHttpMediaType.APPLICATION_JSON
     *  }
     * @param {undefined|null|function} downloadStatusCallback
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
     * @param {undefined|null|function} uploadStatusCallback
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
     * @returns {Promise}
     * Promise.resolve returns an Axios success response object.
     * Promise.reject returns an Axios failure response object.
     * Example Axios Success Response:
     *  {
     *      // Response provided by the server
     *      data: {},
     *      // HTTP status code from the server response
     *      status: 200,
     *      // HTTP status message from the server response
     *      // As of HTTP/2 status text is blank or unsupported.
     *      // (HTTP/2 RFC: https://www.rfc-editor.org/rfc/rfc7540#section-8.1.2.4)
     *      statusText: 'OK',
     *      // HTTP headers that the server responded with
     *      // All header names are lower cased and can be accessed using the bracket notation.
     *      // Example: `response.headers['content-type']`
     *      headers: {},
     *      // The config that was provided to `axios` for the request
     *      config: {},
     *      // The request that generated this response
     *      // It is the last ClientRequest instance in node.js (in redirects)
     *      // and an XMLHttpRequest instance in the browser
     *      request: {}
     *  }
     */
    static async httpRequestAsync(
        ezHttpRequestMethod = EzHttpRequestMethod.GET,
        url = EzString.EMPTY,
        payload = null,
        params = null,
        headers = {
            'Accept': EzHttpMediaType.APPLICATION_JSON
        },
        downloadStatusCallback = null,
        uploadStatusCallback = null) {
        if (!EzString.hasLength(ezHttpRequestMethod)) {
            ezHttpRequestMethod = EzHttpRequestMethod.GET;
        }

        if (!EzString.hasLength(url)) {
            throw new EzBadParamException(
                'url',
                EzHttp,
                EzHttp.ezHttpRequest);
        }

        try {
            let axiosHeaders = EzObject.assignOrEmpty(headers);

            if (!axiosHeaders?.[EzHttpHeader.Accept]) {
                axiosHeaders[EzHttpHeader.Accept] = EzHttpMediaType.APPLICATION_JSON;
            }

            EzConsole.debug(`[EzHttp headers: ${JSON.stringify(axiosHeaders)}]`);

            ezHttpRequestMethod = EzHttpRequestMethod.ezAsEnum(ezHttpRequestMethod).toLowerCase();

            switch (ezHttpRequestMethod) {
                case EzHttpRequestMethod.post:
                case EzHttpRequestMethod.put:
                case EzHttpRequestMethod.patch:
                    if (!axiosHeaders?.[EzHttpHeader.Content_Type]) {
                        axiosHeaders[EzHttpHeader.Content_Type] = EzString.stringOrDefault(
                            contentMediaType,
                            EzHttpMediaType.APPLICATION_JSON);
                    }

                    break;
                default:
                // Do not auto-add content-type header
            }

            let axiosRequestConfig = {
                url: url,
                method: ezHttpRequestMethod,
                headers: axiosHeaders,
                params: EzObject.assignOrNull(params),
                data: EzObject.assignOrNull(payload),
                timeout: 20000,
                responseType: axiosHeaders[EzHttpHeader.Accept],
                responseEncoding: 'utf8',
                onDownloadProgress: (downloadProgress) => {
                    if (EzFunction.isFunction(downloadStatusCallback)) {
                        downloadStatusCallback(downloadProgress);
                    }
                },
                onUploadProgress: (uploadProgress) => {
                    if (EzFunction.isFunction(uploadStatusCallback)) {
                        uploadStatusCallback(uploadProgress);
                    }
                }
            };

            EzConsole.info(`[EzHttp Request: ${JSON.stringify(axiosRequestConfig)}]`);

            await axios(axiosRequestConfig);
        } catch (err) {
            return EzPromise.reject(err);
        }
    }

    /**
     * @public
     * Performs an HTTP request using AXIOS with assumed accept and content type (if payload is not null) as Application/JSON     *
     * @param {string} url
     * @param {undefined|null|*} payload
     * Default: null
     * @param {undefined|null|object} params
     * Default: null
     * @param {undefined|null|object} headers
     * Default:
     *  {
     *      'Content-Type': EzHttpMediaType.APPLICATION_JSON,
     *      'Accept': EzHttpMediaType.APPLICATION_JSON
     *  }
     * @returns {Promise}
     */
    static async post(
        url,
        payload = null,
        params = null,
        headers = {
            'Content-Type': EzHttpMediaType.APPLICATION_JSON,
            'Accept': EzHttpMediaType.APPLICATION_JSON
        }) {
        return await EzHttp.httpRequest(
            // ezHttpRequestMethod
            EzHttpRequestMethod.post,
            // url
            url,
            // payload
            payload,
            // params
            params,
            // headers
            headers,
            // downloadStatusCallback,
            null,
            // uploadStatusCallback
            null);
    }

    /**
     * @public
     * Performs an HTTP request using AXIOS with assumed accept and content type (if payload is not null) as Application/JSON     *
     * @param {string} url
     * @param {undefined|null|*} payload
     * Default: null
     * @param {undefined|null|object} params
     * Default: null
     * @param {undefined|null|object} headers
     * Default:
     *  {
     *      'Content-Type': EzHttpMediaType.APPLICATION_JSON,
     *      'Accept': EzHttpMediaType.APPLICATION_JSON
     *  }
     * @returns {Promise}
     */
    static async get(
        url,
        params = null,
        headers = {
            'Content-Type': EzHttpMediaType.APPLICATION_JSON,
            'Accept': EzHttpMediaType.APPLICATION_JSON
        }) {
        return await EzHttp.httpRequest(
            // ezHttpRequestMethod
            EzHttpRequestMethod.get,
            // url
            url,
            // payload
            null,
            // params
            params,
            // headers
            headers,
            // downloadStatusCallback,
            null,
            // uploadStatusCallback
            null);
    }

    /**
     * @public
     * Performs an HTTP request using AXIOS with assumed accept and content type (if payload is not null) as Application/JSON     *
     * @param {string} url
     * @param {undefined|null|*} payload
     * Default: null
     * @param {undefined|null|object} params
     * Default: null
     * @param {undefined|null|object} headers
     * Default:
     *  {
     *      'Content-Type': EzHttpMediaType.APPLICATION_JSON,
     *      'Accept': EzHttpMediaType.APPLICATION_JSON
     *  }
     * @returns {Promise}
     */
    static async put(
        url,
        payload = null,
        params = null,
        headers = {
            'Content-Type': EzHttpMediaType.APPLICATION_JSON,
            'Accept': EzHttpMediaType.APPLICATION_JSON
        }) {
        return await EzHttp.httpRequest(
            // ezHttpRequestMethod
            EzHttpRequestMethod.put,
            // url
            url,
            // Payload
            payload,
            // params
            params,
            // headers
            headers,
            // downloadStatusCallback,
            null,
            // uploadStatusCallback
            null);
    }

    /**
     * @public
     * Performs an HTTP request using AXIOS with assumed accept and content type (if payload is not null) as Application/JSON     *
     * @param {string} url
     * @param {undefined|null|*} payload
     * Default: null
     * @param {undefined|null|object} params
     * Default: null
     * @param {undefined|null|object} headers
     * Default:
     *  {
     *      'Content-Type': EzHttpMediaType.APPLICATION_JSON,
     *      'Accept': EzHttpMediaType.APPLICATION_JSON
     *  }
     * @returns {Promise}
     */
    static async delete(
        url,
        params = null,
        headers = {
            'Accept': EzHttpMediaType.APPLICATION_JSON
        }) {
        return await EzHttp.httpRequest(
            // ezHttpRequestMethod
            EzHttpRequestMethod.delete,
            // url
            url,
            // payload
            null,
            // Params
            params,
            // headers
            headers,
            // downloadStatusCallback,
            null,
            // uploadStatusCallback
            null);
    }
}

import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

import { EzHttpStatusCode } from '/ezlibrary/entities/EzHttpStatusCode.js';

/**
 * @class
 * @extends {EzEnumeration2}
 * Defines the exclocker error codes that might return from service calls.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * See also:
 *      Each enumeration's ezData value is a instance of
 *      EzHttpStatusCode class from /ezlibrary/entities/EzHttpStatusCode.js
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import into non-enumeration classes with:
 *     import {
 *         // ... other enumeration classes ...,
 *         EzHttpStatus
 *     }
 *     from '/ezlibrary/enums/EzEnumerations.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import into other enumeration classes with:
 *     import { EzHttpStatus } from '/ezlibrary/enums/EzHttpStatus.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzHttpStatus extends EzEnumeration2 {
    /**
     * @private @field
     * Stores the singleton instance of this enumeration class.
     * @type {EzHttpStatus}
     */
    static #ezEnumerationSingleton = null;

    /**
     * @static
     * Static Initialization
     */
    static {
        if (null == EzHttpStatus.#ezEnumerationSingleton) {
            EzHttpStatus.#ezEnumerationSingleton = new EzHttpStatus(
                // Enum property names
                [
                    'UNKNOWN',

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        1xx Informational Status Codes
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */

                    /**
                     * 100 Continue
                     * https://tools.ietf.org/html/rfc7231#section-6.2.1
                     */
                    'CONTINUE',
                    /**
                     * 101 Switching Protocols
                     * https://tools.ietf.org/html/rfc7231#section-6.2.2
                     */
                    'SWITCHING_PROTOCOLS',
                    /**
                     * 102 Processing
                     * https://tools.ietf.org/html/rfc2518#section-10.1
                     */
                    'PROCESSING',
                    /**
                     * 103 Checkpoint
                     * https://code.google.com/p/gears/wiki/ResumableHttpRequestsProposal'>A proposal for supporting
                     * resumable POST/PUT HTTP requests in HTTP/1.0</a>
                     */
                    'CHECKPOINT',

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        2xx Success Status Codes
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */

                    /**
                     * 200 OK
                     * https://tools.ietf.org/html/rfc7231#section-6.3.1
                     */
                    'OK',
                    /**
                     * 201 Created
                     * https://tools.ietf.org/html/rfc7231#section-6.3.2
                     */
                    'CREATED',
                    /**
                     * 202 Accepted
                     * https://tools.ietf.org/html/rfc7231#section-6.3.3
                     */
                    'ACCEPTED',
                    /**
                     * 203 Non-Authoritative Information
                     * https://tools.ietf.org/html/rfc7231#section-6.3.4
                     */
                    'NON_AUTHORITATIVE_INFORMATION',
                    /**
                     * 204 No Content
                     * https://tools.ietf.org/html/rfc7231#section-6.3.5
                     */
                    'NO_CONTENT',
                    /**
                     * 205 Reset Content
                     * https://tools.ietf.org/html/rfc7231#section-6.3.6
                     */
                    'RESET_CONTENT',
                    /**
                     * 206 Partial Content
                     * https://tools.ietf.org/html/rfc7233#section-4.1
                     */
                    'PARTIAL_CONTENT',
                    /**
                     * 207 Multi-Status
                     * https://tools.ietf.org/html/rfc4918#section-13
                     */
                    'MULTI_STATUS',
                    /**
                     * 208 Already Reported
                     * https://tools.ietf.org/html/rfc5842#section-7.1
                     */
                    'ALREADY_REPORTED',
                    /**
                     * 226 IM Used
                     * https://tools.ietf.org/html/rfc3229#section-10.4.1
                     */
                    'IM_USED',

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        3xx Redirection Status Codes
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */

                    /**
                     * 300 Multiple Choices
                     * https://tools.ietf.org/html/rfc7231#section-6.4.1
                     */
                    'MULTIPLE_CHOICES',
                    /**
                     * 301 Moved Permanently
                     * https://tools.ietf.org/html/rfc7231#section-6.4.2
                     */
                    'MOVED_PERMANENTLY',
                    /**
                     * 302 Found
                     * https://tools.ietf.org/html/rfc7231#section-6.4.3
                     */
                    'FOUND',
                    /**
                     * 302 Moved Temporarily
                     * https://tools.ietf.org/html/rfc1945#section-9.3
                     * @deprecated
                     * Use EzHttpStatus.FOUND (302 Found) instead
                     */
                    'MOVED_TEMPORARILY',
                    /**
                     * 303 See Other
                     * https://tools.ietf.org/html/rfc7231#section-6.4.4
                     */
                    'SEE_OTHER',
                    /**
                     * 304 Not Modified
                     * https://tools.ietf.org/html/rfc7232#section-4.1
                     */
                    'NOT_MODIFIED',
                    /**
                     * 305 Use Proxy
                     * https://tools.ietf.org/html/rfc7231#section-6.4.5
                     * @deprecated
                     * Stop use due to security concerns regarding in-band configuration of a proxy
                     */
                    'USE_PROXY',
                    /**
                     * 307 Temporary Redirect
                     * https://tools.ietf.org/html/rfc7231#section-6.4.7
                     */
                    'TEMPORARY_REDIRECT',
                    /**
                     * 308 Permanent Redirect
                     * https://tools.ietf.org/html/rfc7238
                     */
                    'PERMANENT_REDIRECT',

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        4xx Client Error Status Codes
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */

                    /**
                     * 400 Bad Request
                     * https://tools.ietf.org/html/rfc7231#section-6.5.1
                     */
                    'BAD_REQUEST',
                    /**
                     * 401 Unauthorized
                     * https://tools.ietf.org/html/rfc7235#section-3.1
                     */
                    'UNAUTHORIZED',
                    /**
                     * 402 Payment Required
                     * https://tools.ietf.org/html/rfc7231#section-6.5.2
                     */
                    'PAYMENT_REQUIRED',
                    /**
                     * 403 Forbidden
                     * https://tools.ietf.org/html/rfc7231#section-6.5.3
                     */
                    'FORBIDDEN',
                    /**
                     * 404 Not Found
                     * https://tools.ietf.org/html/rfc7231#section-6.5.4
                     */
                    'NOT_FOUND',
                    /**
                     * 405 Method Not Allowed
                     * https://tools.ietf.org/html/rfc7231#section-6.5.5
                     */
                    'METHOD_NOT_ALLOWED',
                    /**
                     * 406 Not Acceptable
                     * https://tools.ietf.org/html/rfc7231#section-6.5.6
                     */
                    'NOT_ACCEPTABLE',
                    /**
                     * 407 Proxy Authentication Required
                     * https://tools.ietf.org/html/rfc7235#section-3.2
                     */
                    'PROXY_AUTHENTICATION_REQUIRED',
                    /**
                     * 408 Request Timeout
                     * https://tools.ietf.org/html/rfc7231#section-6.5.7
                     */
                    'REQUEST_TIMEOUT',
                    /**
                     * 409 Conflict
                     * https://tools.ietf.org/html/rfc7231#section-6.5.8
                     */
                    'CONFLICT',
                    /**
                     * 410 Gone
                     * https://tools.ietf.org/html/rfc7231#section-6.5.9
                     */
                    'GONE',
                    /**
                     * 411 Length Required
                     * https://tools.ietf.org/html/rfc7231#section-6.5.10
                     */
                    'LENGTH_REQUIRED',
                    /**
                     * 412 Precondition failed
                     * https://tools.ietf.org/html/rfc7232#section-4.2
                     */
                    'PRECONDITION_FAILED',
                    /**
                     * 413 Payload Too Large
                     * https://tools.ietf.org/html/rfc7231#section-6.5.11
                     */
                    'PAYLOAD_TOO_LARGE',
                    /**
                     * 413 Request Entity Too Large
                     * https://tools.ietf.org/html/rfc2616#section-10.4.14
                     * @deprecated
                     * Use EzHttpStatus.PAYLOAD_TOO_LARGE (413 Payload Too Large) instead.
                     */
                    'REQUEST_ENTITY_TOO_LARGE',
                    /**
                     * 414 URI Too Long
                     * https://tools.ietf.org/html/rfc7231#section-6.5.12
                     */
                    'URI_TOO_LONG',
                    /**
                     * 414 Request-URI Too Long
                     * https://tools.ietf.org/html/rfc2616#section-10.4.15
                     * @deprecated in favor of {@link #URI_TOO_LONG} which will be returned from HttpStatus.valueOf(414)}
                     */
                    'REQUEST_URI_TOO_LONG',
                    /**
                     * 415 Unsupported Media Type
                     * https://tools.ietf.org/html/rfc7231#section-6.5.13
                     */
                    'UNSUPPORTED_MEDIA_TYPE',
                    /**
                     * 416 Requested Range Not Satisfiable
                     * https://tools.ietf.org/html/rfc7233#section-4.4
                     */
                    'REQUESTED_RANGE_NOT_SATISFIABLE',
                    /**
                     * 417 Expectation Failed
                     * https://tools.ietf.org/html/rfc7231#section-6.5.14
                     */
                    'EXPECTATION_FAILED',
                    /**
                     * 418 I'm a teapot
                     * https://tools.ietf.org/html/rfc2324#section-2.3.2
                     */
                    'I_AM_A_TEAPOT',
                    /**
                     * 419 Insufficient Space On Resource
                     * @deprecated
                     * https://tools.ietf.org/rfcdiff?difftype=--hwdiff&url2=draft-ietf-webdav-protocol-06.txt
                     */
                    'INSUFFICIENT_SPACE_ON_RESOURCE',
                    /**
                     * 420 Method Failure
                     * @deprecated
                     * https://tools.ietf.org/rfcdiff?difftype=--hwdiff&url2=draft-ietf-webdav-protocol-06.txt
                     */
                    'METHOD_FAILURE',
                    /**
                     * 421 Destination Locked
                     * @deprecated
                     * https://tools.ietf.org/rfcdiff?difftype=--hwdiff&url2=draft-ietf-webdav-protocol-06.txt
                     */
                    'DESTINATION_LOCKED',
                    /**
                     * 422 Unprocessable Entity
                     * https://tools.ietf.org/html/rfc4918#section-11.2
                     */
                    'UNPROCESSABLE_ENTITY',
                    /**
                     * 423 Locked
                     * https://tools.ietf.org/html/rfc4918#section-11.3
                     */
                    'LOCKED',
                    /**
                     * 424 Failed Dependency
                     * https://tools.ietf.org/html/rfc4918#section-11.4
                     */
                    'FAILED_DEPENDENCY',
                    /**
                     * 426 Upgrade Required
                     * https://tools.ietf.org/html/rfc2817#section-6
                     */
                    'UPGRADE_REQUIRED',
                    /**
                     * 428 Precondition Required
                     * https://tools.ietf.org/html/rfc6585#section-3
                     */
                    'PRECONDITION_REQUIRED',
                    /**
                     * 429 Too Many Requests
                     * https://tools.ietf.org/html/rfc6585#section-4
                     */
                    'TOO_MANY_REQUESTS',
                    /**
                     * 431 Request Header Fields Too Large
                     * https://tools.ietf.org/html/rfc6585#section-5
                     */
                    'REQUEST_HEADER_FIELDS_TOO_LARGE',
                    /**
                     * 451 Unavailable For Legal Reasons
                     * https://tools.ietf.org/html/draft-ietf-httpbis-legally-restricted-status-04
                     */
                    'UNAVAILABLE_FOR_LEGAL_REASONS',

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        5xx Server Error Status Codes
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */

                    /**
                     * 500 Internal Server Error
                     * https://tools.ietf.org/html/rfc7231#section-6.6.1
                     */
                    'INTERNAL_SERVER_ERROR',
                    /**
                     * 501 Not Implemented
                     * https://tools.ietf.org/html/rfc7231#section-6.6.2
                     */
                    'NOT_IMPLEMENTED',
                    /**
                     * 502 Bad Gateway
                     * https://tools.ietf.org/html/rfc7231#section-6.6.3
                     */
                    'BAD_GATEWAY',
                    /**
                     * 503 Service Unavailable
                     * https://tools.ietf.org/html/rfc7231#section-6.6.4
                     */
                    'SERVICE_UNAVAILABLE',
                    /**
                     * 504 Gateway Timeout
                     * https://tools.ietf.org/html/rfc7231#section-6.6.5
                     */
                    'GATEWAY_TIMEOUT',
                    /**
                     * 505 HTTP Version Not Supported
                     * https://tools.ietf.org/html/rfc7231#section-6.6.6
                     */
                    'HTTP_VERSION_NOT_SUPPORTED',
                    /**
                     * 506 Variant Also Negotiates}
                     * https://tools.ietf.org/html/rfc2295#section-8.1
                     */
                    'VARIANT_ALSO_NEGOTIATES',
                    /**
                     * 507 Insufficient Storage}
                     * https://tools.ietf.org/html/rfc4918#section-11.5
                     */
                    'INSUFFICIENT_STORAGE',
                    /**
                     * 508 Loop Detected}
                     * https://tools.ietf.org/html/rfc5842#section-7.2
                     */
                    'LOOP_DETECTED',
                    /**
                     * 509 Bandwidth Limit Exceeded}
                     */
                    'BANDWIDTH_LIMIT_EXCEEDED',
                    /**
                     * 510 Not Extended}
                     * https://tools.ietf.org/html/rfc2774#section-7
                     */
                    'NOT_EXTENDED',
                    /**
                     * 511 Network Authentication Required
                     * https://tools.ietf.org/html/rfc6585#section-6
                     */
                    'NETWORK_AUTHENTICATION_REQUIRED',
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                [
                    /**
                     * UNKNOWN
                     */

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        1xx Informational Status Codes
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */

                    0,
                    /**
                     * 100 Continue
                     */
                    100,
                    /**
                     * 101 Switching Protocols
                     */
                    101,
                    /**
                     * 102 Processing
                     */
                    102,
                    /**
                     * 103 Checkpoint
                     */
                    103,

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        2xx Success Status Codes
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */

                    /**
                     * 200 OK
                     */
                    200,
                    /**
                     * 201 Created
                     */
                    201,
                    /**
                     * 202 Accepted
                     */
                    202,
                    /**
                     * 203 Non-Authoritative Information
                     */
                    203,
                    /**
                     * 204 No Content
                     */
                    204,
                    /**
                     * 205 Reset Content
                     */
                    205,
                    /**
                     * 206 Partial Content
                     */
                    206,
                    /**
                     * 207 Multi-Status
                     */
                    207,
                    /**
                     * 208 Already Reported
                     */
                    208,
                    /**
                     * 226 IM Used
                     */
                    226,

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        3xx Redirection Status Codes
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */

                    /**
                     * 300 Multiple Choices
                     */
                    300,
                    /**
                     * 301 Moved Permanently
                     */
                    301,
                    /**
                     * 302 Found
                     */
                    302,
                    /**
                     * 302 Moved Temporarily
                     * @deprecated
                     * Use EzHttpStatus.FOUND (302 Found) instead
                     */
                    302,
                    /**
                     * 303 See Other
                     */
                    303,
                    /**
                     * 304 Not Modified
                     */
                    304,
                    /**
                     * 305 Use Proxy
                     * @deprecated
                     * Due to security concerns regarding in-band configuration of a proxy
                     */
                    305,
                    /**
                     * 307 Temporary Redirect
                     */
                    307,
                    /**
                     * 308 Permanent Redirect
                     */
                    308,

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        4xx Client Error Status Codes
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */

                    /**
                     * 400 Bad Request
                     */
                    400,
                    /**
                     * 401 Unauthorized
                     */
                    401,
                    /**
                     * 402 Payment Required
                     */
                    402,
                    /**
                     * 403 Forbidden
                     */
                    403,
                    /**
                     * 404 Not Found
                     */
                    404,
                    /**
                     * 405 Method Not Allowed
                     */
                    405,
                    /**
                     * 406 Not Acceptable
                     */
                    406,
                    /**
                     * 407 Proxy Authentication Required
                     */
                    407,
                    /**
                     * 408 Request Timeout
                     */
                    408,
                    /**
                     * 409 Conflict
                     */
                    409,
                    /**
                     * 410 Gone
                     */
                    410,
                    /**
                     * 411 Length Required
                     */
                    411,
                    /**
                     * 412 Precondition failed
                     */
                    412,
                    /**
                     * 413 Payload Too Large
                     */
                    413,
                    /**
                     * 413 Request Entity Too Large
                     * @deprecated
                     */
                    413,
                    /**
                     * 414 URI Too Long
                     */
                    414,
                    /**
                     * 414 Request-URI Too Long
                     * @deprecated
                     */
                    414,
                    /**
                     * 415 Unsupported Media Type
                     */
                    415,
                    /**
                     * 416 Requested Range Not Satisfiable
                     */
                    416,
                    /**
                     * 417 Expectation Failed
                     */
                    417,
                    /**
                     * 418 I'm a teapot
                     */
                    418,
                    /**
                     * 419 Insufficient Space On Resource
                     * @deprecated
                     */
                    419,
                    /**
                     * 420 Method Failure
                     * @deprecated
                     */
                    420,
                    /**
                     * 421 Destination Locked
                     * @deprecated
                     */
                    421,
                    /**
                     * 422 Unprocessable Entity
                     */
                    422,
                    /**
                     * 423 Locked
                     */
                    423,
                    /**
                     * 424 Failed Dependency
                     */
                    424,
                    /**
                     * 426 Upgrade Required
                     */
                    426,
                    /**
                     * 428 Precondition Required
                     */
                    428,
                    /**
                     * 429 Too Many Requests
                     */
                    429,
                    /**
                     * 431 Request Header Fields Too Large
                     */
                    431,
                    /**
                     * 451 Unavailable For Legal Reasons
                     * An HTTP Status Code to Report Legal Obstacles</a>
                     * @since 4.3
                     */
                    451,

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        5xx Server Error Status Codes
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */

                    /**
                     * 500 Internal Server Error
                     */
                    500,
                    /**
                     * 501 Not Implemented
                     */
                    501,
                    /**
                     * 502 Bad Gateway
                     */
                    502,
                    /**
                     * 503 Service Unavailable
                     */
                    503,
                    /**
                     * 504 Gateway Timeout
                     */
                    504,
                    /**
                     * 505 HTTP Version Not Supported
                     */
                    505,
                    /**
                     * 506 Variant Also Negotiates}
                     */
                    506,
                    /**
                     * 507 Insufficient Storage
                     */
                    507,
                    /**
                     * 508 Loop Detected}
                     */
                    508,
                    /**
                     * 509 Bandwidth Limit Exceeded}
                     */
                    509,
                    /**
                     * 510 Not Extended
                     */
                    510,
                    /**
                     * 511 Network Authentication Required
                     */
                    511,
                ],
                // Optional array of additional data for eac enumeration property.
                // Enter null if not needed.
                [
                    /**
                     * UNKNOWN
                     */
                    new EzHttpStatusCode(0, 'Unknown'),

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        1xx Informational Status Codes
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */

                    /**
                     * 100 Continue
                     */
                    new EzHttpStatusCode(100, 'Continue'),
                    /**
                     * 101 Switching Protocols
                     */
                    new EzHttpStatusCode(101, 'Switching Protocols'),
                    /**
                     * 102 Processing
                     */
                    new EzHttpStatusCode(102, 'Processing'),
                    /**
                     * 103 Checkpoint
                     */
                    new EzHttpStatusCode(103, 'Checkpoint'),

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        2xx Success Status Codes
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */

                    /**
                     * 200 OK
                     */
                    new EzHttpStatusCode(200, 'OK'),
                    /**
                     * 201 Created
                     */
                    new EzHttpStatusCode(201, 'Created'),
                    /**
                     * 202 Accepted
                     */
                    new EzHttpStatusCode(202, 'Accepted'),
                    /**
                     * 203 Non-Authoritative Information
                     */
                    new EzHttpStatusCode(203, 'Non-Authoritative Information'),
                    /**
                     * 204 No Content
                     */
                    new EzHttpStatusCode(204, 'No Content'),
                    /**
                     * 205 Reset Content
                     */
                    new EzHttpStatusCode(205, 'Reset Content'),
                    /**
                     * 206 Partial Content
                     */
                    new EzHttpStatusCode(206, 'Partial Content'),
                    /**
                     * 207 Multi-Status
                     */
                    new EzHttpStatusCode(207, 'Multi-Status'),
                    /**
                     * 208 Already Reported
                     */
                    new EzHttpStatusCode(208, 'Already Reported'),
                    /**
                     * 226 IM Used
                     */
                    new EzHttpStatusCode(226, 'IM Used'),

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        3xx Redirection Status Codes
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */

                    /**
                     * 300 Multiple Choices
                     */
                    new EzHttpStatusCode(300, 'Multiple Choices'),
                    /**
                     * 301 Moved Permanently
                     */
                    new EzHttpStatusCode(301, 'Moved Permanently'),
                    /**
                     * 302 Found
                     */
                    new EzHttpStatusCode(302, 'Found'),
                    /**
                     * 302 Moved Temporarily
                     * @deprecated
                     * Use EzHttpStatus.FOUND (302 Found) instead
                     */
                    new EzHttpStatusCode(302, 'Moved Temporarily'),
                    /**
                     * 303 See Other
                     */
                    new EzHttpStatusCode(303, 'See Other'),
                    /**
                     * 304 Not Modified
                     */
                    new EzHttpStatusCode(304, 'Not Modified'),
                    /**
                     * 305 Use Proxy
                     * @deprecated
                     * Due to security concerns regarding in-band configuration of a proxy
                     */
                    new EzHttpStatusCode(305, 'Use Proxy'),
                    /**
                     * 307 Temporary Redirect
                     */
                    new EzHttpStatusCode(307, 'Temporary Redirect'),
                    /**
                     * 308 Permanent Redirect
                     */
                    new EzHttpStatusCode(308, 'Permanent Redirect'),

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        4xx Client Error Status Codes
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */

                    /**
                     * 400 Bad Request
                     */
                    new EzHttpStatusCode(400, 'Bad Request'),
                    /**
                     * 401 Unauthorized
                     */
                    new EzHttpStatusCode(401, 'Unauthorized'),
                    /**
                     * 402 Payment Required
                     */
                    new EzHttpStatusCode(402, 'Payment Required'),
                    /**
                     * 403 Forbidden
                     */
                    new EzHttpStatusCode(403, 'Forbidden'),
                    /**
                     * 404 Not Found
                     */
                    new EzHttpStatusCode(404, 'Not Found'),
                    /**
                     * 405 Method Not Allowed
                     */
                    new EzHttpStatusCode(405, 'Method Not Allowed'),
                    /**
                     * 406 Not Acceptable
                     */
                    new EzHttpStatusCode(406, 'Not Acceptable'),
                    /**
                     * 407 Proxy Authentication Required
                     */
                    new EzHttpStatusCode(407, 'Proxy Authentication Required'),
                    /**
                     * 408 Request Timeout
                     */
                    new EzHttpStatusCode(408, 'Request Timeout'),
                    /**
                     * 409 Conflict
                     */
                    new EzHttpStatusCode(409, 'Conflict'),
                    /**
                     * 410 Gone
                     */
                    new EzHttpStatusCode(410, 'Gone'),
                    /**
                     * 411 Length Required
                     */
                    new EzHttpStatusCode(411, 'Length Required'),
                    /**
                     * 412 Precondition failed
                     */
                    new EzHttpStatusCode(412, 'Precondition Failed'),
                    /**
                     * 413 Payload Too Large
                     */
                    new EzHttpStatusCode(413, 'Payload Too Large'),
                    /**
                     * 413 Request Entity Too Large
                     * @deprecated
                     */
                    new EzHttpStatusCode(413, 'Request Entity Too Large'),
                    /**
                     * 414 URI Too Long
                     */
                    new EzHttpStatusCode(414, 'URI Too Long'),
                    /**
                     * 414 Request-URI Too Long
                     * @deprecated
                     */
                    new EzHttpStatusCode(414, 'Request-URI Too Long'),
                    /**
                     * 415 Unsupported Media Type
                     */
                    new EzHttpStatusCode(415, 'Unsupported Media Type'),
                    /**
                     * 416 Requested Range Not Satisfiable
                     */
                    new EzHttpStatusCode(416, 'Requested range not satisfiable'),
                    /**
                     * 417 Expectation Failed
                     */
                    new EzHttpStatusCode(417, 'Expectation Failed'),
                    /**
                     * 418 I'm a teapot
                     */
                    new EzHttpStatusCode(418, 'I\'m a teapot'),
                    /**
                     * 419 Insufficient Space On Resource
                     * @deprecated
                     */
                    new EzHttpStatusCode(419, 'Insufficient Space On Resource'),
                    /**
                     * 420 Method Failure
                     * @deprecated
                     */
                    new EzHttpStatusCode(420, 'Method Failure'),
                    /**
                     * 421 Destination Locked
                     * @deprecated
                     */
                    new EzHttpStatusCode(421, 'Destination Locked'),
                    /**
                     * 422 Unprocessable Entity
                     */
                    new EzHttpStatusCode(422, 'Unprocessable Entity'),
                    /**
                     * 423 Locked
                     */
                    new EzHttpStatusCode(423, 'Locked'),
                    /**
                     * 424 Failed Dependency
                     */
                    new EzHttpStatusCode(424, 'Failed Dependency'),
                    /**
                     * 426 Upgrade Required
                     */
                    new EzHttpStatusCode(426, 'Upgrade Required'),
                    /**
                     * 428 Precondition Required
                     */
                    new EzHttpStatusCode(428, 'Precondition Required'),
                    /**
                     * 429 Too Many Requests
                     */
                    new EzHttpStatusCode(429, 'Too Many Requests'),
                    /**
                     * 431 Request Header Fields Too Large
                     */
                    new EzHttpStatusCode(431, 'Request Header Fields Too Large'),
                    /**
                     * 451 Unavailable For Legal Reasons
                     * An HTTP Status Code to Report Legal Obstacles</a>
                     * @since 4.3
                     */
                    new EzHttpStatusCode(451, 'Unavailable For Legal Reasons'),

                    /*
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        5xx Server Error Status Codes
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    */

                    /**
                     * 500 Internal Server Error
                     */
                    new EzHttpStatusCode(500, 'Internal Server Error'),
                    /**
                     * 501 Not Implemented
                     */
                    new EzHttpStatusCode(501, 'Not Implemented'),
                    /**
                     * 502 Bad Gateway
                     */
                    new EzHttpStatusCode(502, 'Bad Gateway'),
                    /**
                     * 503 Service Unavailable
                     */
                    new EzHttpStatusCode(503, 'Service Unavailable'),
                    /**
                     * 504 Gateway Timeout
                     */
                    new EzHttpStatusCode(504, 'Gateway Timeout'),
                    /**
                     * 505 HTTP Version Not Supported
                     */
                    new EzHttpStatusCode(505, 'HTTP Version not supported'),
                    /**
                     * 506 Variant Also Negotiates}
                     */
                    new EzHttpStatusCode(506, 'Variant Also Negotiates'),
                    /**
                     * 507 Insufficient Storage
                     */
                    new EzHttpStatusCode(507, 'Insufficient Storage'),
                    /**
                     * 508 Loop Detected}
                     */
                    new EzHttpStatusCode(508, 'Loop Detected'),
                    /**
                     * 509 Bandwidth Limit Exceeded}
                     */
                    new EzHttpStatusCode(509, 'Bandwidth Limit Exceeded'),
                    /**
                     * 510 Not Extended
                     */
                    new EzHttpStatusCode(510, 'Not Extended'),
                    /**
                     * 511 Network Authentication Required
                     */
                    new EzHttpStatusCode(511, 'Network Authentication Required')
                ]);
        }
    }
}

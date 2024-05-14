import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

import { EzRequestMethod } from '/ezlibrary/enums/EzRequestMethod.js';

/**
 * @class
 * @extends {EzEnumeration2}
 * @description
 * Enumeration for RequestMethods
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import into non-enumeration classes with:
 *     import {
 *         // ... other enumeration classes ...
 *         EzHttpHeader
 *     } from '/ezlibrary/enums/EzEnumerations.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import into other enumeration classes with:
 *     import { EzHttpHeader } from '/ezlibrary/enums/EzHttpHeader.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Access only static properties and methods
 *      EzHttpHeader.{PROPERTY_NAME}
 *      EzHttpHeader.ezNames()
 *      EzHttpHeader.ezValues()
 *      EzHttpHeader.ezData(EzHttpRequestMethod.{PROPERTY_NAME})
 *      EzHttpHeader.ezNameOf({PROPERTY_VALUE})
 *      EzHttpHeader.ezValueOf({PROPERTY_VALUE})
 *      EzHttpHeader.ezAsEnum({PROPERTY_VALUE})
 *      EzHttpHeader.ezEnumData(EzHttpRequestMethod.{PROPERTY_NAME})
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzHttpHeader extends EzEnumeration2 {
    /**
     * @private @field
     * Stores the singleton instance of this enumeration class.
     * @type {EzHttpHeader}
     */
    static #ezEnumerationSingleton = null;

    /**
     * @static
     * Static Initialization
     */
    static {
        if (null == EzHttpHeader.#ezEnumerationSingleton) {
            EzHttpHeader.#ezEnumerationSingleton = new EzRequestMethod(
                // Enum property names
                [
                    // Represents an unknown or never set header name
                    'UNKNOWN',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * EzClocker Response Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Authentication status header (response only)
                    'x_ezclocker_auth_status',
                    // Server environment (response only)
                    'x_ezclocker_environment',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * EzClocker Public API Authentication Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Public API Authentication Auth Token
                    'x_ezclocker_authtoken',
                    // Public API Authentication Developer Token
                    'x_ezclocker_developertoken',
                    // Public API Authentication: Authenticating employer id
                    'x_ezclocker_employerid',
                    // Public API Authentication: Authenticating manager id
                    'x_ezclocker_manager_id',
                    // Public API Authentication: Authenticating payroll manager id
                    'x_ezclocker_payroll_manager_id',
                    // Public API Authentication: Authenticating employee id
                    'x_ezclocker_employeeid',
                    // Public API Authentication: Authenticating personal id
                    'x_ezclocker_personal_id',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * Content Negotiation Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Informs the server about the types of data that can be sent back.
                    'Accept',
                    // The encoding algorithm, usually a compression algorithm, that can be used on the resource sent back.
                    'Accept_Encoding',
                    // Informs the server about the human language the server is expected to send back. This is a hint and is not necessarily under the full control of the user: the server should always pay attention not to override an explicit user choice (like selecting a language from a dropdown).
                    'Accept_Language',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * Control Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Indicates expectations that need to be fulfilled by the server to properly handle the request.
                    'Expect',
                    // When using TRACE, indicates the maximum number of hops the request can do before being reflected to the sender.
                    'Max_Forwards',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * Cookie Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Contains stored HTTP cookies previously sent by the server with the Set_Cookie header.
                    'Cookie',
                    // Send cookies from the server to the user_agent.
                    'Set_Cookie',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * CORS Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Indicates whether the response can be shared.
                    'Access_Control_Allow_Origin',
                    // Indicates whether the response to the request can be exposed when the credentials flag is true.
                    'Access_Control_Allow_Credentials',
                    // Used in response to a preflight request to indicate which HTTP headers can be used when making the actual request.
                    'Access_Control_Allow_Headers',
                    // Specifies the methods allowed when accessing the resource in response to a preflight request.
                    'Access_Control_Allow_Methods',
                    // Indicates which headers can be exposed as part of the response by listing their names.
                    'Access_Control_Expose_Headers',
                    // Indicates how long the results of a preflight request can be cached.
                    'Access_Control_Max_Age',
                    // Used when issuing a preflight request to let the server know which HTTP headers will be used when the actual request is made.
                    'Access_Control_Request_Headers',
                    // Used when issuing a preflight request to let the server know which HTTP method will be used when the actual request is made.
                    'Access_Control_Request_Method',
                    // Indicates where a fetch originates from.
                    'Origin',
                    // Specifies origins that are allowed to see values of attributes retrieved via features of the Resource Timing API, which would otherwise be reported as zero due to cross_origin restrictions.
                    'Timing_Allow_Origin',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * Download Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Indicates if the resource transmitted should be displayed inline (default behavior without the header), or if it should be handled like a download and the browser should present a "Save As" dialog.
                    'Content_Disposition',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * Message Body Information Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // The size of the resource, in decimal number of bytes.
                    'Content_Length',
                    // Indicates the media type of the resource.
                    'Content_Type',
                    // Used to specify the compression algorithm.
                    'Content_Encoding',
                    // Describes the human language(s) intended for the audience, so that it allows a user to differentiate according to the users' own preferred language.
                    'Content_Language',
                    // Indicates an alternate location for the returned data.
                    'Content_Location',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * Proxy Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Contains information from the client_facing side of proxy servers that is altered or lost when a proxy is involved in the path of the request.
                    'Forwarded',
                    // Identifies the originating IP addresses of a client connecting to a web server through an HTTP proxy or a load balancer.
                    'Via',
                    // Added by proxies, both forward and reverse proxies, and can appear in the request headers and the response headers.

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * Redirect Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Indicates the URL to redirect a page to.
                    'Location',
                    // Directs the browser to reload the page or redirect to another. Takes the same value as the meta element with http_equiv="refresh".
                    'Refresh',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * Request Context Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Contains an Internet email address for a human user who controls the requesting user agent.
                    'From',
                    // Specifies the domain name of the server (for virtual hosting), and (optionally) the TCP port number on which the server is listening.
                    'Host',
                    // The address of the previous web page from which a link to the currently requested page was followed.
                    'Referer',
                    // Governs which referrer information sent in the Referer header should be included with requests made.
                    'Referrer_Policy',
                    // Contains a characteristic string that allows the network protocol peers to identify the application type, operating system, software vendor or software version of the requesting software user agent. See also the Firefox user agent string reference.
                    'User_Agent',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * Response Context Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Lists the set of HTTP request methods supported by a resource.
                    'Allow',
                    // Contains information about the software used by the origin server to handle the request.
                    'Server',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * Range Request Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Indicates if the server supports range requests, and if so in which unit the range can be expressed.
                    'Accept_Ranges',
                    // Indicates the part of a document that the server should return.
                    'Range',
                    // Creates a conditional range request that is only fulfilled if the given etag or date matches the remote resource. Used to prevent downloading two ranges from incompatible version of the resource.
                    'If_Range',
                    // Indicates where in a full body message a partial message belongs.
                    'Content_Range',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * Security Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Allows a server to declare an embedder policy for a given document.
                    'Cross_Origin_Embedder_Policy',
                    // Prevents other domains from opening/controlling a window.
                    'Cross_Origin_Opener_Policy',
                    // Prevents other domains from reading the response of the resources to which this header is applied.
                    'Cross_Origin_Resource_Policy',
                    // Controls resources the user agent is allowed to load for a given page.
                    'Content_Security_Policy',
                    // Allows web developers to experiment with policies by monitoring, but not enforcing, their effects. These violation reports consist of JSON documents sent via an HTTP POST request to the specified URI.
                    'Content_Security_Policy_Report_Only',
                    // Allows sites to opt in to reporting and/or enforcement of Certificate Transparency requirements, which prevents the use of misissued certificates for that site from going unnoticed. When a site enables the Expect_CT header, they are requesting that Chrome check that any certificate for that site appears in public CT logs.
                    'Expect_CT',
                    // Provides a mechanism to allow and deny the use of browser features in a website's own frame, and in <iframe>s that it embeds.
                    'Permissions_Policy',
                    // Force communication using HTTPS instead of HTTP.
                    'Strict_Transport_Security',
                    // Sends a signal to the server expressing the client's preference for an encrypted and authenticated response, and that it can successfully handle the upgrade_insecure_requests directive.
                    'Upgrade_Insecure_Requests',
                    // Disables MIME sniffing and forces browser to use the type given in Content_Type.
                    'X_Content_Type_Options',
                    // Indicates whether a browser should be allowed to render a page in a <frame>, <iframe>, <embed> or <object>.
                    'X_Frame_Options',
                    // Specifies if a cross_domain policy file (crossdomain.xml) is allowed. The file may define a policy to grant clients, such as Adobe's Flash Player (now obsolete), Adobe Acrobat, Microsoft Silverlight (now obsolete), or Apache Flex, permission to handle data across domains that would otherwise be restricted due to the Same_Origin Policy. See the Cross_domain Policy File Specification for more information.
                    'X_Permitted_Cross_Domain_Policies',
                    // May be set by hosting environments or other frameworks and contains information about them while not providing any usefulness to the application or its visitors. Unset this header to avoid exposing potential vulnerabilities.
                    'X_Powered_By',
                    // Enables cross_site scripting filtering.
                    'X_XSS_Protection',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * Authentication Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Defines the authentication method that should be used to access a resource.
                    'WWW_Authenticate',
                    // Contains the credentials to authenticate a user_agent with a server.
                    'Authorization',
                    // Defines the authentication method that should be used to access a resource behind a proxy server.
                    'Proxy_Authenticate',
                    // Contains the credentials to authenticate a user agent with a proxy server.
                    'Proxy_Authorization',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * Fetch Metadata Request Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    'Sec_Fetch_Site',
                    // Indicates the relationship between a request initiator's origin and its target's origin. It is a Structured Header whose value is a token with possible values cross_site, same_origin, same_site, and none.
                    'Sec_Fetch_Mode',
                    // Indicates the request's mode to a server. It is a Structured Header whose value is a token with possible values cors, navigate, no_cors, same_origin, and websocket.
                    'Sec_Fetch_User',
                    // Indicates whether or not a navigation request was triggered by user activation. It is a Structured Header whose value is a boolean so possible values are ?0 for false and ?1 for true.
                    'Sec_Fetch_Dest',
                    // Indicates the request's destination. It is a Structured Header whose value is a token with possible values audio, audioworklet, document, embed, empty, font, image, manifest, object, paintworklet, report, script, serviceworker, sharedworker, style, track, video, worker, and xslt.
                    'Service_Worker_Navigation_Preload',
                    // A request header sent in preemptive request to fetch() a resource during service worker boot. The value, which is set with NavigationPreloadManager.setHeaderValue(), can be used to inform a server that a different resource should be returned than in a normal fetch() operation.

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * Server_sent Event Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    'Last_Event_ID',
                    'Ping_From',
                    'Ping_To',
                    // Used to specify a server endpoint for the browser to send warning and error reports to.
                    'Report_To',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * Transfer Coding
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Specifies the form of encoding used to safely transfer the resource to the user
                    'Transfer_Encoding',
                    // Specifies the transfer encodings the user agent is willing to accept.
                    'TE',
                    // Allows the sender to include additional fields at the end of chunked message.
                    'Trailer',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * WebSocket Headers Coding
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    'Sec_WebSocket_Key',
                    'Sec_WebSocket_Extensions',
                    'Sec_WebSocket_Accept',
                    'Sec_WebSocket_Protocol',
                    'Sec_WebSocket_Version',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    * Caching Headers
                    * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // The time, in seconds, that the object has been in a proxy cache.
                    'Age',
                    // Directives for caching mechanisms in both requests and responses.
                    'Cache_Control',
                    // Clears browsing data (e.g. cookies, storage, cache) associated with the requesting website.
                    'Clear_Site_Data',
                    // The date/time after which the response is considered stale.
                    'Expires',
                    // Implementation_specific header that may have various effects anywhere along the request_response chain. Used for backwards compatibility with HTTP/1.0 caches where the Cache_Control header is not yet present.
                    'Pragma',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    * Network client hint headers
                    * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Approximate bandwidth of the client's connection to the server, in Mbps. This is part of the Network Information API.
                    'Downlink',
                    // The effective connection type ("network profile") that best matches the connection's latency and bandwidth. This is part of the Network Information API.
                    'ECT',
                    // Application layer round trip time (RTT) in milliseconds, which includes the server processing time. This is part of the Network Information API.
                    'RTT',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    * Conditional Headers
                    * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // The last modification date of the resource, used to compare several versions of the same resource. It is less accurate than ETag, but easier to calculate in some environments. Conditional requests using If_Modified_Since and If_Unmodified_Since use this value to change the behavior of the request.
                    'Last_Modified',
                    // A unique string identifying the version of the resource. Conditional requests using If_Match and If_None_Match use this value to change the behavior of the request.
                    'ETag',
                    // Makes the request conditional, and applies the method only if the stored resource matches one of the given ETags.
                    'If_Match',
                    // Makes the request conditional, and applies the method only if the stored resource doesn't match any of the given ETags. This is used to update caches (for safe requests), or to prevent uploading a new resource when one already exists.
                    'If_None_Match',
                    // Makes the request conditional, and expects the resource to be transmitted only if it has been modified after the given date. This is used to transmit data only when the cache is out of date.
                    'If_Modified_Since',
                    // Makes the request conditional, and expects the resource to be transmitted only if it has not been modified after the given date. This ensures the coherence of a new fragment of a specific range with previous ones, or to implement an optimistic concurrency control system when modifying existing documents.
                    'If_Unmodified_Since',
                    // Determines how to match request headers to decide whether a cached response can be used rather than requesting a fresh one from the origin server.
                    'Vary',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    * Connection Management Headers
                    * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Controls whether the network connection stays open after the current transaction finishes.
                    'Connection',
                    // Controls how long a persistent connection should stay open.
                    'Keep_Alive',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * Other Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Used to list alternate ways to reach this service.
                    'Alt_Svc',
                    // Used to identify the alternative service in use.
                    'Alt_Used',
                    // Contains the date and time at which the message was originated.
                    'Date',
                    // The Link entity_header field provides a means for serializing one or more links in HTTP headers. It is semantically equivalent to the HTML <link> element.
                    'Link',
                    // Indicates how long the user agent should wait before making a follow_up request.
                    'Retry_After',
                    // Communicates one or more metrics and descriptions for the given request_response cycle.
                    'Server_Timing',
                    // Used to remove the path restriction by including this header in the response of the Service Worker script.
                    'Service_Worker_Allowed',
                    // Links generated code to a source map.
                    'SourceMap',
                    // Set by a navigation target to opt_in to using various higher_risk loading modes. For example, cross_origin, same_site prerendering requires a Supports_Loading_Mode value of credentialed_prerender.
                    'Supports_Loading_Mode',
                    // The relevant RFC document for the Upgrade header field is RFC 9110, section 7.8. The standard establishes rules for upgrading or changing to a different protocol on the current client, server, transport protocol connection. For example, this header standard allows a client to change from HTTP 1.1 to WebSocket, assuming the server decides to acknowledge and implement the Upgrade header field. Neither party is required to accept the terms specified in the Upgrade header field. It can be used in both client and server headers. If the Upgrade header field is specified, then the sender MUST also send the Connection header field with the upgrade option specified. For details on the Connection header field please see section 7.6.1 of the aforementioned RFC.
                    'Upgrade',
                    // Controls DNS prefetching, a feature by which browsers proactively perform domain name resolution on both links that the user may choose to follow as well as URLs for items referenced by the document, including images, CSS, JavaScript, and so forth.
                    'X_DNS_Prefetch_Control',
                    'X_Requested_With'
                ],
                // Enum property values for each enum property name as an array
                [
                    // Represents an unknown or never set header name
                    'UNKNOWN',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * EzClocker Response Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Authentication status header (response only)
                    'x-ezclocker-auth-status',
                    // Server environment (response only)
                    'x-ezclocker-environment',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * EzClocker Public API Authentication Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Public API Authentication Auth Token
                    'x-ezclocker-authtoken',
                    // Public API Authentication Developer Token
                    'x-ezclocker-developertoken',
                    // Public API Authentication: Authenticating employer id
                    'x-ezclocker-employerid',
                    // Public API Authentication: Authenticating manager id
                    'x-ezclocker-manager-id',
                    // Public API Authentication: Authenticating payroll manager id
                    'x-ezclocker-payroll-manager-id',
                    // Public API Authentication: Authenticating employee id
                    'x-ezclocker-employeeid',
                    // Public API Authentication: Authenticating personal id
                    'x-ezclocker-personal-id',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * Content Negotiation Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Informs the server about the types of data that can be sent back.
                    'Accept',
                    // The encoding algorithm, usually a compression algorithm, that can be used on the resource sent back.
                    'Accept-Encoding',
                    // Informs the server about the human language the server is expected to send back. This is a hint and is not necessarily under the full control of the user: the server should always pay attention not to override an explicit user choice (like selecting a language from a dropdown).
                    'Accept-Language',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * Control Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Indicates expectations that need to be fulfilled by the server to properly handle the request.
                    'Expect',
                    // When using TRACE, indicates the maximum number of hops the request can do before being reflected to the sender.
                    'Max-Forwards',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * Cookie Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Contains stored HTTP cookies previously sent by the server with the Set-Cookie header.
                    'Cookie',
                    // Send cookies from the server to the user-agent.
                    'Set-Cookie',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * CORS Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Indicates whether the response can be shared.
                    'Access-Control-Allow-Origin',
                    // Indicates whether the response to the request can be exposed when the credentials flag is true.
                    'Access-Control-Allow-Credentials',
                    // Used in response to a preflight request to indicate which HTTP headers can be used when making the actual request.
                    'Access-Control-Allow-Headers',
                    // Specifies the methods allowed when accessing the resource in response to a preflight request.
                    'Access-Control-Allow-Methods',
                    // Indicates which headers can be exposed as part of the response by listing their names.
                    'Access-Control-Expose-Headers',
                    // Indicates how long the results of a preflight request can be cached.
                    'Access-Control-Max-Age',
                    // Used when issuing a preflight request to let the server know which HTTP headers will be used when the actual request is made.
                    'Access-Control-Request-Headers',
                    // Used when issuing a preflight request to let the server know which HTTP method will be used when the actual request is made.
                    'Access-Control-Request-Method',
                    // Indicates where a fetch originates from.
                    'Origin',
                    // Specifies origins that are allowed to see values of attributes retrieved via features of the Resource Timing API, which would otherwise be reported as zero due to cross-origin restrictions.
                    'Timing-Allow-Origin',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * Download Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Indicates if the resource transmitted should be displayed inline (default behavior without the header), or if it should be handled like a download and the browser should present a "Save As" dialog.
                    'Content-Disposition',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * Message Body Information Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // The size of the resource, in decimal number of bytes.
                    'Content-Length',
                    // Indicates the media type of the resource.
                    'Content-Type',
                    // Used to specify the compression algorithm.
                    'Content-Encoding',
                    // Describes the human language(s) intended for the audience, so that it allows a user to differentiate according to the users' own preferred language.
                    'Content-Language',
                    // Indicates an alternate location for the returned data.
                    'Content-Location',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * Proxy Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Contains information from the client-facing side of proxy servers that is altered or lost when a proxy is involved in the path of the request.
                    'Forwarded',
                    // Identifies the originating IP addresses of a client connecting to a web server through an HTTP proxy or a load balancer.
                    'Via',
                    // Added by proxies, both forward and reverse proxies, and can appear in the request headers and the response headers.

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * Redirect Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Indicates the URL to redirect a page to.
                    'Location',
                    // Directs the browser to reload the page or redirect to another. Takes the same value as the meta element with http-equiv="refresh".
                    'Refresh',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * Request Context Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Contains an Internet email address for a human user who controls the requesting user agent.
                    'From',
                    // Specifies the domain name of the server (for virtual hosting), and (optionally) the TCP port number on which the server is listening.
                    'Host',
                    // The address of the previous web page from which a link to the currently requested page was followed.
                    'Referer',
                    // Governs which referrer information sent in the Referer header should be included with requests made.
                    'Referrer-Policy',
                    // Contains a characteristic string that allows the network protocol peers to identify the application type, operating system, software vendor or software version of the requesting software user agent. See also the Firefox user agent string reference.
                    'User-Agent',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * Response Context Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Lists the set of HTTP request methods supported by a resource.
                    'Allow',
                    // Contains information about the software used by the origin server to handle the request.
                    'Server',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * Range Request Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Indicates if the server supports range requests, and if so in which unit the range can be expressed.
                    'Accept-Ranges',
                    // Indicates the part of a document that the server should return.
                    'Range',
                    // Creates a conditional range request that is only fulfilled if the given etag or date matches the remote resource. Used to prevent downloading two ranges from incompatible version of the resource.
                    'If-Range',
                    // Indicates where in a full body message a partial message belongs.
                    'Content-Range',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * Security Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Allows a server to declare an embedder policy for a given document.
                    'Cross-Origin-Embedder-Policy',
                    // Prevents other domains from opening/controlling a window.
                    'Cross-Origin-Opener-Policy',
                    // Prevents other domains from reading the response of the resources to which this header is applied.
                    'Cross-Origin-Resource-Policy',
                    // Controls resources the user agent is allowed to load for a given page.
                    'Content-Security-Policy',
                    // Allows web developers to experiment with policies by monitoring, but not enforcing, their effects. These violation reports consist of JSON documents sent via an HTTP POST request to the specified URI.
                    'Content-Security-Policy-Report-Only',
                    // Allows sites to opt in to reporting and/or enforcement of Certificate Transparency requirements, which prevents the use of misissued certificates for that site from going unnoticed. When a site enables the Expect-CT header, they are requesting that Chrome check that any certificate for that site appears in public CT logs.
                    'Expect-CT',
                    // Provides a mechanism to allow and deny the use of browser features in a website's own frame, and in <iframe>s that it embeds.
                    'Permissions-Policy',
                    // Force communication using HTTPS instead of HTTP.
                    'Strict-Transport-Security',
                    // Sends a signal to the server expressing the client's preference for an encrypted and authenticated response, and that it can successfully handle the upgrade-insecure-requests directive.
                    'Upgrade-Insecure-Requests',
                    // Disables MIME sniffing and forces browser to use the type given in Content-Type.
                    'X-Content-Type-Options',
                    // Indicates whether a browser should be allowed to render a page in a <frame>, <iframe>, <embed> or <object>.
                    'X-Frame-Options',
                    // Specifies if a cross-domain policy file (crossdomain.xml) is allowed. The file may define a policy to grant clients, such as Adobe's Flash Player (now obsolete), Adobe Acrobat, Microsoft Silverlight (now obsolete), or Apache Flex, permission to handle data across domains that would otherwise be restricted due to the Same-Origin Policy. See the Cross-domain Policy File Specification for more information.
                    'X-Permitted-Cross-Domain-Policies',
                    // May be set by hosting environments or other frameworks and contains information about them while not providing any usefulness to the application or its visitors. Unset this header to avoid exposing potential vulnerabilities.
                    'X-Powered-By',
                    // Enables cross-site scripting filtering.
                    'X-XSS-Protection',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * Authentication Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Defines the authentication method that should be used to access a resource.
                    'WWW-Authenticate',
                    // Contains the credentials to authenticate a user-agent with a server.
                    'Authorization',
                    // Defines the authentication method that should be used to access a resource behind a proxy server.
                    'Proxy-Authenticate',
                    // Contains the credentials to authenticate a user agent with a proxy server.
                    'Proxy-Authorization',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * Fetch Metadata Request Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    'Sec-Fetch-Site',
                    // Indicates the relationship between a request initiator's origin and its target's origin. It is a Structured Header whose value is a token with possible values cross-site, same-origin, same-site, and none.
                    'Sec-Fetch-Mode',
                    // Indicates the request's mode to a server. It is a Structured Header whose value is a token with possible values cors, navigate, no-cors, same-origin, and websocket.
                    'Sec-Fetch-User',
                    // Indicates whether or not a navigation request was triggered by user activation. It is a Structured Header whose value is a boolean so possible values are ?0 for false and ?1 for true.
                    'Sec-Fetch-Dest',
                    // Indicates the request's destination. It is a Structured Header whose value is a token with possible values audio, audioworklet, document, embed, empty, font, image, manifest, object, paintworklet, report, script, serviceworker, sharedworker, style, track, video, worker, and xslt.
                    'Service-Worker-Navigation-Preload',
                    // A request header sent in preemptive request to fetch() a resource during service worker boot. The value, which is set with NavigationPreloadManager.setHeaderValue(), can be used to inform a server that a different resource should be returned than in a normal fetch() operation.

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * Server-sent Event Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    'Last-Event-ID',
                    'Ping-From',
                    'Ping-To',
                    // Used to specify a server endpoint for the browser to send warning and error reports to.
                    'Report-To',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * Transfer Coding
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Specifies the form of encoding used to safely transfer the resource to the user
                    'Transfer-Encoding',
                    // Specifies the transfer encodings the user agent is willing to accept.
                    'TE',
                    // Allows the sender to include additional fields at the end of chunked message.
                    'Trailer',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * WebSocket Headers Coding
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    'Sec-WebSocket-Key',
                    'Sec-WebSocket-Extensions',
                    'Sec-WebSocket-Accept',
                    'Sec-WebSocket-Protocol',
                    'Sec-WebSocket-Version',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    * Caching Headers
                    * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // The time, in seconds, that the object has been in a proxy cache.
                    'Age',
                    // Directives for caching mechanisms in both requests and responses.
                    'Cache-Control',
                    // Clears browsing data (e.g. cookies, storage, cache) associated with the requesting website.
                    'Clear-Site-Data',
                    // The date/time after which the response is considered stale.
                    'Expires',
                    // Implementation-specific header that may have various effects anywhere along the request-response chain. Used for backwards compatibility with HTTP/1.0 caches where the Cache-Control header is not yet present.
                    'Pragma',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    * Network client hint headers
                    * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Approximate bandwidth of the client's connection to the server, in Mbps. This is part of the Network Information API.
                    'Downlink',
                    // The effective connection type ("network profile") that best matches the connection's latency and bandwidth. This is part of the Network Information API.
                    'ECT',
                    // Application layer round trip time (RTT) in milliseconds, which includes the server processing time. This is part of the Network Information API.
                    'RTT',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    * Conditional Headers
                    * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // The last modification date of the resource, used to compare several versions of the same resource. It is less accurate than ETag, but easier to calculate in some environments. Conditional requests using If-Modified-Since and If-Unmodified-Since use this value to change the behavior of the request.
                    'Last-Modified',
                    // A unique string identifying the version of the resource. Conditional requests using If-Match and If-None-Match use this value to change the behavior of the request.
                    'ETag',
                    // Makes the request conditional, and applies the method only if the stored resource matches one of the given ETags.
                    'If-Match',
                    // Makes the request conditional, and applies the method only if the stored resource doesn't match any of the given ETags. This is used to update caches (for safe requests), or to prevent uploading a new resource when one already exists.
                    'If-None-Match',
                    // Makes the request conditional, and expects the resource to be transmitted only if it has been modified after the given date. This is used to transmit data only when the cache is out of date.
                    'If-Modified-Since',
                    // Makes the request conditional, and expects the resource to be transmitted only if it has not been modified after the given date. This ensures the coherence of a new fragment of a specific range with previous ones, or to implement an optimistic concurrency control system when modifying existing documents.
                    'If-Unmodified-Since',
                    // Determines how to match request headers to decide whether a cached response can be used rather than requesting a fresh one from the origin server.
                    'Vary',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    * Connection Management Headers
                    * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Controls whether the network connection stays open after the current transaction finishes.
                    'Connection',
                    // Controls how long a persistent connection should stay open.
                    'Keep-Alive',

                    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     * Other Headers
                     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
                    // Used to list alternate ways to reach this service.
                    'Alt-Svc',
                    // Used to identify the alternative service in use.
                    'Alt-Used',
                    // Contains the date and time at which the message was originated.
                    'Date',
                    // The Link entity-header field provides a means for serializing one or more links in HTTP headers. It is semantically equivalent to the HTML <link> element.
                    'Link',
                    // Indicates how long the user agent should wait before making a follow-up request.
                    'Retry-After',
                    // Communicates one or more metrics and descriptions for the given request-response cycle.
                    'Server-Timing',
                    // Used to remove the path restriction by including this header in the response of the Service Worker script.
                    'Service-Worker-Allowed',
                    // Links generated code to a source map.
                    'SourceMap',
                    // Set by a navigation target to opt-in to using various higher-risk loading modes. For example, cross-origin, same-site prerendering requires a Supports-Loading-Mode value of credentialed-prerender.
                    'Supports-Loading-Mode',
                    // The relevant RFC document for the Upgrade header field is RFC 9110, section 7.8. The standard establishes rules for upgrading or changing to a different protocol on the current client, server, transport protocol connection. For example, this header standard allows a client to change from HTTP 1.1 to WebSocket, assuming the server decides to acknowledge and implement the Upgrade header field. Neither party is required to accept the terms specified in the Upgrade header field. It can be used in both client and server headers. If the Upgrade header field is specified, then the sender MUST also send the Connection header field with the upgrade option specified. For details on the Connection header field please see section 7.6.1 of the aforementioned RFC.
                    'Upgrade',
                    // Controls DNS prefetching, a feature by which browsers proactively perform domain name resolution on both links that the user may choose to follow as well as URLs for items referenced by the document, including images, CSS, JavaScript, and so forth.
                    'X-DNS-Prefetch-Control',
                    'X-Requested-With'
                ],
                // Optional array of additional data for eac enumeration property.
                // Enter null if not needed.
                null);
        }
    }
}
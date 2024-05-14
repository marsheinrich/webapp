import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import {
    EzObject,
    EzBoolean,
    EzString
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * Provides operation utilities on the browser url
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzUrlHelper } from '/public/javascript/common/ezclocker-url-helper2.js';
 * ---------------------------------------------------------------------------
 * Ready check:
 *     globalThis.ezApi.ezclocker[EzUrlHelper.ezApiName] &&
 *     globalThis.ezApi.ezclocker[EzUrlHelper.ezApiName].ready;
 * ---------------------------------------------------------------------------
 * Ready event hook:
 *     document.addEventListener(
 *         EzUrlHelper.ezEventNames.onReady,
 *         this.#ezRegistrator);
 * ---------------------------------------------------------------------------
 */
export class EzUrlHelper extends EzClass {
    static get HACKER_ID_PARAM_NAME() {
        return 'hAk3ziD';
    }

    get hackerId() {
        return EzUrlHelper.ezInstance.getUrlParam('hAk3ziD');
    }

    /**
     * @private @field
     * Stores if debug mode is turned on (true) or off (false)
     * @type {boolean}
     */
    #ezDebugMode = false;
    /**
     * @public @property @getter
     * Gets if debug mode is turned on (true) or off (false)
     * @returns {boolean}
     */
    get ezDebugMode() {
        return this.#ezDebugMode ||
            'true' === EzUrlHelper.ezInstance.getUrlParam('debug') ||
            'localhost' === window.location.hostname ||
            '127.0.0.1' === window.location.hostname ||
            'dev.ezclocker.com' === window.location.hostname;
    }
    /**
     * @public @property @setter
     * Sets if debug mode is turned on (true) or off (false)
     * @param {undefined|null|boolean} debugMode
     */
    set ezDebugMode(debugMode) {
        this.#ezDebugMode = EzBoolean.booleanOrFalse(
            debugMode ||
            'true' === EzUrlHelper.ezInstance.getUrlParam('debug') ||
            'localhost' === window.location.hostname ||
            '127.0.0.1' === window.location.hostname ||
            'loc.ezclocker.com' === window.location.hostname ||
            'cto.ezclocker.com' === window.location.hostname ||
            'dev2.ezclocker.com' === window.location.hostname ||
            'dev.ezclocker.com' === window.location.hostname);
    }

    /**
     * @public @field
     * Stores the map of params on the current url
     * @type {object}
     */
    currentUrlParams = null;

    /**
     * @public @field
     * Stores the value for the 'email' param
     * @type {string}
     */
    emailParam = EzString.EMPTY;

    /**
     * @public @field
     * Stores the value for the 'v' param.
     * @type {string}
     */
    versionParam = EzString.EMPTY;

    /**
     * @protected @method
     * Initializes EzUrlHelper
     * @returns {EzUrlHelper}
     */
    ezInit() {
        EzUrlHelper.ezInstance.getUrlParams();

        return EzUrlHelper.ezInstance;
    }

    /**
     * @public @Method
     * Attempts to detect the enviornment from the browser url. Returns PRD by default.
     * @returns {string}
     */
    ezGetEnvironmentFromUrl() {
        let url = window.location.href;

        if (-1 !== url.indexOf('localhost') ||
            -1 !== url.indexOf('127.0.0.1') ||
            -1 !== url.indexOf('loc.ezclocker.com')) {
            return 'loc';
        }

        if (-1 !== url.indexOf('dev.ezclocker.com') ||
            -1 !== url.indexOf('dev1.ezclocker.com') ||
            -1 !== url.indexOf('dev2.ezclocker.com')) {
            return 'dev';
        }

        if (-1 !== url.indexOf('qal.ezclocker.com')) {
            return 'qal';
        }

        if (-1 !== url.indexOf('e2e.ezclocker.com')) {
            return 'e2e';
        }

        if (-1 !== url.indexOf('prf.ezclocker.com')) {
            return 'prf';
        }

        if (-1 !== url.indexOf('stage.ezclocker.com') || -1 !== url.indexOf('stg.ezclocker.com')) {
            return 'stg';
        }

        return 'prd';
    }

    /**
     * @public @Method
     * Obtains and caches all the current url params
     * @returns {object}
     * Returns the map of url params
     */
    getUrlParams() {
        if (!EzObject.isValid(EzUrlHelper.ezInstance.currentUrlParams)) {
            EzUrlHelper.ezInstance.currentUrlParams = {};

            let parser = document.createElement('a');

            parser.href = window.location.href;

            let query = parser.search.substring(1);

            let vars = query.split('&');

            for (let param of vars) {
                let pair = param.split('=');
                EzUrlHelper.ezInstance.currentUrlParams[pair[0]] = pair[1];
            }
        }

        return EzUrlHelper.ezInstance.currentUrlParams;
    }

    /**
     * @public @Method
     * Replaces all + characters in a URL param to spaces.
     * @param {string} value
     * @returns {string}
     */
    ezPlusToSpace(value) {
        if (!EzString.hasLength(value)) {
            return value;
        }

        return value.replace('+', ' ');
    }

    /**
     * @public @Method
     * @param {string} paramName
     * @returns {string}
     * @deprecated
     * Migrate to: ezApi.ezclocker.ezUrlHelper.ezGetUrlParam(paramName)
     */
    getUrlParam(paramName) {
        return EzUrlHelper.ezInstance.ezGetUrlParam(paramName);
    }

    /**
     * @public @Method
     * @param {string} paramName
     * @returns {string}
     */
    ezGetUrlParam(paramName) {
        if (!EzString.hasLength(paramName)) {
            return EzString.EMPTY;
        }

        EzUrlHelper.ezInstance.getUrlParams();

        return EzObject.isValid(EzUrlHelper.ezInstance.currentUrlParams[paramName])
            ? ezApi.ezDecode(EzUrlHelper.ezInstance.ezPlusToSpace(EzUrlHelper.ezInstance.currentUrlParams[paramName]))
            : EzString.EMPTY;
    }

    /**
     * @public @Method
     * @param {string} paramName
     * @returns {string}
     */
    getUrlParamOrDefault(paramName, defaultValue) {
        if (!EzString.hasLength(paramName)) {
            return defaultValue;
        }

        EzUrlHelper.ezInstance.getUrlParams();

        let paramValue = EzObject.isValid(EzUrlHelper.ezInstance.currentUrlParams[paramName])
            ? ezApi.ezDecode(EzUrlHelper.ezInstance.ezPlusToSpace(EzUrlHelper.ezInstance.currentUrlParams[paramName]))
            : EzString.EMPTY;

        return ezApi.ezIsNotEmptyString(paramValue)
            ? paramValue
            : defaultValue;
    }

    /**
     * @public @Method
     * @param {string} paramName
     * @returns {string}
     */
    getUrlParamNoDecode(paramName) {
        if (!EzString.hasLength(paramName)) {
            return EzString.EMPTY;
        }

        EzUrlHelper.ezInstance.getUrlParams();

        return EzObject.isValid(EzUrlHelper.ezInstance.currentUrlParams[paramName])
            ? EzUrlHelper.ezInstance.currentUrlParams[paramName]
            : EzString.EMPTY;
    }

    /**
     * @public @method
     * Returns if debug mode is enabled
     * @returns {boolean}
     * @deprecated
     * Migrate to:
     *  ezApi.ezclocker.ezUrlHelper.ezDebugMode property
     */
    isDebugMode() {
        return EzUrlHelper.ezInstance.ezDebugMode;
    }

    /**
     * @public @readonly @property
     * Returns true if the employer dashboard page's url has query param 'show-ids=true' OR
     * the hostname is one of the following:
     * @type {boolean}
     */
    get ezShowIds() {
        return 'true' === EzUrlHelper.ezInstance.ezGetUrlParam('show-ids') ||  EzUrlHelper.ezInstance.ezDebugMode;
    }


    /**
     * @public @method
     * @param {boolean|null} force
     * @returns {string}
     */
    getUtmSourceParam(force) {
        if (EzBoolean.isTrue(force) || !EzString.hasLength(EzUrlHelper.ezInstance.utmSourceParam)) {
            EzUrlHelper.ezInstance.utmSourceParam = EzUrlHelper.ezInstance.ezGetUrlParam('utm_source');
        }

        return EzUrlHelper.ezInstance.utmSourceParam;
    }

    /**
     * @public @method
     * @param {boolean|null} force
     * @returns {string}
     */
    getUtmCampaignParam(force) {
        if (EzBoolean.isTrue(force) || !EzString.hasLength(EzUrlHelper.ezInstance.utmCampaignParam)) {
            EzUrlHelper.ezInstance.utmCampaignParam = EzUrlHelper.ezInstance.ezGetUrlParam('utm_campaign');
        }

        return EzUrlHelper.ezInstance.utmCampaignParam;
    }

    /**
     * @public
     * @param {boolean|null} force
     */
    getUtmMedium(force) {
        if (EzBoolean.isTrue(force) || !EzString.hasLength(EzUrlHelper.ezInstance.utmMediumParam)) {
            EzUrlHelper.ezInstance.utmMediumParam = EzUrlHelper.ezInstance.ezGetUrlParam('utm_medium');
        }

        return EzUrlHelper.ezInstance.utmMediumParam;
    }

    /**
     * @public @method
     * @param {boolean|null} force
     */
    getPasswordResetTokenParam(force) {
        if (EzBoolean.isTrue(force) || !EzString.hasLength(EzUrlHelper.ezInstance.passwordResetToken)) {
            EzUrlHelper.ezInstance.passwordResetToken = EzUrlHelper.ezInstance.getUrlParamNoDecode('token');
        }

        return EzUrlHelper.ezInstance.passwordResetToken;
    }

    /**
     * @public @method
     * @param {boolean|null} force
     */
    getEmployerIdParam(force) {
        if (EzBoolean.isTrue(force) || !EzString.hasLength(EzUrlHelper.ezInstance.employerIdParam)) {
            EzUrlHelper.ezInstance.employerIdParam = EzUrlHelper.ezInstance.getUrlParamNoDecode('employer');
        }

        return EzUrlHelper.ezInstance.employerIdParam;
    }

    /**
     * @public @method
     * @param {boolean|null} force
     */
    getErrorParam(force) {
        if (EzBoolean.isTrue(force) || !EzString.hasLength(EzUrlHelper.ezInstance.errorParam)) {
            EzUrlHelper.ezInstance.errorParam = EzUrlHelper.ezInstance.ezGetUrlParam('error');
        }

        return EzUrlHelper.ezInstance.errorParam;
    }

    /**
     * @public @method
     * @param {boolean|null} force
     * @returns {string}
     */
    getEmailParam(force) {
        if (EzBoolean.isTrue(force) || !EzString.hasLength(EzUrlHelper.ezInstance.emailParam)) {
            EzUrlHelper.ezInstance.emailParam = EzUrlHelper.ezInstance.ezGetUrlParam('email');
        }

        return EzUrlHelper.ezInstance.emailParam;
    }

    /**
     * @public @method
     * Gets the value of the i (industry) url parameter.
     * @param {undefined|null|force} force
     * Default: false
     */
    getIndustryParam(force = false) {
        if (EzBoolean.isTrue(force) || !EzString.hasLength(EzUrlHelper.ezInstance.emailParam)) {
            EzUrlHelper.ezInstance.industryParam = EzUrlHelper.ezInstance.ezGetUrlParam('i');
        }

        return EzUrlHelper.ezInstance.industryParam;
    }

    /**
     * @public @method
     * Returns the value of url param: v
     * @param {boolean|null} force
     * @returns {string}
     */
    getVersionParam(force) {
        if (EzBoolean.isTrue(force) || !EzString.hasLength(EzUrlHelper.ezInstance.versionParam)) {
            EzUrlHelper.ezInstance.versionParam = EzUrlHelper.ezInstance.ezGetUrlParam('v');
        }

        return EzUrlHelper.ezInstance.versionParam;
    }

    /**
     * @public @method
     * @param {boolean|null} force
     */
    getUserNameParam(force) {
        if (EzBoolean.isTrue(force) || !EzString.hasLength(EzUrlHelper.ezInstance.userName)) {
            EzUrlHelper.ezInstance.userName = EzUrlHelper.ezInstance.ezGetUrlParam('un');
        }

        return EzUrlHelper.ezInstance.userName;
    }

    /**
     * @public @method
     * @param {boolean|null} force
     */
    getNameParam(force) {
        if (EzBoolean.isTrue(force) || !EzString.hasLength(EzUrlHelper.ezInstance.name)) {
            EzUrlHelper.ezInstance.name = EzUrlHelper.ezInstance.ezGetUrlParam('name');

            if (EzUrlHelper.ezInstance.name) {
                EzUrlHelper.ezInstance.name = EzUrlHelper.ezInstance.name.replace('+', ' ');
            }
        }

        return EzUrlHelper.ezInstance.name;
    }

    /**
     * @public @method
     * @param {boolean|null} force
     */
    getEmployerNameParam(force) {
        if (EzBoolean.isTrue(force) || !EzString.hasLength(EzUrlHelper.ezInstance.employerName)) {
            EzUrlHelper.ezInstance.employerName = EzUrlHelper.ezInstance.ezGetUrlParam('employer-name');

            if (EzUrlHelper.ezInstance.name) {
                EzUrlHelper.ezInstance.name = EzUrlHelper.ezInstance.name.replace('+', ' ');
            }
        }

        return EzUrlHelper.ezInstance.employerName;
    }

    /**
     * @public @method
     * @param {boolean|null} force
     */
    getSourceParam(force) {
        if (EzBoolean.isTrue(force) || !EzString.hasLength(EzUrlHelper.ezInstance.source)) {
            EzUrlHelper.ezInstance.source = EzUrlHelper.ezInstance.ezGetUrlParam('source');
        }

        return EzUrlHelper.ezInstance.source;
    }

    /**
     * @public @method
     * @param {boolean|null} force
     */
    getInviteTokenParam(force) {
        if (EzBoolean.isTrue(force) || !EzString.hasLength(EzUrlHelper.ezInstance.inviteToken)) {
            EzUrlHelper.ezInstance.inviteToken = EzUrlHelper.ezInstance.getUrlParamNoDecode('inviteToken');
        }

        return EzUrlHelper.ezInstance.inviteToken;
    }

    /**
     * @public @method
     * @param {string} url
     * @param {string} paramName
     * @param {string} paramValue
     */
    appendParam(url, paramName, paramValue) {
        if (!EzString.hasLength(url) || !EzString.hasLength(paramName) ||
            !EzString.hasLength(paramValue)) {
            return url;
        }

        return -1 !== url.indexOf('?')
            ? `${url}&${paramName}=${paramValue}`
            : `${url}?${paramName}=${paramValue}`;
    }

    /**
     * @public @method
     * @param {string} url
     * @param {string} varValue
     */
    addPathVariable(url, varValue) {
        if (!EzString.hasLength(url)) {
            return url;
        }

        if ('/' === url[url.length - 1]) {
            url = `${url}${varValue}`;
        } else {
            url = `${url}/${varValue}`;
        }

        return url;
    }

    /**
     * @public @method
     * @param {string} url
     * @param {*} other
     */
    navigateWithGooleParams(url, other) {
        if (!EzString.hasLength(url)) {
            return;
        }

        let newUrl = EzUrlHelper.ezInstance.appendParam(url, EzUrlHelper.ezInstance.getUtmSourceParam());

        newUrl = EzUrlHelper.ezInstance.appendParam(newUrl, EzUrlHelper.ezInstance.getUtmCampaignParam());

        newUrl = EzUrlHelper.ezInstance.appendParam(newUrl, EzUrlHelper.ezInstance.getUtmMedium());

        if (!EzString.hasLength(other)) {
            newUrl = EzUrlHelper.ezInstance.appendParam(newUrl, other);
        }

        window.location = newUrl;
    }

    /**
     * @public @method
     * Returns the window.location.pathname value if available. Otherwise, returns empty string.
     * @returns {string}
     */
    ezGetWindowLocationPathName() {
        return EzObject.isValid(window) && EzObject.isValid(window.location) && EzObject.isValid(window.location.pathname)
            ? window.location.pathname
            : EzString.EMPTY;
    }

    /**
     * @public @method
     * Returns the window.location.protocol value if available. Otherwise, an empty string.
     * @returns {string}
     */
    ezGetWindowLocationProtocol() {
        return EzObject.isValid(window) && EzObject.isValid(window.location) && EzObject.isValid(window.location.protocol)
            ? window.location.protocol
            : EzString.EMPTY;
    }

    /**
     * @public @method
     * Returns the window.location.host value if available. Otherwise, an empty string.
     * @returns {string}
     */
    ezGetWindowLocationHost() {
        return EzObject.isValid(window) && EzObject.isValid(window.location) && EzObject.isValid(window.location.host)
            ? window.location.host
            : EzString.EMPTY;
    }

    /**
     * @public @method
     * Returns the window.location.search value if available. Otherwise, an empty string.
     * @returns {string}
     */
    ezGetWindowLocationSearch() {
        return EzObject.isValid(window) && EzObject.isValid(window.location) && EzObject.isValid(window.location.search)
            ? window.location.search
            : EzString.EMPTY;
    }

    /**
     * @public @method
     * Builds and returns the full page url from window.location properties.
     * @returns {string}
     */
    ezGetCurrentWindowLocationUrl() {
        return ezApi.ezUrlTemplate`
            ${EzUrlHelper.ezInstance.ezGetWindowLocationProtocol()}/
            ${EzUrlHelper.ezInstance.ezGetWindowLocationHost()}/
            ${EzUrlHelper.ezInstance.ezGetWindowLocationPathName()}
            ${EzUrlHelper.ezInstance.ezGetWindowLocationSearch()}`;
    }

    /**
     * @public @method
     * Uses the new URL object to return parts.
     * If the URL object is not available, the urlString is returned.
     * If the urlString is null or empty, empty string is returned.
     * @param {string} urlPartName
     * Must be one of: protocol, host, hostname, port, pathname, search, searchParams, or username. Any other value
     * will result in an undefined response.
     * @param {string} urlString
     * @returns {string}
     */
    ezGetUrlPart(urlPartName, urlString) {
        if (!EzString.hasLength(urlPartName)) {
            throw new EzBadParamException(
                'urlPartName',
                EzUrlHelper.ezInstanc,
                EzUrlHelper.ezInstance.ezGetUrlPart);
        }

        if (!EzString.hasLength(urlString)) {
            throw new EzBadParamException(
                'urlString',
                EzUrlHelper.ezInstanc,
                EzUrlHelper.ezInstance.ezGetUrlPart);
        }

        urlPartName = urlPartName.toLowerCase();

        let result = new URL(urlString)[urlPartName];

        return EzString.hasLength(result)
            ? result
            : EzString.EMPTY;
    }

    /**
     * @public @method
     * Uses a <a> tag to parse the provided url and return the specified part.
     * If the URL object is not available, the urlString is returned.
     * If the urlString is null or empty, empty string is returned.
     * @param {string} urlPartName
     * Must be one of: protocol, host, hostname, port, pathname, search, searchParams, or username. Any other value
     * will result in an undefined response.
     * @param {string} urlString
     * @returns {string}
     */
    ezLegacyGetUrlPart(urlPartName, urlString) {
        if (!EzString.hasLength(urlPartName)) {
            throw new EzBadParamException(
                'urlPartName',
                EzUrlHelper.ezInstance,
                EzUrlHelper.ezInstance.ezGetUrlPart);
        }
        if (!EzString.hasLength(urlString)) {
            throw new EzBadParamException(
                'urlString',
                EzUrlHelper.ezInstance,
                EzUrlHelper.ezInstance.ezGetUrlPart);
        }
        if (!EzString.hasLength(urlPartName)) {
            ezApi.ezclocker.ezLogger.error(
                EzString.em`
                    The urlPartName must be one of:
                    protocol, host, hostname, port, pathname, search, searchParams, username`);
            return urlString;
        }

        let parser = document.createElement('a');

        parser.href = urlString;

        let regex = /^\?/;

        let queries = parser.search.replace(regex, EzString.EMPTY).split('&');

        let searchObject = [];

        urlPartName = urlPartName.toLowerCase();

        switch (urlPartName) {
            case 'protocol':
                return parser.protocol;
            case 'host':
                return parser.host;
            case 'port':
                return parser.port;
            case 'hostname':
                return parser.hostname;
            case 'pathname':
                return parser.pathname;
            case 'search':
                return parser.search;
            case 'searchParams':
                for (let query of queries) {
                    let split = query.split('=');
                    searchObject[split[0]] = split[1];
                }
                return searchObject;
            default:
                ezApi.ezclocker.ezLogger.error(
                    ezApi.ezEM`
                        A urlPartName of ${urlPartName}
                        is not supported. Returning the full url as a fall back.`);
                return urlString;
        }
    }

    /**
     * @public @method
     * Determines if the current window.location url has the /secure path.
     * @returns {boolean}
     */
    ezIsLocationUrlEzClockerSecure() {
        let pathName = EzUrlHelper.ezInstance.ezGetWindowLocationPathName();

        if (!EzString.hasLength(pathName)) {
            return false;
        }

        let securePath = '/secure';

        return pathName.length >= securePath.length && pathName.substring(0, securePath.length) === securePath;
    }

    /**
     * @public @method
     * Determines if the current window.location url has the /public path.
     * @returns {boolean}
     */
    ezIsLocationUrlEzClockerPublic() {
        let pathName = EzUrlHelper.ezInstance.ezGetWindowLocationPathName();

        if (!EzString.hasLength(pathName)) {
            return false;
        }

        let publicPath = '/public';

        return pathName.length >= publicPath.length && pathName.substring(0, publicPath.length) === publicPath;
    }

    /**
     * @public @method
     * Replaces the url param (paramName) in the provided url with paramName=paramValue
     * @param {string} url
     * @param {string} paramName
     * @param {string|number} paramValue
     * @returns {string}
     */
    ezReplaceUrlParam(url, paramName, paramValue) {
        if (!EzString.hasLength(paramName)) {
            throw new EzBadParamException(
                'paramName',
                EzUrlHelper.ezInstance,
                EzUrlHelper.ezInstance.ezReplaceUrlParam);
        }

        if (!EzObject.isValid(paramValue)) {
            paramValue = EzString.EMPTY;
        }

        let pattern = new RegExp('\\b(' + paramName + '=).*?(&|#|$)');

        if (0 <= url.search(pattern)) {
            return url.replace(pattern, `$1${paramValue}$2`);
        }

        url = url.replace(/[?#]$/, EzString.EMPTY);

        let paramDelimiter = -1 == url.indexOf('?')
            ? '?'
            : '&';

        return `${url}${paramDelimiter}${paramName}=${paramValue}`;
    }

    /**
     * @public @method
     * Removes the provided parameter from the provided url.
     * @param {string} url
     * @param {string} parameter
     * @returns {string}
     */
    ezRemoveUrlParameter(url, parameter) {
        if (!EzString.hasLength(url) || !EzString.hasLength(parameter)) {
            return url;
        }

        let urlParts = url.split('?');

        if (2 <= urlParts.length) {
            // Get first part, and remove from array
            let urlBase = urlParts.shift();

            // Join it back up
            let queryString = urlParts.join('?');

            let prefix = `${ezApi.ezEncode(parameter)}=`;

            let parts = queryString.split(/[&;]/g);

            // Reverse iteration as may be destructive
            for (let i = parts.length; i-- > 0;) {
                // Idiom for string.startsWith
                if (parts[i].lastIndexOf(prefix, 0) !== -1) {
                    parts.splice(i, 1);
                }
            }

            url = `${urlBase}?${parts.join('&')}`;
        }

        return url.endsWith('?')
            ? url.substring(0, url.length - 1)
            : url;
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Class Initialization and EzApi Registration Section
    // !! DO NOT PLACE ANY non-initialization fields, getter/setter methods, static methods, or class methods beyond this section !!
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    /**
     * @static
     * @public @readonly @property
     * Gets the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezUrlHelper';
    }

    /**
     * @static
     * @public @readonly @property
     * Gets an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzUrlHelper_Ready'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzUrlHelper}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzUrlHelper.ezApiName])
        ? globalThis.ezApi.ezclocker[EzUrlHelper.ezApiName]
        : null;
    /**
     * @static
     * @public @property @getter
     * Gets the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzUrlHelper}
     */
    static get ezInstance() {
        return EzUrlHelper.#ezInstance;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzUrlHelper} instance
     */
    static set ezInstance(instance) {
        if (null != EzUrlHelper.#ezInstance) {
            throw new Error('EzUrlHelper\'s singleton instance is already reigstered with EzApi.');
        }

        EzUrlHelper.#ezInstance = instance;
    }

    /**
     * @static
     * @private @field
     * Stores the EzApi registration state for this class.
     * Default value is NULL
     * Class is registerd with EzApi when value is EzUrlHelper.REGISTERED
     * @type {string}
     * A valid enum property value from EzUrlHelper
     */
    static #ezApiRegistrationState = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzUrlHelper.ezApiName])
        ? EzRegistrationState.REGISTERED
        : null;
    /**
     * @static
     * @public @property @getter
     * Gets the ezApi registration state of this classes's singleton instance.
     * @returns {string}
     * A valid enum property value from EzUrlHelper
     */
    static get ezApiRegistrationState() {
        return EzUrlHelper.#ezApiRegistrationState;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzUrlHelper
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzUrlHelper.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @static
     * @private @readonly @property
     * Gets true when all required dependencies for this class report ready.
     * In otherwords, the require dependency's singleton instance is created
     * and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzUrlHelper.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready);
    }

    /**
     * @static
     * @private @readonly @property
     * Gets if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzUrlHelper.ezInstance && EzRegistrationState.REGISTERED === EzUrlHelper.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzUrlHelper.#ezCanRegister && !EzUrlHelper.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzUrlHelper, EzUrlHelper.ezApiName);
        }

        return EzUrlHelper.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzUrlHelper.ezApiName
     *     2) Property getter EzUrlHelper.ezEventNames
     *     3) Property getter EzUrlHelper.ezInstance
     *     4) Property setter EzUrlHelper.ezInstance
     *     5) Property getter EzUrlHelper.ezApiRegistrationState
     *     6) Property setter EzUrlHelper.ezApiRegistrationState
     *     7) Property getter EzUrlHelper.#ezCanRegister
     *     8) Property getter EzUrlHelper.#ezIsRegistered
     *     9) Method EzUrlHelper.#ezRegistrator()
     */
    static {
        if (!EzUrlHelper.#ezIsRegistered) {
            EzUrlHelper.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzUrlHelper.#ezRegistrator()) {
                document.addEventListener(
                    EzUrlHelper.ezOnEzApiReadyEventName,
                    EzUrlHelper.#ezRegistrator);
            }
        }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // !! DO NOT PLACE ANY non-initialization fields, getter/setter methods, static methods, or class methods beyond above section !!
    // NO CODE AFTER THIS SECTION
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}

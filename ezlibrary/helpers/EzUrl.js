import axios from 'axios';

import { EzStaticClass } from '/ezlibrary/EzStaticClass.js';

import { EzObject } from '/ezlibrary/helpers/EzObject.js';
import { EzBoolean } from '/ezlibrary/helpers/EzBoolean.js';
import { EzNumber } from '/ezlibrary/helpers/EzNumber.js';
import { EzString } from '/ezlibrary/helpers/EzString.js';
import { EzArray } from '/ezlibrary/helpers/EzArray.js';
import { EzPromise } from '/ezlibrary/helpers/EzPromise.js';
import { EzJson } from '/ezlibrary/helpers/EzJson.js';

import { EzEnvironment } from '/ezlibrary/enums/EzEnvironment.js';

/**
 * @public @class {EzString} extends {EzStaticClass}
 * @description
 * A class of static utility methods and/or properties for url strings.
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzUrl } from '/ezlibrary/helpers/EzUrl.js';
 * ---------------------------------------------------------------------------
 */
export class EzUrl extends EzStaticClass {
    static #enableFileRevision = true;
    static get enableFileRevision() {
        return EzUrl.#enableFileRevision;
    }
    static set enableFileRevision(enableFileRevision) {
        EzUrl.#enableFileRevision = EzBoolean.booleanOrTrue(enableFileRevision);
    }

    /**
     * @static
     * @private @field
     * Stores the current enviornment
     * Default: EzEnvironment.PRD ('prd')
     * Accepts a valid enum property value from EzEnvironment:
     *  EzEnvironment.UNKNOWN ('unknown')
     *  EzEnvironment.loc ('loc')
     *  EzEnvironment.loc ('dev')
     *  EzEnvironment.loc ('dev2')
     *  EzEnvironment.loc ('qal')
     *  EzEnvironment.loc ('e2e')
     *  EzEnvironment.loc ('prf')
     *  EzEnvironment.loc ('stg')
     *  EzEnvironment.loc ('org')
     *  EzEnvironment.loc ('grn')
     *  EzEnvironment.loc ('blu')
     *  EzEnvironment.loc ('old')
     *  EzEnvironment.loc ('prd')
     * @type {string}
     */
    static #ezEnvironment = EzEnvironment.PRD;
    /**
     * @static
     * @public @getter @property
     * Gets the current enviornment
     * @returns {string}
     * A valid enum property value from EzEnvironment
     */
    static get ezEnvironment() {
        return this.#ezEnvironment;
    }
    /**
     * @static
     * @public @setter @property
     * Sets the current enviornment
     * @param {string} environment
     * A valid enum property value from EzEnvironment
     * Default: EzEnvironment.PRD ('prd')
     */
    static set ezEnvironment(environment) {
        try {
            this.#ezEnvironment = EzString.hasLength(environment)
                ? EzEnvironment.ezNameOf(environment.toLowerCase())
                : EzEnvironment.PRD;
        } catch (err) {
            globalThis.console.error(
                EzString.em`
                    The provided environment of ${environment} is not a valid
                    EzEnvironment. Defaulting to EzEnvironment.PRD.`);

            this.#ezEnvironment = EzEnvironment.PRD;
        }
    }

    /**
     * @static
     * @private @field
     * Stores the default website version
     */
    static #DEFAULT_WEBSITE_VERSION = 'r72-3';

    /**
     * @static
     * @private @field
     * Stores the website version
     * @type {string}
     */
    static #ezWebsiteVersion;
    /**
     * @static
     * @public @setter @property
     * Sets the website version
     * @param {string} environment
     * A valid enum property value from EzEnvironment
     * Default: EzEnvironment.PRD ('prd')
     */
    static get ezWebsiteVersion() {
        return EzString.hasLength(this.#ezWebsiteVersion)
            ? this.#ezWebsiteVersion
            : this.#DEFAULT_WEBSITE_VERSION;
    }
    /**
     * @static
     * @public @setter @property
     * Sets the website version
     * @param {string} websiteVersion
     * Default: this.#DEFAULT_WEBSITE_VERSION
     */
    static set ezWebsiteVersion(websiteVersion) {
        this.#ezWebsiteVersion = EzString.hasLength(websiteVersion)
            ? websiteVersion
            : this.#DEFAULT_WEBSITE_VERSION;
    }

    /**
     * @static
     * @public @readonly @property
     * EzClocker website's Spring Security sign-in path
     * Does not include an ending '/'
     * Excludes the protocol, domain, and port)
     */
    static get baseWebsiteSignInPath() {
        return '/resources/j_spring_security_check';
    }

    /**
     * @static
     * @public @readonly @property
     * EzClocker website's Spring Security sign-out path
     * Includes a leading '/'
     * Does not include an ending '/'
     * Excludes the protocol, domain, and port)
     */
    static get baseWebsiteSignOutPath() {
        return '/resources/j_spring_security_logout';
    }

    /**
     * @static
     * @public @readonly @property
     * EzClocker mobile website's base public path
     * Includes a leading '/'
     * Does not include an ending '/'
     * Excludes the protocol, domain, and port)
     */
    static get baseMobileWebsitePath() {
        return '/m';
    }

    /**
     * @static
     * @public @readonly @property
     * EzClocker mobile website's base public path
     * Includes a leading '/'
     * Does not include an ending '/'
     * Excludes the protocol, domain, and port)
     */
    static get baseMobileWebsitePublicPath() {
        return `${EzUrl.baseMobileWebsitePath}/p`;
    }

    /**
     * @static
     * @public @readonly @property
     * EzClocker mobile website's base public path
     * Includes a leading '/'
     * Excludes an ending '/'
     * Excludes the protocol, domain, and port)
     */
    static get baseMobileWebsiteSecurePath() {
        return `${EzUrl.baseMobileWebsitePath}/s`;
    }

    /**
     * @static
     * @public @readonly @property
     * EzClocker mobile website's base public path
     * Includes a leading '/'
     * Does not include an ending '/'
     * Excludes the protocol, domain, and port)
     */
    static get baseWebsitePublicPath() {
        return '/public';
    }

    /**
     * @static
     * @public @readonly @property
     * EzClocker mobile website's base public path
     * Includes a leading '/'
     * Does not include an ending '/'
     * Excludes the protocol, domain, and port)
     */
    static get baseWebsiteSecurePath() {
        return '/secure';
    }

    /**
     * @static
     * @public @readonly @property
     * EzClocker internal API's base path
     * Includes a leading '/'
     * Does not include an ending '/'
     * Excludes the protocol, domain, and port)
     */
    static get baseInternalApiPath() {
        return '/_api';
    }

    /**
     * @static
     * @public @readonly @property
     * EzClocker internal API's base path
     * Includes a leading '/'
     * Does not include an ending '/'
     * Excludes the protocol, domain, and port)
     */
    static get basePublicApiPath() {
        return '/api';
    }

    /**
     * @static
     * @public @method
     * EzClocker internal API's base path
     * Includes a leading '/'
     * Does not include an ending '/'
     * Excludes the protocol, domain, and port)
     * @param {string} apiVersion
     * Default: 'v1'
     */
    static basePublicApiVersionPath(apiVersion = 'v1') {
        return `${EzUrl.basePublicApiPath}/${EzString.stringOrDefault(apiVersion, 'v1')}`;
    }

    /**
     * @static
     * @public @method
     * Builds a url from the provided parts
     * @param {string} protocol
     * URL protocol (will append :// if not already provided)
     * Default: https://
     * @param {string} domain
     * URL domain - DO NOT include any paths as any '/' in the domain get removed
     * Default: ezclocker.com
     * @param {number|string} port
     * If port is a number or non-empty string the code will pre-pend ':' if missing
     * Default: blank
     * @param {string} pathAndParams
     * Will prepend the path's starting / if missing
     * Default: blank
     */
    static buildUrl(
        protocol = 'https://',
        domain = 'ezclocker.com',
        port = EzString.EMPTY,
        pathAndParams = EzString.EMPTY) {

        if (!EzString.hasLength(protocol)) {
            protocol = 'https://';
        }

        if (!EzString.hasLength(domain)) {
            domain = 'ezclocker.com';
        }

        if (!protocol.endsWith('://')) {
            protocol = `${protocol}://`;
        }

        if (0 <= domain.indexOf('/')) {
            domain = domain.replaceAll('/', '');
        }

        let portStr = EzString.EMPTY;

        if (EzNumber.isNumber(port)) {
            portStr = `:${port.toString()}`;
        } else if (EzString.hasLength(port)) {
            portStr = port.startsWith(':')
                ? port
                : `:${port}`;
        }

        if (EzString.hasLength(pathAndParams) && !pathAndParams.startsWith('/')) {
            pathAndParams = `/${pathAndParams}`;
        }

        return `${protocol}${domain}${portStr}${EzString.stringOrEmpty(pathAndParams)}`;
    }

    /**
     * @static
     * @public
     * Removes all spaces and line feeds from the provided aTemplateLitteralValue param. Then returns
     * the trimmed value.
     *
     * Example:
     *     EzUrl.url`
     *         https://ezclocker.com
     *         /employer/100
     *         ?target-time-zone-id=UTC`
     *     Result string: 'https://ezclocker.com/employer/100?target-time-zone-id=UTC';
     * @param {string} aTemplateLitteralValue
     * @returns {string}
     */
    static build(aStrings, ...aKeys) {
        let cleanValues = '';

        if (EzArray.arrayHasLength(aStrings)) {
            for (let x = 0; x < aStrings.length; x++) {
                let aString = aStrings[x];

                if (EzNumber.isNumber(aString) || EzBoolean.isBoolean(aString)) {
                    aString = aString.toString();
                }

                aString = EzString.stringHasLength(aString)
                    ? aString.trim()
                    : '';

                let cleanString = EzString.dropSTNR(aString);

                if (x < aKeys.length) {
                    let aKey = EzString.isString(aKeys[x])
                        ? aKeys[x].trim()
                        : EzObject.assignOrDefault(aKeys[x], '');

                    aKey = EzNumber.isNumber(aKey) || EzBoolean.isBoolean(aKey)
                        ? aKey.toString()
                        : EzString.stringOrEmpty(aKey);

                    cleanString = `${cleanString}${EzString.dropSTNR(aKey)}`.trim();
                }

                cleanValues = `${cleanValues}${cleanString}`.trim();
            }
        }

        return cleanValues;
    }

    /**
     * @static
     * @public @method
     * Applies URL decoding to the provided string
     * Convenience method that forwards to EzString.decodeUrl
     * @param {string} value
     * @param {undefined|null|boolean} replacePlusWithSpace
     * If true, replaces any + symbol with a space
     * @returns {string}
     */
    static decodeURL(value, replacePlusWithSpace) {
        return EzString.decodeURL(value, replacePlusWithSpace);
    }

    /**
     * @static
     * @public @method
     * Applies URL encoding to the provided string
     * Convenience method that forwards to EzString.encodeUrl
     * @param {string} value
     * @returns {string}
     */
    static encodeURL(value) {
        return EzString.encodeURL(value);
    }

    /**
     * @static
     * @private @method
     * Obtains the current environment from the public api
     * @returns {Promise.resolve}
     */
    static async ezLoadEnvironmentId() {
        return EzPromise.asyncAction(
            async (finished) => {
                await axios.get(
                    EzUrl.build`
                        ${EzUrl.basePublicApiVersionPath('v1')}
                        /version`)
                    .then(
                        (response) => {
                            if (EzString.hasLength(response.environment)) {
                                EzUrl.ezEnvironment = response.environment.toLowerCase();
                            }

                            if (!EzString.hasLength(EzUrl.ezEnvironment) && EzString.hasLength(response.targetEnvironment)) {
                                EzUrl.ezEnvironment = response.targetEnvironment.toLowerCase();
                            }

                            if (!EzString.hasLength(EzUrl.ezEnvironment)) {
                                EzUrl.ezEnvironment = ezApi.ezclocker.ezUrlHelper.ezGetEnvironmentFromUrl().toLowerCase();
                            }

                            if (!EzString.hasLength(EzNavigation.ezInstance.ezEnvironment)) {
                                EzUrl.ezEnvironment = EzEnvironment.PRD;
                            }

                            return finished(EzUrl.ezEnvironment);
                        })
                    .catch(
                        (eResponse) => {
                            console.warn(
                                EzString.em`
                                    Encountered an unexpected exception while loading the current enviornment id:
                                    ${eResponse.message}
                                    Defaulting to production (prd) environment.
                                    [Error response: ${EzJson.toJson(eResponse)}]`);

                            EzUrl.ezEnvironment = 'prd';

                            return finished(EzUrl.ezEnvironment);
                        })
            });
    }
}

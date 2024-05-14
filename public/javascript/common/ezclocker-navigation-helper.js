import { EzClass } from '/ezlibrary/EzClass.js';

import {
    EzObject,
    EzBoolean,
    EzString,
    EzArray,
    EzUrl,
    EzJson
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * Provides website navigation utility methods
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *     import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Listen for ready event:
 *     globalThis.ezApi.ezclocker?.[EzNavigation.ezApiName]?.ready
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Listen for ready event:
 *     document.addEventListener(
 *         EzNavigation.ezEventNames.onReady,
 *         {listening_class}.#ezRegistrator);
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Access singleton instance:
 *      Within EzmNavigator: EzNavigation.ezInstance
 *      Outside of EzmNavigator: ezApi.ezclocker.ezNavigation
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzNavigation extends EzClass {
    /**
        @public @static @readonly @property
        @returns {string}
     */
    static get EZPathVar_employerId() {
        return '[EZPV_employerId]';
    }

    /**
        @public @static @readonly @property
        @returns {string}
     */
    static get EZPathVar_employeeId() {
        return '[EZPV_employeeId]';
    }

    /**
        @public @static @readonly @property
        @returns {string}
     */
    static get EZPathVar_userId() {
        return '[EZPV_userId]';
    }

    /**
        @public @static @readonly @property
        @returns {string}
     */
    static get EZPathVar_id() {
        return '[EZPV_id]';
    }

    /**
        @public @static @readonly @property
        @returns {string}
     */
    static get SIGN_IN_PATH() {
        return '/resources/j_spring_security_check';
    }

    /**
        @public @static @readonly @property
        @returns {string}
     */
    static get SIGN_OUT_PATH() {
        return '/resources/j_spring_security_logout';
    }

    /**
        @public @static @readonly @property
        @returns {string}
     */
    static get MOBILE_PUBLIC_PATH() {
        return '/mobile/public';
    }

    /**
        @public @static @readonly @property
        @returns {string}
     */
    static get MOBILE_SECURE_PATH() {
        return '/mobile/secure';
    }

    /**
        @public @static @readonly @property
        @returns {string}
     */
    static get NEW_MOBILE_PATH() {
        return '/m';
    }

    /**
        @public @static @readonly @property
        @returns {string}
     */
    static get NEW_MOBILE_PUBLIC_PATH() {
        return EzNavigation.NEW_MOBILE_PATH + '/p';
    }

    /**
        @public @static @readonly @property
        @returns {string}
     */
    static get NEW_MOBILE_SECURE_PATH() {
        return EzNavigation.NEW_MOBILE_PATH + '/s';
    }

    /**
        @public @static @readonly @property
        @returns {string}
     */
    static get WEBSITE_SECURE_PATH() {
        return '/secure';
    }

    /**
        @public @static @readonly @property
        @returns {string}
     */
    static get WEBSITE_PUBLIC_PATH() {
        return '/public';
    }

    /**
        @public @static @readonly @property
        @returns {string}
     */
    static get INTERNAL_API_PATH_PREFIX() {
        return '_api';
    }

    /**
        @public @static @readonly @property
        @returns {string}
     */
    static get INTERNAL_CLASSIC_API_PATH_PREFIX() {
        return '_';
    }

    /**
        @public @static @readonly @property
        @returns {string}
     */
    static get PUBLIC_API_PATH_PREFIX() {
        return 'api';
    }

    /**
        @public @static @readonly @property
        @returns {string}
     */
    static get DEFAULT_INTERNAL_API_VERSION() {
        return 'v1';
    }

    /**
        @static
        @public @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'ezNavigation';
    }

    /**
        @public @static @readonly @property
        @returns {string}
     */
    static get ezApiShortName() {
        return 'nav';
    }

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzNavigation_Ready'
        };
    }
    /**
            @static
            @private @field
            Stores the singleton instance of this class that was created by and registerd with EzApi.
            @type {EzNavigation}
         */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzNavigation.ezApiName])
        ? globalThis.ezApi.ezclocker[EzNavigation.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzNavigation}
     */
    static get ezInstance() {
        return EzNavigation.#ezInstance;
    }

    /**
        @static
        @public @property @setter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzNavigation} instance
     */
    static set ezInstance(instance) {
        if (null != EzNavigation.#ezInstance) {
            throw new Error('EzNavigation\'s singleton instance is already reigstered with EzApi.');
        }

        EzNavigation.#ezInstance = instance;
    }

    /**
        @static
        @private @field
        Stores the EzApi registration state for this class.
        Default value is NULL
        Class is registerd with EzApi when value is EzRegistrationState.REGISTERED
        @type {string}
        A valid enum property value from EzRegistrationState
     */
    static #ezApiRegistrationState = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzNavigation.ezApiName])
        ? EzRegistrationState.REGISTERED
        : null;

    /**
        @static
        @public @property @getter
        Returns the ezApi registration state of this classes's singleton instance.
        @returns {string}
        A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzNavigation.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzNavigation.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
        @static
        @private @readonly @property
        Returns true when all required dependencies for this class report ready.
        In otherwords, the require dependency's singleton instance is created
        and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
        @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzNavigation.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName].ready;
    }

    /**
        @static
        @private @readonly @property
        Returns if this class's singleton instance is registered with ezApi yet.
        @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzNavigation.ezInstance &&
            EzRegistrationState.REGISTERED === EzNavigation.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzNavigation.#ezCanRegister && !EzNavigation.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(
                EzNavigation,
                EzNavigation.ezApiName,
                false,
                [EzNavigation.ezApiShortName]);
        }

        return EzNavigation.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzNavigation.ezApiName
            2) Property getter EzNavigation.ezEventNames
            3) Property getter EzNavigation.ezInstance
            4) Property setter EzNavigation.ezInstance
            5) Property getter EzNavigation.ezApiRegistrationState
            6) Property setter EzNavigation.ezApiRegistrationState
            7) Property getter EzNavigation.#ezCanRegister
            8) Property getter EzNavigation.#ezIsRegistered
            9) Method EzNavigation.#ezRegistrator()
     */
    static {
        if (!EzNavigation.#ezIsRegistered) {
            EzNavigation.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzNavigation.#ezRegistrator()) {
                document.addEventListener(
                    EzNavigation.ezOnEzApiReadyEventName,
                    EzNavigation.#ezRegistrator);

                document.addEventListener(
                    EzHttpHelper.ezEventNames.onReady,
                    EzNavigation.#ezRegistrator);
            }
        }
    }

    /**
        @public @field
        @type {boolean}
     */
    isDeveloperDocs = false;

    /**
        @public @field
        @type {boolean}
     */
    enableFileRevision = true;

    /**
        @private @field
        @type {string}
     */
    #ezEnvironment = 'prd';
    /**
        @public @getter @property
        @returns {string}
     */
    get ezEnvironment() {
        return this.#ezEnvironment;
    }
    /**
        @public @setter @property
        @param {string} environment
     */
    set ezEnvironment(environment) {
        this.#ezEnvironment = EzString.hasLength(environment)
            ? environment
            : 'prd';
    }

    /**
        @public @readonly @property
        @returns {string}
     */
    get revisionVersion() {
        return 'r72-3';
    }

    /**
        @protected @method
        Initializes EzNavigation
        @returns {EzNavigation}
     */
    ezInit() {
        EzNavigation.ezInstance.ezLoadEnvironmentId();
        return EzNavigation.ezInstance;
    }

    /**
        @public @method
        Obtains the current environment
        @returns {Promise.resolve}
     */
    ezLoadEnvironmentId() {
        ezApi.ezclocker.ezHttpHelper.ezGet(
            EzNavigation.ezInstance.ezGetPublicApiUrl('version', 'v1'))
            .then(
                (response) => {
                    if (EzString.hasLength(response.environment)) {
                        EzNavigation.ezInstance.ezEnvironment = response.environment.toLowerCase();
                    }

                    if (!EzString.hasLength(EzNavigation.ezInstance.ezEnvironment) && EzString.hasLength(response.targetEnvironment)) {
                        EzNavigation.ezInstance.ezEnvironment = response.targetEnvironment.toLowerCase();
                    }

                    if (!EzString.hasLength(EzNavigation.ezInstance.ezEnvironment)) {
                        EzNavigation.ezInstance.ezEnvironment = ezApi.ezclocker.ezUrlHelper.ezGetEnvironmentFromUrl().toLowerCase();
                    }

                    if (!EzString.hasLength(EzNavigation.ezInstance.ezEnvironment)) {
                        EzNavigation.ezInstance.ezEnvironment = 'prd';
                    }
                },
                (eResponse) => {
                    ezApi.ezclocker.ezLogger.warn(
                        ezApi.ezEM`
                            EzNavigation: Environment information was not available. Defaulting to enviornment PRD
                            Error response: ${ezApi.ezToJson(eResponse)}`);

                    EzNavigation.ezInstance.ezEnviornment = 'prd';
                });
    }

    /**
        @public @method
        Returns the ezClocker base url
        @returns {String}
     */
    ezGetBaseUrl() {
        let baseUrl = window.location.origin;

        let currentPath = window.location.pathname;
        let pathItems = currentPath.split('/');

        if (2 <= pathItems.length && 'ezclocker' === pathItems[1].toLowerCase()) {
            return ezApi.ezUrlTemplate`${baseUrl}/${pathItems[1]}`;
        }

        return baseUrl;
    }

    /**
        @public @method
        Returns the URL in the current window.location.origin
     */
    ezGetLocationUrl() {
        return window.location.href.toString();
    }

    /**
        @public @method
        Builds a url and then applies the file revision param.
        @param {string} baseUrl
        @param {array} pathParts
        Default: empty array
        @param {undefined|null|boolean} noFileRevision
        Default: false
     */
    ezBuildUrl(baseUrl, pathParts, noFileRevision) {
        if (!EzArray.arrayHasLength(pathParts)) {
            return EzNavigation.ezInstance.ezApplyFileRevision(EzObject.isValid(baseUrl)
                ? baseUrl
                : '/');
        }

        let path = EzString.hasLength(baseUrl)
            ? ezApi.ezPostSlash(baseUrl)
            : EzString.EMPTY;

        for (let pathPart of pathParts) {
            if (EzString.hasLength(pathPart)) {
                // Appending to path: {arguments[ai]}/
                if ('/' === path[path.length - 1]) {
                    // Remove if first character is a /
                    path = path.substr(0, path.length - 1);
                }

                let useSlash = '/' === pathPart[0]
                    ? EzString.EMPTY
                    : '/';

                path = `${path}${useSlash}${pathPart}`;
            }
        }

        return EzBoolean.isTrue(noFileRevision)
            ? path
            : EzNavigation.ezInstance.ezApplyFileRevision(path);
    }

    /**
        @public
        Returns the url for a dynamic page. Example: https://ezclocker.com/dynamic/{pagename}
        @param {string} pageName
        @returns {string}
     */
    ezGetDynamicPageUrl(pageName) {
        return ezApi.ezBuildUrl(
            EzNavigation.ezInstance.ezGetBaseUrl(),
            ['dynamic', pageName]);
    }

    /**
        @param {string} urlSnip
        @public
     */
    ezGetUrlFromBase(urlSnip) {
        return ezApi.ezBuildUrl(
            EzNavigation.ezInstance.ezGetBaseUrl(),
            [urlSnip]);
    }

    /**
        @public
        Returns the environment the website is running within
        @returns {Promise.resolve}
     */
    ezGetEnvironment() {
        if (EzString.hasLength(EzNavigation.ezInstance.ezEnvironment)) {
            return ezApi.ezResolve(EzNavigation.ezInstance.environment);
        }

        return ezApi.ezPromise(
            (resolve) => {
                let url = EzNavigation.ezInstance.ezBuildUrl(
                    EzNavigation.ezInstance.ezGetBaseUrl(),
                    ['environment']);
                ezApi.ezclocker.ezHttpHelper.ezGet(url)
                    .then(
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                    .then(
                        (response) => {
                            EzNavigation.ezInstance.environment = response.message;
                            return resolve(EzNavigation.ezInstance.environment);
                        },
                        (eResponse) => {
                            let em = ezApi.ezclocker.ezHttpHelper.extractErrorResponseMessage(eResponse);
                            ezApi.ezclocker.logger.error(em);
                            return resolve('PRD');
                        });
            });
    }

    /**
        @public
        Navigates to the provided URL
        @param {string} url
        @returns {window.location}
     */
    ezNavigateTo(url, skipRevision) {
        let urlToUse = EzBoolean.isTrue(skipRevision)
            ? url
            : EzNavigation.ezInstance.ezApplyFileRevision(url);

        if (ezApi.ezIsFunction(window.location.assign)) {
            return window.location.assign(urlToUse);
        }
        window.location = urlToUse;

        return window.location;
    }

    /**
     * @public @method
     * If website revsion version is enabled, the url is returned with the file revision param appended:
     *      Template for URL without params........: `${url}?v=${ezApi.ezclocker.ezNavigation.revisionVersion}`
     *      Template for URL with existing params..: `${url}&v=${ezApi.ezclocker.ezNavigation.revisionVersion}`
     * Otherwise, the url is returned as provided.
     * @param {undefined|null|string} url
     * @returns {string}
     */
    ezApplyFileRevision(url) {
        if (!EzString.hasLength(url)) {
            return url; // no url to file rev
        }

        if (EzBoolean.isFalse(EzNavigation.ezInstance.enableFileRevision) || !EzString.hasLength(EzNavigation.ezInstance.revisionVersion) ||
            -1 != url.indexOf(`v=${EzNavigation.ezInstance.revisionVersion}`)) {
                return url;
        }

        return -1 != url.indexOf('?')
            ? `${url}&v=${EzNavigation.ezInstance.revisionVersion}`
            : `${url}?v=${EzNavigation.ezInstance.revisionVersion}`;
    }

    /**
        @public
        @param {string} pageName
        @returns {string}
     */
    ezGetSecurePageUrl(pageName) {
        return EzNavigation.ezInstance.ezBuildUrl(
            EzNavigation.ezInstance.ezGetBaseUrl(),
            [
                EzNavigation.WEBSITE_SECURE_PATH,
                pageName
            ]);
    }

    /**
        @public
        Builds a url for the websites public folder.
        Result Template: {EzNavigation.ezInstance.ezGetBaseUrl()}/EzNavigation.ezInstance.WEBSITE_PUBLIC_PATH/{urlSuffix}
        Example: https://ezclocker.com/public/{urlSuffix}
        @param {String} urlSuffix
        @returns {String}
     */
    ezBuildPublicUrl(urlSuffix) {
        return EzNavigation.ezInstance.ezBuildUrl(
            EzNavigation.ezInstance.ezGetBaseUrl(),
            [
                EzNavigation.WEBSITE_PUBLIC_PATH,
                urlSuffix
            ]);
    }

    /**
        @public
        @param {string} pageName
        @returns {string}
     */
    ezGetPublicPageUrl(pageName) {
        return EzNavigation.ezInstance.ezBuildUrl(
            EzNavigation.ezInstance.ezGetBaseUrl(),
            [
                EzNavigation.WEBSITE_PUBLIC_PATH,
                pageName
            ]);
    }

    /**
        @public
        Returns the full url for a page relative under the welcome url
        @param {string} pageName
        @returns {string}
     */
    ezGetWelcomePageUrl(pageName) {
        return EzNavigation.ezInstance.ezBuildUrl(EzNavigation.ezInstance.ezGetBaseUrl(), [
            EzNavigation.WEBSITE_WELCOME_PATH,
            pageName
        ]);
    }

    /**
        @public
        Navigates to a page relative to the welcome base url
        @param {string} pageName
     */
    ezNavigateToWelcomePage(pageName) {
        EzNavigation.ezInstance.ezNavigateTo(EzNavigation.ezInstance.ezBuildUrl(EzNavigation.ezInstance.ezGetBaseUrl(), [
            EzNavigation.WEBSITE_WELCOME_PATH,
            pageName
        ]), false);
    }

    /**
        Navigates the user to a root page or url
     */
    ezNavigateToRoot(subPath) {
        EzNavigation.ezInstance.ezNavigateTo(
            EzNavigation.ezInstance.ezBuildUrl(
                EzNavigation.ezInstance.ezGetBaseUrl(),
                [
                    EzString.EMPTY,
                    subPath
                ])
            , false);
    }

    /**
        @public
        @param {string} pathAndFileName
        @returns {string}
     */
    ezGetNodeModulesFile(pathAndFileName) {
        return EzNavigation.ezInstance.ezBuildUrl(
            EzNavigation.ezInstance.ezGetBaseUrl(),
            [
                '/node_modules/',
                pathAndFileName
            ]);
    }

    /**
        @public
        @param {string} pageName
     */
    ezNavigateToPublicPage(pageName) {
        EzNavigation.ezInstance.ezNavigateTo(EzNavigation.ezInstance.ezGetPublicPageUrl(pageName), false);
    }

    /**
        @public
        @param {string} pageName
     */
    ezNavigateToPublicMobilePage(pageName) {
        EzNavigation.ezInstance.ezNavigateTo(
            EzNavigation.ezInstance.ezBuildUrl(
                EzNavigation.ezInstance.ezGetBaseUrl(),
                [EzNavigation.MOBILE_PUBLIC_PATH, pageName]),
            false);
    }

    /**
        @public
        Naviagtes the browser to the 'new' public mobile page.
        Url template used: {EzNavigation.ezInstance.getBaseUrl()}/{EzNavigation.ezInstance.NEW_MOBILE_PUBLIC_PATH}/{urlSuffix}
        @param {String} urlSuffix
        @returns {window.location}
     */
    ezNavigateToNewMobilePublicPage(urlSuffix) {
        return EzNavigation.ezInstance.ezNavigateTo(
            EzNavigation.ezInstance.ezBuildUrl(
                EzNavigation.ezInstance.ezGetBaseUrl(),
                [
                    EzNavigation.NEW_MOBILE_PUBLIC_PATH,
                    urlSuffix
                ]));
    }

    /**
        @public @method
        Naviagtes the browser to the 'new' public mobile page.
        Url template used: {EzNavigation.ezInstance.getBaseUrl()}/{EzNavigation.ezInstance.NEW_MOBILE_PUBLIC_PATH}/{urlSuffix}
        @param {String} urlSuffix
        @returns {window.location}
     */
    ezNavigateToNewMobileSecurePage(urlSuffix) {
        return EzNavigation.ezInstance.ezNavigateTo(
            EzNavigation.ezInstance.ezBuildUrl(
                EzNavigation.ezInstance.ezGetBaseUrl(),
                [
                    EzNavigation.NEW_MOBILE_SECURE_PATH,
                    urlSuffix
                ]));
    }

    /**
        @public
        Navigates to the new mobile root path of /m and appends the provided mobileUriSuffx.
     */
    ezNavigateToNewMobileUri(mobileUriSuffix) {
        return EzNavigation.ezInstance.ezNavigateTo(
            EzNavigation.ezInstance.ezBuildUrl(
                EzNavigation.ezInstance.ezGetBaseUrl(),
                [
                    EzNavigation.NEW_MOBILE_PATH,
                    mobileUriSuffix
                ]));
    }

    /**
        @public
        Returns the full url to the public mobile page
        @param {string} pageName
        @returns {string}
     */
    ezGetPublicMobilePageUrl(pageName) {
        return EzNavigation.ezInstance.ezBuildUrl(
            EzNavigation.ezInstance.ezGetBaseUrl(),
            [
                EzNavigation.MOBILE_PUBLIC_PATH,
                pageName
            ]);
    }

    /**
        @deprecated
        Migrate to EzNavigation.ezInstance.ezRemoveVersionParamFromUri(uri);
        @public
        Removes the v= param from the provided url, partial url, or uri string.
        @parm {String} uri
        @returns {String}
     */
    ezRemoveVersionFromUri(uri) {
        return EzNavigation.ezInstance.ezRemoveVersionParamFromUri(uri);
    }

    /**
        @public @method
        Removes all the version params from the provided URI
        @param {string} uri
        @returns {string}
     */
    ezRemoveVersionParamFromUri(uri) {
        if (!EzString.hasLength(uri) || -1 == uri.indexOf('v=')) {
            // Doesn't have a version param
            return uri;
        }

        // Split out params
        let urlAllUrlParams = uri.split('?');
        if (2 != urlAllUrlParams.length) {
            return uri;
        }

        let url = urlAllUrlParams[0];
        let urlParams = urlAllUrlParams[1].split('&');
        if (0 != urlParams.length) {
            let params = EzString.EMPTY;

            for (let param of urlParams) {
                if (0 != param.indexOf('v=')) {
                    params = 0 == params.length
                        ? `?${param}`
                        : `${params}&${param}`;
                }
            }

            return `${url}${params}`;
        }

        return url;
    }

    /**
        @public
        Builds a url to the 'new' public mobile page.
        Result Template: /m/p/{urlSuffix}
        @param {String} urlSuffix
     */
    ezBuildNewMobilePublicPageUrl(urlSuffix) {
        return EzNavigation.ezInstance.ezBuildUrl(
            EzNavigation.ezInstance.ezGetBaseUrl(),
            [
                EzNavigation.NEW_MOBILE_PUBLIC_PATH,
                EzNavigation.ezInstance.ezRemoveVersionFromUri(urlSuffix)
            ]);
    }

    /**
        @public
        @param {string} pageName
     */
    ezNavigateToSecureMobilePage(pageName) {
        EzNavigation.ezInstance.ezNavigateTo(
            EzNavigation.ezInstance.ezBuildUrl(
                EzNavigation.ezInstance.ezGetBaseUrl(),
                [
                    EzNavigation.MOBILE_SECURE_PATH,
                    pageName
                ]),
            false);
    }

    /**
        @public
        Displays the download mobile app page now, no mobile signin
     */
    ezNavigateToMobileSignIn() {
        let mobileSigninUri = 'm/p/download';

        ezApi.ezclocker.ezHttpHelper.ezGet(EzNavigation.ezInstance.ezGetSignOutUrl())
            .then(
                () => EzNavigation.ezInstance.ezNavigateToPublicMobilePage(mobileSigninUri),
                () => EzNavigation.ezInstance.ezNavigateToPublicMobilePage(mobileSigninUri));
    }

    /**
        @public
        @param {string|null} errorMessage
        @param {string|null} userName
     */
    ezNavigateToSignIn(errorMessage, email, username) {
        let errorParam = EzString.hasLength(errorMessage)
            ? `?error=${errorMessage}`
            : EzString.EMPTY;

        let emailParam = EzString.hasLength(email)
            ? `?email=${email}`
            : EzString.EMPTY;

        let userNameParam = EzString.hasLength(username)
            ? `?username=${username}`
            : EzString.EMPTY;

        let signInPage = EzUrl.build`
            signin/
            ${emailParam}
            ${userNameParam}
            ${errorParam}`

        ezApi.ezclocker.ezHttpHelper.ezGet(EzNavigation.ezInstance.ezGetSignOutUrl())
            .then(
                () => EzNavigation.ezInstance.ezNavigateToPublicPage(signInPage),
                (eResponse) => {
                    ezApi.ezclocker.ezLogger.error(`Signout failure: ${EzJson.toJson(eResponse)}`);

                    EzNavigation.ezInstance.ezNavigateToPublicPage(signInPage);
                });
    }

    /**
        @public
        Navigates the user to the ezClocker Sign Up page
        @param {String|null} userName
     */
    ezNavigateToSignUp(email, userName) {
        EzNavigation.ezInstance.ezNavigateToPublicPage(
            ezApi.ezUrlTemplate`
                signup.html
                    ?email=${EzString.stringOrEmpty(email)}
                    &username=${EzString.stringOrEmpty(userName)}`);
    }

    /**
        @public
        @param {string} url
        @param {string} queryName
        @param {string} queryValue
        @returns {string}
     */
    ezAddQueryParam(url, queryName, queryValue) {
        if (ezApi.ezIsEmptyString(queryName)) {
            return url;
        }
        if (ezApi.ezIsNotValid(queryValue)) {
            return url;
        }
        if (!url) {
            return url;
        }

        url = -1 == url.indexOf('?')
            ? `${url}?`
            : `${url}&`;

        return `${url}${queryName}=${queryValue}`;
    }

    /**
        @public
        Signs the currently logged in user out by navigating to the logout url.
     */
    ezSignOut() {
        EzNavigation.ezInstance.ezNavigateTo(
            EzNavigation.ezInstance.ezGetSignOutUrl(),
            false);
    }

    /**
        @public
        Navigvates to the employer dashboard
     */
    ezNavigateToEmployerDashboard() {
        EzNavigation.ezInstance.ezNavigateToSecurePage('employer/');
    }

    /**
        @public
        Navigates to the employee dashboard
     */
    ezNavigateToEmployeeDashboard() {
        EzNavigation.ezInstance.ezNavigateToSecurePage('employeeDashboard.html');
    }

    /**
        @public
        Navigbates to the employer schedule
     */
    ezNavigateToEmployerSchedules() {
        EzNavigation.ezInstance.ezNavigateToSecurePage('schedule/');
    }

    /**
        @public
        Navigates to the employer time-off page
     */
    ezNavigateToTimeOff() {
        EzNavigation.ezInstance.ezNavigateToSecurePage('time-off/');
    }

    /**
        @public
        Navigbates to the employer schedule
     */
    ezNavigateToEmployeeSchedules() {
        EzNavigation.ezInstance.ezNavigateToSecurePage('es.html');
    }

    /**
        @public
        Navigates to the employee archive
     */
    ezNavigateToEmployeeArchive() {
        EzNavigation.ezInstance.ezNavigateToSecurePage('archive/');
    }

    /**
        @public
        Navigates to the Account page
     */
    ezNavigateToEmployerAccountPage(optionalParams) {
        if (EzString.hasLength(optionalParams)) {
            EzNavigation.ezInstance.ezNavigateToSecurePage(`account?${optionalParams}}`);
        } else {
            EzNavigation.ezInstance.ezNavigateToSecurePage('account/');
        }
    }
    /**
     @public
     Navigates to the Integrations page
     */
    ezNavigateToEmployerIntegrationsPage(optionalParams) {
        if (EzString.hasLength(optionalParams)) {
            //EzNavigation.ezInstance.ezNavigateToSecurePage(`integrations?${optionalParams}`);
            let url = EzNavigation.ezInstance.ezGetSecurePageUrl("integrations") + "&" + optionalParams;
            EzNavigation.ezInstance.ezNavigateTo(
                url,
                false);
        } else {
            EzNavigation.ezInstance.ezNavigateToSecurePage('integrations/');
        }
    }

    /**
        @public
        Navigates to the base url
     */
    ezNavigateToMain() {
        EzNavigation.ezInstance.ezNavigateTo(EzNavigation.ezInstance.ezGetBaseUrl());
    }

    /**
        @public
        Navigates to the public ezClocker landing page
     */
    ezNavigateToLandingPage() {
        EzNavigation.ezInstance.ezNavigateTo(
            EzNavigation.ezInstance.ezBuildUrl(
                EzNavigation.ezInstance.ezGetBaseUrl(),
                ['/welcome']),
            false);
    }

    /**
        @public
        Gets the ezclocker logout url
        @returns {String}
     */
    ezGetSignOutUrl() {
        return EzNavigation.ezInstance.ezBuildUrl(
            EzNavigation.ezInstance.getBaseUrl(),
            [EzNavigation.SIGN_OUT_PATH]);
    }

    /**
        @public
        Obtains the sign-in url for ezClocker
        @returns {String}
     */
    ezGetSigninUrl() {
        return EzNavigation.ezInstance.ezBuildUrl(
            EzNavigation.ezInstance.getBaseUrl(),
            [EzNavigation.SIGN_IN_PATH]);
    }

    /**
        @public
        Returns the full url for a internal classic api endpoint
        @param {string} serviceName
        Name of the service (without the underscore prefix)
        @returns {string}
     */
    ezGetInternalClassicApiUrl(serviceName) {
        return EzBoolean.isTrue(EzNavigation.ezInstance.isDeveloperDocs)
            ? EzNavigation.ezInstance.ezGetPublicClassicApiUrl(serviceName)
            : ezApi.ezBuildUrl(
                EzNavigation.ezInstance.ezGetBaseUrl(),
                [
                    `${EzNavigation.INTERNAL_CLASSIC_API_PATH_PREFIX}${serviceName}`
                ]);
    }

    /**
        @public
        Builds an internal api url. If apiVersion is not provided, the default api version is used.
        Template: {domain}/_api/{apiVersion}/{urlSuffix}
        @param {String} urlSuffix
        @param {String|null} apiVersion
        @returns {String}
     */
    ezBuildInternalApiUrl(urlSuffix, apiVersion) {
        return ezApi.ezBuildUrl(
            EzNavigation.ezInstance.ezGetBaseUrl(),
            [
                EzNavigation.INTERNAL_API_PATH_PREFIX,
                ezApi.ezAssignOrDefault(apiVersion, EzNavigation.DEFAULT_INTERNAL_API_VERSION),
                urlSuffix
            ]);
    }

    /**
        @public
        Returns the url for an internal api
        @param {string} serviceName
        @param {string|null} version
        @returns {string}
     */
    ezGetInternalApiUrl(serviceName, version) {
        if (!EzString.hasLength(version)) {
            version = EzNavigation.DEFAULT_INTERNAL_API_VERSION;
        }

        return EzNavigation.ezInstance.isDeveloperDocs
            ? EzNavigation.ezInstance.ezGetPublicApiUrl(serviceName, version)
            : ezApi.ezBuildUrl(
                EzNavigation.ezInstance.ezGetBaseUrl(),
                [
                    EzNavigation.INTERNAL_API_PATH_PREFIX,
                    version,
                    serviceName
                ]);
    }

    /**
        @public
        @param {string} serviceName
        @returns {string}
     */
    ezGetPublicClassicApiUrl(serviceName) {
        return ezApi.ezBuildUrl(
            EzNavigation.ezInstance.ezGetBaseUrl(),
            [serviceName]);
    }

    /**
        @public
        Obtains the full Url to an ezclocker public api
        @param {string} serviceName
        @param {string} version
     */
    ezGetPublicApiUrl(serviceName, version) {
        return ezApi.ezBuildUrl(
            EzNavigation.ezInstance.ezGetBaseUrl(),
            [
                EzNavigation.PUBLIC_API_PATH_PREFIX,
                EzString.hasLength(version)
                    ? version
                    : EzNavigation.DEFAULT_INTERNAL_API_VERSION,
                serviceName
            ]);
    }

    /**
        @public
        @param {string} subServiceName
        @returns {string}
     */
    ezGetPublicAdminServiceUrl(subServiceName) {
        return ezApi.ezIsEmptyString(subServiceName)
            ? ezApi.ezBuildUrl(
                EzNavigation.ezInstance.ezGetBaseUrl(),
                ['/api/v1/admin'])
            : ezApi.ezBuildUrl(
                EzNavigation.ezInstance.ezGetBaseUrl(),
                ['/api/v1/admin', subServiceName]);
    }

    /**
        @public @method
        Returns the full url to use for the image.
        @param {string} imageName
     */
    ezGetPublicImagesUrl(imageName) {
        imageName = imageName
            .replace('public/', EzString.EMPTY)
            .replace('images/', EzString.EMPTY);

        if ('/' !== imageName[0]) {
            imageName = `/${imageName}`;
        }

        return EzNavigation.ezInstance.ezBuildUrl(
            EzNavigation.ezInstance.ezGetStaticResourcesBaseUrl(),
            [
                '/images',
                imageName
            ]);
    }

    /**
        @public @method
        Returns the static resources URL to use
        @returns {string}
     */
    ezGetStaticResourcesBaseUrl() {
        switch (EzNavigation.ezInstance.ezEnvironment) {
            case 'dev':
                let url = window.location.href;
                if (-1 !== url.indexOf('dev2.ezclocker.com')) {
                    return 'https://website.dev.ezclocker.com/dev2'
                }
                return `https://website.dev.ezclocker.com/${EzNavigation.ezInstance.ezEnvironment}`
            case 'loc':
            case 'qal':
            case 'e2e':
            case 'prf':
                return `https://website.dev.ezclocker.com/${EzNavigation.ezInstance.ezEnvironment}`
            case 'stg':
            case 'prd':
                return `https://website.prd.ezclocker.com/prd`
        }
    }

    /**
        @public
        Navigates to the mobile site to the provided page
        @param {string} url
     */
    ezRedirectToMobileSitePage(page) {
        if (!EzString.hasLength(page)) {
            return false; // no where to navigate to
        }

        if (EzObject.isValid(jQuery) && EzObject.isValid(jQuery.browser) && EzObject.isValid(jQuery.browser.mobile)) {
            EzNavigation.ezInstance.ezNavigateToPublicMobilePage(page);
            return true;
        }

        return false;
    }

    /**
        @public
        Uses the re-direct service to navigate a user to their dashboard
        @param {boolean|null} mobile
     */
    ezRedirectToDashboard(mobile) {
        let redirect = EzBoolean.isTrue(mobile)
            ? 'redirectToDashboard?mobile=true'
            : 'redirectToDashboard';

        EzNavigation.ezInstance.ezNavigateTo(
            EzNavigation.ezInstance.ezGetUrlFromBase(redirect));
    }

    /**
        @public
        Navigates to a secure HTML page
        @param {string} pageName
    */
    ezNavigateToSecurePage(pageName) {
        EzNavigation.ezInstance.ezNavigateTo(
            EzNavigation.ezInstance.ezGetSecurePageUrl(pageName),
            false);
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezNavigateToSecurePage()
     */
    navigateToSecurePage(pageName) {
        EzNavigation.ezInstance.ezNavigateToSecurePage(pageName);
    }


    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezGetPublicAdminServiceUrl()
     */
    getPublicAdminServiceUrl(subserviceName) {
        return EzNavigation.ezInstance.ezGetPublicAdminServiceUrl(subserviceName);
    }

    /**
        @deprecated Migrate to ezApi.ezclocker.ezAccountServices.ezSignOut()
        @public
        Signs out the current user without notifications
        @returns {Promise}
     */
    ezSilentSignOut() {
        return ezApi.ezclocker.ezHttpHelper.ezGet(EzNavigation.ezInstance.ezGetSignOutUrl())
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @deprecated
        Migrate to ezApi.ezclocker.ezAccountServices.ezSilentSignIn()
        @public
        Signs in a user using the user name and password without prompting them for input.
        @param {String} username
        @param {String} password
        @param {function} success
        @param {function} failure
     */
    silentSignIn(username, password, success, failure) {
        ezApi.ezclocker.ezHttpHelper.ezPost(
            ezApi.ezUrlTemplate`
                ${EzNavigation.EZPathVar_employerId.SIGN_IN_PATH}
                    ?j_username=${ezApi.ezEncode(username)}
                    &j_password=${ezApi.ezEncode(password)}`)
            .then(
                (response, jqXHR) => ezApi.ezCallback(success, response, jqXHR),
                (eResponse, jqXHR) => {
                    ezApi.ezclocker.ezLogger.error(`Failed to silently sign in: ${ezApi.ezToJson(eResponse)}`);
                    ezApi.ezCallback(failure, eResponse, jqXHR);
                });
    }

    /**
        @deprecated
        Migrate to ezApi.ezclocker.ezAccountServices.ezSilentSignIn()
        @public
        Signs in a user without notifications
        @param {String} username
        @param {String} password
        @returns {Promise}
     */
    ezSilentSignIn(username, password) {
        return ezApi.ezclocker.ezHttpHelper.ezPost(
            ezApi.ezUrlTemplate`
                ${EzNavigation.ezInstance.ezGetSigninUrl()}
                ?j_username=${username}
                &j_password=${password}`);
    }

    /**
        @deprecated
        Migrate to:
            EzApi.ezInstance.ezBuildUrl(
                EzNavigation.ezInstance.ezGetBaseUrl(),
                [servicePath]);
        @public
        Returns a full url for the provided service path
        @param {string} servicePath
        @returns {string}
     */
    getServiceUrl(servicePath) {
        return ezApi.ezBuildUrl(
            EzNavigation.ezInstance.ezGetBaseUrl(),
            [servicePath]);
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezGetInternalClassicApiUrl()
     */
    getInternalClassicApiUrl(serviceName) {
        return EzNavigation.ezInstance.ezGetInternalClassicApiUrl(serviceName);
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezGetInternalClassicApiUrl()
     */
    getInternalClassicServiceUrl(serviceName) {
        return EzNavigation.ezInstance.ezGetInternalClassicApiUrl(serviceName);
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezGetInternalApiUrl()
     */
    getInternalApiUrl(serviceName, version) {
        return EzNavigation.ezInstance.ezGetInternalApiUrl(serviceName, version);
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezGetInternalApiUrl()
     */
    ezGetInternalApiServiceUrl(serviceName, version) {
        return EzNavigation.ezInstance.ezGetInternalApiUrl(serviceName, version);
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezGetInternalApiUrl()
     */
    getInternalApiServiceUrl(serviceName, version) {
        return EzNavigation.ezInstance.ezGetInternalApiUrl(serviceName, version);
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezGetPublicClassicApiUrl()
     */
    getPublicClassicServiceUrl(serviceName) {
        return EzNavigation.ezInstance.ezGetPublicClassicApiUrl(serviceName);
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezGetPublicClassicApiUrl()
     */
    ezGetPublicClassicServiceUrl(serviceName) {
        return EzNavigation.ezInstance.ezGetPublicClassicApiUrl(serviceName);
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezGetPublicClassicApiUrl()
     */
    getPublicClassicApiUrl(serviceName) {
        return EzNavigation.ezInstance.ezGetPublicClassicApiUrl(serviceName);
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezGetPublicApiUrl()
     */
    getPublicApiServiceUrl(path) {
        return EzNavigation.ezInstance.ezGetPublicApiUrl(path);
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezGetPublicApiUrl()
     */
    ezGetPublicApiServiceUrl(path) {
        return EzNavigation.ezInstance.ezGetPublicApiUrl(path);
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezGetPublicApiUrl()
     */
    getPublicApiUrl(path) {
        return EzNavigation.ezInstance.ezGetPublicApiUrl(path);
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezGetUrlFromBase()
     */
    getUrlFromBase(path) {
        EzNavigation.ezInstance.ezGetUrlFromBase(path);
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezGetPublicImagesUrl()
     */
    getPublicImagesUrl(imageName) {
        return EzNavigation.ezInstance.ezGetPublicImagesUrl(imageName);
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezGetEnvironment()
     */
    getEnvironment() {
        EzNavigation.ezInstance.ezGetEnvironment();
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezNavigateTo()
     */
    navigateTo(path, skipRevision) {
        EzNavigation.ezInstance.ezNavigateTo(path, skipRevision);
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezGetSecurePageUrl()
     */
    getSecurePageUrl(pageName) {
        EzNavigation.ezInstance.ezGetSecurePageUrl(pageName);
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezGetPublicPageUrl()
     */
    getPublicPageUrl(pageName) {
        EzNavigation.ezInstance.ezGetPublicPageUrl(pageName);
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezGetNodeModulesFile()
     */
    getNodeModulesFile(pathAndFileName) {
        EzNavigation.ezInstance.ezGetNodeModulesFile(pathAndFileName);
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezNavigateToPublicPage()
     */
    navigateToPublicPage(path) {
        return EzNavigation.ezInstance.ezNavigateToPublicPage(path);
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezNavigateToPublicMobilePage()
     */
    navigateToPublicMobilePage(path) {
        return EzNavigation.ezInstance.ezNavigateToPublicMobilePage(path);
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezGetPublicMobilePageUrl()
     */
    getPublicMobilePageUrl(path) {
        return EzNavigation.ezInstance.ezGetPublicMobilePageUrl(path);
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezNavigateToSecureMobilePage()
     */
    navigateToSecureMobilePage(path) {
        return EzNavigation.ezInstance.ezNavigateToSecureMobilePage(path);
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezNavigateToMobileSignIn()
     */
    navigateToMobileSignIn() {
        return EzNavigation.ezInstance.ezNavigateToMobileSignIn();
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezNavigateToSignIn()
     */
    navigateToSignIn() {
        return EzNavigation.ezInstance.ezNavigateToSignIn();
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezSignOut()
     */
    signOut() {
        return EzNavigation.ezInstance.ezSignOut();
    }

    /**
        @deprecated Migrate to ezApi.ezclocker.ezAccountServices.ezSignOut()
     */
    silentSignOut() {
        return EzNavigation.ezInstance.ezSilentSignOut();
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezNavigateToEmployerDashboard()
     */
    navigateToEmployerDashboard() {
        return EzNavigation.ezInstance.ezNavigateToEmployerDashboard();
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezNavigateToEmployeeDashboard()
     */
    navigateToEmployeeDashboard() {
        return EzNavigation.ezInstance.ezNavigateToEmployeeDashboard();
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezNavigateToEmployerSchedules()
     */
    navigateToEmployerSchedules() {
        return EzNavigation.ezInstance.ezNavigateToEmployerSchedules();
    }


    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezNavigateToEmployeeArchive()
     */
    navigateToEmployeeArchive() {
        return EzNavigation.ezInstance.ezNavigateToEmployeeArchive();
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezNavigateToEmployerAccountPage()
     */
    navigateToEmployerAccountPage() {
        return EzNavigation.ezInstance.ezNavigateToEmployerAccountPage();
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezNavigateToMain()
     */
    navigateToMain() {
        return EzNavigation.ezInstance.ezNavigateToMain();
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezNavigateToLandingPage()
     */
    navigateToLandingPage() {
        return EzNavigation.ezInstance.ezNavigateToLandingPage();
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezGetBaseUrl()
     */
    getBaseUrl() {
        return EzNavigation.ezInstance.ezGetBaseUrl();
    }

    /**
        @deprecated
        Migrate to EzNavigation.ezInstance.ezGetSignOutUrl()
     */
    ezGetLogoutUrl() {
        return EzNavigation.ezInstance.ezGetSignOutUrl();
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezGetSignOutUrl()
     */
    getLogoutUrl() {
        return EzNavigation.ezInstance.ezGetSignOutUrl();
    }

    /**
        @deprecated Migrate to EzNavigation.ezInstance.ezGetSigninUrl()
     */
    getSigninUrl() {
        return EzNavigation.ezInstance.ezGetSigninUrl();
    }
}

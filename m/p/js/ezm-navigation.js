import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzNumber,
    EzString
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

/**
 * @class
 * @extends {EzClass}
 * Provides various mobile site navigation utilities
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *      import { EzmNavigator } from '/m/p/js/ezm-navigation.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Check ready state:
 *      globalThis.ezApi.ezclocker?.[EzNavigator.ezApiName]?.ready
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Listen for ready event:
 *      document.addEventListener(
 *          EzNavigator.ezEventNames.onReady,
 *          {listening_class}.#ezRegistrator);
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Access singleton instance:
 *      Within EzmNavigator: EzmNavigator.ezInstance
 *      Outside of EzmNavigator: ezApi.ezclocker.ezmNavigator
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzmNavigator extends EzClass {
/**
     * @static
     * @public @readonly @property
     * Gets the ezClocker website and services default domain (for production)
     * @returns {string}
 */
    static get EZCLOCKER_DEFAULT_DOMAIN() {
        return 'ezclocker.com';
    }

    /**
     * @static
     * @public @readonly @property
     * Gets the ezClocker website's mobile path (aka /m)
     * @returns {string}
     */
    static get EZCLOCKER_WEBSITE_MOBILE_PATH() {
        return '/m';
    }

    /**
     * @static
     * @public @readonly @property
     * Gets the ezClocker website's mobile public path (aka /m/p)
     * @returns {string}
     */
    static get EZCLOCKER_WEBSITE_MOBILE_PUBLIC_PATH() {
        return `${EZCLOCKER_WEBSITE_MOBILE_PATH}/p`;
    }

    /**
     * @static
     * @public @readonly @property
     * Gets the ezClocker website's mobile secure path (aka /m/s)
     * @returns {string}
     */
    static get EZCLOCKER_WEBSITE_MOBILE_SECURE_PATH() {
        return `${EzmNavigator.EZCLOCKER_WEBSITE_MOBILE_PATH}/s`;
    }

    /**
     * @static
     * @public @method @readonly @property
     * Gets the Apple Appstore URL for the ezClocker Personal iOS app.
     * @type {string}
     */
    static get IPHONE_PERSONAL_APPSTORE_URL() {
        return 'https://apps.apple.com/us/app/ezclocker-personal-timecard/id833047956';
    }

    /**
     * @static
     * @public @method @readonly @property
     * Gets the Google Play Appstore URL for the ezClocker Employer/Employee app.
     * @type {string}
     */
    static get ANDRIOD_BUSINESS_APPSTORE_URL() {
        return 'https://play.google.com/store/apps/details?id=com.ezclocker';
    }

    /**
     * @static
     * @public @method @readonly @property
     * Gets the Apple Appstore URL for the ezClocker Employer/Employee app.
     * @type {string}
     */
    static get IPHONE_BUSINESS_APPSTORE_URL() {
        return 'https://apps.apple.com/us/app/ezclocker-employee-time-track/id800807197';
    }

    /**
     * @static
     * @public @method @readonly @property
     * Gets the Apple Appstore URL for the ezClocker Personal iOS app.
     * @type {string}
     */
    static get NATIVE_APP_SIGNIN_URL() {
        return 'ezlogin://signin';
    }

    /**
     * @public @readonly @property
     * Gets the current ezClocker website and services domain name
     * Default: EzmNavigator.EZCLOCKER_DEFAULT_DOMAIN
     * @returns {string}
     */
    get domain() {
        return EzString.stringOrDefault(
            globalThis?.window?.location?.hostname,
            EzmNavigator.EZCLOCKER_DEFAULT_DOMAIN);
    }

    /**
     * @public @method @property @getter
     * Gets the current ezClocker website and services port number
     * Default: EzString.EMPTY
     * @returns {string}
     */
    get port() {
        return EzString.stringOrDefault(
            globalThis?.window?.location?.port,
            EzString.EMPTY);
    }

    /**
     * @public @readonly @property
     * Gets the current ezClocker website and services protocol
     * Default: 'https'
     * @returns {string}
     */
    get protocol() {
        return EzString.stringOrDefault(
            globalThis?.window?.location?.protocol,
            'https');
    }

    /**
     * @public @readonly @property
     * Gets the current ezClocker website and services base url
     * Template:
     *      Port number is 80 or 443..: `${protocol}://${domain}:${this.port}`
     *      All other port numbers....: `${protocol}://${domain}`
     * @returns {string}
     */
    get baseUrl() {
        return this.ezmBuildUrl(this.protocol, this.domain, this.port);
    }
    /**
     * @public @readonly @property
     * Gets the current ezClocker website and services base url
     * @returns {string}
     * @deprecated since 2024.01.05;
     * Migrate to: ezApi.ezclocker.ezmNavigator.baseUrl
     */
    get rootUrl() {
        return this.baseUrl;
    }
    /**
     * @public @method
     * Returns the root url for the page. Pass in true to force re-building the root url (value is cached once built)
     * @return {string}
     * @deprecated since 2024.01.05;
     * Migrate to: ezApi.ezclocker.ezmNavigator.baseUrl;
     */
    ezmGetRootUrl() {
        return this.baseUrl;
    }
    /**
     * @public @method
     * @deprecated since 2024.01.05;
     * Migrate to: ezApi.ezclocker.ezmNavigator.baseUrl
     * @returns {string}
     */
    getBaseUrl() {
        return this.baseUrl;
    }

    /**
     * @public @method @property @getter
     * Gets the current ezClocker website page revision version
     * @returns {string}
     */
    get revisionVersion() {
        return ezApi.ezclocker.ezNavigation.revisionVersion;
    }

    /**
     * @public @method
     * Initializes EzmNavigator
     * @returns {EzmNavigator}
     */
    ezInit() {
        return EzmNavigator.ezInstance;
    }

    /**
     * @public @method
     * If website revsion version is enabled, the url is returned with the file revision param appended:
     *      Template for URL without params........: `${url}?v=${ezApi.ezclocker.ezNavigation.revisionVersion}`
     *      Template for URL with existing params..: `${url}&v=${ezApi.ezclocker.ezNavigation.revisionVersion}`
     * Otherwise, the url is returned as provided.
     * @param {undefined|null|string} url
     * @returns {string}
     * @deprecated since 2024.01.0;
     * Migrate to: ezApi.ezclocker.ezNavigation.ezApplyFileRevision(url)
     */
    ezApplyFileRevision(url) {
        return ezApi.ezclocker.ezNavigation.ezApplyFileRevision(url);
    }

    /**
     * @public @method
     * Navigates to the provided URL applying the website file revision version if needed.
     * @param {string} url
     */
    mNav(url) {
        if (EzString.hasLength(mNav)) {
            throw new EzBadParamException(
                'url',
                EzmNavigator.ezInstance,
                EzmNavigator.ezInstance.mNav);
        }

        let urlValue = ezApi.ezclocker.ezNavigation.ezApplyFileRevision(url);

        globalThis.window.location = urlValue;

        $.mobile.pageContainer.pagecontainer(
            'change',
            urlValue,
            {
                transition: 'fade',
                changeHash: false,
                reload: true
            });
    }

    /**
     * @public @method
     * @param {string} url
     * @deprecated since 2024.01.05;
     * Migrate to: ezApi.ezclocker.ezmNavigator.mNav(pathAndFilename)
     */
    navigateTo(url) {
        return EzmNavigator.ezInstance.mNav(url);
    }

    /**
     * @public @method
     * Navigates to the url built using the following template: `${this.baseUrl}/m/${pathAndFilename}`
     * @param {string} pathAndFilename
     * Leading '/' is optional
     * @returns {string}
     */
    mNavMobile(pathAndFilename) {
        if (EzString.hasLength(pathAndFilename)) {
            throw new EzBadParamException(
                'pathAndFilename',
                EzmNavigator.ezInstance,
                EzmNavigator.ezInstance.mNavMobile);
        }

        return EzmNavigator.ezInstance.mNav(
            EzmNavigator.ezInstance.ezmBuildUrl(
                EzmNavigator.EZCLOCKER_WEBSITE_MOBILE_PATH,
                EzString.stringOrEmpty(pathAndFilename)));
    }

    /**
     * @public @method
     * Navigates to the url built using the following template: `${this.baseUrl}/m/p/${pathAndFilename}`
     * @param {string} pathAndFilename
     * Leading '/' is optional
     * @returns {string}
     */
    mNavPublic(pathAndFilename) {
        if (EzString.hasLength(pathAndFilename)) {
            throw new EzBadParamException(
                'pathAndFilename',
                EzmNavigator.ezInstance,
                EzmNavigator.ezInstance.mNavPublic);
        }

        return EzmNavigator.ezInstance.mNav(
            EzmNavigator.ezInstance.ezmBuildUrl(
                EzmNavigator.EZCLOCKER_WEBSITE_MOBILE_PUBLIC_PATH,
                EzString.stringOrEmpty(pathAndFilename)));
    }

    /**
     * @public @method
     * Builds a url using the template: `${this.baseUrl}/m/p/${pathAndFilename}`
     * @param {string} pathAndFilename
     * @returns {string}
     * @deprecated since 2024.01.05;
     * Migrate to: ezApi.ezclocker.ezmNavigator.mNavPublic(pathAndFilename)
     */
    ezmGetPublicPageUrl(pathAndFilename) {
        if (!EzString.hasLength(pathAndFilename)) {
            throw new EzBadParamException(
                'pathAndFilename',
                EzmNavigator.ezInstance,
                EzmNavigator.ezInstance.ezmGetPublicPageUrl);
        }

        return EzmNavigator.ezInstance.ezmBuildUrl(
            EzmNavigator.EZCLOCKER_WEBSITE_MOBILE_PUBLIC_PATH,
            pathAndFilename);
    }


    /**
     * @public @method
     * @param {string} pathAndFilename
     * @deprecated since 2024.01.05;
     * Migrate to: ezApi.ezclocker.ezmNavigator.mNavPublic(pathAndFilename)
     */
    navigateToPublicMobilePage(pathAndFilename) {
        return EzmNavigator.ezInstance.mNavPublic(pathAndFilename);
    }


    /**
     * @public @method
     * Navigates to the url built using the following template: `${this.baseUrl}/m/s/${pathAndFilename}`
     * @param {string} pathAndFilename
     * Leading '/' is optional
     * @returns {string}
     */
    mNavSecure(pathAndFilename) {
        if (EzString.hasLength(pathAndFilename)) {
            throw new EzBadParamException(
                'pathAndFilename',
                EzmNavigator.ezInstance,
                EzmNavigator.ezInstance.mNavSecure);
        }

        return EzmNavigator.ezInstance.mNav(
            EzmNavigator.ezInstance.ezmBuildUrl(
                EzmNavigator.EZCLOCKER_WEBSITE_MOBILE_SECURE_PATH,
                EzString.stringOrEmpty(pathAndFilename)));
    }

    /**
     * @public @method
     * @param {string} pathAndFilename
     * @deprecated since 2024.01.05;
     * Migrate to: ezApi.ezclocker.ezmNavigator.mNavSecure(pathAndFilename)
     */
    navigateToSecureMobilePage(pathAndFilename) {
        return EzmNavigator.ezInstance.mNavSecure(pathAndFilename);
    }

    /**
 * @public @method
 * Navigates to the ezClocker Business app listing within the Apple store.
 */
    ezmNavToBusinessAppleStore() {
        EzmNavigator.ezInstance.mNav(EzmNavigator.IPHONE_BUSINESS_APPSTORE_URL);
    }

    /**
     * @public @method
     * Navigates to the ezClocker Personal app listing within the Apple store.
     */
    ezmNavToPersonalAppleStore() {
        EzmNavigator.ezInstance.mNav(EzmNavigator.IPHONE_PERSONAL_APPSTORE_URL);
    }

    /**
     * @public @method
     * Navigates to the ezClocker Business app in the goole play store
     */
    ezmNavToBusinessGooglePlayStore() {
        EzmNavigator.ezInstance.mNav(EzmNavigator.ANDRIOD_BUSINESS_APPSTORE_URL);
    }

    /**
     * @public @method
     * Attempts to launch the native app so the user can sign-in
     * Original: launchPhoneAppAndSignIn
     * @param {string} email
     * @param {string} password
     */
    ezmLaunchPhoneAppAndSignIn(email, password) {
        try {
            let emailValue = EzString.hasLength(email)
                ? `email=${email}`
                : EzString.EMPTY;

            let passwordValue = EzString.hasLength(password)
                ? `password=${password}`
                : EzString.EMPTY;

            let paramDelimiter = '?';

            let params = EzString.EMPTY;

            if (EzString.hasLength(emailValue)) {
                params = `${paramDelimiter}${params}${emailValue}`;

                paramDelimiter = '&';
            }

            if (EzString.hasLength(passwordValue)) {
                params = `${paramDelimiter}${params}${emailValue}`;
            }

            EzmNavigator.ezInstance.mNav(`${EzmNavigator.NATIVE_APP_SIGNIN_URL}${params}`);
        } catch (err) {
            EzmNavigator.ezInstance.toBusinessAppleStore();
        }
    }

    /**
     * @public @method
     * Returns url: {protocol}://play.google.com/store/apps/details?id=com.ezclocker
     * Original: navAndriodAppStore
     * @returns {string}
     */
    ezmNavToGooglePlayStore() {
        return EzmNavigator.ezInstance.ezmNavToBusinessGooglePlayStore();
    }

    /**
     * @public @method
     * Navigates to the Apple Store for either personal or business
     * Original: navIosAppStore
     * @param {*} isBusiness
     */
    ezmNavToAppleStore(isBusiness) {
        return isBusiness
            ? EzmNavigator.ezInstance.ezmNavToBusinessAppleStore()
            : EzmNavigator.ezInstance.ezmNavToPersonalAppleStore();
    }

    /**
     * @public @method
     * Builds a URL from the provided data
     * Template:
     *      All params: `${protocol}://${domain}${portValue}${pathValue}${fileNameValue}`
     *      Default: `${protocol}://${domain}`
     * @param {string} protocol
     * Example: 'http' or 'https'
     * Default: 'https'
     * @param {string} domain
     * Example: ezclocker.com
     * Default: EzmNavigator.EZCLOCKER_DEFAULT_DOMAIN
     * @param {undefined|null|string|number} port
     * Example: '8080' or 8080
     * Default: EzString.EMPTY
     */
    ezmBuildFullUrl(protocol, domain, port, path, fileName) {
        if (!EzString.hasLength(protocol)) {
            protocol = 'https';
        }

        if (!EzString.hasLength(domain)) {
            domain = EzmNavigator.EZCLOCKER_DEFAULT_DOMAIN;
        }

        let portValue = EzNumber.isNumber(port)
            ? EzNumber.asString(port)
            : EzString.stringOrEmpty(port);

        if (EzString.hasLength(portValue)) {
            portValue = `:${port}`;
        }

        let pathValue = EzString.stringOrEmpty(path);

        if (EzString.hasLength(pathValue)) {
            pathValue = '/' === path[0]
                ? path
                : `/${path}`;
        }

        let fileNameValue = EzString.stringOrEmpty(fileName);

        if (EzString.hasLength(fileNameValue)) {
            fileNameValue = '/' === fileNameValue[0] || '/' === fileNameValue[fileNameValue.length - 1]
                ? fileNameValue
                : `/${fileNameValue}`;
        }

        return `${protocol}://${domain}${portValue}${pathValue}${fileNameValue}`;
    }

    /**
     * @public @method
     * Builds a URL using the curren baseUrl and appending the provided optional path and fileName.
     * Template: `${ezApi.ezclocker.ezmNavigator.baseUrl}/${path}/{fileName}'
     * @param {undefined|null|string} path
     * @param {undefined|null|string} fileName
     * @return {string}
     */
    ezmBuildUrl(path, fileName) {
        if (!EzString.hasLength(path) && !EzString.hasLength(fileName)) {
            return EzmNavigator.ezInstance.baseUrl;
        }

        return EzmNavigator.ezInstance.ezmBuildFullUrl(
            EzmNavigator.ezInstance.protocol,
            EzmNavigator.ezInstance.domain,
            EzmNavigator.ezInstance.port,
            EzString.stringOrEmpty(path),
            EzString.stringOrEmpty(fileName));
    }

    /**
     * @public @method
     * Signs out of ezClocker
     */
    ezSignOut() {
        ezApi.ezclocker.ezNavigation.signOut();
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
        return 'ezmNavigator';
    }

    /**
     * @static
     * @public @readonly @property
     * Gets the legacy, shorter, api name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiShortName() {
        return 'ezmNav'
    }

    /**
     * @static
     * @public @readonly @property
     * Gets an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzmNavigator_Ready'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzmNavigator}
     */
    static #ezInstance = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzmNavigator.ezApiName]
        ? globalThis.ezApi.ezclocker[EzmNavigator.ezApiName]
        : null;
    /**
     * @static
     * @public @property @getter
     * Gets the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzmNavigator}
     */
    static get ezInstance() {
        return EzmNavigator.#ezInstance;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzmNavigator} instance
     */
    static set ezInstance(instance) {
        if (null != EzmNavigator.#ezInstance) {
            throw new Error('EzmNavigator\'s singleton instance is already reigstered with EzApi.');
        }

        EzmNavigator.#ezInstance = instance;
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
    static #ezApiRegistrationState = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzmNavigator.ezApiName]
        ? EzRegistrationState.REGISTERED
        : null;
    /**
     * @static
     * @public @property @getter
     * Gets the ezApi registration state of this classes's singleton instance.
     * @returns {string}
     * A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzmNavigator.#ezApiRegistrationState;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzmNavigator.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzmNavigator?.ezApiRegistrationState &&
            globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker &&
            globalThis.ezApi.ezclocker?.[EzNavigation.ezApiName]?.ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Gets if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzmNavigator.ezInstance &&
            EzRegistrationState.REGISTERED === EzmNavigator.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzmNavigator.#ezCanRegister && !EzmNavigator.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(
                EzmNavigator,
                EzmNavigator.ezApiName,
                false,
                [EzmNavigator.ezApiShortName]);
        }

        return EzmNavigator.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzmNavigator.ezApiName
     *     2) Property getter EzmNavigator.ezEventNames
     *     3) Property getter EzmNavigator.ezInstance
     *     4) Property setter EzmNavigator.ezInstance
     *     5) Property getter EzmNavigator.ezApiRegistrationState
     *     6) Property setter EzmNavigator.ezApiRegistrationState
     *     7) Property getter EzmNavigator.#ezCanRegister
     *     8) Property getter EzmNavigator.#ezIsRegistered
     *     9) Method EzmNavigator.#ezRegistrator()
     */
    static {
        if (!EzmNavigator.#ezIsRegistered) {
            EzmNavigator.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzmNavigator.#ezRegistrator()) {
                document.addEventListener(
                    EzmNavigator.ezOnEzApiReadyEventName,
                    EzmNavigator.#ezRegistrator);

                document.addEventListener(
                    EzNavigation.onReady,
                    EzmNavigator.#ezRegistrator);
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

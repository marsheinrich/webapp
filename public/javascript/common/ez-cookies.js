import {
    EzObject,
    EzBoolean,
    EzString
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import {
    EzRegistrationState
} from '/ezlibrary/enums/EzEnumerations.js';


import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

/**
    // TODO: Move to its own file at: src/main/webapp/ezlibrary/enums/EzClockerCookieName.js
    ezClocker Enumeration for known/defined cookies
 */
export class EzClockerCookieName extends EzEnumeration2 {
    /**
        @private @field
        Stores the singleton instance of this enumeration class.
        @type {MyEnumerationClass}
     */
    static #ezEnumerationSingleton = null;

    /**
        @static
        Static Initialization
     */
    static {
        if (null == EzClockerCookieName.#ezEnumerationSingleton) {
            EzClockerCookieName.#ezEnumerationSingleton = new EzClockerCookieName(
                // Enum property names
                [
                    'UNKNOWN',
                    'USER_NAME',
                    'REMEMBER_ME',
                    'EZ_AFFILIATE_SOURCED',
                    'COOKIE_EXPIRE_DATE_ISO8601',
                    'EZ_INTEGRATION_PROVIDER_ID',
                    'EZ_INTEGRATION_AUTH_STATE',
                    'EZ_INTEGRATION_AUTH_TYPE',
                    'EZ_INTEGRATION_AUTH_ID',
                    'EZ_INTEGRATION_INTEGRATION_TYPE',
                    'EZ_INTEGRATION_WIZARD_STATE',
                    'EZ_INTEGRATION_PROVIDER_CONNECTION_ID',
                    'EZ_INTEGRATION_MESSAGE',
                    'ANALYTICS_METRICS_ACCEPTED',
                    'ANALYTICS_METRICS_PROMPT_ISO'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                [
                    'ezclocker.unknown',
                    'eun',
                    'ezrm',
                    'ez.affiliate.sourced',
                    '1970-01-01T00:00:00Z',
                    'ezipid',
                    'eziAuthState',
                    'eziAuthType',
                    'eziAuthId',
                    'eziType',
                    'eziWizState_',
                    'ezipcid',
                    'ezim',
                    'ezclocker.analytics-metrics.accepted',
                    'ezclocker.analytics-metrics.prompt-iso'
                ],
                // Optional array of additional data for eac enumeration property.
                // Enter null if not needed.
                null);
        }
    }

    /**
        @public @constructor
        >> DO NOT CREATE NEW INSTANCES <<
        The static initializer will create a singleton instance that injects the static properties and methods
        that you then use to access enumeration values.
     */
    constructor(name, value, optionalData) {
        super(name, value, optionalData);
    }
}

/**
    @class
    @implements {EzClass}
    @description
    Manages website cookies
    ---------------------------------------------------------------------------
    Import with:
        import { EzCookies } from '/public/javascript/common/ez-cookies.js';
    ---------------------------------------------------------------------------
    Hook onReady event:
        document.addEventListener(
            EzCookies.ezEventNames.onReady,
            this.#ezRegistrator);
    ---------------------------------------------------------------------------
    Check if ready:
        globalThis.ezApi.ezclocker[EzCookies.ezApiName] &&
        globalThis.ezApi.ezclocker[EzCookies.ezApiName].ready &&
    ---------------------------------------------------------------------------
 */
export class EzCookies extends EzClass {
    /**
        @static
        @public @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */
    static get ezApiName() {
        return 'ezCookies';
    }

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzCookies_Ready'
        };
    }

    /**
        @static
        @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
        @type {EzCookies}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzCookies.ezApiName])
        ? globalThis.ezApi.ezclocker[EzCookies.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzCookies}
     */
    static get ezInstance() {
        return EzCookies.#ezInstance;
    }

    /**
        @static
        @public @property @setter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzCookies} instance
     */
    static set ezInstance(instance) {
        if (null != EzCookies.#ezInstance) {
            throw new Error('EzCookies\'s singleton instance is already reigstered with EzApi.');
        }

        EzCookies.#ezInstance = instance;
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
        EzObject.isValid(globalThis.ezApi.ezclocker[EzCookies.ezApiName])
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
        return EzCookies.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzCookies.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzCookies.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready);
    }

    /**
        @static
        @private @readonly @property
        Returns if this class's singleton instance is registered with ezApi yet.
        @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzCookies.ezInstance &&
            EzRegistrationState.REGISTERED === EzCookies.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzCookies.#ezCanRegister && !EzCookies.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzCookies, EzCookies.ezApiName);
        }

        return EzCookies.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzCookies.ezApiName
            2) Property getter EzCookies.ezEventNames
            3) Property getter EzCookies.ezInstance
            4) Property setter EzCookies.ezInstance
            5) Property getter EzCookies.ezApiRegistrationState
            6) Property setter EzCookies.ezApiRegistrationState
            7) Property getter EzCookies.#ezCanRegister
            8) Property getter EzCookies.#ezIsRegistered
            9) Method EzCookies.#ezRegistrator()
     */
    static {
        if (!EzCookies.#ezIsRegistered) {
            EzCookies.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzCookies.#ezRegistrator()) {
                document.addEventListener(
                    EzCookies.ezOnEzApiReadyEventName,
                    EzCookies.#ezRegistrator);
            }
        }
    }

    /**
        @public @constructor
        >> DO NOT CREATE NEW INSTANCES OUTSIDE OF THE STATIC INITIALIZATION FLOW <<
        Use the static singleton instance available from ezApi: ezApi.ezclocker.ezJobCodeDialog.
     */
    constructor() {
        super();
    }

    ezCurrentCookies = {};

    /**
        @protected
        Initializes EzCookies
        @returns {EzCookies}
     */
    ezInit() {
        EzCookies.ezInstance.ezLoadCurrentCookies();
        return EzCookies.ezInstance;
    }

    /**
        @public
        Reads the document's current cookie and parses into key/value
        @returns {object}
        Returns a JSON object with the cookie key/value pairs
     */
    ezLoadCurrentCookies() {
        EzCookies.ezInstance.ezCurrentCookies = {};

        let dCookies = document.cookie.split(';');

        for (let cookie of dCookies) {
            let cookieKV = cookie.trim().split('=');

            if (2 == cookieKV.length) {
                EzCookies.ezInstance.ezCurrentCookies[cookieKV[0]] = cookieKV[1];
            }
        }

        return EzCookies.ezInstance.ezCurrentCookies;
    }

    /**
        @public
        Creates and updates a cookie
        @param {string} cookieName
        @param {string} cookieValue
        @param {null|string} pathToUse
     */
    ezSetSessionCookie(cookieName, cookieValue, pathToUse) {
        if (!EzString.stringHasLength(cookieName)) {
            return; // not creating cookies with empty names
        }

        let cookieToSet = `${EzCookies.ezInstance.ezBuildCookieKeyValue(cookieName, cookieValue)}${EzCookies.ezInstance.ezBuildCookiePath(pathToUse)}`;

        document.cookie = cookieToSet;

        EzCookies.ezInstance.ezLoadCurrentCookies();
    }

    /**
        @public
        Creates and updates a cookie
        @param {string} cookieName
        @param {string} cookieValue
     */
    ezSetCookie(cookieName, cookieValue) {
        EzCookies.ezInstance.ezSetExpiryCookie(cookieName, cookieValue,
            EzCookies.ezInstance.ezCreateExpireDate(30));
    }

    /**
        @public
        Creates a new expiry cookie.
        Cookie format: "username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC";
        If expireMoment is not provided today + one day UTC is used as the expire date.
        @param {string} cookieName
        @param {null|string} cookieValue
        @param {null|moment} expireMoment
     */
    ezSetExpiryCookie(cookieName, cookieValue, expireMoment) {
        EzCookies.ezInstance.ezSetPathExpiryCookie(cookieName, cookieValue, expireMoment);
    }

    /**
        @public
        Creates a new expiry cookie.
        Cookie format: "username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
        If expireMoment is not provided today + 7 day UTC is used as the expire date.
        If path is not provided, then / is used.
        @param {string} cookieName
        @param {null|string} cookieValue
        @param {null|moment} expireMoment
        @param {null|string} pathToUse
     */
    ezSetPathExpiryCookie(cookieName, cookieValue, expireMoment, pathToUse) {
        if (!EzString.stringHasLength(cookieName)) {
            return; // not creating cookies with empty names
        }

        let cookieToSet = EzCookies.ezInstance.ezBuildCookieKeyValue(cookieName, cookieValue) +
            //EzCookies.ezInstance.ezBuildCookieHttpOnlyValue(false) +
            //EzCookies.ezInstance.ezBuildCookieHostOnlyValue(false) +
            EzCookies.ezInstance.ezBuildCookieSecureValue(true) +
            EzCookies.ezInstance.ezBuildCookieSameSiteValue('Lax') +
            EzCookies.ezInstance.ezBuildCookieExpiry(expireMoment) +
            EzCookies.ezInstance.ezBuildCookiePath(pathToUse);

        document.cookie = cookieToSet;

        EzCookies.ezInstance.ezLoadCurrentCookies();
    }

    /**
        @public
        Builds the cookies key=value porition
        if cookieValue == null, then blank string is used.
        @param {string} cookieName
        @param {null|cookieValue}
     */
    ezBuildCookieKeyValue(cookieName, cookieValue) {
        if (!EzString.stringHasLength(cookieName)) {
            return '';
        }

        cookieValue = EzObject.isValid(cookieValue)
            ? cookieValue
            : '';

        return `${cookieName}=${cookieValue}; `;
    }

    /**
        @public
        Returns the cookie expiry value from the provided moment.
        If expireMOment is not provided, current date + 7 days is used instead.
        @param {null|moment} expireMoment
        @returns {string}
     */
    ezBuildCookieExpiry(expireMoment) {
        expireMoment = EzObject.isValid(expireMoment)
            ? ezApi.ezclocker.ezDateTime.ezMomentWithPTZ(expireMoment)
            : ezApi.ezclocker.ezDateTime.ezNowUTC().add(7, 'days');

        return `expires=${expireMoment.tz('UTC').format('ddd, DD MMM YYYY HH:mm:ss UTC')}; `;
    }

    /**
        @public
        Builds a cookies path portion. If pathToUse is empty or null, the document.location.pathname is used instead.
        @param (null|string) pathToUse
        @returns {string}
     */
    ezBuildCookiePath(pathToUse) {
        pathToUse = EzString.stringHasLength(pathToUse)
            ? pathToUse.trim()
            : document.location.pathname;

        return `path=${pathToUse}; `;
    }

    /**
        @public
        Builds a cookie's SameSite value
        NOT SUPPORTED IN IE
     */
    ezBuildCookieSameSiteValue(sameSiteValue) {
        sameSiteValue = EzString.stringHasLength(sameSiteValue)
            ? sameSiteValue
            : 'STRICT';

        return `SameSite=${sameSiteValue}; `;
    }

    ezBuildCookieSecureValue(secure) {
        return `Secure=${EzBoolean.isTrue(secure) ? 'true' : 'false'}; `
    }

    ezBuildCookieHttpOnlyValue(httpOnly) {
        return `HttpOnly=${EzBoolean.isTrue(httpOnly) ? 'true' : 'false'}; `
    }

    ezBuildCookieHostOnlyValue(hostOnly) {
        return `HostOnly=${EzBoolean.isTrue(hostOnly) ? 'true' : 'false'}; `
    }

    /**
        @public
        Reads an existing cookie from the current cache and returns its value.
        The cookie cache is updated before reading if refreshCacheFirst is true.
        If the cookie doesn't exist, null is returned.
        @param {string} cookieName
        @param {null|boolean} refreshCacheFirst
     */
    ezReadCookie(cookieName, refreshCacheFirst) {
        if (EzBoolean.isTrue(refreshCacheFirst)) {
            EzCookies.ezInstance.ezLoadCurrentCookies();
        }

        let cValue = EzCookies.ezInstance.ezCurrentCookies[cookieName];
        if (!EzObject.isValid(cValue)) {
            return null;
        }

        if ('true' === cValue) {
            return true;
        }

        if ('false' === cValue) {
            return false;
        }

        return cValue;
    }

    /**
        @public
        Reads an existing cookie from the current cache and returns its value.
        Set the refreshCacheFirst param to true to re-load the available cookies before reading.
        @param {string} cookieName
        @param {null|boolean} refreshCacheFirst
        @returns {*}
        Will return the defaultValue if the cookie value is null, undefined, or an empty string.
        Converts string values 'true' and 'false' to their boolean equivlants.
     */
    ezReadCookieOrDefault(cookieName, defaultValue, refreshCacheFirst) {
        if (EzBoolean.isTrue(refreshCacheFirst)) {
            EzCookies.ezInstance.ezLoadCurrentCookies();
        }

        let cValue = EzCookies.ezInstance.ezCurrentCookies[cookieName];

        if (!EzObject.isValid(cValue) || !EzString.stringHasLength(cValue)) {
            return defaultValue;
        }

        if ('true' === cValue.toLowerCase()) {
            return true;
        }

        if ('false' === cValue.toLowerCase()) {
            return false;
        }

        return cValue;
    }

    /**
        @public
        Creates a new moment from now, adding the provided numOfDays and setting time to end of day.
        @param {null|number} numOfDays
        @returns {Moment}
     */
    ezCreateExpireDate(numOfDays) {
        numOfDays = ezApi.ezIsNumber(numOfDays)
            ? numOfDays
            : 1;

        return ezApi.ezclocker.ezDateTime.ezNowWithEndOfDay().add(numOfDays, 'days');
    }

    /**
        @public
        Removes a cookie by setting it's expire date to jan 1, 1970.
     */
    ezRemoveCookie(cookieName) {
        EzCookies.ezInstance.ezSetPathExpiryCookie(
            cookieName,
            '',
            ezApi.ezclocker.ezDateTime.ezFromIso('1970-01-01T00:00Z'));
    }
}

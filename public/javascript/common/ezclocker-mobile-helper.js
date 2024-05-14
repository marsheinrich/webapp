import { detect } from 'detect-browser';

import {
    EzObject,
    EzBoolean,
    EzString,
    EzHtml,
    EzUrl
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

/**
    Wrapper for mobile/browser detection functionality
    Import with:
        import { EzBrowserInfo } from '/public/javascript/common/ezclocker-mobile-helper.js';
 */
export class EzBrowserInfo extends EzClass {
    /**
     * @static
     * @public @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezBrowserInfo';
    }

    /**
     * @static
     * @public @readonly @property
        Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzBrowserInfo_Ready'
        };
    }

    /**
     * @static
     * @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzBrowserInfo}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzBrowserInfo.ezApiName])
        ? globalThis.ezApi.ezclocker[EzBrowserInfo.ezApiName]
        : null;

    /**
     * @static
     * @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzBrowserInfo}
     */
    static get ezInstance() {
        return EzBrowserInfo.#ezInstance;
    }

    /**
     * @static
     * @public @property @setter
        Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzBrowserInfo} instance
     */
    static set ezInstance(instance) {
        if (null != EzBrowserInfo.#ezInstance) {
            throw new Error('EzBrowserInfo\'s singleton instance is already reigstered with EzApi.');
        }

        EzBrowserInfo.#ezInstance = instance;
    }

    /**
     * @static
     * @private @field
        Stores the EzApi registration state for this class.
        Default value is NULL
        Class is registerd with EzApi when value is EzRegistrationState.REGISTERED
     * @type {string}
        A valid enum property value from EzRegistrationState
     */
    static #ezApiRegistrationState = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzBrowserInfo.ezApiName])
        ? EzRegistrationState.REGISTERED
        : null;

    /**
     * @static
     * @public @property @getter
        Returns the ezApi registration state of this classes's singleton instance.
     * @returns {string}
        A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzBrowserInfo.#ezApiRegistrationState;
    }

    /**
     * @static
     * @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzBrowserInfo.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @static
     * @private @readonly @property
        Returns true when all required dependencies for this class report ready.
        In otherwords, the require dependency's singleton instance is created
        and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzBrowserInfo.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready;
    }

    /**
     * @static
     * @private @readonly @property
        Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzBrowserInfo.ezInstance &&
            EzRegistrationState.REGISTERED === EzBrowserInfo.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzBrowserInfo.#ezCanRegister && !EzBrowserInfo.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzBrowserInfo, EzBrowserInfo.ezApiName);
        }

        return EzBrowserInfo.#ezIsRegistered;
    }

    /**
     * @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzBrowserInfo.ezApiName
            2) Property getter EzBrowserInfo.ezEventNames
            3) Property getter EzBrowserInfo.ezInstance
            4) Property setter EzBrowserInfo.ezInstance
            5) Property getter EzBrowserInfo.ezApiRegistrationState
            6) Property setter EzBrowserInfo.ezApiRegistrationState
            7) Property getter EzBrowserInfo.#ezCanRegister
            8) Property getter EzBrowserInfo.#ezIsRegistered
            9) Method EzBrowserInfo.#ezRegistrator()
     */
    static {
        if (!EzBrowserInfo.#ezIsRegistered) {
            EzBrowserInfo.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzBrowserInfo.#ezRegistrator()) {
                document.addEventListener(
                    EzBrowserInfo.ezOnEzApiReadyEventName,
                    () => {
                        if (!EzBrowserInfo.#ezRegistrator()) {
                            document.addEventListener(
                                'onEzApiReady',
                                EzBrowserInfo.#ezRegistrator);

                            document.addEventListener(
                                EzNavigation.ezEventNames.onReady,
                                EzBrowserInfo.#ezRegistrator);
                        }
                    });
            }
        }
    }

    /**
     * @public @readonly @property
     * @returns {string}
     */
    get MOBILE_ACCEPT_EMPLOYEE_INVITE_URL_SUFFIX() {
        return 'accept-employee-invite';
    }

    /**
     * @public @field
     * @type {object}
     */
    browserContext = null;

    /**
     * @protected
        Initializes EzBrowserInfo
     */
    ezInit() {
        EzBrowserInfo.ezInstance.browserContext = detect();

        return EzBrowserInfo.ezInstance;
    }

    /**
     * @public @method
        Runs the provided media query and returns if it matches or not
     * @param {string} mediaQuery
     * @returns {boolean}
     */
    ezMediaQueryMatches(mediaQuery) {
        return EzString.stringHasLength(mediaQuery)
            ? window.matchMedia(mediaQuery).matches
            : false;
    }


    /**
     * @public
        returns true if the browser is tected as a mobile browser
     * @returns {boolean}
        true if the browser is tected as a mobile browser
     * @deprecated
        Migrate to EzBrowserInfo.ezInstance.ezIsMobile
     */
    isMobileBrowser() {
        return EzBrowserInfo.ezInstance.ezIsMobile();
    }

    /**
     * @public
        returns true if the browser is tected as a mobile browser
     * @returns {boolean}
        true if the browser is tected as a mobile browser
     */
    ezIsMobile() {
        switch (EzBrowserInfo.ezInstance.browserContext.os) {
            case 'iOS':
            case 'Android OS':
            case 'BlackBerry OS':
            case 'Windows Mobile':
            case 'Amazon OS':
                return true;
            default:
                return false;
        }
    }

    /**
     * @public
        Navigates to the provided public mobile page if the browser reports the device:
             * Is running a mobile OS
     * @param {string} mobilePath
        The mobilePath param should exclude the root /m folder.
     * @param {string} excludeTablets
        Optionally do not redirect if the device has a mobile tablet screen size
     * @returns {boolean}
     */
    ezRedirectPublicIfMobile(mobilePath, excludeTablets) {
        if (EzBoolean.isTrue(excludeTablets)) {
            return EzBrowserInfo.ezInstance.ezRedirectPublicIfMobilePhone(mobilePath);
        }

        return EzBrowserInfo.ezInstance.ezRedirectPublicIfMobilePhone(mobilePath) ||
            EzBrowserInfo.ezInstance.ezRedirectPublicIfMobileTablet(mobilePath) ||
            EzBrowserInfo.ezInstance.ezRedirectPublicIfWearable(mobilePath);
    }

    /**
     * @public @method
        Navigates to the provided public mobile page if the browser reports the device:
            * Is running a mobile OS
            * Has a mobile phone screen size
     * @param {string} mobilePath
        The mobilePath param should exclude the root /m folder.
     * @returns {boolean}
     */
    ezRedirectPublicIfMobilePhone(mobilePath) {
        if (EzBrowserInfo.ezInstance.ezIsMobilePhone()) {
            ezApi.ezclocker.ezNavigation.ezNavigateToNewMobilePublicPage(mobilePath);

            return true;
        }

        return false;
    }

    /**
     * @public @method
        Navigates to the provided public mobile page if the browser reports the device:
            * Is running a mobile OS
            * Has a mobile tablet screen size
     * @param {string} mobilePath
        The mobilePath param should exclude the root /m folder.
     * @returns {boolean}
     */
    ezRedirectPublicIfMobileTablet(mobilePath) {
        if (EzBrowserInfo.ezInstance.ezIsMobileTablet()) {
            ezApi.ezclocker.ezNavigation.ezNavigateToNewMobilePublicPage(mobilePath);

            return true;
        }

        return false;
    }

    /**
     * @public @method
        Navigates to the provided public mobile page if the browser reports the device is a wearable (by screen size)
     * @param {string} mobilePath
        The mobilePath param should exclude the root /m folder.
     * @returns {boolean}
     */
    ezRedirectPublicIfWearable(mobilePath) {
        if (EzBrowserInfo.ezInstance.ezIsWearable()) {
            ezApi.ezclocker.ezNavigation.ezNavigateToNewMobilePublicPage(mobilePath);

            return true;
        }

        return false;
    }

    /**
     * @public
        Navigates to the provided public mobile page if the browser reports the device:
             * Is running a mobile OS
     * @param {string} mobilePath
        The mobilePath param should exclude the root /m folder.
     * @param {string} excludeTablets
        Optionally do not redirect if the device has a mobile tablet screen size
     * @returns {boolean}
     */
    ezRedirectIfMobile(mobilePath, excludeTablets) {
        if (EzBoolean.isTrue(excludeTablets)) {
            return EzBrowserInfo.ezInstance.ezRedirectIfMobilePhone(mobilePath);
        }

        return EzBrowserInfo.ezInstance.ezRedirectIfMobilePhone(mobilePath) ||
            EzBrowserInfo.ezInstance.ezRedirectIfMobileTablet(mobilePath) ||
            EzBrowserInfo.ezInstance.ezRedirectIfWearable(mobilePath);
    }

    /**
     * @public @method
        Navigates to the provided public mobile page if the browser reports the device:
            * Is running a mobile OS
            * Has a mobile phone screen size
     * @param {string} mobilePath
        The mobilePath param should exclude the root /m folder.
     * @returns {boolean}
     */
    ezRedirectIfMobilePhone(mobilePath) {
        if (EzBrowserInfo.ezInstance.ezIsMobilePhone()) {
            ezApi.ezclocker.ezNavigation.ezNavigateToNewMobileUri(mobilePath);

            return true;
        }

        return false;
    }

    /**
     * @public @method
        Navigates to the provided public mobile page if the browser reports the device:
            * Is running a mobile OS
            * Has a mobile tablet screen size
     * @param {string} mobilePath
        The mobilePath param should exclude the root /m folder.
     * @returns {boolean}
     */
    ezRedirectIfMobileTablet(mobilePath) {
        if (EzBrowserInfo.ezInstance.ezIsMobileTablet()) {
            ezApi.ezclocker.ezNavigation.ezNavigateToNewMobileUri(mobilePath);

            return true;
        }

        return false;
    }

    /**
     * @public @method
        Navigates to the provided public mobile page if the browser reports the device is a wearable (by screen size)
     * @param {string} mobilePath
        The mobilePath param should exclude the root /m folder.
     * @returns {boolean}
     */
    ezRedirectIfWearable(mobilePath) {
        if (EzBrowserInfo.ezInstance.ezIsWearable()) {
            ezApi.ezclocker.ezNavigation.ezNavigateToNewMobileUri(mobilePath);

            return true;
        }

        return false;
    }

    /**
     * @public
        Navigates to the provided public mobile page if the browser reports the device:
             * Is running a mobile OS
     * @param {string} mobilePath
        The mobilePath param should exclude the root /m folder.
     * @param {string} excludeTablets
        Optionally do not redirect if the device has a mobile tablet screen size
     * @returns {boolean}
     */
    ezRedirectSecureIfMobile(mobilePath, excludeTablets) {
        if (EzBoolean.isTrue(excludeTablets)) {
            return EzBrowserInfo.ezInstance.ezRedirectSecureIfMobilePhone(mobilePath);
        }

        return EzBrowserInfo.ezInstance.ezRedirectSecureIfMobilePhone(mobilePath) ||
            EzBrowserInfo.ezInstance.ezRedirectSecureIfMobileTablet(mobilePath) ||
            EzBrowserInfo.ezInstance.ezRedirectSecureIfWearable(mobilePath);
    }

    /**
     * @public @method
        Navigates to the provided public mobile page if the browser reports the device:
            * Is running a mobile OS
            * Has a mobile phone screen size
     * @param {string} mobilePath
        The mobilePath param should exclude the root /m folder.
     * @returns {boolean}
     */
    ezRedirectSecureIfMobilePhone(mobilePath) {
        if (EzBrowserInfo.ezInstance.ezIsMobilePhone()) {
            ezApi.ezclocker.ezNavigation.ezNavigateToNewMobileSecurePage(mobilePath);

            return true;
        }

        return false;
    }

    /**
     * @public @method
        Navigates to the provided public mobile page if the browser reports the device:
            * Is running a mobile OS
            * Has a mobile tablet screen size
     * @param {string} mobilePath
        The mobilePath param should exclude the root /m folder.
     * @returns {boolean}
     */
    ezRedirectSecureIfMobileTablet(mobilePath) {
        if (EzBrowserInfo.ezInstance.ezIsMobileTablet()) {
            ezApi.ezclocker.ezNavigation.ezNavigateToNewMobileSecurePage(mobilePath);

            return true;
        }

        return false;
    }

    /**
     * @public @method
        Navigates to the provided public mobile page if the browser reports the device is a wearable (by screen size)
     * @param {string} mobilePath
        The mobilePath param should exclude the root /m folder.
     * @returns {boolean}
     */
    ezRedirectSecureIfWearable(mobilePath) {
        if (EzBrowserInfo.ezInstance.ezIsWearable()) {
            ezApi.ezclocker.ezNavigation.ezNavigateToNewMobileSecurePage(mobilePath);

            return true;
        }

        return false;
    }

    /**
     * @public
        Navigates to the provided public mobile page if the browser is detected as a mobile browser.
     * @param {string} mobilePageName
     * @param {string} excludeTablets
     * @returns {boolean}
     * @deprecated
        Migrate to:
            ezApi.ezclocker.ezBrowserInfo.ezRedirectPublicIfMobile(mobilePath) OR
            ezApi.ezclocker.ezBrowserInfo.ezRedirectPublicIfMobilePhone(mobilePath) OR
            ezApi.ezclocker.ezBrowserInfo.ezRedirectPublicIfMobileTablet(mobilePath) OR
     */
    redirectIfMobilePublic(mobilePageName, excludeTablets) {
        if (EzBoolean.isTrue(excludeTablets) && EzBrowserInfo.ezInstanceezIsAppleiPad()) {
            return false;
        }

        if (EzBoolean.isTrue(EzBrowserInfo.ezInstance.browserContext.mobile)) {
            if (EzString.stringHasLength(mobilePageName)) {
                ezApi.ezclocker.ezNavigation.navigateToPublicMobilePage(mobilePageName);
            }
            return true;
        }

        return false;
    }

    /**
     * @public
        Redirectes the user to the mobile accept employee invite page.
     * @param {string} aInviteToken
     * @param {string} aName
     * @param {string} aEmail
     * @param {undefined|null|boolean} excludeTables
     * @returns {boolean}
     */
    ezRedirectToMobileAcceptEmployeeInvite(aInviteToken, aName, aEmail, excludeTablets) {
        if (EzBoolean.isTrue(excludeTablets) && EzBrowserInfo.ezInstanceezIsAppleiPad()) {
            return false;
        }

        if (EzBoolean.isTrue(EzBrowserInfo.ezInstance.browserContext.mobile)) {
            ezApi.ezclocker.ezNavigation.ezNavigateToNewMobilePublicPage(
                EzUrl.build`
                    ${EzBrowserInfo.ezInstanceMOBILE_ACCEPT_EMPLOYEE_INVITE_URL_SUFFIX}
                        ?inviteToken=${aInviteToken}
                        &name=${aName}
                        &email=${aEmail}`);

            return true;
        }

        return false;
    }

    /**
     * @public
        Navigates to the provided secure mobile page if the browser is detected as a mobile browser.
     * @param {string} mobilePageName
     * @param {string} excludeTablets
     * @returns {boolean}
     * @deprecated
        Migrate to:
            ezApi.ezclocker.ezBrowserInfo.ezRedirectSecureIfMobile(mobilePath) OR
            ezApi.ezclocker.ezBrowserInfo.ezRedirectSecureIfMobilePhone(mobilePath) OR
            ezApi.ezclocker.ezBrowserInfo.ezRedirectSecureIfMobileTablet(mobilePath) OR
     */
    redirectIfMobileSecure(mobilePageName, excludeTablets) {
        if (EzBoolean.isTrue(excludeTablets) && EzBrowserInfo.ezInstanceezIsAppleiPad()) {
            return false;
        }

        if (EzBoolean.isTrue(EzBrowserInfo.ezInstancebrowserContext.mobile)) {
            if (EzString.stringHasLength(mobilePageName)) {
                ezApi.ezclocker.ezNavigation.navigateToSecureMobilePage(mobilePageName);
            }
            return true;
        }

        return false;
    }

    /**
     * @public
        Returns true of the browser is an andriod browser
     * @returns {boolean}
     * @deprecated
        Migrate to:
            ezApi.ezclocker.ezBrowserInfo.ezIsAndriodDevice()
     */
    ezIsAndriodDevice() {
        return ezApi.ezclocker.ezBrowserInfo.ezIsAndriodOS();
    }

    /**
     * @public
        Returns true of the browser is an andriod browser
     * @returns {boolean}
     * @deprecated
        Migrate to:
            ezApi.ezclocker.ezBrowserInfo.ezIsAndriodDevice()
     */
    isAndriodDevice() {
        return ezApi.ezclocker.ezBrowserInfo.ezIsAndriodDevice();
    }

    /**
     * @public @method
        Returns the device OS as reported by the browser
     * @returns {string}
     */
    ezGetDeviceOS() {
        return EzBrowserInfo.ezInstance.browserContext
            ? EzBrowserInfo.ezInstance.browserContext.os
            : 'UNKNOWN';
    }

    /**
     * @public
        Returns true if the browser is an IOS browser
     * @returns {boolean}
     * @deprecated
        Migrate to:
            ezApi.ezclocker.ezBrowserInfo.ezIsAppleMobileDevice()
     */
    isiOSDevice() {
        return EzBrowserInfo.ezInstance.ezIsAppleMobileDevice();
    }

    /**
     * @public
        Returns a browser browserContext with the following data:
        browser name, version, version number, mobile (true/false), and operating system.
     * @returns {string}
     */
    ezGetBrowserContext() {
        return EzBrowserInfo.ezInstance.isiOSDevice() && EzBrowserInfo.ezInstance.browserContext;
    }

    /**
     * @public
        Returns true if the browser detected is a poorly updated and maintained product. This helps indicate if
        code should fall back to simple pre-es5 states with limited abilities.
     * @returns {boolean}
     */
    isGarbageBrowser() {
        return 'ie' === EzBrowserInfo.ezInstance.browserContext.name ||
            'edge' === EzBrowserInfo.ezInstance.browserContext.name ||
            'opera' === EzBrowserInfo.ezInstance.browserContext.name ||
            'safari' === EzBrowserInfo.ezInstance.browserContext.name ||
            'bb10' === EzBrowserInfo.ezInstance.browserContext.name ||
            'yandexbrowser' === EzBrowserInfo.ezInstance.browserContext.name ||
            'crios' === EzBrowserInfo.ezInstance.browserContext.name;
    }

    /**
     * @public
        Returns true if the browser is the #1 garbage browser on the planet!
     * @returns {boolean}
     */
    isIE() {
        return 'ie' === EzBrowserInfo.ezInstance.browserContext.name;
    }

    /**
     * @public @method
        Returns true if the browser reports the device is running any Apple operating system.
     * @returns {boolean}
     */
    ezIsAppleDevice() {
        return 'Mac OS' === EzBrowserInfo.ezInstance.ezGetDeviceOS() ||
            'iOS' === EzBrowserInfo.ezInstance.ezGetDeviceOS();
    }

    /**
     * @public @method
        Returns true if the browser reports the device is NOT mobile and running Mac OS
     * @returns {boolean}
     */
    ezIsApplePC() {
        return !EzBrowserInfo.ezInstance.ezIsMobile() && EzBrowserInfo.ezInstance.ezIsAppleDevice();
    }

    /**
     * @public @method
        Returns true if the browser reports the device is mobile and running iOS
     * @returns {boolean}
     */
    ezIsAppleMobileDevice() {
        return EzBrowserInfo.ezInstance.ezIsMobile() && EzBrowserInfo.ezInstance.ezIsAppleDevice();
    }

    /**
     * @public
        Returns true if the browser the deivce is mobile, running iSO, and the screen size is for mobile tablets
     * @returns {boolean}
     */
    ezIsAppleMobileTablet() {
        return EzBrowserInfo.ezInstance.ezIsAppleMobileDevice() &&
            EzBrowserInfo.ezInstance.ezIsMobileTablet();
    }

    /**
     * @public
        Returns true if the browser the deivce is mobile, running iSO, and the screen size is for mobile phones
     * @returns {boolean}
     */
    ezIsAppleMobilePhone() {
        return EzBrowserInfo.ezInstance.ezIsAppleMobileDevice() &&
            EzBrowserInfo.ezInstance.ezIsMobilePhone();
    }

    /**
     * @public @method
        Returns if the browser reports the device is running Chrome OS
     * @returns {boolean}
     */
    ezIsChromeOS() {
        return 'Chrome OS' === EzBrowserInfo.ezInstance.ezGetDeviceOS();
    }

    /**
     * @public @method
        Returns if the browser reports the device is mobile and running Chrome OS
     * @returns {boolean}
     */
    ezIsChromeMobileDevice() {
        return EzBrowserInfo.ezInstance.ezIsMobile() &&
            EzBrowserInfo.ezInstance.ezIsAndriodOS();
    }

    /**
     * @public @method
        Returns if the browser reports the device is mobile, running Chrome OS, and screen size is for mobile tablets
     * @returns {boolean}
     */
    ezIsChromeMobileTablet() {
        return EzBrowserInfo.ezInstance.ezIsChromeMobileDevice() &&
            EzBrowserInfo.ezInstance.ezIsMobileTablet();
    }

    /**
     * @public @method
        Returns if the browser reports the device is mobile, running Chrome OS, and screen size is for mobile phones
     * @returns {boolean}
     */
    ezIsChromeMobilePhone() {
        return EzBrowserInfo.ezInstance.ezIsChromeMobileDevice() &&
            EzBrowserInfo.ezInstance.ezIsMobilePhone();
    }

    /**
     * @public @method
        Returns true if the browser reports the device is running Andriod OS
     * @returns {boolean}
     */
    ezIsAndriodOS() {
        return 'Android OS' === EzBrowserInfo.ezInstance.ezGetDeviceOS();
    }

    /**
     * @public @method
        Returns if the browser reports the device is mobile and running Andriod OS
     * @returns {boolean}
     */
    ezIsAndriodMobileDevice() {
        return EzBrowserInfo.ezInstance.ezIsMobile() &&
            EzBrowserInfo.ezInstance.ezIsAndriodOS();
    }

    /**
     * @public @method
        Returns if the browser reports the device is mobile, running Andriod OS, and screen size is for mobile tablets
     * @returns {boolean}
     */
    ezIsAndroidMobileTablet() {
        return EzBrowserInfo.ezInstance.ezIsAndriodMobileDevice() &&
            EzBrowserInfo.ezInstance.ezIsMobileTablet();
    }

    /**
     * @public @method
        Returns if the browser reports the device is mobile, running Andriod OS, and screen size is for mobile phones
     * @returns {boolean}
     */
    ezIsAndriodMobilePhone() {
        return EzBrowserInfo.ezInstance.ezIsAndriodMobileDevice() &&
            EzBrowserInfo.ezInstance.ezIsMobilePhone();
    }

    /**
     * @public @method
        Returns true if the browser reports the device is running a Microsoft OS
     * @returns {boolean}
     */
    ezIsMicrosoftOS() {
        return 'Windows ME' === EzBrowserInfo.ezInstance.ezGetDeviceOS() ||
            'Windows CE' === EzBrowserInfo.ezInstance.ezGetDeviceOS() ||
            'Windows Mobile' === EzBrowserInfo.ezInstance.ezGetDeviceOS() ||
            'Windows 3.11' === EzBrowserInfo.ezInstance.ezGetDeviceOS() ||
            'Windows 95' === EzBrowserInfo.ezInstance.ezGetDeviceOS() ||
            'Windows 98' === EzBrowserInfo.ezInstance.ezGetDeviceOS() ||
            'Windows 2000' === EzBrowserInfo.ezInstance.ezGetDeviceOS() ||
            'Windows XP' === EzBrowserInfo.ezInstance.ezGetDeviceOS() ||
            'Windows Server 2003' === EzBrowserInfo.ezInstance.ezGetDeviceOS() ||
            'Windows Vista' === EzBrowserInfo.ezInstance.ezGetDeviceOS() ||
            'Windows 7' === EzBrowserInfo.ezInstance.ezGetDeviceOS() ||
            'Windows 8' === EzBrowserInfo.ezInstance.ezGetDeviceOS() ||
            'Windows 8.1' === EzBrowserInfo.ezInstance.ezGetDeviceOS() ||
            'Windows 10' === EzBrowserInfo.ezInstance.ezGetDeviceOS() ||
            'Windows 11' === EzBrowserInfo.ezInstance.ezGetDeviceOS() ||
            'Windows 12' === EzBrowserInfo.ezInstance.ezGetDeviceOS();
    }

    /**
     * @public @method
        Returns if the browser reports the device is NOT mobile and running a Microsoft OS
     * @returns {boolean}
     */
    ezIsMicrosoftPC() {
        return !EzBrowserInfo.ezInstance.ezIsMobile() &&
            EzBrowserInfo.ezInstance.ezIsMicrosoftOS();
    }

    /**
     * @public @method
        Returns if the browser reports the device is mobile and running a Microsoft OS
     * @returns {boolean}
     */
    ezIsMicrosoftMobileDevice() {
        return EzBrowserInfo.ezInstance.ezIsMobile() &&
            EzBrowserInfo.ezInstance.ezIsMicrosoftOS();
    }

    /**
     * @public @method
        Returns if the browser reports the device is mobile, running a Microsoft OS, and screen size is for mobile tablets
     * @returns {boolean}
     */
    ezIsMicrosoftMobileTablet() {
        return EzBrowserInfo.ezInstance.ezIsMicrosoftMobileDevice() &&
            EzBrowserInfo.ezInstance.ezIsMobileTablet();
    }

    /**
     * @public @method
        Returns if the browser reports the device is mobile, running a Microsoft OS, and screen size is for mobile phones
     * @returns {boolean}
     */
    ezIsMicrosoftMobilePhone() {
        return EzBrowserInfo.ezInstance.ezIsMicrosoftMobileDevice() &&
            EzBrowserInfo.ezInstance.ezIsMobilePhone();
    }

    /**
     * @public @method
        Returns true if mobile phone in portrait mode
     * @returns {boolean}
     */
    ezIsMobilePhonePortrait() {
        /* ----------- iPhone 4 and  4S ----------- */
        return EzBrowserInfo.ezInstance.ezMediaQueryMatches(
            EzHtml.build`
                only screen and
                (min-device-width: 320px) and
                (max-device-width: 480px) and
                (-webkit-min-device-pixel-ratio: 2) and
                (orientation: portrait)`) ||

            /* ----------- iPhone 5, 5S, 5C and  5SE ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    only screen and
                    (min-device-width: 320px) and
                    (max-device-width: 568px) and
                    (-webkit-min-device-pixel-ratio: 2) and
                    (orientation: portrait)`) ||

            /* ----------- iPhone 6, 6S, 7 and  8 ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    only screen and
                    (min-device-width: 375px) and
                    (max-device-width: 667px) and
                    (-webkit-min-device-pixel-ratio: 2) and
                    (orientation: portrait)`) ||

            /* ----------- iPhone 6+, 7+ and  8+ ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    only screen and
                    (min-device-width: 414px) and
                    (max-device-width: 736px) and
                    (-webkit-min-device-pixel-ratio: 3) and
                    (orientation: portrait)`) ||

            /* ----------- iPhone X ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    only screen and
                    (min-device-width: 375px) and
                    (max-device-width: 812px) and
                    (-webkit-min-device-pixel-ratio: 3) and
                    (orientation: portrait)`) ||

            /* ----------- Galaxy S3 ----------- */
            /* Portrait */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (device-width: 320px) and
                    (device-height: 640px) and
                    (-webkit-device-pixel-ratio: 2) and
                    (orientation: portrait)`) ||

            /* ----------- Galaxy S4, S5 and  Note 3 ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (device-width: 320px) and
                    (device-height: 640px) and
                    (-webkit-device-pixel-ratio: 3) and
                    (orientation: portrait)`) ||

            /* ----------- Galaxy S6 ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (device-width: 360px) and
                    (device-height: 640px) and
                    (-webkit-device-pixel-ratio: 4) and
                    (orientation: portrait)`) ||

            /* ----------- HTC One ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (device-width: 360px) and
                    (device-height: 640px) and
                    (-webkit-device-pixel-ratio: 3) and
                    (orientation: portrait)`) ||

            /* ----------- Google Pixel ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (device-width: 360px) and
                    (device-height: 640px) and
                    (-webkit-device-pixel-ratio: 3) and
                    (orientation: portrait)`) ||

            /* ----------- Google Pixel XL ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (device-width: 360px) and
                    (device-height: 640px) and
                    (-webkit-device-pixel-ratio: 4) and
                    (orientation: portrait)`) ||

            /* ----------- Nexus 4 ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (device-width: 384px) and
                    (device-height: 592px) and
                    (-webkit-device-pixel-ratio: 2) and
                    (orientation: portrait)`) ||

            /* ----------- Nexus 5 ----------- */

            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (device-width: 360px) and
                    (device-height: 592px) and
                    (-webkit-device-pixel-ratio: 3) and
                    (orientation: portrait)`) ||

            /* ----------- Nexus 6 and 6P ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (device-width: 360px) and
                    (device-height: 592px) and
                    (-webkit-device-pixel-ratio: 4) and
                    (orientation: portrait)`) ||

            /* ----------- Windows Phone ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (device-width: 480px) and
                    (device-height: 800px) and
                    (orientation: portrait)`);
    }

    /**
     * @public @method
        Returns true if mobile phone in landscape mode
     * @returns {boolean}
     */
    ezIsMobilePhoneLandscape() {
        /* ----------- iPhone 4 and 4S ----------- */
        return EzBrowserInfo.ezInstance.ezMediaQueryMatches(
            EzHtml.build`
                only screen and
                (min-device-width: 320px) and
                (max-device-width: 480px) and
                (-webkit-min-device-pixel-ratio: 2) and
                (orientation: landscape)`) ||

            /* ----------- iPhone 5, 5S, 5C and 5SE ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    only screen and
                    (min-device-width: 320px) and
                    (max-device-width: 568px) and
                    (-webkit-min-device-pixel-ratio: 2) and
                    (orientation: landscape)`) ||

            /* ----------- iPhone 6, 6S, 7 and 8 ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    only screen and
                    (min-device-width: 375px) and
                    (max-device-width: 667px) and
                    (-webkit-min-device-pixel-ratio: 2) and
                    (orientation: landscape)`) ||

            /* ----------- iPhone 6+, 7+ and 8+ ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    only screen and
                    (min-device-width: 414px) and
                    (max-device-width: 736px) and
                    (-webkit-min-device-pixel-ratio: 3) and
                    (orientation: landscape)`) ||

            /* ----------- iPhone X ----------- */
            /* Landscape */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    only screen and
                    (min-device-width: 375px) and
                    (max-device-width: 812px) and
                    (-webkit-min-device-pixel-ratio: 3) and
                    (orientation: landscape)`) ||

            /* ----------- Galaxy S3 ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (device-width: 320px) and
                    (device-height: 640px) and
                    (-webkit-device-pixel-ratio: 2) and
                    (orientation: landscape)`) ||

            /* ----------- Galaxy S4, S5 and Note 3 ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (device-width: 320px) and
                    (device-height: 640px) and
                    (-webkit-device-pixel-ratio: 3) and
                    (orientation: landscape)`) ||

            /* ----------- Galaxy S6 ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (device-width: 360px) and
                    (device-height: 640px) and
                    (-webkit-device-pixel-ratio: 4) and
                    (orientation: landscape)`) ||

            /* ----------- HTC One ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (device-width: 360px) and
                    (device-height: 640px) and
                    (-webkit-device-pixel-ratio: 3) and
                    (orientation: landscape)`) ||

            /* ----------- Google Pixel ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (device-width: 360px) and
                    (device-height: 640px) and
                    (-webkit-device-pixel-ratio: 3) and
                    (orientation: landscape)`) ||


            /* ----------- Google Pixel XL ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (device-width: 360px) and
                    (device-height: 640px) and
                    (-webkit-device-pixel-ratio: 4) and
                    (orientation: landscape)`) ||

            /* ----------- Nexus 4 ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (device-width: 384px) and
                    (device-height: 592px) and
                    (-webkit-device-pixel-ratio: 2)`) ||

            /* ----------- Nexus 5 ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (device-width: 360px) and
                    (device-height: 592px) and
                    (-webkit-device-pixel-ratio: 3) and
                    (orientation: landscape)`) ||

            /* ----------- Nexus 6 and 6P ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (device-width: 360px) and
                    (device-height: 592px) and
                    (-webkit-device-pixel-ratio: 4) and
                    (orientation: landscape)`) ||

            /* ----------- Windows Phone ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (device-width: 480px) and
                    (device-height: 800px) and
                    (orientation: landscape)`);
    }

    /**
     * @public @method
        Returns true if mobile phone
     * @returns {boolean}
     */
    ezIsMobilePhone() {
        /* ----------- iPhone 4 and 4S ----------- */
        return EzBrowserInfo.ezInstance.ezMediaQueryMatches(
            EzHtml.build`
                only screen and
                (min-device-width: 320px) and
                (max-device-width: 480px) and
                (-webkit-min-device-pixel-ratio: 2`) ||

            /* ----------- iPhone 5, 5S, 5C and 5SE ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    only screen and
                    (min-device-width: 320px) and
                    (max-device-width: 568px) and
                    (-webkit-min-device-pixel-ratio: 2)`) ||

            /* ----------- iPhone 6, 6S, 7 and 8 ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    only screen and
                    (min-device-width: 375px) and
                    (max-device-width: 667px) and
                    (-webkit-min-device-pixel-ratio: 2)`) ||

            /* ----------- iPhone 6+, 7+ and 8+ ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    only screen and
                    (min-device-width: 414px) and
                    (max-device-width: 736px) and
                    (-webkit-min-device-pixel-ratio: 3)`) ||

            /* ----------- iPhone X ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    only screen and
                    (min-device-width: 375px) and
                    (max-device-width: 812px) and
                    (-webkit-min-device-pixel-ratio: 3)`) ||

            /* ----------- Galaxy S3 ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (device-width: 360px) and
                    (device-height: 640px) and
                    (-webkit-device-pixel-ratio: 2)`) ||

            /* ----------- Galaxy S4, S5 and Note 3 ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (device-width: 320px) and
                    (device-height: 640px) and
                    (-webkit-device-pixel-ratio: 3)`) ||

            /* ----------- Galaxy S6 ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (device-width: 360px) and
                    (device-height: 640px) and
                    (-webkit-device-pixel-ratio: 4)`) ||

            /* ----------- HTC One ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (device-width: 360px) and
                    (device-height: 640px) and
                    (-webkit-device-pixel-ratio: 3)`) ||

            /* ----------- Nexus 4 ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (device-width: 384px) and
                    (device-height: 592px) and
                    (-webkit-device-pixel-ratio: 2`) ||

            /* ----------- Nexus 5 ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (device-width: 360px) and
                    (device-height: 592px) and
                    (-webkit-device-pixel-ratio: 3`) ||

            /* ----------- Nexus 6 and 6P ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (device-width: 360px) and
                    (device-height: 592px) and
                    (-webkit-device-pixel-ratio: 4`) ||

            /* ----------- Windows Phone ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (device-width: 480px) and
                    (device-height: 800px`);
    }

    /**
     * @public @method
        Returns true if wearable device
     * @returns {boolean}
     */
    ezIsWearable() {
        /* ----------- Moto 360 Watch ----------- */
        EzBrowserInfo.ezInstance.ezMediaQueryMatches(
            EzHtml.build`
                (max-device-width: 218px) and
                (max-device-height: 281px)`);
    }

    /**
     * @public @method
        Returns true if laptop
     * @returns {boolean}
     */
    ezIsLaptop() {
        /* ----------- Non-Retina Screens ----------- */
        EzBrowserInfo.ezInstance.ezMediaQueryMatches(
            EzHtml.build`
                screen and
                (min-device-width: 1200px) and
                (max-device-width: 1600px) and
                (-webkit-min-device-pixel-ratio: 1)`) ||

            /* ----------- Retina Screens ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                screen and
                (min-device-width: 1200px) and
                (max-device-width: 1600px) and
                (-webkit-min-device-pixel-ratio: 2) and
                (min-resolution: 192dpi)`);
    }

    /**
     * @public @method
        Returns true if mobile tablet in portrait mode
     * @returns {boolean}
     */
    ezIsMobileTabletPortrait() {
        /* ----------- Galaxy Tab 2 ----------- */
        return EzBrowserInfo.ezInstance.ezMediaQueryMatches(
            EzHtml.build`
                (max-device-width: 800px)`) ||

            /* ----------- Galaxy Tab S ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    (max-device-width: 800px) and
                    (orientation: portrait) and
                    (-webkit-min-device-pixel-ratio: 2)`) ||

            /* ----------- Nexus 7 ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (device-width: 601px) and
                    (device-height: 906px) and
                    (-webkit-min-device-pixel-ratio: 1.331) and
                    (-webkit-max-device-pixel-ratio: 1.332) and
                    (orientation: portrait)`) ||

            /* ----------- Nexus 9 ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (device-width: 1536px) and
                    (device-height: 2048px) and
                    (-webkit-min-device-pixel-ratio: 1.331) and
                    (-webkit-max-device-pixel-ratio: 1.332) and
                    (orientation: portrait)`) ||

            /* ----------- Kindle Fire HD 7" ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    only screen and
                    (min-device-width: 800px) and
                    (max-device-width: 1280px) and
                    (-webkit-min-device-pixel-ratio: 1.5) and
                    (orientation: portrait)`) ||

            /* ----------- Kindle Fire HD 8.9" ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    only screen and
                    (min-device-width: 1200px) and
                    (max-device-width: 1600px) and
                    (-webkit-min-device-pixel-ratio: 1.5) and
                    (orientation: portrait)`) ||

            /* ----------- iPad 1, 2, Mini and Air ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    only screen and
                    (min-device-width: 768px) and
                    (max-device-width: 1024px) and
                    (orientation: portrait) and
                    (-webkit-min-device-pixel-ratio: 1)`) ||

            /* ----------- iPad 3, 4 and Pro 9.7" ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    only screen and
                    (min-device-width: 768px) and
                    (max-device-width: 1024px) and
                    (orientation: portrait) and
                    (-webkit-min-device-pixel-ratio: 2)`) ||

            /* ----------- iPad Pro 10.5" ----------- */
            /* Declare the same value for min- and max-width to avoid colliding with desktops */
            /* Source: https://medium.com/connect-the-dots/css-media-queries-for-ipad-pro-8cad10e17106*/
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    only screen and
                    (min-device-width: 834px) and
                    (max-device-width: 834px) and
                    (orientation: portrait) and
                    (-webkit-min-device-pixel-ratio: 2)`) ||

            /* ----------- iPad Pro 12.9" ----------- */
            /* Declare the same value for min- and max-width to avoid colliding with desktops */
            /* Source: https://medium.com/connect-the-dots/css-media-queries-for-ipad-pro-8cad10e17106*/
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    only screen and
                    (min-device-width: 1024px) and
                    (max-device-width: 1024px) and
                    (orientation: portrait) and
                    (-webkit-min-device-pixel-ratio: 2)`);
    }

    /**
     * @public @method
        Returns true if mobile tablet in landscape mode
     * @returns {boolean}
     */
    ezIsMobileTabletLandscape() {
        /* ----------- Galaxy Tab 2 ----------- */
        return EzBrowserInfo.ezInstance.ezMediaQueryMatches(
            EzHtml.build`
                (max-device-width: 1280px)`) ||

            /* ----------- Galaxy Tab S ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    (max-device-width: 1280px) and
                    (orientation: landscape) and
                    (-webkit-min-device-pixel-ratio: 2)`) ||

            /* ----------- Nexus 7 ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (device-width: 601px) and
                    (device-height: 906px) and
                    (-webkit-min-device-pixel-ratio: 1.331) and
                    (-webkit-max-device-pixel-ratio: 1.332) and
                    (orientation: landscape)`) ||

            /* ----------- Nexus 9 ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (device-width: 1536px) and
                    (device-height: 2048px) and
                    (-webkit-min-device-pixel-ratio: 1.331) and
                    (-webkit-max-device-pixel-ratio: 1.332) and
                    (orientation: landscape)`) ||

            /* ----------- Kindle Fire HD 8.9" ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    only screen and
                    (min-device-width: 1200px)
                    (max-device-width: 1600px)
                    (-webkit-min-device-pixel-ratio: 1.5)
                    (orientation: landscape)`) ||

            /* ----------- Kindle Fire HD 7" ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    only screen and
                    (min-device-width: 800px) and
                    (max-device-width: 1280px) and
                    (-webkit-min-device-pixel-ratio: 1.5) and
                    (orientation: landscape)`) ||

            /* ----------- iPad 1, 2, Mini and Air ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    only screen and
                    (min-device-width: 768px) and
                    (max-device-width: 1024px) and
                    (orientation: landscape) and
                    (-webkit-min-device-pixel-ratio: 1)`) ||

            /* ----------- iPad 3, 4 and Pro 9.7" ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    only screen and
                    (min-device-width: 768px) and
                    (max-device-width: 1024px) and
                    (orientation: landscape) and
                    (-webkit-min-device-pixel-ratio: 2)`) ||

            /* ----------- iPad Pro 12.9" ----------- */
            /* Declare the same value for min- and max-width to avoid colliding with desktops */
            /* Source: https://medium.com/connect-the-dots/css-media-queries-for-ipad-pro-8cad10e17106*/
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    only screen and
                    (min-device-width: 1366px) and
                    (max-device-width: 1366px) and
                    (orientation: landscape) and
                    (-webkit-min-device-pixel-ratio: 2)`) ||

            /* ----------- iPad Pro 10.5" ----------- */
            /* Landscape */
            /* Declare the same value for min- and max-width to avoid colliding with desktops */
            /* Source: https://medium.com/connect-the-dots/css-media-queries-for-ipad-pro-8cad10e17106*/
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    only screen and
                    (min-device-width: 1112px) and
                    (max-device-width: 1112px) and
                    (orientation: landscape) and
                    (-webkit-min-device-pixel-ratio: 2)`);
    }

    /**
     * @public @method
        Returns true if mobile tablet
     * @returns {boolean}
     */
    ezIsMobileTablet() {
        return EzBrowserInfo.ezInstance.ezMediaQueryMatches(
            /* ----------- Galaxy Tab 2 ----------- */
            EzHtml.build`
                (min-device-width: 800px) and
                (max-device-width: 1280px)`) ||

            /* ----------- Galaxy Tab S ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    (min-device-width: 800px) and
                    (max-device-width: 1280px) and
                    (-webkit-min-device-pixel-ratio: 2)`) ||

            /* ----------- Nexus 7 ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (device-width: 601px) and
                    (device-height: 906px) and
                    (-webkit-min-device-pixel-ratio: 1.331) and
                    (-webkit-max-device-pixel-ratio: 1.332)`) ||

            /* ----------- Nexus 9 ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (device-width: 1536px) and
                    (device-height: 2048px) and
                    (-webkit-min-device-pixel-ratio: 1.331) and
                    (-webkit-max-device-pixel-ratio: 1.332')`) ||

            /* ----------- Kindle Fire HD 7" ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    screen and
                    (min-device-width: 800px) and
                    (max-device-width: 1280px) and
                    (-webkit-min-device-pixel-ratio: 1.5)`) ||

            /* ----------- Kindle Fire HD 8.9" ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    only screen and
                    (min-device-width: 1200px) and
                    (max-device-width: 1600px) and
                    (-webkit-min-device-pixel-ratio: 1.5)`) ||

            /* ----------- iPad 1, 2, Mini and Air ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    only screen and
                    (min-device-width: 768px) and
                    (max-device-width: 1024px) and
                    (-webkit-min-device-pixel-ratio: 1)`) ||

            /* ----------- iPad 3, 4 and Pro 9.7" ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    only screen and
                    (min-device-width: 768px) and
                    (max-device-width: 1024px) and
                    (-webkit-min-device-pixel-ratio: 2)`) ||

            /* ----------- iPad Pro 10.5" ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    only screen and
                    (min-device-width: 834px) and
                    (max-device-width: 1112px) and
                    (-webkit-min-device-pixel-ratio: 2)`) ||

            /* ----------- iPad Pro 12.9" ----------- */
            EzBrowserInfo.ezInstance.ezMediaQueryMatches(
                EzHtml.build`
                    only screen and
                    (min-device-width: 1024px) and
                    (max-device-width: 1366px) and
                    (-webkit-min-device-pixel-ratio: 2)`);
    }
}

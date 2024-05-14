import { EzInstanceState } from '/ezlibrary/EzInstanceState.js';

import { EzClockerCookieName } from '/public/javascript/common/ez-cookies.js';
import { EzUrlHelper } from '/public/javascript/common/ezclocker-url-helper2.js';

/**
 * @public
 * Instansiates a new instance of EzAffiliate
 *
 * @returns {EzAffiliate}
 */
class EzAffiliate {
    static ezApiName = 'ezAffiliate';
    static ezEventNames = {
        onReady: 'ezOn_EzAffiliate_Ready'
    };
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzAffiliate.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') && globalThis['ezApi'].ready &&
            ezApi.ezclocker[EzUrlHelper.ezApiName] && ezApi.ezclocker[EzUrlHelper.ezApiName].ready;
    }
    static ezRegistrator() {
        if (EzAffiliate.ezCanRegister()) {
            EzAffiliate.ezInstance = ezApi.ezRegisterNewApi(
                EzAffiliate,
                EzAffiliate.ezApiName);

            EzAffiliate.ezApiRegistrationState = 'REGISTERED';
        }
    }
    // Static Constructor
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                this.ezRegistrator);

            document.addEventListener(
                EzUrlHelper.ezEventNames.onReady,
                this.ezRegistrator);
        }
    }

    constructor() {
        this.ezStates.push(EzInstanceState.CONSTRUCTED);
    }

    /** @public @field */
    ready = false;
    /** @public @field */
    ezStates = [];
    shareASaleParamValue = null;
    affiliateCookieValue = null;
    affiliateId = null;
    referer = 'Referer:http://shareasale.com/r.cfm?b=000000&u=000000&m=000000&urllink=ezclocker%2Ecom&afftrack=';

    /** @public @readonly @property */
    get SHARASALE_PARAM_NAME() {
        return 'SSAID';
    }
    /** @public @readonly @property */
    get EZCLOCKER_AFFILIATE_COOKIE_NAME() {
        return EzClockerCookieName.EZ_AFFILIATE_SOURCED;
    }

    /**
     * @public
     * Initializes EzAffiliate
     *
     * @returns {EzAffiliate}
     */
    ezInit() {
        const self = EzAffiliate.ezInstance;

        self.loadAffiliateData();

        self.ready = true;
        return self;
    }
    /**
     * @public
     * Loads the affiliate data from URL params and cookies
     *
     * @returns {Promise}
     */
    loadAffiliateData() {
        const self = EzAffiliate.ezInstance;
        return ezApi.ezPromise(
            (resolve) => {
                self.shareASaleParamValue = ezApi.ezclocker.ezUrlHelper.getUrlParam(self.SHARASALE_PARAM_NAME) || null;

                self.affiliateCookieValue = ezApi.ezclocker.ezCookies.ezReadCookie(
                    EzClockerCookieName.EZ_AFFILIATE_SOURCED);

                self.writeAffiliateCookie();

                self.affiliateId = self.affiliateCookieValue || self.shareASaleParamValue;
                if (self.affiliateId && self.affiliateId.length === 0) {
                    self.affiliateId = null;
                }

                return resolve();
            });
    }
    /**
     * @public
     * Writes the affiliate cookie out
     *
     * @returns {Promise}
     */
    writeAffiliateCookie() {
        const self = EzAffiliate.ezInstance;
        return new Promise(function(resolve) {
            if (!self.shareASaleParamValue || self.shareASaleParamValue.length === 0) {
                return resolve();
            }

            var expireDate = moment().add(90, 'days');
            ezApi.ezclocker.ezCookies.ezSetExpiryCookie(EzClockerCookieName.EZ_AFFILIATE_SOURCED,
                self.shareASaleParamValue, expireDate);
            return resolve();
        });
    }
}




/**
 * ezApi registration
 */
document.addEventListener('onEzApiReady', function() {
    if (typeof ezApi === 'undefined' || !ezApi) {
        window.console.warn('EzApi is required by ez-affiliate.js module.');
    } else if (ezApi.ezIsNotValid(EzClockerCookieName)) {
        window.console.warn('EzCookies and the EzClockerCookieName enum is required in ez-affiliate.js module.');
    }

    ezApi.ezRegisterApi('ezAffiliate', new EzAffiliate());
    // Legacy access
    ezApi.ezRegisterWindow('ezAffiliate', ezApi.ezclocker.ezAffiliate);
});

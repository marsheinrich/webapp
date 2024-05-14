import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';

/**
    Wrapper for google analytics
    @deprecated
    Migrate to using ezMetrics functionality instead. (/public/widgits/EzMetrics)
 */
class EzGoogleAnalytics {
    static ezApiName = 'ezGoogleAnalytics';
    static ezEventNames = {
        onReady: 'ezOn_EzGoogleAnalytics_Ready'
    };
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzGoogleAnalytics.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') && globalThis['ezApi'].ready &&
            ezApi.ezclocker[EzGoogleAnalytics.ezApiName] && ezApi.ezclocker[EzGoogleAnalytics.ezApiName].ready;
    }
    static ezRegistrator() {
        if (EzGoogleAnalytics.ezCanRegister()) {
            EzGoogleAnalytics.ezInstance = ezApi.ezRegisterNewApi(
                EzGoogleAnalytics,
                EzGoogleAnalytics.ezApiName);

            EzGoogleAnalytics.ezApiRegistrationState = 'REGISTERED';
        }
    }
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                this.ezRegistrator);

            document.addEventListener(
                EzHttpHelper.ezEventNames.onReady,
                this.ezRegistrator);
        }
    }

    constructor() {
        this.ready = false;
        this.deubg = false;

        this.ga = null;
        this.gtagReady = false;
        this.googleAnalyticsIds = {
            prd: 'UA-38206072-1',
            dev: 'UA-90311549-1'
        };
        this.googleAdwordIds = {
            prd: 'AW-969305970'
        };
        this.googleSendToId = {
            prd: 'iKWwCNC_xHYQ8t6ZzgM'
        };
        this.googleGtagJSScriptUrl = 'https://www.googletagmanager.com/gtag/js?id=AW-969305970';
        this.googleGtagJSScript =
            '<script async src="https://www.googletagmanager.com/gtag/js?id=AW-969305970"></script>';
    }

    /**
     * @protected
     * Initializes EzGoogleAnalytics
     * @returns {EzGoogleAnalytics}
     */
    ezInit() {
        let self = ezApi.ezclocker.ezGoogleAnalytics;

        let a = document.createElement('a');
        a.href = window.location.href;

        let params = 'url=' + ezApi.ezEncode(a.hostname);
        let url = '/environment?' + params;

        ezApi.ezclocker.http.ezGet(url).then(
            function(response) {
                if (ezApi.ezclocker.http.isErrorResponse(response)) {
                    ezApi.ezclocker.logger.error('Google analytics load failure: ' + ezApi.ezToString(response));
                    return;
                }
                if ('PROD' === response.message || 'PRODUCTION' === response.message) {
                    self.initProdAnalytics();
                }
                if ('DEVELOPMENT' === response.message || 'LOCAL' === response.message) {
                    self.initDevAnalytics();
                }
                self.logPageView(document.title, location.pathname, self.getCurrentDomain());
                ezApi.ezclocker.logger.debug('Google Analytics Loaded');
            },
            function(eResponse) {
                ezApi.ezclocker.logger.error('Google analytics load failure: ' + ezApi.ezToJson(eResponse));
            });
        self.ready = true;
        return self;
    }

    /**
     * @public
     * @param {*} title
     * @param {*} url
     * @param {*} path
     */
    logPageView(title, url, path) {
        let self = ezApi.ezclocker.ezGoogleAnalytics;

        if (ezApi.ezIsNotValid(self.ga)) {
            ezApi.ezclocker.logger.warn('[' + title + ']:[' + url + ']=' + path + ' (**Google Analytics Not Ready**)');
            return false;
        }

        self.ga('send', {
            hitType: 'pageview',
            title: title ? title : 'Page Viewed',
            page: url ? url : location.pathname,
            location: path ? path : location.pathname
        });

        return true;
    }

    /**
     * @public
     * @param {*} category
     * @param {*} action
     * @param {*} label
     */
    logEvent(category, action, label) {
        let self = ezApi.ezclocker.ezGoogleAnalytics;

        if (ezApi.ezIsNotValid(self.ga)) {
            ezApi.ezclocker.logger.warn('[' + label + ']:[' + category + ']=' + action + ' (**Google Analytics Not Ready**)');
            return false;
        }
        self.ga('send', {
            hitType: 'event',
            eventCategory: category ? category : 'ezClocker',
            eventAction: action ? action : 'Action',
            eventLabel: label ? label : 'Event'
        });
        return true;
    }

    /**
     * @public
     * @param {*} env
     * @param {*} callback
     */
    reportConversion(env, callback) {
        let self = ezApi.ezclocker.ezGoogleAnalytics;

        if (env !== 'prd' && !self.debug) {
            return; // pre-prod has none
        }
        self.gtag('event', 'conversion', {
            'send_to': self.googleAdwordIds.prd + '/' + self.googleSendToId.prd,
            'event_callback': callback
        });
    }

    /**
     * @protected
     */
    gtag() {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(arguments);
    }

    /**
     * @protected
     */
    getCurrentDomain() {
        let a = document.createElement('a');
        a.href = window.location.href;
        return a.hostname;
    }

    /**
     * @protected
     */
    initProdAnalytics() {
        let self = ezApi.ezclocker.ezGoogleAnalytics;

        self.ezInitAnalytics('https://www.google-analytics.com/analytics.js');
        if (ezApi.ezIsNotValid(self.ga)) {
            ezApi.ezclocker.logger.error('Failed to initialize google analytics for production.');
            return;
        }

        self.ga('create', self.googleAnalyticsIds.prd, 'auto');
        return self.ezInjectGoogleSiteTag('prd');
    }

    /**
     * @protected
     */
    initDevAnalytics() {
        let self = ezApi.ezclocker.ezGoogleAnalytics;

        self.ezInitAnalytics('https://www.google-analytics.com/analytics_debug.js');
        if (ezApi.ezIsNotValid(self.ga)) {
            ezApi.ezclocker.logger.error('Failed to initialize google analytics for development.');
            return;
        }

        self.ga('create', self.googleAnalyticsIds.dev, 'auto');
        return self.ezInjectGoogleSiteTag('dev');
    }

    /**
     * @protected
     */
    ezInitAnalytics(scriptUrl) {
        let self = ezApi.ezclocker.ezGoogleAnalytics;

        (function(i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function() {
                (i[r].q = i[r].q || []).push(arguments);
            };
            i[r].l = 1 * new Date();
            a = s.createElement(o);
            m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m);
        })(window, document, 'script', scriptUrl, 'ga');

        if (!self.gtagReady) {
            self.gtag('js', new Date());
            self.gtag('config', self.googleAdwordIds.prd);
            self.gtagReady = true;
        }

        self.ga = window.ga;
        if (ezApi.ezIsValid(self.ga)) {
            ezApi.ezclocker.logger.info('EzGoogleAnalytics: READY');
        }
    }

    /**
     * @protected
     */
    ezInjectGoogleSiteTag(env) {
        let self = ezApi.ezclocker.ezGoogleAnalytics;

        if (env !== 'prd' && !self.debug) {
            return; // none used for pre-production
        }
        ezUi.ezInjectScript(self.googleGtagJSScriptUrl);
    }
}

export {
    EzGoogleAnalytics
};
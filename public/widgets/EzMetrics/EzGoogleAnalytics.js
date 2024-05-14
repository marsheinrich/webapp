/**
     Wrapper for google analytics
 */
class EzGoogleAnalytics {
    constructor() {
        this.ready = false;
        this.ezTypeName = 'EzGoogleAnalytics';

        this.debug = false;

        this.ezIds = {
            ezGoogleAnalyticsScriptId: 'EzGoogleAnalytics',
            ezGoogleSiteTagId: 'EzGoogleSiteTag'
        };

        self.ezEnabled = false;

        this.ezGoogleAnalyticsIds = {
            prd: 'UA-38206072-1',
            dev: 'UA-90311549-1'
        };

        this.ezGoogleAnalyticsId = this.ezGoogleAnalyticsId.prd;

        this.ezGoogleAdwordIds = {
            prd: 'AW-969305970'
        };

        this.ezGoogleGtagJSScriptUrl =
            ezApi.ezUrlTemplate`https://www.googletagmanager.com/gtag/js?id=${this.ezGoogleAdwordIds}`;

        this.ga = null;
    }

    /**
     * @protected
     * Initializes EzGoogleAnalytics
     * @returns {EzGoogleAnalytics}
     */
    ezInit() {
        let self = ezApi.ezclocker.ezGoogleAnalytics;
        self.ready = true;
        return self;
    }

    /**
        @public
        Injects the google analytics and google tags script into the HTML body
     */
    ezEnable() {
        let self = ezApi.ezclocker.ezGoogleAnalytics;
        if (ezApi.ezIsTrue(self.ezEnabled)) {
            // already enabled
            return;
        }

        ezApi.ezclocker.ezMetrics.ezGetEnvironment().then((environment) => {
            switch (environment) {
                case 'prd':
                    self.ezGoogleAnalyticsId = self.ezGoogleAnalyticsId.prd;
                    break;
                case 'dev':
                default:
                    self.ezGoogleAnalyticsId = self.ezGoogleAnalyticsId.dev;
                    break;
            }

            self.ezInjectGoogleAnalyticsScript();
            if ('prd' !== environemnt) {
                self.ezInjectGoogleSiteTag(environemnt);

                self.gtag('js', new Date());
                self.gtag('config', self.ezGoogleAdwordIds.prd);
            }

            self.ga = window.ga;

            self.logPageView(
                document.title,
                location.pathname,
                self.getCurrentDomain());

            self.ezEnabled = true;
        });
    }

    /**
        @public
        Removes the google analytics and google site tag scripts from the document body
     */
    ezDisable() {
        let self = ezApi.ezclocker[EzGoogleAnalytics.ezApiName];

        ezUi.ezRemoveElement(self.ezIds.ezGoogleAnalyticsScriptId);
        ezUi.ezRemoveElement(self.ezIds.ezGoogleSiteTagId);

        self.ezEnabled = false;
    }

    /**
        @protected
        Injects the Google analytics script into the body of the document.
     */
    ezInjectGoogleAnalyticsScript() {
        let self = ezApi.ezclocker[EzGoogleAnalytics.ezApiName];

        ezUi.ezAppendContent('body', ezApi.ezTemplate`
            <script id="${self.ezIds.ezGoogleAnalyticsScriptId}">
                <!-- Google Analytics Code -->
                (function (i, s, o, g, r, a, m) {
                  i['GoogleAnalyticsObject'] = r;
                  (i[r] =
                    i[r] ||
                    function () {
                      (i[r].q = i[r].q || []).push(arguments);
                    }),
                    (i[r].l = 1 * new Date());
                  (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
                  a.async = 1;
                  a.src = g;
                  m.parentNode.insertBefore(a, m);
                })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

                ga('create', ${self.ezGoogleAnalyticsIds.prd}, 'auto');
                ga('send', 'pageview');
                <!-- End Google Analytics Code -->
            </script>`);
    }

    /**
        @protected
        Injects the Google Site Tag script into the body of the HTML document.
     */
    ezInjectGoogleSiteTag() {
        let self = ezApi.ezclocker[EzGoogleAnalytics.ezApiName];

        ezUi.ezAppendContent('body', ezApi.ezTemplate`
            <script id="${self.ezIds.ezGoogleSiteTagId}" src="${self.ezGoogleGtagJSScriptUrl}" async></script>`);
    }

    /**
        @deprecated
        Migrate to ezApi.ezclocker.ezGoogleAnalytics.ezLogPageView(title, url, path)
        @public
        Logs a page view to google analytics
        @param {String} title
        @param {String} url
        @param {String} path
     */
    logPageView(title, url, path) {
        ezApi.ezclocker[EzGoogleAnalytics.ezApiName].ezLogPageView(title, url, path);
    }

    /**
        @public
        Logs a page view to google analytics
        @param {String} title
        @param {String} url
        @param {String} path
     */
    ezLogPageView(title, url, path) {
        let self = ezApi.ezclocker[EzGoogleAnalytics.ezApiName];

        if (ezApi.ezIsNotValid(self.ga)) {
            ezApi.ezclocker.logger.warn(ezApi.ezEM1`[${title}]:[${url}]=${path} (**Google Analytics Not Ready**)`);
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
        @deprecated
        Migrate to ezApi.ezclocker.ezGoogleAnalytics.ezLogEvent(category, action, label)
        @public
        Logs an event to google analytics
        @param {String} category
        @param {String} action
        @param {String} label
     */
    logEvent(category, action, label) {
        ezApi.ezclocker[EzGoogleAnalytics.ezApiName].ezLogEvent(category, action, label);
    }

    /**
        @public
        Logs an event to google analytics
        @param {String} category
        @param {String} action
        @param {String} label
     */
    ezLogEvent(category, action, label) {
        let self = ezApi.ezclocker[EzGoogleAnalytics.ezApiName];

        if (ezApi.ezIsNotValid(self.ga)) {
            ezApi.ezclocker.logger.warn(
                ezApi.ezMsg`[${label}]:[${category}]=${action} (**Google Analytics Not Ready**)`);
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
        @deprecated
        Migrate to ezApi.ezclocker.ezGoogleAnalytics.ezReportConversion(env, callback)
        @public
        Reports an ad conversions
        @param {String} env
        @param {Function} callback
     */
    reportConversion(env, callback) {
        ezApi.ezclocker[EzGoogleAnalytics.ezApiName].ezReportConversion(env, callback);
    }

    /**
        @public
        Reports an ad conversions
        @param {String} env
        @param {Function} callback
     */
    ezReportConversion(env, callback) {
        let self = ezApi.ezclocker[EzGoogleAnalytics.ezApiName];

        if (env !== 'prd' && !self.debug) {
            return; // pre-prod has none
        }

        self.gtag('event', 'conversion', {
            'send_to': self.googleAdwordIds.prd + '/' + self.googleSendToId.prd,
            'event_callback': callback
        });
    }

    /**
        @public
        Pushes the provided arguments to the window.datalayer array.
     */
    gtag() {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(arguments);
    }
}
EzGoogleAnalytics.ezApiName = 'ezGoogleAnalytics';

document.addEventListener('onEzApiReady', () => ezApi.ezRegisterNewApi(EzGoogleAnalytics, EzGoogleAnalytics.ezApiName));

export {
    EzGoogleAnalytics
};
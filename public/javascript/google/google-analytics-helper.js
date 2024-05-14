var ezGoogleAnalytics = ezGoogleAnalytics || {
    ready: false
};

var _gaq = _gaq || [];
var ga;

/**
    @deprecated
    Migrate to:
    EzGoogleAnalyticsIntegration.js
 */
var ezGoogleAnalytics = {
    ready: false,
    recordConversion: function () {
        // gtag('event', 'conversion', {
        //     'send_to': 'AW-969305970/iKWwCNC_xHYQ8t6ZzgM',
        // });
        return false;
    },
    initGoogleAnalytics: function () {
        return new Promise(function (resolve, reject) {
            var url = googleAnalytics.getUrlDomain(window.location);
            var em1 = 'Could not determine the current deployment environment. Disabling google analytics.';
            httpHelper.httpGETJSON(url,
                function (response, jqXHR) { // success
                    if (response.errorCode != '0') {
                        console.debug('Disabling google analytics due to ' + response.message);
                        return reject(response);
                    }
                    console.debug('Determined environment is ' + response.message);
                    if (response.message == 'PROD') {
                        ezGoogleAnalytics.executeProdAnalytics();
                        return resolve(ezGoogleAnalytics);
                    }
                    if (response.message == 'DEV') {
                        ezGoogleAnalytics.executeDevAnalytics();
                        return resolve(ezGoogleAnalytics);
                    }
                    if (response.message == 'local') {
                        var em2 = 'Detected local debugging environment. Disabling google analytics.';
                        console.debug(em2);
                        return reject(em2);
                    }
                    console.debug(em1);
                    reject(em1);
                },
                function (errorResponse, jqXHR) { // failure
                    console.debug(em1);
                    reject(em1);
                }
            );
            ezGoogleAnalytics.ready = true;
        });
    },
    getUrlDomain: function (fullUrl) {
        var a = document.createElement('a');
        a.href = fullUrl;
        return a.hostname;
    },
    googleAnalyticsConfig: {
        accountId: 'UA-38206072-1',
        pluginUrl: '//www.google-analytics.com/plugins/ga/inpage_linkid.js'
    },
    executeProdAnalytics: function () {
        return new Promise(function (resolve, reject) {
            try {
                _gaq.push(['_require', 'inpage_linkid', ezGoogleAnalytics.googleAnalyticsConfig.pluginUrl]);
                _gaq.push(['_setAccount', ezGoogleAnalytics.googleAnalyticsConfig.accountId]);
                _gaq.push(['_trackPageview']);

                // Inject into document
                ga = document.createElement('script');
                ga.type = 'text/javascript';
                ga.async = true;
                ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') +
                    '.google-analytics.com/ga.js';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(ga, s);
                ezGoogleAnalytics.environment = 'PROD';
                resolve(ezGoogleAnalytics);
            } catch (exception) {
                // Catching any errors related to google analytics and ignoring to prevent site crash.
                var em = 'Unable to load google analytics: ' + exception +
                    '. Disabling analytics for the session.';
                console.error(em);
                reject(em);
            }
        });
    },
    executeDevAnalytics: function () {
        console.info('Development environments do not use google analytics.');
        ezGoogleAnalytics.environment = 'DEV';
        Promise.resolve(ezGoogleAnalytics);
    }
};
var googleAnalytics = ezGoogleAnalytics; // legacy support
ezGoogleAnalytics.initGoogleAnalytics().then(function () {
    ezGoogleAnalytics.ready = true;
});

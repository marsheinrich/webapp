/**
 * Provides Google Analytics Functionality
 *
 * Additional Required Dependencies
 * public/javascript/common/ezclocker-navigation.js
 *
 */

function getUrlDomain(fullUrl) {
    var a = document.createElement('a');
    a.href = fullUrl;
    return a.hostname;
}

function loadAnalytics() {
    var url = window.location;
    var urlDomain = getUrlDomain(url);
    var postParam = 'url=' + encodeURIComponent(urlDomain);
    var postURL = getServiceUrl('environment?' + postParam);
    ezPostJSON(postURL, '', loadAnalyticsSuccess, loadAnalyticsError, true);
}

function loadAnalyticsSuccess(result, statusCode, jqXHR) {
    if (result.errorCode != '0') {
        return;
    }
    window.console.debug('Determined environment is ' + result.message);
    if (result.message == 'PROD') {
        executeProdAnalytics();
        return;
    }
    if (result.message == 'DEV') {
        executeDevAnalytics();
        return;
    }
    window.console.debug('Determine the current environment should not run google analytics. Skipping.');
    executeProdAnalytics();
}

function loadAnalyticsError(jqXHR, status, error) {
    //alert(error);
}

var _gaq = _gaq || [];
var pluginUrl = '//www.google-analytics.com/plugins/ga/inpage_linkid.js';

function executeProdAnalytics() {
    try {
        _gaq.push(['_require', 'inpage_linkid', pluginUrl]);
        _gaq.push(['_setAccount', 'UA-38206072-1']);
        _gaq.push(['_trackPageview']);
        var ga = document.createElement('script');
        ga.type = 'text/javascript';
        ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') +
            '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
    } catch (ex) {
        // Catching any errors related to google analytics and ignoring to prevent site crash.
        window.console.error('Unable to load google analytics: ' + error);
        window.console.error('Disabling analytics for this user.');
    }
}

function executeDevAnalytics() {
    // do nothing for now
}

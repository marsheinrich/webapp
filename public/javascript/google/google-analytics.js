//TODO: Replace all uses of google-analytics.js with google-analtyics-helper.js
console.warn('DEPRECATED: Replace usage of google-analytics.js with google-analtyics-helper.js');

function getUrlDomain(fullUrl) {
    var a = document.createElement('a');
    a.href = fullUrl;
    return a.hostname;
}

function loadAnalytics(urlPrefix) {
    if (window.location.hostname == 'localhost') {
        return;
    } // don't use on localhost
    var url = window.location;
    var urlDomain = getUrlDomain(url);
    var postParam = 'url=' + encodeURIComponent(urlDomain);
    // call service, determine if dev or prod
    var postURL = urlPrefix + 'environment';
    ezPostJSON(postURL, postParam, loadAnalyticsSuccess, loadAnalyticsError, true);
}

function loadAnalyticsSuccess(result, statusCode, jqXHR) {
    var environmentData = JSON.parseJSON(result);
    if (environmentData.errorCode != '0') {
        return;
    }
    if (environmentData.message == 'PROD') {
        executeProdAnalytics();
        return;
    }
    if (environmentData.message == 'DEV') {
        executeDevAnalytics();
        return;
    }
}

function loadAnalyticsError(jqXHR, status, error) {
    //alert(error);
}

var _gaq = _gaq || [];
var pluginUrl = '//www.google-analytics.com/plugins/ga/inpage_linkid.js';
_gaq.push(['_require', 'inpage_linkid', pluginUrl]);

function executeProdAnalytics() {
    _gaq.push(['_setAccount', 'UA-38206072-1']);
    _gaq.push(['_trackPageview']);
    //(
    //	function() {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
    //	}
    //)();
}

function executeDevAnalytics() {
    // do nothing for now
}

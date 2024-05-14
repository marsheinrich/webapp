var dependencyModeIsDebug = (location.protocol == 'http:') ? true : false;
window.console.info(
    (dependencyModeIsDebug) ?
        'Determined environment is NOT production. Turning on debug Css and Javascript.' :
        'Determined environment is production. Turning off debug Css and Javascript.'
);

var sdeps = { // Site wide dependencies
    css: {
        any: [
            'public/styles/common/ezclocker-header.css',
            'public/styles/common/ezclocker-common.css',
            'public/styles/common/ezclocker-logo.css',
            'public/styles/common/ezclocker-maincontent.css',
            'public/styles/common/ezclocker-spinner.css',
            'public/javascript/jquery/jquery-ui-1.11.4/css/jquery-ui.min.css'
        ],
        debug: [],
        release: []
    },
    js: {
        any: [
            'public/javascript/jquery/jquery-1.11.0.min.js',
            'public/javascript/jquery/jquery-ui-1.11.4/js/jquery-ui.min.js',
            'public/javascript/jquery/jquery.textchange.js',
            'public/javascript/thirdparty/spin.js',
            'public/javascript/common/ezclocker-spinner.js',
            'public/javascript/common/ezclocker-http.js',
            'public/javascript/common/ezclocker-ui-helper.js',
            'public/javascript/common/ezclocker-buttons.js',
            'public/javascript/common/ezclocker-navigation.js',
            'public/javascript/common/ezclocker-services.js',
            'public/javascript/common/ez-cookies.js'
        ],
        debug: [],
        release: []
    }
};
var ddeps = { // document dependencies
    css: {
        any: [],
        debug: [],
        release: []
    },
    js: {
        any: [],
        debug: [],
        release: []
    }
};

function injectLinkTagIntoDocument(cssUrl) {
    document.write('<link href="' + cssUrl + '" rel="stylesheet" type="text/css"/>');
}

function injectCss() {
    var anyModeCssUrlsToInject = (sdeps.css.any == undefined ? [] : sdeps.css.any);
    var cssUrl;
    var index;
    for (index in anyModeCssUrlsToInject) {
        cssUrl = anyModeCssUrlsToInject[index];
        injectLinkTagIntoDocument(cssUrl);
    }

    var sdepsCssUrlsToInject = (
        dependencyModeIsDebug ?
            (sdeps.css.debug == undefined ? [] : sdeps.css.debug) :
            (sdeps.css.release == undefined ? [] : sdeps.css.release)
    );
    for (index in sdepsCssUrlsToInject) {
        cssUrl = sdepsCssUrlsToInject[index];
        injectLinkTagIntoDocument(cssUrl);
    }

    var ddepsAnyModeCssUrlsToInject = (ddeps.css.any == undefined ? [] : ddeps.css.any);
    for (index in ddepsAnyModeCssUrlsToInject) {
        cssUrl = ddepsAnyModeCssUrlsToInject[index];
        injectLinkTagIntoDocument(cssUrl);
    }

    var cssUrlsToInject = (
        dependencyModeIsDebug ?
            (ddeps.css.debug == undefined ? [] : ddeps.css.debug) :
            (ddeps.css.release == undefined ? [] : ddeps.css.release)
    );
    for (index in cssUrlsToInject) {
        cssUrl = cssUrlsToInject[index];
        injectLinkTagIntoDocument(cssUrl);
    }
}

function injectScriptTagInDocument(scriptUrl) {
    document.writeln('<script src="' + scriptUrl + '"></script>');
}

function injectJs() {
    var anyModeJsUrlsToInject = (sdeps.js.any == undefined ? [] : sdeps.js.any);
    var index;
    var jsUrl;

    for (index in anyModeJsUrlsToInject) {
        jsUrl = anyModeJsUrlsToInject[index];
        injectScriptTagInDocument(jsUrl);
    }

    var sdepsJsUrlsToInject = (
        dependencyModeIsDebug
            ? (sdeps.js.debug == undefined ? [] : sdeps.js.debug)
            : (sdeps.js.release == undefined ? [] : sdeps.js.release)
    );

    for (index in sdepsJsUrlsToInject) {
        jsUrl = sdepsJsUrlsToInject[index];
        injectScriptTagInDocument(jsUrl);
    }

    var ddepsAnyModeJsUrlsToInject = (ddeps.js.any == undefined ? [] : ddeps.js.any);
    for (index in ddepsAnyModeJsUrlsToInject) {
        jsUrl = ddepsAnyModeJsUrlsToInject[index];
        injectScriptTagInDocument(jsUrl);
    }

    var jsUrlsToInject = (
        dependencyModeIsDebug ?
            (ddeps.js.debug == undefined ? [] : ddeps.js.debug) :
            (ddeps.js.release == undefined ? [] : ddeps.js.release)
    );
    for (index in jsUrlsToInject) {
        jsUrl = jsUrlsToInject[index];
        injectScriptTagInDocument(jsUrl);
    }
}

function inject() {
    injectCss();
    injectJs();
}

function injectAnalytics(tag) {
    document.writeln('<script src="public/javascript/common/ezclocker-google-analytics.js"></script>');
    document.writeln('<script>loadAnalytics("");</script>');
}

// This is an experimental JS file and should no longer be used in any of the sites pages.

/**
    @public
    Loads external CSS and JS files
    @returns {EzClockerLoader}
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
let EzClockerLoader = function() {
    this.ready = false;
    this.rootUrl = null;
    this.enableFileRevision = true;
    this.revisionVersion = 'r72-3';
    this.ezClockerLoaderReadyEventName = 'onEzClockerLoaderReady';
    this.ezClockerMobileReadyEventName = 'onEzClockerMobileReady';
    this.ezClockerWebReadyEventName = 'onEzClockerWebReady';
    return this;
};

/**
    @protected
    Initializes EzClockerLoader
    @returns {EzClockerLoader}
 @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezInit = function() {
    let self = window.ezClockerLoader;

    self.ezInitEvents();
    document.addEventListener(self.ezClockerMobileReadyEventName, self.ezRefreshJqueryMobile);
    $import('[promiseJS:js] ' + self.ezpJs('thirdparty/promise-7.0.4.min.js'), function() {
        document.dispatchEvent(self.onEzClockerLoaderReadyEvent);
    });

    self.ready = true;
    return self;
};

/**
    @protected
    Initializes the events that will fire from EzClockerLoader
 @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezInitEvents = function() {
    let self = window.ezClockerLoader;
    self.onEzClockerLoaderReadyEvent = document.createEvent('Event');
    self.onEzClockerLoaderReadyEvent.initEvent(self.ezClockerLoaderReadyEventName, true, true);
    self.onEzClockerMobileReadyEvent = document.createEvent('Event');
    self.onEzClockerMobileReadyEvent.initEvent(self.ezClockerMobileReadyEventName, true, true);
    self.onEzClockerWebReadyEvent = document.createEvent('Event');
    self.onEzClockerWebReadyEvent.initEvent(self.ezClockerWebReadyEventName, true, true);
};

/**
    @public
    Call to inject the required modubles for ezClocker mobile
 @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezInitEzClockerMobile = function() {
    let self = window.ezClockerLoader;
    self.ezInject([
        self.ezBuildInjector(self.ezInjectMobileCssBase),
        self.ezBuildInjector(self.ezInjectShims),
        self.ezBuildInjector(self.ezInjectJquery),
        self.ezBuildInjector(self.ezInjectWebBase),
        self.ezBuildInjector(self.ezInjectMobileBase)
    ]);
};

/**
    @public
    Call to inject the required modules for ezClocker website
 @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezInitEzClockerWeb = function() {
    let self = window.ezClockerLoader;
    return new Promise(function(resolve) {
        self.ezInject([
            self.ezBuildInjector(self.ezInjectEzClockerStyleBase),
            self.ezBuildInjector(self.ezInjectShims),
            self.ezBuildInjector(self.ezInjectJquery),
            self.ezBuildInjector(self.ezInjectJqueryUi),
            self.ezBuildInjector(self.ezInjectWebBase),
            self.ezBuildInjector(self.ezInjectServices),
            self.ezBuildInjector(self.ezInjectAnalytics)
        ]).then(function() {
            document.dispatchEvent(self.onEzClockerWebReadyEvent);
            return resolve();
        });
    });
};

/**
    @public
    Creates a call object for ezInject. Supports the first param as what method to call to perform the injection,
    all other params assigned as an [] to pass along in the first method call.
 @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezBuildInjector = function() {
    let args = Array.prototype.slice.call(arguments);
    let call = args[0];
    if (null === call) {
        return {
            'call': function() { },
            'with': []
        };
    }
    return {
        'call': call,
        'with': args.slice(1)
    };
};

/**
    @public
    Injects the available shims into the document
 @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezInjectShims = function() {
    let self = window.ezClockerLoader;
    return self.ezInject([
        self.ezBuildInjector(self.ezInjectJs, self.ezNm('es5-shim/es5-shim.min.js')),
        self.ezBuildInjector(self.ezInjectJs, self.ezNm('es6-shim/es6-shim.min.js')),
        self.ezBuildInjector(self.ezInjectJs, self.ezNm('es7-shim/dist/es7-shim.min.js')),
        self.ezBuildInjector(self.ezInjectJs, '//cdn.polyfill.io/v2/polyfill.min.js?features=es6'),
    ]);
};

/**
    @public
    Initializes the page as a mobile site page
 @deprecated
    REMOVE ALL USE, will delete in a future release.
    @param {string|null} version
 */
EzClockerLoader.prototype.ezInjectJqueryMobile = function(version) {
    version = !version || version.length === 0 ? 'v1.4.5' : version;
    let self = window.ezClockerLoader;
    $(document).on('mobileinit', function() {
        window.console.debug('[EzClockerLoader]:[mobileinit] jQuery mobile has initialized.');
        document.dispatchEvent(self.onEzClockerMobileReadyEvent);
    });

    // Inject meta's and icons
    $('head').prepend('<meta name="viewport" ' +
        'content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no" />' +
        '<meta name="description" content="Easy to use small business employee time tracking website and mobile app. ' +
        'EzClocker provides employee time clock features, GPS tracking, and scheduling. ' +
        'Great for businesses like janitorial, landscaping, construction, catering, and many others."/>' +
        '<link href="' + self.ezFromRoot('favicon.png') + '" rel="shortcut icon" type="image/png"/>' +
        '<meta name="apple-itunes-app" content="app-id=833047956" />' +
        '<link href="' + self.ezFromRoot('favicon.png') + '" rel="apple-touch-icon" />' +
        '<link href="' + self.ezFromRoot('favicon.png') +
        '" rel="apple-touch-icon" sizes="72x72" type="image/png"/>' +
        '<link href="' + self.ezFromRoot('favicon.png') +
        '" rel="apple-touch-icon" sizes="114x114" type="image/png"/>' +
        '<link href="' + self.ezFromRoot('favicon.png') +
        '" rel="apple-touch-icon" sizes="144x144" type="image/png"/>');

    return self.ezInject([
        self.ezBuildInjector(self.ezInjectCss, self.ezm$(version + '/jquery.mobile.structure.min.css')),
        self.ezBuildInjector(self.ezInjectCss, self.ezm$(version + '/theme/jquery.mobile.icons.min.css')),
        self.ezBuildInjector(self.ezInjectCss, self.ezm$(version + '/theme/ezclocker-mobile.min.css')),
        self.ezBuildInjector(self.ezInjectJs, self.ezm$(version + '/jquery.mobile.min.js'))
    ]);
};

/**
    @public
    Injects the base CSS files for the mobile website
 @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezInjectMobileCssBase = function() {
    let self = window.ezClockerLoader;
    return self.ezInject([
        self.ezBuildInjector(self.ezInjectCss, self.ezpJs('google/roboto-font.css')),
        self.ezBuildInjector(self.ezInjectCss, self.ezmpCss('common/m.ezclocker-common.css')),
        self.ezBuildInjector(self.ezInjectCss, self.ezmpCss('common/m.ezclocker-errors.css')),
        self.ezBuildInjector(self.ezInjectCss, self.ezmpCss('common/m.ezclocker-header.css')),
        self.ezBuildInjector(self.ezInjectCss, self.ezmpCss('m.ezclocker.css')),
        self.ezBuildInjector(self.ezInjectCss, self.ezmpCss('ezm-common.css'))
    ]);
};

/**
    @public
    Imports external required files for all ezClocker mobile website pages
 @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezInjectMobileBase = function() {
    let self = window.ezClockerLoader;
    return self.ezInject([
        self.ezBuildInjector(self.ezInjectJqueryMobile),
        self.ezBuildInjector(self.ezInjectJs, self.ezmpJs('ezclocker-mobile-navigation.js')),
        self.ezBuildInjector(self.ezInjectJs, self.ezmpJs('common/m.ezclocker-mobile.js')),
        self.ezBuildInjector(self.ezInjectJs, self.ezmpJs('signin/ezm-signing-controller.js'))
    ]);
};

/**
    @public
    Injects JQuery into the document
 @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezInjectJquery = function() {
    let self = window.ezClockerLoader;
    return self.ezInject([self.ezBuildInjector(self.ezInjectJs, '//code.jquery.com/jquery-2.2.4.min.js'),
        self.ezBuildInjector(self.ezInjectJs, self.ezNm('jquery/dist/jquery.min.js')),
        self.ezBuildInjector(self.ezInjectJs, self.ezNm('jquery-migrate/dist/jquery-migrate.min.js'))
    ]);
};

/**
    Injects the JQuery UI dependencies
 @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezInjectJqueryUi = function(version) {
    version = !version || version.length === 0 ? '1.12.1' : version;
    let self = window.ezClockerLoader;
    return self.ezInject([
        self.ezBuildInjector(self.ezInjectJs,
            self.ezpJs('jquery/jquery-ui-' + version + '/jquery-ui.min.js')),
        self.ezBuildInjector(self.ezInjectJs,
            self.ezpJs('jquery/jquery-ui-' + version + '/jquery.ui.timepicker-0.3.3.min.js')),
        self.ezBuildInjector(self.ezInjectCss,
            self.ezpJs('jquery/jquery-ui-' + version + '/jquery-ui.min.css')),
        self.ezBuildInjector(self.ezInjectCss,
            self.ezpJs('jquery/jquery-ui-' + version + '/jquery-ui.structure.min.css')),
        self.ezBuildInjector(self.ezInjectCss,
            self.ezpJs('jquery/jquery-ui-' + version + '/jquery-ui.theme.min.css')),
        self.ezBuildInjector(self.ezInjectCss,
            self.ezpJs('jquery/jquery-ui-' + version + '/jquery.ui.timepicker-0.3.3.css'))
    ]);

};

/**
    @public
    Injects the basic web site header items for favicon, description, contenttype, and viewport
 @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezInjectWebHeader = function() {
    $('head').prepend('<meta name="description" content="Easy to use small business employee time tracking ' +
        'website and mobile app. EzClocker provides employee time clock features, GPS tracking, and scheduling. ' +
        'Great for businesses like janitorial, landscaping, construction, catering, and many others.">' +
        '<link href="' + self.ezFromRoot('favicon.png') + '" rel="shortcut icon" type="image/png" />' +
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
        '<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">');
};

/**
    @private
    Imports external required files for ALL ezClocker website pages
 @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezInjectWebBase = function() {
    let self = window.ezClockerLoader;
    return self.ezInject([
        self.ezBuildInjector(self.ezInjectJs, self.ezNm('@webcomponents/webcomponentsjs/webcomponents-bundle.js')),
        self.ezBuildInjector(self.ezInjectJs, self.ezNm('moment/min/moment-with-locales.min.js')),
        self.ezBuildInjector(self.ezInjectJs, self.ezNm('moment-timezone/builds/moment-timezone-with-data.min.js')),
        self.ezBuildInjector(self.ezInjectJs, self.ezNm('browser-detect/dist/browser-detect.umd.js')),
        self.ezBuildInjector(self.ezInjectJs, self.ezpJs('common/ezapi.js')),
        self.ezBuildInjector(self.ezInjectJs, self.ezpJs('common/ezclocker-shims.js')),
        self.ezBuildInjector(self.ezInjectJs, self.ezpJs('common/ezclocker-logger.js')),
        self.ezBuildInjector(self.ezInjectJs, self.ezpJs('common/ez-validation.js')),
        self.ezBuildInjector(self.ezInjectJs, self.ezpJs('common/ezclocker-url-helper2.js')),
        self.ezBuildInjector(self.ezInjectJs, self.ezpJs('common/ez-cookies.js')),
        self.ezBuildInjector(self.ezInjectJs, self.ezpJs('common/ezclocker-navigation-helper.js')),
        self.ezBuildInjector(self.ezInjectJs, self.ezpJs('common/ezclocker-http-helper.js')),
        self.ezBuildInjector(self.ezInjectJs, self.ezpJs('common/ezclocker-dateUtils.js')),
        self.ezBuildInjector(self.ezInjectJs, self.ezpJs('common/ez-format.js')),
        self.ezBuildInjector(self.ezInjectJs, self.ezpJs('common/ez-date-time.js')),
        self.ezBuildInjector(self.ezInjectJs, self.ezpJs('common/ez-html-char.js')),
        self.ezBuildInjector(self.ezInjectJs, self.ezpJs('common/ez-services.js')),
        self.ezBuildInjector(self.ezInjectUxBase)
    ]);
};

/**
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezInjectLegacy = function() {
    let self = window.ezClockerLoader;
    return self.ezInject([
        self.ezBuildInjector(self.ezInjectJs, self.ezpJs('ezclocker-constants.js')),
        self.ezBuildInjector(self.ezInjectJs, self.ezpJs('common/tcs-common.js')),
    ]);
};

/**
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezInjectEzClockerStyleBase = function() {
    let self = window.ezClockerLoader;
    return self.ezInject([
        self.ezBuildInjector(self.ezInjectCss, self.ezpJs('google/roboto-font.css')),
        self.ezBuildInjector(self.ezInjectCss, self.ezpCss('common/ezclocker-base2015.css')),
        self.ezBuildInjector(self.ezInjectCss, self.ezpCss('common/ezclocker-body.css')),
        self.ezBuildInjector(self.ezInjectCss, self.ezpCss('common/ezclocker-maincontent.css')),
        self.ezBuildInjector(self.ezInjectCss, self.ezpCss('common/ezclocker-header.css')),
        self.ezBuildInjector(self.ezInjectCss, self.ezpCss('common/ezclocker-menu.css')),
        self.ezBuildInjector(self.ezInjectCss, self.ezpCss('common/ezclocker-tables.css')),
        self.ezBuildInjector(self.ezInjectCss, self.ezpCss('common/ezclocker-logo.css')),
        self.ezBuildInjector(self.ezInjectCss, self.ezpCss('common/ezclocker-buttons.css')),
        self.ezBuildInjector(self.ezInjectCss, self.ezpCss('common/ezclocker-dialog.css')),
        self.ezBuildInjector(self.ezInjectCss, self.ezpCss('common/ezclocker-editors.css')),
        self.ezBuildInjector(self.ezInjectCss, self.ezpCss('common/ezclocker-page-layout.css'))
    ]);
};

/**
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezInjectUxBase = function() {
    let self = window.ezClockerLoader;
    return self.ezInject([
        self.ezBuildInjector(self.ezInjectJs, self.ezpJs('common/ezui.js')),
        self.ezBuildInjector(self.ezInjectJs, self.ezp('webcomponents/spinner/EzSpinner.js')),
        self.ezBuildInjector(self.ezInjectLegacyUxBase)
    ]);
};

/**
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezInjectLegacyUxBase = function() {
    let self = window.ezClockerLoader;
    return self.ezInject([
        self.ezBuildInjector(self.ezInjectJs, self.ezpJs('common/ezclocker-html-helper.js')),
        self.ezBuildInjector(self.ezInjectJs, self.ezpJs('common/ezclocker-dialog-helper.js')),
        self.ezBuildInjector(self.ezInjectJs, self.ezpJs('common/ez-injector.js')),
        self.ezBuildInjector(self.ezInjectJs, self.ezpJs('common/ezclocker-debug.js'))
    ]);
};

/**
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezInjectServices = function() {
    let self = window.ezClockerLoader;
    return self.ezInject([
        self.ezBuildInjector(self.ezInjectJs, self.ezpJs('services/ezclocker-services-helper.js')),
        self.ezBuildInjector(self.ezInjectJs, self.ezpJs('services/ezclocker-account-services.js')),
        //self.ezBuildInjector(self.ezInjectJs, self.ezpJs('services/ezclocker-authentication-services.js')),
        self.ezBuildInjector(self.ezInjectJs, self.ezpJs('services/ezclocker-options.js')),
        //self.ezBuildInjector(self.ezInjectJs, self.ezpJs('services/ezclocker-employee.js')),
    ]);
};

/**
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezInjectSecureServices = function() {
    let self = window.ezClockerLoader;
    return self.ezInject([
        self.ezBuildInjector(self.ezInjectJs, self.ezsJs('services/ezclocker-time-entry-service.js')),
        self.ezBuildInjector(self.ezInjectJs, self.ezsJs('services/ezclocker-schedule-service.js'))
    ]);
};

/**
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezInjectAnalytics = function() {
    let self = window.ezClockerLoader;
    return self.ezInject([
        self.ezBuildInjector(self.ezInjectJs, self.ezpJs('common/ezclocker-google-analytics.js')),
        self.ezBuildInjector(self.ezInjectJs, self.ezp('webcomponents/marketing/google-remarketing.js'))
    ]);
};

/**
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezInjectAffiliate = function() {
    let self = window.ezClockerLoader;
    return self.ezInject([
        self.ezBuildInjector(self.ezInjectJs, self.ezFromRoot(
            'public/webcomponents/affiliate/ez-affiliate.js'))
    ]);
};

/**
    @public
    Pre-prend the root url to the provided url and returns.
    @param { string } url
    @returns { string }
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezFromRoot = function(url) {
    return window.ezClockerLoader.ezRootUrl() + url;
};

/**
    @public
    public url builder
    @param { string } url
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezp = function(url) {
    return window.ezClockerLoader.ezRootUrl() + 'public/' + url;
};

/**
    @public
    public image url builder
    @param { string } url
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezpImg = function(url) {
    return window.ezClockerLoader.ezRootUrl() + 'public/images/' + url;
};

/**
    @public
    Public javascript url builder
    @param { string } url
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezpJs = function(url) {
    return window.ezClockerLoader.ezRootUrl() + 'public/javascript/' + url;
};

/**
    @public
    Public css url builder
    @param { string } url
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezpCss = function(url) {
    return window.ezClockerLoader.ezRootUrl() + 'public/styles/' + url;
};

/**
    @public
    Mobile public url builder
    @param { string } url
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezm = function(url) {
    return window.ezClockerLoader.ezRootUrl() + 'mobile/' + url;
};

/**
    @public
    Mobile public url builder
    @param { string } url
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezm$ = function(url) {
    return window.ezClockerLoader.ezRootUrl() + 'mobile/jquery-mobile/' + url;
};

/**
    @public
    Mobile public url builder
    @param { string } url
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezmp = function(url) {
    return window.ezClockerLoader.ezRootUrl() + 'mobile/public/' + url;
};

/**
    @public
    Mobile public image url builder
    @param { string } url
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezmpImg = function(url) {
    return window.ezClockerLoader.ezRootUrl() + 'mobile/public/images/' + url;
};

/**
    @public
    Mobile public styles url builder
    @param { string } url
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezmpCss = function(url) {
    return window.ezClockerLoader.ezRootUrl() + 'mobile/public/styles/' + url;
};

/**
    @public
    Mobile public javascript url build
    @param { string } url
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezmpJs = function(url) {
    return window.ezClockerLoader.ezRootUrl() + 'mobile/public/javascript/' + url;
};

/**
    @public
    Secure url builder
    @param { string } url
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezs = function(url) {
    return window.ezClockerLoader.ezRootUrl() + 'secure/' + url;
};

/**
    @public
    Secure image url builder
    @param { string } url
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezsImg = function(url) {
    return window.ezClockerLoader.ezRootUrl() + 'secure/images/' + url;
};

/**
    @public
    Secure css url builder
    @param { string } url
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezsCss = function(url) {
    return window.ezClockerLoader.ezRootUrl() + 'secure/styles/' + url;
};

/**
    @public
    Secure javascript url builder
    @param { string } url
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezsJs = function(url) {
    return window.ezClockerLoader.ezRootUrl() + 'secure/javascript/' + url;
};

/**
    @public
    Mobile secure url builder
    @param { string } url
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezms = function(url) {
    return window.ezClockerLoader.ezRootUrl() + 'mobile/secure/' + url;
};

/**
    @public
    Mobile secure image url builder
    @param { string } url
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezms = function(url) {
    return window.ezClockerLoader.ezRootUrl() + 'mobile/secure/images/' + url;
};

/**
    @public
    Mobile secure css url builder
    @param { string } url
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezmsCss = function(url) {
    return window.ezClockerLoader.ezRootUrl() + 'mobile/secure/styles/' + url;
};

/**
    @public
    Mobile secure javascript url builder
    @param { string } url
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezmsJs = function(url) {
    return window.ezClockerLoader.ezRootUrl() + 'mobile/secure/javascript/' + url;
};

/**
    @public
    bower components url builder
    @param { string } url
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezBc = function(url) {
    return window.ezClockerLoader.ezRootUrl() + 'bower_components/' + url;
};

/**
    @public
    Node modules url builder
    @param { string } url
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezNm = function(url) {
    return window.ezClockerLoader.ezRootUrl() + 'node_modules/' + url;
};

/**
    @public
    Obtains the root url from the browser
    @returns { string }
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezRootUrl = function() {
    if (null !== window.ezClockerLoader.rootUrl) {
        return window.ezClockerLoader.rootUrl;
    }
    let a = document.createElement('a');
    a.href = window.location.href;
    window.ezClockerLoader.rootUrl = a.pathname.indexOf('/ezclocker/') === 0 ?
        a.protocol + '//' + a.host + '/ezclocker/' :
        a.protocol + '//' + a.host + '/';
    return window.ezClockerLoader.rootUrl;
};

/**
    Injects all the callorder items in order
    @param { array } callOrders
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezInject = function(callOrders) {
    return new Promise(function(resolve) {
        let i = 0;
        let callNext = function() {
            let execute = callOrders[i];
            i++;
            if (i < callOrders.length) {
                if (null === execute) {
                    window.console.warn('Encountered null injector at index ' + i + '.');
                    return callNext();
                }
                if (null === execute.call) {
                    window.console.error('Encountered injector with null call at index ' + i +
                        '. Injector: ' + JSON.stringify(execute, null, 3));
                    return callNext();
                }
                if (typeof execute.call !== 'function') {
                    window.console.error('Injector call value is not a function at index ' + i +
                        '. Inject: ' +
                        JSON.stringify(execute, null, 3));
                    return callNext();
                }
                return execute['call'].apply(this, execute['with']).then(callNext);
            }
            return execute['call'].apply(this, execute['with']).then(resolve);
        };
        return callNext();
    });
};

/**
    Applies the file revsion to the url (if enabled)
    @param {string} url
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezApplyFileRevision = function(url) {
    if (null === url || undefined === url || url.length === 0) {
        return url; // no url to file rev
    }
    if (!window.ezClockerLoader.enableFileRevision || null === window.ezClockerLoader.revisionVersion ||
        undefined == window.ezClockerLoader.revisionVersion || window.ezClockerLoader.revisionVersion.length === 0) {
        return url; // no file revision
    }
    return url.includes('?') ?
        url + '&v=' + this.revisionVersion :
        url + '?v=' + this.revisionVersion;
};

/**
    @public
    Imports CSS files
    @param { string } url
    @param { string | null } id
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezInjectCss = function(url) {
    return new Promise(function(resolve) {
        $import('[:css] ' + window.ezClockerLoader.ezApplyFileRevision(url), function(files) {
            window.console.debug('[EzClockerLoader]:[Injected CSS]:' + JSON.stringify(files));
            return resolve();
        });
    });
};

/**
    @public
    Imports JS files
    @param { string } url
    @param { string | null } id
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezInjectJs = function(url) {
    return new Promise(function(resolve) {
        $import('[:js] ' + window.ezClockerLoader.ezApplyFileRevision(url), function(files) {
            window.console.debug('[EzClockerLoader]:[Injected JS]:' + JSON.stringify(files));
            return resolve();
        });
    });
};

/**
    @public
    Forces jQuery mobile to re-evaluate the page and update the elements.
    @deprecated
    REMOVE ALL USE, will delete in a future release.
 */
EzClockerLoader.prototype.ezRefreshJqueryMobile = function() {
    if (!$) {
        window.console.error('[EzClockerLoader]:[ezRefreshJqueryMobile]: jQuery is not yet available for the page.');
        return;
    }
    if (!$.mobile) {
        window.console.error(
            '[EzClockerLoader]:[ezRefreshJqueryMobile]: jQuery Mobile is not yet available for the page.');
        return;
    }
    jQuery.mobile.changePage(window.location.href, {
        allowSamePageTransition: true,
        transition: 'none',
        reloadPage: true
    });
};

window.ezClockerLoader = new EzClockerLoader();
window.ezClockerLoader.ezInit();
window.console.debug('** ezClockerLoader is now ready **');

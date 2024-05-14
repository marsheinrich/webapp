/* exported EzDeps */

function EzDeps() {
    this.ready = false;
    this.documentHead = $('head');
    this.constants = {
        DEFAULT_TIMEOUT_INTERVAL: 10,
        IMPORT_JSON_TEMPLATE: {
            performInit: true,
            webUi: true,
            mobileUi: false,
            elinks: [], // external css
            escripts: [], // external js

            links: [], // internal css (from root /)
            scripts: [], // internal js (from root /)

            mplinks: [], // internal mobile public css (from /mobile/public/styles/ )
            mpscripts: [], // internal mobile public js (from /mobile/public/javascript/ )
            mpwcscripts: [], // internal mobile public web components js (from /mobile/secure/javascript/webcomponents/ )

            mslink: [], // internal mobile secure css (from /mobile/secure/styles/ )
            msscripts: [], // internal mobile secure js (from /mobile/secure/javascript/ )
            mswcscripts: [], // internal mobile secure web components js (from /mobile/secure/javascript/webcomponents/ )

            plinks: [], // internal public css (from /public/styles/ )
            pscripts: [], // internal public js (from /public/javascript/ )
            pwcscripts: [], // internal public web components js (from /public/javascript/webcomponents/ )

            slinks: [], // internal mobile secure css (from /secure/styles/ )
            sscripts: [], // internal mobile secure js (from /secure/javascript/ )
            swcscripts: [] // internal mobile secure web components js (from /secure/javascript/webcomponents/ )
        }
    };

    this.defaultCss = this.createImportJsonDataObject(false, false);
    this.defaultCss.plinks = [
        'common/ezclocker-base2015.css', 'common/ezclocker-page-layout.css', 'common/ezclocker-spinner.css',
        'common/ezclocker-buttons.css',
        'common/ezclocker-dialog.css', 'common/ezclocker-editors.css'
    ];
    this.defaultCss.elinks = [
        '//fonts.googleapis.com/css?family=Roboto:400,300,500,700,900,900italic,700italic,500italic,400italic,300italic,100,100italic'
    ];

    this.defaultJs = this.createImportJsonDataObject(false, false);
    this.defaultJs.pscripts = [
        'jquery/detectmobilebrowser.js',
        'common/ezclocker-url-helper2.js',
        'common/ezclocker-mobile-helper.js',
        'common/ezclocker-iefix.js',
        'common/ezclocker-validators.js',
        'common/ezclocker-validation-helper.js',
        'common/ezclocker-http-helper.js',
        'common/ezclocker-spinner.js',
        'common/ezclocker-dialog.js',
        'common/ezclocker-navigation-helper.js',
    ];
    this.defaultJs.scripts = [
        'bower_components/moment/min/moment-with-locales.min.js',
        'public/javascript/services/ezclocker-services-helper.js',
        'public/javascript/services/ezclocker-account-services.js',
        'public/javascript/services/ezclocker-authentication-services.js',
        'public/javascript/common/ezclocker-debug.js',
        'public/javascript/timezone-js-0.4.6/date.js',
        'public/javascript/thirdparty/jstz-1.0.4.min.js',
        'public/javascript/common/ezclocker-google-analytics.js',
        'bower_components/moment-timezone/builds/moment-timezone-with-data.min.js'
    ];
}

/**
 * Initializes the document with the import defaults
 */
EzDeps.prototype.ezInit = function() {
    if (this.isReady) {
        ezApi.p.logger.warn('ezDeps is already initialized.');
        return;
    }

    this.jsonImport(this.defaultCss);
    this.jsonImport(this.defaultJs);
    this.isReady = true;
};

/**
 * Imports the passed css file into the document
 * @param {string} cssFile
 */
EzDeps.prototype.ezImportCss = function(cssFile) {
    var _this = this;
    return new Promise(function(resolve) {
        if (!cssFile) {
            return resolve();
        }

        ezApi.p.logger.debug('ezDeps importing: [' + cssFile + ']');
        var ele = document.createElement('link');
        ele.href = cssFile;
        ele.rel = 'stylesheet';
        ele.type = 'text/css';

        if (ele.readyState) { //IE
            ele.onreadystatechange = function() {
                if (ele.readyState === 'loaded' || ele.readyState === 'complete') {
                    ele.onreadystatechange = null;
                    resolve();
                }
            };
        } else { //Others
            ele.onload = function() {
                ele.readyState = 'loaded';
                resolve();
            };
        }
        _this.documentHead.appendChild(ele);
    });
};

/**
 * Imports the passed javascript file into the document
 * @param {string} jsFile
 */
EzDeps.prototype.ezImportJs = function(jsFile) {
    var _this = this;
    return new Promise(function(resolve) {
        if (ezApi.isNotValid(jsFile)) {
            return resolve();
        }

        ezApi.p.logger.debug('EzDeps: [injecting ' + jsFile + ']');
        var ele = document.createElement('script');
        ele.src = jsFile;

        if (ele.readyState) { //IE
            ele.onreadystatechange = function() {
                if (ele.readyState === 'loaded' || ele.readyState === 'complete') {
                    ele.onreadystatechange = null;
                    ezApi.p.logger.debug('EzDeps: [injected ' + jsFile + ']');
                    resolve();
                }
            };
        } else { //Others
            ele.onload = function() {
                ele.readyState = 'loaded';
                ezApi.p.logger.debug('EzDeps: [injected ' + jsFile + ']');
                resolve();
            };
        }
        _this.documentHead.appendChild(ele);
    });
};

/**
 * Injects the css links into the document
 * @param {array} cssFiles
 */
EzDeps.prototype.ezCss = function(cssFiles) {
    if (!ezApi.isArray(cssFiles) || cssFiles.length === 0) {
        return;
    }

    var _this = this;
    var elinksCount = 0;

    ezApi.p.logger.debug('EzDeps: [starting injection of ' + cssFiles.length + ' css files]');

    _this.cssInterval = setInterval(function() {
        var cssFile = cssFiles[elinksCount];
        elinksCount++;
        _this.importCss(cssFile).then(function() {
            if (elinksCount === cssFiles.length) {
                window.clearInterval(_this.cssInterval);
                _this.elinksInterval = null;
                ezApi.p.logger.debug('EzDeps: [completed injection of ' + cssFiles.length +
                    ' css files]');
            }
        });
        ezApi.p.logger.debug('EzDeps: [waiting for injection of ' + cssFile + ']');
    }, _this.constants.DEFAULT_TIMEOUT_INTERVAL);
};

/**
 * Injects the provied js files into the document
 * @param {array} jsFiles
 */
EzDeps.prototype.ezJs = function(jsFiles) {
    if (!ezApi.isArray(jsFiles) || jsFiles.length === 0) {
        return;
    }

    var _this = this;
    var scriptCount = 0;
    ezApi.p.logger.debug('EzDeps: [starting injection of ' + jsFiles.length + ' js files]');

    _this.scriptInterval = setInterval(function() {
        var jsFile = jsFiles[scriptCount];
        _this.ezImportJs(scriptCount, jsFile).then(function() {
            if (scriptCount === jsFiles.length - 1) {
                clearInterval(_this.scriptInterval);
                ezApi.p.logger.debug('EzDeps: [completed injection of ' + jsFiles.length +
                    ' js files]');
            }
        });
        ezApi.p.logger.debug('EzDeps: [waiting for injection of ' + jsFile + ']');
    }, _this.DEFAULT_TIMEOUT_INTERVAL);
};

/**
 * Creates the ezJson import object, flagging to perform the initialization, and if the
 * target document is mobile or not.
 * @param {boolean} performInit
 * @param {boolean} mobile
 */
EzDeps.prototype.createImportJsonDataObject = function(performInit, mobile) {
    var result = JSON.parse(JSON.stringify(this.constants.IMPORT_JSON_TEMPLATE));
    result.performInit = ezApi.assignOrDefault(performInit, false);
    result.mobile = ezApi.assignOrDefault(mobile, false);
    return result;
};

/**
 * import dependencies using the json dependency definition
 */
EzDeps.prototype.jsonImport = function(ezImportJson) {
    if (ezApi.isNotValid(ezImportJson)) {
        return;
    }
    if (ezImportJson.performInit) {
        this.ezInit();
    }

    this.ezCss(ezImportJson.elinks);
    this.ezCss(ezImportJson.plinks);
    this.ezCss(ezImportJson.mplinks);
    this.ezCss(ezImportJson.slinks);
    this.ezCss(ezImportJson.mslinks);
    this.ezCss(ezImportJson.links);
    this.ezJs(ezImportJson.escripts);
    this.ezJs(ezImportJson.pscripts);
    this.ezJs(ezImportJson.mpscripts);
    this.ezJs(ezImportJson.sscripts);
    this.ezJs(ezImportJson.msscripts);
    this.ezJs(ezImportJson.scripts);
    this.ezJs(ezImportJson.pwcscripts);
    this.ezJs(ezImportJson.swcscripts);
};

document.addEventListener('onEzApiReady', function() {
    if (typeof ezApi !== 'undefined' && ezApi) {
        ezApi.p['ezDeps'] = new EzDeps();
    } else {
        window.console.error('EzDeps requires ezApi.');
    }
});
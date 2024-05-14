/*==============================*/
/**** DEPRECATED: DO NOT USE ****/
/* Use ez-cookies.js instead    */
/*==============================*/

// @deprecated Non-functional, immediatly switch to: ezApi.ezCookies from ez-cookies.js

/* exported EZ_COOKIE_DATE_TIME_FORMAT */
/**
 * @public
 * Thu, 01 Jan 1970 00: 00: 00 UTC
 */
// @deprecated Non-functional, immediatly stop using
var EZ_COOKIE_DATE_TIME_FORMAT = 'ddd, DD MMM YYYY hh:mm:ss UTC';

/* exported EzCookie */
/**
 * @deprecated Non-functional, immediatly switch to: ezApi.ezCookies from ez-cookies.js
 * @public
 * Represents a cookie
 * @param {string} rawValue
 * @param {string} name
 * @param {string|null} value
 * @returns {EzCookie}
 */
function EzCookie(rawValue, name, value, expireMoment, expireStr, path) {
    this.rawValue = rawValue;
    this.name = name;
    if (ezApi.isValid(expireMoment)) {
        this.expireMoment = expireMoment;
        this.expires = ezApi.p.ezDateTime.ezCreateFromMoment(expireMoment).tz('UTC').format(EZ_COOKIE_DATE_TIME_FORMAT);
    } else {
        this.expireMoment = null;
        this.expires = ezApi.isNotEmptyString(expireStr) ? expireStr : '';
    }
    this.path = ezApi.isEmptyString(path) ? '/' : path;
    this.value = ezApi.isNotEmptyString(value) && value !== 'null' && value !== 'undefined' ?
        value :
        '';
    return this;
}

/* exported EzCookieHelper */
/**
 * @deprecated Non-functional, immediatly switch to: ezApi.ezCookies from ez-cookies.js
 * @public
 * Helper to read/write/clear cookies Additional Dependencies
 * public/javascript/common/ezclocoker-validators.js
 * @returns {EzCookieHelper}
 */
function EzCookieHelper() {
    this.ready = false;
    this.cookieCache = null;
    this.cookieMap = null;
    this.USER_NAME_COOKIE_NAME = 'ezclocker-username';
    return this;
}

/**
 * @deprecated Non-functional, immediatly switch to: ezApi.ezCookies from ez-cookies.js
 * @protected
 * Initializes EzCookieHelper
 * @returns {EzCookieHelper}
 */
EzCookieHelper.prototype.ezInit = function() {
    var self = ezApi.p.ezCookieHelper;
    self.ezMapCookies();
    self.ready = true;
    return self;
};

/**
 * @deprecated Non-functional, immediatly switch to: ezApi.ezCookies from ez-cookies.js
 * @private
 */
EzCookieHelper.prototype.ezMapCookies = function() {
    var self = ezApi.p.ezCookieHelper;
    self.cookieCache = document.cookie.split(';');
    self.cookieMap = new Map();
    var cookieCount = self.cookieCache.length;
    for (var i = 0; i < cookieCount; i++) {
        var cookie = self.cookieCache[i].trim();
        var keyValue = cookie.split('=');
        if (keyValue.length === 2) {
            self.cookieMap.set(keyValue[0], new EzCookie(cookie, keyValue[0], keyValue[1]));
        } else {
            self.cookieMap.set(keyValue[0], new EzCookie(cookie, keyValue[0], ''));
        }
    }
};

/**
 * @deprecated Non-functional, immediatly switch to: ezApi.ezCookies from ez-cookies.js
 * @public
 * Returns the cookie associated with the provided name
 * @param {string} name
 */
EzCookieHelper.prototype.ezReadCookie = function(name) {
    var self = ezApi.p.ezCookieHelper;
    return self.cookieMap.has(name) ?
        self.cookieMap.get(name) :
        new EzCookie(name + '=', name, '');
};

/**
 * @deprecated Non-functional, immediatly switch to: ezApi.ezCookies from ez-cookies.js
 * @public
 * @param {string} cookieName
 */
EzCookieHelper.prototype.getCookie = function(name) {
    return ezApi.p.ezCookieHelper.ezReadCookie(name);
};

/**
 * @deprecated Non-functional, immediatly switch to: ezApi.ezCookies from ez-cookies.js
 * @public
 * Saves the provided username in the ezclocker-username cookie
 * Expires in 30 days
 * @param {string} userName
 */
EzCookieHelper.prototype.ezSaveUserNameCookie = function(userName) {
    var self = ezApi.p.ezCookieHelper;
    if (ezApi.isEmptyString(userName)) {
        self.clearCookie(self.USER_NAME_COOKIE_NAME);
        return;
    }
    self.ezWriteExpireCookie(self.USER_NAME_COOKIE_NAME, userName, ezApi.p.ezDateTime.ezNow().add(30, 'days'));
};

/**
 * @deprecated Non-functional, immediatly switch to: ezApi.ezCookies from ez-cookies.js
 * @public
 * @param {string} userName
 */
EzCookieHelper.prototype.setEzClockerUserNameCookie = function(userName) {
    return ezApi.p.ezCookieHelper.ezSaveUserNameCookie(userName);
};

/**
 * @deprecated Non-functional, immediatly switch to: ezApi.ezCookies from ez-cookies.js
 * @public
 * Reads the username cookie for ezclocker
 */
EzCookieHelper.prototype.ezReadUserName = function() {
    var self = ezApi.p.ezCookieHelper;
    return self.ezReadCookie(self.USER_NAME_COOKIE_NAME);
};

/**
 * @deprecated Use ezApi.p.ezCookieHelper.ezReadUserName()
 */
EzCookieHelper.prototype.getEzClockerUserNameCookie = function() {
    return ezApi.p.ezCookieHelper.ezReadUserName();
};

/**
 * @deprecated Non-functional, immediatly switch to: ezApi.ezCookies from ez-cookies.js
 * @public
 * Writes a cookie
 * @param {string} cookieName
 * @param {string|null} cookieValue
 * @param {string} path
 */
EzCookieHelper.prototype.ezWriteCookie = function(cookieName, cookieValue, path) {
    var self = ezApi.p.ezCookieHelper;
    var newCookie = self.ezBuildCookie(cookieName, cookieValue, moment().add(30, 'days'), path);
    self.cookieMap.set(cookieName, newCookie);
    document.cookie = newCookie.rawCookie;
};

/**
 * @deprecated Non-functional, immediatly switch to: ezApi.ezCookies from ez-cookies.js
 */
EzCookieHelper.prototype.setCookie = function(cookieName, cookieValue, path) {
    return ezApi.p.ezCookieHelper.ezWriteCookie(cookieName, cookieValue, path);
};

/**
 * @deprecated Non-functional, immediatly switch to: ezApi.ezCookies from ez-cookies.js
 * @public
 * Writes a cookie that will expire
 * @param {string} cookieName
 * @param {string} cookieValue
 * @param {moment} expireMoment
 * @param {string|null} path
 */
EzCookieHelper.prototype.ezWriteExpireCookie = function(cookieName, cookieValue, expireMoment, path) {
    var self = ezApi.p.ezCookieHelper;
    if (ezApi.isNotValid(expireMoment)) {
        self.ezWriteCookie(cookieName, cookieValue, path);
        return;
    }

    var newCookie = self.ezBuildCookie(cookieName, cookieValue, expireMoment, path);
    self.cookieMap.set(cookieName, newCookie);
    document.cookie = newCookie.rawValue;
};

/**
 * @deprecated Non-functional, immediatly switch to: ezApi.ezCookies from ez-cookies.js
 * @deprecated Use ezApi.p.ezCookieHelper.ezWriteExpireCookie
 */
EzCookieHelper.prototype.setExpireCookie = function(cookieName, cookieValue, expireMoment, path) {
    ezApi.p.ezCookieHelper.ezWriteExpireCookie(cookieName, cookieValue, expireMoment, path);
};

/**
 * @deprecated Non-functional, immediatly switch to: ezApi.ezCookies from ez-cookies.js
 * @private
 * Original: buildCookie
 * @param {string} cookieName
 * @param {string} cookieValue
 * @param {moment|null} expireDateStr
 * @param {string|null} path
 * @returns {EzCookie}
 */
EzCookieHelper.prototype.ezBuildCookie = function(cookieName, cookieValue, expireMoment, path) {
    var rawCookie = cookieName + '=' + cookieValue + ';'; //+ self.ezGetCurrentDomain();
    if (ezApi.isValid(expireMoment)) {
        var expireDate = expireMoment.toDate().toGMTString();
        rawCookie += ' expires=' + expireDate + ';';
    }
    if (ezApi.isEmptyString(path)) {
        var a = document.createElement('a');
        a.href = window.location.href;
        path = a.pathname.indexOf('/ezclocker/') === 0 ? '/ezclocker' : '/';
    }
    rawCookie += ' path=' + path + ';';
    return new EzCookie(rawCookie, cookieName, cookieValue, expireMoment, null, path);
};

/**
 * @deprecated Non-functional, immediatly switch to: ezApi.ezCookies from ez-cookies.js
 * @public
 * Sets the cookies expire date to Thu, 01 Jan 1970 00:00:00 UTC and the value to nothing
 * @param {string} cookieName
 */
EzCookieHelper.prototype.ezDeleteCookie = function(cookieName) {
    var self = ezApi.p.ezCookieHelper;
    if (self.cookieMap.has(cookieName)) {
        var cookie = self.cookieMap.get(cookieName);
        cookie.rawCookie = cookie.name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=' + cookie.path;
        document.cookie = cookie.rawCookie;
        self.cookieMap.delete(cookieName);
    }
};

/**
 * @deprecated Non-functional, immediatly switch to: ezApi.ezCookies from ez-cookies.js
 * @deprecated Use ezApi.p.ezCookieHelper.ezDeleteCookie
 */
EzCookieHelper.prototype.clearCookie = function(cookieName) {
    return ezApi.p.ezCookieHelper.ezDeleteCookie(cookieName);
};

/**
 * @deprecated Non-functional, immediatly switch to: ezApi.ezCookies from ez-cookies.js
 * @private
 */
EzCookieHelper.prototype.ezGetCurrentDomain = function() {
    var a = document.createElement('a');
    a.href = window.location.href;
    var hostName = a.hostname;
    if (a.pathname.indexOf('/ezclocker/') === 0) {
        hostName += '/ezclocker'; // local development
    }
    var proto = a.protocol;
    return proto.toLowerCase().indexOf('https') === 0 ?
        ' domain=' + hostName + '; secure' :
        ' domain=' + hostName;
};

/**
 * ezApi registration
 */
document.addEventListener('onEzApiReady', function() {
    if (typeof ezApi === 'undefined' || !ezApi) {
        window.console.error('ezApi is required by ezclocker-cookies.js module.');
        return;
    }
    ezApi.ezRegisterPublic('ezCookieHelper', new EzCookieHelper());
    ezApi.p.ezCookieHelper.ezInit();
    // Legacy access
    ezApi.ezRegisterWindow('ezCookieHelper', ezApi.p.ezCookieHelper);
    ezApi.p.logger.debug('Initialized ezCookieHelper');
});
if (!window.window.location.origin) {
    window.window.location.origin = window.location.protocol +
  '//' +
  window.location.hostname +
  (window.location.port ? ':' + window.location.port : '');
}

// TODO: Transition to ezclocker-navigation-helper.js
window.console.debug('DEPRECATED: Transition ezclocker-navigation.js usage to ezclocker-navigation-helper.js');

var PUBLIC_BASE_PATH = '/public';
var PUBLIC_IMAGES_BASE_PATH = PUBLIC_BASE_PATH + '/images';
var SECURE_BASE_PATH = '/secure';
var MOBILE_BASE_PATH = '/mobile';
var MOBILE_PUBLIC_BASE_PATH = MOBILE_BASE_PATH + '/public';
var MOBILE_SECURE_BASE_PATH = MOBILE_BASE_PATH + '/secure';
var MOBILE_PUBLIC_IMAGES_BASE_PATH = MOBILE_PUBLIC_BASE_PATH + '/images';

var DEFAULT_SERVICE_VERSION_URI = 'v1';
var PUBLIC_API_URI = 'api';
var INTERNAL_API_URI = '_api';

function navigateTo(url) {
    window.location = url;
}

function navigateToMain() {
    var newUrl = getBaseUrl() + '/';
    navigateTo(newUrl);
}

function navigateToEmployerDashboard() {
    navigateToSecurePage('employerDashboard.html');
}

function navigateToEmployerSchedules(employerId) {
    navigateToSecurePage('schedule.html?employer=' + employerId);
}

function navigateToEmployeeArchive(employerId) {
    navigateToSecurePage('archive.html?employer=' + employerId);
}

function getPublicImage(imageName) {
    var imgUrl = getBaseUrl() + PUBLIC_IMAGES_BASE_PATH + '/' + imageName;
    return imgUrl;
}

function getMobilePublicImage(imgName) {
    var baseUrl = getBaseUrl();
    var imgUrl = baseUrl + MOBILE_PUBLIC_IMAGES_BASE_PATH + '/' + imgName;
    return imgUrl;
}

function getPublicClassicServiceUrl(serviceName) {
    var newUrl = getServiceUrl(serviceName);
    return newUrl;
}

function getInternalClassicServiceUrl(serviceName) {
    var newUrl = getServiceUrl('_' + serviceName);
    return newUrl;
}

function getInternalApiServiceUrl(serviceName, version) {
    if (isBadReference(version)) {
        version = DEFAULT_SERVICE_VERSION_URI;
    }
    var newUrl = getServiceUrl(INTERNAL_API_URI + '/' + version + '/' + serviceName);
    return newUrl;
}

function getPublicApiServiceUrl(serviceName, version) {
    if (isBadReference(version)) {
        version = DEFAULT_SERVICE_VERSION_URI;
    }
    var newUrl = getServiceUrl(PUBLIC_API_URI + '/' + version + '/' + serviceName);
    return newUrl;
}

function getServiceUrl(servicePath) {
    var newUrl = getBaseUrl() + '/' + servicePath;
    return newUrl;
}

function getAdminServiceUrl(version) {
    var url = getBaseUrl() + '/' + version + '/admin';
    return url;
}

var SIGN_IN_ROOT_URL = '/resources/j_spring_security_check?remember-me=true';

function getSignInUrl() {
    var signInUrl = getBaseUrl() + SIGN_IN_ROOT_URL;
    return signInUrl;
}

function signIn() {
    navigateToSignIn();
}

var SIGN_IN_PAGE_URL = '/public/signin.html';

function getSignInPageUrl() {
    var signInPageUrl = getBaseUrl() + SIGN_IN_PAGE_URL;
    return signInPageUrl;
}

function navigateToSignIn(errorMessage) {
    ezGet(
        getLogoutUrl(),
        function() {
            if (isBadReference(errorMessage)) {
                navigateTo(getSignInPageUrl());
                return;
            }
            navigateTo(getSignInPageUrl() + '?error=' + errorMessage);
        },
        function() {
            if (isBadReference(errorMessage)) {
                navigateTo(getSignInPageUrl());
                return;
            }
            navigateTo(getSignInPageUrl() + '?error=' + errorMessage);
        }
    );
}

var SIGN_OUT_URL = '/resources/j_spring_security_logout';

function getLogoutUrl() {
    var logoutUrl = getBaseUrl() + SIGN_OUT_URL;
    return logoutUrl;
}

function signOut() {
    ezGet(
        getLogoutUrl(),
        function() {
            navigateToSignIn();
        },
        function() {
            navigateToSignIn();
        }
    );
}

var SIGN_UP_URL = '/public/signup.html';

function getSignUpPageUrl() {
    var signUpUrl = getBaseUrl() + SIGN_UP_URL;
    return signUpUrl;
}

function navigateToSignUp() {
    navigateTo(getSignUpPageUrl());
}

function navigateToService(servicePath) {
    var baseUrl = getBaseUrl();
    var newUrl = baseUrl + '/' + servicePath;
    navigateTo(newUrl);
}

function navigateToPublicPage(pageName) {
    var baseUrl = getBaseUrl();
    var newUrl = baseUrl + PUBLIC_BASE_PATH + '/' + pageName;
    navigateTo(newUrl);
}

function navigateToSecurePage(pageName) {
    var baseUrl = getBaseUrl();
    var newUrl = baseUrl + SECURE_BASE_PATH + '/' + pageName;
    navigateTo(newUrl);
}

function navigateToPublicMobilePage(pageName) {
    var baseUrl = getBaseUrl();
    var newUrl = baseUrl + MOBILE_PUBLIC_BASE_PATH + '/' + pageName;
    navigateTo(newUrl);
}

function navigateToSecureMobilePage(pageName) {
    var baseUrl = getBaseUrl();
    var newUrl = baseUrl + MOBILE_SECURE_BASE_PATH + '/' + pageName;
    navigateTo(newUrl);
}

function navagate(url) {
    naviagateTo(url);
}

function navigateNewTab(url) {
    window.open(url, '_new');
}

var IPHONE_PERSONAL_APPSTORE_URL = '//itunes.apple.com/us/app/ezclocker-personal-time-tracking/id833047956?ls=1&mt=8';

function getPersonalAppleStoreLink() {
    return IPHONE_PERSONAL_APPSTORE_URL;
}

function toPersonalAppleStore() {
    navigateTo(getPersonalAppleStoreLink());
    return true;
}

var ANDRIOD_BUSINESS_APPSTORE_URL = '//play.google.com/store/apps/details?id=com.ezclocker';

function getBusinessAndriodStoreLink() {
    return ANDRIOD_BUSINESS_APPSTORE_URL;
}

function toBusinessAndriodStore() {
    navigateTo(getBusinessAndriodStoreLink());
    return true;
}

var IPHONE_BUSINESS_APPSTORE_URL = '//itunes.apple.com/us/app/ezclocker/id800807197?ls=1&mt=8';

function getBusinessAppleStoreLink() {
    return IPHONE_BUSINESS_APPSTORE_URL;
}

function toBusinessAppleStore(event) {
    navigateTo(getBusinessAppleStoreLink());
    return true;
}

var NATIVE_APP_SIGNIN_URL = 'ezlogin://signin';

function launchPhoneAppAndSignIn(email, password) {
    try {
        navigateTo(NATIVE_APP_SIGNIN_URL + '?email=' + email + '&password=' + password);
    } catch (err) {
        ezLogger.warn('Native app doesn\'t appear to be available. Sending to app store instead.');
        toBusinessAppleStore();
    }
}

function getBaseUrl() {
    var baseUrl = window.location.origin;
    var currentPath = location.pathname;
    var pathItems = currentPath.split('/');
    if (pathItems.length >= 2) {
        if (pathItems[1].toLowerCase() == 'ezclocker') {
            baseUrl += '/' + pathItems[1];
        }
    }
    return baseUrl;
}

/**
 * Legacy array ofA all files included in the ez-core.bundle.js bundle file.
 */
let EzCore1LibraryFiles = [
    // Node files
    'core-js',
    'detect-browser',
    // EzClocker Core JS Files
    './EzClocker.js',
    './public/javascript/common/ezapi.js',
    './public/javascript/common/ezclocker-logger.js',
    //'./public/javascript/common/ez-html-char.js',
    './public/javascript/common/ez-date-time.js',
    './public/javascript/common/ez-enviornment.js',
    './public/javascript/common/ezclocker-url-helper2.js',
    './public/javascript/common/ez-cookies.js',
    //'./public/javascript/common/ezclocker-http-helper.js',
    './public/javascript/common/ezclocker-navigation-helper.js',
    // TODO: Move ez-services.js to ez-api-core.bundle.js and update HTML files
    './public/javascript/common/ez-services.js',
    './public/javascript/common/ez-validation.js',
    // Other ezClocker JS Files
    // TODO: Remove /public/javascript/common/ezclocker-dateUtils.js in a future release
    './public/javascript/common/ezclocker-dateUtils.js',
    // TODO: Remove /public/javascript/common/ez-date-helper.js in a future release
    './public/javascript/common/ez-date-helper.js',
    // TODO: Remove /public/javascript/common/ezclocker-mobile-helper.js in a future release
    './public/javascript/common/ezclocker-mobile-helper.js',
    // TODO: Remove /public/javascript/common/ez-injector.js in a future release
    './public/javascript/common/ez-injector.js',
    './public/javascript/common/ezclocker-html5-gps.js',
    // Feature toggles
    './ezlibrary/ez-feature-toggles2.js',
    './ezlibrary/EzLicenseFeatureToggle.js',
    './ezlibrary/ez-user-role-features.js'
];

/**
 * Array of ezClocker core library files included in the ez-core2.bundle.js.
 * IMPORTANT: Must make sure all JS dependencies for the HTML doc have been updated to use ez-core2.bundle.js!
 */
let EzCore2LibraryFiles = [
    // Node files
    'core-js',
    'detect-browser',
    // EzClocker Core JS Files
    './EzClocker.js',
    './public/javascript/common/ezapi.js',
    './public/javascript/common/ezclocker-logger.js',
];

module.exports = {
    EzCore1LibraryFiles: EzCore1LibraryFiles,
    EzCore2LibraryFiles: EzCore2LibraryFiles
};


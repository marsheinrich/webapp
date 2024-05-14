const path = require('path');
const ROOT_PATH = `${process.cwd()}`;
const WEBAPP_SRC_ROOT_PATH = path.resolve(`${ROOT_PATH}`);
const EZ_WEBPACK_CONFIGURATION_FILE_NAME = path.resolve(`${WEBAPP_SRC_ROOT_PATH}/webpack/ez-webpack-config.js`);
const ezWebpackConfiguration = require(EZ_WEBPACK_CONFIGURATION_FILE_NAME);

let EzLibraryFiles = [
    './ezlibrary/ezclocker.js',
    './ezlibrary/ez-getter.js',
    './ezlibrary/ez-getter-setter.js',
    './ezlibrary/ez-template-loader.js',
    './ezlibrary/ez-animator.js',
    './ezlibrary/EzStringFormatter.js'
];

let EzContextFiles = [
    './ezlibrary/EzClockerContext/ez-context.js'
];

let EzLandingViewFiles = [
    // Landing Page CSS
    //'@fortawesome/fontawesome-free',
    'bootstrap',
    'bootstrap/dist/css/bootstrap.css',
    './ezlibrary/welcome/css/ez-responsive.scss',
    './ezlibrary/welcome/css/ez-core.scss',
    './ezlibrary/welcome/css/ez-body.scss',
    './ezlibrary/welcome/css/ez-buttons.scss',
    './ezlibrary/welcome/css/ez-inputs.scss',
    './ezlibrary/welcome/css/index.scss',
    './ezlibrary/welcome/css/pricing.scss',
    './ezlibrary/welcome/css/contact.scss',
    //'./ezlibrary/welcome/css/rating.scss',
    './ezlibrary/welcome/css/float-label.css',
    //'./ezlibrary/welcome/css/theme.min.css',
    //'./ezlibrary/welcome/css/star-rating.min.css',
    './public/styles/common/ezclocker-dialog.css',
    // ezClocker JS
    './public/javascript/common/ezclocker-validators.js',
    './public/javascript/common/ezclocker-validation-helper.js',
    './public/javascript/common/ezclocker-hotkey.js',
    './public/javascript/common/ez-services.js',
    // Landing page JS
    './ezlibrary/welcome/float-label.js',
    './ezlibrary/welcome/EzWelcomeViewController.js',
    './ezlibrary/welcome/EzLandingSignupController.js',
    './ezlibrary/welcome/EzLandingPage.js',
];

let EzCustomJqueryWidgetFiles = [
    './ezlibrary/ux/EzAutoCompleteComboBox/EzAutoCompleteComboBox.js'
];

let EzDependencyManagerFiles = [
    'axios',
    './ezlibrary/EzDependencyManager.js'
];

let EzVersionCheckerFiles = [
    './ezlibrary/EzVersion.js',
    './ezlibrary/EzVersionChecker.js'
];

if (ezWebpackConfiguration.debug) {
    console.log(`ROOT_PATH=${ROOT_PATH}`);

    console.log(`WEBAPP_SRC_ROOT_PATH=${WEBAPP_SRC_ROOT_PATH}`);

    console.log(`EZ_WEBPACK_CONFIGURATION_FILE_NAME=${EZ_WEBPACK_CONFIGURATION_FILE_NAME}`);

    console.log(`ezWebpackConfiguration=${JSON.stringify(ezWebpackConfiguration, null, 3)}`);
}

/**
    Javascript object that defines the bundles the this webpack configuration will create.
 */
let EzBundleDef = {
    bundleNames: [
        'ez-core-all.bundle.js'
    ],
    bundles: {
        'library': EzLibraryFiles,
        'context': EzContextFiles,
        'landing-view': EzLandingViewFiles,
        'custom-jquery-widgets': EzCustomJqueryWidgetFiles,
        'dependency-manager': EzDependencyManagerFiles,
        'version-checker': EzVersionCheckerFiles
    }
};

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
console.log(`Creating bundle files: ${JSON.stringify(EzBundleDef.bundleNames, null, 3)} ... `);
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

module.exports = () => ezWebpackConfiguration.ezGetWebpackConfigurationWithEntries(EzBundleDef.bundles);

const path = require('path');
const ROOT_PATH = `${process.cwd()}`;
const WEBAPP_SRC_ROOT_PATH = path.resolve(`${ROOT_PATH}`);
const EZ_WEBPACK_CONFIGURATION_FILE_NAME = path.resolve(`${WEBAPP_SRC_ROOT_PATH}/webpack/ez-webpack-config.js`);
const ezWebpackConfiguration = require(EZ_WEBPACK_CONFIGURATION_FILE_NAME);

/**
    Javascript object that defines the bundles the this webpack configuration will create.
 */
let EzBundleDef = {
    bundleNames: [
        'ez-landing-sign-up.bundle.js',
        'ez-sign-up-page.bundle.js',
        'ez-employee-sign-up-page.bundle.js'
    ],
    bundles: {
        'landing-sign-up': [
            './sign-up/ez-landing-signup-controller.js'
        ],
        'sign-up-page': [
            // Legacy CSS
            './public/styles/common/ezclocker-base2015.css',
            // Core CSS
            './public/styles/common/ez-body.css',
            './public/styles/common/ez-text.css',
            './public/styles/common/ez-containers.css',
            './public/styles/common/ezclocker-page-layout.css',
            './public/styles/common/ez-buttons.css',
            './public/styles/common/ezclocker-dialog.css',
            './public/styles/common/ez-inputs.css',
            './public/styles/common/ez-layout-grid.css',
            './public/styles/common/ez-shadows.css',
            './public/styles/common/ez-header.css',
            './public/styles/common/ez-dialogs.css',
            './public/styles/common/ezclocker-spinner.css',
            './public/styles/signup/signup.css',
            // EzClocker JS
            './ezlibrary/ez-modernizr.js',
            './ezlibrary/ez-old-browser-check.js',
            './public/javascript/common/ez-services.js',
            './public/javascript/services/ezclocker-account-services.js',
            //'./public/javascript/common/ezclocker-http-helper.js',
            './public/javascript/services/ezclocker-services-helper.js',
            './public/javascript/services/ez-utmtagmap-service.js',
            './public/javascript/common/ezclocker-layout-helper.js',
            // Sign Up Page JS
            './public/javascript/signup/signUpDialog.js'
        ],
        'employee-sign-up-page': [
            './sign-up/ez-employee-signup-controller.js'
        ]
    }
};

if (ezWebpackConfiguration.debug) {
    console.log(`ROOT_PATH=${ROOT_PATH}`);
    console.log(`WEBAPP_SRC_ROOT_PATH=${WEBAPP_SRC_ROOT_PATH}`);
    console.log(`EZ_WEBPACK_CONFIGURATION_FILE_NAME=${EZ_WEBPACK_CONFIGURATION_FILE_NAME}`);
    console.log(`ezWebpackConfiguration=${JSON.stringify(ezWebpackConfiguration, null, 3)}`);
    console.log(`EzBundleDef=${JSON.stringify(EzBundleDef, null, 3)}`);
}

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
console.log(`Creating bundle files: ${JSON.stringify(EzBundleDef.bundleNames, null, 3)} ... `);
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

module.exports = () => ezWebpackConfiguration.ezGetWebpackConfigurationWithEntries(EzBundleDef.bundles);

const path = require('path');
const ROOT_PATH = `${process.cwd()}`;
const WEBAPP_SRC_ROOT_PATH = path.resolve(`${ROOT_PATH}`);
const EZ_WEBPACK_CONFIGURATION_FILE_NAME = path.resolve(`${WEBAPP_SRC_ROOT_PATH}/webpack/ez-webpack-config.js`);
const ezWebpackConfiguration = require(EZ_WEBPACK_CONFIGURATION_FILE_NAME);

/**
    Array of all files included in the ez-account-view.bundle.js bundle file.
 */
let EzAccountViewFiles = [
    // Legacy CSS (migrate all use to the new core styles (see ez-core-ui-files.js for css files)
    //'./public/styles/common/ezclocker-base2015.css',
    //'./public/styles/common/ezclocker-page-layout.css',
    //'./public/styles/common/ezclocker-editors.css',
    //'./public/styles/common/ezclocker-menu.css',
    //'./public/styles/common/ezclocker-maincontent.css',
    //'./public/webcomponents/toggle-switch/ez-toggle-switch.css',
    //'./secure/styles/tcs-secure-style.css',
    // Page CSS
    './secure/account/account.css',
    './secure/account/subscriptions.css',
    // Other
    // TODO: Migrate use of ezclocker-dateUtils.js to ez-date-time.js
    //'./public/javascript/common/ezclocker-dateUtils.js',
    // TODO: Migrate use of ez-data-obfuscator.js to ez-date-time.js
    //'./public/javascript/common/ez-data-obfuscator.js',
    // TODO: Migrate use of ez-date-helper.js to ez-date-time.js
    //'./public/javascript/common/ez-date-helper.js',
    //'./public/javascript/common/ez-format.js',
    //'./public/javascript/common/ezclocker-validators.js',
    //'./public/javascript/common/ezclocker-validation-helper.js?',
    //'./public/javascript/ezclocker-constants.js',
    // Services
    //'./public/javascript/services/ezclocker-subscriptions.js',
    // Legacy UX
    // TODO: Migrate ez-html.js use to EzHtml.js helper
    //'./public/javascript/common/ez-html.js',
    //'./public/webcomponents/toggle-switch/ez-toggle-switch.js',
    // TODO: Evaluate and migrate as necessary
    //'./public/javascript/common/ezclocker-page.js',
    //'./public/javascript/common/ezclocker-ui-helper.js',
    //'./public/javascript/common/ezclocker-size-divs.js',
    // Page
    './secure/account/EzAccountViewController.js'
];

/**
    Javascript object that defines the bundles the this webpack configuration will create.
 */
let EzBundleDef = {
    bundleNames: [
        'ez-account-view.bundle.js'
    ],
    bundles: {
        'account-view': EzAccountViewFiles
    }
};

if (ezWebpackConfiguration.debug) {
    console.log(`ROOT_PATH=${ROOT_PATH}`);
    console.log(`WEBAPP_SRC_ROOT_PATH=${WEBAPP_SRC_ROOT_PATH}`);
    console.log(`EZ_WEBPACK_CONFIGURATION_FILE_NAME=${EZ_WEBPACK_CONFIGURATION_FILE_NAME}`);
    console.log(`ezWebpackConfiguration=${JSON.stringify(ezWebpackConfiguration, null, 3)}`);
    console.log(`EzAccountViewFiles=${JSON.stringify(EzAccountViewFiles, null, 3)}`);
}

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
console.log(`Creating bundle files: ${JSON.stringify(EzBundleDef.bundleNames, null, 3)} ... `);
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

module.exports = () => ezWebpackConfiguration.ezGetWebpackConfigurationWithEntries(EzBundleDef.bundles);

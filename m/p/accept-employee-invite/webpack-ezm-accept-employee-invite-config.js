const path = require('path');

// Set Constants
const ROOT_PATH = `${process.cwd()}`;
console.log(`ROOT_PATH=${ROOT_PATH}`);

const WEBAPP_SRC_ROOT_PATH = path.resolve(`${ROOT_PATH}`);
console.log(`WEBAPP_SRC_ROOT_PATH=${WEBAPP_SRC_ROOT_PATH}`);

const EZ_WEBPACK_CONFIGURATION_FILE_NAME = path.resolve(`${WEBAPP_SRC_ROOT_PATH}/webpack/ez-webpack-config.js`);
console.log(`EZ_WEBPACK_CONFIGURATION_FILE_NAME=${EZ_WEBPACK_CONFIGURATION_FILE_NAME}`);

const ezWebpackConfiguration = require(EZ_WEBPACK_CONFIGURATION_FILE_NAME);
console.log(`ezWebpackConfiguration=${JSON.stringify(ezWebpackConfiguration, null, 3)}`);

module.exports = () => ezWebpackConfiguration
    .ezGetWebpackConfigurationWithEntries({
    'accept-employee-invite': [
        'core-js',
        './public/javascript/common/ezclocker-iefix.js',
        './m/p/js/ezm-api.js',
        './public/javascript/common/ezclocker-logger.js',
        './ezlibrary/ez-event-engine.js',
        './public/javascript/common/ez-html-char.js',
        './public/javascript/common/ezclocker-navigation-helper.js',
        './public/javascript/common/ezclocker-url-helper2.js',
        './public/javascript/common/ezclocker-http-helper.js',
        './public/javascript/common/ez-validation.js',
        './public/javascript/common/ez-services.js',
        './public/javascript/common/ezclocker-google-analytics.js',
        './public/webcomponents/marketing/google-remarketing.js',
        './public/javascript/services/ezclocker-account-services.js',
        './public/javascript/services/ezclocker-options.js',
        './public/javascript/common/ezui.js',
        //'./m/p/js/ezm-mobile.js',
        './m/p/js/ezm-signin-controller.js',
        './m/p/accept-employee-invite/ezm-employee-signup-controller.js'
        ]
    });
const path = require('path');

// Set Constants
const ROOT_PATH = `${process.cwd()}`;
console.log(`ROOT_PATH=${ROOT_PATH}`);

const WEBAPP_SRC_ROOT_PATH = path.resolve(`${ROOT_PATH}`);
console.log(`WEBAPP_SRC_ROOT_PATH=${WEBAPP_SRC_ROOT_PATH}`);

const EZ_WEBPACK_CONFIGURATION_FILE_NAME = path.resolve(`${WEBAPP_SRC_ROOT_PATH}/webpack/ez-webpack-config.js`);
console.log(`EZ_WEBPACK_CONFIGURATION_FILE_NAME=${EZ_WEBPACK_CONFIGURATION_FILE_NAME}`);

const ezWebpackConfiguration = require(EZ_WEBPACK_CONFIGURATION_FILE_NAME);
if (ezWebpackConfiguration.debug) {
    console.log(`ezWebpackConfiguration=${JSON.stringify(ezWebpackConfiguration, null, 3)}`);
}

/**
 * Bundle together the ezClocker library files that do not require ezApi
 * or other files included in the ez-core.bundle.js bundle.
 */
module.exports = () => ezWebpackConfiguration.ezGetWebpackConfigurationWithEntries({
        'signin-redirector': [
            './public/sign-in/EzSigninRedirector.js'
        ],
        'signin': [
            // sign in page css
            './public/sign-in/ez-signin.css',
            // sign in page js
            '/public/javascript/common/ezclocker-layout-helper.js',
            '/public/sign-in/ez-signin.js'
        ]
    });
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
 * Bundles the account-view-controller JS files into a single js file.
 */
module.exports = () => ezWebpackConfiguration
    .ezGetWebpackConfigurationWithEntries({
        'wizard': [
            './public/webcomponents/ez-wizard/ez-wizard-context.js',
            './public/webcomponents/ez-wizard/ez-wizard-flow.js',
            './public/webcomponents/ez-wizard/ez-wizard-info.js',
            './public/webcomponents/ez-wizard/ez-wizard.js',
            './public/webcomponents/ez-wizard/ez-wizard-launcher.js'
        ]
    });
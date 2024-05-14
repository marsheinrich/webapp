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

/**
 * Bundle together the files all ezClocker site pages will use
 */
module.exports = () => ezWebpackConfiguration
    .ezGetWebpackConfigurationWithEntries({
        'employee-accept-invite': [
            './public/javascript/signup/ez-employee-signup-controller.js'
        ]
    });
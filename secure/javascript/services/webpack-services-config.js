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
    Services Bundles
 */
module.exports = () => ezWebpackConfiguration.ezGetWebpackConfigurationWithEntries({
    'public-services': [
        './public/javascript/common/ez-services.js',
        './public/javascript/services/ezclocker-services-helper.js',
        './public/javascript/services/ezclocker-account-services.js',
        './public/javascript/services/ezclocker-options.js',
        //'./public/javascript/services/ezclocker-employee.js',
    ],
    'services': [
        // Public Services
        './public/javascript/common/ez-services.js',
        './public/javascript/services/ezclocker-services-helper.js',
        './public/javascript/services/ezclocker-account-services.js',
        './public/javascript/services/ezclocker-options.js',
        //'./public/javascript/services/ezclocker-employee.js',
        // Secure Services
        './secure/javascript/common/ezclocker-license-helper.js',
        './secure/javascript/services/ezclocker-time-entry-service.js',
        './secure/javascript/services/ezclocker-datatag-service.js',
        './secure/javascript/services/ezclocker-datatagmap-service.js'
    ]
});

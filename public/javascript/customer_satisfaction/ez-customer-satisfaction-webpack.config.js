const path = require('path');
const ROOT_PATH = `${process.cwd()}`;
const WEBAPP_SRC_ROOT_PATH = path.resolve(`${ROOT_PATH}`);
const EZ_WEBPACK_CONFIGURATION_FILE_NAME = path.resolve(`${WEBAPP_SRC_ROOT_PATH}/webpack/ez-webpack-config.js`);
const ezWebpackConfiguration = require(EZ_WEBPACK_CONFIGURATION_FILE_NAME);

if (ezWebpackConfiguration.debug) {
    console.log(`ROOT_PATH=${ROOT_PATH}`);
    console.log(`WEBAPP_SRC_ROOT_PATH=${WEBAPP_SRC_ROOT_PATH}`);
    console.log(`EZ_WEBPACK_CONFIGURATION_FILE_NAME=${EZ_WEBPACK_CONFIGURATION_FILE_NAME}`);
    console.log(`ezWebpackConfiguration=${JSON.stringify(ezWebpackConfiguration, null, 3)}`);
}

module.exports = () => ezWebpackConfiguration.ezGetWebpackConfigurationWithEntries({
    'customer-satisfaction': [
        './public/javascript/common/ez-services.js',
        './public/javascript/services/ezclocker-account-services.js',
        './public/javascript/common/ezclocker-http-helper.js',
        './public/javascript/services/ezclocker-services-helper.js',
        './public/javascript/services/ez-utmtagmap-service.js',
        './public/javascript/common/ezclocker-layout-helper.js',
        './public/javascript/customer_satisfaction/customer.js'
    ]
});
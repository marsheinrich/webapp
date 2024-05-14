const path = require('path');
const ROOT_PATH = `${process.cwd()}`;
const WEBAPP_SRC_ROOT_PATH = path.resolve(`${ROOT_PATH}`);
const EZ_WEBPACK_CONFIGURATION_FILE_NAME = path.resolve(`${WEBAPP_SRC_ROOT_PATH}/webpack/ez-webpack-config.js`);
const ezWebpackConfiguration = require(EZ_WEBPACK_CONFIGURATION_FILE_NAME);
const EzCoreUIFiles = require('./ez-core-ui-files.js');

if (ezWebpackConfiguration.debug) {
    console.log(`ROOT_PATH=${ROOT_PATH}`);
    console.log(`WEBAPP_SRC_ROOT_PATH=${WEBAPP_SRC_ROOT_PATH}`);
    console.log(`EZ_WEBPACK_CONFIGURATION_FILE_NAME=${EZ_WEBPACK_CONFIGURATION_FILE_NAME}`);
    console.log(`ezWebpackConfiguration=${JSON.stringify(ezWebpackConfiguration, null, 3)}`);
    console.log(`EzCoreUiFiles=${JSON.stringify(EzCoreUiFiles, null, 3)}`);
}

/**
    Javascript object that defines the bundles the this webpack configuration will create.
 */
let EzBundleDef = {
    bundleNames: [
        'ez-ux-core.bundle.js',
        'ez-internal-api-core.bundle.js',
        'ez-internal-api-entities.bundle.js',
        'ez-non-auth-internal-api-clients.bundle.js',
        'ez-auth-internal-api-clients.bundle.js',
        'ez-all-internal-api-clients.bundle.js'
    ],
    bundles: {
        'ux-core': EzCoreUIFiles
    }
};

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
console.log(`Creating bundle files: ${JSON.stringify(EzBundleDef.bundleNames)} ... `);
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

module.exports = () => ezWebpackConfiguration.ezGetWebpackConfigurationWithEntries(EzBundleDef.bundles);

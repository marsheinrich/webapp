const path = require('path');
const ROOT_PATH = `${process.cwd()}`;
const WEBAPP_SRC_ROOT_PATH = path.resolve(`${ROOT_PATH}`);
const EZ_WEBPACK_CONFIGURATION_FILE_NAME = path.resolve(`${WEBAPP_SRC_ROOT_PATH}/webpack/ez-webpack-config.js`);
const ezWebpackConfiguration = require(EZ_WEBPACK_CONFIGURATION_FILE_NAME);
const { EzCore1LibraryFiles, EzCore2LibraryFiles } = require('./ez-core-library-files.js');

/**
    Javascript object that defines the bundles the this webpack configuration will create.
 */
let EzBundleDef = {
    bundleNames: [
        'ez-core.bundle.js',
        'ez-core2.bundle.js'
    ],
    bundles: {
        'core': EzCore1LibraryFiles,
        'core2': EzCore2LibraryFiles
    }
};

if (ezWebpackConfiguration.debug) {
    console.log(`ROOT_PATH=${ROOT_PATH}`);
    console.log(`WEBAPP_SRC_ROOT_PATH=${WEBAPP_SRC_ROOT_PATH}`);
    console.log(`EZ_WEBPACK_CONFIGURATION_FILE_NAME=${EZ_WEBPACK_CONFIGURATION_FILE_NAME}`);
    console.log(`ezWebpackConfiguration=${JSON.stringify(ezWebpackConfiguration, null, 3)}`);
    console.log(`EzCore1LibraryFiles=${JSON.stringify(EzCore1LibraryFiles, null, 3)}`);
    console.log(`EzCore2LibraryFiles=${JSON.stringify(EzCore2LibraryFiles, null, 3)}`);
    console.log(`EzBudnleDef=${JSON.stringify(EzBundleDef, null, 3)}`);
}

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
console.log(`Creating bundle files: ${JSON.stringify(EzBundleDef.bundleNames, null, 3)} ... `);
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

module.exports = () => ezWebpackConfiguration.ezGetWebpackConfigurationWithEntries(EzBundleDef.bundles);

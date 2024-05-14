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
        'ez-archive.bundle.js'
    ],
    bundles: {
        'archive': [
            // Legacy Styles
            './public/styles/common/ezclocker-base2015.css',
            './public/styles/common/ezclocker-page-layout.css',
            './public/styles/common/ezclocker-dialog.css',
            // ezClocker Core CSS
            // TODO: Review if ez-animation.css is used
            './ezstyles/ez-animation.css',
            './public/styles/common/ez-body.css',
            './public/styles/common/ez-logo.css',
            './public/styles/common/ez-padding.css',
            './public/styles/common/ez-text.css',
            './public/styles/common/ez-borders.css',
            './public/styles/common/ez-shadows.css',
            './public/styles/common/ez-layout-grid.css',
            './public/styles/common/ez-tables.css',
            './public/styles/common/ez-containers.css',
            './public/styles/common/ez-inputs.css',
            './public/styles/common/ez-buttons.css',
            './public/styles/common/ez-tabs.css',
            './public/styles/common/ez-header.css',
            './public/styles/common/ez-dialogs.css',
            // Page CSS
            './secure/archive/ez-employee-archive.css',
            // Page
            './secure/archive/ez-employee-archive-view-controller.js'
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

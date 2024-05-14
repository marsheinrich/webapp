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
 * ezClocker Library Bundles
 */
module.exports = () => ezWebpackConfiguration.ezGetWebpackConfigurationWithEntries({
    'uncaughtException-html': [
        // CSS
        './public/styles/common/ezclocker-base2015.css',
        './public/styles/common/ezclocker-page-layout.css',
        // JS
        './public/javascript/common/ezapi.js',
        './public/javascript/common/ezclocker-navigation-helper.js',
        './public/webcomponents/marketing/google-remarketing.js'
    ],
    'tos-20220501': [
        './public/styles/common/ez-body.css',
        './public/styles/common/ez-padding.css',
        './public/styles/common/ez-text.css',
        './public/styles/common/ez-borders.css',
        './public/styles/common/ez-shadows.css',
        './public/styles/common/ez-layout-grid.css',
        './public/styles/common/ez-containers.css',
        './public/styles/common/ez-header.css',
        './public/styles/common/ez-buttons.css',
        './public/tos/tos-2022.05.01.css'
    ]
});

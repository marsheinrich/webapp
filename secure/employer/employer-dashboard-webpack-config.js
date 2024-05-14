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
        'ez-employer-dashboard.bundle.js'
    ],
    bundles: {
        'employer-dashboard': [
            // Styles
            "./public/styles/common/ezclocker-base2015.css",
            "./public/styles/common/ezclocker-page-layout.css",
            "./public/styles/common/ezclocker-dialog.css",
            // Google Maps CSS
            "./public/javascript/google/ez-google-maps-dialog.css",
            // page specific css
            "./secure/styles/common/ezclocker-timeentry-audit-dialog.css",
            "./secure/styles/tcs-secure-style.css",
            "./secure/styles/addTimeEntry.css",
            "./secure/styles/timeEntryTable.css",
            "./secure/styles/quick-filter.css",
            "./secure/styles/employerDashboard.css",
            // js page specific
            './secure/employer/employer-dashboard-controller.js'
        ]
    }
};

if (ezWebpackConfiguration.debug) {
    console.log(`ROOT_PATH=${ROOT_PATH}`);
    console.log(`WEBAPP_SRC_ROOT_PATH=${WEBAPP_SRC_ROOT_PATH}`);
    console.log(`EZ_WEBPACK_CONFIGURATION_FILE_NAME=${EZ_WEBPACK_CONFIGURATION_FILE_NAME}`);
    console.log(`ezWebpackConfiguration=${JSON.stringify(ezWebpackConfiguration, null, 3)}`);
}

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
console.log(`Creating bundle files: ${JSON.stringify(EzBundleDef.bundleNames, null, 3)} ... `);
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

module.exports = () => ezWebpackConfiguration.ezGetWebpackConfigurationWithEntries(EzBundleDef.bundles);

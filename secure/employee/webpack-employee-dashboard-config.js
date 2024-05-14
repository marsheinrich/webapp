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
    'employee-dashboard': [
        // Legacy JS
        //'./public/javascript/common/ez-injector.js',
        //'./public/javascript/common/ezclocker-validation-helper.js',
        //'./public/javascript/common/ezclocker-http.js',
        // Legacy UX
        //'./public/javascript/common/ezclocker-html5-gps.js',
        //'./public/javascript/common/ez-html.js',
        //'./public/javascript/common/ezclocker-html-helper.js',
        //'./public/javascript/common/ezclocker-layout-helper.js',
        //'./public/javascript/common/ezclocker-page.js',
        //'./public/javascript/common/ezclocker-size-divs.js',
        //'./public/javascript/common/ezclocker-time-entry-grid.js',
        //'./public/javascript/common/ezclocker-block-user-actions.js',
        //'./public/javascript/common/ezclocker-buttons.js',
        // Services
        './secure/javascript/common/ezclocker-employer-services.js',
        './secure/javascript/services/ezclocker-employee-service.js',
        './secure/javascript/common/ez-employee-api.js',
        './secure/javascript/services/ezclocker-schedule-service.js',
        './secure/javascript/services/ezclocker-location-service.js',
        './secure/javascript/common/ez-clockin-clockout-helper.js',
        // Employee Page
        //'./secure/styles/common/ezclocker-timeentry-audit-dialog.css',
        //'./secure/styles/tcs-secure-style.css',
        './secure/styles/addTimeEntry.css',
        './secure/styles/timeEntryTable.css',
        './secure/styles/quick-filter.css',
        './secure/employee/employeeDashboard.css',
        './secure/employee/EzEmployeeBreakMode.js',
        './secure/employee/EzBreakInBreakOutHelper.js',
        './secure/employee/employeeDashboard-DisplayEmployeeInfo.js',
        './secure/employee/employee-dashboard-controller.js'
    ]
});
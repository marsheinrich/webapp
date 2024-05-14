const path = require('path');
const ROOT_PATH = `${process.cwd()}`;
const WEBAPP_SRC_ROOT_PATH = path.resolve(`${ROOT_PATH}`);
const EZ_WEBPACK_CONFIGURATION_FILE_NAME = path.resolve(`${WEBAPP_SRC_ROOT_PATH}/webpack/ez-webpack-config.js`);
const ezWebpackConfiguration = require(EZ_WEBPACK_CONFIGURATION_FILE_NAME);

/**
    Array of files included in the ez-employer-schedule.bundle.js bundle file.
 */
let EzEmployerScheduleFiles = [
    './secure/schedule/employer-schedule-controller.js'
];

/**
    Array of files included in the ez-employee-schedule.bundle.js bundle file.
 */
let EzEmployeeScheduleFiles = [
    './secure/schedule/employee-schedule-controller.js'
];

/**
    Javascript object that defines the bundles the this webpack configuration will create.
 */
let EzBundleDef = {
    bundleNames: [
        'ez-employer-schedule.bundle.js',
        'ez-employee-schedule.bundle.js'
    ],
    bundles: {
        "employer-schedule": EzEmployerScheduleFiles,
        'employee-schedule': EzEmployeeScheduleFiles
    }
};

if (ezWebpackConfiguration.debug) {
    console.log(`ROOT_PATH=${ROOT_PATH}`);
    console.log(`WEBAPP_SRC_ROOT_PATH=${WEBAPP_SRC_ROOT_PATH}`);
    console.log(`EZ_WEBPACK_CONFIGURATION_FILE_NAME=${EZ_WEBPACK_CONFIGURATION_FILE_NAME}`);
    console.log(`ezWebpackConfiguration=${JSON.stringify(ezWebpackConfiguration, null, 3)}`);
    console.log(`EzScheduleViewSharedFiles=${JSON.stringify(EzScheduleViewSharedFiles, null, 3)}`);
    console.log(`EzEmployerScheduleFiles=${JSON.stringify(EzEmployerScheduleFiles, null, 3)}`);
    console.log(`EzEmployeeScheduleFiles=${JSON.stringify(EzEmployeeScheduleFiles, null, 3)}`);
}

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
console.log(`Creating bundle files: ${JSON.stringify(EzBundleDef.bundleNames, null, 3)} ... `);
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

module.exports = () => ezWebpackConfiguration.ezGetWebpackConfigurationWithEntries(EzBundleDef.bundles);

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
    ezClocker's UX Widget Bundles
 */
module.exports = () => ezWebpackConfiguration.ezGetWebpackConfigurationWithEntries({
        'schedule-widget': [
            './public/widgets/EzSchedule/EzScheduleEventHandler.js',
            './public/widgets/EzSchedule/EzSchedule.js',
            './public/widgets/EzSchedule/EzScheduleWeek.js',
            './public/widgets/EzSchedule/EzScheduleTest.js'
        ],
        'toggles': [
            // './public/widgets/EzToggles/EzToggles.scss',
            './public/widgets/EzToggles/EzToggles.css',
            './public/widgets/EzToggles/EzToggle.js'
        ],
        'debug': [
            './public/javascript/common/ez-performance-metric.js'
        ],
        'metrics': [
            './public/javascript/common/ezclocker-google-analytics.js',
            './public/webcomponents/marketing/google-remarketing.js',
            './public/javascript/common/ez-facebook.js',
            './public/javascript/services/ez-utmtagmap-service.js'
        ],
        'metrics-v2': [
            './public/javascript/common/ezclocker-google-analytics.js',
            './public/webcomponents/marketing/google-remarketing.js',
            './public/webcomponents/EzFacebookPixel/ez-facebook-pixel.js',
            './public/javascript/services/ez-utmtagmap-service.js'
        ]
    });

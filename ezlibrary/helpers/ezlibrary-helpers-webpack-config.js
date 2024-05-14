const path = require('path');
const ROOT_PATH = `${process.cwd()}`;
const WEBAPP_SRC_ROOT_PATH = path.resolve(`${ROOT_PATH}`);
const EZ_WEBPACK_CONFIGURATION_FILE_NAME = path.resolve(`${WEBAPP_SRC_ROOT_PATH}/webpack/ez-webpack-config.js`);
const ezWebpackConfiguration = require(EZ_WEBPACK_CONFIGURATION_FILE_NAME);

const EzLibraryHelperFiles = [
    './ezlibrary/helpers/EzArray.js',
    './ezlibrary/helpers/EzAsync.js',
    './ezlibrary/helpers/EzBoolean.js',
    './ezlibrary/helpers/EzConsole.js',
    // TODO: Enable EzDateTIme once ready for consumption
    //'./ezlibrary/helpers/EzDateTime.js'
    './ezlibrary/helpers/EzDocument.js',
    './ezlibrary/helpers/EzError.js',
    './ezlibrary/helpers/EzFloat.js',
    './ezlibrary/helpers/EzFunction.js',
    './ezlibrary/helpers/EzHtml.js',
    './ezlibrary/helpers/EzHtmlCharacterCode.js',
    './ezlibrary/helpers/EzHttp.js',
    './ezlibrary/helpers/EzJson.js',
    './ezlibrary/helpers/EzNumber.js',
    './ezlibrary/helpers/EzObject.js',
    './ezlibrary/helpers/EzPromise.js',
    './ezlibrary/helpers/EzRegEx.js',
    './ezlibrary/helpers/EzString.js',
    './ezlibrary/helpers/EzUrl.js'
];

if (ezWebpackConfiguration.debug) {
    console.log(`ROOT_PATH=${ROOT_PATH}`);

    console.log(`WEBAPP_SRC_ROOT_PATH=${WEBAPP_SRC_ROOT_PATH}`);

    console.log(`EZ_WEBPACK_CONFIGURATION_FILE_NAME=${EZ_WEBPACK_CONFIGURATION_FILE_NAME}`);

    console.log(`ezWebpackConfiguration=${JSON.stringify(ezWebpackConfiguration, null, 3)}`);
}

/**
 * Javascript object that defines the bundles the this webpack configuration will create.
 */
const EzBundleDef = {
    bundleNames: [
        'ez-library-helpers.bundle.js'
    ],
    bundles: {
        'library-helpers': EzLibraryHelperFiles
    }
};

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
console.log(`Creating bundle files: ${JSON.stringify(EzBundleDef.bundleNames, null, 3)} ... `);
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

module.exports = () => ezWebpackConfiguration.ezGetWebpackConfigurationWithEntries(EzBundleDef.bundles);

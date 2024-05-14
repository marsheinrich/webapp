const path = require('path');
const ROOT_PATH = `${process.cwd()}`;
const WEBAPP_SRC_ROOT_PATH = path.resolve(`${ROOT_PATH}`);
const EZ_WEBPACK_CONFIGURATION_FILE_NAME = path.resolve(`${WEBAPP_SRC_ROOT_PATH}/webpack/ez-webpack-config.js`);
const ezWebpackConfiguration = require(EZ_WEBPACK_CONFIGURATION_FILE_NAME);

/**
    An array of all the files to include in the ez-public-api-clients.bundle.js bundle file.
 */
let EzPublicApiClientsFiles = [
    './developer/EzClockerApiClient.js'
];

/**
    An array of all the files to include in the ez-internal-api-core.bundle.js bundle file.
 */
// TODO: Review the files included in this bundle to remove deprecated and no longer used files.
let EzInternalApiCoreFiles = [
    './public/javascript/common/ez-services.js',
    './public/javascript/services/ezclocker-services.js',
    './public/javascript/services/ezclocker-services-helper.js'
];

/**
    An array of all the files to include in the ez-internal-api-entities.bundle.jss bundle file.
 */
// TODO: Review the files included in this bundle to remove deprecated and no longer used files.
let EzInternalApiEntitiesFiles = [
    './secure/javascript/services/entities/EzLocationEntity.js',
];

/**
    An array of all the files to include in the ez-no-auth-internal-api-clients.bundle.js bundle file.
 */
// TODO: Review the files included in this bundle to remove deprecated and no longer used files.
let EzNonAuthInternalApiClientsFiles = [
    './public/javascript/services/ezclocker-accounts.js',
    './public/javascript/services/ezclocker-account-services.js',
    './public/javascript/services/ezclocker-employee.js',
    './public/javascript/services/ezclocker-google-service.js',
    './public/javascript/services/ezclocker-options.js',
    './public/javascript/services/ezclocker-subscriptions.js',
    './public/javascript/services/ez-utmtagmap-service.js'
];

/**
    Replacement for the ez-secure-core.bundle.js
    An array of all the files to include in the ez-auth-internal-api-clients.bundle.js bundle file.
 */
// TODO: Review the files included in this bundle to remove deprecated and no longer used files.
let EzAuthInternalApiClientsFiles = [
    './secure/javascript/services/ezclocker-datatagmap-service.js',
    './secure/javascript/services/ezclocker-datatag-service.js',
    './secure/javascript/services/ezclocker-employee-service.js',
    './secure/javascript/services/ezclocker-location-service.js',
    './secure/javascript/services/ezclocker-report-service.js',
    './secure/javascript/services/ezclocker-time-entry-service.js',
    './secure/javascript/common/ezclocker-employer-services.js',
    './secure/javascript/common/ezclocker-employee-services.js',
    './secure/javascript/common/ez-employee-api.js'
];

/**
    An array of all the files to include in the ez-all-internal-api-clients.bundle.js bundle file.
    This ez-all-internal-api-clients.bundle.js bundle contains files defined in other
    bundle file arrays and are related to the ezClocker internal api feature.
 */
let EzAllInternalApiClients = [
    ...EzInternalApiCoreFiles,
    ...EzNonAuthInternalApiClientsFiles,
    ...EzAuthInternalApiClientsFiles
]

/**
    Javascript object that defines the bundles the this webpack configuration will create.
 */
let EzBundleDef = {
    bundleNames: [
        'ez-public-api-clients.bundle.js',
        'ez-internal-api-core.bundle.js',
        'ez-internal-api-entities.bundle.js',
        'ez-non-auth-internal-api-clients.bundle.js',
        'ez-auth-internal-api-clients.bundle.js',
        'ez-all-internal-api-clients.bundle.js'
    ],
    bundles: {
        'public-api-clients': EzPublicApiClientsFiles,
        'internal-api-core': EzInternalApiCoreFiles,
        'internal-api-entities': EzInternalApiEntitiesFiles,
        'non-auth-internal-api-clients': EzNonAuthInternalApiClientsFiles,
        'auth-internal-api-clients': EzAuthInternalApiClientsFiles,
        'all-internal-api-clients': EzAllInternalApiClients
    }
};

if (ezWebpackConfiguration.debug) {
    // Log configuration information
    console.log(`ROOT_PATH=${ROOT_PATH}`);
    console.log(`WEBAPP_SRC_ROOT_PATH=${WEBAPP_SRC_ROOT_PATH}`);
    console.log(`EZ_WEBPACK_CONFIGURATION_FILE_NAME=${EZ_WEBPACK_CONFIGURATION_FILE_NAME}`);
    console.log(`ezWebpackConfiguration=${JSON.stringify(ezWebpackConfiguration, null, 3)}`);
    console.log(`EzBundleDef=${JSON.stringify(ezWebpackConfiguration, null, 3)}`);

    // Log all the builde file arrays if debug is enabled
    console.log(`EzPublicApiClientsFiles=${JSON.stringify(EzPublicApiClientsFiles, null, 3)}`);
    console.log(`EzInternalApiCoreFiles=${JSON.stringify(EzInternalApiCoreFiles, null, 3)}`);
    console.log(`EzInternalApiEntitiesFiles=${JSON.stringify(EzInternalApiEntitiesFiles, null, 3)}`);
    console.log(`EzNonAuthInternalApiClientsFiles=${JSON.stringify(EzNonAuthInternalApiClientsFiles, null, 3)}`);
    console.log(`EzAuthInternalApiClientsFiles=${JSON.stringify(EzAuthInternalApiClientsFiles, null, 3)}`);
    console.log(`EzAllInternalApiClients=${JSON.stringify(EzAllInternalApiClients, null, 3)}`);
}

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
console.log(`Creating bundle files: ${JSON.stringify(EzBundleDef.bundleNames, null, 3)} ... `);
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

module.exports = () => ezWebpackConfiguration.ezGetWebpackConfigurationWithEntries(EzBundleDef.bundles);

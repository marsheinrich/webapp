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
 * Bundles the account-view-controller JS files into a single js file.
 */
module.exports = () => ezWebpackConfiguration.ezGetWebpackConfigurationWithEntries({
    'integrations-export': [
        // Integrations Global
        './secure/integrations/ez-integration-enums.js',
        './secure/integrations/ez-integrations-service-client.js',
        './secure/integrations/ez-integration-wizard-context.js',
        './secure/integrations/ez-integration-wizard-common.js',
        './secure/integrations/ez-integration-wizard-state-loader.js',
    ],
    'integrations': [
        // Integrations Global
        './secure/integrations/ez-integration-enums.js',
        './secure/integrations/ez-integrations-service-client.js',
        './secure/integrations/ez-integration-wizard-context.js',
        './secure/integrations/ez-integration-wizard-common.js',
        './secure/integrations/ez-integration-wizard-state-loader.js',
        './secure/integrations/EzIntegrationsViewController.js',
        // QBO
        /*
        './secure/integrations/qbo/ez-integration-employee-linker-controller.js',
        './secure/integrations/qbo/ez-integration-employee-linker-view.js',
        './secure/integrations/qbo/ez-integration-export-time-entries-controller.js',
        './secure/integrations/qbo/ez-qbo-integration-api-client.js',
        './secure/integrations/qbo/ez-qbo-integration-employee-linker-controller.js',
        './secure/integrations/qbo/ez-qbo-integration-export-time-entries-controller.js',
        './secure/integrations/qbo/ez-qbo-integration-sync-client.js',
        './secure/integrations/qbo/ez-qbo-integration-wizard-flow.js',
        './secure/integrations/qbo/ez-qbo-integration-wizard-launcher.js',
        */
        // Paychex
        './secure/integrations/paychex/EzPayChexIntegrationSetupDialog.js',
        // ADP
        './secure/integrations/adp/EzADPIntegrationSetupDialog.js',
        // GUSTO_API
        './secure/integrations/gusto/EzGustoIntegrationSetupDialog.js',
        // GUSTO
        './secure/integrations/gusto-csv/EzGustoCSVIntegrationSetupDialog.js',
        // QUICKBOOKS
        './secure/integrations/quickbooks/EzQBOIntegrationSetupDialog.js',
        './secure/integrations/quickbooks/EzQBOCustomerMapping.js',
        // ACS
        './secure/integrations/acs/EzACSIntegrationSetupDialog.js',
        // Paycom
        './secure/integrations/paycom/EzPaycomIntegrationSetupDialog.js',
        // Available integrations setup listing
        './secure/integrations/widgets/EzAvailableIntegrations/EzAvailableIntegrations.js'
    ]
});

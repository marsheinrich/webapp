import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzQBOIntegrationSetupResponse } from '/secure/integrations/quickbooks/EzQBOIntegrationSetupResponse.js';


/**
 * Controller for the ezClocker QBO Integrations wizard page.
 */
class EzQBOIntegrationSetupController {
    constructor() {
        this.ready = false;
        this.ezTypeName = 'EzQBOIntegrationSetupController';
    }

    /**
     * @public
     * Saves the QBO integration setup configuration
     * @param {EzIntegrationProviderId} ezIntegrationProviderId
     * @param {EzQBOIntegrationSetupRequest} ezQBOIntegrationSetupRequest
     * @returns {Promise}
     */
    ezSaveIntegrationSetup(ezIntegrationProviderId, ezQBOIntegrationSetupRequest) {
        if (!ezApi.ezStringHasLength(ezIntegrationProviderId)) {
            throw new EzBadParamException(
                'ezIntegrationProviderId',
                this,
                this.ezSaveIntegrationSetup);
        }
        if (ezApi.ezIsNotValid(ezQBOIntegrationSetupRequest)) {
            throw new EzBadParamException(
                'ezIntegrationProviderId',
                this,
                this.ezSaveIntegrationSetup);
        }

        return ezApi.ezclocker.http.ezPost(
            ezApi.ezclocker.nav.ezGetInternalApiUrl(
                ezApi.ezUrlTemplate`integrations/${ezIntegrationProviderId}/qbo-integration`), 

            ezQBOIntegrationSetupRequest.ezToJsonPayload())
            .then(ezApi.ezclocker.ezServices.ezProcessApiResolve, ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
     * @public
     * Gets the existing qbo integration setup configuration (if any)
     * @param {EzIntegrationProviderId} ezIntegrationProviderId
     * @returns {Promise}
     */
    ezGetIntegrationSetup(ezIntegrationProviderId) {
        if (!ezApi.ezStringHasLength(ezIntegrationProviderId)) {
            throw new EzBadParamException(
                'ezIntegrationProviderId',
                this,
                this.ezGetIntegrationSetup);
        }

        return ezApi.ezPromise((successful, failed) => ezApi.ezclocker.http.ezGet(
            ezApi.ezclocker.nav.ezGetInternalApiUrl('integrations/qbo-integration', 'v1')) 
            .then(ezApi.ezclocker.ezServices.ezProcessApiResolve, ezApi.ezclocker.ezServices.ezProcessApiReject)
            .then(
                (response) => successful(new EzQBOIntegrationSetupResponse(response)),
                (eResponse) => {
                    ezApi.ezclocker.logger.error(
                        ezApi.ezEM`
                            Failed to get the existing QBO integration configuration.
                            Error: ${ezApi.ezToJson(eResponse)}`);
                    return failed(new EzQBOIntegrationSetupResponse(eResponse));
                }));
    }
}

export {
    EzQBOIntegrationSetupController
};
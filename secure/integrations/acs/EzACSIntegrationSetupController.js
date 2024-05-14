import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzACSIntegrationSetupResponse } from '/secure/integrations/acs/EzACSIntegrationSetupResponse.js';

/**
 * Controller for the ezClocker ACS Integrations wizard page.
 */
class EzACSIntegrationSetupController {
    constructor() {
        this.ezTypeName = 'EzACSIntegrationSetupController';
    }

    /**
     * @public
     * Saves the ACS integration setup configuration
     * @param {EzIntegrationProviderId} ezIntegrationProviderId
     * @param {EzACSIntegrationSetupRequest} ezACSIntegrationSetupRequest
     * @returns {Promise}
     */
    ezSaveIntegrationSetup(ezIntegrationProviderId, ezACSIntegrationSetupRequest) {
        if (!ezApi.ezStringHasLength(ezIntegrationProviderId)) {
            throw new EzBadParamException(
                'ezIntegrationProviderId',
                this,
                this.ezSaveIntegrationSetup);
        }
        if (!ezApi.ezIsValid(ezACSIntegrationSetupRequest)) {
            throw new EzBadParamException(
                'ezACSIntegrationSetupRequest',
                this,
                this.ezSaveIntegrationSetup);
        }

        return ezApi.ezclocker.http.ezPost(
            ezApi.ezclocker.nav.ezGetInternalApiUrl(
                ezApi.ezUrlTemplate`integrations/${ezIntegrationProviderId}/acs-integration`),
            ezACSIntegrationSetupRequest.ezToJsonPayload())
            .then(ezApi.ezclocker.ezServices.ezProcessApiResolve, ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
     * @public
     * Gets the existing ACS integration setup configuration (if any)
     * @param {EzIntegrationProviderId} ezIntegrationProviderId
     * @returns {Promise}
     */
    ezGetIntegrationSetup(ezIntegrationProviderId) {
        if (!ezApi.ezStringHasLength(ezIntegrationProviderId)) {
            throw ezApi.ezBadParam('ezIntegrationProviderId', this.ezTypeName, 'ezGetIntegrationSetup');
        }

        return ezApi.ezPromise((successful, failed) => ezApi.ezclocker.http.ezGet(
            ezApi.ezclocker.nav.ezGetInternalApiUrl('integrations/acs-integration', 'v1'))
            .then(ezApi.ezclocker.ezServices.ezProcessApiResolve, ezApi.ezclocker.ezServices.ezProcessApiReject)
            .then(
                (response) => successful(new EzACSIntegrationSetupResponse(response)),
                (eResponse) => {
                    ezApi.ezclocker.logger.error(ezApi.ezEM`
                        Failed to get the existing ${ezIntegrationProviderId} integration configuration.
                        Error: ${ezApi.ezToJson(eResponse)}`);
                    return failed(new EzACSIntegrationSetupResponse(eResponse));
                }));
    }
}

export {
    EzACSIntegrationSetupController
};

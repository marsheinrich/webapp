import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzGustoCSVIntegrationSetupResponse } from '/secure/integrations/gusto-csv/EzGustoCSVIntegrationSetupResponse.js';
import { EzGustoCSVIntegrationSetupRequest } from '/secure/integrations/gusto-csv/EzGustoCSVIntegrationSetupRequest.js';

/**
 * Controller for the ezClocker Gusto Integrations wizard page.
 */
export class EzGustoCSVIntegrationSetupController {
    constructor() {
        this.ready = false;
        this.ezTypeName = 'EzGustoCSVIntegrationSetupController';
    }

    /**
     * @public
     * Saves the Gusto integration setup configuration
     * @param {EzIntegrationProviderId} ezIntegrationProviderId
     * @param {EzGustoCSVIntegrationSetupRequest} EzGustoCSVIntegrationSetupRequest
     * @returns {Promise}
     */
    ezSaveIntegrationSetup(ezIntegrationProviderId, EzGustoCSVIntegrationSetupRequest) {
        if (!ezApi.ezStringHasLength(ezIntegrationProviderId)) {
            throw new EzBadParamException(
                'ezIntegrationProviderId',
                this,
                this.ezSaveIntegrationSetup);
        }
        if (ezApi.ezIsNotValid(EzGustoCSVIntegrationSetupRequest)) {
            throw new EzBadParamException(
                'ezIntegrationProviderId',
                this,
                this.ezSaveIntegrationSetup);
        }

        return ezApi.ezclocker.http.ezPost(
            ezApi.ezclocker.nav.ezGetInternalApiUrl(
                ezApi.ezUrlTemplate`integrations/${ezIntegrationProviderId}/gusto-integration`),

            EzGustoCSVIntegrationSetupRequest.ezToJsonPayload())
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
     * @public
     * Gets the existing gusto integration setup configuration (if any)
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

	    let url = ezApi.ezUrlTemplate`integrations/${ezIntegrationProviderId}/gusto-integration`;
        return ezApi.ezPromise((successful, failed) => ezApi.ezclocker.http.ezGet(
            ezApi.ezclocker.nav.ezGetInternalApiUrl(url, 'v1'))
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject)
            .then(
                (response) => successful(new EzGustoCSVIntegrationSetupResponse(response)),
                (eResponse) => {
                    ezApi.ezclocker.logger.error(
                        ezApi.ezEM`
                            Failed to get the existing Gusto integration configuration.
                            Error: ${ezApi.ezToJson(eResponse)}`);
                    return failed(new EzGustoCSVIntegrationSetupResponse(eResponse));
                }));
    }
}

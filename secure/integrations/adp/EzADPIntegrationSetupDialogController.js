import { EzADPIntegrationSetupResponse } from '/secure/integrations/adp/EzADPIntegrationSetupResponse.js';

/**
 * Controller for the ezClocker ADP Integrations Setup dialog.
 */
class EzADPIntegrationSetupDialogController {
    constructor() {
        this.ezTypeName = 'EzADPIntegrationSetupDialogController';
    }

    /**
        @public
        Posts a single employee integration mapping
        @param {EzIntegrationProviderId} ezIntegrationProviderId
        @param {EzADPIntegrationRequest} ezADPIntegrationRequest
        @returns {Promise}
     */
    ezSaveIntegrationSetup(ezIntegrationProviderId, ezADPIntegrationRequest) {
        if (!ezApi.ezStringHasLength(ezIntegrationProviderId)) {
            throw ezApi.ezBadParam('ezIntegrationProviderId', this.ezTypeName, 'ezSaveIntegrationSetup');
        }
        if (ezApi.ezIsNotValid(ezADPIntegrationRequest)) {
            throw ezApi.ezBadParam('ezADPIntegrationRequest', this.ezTypeName, 'ezSaveIntegrationSetup');
        }

        return ezApi.ezclocker.http.ezPost(ezApi.ezclocker.nav.ezGetInternalApiUrl(
            ezApi.ezUrlTemplate`integrations/${ezIntegrationProviderId}/adp-integration`),
        ezADPIntegrationRequest.ezToJsonPayload())
            .then(ezApi.ezclocker.ezServices.ezProcessApiResolve, ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @public
        Gets the ADP integration configuration data.
        @returns {Promise}
     */
    ezGetIntegrationSetup(ezIntegrationProviderId) {
        if (!ezApi.ezStringHasLength(ezIntegrationProviderId)) {
            throw ezApi.ezBadParam('ezIntegrationProviderId', this.ezTypeName, 'ezGetIntegrationSetup');
        }

        return ezApi.ezPromise((resolve, reject) => ezApi.ezclocker.http.ezGet(ezApi.ezclocker.nav.ezGetInternalApiUrl(
            ezApi.ezUrlTemplate`integrations/adp-integration`))
            .then(ezApi.ezclocker.ezServices.ezProcessApiResolve, ezApi.ezclocker.ezServices.ezProcessApiReject)
            .then(
                (response) => resolve(new EzADPIntegrationSetupResponse(response)),
                (eResponse) => {
                    ezApi.ezclocker.logger.error(ezApi.ezEM`
                            Failed to get the ADP integration configuration.
                            Error: ${ezApi.ezToJson(eResponse)}`);
                    return reject(new EzADPIntegrationSetupResponse(eResponse));
                }));
    }
}

export {
    EzADPIntegrationSetupDialogController
};

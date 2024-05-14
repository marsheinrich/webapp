import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzPayChexIntegrationSetupResponse } from '/secure/integrations/paychex/EzPayChexIntegrationSetupResponse.js';


/**
    Controller for the ezClocker Paychex Integrations setup dialog
 */
class EzPayChexIntegrationSetupController {
    constructor() {
        this.ready = false;
        this.ezTypeName = 'EzPayChexIntegrationSetupController';
    }

    /**
        @public
        Posts a single employee integration mapping
        @param {EzIntegrationProviderId} ezIntegrationProviderId
        @param {EzPayChexIntegrationRequest} ezPayChexIntegrationRequest
        @returns {Promise}
     */
    ezSaveIntegrationSetup(ezIntegrationProviderId, ezPayChexIntegrationRequest) {
        if (!ezApi.ezStringHasLength(ezIntegrationProviderId)) {
            throw new EzBadParamException(
                'ezIntegrationProviderId',
                this,
                this.ezSaveIntegrationSetup);
        }
        if (ezApi.ezIsNotValid(ezPayChexIntegrationRequest)) {
            throw new EzBadParamException(
                'ezPayChexIntegrationRequest',
                this,
                this.ezSaveIntegrationSetup);
        }

        return ezApi.ezclocker.ezHttpHelper.ezPost(
            ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(`integrations/${ezIntegrationProviderId}/paychex-integration`),
            ezPayChexIntegrationRequest.ezToJsonPayload())
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @public
        Gets the PayChex integration configuration data.
        @param {EzIntegrationProviderId} ezIntegrationProviderId
        @returns {Promise}
     */
    ezGetIntegrationSetup(ezIntegrationProviderId) {
        if (!ezApi.ezStringHasLength(ezIntegrationProviderId)) {
            throw new EzBadParamException(
                'ezIntegrationProviderId',
                this,
                this.ezGetIntegrationSetup);
        }

        return ezApi.ezPromise((resolve, reject) => ezApi.ezclocker.http.ezGet(ezApi.ezclocker.nav.ezGetInternalApiUrl(
            ezApi.ezUrlTemplate`integrations/paychex-integration`))
            .then(ezApi.ezclocker.ezServices.ezProcessApiResolve, ezApi.ezclocker.ezServices.ezProcessApiReject)
            .then(
                (response) => resolve(new EzPayChexIntegrationSetupResponse(response)),
                (eResponse) => {
                    ezApi.ezclocker.logger.error(
                        ezApi.ezEM`
                            Failed to get the PayChex integration configuration.
                            Error: ${ezApi.ezToJson(eResponse)}`);
                    return reject(new EzPayChexIntegrationSetupResponse(eResponse));
                }));
    }
}

export {
    EzPayChexIntegrationSetupController
};
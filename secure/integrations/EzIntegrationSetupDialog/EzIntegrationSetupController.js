import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzIntegrationSetupResponse } from '/secure/integrations/EzIntegrationSetupDialog/EzIntegrationSetupResponse.js';

/**
    Base controller Integrations setup dialog
    Import with
        import { EzIntegrationSetupDialogController } from '/secure/integrations/EzIntegrationSetupDialog/EzIntegrationSetupController.js';
 */
export class EzIntegrationSetupDialogController extends EzClass {
    /**
        @public @constructor
     */
    constructor() {
        super();
    }

    /**
        @public
        Posts a single employee integration mapping
        @param {EzIntegrationProviderId} ezIntegrationProviderId
        @param {EzIntegrationRequest} ezIntegrationSetupRequest
        @returns {Promise}
     */
    ezSaveIntegrationSetup(ezIntegrationProviderId, ezIntegrationSetupRequest) {
        if (!ezApi.ezStringHasLength(ezIntegrationProviderId)) {
            throw new EzBadParamException(
                'ezIntegrationProviderId',
                this,
                this.ezSaveIntegrationSetup);
        }
        if (!ezApi.ezIsValid(ezIntegrationSetupRequest)) {
            throw new EzBadParamException(
                'ezIntegrationSetupRequest',
                this,
                this.ezSaveIntegrationSetup);
        }

        let url = ezApi.ezclocker.nav.ezGetInternalApiUrl(ezApi.ezUrlTemplate`integrations/${ezIntegrationProviderId}`);

        return ezApi.ezclocker.ezHttpHelper.ezPost(
            url,
            ezIntegrationSetupRequest.ezToJsonPayload())
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

        let url = ezApi.ezUrlTemplate`integrations/${ezIntegrationProviderId}`;

        return ezApi.ezPromise(
            (resolve, reject) => ezApi.ezclocker.ezHttpHelper.ezGet(
                ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(url))
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject)
            .then(
                (response) => resolve(new EzIntegrationSetupResponse(response)),
                (eResponse) => {
                    ezApi.ezclocker.ezLogger.error(
                        ezApi.ezEM`
                            Failed to get the existing ${ezIntegrationProviderId} integration configuration.
                            Error: ${ezApi.ezToJson(eResponse)}`);
                    return reject(new EzIntegrationSetupResponse(eResponse));
                }));
    }
}

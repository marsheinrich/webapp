import { EzIntegrationSetupRequest } from '/secure/integrations/EzIntegrationSetupDialog/EzIntegrationSetupRequest.js';

/**
    Entity for EzGustoIntegrationSetupRequest.java
 */
export class EzGustoIntegrationSetupRequest extends EzIntegrationSetupRequest {
    /**
     * Constructor for EzGustoIntegrationSetupRequest
     * @param {Boolean} enableIntegration
     */
    constructor(enableIntegration) {
        super(enableIntegration);
    }

    /**
        Converts this entity to a JSON payload string for use in HTTP requests.
        @returns {String}
     */
    ezToJsonPayload() {
        let payload = {
            ezClockerEmployeeMappingListRequests: ezApi.ezArrayOrEmpty(this.ezEmployeeIntegrationMapRequests),
            ezClockerJobsMappingListRequests: ezApi.ezArrayOrEmpty(this.dataTagIntegrationMapRequests),
            ezPayRatePayTypesMapRequests: ezApi.ezArrayOrEmpty(this.payRateIntegrationMapRequests),
            ezEnableIntegration: ezApi.ezIsTrue(this.ezEnableIntegration)
        };

        return ezApi.ezToJson(payload);
    }
}

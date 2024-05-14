import { EzIntegrationSetupRequest } from '/secure/integrations/EzIntegrationSetupDialog/EzIntegrationSetupRequest.js';

/**
    Entity for EzGustoCSVIntegrationSetupRequest.java
 */
export class EzGustoCSVIntegrationSetupRequest extends EzIntegrationSetupRequest {
    /**
     * Constructor for EzGustoCSVIntegrationSetupRequest
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

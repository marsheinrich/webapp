import { EzIntegrationSetupRequest } from '../EzIntegrationSetupDialog/EzIntegrationSetupRequest.js';

/**
    Service request payload for integration configurations.
    Entity for EzPayChexIntegrationSetupRequest.java
 */
export class EzACSIntegrationSetupRequest extends EzIntegrationSetupRequest {
    /**
        Creates a new instance of EzPayChexIntegrationSetupRequest
        @param {Boolean} enableIntegration
     */
    constructor(enableIntegration) {
        super(enableIntegration);
    }

    /**
     * Converts this entity to a JSON payload string for use in HTTP requests.
     * @returns {String}
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

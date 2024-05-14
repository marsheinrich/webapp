import { EzIntegrationSetupRequest } from '/secure/integrations/EzIntegrationSetupDialog/EzIntegrationSetupRequest.js';
import { EzPaycomHeaderFieldName } from '/secure/integrations/paycom/EzPaycomHeaderFieldName.js';

/**
    Entity for EzPaycomIntegrationSetupRequest.java
    Import with
        import { EzPaycomIntegrationSetupResponse } from '/secure/integrations/paycom/EzPaycomIntegrationSetupRequest.js';
 */
export class EzPaycomIntegrationSetupRequest extends EzIntegrationSetupRequest {
    /**
     * Constructor for EzPaycomIntegrationSetupRequest
     * @param {Boolean} enableIntegration
     */
    constructor(enableIntegration) {
        super(enableIntegration);
        this.ezTypeName = 'EzPaycomIntegrationSetupRequest';
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

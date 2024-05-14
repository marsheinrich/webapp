import { EzIntegrationSetupRequest } from '/secure/integrations/EzIntegrationSetupDialog/EzIntegrationSetupRequest.js';


/**
    Entity for EzQBOIntegrationSetupRequest.java
 */
export class EzQBOIntegrationSetupRequest extends EzIntegrationSetupRequest {
    /**
     * Constructor for EzQBOIntegrationSetupRequest
     * @param {Boolean} enableIntegration
     */
    constructor(enableIntegration) {
        super(enableIntegration);
    }

    customerIntegrationMapRequests = [];

    /**
        Converts this entity to a JSON payload string for use in HTTP requests.
        @returns {String}
     */
    ezToJsonPayload() {
        let payload = {
            ezClockerEmployeeMappingListRequests: ezApi.ezArrayOrEmpty(this.ezEmployeeIntegrationMapRequests),
            ezClockerJobsMappingListRequests: ezApi.ezArrayOrEmpty(this.dataTagIntegrationMapRequests),
            ezPayRatePayTypesMapRequests: ezApi.ezArrayOrEmpty(this.payRateIntegrationMapRequests),
            ezClockerCustomerMappingListRequests: ezApi.ezArrayOrEmpty(this.customerIntegrationMapRequests),
            ezEnableIntegration: ezApi.ezIsTrue(this.ezEnableIntegration)
        };

        return ezApi.ezToJson(payload);
    }
	
    ezAddCustomerIntegrationMapRequest(customerIntegrationMapRequest) {
        if (!this.ezValidateDataTagIntegrationMapRequest(customerIntegrationMapRequest)) {
            throw EzBadParamException(
                'customerIntegrationMapRequest',
                this,
                this.ezAddCustomerIntegrationMapRequest);
        }

        this.customerIntegrationMapRequests.push(customerIntegrationMapRequest);
    }
	
}

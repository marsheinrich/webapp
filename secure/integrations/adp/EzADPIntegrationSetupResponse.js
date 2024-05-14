import { EzIntegrationSetupResponse } from '/secure/integrations/EzIntegrationSetupDialog/EzIntegrationSetupResponse.js';
import { EzADPHeaderFieldName } from '/secure/integrations/adp/EzADPHeaderFieldName.js';

/**
    Entity for ADPIntegrationResponse.java
 */
class EzADPIntegrationSetupResponse extends EzIntegrationSetupResponse {
    constructor(response) {
        super(response);
        this.ezTypeName = 'EzADPIntegrationSetupResponse';
    }

    ezGetCompanyCode() {
        return ezApi.ezStringOrEmpty(this.ezHeaderProperties.ezGet(
            EzADPHeaderFieldName.ezToPayloadId(EzADPHeaderFieldName.COMPANY_CODE)));
    }

    ezGetBatchNumber() {
        return ezApi.ezStringOrEmpty(this.ezHeaderProperties.ezGet(
            EzADPHeaderFieldName.ezToPayloadId(EzADPHeaderFieldName.BATCH_NUMBER)));
    }

    ezGetHoursTypeMappingResponse() {
        return ezApi.ezStringOrEmpty(this.ezHeaderProperties.ezGet('ezPayRatePayTypesMapResponses'));
    }


}

export {
    EzADPIntegrationSetupResponse
};
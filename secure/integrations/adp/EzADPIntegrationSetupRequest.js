import { EzIntegrationSetupRequest } from '/secure/integrations/EzIntegrationSetupDialog/EzIntegrationSetupRequest.js';
import { EzADPHeaderFieldName } from '/secure/integrations/adp/EzADPHeaderFieldName.js';

/**
    APD Integration's setup request entity
 */
export class EzADPIntegrationSetupRequest extends EzIntegrationSetupRequest {
    constructor(enableIntegration) {
        super(enableIntegration);
    }

    ezGetCompanyCode() {
        return ezApi.ezStringOrEmpty(this.ezHeaderProperties.ezGet(
            EzADPHeaderFieldName.ezToPayloadId(EzADPHeaderFieldName.COMPANY_CODE)));
    }

    ezSetCompanyCode(aCompanyCode) {
        this.ezHeaderProperties.ezPut(
            EzADPHeaderFieldName.ezToPayloadId(EzADPHeaderFieldName.COMPANY_CODE),
            ezApi.ezStringOrEmpty(aCompanyCode));
    }

    ezGetBatchNumber() {
        return ezApi.ezStringOrEmpty(this.ezHeaderProperties.ezGet(
            EzADPHeaderFieldName.ezToPayloadId(EzADPHeaderFieldName.BATCH_NUMBER)));
    }

    ezSetBatchNumber(aBatchNumber) {
        this.ezHeaderProperties.ezPut(
            EzADPHeaderFieldName.ezToPayloadId(EzADPHeaderFieldName.BATCH_NUMBER),
            ezApi.ezStringOrEmpty(aBatchNumber));
    }

    ezGetIntegrationPayRateCode() {
        return ezApi.ezStringOrEmpty(this.ezHeaderProperties.ezGet('integrationPayRateCode'));
    }

    ezSetIntegrationPayRateCode(aIntegrationPayRateCode) {
        this.ezHeaderProperties.ezPut("integrationPayRateCode", ezApi.ezStringOrEmpty(aIntegrationPayRateCode));
    }

    ezGetHourlyType() {
        return ezApi.ezStringOrEmpty(this.ezHeaderProperties.ezGet('integrationHourlyType'));
    }

    ezSetHourlyType(aHourlyType) {
        this.ezHeaderProperties.ezPut("integrationHourlyType", ezApi.ezStringOrEmpty(aHourlyType));
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
            ezEnableIntegration: this.ezEnableIntegration
        };

        // Add custom integration header fields
        payload[EzADPHeaderFieldName.ezToPayloadId(EzADPHeaderFieldName.COMPANY_CODE)] = this.ezGetCompanyCode();
        payload[EzADPHeaderFieldName.ezToPayloadId(EzADPHeaderFieldName.BATCH_NUMBER)] = this.ezGetBatchNumber();

        return ezApi.ezToJson(payload);
    }
}
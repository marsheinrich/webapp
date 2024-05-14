import { EzIntegrationSetupRequest } from '/secure/integrations/EzIntegrationSetupDialog/EzIntegrationSetupRequest.js';
import { EzPayChexHeaderFieldName } from '/secure/integrations/paychex/EzPayChexHeaderFieldName.js';

/**
    Entity for EzPayChexIntegrationSetupRequest.java
 */
export class EzPayChexIntegrationSetupRequest extends EzIntegrationSetupRequest {
    /**
        @public @constructor
        Constructor for EzPayChexIntegrationSetupRequest
        @param {Boolean} enableIntegration
     */
    constructor(enableIntegration) {
        super(enableIntegration);
    }

    /**
        @public
        Gets the PAYCHEX integration client id
     */
    ezGetPayChexClientId() {
        return ezApi.ezStringOrEmpty(this.ezHeaderProperties.ezGet(
            EzPayChexHeaderFieldName.ezToInputId(EzPayChexHeaderFieldName.PAYCHEX_CLIENT_ID)));
    }

    /**
        @public
        Sets the PAYCHEX integration Client Id
     */
    ezSetPayChexClientId(aPayChexClientId) {
        this.ezHeaderProperties.ezPut(
            EzPayChexHeaderFieldName.ezToInputId(EzPayChexHeaderFieldName.PAYCHEX_CLIENT_ID),
            ezApi.ezStringOrEmpty(aPayChexClientId));
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

        payload[EzPayChexHeaderFieldName.ezToInputId(EzPayChexHeaderFieldName.PAYCHEX_CLIENT_ID)] =
            this.ezGetPayChexClientId();

        return ezApi.ezToJson(payload);
    }
}

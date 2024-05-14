import { EzIntegrationSetupResponse } from '/secure/integrations/EzIntegrationSetupDialog/EzIntegrationSetupResponse.js';
import { EzPayChexHeaderFieldName } from '/secure/integrations/paychex/EzPayChexHeaderFieldName.js';
/**
    Entity for EzPayChexIntegrationSetupResponse.java
 */
class EzPayChexIntegrationSetupResponse extends EzIntegrationSetupResponse {
    /**
        Constructor for EzPayChexIntegrationSetupResponse
        @param {Object|null} response
     */
    constructor(response) {
        super(response);
        this.ezTypeName = 'EzPayChexIntegrationSetupResponse';
    }

    /**
       @public
       Gets the PAYCHEX integration client id
    */
    ezGetPayChexClientId() {
        return ezApi.ezStringOrEmpty(this.ezHeaderProperties.ezGet(
            EzPayChexHeaderFieldName.ezToInputId(EzPayChexHeaderFieldName.PAYCHEX_CLIENT_ID)));
    }
}

export {
    EzPayChexIntegrationSetupResponse
};
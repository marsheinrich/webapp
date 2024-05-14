import { EzIntegrationSetupResponse } from '/secure/integrations/EzIntegrationSetupDialog/EzIntegrationSetupResponse.js';

/**
    Entity for EzGustoCSVIntegrationSetupResponse.java
 */
export class EzGustoCSVIntegrationSetupResponse extends EzIntegrationSetupResponse {
    /**
        Constructor for EzGustoCSVIntegrationSetupResponse
        @param {Object} response
     */
    constructor(response) {
        super(response);
        this.ezTypeName = 'EzGustoCSVIntegrationSetupResponse';
    }
}

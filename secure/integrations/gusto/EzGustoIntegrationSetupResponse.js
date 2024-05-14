import { EzIntegrationSetupResponse } from '/secure/integrations/EzIntegrationSetupDialog/EzIntegrationSetupResponse.js';

/**
    Entity for EzGustoIntegrationSetupResponse.java
 */
class EzGustoIntegrationSetupResponse extends EzIntegrationSetupResponse {
    /**
        Constructor for EzGustoIntegrationSetupResponse
        @param {Object} response
     */
    constructor(response) {
        super(response);
        this.ezTypeName = 'EzGustoIntegrationSetupResponse';
    }
}

export {
    EzGustoIntegrationSetupResponse
};
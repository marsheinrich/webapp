import { EzIntegrationSetupResponse } from '/secure/integrations/EzIntegrationSetupDialog/EzIntegrationSetupResponse.js';

/**
    Entity for EzQBOIntegrationSetupResponse.java
 */
class EzQBOIntegrationSetupResponse extends EzIntegrationSetupResponse {
    /**
        Constructor for EzQBOIntegrationSetupResponse
        @param {Object} response
     */
    constructor(response) {
        super(response);
        this.ezTypeName = 'EzQBOIntegrationSetupResponse';
    }
}

export {
    EzQBOIntegrationSetupResponse
};
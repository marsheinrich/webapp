import { EzIntegrationSetupResponse } from '../EzIntegrationSetupDialog/EzIntegrationSetupResponse.js';

/**
    Entity for EzACSIntegrationSetupResponse.java
 */
class EzACSIntegrationSetupResponse extends EzIntegrationSetupResponse {
    /**
        Constructor for ezACSIntegrationSetupRequest
        @param {Object|null} response
     */
    constructor(response) {
        super(response);
        this.ezTypeName = 'EzACSIntegrationSetupResponse';
    }
}

export {
    EzACSIntegrationSetupResponse
};
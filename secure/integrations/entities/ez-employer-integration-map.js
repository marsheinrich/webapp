import {
    EzIntegrationProviderId,
    EzNovaAuthenticationProviderId,
    EzIntegrationType
} from '/secure/integrations/ez-integration-enums.js';

/**
    Entity for EzEmployerIntegrationMap.java
 */
class EzEmployerIntegrationMap {
    constructor() {
        this.id = null;
        this.ezEmployerId = null;
        this.ezEmployerUserId = null;
        this.mappedByEzUserId = null;

        this.ezIntegrationProviderId = EzIntegrationProviderId.UNKNOWN.getIntegrationProviderIdName();
        this.ezNovaAuthenticationProviderId = EzNovaAuthenticationProviderId.UNKNOWN.getAuthProviderName();
        this.ezIntegrationType = EzIntegrationType.UNKNOWN.getIntegrationTypeName();
        this.ezAdpBatchNumber = null;
        this.primaryIntegration = false;
        this.enabled = true;

        this.mapCreatedIso = ezApi.ezclocker.ezDateTime.ezNowAsIso();
        this.mapUpdatedIso = this.mapCreatedIso;
        this.lastConnectedIso = null;

    }
}

export {
    EzEmployerIntegrationMap
};
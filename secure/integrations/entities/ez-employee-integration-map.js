/**
    Entity for EzEmployeeIntegrationMap.java
 */
class EzEmployeeIntegrationMap {
    constructor() {
        this.ezEmployerId = null;
        this.ezEmployerUserId = null;
        this.ezEmployeeId =  null;
        this.mappedByEzUserId = null;
    
        this.employerIntegrationMapId = null;
        this.ezIntegrationProviderId = null;
        this.encProviderConnectionId = null;
        this.encProviderEmployeeId = null;
        this.encProviderEmployeeName = null;
        
        this.mapCreatedIso = ezApi.ezclocker.ezDateTime.ezNowAsIso();
        this.mapUpdatedIso = this.mapCreatedIso;
    }
}

export {
    EzEmployeeIntegrationMap
};
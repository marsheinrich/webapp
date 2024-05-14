/**
    Javascript entity for the DataTagIntegrationMap java entity.
 */
class EzDataTagIntegrationMap {
    constructor() {
        this.id = null;
        this.ezEmployerId = null;
        this.ezClockerDataTagId = null;
        
        this.ezEmployerIntegrationMapId = null;
        this.ezIntegrationProviderId = null;    
        this.integrationDataTagId = '';
        this.primaryIntegration = false;
        
        let nowDateTime = ezApi.ezclocker.ezDateTime.ezNowIso();;
        this.createdDateTimeIso = nowDateTime;
        this.updatedDateTimeIso = nowDateTime;
    }
    
    ezUpdateFromJobCode(jobCode) {
        if (ezApi.ezIsNotValid(jobCode)) {
            // nothing to update
            return;
        }
        
        this.ezEmployerId = jobCode.employerId;
        this.ezClockerDataTagId = jobCode.id;
        this.updatedDateTimeIso = ezApi.ezclocker.ezDateTime.ezNowIso();
    }
}

export {
    EzDataTagIntegrationMap
};
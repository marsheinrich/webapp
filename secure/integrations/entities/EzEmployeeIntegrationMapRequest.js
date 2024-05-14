/**
    Part of the PayChexIntegrationRequest integration service request payload.
    Entity for EzEmployeeIntegrationMapRequest.java
 */
export class EzEmployeeIntegrationMapRequest {
    /**
        Creates a new instance of EzEmployeeIntegrationMapRequest
        @param {Number} employerIntegrationMapId
        @param {Number} emplolyerId
        @param {Number} employeeId
        @param {Number} mappedByUserId
        @param {String} providerConnectionId
        @param {String} providerEmployeeId
        @param {String} providerEmployeeName
        @param {String} integrationEmployeeFirstName
        @param {String} integrationEmployeeMiddleName
        @param {String} integrationEmployeeLastName
        @param {String} ezIntegrationProviderId
     */
    constructor(employerIntegrationMapId, emplolyerId, employeeId, mappedByUserId, providerConnectionId,
        providerEmployeeId, providerEmployeeName, integrationEmployeeFirstName, integrationEmployeeMiddleName,
        integrationEmployeeLastName, ezIntegrationProviderId) {
        this.id = null;
        this.ezEmployerId = ezApi.ezAssignOrDefault(emplolyerId, null);
        this.ezEmployeeId = ezApi.ezAssignOrDefault(employeeId, null);
        this.ezEmployerIntegrationMapId = ezApi.ezAssignOrDefault(employerIntegrationMapId, null);
        this.mappedByEzUserId = ezApi.ezAssignOrDefault(mappedByUserId, null);

        this.ezIntegrationProviderId = ezApi.ezStringOrEmpty(ezIntegrationProviderId);
        this.providerEmployeeId = ezApi.ezStringOrEmpty(providerEmployeeId);
        this.providerConnectionId = ezApi.ezStringOrEmpty(providerConnectionId);
        this.providerEmployeeName = ezApi.ezStringOrEmpty(providerEmployeeName);
        this.integrationEmployeeFirstName = ezApi.ezStringOrEmpty(integrationEmployeeFirstName);
        this.integrationEmployeeMiddleName = ezApi.ezStringOrEmpty(integrationEmployeeMiddleName);
        this.integrationEmployeeLastName = ezApi.ezStringOrEmpty(integrationEmployeeLastName);
    }

    /**
        @public @field
        @type {number}
     */
    id = null;

    /**
        @public @field
        @type {number}
     */
    ezEmployerId = null;

    /**
        @public @field
        @type {number}
     */
    ezEmployeeId = null;

    /**
        @public @field
        @type {number}
     */
    ezEmployerIntegrationMapId = null;

    /**
        @public @field
        @type {number}
     */
    mappedByEzUserId = null;

    /**
        @public @field
        @type {string}
     */
    ezIntegrationProviderId = '';

    /**
        @public @field
        @type {string}
     */
    providerEmployeeId = '';

    /**
        @public @field
        @type {string}
     */
    providerConnectionId = '';

    /**
        @public @field
        @type {string}
     */
    providerEmployeeName = '';

    /**
        @public @field
        @type {string}
     */
    integrationEmployeeFirstName = '';

    /**
        @public @field
        @type {string}
     */
    integrationEmployeeMiddleName = '';

    /**
        @public @field
        @type {string}
     */
    integrationEmployeeLastName = '';
}
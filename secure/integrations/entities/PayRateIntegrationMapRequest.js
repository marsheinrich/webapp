import { EzClockerPayRateType } from '/secure/integrations/EzClockerPayRateType.js';

/**
    Part of the PayChexIntegrationRequest integration service request payload.
    Entity for PayRateIntegrationMapRequest.java
 */
export class PayRateIntegrationMapRequest {
    /**
        Creates a new instance of PayRateIntegrationMapRequest
        @param {Number} employerId
        @param {Number} userId
        @param {String} ezClockerPayRateType
        @param {String} contextId
        @param {String} integrationPayRateType
        @param {String} integrationHourlyType,
     */
    constructor(employerId, userId, ezClockerPayRateType, contextId, integrationPayRateType, integrationHourlyType) {
        this.id = null;
        this.ezEmployerId = ezApi.ezAssignOrDefault(employerId, null);
        this.ezUserId = ezApi.ezAssignOrDefault(userId, null);
        this.ezClockerPayRateType = ezClockerPayRateType;
        this.ezContextId = ezApi.ezStringOrEmpty(contextId);
        this.ezIntegrationPayRateCode = ezApi.ezStringOrEmpty(integrationPayRateType);
        this.ezIntegrationHourlyType = ezApi.ezStringOrEmpty(integrationHourlyType);
        this.integrationHourlyType = ezApi.ezStringOrEmpty(integrationHourlyType);
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
    ezUserId = null;

    /**
        @public @field
        @type {string}
     */
    ezClockerPayRateType = EzClockerPayRateType.UNKNOWN;

    /**
        @public @field
        @type {string}
     */
    ezContextId =  '';

    /**
        @public @field
        @type {string}
     */
    ezIntegrationPayRateCode =  '';

    /**
        @public @field
        @type {string}
     */
    ezIntegrationHourlyType =  '';

    /**
        @public @field
        @type {string}
     */
    integrationHourlyType =  '';
}
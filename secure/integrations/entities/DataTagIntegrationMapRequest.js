/**
    Part of the PayChexIntegrationRequest integration service request payload.
    Entity for DataTagIntegrationMapRequest.java
 */
export class DataTagIntegrationMapRequest {
    /**
        Creates a new instance of DataTagIntegrationMapRequest
        @param {Number} userId
        @param {Number} employerId
        @param {String} ezClockerDataTagId
        @param {Number} ezIntegrationproviderId
        @param {String} ezContextId
        @param {String} integrationDataTag
     */
    constructor(ezUserId, ezEmployerId, ezClockerDataTagId, ezIntegrationproviderId, ezContextId, ezIntegrationDataTag) {
        this.id = null;
        this.ezUserId = ezApi.ezAssignOrDefault(ezUserId, null);
        this.ezEmployerId = ezApi.ezAssignOrDefault(ezEmployerId, null);
        this.ezClockerDataTagId = ezApi.ezAssignOrDefault(ezClockerDataTagId, null);
        this.ezIntegrationproviderId = ezApi.ezStringOrEmpty(ezIntegrationproviderId);
        this.ezContextId = ezApi.ezStringOrEmpty(ezContextId);
        this.ezIntegrationDataTag = ezApi.ezStringOrEmpty(ezIntegrationDataTag);
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
    ezUserId = null;

    /**
        @public @field
        @type {number}
     */
    ezEmployerId = null;

    /**
        @public @field
        @type {number}
     */
    ezClockerDataTagId = null;

    /**
        @public @field
        @type {string}
     */
    ezIntegrationproviderId = '';

    /**
        @public @field
        @type {string}
     */
    ezContextId = '';

    /**
        @public @field
        @type {string}
     */
    ezIntegrationDataTag = '';
}

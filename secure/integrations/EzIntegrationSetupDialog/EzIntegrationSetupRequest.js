import { EzHeaderProperties } from '/secure/integrations/EzIntegrationSetupDialog/EzHeaderProperties.js';

/**
    Service request payload for integration configurations.
    Entity for PayChexIntegrationRequest.java
    Import with:
        import { EzIntegrationSetupRequest } from '/secure/integrations/EzIntegrationSetupDialog/EzIntegrationSetupRequest.js';
 */
export class EzIntegrationSetupRequest {
    /**
        Constructor for EzIntegrationSetupRequest
        @param {Boolean} enableIntegration
     */
    constructor(enableIntegration) {
        this.ezEnableIntegration = enableIntegration;
    }

    /**
        @public @field
        @type {object}
     */
    ezHeaderProperties = new EzHeaderProperties();

    /**
        @public @field
        @type {boolean}
     */
    #ezEnableIntegration = false;

    /**
        @public @property @getter
        Returns if the integration is enabled or not.
        @returns {boolean}
     */
    get ezEnableIntegration() {
        return this.#ezEnableIntegration;
    }

    /**
        @public @property @setter
        Sets if the integration is enabled or not.
        @returns {boolean}
     */
    set ezEnableIntegration(ezEnableIntegration) {
        this.#ezEnableIntegration = ezApi.ezIsTrue(ezEnableIntegration);
    }

    /**
        @public @field
        @type {array}
     */
    ezEmployeeIntegrationMapRequests = [];

    /**
        @public @field
        @type {array}
     */
    payRateIntegrationMapRequests = [];

    /**
        @public @field
        @type {array}
     */
    dataTagIntegrationMapRequests = [];

    /**
        @public @field
        @type {array}
     */
    additionalResourceMapRequest = [];

    /**
        @public
        Gets the EzHeaderProperties for the EzIntegrationSetupRequest
        @returns {EzHeaderProperties}
     */
    ezGetHeaderProperties() {
        return this.ezHeaderProperties;
    }

    /**
        @public @method
        Converts this entity to a JSON payload string for use in HTTP requests.
        @returns {String}
     */
    ezToJsonPayload() {
        return ezApi.ezToJson({
            ezEnableIntegration: ezApi.ezIsTrue(this.ezEnableIntegration),
            ezClockerEmployeeMappingListRequests: ezApi.ezArrayOrEmpty(this.ezEmployeeIntegrationMapRequests),
            ezClockerJobsMappingListRequests: ezApi.ezArrayOrEmpty(this.dataTagIntegrationMapRequests),
            ezPayRatePayTypesMapRequests: ezApi.ezArrayOrEmpty(this.payRateIntegrationMapRequests)
        });
    }

    // ========================================================================
    // Job Code/Data Tag Mapping Methods
    // ========================================================================

    /**
        @public @method
        Determines if the request has DataTagIntegrationMapRequest mappings.
        @returns {Boolean}
     */
    ezHasJobMappings() {
        return ezApi.ezArrayHasLength(this.dataTagIntegrationMapRequests);
    }

    /**
        @public @method
        Validates the provided dataTagIntegrationMapRequest meets the request requirements.
        @param {DataTagIntegrationMapRequest} dataTagIntegrationMapRequest
     */
    ezValidateDataTagIntegrationMapRequest(dataTagIntegrationMapRequest) {
        return ezApi.ezIsValid(dataTagIntegrationMapRequest);
    }

    /**
        @public @method
        Adds the provided dataTagIntegrationMapRequest value to the request
        @param {DataTagIntegrationMapRequest} dataTagIntegrationMapRequest
     */
    ezAddDataTagIntegrationMapRequest(dataTagIntegrationMapRequest) {
        if (!this.ezValidateDataTagIntegrationMapRequest(dataTagIntegrationMapRequest)) {
            throw EzBadParamException(
                'dataTagIntegrationMapRequest',
                this,
                this.ezAddDataTagIntegrationMapRequest);
        }

        this.dataTagIntegrationMapRequests.push(dataTagIntegrationMapRequest);
    }

    /**
        @public @method
        Returns the DataTagIntegrationMapRequest at the provided index in the ezClockerJobsMappingListRequests.
        @param {Number} index
        @returns {DataTagIntegrationMapRequest}
     */
    ezGetDataTagIntegrationMapRequest(index) {
        if (!ezApi.ezIsNumber(index) || 0 > index || index >= this.dataTagIntegrationMapRequests.length) {
            throw new EzBadParamException(
                'index',
                this,
                this.ezGetDataTagIntegrationMapRequest);
        }

        return this.dataTagIntegrationMapRequests[index];
    }

    // ========================================================================
    // Employee Mapping Methods
    // ========================================================================

    /**
        @public @method
        Determines if the request has EzEmployeeIntegrationMapRequest mappings.
        @returns {Boolean}
     */
    ezHasEmployeeMappings() {
        return ezApi.ezArrayHasLength(this.ezEmployeeIntegrationMapRequests);
    }


    /**
        @public @method
        Validates the provided ezEmployeeIntegrationMapRequest meets the request requirements.
        @param {EzEmployeeIntegrationMapRequest} ezEmployeeIntegrationMapRequest
     */
    ezValidateEzEmployeeIntegrationMapRequest(ezEmployeeIntegrationMapRequest) {
        return ezApi.ezIsValid(ezEmployeeIntegrationMapRequest);
    }

    /**
        @public @method
        Adds the provided ezEmployeeIntegrationMapRequest value to the request
        @param {EzEmployeeIntegrationMapRequest} ezEmployeeIntegrationMapRequest
     */
    ezAddEzEmployeeIntegrationMapRequest(ezEmployeeIntegrationMapRequest) {
        if (!this.ezValidateEzEmployeeIntegrationMapRequest(ezEmployeeIntegrationMapRequest)) {
            throw EzNovaBadparam(
                'dataTagIntegrationMapRequest',
                this,
                this.ezAddEzEmployeeIntegrationMapRequest);
        }

        this.ezEmployeeIntegrationMapRequests.push(ezEmployeeIntegrationMapRequest);
    }

    /**
        @public @method
        Returns the EzEmployeeIntegrationMapRequest at the provided index in the ezClockerEmployeeMappingListRequests.
        @param {Number} index
        @returns {DataTagIntegrationMapRequest}
     */
    ezGetEzEmployeeIntegrationMapRequest(index) {
        if (!ezApi.ezIsNumber(index) || 0 > index || index >= this.ezEmployeeIntegrationMapRequests.length) {
            throw new EzBadParamException(
                'index',
                this,
                this.ezGetEzEmployeeIntegrationMapRequest);
        }

        return this.ezEmployeeIntegrationMapRequests[index];
    }

    // ========================================================================
    // Pay Rate Mapping Methods
    // ========================================================================

    /**
        @public @method
        Determines if the request has PayRateIntegrationMapRequest mappings.
        @returns {Boolean}
     */
    ezHasPayRateMappings() {
        return ezApi.ezArrayHasLength(this.payRateIntegrationMapRequests);
    }

    /**
        @public @method
        Validates the provided payRateIntegrationMapRequest meets the request requirements.
        @param {PayRateIntegrationMapRequest} payRateIntegrationMapRequest
     */
    ezValidatePayRateIntegrationMapRequest(payRateIntegrationMapRequest) {
        return ezApi.ezIsValid(payRateIntegrationMapRequest) ||
            !ezApi.ezStringHasLength(payRateIntegrationMapRequest.ezClockerPayRateType);
    }

    /**
        @public @method
        Adds the provided payRateIntegrationMapRequest value to the request
        @param {PayRateIntegrationMapRequest} payRateIntegrationMapRequest
     */
    ezAddPayRateIntegrationMapRequest(payRateIntegrationMapRequest) {
        if (!this.ezValidatePayRateIntegrationMapRequest(payRateIntegrationMapRequest)) {
            throw new EzBadParamException(
                'payRateIntegrationMapRequest',
                this,
                this.ezAddPayRateIntegrationMapRequest);
        }

        this.payRateIntegrationMapRequests.push(payRateIntegrationMapRequest);
    }

    /**
        @public @method
        Returns the EzEmployeeIntegrationMapRequest at the provided index in the ezClockerEmployeeMappingListRequests.
        @param {Number} index
        @returns {DataTagIntegrationMapRequest}
     */
    ezGetPayRateIntegrationMapRequest(index) {
        if (!ezApi.ezIsNumber(index) || 0 > index || index >= this.payRateIntegrationMapRequests.length) {
            throw new EzBadParamException(
                'payRateIntegrationMapRequest',
                this,
                this.ezGetPayRateIntegrationMapRequest);
        }

        return this.payRateIntegrationMapRequests[index];
    }
}
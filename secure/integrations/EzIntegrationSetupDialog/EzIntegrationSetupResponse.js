import { EzClockerPayRateType } from '/secure/integrations/EzClockerPayRateType.js';
import { EzEmployeeIntegrationMapRequest } from '/secure/integrations/entities/EzEmployeeIntegrationMapRequest.js';
import { PayRateIntegrationMapRequest } from '/secure/integrations/entities/PayRateIntegrationMapRequest.js';
import { DataTagIntegrationMapRequest } from '/secure/integrations/entities/PayRateIntegrationMapRequest.js';

import { EzHeaderProperties } from '/secure/integrations/EzIntegrationSetupDialog/EzHeaderProperties.js';
/**
    Entity for PayChexIntegrationResponse.java
 */
class EzIntegrationSetupResponse {
    /**
        Constructor for EzIntegrationSetupResponse
        @param {Object} response
     */
    constructor(response) {
        this.ezTypeName = 'EzIntegrationSetupResponse';

        if (ezApi.ezIsNotValid(response)) {
            response = {
                errorCode: 500,
                message: 'Provided response object was null.'
            };
        }

        this.ezHeaderProperties = new EzHeaderProperties();
        this.dataTagMappingsByDataTagId = {};
        this.ezPayRateMappingsByType = {};

        this.ezPayRateMappingsByType[EzClockerPayRateType.REGULAR] = null;
        this.ezPayRateMappingsByType[EzClockerPayRateType.OVERTIME] = null;
        this.ezPayRateMappingsByType[EzClockerPayRateType.DOUBLE_OVERTIME] = null;
        this.ezPayRateMappingsByType[EzClockerPayRateType.PTO] = null;
        this.ezPayRateMappingsByType[EzClockerPayRateType.HOLIDAY] = null;
        this.ezPayRateMappingsByType[EzClockerPayRateType.SICK] = null;
        this.ezPayRateMappingsByType[EzClockerPayRateType.UNPAID] = null;

        this.ezEmployeeMappingsByEmployeeId = {};
        this.ezCustomerMappingsByCustomerId = {};
		this.integrationEmployees = [];
		this.integrationCustomers = [];
		this.oath2SessionExists = false; //true means we successfully invoke QBO API. false means we probably need user to login to Intuit
        this.integrationCompanyName = null;
		this.oauth2LoginUrl = null;

        if (0 === response.errorCode) {
            for (let prop in response) {
                switch (prop) {
                    case 'id':
                        this.id = ezApi.ezAssignOrDefault(response.id, null);
                        break;
                    case 'ezEnableIntegration':
                        this.ezEnableIntegration = ezApi.ezIsTrue(response.ezEnableIntegration);
                        break;
                    case 'ezClockerEmployeeMappingListResponses':
                        if (ezApi.ezArrayHasLength(response.ezClockerEmployeeMappingListResponses)) {
                            response.ezClockerEmployeeMappingListResponses.forEach((ezEmployeeIntegrationMapRequest) => {
                                if (ezApi.ezStringHasLength(ezEmployeeIntegrationMapRequest.providerEmployeeName)) {
                                    this.ezEmployeeMappingsByEmployeeId[ezEmployeeIntegrationMapRequest.ezEmployeeId] =
                                        ezEmployeeIntegrationMapRequest;
                                }
                            });
                        }
                        break;
                    case 'ezClockerCustomerMappingListResponses':
                        if (ezApi.ezArrayHasLength(response.ezClockerCustomerMappingListResponses)) {
                            response.ezClockerCustomerMappingListResponses.forEach((ezCustomerIntegrationMapRequest) => {
                                if (ezApi.ezStringHasLength(ezCustomerIntegrationMapRequest.providerCustomerName)) {
                                    this.ezCustomerMappingsByCustomerId[ezCustomerIntegrationMapRequest.ezDataTagId] =
                                        ezCustomerIntegrationMapRequest;
                                }
                            });
                        }
                        break;
                    case 'integrationEmployees':
                        if (ezApi.ezArrayHasLength(response.integrationEmployees)) {
                            response.integrationEmployees.forEach((integrationEmployee) => {
                                if (ezApi.ezStringHasLength(integrationEmployee.providerEmployeeId)) {
                                    this.integrationEmployees.push(integrationEmployee);
                                }
                            });
                        }
                        break;
                    case 'integrationCustomers':
                        if (ezApi.ezArrayHasLength(response.integrationCustomers)) {
                            response.integrationCustomers.forEach((integrationCustomer) => {
                                if (ezApi.ezStringHasLength(integrationCustomer.providerCustomerId)) {
                                    this.integrationCustomers.push(integrationCustomer);
                                }
                            });
                        }
                        break;
                    case 'oath2SessionExists':
                        this.oath2SessionExists = ezApi.ezIsTrue(response.oath2SessionExists);
                        break;
					case 'oauth2LoginUrl':
						this.oauth2LoginUrl = ezApi.ezAssignOrDefault(response.oauth2LoginUrl, null);
						break;
                    case 'companyName':
                        this.integrationCompanyName = ezApi.ezAssignOrDefault(response.companyName, null);
                        break;
                    case 'ezClockerJobsMappingListResponses':
                        if (ezApi.ezArrayHasLength(response.ezClockerJobsMappingListResponses)) {
                            response.ezClockerJobsMappingListResponses.forEach((dataTagIntegrationMapRequest) => {
                                if (ezApi.ezStringHasLength(dataTagIntegrationMapRequest.integrationDataTagId)) {
                                    this.dataTagMappingsByDataTagId[dataTagIntegrationMapRequest.ezClockerDataTagId] =
                                        dataTagIntegrationMapRequest;
                                }
                            });
                        }
                        break;
                    case 'ezPayRatePayTypesMapResponses':
                        if (ezApi.ezArrayHasLength(response.ezPayRatePayTypesMapResponses)) {
                            response.ezPayRatePayTypesMapResponses.forEach(
                                (payRateMapping) => {
                                    if (ezApi.ezStringHasLength(payRateMapping.integrationPayRateCode)) {
                                        let ezClockerPayRateType = payRateMapping.ezClockerPayRateType;
                                        this.ezPayRateMappingsByType[ezClockerPayRateType] = payRateMapping;
                                    }
                                });
                        }
                        break;
                    default:
                        if (!ezApi.ezIsFunction(response[prop])) {
                            this.ezHeaderProperties.ezPut(prop, response[prop]);
                        }
                        break;
                }
            }
        }
    }

    /**
        @public
        Gets the EzHeaderProperties for the EzIntegrationSetupRequest
        @returns {EzHeaderProperties}
     */
    ezGetHeaderProperties(selfRef) {
        let self = selfRef || this;

        return self.ezHeaderProperties;
    }

    // ========================================================================
    // Job Code/Data Tag Mapping Methods
    // ========================================================================

    /**
        Determines if the request has DataTagIntegrationMapRequest mappings.
        @returns {Boolean}
     */
    ezHasJobMappings() {
        if (!ezApi.ezIsValid(this.dataTagMappingsByDataTagId)) {
            return false;
        }

        let hasMapping = false;
        for (let prop in this.dataTagMappingsByDataTagId) {
            if (ezApi.ezHasOwnProperty(this.dataTagMappingsByDataTagId, prop) &&
                ezApi.ezIsValid(this.dataTagMappingsByDataTagId[prop]) &&
                ezApi.ezIsNumber(this.dataTagMappingsByDataTagId[prop].ezClockerDataTagId) &&
                0 <= this.dataTagMappingsByDataTagId[prop].ezClockerDataTagId) {
                hasMapping = true;
            }
        }

        return hasMapping;
    }

    /**
        Validates the provided dataTagIntegrationMapRequest meets the request requirements.
     */
    ezValidateDataTagIntegrationMapRequest(dataTagIntegrationMapRequest) {
        return ezApi.ezIsValid(dataTagIntegrationMapRequest) &&
            ezApi.ezIsNumber(dataTagIntegrationMapRequest.ezClockerDataTagId) &&
            0 >= dataTagIntegrationMapRequest.ezClockerDataTagId;
    }

    /**
        Adds the provided dataTagIntegrationMapRequest value to the request
     */
    ezAddDataTagIntegrationMapRequest(dataTagIntegrationMapRequest) {
        if (!this.ezValidateDataTagIntegrationMapRequest(dataTagIntegrationMapRequest)) {
            throw ezApi.ezBadParam('dataTagIntegrationMapRequest', self.ezTypeName,
                'ezGetDataTagIntegrationMapRequest');
        }

        this.dataTagMappingsByDataTagId[dataTagIntegrationMapRequest.ezClockerDataTagId] =
            dataTagIntegrationMapRequest;
    }

    /**
        Returns the DataTagIntegrationMapRequest at the provided index in the ezClockerJobsMappingListRequests.
        @returns {DataTagIntegrationMapRequest}
     */
    ezGetDataTagMappingForDataTagId(dataTagId) {
        if (!ezApi.ezIsNumber(dataTagId)) {
            throw ezApi.ezBadParam('dataTagId', self.ezTypeName, 'ezGetDataTagIntegrationMapRequest');
        }
        if (dataTagId < 0) {
            throw ezApi.ezBadParam('dataTagId', self.ezTypeName, 'ezGetDataTagIntegrationMapRequest');
        }

        let dataTagIdString = dataTagId.toString();
        return ezApi.ezHasOwnProperty(this.dataTagMappingsByDataTagId, dataTagIdString)
            ? this.dataTagMappingsByDataTagId[dataTagIdString]
            : null;
    }


    // ========================================================================
    // Pay Rate Mapping Methods
    // ========================================================================

    /**
        Determines if the request has PayRateIntegrationMapRequest mappings.
        @returns {Boolean}
     */
    ezHasPayRateMappings() {
        if (!ezApi.ezIsValid(this.ezPayRateMappingsByType)) {
            return false;
        }

        let hasMapping = false;
        EzClockerPayRateType.ezKeys.forEach((key) => {
            if (ezApi.ezHasOwnProperty(this.ezPayRateMappingsByType, key) &&
                ezApi.ezIsValid(this.ezPayRateMappingsByType[key]) &&
                ezApi.ezStringHasLength(this.ezPayRateMappingsByType[key].ezClockerPayRateType) &&
                key === this.ezPayRateMappingsByType[key].ezClockerPayRateType) {
                hasMapping = true;
            }
        });

        return hasMapping;
    }

    /**
        Validates the provided payRateIntegrationMapRequest meets the request requirements.
     */
    ezValidatePayRateIntegrationMapRequest(payRateIntegrationMapRequest) {
        return ezApi.ezIsValid(payRateIntegrationMapRequest) &&
            ezApi.ezStringHasLength(payRateIntegrationMapRequest.ezClockerPayRateType) &&
            EzClockerPayRateType.UNKNOWN !== payRateIntegrationMapRequest.ezClockerPayRateType;
    }

    /**
        Adds the provided payRateIntegrationMapRequest value to the request
     */
    ezAddPayRateIntegrationMapRequest(payRateIntegrationMapRequest) {
        if (!this.ezValidatePayRateIntegrationMapRequest(payRateIntegrationMapRequest)) {
            throw ezApi.ezBadParam('payRateIntegrationMapRequest', self.ezTypeName,
                'ezAddPayRateIntegrationMapRequest');
        }

        let ezClockerPayRateType = payRateIntegrationMapRequest.ezClockerPayRateType;
        this.ezPayRateMappingsByType[ezClockerPayRateType] = payRateIntegrationMapRequest;
    }

    /**
     *  Returns the matching payRateIntegrationMapRequest for the provided EzClockerPayRateType value.
     *  @param {String} payRateType (from EzClockerPayRateType enumeration in EzClockerPayRateType.js)
     *  @param {PayChexIntegrationRequest|null} ref
     *  @returns {PayRateIntegrationMapRequest|null}
     */
    ezGetPayRateIntegrationMapRequestForPayRateType(payRateType) {
        if (!ezApi.ezStringHasLength(payRateType)) {
            throw ezApi.ezBadParam('payRateType', self.ezTypeName,
                'ezGetPayRateIntegrationMapRequestForPayRateType');
        }

        let ezClockerPayRateType = payRateType;
        return ezApi.ezHasOwnProperty(this.ezPayRateMappingsByType, ezClockerPayRateType)
            ? this.ezPayRateMappingsByType[ezClockerPayRateType]
            : null;
    }


    // ========================================================================
    // Employee Mapping Methods
    // ========================================================================

    /**
        Determines if the request has EzEmployeeIntegrationMapRequest mappings.
        @returns {Boolean}
     */
    ezHasEmployeeMappings() {
        if (ezApi.ezIsNotValid(this.ezEmployeeMappingsByEmployeeId)) {
            return false;
        }

        let hasMappings = false;
        for (let prop in this.ezEmployeeMappingsByEmployeeId) {
            if (ezApi.ezHasOwnProperty(this.ezEmployeeMappingsByEmployeeId, prop) &&
                ezApi.ezIsValid(this.ezEmployeeMappingsByEmployeeId[prop]) &&
                ezApi.ezIsNumber(this.ezEmployeeMappingsByEmployeeId[prop].ezEmployeeId) &&
                0 >= this.ezEmployeeMappingsByEmployeeId[prop].ezEmployeeId) {
                hasMappings = true;
            }
        }

        return hasMappings;
    }
    ezGetAllEmployeeMappings() {
        if (ezApi.ezIsNotValid(this.ezEmployeeMappingsByEmployeeId)) {
            return null;
        }

        return this.ezEmployeeMappingsByEmployeeId;
    }
	
    /**
        Determines if the request has EzCustomerIntegrationMapRequest mappings.
        @returns {Boolean}
     */
    ezHasCustomerMappings() {
        if (ezApi.ezIsNotValid(this.ezCustomerMappingsByCustomerId)) {
            return false;
        }

        let hasMappings = false;
        for (let prop in this.ezCustomerMappingsByCustomerId) {
            if (ezApi.ezHasOwnProperty(this.ezCustomerMappingsByCustomerId, prop) &&
                ezApi.ezIsValid(this.ezCustomerMappingsByCustomerId[prop]) &&
                ezApi.ezIsNumber(this.ezCustomerMappingsByCustomerId[prop].ezDataTagId) &&
                0 >= this.ezCustomerMappingsByCustomerId[prop].ezDataTagId) {
                hasMappings = true;
            }
        }

        return hasMappings;
    }

    ezGetAllCustomerMappings() {
        if (ezApi.ezIsNotValid(this.ezCustomerMappingsByCustomerId)) {
            return null;
        }

        return this.ezCustomerMappingsByCustomerId;
    }
	
	ezGetAllIntegrationEmployees() {
        if (ezApi.ezIsNotValid(this.integrationEmployees)) {
            return null;
        }

        return this.integrationEmployees;
	}
	ezGetAllIntegrationCustomers() {
        if (ezApi.ezIsNotValid(this.integrationCustomers)) {
            return null;
        }

        return this.integrationCustomers;
	}
	ezGetOath2SessionExists() {
        if (ezApi.ezIsNotValid(this.oath2SessionExists)) {
            return false;
        }

        return this.oath2SessionExists;
	}
	ezGetOauth2LoginUrl() {
        if (ezApi.ezIsNotValid(this.oauth2LoginUrl)) {
            return null;
        }

        return this.oauth2LoginUrl;
	}
    ezGetIntegrationCompanyName() {
        if (ezApi.ezIsNotValid(this.integrationCompanyName)) {
            return null;
        }

        return this.integrationCompanyName;
    }

    /**
        Validates the provided ezEmployeeIntegrationMapRequest meets the request requirements.
        @param {EzEmployeeIntegrationMapRequest} ezEmployeeIntegrationMapRequest
        @returns {Boolean}
     */
    ezValidateEzEmployeeIntegrationMapRequest(ezEmployeeIntegrationMapRequest) {
        return ezApi.ezIsValid(ezEmployeeIntegrationMapRequest) &&
            ezApi.ezIsNumber(ezEmployeeIntegrationMapRequest.ezEmployeeId) &&
            0 >= ezEmployeeIntegrationMapRequest.ezEmployeeId;
    }

    /**
        Adds the provided ezEmployeeIntegrationMapRequest value to the request
        @param {EzEmployeeIntegrationMapRequest} ezEmployeeIntegrationMapRequest
     */
    ezAddEzEmployeeIntegrationMapRequest(ezEmployeeIntegrationMapRequest) {
        if (!this.ezValidateEzEmployeeIntegrationMapRequest(ezEmployeeIntegrationMapRequest)) {
            throw ezApi.ezBadParam('dataTagIntegrationMapRequest', self.ezTypeName,
                'ezAddEzEmployeeIntegrationMapRequest');
        }

        this.ezEmployeeMappingsByEmployeeId[ezEmployeeIntegrationMapRequest.ezEmployeeId] =
            ezEmployeeIntegrationMapRequest;
    }

    /**
        @public
        Returns the EzEmployeeIntegrationMapRequest for the given employee Id.
        @param {Number} employeeId
        @returns {EzEmployeeIntegrationMapRequest}
     */
    ezGetEmployeeMappingForEmployeeId(employeeId) {
        if (!ezApi.ezIsNumber(employeeId)) {
            throw ezApi.ezBadParam('employeeId', self.ezTypeName, 'ezGetEmployeeMappingForEmployeeId');
        }
        if (employeeId < 0) {
            throw ezApi.ezBadParam('employeeId', self.ezTypeName, 'ezGetEmployeeMappingForEmployeeId');
        }

        let employeeIdString = employeeId.toString();
        return ezApi.ezHasOwnProperty(this.ezEmployeeMappingsByEmployeeId, employeeIdString)
            ? this.ezEmployeeMappingsByEmployeeId[employeeIdString]
            : null;
    }
	
	/** customer mapping **/
    ezValidateEzCustomerIntegrationMapRequest(ezCustomerIntegrationMapResponse) {
        return ezApi.ezIsValid(ezCustomerIntegrationMapResponse) &&
            ezApi.ezIsNumber(ezCustomerIntegrationMapResponse.ezDataTagId) &&
            0 >= ezCustomerIntegrationMapResponse.ezDataTagId;
    }

    /**
        Adds the provided ezCustomerIntegrationMapRequest value to the request
        @param {ezCustomerIntegrationMapResponse} ezCustomerIntegrationMapResponse
     */
    ezAddEzCustomerIntegrationMapRequest(ezCustomerIntegrationMapResponse) {
        if (!this.ezValidateEzCustomerIntegrationMapRequest(ezCustomerIntegrationMapResponse)) {
            throw ezApi.ezBadParam('dataTagIntegrationMapRequest', self.ezTypeName,
                'ezAddezCustomerIntegrationMapResponse');
        }

        this.ezCustomerMappingsByCustomerId[ezCustomerIntegrationMapResponse.ezDataTagId] =
            ezCustomerIntegrationMapResponse;
    }

    /**
        @public
        Returns the ezCustomerIntegrationMapResponse for the given employee Id.
        @param {Number} ezDataTagId
        @returns {ezCustomerIntegrationMapResponse}
     */
    ezGetCustomerMappingForCustomerId(ezDataTagId) {
        if (!ezApi.ezIsNumber(ezDataTagId)) {
            throw ezApi.ezBadParam('ezDataTagId', self.ezTypeName, 'ezGetCustomerMappingForCustomerId');
        }
        if (ezDataTagId < 0) {
            throw ezApi.ezBadParam('ezDataTagId', self.ezTypeName, 'ezGetCustomerMappingForCustomerId');
        }

        let customerIdString = ezDataTagId.toString();
        return ezApi.ezHasOwnProperty(this.ezCustomerMappingsByCustomerId, customerIdString)
            ? this.ezCustomerMappingsByCustomerId[customerIdString]
            : null;
    }
	
}

export {
    EzIntegrationSetupResponse
};
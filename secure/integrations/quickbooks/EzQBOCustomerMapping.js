import { EzIntegrationProviderId } from '/secure/integrations/ez-integration-enums.js';
import { CustomerIntegrationMapRequest } from '/secure/integrations/entities/CustomerIntegrationMapRequest.js';


export class EzQBOCustomerMapping {
	
    constructor() {
    }

	//build a <option> list of all QBO customs
	buildProviderCustomerOptions(ezApi, self, onlineCustomers, jobCode) {
	
        if (!ezApi.ezArrayHasLength(onlineCustomers)) {
            return ezApi.ezTemplate`
                <option value="-1" selected>
                    No Customers
                </option>`;
        }

        let selectedQBOCustomerId = null; 
		for (let qboEmp of onlineCustomers) {
			if (jobCode.id === qboEmp.ezDataTagId) {
				selectedQBOCustomerId = qboEmp.providerCustomerId;
				break;
			}
		}
		
        let customerNotSelected = 'selected';
		if (selectedQBOCustomerId) {
			customerNotSelected = '';
		}

        let selectOptions = ezApi.ezTemplate`
            <option
                value="-1"
                ${customerNotSelected}>
                [ Select an QBO Customer ]
            </option>`;
			
		let customers = [];
		onlineCustomers.forEach(
			(onlineCustomer) => {
			   let obj = {};
			   obj.fullName = ezApi.ezStringOrEmpty(onlineCustomer.customerName);
			   obj.providerCustomerId = onlineCustomer.providerCustomerId;
			   customers.push(obj);
		});
					
        customers.forEach(
            (customer) => {
                let isSelected = (customer.providerCustomerId == selectedQBOCustomerId)
                    ? 'selected'
                    : '';
				selectOptions = ezApi.ezTemplate`${selectOptions}
					<option
						id="_SelectCustomer_${customer.providerCustomerId}"
						value="${customer.providerCustomerId}"
						${isSelected}>
						${customer.fullName}
					</option>`;
            });

        return selectOptions;
						
	}
	
	
    /**
        @protected @method
        Adds the employee mappings to the provided integrationSetupRequest
        @param {EzQBOIntegrationSetupRequest} integrationSetupRequest
    */
    ezApplyJobMappings(ezApi, self, integrationSetupRequest, ezJobCodesById, ezDialogId, onlineCustomers, findQBOnlineCustomerMap) {
        if (!ezApi.ezIsValid(integrationSetupRequest)) {
            throw new EzBadParamException(
                'integrationSetupRequest',
                EzQBOIntegrationSetupDialog.ezInstance,
                EzQBOIntegrationSetupDialog.ezInstance.ezApplyJobMappings);
        }

        let mapIds = [];

        for (let prop in ezJobCodesById) {
            let employee = ezJobCodesById[prop];
			let customerIdStr = employee.id.toString();
			let onlineCustomerId = `${ezDialogId}_onlineCustomer_${customerIdStr}`;

			let selectId = `${ezDialogId}_onlineCustomer_${customerIdStr}`;
			let selectedProviderEmployeeId = ezApi.ezclocker.ezUi.ezGetInputValue(selectId);

			if (ezApi.ezElementExists(onlineCustomerId)) {
				let customerIntegrationMapRequest = null;
				let matchedOnlineEmployee = null;
				for (let qboEmp of onlineCustomers) {
					if (selectedProviderEmployeeId === qboEmp.providerCustomerId) {
						customerIntegrationMapRequest = findQBOnlineCustomerMap(qboEmp.providerCustomerId);
						matchedOnlineEmployee = qboEmp;
						break;
					}
				}
				
				if (ezApi.ezIsNotValid(customerIntegrationMapRequest)) {
					customerIntegrationMapRequest = new CustomerIntegrationMapRequest();
				}
				let mapKey = selectedProviderEmployeeId;
				ezApi.ezclocker.ezUi.ezRemoveElementClass(onlineCustomerId, 'ez-input-validation-error');

				if (matchedOnlineEmployee && ezApi.ezStringHasLength(mapKey)) {
                    if (0 <= mapIds.indexOf(mapKey)) {
						console.log("dup customer mapping!!!");
						return onlineCustomerId;
					} else {
						mapIds.push(mapKey);
					}

					customerIntegrationMapRequest.ezEmployerId = employee.employerId;
					customerIntegrationMapRequest.mappedByEzUserId = ezApi.ezclocker.ezClockerContext.ezGetUserContext().userAccount.id;
					customerIntegrationMapRequest.ezDataTagId = employee.id;
					customerIntegrationMapRequest.ezEmployerIntegrationMapId = '';
					customerIntegrationMapRequest.providerConnectionId = matchedOnlineEmployee.providerConnectionId;
					customerIntegrationMapRequest.providerCustomerId = matchedOnlineEmployee.providerCustomerId;
					customerIntegrationMapRequest.providerCustomerName = matchedOnlineEmployee.customerName;
					
				    integrationSetupRequest.ezAddCustomerIntegrationMapRequest(customerIntegrationMapRequest);
                    }
                }
            };
		return null;
    }

}


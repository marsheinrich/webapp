import { EzEnum } from '/ezlibrary/enums/EzEnum.js';


/**
 * Enumeration that defines the possible mapping lists for integration setup dialogs.
 */
class EzIntegrationMappingViewType extends EzEnum {
    static get UNKNOWN() {
        return 'UNKNOWN';
    }
    static get _UNKNOWN() {
        return {
            display: 'UNKNOWN',
            idSuffix: 'UNKNOWNMappingView'
        };
    }
    static get EMPLOYEE_MAPPING() {
        return 'EMPLOYEE_MAPPING';
    }
    static get _EMPLOYEE_MAPPING() {
        return {
            display: 'Integration Employee Mapping',
            idSuffix: 'EmployeeMappingList'
        };
    }
    static get PAY_RATE_MAPPING() {
        return 'PAY_RATE_MAPPING';
    }
    static get _PAY_RATE_MAPPING() {
        return {
            display: 'Integration Pay Rate Mapping',
            idSuffix: 'PayRateMappingView'
        };
    }
    static get HOURS_TYPE_MAPPING() {
        return 'HOURS_TYPE_MAPPING';
    }
    static get _HOURS_TYPE_MAPPING() {
        return {
            display: 'Integration Hour Types Mapping',
            idSuffix: 'HoursTypeMappingView'
        };
    }
    static get JOB_MAPPING() {
        return 'JOB_MAPPING';
    }
    static get _JOB_MAPPING() {
        return {
            display: 'Integration Job Mapping',
            idSuffix: 'JobMappingView'
        };
    }
    static get ADDITIONAL_RESOURCES() {
        return 'ADDITIONAL_RESOURCES';
    }
    static get _ADDITIONAL_RESOURCES() {
        return {
            display: 'Additional Resources and Help',
            idSuffix: 'AdditionalResourcesView'
        };
    }

    static ezToIdSuffix(enumValue) {
        return EzIntegrationMappingViewType[`_${enumValue.toUpperCase()}`]['idSuffix'];
    }
    static ezToDisplayValue(enumValue) {
        return EzIntegrationMappingViewType[`_${enumValue.toUpperCase()}`]['display'];
    }

    static ezApiName = 'ezACSIntegrationSetupDialog';
    static ezEventNames = {
        onReady: 'ezOn_EzIntegrationMappingViewType_Ready'
    };
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzIntegrationMappingViewType.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    static ezRegistrator() {
        if (EzIntegrationMappingViewType.ezCanRegister()) {
            EzIntegrationMappingViewType.ezInstance = ezApi.ezRegisterEnumeration(EzIntegrationMappingViewType);

            EzIntegrationMappingViewType.ezApiRegistrationState = 'REGISTERED';
        }
    }
    // Static constructor
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                this.ezRegistrator);
        }
    }

    constructor() {
        super();
    }
}

export {
    EzIntegrationMappingViewType
};
import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

/**
    Provides access to the internal ezClocker employee api
    Import with:
        import { EzEmployeeApi } from '/secure/javascript/common/ez-employee-api.js';

        globalThis.ezApi.ezclocker[EzEmployeeApi.ezApiName] &&
        globalThis.ezApi.ezclocker[EzEmployeeApi.ezApiName].ready &&

        document.addEventListener(
            EzEmployeeApi.ezEventNames.onReady,
            this.#ezRegistrator);
 */
class EzEmployeeApi extends EzClass {
    /** @public @static @field */
    static ezInstance = null;
    /** @public @static @field */
    static ezApiRegistrationState = null;

    static get ezApiName() {
        return 'ezEmployeeApi';
    }

    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzEmployeeApi_Ready'
        };
    }

    static get ezCanRegister() {
        return 'PENDING' === EzEmployeeApi.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready;
    }

    static #ezRegistrator() {
        if (!EzEmployeeApi.ezCanRegister) {
            return false;
        }

        ezApi.ezRegisterNewApi(
            EzEmployeeApi,
            EzEmployeeApi.ezApiName);

        EzEmployeeApi.ezApiRegistrationState = 'REGISTERED';
        return true;
    }

    // Static Constructor
    static {
        if (null === this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                () => {
                    if (!this.#ezRegistrator()) {
                        document.addEventListener(
                            EzHttpHelper.ezEventNames.onReady,
                            this.#ezRegistrator);

                        document.addEventListener(
                            EzNavigation.ezEventNames.onReady,
                            this.#ezRegistrator);
                    }
                });
        }
    }

    constructor() {
        super();
    }

    get API_GET_CURRENT_USER_EMPLOYEE_URL() {
        return ezApi.ezclocker.ezNavigation.getInternalClassicServiceUrl('employee/getEmployeeInfo');
    }

    get API_GET_EMPLOYEES_URL() {
        return ezApi.ezclocker.ezNavigation.getInternalApiServiceUrl('employees');
    }

    get API_GET_EMPLOYEE_URL() {
        return ezApi.ezclocker.ezNavigation.getInternalApiServiceUrl('employees/');
    }

    /**
     * Initalizes EzEmployeeApi
     * @protected
     */
    ezInit() {
        return EzEmployeeApi.ezInstance;
    }


    /**
     * Gets the employee for the currently logged in user (if any)
     * @returns {Promise}
     * @public
     */
    ezGetCurrentUserEmployee() {
        return ezApi.ezclocker.ezHttpHelper.ezGet(
            EzEmployeeApi.ezInstance.API_GET_CURRENT_USER_EMPLOYEE_URL);
    }

    /**
     * Get all the employees for the logged in user
     * @param {long} employerId
     * @returns {Promise}
     * @public
     */
    ezGetEmployees() {
        return ezApi.ezclocker.ezHttpHelper.ezGet(
            EzEmployeeApi.ezInstance.API_GET_EMPLOYEES_URL);
    }

    /**
     * Get employee data for the current logged in user's employer with the provided
     * employeeId
     * @param {long} employerId
     * @param {long} employeeId
     * @returns {Promise}
     * @public
     */
    ezGetEmployee(employeeId) {
        if (!ezApi.ezIsValid(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                EzEmployeeApi.ezInstance,
                EzEmployeeApi.ezInstance.ezGetEmployee);
        }

        return ezApi.ezclocker.ezHttpHelper.ezGet(
            `${EzEmployeeApi.ezInstance.API_GET_EMPLOYEE_URL}{employeeId}`);
    }
}

export {
    EzEmployeeApi
};
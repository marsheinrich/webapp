import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

/**
    Client API for ezClocker Employee services.
    Import with:
        import { EzEmployeeService } from '/secure/javascript/services/ezclocker-employee-service.js';

         // Can register
        globalThis.ezApi.ezclocker[EzEmployeeService.ezApiName] &&
        globalThis.ezApi.ezclocker[EzEmployeeService.ezApiName].ready;

        // Ready event
        document.addEventListener(
            EzEmployeeService.ezEventNames.onReady,
            this.#ezRegistrator);
 */
export class EzEmployeeService extends EzClass {
    /**
        @public @static @field
        @type {EzEmployeeService}
     */
    static ezInstance = null;

    /**
        @public @static @field
        @type {string}
     */
    static ezApiRegistrationState = null;

    /**
        @public @static @readonly @property
        @returns {string}
     */
    static get ezApiName() {
        return 'ezEmployeeService';
    }

    /**
        @public @static @readonly @property
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzEmployeeService_Ready'
        };
    }

    /**
        @public @static @method
        @returns {boolean}
     */
    static get ezCanRegister() {
        return 'PENDING' === EzEmployeeService.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready;
    }

    /**
        @public @static @method
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (!EzEmployeeService.ezCanRegister) {
            return false;
        }

        ezApi.ezRegisterNewApi(
            EzEmployeeService,
            EzEmployeeService.ezApiName);

        EzEmployeeService.ezApiRegistrationState = 'REGISTERED';
        return true;
    }

    // Static Constructor
    static {
        if (null === EzEmployeeService.ezApiRegistrationState) {
            EzEmployeeService.ezApiRegistrationState = 'PENDING';

            if (!EzEmployeeService.#ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    EzEmployeeService.#ezRegistrator);

                document.addEventListener(
                    EzHttpHelper.ezEventNames.onReady,
                    EzEmployeeService.#ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.onReady,
                    EzEmployeeService.#ezRegistrator);
            }
        }
    }

    /**
        @public @constructor
     */
    constructor() {
        super();
    }

    /**
        @protected @method
        Initialises EzEmployeeService
        @returns {EzEmployeeService}
     */
    ezInit() {
        return EzEmployeeService.ezInstance;
    }

    /**
        @deprecated
        Migrate to EzClockerContext functionality
        @public @method
        Gets the current employee's information
        @returns {Promise}
     */
    getCurrentUserEmployeeInfo() {
        return ezApi.ezclocker.ezHttpHelper.ezGet(
            ezApi.ezclocker.ezNavigation.getInternalClassicApiUrl('employee/getEmployeeInfo'))
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);
    }

    /**
        @deprecated
        Migrate to EzClockerContext functionality
        @public @method
        Gets the employer's employees
        @returns {Promise}
     */
    getEmployees(employerId, success, failure) {
        if (!ezApi.ezIsValid(employerId)) {
            ezApi.ezclocker.ezLogger.error(
                'Skipped getEmployees call due to bad or missing params.');
            return; // nothing to do or no one wants the data
        }

        let url = ezApi.ezclocker.ezNavigation.getInternalClassicApiUrl(`employee/getEmployees/${employerId}`);
        ezApi.ezclocker.ezHttpHelper.ezGet(url)
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
            .then(
                (response, jqXHR) => {
                    ezApi.callBack(success, response, jqXHR);
                },
                (eResponse, jqXHR) => {
                    ezApi.callBack(failure, eResponse, jqXHR);
                });
    }

    /**
        @deprecated
        Migrate to EzClockerContext functionality
        @public
        Obtains the employee data form the provided employer id.
        A valid response is an EzEntityCollectionResponse of IEzEmployeeEntity objects.
        @param {number} employerId
        @returns {Promise}
     */
    ezGetEmployees(employerId) {
        if (!ezApi.ezIsValid(employerId)) {
            let em = 'A valid employer id is required to get employees.';
            ezApi.ezclocker.ezLogger.error(em);
            return ezApi.ezReject(ezApi.ezBuildEzClockerErrorResponse(500, em));
        }

        return ezApi.ezclocker.ezHttpHelper.ezGet('/_api/v1/employer/employees')
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);
    }

    /**
        @deprecated
        Migrate to EzClockerContext functionality
        @public @method
        Gets employee data for the provided employerId and empoyeeId. Calls the provided success or failure
        call-back functions with the results.
        @param {number} employerId
        @param {number} employeeId
        @param {function} success
        @param {function} failure
     */
    getEmployeeData(employerId, employeeId, success, failure) {
        if (!ezApi.ezIsValid(employerId)) {
            throw new EzBadParamException(
                'employerId',
                EzEmployeeService.ezInstance,
                EzEmployeeService.ezInstance.getEmployeeData);
        }
        if (!ezApi.ezIsValid(employerId)) {
            throw new EzBadParamException(
                'employeeId',
                EzEmployeeService.ezInstance,
                EzEmployeeService.ezInstance.getEmployeeData);
        }
        if (!ezApi.ezIsFunction(success) || !ezApi.ezIsFunction(failure)) {
            // No call back handlers
            return;
        }

        ezApi.ezclocker.ezHttpHelper.ezGet(
            ezApi.ezclocker.ezNavigation.ezGetInternalClassicApiUrl(`employee/get/${employerId}/${employeeId}`))
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
            .then(
                (response, jqXHR) => {
                    ezApi.callBack(success, response, jqXHR);
                },
                (eResponse, jqXHR) => {
                    ezApi.callBack(failure, eResponse, jqXHR);
                });
    }

    /**
        @deprecated
        Migrate to EzClockerContext functionality
        @public
        Gets the employee identified by the provided employerId and employeeId from the ezClocker services.
        @param {Number} employerId
        @param {Number} employeeId
        @returns {Promise}
     */
    ezGetEmployee(employeeId) {
        if (!ezApi.ezIsNumber(employeeId)) {
            ezApi.ezclocker.ezLogger.error(
                'A valid employee id is required in call to ezEmployeeService.ezGetEmployee()');
            return;
        }

        return ezApi.ezclocker.ezHttpHelper.ezGet(
            ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(`employees/${employeeId}`, 'v2'))
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);
    }

    /**
        @deprecated
        Migrate to EzClockerContext functionality
        Will remove in a future release.
        @public @method
        Migrated from ezclocker-employee.js
        Returns the logged in employee's employee information via the callback functions provided.
        @param {function} successHandler
        @param {function} failureHandler
     */
    ezGetLoggedInEmployeeInfo(successHandler, failureHandler) {
        if (!ezApi.ezIsFunction(successHandler) && !ezApi.ezIsFunction(failureHandler)) {
            // No call back handlers, ignore the call
            return;
        }

        ezApi.ezclocker.ezHttpHelper.ezGet(
            ezApi.ezclocker.ezNavigation.getInternalClassicServiceUrl('employee/getEmployeeInfo'))
            .then(
                (response, jqXHR)  => {
                    if (ezApi.ezIsFunction(successHandler)) {
                        successHandler(response, jqXHR);
                    }
                },
                (eResponse, jqXHR) => {
                    if (ezApi.ezIsFunction(failureHandler)) {
                        failureHandler(eResponse, jqXHR);
                    }
                });
    }
}

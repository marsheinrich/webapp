import { EzClass } from '/ezlibrary/EzClass.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

/**
    @deprecated
    Migrate to ezclocker-employee-service.js functionality
    Will remove in future release.
    @global
    Legacy Global Variables
*/
var _InternalEmployeeServiceBaseUrl = null;

/**
    @deprecated
    Migrate to ezclocker-employee-service.js functionality
    Will remove in future release.
    @global
 */
var _Internal_GetEmployeeInfo_Url = null;

/**
    @deprecated
    Migrate to ezclocker-employee-service.js functionality
    Will remove in future release.
 */
class EmployeeService extends EzClass {
    /**
        @deprecated
        Migrate to EzEmployeeService functionality in ezclocker-employee-service.js
        @public @static @field
     */
    static ezInstance = null;
    /**
        @deprecated
        Migrate to EzEmployeeService functionality in ezclocker-employee-service.js
        @public @static @field
     */
    static ezApiRegistrationState = null;

    /**
        @deprecated
        Migrate to EzEmployeeService functionality in ezclocker-employee-service.js
        @public @static @readonly @property
    */
    static get ezApiName() {
        return 'employeeService';
    }
    /**
        @deprecated
        Migrate to EzEmployeeService functionality in ezclocker-employee-service.js
        @public @static @readonly @property
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EmployeeService_Ready',
        };
    }

    /**
        @deprecated
        Migrate to EzEmployeeService functionality in ezclocker-employee-service.js
        @public @static @readonly @property
    */
    static get ezCanRegister() {
        return 'PENDING' === EmployeeService.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready;
    }

    /**
        @private @static @method
    */
    static #ezRegistrator() {
        if (!EmployeeService.ezCanRegister) {
            return false;
        }
        EmployeeService.ezInstance = ezApi.ezRegisterNewApi(
            EmployeeService,
            EmployeeService.ezApiName);
        EmployeeService.ezApiRegistrationState = 'REGISTERED';
        return true;
    }

    // Static Constructor
    static {
        if (null === this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            if (!this.#ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    this.#ezRegistrator);

                document.addEventListener(
                    EzHttpHelper.ezEventNames.onReady,
                    this.#ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.onReady,
                    this.#ezRegistrator);
            }
        }
    }

    /**
        @deprecated
        Migrate to EzEmployeeService functionality in ezclocker-employee-service.js
        @public @constructor
     */
    constructor() {
        super();
    }

    /**
        @deprecated
        Migrate to EzEmployeeService.ezGetLoggedInEmployeeInfo(successHandler, failureHandler) in
        ezclocker-employee-serice.js file.
        Will remove EmployeeService.getLoggedInEmployeeInfo(successHandler, failureHandler) in future release.
        @public @method
        Returns the logged in employee's employee information via the callback functions provided.
        @param {function} successHandler
        @param {function} failureHandler
     */
    getLoggedInEmployeeInfo(successHandler, failureHandler) {
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

export {
    EmployeeService,
    _Internal_GetEmployeeInfo_Url,
    _InternalEmployeeServiceBaseUrl
};

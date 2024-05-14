import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzClass } from '/ezlibrary/EzClass.js';
import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzClockerContextEventName } from '/ezlibrary/EzClockerContext/EzClockerContextEventName.js';
import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

import { EzServices } from '/public/javascript/common/ez-services.js';
import { EzUI } from '/public/javascript/common/ezui.js';

/**
    Provides support for employee archive operations
    Import with:
    import { EzEmployeeArchiveHelper } from '/secure/archive/ez-employee-archive-helper.js';
 */
export class EzEmployeeArchiveHelper extends EzClass {
    static ezInstance = null;
    static ezApiRegistrationState = null;

    static get ezApiName() {
        return 'ezEmployeeArchiveHelper';
    }

    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzEmployeeArchiveHelper_Ready',
        };
    }

    static get ezCanRegister() {
        return 'PENDING' === EzEmployeeArchiveHelper.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] .ready &&

            globalThis.ezApi.ezclocker[EzServices.ezApiName] &&
            globalThis.ezApi.ezclocker[EzServices.ezApiName] .ready &&

            globalThis.ezApi.ezclocker[EzClockerContextEventName.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerContextEventName.ezApiName] .ready &&

            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName] .ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName] .ready;
    }

    static #ezRegistrator() {
        if (!EzEmployeeArchiveHelper.ezCanRegister) {
            return false;
        }

        EzEmployeeArchiveHelper.ezInstance = ezApi.ezRegisterNewApi(EzEmployeeArchiveHelper);
        EzEmployeeArchiveHelper.ezApiRegistrationState = 'REGISTERED';
        return true;
    }

    // Static constructor
    static {
        if (null == EzEmployeeArchiveHelper.ezApiRegistrationState) {
            EzEmployeeArchiveHelper.ezApiRegistrationState = 'PENDING';

            if (!EzEmployeeArchiveHelper.#ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    () => {
                        if (!this.#ezRegistrator()) {

                            document.addEventListener(
                                EzEventEngine.ezEventNames.onReady,
                                EzEmployeeArchiveHelper.#ezRegistrator);

                            document.addEventListener(
                                EzServices.ezEventNames.onReady,
                                EzEmployeeArchiveHelper.#ezRegistrator);

                            document.addEventListener(
                                EzClockerContextEventName.ezEventNames.onReady,
                                EzEmployeeArchiveHelper.#ezRegistrator);

                            document.addEventListener(
                                EzClockerContext.ezEventNames.onReady,
                                EzEmployeeArchiveHelper.#ezRegistrator);

                            document.addEventListener(
                                EzUI.ezEventNames.onReady,
                                EzEmployeeArchiveHelper.#ezRegistrator);
                        }
                    });
            }
        }
    }

    /**
        @public @constructor
        Creates a new instance of EzEmployeeArchiveHelper
     */
    constructor() {
        super();
    }

    /**
        @protected
        Initializes EzEmployeeArchiveHelper
        @returns {EzEmployeeArchiveHelper}
     */
    ezInit() {
        return EzEmployeeArchiveHelper.ezInstance;
    }

    /**
        @public @method
        Archives the employee for the passed employer
        Original: navigateToAccount
        @param employerId
        @param employeeId
        @returns {Promise.resolve}
        Resolve returns response OR eResponse object.
     */
    ezArchiveEmployee(employeeId, modifiedBy, generateArchiveLog) {
        if (!ezApi.ezIsNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                self,
                self.ezArchiveEmployee);
        }

        if (!ezApi.ezStringHasLength(modifiedBy)) {
            modifiedBy = '';
        }

        generateArchiveLog = ezApi.ezIsTrue(generateArchiveLog);

        return ezApi.ezAsyncAction(
            (finished) => {
                ezApi.ezclocker.ezHttpHelper.ezPost(
                    ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                        ezApi.ezUrlTemplate`employees/archive/${employeeId}
                            ?target-time-zone-id=${ezApi.ezclocker.ezDateTime.activeTimeZone}
                            &modified-by=${modifiedBy}
                            &generate-archive-log=${generateArchiveLog}`,
                        'v1'),
                    true,
                    null,
                    false)
                    .then(
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                    .then(
                        finished,
                        finished);
            });
    }

    /**
        @public @method
        Un-archives the employee associated with the provided employeId
        @param {number} employerId
        @param {number} employeeId
        @returns {Promise.resolve}
        Resolve returns response OR eResponse object.
     */
    ezActivateEmployee(archivedEmployeeId, generateUnarchiveLog) {
        if (!ezApi.ezIsNumber(archivedEmployeeId)) {
            throw new EzBadParamException(
                'archivedEmployeeId',
                EzEmployeeArchiveHelper.ezInstance,
                EzEmployeeArchiveHelper.ezInstance.ezActivateEmployee);
        }

        generateUnarchiveLog = ezApi.ezIsTrue(generateUnarchiveLog);

        return ezApi.ezAsyncAction(
            (finished) => {
                ezApi.ezclocker.ezHttpHelper.ezPost(
                    ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                        ezApi.ezUrlTemplate`employees/archive/unarchive/
                            ${archivedEmployeeId}
                            ?generate-archive-log=${generateUnarchiveLog}`))
                    .then(
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                        ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                    .then(
                        finished,
                        finished);
            });
    }

    /**
        @public @method
        Returns the status of any active archive/unarchive
        @param {number} employeeId
        @returns {promise}
     */
    ezGetArchiveUnarchiveStatusForEmployeeId(employeeId) {
        if (!EzNumber.isNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                EzEmployeeArchiveHelper.ezInstance,
                EzEmployeeArchiveHelper.ezInstance.ezGetArchiveUnarchiveStatusForEmployeeId);
        }

        // TODO: Finish status service

        return ezApi.ezclocker.ezHttpHelper.ezGet(
            EzUrl.build`
                /_api/v1/employees/archive
                /${employeeId}
                /status`)
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);
    }
}

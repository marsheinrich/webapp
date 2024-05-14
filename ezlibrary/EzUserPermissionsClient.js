import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzNumber,
    EzString,
    EzPromise,
    EzUrl
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzUserPermissionType
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';
import { EzUserPermission } from '/ezlibrary/EzUserPermission.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

/**
 * @class
 * @extends {EzClass}
 * @description
 * Provides access to the UserPermission api
 * ---------------------------------------------------------------------------
 * Import with:
 *      import { EzUserPermissionsClient } from '/ezlibrary/EzUserPermissionsClient.js';
 * ---------------------------------------------------------------------------
 * Listen to onReady event:
 *     document.addEventListener(
 *         EzUserPermissionsClient.ezEventNames.onReady,
 *         this.#ezRegistrator);
 * ---------------------------------------------------------------------------
 * Singleton Instance Reference:
 *     Inside this class...: EzUserPermissionsClient.ezInstance
 *     Outside this class..: ezApi.ezclocker.ezUserPermissionsClient
 * ---------------------------------------------------------------------------
 */
export class EzUserPermissionsClient extends EzClass {
    /**
     * @static
     * @public @readonly @property
     * Returns the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezUserPermissionsClient';
    }

    /**
     * @static
     * @public @readonly @property
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzUserPermissionsClient_Ready',
            onEmployeeComboSelectionChanged: 'ezOn_EzUserPermissionsClient_EmployeeComboChange'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzUserPermissionsClient}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzUserPermissionsClient.ezApiName])
        ? globalThis.ezApi.ezclocker[EzUserPermissionsClient.ezApiName]
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzUserPermissionsClient}
     */
    static get ezInstance() {
        return EzUserPermissionsClient.#ezInstance;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzUserPermissionsClient} instance
     */
    static set ezInstance(instance) {
        if (null != EzUserPermissionsClient.#ezInstance) {
            throw new Error('EzUserPermissionsClient\'s singleton instance is already reigstered with EzApi.');
        }

        EzUserPermissionsClient.#ezInstance = instance;
    }

    /**
     * @static
     * @private @field
     * Stores the EzApi registration state for this class.
     * Default value is NULL
     * Class is registerd with EzApi when value is EzRegistrationState.REGISTERED
     * @type {string}
     * A valid enum property value from EzRegistrationState
     */
    static #ezApiRegistrationState = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzUserPermissionsClient.ezApiName])
        ? EzRegistrationState.REGISTERED
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the ezApi registration state of this classes's singleton instance.
     * @returns {string}
     * A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzUserPermissionsClient.#ezApiRegistrationState;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzUserPermissionsClient.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @static
     * @private @readonly @property
     * Returns true when all required dependencies for this class report ready.
     * In otherwords, the require dependency's singleton instance is created
     * and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return 'PENDING' === EzUserPermissionsClient.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzUserPermissionsClient.ezInstance &&
            EzRegistrationState.REGISTERED === EzUserPermissionsClient.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzUserPermissionsClient.#ezCanRegister && !EzUserPermissionsClient.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzUserPermissionsClient, EzUserPermissionsClient.ezApiName);
        }

        return EzUserPermissionsClient.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzUserPermissionsClient.ezApiName
     *     2) Property getter EzUserPermissionsClient.ezEventNames
     *     3) Property getter EzUserPermissionsClient.ezInstance
     *     4) Property setter EzUserPermissionsClient.ezInstance
     *     5) Property getter EzUserPermissionsClient.ezApiRegistrationState
     *     6) Property setter EzUserPermissionsClient.ezApiRegistrationState
     *     7) Property getter EzUserPermissionsClient.#ezCanRegister
     *     8) Property getter EzUserPermissionsClient.#ezIsRegistered
     *     9) Method EzUserPermissionsClient.#ezRegistrator()
     */
    static {
        if (null == EzUserPermissionsClient.ezApiRegistrationState) {
            EzUserPermissionsClient.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzUserPermissionsClient.#ezRegistrator()) {
                document.addEventListener(
                    EzUserPermissionsClient.ezOnEzApiReadyEventName,
                    EzUserPermissionsClient.#ezRegistrator);

                document.addEventListener(
                    EzHttpHelper.ezEventNames.onReady,
                    EzUserPermissionsClient.#ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.onReady,
                    EzUserPermissionsClient.#ezRegistrator);
            }
        }
    }

    /**
     * @public @method
     * Initializes EzUserPermissionsClient
     * @returns {EzUserPermissionsClient}
     */
    ezInit() {
        return EzUserPermissionsClient.ezInstance;
    }

    /**
     * @public @method
     * Reads all the active employee's user permissions
     * @param {EzClockerIdContext} ezClockerIdContext
     * @returns {Promise}
     * Resolve returns an array of EzUserPermission
     * Reject returns error response
     */
    ezReadAllEmployeeUserPermissions(ezClockerIdContext) {
        if (!EzObject.isValid(ezClockerIdContext) || !EzNumber.isNumber(ezClockerIdContext.ezGetActiveEmployerId()) ||
            !EzNumber.isNumber(ezClockerIdContext.ezGetActiveEmployeeId())) {
            throw new EzBadParamException(
                'ezClockerIdContext',
                EzUserPermissionsClient.ezInstance,
                EzUserPermissionsClient.ezInstance.readAllEmployeeUserPermissions(ezClockerIdContext));
        }

        return ezApi.ezPromise(
            (resolve, reject) => ezApi.ezclocker.ezHttpHelper.ezGet(
                ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                    EzUrl.build`
                        users/permissions
                        /employee/${ezClockerIdContext.ezGetActiveEmployeeId()}`,
                    'v1'),
                true,
                null,
                false)
                .then(
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                .then(
                    (response) => {
                        let ezUserPermissions = [];

                        for (let userPermisson of response.entities) {
                            ezUserPermissions.push(
                                new EzUserPermission(
                                    userPermisson.employerId,
                                    userPermisson.employeeId,
                                    userPermisson.permissionId,
                                    userPermisson.permissionValue,
                                    userPermisson.enabled));
                        }

                        return resolve(ezUserPermissions);
                    },
                    (eResponse) => reject(eResponse)));
    }

    /**
     * @public @method
     * Reads the active employee's user permission associated with the provied permissionId
     * @param {EzClockerIdContext} ezClockerIdContext
     * @param {string} permissionId
     * @returns {Promise}
     * Resolve returns EzUserPermission
     * Reject returns error response
     */
    ezReadEmployeeUserPermissionForPermissionId(ezClockerIdContext, permissionId) {
        if (!EzObject.isValid(ezClockerIdContext) || !EzNumber.isNumber(ezClockerIdContext.ezGetActiveEmployerId()) ||
            !EzNumber.isNumber(ezClockerIdContext.ezGetActiveEmployeeId())) {
            throw new EzBadParamException(
                'ezClockerIdContext',
                EzUserPermissionsClient.ezInstance,
                EzUserPermissionsClient.ezInstance.readEmployeeUserPermissionForPermissionId);
        }
        if (!EzString.hasLength(permissionId)) {
            throw new EzBadParamException(
                'permissionId',
                EzUserPermissionsClient.ezInstance,
                EzUserPermissionsClient.ezInstance.readEmployeeUserPermissionForPermissionId);
        }

        return EzPromise.promise(
            (resolve, reject) => ezApi.ezclocker.ezHttpHelper.ezGet(
                ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                    EzUrl.build`
                        users/permissions
                        /employee/${ezClockerIdContext.ezGetActiveEmployeeId()}
                        /permission/${permissionId}`,
                    'v1'),
                true,
                null,
                false)
                .then(
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                .then(
                    (response) => {
                        return resolve(
                            EzObject.isValid(response.entity)
                                ? new EzUserPermission(
                                    response.entity.employerId,
                                    response.entity.employeeId,
                                    response.entity.permissionId,
                                    response.entity.permissionValue,
                                    response.entity.enabled)
                                : new EzUserPermission(
                                    ezClockerIdContext.ezGetActiveEmployerId(),
                                    ezClockerIdContext.ezGetActiveEmployeeId(),
                                    permissionId,
                                    EzUserPermissionType.ezInstance.ezGetDefaultValue(permissionId),
                                    EzUserPermissionType.ezInstance.ezGetDefaultEnabled(permissionId)
                                ));
                    },
                    (eResponse) => reject(eResponse)));
    }

    /**
     * @public @method
     * Reads the active employee's user permission associated with the provied userPermissionId
     * @param {EzClockerIdContext} ezClockerIdContext
     * @param {number} userPermissionId
     * @returns {Promise}
     * Resolve returns EzUserPermission
     * Reject returns error response
     */
    ezReadEmployeeUserPermissionForUserPermissionId(ezClockerIdContext, userPermissionId) {
        if (!EzObject.isValid(ezClockerIdContext) || !EzNumber.isNumber(ezClockerIdContext.ezGetActiveEmployerId()) ||
            !EzNumber.isNumber(ezClockerIdContext.ezGetActiveEmployeeId())) {
            throw new EzBadParamException(
                'ezClockerIdContext',
                EzUserPermissionsClient.ezInstance,
                EzUserPermissionsClient.ezInstance.readEmployeeUserPermissionForUserPermissionId);
        }
        if (!EzNumber.isNumber(userPermissionId)) {
            throw new EzBadParamException(
                'userPermissionId',
                EzUserPermissionsClient.ezInstance,
                EzUserPermissionsClient.ezInstance.readEmployeeUserPermissionForUserPermissionId);
        }

        return EzPromise.promise(
            (resolve, reject) => ezApi.ezclocker.ezHttpHelper.ezGet(
                ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                    EzUrl.build`
                        users/permissions
                        /${userPermissionId}`,
                    'v1'))
                .then(
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                    ezApi.ezclocker.ezHttpHelper.ezProcessApiReject)
                .then(
                    (response) => {
                        return resolve(
                            EzObject.isValid(response.entity)
                                ? new EzUserPermission(
                                    response.entity.employerId,
                                    response.entity.employeeId,
                                    response.entity.permissionId,
                                    response.entity.permissionValue,
                                    response.entity.enabled)
                                : null);
                    },
                    reject));
    }

    /**
     * @public @method
     * Saves the active emplyee's user permission
     * @param {EzClockerIdContext} ezClockerIdContext
     * @param {EzUserPermission} ezUserPermission
     * @returns {Promise}
     * Resolve returns the success response
     * Reject returns the error response
     */
    ezSaveEmployeeUserPermission(ezClockerIdContext, ezUserPermission) {
        if (!EzObject.isValid(ezClockerIdContext) || !EzNumber.isNumber(ezClockerIdContext.ezGetActiveEmployerId()) ||
            !EzNumber.isNumber(ezClockerIdContext.ezGetActiveEmployeeId())) {
            throw new EzBadParamException(
                'ezClockerIdContext',
                EzUserPermissionsClient.ezInstance,
                EzUserPermissionsClient.ezInstance.saveEmployeeUserPermission);
        }
        if (!EzObject.isValid(ezUserPermission) || !ezUserPermission.ezIsValid()) {
            throw new EzBadParamException(
                'ezUserPermission',
                EzUserPermissionsClient.ezInstance,
                EzUserPermissionsClient.ezInstance.saveEmployeeUserPermission);
        }

        ezUserPermission.employerId = ezClockerIdContext.ezGetActiveEmployerId();

        ezUserPermission.employeeId = ezClockerIdContext.ezGetActiveEmployeeId();

        return ezApi.ezclocker.ezHttpHelper.ezPost(
            ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                `users/permissions`,
                'v1'),
            EzJson.toJson(ezUserPermission))
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);
    }

    /**
     * @public @method
     * Removes the active employee's user permission identified by the provied ezUserPermission.
     * @param {EzClockerIdContext} ezClockerIdContext
     * @param {EzUserPermission} ezUserPermission
     * @returns {Promise}
     * Resolve returns the success response
     * Reject returns the error response
     */
    ezRemoveEmployeeUserPermission(ezClockerIdContext, ezUserPermission) {
        if (!EzObject.isValid(ezClockerIdContext) || !EzNumber.isNumber(ezClockerIdContext.ezGetActiveEmployerId()) ||
            !EzNumber.isNumber(ezClockerIdContext.ezGetActiveEmployeeId())) {
            throw new EzBadParamException(
                'ezClockerIdContext',
                EzUserPermissionsClient.ezInstance,
                EzUserPermissionsClient.ezInstance.removeEmployeeUserPermission);
        }
        if (!EzObject.isValid(ezUserPermission) || !ezUserPermission.ezIsValid()) {
            throw new EzBadParamException(
                'ezUserPermission',
                EzUserPermissionsClient.ezInstance,
                EzUserPermissionsClient.ezInstance.removeEmployeeUserPermission);
        }

        ezUserPermission.employerId = ezClockerIdContext.ezGetActiveEmployerId();

        ezUserPermission.employeeId = ezClockerIdContext.ezGetActiveEmployeeId();

        return ezApi.ezclocker.ezHttpHelper.ezDelete(
            ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                EzUrl.build`
                    users/permissions
                    /${ezUserPermission}`,
                'v1'))
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);
    }

    /**
     * @public @method
     * Removes all of the active employee's user permissions who's permissionId equals the one provided
     * @param {EzClockerIdContext} ezClockerIdContext
     * @param {string} permissionId
     * @returns {Promise}
     * Resolve returns the success response
     * Reject returns the error response
     */
    ezRemoveAllEmployeeUserPermissionForPermissionId(ezClockerIdContext, permissionId) {
        if (!EzObject.isValid(ezClockerIdContext) || !EzNumber.isNumber(ezClockerIdContext.ezGetActiveEmployerId()) ||
            !EzNumber.isNumber(ezClockerIdContext.ezGetActiveEmployeeId())) {
            throw new EzBadParamException(
                'ezClockerIdContext',
                EzUserPermissionsClient.ezInstance,
                EzUserPermissionsClient.ezInstance.removeAllEmployeeUserPermissionForPermissionId);
        }
        if (!EzString.hasLength(permissionId)) {
            throw new EzBadParamException(
                'permissionId',
                EzUserPermissionsClient.ezInstance,
                EzUserPermissionsClient.ezInstance.removeAllEmployeeUserPermissionForPermissionId);
        }

        return ezApi.ezclocker.ezHttpHelper.ezDelete(
            ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                EzUrl.build`
                    users/permissions
                    /employee/${ezClockerIdContext.ezGetActiveEmployeeId()}
                    /permission/${permissionId}`,
                'v1'))
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);
    }
}
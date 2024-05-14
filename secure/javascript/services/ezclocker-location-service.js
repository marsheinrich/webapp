import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzLocationEntity } from '/secure/javascript/services/entities/EzLocationEntity.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

/**
    Access to the internal location api located at: /_api/v1/location
    Java Service: com.ezclocker.services.internal.rest.InternalLocationRESTController.java
    ---------------------------------------------------------------------------
    Import with:
        import { EzLocationService } from '/secure/javascript/services/ezclocker-location-service.js';
    ---------------------------------------------------------------------------
    Singleton instance ready for use when the below evaluates to true:
        globalThis.ezApi.ezclocker[EzLocationService.ezApiName] &&
        globalThis.ezApi.ezclocker[EzLocationService.ezApiName].ready
    ---------------------------------------------------------------------------
    Listen to onReady event:
        document.addEventListener(
            EzLocationService.ezEventNames.onReady,
            this.#ezRegistrator);
    ---------------------------------------------------------------------------
    Singleton Instance Reference:
        ezApi.ezclocker.ezLocationService
    ---------------------------------------------------------------------------
 */
class EzLocationService extends EzClass {
    /**
        @public @static @field
        @type {EzLocationService}
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
        return 'ezLocationService';
    }

    /**
        @public @static @readonly @property
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzLocationService_Ready'
        };
    }

    static get ezCanRegister() {
        return 'PENDING' === EzLocationService.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready;

    }

    static #ezRegistrator() {
        if (!EzLocationService.ezCanRegister) {
            return false;
        }

        ezApi.ezRegisterNewApi(
            EzLocationService,
            EzLocationService.ezApiName);
        EzLocationService.ezApiRegistrationState = 'REGISTERED';
        return true;
    }

    static {
        if (null == EzLocationService.ezApiRegistrationState) {
            EzLocationService.ezApiRegistrationState = 'PENDING';

            if (!EzLocationService.#ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    EzLocationService.#ezRegistrator);

                document.addEventListener(
                    EzHttpHelper.ezEventNames.onReady,
                    EzLocationService.#ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.onReady,
                    EzLocationService.#ezRegistrator);
            }
        }
    }

    /**
        @public @constructor
     */
    constructor() {
        super();
    }

    cachedLocations = {};

    get ezLocationServiceRootUrl() {
        return ezApi.ezclocker.nav.ezGetInternalApiUrl('location', 'v1');
    }

    /**
        @protected
        Initializes EzLocationService
        @reutrns {EzLocationService}
     */
    ezInit() {
        return EzLocationService.ezInstance;
    }

    /**
        @public
        Adds a new location record.
        Success response object:
            {
                location: {EzLocationEntity},
                errorCode: {Number},
                message: {String}
            }
        @param {EzLocation} ezLocationEntity
        @returns {Promise}
     */
    ezAddLocation(ezLocationEntity) {
        const self = EzLocationService.ezInstance;

        if (!ezApi.ezIsValid(ezLocationEntity)) {
            throw new EzBadParamException(
                'ezLocationEntity',
                self,
                self.ezAddLocation);
        }

        return ezApi.ezclocker.http.ezPost(
            self.ezLocationServiceRootUrl,
            ezApi.ezToJson(ezLocationEntity))
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @public
        Delete the location record with the associated locationId
        @param {Number} locationId
        @returns {Promise}
     */
    ezDeleteLocation(locationId) {
        const self = EzLocationService.ezInstance;

        if (!ezApi.ezIsNumber(locationId)) {
            throw new EzBadParamException(
                'locationId',
                self,
                self.ezDeleteLocation);
        }

        return ezApi.ezclocker.ezHttpHelper.ezDelete(`${self.ezLocationServiceRootUrl}/${locationId}`)
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @public
        Deletes a location map for the provided employeeId and locationId
        @param {Number} employeeId
        @param {Number} locationId
        @returns {Promise}
     */
    ezDeleteLocationMap(employeeId, locationId) {
        const self = EzLocationService.ezInstance;

        if (!ezApi.ezIsNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                self,
                self.ezDeleteLocationMap);
        }
        if (!ezApi.ezIsNumber(locationId)) {
            throw new EzBadParamException(
                'locationId',
                self,
                self.ezDeleteLocationMap);
        }

        return ezApi.ezclocker.ezHttpHelper.ezDelete(
            `${self.ezLocationServiceRootUrl}/employee/${employeeId}/location-map/${locationId}`)
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @public
        Gets the assigned locations for all the employer's employees.
        Success response object:
            {
                employeeAssignedLocations: {
                    "{employeeId}": [
                        {EzLocationEntity1},
                        {EzLocationEntity2},
                        {EzLocationEntityN},
                        ...
                    ]
                },
                errorCode: {Number},
                message: {String}
            }
        @returns {Promise}
     */
    ezGetAssignedLocationsForAllEmployees() {
        const self = EzLocationService.ezInstance;

        return ezApi.ezclocker.ezHttpHelper.ezGet(`${self.ezLocationServiceRootUrl}/employee/assigned-locations`)
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @public
        Gets the assigned locations for the employee with associated employeeId
        Success response entity:
            {
                entities: [
                    {EzLocationEntity1},
                    {EzLocationEntity2},
                    {EzLocationEntityN},
                    ...
                ],
                errorCode: {Number},
                message: {String}
            }
        @param {Number} employeeId
        @returns {Promise}
     */
    ezGetAssignedLocationsForEmployee(employeeId) {
        const self = EzLocationService.ezInstance;

        if (!ezApi.ezIsNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                self,
                self.ezGetLocation);
        }

        return ezApi.ezclocker.ezHttpHelper.ezGet(
            `${self.ezLocationServiceRootUrl}/employee/${employeeId}/assigned-locations`)
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @deprecated
        Migrate to EzLocationService.ezGetAssignedLocationsForEmployee
        @public
        Gets the assigned locations for the current logged in employer's employee
        Success response entity:
            {
                entities: [
                    {EzLocationEntity1},
                    {EzLocationEntity2},
                    {EzLocationEntityN},
                    ...
                ],
                errorCode: {Number},
                message: {String}
            }
        @param {long} employeeId
        @returns {Promise}
     */
    getAssignedLocationsForEmployee(employeeId) {
        return EzLocationService.ezInstance.ezGetAssignedLocationsForEmployee(employeeId);
    }


    /**
        @public
        Obtains the employer's locations
        Success response entity:
            {
                entities: [
                    {EzLocationEntity1},
                    {EzLocationEntity2},
                    {EzLocationEntityN},
                    ...
                ],
                errorCode: {number},
                message: {string}
            }
        @returns {Promise}
     */
    ezGetEmployerLocations() {
        const self = EzLocationService.ezInstance;

        return ezApi.ezclocker.ezHttpHelper.ezGet(`${self.ezLocationServiceRootUrl}/employer`)
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @public
        Getse the location record associated with the provided locationId
        Success response entity:
            {
                location: {EzLocationEntity},
                errorCode: {number},
                message: {string}
            }

        @param {Number} locationId
        @returns {Promise}
     */
    ezGetLocation(locationId) {
        if (!ezApi.ezIsNumber(locationId)) {
            throw new EzBadParamException(
                'locationId',
                EzLocationService.ezInstance,
                EzLocationService.ezInstance.ezGetLocation);
        }

        return ezApi.ezclocker.ezHttpHelper.ezGet(
            `${EzLocationService.ezInstance.ezLocationServiceRootUrl}/${locationId}`)
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @public
        Getse the location record associated with the provided locationId
        Success response entity:
            {
                entities: [
                    {EzLocationEntity1},
                    {EzLocationEntity2},
                    {EzLocationEntityN},
                    ...
                ],
                errorCode: {number},
                message: {string}
            }
        @param {Number} timeEntryId
        @returns {Promise}
     */
    ezGetLocationsForTimeEntryId(timeEntryId) {
        const self = EzLocationService.ezInstance;

        if (!ezApi.ezIsNumber(timeEntryId)) {
            throw new EzBadParamException(
                'timeEntryId',
                self,
                self.ezGetLocationsForTimeEntryId);
        }

        return ezApi.ezclocker.ezHttpHelper.ezGet(`${self.ezLocationServiceRootUrl}/time-entry/${timeEntryId}`)
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @public
        Gets the assigned employees for the location record associated with the provdied locationId
        Success response entity:
            {
                entities: [
                    {EzEmployeeEntity1},
                    {EzEmployeeEntity2},
                    {EzEmployeeEntity3},
                    ...
                ],
                errorCode: {number},
                message: {string}
            }
        @param {Number} locationId
        @returns {Promise}
     */
    ezGetAssignedEmployeesForLocation(locationId) {
        const self = EzLocationService.ezInstance;

        if (!ezApi.ezIsNumber(locationId)) {
            throw new EzBadParamException(
                'locationId',
                self,
                self.ezGetAssignedEmployeesForLocation);
        }

        return ezApi.ezclocker.ezHttpHelper.ezGet(`${self.ezLocationServiceRootUrl}/${locationId}/assigned-employees`)
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @public
        Updates an existing location with the provided entity. Note that the entity MUST have an id.

        Success response entity:
            {
                location: {EzLocationEntity},
                errorCode: {number},
                message: {string}
            }

        @param {EzLocationEntity} ezLocationEntity
        @returns {Promise}
     */
    ezUpdateLocation(ezLocationEntity) {
        if (!ezApi.ezIsValid(ezLocationEntity) || !ezApi.ezIsNumber(ezLocationEntity.id)) {
            throw new EzBadParamException(
                'ezLocationEntity',
                self,
                self.ezUpdateLocation);
        }

        ezLocationEntity.employerId = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id;

        return ezApi.ezclocker.ezHttpHelper.ezPut(`${self.ezLocationServiceRootUrl}/${ezLocationEntity.id}`,
            ezApi.ezToJson(ezLocationEntity))
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
     * @public
     * Gets a location by id
     * @param {Number} locationId
     */
    getLocation(locationId) {
        const self = EzLocationService.ezInstance;

        if (!ezApi.ezIsNumber(locationId)) {
            throw new EzBadParamException(
                'locationId',
                self,
                self.getLocation);
        }

        if (self.cachedLocations[locationId.toString()]) {
            return ezApi.ezResolve(self.cachedLocations[locationId.toString()]);
        }

        return ezApi.ezPromise((resolve, reject) => ezApi.ezclocker.http.ezGet(
            ezApi.ezclocker.nav.getInternalApiServiceUrl(`location/${locationId}`, 'v1'))
            .then(ezApi.ezclocker.ezServices.ezProcessApiResolve, ezApi.ezclocker.ezServices.ezProcessApiReject)
            .then(
                (response) => {
                    if (ezApi.ezIsValid(response.location) && ezApi.ezIsNumber(response.location.id)) {
                        self.cachedLocations[response.location.id.toString()] = response.location;
                        return resolve(self.cachedLocations[response.location.id.toString()]);
                    }
                    return null;
                },
                (eResponse) => reject(eResponse)));
    }
}

export {
    EzLocationEntity,
    EzLocationService
};

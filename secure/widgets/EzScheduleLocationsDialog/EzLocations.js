import { EzClass } from '/ezlibrary/EzClass.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';
import { EzServices } from '/public/javascript/common/ez-services.js';

/**
    Included in: /ezwp/js/ez-schedule-locations-dialog.bundle.js
 */

/**
    Import with:
        import { EzLocations } from '/secure/widgets/EzScheduleLocationsDialog/EzLocations.js';

        // Ready Checks
        globalThis.ezApi.ezclocker[EzLocations.ezApiName] &&
        globalThis.ezApi.ezclocker[EzLocations.ezApiName].ready

        // Ready event
        document.addEventListener(
            EzLocations.ezEventNames.onReady,
            this.#ezRegistrator);
 */
class EzLocations extends EzClass {
    /**
        @public @static @field
        @type {EzDialog}
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
        return 'ezLocations';
    }

    /**
        @public @static @readonly @property
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzLocations_Ready',
        };
    }

    /**
        @public @static @readonly @property
        @returns {boolean}
     */
    static get ezCanRegister() {
        return 'PENDING' === EzLocations.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready &&

            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzServices.ezApiName] &&
            globalThis.ezApi.ezclocker[EzServices.ezApiName].ready;
    }

    /**
        @private @static @method
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (!EzLocations.ezCanRegister) {
            return false;
        }

        ezApi.ezRegisterNewApi(EzLocations, EzLocations.ezApiName);
        EzLocations.ezApiRegistrationState = 'REGISTERED';
        return true;
    }

    // Static constructor
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            if (!this.#ezRegistrator()) {
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

                            document.addEventListener(
                                EzServices.ezEventNames.onReady,
                                this.#ezRegistrator);
                        }
                    });
            }
        }
    }

    constructor() {
        super();
    }

    ezCachedLocations = [];

    /**
        @protected
        Initializes EzLocations
        @returns {EzLocations}
     */
    ezInit() {
        return EzLocations.ezInstance;
    }

    /**
        @public
        Removes the location associated with the provided locationId
        @param {Number} locationId
        @returns {Promise}
     */
    ezRemoveLocation(locationId) {
        if (!ezApi.ezIsNumber(locationId)) {
            return self.ezBuildErrorMessageReject(
                'A valid locationId param is required in call to EzLocations.ezRemoveLocation().');
        }

        return ezApi.ezPromise(
            (resolve, reject) => {
                return ezApi.ezclocker.http.ezDelete(ezApi.ezclocker.nav.getInternalApiUrl(`location/${locationId}`))
                    .then(
                        ezApi.ezclocker.ezServices.ezProcessApiResolve,
                        ezApi.ezclocker.ezServices.ezProcessApiReject)
                    .then(
                        resolve,
                        (eResponse) => {
                            ezApi.ezclocker.logger.error(
                                ezApi.ezEM`
                                    Failed to remove the location with locationId=${locationId}.
                                    Error: ${ezApi.ezToJson(eResponse)}`);
                            return reject(eResponse);
                        });
            });
    }

    /**
        @public
        Removes an assigned employee from the location
        @param {Number} employeeId
        @param {Number} locationId
        @returns {Promise}
     */
    ezRemoveAssignedEmployeeFromLocation(employeeId, locationId) {
        const self = EzLocations.ezInstance;

        if (!ezApi.ezIsNumber(employeeId)) {
            return self.ezBuildErrorMessageReject(
                'A valid employeeId param is required in call to EzLocations.ezRemoveAssignedEmployeeFromLocation().');
        }
        if (!ezApi.ezIsNumber(locationId)) {
            return self.ezBuildErrorMessageReject(
                'A valid locationId param is required in call to EzLocations.ezRemoveAssignedEmployeeFromLocation().');
        }

        return ezApi.ezPromise(
            (resolve, reject) => {
                return ezApi.ezclocker.ezHttpHelper.ezDelete(
                    ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                        `location/employee/${employeeId}/location-map/${locationId}`))
                    .then(
                        ezApi.ezclocker.ezServices.ezProcessApiResolve,
                        ezApi.ezclocker.ezServices.ezProcessApiReject)
                    .then(
                        resolve,
                        (eResponse) => {
                            ezApi.ezclocker.logger.error(
                                ezApi.ezEM`
                                    Failed to remove an assigned employee with employeeId=${employeeId}
                                    from location with locationId=${locationId}.
                                    Error: ${ezApi.ezToJson(eResponse)}`);
                            return reject(eResponse);
                        });
            });
    }

    /**
        @public
        Gets a location by id
        @param {Number} locationId
        @param {Boolean} ignoreCache
        @returns {Promise}
     */
    ezGetLocation(locationId, ignoreCache) {
        const self = EzLocations.ezInstance;

        if (!ezApi.ezIsNumber(locationId)) {
            return self.ezBuildErrorMessageReject(
                'A valid locationId param is required in call to EzLocations.getLocation().');
        }

        ignoreCache = ezApi.ezIsTrue(ignoreCache);
        if (ezApi.ezIsFalse(ignoreCache) && ezApi.ezIsValid(self.ezCachedLocations[locationId])) {
            return ezApi.ezResolve(self.ezCachedLocations[locationId]);
        }

        return ezApi.ezPromise(
            (resolve, reject) => {
                return ezApi.ezclocker.ezHttpHelper.ezGet(
                    ezApi.ezclocker.nav.ezGetInternalApiUrl(`location/${locationId}`))
                    .then(
                        ezApi.ezclocker.ezServices.ezProcessApiResolve,
                        ezApi.ezclocker.ezServices.ezProcessApiReject)
                    .then(
                        (response) => {
                            self.cachedLocations[locationId] = ezApi.ezIsValid(response.location)
                                ? response.location
                                : null;
                            return resolve(self.cachedLocations[locationId]);
                        },
                        (eResponse) => {
                            ezApi.ezclocker.logger.error(
                                ezApi.ezEM`
                                    Failed to get a location with locationId=${locationId}.
                                    Error: ${ezApi.ezToJson(eResponse)}`);
                            return reject(eResponse);
                        }
                    );
            });
    }

    /**
        @public
        Gets the assigned employees for a location
        @param {long} locationId
        @returns {Promise}
     */
    ezGetLocationAssignedEmployees(locationId) {
        if (!ezApi.ezIsNumber(locationId)) {
            return ezApi.ezReject(
                ezApi.ezclocker.ezDialog.ezBuildErrorResponse(
                    500,
                    'A valid locationId param is required in call to EzLocations.ezGetEmployerLocationAssignedEmployees()'
                ));
        }

        return ezApi.ezPromise(
            (resolve, reject) => ezApi.ezclocker.http.ezGet(
                ezApi.ezclocker.nav.ezGetInternalApiUrl(`location/${locationId}/assigned-employees`))
                .then(
                    ezApi.ezclocker.ezServices.ezProcessApiResolve,
                    ezApi.ezclocker.ezServices.ezProcessApiReject)
                .then(
                    (response) => resolve(response),
                    (eResponse) => {
                        ezApi.ezclocker.logger.error(
                            ezApi.ezEM`
                                Failed to get a location's assigned employees.
                                Error: ${ezApi.ezToJson(eResponse)}`);
                        return reject(eResponse);
                    }));
    }

    /**
        @public
        Gets the current employer's locations
        @returns {Promise}
     */
    ezGetEmployerLocations() {
        return ezApi.ezPromise(
            (resolve, reject) => {
                return ezApi.ezclocker.http.ezGet(
                    ezApi.ezclocker.nav.ezGetInternalApiUrl('location/employer'))
                    .then(
                        ezApi.ezclocker.ezServices.ezProcessApiResolve,
                        ezApi.ezclocker.ezServices.ezProcessApiReject)
                    .then(
                        resolve,
                        (eResponse) => {
                            ezApi.ezclocker.logger.error(ezApi.ezEM`
                                Failed to get the employer\'s schedule locations.
                                Error: ${ezApi.ezToJson(eResponse)}`);
                            return reject(eResponse);
                        });
            });
    }

    /**
        @public
        Saves the provided location object to the location identified by the provided location id.
        @param {Number} locationId
        @param {Object} locationToSave
        @returns {Promise}
     */
    ezSaveLocation(locationId, locationToSave) {
        const self = EzLocations.ezInstance;

        if (!ezApi.ezIsNumber(locationId)) {
            return self.ezBuildErrorMessageReject(
                'A valid locationId param is required in call to EzLocations.ezSaveLocation');
        }
        if (ezApi.ezIsNotValid(locationToSave)) {
            return self.ezBuildErrorMessageReject(
                'A valid locationToSave param is required in call to EzLocations.ezSaveLocation');
        }

        return ezApi.ezPromise(
            (resolve, reject) => {
                locationToSave.id = locationId;
                return ezApi.ezclocker.http.ezPut(
                    ezApi.ezclocker.nav.getInternalApiUrl(`location/${locationId}`),
                    ezApi.ezToJson(locationToSave))
                    .then(
                        ezApi.ezclocker.ezServices.ezProcessApiResolve,
                        ezApi.ezclocker.ezServices.ezProcessApiReject)
                    .then(
                        resolve,
                        (eResponse) => {
                            ezApi.ezclocker.logger.error(
                                ezApi.ezEM`
                                    Failed to save the location with locationId=${locationId}.
                                    Error: ${ezApi.ezToJson(eResponse)}`);
                            return reject(eResponse);
                        });
            });
    }

    /**
        @public
        Adds a new location using the provided locationToAdd object
        @param {Object} locationToAdd
        @returns {Promise}
     */
    ezAddLocation(locationToAdd) {
        if (ezApi.ezIsNotValid(locationToAdd)) {
            return self.ezBuildErrorMessageReject(
                'A valid locationToAdd param is required in call to EzLocations.ezSaveLocation');
        }

        return ezApi.ezPromise(
            (resolve, reject) => {
                ezApi.ezclocker.ezHttpHelper.ezPost(
                    ezApi.ezclocker.ezNavigation.getInternalApiUrl('location'),
                    ezApi.ezToJson(locationToAdd))
                    .then(
                        ezApi.ezclocker.ezServices.ezProcessApiResolve,
                        ezApi.ezclocker.ezServices.ezProcessApiReject)
                    .then(
                        resolve,
                        (eResponse) => {
                            ezApi.ezclocker.logger.error(
                                ezApi.ezEM`
                                    Failed to add a new location.
                                    Error: ${ezApi.ezToJson(eResponse)}`);

                            return reject(eResponse);
                        });
            });
    }

    /**
        @public
        Gets the assigned locations for the current logged in employer's employee
        @param {Number} employeeId
        @returns {Promise}
     */
    ezGetAssignedLocationsForEmployee(employeeId) {
        if (!ezApi.ezIsNumber(employeeId)) {
            return self.ezBuildErrorMessageReject(
                'A valid employeeId param is required in call to EzLocations.getAssignedLocationsForEmployee().');
        }

        return ezApi.ezPromise(
            (resolve, reject) => ezApi.ezclocker.http.ezGet(
                ezApi.ezclocker.nav.getInternalApiServiceUrl(`location/employee/${employeeId}/assigned-locations`))
                .then(
                    ezApi.ezclocker.ezServices.ezProcessApiResolve,
                    ezApi.ezclocker.ezServices.ezProcessApiReject)
                .then(
                    resolve,
                    (eResponse) => {
                        ezApi.ezclocker.logger.error(
                            ezApi.ezEM`
                                Failed to obtain the assigned locations for employeeId=${employeeId}.
                                Error: ${ezApi.ezToJson(eResponse)}`);
                        reject(eResponse);
                    }));
    }

    /**
        @protected
        Builds an error message response
        @param {String} em
     */
    ezBuildErrorMessageReject(em) {
        if (ezApi.ezStringHasLength(em)) {
            ezApi.ezclocker.logger.error(em);

            return ezApi.ezReject(ezApi.ezclocker.ezDialog.ezBuildErrorResponse('500', em));
        }
    }
}

export {
    EzLocations
};

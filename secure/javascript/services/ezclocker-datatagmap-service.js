import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzRegistrationState } from '/ezlibrary/enums/EzRegistrationState.js';
import { EzEntityType } from '/ezlibrary/enums/EzEntityType.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzBoolean } from '/ezlibrary/helpers/EzBoolean.js';
import { EzNumber } from '/ezlibrary/helpers/EzNumber.js';

import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

import { EzDataTagMap } from '/ezlibrary/entities/EzDataTagMap.js';

import { EzEntityCollectionResponse } from '/ezlibrary/entities/responses/EzEntityCollectionResponse.js';
import { EzEntityResponse } from '/ezlibrary/entities/responses/EzEntityResponse.js';


/**
    @public @class {EzInternalDataTagMapApiClient} @extends {EzClass}
    @description
    Creates a new instance of EzInternalDataTagMapApiClient
    Import with:
        import { EzInternalDataTagMapApiClient } from '/secure/javascript/services/ezclocker-datatagmap-service.js';

        globalThis.ezApi.ezclocker[EzInternalDataTagMapApiClient.ezApiName] &&
        globalThis.ezApi.ezclocker[EzInternalDataTagMapApiClient.ezApiName].ready

        document.addEventListener(
            EzInternalDataTagMapApiClient.ezEventNames.onReady,
            this.#ezRegistrator);
 */
export class EzInternalDataTagMapApiClient extends EzClass {
    /**
        @static
        @public @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {String}
     */
    static get ezApiName() {
        return 'ezInternalDataTagMapApiClient';
    }

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {Object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzInternalDataTagMapApiClient_Ready'
        };
    }

    /**
        @static
        @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
        @type {EzInternalDataTagMapApiClient}
     */
    static #ezInstance = Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
        globalThis.ezApi &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi, 'ezclocker') &&
        globalThis.ezApi.ezclocker &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi.ezclocker, EzInternalDataTagMapApiClient.ezApiName) &&
        globalThis.ezApi.ezclocker[EzInternalDataTagMapApiClient.ezApiName]
        ? globalThis.ezApi.ezclocker[EzInternalDataTagMapApiClient.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzInternalDataTagMapApiClient}
     */
    static get ezInstance() {
        return EzInternalDataTagMapApiClient.#ezInstance;
    }

    /**
        @static
        @public @property @getter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzInternalDataTagMapApiClient} ezInternalDataTagMapApiClient
     */
    static set ezInstance(ezInternalDataTagMapApiClient) {
        if (null != EzInternalDataTagMapApiClient.#ezInstance) {
            throw new Error('EzInternalDataTagMapApiClient\'s singleton instance is already reigstered with EzApi.');
        }

        EzInternalDataTagMapApiClient.#ezInstance = ezInternalDataTagMapApiClient;
    }

    /**
        @static
        @private @field
        Stores the EzApi registration state for this class.
        Default value is NULL
        Class is registerd with EzApi when value is EzRegistrationState.REGISTERED
        @type {String}
        A valid enum property value from EzRegistrationState
     */
    static #ezApiRegistrationState = Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
        globalThis.ezApi &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi, 'ezclocker') &&
        globalThis.ezApi.ezclocker &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi.ezclocker, EzInternalDataTagMapApiClient.ezApiName) &&
        globalThis.ezApi.ezclocker[EzInternalDataTagMapApiClient.ezApiName]
        ? EzRegistrationState.REGISTERED
        : null;

    /**
        @static
        @public @property @getter
        Returns the ezApi registration state of this classes's singleton instance.
        @returns {string}
        A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzInternalDataTagMapApiClient.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzInternalDataTagMapApiClient.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
        @static
        @private @readonly @property @getter
        Returns true when all required dependencies for this class report ready.
        In otherwords, the require dependency's singleton instance is created
        and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
        @returns {Boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzInternalDataTagMapApiClient.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready;
    }

    /**
        @static
        @private @readonly @property @getter
        Returns if this class's singleton instance is registered with ezApi yet.
        @returns {Boolean}
     */
    static get #ezIsRegistered() {
        return null != EzInternalDataTagMapApiClient.ezInstance &&
            EzInternalDataTagMapApiClient.REGISTERED === EzInternalDataTagMapApiClient.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {Boolean}
     */
    static #ezRegistrator() {
        if (EzInternalDataTagMapApiClient.#ezCanRegister && !EzInternalDataTagMapApiClient.#ezIsRegistered) {
            globalThis['ezApi'].ezRegisterNewApi(EzInternalDataTagMapApiClient, EzInternalDataTagMapApiClient.ezApiName);
        }

        return EzInternalDataTagMapApiClient.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzInternalDataTagMapApiClient.ezApiName
            2) Property getter EzInternalDataTagMapApiClient.ezEventNames
            3) Property getter EzInternalDataTagMapApiClient.ezInstance
            4) Property setter EzInternalDataTagMapApiClient.ezInstance
            5) Property getter EzInternalDataTagMapApiClient.ezApiRegistrationState
            6) Property setter EzInternalDataTagMapApiClient.ezApiRegistrationState
            7) Property getter EzInternalDataTagMapApiClient.#ezCanRegister
            8) Property getter EzInternalDataTagMapApiClient.#ezIsRegistered
            9) Method EzInternalDataTagMapApiClient.#ezRegistrator()
     */
    static {
        if (null == EzInternalDataTagMapApiClient.ezApiRegistrationState) {
            EzInternalDataTagMapApiClient.ezApiRegistrationState = EzRegistrationState.PENDING;

            document.addEventListener(
                EzInternalDataTagMapApiClient.ezOnEzApiReadyEventName,
                () => {
                    if (!EzInternalDataTagMapApiClient.#ezRegistrator()) {
                        document.addEventListener(
                            'onEzApiReady',
                            EzInternalDataTagMapApiClient.#ezRegistrator);

                        document.addEventListener(
                            EzNavigation.ezEventNames.onReady,
                            EzInternalDataTagMapApiClient.#ezRegistrator);
                    }
                });
        }
    }

    /**
        @public @constructor
        @description
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> AVOID CREATING CREATE NEW INSTANCES <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Prioritize using the static singleton instance of EzInternalDataTagMapApiClient
        registered with ezApi instead of creating a new instance.
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Available from ezApi at:
            ezApi.ezclocker.ezInternalDataTagMapApiClient.
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     */
    constructor() {
        super();

        this.#ezBaseDataTagMapApiUri = ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
            'datatagmaps',
            'v1');
    }

    /**
        @private @field
        Stores the Base DataTagMap api uri
        @type {string}
     */
    #ezBaseDataTagMapApiUri = '';

    /**
        @public @readonly @property
        Gets the Base DataTagMap api uri
        @returns {string}
     */
    get ezBaseDataTagMapApiUri() {
        return this.#ezBaseDataTagMapApiUri
    }

    /**
        @protected @method
        Initializes the EzInternalDataTagMapApiClient
        @returns {EzInternalDataTagMapApiClient}
     */
    ezInit() {
        return EzInternalDataTagMapApiClient.ezInstance;
    }

    /**
        @public @method
        Creates a new data tag map from the provided EzDataTagMap data and assigns the mapping to the employee with
        the provided employeeId.
        @param {number} employeeId
        @param {EzDataTagMap} ezDataTagMap
        @returns {Promise}
     */
    ezCreateAndAssignDataTagMapToEmployee(employeeId, ezDataTagMap) {
        if (!ezApi.ezIsNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                EzInternalDataTagMapApiClient.ezInstance,
                EzInternalDataTagMapApiClient.ezInstance.ezCreateAndAssignDataTagMapToEmployee);
        }

        if (!ezApi.ezIsValid(ezDataTagMap)) {
            throw new EzBadParamException(
                'ezDataTagMap',
                EzInternalDataTagMapApiClient.ezInstance,
                EzInternalDataTagMapApiClient.ezInstance.ezCreateAndAssignDataTagMapToEmployee);
        }

        return ezApi.ezPromise(
            (success, failure) => ezApi.ezclocker.ezHttpHelper.ezPost(
                `${EzInternalDataTagMapApiClient.ezInstance.ezBaseDataTagMapApiUri}/assign/employee/${employeeId}`,
                ezApi.ezToJson(ezDataTagMap))
                .then(
                    ezApi.ezclocker.ezServices.ezProcessApiResolve,
                    ezApi.ezclocker.ezServices.ezProcessApiReject)
                .then(
                    (response) => success(EzEntityResponse.ezEntityResponse(response)),
                    (eResponse) => failure(EzEntityResponse.ezEntityResponse(eResponse))));
    }

    /**
        @public @method
        Creates a new data tag map from the provided EzDataTagMap data and assigns the mapping to the time entry with
        the provided timeEntryId.
        @param {Number} timeEntryId
        @param {EzDataTagMap} ezDataTagMap
        @returns {Promise}
     */
    ezCreateAndAssignDataTagMapToTimeEntry(timeEntryId, ezDataTagMap) {
        if (!ezApi.ezIsNumber(timeEntryId)) {
            throw new EzBadParamException(
                'timeEntryId',
                EzInternalDataTagMapApiClient.ezInstance,
                EzInternalDataTagMapApiClient.ezInstance.ezCreateAndAssignDataTagMapToTimeEntry);
        }
        if (!ezApi.ezIsValid(ezDataTagMap)) {
            throw new EzBadParamException(
                'timeEntryId',
                EzInternalDataTagMapApiClient.ezInstance,
                EzInternalDataTagMapApiClient.ezInstance.ezDataTagMap);
        }

        return ezApi.ezclocker.ezHttpHelper.ezPost(
            `${EzInternalDataTagMapApiClient.ezInstance.ezBaseDataTagMapApiUri}/assign/time-entry/${timeEntryId}`,
            ezApi.ezToJson(ezDataTagMap))
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @public @method
        Removes all assigned entities by dataTagId and assigned entity type.
        @param {number} dataTagId
        @param {string} assignedEzEntityType
        @returns {Promise}
     */
    ezPurgeDataTagMapsForDataTagIdAndAssignedEntityTypeName(dataTagId, assignedEzEntityType) {
        if (!ezApi.ezIsNumber(dataTagId)) {
            throw new EzBadParamException(
                'dataTagId',
                EzInternalDataTagMapApiClient.ezInstance,
                EzInternalDataTagMapApiClient.ezInstance.ezPurgeDataTagMapsForDataTagIdAndAssignedEntityTypeName);
        }
        if (!ezApi.ezStringHasLength(assignedEzEntityType)) {
            throw new EzBadParamException(
                'dataTagId',
                EzInternalDataTagMapApiClient.ezInstance,
                EzInternalDataTagMapApiClient.ezInstance.ezPurgeDataTagMapsForDataTagIdAndAssignedEntityTypeName);
        }

        return ezApi.ezclocker.ezHttpHelper.ezPost(
            `${EzInternalDataTagMapApiClient.ezInstance.ezBaseDataTagMapApiUri}/purge`,
            ezApi.ezToJson({
                dataTagId: dataTagId,
                assignedEzEntityType: assignedEzEntityType
            }))
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @public @method
        Deletes an exisiting data tag map record associted with the provided dataTagMapId
        @param {number} dataTagMapId
        @returns {Promise}
     */
    ezDeleteDataTagMap(dataTagMapId) {
        if (!EzNumber.isNumber(dataTagMapId)) {
            throw new EzBadParamException(
                'dataTagMapId',
                EzInternalDataTagMapApiClient.ezInstance,
                EzInternalDataTagMapApiClient.ezInstance.ezDeleteDataTagMap);
        }

        return ezApi.ezPromise(
            (success, failure) => ezApi.ezclocker.ezHttpHelper.ezDelete(
                `${EzInternalDataTagMapApiClient.ezInstance.ezBaseDataTagMapApiUri}/${dataTagMapId}`)
                .then(
                    ezApi.ezclocker.ezServices.ezProcessApiResolve,
                    ezApi.ezclocker.ezServices.ezProcessApiReject)
                .then(
                    (response) => success(EzEntityResponse.ezEntityResponse(response)),
                    (eResponse) => failure(EzEntityResponse.ezEntityResponse(eResponse))));
    }

    /**
        @public @method
        Returns all the DataTagMaps for the logged in employer
        @returns {Promise}
     */
    ezGetAllDataTagMapsForEmployer() {
        return ezApi.ezclocker.ezHttpHelper.ezGet(EzInternalDataTagMapApiClient.ezInstance.ezBaseDataTagMapApiUri)
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @public @method
        Gets the data tag map for the provided dataTagMapId
        @param {number} dataTagMapId
        @returns {Promise}
     */
    ezGetDataTagMap(dataTagMapId) {
        if (!ezApi.ezIsNumber(dataTagMapId)) {
            throw new EzBadParamException(
                'dataTagMapId',
                EzInternalDataTagMapApiClient.ezInstance,
                EzInternalDataTagMapApiClient.ezInstance.ezGetDataTagMap);
        }

        return ezApi.ezclocker.ezHttpHelper.ezGet(
            `${EzInternalDataTagMapApiClient.ezInstance.ezBaseDataTagMapApiUri}/${dataTagMapId}`)
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @public @method
        Creates a new data tag map from the provided EzDataTagMap entity
        @param {EzDataTagMap} ezDataTagMap
        @returns {Promise}
        Promise resolve contains an EzEntityResponse
        Promise reject contains an EzEntityErrorResponse
     */
    ezCreateDataTagMap(ezDataTagMap) {
        if (!ezApi.ezIsValid(ezDataTagMap)) {
            throw new EzBadParamException(
                'ezDataTagMap',
                EzInternalDataTagMapApiClient.ezInstance,
                EzInternalDataTagMapApiClient.ezInstance.ezCreateDataTagMap);
        }

        return ezApi.ezclocker.ezHttpHelper.ezPost(
            EzInternalDataTagMapApiClient.ezInstance.ezBaseDataTagMapApiUri,
            ezApi.ezToJson(ezDataTagMap))
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
            //.then(
            //    (response) => success(EzEntityResponse.ezEntityResponse(response)),
            //    (eResponse) => failure(EzEntityResponse.ezEntityResponse(eResponse)));
    }

    /**
        @public @method
        Updates an existing data tag map associated with the provided dataTagMapId with the provided EzDataTagMap data.
        @param {number} dataTagMapId
        @param {EzDataTagMap} ezDataTagMap
        @returns {Promise}
     */
    ezUpdateDataTagMap(dataTagMapId, ezDataTagMap) {
        if (!ezApi.ezIsNumber(dataTagMapId)) {
            throw new EzBadParamException(
                'dataTagMapId',
                EzInternalDataTagMapApiClient.ezInstance,
                EzInternalDataTagMapApiClient.ezInstance.ezUpdateDataTagMap);
        }
        if (null == ezDataTagMap) {
            throw new EzBadParamException(
                'ezDataTagMap',
                EzInternalDataTagMapApiClient.ezInstance,
                EzInternalDataTagMapApiClient.ezInstance.ezUpdateDataTagMap);
        }

        let updatingDataTagMap = new EzDataTagMap(
            dataTagMapId,
            ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id,
            ezDataTagMap.dataTagId,
            ezDataTagMap.assignedEzEntityTypeName,
            ezDataTagMap.assignedEzEntityId,
            EzBoolean.isTrue(ezDataTagMap.assignedToAllEntities),
            EzNumber.numberOrDefault(ezDataTagMap.level, 0));

        return ezApi.ezPromise(
            (success, failure) => ezApi.ezclocker.ezHttpHelper.ezPut(
                `${EzInternalDataTagMapApiClient.ezInstance.ezBaseDataTagMapApiUri}/${updatingDataTagMap.id}`,
                ezApi.ezToJson(updatingDataTagMap))
                .then(
                    ezApi.ezclocker.ezServices.ezProcessApiResolve,
                    ezApi.ezclocker.ezServices.ezProcessApiReject)
                .then(
                    (response) => success(EzEntityResponse.ezEntityResponse(response)),
                    (eResponse) => failure(EzEntityResponse.ezEntityResponse(eResponse))));
    }

    /**
        @protected @method
        Builds an error response
        @param {String} errorMessage
        @param {Number} errorCode
        @returns {Object}
     */
    ezBuildErrorResponse(errorMessage, errorCode, endPoint) {
        ezApi.ezclocker.ezLogger.error(errorMessage);

        return {
            errorMessage: ezApi.ezStringHasLength(errorMessage)
                ? errorMessage
                : 'Failed (no additional details)',
            errorCode: ezApi.ezIsNumber(errorCode)
                ? errorCode
                : 500,
            endPoint: ezApi.ezStringHasLength(endPoint)
                ? endPoint
                : EzInternalDataTagMapApiClient.ezInstance.ezBaseDataTagMapApiUri
        };
    }

    /**
        @public @method
        Obtains the DataTagMap assignments for the provided data tag.
        @param {Number} dataTagId
        @param {String} ezEntityType
        A valid enum property value from EzEntityType
        @returns {Promise}
        Promise.resolve EzEntityCollectionResponse created from the success response
        Promise.reject EzEntityCollectionResponse created from the error response
     */
    ezGetDataTagAssignments(dataTagId, ezEntityType) {
        if (!ezApi.ezIsNumber(dataTagId)) {
            throw new EzBadParamException(
                'dataTagId',
                EzInternalDataTagMapApiClient.ezInstance,
                EzInternalDataTagMapApiClient.ezInstance.ezGetDataTagAssignments);
        }

        ezEntityType = !ezApi.ezStringHasLength(ezEntityType)
            ? EzEntityType.EMPLOYEE
            : ezEntityType;

        return ezApi.ezPromise(
            (success, failure) => ezApi.ezclocker.ezHttpHelper.ezGet(
                `${EzInternalDataTagMapApiClient.ezInstance.ezBaseDataTagMapApiUri}/${dataTagId}/assigned/${ezEntityType}`)
                .then(
                    ezApi.ezclocker.ezServices.ezHandleApiResolve,
                    ezApi.ezclocker.ezServices.ezHandleApiReject)
                .then(
                    (response) => success(EzEntityCollectionResponse.ezEntityCollectionResponse(response)),
                    (eResponse) => failure(EzEntityCollectionResponse.ezEntityCollectionResponse(eResponse))));
    }

    /**
        @public @method
        Returns the provided entity id's primary data tag (if any )
        @param {String} assignedEntityTypeName
        @param {Number} assignedEntityId
        @returns {Promise}
     */
    ezGetPrimaryDataTagForAssignedEntityTypeNameAssignedEntityId(assignedEntityTypeName, assignedEntityId) {
        if (!ezApi.ezIsValid(assignedEntityTypeName) || EzEntityType.UNKNOWN === assignedEntityTypeName) {
            throw new EzBadParamException(
                'assignedEntityTypeName',
                EzInternalDataTagMapApiClient.ezInstance,
                EzInternalDataTagMapApiClient.ezInstance.ezGetPrimaryDataTagForAssignedEntityTypeNameAssignedEntityId);
        }
        if (!ezApi.ezIsNumber(assignedEntityId)) {
            throw new EzBadParamException(
                'assignedEntityId',
                EzInternalDataTagMapApiClient.ezInstance,
                EzInternalDataTagMapApiClient.ezInstance.ezGetPrimaryDataTagForAssignedEntityTypeNameAssignedEntityId);
        }

        let url = ezApi.ezUrlTemplate`
            ${EzInternalDataTagMapApiClient.ezInstance.ezBaseDataTagMapApiUri}/
            primary/
            ${assignedEntityTypeName}/
            ${assignedEntityId}`;

        return ezApi.ezPromise(
            (success, failure) => ezApi.ezclocker.ezHttpHelper.ezGet(url)
                .then(
                    ezApi.ezclocker.ezServices.ezProcessApiResolve,
                    ezApi.ezclocker.ezServices.ezProcessApiReject)
                .then(
                    (response) => success(EzEntityResponse.ezEntityResponse(response)),
                    (eResponse) => failure(EzEntityResponse.ezEntityResponse(eResponse))));
    }
}

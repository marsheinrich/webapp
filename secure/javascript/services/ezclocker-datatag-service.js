import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzRegistrationState } from '/ezlibrary/enums/EzRegistrationState.js';
import { EzEntityType } from '/ezlibrary/enums/EzEntityType.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';
import { EzServices } from '/public/javascript/common/ez-services.js';

import { EzDataTagFilterType } from '/ezlibrary/enums/EzDataTagFilterType.js';
import { EzDataTagType } from '/ezlibrary/enums/EzDataTagType.js';

/**
    @public @class {EzDataTagService} @extends {EzClass}
    @description
    Import with
        import { EzDataTagService } from '/secure/javascript/services/ezclocker-datatag-service.js';

        globalThis.ezApi.ezclocker[EzDataTagService.ezApiName] &&
        globalThis.ezApi.ezclocker[EzDataTagService.ezApiName].ready

        document.addEventListener(
            EzDataTagService.ezEventNames.onReady,
            this.#ezRegistrator);
 */
export class EzDataTagService extends EzClass {
    /**
        @static
        @public @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {String}
     */
    static get ezApiName() {
        return 'ezDataTagService';
    }

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {Object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzDataTagService_Ready'
        };
    }

    /**
        @static
        @private @field
        Stores the singleton instance of this class that was created by and registerd with EzApi.
        @type {EzDataTagService}
     */
    static #ezInstance = Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
        globalThis.ezApi &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi, 'ezclocker') &&
        globalThis.ezApi.ezclocker &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi.ezclocker, EzDataTagService.ezApiName) &&
        globalThis.ezApi.ezclocker[EzDataTagService.ezApiName]
        ? globalThis.ezApi.ezclocker[EzDataTagService.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzDataTagService}
     */
    static get ezInstance() {
        return EzDataTagService.#ezInstance;
    }

    /**
        @static
        @public @property @getter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzDataTagService} ezDataTagService
     */
    static set ezInstance(ezDataTagService) {
        if (null != EzDataTagService.#ezInstance) {
            throw new Error('EzDataTagService\'s singleton instance is already reigstered with EzApi.');
        }

        EzDataTagService.#ezInstance = ezDataTagService;
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
        Object.prototype.hasOwnProperty.call(globalThis.ezApi.ezclocker, EzDataTagService.ezApiName) &&
        globalThis.ezApi.ezclocker[EzDataTagService.ezApiName]
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
        return EzDataTagService.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzDataTagService.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
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
        return EzRegistrationState.PENDING === EzDataTagService.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzHttpHelper.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzServices.ezApiName] &&
            globalThis.ezApi.ezclocker[EzServices.ezApiName].ready;
    }

    /**
        @static
        @private @readonly @property @getter
        Returns if this class's singleton instance is registered with ezApi yet.
        @returns {Boolean}
     */
    static get #ezIsRegistered() {
        return null != EzDataTagService.ezInstance &&
            EzDataTagService.REGISTERED === EzDataTagService.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {Boolean}
     */
    static #ezRegistrator() {
        if (EzDataTagService.#ezCanRegister && !EzDataTagService.#ezIsRegistered) {
            globalThis['ezApi'].ezRegisterNewApi(EzDataTagService, EzDataTagService.ezApiName);
        }

        return EzDataTagService.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzDataTagService.ezApiName
            2) Property getter EzDataTagService.ezEventNames
            3) Property getter EzDataTagService.ezInstance
            4) Property setter EzDataTagService.ezInstance
            5) Property getter EzDataTagService.ezApiRegistrationState
            6) Property setter EzDataTagService.ezApiRegistrationState
            7) Property getter EzDataTagService.#ezCanRegister
            8) Property getter EzDataTagService.#ezIsRegistered
            9) Method EzDataTagService.#ezRegistrator()
     */
    static {
        if (null == EzDataTagService.ezApiRegistrationState) {
            EzDataTagService.ezApiRegistrationState = EzRegistrationState.PENDING;

            document.addEventListener(
                EzDataTagService.ezOnEzApiReadyEventName,
                () => {
                    if (!EzDataTagService.#ezRegistrator()) {
                        document.addEventListener(
                            EzHttpHelper.ezEventNames.onReady,
                            EzDataTagService.#ezRegistrator);

                        document.addEventListener(
                            EzNavigation.ezEventNames.onReady,
                            EzDataTagService.#ezRegistrator);

                        document.addEventListener(
                            EzServices.ezEventNames.onReady,
                            EzDataTagService.#ezRegistrator);
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
        Prioritize using the static singleton instance of EzDataTagService
        registered with ezApi instead of creating a new instance.
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Available from ezApi at:
            ezApi.ezclocker.ezDataTagService.
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     */
    constructor() {
        super();

        this.#ezBaseDataTagApiUri = ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl('datatags', 'v1');
    }

    /**
        @private @field
        Stores the Base DataTag api uri
        @type {string}
     */
    #ezBaseDataTagApiUri = '';

    /**
        @public @readonly @property
        Gets the Base DataTagMap api uri
        @returns {string}
     */
    get ezBaseDataTagApiUri() {
        return this.#ezBaseDataTagApiUri;
    }


    /**
        @protected @method
        Initializes the EzDataTagServce
        @returns {EzDataTagService}
     */
    ezInit() {
        return EzDataTagService.ezInstance;
    }

    /**
        @public @method
        Deletes the data tag associated with the provided dataTagId
        @param {number} dataTagId
        @returns {Promise}
     */
    ezDeleteDataTag(dataTagId) {
        if (!ezApi.ezIsNumber(dataTagId)) {
            throw new EzBadParamException(
                'dataTagId',
                EzDataTagService.ezInstance,
                EzDataTagService.ezInstance.ezDeleteDataTag);
        }

        return ezApi.ezclocker.ezHttpHelper.ezDelete(`${EzDataTagService.ezInstance.ezBaseDataTagApiUri}/${dataTagId}`)
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @public @method
        Returns all data tags for the logged in employer
        @returns {Promise}
     */
    ezGetAllDataTagsForEmployer() {
        return ezApi.ezclocker.ezHttpHelper.ezGet(ezApi.ezclocker.ezDataTagService.ezBaseDataTagApiUri)
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @public @method
        Returns all data tags for the logged in employer
        @param {string} dataTagType
        A constant from EzDataTagType
        @param {undefined|null|string} ezEntityTypeFilter
        A constant from EzEntityType to restrict the results to that EzEntityType
        @returns {Promise}
     */
    ezGetAllDataTagsOfDataTagTypeForEmployer(ezDataTagType, ezEntityTypeFilter) {
        if (!ezApi.ezStringHasLength(ezDataTagType)) {
            throw new EzBadParamException(
                'ezDataTagType',
                EzDataTagService.ezInstance,
                EzDataTagService.ezInstance.ezGetAllDataTagsOfDataTagTypeForEmployer);
        }

        return ezApi.ezclocker.http.ezGet(
            EzDataTagService.ezInstance.ezBuildGetAllDataTagsOfDataTagTypeForEmployerUrl(
                ezDataTagType,
                ezEntityTypeFilter
            ))
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @public @method
        Builds the service api url to get all data tags of EzDataTagType, optionally
        filtered by ezEntityTypeFilter for the active employer.
        @param {string} dataTagType
        A constant from EzDataTagType
        @param {undefined|null|string} ezEntityTypeFilter
        A constant from EzEntityType to restrict the results to that EzEntityType
     */
    ezBuildGetAllDataTagsOfDataTagTypeForEmployerUrl(ezDataTagType, ezEntityTypeFilter) {
        if (!ezApi.ezStringHasLength(ezDataTagType)) {
            throw new EzBadParamException(
                'ezDataTagType',
                EzDataTagService.ezInstance,
                EzDataTagService.ezInstance.ezBuildGetAllDataTagsOfDataTagTypeForEmployerUrl);
        }

        let optionalParams = ezApi.ezStringHasLength(ezEntityTypeFilter)
            ? `&assigned-entity-type-name=${ezEntityTypeFilter}`
            : '';

        return ezApi.ezUrlTemplate`${EzDataTagService.ezInstance.ezBaseDataTagApiUri}
            ?data-tag-type=${ezDataTagType}
            ${optionalParams}`;
    }

    /**
        @public @method
        Returns all data tags for the logged in employer
        @param {string} ezDataTagType
        A valid enum property value from EzDataTagType
        @param {string} ezEntityType
        A valid enum property value from EzEntityType
        @returns {Promise}
     */
    ezGetDataTagsByEmployerIdWithFilteredAssignedEntityTypeName(ezDataTagType, ezEntityType) {
        if (!ezApi.ezStringHasLength(ezDataTagType)) {
            throw new EzBadParamException(
                'ezDataTagType',
                EzDataTagService.ezInstance,
                EzDataTagService.ezInstance.ezGetDataTagsByEmployerIdWithFilteredAssignedEntityTypeName);
        }
        if (!ezApi.ezStringHasLength(ezEntityType)) {
            throw new EzBadParamException(
                'ezDataTagType',
                EzDataTagService.ezInstance,
                EzDataTagService.ezInstance.ezGetDataTagsByEmployerIdWithFilteredAssignedEntityTypeName);
        }

        let url = ezApi.ezUrlTemplate`${EzDataTagService.ezInstance.ezBaseDataTagApiUri}
            ?data-tag-type=${EzDataTagType.ezAsEnum(ezDataTagType)}
            &assigned-entity-type-name=${EzEntityType.ezAsEnum(ezEntityType)}`;

        return ezApi.ezclocker.ezHttpHelper.ezGet(url)
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @public @method
        Returns all data tags for the logged in employer
        @param {string} ezDataTagType
        A valid enum property value from EzDataTagType
        @param {string} ezEntityType
        A valid enum property value from EzEntityTYpe
        @returns {Promise}
     */
    ezGetAllEmployerDataTagsOfDataTagTypeFilterAssignmentsByEntityType(ezDataTagType, ezEntityType) {
        if (!ezApi.ezStringHasLength(ezDataTagType)) {
            throw new EzBadParamException(
                'ezDataTagType',
                EzDataTagService.ezInstance,
                EzDataTagService.ezInstance.ezGetAllEmployerDataTagsOfDataTagTypeFilterAssignmentsByEntityType);
        }
        if (!ezApi.ezStringHasLength(ezDataTagType)) {
            throw new EzBadParamException(
                'ezEntityType',
                EzDataTagService.ezInstance,
                EzDataTagService.ezInstance.ezGetAllEmployerDataTagsOfDataTagTypeFilterAssignmentsByEntityType);
        }

        let url = ezApi.ezUrlTemplate`EzDataTagService.ezInstance.ezBaseDataTagApiUri
            ?data-tag-type=${EzDataTagType.ezAsEnum(ezDataTagType)}
            &assigned-entity-type-name=${EzEntityType.ezAsEnum(ezEntityType)}`;

        return ezApi.ezclocker.ezHttpHelper.ezGet(url)
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @public @method
        Returns all data tags assigned to the provided employeeId
        @param {number} employeeId
        @param {string} ezDataTagTypeFilter
        A valid enum property value from EzDataTagType. Default is EzDataTagType.JOB_CODE
        @param {string} ezDataTagFilterType
        A valid enum property value from EzDatTagFilterType. Default is EzDataTagFilterType.ALL
        @returns {Promise}
     */
    ezGetAllDataTagsAssignedToEmployee(employeeId, ezDataTagTypeFilter, ezDataTagFilterType) {
        if (!ezApi.ezIsNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                EzDataTagService.ezInstance,
                EzDataTagService.ezInstance.ezGetAllDataTagsAssignedToEmployee);
        }

        if (ezApi.ezStringHasLength(ezDataTagTypeFilter)) {
            ezDataTagTypeFilter = EzDataTagType.ezAsEnum(ezDataTagTypeFilter);
        }

        if (!ezApi.ezStringHasLength(ezDataTagTypeFilter) || EzDataTagType.UNKNOWN === ezDataTagTypeFilter) {
            ezDataTagTypeFilter = EzDataTagType.JOB_CODE;
        }

        if (ezApi.ezStringHasLength(ezDataTagFilterType)) {
            ezDataTagFilterType = EzDataTagFilterType.ezValueOf(ezDataTagFilterType);
        }

        if (!ezApi.ezStringHasLength(ezDataTagFilterType) || EzDataTagFilterType.UNKNOWN === ezDataTagFilterType) {
            ezDataTagFilterType = EzDataTagFilterType.ALL;
        }

        let url = ezApi.ezUrlTemplate`
                ${EzDataTagService.ezInstance.ezBaseDataTagApiUri}/assigned/
                employee/${employeeId}
                ?data-tag-type=${ezDataTagTypeFilter}
                &filter=${ezDataTagFilterType}`;

        return ezApi.ezclocker.ezHttpHelper.ezGet(url)
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @public @method
        Returns all data tags assigned to the provided timeEntryId
        @param {number} timeEntryId
        @returns {Promise}
     */
    ezGetAllDataTagsAssignedToTimeEntry(timeEntryId) {
        if (!ezApi.ezIsNumber(timeEntryId)) {
            throw new EzBadParamException(
                'timeEntryId',
                EzDataTagService.ezInstance,
                EzDataTagService.ezInstance.ezGetAllDataTagsAssignedToTimeEntry);
        }

        let url = `${EzDataTagService.ezInstance.ezBaseDataTagApiUri}/assigned/timeentry/${timeEntryId}`;
        return ezApi.ezclocker.ezHttpHelper.ezGet(url)
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @public @method
        Gets the data tag associated with the provided id
        @param {number} dataTagId
        @returns {Promise}
     */
    ezGetDataTag(dataTagId) {
        if (!ezApi.ezIsNumber(dataTagId)) {
            throw new EzBadParamException(
                'dataTagId',
                EzDataTagService.ezInstance,
                EzDataTagService.ezInstance.ezGetDataTag);
        }

        let url = `${EzDataTagService.ezInstance.ezBaseDataTagApiUri}/${dataTagId}`;
        return ezApi.ezclocker.ezHttpHelper.ezGet(url)
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @public @method
        Creates a new data tag from the provided EzDataTag
        @param {EzDataTag} ezDataTag
        @returns {Promise}
     */
    ezCreateDataTag(ezDataTag) {
        if (!ezApi.ezIsValid(ezDataTag)) {
            throw new EzBadParamException(
                'ezDataTag',
                EzDataTagService.ezInstance,
                EzDataTagService.ezInstance.ezCreateDataTag);
        }

        return ezApi.ezclocker.ezHttpHelper.ezPost(
            EzDataTagService.ezInstance.ezBaseDataTagApiUri,
            ezApi.ezToJson(ezDataTag))
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @public @method
        Updates an existing data tag associated with the dataTagId with the provided ezDataTag data.
        @param {number} dataTagId
        @param {EzDataTag} ezDataTag
        @param {undefiend|null|EzEntityType} filterByAssignedEntityTypeName
        @returns {Promise}
     */
    ezUpdateDataTag(dataTagId, ezDataTag, filterByAssignedEntityTypeName) {
        if (!ezApi.ezIsNumber(dataTagId)) {
            throw new EzBadParamException(
                'dataTagId',
                EzDataTagService.ezInstance,
                EzDataTagService.ezInstance.ezUpdateDataTag);
        }
        if (!ezApi.ezIsValid(ezDataTag)) {
            throw new EzBadParamException(
                'ezDataTag',
                EzDataTagService.ezInstance,
                EzDataTagService.ezInstance.ezUpdateDataTag);
        }

        let params = ezApi.ezStringHasLength(filterByAssignedEntityTypeName)
            ? `?assigned-entity-type-name=${filterByAssignedEntityTypeName}`
            : '';

        let url = `${EzDataTagService.ezInstance.ezBaseDataTagApiUri}/${dataTagId}${params}`;

        return ezApi.ezclocker.ezHttpHelper.ezPut(
            url,
            ezApi.ezToJson(ezDataTag))
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @public @method
        Archives an existing data tag associated with the provided id
        @param {number} dataTagId
        @returns {Promise}
     */
    ezArchiveDataTag(dataTagId) {
        if (!ezApi.ezIsNumber(dataTagId)) {
            throw new EzBadParamException(
                'dataTagId',
                EzDataTagService.ezInstance,
                EzDataTagService.ezInstance.ezArchiveDataTag);
        }

        let url = `${EzDataTagService.ezInstance.ezBaseDataTagApiUri}/archive/${dataTagId}`;
        return ezApi.ezclocker.ezHttpHelper.ezPut(url)
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @public @method
        Archives an existing data tag associated with the provided id
        @param {number} dataTagId
        @returns {Promise}
     */
    ezUnarchiveDataTag(dataTagId) {
        if (!ezApi.ezIsNumber(dataTagId)) {
            throw new EzBadParamException(
                'dataTagId',
                EzDataTagService.ezInstance,
                EzDataTagService.ezInstance.ezUnarchiveDataTag);
        }

        let url = `${EzDataTagService.ezInstance.ezBaseDataTagApiUri}/unarchive/${dataTagId}`;
        return ezApi.ezclocker.ezHttpHelper.ezPut(url, '')
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @public @method
        Returns if the provided dataTagId has any DataTagMap assignments.
        @param {number} dataTagId
        @returns {Promise}
     */
    ezDataTagHasAssignments(dataTagId) {
        if (!ezApi.ezIsNumber(dataTagId)) {
            throw new EzBadParamException(
                'dataTagId',
                EzDataTagService.ezInstance,
                EzDataTagService.ezInstance.ezUnarchiveDataTag);
        }

        let url = `${EzDataTagService.ezInstance.ezBaseDataTagApiUri}/${dataTagId}/has-assignments`;

        return ezApi.ezclocker.ezHttpHelper.ezGet(url)
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }
}

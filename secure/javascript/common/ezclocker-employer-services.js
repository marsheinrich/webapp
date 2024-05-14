import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzFunction,
    EzJson,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';
import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

/**
    @class
    @extends {EzClass}
    Client for ezClocker Empoyer Services
    ---------------------------------------------------------------------------
    Import with:
        import { EzEmployerService } from '/secure/javascript/common/ezclocker-employer-services.js';
    ---------------------------------------------------------------------------
    Ready checks:
        globalThis.ezApi.ezclocker[EzEmployerService.ezApiName] &&
        globalThis.ezApi.ezclocker[EzEmployerService.ezApiName].ready
    ---------------------------------------------------------------------------
    Listen for onReady event:
        document.addEventListener(
            EzEmployerService.ezEventNames.onReady,
            this.#ezRegistrator);
    ---------------------------------------------------------------------------
 */
export class EzEmployerService extends EzClass {
    static DEFAULT_EMPLOYER_LOGO_IMAGE_FILE_NAME = 'dallas.png';

    static DEFAULT_EMPLOYER_LOGO_IMAGE_URL =
        `/public/images/${EzEmployerService.DEFAULT_EMPLOYER_LOGO_IMAGE_FILE_NAME}`;

    // Classic APIs
    static EMPLOYER_LOGO_EXISTS_CLASSIC_API_PATH = 'employer/logo/exists';

    static EMPLOYER_LOGO_EXISTS_CLASSIC_API_URL = `/_${EzEmployerService.EMPLOYER_LOGO_EXISTS_CLASSIC_API_PATH}`;

    static EMPLOYER_LOGO_DOWNLOAD_CLASSIC_API_PATH = 'employer/logo/download';

    static EMPLOYER_LOGO_DOWNLOAD_CLASSIC_API_URL =
        `/_${EzEmployerService.EMPLOYER_LOGO_EXISTS_CLASSIC_API_PATH}`;

    static GET_ACTIVE_EMPLOYERS_CLASSIC_API_PATH = 'employer/active';

    static GET_ACTIVE_EMPLOYERS_CLASSIC_API_URL = `/_${EzEmployerService.GET_ACTIVE_EMPLOYERS_API_PATH}`;

    static GET_ACTIVE_EMPLOYERS_FOR_USER_CLASSIC_API_PATH = 'employer/active';

    static GET_ACTIVE_EMPLOYERS_FOR_USER_CLASSIC_API_URL =
        `/${EzEmployerService.GET_ACTIVE_EMPLOYERS_FOR_USER_CLASSIC_API_PATH}`;

    // V1 APIs
    static GET_ACTIVE_INTEGRATIONS_V1_API_PATH = 'integrations/active';

    static GET_ACTIVE_INTEGRATIONS_V1_API_URL = `/api/v1/${EzEmployerService.GET_ACTIVE_INTEGRATIONS_API_PATH}`;

    static GET_EMPLOYEES_ASSIGNED_TO_LOCATION_V1_API_PATH = 'location/employer/assigned';

    static GET_EMPLOYEES_ASSIGNED_TO_LOCATION_V1_API_URL =
        `/_api/v1/${EzEmployerService.GET_EMPLOYEES_ASSIGNED_TO_LOCATION_V1_API_PATH}`;

    /**
        API path for the GET employer logo for employer id V1 API.
        NOTE:
        The path value contains a path variable place holder of:
            EzNavigation.EZPathVar_employerId which equals string '[EZPV_employerId]'
        The EzNavigation.EZPathVar_employerId path variable place holder must get replaced by the actual employerId value
        before the path is valid:
            EzEmployerService.GET_EMPLOYER_LOGO_FOR_EMPLOYERID_V1_API_URL
                .replace(
                    EzNavigation.EZPathVar_employerId,
                    employerId);
     */
    static GET_EMPLOYER_LOGO_FOR_EMPLOYERID_V1_API_PATH = `employer/${EzNavigation.EZPathVar_employerId}/logo`;

    /**
        URL for the GET employer logo for employer id V1 API.
        NOTE:
        The url string value contains a path variable place:
            EzNavigation.EZPathVar_employerId which equals string '[EZPV_employerId]'
        The EzNavigation.EZPathVar_employerId path variable place holder must get replaced by the actual employerId value
        before the url is valid and usable:
            EzEmployerService.GET_EMPLOYER_LOGO_FOR_EMPLOYERID_V1_API_URL
                .replace(
                    EzNavigation.EZPathVar_employerId,
                    employerId);
     */
    static GET_EMPLOYER_LOGO_FOR_EMPLOYERID_V1_API_URL =
        `/_api/v1/${EzEmployerService.GET_EMPLOYER_LOGO_FOR_EMPLOYERID_V1_API_PATH}`;

    // V2 APIs
    static GET_EMPLOYER_LOGO_V2_API_PATH = 'employer/logo';

    static GET_EMPLOYER_LOGO_V2_API_URL = `/api/v2/${EzEmployerService.GET_EMPLOYER_LOGO_API_PATH}`;

    /**
        @static
        @public @readonly @property
        Returns the name of this class's singleton instance when registered with ezApi.
        @returns {string}
     */

    static get ezApiName() {
        return 'ezEmployerService';
    }

    /**
        @static
        @public @readonly @property
        Returns an object of event names that this class may trigger.
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOnEzEmployerServiceApiReady'
        };
    }

    /**
         @static
         @private @field
         Stores the singleton instance of this class that was created by and registerd with EzApi.
         @type {EzEmployerService}
      */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzEmployerService.ezApiName])
        ? globalThis.ezApi.ezclocker[EzEmployerService.ezApiName]
        : null;

    /**
        @static
        @public @property @getter
        Returns the singleton instance of this class that is registered with EzApi (if available yet)
        @returns {EzEmployerService}
     */
    static get ezInstance() {
        return EzEmployerService.#ezInstance;
    }

    /**
        @static
        @public @property @setter
        Sets the singleton instance of of this class that is registered with EzApi.
        @param {EzEmployerService} instance
     */
    static set ezInstance(instance) {
        if (null != EzEmployerService.#ezInstance) {
            throw new Error('EzEmployerService\'s singleton instance is already reigstered with EzApi.');
        }

        EzEmployerService.#ezInstance = instance;
    }

    /**
        @static
        @private @field
        Stores the EzApi registration state for this class.
        Default value is NULL
        Class is registerd with EzApi when value is EzRegistrationState.REGISTERED
        @type {string}
        A valid enum property value from EzRegistrationState
     */
    static #ezApiRegistrationState = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzEmployerService.ezApiName])
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
        return EzEmployerService.#ezApiRegistrationState;
    }

    /**
        @static
        @public @property @setter
        Sets the ezApi registration state of this classes's singleton instance.
        @param {string} ezApiRegistrationState
        A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzEmployerService.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
        @static
        @private @readonly @property
        Returns true when all required dependencies for this class report ready.
        In otherwords, the require dependency's singleton instance is created
        and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
        @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzEmployerService.ezApiRegistrationState &&
            EzObject.hasProperty(globalThis, 'ezApi') &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready;
    }

    /**
        @static
        @private @readonly @property
        Returns if this class's singleton instance is registered with ezApi yet.
        @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzEmployerService.ezInstance &&
            EzRegistrationState.REGISTERED === EzEmployerService.ezApiRegistrationState;
    }

    /**
        @static
        @private @method
        Attempts to register the singleton instance for this class with ezApi. Returns true
        if successful, false otherwise.
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzEmployerService.#ezCanRegister && !EzEmployerService.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzEmployerService, EzEmployerService.ezApiName);
        }

        return EzEmployerService.#ezIsRegistered;
    }

    /**
        @static
        Static Initialization
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        >> IMPORTANT <<
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Make sure the following properties and methods get defined BEFORE this static initialization section:
            1) Property getter EzEmployerService.ezApiName
            2) Property getter EzEmployerService.ezEventNames
            3) Property getter EzEmployerService.ezInstance
            4) Property setter EzEmployerService.ezInstance
            5) Property getter EzEmployerService.ezApiRegistrationState
            6) Property setter EzEmployerService.ezApiRegistrationState
            7) Property getter EzEmployerService.#ezCanRegister
            8) Property getter EzEmployerService.#ezIsRegistered
            9) Method EzEmployerService.#ezRegistrator()
     */
    static {
        if (!EzEmployerService.#ezIsRegistered) {
            EzEmployerService.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzEmployerService.#ezRegistrator()) {
                document.addEventListener(
                    EzEmployerService.ezOnEzApiReadyEventName,
                    EzEmployerService.#ezRegistrator);

                document.addEventListener(
                    EzHttpHelper.ezEventNames.onReady,
                    EzEmployerService.#ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.onReady,
                    EzEmployerService.#ezRegistrator);
            }
        }
    }

    /**
        @public @constructor
        >> DO NOT CREATE NEW INSTANCES OUTSIDE OF THE STATIC INITIALIZATION FLOW <<
        Use the static singleton instance available from ezApi: ezApi.ezclocker.ezEmployerService.
     */
    constructor() {
        super();
    }

    /**
        @protected @method
        Initializes ezEmployerService
        @returns {EzEmployerService}
     */
    ezInit() {
        const self = EzEmployerService.ezInstance;

        //  Image urls
        EzEmployerService.DEFAULT_EMPLOYER_LOGO_IMAGE_URL = ezApi.ezclocker.ezNavigation.ezGetPublicImagesUrl(
            EzEmployerService.DEFAULT_EMPLOYER_LOGO_IMAGE_FILE_NAME);

        // Classic API Urls
        EzEmployerService.EMPLOYER_LOGO_DOWNLOAD_CLASSIC_API_URL = ezApi.ezclocker.ezNavigation.ezGetInternalClassicApiUrl(
            EzEmployerService.EMPLOYER_LOGO_DOWNLOAD_CLASSIC_API_PATH);
        EzEmployerService.EMPLOYER_LOGO_EXISTS_CLASSIC_API_URL = ezApi.ezclocker.ezNavigation.ezGetInternalClassicApiUrl(
            EzEmployerService.EMPLOYER_LOGO_EXISTS_CLASSIC_API_PATH);
        EzEmployerService.GET_ACTIVE_EMPLOYERS_FOR_USER_CLASSIC_API_URL = ezApi.ezclocker.ezNavigation.ezGetInternalClassicApiUrl(
            EzEmployerService.GET_ACTIVE_EMPLOYERS_FOR_USER_CLASSIC_API_PATH);
        EzEmployerService.GET_ACTIVE_EMPLOYERS_CLASSIC_API_URL = ezApi.ezclocker.ezNavigation.ezGetInternalClassicApiUrl(
            EzEmployerService.GET_ACTIVE_EMPLOYERS_CLASSIC_API_PATH);

        // V1 API Urls
        EzEmployerService.GET_ACTIVE_INTEGRATIONS_V1_API_URL = ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
            EzEmployerService.GET_ACTIVE_INTEGRATIONS_V1_API_PATH,
            'v1');
        EzEmployerService.GET_EMPLOYEES_ASSIGNED_TO_LOCATION_V1_URL = ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
            EzEmployerService.GET_EMPLOYEES_ASSIGNED_TO_LOCATION_V1_API_PATH,
            'v1');
        // NOTE:
        //  GET_EMPLOYER_LOGO_FOR_EMPLOYERID_V1_API_URL contains a path variable place holder of
        //  EzNavigation.EZPathVar_employerId that will need replaced by the actual employer id value.
        EzEmployerService.GET_EMPLOYER_LOGO_FOR_EMPLOYERID_V1_API_URL = ezApi.ezclocker.ezNavigation.getInternalApiUrl(
            EzEmployerService.GET_EMPLOYER_LOGO_FOR_EMPLOYERID_V1_API_PATH,
            'v1');

        // V2 API Urls
        EzEmployerService.GET_EMPLOYER_LOGO_V2_API_URL = ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
            EzEmployerService.GET_EMPLOYER_LOGO_V2_API_PATH,
            'v2');

        self.ready = true;
        return self;
    }

    /**
        @deprecated
        Migrate to using EzCLockerContext
        @public @method
        Obtains the primary employer (loading it if necessary)
        @returns {object}
     */
    ezGetPrimaryEmployer() {
        return EzEmployerService.ezInstance.loadPrimaryEmployer();
    }

    /**
        @deprecated
        Migrate to using EzClockerContext
        @public @method
        Gets a list of the currently logged in employers
        @returns {Promise}
     */
    getActiveEmployers() {
        ezApi.ezclocker.ezHttpHelper.ezGet(EzEmployerService.GET_ACTIVE_EMPLOYERS_CLASSIC_API_UR)
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);
    }

    /**
        @deprecated
        Migreate to using EzClockerContext
        @public @method
        Return the active (aka primary) employer for the logged in user
        @returns {Promise}
     */
    activeEmployersForUser() {
        return ezApi.ezclocker.ezHttpHelper.ezGet(EzEmployerService.GET_ACTIVE_EMPLOYERS_FOR_USER_CLASSIC_API_URL)
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);
    }

    /**
        @public @method
        Builds form data for posting
        @param {string} rawFormId
        @returns {FormData}
     */
    buildFormData(rawFormId) {
        if (!rawFormId) {
            return new FormData(); // blank
        }

        let form = document.getElementById(rawFormId);

        if (!form) {
            return new FormData();
        }

        return new FormData(form);
    }

    /**
        @public @method
        Gets the employer image
        @param {number} employerId
        @param {string} imageContainerId
     */
    loadEmployerImage(employerId, imageContainerId) {
        const self = EzEmployerService.ezInstance;

        self.loadingImageEmployerId = employerId;

        if (!EzObject.isValid(employerId)) {
            ezApi.ezclocker.ezUi.ezSetElementAttribute(
                imageContainerId,
                'src',
                EzEmployerService.DEFAULT_EMPLOYER_IMAGE_URL);
            return EzEmployerService.DEFAULT_EMPLOYER_IMAGE_URL;
        }

        ezApi.ezclocker.ezUi.ezSetElementAttribute(
            imageContainerId,
            'src',
            EzEmployerService.GET_EMPLOYER_LOGO_V2_API_URL);
    }

    /**
        @public
        Loads the employer image
        @param {number} employerId
        @returns {Promise.resolve}
        Resolve returns the employer logo url to use.
     */
    ezLoadEmployerImage(employerId) {
        if (!EzNumber.isNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                EzEmployerService.ezInstance,
                EzEmployerService.ezInstance.ezLoadEmployerImage);
        }

        return EzPromise.promise((resolve) => {
            if (!EzObject.isValid(employerId)) {
                return resolve(EzEmployerService.DEFAULT_EMPLOYER_LOGO_IMAGE_URL);
            }

            let apiURL = `${EzEmployerService.EMPLOYER_LOGO_EXISTS_CLASSIC_API_URL}/${employerId}`;

            ezApi.ezclocker.ezHttpHelper.ezGet(apiURL)
                .then(
                    (response) => {
                        return !EzObject.isValid(response) || 'false' === response.message.toLowerCase()
                            ? resolve(EzEmployerService.DEFAULT_EMPLOYER_LOGO_IMAGE_URL)
                            : resolve(
                                ezApi.ezUrlTemplate`
                                    ${EzEmployerService.EMPLOYER_LOGO_DOWNLOAD_CLASSIC_API_URL}
                                    /${employerId}`);
                    },
                    (eResponse) => {
                        ezApi.ezclocker.ezLogger.error(
                            EzString.em`
                                Failed to load the employer logo for employer with employerId=${employerId}
                                Error response: ${ezApi.ezToJson(eResponse)}`);

                        return resolve(EzEmployerService.DEFAULT_EMPLOYER_LOGO_IMAGE_URL);
                    });
        });
    }

    /**
        @public @method
        Gets the assigned employees for a location
        @param {long} employerId
        @param {long} locationId
        @returns {Promise}
        @deprecated
        Migrate to EzClockerContext
     */
    ezGetLocationAssignedEmployees(employerId, locationId) {
        if (!EzNumber.isNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                EzEmployerService.ezInstance,
                EzEmployerService.ezInstance.ezGetLocationAssignedEmployees);

        }
        if (!EzNumber.isNumber(locationId)) {
            throw new EzBadParamException(
                'locationId',
                EzEmployerService.ezInstance,
                EzEmployerService.ezInstance.ezGetLocationAssignedEmployees);
        }

        return ezApi.ezclocker.ezHttpHelper.ezGet(
            `${EzEmployerService.GET_EMPLOYEES_ASSIGNED_TO_LOCATION_V1_URL}/${locationId}`)
            .then(
                ezApi.ezclocker.ezHttpHelper.ezProcessApiResolve,
                ezApi.ezclocker.ezHttpHelper.ezProcessApiReject);
    }

    /**
        @public @method
        Uploads the employer logo
        @param {number} employerId
        @param {object} formData
        @param {function|null} onUploadProgressCallback
        @returns {Promise}
        Resolve returns success response string
        Reject returns error response object.
     */
    ezUploadEmployerLogo(formData, onUploadProgressCallback) {
        if (!EzObject.isValid(formData)) {
            throw new EzBadParamException(
                'formData',
                EzEmployerService.ezInstance,
                EzEmployerService.ezInstance.ezUploadEmployerLogo);
        }

        // NOTE:
        //  GET_EMPLOYER_LOGO_FOR_EMPLOYERID_V1_API_URL contains a path variable place holder of
        //  EzNavigation.EZPathVar_employerId that will need replaced by the actual employer id value.
        let url = ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl('employer/logo', 'v2');

        return EzPromise.promise(
            (resolve, reject) => ezApi.ezclocker.ezHttpHelper.httpPOSTFileUpload(
                url,
                formData,
                // Success response handler
                (response) => {
                    if (200 != response.currentTarget.status &&
                        201 != response.currentTarget.status) {
                        // Response was NOT a 200 status

                        if (response.currentTarget.response) {
                            return reject(response.currentTarget.response);
                        }

                        if (response.currentTarget.responseText) {
                            return reject(response.currentTarget.responseText);
                        }

                        return reject({
                            errorCode: response.currentTarget.status,
                            message: 'Logo upload failed'
                        });
                    }

                    return resolve(response);
                },
                // Error response handler
                (eResponse) => {
                    return reject(EzJson.fromJson(eResponse));
                },
                // Upload progress callback
                EzFunction.isFunction(onUploadProgressCallback)
                    ? onUploadProgressCallback
                    : null));


        // TODO: Verify new method works!
        /* UNTESTED NEW UPLOAD CODE
        (resolve, reject) => ezApi.ezclocker.ezHttpHelper.ezUploadFile(
            apiURL,
            formData,
            ezApi.ezclocker.ezHttpHelper.MEDIA_TYPE_APPLICATION_X_WWW_FORM_URLENCODED,
            ezApi.ezclocker.ezHttpHelper.MEDIA_TYPE_APPLICATIONJSON,
            ezApi.ezIsFunction(onUploadProgressCallback)
                ? onUploadProgressCallback
                : null)
            .then(
                (response) => {
                    if (200 <= response.currentTarget.status &&
                        100 < response.currentTarget.status &&
                        300 > response.currentTarget.status) {
                        // Response was NOT a 200 status

                        if (response.currentTarget.response) {
                            return reject(response.currentTarget.response);
                        }

                        if (response.currentTarget.responseText) {
                            return reject(response.currentTarget.responseText);
                        }

                        return reject(
                            ezApi.ezToJson({
                                errorCode: response.currentTarget.status,
                                message: 'Logo upload failed'
                            }));
                    }
                    return resolve(response);
                },
                (eResponse) => {
                    return reject(ezApi.ezFromJson(eResponse));
                }));
        */
    }

    /**
        @public @method
        Deletes an employer account
        @param {number} userId
        @param {number} employerId
        @param {string} userName
        @param {string} password
        @returns {Promise}
     */
    ezDeleteEmployerAccount(userId, employerId, userName, password) {
        if (!EzObject.isValid(userId) || !EzObject.isValid(userName) || !EzObject.isValid(employerId)) {
            let em = 'Delete employer account requires a user id, user name, and employer id.';

            ezApi.ezclocker.ezLogger.error(em);

            return EzPromise.reject(
                ezApi.ezclocker.ezDialog.ezBuildErrorResponse(500, em));
        }

        let url = ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(`account/${userId}`, 'v1');

        return ezApi.ezclocker.ezHttpHelper.ezDelete(
            url,
            password,
            true,
            (jqXHR) => {
                ezApi.ezclocker.ezHttpHelper.addHeader(
                    jqXHR,
                    'x-ezclocker-employerid',
                    employerId.toString());
                ezApi.ezclocker.ezHttpHelper.addHeader(
                    jqXHR,
                    'x-ezclocker-username',
                    userName);

                return true;
            });
    }

    /**
        @public @method
        Gets the currently active integration for the employer
        @returns {Promise}
        Resolve returns success response object
        Reject returns error response object
     */
    ezGetActiveIntegration() {
        return EzPromise.promise(
            (resolve, reject) => {
                ezApi.ezclocker.ezHttpHelper.ezGet(EzEmployerService.GET_ACTIVE_INTEGRATIONS_V1_API_URL)
                    .then(
                        (response) => {
                            if (!EzObject.isValid(response) || 0 != response.errorCode) {
                                return reject(response);
                            }

                            return 0 == response.activeIntegrations.length
                                ? reject(response)
                                : resolve(response);
                        },
                        (eResponse) => {
                            ezApi.ezclocker.ezLogger.error(
                                EzString.em`
                                    Failed to obtain active inetgrations.
                                    Error response: ${EzJson.toJson(eResponse)}`);

                            return reject(eResponse);
                        });
            });
    }
}

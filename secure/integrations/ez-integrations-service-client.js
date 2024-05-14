import { EzIntegrationType } from '/secure/integrations/ez-integration-enums.js';

class EzIntegrationServiceClient {
    static ezApiName = 'ezIntegrationServiceClient';
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzIntegrationServiceClient.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    static ezRegistrator() {
        if (EzIntegrationServiceClient.ezCanRegister()) {
            EzIntegrationServiceClient.ezInstance = ezApi.ezRegisterNewApi(
                EzIntegrationServiceClient,
                EzIntegrationServiceClient.ezApiName);

            EzIntegrationServiceClient.ezApiRegistrationState = 'REGISTERED';
        }
    }
    // Static Initialization
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                this.ezRegistrator);
        }
    }

    constructor() {
        this.ready = false;

        this.EZ_INTEGRATION_SERVICE_BASE_URL = '/_api/v1/integrations';

        this.templates = {
            requests: {
                single: {
                    active: true,
                    integrationEmployeeId: null,
                    ezClockerEmployeeId: null
                },
                collection: {
                    employeeIntegrationMapRequestEntities: []
                }
            }
        };
    }

    /**
     * @public
     * Initializes EzIntegrationServiceClient
     * @returns {EzIntegrationServiceClient}
     */
    ezInit() {
        return EzIntegrationServiceClient.ezInstance;
    }

    /**
     * @public
     * Builds the service's root api url
     * @param {long} employerId
     * @returns {string}
     */
    ezBuildServiceRootApiUrl(employerId) {
        return ezApi.p.nav.getInternalApiServiceUrl('employer/' + employerId + '/integrations', 'v1');
    }

    /**
     * @public
     * Builds the api url for adding a single employee integration map
     * @param {string} ezIntegrationProviderId
     * @param {long} ezClockerEmployeeId
     * @param {string} integrationEmployeeId
     * @returns {string}
     */
    ezBuildAddSingleEmployeeIntegrationMapApiUrl(employerId, ezIntegrationProviderId,
        ezClockerEmployeeId, integrationEmployeeId) {
        const self = EzIntegrationServiceClient.ezInstance;

        return self.ezBuildServiceRootApiUrl(employerId) + '/' + ezIntegrationProviderId +
            '/employees/' + ezClockerEmployeeId + '/map/' + integrationEmployeeId;
    }

    /**
     * @public
     * Builds the api url for adding bulk employee integration maps
     * @param {long} employerId
     * @param {string} ezIntegrationProviderId
     * @returns {string}
     */
    ezBuildAddBulkEmployeeIntegrationMapsApiUrl(employerId, ezIntegrationProviderId) {
        const self = EzIntegrationServiceClient.ezInstance;

        return self.ezBuildServiceRootApiUrl(employerId) + '/' + ezIntegrationProviderId + '/maps';
    }

    /**
     * @public
     * Builds the api url for getting an employees integration map
     * @param {long} employerId
     * @param {string} ezIntegrationProviderId
     * @param {long} ezClockerEmployeeId
     * @returns {string}
     */
    ezBuildGetEmployeeIntegrationMapApiUrl(employerId, ezIntegrationProviderId,
        ezClockerEmployeeId) {
        const self = EzIntegrationServiceClient.ezInstance;

        return self.ezBuildServiceRootApiUrl(employerId) + '/' + ezIntegrationProviderId + '/employees/' + ezClockerEmployeeId;
    }

    /**
     * @public
     * Builds the api url for deleting an employee integration map
     * @param {long} employerId
     * @param {string} ezIntegrationProviderId
     * @param {long} ezClockerEmployeeId
     * @param {string} integrationEmployeeId
     * @returns {Promise}
     */
    ezBuildDeleteEmployeeIntegrationMapApiUrl(employerId, ezIntegrationProviderId,
        ezClockerEmployeeId,
        integrationEmployeeId) {
        const self = EzIntegrationServiceClient.ezInstance;

        return self.ezBuildServiceRootApiUrl(employerId) + '/' + ezIntegrationProviderId + '/employees/' + ezClockerEmployeeId + '/map/' +
            integrationEmployeeId;
    }

    /**
     * @public
     * Creates a EmployeeIntegrationMapRequestEntity entity from the provided data.
     * @param {string} eiIntegrationEmployeeId
     * @param {long} eiEzClockerEmployeeId
     * @param {boolean} eiActive
     * @returns {object}
     */
    ezCreateEmployeeIntegrationMapRequestEntity(eiIntegrationEmployeeId, eiEzClockerEmployeeId,
        eiActive) {
        return {
            active: ezApi.isValid(eiActive) ? eiActive : true,
            integrationEmployeeId: eiIntegrationEmployeeId,
            ezClockerEmployeeId: eiEzClockerEmployeeId
        };
    }

    /**
     * @public
     * Creates the request entity for bulk employee integration map api operations
     * @param {array} entities
     * Array of EmployeeIntegrationMapRequestEntity
     * @returns {object}
     */
    ezCreateBulkEmployeeIntegrationMapRequestEntity(entities) {

        entities = ezApi.isValid(entities) ? entities : [];
        return {
            employeeIntegrationMapRequestEntities: entities
        };
    }

    /**
     * @public
     * Posts a single employee integration mapping
     * @param {long} ezClockerEmployerId
     * @param {string} ezIntegrationProviderId
     * @param {long} ezClockerEmployeeId
     * @param {string} integrationEmployeeId
     * @param {string} integrationProviderId
     * @param {string} providerEmployeeName
     * @param {boolean} eiActive
     * @returns {Promise}
     */
    ezPostEmployeeIntegrationMap(integrationProviderId, ezClockerEmployerId,
        ezClockerEmployeeId, providerEmployeeId, providerEmployeeName, providerConnectionId, isActive) {
        let url = '/_api/v1/integrations/' + integrationProviderId + '/employee-map';

        return ezApi.ezclocker.http.ezPost(url, ezApi.ezToJson({
            integrationProviderId: integrationProviderId,
            ezEmployerId: ezClockerEmployerId,
            ezEmployeeId: ezClockerEmployeeId,
            providerConnectionId: providerConnectionId,
            providerEmployeeId: providerEmployeeId,
            providerEmployeeName: providerEmployeeName,
            active: ezApi.ezIsTrue(isActive),
            source: 'WEBSITE'
        }));
    }

    /**
     * @public
     * Posts a single employee integration mapping
     * @param {long} ezClockerEmployerId
     * @param {string} ezIntegrationProviderId
     * @param {long} ezClockerEmployeeId
     * @param {string} integrationEmployeeId
     * @param {string} integrationProviderId
     * @param {string} providerEmployeeName
     * @param {boolean} eiActive
     * @returns {Promise}
     */
    ezPostExportTimeEntries(integrationProviderId, ezContextId, fromDate, toDate) {
        let url = '/_api/v1/integrations/' + integrationProviderId + '/export/time-entries';

        return ezApi.ezclocker.http.ezPost(url, ezApi.ezToJson({
            endDateTimeIso: toDate,
            startDateTimeIso: fromDate,
            ezContextId: ezContextId,
            source: 'WEBSITE'
        }));
    }

    /**
     * @public
     * Posts a single pay chex integration mapping
     * @param {long} ezClockerEmployerId
     * @param {string} ezIntegrationProviderId
     * @param {long} ezClockerEmployeeId
     * @param {string} integrationEmployeeId
     * @param {string} integrationProviderId
     * @param {string} providerEmployeeName
     * @param {boolean} eiActive
     * @returns {Promise}
     */
    ezPostPayChexExportTimeEntries(integrationProviderId, ezContextId, fromDate, toDate) {
        fromDate = ezApi.ezclocker.ezDateTime.ezMomentToIsoString(fromDate);
        toDate = ezApi.ezclocker.ezDateTime.ezMomentToIsoString(toDate);
        let url = '/_api/v1/integrations/' + integrationProviderId + '/export/paychex-integration?endDateTimeIso=' + toDate + '&startDateTimeIso=' + fromDate +
            '&ezContextId=' + ezContextId;
        console.log(url);
        return ezApi.ezclocker.http.ezGet(url);
    }

    /**
     * @public
     * Get active integration
     * @returns {Promise}
     */
    ezGetActiveIntegration() {
        let url = '/_api/v1/integrations/active-integration';
        return ezApi.ezclocker.http.ezGet(url);
    }

    /**
     * @public
     * Creates/updates a new employer integration map entry
     * @param {string} integrationProviderId
     * @param {number} ezClockerEmployerId
     * @param {string} providerConnectionId
     * @param {null|boolean} isActive
     * Default is false if not provided.
     * @param {null|boolean} isPrimary
     * Default is false if not provided.
     * @returns {Promise}
     */
    ezCreateUpdateEmployerIntegrationMap(integrationProviderId,
        integrationType, ezClockerEmployerId, isActive, isPrimary) {
        const self = EzIntegrationServiceClient.ezInstance;

        let em = '';
        if (ezApi.ezIsEmptyString(integrationProviderId)) {
            em = 'A valid integrationProviderId is required to create the employer integration map.';
            ezApi.ezclocker.logger.error(em);
            return ezApi.ezReject(ezApi.ezBuildEzClockerErrorResponse(400, em));
        }
        if (!ezApi.ezIsNumber(ezClockerEmployerId)) {
            em = 'A valid ezClockerEmployerId is required to create the employer integration map.';
            ezApi.ezclocker.logger.error(em);
            return ezApi.ezReject(ezApi.ezBuildEzClockerErrorResponse(400, em));
        }
        integrationType = ezApi.ezIsEmptyString(integrationType)
            ? EzIntegrationType.TIME_ENTRY_REPORT
            : integrationType;

        isPrimary = ezApi.ezIsTrue(isPrimary);
        isActive = ezApi.ezIsTrue(isActive);

        let url = self.EZ_INTEGRATION_SERVICE_BASE_URL + '/' + integrationProviderId + '/employer-map';
        return ezApi.ezclocker.http.ezPost(url, ezApi.ezToJson({
            integrationType: integrationType,
            ezClockerEmployerId: ezClockerEmployerId,
            primaryIntegration: isPrimary,
            integrationProviderId: integrationProviderId,
            active: ezApi.ezIsTrue(isActive),
            source: 'WEBSITE'
        }));
    }

    /**
     * @public
     * @param {long} employerId
     * @param {string} ezIntegrationProviderId
     * @param {array} entities
     * Array of EmployeeIntegrationMapRequestEntity
     * @returns {Promise}
     */
    ezPostBulkEmployeeIntegrationMaps(employerId, ezIntegrationProviderId, entities) {
        const self = EzIntegrationServiceClient.ezInstance;

        return ezApi.ezclocker.http.ezPost(self.ezBuildAddBulkEmployeeIntegrationMapsApiUrl(employerId, ezIntegrationProviderId), ezApi
            .toJsonString(entities));
    }

    /**
     * @public
     * Gets the employee integration map for a employer, integration provider, and ez employee
     * @param {long} employerId
     * @param {string} ezIntegrationProviderId
     * @param {long} ezClockerEmployerId
     * @returns {Promise}
     */
    ezGetEmployeeIntegrationMap(employerId, ezIntegrationProviderId, ezClockerEmployerId) {
        const self = EzIntegrationServiceClient.ezInstance;

        return ezApi.ezclocker.http.ezGet(self.ezBuildGetEmployeeIntegrationMapApiUrl(employerId, ezIntegrationProviderId,
            ezClockerEmployerId));
    }

    /**
     * @public
     * Deletes an employee integration map
     * @param {long} employerId
     * @param {string} ezIntegrationProviderId
     * @param {long} ezClockerEmployerId
     * @param {string} integrationEmployeeId
     * @returns {Promise}
     */
    deleteEmployeeIntegration(employerId, ezIntegrationProviderId, ezClockerEmployerId,
        integrationEmployeeId) {
        const self = EzIntegrationServiceClient.ezInstance;

        return ezApi.p.ezHttp.ezDelete(
            self.ezBuildDeleteEmployeeIntegrationMapApiUrl(employerId, ezIntegrationProviderId, ezClockerEmployerId,
                integrationEmployeeId));
    }
}

export {
    EzIntegrationServiceClient
};
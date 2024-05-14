//import { EzEmployerService } from '/secure/javascript/common/ezclocker-employer-services.js';

/* globals ezApi:false */

/*
 * Including from WebApp Root:
 * <script id="public-ezApi" src="public/javascript/common/ezapi.js"></script>
 * <script id="public-ezLogger" src="public/javascript/common/ezclocker-logger.js"></script>
 * <script id="public-ezLogger" src="public/javascript/common/ezclocker-logger.js"></script>
 * <script id="public-ezNavigation" src="public/javascript/common/ezclocker-navigation-helper.js"></script>
 * <script id="secure-ezQboIntegrationClient" src="secure/integrations/qbo/EzQboIntegrationApiClient.js"></script>
 *
 * Description
 * EzClocker API client for the QBO Integration API's
 */

// TODO: Review this class for use and update or deprecate as necessary.

/** Constructor */
const EzQboIntegrationApiClient = function() {
    this.ready = false;
    this.integrationContext = {
        qboCompanyId: null,
        qboAuthenticationEndpoint: ezApi.p.nav.getInternalApiServiceUrl('integrations/login', 'v1'),
        buildAuthEndpoint: function(employerId, oauthProviderId) {
            return ezApi.urlAppend(this.qboAuthenticationEndpoint, employerId, oauthProviderId);
        }
    };

    return this;
};

/** Initializes this object */
EzQboIntegrationApiClient.prototype.ezInit = function() {
    const self = ezApi.ezclocker.ezQboIntegrationApiClient;

    self.ready = true;
    return self;
};

/** Kicks off authentication with QBO */
EzQboIntegrationApiClient.prototype.ezQboAuthenticate = function() {
    const self = ezApi.ezclocker.ezQboIntegrationApiClient;

    $(window.parent.document).hide();
    let employerId = ezApi.s.ezEmployerService.primaryEmployer.id;
    if (ezApi.isEmptyString(employerId)) {
        ezApi.p.logger.error('A valid employer id is required to begin authentication with QBO.');
        return;
    }

    return parent.redirect(
        self.integrationContext.buildAuthEndpoint(employerId, ezApi.s.ezIntegration.EzNovaOAuthProviderId.INTUIT)
    );
};

/** Gets employer information from QBO*/
EzQboIntegrationApiClient.prototype.ezQboGetEmployerInfo = function() {
    const self = ezApi.ezclocker.ezQboIntegrationApiClient;

    ezApi.p.logger.debug(
        'QBO Integration: Obtaining employer information from QuickBooks Online companyId=' +
        self.integrationContextqboCompanyId
    );
};

/** Gets employees from QBO */
EzQboIntegrationApiClient.prototype.ezQboGetEmployees = function() {
    const self = ezApi.ezclocker.ezQboIntegrationApiClient;

    ezApi.p.logger.debug(
        'QBO Integration: Obtaining all employee information from QuickBooks Online companyId=' +
        self.integrationContext.qboCompanyId
    );
};

/**
 * Posts the ezClocker time entries to QBO
 * @param {long} employerId
 * @param {string} startDateIso
 * @param {string} endDateIso
 */
EzQboIntegrationApiClient.prototype.ezQboPostTimeEntries = function(employerId, startDateIso, endDateIso) {
    const self = ezApi.ezclocker.ezQboIntegrationApiClient;

    ezApi.p.logger.debug(
        'QBO Integration: Posting ezClocker employerId=' +
        employerId +
        ' time entries ' +
        'from ' +
        startDateIso +
        ' to ' +
        endDateIso +
        ' to the QuickBooks Online companyId=' +
        self.integrationContext.qboCompanyId
    );
};

/**
 * JQuery HTML Injection of UI
 */
document.addEventListener('onEzApiReady', function() {
    ezApi.ezRegisterApi('ezQboIntegrationApiClient', new EzQboIntegrationApiClient()).ezInit();
});

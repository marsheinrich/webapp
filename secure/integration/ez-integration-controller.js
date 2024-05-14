/**
 * Global reference to the EzIntegrationController
 * Set during the jquery document.ready event
 */
var ezIntegrationController = null;

/**
 * Controller for the EzIntegration View
 */
var EzIntegrationController = function() {
    /*this.EzIntegrationParamNames = {
        PROVIDER_ID: 'pid'
    };
    this.EzIntegrationProviderId = {
        UNKOWN: 'UNKNOWN',
        QBO: 'EZ_INTEGRATION_QUICKBOOKS_ONLINE_PROVIDER',
        XERO: 'EZ_INTEGRATION_XERO_PROVIDER'
    };
    this.EzNovaOAuthProviderId = {
        UNKNOWN: 'UNKNOWN_AUTH',
        INTUIT: 'INTUIT_AUTH',
        XERO: 'XERO_AUTH'
    };
    this.EzNovaProviderId = {
        UNKNOWN: 'UNKNOWN',
        INTUIT: 'INTUIT',
        XERO: 'XERO'
    };*/

    this.context = {
        providerId: this.EzIntegrationProviderId.UNKNOWN,
        oauthProviderId: this.EzNovaOAuthProviderId.UNKNOWN,
        currentWizardScreen: $('#ezIPPicker'),
        wizardStep: 0
    };

    this.ezApi = typeof ezApi !== 'undefined' && ezApi !== null ? ezApi : {};
};

/**
 * Initializes the controller
 */
EzIntegrationController.prototype.init = function() {
    this.context.providerId = this.ezApi.Public.url.getUrlParam(this.EzIntegrationParamNames.PROVIDER_ID);

    if (!this.context.providerId ||
        this.context.providerId.length === 0 ||
        this.context.EzIntegrationProviderId.UNKNOWN === this.context.providerId) {

        this.ezApi.Public.logger.warn('URL does not have a value for param ' +
            this.EzIntegrationParamNames.PROVIDER_ID + '. Integration provider picker will display.');
        this.showIntegrationProviderPicker();
        return;
    }

    if (this.EzIntegrationProviderId.EZ_INTEGRATION_QUICKBOOKS_ONLINE_PROVIDER === this.context.providerId) {
        this.switchToQbProvider();
        return;
    }

    if (this.context.EzIntegrationProviderId.EZ_INTEGRATION_QUICKBOOKS_ONLINE_PROVIDER === this.context.providerId) {
        this.switchToXeroProvider();
        return;
    }

    this.showIntegrationProviderPicker();
};

/**
 * Switches to the QBO provider wizard
 */
EzIntegrationController.prototype.switchToQbProvider = function() {
    this.context.wizardStep = 1;

    if (this.EzIntegrationProviderId.EZ_INTEGRATION_QUICKBOOKS_ONLINE_PROVIDER === this.context.providerId) {
        this.ezApi.Public.logger.warn('EzIntegrationController: Provider already set to ' + this.context.providerId);
        return;
    }

    this.context.integrationProviderId = this.EzIntegrationProviderId.EZ_INTEGRATION_QUICKBOOKS_ONLINE_PROVIDER;
    this.context.oauthProviderId = this.EzNovaOAuthProviderId.INTUIT;
    this.context.providerId = this.EzNovaProviderId.INTUIT;
    $('#ezIPPicker').fadeOut('slow', function() {
        $('#xeroIntegrationWizard').fadeOut('slow', function() {
            $('#ezIPQbWizard').fadeIn('slow');
        });
    });
};

/**
 * Execute the next QBO Integration step
 */
EzIntegrationController.prototype.nextQboStep = function() {
    return new Promise(function(resolve) {
        switch (this.context.wizardStep) {
            case 0:
                return resolve(this.switchToQbProvider());
            case 1:
                return resolve(this.startProviderLogin());
            case 3:
                return null;
            default:
                return null;
        }
    }.bind(this));
};

/**
 * Switches to the Xero Provider wizard
 */
EzIntegrationController.prototype.switchToXeroProvider = function() {
    this.context.wizardStep = 1;

    if (this.EzIntegrationProviderId.EZ_INTEGRATION_XERO_PROVIDER === this.context.providerId) {
        this.ezApi.Public.logger.warn('EzIntegrationController: Provider already set to ' + this.context.providerId);
        return;
    }

    this.providerId = this.EzIntegrationProviderId.EZ_INTEGRATION_XERO_PROVIDER;
    $('#ezIPPicker').fadeOut('slow', function() {
        $('#ezIPQbWizard').fadeOut('slow', function() {
            $('#xeroIntegrationWizard').fadeIn('slow');
        });
    });
};

/**
 * Execute the next Xero integration step
 */
EzIntegrationController.prototype.nextXeroStep = function() {
    // TODO: Implement this step
};

/**
 * Switches to the integration provider picker UI
 */
EzIntegrationController.prototype.showIntegrationProviderPicker = function() {
    this.context.wizardStep = 0;

    if (this.EzIntegrationProviderId.UNKNOWN === this.context.providerId) {
        this.ezApi.Public.logger.warn('EzIntegrationController: Provider already set to ' + this.context.providerId);
        return;
    }

    this.context.providerId = this.EzIntegrationProviderId.UNKNOWN;
    $('#ezIPQbWizard').fadeOut('slow', function() {
        $('#xeroIntegrationWizard').fadeOut('slow', function() {
            $('#ezIPPicker').fadeIn('slow');
        });
    });
};

EzIntegrationController.prototype.nextStep = function() {
    return new Promise(function(resolve) {
        switch (this.context.integrationProviderId) {
            case this.EzIntegrationProviderId.EZ_INTEGRATION_QUICKBOOKS_ONLINE_PROVIDER:
                return resolve(this.nextQboStep());
            case this.EzIntegrationProviderId.EZ_INTEGRATION_XERO_PROVIDER:
                return resolve(this.nextXeroStep());
            case this.EzIntegrationProviderId.UNKNOWN:
                return resolve(this.showIntegrationProviderPicker());
            default:
                return resolve(this.showIntegrationProviderPicker());
        }
    }.bind(this));
};

/**
 * Starts the current provider's login flow
 */
EzIntegrationController.prototype.startProviderLogin = function() {
    if (!this.context.providerId ||
        this.context.providerId.length === 0 ||
        this.context.providerId === this.EzIntegrationProviderId.UNKNOWN) {
        this.showError('A valid provider id is required to perform a provider login.');
        return; // nothing to do
    }

    var url = this.ezApi.Public.nav.getInternalApiServiceUrl(
        'integrations/login/' +
        this.ezApi.Secure.employer.context.primaryEmployer[0].employer.id + '/' +
        this.context.providerId, 'v1');
    this.ezApi.Public.logger.info('Integration Provider Auth Url: ' + url);

    if (this.context.useNewPage) {
        return this.ezApi.p.nav.navigateTo(url);
    }

    // Inject the login into an iFrame
    var height = $(window).height();
    $('#ezIPQbWizard_Step2').html('<iframe id="_EZC_QBLogin" src="' + url + '" ' +
        'style="width:100%;border-style:none;height:' + height + 'px;"></iframe>');
    return true;
};

/**
 * Shows any error encountered
 */
EzIntegrationController.prototype.showError = function(em) {
    this.ezApi.Public.logger.error('EzIntegrationController: ' + em);
    $('#ezIPError').html(em);
    $('#ezIPError').fadeIn('slow');
};

/**
 * Jquery Initialization
 */
document.addEventListener('onEzApiReady', function() {
    if (typeof ezIntegrationController !== 'undefined' && ezIntegrationController) {
        return true; // integration controller already initialized
    }
    ezIntegrationController = new EzIntegrationController();
    if (ezApi) {
        // Injecting into ezApi
        ezApi.addSecureApi('ezIntegrationController', ezIntegrationController);
    }
    return true;
});

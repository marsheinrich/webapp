import {
    EzNovaIntegrationAuthenticationState,
    EzIntegrationProviderId
} from '/secure/integrations/ez-integration-enums.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

/**
 * @public
 * @description
 * Controller for the EzIntegration Wizard
 *
 * NOTE: You can only easily create ONE instance of the EzIntegrationsController. The reference is available through ezApi at:
 *
 * ezApi.ezclocker.ezIntegrationsController
 *
 * @returns {EzIntegrationsController}
 **/
class EzIntegrationsController {
    constructor() {
        this.ready = false;

        this.ezIntegrationWizards = [];
        this.ezActiveEzWizard = null;
    }

    /**
     * @protected
     * Initializes the EzIntegrationsController
     * @returns {EzIntegrationsController}
     */
    ezInit() {
        this.ezLoadAvailableEzIntegrationWizards();

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzWizardEventName.ON_EZWIZARD_CLOSE,
            'EzIntegrationsController',
            self.ezHandleOnEzWizardClose);

        this.ready = true;

        return this;
    }

    /**
     * @protected
     * Handles the EZCLOCKER_ON_EZWIZARD_CLOSE event from EzWizard
     */
    ezHandleOnEzWizardClose() {
        ezApi.ezclocker.ezWizardCommon.ezSaveActiveIntegrationCookies();
    }

    /**
     * @public
     * Shows the integration wizard
     */
    ezShow() {
        var self = ezApi.ezclocker.ezIntegrationsController;

        self.ezLoadIntegrationProviderWizard().then(
            function() {
                ezApi.ezclocker.logger.debug(
                    'EzIntegrationWizard: Loaded integration wizard for ' +
                    ezApi.ezclocker.ezWizardCommon.ezGetWizardContext().ezGetIntegrationProviderId());
                self.ezActiveEzWizard.ezShow();
            },
            function(em) {
                var em2 = 'Failed to load wizard for integrationId=' +
                    EzIntegrationProviderId.EZ_INTEGRATION_QUICKBOOKS_ONLINE_PROVIDER + '. Error: ' + em;
                ezApi.ezclocker.ezDialog.ezShowError('Integration Error', em2);
                ezApi.ezclocker.logger.error(em2);
            });
    }

    /**
     * @public
     * Loads the EzWizard based on the current context
     */
    ezLoadIntegrationProviderWizard() {
        var self = ezApi.ezclocker.ezIntegrationsController;

        if (ezApi.isEmptyString(ezApi.ezclocker.ezWizardCommon.ezGetWizardContext().ezGetIntegrationProviderId())) {
            return ezApi.ezReject('EzIntegrationsController.ezLoadIntegrationProviderWizard() requires the context ' +
                'to have a valid EzIntegrationProviderId value.');
        }

        self.ezActiveEzWizard = self.ezIntegrationWizards[ezApi.ezclocker.ezWizardCommon.ezGetWizardContext().ezGetIntegrationProviderId()];
        if (ezApi.isNotValid(self.ezActiveEzWizard)) {
            return ezApi.ezReject('No integration wizard available for integrationProviderId=' +
                ezApi.ezclocker.ezWizardCommon.ezGetWizardContext().ezGetIntegrationProviderId());
        }

        if (ezApi.ezIsEmptyString(ezApi.ezclocker.ezWizardCommon.ezGetWizardContext().ezGetIntegrationAuthenticationState()) ||
            EzNovaIntegrationAuthenticationState.UNAUTHENTICATED ===
            ezApi.ezclocker.ezWizardCommon.ezGetWizardContext().ezGetIntegrationAuthenticationState() ||
            EzNovaIntegrationAuthenticationState.UNKNOWN ===
            ezApi.ezclocker.ezWizardCommon.ezGetWizardContext().ezGetIntegrationAuthenticationState()) {
            self.ezActiveEzWizard.ezShow();
            return ezApi.ezResolve();
        }

        if (EzNovaIntegrationAuthenticationState.AUTHENTICATED ===
            ezApi.ezclocker.ezWizardCommon.ezGetWizardContext().ezGetIntegrationAuthenticationState()) {
            self.ezActiveEzWizard.ezShow();
            return self.ezActiveEzWizard.ezJumpToWizardPage(
                EzNovaIntegrationAuthenticationState.ezEnumNameFromValue(
                    ezApi.ezclocker.ezWizardCommon.ezGetWizardContext().ezGetIntegrationAuthenticationState()));
        }

        ezApi.ezclocker.logger.error('Unable to determine initial wizard page. Authentication state is not valid: ' +
            self.context.authenticationState);
    }

    /**
     * @public
     * Jumps to the specified wizard page
     */
    ezJumpToWizardPage(pageId) {
        ezApi.ezclocker.ezIntegrationsController.ezActiveEzWizard.ezJumpToWizardPage(pageId);
    }

    /**
     * @public
     * Handles integration wizard finish event
     */
    ezOnIntegrationWizardFinish() {
        ezApi.ezclocker.logger.info('EzIntegrationWizard: Wizard is finished.');
        ezApi.ezclocker.nav.navigateToEmployerDashboard();
    }

    /**
     * @public
     * Handles integration wizard cancel event
     */
    ezOnIntegrationWizardCancel() {
        ezApi.ezclocker[EZ_WIZARD_API_ID].ezClose();
    }

    /**
     * @public
     * Registers an integration to make it available for selection by the user.
     *
     * @param {EzIntegrationInfo} ezIntegrationInfo
     *
     * @returns {EzWizard}
     */
    ezRegisterIntegration(ezIntegrationInfo) {
        var self = ezApi.ezclocker.ezIntegrationsController;

        if (ezApi.ezIsNotValid(ezIntegrationInfo)) {
            ezApi.ezclocker.logger.error(
                'A valid EzIntegrationInfo instance is required to register an integration.');
            return;
        }
        if (ezApi.ezIsNotValid(ezIntegrationInfo.ezWizardFlow)) {
            ezApi.ezclocker.logger.error(
                'A valid EzIntegrationInfo.EzWizardFlow instance is required to register an integration.');
            return;
        }
        if (ezApi.ezIsEmptyString(ezIntegrationInfo.ezWizardFlow.ezWizardId)) {
            ezApi.ezclocker.logger.error(
                'A valid EzIntegrationInfo.EzWizardFlow.ezWizardId value is required to register an integration.');
            return;
        }

        ezApi.ezclocker.logger.info('Registered ' + ezIntegrationInfo.ezWizardFlow.ezWizardId + ' integration.',
            'EzIntegrationsController');
        self.ezIntegrationWizards[ezIntegrationInfo.ezWizardFlow.ezWizardId] = {
            ezIntegrationInfo: ezIntegrationInfo,
            ezWizard: ezApi.ezNew(
                wizardName,
                ezWizardContext,
                ezWizardFlowData,
                onWizardCancel,
                onWizardClose,
                onWizardFinish,
                debugMode,
                ezWizardApiId,
                onWizardAuthorize,
                onWizardSave,
                onWizardExport)
        };

        return self.ezIntegrationWizards[ezIntegrationInfo.ezWizardFlow.ezWizardId].ezWizard;
    }
}

document.addEventListener('onEzApiReady', function() {
    if (typeof ezApi === 'undefined' || !ezApi) {
        window.console.error('EzApi is required for ez-integrations-controller.js module.');
    }

    ezApi.ezRegisterPublic('ezIntegrationsController', new EzIntegrationsController());
    ezApi.ezclocker.ezIntegrationsController.ezInit();
});

export {
    EzIntegrationsController
};


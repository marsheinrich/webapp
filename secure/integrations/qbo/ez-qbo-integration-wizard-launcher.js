// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// DO NOT USE THIS CLASS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Class has not been updated with the latest for ezClocker.
// Will most likely remove in a future release
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import {
    EzNovaAuthType,
    EzNovaAuthenticationProviderId,
    EzNovaIntegrationAuthenticationState,
    EzIntegrationProviderId,
    EzIntegrationType
} from '/secure/integrations/ez-integration-enums.js';

/**
 * @public
 * Constructor for EzQboIntegrationWizardLauncher
 *
 * Handles launching the QBO Integration Wizard
 */
export class EzQboIntegrationWizardLauncher {
    ezQboWizardId = 'ezQboIntegrationWizardId';
    /**
     * @public
     *
     * @returns {string}
     */
    ezGetEzQboWizardId() {
        return ezApi.ezclocker.ezQboIntegrationWizardLauncher.ezQboWizardId;
    };

    ezQboWizardDialogId = 'ezQboIntegrationWizardDialgoId';

    /**
     * @public
     *
     * @returns {string}
     */
    ezGetEzQboWizardDialogId() {
        return ezApi.ezclocker.ezQboIntegrationWizardLauncher.ezQboWizardDialogId;
    };

    ezQboIntegratioNWizardFlow = null;


    /**
         * @public
         *
         * @returns {EzQboIntegrationWizardFlow}
         */
    ezGetEzQboIntegratioNWizardFlow() {
        let self = ezApi.ezclocker.ezQboIntegrationWizardLauncher;

        if (ezApi.ezIsNotValid(self.ezQboIntegratioNWizardFlow)) {
            self.ezQboIntegratioNWizardFlow = new EzQboIntegrationWizardFlow();
        }
        return self.ezQboIntegratioNWizardFlow;
    };

    ezQboWizardFlow = null;

    /**
     * @public
     *
     * @returns {EzWizardFlow}
     */
    ezGetEzQboWizardFlow() {
        let self = ezApi.ezclocker.ezQboIntegrationWizardLauncher;

        if (ezApi.ezIsNotValid(self.ezQboWizardFlow)) {
            self.ezQboWizardFlow = new EzWizardFlow(
                'ezQboIntegrationWizardFlow',
                self.ezGetEzQboIntegratioNWizardFlow(),
                self.ezGetEzQboWizardId());
        }

        return self.ezQboWizardFlow;
    }

    ezQboIntegrationWizardContextInitInfo = null;

    /**
     * @public
     *
     * @returns {EzIntegrationWizardContextInitInfo}
     */
    ezGetEzQboIntegrationWizardContextInitInfo() {
        let self = ezApi.ezclocker.ezQboIntegrationWizardLauncher;

        self.ezQboIntegrationWizardContextInitInfo = new EzIntegrationWizardContextInitInfo(
            'ezQboIntegrationWizardContextId',
            self.ezGetEzQboWizardFlow().ezWizardFlowData
                .pages[Object.keys(self.ezQboWizardFlow.ezWizardFlowData.pages)[0]].pageId,
            // EzIntegrationProviderId
            EzIntegrationProviderId.EZ_INTEGRATION_QUICKBOOKS_ONLINE_PROVIDER,
            // EzIntegrationType
            EzIntegrationType.TIME_ENTRY_EXPORT,
            // EzNovaAuthType
            EzNovaAuthType.OAUTH_2,
            // EzNovaAuthenticationProviderId
            EzNovaAuthenticationProviderId.INTUIT,
            // EzIntegrationAuthenticationState
            EzNovaIntegrationAuthenticationState.UNAUTHENTICATED,
            // integration provider connection id (realmid for QBO)
            null,
            // Integration message
            '');

        return self.ezQboIntegrationWizardContextInitInfo;
    }

    ezQboIntegrationWizardInitInfo = null;

    /**
     * @public
     *
     * @returns {EzWizardInitInfo}
     */
    ezGetEzQboIntegrationWizardInitInfo() {
        let self = ezApi.ezclocker.ezQboIntegrationWizardLauncher;

        if (ezApi.ezIsNotValid(self.ezQboIntegrationWizardInitInfo)) {
            self.ezQboIntegrationWizardInitInfo = new EzWizardInitInfo(
                self.ezGetEzQboWizardId(),
                'ezQboIntegrationWizardDialgoId',
                self.ezGetEzQboWizardFlow(),
                self.ezGetEzQboIntegrationWizardContext());
        }

        return self.ezQboIntegrationWizardInitInfo;
    }
    ezQboIntegrationWizardContext = null;
    /**
     * @public
     *
     * @returns {EzIntegrationWizardContext}
     */
    ezGetEzQboIntegrationWizardContext() {
        let self = ezApi.ezclocker.ezQboIntegrationWizardLauncher;

        if (ezApi.ezIsNotValid(self.ezQboIntegrationWizardContext)) {
            self.ezQboIntegrationWizardContext =
                new EzIntegrationWizardContext(self.ezGetEzQboIntegrationWizardContextInitInfo());
        }
        return self.ezQboIntegrationWizardContext;
    };

    ezQboIntegrationWizard = null;
    /**
     * @public
     *
     * @returns {EzWizard}
     */
    ezGetEzQboIntegrationWizard() {
        let self = ezApi.ezclocker.ezQboIntegrationWizardLauncher;

        if (ezApi.ezIsNotValid(self.ezQboIntegrationWizard)) {
            self.ezQboIntegrationWizard = new EzWizard(self.ezGetEzQboIntegrationWizardInitInfo());
        }

        return self.ezQboIntegrationWizard;
    }

    /**
     * @public
     * Initializes EzQboIntegrationWizardLauncher
     *
     * @returns {EzQboIntegrationWizardLauncher}
     */
    ezInit() {
        let self = ezApi.ezclocker.ezQboIntegrationWizardLauncher;

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            ezApi.ezclocker.ezIntegrationWizardStateLoader.EZ_INTEGRATION_WIZARD_STATE_LOADER_READY_READY_EVENT_NAME,
            'EzQboIntegrationWizardLauncher',
            self.ezHandleIntegrationWizardStateLoaderReadyEvent);

        self.ready = true;
        return self;
    }

    /**
     * @public
     * Launches the QBO integration wizard from the initial state
     */
    ezLaunchFreshQBOIntegrationWizard() {
        let self = ezApi.ezclocker.ezQboIntegrationWizardLauncher;

        let ezWizardId = self.ezGetEzQboIntegrationWizard().ezWizardId;
        self.ezGetEzQboIntegrationWizard().ezShow(ezWizardId).then(function(showResult) {
            ezApi.ezclocker.logger.info('EzIntegrationWizard Show Result: ' + ezApi.ezToJson(showResult));
        });
    }

    /**
         * @public
         * Launches the QBO Integration wizard from a previous state
         */
    ezLaunchQBOIntegrationWizardFromState(ezWizardIntegrationState) {
        let self = ezApi.ezclocker.ezQboIntegrationWizardLauncher;

        let ezWizardId = self.ezGetEzQboIntegrationWizard().ezWizardId;
        if (ezApi.isValid(ezWizardIntegrationState) &&
            ezApi.isValid(ezWizardIntegrationState.ezWizardState) &&
            ezApi.ezIsTrue(ezWizardIntegrationState.ezWizardState.stateLoaded)) {
            self.ezGetEzQboIntegrationWizard().ezSetWizardState(
                ezWizardIntegrationState.ezWizardState.state, ezWizardId).then(function() {
                    return self.ezGetEzQboIntegrationWizard().ezShow(ezWizardId).then(function(showResult) {
                        ezApi.ezclocker.logger.info('EzIntegrationWizard Show Result: ' +
                            ezApi.ezToJson(showResult));
                    });
                });
        } else {
            self.ezLaunchFreshQBOIntegrationWizard();
        }
    };

    /**
     * @protected
     * Handles the EzIntegrationWizardStateLoader ready event
     *
     * @param {object} event
     */
    ezHandleIntegrationWizardStateLoaderReadyEvent(event) {
        let self = ezApi.ezclocker.ezQboIntegrationWizardLauncher;

        if (ezApi.ezIsNotValid(event) || ezApi.ezIsNotValid(event.detail) ||
            ezApi.ezIsEmptyString(event.detail.ezWizardId)) {
            ezApi.ezclocker.logger.error(
                'Recenved ezIntegrationWizardStateLoader onReady even without valid EzWizard id.');
            return;
        }

        let ezIntegrationWizardState = event.detail;
        if (ezIntegrationWizardState.ezWizardId !== self.ezQboWizardId) {
            return; // Not associated with this wizard
        }

        // Load wizard from state and display
        self.ezLaunchQBOIntegrationWizardFromState(ezIntegrationWizardState);
    };
}

EzQboIntegrationWizardLauncher.ezApiName = 'ezQboIntegrationWizardLauncher';
document.addEventListener('onEzApiReady', () => {
    ezApi.ezRegisterNewApi(EzQboIntegrationWizardLauncher, EzQboIntegrationWizardLauncher.ezApiName);
});

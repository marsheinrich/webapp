import {
    EzNovaAuthenticationProviderId,
    EzIntegrationType,
    EzIntegrationProviderId
} from './ez-integration-enums.js';

import { EzNovaIntegrationAuthenticationState } from './ez-integration-wizard-context.js';

/**
 * @public
 * Constructor for EzIntegrationWizardStateLoader
 */
class EzIntegrationWizardStateLoader {
    constructor() {
        this.ezClassName = 'EzIntegrationWizardStateLoader';
        this.ready = false;

        this.EZ_WIZARD_ID_QUERY_PARAM_NAME = 'ez-context-id';
        this.EZ_INTEGRATION_PROVIDER_ID_QUERY_PARAM_NAME = 'iid';
        this.EZ_INTEGRATION_TYPE_QUERY_PARAM_NAME = 'iit';
        this.EZNOT_AUTHENTICATION_PROVIDER_ID_QUERY_PARAM_NAME = 'iap';
        this.EZNOVA_AUTHENTICATION_STATE_QUERY_PARAM_NAME = 'state';
        this.INTEGRATION_MESSAGE_QUERY_PARAM_NAME = 'm';

        this.eventNames = {
            EzIntegrationWizardStateLoaderReady: 'EzIntegrationWizardStateLoaderReady'
        };

        this.EZ_INTEGRATION_WIZARD_STATE_LOADER_READY_READY_EVENT_NAME = this.eventNames.EzIntegrationWizardStateLoaderReady;

        this.ezWizardId = null;
        this.ezGetEzWizardId = function() {
            var self = ezApi.ezclocker.ezIntegrationWizardStateLoader;

            if (ezApi.ezIsEmptyString(self.ezWizardId)) {
                var paramValue = ezApi.ezclocker.ezUrlHelper.getUrlParam(self.EZ_WIZARD_ID_QUERY_PARAM_NAME);
                self.ezWizardId = ezApi.ezIsEmptyString(paramValue)
                    ? null
                    : paramValue;
            }

            return self.ezWizardId;
        };

        this.ezWizardState = {
            stateLoaded: false
        };
        this.ezGetEzWizardState = function() {
            var self = ezApi.ezclocker.ezIntegrationWizardStateLoader;

            return self.ezWizardState;
        };

        this.ezIntegrationProviderId = EzIntegrationProviderId.UNKNOWN;
        this.ezGetEzIntegrationProviderId = function() {
            var self = ezApi.ezclocker.ezIntegrationWizardStateLoader;

            if (ezApi.ezIsEmptyString(self.ezIntegrationProviderId) ||
                EzIntegrationProviderId.UNKNOWN === self.ezIntegrationProviderId) {
                var paramValue = ezApi.ezclocker.ezUrlHelper.getUrlParam(self.EZ_INTEGRATION_PROVIDER_ID_QUERY_PARAM_NAME);
                self.ezIntegrationProviderId = ezApi.ezIsEmptyString(paramValue)
                    ? EzIntegrationProviderId.UNKNOWN
                    : paramValue;
            }

            return self.ezIntegrationProviderId;
        };

        this.ezIntegrationType = EzIntegrationType.UNKNOWN;
        this.ezGetEzIntegrationType = function() {
            var self = ezApi.ezclocker.ezIntegrationWizardStateLoader;

            if (ezApi.ezIsEmptyString(self.ezIntegrationType) ||
                EzIntegrationType.UNKNOWN === self.ezIntegrationType) {
                var paramValue = ezApi.ezclocker.ezUrlHelper.getUrlParam(self.EZ_INTEGRATION_TYPE_QUERY_PARAM_NAME);
                self.ezIntegrationType = ezApi.ezIsEmptyString(paramValue)
                    ? EzIntegrationType.UNKNOWN
                    : paramValue;
            }

            return self.ezIntegrationType;
        };

        this.ezNovaAuthenticationProviderId = EzNovaAuthenticationProviderId.UNKNOWN;
        this.ezGetEzNovaAuthenticationProviderId = function() {
            var self = ezApi.ezclocker.ezIntegrationWizardStateLoader;

            if (ezApi.ezIsEmptyString(self.ezNovaAuthenticationProviderId) ||
                EzNovaAuthenticationProviderId.UNKNOWN === self.ezNovaAuthenticationProviderId) {
                var paramValue = ezApi.ezclocker.ezUrlHelper.getUrlParam(self.EZNOT_AUTHENTICATION_PROVIDER_ID_QUERY_PARAM_NAME);
                self.ezNovaAuthenticationProviderId = ezApi.ezIsEmptyString(paramValue)
                    ? EzNovaAuthenticationProviderId.UNKNOWN
                    : paramValue;
            }

            return self.ezNovaAuthenticationProviderId;
        };

        this.ezNovaAuthenticationState = EzNovaIntegrationAuthenticationState.UNKNOWN;
        this.ezGetEzNovaAuthenticationState = function() {
            var self = ezApi.ezclocker.ezIntegrationWizardStateLoader;

            if (ezApi.ezIsEmptyString(self.ezNovaAuthenticationState) ||
                EzNovaIntegrationAuthenticationState.UNKNOWN === self.ezNovaAuthenticationState) {
                var paramValue = ezApi.ezclocker.ezUrlHelper.getUrlParam(self.EZNOVA_AUTHENTICATION_STATE_QUERY_PARAM_NAME);
                self.ezNovaAuthenticationState = ezApi.ezIsEmptyString(paramValue)
                    ? EzNovaIntegrationAuthenticationState.UNAUTHENTICATED
                    : paramValue;
            }

            return self.ezNovaAuthenticationState;
        };

        this.ezIntegrationMessage = null;
        this.ezGetEzIntegrationMessage = function() {
            var self = ezApi.ezclocker.ezIntegrationWizardStateLoader;

            if (ezApi.ezIsEmptyString(self.ezIntegrationMessage)) {
                var paramValue = ezApi.ezclocker.ezUrlHelper.getUrlParam(self.INTEGRATION_MESSAGE_QUERY_PARAM_NAME);
                self.ezIntegrationMessage = ezApi.ezIsEmptyString(paramValue)
                    ? null
                    : paramValue;
            }

            return self.ezIntegrationMessage;
        };

        /**
         * @protected
         * Initializes EzIntegrationWizardStateLoader
         *
         * @returns {EzIntegrationWizardStateLoader}
         */
        this.ezInit = function() {
            var self = ezApi.ezclocker.ezIntegrationWizardStateLoader;

            self.EZ_INTEGRATION_WIZARD_STATE_LOADER_READY_READY_EVENT_NAME =
                ezApi.ezRegisterGlobalEvent(
                    self.ezClassName, 'onReady', self.eventNames.EzIntegrationWizardStateLoaderReady);

            self.ezLoadIntegrationWizardStateFromUrl();

            self.ready = true;
            return self;
        };

        /**
         * @public
         * Returns the detected integration wizard state.
         */
        this.ezGetEzIntegrationWizardState = function() {
            var self = ezApi.ezclocker.ezIntegrationWizardStateLoader;
            return {
                ezWizardId: self.ezGetEzWizardId(),
                ezWizardState: self.ezGetEzWizardState(),
                ezIntegrationProviderId: self.ezGetEzIntegrationProviderId(),
                ezNovaAuthenticationProviderId: self.ezGetEzNovaAuthenticationProviderId(),
                ezNovaAuthenticationState: self.ezGetEzNovaAuthenticationState(),
                ezIntegrationMessage: self.ezGetEzIntegrationMessage()
            };
        };

        /**
         * @protected
         * Triggers the EzIntegrationWizardStateLoader's onReady event.
         */
        this.ezOnEzIntegrationWizardStateLoaderReady = function() {
            var self = ezApi.ezclocker.ezIntegrationWizardStateLoader;

            ezApi.ezclocker.ezEvents.ezTriggerEvent(self.EZ_INTEGRATION_WIZARD_STATE_LOADER_READY_READY_EVENT_NAME,
                self.ezGetEzIntegrationWizardState());
        };

        /**
         * @public
         * Extracts any integration wizard state information from the current url.
         */
        this.ezLoadIntegrationWizardStateFromUrl = function() {
            var self = ezApi.ezclocker.ezIntegrationWizardStateLoader;

            self.ezGetEzWizardId();
            self.ezGetEzIntegrationProviderId();
            self.ezGetEzIntegrationType();
            self.ezGetEzNovaAuthenticationProviderId();
            self.ezGetEzNovaAuthenticationState();
            self.ezGetEzIntegrationMessage();
            if (self.ezShouldLoadIntegrationWizard()) {
                self.ezLoadEzWizardState().then(function() {
                    if (self.ezShouldLoadIntegrationWizard()) {
                        self.ezOnEzIntegrationWizardStateLoaderReady();
                    }
                });
            }
        };

        /**
         * @public
         * Obtains the EzWizard's state from the db (if any)
         *
         * @returns {Promise}
         * A resolve only promise
         */
        this.ezLoadEzWizardState = function() {
            var self = ezApi.ezclocker.ezIntegrationWizardStateLoader;

            return ezApi.ezPromise(function(resolve) {
                // /_api/v1/ez-wizard/{ezWizardId}/state
                var url = ezApi.ezclocker.nav.ezGetInternalApiUrl('ez-wizard/' + self.ezGetEzWizardId() + '/state');
                ezApi.ezclocker.http.ezGet(url).then(
                    function(response) {
                        if (ezApi.ezIsValid(response) && 0 !== response.errorCode) {
                            ezApi.ezclocker.logger.error('Failed to obtain the EzWizardState due to error: ' +
                                ezApi.ezToJson(response));
                            self.ezWizardState = {
                                stateLoaded: false
                            };
                            return resolve(self.ezWizardState);
                        }

                        self.ezWizardState = {
                            state: response.entity,
                            stateLoaded: true
                        };

                        return resolve(self.ezWizardState);
                    },
                    function(eResponse) {
                        ezApi.ezclocker.logger.error('Failed to obtain the EzWizardState due to error: ' +
                            ezApi.ezToJson(eResponse));
                        self.ezWizardState = {
                            stateLoaded: false
                        };
                        return resolve(self.ezWizardState);
                    });
            });
        };

        /**
         * @public
         *
         * @returns {boolean}
         */
        this.ezHasValidWizardId = function() {
            var self = ezApi.ezclocker.ezIntegrationWizardStateLoader;

            return ezApi.ezIsNotEmptyString(self.ezGetEzWizardId());
        };

        /**
         * @public
         *
         * @returns {boolean}
         */
        this.ezHasValidIntegrationProviderId = function() {
            var self = ezApi.ezclocker.ezIntegrationWizardStateLoader;

            return ezApi.ezIsNotEmptyString(self.ezIntegrationProviderId) &&
                EzIntegrationProviderId.UNKNOWN !==
                self.ezIntegrationProviderId;
        };

        /**
         * @public
         *
         * @returns {boolean}
         */
        this.ezHasValidEzNovaAuthenticationProviderId = function() {
            var self = ezApi.ezclocker.ezIntegrationWizardStateLoader;

            return ezApi.ezIsNotEmptyString(self.ezNovaAuthenticationProviderId) &&
                EzNovaAuthenticationProviderId.UNKNOWN !== self.ezNovaAuthenticationProviderId;
        };

        /**
         * @public
         *
         * @returns {boolean}
         */
        this.ezHasValidEzNovaAuthenticationState = function() {
            var self = ezApi.ezclocker.ezIntegrationWizardStateLoader;

            return ezApi.ezIsNotEmptyString(self.ezNovaAuthenticationState) &&
                EzNovaIntegrationAuthenticationState.UNKNOWN !== self.ezNovaAuthenticationState;
        };

        /**
         * @public
         *
         * @returns {boolean}
         */
        this.ezHasIntegrationMessage = function() {
            var self = ezApi.ezclocker.ezIntegrationWizardStateLoader;

            return ezApi.ezIsNotEmptyString(self.ezIntegrationMessage);
        };

        /**
         * @public
         * Determines if all the necessary integration wizard state information is available and valid,
         * which should allow auto-loading the wizard.
         *
         * @param {string} ezWizardId
         *
         * @returns {boolean}
         */
        this.ezShouldLoadIntegrationWizard = function() {
            var self = ezApi.ezclocker.ezIntegrationWizardStateLoader;

            return self.ezHasValidWizardId() &&
                self.ezHasValidIntegrationProviderId() &&
                self.ezHasValidEzNovaAuthenticationProviderId() &&
                self.ezHasValidEzNovaAuthenticationState();
        };

        return this;
    }
}
EzIntegrationWizardStateLoader.ezApiName = 'ezIntegrationWizardStateLoader';
document.addEventListener('onEzApiReady', () => {
    ezApi.ezRegisterNewApi(EzIntegrationWizardStateLoader, EzIntegrationWizardStateLoader.ezApiName);
});

export {
    EzIntegrationWizardStateLoader
};

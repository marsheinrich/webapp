import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzClockerCookieName } from '/public/javascript/common/ez-cookies.js';

import { EzWizardContext } from '/public/webcomponents/ez-wizard/ez-wizard-context.js';

import { EzNovaAuthType } from '/secure/integrations/ez-integration-enums.js';
import {
    EzIntegrationWizardContext,
    EzIntegrationUrlParamName
} from '/secure/integrations/ez-integration-wizard-context.js';

import { EzUrlHelper } from '/public/javascript/common/ezclocker-url-helper2.js';

/**
 * @public
 * Constructor for EzWizardCommon
 *
 * @returns {EzWizardCommon}
 */
class EzWizardCommon {
    static ezApiName = 'ezWizardCommon';
    static ezInstance = null;

    static ezApiRegistrationState = null;

    static ezCanRegister() {
        return 'PENDING' === EzWizardCommon.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUrlHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUrlHelper.ezApiName].ready;
    }

    static ezRegistrator() {
        if (EzWizardCommon.ezCanRegister()) {
            EzWizardCommon.ezInstance = ezApi.ezRegisterNewApi(
                EzWizardCommon,
                EzWizardCommon.ezApiName);

            EzWizardCommon.ezApiRegistrationState = 'REGISTERED';
        }
    }

    static {
        if (null == EzWizardCommon.ezApiRegistrationState) {
            EzWizardCommon.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                EzWizardCommon.ezRegistrator);

            document.addEventListener(
                EzEventEngine.ezEventNames.onReady,
                EzWizardCommon.ezRegistrator);

            document.addEventListener(
                EzUrlHelper.ezEventNames.onReady,
                EzWizardCommon.ezRegistrator);
        }
    }

    constructor() {
        this.ready = false;

        self.ezWizardContext = null;

        return this;
    }

    /**
     * @protected
     * Initializes EzWizardCommon
     *
     * @returns {EzWizardCommon}
     */
    ezInit() {
        let self = ezApi.ezclocker.ezWizardCommon;

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            ezApi.ezclocker.ezWizardContext.ezEventNames.onWizardValueChanged,
            EzWizardCommon.ezApiName,
            self.ezHandleEzWizardContextValueChanged);

        self.ezSetWizardContext(new EzIntegrationWizardContext('ezWizardCommonContext'));

        self.ezLoadActiveIntegrationContext();

        self.ready = true;
        return self;
    }

    /**
     * @public
     * Loads the active integration settings from params or cookies (params win over cookies)
     */
    ezLoadActiveIntegrationContext() {
        let self = ezApi.ezclocker.ezWizardCommon;

        self.ezLoadEzNovaAuthTypeContext();
        self.ezLoadEzNovaAuthProviderId();
        self.ezLoadEzIntegrationProviderId();
        self.ezLoadEzNovaIntegrationAuthenticationState();
        self.ezLoadIntegrationMessage();
        self.ezLoadEzIntegrationType();
    }


    /**
     * @public
     * Reads the EzIntegrationAuthenticationState cookie value.
     *
     * If the cookie value is null/empty then the default value from
     * EzWiardContext.EZ_WIZARD_CONTEXT_DEFAULT_EZ_NOVA_INTEGRATION_AUTHENTICATION_STATE is used.
     */
    ezReadEzIntegrationAuthenticationStateCookie() {
        let self = ezApi.ezclocker.ezWizardCommon;

        self.ezGetWizardContext().ezSetIntegrationAuthenticationState(
            ezApi.ezclocker.ezCookies.ezReadCookieOrDefault(
                EzClockerCookieName.EZ_INTEGRATION_AUTH_STATE,
                self.ezGetWizardContext().EZ_WIZARD_CONTEXT_DEFAULT_EZ_NOVA_INTEGRATION_AUTHENTICATION_STATE),
            self.ezGetWizardContext());
    }

    /**
     * @public
     * Reads the integration message cookie value.
     *
     * If the cookie value is null/empty then the value from EzWizardContext.EZ_WIZARD_CONTEXT_DEFAULT_INTEGRATION_MESSAGE
     * is used.
     */
    ezReadIntegrationMessageCookie() {
        let self = ezApi.ezclocker.ezWizardCommon;

        self.ezGetWizardContext().ezSetIntegrationMessage(
            ezApi.ezclocker.ezCookies.ezReadCookieOrDefault(
                EzClockerCookieName.EZ_INTEGRATION_MESSAGE,
                self.ezGetWizardContext().EZ_WIZARD_CONTEXT_DEFAULT_INTEGRATION_MESSAGE),
            self.ezGetWizardContext());
    }

    /**
     * @public
     * Loads the EzNovaAuthType context value from either URL parameters or cookies.
     * URL parameters values take precedent over cookies.
     *
     * If the value is null/empty then the default value from
     * EzWizardContext.EZ_WIZARD_CONTEXT_DEFAULT_EZ_NOVA_AUTH_TYPE is used.
     */
    ezLoadEzNovaAuthTypeContext() {
        let self = ezApi.ezclocker.ezWizardCommon;

        let eznAuthType = ezApi.ezclocker.ezUrlHelper.getUrlParam(EzIntegrationUrlParamName.IAT);
        if (ezApi.ezStringHasLength(eznAuthType)) {
            self.ezGetWizardContext().ezSetEzNovaAuthType(eznAuthType,
                self.ezGetWizardContext());
        }
    }

    /**
     * @public
     * Loads the EzNovaOAuthProviderId or EzNovaOAuth2ProviderId from either URL parameters or cookies.
     * URL parameters values take precedent over cookies.
     *
     * If the EzNovaAuthType value from EzWizardContext.ezGetActiveAuthType() is:
     *
     *  * EzNovaAuthType.OAUTH_1
     *    The EzNovaOAuthProviderId is value read. If the EzNovaOAuthProviderId is null/empty then the default value
     *    of EzNovaOAuthProviderId.UNKNOWN is used.
     *
     *  * EzNovaAuthType.OAUTH_2
     *    The EzNovaOAuth2ProviderId value is read. If the EzNovaOAuth2ProviderId is null/empty then the
     *    default value from EzWizardContext.EZ_WIZARD_CONTEXT_DEFAULT_EZ_NOVA_OAUTH2_PROVIDER_ID is used.
     */
    ezLoadEzNovaAuthProviderId() {
        let self = ezApi.ezclocker.ezWizardCommon;

        let ezNovaAuthProviderId = ezApi.ezclocker.ezUrlHelper.getUrlParam(EzIntegrationUrlParamName.IAP);
        if (ezApi.ezStringHasLength(ezNovaAuthProviderId)) {
            self.ezGetWizardContext().ezSetAuthProviderId(ezNovaAuthProviderId,
                self.ezGetWizardContext());
        }
    }

    /**
     * @public
     * Loads the EzIntegrationProviderId value from either URL parameters or cookies.
     * URL parameters values take precedent over cookies.
     *
     * If the EzIntegrationProviderId is null/empty then the default value from
     * EzWizardContext.EZ_WIZARD_CONTEXT_DEFAULT_EZ_INTEGRATION_PROVIDER_ID is used.
     *
     */
    ezLoadEzIntegrationProviderId() {
        let self = ezApi.ezclocker.ezWizardCommon;

        let integrationProviderId = ezApi.ezclocker.ezUrlHelper.getUrlParam('iid');
        if (ezApi.ezStringHasLength(integrationProviderId)) {
            self.ezGetWizardContext().ezSetIntegrationProviderId(integrationProviderId,
                self.ezGetWizardContext());
        }
    }

    /**
     * @public
     * Loads the EzNovaIntegrationAuthenticationState from either URL parameters or cookies.
     * URL parameters values take precedent over cookies.
     *
     * If the EzNovaIntegrationAuthenticationState is null/empty then the default value from
     * EzWizardContext.EZ_WIZARD_CONTEXT_DEFAULT_EZ_NOVA_INTEGRATION_AUTHENTICATION_STATE is used.
     */
    ezLoadEzNovaIntegrationAuthenticationState() {
        let self = ezApi.ezclocker.ezWizardCommon;

        let integrationAuthState = ezApi.ezclocker.ezUrlHelper.getUrlParam(EzIntegrationUrlParamName.STATE);
        if (ezApi.ezStringHasLength(integrationAuthState)) {
            self.ezGetWizardContext().ezSetIntegrationAuthenticationState(integrationAuthState,
                self.ezGetWizardContext());
        }
    }

    /**
     * @public
     * Loads the integration message (if any) from either URL parameters or cookies.
     * URL parameters values take precedent over cookies.
     *
     * If the integration message is null/empty string then empty string is used.
     */
    ezLoadIntegrationMessage() {
        let self = ezApi.ezclocker.ezWizardCommon;

        let integrationMessage = ezApi.ezclocker.ezUrlHelper.getUrlParam(EzIntegrationUrlParamName.M);
        if (ezApi.ezStringHasLength(integrationMessage)) {
            self.ezGetWizardContext().ezSetIntegrationMessage(integrationMessage,
                self.ezGetWizardContext());
        }
    }

    /**
     * @public
     * Loads the EzIntegrationType value from either URL parameters or cookies.
     * URL parameters values take precedent over cookies.
     *
     * If the EzIntegrationType value is null/empty then the value from
     * EzWizardContext.EZ_WIZARD_CONTEXT_DEFAULT_EZ_INTEGRATION_TYPE is used.
     */
    ezLoadEzIntegrationType() {
        let self = ezApi.ezclocker.ezWizardCommon;

        let integrationType = ezApi.ezclocker.ezUrlHelper.getUrlParam(EzIntegrationUrlParamName.IT);
        if (ezApi.ezStringHasLength(integrationType)) {
            self.ezGetWizardContext().ezSetIntegrationType(integrationType,
                self.ezGetWizardContext());
        }
    }

    /**
     * @public
     * Saves the EzNovaAuthType value to a cookie.
     *
     * If the value is null/empty or EzNovaAuthType.UNKNOWN then the cookie is removed.
     */
    ezSaveEzNovaAuthTypeCookie() {
        let self = ezApi.ezclocker.ezWizardCommon;

        let ezNovaAuthTypeValue = self.ezGetWizardContext().ezGetEzNovaAuthType(self.ezGetWizardContext());

        if (!ezApi.ezStringHasLength(ezNovaAuthTypeValue) || EzNovaAuthType.UNKNOWN === ezNovaAuthTypeValue) {
            ezApi.ezclocker.ezCookies.ezRemoveCookie(EzClockerCookieName.EZ_INTEGRATION_AUTH_TYPE);
        } else {
            ezApi.ezclocker.ezCookies.ezSetCookie(EzClockerCookieName.EZ_INTEGRATION_AUTH_TYPE,
                ezNovaAuthTypeValue);
        }
    }

    /**
     * @public
     * Sets the EzWizardContext to use
     *
     * @param {EzWizardContext} wizardContext
     */
    ezSetWizardContext(wizardContext) {
        let self = ezApi.ezclocker.ezWizardCommon;

        if (!ezApi.ezIsValid(wizardContext)) {
            ezApi.ezclocker.logger.error('A valid EzWizardContext is required.');
            return;
        }

        self.ezWizardContext = wizardContext;
    }

    /**
     * @protected
     *
     * Handles ezWizardContexSetValue events and saves cookies.
     */
    ezHandleEzWizardContextValueChanged(event) {
        if (!ezApi.ezIsValid(event) || !ezApi.ezIsValid(event.detail)) {
            return; // event doesn't have the proper data
        }
    }

    /**
     * @public
     * Obtains the ezWizardContext stored in this instance. Will create the instance with default values
     * the ezWizardContext internal reference is null or undefined.
     *
     * @returns {EzWizardContext}
     */
    ezGetWizardContext() {
        let self = ezApi.ezclocker.ezWizardCommon;

        if (!ezApi.ezIsValid(self.ezWizardContext)) {
            self.ezWizardContext = new EzWizardContext('ezWizardCommonContext');
            self.ezLoadActiveIntegrationContext();
        }

        return self.ezWizardContext;
    }

    /**
     * @public
     * Sets the integration context for the wizard.
     *
     * @param {string} integrationProviderId
     * If integrationProviderId is empty/null then it is ignored and the existing value on ezWizardContext is maintained.
     * @param {string} integrationType
     * If integrationType is empty/null then it is ignored and the existing value on ezWizardContext is maintained.
     * @param {string} eznAuthType
     * If eznAuthType is empty/null then it is ignored and the existing value on ezWizardContext is maintained.
     * @param {string} oAuthProviderId
     * If oAuthProviderId is empty/null then it is ignored and the existing value on ezWizardContext is maintained.
     * @param {null|string} integrationProviderConnectionId
     * The value is set on the ezWizardContext as provided.
     * @param {null|string} integrationAuthenticationState
     * If oAuthProviderId is empty/null then it is ignored and the existing value on ezWizardContext is maintained.
     * @param {null|string} integrationMessage
     * If oAuthProviderId is empty/null then an empty string value is set on the ezWizardContext.
     *
     * @returns {EzWizardContext}
     * Returns the ezWizardContext reference that was updated.
     */
    ezSetIntegrationContext(integrationProviderId, integrationType, eznAuthType, authProviderId,
        integrationProviderConnectionId, integrationAuthenticationState, integrationMessage) {

        let self = ezApi.ezclocker.ezWizardCommon;
        let wizContextId = self.ezGetWizardContext();

        if (ezApi.ezIsNotEmptyString(integrationProviderId)) {
            self.ezGetWizardContext().ezSetIntegrationProviderId(integrationProviderId, wizContextId);
        }

        if (ezApi.ezIsNotEmptyString(integrationProviderId)) {
            self.ezGetWizardContext().ezSetIntegrationType(integrationType, wizContextId);
        }

        if (ezApi.ezIsNotEmptyString(integrationProviderId)) {
            self.ezGetWizardContext().ezSetEzNovaAuthType(eznAuthType, wizContextId);
        }

        if (ezApi.ezIsNotEmptyString(integrationProviderId)) {
            self.ezGetWizardContext().ezSetAuthProviderId(authProviderId, wizContextId);
        }

        if (ezApi.ezIsNotEmptyString(integrationAuthenticationState)) {
            self.ezGetWizardContext().ezSetIntegrationAuthenticationState(integrationAuthenticationState, wizContextId);
        }

        integrationMessage = ezApi.ezIsEmptyString(integrationMessage)
            ? ''
            : integrationMessage;
        if (ezApi.ezIsNotEmptyString(integrationMessage)) {
            self.ezGetWizardContext().ezSetIntegrationMessage(integrationMessage, wizContextId);
        }

        self.ezGetWizardContext().ezSetIntegrationProviderConnectionId(integrationProviderConnectionId, wizContextId);

        self.ezSaveWizardState();

        return self.ezGetWizardContext();
    }

    /**
     * @public
     * Saves an employer integration mapping to the ezClocker DB
     */
    ezSaveEmployerIntegrationMap() {
        let self = ezApi.ezclocker.ezWizardCommon;

        if (!ezApi.ezIsValid(ezApi.ezclocker.ezClockerContext.employerContext) ||
            !ezApi.ezIsValid(ezApi.ezclocker.ezClockerContext.employerContext.activeEmployer)) {
            ezUi.ezHtml('EzWizardInstructions', 'The EzClockerContext\'s activeEmployer is not available.');
            return;
        }

        // TODO: Move this to the EzWizard class.
        ezApi.ezclocker[window.EZ_WIZARD_API_ID].ezDisableButton('previous');
        ezApi.ezclocker[window.EZ_WIZARD_API_ID].ezDisableButton('next');
        ezApi.ezclocker[window.EZ_WIZARD_API_ID].ezDisableButton('cancel');

        // TODO: Move this to an event handled by the EzWizard class.
        if (ezApi.ezStringHasLength(self.ezGetWizardContext().ezGetIntegrationMessage())) {
            ezUi.ezHtml('EzWizardInstructions', self.ezGetWizardContext().ezGetIntegrationMessage());
            ezApi.ezclocker[window.EZ_WIZARD_API_ID].ezWizardHasError();
            return;
        }

        // TODO: Move this to the EzWizard class.
        if (!ezApi.ezStringHasLength(self.ezWizardContext.ezGetIntegrationProviderId())) {
            ezUi.ezHtml('EzAuthenticatedErrors',
                'The integration\'s provider id is not available. The wizard cannot continue.');
            ezApi.ezclocker[window.EZ_WIZARD_API_ID].ezWizardHasError();
            return;
        }

        ezApi.ezclocker.ezIntegrationServiceClient.ezCreateUpdateEmployerIntegrationMap(
            self.ezGetWizardContext().ezGetIntegrationProviderId(),
            self.ezGetWizardContext().ezGetIntegrationType(),
            ezApi.ezclocker.ezClockerContext.employerContext.activeEmployer.id,
            true,
            true)
            .then(
                (response) => {
                    //TODO: Add event for success response
                    ezApi.ezclocker.logger.info('Stored employer inregration map: ' + ezApi.ezToJson(response));
                },
                (eResponse) => {
                    // TODO: Add event for failure response, handled by the EzWizard class
                    ezApi.ezclocker.logger.error('Failed to store the employer inregration map: ' + ezApi.ezToJson(eResponse));
                });
    }
}

export {
    EzWizardCommon
};

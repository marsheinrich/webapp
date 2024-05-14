import { EzEnum } from '/ezlibrary/enums/EzEnum.js';

import { EzWizardContext  } from '/public/webcomponents/ez-wizard/ez-wizard-context.js';
import {
    EzNovaAuthenticationProviderId,
    EzNovaAuthType,
    EzIntegrationType,
    EzIntegrationProviderId
} from '/secure/integrations/ez-integration-enums.js';

class EzIntegrationUrlParamName extends EzEnum{
    static get IAT() {
        return 'iat';
    }
    static get IAP() {
        return 'iap';
    }
    static get STATE() {
        return 'state';
    }
    static get M() {
        return 'm';
    }
    static get IT() {
        return 'it';
    }

    static ezApiName = 'EzIntegrationUrlParamName';
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzIntegrationUrlParamName.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    static ezRegistrator() {
        if (EzIntegrationUrlParamName.ezCanRegister()) {
            EzIntegrationUrlParamName.ezInstance = ezApi.ezRegisterEnumeration(EzIntegrationUrlParamName);

            EzIntegrationUrlParamName.ezApiRegistrationState = 'REGISTERED';
        }
    }
    // Static Constructor
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                this.ezRegistrator);
        }
    }

    constructor() {
        super();
    }

}

/**
 * @public
 * Enumeration of contect value names
 */
class EzIntegrationWizardContextValueName extends EzEnum {
    static get ACTIVE_WIZARD_PAGE_ID() {
        return 'ezActiveWizardPageId';
    }
    static get EZ_INTEGRATION_PROVIDER_ID() {
        return 'ezIntegrationProviderId';
    }
    static get EZ_INTEGRATION_TYPE() {
        return 'ezIntegrationType';
    }
    static get EZ_NOVA_AUTH_TYPE() {
        return 'ezNovaAuthType';
    }
    static get EZ_NOVA_AUTHENTICATION_PROVIDER_ID() {
        return 'ezNovaAuthenticationProviderId';
    }
    static get EZ_NOVA_INTEGRATION_AUTHENTICATION_STATE() {
        return 'ezNovaIntegrationAuthenticationState';
    }
    static get EZ_INTEGRATION_PROVIDER_CONNECTION_ID() {
        return 'ezIntegrationProviderConnectionId';
    }
    static get EZ_INTEGRATION_MESSAGE() {
        return 'ezIntegrationMessage';
    }

    static ezApiName = 'EzIntegrationWizardContextValueName';
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzIntegrationWizardContextValueName.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    static ezRegistrator() {
        if (EzIntegrationWizardContextValueName.ezCanRegister()) {
            EzIntegrationWizardContextValueName.ezInstance = ezApi.ezRegisterEnumeration(EzIntegrationWizardContextValueName);

            EzIntegrationWizardContextValueName.ezApiRegistrationState = 'REGISTERED';
        }
    }
    // Static Constructor
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                this.ezRegistrator);
        }
    }

    constructor() {
        super();
    }
}

/**
 * @public
 * Creates a new instance of EzNovaIntegrationAuthenticationState
 */
class EzNovaIntegrationAuthenticationState extends EzEnum {
    /**
     * Not authenticated
     */
    static get UNAUTHENTICATED() {
        return 'UNAUTHENTICATED';
    }
    /**
     * Integration is AUTHENTICATED and ready
     */
    static get AUTHENTICATED() {
        return 'AUTHENTICATED';
    }
    /**
     * Integration authentication is denied
     */
    static get DENIED() {
        return 'DENIED';
    }
    /**
     * Integration authentication returned an error
     */
    static get ERROR() {
        return 'ERROR';
    }

    static ezApiName = 'EzNovaIntegrationAuthenticationState';
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzNovaIntegrationAuthenticationState.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    static ezRegistrator() {
        if (EzNovaIntegrationAuthenticationState.ezCanRegister()) {
            EzNovaIntegrationAuthenticationState.ezInstance = ezApi.ezRegisterEnumeration(EzNovaIntegrationAuthenticationState);

            EzNovaIntegrationAuthenticationState.ezApiRegistrationState = 'REGISTERED';
        }
    }
    // Static Constructor
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                this.ezRegistrator);
        }
    }

    constructor() {
        super();
    }
}

/**
 * @public
 * EzIntegrationWizardContextInitInfo used to initialize the EzIntegrationWizardContextInitInfo instance.
 *
 * @param {string|null} wizardContextId
 * The id to register this wizard in ezApi with. If null, the id is generated as:
 *
 * 'ezWizardContextId_' + moment.format('x');
 *
 * @param {string|null} activeWizardPageId
 * @param {EzIntegrationProviderId} aEzIntegrationProviderId
 * @param {EzIntegrationType} aEzIntegrationType
 * @param {EzNovaAuthType} aEzNovaAuthType
 * @param {EzNovaAuthenticationProviderId} aEzNovaAuthenticationProviderId
 * @param {EzNovaIntegrationAuthenticationState} aEzNovaIntegrationAuthenticationState
 * @param {string|null} aEzintegrationProviderConnectionId
 * @param {string|null} aIntegrationMessage
 */
class EzIntegrationWizardContextInitInfo {
    constructor(wizardContextId, activeWizardPageId, aEzIntegrationProviderId,
        aEzIntegrationType, aEzNovaAuthType, aEzNovaAuthenticationProviderId, aEzNovaIntegrationAuthenticationState,
        aEzintegrationProviderConnectionId, aIntegrationMessage) {

        this.ezObjectId = ezApi.ezGenerateObjectId();

        this.ezWizardContextId = ezApi.ezIsEmptyString(wizardContextId)
            ? 'ezWizardContextId_' + this.ezObjectId
            : wizardContextId;

        this.ezActiveWizardPageId = ezApi.ezIsEmptyString(activeWizardPageId)
            ? null
            : activeWizardPageId;

        // EzIntegrationProviderId
        this.ezIntegrationProviderId = aEzIntegrationProviderId;

        // EzIntegrationType
        this.ezIntegrationType = aEzIntegrationType;

        // EzNovaAuthType
        this.ezNovaAuthType = aEzNovaAuthType;

        // ezNovaAuthenticationProviderId
        this.ezNovaAuthenticationProviderId = aEzNovaAuthenticationProviderId;

        // EzIntegrationAuthenticationState
        this.ezNovaIntegrationAuthenticationState = aEzNovaIntegrationAuthenticationState;

        // integration provider connection id (realmid for QBO)
        this.ezIntegrationProviderConnectionId =
            ezApi.ezIsEmptyString(aEzintegrationProviderConnectionId)
                ? null
                : aEzintegrationProviderConnectionId;

        // integration message,
        this.ezIntegrationMessage = ezApi.ezIsEmptyString(aIntegrationMessage)
            ? null
            : aIntegrationMessage;
    }
}

/**
 * @public
 * Constructor for EzWizardContext. Will automatically register with ezApi upon creation using the
 * ezWizardInitInfo.ezWizardContexId specified. If none is provided, an id is generated instead.
 */
class EzIntegrationWizardContext {
    /**
        @param {EzIntegrationWizardContextInitInfo} ezIntegrationWizardContextInitInfo
     */
    constructor(ezIntegrationWizardContextInitInfo) {
        this.ezWizardContext = new EzWizardContext(ezIntegrationWizardContextInitInfo);

        // Inhertied from EzWizardContext
        this.ready = false;

        // Constants
        this.DEFAULT_EZ_INTEGRATION_PROVIDER_ID =
            EzIntegrationProviderId.EZ_INTEGRATION_QUICKBOOKS_ONLINE_PROVIDER;
        this.DEFAULT_EZ_INTEGRATION_TYPE = EzIntegrationType.TIME_ENTRY_EXPORT;

        this.DEFAULT_EZ_NOVA_AUTH_TYPE = EzNovaAuthType.OAUTH_2;
        this.DEFAULT_EZ_NOVA_AUTHENTICATION_PROVIDER_ID = EzNovaAuthenticationProviderId.INTUIT;
        this.DEFAULT_EZ_NOVA_INTEGRATION_AUTHENTICATION_STATE =
            EzNovaIntegrationAuthenticationState.UNAUTHENTICATED;

        this.DEFAULT_INTEGRATION_MESSAGE = null;
        this.DEFAULT_INTEGRATION_PROVIDER_CONNECTION_ID = null;

        if (ezApi.ezIsValid(ezIntegrationWizardContextInitInfo)) {
            this.ezIntegrationProviderId =
                ezApi.ezIsNotEmptyString(ezIntegrationWizardContextInitInfo.ezIntegrationProviderId)
                    ? ezIntegrationWizardContextInitInfo.ezIntegrationProviderId
                    : self.DEFAULT_EZ_INTEGRATION_PROVIDER_ID;

            this.ezIntegrationType = ezApi.ezIsNotEmptyString(ezIntegrationWizardContextInitInfo.ezIntegrationType)
                ? ezIntegrationWizardContextInitInfo.ezIntegrationType
                : self.DEFAULT_EZ_INTEGRATION_TYPE;

            this.ezNovaAuthType = ezApi.ezIsNotEmptyString(ezIntegrationWizardContextInitInfo.ezNovaAuthType)
                ? ezIntegrationWizardContextInitInfo.ezNovaAuthType
                : self.DEFAULT_EZ_NOVA_AUTH_TYPE;

            this.ezNovaAuthenticationProviderId =
                ezApi.ezIsNotEmptyString(ezIntegrationWizardContextInitInfo.ezNovaAuthenticationProviderId)
                    ? ezIntegrationWizardContextInitInfo.ezNovaAuthenticationProviderId
                    : this.DEFAULT_EZ_NOVA_AUTHENTICATION_PROVIDER_ID;

            this.ezNovaIntegrationAuthenticationState =
                ezApi.ezIsNotEmptyString(ezIntegrationWizardContextInitInfo.ezNovaIntegrationAuthenticationState)
                    ? ezIntegrationWizardContextInitInfo.ezNovaIntegrationAuthenticationState
                    : this.DEFAULT_EZ_NOVA_INTEGRATION_AUTHENTICATION_STATE;

            this.ezIntegrationProviderConnectionId =
                ezApi.ezIsNotEmptyString(ezIntegrationWizardContextInitInfo.ezIntegrationProviderConnectionId)
                    ? ezIntegrationWizardContextInitInfo.ezIntegrationProviderConnectionId
                    : this.DEFAULT_INTEGRATION_PROVIDER_CONNECTION_ID;

            this.ezIntegrationMessage = ezApi.ezIsNotEmptyString(ezIntegrationWizardContextInitInfo.ezIntegrationMessage)
                ? ezIntegrationWizardContextInitInfo.ezIntegrationMessage
                : this.DEFAULT_INTEGRATION_MESSAGE;
        } else {
            this.ezLoadEzWizardContextDefaults(this.ezWizardContextId);
        }
    }

    /**
     * @public
     * Loads the context with the default context values.
     *
     * @param {null|string} selfId
     * When selfId is provided the internal self reference is set equal to ezApi.ezclocker[selfId].
     * If the reference does not exist OR selfId is null or empty the internal self reference is set equal to
     * the JS this.
     */
    ezLoadEzWizardContextDefaults(selfId) {
        const self = ezApi.ezIsNotEmptyString(selfId) ? ezApi.ezclocker[selfId] : this;

        self.ezIntegrationProviderId = self.DEFAULT_EZ_INTEGRATION_PROVIDER_ID;
        self.ezIntegrationType = self.DEFAULT_EZ_INTEGRATION_TYPE;
        self.ezNovaAuthType = self.DEFAULT_EZ_NOVA_AUTH_TYPE;
        self.ezNovaAuthenticationProviderId = self.DEFAULT_EZ_NOVA_AUTHENTICATION_PROVIDER_ID;
        self.ezNovaIntegrationAuthenticationState = self.DEFAULT_EZ_NOVA_INTEGRATION_AUTHENTICATION_STATE;
        self.ezIntegrationProviderConnectionId = self.DEFAULT_INTEGRATION_PROVIDER_CONNECTION_ID;
        self.ezIntegrationMessage = self.DEFAULT_INTEGRATION_MESSAGE;
    }

    /**
     * @public
     * Returns the EzIntegrationProviderId value stored in the context.
     *
     * @param {null|string} selfId
     * When selfId is provided the internal self reference is set equal to ezApi.ezclocker[selfId].
     * If the reference does not exist OR selfId is null or empty the internal self reference is set equal to
     * the JS this.
     *
     * @returns {string}
     */
    ezGetEzIntegrationProviderId(selfId) {
        const self = ezApi.ezIsNotEmptyString(selfId) ? ezApi.ezclocker[selfId] : this;

        return self.ezIntegrationProviderId;
    }

    /**
     * @public
     * Expects a value from EzIntegrationProviderId
     *
     * @param {string} integrationProviderId
     * @param {null|string} selfId
     * When selfId is provided the internal self reference is set equal to ezApi.ezclocker[selfId].
     * If the reference does not exist OR selfId is null or empty the internal self reference is set equal to
     * the JS this.
     */
    ezSetEzIntegrationProviderId(integrationProviderId, selfId) {
        const self = ezApi.ezIsNotEmptyString(selfId) ? ezApi.ezclocker[selfId] : this;

        if (self.ezIntegrationProviderId !== integrationProviderId) {
            let previousValue = self.ezIntegrationProviderId;
            self.ezIntegrationProviderId = integrationProviderId;

            self.ezOnWizardContextValueChanged(
                EzIntegrationWizardContextValueName.EZ_INTEGRATION_PROVIDER_ID,
                self.ezIntegrationProviderId, previousValue);
        }
    }

    /**
     * @public
     * Returns the EzIntegrationType value stored in this context.
     *
     * @param {null|string} selfId
     * When selfId is provided the internal self reference is set equal to ezApi.ezclocker[selfId].
     * If the reference does not exist OR selfId is null or empty the internal self reference is set equal to
     * the JS this.
     *
     * @returns {string}
     */
    ezGetEzIntegrationType(selfId) {
        const self = ezApi.ezIsNotEmptyString(selfId) ? ezApi.ezclocker[selfId] : this;

        return self.ezIntegrationType;
    }

    /**
     * @public
     * Expects a value from EzIntegrationType
     *
     * @param {string} integrationType
     * @param {null|string} selfId
     * When selfId is provided the internal self reference is set equal to ezApi.ezclocker[selfId].
     * If the reference does not exist OR selfId is null or empty the internal self reference is set equal to
     * the JS this.
     */
    ezSetEzIntegrationType(integrationType, selfId) {
        const self = ezApi.ezIsNotEmptyString(selfId) ? ezApi.ezclocker[selfId] : this;

        if (self.ezIntegrationType !== integrationType) {
            let previousValue = self.ezIntegrationType;
            self.ezIntegrationType = integrationType;

            self.ezOnWizardContextValueChanged(
                EzIntegrationWizardContextValueName.EZ_INTEGRATION_TYPE,
                self.ezIntegrationType,
                previousValue);
        }
    }

    /**
     * @public
     * Gets the EzNovaAuthType stored in this context.
     *
     * @param {null|string} selfId
     * When selfId is provided the internal self reference is set equal to ezApi.ezclocker[selfId].
     * If the reference does not exist OR selfId is null or empty the internal self reference is set equal to
     * the JS this.
     *
     * @returns {string}
     */
    ezGetEzNovaAuthType(selfId) {
        const self = ezApi.ezIsNotEmptyString(selfId) ? ezApi.ezclocker[selfId] : this;

        return self.ezNovaAuthType;
    }

    /**
     * @public
     * Expects a value from EzNovaAuthType
     *
     * @param {string} ezNAuthType
     *@param {null|string} selfId
     * When selfId is provided the internal self reference is set equal to ezApi.ezclocker[selfId].
     * If the reference does not exist OR selfId is null or empty the internal self reference is set equal to
     * the JS this.
     */
    ezSetEzNovaAuthType(authType, selfId) {
        const self = ezApi.ezIsNotEmptyString(selfId) ? ezApi.ezclocker[selfId] : this;

        if (self.ezNovaAuthType !== authType) {
            let previousValue = self.ezNovaAuthType;
            self.ezNovaAuthType = authType;

            self.ezOnWizardContextValueChanged(
                EzIntegrationWizardContextValueName.EZ_NOVA_AUTH_TYPE,
                self.ezNovaAuthType,
                previousValue);
        }
    }

    /**
     * @public
     * Gets the EzNovaOAuth2ProviderId stored in this context.
     *
     * @param {null|string} selfId
     * When selfId is provided the internal self reference is set equal to ezApi.ezclocker[selfId].
     * If the reference does not exist OR selfId is null or empty the internal self reference is set equal to
     * the JS this.
     *
     * @returns {string}
     */
    ezGetEzNovaAuthenticationProviderId(selfId) {
        const self = ezApi.ezIsNotEmptyString(selfId) ? ezApi.ezclocker[selfId] : this;

        return self.ezNovaAuthenticationProviderId;
    }

    /**
     * @public
     * Stores the EzNovaOAuth2ProviderId in this context.
     * Expects a value from EzNovaOAuth2ProviderId
     *
     * @param {string} oAuth2ProviderId
     * @param {null|string} selfId
     * When selfId is provided the internal self reference is set equal to ezApi.ezclocker[selfId].
     * If the reference does not exist OR selfId is null or empty the internal self reference is set equal to
     * the JS this.
     */
    ezSetEzNovaAuthenticationProviderId(authenticationProviderId, selfId) {
        const self = ezApi.ezIsNotEmptyString(selfId) ? ezApi.ezclocker[selfId] : this;

        if (self.ezNovaAuthenticationProviderId !== authenticationProviderId) {
            let previousValue = self.ezNovaAuthenticationProviderId;
            self.ezNovaAuthenticationProviderId = authenticationProviderId;

            self.ezOnWizardContextValueChanged(
                EzIntegrationWizardContextValueName.EZ_NOVA_AUTHENTICATION_PROVIDER_ID,
                self.ezNovaAuthenticationProviderId,
                previousValue);
        }
    }

    /**
     * @public
     * Gets the integration provider's connection id stored in this context
     *   * Known as the RealmId for QBO
     *
     * @param {null|string} selfId
     * When selfId is provided the internal self reference is set equal to ezApi.ezclocker[selfId].
     * If the reference does not exist OR selfId is null or empty the internal self reference is set equal to
     * the JS this.
     *
     * @returns {string}
     */
    ezGetEzNovaIntegrationProviderConnectionId(selfId) {
        const self = ezApi.ezIsNotEmptyString(selfId) ? ezApi.ezclocker[selfId] : this;

        return self.ezIntegrationProviderConnectionId;
    }

    /**
     * @public
     * Stores the integration provider's connection id
     *   * Known as the RealmId for QBO
     *
     * @param {string} integrationProviderConnectionId
     * @param {null|string} selfId
     * When selfId is provided the internal self reference is set equal to ezApi.ezclocker[selfId].
     * If the reference does not exist OR selfId is null or empty the internal self reference is set equal to
     * the JS this.
     */
    ezSetEzNovaIntegrationProviderConnectionId(integrationProviderConnectionId,
        selfId) {
        const self = ezApi.ezIsNotEmptyString(selfId) ? ezApi.ezclocker[selfId] : this;

        if (self.ezIntegrationProviderConnectionId !== integrationProviderConnectionId) {
            self.ezIntegrationProviderConnectionId = integrationProviderConnectionId;

            self.ezOnWizardContextValueChanged(
                EzIntegrationWizardContextValueName.EZ_INTEGRATION_PROVIDER_ID,
                self.ezIntegrationProviderConnectionId);
        }
    }

    /**
     * @public
     * Gets the EzNovaIntegrationAuthenticationState stored in this context.
     *
     * @param {null|string} selfId
     * When selfId is provided the internal self reference is set equal to ezApi.ezclocker[selfId].
     * If the reference does not exist OR selfId is null or empty the internal self reference is set equal to
     * the JS this.
     *
     * @returns {string}
     */
    ezGetEzNovaIntegrationAuthenticationState(selfId) {
        const self = ezApi.ezIsNotEmptyString(selfId) ? ezApi.ezclocker[selfId] : this;

        return self.ezIntegrationAuthenticationState;
    }

    /**
     * @public
     * Stores the EzNovaIntegrationAuthenticationState in this context.
     * Expects a value from EzNovaIntegrationAuthenticationState
     *
     * @param {string} integrationAuthenticationState
     * @param {null|string} selfId
     * When selfId is provided the internal self reference is set equal to ezApi.ezclocker[selfId].
     * If the reference does not exist OR selfId is null or empty the internal self reference is set equal to
     * the JS this.
     */
    ezSetEzNovaIntegrationAuthenticationState(integrationAuthenticationState, selfId) {
        const self = ezApi.ezStringHasLength(selfId)
            ? ezApi.ezclocker[selfId]
            : this;

        if (self.ezIntegrationAuthenticationState !== integrationAuthenticationState) {
            self.ezIntegrationAuthenticationState = integrationAuthenticationState;

            self.ezOnWizardContextValueChanged(
                EzIntegrationWizardContextValueName.EZ_INTEGRATION_AUTH_STATE,
                self.ezIntegrationAuthenticationState);
        }
    }

    /**
     * @public
     * Gets the integration message stored in this context.
     *
     * @param {null|string} selfId
     * When selfId is provided the internal self reference is set equal to ezApi.ezclocker[selfId].
     * If the reference does not exist OR selfId is null or empty the internal self reference is set equal to
     * the JS this.
     *
     * @returns {string}
     */
    ezGetEzIntegrationMessage(selfId) {
        const self = ezApi.ezIsNotEmptyString(selfId) ? ezApi.ezclocker[selfId] : this;

        return self.ezIntegrationMessage;
    }

    /**
     * @public
     * Stores the integration message in this context.
     *
     * @param {string} integrationMessage
     * @param {null|string} selfId
     * When selfId is provided the internal self reference is set equal to ezApi.ezclocker[selfId].
     * If the reference does not exist OR selfId is null or empty the internal self reference is set equal to
     * the JS this.
     */
    ezSetEzIntegrationMessage(integrationMessage, selfId) {
        const self = ezApi.ezIsNotEmptyString(selfId) ? ezApi.ezclocker[selfId] : this;

        if (self.ezIntegationMessage !== integrationMessage) {
            self.ezIntegrationMessage = integrationMessage;

            self.ezOnWizardContextValueChanged(
                EzIntegrationWizardContextValueName.EZ_INTEGRATION_AUTH_STATE,
                self.ezIntegrationMessage + self.wizardContextId);
        }
    }

    /**
     * @public
     * Generates a JSON object with this ezWizard's context state
     *
     * @param {null|string} selfId
     * When selfId is provided the internal self reference is set equal to ezApi.ezclocker[selfId].
     * If the reference does not exist OR selfId is null or empty the internal self reference is set equal to
     * the JS this.
     *
     * @returns {Object}
     */
    ezGetWizardContextState(selfId) {
        const self = ezApi.ezIsNotEmptyString(selfId) ? ezApi.ezclocker[selfId] : this;

        return {
            ezWizardContextId: self.ezWizardContextId,
            ezActiveWizardPageId: self.ezGetActiveWizardPageId(),

            integrationProviderId: self.ezGetEzIntegrationProviderId(),
            integrationTypeId: self.ezGetEzIntegrationType(),
            integrationAuthType: self.ezGetEzNovaAuthType(),
            integrationAuthId: self.ezGetEzNovaAuthenticationProviderId(),
            integrationAuthenticationState: self.ezGetEzNovaIntegrationAuthenticationState(),
            integrationMessage: self.ezGetEzIntegrationMessage(),
            integrationProviderConnectionId: self.ezGetEzNovaIntegrationProviderConnectionId()
        };
    }

    /**
     * @public
     * Loads the context from state
     *
     * @param {object} ezWizardContextState
     * @param {string} selfId
     *
     * @returns {Promise}
     */
    ezLoadFromState(ezWizardContextState, selfId) {
        const self = ezApi.ezIsNotEmptyString(selfId) ? ezApi.ezclocker[selfId] : this;

        if (ezApi.ezIsNotValid(ezWizardContextState)) {
            return ezApi.ezReject({
                errorMessage: 'No state data to load.',
                stateLoaded: false
            });
        }

        return ezApi.ezPromise((resolve) => {
            self.ezWizardContextId = ezWizardContextState.wizardId;
            self.ezWizardContextId = ezWizardContextState.ezWizardContextId;
            self.ezSetActiveWizardPageId(ezWizardContextState.ezActiveWizardPageId);
            self.ezSetEzIntegrationProviderId(ezWizardContextState.integrationProviderId);
            self.ezSetEzIntegrationType(ezWizardContextState.integrationTypeId);
            self.ezSetEzNovaAuthType(ezWizardContextState.integrationAuthType);
            self.ezSetEzNovaAuthenticationProviderId(ezWizardContextState.integrationAuthId);
            self.ezSetEzNovaIntegrationAuthenticationState(ezWizardContextState.integrationAuthenticationState);
            self.ezSetEzIntegrationMessage(ezWizardContextState.integrationMessage);
            self.ezSetEzNovaIntegrationProviderConnectionId(ezWizardContextState.integrationProviderConnectionId);

            return resolve({
                stateResponse: ezWizardContextState,
                stateLoaded: true
            });

        });
    }
}

export {
    EzIntegrationUrlParamName,
    EzIntegrationWizardContextValueName,
    EzNovaIntegrationAuthenticationState,
    EzIntegrationWizardContextInitInfo,
    EzIntegrationWizardContext
};

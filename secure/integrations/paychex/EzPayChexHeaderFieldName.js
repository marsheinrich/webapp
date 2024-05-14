import { EzIntegrationHeaderFieldName } from '/secure/integrations/EzIntegrationSetupDialog/EzIntegrationHeaderFieldName.js';

/**
    Defines the PayChex integration setup dialog's header field names
 */
class EzPayChexHeaderFieldName extends EzIntegrationHeaderFieldName {
    static get PAYCHEX_CLIENT_ID() {
        return 'PAYCHEX_CLIENT_ID';
    }
    static get _PAYCHEX_CLIENT_ID() {
        return {
            ezPayloadId: 'ezPayChexClientId',
            ezInputId: 'ezPayChexClientId',
            display: 'Client Id'
        };
    }

    static ezToInputId(enumValue) {
        return EzPayChexHeaderFieldName[`_${enumValue.toUpperCase()}`]['ezInputId'];
    }
    static ezToPayloadId(enumValue) {
        return EzPayChexHeaderFieldName[`_${enumValue.toUpperCase()}`]['ezPayloadId'];
    }
    static ezToDisplayValue(enumValue) {
        return EzPayChexHeaderFieldName[`_${enumValue.toUpperCase()}`]['display'];
    }

    static ezApiName = 'EzPayChexHeaderFieldName';
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzPayChexHeaderFieldName.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    static ezRegistrator() {
        if (EzPayChexHeaderFieldName.ezCanRegister()) {
            EzPayChexHeaderFieldName.ezInstance = ezApi.ezRegisterEnumeration(EzPayChexHeaderFieldName);
            EzPayChexHeaderFieldName.ezApiRegistrationState = 'REGISTERED';
        }
    }
    static {
        this._INTEGRATION_ENABLED.ezInputId = 'ezPayChexIntegrationEnabledInput';

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

export {
    EzPayChexHeaderFieldName
};
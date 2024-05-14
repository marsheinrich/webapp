import { EzIntegrationHeaderFieldName } from '/secure/integrations/EzIntegrationSetupDialog/EzIntegrationHeaderFieldName.js';

/**
    Defines the integration setup dialog's header field names for Gusto Technologies
 */
class EzGustoHeaderFieldName extends EzIntegrationHeaderFieldName {
    static ezApiName = 'EzGustoHeaderFieldName';
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzGustoHeaderFieldName.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    static ezRegistrator() {
        if (EzGustoHeaderFieldName.ezCanRegister()) {
            EzGustoHeaderFieldName.ezInstance = ezApi.ezRegisterEnumeration(EzGustoHeaderFieldName);

            EzGustoHeaderFieldName.ezApiRegistrationState = 'REGISTERED';
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

    static ezToInputId(enumValue) {
        return EzGustoHeaderFieldName[`_${enumValue.toUpperCase()}`]['ezInputId'];
    }
    static ezToPayloadId(enumValue) {
        return EzGustoHeaderFieldName[`_${enumValue.toUpperCase()}`]['ezPayloadId'];
    }
    static ezToDisplayValue(enumValue) {
        return EzGustoHeaderFieldName[`_${enumValue.toUpperCase()}`]['display'];
    }

    constructor() {
        super();
    }
}

export {
    EzGustoHeaderFieldName
};
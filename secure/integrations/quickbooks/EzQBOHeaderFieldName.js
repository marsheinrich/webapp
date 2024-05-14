import { EzIntegrationHeaderFieldName } from '/secure/integrations/EzIntegrationSetupDialog/EzIntegrationHeaderFieldName.js';

/**
    Defines the integration setup dialog's header field names for QBO Technologies
 */
class EzQBOHeaderFieldName extends EzIntegrationHeaderFieldName {
    static ezApiName = 'EzQBOHeaderFieldName';
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzQBOHeaderFieldName.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    static ezRegistrator() {
        if (EzQBOHeaderFieldName.ezCanRegister()) {
            EzQBOHeaderFieldName.ezInstance = ezApi.ezRegisterEnumeration(EzQBOHeaderFieldName);

            EzQBOHeaderFieldName.ezApiRegistrationState = 'REGISTERED';
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
        return EzQBOHeaderFieldName[`_${enumValue.toUpperCase()}`]['ezInputId'];
    }
    static ezToPayloadId(enumValue) {
        return EzQBOHeaderFieldName[`_${enumValue.toUpperCase()}`]['ezPayloadId'];
    }
    static ezToDisplayValue(enumValue) {
        return EzQBOHeaderFieldName[`_${enumValue.toUpperCase()}`]['display'];
    }

    constructor() {
        super();
    }
}

export {
    EzQBOHeaderFieldName
};
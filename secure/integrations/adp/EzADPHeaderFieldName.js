import { EzIntegrationHeaderFieldName } from '/secure/integrations/EzIntegrationSetupDialog/EzIntegrationHeaderFieldName.js';

/**
    Defines the APD integration setup dialog's header field names
 */
class EzADPHeaderFieldName extends EzIntegrationHeaderFieldName {
    static get COMPANY_CODE() {
        return 'COMPANY_CODE';
    }
    static get _COMPANY_CODE() {
        return {
            ezPayloadId: 'ezADPClientId',
            ezInputId: 'ezADPCompanyCodeInput',
            display: 'ADP Workforce Now Company Code'
        };
    }
    static get BATCH_NUMBER() {
        return 'BATCH_NUMBER';
    }
    static get _BATCH_NUMBER() {
        return {
            ezPayloadId: 'ezADPBatchNumber',
            ezInputId: 'ezADPBatchNumberInput',
            display: 'APD Workforce Now Batch Number'
        };
    }

    static ezToInputId(enumValue) {
        return EzADPHeaderFieldName[`_${enumValue.toUpperCase()}`]['ezInputId'];
    }
    static ezToPayloadId(enumValue) {
        return EzADPHeaderFieldName[`_${enumValue.toUpperCase()}`]['ezPayloadId'];
    }

    static ezApiName = 'EzADPHeaderFieldName';
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzADPHeaderFieldName.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    static ezRegistrator() {
        if (EzADPHeaderFieldName.ezCanRegister()) {
            EzADPHeaderFieldName.ezInstance = ezApi.ezRegisterEnumeration(EzADPHeaderFieldName);

            EzADPHeaderFieldName.ezApiRegistrationState = 'REGISTERED';
        }
    }
    // Static Constructor
    static {
        this._INTEGRATION_ENABLED.ezInputId = 'ezADPEnableIntegrationInput';

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
    EzADPHeaderFieldName
};
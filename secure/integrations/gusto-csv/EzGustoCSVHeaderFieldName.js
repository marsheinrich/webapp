import { EzIntegrationHeaderFieldName } from '/secure/integrations/EzIntegrationSetupDialog/EzIntegrationHeaderFieldName.js';

/**
    Defines the integration setup dialog's header field names for Gusto Technologies
 */
export class EzGustoCSVHeaderFieldName extends EzIntegrationHeaderFieldName {
    static ezApiName = 'EzGustoCSVHeaderFieldName';
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzGustoCSVHeaderFieldName.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    static ezRegistrator() {
        if (EzGustoCSVHeaderFieldName.ezCanRegister()) {
            EzGustoCSVHeaderFieldName.ezInstance = ezApi.ezRegisterEnumeration(EzGustoCSVHeaderFieldName);

            EzGustoCSVHeaderFieldName.ezApiRegistrationState = 'REGISTERED';
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
        return EzGustoCSVHeaderFieldName[`_${enumValue.toUpperCase()}`]['ezInputId'];
    }
    static ezToPayloadId(enumValue) {
        return EzGustoCSVHeaderFieldName[`_${enumValue.toUpperCase()}`]['ezPayloadId'];
    }
    static ezToDisplayValue(enumValue) {
        return EzGustoCSVHeaderFieldName[`_${enumValue.toUpperCase()}`]['display'];
    }

    constructor() {
        super();
    }
}

import { EzIntegrationHeaderFieldName } from '/secure/integrations/EzIntegrationSetupDialog/EzIntegrationHeaderFieldName.js';

/**
    Defines the Paycom integration setup dialog's header field names
 */
export class EzPaycomHeaderFieldName extends EzIntegrationHeaderFieldName {
    static ezToInputId(enumValue) {
        return EzPaycomHeaderFieldName[`_${enumValue.toUpperCase()}`]['ezInputId'];
    }

    static ezToPayloadId(enumValue) {
        return EzPaycomHeaderFieldName[`_${enumValue.toUpperCase()}`]['ezPayloadId'];
    }

    static ezToDisplayValue(enumValue) {
        return EzPaycomHeaderFieldName[`_${enumValue.toUpperCase()}`]['display'];
    }

    static get ezApiName() {
        return 'EzPaycomHeaderFieldName';
    }

    static ezInstance = null;

    static ezApiRegistrationState = null;

    static ezCanRegister() {
        return 'PENDING' === EzPaycomHeaderFieldName.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }

    static #ezRegistrator() {
        if (EzPaycomHeaderFieldName.ezCanRegister()) {
            EzPaycomHeaderFieldName.ezInstance = ezApi.ezRegisterEnumeration(EzPaycomHeaderFieldName);
            EzPaycomHeaderFieldName.ezApiRegistrationState = 'REGISTERED';
        }
    }

    static {
        EzPaycomHeaderFieldName._INTEGRATION_ENABLED.ezInputId = 'ezPaycomIntegrationEnabledInput';

        if (null == EzPaycomHeaderFieldName.ezApiRegistrationState) {
            EzPaycomHeaderFieldName.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                EzPaycomHeaderFieldName.#ezRegistrator);
        }
    }

    constructor() {
        super();
    }
}
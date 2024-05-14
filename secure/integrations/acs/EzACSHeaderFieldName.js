import { EzIntegrationHeaderFieldName } from '/secure/integrations/EzIntegrationSetupDialog/EzIntegrationHeaderFieldName.js';

/**
    Defines the integration setup dialog's header field names for ACS Technologies
 */
class EzACSHeaderFieldName extends EzIntegrationHeaderFieldName {
    static ezInstance = null;
    static ezApiRegistrationState = null;

    static get ezApiName() {
        return 'EzACSHeaderFieldName';
    }
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzACSHeaderFieldName_Ready'
        };
    }

    static get ezCanRegister() {
        return 'PENDING' === EzACSHeaderFieldName.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }

    static #ezRegistrator() {
        if (!EzACSHeaderFieldName.ezCanRegister) {
            return false;
        }
        EzACSHeaderFieldName.ezInstance = ezApi.ezRegisterEnumeration(EzACSHeaderFieldName);
        EzACSHeaderFieldName.ezApiRegistrationState = 'REGISTERED';
        return true;
    }

    // Static Constructor
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                this.#ezRegistrator);
        }
    }

    constructor() {
        super();
    }
}

export {
    EzACSHeaderFieldName
};
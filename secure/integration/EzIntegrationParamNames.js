import { EzEnum } from '/ezlibrary/enums/EzEnum.js';

class EzIntegrationParamNames extends EzEnum {
    static get PROVIDER_ID() {
        return 'pid';
    }

    static ezApiName = 'EzIntegrationParamNames';
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzIntegrationParamNames.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    static ezRegistrator() {
        if (EzIntegrationParamNames.ezCanRegister()) {
            EzIntegrationParamNames.ezInstance = ezApi.ezRegisterEnumeration(EzIntegrationParamNames);

            EzIntegrationParamNames.ezApiRegistrationState = 'REGISTERED';
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

export {
    EzIntegrationParamNames
};
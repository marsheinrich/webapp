import { EzEnum } from '/ezlibrary/enums/EzEnum.js';

/**
    Defines the possible display modes for integration setup dialogs.
 */
class EzIntegrationSetupDialogDisplayMode extends EzEnum {
    static get FULL_SCREEN() {
        return 'FULL_SCREEN';
    }
    
    static get DIALOG() {
        return 'DIALOG';
    }

    static ezApiName = 'EzIntegrationSetupDialogDisplayMode';
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzIntegrationSetupDialogDisplayMode.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    static ezRegistrator() {
        if (EzIntegrationSetupDialogDisplayMode.ezCanRegister()) {
            EzIntegrationSetupDialogDisplayMode.ezInstance = ezApi.ezRegisterEnumeration(EzIntegrationSetupDialogDisplayMode);

            EzIntegrationSetupDialogDisplayMode.ezApiRegistrationState = 'REGISTERED';
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
    EzIntegrationSetupDialogDisplayMode
};
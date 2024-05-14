import { EzEnum } from '/ezlibrary/enums/EzEnum.js';

/**
    Defines the export dialog's available
 */
class EzExportDialogMode extends EzEnum {
    static get UNKNOWN() {
        return 'UNKNOWN';
    }
    static get _UNKNOWN() {
        return {
            display: 'UNKNOWN'
        };
    }
    static get EMPLOYER() {
        return 'EMPLOYER';
    }
    static get _EMPLOYER() {
        return {
            display: 'Employer Export Mode'
        };
    }
    static get EMPLOYEE() {
        return 'EMPLOYEE';
    }
    static get _EMPLOYEE() {
        return {
            display: 'Employee Export Mode',
        };
    }

    static ezToDisplayName(enumValue) {
        return EzExportDialogMode[`_${enumValue.toUpperCase()}`]['display'];
    }

    static ezApiName = 'EzExportDialogMode';
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzExportDialogMode.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    static ezRegistrator() {
        if (EzExportDialogMode.ezCanRegister()) {
            EzExportDialogMode.ezInstance = ezApi.ezRegisterEnumeration(EzExportDialogMode);

            EzExportDialogMode.ezApiRegistrationState = 'REGISTERED';
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
    EzExportDialogMode
};
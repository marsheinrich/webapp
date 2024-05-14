import { EzEnum } from '/ezlibrary/enums/EzEnum.js';

/**
    Defines the export action to perform
 **/
class EzExportAction extends EzEnum {
    static get UNKNOWN() {
        return 'UNKNOWN';
    }
    static get _UNKNOWN() {
        return {
            display: 'Unknown export action.',
        };
    }
    static get EXPORT_CURRENT_EMPLOYEE() {
        return 'EXPORT_CURRENT_EMPLOYEE';
    }
    static get _EXPORT_CURRENT_EMPLOYEE() {
        return {
            display: 'Export Current Employee\'s Time Entries for Period Report',
        };
    }
    static get EXPORT_SELECTED_EMPLOYEE() {
        return 'EXPORT_SELECTED_EMPLOYEE';
    }
    static get _EXPORT_SELECTED_EMPLOYEE() {
        return {
            display: 'Export the Selected Employee\'s Time Entries for Period Report',
        };
    }
    static get EXPORT_ALL_EMPLOYEES() {
        return 'EXPORT_ALL_EMPLOYEES';
    }
    static get _EXPORT_ALL_EMPLOYEES() {
        return {
            display: 'Export All Employee\'s Time Entries for Period Report',
        };
    }
    static get EXPORT_JOBS() {
        return 'EXPORT_JOBS';
    }
    static get _EXPORT_JOBS() {
        return {
            display: 'Export Jobs Report',
        };
    }
    static get EXPORT_INTEGRATION() {
        return 'EXPORT_INTEGRATION';
    }
    static get _EXPORT_INTEGRATION() {
        return {
            display: 'Export to Integration',
        };
    }

    static ezToDisplayName(enumValue) {
        return EzExportAction[`_${enumValue.toUpperCase()}`]['display'];
    }

    static ezApiName = 'EzExportAction';
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzExportAction.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    static ezRegistrator() {
        if (EzExportAction.ezCanRegister()) {
            EzExportAction.ezInstance = ezApi.ezRegisterEnumeration(EzExportAction);

            EzExportAction.ezApiRegistrationState = 'REGISTERED';
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
    EzExportAction
};
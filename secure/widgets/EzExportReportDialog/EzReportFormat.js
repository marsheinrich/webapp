import { EzEnum } from '/ezlibrary/enums/EzEnum.js';

/**
    @public
    Enumeration of Report Formats
    Import with:
        import { EzReportFormat } from '/secure/widgets/EzExportReportDialog/EzReportFormat.js';
 */
class EzReportFormat extends EzEnum {
    /**
     * CSV report format
     */
    static get CSV() {
        return 'CSV';
    }
    /**
     * Excel (XLS) report format
     */
    static get EXCEL() {
        return 'EXCEL';
    }
    /**
     * HTML Report Format
     */
    static get HTML() {
        return 'HTML';
    }
    /**
     * PDF report format
     */
    static get PDF() {
        return 'PDF';
    }

    static ezApiName = 'EzReportFormat';
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzReportFormat.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    static ezRegistrator() {
        if (EzReportFormat.ezCanRegister()) {
            EzReportFormat.ezInstance = ezApi.ezRegisterEnumeration(EzReportFormat);

            EzReportFormat.ezApiRegistrationState = 'REGISTERED';
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
    EzReportFormat
};

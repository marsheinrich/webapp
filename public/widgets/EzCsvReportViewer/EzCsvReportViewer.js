import { EzClass } from '/ezlibrary/EzClass.js';

import { EzRegistrationState } from '/ezlibrary/enums/EzRegistrationState.js';

/**
    Webcomponent that will display a CSV report
 */
export class EzCsvReportViewer extends EzClass {
    static #ezInstance = Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
        globalThis.ezApi &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi, 'ezclocker') &&
        globalThis.ezApi.ezclocker &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi.ezclocker, EzCsvReportViewer.ezApiName) &&
        globalThis.ezApi.ezclocker[EzCsvReportViewer.ezApiName]
        ? globalThis.ezApi.ezclocker[EzCsvReportViewer.ezApiName]
        : null;

    static #ezApiRegistrationState = Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
        globalThis.ezApi &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi, 'ezclocker') &&
        globalThis.ezApi.ezclocker &&
        Object.prototype.hasOwnProperty.call(globalThis.ezApi.ezclocker, EzCsvReportViewer.ezApiName) &&
        globalThis.ezApi.ezclocker[EzCsvReportViewer.ezApiName]
        ? globalThis.ezApi.ezclocker[EzCsvReportViewer.ezApiName].constructor.ezApiRegistrationState
        : null;

    static get ezInstance() {
        return this.#ezInstance;
    }

    static set ezInstance(ezCsvReportViewer) {
        if (null != EzCsvReportViewer.#ezInstance) {
            throw new Error('EzCsvReportViewer\'s singleton instance is already reigstered with EzApi.');
        }

        EzCsvReportViewer.#ezInstance = ezCsvReportViewer;
    }

    static get ezApiRegistrationState() {
        return EzCsvReportViewer.#ezApiRegistrationState;
    }

    static set ezApiRegistrationState(registrationState) {
        registrationState = EzRegistrationState.ezValueOf(registrationState);

        EzCsvReportViewer.#ezApiRegistrationState = EzRegistrationState.UNKNOWN !== registrationState
            ? registrationState
            : null;
    }

    static get ezApiName() {
        return 'ezwEmployerExportTimeSheetDialog';
    }

    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzwEmployerExportTimeSheetDialog_Ready',
            onExportDialogReady: 'ezOn_EzwEmployerExportTimeSheetDialog_Ready'
        };
    }

    static get ezCanRegister() {
        return 'PENDING' === EzCsvReportViewer.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready;
    }

    static #ezRegistrator() {
        if (!EzCsvReportViewer.ezCanRegister) {
            return false;
        }

        ezApi.ezRegisterNewApi(
            EzCsvReportViewer,
            EzCsvReportViewer.ezApiName);

        EzCsvReportViewer.ezApiRegistrationState = EzRegistrationState.REGISTERED;

        return true;
    }

    // Static constructor
    static {
        if (null == EzCsvReportViewer.ezApiRegistrationState) {
            EzCsvReportViewer.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzCsvReportViewer.#ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    EzCsvReportViewer.#ezRegistrator);
            }
        }
    }

    /**
        @public @constructor
     */
    constructor() {
        super();
    }
}
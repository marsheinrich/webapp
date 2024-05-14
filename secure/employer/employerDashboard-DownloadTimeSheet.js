import { EzUI } from '/public/javascript/common/ezui.js';

/**
 * Controller for the employer time sheet report dialog
 */
class EzEmployerTimesheetReportDialog {
    static ezInstance = null;
    static ezApiRegistrationState = null;

    static get ezApiName() {
        return 'ezEmployerTimesheetReportDialog';
    }

    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzEmployerTimesheetReportDialog_Ready'
        };
    }

    static get ezCanRegister() {
        return 'PENDING' === EzEmployerTimesheetReportDialog.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready &&

            globalThis['ezApi'].ezclocker[EzUI.ezApiName] &&
            globalThis['ezApi'].ezclocker[EzUI.ezApiName].ready;

    }

    static #ezRegistrator() {
        if (!EzEmployerTimesheetReportDialog.ezCanRegister) {
            return false;
        }

        EzEmployerTimesheetReportDialog.ezInstance = ezApi.ezRegisterNewApi(
            EzEmployerTimesheetReportDialog,
            EzEmployerTimesheetReportDialog.ezApiName);
        EzEmployerTimesheetReportDialog.ezApiRegistrationState = 'REGISTERED';
        return true;
    }

    // Static Initialization
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            if (!this.#ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    this.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    this.#ezRegistrator);
            }
        }
    }

    constructor() {
        this.ready = false;
        this.dialogHtml = '<div id="_EzTimeSheetReportDialogContainer" style="display:none">' +
            '<div id="downloadTimeSheetDialog" title="Download Time Sheet for Employee">' +
            '<form id="downloadTimeSheetForm" action="../timeEntries/range/csv/" enctype="application/json" method="post">' +
            '<input type="hidden" id="query_hiddenEmployeeId" name="employerId" />' +
            '<label>Start Date</label><br />' +
            '<input type="text" class="defaultDatePicker" id="query_startDate" name="startDate" /><br />' +
            '<label>End Date</label><br />' +
            '<input type="text" class="defaultDatePicker" id="query_endDate" name="endDate" /><br />' +
            '</form></div></div>';
    }

    /**
     * @public
     * Initializes EzEmployerTimesheetReportDialog
     *
     * @returns {EzEmployerTimesheetReportDialog}
     */
    ezInit() {
        return EzEmployerTimesheetReportDialog.ezInstance;
    }

    /**
     * @public
     * Initialzies the EzEmployerTimesheetReportDialog UX
     */
    ezInitUx() {
        const self = EzEmployerTimesheetReportDialog.ezInstance;
        ezApi.ezclocker.ezUi.ezAppend$('body', self.dialogHtml);

        ezApi.ezId('downloadTimeSheetDialog').dialog({
            dialogClass: ezApi.ezclocker.ezDialog.DEFAULTS.dialogClass,
            closeOnEscape: ezApi.ezclocker.ezDialog.DEFAULTS.closeOnEscape,
            autoOpen: ezApi.ezclocker.ezDialog.DEFAULTS.autoOpen,
            position: ezApi.ezclocker.ezDialog.DEFAULTS.position,
            show: ezApi.ezclocker.ezDialog.DEFAULTS.show,
            hide: ezApi.ezclocker.ezDialog.DEFAULTS.hide,
            width: 375,
            modal: true,
            buttons: {
                Download: {
                    id: 'EzDownloadReport',
                    click: EzEmployerTimesheetReportDialog.ezInstance.ezSubmit
                },
                Cancel: {
                    id: 'EzCancelDownloadReport',
                    click: EzEmployerTimesheetReportDialog.ezInstance.ezClose
                }
            },
            close: EzEmployerTimesheetReportDialog.ezInstance.ezClose
        });

        // Add Time Entry Dialog Editors
        ezApi.ezId('query_startDate').datepicker({
            dateFormat: 'mm/dd/yy',
            showButtonPanel: true,
            buttonText: 'Select date...',
            constrainInput: true,
            showOn: 'button'
        });

        // Add Time Entry Dialog Editors
        ezApi.ezId('query_endDate').datepicker({
            dateFormat: 'mm/dd/yy',
            showButtonPanel: true,
            buttonText: 'Select date...',
            constrainInput: true,
            showOn: 'button'
        });
        ezApi.ezId('downloadTimeSheetForm').submit(self.ezSubmit);
    }

    /**
     * @public
     * Shows the download time sheet dialog.
     */
    ezShow() {
        if (ezApi.ezclocker.ezClockerContext.ezIsActiveEmployerValid()) {
            ezApi.ezclocker.ezLogger.error('A valid active employer is required in call to EzEmployerTimesheetReportDialog.ezShow');
            return;
        }
        let aEmployer = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer();
        let ezPeriodStartEndMoments = ezApi.ezclocker.ezClockerContext.ezGetActiveAccountStartEndPeriod();

        ezApi.ezId('query_hiddenEmployeeId').get(0).value = aEmployer.id;

        ezApi.ezclocker.ezDateTime.ezSetDatePickerValue('query_startDate', ezPeriodStartEndMoments.ezPeriodStartMoment);
        ezApi.ezclocker.ezDateTime.ezSetDatePickerValue('query_endDate', ezPeriodStartEndMoments.ezPeriodEndMoment);

        ezUi.ezShowDialog('downloadTimeSheetDialog');
    }

    /**
     * @public
     * Closes the download time sheet dialog
     */
    ezClose() {
        ezUi.ezCloseDialog('downloadTimeSheetDialog');
    }

    /**
     * @public
     * Executes the download time sheet/report
     *
     * @param {Object|null} event
     */
    ezSubmit(event) {
        const self = EzEmployerTimesheetReportDialog.ezInstance;

        if (ezApi.ezclocker.ezClockerContext.ezIsActiveEmployerValid()) {
            ezApi.ezclocker.ezLogger.error('A valid active employer is required in call to EzEmployerTimesheetReportDialog.ezShow');
            return;
        }
        let aEmployer = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer();
        if (ezApi.ezclocker.ezClockerContext.ezIsActiveEmployeeValid()) {
            ezApi.ezclocker.ezLogger.error('A valid active employee is required in call to EzEmployerTimesheetReportDialog.ezShow');
            return;
        }
        let aEmployee = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee();

        event.preventDefault();

        let startDateTime = ezApi.ezclocker.ezDateTime.ezCreateFromIso(ezApi.ezId('query_startDate').val() + ' 01:00 AM');
        let endDateTime = ezApi.ezclocker.ezDateTime.ezCreateFromIso(ezApi.ezId('query_endDate').val() + ' 11:59 PM');

        let url = ezApi.ezclocker.nav.getInternalClassicApiUrl(
            ezApi.ezUrlTemplate`
                reports/timeEntries/range/csv/${aEmployer.id}/${aEmployee.id}
                    ?timeZoneId=${ezApi.ezclocker.ezEncode(ezApi.ezclocker.ezDateTime.activeTimeZone)}
                    &startDate=${startDateTime.toString('MM/DD/YYYY')}
                    &endDate=${endDateTime.toString('MM/DD/YYYY')}`);
        window.open(url, 'Time Sheet Download');

        self.ezClose();
    }

    /**
     * @deprecated
     *
     * @public
     * Displays the download time sheet UI
     */
    downloadEmployeeCsv() {
        EzEmployerTimesheetReportDialog.ezInstance.ezShow();
    }

    /**
     * @deprecated
     *
     * @public
     */
    closeDownloadCsvDialog() {
        EzEmployerTimesheetReportDialog.ezInstance.ezClose();
    }

    /**
     * @deprecated
     *
     * @public
     */
    submitDownloadCsvForm() {
        EzEmployerTimesheetReportDialog.ezInstance.ezSubmit();
    }

    /**
     * @deprecated
     *
     * @public
     * Submits the request to download the employee CSV report.
     *
     * @param event
     */
    downloadCsvSubmit() {
        EzEmployerTimesheetReportDialog.ezInstance.ezSubmit();
    }
}

export {
    EzEmployerTimesheetReportDialog
};

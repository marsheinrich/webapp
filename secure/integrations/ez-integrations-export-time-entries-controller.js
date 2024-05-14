class EzExportTimeEntriesToIntegration {
    constructor() {
        this.ready = false;

        this.ezContext = {
            ezExportButton: null,
            ezFromDate: null,
            ezToDate: null,
            ezValidationError: null,
            ezFromDateInput: null,
            ezToDateInput: null,
            fromDate: null,
            toDate: null
        };

        this.ezInit();
    }

    /**
        @protected
        Initializes EzExportTimeEntriedsToIntegration
    */
    ezInit() {
        this.ready = false;
        if (typeof ezApi === 'undefined' || !ezApi) {
            window.console.error('EzExportTimeEntriedsToIntegration.js requires dependency ezapi.js.');
            return this;
        }
        this.ready = true;
        this.ezInitQuickFilterUx();
        return this;
    }

    /**
     * Renders the inputs for exporting time entries
     * @param {object} parentId
     */
    ezRender(parentId) {
        let ux = '<div id="_ezw_ExportTimeSheetToQBOValidationError" class="ezHiddenByDefault ezValidationError"/>' +
            '<p>Select the pay period you wish to export to QuickBooks.</p>' +
            '<table><tr><td><div>Starting Date</div><div><input type="text" id="_EZW_ExportTimeSheetToQBOStartDate" /></div>' +
            '</td><td><div>End Date</div><div><input type="text" id="_EZW_ExportTimeSheetToQBOEndDate" /></div>' +
            '</td></tr></table><div>' +
            '<button id="_ezw_ExportTimeEntriesToQBO" onclick="ezApi.s.ezExportTimeEntriesToIntegration.ezExportTimeEntries()">Export...</button></div>';

        this.ezContext.ezFromDateInput = ezApi.ez('_EZW_ExportTimeSheetToQBOStartDate');
        this.ezContext.ezToDateInput = ezApi.ez('_EZW_ExportTimeSheetToQBOEndDate');
        this.ezContext.ezValidationError = ezApi.ez('_ezw_ExportTimeSheetToQBOValidationError');
        this.ezContext.ezExportButton = ezApi.ez('_ezw_ExportTimeEntriesToQBO');

        ezApi.ez(parentId).html(ux);
    }

    /**
     * Performs the export of time entries
     */
    ezExportTimeEntries() {
        if (!this.ezValidateExportPeriod()) {
            return;
        }

        ezApi.s.ezQboSyncController.ezSyncTimeEntries();
    }

    /**
     * Validates the to and from dates for exporting time entries
     */
    ezValidateExportPeriod() {
        if (ezApi.isNotValid(this.ezContext)) {
            return false;
        }

        if (ezApi.isValid(this.ezContext) && ezApi.isValid(this.ezContext.ezExportButton)) {
            ezApi.ez('_ezw_ExportTimeEntriesToQBO').button('option', 'disabled', false);
        }

        if (ezApi.isNotValid(this.ezContext.ezFromDateInput) || ezApi.isNotValid(this.ezContext.ezToDateInput)) {
            return false;
        }

        let currentDate = ezApi.p.ezDateTime.ezNow()();
        try {
            this.ezContext.fromDate = ezApi.p.ezDateTime.ezCreateFromValue(this.ezContext.ezFromDateInput.val());
            this.ezContext.toDate = ezApi.p.ezDateTime.ezCreateFrom(this.ezContext.ezToDateInput.val());
            if (this.ezContext.toDate.before(this.ezContext.fromDate)) {
                this.ezShowValidationError('To date must fall after the from date.');
                return false;
            }
            if (this.ezContext.fromDate.after(currentDate) || this.ezContext.toDate.after(currentDate)) {
                this.ezShowValidationError('Export does not support future dates.');
                return false;
            }

            //TODO: Restrict export to a month back
            // Enable the export button if validation is successfull
            ezApi.ez('_ezw_ExportTimeEntriesToQBO').button('option', 'disabled', false);
        } catch (ex) {
            this.ezShowValidationError('Please enter valid to and from dates.');
            return false;
        }
        return true;
    }

    /**
     * Shows the validation error box
     * @param {object} message
     */
    ezShowValidationError(message) {
        if (ezApi.isNotValid(this.ezContext) || ezApi.isNotValid(this.ezContext.ezValidationError)) {
            return;
        }
        this.ezContext.ezValidationError.attr('class', 'ezValidationError');
        this.ezContext.ezValidationError.fadeIn();
        this.ezContext.ezValidationError.html('<p>' + message + '</p>');
    }

    /**
     * Hides the validation error box
     */
    ezHideValidationError() {
        if (ezApi.isNotValid(this.ezContext) || ezApi.isNotValid(this.ezContext.ezValidationError)) {
            return;
        }
        this.ezContext.ezValidationError.fadeOut();
        this.ezContext.ezValidationError.html('');
        this.ezContext.ezValidationError.attr('class', 'ezHiddenByDefault');
    }
}

$('document').ready(function() {
    let entity = new EzExportTimeEntriesToIntegration();
    if (typeof ezApi !== 'undefined' && ezApi) {
        ezApi.s['ezExportTimeEntriesToIntegration'] = entity;
    }
});

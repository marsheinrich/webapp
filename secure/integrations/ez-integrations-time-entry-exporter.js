// import { EzEmployerService } from '/secure/javascript/common/ezclocker-employer-services.js';

// TODO: Review use of class below and update or deprecated as needed.

/**
 * @public
 * Constructor
 * @returns {EzIntegrationExportController}
 */
function EzIntegrationExportController() {
    this.ready = false;
    this.datePickerValueFormat = 'MM/DD/YYYY';
    this.ezIntegrationsEndpoint = ezApi.p.nav.getInternalApiServiceUrl('integrations', 'v1');

    return this;
}

/**
 * @public
 * Initializes  EzIntegrationExportController
 * @returns {EzIntegrationExportController}
 */
EzIntegrationExportController.prototype.ezInit = function() {
    var self = ezApi.ezclocker.ezIntegrationExportController;

    self.ready = true;
    return self;
};

/**
 * @public
 * Initializes the wizard page
 * @param {null|string} startDatePickerId,
 * @param {null|string} endDatePickerId,
 * @param {null|startDate} startDate,
 * @param {null|endDate} endDate
 */
EzIntegrationExportController.prototype.ezInitWizardPage = function(startDatePickerId, endDatePickerId, startDate, endDate) {
    var self = ezApi.ezclocker.ezIntegrationExportController;

    self.ezStartDatePickerId = ezApi.ezIsEmptyString(startDatePickerId) ? 'EzExportTimeSheetToQboStartDate' : startDatePickerId;
    self.ezEndDatePickerId = ezApi.ezIsEmptyString(endDatePickerId) ? 'EzExportTimeSheetToQboEndDate' : endDatePickerId;

    startDate = ezApi.ezIsValid(startDate) ? startDate : ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay();
    self.startDatePicker = ezUi.ezId(self.ezStartDatePickerId).datepicker({
        dateFormat: 'mm/dd/yy',
        showButtonPanel: true,
        buttonText: 'Select date...',
        constrainInput: true,
        showOn: 'button',
        onchange: this.ezValidateExportRange
    });
    ezApi.ezclocker.ezDateTime.ezSetDatePickerValue(self.ezStartDatePickerId, startDate);

    endDate = ezApi.ezIsValid(endDate) ? endDate : ezApi.ezclocker.ezDateTime.ezNowWithEndOfDay().add(14, 'days');
    self.endDatePicker = ezUi.ezId(self.ezEndDatePickerId).datepicker({
        dateFormat: 'mm/dd/yy',
        showButtonPanel: true,
        buttonText: 'Select date...',
        constrainInput: true,
        showOn: 'button',
        onchange: this.ezValidateExportRange
    });
    ezApi.ezclocker.ezDateTime.ezSetDatePickerValue(self.ezEndDatePickerId, endDate);
    self.ezIntegrationProviderId = ezApi.ezclocker.ezUrlHelper.getUrlParam('iid');
    ezApi.ezclocker[window.EZ_WIZARD_API_ID].ezOnWizardExport = self.ezHandleTimeEntryExportEvent;
};

/**
 * @public
 * Handles the users's click of the export button in the wizard.
 */
EzIntegrationExportController.prototype.ezHandleTimeEntryExportEvent = function() {
    var self = ezApi.ezclocker.ezIntegrationExportController;

    return ezApi.ezPromise(function(resolve) {
        if (!self.ezValidateExportRange()) {
            return; // stop the export
        }
        ezUi.ezHide('EzWizardExportTimeEntriesDateSelectionContainer');
        ezUi.ezFadeIn('EzWizardExportTimeEntriesProgressContainer');
        ezApi.ezclocker.http.ezPost('/_api/v1/integrations/' + self.ezIntegrationProviderId +
            '/export/time-entries',
        ezApi.ezToJson({
            startDateTimeIso: ezApi.ezclocker.ezDateTime.ezToIsoDateTime(
                ezApi.ezclocker.ezDateTime.ezDateFromDatePicker(self.ezStartDatePickerId)),
            endDateTimeIso: ezApi.ezclocker.ezDateTime.ezToIsoDateTime(
                ezApi.ezclocker.ezDateTime.ezDateFromDatePicker(self.ezEndDatePickerId)),
        }))
            .then(ezApi.ezclocker.ezServices.ezProcessApiResolve, ezApi.ezclocker.ezServices.ezProcessApiReject)
            .then(
                function(response) {
                    if (ezApi.ezIsNotValid(response) || ezApi.ezIsNotValid(response.errorCode) ||
                        response.errorCode !== 0) {
                        ezApi.ezclocker.logger.error('Failed to export time entries to integration ' +
                            self.ezIntegrationProviderId + ': ' + ezApi.ezToJson(response));
                        var em = ezApi.ezIsEmptyString(response.message)
                            ?
                            'Unable to export time entries to your integration at this time. Please try again later.'
                            : response.message;
                        ezApi.ezclocker.ezDialog.ezShowError('Export Time Entries Error', em, resolve());
                        return;
                    }

                    ezApi.ezclocker[window.EZ_WIZARD_API_ID].ezNext();
                    resolve();
                },
                function(eResponse) {
                    ezApi.ezclocker.logger.error('Failed to export time entries to integration ' +
                        self.ezIntegrationProviderId + ': ' + ezApi.ezToJson(eResponse));
                    var em = ezApi.ezIsEmptyString(eResponse.message)
                        ? 'Unable to export time entries to your integration at this time. Please try again later.'
                        : eResponse.message;
                    ezApi.ezclocker.ezDialog.ezShowError('Export Time Entries Error', em, resolve());
                });
    });
};

/**
 * @public
 * Sets the start date
 * @param {object} startDate
 * momentjs instance
 */
EzIntegrationExportController.prototype.ezSetStartDate = function(startDate) {
    if (ezApi.isObject(startDate)) {
        ezApi.p.logger.error('Provided start date ' + {} + ' is not valid.');
    }
    this.startDatePicker.datepicker('setDate', startDate.toDate());
};

/**
 * @public
 * Sets the end date
 * @param {object} endDate
 * momentjs instance
 */
EzIntegrationExportController.prototype.ezSetEndDate = function(endDate) {
    this.endDatePicker.datepicker('setDate', endDate.toDate());
};

/**
 * @public
 *  Validates the date range selections
 */
EzIntegrationExportController.prototype.ezValidateExportRange = function() {
    var self = ezApi.ezclocker.ezIntegrationExportController;

    var startDate = ezApi.ezclocker.ezDateTime.ezDateFromDatePicker(self.ezStartDatePickerId);
    var endDateVal = self.endDatePicker.val();
    if (ezApi.isEmptyString(endDateVal)) {
        self.ezSetEndDate(startDate.add(14, 'days').hour(11).minutes(59).seconds(59).milliseconds(999));
        ezUi.ezHtml('EzIntegrationExportTimeEntriesErrorContainer', 'Please verify you have selected the correct period end date.');
        ezUi.ezFadeIn('EzIntegrationExportTimeEntriesErrorContainer');
        return false;
    }

    var endDate = ezApi.ezclocker.ezDateTime.ezDateFromDatePicker(self.ezEndDatePickerId);
    if (endDate.isBefore(startDate)) {
        self.ezSetEndDate(startDate.add(14, 'days'));
        ezUi.ezHtml('EzIntegrationExportTimeEntriesErrorContainer', 'Please verify you have selected the correct period end date.');
        ezUi.ezFadeIn('EzIntegrationExportTimeEntriesErrorContainer');
        return false;
    }

    ezUi.ezHtml('EzIntegrationExportTimeEntriesErrorContainer', '');
    ezUi.ezHide('EzIntegrationExportTimeEntriesErrorContainer');
    return true;
};

/**
 * @public
 * Builds the export time entries api call url
 * @param {long} employerId
 * @param {string} integrationProviderId
 */
EzIntegrationExportController.prototype.buildExportTimeEntriesUrl = function(employerId, integrationProviderId) {
    return ezApi.buildApiPath([this.ezIntegrationsEndpoint, 'export/time-entries', employerId,
        integrationProviderId
    ]);
};

/**
 * @public
 * Executes the time entry export
 */
EzIntegrationExportController.prototype.ezSyncTimeEntries = function() {
    var payload = {
        startDateIso: ezApi.p.ezCreateFromValueInFormat(this.startDatePicker.val(), this.datePickerValueFormat)
            .toISOString(),
        endDateIso: ezApi.p.ezCreateFromValueInFormat(this.endDatePicker.val(), this.datePickerValueFormat).toISOString(),
        providerId: ezApi.s.ezIntegration.EzIntegrationProviderId.QUICKBOOKS_ONLINE,
        employerId: ezApi.s.ezEmployerService.primaryEmployer.id,
        userId: ezApi.s.ezEmployerService.primaryEmployer.userId,
        targetTimeZone: ezApi.getLocalTimeZoneId()
    };
    return ezApi.p.ezHttp.post(
        this.buildExportTimeEntriesUrl(
            ezApi.s.ezEmployerService.primaryEmployer.id,
            ezApi.s.ezIntegration.EzIntegrationProviderId.QUICKBOOKS_ONLINE
        ),
        payload
    );
};

/**
 * jQuery Injection of Instance
 */
document.addEventListener('onEzApiReady', function() {
    if (typeof ezApi === 'undefined' || !ezApi) {
        window.console.warn('EzApi is required for EzIntegrationExportController.js module');
    }

    ezApi.ezRegisterApi('ezIntegrationExportController', new EzIntegrationExportController());
    ezApi.ezclocker.ezIntegrationExportController.ezInit();
});

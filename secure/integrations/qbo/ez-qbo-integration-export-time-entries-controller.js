import {
    EzIntegrationProviderId
} from '../ez-integration-enums.js';

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
            toDate: null,
            ezProgressbar: null
        };
        this.ezIntegrationProviderId = 'EZ_INTEGRATION_QUICKBOOKS_ONLINE_PROVIDER';

        this.ezQBOContextId = ezApi.ezclocker.ezUrlHelper.getUrlParam('ez-context-id');
        this.ezInit();
    }
    /**
     * @protected
     * Initializes the quick filter UX
     */
    ezInitQuickFilterUx() {
        this.ezContext.ezFromDateInput = ezApi.ezId('EzIntegrationExportTimeEntriesStartDate').datepicker({
            dateFormat: 'mm/dd/yy',
            constrainInput: true,
            onClose: function() {
            }
        });

        this.ezContext.ezToDateInput = ezApi.ezId('EzIntegrationExportTimeEntriesEndDate').datepicker({
            dateFormat: 'mm/dd/yy',
            constrainInput: true,
            onClose: function() {
            }
        });


        this.ezContext.ezValidationError = ezApi.ez('_ezw_ExportTimeSheetToQBOValidationError');
        this.ezContext.ezProgressbar = ezApi.ez('EzWizardExportTimeEntriesProgressContainer');
    }
    /**
     * Initializes EzExportTimeEntriedsToIntegration
     *
     * @returns {EzExportTimeEntriesToIntegration}
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

        var currentDate = ezApi.p.ezDateTime.ezNow();
        try {
            this.ezContext.fromDate = ezApi.p.ezDateTime.ezCreateFromValue(this.ezContext.ezFromDateInput.val());
            this.ezContext.toDate = ezApi.p.ezDateTime.ezCreateFromValue(this.ezContext.ezToDateInput.val());
            if (this.ezContext.toDate.isBefore(this.ezContext.fromDate)) {
                this.ezShowValidationError('To date must fall after the from date.');
                return false;
            }
            if (this.ezContext.fromDate.isAfter(currentDate) || this.ezContext.toDate.isAfter(currentDate)) {
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
    checkForCompletion() {
        return ezApi.ezPromise(function(resolve) {
            setTimeout(resolve(), 10000);
        });
    }
    check(url) {
        var self = ezApi.ezclocker.ezExportTimeEntriesToIntegration;

        if (self.errorCode === 0) {
            return;
        } else {
            ezApi.ezclocker.logger.info('calling job service ' + url);
            ezApi.ezclocker.http.ezGet(url).then(
                function(response) {
                    alert(response.errorCode);
                    if (ezApi.isValid(response)) {
                        self.errorCode = response.errorCode;
                    }
                },
                function(eResponse) {
                    ezApi.ezclocker.logger.error('Failed to export employee time entries', eResponse);
                }
            );
            setTimeout(ezApi.ezclocker.ezExportTimeEntriesToIntegration.check(url), 1000); // check again in a second
        }
    }
    /**
     * @public
     * Posts a single employee integration mapping
     * @param {long} ezClockerEmployerId
     * @param {string} ezIntegrationProviderId
     * @param {long} ezClockerEmployeeId
     * @param {string} integrationEmployeeId
     * @param {string} integrationProviderId
     * @param {string} providerEmployeeName
     * @param {boolean} eiActive
     * @returns {Promise}
     */
    ezPostExportTimeEntries(integrationProviderId, ezContextId, fromDate, toDate) {
        var url = '/_api/v1/integrations/' + integrationProviderId + '/export/time-entries';

        return ezApi.ezclocker.http.ezPost(url, ezApi.ezToJson({
            endDateTimeIso: toDate,
            startDateTimeIso: fromDate,
            ezContextId: ezContextId,
            source: 'WEBSITE'
        }));
    }

    /**
     * @public
     * Saves the employee maps
     */
    ezExportTimeEntries() {
        var self = ezApi.ezclocker.ezExportTimeEntriesToIntegration;
        return ezApi.ezPromise(function(resolve) {
            function __EzHandleExportTimeEntriesSuccess(response) {
                ezApi.ezclocker.logger.info('Success exporting time entries');
                ezApi.ezclocker.logger.debug(ezApi.ezToJson(response));
                ezUi.ezStopPageWait();
                resolve(response);
            }

            function __EzHandleExportTimeEntriesFailure(eResponse) {
                ezApi.ezclocker.logger.error('Failed ExportTimeEntriesToIntegration' +
                    '. Error: ' + ezApi.ezToJson(eResponse));
                ezUi.ezStopPageWait();
                resolve(eResponse);
            }

            if (!self.ezValidateExportPeriod()) {
                return __EzHandleExportTimeEntriesFailure;
            }
            ezUi.ezStartPageWait('Exporting time entries...');
            ezApi.ezclocker.logger.info('calling export time entries');
            ezApi.ezclocker.ezExportTimeEntriesToIntegration.ezPostExportTimeEntries(
                self.ezIntegrationProviderId,
                self.ezQBOContextId,
                self.ezContext.fromDate,
                self.ezContext.toDate
            ).then(
                __EzHandleExportTimeEntriesSuccess,
                __EzHandleExportTimeEntriesFailure);
        });
    };
};

EzExportTimeEntriesToIntegration.ezApiName = 'ezExportTimeEntriesToIntegration';
document.addEventListener('onEzApiReady', () => {
    ezApi.ezRegisterNewApi(EzExportTimeEntriesToIntegration, EzExportTimeEntriesToIntegration.ezApiName);
});

export {
    EzExportTimeEntriesToIntegration
};
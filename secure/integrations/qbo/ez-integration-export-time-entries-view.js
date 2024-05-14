/**
 * @public
 * View for the copy schedule forward feature on the ezClocker website for employers.
 */
var EzIntegrationExportTimeEntriesView = function() {
    this.ready = false;
    this.parentContainerID = '_HideDialogsDiv';
    this.ezDialogTitle = 'Export Time Entries';
    this.ezDialogId = '_EzIntegrationExportTimeEntriesView';
    this.ezDialogButtonIds = {
        cancel: this.ezDialogId + '_Cancel',
        save: this.ezDialogId + '_Save'
    };
    this.ezDialogEventNames = {
        onShow: 'ezOn' + this.ezDialogId + 'ShowEvent',
        onClose: 'ezOn' + this.ezDialogId + 'CloseEvent',
        onSubmitSuccess: 'ezOn' + this.ezDialogId + 'SubmitSuccessEvent',
        onSubmitFailure: 'ezOn' + this.ezDialogId + 'SubmitFailureEvent'
    };
    return this;
};

/**
 * @protected
 * Initializes EzIntegrationExportTimeEntriesView
 */
EzIntegrationExportTimeEntriesView.prototype.ezInit = function() {
    var self = ezApi.ezSelf('ezIntegrationExportTimeEntriesView');

    self.ezInitUX();

    self.ready = true;
    return self;
};

/**
 * @protected
 * Initializes the EzIntegrationExportTimeEntriesView UX
 */
EzIntegrationExportTimeEntriesView.prototype.ezInitUX = function() {
    var self = ezApi.ezSelf('ezIntegrationExportTimeEntriesView');

    // Download an inject the dialog template
    var url = ezApi.ezclocker.nav.ezGetSecurePageUrl('integrations/qbo/ez-integration-export-time-entries-view.html');
    ezApi.ezclocker.http.ezGetFile(url).then(
        function(template) {
            ezUi.ezAppendContent(self.parentContainerID, template);
            ezApi.ezclocker.ezDialog.ezInitDialogWithConfig(self.ezDialogId, {
                dialogClass: ezApi.ezclocker.ezDialog.DEFAULTS.dialogClass,
                autoOpen: ezApi.ezclocker.ezDialog.DEFAULTS.autoOpen,
                closeOnEscape: ezApi.ezclocker.ezDialog.DEFAULTS.closeOnEscape,
                modal: ezApi.ezclocker.ezDialog.DEFAULTS.modal,
                show: ezApi.ezclocker.ezDialog.DEFAULTS.show,
                hide: ezApi.ezclocker.ezDialog.DEFAULTS.hide,
                width: 650,
                buttons: [
                    {
                        text: 'Cancel',
                        id: self.ezDialogId + '_Cancel',
                        click: self.ezClose
                    },
                    {
                        text: 'Export',
                        id: self.ezDialogId + '_Save',
                        click: self.ezSubmit
                    }
                ],
                title: self.ezDialogTitle
            });
        },
        function(eResponse) {
            ezApi.ezclocker.logger.error('Failed to download the Copy Schedule Forward feature\'s template. Response: ' +
                ezApi.ezToJson(eResponse));
        });
};

/**
 * @public
 * Shows the view to the user
 */
EzIntegrationExportTimeEntriesView.prototype.ezShow = function() {
    var self = ezApi.ezSelf('ezIntegrationExportTimeEntriesView');
    ezApi.ezclocker.ezExportTimeEntriesToIntegration.ezInit();

    self.visible = ezApi.ezclocker.ezDialog.ezShowDialogById(self.ezDialogId, self.ezDialogEventNames.onShow);
};

/**
 * @public
 * Closes the visible view
 */
EzIntegrationExportTimeEntriesView.prototype.ezClose = function() {
    var self = ezApi.ezSelf('ezIntegrationExportTimeEntriesView');
    self.visible = ezApi.ezclocker.ezDialog.ezCloseDialogById(self.ezDialogId, self.ezDialogEventNames.onClose);
};

/**
 * @public
 * Closes the visible view
 */
EzIntegrationExportTimeEntriesView.prototype.ezSubmit = function() {
    var self = ezApi.ezSelf('ezIntegrationExportTimeEntriesView');
    if (!ezApi.ezclocker.ezExportTimeEntriesToIntegration.ezValidateExportPeriod()) {
        return false;
    }
    ezUi.ezStartPageWait('Exporting Time Entries....');
    ezApi.ezclocker.ezExportTimeEntriesToIntegration.ezExportTimeEntries().then(
        function() {
            ezUi.ezStopPageWait();
            self.ezClose();
            ezApi.ezclocker.ezDialog.ezShowMessage(self.ezDialogTitle,
                'Successfully exported time entries');
        },
        function(eResponse, jqXHR) {
            ezUi.ezStopPageWait();
            ezApi.ezclocker.ezDialog.ezReportInternalBugDialog(jqXHR, self.ezDialogTitle,
                'Unable to export time entries at this time.', ezApi.ezToJson(eResponse));
        });
};

/**
 * ezApi Registration
 */
document.addEventListener('onEzApiReady', function() {
    if (ezApi === undefined || !ezApi) {
        window.console.error('EzApi is required in ez-integration-employee-linker.js module.');
        return;
    }
    ezApi.ezRegisterApi('ezIntegrationExportTimeEntriesView', new EzIntegrationExportTimeEntriesView()).ezInit();
});
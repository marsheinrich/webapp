/**
 * @public
 * View for the copy schedule forward feature on the ezClocker website for employers.
 */
var EzIntegrationEmployeeLinkerView = function() {
    this.ready = false;
    this.parentContainerID = '_HideDialogsDiv';
    this.ezDialogTitle = 'Map Employees';
    this.ezDialogId = '_EzIntegrationEmployeeLinkerView';
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
 * Initializes EzIntegrationEmployeeLinkerView
 */
EzIntegrationEmployeeLinkerView.prototype.ezInit = function() {
    var self = ezApi.ezSelf('ezIntegrationEmployeeLinkerView');

    self.ezInitUX();

    self.ready = true;
    return self;
};

/**
 * @protected
 * Initializes the EzIntegrationEmployeeLinkerView UX
 */
EzIntegrationEmployeeLinkerView.prototype.ezInitUX = function() {
    var self = ezApi.ezSelf('ezIntegrationEmployeeLinkerView');

    // Download an inject the dialog template
    ezApi.ezclocker.http.ezGetFile(
        ezApi.ezclocker.nav.getSecurePageUrl('integrations/qbo/ez-integration-employee-linker-view.html'))
        .then(function(template) {
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
                        text: 'Save',
                        id: self.ezDialogId + '_Save',
                        click: self.ezSubmit
                    }
                ],
                title: self.ezDialogTitle
            });
        },
        function(eResponse) {
            ezApi.ezclocker.logger.error(
                'Failed to download the Copy Schedule Forward feature\'s template. Response: ' +
                    ezApi.ezToJson(eResponse));
        });
};

/**
 * @public
 * Shows the view to the user
 */
EzIntegrationEmployeeLinkerView.prototype.ezShow = function() {
    var self = ezApi.ezSelf('ezIntegrationEmployeeLinkerView');
    ezApi.ezclocker.ezIntegrationEmployeeLinkerViewController.ezInit();

    self.visible = ezApi.ezclocker.ezDialog.ezShowDialogById(self.ezDialogId, self.ezDialogEventNames.onShow);
};

/**
 * @public
 * Closes the visible view
 */
EzIntegrationEmployeeLinkerView.prototype.ezClose = function() {
    var self = ezApi.ezSelf('ezIntegrationEmployeeLinkerView');
    self.visible = ezApi.ezclocker.ezDialog.ezCloseDialogById(self.ezDialogId, self.ezDialogEventNames.onClose);
};

/**
 * @public
 * Closes the visible view
 */
EzIntegrationEmployeeLinkerView.prototype.ezSubmit = function() {
    var self = ezApi.ezSelf('ezIntegrationEmployeeLinkerView');
    ezUi.ezStartPageWait('Saving Employee Maps....');
    ezApi.ezclocker.ezIntegrationEmployeeLinkerViewController.ezSaveEmployeeMaps().then(
        function() {
            ezUi.ezStopPageWait();
            self.ezClose();
            ezApi.ezclocker.ezDialog.ezShowMessage(self.ezDialogTitle,
                'Successfully saved employee maps.');
        },
        function(eResponse, jqXHR) {
            ezUi.ezStopPageWait();
            ezApi.ezclocker.ezDialog.ezReportInternalBugDialog(jqXHR, self.ezDialogTitle,
                'Unable to save employee mappings at this time.', ezApi.ezToJson(eResponse));
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
    ezApi.ezRegisterSecure('ezIntegrationEmployeeLinkerView', new EzIntegrationEmployeeLinkerView());
    ezApi.s.ezIntegrationEmployeeLinkerView.ezInit();
});
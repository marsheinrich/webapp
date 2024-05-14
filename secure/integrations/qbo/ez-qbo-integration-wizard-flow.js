/* exported EzQboIntegrationWizardFlow */

/**
 * @public
 * QBO Integration Wizard Flow Definition
 *
 * @returns {EzQboIntegrationWizardFlow}
 */
function EzQboIntegrationWizardFlow() {
    this.ezWizardFlowDataId = 'EzQboIntegrationWizardFlow';
    this.ezWizardCaption = 'ezClocker QuickBooks Online Integration';
    this.ezStartViewId = 'QBO_FIRSTTIME';
    this.ezErrorViewId = 'QBO_ERROR';

    this.pages = {
        QBO_FIRSTTIME: {
            contentSrc: ezApi.p.nav.getBaseUrl() + '/secure/integrations/qbo/ez-qbo-integration-first-time-view.html',
            content: null,
            pageId: 'QBO_FIRSTTIME',
            next: 'QBO_PREAUTH',
            previous: null,
            error: 'QBO_ERROR',
            canNext: true,
            canPrevious: false,
            canSave: false,
            canAuthorize: false,
            canExport: false,
            canClose: false,
            canCancel: true,
            onAuthorize: null,
            onSave: null,
            onExport: null,
            onCancel: null,
            onClose: null,
            onFinish: null,
            saveState: true
        },
        QBO_PREAUTH: {
            contentSrc: ezApi.p.nav.getBaseUrl() + '/secure/integrations/qbo/ez-qbo-integration-preauth-view.html',
            content: null,
            pageId: 'QBO_PREAUTH',
            next: 'QBO_AUTHENTICATED',
            previous: 'QBO_FIRSTTIME',
            error: 'QBO_ERROR',
            canNext: false,
            canPrevious: true,
            canSave: false,
            canAuthorize: true,
            canExport: false,
            canClose: false,
            canCancel: true,
            onAuthorize: function(eventData) {
                return ezApi.ezPromise(function(resolve) {

                    var authProviderId =
                        eventData.ezWizard.ezWizardContext.ezGetEzNovaAuthenticationProviderId();
                    eventData.ezWizard.ezClose(eventData.ezWizard.ezWizardId);
                    // Start the Qbo OAuth2 Process to authenticate
                    var connectUrl = ezApi.ezclocker.nav.getInternalApiUrl(
                        'integrations/oauth2/connect/' + authProviderId +
                        '?ez-context-id=' + eventData.ezWizard.ezWizardId, 'v1');

                    // Navigate to the oauth2 connect url
                    ezApi.ezclocker.nav.navigateTo(connectUrl);
                    return resolve(eventData);

                });
            },
            onSave: null,
            onExport: null,
            onCancel: null,
            onClose: null,
            onFinish: null,
            saveState: true
        },
        QBO_AUTHENTICATED: {
            contentSrc: ezApi.p.nav.getBaseUrl() + '/secure/integrations/qbo/ez-qbo-integration-authenticated-view.html',
            content: null,
            pageId: 'QBO_AUTHENTICATED',
            next: 'QBO_EMPLOYEE_LINK',
            previous: 'QBO_PREAUTH',
            error: 'QBO_ERROR',
            canNext: true,
            canPrevious: false,
            canSave: false,
            canAuthorize: false,
            canExport: false,
            canClose: false,
            canCancel: true,
            onAuthorize: null,
            onSave: null,
            onExport: null,
            onCancel: null,
            onClose: null,
            onFinish: null,
            saveState: true
        },
        QBO_EMPLOYEE_LINK: {
            contentSrc: ezApi.ezclocker.nav.getBaseUrl() + '/secure/integrations/qbo/ez-qbo-integration-employee-linker-view.html',
            content: null,
            pageId: 'QBO_EMPLOYEE_LINK',
            next: 'EXPORT_TIME_ENTRIES',
            previous: 'QBO_AUTHENTICATED',
            error: 'QBO_ERROR',
            canNext: false,
            canPrevious: true,
            canSave: true,
            canAuthorize: false,
            canExport: false,
            canClose: false,
            canCancel: true,
            onAuthorize: null,
            onSave: function(eventData) {
                return ezApi.ezPromise(function(resolve) {
                    ezApi.ezclocker.ezQboIntegrationEmployeeLinkerViewController.ezSaveEmployeeMaps().then(
                        function(response) {
                            if (ezApi.ezIsValid(response) && 0 !== response.errorCode) {
                                ezApi.ezclocker.logger.error('Failed to save employee mapping to due error: ' +
                                    ezApi.ezToJson(response));
                                eventData.ezWizard.ezError('ezClocker is unable to save the employee mapping at this time.' +
                                    'Error: ' + response.message).then(function() {
                                    return resolve(eventData);
                                });
                            }
                            ezApi.ezclocker.logger.info('Successfully saved QBO integration employee mapping.');
                            return resolve(eventData);
                        },
                        function(eResponse) {
                            ezApi.ezclocker.logger.error(
                                'Failed to save the wizard state during QBO_PREAUTH authorization handler. Error: ' +
                                ezApi.ezToJson(eResponse));
                        });
                });
            },
            onExport: null,
            onCancel: null,
            onClose: null,
            onFinish: null,
            saveState: true
        },
        EXPORT_TIME_ENTRIES: {
            contentSrc: ezApi.p.nav.getBaseUrl() + '/secure/integrations/qbo/ez-qbo-integration-export-time-entries-view.html',
            content: null,
            pageId: 'EXPORT_TIME_ENTRIES',
            next: 'QBO_EXPORT_COMPLETE',
            previous: 'QBO_EMPLOYEE_LINK',
            error: 'QBO_ERROR',
            canNext: false,
            canPrevious: true,
            canSave: false,
            canAuthorize: false,
            canExport: true,
            canClose: false,
            canCancel: true,
            onAuthorize: null,
            onSave: null,
            onExport: function(eventData) {
                return ezApi.ezPromise(function(resolve) {
                    ezApi.ezclocker.ezExportTimeEntriesToIntegration.ezExportTimeEntries().then(
                        function() {
                            ezApi.ezclocker.logger.info('Successfully saved QBO integration employee mapping.');
                            return resolve(eventData);
                        });
                });
            },
            onCancel: null,
            onClose: null,
            onFinish: null,
            saveState: false
        },
        QBO_EXPORT_COMPLETE: {
            contentSrc: ezApi.p.nav.getBaseUrl() + '/secure/integrations/qbo/ez-qbo-integration-export-complete-view.html',
            content: null,
            pageId: 'QBO_EXPORT_COMPLETE',
            next: null,
            previous: 'EXPORT_TIME_ENTRIES',
            error: 'QBO_ERROR',
            canNext: false,
            canPrevious: false,
            canSave: false,
            canAuthorize: false,
            canExport: false,
            canClose: true,
            canCancel: false,
            onAuthorize: null,
            onSave: null,
            onExport: null,
            onCancel: null,
            onClose: null,
            onFinish: null,
            saveState: false
        },
        QBO_ERROR: {
            contentSrc: ezApi.p.nav.getBaseUrl() + '/secure/integrations/qbo/ez-qbo-integration-error-view.html',
            content: null,
            pageId: 'QBO_ERROR',
            next: null,
            previous: null,
            error: 'QBO_ERROR',
            canNext: false,
            canPrevious: false,
            canSave: false,
            canAuthorize: false,
            canExport: true,
            canClose: true,
            canCancel: true,
            onAuthorize: null,
            onSave: null,
            onExport: null,
            onCancel: null,
            onClose: null,
            onFinish: null,
            saveState: false
        }
    };

    this.ready = true;
    return this;
}

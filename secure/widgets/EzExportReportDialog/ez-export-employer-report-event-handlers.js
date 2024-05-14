import { EzExportAction } from '/secure/widgets/EzExportReportDialog/EzExportAction.js';

/**
 * Handles events for employer export reports.
 */
class EzExportEmployerReportEventHandlers {
    /**
     * Handles the selected employee tab click
     * 
     * Use event.currentTarget to reference the button that was clicked
     */
    handleShowSelectEmployeeTabClick(event) {
        let self = ezApi.ezclocker.ezwEmployerExportTimeSheetDialog;

        if (ezApi.ezIsTrue(ezUi.ezGetElementDataAttributeValue(event.currentTarget, 'active'))) {
            // Already active.
            return;
        }

        self.exportActionContext = {
            action: EzExportAction.EXPORT_SELECTED_EMPLOYEE
        };
        
        self.activeExportMode = EzExportAction.EXPORT_SELECTED_EMPLOYEE;
        ezApi.ezclocker.ezwEmployerExportTimeSheetDialog.ezActivateTab(event.currentTarget.id);
        
        self.ezEnableDailyTotalsOption();
        
        ezApi.ezclocker.ezUi.ezShowElement('EzEmployerExportTimeSheetDialog_TimeFormatTable');
        ezApi.ezclocker.ezUi.ezEnable('_ExportBtn');
    }

    /**
     * Handles the All Employees tab click
     * 
     * Use event.currentTarget to reference the button that was clicked
     */
    handleShowAllEmployeesTabClick(event) {
        let self = ezApi.ezclocker.ezwEmployerExportTimeSheetDialog;

        if (ezApi.ezIsTrue(ezUi.ezGetElementDataAttributeValue(event.currentTarget, 'active'))) {
            // Already active.
            return;
        }

        self.exportActionContext = {
            action: EzExportAction.EXPORT_ALL_EMPLOYEES
        };
                
        self.activeExportMode = EzExportAction.EXPORT_ALL_EMPLOYEES;
        
        self.ezEnableDailyTotalsOption();
        
        ezApi.ezclocker.ezwEmployerExportTimeSheetDialog.ezActivateTab(event.currentTarget.id);
        ezUi.ezShowElement('EzEmployerExportTimeSheetDialog_TimeFormatTable');
        ezUi.ezEnable('_ExportBtn');
    }

    /**
     * Handles the Jobs tab click
     * 
     * Use event.currentTarget to reference the button that was clicked
     */
    handleShowJobsClick(event) {
        let self = ezApi.ezclocker.ezwEmployerExportTimeSheetDialog;

        if (ezApi.ezIsTrue(ezUi.ezGetElementDataAttributeValue(event.currentTarget, 'active'))) {
            // Already active.
            return;
        }

        self.exportActionContext = {
            action: EzExportAction.EXPORT_JOBS
        };

        self.activeExportMode = EzExportAction.EXPORT_JOBS;

        ezApi.ezclocker.ezwEmployerExportTimeSheetDialog.ezActivateTab(event.currentTarget.id);
        
        self.ezEnableDailyTotalsOption();
        
        ezUi.ezShowElement('EzEmployerExportTimeSheetDialog_TimeFormatTable');
        ezUi.ezEnable('_ExportBtn');
    }

    /**
        @public
        Handles the Integrations tab click
        Use event.currentTarget to reference the button that was clicked
     */
    handleIntegrationsClick(event) {
        let self = ezApi.ezclocker.ezwEmployerExportTimeSheetDialog;

        if (ezApi.ezIsTrue(ezUi.ezGetElementDataAttributeValue(event.currentTarget, 'active'))) {
            // Already active.
            return;
        }
        
        let tabId = event.currentTarget.id;
        self.exportActionContext = {
            action: EzExportAction.EXPORT_INTEGRATION
        };
        self.activeExportMode = EzExportAction.EXPORT_INTEGRATION;

        ezApi.ezclocker.ezwEmployerExportTimeSheetDialog.ezActivateTab(tabId);
        
        self.ezEnableDailyTotalsOption();
        
        if (ezApi.ezIsTrue(self.ezHasIntegrations)) {
            ezUi.ezHideElement('EzIntegrationAbsent');
            ezUi.ezShowElement('EzIntegrationPresent');
            ezUi.ezEnableElement('_ExportBtn');
        } else {
            ezUi.ezShowElement('EzIntegrationAbsent');
            ezUi.ezHideElement('EzIntegrationPresent');
            ezUi.ezDisableElement('_ExportBtn');
        }
    }
}

EzExportEmployerReportEventHandlers.ezApiName = 'ezExportEmployerReportEventHandlers';

export {
    EzExportEmployerReportEventHandlers
};
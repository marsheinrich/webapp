// import { EzEmployerService } from '/secure/javascript/common/ezclocker-employer-services.js';

import { EzIntegrationProviderId } from '/secure/integrations/ez-integration-enums.js';

class EzQboSyncController {
    /**
        @public @constructor
        @param {object} startDate
        moment instance
        @param {object} endDate
        moment instance
        @returns {EzQboSyncController}
     */
    constructor(startDatePickerId, endDatePickerId, startDate, endDate) {
        this.ready = false;
        this.datePickerValueFormat = 'MM/DD/YYYY';
        this.ezIntegrationsEndpoint = ezApi.p.nav.getInternalApiServiceUrl('integrations', 'v1');

        this.ezStartDatePickerId = ezApi.ezIsEmptyString(startDatePickerId) ? 'EzExportTimeSheetToQboStartDate' : startDatePickerId;
        this.ezEndDatePickerId = ezApi.ezIsEmptyString(endDatePickerId) ? 'EzExportTimeSheetToQboEndDate' : endDatePickerId;

        startDate = ezApi.ezIsValid(startDate) ? startDate : ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay();
        this.startDatePicker = ezUi.ezId(this.ezStartDatePickerId).datepicker({
            dateFormat: 'mm/dd/yy',
            showButtonPanel: true,
            buttonText: 'Select date...',
            constrainInput: true,
            showOn: 'button',
            onchange: this.ezValidateExportRange
        });
        ezApi.ezclocker.ezDateTime.ezSetDatePickerValue(this.ezStartDatePickerId, startDate);

        endDate = ezApi.ezIsValid(endDate) ? endDate : ezApi.ezclocker.ezDateTime.ezNowWithEndOfDay().add(14, 'days');
        this.endDatePicker = ezUi.ezId(this.ezEndDatePickerId).datepicker({
            dateFormat: 'mm/dd/yy',
            showButtonPanel: true,
            buttonText: 'Select date...',
            constrainInput: true,
            showOn: 'button',
            onchange: this.ezValidateExportRange
        });
        ezApi.ezclocker.ezDateTime.ezSetDatePickerValue(this.ezEndDatePickerId, endDate);

        return this;
    }

    /**
     * @public
     * Initializes  EzQboSyncController
     * @returns {EzQboSyncController}
     */
    ezInit() {
        return EzQboSyncController.ezInstance;
    }

    /**
     * @public
     * Sets the start date
     * @param {object} startDate
     * momentjs instance
     */
    ezSetStartDate(startDate) {
        if (ezApi.isObject(startDate)) {
            ezApi.p.logger.error('Provided start date ' + {} + ' is not valid.');
        }
        this.startDatePicker.datepicker('setDate', startDate.toDate());
    }

    /**
     * @public
     * Sets the end date
     * @param {object} endDate
     * momentjs instance
     */
    ezSetEndDate(endDate) {
        this.endDatePicker.datepicker('setDate', endDate.toDate());
    }

    /**
     * @public
     *  Validates the date range selections
     */
    ezValidateExportRange() {
        let startDateVal = this.startDatePicker.val();
        if (ezApi.isEmptyString(startDateVal)) {
            return ezApi.p.ezDateTime.ezNow();
        }
        let startDate = ezApi.p.ezCreateFromValueInFormat(startDateVal, this.datePickerValueFormat);

        let endDateVal = this.endDatePicker.val();
        if (ezApi.isEmptyString(endDateVal)) {
            this.ezSetEndDate(startDate);
        }
        let endDate = ezApi.p.ezCreateFromValueInFormat(endDateVal, this.datePickerValueFormat);
        if (endDate.isBefore(startDate)) {
            this.ezSetEndDate(startDate.add(1, 'days'));
        }

        return true;
    }

    /**
     * @public
     * Builds the export time entries api call url
     * @param {long} employerId
     * @param {string} integrationProviderId
     */
    buildExportTimeEntriesUrl(employerId, integrationProviderId) {
        return ezApi.buildApiPath([this.ezIntegrationsEndpoint, 'export/time-entries', employerId,
            integrationProviderId
        ]);
    }

    /**
     * @public
     * Executes the time entry export
     */
    ezSyncTimeEntries() {
        let payload = {
            startDateIso: ezApi.p.ezCreateFromValueInFormat(this.startDatePicker.val(), this.datePickerValueFormat)
                .toISOString(),
            endDateIso: ezApi.p.ezCreateFromValueInFormat(this.endDatePicker.val(), this.datePickerValueFormat).toISOString(),
            providerId: EzIntegrationProviderId.EZ_INTEGRATION_QUICKBOOKS_ONLINE_PROVIDER,
            employerId: ezApi.s.ezEmployerService.primaryEmployer.id,
            userId: ezApi.s.ezEmployerService.primaryEmployer.userId,
            targetTimeZone: ezApi.getLocalTimeZoneId()
        };
        return ezApi.p.ezHttp.post(
            this.buildExportTimeEntriesUrl(
                ezApi.s.ezEmployerService.primaryEmployer.id,
                EzIntegrationProviderId.EZ_INTEGRATION_QUICKBOOKS_ONLINE_PROVIDER
            ),
            payload
        );
    }
}

export {
    EzQboSyncController
};
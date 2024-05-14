import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzIntegrationProviderId } from '/secure/integrations/ez-integration-enums.js';
import { EzReportFormat } from '/secure/widgets/EzExportReportDialog/EzReportFormat.js';
import { EzReportProviderType } from '/secure/widgets/EzExportReportDialog/EzReportProviderType.js';

/*
    @public
    Available employer report export methods
 */
class EzEmployerReports {
    /**
        Exports the time sheet for the selected employee
        Example download url generated:
            http://localhost:8080/_api/v1/reports/csv/employee/{employee_id}/time-entries
                ?startDateTimeIso8601={encoded_iso_date: 2021-07-05T00%3A00%3A00-05%3A00}
                &endDateTimeIso8601={encoded_iso_date: 2021-07-18T23%3A59%3A59-05%3A00}
                &timeZoneId={encoded_timezone_id: America%2FChicago}
        @param {string} reportFormat
        @param {number} employerId
        @param {number} employeeId
        @param {moment} startMoment
        @param {moment} endMoment
        @param {string} timeZoneId
        @returns {Promise.resolve}
        Resolve returns the report download url
     */
    exportTimeSheetForEmployee(reportFormat, employerId, employeeId, startMoment, endMoment, timeZoneId) {
        if (!ezApi.ezStringHasLength(reportFormat)) {
            throw new EzBadParamException(
                'reportFormat',
                EzEmployerReports,
                EzEmployerReports.exportTimeSheetForEmployee);
        }
        if (!ezApi.ezIsNumber(employerId)) {
            employerId = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().id;
            if (!ezApi.ezIsNumber(employerId)) {
                throw new EzBadParamException(
                    'employerId',
                    EzEmployerReports,
                    EzEmployerReports.exportTimeSheetForEmployee);
            }
        }
        if (!ezApi.ezIsValid(employeeId)) {
            employeeId = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().id;
            if (!ezApi.ezIsNumber(employeeId)) {
                throw new EzBadParamException(
                    'employeeId',
                    EzEmployerReports,
                    EzEmployerReports.exportTimeSheetForEmployee);
            }
        }
        if (!ezApi.ezclocker.ezDateTime.ezIsValidMoment(startMoment)) {
            throw new EzBadParamException(
                'startMoment',
                EzEmployerReports,
                EzEmployerReports.exportTimeSheetForEmployee);
        }
        if (!ezApi.ezclocker.ezDateTime.ezIsValidMoment(endMoment)) {
            throw new EzBadParamException(
                'endMoment',
                EzEmployerReports,
                EzEmployerReports.exportTimeSheetForEmployee);
        }

        return ezApi.ezAsyncAction(
            (finished) => ezApi.ezclocker.ezwEmployerExportTimeSheetDialog.ezSaveEmployerReportOptions()
                .then(
                    () => {
                        if (EzReportFormat.UNKNOWN === reportFormat) {
                            reportFormat = EzReportFormat.CSV;
                        }

                        if (!ezApi.ezStringHasLength(timeZoneId)) {
                            timeZoneId = ezApi.ezclocker.ezDateTime.activeTimeZone;
                        }

                        let periodStartDateTimeIso = ezApi.ezclocker.ezDateTime.ezToIso(
                            ezApi.ezclocker.ezDateTime.ezSetMomentStartOfDay(startMoment));

                        let periodEndDateTimeIso = ezApi.ezclocker.ezDateTime.ezToIso(
                            ezApi.ezclocker.ezDateTime.ezSetMomentEndOfDay(endMoment));

                        /* Not yet used in the service call
                        let totalsAsDecimal = ezApi.ezIsTrue(ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EzReportWithDecimalTotals'));

                        let use24HourTime = ezApi.ezIsTrue(ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EzReportWith24hrTime'));

                        let outputDayTotals = ezApi.ezIsTrue(ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EzReportWithDailyTotals'));
                        */

                        ezApi.ezclocker.ezwEmployerExportTimeSheetDialog.ezClose();

                        // V1 report service
                        let reportDownloadUrl = ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                            ezApi.ezUrlTemplate`reports/
                                employee/${ezApi.ezEncode(employeeId)}
                                /time-entries/${reportFormat}
                                ?period-start-iso=${ezApi.ezEncode(periodStartDateTimeIso)}
                                &period-end-iso=${ezApi.ezEncode(periodEndDateTimeIso)}
                                &target-time-zone-id=${ezApi.ezEncode(timeZoneId)}`,
                            'v1');

                        ezApi.ezclocker.ezReportDownloadDialog.ezShow(reportDownloadUrl);

                        return finished(reportDownloadUrl);
                    }));
    }

    /**
        Exports a time sheet for all the employer's employees
        @param {string} reportId
        @param {string} reportFormat
        @param {number} employerId
        @param {moment} startMoment
        @param {moment} endMoment
        @param {string} timeZoneId
        @returns {Promise.resolve}
        Resolve returns the report download url
     */
    exportTimeSheetForAllEmployees(reportId, reportFormat, employerId, startMoment, endMoment, timeZoneId) {
        if (!ezApi.ezStringHasLength(reportId)) {
            throw new EzBadParamException(
                'reportId',
                EzEmployerReports,
                EzEmployerReports.exportTimeSheetForAllEmployees);
        }
        if (!ezApi.ezStringHasLength(reportFormat)) {
            throw new EzBadParamException(
                'reportFormat',
                EzEmployerReports,
                EzEmployerReports.exportTimeSheetForAllEmployees);
        }
        if (!ezApi.ezIsNumber(employerId)) {
            employerId = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().id;
            if (!ezApi.ezIsNumber(employerId)) {
                throw new EzBadParamException(
                    'employerId',
                    EzEmployerReports,
                    EzEmployerReports.exportTimeSheetForAllEmployees);
            }
        }
        if (!ezApi.ezclocker.ezDateTime.ezIsValidMoment(startMoment)) {
            throw new EzBadParamException(
                'startMoment',
                EzEmployerReports,
                EzEmployerReports.exportTimeSheetForAllEmployees);
        }
        if (!ezApi.ezclocker.ezDateTime.ezIsValidMoment(endMoment)) {
            throw new EzBadParamException(
                'endMoment',
                EzEmployerReports,
                EzEmployerReports.exportTimeSheetForAllEmployees);
        }

        return ezApi.ezAsyncAction(
            (finished) => ezApi.ezclocker.ezwEmployerExportTimeSheetDialog.ezSaveEmployerReportOptions()
                .then(
                    () => {
                        if (EzReportFormat.UNKNOWN === reportFormat) {
                            reportFormat = EzReportFormat.CSV;
                        }

                        if (!ezApi.ezStringHasLength(timeZoneId)) {
                            timeZoneId = ezApi.ezclocker.ezDateTime.activeTimeZone;
                        }

                        let periodStartDateTime = ezApi.ezclocker.ezDateTime.ezToIso(
                            ezApi.ezclocker.ezDateTime.ezSetMomentStartOfDay(startMoment));

                        let periodEndDateTime = ezApi.ezclocker.ezDateTime.ezToIso(
                            ezApi.ezclocker.ezDateTime.ezSetMomentEndOfDay(endMoment));

                        let totalsAsDecimal = ezApi.ezIsTrue(ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EzReportWithDecimalTotals'));

                        let use24HourTime = ezApi.ezIsTrue(ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EzReportWith24hrTime'));

                        let outputDayTotals = ezApi.ezIsTrue(ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EzReportWithDailyTotals'));
;
                        // V1 report service
                        let downloadReportUrl = ezApi.ezclocker.nav.getInternalApiUrl(
                            ezApi.ezUrlTemplate`reports/
                                ${ezApi.ezEncode(reportId)}
                                ?report-format=${ezApi.ezEncode(reportFormat)}
                                &start-date=${ezApi.ezEncode(periodStartDateTime)}
                                &end-date=${ezApi.ezEncode(periodEndDateTime)}
                                &output-day-totals=${outputDayTotals}
                                &totals-as-decimal=${totalsAsDecimal}
                                &use-24hour-time=${use24HourTime}
                                &target-time-zone-id=${ezApi.ezEncode(timeZoneId)}`,
                            'v1');

                        ezApi.ezclocker.ezwEmployerExportTimeSheetDialog.ezClose();

                        ezApi.ezclocker.ezReportDownloadDialog.ezShow(downloadReportUrl);

                        return finished(downloadReportUrl);
                    }));
    }

    /**
        @public
        Export all empoyee time period by employee then job
        Example download url:
            http://localhost:8080/_api/v2/reports/AllEmployeesTimePeriodReportyByEmployeeThenJob/CSV
                ?periodStartDateTimeIso={encoded_start_iso: 2021-07-05T00%3A00%3A00%252B02%3A00}
                &periodEndDateTimeIso={encoded_end_iso: 2021-07-19T23%3A59%3A59%252B02%3A00}
                &includeJobs={boolean_value}
                &totalInDecimalFormat={boolean_value}
                &timeIn24HourFormat={boolean_value}
                &targetTimeZone={encoded_timezone_id: Africa%2FCairo}
        @param {reportFormat}
        @param {moment} startMoment
        @param {moment} endMoment
        @param {string} timeZoneId
        @param {string} inputReportProviderId
        @param {boolean|null|undefined} useDecimalTotals
        Default is false
        NOTE: If useDecimalTotals is null or undefined the code will attempt to discover the value from
        ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EzReportWithDecimalTotals').
        @deprecated
        The fall back operation of setting useDecimalTotals value from the UI checkbox checked state
        is temporary and will be removed in a future release.
        @param {boolean|null|undefined} use24HourTime
        Default is false
        NOTE: If use24HourTime is null or undefined the code will attempt to discover the value from
        ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EzReportWith24hrTime').
        @param {boolean|null|undefined} outputDayTotals
        Default is true
        NOTE: If outputDayTotals is null or undefined the code will attempt to discover the value from
        ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EzReportWithDailyTotals').
     */
    exportAllEmployeeTimePeriodSummaryReport(reportFormat, startMoment, endMoment, timeZoneId,
        inputReportProviderId, useDecimalTotals, use24HourTime, outputDayTotals) {
        if (!ezApi.ezStringHasLength(reportFormat)) {
            throw new EzBadParamException(
                'reportFormat',
                EzEmployerReports,
                EzEmployerReports.exportAllEmployeeTimePeriodByEmployeeThenJobOrSummary);
        }
        if (!ezApi.ezIsValid(startMoment)) {
            throw new EzBadParamException(
                'startMoment',
                EzEmployerReports,
                EzEmployerReports.exportAllEmployeeTimePeriodByEmployeeThenJobOrSummary);
        }
        if (!ezApi.ezIsValid(endMoment)) {
            throw new EzBadParamException(
                'endMoment',
                EzEmployerReports,
                EzEmployerReports.exportAllEmployeeTimePeriodByEmployeeThenJobOrSummary);
        }

        return ezApi.ezAsyncAction(
            (finished) => ezApi.ezclocker.ezwEmployerExportTimeSheetDialog.ezSaveEmployerReportOptions()
                .then(
                    () => {
                        if (EzReportFormat.UNKNOWN === reportFormat) {
                            reportFormat = EzReportFormat.CSV;
                        }

                        if (!ezApi.ezStringHasLength(timeZoneId)) {
                            timeZoneId = ezApi.ezclocker.ezDateTime.activeTimeZone;
                        }

                        let periodStartDateTime = ezApi.ezclocker.ezDateTime.ezToIso(startMoment.startOf('day'));

                        let periodEndDateTime = ezApi.ezclocker.ezDateTime.ezToIso(endMoment.endOf('day'));

                        // Warning: Obtaining the useDecimalTotals value from the UI checkbox is deprecated
                        // and will get removed in a future release.
                        useDecimalTotals = ezApi.ezIsBoolean(useDecimalTotals)
                            ? ezApi.ezIsTrue(useDecimalTotals)
                            : ezApi.ezIsTrue(ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EzReportWithDecimalTotals'));

                        // Warning: Obtaining the use2rHourTime value from the UI checkbox is deprecated
                        // and will get removed in a future release.
                        use24HourTime = ezApi.ezIsBoolean(use24HourTime)
                            ? ezApi.ezIsTrue(use24HourTime)
                            : ezApi.ezIsTrue(ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EzReportWith24hrTime'));

                        // Warning: Obtaining the useDayTotals value from the UI checkbox is deprecated
                        // and will get removed in a future release.
                        outputDayTotals = ezApi.ezIsBoolean(outputDayTotals)
                            ? ezApi.ezIsTrue(outputDayTotals)
                            : ezApi.ezIsTrue(ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EzReportWithDailyTotals'));

                        let reportProviderId = inputReportProviderId ||
                            EzReportProviderType.ALL_EMPLOYEES_TIME_PERIOD_REPORT_BY_EMPLOYEE_THEN_JOB;

                        // V2 Report Service
                        let downloadReportUrl = ezApi.ezclocker.nav.getInternalApiUrl(
                            ezApi.ezUrlTemplate`reports/
                                ${ezApi.ezEncode(reportProviderId)}/
                                ${ezApi.ezEncode(reportFormat)}
                                ?period-start-date-iso=${ezApi.ezEncode(periodStartDateTime)}
                                &period-end-date-iso=${ezApi.ezEncode(periodEndDateTime)}
                                &include-jobs=true
                                &output-day-totals=${outputDayTotals}
                                &totals-as-decimal=${useDecimalTotals}
                                &use-24hour-time=${use24HourTime}
                                &target-time-zone-id=${ezApi.ezEncode(timeZoneId)}`,
                            'v2');

                        ezApi.ezclocker.ezwEmployerExportTimeSheetDialog.ezClose();

                        ezApi.ezclocker.ezReportDownloadDialog.ezShow(downloadReportUrl);

                        return finished(downloadReportUrl);
                    }));
    }

    /**
        @public
        Exports the Jobs report
        @param {string} reportId
        @param {string} reportFormat
        @param {number} employerId
        @param {moment} startMoment
        @param {moment} endMoment
        @param {string} timeZoneId
        @returns {Promise.resolve}
        Resolve returns the download report url
     */
    exportJobs(reportId, reportFormat, employerId, startMoment, endMoment, timeZoneId) {
        if (!ezApi.ezStringHasLength(reportId)) {
            throw new EzBadParamException(
                'reportId',
                EzEmployerReports,
                EzEmployerReports.exportJobs);
        }
        if (!ezApi.ezIsValid(reportFormat)) {
            throw new EzBadParamException(
                'reportFormat',
                EzEmployerReports,
                EzEmployerReports.exportJobs);
        }
        if (!ezApi.ezIsValid(employerId)) {
            employerId = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccount().id;
            if (!ezApi.ezIsValid(employerId)) {
                throw new EzBadParamException(
                    'employerId',
                    EzEmployerReports,
                    EzEmployerReports.exportJobs);
            }
        }
        if (!ezApi.ezIsValid(startMoment)) {
            throw new EzBadParamException(
                'startMoment',
                EzEmployerReports,
                EzEmployerReports.exportJobs);
        }
        if (!ezApi.ezIsValid(endMoment)) {
            throw new EzBadParamException(
                'endMoment',
                EzEmployerReports,
                EzEmployerReports.exportJobs);
        }

        return ezApi.ezAsyncAction(
            (finished) => ezApi.ezclocker.ezwEmployerExportTimeSheetDialog.ezSaveEmployerReportOptions()
                .then(
                    () => {
                        if (EzReportFormat.UNKNOWN === reportFormat) {
                            reportFormat = EzReportFormat.CSV;
                        }

                        if (!ezApi.ezStringHasLength(timeZoneId)) {
                            timeZoneId = ezApi.ezclocker.ezDateTime.activeTimeZone;
                        }

                        let periodStartDateTime = ezApi.ezclocker.ezDateTime.ezToIso(startMoment.startOf('day'));

                        let periodEndDateTime = ezApi.ezclocker.ezDateTime.ezToIso(endMoment.endOf('day'));

                        let useDecimalTotals = ezApi.ezIsTrue(ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EzReportWithDecimalTotals'));

                        let use24HourTime = ezApi.ezIsTrue(ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EzReportWith24hrTime'));

                        let outputDayTotals = ezApi.ezIsTrue(ezApi.ezclocker.ezUi.ezIsCheckBoxChecked('EzReportWithDailyTotals'));

                        let groupByDate = ezApi.ezIsTrue(
                            ezApi.ezclocker.ezUi.ezIsRadioBoxChecked(
                                ezApi.ezclocker.ezwEmployerExportTimeSheetDialog.ezIds.inputs.jobReportGroupByDateRadioBoxId));

                        let groupByEmployee = ezApi.ezIsTrue(
                            ezApi.ezclocker.ezUi.ezIsRadioBoxChecked(
                                ezApi.ezclocker.ezwEmployerExportTimeSheetDialog.ezIds.inputs.jobReportGroupByEmployeeRadioBoxId));

                        let fileNameSelectedPeriod =
                            `${ezApi.ezclocker.ezDateTime.ezDateString(startMoment)}-${ezApi.ezclocker.ezDateTime.ezDateString(endMoment)}`;

                        let fileName = 'job_report';

                        if (groupByDate) {
                            fileName = `${fileName}_grouped_by_date_${fileNameSelectedPeriod}`;
                        } else if (groupByEmployee) {
                            fileName =`${fileName}_grouped_by_employee_${fileNameSelectedPeriod}`;
                        } else {
                            fileName = `${fileName}_${fileNameSelectedPeriod}`;
                        }

                        // V1 Report Service
                        let downloadUrl = ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                            ezApi.ezUrlTemplate`reports/
                                ${reportId}
                                ?employerId=${employerId}
                                &report-format=${reportFormat}
                                &start-date=${ezApi.ezEncode(periodStartDateTime)}
                                &end-date=${ezApi.ezEncode(periodEndDateTime)}
                                &order-by-job=true
                                &order-by-day=${groupByDate}
                                &order-by-employee=${groupByEmployee}
                                &totals-as-decimal=${useDecimalTotals}
                                &output-day-totals=${outputDayTotals}
                                &use-24hour-time=${use24HourTime}
                                &filename=${ezApi.ezEncode(fileName)}
                                &target-time-zone-id=${ezApi.ezEncode(timeZoneId)}`,
                            'v1');

                        ezApi.ezclocker.ezwEmployerExportTimeSheetDialog.ezClose();

                        ezApi.ezclocker.ezReportDownloadDialog.ezShow(downloadUrl);

                        return finished(downloadUrl);
                    }));
    }

    /**
        @public
        Exports the Time entries to Integration
        @param {moment} startMoment
        @param {moment} endMoment
     */
    ezExportIntegration(startMoment, endMoment) {
        if (!ezApi.ezIsValid(startMoment)) {
            throw new EzBadParamException(
                'startMoment',
                EzEmployerReports,
                EzEmployerReports.ezExportIntegration);
        }
        if (!ezApi.ezIsValid(endMoment)) {
            throw new EzBadParamException(
                'endMoment',
                EzEmployerReports,
                EzEmployerReports.ezExportIntegration);
        }

        return ezApi.ezclocker.ezUi.ezStartPageWaitExecute(
            'Exporting Time Entries ...',
            (waitDone) => ezApi.ezclocker.ezExportTimeEntriesToIntegration.ezPostExportTimeEntries(
                'EZ_INTEGRATION_QUICKBOOKS_ONLINE_PROVIDER',
                'TIME_ENTRY',
                startMoment,
                endMoment)
                .then(
                    () => waitDone()
                        .then(
                            () =>
                                ezApi.ezclocker.ezDialog.ezShowMessage(
                                    ezApi.ezclocker.ezwEmployerExportTimeSheetDialog.ezDialogTitle,
                                    'Time entries exported with success.')),
                    (eResponse, jqXHR) => waitDone()
                        .then(
                            () => {
                                ezApi.ezclocker.ezLogger.error(
                                    `Failed ExportTimeEntriesToIntegration. Error: ${ezApi.ezToJson(eResponse)}`);

                                return ezApi.ezclocker.ezDialog.ezReportInternalBugDialog(
                                    jqXHR,
                                    ezApi.ezclocker.ezwEmployerExportTimeSheetDialog.ezDialogTitle,
                                    'Unable to export time entries at this time.',
                                    ezApi.ezToJson(eResponse));
                            })));
    }

    /**
        @public
        Exports the Time entries to Integration
        @param {string} ezIntegrationProviderId // EzIntegrationProviderId
        @param {moment} startMoment
        @param {moment} endMoment
     */
    ezExportIntegrationFile(ezIntegrationProviderId, startMoment, endMoment) {
        if (!ezApi.ezIsValid(ezIntegrationProviderId) || EzIntegrationProviderId.UNKNOWN === ezIntegrationProviderId) {
            throw new EzBadParamException(
                'ezIntegrationProviderId',
                EzEmployerReports,
                EzEmployerReports.ezExportIntegrationFile);
        }
        if (!ezApi.ezIsValid(startMoment)) {
            throw new EzBadParamException(
                'startMoment',
                EzEmployerReports,
                EzEmployerReports.ezExportIntegrationFile);
        }
        if (!ezApi.ezIsValid(endMoment)) {
            throw new EzBadParamException(
                'endMoment',
                EzEmployerReports,
                EzEmployerReports.ezExportIntegrationFile);
        }

        return ezApi.ezclocker.ezUi.ezStartPageWaitExecute(
            ezApi.ezMsg`
                Creating export for integration
                ${EzIntegrationProviderId.ezToDisplayValue(ezIntegrationProviderId)} ...`,
            (waitDone) => ezApi.ezclocker.ezwEmployerExportTimeSheetDialog.ezSaveEmployerReportOptions()
                .then(
                    () => {
                        let periodStartIso = ezApi.ezclocker.ezDateTime.ezToIso(startMoment);

                        let periodEndIso = ezApi.ezclocker.ezDateTime.ezToIso(endMoment);

                        // V1 Integrations Service
                        let downloadExportFileUrl = ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                            ezApi.ezUrlTemplate`integrations/
                                ${ezApi.ezEncode(ezIntegrationProviderId)}/export/integration
                                ?context=${ezApi.ezEncode('TIME_ENTRY')}
                                &period-start-iso=${ezApi.ezEncode(periodStartIso)}
                                &period-end-iso=${ezApi.ezEncode(periodEndIso)}
                                &time-zone-id=${ezApi.ezEncode(ezApi.ezclocker.ezDateTime.activeTimeZone)}`,
                            'v1');

                        ezApi.ezclocker.ezwEmployerExportTimeSheetDialog.ezClose();

                        ezApi.ezclocker.ezReportDownloadDialog.ezShow(downloadExportFileUrl);

                        return waitDone();
                    }));
    }
	
	
    /*
        Exports the Time entries to Integration directly (eg QBO's API).
     */
    ezExportIntegrationDirect(ezIntegrationProviderId, startMoment, endMoment) {
        if (!ezApi.ezIsValid(ezIntegrationProviderId) || EzIntegrationProviderId.UNKNOWN === ezIntegrationProviderId) {
            throw new EzBadParamException(
                'ezIntegrationProviderId',
                EzEmployerReports,
                EzEmployerReports.ezExportIntegrationFile);
        }
        if (!ezApi.ezIsValid(startMoment)) {
            throw new EzBadParamException(
                'startMoment',
                EzEmployerReports,
                EzEmployerReports.ezExportIntegrationFile);
        }
        if (!ezApi.ezIsValid(endMoment)) {
            throw new EzBadParamException(
                'endMoment',
                EzEmployerReports,
                EzEmployerReports.ezExportIntegrationFile);
        }

        return ezApi.ezclocker.ezUi.ezStartPageWaitExecute(
            ezApi.ezMsg`
                Creating export for integration
                ${EzIntegrationProviderId.ezToDisplayValue(ezIntegrationProviderId)} ...`,
            (waitDone) => ezApi.ezclocker.ezwEmployerExportTimeSheetDialog.ezSaveEmployerReportOptions()
                .then(
                    () => {
                        let periodStartIso = ezApi.ezclocker.ezDateTime.ezToIso(startMoment);

                        let periodEndIso = ezApi.ezclocker.ezDateTime.ezToIso(endMoment);

                        // V1 Integrations Service
                        let downloadExportFileUrl = ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                            ezApi.ezUrlTemplate`integrations/
                                ${ezApi.ezEncode(ezIntegrationProviderId)}/export/direct
                                ?context=${ezApi.ezEncode('TIME_ENTRY')}
                                &period-start-iso=${ezApi.ezEncode(periodStartIso)}
                                &period-end-iso=${ezApi.ezEncode(periodEndIso)}
                                &time-zone-id=${ezApi.ezEncode(ezApi.ezclocker.ezDateTime.activeTimeZone)}`,
                            'v1');

						ezApi.ezclocker.ezwEmployerExportTimeSheetDialog.ezClose();
						ezApi.ezclocker.EzReportDirectDialog.ezShow(downloadExportFileUrl, waitDone);
                    }));
    }
	
	
}

export {
    EzEmployerReports
};
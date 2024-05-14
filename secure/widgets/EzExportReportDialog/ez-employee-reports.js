import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzReportProviderType } from '/secure/widgets/EzExportReportDialog/EzReportProviderType.js';
import { EzReportFormat } from '/secure/widgets/EzExportReportDialog/EzReportFormat.js';

class EzEmployeeReports {
    /**
        Download the Active Employee Time Period Report
        @param {number} employerId
        @param {number} employeeId
        @param {moment} startMoment
        @param {moment} endMoment
        @param {string} timeZoneId
        @returns {Promise.resolve}
        Resolves returns the url to download the report from
     */
    ezDownloadActiveEmployeeTimePeriodReport(employerId, employeeId, customerId, startMoment, endMoment, timeZoneId) {
        if (!ezApi.ezIsNumber(employerId)) {
            employerId = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id;
        }

        if (!ezApi.ezIsNumber(employeeId)) {
            employeeId = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().id;
        }

        if (!ezApi.ezStringHasLength(timeZoneId)) {
            timeZoneId = ezApi.ezclocker.ezDateTime.activeTimeZone;
        }

        if (!ezApi.ezIsNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                EzEmployeeReports,
                EzEmployeeReports.exportTimeSheet);
        }

        if (!ezApi.ezIsNumber(employeeId)) {
            throw new EzBadParamException(
                'employerId',
                EzEmployeeReports,
                EzEmployeeReports.exportTimeSheet);
        }

        if (!ezApi.ezIsValid(startMoment)) {
            throw new EzBadParamException(
                'startMoment',
                EzEmployeeReports,
                EzEmployeeReports.exportTimeSheet);
        }

        if (!ezApi.ezIsValid(endMoment)) {
            throw new EzBadParamException(
                'startMoment',
                EzEmployeeReports,
                EzEmployeeReports.exportTimeSheet);
        }

        return ezApi.ezAsyncAction(
            (finished) => {
                let customerIdParam = ezApi.ezIsNumber(customerId)
                    ? `&customerId=${customerId}`
                    : '';

                let periodStartDateTimeIso = ezApi.ezclocker.ezDateTime.ezToIso(
                    ezApi.ezclocker.ezDateTime.ezSetMomentStartOfDay(startMoment));

                let periodEndDateTimeIso = ezApi.ezclocker.ezDateTime.ezToIso(
                    ezApi.ezclocker.ezDateTime.ezSetMomentEndOfDay(endMoment));

                /* TODO: Migrate to PDF only once customerId is ported over.
                // _api/v1/reports/employee/{employeeId}/time-entries/{EzReportFormat}
                let downloadReportUrl = ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                    ezApi.ezUrlTemplate`reports/
                        employee/${ezApi.ezEncode(employeeId)}
                        /time-entries/${EzReportFormat.PDF}
                        ?period-start-iso=${periodStartDateTimeIso}
                        &period-end-iso=${periodEndDateTimeIso}
                        &target-time-zone-id=${ezApi.ezEncode(timeZoneId)}`,
                    'v1');
                */

                // _api/v1/reports/csv/employee/{employeeId}/time-entries
                let downloadReportUrl = ezApi.ezclocker.ezNavigation.getInternalApiUrl(
                    ezApi.ezUrlTemplate`reports/
                        employee/${employeeId}
                        /${EzReportProviderType.SINGLE_EMPLOYEE_TIME_PERIOD_REPORT}
                        /${EzReportFormat.CSV}
                        ?period-start-iso=${periodStartDateTimeIso}
                        &period-end-iso=${periodEndDateTimeIso}
                        ${customerIdParam}
                        &target-time-zone-id=${ezApi.ezEncode(timeZoneId)}`,
                    'v1');

                ezApi.ezclocker.ezwEmployerExportTimeSheetDialog.ezClose();

                ezApi.ezclocker.ezReportDownloadDialog.ezShow(downloadReportUrl);

                return finished(downloadReportUrl);
            });
    }
}

export {
    EzEmployeeReports
};
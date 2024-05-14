/**
 *
 * Wraps access to the ezclocker RESTful report services.
 *
 * Additional Dependencies
 * public/javascript/jquery
 * public/javascript/ezclocker-http-helper.js
 * public/javascript/ezclocker-validators.js
 * public/ezclocker-url-helper2.js
 * public/ezclocker-navigation-helper.js
 * public/services/ezclocker-services-helper.js
 *
 */
var _REPORT_SERVICE_URI = ezNavigation.getInternalApiServiceUrl('reports', 'v1');
var ezReports = {
    getEmployerCsvReportUrl: function (employerId, reportId, startDate, endDate, targetTimeZone, source) {
        if (isBadReference(employerId)) {
            serviceHelper.createFailureResponse('Employer id is required.', 3, failure);
        }
        if (isBadReference(reportId)) {
            serviceHelper.createFailureResponse('Report id is required.', 3, failure);
        }
        var url = _REPORT_SERVICE_URI + '/' + reportId;
        httpHelper.addQueryParam(url, 'report-format', 'csv');
        httpHelper.addQueryParam(url, 'start-date', startDate);
        httpHelper.addQueryParam(url, 'end-date', endDate);
        httpHelper.addQueryParam(url, 'target-time-zone', targetTimeZone);
        if (isVadReference(source)) {
            httpHelper.addQueryParam(url, 'source', httpHelper.WEBSITE_SOURCE_VALUE);
        } else {
            httpHelper.addQueryParam(url, 'source', source);
        }
        return url;
    },
    createDownloadFormHtml: function (url, action, target, id) {},
    removeDownloadFormHtml: function (id) {}
};

const path = require('path');

// Set Constants
const ROOT_PATH = `${process.cwd()}`;
console.log(`ROOT_PATH=${ROOT_PATH}`);

const WEBAPP_SRC_ROOT_PATH = path.resolve(`${ROOT_PATH}`);
console.log(`WEBAPP_SRC_ROOT_PATH=${WEBAPP_SRC_ROOT_PATH}`);

const EZ_WEBPACK_CONFIGURATION_FILE_NAME = path.resolve(`${WEBAPP_SRC_ROOT_PATH}/webpack/ez-webpack-config.js`);
console.log(`EZ_WEBPACK_CONFIGURATION_FILE_NAME=${EZ_WEBPACK_CONFIGURATION_FILE_NAME}`);

const ezWebpackConfiguration = require(EZ_WEBPACK_CONFIGURATION_FILE_NAME);
if (ezWebpackConfiguration.debug) {
    console.log(`ezWebpackConfiguration=${JSON.stringify(ezWebpackConfiguration, null, 3)}`);
}


/**
    ezClocker's UX Widget Bundles
 */
module.exports = () => ezWebpackConfiguration.ezGetWebpackConfigurationWithEntries({
    // Time entry add and edit dialog
    'time-add-edit-dialog': [
        './secure/widgets/EzTimeAddEditDialog/EzTimeAddEditDialog.css',
        './secure/widgets/EzTimeAddEditDialog/EzTimeAddEditDialogMode.js',
        './secure/widgets/EzTimeAddEditDialog/EzTimeAddEditDialogViewConfiguration.js',
        './secure/widgets/EzTimeAddEditDialog/EzTimeAddEditDialogView.js',
        './secure/widgets/EzTimeAddEditDialog/EzTimeAddEditDialogController.js',
    ],
    // Job code dialog
    'job-code-dialog': [
        './secure/widgets/EzJobCodeDialog/ez-jobcode-dialog.css',
        './secure/widgets/EzJobCodeDialog/ez-jobcode-assign-employee-dialog.js',
        './secure/widgets/EzJobCodeDialog/ez-jobcode-dialog.js'
    ],
    // Export time-entries or report dialog
    'export-report-dialog': [
        './secure/widgets/EzReportDownloadDialog/ez-report-download-dialog.js',
        './secure/widgets/EzReportDownloadDialog/ez-report-direct-dialog.js',
        './secure/widgets/EzExportReportDialog/ez-export-report-dialog.js'
    ],
    // Export time-offs or report dialog
    'export-timeoff-report-dialog': [
        './secure/widgets/EzReportDownloadDialog/ez-report-download-dialog.js',
        './secure/widgets/EzReportDownloadDialog/ez-report-direct-dialog.js',
        './secure/widgets/EzExportReportDialog/ez-export-timeoff-report-dialog.js'
    ],
    // Time entry audit dialog JS
    'time-entry-audit-dialog': [
        './secure/widgets/EzTimeEntryAuditDialog/ez-time-entry-audit-dialog.js'
    ],
    'time-off-request-dialog': [
        './secure/widgets/EzTimeOffDialogs/EzTimeOffRequestDialog.js',
        './secure/widgets/EzTimeOffDialogs/EzViewTimeOffRequestDialog.js'
    ],
    // Update email dialog
    'update-email-dialog': [
        './secure/widgets/EzUpdateEmailDialog/EzUpdateEmailDialog.js'
    ],
    'copy-schedule-forward-dialog': './secure/widgets/EzCopyScheduleForward/EzCopyScheduleForward.js',
    'schedule-locations-dialog': [
        './secure/widgets/EzScheduleLocationsDialog/EzLocations.js',
        './secure/widgets/EzScheduleLocationsDialog/EzScheduleLocationsDialog.js'
    ],
    // Add, invite, update employee info dialog
    'invite-employee-dialog': './secure/widgets/EzInviteEmployeeDialog/EzInviteEmployeeDialog.js',
    // Employee selection combo-box widget
    'employee-select-combo-box': [
        './secure/widgets/EzSelectEmployeeComboBox/EzSelectEmployeeComboBox.js'
    ],
    'schedule-widgets': [
        './secure/widgets/EzSchedules/EzScheduleDisplayMode.js',
        './secure/widgets/EzSchedules/EzSchedule.js',
        './secure/widgets/EzSchedules/EzScheduleCard.js',
        './secure/widgets/EzSchedules/EzDaySchedule.js',
        './secure/widgets/EzSchedules/EzMonthSchedule.js',
        './secure/widgets/EzSchedules/EzWeekSchedule.js'
    ]
});

const { ezClockerCoreJsBundles } = require('./webpack/packages/ez-public-webpack.config.js');
const { ezClockerServicesJsBundle } = require('./secure/javascript/services/webpack-services-config.js');
const { ezMobileJSCore } = require('./webpack/packages/ez-public-mobile-webpack.config.js');
const { ezLibraryJsBundle } = require('./ezlibrary/webpack-ezlibrary-config.js');
const { ezIntegrationsBundleJS } = require('./secure/integrations/webpack-integrations-config.js');
const { ezWidgetBundles } = require('./secure/widgets/webpack-widgets-config.js');
const { ezWizardBundle } = require('./public/webcomponents/webcomponents-webpack-config.js');
const { ezSignupJs } = require('./webpack/packages/ez-signup-webpack.config.js');
const { ezSignInBundle } = require('./public/signin/webpack-ezsignin-config.js');
const { ezClockerAccountViewControllerBundleJs } = require('./secure/account/webpack-account-view-config.js');
const { ezEmployeeDashboardJSBundle } = require('./secure/javascript/employeeDashboard/webpack-employee-dashboard-config.js');
const { ezEmployerDashboardJSBundle } = require('./secure/employer/webpack-employer-dashboard-config.js');
const { ezEmployerScheduleJSBundle } = require('./secure/javascript/schedule/webpack-employer-schedule-config.js');
const { ezEmployeeScheduleJSBundle } = require('./secure/javascript/schedule/webpack-employee-schedule-config.js');
const { ezArchiveJSBundle } = require('./secure/archive/webpack.archive-view.config.js');
const { ezResetPasswordBundleJS } = require('./reset-password/webpack-reset-password-config.js');
const { ezEmployeeSignupJsBundle } = require('./employee-signup/webpack.employee-signup.config.js');
const { ezGoogleServiceBundle } = require('./public/javascript/google/webpack-google-api-config.js');

// Legacy
const { ezMobileAcceptEmployeeInviteJS } = require('./m/p/accept-employee-invite/webpack-ezm-accept-employee-invite-config.js');
const { ezEmployeeAcceptInviteBundle } = require('./public/javascript/signup/ez-employee-accept-invite-webpack-config.js');

module.exports = [
    ezClockerCoreJsBundles,
    ezClockerServicesJsBundle,
    ezMobileJSCore,
    ezLibraryJsBundle,
    ezIntegrationsBundleJS,
    ezWidgetBundles,
    ezWizardBundle,
    ezSignupJs,
    ezSignInBundle,
    ezClockerAccountViewControllerBundleJs,
    ezEmployeeDashboardJSBundle,
    ezEmployerDashboardJSBundle,
    ezEmployerScheduleJSBundle,
    ezEmployeeScheduleJSBundle,
    ezArchiveJSBundle,
    ezResetPasswordBundleJS,
    ezEmployeeSignupJsBundle,
    ezGoogleServiceBundle,
    ezMobileAcceptEmployeeInviteJS,
    ezEmployeeAcceptInviteBundle
];

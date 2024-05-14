![ezClocker](https://ezclocker.com/public/images/logos/ezclocker_logo_2015.svg)
# Web Pack Bundles
This document lists the files included in the webpack bundles to help ease the removal of individual files
and replacing with the bundles.

Create the bundles by running npm run build in the {projectRoot}src/main/webapp folder. Optionally, you can also run the following shell script files in the root of the project:

* `{PROJECT_ROOT/npmqbuild.sh` (building without running npm install or npm update first)
* `{PROJECT_ROOT}/npmbuild.sh` (runs npm install/update/audit fix before webpack)

When updating an existing webpack configuration or adding any new webpack configurations PLEASE update this readme file.

## Bundle File Import Ordering
Most bundle files need imported in a specific order to avoid issues with missing dependencies. Below is a template for all the necessary files an ezClocker website page will need. Paths are relative to the html page sitting at the root  website (https://ezclocker.com). Adjust as necessary for pages in other folders. Finally, note that the data-ez-requires attribute states what `<script>` dependency must appear before that file. Keep in mind that you'll need to also include  the files required by the mentioned dependency (if any). In other words, the dependencies are additive. Style sheet files are not listed in the data-ez-requires attribute but it does not mean a style sheet is not required.

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <!-- ezclocker meta-data -->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta http-equiv="Content-Language" content="en">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- ezclocker favicon and fonds -->
        <link rel="shortcut icon" href="/favicon.png" type="image/png">
        <link href="//fonts.googleapis.com/css2?family=Noto+Sans+JP&family=Roboto&display=swap" rel="stylesheet">

        <!-- library css -->
        <link href="jquery-ui/jquery-ui.min.css?v=r50" rel="stylesheet" type="text/css">
        <link href="jquery-ui/jquery-ui.structure.min.css?v=r50" rel="stylesheet" type="text/css">
        <link href="jquery-ui/jquery-ui.theme.min.css?v=r50" rel="stylesheet" type="text/css">
        <link href="jquery-ui/jquery.ui.timepicker-0.3.3.min.css" rel="stylesheet" type="text/css">
        <link href="node_modules/icheck/skins/minimal/minimal.css?v=r50" rel="stylesheet" type="text/css" data-dep-for="icheck.min.js">
        <link href="node_modules/icheck/skins/flat/orange.css?v=r50" rel="stylesheet" type="text/css" data-dep-for="icheck.min.js">

        <!-- ezclocker core css -->
        <link href="public/styles/common/ez-body.css?v=r50" rel="stylesheet" type="text/css">
        <link href="public/styles/common/ez-text.css?v=r50" rel="stylesheet" type="text/css">
        <link href="public/styles/common/ez-containers.css?v=r50" rel="stylesheet" type="text/css">        
        <link href="public/styles/common/ez-buttons.css?v=r50" rel="stylesheet" type="text/css">        
        <link href="public/styles/common/ez-inputs.css?v=r50" rel="stylesheet" type="text/css">
        <link href="public/styles/common/ez-layout-grid.css?v=r50" rel="stylesheet" type="text/css">
        <link href="public/styles/common/ez-shadows.css?v=r50" rel="stylesheet" type="text/css">
        <link href="public/styles/common/ez-dialogs.css?v=r50" rel="stylesheet" type="text/css">        
        
        <!-- ezclocker page css -->
        <!-- insert css files specific to the html page in this section-->
        
        <!-- library js -->        
        <script src="node_modules/core-js-bundle/minified.js"></script>
        <script src="node_modules/jquery/dist/jquery.min.js"></script>
        <script src="node_mod/jquery-migrate/dist/jquery-migrate.min.js"></script>
        <script src="node_modules/moment/min/moment-with-locales.min.js"></script>
        <script src="node_modules/moment-timezone/builds/moment-timezone-with-data.min.js"></script>
        <script src="node_modules/browser-detect/dist/browser-detect.umd.js"></script>
        <script src="node_modules/store/dist/store.legacy.min.js" data-dep-for="jquery-idletimeout.min.js"></script>
        <script src="jquery/jquery.timers-1.2.min.js" data-dep-for="jquery-idletimeout.min.js"></script>
        
        <!-- library ux js -->
        <script src="jquery-ui/jquery-ui.min.js"></script>
        <script src="jquery-ui/jquery-idletimeout.min.js"></script>
        <script src="jquery-ui/jquery.ui.timepicker-0.3.3.min.js"></script>
        <script src="node_modules/icheck/icheck.min.js"></script>

        <!-- ezclocker core bundle js -->
        <script src="ezwp/js/ez-library.bundle.js?v=r50" 
                data-ez-requires="{
                    'core-js-bundle', 
                    'jquery', 
                    'jquery-migrate'
                }"></script>
        <script src="ezwp/js/ez-core.bundle.js?v=r50" 
                data-ez-requires="{                    
                    `jquery-ui, 
                    `moment-with-locales, 
                    `moment-timezone-with-data, 
                    `ez-library.bundle`
                }">
        </script>
        
        <!-- ezclocker metrics js -->
        <script src="../public/javascript/common/ezclocker-google-analytics.js?v=r50"></script>
        <script src="../public/javascript/common/ez-performance-metric.js?v=r50"></script>
        
        <!-- ezclocker services bundle js -->
        <script src="../public/javascript/common/ez-services.js?v=r50"
                data-ez-requires="{
                    'ez-core.bundle'
                }">
        </script>
        
        <!-- ezclocker core ux bundle js -->
        <script src="../ezwp/js/ez-ux-core.bundle.js"
                data-ez-requires="{
                    'ez-services.bundle'
                }">
        </script>
        
        <!-- ezclocker context bundle js -->
        <script src="../ezwp/js/ez-context.bundle.js?v=r50"
                data-ez-requires="{
                    'ez-services.bundle'
                }">
        </script>
        
        <!-- ezclocker EzWizard bundle js (only if needed) -->
        <script src="../ezwp/js/ez-wizard.bundle.js"
                data-ez-requires="{
                    'ez-ux-core.bundle',
                    'ez-context.bundle'
                }">
        </script>

        <!-- integrations bundle js (only if needed) -->
        <script src="../ezwp/js/ez-integrations.bundle.js"
                data-ez-requires="{
                    'ez-ux-core.bundle',
                    'ez-context.bundle'
                }">
        </script>
        
        <!-- ezclocker page js -->
        <!-- include js files specific to the page in this section -->
        <title>ezClocker: Page Name</title>
    </head>
    <body>
    </body>
</html>
```
## Webpack Packages

This section provides information on each webpack configuration, the bundle files created, and what is included in each bundle.

* [EzLibrary](#package-ezlibrary)
* [EzWebComponents](#package-ezwebcomponents)
* [EzAccount](#package-ezaccount)
* [EzCore](#package-ezcore)
* [EzIntegrations](#package-ezintegrations)
* [EzSignup](#package-ezsignup)
* [EzMobile](#package-ezmobile)
* [EzWidgets](#package-ezwidgets)
* [EzEmployeeDashboard](#package-ezemployeedashboard)
* [EzEmployerDashboard](#package-ezemployeedashboard)

### Package EzLibrary

\[[index](#webpack-packages)\]

* [Bundle EzLibrary](bundle-ezlibrary)

#### Webpack Config Location: 

* `{PROJECT_ROOT}/src/main/webapp/ezlibrary/webpack-ezlibrary-config.js`

#### Build Command

Build command needs run from the `{projectRoot}/src/main/webapp` folder.

    npm run pack:ezlibrary

#### Bundle EzLibrary

\[[package index](#package-ezlibrary)\]

##### Bundle File

* `{PROJECT_ROOT}/src/main/webapp/ezwp/js/ez-library.bundle.js`

##### Bundled Files

* `{PROJECT_ROOT}/src/main/webapp/ezlibrary/ez-getter.js`
* `{PROJECT_ROOT}/src/main/webapp/ezlibrary/ez-getter-setter.js`
* `{PROJECT_ROOT}/src/main/webapp/ezlibrary/ez-dialog-definition.js`
* `{PROJECT_ROOT}/src/main/webapp/ezlibrary/ez-template-loader.js`

### Package EzLibrary 

\[[index](#webpack-packages)\]

#### Webpack Config Location: 

* `{PROJECT_ROOT}/src/main/webapp/ezlibrary/webpack-ezlibrary-config.js`

#### Build Command

Build command needs run from the `{projectRoot}/src/main/webapp` folder.

    npm run pack:ezlibrary
    
#### Bundle: ez-context

##### Bundle File

* `{PROJECT_ROOT}/src/main/webapp/ezwp/js/ez-context.bundle.js`

##### Bundled Files

* `{PROJECT_ROOT}/src/main/webapp/ezlibrary/EzClockerContext/ez-context.js`
* `{PROJECT_ROOT}/src/main/webapp/ezlibrary/EzClockerContext/ez-context-module-subscription-context.js`
* `{PROJECT_ROOT}/src/main/webapp/ezlibrary/EzClockerContext/ez-context-module-selected-employer.js`
* `{PROJECT_ROOT}/src/main/webapp/ezlibrary/EzClockerContext/ez-context-module-employer-context.js`
* `{PROJECT_ROOT}/src/main/webapp/ezlibrary/EzClockerContext/ez-context-module-manager-context.js`
* `{PROJECT_ROOT}/src/main/webapp/ezlibrary/EzClockerContext/ez-context-module-employee-context.js`
* `{PROJECT_ROOT}/src/main/webapp/ezlibrary/EzClockerContext/ez-context-module-personal-context.js`
* `{PROJECT_ROOT}/src/main/webapp/ezlibrary/EzClockerContext/ez-context-module-active-employer.js`
* `{PROJECT_ROOT}/src/main/webapp/ezlibrary/EzClockerContext/ez-context-module-active-employee.js`
* `{PROJECT_ROOT}/src/main/webapp/ezlibrary/EzClockerContext/ez-context-module-active-account.js`
* `{PROJECT_ROOT}/src/main/webapp/ezlibrary/EzClockerContext/ez-context-module-user-context.js`
* `{PROJECT_ROOT}/src/main/webapp/ezlibrary/EzClockerContext/ez-context-module-initializer.js`

### Package EzWebComponents

\[[index](#webpack-packages)\]

#### Webpack Config Location
    
* `{PROJECT_ROOT}/src/main/webapp/public/webcomponents/webcomponents-webpack-config.js`

#### Build Command

Build command needs run from the `{projectRoot}/src/main/webapp` folder.

    npm run pack:webcomponents

#### Bundle: ez-wizard

##### Bundle File

* `{PROJECT_ROOT}/src/main/webapp/ezwp/js/ez-wizard.bundle.js`

##### Bundled Files

* `{PROJECT_ROOT}/src/main/webapp/public/webcomponents/ez-wizard/ez-wizard-context.js`
* `{PROJECT_ROOT}/src/main/webapp/public/webcomponents/ez-wizard/ez-wizard-flow.js`
* `{PROJECT_ROOT}/src/main/webapp/public/webcomponents/ez-wizard/ez-wizard-info.js`
* `{PROJECT_ROOT}/src/main/webapp/public/webcomponents/ez-wizard/ez-wizard.js`
* `{PROJECT_ROOT}/src/main/webapp/public/webcomponents/ez-wizard/ez-wizard-launcher.js`

### Package EzAccount

\[[index](#webpack-packages)\]

#### Webpack Config Location: 

* `{PROJECT_ROOT}/src/main/webapp/secure/account/account-webpack-config.js`

#### Build Command

Build command needs run from the `{projectRoot}/src/main/webapp` folder.

    npm run pack:account-view

#### Bundle: ez-account-view

##### Bundle File

* `{PROJECT_ROOT}/src/main/webapp/ezwp/js/ez-account-view.bundle.js`

##### Bundled Files

* `{PROJECT_ROOT}/src/main/webapp/secure/components/EzSendFeedbackDialog/EzSendFeedbackDialog.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/services/ezclocker-employee-service.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/account/ez-subscription-info.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/account/account-globals.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/account/account-subscriptionplans.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/account/account-BillingInfo.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/account/account-CompanyLogo.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/account/account-CompanyInfo.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/account/account-CreditCard.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/account/account-subscription-dialog.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/account/account-ChangePassword.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/account/account-passEmailChange.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/account/account-delete.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/account/account-preferences-options.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/account/bt-billing-debug-info.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/account/account-view-controller.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/account/account-view-controller_license-event-handlers.js`

### Package EzCore

\[[index](#webpack-packages)\]

#### Webpack Config Location: 

* `{PROJECT_ROOT}/src/main/webapp/webpack/packages/ez-public-webpack.config.js`

#### Build Command

Build command needs run from the `{projectRoot}/src/main/webapp` folder.

    npm run pack:core

#### Bundle: ez-core

##### Bundle File

* `{PROJECT_ROOT}/src/main/webapp/ezwp/js/ez-core.bundle.js`

##### Bundled Files

* `"babel-polyfill"` (npm dependency)
* `{PROJECT_ROOT}/src/main/webapp/public/javascript/common/ezclocker-shims.js`
* `{PROJECT_ROOT}/src/main/webapp/public/javascript/common/ezapi.js`
* `{PROJECT_ROOT}/src/main/webapp/public/javascript/common/ezclocker-logger.js`
* `{PROJECT_ROOT}/src/main/webapp/ezlibrary/ez-event-engine.js`
* `{PROJECT_ROOT}/src/main/webapp/public/javascript/common/ez-enviornment.js`
* `{PROJECT_ROOT}/src/main/webapp/public/javascript/common/ez-events.js`
* `{PROJECT_ROOT}/src/main/webapp/public/javascript/common/ezclocker-url-helper2.js`
* `{PROJECT_ROOT}/src/main/webapp/public/javascript/common/ezclocker-navigation-helper.js`
* `{PROJECT_ROOT}/src/main/webapp/public/javascript/common/ez-date-time.js`
* `{PROJECT_ROOT}/src/main/webapp/public/javascript/common/ezclocker-mobile-helper.js`
* `{PROJECT_ROOT}/src/main/webapp/public/javascript/common/ez-html-char.js`
* `{PROJECT_ROOT}/src/main/webapp/public/javascript/common/ez-validation.js`
* `{PROJECT_ROOT}/src/main/webapp/public/javascript/common/ez-cookies.js`
* `{PROJECT_ROOT}/src/main/webapp/public/javascript/common/ezclocker-http-helper.js`
* `{PROJECT_ROOT}/src/main/webapp/ezlibrary/ez-feature-toggles2.js`
* `{PROJECT_ROOT}/src/main/webapp/ezlibrary/ez-user-role-features.js`

### Package EzServices

\[[index](#webpack-packages)\]

#### Webpack Config Location: 

* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/services/webpack-services-config.js`

#### Build Command

Build command needs run from the `{projectRoot}/src/main/webapp` folder.

    npm run pack:services

#### Bundle: ez-core

##### Bundle File

* `{PROJECT_ROOT}/src/main/webapp/ezwp/js/ez-services.bundle.js`

##### Bundled Files

* `{PROJECT_ROOT}/src/main/webapp/public/javascript/common/ez-services.js`
* `{PROJECT_ROOT}/src/main/webapp/public/javascript/services/ezclocker-services-helper.js`
* `{PROJECT_ROOT}/src/main/webapp/public/javascript/services/ezclocker-account-services.js`
* `{PROJECT_ROOT}/src/main/webapp/public/javascript/services/ezclocker-options.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/common/ezclocker-license-helper.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/services/ezclocker-time-entry-service.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/services/ezclocker-datatag-service.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/services/ezclocker-datatagmap-service.js`

#### Bundle: ez-secure-core

##### Bundle File

* `{PROJECT_ROOT}/src/main/webapp/ezwp/js/ez-secure.bundle.js`

##### Bundled Files

* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/common/ezclocker-autologout.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/common/ezclocker-license-helper.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/common/ezclocker-employer-services.js`

#### Bundle: ez-ux-core

##### Bundle File

* `{PROJECT_ROOT}/src/main/webapp/ezwp/js/ez-ux-core.bundle.js`

##### Bundled Files

* `{PROJECT_ROOT}/src/main/webapp/public/javascript/common/ezui.js`
* `{PROJECT_ROOT}/src/main/webapp/public/javascript/common/ez-html-builder.js`
* `{PROJECT_ROOT}/src/main/webapp/public/javascript/common/ezclocker-dialog-helper.js`
* `{PROJECT_ROOT}/src/main/webapp/public/webcomponents/spinner/ez-spinner.js`

#### Bundle: ez-debug

##### Bundle File 
    
* `{PROJECT_ROOT}/src/main/webapp/ezwp/js/ez-debug.bundle.js`

##### Bundled Files

* `{PROJECT_ROOT}/src/main/webapp/public/javascript/common/ez-performance-metric.js`
* `{PROJECT_ROOT}/src/main/webapp/public/javascript/common/ezclocker-debug.js`

### Package EzIntegrations

\[[index](#webpack-packages)\]

Contains the configuration for bundling ezClocker integrations (excluding the EzWizard).

#### Webpack Config Location

* `{PROJECT_ROOT}/src/main/webapp/secure/integrations/webpack-integrations-config.js`
    
#### Build Command

Build command needs run from the `{projectRoot}/src/main/webapp` folder.

    npm run pack:integrations

#### Bundle: ez-integrations

Bundles all of the integration JS files (excluding the wizard base files).

##### Bundle File

* `{PROJECT_ROOT}/src/main/webapp/ezwp/js/ez-integrations.bundle.js`

##### Bundled Files

* `{PROJECT_ROOT}/src/main/webapp/secure/integrations/ez-integration-wizard-context.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/integrations/ez-integration-wizard-state-loader.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/integrations/qbo/ez-qbo-integration-wizard-flow.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/integrations/qbo/ez-qbo-integration-wizard-launcher.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/integrations/qbo/ez-integration-employee-linker-view.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/integrations/qbo/ez-integration-export-time-entries-view.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/integrations/paychex/ez-pay-chex-integration-enums.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/integrations/paychex/ez-pay-chex-integration-view.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/integrations/adp/ez-adp-integration-view.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/integrations/gusto/ez-gusto-integration-view.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/account/account-integrations.js`

### Package EzSignup

\[[index](#webpack-packages)\]

An experimental bundle that contains the majority of js files needed for the ezClocker sign up view.

#### Webpack Config Location

* `{PROJECT_ROOT}/src/main/webapp/webpack/packages/ez-signup-webpack.config.js`
    
#### Build Command

Build command needs run from the `{projectRoot}/src/main/webapp` folder.

    npm run pack:ez-sign-up

#### Bundle: ez-sign-up

##### Bundle File

* `{PROJECT_ROOT}/src/main/webapp/ezwp/js/ez-sign-up.js`

##### Bundled Files

* `{PROJECT_ROOT}/src/main/webapp/public/javascript/common/ez-services.js`
* `{PROJECT_ROOT}/src/main/webapp/public/javascript/services/ezclocker-account-services.js`
* `{PROJECT_ROOT}/src/main/webapp/public/javascript/common/ezclocker-http-helper.js`
* `{PROJECT_ROOT}/src/main/webapp/public/javascript/services/ezclocker-services-helper.js`
* `{PROJECT_ROOT}/src/main/webapp/public/javascript/services/ez-utmtagmap-service.js`
* `{PROJECT_ROOT}/src/main/webapp/public/webcomponents/spinner/ez-spinner.js`
* `{PROJECT_ROOT}/src/main/webapp/public/javascript/common/ezclocker-layout-helper.js`
* `{PROJECT_ROOT}/src/main/webapp/public/javascript/common/ezclocker-dialog-helper.js`
* `{PROJECT_ROOT}/src/main/webapp/public/javascript/signup/signUpDialog.js`

### Package EzMobile

\[[index](#webpack-packages)\]

Packs together files used in for public views in the old mobile website.

#### Webpack Config File

* `{PROJECT_ROOT}/src/main/webapp/webpack/packages/ez-public-mobile-webpack.config.js`
    
#### Build Command

Build command needs run from the `{projectRoot}/src/main/webapp` folder.

    npm run pack:mobile-public

##### Bundle: ezm-core

Bundles all of the integration JS files (excluding the wizard base files).

###### Bundle File

* `{PROJECT_ROOT}/src/main/webapp/mobile/js/ezm-core.js`

###### Bundled Files

* `{PROJECT_ROOT}/src/main/webapp/mobile/public/javascript/ezclocker-mobile-navigation.js`
* `{PROJECT_ROOT}/src/main/webapp/mobile/public/javascript/common/m.ezclocker-mobile.js`
* `{PROJECT_ROOT}/src/main/webapp/mobile/public/javascript/signin/ezm-signing-controller.js`

### Package EzWidgets

\[[index](#webpack-packages)\]

#### Webpack Config File

* `{PROJECT_ROOT}/src/main/webapp/secure/widgets/webpack-widgets-config.js`

#### Build Command

    npm run pack:widgets
    
#### Bundle: ez-timeentry-dialog.bundle

##### Bundle File

* `{PROJECT_ROOT}/src/main/webapp/ezwp/js/ez-timeentry-dialog.bundle.js`

##### Bundled Files

* `{PROJECT_ROOT}/secure/widgets/EzTimeEntryDialog/ez-timeentry-dialog.js`

### Package EzEmployeeDashboard

\[[index](#webpack-packages)\]

#### Webpack Config File

* `(PROJECT_ROOT)/secure/javascript/employeeDashboard/webpack-employee-dashboard-config.js`

#### Build Command

    npm run pack:employee-dashboard
    
#### Bundle: ez-employee-dashboard.bundle

##### Bundle File

* `{PROJECT_ROOT}/src/main/webapp/ezwp/js/ez-employee-dashboard.bundle.js`

##### Bundled Files

* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/employerDashboard/employerDashboard-DownloadTimeSheet.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/employeeDashboard/employeeDashboard-DisplayEmployeeInfo.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/employeeDashboard/employee-dashboard-controller.js`

### Package EzEmployerDashboard

\[[index](#webpack-packages)\]

#### Webpack Config File

* `(PROJECT_ROOT)/secure/javascript/employerDashboard/webpack-employer-dashboard-config.js`

#### Build Command

    npm run pack:employer-dashboard
    
#### Bundle: ez-employee-dashboard.bundle

##### Bundle File

* `{PROJECT_ROOT}/src/main/webapp/ezwp/js/ez-employer-dashboard.bundle.js`

##### Bundled Files

* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/employerDashboard/employerDashboard.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/employerDashboard/employer-dashboard-controller.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/employerDashboard/clockinout-handler.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/employerDashboard/employerDashboard-DownloadTimeSheet.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/employerDashboard/employerDashboard-DisplayEmployeeInfo.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/employerDashboard/ez-no-available-employee-slots-dialog.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/employerDashboard/employerDashboard-InviteEmployee.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/employerDashboard/employerDashboard-DeleteEmployee.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/employerDashboard/employerdashboard-whoisclockedin.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/employerDashboard/employerDashboard-QuickBooks.js`
* `{PROJECT_ROOT}/src/main/webapp/secure/javascript/employerDashboard/employerDashboard-ManageJobCodes.js`

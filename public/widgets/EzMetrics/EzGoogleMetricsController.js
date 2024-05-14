/**
    Controls the use of all google metric services
 */
export class EzGoogleMetricsController {
    constructor() {
        this.ready = false;
        this.ezTypeName = 'EzGoogleMetricsController';

        this.ezMetricPreferences = EzGoogleMetricsController.DEFAULT_PREFERENCES;

        this.ezGoogleRemarketingMetricInfo = null;
        this.ezGoogleAnalyticsMetricInfo = null;
        this.ezGoogleUtmTagMapMetricInfo = null;
    }

    /**
        @protected
        Initializes EzGoogleMetricsController
        @returns {EzGoogleMetricsController}
     */
    ezInit() {
        let self = ezApi.ezclocker[EzGoogleMetricsController.ezApiName];

        self.ezBuildGoogleMetricsInfo();

        self.ezApplyDefaultMetricPreferences();

        this.ready = true;
        return this;
    }

    /**
        @protected
        Builds all the google metrics info HTML
     */
    ezBuildGoogleMetricsInfo() {
        let self = ezApi.ezclocker[EzGoogleMetricsController.ezApiName];

        self.ezBuildGoogleAnalyticsMetricsInfo();
        self.ezBuildGoogleRemarketingMetricsInfo();
        self.ezBuildGoogleUTMTagMapMetricsInfo();
    }

    /**
        @protected
        Builds the google remarketing metrics info
     */
    ezBuildGoogleRemarketingMetricsInfo() {
        let self = ezApi.ezclocker[EzGoogleMetricsController.ezApiName];

        self.ezGoogleRemarketingMetricInfo = new EzMetricInfo('GoogleREmarketing');

        self.ezGoogleRemarketingMetricInfo.setDescription(ezApi.ezTemplate`
            <h1>Google Ads and Google Ads Remarketing</h1>
            <p>
                Google Ads is an online advertising solution that businesses use to promote their products and services
                on Google Search, YouTube, and other sites across the web. The Google Ads Remarketing service
                further enables ezClocker to show targeted ads to users who have already visited our sites.
            </p>
            <p>
                Click the links below for additional information from Google about Google Ads and Google Ads Remarketing.
                <ul>
                    <li>
                        <a href="https://ads.google.com/" target="ads.google.com">
                            Google Ads Main Website
                        </a>
                    <li>
                        <a href="https://support.google.com/google-ads/topic/11337105?hl=en&ref_topic=10286612"
                            target="support.google.com_googleads">
                            Google Ads Privacy
                        </a>
                    <li>
                </ul>
            </p>`);

        self.ezGoogleRemarketingMetricInfo.setDataCollectedStatement(ezApi.ezTemplate``);

        self.ezGoogleRemarketingMetricInfo.setDataSharingStatement(ezApi.ezTemplate``);

        self.ezGoogleRemarketingMetricInfo.setDataPrivacyStatement(ezApi.ezTemplate``);

        self.ezGoogleRemarketingMetricInfo.setDataSecurityStatement(ezApi.ezTemplate``);
    }

    /**
        @protected
        Builds the google analytics metrics info HTML
     */
    ezBuildGoogleAnalyticsMetricsInfo() {
        let self = ezApi.ezclocker[EzGoogleMetricsController.ezApiName];

        self.ezGoogleAnalyticsMetricInfo = new EzMetricInfo('GoogleAnalytics');

        self.ezGoogleAnalyticsMetricInfo.setDescription(ezApi.ezTemplate`
            <h1>Google Analytics</h1>
            <p>
                Google Analytics mainly uses first-party cookies to report on visitor (aka. user)
                interactions on ezClocker mobile applications and websites. Please visit the links
                below to learn more from Google.
                <ul>
                    <li>
                        <a href="https://marketingplatform.google.com/about/analytics/"
                            target="marketingplatform.google.com_analytics">
                            About Google Analytics
                        </a>
                    <li>
                        <a href="https://support.google.com/analytics/topic/2919631?hl=en&ref_topic=1008008"
                            target="support.google.com_analytics">
                            Google Analytics Data Privacy and Security
                        </a>
                    </li>
            </p>`);

        self.ezGoogleAnalyticsMetricInfo.setDataCollectedStatement(ezApi.ezTemplate``);

        self.ezGoogleAnalyticsMetricInfo.setDataSharingStatement(ezApi.ezTemplate`
            <h3>Data Sharing with Google Analytics</h1>
            <p>
                EzClocker contributes anonymous data from our mobile applications and websites
                to a <a href="https://analytics.google.com" alt="Google Analytics">Google Analytics</a>
                managed aggregate data set. Sharing our anonymous data enables Google Analytics to
                provide ezClocker with the ability to compare our mobile applications and websites with
                industry data from other companies who have also shared their anonymous data with
                Google Analytics.
            </p>
            <p>
                Comparing ezClocker's Google Analytics data with the anonymous industry aggregate data allows the
                ezClocker teams to:
                <ul>
                    <li>Benchmark ezClocker performance with the performance of others with our industry.</li>
                    <li>Pinpoint performance and other problems</li>
                    <li>Set meaningful improvement targets</li>
                    <li>Gain insight into trends occurring across our industry</li>
                </ul>
            </p>
            <h3>Who Has Access to the ezClocker Google Analytics Data</h3>
            <p>
                Viewing and using ezClocker's Google Analytics data is restricted to a small team of ezClocker employees.
                In addition to limiting the access we have company policies that further define and restrict how
                the employees may view and use the data. For example:
                <li>
                    <ul>
                        <li>
                            Authorized ezClocker employess can only use the Google Analytics data
                            for official business needs.
                        </li>
                        <li>
                            Employees may only copy or store the Google Analytics data on/within company authorized
                            software, hardware.
                        </li>
                        <li>
                            Any printed or written copies of the data must remain within authorized ezClocker locations
                            and under the control of the authorized employee at all times.
                        </li>
                        <li>
                            EzClocker requires authorized employees to securly distroy any data that was copied or moved
                            outside of the Google Analaytics service as soon as the data is no longer used for official
                            business needs.
                        </li>
                </li>
            </p>
            <p>
                EzClocker also restrics Google's access to our Google Analytics data:
                <ul>
                    <li>
                        We do not allow sharing of our Google Analytics data with any other Google products &
                        services other than Google Analytics.
                    </li>
                    <li>
                        We do not allow Google technical support representatives, marketing, sales, or any other
                        Google representitive to view or use our Google Analytics data.
                    </li>
                    <li>
                        We do not allow copying or storing of our Google Analytics data outisde of the Google
                        Analytics service.
                    </li>
                </ul>
            </p>
            </h3>
            <div id="ezclocker.google.analytics_EnableDisableContainer">
                <div id="ezclocker.google.analytics_EnableDisableTitle">
                    Enable or Disable Google Analytics
                </div>
                <div id="ezclocker.google.analytics_EnableDisableDescription">
                    EzClocker allows you to enable (default) or disable our use of Google Analytics for your
                    ezClocker sessions. Please select your preference below.
                </div>
                <div id="ezclocker.google.analytics_EnableDisableInputContainer">
                    <label id="ezclocker.google.analytics_EnableDisableInputLabel"
                        for="ezclocker.google.analytics">
                        <input id="ezclocker.google.analytics_EnableDisableInput" type="checkbox" checked>
                        Enable Google Analytics for your ezClocker Sessions.
                    </label>
                </div>
            </div>`);

        self.ezGoogleAnalyticsMetricInfo.setDataPrivacyStatement(ezApi.ezTemplate``);

        self.ezGoogleAnalyticsMetricInfo.setDataSecurityStatement(ezApi.ezTemplate``);
    }

    /**
        @protected
        Builds the GoogleUTMTagMap metrics info HTML
        @returns {String}
     */
    ezBuildGoogleUTMTagMapMetricsInfo() {
        let self = ezApi.ezclocker[EzGoogleMetricsController.ezApiName];

        self.ezGoogleUtmTagMapMetricInfo = new EzMetricInfo('GoogleAnalytics');

        self.ezGoogleUtmTagMapMetricInfo.setDescription(ezApi.ezTemplate``);

        self.ezGoogleUtmTagMapMetricInfo.setDataCollectedStatement(ezApi.ezTemplate``);

        self.ezGoogleUtmTagMapMetricInfo.setDataSharingStatement(ezApi.ezTemplate``);

        self.ezGoogleUtmTagMapMetricInfo.setDataPrivacyStatement(ezApi.ezTemplate``);

        self.ezGoogleUtmTagMapMetricInfo.setDataSecurityStatement(ezApi.ezTemplate``);
    }

    /**
        @protected
        Builds the Google metrics information HTML
        @returns {String}
     */
    ezBuildGoogleMetricsInfoHtml() {
        let self = ezApi.ezclocker[EzGoogleMetricsController.ezApiName];

        return ezApi.ezTemplate`
            ${self.ezGoogleAnalyticsMetricInfo.ezBuildMetricInfoHTML()}
            ${self.ezGoogleRemarketingMetricInfo.ezBuildMetricInfoHTML()}
            ${self.ezGoogleUtmTagMapMetricInfo.ezBuildMetricInfoHTML()}`;
    }

    /**
        @public
        Applies the default metric preferences
     */
    ezApplyDefaultMetricPreferences() {
        let self = ezApi.ezclocker[EzGoogleMetricsController.ezApiName];

        self.ezApplySelectedMetricPreferences(EzGoogleMetricsController.DEFAULT_PREFERENCES);
    }

    /**
        @public
        Applies the provided metric preferences
     */
    ezApplySelectedMetricPreferences(selectedMetricPreferences) {
        let self = ezApi.ezclocker[EzGoogleMetricsController.ezApiName];

        if (!ezApi.ezIsValid(selectedMetricPreferences)) {
            return;
        }

        self.ezMetricPreferences.ezGoogleRemarketingEnabled =
            ezApi.ezIsTrue(selectedMetricPreferences.ezGoogleRemarketingEnabled);
        self.ezMetricPreferences.ezGoogleAnalyticsEnabled =
            ezApi.ezIsTrue(selectedMetricPreferences.ezGoogleAnalyticsEnabled);
        self.ezMetricPreferences.ezGoogleUtmTagMapEnabled =
            ezApi.ezIsTrue(selectedMetricPreferences.ezGoogleUtmTagMapEnabled);
        self.ezApplyMetricPreferences();
    }

    /**
        @public
        Applies the current metric preferences
     */
    ezApplyMetricPreferences() {
        let self = ezApi.ezclocker[EzGoogleMetricsController.ezApiName];

        if (ezApi.ezIsTrue(self.ezMetricPreferences.ezGoogleAnalyticsEnabled)) {
            ezApi.ezclocker.ezGoogleAnalytics.ezEnable();
        } else {
            ezApi.ezclocker.ezGoogleAnalytics.ezDisable();
        }

        if (ezApi.ezIsTrue(self.ezMetricPreferences.ezGoogleRemarketingEnabled)) {
            ezApi.ezclocker.ezGoogleRemarketing.ezEnable();
        } else {
            ezApi.ezclocker.ezGoogleRemarketing.ezDisable();
        }

        if (ezApi.ezIsTrue(self.ezMetricPreferences.ezGoogleUtmTagMapEnabled)) {
            ezApi.ezclocker.ezGoogleUtmTagMap.ezEnable();
        } else {
            ezApi.ezclocker.ezGoogleUtmTagMap.ezDisable();
        }
    }
}
EzGoogleMetricsController.ezApiName = 'EzGoogleMetricsController';
EzGoogleMetricsController.DEFAULT_PREFERENCES = {
    ezGoogleRemarketingEnabled: false,
    ezGoogleAnalyticsEnabled: false,
    ezGoogleUtmTagMapEnabled: false
};

document.addEventListener('onEzApiReady',
    () => ezApi.ezRegisterNewApi(EzGoogleMetricsController, EzGoogleMetricsController.ezApiName));

export {
    EzGoogleMetricsController
};
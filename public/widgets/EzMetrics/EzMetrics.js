import { EzFacebookMetrics } from '/public/widgets/EzFacebookMetrics.js';
import { EzGoogleMetrics } from '/public/widgets/EzFacebookMetrics.js';

class EzMetrics {
    constructor() {
        this.ready = true;
        this.ezTypeName = 'EzMetrics';
    }

    ezInit() {
        let self = ezApi.ezclocker[EzMetrics.ezApiName];

        self.ezLoadMetricPreferences();

        self.ready = true;
        return self;
    }

    ezGetEnvironmentFromUrl() {
        let url = window.location.href;

        if (-1 !== url.indexOf('localhost') || -1 !== url.indexOf('127.0.0.1') || -1 !== url.indexOf('loc.ezclocker.com')) {
            return 'LOC';
        }


        if (-1 !== url.indexOf('dev.ezclocker.com') || -1 !== url.indexOf('dev1.ezclocker.com') || -1 !== url.indexOf('dev2.ezclocker.com')) {
            return 'DEV';
        }

        if (-1 !== url.indexOf('qal.ezclocker.com')) {
            return 'QAL';
        }

        if (-1 !== url.indexOf('stage.ezclocker.com') || -1 !== url.indexOf('stg.ezclocker.com')) {
            return 'STG';
        }

        return 'PRD';
    }

    /**
     * Obtains the current environment
     *
     * @returns {Promise.resolve}
     */
    ezGetEnvironment() {
        let self = ezApi.ezclocker[EzFeatureToggles.ezApiName];

        return ezApi.ezResolver((resolve) => ezApi.ezclocker.http.ezGet('/version').then(
            (response) => {
                self.ezEnvironment = ezApi.ezStringHasLength(response.ezClockerEnv)
                    ? response.ezClockerEnv
                    : 'prd';

                let urlEnv = self.ezGetEnvironmentFromUrl();
                if (urlEnv.toLowerCase() !== self.environment && 'STG' === urlEnv || 'QAL' === urlEnv || 'LOC' === urlEnv) {
                    self.ezEnvironment = ezApi.ezclocker.ezUrlHelper.ezGetEnvironmentFromUrl().toLowerCase();
                }

                return resolve(self.ezEnvironment);
            },
            (eResponse) => {
                if (ezApi.ezIsTrue(self.ezDebugMode)) {
                    ezApi.ezclocker.logger.error(ezApi.ezTemplate`
                        Unable to determine the current deployment environment. Error: ${ezApi.ezToJson(eResponse)}`);
                } else {
                    ezApi.ezclocker.logger.warn(
                        'EzFeatureToggles: Environment information was not available. Defaulting to enviornment PRD');
                }

                self.ezEnvironment = 'prd';
                return resolve(self.ezEnvironment);
            }));
    }

    ezLogMetricPreferences() {
        let self = ezApi.ezclocker[EzMetrics.ezApiName];

        if (self.ezLoadMetricPreferencesFromDB()) {
            return self.ezApplyMetricPreferences();
        }

        if (self.ezLoadMetricPreferencesFromCookies()) {
            return self.ezApplyMetricPreferences();
        }

        self.ezShowMetricsPreferencesBanner();
    }

    ezLoadMetricPreferencesFromCookies() {
        /* TODO:
            Load metric cookie preferences.
            If exist, apply the preferences.
            If not exist, show the metrics preferences banner.
        */
    }

    ezLoadMetricPreferencesFromDB() {
        /* TODO:
            Determine if an ezClocker sesesion is valid.
            If session is valid, read metrics preferences
            If no metric preferences set for user in db, read
            metric preferences from cookes
            if no metric preferences in cookies,
            show the metrics preferences banner.

            Resolve if user session,
            reject if no user session
        */
    }

    ezShowMetricsPreferencesBanner() {
        let self = ezApi.ezclocker[EzMetrics.ezApiName];

        ezApi.ezContent('body', ezApi.ezTemplate`
            <style id="EzPrivacyPreferencesBannerStyles">
                .ezPrivacyPreferencesBanner {
                    display: block;
                    position: fixed;
                    bottom: 0px;
                }
            </style>
            <div id="EzPrivacyPreferencesBanner" class="ezPrivacyPreferencesBanner" style="display:none">
                <div id="EzPrivacyPreferencesBannerText">
                </div>
                <div id="EzPrivacyPreferencesBannerTextActionContainer">
                    <button id="EzPrivacyPreferencesBannerViewSettingsButton">
                        Cookie Settings
                    </button>
                    <button id="EzPrivacyPreferencesBannerAcceptButton">
                        Accept
                    </button>
                </div>
            </div>`);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'EzPrivacyPreferencesBannerViewSettingsButton',
            EzElementEventName.CLICK,
            EzMetrics.ezApiName,
            self.ezHandleEzPrivacyPreferencesBannerViewSettingsButton);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'EzPrivacyPreferencesBannerAcceptButton',
            EzElementEventName.CLICK,
            EzMetrics.ezApiName,
            self.ezHandleEzPrivacyPreferencesBannerAcceptButtonClick);

        ezUi.ezShowElementAnimated(
            'EzPrivacyPreferencesBanner',
            'slideInUp',
            'block');
    }

    ezHideMetricsPreferencesBanner() {
        ezUi.ezRemoveElement('EzPrivacyPreferencesBanner');
        ezUi.ezRemoveElement('EzPrivacyPreferencesBannerStyles');
    }

    ezHandleEzPrivacyPreferencesBannerViewSettingsButton() {
        let self = ezApi.ezclocker[EzMetrics.ezApiName];

        self.ezHideMetricsPreferencesBanner();

        ezApi.ezclocker.ezPrivacyPreferencesDialog.ezShow()
            .then(self.ezLoadMetricPreferences());

        /* TODO:
            Hook dialog cancel/close and accept events
            Either apply the settings (if accept) or
            re-show the banner.
        */
    }

    ezHandleEzPrivacyPreferencesBannerAcceptButtonClick() {
        let self = ezApi.ezclocker[EzMetrics.ezApiName];

        self.ezHideMetricsPreferencesBanner();

        self.ezApplyDefaultMetricPreferences();

        self.ezLoadMetricPreferences();
    }

    ezApplyDefaultMetricPreferences() {
        ezApi.ezclocker.ezFacebookMetrics.ezApplyDefaultMetricPreferences();
        ezApi.ezclocker.ezGoogleMetrics.ezApplyDefaultMetricPreferences();
    }

    ezApplySelectedMetricPreferences() {
        ezApi.ezclocker.ezFacebookMetrics.ezApplySelectedMetricPreferences();
        ezApi.ezclocker.ezGoogleMetrics.ezApplySelectedMetricPreferences();
    }
}
EzMetrics.ezApiName = 'ezMetrics';

document.addEventListener('onEzApiReady', () => ezApi.ezRegisterNewApi(EzMetrics, EzMetrics.ezApiName));

export {
    EzMetrics
};
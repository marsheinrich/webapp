import { EzMetricInfo } from '/public/widgets/EzMetrics/EzMetricInfo.js';

class EzFacebookMetrics {
    constructor() {
        this.ready = false;
        this.ezTypeName = 'EzFacebookMetrics';

        this.ezMetricPreferences = EzFacebookMetrics.DEFAULT_PREFERENCES;

        this.ezMetricInfo = null;
    }

    /**
        @protected
        Initializes EzFacebookMetrics
        @returns {EzFacebookMetrics}
     */
    ezInit() {
        let self = ezApi.ezclocker[EzFacebookMetrics.ezApiName];

        self.ezMetricInfo = new EzMetricInfo('Facebook');

        self.ezMetricInfo.setDescription(ezApi.ezTemplate``);

        self.ezMetricInfo.setDataCollectedStatement(ezApi.ezTemplate``);

        self.ezMetricInfo.setDataSharingStatement(ezApi.ezTemplate``);

        self.ezMetricInfo.setDataPrivacyStatement(ezApi.ezTemplate``);

        self.ezMetricInfo.setDataSecurityStatement(ezApi.ezTemplate``);

        self.ezApplyDefaultMetricPreferences();

        this.ready = true;
        return this;
    }

    /**
        @protected
        Builds the facebook metrics information html
        @returns {String}
     */
    ezBuildFacebookMetricsInfoHtml() {
        return ezApi.ezclocker[EzFacebookMetrics.ezApiName].ezMetricInfo.ezBuildMetricInfoHTML();
    }

    /**
        @public
        Applies the default metric preferences
     */
    ezApplyDefaultMetricPreferences() {
        let self = ezApi.ezclocker[EzFacebookMetrics.ezApiName];

        self.ezMetricPreferences = EzFacebookMetrics.DEFAULT_PREFERENCES;
        self.ezApplyMetricPreferences();
    }

    /**
        @public
        Applies the default metric preferences
     */
    ezApplySelectedMetricPreferences(selectedPreferences) {
        let self = ezApi.ezclocker[EzFacebookMetrics.ezApiName];

        if (!ezApi.ezIsValid(selectedPreferences)) {
            return;
        }

        self.ezMetricPreferences = selectedPreferences;
        self.ezApplyMetricPreferences();
    }

    /**
        @public
        Applies the current metric preferences
     */
    ezApplyMetricPreferences() {
        let self = ezApi.ezclocker[EzFacebookMetrics.ezApiName];

        if (ezApi.ezIsTrue(self.ezMetricPreferences.enabled)) {
            ezApi.ezclocker.ezFacebookPixel.ezEnable();
        } else {
            ezApi.ezclocker.ezFacebookPixel.ezDisable();
        }
    }
}
EzFacebookMetrics.ezApiName = 'EzFacebookMetrics';
EzFacebookMetrics.DEFAULT_PREFERENCES = {
    enabled: false
};

document.addEventListener('onEzApiReady', () => ezApi.ezRegisterNewApi(EzFacebookMetrics, EzFacebookMetrics.ezApiName));

export {
    EzFacebookMetrics
};
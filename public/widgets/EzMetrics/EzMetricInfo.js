export class EzMetricsInfo {
    constructor(ezMetricsId) {
        this.ezTypeName = 'EzMetricsInfo';

        if (!ezApi.ezStringHasLength(ezMetricsId)) {
            throw ezApi.ezBadParam(
                'ezMetricsId',
                this.ezTypeName,
                'constructor');
        }

        this.ezMetricsId = ezMetricsId;

        this.description = '';
        this.dataCollectedStatement = '';
        this.dataSharingStatement = '';
        this.dataPrivacyStatement = '';
        this.dataSecurityStatement = '';

        this.enabled = false;

        let date = new Date();
        this.ezInternalId = ezApi.ezIdTemplate`
            ${this.ezTypeName}
            .${this.ezMetricsId}
            .${date.getUTCFullYear().toString()}
            .${date.getUTCHours().toString()}
            .${date.getUTCMinutes().toString()}
            .${date.getUTCSeconds().toString()}
            .${date.getUTCMilliseconds().toString()}`;

        // Register events
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            this.ezInternalId,
            EzMetricsInfo.onMetricEnabled);
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            this.ezInternalId,
            EzMetricsInfo.onMetricEnabled);
    }

    setEnabled(value) {
        if (this.enabled !== ezApi.ezIsTrue(value)) {
            this.enabled = ezApi.ezIsTrue(value);

            let eventName = EzMetricsInfo.onMetricDisabled;
            let eventMessage = ezApi.ezMsg`Metric ${this.ezMetricId} disabled`;
            if (ezApi.ezIsTrue(this.enabled)) {
                eventName = EzMetricsInfo.onMetricEnabled;
                eventMessage = ezApi.ezMsg`Metric ${this.ezMetricId} enabled`;
            }

            ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
                eventName,
                ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                    this.ezInternalId,
                    eventMessage,
                    {
                        ezMetricInfo: this,
                        enabled: this.enabled
                    }));
        }
    }

    setDescription(value) {
        if (!ezApi.ezStringHasLength(value)) {
            return;
        }

        this.description = value;
    }

    setDataCollectedStatement(value) {
        if (!ezApi.ezStringHasLength(value)) {
            return;
        }

        this.dataCollectedStatement = value;
    }

    setDataSharingStatement(value) {
        if (!ezApi.ezStringHasLength(value)) {
            return;
        }

        this.dataSharingStatement = value;
    }

    setDataPrivacyStatement(value) {
        if (!ezApi.ezStringHasLength(value)) {
            return;
        }

        this.dataPrivacyStatement = value;
    }

    setDataSecurityStatement(value) {
        if (!ezApi.ezStringHasLength(value)) {
            return;
        }

        this.dataSecurityStatement = value;
    }

    ezBuildMetricInfoHTML() {
        return ezApi.ezTemplate`
            ${this.description}
            ${this.dataCollectedStatement}
            ${this.dataSharingStatement}
            ${this.dataPrivacyStatemen}
            ${this.dataSecurityStatement}`;
    }
}

EzMetricsInfo.ezEvents = {
    onMetricEnabled: 'ezOnMetricEnabled',
    onMetricDisabled: 'ezOnMetricDisabled'
};
// <script src="public/javascript/common/ez-performance-metric.js"></script>

/* exported EzPerf */
/**
 * @public
 * Provides the ability to track performance in the JS code. User must create an instance, does not auto-create
 * in ezApi
 */
function EzPerf(maintainHistory) {
    this.ready = false;
    this.metrics = {};
    this.maintainHistory = ezApi.ezIsTrue(maintainHistory);
    return this;
}

/**
 * @public
 * Registers the start moment for the metric with the provided name.
 * @param {string} metricName
 * @param {string|null} startId
 * @returns {object}
 * Returns the metric object
 */
EzPerf.prototype.ezStart = function(metricName, eventId) {
    var self = this;
    return ezApi.ezPromise(function(resolve) {
        metricName = ezApi.isEmptyString(metricName) ? ezApi.p.ezDateTime.ezNow().format('x') : metricName;
        eventId = ezApi.isEmptyString(eventId) ? '' : eventId;
        var metricId = ezApi.isEmptyString(eventId) ? metricName : metricName + ':' + eventId;

        var startMoment = ezApi.p.ezDateTime.ezNow();
        if (ezApi.isNotValid(self.metrics[metricName])) {
            self.metrics[metricName] = {
                id: metricName,
                startMoment: startMoment,
                endMoment: startMoment,
                duration: 0,
                totalDuration: 0,
                metricHistory: []
            };
        } else {
            self.metrics[metricName].startMoment = startMoment;
            self.metrics[metricName].endMoment = startMoment;
        }

        ezApi.p.logger.info('==> [' + metricId + '] START=' + startMoment.format('x'));
        return resolve(self.metrics[metricName]);
    });
};

/**
 * @public
 * Registers the stop moment for the metric with the provided name.
 * @param {string} metricName
 * @returns {object}
 * Returns the metric object
 */
EzPerf.prototype.ezStop = function(metricName, eventId) {
    var endMoment = ezApi.p.ezDateTime.ezNow();
    metricName = ezApi.isEmptyString(metricName) ? ezApi.p.ezDateTime.ezNow().format('x') : metricName;
    eventId = ezApi.isEmptyString(eventId) ? '' : eventId;
    var metricId = ezApi.isEmptyString(eventId) ? metricName : metricName + ':' + eventId;

    if (!ezApi.isValid(this.metrics[metricName])) {
        ezApi.p.logger.error('Registration of the start time for metric ' + metricName +
            ' was not available before stop time was registered.');
        this.ezRegisterStartTime(metricName);
        this.metrics[metricName].start = endMoment;
    }
    this.metrics[metricName].endMoment = endMoment;

    var duration = this.ezCalculateDuration(
        this.metrics[metricName].startMoment,
        this.metrics[metricName].endMoment);
    this.metrics[metricName].duration = duration;
    this.metrics[metricName].totalDuration += duration;
    if (this.maintainHistory) {
        this.metrics[metricName].metricHistory.push({
            metricEventId: eventId,
            eventDuration: duration
        });
    }

    ezApi.p.logger.info('==> [' + metricId + '] END=' + endMoment.format('x'));
    ezApi.p.logger.info('==> [' + metricId + '] DURATION=' + duration);
    ezApi.p.logger.info('==> [' + metricId + '] TOTAL DURATION=' + this.metrics[metricName].totalDuration);
    return this.metrics[metricName];
};
/**
 * @public
 * Returns the number of milliseconds between the two provided moments
 * @param {moment} startMoment
 * @param {moment} endMoment
 * @returns {int}
 * Number of milliseconds of duration
 */
EzPerf.prototype.ezCalculateDuration = function(startMoment, endMoment) {
    if (ezApi.isNotValid(startMoment) || ezApi.isNotValid(endMoment)) {
        return 0;
    }

    var duration = moment.duration(endMoment.diff(startMoment));
    return duration.asMilliseconds();
};

/**
 * @public
 * Removes the metric from storage
 * @param {string} metricName
 */
EzPerf.prototype.ezRemoveMetric = function(metricName) {
    if (ezApi.isValid(this.metrics[metricName])) {
        delete this.metrics[metricName];
    }
};

/**
 * @public
 * Updates the totals for all metrics
 */
EzPerf.prototype.ezUpdateTotals = function() {
    Object.keys(this.metrics).forEach(function(key) {
        this.metrics[key].total = this.metrics[key].start.from(this.metrics[key].end);
    });
};

/**
 * @public
 * Generates a JSON object with all the metric data.
 * @returns {object}
 */
EzPerf.prototype.ezDisplayAllData = function() {
    this.ezUpdateTotals();
    var metricDisplay = {
        description: 'Performance Metrics Data',
        date: 'Generated on ' + ezApi.p.ezDateTime.ezNow().format('MM/DD/YYYY KK:mm:ss'),
        data: this.metrics
    };

    ezApi.p.logger.info('EzClocker Performance Metrics: ' + ezApi.ezToJson(metricDisplay, 2));
    return metricDisplay;
};
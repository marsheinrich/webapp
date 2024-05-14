/* exported EzTz */
/**
 * @public
 * Ezclocker Timezone Object
 * @returns {EzTz}
 */
function EzTz() {
    this.ready = false;

    this.DSTInfo = {
        dstStartMonth: 3,
        dstStartSundayCount: 2,
        dstStartDescription: 'DST stars on the 2nd Sunday in March',
        dstEndMonth: 11,
        dstEndSundayCount: 1,
        dstEndDescription: 'DST ends on the 1st Sunday in November'
    };

    this.StandardTimeZones = {
        LOC: {
            'value': 'Default Browser Timezone',
            'abbr': '',
            'dst': 'LOC',
            'offset': null,
            'isdst': true,
            'text': '',
            'utc': []
        },
        AKST: {
            'value': 'Alaskan Standard Time',
            'abbr': 'AKST',
            'dst': 'AKDT',
            'offset': -9,
            'isdst': true,
            'text': '(UTC-09:00) Alaska',
            'utc': [
                'America/Anchorage',
            ]
        },
        CST: {
            'value': 'Central Standard Time',
            'abbr': 'CST',
            'dst': 'CDT',
            'offset': -6,
            'isdst': false,
            'text': '(UTC-06:00) Central Time (US & Canada)',
            'utc': [
                'America/Chicago',
            ]
        },
        EST: {
            'value': 'Eastern Standard Time',
            'abbr': 'EST',
            'dst': 'EDT',
            'offset': -5,
            'isdst': false,
            'text': '(UTC-05:00) Eastern Time (US & Canada)',
            'utc': [
                'America/New_York',
            ]
        },
        HST: {
            'value': 'Hawaiian Standard Time',
            'abbr': 'HST',
            'dst': 'HST',
            'offset': -10,
            'isdst': false,
            'text': '(UTC-10:00) Hawaii',
            'utc': [
                'Pacific/Honolulu'
            ]
        },
        MST: {
            'value': 'Mountain Standard Time',
            'abbr': 'MST',
            'dst': 'MDT',
            'offset': -7,
            'isdst': false,
            'text': '(UTC-07:00) Mountain Time (US & Canada)',
            'utc': [
                'America/Denver',
            ]
        },
        PST: {
            'value': 'Pacific Standard Time',
            'abbr': 'PST',
            'dst': 'PDT',
            'offset': -8,
            'isdst': false,
            'text': '(UTC-08:00) Pacific Time (US & Canada)',
            'utc': [
                'America/Los_Angeles',
            ]
        },
        UTC: {
            'value': 'UTC',
            'abbr': 'UTC',
            'dst': 'UTC',
            'offset': 0,
            'isdst': false,
            'text': '(UTC) Coordinated Universal Time',
            'utc': [
                'UTC'
            ]
        }
    };

    this.DaylightTimeZones = {
        LOC: {
            'value': 'Default Browser Timezone',
            'abbr': 'LOC',
            'st': 'LOC',
            'offset': null,
            'isdst': true,
            'text': '',
            'utc': []
        },
        AKDT: {
            'value': 'Alaskan Daylight Time',
            'abbr': 'AKDT',
            'st': 'AKST',
            'offset': -8,
            'isdst': true,
            'text': '(UTC-08:00) Alaska',
            'utc': [
                'America/Anchorage',
            ]
        },
        CDT: {
            'value': 'Central Daylight Time',
            'abbr': 'CDT',
            'st': 'CST',
            'offset': -5,
            'isdst': true,
            'text': '(UTC-05:00) Central Daylight Time (US & Canada)',
            'utc': [
                'America/Chicago',
            ]
        },
        EDT: {
            'value': 'Eastern Daylight Time',
            'abbr': 'EDT',
            'st': 'EST',
            'offset': -4,
            'isdst': true,
            'text': '(UTC-04:00) Eastern Daylight Time (US & Canada)',
            'utc': [
                'America/New_York',
            ]
        },
        HST: {
            'value': 'Hawaiian Standard Time',
            'abbr': 'HST',
            'st': 'HST',
            'offset': -10,
            'isdst': false,
            'text': '(UTC-10:00) Hawaii',
            'utc': [
                'Pacific/Honolulu'
            ]
        },
        MDT: {
            'value': 'Mountain Daylight Time',
            'abbr': 'MDT',
            'st': 'MST',
            'offset': -6,
            'isdst': true,
            'text': '(UTC-07:00) Mountain Daylight Time (US & Canada)',
            'utc': [
                'America/Denver',
            ]
        },
        PDT: {
            'value': 'Pacific Daylight Time',
            'abbr': 'PDT',
            'st': 'PST',
            'offset': -7,
            'isdst': true,
            'text': '(UTC-07:00) Pacific Time (US & Canada)',
            'utc': [
                'America/Los_Angeles',
            ]
        },
        UTC: {
            'value': 'UTC',
            'abbr': 'UTC',
            'st': 'UTC',
            'offset': 0,
            'isdst': false,
            'text': '(UTC) Coordinated Universal Time',
            'utc': [
                'UTC'
            ]
        }
    };

    return this;
}

/**
 * @protected
 * Initializes EzTz
 * @returns {EzTz}
 */
EzTz.prototype.ezInit = function() {
    var self = ezApi.p.ezTz;

    // Setup the default time-zone setting
    var localTz = self.ezBrowserTimezone();
    if (self.ezIsDstActive) {
        self.DaylightTimeZones.LOC.abbr = localTz;
        self.DaylightTimeZones.LOC.text = localTz;
        self.DaylightTimeZones.utc.push(localTz);
    } else {
        self.StandardTimeZones.LOC.abbr = localTz;
        self.StandardTimeZones.LOC.text = localTz;
        self.StandardTimeZones.utc.push(localTz);
    }

    self.ready = true;
    return self;
};

/**
 * @public
 * Returns the Daylight time zone for the standard time zone
 * @param {string} stZone
 * @returns {object}
 */
EzTz.prototype.ezToStandardToDaylightTimeZone = function(stZone) {
    var self = ezApi.p.ezTz;

    if (ezApi.isEmptyString(stZone)) {
        return self.DaylightTimeZones.UTC;
    }

    stZone = stZone.toUpperCase();
    if (!ezApi.ezclocker.ezHasOwnProperty(self.StandardTimeZones, stZone)) {
        ezApi.p.logger.error('Standard time zone ' + stZone + ' is not a timezone supported by ezClocker.');
        return self.DaylightTimeZones.UTC;
    }

    var dst = self.StandardTimeZones[stZone].dst.toUpperCase();
    if (!ezApi.ezclocker.ezHasOwnProperty(self.DaylightTimeZones, dst)) {
        ezApi.p.logger.error('Daylight time zone ' + dst + ' is not a daylight time zone supported by ezClocker.');
    }
    return self.DaylightTimeZones[dst];
};

/**
 * @public
 * Returns the standard time zone for the daylight time zone
 * @param {string} dst
 * @returns {object}
 */
EzTz.prototype.ezToDaylightToStandardTimeZone = function(dst) {
    var self = ezApi.p.ezTz;

    if (ezApi.isEmptyString(dst)) {
        return self.StandardTimeZones.UTC;
    }

    dst = dst.toUpperCase();
    if (!ezApi.ezclocker.ezHasOwnProperty(self.DaylightTimeZones, dst)) {
        ezApi.p.logger.error('Daylight time zone ' + dst + ' is not a daylight time zone supported by ezClocker.');
        return self.StandardTimeZones.UTC;
    }

    var stZone = self.DaylightTimeZones[dst].st.toUpperCase();
    if (!ezApi.ezclocker.ezHasOwnProperty(self.StandardTimeZones, stZone)) {
        ezApi.p.logger.error('Standard time zone ' + stZone + ' is not a standard time zone supported by ezClocker.');
    }
    return self.StandardTimeZones[stZone];
};

/**
 * @public
 * Determines if DST is active or not
 * @returns {boolean}
 */
EzTz.prototype.ezIsDstActive = function() {
    var self = ezApi.p.ezTz;

    var aCurrentMoment = moment();
    var aMoment = moment().date(1);
    if (aMoment.month() >= self.DSTInfo.dstStartMonth - 1) {
        // DST start month detected...
        var startSundayCount = 0;
        while (startSundayCount !== self.DSTInfo.dstStartSundayCount) {
            if (aMoment.day() === 0) {
                startSundayCount++;
                if (startSundayCount !== self.DSTInfo.dstStartSundayCount) {
                    aMoment.add(1, 'd');
                }
            }
        }
        return aCurrentMoment.date() >= aMoment.date();
    }
    if (aMoment.month() <= self.DSTInfo.dstEndMonth - 1) {
        // DST end month detected...
        var endSundayCount = 0;
        while (endSundayCount !== self.DSTInfo.dstEndSundayCount) {
            if (aMoment.day() === 0) {
                endSundayCount++;
                if (endSundayCount !== self.DSTInfo.dstEndSundayCount) {
                    aMoment.add(1, 'd');
                }
            }
        }
        return aCurrentMoment.date() < aMoment.date();
    }

    return false;
};

/**
 * @public
 * Returns the guessed browser timezone
 */
EzTz.prototype.ezBrowserTimezone = function() {
    return moment.tz.guess(true);
};

/**
 * ezApi Registration
 */
document.addEventListener('onEzApiReady', function() {
    if (typeof ezApi === 'undefined' || !ezApi) {
        window.console.error('EzApi is required in ez-tz.js module.');
    }

    ezApi.ezRegisterPublic('ezTz', new EzTz());
    ezApi.p.ezTz.ezInit();
});
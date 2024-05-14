/* exported EzDateHelper */

/**
 * Provides date manipulation utilities
 */
function EzDateHelper() {
    this.ready = false;
}

/**
 * Returns the date that represents the Monday for the week the provided date is within. If the provided dateInWeek
 * is not valid, the method will act upon the current date.
 * @param {Date} dateInWeek
 */
EzDateHelper.prototype.ezFindMondayDateForDateInWeek = function(dateInWeek) {
    if (ezApi.isNotDate(dateInWeek)) {
        return this.ezFindMondayDateForDateInWeek(this.ezCurrentDate);
    }

    var day = dateInWeek.getDay();
    if (day === 0) {
        // sunday
        return new Date(dateInWeek.addDays(-6));
    }
    if (day === 1) {
        // Monday
        return dateInWeek;
    }

    return new Date(dateInWeek.addDays(-(day - 1)));
};

/**
 * Evaluates the passed dateString, if it is a valid date, the dateString is returned. Otherwise,
 * the current date is returned.
 * @param {string} dateString
 */
EzDateHelper.prototype.ezValidDateStringOrNow = function(dateString) {
    return this.ezValidDateString(dateString, this.ezCurrentDateString());
};

/**
 * Validates the pendingDateString, if valid, returns pendingDateString. Otherwise, returns defaultDateString *
 * @param {string} pendingDateString
 * @param {string} defaultDateString
 */
EzDateHelper.prototype.ezValidDateString = function(pendingDateString, defaultDateString) {
    try {
        var pendingDate = new Date(pendingDateString);
        if (pendingDate.toString() === 'Invalid Date') {
            return this.ezCurrentDateString();
        }
        return pendingDateString;
    } catch (ex) {
        return defaultDateString;
    }
};

/**
 * Returns the current time zone for the browser
 * Requires jstz-1.0.4.min.js
 */
EzDateHelper.prototype.ezCurrentTimeZone = function() {
    if (typeof jstz === 'undefined') {
        return 'UTC';
    }
    return jstz.determine().name(); // Determines the time zone of the browser client
};

/**
 * Gets the current date as a string
 * @returns {String}
 */
EzDateHelper.prototype.ezCurrentDateString = function() {
    var now = new Date();
    var day = now.getDay();
    if (day < 10) {
        day = '0' + day;
    }
    var month = now.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    var year = now.getFullYear();
    return month + '/' + day + '/' + year;
};

/**
 * Returns the current date as a Date object.
 */
EzDateHelper.prototype.ezCurrentDate = function() {
    return new Date();
};

/**
 * Returns a date from an ISO8601 String
 * @param isostr
 * @returns
 */
EzDateHelper.prototype.dateFromISO8601 = function(isostr) {
    var parts = isostr.match(/\d+/g);
    var year = parts[0];
    var month = parts[1];
    var day = parts[2];
    var hour = parts[3];
    var min = parts[4];
    var sec = parts[5];
    return new Date(year, month - 1, day, hour, min, sec, 0);
};

document.addEventListener('onEzApiReady', function() {
    if (typeof ezApi !== 'undefined' && ezApi) {
        ezApi.p['ezDateHelper'] = new EzDateHelper();
    }
});
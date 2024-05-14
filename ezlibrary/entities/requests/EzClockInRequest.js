import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzJSONSerializable } from '/ezlibrary/entities/EzJSONSerializable.js'

import { EzGpsDataStatus } from '/ezlibrary/EzGpsDataStatus.js';

/**
    EzClocker API clock in request entity
    Import with:
        import { EzClockInRequest } from '/ezlibrary/entities/requests/EzClockInRequest.js';
 */
export class EzClockInRequest extends EzJSONSerializable {
    /**
        @public @constructor
        Creates a new EzClockInRequest
        @param {Number} employerId
        @param {Number} employeeId
        @param {undefined|null|moment} clockInMoment
     */
    constructor(employerId, employeeId, clockInMoment) {
        super();

        if (!ezApi.ezIsNumber(employerId)) {
            throw new EzBadParamException(
                'employerId',
                this,
                this.constructor);
        }
        if (!ezApi.ezIsNumber(employeeId)) {
            throw new EzBadParamException(
                'employeeId',
                this,
                this.constructor);
        }

        if (!ezApi.ezIsValid(clockInMoment)) {
            clockInMoment = ezApi.ezDateTime.ezNow();
        }

        this.employerId = employerId;
        this.employeeId = employeeId;

        this.clockInIso = ezApi.ezclocker.ezDateTime.ezToIso(clockInMoment);
        this.clockInTimeZoneId = clockInMoment.tz();
    }

    /**
        @private @field
        @type {Number}
     */
    #employerId = null;

    /**
        @public @property @getter
        @returns {Number}
     */
    get employerId() {
        return this.#employerId;
    }

    /**
        @public @property @setter
        @param {Number}
     */
    set employerId(employerId) {
        this.#employerId = ezApi.ezNumberOrNull(employerId);
    }

    /**
        @private @field
        @type {Number}
     */
    #employeeId = null;

    /**
        @public @property @getter
        @returns {Number}
     */
    get employeeId() {
        return this.#employeeId;
    }

    /**
        @public @property @setter
        @param {Number}
     */
    set employeeId(employeeId) {
        this.#employeeId = ezApi.ezNumberOrNull(employeeId);
    }

    /**
        @private @field
        @type {Number}
     */
    #customerId = null;

    /**
        @public @property @getter
        @returns {Number}
     */
    get customerId() {
        return this.#customerId;
    }

    /**
        @public @property @setter
        @param {Number}
     */
    set customerId(customerId) {
        this.#customerId = ezApi.ezNumberOrNull(customerId);
    }

    /**
        @private @field
        @type {Number}
     */
    #scheduleId = null;

    /**
        @public @property @getter
        @returns {Number}
     */
    get scheduleId() {
        return this.#scheduleId;
    }

    /**
        @public @property @setter
        @param {Number}
     */
    set scheduleId(scheduleId) {
        this.#scheduleId = ezApi.ezNumberOrNull(scheduleId);
    }

    /**
        @private @field
        @type {Number}
     */
    #associatedScheduleId = null;

    /**
        @public @property @setter
        @param {Number}
     */
    get associatedScheduleId() {
        return this.#associatedScheduleId;
    }

    /**
        @public @property @getter
        @returns {Number}
     */
    set associatedScheduleId(associatedScheduleId) {
        this.#associatedScheduleId = ezApi.ezNumberOrNull(associatedScheduleId);
    }

    /**
        @private @field
        @type {String}
     */
    #clockInIso

    /**
        @public @property @getter
        @returns {String}
     */
    get clockInIso() {
        return this.#clockInIso;
    }

    /**
       @public @property @setter
       @param {String}
    */
    set clockInIso(clockInIso) {
        if (!ezApi.ezStringHasLength(clockInIso)) {
            throw new EzBadParamException(
                'clockInIso',
                this,
                this.clockInIso);
        }

        this.#clockInIso = clockInIso;
    }

    /**
        @private @field
        @type {String}
     */
    #clockInTimeZoneId = null;

    /**
        @public @property @getter
        @returns {String}
     */
    get clockInTimeZoneId() {
        if (!ezApi.ezStringHasLength(this.#clockInTimeZoneId)) {
            this.#clockInTimeZoneId = ezApi.ezStringHasLength(this.clockInIso)
                ? ezDateTime().ezFromIso(this.clockInIso).zone().name
                : ezDateTime().ezGetActiveTimeZoneId();
        }
        return this.#clockInTimeZoneId;
    }

    /**
        @public @property @setter
        @param {String}
     */
    set clockInTimeZoneId(clockInTimeZoneId) {
        if (!ezApi.ezStringHasLength(clockInTimeZoneId)) {
            clockInTimeZoneId = ezApi.ezStringHasLength(this.clockInIso)
                ? ezDateTime().ezFromIso(this.clockInIso).zone().name
                : ezDateTime().ezGetActiveTimeZoneId();
        }

        this.#clockInTimeZoneId = clockInTimeZoneId;
    }

    /**
        @private @field
        @type {String}
     */
    #clockInGpsStatus = EzGpsDataStatus.UNKNOWN;

    /**
        @public @property @getter
        @returns {String}
     */
    get clockInGpsStatus() {
        return this.#clockInGpsStatus;
    }

    /**
        @public @property @getter
        @returns {String}
     */
    get gpsDataStatus() {
        return this.clockInGpsStatus;
    }

    /**
        @public @property @setter
        @param {String}
     */
    set clockInGpsStatus(clockInGpsStatus) {
        this.#clockInGpsStatus = EzGpsDataStatus.ezAsEnum(clockInGpsStatus);
    }

    /**
        @public @property @setter
        @param {String}
     */
    set gpsDataStatus(gpsDataStatus) {
        this.clockInGpsStatus = gpsDataStatus;
    }

    /**
        @private @field
        @type {String}
     */
    #clockInGPSFailureMessage = null;

    /**
        @public @property @getter
        @returns {String}
     */
    get clockInGPSFailureMessage() {
        return this.#clockInGPSFailureMessage;
    }

    /**
        @public @property @setter
        @param {String}
     */
    set clockInGPSFailureMessage(clockInGPSFailureMessage) {
        this.#clockInGPSFailureMessage = ezApi.ezStringOrEmpty(clockInGPSFailureMessage);
    }

    /**
        @public @property @getter
        @returns {String}
     */
    get clockOutIso() {
        return this.#clockInIso;
    }

    /**
        @public @property @getter
        @returns {String}
     */
    get clockOutTimeZoneId() {
        return this.#clockInTimeZoneId;
    }

    /**
        @public @property @getter
        @returns {String}
     */
    get clockOutGpsStatus() {
        return EzGpsDataStatus.NOT_AVAILABLE;
    }

    /**
        @public @property @getter
        @returns {String}
     */
    get clockOutGPSFailureMessage() {
        return '';
    }

    /**
        @private @field
        @type {Boolean}
     */
    #isActiveClockIn = true;

    /**
        @public @property @getter
        @returns {Boolean}
     */
    get isActiveClockIn() {
        return this.#isActiveClockIn;
    }

    /**
        @public @property @setter
        @param {Boolean}
     */
    set isActiveClockIn(isActiveClockIn) {
        if (!ezApi.ezIsTrue(isActiveClockIn)) {
            // Must always be true for this request
            throw new EzBadParamException(
                'isActiveClockIn',
                this,
                this.isActiveClockIn);
        }

        this.#isActiveClockIn = isActiveClockIn;
    }

    /**
        @private @field
        @type {String}
     */
    #createdBy = '';

    /**
        @public @property @getter
        @returns {String}
     */
    get createdBy() {
        return this.#createdBy;
    }

    /**
        @public @property @setter
        @param {String}
     */
    set createdBy(createdBy) {
        this.#createdBy = ezApi.ezStringOrEmpty(createdBy);
    }

    /**
        @private @field
        @type {String}
     */
    #description = '';

    /**
        @public @property @getter
        @returns {String}
     */
    get description() {
        return this.#description;
    }

    /**
        @public @property @setter
        @param {String}
     */
    set description(description) {
        this.#description = ezApi.ezStringOrEmpty(description);
    }

    /**
        @private @field
        @type {String}
     */
    #notes = '';

    /**
        @public @property @getter
        @returns {String}
     */
    get notes() {
        return this.#notes;
    }

    /**
        @public @property @setter
        @param {String}
     */
    set notes(notes) {
        this.#notes = ezApi.ezStringOrEmpty(notes);
    }

    /**
        @private @field
        Stores the data tag maps array
        @type {Array}
     */
    #dataTagMaps = [];

    /**
        @public @property @getter
        Gets the data tag maps array
        @returns {Array}
     */
    get dataTagMaps() {
        return this.#dataTagMaps;
    }

    /**
        @public @property @getter
        Sets the data tag maps array
        @param {Array}
     */
    set dataTagMaps(dataTagMaps) {
        this.#dataTagMaps = ezApi.ezIsArray(dataTagMaps)
            ? dataTagMaps
            : [];
    }

    /**
        @private @field
        Stores the assigned jobs array
        @type {Array}
     */
    #assignedJobs = [];

    /**
        @public @property @getter
        Gets the assigned jobs array
        @returns {Array}
     */
    get assignedJobs() {
        return this.#assignedJobs;
    }

    /**
        @public @property @getter
        Sets the assigned jobs array
        @param {Array}
     */
    set assignedJobs(assignedJobs) {
        this.#assignedJobs = ezApi.ezIsArray(assignedJobs)
            ? assignedJobs
            : [];
    }

    /**
        @private @field
        Stores the job mappings array
        @type {Array}
     */
    #jobMappings = [];

    /**
        @public @property @getter
        Gets the job mappings array
        @returns {Array}
     */
    get jobMappings() {
        return this.#jobMappings;
    }

    /**
        @public @property @getter
        Sets the job mappings array
        @param {Array}
     */
    set jobMappings(jobMappings) {
        this.#jobMappings = ezApi.ezIsArray(jobMappings)
            ? jobMappings
            : [];
    }

    /**
        @public @property @getter
        @returns {String}
     */
    get targetDateTimeZone() {
        return ezApi.ezclocker.ezDateTime.ezGetActiveTimeZoneId();
    }

    /**
        @private @field
        Stores the longitude value.
        @type {String}
     */
    #longitude = null;

    /**
        @public @property @getter
        @returns {String}
     */
    get longitude() {
        return this.#longitude;
    }

    /**
        @public @property @setter
        @param {Number|String} longitude
     */
    set longitude(longitude) {
        if (ezApi.ezIsNumber(longitude)) {
            longitude = longitude.toString();
        }

        this.#longitude = ezApi.ezStringOrNull(longitude);
    }

    /**
        @private @field
        Stores the latitude value.
        @type {String}
     */
    #latitude = null;

    /**
        @public @property @getter
        @returns {String}
     */
    get latitude() {
        return this.#latitude;
    }

    /**
        @public @property @setter
        @param {Number|String} speed
     */
    set latitude(latitude) {
        if (ezApi.ezIsNumber(latitude)) {
            latitude = latitude.toString();
        }

        this.#latitude = ezApi.ezStringOrNull(latitude);
    }

    /**
        @private @field
        Stores the accuracy value.
        @type {String}
     */
    #accuracy = null;

    /**
        @public @property @getter
        @param {String}
     */
    get accuracy() {
        return this.#accuracy;
    }

    /**
        @public @property @setter
        @param {Number|String} accuracy
     */
    set accuracy(accuracy) {
        if (ezApi.ezIsNumber(accuracy)) {
            accuracy = accuracy.toString();
        }

        this.#accuracy = ezApi.ezStringOrNull(accuracy);
    }

    /**
        @private @field
        Stores the altitudeAccuracy value.
        @type {String}
     */
    #altitudeAccuracy = null;

    /**
        @public @property @getter
        @returns {String}
     */
    get altitudeAccuracy() {
        return this.#altitudeAccuracy;
    }

    /**
        @public @property @setter
        @param {Number|String} altitudeAccuracy
     */
    set altitudeAccuracy(altitudeAccuracy) {
        if (ezApi.ezIsNumber(altitudeAccuracy)) {
            altitudeAccuracy = altitudeAccuracy.toString();
        }

        this.#altitudeAccuracy = ezApi.ezStringOrNull(altitudeAccuracy);
    }

    /**
        @private @field
        Stores the altitude value.
        @type {String}
     */
    #altitude = null;

    /**
        @public @property @getter
        @returns {String}
     */
    get altitude() {
        return this.#altitude;
    }

    /**
        @public @property @setter
        @param {Number|String} altitude
     */
    set altitude(altitude) {
        if (ezApi.ezIsNumber(altitude)) {
            altitude = altitude.toString();
        }

        this.#altitude = ezApi.ezStringOrNull(altitude);
    }

    #heading

    /**
        @public @property @getter
        @returns {String}
     */
    get heading() {
        return this.#heading;
    }

    /**
        @public @property @setter
        @param {Number|String} heading
     */
    set heading(heading) {
        if (ezApi.ezIsNumber(heading)) {
            heading = heading.toString();
        }

        this.#heading = ezApi.ezStringOrNull(heading);
    }

    /**
        @private @field
        Stores the speed value.
        @type {String}
     */
    #speed = null;

    /**
        @public @property @getter
        @returns {String}
     */
    get speed() {
        return this.#speed;
    }

    /**
        @public @property @setter
        @param {Number|String} speed
     */
    set speed(speed) {
        if (ezApi.ezIsNumber(speed)) {
            speed = speed.toString();
        }

        this.#speed = ezApi.ezStringOrNull(speed);
    }

    /**
        @private @field
        Stores the time stamp for when the GPS information was obtained.
        @type {Number}
     */
    #geoTimestamp = null;

    /**
        @public @proeprty @getter
        Gets the time stamp for when the GPS information was obtained.
        @returns {Number}
     */
    get geoTimestamp() {
        return this.#geoTimestamp;
    }

    /**
        @public @proeprty @setter
        Sets the time stamp for when the GPS information was obtained.
        @param {Number}
     */
    set geoTimestamp(geoTimestamp) {
        this.#geoTimestamp = ezApi.ezNumberOrDefault(geoTimestamp, 0);
    }

    /**
        @private @field
        Stores the radius value.
        @type {String}
     */
    #radius = null;

    /**
        @public @property @getter
        @returns {String}
     */
    get radius() {
        return this.#radius;
    }

    /**
        @public @property @setter
        @param {Number|String} radius
     */
    set radius(radius) {
        if (ezApi.ezIsNumber(radius)) {
            radius = radius.toString();
        }

        this.#radius = ezApi.ezStringOrNull(radius);
    }

    /**
        @private @field
        Stores the gps source value.
        @type {String}
     */
    #gpsSource = 'BROWSER';

    /**
        @public @property @getter
        @returns {String}
     */
    get gpsSource() {
        return this.#gpsSource;
    }

    /**
        @public @property @setter
        @param {String}
     */
    set gpsSource(gpsSource) {
        this.#gpsSource = ezApi.ezStringOrDefault(gpsSource, 'BROWSER');
    }

    /**
        @private @field
        Stores the override location check value.
        @type {Boolean}
     */
    #overrideLocationCheck = false;

    /**
        @public @property @getter
        @returns {Boolean}
     */
    get overrideLocationCheck() {
        return this.#overrideLocationCheck;
    }

    /**
        @public @property @setter
        @param {Boolean}
     */
    set overrideLocationCheck(overrideLocationCheck) {
        this.#overrideLocationCheck = ezApi.ezIsTrue(overrideLocationCheck);
    }

    /**
        @private @field
        Stores the doNotAudit value.
        @type {Boolean}
     */
    #doNotAudit = false;

    /**
        @public @property @getter
        @returns {Boolean}
     */
    get doNotAudit() {
        return this.#doNotAudit;
    }

    /**
        @public @property @setter
        @param {Boolean}
     */
    set doNotAudit(doNotAudit) {
        this.#doNotAudit = ezApi.ezIsTrue(doNotAudit);
    }

    /**
        @private @field
        Stores the source value.
        @type {String}
     */
    #source = 'WEBSITE';

    /**
        @public @property @getter
        @returns {String}
     */
    get source() {
        return this.#source;
    }

    /**
        @public @property @getter
        @param {String} source
     */
    set source(source) {
        this.#source = ezApi.ezStringOrDefault(source, 'WEBSITE');
    }

    /**
        @public @readonly @property
        Returns the local time as an iso string
        @returns {String}
     */
    get locTime() {
        return ezApi.ezclocker.ezDateTime.ezNowAsIso();
    }

    /**
        @override
        @public @readonly @property
        Returns this instance as a JSON Object (will no longer have the getter/setter methods).
        Useful for serailization to JSON.
        @returns {object}
     */
    get asJSONObject() {
        return {
            employerId: this.employerId,
            employeeId: this.employeeId,
            customerId: this.customerId,
            scheduleId: this.scheduleId,
            associatedScheduleId: this.associatedScheduleId,
            assignedJobs: this.assignedJobs,
            jobMappings: this.jobMappings,
            dataTagMaps: this.dataTagMaps,
            isActiveClockIn: this.isActiveClockIn,
            clockInIso: this.clockInIso,
            clockInTimeZoneId: this.clockInTimeZoneId,
            clockInGpsStatus: this.clockInGpsStatus,
            gpsDataStatus: this.gpsDataStatus,
            clockInGPSFailureMessage: this.clockInGPSFailureMessage,
            notes: this.notes,
            description: this.description,
            overrideLocationCheck: this.overrideLocationCheck,
            doNotAudit: this.doNotAudit,
            createdBy: this.createdBy,
            locTime: this.locTime,
            gpsSource: this.gpsSource,
            geoTimestamp: this.geoTimestamp,
            latitude: this.latitude,
            longitude: this.longitude,
            accuracy: this.accuracy,
            altitude: this.altitude,
            altitudeAccuracy: this.altitudeAccuracy,
            heading: this.heading,
            radius: this.radius,
            speed: this.speed,
            targetDateTimeZone: this.targetDateTimeZone,
            source: this.source
        };
    }

    /**
        @override
        @public @readonly @property
        Returns this instance as JSON string (no formatting)
        @returns {String}
     */
    get asJSON() {
        return super.asJSON;
    }

    /**
        @override
        @public @method
        Converts this instance into a JSON string with optional formatting.
        @param {undefined|null|Number} indentValue
        @param {undefined|null|Boolean} htmlDisplay
        @returns {String}
     */
    ezToJSON(indentValue, htmlDisplay) {
        return super.ezToJSON(indentValue, htmlDisplay);
    }

    /**
        @override
        @public @method
        Copies properties from the provided jsonObject to this instance (even if this instance does not define the property)
        @param {Object} jsonObject
        @returns {Object}
        Returns this instance with the key & values from the provided jsonObject.
     */
    ezFromJSONObject(jsonObject) {
        return super.ezFromJSONObject(jsonObject);
    }

    /**
        @override
        @public @method
        Converts the provided jsonString to a JSON object and then
        passes that object to ezFromJSONObject() to copies properties to this instance
        (even if this instance does not define the property)
        @param {String} jsonString
        @returns {Object}
        Returns this instance with the key & values from the provided json string.
     */
    ezLoadFromJson(jsonString) {
        return super.ezLoadFromJson(jsonString);
    }
}

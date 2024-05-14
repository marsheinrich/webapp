import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzJSONSerializable } from '/ezlibrary/entities/EzJSONSerializable.js'

import { EzGpsDataStatus } from '/ezlibrary/EzGpsDataStatus.js';

/**
    EzClocker API clock out request entity
    Import with:
        import { EzClockOutRequest } from '/ezlibrary/entities/requests/EzClockOutRequest.js';
 */
export class EzClockOutRequest extends EzJSONSerializable {
    /**
        @public @constructor
        Creates a new EzClockOutRequest instance
        @param {undefined|null|moment} clockOutMOment
     */
    constructor(clockOutMOment) {
        super();

        if (!ezApi.ezIsValid(clockOutMOment)) {
            clockOutMOment = ezApi.ezDateTime.ezNow();
        }


        this.clockOutIso = ezApi.ezclocker.ezDateTime.ezToIso(clockOutMOment);
        this.clockOutTimeZoneId = clockOutMOment.tz();
    }

    #employerId = null;

    get employerId() {
        return this.#employerId;
    }

    set employerId(employerId) {
        this.#employerId = ezApi.ezNumberOrNull(employerId);
    }

    #employeeId = null;

    get employeeId() {
        return this.#employeeId;
    }

    set employeeId(employeeId) {
        this.#employeeId = ezApi.ezNumberOrNull(employeeId);
    }

    #customerId = null;

    get customerId() {
        return this.#customerId;
    }

    set customerId(customerId) {
        this.#customerId = ezApi.ezNumberOrNull(customerId);
    }

    #scheduleId = null;

    get scheduleId() {
        return this.#scheduleId;
    }

    set scheduleId(scheduleId) {
        this.#scheduleId = ezApi.ezNumberOrNull(scheduleId);
    }

    #associatedScheduleId = null;

    get associatedScheduleId() {
        return this.#associatedScheduleId;
    }

    set associatedScheduleId(associatedScheduleId) {
        this.#associatedScheduleId = ezApi.ezNumberOrNull(associatedScheduleId);
    }

    #clockInIso

    get clockInIso() {
        return this.#clockInIso;
    }

    set clockInIso(clockInIso) {
        if (!ezApi.ezStringHasLength(clockInIso)) {
            throw new EzBadParamException(
                'clockInIso',
                this,
                this.clockInIso);
        }

        this.#clockInIso = clockInIso;
    }

    #clockInTimeZoneId = null;

    get clockInTimeZoneId() {
        if (!ezApi.ezStringHasLength(this.#clockInTimeZoneId)) {
            this.#clockInTimeZoneId = ezApi.ezStringHasLength(this.clockInIso)
                ? ezDateTime().ezFromIso(this.clockInIso).zone().name
                : ezDateTime().ezGetActiveTimeZoneId();
        }
        return this.#clockInTimeZoneId;
    }

    set clockInTimeZoneId(clockInTimeZoneId) {
        if (!ezApi.ezStringHasLength(clockInTimeZoneId)) {
            clockInTimeZoneId = ezApi.ezStringHasLength(this.clockInIso)
                ? ezDateTime().ezFromIso(this.clockInIso).zone().name
                : ezDateTime().ezGetActiveTimeZoneId();
        }

        this.#clockInTimeZoneId = clockInTimeZoneId;
    }

    #clockInGpsStatus = EzGpsDataStatus.UNKNOWN;

    get clockInGpsStatus() {
        return this.#clockInGpsStatus;
    }
    get gpsDataStatus() {
        return this.clockInGpsStatus;
    }

    set clockInGpsStatus(clockInGpsStatus) {
        this.#clockInGpsStatus = EzGpsDataStatus.ezAsEnum(clockInGpsStatus);
    }
    set gpsDataStatus(gpsDataStatus) {
        this.clockInGpsStatus = gpsDataStatus;
    }

    #clockInGPSFailureMessage = null;

    get clockInGPSFailureMessage() {
        return this.#clockInGPSFailureMessage;
    }

    set clockInGPSFailureMessage(clockInGPSFailureMessage) {
        this.#clockInGPSFailureMessage = ezApi.ezStringOrEmpty(clockInGPSFailureMessage);
    }

    #clockOutIso;

    get clockOutIso() {
        return this.#clockOutIso;
    }

    #clockOutTimeZoneId;

    get clockOutTimeZoneId() {
        return this.#clockOutTimeZoneId;
    }

    #clockOutGpsStatus = EzGpsDataStatus.NOT_AVAILABLE;

    get clockOutGpsStatus() {
        return clockOutGpsStatus;
    }

    #clockOutGPSFailureMessage = '';

    get clockOutGPSFailureMessage() {
        return clockOutGPSFailureMessage;
    }

    #isActiveClockIn = true;

    get isActiveClockIn() {
        return this.#isActiveClockIn;
    }

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

    #modifiedBy = '';

    get modifiedBy() {
        return this.#modifiedBy;
    }

    set modifiedBy(modifiedBy) {
        this.#modifiedBy = ezApi.ezStringOrEmpty(modifiedBy);
    }

    #description = '';

    get description() {
        return this.#description;
    }

    set description(description) {
        this.#description = ezApi.ezStringOrEmpty(description);
    }

    #notes = '';

    get notes() {
        return this.#notes;
    }

    set notes(notes) {
        this.#notes = ezApi.ezStringOrEmpty(notes);
    }

    #dataTagMaps = [];

    get dataTagMaps() {
        return this.#dataTagMaps;
    }

    set dataTagMaps(dataTagMaps) {
        this.#dataTagMaps = ezApi.ezArrayOrEmpty(dataTagMaps);
    }

    #assignedJobs = [];

    get assignedJobs() {
        return this.#assignedJobs;
    }

    set assignedJobs(assignedJobs) {
        this.#assignedJobs = ezApi.ezArrayOrEmpty(assignedJobs);
    }

    #jobMappings = [];

    get jobMappings() {
        return this.#jobMappings;
    }

    set jobMappings(jobMappings) {
        this.#jobMappings = ezApi.ezArrayOrEmpty(jobMappings);
    }

    get targetDateTimeZone() {
        return ezApi.ezclocker.ezDateTime.ezGetActiveTimeZoneId();
    }

    #longitude = null;

    get longitude() {
        return this.#longitude;
    }

    set longitude(longitude) {
        this.#longitude = ezApi.ezNumberOrNull(longitude);
    }

    #latitude = null;

    get latitude() {
        return this.#latitude;
    }

    set latitude(latitude) {
        this.#latitude = ezApi.ezNumberOrNull(latitude);
    }

    #accuracy = null;

    get accuracy() {
        return this.#accuracy;
    }

    set accuracy(accuracy) {
        this.#accuracy = ezApi.ezNumberOrNull(accuracy);
    }

    #altitudeAccuracy = null;

    get altitudeAccuracy() {
        return this.#altitudeAccuracy;
    }

    set altitudeAccuracy(altitudeAccuracy) {
        this.#altitudeAccuracy = ezApi.ezNumberOrNull(altitudeAccuracy);
    }

    #altitude = null;

    get altitude() {
        return this.#altitude;
    }

    set altitude(altitude) {
        this.#altitude = ezApi.ezNumberOrNull(altitude);
    }

    #speed = null;

    get speed() {
        return this.#speed;
    }

    set speed(speed) {
        this.#speed = ezApi.ezNumberOrNull(speed);
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
        this.#geoTimestamp = ezApi.ezNumberOrNull(geoTimestamp);
    }

    #radius = null;

    get radius() {
        return this.#radius;
    }

    set radius(radius) {
        this.#radius = ezApi.ezNumberOrNull(radius);
    }

    #gpsSource = 'BROWSER';

    get gpsSource() {
        return this.#gpsSource;
    }

    set gpsSource(gpsSource) {
        this.#gpsSource = ezApi.ezStringOrDefault(gpsSource, 'BROWSER');
    }

    #overrideLocationCheck = false;

    get overrideLocationCheck() {
        return this.#overrideLocationCheck;
    }

    set overrideLocationCheck(overrideLocationCheck) {
        this.#overrideLocationCheck = ezApi.ezIsTrue(overrideLocationCheck);
    }

    #doNotAudit = false;

    get doNotAudit() {
        return this.#doNotAudit;
    }

    set doNotAudit(doNotAudit) {
        this.#doNotAudit = ezApi.ezIsTrue(doNotAudit);
    }

    #source = 'WEBSITE';

    get source() {
        return this.#source;
    }

    set source(source) {
        this.#source = ezApi.ezStringOrDefault(source, 'WEBSITE');
    }

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
            clockInGPSFailureMessage: this.clockInGPSFailureMessage,
            clockOutIso: this.clockOutIso,
            clockOutTimeZoneId: this.clockOutTimeZoneId,
            clockOutGpsStatus: this.clockOutGpsStatus,
            clockOutGPSFailureMessage: this.clockOutGPSFailureMessage,
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

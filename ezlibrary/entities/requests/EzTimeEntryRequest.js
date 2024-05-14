// Base classes
import { EzJSONSerializable } from '/ezlibrary/entities/EzJSONSerializable.js';

// Helper classes
import {
    EzBoolean,
    EzNumber,
    EzString,
    EzArray
} from '/ezlibrary/helpers/EzHelpers.js';

// Enumeration classes
import {
    EzGpsDataStatus,
    EzTimeEntryType,
    EzPartialTimeEntry
} from '/ezlibrary/enums/EzEnumerations.js';

// Entity classes
import { EzDataTag } from '/ezlibrary/entities/EzDataTag.js';
import { EzDataTagMap } from '/ezlibrary/entities/EzDataTagMap.js';

/**
    TODO: Change parent class to EzEntity
    @class
    @extends {EzJSONSerializable}
    @description
    Javascript entity equivalent of Java's TimeEntryRequest.java
    ---------------------------------------------------------------------------
    Import with:
        import { EzTimeEntryRequest } from '/ezlibrary/entities/requests/EzTimeEntryRequest.js';
    ---------------------------------------------------------------------------
 */
export class EzTimeEntryRequest extends EzJSONSerializable {
    /**
        @public @constructor
        Creates a new instance of EzTimeEntryRequest
     */
    constructor() {
        super();
    }

    // Request processing options
    #doNotAudit = false;

    /**
        @public @property @getter
        @returns {boolean}
     */
    get doNotAudit() {
        return this.#doNotAudit
    }

    /**
        @public @property @setter
        @param {boolean} doNotAudit
     */
    set doNotAudit(doNotAudit) {
        this.#doNotAudit = EzBoolean.booleanOrFalse(doNotAudit);
    }

    #overrideLocationCheck = false;

    /**
        @public @property @getter
        @returns {boolean}
     */
    get overrideLocationCheck() {
        return this.#overrideLocationCheck
    }

    /**
        @public @property @setter
        @param {boolean} overrideLocationCheck
     */
    set overrideLocationCheck(overrideLocationCheck) {
        this.#overrideLocationCheck = EzBoolean.booleanOrFalse(overrideLocationCheck);
    }

    #timeEntryType = EzTimeEntryType.NORMAL;

    /**
        @public @property @getter
        Default: EzTimeEntryType.NORMAL
        @returns {string}
        A enum property value from EzTimeEntryType
     */
    get timeEntryType() {
        return this.#timeEntryType
    }

    /**
        @public @property @setter
        If timeEntryType is null or undefined then EzTimeEntryType.UNKNOWN is assigned.
        @param {boolean} timeEntryType
        A enum property value from EzTimeEntryType
     */
    set timeEntryType(timeEntryType) {
        this.#timeEntryType = EzTimeEntryType.ezAsEnum(timeEntryType);
    }

    // Time entry ids
    #id;

    /**
        @public @property @getter
        @returns {number}
     */
    get id() {
        return this.#id
    }

    /**
        @public @property @setter
        @param {number} id
     */
    set id(id) {
        this.#id = EzNumber.numberOrNull(id);
    }

    #parentTimeEntryId;

    /**
        @public @property @getter
        @returns {number}
     */
    get parentTimeEntryId() {
        return this.#parentTimeEntryId
    }

    /**
        @public @property @setter
        @param {number} parentTimeEntryId
     */
    set parentTimeEntryId(parentTimeEntryId) {
        this.#parentTimeEntryId = EzNumber.numberOrNull(parentTimeEntryId);
    }

    #employerId;

    /**
        @public @property @getter
        @returns {number}
     */
    get employerId() {
        return this.#employerId
    }

    /**
        @public @property @setter
        @param {number} employerId
     */
    set employerId(employerId) {
        this.#employerId = EzNumber.numberOrNull(employerId);
    }

    #employeeId;

    /**
        @public @property @getter
        @returns {number}
     */
    get employeeId() {
        return this.#employeeId
    }

    /**
        @public @property @setter
        @param {number} employeeId
     */
    set employeeId(employeeId) {
        this.#employeeId = EzNumber.numberOrNull(employeeId);
    }

    #customerId;

    /**
        @public @property @getter
        @returns {number}
     */
    get customerId() {
        return this.#customerId
    }

    /**
        @public @property @setter
        @param {number} customerId
     */
    set customerId(customerId) {
        this.#customerId = EzNumber.numberOrNull(customerId);
    }

    #scheduleId;

    /**
        @public @property @getter
        @returns {number}
     */
    get scheduleId() {
        return this.#scheduleId
    }

    /**
        @public @property @setter
        @param {number} scheduleId
     */
    set scheduleId(scheduleId) {
        this.#scheduleId = EzNumber.numberOrNull(scheduleId);
    }

    #associatedScheduleId;

    /**
        @public @property @getter
        @returns {number}
     */
    get associatedScheduleId() {
        return this.#associatedScheduleId
    }

    /**
        @public @property @setter
        @param {number} associatedScheduleId
     */
    set associatedScheduleId(associatedScheduleId) {
        this.#associatedScheduleId = EzNumber.numberOrNull(associatedScheduleId);
    }

    #clockInIso;

    /**
        @public @property @getter
        @returns {string}
     */
    get clockInIso() {
        return this.#clockInIso
    }

    /**
        @public @property @setter
        @param {string} clockInIso
     */
    set clockInIso(clockInIso) {
        this.#clockInIso = EzString.stringOrNull(clockInIso);
    }

    #clockInTimeZoneId = 'UTC';

    /**
        @public @property @getter
        @returns {string}
     */
    get clockInTimeZoneId() {
        return this.#clockInTimeZoneId
    }

    /**
        @public @property @setter
        @param {string} clockInTimeZoneId
     */
    set clockInTimeZoneId(clockInTimeZoneId) {
        this.#clockInTimeZoneId = EzString.stringOrDefault(clockInTimeZoneId, 'UTC');
    }

    #clockInGPSFailureMessage;

    /**
        @public @property @getter
        @returns {string}
     */
    get clockInGPSFailureMessage() {
        return this.#clockInGPSFailureMessage
    }

    /**
        @public @property @setter
        @param {string} clockInGPSFailureMessage
     */
    set clockInGPSFailureMessage(clockInGPSFailureMessage) {
        this.#clockInGPSFailureMessage = EzString.stringOrEmpty(clockInGPSFailureMessage);
    }

    #clockInGpsStatus = EzGpsDataStatus.UNKNOWN;

    /**
        @public @property @getter
        Default: EzGpsDataStatus.UNKNOWN
        @returns {string}
        A valid enum property value from EzGpsDataStatus
     */
    get clockInGpsStatus() {
        return this.#clockInGpsStatus
    }

    /**
        @public @property @setter
        If the provided clockInGpsStatus undefined or null then EzGpsDataStatus.UNKNOWN is assigned.
        @param {string} clockInGpsStatus
        A valid enum property value from EzGpsDataStatus
     */
    set clockInGpsStatus(clockInGpsStatus) {
        this.#clockInGpsStatus = EzGpsDataStatus.ezAsEnum(clockInGpsStatus);
    }

    #clockOutIso;

    /**
        @public @property @getter
        @returns {string}
     */
    get clockOutIso() {
        return this.#clockOutIso
    }

    /**
        @public @property @setter
        @param {string} clockOutIso
     */
    set clockOutIso(clockOutIso) {
        this.#clockOutIso = EzString.stringOrNull(clockOutIso);
    }

    #clockOutTimeZoneId = 'UTC';

    /**
        @public @property @getter
        @returns {string}
     */
    get clockOutTimeZoneId() {
        return this.#clockOutTimeZoneId
    }

    /**
        @public @property @setter
        @param {string} clockOutTimeZoneId
     */
    set clockOutTimeZoneId(clockOutTimeZoneId) {
        this.#clockOutTimeZoneId = EzString.stringOrDefault(clockOutTimeZoneId, 'UTC');
    }

    #clockOutGPSFailureMessage = '';

    /**
        @public @property @getter
        @returns {string}
     */
    get clockOutGPSFailureMessage() {
        return this.#clockOutGPSFailureMessage
    }

    /**
        @public @property @setter
        @param {string} clockOutGPSFailureMessage
     */
    set clockOutGPSFailureMessage(clockOutGPSFailureMessage) {
        this.#clockOutGPSFailureMessage = EzString.stringOrEmpty(clockOutGPSFailureMessage);
    }

    #clockOutGpsStatus = EzGpsDataStatus.UNKNOWN;

    /**
        @public @property @getter
        Default: EzGpsDataStatus.UNKNOWN
        @returns {string}
        A valid enum property value from EzGpsDataStatus
     */
    get clockOutGpsStatus() {
        return this.#clockOutGpsStatus
    }

    /**
        @public @property @setter
        If the provided clockOutGpsStatus is undefined or null then EzGpsDataStatus.UNKNOWN is assigned.
        @param {string} clockOutGpsStatus
        A valid enum property value from EzGpsDataStatus
     */
    set clockOutGpsStatus(clockOutGpsStatus) {
        this.#clockOutGpsStatus = EzGpsDataStatus.ezAsEnum(clockOutGpsStatus);
    }

    // Time entry attribute data
    #notes = EzString.EMPTY;

    /**
        @public @property @getter
        @returns {string}
     */
    get notes() {
        return this.#notes;
    }

    /**
        @public @property @setter
        @param {string} notes
     */
    set notes(notes) {
        this.#notes = EzString.stringOrEmpty(notes);
    }

    #description = EzString.EMPTY;

    /**
        @public @property @getter
        @returns {string}
     */
    get description() {
        return this.#description
    }

    /**
        @public @property @setter
        @param {string} description
     */
    set description(description) {
        this.#description = EzString.stringOrEmpty(description);
    }

    /**
        @public @property @getter
        @returns {string}
     */
    get locTime() {
        return moment().format();
    }

    #isActiveClockIn = false;

    /**
        @public @property @getter
        @returns {boolean}
     */
    get isActiveClockIn() {
        return this.#isActiveClockIn
    }

    /**
        @public @property @setter
        @param {boolean} isActiveClockIn
     */
    set isActiveClockIn(isActiveClockIn) {
        this.#isActiveClockIn = EzBoolean.booleanOrFalse(isActiveClockIn);
    }

    #offLineSync = false;

    /**
        @public @property @getter
        @returns {boolean}
     */
    get offLineSync() {
        return this.#offLineSync
    }

    /**
        @public @property @setter
        @param {boolean} offLineSync
     */
    set offLineSync(offLineSync) {
        this.#offLineSync = EzBoolean.booleanOrFalse(offLineSync);
    }

    #earlyClockInOverride = false;

    /**
         @public @property @getter
         @returns {boolean}
      */
    get earlyClockInOverride() {
        return this.#earlyClockInOverride
    }

    /**
        @public @property @setter
        @param {boolean} earlyClockInOverride
     */
    set earlyClockInOverride(earlyClockInOverride) {
        this.#earlyClockInOverride = EzBoolean.booleanOrFalse(earlyClockInOverride);
    }

    #paid = false;

    /**
        @public @property @getter
        @returns {boolean}
     */
    get paid() {
        return this.#paid
    }

    /**
        @public @property @setter
        @param {boolean} paid
     */
    set paid(paid) {
        this.#paid = EzBoolean.booleanOrFalse(paid);
    }

    #activeBreak = false;

    /**
        @public @property @getter
        @returns {boolean}
     */
    get activeBreak() {
        return this.#activeBreak
    }

    /**
        @public @property @setter
        @param {boolean} activeBreak
     */
    set activeBreak(activeBreak) {
        this.#activeBreak = EzBoolean.booleanOrFalse(activeBreak);
    }

    #partialTimeEntry = EzPartialTimeEntry.NO;

    /**
        @public @property @getter
        @returns {boolean}
     */
    get partialTimeEntry() {
        return this.#partialTimeEntry
    }

    /**
        @public @property @setter
        @param {boolean} partialTimeEntry
     */
    set partialTimeEntry(partialTimeEntry) {
        this.#partialTimeEntry = partialTimeEntry;
    }

    #targetDateTimeZone = 'UTC';

    /**
        @public @property @getter
        @returns {boolean}
     */
    get targetDateTimeZone() {
        return this.#targetDateTimeZone
    }

    /**
        @public @property @setter
        @param {boolean} targetDateTimeZone
     */
    set targetDateTimeZone(targetDateTimeZone) {
        this.#targetDateTimeZone = targetDateTimeZone;
    }

    /**
        @public @property @getter
        @returns {boolean}
     */
    get source() {
        return 'WEBSITE';
    }

    #gpsDataStatus = EzGpsDataStatus.NOT_AVAILABLE;

    /**
        @public @property @getter
        Default: EzGpsDataStatus.NOT_AVAILABLE
        @returns {string}
        A valid enunm property value from EzGpsDataStatus.
     */
    get gpsDataStatus() {
        return this.#gpsDataStatus
    }

    /**
        @public @property @setter
        If the provided gpsDataStatus is undefined or null then EzGpsDataStatus.UNKNOWN is assigned.
        @param {string} gpsDataStatus
        A valid enunm property value from EzGpsDataStatus.
     */
    set gpsDataStatus(gpsDataStatus) {
        this.#gpsDataStatus = gpsDataStatus;
    }

    #accuracy = '0';

    /**
        @public @property @getter
        @returns {string}
     */
    get accuracy() {
        return this.#accuracy
    }

    /**
        @public @property @setter
        @param {string} accuracy
     */
    set accuracy(accuracy) {
        this.#accuracy = EzString.stringOrDefault(
            EzNumber.isNumber(accuracy)
                ? accuracy.toString()
                : accuracy,
            '0');
    }

    #latitude = '0';

    /**
        @public @property @getter
        @returns {string}
     */
    get latitude() {
        return this.#latitude
    }

    /**
        @public @property @setter
        @param {string} latitude
     */
    set latitude(latitude) {
        this.#latitude = EzString.stringOrDefault(
            EzNumber.isNumber(latitude)
                ? latitude.toString()
                : latitude,
            '0');
    }

    #longitude = '0';

    /**
        @public @property @getter
        @returns {string}
     */
    get longitude() {
        return this.#longitude
    }

    /**
        @public @property @setter
        @param {string} longitude
     */
    set longitude(longitude) {
        this.#longitude = EzString.stringOrDefault(
            EzNumber.isNumber(longitude)
                ? longitude.toString()
                : longitude,
            '0');
    }

    #radius = '0';

    /**
        @public @property @getter
        @returns {string}
     */
    get radius() {
        return this.#radius
    }

    /**
        @public @property @setter
        @param {string} radius
     */
    set radius(radius) {
        this.#radius = EzString.stringOrDefault(
            EzNumber.isNumber(radius)
                ? radius.toString()
                : radius,
            '0');
    }

    #gpsSource = 'UNKNOWN';

    /**
        @public @property @getter
        Default: 'UNKNOWN'
        @returns {boolean}
     */
    get gpsSource() {
        return this.#gpsSource
    }

    /**
        @public @property @setter
        If the provided gpsSource is undefined, null, or empty string then 'UNKNOWN' is assigned.
        @param {boolean} gpsSource
     */
    set gpsSource(gpsSource) {
        this.#gpsSource = EzString.stringHasLength(gpsSource)
            ? gpsSource
            : 'UNKNOWN';
    }

    #altitude = '0';

    /**
        @public @property @getter
        @returns {string}
     */
    get altitude() {
        return this.#altitude
    }

    /**
        @public @property @setter
        @param {string} altitude
     */
    set altitude(altitude) {
        this.#altitude = EzString.stringOrDefault(
            EzNumber.isNumber(altitude)
                ? altitude.toString()
                : altitude,
            '0');
    }

    #speed = '0';

    /**
        @public @property @getter
        @returns {string}
     */
    get speed() {
        return this.#speed
    }

    /**
        @public @property @setter
        @param {string} speed
     */
    set speed(speed) {
        this.#speed = EzString.stringOrDefault(
            EzNumber.isNumber(speed)
                ? speed.toString()
                : speed,
            '0');
    }

    // Job Data
    #jobName;

    /**
        @public @property @getter
        @returns {boolean}
     */
    get jobName() {
        return this.#jobName
    }

    /**
        @public @property @setter
        @param {boolean} jobName
     */
    set jobName(jobName) {
        this.#jobName = EzString.stringOrNull(jobName);
    }

    #jobMappings = [];

    /**
        @public @property @getter
        @returns {array}
     */
    get jobMappings() {
        return this.#jobMappings
    }

    /**
        @public @property @setter
        @param {array} jobMappings
     */
    set jobMappings(jobMappings) {
        this.#jobMappings = EzArray.arrayHasLength(jobMappings)
            ? EzDataTagMap.toArrayOfEzDataTagMaps(jobMappings)
            : [];
    }

    #assignedJobs = [];

    /**
        @public @property @getter
        @returns {array}
     */
    get assignedJobs() {
        return this.#assignedJobs
    }

    /**
        @public @property @setter
        @param {array} assignedJobs
     */
    set assignedJobs(assignedJobs) {
        this.#assignedJobs = EzArray.arrayHasLength(assignedJobs)
            ? EzDataTag.toArrayOfEzDataTags(assignedJobs)
            : [];
    }

    #dataTagMaps = [];

    /**
        @public @property @getter
        @returns {array}
     */
    get dataTagMaps() {
        return this.#dataTagMaps
    }

    /**
        @public @property @setter
        @param {array} dataTagMaps
     */
    set dataTagMaps(dataTagMaps) {
        this.#dataTagMaps = EzArray.arrayHasLength(dataTagMaps)
            ? EzDataTagMap.toArrayOfEzDataTagMaps(dataTagMaps)
            : [];
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
            id: this.id,
            employerId: this.employerId,
            employeeId: this.employeeId,
            customerId: this.customerId,
            scheduleId: this.scheduleId,
            associatedScheduleId: this.associatedScheduleId,
            parentTimeEntryId: this.parentTimeEntryId,
            overrideLocationCheck: this.overrideLocationCheck,
            timeEntryType: this.timeEntryType,

            clockInIso: this.clockInIso,
            clockInTimeZoneId: this.clockInTimeZoneId,
            serverClockInIso: this.serverClockInIso,
            clockInGPSFailureMessage: this.clockInGPSFailureMessage,
            clockInGpsStatus: this.clockInGpsStatus,

            clockOutIso: this.clockOutIso,
            clockOutTimeZoneId: this.clockOutTimeZoneId,
            serverClockOutIso: this.serverClockOutIso,
            clockOutGPSFailureMessage: this.clockOutGPSFailureMessage,
            clockOutGpsStatus: this.clockOutGpsStatus,

            notes: this.notes,
            description: this.description,
            jobName: this.jobName,

            isActiveClockIn: this.isActiveClockIn,
            activeBreak: this.activeBreak,
            partialTimeEntry: this.partialTimeEntry,
            earlyClockInOverride: this.earlyClockInOverride,
            offLineSync: this.offLineSync,
            paid: this.paid,
            archived: this.archived,

            gpsDataStatus: this.gpsDataStatus,
            accuracy: this.accuracy,
            latitude: this.latitude,
            longitude: this.longitude,
            radius: this.radius,
            gpsSource: this.gpsSource,
            altitude: this.altitude,
            speed: this.speed,

            locTime: this.locTime,
            targetDateTimeZone: this.targetDateTimeZone,
            source: this.source,

            assignedJobs: EzDataTag.toArrayOfSimpleDataTagJavascriptObjects(this.assignedJobs),
            jobMappings: EzDataTagMap.toArrayOfSimpleDataTagMapJavascriptObjects(this.jobMappings),
            dataTagMaps: EzDataTagMap.toArrayOfSimpleDataTagMapJavascriptObjects(this.dataTagMaps),

            doNotAudit: this.doNotAudit
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

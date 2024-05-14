/*
    ---------------------------------------------------------------------------
    !! DO NOT IMPORT THE FOLLOWING INTO THIS CLASS !!
    ---------------------------------------------------------------------------
    import {
            EzBillingAddress,
            EzCreditCard,
            EzDataTag,
            EzDataTagMap,
            EzTimeEntry,
            EzWantEventSettings,
            EzBillingInfoRequest,
            EzClockInRequest,
            EzClockOutRequest,
            EzEmployeeInviteRequest,
            EzEntity,
            EzPaymentInfoRequest,
            EzTimeEntryRequest,
            EzUpdateBillingAddressRequest,
            EzUpdateEmployeInfoRequestEntity,
            EzUpdateCreditCardRequests,
            EzApiResponse,
            EzEntityCollectionResponse,
            EzEntityResponse
    } from '/ezlibrary/entities/EzEntities.js';
    NOTE: If you need any of the above classes, import them individually.
    ---------------------------------------------------------------------------
*/
// Base classes
import { EzEntity } from '/ezlibrary/entities/requests/EzEntity.js';

// Helper classes
import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzArray
} from '/ezlibrary/helpers/EzHelpers.js';

// Enumerations
import {
    EzTimeEntryType,
    EzGpsDataStatus,
    EzPartialTimeEntry
} from '/ezlibrary/enums/EzEnumerations.js';

// Entity classes
import { EzDataTag } from '/ezlibrary/entities/EzDataTag.js';
import { EzDataTagMap } from '/ezlibrary/entities/EzDataTagMap.js';

/**
    @class
    @extends {EzEntity}
    @dscription
    Javascript equivalant to Java's EzTimeEntry.java class
    To convert this object to a JSON string:
        * Call the instances asJson proeprty
        * Call the instances ezToJson() function
        * Use ezApi.ezToJson(instance) or EzJson.toJson(instance)
    DO NOT USE JSON.serialize directly to avoid losing any getter/settter properties.
    ---------------------------------------------------------------------
    Import with:
        import {EzTimeEntry} from '/ezlibrary/entities/EzTimeEntry.js';
    ---------------------------------------------------------------------
    Import if also importing other entity classes:
        import {
            ... other classes ...
            EzTimeEntry
        } from '/ezlibrary/entities/Entities.js';
    ---------------------------------------------------------------------
 */
export class EzTimeEntry extends EzEntity {
    /**
        @static
        @public @method
        Returns the provided simpleJSONObjectOrEzDataTagEntity as an EzDatTag entity.
        If the provied simpleJSONObjectOrEzDataTagEntity is already a EzDataTag entity, it is returned.
        Otherwise, a new EzDataTag instance is creatd and the matching property values from the
        simpleJavaScriptObjectOrEzDataTagEntity get assigned to the EzDataTag instance's properties.
        @param {object|EzTimeEntry} timeEntry
        @returns {EzTimeEntry}
     */
    static asEzTimeEntry(timeEntry) {
        if (!EzObject.isValid(timeEntry)) {
            throw new EzBadParamException(
                'timeEntry',
                EzTimeEntry,
                EzTimeEntry.ezInstanceFrom);
        }

        if (EzBoolean.isTrue(EzTimeEntry.isEzTimeEntry(timeEntry))) {
            // Detected the provided instance is already EzDataTag entity
            return timeEntry;
        }

        let ezTimeEntry = new EzTimeEntry();

        // Copy EzEntity inherited properties
        ezTimeEntry.id = EzNumber.numberOrNull(timeEntry.id);

        ezTimeEntry.createdIso = EzString.stringOrDefault(
            timeEntry.createdIso,
            ezApi.ezclocker.ezDateTime.ezNowAsIso());

        ezTimeEntry.updatedIso = EzString.stringOrDefault(
            timeEntry.updatedIso,
            ezTimeEntry.createdIso);

        ezTimeEntry.deletedIso = EzString.stringOrNull(timeEntry.deletedIso);

        ezTimeEntry.source = EzString.stringOrDefault(
            timeEntry.source,
            'WEBSITE');

        // EzTimeEntry Specific Properties
        ezTimeEntry.parentTimeEntryId = timeEntry.parentTimeEntryId;
        ezTimeEntry.employeeId = timeEntry.employeeId;
        ezTimeEntry.employerId = timeEntry.employerId;
        ezTimeEntry.customerId = timeEntry.customerId;
        ezTimeEntry.scheduleId = timeEntry.scheduleId;
        ezTimeEntry.parentTimeEntryId = timeEntry.parentTimeEntryId;
        ezTimeEntry.clockInIso = timeEntry.clockInIso;
        ezTimeEntry.clockInTimeZoneId = timeEntry.clockInTimeZoneId;
        ezTimeEntry.serverClockInIso = timeEntry.serverClockInIso;
        ezTimeEntry.clockInGPSFailureMessage = timeEntry.clockInGPSFailureMessage;
        ezTimeEntry.clockInGpsStatus = timeEntry.clockInGpsStatus;
        ezTimeEntry.clockOutIso = timeEntry.clockOutIso;
        ezTimeEntry.clockOutTimeZoneId = timeEntry.clockOutTimeZoneId;
        ezTimeEntry.serverClockOutIso = timeEntry.serverClockOutIso;
        ezTimeEntry.clockOutGPSFailureMessage = timeEntry.clockOutGPSFailureMessage;
        ezTimeEntry.clockOutGpsStatus = timeEntry.clockOutGpsStatus;
        ezTimeEntry.notes = timeEntry.notes;
        ezTimeEntry.addedBy = timeEntry.addedBy;
        ezTimeEntry.modifiedBy = timeEntry.modifiedBy;
        ezTimeEntry.timeEntryType = timeEntry.timeEntryType;
        ezTimeEntry.isActiveClockIn = timeEntry.isActiveClockIn;
        ezTimeEntry.isActiveBreak = timeEntry.isActiveBreak;
        ezTimeEntry.offLineSync = timeEntry.offLineSync;
        ezTimeEntry.earlyClockInOverride = timeEntry.earlyClockInOverride;
        ezTimeEntry.paid = timeEntry.paid;
        ezTimeEntry.partialTimeEntry = timeEntry.partialTimeEntry;
        ezTimeEntry.archived = timeEntry.archived;
        ezTimeEntry.deleted = timeEntry.deleted;

        ezTimeEntry.totalDecimalHours = EzString.stringOrDefault(
            timeEntry.totalDecimalHours,
            '0');

        ezTimeEntry.totalTime = EzString.stringOrDefault(
            timeEntry.totalTime,
            '00:00');

        ezTimeEntry.assignedJobs = EzArray.arrayHasLength(timeEntry.assignedJobs)
            ? EzDataTag.toArrayOfEzDataTags(timeEntry.assignedJobs)
            : [];

        ezTimeEntry.jobMappings = EzArray.arrayHasLength(timeEntry.jobMappings)
            ? EzDataTagMap.toArrayOfEzDataTagMaps(timeEntry.jobMappings)
            : [];

        return ezTimeEntry;
    }

    /**
        @static
        @public @method
        Transforms the provided timeEntries array into an array of simple time entry Javascript objects.
        The time entry Javascript objects will have fields for all the EzDataTag's properties/fields
        The time entry Javascript objects will not have a constructor or any additional methods, getters, or setters.
        @param {array} timeEntries
        An array of one of the following types:
            1) EzTimeEntry entity objects
            2) Simple time entry Javascript objects
        @returns {array}
        Array of simple time entry Javascript objects
     */
    static toArrayOfSimpleTimeEntryJavascriptObjects(timeEntries) {
        if (!EzArray.isArray(timeEntries)) {
            throw new EzBadParamException(
                'timeEntries',
                EzTimeEntry,
                EzTimeEntry.toJSONArray);
        }

        let simpleTimeEntries = [];

        if (!EzArray.arrayHasLength(timeEntries)) {
            return simpleTimeEntries;
        }

        for (let ezDataTag of timeEntries) {
            simpleTimeEntries.push(EzDataTag.asEzDataTag(ezDataTag));
        }

        return simpleTimeEntries;
    }

    /**
        @static
        @public @method
        Transforms the provided ezDataTagMaps (array of EzDataTagMap entities) to a
        a JSON array string.
        @param {array} timeEntries
        Arrray of EzDataTagMap entities
        @returns {string}
        JSON array of EzDataTagMaps (transformed to simple JSON Objects, no getters/setters)
     */
    static toJSONArray(timeEntries) {
        if (!EzArray.isArray(timeEntries)) {
            throw new EzBadParamException(
                'timeEntries',
                EzTimeEntry,
                EzTimeEntry.toJSONArray);
        }

        return EzJson.toJsonArray(
            EzTimeEntry.toArrayOfSimpleTimeEntryJavascriptObjects(timeEntries));
    }

    /**
        @static
        @public @method
        Determines if the provided value is a EzDataTag entity or not.
        @param {undefined|null|EzDataTag|*} value
        @returns {boolean}
     */
    static isEzTimeEntry(value) {
        return EzObject.isValid(value) && EzTimeEntry.constructor.name === value.constructor.name;
    }

    /**
        @static
        @public @method
        Creates a new EzEntity instance and copied the
        properties from the provided ezEntity instance
        to the new EzInstance.
        If the provied ezEntity is undefined or null then
        null is returned.
        @param {undefined|null|object|EzTimeEntry} timeEntry
        @returns {EzTimeEntry}
        @deprecated
        Migrate to: EzTimeEntry.asEzTimeEntry(timeEntry)
     */
    static ezCopyFrom(timeEntry) {
        return EzTimeEntry.asEzTimeEntry(timeEntry);
    }

    /**
        @public @constructor
        Creates a new EzTimeEntry.
        If clockInMoment is null and clockOutMoment is null or undefined then the default "add" time entry
        date time values are used (today at 9:00 AM to today at 5:00 PM)).
        If clockInMoment is not null and clock out moment is null or undefined then the clockOutMoment is set to equal
        the clockInMoment ("clock in time entry")
        Otherwise, the provided clockInMoment and clockOutMoment values will apply to the time entry.
        NOTE: No validation is performed on the clockInMoment or clockOutMoment as relating to being a valid
        date range for the time entry.
        @param {moment|undefined|null} clockInMoment
        @param {moment|undefined|null} clockOutMoment
     */
    constructor(clockInMoment, clockOutMoment) {
        super();

        if (!EzObject.isValid(clockInMoment) && !EzObject.isValid(clockOutMoment)) {
            clockInMoment = ezApi.ezclocker.ezDateTime.ezAddHours(
                ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay(),
                9);
            clockOutMoment = ezApi.ezclocker.ezDateTime.ezAddHours(
                clockInMoment,
                9);
        }

        if (!EzObject.isValid(clockInMoment)) {
            clockInMoment = ezApi.ezclocker.ezDateTime.ezNow();
        }

        if (!EzObject.isValid(clockOutMoment)) {
            clockOutMoment = ezApi.ezclocker.ezDateTime.ezMomentWithPTZ(clockInMoment);
        }

        this.clockInIso = ezApi.ezclocker.ezDateTime.ezToIso(clockInMoment);
        this.clockInTimeZoneId = clockInMoment.tz();

        this.clockOutIso = ezApi.ezclocker.ezDateTime.ezToIso(clockOutMoment);
        this.clockOutTimeZoneId = clockOutMoment.tz();
    }

    #parentTimeEntryId

    get parentTimeEntryId() {
        return this.#parentTimeEntryId;
    }

    set parentTimeEntryId(parentTimeEntryId) {
        this.#parentTimeEntryId = ezApi.ezNumberOrNull(parentTimeEntryId);
    }

    #partialTimeEntryOriginalId = null;

    get partialTimeEntryOriginalId() {
        return this.#partialTimeEntryOriginalId;
    }

    set partialTimeEntryOriginalId(partialTimeEntryOriginalId) {
        this.#partialTimeEntryOriginalId = ezApi.ezNumberOrNull(partialTimeEntryOriginalId);
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

    /* Clock In Data */

    #clockInIso = null;

    get clockInIso() {
        return this.#clockInIso;
    }

    set clockInIso(clockInIso) {
        this.#clockInIso = EzString.stringOrDefault(clockInIso, null);
    }

    #clockInIsoBeforeRounding = null;

    get clockInIsoBeforeRounding() {
        return this.#clockInIsoBeforeRounding;
    }

    set clockInIsoBeforeRounding(clockInIsoBeforeRounding) {
        this.#clockInIsoBeforeRounding = EzString.stringOrDefault(clockInIsoBeforeRounding, null);
    }

    #clockInTimeZoneId = null;

    get clockInTimeZoneId() {
        if (!EzString.stringHasLength(this.#clockInTimeZoneId)) {
            this.#clockInTimeZoneId = EzString.stringHasLength(this.clockInIso)
                ? ezApi.ezclocker.ezDateTime.ezFromIso(this.clockInIso).zone().name
                : ezApi.ezclocker.ezDateTime.ezGetActiveTimeZoneId();
        }
        return this.#clockInTimeZoneId;
    }

    set clockInTimeZoneId(clockInTimeZoneId) {
        if (!EzString.stringHasLength(clockInTimeZoneId)) {
            clockInTimeZoneId = EzString.stringHasLength(this.clockInIso)
                ? ezApi.ezclocker.ezDateTime.ezFromIso(this.clockInIso).zone().name
                : ezApi.ezclocker.ezDateTime.ezGetActiveTimeZoneId();
        }

        this.#clockInTimeZoneId = clockInTimeZoneId;
    }

    #serverClockInIso = null;

    get serverClockInIso() {
        return this.#serverClockInIso;
    }

    set serverClockInIso(serverClockInIso) {
        this.#serverClockInIso = EzString.stringOrDefault(serverClockInIso, null);
    }

    #clockInGpsStatus = EzGpsDataStatus.UNKNOWN;

    get clockInGpsStatus() {
        return this.#clockInGpsStatus;
    }

    set clockInGpsStatus(clockInGpsStatus) {
        this.#clockInGpsStatus = EzGpsDataStatus.ezAsEnum(clockInGpsStatus);
    }

    #clockInGPSFailureMessage = null;

    get clockInGPSFailureMessage() {
        return this.#clockInGPSFailureMessage;
    }

    set clockInGPSFailureMessage(clockInGPSFailureMessage) {
        this.#clockInGPSFailureMessage = EzString.stringOrEmpty(clockInGPSFailureMessage);
    }

    /** Clock Out Data */

    #clockOutIso = null;

    get clockOutIso() {
        return this.#clockOutIso;
    }

    set clockOutIso(clockOutIso) {
        this.#clockOutIso = EzString.stringHasLength(clockOutIso)
            ? clockOutIso
            : clockInIso;
    }

    #clockOutIsoBeforeRounding = null;

    get clockOutIsoBeforeRounding() {
        return this.#clockOutIsoBeforeRounding;
    }

    set clockOutIsoBeforeRounding(clockOutIsoBeforeRounding) {
        this.#clockOutIsoBeforeRounding = EzString.stringOrDefault(clockOutIsoBeforeRounding, null);
    }

    #clockOutTimeZoneId = 'UTC';

    get clockOutTimeZoneId() {
        if (!EzString.stringHasLength(this.#clockOutTimeZoneId)) {
            // Attempt to guess it from the clockOutIso
            this.clockOutTimeZoneId = EzString.stringHasLength(this.clockOutIso)
                ? ezApi.ezclocker.ezDateTime.ezFromIso(this.clockOutIso).tz()
                : ezApi.ezclocker.ezDateTime.ezGetActiveTimeZoneId();
        }

        return this.#clockOutTimeZoneId;
    }

    set clockOutTimeZoneId(clockOutTimeZoneId) {
        if (!EzString.stringHasLength(clockOutTimeZoneId)) {
            // Attempt to guess it from the clockOutIso
            clockOutTimeZoneId = EzString.stringHasLength(this.clockOutIso)
                ? ezApi.ezclocker.ezDateTime.ezFromIso(this.clockOutIso).tz()
                : ezApi.ezclocker.ezDateTime.ezGetActiveTimeZoneId();
        }

        this.#clockOutTimeZoneId = clockOutTimeZoneId;
    }

    #serverClockOutIso = null;

    get serverClockOutIso() {
        return this.#serverClockOutIso;
    }

    set serverClockOutIso(serverClockOutIso) {
        this.#serverClockOutIso = EzString.stringOrDefault(serverClockOutIso, null);
    }

    #clockOutGPSFailureMessage = null;

    get clockOutGPSFailureMessage() {
        return this.#clockOutGPSFailureMessage;
    }

    set clockOutGPSFailureMessage(clockOutGPSFailureMessage) {
        this.#clockOutGPSFailureMessage = EzString.stringOrEmpty(clockOutGPSFailureMessage);
    }

    #clockOutGpsStatus = EzGpsDataStatus.UNKNOWN;

    get clockOutGpsStatus() {
        return this.#clockOutGpsStatus;
    }

    set clockOutGpsStatus(clockOutGpsStatus) {
        this.#clockOutGpsStatus = EzGpsDataStatus.ezAsEnum(clockOutGpsStatus);
    }

    #totalDecimalHours = '0';

    get totalDecimalHours() {
        return this.#totalDecimalHours;
    }

    set totalDecimalHours(totalDecimalHours) {
        this.#totalDecimalHours = EzString.stringOrDefault(totalDecimalHours, '0');
    }

    #totalTime = '00:00';

    get totalTime() {
        return this.#totalTime;
    }

    set totalTime(totalTime) {
        this.#totalTime = EzString.stringOrDefault(totalTime, '00:00');
    }

    // Auditing information
    #notes = '';

    get notes() {
        return this.#notes;
    }

    set notes(notes) {
        this.#notes = EzString.stringOrEmpty(notes);
    }

    #addedBy = '';

    get addedBy() {
        return this.#addedBy;
    }

    set addedBy(addedBy) {
        this.#addedBy = EzString.stringOrEmpty(addedBy);
    }

    #modifiedBy = '';

    get modifiedBy() {
        return this.#modifiedBy;
    }

    set modifiedBy(modifiedBy) {
        this.#modifiedBy = EzString.stringOrEmpty(modifiedBy);
    }

    #jobName = '';

    get jobName() {
        return this.#jobName;
    }

    set jobName(jobName) {
        this.#jobName = EzString.stringOrEmpty(jobName);
    }

    #assignedJobs = [];

    get assignedJobs() {
        return this.#assignedJobs;
    }

    set assignedJobs(assignedJobs) {
        this.#assignedJobs = EzArray.arrayOrEmpty(assignedJobs);
    }

    #jobMappings = [];

    get jobMappings() {
        return this.#jobMappings;
    }

    set jobMappings(jobMappings) {
        this.#jobMappings = EzArray.arrayOrEmpty(jobMappings);
    }

    // Time entry state information
    #timeEntryType = EzTimeEntryType.NORMAL;

    get timeEntryType() {
        return this.#timeEntryType;
    }

    set timeEntryType(timeEntryType) {
        this.#timeEntryType = EzTimeEntryType.ezAsEnum(timeEntryType);
    }

    #isActiveClockIn = false;

    get isActiveClockIn() {
        return this.#isActiveClockIn;
    }

    set isActiveClockIn(isActiveClockIn) {
        this.#isActiveClockIn = EzBoolean.isTrue(isActiveClockIn);
    }

    #activeBreak = false;

    get activeBreak() {
        return this.#activeBreak;
    }

    set activeBreak(activeBreak) {
        this.#activeBreak = EzBoolean.isTrue(activeBreak);
    }

    #offLineSync = false;

    get offLineSync() {
        return this.#offLineSync;
    }

    set offLineSync(offLineSync) {
        this.#offLineSync = EzBoolean.isTrue(offLineSync);
    }

    #earlyClockInOverride = false;

    get earlyClockInOverride() {
        return this.#earlyClockInOverride;
    }

    set earlyClockInOverride(earlyClockInOverride) {
        this.#earlyClockInOverride = EzBoolean.isTrue(earlyClockInOverride);
    }

    #paid = false;

    get paid() {
        return this.#paid;
    }

    set paid(paid) {
        this.#paid = EzBoolean.isTrue(paid);
    }

    #partialTimeEntry = EzPartialTimeEntry.NO;

    get partialTimeEntry() {
        return this.#partialTimeEntry;
    }

    set partialTimeEntry(partialTimeEntry) {
        this.#partialTimeEntry = EzBoolean.isTrue(partialTimeEntry);
    }

    #archived = false;

    get archived() {
        return this.#archived;
    }

    set archived(archived) {
        this.#archived = EzBoolean.isTrue(archived);
    }

    #deleted = false;

    get deleted() {
        return this.#deleted;
    }

    set deleted(deleted) {
        this.#deleted = EzBoolean.isTrue(deleted);
    }

    /**
        @public @readonly @property
        Returns the targetDateTimeZone for the time entry.
        @returns {string}
     */
    get targetDateTimeZone() {
        return ezApi.ezclocker.ezDateTime.activeTimeZone;
    }

    /**
        @public @method
        Loads the assigned jobs for this time entry from the DB.
        Sets the assignedJobs property.
        @returns {Promise}
     */
    ezLoadAssignedJobs() {
        // NOTE: using self to reference this to avoid losing the reference due to async operations
        const self = this;

        return ezApi.ezPromise(
            (resolve, reject) => ezApi.ezclocker.ezHttpHelper.ezGet(
                ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                    ezApi.ezUrlTemplate`${self.id}/assigned-jobs
                        ?target-time-zone-id=${self.targetDateTimeZone()}`,
                    'v2'))
                .then(
                    ezApi.ezclocker.ezServices.ezProcessApiResolve,
                    ezApi.ezclocker.ezServices.ezProcessApiReject)
                .then(
                    (response) => {
                        self.assignedJobs = ezApi.ezArrayHasLength(response.entities)
                            ? response.entities
                            : [];

                        return resolve({
                            errorCode: 0,
                            messsage: response.message,
                            assignedJobs: self.assignedJobs
                        });
                    },
                    (eResponse) => {
                        ezApi.ezclocker.ezLogger.error(
                            ezApi.ezEM`
                                Failed to load the assigned jobs for time entry with timeEntryId=${self.id}.
                                Error: ${ezApi.ezToJson(eResponse)}`);

                        self.assignedJobs = [];

                        return reject({
                            errorCode: eResponse.errorCode,
                            messsage: eResponse.message,
                            assignedJobs: self.assignedJobs
                        });
                    }));
    }

    /**
        @public @method
        Loads the DataTagMap "job mappings" this time entry from the DB.
        Sets the jobMappings property.
        @returns {Promise}
     */
    ezLoadJobMappings() {
        // NOTE: using self to reference this to avoid losing the reference due to async operations
        const self = this;

        return ezApi.ezPromise(
            (resolve, reject) => ezApi.ezclocker.ezHttpHelper.ezGet(
                ezApi.ezclocker.ezNavigation.ezGetInternalApiUrl(
                    `${self.id}/job-mappings?target-time-zone-id=${self.targetDateTimeZone()}`,
                    'v2'))
                .then(
                    ezApi.ezclocker.ezServices.ezProcessApiResolve,
                    ezApi.ezclocker.ezServices.ezProcessApiReject)
                .then(
                    (response) => {
                        self.jobMappings = ezApi.ezArrayHasLength(response.entities)
                            ? response.entities
                            : [];

                        return resolve({
                            errorCode: response.errorCode,
                            messsage: response.message,
                            jobMappings: self.jobMappings
                        });
                    },
                    (eResponse) => {
                        ezApi.ezclocker.ezLogger.error(
                            ezApi.ezEM`
                                Failed to load the job mappings (data tag maps) for time entry with
                                timeEntryId=${self.id}.
                                Error: ${ezApi.ezToJson(eResponse)}`);

                        self.jobMappings = [];

                        return reject({
                            errorCode: eResponse.errorCode,
                            messsage: eResponse.message,
                            jobMappings: self.jobMappings
                        });
                    }));
    }

    /**
        @public @method
        Returns this instance as a JSON object
        @returns {object}
     */
    get toJsonObject() {
        return this.asJSONObject;
    }

    /**
        @public @method
        Returns this instance as a JSON string
        @returns {string}
     */
    get toJson() {
        return this.asJSON;
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
            employeeId: this.employeeId,
            employerId: this.employerId,
            customerId: this.customerId,
            scheduleId: this.scheduleId,
            parentTimeEntryId: this.parentTimeEntryId,
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
            totalDecimalHours: this.totalDecimalHours,
            totalTime: this.totalTime,
            notes: this.notes,
            addedBy: this.addedBy,
            modifiedBy: this.modifiedBy,
            timeEntryType: this.timeEntryType,
            isActiveClockIn: this.isActiveClockIn,
            activeBreak: this.activeBreak,
            offLineSync: this.offLineSync,
            earlyClockInOverride: this.earlyClockInOverride,
            paid: this.paid,
            partialTimeEntry: this.partialTimeEntry,
            archived: this.archived,
            deleted: this.deleted,
            targetDateTimeZone: this.targetDateTimeZone,
            assignedJobs: EzDataTag.toArrayOfSimpleDataTagJavascriptObjects(this.assignedJobs),
            jobMappings: EzDataTagMap.toArrayOfSimpleDataTagMapJavascriptObjects(this.jobMappings),
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

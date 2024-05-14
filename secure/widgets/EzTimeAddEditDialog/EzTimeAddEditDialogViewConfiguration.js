import {
    EzException,
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzNumber,
    EzString,
    EzArray
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzPrimaryAccountType,
    EzTimeEntryType
} from '/ezlibrary/enums/EzEnumerations.js';

import {
    EzDataTag,
    EzTimeEntry,
    EzTimeEntryRequest
} from '/ezlibrary/entities/EzEntities.js';


/**
    A configuration and data context used with the ezClocker Time Entry Add/Edit dialog.
    Import with:
        import { EzTimeAddEditDialogViewConfiguration } from '/secure/widgets/EzTimeAddEditDialog/EzTimeAddEditDialogViewConfiguration.js';
 */
export class EzTimeAddEditDialogViewConfiguration {
    /**
        @public @static @method
        Returns the time entry associated with the provided timeEntryId
        @returns {Promise}
        A resolve only promise
     */
    static ezGetTimeEntryToEdit(timeEntryId) {
        if (!EzNumber.isNumber(timeEntryId)) {
            throw new EzBadParamException(
                'timeEntryId',
                'EzTimeAddEditDialogViewConfiguration',
                'static ezGetTimeEntryToEdit(timeEntryId)');
        }

        return ezApi.ezclocker.ezTimeEntryService.ezGetTimeEntry(timeEntryId)
            .then(
                ezApi.ezclocker.ezServices.ezProcessApiResolve,
                ezApi.ezclocker.ezServices.ezProcessApiReject);
    }

    /**
        @public @constructor
        Constructor for EzTimeAddEditDialogViewConfiguration
        @param {string} ezAccountType
        Valid enumeration property value from EzPrimaryAccountType
        @param {undefined|null|object} timeEntry
        @param {undefined|null|moment} defaultClockInMoment
        @param {undefined|null|moment} defaultClockOutMoment
        @param {undefined|null|string} defaultEditReason
        @param {undefined|null|boolean} allowEditing
        @param {undefined|null|boolean} allowEditClockIn
        @param {undefined|null|boolean} allowEditClockOut
        @param {undefined|null|boolean} allowEditNote
        @param {undefined|null|boolean} allowBreaks
        @param {undefined|null|boolean} availableJobs
     */
    constructor(
        ezAccountType,
        timeEntry,
        defaultClockInMoment,
        defaultClockOutMoment,
        defaultEditReason,
        allowEditing,
        allowEditClockIn,
        allowEditClockOut,
        allowEditNote,
        allowBreaks,
        availableJobs) {

        this.#ezPrimaryAccountType = EzPrimaryAccountType.ezValueOf(ezAccountType);

        this.ezDefaultClockInMoment = EzObject.isValid(defaultClockInMoment)
            ? defaultClockInMoment
            : ezApi.ezclocker.ezDateTime.ezNowWithStartOfDay().hour(9);

        this.ezDefaultClockOutMoment = EzObject.isValid(defaultClockOutMoment)
            ? defaultClockOutMoment
            : ezApi.ezclocker.ezDateTime.ezCreateFromMoment(this.ezDefaultClockInMoment)
                .add(8, 'hours');

        this.ezDefaultEditReason = EzString.stringOrEmpty(defaultEditReason);

        this.ezNoteHistory = null;

        if (EzObject.isValid(timeEntry)) {
            if (EzNumber.isNumber(timeEntry.id)) {
                this.ezEditingTimeEntry = EzTimeEntry.asEzTimeEntry(timeEntry);
            } else {
                this.ezAddingTimeEntry = EzTimeEntry.asEzTimeEntry(timeEntry);
            }
        } else {
            this.#ezEditingTimeEntry = null;

            this.#ezAddingTimeEntry = new EzTimeEntry();
        }

        this.ezAllowEditing = EzBoolean.isTrue(allowEditing);

        this.ezAllowEditClockIn = EzBoolean.isTrue(allowEditClockIn);

        this.ezAllowEditClockOut = EzBoolean.isTrue(allowEditClockOut);

        this.ezAllowEditNote = EzBoolean.isTrue(allowEditNote);

        this.ezAllowBreaks = EzBoolean.isTrue(allowEditing) && EzBoolean.isTrue(allowBreaks);

        this.ezAvailableJobs = availableJobs;
    }

    /**
        @proviate @field
        @type {string}
        A valid enum property value from EzPrimaryAccountType
     */
    #ezPrimaryAccountType = EzPrimaryAccountType.UNKNOWN;

    /**
        @private @field
        @type {object} (time entry object)
     */
    #ezAddingTimeEntry = null;

    /**
        @private @field
        @type {object} (time entry object)
     */
    #ezEditingTimeEntry = null;

    /**
        @public @field
        @type {moment}
     */
    ezDefaultClockInMoment = null;

    /**
        @public @field
        @type {moment}
     */
    ezDefaultClockOutMoment = null;

    /**
        @public @field
        @type {string}
     */
    ezDefaultEditReason = '';

    /**
        @public @field
        @type {array}
     */
    ezNoteHistory = null;

    /**
        @public @field
        @type {boolean}
     */
    ezAllowEditClockIn = true;

    /**
        @public @field
        @type {boolean}
     */
    ezAllowEditClockOut = true;

    /**
        @public @field
        @type {boolean}
     */
    ezAllowEditNote = true;

    /**
        @public @field
        @type {boolean}
     */
    ezAllowBreaks = true;

    /**
        @public @field
        @type {array}
     */
    #ezAvailableJobs = [];

    get ezAvailableJobs() {
        return this.#ezAvailableJobs;
    }

    set ezAvailableJobs(availableJobs) {
        if (!EzArray.arrayHasLength(availableJobs)) {
            this.#ezAvailableJobs = [];
        } else {
            this.#ezAvailableJobs = EzDataTag.toArrayOfEzDataTags(availableJobs);
        }
    }

    /**
        @public @field
        @type {boolean}
     */
    ezRequireNoteOnAdd = false;

    /**
        @public @field
        @type {boolean}
     */
    ezRequireNoteOnUpdate = true;

    /**
        @public @property @getter
        Returns the configured EzPrimaryAccountType
        @returns {string}
        A valid enum property value from EzPrimaryAccountType
     */
    get ezPrimaryAccountType() {
        return this.#ezPrimaryAccountType;
    }

    /**
        @public @property
        Returns true if the configuration is for editing a time entry
        @returns {Boolean}
     */
    get ezIsEditTimeEntryMode() {
        return EzObject.isValid(this.ezEditingTimeEntry);
    }

    /**
        @public
        Returns if the configuration is for adding a time entry
        @returns {Boolean}
     */
    get ezIsAddTimeEntryMode() {
        return EzObject.isValid(this.#ezAddingTimeEntry);
    }

    /**
        @public
        Returns the time entry reference being edited or added.
        @returns {object}
     */
    get ezTimeEntry() {
        return this.ezIsEditTimeEntryMode
            ? this.ezEditingTimeEntry
            : this.ezAddingTimeEntry;
    }

    /**
        @public @property
        Returns the time entry that is being added (if any)
        @returns {object|null}
     */
    get ezAddingTimeEntry() {
        return this.#ezAddingTimeEntry;
    }

    /**
        @public @property @setter
        Sets the EzPrimaryAccountType
        @@param {string}
        A valid enum property value from EzPrimaryAccountType
     */
    set ezPrimaryAccountType(aEzAccountType) {
        this.#ezPrimaryAccountType = EzPrimaryAccountType.ezValueOf(aEzAccountType);
    }

    /**
        @public @property
        Sets the time entry that is being added
        DO NOT set this value null. Instead use the ezEditingTimeEntry assignment.
        @param {object} timeEntryToAdd
     */
    set ezAddingTimeEntry(timeEntryToAdd) {
        if (!EzObject.isValid(timeEntryToAdd)) {
            throw new EzBadParamException(
                'timeEntryToAdd',
                this,
                'set ezAddingTimeEntry');
        }

        this.#ezEditingTimeEntry = null;

        this.#ezAddingTimeEntry = EzTimeEntry.ezCopyFrom(timeEntryToAdd);

        if (!EzString.stringHasLength(this.#ezAddingTimeEntry.clockInIso)) {
            this.#ezAddingTimeEntry.clockInIso = ezApi.ezclocker.ezDateTime.ezToIso(this.ezDefaultClockInMoment);
        }

        if (!EzString.stringHasLength(this.#ezAddingTimeEntry.clockOutIso)) {
            this.#ezAddingTimeEntry.clockOutIso = ezApi.ezclocker.ezDateTime.ezToIso(this.ezDefaultClockOutMoment);
        }

        if (!EzString.stringHasLength(this.#ezAddingTimeEntry.notes)) {
            this.#ezAddingTimeEntry.notes = this.ezDefaultEditReason;
        }

        this.ezNoteHistory = null;
    }

    /**
        @public @property
        Returns the time entry that is being edited (if any)
        @returns {object|null}
    */
    get ezEditingTimeEntry() {
        return this.#ezEditingTimeEntry;
    }

    /**
        @public @property
        Sets the time entry that is being edited
        DO NOT set this value to null, instead use ezAddingTimeEntry assignment.
        @param {Object} timeEntryToEdit
     */
    set ezEditingTimeEntry(timeEntryToEdit) {
        if (!EzObject.isValid(timeEntryToEdit)) {
            throw new EzBadParamException(
                'timeEntryToEdit',
                this,
                'set ezSetEditTimeEntry');
        }

        this.#ezAddingTimeEntry = null;

        this.#ezEditingTimeEntry = EzTimeEntry.isEzTimeEntry(timeEntryToEdit)
            ? timeEntryToEdit
            : EzTimeEntry.asEzTimeEntry(timeEntryToEdit);

        if (null == this.ezNoteHisatory) {
            this.ezNoteHistory = EzString.stringOrEmpty(this.#ezEditingTimeEntry.notes);
        }
    }

    /**
        @public
        Creates a EzTimeEntryRequest adding a new time entry via ezClocker API
        @param {undefined|null|array} ezDataTagMaps
        @returns {EzTimeEntryRequest}
     */
    ezCreateAddTimeEntryRequest(ezDataTagMaps) {
        if (!EzNumber.isNumber(this.ezAddingTimeEntry.employerId)) {
            throw new EzException(
                ezApi.ezEM`
                    Unable to build the add time entry payload.
                    The adding time entry does not have a valid employer id.
                    Adding time entry: ${ezApi.ezToJson(this.ezAddingTimeEntry)}`);
        }
        if (!EzNumber.isNumber(this.ezAddingTimeEntry.employeeId)) {
            throw new EzException(
                ezApi.ezEM`
                    Unable to build the add time entry payload.
                    The adding time entry does not have a valid employee id.
                    Adding time entry: ${ezApi.ezToJson(this.ezAddingTimeEntry)}`);
        }

        let timeEntryRequest = new EzTimeEntryRequest();

        timeEntryRequest.employerId = this.ezAddingTimeEntry.employerId;
        timeEntryRequest.employeeId = this.ezAddingTimeEntry.employeeId;
        timeEntryRequest.timeEntryType = EzTimeEntryType.NORMAL;
        timeEntryRequest.clockInIso = this.ezAddingTimeEntry.clockInIso;
        timeEntryRequest.clockInIso8601 = this.ezAddingTimeEntry.clockInIso;
        timeEntryRequest.clockInISO8601Utc = this.ezAddingTimeEntry.clockInIso;
        timeEntryRequest.clockOutIso = this.ezAddingTimeEntry.clockOutIso;
        timeEntryRequest.clockOutIso8601 = this.ezAddingTimeEntry.clockOutIso;
        timeEntryRequest.clockOutISO8601Utc = this.ezAddingTimeEntry.clockOutIso;
        timeEntryRequest.description = this.ezAddingTimeEntry.notes;
        timeEntryRequest.notes = this.ezAddingTimeEntry.notes;
        timeEntryRequest.targetTimeZone = ezApi.ezclocker.ezDateTime.activeTimeZone;
        timeEntryRequest.dataTagMaps = ezDataTagMaps;

        return timeEntryRequest;
    }

    /**
        @public
        Creates a EzTimeEntryRequest entity adding a new time entry as a break via the ezClocker API.
        @param {undefined|null|array} ezDataTagMaps
        Expecting an array of EzDataTagMap entities
        @param {EzTimeEntryRequest}
     */
     ezCreateAddBreakTimeEntryRequest(ezDataTagMaps) {
        if (!EzNumber.isNumber(this.ezAddingTimeEntry.employerId)) {
            throw new EzException(
                ezApi.ezEM`
                    Unable to build the add time entry payload.
                    The adding time entry does not have a valid employer id.
                    Adding time entry: ${ezApi.ezToJson(this.ezAddingTimeEntry)}`);
        }
        if (!EzNumber.isNumber(this.ezAddingTimeEntry.employeeId)) {
            throw new EzException(
                ezApi.ezEM`
                    Unable to build the add time entry payload.
                    The adding time entry does not have a valid employee id.
                    Adding time entry: ${ezApi.ezToJson(this.ezAddingTimeEntry)}`);
        }

        let timeEntryRequest = new EzTimeEntryRequest();

        timeEntryRequest.employerId = this.ezAddingTimeEntry.employerId;
        timeEntryRequest.employeeId = this.ezAddingTimeEntry.employeeId;
        timeEntryRequest.parentTimeEntryId = this.ezAddingTimeEntry.parentTimeEntryId;
        timeEntryRequest.timeEntryType = EzTimeEntryType.BREAK;
        timeEntryRequest.clockInIso = this.ezAddingTimeEntry.clockInIso;
        timeEntryRequest.clockInIso8601 = this.ezAddingTimeEntry.clockInIso;
        timeEntryRequest.clockInISO8601Utc = this.ezAddingTimeEntry.clockInIso;
        timeEntryRequest.clockOutIso = this.ezAddingTimeEntry.clockOutIso;
        timeEntryRequest.clockOutIso8601 = this.ezAddingTimeEntry.clockOutIso;
        timeEntryRequest.clockOutISO8601Utc = this.ezAddingTimeEntry.clockOutIso;
        timeEntryRequest.description = this.ezAddingTimeEntry.notes;
        timeEntryRequest.notes = this.ezAddingTimeEntry.notes;
        timeEntryRequest.targetTimeZone = ezApi.ezclocker.ezDateTime.activeTimeZone;
        timeEntryRequest.dataTagMaps = ezDataTagMaps;

        return timeEntryRequest;
    }


    /**
        @public @method
        Builds the update time entry payload
        @param {string} ezDataTagMaps
        Expecting an array of EzDataTagMap entities
        @returns {object}
     */
    ezCreateUpdateTimeEntryRequest(ezDataTagMaps) {
        if (!EzNumber.isNumber(this.ezEditingTimeEntry.id)) {
            throw new EzException(
                ezApi.ezEM`
                    Unable to build the update break time entry payload.
                    The editing time entry does not have a valid id.
                    Editing time entry: ${ezApi.ezToJson(this.ezEditingTimeEntry)}`);
        }
        if (!EzNumber.isNumber(this.ezEditingTimeEntry.employerId)) {
            throw new EzException(
                ezApi.ezEM`
                    Unable to build the update time entry payload.
                    The editing time entry does not have a valid employer id.
                    Editing time entry: ${ezApi.ezToJson(this.ezEditingTimeEntry)}`);
        }
        if (!EzNumber.isNumber(this.ezEditingTimeEntry.employeeId)) {
            throw new EzException(
                ezApi.ezEM`
                    Unable to build the update time entry payload.
                    The editing time entry does not have a valid employee id.
                    Editing time entry: ${ezApi.ezToJson(this.ezEditingTimeEntry)}`);
        }

        let timeEntryRequest = new EzTimeEntryRequest();

        timeEntryRequest.id = this.ezEditingTimeEntry.id;
        timeEntryRequest.employerId = this.ezEditingTimeEntry.employerId;
        timeEntryRequest.employeeId = this.ezEditingTimeEntry.employeeId;
        timeEntryRequest.customerId = this.ezEditingTimeEntry.customerId;
        timeEntryRequest.scheduleId = this.ezEditingTimeEntry.scheduleId;
        timeEntryRequest.timeEntryType = EzTimeEntryType.NORMAL;
        timeEntryRequest.serverClockInIso = this.ezEditingTimeEntry.serverClockInIso;
        timeEntryRequest.serverClockOutIso = this.ezEditingTimeEntry.serverClockOutIso;
        timeEntryRequest.isActiveClockIn = this.ezEditingTimeEntry.isActiveClockIn;
        timeEntryRequest.clockInIso = this.ezEditingTimeEntry.clockInIso;
        timeEntryRequest.clockInGpsStatus = this.ezEditingTimeEntry.clockInGpsStatus;
        timeEntryRequest.clockOutIso = this.ezEditingTimeEntry.clockOutIso;
        timeEntryRequest.clockOutGpsStatus = this.ezEditingTimeEntry.clockOutGpsStatus;
        timeEntryRequest.notes = this.ezEditingTimeEntry.notes;
        timeEntryRequest.targetTimeZoneId = ezApi.ezclocker.ezDateTime.activeTimeZone;
        timeEntryRequest.dataTagMaps = ezDataTagMaps;
        timeEntryRequest.paid = this.ezEditingTimeEntry.paid;

        return timeEntryRequest;
    }

    /**
        @public @method
        Builds the update time entry payload
        @param {undefined|null|array}
        Expecting an array of EzDataTagMap entities
        @returns {object}
     */
    ezCreateUpdateBreakTimeEntryRequest(ezDataTagMaps) {
        if (!EzNumber.isNumber(this.ezEditingTimeEntry.id)) {
            throw new EzException(
                ezApi.ezEM`
                    Unable to build the update break time entry payload.
                    The editing time entry does not have a valid id.
                    Editing time entry: ${ezApi.ezToJson(this.ezEditingTimeEntry)}`);
        }
        if (!EzNumber.isNumber(this.ezEditingTimeEntry.employerId)) {
            throw new EzException(
                ezApi.ezEM`
                    Unable to build the update break time entry payload.
                    The editing time entry does not have a valid employer id.
                    Editing time entry: ${ezApi.ezToJson(this.ezEditingTimeEntry)}`);
        }
        if (!EzNumber.isNumber(this.ezEditingTimeEntry.employeeId)) {
            throw new EzException(
                ezApi.ezEM`
                    Unable to build the update break time entry payload.
                    The editing time entry does not have a valid employee id.
                    Editing time entry: ${ezApi.ezToJson(this.ezEditingTimeEntry)}`);
        }

        let timeEntryRequest = new EzTimeEntryRequest();

        timeEntryRequest.id = this.ezEditingTimeEntry.id;
        timeEntryRequest.employerId = this.ezEditingTimeEntry.employerId;
        timeEntryRequest.employeeId = this.ezEditingTimeEntry.employeeId;
        timeEntryRequest.customerId = this.ezEditingTimeEntry.customerId;
        timeEntryRequest.scheduleId = this.ezEditingTimeEntry.scheduleId;
        timeEntryRequest.parentTimeEntryId = this.ezEditingTimeEntry.parentTimeEntryId;
        timeEntryRequest.timeEntryType = EzTimeEntryType.BREAK;
        timeEntryRequest.serverClockInIso = this.ezEditingTimeEntry.serverClockInIso;
        timeEntryRequest.serverClockOutIso = this.ezEditingTimeEntry.serverClockOutIso;
        timeEntryRequest.isActiveClockIn = this.ezEditingTimeEntry.isActiveClockIn;
        timeEntryRequest.clockInIso = this.ezEditingTimeEntry.clockInIso;
        timeEntryRequest.clockInGpsStatus = this.ezEditingTimeEntry.clockInGpsStatus;
        timeEntryRequest.clockOutIso = this.ezEditingTimeEntry.clockOutIso;
        timeEntryRequest.clockOutGpsStatus = this.ezEditingTimeEntry.clockOutGpsStatus;
        timeEntryRequest.notes = this.ezEditingTimeEntry.notes;
        timeEntryRequest.targetTimeZoneId = ezApi.ezclocker.ezDateTime.activeTimeZone;
        timeEntryRequest.dataTagMaps = ezDataTagMaps;
        timeEntryRequest.paid = this.ezEditingTimeEntry.paid;

        return timeEntryRequest;
    }
}

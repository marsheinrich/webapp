import {
    EzString
} from '/ezlibrary/helpers/EzHelpers.js';

import { EzJSONSerializable } from '/ezlibrary/entities/EzJSONSerializable.js';

/**
    @class
    @extends {EzJSONSerializable}
    @description
    Javascript entity equivlent to Java's EzSchedule
    To convert this object to a JSON string:
        * Call the instances asJson proeprty
        * Call the instances ezToJson() function
        * Use ezApi.ezToJson(instance) or EzJson.toJson(instance)
    DO NOT USE JSON.serialize directly to avoid losing any getter/settter properties.
    ---------------------------------------------------------------------
    Import with:
        import { EzSchedule } from '/ezlibrary/entities/EzSchedule.js';
    ---------------------------------------------------------------------
 */
export class EzSchedule extends EzJSONSerializable {
    /**
        @public @constructor
        Creates a new instance of EzSchedule
        @returns {EzSchedule}
     */
    constructor() {
        super();
    }

    id;
    employerId;
    employeeId;

    // By default: fix to send -1 back instead of null. Addresses null pointer exception in IOS apps.
    locationId = -1;

    // By default: fix to send -1 back instead of null. Addresses null pointer exception in IOS apps.
    pendingLocationId = -1;

    startDateTimeIso = null;
    pendingStartDateTimeIso = null;

    endDateTimeIso = null;
    pendingEndDateTimeIso = null;

    notes = EzString.EMPTY;
    pendingNotes = EzString.EMPTY;

    modified = false;
    deleted = false;
    employeeNotifiedBeforeShift = false;
    published = false;

    firstPublishedDateTimeIso = null;
    lastUpdatePublishedDateTimeIso = null;
    publishedFailedCount = -1;

    createdIso = null;
    updatedIso = null;
    deletedIso = null;
    source = 'WEBSITE';

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
            locationId: this.locationId,
            pendingLocationId: this.pendingLocationId,
            startDateTimeIso: this.startDateTimeIso,
            pendingStartDateTimeIso: this.pendingStartDateTimeIso,
            endDateTimeIso: this.endDateTimeIso,
            pendingEndDateTimeIso: this.pendingEndDateTimeIso,
            notes: this.notes,
            pendingNotes: this.pendingNotes,
            modified: this.modified,
            deleted: this.deleted,
            employeeNotifiedBeforeShift: this.employeeNotifiedBeforeShift,
            published: this.published,
            firstPublishedDateTimeIso: this.firstPublishedDateTimeIso,
            lastUpdatePublishedDateTimeIso: this.lastUpdatePublishedDateTimeIso,
            publishedFailedCount: this.publishedFailedCount,
            createdIso: this.createdIso,
            updatedIso: this.updatedIso,
            deletedIso: this.deletedIso,
            source: this.source,
        }
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

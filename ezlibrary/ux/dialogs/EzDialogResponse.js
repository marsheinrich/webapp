import { EzObject } from '/ezlibrary/helpers/EzObject.js';
import { EzString } from '/ezlibrary/helpers/EzString.js';

import { EzJSONSerializable } from '/ezlibrary/entities/EzJSONSerializable.js';

import { EzDialogResponseStatus } from '/ezlibrary/ux/dialogs/EzDialogResponseStatus.js';

/**
 * @class
 * @extends {EzJSONSerializable}
 * @description
 * Represents the response from a dialog with action buttons.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *     import { EzDialogResponse } from '/ezlibrary/ux/dialogs/EzDialogResponse.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzDialogResponse extends EzJSONSerializable {
    /**
     * @static
     * @public @readonly @property
     * Returns a basic OK EzDialogResponse
     * @returns {EzDialogResponse}
     */
    static get OK() {
        return new EzDialogResponse(EzDialogResponseStatus.OK);
    }

    /**
     * @static
     * @public @readonly @property
     * Returns a basic CANCEL EzDialogResponse
     * @returns {EzDialogResponse}
     */
    static get CANCEL() {
        return new EzDialogResponse(EzDialogResponseStatus.CANCEL);
    }

    /**
     * @static
     * @public @readonly @property
     * Returns a basic YES EzDialogResponse
     * @returns {EzDialogResponse}
     */
    static get YES() {
        return new EzDialogResponse(EzDialogResponseStatus.YES);
    }

    /**
     * @static
     * @public @readonly @property
     * Returns a basic NO EzDialogResponse
     * @returns {EzDialogResponse}
     */
    static get NO() {
        return new EzDialogResponse(EzDialogResponseStatus.NO);
    }

    /**
     * @static
     * @public @readonly @property
     * Returns a basic ACCEPT EzDialogResponse
     * @returns {EzDialogResponse}
     */
    static get ACCEPT() {
        return new EzDialogResponse(EzDialogResponseStatus.ACCEPT);
    }

    /**
     * @static
     * @public @readonly @property
     * Returns a basic ACCEPT EzDialogResponse
     * @returns {EzDialogResponse}
     */
    static get CONFIRM() {
        return new EzDialogResponse(EzDialogResponseStatus.CONFIRM);
    }

    /**
     * @static
     * @public @readonly @property
     * Returns a basic DECLINE EzDialogResponse
     * @returns {EzDialogResponse}
     */
    static get DECLINE() {
        return new EzDialogResponse(EzDialogResponseStatus.DECLINE);
    }

    /**
     * @static
     * @public @readonly @property
     * Returns a basic CONTINUE EzDialogResponse
     * @returns {EzDialogResponse}
     */
    static get CONTINUE() {
        return new EzDialogResponse(EzDialogResponseStatus.CONTINUE);
    }

    /**
     * @static
     * @public @readonly @property
     * Returns a basic STOP EzDialogResponse
     * @returns {EzDialogResponse}
     */
    static get STOP() {
        return new EzDialogResponse(EzDialogResponseStatus.STOP);
    }

    /**
     * @static
     * @public @readonly @property
     * Returns a basic APPROVED EzDialogResponse
     * @returns {EzDialogResponse}
     */
    static get APPROVED() {
        return new EzDialogResponse(EzDialogResponseStatus.APPROVED);
    }

    /**
     * @static
     * @public @readonly @property
     * Returns a basic DENIED EzDialogResponse
     * @returns {EzDialogResponse}
     */
    static get DENIED() {
        return new EzDialogResponse(EzDialogResponseStatus.DENIED);
    }

    /**
     * @static
     * @public @readonly @property
     * Returns a basic RETRY EzDialogResponse
     * @returns {EzDialogResponse}
     */
    static get RETRY() {
        return new EzDialogResponse(EzDialogResponseStatus.RETRY);
    }

    /**
     * @static
     * @public @readonly @property
     * Returns a OK EzDialogResponse
     * @returns {EzDialogResponse}
     */
    static ezOkResponse(dialogId, optionalPassThroughData) {
        return EzDialogResponse.build(
            dialogId,
            EzDialogResponseStatus.OK,
            optionalPassThroughData);
    }

    /**
     * @static
     * @public @readonly @property
     * Returns a CANCEL EzDialogResponse
     * @returns {EzDialogResponse}
     */
    static ezCancelResponse(dialogId, optionalPassThroughData) {
        return EzDialogResponse.build(
            dialogId,
            EzDialogResponseStatus.CANCEL,
            optionalPassThroughData);
    }

    /**
     * @static
     * @public @readonly @property
     * Returns a YES EzDialogResponse
     * @returns {EzDialogResponse}
     */
    static ezYesResponse(dialogId, optionalPassThroughData) {
        return EzDialogResponse.build(
            dialogId,
            EzDialogResponseStatus.YES,
            optionalPassThroughData);
    }

    /**
     * @static
     * @public @readonly @property
     * Returns a NO EzDialogResponse
     * @returns {EzDialogResponse}
     */
    static ezNoResponse(dialogId, optionalPassThroughData) {
        return EzDialogResponse.build(
            dialogId,
            EzDialogResponseStatus.NO,
            optionalPassThroughData);
    }

    /**
     * @static
     * @public @readonly @property
     * Returns a ACCEPT EzDialogResponse
     * @returns {EzDialogResponse}
     */
    static ezAcceptResponse(dialogId, optionalPassThroughData) {
        return EzDialogResponse.build(
            dialogId,
            EzDialogResponseStatus.ACCEPT,
            optionalPassThroughData);
    }

    /**
     * @static
     * @public @readonly @property
     * Returns a DECLINE EzDialogResponse
     * @returns {EzDialogResponse}
     */
    static ezDeclineResponse(dialogId, optionalPassThroughData) {
        return EzDialogResponse.build(
            dialogId,
            EzDialogResponseStatus.DECLINE,
            optionalPassThroughData);
    }

    /**
     * @static
     * @public @readonly @property
     * Returns a CONTINUE EzDialogResponse
     * @returns {EzDialogResponse}
     */
    static ezContinueResponse(dialogId, optionalPassThroughData) {
        return EzDialogResponse.build(
            dialogId,
            EzDialogResponseStatus.CONTINUE,
            optionalPassThroughData);
    }

    /**
     * @static
     * @public @readonly @property
     * Returns a STOP EzDialogResponse
     * @returns {EzDialogResponse}
     */
    static ezStopResponse(dialogId, optionalPassThroughData) {
        return EzDialogResponse.build(
            dialogId,
            EzDialogResponseStatus.STOP,
            optionalPassThroughData);
    }

    /**
     * @static
     * @public @readonly @property
     * Returns a APPROVED EzDialogResponse
     * @returns {EzDialogResponse}
     */
    static ezApprovedResponse(dialogId, optionalPassThroughData) {
        return EzDialogResponse.build(
            dialogId,
            EzDialogResponseStatus.APPROVED,
            optionalPassThroughData);
    }

    /**
     * @static
     * @public @readonly @property
     * Returns a DENIED EzDialogResponse
     * @returns {EzDialogResponse}
     */
    static ezDeniedResponse(dialogId, optionalPassThroughData) {
        return EzDialogResponse.build(
            dialogId,
            EzDialogResponseStatus.DENIED,
            optionalPassThroughData);
    }

    /**
     * @static
     * @public @readonly @property
     * Returns a RETRY EzDialogResponse
     * @returns {EzDialogResponse}
     */
    static ezRetryResponse(dialogId, optionalPassThroughData) {
        return EzDialogResponse.build(
            dialogId,
            EzDialogResponseStatus.RETRY,
            optionalPassThroughData);
    }

    /**
     * @static
     * @public @method
     * Creates a new instance of EzDialogResponse
     * @param {string} dialogId
     * The id for the dialog's root HTML element.
     * @param {string} ezDialogResponseStatus
     * A valid enum property value from EzDialogResponseStatus
     * Default: EzDialogResponseStatus.OK
     * @param {undefined|null|*} optionalPassThroughData
     * @returns {EzDialogResponse}
     */
    static build(dialogId, ezDialogResponseStatus, optionalPassThroughData) {
        if (!EzString.stringHasLength(dialogId)) {
            throw new EzBadParamException(
                'dialogId',
                EzDialogResponse,
                EzDialogResponse.build);
        }

        return new EzDialogResponse(
            ezDialogResponseStatus,
            optionalPassThroughData,
            dialogId);
    }

    /**
     * @public @constructor
     * Creates a new instance of EzDialogResponse
     * @param {string} ezDialogResponseStatus
     * A valid enum property value from EzDialogResponseStatus
     * Default: EzDialogResponseStatus.OK
     * @param {undefined|null|string} optionaDialogId
     * @param {undefined|null|*} optionalPassThroughData
     */
    constructor(ezDialogResponseStatus, optionalPassThroughData, optionaDialogId) {
        super();
        this.dialogStatus = ezDialogResponseStatus;
        this.ezDialogId = optionaDialogId;
        this.passThroughData = optionalPassThroughData;
    }

    /**
     * @private @field
     * Stores the dialog's EzDialogResponseStatus value
     * Default: EzDialogResponseStatus.OK
     * @type {string}
     * A valid enum property value from EzDialogResponseStatus
     */
    #dialogStatus = EzDialogResponseStatus.OK;
    /**
     * @public @readonly @property
     * Gets the dialog's EzDialogResponseStatus value
     * @returns {string}
     * A valid enum property value from EzDialogResponseStatus
     */
    get dialogStatus() {
        return this.#dialogStatus;
    }
    /**
     * @public @property @setter
     * Sets the dialogStatus.
     * If the dialogStatus param is undefined, null, or EzDialogResponseStatus.UNKNOWN, then EzDialogResponseStatus.OK is assigned.
     * @param {string} dialogStatus
     * A valid enum property value from EzDialogResponseStatus
     */
    set dialogStatus(dialogStatus) {
        dialogStatus = EzDialogResponseStatus.ezAsEnum(dialogStatus);

        this.#dialogStatus = EzDialogResponseStatus.UNKNOWN !== dialogStatus
            ? dialogStatus
            : EzDialogResponseStatus.OK;
    }

    /**
     * @private @field
     * Stores the dialogs root html element id (optional)
     * Default: null
     * @type {string}
     */
    #ezDialogId = null;
    /**
     * @public @readonly @property
     * Gets the dialogs root html element id (optional)
     * @returns {string}
     */
    get ezDialogId() {
        return this.#ezDialogId;
    }
    /**
     * @public @property @setter
     * Sets the dialogs root html element id (optional)
     * If dialogId is undefined or null then null is assigned.
     * @param {string} dialogId
     */
    set ezDialogId(dialogId) {
        this.#ezDialogId = EzString.stringOrNull(dialogId);
    }

    /**
     * // TODO: Remove this getter once all use is migrated.
     * @public @readonly @property
     * Gets the dialogs root html element id (optional)
     * @returns {string}
     * @deprecated
     * Migrate to using the ezDialogId property instead.
     */
    get id() {
        return this.#ezDialogId;
    }

    /**
     * @private @field
     * Stores data that will pass back in the response.
     * @type {*}  via EzDialogResponseStatus enumeration
     */
    #passThroughData = null;
    /**
     * @public @readonly @property
     * Gets data that will pass back in the response.
     * @returns {null|*}
     */
    get passThroughData() {
        return this.#passThroughData;
    }
    /**
     * @public @property @setter
     * Sets data that will pass back in the response.
     * If the passThroughData param is undefined or null then null is assigned.
     * @param {null|*} passThroughData
     */
    set passThroughData(passThroughData) {
        this.#passThroughData = EzObject.assignOrNull(passThroughData);
    }

    /**
     * // TODO: Remove the 'id' entry once the id property is removed.
     * @override
     * @public @readonly @property
     * Gets an array of JSON property names. This array is used
     * to determine what properties should serialize to JSON when
     * accessing properties asJSONObject or asJSON or method ezToJSON()
     * @returns {array}
     */
    get ezJSONProps() {
        return [
            'id',
            'dialogId',
            'dialogStatus',
            'passThroughData'
        ];
    }

    /**
     * // TODO: Remove the id: this.dialogId from the JSON object response once the id property is removed.
     * @override
     * @public @readonly @property
     * Returns this instance as a JSON Object (will no longer have the getter/setter methods).
     * Useful for serailization to JSON.
     * @returns {object}
     */
    get asJSONObject() {
        return {
            id: this.ezDialogId,
            dialogId: this.ezDialogId,
            dialogStatus: this.dialogStatus,
            passThroughData: this.passThroughData
        }
    }

    /**
     * @override
     * @public @readonly @property
     * Returns this instance as JSON string (no formatting)
     * @returns {String}
     */
    get asJSON() {
        return super.asJSON;
    }

    /**
     * @override
     * @public @method
     * Converts this instance into a JSON string with optional formatting.
     * @param {undefined|null|Number} indentValue
     * @param {undefined|null|Boolean} htmlDisplay
     * @returns {String}
     */
    ezToJSON(indentValue, htmlDisplay) {
        return super.ezToJSON(indentValue, htmlDisplay);
    }

    /**
     * @override
     * @public @method
     * Copies properties from the provided jsonObject to this instance (even if this instance does not define the property)
     * @param {Object} jsonObject
     * @returns {Object}
     * Returns this instance with the key & values from the provided jsonObject.
     */
    ezFromJSONObject(jsonObject) {
        return super.ezFromJSONObject(jsonObject);
    }

    /**
     * @override
     * @public @method
     * Converts the provided jsonString to a JSON object and then
     * passes that object to ezFromJSONObject() to copies properties to this instance
     * (even if this instance does not define the property)
     * @param {String} jsonString
     * @returns {Object}
     * Returns this instance with the key & values from the provided json string.
     */
    ezLoadFromJson(jsonString) {
        return super.ezLoadFromJson(jsonString);
    }
}

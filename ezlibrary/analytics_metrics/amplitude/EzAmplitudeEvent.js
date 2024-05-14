/**
 * @class
 * @description
 * Definition of EzClocker's basic amplitude event object
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *     import { EzAmplitudeEvent } from '/ezlibrary/analytics_metrics/amplitude/EzAmplitudeEvent.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzAmplitudeEvent {
    /**
     * @public @constructor
     * Creates a new instance of EzAmplitudeEvent
     * @param {string} id
     * @param {string} action
     * @param {object} windowLocation
     * @param {object} userContext
     * @param {string} userId
     * @param {string} deviceId
     */
    constructor (id, action, windowLocation, userContext, userId, deviceId) {
        this.id = id;
        this.action = action;
        this.windowLocation = windowLocation;
        this.userContext = userContext;
        this.userId = userId;
        this.deviceId = deviceId;
    }

    // Custom properties
    id = '';
    action = '';
    windowLocation =  window.location;
    userContext = {};

    // Amplitude Properties
    userId = '';
    devicveId = '';
}
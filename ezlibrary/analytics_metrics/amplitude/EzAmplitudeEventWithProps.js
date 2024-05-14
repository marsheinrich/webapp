import { EzAmplitudeEvent } from '/ezlibrary/analytics_metrics/amplitude/EzAmplitudeEvent.js';

/**
 * @class
 * @description
 * Definition of EzClocker's basic amplitude event object
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *     import { EzAmplitudeEventWithProps } from '/ezlibrary/analytics_metrics/amplitude/EzAmplitudeEventWithProps.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzAmplitudeEventWithProps extends EzAmplitudeEvent {
    /**
     * @public @constructor
     * Creates a new instance of EzAmplitudeEvent
     * @param {string} id
     * @param {string} action
     * @param {object} windowLocation
     * @param {object} userContext
     * @param {object} properties
     * @param {string} userId
     * @param {string} deviceId
     */
    constructor (id, action, windowLocation, userContext, properties, userId, deviceId) {
        super(id, action, windowLocation, userContext, userId, deviceId);

        this.properties = properties;
    }

    properties = {};
}
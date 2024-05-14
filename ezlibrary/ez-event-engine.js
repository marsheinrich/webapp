import {
    EzObject,
    EzBoolean,
    EzString,
    EzFunction
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzException,
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzRegistrationState
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzWantEventSettings } from '/ezlibrary/entities/EzWantEventSettings.js';
import { EzEventData } from '/ezlibrary/entities/EzEventData.js';
import { EzWantEventDef } from '/ezlibrary/events/EzWantEventDef.js';
import { EzWantElementEventDef } from '/ezlibrary/events/EzWantElementEventDef.js';

// TODO: Move this class to /ezlibrary/events/EzEventEngine.js and update import references.

/**
 * @class
 * @extends {EzClass}
 * @description
 * ezClocker UX Event Engine
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Import with:
 *     import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Ready checks:
 *     globalThis.ezApi.ezclocker?.[EzEventEngine.ezApiName]?.ready
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Listen to ready event:
 *     document.addEventListener(
 *         EzEventEngine.ezEventNames.onReady,
 *         {listening class name}.#ezRegistrator);
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Register a event for others to listen to:
 *     General Example:
 *         ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
 *             <name_of_class_that_triggers_event>,
 *             <event_name>);
 *
 *     Typical Example (used in most classes):
 *         ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
 *             <event_owner_class>.ezApiName,
 *             <event_owner_class>.ezEventNames.<event_name>);
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Trigger a event:
 *     General Example:
 *         ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
 *             <name_of_registered_event_to_trigger>,
 *             <data to send with event>);
 *
 *     Typical Example (used in most classes):
 *         ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
 *             <EzMyClass>.ezEventNames.<onEventNameToTrigger>,
 *             ezApi.ezclocker.ezEventEngine.ezBuildEventData(
 *                 <EzMyClass>.ezApiName,
 *                 "Event triggereed statement",
 *                 <data to send with event>));
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Listen for a registered event templates:
 *     General Example:
 *         ezApi.ezclocker.ezEventEngine.ezWantEvent(
 *             <event_name>,
 *             <name_of_class_listenting_for_event>,
 *             <reference_to_function_handling_the_event>);
 *
 *     Typical Example ()used in most classes):
 *     ezApi.ezclocker.ezEventEngine.ezWantEvent(
 *         <event_name>,
 *         <class_listening_for_event>.ezApiName,
 *         <class_listening_for_event>.ezInstance.<method_handling_event>);
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Listen to a HTML Element Event:
 *      ezApi.ezclocker.ezeventEngine.ezWantElementEvent(
 *          {elementId},
 *          {event name - use EzElementEventName enum class},
 *          {name of class who created this listener},
 *          {reference to function that will handle the event});
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
export class EzEventEngine extends EzClass {
    /**
     * @static
     * @public @method
     * Allows creating a new instance of EzWantElementEventDef without having to import EzWantElementEventDef.
     * @param {string} elementId
     * @param {string} elementEventName
     * @param {function} elementEventHandlerFunction
     * @returns {EzWantElementEventDef}
     */
    static ezCreateEzWantElementEventDef(elementId, elementEventName, elementEventHandlerFunction) {
        if (!EzString.hasLength(elementId)) {
            throw new EzBadParamException(
                'elementId',
                EzEventEngine,
                EzEventEngine.ezCreateWantElementEventDef);
        }
        if (!EzString.hasLength(elementEventName)) {
            throw new EzBadParamException(
                'elementEventName',
                EzEventEngine,
                EzEventEngine.ezCreateWantElementEventDef);
        }
        if (!ezApi.ezIsFunction(elementEventHandlerFunction)) {
            throw new EzBadParamException(
                'elementEventHandlerFunction',
                EzEventEngine,
                EzEventEngine.ezCreateWantElementEventDef);
        }

        return new EzWantElementEventDef(elementId, elementEventName, elementEventHandlerFunction);
    }

    /**`
     * @public @method
     * Allows creating a new instance of EzWantElementEventDef without having to import EzWantElementEventDef.
     * @param {string} eventName
     * @param {function} eventHandlerFunction
     * @param {undefined|null|boolean} immediateTriggerIfAlreadyTriggered
     * @param {undefined|null|boolean} unwantAfterFirstTrigger
     * @returns {EzWantEventDef}
     */
    static ezCreateEzWantEventDef(eventName, eventHandlerFunction, immediateTriggerIfAlreadyTriggered, unwantAfterFirstTrigger) {
        if (!EzString.hasLength(eventName)) {
            throw new EzBadParamException(
                'eventName',
                EzEventEngine,
                EzEventEngine.ezCreateEzWantEventDef);
        }
        if (!ezApi.ezIsFunction(eventHandlerFunction)) {
            throw new EzBadParamException(
                'eventHandlerFunction',
                EzEventEngine,
                EzEventEngine.ezCreateEzWantEventDef);
        }

        return new EzWantEventDef(
            eventName,
            eventHandlerFunction,
            immediateTriggerIfAlreadyTriggered,
            unwantAfterFirstTrigger);
    }

    /**
     * @public @field
     * Object that contains the registered events name information
     * @type {object}
     */
    ezRegisteredEventNames = {};

    /**
     * @public @field
     * Object that contains the want event registrations.
     * @type {object}
     */
    ezWantEventRegistrations = {};

    /**
     * @public @field
     * Object that contains the want event properties
     * @type {object}
     */
    ezWantEventProperties = {};

    /**
     * @deprecated
        Migrate to using the static reference instead: EzEventEngine.ezEventNames
     * @public @readonly @property
     * Returns the class static EzEventEngine.ezEventNames
     * @returns {object}
     */
    get ezEventNames() {
        return EzEventEngine.ezEventNames;
    }

    /**
     * @public @field
     * Toggles the EzEventEngine debug mode logging
     * @type {boolean}
     */
    #ezDebugMode = false;
    /**
     * @public @property @getter
     * Returns if debug mode is turned on or not
     * @returns {boolean}
     */
    get ezDebugMode() {
        return this.#ezDebugMode;
    }
    /**
     * @public @property @setter
     * Sets the event engine's debug mode.
     * @param {boolean} debugMode
     */
    set ezDebugMode(debugMode) {
        this.#ezDebugMode = EzBoolean.isTrue(debugMode);

        if (EzBoolean.isTrue(EzEventEngine.ezInstance.#ezDebugMode)) {
            EzEventEngine.ezInstance.ezWantEvent(
                EzEventEngine.ezEventNames.onReady,
                EzEventEngine.ezApiName,
                EzEventEngine.ezInstance.ezDebugLogInternalEvents);

            EzEventEngine.ezInstance.ezWantEvent(
                EzEventEngine.ezEventNames.onEventRegistered,
                EzEventEngine.ezApiName,
                EzEventEngine.ezInstance.ezDebugLogInternalEvents);

            EzEventEngine.ezInstance.ezWantEvent(
                EzEventEngine.ezEventNames.onWantEventRegistered,
                EzEventEngine.ezApiName,
                EzEventEngine.ezInstance.ezDebugLogInternalEvents);

            EzEventEngine.ezInstance.ezWantEvent(
                EzEventEngine.ezEventNames.onUnwantEventProcessed,
                EzEventEngine.ezInstance.ezApiName,
                EzEventEngine.ezInstance.ezDebugLogInternalEvents);
        } else {
            EzEventEngine.ezInstance.ezUnwantEvent(EzEventEngine.ezEventNames.onReady, EzEventEngine.ezApiName);

            EzEventEngine.ezInstance.ezUnwantEvent(EzEventEngine.ezEventNames.onEventRegistered, EzEventEngine.ezApiName);

            EzEventEngine.ezInstance.ezUnwantEvent(EzEventEngine.ezEventNames.onWantEventRegistered, EzEventEngine.ezApiName);

            EzEventEngine.ezInstance.ezUnwantEvent(EzEventEngine.ezEventNames.onUnwantEventProcessed, EzEventEngine.ezApiName);
        }
    }

    /**
     * @public @method
     * Initializes the EzEventEngine
     * @returns {EzEventEngine}
     */
    ezInit() {
        EzEventEngine.ezInstance.ezRegisterEvent(
            EzEventEngine.ezApiName,
            EzEventEngine.ezEventNames.onEventRegistered);

        EzEventEngine.ezInstance.ezRegisterEvent(
            EzEventEngine.ezApiName,
            EzEventEngine.ezEventNames.onReady);

        EzEventEngine.ezInstance.ezRegisterEvent(
            EzEventEngine.ezApiName,
            EzEventEngine.ezEventNames.onWantEventRegistered);

        EzEventEngine.ezInstance.ezRegisterEvent(
            EzEventEngine.ezApiName,
            EzEventEngine.ezEventNames.onUnwantEventProcessed);

        EzEventEngine.ezInstance.ezWantEventRegistrations[EzEventEngine.ezEventNames.onReady] = {};

        EzEventEngine.ezInstance.ezWantEventRegistrations[EzEventEngine.ezEventNames.onEventRegistered] = {};

        EzEventEngine.ezInstance.ezWantEventRegistrations[EzEventEngine.ezEventNames.onWantEventRegistered] = {};

        EzEventEngine.ezInstance.ezWantEventRegistrations[EzEventEngine.ezEventNames.onUnwantEventProcessed] = {};

        EzEventEngine.ezInstance.ezWantEventProperties[EzEventEngine.ezEventNames.onReady] = {};

        EzEventEngine.ezInstance.ezWantEventProperties[EzEventEngine.ezEventNames.onEventRegistered] = {};

        EzEventEngine.ezInstance.ezWantEventProperties[EzEventEngine.ezEventNames.onWantEventRegistered] = {};

        EzEventEngine.ezInstance.ezWantEventProperties[EzEventEngine.ezEventNames.onUnwantEventProcessed] = {};

        EzEventEngine.ezInstance.ezDebugMode = false;

        EzEventEngine.ezInstance.ezWantEvent(
            EzEventEngine.ezEventNames.onReady,
            EzEventEngine.ezApiName,
            (eventData) => {
                document.dispatchEvent(
                    new CustomEvent(
                        'EzClockerEzEventEngineInitialized',
                        {
                            bubbles: true,
                            ezApi: eventData.data
                        }));
            },
            true);

        EzEventEngine.ezInstance.ezTriggerEvent(
            EzEventEngine.ezEventNames.onReady,
            new EzEventData(
                EzEventEngine.ezApiName,
                'EzEventEngine is ready!',
                EzEventEngine.ezInstance));

        return EzEventEngine.ezInstance;
    }

    /**
     * @public @method
     * Bulk registration of event names for an event owner.
     * @param {string} eventOwnerName
     * @param {array} eventNamesToRegister
     * Array of event names (as a string)
     */
    ezRegisterEvents(eventOwnerName, eventNamesToRegister) {
        if (!EzString.hasLength(eventOwnerName)) {
            throw new EzBadParamException(
                'eventOwnerName',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezRegisterEvents);
        }
        if (!ezApi.ezIsArray(eventNamesToRegister)) {
            throw new EzBadParamException(
                'eventNamesToRegister',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezRegisterEvents);
        }

        for (const eventNameToRegister of eventNamesToRegister) {
            EzEventEngine.ezInstance.ezRegisterEvent(
                eventOwnerName,
                eventNameToRegister);
        }
    }

    /**
     * @public @method
     * Registers an event for triggering
     * @param {string} eventOwner
     * @param {string} eventName
     */
    ezRegisterEvent(eventOwner, eventName) {
        if (!EzString.hasLength(eventOwner)) {
            throw new EzBadParamException(
                'eventOwner',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezRegisterEvent);
        }
        if (!EzString.hasLength(eventName)) {
            throw new EzBadParamException(
                'eventName',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezRegisterEvent);
        }

        let registeredEvent = {
            owner: eventOwner,
            name: eventName,
            ezTriggerCount: 0,
            ezLastTriggerEventData: null
        };

        EzEventEngine.ezInstance.ezRegisteredEventNames[eventName] = registeredEvent;

        EzEventEngine.ezInstance.ezTriggerEvent(
            EzEventEngine.ezEventNames.onEventRegistered,
            new EzEventData(
                EzEventEngine.ezApiName,
                `Registered event name ${eventName} for event owner named ${eventOwner}`,
                registeredEvent));
    }

    /**
     * @public @method
     * Unregisters an event
     * @param {string} eventName
     */
    ezUnregisterEvent(eventName) {
        if (!EzString.hasLength(eventName)) {
            throw new EzBadParamException(
                'eventName',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezRegisterEvent);
        }

        if (EzEventEngine.ezInstance.ezIsEventRegistered(eventName)) {
            delete EzEventEngine.ezInstance.ezRegisteredEventNames[eventName];
        }
    }

    /**
     * @public @method
     * Determines if an event with the provided name is already registerd or not.
     * Note:
     *  It is possible to have multiple events with the same name registered using different
     *  event owner names. This method returns true with the first eventName match.
     * @param {string} eventName
     * @returns {boolean}
     */
    ezIsEventRegistered(eventName) {
        if (!EzString.hasLength(eventName)) {
            throw new EzBadParamException(
                'eventName',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezIsEventRegistered);
        }

        return EzObject.hasProperty(EzEventEngine.ezInstance.ezRegisteredEventNames, eventName);
    }

    /**
     * @public @method
     * Bulk registration of a event handler's want events.
     * @param {string} eventHandlerName
     * @param {array} ezWantEventDefs
     * An array of EzWantEventDef instances.
     */
    ezWantEvents(eventHandlerName, ezWantEventDefs) {
        if (!EzString.hasLength(eventHandlerName)) {
            throw new EzBadParamException(
                'eventHandlerName',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezWantEvents);
        }
        if (!ezApi.ezIsArray(ezWantEventDefs)) {
            throw new EzBadParamException(
                'ezWantEventDefs',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezWantEvents);
        }

        for (const ezWantEventDef of ezWantEventDefs) {
            EzEventEngine.ezInstance.ezWantEvent(
                ezWantEventDef.ezEventName,
                eventHandlerName,
                ezWantEventDef.ezEventHandlerFunction,
                ezWantEventDef.ezImmediateTriggerIfAlreadyTriggered,
                ezWantEventDef.ezUnwantAfterFirstTrigger);
        }
    }

    /**
     * @public @method
     * Registers an event handler named eventHandlerName for event eventName to execute function
     * eventHandlerFunction when eventName is triggered.
     * @param {string} eventName
     * @param {string} handlerName
     * @param {function} handlerFunction
     * @param {undefined|null|boolean} immediateTriggerIfAlreadyTriggered
     * Default is false
     * @param {undefined|null|boolean} unwantAfterFirstTrigger
     * Default is false'
     */
    ezWantEvent(eventName, handlerName, handlerFunction, immediateTriggerIfAlreadyTriggered, unwantAfterFirstTrigger) {
        if (!EzString.hasLength(eventName)) {
            throw new EzBadParamException(
                'eventName',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezWantEvent);
        }
        if (!EzString.hasLength(handlerName)) {
            throw new EzBadParamException(
                'handlerName',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezWantEvent);
        }
        if (!ezApi.ezIsFunction(handlerFunction)) {
            throw new EzBadParamException(
                'handlerFunction',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezWantEvent);
        }

        immediateTriggerIfAlreadyTriggered = EzBoolean.isTrue(immediateTriggerIfAlreadyTriggered);

        unwantAfterFirstTrigger = EzBoolean.isTrue(unwantAfterFirstTrigger);

        EzEventEngine.ezInstance.ezWantEventEx(
            EzEventEngine.ezInstance.ezCreateWantEventSettings(
                eventName,
                handlerName,
                handlerFunction,
                immediateTriggerIfAlreadyTriggered,
                unwantAfterFirstTrigger));
    }

    /**
     * @public @method
     * Registers an event handler named eventHandlerName for event eventName to execute function
     * eventHandlerFunction when eventName is triggered.
     * @param {string} eventName
     * @param {string} handlerName
     * @param {function} handlerFunction
     * @param {undefined|null|boolean} unwantAfterFirstTrigger
     */
    ezWantEventEx(wantEventSettings) {
        if (!EzObject.isValid(wantEventSettings)) {
            throw new EzBadParamException(
                'wantEventSettings',
                'EzEventEngine',
                'ezWantEventEx');
        }
        if (!EzString.hasLength(wantEventSettings.eventName)) {
            throw new EzBadParamException(
                'wantEventSettings.eventName',
                'EzEventEngine',
                'ezWantEventEx');
        }
        if (!EzString.hasLength(wantEventSettings.handlerName)) {
            throw new EzBadParamException(
                'wantEventSettings.handlerName',
                'EzEventEngine',
                'ezWantEventEx');
        }
        if (!ezApi.ezIsFunction(wantEventSettings.handlerFunction)) {
            throw new EzBadParamException(
                'wantEventSettings.handlerFunction',
                'EzEventEngine',
                'ezWantEventEx');
        }

        if (!EzObject.isValid(EzEventEngine.ezInstance.ezWantEventRegistrations[wantEventSettings.eventName])) {
            EzEventEngine.ezInstance.ezWantEventRegistrations[wantEventSettings.eventName] = {};
        }

        EzEventEngine.ezInstance.ezWantEventRegistrations[wantEventSettings.eventName][wantEventSettings.handlerName] = wantEventSettings.handlerFunction;

        EzEventEngine.ezInstance.ezAddWantEventProperties(wantEventSettings);

        EzEventEngine.ezInstance.ezTriggerEvent(
            EzEventEngine.ezEventNames.onWantEventRegistered,
            new EzEventData(
                EzEventEngine.ezApiName,
                `A want event was registerd with settings ${ezApi.ezToJson(wantEventSettings)}.`));

        if (EzObject.isValid(wantEventSettings.options) &&
            EzBoolean.isTrue(wantEventSettings.options.immediateTriggerIfAlreadyTriggered) &&
            EzObject.hasProperty(EzEventEngine.ezInstance.ezRegisteredEventNames, wantEventSettings.eventName) &&
            0 !== EzEventEngine.ezInstance.ezRegisteredEventNames[wantEventSettings.eventName].ezTriggerCount) {

            // Immediatly call the event since it has already triggered at least once
            ezApi.ezCallback(
                wantEventSettings.handlerFunction,
                EzEventEngine.ezInstance.ezRegisteredEventNames[wantEventSettings.eventName].ezLastTriggerEventData);

            EzEventEngine.ezInstance.ezPostTrigger(wantEventSettings.eventName, wantEventSettings.handlerName);
        }
    }

    /**
     * @public @method
     * Triggers an event with eventName with data eventData.
     * @param {string} eventName
     * @param {undefined|null|object} eventData
     */
    ezTriggerEvent(eventName, eventData, thisToApply) {
        if (!EzString.hasLength(eventName)) {
            throw new EzBadParamException(
                'eventName',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezTriggerEvent);
        }

        if (!EzObject.isValid(thisToApply)) {
            thisToApply = this;
        }

        let triggeringEvent = EzEventEngine.ezInstance.ezRegisteredEventNames[eventName];

        if (!EzObject.isValid(triggeringEvent)) {
            if (EzBoolean.isTrue(EzEventEngine.ezInstance.ezDebugMode)) {
                ezApi.ezclocker.ezLogger.error(`EzEventEngine did not trigger unregistered event "${eventName}".`);
            }

            return;
        }

        let wantEvents = EzEventEngine.ezInstance.ezWantEventRegistrations[triggeringEvent.name];

        if (!EzObject.isValid(wantEvents)) {
            if (EzBoolean.isTrue(EzEventEngine.ezInstance.ezDebugMode)) {
                ezApi.ezclocker.ezLogger.warn(
                    EzString.em`
                        No listeners for event ${triggeringEvent.name} at time of trigger
                        with eventData=${ezApi.ezToJson(eventData)}`);
            }

            return;
        }

        triggeringEvent.triggerCount++;

        if (0 == Object.keys(wantEvents).length) {
            // No events to trigger
            return;
        }

        EzEventEngine.ezInstance.ezRegisteredEventNames[eventName].ezTriggerCount++;

        EzEventEngine.ezInstance.ezRegisteredEventNames[eventName].ezLastTriggerEventData = eventData;

        for (let eventHandlerName in wantEvents) {
            if (EzFunction.isFunction(wantEvents[eventHandlerName])) {
                // Call the handler function
                EzFunction.callWithParams(
                    wantEvents[eventHandlerName],
                    [eventData],
                    thisToApply);

                // Old way of calling the handler function
                //ezApi.ezCallback(wantEvents[eventHandlerName], eventData);

                EzEventEngine.ezInstance.ezPostTrigger(eventName, eventHandlerName);
            }
        }
    }

    /**
     * @public @method
     * Removes a handler from the want event listener queue
     * @param {string} eventName
     * @param {string} handlerName
     */
    ezUnwantEvent(eventName, handlerName) {
        if (!EzString.hasLength(eventName)) {
            throw new EzBadParamException(
                'eventName',
                'EzEventEngine',
                'ezUnwantEvent');
        }
        if (!EzString.hasLength(handlerName)) {
            throw new EzBadParamException(
                'handlerName',
                'EzEventEngine',
                'ezUnwantEvent');
        }

        if (EzObject.isValid(EzEventEngine.ezInstance.ezWantEventRegistrations[eventName])) {
            // Remove the handler from the want events
            delete EzEventEngine.ezInstance.ezWantEventRegistrations[eventName][handlerName];
        }

        EzEventEngine.ezInstance.ezTriggerEvent(
            EzEventEngine.ezEventNames.onUnwantEventProcessed,
            new EzEventData(
                EzEventEngine.ezApiName,
                `The event handler ${handlerName} is now disconnected from event ${eventName}.`));
    }

    /**
     * @public @method
     * Handles bulk registration of element events
     * @param {string} handlerName,
     * @param {array} wantElementEventDefs
     * An array of EzWantElementEventDef instances.
     */
    ezWantElementEvents(handlerName, wantElementEventDefs) {
        if (!EzString.hasLength(handlerName)) {
            throw new EzBadParamException(
                'handlerName',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezWantElementEvents);
        }
        if (!ezApi.ezIsArray(wantElementEventDefs)) {
            throw new EzBadParamException(
                'wantElementEventDefs',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezWantElementEvents);
        }

        for (let ezWantElementEventDef of wantElementEventDefs) {
            EzEventEngine.ezInstance.ezWantElementEvent(
                ezWantElementEventDef.ezElementId,
                ezWantElementEventDef.ezElementEventName,
                handlerName,
                ezWantElementEventDef.ezElementEventHandlerFunction);
        }
    }

    /**
     * @public @method
     * Hooks an HTML element's event fire to the provided handlerFunction.
     * @param {object|string} elementOrId
     * @param {string} eventName
     * @param {function} handlerFunction
     * @returns {null|object}
     * Returns the element (if any)
     */
    ezWantElementEvent(elementOrId, elementEvent, handlerName, handlerFunction) {
        if (!EzObject.isValid(elementOrId) || EzString.isString(elementOrId) && !EzString.hasLength(elementOrId)) {
            throw new EzBadParamException(
                'elementOrId',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezWantElementEvent);
        }
        if (!EzString.hasLength(elementEvent)) {
            throw new EzBadParamException(
                'elementEvent',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezWantElementEvent);
        }
        if (!EzString.hasLength(handlerName)) {
            throw new EzBadParamException(
                'handlerName',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezWantElementEvent);
        }
        if (!ezApi.ezIsFunction(handlerFunction)) {
            throw new EzBadParamException(
                'handlerFunction',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezWantElementEvent);
        }

        let element = EzEventEngine.ezInstance.ezFindByElementOrId(elementOrId);

        if (!EzObject.isValid(element)) {
            if (EzEventEngine.ezInstance.ezDebugMode) {
                ezApi.ezclocker.ezLogger.error(
                    EzString.em`
                        Unable to hook event for a missing or non-existing HTML element.
                        ElementOrId=${elementOrId}, elementEvent=${elementEvent}, handlerName=${handlerName}, handlerFunction=${handlerFunction}`);
            }

            return null;
        }

        if (!EzString.hasLength(element.id)) {
            element.id = EzEventEngine.ezInstance.ezGenerateMissingElementId(element, handlerName);
        }

        let wrappedEventName = `${element.id}_${elementEvent}`;

        if (EzBoolean.isFalse(EzEventEngine.ezInstance.ezIsEventRegistered(wrappedEventName))) {
            EzEventEngine.ezInstance.ezWrapElementEvent(
                element.id,
                elementEvent,
                EzEventEngine.ezApiName,
                wrappedEventName);
        }

        EzEventEngine.ezInstance.ezWantEvent(
            wrappedEventName,
            handlerName,
            handlerFunction,
            false);

        return element;
    }

    /**
     * @protected @method
     * Generates an ID for an element that doesn't have an id
     * @returns {string}
     */
    ezGenerateMissingElementId(element, handlerName) {
        if (!EzObject.isValid(element)) {
            throw new EzBadParamException(
                'element',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezGenerateMissingElementId);
        }
        if (!EzString.hasLength(handlerName)) {
            throw new EzBadParamException(
                'handlerName',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezGenerateMissingElementId);
        }

        return `EzAutoId${element.constructor.name.toUpperCase()}_${handlerName.toUpperCase()}`;
    }

    /**
     * @public @method
     * Hooks an HTML element's event fire to the provided handlerFunction.
     * @param {object|string} elementOrId
     * @param {string} eventName
     * @param {function} handlerFunction
     * @returns {undefined|null|object}
     * Returns the element (if any)
     */
    ezUnwantElementEvent(elementOrId, elementEvent, handlerName) {
        if (!EzObject.isValid(elementOrId) || EzString.isString(elementOrId) && !EzString.hasLength(elementOrId)) {
            throw new EzBadParamException(
                'elementOrId',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezUnwantElementEvent);
        }

        if (!EzString.hasLength(elementEvent)) {
            throw new EzBadParamException(
                'elementEvent',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezUnwantElementEvent);
        }

        if (!EzString.hasLength(handlerName)) {
            throw new EzBadParamException(
                'handlerName',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezUnwantElementEvent);
        }

        let element = EzEventEngine.ezInstance.ezFindByElementOrId(elementOrId);

        if (!EzObject.isValid(element)) {
            if (EzEventEngine.ezInstance.ezDebugMode) {
                ezApi.ezclocker.ezLogger.error(
                    EzString.em`
                        Unable to disconnect ${handlerName}'s event listener
                        from event ${elementEvent} on an HTML element that does not exist.`);
            }
            return null;
        }

        if (!EzString.hasLength(element.id)) {
            element.id = EzEventEngine.ezInstance.ezGenerateMissingElementId(element, handlerName);
        }

        let wrappedEventName = `${element.id}_${elementEvent}`;

        EzEventEngine.ezInstance.ezUnwantEvent(wrappedEventName, handlerName);

        if (EzObject.hasProperty(EzEventEngine.ezInstance.ezWantEventRegistrations, wrappedEventName) &&
            0 == Object.keys(EzEventEngine.ezInstance.ezWantEventRegistrations[wrappedEventName]).length) {
            EzEventEngine.ezInstance.ezUnregisterEvent(wrappedEventName);
        }

        return element;
    }

    /**
     * @public @method
     * Performs post event trigger operations
     * @param {object} watnEventSettings
     */
    ezPostTrigger(eventName, eventHandlerName) {
        if (!EzString.hasLength(eventName)) {
            throw new EzBadParamException(
                'eventName',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezPostTrigger);
        }
        if (!EzString.hasLength(eventHandlerName)) {
            throw new EzBadParamException(
                'eventHandlerName',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezPostTrigger);
        }

        if (!EzObject.hasProperty(EzEventEngine.ezInstance.ezWantEventProperties, eventName) ||
            !EzObject.hasProperty(EzEventEngine.ezInstance.ezWantEventProperties[eventName], eventHandlerName)) {
            return;
        }

        if (EzBoolean.isTrue(EzEventEngine.ezInstance.ezWantEventProperties[eventName][eventHandlerName].ezUnwantAfterFirstTrigger)) {
            EzEventEngine.ezInstance.ezUnwantEvent(eventName, eventHandlerName);

            delete EzEventEngine.ezInstance.ezWantEventProperties[eventName][eventHandlerName];
        } else {
            EzEventEngine.ezInstance.ezWantEventProperties[eventName][eventHandlerName].ezTriggerCount++;
        }
    }

    /**
     * @public @method
     * Adds additional properties for a want event call
     * @param {string} eventName
     * @param {string} handlerName
     * @param {undefined|null|boolean} unwantAfterFirstTrigger
     */
    ezAddWantEventProperties(wantEventSettings) {
        if (!EzObject.isValid(wantEventSettings)) {
            throw new EzBadParamException(
                'wantEventSettings',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezAddWantEventProperties);
        }
        if (!EzString.hasLength(wantEventSettings.eventName)) {
            throw new EzBadParamException(
                'wantEventSettings.eventName',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezAddWantEventProperties);
        }
        if (!EzString.hasLength(wantEventSettings.handlerName)) {
            throw new EzBadParamException(
                'wantEventSettings.handlerName',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezAddWantEventProperties);
        }

        if (!EzObject.hasProperty(EzEventEngine.ezInstance.ezWantEventProperties, wantEventSettings.eventName)) {
            EzEventEngine.ezInstance.ezWantEventProperties[wantEventSettings.eventName] = {};
        }

        EzEventEngine.ezInstance.ezWantEventProperties[wantEventSettings.eventName][wantEventSettings.handlerName] = wantEventSettings;
    }

    /**
     * @public @method
     * Obtains the want event properties for the provided event name + handler name combo.
     * @param {string} eventName
     * @param {string} handlerName
     * @returns {object}
     */
    ezGetWantEventProperties(eventName, handlerName) {
        if (!EzString.hasLength(eventName)) {
            throw new EzBadParamException(
                'eventName',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezGetWantEventProperties);
        }
        if (!EzString.hasLength(handlerName)) {
            throw new EzBadParamException(
                'handlerName',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezGetWantEventProperties);
        }

        if (!EzObject.hasProperty(EzEventEngine.ezInstance.ezWantEventProperties, eventName) ||
            !EzObject.hasProperty(EzEventEngine.ezInstance.ezWantEventProperties[eventName], handlerName)) {
            EzEventEngine.ezInstance.ezAddWantEventProperties(
                EzEventEngine.ezInstance.ezCreateWantEventSettings(eventName, handlerName, false, false));
        }

        return EzEventEngine.ezInstance.ezWantEventProperties[eventName][handlerName];
    }

    /**
     * @public @method
     * Builds the event data for an ezEventEngine trigger
     * @param {object} triggeredByRef
     * @param {undefined|null|string} message
     * @param {undefined|null|object} data
     * @deprecated
        Migrate to directly creating a new EzEventData: new EzEventData(triggeredByRef, message, data);
     */
    ezBuildEventData(triggeredByRef, message, data) {
        if (!EzObject.isValid(triggeredByRef)) {
            throw new EzBadParamException(
                'triggeredByRef',
                EzEvengEngine.ezInstance,
                EzEvengEngine.ezInstance.ezBuildEventData);
        }

        return new EzEventData(triggeredByRef, message, data);
    }

    /**
     * @public @method
     * Removes a handler from the want event listener queue
     * @param {string} eventName
     * @param {string} handlerName
     */
    ezClearAllWantEvents(eventName) {
        if (ezApi.ezIsEmptyString(eventName)) {
            throw new EzBadParamException(
                'eventName',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezGetWantEventProperties);
        }

        if (EzObject.isValid(EzEventEngine.ezInstance.ezWantEventRegistrations[eventName])) {
            // Remove the handler from the want events
            for (let handlerName in EzEventEngine.ezInstance.ezWantEventRegistrations[eventName]) {
                EzEventEngine.ezInstance.ezUnwantEvent(eventName, handlerName);
            }
        }
    }

    /**
     * @public @method
     * Clears all the registered want events for eventName from the element with the provided elementId.
     * @param {string} elementId
     * @param {string} eventName
     */
    ezClearAllWantElementEventsForElementId(elementId, eventName) {
        if (!EzString.hasLength(elementId)) {
            throw new EzBadParamException(
                'elementId',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezClearAllWantElementEventsForElementId);
        }

        if (!EzString.hasLength(eventName)) {
            throw new EzBadParamException(
                'eventName',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezClearAllWantElementEventsForElementId);
        }

        let wrappedEventName = ezApi.ezIdTemplate`${elementId}_${eventName}`;

        EzEventEngine.ezInstance.ezUnwantEvent(wrappedEventName);

        if (ezUi.ezHadOwnProperty(EzEventEngine.ezInstance.ezWantEventRegistrations, wrappedEventName)) {
            // Remove the handler from the want events
            delete EzEventEngine.ezInstance.ezWantEventRegistrations[wrappedEventName];
        }

        EzEventEngine.ezInstance.ezUnregisterEvent(wrappedEventName);
    }

    /**
     * @public @method
     * Clears all the registered want events for eventName from the element who's id starts with the provided elementIdStartsWith.
     * @param {string} elementIdStartsWith
     * @param {string} eventName
     */
    ezClearAllWantElementEventsForElementIdStartsWith(elementIdStartsWith, eventName) {
        if (!EzString.hasLength(elementIdStartsWith)) {
            throw new EzBadParamException(
                'elementIdStartsWith',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezClearAllWantElementEventsForElementIdStartsWith);
        }
        if (!EzString.hasLength(eventName)) {
            throw new EzBadParamException(
                'eventName',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezClearAllWantElementEventsForElementIdStartsWith);
        }

        for (let aEventName in EzEventEngine.ezInstance.ezWantEventRegistrations) {
            if (aEventName.startsWith(elementIdStartsWith, 0)) {
                EzEventEngine.ezInstance.ezUnregisterEvent(aEventName);
                delete EzEventEngine.ezInstance.ezWantEventRegistrations[aEventName];
            }
        }
    }

    /**
     * @public @method
     * Wraps an HTML element event with an ezEventEngine event.
     * @param {string|object} elementOId
     * @param {string} elementEvent
     * @param {string} eventOwner
     * @param {string} wrappedEventName
     */
    ezWrapElementEvent(elementOrId, elementEvent, eventOwner, wrappedEventName) {
        if (!EzObject.isValid(elementOrId)) {
            throw new EzBadParamException(
                'elementOrId',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezWrapElementEvent);
        }
        if (!EzString.hasLength(elementEvent)) {
            throw new EzBadParamException(
                'elementEvent',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezWrapElementEvent);
        }
        if (!EzString.hasLength(eventOwner)) {
            throw new EzBadParamException(
                'eventOwner',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezWrapElementEvent);
        }
        if (!EzString.hasLength(wrappedEventName)) {
            throw new EzBadParamException(
                'wrappedEventName',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezWrapElementEvent);
        }

        let element = EzEventEngine.ezInstance.ezFindByElementOrId(elementOrId);

        if (null == element) {
            if (EzEventEngine.ezInstance.ezDebugMode) {
                ezApi.ezclocker.ezLogger.error(
                    EzString.em`
                        Unable to wrap element event for a missing or non-existing HTML element.
                        ElementOrId=${elementOrId}, elementEvent=${elementEvent}, eventOwner=${eventOwner}, wrappedEventName=${wrappedEventName}`);
            }

            return null;
        }

        if (!(elementEvent in element)) {
            throw new EzException(`The HTML element does not support event named "${elementEvent}".`);
        }

        element[elementEvent] = (event) => ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            wrappedEventName,
            new EzEventData(
                eventOwner,
                elementEvent,
                {
                    elementId: element.id,
                    elementEvent: event,
                }));

        EzEventEngine.ezInstance.ezRegisterEvent(eventOwner, wrappedEventName);
    }

    /**
     * @public @method
     * Builds the EzEventEngine.prototype.ezWantEventEx wantEventSettings param object
     * @param {string} eventName
     * @param {string} eventHandlerName
     * @param {function} eventHandlerFunction
     * @param {undefined|null|boolean} immediateTriggerIfAlreadyTriggered
     * Default is false
     * @param {undefined|null|boolean} unwantAfterFirstTrigger
     * Default is false
     * @returns {EzWantEventSettings}
     */
    ezCreateWantEventSettings(eventName, eventHandlerName, eventHandlerFunction, immediateTriggerIfAlreadyTriggered, unwantAfterFirstTrigger) {
        if (!EzString.hasLength(eventName)) {
            throw new EzBadParamException(
                'eventName',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezCreateWantEventSettings);
        }
        if (!EzString.hasLength(eventHandlerName)) {
            throw new EzBadParamException(
                'eventHandlerName',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezCreateWantEventSettings);
        }
        if (!ezApi.ezIsFunction(eventHandlerFunction)) {
            throw new EzBadParamException(
                'eventHandlerFunction',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezCreateWantEventSettings);
        }

        return new EzWantEventSettings(
            eventName,
            eventHandlerName,
            eventHandlerFunction,
            {
                immediateTriggerIfAlreadyTriggered: EzBoolean.isTrue(immediateTriggerIfAlreadyTriggered),
                unwantAfterFirstTrigger: EzBoolean.isTrue(unwantAfterFirstTrigger)
            });
    }

    /**
     * @public @method
     * Returns the HTML document element or the document element associated with the provided id, or null if it does not exist.
     * @param {object|string} elementOrId
     * Acceptable values: 'window', 'document', 'body', 'head', the string id for an HTML element, an actual HTML element reference.
     * @returns {object}
     * Returns the element who's id is elementOrId OR returns elementOrId (as it is assumed to be the actual element reference)
     */
    ezFindByElementOrId(elementOrId) {
        if (!EzObject.isValid(elementOrId) || EzString.isString(elementOrId) && !EzString.hasLength(elementOrId)) {
            // Element not valid
            throw new EzBadParamException(
                'elementOrId',
                EzEventEngine.ezInstance,
                EzEventEngine.ezInstance.ezFindByElementOrId);
        }

        if (!EzString.isString(elementOrId)) {
            // Assumed to be the actual HTML element
            return elementOrId;
        }

        switch (elementOrId) {
            case 'window':
                return globalThis.window;
            case 'document':
                return globalThis.window.document;
            case 'body':
                return globalThis.window.document.body;
            case 'head':
                return globalThis.window.document.head;
            default:
                if (EzString.hasLength(elementOrId)) {

                    let element = globalThis.window.document.getElementById(elementOrId);

                    if (!EzObject.isValid(element) && EzEventEngine.ezInstance.ezDebugMode) {
                        ezApi.ezclocker.ezLogger.error(`The HTML element with id=${elementOrId} does not exist.`);
                    }

                    return element;
                }
        }

        return elementOrId;
    }

    /**
     * @public @method
     * Logs registration, want, and unwant event messages to the debug log
     * @param {*} eventData
     */
    ezDebugLogInternalEvents(eventData) {
        if (null == eventData || !EzString.hasLength(eventData.message)) {
            return;
        }

        ezApi.ezclocker.ezLogger.debug(eventData.message);
    }

    /*
    =========================================================================================================================
    Start of EzClocker Class Initialization and EzApi Registration Section
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    !! FROM THIS POINT FORWARD: ONLY PLACE INITIALIZATION CODE !!
    || All other class code MUST go above this section. ||
    =========================================================================================================================
    */

    /**
     * @static
     * @public @readonly @property
     * Returns the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezEventEngine';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzEventEngine_Ready',
            onEventRegistered: 'ezOn_EzEventEngine_EventRegistered',
            onWantEventRegistered: 'ezOn_EzEventEngine_WantEventRegistered',
            onUnwantEventProcessed: 'ezOn_EzEventEngine_UnwantEventProcessed'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzEventEngine}
     */
    static #ezInstance = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzEventEngine.ezApiName])
        ? globalThis.ezApi.ezclocker[EzEventEngine.ezApiName]
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of EzEventEngine registered with EzApi (if available yet)
     * @reutrns {EzEventEngine}
     */
    static get ezInstance() {
        return EzEventEngine.#ezInstance;
    }

    /**
     * @static
     * @public @property @setter
     * Returns the singleton instance of EzEventEngine registered with EzApi (if available yet)
     * @param {EzEventEngine} ezEventEngine
     */
    static set ezInstance(ezEventEngine) {
        if (null != EzEventEngine.#ezInstance) {
            throw new Error('EzEventEngine\'s singleton instance is already reigstered with EzApi.');
        }

        EzEventEngine.#ezInstance = ezEventEngine;
    }

    /**
     * @static
     * @private @field
     * Stores the EzApi registration state for this class.
     * Default value is NULL
     * Class is registerd with EzApi when value is EzRegistrationState.REGISTERED
     * @type {string}
     * A valid enum property value from EzRegistrationState
     */
    static #ezApiRegistrationState = EzObject.hasProperty(globalThis, 'ezApi') &&
        EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready) &&
        EzObject.isValid(globalThis.ezApi.ezclocker[EzEventEngine.ezApiName])
        ? EzRegistrationState.REGISTERED
        : null;

    /**
     * @static
     * @public @property @getter
     * Returns the ezApi registration state of this classes's singleton instance.
     * @returns {string}
     * A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzEventEngine.#ezApiRegistrationState;
    }

    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzEventEngine.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @static
     * @public @readonly @property
     * Returns if all necessary dependences are ready and therefore it is ok for this class to
     * register it's singleton instance with ezApi.
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzEventEngine.ezApiRegistrationState &&
            EzObject.isValid(globalThis.ezApi) && EzBoolean.isTrue(globalThis.ezApi.ready);
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzEventEngine.ezInstance && EzRegistrationState.REGISTERED === EzEventEngine.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzEventEngine.#ezCanRegister && !EzEventEngine.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzEventEngine, EzEventEngine.ezApiName);
        }

        return EzEventEngine.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzEventEngine.ezApiName
     *     2) Property getter EzEventEngine.ezEventNames
     *     3) Property getter EzEventEngine.ezInstance
     *     4) Property setter EzEventEngine.ezInstance
     *     5) Property getter EzEventEngine.ezApiRegistrationState
     *     6) Property setter EzEventEngine.ezApiRegistrationState
     *     7) Property getter EzEventEngine.#ezCanRegister
     *     8) Property getter EzEventEngine.#ezIsRegistered
     *     9) Method EzEventEngine.#ezRegistrator()
     */
    static {
        if (!EzEventEngine.#ezIsRegistered) {
            EzEventEngine.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzEventEngine.#ezRegistrator()) {
                document.addEventListener(
                    EzEventEngine.ezOnEzApiReadyEventName,
                    EzEventEngine.#ezRegistrator);
            }
        }
    }

    /*
    =========================================================================================================================
    End of EzClocker Class Initialization and EzApi Registration Section
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    !! DO NOT PLACE ANY NON-INITIALIZTION CODE BETWEEN THE START AND END OF THIS INITILIZATION SECTON !!
    !! DO NOT PLACE ANY CODE OF ANY KIND BELOW THIS POINT !!
    =========================================================================================================================
    */
}

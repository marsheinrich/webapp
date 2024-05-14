/*==============================*/
/**** DEPRECATED: DO NOT USE ****/
/*==============================*/
/* DEPRECATED: use ez-events.js instead */

/** IE Fix */
(function() {
    if (typeof window.CustomEvent === 'function' ||
        // In Safari, typeof CustomEvent == 'object' but it otherwise works fine
        this.CustomEvent.toString().indexOf('CustomEventConstructor') > -1) {
        return;
    }

    function CustomEvent(event, params) {
        params = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined
        };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
    window.console.debug('PATCHED IE EVENTS BUG');
})();

/**
 * @public
 * Generic jQuery based event utilities
 * @returns {EzEvents}
 */
var EzEvents = function() {
    this.ready = false;
    return this;
};

/**
 * @protected
 * Initializes EzEvents
 * @returns {EzEvents}
 */
EzEvents.prototype.ezInit = function() {
    var self = ezApi.p.ezEvents;
    self.ready = true;
    return self;
};

/**
 * @public
 * Hooks the named DOM event to the provided function
 * @param {string} eventName
 * @param {function} eventHandler
 * @returns {boolean}
 * True if hooked, false otherwise
 */
EzEvents.prototype.ezWantEvent = function(eventName, eventHandler) {
    if (ezApi.isEmptyString(eventName)) {
        ezApi.p.logger.error('An event name is required in ezApi.p.ezEvents.ezWantEvent calls.');
    }
    if (!ezApi.isFunction(eventHandler)) {
        ezApi.p.logger.error('An event handler is required in ezApi.p.ezEvents.ezWantEvent calls.');
        return false;
    }
    document.addEventListener(eventName, eventHandler);
    return true;
};

/**
 * @public
 * Unhooks the named DOM event from the provided function
 * @param {string} eventName
 * @param {function} eventHandler
 */
EzEvents.prototype.ezUnWantEvent = function(eventName, eventHandler) {
    if (ezApi.isEmptyString(eventName)) {
        ezApi.p.logger.error('An event name is required in ezApi.p.ezEvents.ezUnWantEvent calls.');
    }
    if (!ezApi.isFunction(eventHandler)) {
        ezApi.p.logger.error('An event handler is required in ezApi.p.ezEvents.ezUnWantEvent calls.');
        return false;
    }
    document.removeEventListener(eventName, eventHandler);
};

/**
 * @public
 * Triggers the named DOM event, assigning the detail to the detail property of the event.
 * @param {string} eventName
 * @param {object} eventData
 */
EzEvents.prototype.ezTriggerEvent = function(eventName, detail) {
    return document.dispatchEvent(new CustomEvent(eventName, {
        bubbles: true,
        detail: detail
    }));
};

/**
 * @public
 * Hooks the named event to the provided function
 * @param {string} eventName
 * @param {function} eventHandler
 */
EzEvents.prototype.ezWantJQEvent = function(eventName, eventHandler) {
    ezApi.ezBody().on(eventName, eventHandler);
};

/**
 * @public
 * Unhooks the named event from the provided function
 * @param {string} eventName
 * @param {function} eventHandler
 */
EzEvents.prototype.ezUnWantJQEvent = function(eventName, eventHandler) {
    ezApi.ezBody().off(eventName, eventHandler);
};

/**
 * @public
 * Triggers the named event, passing along the event data
 * @param {string} eventName
 * @param {object} eventData
 */
EzEvents.prototype.ezTriggerJQEvent = function(eventName, eventData) {
    ezApi.ezBody().trigger(eventName, eventData);
};

/* exported handleEvent */
/**
 * @deprecated Use ezApi.p.ezEvents.ezWantEvent
 * @public
 * @param {string} eventName
 * @param {function} eventHandler
 */
function handleEvent(eventName, eventHandler) {
    ezApi.p.ezEvents.ezWantJQEvent(eventName, eventHandler);
}

/* exported unHandleEvent */
/**
 * @deprecated Use ezApi.p.ezEvents.ezUnWantEvent
 * @public
 * @param {string} eventName
 * @param {function} eventHandler
 */
function unHandleEvent(eventName, eventHandler) {
    ezApi.p.ezEvents.ezUnWantJQEvent(eventName, eventHandler);
}

/* exported onEvent */
/**
 * @deprecated Use ezApi.p.ezEvents.ezTriggerEvent
 * @public
 * @param {string} eventName
 * @param {*} eventData
 */
function onEvent(eventName, eventData) {
    ezApi.p.ezEvents.ezTriggerJQEvent(eventName, eventData);
}

/**
 * ezApi Registration
 */
document.addEventListener('onEzApiReady', function() {
    if (typeof ezApi === 'undefined' || !ezApi) {
        window.console.error('EzApi is required in ezclocker-events.js module.');
        return;
    }
    ezApi.ezRegisterPublic('ezEvents', new EzEvents());
    ezApi.p.ezEvents.ezInit();
    ezApi.p.logger.dep('ezclocker-events.js', 'ez-events.js',
        'Initialized deprecated ezEvents (switch to ez-events.js reference)!', 'ezclocker-events.js');
});
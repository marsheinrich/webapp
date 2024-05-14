// Add origin to location, missing in many IE solutions
if (!window.window.location.origin) {
    window.window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ?
        ':' + window.location.port : '');
}

(function () {
    if ( typeof window.CustomEvent === 'function' ) {
        return false;
    }

    function CustomEvent ( event, params ) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();

/**
 * String.prototype.replaceAll() polyfill
 * https://gomakethings.com/how-to-replace-a-section-of-a-string-with-another-one-with-vanilla-js/
 * @author Chris Ferdinandi
 * @license MIT
 */
if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function(str, newStr){

        // If a regex pattern
        if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
            return this.replace(str, newStr);
        }

        // If a string
        return this.replace(new RegExp(str, 'g'), newStr);

    };
}

var undefined = undefined || 'undefined';

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
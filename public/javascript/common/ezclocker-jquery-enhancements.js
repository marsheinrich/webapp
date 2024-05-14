/**
 * Determines if an event is bound or not
 */
$.fn.isBound = function(type, fn) {
    'use strict';
    var data = this.data('events')[type];
    if (data === undefined || data.length === 0) {
        return false;
    }
    return (-1 !== $.inArray(fn, data));
};

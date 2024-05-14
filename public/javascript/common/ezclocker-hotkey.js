/**
 * Wraps handling of key down events to provide hot+key support
 */
var ezHotKey = {
    ready: true,

    _handleEnterKey: function(e, callback) {
        if (e.keyCode === 13) {
            if (callBack) {
                callback(e);
            }
        }
    },
    _handleEscapeKey: function(e, callback) {
        if (e.keyCode === 27) {
            if (callBack) {
                callback(e);
            }
        }
    },
    _handleEscapeOrEnterKey: function(e, escapeCallback, enterCallback) {
        switch (e.keyCode) {
            case 13:
                if (enterCallback) {
                    enterCallback(e);
                }
                break;
            case 27:
                if (escapeCallback) {
                    escapeCallback(e);
                }
                break;
            default:
                return;
        }
    },
    hookEscape: function(id, callback) {
        $('#' + id).keydown(function(e) {
            ezHotKey._handleEscapeKey(e, callback);
        });
    },
    hookEnter: function(id, callback) {
        $('#' + id).keydown(function(e) {
            ezHotKey._handleEnterKey(e, callback);
        });
    },
    hookEscapeAndEnter: function(id, escapeCallBack, enterCallBack) {
        $('#' + id).keydown(function(e) {
            ezHotKey._handleEscapeKey(e, escapeCallback, enterCallback);
        });
    },
    hookKeyCode: function(id, keyCode, callback) {
        $('#' + id).keydown(function(e) {
            if (e.keyCode === keyCode && callback) {
                callback(e);
            }
        });
    }
};
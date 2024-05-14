window.console.error('DEPRECATED DEPENDENCY: /public/javascript/common/ezclocker-spinner.js - Migrate to EzSpinner.js.');
/* exported EzSpinner, ezSpinner, waitSpinner, defaultOpts, currentOpts */

/**
 * Wrapper around spin.js.org's spinner code. Provides ezClocker a consistent wait spinner. Requires including:
 * <link href="node_modules/spin.js/spin.css" rel="stylesheet" type="text/css" id="spin-js-org-css">
 * <script src="node_modules/sprin.js/spin.js" id="spin-js-org"/>
 */
var EzSpinner = function() {
    this.ready = true;
    this.spinners = {
        activeSpinners: {},
        activeSpinner: null,
        smallSpinner: null
    };
    this.defaultOpts = {
        lines: 20, // The number of lines to draw
        length: 25, // The length of each line
        width: 10, // The line thickness
        radius: 50, // The radius of the inner circle
        corners: 4, // Corner roundness (0..1)
        rotate: 38, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#ffffff', // #rgb or #rrggbb or array of colors
        speed: 2.0, // Rounds per second
        trail: 25, // Afterglow percentage
        shadow: true, // Whether to render a shadow
        hwaccel: true, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9 // The z-index (defaults to 2000000000)
    };
    this.currentOpts = {
        lines: 20, // The number of lines to draw
        length: 25, // The length of each line
        width: 10, // The line thickness
        radius: 50, // The radius of the inner circle
        corners: 4, // Corner roundness (0..1)
        rotate: 38, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#ffffff', // #rgb or #rrggbb or array of colors
        speed: 2.0, // Rounds per second
        trail: '25', // Afterglow percentage
        shadow: true, // Whether to render a shadow
        hwaccel: true, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 1 // The z-index (defaults to 2000000000)
    };
};

EzSpinner.prototype.showSmallSpinner = function(containerId) {
    this.hideSmallSpinner();
    var opts = this.createSmallSpinnerOpts(containerId);
    if (ezApi.isNotValid(this.spinners.smallSpinner)) {
        this.spinners.smallSpinner = this.createSmallSpinner(opts);
    }
    var target = document.getElementById(containerId);
    if (!target) {
        return;
    }
    this.spinners.smallSpinner.spin(target);
};

EzSpinner.prototype.hideSmallSpinner = function() {
    if (ezApi.isNotValid(this.spinners.smallSpinner)) {
        return;
    }
    this.spinners.smallSpinner.stop();
    this.spinners.smallSpinner = null;
};

EzSpinner.prototype.show = function(containerId) {
    var height = ezApi.ez(containerId).innerHeight() - 10;
    var width = ezApi.ez(containerId).innerWidth() - 10;
    var diagonal = Math.sqrt(2 * height * width);
    var radius = diagonal / 2;
    this.currentOpts.length = parseInt(radius / 8);
    this.currentOpts.width = parseInt(this.currentOpts.length / 8);
    this.currentOpts.radius = radius / 4;

    if (ezApi.isNotValid(this.spinners.activeSpinners[containerId])) {
        this.spinners.activeSpinners[containerId] = this.create(this.currentOpts);
    }

    ezUi.ezShow('_SpinnerContainerOverlay');
    this.spinners.activeSpinners[containerId].spin(document.getElementById(containerId));
};

EzSpinner.prototype.hide = function(containerId) {
    if (ezApi.isEmptyString(containerId)) {
        this.hideAllActiveSpinners();
        return;
    }

    if (ezApi.isNotValid(this.spinners.activeSpinners[containerId])) {
        return;
    }

    this.spinners.activeSpinners[containerId].stop();
    this.spinners.activeSpinners[containerId] = null;
};

EzSpinner.prototype.hideAllActiveSpinners = function() {
    for (var key in this.spinners.activeSpinners) {
        if (ezApi.ezclocker.ezHasOwnProperty(this.spinners.activeSpinners, key)) {
            this.hide(key);
        }
    }
    this.hideFullPage();
    this.hideSmallSpinner();
};

EzSpinner.prototype.showFullPage = function(message) {
    if (ezApi.ez('_SpinnerContainerOverlay').length !== 0) {
        return;
    }

    var overlay = '<div id="_SpinnerContainerOverlay" ' +
        'style="display:none;left:0;top:0;background-color:rgba(255,255,255,0.5);position:fixed;" ' +
        'class="spinnerOverlay"></div>';

    ezApi.ezBody().prepend(overlay);
    if (ezApi.isNotEmptyString(message)) {
        ezApi.ez('_SpinnerContainerOverlay').append('<div class="overlayLabel" id="_OverlayLabelContainer">' +
            message + '</div>');
    }

    ezApi.ezOn('resize', this.resizeFullPageSpinner);
    this.resizeFullPageSpinner();
    this.show('_SpinnerContainerOverlay');
};

EzSpinner.prototype.resizeFullPageSpinner = function() {
    if (ezApi.ez('_SpinnerContainerOverlay').length === 0) {
        return; // no spinner visible
    }
    ezApi.ez('_SpinnerContainerOverlay').width(ezApi.ezWindow().outerWidth());
    ezApi.ez('_SpinnerContainerOverlay').height(ezApi.ezWindow().outerHeight());
};

EzSpinner.prototype.hideFullPage = function() {
    var _this = this;
    if (ezApi.isNotValid(this.spinners.activeSpinner)) {
        return;
    }
    ezApi.ezWindow('resize', _this.resizeFullPageSpinner);
    _this.hide('_SpinnerContainerOverlay');
    if (ezApi.ez('_SpinnerContainerOverlay').length !== 0) {
        ezApi.ez('_SpinnerContainerOverlay').remove();
    }
};

EzSpinner.prototype.create = function(opts) {
    if (ezApi.isNotValid(opts)) {
        opts = this.defaultOpts;
    }
    return new Spinner(opts).spin();
};

EzSpinner.prototype.createSmallSpinnerOpts = function(containerId, color) {
    var c = ezApi.ez(containerId);
    var height = c.innerHeight();
    var width = c.innerWidth();

    var r = ((height / 2) + ((width * 2) / (8 * height))) / 3.14;
    return {
        lines: 8, // The number of lines to draw
        length: 2, // The length of each line
        width: 2, // The line thickness
        radius: r, // The radius of the inner circle
        corners: 0, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: ezApi.isEmptyString(color) ? '#000000' : color, // #rgb or #rrggbb or array of colors
        speed: 2.0, // Rounds per second
        trail: 80, // Afterglow percentage
        shadow: true, // Whether to render a shadow
        hwaccel: true, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e8, // The z-index (defaults to 2000000000)
        position: 'relative',
        top: height / 4 + 'px',
        left: '50%'
    };
};

EzSpinner.prototype.createSmallSpinner = function(opts, aTop, aLeft) {
    if (!opts) {
        if (!aTop && !aLeft) {
            opts = {
                lines: 10, // The number of lines to draw
                length: 5, // The length of each line
                width: 3, // The line thickness
                radius: 10, // The radius of the inner circle
                corners: 2, // Corner roundness (0..1)
                rotate: 38, // The rotation offset
                direction: 1, // 1: clockwise, -1: counterclockwise
                color: '#ff9900', // #rgb or #rrggbb or array of colors
                speed: 2.0, // Rounds per second
                trail: 60, // Afterglow percentage
                shadow: true, // Whether to render a shadow
                hwaccel: true, // Whether to use hardware acceleration
                className: 'spinner', // The CSS class to assign to the spinner
                zIndex: 2e8 // The z-index (defaults to 2000000000)
            };
        } else if (!aTop) {
            opts = {
                lines: 10, // The number of lines to draw
                length: 5, // The length of each line
                width: 3, // The line thickness
                radius: 10, // The radius of the inner circle
                corners: 2, // Corner roundness (0..1)
                rotate: 38, // The rotation offset
                direction: 1, // 1: clockwise, -1: counterclockwise
                color: '#ff9900', // #rgb or #rrggbb or array of colors
                speed: 2.0, // Rounds per second
                trail: 60, // Afterglow percentage
                shadow: true, // Whether to render a shadow
                hwaccel: true, // Whether to use hardware acceleration
                className: 'spinner', // The CSS class to assign to the spinner
                zIndex: 2e8, // The z-index (defaults to 2000000000)
                left: aLeft
            };
        } else if (!aLeft) {
            opts = {
                lines: 10, // The number of lines to draw
                length: 5, // The length of each line
                width: 3, // The line thickness
                radius: 10, // The radius of the inner circle
                corners: 2, // Corner roundness (0..1)
                rotate: 38, // The rotation offset
                direction: 1, // 1: clockwise, -1: counterclockwise
                color: '#ff9900', // #rgb or #rrggbb or array of colors
                speed: 2.0, // Rounds per second
                trail: 60, // Afterglow percentage
                shadow: true, // Whether to render a shadow
                hwaccel: true, // Whether to use hardware acceleration
                className: 'spinner', // The CSS class to assign to the spinner
                zIndex: 2e8, // The z-index (defaults to 2000000000)
                top: aTop
            };
        } else {
            opts = {
                lines: 10, // The number of lines to draw
                length: 5, // The length of each line
                width: 3, // The line thickness
                radius: 10, // The radius of the inner circle
                corners: 2, // Corner roundness (0..1)
                rotate: 38, // The rotation offset
                direction: 1, // 1: clockwise, -1: counterclockwise
                color: '#ff9900', // #rgb or #rrggbb or array of colors
                speed: 2.0, // Rounds per second
                trail: 60, // Afterglow percentage
                shadow: true, // Whether to render a shadow
                hwaccel: true, // Whether to use hardware acceleration
                className: 'spinner', // The CSS class to assign to the spinner
                zIndex: 2e8, // The z-index (defaults to 2000000000)
                top: aTop,
                left: aLeft
            };
        }
    }
    return new Spinner(opts);
};

/**
 * EzApi Registration
 */
document.addEventListener('onEzApiReady', function() {
    if (typeof ezApi === 'undefined' || !ezApi) {
        window.console.error('EzApi is required for ezclocker-spinner.js module.');
    }
    ezApi.ezRegisterPublic('ezSpinner', new EzSpinner());
    // Legacy
    ezApi.ezRegisterPublic('spinner', ezApi.p.ezSpinner);
    ezApi.ezReigsterWindow('ezSpinner', ezApi.p.ezSpinner);
    ezApi.ezReigsterWindow('ezSpinner', ezApi.p.ezSpinner);
    ezApi.ezReigsterWindow('waitSpinner', ezApi.p.ezSpinner);
    ezApi.ezReigsterWindow('defaultOpts', ezApi.p.ezSpinner.defaultOpts);
    ezApi.ezReigsterWindow('currentOpts', ezApi.p.ezSpinner.currentOpts);
});
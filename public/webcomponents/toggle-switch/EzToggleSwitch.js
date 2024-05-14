/* exported EzToggleSwitch */

/** Enumeration to represent the EzToggleSwitch's state */
var EzToggleSwitchState = {
    ON: 'ON',
    OFF: 'OFF',
    ON_DISABLED: 'ON_DISABLED',
    OFF_DISABLED: 'OFF_DISABLED'
};

/*
 * Creates the EzToggleSwitch
 * @param {string} toggleOnText
 * @param {string} toggleOffText
 * @param {boolean} roundToggle
 * @param {function} toggleOnHandler
 * @param {function} toggleOffHandler
 */
var EzToggleSwitch = function(id, toggleOnLabel, toggleOffLabel, roundToggle, toggleOnHandler, toggleOffHandler) {
    this.context = {
        id: ezApi.assignOrDefault(id, '_EzToggleSwitch_' + (new Date()).toISOString()),
        round: ezApi.assignOrDefault(roundToggle, true),
        onLabel: ezApi.assignOrDefault(toggleOnLabel, 'On'),
        offLabel: ezApi.assignOrDefault(toggleOffLabel, 'Off'),
        onToggleOn: ezApi.assignOrNull(toggleOnHandler),
        onToggleOff: ezApi.assignOrNull(toggleOffHandler)
    };

    this.context.onLabelId = this.context.id + '_onLabel';
    this.context.offLabelId = this.context.id + '_offLabel';
    this.context.checkboxId = this.context.id + '_checkbox';
    this.context.toggleSwitchSliderId = this.context.id + '_span';

    this.toggleState = EzToggleSwitchState.OFF;
    this.ready = true;
};

/**
 * Injects the toggle button into the provided parentId. If parentId is not valid, injection happens in the document.
 * @param {string} parentId
 */
EzToggleSwitch.prototype.ezInject = function(parentId) {
    var parent = ezApi.isValid(parentId) ? ezApi.ez(parentId) : $(document);
    // Inject the CSS
    parent.append('<link href="' + ezApi.p.nav.getPublicPageUrl('webcomponents/toggle-switch/EzToggleSwitch.css') +
        '" ' +
        'rel="stylesheet" type="text/css" />');

    // Inject the HTML
    parent.append('<div class="ezToggleSwitch" id="' + this.context.id + '">' +
        '<table class="ezToggleSwitchCheckContainer" id="' + this.context.toggleSwitchContainerId + '"><tr>' +
        '<td><label class="ezToggleSwitchLabel" id="' + this.context.onLabelId + '">' + this.context.onLabel +
        '</label></td><td>' +
        '<input class="ezToggleSwitchCheckbox" type="checkbox" id="' + this.context.checkboxId + '">' +
        '<span class="ezToggleSwitchSlider" id="' + this.context.toggleSwitchSliderId + '"></span>' +
        '</td><td><label class="ezToggleSwitchLabel" id="' + this.context.offLabelId + '">' + this.context.offLabel +
        '</label></td></tr></table></div>');
    ezApi.ez(this.context.checkboxId).click(this.ezHandleCheckboxClick);
};

/** Determines if the EzToggleSwitch is toggled on */
EzToggleSwitch.prototype.isOn = function() {
    var tState = ezApi.ezString(this.toggleState, EzToggleSwitchState.OFF);
    return tState === EzToggleSwitchState.ON || tState === EzToggleSwitchState.ON_DISABLED;
};

/** Determines if the EzToggleSwitch is toggled off */
EzToggleSwitch.prototype.isOff = function() {
    var tState = ezApi.ezString(this.toggleState, EzToggleSwitchState.OFF);
    return tState === EzToggleSwitchState.OFF || tState === EzToggleSwitchState.OFF_DISABLED;
};

/** Determines if the EzToggleSwitch is disabled */
EzToggleSwitch.prototype.isDisabled = function() {
    var tState = ezApi.ezString(this.toggleState, EzToggleSwitchState.OFF);
    return tState === EzToggleSwitchState.ON_DISABLED || tState === EzToggleSwitchState.OFF_DISABLED;
};

/** Switches the EzToggleSwitch to ON */
EzToggleSwitch.prototype.ezToggleOn = function() {
    this.toggleState = EzToggleSwitchState.ON;
    this.ezHandleCheckboxClick();
};

/** Switches the EzToggleSwitch to OFF */
EzToggleSwitch.prototype.ezToggleOff = function() {
    this.toggleState = EzToggleSwitchState.OFF;
    this.ezHandleCheckboxClick();
};

/** Disables the EzToggleSwitch */
EzToggleSwitch.prototype.ezDisable = function() {
    var tState = ezApi.ezString(this.toggleState, EzToggleSwitchState.OFF);
    this.toggleState = tState === EzToggleSwitchState.ON ? EzToggleSwitchState.ON_DISABLED : EzToggleSwitchState.OFF_DISABLED;
    this.ezHandleCheckboxClick();
};

/** Enables the EzToggleSwitch */
EzToggleSwitch.prototype.ezEnable = function() {
    if (this.toggleState === EzToggleSwitchState.ON_DISABLED) {
        this.ezToggleOn();
    }
    if (this.toggleState === EzToggleSwitchState.OFF_DISABLED) {
        this.ezToggleOff();
    }
};

/**
 * Handles the click even on the EzToggleSwitch
 * @param {object} event
 */
EzToggleSwitch.prototype.ezHandleCheckboxClick = function(event) {
    this.ezSetToggleStateFromCheckbox();
    return this.isOn() ? ezApi.callBack(this.context.onToggleOn, event) : ezApi.callBack(this.context.onToggleOff,
        event);
};

/** Sets the EzToggleSwitch toggleState based on the state of the checkbox */
EzToggleSwitch.prototype.ezSetToggleStateFromCheckbox = function() {
    var cbChecked = ezApi.ez(this.context.checkboxId).checked;

    if (cbChecked && this.isOff()) {
        this.toggleState = this.isDisabled() ? EzToggleSwitchState.ON_DISABLED : EzToggleSwitchState.ON;
    } else if (!cbChecked && this.isOn()) {
        this.toggleState = this.toggleState = this.isDisabled() ? EzToggleSwitchState.OFF_DISABLED :
            EzToggleSwitchState.OFF;
    }

    return this.toggleState;
};
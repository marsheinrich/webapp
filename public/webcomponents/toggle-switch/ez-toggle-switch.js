/**
 * @public
 * Constructor of EzToggleSwitch
 * @returns {EzToggleSwitch}
 */
function EzToggleSwitch() {
    this.ready = false;

    this.containerId = null;

    this.ezToggleSwitchInputRef = null;
    this.ezInit(this);
    return this;
}

/**
 * @protected
 * Initializes the ezToggleSwtich after contruction
 * @returns {EzToggleSwitch}
 */
EzToggleSwitch.prototype.ezInit = function(self) {
    self = ezApi.ezIsValid(self) ? self : this;

    self.ready = true;

    return self;
};

/**
 * @public
 * Injects the EzToggleSwitch UX into the provided containerId
 * @param {string} containerId
 * @param {string|null} toggleSwitchId
 * @param {function|null} onClickHandler
 * @param {string|null} leftLabel
 * @param {string|null} rightLabel
 * @param {EzToggleSwitch|null} self
 */
EzToggleSwitch.prototype.ezInjectUx = function(containerId, toggleSwitchId, leftLabel, rightLabel, onClickHandler,
    square, self) {
    self = ezApi.ezIsValid(self) ? self : this;

    toggleSwitchId = ezApi.ezIsEmptyString(toggleSwitchId) ? 'EzToggleSwitch' : toggleSwitchId;
    leftLabel = ezApi.ezIsEmptyString(leftLabel) ? 'On' : leftLabel;
    rightLabel = ezApi.ezIsEmptyString(rightLabel) ? 'Off' : rightLabel;

    if (ezApi.ezIsTrue(square)) {
        toggleSwitchId = ezApi.ezIsEmptyString(toggleSwitchId, leftLabel, rightLabel) ? 'EzSquareToggleSwitch' : toggleSwitchId;
        ezUi.ezHtml(containerId, self.ezBuildSquareToggleSwitch(toggleSwitchId, leftLabel, rightLabel));
    } else {
        toggleSwitchId = ezApi.ezIsEmptyString(toggleSwitchId, leftLabel, rightLabel) ? 'EzRoundToggleSwitch' : toggleSwitchId;
        ezUi.ezHtml(containerId, self.ezBuildRoundToggleSwitch(toggleSwitchId, leftLabel, rightLabel));
    }
    self.ezToggleSwitchInputRef = ezUi.ezId(toggleSwitchId);
    if (ezApi.ezIsFunction(onClickHandler)) {
        ezUi.ezHookElementEvent(toggleSwitchId, 'click', onClickHandler);
    }
};

/**
 * @public
 * Returns the EzToggleSwitch HTML for the Square toggle switch.
 * @returns {string}
 */
EzToggleSwitch.prototype.ezBuildSquareToggleSwitch = function(toggleSwitchId, leftLabel, rightLabel) {
    return '<div id="' + toggleSwitchId + 'Wrapper" class="ezToggleSwitchWrapper">' +
        '  <label id="' + toggleSwitchId + 'LeftLabel" class="ezToggleSwitchLeftLabel">' + leftLabel + '</div>' +
        '  <label id="' + toggleSwitchId + 'Label" class="ezToggleSwitch">' +
        '    <input id="' + toggleSwitchId + '" type="checkbox">' +
        '    <span id="' + toggleSwitchId + 'Span" class="ezSlider"></span></label>' +
        '  <div id="' + toggleSwitchId + 'RightLabel" class="ezToggleSwitchRightLabel">' + rightLabel + '</div></div>';
};

/**
 * @public
 * Returns the EzToggleSwitch HTML for the round toggle switch
 * @returns {string}
 */
EzToggleSwitch.prototype.ezBuildRoundToggleSwitch = function(toggleSwitchId, leftLabel, rightLabel) {
    return '<table id="' + toggleSwitchId + 'Wrapper" class="ezToggleSwitchWrapper"><tr><td class="ezToggleSwitchLayoutCell">' +
        '<div id="' + toggleSwitchId + 'LeftLabel" class="ezToggleSwitchLeftLabel">' + leftLabel + '</div>' +
        '<label id="' + toggleSwitchId + 'Label" class="ezToggleSwitch">' +
        '  <input id="' + toggleSwitchId + '" type="checkbox">' +
        '  <span id="' + toggleSwitchId + 'Span" class="ezSlider ezRoundSlider"></span>' +
        '</label>' +
        '<div id="' + toggleSwitchId + 'RightLabel" class="ezToggleSwitchRightLabel">' + rightLabel + '</div>' +
        '</td></tr></table>';

};

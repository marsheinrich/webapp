/*==============================*/
/**** DEPRECATED: DO NOT USE ****/
/*==============================*/

/* exported
    disableButton, disableImage, enableButton, enableImage, enableToolButton, disableToolButton,
    disableButtonWithStyle, enableButtonWithStyle
*/

/**
 * Sets the disabled flag for the button
 * @param buttonId
 */
function disableButton(buttonId) {
    $('#' + buttonId).attr('disabled', true);
}

/**
 * Adds style ezFade25 to the image.
 * Requires ezclocker-base2015.css
 * @param {string} imageId
 */
function disableImage(imageId) {
    $('#' + imageId).addClass('ezFade25');
}

/**
 * Removes the disabled flag for the button
 * @param buttonId
 */
function enableButton(buttonId) {
    $('#' + buttonId).attr('disabled', false);
}

/**
 * Removes calss ezFade25 (opacity .25) from the image.
 * Requires ezclocker-base2015.css
 * @param {string} imageId
 */
function enableImage(imageId) {
    $('#' + imageId).removeClass('ezFade25');
}

/**
 * Requires the use of ezclocker-buttons.css file
 * @param buttonId
 */
function enableToolButton(buttonId) {
    if ($('#' + buttonId).find('toolButton') !== null) {
        return;
    } // already enabled
    $('#' + buttonId).addClass('toolButton');
    $('#' + buttonId).removeClass('disabledToolButton');
    $('#' + buttonId).effect('highlight');
}

/**
 * Requires the use of ezclocker-buttons.css file
 * @param buttonId
 */
function disableToolButton(buttonId) {
    $('#' + buttonId).addClass('disabledToolButton');
    $('#' + buttonId).removeClass('toolButton');
}

/**
 * Disables a button by setting a specific style
 * @param buttonId
 * @param disableStyle
 * @param enabledStyle
 */
function disableButtonWithStyle(buttonId, disableStyle, enabledStyle) {
    $('#' + buttonId).addClass(disableStyle);
    $('#' + buttonId).removeClass(enabledStyle);
}

/**
 * Enables a button by setting a specific style
 * @param buttonId
 * @param disableStyle
 * @param enabledStyle
 */
function enableButtonWithStyle(buttonId, disableStyle, enabledStyle) {
    $('#' + buttonId).addClass(enabledStyle);
    $('#' + buttonId).removeClass(disableStyle);
}
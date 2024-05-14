/* DEPRECATED: Replaced by EzIdleLogoutDialog */

/**
 * @public
 * Creates a new instance of EzAutoLogout
 */
function EzAutoLogout() {
    this.ready = false;

    return this;
}

/**
 * @protected
 * Initializes EzAutoLogout
 *
 * @returns {EzAutoLogout}
 */
EzAutoLogout.prototype.ezInit = function() {
    var self = ezApi.ezclocker.ezAutoLogout;

    if (ezApi.ezIsNotValid($(document).idleTimeout)) {
        ezApi.ezclocker.logger.error('EzAutoLogout was unable to locate idleTimeout dependency. Auto logout is disabled.');
        return;
    }

    $(document).idleTimeout({
        inactivity: '28800',
        redirectUrl: ezApi.ezclocker.nav.getLogoutUrl(),
        sessionKeepAliveUrl: ezApi.ezclocker.nav.getInternalApiUrl('account/user', 'v1')
    });

    return self;
};

/**
 * ezApi Registration
 */
document.addEventListener('onEzApiReady', function() {
    ezApi.ezRegisterNewApi(EzAutoLogout, 'ezAutoLogout');
});
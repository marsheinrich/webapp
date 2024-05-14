/**
 * Provides the auto-logout when idle feature
 * so that users do not remain logged in when their session is expired.
 */

var ezIdleLogout = {
    ready: true,
    init: function() {
        return new Promise(function(resolve) {
            $(document).timedLogout({
                sessionAlive: 1200000,
                alive_url: '../_api/v1/account/imALIVE',
                logout_url: '../resources/j_spring_security_logout',
                redirect_url: '../public/signin.html'
            });
            resolve();
        });
    }
};

ezIdleLogout.init();
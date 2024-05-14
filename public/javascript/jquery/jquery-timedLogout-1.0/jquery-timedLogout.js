(function($){
    $.fn.timedLogout = function(options) {
        var defaults = {
            inactivity: 1200000, //20 Minutes
            noconfirm: 10000, //10 Seconds
            sessionAlive: 30000, //10 Minutes
            redirect_url: 'http://js.sandbox/',
            click_reset: true,
            alive_url: 'http://js.sandbox/index.html',
            logout_url: 'http://js.sandbox/index.html'
        };
    
        //##############################
        //## Private Variables
        //##############################
        var opts = $.extend(defaults, options);
        var liveTimeout, confTimeout, sessionTimeout;
        var modal = '<div id=\'modal_pop\'><p>You are about to be signed out due to inactivity.</p></div>';
        //##############################
        //## Private Functions
        //##############################
        var start_liveTimeout = function() {
            clearTimeout(liveTimeout);
            clearTimeout(confTimeout);
            liveTimeout = setTimeout(logout, opts.inactivity);
      
            if(opts.sessionAlive) {
                clearTimeout(sessionTimeout);
                sessionTimeout = setTimeout(keep_session, opts.sessionAlive);
            }
        };
    
        var logout = function() {
      
            confTimeout = setTimeout(redirect, opts.noconfirm);
            $(modal).dialog({
                buttons: {'Stay Logged In':  function(){
                    $(this).dialog('close');
                    stay_logged_in();
                }},
                modal: true,
                title: 'Auto Logout'
            });
      
        };
    
        var redirect = function() {
            if(opts.logout_url) {
                $.get(opts.alive_url);
            }
            window.location.href = opts.redirect_url;
        };
    
        var stay_logged_in = function(el) {
            start_liveTimeout();
            if(opts.alive_url) {
                $.get(opts.alive_url);
            }
        };
    
        var keep_session = function() {
            $.get(opts.alive_url);
            clearTimeout(sessionTimeout);
            sessionTimeout = setTimeout(keep_session, opts.sessionAlive);
        }; 
    
        //###############################
        //Build & Return the instance of the item as a plugin
        // This is basically your construct.
        //###############################
        return this.each(function() {
            obj = $(this);
            start_liveTimeout();
            if(opts.click_reset) {
                $(document).bind('click', start_liveTimeout);
            }
            if(opts.sessionAlive) {
                keep_session();
            }
        });
    
    };
})(jQuery);

/**
    Provides the ability to inject the Facebook Pixel script into an HTML page.
    @deprecated
    Migrate to using ezMetrics functionality instead. (/public/widgits/EzMetrics)
 */
class EzFacebookPixel {
    constructor() {
        this.ready = false;
        this.ezInjected = false;
    }

    /**
     * @protected
     * Initializes EzFacebookPixel
     *
     * @returns {EzFacebookPixel}
     */
    ezInit() {
        let self = ezApi.ezclocker[EzFacebookPixel.ezApiName];

        self.ezInjectFacebookPixel();

        self.ready = true;
        return self;
    }

    /**
     * Injects the Facebook Pixel Script
     */
    ezInjectFacebookPixel() {
        let self = ezApi.ezclocker[EzFacebookPixel.ezApiName];

        ezUi.ezAppendContent('body', ezApi.ezTemplate`
            <a id="EzFacebookHonypotLink"
                href="https://yaiwevzx6i.execute-api.us-west-2.amazonaws.com/ProdStage" rel="nofollow"
                style="display:none" aria-hidden="true"></a>
            <script id="EzFacebookPixelScript">
                ! function (f, b, e, v, n, t, s) {
                    if (f.fbq) return;
                    n = f.fbq = function () {
                        n.callMethod ?
                            n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                    };
                    if (!f._fbq) f._fbq = n;
                    n.push = n;
                    n.loaded = !0;
                    n.version = '2.0';
                    n.queue = [];
                    t = b.createElement(e);
                    t.async = !0;
                    t.src = v;
                    s = b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t, s)
                }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1349294525090409');
            fbq('track', 'PageView');
        </script>
        <noscript id="EzFaceBookPixelNoScript">
            <img height="1" width="1" alt="facebook"
                src="https://www.facebook.com/tr?id=1349294525090409&ev=PageView&noscript=1"/>
        </noscript>`);

        self.ezInjected = true;
    }
}

EzFacebookPixel.ezApiName = 'ezFacebookPixel';

export {
    EzFacebookPixel
};

/**
 * ezApi Registration
 */
document.addEventListener('onEzApiReady', function() {
    ezApi.ezRegisterNewApi(EzFacebookPixel, EzFacebookPixel.ezApiName);
});

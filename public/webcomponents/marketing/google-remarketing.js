import { EzUI } from '/public/javascript/common/ezui.js';

/**
    Provides support for injecting the Google remarking scripts into an HTML page.
    @deprecated
    Migrate to using ezMetrics functionality instead. (/public/widgits/EzMetrics)
 */
class EzGoogleRemarketing {
    /** @public @static @property */
    static ezApiName = 'ezGoogleRemarketing';

    /** @public @static @property */
    static ezEventNames = {};

    /** @public @static @property */
    static ezInstance = null;

    /** @public @static @property */
    static ezApiRegistrationState = null;

    /** @private @static @method */
    static ezCanRegister() {
        return 'PENDING' === EzGoogleRemarketing.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') && globalThis['ezApi'].ready &&
            ezUi && ezUi.ready;
    }

    /** @private @static @method */
    static ezRegistrator() {
        if (EzGoogleRemarketing.ezCanRegister()) {
            EzGoogleRemarketing.ezInstance = ezApi.ezRegisterNewApi(
                EzGoogleRemarketing,
                EzGoogleRemarketing.ezApiName);

            EzGoogleRemarketing.ezApiRegistrationState = 'REGISTERED';
        }
    }

    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                this.ezRegistrator);

            document.addEventListener(
                EzUI.ezEventNames.onReady,
                this.ezRegistrator);
        }
    }

    constructor() {
        this.ready = false;
        this.ezInjected = false;
    }

    /**
     * @protected
     * Initializes EzGoogleRemarketing
     *
     * @returns {EzGoogleRemarketing}
     */
    ezInit() {
        const self = ezApi.ezclocker[EzGoogleRemarketing.ezApiName];

        self.ezInjectGoogleRemarketingScript();

        this.ready = true;
        return self;
    }

    /**
     * Injects the Google Remarketing script.
     */
    ezInjectGoogleRemarketingScript() {
        const self = ezApi.ezclocker[EzGoogleRemarketing.ezApiName];

        if (ezApi.ezIsTrue(self.ezInjected)) {
            // Already injected
            return;
        }

        ezUi.ezAppendContent('body', ezApi.ezTemplate`
            <script type="text/javascript">
                /* <![CDATA[ */
                    var google_conversion_id = 969305970;
                    var google_custom_params = window.google_tag_params;
                    var google_remarketing_only = true;
                /* ]]> */
            </script>
            <script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js"></script>
            <noscript>
                <div style="display:inline;">
                    <img height="1" width="1" style="border-style:none;" alt="."
                        src="//googleads.g.doubleclick.net/pagead/viewthroughconversion/973784756/?guid=ON&amp;script=0"/>
                </div>
            </noscript>`);
        self.ezInjected = true;
    }
}

export {
    EzGoogleRemarketing
};

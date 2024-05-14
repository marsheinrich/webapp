/**
 * Provides support for injecting the Google remarking scripts into an HTML page.
 */
class EzGoogleRemarketing {
    constructor() {
        this.ready = false;
        this.ezTypeName = 'EzGoogleRemarketing';

        this.ezEnabled = false;
        this.ezIds = {
            ezGoogleRemarketingScriptId: 'EzGoogleRemarketingScript',
            ezGooglePageConversionScriptId: 'EzGooglePageConversionScript',
            ezGoogleRemarketingNoScriptId: 'EzGoogleRemarketingNoScriptId'
        };
    }

    /**
     * @protected
     * Initializes EzGoogleRemarketing
     *
     * @returns {EzGoogleRemarketing}
     */
    ezInit() {
        let self = ezApi.ezclocker[EzGoogleRemarketing.ezApiName];

        this.ready = true;
        return self;
    }

    /**
        @public
        Injects the google remarketing/conversion scripts into the HTML body
     */
    ezEnable() {
        let self = ezApi.ezclocker[EzGoogleRemarketing.ezApiName];
        self.ezInjectGoogleRemarketingScript();
        self.ezEnabled = true;
    }

    /**
        @public
        Removes the google remarket/conversion scripts
     */
    ezDisable() {
        let self = ezApi.ezclocker[EzGoogleRemarketing.ezApiName];

        ezUi.ezRemoveElement(self.ezIds.ezGoogleRemarketingScriptId);
        ezUi.ezRemoveElement(self.ezIds.ezGooglePageConversionScriptId);
        ezUi.ezRemoveElement(self.ezIds.ezGoogleRemarketingNoScriptId);
        self.ezEnabled = false;
    }

    /**
        @protected
        Injects the Google Remarketing script.
     */
    ezInjectGoogleRemarketingScript() {
        var self = ezApi.ezclocker[EzGoogleRemarketing.ezApiName];

        if (ezApi.ezIsTrue(self.ezInjected)) {
            // Already injected
            return;
        }

        ezUi.ezAppendContent('body', ezApi.ezTemplate`
            <script id="${self.ezIds.ezGoogleRemarketingScriptId}">
                <!-- Google Remarketing/Conversion Script -->
                /* <![CDATA[ */
                    var google_conversion_id = 969305970;
                    var google_custom_params = window.google_tag_params;
                    var google_remarketing_only = true;
                /* ]]> */
            </script>
            <script id="${self.ezIds.ezGooglePageConversionScriptId}" type="text/javascript"
                src="//www.googleadservices.com/pagead/conversion.js"></script>
            <noscript id="${self.ezIds.ezGoogleRemarketingNoScriptId}">
                <div style="display:inline;">
                    <img height="1" width="1" style="border-style:none;" alt="."
                        src="//googleads.g.doubleclick.net/pagead/viewthroughconversion/973784756/?guid=ON&amp;script=0"/>
                </div>
            </noscript>`);
        self.ezInjected = true;
    }
}

EzGoogleRemarketing.ezApiName = 'ezGoogleRemarketing';

export {
    EzGoogleRemarketing
};

/**
 * ezApi Registration
 */
document.addEventListener('onEzApiReady', function() {
    ezApi.ezRegisterNewApi(EzGoogleRemarketing, EzGoogleRemarketing.ezApiName);
});

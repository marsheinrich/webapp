import { EzClass } from '/ezlibrary/EzClass.js';

import { EzUI } from '/public/javascript/common/ezui.js';

globalThis['fbq'] = globalThis['fbq'] || null;

class EzFacebookIntegration extends EzClass {
    /**
        @public @static @field
        @type {EzFacebookIntegration}
     */
    static ezInstance = null;

    /**
        @public @static @field
        @type {string}
     */
    static ezApiRegistrationState = null;

    /**
        @public @static @field
        @type {string}
     */
    static get ezApiName() {
        return 'ezFacebookIntegration';
    }
    /**
        @public @static @field
        @type {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzFacebookIntegration_Ready',
        };
    }

    /**
        @public @static @method
     */
    static get ezCanRegister() {
        return 'PENDING' === EzFacebookIntegration.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready;
    }

    /**
        @private @static @method
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (!EzFacebookIntegration.ezCanRegister) {
            return false;
        }

        ezApi.ezRegisterNewApi(
            EzFacebookIntegration,
            EzFacebookIntegration.ezApiName);
        EzFacebookIntegration.ezApiRegistrationState = 'REGISTERED';
        return true;
    }

    // Static constructor
    static {
        if (null == EzFacebookIntegration.ezApiRegistrationState) {
            EzFacebookIntegration.ezApiRegistrationState = 'PENDING';

            if (!EzFacebookIntegration.#ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    EzFacebookIntegration.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzFacebookIntegration.#ezRegistrator);
            }
        }
    }

    /**
        @public @constructor
     */
    constructor() {
        super();
    }

    /**
        @public @readonly @property
        @returns {object}
     */
    get ezIds() {
        return {
            facebookPixelScriptId: 'FacebookPixelScriptId',
            facebookPixelNoScriptId: 'FacebookPixelNoScriptId'
        };
    }


    /**
        @protected @method
     */
    ezInit() {
        return EzFacebookIntegration.ezInstance;
    }

    /**
        @public @method
        Removes the facebook script and no-script from the document.
     */
    ezDisable() {
        if (ezApi.ezclocker.ezUi.ezElementExists(EzFacebookIntegration.ezInstance.ezIds.facebookPixelScriptId)) {
            ezApi.ezclocker.ezUi.ezRemoveElement(EzFacebookIntegration.ezInstance.ezIds.facebookPixelScriptId);
        }

        if (ezApi.ezclocker.ezUi.ezElementExists(EzFacebookIntegration.ezInstance.ezIds.facebookPixelNoScriptId)) {
            ezApi.ezclocker.ezUi.ezRemoveElement(EzFacebookIntegration.ezInstance.ezIds.facebookPixelNoScriptId);
        }

        globalThis['fbq'] = null;
    }

    /**
        @public @method
        Appends the facbook pixel into the document body
     */
    ezEnable() {
        if (globalThis['fbq']) {
            // already imported ignore
            return;
        }

        if (!ezApi.ezclocker.ezUi.ezElementExists(EzFacebookIntegration.ezInstance.ezIds.facebookPixelScriptId)) {
            ezApi.ezclocker.ezUi.ezAppendContent(
                'head',
                EzFacebookIntegration.ezInstance.ezBuildFacebookPixelScript());
        }
    }

    /**
        Builds the facebook pixel code to inject
     */
    ezBuildFacebookPixelScript() {
        return ezApi.ezTemplate`
            <script id="${EzFacebookIntegration.ezInstance.ezIds.facebookPixelScriptId}">
                !function (f, b, e, v, n, t, s) {
                    if (f.fbq) return;
                    n = f.fbq = function () {
                        n.callMethod
                            ? n.callMethod.apply(n, arguments)
                            : n.queue.push(arguments)
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
            <noscript id="${EzFacebookIntegration.ezInstance.ezIds.facebookPixelNoScriptId}">
                <img height="1" width="1" src="https://www.facebook.com/tr?id=1349294525090409&ev=PageView&noscript=1"
                    alt="." />
            </noscript>`;
    }

    ezTrackLead() {
        if (globalThis['fbq']) {
            globalThis['fbq']('track', 'Lead');
        }
    }
}

export {
    EzFacebookIntegration
};

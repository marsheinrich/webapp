import { EzClass } from '/ezlibrary/EzClass.js';
import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';
import { EzUrlHelper } from '/public/javascript/common/ezclocker-url-helper2.js';

/**
    Provides additional debug assistence when enabled
    Import with:
        import { EzDebug } from '/public/javascript/common/ezclocker-debug.js';
 */
class EzDebug extends EzClass {
    /**
        @public @static @field
        @type {EzSubscriptionDialog}
     */
    static ezInstance = null;

    /**
        @public @static @field
        @type {string}
     */
    static ezApiRegistrationState = null;

    /**
        @public @static @readonly @property
        @returns {string}
     */
    static get ezApiName() {
        return 'ezDebug';
    }

    /**
        @public @static @readonly @property
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzSubscriptionDialog_Ready',
            onDebugEnabled: 'ezOn_EzDebug_Enabled',
            onDebugDisabled: 'ezOn_EzDebug_Disabled'
        };
    }

    /**
        @public @static @readonly @property
        @returns {boolean}
     */
    static get ezCanRegister() {
        return 'PENDING' === EzDebug.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUrlHelper.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUrlHelper.ezApiName].ready;
    }

    /**
        @private @static @method
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (!EzDebug.ezCanRegister) {
            return false;
        }

        EzDebug.ezInstance = ezApi.ezRegisterNewApi(
            EzDebug,
            EzDebug.ezApiName);
        EzDebug.ezApiRegistrationState = 'REGISTERED';
        return true;
    }

    static {
        if (null == EzDebug.ezApiRegistrationState) {
            EzDebug.ezApiRegistrationState = 'PENDING';

            if (!EzDebug.#ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    () => {
                        if (!EzDebug.#ezRegistrator()) {
                            document.addEventListener(
                                EzEventEngine.ezEventNames.onReady,
                                EzDebug.#ezRegistrator);

                            document.addEventListener(
                                EzUrlHelper.ezEventNames.onReady,
                                EzDebug.#ezRegistrator);
                        }
                    });
            }
        }
    }

    /**
        @public @constructor
     */
    constructor() {
        super();
    }

    environment = 'UNKNOWN';
    isDebugMode = false;
    ezOverlayOn = false;


    /**
        @protected @method
        Initializes EzDebug
        @returns {EzDebug}
     */
    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzDebug.ezApiName,
            EzDebug.ezEventNames.onDebugEnabled);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzDebug.ezApiName,
            EzDebug.ezEventNames.onDebugDisabled);

        if (ezApi.ezclocker.ezUrlHelper.isDebugMode()) {
            EzDebug.ezInstance.isDebugMode = ezApi.ezclocker.ezUrlHelper.isDebugMode();
            EzDebug.ezInstance.ezTurnOnDebug();
        } else {
            EzDebug.ezInstance.ezTurnOffDebug();
        }

        return EzDebug.ezInstance;
    }

    /**
        @public
        Turns the debugging overlay on
     */
    ezTurnOnDebug(enableOverlay) {
        const self = EzDebug.ezInstance;

        enableOverlay = ezApi.ezIsBoolean(enableOverlay)
            ? enableOverlay
            : true;

        ezApi.ezclocker.ezDebug.isDebugMode = true;
        if (ezApi.ezIsTrue(enableOverlay)) {
            self.ezTurnOnOverlay();
        }

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzDebug.ezEventNames.onDebugEnabled,
            this);
    }

    /**
        @public
        Turns the debugging overlay off
     */
    ezTurnOffDebug() {
        const self = EzDebug.ezInstance;

        ezApi.ezclocker.ezDebug.isDebugMode = false;

        self.ezTurnOffOverlay();

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzDebug.ezEventNames.onDebugDisabled,
            this);
    }

    /**
        @public
        Turns on the layout overlayd grid
     */
    ezTurnOnOverlay() {
        /*
        if (ezApi.ezElementExists('EzDebugOverlayCssLink')) {
            return;
        }

        ezUi.ezAppendHtml$(
            'head',
            ezApi.ezTemplate`
                <link id="EzDebugOverlayCssLink"
                href="/public/styles/common/ezclocker-debug-overlay.css" rel="stylesheet" type="text/css">`);

        this.ezOverlayOn = true;
        */
    }

    /**
        @public
        Turns off the layout overlayd grid
     */
    ezTurnOffOverlay() {
        if (!ezApi.ezElementExists('EzDebugOverlayCssLink')) {
            return;
        }
        ezApi.ezId('EzDebugOverlayCssLink').remove();

        this.ezOverlayOn = false;
    }

    /**
        @public
        Toggles the visibility of the overlay grid
     */
    ezToggleOverlay() {
        const self = EzDebug.ezInstance;

        if (ezApi.ezIsTrue(self.ezOverlayOn)) {
            self.ezTurnOffOverlay();
        } else {
            self.ezTurnOnOverlay();
        }
    }

    /**
        @public
        Returns if the debugging overlay is active
        @returns {boolean}
     */
    isDebug() {
        return EzDebug.ezInstance.isDebugMode;
    }

    /**
        @public
        Returns if the debugging overlay is active
        @returns {boolean}
     */
    ezIsDebug() {
        return EzDebug.ezInstance.isDebugMode;
    }
}

export {
    EzDebug
};

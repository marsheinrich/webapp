import { EzEnum } from '/ezlibrary/enums/EzEnum.js';

import { EzIdleTimeout } from '/secure/widgets/EzIdleLogoutDialog/EzIdleTimeout.js';

/**
    Represents the distance to zero for a count down with three levels.
 */
class EzCountDownState extends EzEnum{
    static get GREEN() {
        return 'GREEN';
    }
    static get YELLOW() {
        return 'YELLOW';
    }
    static get RED() {
        return 'RED';
    }

    static ezApiName = 'EzClockerContextEventName';
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzCountDownState.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    static ezRegistrator() {
        if (EzCountDownState.ezCanRegister()) {
            EzCountDownState.ezInstance = ezApi.ezRegisterEnumeration(EzCountDownState);

            EzCountDownState.ezApiRegistrationState = 'REGISTERED';
        }
    }
    // Static Constructor
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                this.ezRegistrator);
        }
    }

    constructor() {
        super();
    }
}

/**
    Dialog that displays a count down timer that when reached, the user is logged out.
 */
class EzIdleLogoutDialog {
    static ezApiName = 'EzIdleLogoutDialog';
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzIdleLogoutDialog.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    static ezRegistrator() {
        if (EzIdleLogoutDialog.ezCanRegister()) {
            EzIdleLogoutDialog.ezInstance = ezApi.ezRegisterNewApi(
                EzIdleLogoutDialog,
                EzIdleLogoutDialog.ezApiName);

            EzIdleLogoutDialog.ezApiRegistrationState = 'REGISTERED';
        }
    }
    // Static Constructor
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                this.ezRegistrator);
        }
    }

    constructor() {
        this.ready = false;
        this.ezTypeName = 'EzIdleLogoutDialog';

        this.ezParentId = '_HideDialogsDiv';
        this.ezDialogId = 'EzIdleLogoutDialog';

        this.ezAutoLogoutLimit = 30 * 1000; // 30 seconds

        this.ezCountDownValue = this.ezAutoLogoutLimit;

        this.ezCountDownState = EzCountDownState.GREEN;

        this.ezCountDownTicker = null;
    }

    /**
        @protected
        Initializes the EzIdleLogoutDialog instance.
     */
    ezInit() {
        let self = ezApi.ezclocker[EzIdleLogoutDialog.ezApiName];

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzIdleTimeout.ezEventNames.onUserIsIdle,
            EzIdleLogoutDialog.ezApiName,
            self.ezShow);

        ezApi.ezclocker.ezEventEngine.ezWantEvent(
            EzIdleTimeout.ezEventNames.onUserIdleCanceled,
            EzIdleLogoutDialog.ezApiName,
            self.ezClose);

        self.ezInitUx();

        self.ready = true;
        return self;
    }

    /**
        @protected
        Initializes the dialog's UX
     */
    ezInitUx() {
        let self = ezApi.ezclocker[EzIdleLogoutDialog.ezApiName];

        ezUi.ezAppendContent(self.ezParentId, self.ezBuildDialogHtml());
    }

    /**
        @protected
        Resets the dialog to it's initial state
     */
    ezResetDialog() {
        let self = ezApi.ezclocker[EzIdleLogoutDialog.ezApiName];

        self.ezStopCountDownTicker();

        self.ezAutoLogoutLimit = 30 * 1000; // 30 seconds
        self.ezCountDownValue = this.ezAutoLogoutLimit;
        self.ezCountDownState = EzCountDownState.GREEN;
        self.ezCountDownTicker = null;
    }

    /**
        @public
        Shows the dialog and starts the count down to log out.
     */
    ezShow() {
        let self = ezApi.ezclocker[EzIdleLogoutDialog.ezApiName];

        self.ezResetDialog();

        self.ezStartCountDownTicker();

        ezApi.ezclocker.ezClockerDialog.ezShowDialog(self.ezDialogId);
    }

    /**
        @public
        Closes the dialog
     */
    ezClose() {
        let self = ezApi.ezclocker[EzIdleLogoutDialog.ezApiName];

        self.ezStopCountDownTicker();
        ezApi.ezclocker.ezClockerDialog.ezCloseDialog(self.ezDialogId);
    }

    /**
        @public
        Cancels the dialog's auto-signout action
     */
    ezCancel() {
        let self = ezApi.ezclocker[EzIdleLogoutDialog.ezApiName];

        self.ezClose();
    }

    /**
        @public
        Signs the user out of ezClocker
     */
    ezSubmit() {
        let self = ezApi.ezclocker[EzIdleLogoutDialog.ezApiName];

        self.ezClose();
        ezApi.ezclocker.nav.ezSignOut();
    }

    /**
        @protected
        Updates the UX with the count down value
     */
    ezUpdateCountDown() {
        let self = ezApi.ezclocker[EzIdleLogoutDialog.ezApiName];

        if (10 <= self.ezCountDownValue && EzCountDownState.RED !== self.ezCountDownState) {
            self.ezCountDownState = EzCountDownState.RED;
            ezUi.ezRemoveClass(ezApi.ezIdTemplate`${self.ezDialogId}_IdleCountDown`, 'idleCountDownContainerWarning');
            ezUi.ezAddClass(ezApi.ezIdTemplate`${self.ezDialogId}_IdleCountDown`, 'idleCountDownContainerEnding');
        } else if (self.ezAutoLogoutInterval / 2 <= self.ezCountDownValue &&
            EzCountDownState.YELLOW !== self.ezCountDownState) {
            self.ezCountDownState = EzCountDownState.YELLOW;
            ezUi.ezRemoveClass(ezApi.ezIdTemplate`${self.ezDialogId}_IdleCountDown`, 'idleCountDownContainerEnding');
            ezUi.ezAddClass(ezApi.ezIdTemplate`${self.ezDialogId}_IdleCountDown`, 'idleCountDownContainerWarning');
        } else if (EzCountDownState.GREEN !== self.ezCountDownState) {
            self.ezCountDownState = EzCountDownState.GREEN;
            ezUi.ezRemoveClass(ezApi.ezIdTemplate`${self.ezDialogId}_IdleCountDown`, 'idleCountDownContainerWarning');
            ezUi.ezRemoveClass(ezApi.ezIdTemplate`${self.ezDialogId}_IdleCountDown`, 'idleCountDownContainerEnding');
        }

        ezUi.ezContent(ezApi.ezIdTemplate`${self.ezDialogId}_IdleCountDown`, self.ezCountDownValue);
    }

    /**
        @protected
        Builds the dialog's HTML
     */
    ezBuildDialogHtml() {
        let self = ezApi.ezclocker[EzIdleLogoutDialog.ezApiName];
        return ezApi.ezTemplate`
            <style>
            .idleCountDownContainer {
                color: var(--ezBannerHeaderColor);
                font-size: var(--ezBannerHeaderFontSize);
                font-weight: var(--ezBannerHeaderFontWeight);
                font-style: var(--ezBannerHeaderFontStyle);
                text-alignment: center;
            }
            .idleCountDownContainerWarning {
                color: var(--ezClockerYellow);
                font-size: var(--ezBannerHeaderFontSize);
                font-weight: var(--ezBannerHeaderFontWeight);
                font-style: var(--ezBannerHeaderFontStyle);
                text-alignment: center;
            }
            .idleCountDownContainerEnding {
                color: var(--ezClockerAlertRed);
                font-size: var(--ezBannerHeaderFontSize);
                font-weight: var(--ezBannerHeaderFontWeight);
                font-style: var(--ezBannerHeaderFontStyle);
                text-alignment: center;
            }
            </style>
            <div id="${self.ezDialogId}" title="Idle Logout">
                <h2 id="${self.ezDialogId}_IdleMessage">
                    Due to inactivity, ezClocker will automaticlly log you out once the countdown reaches zero.
                </h2>
                <div id="${self.ezDialogId}_IdleCountDown" class="idleCountDownContainer">
                </div>
            </div>`;
    }

    /**
        @protected
        Starts the auto-logout timer
     */
    ezStartCountDownTicker() {
        let self = ezApi.ezclocker[EzIdleLogoutDialog.ezApiName];

        self.ezCountDownValue = self.ezAutoLogoutLimit;

        self.ezCountDownTicker = ezApi.ezclocker.ezTickerTimer.ezStartIntervalTicker(
            self.ezHandlCountDownTick, 1000, ezApi.ezIdTemplate`${EzIdleLogoutDialog.ezApiName}TickerTimer`);
    }

    /**
        @protected
        Handles the count down ticks, updating the UX with the new value
     */
    ezHandleCountDownTick() {
        let self = ezApi.ezclocker[EzIdleLogoutDialog.ezApiName];

        if (1 >= self.ezCountDownValue) {
            self.ezStopCountDownTicker();
            self.ezCountDownValue = 0;
            self.ezUpdateCountDown(self.ezCountDownValue);
            self.ezSubmit();
        } else {
            self.ezCountDownValue--;
            self.ezUpdateCountDown(self.ezCountDownValue);
        }
    }

    /**
        @protected
        Stops the count down ticker
     */
    ezStopCountDownTicker() {
        let self = ezApi.ezclocker[EzIdleLogoutDialog.ezApiName];

        if (ezApi.ezIsValid(self.ezCountDownTicker)) {
            ezApi.ezclocker.ezTickerTimer.ezStopIntervalTicker(self.ezCountDownTicker.intervalId);
            self.ezCountDownTicker = null;
        }
    }
}

export {
    EzCountDownState,
    EzIdleLogoutDialog
};
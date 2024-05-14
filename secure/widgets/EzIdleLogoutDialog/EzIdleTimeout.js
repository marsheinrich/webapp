import { EzElementEventName } from '/ezlibrary/EzElementEventName.js';
/**
    Monitors user activity and triggers events if determined the user is idle or the user has
    gone from idle to not-idle
 */
class EzIdleTimeout {
    constructor() {
        this.ready = false;
        this.ezTypeName = 'EzIdleTimeout';

        this.ezActivityCheckInterval = 20 * 60 * 1000; // 20 minutes
        this.ezLastActivityMoment = null;
        this.ezActivityTicker = null;
        
        this.ezEventNames = EzIdleTimeout.ezEventNames;
    }

    /**
        @protected
        Initializes EzIdleTimeout
        @returns {EzIdleTimeout} 
     */
    ezInit() {
        let self = ezApi.ezclocker[EzIdleTimeout.ezApiName];

        // Register events
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzIdleTimeout.ezApiName,
            EzIdleTimeout.ezEventNames.onUserIsIdle);

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzIdleTimeout.ezApiName,
            EzIdleTimeout.ezEventNames.onUserIdleCanceled);

        // Hook events
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'body',
            EzElementEventName.CLICK,
            EzIdleTimeout.ezApiName,
            self.ezRecordActivity);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'body',
            EzElementEventName.DOUBLE_CLICK,
            EzIdleTimeout.ezApiName,
            self.ezRecordActivity);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'body',
            EzElementEventName.COPY,
            EzIdleTimeout.ezApiName,
            self.ezRecordActivity);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'body',
            EzElementEventName.CUT,
            EzIdleTimeout.ezApiName,
            self.ezRecordActivity);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'body',
            EzElementEventName.PASTE,
            EzIdleTimeout.ezApiName,
            self.ezRecordActivity);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'body',
            EzElementEventName.KEY_PRESS,
            EzIdleTimeout.ezApiName,
            self.ezRecordActivity);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'body',
            EzElementEventName.WHEEL,
            EzIdleTimeout.ezApiName,
            self.ezRecordActivity);

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            'body',
            EzElementEventName.MOUSE_MOVE,
            EzIdleTimeout.ezApiName,
            self.ezRecordActivity);

        self.ezStartActivityTicker();

        self.ready = true;
        return self;
    }

    /**
        @protected
        Updates the last activity with the current date and time.
     */
    ezRecordActivity() {
        let self = ezApi.ezclocker[EzIdleTimeout.ezApiName];

        self.ezLastActivityMoment = ezApi.ezclocker.ezDateTime.ezNow();
    }

    /**
        @protected
        Starts the activity ticker
     */
    ezStartActivityTicker() {
        let self = ezApi.ezclocker[EzIdleTimeout.ezApiName];

        self.ezStopActivityTicker();

        self.ezActivityTicker = ezApi.ezclocker.ezTickerTimer.ezStartIntervalTicker(
            self.ezCheckActivity,
            self.ezActivityCheckInterval,
            EzIdleTimeout.ezApiName);
            
        self.ezRecordActivity();
    }

    /**
        @protected
        Stops the activity ticker
     */
    ezStopActivityTicker() {
        let self = ezApi.ezclocker[EzIdleTimeout.ezApiName];

        if (ezApi.ezIsValid(self.ezActivityTicker)) {
            ezApi.ezclocker.ezTickerTimer.ezStopIntervalTicker(self.ezActivityTicker.intervalId);
        }
    }

    /**
        @protected
        Checks the user activity and triggers events as needed
     */
    ezCheckActivity() {
        let self = ezApi.ezclocker[EzIdleTimeout.ezApiName];

        let expectedActivityByMoment = ezApi.ezclocker.ezDateTime.ezNow()
            .minus(this.ezActivityCheckInterval, 'minutes');

        if (self.ezLastActivityMoment.isBefore(expectedActivityByMoment)) {
            self.ezUserIsIdle = true;
            self.ezTriggerUserIsIdle();
        } else if (self.ezUserIsIdle) {
            self.ezTriggerUserIdleCanceled();
        }
    }

    /**
        @protected
        Triggers the onUserIsIdle event
     */
    ezTriggerUserIsIdle() {
        let self = ezApi.ezclocker[EzIdleTimeout.ezApiName];

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzIdleTimeout.ezEventNames.onUserIsIdle,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzIdleTimeout.ezApiName,
                'User detected as idle', {
                    lastActivityMoment: self.ezLastActivityMoment
                }));
    }

    /**
        @protected
        Triggers the onUserIdleCanceled event
     */
    ezTriggerUserIdleCanceled() {
        let self = ezApi.ezclocker[EzIdleTimeout.ezApiName];

        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzIdleTimeout.ezEventNames.onUserIdleCanceled,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzIdleTimeout.ezApiName,
                'User detected as no longer idle', {
                    lastActivityMoment: self.ezLastActivityMoment
                }));
    }
}
EzIdleTimeout.ezApiName = 'ezIdleTimeout';
EzIdleTimeout.ezEventNames = {
    onUserIsIdle: ezApi.ezIdTemplate`on${EzIdleTimeout.ezApiName}_User_IsIdle`,
    onUserIdleCanceled: ezApi.ezIdTemplate`on${EzIdleTimeout.ezApiName}_User_IdleCanceled`
};

export {
    EzIdleTimeout
};

document.addEventListener('onEzApiReady',
    () => ezApi.ezRegisterNewApi(EzIdleTimeout, EzIdleTimeout.ezApiName));

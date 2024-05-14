import { EzWidgetState } from '../public/widgets/common/EzWidgetState.js';

class EzAvitarBrowser {
    constructor() {
        this.ready = false;
        this.ezTypeName = 'EzAvitarBrowser';
        this.ezWidgetStates = [EzWidgetState.UNINITIALIZED];

        this.ezAvailableAvitarUrls = [];
    }

    /**
        @protected
        Initializes EzAvitarBrowser
        Initialization and setup that doesn't include UX goes here.
        NOTE: ONLY RUNS ONCE
        @returns {EzAvitarBrowser}
     */
    ezInit() {
        let self = EzAvitarBrowser.ezInstance;

        if (self.ezWidgetStates.includes(EzWidgetState.INITIALIZED)) {
            // already initialized
            return;
        }

        self.ezInitUX();

        self.ready = true;
        EzWidgetState.ezRemoveState(self.ezWidgetStates, EzWidgetState.UNINITIALIZED);
        EzWidgetState.ezAddState(self.ezWidgetStates, EzWidgetState.INITIALIZED);
        return self;
    }

    /**
        @protected
        Initializes the EzAvitarBrowser's UX elements
        UX related initializations and setup goes here
        NOTE: ONLY RUNS ONCE
     */
    ezInitUX() {
        let self = EzAvitarBrowser.ezInstance;

        if (self.ezWidgetStates.includes(EzWidgetState.UX_INITIALIZED)) {
            // already initialized
            return;
        }

        self.ezLoadAvailableAvitars();

        // TODO: Initialize the EzAviatarBrower's UX

        EzWidgetState.ezAddState(self.ezWidgetStates, EzWidgetState.UX_INITIALIZED);
    }

    /**
        @protected
        Loads any data needed prior to showing the UX.
     */
    ezInitData() {
        let self = EzAvitarBrowser.ezInstance;

        if (self.ezWidgetStates.includes(EzWidgetState.DATA_INITIALIZED)) {
            // Data is already initialized
            return;
        }

        // TODO:  Load any data needed before showing the UX

        EzWidgetState.ezAddState(self.ezWidgetStates, EzWidgetState.DATA_INITIALIZED);
    }

    /**
        @public
        Shows the EzAvitarBrowser UX
     */
    ezShow() {
        let self = EzAvitarBrowser.ezInstance;

        if (self.ezWidgetStates.includes(EzWidgetState.VISIBLE)) {
            // Already visible
            return;
        }

        self.ezInitData();

        // TODO: Show the UX

        EzWidgetState.ezAddState(self.ezWidgetStates, EzWidgetState.VISIBLE);
    }

    /**
        @public
        Closes the EzAvitarBrowser UX without submitting.
     */
    ezClose() {
        let self = EzAvitarBrowser.ezInstance;

        if (!self.ezWidgetStates.includes(EzWidgetState.VISIBLE)) {
            // Already closed
            return;
        }

        // TODO: Close the ux

        EzWidgetState.ezRemoveState(self.ezWidgetStates, EzWidgetState.VISIBLE);
    }

    /**
        @public
        Submits selections/changes and closes the UX.
     */
    ezSubmit() {
        const self = EzAvitarBrowser.ezInstance;

        // TODO: Perform submissions

        self.ezClose();
    }

    /**
        @public
        Ignores any changes and closes the UX
     */
    ezCancel() {
        const self = EzAvitarBrowser.ezInstance;

        // TODO: Revert any changes

        self.ezClose();
    }

    ezLoadAvailableAvitars() {
        // TODO: Write code to iterate the index for '/public/images/avitars'
    }
}
EzAvitarBrowser.ezApiName = 'ezAvitarBrowser';
EzAvitarBrowser.ezAvailableAvitarImagesUrl = '/public/images/avitars';
EzAvitarBrowser.ezInstance = EzAvitarBrowser.instance || new EzAvitarBrowser().ezInit();

export {
    EzAvitarBrowser
};
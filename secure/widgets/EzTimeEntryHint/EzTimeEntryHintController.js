import { EzTimeEntryHintType } from '/secure/widgets/EzTimeEntryHint/EzTimeEntryHintType.js';
import { EzTimeEntryHint } from '/secure/widgets/EzTimeEntryHint/EzTimeEntryHint.js';

/**
    Controls the EzTimeEntryHints for time entry grid displays
 */
class EzTimeEntryHintController {
    constructor() {
        this.ready = false;
        this.ezTypeName = 'EzTimeEntryHintController';

        this.ezErrorHints = {};
        this.ezWarningHints = {};
        this.ezGoodHints = {};
    }

    /**
        @protected
        Initializes EzTimeEntryHints
        @returns {EzTimeEntryHints}
     */
    ezInit() {
        var self = ezApi.ezclocker[EzTimeEntryHintController.ezApiName];

        self.ready = true;
        return self;
    }

    ezClearHints() {
        let self = ezApi.ezclocker[EzTimeEntryHintController.ezApiName];

        self.ezErrorHints = {};
        self.ezWarningHints = {};
        self.ezGoodHints = {};
    }

    ezAddErrorHint(timeEntryId, errorMsg, optionalHintData) {
        let self = ezApi.ezclocker[EzTimeEntryHintController.ezApiName];

        self.ezErrorHints[timeEntryId.toString()] =
            new EzTimeEntryHint(EzTimeEntryHintType.ERROR, timeEntryId, errorMsg, optionalHintData);

        return self.ezErrorHints[timeEntryId.toString()];
    }

    ezAddWarningHint(timeEntryId, warningMsg, optionalHintData) {
        let self = ezApi.ezclocker[EzTimeEntryHintController.ezApiName];

        self.ezWarningHints[timeEntryId.toString()] = 
            new EzTimeEntryHint(EzTimeEntryHintType.ERROR, timeEntryId, warningMsg, optionalHintData);
        
        return self.ezWarningHints[timeEntryId.toString()];
    }

    ezAddGoodHint(timeEntryId, goodMsg, optionalHintData) {
        let self = ezApi.ezclocker[EzTimeEntryHintController.ezApiName];

        self.ezGoodHints[timeEntryId.toString()] = 
            new EzTimeEntryHint(EzTimeEntryHintType.ERROR, timeEntryId, goodMsg, optionalHintData);
        
        return self.ezGoodHints[timeEntryId.toString()];
    }
}
EzTimeEntryHintController.ezApiName = 'ezTimeEntryHints';

export {
    EzTimeEntryHintController
};

document.addEventListener('onEzApiReady',
    () => ezApi.ezRegisterNewApi(EzTimeEntryHintController, EzTimeEntryHintController.ezApiName));

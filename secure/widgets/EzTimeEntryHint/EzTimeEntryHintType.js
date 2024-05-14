import { EzEnum } from '/ezlibrary/enums/EzEnum.js';

/**
    Defines the type of TimeEntryHints available
 */
class EzTimeEntryHintType extends EzEnum {
    /**
        Hint is unknown or unavailable
    */
    static get UNKNOWN() {
        return 'UNKNOWN';
    }
    static get _UNKNOWN() {
        return {
            defaultMessage: 'No problems detected!',
            normalImageName: 'images/hint_none.png',
            hoverImageName: 'images/none_hover.png'
        };
    }
    /**
        Hinting an error might be in the time entry
     */
    static get ERROR() {
        return 'ERROR';
    }
    static get _ERROR() {
        return {
            defaultMessage: 'No problems detected!',
            normalImageName: 'images/error.ico',
            hoverImageName: 'images/error_hot.ico'
        };
    }
    /**
        Hinting that theire might be a cause for concern in the time entry
     */
    static get WARNING() {
        return 'WARNING';
    }
    static get _WARNING() {
        return {
            defaultMessage: 'Time exceeds eight hours.',
            normalImageName: 'images/warning.ico',
            hoverImageName: 'images/warning_hot.ico'
        };
    }
    /**
        Hinting that the time entry apperas good.
     */
    static get GOOD() {
        return 'GOOD';
    }
    static get _GOOD() {
        return {
            defaultMessage: 'No problems detected!',
            normalImageName: 'images/good.ico',
            hoverImageName: 'images/good_hot.ico'
        };
    }
    static get ACTIVE_CLOCK_IN() {
        return 'ACTIVE_CLOCK_IN';
    }
    static get _ACTIVE_CLOCK_IN() {
        return {
            defaultMessage: 'Employee\'s active clock in.',
            normalImageName: 'images/good.ico',
            hoverImageName: 'images/good_hot.ico'
        };
    }
    static get PARTIAL_TIME_ENTRY() {
        return 'PARTIAL_TIME_ENTRY';
    }
    static get _PARTIAL_TIME_ENTRY() {
        return {
            defaultMessage: 'The time entries clock in or clock out date falls outside of the selected period.',
            normalImageName: 'images/partial.ico',
            hoverImageName: 'images/partial_hot.ico'
        };
    }

    static ezToNormalImageName(enumValue) {
        return EzTimeEntryHintType[`_${enumValue.toUpperCase()}`]['normalImageName'];
    }
    static ezToHoverImageName(enumValue) {
        return EzTimeEntryHintType[`_${enumValue.toUpperCase()}`]['hoverImageName'];
    }
    static ezToDefaultMessage(enumValue) {
        return EzTimeEntryHintType[`_${enumValue.toUpperCase()}`]['defaultMessage'];
    }

    static ezApiName = 'EzTimeEntryHintType';
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzTimeEntryHintType.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    static ezRegistrator() {
        if (EzTimeEntryHintType.ezCanRegister()) {
            EzTimeEntryHintType.ezInstance = ezApi.ezRegisterEnumeration(EzTimeEntryHintType);

            EzTimeEntryHintType.ezApiRegistrationState = 'REGISTERED';
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

export {
    EzTimeEntryHintType
};
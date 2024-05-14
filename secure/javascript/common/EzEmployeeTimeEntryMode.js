import { EzEnum } from '/ezlibrary/enums/EzEnum.js';

/**
    Import with:
        import { EzEmployeeTimeEntryMode } from '/secure/javascript/common/EzEmployeeTimeEntryMode.js';
 */
export class EzEmployeeTimeEntryMode extends EzEnum {
    static get ezValues() {
        return [
            'UNKNOWN',
            'CLOCKED_IN',
            'CLOCKED_OUT',
            'START_BREAK',
            'END_BREAK'
        ]
    }

    static get CLOCKED_IN() {
        return 'CLOCKED_IN';
    }
    static get _CLOCKED_IN() {
        return {
            display: 'Clock In'
        };
    }

    static get CLOCKED_OUT() {
        return 'CLOCKED_OUT';
    }
    static get _CLOCKED_OUT() {
        return {
            display: 'Clock Out'
        };
    }

    static get START_BREAK() {
        return 'START_BREAK';
    }
    static get _END_BREAK() {
        return {
            display: 'Start Break'
        };
    }

    static get END_BREAK() {
        return 'END_BREAK';
    }
    static get _BREAK_IN() {
        return {
            display: 'End Break'
        };
    }

    static ezToDisplayName(enumValue) {
        return EzEmployeeTimeEntryMode[`_${enumValue.toUpperCase()}`]['display'];
    }

    static ezInstance = null;

    static ezApiRegistrationState = null;

    static get ezApiName() {
        return 'EzClockerContextEventName';
    }

    static get ezCanRegister() {
        return 'PENDING' === EzEmployeeTimeEntryMode.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    static ezRegistrator() {
        if (!EzEmployeeTimeEntryMode.ezCanRegister) {
            return false;
        }

        EzEmployeeTimeEntryMode.ezInstance = ezApi.ezRegisterEnumeration(EzEmployeeTimeEntryMode);
        EzEmployeeTimeEntryMode.ezApiRegistrationState = 'REGISTERED';
        return true;
    }

    // Static Initializer
    static {
        if (null == EzEmployeeTimeEntryMode.ezApiRegistrationState) {
            EzEmployeeTimeEntryMode.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                EzEmployeeTimeEntryMode.ezRegistrator);
        }
    }

    constructor() {
        super();
    }

    /**
        @public @static @method
        Returns the enumeration property value that matches the provided enumValue. If no match is found, then
        EzEmployeeTimeEntryMode.UNKNOWN is returned.
        @returns {string}
     */
    static ezValueOf(enumValue) {
        if (undefined === enumValue && null === enumValue && 'string' !== typeof enumValue) {
            return EzEmployeeTimeEntryMode.UNKNOWN;
        }

        let index = EzEmployeeTimeEntryMode.ezValues.indexOf(enumValue.toUpperCase());

        return index != -1
            ? EzEmployeeTimeEntryMode[EzEmployeeTimeEntryMode.ezValues[index]]
            : EzEmployeeTimeEntryMode.UNKNOWN;
    }
}
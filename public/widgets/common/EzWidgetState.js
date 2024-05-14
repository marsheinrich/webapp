/**
    Defines the possible states for an ezClocker Widget
 */
class EzWidgetState {
    constructor() {
        this.ready = true;
        this.ezTypeName = 'EzWidgetState';
        this.ENUM_NAME = EzWidgetState.ezApiName;

        this.UNKNOWN = 'UNKNOWN';

        this.UNINITIALIZED = 'UNINITIALIZED';

        this.INITIALIZED = 'INITIALIZED';

        this.UX_INITIALIZED = 'UX_INITIALIZED';

        this.DATA_INITIALIZED = 'DATA_INITIALIZED';

        this.VISIBLE = 'VISIBLE';
    }

    /**
        @public
        Registers this enumeration with ezApi
     */
    ezRegisterEnum() {
        if (undefined == ezApi || null == ezApi) {
            console.log.error('Unable to initialize enumeration EzWidgetState with ezApi. EzApi is not yet available.');
        }

        return ezApi.ezRegisterNewEnum(EzWidgetState, EzWidgetState.ezApiName);
    }
}
EzWidgetState.ezApiName = 'EzWidgetState';

// Enum values
EzWidgetState.UNKNOWN = 'UNKNOWN';
EzWidgetState.UNINITIALIZED = 'UNINITIALIZED';
EzWidgetState.INITIALIZED = 'INITIALIZED';
EzWidgetState.UX_INITIALIZED = 'UX_INITIALIZED';
EzWidgetState.DATA_INITIALIZED = 'DATA_INITIALIZED';
EzWidgetState.VISIBLE = 'VISIBLE';

// Class functions
/**
    @static @public
    Adds the provided ezWidgetStateToAdd value to the provided widgetStatesArray if it does not already exist.
    @param {array} widgetStatesArray
    @param {string} ezWidgetStateToAdd
    @returns {array}
    Returns the modified widgetStatesArray
 */
EzWidgetState.ezAddState = (widgetStatesArray, ezWidgetStateToAdd) => {
    if (!widgetStatesArray) {
        throw new Error(
            'A valid widgetStates array param is required to call EzWidgetState.ezAddState');
    }
    if (!ezWidgetStateToAdd) {
        throw new Error(
            'A valid ezWidgetStateToAdd EzWidgetState param is required to call EzWidgetState.ezAddState');
    }

    if (widgetStatesArray.includes(ezWidgetStateToAdd)) {
        // already added.
        return widgetStatesArray;
    }

    widgetStatesArray.push(ezWidgetStateToAdd);

    return widgetStatesArray;
};

/**
    @static @public
    Removes the provided ezWidgetStateToAdd value to the provided widgetStatesArray if it does not already exist.
    @param {array} widgetStatesArray
    @param {string} ezWidgetStateToAdd
    @returns {array}
    Returns the modified widgetStatesArray
 */
EzWidgetState.ezRemoveState = (widgetStatesArray, ezWidgetStateToRemove) => {
    if (!widgetStatesArray) {
        throw new Error(
            'A valid widgetStates array param is required to call EzWidgetState.ezRemoveState');
    }
    if (!ezWidgetStateToRemove) {
        throw new Error(
            'A valid ezWidgetStateToRemove EzWidgetState param is required to call EzWidgetState.ezRemoveState');
    }

    let ezWidgetState = ezWidgetStateToRemove;

    if (!widgetStatesArray.includes(ezWidgetState)) {
        // is not within the array
        return widgetStatesArray;
    }

    delete widgetStatesArray[widgetStatesArray.indexOf(ezWidgetState)];

    return widgetStatesArray;
};

export {
    EzWidgetState
};

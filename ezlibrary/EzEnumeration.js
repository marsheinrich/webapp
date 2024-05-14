import { EzInstanceState } from '/ezlibrary/EzInstanceState.js';

/**
    Base class to use for enumeration type classes
    @deprecated
    Stop all use, will get removed in a future release.
    Migrate to base class: /ezlibrary/enums/EzEnumeration2.js
 */
class EzEnumeration {
    /**
        @public
        Creates a new instance of EzEnumberation
     */
    constructor() {
        this.ready = false;
        this.ezTypeName = 'EzEnumeration';
        this.ezStates = [EzInstanceState.INITIALIZED];

        this.UNKNOWN = EzEnumeration.UNKNOWN;
        this._UNKNOWN = {
            display: this.UNKNOWN,
        };
    }
}
EzEnumeration.UNKNOWN = 'UNKNOWN';

export {
    EzEnumeration
};

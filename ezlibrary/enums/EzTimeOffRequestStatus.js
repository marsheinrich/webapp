/**
    @deprecated
    Migrate all use to: EzTimeOffStatus from '/ezlibrary/enums/EzEnumerations.js'
 */
export class EzTimeOffRequestStatus {
    /**
     @public @static @readonly @property
     Returns an array of enumeration property names
     @returns {array}
     */
    static get ezNames() {
        return [
            'ALL',
            'PENDING',
            'APPROVED',
            'DENIED'
        ];
    }

    static get ALL() {
        return 'ALL';
    }

    static get PENDING() {
        return 'PENDING';
    }

    static get APPROVED() {
        return 'APPROVED';
    }

    static get DENIED() {
        return 'DENIED';
    }

    static get CANCELED() {
        return 'CANCELED';
    }
}

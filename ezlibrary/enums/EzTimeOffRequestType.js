/**
    Javascript enum for TimeOffRequestType.java
 */
export class EzTimeOffRequestType {
    /**
     @public @static @readonly @property
     Returns an array of enumeration property names
     @returns {array}
     */
    static get ezNames() {
        return [
            'UNKNOWN',
            'UNPAID TIME OFF',
            'PAID PTO',
            'PAID SICK',
            'PAID HOLIDAY'
        ];
    }

    static get UNKNOWN() {
        return 'UNKNOWN';
    }

    static get UNPAID() {
        return 'UNPAID TIME OFF';
    }

    static get PTO() {
        return 'PAID PTO';
    }

    static get SICK() {
        return 'PAID SICK';
    }

    static get HOLIDAY() {
        return 'PAID HOLIDAY';
    }
}

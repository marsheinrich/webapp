/**
    Defines the possible modes for the Select Job Code dialog.
    Import with:
        import { EzSelectJobCodeDialogMode } from '/secure/widgets/EzSelectJobCodeDialog/EzSelectJobCodeDialogMode.js';
 */
export class EzSelectJobCodeDialogMode {
    /**
        @public @static @readonly @property
        Returns an array of enumeration property values
        @returns {array}
     */
    static get ezValues() {
        return [
            'EMPLOYEE_ASSIGNED_JOBS',
            'ALL_EMPLOYER_JOBS',
            'CUSTOM'
        ]
    }

    /**
        @public @static @readonly @property
        Returns an array of enumeration property names
        @returns {array}
     */
    static get ezNames() {
        return EzSelectJobCodeDialogMode.ezValues;
    }

    /**
        @public @static @readonly @property
        Returns the EMPLOYEE_ASSIGNED_JOBS value
     */
    static get EMPLOYEE_ASSIGNED_JOBS() {
        return EzSelectJobCodeDialogMode.ezValues[0];
    }

    /**
        @public @static @readonly @property
        Returns the ALL_EMPLOYER_JOBS value
     */
    static get ALL_EMPLOYER_JOBS() {
        return EzSelectJobCodeDialogMode.ezValues[1];
    }

    /**
        @public @static @readonly @property
        Returns the CUSTOM value.
        The CUSTOM dialog mode will require setting the dialog's title, select input label, and help.
     */
    static get CUSTOM() {
        return EzSelectJobCodeDialogMode.ezValues[2];
    }

    /**
        @public @static @method
        Returns the enumeration property value for the provided enumeration property name.
        If a match is not found, the default enumeration value of
        EzSelectJobCodeDialogMode.EMPLOYEE_ASSIGNED_JOBS is returned.
     */
    static ezValueOf(enumPropertyName) {
        let enumPropertyNameIndex = EzSelectJobCodeDialogMode.ezNames.indexOf(enumPropertyName);

        return -1 != enumPropertyNameIndex
            ? EzSelectJobCodeDialogMode.ezValues[enumPropertyNameIndex]
            : EzSelectJobCodeDialogMode.EMPLOYEE_ASSIGNED_JOBS;
    }
}

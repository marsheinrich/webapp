/*---------------------------------------------------------------------------------------------
! NOTE:
!
! This is an experimental class. Do not use this class in the application until this comment is
! removed.
!
---------------------------------------------------------------------------------------------*/

class EzEnumItem {
    /**
        @public
        Creates a new instance of EzEnum
     */
    constructor(enumName, enumValue) {
        this.name = enumName;
        this.value = enumValue;
    }

    #name = 'UNKNOWN';
    get name() {
        return this.#name;
    }

    #value = -1;
    get value() {
        return this.#value;
    }
}

export {
    EzEnumItem
};

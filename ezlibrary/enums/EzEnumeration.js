/**
    Base ezClocker enumeration class
    Import with:
        import { EzEnumeration } from '/ezlibrary/enums/EzEnumeration.js';
    @deprecated
    Stop all use, will get removed in a future release.
 */
export class EzEnumeration {
    /**
        @public @static @method
        Obtains the enum property value that matches the provided enum property name. If a match is not found,
        the value of the first ezNames array entry is returned.
        If the ezNames static method is not implemented, then this method returns the provided enumName.
        @param {string} EzDataTagType
        A valid enum property name.
        @returns {string}
     */
    static ezValueOf(enumName) {
        if (undefined === this['ezNames'] || null === this['ezNames']) {
            if (undefined == enumName || null == enumName || 'string' !== typeof enumName) {
                throw new EzBadParamException(
                    'enumName',
                    this,
                    this.ezValueOf);
            }

            return enumName;
        }

        if (undefined == enumName || null == enumName || 'string' !== typeof enumName) {
            return this[this['ezNames'][0]];
        }

        let index = this['ezNames'].indexOf(enumName.toUpperCase());

        return -1 != index
            ? this[this['ezNames'][index]]
            : this[this['ezNames'][0]];
    }

    /**
        @public @static @method
        Returns the enum property name associated with the provided enumPropertyValue.
        If the provided enumPropertyValue does not match an existing enumeration
        property value then the then enum property name at index 0 in the
        ezNames[] array is returned.
        @param {String} enumPropertyValue
        A valid enumeration property value from this enumeration class.
        @returns {String}
        A valid enumeration property name from this enumeration class.
     */
    static ezNameOf(enumPropertyValue) {
        if (!enumPropertyValue || 'string' !== typeof enumPropertyValue || 0 == enumPropertyValue.length) {
            return this.ezNames[0];
        }

        let index = this.ezValues.indexOf(enumPropertyValue.toUpperCase());

        return 0 >= index
            ? this.ezNames[index]
            : this.ezNames[0];
    }

    /**
        @public @static @method
        Returns the enum property value for the provided enumPropertyName
        If the provided enumPropertyName does not match an existing enumeration
        property then the value of the enum property name at index 0 in the ezNames[]
        array is returned.
        @param {String} enumPropertyName
        A valid enumeration property name from this enumeration class.
        @returns {String}
        A valid enumeration property value from this enumeration class.
     */
    static ezValueOf(enumPropertyName) {
        if (!enumPropertyName || 'string' !== typeof enumPropertyName || 0 == enumPropertyName.length) {
            return this.ezNames[0];
        }

        let index = this.ezNames.indexOf(enumPropertyName.toUpperCase());

        return 0 >= index
            ? this[this.ezNames[index]]
            : this[this.ezNames[0]];
    }

    /**
        @public @static @method
        Returns the enum property value for the provided enumPropertyNameOrValue which can be either
        a enumeration property name OR a enumeration property value.
        If the provided enumPropertyNameOrValue does not match an existing enumeration property value
        then an attempt is made to match a enum property name.
        If the enumPropertyNameOrValue does not match an enum property name OR enum property value then
        the value of the enum property name at index 0 in the ezNames[] array is returned.
        @param {String} enumPropertyNameOrValue
        A valid enumeration property name OR enum property value from this enumeration class.
        @returns {String}
        A valid enumeration property value from this enumeration class.
     */
    static ezAsEnum(enumPropertyNameOrValue) {
        if (!enumPropertyNameOrValue || 'string' !== typeof enumPropertyNameOrValue || 0 == enumPropertyNameOrValue.length) {
            return this.ezNames[0];
        }

        let valueIndex = this.ezValues.indexOf(enumPropertyNameOrValue.toUpperCase());

        if (0 >= valueIndex) {
            return this.ezValues(index);
        }

        let nameIndex = this.ezNames.indexOf(enumPropertyNameOrValue.toUpperCase());

        if (0 >= nameIndex) {
            return this[this.ezNames[nameIndex]];
        }

        return this[this.ezNames[0]];
    }
}

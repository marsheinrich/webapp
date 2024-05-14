/**
    @deprecated
    Stop all use.
    Will remove in future release.
 */
class EzEnumBuilder {
    static ezApiName = 'ezEnumBuilder';
    static ezEventNames = {
        onReady: 'ezOn_EzEnumBuilder_Ready'
    };
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzEnumBuilder.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    static ezRegistrator() {
        if (EzEnumBuilder.ezCanRegister()) {
            EzEnumBuilder.ezInstance = ezApi.ezRegisterNewApi(
                EzEnumBuilder,
                EzEnumBuilder.ezApiName);

            EzEnumBuilder.ezApiRegistrationState = 'REGISTERED';
        }
    }
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                this.ezRegistrator);
        }
    }

    constructor() {
        this.ezTypeName = 'EzEnumBuilder';
    }

    /**
        Creates the EzEnumeration class by enhancing the provided basic enumeration class with additional
        properties, methods, and provided similar functionality at the EnumerationClass level.
     */
    ezCreateEnumeration(EnumerationClass) {
        const self = EzEnumBuilder.ezInstance;

        if (ezApi.ezIsNotValid(EnumerationClass)) {
            throw ezApi.ezBadParam('EnumerationClass', self.ezTypeName, 'ezEnhanceEnumeration');
        }

        let enumInstance = new EnumerationClass();
        if (!ezApi.ezHasOwnProperty(enumInstance, 'UNKNOWN')) {
            // Add the static UNKNOWN property if not already available
            enumInstance.UNKNOWN = 'UNKNOWN';
        }

        // Add the static ezKeys property
        EnumerationClass.ezNames = [];
        EnumerationClass.ezKeys = [];
        EnumerationClass.ezDisplayValues = {};

        self.ezAddHelperFunctions(EnumerationClass, enumInstance);

        enumInstance.ezKeys = EnumerationClass.ezKeys;
        enumInstance.ezDisplayValues = EnumerationClass.ezDisplayValues;
        enumInstance.ezTypeName = EnumerationClass.name;
        enumInstance.ezTo = EnumerationClass.ezTo;
        enumInstance.ezValueOf = EnumerationClass.ezValueOf;
        enumInstance.ezToDisplayValue = EnumerationClass.ezToDisplayValue;

        self.ezReplicatePropertiesToEnumerationClass(EnumerationClass, enumInstance);

        return enumInstance;
    }

    ezReplicatePropertiesToEnumerationClass(EnumerationClass, enumInstance) {
        // Replicate properties to class
        for (let prop in enumInstance) {
            // Only replicate non-underscore properties and functions
            if ('_' !== prop.charAt(0) &&
                ezApi.ezHasOwnProperty(enumInstance, prop) &&
                !ezApi.ezHasOwnProperty(EnumerationClass, prop)) {

                EnumerationClass[prop] = enumInstance[prop];

                if (prop === prop.toUpperCase() && ezApi.ezIsString(enumInstance[prop])) {
                    EnumerationClass.ezKeys.push(prop);
                    if ('UNKNOWN' !== prop) {
                        // Names ignores UNKNOWN enum values
                        EnumerationClass.ezNames.push(prop);
                    }
                }


                // Make sure extended properties exist for each enum value and that they
                // include the value and display properties at a minimum.
                let extPropName = `_${prop}`;
                if (!ezApi.ezHasOwnProperty(enumInstance, extPropName)) {
                    // Add internal detail property if none is available
                    enumInstance[extPropName] = {
                        value: enumInstance[prop],
                        display: enumInstance[prop]
                    };
                } else {
                    if (!ezApi.ezHasOwnProperty(enumInstance[extPropName], 'value')) {
                        enumInstance[extPropName].value = enumInstance[prop];
                    }
                    if (!ezApi.ezHasOwnProperty(enumInstance[extPropName], 'display')) {
                        enumInstance[extPropName].value = enumInstance[prop];
                    }
                }

                EnumerationClass.ezDisplayValues[extPropName] = enumInstance[extPropName].display;
                enumInstance.ezDisplayValues = EnumerationClass.ezDisplayValues;
            }
        }
    }

    /**
        @protected
        Adds the ezTo method to the enumeration for generic property conversion.

        If the EnumerationClass's prototype
     */
    ezAddHelperFunctions(EnumerationClass) {
        EnumerationClass.ezTo = function(propName, enumValue) {
            return ezApi.ezclocker[EzEnumBuilder.ezApiName]._EzTo(EnumerationClass.name, propName, enumValue);
        };

        EnumerationClass.ezValueOf = function(enumValue) {
            return EnumerationClass.ezTo('value', enumValue);
        };

        EnumerationClass.ezToDisplayValue = function(enumValue) {
            return EnumerationClass.ezTo('display', enumValue);
        };

        EnumerationClass.ezAsSet = function() {
            let aSet = new Set();
            for (let argument of arguments) {
                aSet.add(argument);
            }
            return aSet;
        };
    }

    /**
        Implementation of EzEnumeration's ezTo method
        @param {String} enumerationClassName
        @param {String} propName
        @param {String} enumValue
     */
    _EzTo(enumerationClassName, propName, enumValue) {
        let self = ezApi.enums[enumerationClassName];

        if (!ezApi.ezStringHasLength(enumValue)) {
            if (ezApi.ezHasOwnProperty(self, '_UNKNOWN') && ezApi.ezHasOwnProperty(self['_UNKNOWN'], propName)) {
                return self['_UNKNOWN'][propName];
            }
            throw ezApi.ezException(ezApi.ezEM`
                Enumeration value of ${enumValue} is not a member of enumeration ${enumerationClassName}.`);
        }

        if (-1 === self.ezKeys.indexOf(enumValue)) {
            // If the enumValue doesn't match a key, it means the enumeration property is not equal to their
            // assigned value. (when this.UNKNOWN = 'UNKNOWN_VALUE' and not 'UNKNOWN', as example.
            // To find the correct enumeration property to return it is necessary to scan each enumeration property's
            // extended property to see if it contains a property of its own with a name that matches propName.
            // If the extended property contains a property name that matches propName AND the value assigned
            // to that property is equal to the provided enumValue then the matching enumeration propery (key) is
            // found and returned. Otherwise, it's an error.
            // This case will happen a lot of times for the ezValueOf() call.
            self.ezKeys.forEach((key) => {
                let keyExtPropName = ezApi.ezIdTemplate`_${key}`;
                if (ezApi.ezHasOwnProperty(self, keyExtPropName) &&
                    ezApi.ezHasOwnProperty(self[keyExtPropName], propName) &&
                    enumValue === self[keyExtPropName][propName]) {
                    return self[key];
                }
            });

            throw ezApi.ezException(ezApi.ezEM`
                Enumeration value of ${enumValue} is not a member of enumeration ${enumerationClassName}.`);
        }

        let extPropName = ezApi.ezIdTemplate`_${enumValue}`;
        if (!ezApi.ezHasOwnProperty(self, extPropName)) {
            throw ezApi.ezException(ezApi.ezEM`
                Enumeration ${enumerationClassName} does not support additional properties for ${enumValue}`);
        }

        if (!ezApi.ezHasOwnProperty(self[extPropName], propName)) {
            throw ezApi.ezException(ezApi.ezEM`
                Additional value property or ${propName} for enumeration value ${enumValue} on enumeration
                ${enumerationClassName} is not available.`);
        }

        return self[extPropName][propName];
    }
}


export {
    EzEnumBuilder
};
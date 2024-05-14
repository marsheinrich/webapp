import { EzEnum } from '/ezlibrary/enums/EzEnum.js';

/**
    @deprecated
    Stop all use, migrate to using Javascrpt getter/setter in classes
    Will remove in future release.
    @public
    Creates a new instance of EzSetterRequirement enumeration.
    Note: Access the enumeration from EzPrimitiveType. Avoid creating a new instance yourself.
    @returns {EzSetterRequirement}
 */
class EzSetterRequirement extends EzEnum {
    static get PROP_CLONE_DEFAULT_VALUE() {
        return 'PROP_CLONE_DEFAULT_VALUE';
    }
    static get ALLOW_NULL() {
        return 'ALLOW_NULL';
    }
    static get ALLOW_NAN() {
        return 'ALLOW_NAN';
    }
    static get ALLOW_UNDEFINED() {
        return 'ALLOW_UNDEFINED';
    }
    static get ALLOW_ANY_TYPE() {
        return 'ALLOW_ANY_TYPE';
    }

    static ezAsSet() {
        let set = new Set();

        for (let x = 1; x < arguments.length; x++) {
            set.add(arguments[x]);
        }

        return set;
    }

    static ezApiName = 'EzSetterRequirement';
    static ezEventNames = {
        onReady: 'ezOn_EzSetterRequirement_Ready'
    };
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzSetterRequirement.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    static ezRegistrator() {
        if (EzSetterRequirement.ezCanRegister()) {
            EzSetterRequirement.ezInstance = ezApi.ezRegisterEnumeration(EzSetterRequirement);

            EzSetterRequirement.ezApiRegistrationState = 'REGISTERED';
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

/**
    @deprecated
    Stop all use, migrate to using Javascrpt getter/setter in classes
    Will remove in future release.
 */
class EzSetterType extends EzEnum {
    static get string() {
        return 'string';
    }
    static get number() {
        return 'number';
    }
    static get boolean() {
        return 'boolean';
    }
    static get object() {
        return 'object';
    }
    static get String() {
        return 'String';
    }
    static get Boolean() {
        return 'String';
    }
    static getNumber() {
        return 'String';
    }

    static ezApiName = 'EzSetterType';
    static ezEventNames = {
        onReady: 'ezOn_EzSetterType_Ready'
    };
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzSetterType.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    static ezRegistrator() {
        if (EzSetterType.ezCanRegister()) {
            EzSetterType.ezInstance = ezApi.ezRegisterEnumeration(EzSetterType);

            EzSetterType.ezApiRegistrationState = 'REGISTERED';
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

    /**
        @public @constructor
        Creates a new instance of the EzSetterType enumeration.
     */
    constructor() {
        super();
    }
}

/**
    @deprecated
    Stop all use, migrate to using Javascrpt getter/setter in classes
    Will remove in future release.
 */
class EzGetterSetter {
    /**
        @public @constructor
        Creates a new instance of the EzGetterSetter Get/Set propery helper class
        @param {Object} parentRef
        @param {String} parentStoragePropName
        @param {Constructor|Class|String} propClazz
        @param {*|null} initialValue
        @param {*|null} setterDefaultValue
        @param {Set|null} setterRequirements
        @returns {EzGetterSetter}
     */
    constructor(parentRef, parentStoragePropName, propType, initialValue, setterDefaultValue, setterRequirements) {
        if (ezApi.ezIsNotValid(parentRef)) {
            throw new Error('A valid parentRef param is required to create a new EzGetterSetter instance.');
        }
        if (ezApi.ezIsEmptyString(parentStoragePropName)) {
            throw new Error('A valid parentStoragePropName param is required. The named property must exist on the parentRef object.');
        }
        if (!ezApi.ezIsFunction(propType) && !ezApi.ezIsString(propType)) {
            throw new Error('The propTypeConstructor param must be a constructor function or a string typeof reference.');
        }

        this._parent = parentRef;
        this._parentName = parentRef.constructor.name;
        this._parentStoragePropName = parentStoragePropName;
        this._propType = propType;
        this._onPropertyChangedEventName = 'onEz' + this._parentName + this._parentStoragePropName + 'Changed';
        this._parent[this._parentStoragePropName] = initialValue;
        this._setterDefaultValue = setterDefaultValue;
        this._setterRequirements = ezApi.ezIsSet(setterRequirements)
            ? setterRequirements
            : new Set(['allowNull']);

        /**
         * @public
         * Creates a default value instance from the propTypeConstructor provided.
         */
        this._createDefaultFromPropTypeConstructor = function() {
            let self = this;

            try {
                if (ezApi.ezIsString(self._propType)) {
                    switch (self._propType) {
                        case EzSetterType.string:
                            return '';
                        case EzSetterType.st.number:
                            return NaN;
                        case EzSetterType.st.boolean:
                            return false;
                        case EzSetterType.st.object:
                            return {};
                        default:
                            ezApi.ezclocker.logger.error('Primitive property type "' + self._propType +
                                '" for getter/setter is not supported.');
                            return null;
                    }
                }
                let constructorName = self._propTypeConstructor.name;
                switch (constructorName) {
                    case EzSetterType.st.String:
                        return String();
                    case EzSetterType.st.Number:
                        return Number(0);
                    case EzSetterType.st.Boolean:
                        return Boolean(0);
                    default:
                        return new self._propTypeConstructor();
                }
            } catch (err) {
                ezApi.ezclocker.logger.error('The provided property type "' + self._propType +
                    ' for a getter/setter property is NOT supported. Error: ' + ezApi.ezToJson(err, 2));
                return null;
            }
        };

        if (ezApi.ezIsNotValid(this._setterDefaultValue)) {
            // Determine a default value to use
            if (ezApi.ezIsEmptySet(this._setterRequirements)) {
                this._setterDefaultValue = null;
            } else if (this._setterRequirements.has('allowNAN')) {
                this._setterDefaultValue = NaN;
            } else if (this._setterRequirements.has('allowNull')) {
                this._setterDefaultValue = null;
            } else if (this._setterRequirements.has('allowUndefined')) {
                this._setterDefaultValue = undefined;
            } else {
                this._setterDefaultValue = this._createDefaultFromPropTypeConstructor();
            }
        }

        /**
         * @private
         * Helps make sure default 'objects' are propCloned instead of simply assigned.
         *
         * @returns {*}
         */
        this._processSetterDefaultValue = function() {
            if (this._setterRequirements.has('propCloneDefault')) {
                return ezApi.ezIsObject(this._setterDefaultValue)
                    ? ezApi.ezPropClone(this._setterDefaultValue)
                    : this._setterDefaultValue;
            }

            return this._setterDefaultValue;
        };

        /**
         * @public
         * Gets the value of the property
         */
        this.get = function() {
            return this._parent[this._parentStoragePropName];
        };

        /**
         * @public
         * Sets the value of the property. Returns the value that was set.
         *
         * @param {*} setValue
         *
         * @returns {*}
         */
        this.set = function(setValue) {
            if (this._setterRequirements.has('allowNull') && null === setValue) {
                this._parent[this._parentStoragePropName] = setValue;
            } else if (this._setterRequirements.has('allowUndefined') && undefined === setValue) {
                this._parent[this._parentStoragePropName] = setValue;
            } else {
                if ((ezApi.ezIsString(this._propType) && this._propType === typeof setValue) ||
                    (ezApi.ezInstanceOf(setValue, this._propType))) {
                    this._parent[this._parentStoragePropName] = setValue;
                } else {
                    ezApi.ezclocker.logger.error('The value provided to the setter for "' +
                        this._parent.constructor.name + '.' + this._parentStoragePropName +
                        '" is not valid for the property type.');
                    this._parent[this._parentStoragePropName] = this._processSetterDefaultValue();
                }
            }

            document.dispatchEvent(new CustomEvent(this._onPropertyChangedEventName, {
                bubbles: true,
                detail: {
                    propOwner: this._parent,
                    propName: this._parentStoragePropName,
                    propValue: this._parent[this._parentStoragePropName]
                }
            }));
            return this._parent[this._parentStoragePropName];
        };

    }
}

export {
    EzSetterRequirement,
    EzSetterType,
    EzGetterSetter
};
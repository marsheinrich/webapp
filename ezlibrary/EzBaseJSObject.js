class EzBaseJSObject {
    constructor() {
        this.addProperty = (propertyName, initialValue, getterFunction, setterFunction) => {
            if (!propertyName || 'string' !== typeof propertyName || 0 == propertyName.length) {
                throw Error('A valid propertyName string is required to add a new property to this object.');
            }

            this['ez' + propertyName] = initialValue || null;

            if (getterFunction && 'function' === typeof getterFunction) {
                this['ezGet' + propertyName] = getterFunction;
            }

            if (setterFunction && 'function' === typeof setterFunction) {
                this['esSet' + propertyName] = setterFunction;
            }
        };

        this.addProperty = (propertyName, initialValue) => {
            this.addProperty(
                propertyName,
                initialValue,
                () => {
                    return this[propertyName];
                },
                (aValue) => {
                    this[propertyName] = aValue;
                });
        };
    }
}

export {
    EzBaseJSObject
};
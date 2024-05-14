/**
    Provides storage for key-value pairs. Duplicate property names overwrite eachother.
 */
class EzHeaderProperties {
    constructor() {
        this.ezTypeName = 'EzHeaderProperties';
        this.ezPropNames = [];
        this.ezPropValues = [];
    }

    /**
        Returns an array of property entries. Eache property name and property value pair return using the following
        object:
        {
            propName: ${prop_name},
            propValue: ${prop_value}
        }
        @returns {Array}
     */
    ezGetPropEntries() {
        let entries = [];
        this.propNames.forEach((propName) => {
            entries.push({
                propName: propName,
                propValue: this.ezGet(propName)
            });
        });

        return entries;
    }

    /**
        Returns a copy of the stored property names
        @returns {Array}
     */
    ezGetPropNames() {
        return [...this.ezPropNames];
    }

    /**
        Returns a copy of the stored prop values.
        @returns {Array}
     */
    ezGetPropValues() {
        return [...this.ezPropValues];
    }

    /**
        @public
        Determines if the provided propName exists in the EzHeaderProperties storage.
        @param {String} propName
        @returns {Boolean}
     */
    ezContaines(propName) {
        if (!ezApi.ezStringHasLength(propName)) {
            throw ezApi.ezBadParam('propName', this.ezTypeName, 'ezPropNameExists');
        }

        return -1 !== this.ezPropNames.indexOf(propName);
    }

    /**
        @public
        Stores the provided propName and propValue pair. Overwites any existing values with the same
        propName value.
        @param {String} propName
        @param {*|null} propValue
     */
    ezPut(propName, propValue) {
        if (!ezApi.ezStringHasLength(propName)) {
            throw ezApi.ezBadParam('propName', this.ezTypeName, 'ezAdd');
        }

        let index = this.ezPropNames.indexOf(propName);
        if (-1 === index) {
            this.ezPropNames.push(propName);
            this.ezPropValues.push(ezApi.ezAssignOrDefault(propValue, ''));
        } else {
            this.ezPropValues[index] = ezApi.ezAssignOrDefault(propValue, '');
        }
    }

    /**
        @public
        Gets the value associated with the provided propName. Returns null if the propName does not exist.
        @param {String} propName
        @returns {*|null}
     */
    ezGet(propName) {
        if (!ezApi.ezStringHasLength(propName)) {
            throw ezApi.ezBadParam('propName', this.ezTypeName, 'ezGet');
        }

        let index = this.ezPropNames.indexOf(propName);
        return -1 !== index
            ? this.ezPropValues[index]
            : null;
    }

    /**
        @public
        Removes the stored key/value associated with the provided propName.
        @param {String} propName
        @returns {*|null}
     */
    ezRemove(propName) {
        if (!ezApi.ezStringHasLength(propName)) {
            throw ezApi.ezBadParam('propName', this.ezTypeName, 'ezRemove');
        }

        let index = this.ezPropNames.indexOf(propName);
        if (-1 !== index) {
            delete this.ezPropValues[index];
            delete this.ezPropValues[index];
        }
    }

    /**
        @public
        Removes all the stored key/values
     */
    ezClear() {
        this.ezPropNames = [];
        this.ezPropValues = [];
    }

    /**
        @public
        Determines if the EzHeaderProperties is empty or not
     */
    ezIsEmpty() {
        return ezApi.ezArrayHasLength(this.ezPropNames);
    }

    /**
        @public
        Returns the number of properties stored in the EzHeaderProperties
        @returns {Number}
     */
    ezSize() {
        return this.ezPropNames.length;
    }
}

export {
    EzHeaderProperties
};
/**
    @deprecated
    Stop all use
    Will remove in future release.
 */
class EzGetter {
    /**
        @public
        Creates a new instance of the EzGetterSetter Get/Set propery helper class
        @param {Object} parentRef
        @param {String} parentStoragePropName
     */
    constructor(parentRef, parentStoragePropName) {

        if (ezApi.ezIsNotValid(parentRef)) {
            throw new Error('A valid parentRef param is required to create a new EzGetterSetter instance.');
        }
        if (ezApi.ezIsEmptyString(parentStoragePropName)) {
            throw new Error('A valid parentStoragePropName param is required. The named property must exist on the parentRef object.');
        }

        this._parent = parentRef;
        this._parentName = parentRef.constructor.name;
        this._parentStoragePropName = parentStoragePropName;
        this._onPropertyChangedEventName = 'onEz' + this._parentName + this._parentStoragePropName + 'Changed';

        /**
         * @public
         * Gets the value of the property
         */
        this.get = function() {
            return this._parent[this._parentStoragePropName];
        };
    }
}

export {
    EzGetter
};
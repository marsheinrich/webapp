import { EzBadParamException } from '/ezlibrary/exceptions/EzExceptions.js';
import { EzBadStateException } from '/ezlibrary/exceptions/EzBadStateException.js';

import { EzObject } from '/ezlibrary/helpers/EzObject.js';
import { EzNumber } from '/ezlibrary/helpers/EzNumber.js';

import { EzStaticClass } from '/ezlibrary/EzStaticClass.js';


/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ENGINEERING NOTES
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    !! DO NOT IMPORT THE FOLLOWING INTO THIS CLASS !!
    -----------------------------------------------------------------
    import { EzApi } from '/public/common/javascript/ezapi.js';
    import { EzUI } from '/public/common/javascript/ezui.js';
    import { ezUI } from '/public/common/javascript/ezui.js';
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

/**
 * @class
 * @extends {EzStaticClass}
 * @description
 * Static class that provides utility methods and properties for arrays
 * >>> WOOT: Does not require EzApi <<<
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzArray } from '/ezlibrary/helpers/EzArray.js';
 * ---------------------------------------------------------------------------
 */
export class EzArray extends EzStaticClass {
    /**
     * @static
     * @public @readonly @property
     * Returns an empty array
     * @returns {array}
     */
    static get EMPTY() {
        return Array.from([]);
    }

    /**
     * @static
     * @public @method
     * Determines if the provided JS function 'arguments' reference is valid and has a length.
     * @param {arguments} argumentsRef
     * @returns {boolean}
     */
    static argumentsHasLength(argumentsRef) {
        return argumentsRef?.length && 0 != argumentsRef.length;
    }

    /**
     * @public @method
     * Returns true if the provided index is within the provided array.
     * Returns false otherwise.
     * @param {number} index
     * @param {array} array
     * @returns {boolean}
     */
    static isIndexInRange(index, array) {
        if (!EzNumber.isNumber(index)) {
            throw new EzBadParamException(
                'index',
                EzArray,
                EzArray.indexInRange);
        }
        if (!EzArray.isArray(array)) {
            throw new EzBadParamException(
                'array',
                EzArray,
                EzArray.indexInRange);
        }

        return index >= 0 && index < array.length;
    }

    /**
     * @static
     * @public @method
     * Determines if the passed aArray is not undefined, not null, and has a length greater than zero
     * @param {*|array} value
     * @returns {boolean}
     */
    static arrayHasLength(value) {
        return EzArray.hasLength(value);
    }

    /**
     * @static
     * @public @method
     * Determines if the passed aArray is not undefined, not null, and has a length greater than zero
     * @param {*|array} value
     * @returns {boolean}
     */
    static hasLength(value) {
        return undefined !== value && null !== value &&
            '[object Array]' === EzObject.getObjectType(value) && 0 !== value.length;
    }

    /**
     * @static
     * @public @method
     * Determines if the passed object is an array or not.
     * @param {*|array} value
     * @returns {boolean}
     */
    static isArray(value) {
        return undefined !== value && null !== value && '[object Array]' === EzObject.getObjectType(value);
    }

    /**
     * @static
     * @public @method
     * If the provided value is an array then the value is returned.
     * Otherwise an empty array is returned.
     * @param {*|array} value
     * @returns {array}
     */
    static arrayOrEmpty(value) {
        return undefined !== value && null !== value && '[object Array]' === EzObject.getObjectType(value)
            ? value
            : EzArray.EMPTY;
    }

    /**
     * @static
     * @public @method
     * If the provided value is an array, then the value is returned.
     * Otherwise, null is returned.
     * @param {*|array} value
     * @returns {null}
     */
    static arrayOrNull(value) {
        return undefined !== value && null !== value && '[object Array]' === EzObject.getObjectType(value)
            ? value
            : null;
    }

    /**
     * @static
     * @public @metghod
     * Returns the provided array if it has a length > 0
     * Otherwise returns null.
     * @param {undefined|null|array} value
     * @returns {null|array}
     *
     */
    static arrayWithLengthOrNull(value = null) {
        return EzArray.hasLength(value)
            ? value
            : null;
    }

    /**
     * @static
     * @public @method
     * If the provided value is an array, the value is returned.
     * Otherwise, the defaultValue is returned.
     * @param {*|array} value
     * @param {*} defaultValue
     * @returns {array}
     */
    static arrayOrDefault(value, defaultValue) {
        return undefined !== value && null !== value && '[object Array]' === EzObject.getObjectType(value)
            ? value
            : defaultValue;
    }

    /**
     * @static
     * @public @method
     * Creates a new array and appends in order the provided array parameters
     * Non-array parameters get ignored.
     * Example:
     *      EzArray.merge([1,2,3], [4, 5, 6]);
     *      Result: [1,2,3,4,5,6];
     * @returns {array}
     */
    static merge() {
        if (!arguments || 0 == arguments.length) {
            return EzArray.EMPTY;
        }

        let newArray = EzArray.EMPTY;

        for (let aArray of arguments) {
            if (EzArray.isArray(aArray) && EzArray.hasLength(aArray)) {
                newArray = [
                    ...newArray,
                    ...aArray
                ];
            }
        }

        return newArray;
    }

    /**
     * @static
     * @public @method
     * Removes all items in the array that match valueToRemove.
     * @param {array} array
     * @param {*} valueToRemove
     * @returns {array}
     */
    static removeAll(aArray, valueToRemove) {
        if (!EzArray.arrayHasLength(aArray)) {
            return aArray;
        }

        return aArray.filter((aValue) => aValue != valueToRemove);
    }

    /**
     * @static
     * @public @method
     * Removes the first item in the array that matches the provided valueToRemove.
     * @param {array} array
     * @param {*} valueToRemove
     * If valueToRemove is not within the array, then the array is returned as provided.
     * Default: null
     * @returns {array}
     */
    static removeFirst(aArray, valueToRemove = null) {
        if (!EzArray.isArray(aArray)) {
            throw new EzBadParamException(
                'aArray',
                EzArray,
                EzArray.removeFirst);
        }

        let valueIndex = aArray.indexOf(valueToRemove);

        return 0 <= valueIndex
            ? EzArray.removeAtIndex(aArray, valueIndex)
            : aArray;
    }

    /**
     * @static
     * @public @method
     * Removes the items in the array at the provided indexToRemove
     * @param {array} array
     * @param {number} indexToRemove
     * @returns {array}
     */
    static removeAtIndex(aArray, indexToRemove) {
        if (!EzArray.isArray(aArray)) {
            throw new EzBadParamException(
                'aArray',
                EzArray,
                EzArray.removeAtIndex);
        }
        if (!EzNumber.isNumber(indexToRemove)) {
            throw new EzBadParamException(
                'indexToRemove',
                EzArray,
                EzArray.removeAtIndex);
        }

        if (0 > indexToRemove || indexToRemove >= aArray.length) {
            throw new EzBadStateException(
                `Expected the provided indexToRemove param greater than zero and less than the provided array's length of ${aArray.length}`,
                `The provided indexToRemove param is out of range for the provided array with length ${aArray.length}`,
                EzArray,
                EzArray.removeAtIndex);
        }

        let left = [...aArray];

        let right = [...aArray];

        return 0 == indexToRemove
            ? left.splice(1)
            : [
                ...left.splice(0, indexToRemove),
                ...right.splice(indexToRemove + 1)
            ];
    }

    /**
     * @static
     * @public @method
     * Creates a new array from the provided sourceArray.
     * If the sourceArray is undefined, null, or empty then an empty array is returned
     * @param {undefined|null|array} sourceArray
     * Default: []
     * @returns {array}
     */
    static createFrom(sourceArray = []) {
        if (!EzArray.hasLength(sourceArray)) {
            return EzArray.EMPTY;
        }

        return [...sourceArray];
    }

    /**
     * @static
     * @public @method
     * Sorts the provided aArray by calling it's sort method (Array.sort) and passing along
     * the optional compareFunction. If the compareFunction is not provided, then the aArray.sort()
     * is called without a compareFunction (to perform the default sorting).
     * If the array is undefined, nul then an empty array is returned.
     * For more information see:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Compare Function Example:
     *  function compare(itemA, itemB) {
     *      // Return 0 if on of the following is true:
     *      //      1) ItemA and itemB are undefined or null.
     *      //         Example result: [itemA, itemB]
     *      //      2) ItemA and itemB are not undefined or null and itemA equals itemB
     *      //         Example result: [itemA, itemB]
     *      if ((!itemA && !itemB) || (itemA && itemB && itemA === itemB) {
     *          return 0;
     *      }
     *
     *      return !itemA || (itemB && itemA > itemB)) {
     *          // Return 1 if one of the following is true:
     *          //  1) ItemA IS undefined or null and itemB is not undefined or null.
     *          //  2) ItemA AND AND itemB is not undefined or null AND itemA IS GREATER THAN itemB.
     *          //     Example result: [itemB, itemA]
     *          ? 1
     *          // Return -1 if one of the following is true:
     *          //  1) ItemA IS NOT undefined or null AND itemB IS undefined or null.
     *          //  2) ItemA AND itemB IS NOT undefined or null AND itemB IS GREATER THAN itemA.
     *          //     Example result: [itemA, itemB]
     *          : -1;
     *  }
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Example call to EzArray.sort:
     *      EzArray.sort([1, 2, 0], compareFunction);
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * @param {undefined|null|array} aArray
     * @param {undefined|null|function} compareFunction
     * @returns {array}
     */
    static sort(aArray, compareFunction) {
        if (!EzArray.isArray(aArray)) {
            return [];
        }

        if (!EzArray.hasLength(aArray)) {
            return aArray;
        }

        return compareFunction && 'function' === typeof compareFunction
            ? aArray.sort(compareFunction)
            : aArray.sort();
    }

    /**
     * Sorty an array of entity instances by the id value (assumed as a Long)
     * for the entity's property named as the provided entityIdPropertyName.
     * Example:
     *  let entityA = {employerId: 300};
     *  let entityB = {employerId: 200};
     *  let aArray = [entityA, entityB];
     *
     *  A call such as: EzArray.sortEntityId(aArray, 'employerId') will perform the following compare:
     *      entityA['employerId'] - entityB['employerId']
     *
     * And the result array is: [entityB, entityA]
     */
    static sortEntityId(aArray, entityIdPropertyName) {
        if (!EzArray.isArray(aArray)) {
            return [];
        }

        if (!EzArray.hasLength(aArray)) {
            return aArray;
        }

        return EzArray.sort(
            aArray,
            (entityA, entityB) => {
                if (!entityA && !entityB) {
                    return 0;
                }

                if (!entityA) {
                    return 1;
                }

                if (!entityB) {
                    return -1;
                }

                if (!Object.hasOwn(entityA, entityIdPropertyName) && !Object.hasOwn(entityB, entityIdPropertyName)) {
                    return 0;
                }

                if (!Object.hasOwn(entityA, entityIdPropertyName)) {
                    return 1;
                }

                if (!Object.hasOwn(entityB, entityIdPropertyName)) {
                    return 0;
                }

                return entityA[entityIdPropertyName] - entityB[entityIdPropertyName]
            });

    }
}

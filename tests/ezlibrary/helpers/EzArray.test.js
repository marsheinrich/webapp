import { EzArray } from '../../../ezlibrary/helpers/EzArray';

describe('EzArray', () => {
    describe('isIndexInRange', () => {
       test('should throw EzBadParamException if index is not a number', () => {
            const index = 'not a number';
            const array = [];
            expect(() => EzArray.isIndexInRange(index, array)).toThrow();
        });

       test('should throw EzBadParamException if array is not an array', () => {
            const index = 0;
            const array = 'not an array';
            expect(() => EzArray.isIndexInRange(index, array)).toThrow();
        });

       test('should return true if index is within the range of the array length', () => {
            const index = 2;
            const array = [1, 2, 3];
            expect(EzArray.isIndexInRange(index, array)).toBe(true);
        });

       test('should return false if index is less than 0', () => {
            const index = -1;
            const array = [1, 2, 3];
            expect(EzArray.isIndexInRange(index, array)).toBe(false);
        });

       test('should return false if index is greater than or equal to the array length', () => {
            const index = 3;
            const array = [1, 2, 3];
            expect(EzArray.isIndexInRange(index, array)).toBe(false);
        });
    });

    describe('hasLength', () => {
       test('should return false if the value is undefined', () => {
            const value = undefined;
            expect(EzArray.hasLength(value)).toBe(false);
        });

       test('should return false if the value is null', () => {
            const value = null;
            expect(EzArray.hasLength(value)).toBe(false);
        });

       test('should return false if the value is not an array', () => {
            const value = 123; // Not an array
            expect(EzArray.hasLength(value)).toBe(false);
        });

       test('should return false if the array has zero length', () => {
            const value = []; // Empty array
            expect(EzArray.hasLength(value)).toBe(false);
        });

       test('should return true if the array has non-zero length', () => {
            const value = [1, 2, 3]; // Array with elements
            expect(EzArray.hasLength(value)).toBe(true);
        });
    });
    describe('isArray', () => {
       test('should return false if the value is undefined', () => {
            const value = undefined;
            expect(EzArray.isArray(value)).toBe(false);
        });

       test('should return false if the value is null', () => {
            const value = null;
            expect(EzArray.isArray(value)).toBe(false);
        });

       test('should return false if the value is not an array', () => {
            const value = 123; // Not an array
            expect(EzArray.isArray(value)).toBe(false);
        });

       test('should return true if the value is an array', () => {
            const value = [1, 2, 3]; // Array
            expect(EzArray.isArray(value)).toBe(true);
        });

       test('should return true if the value is an empty array', () => {
            const value = []; // Empty array
            expect(EzArray.isArray(value)).toBe(true);
        });

       test('should return false if the value is an object', () => {
            const value = { key: 'value' }; // Object
            expect(EzArray.isArray(value)).toBe(false);
        });

       test('should return false if the value is a string', () => {
            const value = 'string'; // String
            expect(EzArray.isArray(value)).toBe(false);
        });
    });

    describe('arrayOrEmpty', () => {
       test('should return empty array if the value is undefined', () => {
            const value = undefined;
            expect(EzArray.arrayOrEmpty(value)).toEqual([]);
        });

       test('should return empty array if the value is null', () => {
            const value = null;
            expect(EzArray.arrayOrEmpty(value)).toEqual([]);
        });

       test('should return empty array if the value is not an array', () => {
            const value = 123; // Not an array
            expect(EzArray.arrayOrEmpty(value)).toEqual([]);
        });

       test('should return the original array if the value is an array', () => {
            const originalArray = [1, 2, 3];
            expect(EzArray.arrayOrEmpty(originalArray)).toEqual(originalArray);
        });

       test('should return the original empty array if the value is an empty array', () => {
            const emptyArray = [];
            expect(EzArray.arrayOrEmpty(emptyArray)).toEqual(emptyArray);
        });
    });
    describe('arrayOrNull', () => {
       test('should return null if the value is undefined', () => {
            const value = undefined;
            expect(EzArray.arrayOrNull(value)).toBe(null);
        });

       test('should return null if the value is null', () => {
            const value = null;
            expect(EzArray.arrayOrNull(value)).toBe(null);
        });

       test('should return null if the value is not an array', () => {
            const value = 123; // Not an array
            expect(EzArray.arrayOrNull(value)).toBe(null);
        });

       test('should return the original array if the value is an array', () => {
            const originalArray = [1, 2, 3];
            expect(EzArray.arrayOrNull(originalArray)).toEqual(originalArray);
        });

       test('should return empty array if the value is an empty array', () => {
            const emptyArray = [];
            expect(EzArray.arrayOrNull(emptyArray)).toBe(emptyArray);
        });
    });
    describe('arrayOrDefault', () => {
       test('should return defaultValue if the value is undefined', () => {
            const value = undefined;
            const defaultValue = [];
            expect(EzArray.arrayOrDefault(value, defaultValue)).toEqual(defaultValue);
        });

       test('should return defaultValue if the value is null', () => {
            const value = null;
            const defaultValue = [];
            expect(EzArray.arrayOrDefault(value, defaultValue)).toEqual(defaultValue);
        });

       test('should return defaultValue if the value is not an array', () => {
            const value = 123; // Not an array
            const defaultValue = [];
            expect(EzArray.arrayOrDefault(value, defaultValue)).toEqual(defaultValue);
        });

       test('should return the original array if the value is an array', () => {
            const originalArray = [1, 2, 3];
            const defaultValue = [];
            expect(EzArray.arrayOrDefault(originalArray, defaultValue)).toEqual(originalArray);
        });

       test('should return empty array if the value is an empty array', () => {
            const emptyArray = [];
            const defaultValue = [0];
            expect(EzArray.arrayOrDefault(emptyArray, defaultValue)).toEqual([]);
        });

       test('should return the defaultValue provided if no defaultValue is specified', () => {
            const value = undefined;
            expect(EzArray.arrayOrDefault(value)).toEqual(undefined);
        });
    });

    describe('merge', () => {
       test('should return an empty array if no arguments are provided', () => {
            expect(EzArray.merge()).toEqual([]);
        });

       test('should return an empty array if non-array arguments are provided', () => {
            expect(EzArray.merge(1, 'a', true)).toEqual([]);
        });

       test('should merge arrays provided as arguments', () => {
            expect(EzArray.merge([1, 2, 3], [4, 5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
        });

       test('should merge arrays while ignoring non-array parameters', () => {
            expect(EzArray.merge([1, 2, 3], 'a', true, [4, 5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
        });

       test('should handle empty arrays properly', () => {
            expect(EzArray.merge([], [1, 2], [], [3], [])).toEqual([1, 2, 3]);
        });
    });
    describe('removeAll', () => {
       test('should return an empty array if the input array is empty', () => {
            const array = [];
            const valueToRemove = 5;
            expect(EzArray.removeAll(array, valueToRemove)).toEqual([]);
        });

       test('should return the same array if the valueToRemove is not present', () => {
            const array = [1, 2, 3];
            const valueToRemove = 5;
            expect(EzArray.removeAll(array, valueToRemove)).toEqual(array);
        });

       test('should remove all instances of the valueToRemove from the array', () => {
            const array = [1, 2, 3, 4, 2, 5];
            const valueToRemove = 2;
            const expectedArray = [1, 3, 4, 5];
            expect(EzArray.removeAll(array, valueToRemove)).toEqual(expectedArray);
        });

       test('should remove all instances of the valueToRemove from the array, including duplicates', () => {
            const array = [2, 1, 2, 3, 4, 2, 5, 2];
            const valueToRemove = 2;
            const expectedArray = [1, 3, 4, 5];
            expect(EzArray.removeAll(array, valueToRemove)).toEqual(expectedArray);
        });

       test('should return the same array if the valueToRemove matches all elements in the array', () => {
            const array = [5, 5, 5];
            const valueToRemove = 5;
            expect(EzArray.removeAll(array, valueToRemove)).toEqual([]);
        });
    });
    describe('removeFirst', () => {
       test('should remove the first occurrence of the valueToRemove from the array', () => {
            const array = [1, 2, 3, 4, 5];
            const valueToRemove = 3;
            const expectedArray = [1, 2, 4, 5];
            expect(EzArray.removeFirst(array, valueToRemove)).toEqual(expectedArray);
        });

       test('should return the same array if the valueToRemove is not found', () => {
            const array = [1, 2, 3, 4, 5];
            const valueToRemove = 6; // Not in the array
            // Expect the method to return the same array when valueToRemove is not found
            expect(EzArray.removeFirst(array, valueToRemove)).toEqual(array);
        });

       test('should handle empty arrays', () => {
            const array = [];
            const valueToRemove = 1; // Not relevant in an empty array
           // Expect the method to return the same empty array when valueToRemove is not found
        expect(EzArray.removeFirst(array, valueToRemove)).toEqual(array);
        });

       test('should handle arrays with only one element', () => {
            const array = [1];
            const valueToRemove = 1; // Only element in the array
            expect(EzArray.removeFirst(array, valueToRemove)).toEqual([]);
        });

       test('should handle arrays with multiple occurrences of the valueToRemove', () => {
            const array = [1, 2, 3, 4, 3, 5];
            const valueToRemove = 3; // Multiple occurrences
            const expectedArray = [1, 2, 4, 3, 5]; // Only the first occurrence should be removed
            expect(EzArray.removeFirst(array, valueToRemove)).toEqual(expectedArray);
        });

       test('should handle arrays where the valueToRemove is the first element', () => {
            const array = [1, 2, 3];
            const valueToRemove = 1; // First element
            const expectedArray = [2, 3];
            expect(EzArray.removeFirst(array, valueToRemove)).toEqual(expectedArray);
        });
    });
    describe('removeAtIndex', () => {
       test('should remove the item at the specified index from the array', () => {
            const array = [1, 2, 3, 4, 5];
            const indexToRemove = 2;
            const expectedArray = [1, 2, 4, 5];
            expect(EzArray.removeAtIndex(array, indexToRemove)).toEqual(expectedArray);
        });

       test('should throw an error if the indexToRemove is out of range (negative)', () => {
            const array = [1, 2, 3, 4, 5];
            const indexToRemove = -1;
            expect(() => EzArray.removeAtIndex(array, indexToRemove)).toThrow();
        });

       test('should throw an error if the indexToRemove is out of range (greater than or equal to array length)', () => {
            const array = [1, 2, 3, 4, 5];
            const indexToRemove = 5;
            expect(() => EzArray.removeAtIndex(array, indexToRemove)).toThrow();
        });

       test('should handle removing the first item in the array', () => {
            const array = [1, 2, 3];
            const indexToRemove = 0;
            const expectedArray = [2, 3];
            expect(EzArray.removeAtIndex(array, indexToRemove)).toEqual(expectedArray);
        });

       test('should handle removing the last item in the array', () => {
            const array = [1, 2, 3];
            const indexToRemove = 2;
            const expectedArray = [1, 2];
            expect(EzArray.removeAtIndex(array, indexToRemove)).toEqual(expectedArray);
        });

       test('should handle arrays with only one element', () => {
            const array = [1];
            const indexToRemove = 0;
            expect(EzArray.removeAtIndex(array, indexToRemove)).toEqual([]);
        });
    });

    describe('createFrom', () => {
       test('should return an empty array if the sourceArray is undefined', () => {
            const sourceArray = undefined;
            expect(EzArray.createFrom(sourceArray)).toEqual([]);
        });

       test('should return an empty array if the sourceArray is null', () => {
            const sourceArray = null;
            expect(EzArray.createFrom(sourceArray)).toEqual([]);
        });

       test('should return an empty array if the sourceArray is empty', () => {
            const sourceArray = [];
            expect(EzArray.createFrom(sourceArray)).toEqual([]);
        });

       test('should create a new array from the provided sourceArray', () => {
            const sourceArray = [1, 2, 3];
            expect(EzArray.createFrom(sourceArray)).toEqual([1, 2, 3]);
        });
    });

    describe('sort', () => {
       test('should return an empty array if the input array is undefined', () => {
            const inputArray = undefined;
            expect(EzArray.sort(inputArray)).toEqual([]);
        });

       test('should return an empty array if the input array is null', () => {
            const inputArray = null;
            expect(EzArray.sort(inputArray)).toEqual([]);
        });

       test('should return the input array if it is already sorted', () => {
            const inputArray = [1, 2, 3];
            expect(EzArray.sort(inputArray)).toEqual([1, 2, 3]);
        });

       test('should return the sorted array in ascending order if no compareFunction is provided', () => {
            const inputArray = [3, 1, 2];
            expect(EzArray.sort(inputArray)).toEqual([1, 2, 3]);
        });

       test('should return the sorted array based on the provided compareFunction', () => {
            const inputArray = [3, 1, 2];
            const compareFunction = (a, b) => a - b;
            expect(EzArray.sort(inputArray, compareFunction)).toEqual([1, 2, 3]);
        });
    });
    describe('sortEntityId', () => {
       test('should sort the array of entity instances by the id value (Long) for the provided entityIdPropertyName', () => {
            const entityA = { employerId: 300 };
            const entityB = { employerId: 200 };
            const entityC = { employerId: 400 };
            const aArray = [entityA, entityB, entityC];
            const entityIdPropertyName = 'employerId';
            const expectedArray = [entityB, entityA, entityC]; // Sorted by employerId property
    
            expect(EzArray.sortEntityId(aArray, entityIdPropertyName)).toEqual(expectedArray);
        });
    
       test('should handle arrays with only one element', () => {
            const entityA = { employerId: 300 };
            const aArray = [entityA];
            const entityIdPropertyName = 'employerId';
    
            expect(EzArray.sortEntityId(aArray, entityIdPropertyName)).toEqual([entityA]);
        });
    
       test('should handle arrays where some entity instances have missing id properties', () => {
            const entityA = { employerId: 300 };
            const entityB = { employerId: 200 };
            const entityC = {}; // Missing employerId property
            const aArray = [entityA, entityB, entityC];
            const entityIdPropertyName = 'employerId';
            const expectedArray = [entityB, entityA, entityC]; // Missing property is treated as lower priority
    
            expect(EzArray.sortEntityId(aArray, entityIdPropertyName)).toEqual(expectedArray);
        });
    
       test('should handle arrays where all entity instances have missing id properties', () => {
            const entityA = {}; // Missing employerId property
            const entityB = {}; // Missing employerId property
            const aArray = [entityA, entityB];
            const entityIdPropertyName = 'employerId';
    
            expect(EzArray.sortEntityId(aArray, entityIdPropertyName)).toEqual(aArray); // No sorting needed
        });
    
       test('should handle empty arrays', () => {
            const aArray = [];
            const entityIdPropertyName = 'employerId';
    
            expect(EzArray.sortEntityId(aArray, entityIdPropertyName)).toEqual(aArray); // No sorting needed
        });
    });
});
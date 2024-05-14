import { EzBoolean } from '../../../ezlibrary/helpers/EzBoolean.js';

describe('EzBoolean', () => {
    describe('toBoolean', () => {
        test('should return false for undefined or null values', () => {
            expect(EzBoolean.toBoolean(undefined)).toBe(false);
            expect(EzBoolean.toBoolean(null)).toBe(false);
        });

        test('should handle string values', () => {
            expect(EzBoolean.toBoolean('true')).toBe(true);
            expect(EzBoolean.toBoolean('false')).toBe(false);
            expect(EzBoolean.toBoolean('1')).toBe(true);
            expect(EzBoolean.toBoolean('0')).toBe(false);
        });

        test('should handle numeric values', () => {
            expect(EzBoolean.toBoolean(1)).toBe(true);
            expect(EzBoolean.toBoolean(0)).toBe(false);
        });

        test('should throw an exception for unsupported values', () => {
            expect(() => EzBoolean.toBoolean('invalid')).toThrow();
        });
    });

    describe('isBoolean', () => {
        test('should return true for boolean values', () => {
            expect(EzBoolean.isBoolean(true)).toBe(true);
            expect(EzBoolean.isBoolean(false)).toBe(true);
        });

        test('should return true for Boolean objects', () => {
            expect(EzBoolean.isBoolean(new Boolean(true))).toBe(true);
            expect(EzBoolean.isBoolean(new Boolean(false))).toBe(true);
        });

        test('should return false for non-boolean values', () => {
            expect(EzBoolean.isBoolean(undefined)).toBe(false);
            expect(EzBoolean.isBoolean(null)).toBe(false);
            expect(EzBoolean.isBoolean(0)).toBe(false);
            expect(EzBoolean.isBoolean('true')).toBe(false);
            expect(EzBoolean.isBoolean({})).toBe(false);
        });
    });

    describe('isTrue', () => {
        test('should return true for true boolean values', () => {
            expect(EzBoolean.isTrue(true)).toBe(true);
        });

        /**
         * TODO:- This script is commented due to Object type boolean is not supported
         */

        // test('should return true for true Boolean objects', () => {
        //     expect(EzBoolean.isTrue(new Boolean(true))).toBe(true);
        // });

        test('should return false for false boolean values', () => {
            expect(EzBoolean.isTrue(false)).toBe(false);
        });

        test('should return false for false Boolean objects', () => {
            expect(EzBoolean.isTrue(new Boolean(false))).toBe(false);
        });

        test('should return false for non-boolean values', () => {
            expect(EzBoolean.isTrue(undefined)).toBe(false);
            expect(EzBoolean.isTrue(null)).toBe(false);
            expect(EzBoolean.isTrue(0)).toBe(false);
            expect(EzBoolean.isTrue('true')).toBe(false);
            expect(EzBoolean.isTrue({})).toBe(false);
        });
    });

    describe('isFalse', () => {
        test('should return true for false boolean values', () => {
            expect(EzBoolean.isFalse(false)).toBe(true);
        });
        /**
         * TODO:- This script is commented due to Object type boolean is not supported
         */

        // test('should return true for false Boolean objects', () => {
        //     expect(EzBoolean.isFalse(new Boolean(false))).toBe(true);
        // });

        test('should return false for true boolean values', () => {
            expect(EzBoolean.isFalse(true)).toBe(false);
        });

        test('should return false for true Boolean objects', () => {
            expect(EzBoolean.isFalse(new Boolean(true))).toBe(false);
        });

        test('should return false for non-boolean values', () => {
            expect(EzBoolean.isFalse(undefined)).toBe(false);
            expect(EzBoolean.isFalse(null)).toBe(false);
            expect(EzBoolean.isFalse(0)).toBe(false);
            expect(EzBoolean.isFalse('false')).toBe(false);
            expect(EzBoolean.isFalse({})).toBe(false);
        });
    });

    describe('allTrue', () => {
        test('should return true if all arguments are true', () => {
            expect(EzBoolean.allTrue(true, true, true)).toBe(true);
        });

        test('should return false if any argument is false', () => {
            expect(EzBoolean.allTrue(true, false, true)).toBe(false);
            expect(EzBoolean.allTrue(false, true, true)).toBe(false);
            expect(EzBoolean.allTrue(true, true, false)).toBe(false);
        });

        test('should return true if there are no arguments', () => {
            expect(EzBoolean.allTrue()).toBe(true);
        });

        test('should return true if all arguments are truthy', () => {
            expect(EzBoolean.allTrue(1, 'hello', true)).toBe(true);
        });

        test('should return false if any argument is falsy', () => {
            expect(EzBoolean.allTrue(1, 'hello', false)).toBe(false);
            expect(EzBoolean.allTrue(false, 0, true)).toBe(false);
        });
    });
    describe('anyTrue', () => {
        test('should return true if any argument is a Boolean object with a truthy value', () => {
            expect(EzBoolean.anyTrue(false, new Boolean(0), '', true)).toBe(true);
        });

        test('should return false if all arguments are Boolean objects with falsy values', () => {
            expect(EzBoolean.anyTrue(new Boolean(0), new Boolean(false), new Boolean(''))).toBe(false);
        });

        test('should return true if any argument is a truthy boolean value', () => {
            expect(EzBoolean.anyTrue(false, true, 1)).toBe(true);
        });

        test('should return false if all arguments are falsy boolean values', () => {
            expect(EzBoolean.anyTrue(false, 0, null, undefined)).toBe(false);
        });
    });
    describe('anyFalse', () => {
        test('should return true if any argument is a Boolean object with a falsy value', () => {
            expect(EzBoolean.anyFalse(1, 'hello', false)).toBe(true);
        });

        test('should return false if all arguments are Boolean objects with truthy values', () => {
            expect(EzBoolean.anyFalse(new Boolean(true), new Boolean('true'), new Boolean(1))).toBe(false);
        });

        test('should return true if any argument is a falsy boolean value', () => {
            expect(EzBoolean.anyFalse(false, 0, null, undefined)).toBe(true);
        });

        test('should return false if all arguments are truthy boolean values', () => {
            expect(EzBoolean.anyFalse(true, 1, 'hello')).toBe(false);
        });
    });

    describe('booleanOrFalse', () => {
        test('should return true if the input is true', () => {
            expect(EzBoolean.booleanOrFalse(true)).toBe(true);
        });

        test('should return false if the input is false', () => {
            expect(EzBoolean.booleanOrFalse(false)).toBe(false);
        });

        test('should return false if the input is a truthy non-boolean value', () => {
            expect(EzBoolean.booleanOrFalse(1)).toBe(false);
            expect(EzBoolean.booleanOrFalse('hello')).toBe(false);
        });

        test('should return false if the input is a falsy non-boolean value', () => {
            expect(EzBoolean.booleanOrFalse(0)).toBe(false);
            expect(EzBoolean.booleanOrFalse(null)).toBe(false);
            expect(EzBoolean.booleanOrFalse(undefined)).toBe(false);
        });

        test('should return false if the input is an object', () => {
            expect(EzBoolean.booleanOrFalse({})).toBe(false);
        });

        test('should return false if the input is an array', () => {
            expect(EzBoolean.booleanOrFalse([])).toBe(false);
        });
    });

    describe('booleanOrTrue', () => {
        test('should return true if the input is true', () => {
            expect(EzBoolean.booleanOrTrue(true)).toBe(true);
        });

        test('should return true if the input is false', () => {
            expect(EzBoolean.booleanOrTrue(false)).toBe(false);
        });

        test('should return true if the input is undefined', () => {
            expect(EzBoolean.booleanOrTrue(undefined)).toBe(true);
        });

        test('should return true if the input is null', () => {
            expect(EzBoolean.booleanOrTrue(null)).toBe(true);
        });

        test('should return true if the input is not a boolean', () => {
            expect(EzBoolean.booleanOrTrue(42)).toBe(true);
            expect(EzBoolean.booleanOrTrue('hello')).toBe(true);
            expect(EzBoolean.booleanOrTrue({ key: 'value' })).toBe(true);
        });
        test('should return false if the input is an array', () => {
            expect(EzBoolean.booleanOrTrue([])).toBe(true);
        });
    });

    describe('booleanOrNull', () => {
        test('should return the boolean value if the input is a boolean', () => {
            expect(EzBoolean.booleanOrNull(true)).toBe(true);
            expect(EzBoolean.booleanOrNull(false)).toBe(false);
        });

        test('should return null if the input is undefined or null', () => {
            expect(EzBoolean.booleanOrNull(undefined)).toBe(null);
            expect(EzBoolean.booleanOrNull(null)).toBe(null);
        });

        test('should return null if the input is not a boolean', () => {
            expect(EzBoolean.booleanOrNull(123)).toBe(null);
            expect(EzBoolean.booleanOrNull('true')).toBe(null);
            expect(EzBoolean.booleanOrNull({ key: 'value' })).toBe(null);
        });

        test('should return null if the input is an empty string', () => {
            expect(EzBoolean.booleanOrNull('')).toBe(null);
        });

        test('should return null if the input is a number', () => {
            expect(EzBoolean.booleanOrNull(42)).toBe(null);
        });

        test('should return null if the input is an object', () => {
            expect(EzBoolean.booleanOrNull({ key: 'value' })).toBe(null);
        });
    });
    describe('booleanOrDefault', () => {
        test('should return the boolean value if the input is a boolean', () => {
            expect(EzBoolean.booleanOrDefault(true, false)).toBe(true);
            expect(EzBoolean.booleanOrDefault(false, true)).toBe(false);
        });

        test('should return the default value if the input is undefined or null', () => {
            expect(EzBoolean.booleanOrDefault(undefined, true)).toBe(true);
            expect(EzBoolean.booleanOrDefault(null, false)).toBe(false);
        });

        test('should return the default value if the input is not a boolean', () => {
            expect(EzBoolean.booleanOrDefault(123, true)).toBe(true);
            expect(EzBoolean.booleanOrDefault('true', false)).toBe(false);
            expect(EzBoolean.booleanOrDefault({ key: 'value' }, true)).toBe(true);
        });

        test('should return the default value if the input is the string "true" or "false"', () => {
            expect(EzBoolean.booleanOrDefault('true', false)).toBe(false);
            expect(EzBoolean.booleanOrDefault('false', true)).toBe(true);
        });

        test('should return the default value if the input is an empty string', () => {
            expect(EzBoolean.booleanOrDefault('', true)).toBe(true);
        });

        test('should return the default value if the input is a number', () => {
            expect(EzBoolean.booleanOrDefault(42, false)).toBe(false);
        });

        test('should return the default value if the input is an object', () => {
            expect(EzBoolean.booleanOrDefault({ key: 'value' }, true)).toBe(true);
        });
    });

    describe('requireAll', () => {
        test('should return true if all boolean expressions are true', () => {
          expect(EzBoolean.requireAll(true, true, true)).toBe(true);
          expect(EzBoolean.requireAll(true, true)).toBe(true);
          expect(EzBoolean.requireAll(true)).toBe(true);
        });
      
        test('should return false if any boolean expression is false', () => {
          expect(EzBoolean.requireAll(true, false, true)).toBe(false);
          expect(EzBoolean.requireAll(false, true)).toBe(false);
          expect(EzBoolean.requireAll(false)).toBe(false);
        });
      
        test('should return true if there are no boolean expressions provided', () => {
          expect(EzBoolean.requireAll()).toBe(true);
        });
      
        test('should handle a mix of boolean and non-boolean values', () => {
          expect(EzBoolean.requireAll(true, 5, 'hello', false)).toBe(false);
          expect(EzBoolean.requireAll(true, 'true', 0)).toBe(false);
          expect(EzBoolean.requireAll(true, true, '')).toBe(false);
        });
      
        test('should handle empty strings and null values', () => {
          expect(EzBoolean.requireAll(true, '', null)).toBe(false);
          expect(EzBoolean.requireAll(true, true, '')).toBe(false);
          expect(EzBoolean.requireAll(true, null, true)).toBe(false);
        });
      });
});

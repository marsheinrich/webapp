import { EzFunction } from '../../../ezlibrary/helpers/EzFunction.js';


/* Created a mock class to test calling the function within a difference context. */
class TestClass {
    constructor(aAdjustment) {
        this.adjustment = aAdjustment && 'number' === typeof aAdjustment ? aAdjustment : 0;
    }

    adjustment = 0;

    fn1(a, b) {
        return a - b - this.adjustment;
    }

    fn2(a, b) {
        return a + b + this.adjustment;
    }
}

describe('EzFunction Class', () => {
    describe('isFunction', () => {
        test('should return true if the value is a function', () => {
            // Input a function
            const value = () => {};
            // Call the method and assert
            expect(EzFunction.isFunction(value)).toBe(true);
        });

        test('should return false if the value is undefined', () => {
            // Input undefined
            const value = undefined;
            // Call the method and assert
            expect(EzFunction.isFunction(value)).toBe(false);
        });

        test('should return false if the value is null', () => {
            // Input null
            const value = null;
            // Call the method and assert
            expect(EzFunction.isFunction(value)).toBe(false);
        });

        test('should return false if the value is not a function', () => {
            // Input an object
            const value = { key: 'value' };
            // Call the method and assert
            expect(EzFunction.isFunction(value)).toBe(false);
        });

        test('should return true if the value is a built-in function', () => {
            // Input a built-in function
            const value = Array.isArray;
            // Call the method and assert
            expect(EzFunction.isFunction(value)).toBe(true);
        });
    });

    describe('functionOrNull', () => {
        test('should return the function if the value is a function', () => {
            // Input a function
            const value = () => {};
            // Call the method and assert
            expect(EzFunction.functionOrNull(value)).toBe(value);
        });

        test('should return null if the value is undefined', () => {
            // Input undefined
            const value = undefined;
            // Call the method and assert
            expect(EzFunction.functionOrNull(value)).toBe(null);
        });

        test('should return null if the value is null', () => {
            // Input null
            const value = null;
            // Call the method and assert
            expect(EzFunction.functionOrNull(value)).toBe(null);
        });

        test('should return null if the value is not a function', () => {
            // Input an object
            const value = { key: 'value' };
            // Call the method and assert
            expect(EzFunction.functionOrNull(value)).toBe(null);
        });

        test('should return the built-in function if the value is a built-in function', () => {
            // Input a built-in function
            const value = Array.isArray;
            // Call the method and assert
            expect(EzFunction.functionOrNull(value)).toBe(value);
        });
    });
    describe('functionOrDefault', () => {
        test('should return the function if the value is a function', () => {
            // Input a function
            const value = () => {};
            const defaultValue = () => {};
            // Call the method and assert
            expect(EzFunction.functionOrDefault(value, defaultValue)).toBe(value);
        });

        test('should return the defaultValue if the value is undefined', () => {
            // Input undefined
            const value = undefined;
            const defaultValue = () => {};
            // Call the method and assert
            expect(EzFunction.functionOrDefault(value, defaultValue)).toBe(defaultValue);
        });

        test('should return the defaultValue if the value is null', () => {
            // Input null
            const value = null;
            const defaultValue = () => {};
            // Call the method and assert
            expect(EzFunction.functionOrDefault(value, defaultValue)).toBe(defaultValue);
        });

        test('should return the defaultValue if the value is not a function', () => {
            // Input an object
            const value = { key: 'value' };
            const defaultValue = () => {};
            // Call the method and assert
            expect(EzFunction.functionOrDefault(value, defaultValue)).toBe(defaultValue);
        });

        test('should return the built-in function if the value is a built-in function', () => {
            // Input a built-in function
            const value = Array.isArray;
            const defaultValue = () => {};
            // Call the method and assert
            expect(EzFunction.functionOrDefault(value, defaultValue)).toBe(value);
        });
    });
    describe('callback', () => {
        test('should return null if the provided function is not valid', () => {
            // Input an invalid function
            const callbackFunction = 'not a function';
            // Call the method and assert
            expect(EzFunction.callback(callbackFunction)).toBeNull();
        });

        test('should call the provided function with the given arguments', () => {
            // Mock callback function
            const callbackFunction = jest.fn((a, b) => a + b);
            const arg1 = 2;
            const arg2 = 3;
            // Call the method and assert
            expect(EzFunction.callback(callbackFunction, arg1, arg2)).toBe(arg1 + arg2);
            // Check if the function was called with the correct arguments
            expect(callbackFunction).toHaveBeenCalledWith(arg1, arg2);
        });

        test('should handle calling a function with no arguments', () => {
            // Mock callback function
            const callbackFunction = jest.fn(() => 42);
            // Call the method and assert
            expect(EzFunction.callback(callbackFunction)).toBe(42);
            // Check if the function was called with no arguments
            expect(callbackFunction).toHaveBeenCalled();
        });
    });
    describe('callWithParams', () => {
        test('should call the provided function with the given parameters and context', () => {
            // Mock function
            // const mockFunction = jest.fn((a, b) => a + b);
            // const context = { value: 5 };
            const params = [2, 3];

            /*
                Create a new instance of TestClass with adjustment = 5 for the first context
            */
            let testClassA = new TestClass(5);

            /*
                Create a new instance of TestClass with adjustment = 6 for the second context
            */
            let testClassB = new TestClass(6);

            testClassB.adjustment = 6;

            let expectedResult = 11;

            // Call the testClassA.fn2(..) method within the context of testClassB (different context)
            expect(EzFunction.callWithParams(testClassA.fn2, params, testClassB)).toBe(expectedResult);

            expectedResult = 10;

            // Call the testClassA.fn2(..) method within the context of testClassA (normal)
            expect(EzFunction.callWithParams(testClassA.fn2, params, testClassA)).toBe(expectedResult);

            expectedResult = 11;

            // Call the testClassB.fn2(..) method within the context of testClassA (normal)
            expect(EzFunction.callWithParams(testClassB.fn2, params, testClassB)).toBe(expectedResult);

            expectedResult = 10;

            // Call the testClassB.fn2(..) method within the context of testClassA (different context)
            expect(EzFunction.callWithParams(testClassB.fn2, params, testClassA)).toBe(expectedResult);

            /* I'm not sure how to wrap the testClassA.fn2 and testClassA.fn2 in a jest spy to use toHaveBeenCalledWith(...) */
            //expect(mockFunction).toHaveBeenCalledWith(...params);

            /* Not sure you can validate what context the function was called with this way? */
            //expect(mockFunction).toHaveBeenCalledWith(context);
        });

        test('should call the provided function with the given parameters and current context if optional context is not provided', () => {
            // Mock function
            const mockFunction = jest.fn((a, b) => a + b);
            const params = [2, 3];
            // Call the method and assert
            expect(EzFunction.callWithParams(mockFunction, params)).toBe(5);
            // Check if the function was called with the correct parameters and current context
            expect(mockFunction).toHaveBeenCalledWith(...params);
        });

        test('should throw an exception if functionToCall is not a function', () => {
            // Mock function
            const mockFunction = 'not a function';
            // Call the method and expect it to throw an exception
            expect(() => {
                EzFunction.callWithParams(mockFunction, []);
            }).toThrow();
        });

        test('should throw an exception if arrayOfParams is not an array', () => {
            // Mock function
            const mockFunction = jest.fn();
            const params = 'not an array';
            // Call the method and expect it to throw an exception
            expect(() => {
                EzFunction.callWithParams(mockFunction, params);
            }).toThrow();
        });
    });
    describe('dummyFunction', () => {
        test('should be a function that performs no actions', () => {
            // Call the method
            EzFunction.dummyFunction();
            // No assertions are needed, just ensuring that the function runs without errors
        });
    });
});

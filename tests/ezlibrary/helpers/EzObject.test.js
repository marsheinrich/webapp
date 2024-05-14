import { EzObject } from '../../../ezlibrary/helpers/EzObject.js';
import { MyTestObject } from '../../test-class/MyTestObject.js';

/**
 * Unit testing for EzObject Class
 */

describe('EzObject Class', () => {

    /**
     * Unit Test For empty Object using ezObject Class
     */

    describe('EMPTY property', () => {
        test('should return an empty object', () => {
            const emptyObject = EzObject.EMPTY;
            expect(emptyObject).toEqual({});
        });
    });

    /**
     * Unit test for isAvailable methods must be written in following describe block.
     */

    /*
        !! Disabled due to decision not to continue using the EzObject.isAvailableFromEzApi(...) method !!

    describe('isAvailableFromEzApi', () => {
        test('returns true if ezApi is available', () => {
            globalThis.ezApi.ezRegisterNewApi(MyTestObject, 'ezclocker');
            const registrationState = globalThis.ezApi.ezclocker.myTestObject.ezRegistrationState;
            expect(registrationState).toBe('REGISTERED');
            const isAvailable = EzObject.isAvailableFromEzApi(MyTestObject);
            expect(isAvailable).toBe(true);
        });

        test('Throws error if globalThis.ezApi is undefiended', () => {
            globalThis.ezApi = undefined;
            expect(() => EzObject.isAvailableFromEzApi('ezclocker')).toThrow();
        });

        test('returns false if classRefOrEzApiName is undefined', () => {
            globalThis.ezApi = { ezclocker: true };
            expect(EzObject.isAvailableFromEzApi(undefined)).toBe(false);
        });

        test('returns false if classRefOrEzApiName is null', () => {
            globalThis.ezApi = { ezclocker: true };
            expect(EzObject.isAvailableFromEzApi(null)).toBe(false);
        });
    });
    */

    /** isAvailableFromEzApi method unit tests ends here  */

    /**
     * Unit test for getObjectType must be written in the following describe block
     */
    describe('getObjectType', () => {
        test('returns the correct object type', () => {
            expect(EzObject.getObjectType({})).toBe(Object.prototype.toString.call({}));

            expect(EzObject.getObjectType([])).toBe(Object.prototype.toString.call([]));
        });

        test('should throw EzBadParamException when provided null', () => {
            expect(() => EzObject.getObjectType(null)).toThrow();
        });
    });

    /** getObjectType method unit tests ends here  */

    /**
     * Unit test for isTypeOf method must me wriiten in the following describe block
     */
    describe('isTypeOf', () => {
        test('returns true if the provided value is of the provided type', () => {
            expect(EzObject.isTypeOf('test', 'string')).toBe(true);
            expect(EzObject.isTypeOf(123, 'number')).toBe(true);
        });

        test('returns false if the provided value is not of the provided type', () => {
            expect(EzObject.isTypeOf('test', 'number')).toBe(false);
            expect(EzObject.isTypeOf(123, 'string')).toBe(false);
        });

        test('throws an exception if typeName is not a string', () => {
            expect(() => EzObject.isTypeOf('test', null)).toThrow();
        });
    });
    /** isTypeOf method unit tests ends here  */

    /**
     * Unit test for getClassName method must me wriiten in the following describe block
     */
    describe('getClassName method', () => {
        test('should throw EzBadParamException for undefined input', () => {
            expect(() => EzObject.getClassName(undefined)).toThrow();
        });

        test('should throw EzBadParamException for null input', () => {
            expect(() => EzObject.getClassName(null)).toThrow();
        });

        test('should return the class name for objects with constructor property', () => {
            const result = EzObject.getClassName(MyTestObject);
            console.log('CHECK RESULT', JSON.stringify(result));
            expect(result).toBe('MyTestObject');
        });

        test('should return the object type for objects without constructor property', () => {
            const myObject = { key: 'value' };

            const result = EzObject.getClassName(myObject);

            const expectedObjectType = myObject.constructor.name;

            expect(result).toBe(expectedObjectType);
        });

        test('should return the object type for primitive values', () => {
            const resultNumber = EzObject.getClassName(42);
            const resultString = EzObject.getClassName('Hello');
            const resultBoolean = EzObject.getClassName(true);

            expect(resultNumber).toBe('Number');
            expect(resultString).toBe('String');
            expect(resultBoolean).toBe('Boolean');
        });
    });
    /** getClassName method unit tests ends here  */
});

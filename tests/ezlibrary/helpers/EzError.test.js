import { EzError } from '../../../ezlibrary/helpers/EzError.js';
import { EzException } from '../../../ezlibrary/exceptions/EzExceptions.js';

describe('EzError', () => {
    describe('errorOrDefaultError', () => {
        test('returns default error if err is undefined', () => {
            const defaultError = EzError.errorOrDefaultError(undefined);
            expect(defaultError.errorCode).toBeDefined();
            expect(defaultError.message).toBeDefined();
        });
    
        test('returns default error if err is null', () => {
            const defaultError = EzError.errorOrDefaultError(null);
            expect(defaultError.errorCode).toBeDefined();
            expect(defaultError.message).toBeDefined();
        });
    
        test('returns provided error if it has errorCode and message properties', () => {
            const providedError = { errorCode: 'CUSTOM_ERROR', message: 'Custom error message' };
            const result = EzError.errorOrDefaultError(providedError);
            expect(result).toEqual(providedError);
        });
    
        test('adds errorCode and message properties to provided error if missing', () => {
            const providedError = { };
            const result = EzError.errorOrDefaultError(providedError);
            expect(result.errorCode).toBeDefined();
            expect(result.message).toBeDefined();
        });
    
        test('adds default message if provided error is missing message property', () => {
            const providedError = { errorCode: 'CUSTOM_ERROR' };
            const result = EzError.errorOrDefaultError(providedError);
            expect(result.message).toEqual(EzError.DEFAULT_ERROR_MESSAGE);
        });
    });
    describe('errorOrDefault', () => {
        test('returns the provided error object if it has errorCode and message properties', () => {
            const providedError = new EzException('Custom error message', 404);
            const result = EzError.errorOrDefault(providedError, new EzException('Default error', 500));

            expect(result).toBe(providedError);
        });

       
        test('adds errorCode and message properties to the provided error object if missing', () => {
            const providedError = {};
            const result = EzError.errorOrDefault(providedError, new EzException('Default error', 500));
        
            expect(result).toHaveProperty('errorCode');
            expect(result).toHaveProperty('message');
        });

        
        test('returns the default error object if the provided error is undefined', () => {
            const defaultError = new EzException('Default error', 500);
            const result = EzError.errorOrDefault(undefined, defaultError);

            expect(result).toBe(defaultError);
        });

      
        test('returns the default error object if the provided error is null', () => {
            const defaultError = new EzException('Default error', 500);
            const result = EzError.errorOrDefault(null, defaultError);

            expect(result).toBe(defaultError);
        });
    });
    describe('throwEzException', () => {
        test('throws an EzException with the provided message and errorCode', () => {
            const message = 'Custom error message';
            const errorCode = 404;

            expect(() => {
                EzError.throwEzException(message, errorCode);
            }).toThrow(EzException);
        });

        
        test('throws an EzException with the default error message and errorCode if message is not provided', () => {
            const errorCode = 404;

            expect(() => {
                EzError.throwEzException(undefined, errorCode);
            }).toThrow(EzException);
        });

        
        test('throws an EzException with the default errorCode if errorCode is not provided', () => {
            const message = 'Custom error message';

            expect(() => {
                EzError.throwEzException(message);
            }).toThrow(EzException);
        });

       
        test('throws an EzException with the default errorCode and message if neither message nor errorCode are provided', () => {
            expect(() => {
                EzError.throwEzException();
            }).toThrow(EzException);
        });

       
        test('throws an EzException with the provided options errorCode if options is provided', () => {
            const message = 'Custom error message';
            const errorCode = 404;
            const options = { errorCode: 500 };

            expect(() => {
                EzError.throwEzException(message, errorCode, options);
            }).toThrow(EzException);
        });
    });
    describe('DEFAULT_ERROR_MESSAGE', () => {
        test('DEFAULT_ERROR_MESSAGE is a readonly property', () => {
            expect(() => {
                EzError.DEFAULT_ERROR_MESSAGE = 'Modified message';
            }).toThrowError();
        });

        test('DEFAULT_ERROR_MESSAGE has the expected default value', () => {
            expect(EzError.DEFAULT_ERROR_MESSAGE).toBe('Unexpected error - no additional details provided.');
        });

        test('accessing DEFAULT_ERROR_MESSAGE does not modify its value', () => {
            const originalMessage = EzError.DEFAULT_ERROR_MESSAGE;
            EzError.DEFAULT_ERROR_MESSAGE; // Access the property again
            expect(EzError.DEFAULT_ERROR_MESSAGE).toBe(originalMessage);
        });

        test('trying to assign to DEFAULT_ERROR_MESSAGE throws a TypeError', () => {
            expect(() => {
                EzError.DEFAULT_ERROR_MESSAGE = 123;
            }).toThrowError(TypeError);
        });

    });
    describe('DEFAULT_ERROR_CODE', () => {
        test('DEFAULT_ERROR_CODE is a readonly property', () => {
            expect(() => {
                EzError.DEFAULT_ERROR_CODE = 404;
            }).toThrowError();
        });

        test('DEFAULT_ERROR_CODE has the expected default value', () => {
            expect(EzError.DEFAULT_ERROR_CODE).toBe(500);
        });

        test('accessing DEFAULT_ERROR_CODE does not modify its value', () => {
            const originalCode = EzError.DEFAULT_ERROR_CODE;
            EzError.DEFAULT_ERROR_CODE; // Access the property again
            expect(EzError.DEFAULT_ERROR_CODE).toBe(originalCode);
        });

        test('trying to assign to DEFAULT_ERROR_CODE throws a TypeError', () => {
            expect(() => {
                EzError.DEFAULT_ERROR_CODE = 'invalid';
            }).toThrowError(TypeError);
        });
    });
});

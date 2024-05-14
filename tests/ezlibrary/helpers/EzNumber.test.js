import { EzNumber } from '../../../ezlibrary/helpers/EzNumber.js';

describe('EzNumber Class', () => {
    describe('isNAN', () => {
        test('should return true for NaN', () => {
            expect(EzNumber.isNAN(NaN)).toBe(true);
        });

        test('should return false for "NaN" as string', () => {
            expect(EzNumber.isNAN('NaN')).toBe(false);
        });

        test('should return false for non-numeric string', () => {
            expect(EzNumber.isNAN('abc')).toBe(false);
        });

        test('should return false for undefined', () => {
            expect(EzNumber.isNAN(undefined)).toBe(false);
        });

        test('should return false for null', () => {
            expect(EzNumber.isNAN(null)).toBe(false);
        });

        test('should return false for a numeric value', () => {
            expect(EzNumber.isNAN(42)).toBe(false);
        });

        test('should return false for a valid numeric string', () => {
            expect(EzNumber.isNAN('42')).toBe(false);
        });

        test('should return false for a valid numeric string with leading/trailing whitespaces', () => {
            expect(EzNumber.isNAN(' 42 ')).toBe(false);
        });
    });

    describe('isNaN', () => {
        test('should return true for NaN', () => {
            expect(EzNumber.isNaN(NaN)).toBe(true);
        });

        test('should return true for "NaN" as string', () => {
            expect(EzNumber.isNaN('NaN')).toBe(false);
        });

        test('should return true for non-numeric string', () => {
            expect(EzNumber.isNaN('abc')).toBe(false);
        });

        test('should return true for undefined', () => {
            expect(EzNumber.isNaN(undefined)).toBe(false);
        });

        test('should return true for null', () => {
            expect(EzNumber.isNaN(null)).toBe(false);
        });

        test('should return false for a numeric value', () => {
            expect(EzNumber.isNaN(42)).toBe(false);
        });

        test('should return false for a valid numeric string', () => {
            expect(EzNumber.isNaN('42')).toBe(false);
        });

        test('should return false for a valid numeric string with leading/trailing whitespaces', () => {
            expect(EzNumber.isNaN(' 42 ')).toBe(false);
        });
    });

    describe('isNumber', () => {
        test('should return true for a valid number', () => {
            expect(EzNumber.isNumber(42)).toBe(true);
        });

        test('should return false for a valid numeric string', () => {
            expect(EzNumber.isNumber('42')).toBe(false);
        });

        test('should return false for null', () => {
            expect(EzNumber.isNumber(null)).toBe(false);
        });

        test('should return false for undefined', () => {
            expect(EzNumber.isNumber(undefined)).toBe(false);
        });

        test('should return false for a non-numeric string', () => {
            expect(EzNumber.isNumber('abc')).toBe(false);
        });
    });
    describe('numberOrNull', () => {
        test('should return the valid number for a valid number', () => {
            expect(EzNumber.numberOrNull(42)).toBe(42);
        });

        test('should return null for a valid numeric string', () => {
            expect(EzNumber.numberOrNull('42')).toBe(null);
        });

        test('should return null for null', () => {
            expect(EzNumber.numberOrNull(null)).toBeNull();
        });

        test('should return null for undefined', () => {
            expect(EzNumber.numberOrNull(undefined)).toBeNull();
        });

        test('should return null for a non-numeric string', () => {
            expect(EzNumber.numberOrNull('abc')).toBeNull();
        });
    });
    describe('asString', () => {
        // Test cases for valid numbers
        test('should return string representation for a valid number', () => {
            expect(EzNumber.asString(42)).toBe('42');
        });

        test('should return string representation for a valid numeric string', () => {
            expect(EzNumber.asString('42')).toBe('42');
        });

        // Test case for NaN
        test('should return "NaN" for NaN', () => {
            expect(EzNumber.asString(NaN)).toBe('NaN');
        });

        // Test case for null
        test('should return "NaN" for null', () => {
            expect(EzNumber.asString(null)).toBe('NaN');
        });

        // Test case for undefined
        test('should return "NaN" for undefined', () => {
            expect(EzNumber.asString(undefined)).toBe('NaN');
        });

        // Test case for a non-numeric string
        test('should return "NaN" for a non-numeric string', () => {
            expect(EzNumber.asString('abc')).toBe('abc');
        });
    });

    describe('numberOrNaN', () => {
        // Test cases for valid numbers
        test('should return the number for a valid number', () => {
            expect(EzNumber.numberOrNaN(42)).toBe(42);
        });

        test('should return the NaN for a valid numeric string', () => {
            expect(EzNumber.numberOrNaN('42')).toBe(NaN);
        });

        // Test cases for invalid inputs
        test('should return NaN for NaN', () => {
            expect(EzNumber.numberOrNaN(NaN)).toBe(NaN);
        });

        test('should return NaN for null', () => {
            expect(EzNumber.numberOrNaN(null)).toBe(NaN);
        });

        test('should return NaN for undefined', () => {
            expect(EzNumber.numberOrNaN(undefined)).toBe(NaN);
        });

        test('should return NaN for a non-numeric string', () => {
            expect(EzNumber.numberOrNaN('abc')).toBe(NaN);
        });
    });

    describe('numberOrDefault', () => {
        // Test cases for valid numbers
        test('should return the number for a valid number', () => {
            expect(EzNumber.numberOrDefault(42, 0)).toBe(42);
        });

        test('should return the default for a valid numeric string', () => {
            expect(EzNumber.numberOrDefault('42', 0)).toBe(0);
        });

        // Test cases for invalid inputs
        test('should return the default value for NaN', () => {
            expect(EzNumber.numberOrDefault(NaN, 0)).toBe(0);
        });

        test('should return the default value for null', () => {
            expect(EzNumber.numberOrDefault(null, 0)).toBe(0);
        });

        test('should return the default value for undefined', () => {
            expect(EzNumber.numberOrDefault(undefined, 0)).toBe(0);
        });

        test('should return the default value for a non-numeric string', () => {
            expect(EzNumber.numberOrDefault('abc', 0)).toBe(0);
        });
    });

    describe('asNumber', () => {
        // Test cases for valid number strings
        test('should return a valid number for a valid integer string', () => {
            expect(EzNumber.asNumber('42')).toBe(42);
        });

        // Test cases for valid number strings with radix
        test('should return a valid number with radix for a valid integer string', () => {
            expect(EzNumber.asNumber('1010', 2)).toBe(10); // binary representation
        });

        // Test cases for invalid input strings
        test('should return NaN for null', () => {
            expect(EzNumber.asNumber(null)).toBe(NaN);
        });

        test('should return NaN for undefined', () => {
            expect(EzNumber.asNumber(undefined)).toBe(NaN);
        });

        test('should return NaN for an empty string', () => {
            expect(EzNumber.asNumber('')).toBe(NaN);
        });

        test('should return NaN for a non-numeric string', () => {
            expect(EzNumber.asNumber('abc')).toBe(NaN);
        });

        // Test case for invalid radix
        test('should return actual number for an invalid radix', () => {
            expect(EzNumber.asNumber('1010', 'invalid')).toBe(1010);
        });

        // Test case for valid number strings without radix
        test('should return a valid number without radix for a valid integer string', () => {
            expect(EzNumber.asNumber('42')).toBe(42);
        });
    });
    describe('strToInt', () => {
        test('should return integer for a valid string', () => {
            expect(EzNumber.strToInt('42')).toBe(42);
        });

        test('should return NaN for an invalid string', () => {
            expect(EzNumber.strToInt('abc')).toBeNaN();
        });

        test('should return NaN for null', () => {
            expect(EzNumber.strToInt(null)).toBeNaN();
        });

        test('should return NaN for undefined', () => {
            expect(EzNumber.strToInt(undefined)).toBeNaN();
        });

        test('should return NaN for an empty string', () => {
            expect(EzNumber.strToInt('')).toBeNaN();
        });
    });

    describe('strToIntDefault', () => {
        test('should return integer for a valid string', () => {
            expect(EzNumber.strToIntDefault('42', 0)).toBe(42);
        });

        test('should return default value for an invalid string', () => {
            expect(EzNumber.strToIntDefault('abc', 42)).toBe(42);
        });

        test('should return default value for null', () => {
            expect(EzNumber.strToIntDefault(null, 42)).toBe(42);
        });

        test('should return default value for undefined', () => {
            expect(EzNumber.strToIntDefault(undefined, 42)).toBe(42);
        });

        test('should return default value for an empty string', () => {
            expect(EzNumber.strToIntDefault('', 42)).toBe(42);
        });
    });

    describe('strToFloat', () => {
        test('should return float for a valid string', () => {
            expect(EzNumber.strToFloat('3.14')).toBe(3.14);
        });

        test('should return NaN for an invalid string', () => {
            expect(EzNumber.strToFloat('abc')).toBeNaN();
        });

        test('should return NaN for null', () => {
            expect(EzNumber.strToFloat(null)).toBeNaN();
        });

        test('should return NaN for undefined', () => {
            expect(EzNumber.strToFloat(undefined)).toBeNaN();
        });

        test('should return NaN for an empty string', () => {
            expect(EzNumber.strToFloat('')).toBeNaN();
        });

        test('should return NaN for an invalid string', () => {
            const invalidString = 'abc';
            expect(EzNumber.strToFloat(invalidString)).toBe(NaN);
        });
    });

    describe('strToFloatDefault', () => {
        // Test cases for valid values
        test('should return floating point number for a valid string', () => {
            const floatValue = EzNumber.strToFloatDefault('3.14', 0);
            expect(floatValue).toBe(3.14);
        });

        test('should return defaultValue for null', () => {
            const defaultValue = 0;
            const result = EzNumber.strToFloatDefault(null, defaultValue);
            expect(result).toBe(defaultValue);
        });

        test('should return defaultValue for undefined', () => {
            const defaultValue = 0;
            const result = EzNumber.strToFloatDefault(undefined, defaultValue);
            expect(result).toBe(defaultValue);
        });

        // Test cases for invalid values
        test('should return defaultValue for a non-numeric string', () => {
            const defaultValue = 0;
            const result = EzNumber.strToFloatDefault('abc', defaultValue);
            expect(result).toBe(defaultValue);
        });
    });
    describe('asNumberOrDefault', () => {
        // Test cases for valid values
        test('should return a number for a valid numeric string', () => {
            const result = EzNumber.asNumberOrDefault('42', 0);
            expect(result).toBe(42);
        });
        test('should return defaultValue for null', () => {
            const defaultValue = 0;
            const result = EzNumber.asNumberOrDefault(null, defaultValue);
            expect(result).toBe(defaultValue);
        });
        test('should return defaultValue for undefined', () => {
            const defaultValue = 0;
            const result = EzNumber.asNumberOrDefault(undefined, defaultValue);
            expect(result).toBe(defaultValue);
        });
        // Test cases for invalid values
        test('should return defaultValue for a non-numeric string', () => {
            const defaultValue = 0;
            const result = EzNumber.asNumberOrDefault('abc', defaultValue);
            expect(result).toBe(defaultValue);
        });
        test('should return defaultValue for an invalid numeric string', () => {
            const defaultValue = 0;
            const result = EzNumber.asNumberOrDefault('abc123', defaultValue);
            expect(result).toBe(defaultValue);
        });
        test('should return defaultValue for an invalid string with radix', () => {
            const defaultValue = 0;
            const result = EzNumber.asNumberOrDefault('abc', defaultValue, 16);
            expect(result).toBe(defaultValue);
        });
    });
    describe('isNumberWithinRange', () => {
        // Test cases for valid values
        test('should return true for a number within the specified range', () => {
            const result = EzNumber.isNumberWithinRange(5, 1, 10);
            expect(result).toBe(true);
        });
        test('should return true for a number equal to aMinNumber', () => {
            const result = EzNumber.isNumberWithinRange(1, 1, 10);
            expect(result).toBe(true);
        });
        test('should return true for a number equal to aMaxNumber', () => {
            const result = EzNumber.isNumberWithinRange(10, 1, 10);
            expect(result).toBe(true);
        });
        // Test cases for invalid values
        test('should return false for a number less than aMinNumber', () => {
            const result = EzNumber.isNumberWithinRange(0, 1, 10);
            expect(result).toBe(false);
        });
        test('should return false for a number greater than aMaxNumber', () => {
            const result = EzNumber.isNumberWithinRange(15, 1, 10);
            expect(result).toBe(false);
        });
        test('should throw an exception for aMinNumber greater than aMaxNumber', () => {
            expect(() => EzNumber.isNumberWithinRange(5, 10, 1)).toThrowError();
        });
        // Test cases for non-numeric values
        test('should return false for null', () => {
            expect(() => EzNumber.isNumberWithinRange(null, 1, 10)).toThrowError();
        });
        test('should return false for undefined', () => {
            expect(() => EzNumber.isNumberWithinRange(undefined, 1, 10)).toThrowError();
        });
        test('should return false for a non-numeric string', () => {
            expect(() => EzNumber.isNumberWithinRange('abc', 1, 10)).toThrowError();
        });
    });
    describe('isNumberBetweenRange', () => {
        // Test cases for valid values
        test('should return true for a number within the specified range', () => {
            const result = EzNumber.isNumberBetweenRange(5, 1, 10);
            expect(result).toBe(true);
        });
        test('should return true for a number equal to aStartNumber', () => {
            const result = EzNumber.isNumberBetweenRange(1, 1, 10);
            expect(result).toBe(false);
        });
        test('should return true for a number equal to aEndNumber', () => {
            const result = EzNumber.isNumberBetweenRange(10, 1, 10);
            expect(result).toBe(false);
        });
        // Test cases for invalid values
        test('should return false for a number less than aStartNumber', () => {
            const result = EzNumber.isNumberBetweenRange(0, 1, 10);
            expect(result).toBe(false);
        });
        test('should return false for a number greater than aEndNumber', () => {
            const result = EzNumber.isNumberBetweenRange(15, 1, 10);
            expect(result).toBe(false);
        });
        test('should throw an exception for aStartNumber greater than aEndNumber', () => {
            expect(() => EzNumber.isNumberBetweenRange(5, 10, 1)).toThrowError();
        });
        // Test cases for non-numeric values
        test('should return false for null', () => {
            expect(() => EzNumber.isNumberBetweenRange(null, 1, 10)).toThrowError();
        });
        test('should return false for undefined', () => {
            expect(()=>EzNumber.isNumberBetweenRange(undefined, 1, 10)).toThrowError();
        });
        test('should return false for a non-numeric string', () => {
            expect(()=>EzNumber.isNumberBetweenRange('abc', 1, 10)).toThrowError();
        });
    });
    describe('numberAsCurrencyString', () => {
        // Test cases for valid values
        test('should return currency string for a valid number', () => {
            const result = EzNumber.numberAsCurrencyString(1000, 'en-us', 'USD');
            expect(result).toBe('$1,000.00');
        });
        test('should return currency string for a valid number with different locale and currency', () => {
            const result = EzNumber.numberAsCurrencyString(2000, 'fr-fr', 'EUR');
            // to differenciate whitespaces of uni encoded we have use \u202F and \u00A
            expect(result).toBe('2\u202F000,00\u00A0€');
        });
        // Test cases for invalid values
        test('should return currency string for a non-numeric string', () => {
            const result = EzNumber.numberAsCurrencyString('abc', 'en-us', 'USD');
            expect(result).toBe('$NaN');
        });
        test('should return currency string for null', () => {
            const result = EzNumber.numberAsCurrencyString(null, 'en-us', 'USD');
            expect(result).toBe('$0.00');
        });
        test('should return currency string for undefined', () => {
            const result = EzNumber.numberAsCurrencyString(undefined, 'en-us', 'USD');
            expect(result).toBe('$NaN');
        });
        // Test cases for default values
        test('should return currency string with default locale and currency for undefined values', () => {
            const result = EzNumber.numberAsCurrencyString(500);
            expect(result).toBe('$500.00');
        });
        test('should return currency string with default locale for undefined currency', () => {
            const result = EzNumber.numberAsCurrencyString(750, 'en-us');
            expect(result).toBe('$750.00');
        });
    });
    describe('formatDecimal', () => {
        // Test cases for valid values
        test('should return formatted decimal for a valid number with default decimal places', () => {
            const result = EzNumber.formatDecimal(123.456);
            expect(result).toBe(123);
        });
        test('should return formatted decimal for a valid number with specific decimal places', () => {
            const result = EzNumber.formatDecimal(456.789, 2);
            expect(result).toBe(456.79);
        });
        // Test cases for invalid values
        test('should throw error for a non-numeric value', () => {
            expect(() => EzNumber.formatDecimal('abc')).toThrow();
        });
        test('should throw error for undefined value', () => {
            expect(() => EzNumber.formatDecimal(undefined, 2)).toThrow();
        });
        test('should remove all decimal positions for undefined decimal places', () => {
            const result = EzNumber.formatDecimal(789.012, undefined);
            expect(result).toBe(789);
        });
        test('should return formatted decimal with default decimal places for undefined decimal places', () => {
            const result = EzNumber.formatDecimal(345.678);
            expect(result).toBe(346);
        });
    });
});

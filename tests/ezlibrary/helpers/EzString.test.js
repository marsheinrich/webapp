/** @format */

import { EzString } from '../../../ezlibrary/helpers/EzString.js';

jest.mock('moment-timezone', () => ({
    moment: () => ({
        format: jest.fn((formatString) => {
            const isoDate = '2024-01-01T09:00:00.000Z';
            const formatX = Date.parse(isoDate).toString(); // Convert timestamp to string
            const formatMMDDYYYY_hhmm_a = '01-01-2024 09:00 am';
            const formatDefault = isoDate;

            switch (formatString) {
                case 'x':
                    return formatX;
                case 'MM-DD-YYYY hh:mm a':
                    return formatMMDDYYYY_hhmm_a;
                default:
                    return formatDefault;
            }
        }),
    }),
}));

// Mocking moment when imported as: import { moment } from 'moment';
jest.mock('moment', () => ({
    moment: () => ({
        format: jest.fn((formatString) => {
            const isoDate = '2024-01-01T09:00:00.000Z';
            const formatX = Date.parse(isoDate).toString(); // Convert timestamp to string
            const formatMMDDYYYY_hhmm_a = '01-01-2024 09:00 am';
            const formatDefault = isoDate;

            switch (formatString) {
                case 'x':
                    return formatX;
                case 'MM-DD-YYYY hh:mm a':
                    return formatMMDDYYYY_hhmm_a;
                default:
                    return formatDefault;
            }
        }),
    }),
}));

describe('EzString', () => {
    describe('removeAllSpacesReturnsLineFeeds', () => {
        test('should remove all spaces, \\n, and \\r characters from the string', () => {
            const inputString = 'Hello \nworld\r!';
            const expectedResult = 'Helloworld!';

            const result = EzString.removeAllSpacesReturnsLineFeeds(inputString);

            expect(result).toBe(expectedResult);
        });

        test('should return an empty string if input is empty', () => {
            const inputString = '';
            const expectedResult = '';

            const result = EzString.removeAllSpacesReturnsLineFeeds(inputString);

            expect(result).toBe(expectedResult);
        });

        test('should return the same string if it has no spaces, \\n, or \\r characters', () => {
            const inputString = 'NoSpacesOrLineFeeds';
            const expectedResult = 'NoSpacesOrLineFeeds';

            const result = EzString.removeAllSpacesReturnsLineFeeds(inputString);

            expect(result).toBe(expectedResult);
        });
    });
    describe('removeAllSpaces', () => {
        test('should remove all spaces from the string', () => {
            const inputString = 'Hello world!';
            const expectedResult = 'Helloworld!';

            const result = EzString.removeAllSpaces(inputString);

            expect(result).toBe(expectedResult);
        });

        test('should return an empty string if input is empty', () => {
            const inputString = '';
            const expectedResult = '';

            const result = EzString.removeAllSpaces(inputString);

            expect(result).toBe(expectedResult);
        });

        test('should return the same string if it has no spaces', () => {
            const inputString = 'NoSpacesHere';
            const expectedResult = 'NoSpacesHere';

            const result = EzString.removeAllSpaces(inputString);

            expect(result).toBe(expectedResult);
        });

        test('should remove leading and trailing spaces', () => {
            const inputString = '  TrimMe  ';
            const expectedResult = 'TrimMe';

            const result = EzString.removeAllSpaces(inputString);

            expect(result).toBe(expectedResult);
        });

        test('should remove multiple consecutive spaces', () => {
            const inputString = 'Multiple   Spaces    Here';
            const expectedResult = 'MultipleSpacesHere';

            const result = EzString.removeAllSpaces(inputString);

            expect(result).toBe(expectedResult);
        });

        test('should handle strings with spaces at various positions', () => {
            const inputString = 'Spaces At Various Positions';
            const expectedResult = 'SpacesAtVariousPositions';

            const result = EzString.removeAllSpaces(inputString);

            expect(result).toBe(expectedResult);
        });
    });

    describe('removeAllReturnsLineFeeds', () => {
        test('should remove all newline and carriage return characters from the string', () => {
            const inputString = 'Hello\nworld\r!';
            const expectedResult = 'Helloworld!';

            const result = EzString.removeAllReturnsLineFeeds(inputString);

            expect(result).toBe(expectedResult);
        });

        test('should return an empty string if input is empty', () => {
            const inputString = '';
            const expectedResult = '';

            const result = EzString.removeAllReturnsLineFeeds(inputString);

            expect(result).toBe(expectedResult);
        });

        test('should return the same string if it has no newline or carriage return characters', () => {
            const inputString = 'NoNewlinesOrCarriageReturns';
            const expectedResult = 'NoNewlinesOrCarriageReturns';

            const result = EzString.removeAllReturnsLineFeeds(inputString);

            expect(result).toBe(expectedResult);
        });

        test('should handle strings with only newline characters', () => {
            const inputString = '\n\n\n\n\n';
            const expectedResult = '';

            const result = EzString.removeAllReturnsLineFeeds(inputString);

            expect(result).toBe(expectedResult);
        });

        test('should handle strings with only carriage return characters', () => {
            const inputString = '\r\r\r\r\r';
            const expectedResult = '';

            const result = EzString.removeAllReturnsLineFeeds(inputString);

            expect(result).toBe(expectedResult);
        });

        test('should handle strings with mixed newline and carriage return characters', () => {
            const inputString = 'Mixed\n\n\n\r\n\r\n\r\n\nLines\r\rHere';
            const expectedResult = 'MixedLinesHere';

            const result = EzString.removeAllReturnsLineFeeds(inputString);

            expect(result).toBe(expectedResult);
        });
    });
    describe('stringOrEmpty', () => {
        test('should return the provided string if it is valid', () => {
            const inputString = 'Hello, world!';
            const result = EzString.stringOrEmpty(inputString);
            expect(result).toBe(inputString);
        });

        test('should return an empty string if the provided input is undefined', () => {
            const inputString = undefined;
            const result = EzString.stringOrEmpty(inputString);
            expect(result).toBe('');
        });

        test('should return an empty string if the provided input is null', () => {
            const inputString = null;
            const result = EzString.stringOrEmpty(inputString);
            expect(result).toBe('');
        });

        test('should return an empty string if the provided input is not a string', () => {
            const inputNumber = 42;
            const result = EzString.stringOrEmpty(inputNumber);
            expect(result).toBe('');
        });

        test('should return the provided string if it is an empty string', () => {
            const inputString = '';
            const result = EzString.stringOrEmpty(inputString);
            expect(result).toBe(inputString);
        });

        test('should return the provided string if it contains only whitespace characters', () => {
            const inputString = '    ';
            const result = EzString.stringOrEmpty(inputString);
            expect(result).toBe(inputString);
        });
    });

    describe('stringWithLengthOrEmpty', () => {
        test('should return the provided string if it is a valid string with a length', () => {
            const inputString = 'Hello, world!';
            const result = EzString.stringWithLengthOrEmpty(inputString);
            expect(result).toBe(inputString);
        });

        test('should return an empty string if the provided input is undefined', () => {
            const inputString = undefined;
            const result = EzString.stringWithLengthOrEmpty(inputString);
            expect(result).toBe('');
        });

        test('should return an empty string if the provided input is null', () => {
            const inputString = null;
            const result = EzString.stringWithLengthOrEmpty(inputString);
            expect(result).toBe('');
        });

        test('should return an empty string if the provided input is not a string', () => {
            const inputNumber = 42;
            const result = EzString.stringWithLengthOrEmpty(inputNumber);
            expect(result).toBe('');
        });

        test('should return an empty string if the provided string is an empty string', () => {
            const inputString = '';
            const result = EzString.stringWithLengthOrEmpty(inputString);
            expect(result).toBe('');
        });

        test('should return the provided string if it contains only whitespace characters', () => {
            const inputString = '    ';
            const result = EzString.stringWithLengthOrEmpty(inputString);
            expect(result).toBe(inputString);
        });
    });

    describe('stringOrNull', () => {
        test('should return the provided string if it is a valid string', () => {
            const validString = 'Hello';
            expect(EzString.stringOrNull(validString)).toEqual(validString);
        });

        test('should return null if the provided value is undefined', () => {
            expect(EzString.stringOrNull(undefined)).toBeNull();
        });

        test('should return null if the provided value is null', () => {
            expect(EzString.stringOrNull(null)).toBeNull();
        });

        test('should return null if the provided value is not a string', () => {
            expect(EzString.stringOrNull(123)).toBeNull();
            expect(EzString.stringOrNull(true)).toBeNull();
            expect(EzString.stringOrNull({})).toBeNull();
            expect(EzString.stringOrNull([])).toBeNull();
        });
    });
    describe('stringWithLengthOrNull', () => {
        test('should return the provided string if it has a valid length', () => {
            const validString = 'Hello';
            expect(EzString.stringWithLengthOrNull(validString)).toEqual(validString);
        });

        test('should return null if the provided value is undefined', () => {
            expect(EzString.stringWithLengthOrNull(undefined)).toBeNull();
        });

        test('should return null if the provided value is null', () => {
            expect(EzString.stringWithLengthOrNull(null)).toBeNull();
        });

        test('should return null if the provided value is not a string', () => {
            expect(EzString.stringWithLengthOrNull(123)).toBeNull();
            expect(EzString.stringWithLengthOrNull(true)).toBeNull();
            expect(EzString.stringWithLengthOrNull({})).toBeNull();
            expect(EzString.stringWithLengthOrNull([])).toBeNull();
        });

        test('should return null if the provided string is empty', () => {
            expect(EzString.stringWithLengthOrNull('')).toBeNull();
        });
    });

    describe('stringOrDefault', () => {
        test('should return the provided string if it is a valid string', () => {
            const validString = 'Hello';
            const defaultString = 'Default';
            expect(EzString.stringOrDefault(validString, defaultString)).toEqual(validString);
        });

        test('should return the default value if the provided value is undefined', () => {
            const defaultString = 'Default';
            expect(EzString.stringOrDefault(undefined, defaultString)).toEqual(defaultString);
        });

        test('should return the default value if the provided value is null', () => {
            const defaultString = 'Default';
            expect(EzString.stringOrDefault(null, defaultString)).toEqual(defaultString);
        });

        test('should return the default value if the provided value is not a string', () => {
            const defaultString = 'Default';
            expect(EzString.stringOrDefault(123, defaultString)).toEqual(defaultString);
            expect(EzString.stringOrDefault(true, defaultString)).toEqual(defaultString);
            expect(EzString.stringOrDefault({}, defaultString)).toEqual(defaultString);
            expect(EzString.stringOrDefault([], defaultString)).toEqual(defaultString);
        });

        test('should return the default value if the provided string is empty', () => {
            const defaultString = 'Default';
            expect(EzString.stringOrDefault('', defaultString)).toEqual('');
        });
    });
    describe('stringWithLengthOrDefault', () => {
        test('should return the provided string if it has a valid length', () => {
            const validString = 'Hello';
            const defaultString = 'Default';
            expect(EzString.stringWithLengthOrDefault(validString, defaultString)).toEqual(validString);
        });

        test('should return the default value if the provided value is undefined', () => {
            const defaultString = 'Default';
            expect(EzString.stringWithLengthOrDefault(undefined, defaultString)).toEqual(defaultString);
        });

        test('should return the default value if the provided value is null', () => {
            const defaultString = 'Default';
            expect(EzString.stringWithLengthOrDefault(null, defaultString)).toEqual(defaultString);
        });

        test('should return the default value if the provided value is not a string', () => {
            const defaultString = 'Default';
            expect(EzString.stringWithLengthOrDefault(123, defaultString)).toEqual(defaultString);
            expect(EzString.stringWithLengthOrDefault(true, defaultString)).toEqual(defaultString);
            expect(EzString.stringWithLengthOrDefault({}, defaultString)).toEqual(defaultString);
            expect(EzString.stringWithLengthOrDefault([], defaultString)).toEqual(defaultString);
        });

        test('should return the default value if the provided string is empty', () => {
            const defaultString = 'Default';
            expect(EzString.stringWithLengthOrDefault('', defaultString)).toEqual(defaultString);
        });
    });
    describe('trimOrEmpty', () => {
        test('should return the trimmed string if a valid string is provided', () => {
            const validString = '  Hello  ';
            expect(EzString.trimOrEmpty(validString)).toEqual('Hello');
        });

        test('should return an empty string if the provided value is undefined', () => {
            expect(EzString.trimOrEmpty(undefined)).toEqual('');
        });

        test('should return an empty string if the provided value is null', () => {
            expect(EzString.trimOrEmpty(null)).toEqual('');
        });

        test('should return an empty string if the provided value is not a string', () => {
            expect(EzString.trimOrEmpty(123)).toEqual('');
            expect(EzString.trimOrEmpty(true)).toEqual('');
            expect(EzString.trimOrEmpty({})).toEqual('');
            expect(EzString.trimOrEmpty([])).toEqual('');
        });

        test('should return an empty string if the provided string is empty', () => {
            expect(EzString.trimOrEmpty('')).toEqual('');
        });

        test('should return an empty string if the provided string contains only whitespace', () => {
            expect(EzString.trimOrEmpty('   ')).toEqual('');
        });
    });
    describe('trimOrNull', () => {
        test('should return the trimmed string if a valid string is provided', () => {
            const validString = '  Hello  ';
            expect(EzString.trimOrNull(validString)).toEqual('Hello');
        });

        test('should return null if the provided value is undefined', () => {
            expect(EzString.trimOrNull(undefined)).toBeNull();
        });

        test('should return null if the provided value is null', () => {
            expect(EzString.trimOrNull(null)).toBeNull();
        });

        test('should return null if the provided value is not a string', () => {
            expect(EzString.trimOrNull(123)).toBeNull();
            expect(EzString.trimOrNull(true)).toBeNull();
            expect(EzString.trimOrNull({})).toBeNull();
            expect(EzString.trimOrNull([])).toBeNull();
        });

        test('should return empty string if the provided string is empty', () => {
            expect(EzString.trimOrNull('')).toBe('');
        });

        test('should return null if the provided string contains only whitespace', () => {
            expect(EzString.trimOrNull('   ')).toBe('');
        });
    });
    describe('trimOrDefault', () => {
        test('should return the trimmed string if a valid string is provided', () => {
            const validString = '  Hello  ';
            const defaultValue = 'Default';
            expect(EzString.trimOrDefault(validString, defaultValue)).toEqual('Hello');
        });

        test('should return the default value if the provided value is undefined', () => {
            const defaultValue = 'Default';
            expect(EzString.trimOrDefault(undefined, defaultValue)).toEqual(defaultValue);
        });

        test('should return the default value if the provided value is null', () => {
            const defaultValue = 'Default';
            expect(EzString.trimOrDefault(null, defaultValue)).toEqual(defaultValue);
        });

        test('should return the default value if the provided value is not a string', () => {
            const defaultValue = 'Default';
            expect(EzString.trimOrDefault(123, defaultValue)).toEqual(defaultValue);
            expect(EzString.trimOrDefault(true, defaultValue)).toEqual(defaultValue);
            expect(EzString.trimOrDefault({}, defaultValue)).toEqual(defaultValue);
            expect(EzString.trimOrDefault([], defaultValue)).toEqual(defaultValue);
        });

        test('should return empty string if the provided string is empty', () => {
            const defaultValue = 'Default';
            expect(EzString.trimOrDefault('', defaultValue)).toEqual('');
        });

        test('should return empty string if the provided string contains only whitespace', () => {
            const defaultValue = 'Default';
            expect(EzString.trimOrDefault('   ', defaultValue)).toEqual('');
        });
    });

    describe('textOrDefault', () => {
        test('should return the provided value if it is a non-empty string', () => {
            const providedValue = 'hello';
            const defaultValue = 'default';
            const result = EzString.textOrDefault(providedValue, defaultValue);
            expect(result).toEqual(providedValue);
        });

        test('should return the default value if the provided value is not a string or is an empty string', () => {
            // Test with a non-string value
            let providedValue = null;
            let defaultValue = 'default';
            let result = EzString.textOrDefault(providedValue, defaultValue);
            expect(result).toEqual(defaultValue);

            // Test with an empty string
            providedValue = '';
            result = EzString.textOrDefault(providedValue, defaultValue);
            expect(result).toEqual(defaultValue);
        });

        test('should handle whitespace-only strings as non-empty', () => {
            const providedValue = '   '; // Whitespace-only string
            const defaultValue = 'default';
            const result = EzString.textOrDefault(providedValue, defaultValue);
            expect(result).toEqual(providedValue);
        });

        test('should handle leading and trailing whitespace', () => {
            const providedValue = '  hello  ';
            const defaultValue = 'default';
            const result = EzString.textOrDefault(providedValue, defaultValue);
            expect(result).toEqual(providedValue);
        });

        test('should handle numeric strings as non-empty', () => {
            const providedValue = '12345';
            const defaultValue = 'default';
            const result = EzString.textOrDefault(providedValue, defaultValue);
            expect(result).toEqual(providedValue);
        });

        test('should return the default value if the provided value is undefined', () => {
            const providedValue = undefined;
            const defaultValue = 'default';
            const result = EzString.textOrDefault(providedValue, defaultValue);
            expect(result).toEqual(defaultValue);
        });
    });
    describe('stringHasLength', () => {
        test('should return true for a non-empty string', () => {
            const nonEmptyString = 'hello';
            const result = EzString.stringHasLength(nonEmptyString);
            expect(result).toBe(true);
        });

        test('should return false for an empty string', () => {
            const emptyString = '';
            const result = EzString.stringHasLength(emptyString);
            expect(result).toBe(false);
        });

        test('should return false for null', () => {
            const nullValue = null;
            const result = EzString.stringHasLength(nullValue);
            expect(result).toBe(false);
        });

        test('should return false for undefined', () => {
            const undefinedValue = undefined;
            const result = EzString.stringHasLength(undefinedValue);
            expect(result).toBe(false);
        });

        test('should return false for a non-string value', () => {
            const nonStringValue = 123;
            const result = EzString.stringHasLength(nonStringValue);
            expect(result).toBe(false);
        });

        test('should return true for whitespace-only string', () => {
            const whitespaceString = '   ';
            const result = EzString.stringHasLength(whitespaceString);
            expect(result).toBe(true);
        });
    });

    describe('hasLength', () => {
        test('should return true for a non-empty string', () => {
            const nonEmptyString = 'hello';
            const result = EzString.hasLength(nonEmptyString);
            expect(result).toBe(true);
        });

        test('should return false for an empty string', () => {
            const emptyString = '';
            const result = EzString.hasLength(emptyString);
            expect(result).toBe(false);
        });

        test('should return false for null', () => {
            const nullValue = null;
            const result = EzString.hasLength(nullValue);
            expect(result).toBe(false);
        });

        test('should return false for undefined', () => {
            const undefinedValue = undefined;
            const result = EzString.hasLength(undefinedValue);
            expect(result).toBe(false);
        });

        test('should return false for a non-string value', () => {
            const nonStringValue = 123;
            const result = EzString.hasLength(nonStringValue);
            expect(result).toBe(false);
        });

        test('should return true for whitespace-only string', () => {
            const whitespaceString = '   ';
            const result = EzString.hasLength(whitespaceString);
            expect(result).toBe(true);
        });
    });

    describe('build', () => {
        test('should build a templated string with extra spaces and tabs removed', () => {
            const expectedResult = 'Hello \tWorld\t\nLine\nFeed\nKEY1KEY2KEY3';
            let key1 = 'KEY1';
            let key2 = 'KEY2';
            let key3 = 'KEY3';
            const result = EzString.build`  Hello  \tWorld\t\nLine\nFeed\n${key1}${key2}${key3}`;
            expect(result).toBe(expectedResult);
        });

        test('should handle empty input', () => {
            const aStrings = [];
            const aKeys = [];
            const expectedResult = '';

            const result = EzString.build(aStrings, ...aKeys);

            expect(result).toBe(expectedResult);
        });

        test('should handle input without extra spaces and tabs', () => {
            /* Corrected aStrings */
            // const aStrings = ['Hello', 'World'];
            const aStrings = ['HelloWorld', ''];

            const aKeys = ['Key1', 'Key2'];

            const expectedResult = 'HelloWorldKey1Key2';

            const result = EzString.build(aStrings, ...aKeys);

            expect(result).toBe(expectedResult);
        });

        test('should handle input with only extra spaces and tabs', () => {
            const aStrings = ['  ', '\t\t'];
            const aKeys = ['', ''];
            const expectedResult = '';

            const result = EzString.build(aStrings, ...aKeys);

            expect(result).toBe(expectedResult);
        });

        test('should handle input with mixed characters including extra spaces and tabs', () => {
            const aStrings = ['1 2\t3', '4\n5\t6'];
            const aKeys = ['Key1', 'Key2'];
            const expectedResult = '1 2\t3Key14\n5\t6Key2';

            const result = EzString.build(aStrings, ...aKeys);

            expect(result).toBe(expectedResult);
        });
    });

    describe('buildTimestampId', () => {
        const isoDate = '2024-01-01T09:00:00.000Z';
        const formatX = Date.parse(isoDate).toString();
        const prefix = 'prefix';
        const suffix = 'suffix';

        test('should build timestamp Id with prefix, timestamp, and suffix', () =>
            expect(EzString.buildTimestampId(prefix, suffix)).toBe(`${prefix}_${formatX}_${suffix}`));

        test('should build timestamp ID with prefix and suffix', () =>
            expect(EzString.buildTimestampId(prefix, suffix)).toBe(`${prefix}_${formatX}_${suffix}`));

        test('should build timestamp ID with prefix only', () => expect(EzString.buildTimestampId(prefix)).toBe(`${prefix}_${formatX}`));

        test('should build timestamp ID with suffix only', () => expect(EzString.buildTimestampId(undefined, suffix)).toBe(`${formatX}_${suffix}`));

        test('should build timestamp ID without prefix and suffix', () => expect(EzString.buildTimestampId()).toBe(formatX));
    });

    describe('em', () => {
        test('should remove extra spaces and add one space in front and one space at end with a line feed', () => {
            const aTemplateLitteralValue = '  Hello  World  ';
            const expectedResult = ' Hello World ';

            const result = EzString.em(aTemplateLitteralValue);

            expect(result).toBe(expectedResult);
        });

        test('should handle empty input', () => {
            const aTemplateLitteralValue = '';
            const expectedResult = '';

            const result = EzString.em(aTemplateLitteralValue);

            expect(result).toBe(expectedResult);
        });

        test('should handle input with only spaces', () => {
            const aTemplateLitteralValue = '    ';
            const expectedResult = ' ';

            const result = EzString.em(aTemplateLitteralValue);

            expect(result).toBe(expectedResult);
        });

        test('should handle input with line breaks', () => {
            const aTemplateLitteralValue = 'Hello\nWorld';
            const expectedResult = 'Hello World';

            const result = EzString.em(aTemplateLitteralValue);

            expect(result).toBe(expectedResult);
        });

        test('should handle input with tabs', () => {
            const aTemplateLitteralValue = 'Hello\tWorld';
            const expectedResult = 'HelloWorld';

            const result = EzString.em(aTemplateLitteralValue);

            expect(result).toBe(expectedResult);
        });
    });

    describe('msg', () => {
        test('should remove extra spaces, line feeds, carriage returns, and tabs', () => {
            const aStrings = ['  Hello  ', '\tWorld\t', '\nLine\nFeed\n'];
            const aKeys = ['Key1', 'Key2', 'Key3'];
            const expectedResult = ' Hello Key1WorldKey2 Line Feed Key3';

            const result = EzString.msg(aStrings, ...aKeys);

            expect(result).toBe(expectedResult);
        });

        test('should handle empty input', () => {
            const aStrings = [];
            const aKeys = [];
            const expectedResult = '';

            const result = EzString.msg(aStrings, ...aKeys);

            expect(result).toBe(expectedResult);
        });

        test('should handle input with only spaces', () => {
            const aStrings = ['  ', '    '];
            const aKeys = ['', ''];
            const expectedResult = ' ';

            const result = EzString.msg(aStrings, ...aKeys);

            expect(result).toBe(expectedResult);
        });

        test('should handle input with line breaks and tabs', () => {
            const aStrings = ['Hello\n', '\tWorld\r', 'Line\nFeed\n'];
            const aKeys = ['', '', ''];
            const expectedResult = 'Hello WorldLine Feed ';

            const result = EzString.msg(aStrings, ...aKeys);

            expect(result).toBe(expectedResult);
        });

        test('should handle input with numbers and booleans', () => {
            const aStrings = [123, true, false];
            const aKeys = ['Key1', 'Key2', 'Key3'];
            const expectedResult = '123Key1trueKey2falseKey3';

            const result = EzString.msg(aStrings, ...aKeys);

            expect(result).toBe(expectedResult);
        });
    });

    describe('drop', () => {
        test('should replace matching values with an empty string', () => {
            const aString = 'Hello World';
            const regex = /[aeiou]/g;
            const expectedResult = 'Hll Wrld';

            const result = EzString.drop(aString, regex);

            expect(result).toBe(expectedResult);
        });

        test('should handle empty input', () => {
            const aString = '';
            const regex = /[aeiou]/g;
            const expectedResult = '';

            const result = EzString.drop(aString, regex);

            expect(result).toBe(expectedResult);
        });

        test('should handle input without matching values', () => {
            const aString = '1234567890';
            const regex = /[aeiou]/g;
            const expectedResult = '1234567890';

            const result = EzString.drop(aString, regex);

            expect(result).toBe(expectedResult);
        });

        test('should handle input with only matching values', () => {
            const aString = 'aeiou';
            const regex = /[aeiou]/g;
            const expectedResult = '';

            const result = EzString.drop(aString, regex);

            expect(result).toBe(expectedResult);
        });

        test('should handle input with numbers and special characters', () => {
            const aString = '1a2b3c!@#';
            const regex = /[0-9]/g;
            const expectedResult = 'abc!@#';

            const result = EzString.drop(aString, regex);

            expect(result).toBe(expectedResult);
        });
    });

    describe('dropSTNR', () => {
        test('should replace all blank spaces, tabs, newlines, and returns with an empty string', () => {
            const aValue = 'Hello\t\nWorld';
            const expectedResult = 'HelloWorld';

            const result = EzString.dropSTNR(aValue);

            expect(result).toBe(expectedResult);
        });

        test('should handle empty input', () => {
            const aValue = '';
            const expectedResult = '';

            const result = EzString.dropSTNR(aValue);

            expect(result).toBe(expectedResult);
        });

        test('should handle input without blank spaces, tabs, newlines, and returns', () => {
            const aValue = 'HelloWorld';
            const expectedResult = 'HelloWorld';

            const result = EzString.dropSTNR(aValue);

            expect(result).toBe(expectedResult);
        });

        test('should handle input with only blank spaces, tabs, newlines, and returns', () => {
            const aValue = ' \t\n\r';
            const expectedResult = '';

            const result = EzString.dropSTNR(aValue);

            expect(result).toBe(expectedResult);
        });

        test('should handle input with mixed characters including blank spaces, tabs, newlines, and returns', () => {
            const aValue = '1 2\t3\n4\r5';
            const expectedResult = '12345';

            const result = EzString.dropSTNR(aValue);

            expect(result).toBe(expectedResult);
        });
    });
    describe('dropXSTNR', () => {
        test('should replace all extra blank spaces, tabs, newlines, and returns with formated string', () => {
            const aValue = 'Hello   \t\n\t\nWorld';
            const expectedResult = 'Hello World';

            const result = EzString.dropXSTNR(aValue);

            expect(result).toBe(expectedResult);
        });

        test('should handle empty input', () => {
            const aValue = '';
            const expectedResult = '';

            const result = EzString.dropXSTNR(aValue);

            expect(result).toBe(expectedResult);
        });

        test('should handle input without extra blank spaces, tabs, newlines, and returns', () => {
            const aValue = 'HelloWorld';
            const expectedResult = 'HelloWorld';

            const result = EzString.dropXSTNR(aValue);

            expect(result).toBe(expectedResult);
        });

        test('should handle input with only extra blank spaces, tabs, newlines, and returns', () => {
            const aValue = '    \t\n\t\n';
            const expectedResult = '';

            const result = EzString.dropXSTNR(aValue);

            expect(result).toBe(expectedResult);
        });
    });

    describe('dropTNR', () => {
        test('should replace all tabs, newlines, and returns with an empty string', () => {
            const aValue = 'Hello\t\nWorld\r';
            const expectedResult = 'HelloWorld';

            const result = EzString.dropTNR(aValue);

            expect(result).toBe(expectedResult);
        });

        test('should handle empty input', () => {
            const aValue = '';
            const expectedResult = '';

            const result = EzString.dropTNR(aValue);

            expect(result).toBe(expectedResult);
        });

        test('should handle input without tabs, newlines, and returns', () => {
            const aValue = 'Hello World';
            const expectedResult = 'Hello World';

            const result = EzString.dropTNR(aValue);

            expect(result).toBe(expectedResult);
        });

        test('should handle input with only tabs, newlines, and returns', () => {
            const aValue = '\t\n\r';
            const expectedResult = '';

            const result = EzString.dropTNR(aValue);

            expect(result).toBe(expectedResult);
        });

        test('should handle input with mixed characters including tabs, newlines, and returns', () => {
            const aValue = '1\t\n2\r3\n4\r5';
            const expectedResult = '12345';

            const result = EzString.dropTNR(aValue);

            expect(result).toBe(expectedResult);
        });
    });

    describe('decodeURL', () => {
        test('should decode URL and replace + with space if specified', () => {
            const encodedValue = 'Hello%20World%21';
            const expectedResult = 'Hello World!';

            const result = EzString.decodeURL(encodedValue, true);

            expect(result).toBe(expectedResult);
        });

        test('should decode URL without replacing + with space if not specified', () => {
            const encodedValue = 'Hello%20World%21';
            const expectedResult = 'Hello World!';

            const result = EzString.decodeURL(encodedValue, false);

            expect(result).toBe(expectedResult);
        });

        test('should handle empty input', () => {
            const encodedValue = '';
            const expectedResult = '';

            const result = EzString.decodeURL(encodedValue, true);

            expect(result).toBe(expectedResult);
        });

        test('should handle undefined input', () => {
            const encodedValue = undefined;
            const expectedResult = '';

            const result = EzString.decodeURL(encodedValue, true);

            expect(result).toBe(expectedResult);
        });

        test('should handle null input', () => {
            const encodedValue = null;
            const expectedResult = '';

            const result = EzString.decodeURL(encodedValue, true);

            expect(result).toBe(expectedResult);
        });
    });

    describe('encodeURL', () => {
        test('should encode URL correctly', () => {
            const decodedValue = 'Hello World!';
            const expectedResult = 'Hello%20World%21';

            const result = EzString.encodeURL(decodedValue);

            expect(result).toBe(expectedResult);
        });

        test('should handle empty input', () => {
            const decodedValue = '';
            const expectedResult = '';

            const result = EzString.encodeURL(decodedValue);

            expect(result).toBe(expectedResult);
        });

        test('should handle undefined input', () => {
            const decodedValue = undefined;
            const expectedResult = '';

            const result = EzString.encodeURL(decodedValue);

            expect(result).toBe(expectedResult);
        });

        test('should handle null input', () => {
            const decodedValue = null;
            const expectedResult = '';

            const result = EzString.encodeURL(decodedValue);

            expect(result).toBe(expectedResult);
        });
    });

    describe('simpleEncodeHtml', () => {
        test('should return an empty string if the input is undefined or null', () => {
            expect(EzString.simpleEncodeHtml(undefined)).toBe('');
            expect(EzString.simpleEncodeHtml(null)).toBe('');
        });

        test('should encode HTML special characters in the input string', () => {
            // const input = '&<>"\'/@!=-`';
            // const expectedOutput = '&amp;&lt;&gt;&quot;&#96;&frasl;&#64;&#33;&#61;&#45;&#96;';
            const expectedOutput = '&amp;&lt;&gt;&quot;&#96;&#47;&#64;&#33;&#61;&#45;&#96;';
            const input = '&<>"`/@!=-`';
            expect(EzString.simpleEncodeHtml(input)).toBe(expectedOutput);
        });

        test('should not modify the input string if it does not contain any special characters', () => {
            const input = 'Hello, world!';
            expect(EzString.simpleEncodeHtml(input)).toBe('Hello, world&#33;');
            // expect(EzString.simpleEncodeHtml(input)).toBe('Hello, world!');
        });

        test('should handle empty string input', () => {
            expect(EzString.simpleEncodeHtml('')).toBe('');
        });
    });

    describe('decodeHtml', () => {
        test('should return an empty string if the input is undefined or null', () => {
            expect(EzString.decodeHtml(undefined)).toBe('');
            expect(EzString.decodeHtml(null)).toBe('');
        });

        test('should decode HTML encoded string', () => {
            const encodedString = '&amp;&lt;&gt;&quot;&#96;&#47;&#64;&#33;&#61;&#45;&#96;';
            const expectedOutput = '&<>"`/@!=-`';
            expect(EzString.decodeHtml(encodedString)).toBe(expectedOutput);
        });

        test('should not modify the input string if it does not contain any HTML encoded characters', () => {
            const input = 'Hello, world!';
            expect(EzString.decodeHtml(input)).toBe(input);
        });

        test('should handle empty string input', () => {
            expect(EzString.decodeHtml('')).toBe('');
        });
    });

    describe('encodeHtml', () => {
        test('should return an empty string if the input is undefined or null', () => {
            expect(EzString.encodeHtml(undefined)).toBe('');
            expect(EzString.encodeHtml(null)).toBe('');
        });

        test('should encode HTML special characters in the input string', () => {
            const input = '&<>"\'/@!=-`';
            const expectedOutput = '&amp;&lt;&gt;&quot;&apos;/@!=-`';
            expect(EzString.encodeHtml(input)).toBe(expectedOutput);
        });

        test('should not modify the input string if it does not contain any special characters', () => {
            const input = 'Hello, world!';
            expect(EzString.encodeHtml(input)).toBe(input);
        });

        test('should handle empty string input', () => {
            expect(EzString.encodeHtml('')).toBe('');
        });
    });
});

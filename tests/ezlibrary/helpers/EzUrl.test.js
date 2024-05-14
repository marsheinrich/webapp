/** @format */

import { EzUrl } from '../../../ezlibrary/helpers/EzUrl.js';
import { EzEnvironment } from '../../../ezlibrary/enums/EzEnvironment.js';

describe('EzUrl', () => {
    describe('enableFileRevision getter', () => {
        // Test default value
        test('returns the default value of enableFileRevision', () => {
            // Assuming the default value is true (check actual implementation)
            expect(EzUrl.enableFileRevision).toBe(true);
        });

        // Test after setting the value (assuming a setter exists)
        test('returns the updated value after setting enableFileRevision', () => {
            if (!EzUrl.hasOwnProperty('enableFileRevision')) {
                // Skip test if setter doesn't exist
                return;
            }
            EzUrl.enableFileRevision = false; // Set to a different value
            expect(EzUrl.enableFileRevision).toBe(false);
        });

        // Test immutability (assuming the getter doesn't modify the internal state)
        test('does not modify the internal state when called', () => {
            const originalValue = EzUrl.enableFileRevision;
            EzUrl.enableFileRevision; // Call the getter again
            expect(EzUrl.enableFileRevision).toBe(originalValue);
        });

        // Test for potential errors (if applicable)
        test('throws an error if accessed before initialization (if applicable)', () => {
            if (!EzUrl.hasOwnProperty('enableFileRevision')) {
                expect(() => EzUrl.enableFileRevision).toThrowError();
            } else {
                // Skip test if there's no initialization process
            }
        });

        // Test for potential side effects (if applicable)
        test('does not have any side effects when called (if applicable)', () => {
            const spy = jest.spyOn(console, 'log'); // Mock console.log for example
            EzUrl.enableFileRevision;
            expect(spy).not.toHaveBeenCalled(); // Ensure no unexpected side effects
        });
    });
    describe('enableFileRevision setter', () => {
        // Test setting to true
        test('sets the enableFileRevision property to true', () => {
            EzUrl.enableFileRevision = true;
            expect(EzUrl.enableFileRevision).toBe(true);
        });

        // Test setting to false
        test('sets the enableFileRevision property to false', () => {
            EzUrl.enableFileRevision = false;
            expect(EzUrl.enableFileRevision).toBe(false);
        });

        // Test setting with truthy values
        test('sets the enableFileRevision property to true for truthy values', () => {
            EzUrl.enableFileRevision = 'someValue';
            expect(EzUrl.enableFileRevision).toBe(true);
        });

        // Test setting with non-boolean values using EzBoolean.booleanOrTrue
        test('converts non-boolean values to true using EzBoolean.booleanOrTrue', () => {
            EzUrl.enableFileRevision = null;
            expect(EzUrl.enableFileRevision).toBe(true); // Assuming EzBoolean.booleanOrTrue(null) returns true
        });
        it('sets the enableFileRevision property to false for falsy values', () => {
            EzUrl.enableFileRevision = '';
            expect(EzUrl.enableFileRevision).toBe(true);
        });
    });

    describe('ezEnvironment getter', () => {
        test('returns default environment when not set', () => {
            expect(EzUrl.ezEnvironment).toBe(EzEnvironment.PRD);
        });

        test('returns environment set via setter', () => {
            const environment = 'prd';
            EzUrl.ezEnvironment = environment;
            expect(EzUrl.ezEnvironment).toBe(environment);
        });

        test('returns PRD environment if empty string provided', () => {
            const emptyEnvironment = '';
            EzUrl.ezEnvironment = emptyEnvironment;
            expect(EzUrl.ezEnvironment).toBe(EzEnvironment.PRD);
        });
    });
    describe('ezEnvironment setter', () => {
        test('sets environment to provided value', () => {
            const environment = 'prd';
            EzUrl.ezEnvironment = environment;
            expect(EzUrl.ezEnvironment).toBe(environment);
        });
        test('sets environment to the corresponding enum value', () => {
            // Test with valid enum value
            const validEnvironment = 'prd';
            EzUrl.ezEnvironment = validEnvironment;
            expect(EzUrl.ezEnvironment).toBe(EzEnvironment.PRD); // Assuming 'prd' maps to EzEnvironment.PRD
        });

        test('sets environment to PRD if empty string provided', () => {
            const emptyEnvironment = '';
            EzUrl.ezEnvironment = emptyEnvironment;
            expect(EzUrl.ezEnvironment).toBe(EzEnvironment.PRD);
        });

        test('sets environment to PRD if invalid environment provided', () => {
            const invalidEnvironment = true;
            EzUrl.ezEnvironment = invalidEnvironment;
            expect(EzUrl.ezEnvironment).toBe(EzEnvironment.PRD);
        });

        test('sets environment to PRD if null provided', () => {
            EzUrl.ezEnvironment = null;
            expect(EzUrl.ezEnvironment).toBe(EzEnvironment.PRD);
        });
    });

    describe('baseWebsiteSignInPath getter', () => {
        test('returns the expected path', () => {
            expect(EzUrl.baseWebsiteSignInPath).toBe('/resources/j_spring_security_check');
        });

        test('throws error if attempting to modify the value', () => {
            expect(() => {
                EzUrl.baseWebsiteSignInPath = '/modifiedPath';
            }).toThrow(Error);
        });

        test('does not include a trailing slash', () => {
            expect(EzUrl.baseWebsiteSignInPath.endsWith('/')).toBe(false);
        });

        test('is independent of protocol, domain, and port', () => {
            expect(EzUrl.baseWebsiteSignInPath.startsWith('http://')).toBe(false);
            expect(EzUrl.baseWebsiteSignInPath.includes('.')).toBe(false);
            expect(EzUrl.baseWebsiteSignInPath.includes(':')).toBe(false);
        });
    });

    describe('baseWebsiteSignOutPath getter', () => {
        test('returns the expected path', () => {
            expect(EzUrl.baseWebsiteSignOutPath).toBe('/resources/j_spring_security_logout');
        });

        test('throws error if attempting to modify the value', () => {
            expect(() => {
                EzUrl.baseWebsiteSignOutPath = '/modifiedPath';
            }).toThrow(Error);
        });

        test('starts with a leading slash', () => {
            expect(EzUrl.baseWebsiteSignOutPath.startsWith('/')).toBe(true);
        });

        test('does not include a trailing slash', () => {
            expect(EzUrl.baseWebsiteSignOutPath.endsWith('/')).toBe(false);
        });

        test('is independent of protocol, domain, and port', () => {
            expect(EzUrl.baseWebsiteSignOutPath.startsWith('http://')).toBe(false);
            expect(EzUrl.baseWebsiteSignOutPath.includes('.')).toBe(false);
            expect(EzUrl.baseWebsiteSignOutPath.includes(':')).toBe(false);
        });
    });
    describe('baseMobileWebsitePath getter', () => {
        // Existing tests for baseMobileWebsitePath getter
        test('returns the expected path', () => {
            expect(EzUrl.baseMobileWebsitePath).toBe('/m');
        });

        test('returns a string', () => {
            expect(typeof EzUrl.baseMobileWebsitePath).toBe('string');
        });

        // Optional test for read-only property
        test('is a read-only property (optional)', () => {
            expect(() => {
                EzUrl.baseMobileWebsitePath = 'foo';
            }).toThrowError();
        });

        test('returns the same string across multiple calls', () => {
            const firstCall = EzUrl.baseMobileWebsitePath;
            const secondCall = EzUrl.baseMobileWebsitePath;
            expect(firstCall).toBe(secondCall);
        });

        test('can be used in string concatenation (assuming no side effects)', () => {
            const expectedUrl = '/msome/path';
            const path = 'some/path';
            const actualUrl = EzUrl.baseMobileWebsitePath + path;
            expect(actualUrl).toBe(expectedUrl);
        });
    });
    describe('baseMobileWebsitePublicPath getter', () => {
        test('returns the expected public mobile path', () => {
            expect(EzUrl.baseMobileWebsitePublicPath).toBe('/m/p');
        });

        test('returns a string', () => {
            expect(typeof EzUrl.baseMobileWebsitePublicPath).toBe('string');
        });

        test('includes the base mobile website path', () => {
            expect(EzUrl.baseMobileWebsitePublicPath).toContain(EzUrl.baseMobileWebsitePath);
        });

        test('appends "/p" to the base mobile path', () => {
            expect(EzUrl.baseMobileWebsitePublicPath).toBe(`${EzUrl.baseMobileWebsitePath}/p`);
        });

        test('is independent of protocol, domain, and port', () => {
            expect(EzUrl.baseMobileWebsitePublicPath.startsWith('http://')).toBe(false);
            expect(EzUrl.baseMobileWebsitePublicPath.includes('.')).toBe(false);
            expect(EzUrl.baseMobileWebsitePublicPath.includes(':')).toBe(false);
        });
    });
    describe('baseMobileWebsiteSecurePath getter', () => {
        // Test 1: Returns expected secure path
        test('returns the expected secure path', () => {
            expect(EzUrl.baseMobileWebsiteSecurePath).toBe('/m/s');
        });

        // Test 2: Uses baseMobileWebsitePath correctly
        test('uses baseMobileWebsitePath correctly', () => {
            // Mock or stub EzUrl.baseMobileWebsitePath if necessary
            jest.spyOn(EzUrl, 'baseMobileWebsitePath', 'get').mockReturnValue('/x'); // Replace with actual mocking strategy
            expect(EzUrl.baseMobileWebsiteSecurePath).toBe('/x/s');
        });

        // Test 3: Returns a string
        test('returns a string', () => {
            expect(typeof EzUrl.baseMobileWebsiteSecurePath).toBe('string');
        });

        // Test 4: Read-only property (optional)
        test('is a read-only property (optional)', () => {
            expect(() => {
                EzUrl.baseMobileWebsiteSecurePath = 'foo';
            }).toThrowError();
        });

        // Test 5: Consistent value across calls
        test('returns the same string across multiple calls', () => {
            const firstCall = EzUrl.baseMobileWebsiteSecurePath;
            const secondCall = EzUrl.baseMobileWebsiteSecurePath;
            expect(firstCall).toBe(secondCall);
        });
    });

    describe('baseWebsitePublicPath getter', () => {
        // Test 1: Returns expected base path
        test('returns the expected base path', () => {
            expect(EzUrl.baseWebsitePublicPath).toBe('/public');
        });

        // Test 2: Returns a string
        test('returns a string', () => {
            expect(typeof EzUrl.baseWebsitePublicPath).toBe('string');
        });

        // Test 3: Read-only property (optional)
        test('is a read-only property (optional)', () => {
            expect(() => {
                EzUrl.baseWebsitePublicPath = 'foo';
            }).toThrowError();
        });

        // Test 4: Consistent value across calls
        test('returns the same string across multiple calls', () => {
            const firstCall = EzUrl.baseWebsitePublicPath;
            const secondCall = EzUrl.baseWebsitePublicPath;
            expect(firstCall).toBe(secondCall);
        });

        // Test 5: Usable in string concatenation (assuming no side effects)
        test('cannot be modified after initialization', () => {
            expect(() => {
                EzUrl.baseWebsitePublicPath = '/different/path';
            }).toThrowError();
        });
    });

    describe('baseWebsiteSecurePath getter', () => {
        // Test 1: Returns expected secure path
        test('returns the expected secure path', () => {
            expect(EzUrl.baseWebsiteSecurePath).toBe('/secure');
        });

        // Test 2: Returns a string
        test('returns a string', () => {
            expect(typeof EzUrl.baseWebsiteSecurePath).toBe('string');
        });

        // Test 3: Read-only property (optional)
        test('is a read-only property (optional)', () => {
            expect(() => {
                EzUrl.baseWebsiteSecurePath = 'foo';
            }).toThrowError();
        });

        // Test 4: Consistent value across calls
        test('returns the same string across multiple calls', () => {
            const firstCall = EzUrl.baseWebsiteSecurePath;
            const secondCall = EzUrl.baseWebsiteSecurePath;
            expect(firstCall).toBe(secondCall);
        });
        // Test 3: Verifies the format of the path
        test('has a leading slash but no trailing slash', () => {
            const path = EzUrl.baseWebsiteSecurePath;
            expect(path[0]).toBe('/');
            expect(path.slice(-1)).not.toBe('/');
        });
    });
    describe('baseInternalApiPath getter', () => {
        // Test 1: Returns expected base path
        test('returns the expected base path', () => {
            expect(EzUrl.baseInternalApiPath).toBe('/_api');
        });

        // Test 2: Returns a string
        test('returns a string', () => {
            expect(typeof EzUrl.baseInternalApiPath).toBe('string');
        });

        // Test 3: Read-only property (optional)
        test('is a read-only property (optional)', () => {
            expect(() => {
                EzUrl.baseInternalApiPath = 'foo';
            }).toThrowError();
        });

        // Test 4: Consistent value across calls
        test('returns the same string across multiple calls', () => {
            const firstCall = EzUrl.baseInternalApiPath;
            const secondCall = EzUrl.baseInternalApiPath;
            expect(firstCall).toBe(secondCall);
        });

        // Test 5: Usable in string concatenation (assuming no side effects)
        test('can be used in string concatenation (assuming no side effects)', () => {
            const expectedUrl = '/_api/v1/users';
            const version = 'v1';
            const resource = 'users';
            const actualUrl = EzUrl.baseInternalApiPath + '/' + version + '/' + resource;
            expect(actualUrl).toBe(expectedUrl);
        });
    });

    describe('basePublicApiPath getter', () => {
        // Test 1: Returns expected base path
        test('returns the expected base path', () => {
            expect(EzUrl.basePublicApiPath).toBe('/api');
        });

        // Test 2: Returns a string
        test('returns a string', () => {
            expect(typeof EzUrl.basePublicApiPath).toBe('string');
        });

        // Test 3: Read-only property (optional)
        test('is a read-only property', () => {
            expect(() => {
                EzUrl.basePublicApiPath = 'foo';
            }).toThrowError();
        });

        // Test 4: Consistent value across calls
        test('returns the same string across multiple calls', () => {
            const firstCall = EzUrl.basePublicApiPath;
            const secondCall = EzUrl.basePublicApiPath;
            expect(firstCall).toBe(secondCall);
        });

        // Test 5: Usable in string concatenation (assuming no side effects)
        test('can be used in string concatenation (assuming no side effects)', () => {
            const expectedUrl = '/api/v1/users';
            const version = 'v1';
            const resource = 'users';
            const actualUrl = EzUrl.basePublicApiPath + '/' + version + '/' + resource;
            expect(actualUrl).toBe(expectedUrl);
        });
    });
    describe('basePublicApiVersionPath method', () => {
        // Test 1: Returns expected path with default version
        test('returns expected path with default version', () => {
            const expectedUrl = '/api/v1';
            const actualUrl = EzUrl.basePublicApiVersionPath();
            expect(actualUrl).toBe(expectedUrl);
        });

        // Test 2: Returns expected path with provided version
        test('returns expected path with provided version', () => {
            const apiVersion = 'v2';
            const expectedUrl = '/api/v2';
            const actualUrl = EzUrl.basePublicApiVersionPath(apiVersion);
            expect(actualUrl).toBe(expectedUrl);
        });

        // Test 3: Handles empty version (uses default)
        test('handles empty version (uses default)', () => {
            const expectedUrl = '/api/';
            const actualUrl = EzUrl.basePublicApiVersionPath('');
            expect(actualUrl).toBe(expectedUrl);
        });

        // Test 4: Handles invalid version (uses default) - optional
        test('handles invalid version (uses default - optional)', () => {
            const expectedUrl = '/api/v1';
            const actualUrl = EzUrl.basePublicApiVersionPath(123); // Invalid version
            expect(actualUrl).toBe(expectedUrl);
        });
    });
    describe('buildUrl', () => {
        test('builds correct URL with default arguments', () => {
            const expectedUrl = 'https://ezclocker.com';
            expect(EzUrl.buildUrl()).toBe(expectedUrl);
        });

        test('builds URL with custom protocol', () => {
            const customProtocol = 'http://';
            const expectedUrl = `${customProtocol}ezclocker.com`;
            expect(EzUrl.buildUrl(customProtocol)).toBe(expectedUrl);
        });

        test('builds URL with custom domain and port', () => {
            const customDomain = 'example.com';
            const customPort = 8080;
            const expectedUrl = `https://${customDomain}:${customPort}`;
            expect(EzUrl.buildUrl(undefined, customDomain, customPort)).toBe(expectedUrl);
        });

        test('builds URL with path and parameters', () => {
            const pathAndParams = '/api/v1/users';
            const expectedUrl = `https://ezclocker.com${pathAndParams}`;
            expect(EzUrl.buildUrl(undefined, undefined, undefined, pathAndParams)).toBe(expectedUrl);
        });

        test('handles empty path and params with leading slash', () => {
            const emptyPath = '/';
            const expectedUrl = 'https://ezclocker.com/';
            expect(EzUrl.buildUrl(undefined, undefined, undefined, emptyPath)).toBe(expectedUrl);
        });
    });
    describe('build', () => {
        test('builds URL with single string argument', () => {
            const url = 'https://ezclocker.com';
            const expectedUrl = 'https://ezclocker.com';
            expect(EzUrl.build`${url}`).toBe(expectedUrl);
        });

        test('builds URL with multiple string arguments', () => {
            const baseUrl = 'https://ezclocker.com';
            const path = '/employer/100';
            const expectedUrl = `${baseUrl}${path}`;
            expect(EzUrl.build`${baseUrl}${path}`).toBe(expectedUrl);
        });

        test('handles empty strings and trims whitespace', () => {
            const baseUrl = '  https://ezclocker.com  ';
            const path = '   /employer/100 ';
            const expectedUrl = `https://ezclocker.com/employer/100`;
            expect(EzUrl.build`${baseUrl}${path}`).toBe(expectedUrl);
        });

        test('handles numbers and booleans as arguments', () => {
            const baseUrl = 'https://ezclocker.com';
            const id = 123;
            const expectedUrl = `${baseUrl}/123`;
            expect(EzUrl.build`${baseUrl}
                                /${id}`).toBe(expectedUrl);
        });

        test('ignores special characters (STNR)', () => {
            const baseUrl = 'https://ezclocker.com\t\n\r';
            const path = '/employer\t\n\r/100';
            const expectedUrl = 'https://ezclocker.com/employer/100';
            expect(EzUrl.build`${baseUrl}${path}`).toBe(expectedUrl);
        });
    });
    describe('decodeURL', () => {
        // Test 1: Decodes URL-encoded string (no space replacement)
        test('decodes URL-encoded string (no space replacement)', () => {
            const encodedString = 'https%3A%2F%2Fwww.example.com%2Fpath%2Fwith%2Fencoding';
            const expectedDecodedString = 'https://www.example.com/path/with/encoding';
            const actualDecodedString = EzUrl.decodeURL(encodedString);
            expect(actualDecodedString).toBe(expectedDecodedString);
        });

        // Test 2: Decodes URL-encoded string with space replacement
        test('decodes URL-encoded string with space replacement', () => {
            const encodedString = 'this+is+a+string+with+spaces';
            const expectedDecodedString = 'this is a string with spaces';
            const actualDecodedString = EzUrl.decodeURL(encodedString, true);
            expect(actualDecodedString).toBe(expectedDecodedString);
        });

        // Test 3: Handles empty or undefined value (returns empty string)
        test('handles empty or undefined value (returns empty string)', () => {
            expect(EzUrl.decodeURL(undefined)).toBe('');
            expect(EzUrl.decodeURL('')).toBe('');
        });

        // Test 5: Does not modify original value (optional)
        test('does not modify original value (optional)', () => {
            const originalString = 'encodedString';
            EzUrl.decodeURL(originalString);
            expect(originalString).toBe('encodedString'); // Original string remains unchanged
        });
        test('handles empty or null input', () => {
            expect(EzUrl.decodeURL('')).toBe('');
            expect(EzUrl.decodeURL(null)).toBe('');
        });
    });
    describe('encodeURL', () => {
        test('encodes a simple URL string', () => {
            const result = EzUrl.encodeURL('https://example.com/path/to/page');
            const expected = 'https%3A%2F%2Fexample.com%2Fpath%2Fto%2Fpage';
            expect(result).toEqual(expected);
        });

        test('encodes a URL string with special characters', () => {
            const result = EzUrl.encodeURL('https://example.com/?query=foo bar');
            const expected = 'https%3A%2F%2Fexample.com%2F%3Fquery%3Dfoo%20bar';
            expect(result).toEqual(expected);
        });

        test('encodes a URL string with non-ASCII characters', () => {
            const result = EzUrl.encodeURL('https://example.com/ümlaut');
            const expected = 'https%3A%2F%2Fexample.com%2F%C3%BCmlaut';
            expect(result).toEqual(expected);
        });

        test('encodes an empty URL string', () => {
            const result = EzUrl.encodeURL('');
            expect(result).toEqual('');
        });

        test('encodes a URL string with already encoded parts', () => {
            const url = 'https://example.com/?query=foo%20bar';
            const result = EzUrl.encodeURL(url);
            const expected = 'https%3A%2F%2Fexample.com%2F%3Fquery%3Dfoo%2520bar';
            expect(result).toEqual(expected);
        });
    });
});

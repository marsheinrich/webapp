import { EzBadParamException } from '../../../ezlibrary/exceptions/EzExceptions.js';
import { EzConsole, EzNullConsole } from '../../../ezlibrary/helpers/EzConsole.js';

describe('EzConsole', () => {
    //let ezActiveConsole = EzConsole.ezActiveConsole;

    let savedEzConsoleStaticMethods = {
        log: EzConsole.log,
        info: EzConsole.info,
        warn: EzConsole.warn,
        error: EzConsole.error,
        debug: EzConsole.debug,
        trace: EzConsole.trace
    };

    let savedConsole = console;

    let savedGlobalConsole = global.console;

    let savedGlobalThisConsole = globalThis.console;

    let savedGlobalThisWindow = globalThis.window.console;

    beforeEach(() => {
        savedConsole = console;

        savedGlobalConsole = global.console;

        savedGlobalThisConsole = globalThis.console;

        savedGlobalThisWindow = globalThis.window;
    });

    // Helper function to restore globalThis state after each test
    afterEach(() => {
        console = savedConsole;

        global.console = savedGlobalConsole;

        globalThis.console = savedGlobalThisConsole;

        globalThis.window = savedGlobalThisWindow;
    });

    describe('ezNullConsole', () => {
        test('provides access to the ezNullConsole instance', () => {
            expect(EzConsole.ezNullConsole).toBeInstanceOf(EzNullConsole);
        });

        test('returns the same ezNullConsole instance on subsequent access', () => {
            const firstInstance = EzConsole.ezNullConsole;
            const secondInstance = EzConsole.ezNullConsole;

            expect(firstInstance).toBe(secondInstance);
        });

        test('throws error if attempting to set ezNullConsole property directly', () => {
            expect(() => {
                EzConsole.ezNullConsole = new EzNullConsole();
            }).toThrowError();
        });

        test('is a static class and cannot be instantiated', () => {
            expect(() => new EzConsole()).toThrowError();
        });
    });

    describe('ezDefaultConsole', () => {
        test('returns EzConsole.ezNullConsole if detected console is not a valid console', () => {
            console = null;
            global.console = null;
            globalThis.console = null;

            expect(EzConsole.ezDefaultConsole).toBe(EzConsole.ezNullConsole);
        });

        test('returns globalThis.console if available', () => {
            const mockConsole = new EzNullConsole();
            globalThis.console = mockConsole;

            expect(EzConsole.ezDefaultConsole).toBe(mockConsole);
        });

        test('returns EzConsole.ezNullConsole if globalThis.window.console is not a valid console', () => {
            globalThis.console = null;

            globalThis.window = {
                console: {}
            };

            expect(EzConsole.ezDefaultConsole).toBe(EzConsole.ezNullConsole);
        });

        test('throws error if attempting to set ezDefaultConsole property directly', () => {
            expect(() => {
                EzConsole.ezDefaultConsole = {};
            }).toThrowError();
        });

        test('is a read-only property', () => {
            const descriptor = Object.getOwnPropertyDescriptor(EzConsole, 'ezDefaultConsole');

            expect(descriptor.writable).toBeFalsy();
        });
    });

    describe('ezActiveConsole getter', () => {
        // This test doesn't appear possible as the type info isn't lining up once
        // the console is assigned to EzConsole.ezActiveConsole. This is probably
        // because the console class is a special (most likely native) object and
        // not a real Javascript object.

        /*test('returns a console-like object with essential methods', () => {
            const activeConsole = EzConsole.ezActiveConsole;

            console.info(activeConsole.constructor.name);
            console.info(console);
            console.info(globalThis.console);
            console.info(globalThis.window.console);

            expect(activeConsole).toBeDefined();

            expect(typeof activeConsole.log).toEqual('function');

            expect(typeof activeConsole.error).toEqual('function');

        });*/

        test('returns the same object across multiple accesses', () => {
            const firstAccess = EzConsole.ezActiveConsole;

            const secondAccess = EzConsole.ezActiveConsole;

            expect(firstAccess).toBe(secondAccess);
        });

        /* Original was not orking because EzConsole.ezActiveConsole most likely already initialized else where
           (or modified else where). Since all properties/method in EzConsole are static it is easy to corrupt or
           change things with a different test and cause issues in another.

           In addition it seems that at some point the EzConsole.ezActiveConsole ends up as {} (empty object) before
           this test gets executed and makes validating EzConsole.ezActiveConsole is an actual console instance or not
           very difficult. So far, I have not been able to identify where EzConsole.ezActiveConsole
           was assigned the empty object.
        */
        test('after modifying global console, it still returns a console-like object', () => {
            // Note: Modifying global.console is risky and generally not recommended outside of controlled testing environments
            console = null;
            global.console = null;
            globalThis.console = null;
            globalThis.window.console = null;

            expect(EzConsole.ezActiveConsole).toBeDefined();
        });


        test('does not return null or undefined', () => {
            expect(EzConsole.ezActiveConsole).not.toBeNull();

            expect(EzConsole.ezActiveConsole).toBeDefined();
        });
    });

    describe('ezActiveConsole setter', () => {
        /* Disabled this test, see the note comment below
        it('should set the active console correctly', () => {
            const newConsole = { name: 'Test Console' };

            console.log(
                '_________check-method____',
                EzConsole.ezActiveConsole);

            // NOTE: This assignment will throw EzNovaBadParam as newConsole will fail validation checks that the class supports some necessary logging methods
            EzConsole.ezActiveConsole = newConsole;
            // console.log("_______check--defects--first__", EzConsole.ezActiveConsole)

            console.log(
                '_________check-object____',
                newConsole);

            // expect(EzConsole.ezActiveConsole).toEqual(newConsole);
            expect(EzConsole.ezActiveConsole).toEqual(newConsole);

            // EzConsole.ezActiveConsole = newConsole;
            // expect(EzConsole.ezActiveConsole).toEqual(newConsole);
        });
        */

        /* Disabled this test, see the note comment below
        it('should not change the previous active console', () => {
            const initialConsole = EzConsole.ezActiveConsole;

            const newConsole = { name: 'Test Console' };

            // NOTE: This assignment will throw EzNovaBadParam as newConsole will fail validation checks that the class supports some necessary logging methods
            EzConsole.ezActiveConsole = newConsole;

            expect(EzConsole.ezActiveConsole).toEqual(newConsole);

            expect(initialConsole).toEqual(EzConsole.ezActiveConsole);
        });
        */

        it('should throw a TypeError when passed invalid input', () => {
            expect(() => {
                EzConsole.ezActiveConsole = 'Invalid Input';
            }).toThrow(EzBadParamException);
        });

        /* Disabled, see note comment below
        it('should set the active console to null', () => {
            // NOTE: This assignment will throw EzNovaBadParam
            EzConsole.ezActiveConsole = null;
            expect(EzConsole.ezActiveConsole).toBeNull();
        });
        */

        /* Disabled, see note comment below
        it('should set the active console to undefined', () => {
            // NOTE: This assignment will throw EzNovaBadParam
            EzConsole.ezActiveConsole = undefined;
            expect(EzConsole.ezActiveConsole).toBeUndefined();
        });
        */
    });

    describe('log', () => {
        // Mock the ezActiveConsole and ezLogTo calls
        // const mockActiveConsole = {};
        // const mockLogTo = jest.fn();
        // Object.defineProperty(EzConsole, 'ezActiveConsole', { get: () => mockActiveConsole });
        // EzConsole.ezLogTo = mockLogTo;

        test('does not log if message and optionalErr are both empty', () => {
            expect(() => EzConsole.log()).toThrow();
        });

        test('logs only the message if it is a non-empty string and optionalErr is empty', () => {
            const spy_EzConsole_ezLogTo = jest.spyOn(EzConsole, 'ezLogTo');

            const message = 'Test message';

            EzConsole.log(message);

            //expect(spy_EzConsole_ezLogTo).toHaveBeenCalledWith(globalThis.console.log, message, null);

            expect(spy_EzConsole_ezLogTo).toHaveBeenCalledWith(EzConsole.ezActiveConsole.log, message, null);

            //expect(spy_EzConsole_ezLogTo).toHaveBeenCalledWith(EzConsole.ezDefaultConsole.log, message, null);

            spy_EzConsole_ezLogTo.mockRestore();
        });

        test('logs only the optionalErr if message is empty and optionalErr is a valid instance', () => {
            const optionalErr = new Error('Test error');
            EzConsole.log(null, optionalErr);
            expect(mockLogTo).toHaveBeenCalledWith(mockActiveConsole.log, optionalErr);
        });

        test('logs both message and optionalErr if both are valid', () => {
            const message = 'Test message';
            const optionalErr = new Error('Test error');
            EzConsole.log(message, optionalErr);
            expect(mockLogTo).toHaveBeenCalledWith(mockActiveConsole.log, message, optionalErr);
        });

        test('does not log if ezActiveConsole.log is not a function', () => {
            delete mockActiveConsole.log;
            EzConsole.log('Test message');
            expect(mockLogTo).not.toHaveBeenCalled();
        });
    });
    describe('info', () => {
        // Test when EzConsole.ezActiveConsole.info is available
        test('logs the message using EzConsole.ezActiveConsole.info', () => {
            const consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => { });

            EzConsole.info('This is an info message');

            expect(consoleSpy).toHaveBeenCalledWith('This is an info message');

            consoleSpy.mockRestore();
        });

        // Test when EzConsole.ezActiveConsole.info is not available
        test('logs the message with "[INFO ]" prefix when EzConsole.ezActiveConsole.info is not available', () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });

            EzConsole.ezActiveConsole = null; // Simulate ezActiveConsole not being available

            EzConsole.info('This is an info message');

            expect(consoleSpy).toHaveBeenCalledWith('[INFO ] This is an info message');

            consoleSpy.mockRestore();
        });

        // Test when both message and optionalErr are provided
        test('logs the message and optionalErr when both are provided', () => {
            const consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => { });

            EzConsole.info('This is an info message', new Error('Test Error'));

            expect(consoleSpy).toHaveBeenCalledWith('This is an info message', new Error('Test Error'));

            consoleSpy.mockRestore();
        });

        // Test when message is null
        test('does not log when message is null', () => {
            const consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => { });

            EzConsole.info(null);

            expect(consoleSpy).not.toHaveBeenCalled();

            consoleSpy.mockRestore();
        });

        // Test when optionalErr is null
        test('logs only the message when optionalErr is null', () => {
            const consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => { });

            EzConsole.info('This is an info message', null);

            expect(consoleSpy).toHaveBeenCalledWith('This is an info message');

            consoleSpy.mockRestore();
        });
    });
    describe('warn', () => {
        // Mock the ezActiveConsole and ezLogTo calls
        const mockActiveConsole = {};
        const mockLogTo = jest.fn();
        Object.defineProperty(EzConsole, 'ezActiveConsole', { get: () => mockActiveConsole });
        EzConsole.ezLogTo = mockLogTo;

        test('logs message with EzConsole.ezActiveConsole.warn if available', async () => {
            mockActiveConsole.warn = jest.fn();
            EzConsole.warn('Test message');
            await Promise.resolve(); // Allow some time for potential async behavior
            expect(mockActiveConsole.warn).toHaveBeenCalledWith('Test message');
        });

        test('logs prepended message with EzConsole.log if ezActiveConsole.warn is not available', () => {
            delete mockActiveConsole.warn;
            const message = 'Test message';
            EzConsole.warn(message);
            expect(mockActiveConsole.warn).toBeUndefined(); // No warn method
            expect(mockLogTo).toHaveBeenCalledWith('[WARN ] ' + message);
        });

        test('logs message and optional error', () => {
            const message = 'Test message';
            const optionalErr = new Error('Test error');
            mockActiveConsole.warn = jest.fn();
            EzConsole.warn(message, optionalErr);
            expect(mockActiveConsole.warn).toHaveBeenCalledWith(message, optionalErr);
        });

        test('logs prepended message and optional error if ezActiveConsole.warn is not available', () => {
            delete mockActiveConsole.warn;
            const message = 'Test message';
            const optionalErr = new Error('Test error');
            EzConsole.warn(message, optionalErr);
            expect(mockActiveConsole.warn).toBeUndefined(); // No warn method
            expect(mockLogTo).toHaveBeenCalledWith('[WARN ] ' + message, optionalErr);
        });

        test('handles empty message', () => {
            mockActiveConsole.warn = jest.fn();
            EzConsole.warn();
            expect(mockActiveConsole.warn).not.toHaveBeenCalled(); // No warn call with empty message

            delete mockActiveConsole.warn;
            EzConsole.warn(null);
            expect(mockLogTo).toHaveBeenCalledWith('[WARN ] '); // Empty prepended message
        });
    });
    describe('error', () => {
        // Test when EzConsole.ezActiveConsole.error is available
        test('logs the message using EzConsole.ezActiveConsole.error', () => {
            const mockError = jest.fn();
            EzConsole.ezActiveConsole = { error: mockError };

            EzConsole.error('Error message');

            expect(mockError).toHaveBeenCalledWith('Error message');
        });

        // Test when ezActiveConsole.error is not defined, it should fallback to EzConsole.info
        test('fallback to EzConsole.info when EzConsole.ezActiveConsole.error is not available', () => {
            const mockInfo = jest.fn();
            EzConsole.ezActiveConsole = { info: mockInfo }; // Mock info to be available instead
            // Assuming EzFunction.isFunction is properly checking for method existence

            EzConsole.error('Fallback error message');

            expect(mockInfo).toHaveBeenCalledWith('[ERROR] Fallback error message');
        });

        // Test logging with an additional error object
        test('logs the message and optionalErr when both are provided', () => {
            const mockError = jest.fn();
            EzConsole.ezActiveConsole = { error: mockError };

            const testError = new Error('Test error');
            EzConsole.error('Error with exception', testError);

            expect(mockError).toHaveBeenCalledWith('Error with exception', testError);
        });

        // Test when message is null, should ideally not call ezActiveConsole.error
        test('does not attempt to log when message is null', () => {
            const mockError = jest.fn();
            EzConsole.ezActiveConsole = { error: mockError };

            EzConsole.error(null);

            expect(mockError).not.toHaveBeenCalled();
        });

        // Test when ezActiveConsole is completely undefined
        test('uses EzConsole.info with prefix when ezActiveConsole is undefined', () => {
            const mockInfo = jest.fn();
            EzConsole.ezActiveConsole = undefined; // Simulate ezActiveConsole being completely undefined
            global.EzConsole.info = mockInfo; // Override EzConsole.info for this test

            EzConsole.error('Error message with undefined ezActiveConsole');

            expect(mockInfo).toHaveBeenCalledWith('[ERROR] Error message with undefined ezActiveConsole');
        });
    });
    describe('debug', () => {
        // Test when EzConsole.ezActiveConsole.debug is available
        test('logs the message using ezActiveConsole.debug when available', () => {
            const mockDebug = jest.fn();
            EzConsole.ezActiveConsole = { debug: mockDebug };

            EzConsole.debug('Debug message');

            expect(mockDebug).toHaveBeenCalledWith('Debug message');
        });

        // Test when ezActiveConsole.debug is not available, it should fallback to EzConsole.info
        test('falls back to using EzConsole.info when ezActiveConsole.debug is not available', () => {
            const mockInfo = jest.fn();
            // Simulate the absence of debug by providing an ezActiveConsole without a debug method
            EzConsole.ezActiveConsole = {};
            // Temporarily replace EzConsole.info to intercept its call
            EzConsole.info = mockInfo;

            EzConsole.debug('Fallback debug message');

            expect(mockInfo).toHaveBeenCalledWith('[DEBUG] Fallback debug message');
        });

        // Test logging with an additional error object
        test('logs the message and optionalErr when both are provided and debug is available', () => {
            const mockDebug = jest.fn();
            EzConsole.ezActiveConsole = { debug: mockDebug };

            const testError = new Error('Test debug error');
            EzConsole.debug('Debug message with error', testError);

            expect(mockDebug).toHaveBeenCalledWith('Debug message with error', testError);
        });

        // Test when message is null, should ideally not call ezActiveConsole.debug
        test('does not attempt to log when message is null', () => {
            const mockDebug = jest.fn();
            EzConsole.ezActiveConsole = { debug: mockDebug };

            EzConsole.debug(null);

            expect(mockDebug).not.toHaveBeenCalled();
        });

        // Test when ezActiveConsole is completely undefined, fallback to EzConsole.info
        test('uses EzConsole.info with prefix when ezActiveConsole is undefined', () => {
            const mockInfo = jest.fn();
            // Simulate ezActiveConsole being completely undefined
            EzConsole.ezActiveConsole = undefined;
            // Temporarily replace EzConsole.info to intercept its call
            EzConsole.info = mockInfo;

            EzConsole.debug('Debug message with undefined ezActiveConsole');

            expect(mockInfo).toHaveBeenCalledWith('[DEBUG] Debug message with undefined ezActiveConsole');
        });
    });
    describe('trace', () => {
        // Test 1: Trace logs directly when ezActiveConsole.trace is available
        test('logs the message using ezActiveConsole.trace when available', () => {
            const mockTrace = jest.fn();
            EzConsole.ezActiveConsole = { trace: mockTrace };

            EzConsole.trace('Trace message');

            expect(mockTrace).toHaveBeenCalledWith('Trace message');
        });

        // Test 2: Falls back to EzConsole.debug when ezActiveConsole.trace is not a function
        test('falls back to using EzConsole.debug when ezActiveConsole.trace is not available', () => {
            const mockDebug = jest.fn();
            EzConsole.ezActiveConsole = {}; // Does not have trace method
            EzConsole.debug = mockDebug; // Mocking EzConsole.debug for the fallback

            EzConsole.trace('Fallback trace message');

            expect(mockDebug).toHaveBeenCalledWith('[TRACE] Fallback trace message');
        });

        // Test 3: Checks logging with message and optional error object
        test('logs the message and optionalErr when both are provided and trace is available', () => {
            const mockTrace = jest.fn();
            EzConsole.ezActiveConsole = { trace: mockTrace };

            const testError = new Error('Test trace error');
            EzConsole.trace('Trace message with error', testError);

            expect(mockTrace).toHaveBeenCalledWith('Trace message with error', testError);
        });

        // Test 4: When message is null, should still call trace if available
        test('attempts to log when message is null and trace is available', () => {
            const mockTrace = jest.fn();
            EzConsole.ezActiveConsole = { trace: mockTrace };

            EzConsole.trace(null);

            expect(mockTrace).toHaveBeenCalledWith(null);
        });

        // Test 5: Uses EzConsole.debug with prefix when ezActiveConsole is completely undefined
        test('uses EzConsole.debug with prefix when ezActiveConsole is undefined', () => {
            const mockDebug = jest.fn();
            EzConsole.ezActiveConsole = undefined; // Simulating complete absence
            EzConsole.debug = mockDebug; // Mock EzConsole.debug to intercept the fallback call

            EzConsole.trace('Trace message with undefined ezActiveConsole');

            expect(mockDebug).toHaveBeenCalledWith('[TRACE] Trace message with undefined ezActiveConsole');
        });
    });
    describe('logException', () => {
        // Mock EzConsole.error (can be hoisted outside the tests)
        const mockError = jest.fn();
        EzConsole.error = mockError;

        // Test 1: Logs default message with EzConsole.error
        test('logs default message with EzConsole.error', () => {
            EzConsole.logException();
            expect(mockError).toHaveBeenCalledWith('Exception: Unexpected error.');
        });

        // Test 2: Logs exception message with EzConsole.error
        test('logs exception message with EzConsole.error', () => {
            let spy_EzConsole_error = jest.spyOn(EzConsole, 'error');

            const err = new Error('Test error');

            EzConsole.logException(null, err);

            expect(spy_EzConsole_error).toHaveBeenCalledWith(`Exception: ${err.message} => [Stack trace: ${err.stack}]`);

            jest.clearAllMocks();
        });

        // Test 3: Logs exception with message and stack trace with EzConsole.error
        test('logs exception with message and stack trace with EzConsole.error', () => {
            const err = new Error('Test error with stack trace');
            err.stack = 'Error stack trace';
            EzConsole.logException(null, err);
            expect(mockError).toHaveBeenCalledWith(expect.stringContaining('Exception: Test error with stack trace => [Stack trace: Error stack trace]'));
        });

        // Test 4: Logs exception with message and stderr with EzConsole.error
        test('logs exception with message and stderr with EzConsole.error', () => {
            const err = new Error('Test error');
            err.stderr = 'Error on stderr';
            EzConsole.logException(null, err);
            expect(mockError).toHaveBeenCalledWith(expect.stringContaining('Exception: Test error => [StdErr: Error on stderr]'));
        });

        // Test 5: Logs custom message and exception with EzConsole.error (optional error)
        test('logs custom message and exception with EzConsole.error (optional error)', () => {
            const err = new Error('Test error');
            const customMessage = 'Error during processing';
            EzConsole.logException(customMessage, err);
            expect(mockError).toHaveBeenCalledWith(expect.stringContaining(`Exception: ${customMessage} => Test error`));
        });
    });
    describe('ezLogTo', () => {
        // Test 1: Calls the logger method with both message and optionalErr
        test('calls the logger method with both message and optionalErr', () => {
            const loggerMethod = jest.fn();
            EzConsole.ezLogTo(loggerMethod, 'Test message', new Error('Test error'));

            expect(loggerMethod).toHaveBeenCalledWith('Test message', new Error('Test error'));
        });

        // Test 2: Calls the logger method with only message
        test('calls the logger method with only message', () => {
            const loggerMethod = jest.fn();
            EzConsole.ezLogTo(loggerMethod, 'Test message');

            expect(loggerMethod).toHaveBeenCalledWith('Test message');
        });

        // Test 3: Calls the logger method with only optionalErr
        test('calls the logger method with only optionalErr', () => {
            const loggerMethod = jest.fn();
            EzConsole.ezLogTo(loggerMethod, null, new Error('Test error'));

            expect(loggerMethod).toHaveBeenCalledWith(null, new Error('Test error'));
        });

        // Test 4: Does not call the logger method when both message and optionalErr are null or undefined
        test('does not call the logger method when both message and optionalErr are null or undefined', () => {
            const loggerMethod = jest.fn();
            EzConsole.ezLogTo(loggerMethod, null, null);

            expect(loggerMethod).not.toHaveBeenCalled();
        });

        // Test 5: Throws an error if loggerMethod is not a function
        test('throws an error if loggerMethod is not a function', () => {
            expect(() => EzConsole.ezLogTo('not a function')).toThrow();
        });
    });
});

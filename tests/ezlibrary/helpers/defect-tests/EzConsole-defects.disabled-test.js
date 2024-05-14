import { EzConsole } from '../../../../ezlibrary/helpers/EzConsole.js';

import {
    EzBadParamException
} from '../../../../ezlibrary/exceptions/EzExceptions.js'

const runDefectTests = true;

const ezTest = runDefectTests
    ? globalThis['test']
    : globalThis['test']['skip'];

const ezIt = runDefectTests
    ? globalThis['it']
    : globalThis['it']['skip'];

if (!runDefectTests) {
    console.log('Skipped all defect tests in EzPromise-defects.test.js');
}

describe(
    'EzConsole Defect Tests',
    () => {
        let savedEzConsoleStaticMethods = {
            ezActiveConsole: EzConsole.ezActiveConsole,
            log: EzConsole.log,
            info: EzConsole.info,
            warn: EzConsole.warn,
            error: EzConsole.error,
            debug: EzConsole.debug,
            trace: EzConsole.trace
        }

        let savedGlobalConsole = global.console;
        let savedGlobalThisConsole = globalThis.console;
        let savedGlobalThisWindow = globalThis.window.console;

        beforeEach(() => {
            savedGlobalConsole = global.console;

            savedGlobalThisConsole = globalThis.console;

            savedGlobalThisWindow = globalThis.window;

            savedEzConsoleStaticMethods = {
                ezActiveConsole: EzConsole.ezActiveConsole,
                log: EzConsole.log,
                info: EzConsole.info,
                warn: EzConsole.warn,
                error: EzConsole.error,
                debug: EzConsole.debug,
                trace: EzConsole.trace
            };
        });

        ezTest(
            'Defect EW-379: https://ezclocker.atlassian.net/browse/EW-379',
            () => {
                const activeConsole = EzConsole.ezActiveConsole;

                expect(activeConsole).toBeDefined();

                expect(typeof activeConsole.log).toBe('function');

                expect(typeof activeConsole.error).toBe('function');
            });

        ezIt('Defect EW-380: https://ezclocker.atlassian.net/browse/EW-380',
            () => {
                const newConsole = { name: 'Test Console' };

                // Save the current active console
                let saveEzActiveConsole = EzConsole.ezActiveConsole;

                EzConsole.ezActiveConsole = newConsole;

                expect(EzConsole.ezActiveConsole).toEqual(newConsole);

                // Restore the active console
                EzConsole.ezActiveConsole = saveEzActiveConsole;
            });

        ezIt(
            'Defect EW-381: https://ezclocker.atlassian.net/browse/EW-381',
            () => {
                // Save the current active console
                let saveEzActiveConsole = EzConsole.ezActiveConsole;

                expect(
                    () => {
                        EzConsole.ezActiveConsole = 'Invalid Input';
                    })
                    .toThrow(EzBadParamException);

                // Restore the active console
                EzConsole.ezActiveConsole = saveEzActiveConsole;
            });

        ezTest(
            'Defect EW-382: https://ezclocker.atlassian.net/browse/EW-382',
            () => {
                let spy_EzConsole_ezLogTo = jest.spyOn(EzConsole, 'ezLogTo');

                const message = 'Test message';

                EzConsole.log(message);

                expect(spy_EzConsole_ezLogTo).toHaveBeenCalledWith(globalThis.console.log, message, null);

                expect(spy_EzConsole_ezLogTo).toHaveBeenCalledWith(EzConsole.ezActiveConsole.log, message, null);

                expect(spy_EzConsole_ezLogTo).toHaveBeenCalledWith(EzConsole.ezDefaultConsole.log, message, null);

                jest.clearAllMocks();
            });

        ezTest(
            'Defect EW-383: https://ezclocker.atlassian.net/browse/EW-383',
            () => {
                let spy_EzConsole_error = jest.spyOn(EzConsole, 'error');

                const err = new Error('Test error');

                EzConsole.logException(null, err);

                expect(spy_EzConsole_error).toHaveBeenCalledWith(`Exception: ${err.message} => [Stack trace: ${err.stack}]`);

                jest.clearAllMocks();
            });

        ezTest('returns globalThis.console if available', () => {
            const mockConsole = {};
            globalThis.console = mockConsole;

            expect(EzConsole.ezDefaultConsole).toBe(EzConsole.ezNullConsole);
        });

    });

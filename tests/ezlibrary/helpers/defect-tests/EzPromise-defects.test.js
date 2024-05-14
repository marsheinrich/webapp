import { EzPromise } from '../../../../ezlibrary/helpers/EzPromise.js';
import { EzError } from '../../../../ezlibrary/helpers/EzError.js';
import { EzHtmlCharacterCode } from '../../../../ezlibrary/helpers/EzHtmlCharacterCode.js';
import {
    EzException
} from '../../../../ezlibrary/exceptions/EzExceptions.js';
import { EzConsole } from '../../../../ezlibrary/helpers/EzConsole.js';

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
    'EzPromise Defect Tests',
    () => {
        ezTest(
            "Defect EW-322 (corrected test): https://ezclocker.atlassian.net/browse/EW-322",
            async () => {
                const responsePromise = Promise.resolve('resolved');
                expect(responsePromise).toBeInstanceOf(Promise);

                await expect(responsePromise).resolves.toBe('resolved');
            });

        ezTest(
            'Defect EW-322 (corrected test): https://ezclocker.atlassian.net/browse/EW-322',
            async () => {
                const error = null;

                const defaultError = new EzException(EzPromise.DEFAULT_PROMISE_ERROR_CATCHER_MESSAGE);

                await expect(
                    EzPromise.promiseErrorCatcher(error))
                    .rejects
                    .toThrow(defaultError);
            });

        ezIt(
            'Defect EW-327: https://ezclocker.atlassian.net/browse/EW-327',
            async () => {
                const waitDone = jest.fn(() => Promise.resolve());
                const resolve = jest.fn(() => Promise.resolve());

                await EzPromise.waitDoneResolve(
                    {},
                    waitDone,
                    resolve,
                    'param1',
                    'param2');

                expect(waitDone).toHaveBeenCalledWith(
                    'param1',
                    'param2');

                expect(resolve).toHaveBeenCalledWith(
                    'param1',
                    'param2');
            });

        ezTest(
            'Defect EW-328: https://ezclocker.atlassian.net/browse/EW-328',
            async () => {
                const error = {
                    errorCode: 404
                };

                const spyEzConsoleErrorStaticMethod = jest.spyOn(EzConsole, 'error');

                await expect(
                    EzPromise.promiseErrorCatcher(error))
                    .rejects
                    .toBe(error);

                expect(spyEzConsoleErrorStaticMethod)
                    .toHaveBeenCalledWith(
                        EzPromise.DEFAULT_PROMISE_EXECUTION_FAILED_MESSAGE,
                        error);

                spyEzConsoleErrorStaticMethod.mockRestore();
            });

        ezTest(
            'Defect EW-330: https://ezclocker.atlassian.net/browse/EW-330',
            async () => {
                const waitDone = jest.fn(() => Promise.resolve());
                const resolve = jest.fn(() => Promise.resolve());

                await EzPromise.waitDoneResolve(
                    {},
                    waitDone,
                    resolve,
                    'param1',
                    'param2');

                expect(waitDone).toHaveBeenCalledWith('param1', 'param2');
                expect(resolve).toHaveBeenCalledWith('param1', 'param2');
            });


        ezTest(
            'Defect EW-336: https://ezclocker.atlassian.net/browse/EW-336',
            async () => {
                const error = null;

                // Original test missing line below:
                const defaultError = new EzException(EzPromise.DEFAULT_PROMISE_ERROR_CATCHER_MESSAGE);

                await expect(EzPromise.promiseErrorCatcher(error))
                    .rejects
                    .toMatchObject(defaultError);
            });

        ezTest(
            'Defect EW-337: https://ezclocker.atlassian.net/browse/EW-337',
            async () => {
                const spyMethod_EzConsole_error = jest.spyOn(EzConsole, 'error');
                const defaultError = new EzException(
                    EzPromise.DEFAULT_PROMISE_ERROR_CATCHER_MESSAGE,
                    {
                        errorCode: 500
                    });

                await expect(EzPromise.promiseErrorCatcher())
                    .rejects
                    .toThrow(defaultError.message);

                expect(spyMethod_EzConsole_error)
                    .toHaveBeenCalledWith(
                        // Changed message method is called with as sends along additional text to pre-pend to the original message
                        EzPromise.DEFAULT_PROMISE_EXECUTION_FAILED_MESSAGE,
                        // defaultError.message
                        expect.any(EzException));

                spyMethod_EzConsole_error.mockRestore();
            });

        ezTest(
            'Defect EW-338: https://ezclocker.atlassian.net/browse/EW-338',
            () => {
                const spyMethod_EzConsole_error = jest.spyOn(EzConsole, 'error');
                const eResponse = { errorCode: 404, message: 'Not found' };
                const errorMessage = 'Error occurred';

                expect(
                    EzPromise.logReject(
                        eResponse,
                        errorMessage))
                    .rejects
                    .toBe(eResponse);

                expect(spyMethod_EzConsole_error)
                    .toHaveBeenCalledWith(
                        EzPromise.PROMISE_REJECTED_ERROR_PREFIX,
                        eResponse);

                spyMethod_EzConsole_error.mockRestore();
            });

        ezTest(
            'Defect EW-340: https://ezclocker.atlassian.net/browse/EW-340',
            async () => {
                const waitDone = jest.fn(() => Promise.resolve());

                await EzPromise.waitDoneThenIgnore(waitDone);

                expect(waitDone).toHaveBeenCalled();
            });

        ezTest(
            'Defect EW-341: https://ezclocker.atlassian.net/browse/EW-341',
            async () => {
                const waitDone = jest.fn(() => Promise.resolve());

                EzPromise.waitDoneThenIgnore(waitDone);
            });

        ezTest(
            'Defect EW-342: https://ezclocker.atlassian.net/browse/EW-342',
            () => {
                const spyMethod_EzConsole_error = jest.spyOn(EzConsole, 'error');

                const result = EzPromise.logReject(null);

                expect(result)
                    .rejects
                    .toEqual(
                        new EzException(EzPromise.EM_NoAdditionalDetailsProvided));

                expect(spyMethod_EzConsole_error)
                    .toHaveBeenCalledWith(
                        EzPromise.PROMISE_REJECTED_ERROR_PREFIX,
                        expect.any(EzException));

                spyMethod_EzConsole_error.mockRestore();
            });

        ezTest(
            'Defect EW-348: https://ezclocker.atlassian.net/browse/EW-348',
            () => {
                const arg1 = 'value1';
                const arg2 = 2;
                const arg3 = { message: 'test message' };

                const result = EzPromise.ignoreResolve(arg1, arg2, arg3);

                expect(result).toEqual([arg1, arg2, arg3]);
            });

        ezTest(
            'Defect EW-349: https://ezclocker.atlassian.net/browse/EW-349',
            () => {
                const singleArg = 'hello';

                const result = EzPromise.ignoreResolve(singleArg);

                expect(result).toEqual([singleArg]);
            });

        ezTest(
            'Defect EW-350: https://ezclocker.atlassian.net/browse/EW-350',
            () => {
                const nonArrayArg = 'non-array value';

                const result = EzPromise.ignoreResolve(nonArrayArg);

                expect(result).toEqual([nonArrayArg]);
            });

        ezTest(
            'Defect EW-351: https://ezclocker.atlassian.net/browse/EW-351',
            () => {
                const errorMessage = 'This is not an Error object.';

                const result = EzPromise.ignoreReject(errorMessage);

                expect(result).toEqual([errorMessage]);
            });

        ezTest(
            'Defect EW-353: https://ezclocker.atlassian.net/browse/EW-353',
            () => {
                const arg1 = 'value1';
                const arg2 = 2;
                const arg3 = { message: 'test message' };

                const result = EzPromise.ignoreFinished(arg1, arg2, arg3);

                expect(result).toEqual([arg1, arg2, arg3]);
            });

        ezTest(
            'Defect EW-354: https://ezclocker.atlassian.net/browse/EW-354',
            () => {
                const singleArg = 'hello';

                const result = EzPromise.ignoreFinished(singleArg);

                expect(result).toEqual([singleArg]);
            });

        ezTest(
            'Defect EW-355: https://ezclocker.atlassian.net/browse/EW-355',
            () => {
                const nonArrayArg = 'non-array value';

                const result = EzPromise.ignoreFinished(nonArrayArg);

                expect(result).toEqual([nonArrayArg]);
            });

        ezTest(
            'Defect EW-356: https://ezclocker.atlassian.net/browse/EW-356',
            () => {
                const arg1 = 'value1';
                const arg2 = 2;
                const arg3 = { message: 'test message' };

                const result = EzPromise.ignoreResult(arg1, arg2, arg3);

                expect(result).toEqual([arg1, arg2, arg3]);
            });
        ezTest(
            'Defect EW-357: https://ezclocker.atlassian.net/browse/EW-357',
            () => {
                const nonArrayArg = 'non-array value';

                const result = EzPromise.ignoreResult(nonArrayArg);

                expect(result).toEqual([nonArrayArg]);
            });

        ezTest(
            'Defect EW-370: https://ezclocker.atlassian.net/browse/EW-370',
            () => {
                const resolveOnlyPromiseFunction = jest.fn(
                    () => Promise.resolve('resolved'));

                expect(
                    EzPromise.executeIgnoreResolve(
                        {},
                        resolveOnlyPromiseFunction))
                    .toBeUndefined();
            });

        ezTest(
            'Defect EW-370: https://ezclocker.atlassian.net/browse/EW-370',
            () => {
                expect(EzPromise.ignoreFinished()).toBeNull();
            });

        ezTest(
            'Defect EW-371: https://ezclocker.atlassian.net/browse/EW-371',
            () => {
                expect(EzPromise.ignoreFinished()).toBeNull();
            });

        ezTest(
            'Defect EW-372: https://ezclocker.atlassian.net/browse/EW-372',
            () => {
                const error = new Error('Test Error');
                const consoleErrorSpy = jest.spyOn(EzConsole, 'error');

                EzPromise.ignoreCatch(error);

                expect(consoleErrorSpy).toHaveBeenCalledWith(
                    EzPromise.DEFAULT_PROMISE_EXECUTION_FAILED_MESSAGE,
                    error);

                expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
            });

        ezTest(
            'Defect EW-397: https://ezclocker.atlassian.net/browse/EW-397',
            () => {
                const emptyArray = [];
                const expectedResult = [[]];
                expect(EzPromise.ignoreFinished(emptyArray)).toStrictEqual(expectedResult);
            });

        ezTest(
            'Defect EW-398: https://ezclocker.atlassian.net/browse/EW-398',
            () => {
                expect(EzPromise.ignoreResult()).toBeNull();
            });

        ezTest(
            'Defect EW-399: https://ezclocker.atlassian.net/browse/EW-399',
            () => {
                // Missing message property
                const error = { errorCode: 404 };
                const consoleErrorSpy = jest.spyOn(EzConsole, 'error');

                EzPromise.ignoreCatch(error);

                expect(consoleErrorSpy).toHaveBeenCalledWith(EzPromise.DEFAULT_PROMISE_EXECUTION_FAILED_MESSAGE, error);
                expect(error.message).toBe(EzError.DEFAULT_ERROR_MESSAGE);
                expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
            });

        ezTest('HTML_DECIMAL_CODE_TO_UTF8_CHAR_MAP contains a minimum number of entries', () => {
            // Only supports characters 32 through 255
            const expectedMinimumSize = 189;

            expect(
                Object.keys(EzHtmlCharacterCode.HTML_DECIMAL_CODE_TO_UTF8_CHAR_MAP).length)
                .toBeGreaterThanOrEqual(expectedMinimumSize);
        });
    });

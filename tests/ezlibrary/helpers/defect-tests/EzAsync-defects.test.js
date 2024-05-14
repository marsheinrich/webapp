import { EzAsync } from '../../../../ezlibrary/helpers/EzAsync.js';

import {
    EzException
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
    'EzAsync Defect Tests',
    () => {
        ezTest(
            'Defect EW-373: https://ezclocker.atlassian.net/browse/EW-373',
            () => {
                const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
                const error = { errorCode: 404, message: 'Not found' };

                expect(
                    () => EzAsync.handlePromiseCatch(error)).toThrow(EzException);

                expect(consoleErrorSpy).toHaveBeenCalledWith('[Unhandled Promise.catch]:[Error code: 404]:[Error reported: Not found]');

                consoleErrorSpy.mockRestore();
            });

        ezTest(
            'Defect EW-374: https://ezclocker.atlassian.net/browse/EW-374',
            async () => {
                const testError = 'Original Error Message';

                const ezAsyncReject = jest.fn(async () => await EzAsync.reject(testError));

                expect(ezAsyncReject)
                    .rejects
                    .toBe(testError);
            });

        ezTest(
            'Defect EW-375: https://ezclocker.atlassian.net/browse/EW-375',
            async () => {
                // Result returned by internalFunction
                const expectedResult = 'test result';

                // Function called by the asyncActionFunction to 'do stuff'
                const internalFunction = jest.fn(() => expectedResult);

                // Function called in asyncAction
                const asyncActionFunction = jest.fn((finished) => finished(internalFunction()));

                // Using EzAsync.asyncAction(..) to call asyncActionFunction
                const result = await EzAsync.asyncAction(asyncActionFunction);

                expect(internalFunction).toHaveBeenCalled();

                expect(internalFunction).toHaveReturnedWith(expectedResult);

                expect(asyncActionFunction).toHaveBeenCalled();

                expect(result).toBe(expectedResult);
            });

        ezTest(
            'Defect EW-378: https://ezclocker.atlassian.net/browse/EW-378',
            async () => {
                const testError = new Error('Async error');

                const mockFunction = jest.fn(() => {
                    throw testError;
                });

                await expect(EzAsync.asyncAction(mockFunction)).rejects.toThrow(testError);
            });
    });

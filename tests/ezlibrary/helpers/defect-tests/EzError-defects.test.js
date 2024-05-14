import { EzError } from '../../../../ezlibrary/helpers/EzError.js';

import {
    EzException
} from '../../../..//ezlibrary/exceptions/EzExceptions.js';

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
        ezTest(
            'Defect EW-384: https://ezclocker.atlassian.net/browse/EW-384',
            () => {
                const providedError = new EzException('Custom error message', 'CUSTOM_ERROR_CODE');
                const result = EzError.errorOrDefaultError(providedError);

                expect(result).toBe(providedError);
            });

        ezTest(
            'Defect EW-385: https://ezclocker.atlassian.net/browse/EW-385',
            () => {
                const providedError = {};
                const result = EzError.errorOrDefault(providedError, new EzException('Default error', 500));

                expect(result).toHaveProperty('errorCode');

                expect(result).toHaveProperty('message');
            });

        ezTest(
            'Defect EW-386: https://ezclocker.atlassian.net/browse/EW-386',
            () => {
                const message = 'Custom error message';
                const errorCode = 404;

                expect(
                    () => {
                        EzError.throwEzException(message, errorCode);
                    }).toThrow(EzException);
            });
    });

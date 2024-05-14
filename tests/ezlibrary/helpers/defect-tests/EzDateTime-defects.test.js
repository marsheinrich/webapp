import { EzBadParamException } from '../../../../ezlibrary/exceptions/EzExceptions.js';
import { EzDateTime } from '../../../../public/javascript/common/ez-date-time.js';
const runDefectTests = false;

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
    'EzDateTime Defect Tests',
    () => {
        it('should throw an error if timePickerId is not provided', () => {
            // Call the method under test within a function to catch the error
            const callMethod = () => new EzDateTime().ezAppendTimeFromTimePicker('', moment());

            // Assert that calling the method throws a EzBadParamException
            expect(callMethod).toThrow(EzBadParamException);
        });
    });

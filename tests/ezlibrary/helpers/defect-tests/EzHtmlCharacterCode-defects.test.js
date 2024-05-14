import { EzHtmlCharacterCode } from '../../../../ezlibrary/helpers/EzHtmlCharacterCode.js';

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
    'EzHtmlCharacterCode Defect Tests',
    () => {

        ezTest(
            'Defect EW-403: https://ezclocker.atlassian.net/browse/EW-403', () => {
            const htmlCharCode = '&#97;extra';

            expect(EzHtmlCharacterCode.htmlCharCodeToUTF8Char(htmlCharCode)).toBe(htmlCharCode);
        });
    });

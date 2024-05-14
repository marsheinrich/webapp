import { EzUrl } from '../../../../ezlibrary/helpers/EzUrl.js';

import { EzEnvironment } from '../../../../ezlibrary/enums/EzEnvironment.js';

const runDefectTests = true;

const ezTest = runDefectTests
    ? globalThis['test']
    : globalThis['test']['skip'];

const ezIt = runDefectTests
    ? globalThis['it']
    : globalThis['it']['skip'];

if (!runDefectTests) {
    console.log('Skipped all defect tests in EzUrl-defects.test.js');
}

describe(
    'EzUrl Defect Tests',
    () => {
        ezTest(
            'Defect EW-364: https://ezclocker.atlassian.net/browse/EW-364',
            async () => {
                expect(EzUrl.ezEnvironment).toBe(EzEnvironment.PRD);
            });

        ezTest(
            'Defect EW-365: https://ezclocker.atlassian.net/browse/EW-365',
            async () => {
                const expectedUrl = 'https://ezclocker.com';

                expect(EzUrl.buildUrl()).toBe(expectedUrl);
            });

        ezTest(
            'Defect EW-366: https://ezclocker.atlassian.net/browse/EW-366',
            async () => {
                const url = 'https://ezclocker.com';
                const expectedUrl = 'https://ezclocker.com';

                expect(EzUrl.build`${url}`).toBe(expectedUrl);
            });

        ezTest(
            'Defect EW-368: https://ezclocker.atlassian.net/browse/EW-368',
            () => {
                const invalidEnvironment = 'invalid_env';
                EzUrl.ezEnvironment = invalidEnvironment;

                expect(EzUrl.ezEnvironment).toBe(EzEnvironment.PRD);
            });

        ezIt(
            'Defect EW-369: https://ezclocker.atlassian.net/browse/EW-369',
            () => {
                EzUrl.enableFileRevision = '';

                expect(EzUrl.enableFileRevision).toBe(true);
            });
    });

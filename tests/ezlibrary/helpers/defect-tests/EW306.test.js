import { EzString } from '../../../../ezlibrary/helpers/EzString.js';

describe(
    'Defect EW-306: https://ezclocker.atlassian.net/browse/EW-306',
    () => {
        /* EW306 (corrected) */
        test(
            'EW306: should handle input without extra spaces and tabs',
            () => {
                /* Corrected aStrings */
                // const aStrings = ['Hello', 'World'];
                const aStrings = [
                    'HelloWorld',
                    '',
                ];

                const aKeys = ['Key1', 'Key2'];

                const expectedResult = 'HelloWorldKey1Key2';

                const result = EzString.build(aStrings, ...aKeys);

                expect(result).toBe(expectedResult);
            });

        /* Same test as above but using javascript templates in the test. */
        test(
            'EW306: should build a string from the templated string with extra spaces and tabs removed',
            () => {
                const k1 = 'Key1';
                const k2 = 'Key2';
                const expectedResults = 'HelloWorldKey1Key2';

                const result = EzString.build`HelloWorld${k1}${k2}`;

                expect(result).toBe(expectedResults);
            });
    });
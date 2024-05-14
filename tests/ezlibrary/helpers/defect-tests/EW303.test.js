import { EzString } from '../../../../ezlibrary/helpers/EzString.js';

describe(
    'Defect EW-303: https://ezclocker.atlassian.net/browse/EW-303',
    () => {
        /* EW303 (with corrections) */
        it(
            'EW303: should build a templated string with extra spaces and tabs removed',
            () => {
                /* Corrected aStrings array as it would be presented to the method if using the `...` templated string */
                /*
                const aStrings = [
                    '  Hello  ',
                    '\tWorld\t',
                    '\nLine\nFeed\n'
                ];
                */
                const aStrings = [
                    '  Hello  \tWorld\t\nLine\nFeed\n',
                    '',
                    '',
                    ''
                ];

                const aKeys = [
                    'Key1',
                    'Key2',
                    'Key3'
                ];

                /* expectedResult value is missing line-feed values and tabs that remain */
                // const expectedResult = 'Hello World LineFeedKey1Key2Key3';
                const correctedExpectedResult = 'Hello \tWorld\t\nLine\nFeed\nKey1Key2Key3';

                const result = EzString.build(aStrings, ...aKeys);

                /* Changes to use correctedExpectedResult instead of expectedResult */
                // expect(result).toBe(expectedResult);
                expect(result).toBe(correctedExpectedResult);
            });

        /* Same test as above but using javascript templates in the test. */
        it(
            'should build a templated string with extra spaces and tabs removed',
            () => {
                const k1 = 'Key1';
                const k2 = 'Key2';
                const k3 = 'Key3';

                const correctedExpectedResult = 'Hello \tWorld\t\nLine\nFeed\nKey1Key2Key3';

                const result = EzString.build`  Hello  \tWorld\t\nLine\nFeed\n${k1}${k2}${k3}`;

                expect(result).toBe(correctedExpectedResult);
            });

        it(
            'should result in a string with extra spaces and tabs removed',
            () => {
                const k1 = 'Key1';
                const k2 = 'Key2';
                const k3 = 'Key3';
                const expectedResult = 'Hello \tWorld\n\tLine Feed\n\tKey1\n\tKey2\n\tKey3';

                const result = EzString.build`  Hello  \t\tWorld\n\tLine Feed\n\t\t\t${k1}\n\t\t${k2}\n\t${k3}\n\t  \t   \t    \t     \t    \n`;

                // Comment in the below to debug results
                /*
                console.log(`Result="${JSON.stringify(result)}"`);
                console.log(`Expected="${JSON.stringify('Hello \tWorld\n\tLine Feed\n\tKey1\n\tKey2\n\tKey3')}"`);
                */

                expect(result).toBe(expectedResult);
            });

        it(
            'calling as a function should result in a string with extra spaces and tabs removed',
            () => {
                const k1 = 'Key1';
                const k2 = 'Key2';
                const k3 = 'Key3';
                const aStrings = [
                    // aStrings[0]
                    '  Hello  \t\tWorld\n\tLine Feed\n\t\t\t',
                    // aStrings[1]
                    '\n\t\t',
                    // aStrings[2]
                    '\n\t',
                    // aStrings[3]
                    '\n\t  \t   \t    \t     \t    \n'
                ];
                const aKeys = [
                    // aKesy[0]
                    k1,
                    // aKesy[1]
                    k2,
                    // aKesy[2]
                    k3
                ];
                const expectedResult = 'Hello \tWorld\n\tLine Feed\n\tKey1\n\tKey2\n\tKey3';

                const result = EzString.build(aStrings, ...aKeys);

                // Comment in the below to debug results
                /*
                console.log(`Result="${JSON.stringify(result)}"`);
                console.log(`Expected="${JSON.stringify('Hello \tWorld\n\tLine Feed\n\tKey1\n\tKey2\n\tKey3')}"`);
                */

                expect(result).toBe(expectedResult);
            });
    });
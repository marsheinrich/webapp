import { EzString } from '../../../../ezlibrary/helpers/EzString.js';

describe(
    'Defect EW-305: https://ezclocker.atlassian.net/browse/EW-305',
    () => {
       test(
            'should build a templated string with extra spaces and tabs removed',
            () => {
                const expectedResult = 'Hello \tWorld\t\nLine\nFeed\nKEY1KEY2KEY3';
                let key1 = 'KEY1';
                let key2 = 'KEY2';
                let key3 = 'KEY3';
                const result = EzString.build`  Hello  \tWorld\t\nLine\nFeed\n${key1}${key2}${key3}`;
                expect(result).toBe(expectedResult);
            });
    });
import { EzArray } from '../../../../ezlibrary/helpers/EzArray.js';

describe(
    'Defect EW-318: : https://ezclocker.atlassian.net/browse/EW-318',
    () => {
        // Defect EW-318: https://ezclocker.atlassian.net/browse/EW-318
        test(
            'should handle arrays with only one element',
            () => {
                const array = [1];
                const indexToRemove = 0;
                expect(
                    EzArray.removeAtIndex(
                        array,
                        indexToRemove))
                    .toEqual([]);
            });
    });
import { EzArray } from '../../../../ezlibrary/helpers/EzArray.js';

describe(
    'Defect EW-30: https://ezclocker.atlassian.net/browse/EW-30',
    () => {
        // Defect EW-310: https://ezclocker.atlassian.net/browse/EW-310
       test(
            'should merge arrays provided as arguments',
            () => expect(
                EzArray.merge(
                    [1, 2, 3],
                    [4, 5, 6]))
                .toEqual(
                    [1, 2, 3, 4, 5, 6]));

        // Defect EW-310: https://ezclocker.atlassian.net/browse/EW-310
       test(
            'should merge arrays while ignoring non-array parameters',
            () => expect(
                EzArray.merge(
                    [1, 2, 3],
                    'a',
                    true,
                    [4, 5, 6]))
                .toEqual(
                    [1, 2, 3, 4, 5, 6]));

        // Defect EW-310: https://ezclocker.atlassian.net/browse/EW-310
       test(
            'should handle empty arrays properly',
            () => expect(
                EzArray.merge(
                    [],
                    [1, 2],
                    [],
                    [3],
                    []))
                .toEqual(
                    [1, 2, 3]));
    });
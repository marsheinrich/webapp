import { EzArray } from '../../../../ezlibrary/helpers/EzArray.js';

describe(
    'Defect EW-319: https://ezclocker.atlassian.net/browse/EW-319',
    () => {
        // Defect EW-319: https://ezclocker.atlassian.net/browse/EW-319
        test('should handle removing the last item in the array', () => {
            const array = [1, 2, 3];
            const indexToRemove = 2;
            const expectedArray = [1, 2];
            expect(EzArray.removeAtIndex(array, indexToRemove)).toEqual(expectedArray);
        });
    });
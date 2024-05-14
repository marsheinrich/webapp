import { EzArray } from '../../../../ezlibrary/helpers/EzArray.js';

describe(
    'Defect EW-314: https://ezclocker.atlassian.net/browse/EW-314',
    () => {
        test(
            'should remove the specified index from the array',
            () => {
                const array = [1, 2, 3, 4, 5];
                const index = 2; // Removing value 3 at index 2
                const expectedArray = [1, 2, 4, 5];
                expect(EzArray.removeAtIndex(array, index)).toEqual(expectedArray);
            });

        test(
            'should remove the first occurrence of the valueToRemove from the array',
            () => {
                const array = [1, 2, 3, 4, 5];
                const valueToRemove = 3;
                const expectedArray = [1, 2, 4, 5];
                expect(EzArray.removeFirst(array, valueToRemove)).toEqual(expectedArray);
            });
    });
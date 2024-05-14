import { EzFloat } from '../../../../ezlibrary/helpers/EzFloat.js';

describe(
    'Defect EW-321: https://ezclocker.atlassian.net/browse/EW-321',
    () => {
        test(
            'EW321: should convert valid string to float',
            () => {
                expect(
                    EzFloat.toFloat('3.14'))
                    .toBe(3.14);
            });
    });
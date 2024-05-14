import { EzFloat } from '../../../../ezlibrary/helpers/EzFloat.js';

describe(
    'Defect EW-313: https://ezclocker.atlassian.net/browse/EW-313',
    () => {
        test(
            'EW303 A',
            () => {
                expect(EzFloat.toFloat('+3.5e2')).toBe(350);
            });

        test(
            'EW303 B',
            () => {
                expect(EzFloat.toFloat('3.14')).toBe(3.14);
            });

        test(
            'EW303 C',
            () => {
                expect(EzFloat.toFloat('3.14')).toBe(3.14);
            });
    });

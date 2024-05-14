import { EzAsync } from '../../../../ezlibrary/helpers/EzAsync.js';

describe(
    'Defect EW-317: : https://ezclocker.atlassian.net/browse/EW-317',
    () => {

        test(
            'calls the function passed to it and waits for its completion',
            async () => {
                const promiseFunctionToCall = jest.fn((resolve, reject) => resolve('result'));

                await EzAsync.promise(promiseFunctionToCall);

                expect(promiseFunctionToCall).toHaveBeenCalled();
            },
            10000);
    });

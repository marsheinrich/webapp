import { EzHttpHeader } from '../../../../ezlibrary/enums/EzHttpHeader.js';
import { EzHttpMediaType } from '../../../../ezlibrary/enums/EzHttpMediaType.js';
import { EzHttpRequestMethod } from '../../../../ezlibrary/enums/EzHttpRequestMethod.js';
import { EzHttp } from '../../../../ezlibrary/helpers/EzHttp.js';

const runDefectTests = false;

const ezTest = runDefectTests
    ? globalThis['test']
    : globalThis['test']['skip'];

const ezIt = runDefectTests
    ? globalThis['it']
    : globalThis['it']['skip'];

if (!runDefectTests) {
    console.log('Skipped all defect tests in EzPromise-defects.test.js');
}

describe(
    'EzHttp Defect Tests',
    () => {
        test('performs a GET request by default', async () => {
            const url = 'https://ezclocker.com';
            console.log(JSON.stringify(EzHttpHeader));
            try {
                let headers = {};
                headers[EzHttpHeader.Accept] = EzHttpMediaType.ANY;

                const response = await EzHttp.httpRequestAsync(
                    EzHttpRequestMethod.GET,
                    url,
                    // Parameters
                    null,
                    // Headers
                    headers,
                    // downloadStatusCallback
                    null,
                    // uploadStatusCallback
                    null);

                console.log(JSON.stringify(response));

                expect(response).toBeDefined();
            } catch (err) {
                expect(err).toBeNull();
            }
        });
    });

import { EzHtml } from '../../../../ezlibrary/helpers/EzHtml.js';

import {
    EzBadParamException
} from '../../../../ezlibrary/exceptions/EzExceptions.js'

const runDefectTests = true;

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
    'EzHtml Defect Tests',
    () => {
        ezIt(
            'Defect EW-331: https://ezclocker.atlassian.net/browse/EW-331',
            () => {
                const id = 'myButton';

                const expectedOutput = `<button id="${id}"></button>`;

                const result = EzHtml.button(id);

                expect(result).toEqual(expectedOutput);
            });

        ezIt(
            'Defect EW-332: https://ezclocker.atlassian.net/browse/EW-332',
            () => {
                const result = EzHtml.attributeArrayToElementAttributes([]);

                expect(result).toEqual('');
            });

        ezIt(
            'Defect EW-343: https://ezclocker.atlassian.net/browse/EW-343',
            () => {
                const id = 'myButton';
                const classes = 'btn btn-primary';
                const title = 'Click me';
                const expectedOutput = `<button id="myButton" class="btn btn-primary" title="Click me"></button>`;

                const result = EzHtml.button(id, classes, title);

                expect(result).toEqual(expectedOutput);
            });

        ezIt(
            'Defect EW-344: https://ezclocker.atlassian.net/browse/EW-344',
            () => {
                expect(
                    () => {
                        EzHtml.div();
                    })
                    .toThrow(new EzBadParamException('id', EzHtml, EzHtml.a));
            });

        const expectedDivResults = '<div id="myDivId"></div>';

        ezIt(
            'Defect EW-345: https://ezclocker.atlassian.net/browse/EW-345',
            () => {
                const result = EzHtml.div('myDivId');

                expect(result).toEqual(expectedDivResults);
            });

        ezIt(
            'Defect EW-346: https://ezclocker.atlassian.net/browse/EW-346',
            () => {
                const optionalAttributes = ['class="container"', 'style="background-color: #fff;"'];
                const innerHtml = '<p>Hello, world!</p>';
                const result = EzHtml.div('myDivId', optionalAttributes, innerHtml);

                expect(result).toEqual('<div id="myDivId" class="container" style="background-color: #fff;"><p>Hello, world!</p></div>');
            });

        ezIt(
            'Defect EW-347: https://ezclocker.atlassian.net/browse/EW-347',
            () => {
                // Trim extra whitespace
                const result1 = EzHtml.div('myDivId', null, null).trim();

                // Adjust expected value
                expect(result1).toEqual(expectedDivResults);

                // Trim extra whitespace
                const result2 = EzHtml.div('myDivId', undefined, undefined).trim();

                // Adjust expected value
                expect(result2).toEqual(expectedDivResults);
            });

        const linkId = 'myLinkId';
        const linkHref = 'https://example.com';
        const linkOptionalAttributes = ['class="btn"', 'target="_blank"'];
        const linkInnerHtml = 'Click me';

        ezIt(
            'Defect EW-358: https://ezclocker.atlassian.net/browse/EW-358',
            () => {
                const expectedResult = `<a id="${linkId}" href="${linkHref}" ${linkOptionalAttributes[0]} ${linkOptionalAttributes[1]}>${linkInnerHtml}</a>`;

                const result = EzHtml.a(
                    linkId,
                    linkHref,
                    linkOptionalAttributes,
                    linkInnerHtml);

                expect(result).toEqual(expectedResult);
            });

        ezIt(
            'Defect EW-359: https://ezclocker.atlassian.net/browse/EW-359',
            () => {
                const expectedResult = `<a id="${linkId}" href="#">${linkInnerHtml}</a>`;

                const result = EzHtml.a(
                    linkId,
                    null,
                    null,
                    linkInnerHtml);

                expect(result).toEqual(expectedResult);
            });

        ezIt(
            'Defect EW-360a: https://ezclocker.atlassian.net/browse/EW-360b',
            () => {
                expect(
                    () => EzHtml.a(
                        null,
                        linkHref))
                    .toThrow('A valid id parameter value is required');
            });

        ezIt(
            'Defect EW-360b: https://ezclocker.atlassian.net/browse/EW-360b',
            () => {
                expect(
                    () => EzHtml.a(linkId))
                    .toThrow('A valid innerHtml parameter value is required');
            });

        ezIt(
            'Defect EW-361: https://ezclocker.atlassian.net/browse/EW-361',
            () => {
                const attributes = ['class="myClass"'];

                const expectedResult = 'class="myClass"';

                const result = EzHtml.attributeArrayToElementAttributes(attributes);

                expect(result).toEqual(expectedResult);
            });

        ezIt(
            'Defect EW-362: https://ezclocker.atlassian.net/browse/EW-362',
            () => {
                const attributes = ['class="myClass"', 'id="myId"', 'onclick="myFunction()"'];

                const expectedResult = 'class="myClass" id="myId" onclick="myFunction()"';

                const result = EzHtml.attributeArrayToElementAttributes(attributes);

                expect(result).toEqual(expectedResult);
            });

        ezIt(
            'Defect EW-363: https://ezclocker.atlassian.net/browse/EW-363',
            () => {
                const attributes = ['class="myClass"', '', 'id="myId"', undefined, null];

                const expectedResult = 'class="myClass" id="myId"';

                const result = EzHtml.attributeArrayToElementAttributes(attributes);

                expect(result).toEqual(expectedResult);
            });
    });

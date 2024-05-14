import { EzBadParamException } from '../../../../ezlibrary/exceptions/EzExceptions.js';
import { EzDocument } from '../../../../ezlibrary/helpers/EzDocument.js';
import { EzAsync } from '../../../../ezlibrary/helpers/EzAsync.js';

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
    'EzAsync Defect Tests',
    () => {
        ezTest(
            'Defect EW-376: https://ezclocker.atlassian.net/browse/EW-376',
            () => {
                const parentElementId = 'EzDivParent';
                const parentElement = document.createElement('div');
                parentElement.id = parentElementId;

                const childElementId = 'EzSpanChildElement';
                const childElement = document.createElement('span');
                childElement.id = childElementId;

                document.body.appendChild(parentElement);

                parentElement.appendChild(childElement);

                EzDocument.removeElement(parentElementId);

                expect(document.getElementById(parentElement.id)).toBeNull();

                expect(document.getElementById(childElement.id)).toBeNull();
            });

        ezIt(
            'Defect EW-396: https://ezclocker.atlassian.net/browse/EW-396',
            () => {
                document.body.innerHTML = '<div id="testElement" class="testClass"></div>';
                const elementId = 'testElement';
                const className = '';

                try {
                    EzDocument.removeElementClass(elementId, className);
                } catch (err) {
                    const element = document.getElementById(elementId);
                    expect(element.classList.contains('testClass')).toBe(true);
                }
            });
    });

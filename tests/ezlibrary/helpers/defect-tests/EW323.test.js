import { EzFunction } from '../../../../ezlibrary/helpers/EzFunction.js';

/* Created a mock class to test calling the function within a difference context. */
class TestClass {
    constructor(aAdjustment) {
        this.adjustment = aAdjustment && 'number' === typeof aAdjustment
            ? aAdjustment
            : 0;
    }

    adjustment = 0;

    fn1(a, b) {
        return a - b - this.adjustment;
    }

    fn2(a, b) {
        return a + b + this.adjustment;
    }
}

describe(
    'Defect EW-323: https://ezclocker.atlassian.net/browse/EW-323',
    () => {
        test(
            'EW323 (heavily modified)',
            () => {
                // Mock function
                // const mockFunction = jest.fn((a, b) => a + b);
                // const context = { value: 5 };
                const params = [2, 3];

                /*
                    Create a new instance of TestClass with adjustment = 5 for the first context
                */
                let testClassA = new TestClass(5);

                /*
                    Create a new instance of TestClass with adjustment = 6 for the second context
                */
                let testClassB = new TestClass(6);


                testClassB.adjustment = 6;

                let expectedResult = 11;

                // Call the testClassA.fn2(..) method within the context of testClassB (different context)
                expect(
                    EzFunction.callWithParams(
                        testClassA.fn2,
                        params,
                        testClassB))
                    .toBe(expectedResult);

                expectedResult = 10;

                // Call the testClassA.fn2(..) method within the context of testClassA (normal)
                expect(
                    EzFunction.callWithParams(
                        testClassA.fn2,
                        params,
                        testClassA))
                    .toBe(expectedResult);

                expectedResult = 11;

                // Call the testClassB.fn2(..) method within the context of testClassA (normal)
                expect(
                    EzFunction.callWithParams(
                        testClassB.fn2,
                        params,
                        testClassB))
                    .toBe(expectedResult);

                expectedResult = 10;

                // Call the testClassB.fn2(..) method within the context of testClassA (different context)
                expect(
                    EzFunction.callWithParams(
                        testClassB.fn2,
                        params,
                        testClassA))
                    .toBe(expectedResult);

                /* I'm not sure how to wrap the testClassA.fn2 and testClassA.fn2 in a jest spy to use toHaveBeenCalledWith(...) */
                //expect(mockFunction).toHaveBeenCalledWith(...params);

                /* Not sure you can validate what context the function was called with this way? */
                //expect(mockFunction).toHaveBeenCalledWith(context);
            });
    });
import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject
} from '/ezlibrary/helpers/EzHelpers.js';


import { EzSubscriptionMonthlyFeesCalcEngine } from '/ezlibrary/calc-engines/EzSubscriptionMonthlyFeesCalcEngine.js';
import { EzSubscriptionYearlyFeesCalcEngine } from '/ezlibrary/calc-engines/EzSubscriptionYearlyFeesCalcEngine.js';

/**
 * @class
 * @description
 * Stores the subscription monthly fee values
 * Provides calculation of the monthly fees from a license entity
 * -----------------------------------------------------------------
 * Import with:
 *     import { EzSubscriptionFeeCalcEngine } from '/ezlibrary/calc-engines/EzSubscriptionFeeCalcEngine.js';
 * -----------------------------------------------------------------
 * Calculate with:
 *     let ezSubscriptionFeeCalcEngine = EzSubscriptionFeeCalcEngine.calculate(license);
 * -----------------------------------------------------------------
 */
export class EzSubscriptionFeeCalcEngine {

    /**
     * @static
     * @public @method
     * Returns an instance of EzSubscriptionFeeCalcEngine with the subscription fees for the provided
     * license calculated.
     * @param {object} license
     * @returns {EzSubscriptionFeeCalcEngine}
     */
    static calculate(license) {
        if (!EzObject.isValid(license)) {
            throw new EzBadParamException(
                'license',
                EzSubscriptionFeeCalcEngine,
                EzSubscriptionFeeCalcEngine.calculate);
        }

        let ezSubscriptionFeeCalcEngine = new EzSubscriptionFeeCalcEngine();

        ezSubscriptionFeeCalcEngine.ezCalculate(license);

        return ezSubscriptionFeeCalcEngine;
    }

    /**
     * @privatge @field
     * Stores the calculated monthly fees & calculation engine
     * @type {EzSubscriptionMonthlyFeesCalcEngine}
     */
    #ezSubscriptionMonthlyFees;
    /**
     * @public @readonly @property
     * Gets the calculated monthly fees & calculation engine
     * @returns {EzSubscriptionMonthlyFeesCalcEngine}
     */
    get ezSubscriptionMonthlyFees() {
        return this.#ezSubscriptionMonthlyFees;
    }

    /**
     * @privatge @field
     * Stores the calculated yearly fees & calculation engine
     * @type {EzSubscriptionYearlyFeesCalcEngine}
     */
    #ezSubscriptionYearlyFees;
    /**
     * @public @readonly @property
     * Gets the calculated yearly fees & calculation engine
     * @returns {EzSubscriptionYearlyFeesCalcEngine}
     */
    get ezSubscriptionYearlyFees() {
        return this.#ezSubscriptionYearlyFees;
    }

    /**
     * @public @method
     * Calculates the license fees for the provided license
     * @param {license}
     */
    ezCalculate(license) {
        if (!EzObject.isValid(license)) {
            throw new EzBadParamException(
                'license',
                this,
                this.ezCalculate);
        }

        this.#ezSubscriptionMonthlyFees = EzSubscriptionMonthlyFeesCalcEngine.calculate(license);

        this.#ezSubscriptionYearlyFees = EzSubscriptionYearlyFeesCalcEngine.calculate(license);
    }
}
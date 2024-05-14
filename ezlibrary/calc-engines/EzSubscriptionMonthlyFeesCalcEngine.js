import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzNumber,
    EzArray
} from '/ezlibrary/helpers/EzHelpers.js';

/**
 * @class
 * @description
 * Stores the subscription monthly fee values
 * Provides calculation of the monthly fees from a license entity
 * -----------------------------------------------------------------
 * Import with:
 *     import { EzSubscriptionMonthlyFeesCalcEngine } from '/ezlibrary/calc-engines/EzSubscriptionMonthlyFeesCalcEngine.js';
 * -----------------------------------------------------------------
 * Calculate with:
 *     let EzSubscriptionMonthlyFeesCalcEngine = EzSubscriptionMonthlyFeesCalcEngine.calculate(license);
 * -----------------------------------------------------------------
 */
export class EzSubscriptionMonthlyFeesCalcEngine {
    /**
     * @static
     * @public @method
     * Calculates the subscription monthly fees from the provided license entity.
     * @param {object} license
     * @returns {EzSubscriptionMonthlyFeesCalcEngine}
     */
    static calculate(license) {
        if (!EzObject.isValid(license)) {
            throw new EzBadParamException(
                'license',
                EzSubscriptionMonthlyFeesCalcEngine,
                EzSubscriptionMonthlyFeesCalcEngine.calculate);
        }

        let ezSubscriptionMonthlyFeesCalcEngine = new EzSubscriptionMonthlyFeesCalcEngine();

        ezSubscriptionMonthlyFeesCalcEngine.ezCalculate(license);

        return ezSubscriptionMonthlyFeesCalcEngine;
    }

    /**
     * @private @field
     * Stores the subscription's normal monthly fee
     * Value is always zero or a positive number.
     * @type {number}
     */
    #ezSubscriptionMonthlyFee = 0.00;
    /**
     * @public @property @getter
     * Gets the subscription's normal monthly fee
     * @returns {number}
        Zero or a positive number
     */
    get ezSubscriptionMonthlyFee() {
        return this.#ezFormatDecimalPlaces(this.#ezSubscriptionMonthlyFee);
    }
    /**
     * @public @property @gsetter
     * Sets the subscription's normal monthly fee
     * If the provided value is greater than or equal to zero, then the property is set to the provided value.
     * If the provided value is less than zero, then the property is set to zero.
     * @param {number} ezSubscriptionMonthlyFee
     * Default: 0.00
     * Acceptable values: zero and any other positive number
     */
    set ezSubscriptionMonthlyFee(ezSubscriptionMonthlyFee) {
        if (!EzNumber.isNumber(ezSubscriptionMonthlyFee)) {
            ezSubscriptionMonthlyFee = 0.00;
        }

        this.#ezSubscriptionMonthlyFee = 0.00 <= this.#ezFormatDecimalPlaces(ezSubscriptionMonthlyFee)
            ? ezSubscriptionMonthlyFee
            : 0.00;
    }

    /**
     * @private @field
     * Stores the subscription's discount percentage (as a percent)
     * The value stored is always positive or zero.
     * @type {number}
     */
    #ezSubscriptionDiscountPercentage = 0.00;
    /**
     * @public @property @getter
     * Gets the subscription's discount percentage (as a percent)
     * @returns {number}
     */
    get ezSubscriptionDiscountPercentage() {
        return this.#ezFormatDecimalPlaces(this.#ezSubscriptionDiscountPercentage);
    }
    /**
     * @public @property @gsetter
     * Sets the subscription's discount percentage (as a percent)
     * If the provided value is greater than or equal to zero, then the property is set to the provided value
     * If the provided value is less than zero, then the property is set to zero.
     * @param {number} ezSubscriptionPercentageDiscount
     */
    set ezSubscriptionDiscountPercentage(ezSubscriptionDiscountPercentage) {
        if (!EzNumber.isNumber(ezSubscriptionDiscountPercentage)) {
            ezSubscriptionDiscountPercentage = 0.00;
        }

        this.#ezSubscriptionDiscountPercentage = 0.00 <= this.#ezFormatDecimalPlaces(ezSubscriptionDiscountPercentage)
            ? ezSubscriptionDiscountPercentage
            : 0.00;
    }

    /**
     * @private @field
     * Stores the subscription percentage discount's cash amount
     * The value is always stored as a negative number or zero.
     * @type {number}
     */
    #ezSubscriptionPercentageNegativeAmount = 0.00;
    /**
     * @public @property @getter
     * Gets the subscription percentage discount's cash amount
     * The value returned is always zero or a negative number
     * @returns {number}
     * A positive number or zero.
     */
    get ezSubscriptionPercentageNegativeAmount() {
        return this.#ezFormatDecimalPlaces(this.#ezSubscriptionPercentageNegativeAmount);
    }
    /**
     * @public @property @gsetter
     * Sets the subscription percentage discount's cash amount
     * If the provided value is greater than zero, then the the property is set to (-1 * {provided value})
     * If the provided value is zero, then the property is set to zero.
     * If the provided value is less than zero, then the property is set to the provided value.
     * @param {number} ezSubscriptionPercentageDiscount
     * Default value: 0.00
     * Acceptable values: A positive number or zero.
     */
    set ezSubscriptionPercentageNegativeAmount(ezSubscriptionPercentageNegativeAmount) {
        if (!EzNumber.isNumber(ezSubscriptionPercentageNegativeAmount)) {
            ezSubscriptionPercentageNegativeAmount = 0.00;
        }

        this.#ezSubscriptionPercentageNegativeAmount = this.#ezFormatDecimalPlaces(ezSubscriptionPercentageNegativeAmount * -1);
    }

    /**
     * @private @field
     * Stores the subscription's cash discounts total
     * The value is stored as a negative number or zero.
     * @type {number}
     */
    #ezSubscriptionCashDiscountsNegativeTotal = 0.00;
    /**
     * @public @property @getter
     * Gets the subscription's cash discounts total
     * @returns {number}
     * A negative number or zero
     */
    get ezSubscriptionCashDiscountsTotal() {
        return this.#ezFormatDecimalPlaces(this.#ezSubscriptionCashDiscountsNegativeTotal);
    }
    /**
     * @public @property @gsetter
     * Sets the subscription's cash discounts total
     * If the provided value is greater than zero, then the property is set to (-1 *  {provided value})
     * If the provided value is equal to zero, then the property is set to zero
     * If the provied value is less than zero, then the property is set to the provided value.
     * @param {number} ezSubscriptionCashDiscountsNegativeTotal
     * Default: 0.00
     * Acceptable values: zero and any negative number.
     */
    set ezSubscriptionCashDiscountsNegativeTotal(ezSubscriptionCashDiscountsNegativeTotal) {
        if (!EzNumber.isNumber(ezSubscriptionCashDiscountsNegativeTotal)) {
            ezSubscriptionCashDiscountsNegativeTotal = 0.00;
        }

        this.#ezSubscriptionCashDiscountsNegativeTotal = this.#ezFormatDecimalPlaces(ezSubscriptionCashDiscountsNegativeTotal * -1);
    }

    /**
     * @private @field
     * Stores the total subscription discount amount
     * The value is stored as zero or a negative number
     * @type {number}
     */
    #ezSubscriptionTotalDiscountNegativeAmount = 0.00;
    /**
     * @public @property @getter
     * Gets the total subscription discount amount
     * @returns {number}
        A negative number or zero.
     */
    get ezSubscriptionTotalDiscountNegativeAmount() {
        return this.#ezFormatDecimalPlaces(this.#ezSubscriptionTotalDiscountNegativeAmount);
    }
    /**
     * @public @property @gsetter
     * Sets the total subscription discount amount
     * If the provided value is greater than zero, then the property is set to (-1 * {provided value})
     * If the provdied value is zero, then the property is set to zero.
     * If the provided value is less than zero, then the property is set to the provided value
     * @param {number} ezSubscriptionTotalDiscountAmount
     * Default: 0.00
     * Acceptable values: zero and any negative number.
     */
    set ezSubscriptionTotalDiscountNegativeAmount(ezSubscriptionTotalDiscountNegativeAmount) {
        if (!EzNumber.isNumber(ezSubscriptionTotalDiscountNegativeAmount)) {
            ezSubscriptionTotalDiscountNegativeAmount = 0.00;
        }

        this.#ezSubscriptionTotalDiscountNegativeAmount = this.#ezFormatDecimalPlaces(ezSubscriptionTotalDiscountNegativeAmount * -1);
    }

    /**
     * @private @field
     * Stores the subscription's monthly fee less any discounts
     * The value stored is a positive number or zero.
     * @type {number}
     */
    #ezDiscountAdjustedSubscriptionMonthlyFee = 0.00;
    /**
     * @public @property @getter
     * Gets the subscription's monthly fee less any discounts
     * @returns {number}
     * A positive number or zero.
     */
    get ezDiscountAdjustedSubscriptionMonthlyFee() {
        return this.#ezFormatDecimalPlaces(this.#ezDiscountAdjustedSubscriptionMonthlyFee);
    }
    /**
     * @public @property @gsetter
     * Sets the subscription's monthly fee less any discounts
     * @param {number} ezDiscountAdjustedSubscriptionMonthlyFee
     * Default: 0.00
     * Acceptable values: zero or any positive number
     */
    set ezDiscountAdjustedSubscriptionMonthlyFee(ezDiscountAdjustedSubscriptionMonthlyFee) {
        if (!EzNumber.isNumber(ezDiscountAdjustedSubscriptionMonthlyFee)) {
            ezDiscountAdjustedSubscriptionMonthlyFee = 0.00;
        }

        this.#ezDiscountAdjustedSubscriptionMonthlyFee = 0.00 <= this.#ezFormatDecimalPlaces(ezDiscountAdjustedSubscriptionMonthlyFee)
            ? ezDiscountAdjustedSubscriptionMonthlyFee
            : 0.00;
    }

    /**
     * @private @field
     * Stores the total additional monthly fee of all feature packages.
     * The value stored is a positive number or zero.
     * @type {number}
     */
    #ezFeaturePackagesAdditionalMonthlyFees = 0.00;
    /**
     * @public @property @getter
     * Gets the total additional monthly fee of all feature packages.
     * @returns {number}
     * A positive number or zero
     */
    get ezFeaturePackagesAdditionalMonthlyFees() {
        return this.#ezFormatDecimalPlaces(this.#ezFeaturePackagesAdditionalMonthlyFees);
    }
    /**
     * @public @property @gsetter
     * Sets the total additional monthly fee of all feature packages.
     * If the provided value is zero, then the property is set to zero.
     * If the provided value is greater than zero, then the property is set to the provided value.
     * If the provided value is less than zero, then the property is set to zero.
     * @param {number} ezFeaturePackagesAdditionalMonthlyFees
     */
    set ezFeaturePackagesAdditionalMonthlyFees(ezFeaturePackagesAdditionalMonthlyFees) {
        if (!EzNumber.isNumber(ezFeaturePackagesAdditionalMonthlyFees)) {
            ezFeaturePackagesAdditionalMonthlyFees = 0.00;
        }

        this.#ezFeaturePackagesAdditionalMonthlyFees = 0.00 <= this.#ezFormatDecimalPlaces(ezFeaturePackagesAdditionalMonthlyFees)
            ? ezFeaturePackagesAdditionalMonthlyFees
            : 0.00;
    }

    /**
     * @private @field
     * Stores the calculated total monthly fee that includes:
     * The subscription fee, less any discounts, plus any additional feature package fees.
     * The value is stored as a positive value or zero.
     * @type {number}
     */
    #ezAdjustedTotalMonthlyFee = 0.00;
    /**
     * @public @property @getter
     * Gets the calculated total monthly fee that includes:
     * @returns {number}
     * A positive value or zero.
     */
    get ezAdjustedTotalMonthlyFee() {
        return this.#ezFormatDecimalPlaces(this.#ezAdjustedTotalMonthlyFee);
    }
    /**
     * @public @property @gsetter
     * Sets the calculated total monthly fee that includes:
     * If the provided value is zero, then the property is set to zero.
     * If the provided value is greater than zero, then the property is set to the provided value.
     * If the provided value is less than zero, then the property is set to zero.
     * @param {number} ezAdjustedTotalMonthlyFee
     */
    set ezAdjustedTotalMonthlyFee(ezAdjustedTotalMonthlyFee) {
        if (!EzNumber.isNumber(ezAdjustedTotalMonthlyFee)) {
            ezAdjustedTotalMonthlyFee = 0.00;
        }

        this.#ezAdjustedTotalMonthlyFee = 0.00 <= this.#ezFormatDecimalPlaces(ezAdjustedTotalMonthlyFee)
            ? ezAdjustedTotalMonthlyFee
            : 0.00;
    }

    /**
     * @public @method
     * Calculates the subscription monthly fees from the provided license entity.
     * @param {object} license
     */
    ezCalculate(license) {
        if (!EzObject.isValid(license)) {
            throw new EzBadParamException(
                'license',
                this,
                this.ezCalculate);
        }

        if (EzObject.isValid(license.subscriptionPlan)) {
            this.ezSubscriptionMonthlyFee = license.subscriptionPlan.monthlyFee;

            this.#ezCalculateSubscriptionTotalDiscounts(
                license.subscriptionPlan.percentDiscount,
                license.activeDiscounts);

            this.#ezCalculateFeaturePackageAdditionalFees(license.featurePackages);

            this.#ezCalculatedAdjustedTotalMonthlyFee();
        }
    }

    /**
     * @private @method
     * Calculates the subscription's percentage discount amount
     * @param {number} percentDiscount
     */
    #ezCalculateSubscriptionPercentageDiscount(percentDiscount) {
        this.ezSubscriptionDiscountPercentage = EzNumber.numberOrZero(percentDiscount);

        if (0 == this.ezSubscriptionDiscountPercentage) {
            this.#ezSubscriptionPercentageNegativeAmount = 0.00;

            return;
        }

        let potentialSubscriptionPercentageNegativeAmount = this.#ezFormatDecimalPlaces(
            this.ezSubscriptionMonthlyFee * (this.ezSubscriptionDiscountPercentage / 100));

        let subscriptionMonthlyFeeLesspotentialSubscriptionPercentageNegativeAmount = this.#ezFormatDecimalPlaces(
            this.ezSubscriptionMonthlyFee - potentialSubscriptionPercentageNegativeAmount);

        this.#ezSubscriptionPercentageNegativeAmount = 0.00 >= subscriptionMonthlyFeeLesspotentialSubscriptionPercentageNegativeAmount
            ? potentialSubscriptionPercentageNegativeAmount
            : this.ezSubscriptionMonthlyFee;
    }

    /**
     * @private @method
     * Calculates the subscription's cash discounts
     */
    #ezCalculateSubscriptionCashDiscounts(activeDiscounts) {
        if (!EzArray.arrayHasLength(activeDiscounts)) {
            this.ezSubscriptionCashDiscountsNegativeTotal = 0.00;

            return;
        }

        // Step 1: Determine if any subscription amount is left before calculating cash discounts.
        let percentDiscountAdjustedSubscriptionMonthlyFee = this.#ezFormatDecimalPlaces(
            this.ezSubscriptionMonthlyFee + this.ezSubscriptionPercentageNegativeAmount);

        // If the percentDiscountAdjustedSubscriptionMonthlyFee is less than or equal to zero, then cash discounts cannot apply
        if (0.00 >= percentDiscountAdjustedSubscriptionMonthlyFee) {
            // The subscription is already zero after percentage discounts, no additional discounts can apply
            this.ezSubscriptionCashDiscountsNegativeTotal = 0.00;

            return;
        }

        // Step2: Add up the cash discounts
        let potentialSubscriptionCashDiscountsNegativeTotal = 0.00;

        if (EzArray.hasLength(license.activeDiscounts)) {
            for (let ezNovaDiscount of license.activeDiscounts) {
                potentialSubscriptionCashDiscountsNegativeTotal += ezNovaDiscount.amount * -1;
            }
        }

        /*
            1) If the percentDiscountAdjustedSubscriptionMonthlyFee + (-potentialSubscriptionCashDiscountsNegativeTotal) is less than zero,
               then set ezSubscriptionCashDiscountsNegativeTotal equal to percentDiscountAdjustedSubscriptionMonthlyFee.
            2) If the percentDiscountAdjustedSubscriptionMonthlyFee + (-potentialSubscriptionCashDiscountsNegativeTotal) is greater than or
               equal to zero, then set ezSubscriptionCashDiscountsNegativeTotal equal to potentialSubscriptionCashDiscountsNegativeTotal
        */

        let percentDiscountAdjustedSubscriptionMonthlyFeeWithpotentialSubscriptionCashDiscountsNegativeTotal = this.#ezFormatDecimalPlaces(
            percentDiscountAdjustedSubscriptionMonthlyFee + potentialSubscriptionCashDiscountsNegativeTotal);

        this.ezSubscriptionCashDiscountsNegativeTotal =
            0.00 >= percentDiscountAdjustedSubscriptionMonthlyFeeWithpotentialSubscriptionCashDiscountsNegativeTotal
                ? potentialSubscriptionCashDiscountsNegativeTotal
                : percentDiscountAdjustedSubscriptionMonthlyFee;
    }

    /**
     * @private @method
     * Calcualtes the total subscription discount amount
     * @param {number} percentDiscount
     * @param {array} activeDiscounts
     */
    #ezCalculateSubscriptionTotalDiscounts(percentDiscount, activeDiscounts) {
        this.#ezCalculateSubscriptionPercentageDiscount(percentDiscount);

        this.#ezCalculateSubscriptionCashDiscounts(activeDiscounts);

        // Formula: potentialDiscountAdjustedTotalMonlyFee =  ezSubscriptionMonthlyFee + (-ezSubscriptionTotalDiscountNegativeAmount)
        let potentialDiscountAdjustedTotalMonlyFee = this.#ezFormatDecimalPlaces(
            this.ezSubscriptionMonthlyFee + this.ezSubscriptionTotalDiscountNegativeAmount);

        //  1) If the potentialDiscountAdjustedTotalMonlyFee is greater than or equal to zero, then set the ezSubscriptionTotalDiscountNegativeAmount
        //     equal to potentialDiscountAdjustedTotalMonlyFee.
        //  2) If potentialDiscountAdjustedTotalMonlyFee is less than zero, then set ezSubscriptionTotalDiscountNegativeAmount to zero.
        this.ezSubscriptionTotalDiscountNegativeAmount = 0.00 >= potentialDiscountAdjustedTotalMonlyFee
            ? potentialDiscountAdjustedTotalMonlyFee
            : 0.00;

        // Formula: ezDiscountAdjustedSubscriptionMonthlyFee = ezSubscriptionMonthlyFee + (-ezSubscriptionTotalDiscountNegativeAmount)
        this.ezDiscountAdjustedSubscriptionMonthlyFee = this.#ezFormatDecimalPlaces(
            this.ezSubscriptionMonthlyFee + this.ezSubscriptionTotalDiscountNegativeAmount);
    }

    /**
     * @private @method
     * Calcualtes the feature packages total additional fees
     * @param {array} ezEmployerFeaturePackages
     */
    #ezCalculateFeaturePackageAdditionalFees(ezEmployerFeaturePackages) {
        if (!EzArray.arrayHasLength(ezEmployerFeaturePackages)) {
            this.ezFeaturePackagesAdditionalMonthlyFees = 0.00;

            return;
        }

        let potentialFeaturePackageAdditionalFees = 0.00;

        for (let ezEmployerFeaturePacakge of ezEmployerFeaturePackages) {
            potentialFeaturePackageAdditionalFees = this.#ezFormatDecimalPlaces(potentialFeaturePackageAdditionalFees + ezEmployerFeaturePacakge.billingAmount);
        }

        this.ezFeaturePackagesAdditionalMonthlyFees = 0.00 <= potentialFeaturePackageAdditionalFees
            ? potentialFeaturePackageAdditionalFees
            : 0.00;
    }

    /**
     * @private @method
     * Calculates the total monthly subscription less discounts plus feature package additional fees.
     */
    #ezCalculatedAdjustedTotalMonthlyFee() {
        // Formula: ezAdjustedTotalMonthlyFee = ezSubscriptionMonthlyFee + (-ezSubscriptionTotalDiscountNegativeAmount) + ezFeaturePackagesAdditionalMonthlyFees
        this.ezAdjustedTotalMonthlyFee = this.#ezFormatDecimalPlaces(
            this.ezSubscriptionMonthlyFee +
            this.ezSubscriptionTotalDiscountNegativeAmount +
            this.ezFeaturePackagesAdditionalMonthlyFees);
    }

    /**
     * @private @method
     * Formats the provided number to two decimal places.
     * @param {number} value
     * @returns {number}
     */
    #ezFormatDecimalPlaces(value) {
        if (!EzNumber.isNumber(value)) {
            throw new EzBadParamException(
                'value',
                EzNumber,
                EzNumber.formatDecimal);
        }

        return EzNumber.formatDecimal(value, 2);
    }
}

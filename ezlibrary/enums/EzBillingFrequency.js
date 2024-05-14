import { EzEnumeration2 } from '/ezlibrary/enums/EzEnumeration2.js';

/**
 * @class
 * @extends {EzEnumeration2}
 * @description
 * A template for an ezClocker enumeration class.
 * ------------------------------------------------------------------
 * Import into non-enumeration classes with:
 *      import {
 *          // ... other enumeration classes ...
 *          EzBillingFrequency
 *      } from '/ezlibrary/enums/EzEnumerations.js';
 * ------------------------------------------------------------------
 * Import into other enumeration classes or classes that cannot
 * import EzEnumerations:
 *      import { EzBillingFrequency } from '/ezlibrary/enums/EzBillingFrequency.js';
 * ------------------------------------------------------------------
 * Access static reference:
 *      Inside class: EzBillingFrequency.{method or property}
 *      Outside of class: EzBillingFrequency.{method or property}
 * ------------------------------------------------------------------
 */
export class EzBillingFrequency extends EzEnumeration2 {
    /**
     * @private @field
     * Stores the singleton instance of this enumeration class.
     * @type {EzBillingFrequency}
     */
    static #ezEnumerationSingleton = null;

    /**
     * @static
     * Static Initialization
     */
    static {
        if (null == this.#ezEnumerationSingleton) {
            this.#ezEnumerationSingleton = new EzBillingFrequency(
                // Enum property names
                [
                    'UNKNOWN',
                    'NONE',
                    'YEARLY',
                    'QUARTERLY',
                    'MONTHLY',
                    'WEEKLY',
                    'DAILY',
                    'ONE_TIME',
                    'SUPPORT_YEARLY',
                    'SUPPORT_QUARTERLY',
                    'SUPPORT_MONTHLY',
                    'SUPPORT_WEEKLY',
                    'SUPPORT_DAILY',
                    'SUPPORT_ONE_TIME',
                    'SUPPORT'
                ],
                // Enum property values for each enum property name as an array
                // Enter null if the values are equal to the names
                null,
                // Optional array of additional data for eac enumeration property.
                // Enter null if not needed.
                [
                    // UNKNOWN
                    {
                        displayName: "Support will contact when payment needs made.",
                        billingFrequency: 0,
                        autoBilled: false
                    },
                    {
                        displayName: "No charge.",
                        billingFrequency: 0,
                        autoBilled: false
                    },
                    // YEARLY
                    {
                        displayName: 'Automatic Yearly Charge',
                        billingFrequency: 2023,
                        autoBilled: true
                    },
                    // QUARTERLY
                    {
                        displayName: "Automatic Quarterly Charge",
                        billingFrequency: 4,
                        autoBilled: true
                    },
                    // MONTHLY
                    {
                        displayName: "Automatic Monthly Charge",
                        billingFrequency: 12,
                        autoBilled: true
                    },
                    // WEEKLY
                    {
                        displayName: "Automatic Weekly Charge",
                        billingFrequency: 52,
                        autoBilled: true
                    },
                    // DAILY
                    {
                        displayName: "Automatic Daily Charge",
                        billingFrequency: 365,
                        autoBilled: true
                    },
                    // ONE_TIME
                    {
                        displayName: "One-time charge",
                        billingFrequency: 1,
                        autoBilled: true
                    },
                    // SUPPORT_YEARLY
                    {
                        displayName: "Support will collect payment yearly.",
                        billingFrequency: 2023,
                        autoBilled: false
                    },
                    // SUPPORT_QUARTERLY
                    {
                        displayName: "Support will collect the payment quarterly.",
                        billingFrequency: 4,
                        autoBilled: false
                    },
                    // SUPPORT_MONTHLY
                    {
                        displayName: "Support will collect payment monthly.",
                        billingFrequency: 12,
                        autoBilled: false
                    },
                    // SUPPORT_WEEKLY
                    {
                        displayName: "Support will collect the payment weekly.",
                        billingFrequency: 52,
                        autoBilled: false
                    },
                    // SUPPORT_DAILY
                    {
                        displayName: "Support will collect the payment daily.",
                        billingFrequency: 365,
                        autoBilled: false
                    },
                    // SUPPORT_ONE_TIME
                    {
                        displayName: "Support will collect a one-time payment.",
                        billingFrequency: 1,
                        autoBilled: false
                    },
                    // SUPPORT
                    {
                        displayName: "Support will contact when payment needs made.",
                        billingFrequency: 0,
                        autoBilled: false
                    }
                ]);
        }
    }

    /**
     * Gets the billing frequency.
     *
     * @return the billing frequency
     */
    static getBillingFrequency(enumValue) {
        if (!EzString.hasLength(enumValue)) {
            throw new EzBadParamException(
                'enumValue',
                this,
                this.getBillingFrequency);
        }

        return this.ezEnumData(enumValue).billingFrequency;
    }

    /**
     * Gets the display name.
     *
     * @return the display name
     */
    static getDisplayName(enumValue) {
        if (!EzString.hasLength(enumValue)) {
            throw new EzBadParamException(
                'enumValue',
                this,
                this.getDisplayName);
        }

        return this.ezEnumData(enumValue).displayName;
    }

    /**
     * Checks if is auto billed.
     *
     * @return true, if is auto billed
     */
    static isAutoBilled(enumValue) {
        if (!EzString.hasLength(enumValue)) {
            throw new EzBadParamException(
                'enumValue',
                this,
                this.getEstimatedBillingDates);
        }

        return this.ezEnumData(enumValue).autoBilled;
    }

    /**
     * Checks if is daily billing frequency.
     *
     * @return true, if is daily billing frequency
     */
    static isDailyBillingFrequency(enumValue) {
        if (!EzString.hasLength(enumValue)) {
            throw new EzBadParamException(
                'enumValue',
                this,
                this.isDailyBillingFrequency);
        }

        return 365 == this.getBillingFrequency();
    }

    /**
     * Checks if is monthly billing frequency.
     *
     * @return true, if is monthly billing frequency
     */
    static isMonthlyBillingFrequency(enumValue) {
        if (!EzString.hasLength(enumValue)) {
            throw new EzBadParamException(
                'enumValue',
                this,
                this.isMonthlyBillingFrequency);
        }

        return 12 == this.getBillingFrequency();
    }

    /**
     * Checks if is one time billing frequency.
     *
     * @return true, if is one time billing frequency
     */
    static isOneTimeBillingFrequency(enumValue) {
        if (!EzString.hasLength(enumValue)) {
            throw new EzBadParamException(
                'enumValue',
                this,
                this.isOneTimeBillingFrequency);
        }

        return 1 == this.getBillingFrequency();
    }

    /**
     * Checks if is quarterly billing frequency.
     *
     * @return true, if is quarterly billing frequency
     */
    static isQuarterlyBillingFrequency(enumValue) {
        if (!EzString.hasLength(enumValue)) {
            throw new EzBadParamException(
                'enumValue',
                this,
                this.isQuarterlyBillingFrequency);
        }

        return 4 == this.getBillingFrequency();
    }

    /**
     * Checks if is support defined billing frequency.
     *
     * @return true, if is support defined billing frequency
     */
    static isSupportDefinedBillingFrequency(enumValue) {
        if (!EzString.hasLength(enumValue)) {
            throw new EzBadParamException(
                'enumValue',
                this,
                this.isSupportDefinedBillingFrequency);
        }

        return 0 == this.getBillingFrequency();
    }

    /**
     * Checks if is weekly billing frequency.
     *
     * @return true, if is weekly billing frequency
     */
    static isWeeklyBillingFrequency(enumValue) {
        if (!EzString.hasLength(enumValue)) {
            throw new EzBadParamException(
                'enumValue',
                this,
                this.isWeeklyBillingFrequency);
        }

        return 52 == this.getBillingFrequency();
    }

    /**
     * Checks if is yearly billing frequency.
     *
     * @return true, if is yearly billing frequency
     */
    static isYearlyBillingFrequency(enumValue) {
        if (!EzString.hasLength(enumValue)) {
            throw new EzBadParamException(
                'enumValue',
                this,
                this.isYearlyBillingFrequency);
        }

        return 2023 == this.getBillingFrequency();
    }

    /**
     * Calculates the estimated billing date time for the billing frequency
     * @param lastBilledMoment
     * the last billed date time
     * @return the billing dates
     */
    static getEstimatedBillingDates(enumValue, lastBilledMoment) {
        if (!EzString.hasLength(enumValue)) {
            throw new EzBadParamException(
                'enumValue',
                this,
                this.getEstimatedBillingDates);
        }
        if (!EzObject.isValid(lastBilledMoment)) {
            throw new EzBadParamException(
                'lastBilledMoment',
                this,
                this.getEstimatedBillingDates);
        }

        let billingDates = [];

        // Default for isOneTimeBillingFrequency() or isSupportDefinedBillingFrequency()
        billingDates.push(
            EzDateTime.ezInstance.ezMomentWithPTZ(lastBilledMoment));

        if (this.isYearlyBillingFrequency(enumValue)) {
            billingDates.push(
                EzDateTime.ezInstance.ezAdd(
                    lastBilledMoment,
                    'years',
                    1));
        } else if (isQuarterlyBillingFrequency(enumValue)) {
            billingDates.push(
                EzDateTime.ezInstance.ezAdd(
                    lastBilledMoment,
                    'months',
                    3));

            billingDates.push(
                EzDateTime.ezInstance.ezAdd(
                    lastBilledMoment,
                    'months',
                    6));

            billingDates.push(
                EzDateTime.ezInstance.ezAdd(
                    lastBilledMoment,
                    'months',
                    9));

            billingDates.push(
                EzDateTime.ezInstance.ezAdd(
                    lastBilledMoment,
                    'months',
                    12));
        } else if (isMonthlyBillingFrequency(enumValue)) {
            for (let months = 1; months <= 12; months++) {
                billingDates.add(
                    EzDateTime.ezInstance.ezAdd(
                        lastBilledMoment,
                        'months',
                        months));
            }
        } else if (isWeeklyBillingFrequency(enumValue)) {
            for (let weeks = 1; weeks <= 52; weeks++) {
                billingDates.add(
                    EzDateTime.ezInstance.ezAdd(
                        lastBilledMoment,
                        'weeks',
                        weeks));
            }
        } else if (isDailyBillingFrequency(enumValue)) {
            for (let days = 1; days <= 365; days++) {
                billingDates.add(
                    EzDateTime.ezInstance.ezAdd(
                        lastBilledMoment,
                        'days',
                        days));
            }
        }

        return billingDates;
    }
}
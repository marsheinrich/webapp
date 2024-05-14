import { EzDateTimeFieldId } from '/ezlibrary/date-time/EzDateTimeFieldId.js';

export class EzDuration {
    /**
        @static
        @public @method
        Creates a new EzDuration from a momentjs moment instance.
        @param {moment} aMomentJSMoment
        @returns {EzDuration}
     */
    static ezFromMomentJSMoment(aMomentJSMoment) {
        let ezDuration = new EzDuration();

        ezDuration.ezMomentJSDuration = aMomentJSMoment.duration();
    }

    static ezFromValue(value, ezDateTimeFieldId) {
        let ezDuration = new EzDuration();

        switch (ezDateTimeFieldId) {
            case EzDateTimeFieldId.YEARS:
            case EzDateTimeFieldId.QUARTERS:
            case EzDateTimeFieldId.MONTHS:
            case EzDateTimeFieldId.WEEKS:
            case EzDateTimeFieldId.DAYS:
            case EzDateTimeFieldId.HOURS:
            case EzDateTimeFieldId.MINUTES:
            case EzDateTimeFieldId.SECONDS:
            case EzDateTimeFieldId.MILLISECONDS:
                ezDuration.ezMomentJSDuration = moment.duration(value, ezDateTimeFieldId);
            case EzDateTimeFieldId.UNKNOWN:
            default:
                ezDuration.ezMomentJSDuration = moment.duration(0);
        }
    }

    /**
        @static
        @public @method
        Creates a new EzDuration from a momentjs duration instance.
        @param {moment.duration} aMomentJSDuration
        @returns {EzDuration}
     */
    static ezFromMomentJSDuration(aMomentJSDuration) {
        let ezDuration = new EzDuration();

        ezDuration.ezMomentJSDuration = aMomentJSDuration;
    }

    constructor(ezDuration) {
        this.#ezMomentJSDuration = EzObject.isValid(ezDuration)
            ? moment.duration(ezDuration.ezMomentJSDuration)
            : moment.duration(0);

    }

    #ezMomentJSDuration;

    get ezMomentJSDuration() {
        return this.ezMomentJSDuration;
    }

    set ezMomentJSDuration(ezMomentJSDuration) {
        this.ezMomentJSDuration = EzObject.assignOrDefault(
            ezMomentJSDuration,
            moment.duration(0));
    }

    get ezHumanize() {
        return this.#ezMomentJSDuration.humanize();
    }

    ezHumanize(orientedDuration) {
        return this.#ezMomentJSDuration.humanize(orientedDuration);
    }

    ezHumanize(orientedDuration, thresholds) {
        if (!EzBoolean.isBoolean(orientedDuration)) {
            orientedDuration = false;
        }

        return EzObject.isValid(thresholds)
            ? this.#ezMomentJSDuration.humanize(
                orientedDuration,
                thresholds)
            : this.#ezMomentJSDuration.humanize(orientedDuration);
    }

    ezHumanize(thresholds) {
        return EzObject.isValid(thresholds)
            ? this.#ezMomentJSDuration.humanize(thresholds)
            : this.#ezMomentJSDuration.humanize();
    }

    ezAsMilliseconds() {
        return this.#ezMomentJSDuration.asMilliseconds();
    }

    ezAsSeconds() {
        return this.#ezMomentJSDuration.asSeconds();
    }

    ezAsMinutes() {
        return this.#ezMomentJSDuration.asMinutes();
    }

    ezAsHours() {
        return this.#ezMomentJSDuration.asHours();
    }

    ezAsDays() {
        return this.#ezMomentJSDuration.asDays();
    }

    ezAsWeeks() {
        return this.#ezMomentJSDuration.asWeeks();
    }

    ezAsMonths() {
        return this.#ezMomentJSDuration.asMonths();
    }

    ezAsYears() {
        return this.#ezMomentJSDuration.asYears();
    }

    ezAddMilliseconds(milliseconds) {
        return this.#ezMomentJSDuration.add(milliseconds, EzDateTimeFieldId.MILLISECONDS);
    }

    ezAddSeconds(seconds) {
        return this.#ezMomentJSDuration.add(seconds, EzDateTimeFieldId.SECONDS);
    }

    ezAddMinutes(minutes) {
        return this.#ezMomentJSDuration.add(minutes, EzDateTimeFieldId.MINUTES);
    }

    ezAddHours(hours) {
        return this.#ezMomentJSDuration.add(hours, EzDateTimeFieldId.HOURS);
    }

    ezAddDays(days) {
        return this.#ezMomentJSDuration.add(days, EzDateTimeFieldId.DAYS);
    }

    ezAddWeeks(weeks) {
        return this.#ezMomentJSDuration.add(weeks, EzDateTimeFieldId.WEEKS);
    }

    ezAddMonths(months) {
        return this.#ezMomentJSDuration.add(months, EzDateTimeFieldId.MONTHS);
    }

    ezAddYears(years) {
        return this.#ezMomentJSDuration.add(years, EzDateTimeFieldId.YEARS)
    }

    ezSubtractMilliseconds(milliseconds) {
        return this.#ezMomentJSDuration.subtract(milliseconds, EzDateTimeFieldId.MILLISECONDS);
    }

    ezSubtractSeconds(seconds) {
        return this.#ezMomentJSDuration.subtract(seconds, EzDateTimeFieldId.SECONDS);
    }

    ezSubtractMinutes(minutes) {
        return this.#ezMomentJSDuration.subtract(minutes, EzDateTimeFieldId.MINUTES);
    }

    ezSubtractHours(hours) {
        return this.#ezMomentJSDuration.subtract(hours, EzDateTimeFieldId.HOURS);
    }

    ezSubtractDays(days) {
        return this.#ezMomentJSDuration.subtract(days, EzDateTimeFieldId.DAYS);
    }

    ezSubtractWeeks(weeks) {
        return this.#ezMomentJSDuration.subtract(weeks, EzDateTimeFieldId.WEEKS);
    }

    ezSubtractMonths(months) {
        return this.#ezMomentJSDuration.subtract(months, EzDateTimeFieldId.MONTHS);
    }

    ezSubtractYears(years) {
        return this.#ezMomentJSDuration.subtract(years, EzDateTimeFieldId.YEARS)
    }

    ezDurationBetween(ezDuration) {
        return EzDuration(
            this.ezMomentJSDuration.diff(
                ezDuration.ezMomentJSDuration));
    }
}

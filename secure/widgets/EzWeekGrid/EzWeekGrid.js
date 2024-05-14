export class EzWeekGrid {
    constructor() {
        this.weekStartMoment = weekStartMoment;
        this.weekEndMoment = weekEndMoment;
    }

    #weekStartMoment;
    get weekStartMoment() {
        return this.#weekStartMoment;
    }
    set weekStartMoment(weekStartMoment) {
        if (!EzObject.isValid(weekStartMoment)) {
            throw new EzBadParamException(
                'weekStartMoment',
                this,
                this.weekStartMoment);
        }

        this.#weekStartMoment = weekStartMoment;
    }

    #weekEndMoment;
    get weekEndMoment() {
        return this.#weekEndMoment;
    }
    set weekEndMoment(weekEndMoment) {
        if (!EzObject.isValid(weekEndMoment)) {
            throw new EzBadParamException(
                'weekEndMoment',
                this,
                this.weekStartMoment);
        }

        this.#weekEndMoment = weekEndMoment;
    }

    ezRender() {
        EzHtml.build`
            ${this.ezGridStyles}
            <div
                id="EzWeekGridContainer"
                class="">
                ${this.ezGridHeader}
                ${this.ezGridBody}
                ${this.ezGridooter}
            </div>`
    }

    get ezGridStyles() {
        return EzHtml.build`
            <styles>
                .ezWeekGrid-header {

                }
                .ezWeekGrid-body {

                }
                .ezWeekGrid-footer {

                }
            </styles>`;
    }

    get ezGridHeader() {
        return EzHtml.build`
            <div
                id="EzSchedule_HeaderContainer"
                class="ezAutoRow_A ezAutoCol_A_A_A_A_A_A_A_A_A">
            </div>`;
    }

    get ezGridBody() {
        return EzHtml.build`
            <div
                id="EzSchedule_BodyContainer"
                class="">
            </div>`;
    }

    get ezGridooter() {
        return EzHtml.build`
            <div
                id="EzSchedule_FooterContainer"
                class="">
            </div>`;
    }
}

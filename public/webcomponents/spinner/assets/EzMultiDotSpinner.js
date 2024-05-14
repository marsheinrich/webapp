/**
    Provides a HTML+CSS dot spinner
    Import with:

 */
class EzMultiDotSpinner {
    /**
        @private @static @field
        Stores the CSS color to use for the dots.
        Default is #ff9900 (ezClockerOrange)
        @type {string}
     */
    static #dotColor = '#ff9900';

    /**
        @public @static @property @getter
        Returns the CSS color used for the dots.
        @returns {string}
     */
    static get dotColor() {
        return EzMultiDotSpinner.#dotColor;
    }

    /**
        @public @static @property @getter
        Sets the CSS color to use for the dots.
        @param {string} dotColor
     */
    static set dotColor(dotColor) {
        EzMultiDotSpinner.#dotColor = dotColor;
    }

    /**
        @public @static @readonly @property
        Id prefix to use for the spinner's style names and html element ids.
        @returns {string}
     */
    static get ezSpinnerId() {
        return 'EzMultiDotSpinnerContainer';
    }

    /**
        @public @static @readonly @property
        Returns the styles to use for the spinner.
        @returns {string}
     */
    static get spinnerCss() {
        return globalThis.ezApi.ezTemplate`
            <style id="EzMultiDotSpinnerCss">
                .${EzMultiDotSpinner.ezSpinnerId}-circle {
                  margin: 100px auto;
                  width: 40px;
                  height: 40px;
                  position: relative;
                }
                .${EzMultiDotSpinner.ezSpinnerId}-circle .${EzMultiDotSpinner.ezSpinnerId}-child {
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  left: 0;
                  top: 0;
                }
                .${EzMultiDotSpinner.ezSpinnerId}-circle .${EzMultiDotSpinner.ezSpinnerId}-child:before {
                  content: '';
                  display: block;
                  margin: 0 auto;
                  width: 15%;
                  height: 15%;
                  background-color: ${EzMultiDotSpinner.dotColor};
                  border-radius: 100%;
                  -webkit-animation: ${EzMultiDotSpinner.ezSpinnerId}-circleBounceDelay 1.2s infinite ease-in-out both;
                          animation: ${EzMultiDotSpinner.ezSpinnerId}-circleBounceDelay 1.2s infinite ease-in-out both;
                }
                .${EzMultiDotSpinner.ezSpinnerId}-circle .${EzMultiDotSpinner.ezSpinnerId}-circle2 {
                  -webkit-transform: rotate(30deg);
                      -ms-transform: rotate(30deg);
                          transform: rotate(30deg); }
                .${EzMultiDotSpinner.ezSpinnerId}-circle .${EzMultiDotSpinner.ezSpinnerId}-circle3 {
                  -webkit-transform: rotate(60deg);
                      -ms-transform: rotate(60deg);
                          transform: rotate(60deg); }
                .${EzMultiDotSpinner.ezSpinnerId}-circle .${EzMultiDotSpinner.ezSpinnerId}-circle4 {
                  -webkit-transform: rotate(90deg);
                      -ms-transform: rotate(90deg);
                          transform: rotate(90deg); }
                .${EzMultiDotSpinner.ezSpinnerId}-circle .${EzMultiDotSpinner.ezSpinnerId}-circle5 {
                  -webkit-transform: rotate(120deg);
                      -ms-transform: rotate(120deg);
                          transform: rotate(120deg); }
                .${EzMultiDotSpinner.ezSpinnerId}-circle .${EzMultiDotSpinner.ezSpinnerId}-circle6 {
                  -webkit-transform: rotate(150deg);
                      -ms-transform: rotate(150deg);
                          transform: rotate(150deg); }
                .${EzMultiDotSpinner.ezSpinnerId}-circle .${EzMultiDotSpinner.ezSpinnerId}-circle7 {
                  -webkit-transform: rotate(180deg);
                      -ms-transform: rotate(180deg);
                          transform: rotate(180deg); }
                .${EzMultiDotSpinner.ezSpinnerId}-circle .${EzMultiDotSpinner.ezSpinnerId}-circle8 {
                  -webkit-transform: rotate(210deg);
                      -ms-transform: rotate(210deg);
                          transform: rotate(210deg); }
                .${EzMultiDotSpinner.ezSpinnerId}-circle .${EzMultiDotSpinner.ezSpinnerId}-circle9 {
                  -webkit-transform: rotate(240deg);
                      -ms-transform: rotate(240deg);
                          transform: rotate(240deg); }
                .${EzMultiDotSpinner.ezSpinnerId}-circle .${EzMultiDotSpinner.ezSpinnerId}-circle10 {
                  -webkit-transform: rotate(270deg);
                      -ms-transform: rotate(270deg);
                          transform: rotate(270deg); }
                .${EzMultiDotSpinner.ezSpinnerId}-circle .${EzMultiDotSpinner.ezSpinnerId}-circle11 {
                  -webkit-transform: rotate(300deg);
                      -ms-transform: rotate(300deg);
                          transform: rotate(300deg); }
                .${EzMultiDotSpinner.ezSpinnerId}-circle .${EzMultiDotSpinner.ezSpinnerId}-circle12 {
                  -webkit-transform: rotate(330deg);
                      -ms-transform: rotate(330deg);
                          transform: rotate(330deg); }
                .${EzMultiDotSpinner.ezSpinnerId}-circle .${EzMultiDotSpinner.ezSpinnerId}-circle2:before {
                  -webkit-animation-delay: -1.1s;
                          animation-delay: -1.1s; }
                .${EzMultiDotSpinner.ezSpinnerId}-circle .${EzMultiDotSpinner.ezSpinnerId}-circle3:before {
                  -webkit-animation-delay: -1s;
                          animation-delay: -1s; }
                .${EzMultiDotSpinner.ezSpinnerId}-circle .${EzMultiDotSpinner.ezSpinnerId}-circle4:before {
                  -webkit-animation-delay: -0.9s;
                          animation-delay: -0.9s; }
                .${EzMultiDotSpinner.ezSpinnerId}-circle .${EzMultiDotSpinner.ezSpinnerId}-circle5:before {
                  -webkit-animation-delay: -0.8s;
                          animation-delay: -0.8s; }
                .${EzMultiDotSpinner.ezSpinnerId}-circle .${EzMultiDotSpinner.ezSpinnerId}-circle6:before {
                  -webkit-animation-delay: -0.7s;
                          animation-delay: -0.7s; }
                .${EzMultiDotSpinner.ezSpinnerId}-circle .${EzMultiDotSpinner.ezSpinnerId}-circle7:before {
                  -webkit-animation-delay: -0.6s;
                          animation-delay: -0.6s; }
                .${EzMultiDotSpinner.ezSpinnerId}-circle .${EzMultiDotSpinner.ezSpinnerId}-circle8:before {
                  -webkit-animation-delay: -0.5s;
                          animation-delay: -0.5s; }
                .${EzMultiDotSpinner.ezSpinnerId}-circle .${EzMultiDotSpinner.ezSpinnerId}-circle9:before {
                  -webkit-animation-delay: -0.4s;
                          animation-delay: -0.4s; }
                .${EzMultiDotSpinner.ezSpinnerId}-circle .${EzMultiDotSpinner.ezSpinnerId}-circle10:before {
                  -webkit-animation-delay: -0.3s;
                          animation-delay: -0.3s; }
                .${EzMultiDotSpinner.ezSpinnerId}-circle .${EzMultiDotSpinner.ezSpinnerId}-circle11:before {
                  -webkit-animation-delay: -0.2s;
                          animation-delay: -0.2s; }
                .${EzMultiDotSpinner.ezSpinnerId}-circle .${EzMultiDotSpinner.ezSpinnerId}-circle12:before {
                  -webkit-animation-delay: -0.1s;
                          animation-delay: -0.1s; }

                @-webkit-keyframes ${EzMultiDotSpinner.ezSpinnerId}-circleBounceDelay {
                  0%, 80%, 100% {
                    -webkit-transform: scale(0);
                            transform: scale(0);
                  } 40% {
                    -webkit-transform: scale(1);
                            transform: scale(1);
                  }
                }

                @keyframes ${EzMultiDotSpinner.ezSpinnerId}-circleBounceDelay {
                  0%, 80%, 100% {
                    -webkit-transform: scale(0);
                            transform: scale(0);
                  } 40% {
                    -webkit-transform: scale(1);
                            transform: scale(1);
                  }
                }
            </style>`;
    }

    static get spinnerHtml() {
        return globalThis.ezApi.ezTemplate`
            <div class="${EzMultiDotSpinner.ezSpinnerId}-circle">
              <div class="${EzMultiDotSpinner.ezSpinnerId}-circle1 ${EzMultiDotSpinner.ezSpinnerId}-child"></div>
              <div class="${EzMultiDotSpinner.ezSpinnerId}-circle2 ${EzMultiDotSpinner.ezSpinnerId}-child"></div>
              <div class="${EzMultiDotSpinner.ezSpinnerId}-circle3 ${EzMultiDotSpinner.ezSpinnerId}-child"></div>
              <div class="${EzMultiDotSpinner.ezSpinnerId}-circle4 ${EzMultiDotSpinner.ezSpinnerId}-child"></div>
              <div class="${EzMultiDotSpinner.ezSpinnerId}-circle5 ${EzMultiDotSpinner.ezSpinnerId}-child"></div>
              <div class="${EzMultiDotSpinner.ezSpinnerId}-circle6 ${EzMultiDotSpinner.ezSpinnerId}-child"></div>
              <div class="${EzMultiDotSpinner.ezSpinnerId}-circle7 ${EzMultiDotSpinner.ezSpinnerId}-child"></div>
              <div class="${EzMultiDotSpinner.ezSpinnerId}-circle8 ${EzMultiDotSpinner.ezSpinnerId}-child"></div>
              <div class="${EzMultiDotSpinner.ezSpinnerId}-circle9 ${EzMultiDotSpinner.ezSpinnerId}-child"></div>
              <div class="${EzMultiDotSpinner.ezSpinnerId}-circle10 ${EzMultiDotSpinner.ezSpinnerId}-child"></div>
              <div class="${EzMultiDotSpinner.ezSpinnerId}-circle11 ${EzMultiDotSpinner.ezSpinnerId}-child"></div>
              <div class="${EzMultiDotSpinner.ezSpinnerId}-circle12 ${EzMultiDotSpinner.ezSpinnerId}-child"></div>
            </div>`;
    }

    /**
        @public @static @method
     */
    static ezShowSpinner(parentContainer) {
        if (!ezApi.ezStringHasLength(parentContainer)) {
            parentContainer = 'body';
        }

        globalThis.ezApi.ezclocker.ezUi.ezAppendContent(
            parentContainer,
            globalThis.ezApi.ezTemplate`
                <div id="${EzMultiDotSpinner.ezSpinnerId}-Container" style="display:none">
                    ${EzMultiDotSpinner.spinnerCss}
                    ${EzMultiDotSpinner.spinnerHtml}
                </div>`);
    }

    /**
        @public @static @method
        Hides the spinner and removes the spinner code.
     */
    static ezHideSpinner() {
        let spinnerContainerId = `${EzMultiDotSpinner.ezSpinnerId}-Container`;

        if (!ezApi.ezclocker.ezUi.ezElementExists(spinnerContainerId)) {
            // Already removed
            return;
        }

        globalThis.ezApi.ezclocker.ezUi.ezRemoveElement(`${EzMultiDotSpinner.ezSpinnerId}-Container`);
    }
}
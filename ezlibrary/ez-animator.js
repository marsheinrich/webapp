import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzClass } from '/ezlibrary/EzClass.js';

/**
    Import with:
        import { EzAnimator } from '/ezlibrary/ez-animator.js';

        globalThis.ezApi.ezclocker[EzAnimator.ezApiName] &&
        globalThis.ezApi.ezclocker[EzAnimator.ezApiName].ready

        document.addEventListener(
            EzAnimator.ezEventNames.onReady,
            this.#ezRegistrator);
 */
class EzAnimator extends EzClass {
    /**
        @public @static @field
        @type {EzAnimator}
     */
    static ezInstance = null;
    /**
        @public @static @field
        @type {string}
     */
    static ezApiRegistrationState = null;

    /**
        @public @static @@readonly @property
        @returns {string}
     */
    static get ezApiName() {
        return 'ezAnimator';
    }
    /**
        @public @static @@readonly @property
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzAnimator_Ready'
        };
    }

    /**
        @public @static @@readonly @property
        @returns {boolean}
     */
    static get ezCanRegister() {
        return 'PENDING' === EzAnimator.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready;
    }
    /**
        @private @static @method
     */
    static #ezRegistrator() {
        if (!EzAnimator.ezCanRegister) {
            return false;
        }
        EzAnimator.ezInstance = ezApi.ezRegisterNewApi(
            EzAnimator,
            EzAnimator.ezApiName);
        EzAnimator.ezApiRegistrationState = 'REGISTERED';
        return true;
    }
    // Static constructor
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            if (!this.#ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    this.#ezRegistrator);
            }
        }
    }

    /**
        @public @field
        @type {object}
     */
    ezAnimatorStyles = null;

    ezInit() {
        EzAnimator.ezInstance.ezInjectAnimatorStyles();
        return EzAnimator.ezInstance;
    }

    ezInjectAnimatorStyles() {
        const self = EzAnimator.ezInstance;

        self.ezAnimatorStyles = document.createElement('style');
        self.ezAnimatorStyles.id = 'EzAnimatorInjectedStyles';
        document.head.prepend(self.ezAnimatorStyles);

        self.ezInjectStyle(
            ezApi.ezTemplate`
                .ez-major-ripple.ripple {
                    background-color: #ff9900;
                    opacity: 0.5;
                }

                .ez-action-ripple.ripple {
                    background-color: #8df13c;
                    opacity: 0.5;
                }`);
    }

    ezInjectStyle(styleText) {
        const self = EzAnimator.ezInstance;

        if (null == self.ezAnimatorStyles) {
            self.ezInjectAnimatorStyles();
        }

        if (ezApi.ezIsValid(self.ezAnimatorStyles.innerHTML) &&
            ezApi.ezIsEmptyString(self.ezAnimatorStyles.innerHTML.trim())) {
            self.ezAnimatorStyles.innerHTML = styleText;
        } else {
            self.ezAnimatorStyles.insertAdjacentHTML('beforeend', styleText);
        }
    }

    ezJQElement(elementOrId) {
        if (!ezApi.ezIsValid(elementOrId)) {
            throw new EzBadParamException(
                'elementOrId',
                self,
                self.ezJQElement);
        }

        let element = ezApi.ezIsString(elementOrId)
            ? document.getElementById(elementOrId)
            : elementOrId;

        if (null === element) {
            throw ezApi.ezException(
                'The param elementOrId does not represent a valid HTML element or HTML element id.');
        }

        return $(`#${element.id}`);
    }

    ezElement(elementOrId, ignoreNotFound) {
        ignoreNotFound = ignoreNotFound || false;

        if (!ezApi.ezIsValid(elementOrId)) {
            if (ignoreNotFound) {
                return null;
            }
            throw new EzBadParamException(
                'elementOrId',
                EzAnimator.ezInstance,
                EzAnimator.ezInstance.ezElement);
        }

        let element = ezApi.ezIsString(elementOrId)
            ? document.getElementById(elementOrId)
            : elementOrId;

        if (null === element && !ignoreNotFound) {
            throw ezApi.ezException(
                'The param elementOrId does not represent a valid HTML element or HTML element id.');
        }

        return element;
    }

    ezApplyRipple(elementOrId, ezClockerStyle) {
        const self = EzAnimator.ezInstance;

        let element = self.ezElement(elementOrId);
        if (ezApi.ezStringHasLength(ezClockerStyle)) {
            element.classList.add(ezClockerStyle);
        }

        element.classList.add('ripple-effect');
        return element;
    }

    ezFadeIn(elementOrId, speed) {
        const self = EzAnimator.ezInstance;

        if (!ezApi.ezIsValid(elementOrId)) {
            throw new EzBadParamException(
                'elementOrId',
                self,
                self.ezFadeIn);
        }

        return ezApi.ezResolver(
            (resolve) => {
                let jqElement = self.ezJQElement(elementOrId);
                if (!ezApi.ezIsValid(jqElement) || 0 == jqElement.length) {
                    ezApi.ezclocker.logger.error(
                        ezApi.ezEM`
                            EzAnimator.ezFadeIn failed to execute property
                            for elementOrId=${ezApi.ezToJson(elementOrId)}.`);
                    return resolve(elementOrId);
                }

                jqElement.fadeIn(
                    ezApi.ezIsNumber(speed)
                        ? speed
                        : 500,
                    () => {
                        return resolve(elementOrId);
                    });
            });
    }

    ezFadeOut(elementOrId, speed) {
        const self = EzAnimator.ezInstance;

        if (!ezApi.ezIsValid(elementOrId)) {
            throw new EzBadParamException(
                'elementOrId',
                self,
                self.ezFadeOut);
        }

        return ezApi.ezResolver(
            (resolve) => {
                let jqElement = self.ezJQElement(elementOrId);
                if (!ezApi.ezIsValid(jqElement) || 0 == jqElement.length) {
                    ezApi.ezclocker.logger.error(
                        ezApi.ezEM`
                            EzAnimator.ezFadeOut failed to execute property
                            for elementOrId=${ezApi.ezToJson(elementOrId)}.`);
                    return resolve(elementOrId);
                }

                jqElement.fadeOut(
                    ezApi.ezIsNumber(speed)
                        ? speed
                        : 500,
                    () => {
                        return resolve(elementOrId);
                    });
            });
    }

    ezSlideDown(elementOrId, speed) {
        const self = EzAnimator.ezInstance;

        if (!ezApi.ezIsValid(elementOrId)) {
            throw new EzBadParamException(
                'elementOrId',
                self,
                self.ezSlideDown);
        }

        return ezApi.ezResolver(
            (resolve) => {
                let jqElement = self.ezJQElement(elementOrId);
                if (!ezApi.ezIsValid(jqElement) || 0 == jqElement.length) {
                    ezApi.ezclocker.logger.error(
                        ezApi.ezEM`
                            EzAnimator.ezFadeOut failed to execute property
                            for elementOrId=${ezApi.ezToJson(elementOrId)}.`);
                    return resolve(elementOrId);
                }

                jqElement.slideDown(
                    ezApi.ezIsNumber(speed)
                        ? speed
                        : 500,
                    () => {
                        return resolve(elementOrId);
                    });
            });
    }

    ezSlideUp(elementOrId, speed) {
        const self = EzAnimator.ezInstance;

        if (!ezApi.ezIsValid(elementOrId)) {
            throw new EzBadParamException(
                'elementOrId',
                self,
                self.ezSlideUp);
        }

        return ezApi.ezAsyncAction(
            (finished) => {
                let jqElement = self.ezJQElement(elementOrId);
                if (!ezApi.ezIsValid(jqElement) || 0 == jqElement.length) {
                    ezApi.ezclocker.logger.error(
                        ezApi.ezEM`
                            EzAnimator.ezFadeOut failed to execute property
                            for elementOrId=${ezApi.ezToJson(elementOrId)}.`);
                    return finished(elementOrId);
                }

                jqElement.slideUp(
                    ezApi.ezIsNumber(speed)
                        ? speed
                        : 500,
                    () => {
                        return finished(elementOrId);
                    });
            });
    }

    ezFlipX(elementOrId) {
        return ezApi.ezAsyncAction(
            (finished) => {
                let element = ezUi.ezFindByElementOrId(elementOrId);
                if (null === element) {
                    return finished(null);
                }

                element.ezFlipXEnd = () => {
                    element.removeEventListener('animationend', element.ezFlipXEnd);
                    element.classList.remove('ezFlipX');
                    return finished(element);
                };

                element.addEventListener('animationend', element.ezFlipXEnd);
                element.classList.add('ezFlipX');
            });
    }

    ezFlipY(elementOrId) {
        const self = EzAnimator.ezInstance;

        return ezApi.ezAsyncAction(
            (finished) => {
                let element = self.ezElement(elementOrId);
                if (null === element) {
                    return finished(null);
                }

                element.ezFlipYEnd = () => {
                    element.removeEventListener('animationend', element.ezFlipYEnd);
                    element.classList.remove('ezFlipY');
                    return finished(element);
                };

                element.addEventListener('animationend', element.ezFlipYEnd);
                element.classList.add('ezFlipY');
            });
    }

    ezFlipUpAndOut(elementOrId) {
        const self = EzAnimator.ezInstance;

        return ezApi.ezAsyncAction(
            (finished) => {
                let element = self.ezElement(elementOrId);
                if (null === element) {
                    return finished(null);
                }

                element.ezFlipUpAndOutEnd = () => {
                    element.removeEventListener('animationend', element.ezFlipUpAndOutEnd);
                    ezApi.ezclocker.ezUi.ezHide();
                    element.classList.remove('ezFlipUpAndOut');
                    return finished(element);
                };

                element.addEventListener('animationend', element.ezFlipUpAndOutEnd);
                element.classList.add('ezFlipUpAndOut');
            });
    }
}

export {
    EzAnimator
};

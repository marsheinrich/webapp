import { EzSetterRequirement, EzSetterType } from '/ezlibrary/ez-getter-setter.js';

/**
    // TODO: Remove this class once all use is migrated
    @public
    Stores information about an HTML element's top, right, bottom, and left values.
    @deprecated
    STOP ALL USE
    Migrate to using EzDomRect.js instead (/ezlibrary/ux/EzDomRect.js)
 */
class EzElementRect {
    /**
        @public
        Creates anew instance of EzElementRect
        @param {Number|NaN|null} top
        @param {Number|NaN|null} right
        @param {Number|NaN|null} bottom
        @param {Number|NaN|null} left
        @param {Number|NaN|null} height
        @param {Number|NaN|null} width
        @param {Number|NaN|null} x
        @param {Number|NaN|null} y
     */
    constructor(top, right, bottom, left, height, width, x, y) {
        this.ezTop = ezApi.ezGetSet(this,
            '_top',
            EzSetterType.number,
            top,
            NaN,
            EzSetterRequirement.ezAsSet(
                EzSetterRequirement.ALLOW_NULL,
                EzSetterRequirement.ALLOW_NAN));

        this.ezRight = ezApi.ezGetSet(this,
            '_right',
            EzSetterType.number,
            right,
            NaN,
            EzSetterRequirement.ezAsSet(
                EzSetterRequirement.ALLOW_NULL,
                EzSetterRequirement.ALLOW_NAN));
        this.ezBottom = ezApi.ezGetSet(this,
            '_bottom',
            EzSetterType.number,
            bottom,
            NaN,
            EzSetterRequirement.ezAsSet(
                EzSetterRequirement.ALLOW_NULL,
                EzSetterRequirement.ALLOW_NAN));
        this.ezLeft = ezApi.ezGetSet(this,
            '_left',
            EzSetterType.number,
            left,
            NaN,
            EzSetterRequirement.ezAsSet(
                EzSetterRequirement.ALLOW_NULL,
                EzSetterRequirement.ALLOW_NAN));
        this.ezHeight = ezApi.ezGetSet(this,
            '_height',
            EzSetterType.number,
            height,
            NaN,
            EzSetterRequirement.ezAsSet(
                EzSetterRequirement.ALLOW_NULL,
                EzSetterRequirement.ALLOW_NAN));
        this.ezWidth = ezApi.ezGetSet(this,
            '_width',
            EzSetterType.number,
            width,
            NaN,
            EzSetterRequirement.ezAsSet(
                EzSetterRequirement.ALLOW_NULL,
                EzSetterRequirement.ALLOW_NAN));
        this.ezX = ezApi.ezGetSet(this,
            '_x',
            EzSetterType.number,
            x,
            NaN,
            EzSetterRequirement.ezAsSet(
                EzSetterRequirement.ALLOW_NULL,
                EzSetterRequirement.ALLOW_NAN));
        this.ezY = ezApi.ezGetSet(this,
            '_y',
            EzSetterType.number,
            y,
            NaN,
            EzSetterRequirement.ezAsSet(
                EzSetterRequirement.ALLOW_NULL,
                EzSetterRequirement.ALLOW_NAN));

        this.get = {
            ezTop: this.ezTop().get,
            ezRight: this.ezRight().get,
            ezLeft: this.ezLeft().get,
            ezBottom: this.ezBottom().get,
            ezHeight: this.ezHeight().get,
            ezWidth: this.ezWidth().get,
            ezX: this.ezX().get,
            ezY: this.ezY().get
        };
        this.set = {
            ezTop: this.ezTop().set,
            ezRight: this.ezRight().set,
            ezLeft: this.ezLeft().set,
            ezBottom: this.ezBottom().set,
            ezHeight: this.ezWidth().set,
            ezWidth: this.ezWidth().set,
            ezX: this.ezX().set,
            ezY: this.ezY().set
        };

        this.ezClearValues = function() {
            this.ezTop().ezSet(NaN);
            this.ezRight().ezSet(NaN);
            this.ezBottom().ezSet(NaN);
            this.ezLeft().ezSet(NaN);
            this.ezHeight().ezSet(NaN);
            this.ezWidth().ezSet(NaN);
            this.ezX().ezSet(NaN);
            this.ezY().ezSet(NaN);
        };

        /**
            @public
            Copies the values from the passed DOMRect to this instance.
            @param {DOMRect} domRect
            @returns {EzElementRect}
         */
        this.ezCopyFromDOMRect = function(domRect) {
            let self = ezApi.ezSelfRef(EzElementRect, this);

            if (ezApi.ezIsNotValid(domRect)) {
                self.ezClearValues();
                return self;
            }

            self.ezTop().set(domRect.top);
            self.ezRight().set(domRect.right);
            self.ezBottom().set(domRect.bottom);
            self.ezLeft().set(domRect.left);
            self.ezHeight().set(domRect.height);
            self.ezWidth().set(domRect.width);
            self.ezX().set(domRect.x);
            self.ezY().set(domRect.y);

            return this;
        };
    }
}

export {
    EzElementRect
};

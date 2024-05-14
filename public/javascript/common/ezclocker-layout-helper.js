import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzClass } from '/ezlibrary/EzClass.js';

/**
    Performs javascript page layout operations
    Import with:
    import { EzLayoutHelper } from '/public/javascript/common/ezclocker-layout-helper.js';
 */
class EzLayoutHelper extends EzClass {
    static ezApiName = 'ezLayoutHelper';
    static ezEventNames = {
        onReady: 'ezOn_EzLayoutHelper_Ready'
    };
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzLayoutHelper.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready;
    }
    static ezRegistrator() {
        if (!EzLayoutHelper.ezCanRegister()) {
            return false;
        }
        EzLayoutHelper.ezInstance = ezApi.ezRegisterNewApi(
            EzLayoutHelper,
            EzLayoutHelper.ezApiName);
        EzLayoutHelper.ezApiRegistrationState = 'REGISTERED';
        return true;
    }
    // Static constructor
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            if (!this.ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    this.ezRegistrator);
            }
        }
    }

    /**
        @public @constructor
     */
    constructor() {
        super();
    }

    /**
        @public
        @returns {EzLayoutHelper}
     */
    ezInit() {
        return EzLayoutHelper.ezInstance;
    }

    /**
        @public
        @param {string} id
     */
    ezItemRef(id) {
        if (window === id) {
            return ezApi.ezWindow();
        }
        if ('body' === id) {
            return ezApi.ezBody();
        }
        return ezApi.ezId(id);
    }

    /**
        @public
        @param {string} id
     */
    itemHeightMargins(id) {
        let self = EzLayoutHelper.ezInstance;
        let item = self.ezItemRef(id);
        return item.outerHeight(true) - item.innerHeight();
    }

    /**
        @public
        @param {string} id
     */
    itemWidthMargins(id) {
        let self = EzLayoutHelper.ezInstance;
        let item = self.ezItemRef(id);
        return item.outerWidth(true) - item.innerWidth();
    }

    /**
        @public
        @param {string} id
     */
    itemWidth(id) {
        let self = EzLayoutHelper.ezInstance;
        let item = self.ezItemRef(id);
        return item.outerWidth(true);
    }

    /**
        @public
        @param {string} id
     */
    itemHeight(id) {
        let self = EzLayoutHelper.ezInstance;
        let item = self.ezItemRef(id);
        return item.outerHeight(true);
    }

    /**
        @public
        @param {string} id
     */
    itemContentSize(id) {
        let self = EzLayoutHelper.ezInstance;
        let item = self.ezItemRef(id);
        return {
            height: item.innerHeight(),
            width: item.innerWidth()
        };
    }

    /**
        @public
        @param {string} id
     */
    itemPadding(id) {
        let self = EzLayoutHelper.ezInstance;
        let item = self.ezItemRef(id);
        return {
            height: parseInt(item.css('padding-top')) + parseInt(item.css('padding-bottom')),
            width: parseInt(item.css('padding-left')) + parseInt(item.css('passing-right')),
            top: parseInt(item.css('padding-top')),
            bottom: parseInt(item.css('padding-bottom')),
            left: parseInt(item.css('padding-left')),
            right: parseInt(item.css('passing-right'))
        };
    }

    /**
        @public
        @param {string} id
     */
    itemMargins(id) {
        let self = EzLayoutHelper.ezInstance;
        let item = self.ezItemRef(id);
        return {
            height: parseInt(item.css('margin-top')) + parseInt(item.css('margin-bottom')),
            width: parseInt(item.css('margin-left')) + parseInt(item.css('margin-right')),
            top: parseInt(item.css('margin-top')),
            bottom: parseInt(item.css('margin-bottom')),
            left: parseInt(item.css('margin-left')),
            right: parseInt(item.css('margin-right'))
        };
    }

    /**
        @public
        @param {string} id
     */
    itemDiminsions(id) {
        let self = EzLayoutHelper.ezInstance;

        let item = self.ezItemRef(id);

        let outerH = item.outerHeight(true);
        if (isNaN(outerH)) {
            outerH = 0;
        }
        let innerH = item.innerHeight();
        if (isNaN(innerH)) {
            innerH = 0;
        }

        let outerW = item.outerWidth(true);
        if (isNaN(outerW)) {
            outerW = 0;
        }

        let innerW = item.innerWidth();
        if (isNaN(innerW)) {
            innerW = 0;
        }

        let results = id === window || id === 'window'
            ? {
                id: id,
                outer: {
                    height: outerH,
                    width: outerW
                },
                inner: {
                    height: innerH,
                    width: innerW
                },
                rect: {
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                },
                marginH: (outerH - innerH),
                marginW: (outerW - innerW),
                margin: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                },
                paddingH: 0,
                paddingW: 0,
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                },
                borderH: 0,
                borderW: 0,
                border: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                }
            }
            : {
                id: id,
                outer: {
                    height: outerH,
                    width: outerW
                },
                inner: {
                    height: innerH,
                    width: innerW
                },
                rect: {
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                },
                marginH: (outerH - innerH),
                marginW: (outerW - innerW),
                margin: {
                    top: self.ezGetCssValueAsIntOrZero(item, 'margin-top'),
                    bottom: self.ezGetCssValueAsIntOrZero(item, 'margin-bottom'),
                    left: self.ezGetCssValueAsIntOrZero(item, 'margin-left'),
                    right: self.ezGetCssValueAsIntOrZero(item, 'margin-right')
                },
                paddingH: self.ezGetCssValueAsIntOrZero(item, 'padding-top') +
                    self.ezGetCssValueAsIntOrZero(item, 'padding-bottom'),
                paddingW: self.ezGetCssValueAsIntOrZero(item, 'padding-left') +
                    self.ezGetCssValueAsIntOrZero(item, 'passing-right'),
                padding: {
                    top: self.ezGetCssValueAsIntOrZero(item, 'padding-top'),
                    bottom: self.ezGetCssValueAsIntOrZero(item, 'padding-bottom'),
                    left: self.ezGetCssValueAsIntOrZero(item, 'padding-left'),
                    right: self.ezGetCssValueAsIntOrZero(item, 'passing-right')
                },
                borderH: self.ezGetCssValueAsIntOrZero(item, 'border-top-width') +
                    self.ezGetCssValueAsIntOrZero(item, 'border-bottom-width'),
                borderW: self.ezGetCssValueAsIntOrZero(item, 'border-left-width') +
                    self.ezGetCssValueAsIntOrZero(item, 'border-right-width'),
                border: {
                    top: self.ezGetCssValueAsIntOrZero(item, 'border-top-width'),
                    bottom: self.ezGetCssValueAsIntOrZero(item, 'border-bottom-width'),
                    left: self.ezGetCssValueAsIntOrZero(item, 'border-left-width'),
                    right: self.ezGetCssValueAsIntOrZero(item, 'border-right-width')
                }
            };

        let offset = item.offset();
        if (offset) {
            results.rect.top = isNaN(offset.top)
                ? 0
                : offset.top;
            results.rect.left = isNaN(offset.left)
                ? 0
                : offset.top;
            results.rect.right = isNaN(offset.left)
                ? 0
                : offset.top + results.inner.width + results.margin.right;
            results.rect.bottom = isNaN(offset.top)
                ? 0
                : offset.top + results.inner.height + results.margin.bottom;
        }

        return results;
    }

    /**
        @public
        Returns the CSS value as a number or zero.
        @returns {Number}
     */
    ezGetCssValueAsIntOrZero(element, cssPropName) {
        let result = parseInt(element.css(cssPropName));

        return isNaN(result)
            ? 0
            : result;
    }

    /**
        @public
        Returns the current window dimition
        {
             height: {number},
             width: {number}
        }
        @returns {Object}
     */
    windowDiminisions() {
        let item = ezApi.ezWindow();

        return {
            height: item.height(),
            width: item.width()
        };
    }

    /**
        @public
        @param {string} id
     */
    itemCenter(id) {
        let self = EzLayoutHelper.ezInstance;
        let item = self.ezItemRef(id);
        return parseInt(item.innerWidth() / 2);
    }

    /**
        @public
        @param {string} id
     */
    itemMiddle(id) {
        let self = EzLayoutHelper.ezInstance;
        let item = self.ezItemRef(id);
        return parseInt(item.innerHeight() / 2);
    }

    /**
        @public
        @param {string} parentId
        @param {string} contentId
     */
    sizeContentHeightWithinContainer(parentId, contentId) {
        let self = EzLayoutHelper.ezInstance;

        if (!ezApi.ezStringHasLength(parentId)) {
            throw new EzBadParamException(
                'parentId',
                self,
                self.sizeContentHeightWithinContainer);
        }
        if (!ezApi.ezStringHasLength(contentId)) {
            throw new EzBadParamException(
                'contentId',
                self,
                self.sizeContentHeightWithinContainer);
        }

        let pDim = self.itemDiminsions(parentId);
        let cDim = self.itemDiminsions(contentId);
        let cDimPaddingHeight = isNaN(cDim.borderH) ? 0 : cDim.paddingH;
        let cDimMarginHeight = isNaN(cDim.MarginH) ? 0 : cDim.marginH;

        let content = self.ezItemRef(contentId);
        let newHeight = pDim.inner.height - ((cDim.rect.top - pDim.rect.top) + (cDimPaddingHeight + cDimMarginHeight));

        content.height(newHeight);
    }

    /**
        @public
        @param {string} headerId
        @param {string} menuId
        @param {string} contentId
     */
    sizeContentBelowHeaderAndMenu(headerId, menuId, contentId) {
        let self = EzLayoutHelper.ezInstance;

        if (!headerId) {
            ezApi.ezclocker.ezLogger.error('Missing header id reference.');
            return;
        }
        if (!menuId) {
            ezApi.ezclocker.ezLogger.error('Missing menu id reference.');
            return;

        }
        if (!contentId) {
            ezApi.ezclocker.ezLogger.error('Missing content id reference.');
            return;
        }
        let wDim = self.windowDiminisions();
        let hDim = self.itemDiminsions(headerId);
        let mDim = self.itemDiminsions(menuId);
        let cDim = self.itemDiminsions(contentId);

        let cDimBorderHeight = isNaN(cDim.borderH) ? 0 : cDim.borderH;
        let cDimMarginHeight = isNaN(cDim.MarginH) ? 0 : cDim.marginH;

        let content = self.ezItemRef(contentId);
        let newHeight = wDim.height - (hDim.outer.height + mDim.outer.height + cDimBorderHeight + cDimMarginHeight);

        content.height(newHeight - 8);
    }

    /**
        @public
        @param {string} headerId
        @param {string} menuId
        @param {string} subMenuId
        @param {string} contentId
     */
    sizeContentBelowHeaderMenuAndSubMenu(headerId, menuId, subMenuId, contentId) {
        let self = EzLayoutHelper.ezInstance;

        if (!headerId) {
            ezApi.ezclocker.ezLogger.error('Missing header id reference.');
            return;
        }
        if (!menuId) {
            ezApi.ezclocker.ezLogger.error('Missing menu id reference.');
            return;

        }
        if (!contentId) {
            ezApi.ezclocker.ezLogger.error('Missing content id reference.');
            return;
        }
        if (!subMenuId) {
            ezApi.ezclocker.ezLogger.error('Missing subMenuId id reference.');
            return;
        }

        let wDim = self.windowDiminisions();
        let hDim = self.itemDiminsions(headerId);
        let mDim = self.itemDiminsions(menuId);
        let smDim = self.itemDiminsions(subMenuId);
        let cDim = self.itemDiminsions(contentId);
        let content = self.ezItemRef(contentId);
        let newHeight = wDim.height - (hDim.outer.height + mDim.outer.height + +smDim.outer.height + cDim.borderH +
            cDim.marginH);

        content.height(newHeight);
    }
}

export {
    EzLayoutHelper
};
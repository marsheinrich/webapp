/**
 * Provides calculations for height, width, margins, padding, etc
 */
var ezLayoutHelper = {
    itemHeightMargins: function(htmlId) {
        var outer = $('#' + htmlId).outerHeight(true);
        var inner = $('#' + htmlId).innerHeight();
        return outer - inner;
    },
    itemWidthMargins: function(htmlId) {
        var outer = $('#' + htmlId).outerWidth(true);
        var inner = $('#' + htmlId).innerWidth();
        return outer - inner;
    },
    itemWidth: function() {
        var outerW = $('#' + htmlId).outerWidth(true);
        return outerW;
    },
    itemHeight: function() {
        var outerH = $('#' + htmlId).outerHeight(true);
        return outerH;
    },
    itemTop: function(htmlId) {
        var offset = $('#' + htmlId).offset();
        if (!gridContainerOffset) {
            return;
        }
        return parseInt(gridContainerOffset.top);
    },
    itemLeft: function(htmlId) {
        var offset = $('#' + htmlId).offset();
        if (!gridContainerOffset) {
            return;
        }
        return parseInt(gridContainerOffset.left);
    },
    itemContentSize: function(htmlId) {
        var item = $('#' + htmlId);
        return {
            height: item.innerHeight(),
            width: item.innerWidth()
        };
    },
    itemPadding: function(htmlId) {
        var item = $('#' + htmlId);
        var results = {
            height: parseInt(item.css('padding-top')) + parseInt(item.css('padding-bottom')),
            width: parseInt(item.css('padding-left')) + parseInt(item.css('passing-right')),
            top: parseInt(item.css('padding-top')),
            bottom: parseInt(item.css('padding-bottom')),
            left: parseInt(item.css('padding-left')),
            right: parseInt(item.css('passing-right'))
        };
        return results;
    },
    itemMargins: function(htmlId) {
        var item = $('#' + htmlId);
        var results = {
            height: parseInt(item.css('margin-top')) + parseInt(item.css('margin-bottom')),
            width: parseInt(item.css('margin-left')) + parseInt(item.css('margin-right')),
            top: parseInt(item.css('margin-top')),
            bottom: parseInt(item.css('margin-bottom')),
            left: parseInt(item.css('margin-left')),
            right: parseInt(item.css('margin-right'))
        };
        return results;
    },
    itemDiminsions: function(htmlId) {
        var item = $('#' + htmlId);
        var outerH = item.outerHeight(true);
        var innerH = item.innerHeight();

        var outerW = item.outerWidth(true);
        var innerW = item.innerWidth();

        var results = {
            id: htmlId,
            outer: {
                height: outerH,
                width: outerW
            },
            inner: {
                height: innerH,
                width: innerW
            },
            rect: {
                top: undefined,
                left: undefined,
                bottom: undefined,
                right: undefined
            },
            marginH: (outerH - innerH),
            marginW: (outerW - innerW),
            margin: {
                top: parseInt(item.css('margin-top')),
                bottom: parseInt(item.css('margin-bottom')),
                left: parseInt(item.css('margin-left')),
                right: parseInt(item.css('margin-right'))
            },
            paddingH: parseInt(item.css('padding-top')) + parseInt(item.css('padding-bottom')),
            paddingW: parseInt(item.css('padding-left')) + parseInt(item.css('passing-right')),
            padding: {
                top: parseInt(item.css('padding-top')),
                bottom: parseInt(item.css('padding-bottom')),
                left: parseInt(item.css('padding-left')),
                right: parseInt(item.css('passing-right'))
            },
            borderH: parseInt(item.css('border-top-width')) + parseInt(item.css('border-bottom-width')),
            borderW: parseInt(item.css('border-left-width')) + parseInt(item.css('border-right-width')),
            border: {
                top: parseInt(item.css('border-top-width')),
                bottom: parseInt(item.css('border-bottom-width')),
                left: parseInt(item.css('border-left-width')),
                right: parseInt(item.css('border-right-width'))
            }
        };

        var offset = item.offset();
        if (offset) {
            results.rect.top = offset.top;
            results.rect.left = offset.left;
            results.rect.right = offset.left + results.inner.width + results.margin.right;
            results.rect.bottom = offset.top + results.inner.height + results.margin.bottom;
        }
        return results;
    },
    windowDiminisions: function() {
        var item = $(window);
        var result = {
            height: item.height(),
            width: item.width()
        };
        return result;
    },
    itemCenter: function(htmlId) {
        var item = $('#' + htmlId);
        return parseInt(item.innerWidth() / 2);
    },
    itemMiddle: function(htmlId) {
        var item = $('#' + htmlId);
        return item.innerHeight() / 2;
    },
    sizeContentHeightWithinContainer: function(parentId, contentId) {
        if (!parentId) {
            ezLogger.error('Missing parent id reference.');
            return;
        }
        if (!contentId) {
            ezLogger.error('Missing content id reference.');
            return;
        }
        var pDim = ezLayoutHelper.itemDiminsions(parentId);
        var cDim = ezLayoutHelper.itemDiminsions(contentId);
        var content = $('#' + contentId);
        var newHeight = pDim.inner.height - ((cDim.rect.top - pDim.rect.top) + (cDim.paddingH + cDim.marginH));
        content.height(newHeight);
    },
    sizeContentBelowHeaderAndMenu: function(headerId, menuId, contentId) {
        if (!headerId) {
            ezLogger.error('Missing header id reference.');
            return;
        }
        if (!menuId) {
            ezLogger.error('Missing menu id reference.');
            return;

        }
        if (!contentId) {
            ezLogger.error('Missing content id reference.');
            return;
        }
        var wDim = ezLayoutHelper.windowDiminisions();
        var hDim = ezLayoutHelper.itemDiminsions(headerId);
        var mDim = ezLayoutHelper.itemDiminsions(menuId);
        var cDim = ezLayoutHelper.itemDiminsions(contentId);
        var content = $('#' + contentId);
        var newHeight = wDim.height - (hDim.outer.height + mDim.outer.height + cDim.borderH + cDim.marginH);
        content.height(newHeight);
    }
};

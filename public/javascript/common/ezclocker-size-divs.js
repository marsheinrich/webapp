window.console.warn('DEPRECATED: Remove all references. Perform sizing within page code instead.');



/**
 * Sizes the containers div to fit the screen correctly
 */
function sizeDivs(header, content) {
    var windowHeight = $(window).height();

    var nonContentHeight = 0;
    if ($(header) !== null) {
        nonContentHeight += $(header).outerHeight(true);
    }

    if ($(content) !== null) {
        $(content).height(windowHeight - (nonContentHeight + 40));
    }
}

function sizeContentStaticHeader2015(header, menu, content) {
    if (!content) {
        return;
    } // nothing to do

    var windowHeight = $(window).height();
    var nonContentHeight = 0;
    if (header) {
        nonContentHeight += parseInt(header.outerHeight(true)) + 2;
    }
    if (menu) {
        nonContentHeight += parseInt(menu.outerHeight(true)) + 2;
    }
    content.height(windowHeight - nonContentHeight);
}

/**
 * Sizes the containers div to fit the screen correctly
 */
function sizeDivsEx(header, menu, content) {
    var windowHeight = $(window).height();

    var nonContentHeight = 0;
    if ($(header) !== null) {
        nonContentHeight += $(header).outerHeight(true);
    }
    if ($(menu) !== null) {
        nonContentHeight += $(menu).outerHeight(true);
    }

    if ($(content) !== null) {
        $(content).height(windowHeight - (nonContentHeight));
    }
}

function sizeDivsSiteMap(header, menu, content, siteMap) {
    var windowHeight = $(window).height();

    var nonContentHeight = 0;
    if ($(header) !== null) {
        nonContentHeight += $(header).outerHeight(true);
    }
    if ($(menu) !== null) {
        nonContentHeight += $(menu).outerHeight(true);
    }
    if ($(siteMap) !== null) {
        nonContentHeight += $(siteMap).outerHeight(true);
    }
    if ($(content) !== null) {
        $(content).height(windowHeight - (nonContentHeight + 40));
    }

}

function sizeDivs2(header, content) {
    var windowHeight = $(window).height();

    var nonContentHeight = 0;
    if ($(header) !== null) {
        nonContentHeight += $(header).outerHeight();
    }

    if ($(content) !== null) {
        $(content).height(windowHeight - nonContentHeight);
    }
}

export {
    sizeDivs,
    sizeDivs2,
    sizeDivsSiteMap,
    sizeDivsEx,
    sizeContentStaticHeader2015
};
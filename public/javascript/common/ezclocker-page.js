/**
 * Enables Jquery UI Tool Tips for the page
 */
var ezPage = {
    ready: false,
    ezInit: function() {
        this.enableToolTip();
        this.ready = true;
        return this;
    },
    enableToolTip: function() {
        //$(document).tooltip();
    },
    /**
     * @deprecated USE ezUi Instead
     */
    fadeInBody: function(cb) {
        ezPage.fadeInItem('body', cb);
    },
    /**
     * @deprecated USE ezUi Instead
     */
    fadeInItem: function() {
        //		if (!jqSelector)
        //			return; // nothing to show
        //		$(jqSelector).show("fade", 500, cb);
    },
    /**
     * @deprecated USE ezUi Instead
     */
    fadeOutItem: function(jqSelector, cb) {
        if (!jqSelector) {
            return;
        } // nothing to show
        $(jqSelector).hide('fade', 500, cb);
    },
    /**
     * @deprecated USE ezUi Instead
     */
    disableItem: function(jqSelector) {
        if (!jqSelector) {
            return;
        } // nothing to show
        $(jqSelector).prop('disabled', true);
    },
    /**
     * @deprecated USE ezUi Instead
     */
    enableItem: function(jqSelector) {
        if (!jqSelector) {
            return;
        } // nothing to show
        $(jqSelector).prop('disabled', false);
    },
    /**
     * @deprecated USE ezUi Instead
     */
    hideItem: function(jqSelector) {
        if (!jqSelector) {
            return;
        } // nothing to show
        $(jqSelector).hide();
    },
    /**
     * @deprecated USE ezUi Instead
     */
    showItem: function(jqSelector) {
        if (!jqSelector) {
            return;
        } // nothing to show
        $(jqSelector).show();
    },
    /**
     * @deprecated USE ezUi Instead
     */
    showWithHtml: function(jqSelector, htmlData) {
        if (!jqSelector || ezApi.isEmptyString(htmlData)) {
            return;
        }
        $(jqSelector).html(htmlData);
        ezPage.showItem(jqSelector);
    }
};

document.addEventListener('onEzApiReady', function() {
    if (typeof ezApi !== 'undefined' && ezApi) {
        ezApi.ezRegisterPublic('ezPage', ezPage);
    }
    ezPage.ezInit();
});
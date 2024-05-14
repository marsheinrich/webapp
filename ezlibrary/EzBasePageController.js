import { EzBaseJSObject } from '/ezlibrary/EzBaseJSObject.js';

class EzBasePageController extends EzBaseJSObject {
    /**
        @public
        Creates a new instance of EzBasePageController
        @param {String} pageId
        HTML element id for the page (globally unique to the page)
        @param {String|null} title
        Optional title string for the page. If missing, ezClocker is used as the title.
     */
    constructor(ezPageControllerConfig) {
        super();
        let self = this;

        self.ezAddProperty(
            'Ready',
            false);

        self.ezAddProperty(
            'ClassName',
            'EzBasePageController');

        if (!ezPageControllerConfig) {
            throw new Error(
                `A valid page controller config is required to create a new instance of ${self.ezGetClassName()}.`);
        }
        self.ezAddProperty(
            'PageControllerConfig',
            ezPageControllerConfig);

        self.ezAddProperty(
            'Ids',
            {
                body: {
                    id: `${self.ezGetPageControllerConfig().ezGetPageId()}_Body`,
                    containers: {
                        header: {
                            id: `${self.ezGetPageControllerConfig().ezGetPageId()}_HeaderContainer`
                        },
                        content: {
                            id: `${self.ezGetPageControllerConfig().ezGetPageId()}_ContentContainer`
                        },
                        hiddenDialogs: {
                            id: `${self.ezGetPageControllerConfig().ezGetPageId()}_HideDialogsContainer`
                        }
                    }
                }
            });

        self.ezInternalInit(self);
    }

    /**
        @protected
        Initializes the default HTML page by optionally injecting default meta tags,
        link, and script tags. In addition, the default HTML element contains are also built
        and placed into the document.
     */
    ezInternalInit(self) {
        self = self || this;

        let headElements = document.getElementsByTagName('head');
        if (!headElements || 0 == headElements.length) {
            return;
        }

        if (!self.ezGetPageControllerConfig().ezGetInjectDefaultMetaTags() &&
            !self.ezGetPageControllerConfig().ezGetInjectDefaultLinkTags() &&
            !self.ezGetPageControllerConfig().ezGetInjectDefaultScriptTags()) {
            self.ready = self.ezValidateRequiredDependencies();
            return self.ready;
        }

        if (self.ezGetPageControllerConfig().ezGetInjectDefaultScriptTags()) {
            $(document).ready(() => {
                self.ready = self.ezValidateRequiredDependencies();
            });
            self.ezInjectDefaultScriptTags(headElements[0]);
        }

        if (self.ezGetReady()) {
            if (self.ezGetPageControllerConfig().ezGetInjectDefaultLinkTags()) {
                self.ezInjectDefaultMetaTags(headElements[0]);
            }
            if (self.ezGetPageControllerConfig().ezGetInjectDefaultMetaTags()) {
                self.ezInjectDefaultLinkTags(headElements[0]);
            }

            let titleElements = document.getElementsByTagName('title');
            if (titleElements && 1 >= titleElements.length) {
                titleElements[0].append(self.ezGetPageControllerConfig().ezGetPageTitle());
            }
        }

    }

    /**
        @protected
        Injects the default meta tags used by ezClocker pages.
        @param {Object} headElement
        Reference to the document's <head> element
     */
    ezInjectDefaultMetaTags(headElement) {
        if (!headElement) {
            return;
        }

        // <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        let contentTypeMetaTag = document.createElement('meta');
        contentTypeMetaTag.httpEquiv = 'Content-Type';
        contentTypeMetaTag.content = 'text/html; charset=UTF-8';

        // <meta http-equiv="Content-Language" content="en">
        let contentLangugageMetaTag = document.createElement('meta');
        contentLangugageMetaTag.httpEquiv = 'Content-Language';
        contentLangugageMetaTag.content = 'en';

        // <meta name="viewport" content="width=device-width, initial-scale=1">
        let viewportMetaTag = document.createElement('meta');
        viewportMetaTag.httpEquiv = 'viewport';
        viewportMetaTag.content = 'width=device-width, initial-scale=1';

        headElement.prepend(
            contentTypeMetaTag,
            contentLangugageMetaTag,
            viewportMetaTag);
    }

    /**
        @protected
        Injects the default link tags used by ezClocker pages.
        @param {Object} headElement
        Reference to the document's <head> element
     */
    ezInjectDefaultLinkTags(headElement) {
        if (!headElement) {
            return;
        }

        // <link rel="shortcut icon" href="/favicon.png" type="image/png">
        let favicon = document.createElement('link');
        favicon.rel = 'shortcut icon';
        favicon.href = '/favicon.png';
        favicon.type = 'image/png';

        // <link href="//fonts.googleapis.com/css2?family=Noto+Sans+JP&family=Roboto&display=swap" rel="stylesheet">
        let robotoFont = document.createElement('link');
        robotoFont.rel = 'stylesheet';
        robotoFont.href = '//fonts.googleapis.com/css2?family=Noto+Sans+JP&family=Roboto&display=swap';

        //<link href="/jquery-ui/jquery-ui.min.css" rel="stylesheet" type="text/css">
        let jqueryUICss = document.createElement('link');
        jqueryUICss.href = '/jquery-ui/jquery-ui.min.css?v=r72-3';
        jqueryUICss.rel = 'stylesheet';
        jqueryUICss.type = 'text/css';

        //<link href="/jquery-ui/jquery-ui.structure.min.css" rel="stylesheet" type="text/css">
        let jqueryUIStructureCss = document.createElement('link');
        jqueryUIStructureCss.href = '/jquery-ui/jquery-ui.structure.min.css?v=r72-3';
        jqueryUIStructureCss.rel = 'stylesheet';
        jqueryUIStructureCss.type = 'text/css';

        //<link href="/jquery-ui/jquery-ui.theme.min.css" rel="stylesheet" type="text/css">
        let jqueryUiThemeCss = document.createElement('link');
        jqueryUiThemeCss.href = '/jquery-ui/jquery-ui.theme.min.css?v=r72-3';
        jqueryUiThemeCss.rel = 'stylesheet';
        jqueryUiThemeCss.type = 'text/css';

        //<link href="/jquery-ui/jquery.ui.timepicker-0.3.3.min.css" rel="stylesheet" type="text/css">
        let jqueryTimePickerCss = document.createElement('link');
        jqueryTimePickerCss.href = '/jquery-ui/jquery.ui.timepicker-0.3.3.min.css';
        jqueryTimePickerCss.rel = 'stylesheet';
        jqueryTimePickerCss.type = 'text/css';

        let animateCss = document.createElement('link');
        animateCss.href = '/node_modules/animate.css/animate.min.css?v=r72-3';
        animateCss.rel = 'stylesheet';
        animateCss.type = 'text/css';

        //<link href="/public/styles/common/ez-body.css" rel="stylesheet" type="text/css">
        let ezBodyCss = document.createElement('link');
        ezBodyCss.href = '/public/styles/common/ez-body.css?v=r51-';
        ezBodyCss.rel = 'stylesheet';
        ezBodyCss.type = 'text/css';

        //<link href="/public/styles/common/ez-borders.css" rel="stylesheet" type="text/css">
        let ezBordersCss = document.createElement('link');
        ezBordersCss.href = '/public/styles/common/ez-borders.css?v=r72-3';
        ezBordersCss.rel = 'stylesheet';
        ezBordersCss.type = 'text/css';

        //<link href="/public/styles/common/ez-padding.css" rel="stylesheet" type="text/css">
        let ezPaddingCss = document.createElement('link');
        ezPaddingCss.href = '/favicon.png';
        ezPaddingCss.rel = 'stylesheet';
        ezPaddingCss.type = 'text/css';

        //<link href="/public/styles/common/ez-shadows.css" rel="stylesheet" type="text/css">
        let ezShadowsCss = document.createElement('link');
        ezShadowsCss.href = '/public/styles/common/ez-shadows.css?v=r72-3';
        ezShadowsCss.rel = 'stylesheet';
        ezShadowsCss.type = 'text/css';

        //<link href="/public/styles/common/ez-text.css" rel="stylesheet" type="text/css">
        let ezTextCss = document.createElement('link');
        ezTextCss.href = '/public/styles/common/ez-text.css?v=r72-3';
        ezTextCss.rel = 'stylesheet';
        ezTextCss.type = 'text/css';

        //<link href="/public/styles/common/ez-layout-grid.css" rel="stylesheet" type="text/css">
        let ezLayoutGridCss = document.createElement('link');
        ezLayoutGridCss.href = '/public/styles/common/ez-layout-grid.css?v=r72-3';
        ezLayoutGridCss.rel = 'stylesheet';
        ezLayoutGridCss.type = 'text/css';

        //<link href="/public/styles/common/ez-containers.css" rel="stylesheet" type="text/css">
        let ezContainersCss = document.createElement('link');
        ezContainersCss.href = '/public/styles/common/ez-containers.css?v=r72-3';
        ezContainersCss.rel = 'stylesheet';
        ezContainersCss.type = 'text/css';

        //<link href="/public/styles/common/ezclocker-page-layout.css" rel="stylesheet" type="text/css">
        let ezClockerPageLayoutCss = document.createElement('link');
        ezClockerPageLayoutCss.href = '/public/styles/common/ezclocker-page-layout.css?v=r72-3';
        ezClockerPageLayoutCss.rel = 'stylesheet';
        ezClockerPageLayoutCss.type = 'text/css';

        //<link href="/public/styles/common/ez-tabs.css" rel="stylesheet" type="text/css">
        let ezTablesCss = document.createElement('link');
        ezTablesCss.href = '/public/styles/common/ez-tabs.css?v=r72-3';
        ezTablesCss.rel = 'stylesheet';
        ezTablesCss.type = 'text/css';

        //<link href="/public/styles/common/ez-logo.css" rel="stylesheet" type="text/css">
        let ezLogoCss = document.createElement('link');
        ezLogoCss.href = '/public/styles/common/ez-logo.css?v=r72-3';
        ezLogoCss.rel = 'stylesheet';
        ezLogoCss.type = 'text/css';

        //<link href="/public/styles/common/ez-header.css" rel="stylesheet" type="text/css">
        let ezHeaderCss = document.createElement('link');
        ezHeaderCss.href = '/public/styles/common/ez-header.css?v=r72-3';
        ezHeaderCss.rel = 'stylesheet';
        ezHeaderCss.type = 'text/css';

        //<link href="/public/styles/common/ez-inputs.css" rel="stylesheet" type="text/css">
        let ezInputsCss = document.createElement('link');
        ezInputsCss.href = '/public/styles/common/ez-inputs.css?v=r72-3';
        ezInputsCss.rel = 'stylesheet';
        ezInputsCss.type = 'text/css';

        //<link href="/public/styles/common/ez-buttons.css" rel="stylesheet" type="text/css">
        let ezButtonsCss = document.createElement('link');
        ezButtonsCss.href = '/public/styles/common/ez-buttons.css?v=r72-3';
        ezButtonsCss.rel = 'stylesheet';
        ezButtonsCss.type = 'text/css';

        //<link href="/public/styles/common/ez-tabs.css" rel="stylesheet" type="text/css">
        let ezTabsCss = document.createElement('link');
        ezTabsCss.href = '/public/styles/common/ez-tabs.css?v=r72-3';
        ezTabsCss.rel = 'stylesheet';
        ezTabsCss.type = 'text/css';

        //<link href="/public/styles/common/ez-dialogs.css" rel="stylesheet" type="text/css">
        let ezDialogsCss = document.createElement('link');
        ezDialogsCss.href = '//public/styles/common/ez-dialogs.css?v=r72-3';
        ezDialogsCss.rel = 'stylesheet';
        ezDialogsCss.type = 'text/css';

        headElement.prepend(
            favicon,
            robotoFont,
            jqueryUICss,
            jqueryUIStructureCss,
            jqueryUiThemeCss,
            jqueryTimePickerCss,
            animateCss,
            ezBodyCss,
            ezBordersCss,
            ezPaddingCss,
            ezShadowsCss,
            ezTextCss,
            ezLayoutGridCss,
            ezContainersCss,
            ezClockerPageLayoutCss,
            ezTablesCss,
            ezLogoCss,
            ezHeaderCss,
            ezInputsCss,
            ezButtonsCss,
            ezTabsCss,
            ezDialogsCss);
    }

    /**
        @protected
        Injects the default JS script tags used by ezClocker pages.
        @param {Object} headElement
        Reference to the document's <head> element
     */
    ezInjectDefaultScriptTags(headElement) {
        if (!headElement) {
            return;
        }
        let scriptNodes = [];

        //<script src="/node_modules/core-js-bundle/minified.js"></script>
        let scriptNode = document.createElement('script');
        scriptNode.src = '/node_modules/core-js-bundle/minified.js?v=r72-3';
        scriptNodes.push(scriptNode);

        //<script src="/node_modules/jquery/dist/jquery.min.js"></script>
        scriptNode = document.createElement('script');
        scriptNode.src = '/node_modules/jquery/dist/jquery.min.js?v=r72-3';
        scriptNodes.push(scriptNode);

        //<script src="/node_modules/jquery-migrate/dist/jquery-migrate.min.js"></script>
        scriptNode = document.createElement('script');
        scriptNode.src = '/node_modules/jquery-migrate/dist/jquery-migrate.min.js?v=r72-3';
        scriptNodes.push(scriptNode);

        //<script src="/node_modules/moment/min/moment-with-locales.min.js"></script>
        scriptNode = document.createElement('script');
        scriptNode.src = '/node_modules/moment/min/moment-with-locales.min.js?v=r72-3';
        scriptNodes.push(scriptNode);

        //<script src="/node_modules/moment-timezone/builds/moment-timezone-with-data.min.js"></script>
        scriptNode = document.createElement('script');
        scriptNode.src = '/node_modules/moment-timezone/builds/moment-timezone-with-data.min.js?v=r72-3';
        scriptNodes.push(scriptNode);

        //<!-- library ux js -->
        //<script src="/jquery-ui/jquery.ui.timepicker-0.3.3.min.js"></script>
        scriptNode = document.createElement('script');
        scriptNode.src = '/jquery-ui/jquery.ui.timepicker-0.3.3.min.js';
        scriptNodes.push(scriptNode);

        //<!-- ezclocker core bundle js -->
        //<script src="/ezwp/js/ez-library.bundle.js"></script>
        scriptNode = document.createElement('script');
        scriptNode.src = '/ezwp/js/ez-library.bundle.js?v=r72-3';
        scriptNodes.push(scriptNode);

        //<script src="/ezwp/js/ez-core.bundle.js"></script>
        scriptNode = document.createElement('script');
        scriptNode.src = '/ezwp/js/ez-core.bundle.js?v=r72-3';
        scriptNodes.push(scriptNode);

        //<!-- ezclocker core ux bundle js -->
        //<script src="/ezwp/js/ez-ux-core.bundle.js"></script>
        scriptNode = document.createElement('script');
        scriptNode.src = '/ezwp/js/ez-ux-core.bundle.js?v=r72-3';
        scriptNodes.push(scriptNode);

        headElement.prepend(scriptNodes);
    }

    /**
        @protected
        Validates that the page has the require dependencies included and ready.
        @returns {Boolean}
     */
    ezValidateRequiredDependencies() {
        if (!$) {
            throw new Error('A valid global jQuery instance ($) is required to use EzBasePageController.');
        }
        if (!jQuery.ui) {
            throw new Error('A valid global jQuery instance ($) is required to use EzBasePageController.');
        }
        if (!ezApi) {
            throw new Error('The global ezApi instance is required to use EzBasePageController.');
        }
        if (!ezUi) {
            throw new Error('The global ezUi instance is required to use EzBasePageController.');
        }

        return true;
    }

    /**
        @protected
        Initialzies the EzBasePageController instance
        @param {Object|null} self
        Optionally pass a reference to the instance of EzBasePageController to perform the action upon. Otherwise,
        the current 'this' reference is assumed a valid EzBasePageController instance.
     */
    ezInit() {
        let self = this;

        self.ezBuildDefaultBodyContainers(self);
    }

    /**
        @protected
        Initialzies the UX for the EzBasePageController instance
        @param {Object|null} self
        Optionally pass a reference to the instance of EzBasePageController to perform the action upon. Otherwise,
        the current 'this' reference is assumed a valid EzBasePageController instance.
     */
    ezInitUX(self) {
        self = self || this;

        ezUi.ezAddElementClass('html', 'ezHtml');
        ezUi.ezAddElementClass(this.bodyElement, 'ezPageBody');

        self.ezBuildMainPageContainers();
    }

    /**
        @protected
        Builds the default page container HTML elements that all ezClocker pages use (for the most part)
        @param {EzBasePageController|null}
        Optionally pass a reference to the instance of EzBasePageController to perform the action upon. Otherwise,
        the current 'this' reference is assumed a valid EzBasePageController instance.
     */
    ezBuildDefaultBodyContainers(self) {
        self = self || this;

        self.ezAppendBodyContainer('headerContainerId', 'HeaderContainer', '', self);
        self.ezAppendBodyContainer('contentContainerId', 'ContentContainer', 'ezPageView', self);
        self.ezAppendBodyContainer('hiddenDialogsContainerId', 'HiddenDialogsContainer', '', 'display:none', self);
    }

    /**
        @public
        Appends the provided childHtml to the body container id specified.
        @param {String} bodyContainerId
        @param {String} childHtml
        @param {EzBasePageController|null} self
        Optionally pass a reference to the instance of EzBasePageController to perform the action upon. Otherwise,
        the current 'this' reference is assumed a valid EzBasePageController instance.
     */
    ezAppendBodyContainerChildHtml(bodyContainerId, childHtml, self) {
        self = self || this;

        if (!ezApi.ezStringHasLength(bodyContainerId)) {
            throw ezApi.ezBadParam('bodyContainerId', 'ezAppendChildHtml', self.ezGetClassName());
        }
        if (!ezApi.ezStringHasLength(childHtml)) {
            throw ezApi.ezBadParam('childHtml', 'ezAppendChildHtml', self.ezGetClassName());
        }

        ezUi.ezAppendContent(
            bodyContainerId,
            childHtml);
    }

    /**
        @public
        Appends the provided html to the innerHtml property of the specified sub-container (parentContainerId) within
        the specified body container (bodyContainerId).
        @param {String} bodyContainerId
        @param {String} parentContainerId
        @param {String} childHtml
        @param {EzBasePageController|null} self
        Optionally pass a reference to the instance of EzBasePageController to perform the action upon. Otherwise,
        the current 'this' reference is assumed a valid EzBasePageController instance.
     */
    ezAppendChildContainerHtml(bodyContainerId, parentContainerId, childHtml, self) {
        self = self || this;

        if (!ezApi.ezStringHasLength(bodyContainerId)) {
            throw ezApi.ezBadParam('bodyContainerId', 'ezAppendChildContainerHtml', self.ezGetClassName());
        }
        if (!ezApi.ezStringHasLength(bodyContainerId)) {
            throw ezApi.ezBadParam('parentContainerId', 'ezAppendChildContainerHtml', self.ezGetClassName());
        }
        if (!ezApi.ezStringHasLength(parentContainerId)) {
            throw ezApi.ezBadParam('parentContainerId', 'ezAppendChildContainerHtml', self.ezGetClassName());
        }
        if (!ezApi.ezStringHasLength(childHtml)) {
            throw ezApi.ezBadParam('childHtml', 'ezAppendChildContainerHtml', self.ezGetClassName());
        }
        if (!ezApi.ezHasOwnProperty(this.ezIds.body.containers, bodyContainerId)) {
            throw ezApi.ezException(ezApi.ezEM`
                Body container with id=${bodyContainerId} does not exist`);
        }
        if (!ezApi.ezHasOwnProperty(this.ezIds.body.containers[bodyContainerId], parentContainerId)) {
            throw ezApi.ezException(ezApi.ezEM`
                Body container with id=${bodyContainerId}
                does not have a child container with id=${parentContainerId}`);
        }

        ezUi.ezAppendContent(
            parentContainerId,
            childHtml);

        return this.ezIds.body.containers[bodyContainerId][parentContainerId];
    }

    /**
        @public
        Appends a child div (container) to the innerHtml of the specified sub-container (parentContainerId) within the
        specified body container (bodyContainerId).
        @param {String} bodyContainerId
        @param {String} parentContainerId
        @param {String} childContainerName
        @param {String} childContainerId
        @param {String|null} childContainerClasses
        An option valye for the HTML element's class property.
        @param {EzBasePageController|null} self
        Optionally pass a reference to the instance of EzBasePageController to perform the action upon. Otherwise,
        the current 'this' reference is assumed a valid EzBasePageController instance.
     */
    ezAppendChildContainer(bodyContainerId, parentContainerId, childContainerName, childContainerId,
        childContainerClasses, self) {
        self = self || this;

        if (!ezApi.ezStringHasLength(bodyContainerId)) {
            throw ezApi.ezBadParam('bodyContainerId', 'ezAppendChildContainer', self.ezGetClassName());
        }
        if (!ezApi.ezStringHasLength(parentContainerId)) {
            throw ezApi.ezBadParam('parentContainerId', 'ezAppendChildContainer', self.ezGetClassName());
        }
        if (!ezApi.ezStringHasLength(childContainerId)) {
            throw ezApi.ezBadParam('childContainerId', 'ezAppendChildContainer', self.ezGetClassName());
        }
        if (!ezApi.ezHasOwnProperty(this.ezIds.body.containers, bodyContainerId)) {
            throw ezApi.ezException(ezApi.ezEM`
                Body container with id=${bodyContainerId} does not exist`);
        }
        if (!ezApi.ezHasOwnProperty(self.ezGetIds().body.containers[bodyContainerId], parentContainerId)) {
            throw ezApi.ezException(ezApi.ezEM`
                Body container with id=${bodyContainerId}
                does not have a child container with id=${parentContainerId}.`);
        }

        if (!ezApi.ezStringHasLength(childContainerClasses)) {
            childContainerClasses = '';
        }

        self.ezGetIds().body[bodyContainerId][parentContainerId][childContainerName] = {
            id: childContainerId
        };

        ezUi.ezAppendContent(
            parentContainerId,
            ezApi.ezTemplate`
                <div
                    id="${this.ezPageId}_${parentContainerId}_${childContainerId}"
                    class="${childContainerClasses}">
                </div>`);

        return self.ezGetIds().body[bodyContainerId][parentContainerId][childContainerName];
    }

    /**
        @public
        Appends a div (sub-container) the innerHtml of the specified body container (bodyContainerId).
        @param {String} bodyContainerId
        @param {String} parentContainerId
        @param {String} subContainerName
        @param {String} subContainerId
        @param {String|null} subContainerClasses
        Optional value for the HTML element's class property.
        @param {EzBasePageController|null} self
        Optional reference to the instance of EzBasePageController to perform the action upon. Otherwise,
        the current 'this' reference is assumed a valid EzBasePageController instance.
     */
    ezAppendSubContainer(bodyContainerId, subContainerName, subContainerId, subContainerClasses, self) {
        self = self || this;

        if (!ezApi.ezStringHasLength(bodyContainerId)) {
            throw ezApi.ezBadParam('bodyContainerId', 'ezAppendSubContainer', self.ezGetClassName());
        }
        if (!ezApi.ezHasOwnProperty(self.ezIds.body.containers, bodyContainerId)) {
            throw ezApi.ezException(ezApi.ezEM`Body container with id=${bodyContainerId} does not exist`);
        }

        self.ezGetIds().body[bodyContainerId][subContainerName] = {
            id: subContainerId
        };

        ezUi.ezAppendContent(
            bodyContainerId,
            ezApi.ezTemplate`
                <div
                    id="${this.ezPageId}_${bodyContainerId}_${subContainerId}"
                    classes="${subContainerClasses}">
                </div>`);

        return self.ezGetIds().body[bodyContainerId][subContainerName];
    }

    /**
        @public
        Appends a div (body container) the innerHtml of the HTML document's <body> tag
        @param {String} bodyContainerName
        @param {String} bodyContainerId
        @param {String|null} bodyContainerClasses
        Optional value for the HTML element's class property.
        @param {EzBasePageController|null} self
        Optional reference to the instance of EzBasePageController to perform the action upon. Otherwise,
        the current 'this' reference is assumed a valid EzBasePageController instance.
     */
    ezAppendBodyContainer(bodyContainerName, bodyContainerId, bodyContainerClasses, bodyContainerStyles, self) {
        self = self || this;

        if (!ezApi.ezStringHasLength(bodyContainerName)) {
            throw ezApi.ezBadParam('bodyContainerName', 'ezAppendBodyContainer', self.ezGetClassName());
        }
        if (!ezApi.ezStringHasLength(bodyContainerId)) {
            throw ezApi.ezBadParam('bodyContainerId', 'ezAppendBodyContainer', self.ezGetClassName());
        }

        self.ezGetIds().body.containers[bodyContainerName] = {
            id: bodyContainerId
        };

        if (!ezApi.ezStringHasLength(bodyContainerClasses)) {
            bodyContainerClasses = '';
        }

        if (!ezApi.ezStringHasLength(bodyContainerStyles)) {
            bodyContainerStyles = '';
        }

        ezUi.ezAppendContent(
            self.bodyElement,
            ezApi.ezTemplate`
                <div
                    id="${this.ezPageId}_${bodyContainerId}"
                    class="${bodyContainerClasses}"
                    style="${bodyContainerStyles}">
                </div>`);

        return self.ezGetIds().body.containers[bodyContainerName];
    }
}

export {
    EzBasePageController
};
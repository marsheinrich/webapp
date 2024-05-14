class EzInjector {
    constructor() {
        this.ezTypeName = 'EzInjector';
    }

    /**
     * @public
     * Injects the CSS file into the document as:
     * <link href="{cssFileUrl}" rel="stylesheet" type="text/css"></link>
     * @param {string} cssFilePath
     * @param {string|null} id
     * @returns {Promise}
     */
    ezInjectLinkTag(cssFileUrl, id) {
        let self = this;
        
        return ezApi.ezPromise(function(resolve) {
            let linkTag = document.createElement('link');
            linkTag.href = cssFileUrl;
            linkTag.rel = 'stylesheet';
            linkTag.type = 'text/css';
            if (ezApi.isNotEmptyString(id)) {
                linkTag.id = id;
            }
            linkTag.onLoad = function() {
                return resolve(linkTag);
            };
            self.ezGetPrimaryHeadTag().appendChild(linkTag);
        });
    }

    /**
     * @public
     * Injects a script tag into the document as:
     * <script src="{jsFileUrl}"></script>
     * @param {string} jsFilePath
     * @param {string|null} id
     * @returns {Promise}
     */
    ezInjectScriptTag(jsFileUrl, id) {
        let self = this;
        
        return ezApi.ezPromise(function(resolve) {
            let scriptTag = document.createElement('script');
            scriptTag.src = jsFileUrl;
            if (ezApi.isNotEmptyString(id)) {
                scriptTag.id = id;
            }
            scriptTag.onload = function() {
                return resolve(scriptTag);
            };
            self.ezGetPrimaryHeadTag().appendChild(scriptTag);
        });
    }

    /**
     * @public
     * Returns the primary <html></html> tag of the document (e.g. the first one)
     * If no <html></html> tag exists, one is created and appended to the document.
     * @returns {object}
     * Returns the <html></html> tag reference.
     */
    ezGetPrimaryHtmlTag() {
        let htmlTags = document.getElementsByTagName('html');
        if (htmlTags.length === 0) {
            ezApi.ezclocker.logger.warn(
                'The document does not have a <html></html> tag. Creating and appending a new body tag.'
            );
            let htmlTag = document.createElement('html');
            document.appendChild(htmlTag);
            return htmlTag;
        }
        return htmlTags[0];
    }

    /**
     * @public
     * Returns the primary <body></body> tag of the document ( e.g. the first one)
     * If no body tag exists, one is created and appended to the document.
     * @returns {object}
     * Returns the <body></body> tag reference.
     */
    ezGetPrimaryBodyTag() {
        let self = this;
        
        let bodyTags = document.getElementsByTagName('body');
        if (bodyTags.length === 0) {
            ezApi.ezclocker.logger.warn(
                'The document does not have a <body></body> tag. Creating and appending a new body tag.');
            let bodyTag = document.createElement('body');
            self.ezGetPrimaryHtmlTag().appendChild(bodyTag);
            return bodyTag;
        }
        return bodyTags[0];
    }

    /**
     * @public
     * Returns the primary <head></head> tag in the document (e.g. the first one)
     * If no head tags exist, one is created and appended to the primary body tag.
     * @returns {object}
     * Returns the <head></head> tag reference.
     */
    ezGetPrimaryHeadTag() {
        let headElement = ezUi.ezFindByElementOrId('head');
        if (ezApi.ezIsNotValid(headElement)) {
            ezApi.ezclocker.logger.warn(
                'The document does not have a <head></head> tag. Creating and appending a new head tag.');
            ezUi.ezPrependContent('body', ezApi.ezTemplate`<head></head>`);
            return ezUi.ezFindElementOrId('head');
        }
        
        return headElement;
    }

    /**
     * @public
     * @param {string} objectName
     * Name of object waiting to become available on the window
     * @param {integer} retryTimeout
     * Number of times to wait 200ms before giving up
     */
    ezWaitWindowObject(objectName, retryTimeout) {
        return ezApi.ezPromise((resolve, reject) => {
            let retryCount = 0;
            let wait = setInterval(() => {
                if (retryCount === retryTimeout && ('undefined' === typeof window.google  || !window[objectName])) {
                    clearInterval(wait);
                    let em = ezApi.ezclocker.ezDialog.ezGenerateErrorMessage(500,
                        ezApi.ezEM`Timed out waiting for object ${objectName}`);
                    ezApi.ezclocker.logger.error(em);
                    return reject(em);
                } else if ('undefined' !== typeof window[objectName]) {
                    clearInterval(wait);
                    return resolve(window[objectName]);
                }
                retryCount++;
            }, 200);
        });
    }
}
EzInjector.ezApiName = 'ezInjector';

export {
    EzInjector
};
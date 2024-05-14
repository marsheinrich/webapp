import { EzBaseJSObject } from '/ezlibrary/EzBaseJSObject.js';

/**
    Configuration class for the EzBasePageController constructor.
 */
class EzPageControllerConfig extends EzBaseJSObject {
    constructor(ezApiName, ezPageId) {
        super();
        if (!ezApiName || 'string' !== typeof ezApiName || 0 == ezApiName.length) {
            throw Error('A valid ezApiName is required to construct a new EzPageControllerConfig.');
        }

        if (!ezPageId || 'string' !== typeof ezPageId || 0 == ezPageId.length) {
            throw Error('A valid ezPageId is required to construct a new EzPageControllerConfig.');
        }

        this.ezAddProperty(
            'ApiName',
            ezApiName);

        this.ezAddProperty(
            'PageId',
            ezPageId,
            () => {
                return this.pageId;
            },
            (aEzPageId) => {
                if (!aEzPageId || 'string' !== typeof aEzPageId || 0 == aEzPageId.length) {
                    throw Error('A valid pageId is required to construct a new EzPageControllerConfig.');
                }
                this.pageId = aEzPageId;
            });

        // ezPageTitle setting
        this.ezAddProperty(
            'PageTitle',
            'ezClocker');

        this.ezAddProperty(
            'InjectDefaultMetaTags',
            true);
        this.addProperty(
            'InjectDefaultLinkTags',
            true);
        this.addProperty(
            'InjectDefaultScriptTags',
            true);
    }
}

export {
    EzPageControllerConfig
};
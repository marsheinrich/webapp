import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

/**
    @public
    Simple class definition due to the sole purpose of
    redirecting to another page.
 */
class EzSignInRedirector {
    static ezInstance = EzSignInRedirector.ezInstance || null;

    static ezRegistrator() {
        EzSignInRedirector.ezInstance = new EzSignInRedirector();
        ezApi.ezclocker.ezNavigation.ezNavigateToPublicPage('/signin');
    }

    static {
        document.addEventListener(
            EzNavigation.ezEventNames.onReady,
            this.ezRegistrator);
    }
}

export {
    EzSignInRedirector
};

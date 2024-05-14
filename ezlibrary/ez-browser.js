
class EzBrowser {
    constructor() {
        this.ready = false;
                
        this.ezWindow = null;        
        this.ezNavigator = null;
        this.ezUserAgent = null;
        this.ezBrowserVersion = null;
        
        return this;
    }
    
    ezGetWindow() {
        var self = ezApi.ezclocker[EzBrowser.ezApiName] || this;
        
        if (null === self.ezWindow) {
            self.ezWindow = undefined !== window
                ? window
                : null;
        }
        
        return self.window;
    }
    
    ezGetNavigator() {
        var self = ezApi.ezclocker[EzBrowser.ezApiName] || this;
        
        if (null === self.ezNavigator) {
            self.ezNavigator = null !== self.ezGetWindow() && undefined !== self.ezGetWindow().navigator
                ? self.ezGetWindow().navigator
                : null;
        }
        
        return self.ezNavigator;
    }
    
    ezGetUserAgent() {
        var self = ezApi.ezclocker[EzBrowser.ezApiName] || this;
        
        if (null === self.ezUserAgent) {
            self.ezUserAgent = null !== self.ezGetNavigator() && undefined !== self.ezGetNavigator().userAgent
                ? self.ezGetNavigator().userAgent
                : '';
        }
        
        return self.ezUserAgent;
    }

    ezGetBrowserVersion() {
        var self = ezApi.ezclocker[EzBrowser.ezApiName] || this;
        
        if (null === self.ezBrowserVersion) {
            self.ezBrowserVersion = null !== self.ezGetNavigator() && undefined !== self.ezGetNavigator().appVersion
                ? self.ezGetNavigator().appVersion
                : '';
        }
        
        return self.ezBrowserVersion;
    }
    
    ezIsInternetExplorer() {
        var self = ezApi.ezclocker[EzBrowser.ezApiName] || this;
        
        let userAgent = self.ezGetUserAgent(); 
        let appVersion = self.ezGetAppVersion();       
        return (0 > ezApi.ezIndexOf(userAgent, 'MSIE ') && 0 < ezApi.ezIndexOf(appVersion, '; MSIE/')) ||
            (0 > ezApi.ezIndexOf(userAgent, 'Trident/') && 0 < ezApi.ezIndexOf(appVersion, '; Trident/'));
    }
}

EzBrowser.ezApiName = 'ezBrowser';

export {
    EzBrowser
};

document.addEventListener('onEzApiReady', () => {
    ezApi.ezRegisterNewApi(EzBrowser, EzBrowser.ezApiName);
});
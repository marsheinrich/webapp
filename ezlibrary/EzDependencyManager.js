let ezEnvironment = 'prd';

switch (globalThis.window.document.location.hostname) {
    case 'localhost':
        ezEnvironment = 'loc';
        break;
    case 'dev.ezclocker.com':
        ezEnvironment = 'dev';
        break;
    case 'qal.ezclocker.com':
        ezEnvironment = 'qal';
        break;
    case 'e2e.ezclocker.com':
        ezEnvironment = 'e2e';
        break;
    case 'prf.ezclocker.com':
        ezEnvironment = 'prf';
        break;
}

let ezStaticResourcesBaseUrl = 'prd' !== ezEnvironment
    ? `https://website.dev.ezclocker.com/${ezEnvironment.toLowerCase()}`
    : `https://website.prd.ezclocker.com/${ezEnvironment.toLowerCase()}`;

let forceReloadPage = function(localStoreKey) {
    let reloadCount = globalThis.window.localStorage.getItem(localStoreKey);

    if (reloadCount && 2 <= reloadCount) {
        globalThis.console.error(`Reloading due to script or link failure for id=${localStoreKey}`);
        reloadCount++;
        globalThis.window.localStorage.setItem(localStoreKey, reloadCount);
        globalThis.window.document.location.reload();
    } else {
        globalThis.console.error(`Reloading due to script or link failure limit reached for id=${localStoreKey}`);
        globalThis.window.localStorage.removeItem(localStoreKey);
    }
}

let failedScriptReloader = function(url, isStatic) {
    let localStoreKey = `EzScriptReload:${url}`;

    if (isStatic) {
        let script = document.createElement('script');

        script.src = `${ezStaticResourcesBaseUrl}${url}`;
        script.onError = function () {
            forceReloadPage(localStoreKey);
        };
        script.onload = function () {
            forceReloadPage(localStoreKey);
        };
        script.async = true;

        globalThis.window.document.head.appendChild(script);
    } else {
        forceReloadPage(localStoreKey);
    }
};

let failedLinkReloader = function(url, isStatic) {
    let localStoreKey = `EzLinkReload:${url}`;

    if (isStatic) {
        let link = document.createElement('link');

        link.src = `${ezStaticResourcesBaseUrl}${url}`;
        link.rel="stylesheet";
        link.type="text/css";
        link.async = true;
        link.onError = function () {
            forceReloadPage(localStoreKey);
        };
        link.onload = function () {
            forceReloadPage(localStoreKey);
        };
        link.async = false;

        globalThis.window.document.head.appendChild(link);
    } else {
        forceReloadPage(localStoreKey);
    }
};

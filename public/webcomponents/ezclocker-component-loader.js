/**
 * Provides the ability to load HTML partials as web component HTML pieces
 * and insert them into parent nodes.
 */
class EzWebComp {
    constructor() {
        this.ready = false;
    }

    ezInit() {
        var self = ezApi.ezclocker[EzWebComp.ezApiName];

        self.ready = true;
        return self;
    }

    getWrapperDiv(compId, contents) {
        return `<div id="${compId}">${contents}</div>`;
    }

    /**
     * @public
     * Injects a webcomponent HTML at url into the provided parentId param setting the div wrapper's id to compId.
     *
     * @param {String} parentId
     * @param {String} compId
     * @param {url} String
     *
     * @returns {Promise}
     */
    inject(parentId, compId, url) {
        if (!ezApi.ezStringHasLength(parentId)) {
            throw ezApi.ezBadParam('parentId', 'EzWebComp', 'inject');
        }

        return ezApi.ezPromise(function(resolve, reject) {
            return ezApi.ezclocker.http.ezGetWebComponent(url).then(
                function(response) {
                    var contents = ezWebComp.getWrapperDiv(compId, response);
                    ezUi.ezContent(parentId, contents);
                    return resolve(true);
                },
                function(eResponse) {
                    ezApi.ezclocker.logger.error(
                        `Failed to inject the webcomponent at url ${url}. Error: ${ezApi.ezToJson(eResponse)}`);
                    return reject(eResponse);
                });
        });
    }

    insert(parentId, compId, url) {
        var self = ezApi.ezclocker[EzWebComp.ezApiName];

        return ezApi.ezPromise(function(resolve, reject) {
            self.waitForNodeWithTimeout(parentId, function(element) {
                if (ezApi.ezIsNotValid(element)) {
                    ezApi.ezclocker.logger.error(ezApi.ezTemplate`
                        Unable to insert component ${compId} into parent element with id ${parentId}.
                        The parent element does not exist.`);
                    return reject();
                }

                return self.loadFileFromPath(compId, url).then(function(contents) {
                    ezUi.ezAppendContent(parentId, contents);
                    return resolve();
                }, reject);
            });
        });
    }

    append(parentId, compId, path) {
        var self = ezApi.ezclocker[EzWebComp.ezApiName];

        return ezApi.ezPromise(function(resolve, reject) {
            return self.loadFileFromPath(compId, path).then(function(contents) {
                ezUi.ezAppendContent(parentId, contents);
                return resolve();
            }, reject);
        });
    }

    appendAfter(afterId, compId, path) {
        var self = ezApi.ezclocker[EzWebComp.ezApiName];

        return ezApi.ezPromise(function(resolve, reject) {
            self.waitForNodeWithTimeout(afterId, function(element) {
                if (ezApi.ezIsNotValid(element)) {
                    ezApi.ezclocker.logger.error(ezApi.ezTemplate`
                        Unable to append component ${compId} after sibling with id=${afterId}.
                        The sibling element does not exist.`);
                    return reject();
                }

                return self.loadFileFromPath(compId, path).then(function(contents) {
                    element.after(contents);
                    return resolve();
                }, reject);
            });
        });
    }

    waitForNodeWithTimeout(elementId, callback) {
        if (!ezApi.ezStringHasLength(nodeId)) {
            throw ezApi.ezBadParam('elementId', 'EzWebComp', 'waitForNodeWithTimeout');
        }

        // Wait for parent to be reachable
        var waiting = 0;
        var waitParent = setInterval(function() {
            var element = ezUi.ezFindByElementOrId(elementId);
            if (ezApi.ezIsValid(element)) {
                clearInterval(waitParent);
                if (callback) {
                    ezApi.ezCallback(element);
                }
            }

            if (3000 === waiting) {
                clearInterval(waitParent);
                ezApi.ezclocker.logger.error(`Timed out waiting for node with id ${nodeId} to become available.`);
                if (callback) {
                    ezApi.ezCallback(null);
                }
            }
            waiting += 50;
        }, 250);
    }

    loadFileFromPath(wrapperId, path) {
        return ezApi.ezPromise(function(resolve, reject) {
            return ezApi.ezclocker.http.ezGetWebComponent(path).then(
                function(response) {
                    resolve(ezWebComp.getWrapperDiv(wrapperId, response));
                },
                function(eResponse) {
                    ezApi.ezclocker.logger.error(
                        `Failed to load partial from '${path}'. Error: ${ezApi.ezToJson(eResponse)}`);
                    reject(eResponse);
                });
        });
    }
};

EzWebComp.ezApiName = 'ezWebComp';

/**
 * ezApi registration
 */
document.addEventListener('onEzApiReady', function() {
    ezApi.ezRegisterNewApi(EzWebComp, EzWebComp.ezApiName);
});

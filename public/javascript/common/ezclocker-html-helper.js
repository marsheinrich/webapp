import { EzClass } from '/ezlibrary/EzClass.js';

import { EzHttpHelper } from '/public/javascript/common/ezclocker-http-helper.js';

/**
    Provides wrappers for DOM manipulation
    Import with:
        import { EzHtmlHelper } from '/public/javascript/common/ezclocker-html-helper.js';

        globalThis.ezApi.ezclocker[EzHtmlHelper.ezApiName] &&
        globalThis.ezApi.ezclocker[EzHtmlHelper.ezApiName].ready &&

        document.addEventListener(
            EzHtmlHelper.ezEventNames.onReady,
            this.#ezRegistrator);
 */
export class EzHtmlHelper extends EzClass {
    /**
     * @static
     * @public @readonly @property
     * Gets the ezClocker website and services default domain (for production)
     * @returns {string}
     */
    static get EZCLOCKER_DEFAULT_DOMAIN() {
        return 'ezclocker.com';
    }

    /**
     * @public @readonly @property
     * Returns the current ezClocker website and services domain
     * Template: EzString.stringOrDefault(globalThis?.window?.location?.origin, `https://${EzHtmlHelper.EZCLOCKER_DEFAULT_DOMAIN}`)
     * @returns {string}
     */
    get domain() {
        return EzString.stringOrDefault(
            globalThis?.window?.location?.origin,
            `https://${EzHtmlHelper.EZCLOCKER_DEFAULT_DOMAIN}`)
    }

    /**
     * @public @readonly @property
     * Returns the current URI path
     * Template: globalThis?.window?.location?.pathname
     * @returns {string}
     */
    get currentPath() {
        return EzString.stringOrEmpty(globalThis?.window?.location?.pathname);
    }

    /**
     * @public @readonly @property
     * Returns the current URI path as an array
     * Template: EzArray.arrayOrEmpty(globalThis?.window?.location?.pathname?.split('/')
     * @returns {array}
     */
    get pathItems() {
        return EzArray.arrayOrEmpty(this.currentPath?.split('/'));
    }

    /**
     * @public @readonly @property
     * Gets the current ezClocker website and services base url and path
     * Template without additional paths: `${window.location.origin}/`
     * Template with additional paths: `${this.domain}/${window.location.pathname.split('/')[1]}/`
     * @returns {string}
     */
    get baseUrl() {
        return 2 <= this.pathItems.length && 'ezclocker' === this.pathItems[1].toLowerCase()
            ? `${this.domain}/${ezApi.ezclocker.ezHtmlHelper.pathItems[1]}/`
            : `${this.domain}`;
    }

    /**
     * @public @method
     * Initializes the EzHtmlHelper
     * @returns {EzHtmlHelper}
     */
    ezInit() {
        return EzHtmlHelper.ezInstance;
    }

    em(eCode, eMessage) {
        return {
            error: eCode,
            message: eMessage
        };
    }

    head() {
        let head = document.getElementsByTagName('head')[0];
        return head;
    }

    injectLinkHeadBottom(cssFile, id) {
        let cssLink = ezApi.ezclocker.ezHtmlHelper.createScriptTag(cssFile, id);
        return this.appendTag(ezApi.ezclocker.ezHtmlHelper.head(), cssLink);
    }

    injectLinkHeadTop(cssFile, id) {
        let cssLink = this.createCssLinkTag(cssFile, id);
        return ezApi.p.ezImport.head().headInsertTagBefore(cssLink, ezApi.ezclocker.ezHtmlHelper.head().firstChild);
    }

    injectScriptHeadTop(jsFile, id) {
        let script = this.createScriptTag(jsFile, id);
        return ezApi.p.ezImport.head().headInsertTagBefore(script, ezApi.ezclocker.ezHtmlHelper.head().firstChild);
    }

    injectScriptHeadBottom(jsFile, id) {
        let script = this.createScriptTag(jsFile, id);
        return this.appendTag(ezApi.ezclocker.ezHtmlHelper.head(), script);
    }

    createTag(tagName, id) {
        let tag = document.createElement(tagName);
        if (id) {
            tag.id = id;
        }
        return tag;
    }

    createCssLinkTag(cssFile, id) {
        let cssLink = this.createTag('link', id);
        if (cssFile) {
            cssLink.href = cssFile;
        }
        return cssLink;
    }

    createScriptTag(jsFile, id) {
        let script = this.createTag('script', id);
        if (jsFile) {
            script.src = jsFile;
        }
        return script;
    }

    appendTag(parentTag, tag) {
        let _this = this;
        return new Promise(function(resolve, reject) {
            let err;
            try {
                if (!parentTag) {
                    err = _this.em(500,
                        'Parent tag is required. Parent tag is " +  parentTag + ",');
                    ezApi.p.logger.error(err);
                    return reject(err);
                }
                if (!tag) {
                    err = _this.em(500, 'Unable to insert tag: tag is ' + tag + '.');
                    ezApi.p.logger.error(err);
                    return reject(err);
                }
                _this.resolveOnLoad(tag, resolve);
                parentTag.appendChild(tag);
                resolve();
            } catch (ezEx) {
                err = _this.em(500, ezEx);
                ezApi.p.logger.error(err);
                reject(err);
            }
        });
    }

    insertTagTop(parentTag, tag) {
        let _this = this;
        return new Promise(function(resolve, reject) {
            let err;
            try {
                if (!parentTag) {
                    err = _this.em(500, 'Parent tag is required. Parent tag is ' + parentTag + '.');
                    ezApi.p.logger.error(err);
                    return reject(err);
                }
                if (!tag) {
                    err = _this.em(500, 'Unable to insert tag: tag is ' + tag + '.');
                    ezApi.p.logger.error(err);
                    return reject(err);
                }
                _this._resolveOnLoad(tag, resolve);
                if (!parentTag.firstChild) {
                    parentTag.appendChild(tag);
                    return;
                }
                parentTag.insertBefore(tag, parentTag.firstChild);
                resolve();
            } catch (ezEx) {
                err = _this.em(500, ezEx);
                ezApi.p.logger.error(err);
                reject(err);
            }
        });
    }

    insertTagBeforeSibling(parentTag, tag, siblingTag) {
        let _this = this;
        return new Promise(function(resolve, reject) {
            let em;
            try {
                if (!parentTag) {
                    em = _this.em(500, 'Parent tag is required. Parent tag is ' + parentTag + '.');
                    ezApi.p.logger.error(em);
                    return reject(em);
                }
                if (!tag) {
                    em = _this.em(500, 'Unable to insert tag: tag is ' + tag + '.');
                    ezApi.p.logger.error(em);
                    return reject(em);
                }
                if (!siblingTag) {
                    em = _this.em(500, 'Unable to insert tag before siblingtag. Sibling tag is ' +
                        siblingTag + '.');
                    ezApi.p.logger.error(em);
                    return reject(em);
                }
                _this._resolveOnLoad(tag, resolve);
                parentTag.insertBefore(tag, siblingTag);
                resolve();
            } catch (ezEx) {
                em = _this.em(500, ezEx);
                ezApi.p.logger.error(em);
                reject(em);
            }
        });
    }

    resolveOnLoad(tag, resolve) {
        if (!tag) {
            if (resolve) {
                return resolve();
            }
            return;
        }

        if (tag.readyState) { //IE
            tag.onreadystatechange = (event) => {
                if (event.readyState === 'loaded' || event.readyState === 'complete') {
                    event.onreadystatechange = null;
                    if (resolve) {
                        resolve(event);
                    }
                }
            };
        } else {
            tag.onload = (event) => {
                tag.readyState = 'loaded';
                if (resolve) {
                    resolve(event);
                }
            };
        }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Class Initialization and EzApi Registration Section
    // !! DO NOT PLACE ANY non-initialization fields, getter/setter methods, static methods, or class methods beyond this section !!
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    /**
     * @static
     * @public @readonly @property
     * Gets the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezHtmlHelper';
    }

    /**
     * @static
     * @public @readonly @property
     * Gets an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzHtmlHelper_Ready'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzHtmlHelper}
     */
    static #ezInstance = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzHtmlHelper.ezApiName]
        ? globalThis.ezApi.ezclocker[EzHtmlHelper.ezApiName]
        : null;
    /**
     * @static
     * @public @property @getter
     * Gets the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzHtmlHelper}
     */
    static get ezInstance() {
        return EzHtmlHelper.#ezInstance;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzHtmlHelper} instance
     */
    static set ezInstance(instance) {
        if (null != EzHtmlHelper.#ezInstance) {
            throw new Error('EzHtmlHelper\'s singleton instance is already reigstered with EzApi.');
        }

        EzHtmlHelper.#ezInstance = instance;
    }

    /**
     * @static
     * @private @field
     * Stores the EzApi registration state for this class.
     * Default value is NULL
     * Class is registerd with EzApi when value is EzRegistrationState.REGISTERED
     * @type {string}
     * A valid enum property value from EzRegistrationState
     */
    static #ezApiRegistrationState = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzHtmlHelper.ezApiName]
        ? EzRegistrationState.REGISTERED
        : null;
    /**
     * @static
     * @public @property @getter
     * Gets the ezApi registration state of this classes's singleton instance.
     * @returns {string}
     * A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzHtmlHelper.#ezApiRegistrationState;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzHtmlHelper.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @static
     * @private @readonly @property
     * Gets true when all required dependencies for this class report ready.
     * In otherwords, the require dependency's singleton instance is created
     * and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        return EzRegistrationState.PENDING === EzHtmlHelper?.ezApiRegistrationState &&
            globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker &&
            globalThis.ezApi.ezclocker?.[EzHttpHelper.ezApiName]?.ready;
    }

    /**
     * @static
     * @private @readonly @property
     * Gets if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}
     */
    static get #ezIsRegistered() {
        return null != EzHtmlHelper.ezInstance &&
            EzRegistrationState.REGISTERED === EzHtmlHelper.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzHtmlHelper.#ezCanRegister && !EzHtmlHelper.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzHtmlHelper, EzHtmlHelper.ezApiName);
        }

        return EzHtmlHelper.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzHtmlHelper.ezApiName
     *     2) Property getter EzHtmlHelper.ezEventNames
     *     3) Property getter EzHtmlHelper.ezInstance
     *     4) Property setter EzHtmlHelper.ezInstance
     *     5) Property getter EzHtmlHelper.ezApiRegistrationState
     *     6) Property setter EzHtmlHelper.ezApiRegistrationState
     *     7) Property getter EzHtmlHelper.#ezCanRegister
     *     8) Property getter EzHtmlHelper.#ezIsRegistered
     *     9) Method EzHtmlHelper.#ezRegistrator()
     */
    static {
        if (null == EzHtmlHelper.ezApiRegistrationState) {
            EzHtmlHelper.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzHtmlHelper.#ezRegistrator()) {
                document.addEventListener(
                    EzHtmlHelper.ezOnEzApiReadyEventName,
                    EzHtmlHelper.#ezRegistrator);

                document.addEventListener(
                    EzHttpHelper.ezEventNames.onReady,
                    EzHtmlHelper.#ezRegistrator);
            }
        }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // !! DO NOT PLACE ANY non-initialization fields, getter/setter methods, static methods, or class methods beyond above section !!
    // NO CODE AFTER THIS SECTION
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

}
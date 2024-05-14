/* exported EzFaceBook */
/**
 * @public
 * Creates a new instance of EzFaceBook
 *
 * @returns {EzFacebook}
 */
class EzFacebook {
    constructor(facebookId, facebookTrackId) {
        this.ready = false;
        this.DEFAULT_FACEBOOK_ID = '1349294525090409';
        this.DEFAULT_FACEBOOK_TRACK_ID = 'PageView';

        this.ezFacebookId = ezApi.ezIsEmptyString(facebookId)
            ? this.DEFAULT_FACEBOOK_ID
            : facebookId;
        this.ezFacebookTrackId = ezApi.ezIsEmptyString(facebookTrackId)
            ? this.DEFAULT_FACEBOOK_TRACK_ID
            : facebookTrackId;

        return this;
    }

    /**
     * @protected
     * Initializes EzFacebook
     *
     * @returns {EzFacebook}
     */
    ezInit() {
        let self = ezApi.ezclocker.ezFacebook;
        self.ready = true;

        self.ezInjectFacebookPixel();
    }

    /**
     * @public
     * Injects the facebook pixel into the document body. Removes any existing pixl previously injected first.
     */
    ezInjectFacebookPixel() {
        let self = ezApi.ezclocker.ezFacebook;

        if (ezUi.ezElementExists('EzFaceBookPixelScript')) {
            ezUi.ezRemove('EzFaceBookPixelScript');
        }
        if (ezUi.ezElementExists('EzFaceBookPixelNoScript')) {
            ezUi.ezRemove('EzFaceBookPixelNoScript');
        }

        ezUi.ezAppendContent('body', self.ezBuildFacebookPixelScript());
        ezUi.ezAppendContent('body', self.ezBuildFacebookPixelNoScript());
    }

    /**
     * @private
     * Builds the facebook pixel script element to insert into the document.
     *
     * @returns {string}
     */
    ezBuildFacebookPixelScript() {
        let self = ezApi.ezclocker.ezFacebook;

        return '<script id="EzFaceBookPixelScript">/* globals fbq */!function (f, b, e, v, n, t, s) {if (f.fbq) {return;' +
            '}n = f.fbq = function () {n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };' +
            'if (!f._fbq) { f._fbq = n; } n.push = n; n.loaded = !0; n.version = \'2.0\'; n.queue = []; ' +
            't = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; ' +
            's.parentNode.insertBefore(t, s); } ' +
            '(window, document, \'script\', \'https://connect.facebook.net/en_US/fbevents.js\'); ' +
            'fbq(\'init\', \'' + self.ezGetFacebookId() + '\'); fbq(\'track\', \'' + self.ezGetFacebookTrackId() + '\');' +
            '</script>';
    }

    /**
     * @private
     * Builds the facebook noscript element to place into the document.
     *
     * @returns {string}
     */
    ezBuildFacebookPixelNoScript() {
        let self = ezApi.ezclocker.ezFacebook;

        return '<noscript id="EzFaceBookPixelNoScript"><img height="1" width="1" src="https://www.facebook.com/tr?id=' +
            self.ezGetFacebookId() + '&ev=' + self.ezGetFacebookTrackId() + '&noscript=1" alt="." /></noscript>';
    }

    /**
     * @public
     * Sets the facebook id to use in the pixel.
     *
     * @param {string} facebookId
     */
    ezSetFacebookId(facebookId) {
        let self = ezApi.ezclocker.ezFacebook;

        self.ezFacebookId = ezApi.ezIsEmptyString(facebookId)
            ? self.DEFAULT_FACEBOOK_ID
            : facebookId;
    }

    /**
     * @public
     * Gets the facebook id to use in the pixel.
     *
     * @returns {string}
     */
    ezGetFacebookId() {
        let self = ezApi.ezclocker.ezFacebook;

        return ezApi.ezIsEmptyString(self.ezFacebookId)
            ? self.DEFAULT_FACEBOOK_ID
            : self.ezFacebookId;
    }

    /**
     * @public
     * Sets the facebook track id to use in the pixel
     *
     * @param {string} facebookTrackId
     */
    ezSetFacebookTrackId(facebookTrackId) {
        let self = ezApi.ezclocker.ezFacebook;

        self.ezFacebookTrackId = ezApi.ezIsEmptyString(facebookTrackId)
            ? self.DEFAULT_FACEBOOK_TRACK_ID
            : facebookTrackId;
    }

    ezGetFacebookTrackId() {
        let self = ezApi.ezclocker.ezFacebook;

        return ezApi.ezIsEmptyString(self.ezFacebookTrackId)
            ? self.DEFAULT_FACEBOOK_TRACK_ID
            : self.ezFacebookTrackId;
    }
}
EzFacebook.ezApiName = 'ezFacebook';
EzFacebook.ezAutowired = EzFacebook.ezAutowired ||
    document.addEventListener('onEzApiReady', () => ezApi.ezRegisterNewApi(EzFacebook, EzFacebook.ezApiName));

export {
    EzFacebook
};
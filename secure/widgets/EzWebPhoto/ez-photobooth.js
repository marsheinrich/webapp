/**
 * Required Dependencies
 *
 * <script src="/node_modules/bluebird/js/browser/bluebird.min.js" id="_EzPromisePollyfill"></script>
 * <script src="/public/javascript/common/ezapi.js" id="_EzPromisePollyfill"></script>
 * <script src="/secure/widgets/ez-photobooth.js"></script>
 *
 * Adapted From
 * https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Taking_still_photos
 * https://github.com/mdn/samples-server/blob/master/s/webrtc-capturestill/capture.js
 */

/**
 * @public
 * EzPhotoBooth Widget Controller. Will use a default configuration if none is provided.
 * @param {string|null} idTouse
 * @param {string|null} titleToUse
 * @param {object|null} configurationToUse
 */
function EzPhotoBooth(idToUse, titleToUse, configurationToUse) {
    this.ready = false;
    this.visible = false;

    this.widgetTitle = ezApi.isNotEmptyString(titleToUse) ? titleToUse : 'ezClocker Photo Booth';
    this.widgetId = ezApi.isNotEmptyString(idToUse) ? idToUse : '_EzPhotoBooth';
    this.widgetEventNames = {
        onShow: 'ezOn' + this.widgetId + 'ShowEvent',
        onClose: 'ezOn' + this.widgetId + 'CloseEvent',
        onSubmitSuccess: 'ezOn' + this.widgetId + 'SubmitSuccessEvent',
        onSubmitFailure: 'ezOn' + this.widgetId + 'SubmitFailureEvent'
    };

    // Set the default configuration if a configuration is not provided.
    this.configuration = ezApi.isValid(configurationToUse) ? configurationToUse : {
        // Live Viewer Configuration
        liveViewer: {
            containerId: this.widgetId + 'LiveViewerContainer',
            liveVideoId: this.widgetId + 'LiveViewerVideoStream',
            webCanvasId: this.widgetId + 'LivewViewerWebCanvas',
            captureSnapshotButtonId: this.widgetId + 'LiveViewerCaptureSnapshotButton',
            // Indicates whether or not there is currently an active stream of video running.
            videoStreamActive: false,
            // Reference to the live viewer's <video> HTML element
            videoStream: null,
            // Reference to the live viewer's capture snapshot action <button> HTML element
            catpureSnapshotButton: null,
            // Reference to the live viewer's web <canvas> HTML element
            webCanvas: null
        },
        // Snapshot Preview Configuration
        snapshotPreviewer: {
            containerId: this.widgetId + 'SnapshotPreviewContainer',
            previewImageId: this.widgetId + 'SnapshotPreviewImage',
            // Height of the snapshot image (later computed given the width and the aspect ratio of the stream)
            snapshotHeight: 0,
            // Width the snapshot image is scalled to (from the live video image size)
            snapshotWidth: 320,
            // Reference to the snapshot preview <img> HTML element
            previewImage: null
        }
    };

    return this;
}

/**
 * @public
 * Initializes EzPhotoBooth
 * @param {EzPhotoBooth|null} self
 */
EzPhotoBooth.prototype.ezInit = function(self) {
    self = ezApi.ezSelf('EzPhotoBooth', self);

    self.ezInitNavigatorMedia(self);

    self.ezInitUx(self).then(function(_self) {
        _self.ezInitNavigatorMedia(_self);
        _self.ready = true;
    }, function(_self) {
        ezApi.p.logger.error('Failed to properly initializes EzPhotoBoth widget.');
        _self.ready = false;
    });

    return self;
};

/**
 * @protected
 * Obtains the navigater and points the getMedia function to the proper navigator media function
 * for the browser.
 * @param {EzPhotoBooth|null} self
 */
EzPhotoBooth.prototype.ezInitNavigatorMedia = function(self) {
    self = ezApi.ezSelf('EzPhotoBooth', self);

    if (ezApi.isNotValid(navigator)) {
        ezApi.p.logger.error('Browser does not provide the navigator object.');
        return;
    }

    // Obtain the reference to the navigator and setup the getMedia button
    // for the specific browser.
    self.getMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

    return self;
};

/**
 * @protected
 * Obtains references to the live viewer and snapshot previewer UX
 * @param {EzPhotoBooth|null} self
 */
EzPhotoBooth.prototype.ezInitUx = function(self) {
    self = ezApi.ezSelf('EzPhotoBooth', self);

    return ezApi.ezPromise(function(resolve, reject) {
        self.ezCacheUx(self).then(function(_self) {
            _self.ezInjectUx(_self).then(function(__self) {
                // Obtain references to the Live View HTML elements
                __self.configurations.liveViewer.videoStream =
                    document.getElementById(self.configuration.liveViewer.liveVideoId);
                __self.configurations.liveViewer.webCanvas =
                    document.getElementById(self.configuration.liveViewer.webCanvasId);
                __self.configurations.liveViewer.catpureSnapshotButton =
                    document.getElementById(self.configuration.liveViewer.captureSnapshotButtonId);
                __self.configurations.liveViewer.catpureSnapshotButton.addEventListener(
                    'click', __self.ezHandleCaptureSnapshotClick, false);

                // Obtain references to the snapshot previewer HTML elements
                __self.configuration.snapshotPreviewer.previewImage =
                    document.getElementById(__self.configuration.snapshotPreviewer.previewImageId);

                ezApi.p.ezDialog.ezInitDialog(__self.configuration.widgetId, [
                    {
                        text: 'Cancel',
                        id: __self.ezDialogId + '_Cancel',
                        click: __self.ezClose
                    },
                    {
                        text: 'OK',
                        id: __self.ezDialogId + '_Copy',
                        click: __self.ezSubmit
                    }
                ], {
                    title: __self.configuration.widgetTitle
                });

                return resolve();
            }, reject);
        }, reject);
    });
};

/**
 * @protected
 * Retrives the HTML that represents the EzPhotoBooth UX
 * @param {EzPhotoBooth|null} self
 */
EzPhotoBooth.prototype.ezCacheUx = function(self) {
    self = ezApi.ezSelf('EzPhotoBooth', self);

    return ezApi.ezPromise(function(resolve, reject) {
        self.uxTemplate = null;
        var url = ezApi.p.nav.getSecurePageUrl('widgets/EzWebPhoto/ez-photobooth-view.html');
        ezApi.p.http.get(url).then(
            function(response) {
                self.uxTemplate = response;
                return resolve(self);
            },
            function() {
                ezApi.p.logger.error('Failed to obtain the EzPhotoBooth UX template from ' + url);
                return reject(self);
            });
    });
};

/**
 * @protected
 * Injects the EzPhotoBoth HTML UX into the main document
 * @param {EzPhotoBooth|null} self
 */
EzPhotoBooth.prototype.ezInjectUx = function(self) {
    self = ezApi.ezSelf('EzPhotoBooth', self);

    ezUi.ezAppendHtml$('body',
        '<div style="display:none" id="' + self.widgetId + 'InjectedUX">' +
        '   <div id="' + self.widgetId + '">' +
        '       <div id="' + self.widgetId + 'LiveViewerContainer">' +
        '           <div>' +
        '               <video id="' + self.widgetId +
        '                   LiveViewerVideoStream">Video stream not available.</video>' +
        '               <canvas id="' + self.widgetId + 'LivewViewerWebCanvas"></canvas>' +
        '           </div>' +
        '           <div>' +
        '               <button id="' + self.widgetId + 'LiveViewerCaptureSnapshotButton">' +
        '                   Capture Snapshot' +
        '               </button>' +
        '           </div>' +
        '       </div>' +
        '       <div id="' + self.widgetId + 'SnapshotPreviewContainer">' +
        '           <img id="' + self.widgetId + 'SnapshotPreviewImage"/>' +
        '       </div>' +
        '   </div>' +
        '</div>');

    return ezApi.ezResolve(self);
};

/**
 * @public
 * Shows the EzPhotoBooth dialog
 * @param {long} employerId
 * @param {long|null} employeeId
 */
EzPhotoBooth.prototype.ezShow = function(employerId, employeeId) {
    var self = ezApi.ezSelf('EzPhotoBooth');
    if (self.visible) {
        ezApi.p.logger.warn('EzPhotoBooth dialog is already visible. Ignoring show request.');
        return;
    }

    if (ezApi.isNotValid(employerId)) {
        ezApi.p.logger.error('EzPhotoBoth requires the employer id.');
        return;
    }

    // Store the dialog context before showing
    self.context = {
        'employerId': employerId,
        'employeeId': employeeId,
    };

    self.visible = ezApi.p.ezDialog.ezShowDialogById(self.widgetId, self.widgetventNames.onShow);
};

/**
 * @public
 * Closes the EzPhotoBooth dialog
 */
EzPhotoBooth.prototype.ezClose = function() {
    var self = ezApi.ezSelf('EzPhotoBooth');
    self.visible = ezApi.p.ezDialog.ezCloseDialogById(self.widgetId, self.widgetventNames.onClose);
};

/**
 * @public
 * Submits the snapshot photo as the photo for the entity identified by EzPhotoBooth.context values.
 */
EzPhotoBooth.prototype.ezSubmit = function() {
    var self = ezApi.ezSelf('EzPhotoBooth');

    //TODO: Obtain the snapshot image

    ezUi.ezStartPageWait('Uploading photo...');
    //TODO: Upload image via API
    let url = ezApi.isValid(self.context.employeeId) ?
        ezApi.p.nav.getInternalApiUrl('photos/' + self.context.employerId, 'v1') :
        ezApi.p.nav.getInternalApiUrl('photos/' + self.context.employerId + '/employee/' + self.context.employeeId,
            'v1');
    ezApi.p.http.post(url);
    ezUi.ezStopPageWait();
};

/**
 * @public
 * Obtains the live video stream
 */
EzPhotoBooth.prototype.ezGetLiveVideoStream = function() {
    var self = ezApi.ezSelf('EzPhotoBooth');

    return ezApi.ezPromise(function(resolve, reject) {
        if (ezApi.isNotValid(self.getMedia)) {
            var em =
                'Cannot obtain the live video stream. Navigator getMedia() is not properly setup for this browser.';
            ezApi.p.logger.error(em);
            reject({
                errorCode: 500,
                message: em
            });
        }
        self.getMedia({
            video: true,
            audio: false
        },
        function(liveVideoStream) {
            if (navigator.mozGetUserMedia) {
                self.liveViewer.videoStream.mozSrcObject = liveVideoStream;
            } else {
                var vendorURL = window.URL || window.webkitURL;
                self.liveViewer.videoStream.src = vendorURL.createObjectURL(liveVideoStream);
            }
            self.liveViewer.videoStream.addEventListener(
                'canplay', self.ezHandleCanPlayEvent, false);
            resolve({
                errorCode: 0,
                message: 'Live video stream is now available.',
                liveVideoStream: self.liveViewer.videoStream
            });
        },
        function(eMessage) {
            ezApi.p.logger.error(
                'Failed to obtain the EzPhotoBooth live video stream. Error: ' +
                    ezApi.ezToJson(eMessage));
            reject({
                errorCode: 500,
                message: ezApi.ezToJson(eMessage)
            });
        });
    });
};

/**
 * @public
 * Plays the live video stream, if available
 */
EzPhotoBooth.prototype.ezPlayLiveVideoStream = function() {
    var self = ezApi.ezSelf('EzPhotoBooth');

    if (!ezApi.allValid(self.liveViewer, self.liveViewer.videoStream)) {
        ezApi.p.logger.error('EzPhotoBooth live viewer is not setup properly.');
        return;
    }

    self.liveViewer.videoStream.play();
};

/**
 * @protected
 * Handles the capture snapshot button's click event
 * @param {object} event
 */
EzPhotoBooth.prototype.ezHandleCaptureSnapshotClick = function(event) {
    var self = ezApi.ezSelf('EzPhotoBooth');
    self.ezCreateSnapshot();
    event.preventDefault();
};

/**
 * @protected
 * Handles the live video stream's canplan event.
 */
EzPhotoBooth.prototype.ezHandleCanPlayEvent = function() {
    var self = ezApi.ezSelf('EzPhotoBooth');
    if (!ezApi.allValid(self.liveViewer, self.configuration.snapshotPreviewer)) {
        ezApi.p.logger.error('EzPhotoBooth live viewer and snapshot previewer is not setup properly.');
        return;
    }

    if (!self.configuration.liveViewer.videoStreamActive) {
        self.configuration.snapshotPreviewer.snapshotHeight =
            self.liveViewer.videoStream.videoHeight /
            (self.liveViewer.videoStream.videoWidth / self.configuration.snapshotPreviewer.snapshotWidth);

        // Firefox currently has a bug where the height can't be read from
        // the video, so we will make assumptions if this happens.
        if (isNaN(self.configuration.snapshotPreviewer.snapshotHeight)) {
            self.configuration.snapshotPreviewer.snapshotHeight =
                self.configuration.snapshotPreviewer.snapshotWidth / (4 / 3);
        }

        self.liveViewer.videoStream.setAttribute('width', self.configuration.snapshotPreviewer.snapshotWidth);
        self.liveViewer.videoStream.setAttribute('height', self.configuration.snapshotPreviewer.snapshotHeight);
        self.liveViewer.webCanvas.setAttribute('width', self.configuration.snapshotPreviewer.snapshotWidth);
        self.liveViewer.webCanvas.setAttribute('height', self.configuration.snapshotPreviewer.snapshotHeight);
        self.liveViewer.videoStreamActive = true;
    }
};

/**
 * @public
 * Clears the snapshot preview image
 */
EzPhotoBooth.prototype.ezClearSnapshotPreview = function() {
    var self = ezApi.ezSelf('EzPhotoBooth');

    if (!ezApi.allValid(self.configuration, self.configuration.liveViewer, self.configuration.liverViewer.webCanvas,
        self.configuration.liverViewer.webCanvas.width, self.configuration.liverViewer.webCanvas.height
    )) {
        ezApi.p.logger.error('EzPhotoBooth live vieweris not properly setup.');
        return;
    }

    var webCanvas2DContext = self.configuration.liveViewer.webCanvas.getContext('2d');
    if (ezApi.isNotValid(webCanvas2DContext)) {
        ezApi.p.logger.error('EzPhotoBooth is unable to obtain the 2D context from the web canvas.');
        return;
    }

    webCanvas2DContext.fillStyle = '#AAA';
    webCanvas2DContext.fillRect(0, 0, self.configuration.liveViewer.webCanvas.width,
        self.configuration.liveViewer.webCanvas.height);

    self.configuration.snapshotPreviewer.previewImage.setAttribute('src',
        self.configuration.liveViewer.webCanvas.toDataURL('image/png'));
};

/**
 * @public
 * Creates the photo snapshot from the live video stream.
 */
EzPhotoBooth.prototype.ezCreateSnapshot = function() {
    var self = ezApi.ezSelf('EzPhotoBooth');
    if (!ezApi.allValid(self.configuration, self.configuration.liveViewer, self.configuration.liverViewer.webCanvas,
        self.configuration.liverViewer.webCanvas.width, self.configuration.liverViewer.webCanvas.height,
        self.configuration.liverViewer.videoStream, self.configuration.snapshotPreviewer,
        self.configuration.snapshotPreviewer.snapshotHeight, self.configuration.snapshotPreviewer.snapshotWidth,
        self.configuration.snapshotPreviewer.previewImage)) {
        ezApi.p.logger.error('EzPhotoBooth snap shot previewer and live viewer is not properly setup.');
        self.ezClearSnapshotPreview();
        return;
    }

    if (ezApi.ezIsFalse(self.configuration.liverViewer.videoStreamActive)) {
        ezApi.p.logger.error(
            'EzPhotoBooth requires the live video stream to be active before creating a snapshot photo.'
        );
        self.ezClearSnapshotPreview();
        return;
    }

    var webCanvas2DContext = self.configuration.liverViewer.webCanvas.getContext('2d');
    if (ezApi.isNotValid(webCanvas2DContext)) {
        ezApi.p.logger.error('EzPhotoBooth is unable to obtain the 2D context from the web canvas.');
        return;
    }

    self.configuration.liverViewer.webCanvas.width = self.configuratiosnapshotPreviewer.snapshotWidth;
    self.configuration.liverViewer.webCanvas.height = self.configuratiosnapshotPreviewer.snapshotHeight;
    webCanvas2DContext.drawImage(self.configuration.liverViewer.videoStream, 0, 0,
        self.configuratiosnapshotPreviewer.snapshotWidth, self.configuratiosnapshotPreviewer.snapshotHeight
    );

    self.configuration.snapshotPreviewer.previewImage.setAttribute('src',
        self.configuration.liverViewer.webCanvas.toDataURL('image/png'));
};

// ezApi Registration
document.addEventListener('onEzApiReady', function() {
    if (typeof ezApi === 'undefined' || !ezApi) {
        window.console.warn('EzApi is required by EzWebPhotoBooth widget.');
    }
    ezApi.ezRegisterSecure('ezPhotoBooth', new EzPhotoBooth());
    ezApi.s.ezPhotoBooth.ezInit();
});
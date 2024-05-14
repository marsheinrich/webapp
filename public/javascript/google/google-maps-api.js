import {
    EzBadParamException
} from '/ezlibrary/exceptions/EzExceptions.js';

import {
    EzObject,
    EzBoolean,
    EzString,
    EzHtml,
    EzJson,
    EzPromise
} from '/ezlibrary/helpers/EzHelpers.js';

import {
    EzRegistrationState,
    EzElementEventName
} from '/ezlibrary/enums/EzEnumerations.js';

import { EzClass } from '/ezlibrary/EzClass.js';

import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzUx } from '/ezlibrary/ux/EzUx.js';
import { EzUI } from '/public/javascript/common/ezui.js';

import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';

/**
 * @class
 * @extends {EzClass}
 * @summary
 * Wraps up the use of the google maps api
 * @description
 * ---------------------------------------------------------------------------
 * Import with:
 *     import { EzGoogleMapsApi } from '/public/javascript/google/google-maps-api.js';
 * ---------------------------------------------------------------------------
 * Listen to onReady event:
 *     document.addEventListener(
 *         EzGoogleMapsApi.ezEventNames.onReady,
 *         this.#ezRegistrator);
 * ---------------------------------------------------------------------------
 * Singleton instance ready for use when the below evaluates to true:
 *     globalThis.ezApi.ezclocker[EzGoogleMapsApi.ezApiName] &&
 *     globalThis.ezApi.ezclocker[EzGoogleMapsApi.ezApiName].ready
 * ---------------------------------------------------------------------------
 */
export class EzGoogleMapsApi extends EzClass {
    static get EZCLOCKER_LAT() {
        return -25.363882;
    }

    static get EZCLOCKER_LNG() {
        return 131.044922;
    }

    /**
     * @public @readonly @property
     * Returns the dialog's HTML element id
     * @returns {string}
     */
    get ezDialogId() {
        return 'EzMapDialog';
    }

    /**
     * @public @readonly @property
     * Gets the accuracy circle's fill color
     * @returns {string}
     */
    get ezAccuracyCircleColor() {
        // From ez-body.css: --ezClockerBabyBlue
        return '#7CD0FD';
    }

    /**
     * @public @readonly @property
     * Gets the accuracy circles border color
     * @returns {string}
     */
    get ezAccuracyCircleBorderColor() {
        // From ez-body.css: --ezBorderBabyBlue
        return '#2cacf1';
    }

    /**
     * @public @readonly @property
     * Gets the employer location map-marker color
     * @returns {string}
     */
    get ezEmployerLocationMapMarkerColor() {
        // from ez-body.css: --ezClockerOrange
        return '#ff9900'
    }

    /**
     * @public @readonly @property
     * Gets the single location map marker color
     * @returns {string}
     */
    ezLocationAMapMarkerColor() {
        // from ez-body.css: --ezClockerActionGreen
        return '#8df13c'
    }

    /**
     * @public @readonly @property
     * Gets the single location map marker color
     * @returns {string}
     */
    ezLocationBMapMarkerColor() {
        // from ez-body.css: --ezClockerNavy
        return '#0f4777'
    }

    /**
     * @public @readonly @property
     * Gets the map label font color
     * @returns {string}
     */
    get ezMapLabelFontColor() {
        // From ez-body.css: --ezClockerBlack
        return '#000000'
    }

    /**
     * @public @readonly @property
     * Gets the map label stroke color
     * @returns {string}
     */
    get ezMapLabelStrokeColor() {
        // From ez-body.css: --ezClockerWhite
        return '#ffffff';
    }

    /**
     * @private @field
     * Stores the reference to the JQuery dialog with the embeded google maps.
     * @type {object}
     */
    #ezGoogleMapDialog = null;
    /**
     * @public @property @getter
     * Gets the reference to the JQuery dialog with the embeded google maps.
     * @returns {object}
     */
    get ezGoogleMapDialog() {
        if (null == this.#ezGoogleMapDialog) {
            this.ezInitDialog();
        }

        return this.#ezGoogleMapDialog;
    }
    /**
     * @public @property @setter
     * Sets the reference to the JQuery dialog with the embeded google maps.
     * @param {object} ezGoogleMapDialog
     */
    set ezGoogleMapDialog(ezGoogleMapDialog) {
        this.#ezGoogleMapDialog = ezGoogleMapDialog;
    }

    /**
     * @private @field
     * Stores the HTML element that will contain the google.maps.map instance UX.
     * @type {object}
     */
    #ezGoogleMapBox = null;
    /**
     * @public @readonly @property
     * Gets the reference to the dialog's map container div.
     * @returns {object}
     */
    get ezGoogleMapBox() {
        if (null == this.#ezGoogleMapBox) {
            this.#ezGoogleMapBox = EzUx.findElement(`${EzGoogleMapsApi.ezInstance.ezDialogId}_MapContainer`);
        }

        return this.#ezGoogleMapBox;
    }

    /**
     * @private @field
     * Stores the reference to the google map
     * @type {google.maps.Map}
     */
    #ezGoogleMap = null;
    /**
     * @public @property @getter
     * Gets the reference to the google map
     * @returns {google.maps.Map}
     */
    get ezGoogleMap() {
        return this.#ezGoogleMap;
    }
    /**
     * @public @property @setter
     * Sets the reference to the google map
     * @param {google.maps.Map} googleMapRef
     */
    set ezGoogleMap(googleMapRef) {
        this.#ezGoogleMap = googleMapRef;
    }

    /**
     * @public @readonly @property
     * Gets the minimim pin distance in meters
     * @returns {number}
     */
    get ezMinPinDistance() {
        // meters
        return 100;
    }

    /**
     * @private @field
     * Stores the ezDebugA lat and long information
     * @type {object}
     */
    #ezDebugA = {
        lat: null,
        lng: null
    };
    /**
     * @public @proeprty @getter
     * Gets the ezDebugA lat and long information
     * @returns {object}
     */
    get ezDebugA() {
        return this.#ezDebugA;
    }
    /**
     * @public @proeprty @setter
     * Sets the ezDebugA lat and long information
     * @param {object} debugA
     */
    set ezDebugA(debugA) {
        if (EzObject.isValid(debugA)) {
            this.#ezDebugA.lat = EzObject.assignOrNull(debugA.lat);

            this.#ezDebugA.lng = EzObject.assignOrNull(debugA.lng);
        }
    }

    /**
     * @private @field
     * Stores the ezDebugB lat and long information
     * @type {object}
     */
    #ezDebugB = {
        lat: null,
        lng: null
    };
    /**
     * @public @proeprty @getter
     * Gets the ezDebugB lat and long information
     * @returns {object}
     */
    get ezDebugB() {
        return this.#ezDebugB;
    }
    /**
     * @publ the ezDebugB lat and long informationic @proeprty @setter
     * Sets the ezDebugB lat and long information
     * @param {object} debugB
     */
    set ezDebugB(debugB) {
        if (EzObject.isValid(debugB)) {
            this.#ezDebugB.lat = EzObject.assignOrNull(debugB.lat);

            this.#ezDebugB.lng = EzObject.assignOrNull(debugB.lng);
        }
    }

    /**
     * @public @method
     */
    ezInit() {
        EzGoogleMapsApi.ezInstance.ezInitDialog();

        return EzGoogleMapsApi.ezInstance;
    }

    /**
     * @protected @method
     */
    ezLoadDebugLocations() {
        EzGoogleMapsApi.ezInstance.ezDebugA.lat = ezApi.ezclocker.ezUrlHelper.getUrlParam('a1');

        EzGoogleMapsApi.ezInstance.ezDebugA.lng = ezApi.ezclocker.ezUrlHelper.getUrlParam('a2');

        EzGoogleMapsApi.ezInstance.ezDebugB.lat = ezApi.ezclocker.ezUrlHelper.getUrlParam('b1');

        EzGoogleMapsApi.ezInstance.ezDebugB.lng = ezApi.ezclocker.ezUrlHelper.getUrlParam('b2');

        if (EzGoogleMapsApi.ezInstance.ezDebugA?.lat && 0 == EzGoogleMapsApi.ezInstance.ezDebugA.lat.length) {
            EzGoogleMapsApi.ezInstance.ezDebugA.lat = null;
        }

        if (EzGoogleMapsApi.ezInstance.ezDebugA?.lng && 0 == EzGoogleMapsApi.ezInstance.ezDebugA.lng.length) {
            EzGoogleMapsApi.ezInstance.ezDebugA.lng = null;
        }

        if (EzGoogleMapsApi.ezInstance.ezDebugB?.lat && 0 == EzGoogleMapsApi.ezInstance.ezDebugB.lat.length) {
            EzGoogleMapsApi.ezInstance.ezDebugB.lat = null;
        }

        if (EzGoogleMapsApi.ezInstance.ezDebugB?.lng && 0 == EzGoogleMapsApi.ezInstance.ezDebugB.lng.length) {
            EzGoogleMapsApi.ezInstance.ezDebugB.lng = null;
        }

        ezApi.ezclocker.ezLogger.debug(`ezDebugA=${EzJson.toJson(EzGoogleMapsApi.ezInstance.ezDebugA)}`);

        ezApi.ezclocker.ezLogger.debug(`ezDebugB=${EzJson.toJson(EzGoogleMapsApi.ezInstance.ezDebugB)}`);
    }

    /**
     * @protected @method
     */
    ezInitDialog() {
        EzGoogleMapsApi.ezInstance.ezInjectDialog();

        let ezDialogConfig = new EzDialogConfig(EzGoogleMapsApi.ezInstance.ezDialogId);

        ezDialogConfig.minHeight = 575;

        ezDialogConfig.minWidth = 750;

        ezDialogConfig.resizable = true;

        EzGoogleMapsApi.ezInstance.ezGoogleMapDialog = ezApi.ezclocker.ezDialog.ezInitDialogWithConfig(
            EzGoogleMapsApi.ezInstance.ezDialogId,
            ezDialogConfig);

        EzGoogleMapsApi.ezInstance.ezGoogleMapDialog.dialog(
            {
                resizeStart: () => ezApi.ezclocker.ezUi.ezId(`${EzGoogleMapsApi.ezInstance.ezDialogId}_MapContainer`).fadeOut('fast'),
                resizeStop: (event, ui) => {
                    ezApi.ezclocker.ezUi.ezId(`${EzGoogleMapsApi.ezInstance.ezDialogId}_MapContainer`).fadeIn('fast');

                    EzGoogleMapsApi.ezInstance.ezUpdateMapSize(
                        ui.originalSize,
                        ui.size);
                }
            });
    }

    /**
     * @protected @method
     * Injects the EzGoogleMapsApi dialog into the document
     */
    ezInjectDialog() {
        if (ezApi.ezclocker.ezUi.ezElementExists(EzGoogleMapsApi.ezInstance.ezDialogId)) {
            // Dialog already injected into the document
            return;
        }

        if (!ezApi.ezclocker.ezUi.ezElementExists('EzHiddenDialogsContainer')) {
            ezApi.ezclocker.ezUi.ezAppendContent(
                'body',
                EzHtml.build`
                <div
                    id="EzHiddenDialogsContainer"
                    style="display:none">
                </div>`);
        }

        ezApi.ezclocker.ezUi.ezAppendContent(
            'EzHiddenDialogsContainer',
            EzGoogleMapsApi.ezInstance.ezBuildEzMapDialogHTML());

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            `${EzGoogleMapsApi.ezInstance.ezDialogId}_CloseButton`,
            EzElementEventName.CLICK,
            EzGoogleMapsApi.ezApiName,
            () => ezApi.ezclocker.ezDialog.ezCloseDialog(EzGoogleMapsApi.ezInstance.ezDialogId));
    }

    /**
     * @public @method
     * Builds the EzMapDialog's HTML UX and injects into the document body
     */
    ezBuildEzMapDialogHTML() {
        return EzHtml.build`
            <div
                id="${EzGoogleMapsApi.ezInstance.ezDialogId}"
                style="display:none"
                title="Time Entry Location Information">
                <link
                    id="${EzGoogleMapsApi.ezInstance.ezDialogId}_TimeEntryLocationInfo_Link"
                    href="${ezApi.ezclocker.ezNavigation.ezGetPublicPageUrl('javascript/google/ez-google-maps-dialog.css')}"
                    rel="stylesheet"
                    type="text/css">
                <h2
                    id="${EzGoogleMapsApi.ezInstance.ezDialogId}_EmployeeName">
                </h2>
                <div
                    id="EzInOutDataLayoutContainer"
                    class="ezAutoCol_50x50 ezGridGap_8 ezGrid-align-top-left">
                    <div
                        id="InDataLayoutContainer">
                        <div
                            id="${EzGoogleMapsApi.ezInstance.ezDialogId}_InStatusContainer"
                            class="ezLightGrayBox ezMarginBottom8">
                            <div
                                id="${EzGoogleMapsApi.ezInstance.ezDialogId}_InStatusLabel"
                                class="EZ_GpsStatusTitle">
                                Clock In
                            </div>
                            <div
                                id="${EzGoogleMapsApi.ezInstance.ezDialogId}_ClockInGpsStatus"
                                class="EZ_GpsStatusValueIn ezRounded4pxAllCorners">
                            </div>
                            <div
                                id="${EzGoogleMapsApi.ezInstance.ezDialogId}_ClockInDateTimeContainer"
                                class="ezWhiteBox">
                            </div>
                        </div>
                    </div>
                    <div
                        id="OutDataLayoutContainer">
                        <div
                            id="${EzGoogleMapsApi.ezInstance.ezDialogId}_ClockOutGpsStatusContainer"
                            class="ezLightGrayBox ezMarginBottom8">
                            <div
                                id="${EzGoogleMapsApi.ezInstance.ezDialogId}_ClockOutGpsStatusTitle"
                                class="EZ_GpsStatusTitle">
                                Clock Out
                            </div>
                            <div
                                id="${EzGoogleMapsApi.ezInstance.ezDialogId}_ClockOutGpsStatus"
                                class="EZ_GpsStatusValueOut ezRounded4pxAllCorners">
                            </div>
                            <div
                                id="${EzGoogleMapsApi.ezInstance.ezDialogId}_ClockOutDateTimeContainer"
                                class="ezWhiteBox">
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    id="${EzGoogleMapsApi.ezInstance.ezDialogId}_MapContainer"
                    class="ezSilverBox EZ_MapContainer ezMarginTop10">
                </div>
                <div
                    id="${EzGoogleMapsApi.ezInstance.ezDialogId}_ButtonContainer"
                    class="ezContainer-transparent-button-bar-no-border">
                    <button
                        id="${EzGoogleMapsApi.ezInstance.ezDialogId}_CloseButton"
                        class="ezMajorButton">
                        Close
                    </button>
            </div>`;
    }

    /**
     * @protected @method
     * Triggers the internal google maps instance's resize event
     */
    ezTriggerGoogleMapsResizeEvent() {
        google.maps.event.trigger(
            EzGoogleMapsApi.ezInstance.ezGoogleMap,
            'resize');
    }

    /**
     * @public @method
     * @param {number} originalSize
     * @param {number} newSize
     */
    ezUpdateMapSize(originalSize, newSize) {
        if (!originalSize || !newSize) {
            return;
        }

        let mapContainerId = `${EzGoogleMapsApi.ezInstance.ezDialogId}_MapContainer`;

        let mapHeight = EzUx.outerHeight(mapContainerId);

        let newHeight = originalSize.height < newSize.height
            ? mapHeight - (originalSize.height - newSize.height)
            : mapHeight + (newSize.height - originalSize.height);

        EzUx.setHeight(
            mapContainerId,
            newHeight);

        EzGoogleMapsApi.ezInstance.ezUpdateMapUX();
    }

    /**
     * @public @method
     * Shows the map dialog
     * @returns {Promise.resolve}
     */
    ezShow() {
        return EzPromise.asyncAction(
            (finished) => {
                if (!EzGoogleMapsApi.ezInstance.ezGoogleMapDialog) {
                    ezApi.ezclocker.ezLogger.error('Unable to show the ezClocker Map dialog. Map dialog is not yet initialized.');

                    return finished();
                }

                EzGoogleMapsApi.ezInstance.ezGoogleMapDialog.dialog('open');

                EzGoogleMapsApi.ezInstance.ezUpdateMapUX();

                return finished();
            });
    }

    /**
     * @public @method
     * Updates the google map dialog's UX
     */
    ezUpdateMapUX() {
        EzGoogleMapsApi.ezInstance.ezTriggerGoogleMapsResizeEvent();

        // EzGoogleMapsApi.ezInstance.ezApplyMaximumZoom();
    }

    /**
     * @public @method
     * Closes the map dialog
     * @deprecated
     * Migrate to ezApi.ezclocker.ezGoogleMapsApi.ezClose()
     */
    closeDialog() {
        EzGoogleMapsApi.ezInstance.ezClose();
    }

    /**
     * @public @method
     * Closes the map dialog
     */
    ezClose() {
        ezApi.ezclocker.ezDialog.ezCloseDialog(EzGoogleMapsApi.ezInstance.ezDialogId);
    }

    /**
     * @public @method
     * @deprecated
     * Migrate to ezApi.ezclocker.ezGoogleMapsApi.ezExtendMapBounds()
     * @param {object} location1
     * @param {object} location2
     */
    extendMapBounds(location1, location2) {
        return EzGoogleMapsApi.ezInstance.ezExtendMapBounds(location1, location2);
    }

    /**
     * @public @method
     * @param {object} location1
     * @param {object} location2
     */
    ezExtendMapBounds(location1, location2) {
        if (!EzGoogleMapsApi.ezInstance.ezGoogleMap) {
            return; // no map to extend
        }

        if ((location1.lat() === location2.lat()) && (location1.lng() === location2.lng())) {
            return; // nothing to extend to
        }

        let bounds = new google.maps.LatLngBounds();

        bounds = bounds.extend(location1);

        bounds = bounds.extend(location2);

        EzGoogleMapsApi.ezInstance.ezGoogleMap.fitBounds(bounds);
    }

    /**
     * @public @method
     * @param {undefiend|null|object} circle1
     * @param {undefiend|null|object} circle2
     * @param {undefiend|null|object} circle2
     */
    ezMapBoundsByAccuracy(circle1 = null, circle2 = null, circle3 = null) {
        if (!EzGoogleMapsApi.ezInstance.ezGoogleMap || (!circle1 && !circle2 && !circle3)) {
            return;
        }

        let bounds = new google.maps.LatLngBounds();

        if (circle1?.getBounds()) {
            bounds.union(circle1.getBounds());

            EzGoogleMapsApi.ezInstance.ezGoogleMap.fitBounds(bounds);
        }

        if (circle2?.getBounds()) {
            bounds.union(circle2.getBounds());

            EzGoogleMapsApi.ezInstance.ezGoogleMap.fitBounds(bounds);
        }

        if (circle3?.getBounds()) {
            bounds.union(circle3.getBounds());

            EzGoogleMapsApi.ezInstance.ezGoogleMap.fitBounds(bounds);
        }

        EzGoogleMapsApi.ezInstance.ezUpdateMapUX();
    }

    /**
     * Sets the initial zoom to a maximum value of 18;
     */
    ezApplyMaximumZoom() {
        EzGoogleMapsApi.ezInstance.ezGoogleMap.setZoom(18);
    }

    /**
     * @public @method
     * Calculates the distance between lat1, lng1 and lat2, lng2
     * @param {number} lat1
     * @param {number} lng1
     * @param {number} lat2
     * @param {number} lng2
     * @returns {number}
     * @deprecated
     * Migrate to ezApi.ezclocker.ezGoogleMapsApi.ezCalcDistance()
     */
    calcDistance(lat1, lng1, lat2, lng2) {
        return EzGoogleMapsApi.ezInstance.ezCalcDistance(lat1, lng1, lat2, lng2);
    }

    /**
     * @public @method
     * Calculates the distance between lat1, lng1 and lat2, lng2
     * @param {number} lat1
     * @param {number} lng1
     * @param {number} lat2
     * @param {number} lng2
     * @returns {number}
     */
    ezCalcDistance(lat1, lng1, lat2, lng2) {
        let rad = (x) => x * Math.PI / 180;

        let R = 6378137; // Earth’s mean radius in meter

        let dLat = rad(lat2 - lat1);

        let dLong = rad(lng2 - lng1);

        let a = Math.sin(dLat / 2) *
            Math.sin(dLat / 2) + Math.cos(rad(lat1)) *
            Math.cos(rad(lat2)) *
            Math.sin(dLong / 2) *
            Math.sin(dLong / 2);

        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }

    /**
     * @public @method
     * Creates a new instance for google.maps.Map and assigns it to EzGoogleMapsApi.ezInstance.ezGoogleMap
     * @param {object} googleMapOptions
     */
    ezCreateGoogleMapInstance(googleMapOptions) {
        if (!EzObject.isValid(googleMapOptions)) {
            googleMapOptions = {};
        }

        EzGoogleMapsApi.ezInstance.ezGoogleMap = new google.maps.Map(
            EzGoogleMapsApi.ezInstance.ezGoogleMapBox,
            googleMapOptions);

        EzGoogleMapsApi.ezInstance.ezGoogleMapIdleListener = EzGoogleMapsApi.ezInstance.ezGoogleMap.addListener(
            "idle",
            () => {
                // Remove listner since no need to know the zoom changed after the initial handling.
                google.maps.event.removeListener(EzGoogleMapsApi.ezInstance.ezGoogleMapIdleListener);

                EzGoogleMapsApi.ezInstance.ezGoogleMapIdleListener = null;

                if (18 < EzGoogleMapsApi.ezInstance.ezGoogleMap.getZoom()) {
                    EzGoogleMapsApi.ezInstance.ezApplyMaximumZoom();
                }
            });
    }

    /**
     * @public @method
     * Displays the google map in the dialog
     */
    ezDisplayMap() {
        EzGoogleMapsApi.ezInstance.ezCreateGoogleMapInstance({})

        EzGoogleMapsApi.ezInstance.ezGoogleMapDialog.dialog('open');

        EzGoogleMapsApi.ezInstance.ezUpdateMapUX();

        return EzGoogleMapsApi.ezInstance.ezGoogleMap;
    }

    /**
     * @public @method
     * Displays the employer location on the map
     * @param {number} employerLat
     * @param {number} employerLng
     * @param {string} employerName
     * @param {object} timeEntry
     * @deprecated
     * Migrate to ezApi.ezclocker.ezGoogleMapsApi.ezDisplayEmployerLocationMap()
     */
    displayEmployerLocationMap(employerLat, employerLng, employerName, timeEntry) {
        return EzGoogleMapsApi.ezInstance.ezDisplayEmployerLocationMap(
            employerLat,
            employerLng,
            employerName,
            timeEntry);
    }

    /**
     * @public @method
     * Displays the employer location on the map
     * @param {number} employerLat
     * @param {number} employerLng
     * @param {string} employerName
     * @param {object} timeEntry
     */
    ezDisplayEmployerLocationMap(employee, employerLat, employerLng, employerName, timeEntry) {
        if (!EzObject.isValid(employee)) {
            throw new EzBadParamException(
                'employee',
                EzGoogleMapsApi.ezInstance,
                EzGoogleMapsApi.ezInstance.ezDisplayEmployerLocationMap);
        }
        if (!EzObject.isValid(timeEntry)) {
            throw new EzBadParamException(
                'timeEntry',
                EzGoogleMapsApi.ezInstance,
                EzGoogleMapsApi.ezInstance.ezDisplayEmployerLocationMap);
        }

        let employerLocation = EzGoogleMapsApi.ezInstance.ezCreateLatLng(employerLat, employerLng);

        EzGoogleMapsApi.ezInstance.ezSetMapDialogLabels(employee, timeEntry);

        EzGoogleMapsApi.ezInstance.ezCreateGoogleMapInstance({
            center: employerLocation
        });

        EzGoogleMapsApi.ezInstance.ezCreateMapMarker(
            employerLocation,
            EzGoogleMapsApi.ezInstance.ezEmployerLocationMapMarkerColor,
            false,
            false);

        EzGoogleMapsApi.ezInstance.ezCreateMapLabel(
            employerName,
            employerLocation);

        let employerAccuracyCircle = EzGoogleMapsApi.ezInstance.ezCreateMapCircle(
            EzGoogleMapsApi.ezInstance.ezGoogleMap,
            employerLocation,
            timeEntry.accuracy);

        EzGoogleMapsApi.ezInstance.ezGoogleMapDialog.dialog('open');

        EzGoogleMapsApi.ezInstance.ezShow()
            .then(
                () => {
                    EzGoogleMapsApi.ezInstance.ezGoogleMap.panTo(employerLocation);

                    EzGoogleMapsApi.ezInstance.ezMapBoundsByAccuracy(employerAccuracyCircle);
                });

        return EzGoogleMapsApi.ezInstance.ezGoogleMap;
    }

    /**
     * @public @method
     * Displays a single location on the map
     * @param {number} employerLat
     * @param {number} employerLng
     * @param {string} employerName
     * @param {number} eventLat
     * @param {number} eventLng
     * @param {string} eventTitle
     * @param {object} timeEntry
     * @deprecated
     * Migrate to ezApi.ezclocker.ezGoogleMapsApi.ezDisplaySingleEventMap()
     */
    displaySingleEventMap(employerLat, employerLng, employerName, eventLat, eventLng, eventTitle, timeEntry) {
        return EzGoogleMapsApi.ezInstance.ezDisplaySingleEventMap(
            employerLat,
            employerLng,
            employerName,
            eventLat,
            eventLng,
            eventTitle,
            timeEntry);
    }

    /**
     * @public @method
     * Displays a single location on the map
     * @param {number} employerLat
     * @param {number} employerLng
     * @param {string} employerName
     * @param {number} eventLat
     * @param {number} eventLng
     * @param {string} eventTitle
     * @param {object} timeEntry
     */
    ezDisplaySingleEventMap(employee, employerLat, employerLng, employerName, eventLat, eventLng, eventTitle, timeEntry) {
        if (!EzObject.isValid(employee)) {
            throw new EzBadParamException(
                'employee',
                EzGoogleMapsApi.ezInstance,
                EzGoogleMapsApi.ezInstance.ezDisplaySingleEventMap);
        }
        if (!EzObject.isValid(timeEntry)) {
            throw new EzBadParamException(
                'timeEntry',
                EzGoogleMapsApi.ezInstance,
                EzGoogleMapsApi.ezInstance.ezDisplaySingleEventMap);
        }

        EzGoogleMapsApi.ezInstance.ezSetMapDialogLabels(employee, timeEntry);

        let employerLocation = EzGoogleMapsApi.ezInstance.ezCreateLatLng(employerLat, employerLng);

        let eventLocation = EzGoogleMapsApi.ezInstance.ezCreateLatLng(eventLat, eventLng);

        EzGoogleMapsApi.ezInstance.ezCreateGoogleMapInstance({
            center: employerLocation
        });

        EzGoogleMapsApi.ezInstance.ezCreateMapMarker(
            employerLocation,
            EzGoogleMapsApi.ezInstance.ezEmployerLocationMapMarkerColor,
            false,
            false);

        EzGoogleMapsApi.ezInstance.ezCreateMapLabel(employerName, employerLocation);

        EzGoogleMapsApi.ezInstance.ezCreateMapCircle(
            EzGoogleMapsApi.ezInstance.ezGoogleMap,
            employerLocation,
            timeEntry.accuracy);

        EzGoogleMapsApi.ezInstance.ezCreateMapMarker(
            eventLocation,
            EzGoogleMapsApi.ezInstance.ezLocationAMapMarkerColor,
            false,
            false);

        EzGoogleMapsApi.ezInstance.ezCreateMapLabel(
            eventTitle,
            eventLocation);

        let locationAccuracyCircleA = EzGoogleMapsApi.ezInstance.ezCreateMapCircle(
            EzGoogleMapsApi.ezInstance.ezGoogleMap,
            eventLocation,
            timeEntry.accuracy);

        EzGoogleMapsApi.ezInstance.ezShow()
            .then(
                () => {
                    EzGoogleMapsApi.ezInstance.ezGoogleMap.panTo(employerLocation);

                    EzGoogleMapsApi.ezInstance.ezMapBoundsByAccuracy(locationAccuracyCircleA);
                });

        return EzGoogleMapsApi.ezInstance.ezGoogleMap;
    }

    /**
     * @public @method
     * Displays a single location on the map without any employer information
     * @param {object} employee
     * @param {number} eventLat1
     * @param {number} eventLng1
     * @param {number} eventAccuracy1
     * @param {string} eventTitle1
     * @param {boolean} isClockIn
     * @param {boolean} isClockOut
     * @param {object} timeEntry
     * @deprecated
     * Migrate to ezApi.ezclocker.ezGoogleMapsApi.ezDisplaySingleEventMapNoEmployerInformation()
     */
    displaySingleEventMap_NoEmployerInformation(employee, eventLat1, eventLng1, eventAccuracy1, eventTitle1, isClockIn, isClockOut, timeEntry) {
        return EzGoogleMapsApi.ezInstance.ezDisplaySingleEventMapNoEmployerInformation(
            employee,
            eventLat1,
            eventLng1,
            eventAccuracy1,
            eventTitle1,
            isClockIn,
            isClockOut,
            timeEntry);
    }

    /**
     * @public @method
     * Displays a single location on the map without any employer information
     * @param {object} employee
     * @param {number} eventLat1
     * @param {number} eventLng1
     * @param {number} eventAccuracy1
     * @param {string} eventTitle1
     * @param {boolean} isClockIn
     * @param {boolean} isClockOut
     * @param {object} timeEntry
     */
    ezDisplaySingleEventMapNoEmployerInformation(employee, eventLat1, eventLng1, eventAccuracy1, eventTitle1, isClockIn, isClockOut, timeEntry) {
        if (!EzObject.isValid(employee)) {
            throw new EzBadParamException(
                'employee',
                EzGoogleMapsApi.ezInstance,
                EzGoogleMapsApi.ezInstance.ezDisplaySingleEventMapNoEmployerInformation);
        }
        if (!EzObject.isValid(timeEntry)) {
            throw new EzBadParamException(
                'timeEntry',
                EzGoogleMapsApi.ezInstance,
                EzGoogleMapsApi.ezInstance.ezDisplaySingleEventMapNoEmployerInformation);
        }

        EzGoogleMapsApi.ezInstance.ezSetMapDialogLabels(employee, timeEntry);

        let locationLatLongA = EzGoogleMapsApi.ezInstance.ezCreateLatLng(eventLat1, eventLng1);

        EzGoogleMapsApi.ezInstance.ezCreateGoogleMapInstance({
            center: locationLatLongA
        });

        EzGoogleMapsApi.ezInstance.ezCreateMapMarker(
            locationLatLongA,
            EzGoogleMapsApi.ezInstance.ezLocationAMapMarkerColor,
            isClockIn,
            isClockOut);

        EzGoogleMapsApi.ezInstance.ezCreateMapLabel(
            eventTitle1,
            locationLatLongA);

        let locationAccuracyCircleA = EzGoogleMapsApi.ezInstance.ezCreateMapCircle(
            EzGoogleMapsApi.ezInstance.ezGoogleMap,
            locationLatLongA,
            eventAccuracy1);

        EzGoogleMapsApi.ezInstance.ezShow()
            .then(
                () => {
                    EzGoogleMapsApi.ezInstance.ezGoogleMap.panTo(locationLatLongA);

                    EzGoogleMapsApi.ezInstance.ezMapBoundsByAccuracy(locationAccuracyCircleA);
                });

        return EzGoogleMapsApi.ezInstance.ezGoogleMap;
    }

    /**
     * @public @method
     * Sets the employee and time entry lables on the map
     * @param {object} employee
     * @param {object} timeEntry
     * @deprecated
     * Migrate to ezApi.ezclocker.ezGoogleMapsApi.ezSetMapDialogLabels();
     */
    setMapDialogLabels(employee, timeEntry) {
        EzGoogleMapsApi.ezInstance.ezSetMapDialogLabels(employee, timeEntry);
    }

    /**
     * @public @method
     * Sets the employee and time entry lables on the map
     * @param {object} employee
     * @param {object} timeEntry
     */
    ezSetMapDialogLabels(employee, timeEntry) {
        if (!EzObject.isValid(employee)) {
            throw new EzBadParamException(
                'employee',
                EzGoogleMapsApi.ezInstance,
                EzGoogleMapsApi.ezInstance.ezSetMapDialogLabels);
        }
        if (!EzObject.isValid(timeEntry)) {
            throw new EzBadParamException(
                'timeEntry',
                EzGoogleMapsApi.ezInstance,
                EzGoogleMapsApi.ezInstance.ezSetMapDialogLabels);
        }

        ezApi.ezclocker.ezUi.ezContent(
            `${EzGoogleMapsApi.ezInstance.ezDialogId}_EmployeeName`,
            `Employee: ${employee.employeeName}`);

        if (timeEntry.isActiveClockIn || timeEntry.activeBreak) {
            EzGoogleMapsApi.ezInstance.ezRenderActiveClockInBreakInData(timeEntry);
        } else {
            EzGoogleMapsApi.ezInstance.ezRenderNonActiveClockInBreakInData(timeEntry);
        }
    }

    /**
     * @public @method
     * Renders data on the map for an active clock in or active break
     */
    ezRenderActiveClockInBreakInData(timeEntry) {
        if (!EzObject.isValid(timeEntry)) {
            throw new EzBadParamExceptoin(
                'timeEntry',
                EzGoogleMapsApi.ezInstance,
                EzGoogleMapsApi.ezInstance.ezRenderActiveClockInBreakInData);
        }

        let inGpsStatus = EzObject.isValid(timeEntry) && EzString.stringHasLength(timeEntry.clockInGpsDataStatus)
            ? timeEntry.clockInGpsDataStatus
            : 'NOT AVAILABLE';

        if ('NOT_AVAILABLE' === timeEntry.clockInGpsDataStatus) {
            inGpsStatus = 'NOT AVAILABLE';
        }

        ezApi.ezclocker.ezUi.ezContent(
            `${EzGoogleMapsApi.ezInstance.ezDialogId}_ClockInGpsStatus`,
            inGpsStatus);

        ezApi.ezclocker.ezUi.ezContent(
            `${EzGoogleMapsApi.ezInstance.ezDialogId}_ClockInDateTimeContainer`,
            ezApi.ezclocker.ezDateTime.ezToDisplayDateTime(
                ezApi.ezclocker.ezDateTime.ezFromIso(timeEntry.clockInIso)));

        ezApi.ezclocker.ezUi.ezContent(
            `${EzGoogleMapsApi.ezInstance.ezDialogId}_ClockOutDateTimeContainer`,
            '&nbsp');

        ezApi.ezclocker.ezUi.ezContent(
            `${EzGoogleMapsApi.ezInstance.ezDialogId}_ClockOutGpsStatus`,
            '&nbsp');

        ezApi.ezclocker.ezUi.ezAddElementClass(
            `${EzGoogleMapsApi.ezInstance.ezDialogId}_ClockOutGpsStatus`,
            'EZ_GpsStatusValueOutDisabled');

        ezApi.ezclocker.ezUi.ezAddElementClass(
            `${EzGoogleMapsApi.ezInstance.ezDialogId}_ClockOutGpsStatusTitle`,
            'EZ_GpsStatusTitleDisabled');

        ezApi.ezclocker.ezUi.ezAddElementClass(
            `${EzGoogleMapsApi.ezInstance.ezDialogId}_ClockOutGpsStatusContainer`,
            'EZ_GpsStatusContainerDisabled');
    }

    /**
     * @public @method
     * Renders data on the map for a non-active clock in or non-active break
     */
    ezRenderNonActiveClockInBreakInData(timeEntry) {
        if (!EzObject.isValid(timeEntry)) {
            throw new EzBadParamExceptoin(
                'timeEntry',
                EzGoogleMapsApi.ezInstance,
                EzGoogleMapsApi.ezInstance.ezRenderNonActiveClockInBreakInData);
        }

        let inGpsStatus = EzObject.isValid(timeEntry) && EzString.stringHasLength(timeEntry.clockInGpsDataStatus)
            ? timeEntry.clockInGpsDataStatus
            : 'NOT AVAILABLE';

        if ('NOT_AVAILABLE' === timeEntry.clockInGpsDataStatus) {
            inGpsStatus = 'NOT AVAILABLE';
        }

        let outGpsStatus = EzObject.isValid(timeEntry) && EzString.stringHasLength(timeEntry.clockOutGpsDataStatus)
            ? timeEntry.clockOutGpsDataStatus
            : 'NOT AVAILABLE';

        if ('NOT_AVAILABLE' === timeEntry.clockOutGpsDataStatus) {
            outGpsStatus = 'NOT AVAILABLE';
        }

        ezApi.ezclocker.ezUi.ezRemoveElementClass(
            `${EzGoogleMapsApi.ezInstance.ezDialogId}_ClockOutGpsStatusTitle`,
            'EZ_GpsStatusTitleDisabled');

        ezApi.ezclocker.ezUi.ezRemoveElementClass(
            `${EzGoogleMapsApi.ezInstance.ezDialogId}_ClockOutGpsStatus`,
            'EZ_GpsStatusValueOutDisabled');

        ezApi.ezclocker.ezUi.ezRemoveElementClass(
            `${EzGoogleMapsApi.ezInstance.ezDialogId}_ClockOutGpsStatusContainer`,
            'EZ_GpsStatusContainerDisabled');

        ezApi.ezclocker.ezUi.ezContent(
            `${EzGoogleMapsApi.ezInstance.ezDialogId}_ClockInGpsStatus`,
            inGpsStatus);

        ezApi.ezclocker.ezUi.ezContent(
            `${EzGoogleMapsApi.ezInstance.ezDialogId}_ClockInDateTimeContainer`,
            ezApi.ezclocker.ezDateTime.ezToDisplayDateTime(
                ezApi.ezclocker.ezDateTime.ezFromIso(timeEntry.clockInIso)));

        ezApi.ezclocker.ezUi.ezContent(
            `${EzGoogleMapsApi.ezInstance.ezDialogId}_ClockOutGpsStatus`,
            outGpsStatus);

        ezApi.ezclocker.ezUi.ezContent(
            `${EzGoogleMapsApi.ezInstance.ezDialogId}_ClockOutDateTimeContainer`,
            ezApi.ezclocker.ezDateTime.ezToDisplayDateTime(
                ezApi.ezclocker.ezDateTime.ezFromIso(timeEntry.clockOutIso)));
    }

    /**
     * @public @method
     * Displays two locations on the map with the employer location
     * @param {number} employerLat
     * @param {number} employerLng
     * @param {string} employerName
     * @param {number} eventLat1
     * @param {number} eventLng1
     * @param {string} eventTitle1
     * @param {number} eventLat2
     * @param {number} eventLng2
     * @param {string} eventTitle2
     * @param {object} timeEntry
     * @deprecated
     * Migrate to ezApi.ezclocker.ezGoogleMapsApi.ezDisplayDualEventMap();
     */
    displayDualEventMap(employerLat, employerLng, employerName, eventLat1, eventLng1, eventTitle1, eventLat2, eventLng2, eventTitle2, timeEntry) {
        return EzGoogleMapsApi.ezInstance.ezDisplayDualEventMap(
            employerLat,
            employerLng,
            employerName,
            eventLat1,
            eventLng1,
            eventTitle1,
            eventLat2,
            eventLng2,
            eventTitle2,
            timeEntry);
    }

    /**
     * @public @method
     * Displays two locations on the map with the employer location
     * @param {object} employee
     * @param {number} employerLat
     * @param {number} employerLng
     * @param {string} employerName
     * @param {number} eventLat1
     * @param {number} eventLng1
     * @param {string} eventTitle1
     * @param {number} eventLat2
     * @param {number} eventLng2
     * @param {string} eventTitle2
     * @param {object} timeEntry
     */
    ezDisplayDualEventMap(employee, employerLat, employerLng, employerName, eventLat1, eventLng1, eventTitle1, eventLat2, eventLng2, eventTitle2, timeEntry) {
        if (!EzObject.isValid(employee)) {
            throw new EzBadParamException(
                'employee',
                EzGoogleMapsApi.ezInstance,
                EzGoogleMapsApi.ezInstance.ezDisplayDualEventMap);
        }
        if (!EzObject.isValid(timeEntry)) {
            throw new EzBadParamException(
                'timeEntry',
                EzGoogleMapsApi.ezInstance,
                EzGoogleMapsApi.ezInstance.ezDisplayDualEventMap);
        }

        EzGoogleMapsApi.ezInstance.ezSetMapDialogLabels(employee, timeEntry);

        let employerLocation = EzGoogleMapsApi.ezInstance.ezCreateLatLng(employerLat, employerLng);

        let eventLocation1 = EzGoogleMapsApi.ezInstance.ezCreateLatLng(eventLat1, eventLng1);

        let eventLocation2 = EzGoogleMapsApi.ezInstance.ezCreateLatLng(eventLat2, eventLng2);

        EzGoogleMapsApi.ezInstance.ezCreateGoogleMapInstance({
            center: employerLocation
        });

        EzGoogleMapsApi.ezInstance.ezCreateMapMarker(
            employerLocation,
            EzGoogleMapsApi.ezInstance.ezEmployerLocationMapMarkerColor,
            false,
            false);

        EzGoogleMapsApi.ezInstance.ezCreateMapLabel(
            employerName,
            employerLocation);

        const employerLocationAccuracyCircle = EzGoogleMapsApi.ezInstance.ezCreateMapCircle(
            EzGoogleMapsApi.ezInstance.ezGoogleMap,
            employerLocation);

        EzGoogleMapsApi.ezInstance.ezCreateMapMarker(
            eventLocation1,
            EzGoogleMapsApi.ezInstance.ezLocationAMapMarkerColor,
            true,
            false);

        EzGoogleMapsApi.ezInstance.ezCreateMapLabel(
            eventTitle1,
            eventLocation1);

        const locationAccuracyCircleA = EzGoogleMapsApi.ezInstance.ezCreateMapCircle(
            EzGoogleMapsApi.ezInstance.ezGoogleMap,
            eventLocation1);

        EzGoogleMapsApi.ezInstance.ezCreateMapMarker(
            eventLocation2,
            EzGoogleMapsApi.ezInstance.ezLocationBMapMarkerColor,
            false,
            true);

        EzGoogleMapsApi.ezInstance.ezCreateMapLabel(
            eventTitle2,
            eventLocation2);

        const locationAccuracyCircleB = EzGoogleMapsApi.ezInstance.ezCreateMapCircle(
            EzGoogleMapsApi.ezInstance.ezGoogleMap,
            eventLocation2);

        EzGoogleMapsApi.ezInstance.ezShow()
            .then(
                () => {
                    EzGoogleMapsApi.ezInstance.ezGoogleMap.panTo(eventLocation1);

                    EzGoogleMapsApi.ezInstance.ezMapBoundsByAccuracy(
                        locationAccuracyCircleA,
                        locationAccuracyCircleB,
                        employerLocationAccuracyCircle);
                });

        return EzGoogleMapsApi.ezInstance.ezGoogleMap;
    }

    /**
     * @public @method
     * Displays two locations on the map without the employer location
     * @param {number} eventLat1
     * @param {number} eventLng1
     * @param {number} eventAccuracy1
     * @param {string} eventTitle1
     * @param {number} eventLat2
     * @param {number} eventLng2
     * @param {number} eventAccuracy2
     * @param {string} eventTitle2
     * @param {object} timeEntry
     * @deprecated
     * Migrate to ezApi.ezclocker.ezGoogleMapsApi.ezDisplayDualEventMapNoEmployerLocation()
     */
    displayDualEventMap_NoEmployerLocation(employee, eventLat1, eventLng1, eventAccuracy1, eventTitle1, eventLat2, eventLng2, eventAccuracy2, eventTitle2, timeEntry) {
        return EzGoogleMapsApi.ezInstance.ezDisplayDualEventMapNoEmployerLocation(
            employee,
            eventLat1,
            eventLng1,
            eventTitle1,
            eventAccuracy1,
            eventLat2,
            eventLng2,
            eventTitle2,
            eventAccuracy2,
            timeEntry);
    }

    /**
     * @public @method
     * Displays two locations on the map without the employer location
     * @param {number} eventLat1
     * @param {number} eventLng1
     * @param {number} eventAccuracy1
     * @param {string} eventTitle1
     * @param {number} eventLat2
     * @param {number} eventLng2
     * @param {number} eventAccuracy2
     * @param {string} eventTitle2
     * @param {object} timeEntry
     */
    ezDisplayDualEventMapNoEmployerLocation(employee, eventLat1, eventLng1, eventTitle1, eventAccuracy1, eventLat2, eventLng2, eventTitle2, eventAccuracy2,
        timeEntry) {
        if (!EzObject.isValid(employee)) {
            throw new EzBadParamException(
                'employee',
                EzGoogleMapsApi.ezInstance,
                EzGoogleMapsApi.ezInstance.ezDisplayDualEventMapNoEmployerLocation);
        }
        if (!EzObject.isValid(timeEntry)) {
            throw new EzBadParamException(
                'timeEntry',
                EzGoogleMapsApi.ezInstance,
                EzGoogleMapsApi.ezInstance.ezDisplayDualEventMapNoEmployerLocation);
        }

        eventLat1 = EzGoogleMapsApi.ezInstance.ezDebugA.lat || eventLat1;

        eventLng1 = EzGoogleMapsApi.ezInstance.ezDebugA.lng || eventLng1;

        eventLat2 = EzGoogleMapsApi.ezInstance.ezDebugB.lat || eventLat2;

        eventLng2 = EzGoogleMapsApi.ezInstance.ezDebugB.lng || eventLng2;

        EzGoogleMapsApi.ezInstance.ezSetMapDialogLabels(employee, timeEntry);

        let eventLocation1 = EzGoogleMapsApi.ezInstance.ezCreateLatLng(eventLat1, eventLng1);

        let eventLocation2 = EzGoogleMapsApi.ezInstance.ezCreateLatLng(eventLat2, eventLng2);

        let distance = EzGoogleMapsApi.ezInstance.ezCalcDistance(
            eventLat1,
            eventLng1,
            eventLat2,
            eventLng2);

        EzGoogleMapsApi.ezInstance.ezCreateGoogleMapInstance({
            center: eventLocation1
        })

        if (distance < EzGoogleMapsApi.ezInstance.ezMinPinDistance) {
            // Show one pin if distance is minimal
            EzGoogleMapsApi.ezInstance.ezCreateMapMarker(
                eventLocation1,
                EzGoogleMapsApi.ezInstance.ezLocationAMapMarkerColor,
                true,
                true);

            EzGoogleMapsApi.ezInstance.ezCreateMapLabel(
                `${eventTitle1} & ${eventTitle2}`,
                eventLocation1);

            let locationAccuracyCircleA = EzGoogleMapsApi.ezInstance.ezCreateMapCircle(
                EzGoogleMapsApi.ezInstance.ezGoogleMap,
                eventLocation1,
                eventAccuracy1 > eventAccuracy2
                    ? eventAccuracy1
                    : eventAccuracy2);

            EzGoogleMapsApi.ezInstance.ezShow();

            EzGoogleMapsApi.ezInstance.ezGoogleMap.panTo(eventLocation1);

            EzGoogleMapsApi.ezInstance.ezMapBoundsByAccuracy(locationAccuracyCircleA);

            return EzGoogleMapsApi.ezInstance.ezGoogleMap;
        }

        EzGoogleMapsApi.ezInstance.ezCreateMapMarker(
            eventLocation1,
            EzGoogleMapsApi.ezInstance.ezLocationAMapMarkerColor,
            true,
            false);

        const locationAccuracyCircleA = EzGoogleMapsApi.ezInstance.ezCreateMapCircle(
            EzGoogleMapsApi.ezInstance.ezGoogleMap,
            eventLocation1,
            eventAccuracy1);

        EzGoogleMapsApi.ezInstance.ezCreateMapLabel(
            eventTitle1,
            eventLocation1);

        EzGoogleMapsApi.ezInstance.ezCreateMapMarker(
            eventLocation2,
            EzGoogleMapsApi.ezInstance.ezLocationBMapMarkerColor,
            false,
            true);

        EzGoogleMapsApi.ezInstance.ezCreateMapLabel(
            eventTitle2,
            eventLocation2);

        const locationAccuracyCircleB = EzGoogleMapsApi.ezInstance.ezCreateMapCircle(
            EzGoogleMapsApi.ezInstance.ezGoogleMap,
            eventLocation2,
            eventAccuracy2);

        EzGoogleMapsApi.ezInstance.ezShow();

        EzGoogleMapsApi.ezInstance.ezGoogleMap.panTo(eventLocation1);

        EzGoogleMapsApi.ezInstance.ezMapBoundsByAccuracy(
            locationAccuracyCircleA,
            locationAccuracyCircleB);

        return EzGoogleMapsApi.ezInstance.ezGoogleMap;
    }

    /**
     * @public @method
     * Creates a new google maps LatLng instance
     * @param {number} lat
     * @param {number} lng
     * @deprecated
     * Migrate to ezApi.ezclocker.ezGoogleMapsApi.ezCreateLatLng()
     * @returns {google.maps.LatLng}
     */
    createLatLng(lat, lng) {
        return EzGoogleMapsApi.ezInstance.ezCreateLatLng(lat, lng);
    }

    /**
     * @public @method
     * Creates a new google maps LatLng instance
     * @param {number} lat
     * @param {number} lng
     * @returns {google.maps.LatLng}
     */
    ezCreateLatLng(lat, lng) {
        return !lat || !lng
            ? new google.maps.LatLng(0, 0)
            : new google.maps.LatLng(lat, lng);
    }

    /**
     * @public @method
     * Gets the pin icon url to display on the map.
     * @param {boolean} isClockIn
     * @param {boolean} isClockOut
     * @deprecated
     * Migrate to ezApi.ezclocker.ezGoogleMapsApi.ezGetPinIconUrl()
     */
    getPinIconUrl(isClockIn, isClockOut) {
        return EzGoogleMapsApi.ezInstance.ezGetPinIconUrl(isClockIn, isClockOut);
    }

    /**
     * @public @method
     * Gets the pin icon url to display on the map.
     * @param {boolean} isClockIn
     * @param {boolean} isClockOut
     */
    ezGetPinIconUrl(isClockIn, isClockOut) {
        if (isClockIn && isClockOut) {
            return ezApi.ezclocker.ezNavigation.ezGetPublicImagesUrl('maps/cico.svg');
        }

        if (isClockIn) {
            return ezApi.ezclocker.ezNavigation.ezGetPublicImagesUrl('maps/ci.svg');
        }

        return ezApi.ezclocker.ezNavigation.ezGetPublicImagesUrl('maps/co.svg');
    }

    /**
     * @public @method
     * @param {object} latLng
     * @param {string} color
     * @param {boolean} isClockIn
     * @param {boolean} isClockOut
     * @deprecated
     * Migrate to ezApi.ezclocker.ezGoogleMapsApi.ezCreateMapMarker()
     */
    createMapMarker(latLng, color, isClockIn, isClockOut) {
        return EzGoogleMapsApi.ezInstance.ezCreateMapMarker(
            latLng,
            color,
            isClockIn,
            isClockOut);
    }

    /**
     * @public @method
     * Creates a google.maps.Marker for the provided latLng
     * The map marker is determined by the value of isClockIn and isClockOut booleans.
     * @param {object} latLng
     * @param {undefined|null|string} color
     * Not used yet
     * @param {undefiend|null|boolean} isClockIn
     * @param {undefiend|null|boolean} isClockOut
     * @returns {google.maps.Marker}
     */
    ezCreateMapMarker(latLng, color, isClockIn, isClockOut) {
        let iconUrl = EzGoogleMapsApi.ezInstance.ezGetPinIconUrl(
            EzBoolean.booleanOrFalse(isClockIn), EzBoolean.booleanOrFalse(isClockOut));

        if (iconUrl) {
            return new google.maps.Marker({
                position: latLng,
                animation: google.maps.Animation.DROP,
                map: EzGoogleMapsApi.ezInstance.ezGoogleMap,
                icon: {
                    url: iconUrl,
                },
                optimized: false
            });
        }

        return new google.maps.Marker({
            position: latLng,
            animation: google.maps.Animation.DROP,
            map: EzGoogleMapsApi.ezInstance.ezGoogleMap,
            icon: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW
        });
    }

    /**
     * @public @method
     * Creates a MapLabel for the provided information
     * @param {string} label
     * @param {object} latLng
     * @deprecated
     * Migrate to ezApi.ezclocker.ezGoogleMapsApi.ezCreateMapLabel();
     * @returns {MapLabel}
     */
    createMapLabel(label, latLng) {
        return EzGoogleMapsApi.ezInstance.ezCreateMapLabel(label, latLng);
    }

    /**
     * @public @method
     * Creates a MapLabel for the provided information
     * @param {string} label
     * @param {object} latLng
     * @returns {MapLabel}
     */
    ezCreateMapLabel(label, latLng) {
        return new MapLabel({
            align: 'center',
            fontFamily: 'Roboto-Black,Verdana,sans-serif',
            fontSize: 18,
            fontColor: EzGoogleMapsApi.ezInstance.ezMapLabelFontColor,
            map: EzGoogleMapsApi.ezInstance.ezGoogleMap,
            position: latLng,
            strokeWeight: 4,
            strokeColor: EzGoogleMapsApi.ezInstance.ezMapLabelStrokeColor,
            text: label,
            zIndex: 1000
        });
    }

    /**
     * @public @method
     * Creates an accuracy circle on the map for the provided lat long and accurace values.
     * @param {object} map
     * @param {object} latLng
     * @param {number} accuracy
     * @returns {google.maps.Circle}
     */
    ezCreateMapCircle(map, latLng, accuracy = '0') {
        return new google.maps.Circle({
            // From ez-body.css: --ezBorderBabyBlue
            strokeColor: EzGoogleMapsApi.ezInstance.ezAccuracyCircleBorderColor,
            strokeOpacity: 0.5,
            strokeWeight: 1,
            // From ez-body.css: --ezClockerBabyBlue
            fillColor: EzGoogleMapsApi.ezInstance.ezAccuracyCircleColor,
            fillOpacity: 0.3,
            map,
            center: latLng,
            radius: parseFloat(accuracy),
        });
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Class Initialization and EzApi Registration Section
    // !! DO NOT PLACE ANY non-initialization fields, getter/setter methods, static methods, or class methods beyond this section !!
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    /**
     * @private @field
     * Stores the array of dependency class refernces that need to trigger their
     * ready event before before the EzGoogleMapsApi is considered ready to use.
     * @type {array}
     */
    static #ezApiDeps = [
        EzEventEngine,
        EzUI
    ];

    /**
     * @static
     * @public @readonly @property
     * Returns the name of this class's singleton instance when registered with ezApi.
     * @returns {string}
     */
    static get ezApiName() {
        return 'ezGoogleMapsApi';
    }

    /**
     * @static
     * @public @readonly @property
     * Returns an object of event names that this class may trigger.
     * @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzGoogleMapsApi_Ready'
        };
    }

    /**
     * @static
     * @private @field
     * Stores the singleton instance of this class that was created by and registerd with EzApi.
     * @type {EzGoogleMapsApi}
     */
    static #ezInstance = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzGoogleMapsApi.ezApiName]
        ? globalThis.ezApi.ezclocker[EzGoogleMapsApi.ezApiName]
        : null;
    /**
     * @static
     * @public @property @getter
     * Returns the singleton instance of this class that is registered with EzApi (if available yet)
     * @returns {EzGoogleMapsApi}
     */
    static get ezInstance() {
        return EzGoogleMapsApi.#ezInstance;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the singleton instance of of this class that is registered with EzApi.
     * @param {EzGoogleMapsApi} EzGoogleMapsApi
     */
    static set ezInstance(ezGoogleMapsApi) {
        if (EzGoogleMapsApi.#ezInstance) {
            throw new Error('EzGoogleMapsApi\'s singleton instance is already reigstered with EzApi.');
        }

        EzGoogleMapsApi.#ezInstance = ezGoogleMapsApi;
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
    static #ezApiRegistrationState = globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker?.[EzGoogleMapsApi.ezApiName]
        ? EzRegistrationState.REGISTERED
        : null;
    /**
     * @static
     * @public @property @getter
     * Returns the ezApi registration state of this classes's singleton instance.
     * @returns {string}
     * A valid enum property value from EzRegistrationState
     */
    static get ezApiRegistrationState() {
        return EzGoogleMapsApi.#ezApiRegistrationState;
    }
    /**
     * @static
     * @public @property @setter
     * Sets the ezApi registration state of this classes's singleton instance.
     * @param {string} ezApiRegistrationState
     * A valid enum property value from EzRegistrationState
     */
    static set ezApiRegistrationState(ezApiRegistrationState) {
        EzGoogleMapsApi.#ezApiRegistrationState = EzRegistrationState.ezValueOf(ezApiRegistrationState);
    }

    /**
     * @static
     * @private @readonly @property
     * Returns if this class's singleton instance is registered with ezApi yet.
     * @returns {boolean}.
     */
    static get #ezIsRegistered() {
        return EzGoogleMapsApi.ezInstance && EzRegistrationState.REGISTERED === EzGoogleMapsApi.ezApiRegistrationState;
    }

    /**
     * @static
     * @private @readonly @property
     * Returns true when all required dependencies for this class report ready.
     * In otherwords, the require dependency's singleton instance is created
     * and is registered with and accessable from EzApi with ezApi.ezclocker.{dependency_name}.
     * @returns {boolean}
     */
    static get #ezCanRegister() {
        if (EzRegistrationState.PENDING !== EzGoogleMapsApi.ezApiRegistrationState || !globalThis?.ezApi?.ready || !globalThis.ezApi?.ezclocker) {
            return false;
        }

        for (let depClazz of EzGoogleMapsApi.#ezApiDeps) {
            if (depClazz && !globalThis.ezApi.ezclocker?.[depClazz.ezApiName]?.ready) {
                return false;
            }
        }

        // return EzRegistrationState.PENDING === EzGoogleMapsApi.ezApiRegistrationState &&
        //    globalThis?.ezApi?.ready && globalThis.ezApi?.ezclocker &&
        //globalThis.ezApi.ezclocker?.[EzEventEngine.ezApiName].ready &&
        //globalThis.ezApi.ezclocker?.[EzUI.ezApiName].ready;

        return true;
    }

    /**
     * @static
     * @private @method
     * Attempts to register the singleton instance for this class with ezApi. Returns true
     * if successful, false otherwise.
     * @returns {boolean}
     */
    static #ezRegistrator() {
        if (EzGoogleMapsApi.#ezCanRegister && !EzGoogleMapsApi.#ezIsRegistered) {
            globalThis.ezApi.ezRegisterNewApi(EzGoogleMapsApi, EzGoogleMapsApi.ezApiName);
        }

        if (EzGoogleMapsApi.#ezIsRegistered) {
            document.removeEventListener(
                EzGoogleMapsApi.ezOnEzApiReadyEventName,
                EzGoogleMapsApi.#ezRegistrator);

            for (let depClazz of EzGoogleMapsApi.#ezApiDeps) {
                // Remove listeners
                if (depClazz) {
                    document.removeEventListener(
                        depClazz.ezEventNames.onReady,
                        EzGoogleMapsApi.#ezRegistrator);
                }
            }
        }

        return EzGoogleMapsApi.#ezIsRegistered;
    }

    /**
     * @static
     * Static Initialization
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * >> IMPORTANT <<
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * Make sure the following properties and methods get defined BEFORE this static initialization section:
     *     1) Property getter EzGoogleMapsApi.ezApiName
     *     2) Property getter EzGoogleMapsApi.ezEventNames
     *     3) Property getter EzGoogleMapsApi.ezInstance
     *     4) Property setter EzGoogleMapsApi.ezInstance
     *     5) Property getter EzGoogleMapsApi.ezApiRegistrationState
     *     6) Property setter EzGoogleMapsApi.ezApiRegistrationState
     *     7) Property getter EzGoogleMapsApi.#ezCanRegister
     *     8) Property getter EzGoogleMapsApi.#ezIsRegistered
     *     9) Method
     */
    static {
        if (!EzGoogleMapsApi.#ezIsRegistered) {
            EzGoogleMapsApi.ezApiRegistrationState = EzRegistrationState.PENDING;

            if (!EzGoogleMapsApi.#ezRegistrator()) {
                document.addEventListener(
                    EzGoogleMapsApi.ezOnEzApiReadyEventName,
                    EzGoogleMapsApi.#ezRegistrator);

                for (let depClazz of EzGoogleMapsApi.#ezApiDeps) {
                    if (depClazz) {
                        document.addEventListener(
                            depClazz.ezEventNames.onReady,
                            EzGoogleMapsApi.#ezRegistrator);
                    }
                }

                /*
                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzGoogleMapsApi.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzGoogleMapsApi.#ezRegistrator);
                */
            }
        }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // NO CODE AFTER THIS SECTION
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}

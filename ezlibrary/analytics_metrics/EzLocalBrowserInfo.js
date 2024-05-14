import { EzClass } from '/ezlibrary/EzClass.js';
import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

/**
    Import with:
        import { EzLocalBrowserInfo } from '/ezlibrary/analytics_metrics/EzLocalBrowserInfo.js';

        globalThis.ezApi.ezclocker[EzLocalBrowserInfo.ezApiName] &&
        globalThis.ezApi.ezclocker[EzLocalBrowserInfo.ezApiName].ready

        document.addEventListener(
            EzLocalBrowserInfo.ezEventNames.ezOnReady,
            this.#ezRegistrator);
 */
class EzLocalBrowserInfo extends EzClass {
    /**
        @public @static @field
        @type {EzLocalBrowserInfo}
     */
    static ezInstance = null;

    /**
        @public @static @field
        @type {string}
     */
    static ezApiRegistrationState = null;

    /**
        @public @static @readonly @property
        @returns {string}
     */
    static get ezApiName() {
        return 'ezLocalBrowserInfo';
    }

    /**
        @public @static @readonly @property
        @returns {object}
     */
    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzLocalBrowserInfo_Ready'
        };
    }

    /**
        @public @static @readonly @property
        @returns {boolean}
     */
    static get ezCanRegister() {
        return 'PENDING' === EzLocalBrowserInfo.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready;
    }

    /**
        @private @static @method
        @returns {boolean}
     */
    static #ezRegistrator() {
        if (!EzLocalBrowserInfo.ezCanRegister) {
            return false;
        }

        ezApi.ezRegisterNewApi(
            EzLocalBrowserInfo,
            EzLocalBrowserInfo.ezApiName);
        EzLocalBrowserInfo.ezApiRegistrationState = 'REGISTERED';
        return true;
    }

    // Static constructor
    static {
        if (null == EzLocalBrowserInfo.ezApiRegistrationState) {
            EzLocalBrowserInfo.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                () => {
                    if (!EzLocalBrowserInfo.#ezRegistrator()) {
                        document.addEventListener(
                            EzEventEngine.ezEventNames.ezOnReady,
                            EzLocalBrowserInfo.#ezRegistrator);
                    }
                });
        }
    }

    constructor() {
        super();
    }

    ezBrowserInfo = '';
    ezIpAddresses = {};

    ezInit() {
        EzLocalBrowserInfo.ezInstance.ezGatherLocalBrowserInfo();
        return EzLocalBrowserInfo.ezInstance;
    }

    ezGatherLocalBrowserInfo() {
        EzLocalBrowserInfo.ezInstance.ezObtainIpFromRTCPeerConnection();
    }

    ezObtainIpFromRTCPeerConnection() {
        // NOTE: window.RTCPeerConnection is "not a constructor" in FF22/23
        let RTCPeerConnection = /*window.RTCPeerConnection ||*/ window.webkitRTCPeerConnection || window.mozRTCPeerConnection;

        if (!RTCPeerConnection) {
            EzLocalBrowserInfo.ezInstance.ezBrowserInfo = ezApi.ezTemplate`${EzLocalBrowserInfo.ezInstance}
                <div>Unable to obtain ip from RTCPeerConnection. RTCPeerConnection is not available for browser.</div>`;

            ezApi.ezclocker.logger.debug(
                ezApi.ezMsg`
                    Unable to obtain ip from RTCPeerConnection. RTCPeerConnection is not available for browser.
                    <code>ifconfig | grep inet | grep -v inet6 | cut -d" " -f2 | tail -n1</code>
                    <dev>In Chrome and Firefox your IP should display automatically, by the power of WebRTCskull.</dev>`);
            return;
        }

        let rtc = new RTCPeerConnection(
            {
                iceServers:[]
            }
        );

        let featureCheck = 1;
        if (featureCheck || window.mozRTCPeerConnection) {
            // FF [and now Chrome!] needs a channel/stream to proceed
            rtc.createDataChannel(
                '',
                {
                    reliable:false
                });
        }

        rtc.onicecandidate = (event) => {
            // convert the candidate to SDP so we can run it through our general parser
            // see https://twitter.com/lancestout/status/525796175425720320 for details
            if (event.candidate) {
                EzLocalBrowserInfo.ezInstance.ezGrepSDP(`a=${event.candidate.candidate}`);
            }
        };

        rtc.createOffer().then(
            (offerDesc) => {
                EzLocalBrowserInfo.ezInstance.ezGrepSDP(offerDesc.sdp);
                rtc.setLocalDescription(offerDesc);
            },
            (error) => {
                EzLocalBrowserInfo.ezInstance.ezBrowserInfo = ezApi.ezTemplate`${EzLocalBrowserInfo.ezInstance}
                    <div>
                        RTCPeerConnection offer to obtain ip address failed.
                        <div>Error: ${error.message}</div>
                    </div>`;
                ezApi.ezclocker.ezLogger.warn(
                    `RTCPeerConnection offer to obtain ip address failed. Error: ${error.message}`);
            });

        EzLocalBrowserInfo.ezInstance.ezIpAddresses['0.0.0.0'] = false;
    }

    ezDisplayIpAddress(ipAddress) {
        if (ipAddress in EzLocalBrowserInfo.ezInstance.ezIpAddresses) {
            return;
        }

        EzLocalBrowserInfo.ezInstance.ezIpAddresses[ipAddress] = true;

        let displayAddrs = Object
            .keys(EzLocalBrowserInfo.ezInstance.ezIpAddresses)
            .filter(
                (key) => EzLocalBrowserInfo.ezInstance.ezIpAddresses[ipAddress][key]);

        EzLocalBrowserInfo.ezInstance.ezBrowserInfo = ezApi.ezTemplate`
            ${EzLocalBrowserInfo.ezInstance.ezBrowserInfo}
            ${displayAddrs.join(' or perhaps ') || 'n/a'}`;

        ezApi.ezclocker.ezLogger.debug(
            ezApi.ezMsg`
                Local browser information: ${EzLocalBrowserInfo.ezInstance.ezBrowserInfo}`);
    }

    ezGrepSDP(sdp) {
        sdp.split('\r\n').forEach(
            (line) => {
                if (~line.indexOf('a=candidate')) {
                    let parts = line.split(' '),
                        addr = parts[4],
                        type = parts[7];
                    if (type === 'host') {
                        EzLocalBrowserInfo.ezInstance.ezDisplayIpAddress(addr);
                    }
                } else if (~line.indexOf('c=')) {
                    let parts = line.split(' '),
                        addr = parts[2];

                    EzLocalBrowserInfo.ezInstance.ezDisplayIpAddress(addr);
                }
            });
    }

    /**
        @public @method
        Obtain the local user IP4 address.
     */
    getPublicIP4() {
        ezApi.ezclocker.ezHttpHelper.ezGet(
            'https://api.ipify.org?format=json')
            .then(
                (response) => {
                    if (ezApi.ezIsValid(response) && ezApi.ezHasOwnProperty(response, 'ip')) {
                        EzLocalBrowserInfo.ezInstance.ezLocalIP4 = response.ip;
                    } else {
                        ezApi.ezclocker.logger.error(
                            ezApi.ezEM`
                                Unable to obtained the local IP4 from IPIFY.
                                Response: ${ezApi.ezToJson(response)}`);
                        EzLocalBrowserInfo.ezInstance.ezLocalIP4 = 'UNKNOWN';
                    }
                },
                (eResponse) => {
                    ezApi.ezclocker.logger.error(
                        ezApi.ezEM`
                            Unable to obtained the local IP4 from IPIFY.
                            Response: ${ezApi.ezToJson(eResponse)}`);
                });
    }

    /**
        @public @method
        Optain the local user IP6 address
     */
    getPublicIP6() {
        ezApi.ezclocker.ezHttpHelper.ezGet(
            'https://api64.ipify.org?format=json')
            .then(
                (response) => {
                    if (ezApi.ezIsValid(response) && ezApi.ezHasOwnProperty(response, 'ip')) {
                        EzLocalBrowserInfo.ezInstance.ezLocalIP4 = response.ip;
                    } else {
                        ezApi.ezclocker.logger.error(
                            ezApi.ezEM`
                                Unable to obtained the local IP6 from ipify.org api.
                                Response: ${ezApi.ezToJson(response)}`);
                        EzLocalBrowserInfo.ezInstance.ezLocalIP4 = 'UNKNOWN';
                    }
                },
                (eResponse) => {
                    ezApi.ezclocker.logger.error(
                        ezApi.ezEM`
                            Unable to obtained the local IP4 from ipify.org api.
                            Response: ${ezApi.ezToJson(eResponse)}`);
                });
    }
}

export {
    EzLocalBrowserInfo
};

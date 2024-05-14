import { EzEnum } from '/ezlibrary/enums/EzEnum.js';

// TODO: Convert from extending EzEnum to EzEnumeration2

/**
    @class
    @extends {EzEnum}
    @description
    Provides a constant for the event name to avoid typos
    -----------------------------------------------------------------
    Import into non-enumeration classes with:
        Import with:
        import {
            // ... other enumeration classes ...
            EzElementEventName
        } from '/ezlibrary/enums/EzEnumerations.js';
    -----------------------------------------------------------------
    Import into other enumeration classes with:
        import { EzElementEventName } from '/ezlibrary/EzElementEventName.js';
    -----------------------------------------------------------------
    Static access:
        EzElementEventName.{property or method name}
    -----------------------------------------------------------------
 */
export class EzElementEventName extends EzEnum {
    // Fires on a mouse click on the element
    static get CLICK() {
        return 'onclick';
    }
    static get _CLICK() {
        return {
            displayName: 'On Mouse Click',
            jQueryEventName: 'click',
            htmlEventName: 'onclick'
        };
    }
    // Fires on a mouse double-click on the element
    static get DOUBLE_CLICK() {
        return 'ondblclick';
    }
    static get _DOUBLE_CLICK() {
        return {
            displayName: 'On Mouse Double Click',
            jQueryEventName: 'ondblclick',
            htmlEventName: 'ondblclick'
        };
    }
    // Fires when a mouse button is pressed down on an element
    static get MOUSE_DOWN() {
        return 'onmousedown';
    }
    static get _MOUSE_DOWN() {
        return {
            displayName: 'On Mouse Down',
            jQueryEventName: 'mousedown',
            htmlEventName: 'onmousedown'
        };
    }
    // Fires when the mouse pointer is moving while it is over an element
    static get MOUSE_MOVE() {
        return 'onmousemove';
    }
    static get _MOUSE_MOVE() {
        return {
            displayName: 'On Mouse Move',
            jQueryEventName: 'onmousemove',
            htmlEventName: 'onmousemove'
        };
    }
    // Fires when the mouse pointer moves out of an element
    static get MOUSE_OUT() {
        return 'onmouseout';
    }
    static get _MOUSE_OUT() {
        return {
            displayName: 'On Mouse Out',
            jQueryEventName: 'mouseout',
            htmlEventName: 'onmouseout'
        };
    }
    // Fires when the mouse pointer moves over an element
    static get MOUSE_OVER() {
        return 'onmouseover';
    }
    static get _MOUSE_OVER() {
        return {
            displayName: 'On Mouse Over',
            jQueryEventName: 'mouseover',
            htmlEventName: 'onmouseover'
        };
    }
    // Fires when a mouse button is released over an element
    static get MOUSE_UP() {
        return 'onmouseup';
    }
    static get _MOUSE_UP() {
        return {
            displayName: 'On Mouse Up',
            jQueryEventName: 'mouseup',
            htmlEventName: 'onmouseup'
        };
    }
    // Fires when the mouse wheel rolls up or down over an element
    static get MOUSE_WHEEL() {
        return 'onwheel';
    }
    static get _MOUSE_WHEEL() {
        return {
            displayName: 'On Mouse Wheel',
            jQueryEventName: 'wheel',
            htmlEventName: 'onwheel'
        };
    }

    /*===========================================================
    | Drag EVENTS
    ===========================================================*/

    // Script to be run when an element is dragged
    static get DRAG() {
        return 'ondrag';
    }
    static get _DRAG() {
        return {
            displayName: 'On Drag',
            jQueryEventName: 'drag',
            htmlEventName: 'ondrag'
        };
    }
    // Script to be run at the end of a drag operation
    static get DRAG_END() {
        return 'ondragend';
    }
    static get _DRAG_END() {
        return {
            displayName: 'On Drag End',
            jQueryEventName: 'dragend',
            htmlEventName: 'ondragend'
        };
    }
    // Script to be run when an element has been dragged to a valid drop target
    static get DRAG_ENTER() {
        return 'ondragenter';
    }
    static get _DRAG_ENTER() {
        return {
            displayName: 'On Drag Enter',
            jQueryEventName: 'dragenter',
            htmlEventName: 'ondragenter'
        };
    }
    // Script to be run when an element leaves a valid drop target
    static get DRAG_LEAVE() {
        return 'ondragleave';
    }
    static get _DRAG_LEAVE() {
        return {
            displayName: 'On Drag Leave',
            jQueryEventName: 'dragleave',
            htmlEventName: 'ondragleave'
        };
    }
    // Script to be run when an element is being dragged over a valid drop target
    static get DRAG_OVER() {
        return 'ondragover';
    }
    static get _DRAG_OVER() {
        return {
            displayName: 'On Drag Over',
            jQueryEventName: 'dragover',
            htmlEventName: 'ondragover'
        };
    }
    // Script to be run at the start of a drag operation
    static get DRAG_START() {
        return 'ondragstart';
    }
    static get _DRAG_START() {
        return {
            displayName: 'On Drag Start',
            jQueryEventName: 'dragstart',
            htmlEventName: 'ondragstart'
        };
    }
    // Script to be run when dragged element is being dropped
    static get DRAG_DROP() {
        return 'ondrop';
    }
    static get _DRAG_DROP() {
        return {
            displayName: 'On Drag Drop',
            jQueryEventName: 'drop',
            htmlEventName: 'ondrop'
        };
    }
    // Script to be run when an element's scrollbar is being scrolled
    static get DRAG_SCROLL() {
        return 'onscroll';
    }
    static get _DRAG_SCROLL() {
        return {
            displayName: 'On Drag Scroll',
            jQueryEventName: 'scroll',
            htmlEventName: 'onscroll'
        };
    }

    /*===========================================================
    | Clipboard EVENTS
    ===========================================================*/

    // Fires when the user copies the content of an element
    static get COPY() {
        return 'oncopy';
    }
    static get _COPY() {
        return {
            displayName: 'On Clipboard Copy',
            jQueryEventName: 'copy',
            htmlEventName: 'oncopy'
        };
    }
    // Fires when the user cuts the content of an element
    static get CUT() {
        return 'oncut';
    }
    static get _CUT() {
        return {
            displayName: 'On Clipboard Cut',
            jQueryEventName: 'cut',
            htmlEventName: 'oncut'
        };
    }
    // Fires when the user pastes some content in an element
    static get PASTE() {
        return 'onpaste';
    }
    static get _PASTE() {
        return {
            displayName: 'On Cliboard Paste',
            jQueryEventName: 'paste',
            htmlEventName: 'onpaste'
        };
    }

    /*===========================================================
    | Keyboard EVENTS
    ===========================================================*/

    // Fires when a user is pressing a key
    static get KEY_DOWN() {
        return 'onkeydown';
    }
    static get _KEY_DOWN() {
        return {
            displayName: 'On Keyboard Key Down',
            jQueryEventName: 'keydown',
            htmlEventName: 'onkeydown'
        };
    }
    // Fires when a user presses a key
    static get KEY_PRESS() {
        return 'onkeypress';
    }
    static get _KEY_PRESS() {
        return {
            displayName: 'On Keyboard Key Press',
            jQueryEventName: 'keypress',
            htmlEventName: 'onkeypress'
        };
    }
    // Fires when a user releases a key
    static get KEY_UP() {
        return 'onkeyup';
    }
    static get _KEY_UP() {
        return {
            displayName: 'On Keyboard Key Up',
            jQueryEventName: 'keyup',
            htmlEventName: 'onkeyup'
        };
    }

    /*===========================================================
    | Input Events
    ===========================================================*/

    // Fires the moment that the element loses focus
    static get BLUR() {
        return 'onblur';
    }
    static get _BLUR() {
        return {
            displayName: 'On Input Blur',
            jQueryEventName: 'blur',
            htmlEventName: 'onblur'
        };
    }
    // Fires the moment when the value of the element is changed
    static get CHANGE() {
        return 'onchange';
    }
    static get _CHANGE() {
        return {
            displayName: 'On Input Change',
            jQueryEventName: 'change',
            htmlEventName: 'onchange'
        };
    }
    // Script to be run when a context menu is triggered
    static get CONTEXT_MENU() {
        return 'oncontextmenu';
    }
    static get _CONTEXT_MENU() {
        return {
            displayName: 'On Input Context Menu',
            jQueryEventName: 'contextmenu',
            htmlEventName: 'oncontextmenu'
        };
    }
    // Fires the moment when the element gets focus
    static get FOCUS() {
        return 'onfocus';
    }
    static get _FOCUS() {
        return {
            displayName: 'On Input Focus',
            jQueryEventName: 'focus',
            htmlEventName: 'onfocus'
        };
    }
    // Script to be run when an element gets user input
    static get INPUT() {
        return 'oninput';
    }
    static get _INPUT() {
        return {
            displayName: 'On Input',
            jQueryEventName: 'input',
            htmlEventName: 'oninput'
        };
    }
    // Script to be run when an element is invalid
    static get INVALID() {
        return 'oninvalid';
    }
    static get _INVALID() {
        return {
            displayName: 'On Input Invalid',
            jQueryEventName: 'invalid',
            htmlEventName: 'oninvalid'
        };
    }
    // Fires after some text has been selected in an element
    static get SELECT() {
        return 'onselect';
    }
    static get _SELECT() {
        return {
            displayName: 'On Input Select',
            jQueryEventName: 'select',
            htmlEventName: 'onselect'
        };
    }

    /*===========================================================
    | Form Events
    ===========================================================*/

    // Fires when the Reset button in a form is clicked
    static get RESET() {
        return 'onreset';
    }
    static get _RESET() {
        return {
            displayName: 'On Form Reset',
            jQueryEventName: 'reset',
            htmlEventName: 'onreset'
        };
    }
    // Fires when the user writes something in a search field (for <input="search">)
    static get SEARCH() {
        return 'onsearch';
    }
    static get _SEARCH() {
        return {
            displayName: 'On Form Search',
            jQueryEventName: 'onsearch',
            htmlEventName: 'onsearch'
        };
    }
    // Fires when a form is submitted
    static get SUBMIT() {
        return 'onsubmit';
    }
    static get _SUBMIT() {
        return {
            displayName: 'On Form Submit',
            jQueryEventName: 'onsubmit',
            htmlEventName: 'onsubmit'
        };
    }

    /*===========================================================
    | Window Events
    ===========================================================*/

    // Script to be run after the document is printed
    static get AFTER_PRINT() {
        return 'onafterprint';
    }
    static get _AFTER_PRINT() {
        return {
            displayName: 'On After Print',
            jQueryEventName: 'afterprint',
            htmlEventName: 'onafterprint'
        };
    }
    // Script to be run before the document is printed
    static get BEFORE_PRINT() {
        return 'onbeforeprint';
    }
    static get _BEFORE_PRINT() {
        return {
            displayName: 'On Before Print',
            jQueryEventName: 'beforeprint',
            htmlEventName: 'onbeforeprint'
        };
    }
    // Script to be run when the document is about to be unloaded
    static get BEFORE_UNLOAD() {
        return 'onbeforeunload';
    }
    static get _BEFORE_UNLOAD() {
        return {
            displayName: 'On Before Unload',
            jQueryEventName: 'beforeunload',
            htmlEventName: 'onbeforeunload'
        };
    }
    // Script to be run when an error occurs
    static get ERROR() {
        return 'onerror';
    }
    static get _ERROR() {
        return {
            displayName: 'On Error',
            jQueryEventName: 'error',
            htmlEventName: 'onerror'
        };
    }
    // Script to be run when there has been changes to the anchor part of the a URL
    static get HASH_CHANGE() {
        return 'onhashchange';
    }
    static get _HASH_CHANGE() {
        return {
            displayName: 'On Hash Change',
            jQueryEventName: 'hashchange',
            htmlEventName: 'onhashchange'
        };
    }
    // Fires after the page is finished loading
    static get LOAD() {
        return 'onload';
    }
    static get _LOAD() {
        return {
            displayName: 'On Load',
            jQueryEventName: 'load',
            htmlEventName: 'onload'
        };
    }
    // Script to be run when the message is triggered
    static get MESSAGE() {
        return 'onmessage';
    }
    static get _MESSAGE() {
        return {
            displayName: 'On Message',
            jQueryEventName: 'message',
            htmlEventName: 'onmessage'
        };
    }
    // Script to be run when the browser starts to work offline
    static get OFFLINE() {
        return 'onoffline';
    }
    static get _OFFLINE() {
        return {
            displayName: 'On Offline',
            jQueryEventName: 'offline',
            htmlEventName: 'onoffline'
        };
    }
    // Script to be run when the browser starts to work online
    static get ONLINE() {
        return 'ononline';
    }
    static get _ONLINE() {
        return {
            displayName: 'On Online',
            jQueryEventName: 'online',
            htmlEventName: 'ononline'
        };
    }
    // Script to be run when a user navigates away from a page
    static get PAGE_HIDE() {
        return 'onpagehide';
    }
    static get _PAGE_HIDE() {
        return {
            displayName: 'On Page Hide',
            jQueryEventName: 'pagehide',
            htmlEventName: 'onpagehide'
        };
    }
    // Script to be run when a user navigates to a page
    static get PAGE_SHOW() {
        return 'onpageshow';
    }
    static get _PAGE_SHOW() {
        return {
            displayName: 'On Page Show',
            jQueryEventName: 'pageshow',
            htmlEventName: 'onpageshow'
        };
    }
    // Script to be run when the window's history changes
    static get POP_STATE() {
        return 'onpopstate';
    }
    static get _POP_STATE() {
        return {
            displayName: 'On Pop State',
            jQueryEventName: 'popstate',
            htmlEventName: 'onpopstate'
        };
    }
    // Fires when the browser window is resized
    static get RESIZE() {
        return 'onresize';
    }
    static get _RESIZE() {
        return {
            displayName: 'On Resize',
            jQueryEventName: 'resize',
            htmlEventName: 'onresize'
        };
    }
    // Script to be run when a Web Storage area is updated
    static get STORAGE() {
        return 'onstorage';
    }
    static get _STORAGE() {
        return {
            displayName: 'On Storage',
            jQueryEventName: 'storage',
            htmlEventName: 'onstorage'
        };
    }
    // Fires once a page has unloaded (or the browser window has been closed)
    static get UNLOAD() {
        return 'onunload';
    }
    static get _UNLOAD() {
        return {
            displayName: 'On Unload',
            jQueryEventName: 'unload',
            htmlEventName: 'onunload'
        };
    }

    /*===========================================================
    | Media Events
    ===========================================================*/

    // Script to be run on abort
    static get MEDIA_ON_ABORD() {
        return 'onabort';
    }
    static get _MEDIA_ON_ABORD() {
        return {
            displayName: 'On Media Abort',
            jQueryEventName: 'abort',
            htmlEventName: 'onabort'
        };
    }
    // Script to be run when a file is ready to start playing (when it has buffered enough to begin)
    static get MEDIA_ON_CAN_PLAY() {
        return 'oncanplay';
    }
    static get _MEDIA_ON_CAN_PLAY() {
        return {
            displayName: 'On Media Can Play',
            jQueryEventName: 'canplay',
            htmlEventName: 'oncanplay'
        };
    }
    // Script to be run when a file can be played all the way to the end without pausing for buffering
    static get MEDIA_ON_CAN_PLAY_THROUGH() {
        return 'oncanplaythrough';
    }
    static get _MEDIA_ON_CAN_PLAY_THROUGH() {
        return {
            displayName: 'On Media Can Play Through',
            jQueryEventName: 'canplaythrough',
            htmlEventName: 'oncanplaythrough'
        };
    }
    // Script to be run when the cue changes in a <track> element
    static get MEDIA_ON_CUE_CHANGE() {
        return 'oncuechange';
    }
    static get _MEDIA_ON_CUE_CHANGE() {
        return {
            displayName: 'On Media Cue Change',
            jQueryEventName: 'cuechange',
            htmlEventName: 'oncuechange'
        };
    }
    // Script to be run when the length of the media changes
    static get MEDIA_ON_DURATION_CHANGE() {
        return 'ondurationchange';
    }
    static get _MEDIA_ON_DURATION_CHANGE() {
        return {
            displayName: 'On Media Duration Change',
            jQueryEventName: 'durationchange',
            htmlEventName: 'ondurationchange'
        };
    }
    // Script to be run when something bad happens and the file is suddenly unavailable (like unexpectedly disconnects)
    static get MEDIA_ON_EMPTIED() {
        return 'onemptied';
    }
    static get _MEDIA_ON_EMPTIED() {
        return {
            displayName: 'On Media Emptied',
            jQueryEventName: 'emptied',
            htmlEventName: 'onemptied'
        };
    }
    // Script to be run when the media has reach the end (a useful event for messages like "thanks for listening")
    static get MEDIA_ON_ENDED() {
        return 'onended';
    }
    static get _MEDIA_ON_ENDED() {
        return {
            displayName: 'On Media Ended',
            jQueryEventName: 'ended',
            htmlEventName: 'onended'
        };
    }
    // Script to be run when an error occurs when the file is being loaded
    static get MEDIA_ON_ERROR() {
        return 'onerror';
    }
    static get _MEDIA_ON_ERROR() {
        return {
            displayName: 'On Media Error',
            jQueryEventName: 'error',
            htmlEventName: 'onerror'
        };
    }
    // Script to be run when media data is loaded
    static get MEDIA_ON_LOADED_DATA() {
        return 'onloadeddata';
    }
    static get _MEDIA_ON_LOADED_DATA() {
        return {
            displayName: 'On Media Loaded Data',
            jQueryEventName: 'loadeddata',
            htmlEventName: 'onloadeddata'
        };
    }
    // Script to be run when meta data (like dimensions and duration) are loaded
    static get MEDIA_ON_LOADED_META_DATA() {
        return 'onloadedmetadata';
    }
    static get _MEDIA_ON_LOADED_META_DATA() {
        return {
            displayName: 'On Media Loaded Meta Data',
            jQueryEventName: 'loadedmetadata',
            htmlEventName: 'onloadedmetadata'
        };
    }
    // Script to be run just as the file begins to load before anything is actually loaded
    static get MEDIA_ON_LOAD_START() {
        return 'onloadstart';
    }
    static get _MEDIA_ON_LOAD_START() {
        return {
            displayName: 'On Media Load Start',
            jQueryEventName: 'loadstart',
            htmlEventName: 'onloadstart'
        };
    }
    // Script to be run when the media is paused either by the user or programmatically
    static get MEDIA_ON_PAUSE() {
        return 'onpause';
    }
    static get _MEDIA_ON_PAUSE() {
        return {
            displayName: 'On Media Pause',
            jQueryEventName: 'pause',
            htmlEventName: 'onpause'
        };
    }
    // Script to be run when the media is ready to start playing
    static get MEDIA_ON_PLAY() {
        return 'onplay';
    }
    static get _MEDIA_ON_PLAY() {
        return {
            displayName: 'On Media Play',
            jQueryEventName: 'play',
            htmlEventName: 'onplay'
        };
    }
    // Script to be run when the media actually has started playing
    static get MEDIA_ON_PLAYING() {
        return 'onplaying';
    }
    static get _MEDIA_ON_PLAYING() {
        return {
            displayName: 'On Media Playing',
            jQueryEventName: 'playing',
            htmlEventName: 'onplaying'
        };
    }
    // Script to be run when the browser is in the process of getting the media data
    static get MEDIA_ON_PROGRESS() {
        return 'onprogress';
    }
    static get _MEDIA_ON_PROGRESS() {
        return {
            displayName: 'On Media Progress',
            jQueryEventName: 'progress',
            htmlEventName: 'onprogress'
        };
    }
    // Script to be run each time the playback rate changes (like when a user switches to a slow motion or fast forward mode)
    static get MEDIA_ON_RATE_CHANGE() {
        return 'onratechange';
    }
    static get _MEDIA_ON_RATE_CHANGE() {
        return {
            displayName: 'On Media Rate Change',
            jQueryEventName: 'ratechange',
            htmlEventName: 'onratechange'
        };
    }
    // Script to be run when the seeking attribute is set to false indicating that seeking has ended
    static get MEDIA_ON_SEEKED() {
        return 'onseeked';
    }
    static get _MEDIA_ON_SEEKED() {
        return {
            displayName: 'On Media Seeked',
            jQueryEventName: 'seeked',
            htmlEventName: 'onseeked'
        };
    }
    // Script to be run when the seeking attribute is set to true indicating that seeking is active
    static get MEDIA_ON_SEEKING() {
        return 'onseeking';
    }
    static get _MEDIA_ON_SEEKING() {
        return {
            displayName: 'On Media Seeking',
            jQueryEventName: 'seeking',
            htmlEventName: 'onseeking'
        };
    }
    // Script to be run when the browser is unable to fetch the media data for whatever reason
    static get MEDIA_ON_STALLED() {
        return 'onstalled';
    }
    static get _MEDIA_ON_STALLED() {
        return {
            displayName: 'On Media Stalled',
            jQueryEventName: 'stalled',
            htmlEventName: 'onstalled'
        };
    }
    // Script to be run when the playing position has changed (like when the user fast forwards to a different point in the media)
    static get MEDIA_ON_TIME_UPDATE() {
        return 'ontimeupdate';
    }
    static get _MEDIA_ON_TIME_UPDATE() {
        return {
            displayName: 'On Media Time Update',
            jQueryEventName: 'timeupdate',
            htmlEventName: 'ontimeupdate'
        };
    }
    // Script to be run each time the volume is changed which (includes setting the volume to "mute")
    static get MEDIA_ON_VOLUME_CHANGE() {
        return 'onvolumechange';
    }
    static get _MEDIA_ON_VOLUME_CHANGE() {
        return {
            displayName: 'On Media Volume Change',
            jQueryEventName: 'volumechange',
            htmlEventName: 'onvolumechange'
        };
    }
    // Script to be run when the media has paused but is expected to resume (like when the media pauses to buffer more data)
    static get MEDIA_ON_WAITING() {
        return 'onwaiting';
    }
    static get _MEDIA_ON_WAITING() {
        return {
            displayName: 'On Media Waiting',
            jQueryEventName: 'waiting',
            htmlEventName: 'onwaiting'
        };
    }

    /*===========================================================
    | Other Events
    ===========================================================*/

    // Fires when the user opens or closes the <details> element
    static get TOGGLE() {
        return 'ontoggle';
    }
    static get _TOGGLE() {
        return {
            displayName: 'On Details Toggle',
            jQueryEventName: 'toggle',
            htmlEventName: 'ontoggle'
        };
    }

    static ezToJQueryEventName(enumValue) {
        return EzElementEventName[`_${enumValue.toUpperCase()}`]['jQueryEventName'];
    }

    /** @public @static @property */
    static ezApiName = 'EzElementEventName';
    static ezEventNames = {
        onReady: 'ezOn_EzElementEventName_Ready'
    };
    /** @public @static @property */
    static ezInstance = null;
    /** @public @static @property */
    static ezApiRegistrationState = null;
    /** @public @static @method */
    static ezCanRegister() {
        return 'PENDING' === EzElementEventName.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready;
    }
    /** @public @static @method */
    static ezRegistrator() {
        if (!EzElementEventName.ezCanRegister()) {
            return false;
        }

        EzElementEventName.ezInstance = ezApi.ezRegisterEnumeration(EzElementEventName);
        EzElementEventName.ezApiRegistrationState = 'REGISTERED';
        return true;
    }
    // Static Constructor
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            if (!this.ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    this.ezRegistrator);
            }
        }
    }

    constructor() {
        super();
    }
}

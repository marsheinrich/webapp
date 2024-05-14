import { EzEnum } from '/ezlibrary/enums/EzEnum.js';

/**
    @deprecated
    Use EzElementEventName instead.
    EzUIEventName.js Will get removed in a future release.
 */
class EzUIEventName extends EzEnum {
    static get ON_AFTER_PRINT() {
        return 'onafterprint';
    }
    static get ON_WINDOW_BEFORE_PRINT() {
        return 'onbeforeprint';
    }
    static get ON_WINDOW_BEFORE_UNLOAD() {
        return 'onbeforeunload';
    }
    static get ON_WINDOW_ERROR() {
        return 'onerror';
    }
    static get ON_WINDOW_HASH_CHANGE() {
        return 'onhashchange';
    }
    static get ON_WINDOW_LOAD() {
        return 'onload';
    }
    static get ON_WINDOW_MESSAGE() {
        return 'onmessage';
    }
    static get ON_WINDOW_OFFLINE() {
        return 'onoffline';
    }
    static get ON_WINDOW_ONLINE() {
        return 'ononline';
    }
    static get ON_WINDOW_PAGE_HID() {
        return 'onpagehid';
    }
    static get ON_PAGE_SHOW() {
        return 'onpageshow';
    }
    static get ON_POP_STATE() {
        return 'onpopstate';
    }
    static get ON_RESIZE() {
        return 'onresize';
    }
    static get ON_STORAGE() {
        return 'onstorage';
    }
    static get ON_UNLOAD() {
        return 'onunload';
    }
    static get ON_INPUT_BLUR() {
        return 'onblur';
    }
    static get ON_INPUT_CHANGE() {
        return 'onchange';
    }
    static get ON_INPUT_CONTEXT_MENU() {
        return 'oncontextmenu';
    }
    static get ON_INPUT_FOCUS() {
        return 'onfocus';
    }
    static get ON_INPUT() {
        return 'oninput';
    }
    static get ON_INPUT_INVALID() {
        return 'oninvalid';
    }
    static get ON_INPUT_REST() {
        return 'onreset';
    }
    static get ON_INPUT_SEARCH() {
        return 'onsearch';
    }
    static get ON_INPUT_SELECT() {
        return 'onselect';
    }
    static get ON_INPUT_SUBMIT() {
        return 'onsubmit';
    }
    static get ON_KEY_DOWN() {
        return 'onkeydown';
    }
    static get ON_KEY_PRESS() {
        return 'onkeypres';
    }
    static get ON_KEY_UP() {
        return 'onkeyup';
    }
    static get ON_MOUSE_CLICK() {
        return 'onclick';
    }
    static get ON_MOUSE_DBL_CLICK() {
        return 'ondblclick';
    }
    static get ON_MOUSE_DOWN() {
        return 'onmousedown';
    }
    static get ON_MOUSE_MOVE() {
        return 'onmousemove';
    }
    static get ON_MOUSE_OUT() {
        return 'onmouseout';
    }
    static get ON_MOUSE_OVER() {
        return 'onmouseover';
    }
    static get ON_MOUSE_UP() {
        return 'onmouseup';
    }
    static get ON_MOUSE_WHEEL() {
        return 'onwheel';
    }
    static get ON_DRAG() {
        return 'ondrag';
    }
    static get ON_DRAG_END() {
        return 'ondragend';
    }
    static get ON_DRAG_ENTER() {
        return 'ondragenter';
    }
    static get ON_DRAG_LEAVE() {
        return 'ondragleave';
    }
    static get ON_DRAG_OVER() {
        return 'ondragover';
    }
    static get ON_DRAG_START() {
        return 'ondragstart';
    }
    static get ON_DRAG_DROP() {
        return 'ondrop';
    }
    static get ON_DRAG_SCROLL() {
        return 'onscroll';
    }
    static get ON_CLIPBOARD_COPY() {
        return 'oncopy';
    }
    static get ON_CLIPBOARD_CUT() {
        return 'oncut';
    }
    static get ON_CLIPBOARD_PASTE() {
        return 'onpaste';
    }
    static get ON_MEDIA_ABORT() {
        return 'onabort';
    }
    static get ON_MEDIA_CAN_PLAY() {
        return 'oncanplay';
    }
    static get ON_MEDIA_CAN_PLAY_THROUGH() {
        return 'oncanplaythrough';
    }
    static get ON_MEDIA_CUE_CHANGE() {
        return 'oncuechange';
    }
    static get ON_MEDIA_DURATION_MEDIA_CHANGE() {
        return 'ondurationchange';
    }
    static get ON_MEDIA_EMPTIED() {
        return 'onemptied';
    }
    static get ON_MEDIA_ENDED() {
        return 'onended';
    }
    static get ON_MEDIA_ERROR() {
        return 'onerror';
    }
    static get ON_MEDIA_ON_MEDIA_LOAD_DATA() {
        return 'onloadeddata';
    }
    static get ON_MEDIA_LOAD_META_DATA() {
        return 'onloadedmetadata';
    }
    static get ON_MEDIA_LOAD_START() {
        return 'onloadstart';
    }
    static get ON_MEDIA_PAUSE() {
        return 'onpause';
    }
    static get ON_MEDIA_PLAY() {
        return 'onplay';
    }
    static get ON_MEDIA_PLAYING() {
        return 'onplaying';
    }
    static get ON_MEDIA_PROGRESS() {
        return 'onprogress';
    }
    static get ON_MEDIA_RATE_CHANGE() {
        return 'onratechange';
    }
    static get ON_MEDIA_SEEKED() {
        return 'onseeked';
    }
    static get ON_MEDIA_SEEKING() {
        return 'onseeking';
    }
    static get ON_MEDIA_STALLED() {
        return 'onstalled';
    }
    static get ON_MEDIA_SUSPEND() {
        return 'onsuspend';
    }
    static get ON_MEDIA_TIME_UPDATE() {
        return 'ontimeupdate';
    }
    static get ON_MEDIA_VOLUME_CHANGE() {
        return 'onvolumechange';
    }
    static get ON_MEDIA_WAITING() {
        return 'onwaiting';
    }
    static get ON_TOGGLE() {
        return 'ontoggle';
    }

    static ezApiName = 'EzUIEventName';
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzUIEventName.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis['ezApi'] && globalThis['ezApi'].ready;
    }
    static ezRegistrator() {
        if (EzUIEventName.ezCanRegister()) {
            EzUIEventName.ezInstance = ezApi.ezRegisterEzEnum(EzUIEventName);

            EzUIEventName.ezApiRegistrationState = 'REGISTERED';
        }
    }
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            document.addEventListener(
                'onEzApiReady',
                this.ezRegistrator);
        }
    }

    constructor() {
        super();
    }
}


export {
    EzUIEventName
};

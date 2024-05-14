/** eslint-disable no-unused-vars */
import { EzBadParamException } from '/ezlibrary/exceptions/EzBadParamException.js';

import { EzClass } from '/ezlibrary/EzClass.js';
import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzClockerContextEventName } from '/ezlibrary/EzClockerContext/EzClockerContextEventName.js';
import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';
import { EzUI } from '/public/javascript/common/ezui.js';
import { EzDialog } from '/public/javascript/common/ezclocker-dialog-helper.js';

class EzImageUploader extends EzClass {
    static ezInstance = null;
    static ezApiRegistrationState = null;

    static get ezApiName() {
        return 'ezImageUploader';
    }

    static get ezEventNames() {
        return {
            onReady: 'ezOn_ezImageUploader_Ready'
        };
    }

    static get ezCanRegister() {
        return 'PENDING' === EzImageUploader.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzClockerContextEventName.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerContextEventName.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzDialog.ezApiName] &&
            globalThis.ezApi.ezclocker[EzDialog.ezApiName].ready;
    }

    static #ezRegistrator() {
        if (!EzImageUploader.ezCanRegister) {
            return false;
        }
        ezApi.ezRegisterNewApi(
            EzImageUploader,
            EzImageUploader.ezApiName);
        EzImageUploader.ezApiRegistrationState = 'REGISTERED';
        return true;
    }

    // Static constructor
    static {
        if (null == EzImageUploader.ezApiRegistrationState) {
            EzImageUploader.ezApiRegistrationState = 'PENDING';

            if (!this.#ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    EzImageUploader.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzImageUploader.#ezRegistrator);

                document.addEventListener(
                    EzClockerContextEventName.ezEventNames.onReady,
                    EzImageUploader.#ezRegistrator);

                document.addEventListener(
                    EzClockerContext.ezEventNames.onReady,
                    EzImageUploader.#ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.onReady,
                    EzImageUploader.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzImageUploader.#ezRegistrator);

                document.addEventListener(
                    EzDialog.ezEventNames.onReady,
                    EzImageUploader.#ezRegistrator);
            }
        }
    }

    constructor() {
        super();
    }

    get hoverCls() {
        return 'file-hover';
    }

    get fileDrop() {
        return $('[data-droppable=""]');
    }

    get fileInput() {
        return $('[data-droppable-input=""]');
    }

    get fileImage() {
        return $('[data-droppable-image=""]');
    }

    ezInit() {
        EzImageUploader.ezInstance.fileDrop[0].ondragover = EzImageUploader.ezInstance.ezFileHover;
        EzImageUploader.ezInstance.fileDrop[0].ondragleave = EzImageUploader.ezInstance.ezFileHover;
        EzImageUploader.ezInstance.fileDrop[0].ondrop = EzImageUploader.ezInstance.ezFileSelect;
        EzImageUploader.ezInstance.fileInput[0].onchange = EzImageUploader.ezInstance.ezFileSelect;
    }

    ezShow(parentId) {
        let self = EzImageUploader.ezInstance;
        ezApi.ezclocker.ezUi.ezContent(parentId, self.ezBuildUploadImageHtml());
    }

    ezFileSelect(event) {
        let self = EzImageUploader.ezInstance;
        self.fileHover(event);

        let files = event.target.files || ev.dataTransfer.files;
        let reader = new FileReader();
        reader.onload = function (ev) {
            self.fileImage.css(
                'background-image',
                `url(${ev.target.result})`);
        };

        reader.readAsDataURL(files[0]);
    }

    ezFileHover(event) {
        let self = EzImageUploader.ezInstance;

        event.stopPropagation();
        event.preventDefault();
        if ('dragover' === event.type) {
            self.fileDrop.addClass(self.hoverCls);
        } else {
            self.fileDrop.removeClass(self.hoverCls);
        }
    }

    ezBuildUploadImageHtml() {
        return ezApi.ezTemplate`
            <div class="panel">
                <h2 class="panel-head">click or drag file</h2>
                <div class="panel-content">
                <label for="image">
                    <form action="" class="image-select" data-droppable="">
                        <input id="image" type="file" data-droppable-input=""/>
                            <i class="fa fa-camera fa-2x image-select__icon"></i>
                            <div class="image-select__message"></div>
                            <div class="bg-image aspect-square"
                                style="background-image: url('http://placekitten.com/g/300/300');" data-droppable-image=""></div>
                    </form>
                </label>
            </div>
        </div>`;
    }
}

export {
    EzImageUploader
};
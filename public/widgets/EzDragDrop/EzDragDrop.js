import { EzElementEventName } from '/ezlibrary/EzElementEventName.js';

class EzDragDrop {
    constructor() {
        this.ezTypeName = 'EzDragDrop';

        this.ezRegisterdWrappers = {};
    }

    ezMakeDraggable(elementId) {
        var self = ezApi.ezclocker[EzDragDrop.ezApiName];

        if (!ezApi.ezStringHasLength(elementId)) {
            throw ezApi.ezBadParam('elementId', this.ezTypeName, 'ezMakeDraggable');
        }

        // Get reference to the element
        let element = ezUi.ezFindByElementOrId(elementId);
        if (!ezApi.ezIsValid(element)) {
            throw ezApi.ezException(ezApi.ezEM`Unable to find an element with id=${elementId}.`);
        }

        // Get reference to the element's parent
        let parentElement = ezUi.ezGetElementParent(element);
        if (!ezApi.ezIsValid(parentElement)) {
            throw ezApi.ezException(
                ezApi.ezEM`Unable to wrap element with id=${elementId}. Element does not have a parent!`);
        }

        // Create the drag wrapper element
        let wrapperId = ezApi.ezIdTemplate`${elementId}_EzDragWrapper`;
        let wrapperElement = document.createElement('div');
        wrapperElement.id = wrapperElement;
        wrapperElement.classList.add('ezDragWrapper');
        wrapperElement.draggable = true;
        self.ezRegisterdWrappers[wrapperId] = wrapperElement;

        // Swap the element with the drag wrapper in the parent
        parentElement.replaceChild(wrapperElement, element);

        // append the element to the drag wrapper.
        wrapperElement.appendChild(element);

        // Hook events
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            wrapperElement.id,
            EzElementEventName.DRAG_START,
            wrapperId,
            (event) => self.ezHandleDragStart(wrapperId, event));
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            wrapperElement.id,
            EzElementEventName.DRAG,
            wrapperId,
            (event) => self.ezHandleDrag(wrapperId, event));
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            wrapperElement.id,
            EzElementEventName.DRAG_ENTER,
            wrapperId,
            (event) => self.ezHandleDragEnter(wrapperId, event));
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            wrapperElement.id,
            EzElementEventName.DRAG_LEAVE,
            wrapperId,
            (event) => self.ezHandleDragLeave(wrapperId, event));
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            wrapperElement.id,
            EzElementEventName.DRAG_OVER,
            wrapperId,
            (event) => self.ezHandleDragOver(wrapperId, event));
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            wrapperElement.id,
            EzElementEventName.DRAG_END,
            wrapperId,
            (event) => self.ezHandleDragEnd(wrapperId, event));
    }

    ezHandleDragStart(wrapperId, event) {
        var self = ezApi.ezclocker[EzDragDrop.ezApiName];
        self.ezRegisterdWrappers[wrapperId].classList.add('ezDragStart');
    }

    ezHandleDrag(wrapperId, event) {
        var self = ezApi.ezclocker[EzDragDrop.ezApiName];
    }

    ezHandleDragEnter(wrapperId, event) {
        var self = ezApi.ezclocker[EzDragDrop.ezApiName];
    }

    ezHandleDragLeave(wrapperId, event) {
        var self = ezApi.ezclocker[EzDragDrop.ezApiName];
    }

    ezHandleDragOver(wrapperId, event) {
        var self = ezApi.ezclocker[EzDragDrop.ezApiName];
    }

    ezHandleDragEnd(wrapperId, event) {
        var self = ezApi.ezclocker[EzDragDrop.ezApiName];
        self.ezRegisterdWrappers[wrapperId].classList.remove('ezDragStart');
    }
}
EzDragDrop.ezApiName = 'ezDragDrop';

export {
    EzDragDrop
};

document.addEventListener('onEzApiReady',
    () => ezApi.ezRegisterNewApi(EzDragDrop, EzDragDrop.ezApiName));
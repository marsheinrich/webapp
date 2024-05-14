import { EzTimeEntryHintType  } from '/secure/widgets/EzTimeEntryHint/EzTimeEntryHintType.js';

class EzTimeEntryHint {
    constructor(ezTimeEntryHintType, timeEntryId, hintMessage, hintData) {
        this.ezTypeName = 'EzTimeEntryHint';

        if (!ezApi.ezStringHasLength(ezTimeEntryHintType)) {
            throw ezApi.ezBadParam('ezTimeEntryHintType', this.ezTypeName, 'constructor');
        }

        this.ezTimeEntryHintType = ezTimeEntryHintType;
        this.timeEntryId = ezApi.ezIsNumber(timeEntryId)
            ? timeEntryId
            : -1;
        this.ezHintMessage = ezApi.ezStringHasLength(hintMessage)
            ? hintMessage
            : EzTimeEntryHintType.ezToDefaultMessage(ezTimeEntryHintType);
        this.ezHintData = hintData;
        this.parentId = null;

        this.ezHintContainerId = ezApi.ezIdTemplate`EzTimeEntryHintContainer_${this.ezTimeEntryId}`;
        this.ezHintImageId = ezApi.ezIdTemplate`EzTimeEntryHintImage_${self.ezTimeEntryId}`;
    }

    /**
        @public
        Getter for the hint's type
     */
    ezGetTimeEntryHintType() {
        return this.ezTimeEntryHintType;
    }

    /**
        @public
        Setter for EzTimeEntryHintType
     */
    ezSetTimeEntryHintType(ezTimeEntryHintType) {
        if (!ezApi.ezStringHasLength(ezTimeEntryHintType)) {
            throw ezApi.ezBadParam('ezTimeEntryHintType', this.ezTypeName, 'ezSetTimeEntryHintType');
        }

        this.ezTimeEntryHintType = ezTimeEntryHintType;
        if (ezUi.ezElementExists(this.ezHintImageId)) {
            ezUi.ezSetElementProp(this.ezHintImageId, 'src', EzTimeEntryHintType.ezToNormalImg(ezTimeEntryHintType));
        }
    }

    /**
        @public
        Getter for the hint's message
     */
    ezGetMessage() {
        return this.ezHintMessage;
    }

    /**
        @public
        Setter for the hint's message
     */
    ezSetMessage(hintMessage) {
        this.ezHintMessage = ezApi.ezStringHasLength(hintMessage)
            ? hintMessage
            : '';
        if (ezUi.ezElementExists(this.ezHintImageId)) {
            ezUi.ezSetElementProp(this.ezHintImageId, 'alt', this.ezHintMessage);
        }
    }

    /**
        @public
        Getter for the hint's optional data store
     */
    ezGetData() {
        return this.ezHintData;
    }

    /**
        @public
        Setter for the hint's optional data store
     */
    ezSetData(hintData) {
        this.ezHintData = hintData;
    }

    /**
        @public
        Injects the hint image into the parent element
     */
    ezInjectTimeEntryHint(parentId) {
        let self = this;

        if (!ezUi.ezElementExists(parentId)) {
            throw ezApi.ezBadParam('parentId', this.ezTypeName, 'ezInjectTimeEntryHint');
        }

        this.ezRemoveTimeEntryHint();

        this.ezParentId = parentId;

        ezUi.ezContent(parentId, this.ezBuildTimeEntryHintHtml());

        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            self.ezHintContainerId,
            'onmouseenter',
            EzTimeEntryHint.ezApiName, () => ezUi.ezSetElementProp(self.ezHintImageId,
                EzTimeEntryHintType.ezToHoverImageName(self.ezTimeEntryHintType)));
        ezApi.ezclocker.ezEventEngine.ezWantElementEvent(
            self.ezHintContainerId,
            'onmouseleave',
            EzTimeEntryHint.ezApiName, () => ezUi.ezSetElementProp(self.ezHintImageId,
                EzTimeEntryHintType.ezToNormalImageName(self.ezTimeEntryHintType)));
    }

    /**
        @public
        Removes the hint from the UX (if possible)
     */
    ezRemoveTimeEntryHint() {
        if (null !== this.ezParentId) {
            this.ezRemoveTimeEntryHint();
        }

        ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
            self.ezHintContainerId,
            'onmouseenter',
            EzTimeEntryHint.ezApiName);
        ezApi.ezclocker.ezEventEngine.ezUnwantElementEvent(
            self.ezHintContainerId,
            'onmouseleave',
            EzTimeEntryHint.ezApiName);

        ezUi.ezRemove(this.ezHintContainerId);
    }

    /**
        @protected
        Builds the TImeEntryHint html UX
     */
    ezBuildTimeEntryHintHtml() {
        return ezApi.ezTemplate`
            <div id="${this.ezHintContainerId}" class="ezHintImageContainer">
                <img id="EzTimeEntryHintImage_${self.ezTimeEntryId}" class="hintImage"
                    src="${ezApi.ezclocker.nav.getPublicPageUrl(this.ezTimeEntryHintType.ezToNormalImgUrl)}"
                    alt="${this.ezHintMesssage}">
            </div>`;
    }
}

EzTimeEntryHint.IMG_ERROR = 'images/error.ico';
EzTimeEntryHint.IMG_ERROR_HOVER = 'images/error_hot.ico';
EzTimeEntryHint.IMG_WARNING = 'images/warning.ico';
EzTimeEntryHint.IMG_WARNING_HOVER = 'images/warning_hot.ico';
EzTimeEntryHint.IMG_GOOD = 'images/good.ico';
EzTimeEntryHint.IMG_GOOD_HOVER = 'images/good_hot.ico';

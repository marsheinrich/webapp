import { EzElementEventName } from '/ezlibrary/EzElementEventName.js';
import { EzPageControllerConfig } from '/ezlibrary/EzPageControllerConfig.js';
import { EzBasePageController } from '/ezlibrary/EzBasePageController.js';

/**
    Controller for the Admin View page.
 */
class EzAdminViewController extends EzBasePageController {
    constructor(ezPageControllerConfig) {
        super(ezPageControllerConfig);
    }

    /**
        @override
        @protected
        Initializes the UX for the Admin Page View
     */
    ezInitUX() {
        super.ezInitUx();
        let self = ezApi.ezclocker[EzAdminViewController.ezApiName];
        self.ezBuildFindUsersLikeSearchHtml();
    }

    /**
        @protected
        Builds the find-users search UX
     */
    ezBuildFindUsersLikeSearchHtml() {
        let self = ezApi.ezclocker[EzAdminViewController.ezApiName];

        let findUsersLikeContainerIds = self.ezAppendSubContainer(
            self.ezGetIds()
                .body
                .containers
                .contentContainerId,
            'findUsersLikeContainerId',
            'FindUsersLikeContainer',
            'ezPageContentBlock',
            self);

        findUsersLikeContainerIds.userNameInputContainerId =
            ezApi.ezIdTemplate`${findUsersLikeContainerIds.id}_UserNameInputContainer`;
        findUsersLikeContainerIds.userNameInputLabelId =
            ezApi.ezIdTemplate`${findUsersLikeContainerIds.id}_UserNameInputLabel`;
        findUsersLikeContainerIds.userNameInputId =
            ezApi.ezIdTemplate`${findUsersLikeContainerIds.id}_UserNameInput`;

        findUsersLikeContainerIds.userNameInputContainerId =
            ezApi.ezIdTemplate`${findUsersLikeContainerIds.id}_PhoneNumberInputContainer`;
        findUsersLikeContainerIds.phoneNumberInputLabelId =
            ezApi.ezIdTemplate`${findUsersLikeContainerIds.id}_PhoneNumberInputLabel`;
        findUsersLikeContainerIds.phoneNumberInputId =
            ezApi.ezIdTemplate`${findUsersLikeContainerIds.id}_PhoneNumberInput`;

        findUsersLikeContainerIds.findUsersButtonContainerId =
            ezApi.ezIdTemplate`${findUsersLikeContainerIds.id}_FindUsersButtonContainer`;
        findUsersLikeContainerIds.findUsersButtonId =
            ezApi.ezIdTemplate`${findUsersLikeContainerIds.id}_FindUsersButton`;

        findUsersLikeContainerIds.resultsContainerId =
            ezApi.ezIdTemplate`${findUsersLikeContainerIds.id}_ResultsContainer`;

        ezUi.ezContent(
            findUsersLikeContainerIds.id,
            ezApi.ezTemplate`
                <div id="${findUsersLikeContainerIds.userNameInputContainerId}" class="ezInputContainer">
                    <label for="${findUsersLikeContainerIds.userNameInputId}"
                        id="${findUsersLikeContainerIds.userNameInputLabelId}">
                        Enter user name query value:
                    </label>
                    <input id="${findUsersLikeContainerIds.userNameInputId}" type="text">
                </div>
                <div id="${findUsersLikeContainerIds.userNameInputContainerId}" class="ezInputContainer">
                    <label for="${findUsersLikeContainerIds.phoneNumberInputId}"
                        id="${findUsersLikeContainerIds.phoneNumberInputLabelId}">
                        Enter user name query value:
                    </label>
                    <input id="${findUsersLikeContainerIds.phoneNumberInputId}" type="text">
                </div>
                <div id="${findUsersLikeContainerIds.findUsersButtonContainerId}">
                    <button id="${findUsersLikeContainerIds.findUsersButtonId}" class="">
                        Find users ...
                    </button>
                </div>
                <div id="${findUsersLikeContainerIds.resultsContainerId}" class="ezContainer-border-box">
                </div>`);

        // Wire up events
        ezApi.ezWantElementEvent(
            findUsersLikeContainerIds.findUsersButtonId,
            EzElementEventName.CLICK,
            EzAdminViewController.ezApiName,
            self.ezHandleFindUsersLikeButtonClick);
    }

    /**
        [EVENT HANDLER: HTML Element Click Event]
        @protected
        Handles the find-users query button click event.
     */
    ezHandleFindUsersLikeButtonClick() {
        let self = ezApi.ezclocker[EzAdminViewController.ezApiName];

        return ezUi.ezPageWaitExecute('Finding users ...', (finished) => {
            let userNameLike = ezUi.ezGetInputValue(self.ezGetIds()
                .body
                .containers
                .findUsersLikeContainerId
                .userNameInputId);
            let contactNumberLike = ezUi.ezGetInputValue(self.ezGetIds()
                .body
                .containers
                .findUsersLikeContainerId
                .phoneNumberInputId);
            let url = ezApi.ezclocker.nav.ezGetInternalApiUrl(
                ezApi.ezUrlTemplate`/_api/v1/ezadmin/find-users
                    ?user-name-like=${userNameLike}
                    &contact-number-like=${contactNumberLike}`);

            return ezApi.ezclocker.http.ezGet(url).then(
                (response) => {
                    self.ezRenderFindUserResults(response);
                    return finished(response);
                },
                (eResponse) => {
                    self.ezRenderFindUserError(eResponse);
                    return finished(eResponse);
                });
        });
    }

    /**
        @protected
        Renders the success response from the find-users query
        @param {Object} response
     */
    ezRenderFindUserResults(response) {
        let self = ezApi.ezclocker[EzAdminViewController.ezApiName];

        ezUi.ezContent(
            self.ezGetIds()
                .findUsersLikeContainerId
                .resultsContainerId,
            ezApi.ezToJson(response, 3, true));
    }

    /**
        @protected
        Renders the error response from the find-users query
        @param {Object} eResponse
     */
    ezRenderFindUserError(eResponse) {
        let self = ezApi.ezclocker[EzAdminViewController.ezApiName];

        ezUi.ezContent(
            self.ezGetIds()
                .findUsersLikeContainerId
                .resultsContainerId,
            eResponse.message);
    }
}
EzAdminViewController.ezApiName = 'ezAdminViewController';

document.addEventListener('onEzApiReady', () => {
    window.ezApi.ezRegisterApi(
        EzAdminViewController.ezApiName,
        new EzAdminViewController(
            new EzPageControllerConfig(
                EzAdminViewController.ezApiName,
                'ezAdminPage')));
});

export {
    EzAdminViewController
};
import { EzInstanceState } from '/ezlibrary/EzInstanceState.js';

import { EzNavigation } from '/public/javascript/common/ezclocker-navigation-helper.js';

import { EzDialogConfig } from '/ezlibrary/ux/dialogs/EzDialogConfig.js';

import { EzUI } from '/public/javascript/common/ezui.js';


/**
 * Dialog informing the user that they do not have any available employees
 */
class EzNoAvailEmplDialog {
    static ezInstance = null;
    static ezApiRegistrationState = null;

    static get ezApiName() {
        return 'ezNoAvailEmplDialog';
    }

    static get ezEventNames() {
        return {
            onReady: 'ezOn_EzNoAvailEmplDialog_Ready'
        };
    }

    static get ezCanRegister() {
        return 'PENDING' === EzNoAvailEmplDialog.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzNavigation.ezApiName] &&
            globalThis.ezApi.ezclocker[EzNavigation.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready;

    }

    static #ezRegistrator() {
        if (!EzNoAvailEmplDialog.ezCanRegister) {
            return false;
        }
        EzNoAvailEmplDialog.ezInstance = ezApi.ezRegisterNewApi(
            EzNoAvailEmplDialog,
            EzNoAvailEmplDialog.ezApiName);

        EzNoAvailEmplDialog.ezApiRegistrationState = 'REGISTERED';
        return true;
    }

    // Static Initialization
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            if (!this.#ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    this.#ezRegistrator);

                document.addEventListener(
                    EzNavigation.ezEventNames.onReady,
                    this.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    this.#ezRegistrator);
            }
        }
    }

    constructor() {
        this.ezStates.push(EzInstanceState.CONSTRUCTED);
    }

    ready = false;
    ezStates = [];
    get ezDialogId() {
        return 'EzNoAvailEmployeeSlotsDialog';
    }


    /**
     * @protected
     * Initializes the EzNoAvailEmplDialog
     *
     * @returns {EzNoAvailEmplDialog}
     */
    ezInit() {
        EzNoAvailEmplDialog.ezInstance.ezInitUX();
        return EzNoAvailEmplDialog.ezInstance;
    }

    /**
     * @protected
     * Initializes the EzNoAvailEmplDialog UX
     */
    ezInitUX() {
        const self = EzNoAvailEmplDialog.ezInstance;

        ezApi.ezclocker.ezUi.ezAppendContent(
            '_HideDialogsDiv',
            self.ezBuildDialogHTML());

        let dialogConfig = new EzDialogConfig(self.ezDialogId);
        dialogConfig.width = 500;
        dialogConfig.buttons = {
            Yes: {
                text: 'Yes',
                id: ezApi.ezIdTemplate`${self.ezDialogId}_YesButton`,
                click: self.ezSubmit
            },
            No: {
                text: 'No',
                id: ezApi.ezIdTemplate`${self.ezDialogId}_NoButton`,
                click: self.ezClose
            }
        };

        ezApi.ezclocker.ezDialog.ezInitDialogWithConfig(self.ezDialogId, dialogConfig);
    }

    ezBuildDialogHTML() {
        const self = EzNoAvailEmplDialog.ezInstance;

        return ezApi.ezTemplate`
            <div id="${self.ezDialogId}" title="No More Available Employee Slots">
                <p>
                    You have used all the available employee slots in your current license. To add additional
                    employees you will need to subscribe to a higher level plan.
                </p>
                <h3>Would you like to upgrade your subscription now?</h3>
            </div>`;
    }

    /**
     * @public
     * Shows the EzNoAvailEmplDialog (if closed)
     */
    ezShow() {
        ezApi.ezclocker.ezDialog.ezShowDialog(EzNoAvailEmplDialog.ezInstance.ezDialogId);
    }

    /**
     * @public
     * Closes the EzNoAvailEmplDialog (if open)
     */
    ezClose() {
        ezApi.ezclocker.ezDialog.ezCloseDialog(EzNoAvailEmplDialog.ezInstance.ezDialogId);
    }

    /**
     * @protected
     * Submits the dialog
     */
    ezSubmit() {
        ezApi.ezclocker.ezNavigation.ezNavigateToSecurePage('account.html');
    }
}

export {
    EzNoAvailEmplDialog
};

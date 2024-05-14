import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzClockerContextEventName } from '/ezlibrary/EzClockerContext/EzClockerContextEventName.js';
import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

import { EzEmployerService } from '/secure/javascript/common/ezclocker-employer-services.js';

import { EzUI } from '/public/javascript/common/ezui.js';

class EzEmployerChatController {
    static ezApiName = 'ezEmployerChatController';

    static get ezCanRegister() {
        return 'PENDING' === EzEmployerChatController.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzEmployerService.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEmployerService.ezApiName].ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName].ready;
    }

    static #ezRegistrator() {
        if (!EzEmployerChatController.ezCanRegister) {
            return false;
        }

        ezApi.ezRegisterNewApi(EzEmployerChatController, EzEmployerChatController.ezApiName);
        EzEmployerChatController.ezApiRegistrationState = 'REGISTERED';
        return true;
    }

    // Static Initializer
    static {
        if (null == EzEmployerChatController.ezApiRegistrationState) {
            EzEmployerChatController.ezApiRegistrationState = 'PENDING';

            if (!EzEmployerChatController.#ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    EzEmployerChatController.#ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    EzEmployerChatController.#ezRegistrator);

                document.addEventListener(
                    EzClockerContext.ezEventNames.onReady,
                    EzEmployerChatController.#ezRegistrator);

                document.addEventListener(
                    EzEmployerService.ezEventNames.onReady,
                    EzEmployerChatController.#ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    EzEmployerChatController.#ezRegistrator);
            }
        }
    }

    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezWantEventEx({
            eventName: EzClockerContextEventName.onSelectedEmployerAccountReady,
            handlerName: EzEmployerChatController.ezApiName,
            handlerFunction: (eventData) => {
                const list = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccountsById();
                // let currentActiveEmployeeId = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().id;
                // console.log(JSON.stringify(list[Object.keys(list)[0]]));
                // console.log(JSON.stringify(list));

                const size = Object.keys(list)
                    ? Object.keys(list).length
                    : 0;

                getAwsEmployer(eventData.data.account.id)
                    .then(
                        (data) => {
                            if(data.data.getEmployer) {
                                // alert(" employer found " + data.data.getEmployer.id);
                            } else {
                                //alert("this employer not found in team chat. Inserting..");
                                // insert into the aws amplify
                                createNewAwsEmployer(eventData.data.account.id, eventData.data.account.employerName);

                                for(let x = 0; x < size; x++) {
                                    const key = Object.keys(list)[x];
                                    const userid = list[key].userId;
                                    const employerId = eventData.data.account.id;
                                    const employeeName = list[key].employeeName;
                                    createNewAwsEmployee(employerId, key, employeeName);
                                }
                                /// call listEmployees
                            }

                            let employeeId = Object.keys(list)[0];
                            //alert("selected employee... " + employeeId);

                            // let container  = document.getElementById('chatFrame')
                            // container.innerHTML = ezApi.ezTemplate`
                            //        <iframe src="https://unnivm.github.io/mychat/?userId=${eventData.data.account.id}"
                            //        width="1200" height="800"/>`

                            ezApi.ezclocker.ezUi.ezContent(
                                'EzTeamChat',
                                ezApi.ezTemplate`
                                    <iframe src="https://unnivm.github.io/mychat/?userId=${eventData.data.account.id}"
                                        width="1200" height="800"/>`);
                        });
            }
        });

        ezApi.ezclocker.ezEventEngine.ezWantEventEx({
            eventName: EzClockerContextEventName.onActiveEmployeeReady,
            handlerName: EzEmployerChatController.ezApiName,
            handlerFunction: () => {
                let currentActiveEmployeeId = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().id;
                let currentActiveEmployerId = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().id;
                let currentActiveEmployerName = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().employerName;
                let currentActiveEmployeeName = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().employeeName;

                ezApi.ezclocker.ezEmployerService.ezLoadEmployerImage(currentActiveEmployerId)
                    .then(
                        (imageUrl) => ezApi.ezclocker.ezUi.setImgElementSrc('_EmployerLogoImage', imageUrl));

                ezApi.ezclocker.ezUi.ezContent(
                    '_EmployerNameCell',
                    currentActiveEmployerName);

                // alert("employee is active now " + currentActiveEmployeeId);
                // alert("employer id " + currentActiveEmployerId);
                // alert("employer name " + ezApi.ezclocker.ezClockerContext.ezGetActiveEmployer().employerName);
                // alert("employee name " + ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().employeeName);

                getAwsEmployee(currentActiveEmployeeId)
                    .then(
                        (data) => {
                            if(data.data.getEmployee) {
                                // alert("inside employee.....");
                            }else {
                                // alert("this employee is not found. Inserting....");
                                createNewAwsEmployee(currentActiveEmployerId, currentActiveEmployeeId, currentActiveEmployeeName);
                            }

                            // let container = document.getElementById('chatFrame');
                            //let src = "<iframe src='https://unnivm.github.io/mychat/?userId='" + currentActiveEmployeeId + "&name=" + currentActiveEmployerName + "' width=1200 height=800 />";
                            //alert(src);
                            // container.innerHTML = "<iframe src=https://unnivm.github.io/mychat/?userId=" + currentActiveEmployeeId + "&name=" + currentActiveEmployerName + " width=1200 height=800 />"

                            let url = ezApi.ezUrlTemplate`/team-chat
                                ?userId=${currentActiveEmployeeId}
                                &name=${currentActiveEmployerName}`;
                                
                            //let url = ezApi.ezUrlTemplate`https://unnivm.github.io/mychat/
                            //    ?userId=${currentActiveEmployeeId}
                            //    &name=${currentActiveEmployerName}`;

                            ezApi.ezclocker.ezUi.ezContent(
                                'EzTeamChat',
                                ezApi.ezTemplate`
                                    <iframe src="${url}" width="1200" height="800" />`);
                        });

                // ezApi.ezclocker.ezUi.ezHookElementEvent('_NavChat', 'click', ezApi.ezclocker.nav.ezNavigateToChatEmployee)
            }
        });

        ezApi.ezclocker.ezUi.ezHookElementEvent('_NavSignout', 'click', ezApi.ezclocker.nav.signOut);
        ezApi.ezclocker.ezUi.ezHookElementEvent('_NavAccount', 'click', ezApi.ezclocker.nav.ezNavigateToEmployerAccountPage);
        ezApi.ezclocker.ezUi.ezHookElementEvent('_NavSchedules', 'click', ezApi.ezclocker.nav.ezNavigateToEmployerSchedules);
        ezApi.ezclocker.ezUi.ezHookElementEvent('_NavEmployeeArchive', 'click', ezApi.ezclocker.nav.ezNavigateToEmployeeArchive);
        ezApi.ezclocker.ezUi.ezHookElementEvent('_NavChat', 'click', ezApi.ezclocker.nav.ezNavigateToChatEmployee);
        ezApi.ezclocker.ezUi.ezHookElementEvent('_NavDashboard', 'click', ezApi.ezclocker.nav.ezNavigateToEmployerDashboard);
    }
}

export {
    EzEmployerChatController
};
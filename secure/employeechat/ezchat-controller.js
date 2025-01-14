import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzClockerContextEventName } from '/ezlibrary/EzClockerContext/EzClockerContextEventName.js';
import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';
import { EzEmployerService } from '/secure/javascript/common/ezclocker-employer-services.js';

import { EzUI } from '/public/javascript/common/ezui.js';

class EzEmployerChatController {
    static ezApiName = 'ezEmployerChatController';
    static ezCanRegister() {

        return 'PENDING' === EzEmployerChatController.ezApiRegistrationState &&
            ezApi && ezApi.ready &&
            ezApi.ezclocker[EzEventEngine.ezApiName] && ezApi.ezclocker[EzEventEngine.ezApiName] .ready &&
            ezApi.ezclocker[EzClockerContext.ezApiName] && ezApi.ezclocker[EzClockerContext.ezApiName] .ready &&
            ezApi.ezclocker[EzUI.ezApiName] && ezApi.ezclocker[EzUI.ezApiName] .ready;
    }

    static ezRegistrator() {
        if (EzEmployerChatController.ezCanRegister()) {
            EzEmployerChatController.ezInstance = ezApi.ezRegisterNewApi(EzEmployerChatController);
            EzEmployerChatController.ezApiRegistrationState = 'REGISTERED';
            return true;
        }
        return false;
    }

    // Static constructor
    static {
        if (null == this.ezApiRegistrationState) {
            this.ezApiRegistrationState = 'PENDING';

            if (!this.ezRegistrator()) {
                document.addEventListener(
                    'onEzApiReady',
                    this.ezRegistrator);

                document.addEventListener(
                    EzEventEngine.ezEventNames.onReady,
                    this.ezRegistrator);

                document.addEventListener(
                    EzClockerContext.ezEventNames.onReady,
                    this.ezRegistrator);

                document.addEventListener(
                    EzUI.ezEventNames.onReady,
                    this.ezRegistrator);
            }
        }
    }

    ezInit() {
        ezApi.ezclocker.ezEventEngine.ezWantEventEx({
            eventName: EzClockerContextEventName.onSelectedEmployerAccountReady,
            handlerName: EzEmployerChatController.ezApiName,
            handlerFunction: (eventData) => {
                ezApi.ezclocker.ezEmployerService.ezLoadEmployerImage(eventData.data.account.id)
                .then((imageUrl) => ezApi.ezclocker.ezUi.setImgElementSrc('_EmployerLogoImage', imageUrl));

                let employerName = ezApi.ezAssignOrDefault(eventData.data.account.employerName, 'Company Name');
                ezApi.ezclocker.ezUi.ezContent('_EmployerNameCell', employerName);

                const list = ezApi.ezclocker.ezClockerContext.ezGetSelectedEmployerAccountEmployeeAccountsById();
                let currentActiveEmployeeId = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().id;
            //console.log(JSON.stringify(list[Object.keys(list)[0]]));
            console.log(JSON.stringify(list));
            const size = Object.keys(list) ? Object.keys(list).length : 0;
            getAwsEmployer(eventData.data.account.id).then((data) => {
                    if(data.data.getEmployer) {
           //             alert(" employer found " + data.data.getEmployer.id);
                    } else {
                        alert("this employer not found in team chat. Inserting..");
                        // insert into the aws amplify    
                        createNewAwsEmployer(eventData.data.account.id, eventData.data.account.employerName);
                        for(var x=0; x<size; x++) {
                            const key = Object.keys(list)[x];
                            const userid       = list[key].userId;        
                            const employerId   = eventData.data.account.id;
                            const employeeName = list[key].employeeName;  
                            createNewAwsEmployee(employerId, key, employeeName);
                        }
                        /// call listEmployees      
                    }
                    var employeeId = Object.keys(list)[0];
                    alert("selected employee... " + employeeId);
                    var container  = document.getElementById('chatFrame')
                    container.innerHTML = "<iframe src='https://unnivm.github.io/mychat/?userId='" + employeeId + "' width=1200 height=800 />" 
                });
            }
        });

        ezApi.ezclocker.ezEventEngine.ezWantEventEx({
            eventName: EzClockerContextEventName.onActiveEmployeeReady,
            handlerName: EzEmployerChatController.ezApiName,
            handlerFunction: (eventData) => {
                let currentActiveEmployeeId = ezApi.ezclocker.ezClockerContext.ezGetActiveEmployee().id;
                alert("employee is active now " + currentActiveEmployeeId);
                var container  = document.getElementById('chatFrame');
                container.innerHTML = "<iframe src='https://unnivm.github.io/mychat/?userId='" + currentActiveEmployeeId + "' width=1200 height=800 />"
              //  ezApi.ezclocker.ezUi.ezHookElementEvent('_NavChat', 'click', ezApi.ezclocker.nav.ezNavigateToChatEmployee)
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
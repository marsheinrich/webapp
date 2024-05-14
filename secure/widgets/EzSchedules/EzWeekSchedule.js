import { EzClass } from '/ezlibrary/EzClass.js';
import { EzEventEngine } from '/ezlibrary/ez-event-engine.js';

import { EzClockerContextEventName } from '/ezlibrary/EzClockerContext/EzClockerContextEventName.js';
import { EzClockerContext } from '/ezlibrary/EzClockerContext/ez-context.js';

import { EzServices } from '/public/javascript/common/ez-services.js';
import { EzUI } from '/public/javascript/common/ezui.js';

import { EzScheduleDisplayMode } from '/secure/widgets/EzSchedules/EzScheduleDisplayMode.js';
import { EzSchedule } from '/secure/widgets/EzSchedules/EzSchedule.js';

//TODO: Finish this class, not ready yet

class EzWeekSchedule extends EzClass {
    static ezApiName = 'ezWeekSchedule';
    static ezEventNames = {
        onReady: 'ezOn_EzWeekSchedule_Ready',
        onScheduleDataLoaded: 'ezOn_EzWeekSchedule__DataLoaded',
        onScheduleDataError: 'ezOn_EzWeekSchedule_DataError'
    };
    static ezInstance = null;
    static ezApiRegistrationState = null;
    static ezCanRegister() {
        return 'PENDING' === EzWeekSchedule.ezApiRegistrationState &&
            Object.prototype.hasOwnProperty.call(globalThis, 'ezApi') &&
            globalThis.ezApi && globalThis.ezApi.ready &&

            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] &&
            globalThis.ezApi.ezclocker[EzEventEngine.ezApiName] .ready &&

            globalThis.ezApi.ezclocker[EzServices.ezApiName] &&
            globalThis.ezApi.ezclocker[EzServices.ezApiName] .ready &&

            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName] &&
            globalThis.ezApi.ezclocker[EzClockerContext.ezApiName] .ready &&

            globalThis.ezApi.ezclocker[EzUI.ezApiName] &&
            globalThis.ezApi.ezclocker[EzUI.ezApiName] .ready;
    }
    static ezRegistrator() {
        if (!EzWeekSchedule.ezCanRegister()) {
            return false;
        }
        EzWeekSchedule.ezInstance = ezApi.ezRegisterNewApi(EzWeekSchedule);
        EzWeekSchedule.ezApiRegistrationState = 'REGISTERED';
        return true;
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
                    EzServices.ezEventNames.onReady,
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

    constructor() {
        super();
    }

    get ezId() {
        return EzWeekSchedule.ezApiName;
    }
    ezScheduleDisplayMode = '';
    ezFirstDayOfWeek = 0;
    ezDateInWeekMoment = null;

    ezInit() {
        EzWeekSchedule.ezInstance.ezHookEventsForScheduleDisplayMode();
        return EzWeekSchedule.ezInstance;
    }

    ezHookEventsForScheduleDisplayMode() {
        const self = EzWeekSchedule.ezInstance;

        switch (self.ezScheduleDisplayMode) {
            case EzScheduleDisplayMode.EMPLOYER:
            case EzScheduleDisplayMode.MANAGER:
                ezApi.ezclocker.ezEventEngine.ezWantEvent(
                    EzClockerContextEventName.onSelectedEmployerEmployeesChanged,
                    self.ezId,
                    self.ezRenderScheduleEmployees);

                ezApi.ezclocker.ezEventEngine.ezWantEvent(
                    EzSchedule.ezEventNames.onEmployerScheduleDataUpdated,
                    self.ezId,
                    self.ezRenderScheduleDays);
                break;
            case EzScheduleDisplayMode.EMPLOYEE:
            default:
                ezApi.ezclocker.ezEventEngine.ezWantEvent(
                    EzClockerContextEventName.onActiveEmployeeReady,
                    self.ezId,
                    self.ezRenderScheduleEmployees);

                ezApi.ezclocker.ezEventEngine.ezWantEvent(
                    EzSchedule.ezEventNames.onEmployeeScheduleDataUpdated,
                    self.ezId,
                    self.ezRenderScheduleDays);
        }
    }

    /**
        @public
        Refreshes the schedule data
     */
    ezRefreshData() {
        const self = EzWeekSchedule.ezInstance;

        switch (self.ezScheduleDisplayMode) {
            case EzScheduleDisplayMode.EMPLOYER:
            case EzScheduleDisplayMode.MANAGER:
                ezApi.ezclocker.ezSchedule.ezRefreshEmployerScheduleData();
                break;
            case EzScheduleDisplayMode.EMPLOYEE:
            default:
                ezApi.ezclocker.ezSchedule.ezRefreshActiveEmployeeScheduleData();
                break;
        }
    }

    ezRender() {
        const self = EzWeekSchedule.ezInstance;

        return ezApi.ezTemplate`
            <div id="${this.ezId}">
                <div id="${self.ezId}_Container" class="ezWeekScheduleContainer">
                    <div id="${self.ezId}_Employees_Container">
                        <div id="${self.ezId}_Employees_Header">
                            Employee Name
                        </div>
                        <div id="${self.ezId}_Employee_Rows">
                        </div>
                    </div>
                    <div id="${self.ezId}_Days_Container">
                        ${self.ezRenderDayHeaders()}
                        <div id="${self.ezId}_Days_Rows">
                        </div>
                    </div>
                    <div id="${self.ezId}_Summary_Container">
                        <div id="${self.ezId}_Summary_Header">
                            Total Hours
                        </div>
                        <div id="${self.ezId}_Summary_Rows">
                        </div>
                    </div>
                </div>
            </div>`;
    }

    ezRenderDayHeaders() {
        const self = EzWeekSchedule.ezInstance;

        let currentMoment = ezApi.ezclocker.ezSchedule.ezGetFirstMomentInWeek(
            self.ezFirstDayOfWeek,
            self.ezDateInWeekMoment);

        let dayHeaders = '';
        for (let day = 0; day < 7; day++) {
            let iso = ezApi.ezclocker.ezDateTime.ezToIso(currentMoment);
            let dayName = ezApi.ezclocker.ezDateTime.ezGetMomentDayName(currentMoment);
            let dayDate = ezApi.ezclocker.ezDateTime.ezToDisplayDate(currentMoment);
            dayHeaders = ezApi.ezTemplate`${dayHeaders}
                <div id="${self.ezId}_${dayName}" class="ezScheduleHeader_Cell"
                    data-iso=${iso}>
                    <div id="${self.ezId}_${dayName}" class="ezScheduleHeader_DayName">
                        ${dayName}
                    </div>
                    <div id="${self.ezId}_${dayName}_date" class="ezScheduleHeader_DayDate">
                        ${dayDate}
                    </div>
                </div>`;
        }

        return ezApi.ezTemplate`
            <div id="${self.ezId}_Days_Header" class="ezScheduleHeader_DaysContainer">
                ${dayHeaders}
            </div>`;
    }

    ezRenderScheduleEmployees() {

    }

    ezRenderScheduleDays() {

    }

    ezRenderScheduleSummary() {

    }

    ezBuildWeekScheduleHtml() {

    }
}

export {
    EzWeekSchedule
};
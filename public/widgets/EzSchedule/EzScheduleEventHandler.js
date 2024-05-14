/**
    Handles event triggers for the schedule
 */
class EzScheduleEventHandler {
    constructor() {
        this.ready = false;
        this.ezTypeName = 'EzScheduleEventHandler';
    }
    
    /**
        @protected
        Initializes EzScheduleEventHandler
     */
    ezInit() {
        var self = ezApi.ezclocker[EzScheduleEventHandler.ezApiName];

        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzScheduleEventHandler.ezApiName,
            EzScheduleEventHandler.ezEventNames.onScheduleAddShift);
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzScheduleEventHandler.ezApiName,
            EzScheduleEventHandler.ezEventNames.onScheduleEditShift);
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzScheduleEventHandler.ezApiName,
            EzScheduleEventHandler.ezEventNames.onScheduleDeleteShift);
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzScheduleEventHandler.ezApiName,
            EzScheduleEventHandler.ezEventNames.onScheduleAddTimeOff);
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzScheduleEventHandler.ezApiName,
            EzScheduleEventHandler.ezEventNames.onScheduleEditTimeOff);
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzScheduleEventHandler.ezApiName,
            EzScheduleEventHandler.ezEventNames.onScheduleApproveTimeOff);
        ezApi.ezclocker.ezEventEngine.ezRegisterEvent(
            EzScheduleEventHandler.ezApiName,
            EzScheduleEventHandler.ezEventNames.onScheduleDenyTimeOff);

        self.ready = true;
        return self;
    }
    
    /**
        [EVENT HANDLER: EzScheduleEventHandler.ezEventNames.onScheduleAddShift]
        
        @public
        Handles the EzScheduleEventHandler.ezEventNames.onScheduleAddShift event
        @param {Object} employee
        @param {String} scheduleDateIso
     */
    ezHandleAddSchedule(employee, scheduleDateIso) {
        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzScheduleEventHandler.ezEventNames.onScheduleAddShift,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzScheduleEventHandler.ezApiName,
                ezApi.ezMsg`Add schedule for employeeId=${employee.id}`, {
                    employee: employee,
                    scheduleDateIso: scheduleDateIso
                }));
    }

    /**
        [EVENT HANDLER: EzScheduleEventHandler.ezEventNames.onScheduleEditShift]
        
        @public
        Handles the EzScheduleEventHandler.ezEventNames.onScheduleEditShift event
        @param {String} scheduleBoxId
        @param {String} scheduleId
     */
    ezHandleEditSchedule(scheduleBoxId, scheduleId) {
        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzScheduleEventHandler.ezEventNames.onScheduleEditShift,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzScheduleEventHandler.ezApiName,
                ezApi.ezMsg`Edit schedule with scheduleId=${scheduleId}`, {
                    scheduleBoxId: scheduleBoxId,
                    scheduleId: scheduleId
                }));
    }

    /**
        [EVENT HANDLER: EzScheduleEventHandler.ezEventNames.onScheduleDeleteShift]
        
        @public
        Handles the EzScheduleEventHandler.ezEventNames.onScheduleDeleteShift event
        @param {String} scheduleBoxId
        @param {String} scheduleId
     */
    ezHandleDeleteSchedule(scheduleBoxId, scheduleId) {
        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzScheduleEventHandler.ezEventNames.onScheduleDeleteShift,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzScheduleEventHandler.ezApiName,
                ezApi.ezMsg`Delete schedule with scheduleId=${scheduleId}`, {
                    scheduleBoxId: scheduleBoxId,
                    scheduleId: scheduleId
                }));
    }

    /**
        [EVENT HANDLER: EzScheduleEventHandler.ezEventNames.onScheduleAddTimeOff]
        
        @public
        Handles the EzScheduleEventHandler.ezEventNames.onScheduleAddTimeOff event
        @param {String} employeeId
        @param {String} timeOffDateIso
     */
    ezHandleAddTimeOff(employeeId, timeOffDateIso) {
        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzScheduleEventHandler.ezEventNames.onScheduleAddTimeOff,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzScheduleEventHandler.ezApiName,
                ezApi.ezMsg`Add time off for employee with employeeId=${employeeId}`, {
                    employeeId: employeeId,
                    timeOffDateIso: timeOffDateIso
                }));
    }

    /**
        [EVENT HANDLER: EzScheduleEventHandler.ezEventNames.onScheduleEditTimeOff]
        
        @public
        Handles the EzScheduleEventHandler.ezEventNames.onScheduleEditTimeOff event
        @param {String} timeOffBoxId
        @param {Object} timeOff
     */
    ezHandleEditTimeOff(timeOffBoxId, timeOffId) {
        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzScheduleEventHandler.ezEventNames.onScheduleEditTimeOff,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzScheduleEventHandler.ezApiName,
                ezApi.ezMsg`Edit time off with timeOffId=${timeOffId}`, {
                    timeOffBoxId: timeOffBoxId,
                    timeOffId: timeOffId
                }));
    }

    /**
        [EVENT HANDLER: EzScheduleEventHandler.ezEventNames.onScheduleApproveTimeOff]
        
        @public
        Handles the EzScheduleEventHandler.ezEventNames.onScheduleApproveTimeOff event
        @param {String} timeOffBoxId
        @param {String} timeOffId
     */
    ezApproveTimeOff(timeOffBoxId, timeOffId) {
        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzScheduleEventHandler.ezEventNames.onScheduleApproveTimeOff,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzScheduleEventHandler.ezApiName,
                ezApi.ezMsg`Approve time off with timeOffId=${timeOffId}`, {
                    timeOffBoxId: timeOffBoxId,
                    timeOffId: timeOffId
                }));
    }

    /**
        [EVENT HANDLER: EzScheduleEventHandler.ezEventNames.onScheduleDenyTimeOff]
        
        @public
        Handles the EzScheduleEventHandler.ezEventNames.onScheduleDenyTimeOff event
        @param {String} timeOffBoxId
        @param {String} timeOffId
     */
    ezDenyTimeOff(timeOffBoxId, timeOffId) {
        ezApi.ezclocker.ezEventEngine.ezTriggerEvent(
            EzScheduleEventHandler.ezEventNames.onScheduleDenyTimeOff,
            ezApi.ezclocker.ezEventEngine.ezBuildEventData(
                EzScheduleEventHandler.ezApiName,
                ezApi.ezMsg`Deny time off with timeOffId=${timeOffId}`, {
                    timeOffBoxId: timeOffBoxId,
                    timeOff: timeOffId
                }));
    }
}
EzScheduleEventHandler.ezApiName = 'ezScheduleEventHandler';
EzScheduleEventHandler.ezEventNames = {
    onScheduleAddShift: ezApi.ezIdTemplate`on${EzScheduleEventHandler.ezApiName}_Shift_Add`,
    onScheduleEditShift: ezApi.ezIdTemplate`on${EzScheduleEventHandler.ezApiName}_Shift_Edit`,
    onScheduleDeleteShift: ezApi.ezIdTemplate`on${EzScheduleEventHandler.ezApiName}_Shift_Delete`,
    onScheduleAddTimeOff: ezApi.ezIdTemplate`on${EzScheduleEventHandler.ezApiName}_TimeOff_Add`,
    onScheduleEditTimeOff: ezApi.ezIdTemplate`on${EzScheduleEventHandler.ezApiName}_TimeOff_Edit`,
    onScheduleApproveTimeOff: ezApi.ezIdTemplate`on${EzScheduleEventHandler.ezApiName}_TimeOff_Approved`,
    onScheduleDenyTimeOff: ezApi.ezIdTemplate`on${EzScheduleEventHandler.ezApiName}_TimeOff_Denied`
};

export {
    EzScheduleEventHandler
};

document.addEventListener('onEzApiReady',
    () => ezApi.ezRegisterNewApi(EzScheduleEventHandler, EzScheduleEventHandler.ezApiName));

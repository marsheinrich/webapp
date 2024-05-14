export class MyTestObject {
    ezApiName = 'myTestObject';

    ezEventNames = {
        onReady: 'ezOn_MyTestObject_Ready'
    };

    ezRegistrationState = null;

    ezInstance = null;

    ezInit() {
        return this.ezInstance;
    }
}
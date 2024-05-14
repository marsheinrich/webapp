class EzGoogleFirebaseMetrics {
    constructor() {
        this.ready = false;
        this.ezTypeName = 'EzGoogleFirebaseMetrics';

        this.ezEnabled = false;
        this.ezIds = {
            ezGoogleFirebaseScriptId: 'EzGoogleFirebaseScript',
            ezGoogleFirebaseInitScriptId: 'ezGoogleFirebaseInitScript'
        }
    }

    ezInit() {
        let self = ezApi.ezclocker[EzGoogleFirebaseMetrics.ezApiName];
    }
``
    ezEnable() {
        let self = ezApi.ezclocker[EzGoogleFirebaseMetrics.ezApiName];
    }

    ezDisable() {
        let self = ezApi.ezclocker[EzGoogleFirebaseMetrics.ezApiName];

        ezUi.ezRemoveElement(self.ezIds.ezGoogleFirebaseScriptId);
        ezUi.ezRemoveElement(self.ezIds.ezGoogleFirebaseInitScriptId);
    }

    ezInjectGoogleFirebaseMetrics() {
        let self = ezApi.ezclocker[EzGoogleFirebaseMetrics.ezApiName];

        ezUi.ezContent('body', ezApi.ezTemplate`
            <script id="${self.ezIds.ezGoogleFirebaseScriptId}"
                src="//www.gstatic.com/firebasejs/3.3.0/firebase.js"></script>
            <script id="${self.ezIds.ezGoogleFirebaseInitScriptId}">
                // Initialize Firebase
                var config = {
                  apiKey: '',
                  authDomain: 'ezclocker-mobile.firebaseapp.com',
                  databaseURL: 'https://ezclocker-mobile.firebaseio.com',
                  storageBucket: 'ezclocker-mobile.appspot.com',
                };
                firebase.initializeApp(config);
            </script>`);
    }
}
EzGoogleFirebaseMetrics.ezApiName = 'ezGoogleFirebaseMetrics';
EzGoogleFirebaseMetrics.DEFAULT_PREFERENCES = {

}
/**
 * [ DO NOT REMOVE THIS HEADER ]
 *
 * File.....: developer-signup.js
 * Var......: ezDeveloperSignUpController
 * Created..: Apr 30, 2016
 * Url......: /public/javascript/developer/developer-signup.js
 *
 * Copyright © 2016, ezNova Technologies LLC, dba ezClocker
 * All rights reserved.
 *
 * Developer Sign Up Page Controller
 *
 */

var ezDeveloperSignUpController = {
    ready: false,
    initPage: function() {
        return new Promise(function(resolve, reject) {
            // before page visible
            ezWebComp.append('_HeaderContainer', '_Header', '../pez/header/basic-header.ez')
                .then(ezWebComp.append('_Contents', '_SignUpForm',
                    '../pez/developer/developer-signup.html')
                    .then($('#_PageContainer').fadeIn('slow', function() {
                        // after page visible
                        resolve();
                    }), reject), reject);
        });
    }
};
ezDeveloperSignUpController.initPage().then(function() {
    ezDeveloperSignUpController.ready = true;
});
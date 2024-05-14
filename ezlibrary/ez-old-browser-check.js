var ieDetected = false;
var ezUnsupportedBrowserDetected = false;

function ezOldBrowserCheck(customMessage) {
    if (!Modernizr.arrow) {
        ieDetected = true;
        ezUnsupportedBrowserDetected = true;
        ezInjectOldBrowserMessage(customMessage);
    }

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');

    if (-1 === msie) {
        msie = window.navigator.appVersion.indexOf('; MSIE/');
    }

    var trident = ua.indexOf('Trident/');
    if (-1 === trident) {
        trident = window.navigator.appVersion.indexOf('; Trident/');
    }

    if (0 < msie || 0 < trident) {
        ieDetected = true;
        ezUnsupportedBrowserDetected = true;
        ezInjectOldBrowserMessage(customMessage);
    }
}

function ezInjectOldBrowserMessage(customMessage) {
    if (null === customMessage) {
        customMessage =
            '<h1>Your Browser is No Longer Supported</h1>' +
            '<p>The ezClocker website no longer supports old outdated browsers such as Microsoft\'s Internet Explorer.' +
            ' Please update to the latest modern browser available for your system.</p>';
    }

    document.body.innerHTML =
        '<style>' +
        '.ezOldBrowserHeader {' +
        '   transition: 200ms ease-in-out;' +
        '   transform-origin: center top;' +
        '   transform: none;' +
        '   padding-left: 4px;' +
        '   padding-right: 4px;' +
        '   padding-bottom: 8px;' +
        '   font-family: \'Roboto\', Verdana, sans-serif;' +
        '   font-weight: normal;' +
        '   font-size: 32pt;' +
        '   color: #000000;' +
        '   background-color: rgba(255, 255, 255, .4);' +
        '   border-bottom-color: #000000;' +
        '   border-bottom-style: solid;' +
        '   border-bottom-width: 1px;' +
        '   box-shadow: 0 2px 2px 0 rgba(109, 110, 112, 0.5);' +
        '}' +
        '.ezOldBrowserHeaderLogo {' +
        '   max-width: 250px;' +
        '   border-style: none;' +
        '   padding: 8px;' +
        '   margin: 0;' +
        '   vertical-align: middle;' +
        '}' +
        '.ezOldBrowserPageContent {' +
        '   margin-top: 4px;' +
        '   margin-left: 10px;' +
        '   margin-right: 10px;' +
        '   padding: 0;' +
        '   overflow: auto;' +
        '}' +
        '.ezOldBrowserPageContentBlock {' +
        '   display: grid;' +
        '   padding: 4px;' +
        '   grid-row-gap: 2px;' +
        '   row-gap: 2px;' +
        '   grid-column-gap: 2px;' +
        '   column-gap: 2px;' +
        '   background-color: #ffffff;' +
        '   color: #000000;' +
        '   font-family: \'Roboto\', Verdana, sans-serif;' +
        '   font-size: 12pt;' +
        '   font-weight: normal;' +
        '   font-style: normal;' +
        '}' +
        '</style>' +
        '<div id="EzInternetExplorerNotSupported">' +
        '  <div class="ezOldBrowserHeader">' +
        '      <a href="#" onclick="ezNavigation.navigateToMain()">' +
        '          <img src="/public/images/logos/ezclocker_logo_2015.svg" class="ezOldBrowserHeaderLogo" alt="ezClocker" />' +
        '      </a>' +
        '  </div>' +
        '  <div class="ezOldBrowserPageContent">' +
        '      <div class="ezOldBrowserPageContentBlock">' +
        '          <div class="ezLightGrayBox">' +
        '          ' + customMessage +
        '          </div>' +
        '          <hr />' +
        '          <div class="ezLightGrayBox">' +
        '              <h1>Microsoft\'s New Edge Browser</h1>' +
        '              <p>' +
        '                  Microsoft recommends you use their new Edge browser which is support on all of Microsoft\'s' +
        '                  supported operating systems. Click the link below for instructions' +
        '                  on downloading Microsoft\'s Edge browser.' +
        '              </p>' +
        '              <p>' +
        '                  NOTE: Make sure you accept any prompts that ask if you would like your new browser to be' +
        '                  your default browser!' +
        '              </p>' +
        '              <ul>' +
        '                  <li>' +
        '                      <a class="ezNavyLink" target="MicrosoftEdigeDownloadPage"' +
        '                          href="https://www.microsoft.com/en-us/edge">' +
        '                          Download and Install Microsoft Edge' +
        '                      </a>' +
        '                  </li>' +
        '          </div>' +
        '          <hr />' +
        '          <div class="ezLightGrayBox">' +
        '              <h1>Great Alternative Browsers</h1>' +
        '              <p>' +
        '                  Other alternative browsers include Google\'s Chrome browser and Mozill\'s Firefox browser. You' +
        '                  can find instructions on downloading and installing Chrome or Firefox by clicking one of the' +
        '                  links below.' +
        '              <p>' +
        '              <p>' +
        '                  NOTE: Make sure you accept any prompts that ask if you would like your new browser to be' +
        '                  your default browser!' +
        '              </p>' +
        '              <ul>' +
        '                  <li>' +
        '                      <a class="ezNavyLink" target="DownloadGoogleChrome" href="https://www.google.com/chrome">' +
        '                          Download and Install Google\'s Chrome' +
        '                      </a>' +
        '                  </li>' +
        '                  <li>' +
        '                      <a class="ezNavyLink" target="DownloadGoogleChrome"' +
        '                          href="https://www.mozilla.org/en-US/firefox/new/">' +
        '                          Download and Install Mozilla\'s Firefox Browser' +
        '                      </a>' +
        '                  </li>' +
        '              </ul>' +
        '          </div>' +
        '      </div>' +
        '  </div>' +
        '</div>';
}

var oldBrowserCheckReady = true;

document.onreadystatechange = function() {
    ezOldBrowserCheck(null);
};

/*==============================*/
/**** DEPRECATED: DO NOT USE ****/
/*==============================*/

/* exported
    dependencyDebugOn, loadJsDependencies, loadCssDependencies
*/

var dependencyDebugOn = true; // Local/Dev Setting
//var dependencyDebugOn = false; // Release Setting

/**
 * Loads Javascript Files for the HTML Document
 * @param nonDebugScriptUrls
 * @param debugScriptsUrls
 */
function loadJsDependencies(globalJsUrls, releaseJsUrls, debugJsUrls) {
    var jsUrlsToInject = releaseJsUrls;
    if (dependencyDebugOn) {
        jsUrlsToInject = debugJsUrls;
    }
    // Load the Global JS Files
    var jsUrl;
    var index;
    for (index in globalJsUrls) {
        jsUrl = globalJsUrls[index];
        document.write('<script src="' + jsUrl + '"></script>');
    }
    // Load the other js files depending if debug mode or not
    for (index in jsUrlsToInject) {
        jsUrl = jsUrlsToInject[index];
        document.write('<script src="' + jsUrl + '"></script>');
    }
}

/**
 * Loads CSS files for the HTML Document
 * @param releaseCssUrls
 * @param debugCssUrls
 */
function loadCssDependencies(globalCssUrls, releaseCssUrls, debugCssUrls) {
    var cssUrlsToInject = releaseCssUrls;
    if (dependencyDebugOn) {
        cssUrlsToInject = debugCssUrls;
    }
    // Load the global CSS Files
    var index;
    var cssUrl;
    for (index in globalCssUrls) {
        cssUrl = globalCssUrls[index];
        document.write('<link href="' + cssUrl + '" rel="stylesheet" type="text/css"/>');
    }
    // Load the other CSS files depending if debug mode or not
    for (index in cssUrlsToInject) {
        cssUrl = cssUrlsToInject[index];
        document.write('<link href="' + cssUrl + '" rel="stylesheet" type="text/css"/>');
    }
}
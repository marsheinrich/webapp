/*==============================*/
/**** DEPRECATED: DO NOT USE ****/
/*==============================*/

/* exported
    WebFontConfig
*/

var WebFontConfig = {
    google: {
        families: ['Roboto:400,700,400italic,700italic:latin,latin-ext', 'Hammersmith+One::latin,latin-ext']
    }
};

(function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();
var mixPanelEnabled = false;
// Production
//var mixPanelAccountNumber = "318823360b53d79c9866d6b942b795bb"; // holds the mixpanel account number
// Development
//var mixPanelAccountNumber = "71606db29b0e999b5953af3a63f5b025";
// Local Development

var mixpanel = mixpanel || {};
var mixPanelAccountNumber = '';
if (mixPanelAccountNumber.length != 0) {
    mixPanelEnabled = true;
    (
        function (e, b) {
            if (!b.__SV) {
                var a, f, i, g;
                window.mixpanel = b;
                a = e.createElement('script');
                a.type = 'text/javascript';
                a.async = !0;
                a.src = ('https:' === e.location.protocol ? 'https:' : 'http:') +
                    '//cdn.mxpnl.com/libs/mixpanel-2.2.min.js';
                f = e.getElementsByTagName('script')[0];
                f.parentNode.insertBefore(a, f);
                b._i = [];
                b.init = function (a, e, d) {
                    function f(b, h) {
                        var a = h.split('.');
                        2 == a.length && (b = b[a[0]], h = a[1]);
                        b[h] = function () {
                            b.push([h].concat(Array.prototype.slice.call(arguments, 0)));
                        };
                    }
                    var c = b;
                    'undefined' !== typeof d ? c = b[d] = [] : d = 'mixpanel';
                    c.people = c.people || [];
                    c.toString = function (b) {
                        var a = 'mixpanel';
                        'mixpanel' !== d && (a += '.' + d);
                        b || (a += ' (stub)');
                        return a;
                    };
                    c.people.toString = function () {
                        return c.toString(1) + '.people (stub)';
                    };
                    i =
                        'disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user'
                            .split(' ');
                    for (g = 0; g < i.length; g++) {
                        f(c, i[g]);
                    }
                    b._i.push([a, e, d]);
                };
                b.__SV = 1.2;
            }
        }
    )
    (document, window.mixpanel || []);
    mixpanel.init(mixPanelAccountNumber);
}

function mixPanelTrack(trackid) {
    if (mixPanelEnabled) {
        mixpanel.track(trackid);
    }
}

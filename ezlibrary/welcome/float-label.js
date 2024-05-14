! function (t) {
    t.fn.FloatLabel = function (a) {
        var e = t.extend({}, {
            populatedClass: 'populated',
            focusedClass: 'focused'
        }, a);
        return this.each(function () {
            var a = t(this),
                s = a.find('label'),
                l = a.find('textarea, input');
            '' == l.val() ? l.val(s.text()) : a.addClass(e.populatedClass), l.on('focus', function () {
                a.addClass(e.focusedClass), l.val() === s.text() ? l.val('') : a.addClass(e.populatedClass);
            }), l.on('blur', function () {
                a.removeClass(e.focusedClass), l.val() || (l.val(s.text()), a.removeClass(e.populatedClass));
            }), l.on('keyup', function () {
                a.addClass(e.populatedClass);
            });
        });
    };
}(jQuery);

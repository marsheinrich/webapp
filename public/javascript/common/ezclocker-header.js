var _ezHeader_;
var _ezContent_;
document.addEventListener('onEzApiReady', function() {
    _ezHeader_ = $('#_EzClockerHeader');
    if (_ezHeader_ === undefined) {
        return;
    }
    var hH = _ezHeader_.outerHeight(true);

    _ezContent_ = $('#_EzClockerContent');
    var cMT = 0;
    if (_ezContent_ !== undefined) {
        cMT = parseInt($(_ezContent_).css('margin-top'));
    }

    $('body').css('margin-top', hH + cMT);
});
$(window).on('scroll', function() {
    if (_ezHeader_ === undefined) {
        return;
    }
    var scrollPosition = $(this).scrollTop();
    if (scrollPosition <= 0) {
        $(_ezHeader_).addClass('ezClockerHeader2015');
        $(_ezHeader_).removeClass('ezClockerHeaderTransparent2015');
        return;
    }
    $(_ezHeader_).addClass('ezClockerHeaderTransparent2015');
    $(_ezHeader_).removeClass('ezClockerHeader2015');
});
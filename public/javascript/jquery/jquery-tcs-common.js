jQuery.fn.center = function () {
    this.css('position','absolute');
    this.css('top', Math.max(0, (($(window).height() - this.outerHeight()) / 2) + 
                                                $(window).scrollTop()) + 'px');
    this.css('left', Math.max(0, (($(window).width() - this.outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + 'px');
    return this;
};

jQuery.fn.vertcenter = function () {
    this.css('position','absolute');
    this.css('top', Math.max(0, (($(window).height() - this.outerHeight()) / 2) + 
                                                $(window).scrollTop()) + 'px');
    return this;
};

jQuery.fn.horzcenter = function () {
    this.css('position','absolute');
    this.css('left', Math.max(0, (($(window).width() - this.outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + 'px');
    return this;
};

$.urlParam = function(name){
    var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
    return results[1] || null;
};

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
$(function() {
    $('.kv-ltr-theme-fas-star').rating({
        containerClass: 'is-star',
        theme: 'krajee-fas',
        step: 1,
        starCaptions: { 1: 'Bad    ', 2: 'Sub Par', 3: 'Okay   ', 4: 'Good   ', 5: 'Great  ' },
        starCaptionClasses: { 1: 'text-danger', 2: 'text-warning', 3: 'text-info', 4: 'text-primary', 5: 'text-success' },
        showClear: false,
        clearCaption: 'Select a rating',
        captionElement: '#custom-caption',
        clearCaptionClass: 'text-default'
    });
    $('#stars').on('rating:change', function(event, value, caption) {
        if (value <= 3) {
            $("#ratingGiven").text(value);
            $('#modal-contactus').modal('show');
        } else {
            $('#modal-reviews').modal('show');
        }
    });
    $("#name").keyup(function() {
        $("#nameError").text('')
        $("#nameError").css('visibility', 'hidden');
    });
    $("#email").keyup(function() {
        $("#emailError").text('')
        $("#emailError").css('visibility', 'hidden');
    });
    $('#sendMessage').click(function() {
        if (!$("#name").val() || $("#name").val() == "") {
            $("#nameError").text("Please provide your name");
            $("#nameError").css('visibility', 'visible');
            return
        }
        if (!$("#email").val() || $("#email").val() == "") {
            $("#emailError").text("Please provide your email");
            $("#emailError").css('visibility', 'visible');
            return
        } else if (!validateEmail($("#email").val())) {
            $("#emailError").text("Please provide a valid email");
            $("#emailError").css('visibility', 'visible');
            return
        }
        $.post("/sendmessage",
            {
                rating: $("#ratingGiven").text(),
                name: $("#name").val(),
                phone: $("#phone").val(),
                email: $("#email").val(),
                message: $("#reviewMessage").val(),
            },
            function(result) {
                $("#name").val("")
                $("#phone").val("")
                $("#email").val("")
                $("#reviewMessage").val("")
                $('#modal-contactus').modal('hide');
                $('#modal-alert').modal('show')
            }
        );
    })
});

// izolace jQuery
// -----------------
// (function ($) {})(jQuery);
// $(function () {});
// -----------------

$(function () {
    let slider = $('#myRange'),
        output = $('#demo');

    // slider
    output.html(slider.val());
    slider.on('input', function () {
        output.html($(this).val());
    });
});

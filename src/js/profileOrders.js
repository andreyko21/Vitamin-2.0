import $ from 'jquery';

let animating = false;

$(document).ready(function () {
    $('.order-item__accordeon').click(function () {
        if ($(window).width() < 961) {
            const accordionContent = $(this).next(
                '.order-item__content'
            );
            if (accordionContent.is(':hidden')) {
                $(this).find('.order-item__arrow').addClass('open');
            } else {
                $(this).find('.order-item__arrow').removeClass('open');
            }
            accordionContent.slideToggle(function () {
                animating = false;
            });
        }
    });
})
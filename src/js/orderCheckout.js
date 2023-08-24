import $ from 'jquery';
import 'jquery-mask-plugin';

$(document).ready(function () {
  $('#phoneNumber').mask('0 000 000 00 00', {
    translation: {
      r: {
        pattern: /[\/]/,
        fallback: '/',
      },
    },
  });
  $('#cardNumber').mask('0000 0000 0000 0000', {
    translation: {
      r: {
        pattern: /[\/]/,
        fallback: '/',
      },
      placeholder: 'XXXX XXXX XXXX XXXX',
    },
  });
  $('#expiration').mask('01/11', {
    translation: {
      0: {
        pattern: /^[0-1]/,
      },
      1: {
        pattern: /^[0-9]/,
      },
    },
    placeholder: 'MM/YY',
  });
  $('#cvc').mask('000', {
    translation: {
      r: {
        pattern: /[\/]/,
        fallback: '/',
      },
    },
  });

  let animating = false;

  $('.order-checkout-sidebar__accordeon').click(function () {
    if ($(window).width() < 600) {
      const accordionContent = $(this).next(
        '.order-checkout-sidebar__accordeon-content'
      );
      if (accordionContent.is(':hidden')) {
        $(this)
          .find('.order-checkout-sidebar__accordeon-arrow')
          .addClass('open');
      } else {
        $(this)
          .find('.order-checkout-sidebar__accordeon-arrow')
          .removeClass('open');
      }
      accordionContent.slideToggle(function () {
        animating = false;
      });
    }
  });
});

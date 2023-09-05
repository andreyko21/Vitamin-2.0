import $ from 'jquery';
import './stepperInput';

$(document).ready(function () {
  $('.header__basket-button').click(function () {
    $('#basketContainer').fadeIn();
    $('.basket-section').css('right', '0');
    $('html').css('overflow', 'hidden');
  });

  $('#hideBasketButton').click(function () {
    $('html').css('overflow', 'auto');
    $('#basketContainer').fadeOut(function () {
      $('.basket-section').css('right', '-100%');
    });
  });

  $('#basketContainer').click(function () {
    $('html').css('overflow', 'auto');
    $('.basket-section').css('right', '-100%');
    $('#basketContainer').fadeOut();
  });

  $('.basket-section').click(function (event) {
    event.stopPropagation();
  });
});



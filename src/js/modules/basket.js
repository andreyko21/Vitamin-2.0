import $ from 'jquery';

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

$(document).ready(function () {
  $('.stepper-input__button').click(function () {
    var input = $(this)
      .siblings('.stepper-input__content')
      .find('.stepper-input__input');
    var currentValue = parseInt(input.val());

    if ($(this).hasClass('increment')) {
      input.val(currentValue + 1);
    } else if ($(this).hasClass('decrement') && currentValue > 1) {
      input.val(currentValue - 1);
    }
  });
});

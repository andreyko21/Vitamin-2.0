import $ from 'jquery';

function setupStepperInput() {
  $('.stepper-input__button').click(function () {
    var input = $(this)
      .siblings('.stepper-input__content')
      .find('.stepper-input__input');
    var currentValue = parseInt(input.val());

    if ($(this).hasClass('increment') && currentValue < 9999) {
      input.val(currentValue + 1);
    } else if ($(this).hasClass('decrement') && currentValue > 1) {
      input.val(currentValue - 1);
    }
  });
}

export { setupStepperInput };

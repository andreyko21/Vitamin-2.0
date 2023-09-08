import $ from 'jquery';

export function AmountInput(obj) {
  var input = obj
    .siblings('.stepper-input__content')
    .find('.stepper-input__input');
  var currentValue = parseInt(input.val());

  if (obj.hasClass('increment') && currentValue < 9999) {
    input.val(currentValue + 1);
  } else if (obj.hasClass('decrement') && currentValue > 1) {
    input.val(currentValue - 1);
  }
}
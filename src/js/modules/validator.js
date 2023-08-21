import $ from 'jquery';
import 'jquery-validation';

export function initValidator() {
  return $('#myForm').validate({
    rules: {
      email: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        minlength: 6,
      },
    },
    messages: {
      email: {
        required: 'Please enter your email',
        email: 'Please enter a valid email address',
      },
      password: {
        required: 'Please enter your password',
        minlength: 'Password must be at least 6 characters',
      },
    },
    errorPlacement: function (error, element) {
      error.appendTo(element.parent().parent().find('.input-block__error'));
    },
    highlight: function (element, errorClass, validClass) {
      $(element).parent().addClass('error-block').removeClass(validClass);
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).parent().removeClass('error-block').addClass(validClass);
    },
  });
}

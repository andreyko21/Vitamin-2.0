class FormValidator {
  constructor(formSelector) {
    this.formSelector = formSelector;
    this.validator = null;
    this.setupValidation();
  }

  setupValidation() {
    this.validator = $(this.formSelector).validate(this.getValidationConfig());
    $('input').on('keyup change', this.validateInputs.bind(this));
  }

  getValidationConfig() {
    return {
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
      errorPlacement: this.placeError.bind(this),
      highlight: this.highlightElement.bind(this),
      unhighlight: this.unhighlightElement.bind(this),
    };
  }

  placeError(error, element) {
    error.appendTo(element.parent().parent().find('.input-block__error'));
  }

  highlightElement(element, validClass) {
    $(element).parent().addClass('error-block').removeClass(validClass);
  }

  unhighlightElement(element, validClass) {
    $(element).parent().removeClass('error-block').addClass(validClass);
  }

  validateInputs() {
    let valid = true;
    $('input').each((index, element) => {
      valid = this.validator.element(element) && valid;
    });
  }
}

const myFormValidator = new FormValidator('#myForm');

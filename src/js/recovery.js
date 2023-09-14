import $ from 'jquery';
import 'jquery-validation';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { app } from './modules/InitFirebase';
import toastr from 'toastr';

class Validator {
  constructor(formSelector, recoveryInstance) {
    this.formSelector = formSelector;
    this.validator = null;
    this.recovery = recoveryInstance;
  }

  init() {
    this.validator = $(this.formSelector).validate({
      rules: {
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        email: {
          required: 'Please enter your email',
          email: 'Please enter a valid email address',
        },
      },
      errorPlacement: (error, element) => {
        error.appendTo(element.parent().parent().find('.input-block__error'));
      },
      highlight: (element, errorClass, validClass) => {
        $(element).parent().addClass('error-block').removeClass(validClass);
      },
      unhighlight: (element, errorClass, validClass) => {
        $(element).parent().removeClass('error-block').addClass(validClass);
      },
      submitHandler: () => {
        this.recovery.handleFormSubmit();
      },
    });
  }
}

class Recovery {
  constructor(auth) {
    this.auth = auth;
    this.passwordResetForm = $('#myForm');

    this.validator = new Validator(this.passwordResetForm, this);
    this.validator.init();
    this.isFormInitialized = false;
    this.passwordResetForm.on('submit', (e) => {
      e.preventDefault();
    });
  }

  init() {
    if (!this.isFormInitialized) {
      this.validator.init();
      this.form.submit((event) => {
        event.preventDefault();
        if (this.validator.validator.form()) {
          this.errorContainer.empty();
          this.SignIn();
        }
      });
      this.isFormInitialized = true;
    }
  }

  async handleFormSubmit() {
    const email = $('#email').val();
    try {
      await sendPasswordResetEmail(this.auth, email);
      window.location.href = '/sign-in.html';
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          toastr.error('Incorrect password');
          break;
        case 'auth/user-not-found':
          toastr.error('User not found');
          break;
        case 'auth/too-many-requests':
          toastr.error(
            'Access to this account has been temporarily disabled due to too many failed login attempts. You can immediately restore it by resetting your password or try again later.'
          );
          break;
        case 'auth/user-disabled':
          toastr.error('User account has been disabled by the administrator');
          break;
        case 'auth/email-already-in-use':
          toastr.error('Email address is already in use by another user');
          break;
        case 'auth/credential-already-in-use':
          toastr.error(
            'These credentials are already associated with another account'
          );
          break;
        case 'auth/custom-token-mismatch':
          toastr.error('Error: Custom token does not match');
          break;
        case 'auth/requires-recent-login':
          toastr.error(
            'This operation requires reauthentication. Please sign in again.'
          );
          break;
        default:
          console.error('Authentication error:', error);
          break;
      }
    }
  }
}

$(document).ready(function () {
  const auth = getAuth(app);
  const recovery = new Recovery(auth);
  toastr.options = {
    closeButton: true,
    progressBar: true,
    timeOut: 9000,
    positionClass: 'toast-top-center',
    preventDuplicates: true,
  };
  const toastrStyles = document.createElement('link');
  toastrStyles.rel = 'stylesheet';
  toastrStyles.href =
    'https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css';
  document.head.appendChild(toastrStyles);
});

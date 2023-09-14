import $ from 'jquery';
import 'jquery-validation';
import { app } from './modules/InitFirebase';
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import toastr from 'toastr';

class SignIn {
  constructor() {
    this.customErrorMessages = {
      'auth/user-not-found': 'User not found. Please check your email.',
      'auth/wrong-password':
        'The login or password is incorrect. Please try again.',
      'auth/invalid-email':
        'Invalid email format. Please enter a valid email address.',
      'auth/too-many-requests': 'Access is blocked, please try again later',
    };
  }

  init() {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        window.location.href = '/profile-subscriptions.html';
      }
    });
    new Validator().init();
    new EmailAndPasswordSignIn().init();
    new GoogleSignIn();

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
  }
}

class Validator {
  constructor(formSelector) {
    this.formSelector = formSelector;
    this.validator = null;
  }

  init() {
    this.validator = $(this.formSelector).validate({
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
      errorPlacement: (error, element) => {
        error.appendTo(element.parent().parent().find('.input-block__error'));
      },
      highlight: (element, errorClass, validClass) => {
        $(element).parent().addClass('error-block').removeClass(validClass);
      },
      unhighlight: (element, errorClass, validClass) => {
        $(element).parent().removeClass('error-block').addClass(validClass);
      },
    });
  }
}

class EmailAndPasswordSignIn {
  constructor() {
    this.errorContainer = $('.form-error');
    this.form = $('#myForm');
    this.auth = getAuth(app);
    this.validator = new Validator(this.form);
    this.isFormInitialized = false;
    this.init();
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

  async SignIn() {
    const email = $('#email').val();
    const password = $('#password').val();
    try {
      await signInWithEmailAndPassword(this.auth, email, password).then(() => {
        window.location.href = 'index.html';
      });
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
          toastr.error('These credentials are already associated with another account');
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

class GoogleSignIn {
  constructor() {
    this.signButton = $('#googleSignInButton');
    this.auth = getAuth(app);
    this.init();
  }

  init() {
    this.signButton.click(() => this.SignIn());
  }

  async SignIn() {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(this.auth, provider);
      window.location.href = 'index.html';
    } catch (error) {
      console.error('Google Sign-In error:', error);
    }
  }
}

new SignIn().init();

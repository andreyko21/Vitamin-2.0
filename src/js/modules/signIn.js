import $ from 'jquery';
import 'jquery-validation';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

var customErrorMessages = {
  'auth/user-not-found': 'User not found. Please check your email.',
  'auth/wrong-password':
    'The login or password is incorrect. Please try again.',
  'auth/invalid-email':
    'Invalid email format. Please enter a valid email address.',
  'auth/too-many-requests': 'Доступ заблоковано, попробуйте пізніше',
};

$(document).ready(function () {
  var validator = $('#myForm').validate({
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
    submitHandler: function (form) {
      const email = form.email.value;
      const password = form.password.value;

      const firebaseConfig = {
        apiKey: 'AIzaSyBpgFlMAO4G5RzG6bzqZxY0znzeHpj63f4',
        authDomain: 'localhost',
        projectId: 'vitamin-a3aa5',
        storageBucket: 'vitamin-a3aa5.appspot.com',
      };

      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const errorContainer = $('.form-error');
      errorContainer.empty();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('Successful login:', user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          // Виводимо кастомне повідомлення, якщо воно є в списку
          if (customErrorMessages.hasOwnProperty(errorCode)) {
            errorContainer.text(customErrorMessages[errorCode]);
          } else {
            console.error('Login error:', errorCode, errorMessage);
          }
        });
    },
  });

  $('input').on('keyup change', function () {
    var valid = true;
    $('input').each(function () {
      valid = validator.element(this) && valid;
    });
  });
});

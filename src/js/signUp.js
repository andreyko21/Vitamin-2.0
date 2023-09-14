import $ from 'jquery';
import 'jquery-validation';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBpgFlMAO4G5RzG6bzqZxY0znzeHpj63f4',
  authDomain: 'vitamin-a3aa5.firebaseapp.com',
  projectId: 'vitamin-a3aa5',
  storageBucket: 'vitamin-a3aa5.appspot.com',
  messagingSenderId: '38815317747',
  appId: '1:38815317747:web:bec97192b49cbe49820186',
  measurementId: 'G-1RNF6X74BH',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

class SignUpModule {
  constructor() {
    this.customErrorMessages = {
      'auth/email-already-in-use':
        'Email is already in use. Please use a different email.',
      'auth/invalid-email':
        'Invalid email format. Please enter a valid email address.',
      'auth/weak-password':
        'Password is too weak. Please choose a stronger password.',
      'auth/too-many-requests': 'Access blocked, please try again later.',
    };
  }

  init() {
    this.setupValidation();
    this.setupRegistration();
  }

  setupValidation() {
    this.validator = $('#myForm').validate({
      rules: {
        email: {
          required: true,
          email: true,
        },
        firstName: {
          required: true,
        },
        lastName: {
          required: true,
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
        firstName: {
          required: 'Please enter your first name',
        },
        lastName: {
          required: 'Please enter your last name',
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

    $('input').on('keyup change', () => {
      let valid = true;
      $('input').each(() => {
        valid = this.validator.element(this) && valid;
      });
    });
  }

  setupRegistration() {
    const errorContainer = $('.form-error');

    $('#myForm').submit((event) => {
      event.preventDefault();

      if (this.validator.form()) {
        const email = $('#email').val();
        const password = $('#password').val();

        errorContainer.empty();

        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log('Successful registration:', user);
            const db = getFirestore(app);
            const myDocument = doc(db, 'users', user.uid);
            console.log('1');
            const newData = {
              firstName: $('#firstName').val(),
              lastName: $('#lastName').val(),
            };
            console.log('1');
            setDoc(myDocument, newData)
              .then(() => {
                console.log(
                  'Новий документ створено з власним ідентифікатором'
                );
              })
              .catch((error) => {
                console.error('Помилка створення документа:', error);
              });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            if (this.customErrorMessages.hasOwnProperty(errorCode)) {
              errorContainer.text(this.customErrorMessages[errorCode]);
            } else {
              console.error('Registration error:', errorCode, errorMessage);
            }
          });
      }
    });
  }
}

$(document).ready(function () {
  $('.radio-switch__label').on('click', function () {
    $('.radio-switch__input').removeAttr('checked');

    // Find the radio input within the clicked label and set the "checked" attribute
    $(this).find('.radio-switch__input').attr('checked', 'checked');

    // Remove the "radio-switch__label--selected" class from all labels
    $('.radio-switch__label').removeClass('radio-switch__label--selected');

    // Add the "radio-switch__label--selected" class to the clicked label
    $(this).addClass('radio-switch__label--selected');
  });
});

$(document).ready(function () {
  $('.input-block.file .input-block__file-button').on('click', function () {
    $(this)
      .closest('.input-block')
      .find(".input-block__input[type='file']")
      .click();
  });

  $(".input-block.file .input-block__input[type='file']").on(
    'change',
    function () {
      const $inputBlock = $(this).closest('.input-block');
      const $fileNameInput = $inputBlock.find('.input-block__input#fileName');

      const fileName = $(this).val().split('\\').pop();
      $fileNameInput.val(fileName);
    }
  );
});

$(document).ready(function () {
  const $labels = $('.radio-switch__label');

  $labels.on('click', function () {
    if (!$(this).hasClass('radio-switch__label--selected')) {
      $('.radio-switch__label--selected').removeClass(
        'radio-switch__label--selected'
      );
      $(this).addClass('radio-switch__label--selected');
      $(this).find('.radio-switch__input').prop('checked', true);
      $(this)
        .siblings('.radio-switch__label')
        .find('.radio-switch__input')
        .prop('checked', false);
    }
  });
});

$(document).ready(function () {
  $(".radio-switch__input[name='customerType']").on('change', function () {
    if ($(this).val() === 'wholesale') {
      $('.input-block.file').show();
    } else {
      $('.input-block.file').hide();
    }
  });
});

$(document).ready(function () {
  const $fileNameInput = $('#fileName');
  function updatePlaceholder() {
    if (window.innerWidth <= 600) {
      $fileNameInput.attr('placeholder', 'Permission');
    } else {
      $fileNameInput.attr('placeholder', 'Wholesale purchase permission');
    }
  }

  updatePlaceholder();

  $(window).on('resize', updatePlaceholder);
});

const googleSignInButton = document.getElementById('googleSignInButton');

googleSignInButton.addEventListener('click', async () => {
  const provider = new GoogleAuthProvider();

  try {
    const googleResult = await signInWithPopup(auth, provider);
    const user = googleResult.user;

    // Attempt to register the user with the same email as Google
    const email = user.email;
    const password = 'randomPassword'; // Set a temporary password for the user

    try {
      const registrationResult = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const registeredUser = registrationResult.user;

      console.log(
        'Google Sign-In and Registration successful:',
        registeredUser
      );
      // You can redirect or perform any action here after successful registration.
    } catch (registrationError) {
      if (registrationError.code === 'auth/email-already-in-use') {
        // Account with the email already exists
        console.log('Account with this email already exists.');
        // You might consider handling this case or informing the user
      } else {
        console.error('Registration error:', registrationError);
      }
    }
  } catch (signInError) {
    console.error('Google Sign-In error:', signInError);
  }
});

new SignUpModule().init();

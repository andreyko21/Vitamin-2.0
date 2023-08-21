import $ from 'jquery';
import 'jquery-validation';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
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

class SignIn{
  constructor() {
    
  }
}

class SignInModule {
  constructor() {
    this.customErrorMessages = {
      'auth/user-not-found': 'User not found. Please check your email.',
      'auth/wrong-password':
        'The login or password is incorrect. Please try again.',
      'auth/invalid-email':
        'Invalid email format. Please enter a valid email address.',
      'auth/too-many-requests': 'Доступ заблоковано, попробуйте пізніше',
    };
  }

  init() {
    this.setupValidation();
    this.setupSignIn();
    this.setupFacebookSignIn();
    this.setupGoogleSignIn();
  }

  setupValidation() {
    this.validator = $('#myForm').validate({
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

    $('input').on('keyup change', () => {
      let valid = true;
      $('input').each(() => {
        valid = this.validator.element(this) && valid;
      });
    });
  }

  setupSignIn() {
    const errorContainer = $('.form-error');

    $('#myForm').submit((event) => {
      event.preventDefault();

      // Перевіряємо, чи пройшла валідація
      if (this.validator.form()) {
        const email = $('#email').val();
        const password = $('#password').val();

        const firebaseConfig = {
          apiKey: 'AIzaSyBpgFlMAO4G5RzG6bzqZxY0znzeHpj63f4',
          authDomain: 'localhost',
          projectId: 'vitamin-a3aa5',
          storageBucket: 'vitamin-a3aa5.appspot.com',
        };

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);

        errorContainer.empty();

        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log('Successful login:', user);

            // Виконуємо додатковий код, який повинен бути виконаний після успішного входу
            // Наприклад, перенаправлення на іншу сторінку:
            window.location.href = 'index.html';
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            if (this.customErrorMessages.hasOwnProperty(errorCode)) {
              errorContainer.text(this.customErrorMessages[errorCode]);
            } else {
              console.error('Login error:', errorCode, errorMessage);
            }
          });
      }
    });
  }
  setupGoogleSignIn() {
    const googleSignInButton = document.getElementById('googleSignInButton');

    googleSignInButton.addEventListener('click', async () => {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();

      try {
        const googleResult = await signInWithPopup(auth, provider);
        const user = googleResult.user;

        console.log('Google Sign-In successful:', user);
        // Perform additional actions after successful sign-in
      } catch (error) {
        console.error('Google Sign-In error:', error);
      }
    });
  }
  setupFacebookSignIn() {
    const facebookSignInButton = document.getElementById(
      'facebookSignInButton'
    );

    facebookSignInButton.addEventListener('click', async () => {
      const provider = new FacebookAuthProvider();
      const auth = getAuth();

      try {
        const facebookResult = await signInWithPopup(auth, provider);
        const user = facebookResult.user;

        console.log('Facebook Sign-In successful:', user);

        // Check if the user's account exists with different credentials
        try {
          const methods = await fetchSignInMethodsForEmail(auth, user.email);

          if (methods.includes('password')) {
            // Handle account linking scenario
            // Display UI to let the user choose how to proceed (link accounts or not)
            // Implement account linking logic using linkWithCredential
            const password = prompt('Enter your password to link accounts:');
            const credential = EmailAuthProvider.credential(
              user.email,
              password
            );
            await linkWithCredential(user, credential);
            console.log('Accounts linked successfully.');
          } else {
            // Proceed with account creation
            const registrationResult = await createUserWithEmailAndPassword(
              auth,
              user.email,
              'randomPassword'
            );
            const registeredUser = registrationResult.user;

            console.log(
              'Facebook Sign-In and Registration successful:',
              registeredUser
            );
            // Additional actions after successful registration
          }
        } catch (error) {
          console.error('Error checking sign-in methods:', error);
        }
      } catch (error) {
        console.error('Facebook Sign-In error:', error);
      }
    });
  }
}
new SignInModule().init();

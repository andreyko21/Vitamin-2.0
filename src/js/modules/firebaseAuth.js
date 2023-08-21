import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const customErrorMessages = {
  'auth/user-not-found': 'User not found. Please check your email.',
  'auth/wrong-password':
    'The login or password is incorrect. Please try again.',
  'auth/invalid-email':
    'Invalid email format. Please enter a valid email address.',
  'auth/too-many-requests': 'Доступ заблоковано, попробуйте пізніше',
};

export function signIn(email, password) {
  const firebaseConfig = {
    apiKey: 'AIzaSyBpgFlMAO4G5RzG6bzqZxY0znzeHpj63f4',
    authDomain: 'localhost',
    projectId: 'vitamin-a3aa5',
    storageBucket: 'vitamin-a3aa5.appspot.com',
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  return signInWithEmailAndPassword(auth, email, password).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    if (customErrorMessages.hasOwnProperty(errorCode)) {
      return customErrorMessages[errorCode];
    } else {
      return `Login error: ${errorCode} ${errorMessage}`;
    }
  });
}

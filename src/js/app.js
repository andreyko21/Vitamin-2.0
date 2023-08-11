import BurgerMenu from './modules/BurgerMenu';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

new BurgerMenu().init();

const firebaseConfig = {
  apiKey: 'AIzaSyBpgFlMAO4G5RzG6bzqZxY0znzeHpj63f4',
  authDomain: 'localhost',
  projectId: 'vitamin-a3aa5',
  storageBucket: 'vitamin-a3aa5.appspot.com',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// const loginForm = document.querySelector('#login-form');
// loginForm.addEventListener('submit', async (e) => {
//   e.preventDefault();

//   const email = loginForm.email.value;
//   const password = loginForm.password.value;

//   try {
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     const user = userCredential.user;
//     console.log('Successful login:', user);
//     // Додатковий код після успішного входу
//   } catch (error) {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.error('Login error:', errorCode, errorMessage);
//   }
// });

const db = getFirestore(app);

// Приклад використання collection та getDocs
auth.onAuthStateChanged(function (user) {
  if (user) {
    var userId = user.uid;
    const userCollection = collection(db, 'users');
    getDocs(userCollection)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, '=>', doc.data());
        });
      })
      .catch(function (error) {
        console.log('Помилка отримання даних:', error);
      });
  } else {
    console.log('Користувач не авторизований');
  }
});

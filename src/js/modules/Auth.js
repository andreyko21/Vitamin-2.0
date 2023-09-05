import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBpgFlMAO4G5RzG6bzqZxY0znzeHpj63f4',
  authDomain: 'localhost',
  projectId: 'vitamin-a3aa5',
  storageBucket: 'vitamin-a3aa5.appspot.com',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

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

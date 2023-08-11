// Конфігурація Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBpgFlMAO4G5RzG6bzqZxY0znzeHpj63f4',
  authDomain: 'localhost',
  projectId: 'vitamin-a3aa5',
  storageBucket: 'vitamin-a3aa5.appspot.com',
};

// Ініціалізація Firebase
firebase.initializeApp(firebaseConfig);

// Обробник події відправки форми
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  // Авторизація через Email/Password
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Успішний вхід
      const user = userCredential.user;
      console.log('Успішний вхід:', user);
    })
    .catch((error) => {
      // Помилка входу
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Помилка входу:', errorCode, errorMessage);
    });
});

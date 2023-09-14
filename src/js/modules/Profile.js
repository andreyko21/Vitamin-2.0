import $ from 'jquery';
import { app } from './InitFirebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export class Profile {
  constructor() {
    this.exitButton = $('.profile-sidebar__menu-item_exit');
    this.auth = getAuth(app);
    this.bindEvents();
    this.init();
  }

  init() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
      } else {
        window.location.href = './sign-In.html';
      }
    });
  }

  bindEvents() {
    this.exitButton.click(() => this.SignOut());
  }

  SignOut() {
    this.auth
      .signOut()
      .then(() => {
        console.log('Пользователь вышел из системы');
      })
      .catch((error) => {
        console.error('Ошибка при выходе из системы:', error);
      });
    window.location.href = './sign-In.html';
  }
}

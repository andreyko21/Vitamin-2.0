import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './InitFirebase';
import { BasketController } from './Basket';
import { BurgerMenu } from './BurgerMenu';
import $ from 'jquery';

export class Header {
    constructor() {
        this.profileButton = $('.header__buttons').find('.profile');
        this.basketButton = $('.header__buttons').find('.header__basket-button');
        this.quizButton = $('.header__quiz-button');
        this.burgerButton = $('.burger-menu-button');
        this.bindEvents();
        this.auth = getAuth(app);
        this.basket = new BasketController();
        this.burger = new BurgerMenu();
    }

    bindEvents() {
        this.profileButton.click(() => this.OpenProfile());
        this.quizButton.click(() => this.OpenQuiz());
    }

    OpenProfile() {
        onAuthStateChanged(this.auth, (user) => {
            if (user) {
                window.location.href = '/profile-subscriptions.html';
            } else {
                window.location.href = '/sign-in.html';
            }
        });
    }

    OpenQuiz() {
        window.location.href = '/quiz-1.html';
    }
}

$(document).ready(function() {
    const header = $('.header');
    const scrollThreshold = 20;
    $(window).scroll(function() {
        if ($(this).scrollTop() > scrollThreshold) {
            header.addClass('header-background');
        } else {
            header.removeClass('header-background');
        }
    });
  });
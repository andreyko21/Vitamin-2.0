import $ from 'jquery';
import { app } from './InitFirebase';
import { ScrollLock } from './ScrollLock';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export class BurgerMenu {
  constructor() {
    this.scroll = new ScrollLock();
    this.menuOpen = false;
    this.auth = getAuth(app);
    this.burgerMenu = $('.burger-menu');
    this.openButton = $('.burger-menu-button');
    this.closeButton = $('.burger-menu__container').find('.burger-menu-button');
    this.subMenus = {
      shops: {
        menu: $('.sub-menu_shop'),
        openButton: $('.burger-shop-open-button'),
        closeButton: $('.burger-shop-close-button'),
      },
      information: {
        menu: $('.sub-menu_information'),
        openButton: $('.burger-information-open-button'),
        closeButton: $('.burger-information-close-button'),
      },
      profile: {
        menu: $('.sub-menu_profile'),
        openButton: $('.burger-profile-open-button'),
        closeButton: $('.burger-profile-close-button'),
      },
    };
    this.body = $('body');
    this.bindEvents();
  }

  bindEvents() {
    this.openButton.click(() => this.ShowBurgerMenu());
    this.closeButton.click(() => this.HideBurgerMenu());
    this.subMenus.shops.openButton.click(() => this.ShowSubMenu(this.subMenus.shops));
    this.subMenus.shops.closeButton.click(() => this.HideSubMenu(this.subMenus.shops));
    this.subMenus.information.openButton.click(() => this.ShowSubMenu(this.subMenus.information));
    this.subMenus.information.closeButton.click(() => this.HideSubMenu(this.subMenus.information));

    this.subMenus.profile.openButton.click(() => this.OpenProfile());
    this.subMenus.profile.closeButton.click(() => this.HideSubMenu(this.subMenus.profile));


  }

  ShowBurgerMenu() {
    this.scroll.toggleBodyLock(true);
    this.burgerMenu.addClass('burger-open');
  }

  HideBurgerMenu() {
    this.scroll.toggleBodyLock(false);
    this.burgerMenu.removeClass('burger-open');
  }

  ShowSubMenu(obj) {
    obj.menu.addClass('submenu-open');
  }

  HideSubMenu(obj) {
    obj.menu.removeClass('submenu-open');
  }

  OpenProfile() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.ShowSubMenu(this.subMenus.profile);
        this.signOutButton = $('#signOut');
        this.signOutButton.click(() => this.auth
        .signOut())
      } else {
        window.location.href = '/sign-in.html';
      }
    });
  }
}


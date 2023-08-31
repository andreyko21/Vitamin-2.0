import './basket';
class BurgerMenu {
  constructor() {
    this.menuOpen = false;
    this.burgerMenu = document.querySelector('.burger-menu');
    this.burgerButtons = document.querySelectorAll('.burger-menu-button');
    this.subMenus = {
      shops: {
        menu: document.querySelector('.sub-menu_shop'),
        openButton: document.querySelector('.burger-shop-open-button'),
        closeButton: document.querySelector('.burger-shop-close-button'),
      },
      information: {
        menu: document.querySelector('.sub-menu_information'),
        openButton: document.querySelector('.burger-information-open-button'),
        closeButton: document.querySelector('.burger-information-close-button'),
      },
      profile: {
        menu: document.querySelector('.sub-menu_profile'),
        openButton: document.querySelector('.burger-profile-open-button'),
        closeButton: document.querySelector('.burger-profile-close-button'),
      },
    };
    this.body = document.body;
    this.bindSubMenuEvents();
  }

  init() {
    if (this.burgerButtons.length > 0 && this.burgerMenu) {
      this.burgerButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
          this.toggleMenu(index);
        });
      });
    }
  }

  toggleSubMenu(subMenu) {
    subMenu.classList.toggle('open');
    this.toggleScrollLock();
  }

  toggleScrollLock() {
    this.body.classList.toggle('scroll-lock');
  }

  bindSubMenuEvents() {
    for (const key in this.subMenus) {
      const { menu, openButton, closeButton } = this.subMenus[key];
      if (menu && openButton && closeButton) {
        openButton.addEventListener('click', () => {
          this.toggleSubMenu(menu);
        });
        closeButton.addEventListener('click', () => {
          menu.classList.remove('open');
          this.toggleScrollLock();
        });
      }
    }
  }

  toggleMenu(index) {
    this.menuOpen = !this.menuOpen;
    this.burgerMenu.classList.toggle('open', this.menuOpen);
  }
}

export default BurgerMenu;

import BurgerMenu from './modules/BurgerMenu';
import Swiper from 'swiper';
new BurgerMenu().init();



window.addEventListener('load', function () {
  const swiperContainer = document.querySelector('.swiper-container');
  if (swiperContainer) {
    const mySwiper = new Swiper(swiperContainer, {
      slidesPerView: 1,
      spaceBetween: 32,
      breakpoints: {
        600: {
          slidesPerView: 2,
        },
        960: {
          slidesPerView: 3,
        },
      },
    });
  }
});

window.addEventListener('load', function () {
  const swiperContainer = document.querySelector('.products-swiper-container');
  if (swiperContainer) {
    const mySwiper = new Swiper(swiperContainer, {
      slidesPerView: 1,
      spaceBetween: 10,
      breakpoints: {
        401: {
          slidesPerView: 1.5,
          spaceBetween: 10,
        },
        601: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        961: {
          slidesPerView: 1,
          spaceBetween: 40,
        },
        1351: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
      },
    });
  }
});



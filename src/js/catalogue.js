import BurgerMenu from './modules/BurgerMenu';
import { Swiper, Navigation } from 'swiper';

new BurgerMenu().init();

document.addEventListener('DOMContentLoaded', function () {
  const swiperContainer = document.querySelector(
    '.what-users-say__swiper-container'
  );
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

document.addEventListener('DOMContentLoaded', function () {
  Swiper.use([Navigation]);
  const swiperContainer = document.querySelector(
    '.slider-section__swiper-container'
  );
  if (swiperContainer) {
    const mySwiper = new Swiper(swiperContainer, {
      navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
      },
      slidesPerView: 1,
      spaceBetween: 50,
      centeredSlides: true,
      loop: true,
      breakpoints: {
        600: {
          slidesPerView: 1,
        },
        960: {
          slidesPerView: 1.36,
        },
      },
    });
  }
});

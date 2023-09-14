import Swiper from 'swiper';

export class CustomSwiper {
  constructor(selector, options) {
    this.selector = selector;
    this.options = options;
    this.initSwiper();
  }

  initSwiper() {
    this.swiper = new Swiper(this.selector, this.options);
  }

  update() {
    this.swiper.update();
  }
}
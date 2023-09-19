import $ from 'jquery';
import { Swiper, Navigation } from 'swiper';
import { app } from './modules/InitFirebase';
import { getFirestore, collection, getDocs, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Header } from './modules/Header';
import { Reviews } from './modules/Reviews';

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

class Catalogue {
  constructor() {
    this.header = new Header();
    this.reviews = new Reviews();
    this.productsListBlock = $('.catalogue-list');
    this.sidebarMenuButton = $('.catalogue-sidebar__menu-item');
    this.productsListVal = [];
    this.bindEvents();
    this.db = getFirestore(app);
    this.GetPage();
    
  }

  bindEvents() {
    this.sidebarMenuButton.click((event) => this.GetPage(event.target.textContent));
  }


  GetPage(type) {
    if(type == null){
    const fragment = window.location.hash.replace(/[#_]/g, ' ');
    fragment;
    this.getProducts(fragment.trim());
    } else{
      this.getProducts(type.trim());
    }
    
  }

  async getProducts(type) {
    this.productsListVal = [];
    const productsCollectionRef = collection(this.db, 'products');
    const querySnapshot = await getDocs(productsCollectionRef);
    this.productsListBlock.empty();
    querySnapshot.forEach((doc) => {
      if (doc.id.includes('product-')) {
        if (type) {
          if(doc.data().type == type){
            this.productsListVal.push({ id: doc.id, ...doc.data() });
          } else if(type == 'All categories'){
            this.productsListVal.push({ id: doc.id, ...doc.data() });
          } else if(type == 'Sale' || type == 'Sale%'){
            if(doc.data().discountPrice != null && doc.data().discountPrice != 0){
              this.productsListVal.push({ id: doc.id, ...doc.data() });
            }
          }
        } else {
          this.productsListVal.push({ id: doc.id, ...doc.data() });
        }
      }
    });
    this.AddItems(this.productsListVal);
  }
  AddItems(productsList) {
    for (const product of productsList) {
      let priceBlock, discountBlock;
      if (product.discountPrice != null && product.discountPrice != 0) {
        priceBlock = `<span class="sub-price">${product.price.toFixed(
          2
        )}</span><span class="discount-price">${product.discountPrice.toFixed(
          2
        )}</span>`;
        discountBlock = `<div class="discount-block">${(
          100 -
          (product.discountPrice / product.price) * 100
        ).toFixed(0)}</div>`;
      } else {
        priceBlock = `<span class="price">${product.price.toFixed(2)}</span>`;
      }
      let productElement =
        $(`<a class="product-box" href="/${product.id.replace('-', '.html#')}" id="${
          product.id
        }">
        ${discountBlock ? discountBlock : ''}
      <picture class="product-box__img">
          <source srcset="${
            product.img.avif
          }" type="image/avif" class="product-box__avif" />
          <source srcset="${
            product.img.webp
          }" type="image/webp" class="product-box__webp" />
          <img src="${product.img.png}" alt="" class="product-box__png" />
        </picture>
      <p class="product-box__type" style="color:${product.color}">${product.type}</p>
      <p class="product-box__name">${product.name}</p>
      <p class="product-box__price-block">${priceBlock}</p>
  </a>
  `);

      this.productsListBlock.append(productElement);
    }
  }
}

new Catalogue();

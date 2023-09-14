import $ from 'jquery';
import 'jquery-mask-plugin';
import { app } from './modules/InitFirebase';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

$(document).ready(function () {
  $('#phoneNumber').mask('0 000 000 00 00', {
    translation: {
      r: {
        pattern: /[\/]/,
        fallback: '/',
      },
    },
  });
  $('#cardNumber').mask('0000 0000 0000 0000', {
    translation: {
      r: {
        pattern: /[\/]/,
        fallback: '/',
      },
      placeholder: 'XXXX XXXX XXXX XXXX',
    },
  });
  $('#expiration').mask('01/11', {
    translation: {
      0: {
        pattern: /^[0-1]/,
      },
      1: {
        pattern: /^[0-9]/,
      },
    },
    placeholder: 'MM/YY',
  });
  $('#cvc').mask('000', {
    translation: {
      r: {
        pattern: /[\/]/,
        fallback: '/',
      },
    },
  });

  let animating = false;

  $('.order-checkout-sidebar__accordeon').click(function () {
    if ($(window).width() < 600) {
      const accordionContent = $(this).next(
        '.order-checkout-sidebar__accordeon-content'
      );
      if (accordionContent.is(':hidden')) {
        $(this)
          .find('.order-checkout-sidebar__accordeon-arrow')
          .addClass('open');
      } else {
        $(this)
          .find('.order-checkout-sidebar__accordeon-arrow')
          .removeClass('open');
      }
      accordionContent.slideToggle(function () {
        animating = false;
      });
    }
  });
});

class Order {
  constructor() {
    this.orderButton = $('.order-checkout-sidebar__button');
    this.subtotal = $('.total-block__item-price');
    this.discount = $('.total-block__item-price-discount');
    this.shipping = $('.total-block__item-price-shipping');
    this.totalPrice = $('.total-block__total-price-price');
    this.accordionTotalPrice = $(
      '.order-checkout-sidebar__accordeon-total-price'
    );
    this.discountBlock = $('.total-block__discount');
    this.listBlock = $('.order-checkout-sidebar__products-list');
    const basketArrayString = localStorage.getItem('basketArray');
    if (basketArrayString !== null) {
      const basket = JSON.parse(basketArrayString);
      if (Array.isArray(basket)) {
        this.basket = basket;
        basket.forEach((element) => {
          this.AddItem(element);
        });
      } else {
        console.error('Ошибка при получении корзины из localStorage');
      }
    }
    this.init();
    this.bindEvents();
  }

  bindEvents() {
    this.orderButton.click(() => this.Buy());
  }

  init() {
    this.auth = getAuth(app);
    this.db = getFirestore(app);
    let subtotal = 0;
    let discount = 0;
    let shipping = 9.99;
    this.basket.forEach((element) => {
      subtotal += element.price * element.amount;
      if (element.discountPrice != null && element.discountPrice != 0) {
        discount += (element.price - element.discountPrice) * element.amount;
      }
    });

    this.discountBlock.css('display', discount != 0 ? 'flex' : 'none');

    this.totalPriceVal = (subtotal - discount + shipping).toFixed(2);
    this.subtotal.text(subtotal.toFixed(2));
    this.discount.text(discount.toFixed(2));
    this.shipping.text(shipping);
    this.totalPrice.text(this.totalPriceVal);
    this.accordionTotalPrice.text(this.totalPriceVal);
  }

  async Buy() {
    try {
      const user = this.auth.currentUser;
      if (user) {
        const uid = user.uid;
        const userDocRef = doc(this.db, 'users', uid);
        console.log(uid);
        const newOrderDocRef = await addDoc(collection(userDocRef, 'orders'), {
          date: this.GetDate(),
          status: 'Shipping',
          number: this.GenerateRandomNumber(),
          amount: this.GetAllAmount(),
          price: this.totalPriceVal,
          products: this.basket,
        });
      } else {
        console.log('Пользователь не авторизован');
      }
    } catch (e) {
      console.error('Error adding document: ', e);
    } finally {
      this.basket = [];
      localStorage.setItem('basketArray', JSON.stringify(this.basket));
      window.location.href = '/order-processed.html';
    }
  }

  GetAllAmount() {
    let amount = 0;
    this.basket.forEach((element) => {
      amount += parseInt(element.amount);
    });
    return amount;
  }

  GenerateRandomNumber() {
    const min = 10000;
    const max = 99999;
    const min2 = 1000;
    const max2 = 9999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const randomNumber2 = Math.floor(Math.random() * (max2 - min2 + 1)) + min2;
    const formattedNumber = `${randomNumber}-${randomNumber2}`;
    return formattedNumber;
  }

  GetDate() {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const today = new Date();
    const day = today.getDate();
    const monthIndex = today.getMonth();
    const year = today.getFullYear();

    const formattedDate = `${day} ${months[monthIndex]} ${year}`;
    return formattedDate;
  }

  AddItem(product) {
    let priceBlock;
    if (product.discountPrice != null && product.discountPrice != 0) {
      priceBlock = `<span class="sub-price">${(
        product.price * product.amount
      ).toFixed(2)}</span><span class="discount-price">${(
        product.discountPrice * product.amount
      ).toFixed(2)}</span>`;
    } else {
      priceBlock = `<span class="price">$${(
        product.price * product.amount
      ).toFixed(2)}</span>`;
    }

    let newItem = $(`<div class="products-item-checkout" id="${product.id}">
    <picture class="products-item-checkout__img" style="background-color: ${product.background}">
      <source srcset="${product.img.avif}" type="image/avif" class="products-item-checkout__avif"/>
      <source srcset="${product.img.webp}" type="image/webp" class="products-item-checkout__webp"/>
      <img src="${product.img.png}" type="image/png" alt="Ortho Complex" class="products-item-checkout__png"/>
    </picture>
    <p class="products-item-checkout__name">
      <span class="amount">${product.amount}</span> x <span class="name"> ${product.name} </span>
    </p>
    <div class="products-item-checkout__price">${priceBlock}</div>
  </div>`);
    this.listBlock.append(newItem);
  }
}

new Order();

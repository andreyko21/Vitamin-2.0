import $ from 'jquery';
import { AmountInput } from './stepperInput';
import { ScrollLock } from './ScrollLock';
import { getDoc } from 'firebase/firestore';
import { app } from './InitFirebase';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import {
  GetLocalStorageArray,
  GetProduct,
  SetLocalStorageArray,
} from './Methods';

export class BasketController {
  constructor() {
    this.basketIcon = $('.basket-button-icon');
    this.basketContainer = $('#basketContainer');
    this.basketSection = $('.basket-section');
    this.basketListBlock = $('.basket-section__product-list');
    this.htmlElement = $('html');
    this.basketTotalPrice = $('.basket-section__footer-button');
    this.scroll = new ScrollLock();
    this.auth = getAuth(app);
    this.db = getFirestore(app);
    this.bindEvents();
    this.loadBasketItems();
  }

  bindEvents() {
    $('.header__basket-button').click(() => this.showBasket());
    $('#hideBasketButton').click(() => this.hideBasket());
    this.basketContainer.click(() => this.hideBasket());
    this.basketSection.click((event) => this.stopPropagation(event));
    this.basketListBlock.click((event) => this.elementFunc(event));
    this.basketTotalPrice.click(() => this.GoToOrderPage());
  }

  GoToOrderPage() {
    const basketArrayString = localStorage.getItem('basketArray');
    if (basketArrayString !== null) {
      const basket = JSON.parse(basketArrayString);
      if (Array.isArray(basket) && basket.length > 0) {
        window.location.href = '/order-checkout.html';
      }
    }
  }

  showBasket() {
    this.basketContainer.fadeIn();
    this.basketSection.addClass('basket-open');
    this.scroll.toggleBodyLock(true);
  }

  hideBasket() {
    this.basketContainer.fadeOut(() => {});
    this.scroll.toggleBodyLock(false);
    this.basketSection.removeClass('basket-open');
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

  async elementFunc(event) {
    const targetClasses = event.target.classList;
    if (targetClasses.contains('stepper-input__button')) {
      AmountInput($(event.target));
      console.log(event.target);
      await this.changeElement(
        $(event.target).parent()[0].id.replace('stepper-', '')
      );
    } else if (targetClasses.contains('basket-list-item__delete')) {
      const productId = event.target.getAttribute('id');
      this.DeleteItem(productId);
      console.log(event.target);
    } else if (targetClasses.contains('checkbox')){
      const productId = event.target.getAttribute('id');
      console.log(event.target);
    }
  }

  async changeElement(productId) {
    try {
      const basket = GetLocalStorageArray('basketArray') || [];

      if (!Array.isArray(basket)) {
        console.error('Помилка при отриманні кошика з localStorage');
        return;
      }

      for (let index = 0; index < basket.length; index++) {
        const productData = basket[index];

        if (productData.id === productId) {
          const product = await GetProduct(productData);
          const amountInput = $(`#item-${productId}`).find(
            '.stepper-input__input'
          );
          const amount = amountInput.val();

          let newPrice;
          if (product.discountPrice != null && product.discountPrice !== 0) {
            newPrice = (amount * product.discountPrice).toFixed(2);
            $(`#item-${productId}`).find('.discount-price').html(newPrice);
          } else {
            newPrice = (amount * product.price).toFixed(2);
            $(`#item-${productId}`).find('.price').html(newPrice);
          }

          basket[index].amount = amount;
          this.UpdateBasket();
        }
      }

      SetLocalStorageArray('basketArray', basket);
    } catch (error) {
      console.error('Помилка при оновленні елементу кошика:', error);
    }
  }

  async AddItem(productData) {
    const product = await GetProduct(productData);
    this.UpdateBasket();
    let priceBlock;
    if (product.discountPrice != null && product.discountPrice != 0) {
      priceBlock = `<span class="sub-price">${(
        product.price * product.amount
      ).toFixed(2)}</span><span class="discount-price">${(
        product.discountPrice * product.amount
      ).toFixed(2)}</span>`;
    } else {
      priceBlock = `<span class="price">${(
        product.price * product.amount
      ).toFixed(2)}</span>`;
    }
    let checkbox = '';
    if (productData.autoship != null) {
      checkbox = `<input class="custom-checkbox" checked type="checkbox" id="autoship-${product.id}" name="Autoship" value="true"></input>`;
    } else {
      checkbox = `<input class="custom-checkbox" type="checkbox" id="autoship-${product.id}" name="Autoship" value="true"></input>`;
    }
    let optionArray = [15, 30, 45, 60];
    let optionArrayHtml = '';
    for (let i = 0; i < optionArray.length; i++) {
      if (
        productData.autoship != null &&
        optionArray[i] == productData.autoship
      ) {
        optionArrayHtml += `<option selected value="${optionArray[i]}">${optionArray[i]}</option>`;
      } else {
        optionArrayHtml += `<option  value="${optionArray[i]}">${optionArray[i]}</option>`;
      }
    }

    let newItem = $(`<div class="basket-list-item" id="item-${product.id}">
    <picture class="basket-list-item__img" style="background-color: ${product.background}">
      <source
        srcset="${product.img.avif}"
        type="image/avif"
      />
      <source
        srcset="${product.img.webp}"
        type="image/webp"
      />
      <img
        src="${product.img.png}"
        alt="Ortho Complex"
      />
    </picture>
    <p class="basket-list-item__name">
      ${product.name}
    </p>
    <svg class="basket-list-item__delete" id="${product.id}">
      <use xlink:href="/images/Sprite.svg#close"></use>
    </svg>
    <div class="basket-list-item__amount">
     <div class="stepper-input" id="stepper-${product.id}">
      <button class="stepper-input__button decrement">-</button>
      <div class="stepper-input__content">
          <input type="text" id="amount-${product.id}" class="stepper-input__input" value="${product.amount}" readonly aria-label="Amount"/>
      </div>
      <button class="stepper-input__button increment">+</button>
  </div>
    </div>
    <p class="basket-list-item__price-block">${priceBlock}</p>
    <hr class="basket-list-item__line" />
    <div class="basket-list-item__time-delivery"> 
      <div class="checkbox">
      ${checkbox}
      <label for="autoship-${product.id}">Autoship every <div class="input-block">
    <label class="input-block__label" for="time-${product.id}">
      <select id="time-${product.id}"  class="input-block__select">
        ${optionArrayHtml}
      </select>
    </label>
    <div class="input-block__error"></div>
  </div>
   days</label>
    </div>
    </div>
  </div>`);
    $('.basket-section__product-list').append(newItem);
  }

  UpdateItem(productData) {
    $(`#item-${productData.id}`)
      .find('.stepper-input__input')
      .html(productData.amount);
  }

  DeleteItem(productId) {
    $(`#item-${productId}`).remove();
    const basketArrayString = localStorage.getItem('basketArray');
    if (basketArrayString !== null) {
      const basket = JSON.parse(basketArrayString);
      if (Array.isArray(basket)) {
        basket.forEach((element, index) => {
          if (element.id == productId) {
            basket.splice(index, 1);

            localStorage.setItem('basketArray', JSON.stringify(basket));
            this.UpdateBasket();
          }
        });
      } else {
        console.error('Ошибка при получении корзины из localStorage');
      }
    }
  }

  async loadBasketItems() {
    const basketArrayString = localStorage.getItem('basketArray');
    if (basketArrayString !== null) {
      const basket = JSON.parse(basketArrayString);
      if (Array.isArray(basket)) {
        await basket.forEach(async (product) => {
          await this.AddItem(product);
        });
      } else {
        console.error('Ошибка при получении корзины из localStorage');
      }
    }
    this.UpdateBasket();
  }

  async UpdateBasketItem(productData) {
    const product = await GetProduct(productData);
    this.UpdateAmount(product);
  }

  UpdateAmount(product) {
    $(`#item-${product.id}`).find('.stepper-input__input').val(product.amount);
    this.UpdateProductPrice(product);
    this.UpdateAutoship(product);
  }

  UpdateAutoship(product) {
    console.log(product.autoship);
    if (product.autoship != null) {
      $(`#item-${product.id}`).find('.custom-checkbox').attr('checked', true);
      $(`#item-${product.id}`).find('.input-block__select').val(product.autoship);

    } else{
      $(`#item-${product.id}`).find('.custom-checkbox').attr('checked', false);
    }
  }

  UpdateProductPrice(product) {
    let newPrice;
    if (product.discountPrice != null && product.discountPrice !== 0) {
      newPrice = (product.amount * product.discountPrice).toFixed(2);
      $(`#item-${product.id}`).find('.discount-price').html(newPrice);
    } else {
      newPrice = (product.amount * product.price).toFixed(2);
      $(`#item-${product.id}`).find('.price').html(newPrice);
    }
  }

  UpdateBasket() {
    this.basketList = GetLocalStorageArray('basketArray');
    this.BasketIsEmpty();
    this.ChangeBasketIcon();

    this.ChangeTotalPrice();
  }

  BasketIsEmpty() {
    if (this.basketList.length == 0) {
      $('.basket-section__footer').css('display', 'none');
      $('.basket-section__empty-block').css('display', 'flex');
    } else {
      $('.basket-section__footer').css('display', 'block');
      $('.basket-section__empty-block').css('display', 'none');
    }
  }

  ChangeBasketIcon() {
    if (this.basketList.length == 0) {
      this.basketIcon.attr('xlink:href', '/images/Sprite.svg#Cart');
    } else {
      this.basketIcon.attr('xlink:href', '/images/Sprite.svg#Cart_alert');
    }
  }

  ChangeTotalPrice() {
    let price = this.basketListBlock.find('.price');
    let totalPrice = 0;
    for (let i = 0; i < price.length; i++) {
      totalPrice += parseFloat(price[i].textContent);
    }
    this.basketTotalPrice.html(totalPrice.toFixed(2));
  }

  async getDoc(ref) {
    try {
      return await getDoc(ref);
    } catch (error) {
      console.error('Помилка при отриманні даних: ', error);
    }
  }
}

import $ from 'jquery';
import './stepperInput';
import { AmountInput } from './stepperInput';
import { ScrollLock } from './ScrollLock';

export class BasketController {
  constructor() {
    this.basketIcon = $('.basket-button-icon');
    this.basketContainer = $('#basketContainer');
    this.basketSection = $('.basket-section');
    this.basketList = $('.basket-section__product-list');
    this.htmlElement = $('html');
    this.basketTotalPrice = $('.basket-section__footer-button');
    this.scroll = new ScrollLock();
    this.bindEvents();
    this.loadBasketItems();
  }

  bindEvents() {
    $('.header__basket-button').click(() => this.showBasket());
    $('#hideBasketButton').click(() => this.hideBasket());
    this.basketContainer.click(() => this.hideBasket());
    this.basketSection.click((event) => this.stopPropagation(event));
    this.basketList.click((event) => this.elementFunc(event));
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

  elementFunc(event) {
    const targetClasses = event.target.classList;
    if (targetClasses.contains('stepper-input__button')) {
      AmountInput($(event.target));
      this.changeElement(
        $(event.target).parent()[0].id.replace('stepper-', '')
      );
      this.updateTotalPrice();
    } else if (targetClasses.contains('basket-list-item__delete')) {
      const productId = event.target.getAttribute('id');
      this.DeleteItem(productId);
      this.updateTotalPrice();
    }
  }

  changeElement(id) {
    const basketArrayString = localStorage.getItem('basketArray');
    if (basketArrayString !== null) {
      const basket = JSON.parse(basketArrayString);
      if (Array.isArray(basket)) {
        basket.forEach((element, index) => {
          if (element.id === id) {
            const amount = $(`#item-${id}`).find('.stepper-input__input').val();
            if (element.discountPrice != null && element.discountPrice != 0) {
              $(`#item-${id}`)
                .find('.discount-price')
                .html((amount * element.discountPrice).toFixed(2));
              AmountInput($(event.target).parent());
              $(`#item-${id}`)
                .find('.sub-price')
                .html((amount * element.price).toFixed(2));
            } else {
              $(`#item-${id}`)
                .find('.price')
                .html((amount * element.price).toFixed(2));
            }

            basket[index].amount = amount;
          }
        });
        localStorage.setItem('basketArray', JSON.stringify(basket));
      } else {
        console.error('Ошибка при получении корзины из localStorage');
      }
    }
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
      priceBlock = `<span class="price">${(
        product.price * product.amount
      ).toFixed(2)}</span>`;
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
      <input class="custom-checkbox" type="checkbox" id="autoship-${product.id}" name="Autoship" value="true">
      <label for="autoship-${product.id}">Autoship every <div class="input-block">
    <label class="input-block__label" for="time-${product.id}">
      <select id="time-${product.id}" class="input-block__select">
        <option value="15">15</option>
        <option value="30">30</option>
        <option value="45">45</option>
        <option value="60">60</option>
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

  ChangeItem(product) {
    $(`#item-${product.id}`).find(`#amount-${product.id}`).val(product.amount);
    $(`#item-${product.id}`)
      .find('.basket-list-item__price-block')
      .find('.sub-price')
      .html((product.amount * product.price).toFixed(2));
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
          }
        });
      } else {
        console.error('Ошибка при получении корзины из localStorage');
      }
    }
  }

  loadBasketItems() {
    const basketArrayString = localStorage.getItem('basketArray');
    if (basketArrayString !== null) {
      const basket = JSON.parse(basketArrayString);
      if (Array.isArray(basket)) {
        basket.forEach((element) => {
          this.AddItem(element);
        });
      } else {
        console.error('Ошибка при получении корзины из localStorage');
      }
    }
    this.updateTotalPrice();
  }

  updateTotalPrice() {
    const basketArrayString = localStorage.getItem('basketArray');
    if (basketArrayString !== null) {
      let totalPrice = 0;
      const basket = JSON.parse(basketArrayString);
      if (Array.isArray(basket)) {
        this.ChangeBasketIcon(basket);
        basket.forEach((element) => {
          if (element.discountPrice != null && element.discountPrice != 0) {
            totalPrice += element.discountPrice * element.amount;
          } else {
            totalPrice += element.price * element.amount;
          }
        });
        $('.basket-section__footer-button').html(totalPrice.toFixed(2));
      } else {
        console.error('Ошибка при получении корзины из localStorage');
      }
    }
  }

  ChangeBasketIcon(basket){
    if (basket.length > 0) {
      this.basketIcon.attr('xlink:href', '/images/Sprite.svg#Cart_alert');
    } else {
      this.basketIcon.attr('xlink:href', '/images/Sprite.svg#Cart');
    }
  }
}

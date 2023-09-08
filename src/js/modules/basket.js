import $ from 'jquery';
import './stepperInput';
import { AddItemToList, DeleteItem, updateTotalPrice } from './BusketListItem';
import { AmountInput } from './stepperInput';
class BasketController {
  constructor() {
    this.basketContainer = $('#basketContainer');
    this.basketSection = $('.basket-section');
    this.basketList = $('.basket-section__product-list');
    this.htmlElement = $('html');
    this.basketTotalPrice = $('.basket-section__footer-button');

    this.bindEvents();
    this.loadBasketItems();
  }

  bindEvents() {
    $('.header__basket-button').click(() => this.showBasket());
    $('#hideBasketButton').click(() => this.hideBasket());
    this.basketContainer.click(() => this.hideBasket());
    this.basketSection.click((event) => this.stopPropagation(event));
    this.basketList.click((event) => this.elementFunc(event));
  }

  showBasket() {
    this.basketContainer.fadeIn();
    this.basketSection.css('right', '0');
    this.htmlElement.css('overflow', 'hidden');
  }

  hideBasket() {
    this.htmlElement.css('overflow', 'auto');
    this.basketContainer.fadeOut(() =>
      this.basketSection.css('right', '-100%')
    );
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
      updateTotalPrice();
    } else if (targetClasses.contains('basket-list-item__delete')) {
      const productId = event.target.getAttribute('id');
      DeleteItem(productId);
      updateTotalPrice();
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
            $(`#item-${id}`)
              .find('.basket-list-item__price')
              .html((amount * element.price).toFixed(2));
            AmountInput($(event.target).parent());
            $(`#item-${id}`)
              .find('.basket-list-item__price')
              .html((amount * element.price).toFixed(2));
            basket[index].amount = amount;
          }
        });
        localStorage.setItem('basketArray', JSON.stringify(basket));
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
          AddItemToList(
            element.id,
            element.name,
            element.price,
            element.amount,
            element.img,
            element.background
          );
        });
      } else {
        console.error('Ошибка при получении корзины из localStorage');
      }
    }
    updateTotalPrice();
  }
}

$(document).ready(function () {
  new BasketController();
});

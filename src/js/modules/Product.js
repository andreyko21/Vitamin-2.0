import $ from 'jquery';
import { getDoc } from 'firebase/firestore';
import { Header } from './Header';
import { GetLocalStorageArray, SetLocalStorageArray } from './Methods';

class Product {
  constructor(docRef) {
    this.docRef = docRef;
    console.log(this.docRef);
    this.buyButton = $('.product-section__button');
    this.avif = $('.product-section__avif');
    this.png = $('.product-section__png');
    this.webp = $('.product-section__webp');
    this.quantity = $('.product-section__quantity-in');
    this.weight = $('.product-section__weight');
    this.background = $('.product-section__img-block');
    this.name = $('.product-section__name');
    this.type = $('.product-section__type');
    this.price = $('.product-section__price');
    this.discount = $('.product-section__discount');
    this.totalPrice = $('.total-price-product');
    this.amount = $('#productAmount');
    this.switchElement = $('.switch');
    this.autoshipElement = $('#selectTime');
    this.autoship = null;
    this.header = new Header();
    this.isSwitchOn = false;
    this.bindEvents();
    this.init();
  }

  async init() {
    const docSnapshot = await this.getDoc();

    if (docSnapshot.exists()) {
      this.productData = await docSnapshot.data();
      this.id = docSnapshot.id;
      this.handleBasket();
      this.updateDOM();
    } else {
      console.log('Документ не знайдено в Firestore.');
    }

    
  }

  bindEvents() {
    this.buyButton.click(() => this.buy());
    this.switchElement.click((event) =>
      this.ChangeSwitch(event.preventDefault())
    );
    this.autoshipElement.click(() => this.ChangeAutoship());
  }

  async getDoc() {
    try {
      return await getDoc(this.docRef);
    } catch (error) {
      console.error('Помилка при отриманні даних: ', error);
    }
  }

  updateDOM() {
    this.name.html(this.productData.name);
    this.type.html(this.productData.type);
    this.avif.attr('src', this.productData.img.avif);
    this.png.attr('srcset', this.productData.img.png);
    this.webp.attr('srcset', this.productData.img.webp);
    this.quantity.html(this.productData.quantity);
    this.weight.html(this.productData.weight);
    this.price.html(this.productData.price * this.productData.amount);
    this.totalPrice.html(this.productData.price * this.amount);
    this.background.css('background-color', this.productData.background);
    this.type.css('color', this.productData.color);
  }

  handleBasket() {
    $('#productAmount').val(1);

    const basketArrayString = localStorage.getItem('basketArray');

    if (basketArrayString) {
      const basket = JSON.parse(basketArrayString);

      if (Array.isArray(basket)) {
        const productInBasket = basket.find((item) => item.id === this.id);

        if (productInBasket) {
          $('#productAmount').val(productInBasket.amount);
          if (productInBasket.autoship != null) {
            
            this.ChangeSwitch();
            $('#selectTime').val(productInBasket.autoship);
            this.autoship = productInBasket.autoship;
            console.log(productInBasket.autoship);
            this.ChangeAutoship();
          }
        }
      } else {
        console.error('Ошибка при получении корзины из localStorage');
      }
    }

    this.updatePrice();
  }

  updatePrice() {
    const price = this.productData.discountPrice || this.productData.price;
    this.totalPrice.html((price * this.amount.val()).toFixed(2));

    this.price.css(
      'display',
      this.productData.discountPrice ? 'block' : 'none'
    );
    this.discount.css(
      'display',
      this.productData.discountPrice ? 'block' : 'none'
    );
    this.price.html((this.productData.price * this.amount.val()).toFixed(2));
    this.discount.html(
      (
        100 -
        (this.productData.discountPrice / this.productData.price) * 100
      ).toFixed(0)
    );
  }

  buy() {
    const product = {
      id: this.id,
      amount: this.amount.val(),
      autoship: this.autoship,
    };

    const basketArray = GetLocalStorageArray('basketArray') || [];
    const indexToUpdate = basketArray.findIndex((item) => item.id === this.id);

    if (indexToUpdate !== -1) {
      basketArray[indexToUpdate] = product;
      this.header.basket.UpdateItem(product.id);
    } else {
      this.header.basket.AddItem(product);
      basketArray.push(product);
    }

    SetLocalStorageArray('basketArray', basketArray);
    this.header.basket.UpdateBasket();
    this.header.basket.UpdateBasketItem(product);
  }

  ChangeSwitch() {
    if (this.isSwitchOn == true) {
      this.autoship = null;
      this.isSwitchOn = false;
      console.log(this.isSwitchOn);
      this.switchElement.removeClass('switch--on').addClass('switch--off');
      $('#selectTime').attr('disabled', true);
      $('.product-section__autoship-select').css('opacity', '0.5');
    } else {
      this.isSwitchOn = true;
      this.switchElement.removeClass('switch--off').addClass('switch--on');
      $('#selectTime').attr('disabled', false);
      $('.product-section__autoship-select').css('opacity', '1');

      this.autoship = $('#selectTime').val();
      console.log(this.isSwitchOn);
    }
  }

  ChangeAutoship() {
    if (this.isSwitchOn) {
      this.autoship = $('#selectTime').val();
    } else {
      this.autoship = null;
    }
  }
}

export { Product };

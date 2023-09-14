import $ from 'jquery';
import { getDoc } from 'firebase/firestore';
import { Header } from './Header';

class Product {
  constructor(docRef) {
    this.docRef = docRef;
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
    this.header = new Header();
    this.bindEvents();
    this.init();
  }

  async init() {
    const docSnapshot = await this.getDoc();

    if (docSnapshot.exists()) {
      this.productData = await docSnapshot.data();
      this.id = docSnapshot.id;
      this.updateDOM();
    } else {
      console.log('Документ не знайдено в Firestore.');
    }

    this.handleBasket();
  }

  bindEvents() {
    this.buyButton.click(() => this.buy());
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
    this.price.html(this.productData.price);
    this.totalPrice.html(this.productData.price);
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

  AddItemToBasket(product) {
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
  <p class="basket-list-item__price">${(product.price * product.amount).toFixed(2)}</p>
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

  ChangeItemBusket(product){
    $(`#item-${product.id}`).find(`#amount-${product.id}`).val(product.amount); 
    $(`#item-${product.id}`)
      .find('.basket-list-item__price')
    .html((product.amount * product.price).toFixed(2));
  }

  buy() {
    const product = {
      id: this.id,
      name: this.productData.name,
      amount: this.amount.val(),
      price: this.productData.price,
      discountPrice: this.productData.discountPrice,
      img: {
        avif: this.productData.img.avif,
        png: this.productData.img.png,
        webp: this.productData.img.webp,
      },
      background: this.productData.background,
    };

    const basketArray = JSON.parse(localStorage.getItem('basketArray')) || [];

    const indexToUpdate = basketArray.findIndex((item) => item.id === this.id);

    if (indexToUpdate !== -1) {
      basketArray[indexToUpdate] = product;
      this.ChangeItemBusket(product);
    } else {
      basketArray.push(product);
      this.header.basket.AddItem(product);
    }
    localStorage.setItem('basketArray', JSON.stringify(basketArray));
    this.header.basket.updateTotalPrice();
  }
}

export { Product };

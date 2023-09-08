import $ from 'jquery';
import { getDoc } from 'firebase/firestore';
import { ChangeItem, AddItemToList, updateTotalPrice } from './BusketListItem';

export class Product {
  constructor(docRef) {
    this.docRef = docRef;
    this.GetDoc();
  }

  GetDoc() {
    getDoc(this.docRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          this.name = docSnapshot.data().name;
          this.type = docSnapshot.data().type;
          this.img = docSnapshot.data().img;
          this.price = docSnapshot.data().price;
          this.quantity = docSnapshot.data().quantity;
          this.weight = docSnapshot.data().weight;
          this.icon = docSnapshot.data().icon;
          this.background = docSnapshot.data().background;
          this.color = docSnapshot.data().color;
          this.discountPrice = docSnapshot.data().discountPrice;
          this.discount = 100 - (this.discountPrice / this.price) * 100;
          this.id = docSnapshot.id;
          this.init();
        } else {
          console.log('Документ не знайдено в Firestore.');
        }
      })
      .catch((error) => {
        console.error('Помилка при отриманні даних: ', error);
      });
  }

  init() {
    $('.product-section__name').html(this.name);
    $('.product-section__type').html(this.type);
    $('.product-section__quantity-in').html(this.quantity);
    $('.product-section__weight').html(this.weight);
    $('.product-section__icon-product-use').attr(
      'xlink:href',
      `/images/Sprite.svg#icon_${this.icon}`
    );
    $('.product-section__avif').attr('srcset', this.img.avif);
    $('.product-section__webp').attr('srcset', this.img.webp);
    $('.product-section__png').attr('src', this.img.png);
    $('.product-section__img-block').css('background-color', this.background);
    $('.product-section__type').css('color', this.color);
    $('#productAmount').val(1);
    const basketArrayString = localStorage.getItem('basketArray');
    if (basketArrayString !== null) {
      const basket = JSON.parse(basketArrayString);

      if (Array.isArray(basket)) {
        basket.forEach((element) => {
          if (element.id === this.id) {
            $('#productAmount').val(element.amount);
          }
        });
      } else {
        console.error('Ошибка при получении корзины из localStorage');
      }
    }

    this.Price();
  }

  Price() {
    if (this.discountPrice !== null) {
      const price = this.price * $('#productAmount').val();
      const totalPrice = this.discountPrice * $('#productAmount').val();
      $('.total-price-product').html(totalPrice.toFixed(2));
      $('.product-section__price').html(price.toFixed(2));
      $('.product-section__discount').html(this.discount.toFixed(0));
    } else {
      $('.total-price-product').html(
        (this.price * $('#productAmount').val()).toFixed(2)
      );
      $('.product-section__price').css('display', 'none');
      $('.product-section__discount').css('display', 'none');
    }
  }
  Buy() {
    const product = {
      id: this.id,
      name: this.name,
      amount: $('#productAmount').val(),
      price: this.price,
      discountPrice: this.discountPrice,
      img: {
        avif: this.img['avif'],
        png: this.img['png'],
        webp: this.img['webp'],
      },
      background: this.background,
    };
    const basketArray = localStorage.getItem('basketArray');

    if (basketArray === null) {
      localStorage.setItem('basketArray', JSON.stringify([product]));
    } else {
      const productsList = JSON.parse(basketArray);

      if (Array.isArray(productsList)) {
        const indexToUpdate = productsList.findIndex(
          (item) => item.id === this.id
        );

        if (indexToUpdate !== -1) {
          productsList[indexToUpdate] = product;
          ChangeItem(product.id, product);
        } else {
          productsList.push(product);
          AddItemToList(
            product.id,
            product.name,
            product.price,
            product.amount,
            product.img,
            product.background
          );
          updateTotalPrice();
        }
        localStorage.setItem('basketArray', JSON.stringify(productsList));
      } else {
        console.log('productsList не є масивом.');
      }
    }
  }
}

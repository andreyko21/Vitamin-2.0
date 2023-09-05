import { setupStepperInput } from './modules/stepperInput.js';
import { app, auth } from './modules/Auth.js';
import { getFirestore, collection, getDoc, doc } from 'firebase/firestore';
import $ from 'jquery';

$(document).ready(function () {
  setupStepperInput();
  console.log('1');
});

class Product {
  constructor(
    name,
    type,
    img,
    price,
    quantity,
    weight,
    icon,
    background,
    color
  ) {
    this.name = name;
    this.type = type;
    this.img = img;
    this.price = price;
    this.quantity = quantity;
    this.weight = weight;
    this.icon = icon;
    this.background = background;
    this.color = color;
  }
  init() {
    $('.product-section__name').html(this.name);
    $('.product-section__type').html(this.type);
    $('.product-section__price').html(this.price);
    $('.product-section__quantity-in').html(this.quantity);
    $('.product-section__weight').html(this.weight);
    $('.product-section__icon-product-use').attr(
      'xlink:href',
      `/images/Sprite.svg#icon_${this.icon}`
    );
    $('.product-section__avif').attr('srcset', `/images/${this.img}.avif`);
    $('.product-section__webp').attr('srcset', `/images/${this.img}.webp`);
    $('.product-section__avif').attr('srcset', `/images/${this.img}.png`);
    $('.product-section__img-block').css('background-color', this.background);
    $('.product-section__type').css('color', this.background);
  }
}

 const db = getFirestore(app);
 const productsRef = collection(db, 'products');
 let firestoreFilename;
 const currentURL = window.location.href;
 const currentFilename = currentURL.substring(currentURL.lastIndexOf('/') + 1);
 if (currentURL.endsWith('.html')) {
   firestoreFilename = currentFilename.replace('.html', '');
 } else {
   firestoreFilename = currentFilename;
 }
 const matchingDocRef = doc(productsRef, firestoreFilename);
 getDoc(matchingDocRef)
   .then((docSnapshot) => {
     if (docSnapshot.exists()) {
       const product1 = new Product(
         docSnapshot.data().name,
         docSnapshot.data().type,
         docSnapshot.data().img,
         docSnapshot.data().price,
         docSnapshot.data().quantity,
         docSnapshot.data().weight,
         docSnapshot.data().icon,
         docSnapshot.data().background,
         docSnapshot.data().color
       );
       product1.init();
     } else {
       console.log('Документ не знайдено в Firestore.');
     }
   })
   .catch((error) => {
     console.error('Помилка при отриманні даних: ', error);
   });
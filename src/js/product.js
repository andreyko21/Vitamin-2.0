import $ from 'jquery';
import { firebaseConfig } from './modules/Config';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc } from 'firebase/firestore';

import { PersonalPack } from './modules/PersonalPack';
import { Product } from './modules/Product';
import { AmountInput } from './modules/stepperInput';

import './modules/basket';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const currentURL = window.location.href;
const currentFilename = currentURL.substring(currentURL.lastIndexOf('/') + 1);
const firestoreFilename = currentURL.endsWith('.html')
  ? currentFilename.replace('.html', '')
  : currentURL.endsWith('#')
  ? currentFilename.replace('#', '')
  : currentFilename;

const productsRef = collection(db, 'products');

const packBox1DocRef = doc(productsRef, 'product-1');
const packBox2DocRef = doc(productsRef, 'product-2');
const packBox3DocRef = doc(productsRef, 'product-3');
const packBox4DocRef = doc(productsRef, 'product-4');

const productDocRef = doc(productsRef, firestoreFilename.replace('#', '-'));

$(document).ready(function () {
  const product = new Product(productDocRef);

  $('.product-section__information-block').find('.stepper-input__button').click(
    function () {
      AmountInput($(this));
      product.Price();
    }
  );

  $('.product-section__button').click(() => {
    product.Buy();
  });
  new PersonalPack($('#product-box-1'), packBox1DocRef);
  new PersonalPack($('#product-box-2'), packBox2DocRef);
  new PersonalPack($('#product-box-3'), packBox3DocRef);
  new PersonalPack($('#product-box-4'), packBox4DocRef);
});

import $ from 'jquery';
import { Header } from './modules/Header';
import { PersonalPack } from './modules/PersonalPack';
import { GetLocalStorageArray, SetLocalStorageArray } from './modules/Methods';
import { getFirestore, collection, doc } from 'firebase/firestore';
import { app } from './modules/InitFirebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

class PagePersonalPack {
  constructor() {
    this.header = new Header();
    this.buyButton = $('.personal-pack-setion__button');
    this.auth = getAuth(app);
    this.bindEvents();
    this.init();
    this.CheckUserName();
  }

  init() {
    const db = getFirestore(app);
    const productsRef = collection(db, 'products');
    const packBox1DocRef = doc(productsRef, 'product-1');
    const packBox2DocRef = doc(productsRef, 'product-2');
    const packBox3DocRef = doc(productsRef, 'product-3');
    const packBox4DocRef = doc(productsRef, 'product-4');
    new PersonalPack($('.product-pack-block'), packBox1DocRef);
    new PersonalPack($('.product-pack-block'), packBox2DocRef);
    new PersonalPack($('.product-pack-block'), packBox3DocRef);
    new PersonalPack($('.product-pack-block'), packBox4DocRef);
  }

  CheckUserName() {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        
        const maxCharacters = 15;
        if (user.displayName.length > maxCharacters) {
          const truncatedText = user.displayName.slice(0, maxCharacters) + '...';
          $('#user-name').html(truncatedText);
        } else{
          $('#user-name').html(user.displayName);
        }
      } else {
        $('#user-name').html('Visitor');
      }
    });
  }

  bindEvents() {
    this.buyButton.click(() => this.BuyAll());
  }

  BuyAll() {
    this.Buy('product-1');
    this.Buy('product-2');
    this.Buy('product-3');
    this.Buy('product-4');
  }

  Buy(id) {
    const product = {
      id: id,
      amount: 1,
      autoship: null,
    };

    const basketArray = GetLocalStorageArray('basketArray') || [];
    const indexToUpdate = basketArray.findIndex((item) => item.id === id);

    if (indexToUpdate == -1) {
      this.header.basket.AddItem(product);
      basketArray.push(product);
    }

    SetLocalStorageArray('basketArray', basketArray);
    this.header.basket.updateTotalPrice();
  }
}

new PagePersonalPack();

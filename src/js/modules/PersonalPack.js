import { getDoc } from 'firebase/firestore';
import $ from 'jquery';

export class PersonalPack {
  constructor(container, docRef) {
    this.docRef = docRef;
    this.container = container;
    this.GetDoc();
  }

  GetDoc() {
    getDoc(this.docRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          this.product = docSnapshot.data();
          this.product.id = docSnapshot.id.replace('-', '.html#');
          this.Render();
        } else {
          console.log('Документ не знайдено в Firestore.');
        }
      })
      .catch((error) => {
        console.error('Помилка при отриманні даних: ', error);
      });
  }

  Render() {
    let priceBlock, discountBlock;
    if (this.product.discountPrice != null) {
      priceBlock = `<span class="sub-price">${this.product.price.toFixed(
        2
      )}</span><span class="discount-price">${this.product.discountPrice.toFixed(
        2
      )}</span>`;
      discountBlock = `<div class="discount-block">${(
        100 -
        (this.product.discountPrice / this.product.price) * 100
      ).toFixed(0)}</div>`;
    } else {
      priceBlock = `<span class="price">${this.product.price.toFixed(2)}</span>`;
    }
    let productElement = $(`<a class="product-box" href="/${this.product.id.replace(
      '-',
      '#'
    )}" id="${this.product.id}">
          ${discountBlock ? discountBlock : ''}
        <picture class="product-box__img">
            <source srcset="${
              this.product.img.avif
            }" type="image/avif" class="product-box__avif" />
            <source srcset="${
              this.product.img.webp
            }" type="image/webp" class="product-box__webp" />
            <img src="${this.product.img.png}" alt="" class="product-box__png" />
          </picture>
        <p class="product-box__type" style="color:${this.product.color}">${
          this.product.type
    }</p>
        <p class="product-box__name">${this.product.name}</p>
        <p class="product-box__price-block">${priceBlock}</p>
    </a>
    `);
    this.container.append(productElement);
  }
}

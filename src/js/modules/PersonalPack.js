import { getDoc } from 'firebase/firestore';

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
          this.name = docSnapshot.data().name;
          this.price = docSnapshot.data().price;
          this.type = docSnapshot.data().type;
          this.img = docSnapshot.data().img;
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
    this.container.find('.product-box__name').html(this.name);
    this.container.find('.product-box__type').html(this.type);
    this.container.find('.product-box__price').html(this.price);
    this.container.find('.product-box__avif').attr('src', this.img.avif);
    this.container.find('.product-box__webp').attr('srcset', this.img.webp);
    this.container.find('.product-box__png').attr('srcset', this.img.png);
  }
}

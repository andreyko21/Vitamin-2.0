import $ from 'jquery';
import { app } from './InitFirebase';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import { CustomSwiper } from './Swiper';


export class ChooseProducts {
    constructor() {
        const db = getFirestore(app);
        const productsRef = collection(db, 'products');
        this.massRef = doc(productsRef, 'chooseProducts');
        this.fetchDataAndRender(this.massRef);
        this.SwiperInit();
    }

    async fetchDataAndRender(reference) {
        try {
            const docSnapshot = await getDoc(reference);
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                for (const element of data.List) {
                    let item = await getDoc(element);
                    let data = item.data();
                    data.id = item.id.replace('-','.html#');
                    await this.AddItem(data);
                }
            } else {
                console.log('Документ не знайдено в Firestore.');
            }
        } catch (error) {
            console.error('Помилка при отриманні даних:', error);
        }
        finally {
            this.swiper.update();
        }
    }

    SwiperInit(){
        const swiperSelector = '.products-swiper-container';
        const swiperOptions = {
            slidesPerView: 1,
            spaceBetween: 10,
            breakpoints: {
                401: {
                    slidesPerView: 1.5,
                    spaceBetween: 10,
                },
                601: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                961: {
                    slidesPerView: 1,
                    spaceBetween: 40,
                },
                1351: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                },
            },
        };
        this.swiper = new CustomSwiper(swiperSelector, swiperOptions);
    }


    AddItem(product) {
        let newItem = $(`<a class="choose-products-section__product-card swiper-slide" href="./${product.id}" style="background-color: ${product.background}">
            <picture class="choose-products-section__product-card-img">
              <source srcset="${product.img.avif}" type="image/avif"/>
              <source srcset="${product.img.webp}" type="image/webp"/>
              <img src="${product.img.png}" alt="Reacted Zinc"/>
            </picture>
            <p class="choose-products-section__product-card-type">${product.type}</p>
            <p class="choose-products-section__product-card-name">${product.name}</p>
            <p class="choose-products-section__product-card-description">${product.description}</p>
          </a>`)
        $('.choose-products-section__wrapper').append(newItem);
    }

}
import $ from 'jquery';
import { app } from './InitFirebase';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import { CustomSwiper } from './Swiper';


export class Reviews {
    constructor() {
        const db = getFirestore(app);
        const productsRef = collection(db, 'reviews');
        this.massRef = doc(productsRef, 'SelectReviews');
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
                    await this.AddItem(item.data());
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

    SwiperInit() {
        const swiperSelector = '.what-users-say__swiper-container';
        const swiperOptions = {
            slidesPerView: 1,
            spaceBetween: 32,
            breakpoints: {
                600: {
                    slidesPerView: 2,
                },
                960: {
                    slidesPerView: 3,
                },
            }
        };
        this.swiper = new CustomSwiper(swiperSelector, swiperOptions);
    }

    AddItem(review) {
        let newItem = $(` <div class="what-users-say__swiper-slide swiper-slide customer-say-block">
        <div class="customer-say-block__review">
          <div class="customer-say-block__rate">
            <svg class="customer-say-block__rate-img">
              <use xlink:href="images/Sprite.svg#rate"></use>
            </svg>
          </div>
          <div class="customer-say-block__title">
            ${review.title}
          </div>
          <p class="customer-say-block__description">
            ${review.description}
          </p>
        </div>
        <div class="customer-say-block__user-block">
          <picture class="customer-say-block__user-block-img">
            <source srcset="${review.img.avif}" type="image/avif" />
            <source srcset="${review.img.webp}" type="image/webp" />
            <img src="${review.img.png}"  type="image/png" alt="David S." />
          </picture>
          <p class="customer-say-block__user-block-name">${review.firstName} ${review.lastName[0]}.</p>
        </div>
      </div>`)
        $('.what-users-say__swiper-wrapper').append(newItem);
    }
}
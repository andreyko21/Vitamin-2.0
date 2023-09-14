import $ from 'jquery';
import { app } from './modules/InitFirebase';
import { getFirestore, collection, getDocs, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

let animating = false;

$(document).ready(function () {
  new ProfileOrders().init();
  $('.order-item__accordeon').click(function () {
    if ($(window).width() < 961) {
      const accordionContent = $(this).next('.order-item__content');
      if (accordionContent.is(':hidden')) {
        $(this).find('.order-item__arrow').addClass('open');
      } else {
        $(this).find('.order-item__arrow').removeClass('open');
      }
      accordionContent.slideToggle(function () {
        animating = false;
      });
    }
  });
});

class ProfileOrders {
  constructor() {
    this.ordersList = $('.profile-orders-section__list-orders');
    this.ordersListVal = [];
  }

  init() {
    this.GetDocs();
  }

  async GetDocs() {
    try {
      const auth = await getAuth(app);
      const db = await getFirestore(app);

      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userDocRef = doc(db, 'users', user.uid);
          const ordersCollectionRef = collection(userDocRef, 'orders');
          const querySnapshot = await getDocs(ordersCollectionRef);
          querySnapshot.forEach((doc) => {
            this.ordersListVal.push(doc.data());
            console.log(this.ordersListVal);
          });
          this.AddItems(this.ordersListVal);
        } else {
          console.log('Пользователь не авторизован');
        }
      });
    } catch (error) {
      console.error('Error fetching user orders: ', error);
    }
  }

  AddItems(ordersList) {
    for (const order of ordersList) {
      let orderItem = $(`<div class="profile-orders-section__order order-item">
        <div class="order-item__accordeon">
          <div class="order-item__time">${order.date}</div>
          <div class="order-item__delivery-status">${order.status}</div>
          <div class="order-item__order-number">No ${order.number}</div>
          <svg class="order-item__arrow">
            <use xlink:href="images/Sprite.svg#down_arrow"></use>
          </svg>
        </div>
        <div class="order-item__content" style="display: none;">
          <div class="order-item__list-products"></div>
          <hr class="order-item__line" />
          <p class="order-item__amount">${order.amount}</p>
          <p class="order-item__price">$${order.price}</p>
          <button class="order-item__button">Add to cart</button>
        </div>
      </div>`);

      // Создаем контейнер для списка продуктов и добавляем его к заказу
      let productList = orderItem.find('.order-item__list-products');

      // Итерируемся по массиву продуктов заказа и создаем элементы для каждого продукта
      for (let i = 0; i < order.products.length; i++) {
        let price = 0;
        let product = order.products[i];
        if (product.discountPrice != null && product.discountPrice != 0) {
          price = product.discountPrice * product.amount;
        } else {
          price = product.price * product.amount;
        }
        let productOrder =
          $(`<div class="order-item__product-order product-order">
          <picture class="product-order__img">
            <source srcset="${product.img.avif}" type="image/avif" />
            <source srcset="${product.img.webp}" type="image/webp" />
            <img src="${product.img.png}" alt="${product.name}" />
          </picture>
          <div class="product-order__type">${product.type}</div>
          <div class="product-order__product">
            <span class="product-order__product-amount">${
              product.amount
            }</span>х
            <span class="product-order__product-name">${product.name}</span>
          </div>
          <div class="product-order__price">${(
            price
          ).toFixed(2)}</div>
        </div>`);

        productList.append(productOrder);
      }

      this.ordersList.append(orderItem);
    }
  }
}

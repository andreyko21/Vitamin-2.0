import $ from 'jquery';

export function AddItemToList(id, name, price, amount, img, background) {
  let newItem = $(`<div class="basket-list-item" id="item-${id}">
  <picture class="basket-list-item__img" style="background-color: ${background}">
    <source
      srcset="${img.avif}"
      type="image/avif"
    />
    <source
      srcset="${img.webp}"
      type="image/webp"
    />
    <img
      src="${img.png}"
      alt="Ortho Complex"
    />
  </picture>
  <p class="basket-list-item__name">
    ${name}
  </p>
  <svg class="basket-list-item__delete" id="${id}">
    <use xlink:href="/images/Sprite.svg#close"></use>
  </svg>
  <div class="basket-list-item__amount">
   <div class="stepper-input" id="stepper-${id}">
    <button class="stepper-input__button decrement">-</button>
    <div class="stepper-input__content">
        <input type="text" id="amount-${id}" class="stepper-input__input" value="${amount}" readonly aria-label="Amount"/>
    </div>
    <button class="stepper-input__button increment">+</button>
</div>
  </div>
  <p class="basket-list-item__price">${(price * amount).toFixed(2)}</p>
  <hr class="basket-list-item__line" />
  <div class="basket-list-item__time-delivery"> 
    <div class="checkbox">
    <input class="custom-checkbox" type="checkbox" id="autoship-${id}" name="Autoship" value="true">
    <label for="autoship-${id}">Autoship every <div class="input-block">
  <label class="input-block__label" for="time-${id}">
    <select id="time-${id}" class="input-block__select">
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

export function ChangeItem(id, product) {
    $(`#item-${id}`).find(`#amount-${id}`).val(product.amount); 
    $(`#item-${id}`)
      .find('.basket-list-item__price')
    .html((product.amount * product.price).toFixed(2));
  
}

export function updateTotalPrice() {
  
  const basketArrayString = localStorage.getItem('basketArray');
  if (basketArrayString !== null) {
    let totalPrice = 0;
    const basket = JSON.parse(basketArrayString);
    if (Array.isArray(basket)) {
      basket.forEach((element) => {
        totalPrice += element.price * element.amount;
      });
      $('.basket-section__footer-button').html(totalPrice.toFixed(2));
    } else {
      console.error('Ошибка при получении корзины из localStorage');
    }
    
  }
}

export function DeleteItem(id) {
    $(`#item-${id}`).remove();
    const basketArrayString = localStorage.getItem('basketArray');
  if (basketArrayString !== null) {
      const basket = JSON.parse(basketArrayString);
      if (Array.isArray(basket)) {
        basket.forEach((element, index) => {
          if (element.id === id) {
            basket.splice(index, 1);
        
            localStorage.setItem('basketArray', JSON.stringify(basket));
          }
        });
      } else {
        console.error('Ошибка при получении корзины из localStorage');
      }
  }
}

2
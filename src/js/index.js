import $ from 'jquery';
import { Header } from './modules/Header';
import { ChooseProducts } from './modules/ChooseProducts';
import { Reviews } from './modules/Reviews';


const header = new Header();
const choose = new ChooseProducts();
const reviews = new Reviews();

$('.take-quiz').click(() => {
  header.OpenQuiz();
})

$(document).ready(function() {
  const header = $('.header');
  const scrollThreshold = 100; // При скролі на 100px змінюємо фон

  $(window).scroll(function() {
      if ($(this).scrollTop() > scrollThreshold) {
          // Додаємо клас для зміни фону
          header.addClass('header-background');
      } else {
          // Видаляємо клас, якщо прокрутка менша, ніж scrollThreshold
          header.removeClass('header-background');
      }
  });
});



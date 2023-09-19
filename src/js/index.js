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



import $ from 'jquery';

class PageQuiz {
  constructor() {
    this.backButton = $('.quiz-footer__button');
    this.init();
  }

  init() {
    console.log(window.location.href);
    if (window.location.href.includes('quiz-1')) {
      this.nextQuizButton = $('.input-block__circle-button');
      this.backButton.css('display', 'none');
      this.bindEvents();
    }
    if (window.location.href.includes('quiz-9')) {
        this.nextQuizButton = $('.input-block__circle-button');
        this.bindEvents();
      }
  }

  bindEvents() {
    this.nextQuizButton.click(() => this.goToNextQuiz());
  }

  goToNextQuiz() {
    if(window.location.href.includes('quiz-1')){
        window.location.href = '/quiz-2.html';
    } else if(window.location.href.includes('quiz-9')){
        window.location.href = '/personal-pack.html';
    }
  }
}

new PageQuiz();

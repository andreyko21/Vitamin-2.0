<!doctype html>
<html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="description" content="Your concise and informative description here">
  <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
  <link rel="stylesheet" href="css/home.min.css?_v=20230902110154">
  <title>Home</title>
</head>

  <body>
    <div class="wrapper">
      <header class="header">
  <div class="header__container">
    <div class="burger-menu">
  <div class="burger-menu__header">
    <div class="burger-menu__container">
      <div class="burger-menu__header-inner">
        <button class="burger-menu-button" aria-label="Close Menu">
          <svg class="burger-menu-button__icon">
            <use xlink:href="images/Sprite.svg#close"></use>
          </svg>
        </button>
        <button class="profile user-button burger-profile-open-button" aria-label="Profile">
          <svg class="user-button__icon">
            <use xlink:href="images/Sprite.svg#user"></use>
          </svg>
        </button>
      </div>
    </div>
  </div>
  <div class="burger-menu__container">
    <nav class="burger-menu__nav">
      <button class="burger-menu__nav-text-button burger-shop-open-button">
        Shop
        <svg class="right-arrow">
          <use xlink:href="images/Sprite.svg#right-arrow"></use>
        </svg>
      </button>
      <button class="burger-menu__nav-text-button burger-information-open-button">
        Information
        <svg class="right-arrow">
          <use xlink:href="images/Sprite.svg#right-arrow"></use>
        </svg>
      </button>
      <button class="burger-menu__nav-text-button take-quiz-button">
        Take the quiz
      </button>
    </nav>
    <div class="burger-menu__footer">
      <a class="burger-menu__mailto-link" href="mailto:support@medstogo.com">support@medstogo.com</a>
      <p class="burger-menu__all-rights">
        © 2020 Vitamins.com / All rights reserved
      </p>
    </div>
  </div>
</div>
 <div class="sub-menu sub-menu_shop">
  <div class="sub-menu__header">
    <div class="sub-menu__container">
      <div class="sub-menu__header-inner">
        <button class="sub-menu__back-button burger-shop-close-button" aria-label="Close Sub-Menu">
          <svg class="back-arrow">
            <use class="back-arrow-use" xlink:href="images/Sprite.svg#back-arrow"></use>
          </svg>
        </button>
        <h2 class="sub-menu__header-title">Shop</h2>
      </div>
    </div>
  </div>
  <div class="sub-menu__container">
    <div class="sub-menu__nav">
      <a class="sub-menu__nav-button" href="#">All categories</a>
      <a class="sub-menu__nav-button" href="#">Vitamins & Dietary Supplements</a>
      <a class="sub-menu__nav-button" href="#">Weight Loss</a>
      <a class="sub-menu__nav-button" href="#">Minerals</a>
      <a class="sub-menu__nav-button" href="#">Antioxidants</a>
      <a class="sub-menu__nav-button" href="#">Probiotics</a>
      <a class="sub-menu__nav-button" href="#">Pain Relief</a>
      <a class="sub-menu__nav-button" href="#">Prenatal Vitamins</a>
      <a class="sub-menu__nav-button sub-menu__nav-button_focus" href="#">Sale%</a>
    </div>
    <div class="sub-menu__footer">
      <h3 class="sub-menu__footer-title">
        Don’t know what vitamins your body needs?
      </h3>
      <p class="sub-menu__footer-description">
        Answer a few simple questions and automaticallyget a personalazed list
        of vitamins in minutes
      </p>
      <a class="default-button sub-menu__footer-button" href="#">
        Take the quiz
      </a>
    </div>
  </div>
</div>

    <div class="sub-menu sub-menu_information">
  <div class="sub-menu__header">
    <div class="sub-menu__container">
      <div class="sub-menu__header-inner">
        <button class="sub-menu__back-button burger-information-close-button" aria-label="Close Sub-Menu">
          <svg class="back-arrow">
            <use class="back-arrow-use" xlink:href="images/Sprite.svg#back-arrow"></use>
          </svg>
        </button>
        <h2 class="sub-menu__header-title">Information</h2>
      </div>
    </div>
  </div>
  <div class="sub-menu__container">
    <div class="sub-menu__nav">
      <a class="sub-menu__nav-button" href="#">Subscription Cycle & Billing</a>
      <a class="sub-menu__nav-button" href="#">Terms & Conditions</a>
      <a class="sub-menu__nav-button" href="#">Privacy Policy</a>
      <a class="sub-menu__nav-button" href="#">Shipping & Delivery</a>
      <a class="sub-menu__nav-button" href="#">Return Policy</a>
    </div>
  </div>
</div>
 <div class="sub-menu sub-menu_profile">
  <div class="sub-menu__header">
    <div class="sub-menu__container">
      <div class="sub-menu__header-inner">
        <button class="sub-menu__back-button burger-profile-close-button" aria-label="Close Sub-Menu">
          <svg class="back-arrow">
            <use class="back-arrow-use" xlink:href="images/Sprite.svg#back-arrow"></use>
          </svg>
        </button>
        <h2 class="sub-menu__header-title">Profile</h2>
      </div>
    </div>
  </div>
  <div class="sub-menu__container">
    <div class="sub-menu__nav">
      <a class="sub-menu__nav-button" href="#">Subscriptions</a>
      <a class="sub-menu__nav-button" href="#">Orders</a>
      <a class="sub-menu__nav-button" href="#">Account Overview</a>
      <a class="sub-menu__nav-button" href="#">Payment methods</a>
      <a class="sub-menu__nav-button" href="#">Change Password</a>
      <a class="sub-menu__nav-button sub-menu__nav-button_focus" href="#">Sign Out</a>
    </div>
  </div>
</div>

    <div class="basket" id="basketContainer" style="display: none">
  <div class="basket-section">
    <div class="basket-section__header">
      <h2 class="basket-section__header-title">Cart</h2>
      <svg class="basket-section__header-button" id="hideBasketButton">
        <use xlink:href="images/Sprite.svg#close"></use>
      </svg>
    </div>
    <div class="basket-section__product-list">
      <div class="basket-list-item">
  <picture class="basket-list-item__img">
    <source srcset="images/Ortho-Molecular-Prenatal-Complete-with-DHA.avif" type="image/avif">
    <source srcset="images/Ortho-Molecular-Prenatal-Complete-with-DHA.webp" type="image/webp">
    <img src="images/Ortho-Molecular-Prenatal-Complete-with-DHA.png" alt="Ortho Complex">
  </picture>
  <p class="basket-list-item__name">
    Ortho Molecular Products CereVive Capsules
  </p>
  <svg class="basket-list-item__delete">
    <use xlink:href="images/Sprite.svg#close"></use>
  </svg>
  <div class="basket-list-item__amount">
    <div class="stepper-input">
    <button class="stepper-input__button decrement">-</button>
    <div class="stepper-input__content">
        <input type="text" class="stepper-input__input" value="1" readonly="readonly">
    </div>
    <button class="stepper-input__button increment">+</button>
</div>
  </div>
  <p class="basket-list-item__price">35.00</p>
  <hr class="basket-list-item__line">
  <div class="basket-list-item__time-delivery"> 
    <div class="checkbox">
    <input class="custom-checkbox" type="checkbox" id="1-checkbox" name="Autoship" value="true">
    <label for="1-checkbox">Autoship every <div class="input-block">
  <label class="input-block__label" for="@@id">
    <select id="@@id" class="input-block__select">
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
</div>

      <div class="basket-list-item">
  <picture class="basket-list-item__img">
    <source srcset="images/Ortho-Molecular-Prenatal-Complete-with-DHA.avif" type="image/avif">
    <source srcset="images/Ortho-Molecular-Prenatal-Complete-with-DHA.webp" type="image/webp">
    <img src="images/Ortho-Molecular-Prenatal-Complete-with-DHA.png" alt="Ortho Complex">
  </picture>
  <p class="basket-list-item__name">
    Ortho Molecular Products CereVive Capsules
  </p>
  <svg class="basket-list-item__delete">
    <use xlink:href="images/Sprite.svg#close"></use>
  </svg>
  <div class="basket-list-item__amount">
    <div class="stepper-input">
    <button class="stepper-input__button decrement">-</button>
    <div class="stepper-input__content">
        <input type="text" class="stepper-input__input" value="20" readonly="readonly">
    </div>
    <button class="stepper-input__button increment">+</button>
</div>
  </div>
  <p class="basket-list-item__price">56.00</p>
  <hr class="basket-list-item__line">
  <div class="basket-list-item__time-delivery"> 
    <div class="checkbox">
    <input class="custom-checkbox" type="checkbox" id="2-checkbox" name="Autoship" value="true">
    <label for="2-checkbox">Autoship every <div class="input-block">
  <label class="input-block__label" for="@@id">
    <select id="@@id" class="input-block__select">
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
</div>

      <div class="basket-list-item">
  <picture class="basket-list-item__img">
    <source srcset="images/Ortho-Molecular-Prenatal-Complete-with-DHA.avif" type="image/avif">
    <source srcset="images/Ortho-Molecular-Prenatal-Complete-with-DHA.webp" type="image/webp">
    <img src="images/Ortho-Molecular-Prenatal-Complete-with-DHA.png" alt="Ortho Complex">
  </picture>
  <p class="basket-list-item__name">
    Ortho Molecular Products CereVive Capsules
  </p>
  <svg class="basket-list-item__delete">
    <use xlink:href="images/Sprite.svg#close"></use>
  </svg>
  <div class="basket-list-item__amount">
    <div class="stepper-input">
    <button class="stepper-input__button decrement">-</button>
    <div class="stepper-input__content">
        <input type="text" class="stepper-input__input" value="5" readonly="readonly">
    </div>
    <button class="stepper-input__button increment">+</button>
</div>
  </div>
  <p class="basket-list-item__price">12.00</p>
  <hr class="basket-list-item__line">
  <div class="basket-list-item__time-delivery"> 
    <div class="checkbox">
    <input class="custom-checkbox" type="checkbox" id="3-checkbox" name="Autoship" value="true">
    <label for="3-checkbox">Autoship every <div class="input-block">
  <label class="input-block__label" for="@@id">
    <select id="@@id" class="input-block__select">
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
</div>

      <div class="basket-list-item">
  <picture class="basket-list-item__img">
    <source srcset="images/Ortho-Molecular-Prenatal-Complete-with-DHA.avif" type="image/avif">
    <source srcset="images/Ortho-Molecular-Prenatal-Complete-with-DHA.webp" type="image/webp">
    <img src="images/Ortho-Molecular-Prenatal-Complete-with-DHA.png" alt="Ortho Complex">
  </picture>
  <p class="basket-list-item__name">
    Ortho Molecular Products CereVive Capsules
  </p>
  <svg class="basket-list-item__delete">
    <use xlink:href="images/Sprite.svg#close"></use>
  </svg>
  <div class="basket-list-item__amount">
    <div class="stepper-input">
    <button class="stepper-input__button decrement">-</button>
    <div class="stepper-input__content">
        <input type="text" class="stepper-input__input" value="10" readonly="readonly">
    </div>
    <button class="stepper-input__button increment">+</button>
</div>
  </div>
  <p class="basket-list-item__price">63.00</p>
  <hr class="basket-list-item__line">
  <div class="basket-list-item__time-delivery"> 
    <div class="checkbox">
    <input class="custom-checkbox" type="checkbox" id="4-checkbox" name="Autoship" value="true">
    <label for="4-checkbox">Autoship every <div class="input-block">
  <label class="input-block__label" for="@@id">
    <select id="@@id" class="input-block__select">
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
</div>

      <div class="basket-list-item">
  <picture class="basket-list-item__img">
    <source srcset="images/Ortho-Molecular-Prenatal-Complete-with-DHA.avif" type="image/avif">
    <source srcset="images/Ortho-Molecular-Prenatal-Complete-with-DHA.webp" type="image/webp">
    <img src="images/Ortho-Molecular-Prenatal-Complete-with-DHA.png" alt="Ortho Complex">
  </picture>
  <p class="basket-list-item__name">
    Ortho Molecular Products CereVive Capsules
  </p>
  <svg class="basket-list-item__delete">
    <use xlink:href="images/Sprite.svg#close"></use>
  </svg>
  <div class="basket-list-item__amount">
    <div class="stepper-input">
    <button class="stepper-input__button decrement">-</button>
    <div class="stepper-input__content">
        <input type="text" class="stepper-input__input" value="3" readonly="readonly">
    </div>
    <button class="stepper-input__button increment">+</button>
</div>
  </div>
  <p class="basket-list-item__price">84.00</p>
  <hr class="basket-list-item__line">
  <div class="basket-list-item__time-delivery"> 
    <div class="checkbox">
    <input class="custom-checkbox" type="checkbox" id="5-checkbox" name="Autoship" value="true">
    <label for="5-checkbox">Autoship every <div class="input-block">
  <label class="input-block__label" for="@@id">
    <select id="@@id" class="input-block__select">
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
</div>

    </div>
    <div class="basket-section__footer">
      <button class="basket-section__footer-button">156.58</button>
    </div>
  </div>
</div>

    <button class="burger-menu-button" aria-label="Open Menu">
      <svg class="burger-menu-button__icon">
        <use xlink:href="images/Sprite.svg#burger-menu"></use>
      </svg>
    </button>
    <a class="logo" href="./index.html" aria-label="Home">
  <svg class="logo-img">
    <use xlink:href="images/Sprite.svg#logo"></use>
  </svg>
</a>

    <div class="header__buttons">
      <button class="profile user-button" aria-label="Profile">
  <svg class="user-button__icon">
    <use xlink:href="images/Sprite.svg#user"></use>
  </svg>
</button>

      <button class="header__basket-button" aria-label="Basket">
        <svg class="header__basket-button-img">
          <use xlink:href="images/Sprite.svg#basket"></use>
        </svg>
      </button>
      <a class="default-button header__quiz-button" href="#">Take the quiz</a>
    </div>
  </div>
</header>

      <main class="page">
        <section class="find-vitamins-section">
  <div class="find-vitamins-section__page-container">
    <div class="find-vitamins-section__text-block">
      <svg class="background-img__one-fourth-circle">
        <use xlink:href="images/Sprite.svg#one-fourth-circle"></use>
      </svg>
      <h1 class="find-vitamins-section__title">
        Find out what <span class="focus-color">vitamins</span> your body needs
        right now.
      </h1>
      <p class="find-vitamins-section__description">
        Answer a few simple questions and automatically get a personalazed list
        of vitamins in minutes
      </p>
      <div class="find-vitamins-section__buttons-block">
        <a class="default-button find-vitamins-section__button" href="#">Take the quiz</a>
        <a href="#" class="link-arrow">Go to the shop<svg class="link-arrow__arrow">
    <use xlink:href="images/Sprite.svg#right-arrow"></use>
  </svg>
</a>

      </div>
    </div>
    <div class="find-vitamins-section__img-block">
      <svg class="background-img__one-two-circle">
        <use xlink:href="images/Sprite.svg#one-two-circle"></use>
      </svg>
      <svg class="background-img__circle">
        <use xlink:href="images/Sprite.svg#circle"></use>
      </svg>
      <svg class="circle">
        <use xlink:href="images/Sprite.svg#Ellipse 10"></use>
      </svg>
      <picture class="pills">
        <source srcset="images/find-vitamins.avif" type="image/avif">
        <source srcset="images/find-vitamins.webp" type="image/webp">
        <img src="images/find-vitamins.png" alt="Ortho Complex">
      </picture>
    </div>
  </div>
</section>

        <section class="easy-healthy-section">
  <div class="easy-healthy-section__container">
    <div class="easy-healthy-section__title-block">
      <div class="easy-healthy-section__title-background-block">
        <svg class="background-image__logo-background">
          <use xlink:href="images/Sprite.svg#logo-background"></use>
        </svg>
      </div>
      <svg class="background-image__circle">
          <use xlink:href="images/Sprite.svg#circle"></use>
        </svg>
      <h2 class="easy-healthy-section__title">
        Healthy doesn’t have to be hard. We make it easy.
      </h2>
    </div>
    <ul class="easy-healthy-section__list-block">
      <li class="easy-healthy-section__list-block-item">
        <svg class="easy-healthy-section__list-block-item-img">
          <use xlink:href="images/Sprite.svg#vitamin-apple"></use>
        </svg>
        <p class="easy-healthy-section__list-block-item-text">
          Healthy doesn’t have to be hard. We make it easy.
        </p>
      </li>
      <li class="easy-healthy-section__list-block-item">
        <svg class="easy-healthy-section__list-block-item-img">
          <use xlink:href="images/Sprite.svg#ground-tree"></use>
        </svg>
        <p class="easy-healthy-section__list-block-item-text">
          Healthy doesn’t have to be hard. We make it easy.
        </p>
      </li>
      <li class="easy-healthy-section__list-block-item">
        <svg class="easy-healthy-section__list-block-item-img">
          <use xlink:href="images/Sprite.svg#packet-fruit"></use>
        </svg>
        <p class="easy-healthy-section__list-block-item-text">
          Healthy doesn’t have to be hard. We make it easy.
        </p>
      </li>
    </ul>
    <div class="easy-healthy-section__images-block">
        <picture class="easy-healthy-section__images-block-vitamins-box">
        <source srcset="images/vitamins_boxes.avif" type="image/avif">
        <source srcset="images/vitamins_boxes.webp" type="image/webp">
        <img src="images/vitamins_boxes.jpg" alt="Ortho Complex">
      </picture>
      <picture class="easy-healthy-section__images-block-vitamins">
        <source srcset="images/vitamins_pills.avif" type="image/avif">
        <source srcset="images/vitamins_pills.webp" type="image/webp">
        <img src="images/vitamins_pills.jpg" alt="Ortho Complex">
      </picture>
    </div>
  </div>
</section>

        <section class="tell-us-section">
  <div class="tell-us-section__container">
    <svg class="tell-us-section__img">
      <use xlink:href="images/Sprite.svg#hand-heart"></use>
    </svg>
    <h2 class="tell-us-section__title">
      Tell us a little about yourself. We’re good listeners.
    </h2>
    <p class="tell-us-section__description">
      We'll help you create a health plan with vitamins, supplements, and more
      that help you feel your best today and support you long-term.
    </p>
    <a class="default-button tell-us-section__button" href="">Take the quiz</a>
    <svg class="background-img__one-two-circle">
    <use xlink:href="images/Sprite.svg#one-two-circle"></use>
  </svg>
  <svg class="background-img__circle">
    <use xlink:href="images/Sprite.svg#circle"></use>
  </svg>
  </div>
</section>

        <section class="choose-products-section">
  <div class="choose-products-section__container">
    <div class="choose-products-section__products-block">
      <div class="products-swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide choose-products-section__product-card">
            <picture class="choose-products-section__product-card-img">
              <source srcset="images/reacted_zinc.avif" type="image/avif">
              <source srcset="images/reacted_zinc.webp" type="image/webp">
              <img src="images/reacted_zinc.png" alt="Reacted Zinc">
            </picture>
            <p class="choose-products-section__product-card-type">Minerals</p>
            <p class="choose-products-section__product-card-name">
              Reacted Zinc
            </p>
            <p class="choose-products-section__product-card-description">
              B vitamins are essential for your nervous system and proper brain
              functioning.
            </p>
          </div>
          <div class="swiper-slide choose-products-section__product-card">
            <picture class="choose-products-section__product-card-img">
              <source srcset="images/ortho_b_complex.avif" type="image/avif">
              <source srcset="images/ortho_b_complex.webp" type="image/webp">
              <img src="images/ortho_b_complex.png" alt="Reacted Zinc">
            </picture>
            <p class="choose-products-section__product-card-type">
              Vitamins & Dietary Supplements
            </p>
            <p class="choose-products-section__product-card-name">
              Ortho B Complex
            </p>
            <p class="choose-products-section__product-card-description">
              B vitamins are essential for your nervous system and proper brain
              functioning.
            </p>
          </div>
          <div class="swiper-slide choose-products-section__product-card">
            <picture class="choose-products-section__product-card-img">
              <source srcset="images/ortho_b_complex.avif" type="image/avif">
              <source srcset="images/ortho_b_complex.webp" type="image/webp">
              <img src="images/ortho_b_complex.png" alt="Reacted Zinc">
            </picture>
            <p class="choose-products-section__product-card-type">
              Vitamins & Dietary Supplements
            </p>
            <p class="choose-products-section__product-card-name">
              Ortho B Complex
            </p>
            <p class="choose-products-section__product-card-description">
              B vitamins are essential for your nervous system and proper brain
              functioning.
            </p>
          </div>
          <div class="swiper-slide choose-products-section__product-card">
            <picture class="choose-products-section__product-card-img">
              <source srcset="images/ortho_b_complex.avif" type="image/avif">
              <source srcset="images/ortho_b_complex.webp" type="image/webp">
              <img src="images/ortho_b_complex.png" alt="Reacted Zinc">
            </picture>
            <p class="choose-products-section__product-card-type">
              Vitamins & Dietary Supplements
            </p>
            <p class="choose-products-section__product-card-name">
              Ortho B Complex
            </p>
            <p class="choose-products-section__product-card-description">
              B vitamins are essential for your nervous system and proper brain
              functioning.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="choose-products-section__title-block">
      <h2 class="choose-products-section__title">Choose your products</h2>
      <p class="choose-products-section__description">
        We'll help you create a health plan with vitamins, supplements, and more
        that help you feel your best today and support you long-term.
      </p>
      <a href="#" class="link-arrow">Go to the shop<svg class="link-arrow__arrow">
    <use xlink:href="images/Sprite.svg#right-arrow"></use>
  </svg>
</a>

      <picture class="choose-products-section__title-block-img">
        <source srcset="images/wooden_spoons.avif" type="image/avif">
        <source srcset="images/wooden_spoons.webp" type="image/webp">
        <img src="images/wooden_spoons.jpg" alt="Reacted Zinc">
      </picture>
      <svg class="background-image__logo-background">
        <use xlink:href="images/Sprite.svg#logo-background"></use>
      </svg>
    </div>
  </div>
</section>

        <section class="happy-customers-section">
    <div class="happy-customers-section__container">
        <svg class="happy-customers-section__img">
            <use xlink:href="images/Sprite.svg#talk"></use>
        </svg>
        <h2 class="happy-customers-section__title">What healthy and happy customer says</h2>
        <p class="happy-customers-section__description">We'll help you create a health plan with vitamins, supplements, and more that help you feel your best today and support you long-term.</p>
        <div class="what-users-say">
  <div class="swiper-container what-users-say__swiper-container">
    <div class="swiper-wrapper what-users-say__swiper-wrapper">
      <div class="swiper-slide customer-say-block what-users-say__swiper-slide">
        <div class="customer-say-block__review">
          <div class="customer-say-block__rate">
            <svg class="customer-say-block__rate-img">
              <use xlink:href="images/Sprite.svg#rate"></use>
            </svg>
          </div>
          <div class="customer-say-block__title">
            Easy monitoring your weight goal!
          </div>
          <p class="customer-say-block__description">
            Love Vitamins! The individual packets make it so easy to remember
            you daily vitamins and makes travelling easy!!! 👍🏽
          </p>
        </div>
        <div class="customer-say-block__user-block">
          <picture class="customer-say-block__user-block-img">
            <source srcset="images/david_s.avif" type="image/avif">
            <source srcset="images/david_s.webp" type="image/webp">
            <img src="images/david_s.png" alt="David S.">
          </picture>
          <p class="customer-say-block__user-block-name">David S.</p>
        </div>
      </div>
      <div class="swiper-slide customer-say-block what-users-say__swiper-slide">
        <div class="customer-say-block__review">
          <div class="customer-say-block__rate">
            <svg class="customer-say-block__rate-img">
              <use xlink:href="images/Sprite.svg#rate"></use>
            </svg>
          </div>
          <div class="customer-say-block__title">
            High quality vitamins & supplements
          </div>
          <p class="customer-say-block__description">
            High quality vitamins & supplements, very easy on my stomach too.
            Great service! I really like the flexibility and options available
            in the subscriptions.
          </p>
        </div>
        <div class="customer-say-block__user-block">
          <picture class="customer-say-block__user-block-img">
            <source srcset="images/bridget_t.avif" type="image/avif">
            <source srcset="images/bridget_t.webp" type="image/webp">
            <img src="images/bridget_t.png" alt="David S.">
          </picture>
          <p class="customer-say-block__user-block-name">Bridget T.</p>
        </div>
      </div>
      <div class="swiper-slide customer-say-block what-users-say__swiper-slide">
        <div class="customer-say-block__review">
          <div class="customer-say-block__rate">
            <svg class="customer-say-block__rate-img">
              <use xlink:href="images/Sprite.svg#rate"></use>
            </svg>
          </div>
          <div class="customer-say-block__title">I love it</div>
          <p class="customer-say-block__description">
            I love it. It makes me feel good each morning and then it also makes
            me feel accomplished.
          </p>
        </div>
        <div class="customer-say-block__user-block">
          <picture class="customer-say-block__user-block-img">
            <source srcset="images/jenna_y.avif" type="image/avif">
            <source srcset="images/jenna_y.webp" type="image/webp">
            <img src="images/jenna_y.png" alt="David S.">
          </picture>
          <p class="customer-say-block__user-block-name">Jenna Y.</p>
        </div>
      </div>
      <div class="swiper-slide customer-say-block what-users-say__swiper-slide">
        <div class="customer-say-block__review">
          <div class="customer-say-block__rate">
            <svg class="customer-say-block__rate-img">
              <use xlink:href="images/Sprite.svg#rate"></use>
            </svg>
          </div>
          <div class="customer-say-block__title">
            Easy monitoring your weight goal!
          </div>
          <p class="customer-say-block__description">
            Love Vitamins! The individual packets make it so easy to remember
            you daily vitamins and makes travelling easy!!! 👍🏽
          </p>
        </div>
        <div class="customer-say-block__user-block">
          <picture class="customer-say-block__user-block-img">
            <source srcset="images/david_s.avif" type="image/avif">
            <source srcset="images/david_s.webp" type="image/webp">
            <img src="images/david_s.png" alt="David S.">
          </picture>
          <p class="customer-say-block__user-block-name">David S.</p>
        </div>
      </div>
      <div class="swiper-slide customer-say-block what-users-say__swiper-slide">
        <div class="customer-say-block__review">
          <div class="customer-say-block__rate">
            <svg class="customer-say-block__rate-img">
              <use xlink:href="images/Sprite.svg#rate"></use>
            </svg>
          </div>
          <div class="customer-say-block__title">
            High quality vitamins & supplements
          </div>
          <p class="customer-say-block__description">
            High quality vitamins & supplements, very easy on my stomach too.
            Great service! I really like the flexibility and options available
            in the subscriptions.
          </p>
        </div>
        <div class="customer-say-block__user-block">
          <picture class="customer-say-block__user-block-img">
            <source srcset="images/bridget_t.avif" type="image/avif">
            <source srcset="images/bridget_t.webp" type="image/webp">
            <img src="images/bridget_t.png" alt="David S.">
          </picture>
          <p class="customer-say-block__user-block-name">Bridget T.</p>
        </div>
      </div>
      <div class="swiper-slide customer-say-block what-users-say__swiper-slide">
        <div class="customer-say-block__review">
          <div class="customer-say-block__rate">
            <svg class="customer-say-block__rate-img">
              <use xlink:href="images/Sprite.svg#rate"></use>
            </svg>
          </div>
          <div class="customer-say-block__title">I love it</div>
          <p class="customer-say-block__description">
            I love it. It makes me feel good each morning and then it also makes
            me feel accomplished.
          </p>
        </div>
        <div class="customer-say-block__user-block">
          <picture class="customer-say-block__user-block-img">
            <source srcset="images/jenna_y.avif" type="image/avif">
            <source srcset="images/jenna_y.webp" type="image/webp">
            <img src="images/jenna_y.png" alt="David S.">
          </picture>
          <p class="customer-say-block__user-block-name">Jenna Y.</p>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
</section>
        <section class="get-started-section">
  <div class="get-started-section__container">
    <svg class="get-started-section__img">
      <use xlink:href="images/Sprite.svg#hands"></use>
    </svg>
    <h2 class="get-started-section__title">Ready to get started?</h2>
    <p class="get-started-section__description">
      We'll help you create a health plan with vitamins, supplements, and more
      that help you feel your best today and support you long-term.
    </p>
    <a class="default-button get-started-section__button" href="">Take the quiz</a>
    <a href="#" class="link-arrow">Go to the shop<svg class="link-arrow__arrow">
    <use xlink:href="images/Sprite.svg#right-arrow"></use>
  </svg>
</a>

    <svg class="background-img__one-two-circle">
      <use xlink:href="images/Sprite.svg#one-two-circle"></use>
    </svg>
    <svg class="background-img__one-two-circle-2">
      <use xlink:href="images/Sprite.svg#one-two-circle"></use>
    </svg>
  </div>
</section>

      </main>
      <footer class="footer">
  <div class="footer__container">
    <div class="footer__inner">
      <a class="footer__logo" href="#" aria-label="Home">
        <svg class="footer__logo-img">
          <use xlink:href="images/Sprite.svg#logo"></use>
        </svg>
      </a>
      <p class="footer__all-rights">
        © 2020 Vitamins.com / All rights reserved
      </p>
      <nav class="footer__menu">
        <div class="footer__sub-menu">
          <div class="footer__sub-menu-title">Shop</div>
          <div class="footer__sub-menu-items-blocks">
            <div class="footer__sub-menu-items-block">
              <a class="text-link footer__sub-menu-item" href="#">Vitamins & Dietary Supplements</a>
              <a class="text-link footer__sub-menu-item" href="#">Weight Loss</a>
              <a class="text-link footer__sub-menu-item" href="#">Minerals</a>
              <a class="text-link footer__sub-menu-item" href="#">Antioxidants</a>
            </div>
            <div class="footer__sub-menu-items-block">
              <a class="text-link footer__sub-menu-item" href="#">Probiotics</a>
              <a class="text-link footer__sub-menu-item" href="#">Pain Relief</a>
              <a class="text-link footer__sub-menu-item" href="#">Prenatal Vitamins</a>
            </div>
          </div>
        </div>
        <div class="footer__sub-menu">
          <div class="footer__sub-menu-title">Information</div>
          <div class="footer__sub-menu-items-blocks">
            <div class="footer__sub-menu-items-block">
              <a class="text-link footer__sub-menu-item" href="#">Terms & Conditions</a>
              <a class="text-link footer__sub-menu-item" href="#">Privacy Policy</a>
              <a class="text-link footer__sub-menu-item" href="#">Shipping & Delivery</a>
              <a class="text-link footer__sub-menu-item subs" href="#">Subscription Cycle & Billing</a>
              <a class="text-link footer__sub-menu-item" href="#">Return Policy</a>
            </div>
          </div>
        </div>
        <div class="footer__sub-menu">
          <div class="footer__sub-menu-title">Contact</div>
          <div class="footer__sub-menu-items-blocks">
            <div class="footer__sub-menu-items-block">
              <a class="text-link footer__sub-menu-item" href="mailto:support@medstogo.com">support@medstogo.com</a>
              <a class="text-link footer__sub-menu-item" href="https://uk-ua.facebook.com/" target="_blank">
                <svg class="text-link footer__facebook-img">
                  <use xlink:href="images/Sprite.svg#facebook"></use>
                </svg>
                Facebook
              </a>
              <a class="text-link footer__sub-menu-item" href="https://www.instagram.com/" target="_blank">
                <svg class="footer__instagram-img">
                  <use xlink:href="images/Sprite.svg#instagram"></use>
                </svg>
                Instagram
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</footer>

    </div>
    <script src="js/index.min.js?_v=20230902110154"></script>
  </body>
</html>
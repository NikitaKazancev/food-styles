"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const changeClasses = (elem, added, removed) => {
        elem.classList.remove(removed);
        elem.classList.add(added);
    };

    // Food Styles
    const foodStyles = {
        img: document.querySelector('.tabcontent > img'),
        descr: document.querySelector('.tabcontent__descr > .tabcontent__descr__wrap'),
        styles: [
            {
                name: 'Фитнес',
                imgUrl: 'img/tabs/vegy.jpg',
                alt: 'vegy',
                text: 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Для людей, которые интересуются спортом; активных и здоровых. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
            },
            {
                name: 'Премиум',
                imgUrl: 'img/tabs/elite.jpg',
                alt: 'elite',
                text: 'Меню “Премиум” - мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
            },
            {
                name: 'Постное',
                imgUrl: 'img/tabs/post.jpg',
                alt: 'post',
                text: 'Наше специальное “Постное меню” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения. Полная гармония с собой и природой в каждом элементе! Все будет Ом!',
            },
            {
                name: 'Сбалансированное',
                imgUrl: 'img/tabs/hamburger.jpg',
                alt: 'hamburger',
                text: 'Меню "Сбалансированное" - это соответствие вашего рациона всем научным рекомендациям. Мы тщательно просчитываем вашу потребность в к/б/ж/у и создаем лучшие блюда для вас.',
            },
        ],

        createStyle(id = 0) {
            changeClasses(this.img, 'fade', 'unFade');
            changeClasses(this.descr, 'fade', 'unFade');
            const interval = setInterval(() => {
                this.img.setAttribute('src', this.styles[id].imgUrl);
                this.img.setAttribute('alt', this.styles[id].alt);
                this.descr.textContent = this.styles[id].text;

                changeClasses(this.img, 'unFade', 'fade');
                changeClasses(this.descr, 'unFade', 'fade');
                clearInterval(interval);
            }, 600);

            this.changeActiveItem(id);
        },

        changeActiveItem(id) {
            document.querySelectorAll('.tabheader__item').forEach((item, i) => {
                if (item.classList.contains('tabheader__item_active')) {
                    item.classList.remove('tabheader__item_active');
                } else if (id === i) {
                    item.classList.add('tabheader__item_active');
                }
            });
        }
    };

    document.querySelector('.tabheader__items').addEventListener('click', ({target}) => {
        if (target.matches('.tabheader__item')) {
            foodStyles.createStyle(+target.getAttribute('data-id'));
        }
    });

    foodStyles.createStyle();

    // Timer
    const deadline = new Date(2021, 7, 29),
        days = document.querySelector('#days'),
        hours = document.querySelector('#hours'),
        minutes= document.querySelector('#minutes'),
        secs = document.querySelector('#seconds');

    const addZero = (num) => {
        if (num < 10) return `0${num}`;
        return num;
    };

    let interval = setTimeout(updateTimer, 1000);

    function updateTimer() {
        const timer = new Date(deadline - new Date());
        if (timer >= 0) {
            days.textContent = addZero(timer.getUTCDate() - 1);
            hours.textContent = addZero(timer.getUTCHours());
            minutes.textContent = addZero(timer.getUTCMinutes());
            secs.textContent = addZero(timer.getUTCSeconds());
            interval = setTimeout(updateTimer, 1000);
        } else clearInterval(interval);
    }

    updateTimer();

    // Modal
    const modalTimer = 5000,
        modal = document.querySelector('.modal'),
        btnContact = document.querySelectorAll('[data-contact]');

    const modalToggle = (overflow = 'hidden') => {
        document.documentElement.style.overflow = overflow;
        modal.classList.toggle('show');
        // clearInterval(timeoutId);
        window.removeEventListener('scroll', modalScroll);
    };
    
    const modalScroll = () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.offsetHeight - 10) modalToggle();
    };
    
    // const timeoutId = setTimeout(() => {
    //     modalToggle();
    // }, modalTimer);

    window.addEventListener('scroll', modalScroll);

    btnContact.forEach(btn => btn.addEventListener('click', () => modalToggle()));
    document.addEventListener('keydown', ({code}) => {
        if (code === "Escape" && modal.classList.contains('show')) modalToggle();
    });

    modal.addEventListener('click', ({target}) => {
        if (target.matches('.modal') || target.matches('.modal__close')) modalToggle('');
    });
});

// Cards
const data = {
    rate: 26.81,
    cards: [
        {
            title: 'Фитнес',
            descr: 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
            price: 9,
            img: 'vegy',
        },
        {
            title: 'Премиум',
            descr: 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
            price: 21,
            img: 'elite',
        },
        {
            title: 'Постное',
            descr: 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
            price: 14,
            img: 'post',
        },
    ]
};

class Card {
    constructor(title, descr, price, img, classes = []) {
        this.title = 'Меню' + title;
        this.descr = descr;
        this.price = price;
        this.img = img;
        this.classes = "menu__item " + classes.join(' ');
    }

    render() {
        document.querySelector('.menu__field > .container').innerHTML += `
            <div class="${this.classes}">
                <img src="img/tabs/${this.img}.jpg" alt="${this.img}">
                <h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </div>
        `;
    }
}

data.cards.forEach(({title, descr, price, img, additionalClasses: classes}) => {
    if (classes) new Card(title, descr, Math.round(price*data.rate), img, classes).render();
    else new Card(title, descr, Math.round(price*data.rate), img).render();
});
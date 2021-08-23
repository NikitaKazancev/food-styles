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
            changeClasses(this.img, 'fade', 'show');
            changeClasses(this.descr, 'fade', 'show');
            const interval = setInterval(() => {
                this.img.setAttribute('src', this.styles[id].imgUrl);
                this.img.setAttribute('alt', this.styles[id].alt);
                this.descr.textContent = this.styles[id].text;

                changeClasses(this.img, 'show', 'fade');
                changeClasses(this.descr, 'show', 'fade');
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
    const deadline = new Date(2021, 7, 30),
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
});
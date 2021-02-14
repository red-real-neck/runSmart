document.addEventListener('DOMContentLoaded', () => {

    //tabs switcher
    const tabsContent = document.querySelectorAll(".tabcontent"),
        tabs = document.querySelectorAll('.tabheader__item'),
        tabsWrapper = document.querySelector('.tabcontainer');

    const activeTabIndex = function (array) {
        let i;
        array.forEach((item, index) => {
            if (item.classList.contains('tabheader__item_active')) {
                i = index;
            }
        });
        return i;
    };

    // console.log(activeTabIndex(tabs));

    tabsWrapper.addEventListener('click', (event) => {
        if (event.target && event.target.classList.contains('tabheader__item')) {
            if (!event.target.classList.contains('.tabheader__item_active')) {
                let activeTabContentIndex;
                tabs.forEach((item) => {
                    item.classList.remove('tabheader__item_active');
                });
                tabsContent.forEach((item) => {
                    item.classList.remove('tabcontent_active');
                });
                event.target.classList.add('tabheader__item_active');
                activeTabContentIndex = activeTabIndex(tabs);
                tabsContent[activeTabContentIndex].classList.add('tabcontent_active');
            }
        }
    });

    //timer

    const deadLine = '2021-05-04';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t / (1000 * 60 * 60) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds

        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = document.querySelector('#days'),
            hours = document.querySelector('#hours'),
            minutes = document.querySelector('#minutes'),
            seconds = document.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total  <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadLine);

    // modal

    const btnModal = document.querySelectorAll(`[data-modal]`),
          modal = document.querySelector('.modal'),
          modalClose = document.querySelector('[data-close]');

    btnModal.forEach((item) => {
        item.addEventListener('click', function() {
            modal.style.display = 'block';
        });
    });
    modalClose.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    //cards

    class Card {
        constructor(img, alt, subtitle, descr, total, parrentSelector, ...classes) {
            this.img = img;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.total = total;
            this.parrentElement = document.querySelector(parrentSelector);
            this.classes = classes;
        }

        addCard() {
            const wrapper = document.createElement('div');
            if (this.classes.length === 0) {
                this.classes.push('menu__item');
            } else {
                this.classes.forEach(className => wrapper.classList.add(className));
            }            
            wrapper.innerHTML =
                `<img src=${this.img} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.total}</span> грн/день</div>
                </div>`
            ;
            this.parrentElement.append(wrapper);
        }
    }

    const menuFitness = new Card(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        '229',
        '[data-menu]',
        'menu__item'
        );

    menuFitness.addCard();

    const menuPremium = new Card('img/tabs/elite.jpg', 'elite', 'Меню “Премиум”', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', '550', '[data-menu]', 'menu__item');

    menuPremium.addCard();

    const menuKek = new Card('img/tabs/elite.jpg', 'elite', 'Меню “Премиум”', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', '550', '[data-menu]', 'menu__item');

    menuKek.addCard();

    //forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Загрузка',
        success: 'Спасибо! Мы скоро с вами свяжемся.',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            // request.setRequestHeader('Content-type', 'multipart/form-data');
            const formData = new FormData(form);

            request.send(formData);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = message.success;
                } else {
                    statusMessage.textContent = message.failure;
                }
            });
        });
    }
});


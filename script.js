document.addEventListener('DOMContentLoaded', () => {
        // Ингридиенты
        const olive = document.querySelector('.olive'),
              celery = document.querySelector('.celery'),
              eggs = document.querySelector('.eggs'),
              fish = document.querySelector('.fish'),
              beans = document.querySelector('.beans'),
              modal = document.querySelector('#rec839968303');
        
        const gamePopupBtn = document.querySelector('.game__popup-btn a');

        if (gamePopupBtn) {
            gamePopupBtn.addEventListener('click', (e) => {
                e.preventDefault();
            });
        }
        
        // Страницы, на которых есть ингридиенты
        let PAGES = ["", "kulinarnyj-den-rozhdeniya", "kulinarnye-master-klassy", "catering", "contacts"],
            current_location = window.location.href.split('/')[3],
            storage = window.localStorage,
            title = '',
            text = '';

    const currentTime = Date.now();
    const storedData = localStorage.getItem('date');

    if (storedData) {
        const timestamp = Number(storedData);
        const timeDifference = currentTime - timestamp;
        const minutesPassed = timeDifference / (1000 * 60 * 60);
        
        if (minutesPassed >= 48) {
            localStorage.removeItem('celery');
            localStorage.removeItem('date');
            localStorage.removeItem('count');
            localStorage.removeItem('eggs');
            localStorage.removeItem('fish');
            localStorage.removeItem('olive');
            localStorage.removeItem('beans');
            console.log("Локальное хранилище очищено из-за истечения 10 минут.");
        }
    }


        // storage.clear();
        
        // Проверка страницы (если уже был найден элемент)
        function checkPage() {
            if (PAGES.includes(current_location)) {
                switch (current_location) {
                    case "":
                        olive.addEventListener('click', () => {
                            showModal('olive', olive);
                        });
                        if (storage.getItem('olive')) {
                            olive.style.display = 'none';
                        }
                        break;
                    case "kulinarnyj-den-rozhdeniya": 
                        console.log('denrozhdeniya');
                        celery.addEventListener('click', () => {
                            showModal('celery', celery);
                        });
                        if (storage.getItem('celery')) {
                            celery.style.display = 'none';
                        }
                        break;
                    case "kulinarnye-master-klassy": 
                        console.log('master-klassy');
                        eggs.addEventListener('click', () => {
                            showModal('eggs', eggs);
                        });
                        if (storage.getItem('eggs')) {
                            eggs.style.display = 'none';
                        }
                        break;
                    case "catering": 
                        console.log('catering');
                        fish.addEventListener('click', () => {
                            showModal('fish', fish);
                        });
                        if (storage.getItem('fish')) {
                            fish.style.display = 'none';
                        }
                        break;
                    case "contacts":
                        console.log('contacts');
                        beans.addEventListener('click', () => {
                            showModal('beans', beans);
                        });
                        if (storage.getItem('beans')) {
                            beans.style.display = 'none';
                        }
                        break;
                }
            }
        }
        
        checkPage();
        
        
        // Тексты
        const content = {
            one: {
                title: "Поздравляем, вы нашли первый ингредиент!",
                text: "Найдите все 5 ингредиентов, чтобы собрать блюдо и получить в подарок на выбор мороженое / приветственный бокал игристого / домашние лимонады для каждого гостя при заказе частного мероприятия"
            },
            two: {
                title: "Второй ингредиент найден",
                text: "Не останавливайтесь! Найдите еще 3 ингредиента, чтобы получить приз"
            },
            three: {
                title: "Третий ингредиент найден",
                text: "Вы на полпути к победе! Осталось еще 2 ингредиента, чтобы собрать блюдо и получить награду"
            },
            four: {
                title: "Четвертый ингредиент найден",
                text: "До вашего персонального подарка остался всего один ингредиент! Поищите среди остальных страниц, он точно где-то здесь"
            },
            five: {
                title: "Поздравляем! Вы собрали салат нисуаз",
                text: "Оставьте заявку, чтобы получить в подарок мороженое / приветственный бокал игристого / домашние лимонады при заказе частного мероприятия"
            }
        }
        
        function finalyModal() {
            modal.querySelector('.game__popup-img').style.display = 'block';
            document.querySelector('.game__popup-btn a').setAttribute('href', '#application');
            document.querySelector('#rec839968553 a[href="#application"]').addEventListener('click', () => {
                closeModal();
            });
        }
        
        // Замена текста в модалке
        function changeTextModal(newTitle, newText, number, ingridient) {
            title = newTitle;
            text = newText;
            modal.querySelector('.game__popup-content-title').textContent = title;
            modal.querySelector('.game__popup-content-subtitle').textContent = text;
            number === 5 ? finalyModal() : modal.querySelector('.game__popup-img').style.display = 'none';
            storage.setItem('count', `${number}`);
        }
        
        
        // Проверка количества ингридиентов
        function checkCuont(ingridient) {
            if (storage.getItem('count')) {
                switch (storage.getItem('count')) {
                    case '1':
                        changeTextModal(content.two.title, content.two.text, 2);
                        break;
                    case '2':
                        changeTextModal(content.three.title, content.three.text, 3)
                        break;
                    case '3':
                        changeTextModal(content.four.title, content.four.text, 4)
                        break;
                    case '4':
                        changeTextModal(content.five.title, content.five.text, 5)
                        break;
                }
            } else {
                changeTextModal(content.one.title, content.one.text, 1, ingridient);
                storage.setItem('date', Date.now());
            }
        }
        
        
        // Добавление в хранилище
        function showModal(elem, ingridient) {
            ingridient.style.display = 'none';
            switch (elem) {
                case 'olive':
                    storage.setItem('olive', 'true');
                    checkCuont(ingridient);
                    break;
                case 'celery':
                    storage.setItem('celery', 'true');
                    checkCuont(ingridient);
                    break;
                case 'eggs':
                    storage.setItem('eggs', 'true');
                    checkCuont(ingridient);
                    break;
                case 'fish':
                    storage.setItem('fish', 'true');
                    checkCuont(ingridient);
                    break;
                case 'beans':
                    storage.setItem('beans', 'true');
                    checkCuont(ingridient);
                    break;
            }
        }
        
        function closeModal() {
            document.querySelector('#rec839968553 .t-popup').click()
        }
        
        // Закрытие модалки
        document.addEventListener("keydown", (e) => {
            if (e.code == "Escape") {
                closeModal();
            }
        });
    });

const navItems = document.querySelectorAll('.nav-tabs li');
const navWrapper = document.querySelector('.nav-wrapper');

function highlightActiveTab() {
    const wrapperRect = navWrapper.getBoundingClientRect();
    let closestIndex = 0;
    let closestDistance = Infinity;

    navItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const distance = Math.abs(rect.left - wrapperRect.left);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
        }
    });

    navItems.forEach(item => item.classList.remove('active'));
    navItems[closestIndex].classList.add('active');
}

// Отслеживаем событие прокрутки
navWrapper.addEventListener('scroll', highlightActiveTab);

// Инициализация - выделяем первый элемент при загрузке
highlightActiveTab();

// Получаем элементы модального окна
var modal = document.querySelector('.modal');
var closeButtons = document.querySelectorAll(".close-button"); // Изменено на querySelectorAll для получения всех кнопок

// Функция для открытия модального окна
function openModal(info) {
    document.querySelector('.modal-content h2').innerText = info; // Добавляем информацию
    modal.classList.add('show'); // Показываем модальное окно
}

// Функция для закрытия модального окна
function closeModal() {
    modal.classList.remove('show'); // Скрываем модальное окно
}

// Закрытие модального окна при нажатии вне его
window.onclick = function(event) {
    if (event.target === modal) {
        closeModal(); // Скрываем модальное окно
    }
}

// Обработчик для всех кнопок закрытия модального окна
closeButtons.forEach(function(button) {
    button.addEventListener('click', closeModal);
});

// Добавляем обработчик события для каждой карточки
var cards = document.querySelectorAll('.card');
cards.forEach(function(card) {
    card.addEventListener('click', function() {
        var info = card.querySelector('.name').innerText + " - " + card.querySelector('.price').innerText; // Получаем информацию о товаре
        openModal(info); // Открываем модальное окно
    });
});


function scrollToElement(elementSelector, instance = 0) {
    // Select all elements that match the given selector
    const elements = document.querySelectorAll(elementSelector);
    // Check if there are elements matching the selector and if the requested instance exists
    if (elements.length > instance) {
        // Scroll to the specified instance of the element
        elements[instance].scrollIntoView({ behavior: 'smooth' });
    }
}

const link1 = document.getElementById("link1");
const link2 = document.getElementById("link2");
const link3 = document.getElementById("link3");

link1.addEventListener('click', () => {
    scrollToElement('#burgers-section');
});

link2.addEventListener('click', () => {
    scrollToElement('#pizza-section');
});

link3.addEventListener('click', () => {
    scrollToElement('#sushi-section');
});

// Получаем навигационное меню
const nav = document.getElementById("nav");
const navOffset = nav.offsetTop; // Позиция навигации

window.onscroll = function() {
    if (window.pageYOffset >= navOffset) {
        nav.classList.add("fixed"); // Добавляем класс fixed при прокрутке
    } else {
        nav.classList.remove("fixed"); // Убираем класс, если скролл меньше
    }
};

// Получаем элементы модального окна
var modal = document.querySelector('.modal');
var closeButton = document.getElementsByClassName("close-button")[0];

// Функция для закрытия модального окна
function closeModal() {
    modal.classList.remove('show'); // Скрываем модальное окно
}

// Закрытие модального окна при нажатии на крестик
closeButton.onclick = closeModal;

// Закрытие модального окна при нажатии вне его
window.onclick = function(event) {
    if (event.target === modal) {
        closeModal(); // Скрываем модальное окно
    }
}

// Открытие и закрытие бокового меню
function toggleSideMenu() {
    const sideMenu = document.getElementById("sideMenu");
    sideMenu.classList.toggle("show-side-menu");
}


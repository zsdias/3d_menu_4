
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
const modal = document.querySelector('.modal');
const closeButtons = document.querySelectorAll(".close-button");


// Функция для открытия модального окна
function openModal(info) {
    document.querySelector('.modal-content h2').innerText = info;
    modal.classList.add('show');
}

// Функция для закрытия модального окна
function closeModal() {
    modal.classList.remove('show');
}



// Закрытие модального окна при нажатии вне его
window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
}

// Обработчик для всех кнопок закрытия модального окна
closeButtons.forEach(button => {
    button.addEventListener('click', closeModal);
});

// Добавляем обработчик события для каждой карточки
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('click', function() {
        const info = `${card.querySelector('.name').innerText} - ${card.querySelector('.price').innerText}`;
        openModal(info);
    });
});

// Функция для плавного скролла к элементу
function scrollToElement(elementSelector, instance = 0) {
    const elements = document.querySelectorAll(elementSelector);
    if (elements.length > instance) {
        elements[instance].scrollIntoView({ behavior: 'smooth' });
    }
}

// Привязка навигационных ссылок к соответствующим разделам
document.getElementById("link1").addEventListener('click', () => scrollToElement('#burgers-section'));
document.getElementById("link2").addEventListener('click', () => scrollToElement('#pizza-section'));
document.getElementById("link3").addEventListener('click', () => scrollToElement('#sushi-section'));

// Фиксированное меню навигации
const nav = document.getElementById("nav");
const navOffset = nav.offsetTop;

window.onscroll = function() {
    nav.classList.toggle("fixed", window.pageYOffset >= navOffset);
};

// Открытие и закрытие бокового меню
function toggleSideMenu() {
    const sideMenu = document.getElementById("sideMenu");
    sideMenu.classList.toggle("show-side-menu");
}

function search() {
    const input = document.getElementById('searchBox').value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    let found = false;

    // Проверяем каждую карточку
    cards.forEach(card => {
        const name = card.querySelector('.name').textContent.toLowerCase();
        if (name.includes(input)) {
            found = true; // Найдено совпадение
            card.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Скроллим к карточке
            return; // Прерываем цикл, как только нашли первое совпадение
        }
    });

    // Если ничего не найдено, можно показать сообщение
    if (!found) {
        alert("Ничего не найдено");
    }
}


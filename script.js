// Переменные для работы с   поп-апом
const buttonEditInfo = document.querySelector('.profile__edit-button');
const buttonClosePopup = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');

// Переменные для работы с формой
const profileTitleText = document.querySelector('.profile__title');
const profileSubTitleText = document.querySelector('.profile__subtitle');

// Находим форму в DOM
const formElement = document.querySelector('.form');

// Находим поля формы в DOM
const nameInput = formElement.querySelector('#name');
const jobInput = formElement.querySelector('#job');

// Находим все контейнеры с карточками
const cardsContainers = document.querySelectorAll('.elements__card-container');

// Выбираем секцию, в которой будем создавать карточки
const elements = document.querySelector('.elements');

// Выбираем шаблон (template) карточки
const cardTemplate = document.querySelector('#card-template').content;


// Функция для удаления всех карточек
const removeAllCards = () => {
  cardsContainers.forEach(container => {
    container.remove();
  });
};

// Функция для создания  одной карточки
const createCard = () => {
  const newCardFromTemplate = cardTemplate.querySelector('.elements__card-container').cloneNode(true);
  newCardFromTemplate.querySelector('.elements__image').src =
    'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg';
  newCardFromTemplate.querySelector('.elements__image').alt = 'Альт картинки';
  newCardFromTemplate.querySelector('.elements__text').textContent = 'Название';

  elements.append(newCardFromTemplate);
};


// Функция для первичного заполнения карточками из массива
const firstAddCards = () => {
  removeAllCards(); // Удалим все карточки
  initialCards.forEach(function (item, index, array) { // Парсим массив
    const newCardFromTemplate = cardTemplate.querySelector('.elements__card-container').cloneNode(true); // Клонируем шаблон
    newCardFromTemplate.querySelector('.elements__image').src = array[index].link; // Заполняем контентом
    newCardFromTemplate.querySelector('.elements__image').alt = array[index].name;
    newCardFromTemplate.querySelector('.elements__text').textContent = array[index].name;
    elements.append(newCardFromTemplate); // выводим на страницу
  });
};
firstAddCards();

// Объявляем функцию для открытия поп-апа
function showPopUp() {
  popup.classList.add("popup_opened"); // Показываем поп-ап
  letDefaultVariables(); // Заполняем дефолтные значения
}

// Объявляем функцию для подстановки изначальных значений в поля формы
function letDefaultVariables() {
  nameInput.value = profileTitleText.textContent;
  jobInput.value = profileSubTitleText.textContent;
}

// Объявляем функцию для закрытия поп-апа
function hidePopUp() {
  popup.classList.remove("popup_opened");
}

// Событие открытие поп-апа
buttonEditInfo.addEventListener('click', showPopUp);

// Событие закрытие поп-апа
buttonClosePopup.addEventListener('click', hidePopUp);

// Работа с формой

// Обработчик «отправки» формы
function editAccountInfo(evt) {
  evt.preventDefault(); //
  profileTitleText.textContent = nameInput.value;
  profileSubTitleText.textContent = jobInput.value;
  hidePopUp();
}

// Прикрепляем обработчик к форме:
formElement.addEventListener('submit', editAccountInfo);

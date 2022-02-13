// Переменные для работы с поп-апом редактирования информации
const buttonEditInfo = document.querySelector('.profile__edit-button');
const buttonClosePopup = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');

// Переменные для работы с поп-апом добавления карточки
const buttonAddNewCard = document.querySelector('.profile__post-button');
const buttonClosePopupAdd = document.querySelector('.popup-add__close');
const popupAdd = document.querySelector('.popup-add');

// Переменные для работы с формой отправки информации
const profileTitleText = document.querySelector('.profile__title');
const profileSubTitleText = document.querySelector('.profile__subtitle');

// Находим форму для отправки информации в DOM
const formElement = document.querySelector('.form');

// Находим поля формы для отправки информации   в DOM
const nameInput = formElement.querySelector('#name');
const jobInput = formElement.querySelector('#job');

// Находим форму для добавления карточки в DOM
const formAddElement = document.querySelector('.form-add');

// Находим поля формы для добавления карточки   в DOM
const placeInput = formAddElement.querySelector('#place');
const linkInput = formAddElement.querySelector('#link');

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

// Функция для создания   карточки из формы
const createCardFromForm = () => {
  const newCardFromTemplate = cardTemplate.querySelector('.elements__card-container').cloneNode(true);
  newCardFromTemplate.querySelector('.elements__image').src = linkInput.value;
  newCardFromTemplate.querySelector('.elements__image').alt = placeInput.value;
  newCardFromTemplate.querySelector('.elements__text').textContent = placeInput.value;
  console.log(placeInput.value);
  elements.prepend(newCardFromTemplate);
};


// Функция для первичного заполнения карточками из массива
const firstAddCards = () => {
  removeAllCards(); // Удалим все карточки
  initialCards.forEach((item, index, array) => { // Парсим массив
    const newCardFromTemplate = cardTemplate.querySelector('.elements__card-container').cloneNode(true); // Клонируем шаблон
    newCardFromTemplate.querySelector('.elements__image').src = array[index].link; // Заполняем контентом
    newCardFromTemplate.querySelector('.elements__image').alt = array[index].name;
    newCardFromTemplate.querySelector('.elements__text').textContent = array[index].name;
    elements.append(newCardFromTemplate); // выводим на страницу
  });
};
firstAddCards();

// Объявляем функцию для открытия поп-апа редактированая информации
function showPopUp() {
  popup.classList.add("popup_opened"); // Показываем поп-ап
  letDefaultVariables(); // Заполняем дефолтные значения
}

// Объявляем функцию для открытия поп-апа добавления новой карточки
function showPopUpAdd() {
  popupAdd.classList.add("popup-add_opened"); // Показываем поп-ап
}



// Объявляем функцию для подстановки изначальных значений в поля формы
function letDefaultVariables() {
  nameInput.value = profileTitleText.textContent;
  jobInput.value = profileSubTitleText.textContent;
}

// Объявляем функцию для закрытия поп-апа редактирования информации
function hidePopUp() {
  popup.classList.remove("popup_opened");
}

// Объявляем функцию для закрытия поп-апа добавления новой карточки
function hidePopUpAdd() {
  popupAdd.classList.remove("popup-add_opened");
}

// Событие открытие поп-апа редактирования информации
buttonEditInfo.addEventListener('click', showPopUp);

// Событие открытие поп-апа добавление новой карточки
buttonAddNewCard.addEventListener('click', showPopUpAdd);



// Событие закрытие поп-апа редактирования информации
buttonClosePopup.addEventListener('click', hidePopUp);

// Событие закрытие поп-апа добавление новой карточки
buttonClosePopupAdd.addEventListener('click', hidePopUpAdd);



// Работа с формами

// Обработчик «отправки» формы редактирования
function editAccountInfo(evt) {
  evt.preventDefault(); //
  profileTitleText.textContent = nameInput.value;
  profileSubTitleText.textContent = jobInput.value;
  hidePopUp();
}

// Обработчик «отправки» формы добавления карточки
function appendNewCard(evt) {
  evt.preventDefault(); //
  createCardFromForm();
  hidePopUpAdd();
}

// Прикрепляем обработчик к форме редактирования:
formElement.addEventListener('submit', editAccountInfo);

// Прикрепляем обработчик к форме создания карточки:
formAddElement.addEventListener('submit', appendNewCard);

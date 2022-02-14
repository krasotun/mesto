// Переменные для работы с поп-апом редактирования информации
const buttonEditInfo = document.querySelector('.profile__edit-button');
const buttonClosePopupEDit = document.querySelector('.popup-edit__close');
const popupEdit = document.querySelector('.popup-edit');

// Переменные для работы с поп-апом добавления карточки
const buttonAddNewCard = document.querySelector('.profile__post-button');
const buttonClosePopupAdd = document.querySelector('.popup-add__close');
const popupAdd = document.querySelector('.popup-add');

// Переменная для работы с попапом из карточки
const buttonClosePopupCard = document.querySelector('.popup-card__close');

// Переменные для работы с формой отправки информации
const profileTitleText = document.querySelector('.profile__title');
const profileSubTitleText = document.querySelector('.profile__subtitle');

// Находим форму для отправки информации в DOM
const formElement = document.querySelector('.form');
console.log(formElement);

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

//Выбираем класс body куда будем добавлять попал из картточки
const page = document.querySelector('.page');

// Выбираем шаблон (template) карточки
const cardTemplate = document.querySelector('#card-template').content;

// Выбираем шаблон (template) попапа
const popupTemplate = document.querySelector('#popup-template').content;


//Функция для переключения открыт/закрыт статуса поп-апа
function popupToggle(popupName) {
  popupName.classList.toggle('popup_opened');
}

// События для поп-апа редактирования информации
buttonEditInfo.addEventListener('click', () => popupToggle(popupEdit));
buttonEditInfo.addEventListener('click', () => letDefaultVariables());
buttonClosePopupEDit.addEventListener('click', () => popupToggle(popupEdit));

// События для поп-апа добавления карточки
buttonAddNewCard.addEventListener('click', () => popupToggle(popupAdd));
buttonClosePopupAdd.addEventListener('click', () => popupToggle(popupAdd));



// Функция для открытия попапа  при клике на картинку карточки (используем Event Delegation)
elements.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('elements__image')) {
    const popupFromCard = popupTemplate.querySelector('.popup-card').cloneNode(true);
    popupFromCard.querySelector('.popup-card__image').src = evt.target.src;
    popupFromCard.querySelector('.popup-card__image').alt = evt.target.alt;
    popupFromCard.querySelector('.popup-card__text').textContent = evt.target.alt;
    page.append(popupFromCard);
  }
});

// Функция для  закрытия попапа  при клике на картинку карточки (используем Event Delegation)
// Тк именно этот  попап генерируется из шаблона его нельзя закрыть "обычным" способом
page.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup-card__close')) {
    evt.target.closest('section').classList.add('popup-card_closed');
  }
});


// Функция "Урна" (используем Event Delegation)
elements.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('elements__delete')) {
    evt.target.closest('article').classList.add('elements__card-container_hidden');
  }
});

// Функция like (используем Event Delegation)
elements.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('elements__like')) {
    evt.target.classList.toggle('elements__like_active');
  }
});


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

// Объявляем функцию для подстановки изначальных значений в поля формы
function letDefaultVariables() {
  nameInput.value = profileTitleText.textContent;
  jobInput.value = profileSubTitleText.textContent;
}

// Работа с формами

// Обработчик «отправки» формы редактирования
function editAccountInfo(evt) {
  evt.preventDefault(); //
  profileTitleText.textContent = nameInput.value;
  profileSubTitleText.textContent = jobInput.value;
  popupToggle(popupEdit);
}

// Обработчик «отправки» формы добавления карточки
function appendNewCard(evt) {
  evt.preventDefault(); //
  createCardFromForm();
  popupToggle(popupAdd);
}

// Прикрепляем обработчик к форме редактирования:
formElement.addEventListener('submit', editAccountInfo);

// Прикрепляем обработчик к форме создания карточки:
formAddElement.addEventListener('submit', appendNewCard);

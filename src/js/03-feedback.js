const throttle = require('lodash.throttle');

const feedbackFormEl = document.querySelector('.feedback-form');
const userData = {};
const STORAGE_KEY = 'feedback-form-state';

function autofillContactForm() {
  try {
    const userDataFromLS = JSON.parse(localStorage.getItem(STORAGE_KEY));

    //якщо localeStorage порожній нічого робити не потрібно
    if (userDataFromLS === null) {
      return;
    }

    //перебираємо об'єкт циклом та робимо автозаповнення зі сховища
    for (const key in userDataFromLS) {
      feedbackFormEl.elements[key].value = userDataFromLS[key];
    }
  } catch (err) {
    console.log(err);
  }
}

autofillContactForm(); //викликається одразу як запускається скрипт

function onFeedbackFormInput(e) {
  const { target } = e;
  const name = target.name;
  const value = target.value;
  userData[name] = value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
}

function onFeedbackFormSubmit(e) {
  e.preventDefault();
  feedbackFormEl.reset();
  localStorage.removeItem(STORAGE_KEY);
}

feedbackFormEl.addEventListener('submit', onFeedbackFormSubmit);
feedbackFormEl.addEventListener('input', throttle(onFeedbackFormInput, 500));

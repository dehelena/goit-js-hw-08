const throttle = require('lodash.throttle');

const feedbackFormEl = document.querySelector('.feedback-form');
const userData = {};

function autofillContactForm() {
  try {
    const userDataFromLS = JSON.parse(
      localStorage.getItem('feedback-form-state')
    );

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

  localStorage.setItem('feedback-form-state', JSON.stringify(userData));
}

function onFeedbackFormSubmit(e) {
  e.preventDefault();
  feedbackFormEl.reset();
  localStorage.removeItem('feedback-form-state');
  console.log(userData);
}

feedbackFormEl.addEventListener('submit', onFeedbackFormSubmit);
feedbackFormEl.addEventListener('input', throttle(onFeedbackFormInput, 500));

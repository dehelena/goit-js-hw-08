const throttle = require('lodash.throttle');

const feedbackFormEl = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
let userData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

function autofillContactForm() {
  try {
    //перебираємо об'єкт циклом та робимо автозаповнення зі сховища
    for (const key in userData) {
      feedbackFormEl.elements[key].value = userData[key];
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
  const {
    elements: { email, message },
  } = e.target;

  if (email.value === '' || message.value === '') {
    alert('All fields must be filled');
  } else {
    feedbackFormEl.reset();
    localStorage.removeItem(STORAGE_KEY);
    console.log(userData);
  }
}

feedbackFormEl.addEventListener('submit', onFeedbackFormSubmit);
feedbackFormEl.addEventListener('input', throttle(onFeedbackFormInput, 500));

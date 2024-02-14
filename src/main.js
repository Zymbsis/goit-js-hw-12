import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import requestFn from './js/pixabay-api';
import * as renderFn from './js/render-functions';

const form = document.querySelector('.form');
const input = form.elements.text;
const galleryContainer = document.querySelector('.gallery-container');
const textLoader = document.querySelector('.text-loader');
const loaderButton = document.querySelector('.loader-button');
const buttonUp = document.querySelector('.button-up');
const checkbox = document.querySelector('.checkbox');
const elemForChangeTheme = document.querySelectorAll('.dark-theme');
const localStorageKey = 'light-theme';
const URL = 'https://pixabay.com/api/';
const searchImgParams = {
  key: '42207525-2f984868f7881b9b68563ca8c',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  q: '',
  page: 1,
  per_page: 15,
};
let totalPageQuantity;
let imgCollection;

const viewGallery = new SimpleLightbox('.gallery-link');

form.addEventListener('submit', async e => {
  e.preventDefault();
  loaderButton.classList.remove('is-visible');
  loaderButton.removeEventListener('click', onButtonClick);
  if (checkbox.checked) {
    textLoader.classList.add('text-loader-light-theme', 'is-visible');
  } else {
    textLoader.classList.add('is-visible');
  }
  galleryContainer.innerHTML = '';

  if (!input.value.trim()) {
    renderFn.createPopUp('Search field can not be empty', textLoader, input);
  } else {
    textLoader.classList.add('is-visible');
    searchImgParams.page = 1;
    searchImgParams.q = input.value;
    try {
      imgCollection = (await requestFn(URL, searchImgParams)).hits;
      const totalImgQuantity = (await requestFn(URL, searchImgParams))
        .totalHits;

      if (!imgCollection.length) {
        renderFn.createPopUp(
          'Sorry, there are no images matching your search query. Please, try again!',
          textLoader,
          input
        );
      } else {
        totalPageQuantity = Math.ceil(
          totalImgQuantity / searchImgParams.per_page
        );
        renderFn.createMarkup(
          imgCollection,
          textLoader,
          viewGallery,
          galleryContainer,
          checkbox.checked
        );

        if (totalPageQuantity > 1) {
          loaderButton.classList.add('is-visible');
          loaderButton.addEventListener('click', onButtonClick);
          searchImgParams.page += 1;
        }
      }
    } catch (error) {
      renderFn.createPopUp(
        'Oops! Something went wrong. Try again!',
        textLoader,
        input
      );
      console.log(error);
    }
  }
  form.reset();
});

async function onButtonClick(e) {
  loaderButton.classList.remove('is-visible');
  if (checkbox.checked) {
    textLoader.classList.add('text-loader-light-theme', 'is-visible');
  } else {
    textLoader.classList.add('is-visible');
  }
  try {
    imgCollection = (await requestFn(URL, searchImgParams)).hits;
    renderFn.createMarkup(
      imgCollection,
      textLoader,
      viewGallery,
      galleryContainer,
      checkbox.checked
    );
    searchImgParams.page += 1;
    if (searchImgParams.page < totalPageQuantity) {
      loaderButton.classList.add('is-visible');
    } else {
      loaderButton.removeEventListener('click', onButtonClick);
      renderFn.createPopUp(
        "We're sorry, but you've reached the end of search results.",
        textLoader,
        input
      );
    }
    scrollWindowOnBtnClick();
  } catch (error) {
    renderFn.createPopUp(
      'Oops! Something went wrong. Try again!',
      textLoader,
      input
    );
    console.log(error);
  }
}

function scrollWindowOnBtnClick() {
  const elemHeight = document
    .querySelector('.gallery-item')
    .getBoundingClientRect().height;
  const valueForScrollWindow = Math.ceil(elemHeight * 2.5);
  window.scrollBy({ top: valueForScrollWindow, behavior: 'smooth' });
}

const observer = new IntersectionObserver(entries => {
  if (entries[0].intersectionRatio === 0) {
    buttonUp.classList.add('is-visible');
    buttonUp.addEventListener('click', scrollOnClick);
  } else {
    buttonUp.classList.remove('is-visible');
    buttonUp.removeEventListener('click', scrollOnClick);
  }
});

observer.observe(form);

function scrollOnClick() {
  form.scrollIntoView({ behavior: 'smooth' });
}

checkbox.addEventListener('change', changeTheme);

window.addEventListener('load', themeAtLoading);

function changeTheme() {
  localStorage.setItem(localStorageKey, JSON.stringify(checkbox.checked));
  const galleryElem = document.querySelectorAll('.gallery-item');
  const imgLoader = document.querySelectorAll('.img-loader');
  if (checkbox.checked) {
    document.body.classList.add('body-light-theme');
    elemForChangeTheme.forEach(item => item.classList.add('light-theme'));
    galleryElem.forEach(item => item.classList.add('light-theme'));
    imgLoader.forEach(item => item.classList.add('img-loader-light-theme'));
    textLoader.classList.add('text-loader-light-theme');
  } else {
    document.body.classList.remove('body-light-theme');
    elemForChangeTheme.forEach(item => item.classList.remove('light-theme'));
    galleryElem.forEach(item => item.classList.remove('light-theme'));
    imgLoader.forEach(item => item.classList.remove('img-loader-light-theme'));
    textLoader.classList.remove('text-loader-light-theme');
  }
}
function themeAtLoading() {
  checkbox.checked = JSON.parse(localStorage.getItem(localStorageKey));
  if (checkbox.checked) {
    document.body.classList.add('body-light-theme');
    elemForChangeTheme.forEach(item => item.classList.add('light-theme'));
  }
}

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import * as pixabayApi from './js/pixabay-api';
import * as renderFn from './js/render-functions';

const form = document.querySelector('.form');
const input = form.elements.text;
const galleryContainer = document.querySelector('.gallery-container');
const loaderText = document.querySelector('.loader');
const loaderButton = document.querySelector('.loader-button');
const buttonUp = document.querySelector('.button-up');

let totalPageQuantity;
let imgCollection;

const viewGallery = new SimpleLightbox('.gallery-link');

form.addEventListener('submit', async e => {
  e.preventDefault();
  loaderButton.removeEventListener('click', onButtonClick);
  loaderButton.classList.remove('is-visible');
  galleryContainer.innerHTML = '';

  if (!input.value.trim()) {
    renderFn.createPopUp('Search field can not be empty', loaderText, input);
  } else {
    loaderText.classList.add('is-visible');
    pixabayApi.searchImgParams.page = 1;
    pixabayApi.searchImgParams.q = input.value;
    try {
      imgCollection = (await pixabayApi.pixabayRequest()).hits;
      const totalImgQuantity = (await pixabayApi.pixabayRequest()).totalHits;

      if (!imgCollection.length) {
        renderFn.createPopUp(
          'Sorry, there are no images matching your search query. Please, try again!',
          loaderText,
          input
        );
      } else {
        totalPageQuantity = Math.ceil(
          totalImgQuantity / pixabayApi.searchImgParams.per_page
        );
        renderFn.createMarkup(
          imgCollection,
          loaderText,
          viewGallery,
          galleryContainer
        );

        if (totalPageQuantity > 1) {
          loaderButton.classList.add('is-visible');
          loaderButton.addEventListener('click', onButtonClick);
          pixabayApi.searchImgParams.page += 1;
        }
      }
    } catch (error) {
      renderFn.createPopUp(
        'Oops! Something went wrong. Try again!',
        loaderText,
        input
      );
      console.log(error);
    }
  }
  form.reset();
});

async function onButtonClick(e) {
  loaderButton.classList.remove('is-visible');
  loaderText.classList.add('is-visible');
  try {
    imgCollection = (await pixabayApi.pixabayRequest()).hits;
    renderFn.createMarkup(
      imgCollection,
      loaderText,
      viewGallery,
      galleryContainer
    );
    pixabayApi.searchImgParams.page += 1;
    if (pixabayApi.searchImgParams.page < totalPageQuantity) {
      loaderButton.classList.add('is-visible');
    } else {
      loaderButton.removeEventListener('click', onButtonClick);
      renderFn.createPopUp(
        "We're sorry, but you've reached the end of search results.",
        loaderText,
        input
      );
    }

    scrollWindowOnBtnClick();
  } catch (error) {
    renderFn.createPopUp(
      'Oops! Something went wrong. Try again!',
      loaderText,
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

//TODO =======================================================================================================================
//TODO =======================================================================================================================
const localStorageKey = 'light-theme';
const checkbox = document.querySelector('.checkbox');
checkbox.addEventListener('change', () => {
  localStorage.setItem(localStorageKey, JSON.stringify(checkbox.checked));
  if (checkbox.checked) {
    document.body.classList.add('body-light');
  } else {
    document.body.classList.remove('body-light');
  }
});

window.addEventListener('load', () => {
  checkbox.checked = JSON.parse(localStorage.getItem(localStorageKey));
  if (checkbox.checked) {
    document.body.classList.add('body-light');
  } else {
    document.body.classList.remove('body-light');
  }
});

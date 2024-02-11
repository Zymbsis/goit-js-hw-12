import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import octagon from './img/octagon.svg';
import closeButton from './img/close_button.svg';

const form = document.querySelector('.form');
const input = document.querySelector('.form-input');
const galleryContainer = document.querySelector('.gallery-container');
const loader = document.querySelector('.loader');
const loaderMarkup = '<p class="loader">Loading images, please wait...</p>';
const searchParams = new URLSearchParams({
  key: '42207525-2f984868f7881b9b68563ca8c',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  q: '',
});
const gallery = new SimpleLightbox('.gallery-link', { alertError: false });

form.addEventListener('submit', e => {
  e.preventDefault();
  if (input.value.trim()) {
    processingPixabayRequest();
  } else {
    createPopUp('Search field can not be empty');
  }
  form.reset();
});

function pixabayRequest(str) {
  galleryContainer.innerHTML = loaderMarkup;
  searchParams.set('q', str);
  return fetch(`https://pixabay.com/api/?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function processingPixabayRequest() {
  pixabayRequest(input.value)
    .then(images => {
      if (images.hits.length) {
        createMarkup(images.hits);
        gallery.refresh();
        checkRenderImg();
      } else {
        createPopUp(
          'Sorry, there are no images matching your search query. Please, try again!'
        );
      }
    })
    .catch(error => {
      createPopUp('Oops! Something went wrong. Try again!');
      console.log(error);
    });
}

function createMarkup(arr) {
  const markup = arr
    .map(
      item =>
        `<li class='gallery-item'><a class='gallery-link' href=${item.largeImageURL}><img class='gallery-img' src=${item.webformatURL} width='360' height='200' alt=${item.tags}><span class="img-loader"></span></a><ul class='desc-wrapper'><li class='desc-text'><h3>Likes</h3><p>${item.likes}</p></li><li class='desc-text'><h3>Views</h3><p>${item.views}</p></li><li class='desc-text'><h3>Comments</h3><p>${item.comments}</p></li><li class='desc-text'><h3>Downloads</h3><p>${item.downloads}</p></li></ul></li>`
    )
    .join('');
  galleryContainer.innerHTML = markup;
}

function createPopUp(message) {
  iziToast.show({
    class: 'my-iziToast',
    backgroundColor: '#EF4040',
    messageColor: '#fff',
    messageSize: 16,
    messageLineHeight: '24',
    message: message,
    position: 'topRight',
    iconUrl: octagon,
    progressBarColor: '#B51B1B;',
    close: false,
    transitionIn: 'bounceInLeft',
    transitionOut: 'fadeOutRight',
    buttons: [
      [
        `<button type="button" style="background-color: #EF4040; padding-top: 15px; padding-bottom: 15px"><img src=${closeButton}></button>`,
        function (instance, toast) {
          instance.hide({ transitionOut: 'fadeOutRight' }, toast);
        },
      ],
    ],
    onOpening: function (instance, toast) {
      galleryContainer.innerHTML = '';
      input.addEventListener(
        'input',
        () => {
          try {
            iziToast.hide(
              {
                transitionOut: 'fadeOutRight',
              },
              toast
            );
          } catch (error) {
            return;
          }
        },
        { once: true }
      );
    },
  });
}

function checkRenderImg() {
  const galleryImg = document.querySelectorAll('.gallery-img');
  galleryImg.forEach(item =>
    item.addEventListener('load', () => {
      item.nextSibling.classList.add('img-loader-hidden');
    })
  );
}

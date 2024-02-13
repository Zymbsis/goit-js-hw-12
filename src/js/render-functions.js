import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import octagon from '../img/octagon.svg';
import closeButton from '../img/close_button.svg';

export function createMarkup(
  arr,
  loaderElem,
  lightboxInstance,
  markupContainer,
  stateCheckbox
) {
  loaderElem.classList.remove('is-visible');
  markupContainer.innerHTML += arr
    .map(
      item =>
        `<li class='gallery-item'><a class='gallery-link' href=${item.largeImageURL}><img class='gallery-img' src=${item.webformatURL} width='360' height='200' alt=${item.tags}><span class="img-loader"></span></a><ul class='desc-wrapper'><li class='desc-text'><h3>Likes</h3><p>${item.likes}</p></li><li class='desc-text'><h3>Views</h3><p>${item.views}</p></li><li class='desc-text'><h3>Comments</h3><p>${item.comments}</p></li><li class='desc-text'><h3>Downloads</h3><p>${item.downloads}</p></li></ul></li>`
    )
    .join('');
  console.log(stateCheckbox);

  if (stateCheckbox) {
    document
      .querySelectorAll('.gallery-item')
      .forEach(item => item.classList.add('light-theme'));
  }
  lightboxInstance.refresh();
  checkRenderImg();
}

export function createPopUp(message, loaderElem, input) {
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
      loaderElem.classList.remove('is-visible');
      input.addEventListener(
        'input',
        () => {
          iziToast.hide(
            {
              transitionOut: 'fadeOutRight',
            },
            toast
          );
        },
        { once: true }
      );
    },
  });
}

export function checkRenderImg() {
  const galleryImg = document.querySelectorAll('.gallery-img');
  galleryImg.forEach(item =>
    item.addEventListener('load', () => {
      item.nextSibling.classList.add('img-loader-hidden');
    })
  );
}

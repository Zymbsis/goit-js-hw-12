import axios from 'axios';

export const searchImgParams = {
  key: '42207525-2f984868f7881b9b68563ca8c',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  q: '',
  page: 1,
  per_page: 15,
};

export async function pixabayRequest() {
  const pixabayRequestResult = await axios.get('https://pixabay.com/api/', {
    params: searchImgParams,
  });
  return pixabayRequestResult.data;
}

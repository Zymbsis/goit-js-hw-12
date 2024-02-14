import axios from 'axios';

async function pixabayRequest(url, searchParams) {
  const pixabayRequestResult = await axios.get(url, {
    params: searchParams,
  });
  return pixabayRequestResult.data;
}
export default pixabayRequest;

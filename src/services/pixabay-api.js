import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY_API = '23134758-68ab0efee1477745fc8aff6a6';

const getPicturesPixabayApi = async (value, pageNumber) => {
  const data = await axios.get(
    `/?q=${value}&page=${pageNumber}&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data.data;
};

export default getPicturesPixabayApi;

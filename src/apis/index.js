// eslint-disable-next-line import/no-extraneous-dependencies
import { fetch } from 'whatwg-fetch';

const uploadApiFunc = (file, fileName) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('fileName', fileName);
  fetch('/api/upload', {
    method: 'POST',
    body: formData
  }).then((response = {}) => {
    console.log(response);
  }).catch(() => {
    throw new Error();
  });
};

export default uploadApiFunc;

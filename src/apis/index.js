// eslint-disable-next-line import/no-extraneous-dependencies
import { fetch } from 'whatwg-fetch';

const uploadApiFunc = (file, fileName) => new Promise((resolve) => {
  const formData = new FormData();
  formData.append('file', file, fileName);
  formData.append('name', fileName);
  fetch('/api/upload', {
    method: 'POST',
    body: formData
  }).then((response = {}) => {
    resolve(response.json());
  }).catch(() => {
    resolve({ filename: fileName, status: 'failed' });
  });
});

const apiTestFunc = () => {
  fetch('/api/test', {
    method: 'GET'
  }).then((response = {}) => {
    console.log(response);
  }).catch(() => {
    throw new Error();
  });
};

export {
  apiTestFunc,
  uploadApiFunc
};

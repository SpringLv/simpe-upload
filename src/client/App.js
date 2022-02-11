/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import API from '../apis/index';
import FirstWorker from './workers/first.worker';
import SecondWorker from './workers/second.worker';

const firstWorker = new FirstWorker('first');
const secondWorker = new SecondWorker('second');
const App = () => {
  const [inputFiles, setInputFiles] = useState([]);
  const firstFunc = () => {
    firstWorker.onmessage = function (event) {
      console.log('onmessage', event?.data?.msg);
    };
  };
  const secondFunc = () => {
    secondWorker.onmessage = function (event) {
      console.log('onmessage', event?.data?.msg);
    };
  };
  const firstMessage = () => {
    firstWorker.postMessage({ msg: '第一个线程---------1' });
  };
  const secondMessage = () => {
    secondWorker.postMessage({ msg: '第二个线程---------2' });
  };
  const haneleSelectFile = async (e) => {
    const files = [...e.target.files];
    // console.log(files);
    setInputFiles(files);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < files.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      await API(files[i], files[i]?.name);
    }
  };
  useEffect(() => {
    firstFunc();
    secondFunc();
  }, []);
  return (
    <div>
      <input
        accept="*.jpg,*.jpeg,*.png,image/jpg,image/jpeg,image/png"
        type="file"
        id="file"
        name="file"
        files={inputFiles}
        multiple
        onChange={haneleSelectFile}
      />
      <button
        onClick={firstMessage}
      >
        message1
      </button>
      <button
        onClick={secondMessage}
      >
        message2
      </button>
    </div>
  );
};

export default App;

/* eslint-disable react/button-has-type */
import React, { useCallback, useEffect, useState } from 'react';
import './index.css';
import Worker from '../../workers/first.worker';

const uploadWorker = new Worker('upload');
// eslint-disable-next-line react/prop-types
const MultipleUpload = ({ uploaded }) => {
  const [preUploadList, setPreUploadList] = useState([]);
  //   const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  // 监听worker
  const ListeningWorker = () => {
    uploadWorker.onmessage = function (event) {
      const list = event?.data;
      //   setFileList(list);
      setLoading(false);
      uploaded(list);
      console.log(list);
    };
  };
  // 发消息到worker
  const sendMessageToWorker = (files) => {
    uploadWorker.postMessage({ list: files });
  };
  // 选文件
  const haneleSelectFile = (files) => {
    // setFileList([]);
    setLoading(true);
    sendMessageToWorker(files);
  };
  // 选好文件后回调
  const handleUploadChange = (e) => {
    const files = [...e.target.files];
    setPreUploadList(files);
  };
  // 执行上传
  const handleUpload = useCallback(() => {
    if (!preUploadList.length) return;
    haneleSelectFile(preUploadList);
  }, [preUploadList]);
  // 初始化
  useEffect(() => {
    ListeningWorker();
    return () => {
      // 退出关闭worker
      uploadWorker.terminate();
    };
  }, []);
  return (
    <div className="main">
      {
        loading && (
          <div className="loading">
            <div className="loading_text">上传中.....</div>
          </div>
        )
      }
      {
        !!preUploadList.length && (
          <p>
            已选择
            {preUploadList.length}
            个图片
          </p>
        )
      }
      <div className="upload_div">
        <p>点击或拖拽文件到区域内上传</p>
        <input
          className="upload_input"
          accept="*.jpg,*.jpeg,*.png,image/jpg,image/jpeg,image/png"
          type="file"
          id="file"
          name="file"
          multiple
          onChange={handleUploadChange}
        />
      </div>
      {/* <div>
        {
          fileList.map(item => <p key={item.filename}>{item.filename}</p>)
        }
      </div> */}
      <button
        style={{
          marginTop: 30, width: 300, background: '#fff', border: '1px solid #f0f0f0'
        }}
        disabled={loading}
        onClick={handleUpload}
      >
        上传
      </button>
    </div>
  );
};

export default MultipleUpload;

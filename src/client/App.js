/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import MultipleUpload from './components/MultipleUpload';
import TableVirtualized from './components/TableVirtualized';
import './app.css';

const App = () => {
  const [list, setList] = useState([]);
  const handleUplaodSuccess = (data) => {
    setList(data);
  };
  return (
    <div>
      <MultipleUpload uploaded={handleUplaodSuccess} />
      <TableVirtualized list={list} />
    </div>
  );
};

export default App;

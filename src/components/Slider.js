import React from 'react';
import { Collapse } from 'antd';
import UploadOne from './UploadOne';
import ImageUpload from './ImageUpload';

const items = [
  {
    key: '2',
    label: 'Upload Job Description',
    children: <UploadOne />,
  },
  {
    key: '1',
    label: 'Upload Candidate CVs',
    children: <ImageUpload />,
  },

];

const App = () => {
  const onChange = (key) => {
    console.log(key);
  };

  return (
    <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} size='large' style={{ width: '800px' }} />
  );
};

export default App;

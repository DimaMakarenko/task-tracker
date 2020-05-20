import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
// component
import RNFetchBlob from 'rn-fetch-blob';
import { customToast } from '../Toast';

interface IDownloadFile {
  url: string;
}

const DownloadFile: React.FC<IDownloadFile> = ({ url }) => {
  const downloadFile = async () => {
    console.log('url', url);
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch('GET', 'http://google.com/')
      .then(() => customToast('File saved!'))
      .catch(() => customToast('File not saved!'));
  };

  return (
    <TouchableOpacity onPress={downloadFile}>
      <Text>download</Text>
    </TouchableOpacity>
  );
};

export default DownloadFile;

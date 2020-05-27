import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
// component
import RNFetchBlob from 'rn-fetch-blob';
import { customToast } from '../Toast';
// styles
import { basicStyles } from '../../theme/basicStyles';

interface IDownloadFile {
  url: string;
  name: string;
  title: string;
}

const DownloadFile: React.FC<IDownloadFile> = ({ url, name, title }) => {
  const downloadFile = async () => {
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch('GET', url)
      .then(() => customToast('File saved!'))
      .catch(() => customToast('File not saved!'));
  };

  return (
    <TouchableOpacity onPress={downloadFile} style={styles.block}>
      <Text style={basicStyles.subTitle}>{title}</Text>
      <Text style={[basicStyles.text, styles.nameUnderline]}>{name}</Text>
    </TouchableOpacity>
  );
};

export default DownloadFile;

const styles = StyleSheet.create({
  block: { marginBottom: 30 },
  nameUnderline: {
    textDecorationLine: 'underline',
  },
});

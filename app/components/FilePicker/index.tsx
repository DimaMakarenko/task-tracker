import React from 'react';
import { TouchableOpacity } from 'react-native';
// components
import FilePickerManager from 'react-native-file-picker';
import TextField from '../Form/Text/TextField';
// types
import { TFile } from '../../store/type';

interface IFilePicker {
  value?: TFile | null;
  setFieldValue: Function;
}

const FilePicker: React.FC<IFilePicker> = ({ value, setFieldValue }) => {
  const loadFile = () => {
    FilePickerManager.showFilePicker(null, (response) => {
      if (response.didCancel) {
        console.log('User cancelled file picker');
      } else if (response.error) {
        console.log('FilePickerManager Error: ', response.error);
      } else {
        setFieldValue('file', response);
      }
    });
  };
  const removeFile = () => setFieldValue('file', null);

  return (
    <TouchableOpacity onPress={!value ? loadFile : undefined} activeOpacity={!value ? 0.7 : 1}>
      <TextField
        label={value ? 'Added file' : 'Add file'}
        disable
        value={value ? value.fileName : ''}
        iconName={value ? 'close-circle' : 'paperclip'}
        submit={value ? removeFile : undefined}
      />
    </TouchableOpacity>
  );
};

export default FilePicker;

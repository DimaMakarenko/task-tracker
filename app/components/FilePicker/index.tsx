import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
// components
import FilePickerManager from 'react-native-file-picker';
import FilePickerFile from 'react-native-file-picker';
import TextField from '../Form/Text/TextField';

interface IFilePicker {}

const FilePicker: React.FC<IFilePicker> = () => {
  const [file, setFile] = useState<FilePickerFile | null>(null);

  const a = () => {
    FilePickerManager.showFilePicker(null, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled file picker');
      } else if (response.error) {
        console.log('FilePickerManager Error: ', response.error);
      } else {
        setFile(response);
      }
    });
  };
  const removeFile = () => setFile(null);

  console.log(file);
  return (
    <TouchableOpacity onPress={!file ? a : undefined} activeOpacity={!file ? 0.7 : 1}>
      <TextField
        label={file ? 'Added file' : 'Add file'}
        disable
        value={file ? file.fileName : ''}
        iconName={file ? 'close-circle' : 'paperclip'}
        submit={file ? removeFile : undefined}
      />
    </TouchableOpacity>
  );
};

export default FilePicker;

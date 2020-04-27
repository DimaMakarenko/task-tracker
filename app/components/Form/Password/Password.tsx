import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
// images
import { eyeImg, eyeOffImg } from '../../../assets';
import SvgUri from 'react-native-svg-uri';

interface IPasswordField {
  fieldName: string;
  onChangeText: Function;
  onBlur: Function;
  value: string;
  error?: string;
  touched?: boolean;
}

const PasswordField: React.FC<IPasswordField> = ({ fieldName, onChangeText, onBlur, value, error, touched }) => {
  const [isHide, setIsHide] = useState(true);

  return (
    <>
      <View style={styles.container}>
        <TextInput
          onChangeText={(text) => onChangeText(text)}
          value={value}
          onBlur={(text) => onBlur(text)}
          style={styles.input}
          placeholder={fieldName}
          secureTextEntry={isHide}
          textContentType='password'
        />
        <TouchableOpacity onPress={() => setIsHide(!isHide)}>
          <SvgUri source={isHide ? eyeOffImg : eyeImg} />
        </TouchableOpacity>
      </View>
      <Text style={styles.error}>{touched && error}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#rgba(0,0,0,0.16)',
    borderRadius: 5,
    marginVertical: 8,
  },
  input: { flex: 1, fontSize: 18 },
  error: {
    color: 'red',
  },
});

export default PasswordField;

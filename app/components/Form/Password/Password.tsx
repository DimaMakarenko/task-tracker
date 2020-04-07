import React, { useState } from 'react';
import { Image, View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';

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

  const eyeOutline = require('../../../assets/eye-outline.png');
  const eyeOffOutline = require('../../../assets/eye-off-outline.png');

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
          <Image source={isHide ? eyeOffOutline : eyeOutline} style={styles.image} />
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
  image: { height: 14, width: 20, opacity: 0.5 },
  input: { flex: 1, fontSize: 18 },
  error: {
    color: 'red',
  },
});

export default PasswordField;

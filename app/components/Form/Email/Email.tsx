import React from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';

interface IEmailField {
  onChangeText: Function;
  onBlur: Function;
  value: string;
  error?: string;
  touched?: boolean;
}

const EmailField: React.FC<IEmailField> = ({
  onChangeText,
  onBlur,
  value,
  error,
  touched,
}) => {
  return (
    <>
      <View style={styles.container}>
        <TextInput
          onChangeText={(text) => onChangeText(text)}
          onBlur={(text) => onBlur(text)}
          value={value}
          placeholder="Email"
          style={styles.input}
          autoCompleteType="email"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
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
  image: {height: 14, width: 20, opacity: 0.5},
  input: {flex: 1, fontSize: 18},
  error: {
    color: 'red',
  },
});

export default EmailField;

import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { Item, Label, Input, Icon, NativeBase } from 'native-base';

interface ITextField {
  onChangeText: Function;
  onBlur: Function;
  value?: string;
  label?: string;
  error?: string;
  touched?: boolean;
  editable?: boolean;
}

const TextField: React.FC<ITextField> = ({ label, onChangeText, onBlur, value, error, touched, editable }) => {
  return (
    <>
      <Item floatingLabel style={styles.wrapper} error={!!error}>
        <Label style={styles.label}>{label}</Label>
        <Input
          style={styles.input}
          onChangeText={(text) => onChangeText(text)}
          onBlur={(text) => onBlur(text)}
          value={value}
          placeholder={label}
          editable={!editable}
        />
      </Item>
      <Text style={styles.error}>{touched && error}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    paddingHorizontal: 5,
    fontSize: 14,
    marginBottom: 5,
  },
  wrapper: {
    paddingHorizontal: 5,
    marginLeft: 0,
    marginTop: 20,
    lineHeight: 18,
  },
  image: { height: 14, width: 20, opacity: 0.5 },
  input: { fontSize: 14, paddingLeft: 0 },
  error: {
    color: 'red',
  },
});

export default TextField;

/*
<>
      <View style={styles.container}>
        <TextInput
          onChangeText={(text) => onChangeText(text)}
          onBlur={(text) => onBlur(text)}
          value={value}
          placeholder={placeholder}
          style={styles.input}
        />
      </View>
      <Text style={styles.error}>{touched && error}</Text>
    </>
 */

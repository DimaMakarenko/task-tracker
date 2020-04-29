import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { Item, Label, Icon, NativeBase, Input } from 'native-base';

interface ITextField {
  onChangeText?: Function;
  onBlur?: Function;
  submit?: () => void;
  value?: string;
  label?: string;
  error?: string;
  touched?: boolean;
  editable?: boolean;
  iconName?: string;
}

const TextField: React.FC<ITextField> = ({
  label,
  iconName,
  onChangeText,
  onBlur,
  value,
  error,
  touched,
  editable,
  submit,
}) => {
  return (
    <View>
      <Item style={styles.field} floatingLabel>
        <Label style={styles.label}>{label}</Label>
        <Input
          style={styles.input}
          onChangeText={(text) => onChangeText && onChangeText(text)}
          onBlur={(text) => onBlur && onBlur(text)}
          value={value}
          placeholder={label}
          editable={!editable}
        />
        {iconName && (
          <TouchableOpacity onPress={submit}>
            <Icon type='MaterialCommunityIcons' name={iconName} style={styles.image} />
          </TouchableOpacity>
        )}
      </Item>
      <Text style={styles.error}>{touched && error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  field: { marginTop: 10 },
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
  image: { color: '#666' },
  input: {
    fontSize: 14,
  },
  error: {
    color: 'red',
  },
});

export default TextField;

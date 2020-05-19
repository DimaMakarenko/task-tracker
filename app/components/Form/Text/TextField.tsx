import React, { useMemo } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
// component
import { Icon } from 'native-base';
import { TextInput } from 'react-native-paper';

interface ITextField {
  onChangeText?: Function;
  onBlur?: Function;
  submit?: () => void;
  value?: string;
  label?: string;
  error?: string;
  touched?: boolean;
  disable?: boolean;
  iconName?: string;
  iconSize?: number;
}

const TextField: React.FC<ITextField> = ({
  label,
  iconName,
  onChangeText,
  onBlur,
  value,
  error,
  touched,
  disable,
  submit,
  iconSize = 20,
}) => {
  const imageStyle = useMemo(
    () => ({
      imageStyle: {
        transform: [{ translateY: -iconSize }],
      },
    }),
    [iconSize],
  );
  return (
    <View style={styles.wrapper}>
      <TextInput
        label={label}
        style={styles.input}
        onChangeText={(text) => onChangeText && onChangeText(text)}
        onBlur={(text: any) => onBlur && onBlur(text)}
        value={value}
        theme={{
          colors: {
            primary: 'rgba(0,0,0, 0.55)',
          },
        }}
        editable={!disable}
        mode='outlined'
      />
      {iconName && (
        <TouchableOpacity onPress={submit} style={styles.imageWrapper}>
          <Icon type='MaterialCommunityIcons' name={iconName} style={[styles.image, imageStyle.imageStyle]} />
        </TouchableOpacity>
      )}
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
    position: 'relative',
  },
  imageWrapper: { position: 'absolute', right: 10, top: '50%', zIndex: 5, padding: 3 },
  image: { color: '#666' },
  input: {
    flex: 1,
    fontSize: 14,
  },
  error: {
    color: 'red',
  },
});

export default TextField;

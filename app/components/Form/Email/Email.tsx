import React, {useState} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

const EmailField = () => {
  const [email, setEmail] = useState('');
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Email"
        style={styles.input}
        autoCompleteType="email"
        keyboardType="email-address"
        textContentType="emailAddress"
      />
    </View>
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
});

export default EmailField;

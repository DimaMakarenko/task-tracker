import React, {useState} from 'react';
import {
  Image,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

interface IPasswordField {
  fieldName: string;
}

const PasswordField: React.FC<IPasswordField> = ({fieldName}) => {
  const [password, setPassword] = useState('');
  const [isHide, setIsHide] = useState(false);

  const eyeOutline = require('../../../assets/eye-outline.png');
  const eyeOffOutline = require('../../../assets/eye-off-outline.png');

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(text) => setPassword(text)}
        value={password}
        style={styles.input}
        placeholder={fieldName}
        secureTextEntry={isHide}
        textContentType="password"
      />
      <TouchableOpacity onPress={() => setIsHide(!isHide)}>
        <Image
          source={isHide ? eyeOffOutline : eyeOutline}
          style={styles.image}
        />
      </TouchableOpacity>
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

export default PasswordField;

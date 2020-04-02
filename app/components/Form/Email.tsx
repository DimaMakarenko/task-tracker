import React from 'react';
import {View, Text} from 'react-native';
// style
import {Item, Input, Label} from 'native-base';

const EmailField = () => {
  return (
    <Item inlineLabel>
      <Label>Email</Label>
      <Input />
    </Item>
  );
};

export default EmailField;

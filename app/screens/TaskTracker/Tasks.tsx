import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import firebase from 'firebase';

const Tasks = () => {
  handlePress = () => {
    firebase.auth.signOut();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tasks</Text>
      <Button title='Sing out' onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 26,
  },
});

export default Tasks;

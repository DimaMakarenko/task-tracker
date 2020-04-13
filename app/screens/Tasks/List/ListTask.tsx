import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firebase from 'firebase';
// component
import Title from '../../../components/Title/Title';
// styles
import { basicStyles } from '../../../theme/basicStyles';

const ListTask = () => {
  const handlePress = () => {
    firebase.auth().signOut();
  };
  return (
    <View style={basicStyles.container}>
      <View style={styles.header}>
        <Title text='ListTask' />
        <Text onPress={handlePress} style={styles.logOut}>
          Log out
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logOut: { color: 'rgba(218, 11, 11,0.6)' },
  text: {
    fontSize: 26,
  },
});

export default ListTask;

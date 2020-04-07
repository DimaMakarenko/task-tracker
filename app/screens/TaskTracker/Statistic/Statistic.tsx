import React from 'react';
import { View, StyleSheet } from 'react-native';
import firebase from 'firebase';
// component
import Title from '../../../components/Title/Title';
// styles
import { basicStyles } from '../../../theme/basicStyles';

const Tasks = () => {
  handlePress = () => {
    firebase.auth().signOut();
  };
  return (
    <View style={basicStyles.container}>
      <View style={styles.header}>
        <Title text='Statistic' />
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

export default Tasks;

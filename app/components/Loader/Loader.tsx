import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
// colors
import { Colors } from '../../theme/colors';

interface ILoader {
  isLoading: boolean;
}

const Loader: React.FC<ILoader> = ({ isLoading, children }) => {
  return (
    <>
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size='large' color='#001245' />
        </View>
      ) : (
        children
      )}
    </>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loader: {
    backgroundColor: Colors.white,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

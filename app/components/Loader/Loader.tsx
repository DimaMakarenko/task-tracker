import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

interface ILoader {
  isLoading: boolean;
}

const Loader: React.FC<ILoader> = ({ isLoading, children }) => {
  return (
    <>
      {isLoading ? (
        <View style={styles.loader}>
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size='large' color='#0000ff' />
          </View>
        </View>
      ) : (
        children
      )}
    </>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  loader: {
    position: 'absolute',
    flex: 1,
    zIndex: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

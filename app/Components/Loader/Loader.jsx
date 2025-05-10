import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ActivityIndicator, useTheme } from 'react-native-paper';

const Loader = ({ isLoading }) => {
  const theme = useTheme();
  return (
    <>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    zIndex: 999,
  },
});

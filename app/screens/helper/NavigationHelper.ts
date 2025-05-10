import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SCREEN_NAME } from '../../Constant';
export type ScreenNameType = keyof typeof SCREEN_NAME;

interface NavigationParams {
  screen: ScreenNameType;
  data?: any; // Adjust this type according to your data structure
}

const useNavigationHelper = () => {
  const navigation = useNavigation();

  const push = ({ screen, data }: NavigationParams) => {
    navigation.navigate(screen, {
      data,
    });
  };
  const replace = ({ screen, data }: NavigationParams) => {
    navigation.replace(screen, {
      data,
    });
  };

  const back = () => {
    navigation.goBack();
  };

  return {
    push,
    replace,
    back,
  };
};

export default useNavigationHelper;

const styles = StyleSheet.create({});

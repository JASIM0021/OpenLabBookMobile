import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import React from 'react';
import {
  ActivityIndicator,
  Icon,
  MD3Colors,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import { darkTheme, lightTheme } from '../../themes';
import GolbalStyle from '../../Style';
import CustomText from '../Text';

const CustomButton = ({
  onPress,
  label,
  labelColor,
  rippleColor,
  isLoading,
  ...rest
}) => {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  return (
    <TouchableRipple
      style={[
        GolbalStyle.btnComon,
        { backgroundColor: theme.colors.primary, ...rest },
      ]}
      onPress={() => (onPress ? onPress() : {})}
      rippleColor={
        rippleColor
          ? rippleColor
          : colorScheme == 'dark'
          ? lightTheme.colors.primary
          : darkTheme.colors.primary
      }
    >
      <View style={[GolbalStyle.rowCenter]}>
        <CustomText
          text={label}
          size="md"
          color={labelColor || darkTheme.colors.text}
          spacing={2}
        />

        {isLoading && (
          <ActivityIndicator animating={true} color={theme.colors.background} />
        )}
      </View>
    </TouchableRipple>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});

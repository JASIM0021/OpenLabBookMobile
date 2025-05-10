import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { darkTheme, lightTheme } from '../../themes';

const CustomText = ({
  text,
  size,
  color,
  spacing,
  textAlign,
  underline,
  onPress,
  bold,
  ...rest
}: {
  text: string;
  size?: 'lg' | 'md' | 'sm';
  color?: string;
  spacing?: number;
  textAlign?: 'center' | 'left' | 'right' | 'auto' | 'justify';
  underline?: boolean;
  onPress?: () => {};
  bold?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
}) => {
  const theme = useTheme();
  const colorScheme = useColorScheme();

  return (
    <View style={{ flexDirection: 'column' }}>
      <Text
        style={{
          ...rest,
          textAlign: textAlign ? textAlign : 'auto',
          fontSize:
            size === 'md' ? 16 : size === 'lg' ? 24 : size === 'sm' ? 12 : 18,
          color:
            color ||
            (colorScheme !== 'dark'
              ? darkTheme.colors.background
              : lightTheme.colors.background),
          letterSpacing: spacing || 0,
          fontWeight: bold,
          fontFamily: 'Poppins',
        }}
        {...rest}
        // onPress={() => (onPress ? onPress() : {})}w
      >
        {text}
      </Text>
      {underline && (
        <View
          style={{
            height: 1,
            backgroundColor:
              color ||
              (colorScheme === 'dark'
                ? lightTheme.colors.background
                : darkTheme.colors.background),
            width: '100%',
            marginTop: 2,
          }}
        />
      )}
    </View>
  );
};

export default CustomText;

const styles = StyleSheet.create({});

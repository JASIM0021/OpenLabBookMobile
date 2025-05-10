import React from 'react';
import { Pressable, StyleProp, ViewStyle, PressableProps } from 'react-native';
import Config from '../Config';
import { ActivityIndicator, useTheme } from 'react-native-paper';

interface Props extends PressableProps {
  style?: StyleProp<ViewStyle>;
  touchOpacity?: number;
  isLoading?:boolean
}

const MyPressable: React.FC<Props> = ({
  style,
  android_ripple = { color: 'lightgrey' },
  touchOpacity = 0.4,
  isLoading=false,
  children,
  ...restOfProps
}) => {
  const theme = useTheme()
  return (
    <Pressable
      style={({ pressed }) => [
        style,
        { opacity: !Config.isAndroid && pressed ? touchOpacity : 1 },
      ]}
      android_ripple={android_ripple}
      {...restOfProps}
    >
      <>
      {children}
      {isLoading &&
                    <ActivityIndicator animating={true} color={theme.colors.primary} />

                  }
      </>
     
    </Pressable>
  );
};

export default MyPressable;

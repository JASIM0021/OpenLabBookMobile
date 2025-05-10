import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';

// Define the props interface
interface VstackProps {
  children: React.ReactNode;
  gap?: number;
  justifyContent?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  style?: StyleProp<ViewStyle>; // Allow additional styles to be passed in
}

const Vstack: React.FC<VstackProps> = ({
  children,
  gap = 0,
  justifyContent = 'flex-start',
  alignItems = 'flex-start',
  style,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          justifyContent,
          alignItems,
          // Since React Native doesn't support columnGap directly,
          // use margin to achieve spacing between items.
          rowGap: gap,
        },
        style,
      ]}
    >
      {/* {React.Children.map(children, child =>
        React.cloneElement(child as React.ReactElement<any>, {
          style: [
            (child as React.ReactElement<any>).props.style,
            {
              marginHorizontal: columnGap / 2,
            },
          ],
        }),

      )} */}
      {children}
    </View>
  );
};

// Define default props
Vstack.defaultProps = {
  columnGap: 0,
  rowGap: 0,
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
};

// Define styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column', // Ensure horizontal stacking
  },
});

export default Vstack;

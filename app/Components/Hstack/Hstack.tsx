import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';

// Define the props interface
interface HstackProps {
  rest: any;
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

const Hstack: React.FC<HstackProps> = ({
  children,
  gap = 0,
  justifyContent = 'flex-start',
  alignItems = 'flex-start',
  style,
  // ...rest
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
          columnGap: gap,
          // ...rest,
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
Hstack.defaultProps = {
  columnGap: 0,
  rowGap: 0,
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
};

// Define styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Ensure horizontal stacking
  },
});

export default Hstack;

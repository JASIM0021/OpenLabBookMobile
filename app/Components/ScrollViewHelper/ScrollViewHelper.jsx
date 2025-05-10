import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

const ScrollViewHelper = ({ children }) => {
  const theme = useTheme();
  return (
    <ScrollView
      contentContainerStyle={{
        ...styles.scroll,
        backgroundColor: theme.colors.background,
      }}
    >
      {children}
    </ScrollView>
  );
};

export default ScrollViewHelper;

const styles = StyleSheet.create({
  scroll: {
    // flex: 1,
    // paddingBottom:StatusBar.currentHeight * 2
  },
});

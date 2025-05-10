import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, Text, Button } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useNavigationHelper from '../helper/NavigationHelper';
import { useDispatch } from 'react-redux';
import { saveSelectedTest } from '../../features/slice/GlobalSlice';

const OrderSuccessScreen = () => {
  const theme = useTheme();
  const navigation = useNavigationHelper();

  const route = useRoute();

  const title = route.params?.data?.title
    ? route.params?.data?.title
    : 'Thank You';
  const subTitle = route.params?.data?.subTitle
    ? route.params?.data?.subTitle
    : 'Thank you for choosing our service. We will get back to you shortly';
  const dispatch = useDispatch();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      padding: 16,
    },
    icon: {
      marginBottom: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
      color: theme.colors.text,
    },
    message: {
      fontSize: 16,
      marginBottom: 32,
      textAlign: 'center',
      color: theme.colors.text,
    },
    buttonContainer: {
      width: '100%',
    },
    button: {
      marginBottom: 16,
      borderRadius: 8,
      paddingVertical: 12,
    },
    viewOrderButton: {
      backgroundColor: theme.colors.primary,
    },
    backToHomeButton: {
      backgroundColor: 'transparent',
      borderColor: theme.colors.primary,
      borderWidth: 2,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    viewOrderButtonText: {
      color: theme.colors.surface,
    },
    backToHomeButtonText: {
      color: theme.colors.primary,
    },
  });

  const handleViewOrder = () => {
    dispatch(saveSelectedTest({}));
    navigation.push({
      screen: 'HomeTab',
      data: { index: 1 },
    });
  };

  const handleBackToHome = () => {
    dispatch(saveSelectedTest({}));
    navigation.push({
      screen: 'HomeTab',
    });
  };

  return (
    <View style={styles.container}>
      <Icon
        name="check-circle"
        size={100}
        color={theme.colors.primary}
        style={styles.icon}
      />
      <Text style={styles.title}>🎉 {title} 🎉</Text>
      <Text style={styles.message}>{subTitle}</Text>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleViewOrder}
          style={[styles.button, styles.viewOrderButton]}
          labelStyle={[styles.buttonText, styles.viewOrderButtonText]}
        >
          View Order in Order History
        </Button>
        <Button
          mode="outlined"
          onPress={handleBackToHome}
          style={[styles.button, styles.backToHomeButton]}
          labelStyle={[styles.buttonText, styles.backToHomeButtonText]}
        >
          Back to Home
        </Button>
      </View>
    </View>
  );
};

export default OrderSuccessScreen;

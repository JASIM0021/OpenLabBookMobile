import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '../../Components/Text';
import GolbalStyle from '../../Style';
import { useTheme } from 'react-native-paper';
import { SCREEN_NAME } from '../../Constant';

const UploadSuccess = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Large checkmark icon */}
      <MaterialCommunityIcons
        name="check-circle"
        size={120}
        color={theme.colors.success}
        style={styles.checkmark}
      />

      {/* Success message */}
      <CustomText
        text="Your prescription is uploaded successfully. We will contact you shortly through your registered phone number."
        size="lg"
        textAlign="center"
        style={styles.successMessage}
      />

      {/* Detailed information */}
      <CustomText
        text="We will contact you within 8 hours. In some cases, it may take longer than 8 hours, but the maximum wait time is 24 hours."
        size="sm"
        textAlign="center"
        style={styles.detailsMessage}
      />

      {/* Back to Home button */}
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate(SCREEN_NAME.HomeTab)} // Adjust 'Home' with your home screen route name
      >
        <CustomText
          text="Back to Home"
          size="md"
          color="white"
          bold="bold"
          textAlign="center"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  checkmark: {
    marginBottom: 30,
  },
  successMessage: {
    marginVertical: 20,
    color: 'black',
  },
  detailsMessage: {
    marginVertical: 10,
    color: 'gray',
  },
  homeButton: {
    backgroundColor: '#6200ea', // Customize this color based on your theme
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 30,
  },
});

export default UploadSuccess;

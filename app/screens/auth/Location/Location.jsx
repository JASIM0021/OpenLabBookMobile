import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import * as Location from 'expo-location';
import { Divider, useTheme } from 'react-native-paper';
import GolbalStyle from '../../../Style';
import ImageConstant from '../../../Constant/ImageConstant';
import Header from '../../../Components/header/Header';
import CustomText from '../../../Components/Text';
import CustomNextButton from '../../../Components/Button/CustomButton';
import { responsiveHeight, responsiveWidth } from '../../../themes';
import useNavigationHelper from '../../helper/NavigationHelper';
import { SCREEN_NAME } from '../../../Constant';
import { useNavigation } from '@react-navigation/native';

const LocationScreen = () => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor: theme.colors.background,
      padding: 10,
      justifyContent: 'space-between',
    },
  });

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // const navigation = useNavigationHelper();

  const navigaton = useNavigation();

  const handleLocationPermission = async () => {
    // };
    navigaton.navigate('HomeTab');
    // Request location permission
    const { status } = await Location.requestForegroundPermissionsAsync();
    // if (status !== 'granted') {
    //   setErrorMsg('Permission to access location was denied');
    //   Alert.alert(
    //     'Permission Denied',
    //     'Enable location permission to continue.',
    //   );
    //   return; // Exit the function if permission is denied
    // }

    // try {
    //   // Get the current location
    //   const currentLocation = await Location.getCurrentPositionAsync({});
    //   setLocation(currentLocation);
    //   console.log('currentLocation', currentLocation);

    //   // Redirect to HomeTab after successfully retrieving location
    //   navigaton.navigate('HomeTab');
    // } catch (error) {
    //   console.error('Error getting location:', error);
    //   Alert.alert('Error', 'Unable to retrieve location. Please try again.');
    // }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header isBack={true} title="Verify OTP" />
      <Divider />
      <View style={styles.container}>
        <View
          style={[
            GolbalStyle.column,
            { justifyContent: 'center', alignItems: 'center' },
          ]}
        >
          <Image
            style={{
              height: responsiveHeight * 3,
              width: responsiveWidth * 6,
            }}
            source={ImageConstant.location_request}
            resizeMode="contain"
          />

          <CustomText
            text="Location permission not enabled"
            bold="bold"
            size="md"
            textAlign="center"
          />
          <CustomText
            text="Give us permission to share your location so we can enhance your booking."
            bold="bold"
            size="sm"
            textAlign="center"
          />
        </View>

        <View style={[GolbalStyle.column_center, { paddingBottom: 20 }]}>
          <CustomNextButton
            title="Allow Permission"
            onPress={handleLocationPermission}
          />
        </View>
      </View>
    </View>
  );
};

export default LocationScreen;

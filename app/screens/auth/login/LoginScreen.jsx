// RegisterScreen.tsx
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  Linking,
} from 'react-native';
import {
  Button,
  Snackbar,
  useTheme,
  Icon,
  IconButton,
  MD3Colors,
  Divider,
  HelperText,
  Checkbox,
} from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  googleRegister,
  loginUserRequest,
  registrationError,
} from '../../../features/saga/auth/authAction';
import validations from '../../../validations';
import CustomText from '../../../Components/Text';
import GolbalStyle from '../../../Style';
import appContent from '../../../Constant/appContent';
import GlobalSlice, { startLoading } from '../../../features/slice/GlobalSlice';
import CustomTextInput from '../../../Components/Input/CustomTextInput';
import CustomButton from '../../../Components/CustomButton/CustomButton';
import FirebaseError from '../../../features/firebase/firebaseError';
import {
  responsiveHeight,
  responsiveWidth,
  screenWidth,
} from '../../../themes';
import { SCREEN_NAME } from '../../../Constant';
import { useLoginUserMutation } from '../../../features/api/user/userApiSlice';
import { ShowAlertMsg } from '../../../helper/ShowAlert';
import AsyncStorage from '../../../helper/AsyncStorage';
import MyPressable from '../../../Components/MyPressable';
import useNavigationHelper from '../../helper/NavigationHelper';
import Header from '../../../Components/header/Header';
import ImageConstant from '../../../Constant/ImageConstant';
import CustomNextButton from '../../../Components/Button/CustomButton';
import { useLoginMutation } from '../../../features/api/auth/authSlice';
import { validatePhone } from '../../../helper/validationHelper';
import Hstack from '../../../Components/Hstack/Hstack';
// import { CountryPicker } from 'react-native-country-codes-picker';

const LoginScreen = () => {
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const [checkTerm, setChekTerm] = useState(true);
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor: theme.colors.background,
      padding: 10,
      justifyContent: 'space-between',
    },
    button: {
      marginTop: 20,
    },
    Checkbox: {
      // height:30,
      // width:30,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const dispatch = useDispatch();
  const navigation = useNavigationHelper();
  const [snackBarVisible, setSnackBarVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [phone, setPhone] = useState('');
  const [loginUser, { data: loginData, error: loginerror, isLoading }] =
    useLoginMutation();

  const handleLogin = async () => {
    console.log('phone', phone);
    // const validationErrors = validatePhone(phone);
    // console.log('validationErrors', validationErrors);
    if (phone.length != 10) {
      ShowAlertMsg.showError('Please enter a valid Phone number');
      // return;
    }
    // navigation.push({
    //   screen: SCREEN_NAME.ReCaptcha,
    //   data: {
    //     phone: data?.data?.contactNumber,
    //     otp: data?.data?.otp,
    //   },
    // });

    await loginUser({ contactNumber: phone })
      .unwrap()
      .then(data => {
        if (data.success) {
          navigation.push({
            screen: SCREEN_NAME.OTPScreen,
            data: {
              phone: data?.data?.contactNumber,
              // otp: data?.data?.otp,
              otp: '    ',
            },
          });
        }
        console.log('Login success', data);
      })
      .catch(error => {
        console.error('Login error', error);
        ShowAlertMsg.showError(data?.message);
        console.error('Login error', error);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <Header isBack={false} />
      <Divider />
      <View style={styles.container}>
        <View>
          <View style={GolbalStyle.mtLG}>
            <CustomText text="Enter Phone Number" bold="bold" size="md" />
            <CustomText
              text="Enter your phone number to proceed"
              size="md"
              color="gray"
            />
          </View>

          <View style={[{ ...GolbalStyle.mtLG }, GolbalStyle.column]}>
            <CustomText text="Enter your phone number " size="sm" />

            <View
              style={{
                ...GolbalStyle.roundedInput,
                height: responsiveHeight / 1.8,
                width: responsiveWidth * 9,
                backgroundColor: theme.colors.surface,
                paddingHorizontal: 10,
                alignItems: 'center',
                flexDirection: 'row',
                columnGap: 20,
              }}
            >
              <TouchableOpacity onPress={() => setShow(true)}>
                <Image source={ImageConstant.india} />
              </TouchableOpacity>

              <TextInput
                onChangeText={setPhone}
                placeholder="767******0"
                style={{ flex: 1 }}
                keyboardType="number-pad"
              />
            </View>

            {/* Check term section */}
            <View style={[GolbalStyle.row, { padding: 10 }]}>
              <View style={styles.Checkbox}>
                <Checkbox
                  color={theme.colors.primary}
                  status={checkTerm ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChekTerm(!checkTerm);
                  }}
                />
              </View>
              <Text style={{ color: theme.colors.text }}>
                By continuing, your agree to our{' '}
                <Text style={{ fontWeight: 'bold', color: theme.colors.text }}>
                  Terms & Conditions
                </Text>{' '}
                and{' '}
                <Text style={{ fontWeight: 'bold', color: theme.colors.text }}>
                  Privacy Policy
                </Text>
              </Text>
            </View>
          </View>

          {/* <View
            style={[
              GolbalStyle.mtLG,
              GolbalStyle.row,
              { justifyContent: 'space-between' },
            ]}
          >
            <Divider style={{ width: '30%' }} bold={true} />
            <Text>Or Sign up With</Text>
            <Divider style={{ width: '30%' }} bold={true} />
          </View> */}

          {/* <View
            style={[
              GolbalStyle.row,
              GolbalStyle.mtLG,
              { justifyContent: 'center' },
            ]}
          >
            <TouchableOpacity onPress={() => {}}>
              <Image source={ImageConstant.socialIcon} />
            </TouchableOpacity>
          </View> */}
        </View>

        <View style={[GolbalStyle.column_center, { paddingBottom: 20 }]}>
          <MadeByLogo />

          <CustomNextButton
            isLoading={isLoading}
            onPress={() => {
              handleLogin();
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const MadeByLogo = () => {
  return (
    <>
      <View style={[GolbalStyle.column_center]}>
        <Hstack>
          <CustomText text="From 🇮🇳 with ❤️ and Creativity." />
        </Hstack>

        <Text style={{}}>
          Developed by{' '}
          <Text
            style={{ color: 'green', fontWeight: 'bold', fontSize: 8 }}
            onPress={() => Linking.openURL(process?.env?.MASTER_AI)}
          >
            MasterAI
          </Text>{' '}
        </Text>
      </View>
    </>
  );
};

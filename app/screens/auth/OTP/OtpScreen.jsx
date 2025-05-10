import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Divider, useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import GolbalStyle from '../../../Style';
import Header from '../../../Components/header/Header';
import CustomText from '../../../Components/Text';
import CustomNextButton from '../../../Components/Button/CustomButton';
import {
  responsiveHeight,
  responsiveWidth,
  screenWidth,
} from '../../../themes';
import useNavigationHelper from '../../helper/NavigationHelper';
import ImageConstant from '../../../Constant/ImageConstant';
import {
  useLoginMutation,
  useVerifyOTpMutation,
} from '../../../features/api/auth/authSlice';
import { useRoute } from '@react-navigation/native';
import { ShowAlertMsg } from '../../../helper/ShowAlert';
import { SCREEN_NAME } from '../../../Constant';
import AsyncStorage from '../../../helper/AsyncStorage';

const OTPScreen = () => {
  const [verifyOTP, { data, isLoading, isError, error }] =
    useVerifyOTpMutation();

  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor: theme.colors.background,
      padding: 10,
      justifyContent: 'space-between',
    },
    otpInputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: responsiveHeight * 0.02,
    },
    otpInput: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      height: responsiveHeight / 1.4,
      width: screenWidth * 0.15,
      textAlign: 'center',
      fontSize: 18,
      color: theme.colors.text,
    },
  });

  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const params = useRoute()?.params;
  const arr = Array.from(params?.data?.otp);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30); // Set timer for resend
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigationHelper();
  const [loginUser, { data: loginData, error: loginerror }] =
    useLoginMutation();
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otpRefs.length - 1) {
      otpRefs[index + 1].current.focus();
    }

    if (newOtp.join('').length === 4) {
      console.log('OTP entered:', newOtp.join(''));
    }
  };

  const handleBackspace = (index, value) => {
    if (value === '' && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };

  const resendOtp = async () => {
    // Call the resend OTP function
    await loginUser({ contactNumber: params?.data?.phone })
      .unwrap()
      .then(data => {
        if (data.success) {
          let arr = data?.data?.otp;

          // setOtp(Array.from(arr));
        }
      });
    console.log('OTP Resent');
    setIsResendDisabled(true);
    setTimer(30); // Reset timer
  };

  const handleVerify = async () => {
    if (otp.length > 4) {
      ShowAlertMsg.showError('Otp is missing');
    } else {
      console.log('otp.join()', otp.join(''), params?.data?.phone);
      await verifyOTP({
        otp: otp.join(''),
        contactNumber: params?.data?.phone,
      })
        .unwrap()
        .then(data => {
          console.log('data', data);
          if (data?.success) {
            AsyncStorage.setToken(data?.data?.accessToken);
            AsyncStorage.setUser(data?.data?.user);

            navigation.push({
              screen: SCREEN_NAME.Location,
              data: {},
            });
          } else {
            ShowAlertMsg.showError(data?.data?.message);
          }
        })
        .catch(err => {
          ShowAlertMsg.showError('Invalid OTP!');
          console.log('err', err);
        });
    }
  };

  useEffect(() => {
    let interval;
    if (isResendDisabled) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev === 1) {
            setIsResendDisabled(false);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isResendDisabled]);

  return (
    <View style={{ flex: 1 }}>
      <Header isBack={true} title="Verify OTP" />
      <Divider />
      <View style={styles.container}>
        <View style={GolbalStyle.column}>
          <View style={GolbalStyle.mtLG}>
            <CustomText text="Enter OTP" bold="bold" size="md" />
            <CustomText text="Enter the OTP sent to you on" size="md" />
          </View>

          <View style={[GolbalStyle.row]}>
            <CustomText
              text={`+91 ${params?.data?.phone}`}
              bold="bold"
              size="sm"
            />
            <CustomText
              text="Change"
              bold="bold"
              size="sm"
              underline
              onPress={() => navigation.back()}
            />
          </View>

          <View style={styles.otpInputContainer}>
            {otp.map((value, index) => (
              <TextInput
                key={index}
                ref={otpRefs[index]}
                style={styles.otpInput}
                value={value}
                maxLength={1}
                keyboardType="numeric"
                onChangeText={text => handleOtpChange(index, text)}
                onKeyPress={({ nativeEvent }) =>
                  nativeEvent.key === 'Backspace' &&
                  handleBackspace(index, value)
                }
              />
            ))}
          </View>

          <View
            style={[
              GolbalStyle.mtLG,
              GolbalStyle.row,
              { justifyContent: 'center' },
            ]}
          >
            <TouchableOpacity disabled={isResendDisabled} onPress={resendOtp}>
              <Image
                source={ImageConstant.resend}
                style={{
                  opacity: isResendDisabled ? 0.5 : 1, // Show a lighter button when disabled
                }}
              />
            </TouchableOpacity>
            <CustomText
              text={isResendDisabled ? `Resend in ${timer}s` : 'Resend OTP'}
              bold="bold"
              size="sm"
              color={theme.colors.primary}
            />
          </View>
        </View>

        <View style={[GolbalStyle.column_center, { paddingBottom: 20 }]}>
          <CustomText
            textAlign="center"
            text={`By tapping on “send Via WhatsApp” ,you agree to receive important communications such as OTP and payment details, over Whatsapp `}
            size="sm"
            color={theme.colors.primary}
          />
          <CustomNextButton
            isLoading={isLoading}
            onPress={() => {
              handleVerify();
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default OTPScreen;

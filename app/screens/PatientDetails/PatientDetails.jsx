import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import {
  useTheme,
  TextInput,
  Button,
  RadioButton,
  HelperText,
  Portal,
  Modal,
  Card,
} from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dropdown } from 'react-native-element-dropdown';

import Header from '../../Components/header/Header';
import CustomText from '../../Components/Text';
import { responsiveHeight, responsiveWidth } from '../../themes';
import useNavigationHelper from '../helper/NavigationHelper';
import { useDispatch, useSelector } from 'react-redux';
import { savePatientDetails } from '../../features/slice/GlobalSlice';
import { useCreateDirectAppointmentMutation } from '../../features/api/appontment/appointment.api';
import Loader from '../../Components/Loader/Loader';
import { SCREEN_NAME } from '../../Constant';

const PatientDetails = () => {
  const theme = useTheme();
  const navigation = useNavigationHelper();

  const { selectedService } = useSelector(state => state.globalReducer);

  console.log('selectedService', selectedService);
  const route = useRoute();
  const serviceName = route?.params?.data?.serviceName || null;

  console.log('serviceName', serviceName);
  const fromCartScreen = route?.params?.data?.isCart || false;
  const isDirectBooking = serviceName?.includes('patient_details') || false;
  const isHomeCare =
    selectedService?.serviceName?.includes('Home Care') || false;
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [referby, setReferby] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [service, setService] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [address, setAddress] = useState('');
  const [prescription, setPrescription] = useState(null);
  const [errors, setErrors] = useState({});
  const [showImagePickerModal, setShowImagePickerModal] = useState(false);
  const [
    createDirectAppiontment,
    {
      data: dData,
      isLoading: dIsLoading,
      isError: dIserror,
      isSuccess: dIsSuccess,
      error: derror,
    },
  ] = useCreateDirectAppointmentMutation();
  const dispatch = useDispatch();

  const handleUploadPrescription = () => {
    setShowImagePickerModal(true);
  };

  const handleCameraUpload = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission needed',
          'Camera permission is required to take photos',
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setPrescription(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo');
    }
    setShowImagePickerModal(false);
  };

  const handleGalleryUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setPrescription(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image from gallery');
    }
    setShowImagePickerModal(false);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: 16,
    },
    input: {
      marginBottom: 8,
      backgroundColor: theme.colors.surface,
      borderRadius: 10,
    },
    sexContainer: {
      flexDirection: 'row',
      marginBottom: 16,
      justifyContent: 'space-between',
    },
    sexButton: {
      flex: 1,
      marginRight: 8,
    },
    serviceTypeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    serviceContainer: {
      marginBottom: 8,
    },
    serviceButton: {
      marginBottom: 8,
    },
    uploadContainer: {
      borderWidth: 2,
      borderColor: theme.colors.primary,
      borderStyle: 'dashed',
      borderRadius: 15,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
      height: 200,
      backgroundColor: 'rgba(0,0,0,0.02)',
    },
    uploadText: {
      color: theme.colors.primary,
      marginTop: 10,
      fontWeight: 'bold',
    },
    prescriptionImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
      borderRadius: 10,
    },
    uploadIconContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 10,
    },
    continueButton: {
      marginTop: 16,
      borderRadius: 10,
      paddingVertical: 5,
    },
    modalContainer: {
      backgroundColor: 'white',
      padding: 20,
      margin: 20,
      borderRadius: 15,
    },
    modalButton: {
      marginVertical: 5,
      borderRadius: 10,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    errorText: {
      color: theme.colors.error,
      marginBottom: 8,
    },
  });

  // const handleUploadPrescription = async () => {
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     setPrescription(result.assets[0].uri);
  //   }
  // };

  const validateForm = () => {
    let newErrors = {};

    if (!fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!mobileNumber.trim())
      newErrors.mobileNumber = 'Mobile Number is required';
    else if (!/^\d{10}$/.test(mobileNumber))
      newErrors.mobileNumber = 'Invalid Mobile Number';
    // if (!email.trim()) newErrors.email = 'Email  is required';
    if (email != '') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        newErrors.email = 'Invalid Email Address';
    } else if (!/^\d{10}$/.test(mobileNumber))
      newErrors.mobileNumber = 'Invalid Mobile Number';
    if (!age.trim()) newErrors.age = 'Age is required';
    else if (isNaN(age) || parseInt(age) <= 0) newErrors.age = 'Invalid Age';

    if (!isDirectBooking) {
      if (!sex) newErrors.sex = 'Sex is required';
    }
    // if (!service) newErrors.service = 'Service is required';

    if (isDirectBooking) {
      //
      if (!prescription) newErrors.prescription = 'Prescription is required';
    }

    if (isHomeCare) {
      if (!address.trim()) newErrors.address = 'Address is required';
      if (!pinCode.trim()) newErrors.pinCode = 'Pin Code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      // Handle form submission

      const patientDetails = {
        name: fullName,
        email: email,
        contactNumber: mobileNumber,
        age: Number(age),
        sex: sex,
        referBy: referby,
        pinCode: pinCode,
        address: address,
      };

      if (isDirectBooking) {
        let formData = new FormData();
        formData.append('file', {
          uri: prescription,
          name: 'prescription.png',
          type: 'image/png', // Adjust the type based on your file type
        });
        let data = {
          paymentStatus: 'PAID',
          paymentType: 'CASH',
          review: 'Excellent service.',
          patientInfo: { ...patientDetails },
        };

        formData.append('data', JSON.stringify(data));
        createDirectAppiontment(formData);
      } else if (fromCartScreen) {
        dispatch(savePatientDetails(patientDetails));
        navigation.push({
          screen: 'Payment',
          data: {
            isCart: true,
          },
        });
      } else {
        dispatch(savePatientDetails(patientDetails));
        navigation.push({
          screen: 'Payment',
          data: prescription,
        });
      }

      // Navigate to the next screen or process the booking
    }
  };

  useEffect(() => {
    if (dIsSuccess) {
      // Alert.alert('Success', 'Order placed successfully');
      navigation.push({
        screen: SCREEN_NAME.OrderSuccess,
        data: {
          title: 'Prescription uploaded successfully',
          subTitle:
            "Thank you for uploading your prescription. We're thrilled to have you as our customer.\n\nOur team will reach out to you for choosing your date and time using the details you provided.",
        },
      });
    }

    if (dIserror) {
      // handle error
      Alert.alert('Error', 'Server Error');
      console.log('error', derror);
    }
  }, [dIsLoading, dIsSuccess]);

  return (
    <View style={styles.container}>
      <Loader isLoading={dIsLoading} />
      <Header isBack={true} title="Patient Details" />
      <ScrollView contentContainerStyle={styles.content}>
        <TextInput
          label="Full Name"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
          mode="outlined"
          error={!!errors.fullName}
        />
        {errors.fullName && (
          <HelperText type="error">{errors.fullName}</HelperText>
        )}
        <TextInput
          label="Mobile Number"
          value={mobileNumber}
          onChangeText={setMobileNumber}
          style={styles.input}
          mode="outlined"
          keyboardType="phone-pad"
          error={!!errors.mobileNumber}
        />
        {errors.mobileNumber && (
          <HelperText type="error">{errors.mobileNumber}</HelperText>
        )}
        {isDirectBooking ? (
          <></>
        ) : (
          <>
            <TextInput
              label="Email (optional)"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              mode="outlined"
              error={!!errors.email}
            />
            {errors.email && (
              <HelperText type="error">{errors.email}</HelperText>
            )}
          </>
        )}

        <TextInput
          label="Reffer by (optional)"
          value={referby}
          onChangeText={setReferby}
          style={styles.input}
          mode="outlined"
          // error={!!errors.email}
        />
        {/* {errors.email && (
              <HelperText type="error">{errors.email}</HelperText>
            )} */}
        <TextInput
          label="Age"
          value={age}
          onChangeText={setAge}
          style={styles.input}
          mode="outlined"
          keyboardType="numeric"
          error={!!errors.age}
        />
        {errors.age && <HelperText type="error">{errors.age}</HelperText>}
        {/* 
        {isDirectBooking ? (
          <></>
        ) : ( */}
        {/* <> */}

        {isDirectBooking ? (
          <></>
        ) : (
          <>
            <View style={styles.sexContainer}>
              <Button
                mode={sex === 'MALE' ? 'contained' : 'outlined'}
                onPress={() => setSex('MALE')}
                style={styles.sexButton}
              >
                MALE
              </Button>
              <Button
                mode={sex === 'FEMALE' ? 'contained' : 'outlined'}
                onPress={() => setSex('FEMALE')}
                style={styles.sexButton}
              >
                FEMALE
              </Button>
              <Button
                mode={sex === 'OTHER' ? 'contained' : 'outlined'}
                onPress={() => setSex('OTHER')}
                style={styles.sexButton}
              >
                OTHER
              </Button>
            </View>
            {errors.sex && <HelperText type="error">{errors.sex}</HelperText>}
          </>
        )}

        {/* </> */}
        {/* // )} */}
        {/* <View style={styles.serviceContainer}>
          <Dropdown
            style={[
              styles.dropdown,
              errors.service && { borderColor: theme.colors.error },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={availableServices}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select a service"
            searchPlaceholder="Search..."
            value={service}
            onChange={item => {
              setService(item.value);
            }}
          />
          {errors.service && (
            <HelperText type="error">{errors.service}</HelperText>
          )}
        </View> */}

        {isHomeCare && (
          <>
            <TextInput
              label="PIN Code "
              value={pinCode}
              onChangeText={setPinCode}
              style={styles.input}
              mode="outlined"
              keyboardType="numeric"
              error={!!errors.pinCode}
            />
            {errors.pinCode && (
              <HelperText type="error">{errors.pinCode}</HelperText>
            )}
          </>
        )}

        {isHomeCare && (
          <>
            <TextInput
              label="Address "
              value={address}
              onChangeText={setAddress}
              style={styles.input}
              mode="outlined"
              multiline
              numberOfLines={3}
              error={!!errors.address}
            />
            {errors.address && (
              <HelperText type="error">{errors.address}</HelperText>
            )}
          </>
        )}
        {isDirectBooking ? (
          <>
            <TouchableOpacity
              onPress={handleUploadPrescription}
              style={styles.uploadContainer}
            >
              {prescription ? (
                <View style={{ width: '100%', height: '100%' }}>
                  <Image
                    source={{ uri: prescription }}
                    style={styles.prescriptionImage}
                  />
                  <View style={styles.uploadIconContainer}>
                    <MaterialCommunityIcons
                      name="file-upload"
                      size={40}
                      color={theme.colors.primary}
                    />
                    <CustomText style={styles.uploadText}>
                      Change Prescription
                    </CustomText>
                  </View>
                </View>
              ) : (
                <>
                  <MaterialCommunityIcons
                    name="file-upload"
                    size={40}
                    color={theme.colors.primary}
                  />
                  <CustomText style={styles.uploadText}>
                    Upload Prescription
                  </CustomText>
                </>
              )}
            </TouchableOpacity>
            {errors.prescription && (
              <HelperText type="error">{errors.prescription}</HelperText>
            )}
          </>
        ) : (
          <></>
        )}

        <Button
          mode="contained"
          onPress={handleContinue}
          style={styles.continueButton}
        >
          Continue
        </Button>
        <Portal>
          <Modal
            visible={showImagePickerModal}
            onDismiss={() => setShowImagePickerModal(false)}
            contentContainerStyle={styles.modalContainer}
          >
            <CustomText style={styles.modalTitle}>
              Choose Image Source
            </CustomText>
            <Button
              mode="contained"
              onPress={handleCameraUpload}
              style={styles.modalButton}
              icon="camera"
            >
              Take Photo
            </Button>
            <Button
              mode="contained"
              onPress={handleGalleryUpload}
              style={styles.modalButton}
              icon="image"
            >
              Choose from Gallery
            </Button>
            <Button
              mode="outlined"
              onPress={() => setShowImagePickerModal(false)}
              style={styles.modalButton}
            >
              Cancel
            </Button>
          </Modal>
        </Portal>
      </ScrollView>
    </View>
  );
};

export default PatientDetails;

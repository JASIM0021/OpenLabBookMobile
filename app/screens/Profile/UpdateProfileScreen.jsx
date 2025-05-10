import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Avatar, Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { scale } from 'react-native-size-matters';
import {
  useGetProfileInfoQuery,
  useUpdatePatientProfileMutation,
} from '../../features/api/user/userApiSlice';
import Header from '../../Components/header/Header';
import Loader from '../../Components/Loader/Loader';
import { Dropdown } from 'react-native-element-dropdown';
import { validatePhone } from '../../helper/validationHelper';

const UpdateProfile = ({ route, navigation }) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    dropdown: {
      height: 50,
      borderColor: theme.colors.primary,
      borderWidth: 1,
      marginBottom: 15,
      paddingHorizontal: 15,
      borderRadius: 10,
      backgroundColor: '#f5f5f5',
    },
    contentContainer: {
      padding: 20,
    },
    profileSection: {
      alignItems: 'center',
      marginBottom: 20,
    },
    input: {
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 15,
      backgroundColor: '#f9f9f9',
    },
    saveButton: {
      marginTop: 20,
    },
  });

  const { profileData: initialProfileData } = route.params;
  const [
    updateProfile,
    { isLoading: updateLoading, isError: isupdateError, error: updateError },
  ] = useUpdatePatientProfileMutation();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch: profileRefetch,
  } = useGetProfileInfoQuery();

  // const [useGetProfileInfoQuery, { data, isLoading, isError, error }] =
  //   useGetProfileInfoMutation();
  console.log('profileData', profileData);
  const [profilePhoto, setProfilePhoto] = useState(
    initialProfileData.profilePhoto || '',
  );
  const [localProfilePhoto, setLocalProfilePhoto] = useState();
  const [profileData, setProfileData] = useState(initialProfileData);

  const handleInputChange = (key, value) => {
    console.log('value', value);
    setProfileData({ ...profileData, [key]: value });
  };

  useEffect(() => {
    profileRefetch().then(() => {
      console.log('Api calling Done');
      setProfileData({
        ...profileData,
        id: data?.data?.profileInfo?._id,
        email: data?.data?.profileInfo?.email || '',
        contactNumber: data?.data?.profileInfo?.contactNumber || '',
        name: data?.data?.profileInfo?.name || '',
        profilePhoto: data?.data?.profileInfo?.profilePhoto || '',
        age: data?.data?.profileInfo?.age || '',
        sex: data?.data?.profileInfo?.sex || '',
        pinCode: data?.data?.profileInfo?.pinCode || '',
        bloodGroup: data?.data?.profileInfo?.bloodGroup || '',
        address: data?.data?.profileInfo?.address || '',
      });
    });
  }, []);

  const handleImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(
        'Permission Denied',
        'Permission to access media is required!',
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setLocalProfilePhoto(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    // if (
    //   !profileData.name ||
    //   !profileData.email ||
    //   !profileData.contactNumber ||
    //   !profileData.age ||
    //   !profileData.address ||
    //   !profileData.sex ||
    //   !profileData.bloodGroup
    // ) {
    //   Alert.alert('Validation Error', 'Please fill in all required fields.');
    //   return;
    // }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;

    if (profileData.email) {
      if (!emailPattern.test(profileData.email)) {
        Alert.alert('Validation Error', 'Please enter a valid email address.');
        return;
      }
    }

    if (profileData.contactNumber) {
      if (!phonePattern.test(profileData.contactNumber)) {
        Alert.alert('Validation Error', 'Please enter a valid phone number.');
        return;
      }
    }
    let formData = new FormData();

    if (localProfilePhoto) {
      formData.append('file', {
        uri: localProfilePhoto,
        name: `${profileData.name}_profile_${Date.now()}.png`,
        type: 'image/png', // Adjust the type based on your file type
      });
    }

    formData.append('data', JSON.stringify(profileData));
    console.log('profileData', profileData);
    // console.log('data?.data?.profileInfo?._id', data?.data);
    console.log('ata?.data?.profileInfo?._id', data?.data?.profileInfo?._id);
    const newdata = { formData, id: data?.data?.profileInfo?._id };
    updateProfile(newdata)
      .unwrap()
      .then(() => {
        Alert.alert('Success', 'Profile updated successfully!');
        // refetch();
        profileRefetch();
        navigation.goBack();
      })
      .catch(error => {
        console.log('error', error);
        Alert.alert('Error', 'Failed to update profile. Please try again.');
      });

    // Alert.alert('Success', 'Profile updated successfully!');
  };

  // useEffect(() => {
  //   if (data) {

  //   }
  // }, [data, isLoading == false]);

  return (
    <SafeAreaView style={styles.container}>
      <Header isBack={true} title="Update Profile" />
      <Loader isLoading={updateLoading} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.profileSection}>
          <TouchableOpacity activeOpacity={0.7} onPress={handleImagePicker}>
            {localProfilePhoto || profileData?.profilePhoto ? (
              <Avatar.Image
                size={120}
                source={{
                  uri: localProfilePhoto
                    ? localProfilePhoto
                    : profileData?.profilePhoto,
                }}
              />
            ) : (
              <Avatar.Text size={120} label={profileData.name.charAt(0)} />
            )}
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={profileData?.name}
          onChangeText={text => handleInputChange('name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={profileData?.email}
          onChangeText={text => handleInputChange('email', text)}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          value={profileData?.contactNumber}
          onChangeText={text => handleInputChange('contactNumber', text)}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={profileData.age}
          onChangeText={text => handleInputChange('age', text)}
          keyboardType="numeric"
        />
        {/* <TextInput
          style={styles.input}
          placeholder="Sex"
          value={profileData.sex}
          onChangeText={text => handleInputChange('sex', text)}
        /> */}
        <Dropdown
          style={styles.dropdown}
          data={[
            { label: 'Select Your Gender', value: '' },
            { label: 'MALE', value: 'MALe' },
            { label: 'FEMALE', value: 'FEMALE' },
            { label: 'OTHER', value: 'OTHER' },
          ]}
          labelField="label"
          valueField="value"
          placeholder="Select Your Sex"
          value={profileData.sex}
          onChange={text => handleInputChange('sex', text['value'])}
        />

        {/* <TextInput
          style={styles.input}
          placeholder="Blood Group"
          value={profileData.bloodGroup}
          onChangeText={text => handleInputChange('bloodGroup', text)}
        /> */}
        <Dropdown
          style={styles.dropdown}
          data={[
            { label: 'Select Blood Group', value: '' },
            { label: 'A+', value: 'A+' },
            { label: 'A-', value: 'A-' },
            { label: 'B+', value: 'B+' },
            { label: 'B-', value: 'B-' },
            { label: 'AB+', value: 'AB+' },
            { label: 'AB-', value: 'AB-' },
            { label: 'O+', value: 'O+' },
            { label: 'O-', value: 'O-' },
          ]}
          labelField="label"
          valueField="value"
          placeholder="Select Blood Group"
          value={profileData.bloodGroup}
          onChange={text => handleInputChange('bloodGroup', text['value'])}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={profileData.address}
          onChangeText={text => handleInputChange('address', text)}
        />

        <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
          Save Changes
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateProfile;

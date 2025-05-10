import {
  Alert,
  Dimensions,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Avatar, Divider, useTheme, Button } from 'react-native-paper';
import Header from '../../Components/header/Header';
import Hstack from '../../Components/Hstack/Hstack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import Vstack from '../../Components/Vstack/Vstack';
import { responsiveHeight, responsiveWidth } from '../../themes';
import CustomText from '../../Components/Text';
import useNavigationHelper from '../helper/NavigationHelper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import GolbalStyle from '../../Style';
import AsyncStorage from '../../helper/AsyncStorage';
import { SCREEN_NAME } from '../../Constant';
import {
  useGetProfileInfoQuery,
  useUpdatePatientProfileMutation,
} from '../../features/api/user/userApiSlice';
import Loader from '../../Components/Loader/Loader';
import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from 'expo-image-picker';
import { scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

const Profile = () => {
  const theme = useTheme();
  const {
    data,
    isLoading,
    isError,
    error,
    refetch: profileRefetch,
  } = useGetProfileInfoQuery();

  // const [useGetProfileInfoQuery, { data, isLoading, isError, error }] =
  //   useGetProfileInfoMutation();

  const [
    updateProfile,
    { isLoading: updateLoading, isError: isupdateError, error: updateError },
  ] = useUpdatePatientProfileMutation();

  useEffect(() => {
    profileRefetch();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState();
  const [profileData, setProfileData] = useState({
    email: '',
    contactNumber: '',
    name: '',
    profilePhoto: '',
    age: '',
    sex: '',
    pinCode: '',
    bloodGroup: '',
    address: '',
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    closeButton: {
      marginBottom: scale(16),
    },
    box: {
      backgroundColor: theme.colors.primary,
      height: responsiveHeight + 200,
      paddingHorizontal: responsiveWidth / 2,
      paddingTop: StatusBar.currentHeight + 20,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
      width: '90%',
      backgroundColor: 'white',
      padding: 25,
      borderRadius: 15,
      maxHeight: '80%',
    },
    input: {
      height: 50,
      borderColor: theme.colors.primary,
      borderWidth: 1,
      marginBottom: 15,
      paddingHorizontal: 15,
      borderRadius: 10,
      fontSize: 16,
      backgroundColor: '#f5f5f5',
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
    profileSection: {
      alignItems: 'center',
      marginBottom: 20,
    },
    avatarContainer: {
      marginBottom: 10,
      borderWidth: 3,
      borderColor: theme.colors.background,
      borderRadius: 75,
      padding: 3,
      backgroundColor: theme.colors.background,
    },
    infoCard: {
      backgroundColor: 'white',
      borderRadius: 15,
      padding: 20,
      marginTop: -30,
      marginHorizontal: 20,
      shadowColor: '#fff678',
      backgroundColor: theme.colors.background,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });

  const navigation = useNavigation();
  const handleLogout = () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          AsyncStorage.clearAll();
          navigation.navigate(SCREEN_NAME.Login);
        },
      },
    ]);
  };

  console.log('data?.data?.profileInfo?', data?.data?.profileInfo);

  const handleEditPress = () => {
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

    AsyncStorage.set('patient_id', data?.data?.profileInfo?._id);
    navigation.navigate('UpdateProfile', { profileData }); // Navigate to the new screen with profile data
  };

  // const handleEditPress = () => {
  //   setProfileData({
  //     ...profileData,
  //     email: data?.data?.profileInfo?.email || '',
  //     contactNumber: data?.data?.profileInfo?.contactNumber || '',
  //     name: data?.data?.profileInfo?.name || '',
  //     profilePhoto: data?.data?.profileInfo?.profilePhoto || '',
  //     age: data?.data?.profileInfo?.age || '',
  //     sex: data?.data?.profileInfo?.sex || '',
  //     pinCode: data?.data?.profileInfo?.pinCode || '',
  //     bloodGroup: data?.data?.profileInfo?.bloodGroup || '',
  //     address: data?.data?.profileInfo?.address || '',
  //   });
  //   setModalVisible(true);
  // };

  const handleImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePhoto(result.assets[0].uri);

      setModalVisible(true);
      //   setProfileData({ ...profileData, profilePhoto: result.assets[0].uri });
    }
  };

  const handleSave = () => {
    // Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/; // Assuming a 10-digit phone number

    if (
      !profileData.name ||
      !profileData.email ||
      !profileData.contactNumber ||
      !profileData.age ||
      !profileData.address ||
      !profileData.sex ||
      !profileData.bloodGroup
    ) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return;
    }

    if (!emailPattern.test(profileData.email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    if (!phonePattern.test(profileData.contactNumber)) {
      Alert.alert('Validation Error', 'Please enter a valid phone number.');
      return;
    }

    if (isNaN(profileData.age) || profileData.age <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid age.');
      return;
    }

    console.log('data?.data?.profileInfo?', data?.data?.profileInfo?._id);

    //  Save the updated profile data logic here
    // Assuming you have a function to update the profile
    // Convert data to JSON string and append to formData

    console.log('formData', profileData); // Changed from data to profileData

    //  Save the updated profile data logic here
    // Assuming you have a function to update the profile
    let formData = new FormData();
    formData.append('file', {
      uri: profilePhoto,
      name: `${profileData.name}_profile_${Date.now()}.png`,
      type: 'image/png', // Adjust the type based on your file type
    });

    formData.append('data', JSON.stringify(profileData));

    // console.log('data?.data?.profileInfo?._id', data?.data);
    const newdata = { formData, id: data?.data?.profileInfo?._id };
    updateProfile(newdata)
      .unwrap()
      .then(() => {
        Alert.alert('Success', 'Profile updated successfully!');
        refetch();
        setModalVisible(false);
      })
      .catch(error => {
        console.log('error', error);
        Alert.alert('Error', 'Failed to update profile. Please try again.');
      });

    setModalVisible(false);
  };

  console.log('error', error);
  console.log(
    'data?.data?.profileInfo?.profilePhoto',
    data?.data?.profileInfo?.profilePhoto,
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Loader isLoading={isLoading || updateLoading} />
        <SafeAreaView edges={['bottom']}>
          <ScrollView>
            <Vstack style={[GolbalStyle.box, styles.box]} gap={10}>
              <Hstack
                justifyContent="space-between"
                style={{ width: Dimensions.get('screen').width - 40 }}
              >
                <CustomText
                  text={
                    data?.data?.profileInfo?.name
                      ? `${data?.data?.profileInfo?.name} (${data?.data?.profileInfo?.age})`
                      : 'Update your profile'
                  }
                  bold="bold"
                  style={{ fontSize: 24, color: theme.colors.text }}
                />
                <Hstack gap={20}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      padding: 10,
                      borderRadius: 30,
                    }}
                    onPress={handleLogout}
                  >
                    <AntDesign name="poweroff" size={20} color="white" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      padding: 10,
                      borderRadius: 30,
                    }}
                    onPress={handleEditPress}
                  >
                    <AntDesign name="edit" size={20} color="white" />
                  </TouchableOpacity>
                </Hstack>
              </Hstack>

              <View style={styles.profileSection}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleImagePicker}
                >
                  <View style={styles.avatarContainer}>
                    {data?.data?.profileInfo?.profilePhoto ? (
                      <Avatar.Image
                        size={120}
                        source={{ uri: data?.data?.profileInfo?.profilePhoto }}
                      />
                    ) : (
                      <Avatar.Text
                        style={{
                          backgroundColor: theme.colors.text,
                        }}
                        size={120}
                        label={
                          data?.data?.profileInfo?.name
                            ? data?.data?.profileInfo?.name
                                .substring(0, 2)
                                .toUpperCase()
                            : 'NA'
                        }
                      />
                    )}
                  </View>
                </TouchableOpacity>

                {/* <CustomText
                text={
                  data?.data?.profileInfo?.name
                    ? `${data?.data?.profileInfo?.name} (${data?.data?.profileInfo?.age})`
                    : 'Update your profile'
                }
                color="white"
                style={{ fontSize: 18, marginTop: 10 }}
              /> */}
              </View>
            </Vstack>

            <View style={styles.infoCard}>
              <AccountItems
                title={data?.data?.profileInfo?.name || 'Edit Profile Name'}
                icon={'account'}
              />
              <AccountItems
                title={
                  data?.data?.profileInfo?.contactNumber || 'Update Number'
                }
                icon={'phone'}
              />
              <AccountItems
                title={data?.data?.profileInfo?.email || 'Update Email'}
                icon={'email'}
              />
              <AccountItems
                title={`Blood Group: ${
                  data?.data?.profileInfo?.bloodGroup || 'Not Set'
                }`}
                icon={'water'}
              />
            </View>
          </ScrollView>

          <Modal
            transparent={true}
            visible={modalVisible}
            animationType="slide"
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Entypo
                    name="circle-with-cross"
                    size={30}
                    color={theme.colors.error}
                  />
                </TouchableOpacity>

                <ScrollView showsVerticalScrollIndicator={false}>
                  <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={profileData.name}
                    onChangeText={text =>
                      setProfileData({ ...profileData, name: text })
                    }
                    autoCapitalize="words"
                    returnKeyType="next"
                    onSubmitEditing={() => emailInput.focus()}
                  />
                  <TextInput
                    ref={input => (emailInput = input)}
                    style={styles.input}
                    placeholder="Email"
                    value={profileData.email}
                    onChangeText={text =>
                      setProfileData({ ...profileData, email: text })
                    }
                    keyboardType="email-address"
                    returnKeyType="next"
                    onSubmitEditing={() => contactInput.focus()}
                  />
                  <TextInput
                    ref={input => (contactInput = input)}
                    style={styles.input}
                    placeholder="Contact Number"
                    value={profileData.contactNumber}
                    onChangeText={text =>
                      setProfileData({ ...profileData, contactNumber: text })
                    }
                    keyboardType="phone-pad"
                    returnKeyType="next"
                    onSubmitEditing={() => ageInput.focus()}
                  />
                  <TextInput
                    ref={input => (ageInput = input)}
                    style={styles.input}
                    placeholder="Age"
                    value={profileData.age}
                    onChangeText={text =>
                      setProfileData({ ...profileData, age: text })
                    }
                    keyboardType="numeric"
                    returnKeyType="next"
                    onSubmitEditing={() => addressInput.focus()}
                  />
                  <TextInput
                    ref={input => (addressInput = input)}
                    style={styles.input}
                    placeholder="Address"
                    value={profileData.address}
                    onChangeText={text =>
                      setProfileData({ ...profileData, address: text })
                    }
                    returnKeyType="next"
                    onSubmitEditing={() => addressInput.focus()}
                  />
                  {/* <Pressable onPress={handleImagePicker}>
                <Text style={styles.input}>Upload Profile Photo</Text>
              </Pressable> */}
                  <Dropdown
                    style={styles.dropdown}
                    data={[
                      { label: 'Select Sex', value: '' },
                      { label: 'Male', value: 'MALE' },
                      { label: 'Female', value: 'FEMALE' },
                      { label: 'Other', value: 'OTHER' },
                    ]}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Sex"
                    value={profileData.sex}
                    onChange={item => {
                      setProfileData({ ...profileData, sex: item.value });
                    }}
                  />
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
                    onChange={item => {
                      setProfileData({
                        ...profileData,
                        bloodGroup: item.value,
                      });
                    }}
                  />

                  <Button
                    mode="contained"
                    onPress={handleSave}
                    style={styles.saveButton}
                    labelStyle={{ fontSize: 16 }}
                  >
                    Save Changes
                  </Button>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const AccountItems = ({ title, icon }) => {
  const theme = useTheme();
  return (
    <TouchableOpacity>
      <Vstack style={{ width: '100%', paddingVertical: 15 }} gap={10}>
        <Hstack
          justifyContent="space-between"
          style={{ width: '100%', alignSelf: 'center' }}
        >
          <Hstack gap={15}>
            <MaterialCommunityIcons
              name={icon}
              size={24}
              color={theme.colors.primary}
            />
            <CustomText
              text={title}
              style={{ fontSize: 16, color: theme.colors.text }}
            />
          </Hstack>
          <AntDesign name="right" size={20} color={theme.colors.primary} />
        </Hstack>
        <Divider style={{ backgroundColor: '#eee', height: 1 }} />
      </Vstack>
    </TouchableOpacity>
  );
};

{
  /* <View
style={{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
}}
>
<View
  style={{
    width: '100%',
    backgroundColor: 'red',
    padding: 20,
  }}
>
  <Text>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus
    illo distinctio nulla laboriosam enim modi sed, expedita odit esse
    consectetur laudantium tenetur dicta recusandae odio quos facere rem
    nemo eos.
  </Text>
  <Text>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus
    illo distinctio nulla laboriosam enim modi sed, expedita odit esse
    consectetur laudantium tenetur dicta recusandae odio quos facere rem
    nemo eos.
  </Text>
  <Text>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus
    illo distinctio nulla laboriosam enim modi sed, expedita odit esse
    consectetur laudantium tenetur dicta recusandae odio quos facere rem
    nemo eos.
  </Text>
  <View
    style={{
      height: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <View
      style={{
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        margin: -30,
      }}
    />
    <View
      style={{
        height: 1,
        backgroundColor: 'white',
        width: '100%',
        borderStyle: 'dashed',
        borderWidth: 1,
        overflow: 'hidden',
        zIndex: -10,
      }}
    />
    <View
      style={{
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        margin: -30,
      }}
    />
  </View>
  <Text>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus
    illo distinctio nulla laboriosam enim modi sed, expedita odit esse
    consectetur laudantium tenetur dicta recusandae odio quos facere rem
    nemo eos.
  </Text>
  <Text>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus
    illo distinctio nulla laboriosam enim modi sed, expedita odit esse
    consectetur laudantium tenetur dicta recusandae odio quos facere rem
    nemo eos.
  </Text>
</View>
</View> */
}

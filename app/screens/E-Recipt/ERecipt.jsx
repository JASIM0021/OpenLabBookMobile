import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { Divider, useTheme } from 'react-native-paper';
import { responsiveHeight, responsiveWidth } from '../../themes';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../Components/header/Header';
import Vstack from '../../Components/Vstack/Vstack';
import Hstack from '../../Components/Hstack/Hstack';
import CustomText from '../../Components/Text';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GolbalStyle from '../../Style';
import { useRoute } from '@react-navigation/native';
import CustomButton from '../../Components/CustomButton/CustomButton';
const ERecipt = () => {
  const theme = useTheme();

  const data = useRoute().params?.data;
  const handlePhone = () => {
    const phoneNumber = '+91 81161 82108';
    if (Platform.OS === 'android') {
      Linking.openURL(`tel:${phoneNumber}`);
      return;
    }

    if (Platform.OS === 'ios') {
      Linking.openURL(`telprompt:${phoneNumber}`);
      return;
    }
  };
  console.log('data', data);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // paddingHorizontal: responsiveWidth / 4,
      backgroundColor: theme.colors.background,
    },
    box: {
      padding: responsiveHeight / 4,
      // borderWidth: 0.5,
      // borderRadius: responsiveHeight / 6,
    },
    header: {
      height: responsiveHeight + 20,
      backgroundColor: theme.colors.secondary,
    },
  });

  console.log('data?.organizationName', data);
  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']}>
        {/* <View style={styles.header}> */}
        <Header bg={theme.colors.secondary} tint={'white'} title="E receipt" />
        <View style={styles.box}>
          <Vstack>
            <Hstack
              columnGap={10}
              justifyContent="space-between"
              alignItems="center"
              style={{ padding: 20, width: '100%' }}
            >
              {}

              <CustomText
                text={
                  data?.medicalTestLists?.[0]?.testName
                    ? data?.medicalTestLists?.[0]?.testName
                    : 'Prescription Uploded successfully'
                }
                bold="bold"
                size="md"
                color={theme.colors.primary}
              />
              <CustomText
                text={data?.paymentType}
                // text="Cash On Delivery"
                color={theme.colors.secondary}
                bold="bold"
              />
            </Hstack>
            <Divider
              style={{ height: 0.5, backgroundColor: 'gray', width: '100%' }}
            />
          </Vstack>

          {/* Payment */}
          <Vstack columnGap={10} rowGap={10} justifyContent="center">
            {/* <Hstack
              columnGap={10}
              justifyContent="space-between"
              alignItems="center"
              style={{ padding: 16, width: '100%' }}
            >
              <Vstack style={{ rowGap: 10 }}>
                <CustomText text="Payment ID" bold="300" size="md" />
                <CustomText text={data?._id} size="sm" />
              </Vstack>
              <TouchableOpacity>
                <MaterialIcons
                  name="content-copy"
                  size={30}
                  color={theme.colors.primary}
                />
              </TouchableOpacity>
            </Hstack> */}
            <Divider
              style={{ height: 0.5, backgroundColor: 'gray', width: '100%' }}
            />
          </Vstack>

          {/* Booking */}
          <Vstack columnGap={10} rowGap={10} justifyContent="center">
            <Hstack
              columnGap={10}
              justifyContent="space-between"
              alignItems="center"
              style={{ padding: 16, width: '100%' }}
            >
              <Vstack style={{ rowGap: 10 }}>
                <CustomText text="Booking ID" bold="300" size="md" />
                <CustomText text={data?.patientId} size="sm" />
              </Vstack>
              <TouchableOpacity>
                <MaterialIcons
                  name="content-copy"
                  size={30}
                  color={theme.colors.primary}
                />
              </TouchableOpacity>
            </Hstack>
            <Divider
              style={{ height: 0.5, backgroundColor: 'gray', width: '100%' }}
            />
          </Vstack>

          <Vstack style={GolbalStyle.mtMD}>
            <CustomText text="Patient Details" bold="bold" />
            <Hstack
              columnGap={10}
              justifyContent="space-between"
              alignItems="center"
              style={{ padding: 6, width: '100%' }}
            >
              <CustomText text="Patient name" size="md" />
              <CustomText
                text={`${data?.patientInfo?.name}(${data?.patientInfo?.age})`}
                size="sm"
              />
            </Hstack>
            <Hstack
              columnGap={10}
              justifyContent="space-between"
              alignItems="center"
              style={{ padding: 6, width: '100%' }}
            >
              {/* <CustomText text="Date" size="md" />
              <CustomText
                text={
                  data?.createdAt
                    ? new Date(data?.createdAt).toLocaleDateString()
                    : '17-08-2024'
                }
                size="sm"
              /> */}
            </Hstack>
            {data?.directAppointment ? (
              <></>
            ) : (
              <>
                <Hstack
                  columnGap={10}
                  justifyContent="space-between"
                  alignItems="center"
                  style={{ padding: 6, width: '100%' }}
                >
                  <CustomText text="TestCode :" size="md" />
                  <CustomText
                    text={
                      data?.medicalTestLists?.[0]?.testCode
                        ? data?.medicalTestLists?.[0]?.testCode
                        : 'N/A'
                    }
                    size="sm"
                  />
                </Hstack>
                <Hstack
                  columnGap={10}
                  justifyContent="space-between"
                  alignItems="center"
                  style={{ padding: 10, width: '100%' }}
                >
                  {/* <CustomText text="Organization Address" size="sm" />
                  <Vstack>
                    <CustomText
                      text={
                        data?.organizationAddress
                          ? data?.organizationAddress
                          : 'Loa, dwarnari , galsi, purba bardhaman '
                      }
                      size="sm"
                      textAlign="center"
                      bold="400"
                      numberOfLine={3}
                      width={200}
                      // textAlign="center"
                    />
                    {/* <CustomText
                  text="Purba, Ranisiyer west, "
                  size="sm"
                  textAlign="center"
                  bold="400"
                  // textAlign="center"
                />
                <CustomText
                  text="Bardhaman, West Bengal 713101"
                  size="sm"
                  textAlign="center"
                  bold="400"
                  // textAlign="center"
                /> */}
                  {/* </Vstack> */}
                </Hstack>
              </>
            )}

            <View style={[GolbalStyle.center, { width: '100%' }]}>
              <CustomButton
                label={'Make a Cancellation Call'}
                onPress={() => {
                  handlePhone();
                }}
              />
            </View>
          </Vstack>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ERecipt;

const styles = StyleSheet.create({});

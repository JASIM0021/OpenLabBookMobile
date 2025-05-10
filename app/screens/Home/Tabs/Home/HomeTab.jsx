import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Animated,
  PanResponder,
  ScrollView,
  Linking,
  Platform,
  Dimensions,
} from 'react-native';
import * as Location from 'expo-location'; // Importing Location from expo-location
import Header from '../../../../Components/header/Header';
import Search from '../../../../Components/Search/Search';
import ScrollViewHelper from '../../../../Components/ScrollViewHelper/ScrollViewHelper';
import CustomText from '../../../../Components/Text';
import CustomCards from '../../../../Components/Cards/CustomCards';
import { responsiveHeight, responsiveWidth } from '../../../../themes';
import GolbalStyle from '../../../../Style';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import ImageConstant from '../../../../Constant/ImageConstant';
import Swiper from 'react-native-swiper';
import BookCard from '../../../../Components/BookCard/BookCard';
import AutocompleteDistricts from '../../../../Components/AutoComplete/AutocompleteDistricts';
import ActionSheet from 'react-native-actions-sheet';
import { useDispatch, useSelector } from 'react-redux';
import useNavigationHelper from '../../../helper/NavigationHelper';
import { SCREEN_NAME } from '../../../../Constant';
import { useGetAllAddressQuery } from '../../../../features/api/address/address.api';
import { useGetServiceResultQuery } from '../../../../features/api/service/medecalService';
import Loader from '../../../../Components/Loader/Loader';
import { useGetBannersQuery } from '../../../../features/api/banners/banners.api';
import Carousel from 'react-native-reanimated-carousel';
import { verticalScale } from 'react-native-size-matters';
import AsyncStorage from '../../../../helper/AsyncStorage';
import {
  saveLocation,
  saveService,
} from '../../../../features/slice/GlobalSlice';
import FastImage from 'react-native-fast-image';
import { useRemoveAllCartItemMutation } from '../../../../features/api/cart/cart.api';

const HomeTab = () => {
  const { width } = Dimensions.get('window');

  const theme = useTheme();
  const { data, isLoading, isError, error } = useGetAllAddressQuery();
  const colorSchem = useColorScheme();
  const [selectedCategory, setSelectedCategory] = React.useState(new Set());
  const [isActionSheetVisible, setActionSheetVisible] = React.useState(false);
  const { location } = useSelector(state => state.globalReducer);
  const { data: bannersData, isLoading: bannerLoading } = useGetBannersQuery();
  const carouselRef = useRef(null);
  const dispatch = useDispatch();
  const [
    deleteAllCartData,
    {
      data: deleteAllCart,
      isLoading: loadingDeleteAllCart,
      error: errorDeleteAllCart,
    },
  ] = useRemoveAllCartItemMutation();
  const [queryParams, setQueryParams] = useState([
    {
      name: 'serviceCoverAreaAddress',
      value: location?.name,
    },
  ]);
  const {
    data: allservices,
    isLoading: servicesLoading,
    refetch,
  } = useGetServiceResultQuery({
    queryParams,
  });

  const [address, setAddress] = useState(''); // Local state to store address

  const getAddressFromLocation = async (latitude, longitude) => {
    console.log('latitude', latitude);
    let url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=3f800e0409fe41e280bf22d513df3060`;
    console.log('url', url);
    const response = await fetch(url).then(data => data.json());

    console.log('data', response?.results[0]?.components?.city);

    if (response.results && response.results.length > 0) {
      setAddress(response?.results[0]?.components?.city); // Set the address from the API response
    }
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log('status', status);
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log('location', location);
    getAddressFromLocation(location.coords.latitude, location.coords.longitude); // Get address from latitude and longitude
  };

  const getSelectedLocation = async () => {
    const location = await AsyncStorage.getLocation();

    dispatch(saveLocation(location));
  };

  useEffect(() => {
    getSelectedLocation();
    getLocation(); // Fetch location on component mount
  }, []);

  const actionSheetRef = useRef(null);
  const openActionSheet = () => {
    setActionSheetVisible(true);
    actionSheetRef.current?.show();
  };

  const closeActionSheet = () => {
    setActionSheetVisible(false);
  };

  const pan = useRef(new Animated.ValueXY()).current;

  const handleChooseArea = () => openActionSheet();
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          { dy: pan.y }, // Track the movement along the y-axis
        ],
        { useNativeDriver: false },
      ),
      onPanResponderRelease: (e, gestureState) => {
        // Determine if the panel should be swiped up or down
        if (gestureState.dy > 0) {
          // Swiped down
          Animated.spring(pan, {
            toValue: { x: 0, y: responsiveHeight / 1.2 },
            useNativeDriver: false,
          }).start();
        } else {
          // Swiped up
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    button: {
      marginTop: 20,
    },
    carouselItem: {
      width: '100%',
      height: '100%',
      borderRadius: 15,
      overflow: 'hidden',
    },
    swiperWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    swipImage: {
      width: '100%',
      height: verticalScale(120),
      borderRadius: 10,
      resizeMode: 'cover',
      aspectRatio: 2.5, // Adjusted aspect ratio
    },
    dot: {
      backgroundColor: 'rgba(0,0,0,.2)',
      width: 8,
      height: 8,
      borderRadius: 4,
      margin: 3,
    },
    activeDot: {
      backgroundColor: '#000',
      width: 8,
      height: 8,
      borderRadius: 4,
      margin: 3,
    },
    cartSection: {
      height: responsiveHeight / 1.2,
      backgroundColor: theme.colors.surface,
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      justifyContent: 'space-between',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    loadingContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.7)',
      zIndex: 999,
    },
    noDataContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 20,
    },
    chooseAreaButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 10,
    },
  });

  const images = [
    ImageConstant.off_10,
    ImageConstant.card_booking,
    ImageConstant.consultant_img,
  ];

  const handleImagePress = index => {
    console.log(`Image ${index + 1} clicked`);
  };

  const navigation = useNavigationHelper();

  useEffect(() => {
    setQueryParams([
      {
        name: 'serviceCoverAreaAddress',
        value: location?.name,
      },
    ]);
    actionSheetRef.current?.hide();
    // useDispatch(saveLocation(location))

    closeActionSheet();
  }, [location?.name]);

  // const dispatch = useDispatch()

  const handleServiceNavigation = data => {
    console.log('data?.serviceName', data?.serviceName);
    deleteAllCartData();
    switch (data?.navigationScreen) {
      case 'e_health_call':
        if (Platform.OS === 'android') {
          Linking.openURL(`tel:${data?.serviceContactNumber}`);
          return;
        }

        if (Platform.OS === 'ios') {
          Linking.openURL(`telprompt:${data?.phoneNumber}`);
          return;
        }
        break;
      case 'patient_details':
        dispatch(saveService(data));
        navigation.push({
          screen: 'PatientDetails',
          data: { serviceName: 'patient_details' },
        });
        break;
      default:
        dispatch(saveService(data));
        navigation.push({
          screen: SCREEN_NAME.BloodGroupTest,
          data: {
            serviceName: data?.serviceName,
            id: data?._id,
          },
        });
    }
  };

  const renderCarouselItem = ({ item }) => {
    console.log('item', item);
    return (
      <View style={styles.carouselItem}>
        <FastImage
          source={{
            uri: item?.photoUrl,
          }}
          style={styles.swipImage}
          resizeMode={FastImage.resizeMode.center}
          // style={{ width: 120, height: 60 }}
          defaultSource={ImageConstant.demo_img}
        />
      </View>
    );
  };

  console.log('bannersData?.data', bannersData?.data);
  return (
    <View style={styles.container}>
      <Loader isLoading={isLoading || servicesLoading} />

      <Header isBack={false} isShop={true} isPhone={true} />
      <View style={{ paddingHorizontal: 16 }}>
        <View style={[GolbalStyle.row]}>
          <CustomText
            text="Sample collection from"
            size="sm"
            bold="400"
            color="gray"
          />
          <TouchableOpacity onPress={() => openActionSheet()}>
            <View style={[GolbalStyle.row]}>
              <Image source={ImageConstant.location} />
              <CustomText
                text={address || location?.name} // Display the fetched address or fallback to location name
                size="sm"
                bold="bold"
                underline
              />
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={{
            height: '100%',
          }}
        >
          {/* Image Swiper */}
          <View style={{ height: responsiveHeight * 2, paddingVertical: 10 }}>
            {/* <Carousel
              ref={carouselRef}
              // data={bannersData?.data}
              data={images}
              renderItem={renderCarouselItem}
              // sliderWidth={width - 32}
              // itemWidth={width - 32}
              width={width}
              loop={true}
              autoplay={true}
              // autoplayInterval={3000}
              style={{ width: 120, height: 60 }}
              // style={{ width: '100%' }} // Ensure the carousel takes full width
            /> */}
            {/* <Swiper autoplay={true} autoplayTimeout={2}>
              {bannersData?.data ? (
                bannersData?.data?.map((item, index) => (
                  <View style={styles.carouselItem} key={index}>
                    <FastImage
                      source={{
                        uri: item?.photoUrl,
                      }}
                      style={styles.swipImage}
                      // style={{ width: 120, height: 60 }}
                      defaultSource={ImageConstant.demo_img}
                    />
                  </View>
                ))
              ) : (
                <></>
              )}
            </Swiper> */}
            <Swiper autoplay={true} autoplayTimeout={2}>
              {images.map((item, index) => (
                <View style={styles.carouselItem} key={index}>
                  <FastImage
                    source={item}
                    style={styles.swipImage}
                    // style={{ width: 120, height: 60 }}
                    defaultSource={ImageConstant.demo_img}
                  />
                </View>
              ))}
            </Swiper>
          </View>

          {/* Service */}
          <View style={[GolbalStyle.mtMD]}>
            <CustomText text="Service" bold="bold" />
          </View>

          {/* CARD */}
          <View style={[GolbalStyle.mtSM]}>
            {allservices?.data?.length > 0 ? (
              <FlatList
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  columnGap: 20,
                  height: '100%',
                }}
                data={allservices?.data}
                horizontal={true}
                renderItem={({ item }) => {
                  return (
                    <BookCard
                      onPress={() => handleServiceNavigation(item)}
                      title={item?.serviceName}
                      subTitle={item?.description}
                      number={item?.navigationScreen == 'e_health_call'}
                    />
                  );
                }}
              />
            ) : (
              <View style={styles.noDataContainer}>
                <CustomText
                  text="No services available in your area"
                  color={theme.colors.primary}
                  size="lg"
                  textAlign="center"
                />
                <TouchableOpacity
                  style={styles.chooseAreaButton}
                  onPress={handleChooseArea}
                >
                  <CustomText text="Choose Your Area" color="white" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      <ActionSheet ref={actionSheetRef}>
        <View style={[GolbalStyle.column, { height: responsiveHeight * 4 }]}>
          <AutocompleteDistricts />
        </View>
      </ActionSheet>
    </View>
  );
};

export default HomeTab;

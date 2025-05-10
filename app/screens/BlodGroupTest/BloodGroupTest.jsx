import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Pressable,
  BackHandler,
  Alert,
  TextInput,
} from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dropdown } from 'react-native-element-dropdown';

import Header from '../../Components/header/Header';
import CustomText from '../../Components/Text';
import Search from '../../Components/Search/Search';
import { SCREEN_NAME } from '../../Constant';
import ImageConstant from '../../Constant/ImageConstant';
import { responsiveHeight, responsiveWidth, screenWidth } from '../../themes';
import useNavigationHelper from '../helper/NavigationHelper';
import {
  useGetTestbyQueryQuery,
  useGettestMutationMutation,
} from '../../features/api/service/medecalService';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Components/Loader/Loader';
import { addToCart, saveSelectedTest } from '../../features/slice/GlobalSlice';
import Hstack from '../../Components/Hstack/Hstack';
import CustomButton from '../../Components/CustomButton/CustomButton';
import {
  useAddToCartMutation,
  useGetAllCartMutation,
  useRemoveAllCartItemMutation,
} from '../../features/api/cart/cart.api';

const { width } = Dimensions.get('window');

const BloodGroupTest = () => {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('testName');
  const carouselRef = useRef(null);
  const navigation = useNavigationHelper();
  const { location, cartItem } = useSelector(state => state.globalReducer);
  const { selectedService } = useSelector(state => state.globalReducer);

  const [testTemp, setTestTemp] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
  });
  const { id } = useRoute().params?.data;

  const [
    useGetAllCartQuery,
    { data: cartData, isLoading: cartLoading, isError: cartError },
  ] = useGetAllCartMutation();
  const [addtoCart, { data, isLoading: loadingAddcart, isError, isSuccess }] =
    useAddToCartMutation();

  const searchTypes = [
    { label: 'Test Name', value: 'testName' },
    { label: 'Test Code', value: 'testCode' },
    { label: 'Organization Name', value: 'organizationName' },
  ];

  const [queryParams, setQueryParam] = useState([
    {
      name: 'coverAddress',
      value: location?.name,
    },
    {
      name: 'searchTerm',
      value: search,
    },
    {
      name: 'service',
      value: selectedService?.serviceName,
    },
    {
      name: 'id',
      value: id,
    },
  ]);

  const {
    data: testData,
    isLoading: isLoadingtest,
    refetch,
  } = useGetTestbyQueryQuery({ queryParams });

  const [getMedBySearh, { data: medTest, isLoading: loadingTest }] =
    useGettestMutationMutation();

  const [
    deleteAllCartData,
    {
      data: deleteAllCart,
      isLoading: loadingDeleteAllCart,
      error: errorDeleteAllCart,
    },
  ] = useRemoveAllCartItemMutation();

  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: 16,
    },
    carouselContainer: {
      height: responsiveHeight * 1,
      marginBottom: 20,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
      // backgroundColor: theme.colors.background,

      gap: 10,
    },
    dropdown: {
      width: '40%',
      height: 50,
      borderColor: theme.colors.primary,
      color: theme.colors.primary,
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 15,
      // color: theme.colors.text,
      // backgroundColor: theme.colors.surface,
    },
    carouselItem: {
      width: '100%',
      height: '100%',
      borderRadius: 15,
      overflow: 'hidden',
    },
    carouselImage: {
      width: '100%',
      height: '100%',
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      marginVertical: 16,
      color: theme.colors.primary,
    },
    testItem: {
      flex: 1,
      margin: 8,
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      overflow: 'hidden',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      borderWidth: 0.5,
    },
    testImage: {
      width: '100%',
      height: responsiveWidth * 1.5,
    },
    testInfo: {
      padding: 12,
    },
    testName: {
      fontSize: 16,
      fontWeight: 'bold',
      // color: theme.colors.text,
    },
    testDescription: {
      fontSize: 12,
      // color: theme.colors.text,
      marginTop: 4,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    discountedPrice: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
    originalPrice: {
      fontSize: 12,
      color: theme.colors.secondary,
      textDecorationLine: 'line-through',
      marginLeft: 8,
    },
    bookButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      alignSelf: 'flex-start',
      marginTop: 8,
    },
    bookButtonText: {
      color: theme.colors.background,
      fontWeight: 'bold',
      fontSize: 12,
    },
    addToCartText: {
      color: theme.colors.background,
    },
  });

  // const images = [
  //   'https://via.placeholder.com/600x300.png?text=Image+1',
  //   'https://via.placeholder.com/600x300.png?text=Image+2',
  //   'https://via.placeholder.com/600x300.png?text=Image+3',
  // ];
  const images = [
    ImageConstant.off_10,
    ImageConstant.card_booking,
    ImageConstant.consultant_img,
  ];
  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={item} style={styles.carouselImage} />
    </View>
  );

  const handleBook = item => {
    dispatch(addToCart(item));

    addtoCart({
      medicalTests: { ...item, serviceName: selectedService?.serviceName },
    })
      .unwrap()
      .then(() => {
        useGetAllCartQuery();
      });
    // dispatch(saveSelectedTest(item));
    navigation.push({
      screen: SCREEN_NAME.PatientDetails,
      data: {
        isCart: true,
      },
    });
  };

  const handleCartItem = item => {
    // console.log('item', item);
    dispatch(addToCart(item));

    addtoCart({
      medicalTests: { ...item, serviceName: selectedService?.serviceName },
    })
      .unwrap()
      .then(() => {
        useGetAllCartQuery();
      });
  };

  const renderTestItem = ({ item }) => {
    return (
      <Pressable style={styles.testItem}>
        <Image
          source={
            item?.medicalTestBanner
              ? { uri: item?.medicalTestBanner }
              : ImageConstant.promo_30
          }
          style={styles.testImage}
          resizeMode="cover"
        />
        <View style={styles.testInfo}>
          <CustomText text={`${item?.testName}`} style={styles.testName} />

          <Hstack>
            <CustomText
              text={`code: `}
              style={{
                ...styles.testDescription,
                justifyContent: 'space-between',
              }}
            />
            <CustomText
              text={`${item?.testCode}`}
              style={styles.testDescription}
            />
          </Hstack>
          <CustomText
            text={item?.organizationName}
            style={styles.testDescription}
          />
          <CustomText
            text={item?.organizationAddress}
            style={styles.testDescription}
          />
          <View style={styles.priceContainer}>
            <CustomText
              text={`₹ ${
                item?.discountedPrice ? item?.discountedPrice : item?.mrp
              }`}
              style={styles.discountedPrice}
            />
            <CustomText text={`₹ ${item?.mrp}`} style={styles.originalPrice} />
          </View>
          <Hstack alignItems="center" justifyContent="space-between">
            <TouchableOpacity
              // style={styles.addToCartButton}
              style={styles.bookButton}
              onPress={() => handleCartItem(item)}
            >
              <Hstack alignItems="center">
                <MaterialCommunityIcons
                  name="cart-plus"
                  size={24}
                  color="#fff" // Changed to white for better visibility
                />
                <CustomText text="Add to Cart" style={styles.addToCartText} />
              </Hstack>
            </TouchableOpacity>
          </Hstack>
        </View>
      </Pressable>
    );
  };

  // useEffect(() => {
  //   deleteAllCartData();
  //   useGetAllCartQuery();
  // }, []);

  const handleCart = () => {
    navigation.push({
      screen: SCREEN_NAME.CartScreen,
    });
  };

  const handleBackPresed = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to go back? If you go back, all cart items will be removed.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Back',
          onPress: () => {
            deleteAllCartData();
            useGetAllCartQuery();
            navigation.back();
          },
        },
      ],
      { cancelable: true },
    );
  };

  const loadMoreData = () => {
    if (testData?.data?.length >= pagination.limit) {
      setPagination({ ...pagination, page: pagination.page + 1 });
    }
  };

  // useEffect(() => {
  //   // deleteAllCartData();
  //   useGetAllCartQuery();
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     () => {
  //       handleBackPresed();
  //       return true;
  //     },
  //   );

  //   return () => backHandler.remove();
  // }, []);

  // try {
  //   if (Array.isArray(testData?.data) && testData.data.length > 0) {
  //     setTestTemp(prevTestTemp => [...prevTestTemp, ...testData.data]);
  //   } else
  // useEffect(() => {
  //   if (search != '') {
  //     setPagination({ ...pagination, page: 1 });
  //     setTestTemp(testData?.data);
  //     refetch();
  //   } else {
  //     refetch();
  //   }
  //   if (Array.isArray(testData?.data) && testData?.data.length == 0) {
  //     setTestTemp(testData?.data);
  //   }
  // }, [testData?.data, search]);

  // useEffect(() => {
  //   // if (search != '') {
  //   setPagination({ ...pagination, page: 1 });
  //   setTestTemp(testData?.data);
  //   // refetch();
  //   // }
  // }, [search]);

  const onSearch = text => {
    setSearch(text);
    setPagination({ ...pagination, page: 1 });

    // console.log('text', text);

    // refetch()
    //   .unwrap()
    //   .then(data => {
    //     console.log('data', data);
    //     setTestTemp(data?.data);
    //   });
  };

  useMemo(() => {
    if (Array.isArray(testData?.data) && testData?.data?.length > 0) {
      setTestTemp(prev => [...prev, ...testData.data]);
    }
  }, [pagination?.page]);

  useEffect(() => {
    if (pagination?.page == 1) {
      if (testData?.data) {
        setTestTemp(testData?.data);
      }
    }
  }, [testData?.data]);

  useEffect(() => {
    // deleteAllCartData()
    //   .unwrap()
    //   .then(() => {
    //     useGetAllCartQuery();
    //   });
    setQueryParam([
      {
        name: 'coverAddress',
        value: location?.name,
      },
      {
        name: 'searchTerm',
        value: search,
      },
      {
        name: 'service',
        value: selectedService?.serviceName,
      },
      {
        name: 'page',
        value: pagination.page,
      },
      {
        name: 'limit',
        value: pagination.limit,
      },
      {
        name: 'id',
        value: id,
      },
    ]);

    return () => {};
  }, [pagination]);
  return (
    <View style={styles.container}>
      <Loader
        isLoading={
          isLoadingtest || cartLoading || loadingAddcart || loadingDeleteAllCart
        }
      />
      <Header
        onBackClick={handleBackPresed}
        isBack={true}
        title={
          selectedService.serviceName
            ? selectedService.serviceName
            : 'Blood Group Test'
        }
      />
      <View style={styles.content}>
        <View style={styles.carouselContainer}>
          <Carousel
            ref={carouselRef}
            data={images}
            renderItem={renderCarouselItem}
            sliderWidth={width - 32}
            itemWidth={width - 32}
            loop={true}
            autoplay={true}
            autoplayInterval={3000}
          />
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            placeholderTextColor={theme.colors.primary}
            placeholder={'Search by Test Name , code or Organization'}
            style={{ ...styles.dropdown, width: '100%', zIndex: 999 }}
            onChangeText={text => onSearch(text)}
          />
        </View>

        <CustomText text="Available Tests" style={styles.sectionTitle} />

        <FlatList
          data={testTemp}
          renderItem={renderTestItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          style={{ marginBottom: 300 }}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ paddingBottom: 16 }}
          onEndReached={loadMoreData} // Function to load more data
          onEndReachedThreshold={0.5} // Threshold for triggering load more
          ListFooterComponent={isLoadingtest ? <ActivityIndicator /> : <></>} // Show loading indicator
        />
      </View>

      {cartData?.data?.cartItems?.length > 0 && (
        <View
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: theme.colors.primary,
            borderTopStartRadius: 10,
            borderTopEndRadius: 10,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: theme.colors.background, // Changed to a more suitable background color
          }}
        >
          <Hstack
            style={{ width: '100%' }}
            alignItems="center"
            justifyContent="space-between"
          >
            <CustomText
              text={`${cartData?.data?.cartItems?.length} Item ➡️ | Selected`}
            />
            <CustomButton
              label={'View Cart'}
              borderRadius={10}
              onPress={handleCart}
            />
          </Hstack>
        </View>
      )}
    </View>
  );
};

export default BloodGroupTest;

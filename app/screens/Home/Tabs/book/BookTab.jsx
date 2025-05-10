import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Button,
  RefreshControl,
} from 'react-native';
import { Divider, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../../../Components/header/Header';
import CustomText from '../../../../Components/Text';
import GolbalStyle from '../../../../Style';
import {
  responsiveHeight,
  responsiveWidth,
  screenHeight,
  screenWidth,
} from '../../../../themes';
import useNavigationHelper from '../../../helper/NavigationHelper';
import { SCREEN_NAME } from '../../../../Constant';
import ImageConstant from '../../../../Constant/ImageConstant';
import { useGetMyAppointmentQuery } from '../../../../features/api/appontment/appointment.api';
import Loader from '../../../../Components/Loader/Loader';
import Search from '../../../../Components/Search/Search';

const BookTab = () => {
  const navigation = useNavigationHelper();
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [allData, setAllData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [queryParams, setQueryParam] = useState([
    {
      name: 'page',
      value: page,
    },
    {
      name: 'limit',
      value: limit,
    },
    {
      name: 'searchTerm',
      value: searchTerm,
    },
  ]);

  const {
    isLoading,
    data,
    isError,
    error,
    refetch: getAppionmentRefetch,
  } = useGetMyAppointmentQuery({
    queryParams,
  });

  React.useEffect(() => {
    if (data?.data) {
      if (page === 1) {
        setAllData(data.data);
      } else {
        setAllData(prev => [...prev, ...data.data]);
      }
    }
  }, [data]);

  React.useEffect(() => {
    setPage(1);
    setQueryParam([
      {
        name: 'page',
        value: 1,
      },
      {
        name: 'limit',
        value: limit,
      },
      {
        name: 'searchTerm',
        value: searchTerm,
      },
    ]);
  }, [searchTerm]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      paddingHorizontal: screenWidth * 0.04,
    },
    listContainer: {
      paddingVertical: screenHeight * 0.02,
    },
    itemContainer: {
      backgroundColor: theme.colors.background,
      borderRadius: 12,
      marginBottom: screenHeight * 0.02,
      padding: screenHeight * 0.02,
      elevation: 2,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    imageContainer: {
      marginRight: screenWidth * 0.04,
    },
    image: {
      width: responsiveHeight,
      height: responsiveHeight,
      borderRadius: 8,
    },
    textContainer: {
      flex: 1,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.primary,
      marginBottom: 4,
    },
    description: {
      fontSize: 16,
      color: theme.colors.text,
      marginBottom: 4,
    },
    address: {
      fontSize: 14,
      color: theme.colors.text,
      opacity: 0.7,
    },
    iconContainer: {
      marginLeft: screenWidth * 0.02,
    },
  });

  const renderItem = ({ item, index }) => {
    console.log('item', item);
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          navigation.push({
            screen: SCREEN_NAME.ERecipt,
            data: item,
          });
        }}
        key={item?.medicalTestLists?.[0]?.testName + index}
      >
        <View style={styles.row}>
          <View style={styles.imageContainer}>
            <Image
              source={ImageConstant.demo_img}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View style={styles.textContainer}>
            <CustomText style={styles.name} text={item?.patientInfo?.name} />
            <CustomText
              style={styles.description}
              text={`Test: ${
                item?.medicalTestLists?.[0]?.testName
                  ? item?.medicalTestLists?.[0]?.testName
                  : 'Prescription Uploaded'
              }`}
            />
            <CustomText
              style={styles.address}
              text={`Address: ${item?.patientInfo?.address}`}
              numberOfLines={2}
            />
          </View>
          <View style={styles.iconContainer}>
            <Icon name="chevron-right" size={24} color={theme.colors.primary} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleLoadMore = () => {
    console.log('Calling APi ');
    if (!isLoading) {
      const nextPage = page + 1;
      setPage(nextPage);
      setQueryParam([
        {
          name: 'page',
          value: nextPage,
        },
        {
          name: 'limit',
          value: limit,
        },
        {
          name: 'searchTerm',
          value: searchTerm,
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Loader isLoading={isLoading && page === 1} />
      <Header isBack={false} title="E-Appointment" />
      <Divider />
      {/* <Search isClick={false} setText={setSearchTerm} /> */}
      <FlatList
        contentContainerStyle={[styles.listContainer, styles.content]}
        data={[...allData].reverse()} // Create a new array to reverse
        refreshControl={<RefreshControl />}
        onRefresh={getAppionmentRefetch}
        renderItem={renderItem}
        refreshing={isLoading}
        keyExtractor={item => item?._id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoading && page > 1 ? <Loader isLoading={true} /> : null
        }
      />
    </View>
  );
};

export default BookTab;

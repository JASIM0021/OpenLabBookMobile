import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import StatusArea from '../../Components/Statusbar/StatusArea';
import Search from '../../Components/Search/Search';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../Components/header/Header';
import { Divider, useTheme } from 'react-native-paper';
import CustomText from '../../Components/Text';
import GolbalStyle from '../../Style';

import SearchLostItem from '../../Components/ListItem/SearchLostItem';
import { responsiveHeight } from '../../themes';
import BottomCardSwiper from '../../Components/Bottomcard/BottomCardSwiper';
import { useGetSearchResultQuery } from '../../features/api/service/medecalService';

const SearchScreen = () => {
  const [query, setQueryParams] = useState({
    page: 1,
    limit: 100,
    searchTerm: '',
  });

  const [searchText, setSearchText] = useState('');

  const { data, isLoading } = useGetSearchResultQuery({
    queryParams: [
      { name: 'page', value: Number(query.page) },
      { name: 'limit', value: query.limit },
      { name: 'searchTerm', value: searchText },
      // { name: 'sortBy', value: order },
      // { name: 'sortDir', value: orderBy },
    ],
  });

  console.log('data', data);
  const theme = useTheme();
  const styles = StyleSheet.create({
    listContainer: {
      justifyContent: 'space-between',
    },
    list: {
      rowGap: 4,
    },
    price: {
      flexDirection: 'row',
      columnGap: 10,
      justifyContent: 'space-between',
    },
    btnCart: {
      backgroundColor: '#F0F8FE',
      height: responsiveHeight,
      position: 'absolute',
      bottom: 10,
      left: 0,
      right: 0,
    },
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <Header isBack={true} title="Search" />
      <View
        style={{
          paddingHorizontal: 16,
          columnGap: 10,
        }}
      >
        <Search isClick={false} onTextChange={setSearchText} />
        <CustomText
          text="Found 3 test results"
          color={theme.colors.primary}
          size="md"
          bold="bold"
        />
        <Divider style={[GolbalStyle.mtMD]} />

        <View style={[styles.listContainer, GolbalStyle.mtMD]}>
          <FlatList
            data={data?.data}
            renderItem={({ item }) => {
              return <SearchLostItem />;
            }}
          />
        </View>
      </View>
      {/* <View style={styles.btnCart}> */}
      <BottomCardSwiper />
      {/* </View> */}
    </View>
  );
};

export default SearchScreen;

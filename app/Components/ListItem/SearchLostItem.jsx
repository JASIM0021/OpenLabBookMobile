import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import GolbalStyle from '../../Style';
import { Divider, useTheme } from 'react-native-paper';
import CustomText from '../Text';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SearchLostItem = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    listContainer: {},
    list: {
      rowGap: 4,
      padding: 5,
    },
    price: {
      flexDirection: 'row',
      columnGap: 10,
      justifyContent: 'space-between',
    },
  });
  return (
    <View style={styles.list}>
      <CustomText text="Blood group test" bold="bold" />
      <CustomText
        text="Clinic: Burdwan Scan Center PVT. LTD"
        bold="bo300ld"
        size="sm"
      />
      <CustomText
        text="7, R.B. Ghosh Rd, Shyamlal Colony, Khosbagan, Bardhaman, West Bengal 713101"
        bold="bo300ld"
        size="sm"
      />
      <View style={styles.price}>
        <View style={GolbalStyle.row}>
          <CustomText text="₹ 1000/-" bold="200" size="sm" />
          <CustomText text="₹ 800/-" bold="bold" size="sm" />
          <CustomText
            text="30% Discount/-"
            bold="bold"
            size="sm"
            color={theme.colors.secondary}
          />
        </View>
        <TouchableOpacity style={GolbalStyle.row}>
          <CustomText text="Add" bold="bold" />
          <MaterialIcons
            name="add-circle"
            size={20}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      </View>
      <Divider style={GolbalStyle.mtMD} bold />
    </View>
  );
};

export default SearchLostItem;

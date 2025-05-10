import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import CustomText from '../Text';
import GolbalStyle from '../../Style';
import ImageConstant from '../../Constant/ImageConstant';
import { responsiveHeight } from '../../themes';
import { useTheme } from 'react-native-paper';

const CartItem = ({ item }) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    cartItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      backgroundColor: theme.colors.background,
      borderRadius: 10,
      elevation: 3,
      margin: 5,
    },
    cartItemImage: {
      width: responsiveHeight + 20,
      height: responsiveHeight + 20,
      marginRight: 10,
      borderWidth: 1,
      borderRadius: responsiveHeight + 20 / 1.2,
    },
    cartItemDetails: {
      flexDirection: 'column',
    },
  });
  return (
    <View style={styles.cartItemContainer}>
      <Image
        source={ImageConstant.demo_img}
        style={styles.cartItemImage}
        resizeMethod="resize"
        resizeMode="contain"
      />
      <View style={styles.cartItemDetails}>
        <CustomText text={item.name} bold="bold" />
        <CustomText text={`Price: ${item.price}`} />
      </View>
    </View>
  );
};

export default CartItem;

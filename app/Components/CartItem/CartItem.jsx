import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomText from '../Text';
import Hstack from '../Hstack/Hstack';
import CustomButton from '../CustomButton/CustomButton';
import Vstack from '../Vstack/Vstack';
import { useTheme } from 'react-native-paper';
import ImageConstant from '../../Constant/ImageConstant';
import { screenWidth } from '../../themes';
import FastImage from 'react-native-fast-image';

const CartItem = ({
  test,
  address,
  originalPrice,
  dicountedPrice,
  onDelete,
  item,
}) => {
  console.log('item', item);
  const theme = useTheme();

  return (
    <View
      style={{
        padding: 10,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.background,
        borderRadius: 10,
      }}
    >
      <Hstack gap={10}>
        <FastImage
          style={{ width: 120, height: 120 }}
          source={
            item?.medicalTestBanner
              ? { uri: item?.medicalTestBanner }
              : ImageConstant.demo_img
          }
          defaultSource={ImageConstant.demo_img}
        />
        <Vstack gap={6}>
          <CustomText text={test} bold="500" size="lg" width={200} />
          <CustomText
            text={item?.organization?.organizationName}
            bold="400"
            size="sm"
            // width={screenWidth - 120}
          />
          <CustomText
            text={item?.organization?.organizationAddress}
            bold="400"
            size="sm"
            width={screenWidth - 160}
          />
          <CustomText
            text={`code: ${item?.testCode}`}
            style={styles.testDescription}
          />

          <Hstack>
            <CustomText
              text={`₹ ${originalPrice}`}
              bold="500"
              size="md"
              // textDecorationLine={'line-through'}
            />
            <CustomText
              text={`₹ ${dicountedPrice}`}
              bold="500"
              size="md"
              textDecorationLine={'line-through'}
            />
          </Hstack>
        </Vstack>
      </Hstack>
      <Hstack gap={10} marginTop={10}>
        <CustomButton
          onPress={onDelete && onDelete}
          label={'Remove'}
          width={'100%'}
          borderRadius={6}
          backgroundColor={'transparent'}
          labelColor={'red'}
          borderWidth={1}
          borderColor={'red'}
          marginTop={10}
          rippleColor={'red'}
        />
      </Hstack>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({});

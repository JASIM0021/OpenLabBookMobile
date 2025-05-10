import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { Appbar, Divider, TouchableRipple, useTheme } from 'react-native-paper';
import CustomText from '../Text';
import useNavigationHelper from '../../screens/helper/NavigationHelper';
import { Image } from 'react-native';
import ImageConstant from '../../Constant/ImageConstant';
import GolbalStyle from '../../Style';
import { screenWidth } from '../../themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomTextInput from '../Input/CustomTextInput';
import { scale, verticalScale } from 'react-native-size-matters';
const Header = ({
  isHome,
  title = 'Screen Name',
  isShop,
  isBack = true,
  isPhone,
  bg,
  tint,
  onBackClick,
}) => {
  const theme = useTheme();
  const navigate = useNavigationHelper();
  const onBackPress = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate.back();
    }
  };

  const onPhoneCall = async () => {
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

  const handleCart = () => {
    // navigate.push({
    //   screen: 'CartScreen',
    // });
    Linking.openURL(`whatsapp://send?phone=+918116182108}`);
  };

  return (
    <Appbar.Header
      style={{ backgroundColor: bg ? bg : theme.colors.background }}
    >
      <View
        style={{
          ...GolbalStyle.row,
          justifyContent: 'space-between',
          width: '100%',
          padding: 10,
        }}
      >
        {isBack ? (
          <TouchableOpacity onPress={onBackPress}>
            <View style={GolbalStyle.row}>
              <Ionicons
                name="arrow-back"
                size={scale(20)}
                color={tint ? tint : theme.colors.text}
              />
              <CustomText
                text={title}
                bold="bold"
                spacing={0}
                size="md"
                color={tint && tint}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <View style={GolbalStyle.row}>
            <Image source={ImageConstant.logo} style={GolbalStyle.logo} />
            <CustomText
              text={'OpenLabBookMobile'}
              bold={'bold'}
              spacing={1.5}
              size="md"
              color={theme.colors.primary}
            />
          </View>
        )}

        <View style={[GolbalStyle.row, { columnGap: 20 }]}>
          {isShop && (
            <TouchableRipple onPress={handleCart}>
              {/* <Image source={ImageConstant.shop} style={GolbalStyle.icon_sm} /> */}
              <Ionicons
                name="logo-whatsapp"
                size={scale(20)}
                color={tint ? tint : theme.colors.text}
              />
            </TouchableRipple>
          )}
          {isPhone && (
            <TouchableRipple onPress={onPhoneCall}>
              <Image source={ImageConstant.call} style={GolbalStyle.icon_sm} />
            </TouchableRipple>
          )}
        </View>
      </View>
    </Appbar.Header>
  );
};

export default Header;

const styles = StyleSheet.create({});

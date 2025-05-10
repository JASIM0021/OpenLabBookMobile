import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  RefreshControl,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import GolbalStyle from '../../Style';
import Header from '../../Components/header/Header';
import Vstack from '../../Components/Vstack/Vstack';
import Hstack from '../../Components/Hstack/Hstack';
import ImageConstant from '../../Constant/ImageConstant';
import { Modal, useTheme } from 'react-native-paper';
import CustomText from '../../Components/Text';
import CustomButton from '../../Components/CustomButton/CustomButton';
import { screenWidth } from '../../themes';
import CartItem from '../../Components/CartItem/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart } from '../../features/slice/GlobalSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useNavigationHelper from '../helper/NavigationHelper';
import {
  useGetAllCartMutation,
  useRemoveAllCartItemMutation,
  useRemoveCartItemMutation,
} from '../../features/api/cart/cart.api';
import Loader from '../../Components/Loader/Loader';
import { SCREEN_NAME } from '../../Constant';
const CartScreen = () => {
  const { cartItem } = useSelector(state => state.globalReducer);

  const [useGetAllCartQuery, { data, isLoading, isError }] =
    useGetAllCartMutation();

  const [
    removecartItem,
    { data: removeCartData, isLoading: cartDeleteLoading },
  ] = useRemoveCartItemMutation();

  const [deleteModel, setDeleteModel] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    useGetAllCartQuery();
  }, []);

  const navigation = useNavigationHelper();
  const [
    deleteAllCartData,
    {
      data: deleteAllCart,
      isLoading: loadingDeleteAllCart,
      error: errorDeleteAllCart,
    },
  ] = useRemoveAllCartItemMutation();
  const onDelete = item => {
    // Alert.alert(
    //   'Confirm Deletion',
    //   'Are you sure you want to delete this item from the cart?',
    //   [
    //     {
    //       text: 'Cancel',
    //       onPress: () => console.log('Cancel Pressed'),
    //       style: 'cancel',
    //     },
    //     {
    //       text: 'Delete',
    //       onPress: () => dispatch(deleteFromCart(item)),
    //     },
    //   ],
    // );
    setDeleteItem(item);

    setDeleteModel(true);
  };

  const confirmDelete = () => {
    // dispatch(deleteFromCart(deleteItem));
    removecartItem({ testCode: deleteItem?.testCode }).then(() => {
      useGetAllCartQuery();
    });

    setDeleteModel(false);
  };

  const navigateToPatientDetails = () => {
    navigation.push({
      screen: SCREEN_NAME.PatientDetails,
      data: {
        isCart: true,
      },
    });
  };

  console.log('data', data);
  const navigatation = useNavigationHelper();

  return (
    <View
      style={[
        GolbalStyle.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Loader isLoading={isLoading || cartDeleteLoading} />
      <Header isHome={false} title="Your Test List" />
      <ScrollView
        contentContainerStyle={{ rowGap: 10, padding: 10 }}
        refreshControl={
          <RefreshControl
            onRefresh={useGetAllCartQuery}
            refreshing={isLoading}
          />
        }
      >
        {data?.data?.cartItems?.length === 0 ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
            }}
          >
            <MaterialCommunityIcons
              name="cart-off"
              size={50}
              color={theme.colors.primary}
            />
            <CustomText
              text="No items in cart"
              style={{ marginVertical: 10 }}
            />
            <CustomButton
              label="Add Items"
              onPress={() => {
                /* Navigate to add items screen */
                navigatation.push({
                  screen: 'HomeTab',
                });
              }}
              borderRadius={6}
            />
          </View>
        ) : (
          data?.data?.cartItems?.map((item, index) => {
            console.log('item', item);
            return (
              <CartItem
                key={index + 'keyitem'}
                originalPrice={item?.discountedPrice}
                dicountedPrice={item?.mrp}
                test={item?.testName}
                address={item?.organizationAddress}
                item={item}
                onDelete={() => onDelete(item)}
              />
            );
          })
        )}
      </ScrollView>

      {/*  Pricing and Order Summary */}
      {data?.data?.cartItems?.length >= 1 && (
        <View
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: theme.colors.primary,
            borderRadius: 10,
          }}
        >
          <Vstack
            gap={10}
            style={{
              width: '100%',
            }}
          >
            <CustomText text="Price Details" bold="bold" />
            <Hstack justifyContent="space-between" style={{ width: '100%' }}>
              <CustomText
                text={`Price ( ${data?.data?.cartItems?.length} Test )`}
              />
              <CustomText text={`₹ ${data?.data?.price}`} />
            </Hstack>
            <Hstack justifyContent="space-between" style={{ width: '100%' }}>
              <CustomText text="Discounted Amount" />
              <CustomText
                text={`- ₹ ${data?.data?.discountedPrice}`}
                color={theme.colors.primary}
              />
            </Hstack>
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: theme.colors.primary,
              }}
            />
            <Hstack justifyContent="space-between" style={{ width: '100%' }}>
              <CustomText text="Total Amount" bold="bold" />
              <CustomText text={` ₹ ${data?.data?.totalPrice}`} bold="bold" />
            </Hstack>
          </Vstack>

          <CustomButton
            label={'Continue'}
            borderRadius={6}
            marginTop={10}
            onPress={navigateToPatientDetails}
          />
        </View>
      )}

      {/* /\Delete cofirm model */}
      <Modal
        visible={deleteModel}
        onDismiss={() => setDeleteModel(false)}
        dismissable
        onTouchOutside={() => setDeleteModel(false)} // Added to dismiss modal on outside click
      >
        <View style={[GolbalStyle.center, { padding: 10 }]}>
          <Vstack
            gap={10}
            style={{
              backgroundColor: 'white',
              width: '100%',
              borderRadius: 10,
              padding: 10,
            }}
            alignItems="center"
          >
            <MaterialCommunityIcons
              name="information"
              size={120}
              color={theme.colors.error}
            />
            <CustomText text="Remove Test" bold="bold" size="lg" />
            <CustomText
              text="Are you sure you wish to remove Test?"
              bold="600"
              size="md"
            />
            <Hstack gap={40} style={{ width: '100%' }} justifyContent="center">
              <CustomButton
                label={'Cancel'}
                labelColor={'black'}
                borderColor="gray"
                borderWidth={1}
                borderRadius={10}
                backgroundColor={'white'}
                height={50}
                width={120}
                onPress={() => setDeleteModel(false)}
              />
              <CustomButton
                label={'REMOVE'}
                labelColor={theme.colors.error}
                borderColor={theme.colors.error}
                borderWidth={1}
                borderRadius={10}
                backgroundColor={'white'}
                height={50}
                width={120}
                onPress={confirmDelete}
              />
            </Hstack>
          </Vstack>
        </View>
      </Modal>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});

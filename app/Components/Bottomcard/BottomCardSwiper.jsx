import React, { useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  PanResponder,
  ScrollView,
} from 'react-native';
import CustomText from '../Text';
import GolbalStyle from '../../Style';
import { responsiveHeight } from '../../themes';
import { useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CartItem from '../Cart/CartItem';

const BottomCardSwiper = () => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false); // State to track FlatList scrolling
  const [cartItems] = useState([
    {
      id: 1,
      name: 'USG whole abdomen',
      price: '₹800',
      image: 'product1_image',
    },
    { id: 2, name: 'Product 2', price: '$20', image: 'product2_image' },
    { id: 3, name: 'Product 3', price: '$30', image: 'product3_image' },
  ]);

  const styles = StyleSheet.create({
    cartSection: {
      height: isExpanded ? responsiveHeight * 4 : responsiveHeight,
      backgroundColor: '#F0F8FE',
      position: 'absolute',
      bottom: 20,
      right: 0,
      left: 0,
      paddingHorizontal: 20,
      justifyContent: 'space-between',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      alignItems: 'center',
      flexDirection: 'row',
      overflow: 'hidden', // Prevent content overflow
    },
    cartItemsContainer: {
      flex: 1, // Allow the FlatList to expand within the container
      paddingVertical: 10,
    },
    buttonContainer: {
      height: responsiveHeight / 2,
      backgroundColor: theme.colors.primary,
      padding: 10,
      paddingHorizontal: 30,
      borderRadius: 10,
    },
  });

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !isExpanded, // Disable swipe when expanded or scrolling
      onPanResponderMove: Animated.event([null, { dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy > 0) {
          // Swipe down
          setIsExpanded(false);
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        } else {
          // Swipe up
          setIsExpanded(true);
          Animated.spring(pan, {
            toValue: { x: 0, y: responsiveHeight / 1.2 },
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  // Handle collapsing using the down arrow icon
  const collapseCart = () => {
    setIsExpanded(false);
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[styles.cartSection, { transform: [{ translateY: pan.y }] }]}
    >
      {!isExpanded ? (
        <>
          <TouchableOpacity>
            <View style={GolbalStyle.row}>
              <CustomText text={`1 Test | `} bold="bold" />
              <CustomText text={`Select`} />
              <MaterialCommunityIcons
                name="arrow-up-drop-circle"
                size={22}
                color={theme.colors.primary}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonContainer}>
            <CustomText text="View Cart" bold="bold" color="white" />
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.cartItemsContainer}>
          <View
            style={{
              width: '100%',
              height: responsiveHeight / 1.5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: styles.cartSection.backgroundColor,
            }}
          >
            {/* Down Arrow for Collapsing */}
            <TouchableOpacity onPress={collapseCart}>
              <View style={GolbalStyle.row}>
                <CustomText text={`1 Test | `} bold="bold" />
                <CustomText text={`Select`} />
                <MaterialCommunityIcons
                  name="arrow-down-drop-circle"
                  size={22}
                  color={theme.colors.primary}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainer}>
              <CustomText text="View Cart" bold="bold" color="white" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={cartItems}
            contentContainerStyle={{
              width: '100%',
              paddingBottom: responsiveHeight * 2,
            }}
            renderItem={({ item }) => <CartItem item={item} />}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            scrollEnabled={isExpanded} // Enable scrolling only when expanded
            onScrollBeginDrag={() => setIsScrolling(true)} // Set scrolling state to true
            onScrollEndDrag={() => setIsScrolling(false)} // Set scrolling state to false
          />
        </View>
      )}
    </Animated.View>
  );
};

export default BottomCardSwiper;

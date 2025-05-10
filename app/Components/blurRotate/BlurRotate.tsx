import * as React from 'react';
import { Image, View } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

import { Arrow, ArrowDirection } from './Arrow';
import { HEADER_HEIGHT, window } from '../../Constant/Constent';
import { responsiveHeight, responsiveWidth } from '../../themes';
import CustomText from '../Text';
import { useTheme } from 'react-native-paper';
import ImageConstant from '../../Constant/ImageConstant';

function Bluerparalel({ data = [] }) {
  const headerHeight = 100;
  const PAGE_WIDTH = window.width;
  const PAGE_HEIGHT = window.height - HEADER_HEIGHT;
  const directionAnim = useSharedValue<ArrowDirection>(
    ArrowDirection.IS_VERTICAL,
  );
  const [isVertical, setIsVertical] = React.useState(true);

  const theme = useTheme();
  const animationStyle: any = React.useCallback(
    (value: number) => {
      'worklet';
      const translateY = interpolate(value, [-1, 0, 1], [-PAGE_HEIGHT, 0, 0]);

      const translateX = interpolate(value, [-1, 0, 1], [-PAGE_WIDTH, 0, 0]);

      const zIndex = interpolate(value, [-1, 0, 1], [300, 0, -300]);

      const scale = interpolate(value, [-1, 0, 1], [1, 1, 0.85]);

      return {
        transform: [isVertical ? { translateY } : { translateX }, { scale }],
        zIndex,
      };
    },
    [PAGE_HEIGHT, PAGE_WIDTH, isVertical],
  );

  useAnimatedReaction(
    () => directionAnim.value,
    direction => {
      switch (direction) {
        case ArrowDirection.IS_VERTICAL:
          runOnJS(setIsVertical)(true);
          break;
        case ArrowDirection.IS_HORIZONTAL:
          runOnJS(setIsVertical)(false);
          break;
      }
    },
    [],
  );

  return (
    <View style={{}}>
      <Carousel
        loop
        style={{
          // width: responsiveWidth * 4,
          // height: responsiveHeight * 4,
          // flex: 1,
          // justifyContent: 'center',
          // alignItems: 'center',
          backgroundColor: theme.colors.background,
        }}
        vertical={isVertical}
        width={responsiveWidth + 300}
        height={responsiveWidth + 400}
        data={[1, ...data]}
        renderItem={({ index, animationValue, item }) =>
          // <Item
          //   key={index}
          //   index={index}
          //   animationValue={animationValue}
          //   directionAnim={directionAnim}
          // />
          index == 0 ? (
            <Item
              index={index}
              animationValue={animationValue}
              directionAnim={directionAnim}
            />
          ) : (
            <CardItem
              item={item}
              index={index}
              animationValue={animationValue}
              directionAnim={directionAnim}
            />
          )
        }
        customAnimation={animationStyle}
      />
    </View>
  );
}

const CardItem: React.FC<{
  item: any;
  index: number;
  animationValue: Animated.SharedValue<number>;
  directionAnim: Animated.SharedValue<ArrowDirection>;
}> = ({ item, animationValue, directionAnim }) => {
  console.log('item', item);
  const maskStyle = useAnimatedStyle(() => {
    const zIndex = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [300, 0, -300],
    );

    const backgroundColor = interpolateColor(
      animationValue.value,
      [-1, 0, 1],
      ['transparent', 'transparent', 'rgba(0,0,0,0.3)'],
    );

    return {
      backgroundColor,
      zIndex,
    };
  }, [animationValue]);

  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.colors.secondary,

        elevation: 5,
        shadowColor: 'gray',
        shadowOpacity: 1,
        // shadowRadius: 60,
        // shadowOffset: {
        //   width: 0.1,
        //   height: 0.1,
        // },
        flex: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.primary,
      }}
    >
      <Animated.View
        style={[
          maskStyle,
          {
            width: '100%',
            height: '100%',
            alignItems: 'center',
            padding: 10,
            rowGap: 16,
          },
        ]}
      >
        <Image
          style={{
            width: responsiveWidth + 160,
            height: responsiveHeight + 100,
            resizeMode: 'contain',
          }}
          source={ImageConstant.doctor}
        />
        <CustomText
          text={item?.orgName}
          bold="bold"
          size="lg"
          textAlign="center"
          color={theme.colors.textTitle}
        />
        <CustomText
          text={item?.description}
          size="sm"
          color="white"
          textAlign="center"
        />
        <View
          style={{
            flexDirection: 'row',
            columnGap: 10,
            justifyContent: 'space-between',
          }}
        >
          <CustomText
            text="Price: "
            size="lg"
            bold="bold"
            color="white"
            textAlign="center"
          />
          <CustomText
            text={`₹ ${item?.price}/-`}
            size="lg"
            bold="bold"
            color="white"
            textAlign="center"
          />
        </View>
      </Animated.View>
    </View>
  );
};

const Item: React.FC<{
  index: number;
  animationValue: Animated.SharedValue<number>;
  directionAnim: Animated.SharedValue<ArrowDirection>;
}> = ({ animationValue, directionAnim }) => {
  const maskStyle = useAnimatedStyle(() => {
    const zIndex = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [300, 0, -300],
    );

    const backgroundColor = interpolateColor(
      animationValue.value,
      [-1, 0, 1],
      ['transparent', 'transparent', 'rgba(0,0,0,0.3)'],
    );

    return {
      backgroundColor,
      zIndex,
    };
  }, [animationValue]);

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Animated.View
        style={[
          maskStyle,
          { position: 'absolute', width: '100%', height: '100%' },
        ]}
      />
      <Arrow directionAnim={directionAnim} />
    </View>
  );
};

export default Bluerparalel;

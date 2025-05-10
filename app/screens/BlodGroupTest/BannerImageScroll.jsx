import * as React from 'react';
import {
  ScrollView,
  Image,
  Dimensions,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSharedValue } from 'react-native-reanimated';

const PAGE_WIDTH = Dimensions.get('window').width;

function BannerImageScroll({ images }) {
  const windowWidth = Dimensions.get('window').width;
  const scrollOffsetValue = useSharedValue(0);

  // Define carousel options
  const baseOptions = {
    vertical: false,
    width: windowWidth,
    height: 100, // Fixed height of 100 units
  };

  // Check if images are passed
  if (!images || images.length === 0) {
    return (
      <SafeAreaView edges={['top']} style={styles.container}>
        <Text>No images available</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <Carousel
        {...baseOptions}
        loop
        enabled
        defaultScrollOffsetValue={scrollOffsetValue}
        style={styles.carousel}
        autoPlay={false}
        autoPlayInterval={2000}
        data={images}
        onScrollStart={() => console.log('Scroll started')}
        onScrollEnd={() => console.log('Scroll ended')}
        onConfigurePanGesture={g => g.enabled(false)}
        pagingEnabled={true}
        onSnapToItem={index => console.log('Current index:', index)}
        renderItem={({ index }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: images[index] }} style={styles.image} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carousel: {
    width: '100%',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  scrollView: {
    flex: 1,
  },
});

export default BannerImageScroll;

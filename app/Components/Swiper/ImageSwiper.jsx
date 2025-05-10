import React, { useRef, useState, useEffect } from 'react';
import { View, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const ImageSwiper = ({
  images = [],
  imageHeight = 300,
  imageWidth = screenWidth,
  autoScroll = true,
  scrollInterval = 3000,
  showPagination = true,
  onImagePress = null,
}) => {
  const scrollViewRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (autoScroll) {
      const interval = setInterval(() => {
        if (scrollViewRef.current) {
          let nextIndex = (activeIndex + 1) % images.length;
          scrollViewRef.current.scrollTo({ x: nextIndex * imageWidth, animated: true });
          setActiveIndex(nextIndex);
        }
      }, scrollInterval);

      return () => clearInterval(interval);
    }
  }, [activeIndex, autoScroll, scrollInterval, imageWidth]);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / imageWidth);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {images.map((image, index) => (
          <TouchableOpacity key={index} onPress={() => onImagePress && onImagePress(index)}>
            <Image source={{ uri: image }} style={[styles.image, { height: imageHeight, width: imageWidth }]} resizeMode="cover" />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {showPagination && (
        <View style={styles.pagination}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                { opacity: activeIndex === index ? 1 : 0.5 },
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    width: screenWidth,
  },
  image: {
    height: 300,
    width: screenWidth,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  paginationDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    margin: 5,
  },
});

export default ImageSwiper;

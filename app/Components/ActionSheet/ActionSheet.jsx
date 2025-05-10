import React, { useRef } from 'react';
import {
  Animated,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  PanResponder,
} from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

const ActionSheet = ({ isVisible, onClose, children }) => {
  const panY = useRef(new Animated.Value(screenHeight)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dy: panY }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy > 0) {
          closeActionSheet();
        } else {
          Animated.spring(panY, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  const closeActionSheet = () => {
    Animated.timing(panY, {
      toValue: screenHeight,
      duration: 300,
      useNativeDriver: false,
    }).start(onClose);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeActionSheet}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPressOut={closeActionSheet}
      >
        <Animated.View
          {...panResponder.panHandlers}
          style={[styles.container, { transform: [{ translateY: panY }] }]}
        >
          <View style={styles.bar} />
          <View style={styles.contentContainer}>{children}</View>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: 'white',
    paddingTop: 12,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    minHeight: 200,
    maxHeight: screenHeight * 0.5,
    paddingHorizontal: 16,
  },
  bar: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginBottom: 8,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ActionSheet;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Animated,
  NativeModules,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import useNavigationHelper from '../../helper/NavigationHelper';

const { SharedPreferencesModule } = NativeModules;

const UserRoleSelectionScreen = () => {
  const navigation = useNavigationHelper();
  const [selectedRole, setSelectedRole] = useState('');
  const animation = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleRoleSelection = async role => {
    setSelectedRole(role);
    if (role === 'admin') {
      await AsyncStorage.setItem('userRole', role);
      navigation.push({
        screen: 'AdminLogin',
      });
    } else {
      navigation.push({
        screen: 'Login',
      });
    }
  };

  const animatedStyles = {
    opacity: animation,
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
    ],
  };

  return (
    <ImageBackground
      source={ImagePath.RegistrationBg}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <Animated.View style={[styles.container, animatedStyles]}>
          <Text style={styles.title}>Select Your Role</Text>

          <TouchableOpacity
            onPress={() => handleRoleSelection('admin')}
            style={styles.buttonContainer}
          >
            <LinearGradient
              colors={['#FF5733', '#C70039']}
              style={styles.button}
            >
              <Icon name="shield" size={24} color="#fff" style={styles.icon} />
              <Text style={styles.buttonText}>Admin</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleRoleSelection('client')}
            style={styles.buttonContainer}
          >
            <LinearGradient
              colors={['#3498DB', '#1E90FF']}
              style={styles.button}
            >
              <Icon name="user" size={24} color="#fff" style={styles.icon} />
              <Text style={styles.buttonText}>Client</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default UserRoleSelectionScreen;

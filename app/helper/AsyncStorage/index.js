import AsyncStorage from '@react-native-async-storage/async-storage';
export default {
  setToken: async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`authToken`, jsonValue);
    } catch (e) {
      console.log(e);
    }
  },

  set: async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`${key}`, jsonValue);
    } catch (e) {
      console.log(e);
    }
  },
  get: async key => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  },

  sevLocation: async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`selectedLocation`, jsonValue);
    } catch (e) {
      console.log(e);
    }
  },
  getLocation: async value => {
    try {
      const jsonValue = await AsyncStorage.getItem('selectedLocation');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  },
  getToken: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('authToken');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log('e', e);
    }
  },

  setUser: async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`user`, jsonValue);
      // console.log("user successfully saved in localstorage")
    } catch (e) {
      console.log(e);
    }
  },

  getUser: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log('e', e);
    }
  },
  clearAll: () => {
    AsyncStorage.clear();
  },
};

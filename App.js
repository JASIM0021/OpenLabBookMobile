import {
  LogBox,
  Platform,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './app/Navigations/AuthNavigation.js';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './app/features/Store.js';

// import auth from '@react-native-firebase/auth';
import HomeNavigation from './app/Navigations/HomeNavigation.js';

import { useDispatch } from 'react-redux';
import { darkTheme, lightTheme } from './app/themes/index.js';
import { GlobalStateProvider } from './app/Context/GlobalContext.jsx';
import FlashMessage from 'react-native-flash-message';
import AsyncStorageCustom from './app/helper/AsyncStorage/index.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Loader from './app/Components/Loader/Loader.jsx';
import * as QuickActions from 'expo-quick-actions';
import { useQuickAction } from 'expo-quick-actions/hooks';

const linking = {
  prefixes: ['OpenLabBookMobile://'], // Custom URL Scheme
  config: {
    screens: {
      FeedbackScreen: 'feedback',
    },
  },
};
LogBox.ignoreAllLogs();

//-------------------------------------//
export default function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getToken();
    // deleteToken()
    // Clean-up function
    return () => {};
  }, []);
  const getToken = async () => {
    const token = await AsyncStorageCustom.getToken();
    setToken(token);
    setLoading(false);
    console.log('token', token);
  };

  const deleteToken = async () => {
    await AsyncStorage.clear();
  };
  // useEffect(() => {
  //   getToken();
  // }, []);

  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const action = useQuickAction();

  console.log('action', action);

  React.useEffect(() => {
    QuickActions.setItems([
      {
        title: 'Compose',
        icon: Platform.select({
          ios: 'symbol:heart',
          android: 'asset:shortcut_compose',
        }),
        id: 'compose',
        params: {
          href: '/compose',
        },
      },

      {
        id: '0',
        title: 'Open Settings',
        subtitle: 'Go here to configure settings',
        icon: 'heart',
        params: { href: '/settings' },
      },

      {
        title: 'Demo',
        icon: Platform.select({
          ios: 'shortcut_two',
          default: 'shortcut_three',
        }),
        id: 'three',
      },
    ]);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <SafeAreaProvider>
            <Loader isLoading={loading} />
            <StatusBar
              animated={true}
              backgroundColor={
                colorScheme === 'dark'
                  ? darkTheme.colors.background
                  : lightTheme.colors.background
              }
              barStyle={
                colorScheme === 'dark' ? 'dark-content' : 'light-content'
              }
              showHideTransition="slide"
              hidden={false}
            />
            <NavigationContainer>
              {}
              {token ? <HomeNavigation /> : <AuthNavigation />}
              <FlashMessage position="top" />
            </NavigationContainer>
          </SafeAreaProvider>
        </PaperProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

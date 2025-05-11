import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '../../helper/AsyncStorage';

// let url = "https://android-manager.onrender.com";
// let url=" https://liberal-salmon-enormously.ngrok-free.app"
// let url=
let url = {
  // http://192.168.114.113
  url_dev: 'http://localhost:5001/api/v1/',
  url_prod: 'http://43.204.234.134:5001/api/v1/',
};
let API_URL = url[__DEV__ ? 'url_dev' : 'url_prod'];

const globalApiSlice = createApi({
  reducerPath: 'erm',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async (headers, { getState, endpoint }) => {
      const token = await AsyncStorage.getToken();
      console.log('token', token);
      if (token) {
        headers.set('authorization', token);
      }

      return headers;
    },
  }),
  tagTypes: ['erm', 'getandpost'],
  endpoints: builder => ({}),
});

export default globalApiSlice;

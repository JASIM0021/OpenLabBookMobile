// AxiosInstance.js
import axios from 'axios';
import AsyncStorage from '../helper/AsyncStorage';

const baseURLs = {
  development: 'https://raahmatrimony.com/api',
  staging: 'https://staging-api.example.com',
  stable: 'https://stable-api.example.com',
};

const currentEnvironment = 'development';

const axiosInstance = async () => {
  const getToken = async () => {
    return await AsyncStorage.getToken();
  }

  const token = await getToken();

  return axios.create({
    baseURL: baseURLs[currentEnvironment],
    headers: {
      'Authorization': `Bearer ${token}`
    }
    // Other configurations here, such as headers, timeouts, etc.
  });
}

export default axiosInstance;

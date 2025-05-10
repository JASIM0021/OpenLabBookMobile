import axios from "axios";
import axiosInstance from "../AxiosInstance";
import { HttpMethod } from "../endpoint";
import AsyncStorage from "../../helper/AsyncStorage";

const baseURLs = {
  development: 'https://erm-auth-service.onrender.com/api/v1/',
  staging: 'https://erm-auth-service.onrender.com/api/v1/',
  stable: 'https://erm-auth-service.onrender.com/api/v1/',
};

const url = baseURLs['development']

export default {
    makeRequest : async (endpoint, data = null) => {
     
      console.log("api calling")

    let header = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }

      const token = await AsyncStorage.getToken();

      console.log('token', token)
          switch (endpoint.method) {
            case HttpMethod.GET:
              return await axios.get(url+endpoint.url,{
                headers:header
              })
            case HttpMethod.POST:
              if (data instanceof FormData) {
                return await axios.post(url+endpoint.url, data, {
                  headers:header ,
                });
              } else {
                return await axios.post(url+endpoint.url, data,{
                  headers:header
                });
              }
            case HttpMethod.PUT:
              return await axios.put(url+endpoint.url, data);
            case HttpMethod.DELETE:
              return await axios.delete(url+endpoint.url);
            default:
              throw new Error(`Unsupported HTTP method: ${url+endpoint.url}`);
          }
       
    }

}
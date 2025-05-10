import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from 'typesafe-actions';
import AsyncStorage from '../../helper/AsyncStorage';

const GlobalSlice = createSlice({
  name: 'global',
  initialState: {
    user: null,
    loader: false,
    error: null,
    patientDetails: {
      name: '',
      email: '',
      contactNumber: '',
      age: 18,
      sex: '',

      pinCode: '',
      address: '',
    },
    selectedTest: {},
    selectedService: {
      serviceName: '',
    },
    location: {},

    products: [
      {
        id: 1242352,
        name: 'demo1',
        price: 100,
        brand: 'jasim',
      },
    ],

    cartItem: [],
  },
  reducers: {
    saveLocation: (state, action) => {
      state.location = action.payload;
      AsyncStorage.sevLocation(action.payload);
    },
    saveService: (state, action) => {
      state.selectedService = action.payload;
      // AsyncStorage.sevLocation(action.payload);
    },

    savePatientDetails: (state, action) => {
      state.patientDetails = action.payload;
    },

    saveSelectedTest: (state, action) => {
      state.selectedTest = action.payload;
    },

    saveUser: (state, action) => {
      state.user = action.payload;
    },

    addToCart: (state, action) => {
      let find = state.cartItem.find(
        item => item.testCode === action.payload.testCode,
      );

      if (find) {
        find.quantity += 1;
      } else {
        state.cartItem.push(action.payload);
      }

      console.log('state.cartItem', state.cartItem);
    },

    deleteFromCart: (state, action) => {
      state.cartItem = state.cartItem.filter(
        item => item.id !== action.payload.id,
      );
    },

    registrationSuccess(state, action: any) {
      console.log('action', action);
      state.user = action.payload;
      state.error = null;
      state.loader = false;
    },
    registrationError(state, action: any) {
      console.log('action', action);
      state.user = null;
      state.error = action.payload;
      state.loader = false;
    },

    productFetchSuccess(state, action: any) {
      console.log('action', action);
      state.products = action.payload;
    },
    startLoading(state) {
      console.log('state', state);
      state.loader = true;
    },
    stopLoading(state) {
      state.loader = false;
    },
  },
});

export const {
  saveLocation,
  saveUser,
  registrationSuccess,
  registrationError,
  productFetchSuccess,
  startLoading,
  stopLoading,
  savePatientDetails,
  saveSelectedTest,
  addToCart,
  deleteFromCart,
  saveService,
} = GlobalSlice.actions;
export default GlobalSlice.reducer;

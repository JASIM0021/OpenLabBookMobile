import { configureStore, combineReducers, applyMiddleware, createStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';

import GlobalSlice from "./slice/GlobalSlice";
import globalApiSlice from "./api/globalApiSlice";









   export const store = configureStore({
    reducer: {
      // Add the generated reducer as a specific top-level slice
      globalReducer: GlobalSlice,
      [globalApiSlice.reducerPath]: globalApiSlice.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(globalApiSlice.middleware),
    
  })


export default store;





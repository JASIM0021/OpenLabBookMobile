// GlobalState.js
import React, { createContext, useState, useContext } from 'react';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <GlobalStateContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);

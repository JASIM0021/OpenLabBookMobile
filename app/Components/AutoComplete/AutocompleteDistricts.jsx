import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TextInput } from 'react-native';
import { List, useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { saveLocation } from '../../features/slice/GlobalSlice';
import { useGetAllAddressQuery } from '../../features/api/address/address.api';
import CustomText from '../Text';
const districts = {
  WestBengal: [
    { district: 'Alipurduar', latitude: 26.4871, longitude: 89.5271 },
    { district: 'Bankura', latitude: 23.2324, longitude: 87.0784 },
    { district: 'Birbhum', latitude: 23.8402, longitude: 87.6186 },
    { district: 'Cooch Behar', latitude: 26.3305, longitude: 89.4675 },
    { district: 'Dakshin Dinajpur', latitude: 25.1982, longitude: 88.7638 },
    { district: 'Darjeeling', latitude: 27.041, longitude: 88.2663 },
    { district: 'Hooghly', latitude: 22.8965, longitude: 88.2461 },
    { district: 'Howrah', latitude: 22.5958, longitude: 88.2636 },
    { district: 'Jalpaiguri', latitude: 26.5481, longitude: 88.7299 },
    { district: 'Jhargram', latitude: 22.4534, longitude: 86.9958 },
    { district: 'Kalimpong', latitude: 27.0683, longitude: 88.4657 },
    { district: 'Kolkata', latitude: 22.5726, longitude: 88.3639 },
    { district: 'Malda', latitude: 25.1786, longitude: 88.2461 },
    { district: 'Murshidabad', latitude: 24.1753, longitude: 88.2802 },
    { district: 'Nadia', latitude: 23.471, longitude: 88.5565 },
    { district: 'North 24 Parganas', latitude: 22.7237, longitude: 88.4753 },
    { district: 'Paschim Bardhaman', latitude: 23.685, longitude: 87.6904 },
    { district: 'Paschim Medinipur', latitude: 22.4249, longitude: 87.3199 },
    { district: 'Purba Bardhaman', latitude: 23.2324, longitude: 87.8615 },
    { district: 'Purba Medinipur', latitude: 22.0291, longitude: 87.7537 },
    { district: 'Purulia', latitude: 23.3322, longitude: 86.3659 },
    { district: 'South 24 Parganas', latitude: 22.1352, longitude: 88.4016 },
    { district: 'Uttar Dinajpur', latitude: 25.9825, longitude: 88.0868 },
  ],
};

const AutocompleteDistricts = () => {
  const dispatch = useDispatch();

  const { data, isLoading, isError, error } = useGetAllAddressQuery();

  const [query, setQuery] = useState('');
  const [filteredDistricts, setFilteredDistricts] = useState(
    data?.data ? data?.data : [],
  );

  const filterDistricts = input => {
    const filtered = data?.data?.filter(item =>
      item?.name?.toLowerCase().includes(input.toLowerCase()),
    );
    setFilteredDistricts(filtered);
  };

  const theme = useTheme();
  return (
    <View style={{ padding: 16, rowGap: 10 }}>
      <CustomText
        text="Please select your Location"
        textAlign="center"
        bold="bold"
        color={theme.colors.primary}
      />
      <TextInput
        placeholder="Search District"
        value={query}
        onChangeText={text => {
          setQuery(text);
          filterDistricts(text);
        }}
        style={styles.input}
        underlineColor="transparent"
        theme={{
          colors: {
            primary: '#6200ee',
            text: '#000',
            placeholder: '#999',
          },
        }}
      />
      {filteredDistricts?.length > 0 && (
        <FlatList
          data={data?.data}
          keyExtractor={item => item?.name}
          renderItem={({ item }) => (
            <List.Item
              title={item?.name}
              // description={`Latitude: ${item.latitude}, Longitude: ${item.longitude}`}
              onPress={() => {
                dispatch(saveLocation(item));
                setQuery(item.name);
                setFilteredDistricts([...data?.data]);
              }}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'transparent', // Hide background color
    borderWidth: 1,
    borderColor: '#6200ee',
    borderRadius: 10, // Add border radius for smooth corners
    paddingHorizontal: 8,
    paddingVertical: 4,
    height: 50,
  },
});

export default AutocompleteDistricts;

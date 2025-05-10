import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import GlobalStyle from '../../Style'; // Make sure the path is correct
import { useTheme } from 'react-native-paper';
import useNavigationHelper from '../../screens/helper/NavigationHelper';
import { SCREEN_NAME } from '../../Constant';

const Search = ({ isClick = true, setText }) => {
  const theme = useTheme();
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);

  console.log('searchText', searchText);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchText(searchText);
      setText(searchText);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchText]);

  useEffect(() => {
    if (debouncedSearchText) {
      // console.log('Debounced searchText:', debouncedSearchText);
    }
  }, [debouncedSearchText]);

  const styles = StyleSheet.create({
    container: {
      paddingVertical: 10,
      width: '100%',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      borderRadius: 5,
      padding: 5,
    },
    icon: {
      marginHorizontal: 5,
      position: 'absolute',
      left: 10,
      zIndex: 9999,
    },
    input: {
      flex: 1,
      justifyContent: 'center',
      color: theme.colors.primary,
      alignItems: 'center',
      paddingLeft: 50,
      borderColor: theme.colors.primary,
    },
  });

  const colorScheme = useColorScheme();
  const navigation = useNavigationHelper();
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <AntDesign
          name="search1"
          size={20}
          color={theme.colors.primary}
          style={styles.icon}
        />
        <TextInput
          value={searchText} // Added value prop
          onChangeText={text => {
            setSearchText(text);
          }}
          onPressIn={
            isClick
              ? () => {
                  navigation.push({
                    screen: SCREEN_NAME.Search,
                    data: searchText,
                  });
                }
              : () => {}
          }
          style={[
            isClick
              ? GlobalStyle.txtRounded
              : {
                  ...GlobalStyle.txtRounded,
                  borderRadius: 16,
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                },
            styles.input,
          ]}
          placeholder="Search Test, Organization or Diagnosis"
          placeholderTextColor={theme.colors.primary}
        />
      </View>
    </View>
  );
};

export default Search;

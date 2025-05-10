import * as React from 'react';
import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  TouchableOpacity,
  Alert, // Import Alert for more options
} from 'react-native';
import {
  Appbar,
  BottomNavigation,
  Card,
  Chip,
  Text,
  useTheme,
} from 'react-native-paper';
import GolbalStyle from '../../Style';
import CustomText from '../../Components/Text';
import Header from '../../Components/header/Header';
import Search from '../../Components/Search/Search';
import CustomCards from '../../Components/Cards/CustomCards';
import { darkTheme, lightTheme, responsiveHeight } from '../../themes';
import ScrollViewHelper from '../../Components/ScrollViewHelper/ScrollViewHelper';
import HomeTab from './Tabs/Home/HomeTab';
import BookTab from './Tabs/book/BookTab';
import { useRoute } from '@react-navigation/native';
import Profile from '../Profile/Profile';
import CartScreen from '../cart/CartScreen';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing icon library
import MoreDetails from '../MoreDetails/MoreDetails';

const TabLayout = ({ navigation }) => {
  const route = useRoute();

  const initialIndex = route?.params?.data?.index ?? 0;
  console.log('_index', initialIndex);
  const [index, setIndex] = React.useState(initialIndex);
  console.log('index', index);
  const [routes] = React.useState([
    {
      key: 'home',
      title: 'Book a Test',
      focusedIcon: 'calendar',
      unfocusedIcon: 'calendar-outline',
    },
    {
      key: 'book',
      title: 'Booking History',
      focusedIcon: 'view-list',
      unfocusedIcon: 'view-list-outline',
    },
    {
      key: 'Profile',
      title: 'Profile',
      focusedIcon: 'account',
      unfocusedIcon: 'account-outline',
    },
    {
      key: 'MoreDetails',
      title: 'More',
      focusedIcon: 'unfold-more-vertical',
      unfocusedIcon: 'unfold-more-horizontal',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeTab,
    // home: CartScreen,
    book: BookTab,
    Profile: Profile,
    MoreDetails: MoreDetails,
  });
  const theme = useTheme();

  // Handle route param changes
  React.useEffect(() => {
    if (route?.params?.data?.index !== undefined) {
      setIndex(route.params.data.index);
    }
  }, [route.params]);

  return (
    <View style={{ flex: 1 }}>
      <BottomNavigation
        barStyle={{ backgroundColor: theme.colors.background }}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        // sceneAnimationType="shifting"
      />
    </View>
  );
};

export default TabLayout;

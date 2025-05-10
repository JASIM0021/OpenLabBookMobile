import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { lightTheme, responsiveHeight } from '../themes';

import { Dimensions } from 'react-native';
import { scale } from 'react-native-size-matters';

const { width, height } = Dimensions.get('window');

const GolbalStyle = StyleSheet.create({
  box: {
    // Shadow properties for iOS
    ...Platform.select({
      ios: {
        shadowColor: '#000', // Color of the shadow
        shadowOffset: { width: 0, height: 2 }, // Offset of the shadow
        shadowOpacity: 0.3, // Opacity of the shadow
        shadowRadius: 4, // Radius of the shadow
      },
      android: {
        elevation: 5, // Elevation for Android (controls the shadow depth)
      },
    }),
  },

  statusBar: {
    marginTop: StatusBar.currentHeight,
  },
  logo: {
    height: scale(30),
    width: scale(30),
    resizeMode: 'cover',
  },
  icon_sm: {
    height: scale(30),
    width: scale(30),
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  mtSM: {
    marginTop: 10,
  },
  mtMD: {
    marginTop: 20,
  },
  mtLG: {
    marginTop: 40,
  },

  justify: {
    justifyContent: 'center',
  },
  align: {
    alignItems: 'center',
  },
  btn: {
    height: 58,
    backgroundColor: 'rgb(21, 32, 54)',
    paddingVertical: 16,
    paddingHorizontal: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  row_space_between: {
    flexDirection: 'row',
    columnGap: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roundedInput: {
    borderWidth: 0.5,

    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 3,
    shadowColor: lightTheme.colors.elevation.level2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 1,
  },
  btnComon: {
    height: (height * 6.5) / 100,
    borderRadius: 30,
    width: 'auto',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightTheme.colors.primary,
  },
  rowCenter: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImgOnBoard: {
    width: 350,
    height: 380,
  },
  header: {
    height: StatusBar.currentHeight * 2,
    width: '100%',
    justifyContent: 'space-between',
  },
  txtRounded: {
    width: '100%',
    borderRadius: (width / 25) * 2,
    borderTopLeftRadius: (width / 25) * 2,
    borderTopRightRadius: (width / 25) * 2,

    height: (height / 50) * 3,
    borderWidth: 1,
    borderColor: lightTheme.colors.elevation,
    backgroundColor: lightTheme.colors.placeholder,

    // borderTopLeftRadius:50
  },
  card: {
    borderRadius: 5,
    borderWidth: 0.5,
    padding: 10,
    elevation: 3,
    shadowColor: lightTheme.colors.elevation,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    flexDirection: 'row',
    columnGap: 10,
    // alignItems:'center'
  },
  chip: {
    height: responsiveHeight / 2,
    // width:responsiveHeight +10 ,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
  },

  column: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 10,
    // alignItems:'center'
  },
  column_center: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 10,
    alignItems: 'center',
  },
  scroll: {
    paddingBottom: StatusBar.currentHeight * 3,
  },
  centerLoader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: {
    flex: 1,
    backgroundColor: lightTheme.colors.background,
    // padding: 10,
  },
});

export default GolbalStyle;

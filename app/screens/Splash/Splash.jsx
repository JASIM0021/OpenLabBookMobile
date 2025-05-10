import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { ActivityIndicator, useTheme } from 'react-native-paper'
import { Image } from 'react-native'

import splashImage from '../../assets/Images/splash.png'
import { responsiveHeight, screenHeight, screenWidth } from '../../themes'
import useNavigationHelper from '../helper/NavigationHelper'
import { SCREEN_NAME } from '../../Constant'
import GolbalStyle from '../../Style'
const Splash = () => {
    const theme = useTheme()
    const navigation = useNavigationHelper()

useEffect(()=>{
    setTimeout(()=>{
        navigation.push({
            screen:SCREEN_NAME.Login
        })
    },3000)
},[])

  return (
    <View flex={1} bgColor={theme.colors.background} style={GolbalStyle.column}>

       <ImageBackground  source={splashImage} style={{
        width:screenWidth,
        height:screenHeight
       }}  resizeMode='contain' resizeMethod='resize'/>

<View style={{position:'absolute',bottom:100,right:10,left:10}}>
<ActivityIndicator color={theme.colors.primary} size={'large'}/>
</View>

    </View>
    
  )
}

export default Splash

const styles = StyleSheet.create({})
import { Image, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useState } from 'react'
import GolbalStyle from '../../Style'
import { darkTheme, lightTheme, responsiveHeight, responsiveWidth } from '../../themes'
import { ProgressBar, useTheme } from 'react-native-paper'
import ImageConstant from '../../Constant/ImageConstant'
import CustomText from '../Text'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const CustomCards = ({isBookMark = false,onBookMarkClick = ()=>{}, horizontal=true, isLoading=true,image,rating,name,description,pregress = 10,...rest}) => {

    const colorScheme = useColorScheme()
    const [isBookMarkCheck,setIsBookMark] = useState(isBookMark)
    const theme = useTheme()

    const styles = StyleSheet.create({
        container: {
            flexDirection:horizontal ? 'row' : 'column',
            alignItems:'center',
            borderWidth: 1,
            borderColor: colorScheme === 'dark' ? lightTheme.colors.background : darkTheme.colors.background,
            backgroundColor: theme.colors.background,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            ...rest
        },
        image:{
            height:responsiveHeight,
            width:responsiveWidth,
            borderRadius:5
        },
        rightSection:{

            paddingHorizontal:10,
            rowGap:responsiveHeight/10
        },
        progresBar:{
            width:'100%',
            height:responsiveHeight/16
        },
        bookmark:{
            position:'absolute',
            right:10,
            top:10
        }
    })

  return (
    <View  style={[GolbalStyle.card,styles.container]}>
     {
        isLoading ? 
        <>
        <View style={[styles.image,{backgroundColor:colorScheme == 'dark' ? lightTheme.colors.backdrop : darkTheme.colors.backdrop}]}/>
        <View style={styles.rightSection}>
        <CustomText text={"Loading..."} size={'md'} fontWeight={"bold"} spacing={1}/>
        <CustomText text="Loading..." size={'sm'} spacing={0.5} />
        <CustomText text="⭐️ ..." size={'sm'} spacing={0.5} fontWeight={"bold"}/>

       {horizontal && <ProgressBar style={styles.progresBar} progress={0.5} color={colorScheme == 'dark' ? lightTheme.colors.backdrop : darkTheme.colors.backdrop} />} 

        </View>
        </>:
        <>

        {
            !horizontal &&

            <TouchableOpacity style={styles.bookmark} onPress={()=>{
                setIsBookMark(!isBookMarkCheck)
            }}>
            <FontAwesome  name={isBookMarkCheck?"bookmark":"bookmark-o"}  size={22}/>

            </TouchableOpacity>
        }
        <Image  resizeMode='contain' source={ImageConstant.bookDemo} style={styles.image}/>
         <View style={styles.rightSection}>
        <CustomText text={name} size={'md'} fontWeight={"bold"} spacing={1}/>
        <CustomText text={description} size={'sm'} spacing={0.5} />
        <CustomText text={`⭐️ ${rating && rating}`} size={'sm'} spacing={0.5} fontWeight={"bold"}/>

       {horizontal && <ProgressBar style={styles.progresBar} progress={0.5} color={colorScheme == 'dark' ? lightTheme.colors.primary : darkTheme.colors.primary} />} 

        </View> 
        </>
     }
    </View>
  )
}

export default CustomCards


import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ActivityIndicator, useTheme } from 'react-native-paper'
import { responsiveHeight } from '../../themes'
import CustomText from '../Text'
import GolbalStyle from '../../Style'

const CustomNextButton = ({
    onPress,
    title = "Next",
  isLoading = false,
    ...rest

}: {
    onPress?: () => {},
    title: string,
    isLoading: boolean
}) => {
    const theme = useTheme()
    return (
     
            <TouchableOpacity
            
            activeOpacity={0.85}

            onPress={onPress} 
            style={
                {
                    height: responsiveHeight / 1.3,
                    padding: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: theme.colors.primary,
                    width: '100%',
                    borderRadius: 10 ,...rest
                           }}>


            <View style={[GolbalStyle.rowCenter]}>
                    <CustomText text={title} bold='bold' size='md' color='white' />


                    {isLoading && <ActivityIndicator animating={true} color={theme.colors.background} />}
                </View>
            </TouchableOpacity>

    )
}

export default CustomNextButton

const styles = StyleSheet.create({})

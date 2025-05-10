import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, Card, Divider, useTheme } from 'react-native-paper';
import GolbalStyle from '../../Style';
import ImageConstant from '../../Constant/ImageConstant';
import CustomText from '../../Components/Text';
import appContent from '../../Constant/appContent';
import CustomButton from '../../Components/CustomButton/CustomButton';
import useNavigationHelper from '../helper/NavigationHelper';
import { SCREEN_NAME } from '../../Constant';


const onBoarding = () => {
    const [imageIndex, setIndex] = React.useState(0)

    const theme = useTheme()
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 20,
            backgroundColor: theme.colors.background,
        },
        button: {
            marginTop: 20,
        },
    });

   



    const imageIcon = [
        ImageConstant.onBoardOne,
        ImageConstant.onBoardTwo,
        ImageConstant.onBoardThree,
    ];

    React.useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prevIndex => (prevIndex + 1) % imageIcon.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const navigation = useNavigationHelper()

    return (
        <View style={styles.container}  >
            <Image
                style={[GolbalStyle.ImgOnBoard, GolbalStyle.statusBar]}
                source={imageIcon[imageIndex]}
                key={imageIndex}
            />
            <View style={[GolbalStyle.rowCenter, GolbalStyle.mtLG]}>

                {
                    imageIcon.map((item, index) => {
                        return (
                            <Divider key={`${index+item}+divider`} style={{ width: 50, height: 2, backgroundColor: index == imageIndex ? theme.colors.primary : 'gray' }} />
                        )
                    })
                }




            </View>

            <View style={[GolbalStyle.align, GolbalStyle.mtLG]}>

                <CustomText text={appContent.start_learning} size={'lg'} spacing={4} textAlign={'center'} />
              

                <CustomText text={appContent.onboard_one_description} size={'sm'} spacing={1} textAlign={'center'} marginTop={20} />



            </View>
            <Button style={[GolbalStyle.mtMD]}  mode={'contained'}  onPress={()=>navigation.push({screen:SCREEN_NAME.Login,data:{}}) }>
        {appContent.onboard_button}
          </Button>

            <View style={[GolbalStyle.rowCenter, { marginTop: 30 }]}>
                <CustomText text={appContent.alrady_account} size='sm' spacing={2} textAlign='center' underline={true} />
                <CustomText text={'Sign In'} color='blue' size='sm' spacing={2} textAlign='center' underline={false} onPress={() => {navigation.push({screen:SCREEN_NAME.Login,data:{}}) }} />
            </View>
        </View>
    )
}

export default onBoarding

const styles = StyleSheet.create({})
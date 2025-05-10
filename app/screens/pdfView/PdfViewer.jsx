import React, { useState } from 'react';
import { StyleSheet, Dimensions, View, Platform } from 'react-native';
import Pdf from 'react-native-pdf';
import Header from '../../Components/header/Header';
import { responsiveWidth } from '../../themes';
import { useTheme } from 'react-native-paper';
import apiconstant from '../../Constant/apiconstant';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '../../helper/AsyncStorage';

const PdfViewer = ({navigation}) => {

    const route = useRoute()

    const data = route?.params?.data
    

    console.log('data', data)
    const theme = useTheme()
    const [link,setLink] = useState('')
    const [token,setToken] = useState('')

    const source = { uri: link, cache: Platform.OS == 'ios' ?  true: true };

    console.log('source', source)
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal:responsiveWidth/6,
            backgroundColor:theme.colors.background
           
           
        },
        pdf: {
            flex: 1,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        }
    });


    const getToken = async()=>{
        
      const token = await AsyncStorage.getToken();
    

       
      return token
    }
    React.useEffect(async()=>{
        const  temp = await getToken()
        setToken(temp)
        if(data){
           
            setLink(`${apiconstant.url}books/${data}?token=${token}`)
         
        }
       
    },[data])

    console.log('tokrn', token)

    return (
        <> 
            <View style={styles.container}>
            <Header title={'Reading'} isBack={true} />

                <Pdf
                    trustAllCerts={false}
                      

                    source={{...source,headers:{
                        'authorization':token
                    }}}
                    onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    style={styles.pdf} />
            </View>
        </>
    )
}

export default PdfViewer


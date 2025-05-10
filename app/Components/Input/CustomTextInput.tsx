import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { HelperText, TextInput, useTheme } from 'react-native-paper'
import GolbalStyle from '../../Style';
import { darkTheme, lightTheme } from '../../themes';

const CustomTextInput = ({label, values, handleChange,placeholder, handleBlur, isSecure, touched, errors ,...rest }) => {
    const [secureText, setSecureText] = React.useState(true);
    const toggleSecureTextEntry = () => {
        setSecureText(!secureText);
    };
    const theme = useTheme()
    const colorScheme = useColorScheme()
    return (
        <>
        <TextInput
        style={{backgroundColor:theme.colors.background,...rest}}
        placeholder={placeholder}
            mode="outlined"
            label={label}
            
            textColor={colorScheme == 'dark' ? lightTheme.colors.background : darkTheme.colors.background}
            secureTextEntry={isSecure ? secureText : false}
            value={values}
            onChangeText={handleChange}
            onBlur={handleBlur}
            right={isSecure ?
                <TextInput.Icon
                    icon={secureText ? "eye-off" : "eye"}
                    onPress={toggleSecureTextEntry}
                /> : <></>
            }

            error={Boolean(touched) && Boolean(errors)}

        />
        {errors && (
            <HelperText style={{ color: theme.colors.error }}>
              {errors}
            </HelperText>
          )}
          </>
    )
}


export default CustomTextInput

const styles = StyleSheet.create({})